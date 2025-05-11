const apiReqNew = require('./api-caller-new')
const isString = require('lodash/isString')
// const isObject = require('lodash/isObject')

const reqCtrl = {
  getKontrakSewaInfo: {
    params: (req) => {
      return {
        p_kontrak: req.query.p_kontrak ? Number(req.query.p_kontrak) : 0
      }
    },
    rules: {
      p_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakSewaInfo'
  },
  getKontrakApproval: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_jenis_app: req.query.p_jenis_app
          ? Number(req.query.p_jenis_app)
          : null,
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
          message: '^Kode Rusun maximum 5 character'
        }
      }
    },
    request: 'getKontrakApproval'
  },
  postKontrakApproval: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kontrak: req.body.p_kontrak ? Number(req.body.p_kontrak) : 0,
        p_approved: req.body.p_approved
          ? isString(req.body.p_approved)
            ? req.body.p_approved.toUpperCase() === 'TRUE'
            : req.body.p_approved
          : false,
        p_alasan: req.body.p_alasan
          ? req.body.p_alasan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      },
      p_approved: {
        presence: true,
        type: {
          type: 'boolean',
          message: '^Approval harus true or false'
        }
      },
      p_alasan: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Alasan approval maximum 100 character'
        }
      }
    },
    request: 'postKontrakApproval'
  },
  getKontrakAdendum: {
    params: (req) => {
      return {
        p_kontrak: req.query.p_kontrak ? Number(req.query.p_kontrak) : 0,
        p_adendum: req.query.p_adendum ? Number(req.query.p_adendum) : 0
      }
    },
    rules: {
      p_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      },
      p_adendum: {
        type: {
          type: 'number',
          message: '^ID Adendum harus angka'
        }
      }
    },
    request: 'getKontrakAdendum'
  },
  getKontrakAdendumPreData: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : 0
      }
    },
    rules: {
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      }
    },
    request: 'getKontrakAdendumPreData'
  },
  postKontrakAdendum: {
    params: (req) => {
      // let xData = {}
      // console.log('asas', req.body.p_data_adendum, isString(req.body.p_data_adendum))
      // if (req.body.p_data_adendum) {
      //   if (isObject(req.body.p_data_adendum)) {
      //     xData = req.body.p_data_adendum
      //   } else if (isString(req.body.p_data_adendum)) {
      //     if (apiReqNew.IsJsonString(req.body.p_data_adendum)) {
      //       xData = JSON.parse(req.body.p_data_adendum)
      //     }
      //   }
      // }
      return {
        p_pengguna: req.jid,
        p_kontrak: req.body.p_kontrak ? Number(req.body.p_kontrak) : 0,
        p_data_adendum: req.body.p_data_adendum ? req.body.p_data_adendum : null
      }
    },
    rules: {
      p_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      },
      p_data_adendum: {
        object: {
          idAdendum: {
            type: {
              type: 'number',
              message: '^ID Adendum harus angka'
            }
          },
          // jmlhBulanAdendum: {
          //   presence: true,
          //   type: {
          //     type: 'number',
          //     message: '^Jumlah bulan Adendum harus angka'
          //   }
          // },
          tglMulaiSewa: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal mulai sewa date format: YYYY-MM-DD'
            }
          },
          tglBerakhirSewa: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal berakhir sewa date format: YYYY-MM-DD'
            }
          },
          biayaAdmin: {
            presence: true,
            type: {
              type: 'number',
              message: '^Biaya admin harus angka'
            }
          },
          biayaAdminProsen: {
            type: {
              type: 'boolean',
              message: '^Biaya admin prosen haru true or false'
            }
          },
          pihak1TtdTitle: {
            length: {
              maximum: 100,
              message: '^Pihak 1 Tanda Tangan Title maximum 100 character'
            }
          },
          pihak1TtdNama: {
            length: {
              maximum: 100,
              message: '^Pihak 1 Tanda Tangan Nama maximum 100 character'
            }
          },
          pihak1TtdJabatan: {
            length: {
              maximum: 100,
              message: '^Pihak 1 Tanda Tangan Jabatan maximum 100 character'
            }
          },
          pihak2TtdTitle: {
            length: {
              maximum: 100,
              message: '^Pihak 2 Tanda Tangan Title maximum 100 character'
            }
          },
          pihak2TtdNama: {
            length: {
              maximum: 100,
              message: '^Pihak 2 Tanda Tangan Nama maximum 100 character'
            }
          },
          pihak2TtdJabatan: {
            length: {
              maximum: 100,
              message: '^Pihak 2 Tanda Tangan Jabatan maximum 100 character'
            }
          }
        }
      }
    },
    request: 'postKontrakAdendum'
  },
  postKontrakAdendumApproval: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_adendum: req.body.p_id_adendum ? Number(req.body.p_id_adendum) : 0,
        p_approved: req.body.p_approved
          ? isString(req.body.p_approved)
            ? req.body.p_approved.toUpperCase() === 'TRUE'
            : req.body.p_approved
          : false,
        p_alasan: req.body.p_alasan
          ? req.body.p_alasan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_adendum: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      },
      p_approved: {
        presence: true,
        type: {
          type: 'boolean',
          message: '^Approval harus true or false'
        }
      },
      p_alasan: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Alasan approval maximum 100 character'
        }
      }
    },
    request: 'postKontrakAdendumApproval'
  },
  getKontrakBerjalan: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : 0
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 character'
        }
      },
      p_no_kontrak: {
        length: {
          maximum: 50,
          message: '^No Kontrak maximum 50 character'
        }
      },
      p_blok: {
        length: {
          maximum: 5,
          message: '^Kode Blok maximum 5 character'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakBerjalan'
  },
  getKontrakAktif: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_status: req.query.p_status ? req.query.p_status.trim() : '',
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
          message: '^Kode Rusun maximum 5 character'
        }
      },
      p_no_kontrak: {
        length: {
          maximum: 50,
          message: '^No Kontrak maximum 50 character'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_status: {
        length: {
          maximum: 2,
          message:
            '^Status Kontrak maximum 2 character (M: Menghuni, BM: Belum Menghuni, H: Berakhir/Berhenti, JT: Jatuh Tempo,{kosong}:ALL Status)'
        }
      }
    },
    request: 'getKontrakAktif'
  },
  getKontrakStatusPembayaranDeposit: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_bayar: req.query.p_bayar ? req.query.p_bayar : null,
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
          message: '^Kode Rusun maximum 5 character'
        }
      },
      p_no_kontrak: {
        length: {
          maximum: 50,
          message: '^No Kontrak maximum 50 character'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakStatusPembayaranDeposit'
  },
  getKontrakDalamProses: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_status: req.query.p_status ? req.query.p_status : null,
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
          message: '^Kode Rusun maximum 5 character'
        }
      },
      p_no_kontrak: {
        length: {
          maximum: 50,
          message: '^No Kontrak maximum 50 character'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakDalamProses'
  },
  getKontrakUnit: {
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
    request: 'getKontrakUnit'
  },
  getKontrakPenghuniUnit: {
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
    request: 'getKontrakPenghuniUnit'
  },
  getKontrakFasilitasUnit: {
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
    request: 'getKontrakFasilitasUnit'
  },
  getKontrakFasilitasUnitTarif: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : 0,
        p_kode_fasilitas: req.query.p_kode_fasilitas
          ? req.query.p_kode_fasilitas
          : null,
        p_periode_awal: req.query.p_periode_awal
          ? req.query.p_periode_awal
          : null
      }
    },
    rules: {
      p_id_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_kode_fasilitas: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      },
      p_periode_awal: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl periode awal sewa format YYYY-MM-DD'
        }
      }
    },
    request: 'getKontrakFasilitasUnitTarif'
  },
  postKontrakFasilitasUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak: req.body.p_id_kontrak ? Number(req.body.p_id_kontrak) : 0,
        p_id_unit: req.body.p_id_unit ? Number(req.body.p_id_unit) : 0,
        p_kode_fasilitas: req.body.p_kode_fasilitas
          ? req.body.p_kode_fasilitas.toString().trim().toUpperCase()
          : '',
        tgl_mulai: req.body.tgl_mulai ? req.body.tgl_mulai.trim() : '',
        tgl_berakhir: req.body.tgl_berakhir ? req.body.tgl_berakhir.trim() : ''
      }
    },
    rules: {
      p_id_kontrak: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa harus angka'
        }
      },
      p_id_unit: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_kode_fasilitas: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      },
      tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Mulai date format YYYY-MM-DD'
        }
      },
      tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Berakhir date format YYYY-MM-DD'
        }
      }
    },
    request: 'postKontrakFasilitasUnit'
  },
  putKontrakFasilitasUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_fasilitas: req.body.p_id_kontrak_fasilitas
          ? Number(req.body.p_id_kontrak_fasilitas)
          : 0,
        tgl_berakhir: req.body.tgl_berakhir ? req.body.tgl_berakhir.trim() : ''
      }
    },
    rules: {
      p_id_kontrak_fasilitas: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa Fasilitas harus angka'
        }
      },
      tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Berakhir date format YYYY-MM-DD'
        }
      }
    },
    request: 'putKontrakFasilitasUnit'
  },
  delKontrakFasilitasUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_fasilitas: req.body.p_id_kontrak_fasilitas
          ? Number(req.body.p_id_kontrak_fasilitas)
          : 0
      }
    },
    rules: {
      p_id_kontrak_fasilitas: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa Fasilitas harus angka'
        }
      }
    },
    request: 'delKontrakFasilitasUnit'
  },
  getKontrakBerhenti: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_no_kontrak: req.query.p_no_kontrak
          ? req.query.p_no_kontrak.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_status: req.query.p_status ? req.query.p_status : null,
        p_wo_status: req.query.p_wo_status
          ? req.query.p_wo_status.toString().trim().toUpperCase()
          : null,
        p_id_berhenti: req.query.p_id_berhenti
          ? Number(req.query.p_id_berhenti)
          : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5character'
        }
      },
      p_id_kontrak: {
        type: {
          type: 'number',
          message: '^ID Kontrak harus angka'
        }
      }
    },
    request: 'getKontrakBerhenti'
  },
  postKontrakBerhenti: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? Number(req.body.p_id_kontrak_sewa)
          : 0,
        p_tgl_berhenti: req.body.p_tgl_berhenti
          ? req.body.p_tgl_berhenti.trim()
          : '',
        p_tipe_berakhir: req.body.p_tipe_berakhir
          ? req.body.p_tipe_berakhir.trim()
          : '',
        p_alasan_berhenti: req.body.p_alasan_berhenti
          ? req.body.p_alasan_berhenti.toString().trim().toUpperCase()
          : ''
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
      p_tgl_berhenti: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Berhenti date format YYYY-MM-DD'
        }
      },
      p_tipe_berakhir: {
        length: {
          maximum: 2,
          message: '^Tipe berakhir maximum 2 character'
        }
      },
      p_alasan_berhenti: {
        length: {
          maximum: 150,
          message: '^Alasan Berakhir maximum 150 character'
        }
      }
    },
    request: 'postKontrakBerhenti'
  },
  getKontrakDaftarItem: {
    params: (req) => {
      return {
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? Number(req.query.p_id_kontrak_sewa)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null
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
      p_id_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'getKontrakDaftarItem'
  },
  getKontrakBerhentiFinalisasi: {
    params: (req) => {
      return {
        p_id_berhenti: req.query.p_id_berhenti
          ? Number(req.query.p_id_berhenti)
          : 0
      }
    },
    rules: {
      p_id_berhenti: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Kontrak Sewa Berhenti harus angka'
        }
      }
    },
    request: 'getKontrakBerhentiFinalisasi'
  },
  putKontrakBerhentiFinalisasi: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
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
          message: '^ID Kontrak Sewa Berhenti harus angka'
        }
      }
    },
    request: 'putKontrakBerhentiFinalisasi'
  },
  getKontrakLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? Number(req.query.p_id_kontrak_sewa)
          : 0
      }
    },
    rules: {
      p_id_kontrak_sewa: {
        presence: true,
        type: {
          type: Number,
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakLampiran'
  },
  getKontrakLampiranFile: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_kontrak_lampiran: req.query.p_id_kontrak_lampiran
          ? Number(req.query.p_id_kontrak_lampiran)
          : 0
      }
    },
    rules: {
      p_id_kontrak_lampiran: {
        presence: true,
        type: {
          type: Number,
          message: '^ID Kontrak Lampiran harus angka'
        }
      }
    },
    request: 'getKontrakLampiranFile'
  },
  postKontrakLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_jenis_perjanjian: req.body.p_jenis_perjanjian
          ? req.body.p_jenis_perjanjian.toString().trim().toUpperCase()
          : '',
        p_no_perjanjian: req.body.p_no_perjanjian
          ? req.body.p_no_perjanjian.toString().trim().toUpperCase()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_jenis_perjanjian: {
        presence: true,
        length: {
          message: '^Jenis Perjanjian (K: Kontrak, A: Adendum)'
        }
      },
      p_no_perjanjian: {
        presence: true,
        length: {
          maximum: 50,
          message: '^No Perjanian (Kontrak/ Adendum'
        }
      }
    },
    request: 'postKontrakLampiran'
  },
  getKontrakNoPerjanjian: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_jenis_perjanjian: req.query.p_jenis_perjanjian
          ? req.query.p_jenis_perjanjian.toString().trim().toUpperCase()
          : '',
        p_id_kontrak_sewa: req.query.p_id_kontrak_sewa
          ? Number(req.query.p_id_kontrak_sewa)
          : 0
      }
    },
    rules: {
      p_jenis_perjanjian: {
        presence: true,
        length: {
          message: '^Jenis Perjanjian (K: Kontrak, A: Adendum)'
        }
      },
      p_id_kontrak_sewa: {
        presence: true,
        type: {
          type: Number,
          message: '^ID Kontrak Sewa harus angka'
        }
      }
    },
    request: 'getKontrakNoPerjanjian'
  }
}

