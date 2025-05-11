const moment = require('moment')

module.exports = function (data) {
    console.log('dataReport', data)
    var dataContent = []
    // looping data penghuni
    var tanggalPerolehan = '24 Januari 2020';
    for (let i = 0; i < data.length; i++) {
        dataContent.push(
            [i + 1, data[i].tgl_request != null ? moment(data[i].tgl_request).format("DD MMM YYYY") : '', data[i].deskripsi_wo, data[i].lokasi, data[i].completion_notes, data[i].status == 'O' ? 'Open' : data[i].status == 'A' ? 'Assign' : 'Close']
        )
        kode_blok = data[i].kode_blok;
    }

    return {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [20, 50, 55, 20],
        content: [
            {
                alignment: 'center',
                style: 'header',
                text: [
                    'DAFTAR ASET TETAP YANG MASIH DIGUNAKAN',

                ]
            }, {
                align: 'left',
                style: 'nameRusun',
                text: ['BPJS Ketenagakerjaan Rusunawa ...\nKelompok Aset : '],

            },
            {
                margin: [0, 10, 0, 0],
                table: {

                    widths: [15, 60, 60, 60, 90, 40, 40, 40, 45, 40, 40, 40, 40, 60],
                    body: [
                        [{ text: 'NO', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'No Registrasi', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'LOKASI ASET TETAP', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'TGL PEROLEHAN', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'NILAI PEROLEHAN', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'STATUS TANAH', bold: true, rowSpan: 2, alignment: 'center' },
                        { text: 'SERTIFIKAT', bold: true, colSpan: 3, alignment: 'center' },
                        { text: 'STATUS BELUM', bold: true },
                        { text: 'STATUS BELUM', bold: true },
                        { text: 'LUAS', bold: true, rowSpan: 2, alignment: 'center' },

                        { text: 'STATUS', bold: true, colSpan: 3, alignment: 'center' },
                        { text: 'STATUS BELUM', bold: true },
                        { text: 'STATUS BELUM', bold: true },
                        { text: 'KET', bold: true, rowSpan: 2, alignment: 'center' },
                        ],
                        ['', '', '', '', '', '', { text: 'NOMOR', bold: true }, { text: 'MASA BERLAKU', bold: true }, { text: 'TGL BERAKHIR', bold: true }, '', { text: 'BAIK', bold: true }, { text: 'RUSAK RINGAN', bold: true }, { text: 'USANG', bold: true }, ''],

                        ['1', '1234567898765432', 'OJAN', tanggalPerolehan, 'CKT/029/2323.3/343', 'CIKARANG', 'CIKARANG', 'CIKARANG', 'CIKARANG', 'TB-1001', 'SUDAH', 'BELUM', 'BELUM', 'CASH'],
                    ]
                },
                layout: 'Borders',
                style: 'textBody'
            },
            {
                margin: [0, 0, 20, 20],
                table: {
                    style: 'isiData',
                    widths: [222, 90],
                    body: [
                        [
                            'Total',
                            '100.000.000',

                        ],

                    ]
                },
                layout: 'Borders',
                style: 'textBody'
            },
            {
                margin: [0, 10, 20, 20],
                table: {
                    style: 'isiData',
                    widths: [400, 350],
                    body: [
                        [
                            { text: 'Menyetujui', style: '', alignment: 'center' },
                            { text: 'Yang Membuat', style: '', alignment: 'center' },

                        ],
                        [
                            { text: '\n\n\n\n\n', style: 'ttdSpacer' },
                            {},

                        ],
                        [
                            { text: 'Marsaid\nDeputi Direktur Pengelolaan Aset dan Layanan Umum', alignment: 'center' },
                            { text: 'Widio B. Rahmulyo\nAsisten Deputi Bidang Aset SKP dan Kendali Mutu Sarana', alignment: 'center' },
                        ],

                    ]
                },
                layout: 'noBorders',
            },
            {
                alignment: 'left',
                style: 'header',
                text: [
                    '\n\n\nNOTE :\n',
                    { text: 'Sumber dana\n- cash\n- transfer' },

                ]
            },

        ],
        styles: {
            header: {
                fontSize: 15,
                alignment: 'justify',
            },
            subHeader: {
                fontSize: 14,
                bold: true,
            },
            textBody: {
                fontSize: 8,
                alignment: 'justify',
            },
            footer: {
                fontSize: 13,



            }
        }

    }
}
