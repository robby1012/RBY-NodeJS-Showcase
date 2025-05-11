const moment = require('moment')
const { isNumber } = require("validate.js");
function currency(curr) {
    var data;
    /*  if (!isNumber(curr)) {
         data = (parseInt(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
     } else if (isNumber(curr)) {
         data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
     } */
    if (!isNumber(curr)) {
        data = (parseInt(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else if (isNumber(curr)) {
        data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    var str = data.toString();

    var comma = str.split('.');
    var txt = comma[0].replace(/,/g, '.')
    var rp = txt

    return rp
}
module.exports = function (data) {
  moment.locale('id');
  //console.log('dataReport', data)
  var content = []

  try{
  if(data[0].jenis_registrasi.toUpperCase() === 'I'){
    var letterDate = moment().format('DD MMMM YYYY')
    var tenantsName = data[0].pihak2_nama_lengkap != null ? data[0].pihak2_nama_lengkap : '-'
    var rusunawaName = data[0].nama_rusun != null ? data[0].nama_rusun : '-'
    var roomNumber = data[0].nama_unit != null ? data[0].nama_unit : '-'
    var lokasiDetail = data[0].lokasi != null ? data[0].lokasi : '-'
    var rusunawaLocation = data[0].provinsi != null ? data[0].provinsi : '-'
    var kontakRusun = 'Telp. ' + (data[0].telpon != null ? data[0].telpon : '-') + ' Fax. ' + (data[0].fax != null ? data[0].fax : '-')
    var referenceNumber = '       '
    var referenceCode = data[0].initial_nama_rusun != null ? data[0].initial_nama_rusun : '-'
    var referenceSpecialCode = data[0].initial_nama_daerah != null ? data[0].initial_nama_daerah : '-'
    var referenceDate = moment().format('MMYYYY')
    var referenceMonth = '   '
    var referenceYear = '    '
    var agreementNumber = data[0].no_kontrak_sewa != null ? data[0].no_kontrak_sewa : '-'
    var dueDate = data[0].tgl_berakhir_sewa != null ? moment(data[0].tgl_berakhir_sewa).format('DD MMMM YYYY') : '-'
    content.push(
      {
        margin: [0, -30, 0, 0],
        table: {

          widths: [50, 400],
          body: [
            [{
              rowSpan: 4,
              text: ''
            },
            { text: 'PENGELOLA RUMAH SUSUN SEWA BPJS KETENAGAKERJAAN', fontSize: 11, bold: true, alignment: 'center' }
            ],
            ['', { text: rusunawaName, fontSize: 11, bold: true, alignment: 'center' }],
            ['', { text: lokasiDetail + ' ' + rusunawaLocation, fontSize: 11, bold: true, alignment: 'center' }],
            ['', { text: kontakRusun, fontSize: 10, italics: true, alignment: 'center' }]

          ]
        },
        layout: 'noBorders'
      },
      {
        margin: [0, 35, 0, 0],
        style: 'bodyContent',
        table: {
          body: [
            [{
              text: 'Nomor : ' + referenceNumber + '/' + referenceCode + '/' + referenceSpecialCode + '/' + referenceDate + '' +
                referenceYear + '                                                                         ' + letterDate + '\n\n\n', fontSize: 12, bold: false
            }],
            [{ text: 'Yth.\n' }],
            [{ text: 'Bapak/Ibu ' + tenantsName + '\n' }],
            [{ text: 'Rusunawa ' + rusunawaName + '\n' }],
            [{ text: 'Kamar ' + roomNumber + '\n' }],
            [{ text: rusunawaLocation + '\n\n\n\n' }]
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'perihal',
        alignment: 'justify',
        text: [
          'Perihal : Pemberitahuan Jatuh Tempo Perjanjian\n\n\n',
          'Dengan ini kami beritahukan bahwa perjanjian sewa Rusunawa ' + rusunawaName + ' dengan nomor perjanjian ' +
          agreementNumber + ' akan jatuh tempo pada tanggal ' + dueDate + '.\n\n ',
          'Apabila bapak/ibu ingin melanjutkan Sewa Rusunawa tersebut, maka perjanjian sewa Rusunawa dapat dilakukan ',
          'perpanjangan, dengan melakukan koordinasi dengan pihak pengelola dan menyelesaikan seluruh administrasi yang sesuai dengan prosedur.\n\n',
          'Demikian pemberitahuan kami atas perhatian bapak/ibu kami ucapkan terima kasih.\n\n',
        ],

      },
      {
        style: 'perihal',
        alignment: 'justify',
        text: [
          'Salam hormat,\n\n\n\n\n\n\n',
          data[0].pihak1_nama_lengkap+'\n',
          'Housing Manager'
        ],
        unbreakable:true
      }
    )
  }else if(data[0].jenis_registrasi.toUpperCase() === 'P'){
    var letterDate = moment().format('DD MMMM YYYY')
    var tarifSewa = data[0].tarif.toString()
    var tenantsName = data[0].pihak2_nama_lengkap != null ? data[0].pihak2_nama_lengkap : '-'
    var rusunawaName = data[0].nama_rusun != null ? data[0].nama_rusun : '-'
    var roomNumber = data[0].nama_unit != null ? data[0].nama_unit : '-'
    var lokasiDetail = data[0].lokasi != null ? data[0].lokasi : '-'
    var rusunawaLocation = data[0].provinsi != null ? data[0].provinsi : '-'
    var kontakRusun = 'Telp. ' + (data[0].telpon != null ? data[0].telpon : '-') + ' Fax. ' + (data[0].fax != null ? data[0].fax : '-')
    var referenceNumber = '       '
    var referenceCode = data[0].initial_nama_rusun != null ? data[0].initial_nama_rusun : '-'
    var referenceSpecialCode = data[0].initial_nama_daerah != null ? data[0].initial_nama_daerah : '-'
    var referenceDate = moment().format('MMYYYY')
    var referenceMonth = '   '
    var referenceYear = '    '
    var agreementNumber = data[0].no_kontrak_sewa != null ? data[0].no_kontrak_sewa : '-'
    var dueDate = data[0].tgl_berakhir_sewa != null ? moment(data[0].tgl_berakhir_sewa).format('DD MMMM YYYY') : '-'
    var sum_tarif = 0
    var content_pribadi = []
    var content_perusahaan = []
    var body = []
    for (let i = 0; i < data.length; i++) {
      body.push(
        [
          { text: (i + 1), alignment: 'center', fontSize: 10 }, 
          { text: data[i].nama_blok, alignment: 'center', fontSize: 10} , 
          { text: data[i].nama_unit, alignment: 'center', fontSize: 10} , 
          { text: 'Rp. ' + currency(tarifSewa)+',-', alignment: 'center', fontSize: 10}
        ]
      )
      sum_tarif+=parseFloat(tarifSewa)
    }
    content.push(
      {
        margin: [0, -30, 0, 0],
        table: {

          widths: [50, 400],
          body: [
            [{
              rowSpan: 4,
              text: ''
            },
            { text: 'PENGELOLA RUMAH SUSUN SEWA BPJS KETENAGAKERJAAN', fontSize: 11, bold: true, alignment: 'center' }
            ],
            ['', { text: rusunawaName, fontSize: 11, bold: true, alignment: 'center' }],
            ['', { text: lokasiDetail + ' ' + rusunawaLocation, fontSize: 11, bold: true, alignment: 'center' }],
            ['', { text: kontakRusun, fontSize: 10, italics: true, alignment: 'center' }]

          ]
        },
        layout: 'noBorders'
      },
      {
        margin: [0, 35, 0, 0],
        style: 'bodyContent',
        table: {
          body: [
            [{
              text: 'Nomor : ' + referenceNumber + '/' + referenceCode + '/' + referenceSpecialCode + '/' + referenceDate + '' +
                referenceYear + '                                                                         ' + letterDate + '\n\n\n', fontSize: 12, bold: false
            }],
            [{ text: 'Yth. \n' }],
            [{ text: 'Pimpinan ' + tenantsName + '\n' }],
            [{ text: 'Rusunawa ' + rusunawaName + '\n' }],
            [{ text: 'Kamar ' + roomNumber + '\n' }],
            [{ text: rusunawaLocation + '\n\n\n\n' }]
          ]
        },
        layout: 'noBorders'
      },

      {
        style: 'perihal',
        alignment: 'justify',
        text: [
          'Perihal : Pemberitahuan Jatuh Tempo Perjanjian\n\n\n',
          'Dengan ini kami beritahukan bahwa perjanjian sewa Rusunawa ' + rusunawaName + ' dengan nomor perjanjian ' +
          agreementNumber + ' akan jatuh tempo pada tanggal ' + dueDate + '.\n ',

        ]

      },
      {
        margin: [0, 0, 10, 10],
        style: 'perihal',
        alignment: 'center',
        headerRows:1,
        table: {

            widths: [30, 100, 100, 130],
            body: [
                [
                    { text: 'NO', fontSize: 10, bold: true, alignment: 'center' },
                    { text: 'TWIN BLOK ', fontSize: 10, bold: true, alignment: 'center' },
                    { text: 'NO KAMAR', fontSize: 10, bold: true, alignment: 'center' },
                    { text: 'JUMLAH TAGIHAN', fontSize: 10,  bold: true, alignment: 'center' },
                ],
                ...body,
                [
                  { text: 'TOTAL', alignment: 'center', fontSize: 10,bold:true,colSpan:3 }, 
                  { text: ''} , 
                  { text: ''} , 
                  { text: 'Rp. ' + currency(sum_tarif)+',-', alignment: 'center', fontSize: 10}
                ]

               
            ],
        },
    },
      {
        style: 'perihal',
        alignment: 'justify',
        text: [
          'Apabila bapak/ibu ingin melanjutkan Sewa Rusunawa tersebut, maka perjanjian sewa Rusunawa dapat dilakukan ',
          'perpanjangan, dengan melakukan koordinasi dengan pihak pengelola dan menyelesaikan seluruh administrasi yang sesuai dengan prosedur.\n\n',
          'Demikian pemberitahuan kami atas perhatian bapak/ibu kami ucapkan terima kasih.\n\n',
        ],

      },
      {
        style: 'perihal',
        alignment: 'justify',
        text: [
          'Salam hormat,\n\n\n\n\n\n\n' + data[0].pihak1_nama_lengkap + '\n',
          'Housing Manager'
        ],
        unbreakable:true

      },
    )
  }
  }catch(e){
    console.log(e)
  }

  
  return {
    pageSize: 'A4',
    pageOrientation: 'potrait',
    pageMargins: [50, 50, 50, 50],
    content: [
      ...content
    ],
    styles: {
      perihal: {
          fontSize: 11,

      },
      subHeader: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
      },
      bodyContent: {
        fontSize: 11,

      },
      textBody: {
          fontSize: 9,

      },
      footer: {
          fontSize: 13,
      }
  }

  }
}
