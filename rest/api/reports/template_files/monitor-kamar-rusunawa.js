const moment = require('moment')
const { isNumber } = require("validate.js");

module.exports = function (data) {
    moment.locale('id')
    //['', '', '', '', '', '', dataPenghuni2, '', ''],
    var sumPenghuni = 0
    var namaRusun = data[0].nama_rusun
    var dataBody = [[{ text: 'NO', alignment: 'center', style: 'subHeader' },
    { text: 'TWINBLOK', alignment: 'center', style: 'subHeader' },
    { text: 'NAMA LANTAI', alignment: 'center', style: 'subHeader' },
    { text: 'NAMA UNIT', alignment: 'center', style: 'subHeader' },
    { text: 'NIK', alignment: 'center', style: 'subHeader' },
    { text: 'NOMOR PESERTA', alignment: 'center', style: 'subHeader' },
    { text: 'NAMA PENGHUNI', alignment: 'center', style: 'subHeader' },
    { text: 'JUMLAH PENGHUNI ', alignment: 'center', style: 'subHeader' },
    { text: 'STATUS KAMAR', alignment: 'center', style: 'subHeader' }],
    ];
    for (var i = 0; i < data.length; i++) {
        var no = i + 1
        var rows = data[i].penghuni !== null ? data[i].penghuni.length : 1
        dataBody.push([
            { text: no.toString() + '.', rowSpan: rows },
            { text: data[i].kode_blok + '-' + data[i].nama_blok.toUpperCase(), rowSpan: rows },
            { text: data[i].nama_lantai.toUpperCase(), rowSpan: rows },
            { text: data[i].nama_unit.toUpperCase(), rowSpan: rows },
            data[i].penghuni !== null ? { text: data[i].penghuni[0].nik, rowSpan: rows } : { text: '-', alignment: 'center' },
            data[i].penghuni !== null ? { text: data[i].penghuni[0].kpj, rowSpan: rows } : { text: '-', alignment: 'center' },
            data[i].penghuni !== null ? { text: data[i].penghuni[0].kpj_nama.toUpperCase(), bold: true } : { text: '-', alignment: 'center' },
            data[i].jumlah_penghuni !== null ? { text: data[i].jumlah_penghuni, rowSpan: rows, alignment: 'center' } : { text: '-', alignment: 'center' },
            { text: data[i].status_kamar, rowSpan: rows }
        ])
        sumPenghuni += parseInt(data[i].jumlah_penghuni)
        if (data[i].penghuni !== null) {
            for (var j = 1; j < data[i].penghuni.length; j++) {
                dataBody.push(['', '', '', '', '', '', data[i].penghuni[j].kpj_nama.toUpperCase(), '', ''])
            }
        }
    }
    return {
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [20, 70, 55, 25],
        footer: function (currentPage, pageCount) {
            if (pageCount > 1) {
                return [
                    { text: currentPage.toString(), alignment: 'center', fontSize: 10 }
                ]
            }
        },
        header: function (currentPage, pageCount, pageSize) {
            var page_hal;
            var countPage;

            page_hal = currentPage.toString()
            countPage = pageCount.toString()

            return [
                {
                    lineHeight: 3,
                    text: '\n',
                },
                {
                    style: 'headerJudul',
                    text: 'MONITORING KAMAR RUSUNAWA', alignment: (currentPage % 1) ? 'left' : 'center', fontSize: 10, bold: true
                },
                { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
                //{ text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 10, bold: true, alignment: 'center', },
                { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
                { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
            ]
        },
        content: [
            {
                margin: [0, 10, 0, 0],
                table: {
                    headerRows: 1,
                    keepWithHeaderRows: 1,
                    widths: [15, 60, 100, 65, 100, 90, 110, 80, 90],
                    body: dataBody,
                },
                layout: 'Borders',
                fontSize: 8,
            },

            {
                alignment: 'center',
                margin: [484, 0, 0, 0],
                table: {
                    widths: [110, 80],
                    body: [
                        ['JUMLAH', { text: sumPenghuni }],
                    ],


                },
                layout: 'Borders',
                style: 'header',

            },
            {
                text: '\n\n\n\n',
                style: 'subHeader',
            },


            {
                table: {
                    body: [

                        [{ text: 'Note:', style: 'subHeader', colSpan: 3, border: [false, false, false, false] },
                            '',
                            '',
                        ],

                        [{ text: 'Setiap kamar max dihuni 4 orang', style: 'subHeader', colSpan: 3, border: [false, false, false, false] },
                            '',
                            '',
                        ],

                        [{ text: 'NO', style: 'subHeader', alignment: 'center' },
                        { text: 'Status Kamar', style: 'subHeader', alignment: 'center' },
                        { text: 'Keterangan', style: 'subHeader', alignment: 'center' },
                        ],

                        ['1.', 'BERPENGHUNI', ''],
                        ['2.', 'SEDANG PROSES SEWA', ''],
                        ['3.', 'BELUM TERSEWA', ''],
                        ['4.', 'TIDAK DISEWAKAN', ''],
                        ['5.', 'SEDANG MAINTENANCE', ''],
                    ],


                },
                fontSize: 8,
                unbreakable: true,
            },
        ],
        styles: {
            headerJudul: {
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            header: {
                fontSize: 8,
            },
            subHeader: {
                fontSize: 10,
                bold: true
            },
            textBody: {
                fontSize: 12,
                alignment: 'justify'
            },
            footer: {
                fontSize: 13

            }
        }
    }
}
