const moment = require('moment')

module.exports = function (data) {
  moment.locale('id')
  var namaRusun = data[0].nama_rusun
  var dataContent = []
  // looping data penghuni
  for (let i = 0; i < data.length; i++) {
    dataContent.push(
      [{ text: (i + 1) + '.', alignment: 'center', fontSize: 9 },
      { text: (data[i].nama_blok), alignment: 'center', fontSize: 9 },
      { text: (data[i].nama_unit), alignment: 'center', fontSize: 9 },
      { text: (data[i].kpj_nama.toUpperCase()), fontSize: 9 },
      { text: (data[i].nik), fontSize: 9 },
      data[i].kpj !== null ? { text: (data[i].kpj), fontSize: 9 } : { text: '-', fontSize: 9, alignment: 'center' },
      { text: (data[i].jenis_kelamin == 'L' ? 'LAKI-LAKI' : 'PEREMPUAN'), alignment: 'center', fontSize: 9 }
      ]
    )
  }

  return {
    pageOrientation: 'landscape',
    pageMargins: [40, 100, 40, 25],
    pageSize: 'A4',
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
          style: 'headerContent',
          text: 'MONITORING DATA PENGHUNI RUSUN BERDASARKAN JENIS KELAMIN', alignment: (currentPage % 1) ? 'left' : 'center'
        },
        { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
        { text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 10, bold: true, alignment: 'center', },
        { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
        { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
      ]
    },
    content: [

      {
        margin: [10, 10, 0, 0],
        table: {
          headerRows: 1,
          dontBreakRows: true,
          //alignment: 'center',
          widths: [20, 50, 80, 220, 120, 90, 90],
          body: [
            [{ text: 'NO', style: 'subHeader' },
            { text: 'TWINBLOK', style: 'subHeader' },
            { text: 'NAMA UNIT', style: 'subHeader' },
            { text: 'NAMA PENGHUNI', style: 'subHeader' },
            { text: 'NIK', style: 'subHeader' },
            { text: 'NOMOR PESERTA', style: 'subHeader' },

            { text: 'JENIS KELAMIN', style: 'subHeader' }
            ],
            ...dataContent
          ],
        },
        layout: 'Borders',
        style: 'textBody'
      }

    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      subHeader: {
        fontSize: 10,
        bold: true,
        alignment: 'center'
      },
      textBody: {
        fontSize: 10,
        alignment: 'justify'
      },
      footer: {
        fontSize: 13

      }
    }

  }
}
