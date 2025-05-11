const apiReqNew = require('./api-caller-new')

const reqCtrl = {
  getFormulirPerusahaan: {
    params: (req) => {
      return {
        p_kantor: req.query.p_kantor ? req.query.p_kantor.trim() : ''
      }
    },
    rules: {
      p_kantor: {
        presence: true,
        type: {
          type: 'string',
          message: '^Kode kantor'
        }
      }
    },
    request: 'getRusunByKantor'
  }
}

exports.methodGet = {
  '013002001': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getFormulirPerusahaan,
      'rptFormulirPerusahaan'
    ) // reports/formulir/perusahaan
}
