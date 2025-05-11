const validate = require('validate.js/validate')
const request = require('../api/requests')
const rptRequest = require('../api/reports')
// const xlsxRequest = require('../api/xlsx')

const moment = require('moment')
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value, options) {
    var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
    format = options.blthOnly ? 'YYYY-MM' : format
    // console.log(value, format, moment(value, format, true).isValid())
    const dtValid = moment(value, format, true).isValid()
    return dtValid ? +moment.utc(value) : NaN
  },
  // Input is a unix timestamp
  format: function (value, options) {
    var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
    format = options.blthOnly ? 'YYYY-MM' : format
    return moment.utc(value).format(format)
  }
})

const isEmpty = require('lodash/isEmpty')
const isArray = require('lodash/isArray')

validate.validators.array = (arrayItems, itemConstraints, key) => {
  if (!isArray(arrayItems)) return 'Harus array'
  const arrayItemErrors = arrayItems.reduce((errors, item, index) => {
    const error = validate(item, itemConstraints, { format: 'flat' })
    if (error) errors[index] = error
    return errors
  }, {})
  const errorsRet = {}
  if (!isEmpty(arrayItemErrors)) errorsRet[key] = arrayItemErrors
  // else errorsRet[key] = arrayItemErrors
  return isEmpty(arrayItemErrors) ? null : errorsRet
  // return errorsRet
}
validate.validators.object = (objectItems, itemConstraints) => {
  const arrayItemErrors = validate(objectItems, itemConstraints, {
    format: 'flat'
  })
  return isEmpty(arrayItemErrors) ? null : { errors: arrayItemErrors }
}
// validator params
const auditTrails = ['reqId', 'chId']

const wsParams = (req, param) => {
  try {
    const params =
      (param !== undefined && typeof param !== 'string' && param.params(req)) ||
      null
    const rules =
      (param !== undefined && typeof param !== 'string' && param.rules) || {}
    if (!auditTrails.some((x) => req.query[x] || req.body[x])) {
      return { ret: -1, msg: 'Request and channel id is not defined' }
    }
    if (params === null) {
      return { ret: 0, data: {} }
    } else {
      const xValidate = validate(params, rules, { format: 'flat' })
      if (typeof xValidate !== 'undefined') {
        return { ret: -88, msg: 'error validating params', error: xValidate }
      } else {
        return { ret: 0, data: params }
      }
    }
  } catch (e) {
    return { ret: -1, msg: 'error validate params1' }
  }
}
const { getCephFileAsBase64 } = require('../api/ceph')

// Fetching Data
exports.getData = async (req, res, param, cephFieldPath = null) => {
  try {
    const params = wsParams(req, param)
    if (params.ret !== 0) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    const data = await request.query(stmt, params.data)
    if (data.ret === 0) {
      if (cephFieldPath) {
        for (let i = 0; i < data.data.length; i++) {
          const base64File = await getCephFileAsBase64(
            data.data[i][cephFieldPath]
          )
          data.data[i] = { ...data.data[i], file: base64File }
        }
      }
      res.status(200).json({ ...data })
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
}

// Run function Data
exports.callFunction = async (req, res, param, addData = null) => {
  try {
    const params = wsParams(req, param)
    if (params.ret !== 0) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    const data = await request.queryFunction(stmt, params.data)
    if (data.ret === 0) {
      if (addData) {
        res.status(200).json({ ...data, ...addData })
      } else {
        res.status(200).json({ ...data })
      }
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
}

//NEW getRptByPass
exports.getRptByPass = async (res, data, kodeReport) => {
  try {
    //FILE PDF
    if (data.ret === 0) {
      rptRequest.createPdf(
        kodeReport,
        data.data,
        function (dataPdf) {
          res.status(200).json({ ret: 0, file: dataPdf })
        },
        function (error) {
          res.status(200).json({ ret: -1, msg: 'Error:' + error })
        }
      )
    }
  } catch (error) {
    res.status(200).json({ ret: -1, msg: 'Error in processing Report' })
  }
}

//END

exports.getReport = async (req, res, param, kodeReport) => {
  try {
    const params = wsParams(req, param)
    if (params.ret !== 0) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    const data = await request.query(stmt, params.data)
    if (data.ret === 0) {
      rptRequest.createPdf(
        kodeReport,
        data.data,
        function (dataPdf) {
          res.status(200).json({ ret: 0, file: dataPdf })
        },
        function (error) {
          res.status(200).json({ ret: -1, msg: 'Error:' + error })
        }
      )
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing Report' })
  }
}

const xlsxRequest = require('../api/xlsx')
const { async } = require('validate.js/validate')

exports.getExcelBase64 = async (req, res, param, kodeXLSX) => {
  try {
    const params = wsParams(req, param)
    if (params.ret === -1) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    const data = await request.query(stmt, params.data)
    if (data.ret === 0 && data.data.length !== 0) {
      xlsxRequest.generateXLSX(res, kodeXLSX, params.data, data, 'base64')
    } else {
      res.status(200).json({ ret: -1, msg: 'error creating excel template' })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
}

// exports.getXlsx = async (req, res, param, kodeReport) => {
//   try {
//     const params = wsParams(req, param)
//     if (params.ret !== 0) {
//       res.status(200).json(params)
//       return
//     }
//     const stmt = (param !== undefined && typeof param !== 'string' && param.request) || param
//     const data = await request.query(stmt, params.data)
//     if (data.ret === 0) {
//       xlsxRequest.createXlsx(kodeReport, data.data, function (dataXlsx) {
//         res.status(200).json({ ret: 0, file: dataXlsx })

//       }, function (error) {
//         res.status(200).json({ ret: -1, msg: 'Error:' + error })
//       })
//     } else {
//       res.status(200).json({ ret: data.ret, msg: data.msg })
//     }
//   } catch (e) {
//     res.status(200).json({ ret: -1, msg: 'Error in processing Report' })
//   }
// }

exports.getReportFunction = async (req, res, param, kodeReport) => {
  try {
    const params = wsParams(req, param)
    if (params.ret !== 0) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    const data = await request.queryFunction(stmt, params.data)
    if (data.ret === 0) {
      rptRequest.createPdf(
        kodeReport,
        data.data,
        function (dataPdf) {
          res.status(200).json({ ret: 0, file: dataPdf })
        },
        function (error) {
          res.status(200).json({ ret: -1, msg: 'Error:' + error })
        }
      )
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
}

exports.getDataRaw = async (stmt, params) => {
  try {
    const data = await request.query(stmt, params)
    return { ...data }
  } catch (e) {
    return { ret: -1, msg: 'Error in processing request to db' }
  }
}

// Run function Data
exports.callFunctionRaw = async (stmt, params) => {
  try {
    const data = await request.queryFunction(stmt, params)
    if (data.ret === 0) {
      return { ...data }
    }
  } catch (e) {
    return { ret: -1, msg: 'Error in processing request to db' }
  }
}

exports.IsJsonString = function (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
