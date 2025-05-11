const apiReqNew = require('./api-caller-new')
const apiReq = require('./api-caller')
// const moment = require('moment')

const reqCtrl = {
  getInvoiceEntriesSewa: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesSewa'
  },
  getInvoiceEntriesSewaDetil: {
    params: (req) => {
      return {
        p_kontrak: req.query.p_kontrak ? req.query.p_kontrak : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_kontrak: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesSewaDetil'
  },
  getInvoiceEntriesSewaBLTHTerakhir: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? req.query.p_id : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesSewaBLTHTerakhir'
  },
  getEntriesSewaCalculated: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? req.query.p_id_kontrak_sewa
          : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        p_pajak_prosen: req.query.p_pajak_prosen ? req.query.p_pajak_prosen : 10
      }
    },
    rules: {
      p_id_kontrak_sewa: { required: true },
      p_blth: { required: true },
      p_pajak_prosen: { required: true }
    },
    request: 'getEntriesSewaCalculated'
  },
  postEntriesSewa: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? Number(req.body.p_id_kontrak_sewa)
          : 0,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : '',
        // p_periode_bln_sewa_awal: req.body.p_periode_bln_sewa_awal ? req.body.p_periode_bln_sewa_awal.trim() : '',
        // p_periode_bln_sewa_akhir: req.body.p_periode_bln_sewa_akhir ? req.body.p_periode_bln_sewa_akhir.trim() : '',
        p_pajak_prosen: req.body.p_pajak_prosen
          ? Number(req.body.p_pajak_prosen)
          : 10
      }
    },
    rules: {
      p_id_kontrak_sewa: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun bulan tagihan format YYYY-MM'
        }
      },
      p_pajak_prosen: {
        presence: true,
        type: {
          type: 'number',
          message: '^Pajak harus angka'
        }
      }
    },
    request: 'postEntriesSewa'
  },
  delEntriesSewa: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? req.body.p_id_kontrak_sewa
          : 0,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_id_kontrak_sewa: { required: true },
      p_blth: { required: true }
    },
    request: 'delEntriesSewa'
  },
  getInvoiceEntriesSewaUnit: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.query.p_blth ? req.query.p_blth.trim().toUpperCase() : null
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesSewaUnit'
  },
  postEntriesSewaUnit: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : null,
        p_data_units: req.body.p_data_units ? req.body.p_data_units : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun min 5 characters'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun bulan tagihan format YYYY-MM'
        }
      },
      p_data_units: {
        array: {
          id_kontrak_sewa: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID unit Required'
            }
          },
          id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID unit Required'
            }
          }
        }
      }
    },
    request: 'postEntriesSewaUnit'
  },
  delEntriesSewaUnit: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_invoice_entries: req.body.p_id_invoice_entries
          ? req.body.p_id_invoice_entries
          : 0,
        p_keterangan: req.body.p_keterangan ? req.body.p_keterangan.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_invoice_entries: { required: true }
    },
    request: 'delEntriesSewaUnit'
  },
  getInvoiceEntriesSewaPeriode: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? Number(req.query.p_id_kontrak_sewa)
          : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_id_kontrak_sewa: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak sewa harus angka'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^BLTH format YYYY-MM'
        }
      }
    },
    request: 'getInvoiceEntriesSewaPeriode'
  },
  getInvoiceEntriesDeposit: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesDeposit'
  },
  getInvoiceEntriesDepositDetil: {
    params: (req) => {
      return {
        p_id_invdpst: req.query.p_id_invdpst
          ? Number(req.query.p_id_invdpst)
          : null
      }
    },
    rules: {
      p_id_invdpst: { required: true }
    },
    request: 'getInvoiceEntriesDepositDetil'
  },
  getInvoiceEntriesListrik: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesListrik'
  },
  getInvoiceEntriesListrikBLTHTerakhir: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? req.query.p_id : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesListrikBLTHTerakhir'
  },
  // getInvoiceEntriesListrikBLTHTerakhir: {
  //   params: (req) => {
  //     return {
  //       p_rusun: req.query.p_rusun ? req.query.p_rusun.toString().trim().toUpperCase() : '',
  //       p_unit: req.query.p_unit ? req.query.p_unit : 0,
  //       p_blok: req.query.p_blok ? req.query.p_blok.toString().trim().toUpperCase() : '',
  //       p_search: req.query.p_search ? req.query.p_search.toString().trim().toUpperCase() : ''
  //     }
  //   },
  //   rules: {
  //     p_rusun: { required: true }
  //   },
  //   request: 'getInvoiceEntriesListrikBLTHTerakhir'
  // },
  getEntriesListrikCalculated: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? req.query.p_id_kontrak_sewa
          : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_id_kontrak_sewa: { required: true },
      p_blth: { required: true }
    },
    request: 'getEntriesListrikCalculated'
  },
  postEntriesListrik: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? req.body.p_id_kontrak_sewa
          : 0,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_blth: { required: true },
      p_id_kontrak_sewa: { required: true }
    },
    request: 'postEntriesListrik'
  },
  delEntriesListrik: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_invoice_entries: req.body.p_id_invoice_entries
          ? req.body.p_id_invoice_entries
          : 0
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_invoice_entries: { required: true }
    },
    request: 'delEntriesListrik'
  },
  // getInvoiceEntriesAir: {
  //   params: (req) => {
  //     const page = req.query.page ? req.query.page : 1
  //     const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
  //     const sortBy = req.query.sortBy
  //       ? req.query.sortBy.length > 0
  //         ? req.query.sortBy[0]
  //         : null
  //       : null
  //     const sortDesc = req.query.sortDesc
  //       ? req.query.sortDesc.length > 0
  //         ? req.query.sortDesc[0]
  //         : false
  //       : false
  //     return {
  //       p_rusun: req.query.p_rusun
  //         ? req.query.p_rusun.toString().trim().toUpperCase()
  //         : '',
  //       p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
  //       p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
  //       p_id_lantai: req.query.p_id_lantai
  //         ? Number(req.query.p_id_lantai)
  //         : null,
  //       p_search: req.query.p_search
  //         ? req.query.p_search.toString().trim().toUpperCase()
  //         : '',
  //       p_status: req.query.p_status
  //         ? req.query.p_status.toString().trim().toUpperCase()
  //         : '',
  //       p_no_kontrak: req.query.p_no_kontrak
  //         ? req.query.p_no_kontrak.toString().trim().toUpperCase()
  //         : '',
  //       p_jenis_kontrak: req.query.p_jenis_kontrak
  //         ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
  //         : '',
  //       p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
  //       page: page,
  //       itemsPerPage: itemsPerPage,
  //       sortBy: sortBy,
  //       sortDesc: sortDesc
  //     }
  //   },
  //   rules: {
  //     p_rusun: { required: true }
  //   },
  //   request: 'getInvoiceEntriesAir'
  // },
  // getInvoiceEntriesAir: {
  //   params: (req) => {
  //     return {
  //       p_rusun: req.query.p_rusun ? req.query.p_rusun.toString().trim().toUpperCase() : '',
  //       p_unit: req.query.p_unit ? req.query.p_unit : 0,
  //       p_blok: req.query.p_blok ? req.query.p_blok.toString().trim().toUpperCase() : '',
  //       p_search: req.query.p_search ? req.query.p_search.toString().trim().toUpperCase() : '',
  //       p_status: req.query.p_status ? req.query.p_status.toString().trim().toUpperCase() : '',
  //       p_id: req.query.p_id ? req.query.p_id : 0,
  //       p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
  //     }
  //   },
  //   rules: {
  //     p_rusun: { required: true }
  //   },
  //   request: 'getInvoiceEntriesAir'
  // },
  getInvoiceEntriesAir: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesAir'
  },
  getInvoiceEntriesAirBLTHTerakhir: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? req.query.p_id : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesAirBLTHTerakhir'
  },
  getEntriesAirCalculated: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? req.query.p_id_kontrak_sewa
          : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_id_kontrak_sewa: { required: true },
      p_blth: { required: true }
    },
    request: 'getEntriesAirCalculated'
  },
  postEntriesAir: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? req.body.p_id_kontrak_sewa
          : 0,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_blth: { required: true },
      p_id_kontrak_sewa: { required: true }
    },
    request: 'postEntriesAir'
  },
  delEntriesAir: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_invoice_entries: req.body.p_id_invoice_entries
          ? req.body.p_id_invoice_entries
          : 0
      }
    },
    rules: {
      p_id_invoice_entries: { required: true }
    },
    request: 'delEntriesAir'
  },
  // getInvoiceEntriesFasilitas: {
  //   params: (req) => {
  //     const page = req.query.page ? req.query.page : 1
  //     const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
  //     const sortBy = req.query.sortBy
  //       ? req.query.sortBy.length > 0
  //         ? req.query.sortBy[0]
  //         : null
  //       : null
  //     const sortDesc = req.query.sortDesc
  //       ? req.query.sortDesc.length > 0
  //         ? req.query.sortDesc[0]
  //         : false
  //       : false
  //     return {
  //       p_rusun: req.query.p_rusun
  //         ? req.query.p_rusun.toString().trim().toUpperCase()
  //         : '',
  //       p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
  //       p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
  //       p_id_lantai: req.query.p_id_lantai
  //         ? Number(req.query.p_id_lantai)
  //         : null,
  //       p_search: req.query.p_search
  //         ? req.query.p_search.toString().trim().toUpperCase()
  //         : '',
  //       p_status: req.query.p_status
  //         ? req.query.p_status.toString().trim().toUpperCase()
  //         : '',
  //       p_no_kontrak: req.query.p_no_kontrak
  //         ? req.query.p_no_kontrak.toString().trim().toUpperCase()
  //         : '',
  //       p_jenis_kontrak: req.query.p_jenis_kontrak
  //         ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
  //         : '',
  //       p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
  //       page: page,
  //       itemsPerPage: itemsPerPage,
  //       sortBy: sortBy,
  //       sortDesc: sortDesc
  //     }
  //   },
  //   rules: {
  //     p_rusun: { required: true }
  //   },
  //   request: 'getInvoiceEntriesFasilitas'
  // },
  getInvoiceEntriesFasilitas: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesFasilitas'
  },
  getInvoiceEntriesFasilitasBLTHTerakhir: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? req.query.p_id : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesFasilitasBLTHTerakhir'
  },
  getEntriesFasilitasCalculated: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? req.query.p_id_kontrak_sewa
          : 0,
        // p_periode_awal: req.query.p_periode_awal ? req.query.p_periode_awal.trim() : '',
        // p_periode_akhir: req.query.p_periode_akhir ? req.query.p_periode_akhir.trim() : ''
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_id_kontrak_sewa: { required: true },
      p_blth: { required: true }
    },
    request: 'getEntriesFasilitasCalculated'
  },
  postEntriesFasilitas: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? req.body.p_id_kontrak_sewa
          : 0,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : ''
        // p_periode_awal: req.body.p_periode_awal ? req.body.p_periode_awal.trim() : '',
        // p_periode_akhir: req.body.p_periode_akhir ? req.body.p_periode_akhir.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_blth: { required: true },
      p_id_kontrak_sewa: { required: true }
      // p_periode_awal: { required: true },
      // p_periode_akhir: { required: true }
    },
    request: 'postEntriesFasilitas'
  },
  delEntriesFasilitas: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_invoice_entries: req.body.p_id_invoice_entries
          ? req.body.p_id_invoice_entries
          : 0,
        p_keterangan: req.body.p_keterangan ? req.body.p_keterangan.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_invoice_entries: { required: true }
    },
    request: 'delEntriesFasilitas'
  },
  getEntriesFasilitasUnit: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.query.p_blth ? req.query.p_blth.trim().toUpperCase() : null
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getEntriesFasilitasUnit'
  },
  postEntriesFasilitasUnit: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : null,
        p_id_fasilitas_units: req.body.p_id_fasilitas_units
          ? req.body.p_id_fasilitas_units
          : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun min 5 characters'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun bulan tagihan format YYYY-MM'
        }
      },
      p_id_fasilitas_units: {
        array: {
          id: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID meter logs Required'
            }
          }
        }
      }
    },
    request: 'postEntriesFasilitasUnit'
  },
  getInvoicePraInvoice: {
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
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : '',
        p_nama: req.query.p_nama
          ? req.query.p_nama.toString().trim().toUpperCase()
          : '',
        p_prs: req.query.p_prs
          ? req.query.p_prs.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
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
      p_rusun: { required: true }
    },
    request: 'getInvoicePraInvoice'
  },
  getInvoicePraInvoiceDetil: {
    params: (req) => {
      return {
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : 0,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_kontrak: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoicePraInvoiceDetil'
  },
  getInvoicePraInvoiceInfo: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : null,
        p_kelompok: req.query.p_kelompok
          ? req.query.p_kelompok.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_kontrak: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoicePraInvoiceInfo'
  },
  postInvoiceCreate: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kontrak: req.body.p_kontrak
          ? req.body.p_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : '',
        p_data_info: req.body.p_data_info ? req.body.p_data_info : {}
      }
    },
    rules: {
      p_blth: { required: true },
      p_data_info: {
        required: true,
        type: 'object',
        rules: {
          periodeAwal: { required: true },
          periodeAkhir: { required: true }
        }
      }
    },
    request: 'postInvoiceCreate'
  },
  getInvoice: {
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
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : '',
        p_nama: req.query.p_nama
          ? req.query.p_nama.toString().trim().toUpperCase()
          : '',
        p_prs: req.query.p_prs
          ? req.query.p_prs.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim()
          : '',
        p_flag_rekon: req.query.p_flag_rekon,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoice'
  },
  getInvoiceInfo: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_invoice: { required: true }
    },
    request: 'getInvoiceInfo'
  },
  delInvoiceCancel: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_no_invoice: req.body.p_no_invoice
          ? req.body.p_no_invoice.toString().trim().toUpperCase()
          : '',
        p_alasan_na: req.body.p_alasan_na
          ? req.body.p_alasan_na.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_invoice: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No Invoice harus ada dan maximum 50 character'
        }
      }
    },
    request: 'delInvoiceCancel'
  },
  getInvoiceDetil: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {
      p_no_invoice: { required: true }
    },
    request: 'getInvoiceDetil'
  },
  // getInvoicePayDueDate: {
  //   params: (req) => {
  //     return {
  //       p_rusun: req.query.p_rusun ? req.query.p_rusun.toString().trim().toUpperCase() : '',
  //       p_search: req.query.p_search ? req.query.p_search.toString().trim().toUpperCase() : '',
  //       p_no: req.query.p_no ? req.query.p_no.toString().trim().toUpperCase() : ''
  //     }
  //   },
  //   rules: {
  //     p_rusun: { required: true }
  //   },
  //   request: 'getInvoicePayDueDate'
  // },
  getInvoiceEntriesDenda: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesDenda'
  },
  getInvoiceEntriesInventaris: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
      const sortDesc = req.query.sortDesc
        ? req.query.sortDesc.length > 0
          ? req.query.sortDesc[0]
          : false
        : false
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_jenis_kontrak: req.query.p_jenis_kontrak
          ? req.query.p_jenis_kontrak.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoiceEntriesInventaris'
  },
  getInvoiceEntriesInventarisBarangRusakHilang: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.toString().trim() : ''
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesInventarisBarangRusakHilang'
  },
  postInvoiceEntriesInventarisSubmit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.body.p_blth ? req.body.p_blth : null,
        p_data_inventaris: req.body.p_data_inventaris
          ? req.body.p_data_inventaris
          : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^KODE Rusun maximum 5 character'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun Bulan Tagihan format YYYY-MM'
        }
      },
      p_data_inventaris: {
        array: {
          id_inventaris_unit: {
            type: {
              type: 'number',
              message: '^id inventaris unit harus angka'
            }
          }
        }
      }
    },
    request: 'postInvoiceEntriesInventarisSubmit'
  },
  delInvoiceEntriesInventaris: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_invoice_entries: req.body.p_id_invoice_entries
          ? req.body.p_id_invoice_entries
          : null,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {
      p_id_invoice_entries: { required: true }
    },
    request: 'delInvoiceEntriesInventaris'
  },
  getEntriesPraProsesDendaByRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_prosen: req.query.p_prosen ? Number(req.query.p_prosen) : 10,
        p_blth: req.query.p_blth ? req.query.p_blth : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^KODE Rusun maximum 5 character'
        }
      },
      p_prosen: {
        presence: true,
        type: {
          type: 'number',
          message: '^prosen denda harus angka'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun Bulan Tagihan format YYYY-MM'
        }
      }
    },
    request: 'getEntriesPraProsesDendaByRusun'
  },
  postInvoiceProsesDendaByRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_prosen: req.body.p_prosen ? Number(req.body.p_prosen) : 10,
        p_blth: req.body.p_blth ? req.body.p_blth : '',
        p_data_invoice: req.body.p_data_invoice ? req.body.p_data_invoice : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^KODE Rusun maximum 5 character'
        }
      },
      p_prosen: {
        type: {
          type: 'number',
          message: '^prosen denda harus angka'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun Bulan Tagihan format YYYY-MM'
        }
      },
      p_data_invoice: {
        array: {
          no_invoice: {
            presence: true
          }
        }
      }
    },
    request: 'postInvoiceProsesDendaByRusun'
  },
  postInvoiceProsesDendaByData: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_blth: req.body.p_blth ? req.body.p_blth : '',
        p_data: req.body.p_data ? req.body.p_data : null
      }
    },
    rules: {
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun Bulan Tagihan format YYYY-MM'
        }
      }
    },
    request: 'postInvoiceProsesDendaByData'
  },
  delInvoiceEntriesDenda: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_no_invoice: req.body.p_no_invoice ? req.body.p_no_invoice : null,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : null
      }
    },
    rules: {
      p_blth: { required: true },
      p_no_invoice: { required: true }
    },
    request: 'delInvoiceEntriesDenda'
  },
  postInvoiceFinalisasiBerhentiEqCreate: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_berhenti: req.body.p_id_berhenti
          ? Number(req.body.p_id_berhenti)
          : 0
      }
    },
    rules: {
      p_id_berhenti: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID BErhenti harus angka'
        }
      }
    },
    request: 'postInvoiceFinalisasiBerhentiEqCreate'
  },
  getInvoiceSudahDenda: {
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
        p_date: req.query.p_date ? req.query.p_date : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : '',
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim().toUpperCase()
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
          message: '^Kode Rusun maximum 3 character'
        }
      },
      p_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Format Tanggal YYYY-MM-DD'
        }
      }
    },
    request: 'getInvoiceSudahDenda'
  },
  getInvoicePayDueDate: {
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
        p_date: req.query.p_date ? req.query.p_date : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_kontrak: req.query.p_kontrak
          ? req.query.p_kontrak.toString().trim().toUpperCase()
          : '',
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim().toUpperCase()
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
          message: '^Kode Rusun maximum 3 character'
        }
      },
      p_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Format Tanggal YYYY-MM-DD'
        }
      }
    },
    request: 'getInvoicePayDueDate'
  },
  getInvoiceDendaSetting: {
    params: (req) => {
      return {
        p_id_setting_denda: req.query.p_id_setting_denda
          ? req.query.p_id_setting_denda
          : null,
        p_aktif: req.query.p_aktif !== undefined ? req.query.p_aktif : null
      }
    },
    rules: {},
    request: 'getInvoiceDendaSetting'
  },
  postInvoiceDendaSetting: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_setting_denda: req.body.p_id_setting_denda
          ? req.body.p_id_setting_denda
          : null,
        p_tgl_mulai_berlaku: req.body.p_tgl_mulai_berlaku
          ? req.body.p_tgl_mulai_berlaku.toString().trim().toUpperCase()
          : '',
        p_prosen_denda: req.body.p_prosen_denda
          ? Number(req.body.p_prosen_denda)
          : null,
        p_aktif: req.body.p_aktif !== undefined ? req.body.p_aktif : null
      }
    },
    rules: {
      p_tgl_mulai_berlaku: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl MUlai Berlaku Denda format YYYY-MM-DD'
        }
      }
    },
    request: 'postInvoiceDendaSetting'
  },
  getInvoicePajakDibayarPenyewa: {
    params: (req) => {
      const page = req.query.page ? req.query.page : 1
      const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
      const sortBy = req.query.sortBy
        ? req.query.sortBy.length > 0
          ? req.query.sortBy[0]
          : null
        : null
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
        p_ada_bukti_potong: req.query.p_ada_bukti_potong
          ? req.query.p_ada_bukti_potong
          : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getInvoicePajakDibayarPenyewa'
  },
  postInvoiceBuktiPotongPajak: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_no_invoice: req.body.p_no_invoice
          ? req.body.p_no_invoice.toString().trim().toUpperCase()
          : '',
        p_no_bukti_pajak: req.body.p_no_bukti_pajak
          ? req.body.p_no_bukti_pajak.toString().trim().toUpperCase()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_no_invoice: { required: true },
      p_path: { required: true }
    },
    request: 'postInvoiceBuktiPotongPajak'
  },
  getInvoiceBuktiPotongPajakLampiran: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_invoice: { required: true }
    },
    request: 'getInvoiceBuktiPotongPajakLampiran'
  },
  postInvoiceProcessAll: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode_rusun: req.body.p_kode_rusun
          ? req.body.p_kode_rusun.toString().trim().toUpperCase()
          : '',
        p_blth: req.body.p_blth
          ? req.body.p_blth.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_kode_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'postInvoiceProcessAll'
  },
  postInvoiceFinalisasiDeposit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_berhenti: req.body.p_id_berhenti ? req.body.p_id_berhenti : null,
        p_bayar: req.body.p_bayar ? Number(req.body.p_bayar) : 0
      }
    },
    rules: {
      p_id_berhenti: { required: true }
    },
    request: 'postInvoiceFinalisasiDeposit'
  },
  getInvoiceEntriesListrikLogs: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : ''
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesListrikLogs'
  },
  postInvoiceEntriesListrikLogs: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : null,
        p_id_meter_logs: req.body.p_id_meter_logs
          ? req.body.p_id_meter_logs
          : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun min 5 characters'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun bulan tagihan format YYYY-MM'
        }
      },
      p_id_meter_logs: {
        array: {
          id: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID meter logs Required'
            }
          }
        }
      }
    },
    request: 'postInvoiceEntriesListrikLogs'
  },
  getInvoiceEntriesAirLogs: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim().toUpperCase() : ''
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesAirLogs'
  },
  postInvoiceEntriesAirLogs: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.trim().toUpperCase()
          : null,
        p_blth: req.body.p_blth ? req.body.p_blth.trim() : null,
        p_id_meter_logs: req.body.p_id_meter_logs
          ? req.body.p_id_meter_logs
          : []
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun min 5 characters'
        }
      },
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^Tahun bulan tagihan format YYYY-MM'
        }
      },
      p_id_meter_logs: {
        array: {
          id: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID meter logs Required'
            }
          }
        }
      }
    },
    request: 'postInvoiceEntriesAirLogs'
  },
  getInvoiceEntriesRekap: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.trim().toUpperCase()
          : '',
        p_blth: req.query.p_blth ? req.query.p_blth.trim().toUpperCase() : ''
      }
    },
    rules: {
      p_rusun: { required: true },
      p_blth: { required: true }
    },
    request: 'getInvoiceEntriesRekap'
  },
  getInvoicePembayaran: {
    params: (req) => {
      return {
        p_id_pembayaran: req.query.p_id_pembayaran
          ? Number(req.query.p_id_pembayaran)
          : null
      }
    },
    rules: {},
    request: 'getInvoicePembayaran'
  }
}

