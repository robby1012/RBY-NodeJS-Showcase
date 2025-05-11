const moment = require('moment')
module.exports = function (data) {
    moment.locale('id');
    var hunian = data
    var dataBody = []
    var dataTotal = []
    var total_kaps = 0
    var total_huni = 0
    var total_orang = 0
    var total_keluar = 0
    var total_masuk = 0
    var total_persentase = 0
    for (var i = 0; i < hunian.length; i++) {
        total_kaps += parseInt(hunian[i].kapasitas_kamar)
        total_huni += parseInt(hunian[i].dihuni)
        total_orang += parseInt(hunian[i].orang)
        total_keluar += parseInt(hunian[i].keluar)
        total_masuk += parseInt(hunian[i].masuk)
        total_persentase += hunian[i].persentase
        console.log(total_persentase)
        dataBody.push(
            [
                { text: i + 1 + '.', style: 'bodyContent' },
                { text: hunian[i].nama_blok, style: 'bodyContent', alignment: 'left' },
                { text: hunian[i].kapasitas_kamar, style: 'bodyContent', alignment: 'center' },
                { text: hunian[i].dihuni, style: 'bodyContent', alignment: 'center' },
                { text: hunian[i].orang, style: 'bodyContent', alignment: 'center' },
                { text: hunian[i].masuk, style: 'bodyContent', alignment: 'center' },
                { text: hunian[i].keluar, style: 'bodyContent', alignment: 'center' },
                { text: hunian[i].persentase.toFixed(2) + '%', style: 'bodyContent', alignment: 'center' },
                { text: '', style: 'bodyContent', alignment: 'center' }
            ]
        )
    }
    console.log(total_persentase)
    dataTotal.push(
        [
            { text: 'JUMLAH', style: 'bodyContent', bold: true, alignment: 'center', colSpan: 2 },
            { text: '', style: 'bodyContent', alignment: 'center' },
            { text: total_kaps, style: 'bodyContent', alignment: 'center' },
            { text: total_huni, style: 'bodyContent', alignment: 'center' },
            { text: total_orang, style: 'bodyContent', alignment: 'center' },
            { text: total_masuk, style: 'bodyContent', alignment: 'center' },
            { text: total_keluar, style: 'bodyContent', alignment: 'center' },
            { text: (total_persentase / hunian.length).toFixed(2) + '%', style: 'bodyContent', alignment: 'center' },
            { text: '', border: [false, false, false, false] }
        ]
    )
    return {
        pageOrientation: 'landscape',
        pageMargins: [40, 105, 40, 25],
        pageSize: 'A4',
        //footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
        footer: function (currentPage, pageCount) {
            return [
                { text: '\n' + currentPage.toString(), alignment: 'center' }
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
                    text: 'MONITORING PEMASARAN \n TINGKAT HUNIAN', alignment: 'center'
                },
                {
                    style: 'subTitleHeader',
                    text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + data[0].nama_rusun, alignment: 'center'
                },

                { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
                { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
                {
                    lineHeight: 1,
                    text: '\n',
                },
                {
                    text: '\n'
                },
                {
                    style: 'subTitleHeader2',
                    margin: [25, 0, 0, 0],
                    text: 'Bulan     : ' + moment(data[0].tgl_report).format('MMMM') + '\n' + 'Tanggal : ' + moment(data[0].tgl_report).format('DD MMMM YYYY')
                },
                //{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
            ]
        },


        content: [

            {
                margin: [-15, 10, 0, 0],
                table: {
                    headerRows: 2,
                    widths: [20, 100, 120, 70, 70, 70, 70, 70, 120],
                    body: [
                        [
                            { text: 'NO', style: 'headerContent', rowSpan: 2 },
                            { text: 'TWINBLOK', style: 'headerContent', rowSpan: 2 },
                            { text: 'KAPASITAS KAMAR', style: 'headerContent', rowSpan: 2 },
                            { text: 'DIHUNI', style: 'headerContent', colSpan: 2 },
                            { text: '', style: 'headerContent' },
                            { text: 'KELUAR', style: 'headerContent', rowSpan: 2 },
                            { text: 'MASUK', style: 'headerContent', rowSpan: 2 },
                            { text: '%', style: 'headerContent', rowSpan: 2 },
                            { text: 'KETERANGAN', style: 'headerContent', rowSpan: 2 },
                        ],
                        [
                            { text: '', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                            { text: 'JUMLAH', style: 'headerContent' },
                            { text: 'ORANG', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                            { text: '', style: 'headerContent' },
                        ],
                        ...dataBody,
                        ...dataTotal
                    ],
                    dontBreakRows: true
                },
                //layout: 'noBorders'
            },


        ],
        styles: {
            headerContent: {
                fontSize: 10,
                alignment: 'center',
                bold: true
            },
            bodyContent: {
                fontSize: 9,
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
            subTitleHeader2: {
                fontSize: 10,
                alignment: 'left',
                bold: true
            },
        },
    }

}