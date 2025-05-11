/* eslint-disable no-mixed-spaces-and-tabs */
const moment = require('moment')

const isValidParams = function(params, rules) {
  try {
    let isValidRequireds = true
    let isValidRequired = false
    const requiredFields = []
    let isValidFormat = true
    const formatFields = []
    for (const [k, v] of Object.entries(rules)) {
      if (v.required) {
        requiredFields.push(k)
        isValidRequired = false
      }
      for (const [k_par, v_par] of Object.entries(params)) {
        if (k === k_par) {
          if (v.required && v_par != null && v_par.toString().trim() !== '') {
            isValidRequired = true
          } else if (v.type) {
            isValidFormat = false
            if (v.type === 'date' && v.format) {
              isValidFormat = moment(v_par, v.format, true).isValid()
            } else if (v.type === 'object') {
              const cekObject = isValidParams(v_par, v.rules)
              if (cekObject.ret === 0) { isValidFormat = true } else {
                return { ret: -1, msg: cekObject.msg}
              }
            } else if (v.type === 'array-object') {
              v_par.forEach(val => {
                const cekObject = isValidParams(v_par, v.rules)
                if (cekObject.ret === 0) { isValidFormat = true } else {
                  return { ret: -1, msg: cekObject.msg}
                }
              })
            }
            if (!isValidFormat) {
              formatFields.push(`${k}: ${v_par} (type: ${v.type}` + (v.type === 'date' ? `, format: ${v.format})` : ')'))
            }
          }
        }
      }
      isValidRequireds = isValidRequireds && isValidRequired
    }
    if (!isValidRequireds) { return { ret: -1, msg: 'Required fields: ' + requiredFields.join(',')} } else if (formatFields.length > 0) { return { ret: -1, msg: 'Wrong format: ' + formatFields.join(',')} } else { return { ret: 0 } }
  } catch (e) {
    return { ret: -1, msg: 'Validator parameters error'}
  }
}

exports.isValidParams = isValidParams
