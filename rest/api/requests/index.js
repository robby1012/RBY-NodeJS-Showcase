const { pool } = require('../pool-pg')
const { convertParam } = require('../param-converter')

const stmts = {
  ...require('./pengguna-stmts'),
  ...require('./kode-stmts'),
  ...require('./rusun-stmts'),
  ...require('./registrasi-stmts'),
  ...require('./kontrak-stmts'),
  ...require('./invoice-stmts'),
  ...require('./pembayaran-stmts'),
  // ...require('./profil-stmts.js.bak'),
  ...require('./penghuni-stmts'),
  ...require('./maintenance-stmts'),
  ...require('./settings-stmts'),
  ...require('./aset-stmts'),
  ...require('./komplain-stmts'),
  ...require('./rpt-pelaporan-stmts'),
  ...require('./lov-stmts'),
  ...require('./dashboard-stmts'),

  ...require('./contoh-paging-stmts')
  // ...require('./tarif-stmts')
}

module.exports.query = async function (stmt, params) {
  return new Promise((resolve, reject) => {
    if (!stmts[stmt]) {
      resolve({ ret: -1, msg: 'No request defined' })
    }
    const queryStmt = stmts[stmt].text ? stmts[stmt].text : stmts[stmt]
    const params_pg = stmts[stmt].params
      ? convertParam(params, stmts[stmt].params)
      : Array.isArray(params)
      ? params
      : []
    if (!params_pg) {
      resolve({ ret: -1, msg: 'Error converting parameter query' })
    }
    console.log('params query', params_pg, stmt)
    pool.connect().then((client) => {
      return client
        .query(queryStmt, params_pg)
        .then((res) => {
          // console.log(res)
          client.release()
          resolve({ ret: 0, data: res.rows, dataCount: res.rows.length })
        })
        .catch((err) => {
          // console.log(err)
          client.release()
          resolve({ ret: -1, msg: err.stack })
        })
    })
  })
}

module.exports.queryFunction = async function (stmt, params) {
  return new Promise((resolve, reject) => {
    // console.log(stmts[stmt])
    if (!stmts[stmt]) {
      resolve({ ret: -1, msg: 'No request defined' })
    }
    const queryStmt = stmts[stmt].text ? stmts[stmt].text : stmts[stmt]
    const params_pg = stmts[stmt].params
      ? convertParam(params, stmts[stmt].params)
      : Array.isArray(params)
      ? params
      : []
    if (!params_pg) {
      resolve({ ret: -1, msg: 'Error converting parameter query' })
    }
    console.log('param function', params, params_pg, queryStmt)
    pool.connect().then((client) => {
      return client
        .query(queryStmt, params_pg)
        .then((res) => {
          client.release()
          // console.log(res.rows[0].ret)
          resolve(res.rows[0].ret)
        })
        .catch((err) => {
          // console.log(err)
          client.release()
          resolve({ ret: -1, msg: err.stack })
        })
    })
  })
}
