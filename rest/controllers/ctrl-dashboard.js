const apiReq = require('./api-caller')
const moment = require('moment')

const reqCtrl = {
  getDashboardOkupansi: {
    params: (req) => {
      const p_tahun = req.query.p_tahun ? Number(req.query.p_tahun) : 0
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_tahun: p_tahun === 0 ? moment().format('YYYY') : p_tahun
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardOkupansi'
  },
  getDashboardRegistrasi: {
    params: (req) => {
      const p_tahun = req.query.p_tahun ? Number(req.query.p_tahun) : 0
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_tahun: p_tahun === 0 ? moment().format('YYYY') : p_tahun
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardRegistrasi'
  },
  getDashboardKontrakProses: {
    params: (req) => {
      const p_tahun = req.query.p_tahun ? Number(req.query.p_tahun) : 0
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_tahun: p_tahun === 0 ? moment().format('YYYY') : p_tahun
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardKontrakProses'
  },
  getDashboardAvailabilityUnit: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardAvailabilityUnit'
  },
  getDashboardPenghuni: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardPenghuni'
  },
  getDashboardWaitingList: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getDashboardWaitingList'
  }
}

exports.methodGet = {
  '012001000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardOkupansi), // dashboard/okupansi
  '012002000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardAvailabilityUnit), // dashboard/unit-availability
  '012003000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardPenghuni), // dashboard/penghuni
  '012004000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardRegistrasi), // dashboard/registrasi
  '012005000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardKontrakProses), // dashboard/kontrak-proses
  '012006000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDashboardWaitingList) // dashboard/waiting-list
}
