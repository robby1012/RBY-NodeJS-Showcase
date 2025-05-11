const apiReqNew = require('./api-caller-new')
const apiReq = require('./api-caller')

const reqCtrl = {
  getInvoicePribadi: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice ? req.query.p_no_invoice.trim() : ''
      }
    },
    rules: {
      p_no_invoice: {
        presence: true,
        type: {
          type: 'string',
          message: '^No Invoice Harus Sesuai'
        }
      }
    },
    request: 'getInvoiceDetil'
  },
  getBuktiBayarPribadi: {
    params: (req) => {
      return {
        p_id_pembayaran: req.query.p_id_pembayaran ? Number(req.query.p_id_pembayaran) : null
      }
    },
    rules: {},
    request: 'getInvoicePembayaran'
  },
  getRptInvoice: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice ? req.query.p_no_invoice.trim() : ''
      }
    },
    rules: {
      p_no_invoice: {
        presence: true,
        type: {
          type: 'string',
          message: '^No Invoice Harus Sesuai'
        }
      }
    },
    request: 'getInvoiceInfo'
  }
}
exports.methodGet = {
  //'reports/invoice/pribadi': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getInvoicePribadi, 'rptInvoicePribadi'),
  //'/reports/invoice/pembayaran': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getRptInvoice, 'rptInvoicePrs'),
  '013003002': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getRptInvoice, 'rptInvoicePrs'),
  /* 'reports/invoice/bukti-bayar-pribadi': async (req, res) => {
    try {
      const p_id_pembayaran = req.query.p_id_pembayaran
        ? Number(req.query.p_id_pembayaran)
        : null
      const dataInvoice = await apiReqNew.getDataRaw('getInvoicePembayaran', {
        p_id_pembayaran: p_id_pembayaran
      })
      if (dataInvoice.ret === 0) {
        const datanya = []
        let item
        let bypass
        for (let i = 0; i < dataInvoice.data.length; i++) {
          item = await apiReq.getDataRaw('getInvoiceInfo', {
            p_no_invoice: dataInvoice.data[i].no_invoice
          })
          if (item.ret === 0) {
            datanya.push(...item.data)
          }
        }

        bypass = await apiReqNew.getRptByPass(res, {
          ret: 0,
          data: {
            infoBayar: [...dataInvoice.data],
            invoice: [...datanya]
          }
        }, 'rptBuktiBayarPribadi')
      } else {
        res.status(200).json({ ret: -1, msg: dataInvoice.msg })
      }
    } catch (e) {
      res.status(200).json({ ret: -1, msg: 'error getting data' })
    }
  }, */
  '013003003': async (req, res) => {
    try {
      const p_id_pembayaran = req.query.p_id_pembayaran
        ? Number(req.query.p_id_pembayaran)
        : null
      const dataInvoice = await apiReqNew.getDataRaw('getInvoicePembayaran', {
        p_id_pembayaran: p_id_pembayaran
      })
      if (dataInvoice.ret === 0) {
        const datanya = []
        let item
        let bypass
        for (let i = 0; i < dataInvoice.data.length; i++) {
          item = await apiReq.getDataRaw('getInvoiceInfo', {
            p_no_invoice: dataInvoice.data[i].no_invoice
          })
          if (item.ret === 0) {
            datanya.push(...item.data)
          }
        }

        bypass = await apiReqNew.getRptByPass(res, {
          ret: 0,
          data: {
            infoBayar: [...dataInvoice.data],
            invoice: [...datanya]
          }
        }, 'rptBuktiBayarPribadi')
      } else {
        res.status(200).json({ ret: -1, msg: dataInvoice.msg })
      }
    } catch (e) {
      res.status(200).json({ ret: -1, msg: 'error getting data' })
    }
  }
}
  //: (req, res) => apiReqNew.getReport(req, res, reqCtrl.getBuktiBayarPribadi, 'rptBuktiBayarPribadi'),
