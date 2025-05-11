const moment = require('moment')

module.exports = function (data) {
    try {
        moment.locale('id')
        var namaRusun = data[0].nama_rusun;
        var dataContent = [];
        var rusunawaName = '';
        // looping data penghuni
        for (let i = 0; i < data.length; i++) {
            if (rusunawaName == '') {
                rusunawaName = data[i].nama_rusun;
            }

            dataContent.push(
                [{ text: (i + 1), alignment: 'center' },
                { text: (data[i].nama_blok), fontSize: 8, alignment: 'left' },
                { text: (data[i].nama_lantai), fontSize: 8, alignment: 'left' },
                { text: (data[i].nama_unit), fontSize: 8, alignment: 'left' },
                { text: (data[i].kpj_nama.toUpperCase()), alignment: 'left', fontSize: 8 },
                { text: (data[i].pihak2_nama_perusahaan === null ? { text: '-', alignment: 'center' } : data[i].pihak2_nama_perusahaan.toUpperCase()), fontSize: 8, alignment: 'left' },
                { text: (data[i].nama_status_nikah === null ? '-' : data[i].nama_status_nikah), fontSize: 8, alignment: 'left' },
                { text: (data[i].tgl_mulai_sewa != null ? moment(data[i].tgl_mulai_sewa).format("DD/MM/YYYY") : '-'), fontSize: 8, alignment: 'left' },
                { text: (data[i].tgl_berakhir_sewa != null ? moment(data[i].tgl_berakhir_sewa).format("DD/MM/YYYY") : '-'), alignment: 'left', fontSize: 8 },
                { text: (data[i].kpj), fontSize: 8, alignment: 'left' },
                { text: (data[i].no_adendum === null ? { text: '-', alignment: 'center' } : data[i].no_adendum), fontSize: 8, alignment: 'left' },
                ]
            )
        }

        //  ['1','Atun','PT Berkah','Kawin','1/10/2020','1/10/2021','098374736222','AD1119384','TB1','','1001'],


        return {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [40, 100, 40, 25],
            footer: function (currentPage, pageCount) {
                if (pageCount > 1) {
                    return [
                        { text: '\n' + currentPage.toString(), alignment: 'center' }
                    ]
                }

            },
            header: function (currentPage, pageCount, pageSize) {
                var page_hal = currentPage.toString()
                var countPage = pageCount.toString()
                return [
                    {
                        lineHeight: 3,
                        text: '\n',
                    },
                    {
                        style: 'headerJudul',
                        text: 'DAFTAR KONTRAK PENGHUNI/ TENANT RUSUNAWA BPJS KETENAGAKERJAAN', alignment: (currentPage % 1) ? 'left' : 'center'
                    },
                    { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
                    { text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 10, bold: true, alignment: 'center', },
                    { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
                    { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
                ]
            },
            content: [
                {
                    margin: [-30, 10, 0, 0],
                    headerRows: 1,
                    table: {

                        widths: [20, 50, 40, 50, 110, 110, 80, 50, 50, 55, 110],
                        headerRows: 2,
                        body: [
                            [{ text: 'NO', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'TWINBLOK', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'LANTAI', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'NAMA UNIT', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'NAMA', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'PERUSAHAAN', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'STATUS\nPERKAWINAN', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'TANGGAL\nKONTRAK', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'AKHIR\nKONTRAK', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'NOMOR\nKPJ', bold: true, rowSpan: 2, alignment: 'center' },
                            { text: 'ADDENDUM', bold: true, rowSpan: 2, alignment: 'center' },
                            ],
                            ['', '', '', '', '', '', '', '', '', '', ''],
                            ...dataContent,
                        ]
                    },
                    layout: 'Borders',
                    style: 'header'
                },

            ],
            styles: {
                header: {
                    fontSize: 9,
                    alignment: 'justify',
                },
                headerJudul: {
                    fontSize: 14,
                    alignment: 'center',
                    bold: true,
                },
                subHeader: {
                    fontSize: 14,
                    bold: true,
                },
                textBody: {
                    fontSize: 12,
                    alignment: 'justify',
                },
                footer: {
                    fontSize: 13,



                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}
