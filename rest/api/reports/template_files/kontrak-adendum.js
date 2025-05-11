const moment = require("moment");
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
function inWords(num, lang) {

  if (lang == 'in') {
    if (num == 0) {
      return 'Zero'
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
  } else if (lang == 'en') {
    var n = num
    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
    string = string.replace(/[, ]/g, "");
    if (parseInt(string) === 0) {
      return 'zero';
    }
    units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion'];

    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }

    words = [];
    for (i = 0; i < chunksLen; i++) {

      chunk = parseInt(chunks[i]);

      if (chunk) {

        ints = chunks[i].split('').reverse().map(parseFloat);

        if (ints[1] === 1) {
          ints[0] += 10;
        }

        if ((word = scales[i])) {
          words.push(word);
        }

        if ((word = units[ints[0]])) {
          words.push(word);
        }

        if ((word = tens[ints[1]])) {
          words.push(word);
        }
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred');
        }

      }

    }

    return words.reverse().join(' ');
  }

}

function Floor(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function romawi(nomor) {
  var desimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var romawi = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  var hasil = '';

  for (var index = 0; index < desimal.length; index++) {
    while (desimal[index] <= nomor) {
      hasil += romawi[index];
      nomor -= desimal[index];
    }
  }
  return hasil;
}

module.exports = function (data) {
  const dataKontrak = data.length > 0 ? data[0] : {}
  // looping data kelamin
  const dataUnit = []
  for (let i = 0; i < dataKontrak.unit.length; i++) {
    dataUnit.push(
      [dataKontrak.unit[i].id_unit, dataKontrak.unit[i].kode_blok, dataKontrak.unit[i].nama_unit]
    )
  }

  /* [START] Date Sewa */

  //IN Bulan
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
  var tglStart = dataKontrak.tgl_mulai_sewa.getDate() + ' ' + bulan[dataKontrak.tgl_mulai_sewa.getMonth()] + ' ' + dataKontrak.tgl_mulai_sewa.getFullYear();
  //EN
  var dateStart = dataKontrak.tgl_mulai_sewa.getDate() + ' ' + month[dataKontrak.tgl_mulai_sewa.getMonth()] + ' ' + dataKontrak.tgl_mulai_sewa.getFullYear();

  //IN
  var tglFinish = dataKontrak.tgl_berakhir_sewa.getDate() + ' ' + bulan[dataKontrak.tgl_berakhir_sewa.getMonth()] + ' ' + dataKontrak.tgl_berakhir_sewa.getFullYear();
  //EN
  var dateFinish = dataKontrak.tgl_berakhir_sewa.getDate() + ' ' + month[dataKontrak.tgl_berakhir_sewa.getMonth()] + ' ' + dataKontrak.tgl_berakhir_sewa.getFullYear();


  /* [START] Date Sewa */

  //Pihak 1
  var namaPihak1 = dataKontrak.pihak1_nama_lengkap === null ? '-' : dataKontrak.pihak1_nama_lengkap.toUpperCase();
  var jabatanPihak1 = dataKontrak.pihak1_jabatan === null ? '-' : dataKontrak.pihak1_jabatan.toUpperCase();
  var alamatPihak1 = dataKontrak.pihak1_alamat === null ? '-' : (dataKontrak.pihak1_alamat + ', ' + dataKontrak.kecamatan + ', ' + dataKontrak.provinsi).toUpperCase();
  var ttdNamaPihak1 = dataKontrak.pihak1_ttd_nama;
  var ttdJabatanPihak1 = dataKontrak.pihak1_ttd_jabatan;
  var ttdTitlePihak1 = dataKontrak.pihak1_ttd_title;
  moment.locale('id')
  //Pihak 2
  var namaPihak2 = dataKontrak.pihak2_nama_lengkap === null ? '-' : dataKontrak.pihak2_nama_lengkap.toUpperCase();
  var nppPihak2 = dataKontrak.pihak2_npp === null ? '' : dataKontrak.pihak2_npp.toUpperCase();
  var perusahaanPihak2 = dataKontrak.pihak2_nama_perusahaan === null ? '-' : dataKontrak.pihak2_nama_perusahaan.toUpperCase();
  var alamatPihak2 = dataKontrak.pihak2_alamat === null ? '-' : dataKontrak.pihak2_alamat.toUpperCase();
  var jabatanPihak2 = data[0].pihak2_jabatan === null ? '-' : data[0].pihak2_jabatan.toUpperCase();
  var jmlhUnit = dataKontrak.jmlh_unit;
  var tlpPihak2 = dataKontrak.pihak2_telpon === null ? '-' : dataKontrak.pihak2_telpon;
  var kpjPihak2 = dataKontrak.pihak2_kpj === null ? '-' : dataKontrak.pihak2_kpj.toUpperCase();

  var twinBuilding = dataKontrak.unit[0].kode_blok;

  var ttdNamaPihak2 = dataKontrak.pihak2_ttd_nama;
  var ttdJabatanPihak2 = dataKontrak.pihak2_ttd_jabatan;
  var ttdTitlePihak2 = dataKontrak.pihak2_ttd_title;
  var data_unit = dataKontrak.unit
  var in_pasal2 = '';
  var en_pasal2 = '';
  for (i = 0; i < data_unit.length; i++) {
    if (i == data_unit.length - 1) {
      in_pasal2 += 'Rp. ' + currency(data_unit[i].tarif !== null ? data_unit[i].tarif : 0) + ',- ( ' + inWords(data_unit[i].tarif !== null ? data_unit[i].tarif : 0, 'in') + 'Rupiah ) per kamar per bulan untuk lantai ' + romawi(data_unit[i].no_lantai) + ' (' + inWords(data_unit[i].no_lantai !== null ? data_unit[i].no_lantai : 0, 'in') + ')'
      //Rp. 598,000,- (Five Hundred Ninety Eight Thousand Rupiah) per room per month, 1st floor
      en_pasal2 += 'Rp. ' + currency(data_unit[i].tarif !== null ? data_unit[i].tarif : 0) + ',- ( ' + inWords(data_unit[i].tarif !== null ? data_unit[i].tarif : 0, 'en') + ' Rupiah ) per room per month, ' + Floor(data_unit[i].no_lantai) + ' floor and'
    } else {
      in_pasal2 += 'Rp. ' + currency(data_unit[i].tarif !== null ? data_unit[i].tarif : 0) + ',- ( ' + inWords(data_unit[i].tarif !== null ? data_unit[i].tarif : 0, 'in') + 'Rupiah ) per kamar per bulan untuk lantai ' + romawi(data_unit[i].no_lantai) + ' (' + inWords(data_unit[i].no_lantai !== null ? data_unit[i].no_lantai : 0, 'in') + '), '
      en_pasal2 += 'Rp. ' + currency(data_unit[i].tarif !== null ? data_unit[i].tarif : 0) + ',- ( ' + inWords(data_unit[i].tarif !== null ? data_unit[i].tarif : 0, 'in') + 'Rupiah ) per room per month, ' + Floor(data_unit[i].no_lantai) + ' floor and'
    }
  }
  /* [END] Data Sewa */

  /*
    Data Lampiran Adendum Daftar with Ket
  */
  console.log(data)
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
  var noKontrak = data[0].no_kontrak_sewa !== null ? data[0].no_kontrak_sewa : '-';
  var noAdendum = data[0].no_kontrak_sewa !== null ? data[0].no_adendum : '-';
  var bln_sewa = data[0].adendum[0].jmlh_bulan_adendum !== null ? data[0].adendum[0].jmlh_bulan_adendum : 0

  return {
    footer: function (currentPage, pageCount) {
      if (currentPage <= 8) {
        return { text: currentPage.toString(), alignment: 'center' }
      }
    },
    pageSize: 'A4',
    pageOrientation: 'potrait',
    pageMargins: [50, 50, 50, 50],
    content: [
      {
        text: 'ADDENDUM\nTERHADAP\nPERJANJIAN\n',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'NOMOR : ' + noKontrak + '\n',
        style: 'header',
        underlined: true,
        alignment: 'center'
      },
      {
        text: 'ANTARA\nPIHAK PENGELOLA RUSUNAWA BPJS KETENAGAKERJAAN\nDENGAN\nPENGHUNI RUSUNAWA BPJS KETENAGAKERJAAN\nTENTANG\nSEWA MENYEWA UNIT HUNIAN\nRUSUN BPJS KETENAGAKERJAAN\n\n',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'NOMOR : ' + noAdendum + ' \n\n\n',
        style: 'header',
        alignment: 'center',
      },
      {
        text: 'Pada hari ini ' + hariSewa + ' tanggal ' + tglSewa + ' bulan ' + blnSewa + ' Tahun ' + yearCont + ' di ' + data[0].provinsi + ', ' + data[0].kecamatan + ' , yang bertanda-tangan dibawah ini:\n\n',
        style: 'textBody',
      },

      {
        margin: [50, 10, 0, 0],
        widths: ['auto', 'auto', 'auto'],
        table: {
          body: [
            [
              {
                text: [
                  'Nama  '
                ]
              },
              ':',
              { text: namaPihak1, bold: true }
            ],
            [
              {
                text: [
                  'Jabatan  '
                ]
              },
              ':',
              [{
                text: [
                  { text: 'Housing Manager ', italics: true },
                  'Rusunawa BPJS Ketenagakerjaan ',
                  { text: jabatanPihak1, bold: true },
                ]
              },]
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
        margin: [50, 10, 0, 0],
        table: {
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
            [
              {
                text: [
                  'Jabatan  '
                ]
              },
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
            ],
            [
              {
                text: [
                  'Alamat  '
                ]
              },
              ':',
              { text: alamatPihak2, bold: true }
            ],
            [
              {
                text: [
                  'Telp/HP  '
                ]
              },
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
          { text: 'PIHAK KEDUA.\n\n', bold: true },
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
            text: 'PARA PIHAK ',
            bold: true
          },
          'terlebih dahulu menerangkan hal-hal sebagai berikut :\n\n',
        ],
      },
      {
        ol: [
          { text: ['Bahwa ', { text: 'PARA PIHAK', bold: true }, ' telah menandatangani Perjanjian Nomor : ' + data[0].no_kontrak_sewa + ' tentang ', { text: 'SEWA MENYEWA UNIT HUNIAN RUSUN BPJS KETENAGAKERJAAN', bold: true }, '. selanjutnya disebut “Perjanjian Induk”.'] },
          { text: ['Bahwa ', { text: 'PIHAK KEDUA', bold: true }, ' mengajukan untuk “menambah/mengubah/”…………….. sebagaimana dimaksud dalam Perjanjian Induk berdasarkan (hasil kesepakatan/rapat).'] },
          { text: ['Dan ', { text: 'PIHAK PERTAMA', bold: true }, ' bersedia untuk dilakukan “menambah/mengubah/”……………… sebagaimana dimaksud dalam  Perjanjian induk.'] },
        ],
        listType: 'none'
      },
      {
        style: ' textBody ',
        text: ['Berdasarkan hal-hal tersebut diatas, PARA PIHAK telah sepakat dan setuju untuk membuat Addendum terhadap Perjanjian Induk, selanjutnya disebut “Addendum Perjanjian”, dengan ketentuan dan syarat-syarat sebagai berikut :\n\n',
        ]
      },
      {
        alignment: 'center',
        style: 'header',
        pageBreak: 'before',
        text: [
          'PASAL  1* \n\n ',
        ]
      },
      {
        style: 'textBody',
        text: [
          'Mengubah ketentuan “Judul Pasal sebelumnya” sebagaimana dimaksud dalam Pasal 3 Perjanjian Induk, sehingga Pasal 3 berbunyi sebagai berikut :\nJangka waktu sewa Rumah susun selama ' + bln_sewa + ' bulan terhitung sejak tanggal ' + moment(data[0].adendum[0].tgl_mulai_sewa).format('DD MMMM YYYY') + ' sampai dengan tanggal ' + moment(data[0].adendum[0].tgl_berakhir_sewa).format('DD MMMM YYYY') + '.\n\n\n',
        ],
      },
      {
        alignment: 'center',
        style: 'header',
        //pageBreak: 'before',
        text: [
          'PASAL  2\n\n',

        ]
      },
      {
        style: 'textBody',
        text: [
          'Addendum ini merupakan satu kesatuan yang tidak terpisahkan dengan Perjanjian Induk, dan ketentuan-ketentuan yang telah diatur dalam Perjanjian induk tersebut tetap berlaku, kecuali yang diatur kembali dengan Addendum ini.\n',
          'Addendum ini dibuat dalam 3 (tiga) rangkap, 2 (dua) rangkap diantaranya bermaterai cukup dan berlaku sebagai asli serta mempunyai kekuatan hukum yang sama, masing-masing Pihak mendapat 1 (satu) rangkap sedangkan 1 (satu) rangkap lainnya sebagai copy untuk kepentingan administrasi.\n\n',
        ]
      },
      /*{
        margin: [0, 5, 0, 0],
        table: {
          widths: ['auto', 'auto'],
          body: [
            [{ text: 'PIHAK KEDUA', bold: true }, { text: 'PIHAK PERTAMA', bold: true, alignment: 'center' }],
            [{ text: perusahaanPihak2, bold: false }, { text: 'Pengelola Rusun BPJS Ketenagakerjaan Kabil', alignment: 'center' }],
          ]
        },
        layout: 'noBorders'
      },*/
      {
        columns: [
          {
            text: [
              { text: 'PIHAK KEDUA\n', bold: true },
              { text: ttdTitlePihak2, bold: false },
            ]
          },
          {
            text: [
              { text: 'PIHAK PERTAMA\n', bold: true, alignment: 'center' },
              { text: ttdTitlePihak1, alignment: 'center' }
            ]
          }
        ]
      },
      {
        margin: [0, 5, 0, 0],
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
              { text: ttdNamaPihak2 + '\n', alignment: 'left' },
              { text: ttdJabatanPihak2, italics: true, alignment: 'left' },
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
          { text: 'ADDENDUM\n\n', italics: true, bold: true },
        ],

      },
      {

        alignment: 'center',
        style: 'header',
        text: [
          'DAFTAR BARANG INVENTARIS RUSUN BPJS KETENAGAKERJAAN  KABIL BATAM\n ',
          { text: 'LIST OF INVENTORY ITEMS AT RESIDENTIAL FLAT OF BPJS KETENAGAKERJAAN KABIL' },
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
          'BIAYA PENGGANTIAN BARANG INVENTARIS YANG HILANG ATAU RUSAK\n',
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
      /*{
        margin: [0, 0, 0, 0],
        table: {
          widths: ['auto', 'auto'],
          body: [
            [{ text: namaPihak2, alignment: 'left' }, { text: 'Dev Ivan Saut Martua', bold: true, alignment: 'center' }],
            [{ text: 'KOSONG-NON VALUE', italics: true, alignment: 'left' }, { text: 'Kepala Cabang', italics: true, alignment: 'center' }],
          ]
        },
        //layout: 'noBorders'
      },*/


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