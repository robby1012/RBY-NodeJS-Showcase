module.exports = {
    rptExcelDaftarAsetTetapDigunakanTanah: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-tanah'),
    rptExcelDaftarAsetTetapDigunakanKendaraan: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-kendaraan-dinas'),
    rptExcelRekapAsetTetapDigunakan: require('./template_files/rekapitulasi-aset-yang-masih-digunakan'),
    rptExcelDaftarAsetTetapDigunakanBangunan: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-bangunan'),
    rptExcelDaftarAsetTetapDigunakanPeralatanKantor: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-peralatan-kantor'),
    rptExcelDaftarAsetTetapDigunakanPeralatanKomputer: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-peralatan-komputer'),
    rptExcelDaftarAsetTetapDigunakanPeralatanLainnya: require('./template_files/daftar-aset-tetap-digunakan-kelompok-aset-peralatan-lainnya'),
    rptExcelDaftarAsetNonKapPeralatanKantor: require('./template_files/daftar-aset-yang-masih-digunakan-non-kapitalisasi-kelompok-aset-peralatan-kantor'),
    rptExcelRekapAsetNonKapDigunakan: require('./template_files/rekapitulasi-aset-non-kapitalisasi-yang-masih-digunakan'),
    rptExcelDaftarAsetNonKapPeralatanKomputer: require('./template_files/daftar-aset-yang-masih-digunakan-non-kapitalisasi-kelompok-aset-peralatan-komputer'),
    rptExcelDaftarAsetNonKapPeralatanLainnya: require('./template_files/daftar-aset-yang-masih-digunakan-non-kapitalisasi-kelompok-aset-peralatan-lain'),
}
/* const Excel = require('xlsx')
const moment = require('moment')
// const fs = require('fs')
module.exports = async (res, reqData, rowData, tipe = 'os') => {
    console.log(rowData)
} */