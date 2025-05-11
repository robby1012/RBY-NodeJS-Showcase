const apiReqNew = require('./api-caller-new')

const reqCtrl = {
  getListInventarisRusun: {
    params: (req) => {
      return {
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null
      }
    },
    rules: {
      p_id_unit: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Rusun Unit harus angka'
        }
      }
    },
    request: 'getListInventarisRusun'
  },
  getListTanahGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListTanahGuna'
  },
  getListBangunanGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListBangunanGuna'
  },
  getListKendaraanGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListKendaraanGuna'
  },
  getListPKantorGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKantorGuna'
  },
  getListPKomputerGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKomputerGuna'
  },
  getListPLainGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPLainGuna'
  },
  getListPKantorNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKantorNonKapGuna'
  },
  getListPKomputerNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKomputerNonKapGuna'
  },
  getListPLainNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPLainNonKapGuna'
  },
  getRekapKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getRekapKapGuna'
  },
  getRekapNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getRekapNonKapGuna'
  },
  getRekapLokasiAset: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_kode_blok: req.query.p_kode_blok ? req.query.p_kode_blok.trim() : '',
        p_id_lantai: req.query.p_id_lantai ? req.query.p_id_lantai.trim() : '',
        p_id_unit: req.query.p_id_unit ? req.query.p_id_unit.trim() : ''
      }
    },
    rules: {},
    request: 'getRekapLokasiAset'
  },
  //EXCEL REPORT ASET
  getExcelListPKantorNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKantorNonKapGuna'
  },
  getExcelReportAsetTetapTanahGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListTanahGuna'
  },
  getExcelReportAsetTetapKendaraanGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListKendaraanGuna'
  },
  getExcelReportAsetTetapPeralatanKantorGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKantorGuna'
  },
  getExcelReportAsetTetapBangunanGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListBangunanGuna'
  },
  getExcelReportAsetTetapKomputerGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKomputerGuna'
  },
  getExcelReportAsetTetapPeralatanKantorLainGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPLainGuna'
  },
  getExcelReportDaftarAsetNonkapKomputer: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPKomputerNonKapGuna'
  },

  getExcelDaftarNonKapPeralatanLain: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getListPLainNonKapGuna'
  },

  getExcelRekapNonKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getRekapNonKapGuna'
  },


  getExcelRekapKapGuna: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun ? req.query.p_kode_rusun.trim() : '',
        p_tgl_report: req.query.p_tgl_report ? req.query.p_tgl_report.trim() : '',
        p_assigned_mengetahui: req.query.p_assigned_mengetahui ? req.query.p_assigned_mengetahui.trim() : '',
        p_assigned_membuat: req.query.p_assigned_membuat ? req.query.p_assigned_membuat.trim() : '',
        p_assigned_jabatan_mengetahui: req.query.p_assigned_jabatan_mengetahui ? req.query.p_assigned_jabatan_mengetahui.trim() : '',
        p_assigned_jabatan_membuat: req.query.p_assigned_jabatan_membuat ? req.query.p_assigned_jabatan_membuat.trim() : '',
      }
    },
    rules: {
      p_kode_rusun: {
        presence: true
      },
      p_tgl_report: {
        presence: true
      },
      p_assigned_mengetahui: {
        presence: true
      },
      p_assigned_membuat: {
        presence: true
      },
      p_assigned_jabatan_mengetahui: {
        presence: true
      },
      p_assigned_jabatan_membuat: {
        presence: true
      }
    },
    request: 'getRekapKapGuna'
  },




  /* 
  getExcelListPKantorNonKapGuna
  getExcelReportAsetTetapTanahGuna
  getExcelRekapKapGuna
  getExcelReportAsetTetapKendaraanGuna
  getExcelReportAsetTetapBangunanGuna
  getExcelReportAsetTetapKomputerGuna
  getExcelReportAsetTetapPeralatanKantorGuna
  getExcelReportAsetTetapPeralatanKantorLainGuna
  getExcelRekapNonKapGuna
  getExcelReportDaftarAsetNonkapKomputer
  getExcelDaftarNonKapPeralatanLain 
*/
}

