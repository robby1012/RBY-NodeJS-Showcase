const apiReqNew = require('./api-caller-new')

const reqCtrl = {
  getLovAgama: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAgama'
  },
  getLovGolonganListrik: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovGolonganListrik'
  },
  getLovGolonganInvoice: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovGolonganInvoice'
  },
  getLovJenisKelamin: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovJenisKelamin'
  },
  getLovJenisNik: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovJenisNik'
  },
  getLovJenisKendaraan: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovJenisKendaraan'
  },
  getLovJenisUnit: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovJenisUnit'
  },
  getLovJenisRole: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovJenisRole'
  },
  getLovFasilitas: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovFasilitas'
  },
  getLovFasilitasRusun: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovFasilitasRusun'
  },
  getLovKantor: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kantor: req.query.p_kantor
          ? req.query.p_kantor.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovKantor'
  },
  getLovRusunByUser: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovRusunByUser'
  },
  getLovRusunKantor: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kantor: req.query.p_kantor
          ? req.query.p_kantor.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovRusunKantor'
  },
  getLovKantorByUser: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovKantorByUser'
  },
  getLovRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovRusun'
  },
  getLovRusunBlok: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovRusunBlok'
  },
  getLovRusunBlokId: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovRusunBlokId'
  },
  getLovRusunLantai: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovRusunLantai'
  },
  getLovRusunUnit: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : null,
        p_lantai: req.query.p_lantai ? Number(req.query.p_lantai) : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovRusunUnit'
  },
  getLovRusunUnitByIDBlok: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null,
        p_jenis: req.query.p_jenis ? req.query.p_jenis : null
      }
    },
    rules: {},
    request: 'getLovRusunUnitByIDBlok'
  },
  getLovRegistrasiUnit: {
    params: (req) => {
      return {
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : null,
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovRegistrasiUnit'
  },
  getLovStatusNikah: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovStatusNikah'
  },
  getLovStatusPekerjaan: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovStatusPekerjaan'
  },
  getLovTipeOut: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovTipeOut'
  },
  getLovTipeKontrakBerakhir: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovTipeKontrakBerakhir'
  },
  getLovKontrakUnit: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_exception: req.query.p_exception
          ? Number(req.query.p_exception)
          : null
      }
    },
    rules: {},
    request: 'getLovKontrakUnit'
  },
  getLovPembayaranMethod: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovPembayaranMethod'
  },
  getLovAsetKategori: {
    params: (req) => {
      return {
        p_kode_kelompok: req.query.p_kode_kelompok
          ? req.query.p_kode_kelompok.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAsetKategori'
  },
  getLovAsetKelompok: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAsetKelompok'
  },
  getLovAsetSatuan: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAsetSatuan'
  },
  getLovAsetJenisPerolehan: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAsetJenisPerolehan'
  },
  getLovAsetKondisi: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovAsetKondisi'
  },
  getLovKomplainKategori: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovKomplainKategori'
  },
  getLovWoPrioritas: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getLovWoPrioritas'
  },
  getLovWoTipe: {
    params: (req) => {
      return {
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null,
        p_hide_form: req.query.p_hide_form ? req.query.p_hide_form : null,
        p_fo_komplain: req.query.p_fo_komplain ? req.query.p_fo_komplain : null
      }
    },
    rules: {},
    request: 'getLovWoTipe'
  },
  getKontrakNoPerjanjian: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak
          ? Number(req.query.p_id_kontrak)
          : null,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : null,
        p_exception: req.query.p_exception
          ? req.query.p_exception.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'getKontrakNoPerjanjian'
  },
  getLovKodeRusunAsetByRusun: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : ''
      }
    },
    rules: {},
    request: 'getLovKodeRusunAsetByRusun'
  },
  getLovPembayaranRekening: {
    params: (req) => {
      return {
        p_kantor: req.query.p_kantor ? req.query.p_kantor.trim() : ''
      }
    },
    rules: {},
    request: 'getLovPembayaranRekening'
  },
  getLovBlokForPenghuni: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak ? req.query.p_id_kontrak : null,
        p_no_registrasi: req.query.p_no_registrasi
          ? req.query.p_no_registrasi.trim().toUpperCase()
          : null,
        p_rusun: req.query.p_rusun ? req.query.p_rusun.trim() : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovBlokForPenghuni'
  },
  getLovLantaiForPenghuni: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak ? req.query.p_id_kontrak : null,
        p_no_registrasi: req.query.p_no_registrasi
          ? req.query.p_no_registrasi.trim().toUpperCase()
          : null,
        p_rusun: req.query.p_rusun ? req.query.p_rusun.trim() : null,
        p_blok: req.query.p_blok ? req.query.p_blok : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovLantaiForPenghuni'
  },
  getLovUnitForPenghuni: {
    params: (req) => {
      return {
        p_id_kontrak: req.query.p_id_kontrak ? req.query.p_id_kontrak : null,
        p_no_registrasi: req.query.p_no_registrasi
          ? req.query.p_no_registrasi.trim().toUpperCase()
          : null,
        p_rusun: req.query.p_rusun ? req.query.p_rusun.trim() : null,
        p_blok: req.query.p_blok ? req.query.p_blok : null,
        p_lantai: req.query.p_lantai ? req.query.p_lantai : null,
        p_exception: req.query.p_exception ? req.query.p_exception : null
      }
    },
    rules: {},
    request: 'getLovUnitForPenghuni'
  }
}

