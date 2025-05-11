const moment = require('moment')

module.exports = function (data) {
  moment.locale('id')
  var namaRusun = data[0].nama_rusun
  var dataContent = []
  // looping data perjanjian sewa
  try {
    for (let i = 0; i < data.length; i++) {
      dataContent.push(
        [{ text: (i + 1 + '.'), alignment: 'center', fontSize: 8 },
        { text: (data[i].nama_blok), alignment: 'center', fontSize: 8 },
        { text: (data[i].nama_unit), fontSize: 8 },
        { text: (data[i].pihak2_nama_lengkap === null ? { text: '-', fontSize: 8, alignment: 'center' } : data[i].pihak2_nama_lengkap.toUpperCase()), fontSize: 8 },
        { text: (data[i].pihak2_nik), fontSize: 8 },
        data[i].pihak2_kpj !== null ? { text: (data[i].pihak2_kpj), fontSize: 8 } : { text: '-', alignment: 'center', fontSize: 8 },
        { text: (data[i].no_kontrak_sewa), fontSize: 8 },
        { text: moment(data[i].tgl_mulai_sewa).format('DD/MM/YYYY'), alignment: 'center', fontSize: 8 },

        { text: (data[i].jenis_registrasi == 'I' ? 'Y' : '-'), alignment: 'center', fontSize: 8 },
        { text: (data[i].jenis_registrasi == 'P' ? 'Y' : '-'), alignment: 'center', fontSize: 8 }
        ]
      )
    }
  } catch (error) {
    console.log(error)
  }

  return {
    pageOrientation: 'landscape',
    pageSize: 'A4',
    pageMargins: [40, 90, 40, 25],
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
      if (pageCount > 1) {
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
          text: 'MONITORING DATA PERJANJIAN SEWA MENYEWA', alignment: (currentPage % 1) ? 'left' : 'center'
        },
        { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
        { text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 10, bold: true, alignment: 'center', },
        { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
        { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
      ]
    },
    content: [
      {
        margin: [-37, 10, 0, 0],
        headerRows: 1,
        //alignment: 'center',
        table: {
          widths: [15, 60, 60, 150, 80, 80, 100, 60, 70, 70],
          headerRows: 2,
          dontBreakRows: true,
          unbreakable: true,
          body: [
            [{ rowSpan: 2, text: 'NO', style: 'subHeader' },
            { rowSpan: 2, text: 'TWINBLOK', style: 'subHeader' },
            { rowSpan: 2, text: 'NAMA UNIT', style: 'subHeader' },
            { rowSpan: 2, text: 'NAMA PENGHUNI / PIC', style: 'subHeader' },
            { rowSpan: 2, text: 'NIK', style: 'subHeader' },
            { rowSpan: 2, text: 'NOMOR PESERTA', style: 'subHeader' },
            { rowSpan: 2, text: 'NO PERJANJIAN SEWA', style: 'subHeader' },
            { rowSpan: 2, text: 'TGL MULAI SEWA', style: 'subHeader' },

            { colSpan: 2, text: 'JENIS PENGHUNI', style: 'subHeader' },
              '',
            ],
            ['', '', '', '', '', '', '', '', { text: 'INDIVIDU', style: 'subHeader' }, { text: 'PERUSAHAAN', style: 'subHeader' }],

            ...dataContent

          ]
        },
        layout: 'Borders',

      }

    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      subHeader: {
        fontSize: 9,
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