exports.methodGet = {
  '005000000': (req, res) => apiReq.getData(req, res, reqCtrl.getInvoice), //  invoice
  '005000001': (req, res) => apiReq.getData(req, res, reqCtrl.getInvoiceDetil), // invoice/detil
  '005000002': (req, res) => apiReq.getData(req, res, reqCtrl.getInvoiceInfo), // invoice/info
  '005001000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoicePraInvoice), // invoice/pra-invoice
  '005001001': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoicePraInvoiceDetil), // invoice/pra-invoice-detil
  '005001002': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoicePraInvoiceInfo), // invoice/pra-invoice-info

  '005010000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesRekap), // invoice/entries-rekap
  '005020000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesSewa), // invoice/entries-sewa
  '005021000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesSewaUnit), // invoice/entries-sewa-unit
  '005030000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesDeposit), // invoice/entries-deposit
  '005030001': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesDepositDetil), // invoice/entries-deposit-detil

  '005040000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesListrik), // invoice/entries-listrik
  '005041000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesListrikLogs), // invoice/entries-listrik-logs

  '005050000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesAir), // invoice/entries-air
  '005051000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesAirLogs), // invoice/entries-air-logs

  '005060000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesFasilitas), // invoice/entries-fasilitas
  '005061000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getEntriesFasilitasUnit), // invoice/entries-fasilitas-unit

  '005070000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesInventaris), // invoice/entries-inventaris
  '005071000': (req, res) =>
    apiReq.getData(
      req,
      res,
      reqCtrl.getInvoiceEntriesInventarisBarangRusakHilang
    ), // invoice/entries-inventaris-rusak-hilang
  '005080000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesDenda), // invoice/entries-denda
  '005081000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getEntriesPraProsesDendaByRusun), // invoice/entries-denda/pra-proses
  '005002001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getInvoicePayDueDate), // invoice/pay-due-days
  '005002002': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getInvoiceSudahDenda), // invoice/sudah-denda
  '005003000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoicePajakDibayarPenyewa), // invoice/bukti-potong/pajak-dibayar-penyewa
  '005003001': (req, res) =>
    apiReq.getData(
      req,
      res,
      reqCtrl.getInvoiceBuktiPotongPajakLampiran,
      'path_bukti_potong_pajak'
    ), // invoice/bukti-potong/lampiran
  '005005000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getInvoiceDendaSetting) // invoice/setting-denda
  /*
  'invoice/entries-sewa/detil': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesSewaDetil),
  'invoice/entries-sewa/blth-terakhir-invoice': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesSewaBLTHTerakhir),
  'invoice/entries-sewa/calculated-sewa': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.getEntriesSewaCalculated),
  'invoice/entries-sewa/periode': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.getInvoiceEntriesSewaPeriode),
  'invoice/entries-listrik/calculated-listrik': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.getEntriesListrikCalculated),
  'invoice/entries-listrik/blth-terakhir-invoice': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesListrikBLTHTerakhir),
  'invoice/entries-air/calculated-air': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.getEntriesAirCalculated),
  'invoice/entries-air/blth-terakhir-invoice': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesAirBLTHTerakhir),
  'invoice/entries-fasilitas/blth-terakhir-invoice': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInvoiceEntriesFasilitasBLTHTerakhir),
  'invoice/entries-fasilitas/calculated-fasilitas': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.getEntriesFasilitasCalculated),
  'invoice/pembayaran': async (req, res) => {
    try {
      const p_id_pembayaran = req.query.p_id_pembayaran
        ? Number(req.query.p_id_pembayaran)
        : null
      const dataInvoice = await apiReqNew.getDataRaw('getInvoicePembayaran', {
        p_id_pembayaran: p_id_pembayaran
      })
      console.log(dataInvoice)
      if (dataInvoice.ret === 0) {
        const datanya = []
        let item
        for (let i = 0; i < dataInvoice.data.length; i++) {
          item = await apiReq.getDataRaw('getInvoiceInfo', {
            p_no_invoice: dataInvoice.data[i].no_invoice
          })
          if (item.ret === 0) {
            datanya.push(item.data)
          }
        }
        if (dataInvoice.data.length > 0) {
          res.status(200).json({
            ret: 0,
            data: {
              infoBayar: { ...dataInvoice.data[0] },
              invoice: [...datanya]
            }
          })
        } else {
          res.status(200).json({
            ret: 0,
            data: { infoBayar: {}, invoice: [...datanya] }
          })
        }
      } else {
        res.status(200).json({ ret: -1, msg: dataInvoice.msg })
      }
    } catch (e) {
      res.status(200).json({ ret: -1, msg: 'error getting data' })
    }
  }
  */
}

