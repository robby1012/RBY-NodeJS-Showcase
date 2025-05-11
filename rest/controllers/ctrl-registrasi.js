const apiReq = require('./api-caller')
const apiReqNew = require('./api-caller-new')
const { cekNpp, cekPeserta } = require('../api/cek-aktif-peserta')

const reqCtrl = {
  postRegistrasiIndividu: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun ? req.body.p_rusun : null,
        p_no_registrasi: req.body.p_no_registrasi
          ? req.body.p_no_registrasi
          : null,
        p_kode_segmen: req.body.p_kode_segmen ? req.body.p_kode_segmen : null,
        p_kpj: req.body.p_kpj ? req.body.p_kpj : null,
        p_nik: req.body.p_nik ? req.body.p_nik : null,
        p_kode_unit_jenis: req.body.p_kode_unit_jenis
          ? req.body.p_kode_unit_jenis
          : null,
        p_tgl_req_menghuni: req.body.p_tgl_req_menghuni
          ? req.body.p_tgl_req_menghuni
          : null,
        p_jangka_waktu: req.body.p_jangka_waktu
          ? req.body.p_jangka_waktu
          : null,
        p_jmlh_unit: req.body.p_jmlh_unit ? req.body.p_jmlh_unit : null,
        p_hunian_keluarga: req.body.p_hunian_keluarga
          ? req.body.p_hunian_keluarga
          : false,
        p_nama: req.body.p_nama ? req.body.p_nama.trim().toUpperCase() : null,
        p_kode_jenis_kelamin: req.body.p_kode_jenis_kelamin
          ? req.body.p_kode_jenis_kelamin
          : null,
        p_telpon: req.body.p_telpon ? req.body.p_telpon : null,
        p_email: req.body.p_email
          ? req.body.p_email.trim().toUpperCase()
          : null,
        p_id_profil: req.body.p_id_profil ? req.body.p_id_profil : null,
        p_id_unit: req.body.p_id_unit ? req.body.p_id_unit : null,
        p_alamat: req.body.p_alamat
          ? req.body.p_alamat.trim().toUpperCase()
          : null
      }
    },
    rules: {
      p_rusun: {
        presence: true,
        length: {
          maximum: 5,
          message: '^Kode Rusun maximum 5 characters'
        }
      }
    },
    request: 'postRegistrasiIndividu'
  },
  postRegistrasiPerusahaan: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_rusun: req.body.p_rusun ? req.body.p_rusun : null,
        p_no_registrasi: req.body.p_no_registrasi
          ? req.body.p_no_registrasi
          : null,
        p_npp: req.body.p_npp ? req.body.p_npp : null,
        p_kode_unit_jenis: req.body.p_kode_unit_jenis
          ? req.body.p_kode_unit_jenis
          : null,
        p_tgl_req_menghuni: req.body.p_tgl_req_menghuni
          ? req.body.p_tgl_req_menghuni
          : null,
        p_jangka_waktu: req.body.p_jangka_waktu
          ? req.body.p_jangka_waktu
          : null,
        p_jmlh_unit: req.body.p_jmlh_unit ? req.body.p_jmlh_unit : null,
        p_hunian_keluarga: req.body.p_hunian_keluarga
          ? req.body.p_hunian_keluarga
          : false,
        p_prs_nama: req.body.p_prs_nama
          ? req.body.p_prs_nama.trim().toUpperCase()
          : null,
        p_prs_depatermen: req.body.p_prs_depatermen
          ? req.body.p_prs_depatermen.trim().toUpperCase()
          : null,
        p_prs_telp: req.body.p_prs_telp
          ? req.body.p_prs_telp.trim().toUpperCase()
          : null,
        p_prs_alamat: req.body.p_prs_alamat
          ? req.body.p_prs_alamat.trim().toUpperCase()
          : null,
        p_prs_email: req.body.p_prs_email
          ? req.body.p_prs_email.trim().toUpperCase()
          : null,
        p_pic_nik: req.body.p_pic_nik
          ? req.body.p_pic_nik.trim().toUpperCase()
          : null,
        p_pic_nama: req.body.p_pic_nama
          ? req.body.p_pic_nama.trim().toUpperCase()
          : null,
        p_pic_telp: req.body.p_pic_telp
          ? req.body.p_pic_telp.trim().toUpperCase()
          : null,
        p_pic_email: req.body.p_pic_email
          ? req.body.p_pic_email.trim().toUpperCase()
          : null,
        p_data_units: req.body.p_data_units ? req.body.p_data_units : []
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
      p_data_units: {
        array: {
          id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID Unit Required'
            }
          }
        }
      }
    },
    request: 'postRegistrasiPerusahaan'
  },
  getRegistrasiInfo: {
    params: (req) => {
      return {
        p_no_registrasi: req.query.p_no_registrasi
          ? req.query.p_no_registrasi
          : null
      }
    },
    rules: {
      p_no_registrasi: {
        presence: true,
        length: {
          maximum: 50,
          message: '^No Registrasi harus ada'
        }
      }
    },
    request: 'getRegistrasiInfo'
  },
  getRegistrasiCariTenantIndividu: {
    params: (req) => {
      return {
        p_kpj: req.query.p_kpj ? req.query.p_kpj : null,
        p_nik: req.query.p_nik ? req.query.p_nik : null
      }
    },
    rules: {},
    request: 'getRegistrasiCariTenantIndividu'
  },
  getRegistrasiCariTenantPerusahaan: {
    params: (req) => {
      return {
        p_npp: req.query.p_npp ? req.query.p_npp : null
      }
    },
    rules: {},
    request: 'getRegistrasiCariTenantPerusahaan'
  },
  getRegistrasiPenghuniProfil: {
    params: (req) => {
      return {
        p_id_reg_penghuni: req.query.p_id_reg_penghuni
          ? req.query.p_id_reg_penghuni
          : null
      }
    },
    rules: {
      p_id_reg_penghuni: {
        presence: true
      }
    },
    request: 'getRegistrasiPenghuniProfil'
  },
  postRegistrasi: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        data_reg: req.body.data_reg ? req.body.data_reg : {},
        data_units: req.body.data_units ? req.body.data_units : []
      }
    },
    rules: {
      data_reg: {
        presence: true,
        object: {
          no: {
            length: {
              maximum: 50,
              message: '^No Registrasi maximum 50 characters'
            }
          },
          jenis: {
            presence: true,
            length: {
              maximum: 4,
              message: '^Jenis Registrasi maximum 1 characters'
            }
          },
          kpj: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 50,
              message: '^KPJ maximum 50 characters'
            }
          },
          jenisKelamin: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 1,
              message: '^Jenis Kelamin maximum 1 characters'
            }
          },
          nama: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 100,
              message: '^Nama Peserta maximum 100 characters'
            }
          },
          telp: {
            length: {
              maximum: 50,
              message: '^Telp maximum 50 character'
            }
          },
          mail: {
            length: {
              maximum: 255,
              message: '^Email maximum 255 character'
            }
          },
          npp: {
            length: {
              maximum: 50,
              message: '^NPP maximum 50 characters'
            }
          },
          namaPrs: {
            length: {
              maximum: 100,
              message: '^Nama Perusahaan maximum 100 characters'
            }
          },
          departemenPrs: {
            length: {
              maximum: 100,
              message: '^Departemen maximum 100 character'
            }
          },
          alamatPrs: {
            length: {
              maximum: 200,
              message: '^Alamat Perusahaan maximum 200 character'
            }
          },
          telpPrs: {
            length: {
              maximum: 50,
              message: '^Telpon Perusahaan maximum 50 character'
            }
          },
          picPrs: {
            length: {
              maximum: 100,
              message: '^PIC Perusahaan maximum 100 character'
            }
          },
          mailPrs: {
            length: {
              maximum: 255,
              message: '^Email Perusahaan maximum 255 character'
            }
          },
          rusun: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 5,
              message: '^Kode Rusun maximum 5 characters'
            }
          },
          jenisUnit: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 5,
              message: '^Kode JEnis Unit maximum 5 characters'
            }
          },
          jumlahUnit: {
            presence: true,
            type: {
              type: 'number',
              message: '^Jumlah unit harus angka'
            }
          },
          tglReq: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: '^Tgl Request date format YYYY-MM-DD'
            }
          },
          jangkaWaktu: {
            presence: true,
            type: {
              type: 'number',
              message: '^Jangka waktu dalam bulan harus angka'
            }
          },
          blok: {
            length: {
              maximum: 4,
              message: '^Kode Blok maximum 5 character'
            }
          }
        }
      },
      data_units: {
        array: {
          id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID Unit Required'
            }
          }
        }
      }
    },
    request: 'postRegistrasi'
  },
  postRegistrasiPenghuniSave: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_kode_rusun: req.body.p_kode_rusun
          ? req.body.p_kode_rusun.toString().trim().toUpperCase()
          : null,
        p_id_kontrak_sewa: req.body.p_id_kontrak_sewa
          ? req.body.p_id_kontrak_sewa.toString().trim().toUpperCase()
          : null,
        p_no_registrasi: req.body.p_no_registrasi
          ? req.body.p_no_registrasi.toString().trim().toUpperCase()
          : null,
        p_id_registrasi_penghuni: req.body.p_id_registrasi_penghuni
          ? req.body.p_id_registrasi_penghuni
          : null,
        p_id_profil_penghuni: req.body.p_id_profil_penghuni
          ? req.body.p_id_profil_penghuni
          : null,
        p_kpj: req.body.p_kpj
          ? req.body.p_kpj.toString().trim().toUpperCase()
          : null,
        p_kpj_nama: req.body.p_kpj_nama
          ? req.body.p_kpj_nama.toString().trim().toUpperCase()
          : null,
        p_nik: req.body.p_nik
          ? req.body.p_nik.toString().trim().toUpperCase()
          : null,
        p_nik_jenis: req.body.p_nik_jenis
          ? req.body.p_nik_jenis.toString().trim().toUpperCase()
          : null,
        p_id_unit: req.body.p_id_unit ? req.body.p_id_unit : null,
        p_tgl_in: req.body.p_tgl_in ? req.body.p_tgl_in : null,
        p_tgl_out: req.body.p_tgl_out ? req.body.p_tgl_out : null,
        p_tempat_lahir: req.body.p_tempat_lahir
          ? req.body.p_tempat_lahir.toString().trim().toUpperCase()
          : null,
        p_tgl_lahir: req.body.p_tgl_lahir ? req.body.p_tgl_lahir : null,
        p_jenis_kelamin: req.body.p_jenis_kelamin
          ? req.body.p_jenis_kelamin.toString().trim().toUpperCase()
          : null,
        p_nik_alamat: req.body.p_nik_alamat
          ? req.body.p_nik_alamat.toString().trim().toUpperCase()
          : null,
        p_anak_ke: req.body.p_anak_ke ? req.body.p_anak_ke : null,
        p_jmlh_saudara: req.body.p_jmlh_saudara
          ? req.body.p_jmlh_saudara
          : null,
        p_hoby: req.body.p_hoby
          ? req.body.p_hoby.toString().trim().toUpperCase()
          : null,
        p_gaji_perbulan: req.body.p_gaji_perbulan
          ? req.body.p_gaji_perbulan
          : null,
        p_kode_agama: req.body.p_kode_agama
          ? req.body.p_kode_agama.toString().trim().toUpperCase()
          : null,
        p_suku_provinsi: req.body.p_suku_provinsi
          ? req.body.p_suku_provinsi.toString().trim().toUpperCase()
          : null,
        p_kode_jenis_kendaraan: req.body.p_kode_jenis_kendaraan
          ? req.body.p_kode_jenis_kendaraan.toString().trim().toUpperCase()
          : null,
        p_no_kendaraan: req.body.p_no_kendaraan
          ? req.body.p_no_kendaraan.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_nama_prs: req.body.p_pekerjaan_nama_prs
          ? req.body.p_pekerjaan_nama_prs.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_alamat_prs: req.body.p_pekerjaan_alamat_prs
          ? req.body.p_pekerjaan_alamat_prs.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_telp: req.body.p_pekerjaan_telp
          ? req.body.p_pekerjaan_telp.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_fax: req.body.p_pekerjaan_fax
          ? req.body.p_pekerjaan_fax.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_status: req.body.p_pekerjaan_status
          ? req.body.p_pekerjaan_status.toString().trim().toUpperCase()
          : null,
        p_pekerjaan_masakerja_bln: req.body.p_pekerjaan_masakerja_bln
          ? req.body.p_pekerjaan_masakerja_bln
          : null,
        p_pekerjaan_atasan_langsung: req.body.p_pekerjaan_atasan_langsung
          ? req.body.p_pekerjaan_atasan_langsung.toString().trim().toUpperCase()
          : null,
        p_keluarga_ayah: req.body.p_keluarga_ayah
          ? req.body.p_keluarga_ayah.toString().trim().toUpperCase()
          : null,
        p_keluarga_ayah_status: req.body.p_keluarga_ayah_status
          ? req.body.p_keluarga_ayah_status.toString().trim().toUpperCase()
          : null,
        p_keluarga_ibu: req.body.p_keluarga_ibu
          ? req.body.p_keluarga_ibu.toString().trim().toUpperCase()
          : null,
        p_keluarga_ibu_status: req.body.p_keluarga_ibu_status
          ? req.body.p_keluarga_ibu_status.toString().trim().toUpperCase()
          : null,
        p_keluarga_alamat: req.body.p_keluarga_alamat
          ? req.body.p_keluarga_alamat.toString().trim().toUpperCase()
          : null,
        p_keluarga_telp: req.body.p_keluarga_telp
          ? req.body.p_keluarga_telp.toString().trim().toUpperCase()
          : null,
        p_darurat_nama: req.body.p_darurat_nama
          ? req.body.p_darurat_nama.toString().trim().toUpperCase()
          : null,
        p_darurat_hubungan: req.body.p_darurat_hubungan
          ? req.body.p_darurat_hubungan.toString().trim().toUpperCase()
          : null,
        p_darurat_alamat: req.body.p_darurat_alamat
          ? req.body.p_darurat_alamat.toString().trim().toUpperCase()
          : null,
        p_darurat_telp: req.body.p_darurat_telp
          ? req.body.p_darurat_telp.toString().trim().toUpperCase()
          : null,
        p_kode_status_nikah: req.body.p_kode_status_nikah
          ? req.body.p_kode_status_nikah.toString().trim().toUpperCase()
          : null,
        p_kode_segmen: req.body.p_kode_segmen ? req.body.p_kode_segmen : null,
        p_penanggung_jawab: req.body.p_penanggung_jawab
          ? req.body.p_penanggung_jawab
          : false
      }
    },
    rules: {},
    request: 'postRegistrasiPenghuniSave'
  },
  postRegistrasiPenghuniDelete: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_id_registrasi_penghuni: req.body.p_id_registrasi_penghuni
          ? req.body.p_id_registrasi_penghuni
          : null
      }
    },
    rules: {},
    request: 'postRegistrasiPenghuniDelete'
  },
  getRegistrasi: {
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
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : '',
        p_bukan_wl: req.query.p_bukan_wl ? req.query.p_bukan_wl : null,
        p_status: req.query.p_status ? req.query.p_status.trim() : '',
        p_aktif: req.query.p_aktif ? req.query.p_aktif : null,
        p_id_blok: req.query.p_id_blok ? req.query.p_id_blok : null,
        p_id_lantai: req.query.p_id_lantai ? req.query.p_id_lantai : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_jenis: req.query.p_jenis
          ? req.query.p_jenis.toString().trim().toUpperCase()
          : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getRegistrasi'
  },
  postRegistrasiKontrak: {
    params: (req) => {
      return {
        p_kode_pengguna: req.jid,
        p_no_registrasi: req.body.p_no_registrasi
          ? req.body.p_no_registrasi.toString().trim().toUpperCase()
          : null,
        p_pihak1_nama: req.body.p_pihak1_nama
          ? req.body.p_pihak1_nama.toString().trim().toUpperCase()
          : null,
        p_pihak1_jabatan: req.body.p_pihak1_jabatan
          ? req.body.p_pihak1_jabatan.toString().trim().toUpperCase()
          : null,
        p_pihak1_ttd_title: req.body.p_pihak1_ttd_title
          ? req.body.p_pihak1_ttd_title.toString().trim().toUpperCase()
          : null,
        p_pihak2_nama: req.body.p_pihak2_nama
          ? req.body.p_pihak2_nama.toString().trim().toUpperCase()
          : null,
        p_pihak2_jabatan: req.body.p_pihak2_jabatan
          ? req.body.p_pihak2_jabatan.toString().trim().toUpperCase()
          : null,
        p_pihak2_perusahaan: req.body.p_pihak2_perusahaan
          ? req.body.p_pihak2_perusahaan.toString().trim().toUpperCase()
          : null,
        p_pihak2_ttd_nama: req.body.p_pihak2_ttd_nama
          ? req.body.p_pihak2_ttd_nama.toString().trim().toUpperCase()
          : null,
        p_pihak2_ttd_jabatan: req.body.p_pihak2_ttd_jabatan
          ? req.body.p_pihak2_ttd_jabatan.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {},
    request: 'postRegistrasiKontrak'
  },
  delRegistrasi: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_noreg: req.body.p_noreg
          ? req.body.p_noreg.toString().trim().toUpperCase()
          : '',
        p_alasan: req.body.p_alasan
          ? req.body.p_alasan.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_noreg: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No Registrasi maximum 50 characters'
        }
      }
    },
    request: 'delRegistrasiCancel'
  },
  getRegistrasiUnit: {
    params: (req) => {
      return {
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_blok ? Number(req.query.p_blok) : null
      }
    },
    rules: {
      p_no: {
        presence: true,
        length: {
          maximum: 50,
          message: '^No Regsitrasi maximum 50 characters'
        }
      },
      p_blok: {
        length: {
          maximum: 5,
          message: '^Kode Blok maximum 5 characters'
        }
      }
    },
    request: 'getRegistrasiUnit'
  },
  getRegistrasiUnitChoose: {
    params: (req) => {
      return {
        p_rusun: req.query.p_rusun
          ? req.query.p_rusun.toString().trim().toUpperCase()
          : null,
        p_id_blok: req.query.p_id_blok ? Number(req.query.p_id_blok) : null,
        p_id_lantai: req.query.p_id_lantai
          ? Number(req.query.p_id_lantai)
          : null,
        p_jenis_unit: req.query.p_jenis_unit
          ? req.query.p_jenis_unit.toString().trim().toUpperCase()
          : null
      }
    },
    rules: {
      p_rusun: {
        presence: true
      }
    },
    request: 'getRegistrasiUnitChoose'
  },
  postRegistrasiPenghuni: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_noreg: req.body.p_noreg
          ? req.body.p_noreg.toString().trim().toUpperCase()
          : '',
        data_penghunis: req.body.data_penghunis ? req.body.data_penghunis : [],
        data_profils: req.body.data_profils ? req.body.data_profils : []
      }
    },
    rules: {
      p_noreg: {
        presence: true,
        length: {
          maximum: 50,
          message: '^No Registrasi maximum 50 characters'
        }
      },
      data_penghunis: {
        presence: true,
        array: {
          id_unit: {
            presence: true,
            type: {
              type: 'number',
              message: '^ID Unit harus angka'
            }
          },
          kpj: {
            length: {
              maximum: 50,
              message: '^KPJ maximum 50 characters dan harus ada'
            }
          },
          kpj_nama: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 100,
              message: '^Nama KPJ maximum 100 characters dan harus ada'
            }
          },
          jenis_kelamin: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 1,
              message: '^Jenis Kelamin harus ada'
            }
          },
          nik: {
            length: {
              maximum: 50,
              message: '^NIK Maximum 50 characters'
            }
          },
          nik_jenis: {
            length: {
              maximum: 10,
              message: '^Jenis NIK Maximum 10 characters'
            }
          }
        }
      },
      data_profils: {
        presence: true,
        array: {
          kpj: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters dan harus ada'
            }
          },
          kpjNama: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 100,
              message: 'maximum 100 characters dan harus ada'
            }
          },
          tempatLahir: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 75,
              message: 'maximum 75 characters dan harus ada'
            }
          },
          tglLahir: {
            presence: true,
            datetime: {
              dateOnly: true,
              message: 'date format YYYY-MM DD'
            }
          },
          jenisKelamin: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 1,
              message: 'maximum 1 characters dan harus ada'
            }
          },
          nik: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 50,
              message: 'maximum 50 characters dan harus ada'
            }
          },
          nikJenis: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 10,
              message: 'maximum 10 characters dan harus ada'
            }
          },
          nikAlamat: {
            length: {
              maximum: 150,
              message: 'maximum 150 characters '
            }
          },
          // anakKe: {
          //   type: {
          //     type: 'number',
          //     message: 'Harus angka'
          //   }
          // },
          // nSaudara: {
          //   type: {
          //     type: 'number',
          //     message: 'Harus angka'
          //   }
          // },
          hobby: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters '
            }
          },
          // prsGaji: {
          //   type: {
          //     type: 'number',
          //     message: 'Harus angka'
          //   }
          // },
          agama: {
            presence: true,
            length: {
              minimum: 1,
              maximum: 10,
              message: 'maximum 10 characters dan harus ada'
            }
          },
          suku: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters'
            }
          },
          jenisKendaraan: {
            length: {
              maximum: 3,
              message: 'maximum 3 characters'
            }
          },
          noKendaraan: {
            length: {
              maximum: 30,
              message: 'maximum 30 characters'
            }
          },
          prsName: {
            length: {
              maximum: 75,
              message: 'maximum 75 characters'
            }
          },
          prsAlamat: {
            length: {
              maximum: 150,
              message: 'maximum 150 characters'
            }
          },
          prsTelp: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters'
            }
          },
          prsFax: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters'
            }
          },
          prsStatusKerja: {
            length: {
              maximum: 3,
              message: 'maximum 3 characters'
            }
          },
          // prsMasaKerja: {
          //   type: {
          //     type: 'number',
          //     message: 'Harus angka'
          //   }
          // },
          prsAtasan: {
            length: {
              maximum: 100,
              message: 'maximum 100 characters'
            }
          },
          ayahNama: {
            length: {
              maximum: 100,
              message: 'maximum 100 characters'
            }
          },
          ayahStatus: {
            length: {
              maximum: 1,
              message: 'maximum 1 characters'
            }
          },
          ibuName: {
            length: {
              maximum: 100,
              message: 'maximum 100 characters'
            }
          },
          ibuStatus: {
            length: {
              maximum: 1,
              message: 'maximum 1 characters'
            }
          },
          ayahAlamat: {
            length: {
              maximum: 150,
              message: '^Alamat Keluarga maximum 150 characters'
            }
          },
          ayahTelp: {
            length: {
              maximum: 50,
              message: '^Telp Keluarga maximum 50 characters'
            }
          },
          daruratNama: {
            length: {
              maximum: 100,
              message: 'maximum 100 characters'
            }
          },
          daruratHubungan: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters'
            }
          },
          daruratAlamat: {
            length: {
              maximum: 150,
              message: 'maximum 150 characters'
            }
          },
          daruratTelp: {
            length: {
              maximum: 50,
              message: 'maximum 50 characters'
            }
          }
        }
      }
    },
    request: 'postRegistrasiPenghuni'
  },
  getRegistrasiLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_noreg: req.query.p_noreg
          ? req.query.p_noreg.toString().trim().toUpperCase()
          : '',
        p_dokumen: req.query.p_dokumen
          ? req.query.p_dokumen.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_noreg: { required: true },
      p_dokumen: { required: true }
    },
    request: 'getRegistrasiLampiran'
  },
  postRegistrasiLampiran: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_noreg: req.body.p_noreg
          ? req.body.p_noreg.toString().trim().toUpperCase()
          : '',
        p_dokumen: req.body.p_dokumen
          ? req.body.p_dokumen.toString().trim().toUpperCase()
          : '',
        p_path: req.body.p_path ? req.body.p_path.trim() : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_noreg: { required: true },
      p_dokumen: { required: true },
      p_path: { required: true }
    },
    request: 'postRegistrasiLampiran'
  },
  getRegistrasiPenghuni: {
    params: (req) => {
      return {
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no: {
        presence: true,
        length: {
          maximum: 50,
          message: '^No Regsitrasi maximum 50 characters'
        }
      }
    },
    request: 'getRegistrasiPenghuni'
  },
  getRegistrasiStatus: {
    params: (req) => {
      return {
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no: { required: true }
    },
    request: 'getRegistrasiStatus'
  },
  getRegistrasiKontrak: {
    params: (req) => {
      return {
        p_no: req.query.p_no
          ? req.query.p_no.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_no: { required: true }
    },
    request: 'getRegistrasiKontrak'
  },
  getRegistrasiWL: {
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
        p_no_reg: req.query.p_no_reg
          ? req.query.p_no_reg.toString().trim().toUpperCase()
          : '',
        // p_id_blok: req.query.p_id_blok ? req.query.p_id_blok : null,
        // p_id_lantai: req.query.p_id_lantai ? req.query.p_id_lantai : null,
        // p_id_unit: req.query.p_id_unit ? req.query.p_id_unit : null,
        p_search: req.query.p_search
          ? req.query.p_search.toString().trim().toUpperCase()
          : '',
        p_status: req.query.p_status
          ? req.query.p_status.toString().trim().toUpperCase()
          : '',
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        sortDesc: sortDesc
      }
    },
    rules: {
      p_rusun: { required: true }
    },
    request: 'getRegistrasiWL'
  },
  delRegistrasiWL: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        p_no_registrasi: req.body.p_no_registrasi
          ? req.body.p_no_registrasi.toString().trim().toUpperCase()
          : '',
        p_by_tgl_req_menghuni: req.body.p_by_tgl_req_menghuni
          ? req.body.p_by_tgl_req_menghuni
          : null
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_no_registrasi: { required: true }
    },
    request: 'delRegistrasiWL'
  },
  resetRegistrasiWL: {
    params: (req) => {
      return {
        p_pengguna: req.jid,
        // p_id_registrasi_unit: req.body.p_id_registrasi_unit
        //   ? req.body.p_id_registrasi_unit
        //   : 0
        p_kode_rusun: req.body.p_kode_rusun
          ? req.body.p_kode_rusun.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_pengguna: { required: true },
      p_kode_rusun: { required: true }
    },
    request: 'resetRegistrasiWL'
  },
  getRegistrasiAvailableStep: {
    params: (req) => {
      return {
        p_noreg: req.query.p_noreg
          ? req.query.p_noreg.toString().trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_noreg: { required: true }
    },
    request: 'getRegistrasiAvailableStep'
  },
  getRegistrasiCekUnit: {
    params: (req) => {
      return {
        p_noreg: req.query.p_noreg
          ? req.query.p_noreg.toString().trim().toUpperCase()
          : '',
        p_id_unit: req.query.p_id_unit ? Number(req.query.p_id_unit) : null
      }
    },
    rules: {
      p_noreg: {
        presence: true,
        length: {
          minimum: 1,
          maximum: 50,
          message: '^No registrasi maximum 50 character'
        }
      },
      p_id_unit: {
        presence: true,
        type: {
          type: 'number',
          message: '^ID Unit harus Angka'
        }
      }
    },
    request: 'getRegistrasiCekUnit'
  },
  getRegistrasiCekKPJ: {
    params: (req) => {
      return {
        p_kpj: req.query.p_kpj ? req.query.p_kpj.trim() : ''
      }
    },
    rules: {
      p_kpj: {
        presence: true
      }
    },
    request: 'getRegistrasiCekUnit'
  },
  getRegistrasiCariTenant: {
    params: (req) => {
      return {
        p_jenis_registrasi: req.query.p_jenis_registrasi
          ? req.query.p_jenis_registrasi.trim()
          : '',
        p_search_by: req.query.p_search_by ? req.query.p_search_by : '',
        p_search: req.query.p_search
          ? req.query.p_search.trim().toUpperCase()
          : ''
      }
    },
    rules: {
      p_jenis_registrasi: {
        presence: true
      }
    },
    request: 'getRegistrasiCariTenant'
  },
  getRegistrasiCekTenantIndividu: {
    params: (req) => {
      return {
        p_kpj: req.query.p_kpj ? req.query.p_kpj.trim() : '',
        p_nik: req.query.p_nik ? req.query.p_nik : ''
      }
    },
    rules: {},
    request: 'getRegistrasiCekTenantIndividu'
  }
}

exports.methodGet = {
  '002000000': (req, res) => apiReq.getData(req, res, reqCtrl.getRegistrasi), // tenant/registrasi
  '002000003': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiInfo), // tenant/registrasi/info
  '002004003': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiCekTenantIndividu), // tenant/registrasi/cek-tenant
  '002004001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiCariTenant), // tenant/registrasi/cari-tenant
  '002002000': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiPenghuniProfil), // tenant/registrasi/penghuni-profil
  '002002001': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiPenghuni), // tenant/registrasi/penghuni

  '002000005': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiUnitChoose), // tenant/registrasi/unit-choose
  '002001000': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRegistrasiLampiran, 'path_dokumen'), // tenant/registrasi/lampiran
  '002000004': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRegistrasiKontrak), // tenant/registrasi/kontrak
  '002003000': (req, res) => apiReq.getData(req, res, reqCtrl.getRegistrasiWL), // tenant/registrasi/waiting-list
  '002004002': async (req, res) => {
    const p_npp = req.query.p_npp ? req.query.p_npp.trim() : ''
    const rslt = await cekNpp(p_npp)

    console.log('rslt', rslt)
    res.status(200).json(rslt)
  }, // tenant/registrasi/cek-npp
  '002004004': async (req, res) => {
    const p_segmen = req.query.p_segmen ? req.query.p_segmen.trim() : ''
    const p_kpj = req.query.p_kpj ? req.query.p_kpj.trim() : ''
    const p_nik = req.query.p_nik ? req.query.p_nik.trim() : ''
    const rslt = await cekPeserta(p_segmen, p_kpj, p_nik)
    console.log('rslt', rslt)
    res.status(200).json(rslt)
  } // tenant/registrasi/cek-peserta
  /*
  'tenant/registrasi/cek-unit': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiCekUnit),
  'tenant/registrasi/status': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRegistrasiStatus),
  'tenant/registrasi/unit': (req, res) =>
    apiReqNew.getData(req, res, reqCtrl.getRegistrasiUnit),
  'tenant/registrasi/available-step': (req, res) =>
    apiReq.getData(req, res, reqCtrl.getRegistrasiAvailableStep),
  'tenant/registrasi/cek-kpj': (req, res) => {
    const p_kpj = req.query.p_kpj ? req.query.p_kpj.trim() : ''
    const rslt = cekKpj(p_kpj)
    res.status(200).json(rslt)
  },
  */
}