exports.methodGet = {
  '003000002': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakSewaInfo), // kontrak/info
  '003001000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakApproval), // kontrak/approval
  '003000000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakAktif), // kontrak/aktif
  '003000001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakDalamProses), // kontrak/dalam-proses
  '003002000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakBerhenti), // kontrak/berhenti
  '003002001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.getKontrakBerhentiFinalisasi), // kontrak/berhenti/finalisasi
  '003006000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakDaftarItem), // kontrak/item-unit
  '003004000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakLampiran), // kontrak/lampiran
  '003004002': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakLampiranFile, 'path_dokumen'), // kontrak/lampiran-file
  '003004001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakNoPerjanjian), // kontrak/no-perjanjian
  '003005001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakFasilitasUnitTarif), // kontrak/fasilitas-tarif
  '003000003': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakBerjalan), // kontrak/berjalan
  '003003000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakAdendum) // kontrak/adendum
  /*
  'kontrak/adendum-predata': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakAdendumPreData),
  'kontrak/unit': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakUnit),
  'kontrak/status-deposit': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakStatusPembayaranDeposit),
  'kontrak/fasilitas': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakFasilitasUnit) //
  'kontrak/penghuni': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakPenghuniUnit)
    */
}

exports.methodPost = {
  '003001000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakApproval), // kontrak/approval
  '003003001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakAdendumApproval), // kontrak/adendum/approval
  '003005000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakFasilitasUnit), // kontrak/fasilitas
  '003002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakBerhenti), // kontrak/berhenti
  '003003000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakAdendum) // kontrak/adendum
}

exports.methodPut = {
  '003005000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putKontrakFasilitasUnit), // kontrak/fasilitas
  '003002001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putKontrakBerhentiFinalisasi) // kontrak/berhenti/finalisasi
}

exports.methodDel = {
  '003005000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delKontrakFasilitasUnit) // kontrak/fasilitas
}

exports.methodPostUploadBase64 = {
  '003004000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKontrakLampiran) // kontrak/lampiran
}
