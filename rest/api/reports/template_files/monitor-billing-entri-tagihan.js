const moment = require('moment')
const { isNumber } = require("validate.js");
function currency(curr) {
    var data;
    if (!isNumber(curr)) {
        data = (parseInt(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else if (isNumber(curr)) {
        data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    var str = data.toString();

    var comma = str.split('.');
    var txt = comma[0].replace(/,/g, '.')
    var rp = txt + ',' + comma[comma.length - 1].replace('.', ',')

    return rp
}
module.exports = function (data) {
    moment.locale('id');
    var tagihan = data
    var dataBody = []
    var dataTotal = []
    var total_nominal_deposit = 0
    var total_nominal_sewa = 0
    var total_nominal_listrik = 0
    var total_nominal_air = 0
    var total_nominal_fasilitas = 0
    var total_nominal_denda = 0
    var total_nominal_penggantian_brg = 0
    var grand_total = 0
    for (var i = 0; i < tagihan.length; i++) {
        total_nominal_deposit += parseFloat(tagihan[i].nominal_deposit)
        total_nominal_sewa += parseFloat(tagihan[i].nominal_sewa)
        total_nominal_listrik += parseFloat(tagihan[i].nominal_listrik)
        total_nominal_air += parseFloat(tagihan[i].nominal_air)
        total_nominal_fasilitas += parseFloat(tagihan[i].nominal_fasilitas)
        total_nominal_denda += parseFloat(tagihan[i].nominal_denda)
        total_nominal_penggantian_brg += parseFloat(tagihan[i].nominal_penggantian_brg)
        var total = parseFloat(tagihan[i].nominal_deposit) + parseFloat(tagihan[i].nominal_sewa) + parseFloat(tagihan[i].nominal_listrik) + parseFloat(tagihan[i].nominal_air) + parseFloat(tagihan[i].nominal_fasilitas) + parseFloat(tagihan[i].nominal_denda) + parseFloat(tagihan[i].nominal_penggantian_brg)
        grand_total += total
        dataBody.push(
            [
                { text: i + 1 + '.', style: 'bodyContent' },
                { text: tagihan[i].nama_blok, style: 'bodyContent' },
                { text: tagihan[i].nama_lantai, style: 'bodyContent' },
                { text: tagihan[i].nama_unit, style: 'bodyContent' },
                { text: tagihan[i].is_rented === true ? 'Y' : 'T', style: 'bodyContent', alignment: 'center' },
                { text: currency(tagihan[i].nominal_deposit), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_sewa), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_listrik), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_air), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_fasilitas), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_denda), style: 'bodyContent', alignment: 'right' },
                { text: currency(tagihan[i].nominal_penggantian_brg), style: 'bodyContent', alignment: 'right' },
                { text: currency(total), style: 'bodyContent', alignment: 'right' }
            ]
        )
    }
    dataTotal.push(
        [
            { text: '', style: 'headerContent', colSpan: 5, border: [false, false, false, false] },
            { text: '', style: 'headerContent' },
            { text: '', style: 'headerContent' },
            { text: '', style: 'headerContent' },
            { text: '', style: 'headerContent' },
            { text: currency(total_nominal_deposit), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_sewa), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_listrik), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_air), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_fasilitas), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_denda), style: 'headerContent', alignment: 'right' },
            { text: currency(total_nominal_penggantian_brg), style: 'headerContent', alignment: 'right' },
            { text: currency(grand_total), style: 'headerContent', alignment: 'right' },
        ],
    )
    return {
        pageOrientation: 'landscape',
        pageMargins: [40, 75, 40, 25],
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
                    text: 'MONITORING ENTRI BILLING TAGIHAN', alignment: 'center'
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
                    margin: [5, 0, 0, 0],
                    text: 'Bulan Tagihan : ' + moment(data[0].bulan_report).format('MM-YYYY')
                },
                //{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
            ]
        },


        content: [

            {
                margin: [-35, 10, 0, 0],
                table: {
                    headerRows: 1,
                    widths: [20, 45, 50, 65, 50, 55, 50, 50, 50, 50, 50, 85, 90],
                    body: [
                        [
                            { text: 'NO', style: 'headerContent' },
                            { text: 'TWINBLOK', style: 'headerContent' },
                            { text: 'LANTAI', style: 'headerContent', },
                            { text: 'UNIT', style: 'headerContent', },
                            { text: 'DISEWAKAN', style: 'headerContent' },
                            { text: 'DEPOSIT', style: 'headerContent' },
                            { text: 'SEWA UNIT', style: 'headerContent' },
                            { text: 'LISTRIK', style: 'headerContent' },
                            { text: 'AIR', style: 'headerContent' },
                            { text: 'FASILITAS', style: 'headerContent' },
                            { text: 'DENDA', style: 'headerContent' },
                            { text: 'BRG RUSAK/HILANG', style: 'headerContent' },
                            { text: 'TOTAL', style: 'headerContent' },
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
                fontSize: 8,
                alignment: 'center',
                bold: true
            },
            bodyContent: {
                fontSize: 7,
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