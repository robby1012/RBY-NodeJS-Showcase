const apiReqNew = require('./api-caller-new')

const reqCtrl = {
  getKontrakPerjanjian: {
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
  getSuratJatuhTempo: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
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
    request: 'getRptSuratJatuhTempo'
  },
  getPenghuniRusunJenisKelamin: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_jenis_kelamin: req.query.p_jenis_kelamin
          ? req.query.p_jenis_kelamin
          : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptPenghuniRusunJenisKelamin'
  },
  getMonitoringPembayaranListrikAir: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_status_pembayaran: req.query.p_status_pembayaran
          ? req.query.p_status_pembayaran
          : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptMonitoringPembayaranInvoiceAirListrik'
  },
  getPenghuniRusunPerusahaan: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_search: req.query.p_search ? req.query.p_search : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptPenghuniRusunPerusahaan'
  },
  getMonitorPerjanjianSewa: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_jenis_penghuni: req.query.p_jenis_penghuni
          ? req.query.p_jenis_penghuni
          : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptMonitorPerjanjianSewa'
  },
  getReportWorkOrder: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_kode_wo_tipe: req.query.p_kode_wo_tipe
          ? req.query.p_kode_wo_tipe
          : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptWorkOrder'
  },
  getReportWorkOrderAssign: {
    params: (req) => {
      return {
        p_no_wo: req.query.p_no_wo ? req.query.p_no_wo : ''
      }
    },
    rules: {},
    request: 'getRptWorkOrderAssign'
  },
  getKamarRusunawa: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_lantai: req.query.p_lantai ? Number(req.query.p_lantai) : null,
        p_status_kamar: req.query.p_status_kamar ? req.query.p_status_kamar : ''
      }
    },
    rules: {},
    request: 'getRptMonitorKamarRusunawa'
  },
  getMtrPembayaranSewaKmr: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_status_pembayaran: req.query.p_status_pembayaran
          ? req.query.p_status_pembayaran
          : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        type: {
          type: 'string',
          message: '^Kode rusun'
        }
      },
      p_tgl_awal: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Mulai date format YYYY-MM-DD'
        }
      },
      p_tgl_akhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tgl Mulai date format YYYY-MM-DD'
        }
      }
    },
    request: 'getMtrPembayaranSewaKmr'
  },

  getReportWL: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun.trim() : ''
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        type: {
          type: 'string',
          message: 'Kode Rusun tidak boleh kosong'
        }
      }
    },
    request: 'getReportWL'
  },
  getPenghuniRusunStatusPerkawinan: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_tgl_awal: req.query.p_tgl_awal ? req.query.p_tgl_awal : '',
        p_tgl_akhir: req.query.p_tgl_akhir ? req.query.p_tgl_akhir : ''
      }
    },
    rules: {},
    request: 'getRptPenghuniRusunStatusPerkawinan'
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
  getPemberitahuanTagihan: {
    params: (req) => {
      return {
        p_no_invoice: req.query.p_no_invoice
          ? req.query.p_no_invoice.trim()
          : ''
      }
    },
    rules: {
      p_no_invoice: {
        presence: true,
        type: {
          type: 'string',
          message: '^No Invoice'
        }
      }
    },
    request: 'getNotifTagihan'
  },
  getRptKontrakSewa: {
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
    request: 'getRptKontrakSewa'
  },
  getRptKontrakAdendum: {
    params: (req) => {
      return {
        p_adendum: req.query.p_adendum ? Number(req.query.p_adendum) : 0
      }
    },
    rules: {
      p_adendum: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Adendum  harus angka'
        }
      }
    },
    request: 'getRptKontrakAdendum'
  },
  getRptAvailabilityStatusUnitPerLantai: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_periode_tahun: req.query.p_periode_tahun
          ? Number(req.query.p_periode_tahun)
          : 0,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null
      }
    },
    rules: {
      p_periode_tahun: {
        presence: true,
        type: {
          type: 'number',
          message: '^Format tahun YYYY'
        }
      }
    },
    request: 'getRptAvailabilityStatusUnitPerLantai'
  },
  getRptTingkatHunian: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_periode_tahun: req.query.p_periode_tahun
          ? req.query.p_periode_tahun
          : ''
      }
    },
    rules: {
      p_periode_tahun: {
        presence: true,
        type: {
          type: 'string',
          message: '^Format Tanggal YYYY-MM-DD'
        }
      }
    },
    request: 'getRptTingkatHunian'
  },
  getReportSuratTugas: {
    params: (req) => {
      return {
        p_no_wo: req.query.p_no_wo ? req.query.p_no_wo : ''
      }
    },
    rules: {},
    request: 'getReportSuratTugas'
  },
  getRptBillingEntriTagihan: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun ? req.query.p_rusun : '',
        p_periode_tahun: req.query.p_periode_tahun
          ? req.query.p_periode_tahun
          : ''
      }
    },
    rules: {},
    request: 'getRptBillingEntriTagihan'
  }
  /* getSamplingXlsx: {
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
  },*/
}

exports.methodGet = {
  '013001001': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getRptKontrakSewa,
      'rptKontrakPerjanjian'
    ), // reports/kontrak/perjanjian
  '013001002': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getKontrakDaftarItem,
      'rptLampiranCheckoutWo'
    ), // reports/kontrak/lampiran-checkout-wo
  '013001003': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getRptKontrakAdendum,
      'rptKontrakAdendum'
    ),
  '013001004': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getSuratJatuhTempo,
      'rptKontrakSuratJatuhTempo'
    ),
  '013001005': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getPenghuniRusunJenisKelamin,
      'rptKontrakPenghuniRusun'
    ),
  '013001006': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getMonitoringPembayaranListrikAir,
      'rptKontrakMonitoringPembayaranListrikAir'
    ),
  '013001007': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getPenghuniRusunPerusahaan,
      'rptKontrakPenghuniRusunPerusahaan'
    ),
  '013001008': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getMonitorPerjanjianSewa,
      'rptKontrakMonitorPerjanjianSewa'
    ),
  '013001009': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getReportWorkOrder,
      'rptKontrakReportWorkOrder'
    ),
  '013001010': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getReportWorkOrderAssign,
      'rptKontrakReportWoAssign'
    ),
  '013001011': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getKamarRusunawa,
      'rptKontrakMonitorKamarRusunawa'
    ),
  '013001012': (req, res) =>
    apiReqNew.getReport(req, res, reqCtrl.getReportWL, 'rptRegistrasiWL'),
  '013001013': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getMtrPembayaranSewaKmr,
      'rptKontrakMonitorPembayaranSewaKmr'
    ),
  '013001014': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getPenghuniRusunStatusPerkawinan,
      'rptKontrakPenghuniRusunStatusPerkawinan'
    ),
  '013001015': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getPemberitahuanTagihan,
      'rptPemberitahuanTagihan'
    ),
  '013001016': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getRptAvailabilityStatusUnitPerLantai,
      'rptAvailabilityStatusUnitPerLantai'
    ),
  '013001017': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getRptTingkatHunian,
      'rptgetTingkatHunian'
    ),
  '013001018': (req, res) =>
    apiReqNew.getReport(req, res, reqCtrl.getReportSuratTugas, 'rptSuratTugas'),
  '013001019': (req, res) =>
    apiReqNew.getReport(
      req,
      res,
      reqCtrl.getRptBillingEntriTagihan,
      'rptBillingEntriTagihan'
    )
  /* 'reports/sampling/xlsx': (req, res) => apiReqNew.getXlsx(req, res, reqCtrl.getSamplingXlsx, 'rptSamplingXlsx'), */
}
