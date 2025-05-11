const moment = require('moment')

module.exports = function (data) {
  var namaRusun = data[0].nama_rusun
  var dataContent = []
  moment.locale('id');
  // looping data pembayaran
  for (let i = 0; i < data.length; i++) {
    dataContent.push([
      i + 1 + '.',
      data[i].nama_blok,
      data[i].nama_unit,
      data[i].pihak2_nik,
      data[i].pihak2_nama_lengkap.toUpperCase(),
      data[i].pihak2_kpj,
      data[i].no_kontrak_sewa,
      data[i].no_invoice,
      data[i].tgl_pembayaran !== null ? moment(data[i].tgl_pembayaran).format('DD/MM/YYYY') : { text: '-', alignment: 'center' },
      data[i].tgl_pembayaran !== null ? 'SUDAH' : { text: '-', alignment: 'center' },
      data[i].tgl_pembayaran === null ? 'BELUM' : { text: '-', alignment: 'center' },
      data[i].tgl_pembayaran !== null ? data[i].nama_pembayaran_method/*  == 'C' ? 'Cash' : 'Transfer'  */ : { text: '-', alignment: 'center' }]
    )
  }
  console.log(dataContent)

  return {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [20, 90, 55, 25],
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
          style: 'header',
          text: 'MONITORING PEMBAYARAN LISTRIK DAN AIR', alignment: (currentPage % 1) ? 'left' : 'center', fontSize: 10, bold: true
        },
        { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
        { text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 8, alignment: 'center' },
        { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
        { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
      ]
    },
    content: [
      {
        margin: [0, 5, 0, 0],
        table: {
          headerRows: 2,
          widths: [15, 47, 40, 85, 80, 60, 100, 80, 50, 40, 40, 60],
          body: [
            [{ text: 'NO', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'TWINBLOK', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NAMA UNIT', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NIK', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NAMA PENGHUNI\n / PIC', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NOMOR\nPESERTA', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NOMOR SURAT\nPERJANJIAN', bold: true, rowSpan: 2, alignment: 'center' },
            //{ text: 'NAMA RUSUN', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'NO INVOICE', bold: true, rowSpan: 2, alignment: 'center' },

            { text: 'TANGGAL BAYAR', bold: true, rowSpan: 2, alignment: 'center' },
            { text: 'STATUS', bold: true, colSpan: 2, alignment: 'center' },
            { text: 'STATUS BELUM', bold: true },
            { text: 'METODE\nPEMBAYARAN', bold: true, rowSpan: 2, alignment: 'center' }
            ],
            ['', '', '', '', '', '', '', '', '', 'SUDAH', 'BELUM', ''],
            ...dataContent
          ]
        },
        layout: 'Borders',
        style: 'header'
      },

      {
        text: '\n\n\n\n',
        style: 'subHeader',
      },


      {
        alignment: 'left',
        bold: 'true',
        style: 'header',
        table: {
          body: [

            ['NOTE :'],
            ['Metode Pembayaran'],
            ['- cash'],
            ['- transfer'],
          ],
        },
        unbreakable: true,
        layout: 'noBorders'
      },


    ],
    styles: {
      headerJudul: {
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      header: {
        fontSize: 9,
        //alignment: 'justify'
      },
      subHeader: {
        fontSize: 14,
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
