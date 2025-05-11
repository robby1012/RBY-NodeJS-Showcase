const apiReq = require('./api-caller')

const reqCtrl = {
  getRusunByKantor: {
    params: (req) => {
      return {
        p_kantor: req.query.p_kantor
          ? req.query.p_kantor.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kantor: { required: true }
    },
    request: 'getRusunByKantor'
  },
  getRusunByUser: {
    params: (req) => {
      return {
        p_pengguna: req.jid
      }
    },
    rules: {
      p_pengguna: { required: true }
    },
    request: 'getRusunByUser'
  },
  getRusunBlok: {
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
    request: 'getRusunBlok'
  },
  getRusunLantai: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getRusunLantai'
  },
  getRusunUnitsByLantai: {
    params: (req) => {
      return {
        p_lantai: req.query.p_lantai
          ? req.query.p_lantai.toString().trim().toUpperCase()
          : '',
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_lantai: { required: true }
    },
    request: 'getRusunUnitsByLantai'
  },
  getRusunUnitStatusByUnit: {
    params: (req) => {
      return {
        p_id: req.query.p_id ? req.query.p_id : 0
      }
    },
    rules: {
      p_id: { required: true }
    },
    request: 'getRusunUnitStatusByUnit'
  }
}

exports.methodGet = {
  '014001000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.getRusunByUser) // rusun/by-user
  /*
  'rusun/by-kantor': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRusunByKantor),
  'rusun/blok': (req, res) => apiReq.getData(req, res, reqCtrl.getRusunBlok),
  'rusun/lantai': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRusunLantai),
  'rusun/unit/by-lantai': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRusunUnitsByLantai),
  'rusun/unit/status': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRusunUnitStatusByUnit)
    */
}
