const apiReq = require('./api-caller')

const reqCtrl = {
  getDaftarAset: {
    params: (req) => {
      return {
        p_kode_kategori: req.query.p_kode_kategori
          ? req.query.p_kode_kategori.trim()
          : '',
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : '',
        p_keyword: req.query.p_keyword ? req.query.p_keyword.trim() : '',
        p_kode_kantor: req.query.p_kode_kantor
          ? req.query.p_kode_kantor.trim()
          : ''
      }
    },
    rules: {},
    request: 'getDaftarAset'
  },
  getDetailAset: {
    params: (req) => {
      return {
        p_kode_aset: req.query.p_kode_aset ? req.query.p_kode_aset.trim() : ''
      }
    },
    rules: {},
    request: 'getDetailAset'
  },
  postSimpanAset: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_data_aset: req.body.p_data_aset ? req.body.p_data_aset : {}
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_data_aset: {
        required: true,
        type: 'object',
        rules: {
          kode_kantor: { required: true },
          kode_rusun: { required: true },
          kode_aset_rusun: { required: true },
          kode_aset_kategori: { required: true },
          nama_aset: { required: true },
          tgl_perolehan: { required: true },
          nilai_perolehan: { required: true },
          masa_manfaat_bln: { required: true },
          kode_sub_kelompok: { required: true }
        }
      }
    },
    request: 'postSimpanAset'
  },
  putUpdateAset: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_data_aset: req.body.p_data_aset ? req.body.p_data_aset : {}
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_data_aset: {
        required: true,
        type: 'object',
        rules: {
          nama_aset: { required: true }
        }
      }
    },
    request: 'putUpdateAset'
  },
  putHapusAset: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_keterangan: req.body.p_keterangan ? req.body.p_keterangan.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_keterangan: { required: true }
    },
    request: 'putHapusAset'
  },
  getDaftarPenempatanAset: {
    params: (req) => {
      return {
        p_kode_aset: req.query.p_kode_aset ? req.query.p_kode_aset.trim() : ''
      }
    },
    rules: {},
    request: 'getDaftarPenempatanAset'
  },
  postSimpanPenempatanAset: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_data_penempatan: req.body.p_data_penempatan
          ? req.body.p_data_penempatan
          : {}
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_data_penempatan: {
        required: true,
        type: 'object',
        rules: {
          tgl_penempatan: { required: true },
          kode_rusun: { required: true },
          kode_unit_jenis: { required: true }
        }
      }
    },
    request: 'postSimpanPenempatanAset'
  },
  getDaftarKondisiAset: {
    params: (req) => {
      return {
        p_kode_aset: req.query.p_kode_aset ? req.query.p_kode_aset.trim() : ''
      }
    },
    rules: { p_kode_aset: { required: true } },
    request: 'getDaftarKondisiAset'
  },
  postSimpanKondisiAset: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_tgl_kondisi: req.body.p_tgl_kondisi
          ? req.body.p_tgl_kondisi.trim()
          : '',
        p_kondisi_aset: req.body.p_kondisi_aset
          ? req.body.p_kondisi_aset.trim()
          : '',
        p_kondisi_aset_ref: req.body.p_kondisi_aset_ref
          ? req.body.p_kondisi_aset_ref.trim()
          : '',
        p_keterangan: req.body.p_keterangan ? req.body.p_keterangan.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_tgl_kondisi: { required: true },
      p_kondisi_aset: { required: true }
    },
    request: 'postSimpanKondisiAset'
  },
  getPenyusutanAset: {
    params: (req) => {
      return {
        p_kode_aset: req.query.p_kode_aset ? req.query.p_kode_aset.trim() : ''
      }
    },
    rules: { p_kode_aset: { required: true } },
    request: 'getPenyusutanAset'
  },
  postAsetLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_ket_dokumen: req.body.p_ket_dokumen
          ? req.body.p_ket_dokumen.trim()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_ket_dokumen: { required: true }
    },
    request: 'postAsetLampiran'
  },
  getListInventarisasi: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : '',
        p_tahun: req.query.p_tahun ? req.query.p_tahun.trim() : ''
      }
    },
    rules: {},
    request: 'getListInventarisasi'
  },
  getEntryInventarisasi: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : ''
      }
    },
    rules: {},
    request: 'getEntryInventarisasi'
  },
  getDetilInventarisasi: {
    params: (req) => {
      return {
        p_id_invent: req.query.p_id_invent ? req.query.p_id_invent.trim() : ''
      }
    },
    rules: {},
    request: 'getDetilInventarisasi'
  },
  getInventarisasiAktif: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : '',
        p_tahun: req.query.p_tahun ? req.query.p_tahun.trim() : ''
      }
    },
    rules: {
      p_kode_rusun: { required: true },
      p_tahun: { required: true }
    },
    request: 'getInventarisasiAktif'
  },
  getListDetilInventarisasi: {
    params: (req) => {
      return {
        p_id_invent: req.query.p_id_invent ? req.query.p_id_invent.trim() : ''
      }
    },
    rules: {
      p_id_invent: { required: true }
    },
    request: 'getListDetilInventarisasi'
  },
  postSimpanInventarisasi: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_kode_kantor: req.body.p_kode_kantor
          ? req.body.p_kode_kantor.trim()
          : '',
        p_kode_rusun: req.body.p_kode_rusun ? req.body.p_kode_rusun.trim() : '',
        p_tgl_sprin: req.body.p_tgl_sprin ? req.body.p_tgl_sprin.trim() : '',
        p_no_sprin: req.body.p_no_sprin ? req.body.p_no_sprin.trim() : '',
        p_tgl_invent: req.body.p_tgl_invent ? req.body.p_tgl_invent.trim() : '',
        p_thn_invent: req.body.p_thn_invent ? req.body.p_thn_invent.trim() : '',
        p_keterangan: req.body.p_keterangan ? req.body.p_keterangan.trim() : '',
        p_data_aset: req.body.p_data_aset ? req.body.p_data_aset : []
      }
    },
    rules: {
      p_kode_kantor: { required: true },
      p_kode_rusun: { required: true },
      p_tgl_sprin: { required: true },
      p_no_sprin: { required: true },
      p_tgl_invent: { required: true },
      p_thn_invent: { required: true },
      p_data_aset: {
        required: true,
        type: 'array-object',
        rules: {
          kode_aset: {
            required: true
          },
          kondisi_aset: {
            required: true
          }
        }
      }
    },
    request: 'postSimpanInventarisasi'
  },
  putInventarisasiBatal: {
    params: (req) => {
      return {
        p_kode_pengguna: req.body.p_kode_pengguna
          ? req.body.p_kode_pengguna.trim()
          : '',
        p_id_invent: req.body.p_id_invent ? req.body.p_id_invent.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_invent: { required: true }
    },
    request: 'putInventarisasiBatal'
  },
  getKodeRusunAsetByRusun: {
    params: (req) => {
      return {
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : ''
      }
    },
    rules: {},
    request: 'getKodeRusunAsetByRusun'
  },
  getDaftarAsetInventaris: {
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
        p_kode_rusun: req.query.p_kode_rusun
          ? req.query.p_kode_rusun.trim()
          : '',
        p_id_rusun_blok: req.query.p_id_rusun_blok
          ? req.query.p_id_rusun_blok.trim()
          : '',
        p_id_lantai: req.query.p_id_lantai ? req.query.p_id_lantai.trim() : '',
        p_id_unit: req.query.p_id_unit ? req.query.p_id_unit.trim() : '',
        p_keyword: req.query.p_keyword ? req.query.p_keyword.trim() : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {},
    request: 'getDaftarAsetInventaris'
  },
  putAsetBiaya: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_aset: req.body.p_kode_aset ? req.body.p_kode_aset.trim() : '',
        p_biaya_kerusakan: req.body.p_biaya_kerusakan
          ? req.body.p_biaya_kerusakan.trim()
          : '',
        p_biaya_kehilangan: req.body.p_biaya_kehilangan
          ? req.body.p_biaya_kehilangan.trim()
          : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_kode_aset: { required: true },
      p_biaya_kerusakan: { required: true },
      p_biaya_kehilangan: { required: true }
    },
    request: 'putAsetBiaya'
  }
}

