/* module.exports = function(data) {
  const dataKontrak = data.length > 0 ? data[0] : {}
  // looping data kelamin
  const dataUnit = []
  for (let i = 0; i < dataKontrak.unit.length; i++) {
    dataUnit.push(
      [dataKontrak.unit[i].id_unit, dataKontrak.unit[i].kode_blok, dataKontrak.unit[i].nama_unit]
    )
  }
  return {
    content: [
      {text: 'Tables', style: 'header'},
      'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
      {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
      'The following table has nothing more than a body array',
      {
        style: 'tableExample',
        table: {
          body: [
            ['No Kontrak Sewa', 'KPJ', 'Nama'],
            [dataKontrak.no_kontrak_sewa, dataKontrak.pihak2_kpj, dataKontrak.pihak2_nama_lengkap]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['ID Unit', 'KOde Blok', 'Nama Unit'],
            ...dataUnit
          ]
        }
      },
      {text: 'A simple table with nested elements', style: 'subheader'},
      'It is of course possible to nest any other type of nodes available in pdfmake inside table cells'
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }

  }
}
 */
module.exports = function (data) {
    console.log(data);
    var dataBody = [];
    dataBody.push(['No', 'KODE'],)
    for (let i = 0; i < data.length; i++) {
        dataBody.push([i.toString(), data[i].kode_agama]);
    }
    //console.log(dataBody);
    return {
        pageSize: 'A4',
        pageOrientation: 'potrait',
        pageMargins: [40, 60, 40, 60],
        content: [
            {
                margin: [0, -30, 0, 0],
                table: {

                    widths: [50, 400],
                    body: [
                        [{
                            rowSpan: 4,
                            image: 'data:image/png;base64,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',
                            width: 65,
                            height: 65
                        },
                        { text: 'PENGELOLA RUMAH SUSUN SEWA BPJS KETENAGAKERJAAN', fontSize: 12, bold: true, alignment: 'center' }
                        ],
                        ['', { text: 'KABIL', fontSize: 11, bold: true, alignment: 'center' }],
                        ['', { text: 'Jalan Hang Kesturi - Kabil - Batam', fontSize: 11, bold: true, alignment: 'center' }],
                        ['', { text: 'Telp. (0778) 711870 - 711871 Fax (0778) 711873', fontSize: 10, italics: true, alignment: 'center' }],

                    ]
                },
                layout: 'noBorders'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 5,
                    x2: 540, y2: 5,
                    lineWidth: 2
                }
                ]
            },
            {
                margin: [0, 5, 0, 0],
                style: 'headerContent',
                table: {
                    widths: [100, 20, 'auto'],
                    body: [
                        [{ text: 'Invoice No.', bold: true }, ':', '0538 / RR / KBL / AR /'],
                        [{ text: 'Due From', bold: true }, ':', 'PT.CITRA TUBINDO'],
                        [{ text: 'Messrs', bold: true }, ':', 'NGADIONO'],


                    ]
                },
                layout: 'noBorders'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 3,
                    x2: 540, y2: 3,
                    lineWidth: 2
                }
                ]
            },
            {
                margin: [0, 0, 0, 0],
                text: 'PARTICULAR',
                fontSize: 10,
                bold: true,
                alignment: 'center'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 3,
                    x2: 540, y2: 3,
                    lineWidth: 2
                }
                ]
            },
            {
                margin: [-28, 15, 0, 0],
                style: 'bodyContent',
                table: {
                    body: [
                        ['Blok / Nomor', ': 39 ROOM', ''],
                        ['Rate/KWH', ':  Rp. 1.000.000,00', ''],
                        [' ', ' ', ' '],
                        ['Demand Charges', ': 1.3 x Rp. 1.000.000,00', ''],
                        ['PJU', ':   Rp. 1.000.000,00', ''],
                        ['Rate/M3', ':   Rp. 1.000.000,00', 'Water Meter Maintenance (WMM) : 1.000.000,00'],
                        [' ', ' ', ' '],
                        ['Tgl Jatuh tempo', ': 24 Januari 2020', ''],
                    ]
                },
                layout: 'noBorders'
            },
            {
                margin: [352, -120, 0, 0],
                style: 'bodyContent',
                table: {
                    widths: [50, 120],
                    body: [
                        [{ text: 'Room', border: [true, true, false, false] }, { text: 'Rp. 100.000.000.000.000,00', border: [true, true, true, false] }],
                        [{ text: 'Deposit', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Tv Kabel', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Electricity', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Water', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Sewa ac', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Pajak Sewa', border: [true, false, false, false] }, { text: 'Rp.', border: [true, false, true, false] }],
                        [{ text: 'Grand Total', border: [true, false, false, true] }, { text: 'Rp.', border: [true, true, true, true] }],
                    ]
                },
                //layout: 'noBorders'
            },
            {
                margin: [-32, 15, 0, 0],
                style: 'bodyContent',
                alignment: 'center',

                table: {
                    widths: [55, 55, 55, 55, 55, 55, 55, 55, 55],
                    body: [
                        [{ rowSpan: 2, text: 'Meter' }, 'Demand', 'Start', 'End', 'Consume', 'Amount', 'PJU', 'WMM', 'TOTAL'],
                        ['', 'Charges', 'Meter', 'Meter', 'End - Start', 'Consume', '(Rupiah)', '(Rupiah)', '(Rupiah)'],
                        ['Electricity', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample'],
                        ['Water', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample', 'dataSample'],

                    ]
                },
                //layout: 'noBorders'
            },
            {
                margin: [0, 15, 0, 0],
                style: 'bodyContent',
                table: {
                    body: [
                        ['Periode Sewa Kamar Dari Tanggal ', ':', '24 Januari 2020 s/d 23 Februari 2020'],
                        ['Meter Listrik & Air Dicatat Mulai Tanggal ', ':', '21 November 2019 - 20 Desember 2019']

                    ]
                },
                layout: 'noBorders'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 10,
                    x2: 540, y2: 10,
                    lineWidth: 2
                }
                ]
            },
            {
                text: [
                    'NB: Jika pembayaran melalui transfer Bank, harap bukti transfer diserahkan ke kantor pengelola / di fax ke  (0778) 711873'
                ],
                fontSize: 9,
                bold: true,
                italics: true,
                margin: [0, 3, 0, 0]
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 5,
                    x2: 540, y2: 5,
                    lineWidth: 2
                }
                ]
            },
            {
                margin: [0, 15, 0, 0],
                style: 'headerContent',
                table: {
                    widths: [350, 100],
                    heights: [25, 25],
                    body: [
                        ['Note: Keterlambatan pembayaran akan dikenakan denda 10%\nSilahkan Transfer Pembayaran Anda di:', 'Batam, 1 Januari 2020'],
                        [{ text: 'No Rek, 109 001 365  2052. PT Binajasa Abadikarya\nBank Mandiri', bold: true }, ''],
                        ['Jln. Raja Ali Haji - Batam', { text: 'Syamsuddin', alignment: 'center' }]
                    ]

                },
                layout: 'noBorders'

            },

            //[DETAIL INVOICE]

            {
                pageOrientation: 'landScape',
                pageBreak: 'before',
                lineHeight: 3,
                margin: [0, -5, 0, 0],
                table: {
                    widths: ['100%'],
                    body: [
                        [{ text: 'Detail Invoice', fontSize: 15, bold: true, alignment: 'center' }],
                    ]
                },
                layout: 'noBorders',
                //pageOrientation: 'landscape'
            },
            {
                margin: [600, -40, 0, -5],
                //width:[],
                table: {
                    body: [
                        [{ colSpan: 2, text: 'Keterangan Tarif Listrik Dan Air\n\n', border: [true, true, true, false] }, ''],
                        [{ text: 'Rate/KWH', alignment: 'left', border: [true, false, false, false] }, { text: 'Rp  1.262 ', border: [false, false, true, false] }],
                        [{ text: 'Demand Charges', alignment: 'left', border: [true, false, false, false] }, { text: '1.3 x Rp.  47.510 ', border: [false, false, true, false] }],
                        [{ text: 'PJU', alignment: 'left', border: [true, false, false, false] }, { text: 'Rp 6%', border: [false, false, true, false] }],
                        [{ text: 'Rate/M3', alignment: 'left', border: [true, false, false, false] }, { text: 'Rp  7.500 ', border: [false, false, true, false] }],
                        [{ text: '', border: [true, false, false, true] }, { text: 'Rp.  10.500 ', border: [false, true, true, true] }],
                    ]
                },
                fontSize: 11,

            },
            {
                margin: [0, -30, 0, 0],
                table: {
                    body: [
                        ['Company Name', ':', 'PT....'],
                        ['Messrs', ':', 'PT....'],
                    ]
                },
                layout: 'noBorders',
                fontSize: 11,

            },
            {
                //lineHeight: 2,
                margin: [-25, 15, 0, 0],
                bold: true,
                table: {
                    widths: ['auto', 'auto', 'auto', 45, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto',],
                    headerRows: 2,
                    bold: true,
                    body: [
                        //THEADER
                        [{ rowSpan: 2, text: '\nNo', bold: true }, { rowSpan: 2, text: '\nBlock' }, { rowSpan: 2, text: '\nRoom No' }, { rowSpan: 2, text: 'Room Priod Of' }, 'Room Amount', 'AC Room', 'Deposit', { rowSpan: 2, text: '\nMeter' }, 'Demand Charges', 'Start Meter', 'End Meter', 'Consume End-Start', 'Amount Consume', 'PJU', 'WMM', 'Total'],
                        ['', '', '', '', '( Rupiahs )', '( Rupiahs )', '( Rupiahs )', '', '( Rupiahs )', '', '', '', '( Rupiahs )', '( Rupiahs )', '( Rupiahs )', '( Rupiahs )'],


                        //TBODY

                        //Enter
                        [{ text: '1', bold: true }, { text: 'TB04' }, { text: '104' }, { text: '29 des 19\n29 des 19' }, '664.444', '185.000', '-', { text: 'Electricity\nWater' }, '68.626', '7.590\n550', '7.746\n565', '156\n15', '196.872\n112.500', '15.930', '\n10.500', '281.428\n123.000'],


                        //RowSpan
                        [{ rowSpan: 2, text: '\n1', bold: true }, { rowSpan: 2, text: '\nTB04' }, { rowSpan: 2, text: '\n104' }, { text: '29 des 19' }, { rowSpan: 2, text: '664.444' }, '185.000', '-', { text: 'Electricity' }, '68.626', '7.590', '7.746', '156', '196.872', '15.930', '-', '281.428'],
                        ['', '', '', '29 des 19', '', '', '', 'Water', '', '550', '565', '15', '112.500', '', '10.500', '123.000'],




                        //TFOOT
                        [{ rowSpan: 2, colSpan: 2, text: '\nTotal' }, '', { rowSpan: 2, text: '\n39' }, { rowSpan: 2, text: '\nRoom' }, { rowSpan: 2, text: '25.740.000' }, { rowSpan: 2, text: '25.740.000' }, '-', 'Electricity', '2.333.284', '290.617', '301.244', '10.627', '13.411.274', '944.673', '-', '16.689.231'],
                        ['', '', '', '', '', '', '-', 'Water', '-', '14.034', '14.564', '530', '3.975.000', '', '357.000', '4.332.000'],


                    ]
                },
                //layout: 'noBorders',
                fontSize: 10,
                alignment: 'center'

            },



            {
                pageOrientation: 'potrait',
                pageBreak: 'before',
                margin: [0, -30, 0, 0],
                table: {

                    widths: [50, 400],
                    body: [
                        [{
                            rowSpan: 4,
                            image: 'data:image/png;base64,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',
                            width: 65,
                            height: 65
                        },
                        { text: 'PT. Binajasa Abadikarya', fontSize: 12, bold: true, alignment: 'center' }
                        ],
                        ['', { text: 'Pengelola Rumah Susun Jamsostek', fontSize: 11, bold: true, alignment: 'center' }],
                        ['', { text: 'KABIL', fontSize: 11, bold: true, alignment: 'center' }],
                        ['', { text: 'Jalan Hang Kesturi - Kabil - Batam', fontSize: 11, bold: true, alignment: 'center' }],
                        ['', { text: 'Telp. (0778) 711870 - 711871 Fax (0778) 711873', fontSize: 10, alignment: 'center' }],

                    ]
                },
                layout: 'noBorders'
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 5,
                    x2: 540, y2: 5,
                    lineWidth: 1
                }
                ]
            },
            {
                canvas: [{
                    type: 'line',
                    x1: -30, y1: 2,
                    x2: 540, y2: 2,
                    lineWidth: 1
                }
                ]
            },
            {
                margin: [0, 5, 0, 0],
                style: 'headerContent',
                table: {
                    widths: [100, 20, 'auto'],
                    body: [
                        [{ text: 'Invoice No.', bold: true }, ':', '0538 / RR / KBL / AR /'],
                        [{ text: 'Due From', bold: true }, ':', 'PT.CITRA TUBINDO'],
                        [{ text: 'Messrs', bold: true }, ':', 'ELIS NURHAYATI'],
                        ['', '', '7788073188\n']


                    ]
                },
                layout: 'noBorders'
            },
            {
                text: '\n'
            },
            {
                style: 'bodyContent',
                bold: true,
                table: {
                    widths: [20, 90, 150, 100, 100],
                    body: [
                        [{ rowSpan: 2, text: 'No', alignment: 'center' }, { rowSpan: 2, text: 'Block/Room', alignment: 'center' }, { rowSpan: 2, text: 'Description', alignment: 'center' }, { rowSpan: 2, text: 'Period of\nPayment', alignment: 'center' }, { rowSpan: 2, text: 'Total\n(Rupiah)', alignment: 'center' }],
                        ['', '', '', '', ''],
                        ['1', 'Room 39 Unit',
                            {
                                table: {
                                    body: [
                                        ['Room'],
                                        ['Electricty'],
                                        ['Water'],
                                        ['AC'],
                                        ['Deposit'],

                                    ],

                                }, layout: 'noBorders',
                            }

                            , 'Desember 2019',
                            {
                                table: {
                                    body: [
                                        ['Rp 25.740.000'],
                                        ['Rp 16.689.231'],
                                        ['Rp 4.332.000'],
                                        ['Rp 5.825.000'],
                                        ['Rp         -'],

                                    ],

                                }, layout: 'noBorders',
                            }

                        ],
                        ['', '', '', 'Grand Total', 'Rp 52.586.231'],

                    ]
                },
                fontSize: 12,
                //layout: 'noBorders'
            },
            {
                text: '\n'
            },
            {

                table: {
                    widths: ['auto', '94%'],
                    body: [
                        [{ text: 'Say:', border: [false, false, false, false], bold: true }, '']
                    ]
                },
            },
            {
                style: 'headerContent',
                text: [
                    '\n',
                    'Tanggal Jatuh Tempo Pembayaran : 24 Januari 2020\n',
                    'Note : Keterlambatan pembayaran akan dikenakan denda 10%\n',
                    'Please wire transferred your payment at account\n',
                    'No. 109 001 365 2052. PT. Binajasa Abadikarya\n',
                    'at Bank Mandiri\n',
                    'Cab. Raja Ali Haji- Batam.'

                ]

            },
            {
                text: '\n'
            },

            {
                table: {
                    widths: [240, 240],
                    alignment: 'center',
                    body: [
                        [
                            {
                                text: [
                                    { text: 'Received By\n', bold: true, alignment: 'center' },
                                    { text: 'KOSONG-NON VALUE', alignment: 'center', italics: true },
                                ]

                            },
                            {
                                text: [
                                    { text: 'Batam, 01 Desember 2019\n', bold: true, alignment: 'center' },
                                    { text: 'Kepala Cabang', alignment: 'center', italics: true },
                                ]

                            }
                        ]

                    ],
                },
                layout: 'noBorders',

            },
            {
                margin: [0, 121, 0, 0],
                table: {
                    widths: [240, 240],
                    body: [
                        [
                            {
                                canvas: [{
                                    type: 'line',
                                    x1: 35, y1: 14,
                                    x2: 205, y2: 14,
                                    lineWidth: 2
                                }
                                ]
                            },

                            {
                                text: [
                                    { text: 'Syamsudin\n', bold: true, alignment: 'center', italics: true },
                                    { text: 'Kepala Cabang', alignment: 'center', italics: true },
                                ]

                            },
                        ]

                    ],
                },
                layout: 'noBorders',

            },


            {
                canvas: [{
                    type: 'line',
                    x1: 290, y1: -17,
                    x2: 460, y2: -17,
                    lineWidth: 2
                }
                ]
            },
            {
                text: 'Nama:', italics: true, margin: [35, -15, 0, 0]
            }

        ],
        styles: {
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