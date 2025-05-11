const { isNumber } = require("validate.js");
module.exports = function (data) {
  console.log(data)
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
  function inWords(num) {
    if (num === 0) {
      return 'Nol'
    }
    bilangan = String(num);
    var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    var kata = new Array('Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
    var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

    var panjang_bilangan = bilangan.length;

    if (panjang_bilangan > 15) {
      kaLimat = "Diluar Batas";
      return kaLimat;
    }

    for (i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-(i), 1);
    }

    i = 1;
    j = 0;
    kaLimat = "";


    while (i <= panjang_bilangan) {

      subkaLimat = "";
      kata1 = "";
      kata2 = "";
      kata3 = "";
      if (angka[i + 2] != "0") {
        if (angka[i + 2] == "1") {
          kata1 = "Seratus";
        } else {
          kata1 = kata[angka[i + 2]] + " Ratus";
        }
      }

      if (angka[i + 1] != "0") {
        if (angka[i + 1] == "1") {
          if (angka[i] == "0") {
            kata2 = "Sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "Sebelas";
          } else {
            kata2 = kata[angka[i]] + " Belas";
          }
        } else {
          kata2 = kata[angka[i + 1]] + " Puluh";
        }
      }
      if (angka[i] != "0") {
        if (angka[i + 1] != "1") {
          kata3 = kata[angka[i]];
        }
      }
      if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
      }
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;

    }
    if ((angka[5] == "0") && (angka[6] == "0")) {
      kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
    }

    return kaLimat;

  }
  const dataKontrak = data.length > 0 ? data[0] : {}
  var bulan = new Array();
  bulan[0] = "Januari";
  bulan[1] = "Februari";
  bulan[2] = "Maret";
  bulan[3] = "April";
  bulan[4] = "Mei";
  bulan[5] = "Juni";
  bulan[6] = "Juli";
  bulan[7] = "Agustus";
  bulan[8] = "September";
  bulan[9] = "Oktober";
  bulan[10] = "November";
  bulan[11] = "Desember";

  //EN Month
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  //IN Minggu(day)
  var minggu = new Array(7);
  minggu[0] = "Minggu";
  minggu[1] = "Senin";
  minggu[2] = "Selasa";
  minggu[3] = "Rabu";
  minggu[4] = "Kamis";
  minggu[5] = "Jumat";
  minggu[6] = "Sabtu";

  //EN Week(day)
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var dateSewa = new Date(data[0].tgl_kontrak_sewa.toString());

  var hariSewa = minggu[dateSewa.getDay()];
  var dayCont = weekday[dateSewa.getDay()];
  var tglSewa = dateSewa.getDate();
  var blnSewa = bulan[dateSewa.getMonth()];
  var monthCont = month[dateSewa.getMonth()];
  var yearCont = dateSewa.getFullYear();

  var jmlhBlnSewa = dataKontrak.jmlh_bulan_sewa;

  //IN
  var tglStart = dataKontrak.tgl_mulai_sewa.getDay() + ' ' + bulan[dataKontrak.tgl_mulai_sewa.getMonth()] + ' ' + dataKontrak.tgl_mulai_sewa.getFullYear();
  //EN
  var dateStart = dataKontrak.tgl_mulai_sewa.getDate() + ' ' + month[dataKontrak.tgl_mulai_sewa.getMonth()] + ' ' + dataKontrak.tgl_mulai_sewa.getFullYear();

  //IN
  var tglFinish = dataKontrak.tgl_berakhir_sewa.getDate() + ' ' + bulan[dataKontrak.tgl_berakhir_sewa.getMonth()] + ' ' + dataKontrak.tgl_berakhir_sewa.getFullYear();
  //EN
  //var dateFinish = dataKontrak.tgl_berakhir_sewa.getDate() + ' ' + month[dataKontrak.tgl_berakhir_sewa.getMonth()] + ' ' + dataKontrak.tgl_berakhir_sewa.getFullYear();


  /* [END] Date sewa */

  /* [START] Date Sewa */

  //Pihak 1
  var noKontrak = data[0].no_kontrak_sewa === null ? '-' : dataKontrak.no_kontrak_sewa.toUpperCase();
  var namaPihak1 = dataKontrak.pihak1_nama_lengkap === null ? '-' : dataKontrak.pihak1_nama_lengkap.toUpperCase();
  var jabatanPihak1 = dataKontrak.pihak1_jabatan === null ? '-' : dataKontrak.pihak1_jabatan.toUpperCase();
  var ttdNamaPihak1 = dataKontrak.pihak1_ttd_nama;
  var ttdJabatanPihak1 = dataKontrak.pihak1_ttd_jabatan;
  var ttdTitlePihak1 = dataKontrak.pihak1_ttd_title;
  var alamatPihak1 = dataKontrak.pihak1_alamat === null ? '-' : (dataKontrak.pihak1_alamat + ', ' + dataKontrak.kecamatan + ', ' + dataKontrak.provinsi).toUpperCase();


  //Pihak 2
  var namaPihak2 = dataKontrak.pihak2_nama_lengkap === null ? '-' : dataKontrak.pihak2_nama_lengkap.toUpperCase();
  var nppPihak2 = dataKontrak.pihak2_npp === null ? '' : dataKontrak.pihak2_npp.toUpperCase();
  var perusahaanPihak2 =
    dataKontrak.pihak2_nama_perusahaan === null ? '-'
      : dataKontrak.pihak2_nama_perusahaan.toUpperCase()
  var jabatanPihak2 = data[0].pihak2_departemen_prs === null ? '-'
    : data[0].pihak2_departemen_prs.toUpperCase()
  var jabatanPrs = []
  /* [
    { text: 'Jabatan' },
    ':',
    { text: jabatanPihak2, bold: true }
  ],
  [
    {
      text: [
        'Perusahaan  '
      ]
    },
    ':',
    { text: perusahaanPihak2, bold: true }
  ], */
  data[0].jenis_registrasi == 'P' ?
    jabatanPrs.push(
      [
        { text: 'Jabatan' },
        ':',
        { text: jabatanPihak2, bold: true }
      ],
      [
        {
          text: [
            'Perusahaan  '
          ]
        },
        ':',
        { text: perusahaanPihak2, bold: true }
      ]

    ) : jabatanPrs.push()
  console.log(jabatanPrs)
  var alamatPihak2 = dataKontrak.pihak2_alamat === null ? '-' : dataKontrak.pihak2_alamat.toUpperCase();

  var jmlhUnit = dataKontrak.jmlh_unit;
  var tlpPihak2 = dataKontrak.pihak2_telpon === null ? '-' : dataKontrak.pihak2_telpon;
  var kpjPihak2 = dataKontrak.pihak2_kpj === null ? '-' : dataKontrak.pihak2_kpj.toUpperCase();
  var twinBuilding = dataKontrak.unit[0].kode_blok;
  var tarifKamarSewa = data[0].tarif_unit[0].tarif;
  var kamarSewa = [];
  for (var i = 0; i < data[0].unit.length; i++) {
    //tarifKamarSewa += data[0].unit[i].tarif
    kamarSewa.push(['Kamar No', ':', data[0].unit[i].nama_unit])
    kamarSewa.push(['Blok', ':', data[0].unit[i].nama_blok])
  }
  var ttdNamaPihak2 = dataKontrak.pihak2_ttd_nama;
  var ttdJabatanPihak2 = dataKontrak.pihak2_ttd_jabatan;
  var ttdTitlePihak2 = dataKontrak.pihak2_ttd_title;

  //LAMPIRAN ASET INVENTARIS
  var lampiran_1 = []
  var lampiran_2 = new Array()
  var lampiran = data[0].lampiran === null ? [] : data[0].lampiran
  if (lampiran.length != 0) {
    for (var i = 0; i < data[0].lampiran.length; i++) {
      console.log(currency(lampiran[i].biaya_kehilangan))
      console.log(currency(lampiran[i].biaya_kerusakan))
      lampiran_1.push([{ text: (i + 1).toString() + '.', style: 'lampiranBody' }, { text: lampiran[i].nama_aset, style: 'lampiranBody' }, { text: lampiran[i].qty + ' ' + lampiran[i].nama_satuan, style: 'lampiranBody' }, { text: '', style: 'lampiranBody' }])
      lampiran_2.push([{ text: (i + 1).toString() + '.', style: 'lampiranBody' }, { text: lampiran[i].nama_aset, style: 'lampiranBody' }, { text: lampiran[i].qty + ' ' + lampiran[i].nama_satuan, style: 'lampiranBody' }, { text: 'Rp. ' + currency(lampiran[i].biaya_kehilangan), style: 'lampiranBody' }, { text: 'Rp. ' + currency(lampiran[i].biaya_kerusakan), style: 'lampiranBody' }])
    }
  }
  console.log(lampiran_2)
  return {
    footer: function (currentPage, pageCount) {
      return { text: currentPage.toString(), alignment: 'center' }
    },
    pageSize: 'A4',
    pageOrientation: 'potrait',
    pageMargins: [50, 50, 50, 25],
    content: [
      {
        text: 'PERJANJIAN\nANTARA\nPIHAK PENGELOLA RUSUNAWA BPJS KETENAGAKERJAAN\nDENGAN\nPENGHUNI RUSUNAWA BPJS KETENAGAKERJAAN\nTENTANG\nSEWA MENYEWA UNIT HUNIAN\nRUSUNAWA BPJS KETENAGAKERJAAN',
        style: 'header',
        alignment: 'center'
      },
      {
        text: '\nNomor  : ' + noKontrak + ' \n\n\n',
        style: 'header',
        alignment: 'center',
      },
      {
        text: 'Pada hari ini ' + hariSewa + ' tanggal ' + tglSewa + ' bulan ' + blnSewa + ' Tahun ' + yearCont + ' di ' + data[0].provinsi + '/' + data[0].kecamatan + ', yang bertanda-tangan dibawah ini:\n',
        style: 'textBody',
      },
      {
        text: '\n'
      },
      {

        table: {
          widths: [100, 'auto', 'auto'],
          body: [
            [
              { text: 'Nama' },
              ':',
              { text: namaPihak1, bold: true }
            ],
            [
              {
                text: 'Jabatan'
              },
              ':',
              {
                text: [
                  { text: jabatanPihak1, bold: true },
                  ' Rusunawa BPJS Ketenagakerjaan ',
                  { text: '', bold: true },
                ]
              },
            ],
            [
              {
                text: [
                  'Alamat  '
                ]
              },
              ':',
              { text: alamatPihak1, bold: false }
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        style: ' textBody ',
        text: ['\nDalam jabatannya tersebut diatas untuk dan atas nama Pengelola Rumah Susun BPJS Ketenagakerjaan selaku',
          { text: ' PIHAK PERTAMA.\n', bold: true }]

      },
      {
        text: '\n'
      },
      {
        table: {
          widths: [100, 'auto', 'auto'],
          body: [
            [
              {
                text: [
                  'Nama  '
                ]
              },
              ':',
              { text: namaPihak2, bold: true }
            ],
            ...jabatanPrs,
            [
              { text: 'Alamat' },
              ':',
              { text: alamatPihak2, bold: true }
            ],
            [
              { text: 'Telp/HP' },
              ':',
              { text: tlpPihak2, bold: true }
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        style: ' textBody ',
        text: ['\nDalam jabatannya tersebut diatas untuk dan atas nama Penyewa Rumah Susun BPJS Ketenagakerjaan selaku  ',
          { text: 'PIHAK KEDUA.\n', bold: true },
          {
            text: 'PIHAK PERTAMA ',
            bold: true
          },
          'dan ',
          {
            text: 'dan PIHAK KEDUA ',
            bold: true
          },
          'untuk selanjutnya disebut ',
          {
            text: 'PARA PIHAK\n\n ',
            bold: true
          },
        ],
      },
      {
        text: [
          { text: 'PARA PIHAK ', fontSize: 12, bold: true },
          'setuju dan sepakat untuk mengadakan perjanjian Sewa Menyewa Unit Hunian Rumah Susun BPJS Ketenagakerjaan (selanjutnya disebut “Rusun BPJS Ketenagakerjaan” ) dengan ketentuan sebagai berikut :',
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        pageBreak: 'before',
        text: [
          'PASAL 1 \n ',
          'KETENTUAN UMUM\n\n',
        ]
      },
      {
        style: 'textBody',
        ol: [
          {
            text: [{ text: 'PIHAK KEDUA ', bold: true }, 'harus patuh  dan mendukung pekerjaan pengelolaan oleh', { text: 'PIHAK PERTAMA\n', bold: true }]
          },
          {
            text: [{ text: 'PARA PIHAK ', bold: true }, 'disamping mematuhi peraturan bersama juga harus mentaati Undang-Undang Peraturan Pemerintahan maupun Peraturan Daerah (Perda) tentang Rumah Susun.\n',]
          },
          {
            text: [
              { text: 'PIHAK PERTAMA ', bold: true }, { text: 'dengan ini setuju menyewakan kepada ', listType: 'none' }, { text: 'PIHAK KEDUA ', bold: true },
              'Sebanyak ' + jmlhUnit + ' (' + inWords(jmlhUnit) + ') unit Rusun BPJS Ketenagakerjaan yang terletak di:\n',
            ]
          },
          {
            table: {
              widths: [70, 'auto', 'auto'],
              body: kamarSewa
            },
            layout: 'noBorders',
            listType: 'none'
          },
          {
            text: ['Yang akan dihuni oleh ', { text: 'PIHAK KEDUA', bold: true }, ' beserta Fasilitas yang ada.']
            , listType: 'none'
          },
          {
            text: [
              { text: 'PIHAK KEDUA ', bold: true },
              'menyetujui bahwa satu/satuan Rusun BPJS Ketenagakerjaan yang disewa sebagaimana dimaksudkan pada ayat (3) perjanjian ini, dipergunakan hanya untuk tempat tinggal dan tidak diperpolehkan merubah/menambah bangunan dalam ruangan.\n',
            ],
            counter: 4
          },
          {
            text: [
              'Dalam hal ini perjanjian sewa menyewa Rusun BPJS Ketenagakerjaan ini dilakukan oleh ',
              { text: 'PIHAK KEDUA ', bold: true },
              ' sebagai hunian lebih dari satu orang dan semuanya mempunyai status sebagai karyawan dari ',
              { text: 'PIHAK KEDUA ', bold: true },
              'maka  ',
              { text: 'PIHAK KEDUA ', bold: true },
              'bertanggung jawab sepenuhnya atas keberadaan para karyawannya yang tinggal di Rusun tersebut.',
            ],
            counter: 5
          },

        ]
      },
      {
        text: '\n\n'
      },
      {
        alignment: 'center',
        style: 'header',
        //pageBreak: 'before',
        text: [
          'PASAL  2\n',
          'BIAYA SEWA\n ',

        ]
      },
      {
        style: 'textBody',
        ol: [
          {
            text: [
              { text: 'PIHAK KEDUA ', bold: true }, 'berkewajiban membayar sewa Rumah sebagaimana dimaksud pada pasal 1 (satu) Perjanjian ini kepada Pihak Pertama sebesar Rp. ' + currency(tarifKamarSewa) + ' (' + inWords(tarifKamarSewa) + 'Rupiah) per bulan dan belum termasuk biaya pajak, pemakain Fasilitas listrik (PLN), Air (ATB), dan biaya pemeliharaan ', { text: 'Air Conditioner\n', italics: true },

            ]
          },
          {
            text: [
              'Penagihan sewa dilakukan ' + jmlhBlnSewa + ' (' + inWords(jmlhBlnSewa) + ') bulan dimuka dengan menyerahkan invoice dari ',
              { text: 'PIHAK PERTAMA  ', bold: true }, 'kepada ', { text: 'PIHAK KEDUA  ', bold: true }, 'Pembayaran dilakukan oleh ', { text: 'PIHAK KEDUA  ', bold: true }, 'selambatnya 2 (dua) minggu setelah penerimaan invoice dari ', { text: 'PIHAK PERTAMA.', bold: true },
            ]
          },
          {
            text: [
              'Uang jaminan (deposit) dibayarkan oleh ',
              { text: 'PIHAK KEDUA ', bold: true }, 'kepada ', { text: 'PIHAK PERTAMA', bold: true }, ', sebesar 1 (satu) bulan uang sewa  dan dibayarkan pada waktu perjanjian sewa menyewa ditanda tangani.',
            ]
          },
          {
            text: [
              'Setiap bulan keterlambatan pembayaran, ',
              { text: 'PIHAK KEDUA ', bold: true },
              'akan dikenakan denda sebesar 10% dari harga sewa per bulan.',
            ]
          },
          {
            text: [
              'Pembayaran listrik dan air dilakukan oleh ',
              { text: 'PIHAK KEDUA', bold: true },
              ' s/d tanggal 20 bulan berjalan sesuai dengan faktur penagihan dari ',
              { text: 'PIHAK PERTAMA.', bold: true },
            ]
          }

        ]
      },
      {
        text: '\n\n'
      },
      {
        alignment: 'center',
        style: 'header',
        pageBreak: 'before',
        text: [
          'PASAL 3\n ',
          'JANGKA WAKTU DAN BERAKHIRNYA \n',
          'PERJANJIAN SEWA\n\n',
        ]
      },
      {
        style: 'textBody',
        text: [
          'Berakhirnya Surat Perjanjian ini apabila :\n',
        ]
      },
      {
        ol: [
          {
            text: [
              { text: 'PARA PIHAK ', bold: true },
              'setuju bahwa jangka waktu Sewa menyewa Rusun sebagaimana dimaksud pada Pasal 1 perjanjian ini adalah selama ' + jmlhBlnSewa + ' (' + inWords(jmlhBlnSewa) + ') ',
              { text: 'bulan terhitung mulai tanggal ' + tglStart + ' dan akan berakhir pada tanggal ' + tglFinish + '', bold: true },
            ]
          },
          {
            text: [
              { text: 'PIHAK PERTAMA ', bold: true },
              'akan meninjau kembali besarnya biaya sewa setelah perjanjian ini berakhir.',
            ]
          },
          {
            text: [
              { text: 'PARA PIHAK ', bold: true },
              'telah setuju bahwa setelah berakhirnya jangka waktu sebagaimana dimaksud ayat (1) Pasal ini, bila tidak ada pemberitahuan lebih lanjut oleh ',
              { text: 'PARA PIHAK ', bold: true },
              'maka secara otomatis perjanjian sewa ini dilanjutkan untuk waktu yang sama seperti perjanjian kontrak sebelumnya.',
            ]
          },
          {
            text: [
              'Pemberitahuan untuk penghentian kontrak oleh ',
              { text: 'PARA PIHAK ', bold: true },
              'selambat-lambatnya 3 (Tiga) bulan sebelum perjanjian sewa berakhir.',
            ]
          },
          {
            text: [
              'Bila ',
              { text: 'PARA PIHAK ', bold: true },
              'menghentikan kontrak sebelum perjanjian sewa menyewa ini berakhir, maka uang sewa yang telah dibayarkan tidak dapat dikembalikan.\n',

            ]
          },
          {
            text: [
              'Bila ',
              { text: 'PARA PIHAK ', bold: true },
              'tidak memenuhi segala kewajiban pada Pasal 5, maka perjanjian kontrak dianggap berakhir.\n',

            ]
          },
          {
            text: [
              'Setelah jangka sewa berakhir, ',
              { text: 'PIHAK KEDUA ', bold: true },
              'wajib menyerahkan unit di Rusun BPJS Ketenagakerjaan yang disewa berikut barang-barang inventarisnya kepada ',
              { text: 'PIHAK PERTAMA ', bold: true },
              'selambatnya 7 (Tujuh) hari setelah berakhirnya waktu sewa, dan bila ada kerusakan/perbaikan atau kehilangan barang inventaris, merupakan tanggung jawab ',
              { text: 'PIHAK KEDUA.', bold: true },
            ]
          },
        ]
      },
      {
        text: '\n\n'
      },
      {
        alignment: 'center',
        style: 'header',
        text: [
          'PASAL  4\n',
          'HAK DAN KEWAJIBAN PIHAK PERTAMA\n\n',
        ]
      },
      {
        style: 'textBody',
        text: [
          { text: 'PIHAK PERTAMA ', bold: true },
          'selama jangka waktu perjanjian Sewa Menyewa ini berlangsung berhak dan berkewajiban:\n',
          { text: 'HAK: ', bold: true },
        ]
      },
      {
        ol: [
          'Memungut uang sewa satuan Rusun BPJS Ketenagakerjaan beserta dendanya (bila ada).\n',
          'Melaksanakan sanksi atas pelanggaran-pelanggaran penghunian',
          {
            text: [
              'Melaksanakan pemutusan atas aliran listrik dan air apabila ',
              { text: 'PIHAK KEDUA', bold: true },
              ' menunggak salah satu atau lebih kewajiban untuk membayar sewa Rusun, pemakaian listrik atau air',
            ]
          }
        ]
      },
      { text: '\nKEWAJIBAN: ', bold: true },
      {
        ol: [
          { text: ['Mengasuransikan bangunan Rusun BPJS Ketenagakerjaan yang disewakan kepada ', { text: 'PIHAK KEDUA', bold: true }, ' terhadap bahaya kebakaran.'] },
          'Menyediakan fasilitas listrik sebesar 1300 watt per unit rumah',
          'Menyediakan fasilitas air bersih yang merupakan satu kesatuan dari rumah yang disewa.\n',
          'Mengelola komplek Rusun BPJS Ketenagakerjaan.',
          'Memperbaiki peraturan pengelolaan hingga meningkatkan kemampuan pengelolaan komplek Rusun BPJS Ketenagakerjaan dengan lebih baik.',
          'Melakukan pemeriksaan, pemeliharaan, perbaikan  secara teratur ataupun mendadak atas: Pipa air bersih saluran air hujan dan limbah.',
          'Menjaga keamanan lingkungan bekerjasama dengan aparat keamanan setempat.',
          'Mewujudkan lingkungan yang bersih dan lestari.\n\n\n',
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        text: [
          '\n\nPASAL 5 \n',
          'HAK DAN KEWAJIBAN PIHAK KEDUA\n\n',
        ]
      },
      {
        style: 'textBody',
        text: [
          'Pihak Kedua setuju bahwa selama jangka waktu Perjanjian Sewa Menyewa ini berlangsung, berhak dan berkewajiban :\n',
        ]
      },
      {
        style: 'subHeader',
        text: [
          'HAK :\n',
        ]
      },
      {
        style: 'textBody',
        ol: [
          'Menempati satuan Rusun BPJS Ketenagakerjaan dimaksud untuk keperluan tempat tinggal sebagaimana dimaksud pada Pasal 1 Perjanjian ini.',
          'Berhak untuk menggunakan fasilitas umum dalam komplek Rusun BPJS Ketenagakerjaan.',
          { text: ['Berhak melaporkan pada Housing Manager/Pimpinan pengelola atas tingkah laku petugas dari ', { text: 'PIHAK PERTAMA', bold: true }, ' yang kurang baik.'] },
        ]
      },
      {
        style: 'subHeader',
        text: [
          '\nKEWAJIBAN :\n',
        ]
      },
      {
        style: 'textBody',
        ol: [
          'Membayar sewa yang ditetapkan sesuai dengan ketentuan yang berlaku.',
          'Membayar rekening listrik dan air bersih sesuai ketentuan yang berlaku.',
          'Pembuangan sampah setiap hari harus dilakukan ditempatnya secara rapi dan teratur serta tidak berceceran.',
          'Mengganti atau membayar biaya atas kehilangan atau kerusakan barang-barang inventaris, baik yang berada di dalam maupun di luar kamar, sesuai daftar terlampir.',
          'Melaksanakan segala tata tertib/peraturan yang berlaku di area Rusun, sebagaimana ditetapkan dalam Perjanjian.',
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        text: [
          '\n\nPASAL 6\n',
          //{text: 'ARTICLE 6\n',italics: true, bold: true},
          'KEADAAN DILUAR KEMAMPUAN ',
          { text: 'FORCE MAJEURE \n\n', italics: true, bold: true },
        ]
      },
      {
        style: 'textBody',
        text: [
          'Jika unit Rusun yang disewakan atau sebagian dari padanya hancur atau rusak karena bencana alam, kebakaran, huru hara, banjir, angin topan atau sebab lain (force majeure), maka perjanjian ini menjadi batal dengan sendirinya dan uang uang sewa yang telah dibayarkan oleh ',
          { text: 'PIHAK KEDUA', bold: true },
          ' Kepada ',
          { text: 'PIHAK PERTAMA', bold: true },
          ' tidak dapat dikembalikan, dan ',
          { text: 'PIHAK KEDUA', bold: true },
          ' tidak mengadakan tuntutan dalam bentuk apapun terhadap ',
          { text: 'PIHAK PERTAMA.\n\n\n', bold: true }
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        text: [
          'PASAL  7\n ',
          'SANKSI – SANKSI\n\n',
        ]
      },
      {
        style: 'textBody',
        ol: [
          {
            text: [
              { text: 'PIHAK KEDUA', bold: true }, ' menyetujui apabila ', { text: 'PIHAK KEDUA', bold: true }, ' melanggar Pasal 3 dan Pasal 5, maka seketika perjanjian sewa-menyewa ini menjadi batal dan ', { text: 'PIHAK KEDUA', bold: true }, ' bersedia memberi penggantian kerugian kepada ', { text: 'PIHAK PERTAMA', bold: true }, ' sebesar jaminan sewa.'
            ]
          },
          'Keterlambatan pembayaran sewa rumah, listrik dan air akan dilakukan sanksi berupa pemutusan fasilitas (PLN, ATB).\n',
          {
            text: [
              'Dalam jangka waktu satu bulan sejak penandatang Surat Perjanjian ini ',
              { text: 'PIHAK KEDUA', bold: true },
              ' tidak atau belum menempati rumah yang disewa, maka ',
              { text: 'PIHAK PERTAMA', bold: true },
              'secara sepihak dapat membatalkan Surat Perjanjian Sewa Menyewa ini dan uang sewa yang telah disetorkan dan diterima P akan dikembalikan ',
              { text: 'PIHAK PERTAMA', bold: true }, ' kepada ', { text: 'PIHAK KEDUA', bold: true },
              ' setelah dipotong biaya administrasi yang timbul dan merupakan kewajiban ',
              { text: 'PIHAK KEDUA', bold: true },
              ' sepert i: listrik, air serta sewa rumah.'
            ]

          },
          {
            text: [
              { text: 'PIHAK KEDUA', bold: true }, ' harus meninggalkan satuan Rusun BPJS Ketenagakerjaan tersebut dengan seluruh barang-barang miliknya dalam waktu selambat-lambatnya 7 (Tujuh) hari setelah pemutusan sewa dan menyerahkan kunci dan perlengkapan rumah kepada ', { text: 'PIHAK PERTAMA', bold: true }, ' melanggar Pasal 3 dan Pasal 5, maka seketika perjanjian sewa-menyewa ini menjadi batal dan ', { text: 'PIHAK KEDUA', bold: true }, ' bersedia memberi penggantian kerugian kepada ', { text: 'PIHAK PERTAMA.\n\n', bold: true },
            ]
          },
          {
            text: [
              'Dalam hal ', { text: 'PIHAK KEDUA', bold: true }, ' tidak bersedia meninggalkan dan mengosongkan satuan Rusun BPJS Ketenagakerjaan, maka ', { text: 'PIHAK PERTAMA', bold: true }, ' dapat meminta bantuan Pihak Berwajib/Aparat Kepolisian.',
            ]
          },
          { text: ['Apabila ada barang –barang yang tertinggal /tidak dalam waktu batas tersebut maka kehilangan /kerusakan yang terjadi tidak tanggung jawab ', { text: 'PIHAK PERTAMA.', bold: true }] },
          { text: [{ text: 'PIHAK KEDUA', bold: true }, ' setuju mengesampingkan Pasal 1266 dan 1267 Kitab Undang-Undang Hukum Perdata dalam rangka pembatalan sepihak oleh ', { text: 'PIHAK PERTAMA', bold: true }, ' kepada ', { text: 'PIHAK KEDUA', bold: true }, ' dalam perjanjian Sewa Menyewa Rusun BPJS Ketenagakerjaan.'] },
          { text: ['Bila selama perjanjian sewa menyewa terjadi keributan atau pelanggaran oleh ', { text: 'PIHAK KEDUA', bold: true }, ' dan mengganggu ketentaraman penghuni lain, maka perjanjian Sewa menyewa ini batal dengan sendirinya dan ', { text: 'PIHAK KEDUA', bold: true }, ' harus meninggalkan area Rusun BPJS Ketenagakerjaan dalam waktu 1 x 24 jam.\n'] },
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        text: [
          '\nPASAL 8\n',
          //{text: 'ARTICLE 6\n',italics: true, bold: true},
          'SANKSI – SANKSI\n\n',
        ]
      },
      {
        style: 'textBody',
        text: [
          { text: 'PIHAK PERTAMA', bold: true },
          ' tidak bertanggung jawab atas atas kerusakan, kehilangan dan kerugian badan atau benda barang milik ', { text: 'PIHAK KEDUA', bold: true }, ' yang berada dalam halaman atau di dalam unit hunian Rusun BPJS Ketenagakerjaan milik ', { text: 'PIHAK PERTAMA', bold: true }, ' yang diakibatkan kejadian perampokan, pencurian dan sejenisnya.\n\n\n',
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        //pageBreak: 'before',
        text: [
          'PASAL  9\n ',
          'DOMISILI\n\n',
        ]
      },
      {
        style: 'textBody',
        text: [
          { text: 'PARA PIHAK', bold: true }, ' sepakat untuk memilih domisili yang tetap dan tidak berubah pada Kantor kepaniteraan Pengadilan Negeri (Batam/Cikarang).\n\n',
        ]
      },
      {
        alignment: 'center',
        style: 'header',

        text: [
          'PASAL 10\n ',
          'PERSELISIHAN\n\n',
        ]
      },
      {
        style: 'textBody',
        ol: [
          'Semua perselisihan/persengketaan yang timbul diantara kedua belah pihak atau yang timbul dari Perjanjian Sewa Menyewa ini baik dalam pelaksanaannya maupun  mengenai penafsiran dari ketentuan – ketentuan dalam perjanjian ini akan diselesaikan dengan musyawarah.\n',
          { text: ['Apabila tidak tercapai kata sepekat antara ', { text: 'PARA PIHAK', bold: true }, ' maka ', { text: 'PIHAK PERTAMA', bold: true }, ' dan ', { text: 'PIHAK KEDUA', bold: true }, ' setuju untuk menyerahkan permasalahan tersebut kepada Pengadilan Negeri (Batam/Cikarang).\n\n'] }
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        pageBreak: 'before',
        text: [
          'PASAL 11\n ',
          'PENUTUP\n ',
        ]
      },
      {
        style: 'textBody',
        text: [
          'Hal-hal yang belum/tidak cukup diatur Perjanjian ini dan ternyata dalam pelaksanaanya perlu untuk diatur, akan diselesaikan secara Musyawarah untuk Mufakat oleh ', { text: 'PARA PIHAK.', bold: true }, '\nDemikian Perjanjian ini ditandatangani oleh ', { text: 'PARA PIHAK', bold: true }, ' di Batam/Cikarang pada hari dan tanggal tersebut di muka dalam keadaan sehat jasmani dan rohani, tanpa ada paksaan dari Pihak manapun, dibuat dalam rangkap 2 (Dua) bermatrai cukup masing-masing mempunyai kekuatan hukum yang sama untuk masing-masing pihak.\n\n\n',
        ]
      },
      {
        columns: [
          {
            text: [
              { text: 'PIHAK KEDUA\n', bold: true, alignment: 'center' },
              { text: 'PENYEWA\n', bold: true, alignment: 'center' },
            ]
          },
          {
            text: [
              { text: 'PIHAK PERTAMA\n', bold: true, alignment: 'center' },
              { text: 'PENGELOLA RUSUN\n', bold: true, alignment: 'center' },
            ]
          }
        ]
      },
      {
        margin: [90, 5, 0, 0],
        table: {
          widths: [100, 115, 'auto'],
          body: [
            [{
              image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABYCAYAAAB4fpBOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOTSURBVHhe7Zg/btswFId7hJ6hN+geA9beXsGTZh8h8CR4yuzBQDdNPYAP4CFbllygRnfnBux7FClRfyxLDvMz2/4+gIEeJdHhx0dK1CdDoFA4GAoHQ+FgRoXvdjuz2WxYZhR1NsaocG2AzOOaMwqPDIWDoXAwFA6GwsFQOBgKB0PhYCgcDIWDoXAwFA6GwsFQOBgKB0PhYCgcDIWDoXAwFA6GwsFQOBgKB0PhYCgcTDrCT6XJs8zk5clVOI6FWS6Xpji6eJCjKfLSdO68Df0/YrU1QFrC87zX2WOhddm48A+WFJPEhJemFMFNkleZWxaN8FOZ24zXUs2GkyllQDTOvHQ3W3p1RWEKqc9cY/22bOWHDl5ywk+yhNSdd8dHLzyUcelY/pYyUxp/MkM00GuyYDAntRWf9IQH67EuJyqoFq5YcS57s0KudnW1JLnfnffFZvSQyKttxSdB4V50KD7I8FDMReGuPqQrclJb8UlSuBiWY7cU2NAJl/pw/R3OympN9zNC762XlFDkpLbik4bw89mY133T0fPBPC1W9Xr7/LgwTwe5RpTocvHt4cGs9wcr1sq01y+aB6S0tZbYLhVS97vXvsRyj196tK2fq0U9MOvVvrrnA0hD+MuLkZ47EVL0OJU4MmkIV7x0LXqcShxZejrCFd9RT2pxBNIS/h+AE65P/877sRb/NnEz8rbh26ofmh0Gd5TC3PoYYIV3hdhBGHhnnoq9v9k9tjZIntZvBLvQufWRSEh4tWEpRJpmVv1ePIbb+o+h2drNXo3n1scCK3x0SanesX2sHfUbk0voNUXZtDu0pPSEuQ3P3PpY3C3D6x1gTXdLfmGLHmAHZbRNCg8ysJ3RNu6dvy78mpzuNT6eWx+iA9ufodO4o/CqM02GtgfAnrvWm9YzoBLRldO+Rn9j6OE4oT4SGOG6W+t9y9AdXPWhab1/lVi/bVQPTf1W8n3x6Dot2G8lQRwiWe2zrRmg9uzQwfPXdLN3en27zVvBCNfdmvzztWg97sVfrdTnS+cj7/hu4SQP6L9DuOKle3m9+If59fmLebt0/u7IbCzfqxspXPEiPXPjfwCscELhaCgcDIWDoXAwFA6GwsFQOBgKB0PhYCgcDIWDoXAwFA6GwsFQOBgKB0PhYCgcDIWDoXAwFA6GwsFQOBgKB0PhYCgcDIWDeZfw7XZrG2CZXtTZGKPCSXwoHAyFg6FwMBQOxZg/i6fjGl5AsTMAAAAASUVORK5CYII=',
              width: 65,
              height: 65
            }, '', ''],
          ]
        },
        layout: 'noBorders'
      },
      {
        columns: [
          {
            text: [
              { text: ttdNamaPihak2 + '\n', bold: true, alignment: 'center' },
              { text: data[0].jenis_registrasi == 'P' ? (jabatanPihak2 !== null ? jabatanPihak2 : '-') : '', italics: true, alignment: 'center' },
            ]
          },
          {
            text: [
              { text: ttdNamaPihak1 + '\n', bold: true, alignment: 'center' },
              { text: ttdJabatanPihak1, italics: true, alignment: 'center' }
            ]
          }
        ]
      },
      {
        pageBreak: 'before',
        alignment: 'center',
        style: 'header',
        text: [
          'LAMPIRAN\n ',
          { text: 'KONTRAK PERJANJIAN\n\n', bold: true },
        ],

      },
      {

        alignment: 'center',
        style: 'header',
        text: [
          'DAFTAR BARANG INVENTARIS RUSUN BPJS KETENAGAKERJAAN  KABIL BATAM\n ',
          { text: 'LIST OF INVENTORY ITEMS AT RESIDENTIAL FLAT OF BPJS KETENAGAKERJAAN KABIL', italics: true },
        ],
      },
      {

        margin: [15, 10, 0, 0],
        table: {

          widths: [30, 200, 80, 130],
          body: [
            [{ text: 'NO\nNO', style: 'header' },
            { text: 'NAMA BARANG\nITEM NAME', style: 'header' },
            { text: 'JUMLAH\nQUANTITY', style: 'header' },
            { text: 'KETERANGAN\nREMARKS', style: 'header' },
            ],
            ...lampiran_1

          ]
        },
        layout: 'Borders'
      },
      {
        pageBreak: 'before',
        alignment: 'center',
        style: 'header',
        text: [
          'BIAYA PENGGANTIAN BARANG INVENTARIS YANG HILANG ATAU RUSAK ',
          { text: 'REPLACEMENT COST OF LOST OR DAMAGED INVENTORY ITEMS\n', italics: true, bold: true },

        ]
      },
      {
        margin: [15, 10, 0, 0],
        table: {

          widths: [30, 190, 60, 80, 70],
          body: [
            [{ text: 'NO\nNO', style: 'header' },
            { text: 'NAMA BARANG\nITEM NAME', style: 'header' },
            { text: 'JUMLAH\nQUANTITY', style: 'header' },
            { text: 'HILANG\nLOST', style: 'header' },
            { text: 'RUSAK\nDAMAGED', style: 'header' },
            ],
            ...lampiran_2

          ]
        },
        layout: 'Borders'
      },
    ],
    styles: {
      header: {
        bold: true,
      },
      subHeader: {
        bold: true,
      },
      textBody: {
        fontSize: 12,
      },
      lampiranBody: {
        fontSize: 10,
      },
      footer: {

      }
    },
    defaultStyle: {
      alignment: 'justify',
      fontSize: 12
    }
  }
}