exports.methodPost = {
  '002000001': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiIndividu), // tenant/registrasi/individu
  '002000002': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiPerusahaan), // tenant/registrasi/perusahaan
  '002002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiPenghuniSave), // tenant/registrasi/penghuni-save
  '002000004': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiKontrak), // tenant/registrasi/kontrak
  '002003001': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.resetRegistrasiWL) // tenant/registrasi/waiting-list-reset

  /*
  'tenant/registrasi/penghuni': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiPenghuni)
  'tenant/registrasi': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasi)
    */
}

exports.methodDel = {
  '002000000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.delRegistrasi), // tenant/registrasi
  '002002000': (req, res) =>
    apiReqNew.callFunction(req, res, reqCtrl.postRegistrasiPenghuniDelete), // tenant/registrasi/penghuni-del
  '002003000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.delRegistrasiWL) // tenant/registrasi/waiting-list
}

exports.methodPostUploadBin = {
  // 'tes-upload': (req, res) => {
  //   console.log('isi body:', req.body.cephData)
  //   res.status(200).json({ ret: 0, msg: req.cephData })
  // }
}

exports.methodPostUploadBase64 = {
  '002001000': (req, res) =>
    apiReq.callFunction(req, res, reqCtrl.postRegistrasiLampiran) // tenant/registrasi/lampiran
  // 'tes-upload': (req, res) => {
  //   console.log('isi body:', req.body.cephData)
  //   res.status(200).json({ ret: 0, msg: req.body.cephData })
  // }
}
