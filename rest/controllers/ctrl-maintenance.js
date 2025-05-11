const apiReqNew = require('./api-caller-new')
const apiReq = require('./api-caller')

const reqCtrl = {
  getMtncWo: {
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
        p_blok: req.query.p_blok ? Number(req.query.p_blok) : null,
        p_lantai: req.query.p_lantai ? Number(req.query.p_lantai) : null,
        p_unit: req.query.p_unit ? Number(req.query.p_unit) : null,
        p_tipe: req.query.p_tipe
          ? req.query.p_tipe.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status ? req.query.p_status.trim() : '',
        p_complete_status: req.query.p_complete_status
          ? req.query.p_complete_status.trim()
          : '',
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : '',
        p_ref: req.query.p_ref ? req.query.p_ref.toString().trim() : '',
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
          message: '^Kode Rusun maximum 5 character'
        }
      },
      p_blok: {
        type: {
          type: 'number',
          message: '^ID blok harus angka'
        }
      },
      p_lantai: {
        type: {
          type: 'number',
          message: '^ID Lamtai harus angka'
        }
      },
      p_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_tipe: {
        length: {
          maximum: 3,
          message: '^Tipe WO maximum 3 character'
        }
      },
      p_status: {
        length: {
          maximum: 2,
          message: '^Status WO maximum 2 character'
        }
      },
      p_complete_status: {
        length: {
          maximum: 3,
          message: '^Completion Status WO maximum 3 character'
        }
      },
      p_no: {
        length: {
          maximum: 50,
          message: '^No WO maximum 50 character'
        }
      }
    },
    request: 'getMtncWo'
  },
  postMtncWo: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_blok: req.body.p_blok ? Number(req.body.p_blok) : null,
        p_lantai: req.body.p_lantai ? Number(req.body.p_lantai) : null,
        p_unit: req.body.p_unit ? Number(req.body.p_unit) : null,
        p_jenis_lokasi: req.body.p_jenis_lokasi
          ? req.body.p_jenis_lokasi.trim()
          : '',
        p_title: req.body.p_title
          ? req.body.p_title.toString().trim().toUpperCase()
          : '',
        p_lokasi: req.body.p_lokasi
          ? req.body.p_lokasi.toString().trim().toUpperCase()
          : '',
        p_req_complete_date: req.body.p_req_complete_date
          ? req.body.p_req_complete_date.trim()
          : '',
        p_deskripsi: req.body.p_deskripsi
          ? req.body.p_deskripsi.toString().trim().toUpperCase()
          : '',
        p_tipe: req.body.p_tipe ? req.body.p_tipe.trim() : '',
        p_ref: req.body.p_ref ? req.body.p_ref.toString().trim() : '',
        p_no_wo: req.body.p_no_wo ? req.body.p_no_wo.toString().trim() : null
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
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 75,
          message: '^Nama Requester maximum 75 character'
        }
      },
      p_title: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Title WO maximum 100 character'
        }
      },
      p_tipe: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Tipe WO maximum 3 character'
        }
      },
      p_req_complete_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Request Completion Date data format YYYY-MM-DD'
        }
      },
      p_jenis_lokasi: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 2,
          message: '^Jenis Lokasi maximum 2 character'
        }
      },
      p_blok: {
        type: {
          type: 'number',
          message: '^ID blok harus angka'
        }
      },
      p_lantai: {
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      },
      p_unit: {
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'postMtncWo'
  },
  delMtncWo: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_no_wo: req.body.p_no_wo
          ? req.body.p_no_wo.toString().trim().toUpperCase()
          : '',
        p_alasan: req.body.p_alasan
          ? req.body.p_alasan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_wo: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No WO maximum 50 character'
        }
      },
      p_alasan: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 300,
          message: '^Alasan maximum 300 character'
        }
      }
    },
    request: 'delMtncWo'
  },
  putMtncWoAsign: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_no_wo: req.body.p_no_wo
          ? req.body.p_no_wo.toString().trim().toUpperCase()
          : '',
        p_assign_to: req.body.p_assign_to
          ? req.body.p_assign_to.toString().trim().toUpperCase()
          : '',
        p_work_start_date: req.body.p_work_start_date
          ? req.body.p_work_start_date.trim()
          : '',
        p_completion_target_date: req.body.p_completion_target_date
          ? req.body.p_completion_target_date.trim()
          : null,
        p_prioritas: req.body.p_prioritas ? req.body.p_prioritas : null,
        p_notes: req.body.p_notes
          ? req.body.p_notes.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_wo: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No WO maximum 50 character'
        }
      },
      p_assign_to: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 75,
          message: '^Asign to maximum 75 character'
        }
      },
      p_work_start_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Work Start Date date format YYYY-MM-DD'
        }
      },
      p_completion_target_date: {
        datetime: {
          dateOnly: true,
          message: '^Work Completion Traget Date date format YYYY-MM-DD'
        }
      },
      p_prioritas: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 1,
          message: '^Prioritas maximum 1 character'
        }
      },
      p_notes: {
        presence: true
      }
    },
    request: 'putMtncWoAsign'
  },
  putMtncWoResult: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_no_wo: req.body.p_no_wo
          ? req.body.p_no_wo.toString().trim().toUpperCase()
          : '',
        p_completion_actual_date: req.body.p_completion_actual_date
          ? req.body.p_completion_actual_date.trim()
          : '',
        p_completion_status: req.body.p_completion_status
          ? req.body.p_completion_status
          : null,
        p_notes: req.body.p_notes
          ? req.body.p_notes.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no_wo: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No WO maximum 50 character'
        }
      },
      p_completion_actual_date: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Actual Completion Date date format YYYY-MM-DD'
        }
      },
      p_completion_status: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Completion Status maximum 3 character'
        }
      },
      p_notes: {
        presence: true
      }
    },
    request: 'putMtncWoResult'
  },
  getMtncWoLampiran: {
    params: (req) => {
      return {
        p_id: req.query.p_id ? Number(req.query.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'getMtncWoLampiran'
  },
  postMtncWoLampiran: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_no_wo: req.body.p_no_wo
          ? req.body.p_no_wo.toString().trim().toUpperCase()
          : '',
        p_dokumen: req.body.p_dokumen
          ? req.body.p_dokumen.toString().trim().toUpperCase()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_no_wo: { required: true },
      p_dokumen: { required: true },
      p_path: { required: true }
    },
    request: 'postMtncWoLampiran'
  },
  delMtncWoLampiran: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Lampiran WO harus angka'
        }
      }
    },
    request: 'delMtncWoLampiran'
  },
  /* untuk utilitas air dan listrik baru */
  getMtncListrikLog: {
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
        p_in_billing: req.query.p_in_billing ? req.query.p_in_billing : null,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_blth: {
        presence: false,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^BLTH format: YYYY-MM'
        }
      }
    },
    request: 'getMtncListrikLog'
  },
  getMtncListrikLogById: {
    params: (req) => {
      return {
        p_id: req.query.p_id ? Number(req.query.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Log Meteran Listrik harus angka'
        }
      }
    },
    request: 'getMtncListrikLogById'
  },
  postMtncListrikLog: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_petugas_pencatat: req.body.p_petugas_pencatat
          ? req.body.p_petugas_pencatat.trim()
          : '',
        p_id_listrik_meter_log: req.body.p_id_listrik_meter_log
          ? Number(req.body.p_id_listrik_meter_log)
          : 0,
        p_tgl_start_meter: req.body.p_tgl_start_meter
          ? req.body.p_tgl_start_meter.trim()
          : '',
        p_tgl_end_meter: req.body.p_tgl_end_meter
          ? req.body.p_tgl_end_meter.trim()
          : '',
        p_meter_start: req.body.p_meter_start
          ? Number(req.body.p_meter_start)
          : 0,
        p_meter_end: req.body.p_meter_end ? Number(req.body.p_meter_end) : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_listrik_meter_log: {
        type: {
          type: 'number',
          message: '^ID Meter Log harus angka'
        }
      },
      p_tgl_start_meter: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal start meter date format YYYY-MM-DD'
        }
      },
      p_tgl_end_meter: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal end meter date format YYYY-MM-DD'
        }
      },
      p_meter_start: {
        presence: true,
        type: {
          type: 'number',
          message: '^Meter Start harus angka'
        }
      },
      p_meter_end: {
        presence: true,
        type: {
          type: 'number',
          message: '^Meter Start harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 300,
          message: '^Keterangan maximum 300 characters'
        }
      }
    },
    request: 'postMtncListrikLog'
  },
  postMtncListrikLogMasal: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_data_logs: req.body.p_data_logs ? req.body.p_data_logs : []
      }
    },
    rules: {
      p_data_logs: {
        presence: true,
        array: {
          p_id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID Unit harus angka'
            }
          },
          p_petugas_pencatat: {
            length: {
              maximum: 75,
              message: '^Petuga pencatat maximum 75 characters'
            }
          },
          p_tgl_pencatatan: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal Pencatatan date format YYYY-MM-DD'
            }
          },
          p_tgl_start_meter: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal start meter date format YYYY-MM-DD'
            }
          },
          p_tgl_end_meter: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal end meter date format YYYY-MM-DD'
            }
          },
          p_meter_start: {
            presence: true,
            type: {
              type: 'number',
              message: '^Meter Start harus angka'
            }
          },
          p_meter_end: {
            presence: true,
            type: {
              type: 'number',
              message: '^Meter Start harus angka'
            }
          }
        }
      }
    },
    request: 'postMtncListrikLogMasal'
  },
  delMtncListrikLog: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_listrik_log: req.body.p_id_listrik_log
          ? Number(req.body.p_id_listrik_log)
          : 0
      }
    },
    rules: {
      p_id_listrik_log: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Log listrik harus angka'
        }
      }
    },
    request: 'delMtncListrikLog'
  },
  getMtncTempLogListrik: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_tgl_pencatatan: req.query.p_tgl_pencatatan
          ? req.query.p_tgl_pencatatan
          : ''
      }
    },
    rules: {},
    request: 'getMtncTempLogListrik'
  },
  getMtncAirLog: {
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
        p_in_billing: req.query.p_in_billing ? req.query.p_in_billing : null,
        p_blth: req.query.p_blth ? req.query.p_blth.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_blth: {
        presence: true,
        datetime: {
          dateOnly: true,
          blthOnly: true,
          message: '^BLTH format: YYYY-MM'
        }
      }
    },
    request: 'getMtncAirLog'
  },
  getMtncAirLogById: {
    params: (req) => {
      return {
        p_id: req.query.p_id ? Number(req.query.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Log Meteran Air harus angka'
        }
      }
    },
    request: 'getMtncAirLogById'
  },
  postMtncAirLog: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_petugas_pencatat: req.body.p_petugas_pencatat
          ? req.body.p_petugas_pencatat.trim()
          : '',
        p_id_air_meter_log: req.body.p_id_air_meter_log
          ? Number(req.body.p_id_air_meter_log)
          : 0,
        p_tgl_start_meter: req.body.p_tgl_start_meter
          ? req.body.p_tgl_start_meter.trim()
          : '',
        p_tgl_end_meter: req.body.p_tgl_end_meter
          ? req.body.p_tgl_end_meter.trim()
          : '',
        p_meter_start: req.body.p_meter_start
          ? Number(req.body.p_meter_start)
          : 0,
        p_meter_end: req.body.p_meter_end ? Number(req.body.p_meter_end) : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_air_meter_log: {
        type: {
          type: 'number',
          message: '^ID Meter Log harus angka'
        }
      },
      p_tgl_start_meter: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal start meter date format YYYY-MM-DD'
        }
      },
      p_tgl_end_meter: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal end meter date format YYYY-MM-DD'
        }
      },
      p_meter_start: {
        presence: true,
        type: {
          type: 'number',
          message: '^Meter Start harus angka'
        }
      },
      p_meter_end: {
        presence: true,
        type: {
          type: 'number',
          message: '^Meter Start harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 300,
          message: '^Keterangan maximum 300 characters'
        }
      }
    },
    request: 'postMtncAirLog'
  },
  postMtncAirLogMasal: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_data_logs: req.body.p_data_logs ? req.body.p_data_logs : []
      }
    },
    rules: {
      p_data_logs: {
        presence: true,
        array: {
          p_id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID Unit harus angka'
            }
          },
          p_petugas_pencatat: {
            length: {
              maximum: 75,
              message: '^Petuga pencatat maximum 75 characters'
            }
          },
          p_tgl_pencatatan: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal Pencatatan date format YYYY-MM-DD'
            }
          },
          p_tgl_start_meter: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal start meter date format YYYY-MM-DD'
            }
          },
          p_tgl_end_meter: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tanggal end meter date format YYYY-MM-DD'
            }
          },
          p_meter_start: {
            presence: true,
            type: {
              type: 'number',
              message: '^Meter Start harus angka'
            }
          },
          p_meter_end: {
            presence: true,
            type: {
              type: 'number',
              message: '^Meter Start harus angka'
            }
          }
        }
      }
    },
    request: 'postMtncAirLogMasal'
  },
  delMtncAirLog: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_air_log: req.body.p_id_air_log ? Number(req.body.p_id_air_log) : 0
      }
    },
    rules: {
      p_id_air_log: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Log air harus angka'
        }
      }
    },
    request: 'delMtncAirLog'
  },
  getMtncTempLogAir: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_tgl_pencatatan: req.query.p_tgl_pencatatan
          ? req.query.p_tgl_pencatatan
          : ''
      }
    },
    rules: {},
    request: 'getMtncTempLogAir'
  },
  getMtncWoLampiranByNo: {
    params: (req) => {
      return {
        p_no_wo: req.query.p_no_wo ? req.query.p_no_wo : ''
      }
    },
    rules: {},
    request: 'getMtncWoLampiranByNo'
  },
  getMtncListrikLastDataByUnit: {
    params: (req) => {
      return {
        p_id_unit: req.query.p_id_unit ? req.query.p_id_unit : null
      }
    },
    rules: {},
    request: 'getMtncListrikLastDataByUnit'
  },
  getMtncAirLastDataByUnit: {
    params: (req) => {
      return {
        p_id_unit: req.query.p_id_unit ? req.query.p_id_unit : null
      }
    },
    rules: {
      p_id_unit: { required: true }
    },
    request: 'getMtncAirLastDataByUnit'
  }
}

