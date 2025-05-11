const moment = require('moment')
module.exports = function (data) {
    moment.locale('id');
    var len = data.length
    var dataHeader = []
    var dataBody = []
    var dataBody_fix = []
    var dataHeader_fix = []
    var dataFix = []
    for (var i = 0; i < len; i++) {
        var dataBlok = [
            { text: '\nNama Blok : ' + (data[i].nama_blok !== null ? data[i].nama_blok : '-'), colSpan: 13, fontSize: 10, bold: true, border: [false, false, false, false] },
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ]
        try {
            dataHeader =
                [
                    { text: 'BULAN', style: 'headerContent' },
                    { text: 'JAN', style: 'headerContent' },
                    { text: 'FEB', style: 'headerContent' },
                    { text: 'MAR', style: 'headerContent' },
                    { text: 'APR', style: 'headerContent' },
                    { text: 'MEI', style: 'headerContent' },
                    { text: 'JUL', style: 'headerContent' },
                    { text: 'JUN', style: 'headerContent' },
                    { text: 'AUG', style: 'headerContent' },
                    { text: 'SEP', style: 'headerContent' },
                    { text: 'OKT', style: 'headerContent' },
                    { text: 'NOV', style: 'headerContent' },
                    { text: 'DES', style: 'headerContent' },
                ]
            if (data[i].nama_urutan === 'OKUPANSI') {

                dataBody.push(
                    [
                        { text: data[i].nama_lantai !== null ? data[i].nama_lantai.toUpperCase() : '', style: 'bodyContent' },
                        { text: data[i].jan !== null ? data[i].jan : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].feb !== null ? data[i].feb : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mar !== null ? data[i].mar : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].apr !== null ? data[i].apr : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mei !== null ? data[i].mei : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jun !== null ? data[i].jun : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jul !== null ? data[i].jul : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].aug !== null ? data[i].aug : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].sep !== null ? data[i].sep : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].okt !== null ? data[i].okt : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].nov !== null ? data[i].nov : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].des !== null ? data[i].des : 0, style: 'bodyContent', alignment: 'center' },
                    ]
                )
            }
            else if (data[i].nama_urutan === 'TOTAL') {

                dataBody.push(
                    [
                        { text: data[i].nama_urutan.toUpperCase(), style: 'bodyContent' },
                        { text: data[i].jan !== null ? data[i].jan : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].feb !== null ? data[i].feb : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mar !== null ? data[i].mar : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].apr !== null ? data[i].apr : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mei !== null ? data[i].mei : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jun !== null ? data[i].jun : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jul !== null ? data[i].jul : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].aug !== null ? data[i].aug : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].sep !== null ? data[i].sep : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].okt !== null ? data[i].okt : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].nov !== null ? data[i].nov : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].des !== null ? data[i].des : 0, style: 'bodyContent', alignment: 'center' },
                    ]
                )
            }
            if (data[i].urutan === 3) {
                dataBody.push(
                    [
                        { text: data[i].nama_urutan.toUpperCase(), style: 'bodyContent' },
                        { text: data[i].jan !== null ? parseFloat(data[i].jan).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].feb !== null ? parseFloat(data[i].feb).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mar !== null ? parseFloat(data[i].mar).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].apr !== null ? parseFloat(data[i].apr).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].mei !== null ? parseFloat(data[i].mei).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jun !== null ? parseFloat(data[i].jun).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].jul !== null ? parseFloat(data[i].jul).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].aug !== null ? parseFloat(data[i].aug).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].sep !== null ? parseFloat(data[i].sep).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].okt !== null ? parseFloat(data[i].okt).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].nov !== null ? parseFloat(data[i].nov).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                        { text: data[i].des !== null ? parseFloat(data[i].des).toFixed(2) : 0, style: 'bodyContent', alignment: 'center' },
                    ]
                )
                dataFix.push(
                    /* {
                        margin: [30, 0, 0, 0],
                        text: '\nNama Blok : ' + (data[i].nama_blok !== null ? data[i].nama_blok : '-'),
                        fontSize: 10,
                        bold: true
                    }, */
                    {
                        margin: [30, 0, 0, 0],
                        headerRow: 1,
                        table: {
                            widths: [100, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 100],
                            body: [
                                dataBlok,
                                dataHeader,
                                ...dataBody.slice()
                            ],
                        },
                        dontBreakRows: true,
                        unbreakable: true,
                    }
                )
                dataBody.length = 0
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        pageOrientation: 'landscape',
        pageMargins: [40, 80, 40, 50],
        pageSize: 'A4',
        //footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
        footer: function (currentPage, pageCount) {
            return [
                { text: '\n' + currentPage.toString(), alignment: 'center', fontSize: 10 }
            ]

        },
        header: function (currentPage, pageCount, pageSize) {
            var page_hal = currentPage.toString()
            var countPage = pageCount.toString()
            return [
                {
                    lineHeight: 2,
                    text: '\n',
                },
                {
                    style: 'titleHeader',
                    text: 'TINGKAT OKUPANSI RUSUNAWA', alignment: 'center'
                },
                {
                    style: 'subTitleHeader',
                    text: 'Nama Rusun : ' + data[0].nama_rusun, alignment: 'center'
                },
                {
                    style: 'subTitleHeader',
                    text: 'Tahun : ' + data[0].periode, alignment: 'center'
                },
                { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -50, 0, 0], },
                { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
                {
                    lineHeight: 1,
                    text: '\n',
                }
                //{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
            ]
        },
        content: [
            ...dataFix
        ],
        styles: {
            headerContent: {
                fontSize: 8,
                alignment: 'center',
                bold: true
            },
            headerBlok: {
                fontSize: 10,
                alignment: 'left',
                bold: true
            },
            bodyContent: {
                fontSize: 7.5,
            },
            titleHeader: {
                fontSize: 14,
                bold: true
            },
            subTitleHeader: {
                fontSize: 10,
                alignment: 'center',
                bold: true
            },
        },
    }

}