const { isValidParams } = require('../api/validator')
const request = require('../api/requests')
const rptRequest = require('../api/reports')

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
      return { ...isValidParams(params, rules), data: params }
    }
  } catch (e) {
    return { ret: -1, msg: 'error validate params' }
  }
}
const { getCephFileAsBase64 } = require('../api/ceph')

// Fetching Data
exports.getData = async (req, res, param, cephFieldPath = null) => {
  try {
    const params = wsParams(req, param)
    if (params.ret === -1) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) ||
      param
    console.log('hahahah', stmt, params.data)
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
    if (params.ret === -1) {
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

exports.getReport = async (req, res, param, kodeReport) => {
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

exports.getReportFunction = async (req, res, param, kodeReport) => {
  try {
    const params = wsParams(req, param)
    if (params.ret === -1) {
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

const xlsxRequest = require('../api/xlsx')
/* exports.getExcelOctetStream = async (req, res, param, kodeXLSX) => {
  try {
    const params = wsParams(req, param)
    if (params.ret === -1) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) || param
    const data = await request.query(stmt, params.data)
    console.log('asas', kodeXLSX, params.data, data)
    if (data.ret === 0) {
      xlsxRequest.generateXLSX(res, kodeXLSX, params.data, data)
    } else {
      res.status(200).json({ ret: -1, msg: 'error creating excel template' })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
} */

exports.getExcelBase64 = async (req, res, param, kodeXLSX) => {
  try {
    const params = wsParams(req, param)
    if (params.ret === -1) {
      res.status(200).json(params)
      return
    }
    const stmt =
      (param !== undefined && typeof param !== 'string' && param.request) || param
    const data = await request.query(stmt, params.data)
    console.log('asas', kodeXLSX, params.data, data)
    if (data.ret === 0) {
      xlsxRequest.generateXLSX(res, kodeXLSX, params.data, data, 'base64')
    } else {
      res.status(200).json({ ret: -1, msg: 'error creating excel template' })
    }
  } catch (e) {
    res.status(200).json({ ret: -1, msg: 'Error in processing request to db' })
  }
}
