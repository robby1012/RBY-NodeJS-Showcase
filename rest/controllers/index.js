// controllers
const ctrlAuth = require('./auth')
const ctrlKode = require('./ctrl-kode')
const ctrlInvoice = require('./ctrl-invoice')
const ctrlKontrak = require('./ctrl-kontrak')
const ctrlMaintenance = require('./ctrl-maintenance')
const ctrlPembayaran = require('./ctrl-pembayaran')
const ctrlPenghuni = require('./ctrl-penghuni')
// const ctrlProfil = require('./ctrl-profil')
const ctrlRegistrasi = require('./ctrl-registrasi')
const ctrlRusun = require('./ctrl-rusun')
const ctrlSettings = require('./ctrl-settings')
const ctrlAset = require('./ctrl-aset')
const ctrlTarif = require('./ctrl-tarif')
const ctrlKomplain = require('./ctrl-komplain')
const ctrlDashboard = require('./ctrl-dashboard')

// controller reports
const ctrlRptKontrak = require('./ctrl-rpt-kontrak')
const ctrlRptAset = require('./ctrl-rpt-aset')
const ctrlRptInvoice = require('./ctrl-rpt-invoice')
const ctrlFormulirPrs = require('./ctrl-rpt-formperusahaan')

// controller template excel
// const ctrlTempExcelUpload = require('./ctrl-temp-excel-upload')

const ctrlLov = require('./ctrl-lov')
// controller contoh paging
// const ctrlContohPaging = require('./ctrl-contoh-paging')

exports.methodGet = {
  '000000003': ctrlAuth.getInfoPengguna, // auth/info
  '000002000': ctrlAuth.getCaptcha, // auth/generate-captcha
  ...ctrlKode.methodGet,
  ...ctrlInvoice.methodGet,
  ...ctrlKontrak.methodGet,
  ...ctrlMaintenance.methodGet,
  ...ctrlPembayaran.methodGet,
  ...ctrlPenghuni.methodGet,
  // ...ctrlProfil.methodGet,
  ...ctrlRegistrasi.methodGet,
  ...ctrlRusun.methodGet,
  ...ctrlSettings.methodGet,
  ...ctrlAset.methodGet,
  ...ctrlTarif.methodGet,
  ...ctrlKomplain.methodGet,
  ...ctrlRptKontrak.methodGet,
  ...ctrlRptAset.methodGet,
  ...ctrlPembayaran.methodGet,
  ...ctrlRptInvoice.methodGet,
  ...ctrlFormulirPrs.methodGet,
  ...ctrlFormulirPrs.methodGet,
  ...ctrlLov.methodGet,
  ...ctrlDashboard.methodGet

  // ...ctrlContohPaging.methodGet
  // ...ctrlTempExcelUpload.methodGet
}

exports.methodPost = {
  // auth
  '000000001': ctrlAuth.doLoginPengguna, // auth/login
  '000000002': ctrlAuth.doLogout, // auth/logout
  '000001000': ctrlAuth.exchange, // auth/exchange
  ...ctrlRegistrasi.methodPost,
  ...ctrlPenghuni.methodPost,
  ...ctrlKontrak.methodPost,
  ...ctrlInvoice.methodPost,
  ...ctrlPembayaran.methodPost,
  ...ctrlMaintenance.methodPost,
  ...ctrlSettings.methodPost,
  ...ctrlAset.methodPost,
  ...ctrlKode.methodPost,
  ...ctrlKomplain.methodPost
}

exports.methodDel = {
  ...ctrlSettings.methodDel,
  ...ctrlAset.methodDel,
  ...ctrlRegistrasi.methodDel,
  ...ctrlInvoice.methodDel,
  ...ctrlKomplain.methodDel,
  ...ctrlMaintenance.methodDel,
  ...ctrlKontrak.methodDel
}

exports.methodPut = {
  ...ctrlPenghuni.methodPut,
  ...ctrlAset.methodPut,
  ...ctrlSettings.methodPut,
  ...ctrlKode.methodPut,
  ...ctrlKomplain.methodPut,
  ...ctrlMaintenance.methodPut,
  ...ctrlKontrak.methodPut
}

exports.methodPostUploadBin = {
  // ...ctrlRegistrasi.methodPostUploadBin
}

exports.methodPostUploadBase64 = {
  ...ctrlRegistrasi.methodPostUploadBase64,
  ...ctrlPenghuni.methodPostUploadBase64,
  ...ctrlMaintenance.methodPostUploadBase64,
  ...ctrlAset.methodPostUploadBase64,
  ...ctrlKontrak.methodPostUploadBase64,
  ...ctrlInvoice.methodPostUploadBase64
}

exports.methodPutUpload = {}
