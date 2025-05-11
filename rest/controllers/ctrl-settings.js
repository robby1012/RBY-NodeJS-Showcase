const apiReqNew = require('./api-caller-new')
const bcrypt = require('bcryptjs')
const isString = require('lodash/isString')
const isObject = require('lodash/isObject')
const isArray = require('lodash/isArray')

const reqCtrl = {
  getSettingsAgama: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 10,
          message: '^Kode Agama maximum 10 characters'
        }
      }
    },
    request: 'getSettingsAgama'
  },
  postSettingsAgama: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 10,
          message: '^Kode Agama maximum 10 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Agama maximum 100 characters'
        }
      }
    },
    request: 'postSettingsAgama'
  },
  delSettingsAgama: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 10,
          message: '^Kode Agama maximum 10 characters'
        }
      }
    },
    request: 'delSettingsAgama'
  },
  getSettingsJenisKelamin: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 1,
          message: '^Kode Jenis Kelamin maximum 3 characters'
        }
      }
    },
    request: 'getSettingsJenisKelamin'
  },
  postSettingsJenisKelamin: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 1,
          message: '^Kode Jenis Kelamin maximum 1 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Jenis Kelamin maximum 100 characters'
        }
      }
    },
    request: 'postSettingsJenisKelamin'
  },
  delSettingsJenisKelamin: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 1,
          message: '^Kode Jenis Kelamin maximum 1 characters'
        }
      }
    },
    request: 'delSettingsJenisKelamin'
  },
  getSettingsJenisKendaraan: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 3,
          message: '^Kode Jenis Kendaraan maximum 3 characters'
        }
      }
    },
    request: 'getSettingsJenisKendaraan'
  },
  postSettingsJeniKendaraan: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Jenis Kendaraan maximum 3 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Nama Jenis Kendaraan maximum 50 characters'
        }
      }
    },
    request: 'postSettingsJeniKendaraan'
  },
  delSettingsJenisKendaraan: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Jenis Kendaraan maximum 3 characters'
        }
      }
    },
    request: 'delSettingsJenisKendaraan'
  },
  getSettingsStatusPekerjaan: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 3,
          message: '^Kode Status Pekerjaan maximum 3 characters'
        }
      }
    },
    request: 'getSettingsStatusPekerjaan'
  },
  postSettingsStatusPekerjaan: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 3,
          message: '^Kode Status Pekerjaan maximum 3 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Deskripsi Status Pekerjaan maximum 100 characters'
        }
      }
    },
    request: 'postSettingsStatusPekerjaan'
  },
  delSettingsStatusPekerjaan: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Status Pekerjaan maximum 3 characters'
        }
      }
    },
    request: 'delSettingsStatusPekerjaan'
  },
  getSettingsJenisNik: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 10,
          message: '^Kode Jenis NIK maximum 10 characters'
        }
      }
    },
    request: 'getSettingsJenisNik'
  },
  postSettingsJenisNik: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 10,
          message: '^Kode Jenis NIK maximum 10 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Jenis NIK maximum 100 characters'
        }
      }
    },
    request: 'postSettingsJenisNik'
  },
  delSettingsJenisNik: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 10,
          message: '^Kode Jenis NIK maximum 10 characters'
        }
      }
    },
    request: 'delSettingsJenisNik'
  },
  getSettingsTipeOut: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 2,
          message: '^Kode Tipe Out maximum 2 characters'
        }
      }
    },
    request: 'getSettingsTipeOut'
  },
  postSettingsTipeOut: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 2,
          message: '^Kode Tipe Out maximum 2 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Deskripsi Tipe Out maximum 50 characters'
        }
      }
    },
    request: 'postSettingsTipeOut'
  },
  delSettingsTipeOut: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 2,
          message: '^Kode Tipe Out maximum 2 characters'
        }
      }
    },
    request: 'delSettingsTipeOut'
  },
  getSettingsKantor: {
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
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      }
    },
    request: 'getSettingsKantor'
  },
  postSettingsKantor: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : null,
        p_induk: req.body.p_induk ? req.body.p_induk : null,
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_jenis: req.body.p_jenis
          ? req.body.p_jenis.toString().trim().toUpperCase()
          : '',
        p_alamat: req.body.p_alamat
          ? req.body.p_alamat.toString().trim().toUpperCase()
          : '',
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      },
      p_induk: {
        length: {
          maximum: 5,
          message: '^Kode Kantor induk  maximum 5 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Kantor maximum 5 characters'
        }
      },
      p_jenis: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 1,
          message: '^Jenis Kantor maximum 1 characters'
        }
      }
    },
    request: 'postSettingsKantor'
  },
  delSettingsKantor: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Kantor maximum 3 characters'
        }
      }
    },
    request: 'delSettingsKantor'
  },
  getSettingsRusun: {
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
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      }
    },
    request: 'getSettingsRusun'
  },
  postSettingsRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_kantor: req.body.p_kantor
          ? req.body.p_kantor.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_lokasi: req.body.p_lokasi
          ? req.body.p_lokasi.toString().trim().toUpperCase()
          : '',
        p_provinsi: req.body.p_provinsi
          ? req.body.p_provinsi.toString().trim().toUpperCase()
          : '',
        p_kecamatan: req.body.p_kecamatan
          ? req.body.p_kecamatan.toString().trim().toUpperCase()
          : '',
        p_latitude: req.body.p_latitude ? req.body.p_latitude : null,
        p_longitude: req.body.p_longitude ? req.body.p_longitude : null,
        p_fax: req.body.p_fax
          ? req.body.p_fax.toString().trim().toUpperCase()
          : '',
        p_telpon: req.body.p_telpon
          ? req.body.p_telpon.toString().trim().toUpperCase()
          : '',
        p_initial_rusun: req.body.p_initial_rusun
          ? req.body.p_initial_rusun.toString().trim().toUpperCase()
          : '',
        p_initial_daerah: req.body.p_initial_daerah
          ? req.body.p_initial_daerah.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_kantor: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Rusun maximum 100 characters'
        }
      },
      p_lokasi: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 255,
          message: '^Lokasi Rusun maximum 255 characters'
        }
      },
      p_provinsi: {
        length: {
          maximum: 100,
          message: '^Nama Provinsi maximum 100 characters'
        }
      },
      p_kecamatan: {
        length: {
          maximum: 100,
          message: '^Nama Kecamatan maximum 100 characters'
        }
      },
      p_fax: {
        length: {
          maximum: 100,
          message: '^Fax maximum 100 characters'
        }
      },
      p_telpon: {
        length: {
          maximum: 100,
          message: '^Telp maximum 100 characters'
        }
      }
    },
    request: 'postSettingsRusun'
  },
  delSettingsRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      }
    },
    request: 'delSettingsRusun'
  },
  getSettingsLantai: {
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
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
        p_nama: req.query.p_nama
          ? req.query.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_id: {
        type: {
          type: 'integer',
          message: '^ID Lantai harus angka'
        }
      },
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_nama: {
        length: {
          maximum: 50,
          message: '^Nama Lantai maximum 50 characters'
        }
      }
    },
    request: 'getSettingsLantai'
  },
  postSettingsLantai: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : null,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_no: req.body.p_no ? Number(req.body.p_no) : null,
        p_id_blok: req.body.p_id_blok ? Number(req.body.p_id_blok) : null,
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : true,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_id: {
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      },
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_no: {
        presence: true,
        type: {
          type: 'number',
          message: '^No Lantai harus angka'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Nama Lantai maximum 50 characters'
        }
      }
    },
    request: 'postSettingsLantai'
  },
  delSettingsLantai: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      }
    },
    request: 'delSettingsLantai'
  },
  getSettingsUnitJenis: {
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
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      }
    },
    request: 'getSettingsUnitJenis'
  },
  postSettingsUnitJenis: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_disewakan: req.body.p_disewakan ? req.body.p_disewakan : true,
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Nama Jenis Unit maximum 5 characters'
        }
      }
    },
    request: 'postSettingsUnitJenis'
  },
  delSettingsUnitJenis: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      }
    },
    request: 'delSettingsUnitJenis'
  },
  getSettingsUnit: {
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
        p_lantai: req.query.p_lantai ? Number(req.query.p_lantai) : 0,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
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
      p_jenis: {
        length: {
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      },
      p_lantai: {
        type: {
          type: 'integer',
          message: '^ID Lantai harus angka'
        }
      },
      p_id: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'getSettingsUnit'
  },
  postSettingsUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : null,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_jenis: req.body.p_jenis
          ? req.body.p_jenis.toString().trim().toUpperCase()
          : '',
        p_lantai: req.body.p_lantai ? Number(req.body.p_lantai) : null,
        p_no: req.body.p_no ? Number(req.body.p_no) : null,
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_gol_listrik: req.body.p_gol_listrik
          ? req.body.p_gol_listrik.toString().trim().toUpperCase()
          : null,
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_rented: req.body.p_rented ? req.body.p_rented : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_jenis: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      },
      p_lantai: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Lantai harus angka'
        }
      },
      p_id: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      },
      p_no: {
        type: {
          type: 'integer',
          message: '^No Unit harus angka'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Nama Unit maximum 5 characters'
        }
      },
      p_gol_listrik: {
        length: {
          maximum: 2,
          message: '^Golongan Listrik maximum 2 characters'
        }
      }
    },
    request: 'postSettingsUnit'
  },
  delSettingsUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : 0
      }
    },
    rules: {
      p_id: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'delSettingsUnit'
  },
  getSettingsBlok: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? Number(req.query.p_id) : null,
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'getSettingsBlok'
  },
  postSettingsBlok: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_id: req.body.p_id ? Number(req.body.p_id) : null,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      },
      p_rusun: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^Nama Blok maximum 50 characters'
        }
      }
    },
    request: 'postSettingsBlok'
  },
  delSettingsBlok: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id: req.body.p_id ? Number(req.body.p_id) : null
      }
    },
    rules: {},
    request: 'delSettingsBlok'
  },
  getSettingsBlokExclude: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.query.p_blok
          ? req.query.p_blok.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_blok: {
        length: {
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'getSettingsBlokExclude'
  },
  postSettingsBlokExclude: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.body.p_blok
          ? req.body.p_blok.toString().trim().toUpperCase()
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
      p_blok: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'postSettingsBlokExclude'
  },
  putSettingsBlokExclude: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.body.p_blok
          ? req.body.p_blok.toString().trim().toUpperCase()
          : '',
        p_rusun_old: req.body.p_rusun_old
          ? req.body.p_rusun_old.toString().trim().toUpperCase()
          : '',
        p_blok_old: req.body.p_blok_old
          ? req.body.p_blok_old.toString().trim().toUpperCase()
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
      p_blok: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      },
      p_rusun_old: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_blok_old: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'putSettingsBlokExclude'
  },
  delSettingsBlokExclude: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_blok: req.body.p_blok
          ? req.body.p_blok.toString().trim().toUpperCase()
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
      p_blok: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'delSettingsBlokExclude'
  },
  getSettingsPengguna: {
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
        p_kantor: req.query.p_kantor
          ? req.query.p_kantor.toString().trim().toUpperCase()
          : '',
        p_pengguna: req.query.p_pengguna
          ? req.query.p_pengguna.toString().trim().toUpperCase()
          : '',
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_kantor: {
        length: {
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      },
      p_pengguna: {
        length: {
          maximum: 30,
          message: '^Kode Pengguna maximum 30 characters'
        }
      },
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      }
    },
    request: 'getSettingsPengguna'
  },
  postSettingsPengguna: {
    params: (req) => {
      let xRoles = []
      if (req.body.p_roles) {
        if (isArray(req.body.p_roles)) {
          xRoles = req.body.p_roles
        } else if (isString(req.body.p_roles)) {
          if (apiReqNew.IsJsonString(req.body.p_roles)) {
            xRoles = JSON.parse(req.body.p_roles)
          }
        }
      }
      return {
        p_petugas: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : null,
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_kantor: req.body.p_kantor
          ? req.body.p_kantor.toString().trim().toUpperCase()
          : '',
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : null,
        p_departemen: req.body.p_departemen
          ? req.body.p_departemen.toString().trim().toUpperCase()
          : '',
        p_atasan: req.body.p_atasan
          ? req.body.p_atasan.toString().trim().toUpperCase()
          : '',
        p_email: req.body.p_email ? req.body.p_email.trim() : '',
        p_password: req.body.p_password ? req.body.p_password : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_locked: req.body.p_locked ? req.body.p_locked : null,
        p_roles: xRoles.length > 0 ? xRoles : null
      }
    },
    rules: {
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Pengguna maximum 100 characters'
        }
      },
      p_kantor: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      },
      p_roles: {
        presence: true,
        array: {
          kode_role: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 5,
              message: '^Kode Role maximum 5 characters'
            }
          }
        }
      },
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_departemen: {
        length: {
          maximum: 100,
          message: '^Nama Departemen maximum 100 characters'
        }
      },
      p_atasan: {
        length: {
          maximum: 100,
          message: '^Nama Atasan maximum 100 characters'
        }
      },
      p_email: {
        email: {
          message: '^Email harus benar'
        }
      }
    },
    request: 'postSettingsPengguna'
  },
  putSettingsPengguna: {
    params: (req) => {
      let xRoles = []
      if (req.body.p_roles) {
        if (isObject(req.body.p_roles)) {
          xRoles = req.body.p_roles
        } else if (isString(req.body.p_roles)) {
          if (apiReqNew.IsJsonString(req.body.p_roles)) {
            xRoles = JSON.parse(req.body.p_roles)
          }
        }
      }
      return {
        p_petugas: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_kantor: req.body.p_kantor
          ? req.body.p_kantor.toString().trim().toUpperCase()
          : '',
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_departemen: req.body.p_departemen
          ? req.body.p_departemen.toString().trim().toUpperCase()
          : '',
        p_atasan: req.body.p_atasan
          ? req.body.p_atasan.toString().trim().toUpperCase()
          : '',
        p_email: req.body.p_email ? req.body.p_email.trim() : '',
        p_password: null,
        p_aktif: req.body.p_aktif ? req.body.p_aktif : true,
        p_locked: req.body.p_locked ? req.body.p_locked : false,
        p_roles: xRoles.length > 0 ? xRoles : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 30,
          message: '^Kode Pengguna maximum 30 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 100,
          message: '^Nama Pengguna maximum 100 characters'
        }
      },
      p_kantor: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Kantor maximum 5 characters'
        }
      },
      p_roles: {
        presence: true,
        array: {
          kode_role: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 5,
              message: '^Kode Role maximum 5 characters'
            }
          },
          jenis_kantor: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 1,
              message: '^Kode Jenis Kantor maximum 1 characters'
            }
          }
        }
      },
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_departemen: {
        length: {
          maximum: 100,
          message: '^Nama Departemen maximum 100 characters'
        }
      },
      p_atasan: {
        length: {
          maximum: 100,
          message: '^Nama Atasan maximum 100 characters'
        }
      },
      p_email: {
        email: {
          message: '^Email harus benar'
        }
      }
    },
    request: 'putSettingsPengguna'
  },
  putSettingsPenggunaChangePassword: {
    params: (req) => {
      const hashNewPassword = bcrypt.hashSync(
        req.body.p_password_new ? req.body.p_password_new.trim() : ''
      )
      return {
        p_petugas: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_password: hashNewPassword
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 30,
          message: '^Kode Pengguna maximum 30 characters'
        }
      },
      p_password: {
        presence: true
      }
    },
    request: 'putSettingsPenggunaResetPassword'
  },
  putSettingsPenggunaResetPassword: {
    params: (req) => {
      return {
        p_petugas: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_password: req.body.p_password ? req.body.p_password : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 30,
          message: '^Kode Pengguna maximum 30 characters'
        }
      },
      p_password: {
        presence: true
      }
    },
    request: 'putSettingsPenggunaResetPassword'
  },
  getSettingsPenggunaRole: {
    params: (req) => {
      return {
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {},
    request: 'getSettingsPenggunaRole'
  },
  getTarifLantai: {
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
        p_id_lantai: req.query.p_id_lantai ? Number(req.query.p_id_lantai) : 0,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
        p_status: req.query.p_status ? req.query.p_status.trim() : null,
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
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
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_id_lantai: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      },
      p_id: {
        type: {
          type: 'number',
          message: '^ID Tarif Khusus Unit harus angka'
        }
      }
    },
    request: 'getTarifLantai'
  },
  getTarifLantaiLastPeriod: {
    params: (req) => {
      return {
        p_exluded_id: req.query.p_exluded_id
          ? Number(req.query.p_exluded_id)
          : null,
        p_id_lantai: req.query.p_id_lantai ? Number(req.query.p_id_lantai) : 0,
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_lantai: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'getTarifLantaiLastPeriod'
  },
  postTarifLantai: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_lantai: req.body.p_id_tarif_lantai
          ? Number(req.body.p_id_tarif_lantai)
          : null,
        p_id_lantai: req.body.p_id_lantai ? Number(req.body.p_id_lantai) : 0,
        p_kode_unit_jenis: req.body.p_kode_unit_jenis
          ? req.body.p_kode_unit_jenis.toString().trim().toUpperCase()
          : '',
        p_tgl_mulai: req.body.p_tgl_mulai ? req.body.p_tgl_mulai.trim() : '',
        p_tgl_berakhir: req.body.p_tgl_berakhir
          ? req.body.p_tgl_berakhir.trim()
          : '',
        p_tarif: req.body.p_tarif ? Number(req.body.p_tarif) : 0,
        p_deposit: req.body.p_deposit ? Number(req.body.p_deposit) : 0,
        p_pajak: req.body.p_pajak ? Number(req.body.p_pajak) : 0
      }
    },
    rules: {
      p_id_tarif_lantai: {
        type: {
          type: 'number',
          message: '^ID Tarif Unit  Per Lantai harus angka'
        }
      },
      p_id_lantai: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Lantai harus angka'
        }
      },
      p_kode_unit_jenis: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 5,
          message: '^Kode Jenis Unit maximum 5 characters'
        }
      },
      p_tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Mulai harus format YYYY-MM-DD'
        }
      },
      p_tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Berakhir harus format YYYY-MM-DD'
        }
      },
      p_tarif: {
        presence: true,
        type: {
          type: 'number',
          message: '^Tarif Khusus Unit harus angka'
        }
      }
    },
    request: 'postTarifLantai'
  },
  putTarifLantaiApprove: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_lantai: req.body.p_id_tarif_lantai
          ? Number(req.body.p_id_tarif_lantai)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_approved: req.body.p_approved ? req.body.p_approved : null
      }
    },
    rules: {
      p_id_tarif_lantai: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Unit Per Lantai harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      },
      p_approved: {
        type: {
          type: 'boolean',
          message: '^Approval harus true/ false'
        }
      }
    },
    request: 'putTarifLantaiApprove'
  },
  delTarifLantai: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_lantai: req.body.p_id_tarif_lantai
          ? Number(req.body.p_id_tarif_lantai)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_tarif_lantai: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Unit Perlantai harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      }
    },
    request: 'delTarifLantai'
  },
  getTarifUnit: {
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
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_status: req.query.p_status ? req.query.p_status.trim() : '',
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
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_id_unit: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      },
      p_id: {
        type: {
          type: 'number',
          message: '^ID Tarif Khusus Unit harus angka'
        }
      }
    },
    request: 'getTarifUnit'
  },
  getTarifUnitLastPeriod: {
    params: (req) => {
      return {
        p_exluded_id: req.query.p_exluded_id
          ? Number(req.query.p_exluded_id)
          : null,
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : 0
      }
    },
    rules: {
      p_id_unit: {
        type: {
          type: 'integer',
          message: '^ID Unit harus angka'
        }
      }
    },
    request: 'getTarifUnitLastPeriod'
  },
  postTarifUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_unit: req.body.p_id_tarif_unit
          ? Number(req.body.p_id_tarif_unit)
          : null,
        p_id_unit: req.body.p_id_unit ? Number(req.body.p_id_unit) : 0,
        p_tgl_mulai: req.body.p_tgl_mulai ? req.body.p_tgl_mulai.trim() : '',
        p_tgl_berakhir: req.body.p_tgl_berakhir
          ? req.body.p_tgl_berakhir.trim()
          : '',
        p_tarif: req.body.p_tarif ? Number(req.body.p_tarif) : 0,
        p_deposit: req.body.p_deposit ? Number(req.body.p_deposit) : 0,
        p_pajak: req.body.p_pajak ? Number(req.body.p_pajak) : 0
      }
    },
    rules: {
      p_id_tarif_unit: {
        type: {
          type: 'number',
          message: '^ID Tarif Unit harus angka'
        }
      },
      p_id_unit: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Unit harus angka'
        }
      },
      p_tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Mulai harus format YYYY-MM-DD'
        }
      },
      p_tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Berakhir harus format YYYY-MM-DD'
        }
      },
      p_tarif: {
        presence: true,
        type: {
          type: 'number',
          message: '^Tarif Khusus Unit harus angka'
        }
      }
    },
    request: 'postTarifUnit'
  },
  putTarifUnitApprove: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_unit: req.body.p_id_tarif_unit
          ? Number(req.body.p_id_tarif_unit)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_approved: req.body.p_approved ? req.body.p_approved : null
      }
    },
    rules: {
      p_id_tarif_unit: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Khusus Unit harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      },
      p_approved: {
        type: {
          type: 'boolean',
          message: '^Approval harus true/ false'
        }
      }
    },
    request: 'putTarifUnitApprove'
  },
  delTarifUnit: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_unit: req.body.p_id_tarif_unit
          ? req.body.p_id_tarif_unit
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_tarif_unit: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Khusus Unit harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      }
    },
    request: 'delTarifUnit'
  },
  getTarifListrik: {
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
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
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
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_id: {
        type: {
          type: 'integer',
          message: '^ID Tarif air harus angka'
        }
      }
    },
    request: 'getTarifListrik'
  },
  getTarifListrikLastPeriod: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_kode_golongan: req.query.p_kode_golongan
          ? req.query.p_kode_golongan.toString().trim().toUpperCase()
          : '',
        p_exluded_id: req.query.p_exluded_id
          ? Number(req.query.p_exluded_id)
          : null
      }
    },
    rules: {},
    request: 'getTarifListrikLastPeriod'
  },
  postTarifListrik: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_tarif: req.body.p_id_tarif ? Number(req.body.p_id_tarif) : 0,
        p_gol_listrik: req.body.p_gol_listrik
          ? req.body.p_gol_listrik.toString().trim().toUpperCase()
          : '',
        p_tgl_mulai: req.body.p_tgl_mulai ? req.body.p_tgl_mulai.trim() : '',
        p_tgl_berakhir: req.body.p_tgl_berakhir
          ? req.body.p_tgl_berakhir.trim()
          : '',
        p_rate: req.body.p_rate ? Number(req.body.p_rate) : 0,
        p_pengali: req.body.p_pengali ? Number(req.body.p_pengali) : 0,
        p_demand: req.body.p_demand ? Number(req.body.p_demand) : 0,
        p_pju: req.body.p_pju ? Number(req.body.p_pju) : 0
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_gol_listrik: {
        presence: true,
        length: {
          maximum: 10,
          message: '^Kode Golongan Listrik maximum 2 characters'
        }
      },
      p_tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Mulai harus format YYYY-MM-DD'
        }
      },
      p_tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Berakhir harus format YYYY-MM-DD'
        }
      },
      p_rate: {
        presence: true,
        type: {
          type: 'number',
          message: '^Rate Meter Air harus angka'
        }
      },
      p_pengali: {
        presence: true,
        type: {
          type: 'number',
          message: '^Faktor pengali PJU harus angka'
        }
      },
      p_demand: {
        presence: true,
        type: {
          type: 'number',
          message: '^Demand Charges harus angka'
        }
      },
      p_pju: {
        presence: true,
        type: {
          type: 'number',
          message: '^PJU harus angka'
        }
      }
    },
    request: 'postTarifListrik'
  },
  delTarifListrik: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_listrik: req.body.p_id_tarif_listrik
          ? Number(req.body.p_id_tarif_listrik)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_tarif_listrik: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Fasilitas harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      }
    },
    request: 'delTarifListrik'
  },
  getTarifAir: {
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
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
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
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_id: {
        type: {
          type: 'integer',
          message: '^ID Tarif air harus angka'
        }
      }
    },
    request: 'getTarifAir'
  },
  getTarifAirLastPeriod: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_exluded_id: req.query.p_exluded_id
          ? Number(req.query.p_exluded_id)
          : null
      }
    },
    rules: {},
    request: 'getTarifAirLastPeriod'
  },
  postTarifAir: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_id_tarif: req.body.p_id_tarif ? Number(req.body.p_id_tarif) : 0,
        p_tgl_mulai: req.body.p_tgl_mulai ? req.body.p_tgl_mulai.trim() : '',
        p_tgl_berakhir: req.body.p_tgl_berakhir
          ? req.body.p_tgl_berakhir.trim()
          : '',
        p_rate: req.body.p_rate ? Number(req.body.p_rate) : 0,
        p_wmm: req.body.p_wmm ? Number(req.body.p_wmm) : 0
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Mulai harus format YYYY-MM-DD'
        }
      },
      p_tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Berakhir harus format YYYY-MM-DD'
        }
      },
      p_rate: {
        presence: true,
        type: {
          type: 'number',
          message: '^Rate Meter Air harus angka'
        }
      },
      p_wmm: {
        presence: true,
        type: {
          type: 'number',
          message: '^WMM harus angka'
        }
      }
    },
    request: 'postTarifAir'
  },
  delTarifAir: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_air: req.body.p_id_tarif_air
          ? Number(req.body.p_id_tarif_air)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_tarif_air: {
        presence: true,
        type: {
          type: 'integer',
          message: '^ID Tarif Fasilitas harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maksimal 100 characters'
        }
      }
    },
    request: 'delTarifAir'
  },
  getTarifFasilitas: {
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
        p_fasilitas: req.query.p_fasilitas
          ? req.query.p_fasilitas.toString().trim().toUpperCase()
          : '',
        p_id: req.query.p_id ? Number(req.query.p_id) : 0,
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
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_fasilitas: {
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      },
      p_id: {
        type: {
          type: 'number',
          message: '^ID Tarif Fasilitas harus angka'
        }
      }
    },
    request: 'getTarifFasilitas'
  },
  postTarifFasilitas: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_fasilitas: req.body.p_fasilitas
          ? req.body.p_fasilitas.toString().trim().toUpperCase()
          : '',
        p_tgl_mulai: req.body.p_tgl_mulai ? req.body.p_tgl_mulai.trim() : '',
        p_tgl_berakhir: req.body.p_tgl_berakhir
          ? req.body.p_tgl_berakhir.trim()
          : '',
        p_tarif: req.body.p_tarif ? Number(req.body.p_tarif) : 0
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_fasilitas: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 2 characters'
        }
      },
      p_tgl_mulai: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Mulai harus format YYYY-MM-DD'
        }
      },
      p_tgl_berakhir: {
        presence: true,
        datetime: {
          dateOnly: true,
          message: '^Tanggal Berakhir harus format YYYY-MM-DD'
        }
      },
      p_tarif: {
        presence: true,
        type: {
          type: 'number',
          message: '^Tarif harus angka'
        }
      }
    },
    request: 'postTarifFasilitas'
  },
  delTarifFasilitas: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_tarif_fasilitas: req.body.p_id_tarif_fasilitas
          ? Number(req.body.p_id_tarif_fasilitas)
          : 0,
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_id_tarif_fasilitas: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Tarif fasilitas harus angka'
        }
      },
      p_keterangan: {
        length: {
          maximum: 100,
          message: '^Keterangan maximum 100 characters'
        }
      }
    },
    request: 'delTarifFasilitas'
  },
  getSettingsGolListrik: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 4,
          message: '^Kode Golongan Listrik maximum 2 characters'
        }
      }
    },
    request: 'getSettingsGolListrik'
  },
  postSettingsGolListrik: {
    params: (req) => {
      console.log('ui', req.body)
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode ? req.body.p_kode.trim() : '',
        p_deskripsi: req.body.p_deskripsi
          ? req.body.p_deskripsi.toString().trim().toUpperCase()
          : '',
        p_daya: req.body.p_daya ? Number(req.body.p_daya) : 0,
        p_aktif: req.body.p_aktif,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 4,
          message: '^Kode Golongan Listrik maximum 2 characters'
        }
      },
      p_deskripsi: {
        presence: true,
        length: {
          maximum: 100,
          message: '^Deskripsi Golongan Listrik maximum 100 characters'
        }
      },
      p_daya: {
        presence: true,
        type: 'integer'
      }
    },
    request: 'postSettingsGolListrik'
  },
  delSettingsGolListrik: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 2,
          message: '^Kode Golongan Listrik maximum 2 characters'
        }
      }
    },
    request: 'delSettingsGolListrik'
  },
  getSettingsGolInvoice: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 4,
          message: '^Kode Golongan Invoice maximum 1 characters'
        }
      }
    },
    request: 'getSettingsGolInvoice'
  },
  postSettingsGolInvoice: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_deskripsi: req.body.p_deskripsi
          ? req.body.p_deskripsi.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 4,
          maximum: 4,
          message: '^Kode Golongan Invoice maximum 1 characters'
        }
      },
      p_deskripsi: {
        presence: true
      }
    },
    request: 'postSettingsGolInvoice'
  },
  delSettingsGolInvoice: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 4,
          maximum: 4,
          message: '^Kode Golongan Invoice maximum 1 characters'
        }
      }
    },
    request: 'delSettingsGolInvoice'
  },
  getSettingsKelompokInvoice: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kelompok: req.query.p_kelompok
          ? req.query.p_kelompok.toString().trim().toUpperCase()
          : '',
        p_golongan: req.query.p_golongan
          ? req.query.p_golongan.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kelompok: {
        length: {
          maximum: 3,
          message: '^Kode Kelompok Invoice maximum 3 characters'
        }
      },
      p_golongan: {
        length: {
          maximum: 1,
          message: '^Kode Golongan Invoice maximum 1 characters'
        }
      }
    },
    request: 'getSettingsKelompokInvoice'
  },
  postSettingsKelompokInvoice: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kelompok: req.body.p_kelompok
          ? req.body.p_kelompok.toString().trim().toUpperCase()
          : '',
        p_golongan: req.body.p_golongan
          ? req.body.p_golongan.toString().trim().toUpperCase()
          : '',
        p_title: req.body.p_title
          ? req.body.p_title.toString().trim().toUpperCase()
          : '',
        p_all_unit: req.body.p_all_unit ? req.body.p_all_unit : true
      }
    },
    rules: {
      p_kelompok: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Kelompok Invoice maximum 3 characters'
        }
      },
      p_golongan: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 1,
          message: '^Kode Golongan maximum 1 characters'
        }
      },
      p_title: {
        length: {
          maximum: 100,
          message: '^Title Kelompok maximum 100 characters'
        }
      }
    },
    request: 'postSettingsKelompokInvoice'
  },
  delSettingsKelompokInvoice: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 3,
          message: '^Kode Kelompok Invoice maximum 3 characters'
        }
      }
    },
    request: 'delSettingsKelompokInvoice'
  },
  getSettingsFasilitas: {
    params: (req) => {
      return {
        p_kode: req.query.p_kode
          ? req.query.p_kode.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_kode: {
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      }
    },
    request: 'getSettingsFasilitas'
  },
  postSettingsFasilitas: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : '',
        p_nama: req.body.p_nama
          ? req.body.p_nama.toString().trim().toUpperCase()
          : '',
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      },
      p_nama: {
        presence: true,
        length: {
          maximum: 100,
          message: '^Nama Fasilitas maximum 100 characters'
        }
      },
      p_keterangan: {
        length: {
          maximum: 300,
          message: '^Keterangan maximum 100 characters'
        }
      }
    },
    request: 'postSettingsFasilitas'
  },
  delSettingsFasilitas: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_kode: req.body.p_kode
          ? req.body.p_kode.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_kode: {
        presence: true,
        length: {
          maximum: 3,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      }
    },
    request: 'delSettingsFasilitas'
  },
  getSettingsFasilitasRusun: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : '',
        p_fasilitas: req.query.p_fasilitas
          ? req.query.p_fasilitas.toString().trim().toUpperCase()
          : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null
      }
    },
    rules: {
      p_rusun: {
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_fasilitas: {
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      }
    },
    request: 'getSettingsFasilitasRusun'
  },
  postSettingsFasilitasRusun: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_id_fasilitas_rusun: req.body.p_id_fasilitas_rusun
          ? Number(req.body.p_id_fasilitas_rusun)
          : null,
        p_rusun: req.body.p_rusun
          ? req.body.p_rusun.toString().trim().toUpperCase()
          : '',
        p_fasilitas: req.body.p_fasilitas
          ? req.body.p_fasilitas.toString().trim().toUpperCase()
          : '',
        p_keterangan: req.body.p_keterangan
          ? req.body.p_keterangan.toString().trim().toUpperCase()
          : '',
        p_aktif: req.body.p_aktif ? req.body.p_aktif : null,
        p_act: req.body.p_act ? req.body.p_act : null
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      },
      p_fasilitas: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Fasilitas maximum 5 characters'
        }
      },
      p_keterangan: {
        length: {
          maximum: 300,
          message: '^Keterangan maximum 100 characters'
        }
      }
    },
    request: 'postSettingsFasilitasRusun'
  }
}