exports.methodGet = {
  // 'reports/kontrak/perjanjian': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getKontrakPerjanjian, 'rptKontrakPerjanjian')
  /* 'reports/aset/inventaris-rusun': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListInventarisRusun),
  'reports/aset/tanah-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListTanahGuna),
  'reports/aset/bangunan-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListBangunanGuna),
  'reports/aset/kendaraan-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListKendaraanGuna),
  'reports/aset/alat-kantor-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListPKantorGuna),
  'reports/aset/komputer-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListPKomputerGuna),
  'reports/aset/alat-lain-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListPLainGuna), */
  /* 'reports/aset/alat-komputer-nonkap': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListPKomputerNonKapGuna),
  'reports/aset/alat-lain-nonkap': (req, res) => apiReqNew.getData(req, res, reqCtrl.getListPLainNonKapGuna), */
  /* 'reports/aset/daftar-barang-inventaris-rusun': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListInventarisRusun, 'rptInventarisRusun'), */
  //'reports/aset/rekap-lokasi-aset': (req, res) => apiReqNew.getData(req, res, reqCtrl.getRekapLokasiAset),
  //'reports/aset/rekap-non-kap-guna': (req, res) => apiReqNew.getData(req, res, reqCtrl.getRekapNonKapGuna),
  '013004008': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPKantorNonKapGuna, 'rptDaftarAsetNonKapPKantorGuna'),
  '013004009': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getRekapNonKapGuna, 'rptRekapAsetNonKapGuna'),
  '013004012': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListInventarisRusun, 'rptInventarisHilangRusak'),
  '013004002': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListTanahGuna, 'rptDaftarAsetTetapDigunakanTanah'),
  '013004003': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListBangunanGuna, 'rptDaftarAsetTetapDigunakanBangunan'),
  '013004004': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListKendaraanGuna, 'rptDaftarAsetTetapDigunakanKendaraan'),
  '013004006': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPKomputerGuna, 'rptDaftarAsetTetapDigunakanKomputer'),
  '013004018': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPKomputerNonKapGuna, 'rptDaftarAsetNonkapKomputer'),
  '013004005': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPKantorGuna, 'rptDaftarAsetTetapDigunakanPeralatanKantor'),
  '013004007': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPLainGuna, 'rptDaftarAsetTetapDigunakanPeralatanKantorLain'),
  '013004021': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getRekapKapGuna, 'rptRekapAsetTetapKapGuna'),
  '013004011': (req, res) => apiReqNew.getReport(req, res, reqCtrl.getListPLainNonKapGuna, 'rptDaftarAsetNonKapPeralatanLain'),
  '013004024': (req, res) => apiReqNew.getData(req, res, reqCtrl.getRekapLokasiAset),

  //REPORT EXCEL
  '013004025': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelListPKantorNonKapGuna,
      'rptExcelDaftarAsetNonKapPeralatanKantor'
    ),
  '013004026': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapTanahGuna,
      'rptExcelDaftarAsetTetapDigunakanTanah'
    ),
  '013004027': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapKendaraanGuna,
      'rptExcelDaftarAsetTetapDigunakanKendaraan'
    ),
  '013004028': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapPeralatanKantorGuna,
      'rptExcelDaftarAsetTetapDigunakanPeralatanKantor'
    ),
  '013004029': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapBangunanGuna,
      'rptExcelDaftarAsetTetapDigunakanBangunan'
    ),
  '013004030': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapKomputerGuna,
      'rptExcelDaftarAsetTetapDigunakanPeralatanKomputer'
    ),
  '013004031': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportAsetTetapPeralatanKantorLainGuna,
      'rptExcelDaftarAsetTetapDigunakanPeralatanLainnya'
    ),
  '013004032': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelReportDaftarAsetNonkapKomputer,
      'rptExcelDaftarAsetNonKapPeralatanKomputer'
    ),
  '013004033': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelDaftarNonKapPeralatanLain,
      'rptExcelDaftarAsetNonKapPeralatanLainnya'
    ),
  '013004034': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelRekapNonKapGuna,
      'rptExcelRekapAsetNonKapDigunakan'
    ),
  '013004035': (req, res) =>
    apiReqNew.getExcelBase64(
      req,
      res,
      reqCtrl.getExcelRekapKapGuna,
      'rptExcelRekapAsetTetapDigunakan'
    ),

}