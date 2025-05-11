const moment = require("moment");
const { isNumber } = require("validate.js");

function currency(curr) {
    var data;
    if (!isNumber(curr)) {
        data = (parseInt(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else if (isNumber(curr)) {
        data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    return data
}
module.exports = function (data) {
    /* console.log(data[0]);
    console.log(data[0].unit);
    console.log(data[0].invlstrk);
    console.log(data[0].invair); */
    //denda
    //console.log(data[0].unit);
    moment.locale('id')
    var unit = data[0].unit[0];
    var tagihan_sewa = currency(data[0].nominal_akhir);
    //console.log((parseInt(data[0].nominal_akhir)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    var tagihan_listrik;
    var tagihan_air;
    var denda_sewa;
    var denda_listrik;
    var denda_air;
    tagihan_listrik = data[0].invlstrk !== null ? currency(data[0].invlstrk) : currency(0);
    tagihan_air = data[0].invair !== null ? currency(data[0].invair) : currency(0);
    console.log(typeof (tagihan_sewa))
    var jumlah = currency(parseInt(data[0].nominal_akhir) + parseInt(data[0].invlstrk !== null ? data[0].invlstrk : 0) + parseInt(data[0].invair !== null ? data[0].invair : 0));
    return {
        pageSize: 'A4',
        /*pageOrientation: 'landscape',*/
        pageMargins: [40, 55, 50, 50],
        content: [
            {
                margin: [0, -30, 0, 0],
                table: {

                    widths: [50, 'auto'],
                    body: [
                        ['', { text: 'KOP SURAT PT. BINAJASA ABADI KARYA DAN LOGO BPJS KETENAGAKERJAAN', fontSize: 12, bold: true, alignment: 'center' }],
                        ['', { text: 'Jalan Hang Kesturi - Kabil - Batam', fontSize: 12, bold: true, alignment: 'center' }],

                    ]
                },
                layout: 'noBorders'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -39, y1: 5,
                    x2: 554, y2: 5,
                    lineWidth: 2
                }
                ]
            },
            {
                lineHeight: 1.5,
                text: '\n'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -39, y1: 0,
                    x2: 554, y2: 0,
                    lineWidth: 2
                }
                ]
            },
            {
                lineHeight: 0.2,
                text: '\n'
            },
            {

                text: 'PEMBERITAHUAN TAGIHAN',
                fontSize: 12,
                bold: true,
                alignment: 'center'
            },
            {
                lineHeight: 0.2,
                text: '\n'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -39, y1: 0,
                    x2: 554, y2: 0,
                    lineWidth: 2
                }
                ]
            },
            {
                lineHeight: 3,
                text: '\n'
            },
            {
                margin: [-30, 0, 0, 0],
                //style:'bodyContent',

                table: {
                    widths: ['17%', '20%', '10%', '10%', '10%', 'auto', 'auto'],
                    body: [

                        [{ text: 'Nama :', style: 'borderNone', border: [false, false, false, false] }, { colSpan: 2, text: data[0].pihak2_nama_lengkap }, '', { text: '', style: 'borderNone', border: [false, false, false, false] }, { text: 'No Kpj :', style: 'borderNone', border: [false, false, false, false] }, { colSpan: 2, text: data[0].pihak2_kpj }, ''],
                        [{ colSpan: 7, text: ' ', style: 'borderNone', border: [false, false, false, false] }],
                        [{ text: 'TwinBlok :', style: 'borderNone', border: [false, false, false, false] }, unit.kode_blok, { text: 'Lantai :', style: 'borderNone', border: [false, false, false, false] }, unit.no_lantai, { text: 'No :', style: 'borderNone', border: [false, false, false, false] }, unit.no_unit, { text: '', border: [false, false, false, false] }]
                    ]
                },
                //layout: 'noBorders'
            },
            {
                lineHeight: 1.3,
                text: '\n'
            },
            {
                margin: [-25, 0, 0, 0],
                //style:'bodyContent',

                table: {
                    widths: ['16%', '17%'],
                    body: [
                        [{ text: 'Tagihan :', style: 'borderNone' }, { text: data[0].title_invoice }]
                    ]
                },
                layout: 'noBorders'
            },
            {
                lineHeight: 1.3,
                text: '\n'
            },

            { margin: [-25, 0, 0, 0], text: 'Rincian :', style: 'borderNone' },
            //batas kiri

            /*{
                lineHeight:1.3,
                text:'\n'
            },*/
            {
                margin: [80, 0, 0, 0],
                //style:'bodyContent',
                //lineHeight:1,
                table: {
                    widths: [100, 30, 100, 50, 35, '*'],
                    body: [
                        [{ text: '1. Tagihan  ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: tagihan_sewa, alignment: 'right' }, { text: '', border: [false, false, false, false] }, { text: data[0].jmlh_bulan_tagihan, alignment: 'right' }, { text: 'Bulan', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: '2. Denda Sewa ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: '', alignment: 'right' }, { colSpan: 3, text: '', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: '3. Listrik ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: tagihan_listrik, alignment: 'right' }, { text: '', border: [false, false, false, false] }, { text: data[0].jmlh_bulan_tagihan, alignment: 'right' }, { text: 'Bulan', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: '4. Air ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: tagihan_air, alignment: 'right' }, { colSpan: 3, text: '', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: '5. Denda Listrik ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: '', alignment: 'right' }, { colSpan: 3, text: '', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: '6. Denda Air ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: '', alignment: 'right' }, { colSpan: 3, text: '', border: [false, false, false, false] }],
                        [{ colSpan: 6, text: '', border: [false, false, false, false] }],
                        [{ text: ' Jumlah ', style: 'borderNone', border: [false, false, false, false] }, { text: ':', border: [false, false, false, false] }, { text: jumlah, alignment: 'right' }, { colSpan: 3, text: '', border: [false, false, false, false] }]
                    ]
                },
                //layout: ''
            },
            {
                lineHeight: 3,
                text: '\n'
            },
            {
                alignment: 'justify',
                fontSize: 12,
                margin: [-25, 0, 0, 0],
                text:
                    'Catatan :\n 1. Surat Tagihan ini sekaligus sebagai peringatan dan apabila sampai tanggal 10 bulan berjalan tidak diindahkan, maka listrik hunian akan dipadamkan\n 2. Apabila 2 bulan berturut-turut, sewa hunian tidak dibayarkan, akan diputus kontrak huniannya'
            },
            {
                lineHeight: 3,
                text: '\n'
            },
            {
                columns: [
                    {
                        text: '',
                    },
                    {
                        text: [
                            { text: 'Batam, ' + moment().format('DD MMMM YYYY') + '\n', alignment: 'center' },
                            { text: 'Housing Manager', alignment: 'center' },
                            { lineHeight: 8, text: '\n' },
                            { text: 'Ifan', alignment: 'center' },
                        ]
                    },

                ]
            },

        ],
        styles: {
            borderNone: {

                fontSize: 12,
                bold: true
            },
            headerContent: {
                fontSize: 10,
            },
            bodyContent: {
                fontSize: 9,
            },
            noborder: {
                border: [false, false, false, false],
            }
        },
    }
}