exports.methodGet = {
  '010000000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifLantai), // settings/tarif/lantai
  '010000001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifLantaiLastPeriod), // settings/tarif/lantai-last-period
  '010001000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getTarifUnit), // settings/tarif/unit
  '010001001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifUnitLastPeriod), // settings/tarif/unit-last-period
  '010002000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifListrik), // settings/tarif/listrik
  '010002001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifListrikLastPeriod), // settings/tarif/listrik-last-period
  '010003000': (req, res) => apiReqNew.getData(req, res, reqCtrl.getTarifAir), // settings/tarif/air
  '010003001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifAirLastPeriod), // settings/tarif/air-last-period
  '010004000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getTarifFasilitas), // settings/tarif/fasilitas
  '010010000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsKantor), // settings/kantor
  '010011000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsRusun), // settings/rusun
  '010012000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsBlok), // settings/blok
  '010013000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsLantai), // settings/lantai
  '010014000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsUnitJenis), // settings/unit-jenis
  '010015000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsUnit), // settings/unit
  '010016000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsFasilitas), // settings/fasilitas
  '010017000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsFasilitasRusun), // settings/fasilitas-rusun
  '010018000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsGolListrik), // settings/golongan-listrik
  '010020000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsAgama), // settings/agama
  '010021000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsJenisKendaraan), // settings/jenis-kendaraan
  '010022000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsJenisNik), // settings/jenis-nik
  '010023000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsStatusPekerjaan), // settings/status-pekerjaan
  '010024000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsTipeOut), // settings/tipe-out
  '010030000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsPengguna) // settings/pengguna
  /*
  'settings/jenis-kelamin': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsJenisKelamin),
  'settings/blok-exclude': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsBlokExclude),
  'settings/pengguna/role': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsPenggunaRole),
  'settings/golongan-invoice': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsGolInvoice),
  'settings/kelompok-invoice': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getSettingsKelompokInvoice)
    */
}