exports.methodGet = {
  '001000000': (req, res) => apiReq.getData(req, res, reqCtrl.getDaftarAset), // aset/daftar-aset
  '001000001': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDetailAset, 'lampiran_file'), // aset/detail-aset
  '001001000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDaftarPenempatanAset), // aset/daftar-penempatan
  '001002000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDaftarKondisiAset), // aset/daftar-kondisi
  '001004000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getPenyusutanAset), // aset/penyusutan-aset
  '001003000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDaftarAsetInventaris) // aset/daftar-aset-inventaris
  /*
  'aset/list-inventarisasi': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getListInventarisasi),
  'aset/entry-inventarisasi': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getEntryInventarisasi),
  'aset/detil-inventarisasi': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getDetilInventarisasi),
  'aset/inventarisasi-aktif': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getInventarisasiAktif),
  'aset/list-detil-invent': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getListDetilInventarisasi),
  'aset/daftar-kode-rusun-aset': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getKodeRusunAsetByRusun)
    */
}

exports.methodPost = {
  '001000000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanAset), // aset/simpan-aset
  '001001000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanPenempatanAset), // aset/simpan-penempatan
  '001002000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanKondisiAset) // aset/simpan-kondisi
  /*
  'aset/simpan-inventarisasi': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postSimpanInventarisasi)
  */
}

exports.methodDel = {
  // 'settings/aset': (req, res) => apiReq.callFunction(req, res, reqCtrl.delSettingsAset)
  '001000000': (req, res) => apiReq.callFunction(req, res, reqCtrl.putHapusAset) // aset/hapus-aset
}
exports.methodPut = {
  '001000000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putUpdateAset), // aset/update-aset
  '001003001': (req, res) => apiReq.callFunction(req, res, reqCtrl.putAsetBiaya) // aset/update-aset-biaya
  /*
  'aset/batal-inventarisasi': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putInventarisasiBatal),
    */
}

exports.methodPostUploadBase64 = {
  '001000002': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postAsetLampiran) // aset/upload-lampiran
  // 'tes-upload': (req, res) => {
  //   console.log('isi body:', req.body.cephData)
  //   res.status(200).json({ ret: 0, msg: req.body.cephData })
  // }
}
