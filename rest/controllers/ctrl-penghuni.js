const apiReq = require('./api-caller')

const reqCtrl = {
  getPenghuni: {
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
          : null,
        p_blok: req.query.p_blok ? req.query.p_blok : null,
        p_lantai: req.query.p_lantai ? req.query.p_lantai : null,
        p_unit: req.query.p_unit ? req.query.p_unit : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
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
    request: 'getPenghuni'
  },
  getPenghuniHistory: {
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
          : null,
        p_date: req.query.p_date ? req.query.p_date : null,
        p_blok: req.query.p_blok ? req.query.p_blok : null,
        p_lantai: req.query.p_lantai ? req.query.p_lantai : null,
        p_unit: req.query.p_unit ? req.query.p_unit : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
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
    request: 'getPenghuniHistory'
  },

  postPenghuniInWithProfil: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_penanggung_jawab: req.body.p_penanggung_jawab
          ? req.body.p_penanggung_jawab
          : false,
        p_kpj: req.body.p_kpj ? req.body.p_kpj.toString().trim() : '',
        p_kpj_nama: req.body.p_kpj_nama
          ? req.body.p_kpj_nama.toString().trim().toUpperCase()
          : '',
        p_nik: req.body.p_nik
          ? req.body.p_nik.toString().trim().toUpperCase()
          : '',
        p_nik_jenis: req.body.p_nik_jenis
          ? req.body.p_nik_jenis.toString().trim().toUpperCase()
          : '',
        p_jenis_kelamin: req.body.p_jenis_kelamin
          ? req.body.p_jenis_kelamin.trim()
          : '',
        p_id_unit: req.body.p_id_unit ? req.body.p_id_unit : 0,
        p_tgl_in: req.body.p_tgl_in ? req.body.p_tgl_in.trim() : '',
        p_data_profil: req.body.p_data_profil ? req.body.p_data_profil : {}
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_penanggung_jawab: { required: true },
      p_kpj: { required: true },
      p_kpj_nama: { required: true },
      p_jenis_kelamin: { required: true },
      p_id_unit: { required: true },
      p_tgl_in: { required: true },
      p_data_profil: {
        required: true,
        type: 'object',
        rules: {
          jenis_kelamin: { required: true },
          kpjNama: { required: true }
        }
      }
    },
    request: 'postPenghuniInWithProfil'
  },
  postPenghuniOut: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_registrasi_penghuni: req.body.p_id_registrasi_penghuni
          ? req.body.p_id_registrasi_penghuni
          : 0,
        p_tgl_out: req.body.p_tgl_out ? req.body.p_tgl_out.trim() : '',
        p_tipe_out: req.body.p_tipe_out ? req.body.p_tipe_out.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_registrasi_penghuni: { required: true },
      p_tgl_out: { required: true }
    },
    request: 'postPenghuniOut'
  },
  putPenghuniPenanggungJawab: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_registrasi_penghuni: req.body.p_id_registrasi_penghuni
          ? req.body.p_id_registrasi_penghuni
          : 0
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_registrasi_penghuni: { required: true }
    },
    request: 'putPenghuniPenanggungJawab'
  },
  getPenghuniProfilByKPJ: {
    params: (req) => {
      return {
        p_kpj: req.query.p_kpj ? req.query.p_kpj.trim() : ''
      }
    },
    rules: {
      p_kpj: { required: true }
    },
    request: 'getPenghuniProfilByKPJ'
  },
  getPenghuniProfil: {
    params: (req) => {
      return {
        p_id_profil: req.query.p_id_profil ? req.query.p_id_profil : null,
        p_kpj: req.query.p_kpj ? req.query.p_kpj.trim() : '',
        p_nik: req.query.p_nik ? req.query.p_nik.trim() : ''
      }
    },
    rules: {},
    request: 'getPenghuniProfil'
  },
  putPenghuniProfil: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_registrasi_penghuni: req.body.p_id_registrasi_penghuni
          ? req.body.p_id_registrasi_penghuni
          : 0,
        p_data_profil: req.body.p_data_profil ? req.body.p_data_profil : {}
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_id_registrasi_penghuni: { required: true },
      p_data_profil: {
        required: true,
        type: 'object',
        rules: {
          jenis_kelamin: { required: true },
          kpjNama: { required: true }
        }
      }
    },
    request: 'putPenghuniProfil'
  },
  postPenghuniProfilLampiran: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kpj: req.body.p_kpj ? req.body.p_kpj.trim() : '',
        p_nik: req.body.p_nik ? req.body.p_nik.trim() : '',
        p_dokumen: req.body.p_dokumen
          ? req.body.p_dokumen.toString().trim().toUpperCase()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_kode_pengguna: { required: true },
      p_dokumen: { required: true },
      p_path: { required: true }
    },
    request: 'postPenghuniProfilLampiran'
  },
  getPenghuniProfilLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kpj: req.query.p_kpj ? req.query.p_kpj.trim() : '',
        p_nik: req.query.p_nik ? req.query.p_nik.trim() : '',
        p_dokumen: req.query.p_dokumen
          ? req.query.p_dokumen.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_dokumen: { required: true }
    },
    request: 'getPenghuniProfilLampiran'
  }
}

exports.methodGet = {
  '008000000': (req, res) => apiReq.getData(req, res, reqCtrl.getPenghuni), // penghuni
  '008000002': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getPenghuniHistory), // penghuni/history
  '008000001': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getPenghuniProfilLampiran, 'path_dokumen') // penghuni/profil/lampiran
  /*
  'penghuni/profil-by-kpj': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getPenghuniProfilByKPJ),
  'penghuni/profil': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getPenghuniProfil)
    */
}

exports.methodPost = {
  // 'penghuni/in-with-profil': (req, res) =>
  //   apiReq.callFunction(req, res, reqCtrl.postPenghuniInWithProfil)
}

exports.methodPut = {
  /*
  'penghuni/out': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postPenghuniOut)
  'penghuni/penanggung-jawab': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putPenghuniPenanggungJawab)
  'penghuni/profil': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.putPenghuniProfil)
  */
}

exports.methodPostUploadBase64 = {
  '008000001': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postPenghuniProfilLampiran) // penghuni/profil/lampiran
}
