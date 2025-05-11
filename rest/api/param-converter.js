function convertJSON(val, stmtParams) {
  const tmpJSON = {}
  for (let i4 = 0; i4 < stmtParams.length; i4++) {
    const x = stmtParams[i4]
    if (typeof x === 'string') {
      tmpJSON[x] = val[x]
    } else if (typeof x === 'object') {
      if (val[x.name]) {
        tmpJSON[x.name] = val[x.name]
      } else if ('default' in x) {
        tmpJSON[x.name] = x.default || null
      }
    }
  }
  return JSON.stringify(tmpJSON)
}
function convertJSONArray(val, stmtParams) {
  const tmpArray = []
  let tmpJSON = {}
  for (let i2 = 0; i2 < val.length; i2++) {
    const eVal = val[i2]
    tmpJSON = {}
    for (let i3 = 0; i3 < stmtParams.length; i3++) {
      const x = stmtParams[i3]
      if (typeof x === 'string') {
        tmpJSON[x] = eVal[x]
      } else if (typeof x === 'object') {
        if (eVal[x.name]) {
          tmpJSON[x.name] = eVal[x.name]
        } else {
          tmpJSON[x.name] = x.default || null
        }
      }
    }
    tmpArray.push(tmpJSON)
  }
  return JSON.stringify(tmpArray)
}
exports.convertParam = function(val, stmtParams) {
  const tmp = []
  for (let i1 = 0; i1 < stmtParams.length; i1++) {
    const x = stmtParams[i1]
    if (typeof x === 'string') {
      tmp.push(val[x])
    } else if (val[x.name] && x.type && x.type === 'json') {
      tmp.push(convertJSON(val[x.name], x.data))
    } else if (val[x.name] && x.type && x.type === 'array-json') {
      if (x.data.length === 0) {
        tmp.push(JSON.stringify(val[x.name]))
      } else {
        tmp.push(convertJSONArray(val[x.name], x.data))
      }
    } else if (typeof val[x.name] !== 'undefined') {
      if (x.default && typeof x.default === 'string' && val[x.name].trim() === '') {
        tmp.push(x.default)
      } else {
        tmp.push(val[x.name])
      }
    } else if (typeof x.default !== 'undefined')tmp.push(x.default)
  }
  if (stmtParams.length === tmp.length) return tmp
  else return false
}