exports.methodPost = {
  '010000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postTarifLantai), // settings/tarif/lantai
  '010001000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postTarifUnit), // settings/tarif/unit
  '010002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postTarifListrik), // settings/tarif/listrik
  '010003000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postTarifAir), // settings/tarif/air
  '010004000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postTarifFasilitas), // settings/tarif/fasilitas
  '010010000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsKantor), // settings/kantor
  '010011000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsRusun), // settings/rusun
  '010012000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsBlok), // settings/blok
  '010013000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsLantai), // settings/lantai
  '010014000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsUnitJenis), // settings/unit-jenis
  '010015000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsUnit), // settings/unit
  '010016000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsFasilitas), // settings/fasilitas
  '010017000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsFasilitasRusun), // settings/fasilitas-rusun
  '010018000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsGolListrik), // settings/golongan-listrik
  '010020000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsAgama), // settings/agama
  '010021000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsJeniKendaraan), // settings/jenis-kendaraan
  '010022000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsJenisNik), // settings/jenis-nik
  '010023000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsStatusPekerjaan), // settings/status-pekerjaan
  '010024000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsTipeOut), // settings/tipe-out
  '010030000': (req, res) => {
    let pPassword = ''
    if (req.body.p_kode) {
      req.body.p_password = null
      pPassword = null
    } else {
      pPassword = makePassword(8)
      const hashPassword = bcrypt.hashSync(pPassword)
      req.body.p_password = hashPassword
    }
    return apiReqNew.callFunction(req, res, reqCtrl.postSettingsPengguna, {
      randomPass: pPassword
    })
  } // settings/pengguna
  /*
  'settings/jenis-kelamin': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsJenisKelamin),
  'settings/blok-exclude': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsBlokExclude),
  'settings/golongan-invoice': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsGolInvoice),
  'settings/kelompok-invoice': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postSettingsKelompokInvoice)
    */
}

