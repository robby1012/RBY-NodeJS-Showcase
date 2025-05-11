const moment = require('moment');
module.exports = function (data) {
    moment.locale('id');
    var dt_body = [];
    var namaRusun = data[0].nama_rusun
    for (var i = 0; i < data.length; i++) {
        var no = i + 1;
        //var dateSewa = new Date(data[i].tgl_request_menghuni.toString()).getDate() + ' ' + bulan[new Date(data[i].tgl_request_menghuni.toString()).getMonth()] + ' ' + new Date(data[i].tgl_request_menghuni.toString()).getFullYear()

        dt_body.push(
            [
                {
                    text: no.toString() + '.', style: 'bodyContent'
                },
                { text: data[i].nik, style: 'bodyContent' },
                { text: data[i].kpj_nama, style: 'bodyContent' },
                { text: data[i].kpj, style: 'bodyContent' },
                { text: data[i].kpj_telp, style: 'bodyContent' },
                { text: data[i].tgl_request_menghuni != null ? moment(data[i].tgl_request_menghuni).format("DD/MM/YYYY") : '-', style: 'bodyContent' },
                { text: data[i].jenis_registrasi !== 'I' ? 'PERUSAHAAN' : 'INDIVIDU', style: 'bodyContent' },
                { text: data[i].waiting_no.toString(), style: 'bodyContent', alignment: 'center' }
            ]
        )
    }
    return {
        pageOrientation: 'landscape',
        pageMargins: [40, 60, 40, 60],
        pageSize: 'A4',
        footer: function (currentPage, pageCount) {
            if (pageCount > 1) {
                return [
                    { text: currentPage.toString(), alignment: 'center' }
                ]
            }
        },
        header: function (currentPage, pageCount, pageSize) {
            var page_hal;
            var countPage;
            if (pageCount >= 1) {
                page_hal = currentPage.toString()
                countPage = pageCount.toString()
            }
            return [
                {
                    lineHeight: 3,
                    text: '\n',
                },
                {
                    style: 'headerContent',
                    text: 'MONITORING DAFTAR WAITING LIST RUSUNAWA', alignment: (currentPage % 1) ? 'left' : 'center'
                },
                { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
                { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
                { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
            ]
        },
        content: [
            {
                margin: [-28, 0, 0, 0],
                headerRows: 1,
                table: {
                    widths: ['*', 90, 145, 90, 100, 100, 90, 115],
                    body: [
                        [
                            { text: 'NO', style: 'headerContent' },
                            { text: 'NIK', style: 'headerContent' },
                            { text: 'NAMA CALON PENGHUNI', style: 'headerContent' },
                            { text: 'NOMOR PESERTA', style: 'headerContent' },
                            { text: 'NOMOR TELEPON', style: 'headerContent' },
                            { text: 'TANGGAL DAFTAR', style: 'headerContent' },
                            { text: 'JENIS REGISTRASI', style: 'headerContent' },
                            { text: 'NOMOR WAITING LIST', style: 'headerContent' }
                        ],
                        ...dt_body
                    ],
                    dontBreakRows: true
                },
            },
        ],
        defaultStyle: {
            fontSize: 9,
        },
        styles: {
            headerContent: {
                fontSize: 9,
                alignment: 'center',
                bold: true
            },
            bodyContent: {
                fontSize: 8,
            },
        },
    }


}