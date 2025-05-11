const apiReqNew = require('./api-caller-new')

const reqCtrl = {
  getKomplain: {
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
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : 0,
        p_id_lantai: req.query.p_id_lantai ? Number(req.query.p_id_lantai) : 0,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : 0,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        p_penyelesaian_status: req.query.p_penyelesaian_status
          ? req.query.p_penyelesaian_status.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
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
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_id_blok: {
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      },
      p_id_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_no: {
        length: {
          maximum: 50,
          message: '^No Kamplain maximum 50 characters'
        }
      },
      p_status: {
        length: {
          maximum: 1,
          message: '^Status Komplain maximum 1 characters'
        }
      },
      p_penyelesaian_status: {
        length: {
          maximum: 2,
          message: '^Penyelesaian Status maximum 2 characters'
        }
      }
    },
    request: 'getKomplain'
  },
  postKomplain: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_unit: req.body.p_unit ? Number(req.body.p_unit) : null,
        p_pelapor: req.body.p_pelapor
          ? req.body.p_pelapor.toString().trim().toUpperCase()
          : '',
        p_kategori: req.body.p_kategori
          ? req.body.p_kategori.toString().trim().toUpperCase()
          : '',
        p_title: req.body.p_title
          ? req.body.p_title.toString().trim().toUpperCase()
          : '',
        p_deskripsi: req.body.p_deskripsi
          ? req.body.p_deskripsi.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_pelapor: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Pelapor maximum 100 characters'
        }
      },
      p_kategori: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kategori Komplain maximum 5 characters'
        }
      },
      p_title: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Title Komplain maximum 100 characters'
        }
      }
    },
    request: 'postKomplain'
  },
  putKomplainPenyelesaian: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_komplain: req.body.p_komplain
          ? req.body.p_komplain.toString().trim().toUpperCase()
          : '',
        p_status: req.body.p_status
          ? req.body.p_status.toString().trim().toUpperCase()
          : '',
        p_tgl: req.body.p_tgl ? req.body.p_tgl.trim() : '',
        p_penyelesaian: req.body.p_penyelesaian
          ? req.body.p_penyelesaian.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_komplain: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Kode Komplain maximum 50 characters'
        }
      },
      p_status: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 2,
          message: '^Status Penyelesaian Komplain maximum 2 characters'
        }
      },
      p_tgl: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Penyelesaian format YYYY-MM-DD'
        }
      },
      p_penyelesaian: {
        presence: true
      }
    },
    request: 'putKomplainPenyelesaian'
  },
  delKomplain: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_komplain: req.body.p_komplain
          ? req.body.p_komplain.toString().trim().toUpperCase()
          : '',
        p_alasan: req.body.p_alasan
          ? req.body.p_alasan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_komplain: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Kode Komplain maximum 50 characters'
        }
      },
      p_alasan: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 300,
          message: '^Alasan NA maximum 300 characters'
        }
      }
    },
    request: 'delKomplain'
  },
  putKomplainForwardWo: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_no_komplain: req.body.p_no_komplain
          ? req.body.p_no_komplain.toString().trim().toUpperCase()
          : '',
        p_req_date: req.body.p_req_date ? req.body.p_req_date.trim() : '',
        p_tipe: req.body.p_tipe
          ? req.body.p_tipe.toString().trim().toUpperCase()
          : 'O',
        p_id_lantai: req.body.p_id_lantai ? Number(req.body.p_id_lantai) : null,
        p_id_blok: req.body.p_id_blok ? Number(req.body.p_id_blok) : null,
        p_id_unit: req.body.p_id_unit ? Number(req.body.p_id_unit) : null,
        p_lokasi: req.body.p_lokasi
          ? req.body.p_lokasi.toString().trim().toUpperCase()
          : '',
        p_deskripsi_wo: req.body.p_deskripsi_wo
          ? req.body.p_deskripsi_wo.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_komplain: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Kode Komplain maximum 50 characters'
        }
      },
      p_tipe: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 2,
          message: '^Tipe Work Order maximum 3 characters'
        }
      },
      p_req_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Req WO format YYYY-MM-DD'
        }
      },
      p_id_lantai: {
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      },
      p_id_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_id_blok: {
        type: {
          type: 'number',
          message: '^ID blok harus angka'
        }
      },
      p_lokasi: {
        length: {
          maximum: 100,
          message: '^Lokasi maximum 100 characters'
        }
      }
    },
    request: 'putKomplainForwardWo'
  }
}

exports.methodGet = {
  '009000000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getKomplain) // komplain
}

exports.methodPost = {
  '009000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postKomplain) // komplain
  //   '009000002': (req, res) =>
  //     apiReqNew.callFunction(req, res, reqCtrl.postKomplainForwardWo) // komplain/penyelesaian-wo
}

exports.methodPut = {
  // '009000000': (req, res) =>
  //   apiReqNew.callFunction(req, res, reqCtrl.postKomplain), // komplain
  '009000001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putKomplainPenyelesaian), // komplain/penyelesaian
  '009000002': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putKomplainForwardWo) // komplain/penyelesaian-wo
}

exports.methodDel = {
  '009000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delKomplain) // komplain
}
