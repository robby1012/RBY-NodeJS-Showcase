const moment = require('moment')

module.exports = function (data) {
  console.log(data);
  moment.locale('id')
  //console.log(data[0].unit)
  var namaRusun = data[0].nama_rusun
  var dataContent = []
  //var dataNama = data[i].kpj_nama.toUpperCase()
  // looping data penghuni
  for (let i = 0; i < data.length; i++) {
    dataContent.push(
      [{ text: (i + 1 + '.'), alignment: 'center', fontSize: 10 },
      { text: (data[i].nama_blok), alignment: 'center', fontSize: 10 },
      { text: (data[i].nama_unit), alignment: 'center', fontSize: 10 },
      { text: (data[i].kpj_nama.toUpperCase()), fontSize: 10 },
      { text: (data[i].nik), fontSize: 10 },
      data[i].kpj !== null ? { text: (data[i].kpj), fontSize: 10 } : { text: '-', fontSize: 10, alignment: 'center' },
      { text: (data[i].pihak2_nama_perusahaan !== null ? data[i].pihak2_nama_perusahaan : { text: '-', alignment: 'center' }), fontSize: 10 },
      /*  { text: (data[i].nama_blok), alignment: 'center', fontSize: 10 },
       { text: (data[i].nama_unit), alignment: 'center', fontSize: 10 }, */
      { text: (data[i].tgl_out === null ? 'Y' : '-'), alignment: 'center', fontSize: 10 },
      { text: (data[i].tgl_out !== null ? 'Y' : '-'), alignment: 'center', fontSize: 10 }

      ]
    )
  }

  return {
    pageOrientation: 'landscape',
    pageSize: 'A4',
    pageMargins: [40, 100, 40, 25],
    footer: function (currentPage, pageCount) {
      if (pageCount > 1) {
        return [
          { text: '\n' + currentPage.toString(), alignment: 'center' }
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
          text: 'MONITORING DATA PENGHUNI BERDASARKAN PERUSAHAAN', alignment: (currentPage % 1) ? 'left' : 'center'
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
        table: {
          dontBreakRows: true,
          widths: [20, 60, 60, 170, 90, 90, 130, 60, 60],
          headerRows: 2,
          body: [
            [{ rowSpan: 2, text: 'NO', style: 'subHeader' },
            { rowSpan: 2, text: 'TWINBLOK', style: 'subHeader' },
            { rowSpan: 2, text: 'NAMA UNIT', style: 'subHeader' },
            { rowSpan: 2, text: 'NAMA PENGHUNI', style: 'subHeader' },
            { rowSpan: 2, text: 'NIK', style: 'subHeader' },
            { rowSpan: 2, text: 'NOMOR PESERTA', style: 'subHeader' },
            { rowSpan: 2, text: 'NAMA PERUSAHAAN', style: 'subHeader' },

            { colSpan: 2, text: 'STATUS HUNI', style: 'subHeader' },
              '',

            ],
            ['', '', '', '', '', '', '', { text: 'AKTIF', style: 'subHeader' }, { text: 'NONAKTIF', style: 'subHeader' }],
            ...dataContent

          ]
        },
        layout: 'Borders'
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
        fontSize: 12,
        alignment: 'justify'
      },
      footer: {
        fontSize: 13

      }
    }

  }
}
