const moment = require('moment')
module.exports = function (data) {
  try {
    console.log(data);
    moment.locale('id');
    //console.log(data[0].unit)
    var namaRusun = data[0].nama_rusun
    var dataContent = []
    for (let i = 0; i < data.length; i++) {
      dataContent.push(
        [{ text: (i + 1), alignment: 'center', fontSize: 10 },
        { text: data[i].tgl_request != null ? moment(data[i].tgl_request).format("DD-MMM-YY") : '', fontSize: 10 },
        { text: data[i].no_wo, fontSize: 10 },
        { text: data[i].title_wo, fontSize: 10 },
        { text: data[i].nama_wo_tipe, fontSize: 10 },
        { text: data[i].nama_unit, fontSize: 10 },
        { text: data[i].completion_notes, fontSize: 10 },
        { text: data[i].status == 'C' ? 'CLOSED-SELESAI' : data[i].status == 'A' ? 'ASSIGN' : 'OPEN', fontSize: 10 },
        { text: data[i].petugas_wo === null ? '' : data[i].petugas_wo.toUpperCase(), fontSize: 10 },
        { text: data[i].deskripsi_wo, fontSize: 10 },

        ]
      )
    }

    return {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      pageMargins: [40, 130, 40, 25],
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
          { text: '   ' + namaRusun, fontSize: 9, bold: true, margin: [10, 0, 0, 0], },
          { text: '   ' + data[0].lokasi, fontSize: 9, bold: true, margin: [10, 0, 0, 0], },
          { text: '   ' + data[0].provinsi, fontSize: 9, bold: true, margin: [10, 0, 0, 0], },
          {
            style: 'header',
            text: 'LAPORAN REKAPITULASI WORK ORDER', alignment: (currentPage % 1) ? 'left' : 'center'
          },
          { text: 'Periode Laporan : ' + moment(data[0].periode).format('MMMM YYYY').toUpperCase(), fontSize: 10, bold: true, alignment: 'center', },
          { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -60, 0, 0] },
          { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },

        ]
      },

      content: [

        {
          margin: [-30, 10, 0, 0],
          table: {

            widths: [20, 50, 100, 90, 90, 70, 60, 100, 70, 80],
            headerRows: 1,
            body: [
              [{ text: 'NO', style: 'subHeader' },
              { text: 'TANGGAL', style: 'subHeader' },
              { text: 'No WO', style: 'subHeader' },
              { text: 'PERMASALAHAN', style: 'subHeader' },
              { text: 'JENIS ORDER', style: 'subHeader' },
              { text: 'NAMA UNIT', style: 'subHeader' },
              { text: 'TINDAKAN', style: 'subHeader' },
              { text: 'STATUS PENYELESAIAN', style: 'subHeader' },
              { text: 'PETUGAS', style: 'subHeader' },
              { text: 'KETERANGAN', style: 'subHeader' },

              ],
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
  catch (e) {
    console.log(e)
  }
}