exports.methodGet = {
  '006000000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getMtncWo), // mtnc/wo
  '006000003': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getMtncWoLampiran, 'path_dokumen'), // mtnc/wo/lampiran
  '006000004': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getMtncWoLampiranByNo), // mtnc/wo/lampiran/by-wo
  // //
  '006001000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getMtncListrikLog), // mtnc/listrik/log
  '006001001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getMtncListrikLogById), // mtnc/listrik/log/by-id
  '006001002': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getMtncTempLogListrik,
      'mtnc-log-template'
    ), // mtnc/listrik/log-template
  '006001004': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getMtncListrikLastDataByUnit), // mtnc/listrik/log-unit-lastdate
  '006002000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getMtncAirLog), // mtnc/air/log
  '006002001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getMtncAirLogById), // mtnc/air/log/by-id
  '006002002': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getMtncTempLogAir,
      'mtnc-log-template'
    ), // mtnc/air/log-template
  '006002004': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getMtncAirLastDataByUnit) // mtnc/air/log-unit-lastdate
}

exports.methodPost = {
  '006000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postMtncWo), // mtnc/wo
  '006001000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postMtncListrikLog), // mtnc/listrik/log
  '006001003': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postMtncListrikLogMasal), // mtnc/listrik/log-masal
  '006002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postMtncAirLog), // mtnc/air/log
  '006002003': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postMtncAirLogMasal) // mtnc/air/log-masal
}

exports.methodPut = {
  '006000001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putMtncWoAsign), // mtnc/wo/asign
  '006000002': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putMtncWoResult) // mtnc/wo/result
}

exports.methodDel = {
  '006000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delMtncWo), // mtnc/wo
  '006001000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delMtncListrikLog), // mtnc/listrik/log
  '006002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delMtncAirLog), //
  '006000003': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delMtncWoLampiran) // mtnc/wo/lampiran
}

exports.methodPostUploadBase64 = {
  '006000003': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postMtncWoLampiran) // mtnc/wo/lampiran
}
