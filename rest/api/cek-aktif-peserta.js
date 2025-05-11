const axios = require('axios')
const isArray = require('lodash/isArray')

// exports.cekKpj = (kpj) => {
//   return axios
//     .post(process.env.WS_URL + process.env.WS_KPJ, {
//       chId: 'WEBAPP',
//       kpj: kpj
//     })
//     .then(function (response) {
//       if (isArray(response.data)) {
//         return { ret: 0, data: response.data.find((e) => e.aktif === 'Y') }
//       } else {
//         return { ret: -1, msg: 'KPJ tidak ditemukan' }
//       }
//     })
//     .catch(() => {
//       return {
//         ret: -99,
//         msg: 'Gagal koneksi pengecekan ke BPJS Ketenaga kerjaan'
//       }
//     })
// }

exports.cekNpp = (npp) => {
  return axios
    .post(process.env.WS_URL + process.env.WS_NPP, {
      chId: 'RUSUNAWA',
      npp: npp
    })
    .then((response) => {
      if (isArray(response.data)) {
        return { ret: 0, data: response.data.find((e) => e.aktif === 'Y') }
      } else {
        return {
          ret: -1,
          msg: 'NPP tidak ditemukan'
        }
      }
    })
    .catch((e) => {
      return {
        ret: -99,
        msg: 'Gagal koneksi pengecekan ke BPJS Ketenaga kerjaan'
      }
    })
}

exports.cekPeserta = (segmen, kpj, nik) => {
  return axios
    .post(process.env.WS_URL + process.env.WS_PESERTA, {
      chId: 'RUSUNAWA',
      kpj: kpj,
      nik: nik,
      kodeSegmen: segmen
    })
    .then((response) => {
      console.log(response)
      if (isArray(response.data)) {
        return { ret: 0, msg: 'Peserta aktif' }
      } else {
        return { ret: -1, msg: response.data.message }
      }
    })
    .catch((e) => {
      return {
        ret: -99,
        msg: 'Gagal koneksi pengecekan ke BPJS Ketenaga kerjaan'
      }
    })
}