exports.methodGet = {
  '011001000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovJenisKelamin), // lov/jenis-kelamin
  '011002000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovJenisRole), // lov/jenis-role
  '011003000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovJenisUnit), // lov/jenis-unit
  '011004000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovJenisNik), // lov/jenis-nik
  '011005000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getLovKantor), // lov/kantor
  '011006000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunBlok), // lov/rusun-blok
  '011007000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunLantai), // lov/rusun-lantai
  '011008000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunUnit), // lov/rusun-unit
  '011009000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunUnitByIDBlok), // lov/rusun-unit-byblokid
  '011010000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunByUser), // lov/rusun-user
  '011011000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunKantor), // lov/rusun-kantor
  '011012000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getLovTipeOut), // lov/tipe-out
  '011013000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getLovRusun), // lov/rusun
  '011014000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRusunBlokId), // lov/rusun-blok-id
  '011015000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getLovAgama), // lov/agama
  '011016000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovRegistrasiUnit), // lov/registrasi-unit
  '011017000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovGolonganInvoice), // lov/golongan-invoice
  '011018000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovKontrakUnit), // lov/kontrak-unit
  '011019000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovGolonganListrik), // lov/golongan-listrik
  '011020000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovStatusPekerjaan), // lov/status-pekerjaan
  '011021000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovStatusNikah), // lov/status-nikah
  '011022000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovJenisKendaraan), // lov/jenis-kendaraan
  '011023000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovPembayaranMethod), // lov/pembayaran-method
  '011024000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovAsetKategori), // lov/aset-kategori
  '011025000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovAsetKelompok), // lov/aset-kelompok
  '011026000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovAsetJenisPerolehan), // lov/aset-jenis-perolehan
  '011027000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovAsetKondisi), // lov/aset-kondisi
  '011028000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovKantorByUser), // lov/kantor-user
  '011029000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovKomplainKategori), // lov/komplain-kategori
  '011030000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovFasilitas), // lov/fasilitas
  '011031000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovFasilitasRusun), // lov/fasilitas-rusun
  '011032000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovWoPrioritas), // lov/wo-prioritas
  '011033000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getLovWoTipe), // lov/wo-tipe
  '011034000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getKontrakNoPerjanjian), // lov/kontrak-no
  '011035000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovTipeKontrakBerakhir), // lov/tipe-kontrak-berakhir
  '011036000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovKodeRusunAsetByRusun), // lov/daftar-kode-rusun-aset
  '011037000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovPembayaranRekening), // lov/pembayaran-rekening
  '011038000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovBlokForPenghuni),
  '011039000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovLantaiForPenghuni), // lov/lantai-for-penghuni
  '011040000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovUnitForPenghuni), // lov/unit-for-penghuni
  '011041000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getLovAsetSatuan) // lov/aset-satuan
}
