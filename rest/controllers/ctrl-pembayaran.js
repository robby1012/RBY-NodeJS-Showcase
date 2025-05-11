const apiReqNew = require('./api-caller-new')
const reqCtrl = {
  getInvoiceChoosed: {
    params: (req) => {
      return {
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_invoices: req.body.p_invoices ? req.body.p_invoices : []
      }
    },
    rules: {
      p_rusun: {
        length: {
          minimum: 1,
          message: '^Kode RUsun maximum 5 characters dan harus ada'
        }
      },
      p_invoices: {
        presence: true,
        array: {
          no_invoice: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 50,
              message: '^No Invoice maximum 50 characters dan harus ada'
            }
          }
        }
      }
    },
    request: 'getInvoiceChoosed'
  },
  postPembayaran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kontrak: req.body.p_kontrak ? Number(req.body.p_kontrak) : 0,
        p_tgl_bayar: req.body.p_tgl_bayar ? req.body.p_tgl_bayar.trim() : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_media: req.body.p_media
          ? req.body.p_media.toString().trim().toUpperCase()
          : '',
        p_asal_bank: req.body.p_asal_bank
          ? req.body.p_asal_bank.toString().trim().toUpperCase()
          : '',
        p_asal_rek: req.body.p_asal_rek
          ? req.body.p_asal_rek.toString().trim()
          : '',
        p_asal_trxid: req.body.p_asal_trxid
          ? req.body.p_asal_trxid.toString().trim()
          : '',
        p_penerima_bank: req.body.p_penerima_bank
          ? req.body.p_penerima_bank.toString().trim().toUpperCase()
          : '',
        p_penerima_rek: req.body.p_penerima_rek
          ? req.body.p_penerima_rek.toString().trim().toUpperCase()
          : '',
        p_nom_tagihan: req.body.p_nom_tagihan
          ? Number(req.body.p_nom_tagihan)
          : 0,
        p_nom_bayar: req.body.p_nom_bayar ? Number(req.body.p_nom_bayar) : 0,
        p_nom_terbayar: req.body.p_nom_terbayar
          ? Number(req.body.p_nom_terbayar)
          : 0,
        p_nom_kembali: req.body.p_nom_kembali
          ? Number(req.body.p_nom_kembali)
          : 0,
        p_isdeposit_retur: req.body.p_isdeposit_retur
          ? req.body.p_isdeposit_retur
          : false,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_distribusi: req.body.p_distribusi ? req.body.p_distribusi : [],
        p_pajak_dibayar_penyewa: req.body.p_pajak_dibayar_penyewa
          ? req.body.p_pajak_dibayar_penyewa
          : null
      }
    },
    rules: {
      p_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_tgl_bayar: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tagl Bayar date format YYYY-MM-DD'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 75,
          message: '^Nama Pembayar maximum 75 character'
        }
      },
      p_media: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Media pembayaran maximum 3 characters'
        }
      },
      p_nom_tagihan: {
        presence: true,
        type: {
          type: 'number',
          message: '^Nominal Tagihan harus angka'
        }
      },
      p_nom_bayar: {
        presence: true,
        type: {
          type: 'number',
          message: '^Nominal Bayar harus angka'
        }
      },
      p_nom_terbayar: {
        presence: true,
        type: {
          type: 'number',
          message: '^Nominal Terbayar harus angka'
        }
      },
      p_nom_kembali: {
        presence: true,
        type: {
          type: 'number',
          message: '^Nominal Kembali harus angka'
        }
      },
      p_isdeposit_retur: {
        presence: true,
        type: {
          type: 'boolean',
          message: '^p_isdeposit_retur harus boolean'
        }
      },
      p_distribusi: {
        presence: true,
        array: {
          no_invoice: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 50,
              message: '^No Invoice maximum 50 characters'
            }
          },
          tagihan: {
            presence: true,
            type: {
              type: 'number',
              message: '^Nominal Tagiahn harus angka'
            }
          }
        }
      }
    },
    request: 'postPembayaran'
  },
  getPembayaran: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : 0
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : 0,
        p_id_pembayaran: req.query.p_id_pembayaran
          ? Number(req.query.p_id_pembayaran)
          : 0,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_media_bayar: req.query.p_media_bayar
          ? req.query.p_media_bayar.toString().trim().toUpperCase()
          : '',
        p_no_inv: req.query.p_no_inv
          ? req.query.p_no_inv.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode RUsun maximum 5 characters dan harus ada'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_id_pembayaran: {
        type: {
          type: 'number',
          message: '^ID Pembayaran harus angka'
        }
      }
    },
    request: 'getPembayaran'
  },
  getPembayaranRetur: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : 0
      }
    },
    rules: {
      p_id_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getPembayaranRetur'
  },
  getPembayaranReturAll: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : 0
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: {
        presence: true
      }
    },
    request: 'getPembayaranReturAll'
  },
  getPembayaranRekening: {
    params: (req) => {
      return {
        p_id_pembayaran_rekening: req.query.p_id_pembayaran_rekening
          ? Number(req.query.p_id_pembayaran_rekening)
          : null,
        p_kode_kantor: req.query.p_kode_kantor
          ? req.query.p_kode_kantor.toString().trim().toUpperCase()
          : null,
        p_nama_bank: req.query.p_nama_bank
          ? req.query.p_nama_bank.toString().trim().toUpperCase()
          : null,
        p_no_rekening: req.query.p_no_rekening
          ? req.query.p_no_rekening.toString().trim().toUpperCase()
          : null,
        p_aktif: req.query.p_aktif !== undefined ? req.query.p_aktif : null
      }
    },
    rules: {},
    request: 'getPembayaranRekening'
  },
  postPembayaranRekening: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_pembayaran_rekening: req.body.p_id_pembayaran_rekening
          ? req.body.p_id_pembayaran_rekening
          : null,
        p_kode_kantor: req.body.p_kode_kantor
          ? req.body.p_kode_kantor.toString().trim().toUpperCase()
          : '',
        p_no_rekening: req.body.p_no_rekening
          ? req.body.p_no_rekening.toString().trim().toUpperCase()
          : '',
        p_nama_bank: req.body.p_nama_bank
          ? req.body.p_nama_bank.toString().trim().toUpperCase()
          : '',
        p_atas_nama_rekening: req.body.p_atas_nama_rekening
          ? req.body.p_atas_nama_rekening.toString().trim().toUpperCase()
          : '',
        p_cabang_bank: req.body.p_cabang_bank
          ? req.body.p_cabang_bank.toString().trim().toUpperCase()
          : '',
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif !== undefined ? req.body.p_aktif : null
      }
    },
    rules: {},
    request: 'postPembayaranRekening'
  },

  getPembayaranReturDetil: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? Number(req.query.p_id_kontrak_sewa)
          : null
      }
    },
    rules: {
      p_id_kontrak_sewa: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak sewa harus angka'
        }
      }
    },
    request: 'getPembayaranReturDetil'
  }
}

exports.methodGet = {
  '007000000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getPembayaran), // pembayaran
  '007001000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getPembayaranReturAll), // pembayaran/retur-all
  '007001001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getPembayaranRetur), // pembayaran/retur
  '007001002': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getPembayaranReturDetil), // pembayaran/retur-detil
  '007002000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getPembayaranRekening) // pembayaran/setting-rekening
}

exports.methodPost = {
  '007000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postPembayaran), // pembayaran
  '007003000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getInvoiceChoosed), // pembayaran/invoice-choosed-get
  '007002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postPembayaranRekening) // pembayaran/setting-rekening
}