exports.methodPost = {
  '005000000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postInvoiceCreate), // invoice
  '005021000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postEntriesSewaUnit), // invoice/entries-sewa-unit
  '005041000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postInvoiceEntriesListrikLogs), // invoice/entries-listrik-logs
  '005051000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postInvoiceEntriesAirLogs), // invoice/entries-air-logs
  '005061000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postEntriesFasilitasUnit), // invoice/entries-fasilitas-unit
  '005071000': (req, res) =>
    apiReqNew.callFunction(
      req,
      res,
      reqCtrl.postInvoiceEntriesInventarisSubmit
    ), // invoice/entries-inventaris-rusak-hilang
  '005081000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postInvoiceProsesDendaByRusun), // invoice/entries-denda
  '005004000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postInvoiceFinalisasiDeposit), // invoice/berhenti/finalisasi-deposit
  '005005000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postInvoiceDendaSetting) // invoice/setting-denda
  /*
  'invoice/entries-sewa': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postEntriesSewa),
  'invoice/entries-listrik': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postEntriesListrik),
  'invoice/entries-air': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postEntriesAir),
  'invoice/entries-fasilitas': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postEntriesFasilitas),
  'invoice/item-finalisasi-berhenti-kontrak': (req, res) =>
    apiReqNew.callFunction(
      req,
      res,
      reqCtrl.postInvoiceFinalisasiBerhentiEqCreate
    ),
  'invoice/entries/process-all': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postInvoiceProcessAll)
  */
}

exports.methodDel = {
  '005000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delInvoiceCancel), // invoice/cancel
  '005020000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delEntriesSewaUnit), // invoice/entries-sewa-unit
  '005040000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delEntriesListrik), // invoice/entries-listrik
  '005050000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delEntriesAir), // invoice/entries-air
  '005060000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delEntriesFasilitas), // invoice/entries-fasilitas
  '005070000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delInvoiceEntriesInventaris), // invoice/entries-inventaris-rusak-hilang
  '005080000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delInvoiceEntriesDenda) // invoice/entries-denda
  /*
  'invoice/entries-sewa': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delEntriesSewa)
    */
}

exports.methodPostUploadBase64 = {
  '005003000': (req, res) => {
    console.log('aaaaa', req.body)
    return apiReq.callFunction(req, res, reqCtrl.postInvoiceBuktiPotongPajak) // invoice/bukti-potong/pajak-dibayar-penyewa
  }
}
