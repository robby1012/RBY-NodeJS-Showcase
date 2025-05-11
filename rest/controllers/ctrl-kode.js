const apiReq = require('./api-caller')

const reqCtrl = {
  getKodeAsetKategori: {
    params: (req) => {
      return {
        p_kode_kelompok: req.query.p_kode_kelompok
          ? req.query.p_kode_kelompok.toString().trim().toUpperCase()
          : '',
        p_kode_kategori: req.query.p_kode_kategori
          ? req.query.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : true
      }
    },
    rules: {},
    request: 'getKodeAsetKategori'
  },
  getKodeAsetKelompok: {
    params: (req) => {
      return {
        p_kode_kelompok: req.query.p_kode_kelompok
          ? req.query.p_kode_kelompok.toString().trim().toUpperCase()
          : '',
        p_nama_kelompok: req.query.p_nama_kelompok
          ? req.query.p_nama_kelompok.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : true
      }
    },
    rules: {},
    request: 'getKodeAsetKelompok'
  },
  getKodeAsetKondisi: {
    params: (req) => {
      return {
        p_kode_kondisi: req.query.p_kode_kondisi
          ? req.query.p_kode_kondisi.toString().trim().toUpperCase()
          : '',
        p_nama_kondisi: req.query.p_nama_kondisi
          ? req.query.p_nama_kondisi.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {},
    request: 'getKodeAsetKondisi'
  },
  getKodeKantor: {
    params: (req) => {
      return {
        p_kode_kantor: req.query.p_kode_kantor
          ? req.query.p_kode_kantor.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {},
    request: 'getKodeKantor'
  },
  getKodeUnit: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : '',
        p_lantai: req.query.p_lantai ? req.query.p_lantai : 0
      }
    },
    rules: {},
    request: 'getKodeUnit'
  },
  getKodeUnitJenis: {
    params: (req) => {
      return {
        p_kode_unit_jenis: req.query.p_kode_unit_jenis
          ? req.query.p_kode_unit_jenis.toString().trim().toUpperCase()
          : '',
        p_nama_unit_jenis: req.query.p_nama_unit_jenis
          ? req.query.p_nama_unit_jenis.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {},
    request: 'getKodeUnitJenis'
  },
  postSimpanKelompok: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_kelompok: req.body.p_kode_kelompok
          ? req.body.p_kode_kelompok.toString().trim().toUpperCase()
          : '',
        p_nama_kelompok: req.body.p_nama_kelompok
          ? req.body.p_nama_kelompok.toString().trim().toUpperCase()
          : '',
        p_ada_amortisasi: req.body.p_ada_amortisasi
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_kelompok: { required: true },
      p_nama_kelompok: { required: true },
      p_ada_amortisasi: { required: true }
    },
    request: 'postSimpanKelompok'
  },
  putUpdateKelompok: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_kelompok: req.body.p_kode_kelompok
          ? req.body.p_kode_kelompok.toString().trim().toUpperCase()
          : '',
        p_nama_kelompok: req.body.p_nama_kelompok
          ? req.body.p_nama_kelompok.toString().trim().toUpperCase()
          : '',
        p_ada_amortisasi: req.body.p_ada_amortisasi,
        p_aktif: req.body.p_aktif
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_kelompok: { required: true },
      p_nama_kelompok: { required: true }
    },
    request: 'putUpdateKelompok'
  },
  getMasaAmortisasiAset: {
    params: (req) => {
      return {
        p_kode_kategori: req.query.p_kode_kategori
          ? req.query.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_sub_kelompok: req.query.p_kode_sub_kelompok
          ? req.query.p_kode_sub_kelompok.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif.trim() : ''
      }
    },
    rules: {},
    request: 'getMasaAmortisasiAset'
  },
  postSimpanKategori: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_kelompok: req.body.p_kode_kelompok
          ? req.body.p_kode_kelompok.toString().trim().toUpperCase()
          : '',
        p_kode_title_kategori: req.body.p_kode_title_kategori
          ? req.body.p_kode_title_kategori.toString().trim().toUpperCase()
          : '',
        p_nama_title_kategori: req.body.p_nama_title_kategori
          ? req.body.p_nama_title_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_kategori: req.body.p_kode_kategori
          ? req.body.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_sub_kelompok: req.body.p_kode_sub_kelompok
          ? req.body.p_kode_sub_kelompok.toString().trim().toUpperCase()
          : '',
        p_nama_kategori: req.body.p_nama_kategori
          ? req.body.p_nama_kategori.toString().trim().toUpperCase()
          : '',
        p_aset_kapitalisasi: req.body.p_aset_kapitalisasi
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_kelompok: { required: true },
      p_kode_title_kategori: { required: true },
      p_nama_title_kategori: { required: true },
      p_kode_kategori: { required: true },
      p_kode_sub_kelompok: { required: true },
      p_nama_kategori: { required: true }
    },
    request: 'postSimpanKategori'
  },
  putUpdateKategori: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_kategori: req.body.p_kode_kategori
          ? req.body.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_sub_kelompok: req.body.p_kode_sub_kelompok
          ? req.body.p_kode_sub_kelompok.toString().trim().toUpperCase()
          : '',
        p_kode_title_kategori: req.body.p_kode_title_kategori
          ? req.body.p_kode_title_kategori.toString().trim().toUpperCase()
          : '',
        p_nama_title_kategori: req.body.p_nama_title_kategori
          ? req.body.p_nama_title_kategori.toString().trim().toUpperCase()
          : '',
        p_nama_kategori: req.body.p_nama_kategori
          ? req.body.p_nama_kategori.toString().trim().toUpperCase()
          : '',
        p_aset_kapitalisasi: req.body.p_aset_kapitalisasi,
        p_aktif: req.body.p_aktif
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_kategori: { required: true },
      p_kode_sub_kelompok: { required: true },
      p_kode_title_kategori: { required: true },
      p_nama_title_kategori: { required: true },
      p_nama_kategori: { required: true },
      p_aset_kapitalisasi: { required: true }
    },
    request: 'putUpdateKategori'
  },
  getKodeMtncWoTipe: {
    params: (req) => {
      return {
        p_komplain: req.query.p_komplain
          ? req.query.p_komplain.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {},
    request: 'getKodeMtncWoTipe'
  },
  getKodeMtncWoPrioritas: {
    params: (req) => {
      return {}
    },
    rules: {},
    request: 'getKodeMtncWoPrioritas'
  },
  getListSetupPenyusutan: {
    params: (req) => {
      return {
        p_kode_kategori: req.query.p_kode_kategori
          ? req.query.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_sub_kelompok: req.query.p_kode_sub_kelompok
          ? req.query.p_kode_sub_kelompok.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {},
    request: 'getListSetupPenyusutan'
  },
  getDetilSetupPenyusutan: {
    params: (req) => {
      return {
        p_id_kode_aset_penyusutan: req.query.p_id_kode_aset_penyusutan
          ? req.query.p_id_kode_aset_penyusutan.trim()
          : ''
      }
    },
    rules: {},
    request: 'getDetilSetupPenyusutan'
  },
  postSimpanKodeAsetPenyusutan: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_kategori: req.body.p_kode_kategori
          ? req.body.p_kode_kategori.toString().trim().toUpperCase()
          : '',
        p_kode_sub_kelompok: req.body.p_kode_sub_kelompok
          ? req.body.p_kode_sub_kelompok.toString().trim().toUpperCase()
          : '',
        p_tgl_efektif: req.body.p_tgl_efektif
          ? req.body.p_tgl_efektif.trim()
          : '',
        p_masa_manfaat_bln: req.body.p_masa_manfaat_bln
          ? req.body.p_masa_manfaat_bln.trim()
          : '',
        p_nilai_residu: req.body.p_nilai_residu
          ? req.body.p_nilai_residu.trim()
          : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_kategori: { required: true },
      p_kode_sub_kelompok: { required: true },
      p_tgl_efektif: { required: true },
      p_masa_manfaat_bln: { required: true },
      p_nilai_residu: { required: true }
    },
    request: 'postSimpanKodeAsetPenyusutan'
  },
  getKodeMenu: {
    params: (req) => {
      return {
        p_pengguna: req.jid
      }
    },
    rules: {},
    request: 'getKodeMenu'
  }
}

exports.methodGet = {
  '004001001': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeAsetKelompok), // kode/aset-kelompok
  '004001002': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeAsetKategori), // kode/aset-kategori
  '004001003': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getMasaAmortisasiAset) // kode/masa-amortisasi
  // ///
  /*
  'kode/kelamin': (req, res) => apiReq.getData(req, res, 'getKodeJenisKelamin'),
  'kode/unit-jenis': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeUnitJenis),
  'kode/nik-jenis': (req, res) => apiReq.getData(req, res, 'getKodeNikJenis'),
  'kode/tipe-out': (req, res) => apiReq.getData(req, res, 'getKodeTipeOut'),
  'kode/agama': (req, res) => apiReq.getData(req, res, 'getKodeAgama'),
  'kode/status-pekerjaan': (req, res) =>
    apiReq.getData(req, res, 'getKodeStatusPekerjaan'),
  'kode/jenis-kendaraan': (req, res) =>
    apiReq.getData(req, res, 'getKodeJenisKendaraan'),
  'kode/invoice-golongan': (req, res) =>
    apiReq.getData(req, res, 'getKodeInvoiceGolongan'),
  'kode/pembayaran-method': (req, res) =>
    apiReq.getData(req, res, 'getKodePembayaranMethod'),
  'kode/kontrak-berakhir': (req, res) =>
    apiReq.getData(req, res, 'getKodeBerhentiKontrak'),
  'kode/aset-kondisi': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeAsetKondisi),
  'kode/satuan': (req, res) => apiReq.getData(req, res, 'getKodeSatuan'),
  'kode/jenis-perolehan': (req, res) =>
    apiReq.getData(req, res, 'getKodeJenisPerolehan'),
  'kode/kode-kantor': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeKantor),
  'kode/unit': (req, res) => apiReq.getData(req, res, reqCtrl.getKodeUnit),
  'kode/komplain-kategori': (req, res) =>
    apiReq.getData(req, res, 'getKodeKomplainKategori'),
  'kode/wo-tipe': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeMtncWoTipe),
  'kode/wo-prioritas': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeMtncWoPrioritas),
  'kode/fasilitas': (req, res) => apiReq.getData(req, res, 'getKodeFasilitas'),
  // 'kode/kode-unit-jenis': (req, res) => apiReq.getData(req, res, reqCtrl.getKodeUnitJenis)
  'tes/report/jenis-kelamin': (req, res) =>
    apiReq.getReport(req, res, 'getKodeJenisKelamin', 'rptTesKodeJenisKelamin'),
  'tes/report/agama': (req, res) =>
    apiReq.getReport(req, res, 'getKodeAgama', 'rptTesKodeAgama'),
  'kode/list-setup-penyusutan': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getListSetupPenyusutan),
  'kode/detil-setup-penyusutan': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDetilSetupPenyusutan),
  'kode/status-nikah': (req, res) =>
    apiReq.getData(req, res, 'getKodeStatusNikah'),
  'kode/menu': (req, res) => apiReq.callFunction(req, res, reqCtrl.getKodeMenu)
  */
  // 'kode/kelamin-excel': (req, res) =>
  //   apiReq.getExcelBase64(req, res, 'getKodeJenisKelamin', 'air-log')
}

exports.methodPost = {
  '004001001': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanKelompok), // kode/simpan-kelompok
  // //

  '004001002': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanKategori) // kode/simpan-kategori
  /*
  'kode/simpan-kode-aset-penyusutan': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanKodeAsetPenyusutan)
    */
}

exports.methodPut = {
  '004001001': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putUpdateKelompok), // kode/update-kelompok
  '004001002': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putUpdateKategori) // kode/update-kategori
}
