const apiReq = require('./api-caller')

const reqCtrl = {
  getPengguna: {
    params: (req) => {
      return {
        p_pengguna: req.query.p_pengguna ? req.query.p_pengguna.toString().trim().toUpperCase() : ''
      }
    },
    rules: {
      p_pengguna: { required: true }
    },
    request: 'getPengguna'
  }
}

exports.methodGet = {
  'pengguna': (req, res) => apiReq.getData(req, res, reqCtrl.getPengguna)
}