exports.methodPut = {
  '010000002': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putTarifLantaiApprove), // settings/tarif/lantai/approve
  '010001002': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putTarifUnitApprove), // settings/tarif/unit/approve
  '010030001': (req, res) => {
    const pPassword = makePassword(8)
    const hashPassword = bcrypt.hashSync(pPassword)
    req.body.p_password = hashPassword
    return apiReqNew.callFunction(
      req,
      res,
      reqCtrl.putSettingsPenggunaResetPassword,
      { randomPass: pPassword }
    )
  }, // settings/pengguna/reset-pass
  '010030002': async(req, res) => {
    const data = await apiReqNew.callFunctionRaw('getInfoPengguna', [
      req.body.p_kode ? req.body.p_kode.trim() : ''
    ])
    if (data.ret !== 0) {
      res.status(200).json({ ret: -1, msg: 'User tidak ditemukan' })
      return
    } else if (data.data.kode_pengguna) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.p_password_old ? req.body.p_password_old : '',
        data.data.password_pengguna
      )
      if (!passwordIsValid) {
        res.status(200).json({ ret: -1, msg: 'Password salah' })
        return
      } else {
        return apiReqNew.callFunction(
          req,
          res,
          reqCtrl.putSettingsPenggunaChangePassword
        )
      }
    } else {
      res.status(200).json({ ret: -1, msg: 'User tidak ditemukan' })
      return
    }
  } // settings/pengguna/change-pass
  /*
  'settings/pengguna': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putSettingsPengguna)
  'settings/blok-exclude': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.putSettingsBlokExclude),
  */
}

exports.methodDel = {
  '010000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delTarifLantai), // settings/tarif/lantai
  '010001000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delTarifUnit), // settings/tarif/unit
  '010002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delTarifListrik), // settings/tarif/listrik
  '010003000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delTarifAir), // settings/tarif/air
  '010004000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delTarifFasilitas) // settings/tarif/fasilitas
  /*
  'settings/agama': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsAgama),
  'settings/jenis-kelamin': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsJenisKelamin),
  'settings/jenis-kendaraan': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsJenisKendaraan),
  'settings/status-pekerjaan': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsStatusPekerjaan),
  'settings/jenis-nik': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsJenisNik),
  'settings/tipe-out': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsTipeOut),
  'settings/kantor': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsKantor),
  'settings/rusun': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsRusun),
  'settings/lantai': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsLantai),
  'settings/unit-jenis': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsUnitJenis),
  'settings/unit': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsUnit),
  'settings/blok': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsBlok),
  'settings/golongan-listrik': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsGolListrik),
  'settings/blok-exclude': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsBlokExclude),
  'settings/golongan-invoice': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsGolInvoice),
  'settings/kelompok-invoice': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsKelompokInvoice),
  'settings/fasilitas': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delSettingsFasilitas)
    */
}

function makePassword(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
