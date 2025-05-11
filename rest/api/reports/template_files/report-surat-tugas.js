const moment = require('moment')
const { isNumber } = require("validate.js");
module.exports = function (data) {
    moment.locale('id')
    var data_wo = data[0].f_mw_surat_tugas.data_wo
    console.log(data[0].f_mw_surat_tugas.data_wo)
    var data_content_wo = []

    //WO
    for (var i = 0; i < data_wo.length; i++) {
        data_content_wo.push(
            [
                { text: i + 1, style: 'textBody' },
                { text: data_wo[i].assigned_work_start_date, style: 'textBody' },
                { text: data_wo[i].title_wo, style: 'textBody' },
                { text: data_wo[i].nama_unit !== null ? data_wo[0].nama_unit : { text: '-', alignment: 'center' }, style: 'textBody' },
                { text: data_wo[i].assigned_notes, style: 'textBody' },
                { text: data_wo[i].deskripsi_wo, style: 'textBody' }
            ],
        )
    }

    //IC
    var data_ic = data[0].f_mw_surat_tugas.data_ic
    var content_ic = []
    //MTR
    var data_mtr = data[0].f_mw_surat_tugas.data_mtr !== null ? data[0].f_mw_surat_tugas.data_mtr : []


    var content_mtr = []
    if (data_wo[0].wo_tipe.toUpperCase() === 'IC') {
        var data_content_ic = []
        if (data_ic !== null) {
            for (var i = 0; i < data_ic.length; i++) {
                data_content_ic.push(
                    [
                        { text: i + 1, style: 'textBody' },
                        { text: data_ic[i].kode_aset, style: 'textBody' },
                        { text: data_ic[i].nama_blok, style: 'textBody' },
                        { text: data_ic[i].nama_lantai, style: 'textBody' },
                        { text: data_ic[i].nama_unit !== null ? data_ic[0].nama_unit : { text: '-', alignment: 'center' }, style: 'textBody' },
                        { text: data_ic[i].nama_aset, style: 'textBody' },
                        { text: data_ic[i].kondisi_awal, style: 'textBody' },
                        { text: '', style: 'textBody' },
                        { text: '', style: 'textBody' },

                    ],
                )
            }
        }

        var data_content_mtr = []
        if (data_mtr !== null) {
            for (var i = 0; i < data_mtr.length; i++) {
                data_content_mtr.push(
                    [
                        { text: i + 1, style: 'textBody' },
                        { text: data_mtr[i].nama_unit, style: 'textBody' },
                        { text: data_mtr[i].meter_listrik_awal !== null ? data_mtr[i].meter_listrik_awal : { text: '-', alignment: 'center' }, style: 'textBody' },
                        { text: '', style: 'textBody' },
                        { text: data_mtr[i].meter_air_awal !== null ? data_mtr[i].meter_air_awal : { text: '-', alignment: 'center' }, style: 'textBody' },
                        { text: '', style: 'textBody' },

                    ],
                )
            }
        }
        content_ic = [

            {
                pageOrientation: 'potrait',
                pageBreak: 'before',
                margin: [-10, -5, 10, 10],
                table: {
                    headerRows: 10,
                    dontBreakRows: true,
                    widths: [20, 80, 40, 40, 40, 110, 40, 40, 80],
                    body: [
                        [
                            { text: 'PENGELOLA RUMAH SUSUN BPJS KETENAGAKERJAAN', style: 'header', bold: true, colSpan: 9, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: data_wo[0].nama_rusun, style: 'header', bold: true, colSpan: 9, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].lokasi, style: 'header', colSpan: 9, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].provinsi + '\n', style: 'header', colSpan: 9, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            { text: '\n', style: 'header', colSpan: 9, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            {
                                text: [
                                    { text: 'WORK ORDER - PEMERIKSAAN BARANG INVENTARIS UNIT', bold: true },
                                    ''
                                ]
                                , style: 'header', colSpan: 9

                            },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '\nDARI    : ' + data_wo[0].pemberi_tugas, fontSize: 10, colSpan: 9, border: [true, true, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'UNTUK : ' + data_wo[0].petugas_wo, fontSize: 10, colSpan: 9, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: 'NO', style: 'subHeader', rowSpan: 2 },
                            { text: 'KODE BARANG', style: 'subHeader', rowSpan: 2 },
                            { text: 'BLOK', style: 'subHeader', rowSpan: 2 },
                            { text: 'LANTAI', style: 'subHeader', rowSpan: 2 },
                            { text: 'UNIT', style: 'subHeader', rowSpan: 2 },
                            { text: 'NAMA BARANG', style: 'subHeader', rowSpan: 2 },
                            { text: 'KONDISI', style: 'subHeader', colSpan: 2 },
                            '',
                            { text: 'KETERANGAN', style: 'subHeader', rowSpan: 2 },
                        ],

                        [
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            { text: 'AWAL', style: 'subHeader' },
                            { text: 'AKHIR', style: 'subHeader' },
                            '',
                        ],
                        ...data_content_ic



                    ]
                },
                layout: 'Borders'
            },
            {

                margin: [0, 0, 10, 10],
                table: {

                    widths: ['35.5%', '35.5%', '35.5%'],
                    body: [
                        [
                            { text: 'Keterangan: Status Akhir Item (B: BAIK, R: RUSAK, H: HILANG, RB: RUSAK BERAT)', fontSize: 9, alignment: 'left', colSpan: 3 },
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: '\n\n', bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: data_wo[0].provinsi + ', ' + moment().format('DD MMMM YYYY'), bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            '',
                            '',
                            { text: 'Petugas,', fontSize: 11, alignment: 'center' },
                        ],

                        [
                            '\n\n\n\n',
                            '',
                            ''
                        ],

                        [
                            '',
                            '',
                            { text: data_wo[0].petugas_wo, fontSize: 9, alignment: 'center' }
                        ]
                    ],
                },
                layout: 'noBorders',
                unbreakable: true,
            },
            {
                pageOrientation: 'potrait',
                pageBreak: 'before',
                margin: [18, 0, 0, 0],
                table: {
                    headerRows: 14,
                    dontBreakRows: true,
                    widths: [20, 120, 80, 80, 80, 80],
                    body: [
                        [
                            { text: 'PENGELOLA RUMAH SUSUN BPJS KETENAGAKERJAAN', style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: data_wo[0].nama_rusun, style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].lokasi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].provinsi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            { text: '\n', style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            {
                                text: [
                                    { text: 'WORK ORDER - PENCATATAN METER LISTRIK & AIR', bold: true },
                                    ''
                                ]
                                , style: 'header', colSpan: 6

                            },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '\nBLOK    : ' + (data_wo[0].nama_blok !== null ? data_wo[0].nama_blok : '-'), fontSize: 10, colSpan: 6, border: [true, true, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'LANTAI    : ' + (data_wo[0].nama_lantai !== null ? data_wo[0].nama_lantai : '-'), fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'PETUGAS PEMERIKSA    : ' + data_wo[0].petugas_wo, fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'TANGGAL PEMERIKSAAN    :  ', fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '.......................................', fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: 'TGL METER AWAL : ', fontSize: 10, colSpan: 3, border: [true, false, false, false] },
                            '',
                            '',
                            { text: 'TGL METER AKHIR : ', fontSize: 10, colSpan: 3, border: [false, false, true, true] },
                            '',
                            '',
                        ],
                        [
                            { text: 'NO', style: 'subHeader', rowSpan: 2 },
                            { text: 'ROOM', style: 'subHeader', rowSpan: 2 },
                            { text: 'PLN', style: 'subHeader', colSpan: 2 },
                            { text: '', style: 'subHeader' },
                            { text: 'ATB', style: 'subHeader', colSpan: 2 },
                            { text: '', style: 'subHeader' },
                        ],

                        [
                            '',
                            '',
                            { text: 'AWAL', style: 'subHeader' },
                            { text: 'AKHIR', style: 'subHeader' },
                            { text: 'AWAL', style: 'subHeader' },
                            { text: 'AKHIR', style: 'subHeader' },
                        ],
                        ...data_content_mtr



                    ]
                },
                layout: 'Borders'
            },
            {

                margin: [0, 0, 10, 10],
                table: {

                    widths: ['54.5%', '54.5%'],
                    body: [
                        [
                            { text: '\n', fontSize: 11, alignment: 'center' },
                            { text: '\n' + data_wo[0].provinsi + ', ' + moment().format('DD MMMM YYYY'), bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            { text: 'Bagian Pencatatan,', fontSize: 11, alignment: 'center' },
                            { text: 'Mengetahui,', fontSize: 11, alignment: 'center' },
                        ],
                        [
                            '\n\n\n\n',
                            ''
                        ],

                        [
                            { text: '(.....................................................)', fontSize: 9, alignment: 'center' },
                            { text: '(.....................................................)', fontSize: 9, alignment: 'center' }
                        ]
                    ],
                },
                layout: 'noBorders',
                unbreakable: true,
            }

        ]

    }

    if (data_wo[0].wo_tipe.toUpperCase() === 'MTR') {
        var data_content_mtr = []
        for (var i = 0; i < data_mtr.length; i++) {
            data_content_mtr.push(
                [
                    { text: i + 1, style: 'textBody' },
                    { text: data_mtr[i].nama_unit, style: 'textBody' },
                    { text: data_mtr[i].meter_listrik_awal !== null ? data_mtr[i].meter_listrik_awal : { text: '-', alignment: 'center' }, style: 'textBody' },
                    { text: '', style: 'textBody' },
                    { text: data_mtr[i].meter_air_awal !== null ? data_mtr[i].meter_air_awal : { text: '-', alignment: 'center' }, style: 'textBody' },
                    { text: '', style: 'textBody' },

                ],
            )
        }
        content_mtr = [
            {
                pageOrientation: 'potrait',
                pageBreak: 'before',
                margin: [18, 0, 0, 0],
                table: {
                    headerRows: 14,
                    dontBreakRows: true,
                    widths: [20, 120, 80, 80, 80, 80],
                    body: [
                        [
                            { text: 'PENGELOLA RUMAH SUSUN BPJS KETENAGAKERJAAN', style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: data_wo[0].nama_rusun, style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].lokasi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].provinsi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            { text: '\n', style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            {
                                text: [
                                    { text: 'WORK ORDER - PENCATATAN METER LISTRIK & AIR', bold: true },
                                    ''
                                ]
                                , style: 'header', colSpan: 6

                            },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '\nBLOK    : ' + data_wo[0].nama_blok, fontSize: 10, colSpan: 6, border: [true, true, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'LANTAI    : ' + data_wo[0].nama_lantai, fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'PETUGAS PEMERIKSA    : ' + data_wo[0].petugas_wo, fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: 'TANGGAL PEMERIKSAAN    :  ', fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '.......................................', fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: 'TGL METER AWAL : ', fontSize: 10, colSpan: 3, border: [true, false, false, false] },
                            '',
                            '',
                            { text: 'TGL METER AKHIR : ', fontSize: 10, colSpan: 3, border: [false, false, true, true] },
                            '',
                            '',
                        ],
                        [
                            { text: 'NO', style: 'subHeader', rowSpan: 2 },
                            { text: 'ROOM', style: 'subHeader', rowSpan: 2 },
                            { text: 'PLN', style: 'subHeader', colSpan: 2 },
                            { text: '', style: 'subHeader' },
                            { text: 'ATB', style: 'subHeader', colSpan: 2 },
                            { text: '', style: 'subHeader' },
                        ],

                        [
                            '',
                            '',
                            { text: 'AWAL', style: 'subHeader' },
                            { text: 'AKHIR', style: 'subHeader' },
                            { text: 'AWAL', style: 'subHeader' },
                            { text: 'AKHIR', style: 'subHeader' },
                        ],
                        ...data_content_mtr



                    ]
                },
                layout: 'Borders'
            },
            {

                margin: [0, 0, 10, 10],
                table: {

                    widths: ['54.5%', '54.5%'],
                    body: [
                        [
                            { text: '\n', fontSize: 11, alignment: 'center' },
                            { text: '\n' + data_wo[0].provinsi + ', ' + moment().format('DD MMMM YYYY'), bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            { text: 'Bagian Pencatatan,', fontSize: 11, alignment: 'center' },
                            { text: 'Mengetahui,', fontSize: 11, alignment: 'center' },
                        ],

                        [
                            '\n\n\n\n',
                            ''
                        ],

                        [
                            { text: '(.....................................................)', fontSize: 9, alignment: 'center' },
                            { text: '(.....................................................)', fontSize: 9, alignment: 'center' }
                        ]
                    ],
                },
                layout: 'noBorders',
                unbreakable: true,
            }

        ]

    }


    return {
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [20, 30, 55, 20],
        content: [
            {
                margin: [0, -5, 10, 10],

                table: {
                    headerRows: 8,
                    dontBreakRows: true,
                    widths: [30, 90, 180, 90, 180, 180],
                    body: [
                        [
                            { text: 'PENGELOLA RUMAH SUSUN BPJS KETENAGAKERJAAN', style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],

                        [
                            { text: data_wo[0].nama_rusun, style: 'header', bold: true, colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].lokasi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: data_wo[0].provinsi, style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            { text: '\n', style: 'header', colSpan: 6, border: [false, false, false, false] },
                            '',
                            '',
                            '',
                            '',
                            '',

                        ],
                        [
                            {
                                text: [
                                    { text: data_wo[0].wo_tipe.toUpperCase() === 'IC' ? 'WORK ORDER - INSPEKSI UNIT (CHECKOUT)' : 'WORK ORDER – ' + data_wo[0].title_wo.toUpperCase(), bold: true },
                                    '\nNo. Wo : ' + data_wo[0].no_wo
                                ]
                                , style: 'header', colSpan: 6

                            },
                            '',
                            '',
                            '',
                            '',
                            '',
                        ],
                        [
                            { text: '\nDARI    : ' + data_wo[0].pemberi_tugas, fontSize: 10, colSpan: 6, border: [true, true, true, false] },
                            '', '', '', '', ''
                        ],
                        [
                            { text: 'UNTUK : ' + data_wo[0].petugas_wo, fontSize: 10, colSpan: 6, border: [true, false, true, false] },
                            '', '', '', '', ''
                        ],

                        [
                            { text: 'NO', style: 'subHeader' },
                            { text: 'TGL', style: 'subHeader' },
                            { text: 'PERMASALAHAN', style: 'subHeader' },
                            { text: 'NAMA UNIT', style: 'subHeader' },
                            { text: 'TINDAKAN', style: 'subHeader' },
                            { text: 'KETERANGAN', style: 'subHeader' }
                        ],

                        ...data_content_wo



                    ]
                },
                layout: 'Borders'
            },


            {
                margin: [0, 0, 10, 10],
                table: {

                    widths: ['35.5%', '35.5%', '35.5%'],
                    body: [
                        [
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: '\n\n', bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: '', fontSize: 11, alignment: 'center' },
                            { text: data_wo[0].provinsi + ', ' + moment().format('DD MMMM YYYY'), bold: true, fontSize: 11, alignment: 'center' },
                        ],
                        [
                            { text: 'Pemberi tugas,', fontSize: 11, alignment: 'center' },
                            { text: 'Petugas', fontSize: 11, alignment: 'center' },
                            { text: 'Pemohon,', fontSize: 11, alignment: 'center' },
                        ],

                        [
                            '\n\n\n\n',
                            '',
                            ''
                        ],

                        [
                            { text: data_wo[0].pemberi_tugas, fontSize: 9, alignment: 'center' },
                            { text: data_wo[0].petugas_wo, alignment: 'center' },
                            { text: '(.....................................................)', fontSize: 9, alignment: 'center' }
                        ]
                    ],
                },
                layout: 'noBorders',
                unbreakable: true
            },
            content_ic,
            content_mtr



        ],
        styles: {
            header: {
                fontSize: 12,
                alignment: 'center',
            },
            subHeader: {
                fontSize: 9,
                bold: true,
                alignment: 'center',
            },
            headerBody: {

            },
            textBody: {
                fontSize: 9,

            },
            footer: {
                fontSize: 13,



            }
        }

    }
}