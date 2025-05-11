const moment = require('moment')
const { isNumber } = require("validate.js");

function currency(curr) {
    var data;
    if (!isNumber(curr)) {
        data = (parseFloat(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else if (isNumber(curr)) {
        data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    //console.log(data.toString())
    var str = data.toString();

    var comma = str.split('.');
    var txt = comma[0].replace(/,/g, '.')
    var rp = txt + ',' + comma[comma.length - 1].replace('.', ',')

    return rp
}
module.exports = function (data) {
    console.log(data)
    moment.locale('id');
    function romawi(nomor) {
        var desimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var romawi = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        var hasil = '';

        for (var index = 0; index < desimal.length; index++) {
            while (desimal[index] <= nomor) {
                hasil += romawi[index];
                nomor -= desimal[index];
            }
        }
        return hasil;
    }

    function groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    var len = data.length;
    var tbl_data = [];
    var header = [];
    var sub_header = [];
    var body = [];
    var footer = [];
    var group = groupBy(data, (c) => c.nama_kategori);
    sub_header.push(Object.keys(group, 'nama_kategori'));
    header.push(
        [
            { rowSpan: 2, text: 'NO', alignment: 'center', margin: [0, 15, 0, 0], bold: true, fontSize: 8, fillColor: '#969696' },
            { rowSpan: 2, colSpan: 4, text: 'NO. REGISTRASI', fontSize: 8, alignment: 'center', margin: [0, 15, 0, 0], bold: true, fillColor: '#969696' },
            '',
            '',
            '',
            { rowSpan: 2, text: 'NAMA ASET TETAP', fontSize: 8, bold: true, margin: [0, 15, 0, 0], alignment: 'center', fillColor: '#969696' },
            { rowSpan: 2, text: 'MERK/TYPE', fontSize: 8, bold: true, margin: [0, 15, 0, 0], alignment: 'center', fillColor: '#969696' },
            { rowSpan: 2, text: 'TGL BELI', fontSize: 8, bold: true, alignment: 'center', margin: [0, 15, 0, 0], fillColor: '#969696' },
            { rowSpan: 2, text: 'NILAI PEROLEHAN', fontSize: 8, bold: true, alignment: 'center', margin: [0, 15, 0, 0], fillColor: '#969696' },
            { colSpan: 4, text: 'KONDISI', fontSize: 8, bold: true, alignment: 'center', fillColor: '#969696' },
            '',
            '',
            '',
            { rowSpan: 2, text: 'KET', fontSize: 8, bold: true, alignment: 'center', margin: [0, 15, 0, 0], fillColor: '#969696' }
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            { text: 'BAIK', fontSize: 8, bold: true, alignment: 'center', fontSize: 8, margin: [0, 8, 0, 0], fillColor: '#969696' },
            { text: 'RUSAK', fontSize: 8, bold: true, alignment: 'center', margin: [0, 3, 0, 0], fillColor: '#969696' },
            { text: 'USANG', fontSize: 8, bold: true, alignment: 'center', margin: [0, 3, 0, 0], fillColor: '#969696' },
            { text: 'HILANG', fontSize: 8, bold: true, alignment: 'center', margin: [0, 8, 0, 0], fillColor: '#969696' },
            ''
        ],
        [{ text: '1', alignment: 'center', fontSize: 6 }, { text: '2', alignment: 'center', fontSize: 6 }, { text: '3', alignment: 'center', fontSize: 6 }, { text: '4', alignment: 'center', fontSize: 6 }, { text: '5', alignment: 'center', fontSize: 6 }, { text: '6', alignment: 'center', fontSize: 6 }, { text: '7', alignment: 'center', fontSize: 6 }, { text: '8', alignment: 'center', fontSize: 6 }, { text: '9', fontSize: 6, alignment: 'center' }, { colSpan: 4, text: 'Isi dengan tanda angka " 1 "', alignment: 'center', fontSize: 6 }, '', '', '', { text: '10', alignment: 'center', fontSize: 6 }]
    );
    var tot_nilaiperolehan = 0
    var tot_kondisi_b = 0
    var tot_kondisi_rr = 0
    var tot_kondisi_rb = 0
    var tot_kondisi_h = 0


    for (var j = 0; j < sub_header[0].length; j++) {
        var body_len = group[Object.keys(group)[j]].length
        var no = j + 1;

        var sum_kondisi_b = 0
        var sum_kondisi_rr = 0;
        var sum_kondisi_rb = 0;
        var sum_kondisi_h = 0;
        var sum_nilaiperolehan = 0;


        body.push([{ colSpan: 6, text: romawi(no) + '. ' + sub_header[0][j], bold: true }, '', '', '', '', '', '', '', '', '', '', '', '', '']);
        for (var i = 0; i < body_len; i++) {
            var item = group[Object.keys(group)[j]][i];
            var kondisi_b = 0;
            var kondisi_rr = 0;
            var kondisi_rb = 0;
            var kondisi_h = 0;
            sum_nilaiperolehan += parseFloat(item.nilai_perolehan)
            item.kondisi_aset == 'B' ? kondisi_b += 1 : kondisi_b
            item.kondisi_aset == 'R' ? kondisi_rr += 1 : kondisi_rr
            item.kondisi_aset == 'U' ? kondisi_rb += 1 : kondisi_rb
            item.kondisi_aset == 'H' ? kondisi_h += 1 : kondisi_h

            tot_nilaiperolehan += parseFloat(item.nilai_perolehan)
            item.kondisi_aset == 'B' ? sum_kondisi_b += 1 : sum_kondisi_b
            item.kondisi_aset == 'R' ? sum_kondisi_rr += 1 : sum_kondisi_rr
            item.kondisi_aset == 'U' ? sum_kondisi_rb += 1 : sum_kondisi_rb
            item.kondisi_aset == 'H' ? sum_kondisi_h += 1 : sum_kondisi_h



            item.kondisi_aset == 'B' ? tot_kondisi_b += 1 : tot_kondisi_b
            item.kondisi_aset == 'R' ? tot_kondisi_rr += 1 : tot_kondisi_rr
            item.kondisi_aset == 'U' ? tot_kondisi_rb += 1 : tot_kondisi_rb
            item.kondisi_aset == 'H' ? tot_kondisi_h += 1 : tot_kondisi_h
            body.push([
                { text: '', alignment: 'center' },
                { text: item.no_reg1, alignment: 'center' },
                { text: item.no_reg2, alignment: 'center' },
                { text: item.no_reg3, alignment: 'center' },
                { text: item.no_reg4, alignment: 'center' },
                { text: item.nama_aset.toUpperCase() },
                { text: item.aset_merk.toUpperCase() + '/' + item.aset_type.toUpperCase() },
                { text: moment(item.tgl_beli).format('DD/MM/YYYY') },
                { text: 'Rp. ' + currency(item.nilai_perolehan) },
                item.kondisi_aset == 'B' ? { text: '1', alignment: 'center' } : { text: '0', alignment: 'center' },
                item.kondisi_aset == 'R' ? { text: '1', alignment: 'center' } : { text: '0', alignment: 'center' },
                item.kondisi_aset == 'U' ? { text: '1', alignment: 'center' } : { text: '0', alignment: 'center' },
                item.kondisi_aset == 'H' ? { text: '1', alignment: 'center' } : { text: '0', alignment: 'center' },
                { text: item.keterangan.toUpperCase() }
            ])


        }
        body.push(
            [
                { text: '0', alignment: 'center' }, 
                { colSpan: 7, text: 'JUMLAH', alignment: 'center', bold: true }, 
                '', 
                '', 
                '', 
                '', 
                '', 
                '', 
                { text: currency(sum_nilaiperolehan), alignment: 'right' }, 
                { text: sum_kondisi_b, alignment: 'center' }, 
                { text: sum_kondisi_rr, alignment: 'center' }, 
                { text: sum_kondisi_rb, alignment: 'center' }, 
                { text: sum_kondisi_h, alignment: 'center' }, 
                ''
            ]
        )
    }
    footer.push([{ colSpan: 14, text: '', fillColor: '#969696' }, '', '', '', '', '', '', '', '', '', '', '', '', ''])
    /* footer.push([
        { text: '0', alignment: 'center' },
        { colSpan: 7, text: 'JUMLAH TOTAL', alignment: 'center', bold: true },
        '',
        '',
        '',
        '',
        '',
        '',
        { text: currency(tot_nilaiperolehan), alignment: 'right' },
        { text: tot_kondisi_b, alignment: 'center' },
        { text: tot_kondisi_rr, alignment: 'center' },
        { text: tot_kondisi_rb, alignment: 'center' },
        { text: tot_kondisi_h, alignment: 'center' },
        ''
    ]
    ) */

    tbl_data.push(...header, ...body, ...footer)
    console.log(tbl_data)
    return {
        pageSize: 'A4',
        pageOrientation: 'potrait',
        pageMargins: [10, 230, 0, 0],
        header: function (currentPage, pageCount, pageSize) {
            var title = [];
            title.push(
                {
                    margin: [6, 18, 0, 20],
                    table: {

                        widths: [185, 200, 170],

                        body: [
                            [{
                                rowSpan: 3,
                                image: 'data:image/png;base64,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',
                                width: 170,
                                height: 40,
                                margin: [5, 20, 0, 0]
                            },
                            { text: 'FORMULIR', margin: [15, 10, 10, 10], fontSize: 15, bold: true, alignment: 'center' }
                                , {

                                rowSpan: 4,
                                text: 'REKAPITULASI ASET NON KAPITALISASI',
                                alignment: 'center',
                                bold: true,
                                fontSize: 15,
                                margin: [0, 35, 0, 0],
                                fillColor: '#969696',
                            }],
                            ['', { text: 'No Dokumen: ', margin: [0, 8, 0, 0], fontSize: 10, border: [false, false, false, false] }, ''],
                            ['', { text: 'No Revisi       : ', margin: [0, 0, 0, 8], fontSize: 10, border: [false, false, false, false] }, ''],
                            [{ text: 'Halaman : ' + currentPage + ' dari ' + pageCount, fontSize: 10, margin: [5, 3, 3, 3] }, { text: 'Tanggal Dikeluarkan :', fontSize: 10, margin: [5, 3, 3, 3] }, ''],

                        ]
                    },
                },
                {
                    text: 'DAFTAR ASET YANG MASIH DIGUNAKAN NON KAPITALISASI',
                    alignment: 'center',

                    bold: true,
                    fontSize: 12
                },
                {
                    margin: [12, 0, 0, 0],
                    text: '\nBPJS KETENAGAKERJAAN RUSUNAWA ' + data[0].nama_rusun + '\nKELOMPOK ASET: PERALATAN KANTOR',
                    fontSize: 10,

                },
                {
                    margin: [12, 0, 0, 0],
                    text: '\nPER ' + moment(data[0].periode_cetak).format('MMMM YYYY').toString().toUpperCase(),
                    fontSize: 8
                }
            )
            return title
        },
        content: [
            {
                margin: [-5, 0, 0, 0],
                table: {
                    headerRows: 3,
                    widths: [12, 15, 15, 15, 18, 80, 50, 43, 70, 18, 30, 28, 30, 35],
                    body: [...tbl_data,
                    [
                        {
                            margin: [-5, -1, 0, 0],
                            table: {
                                widths: [12, 15, 15, 15, 18, 80, 50, 43, 70, 18, 30, 28, 30, 35],
                                body: [
                                    [
                                        { text: '0', alignment: 'center' },
                                        { colSpan: 7, text: 'JUMLAH TOTAL', alignment: 'center', bold: true },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { text: currency(tot_nilaiperolehan), alignment: 'right' },
                                        { text: tot_kondisi_b, alignment: 'center' },
                                        { text: tot_kondisi_rr, alignment: 'center' },
                                        { text: tot_kondisi_rb, alignment: 'center' },
                                        { text: tot_kondisi_h, alignment: 'center' },
                                        ''
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: '\n', fontSize: 8, alignment: 'center', bold: true, border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: '\n', fontSize: 8, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: '', fontSize: 8, bold: true, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: 'JAKARTA' + ', ' + moment().format('DD MMMM YYYY'), alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: 'Mengetahui', fontSize: 8, alignment: 'center', bold: true, border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: 'Yang membuat, ', fontSize: 8, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: '\n\n\n\n\n\n', fontSize: 8, alignment: 'center', bold: true, border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: '\n\n\n\n\n\n', fontSize: 8, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: data[0].assigned_mengetahui, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: data[0].assigned_membuat, fontSize: 8, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ],
                                    [
                                        { text: '', alignment: 'center', border: [false, false, false, false] },
                                        { colSpan: 7, text: data[0].assigned_jabatan_mengetahui, fontSize: 8, alignment: 'center', bold: true, border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        { colSpan: 6, text: data[0].assigned_jabatan_membuat, fontSize: 8, alignment: 'center', border: [false, false, false, false] },
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                    ]

                                ]
                            },
                            fontSize: 7.5,
                            alignment: 'center',
                            colSpan: 14,
                            unbreakable: true,
                            border: [false, false, false, false],
                        }

                    ]


                    ],

                },
                fontSize: 7.5
            },

        ]
    }
}