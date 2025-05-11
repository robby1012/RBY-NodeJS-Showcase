const xl = require('excel4node');
const moment = require('moment')
const { isNumber } = require("validate.js");
function currency(curr) {
	var data;
	if (curr === null) {
		curr = 0
	}
	if (!isNumber(curr)) {
		data = (parseFloat(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	} else if (isNumber(curr)) {
		data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}

	//console.log(data.toString())
	var str = data.toString();

	var comma = str.split('.');
	var txt = comma[0].replace(/,/g, '.')
	var rp = txt + ',' + comma[comma.length - 1].replace('.', ',')

	return rp
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
function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
module.exports = function (data) {
    var wb = new xl.Workbook();
    var styleHeader = wb.createStyle({
        font: {
            bold: true,
            size: 11,
        },
        alignment: {
            horizontal: ['center'],
            vertical: ['center'],
            wrapText: true
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'double',
            },
            bottom: {
                style: 'double',
            },
        }

    });
    var styleSubHeader = wb.createStyle({
        font: {
            bold: true,
            size: 8,
        },
        alignment: {
            horizontal: ['center'],
            vertical: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'double',
            },
        }

    });
    var styleSubHeader1 = wb.createStyle({
        font: {
            bold: true,
            size: 9,
        },
        /* alignment: {
            horizontal: ['left']
        }, */
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'double',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var styleBody = wb.createStyle({
        font: {
            size: 9,
        },
        /* alignment: {
            vertical: ['left']
        }, */
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyLeftText = wb.createStyle({
        font: {
            size: 9,
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyLeftText2 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyLeftText3 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'double',
            },
        }

    });
    var bodyNumber = wb.createStyle({
        font: {
            size: 9,
        },
        alignment: {
            vertical: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyCurrency = wb.createStyle({
        font: {
            size: 9,
        },
        alignment: {
            horizontal: ['right']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyCurrency2 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            horizontal: ['right']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyCurrency3 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            horizontal: ['right']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'double',
            },
        }

    });
    var bodyBorderRight = wb.createStyle({
        font: {
            size: 9,
        },
        alignment: {
            vertical: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'double',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyBorderRight2 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            vertical: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'double',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyBorderRight3 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            vertical: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'double',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyCenterText = wb.createStyle({
        font: {
            size: 9,
        },
        alignment: {
            horizontal: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });

    var bodyCenterText2 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            horizontal: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'thin',
            },
        }

    });
    var bodyCenterText3 = wb.createStyle({
        font: {
            size: 9,
            bold: true
        },
        alignment: {
            horizontal: ['center']
        },
        border: {
            left: {
                style: 'thin',
            },
            right: {
                style: 'thin',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'double',
            },
        }

    });
    var sit = wb.addWorksheet('Daftar Aset Tetap Digunakan Kendaraan')
    sit.row(18).setHeight(30);
    sit.column(1).setWidth(5);
    sit.column(2).setWidth(5);
    sit.column(3).setWidth(5);
    sit.column(4).setWidth(5);
    sit.column(5).setWidth(5);
    sit.column(6).setWidth(30);
    sit.column(9).setWidth(20);
    sit.column(34).setWidth(50);
    sit.addImage({
        path: __dirname + '/assets/logo.png',
        type: 'picture',
        position: {
            type: 'twoCellAnchor',
            from: {
                col: 4,
                colOff: 0,
                row: 1,
                rowOff: 0,
            },
            to: {
                col: 11,
                colOff: 0,
                row: 10,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 13, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 14, 3, 26, true)
        .string('FORMULIR')
        .style(
            {
                font: {
                    bold: true,
                    size: 18,
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            }
        );
    sit.cell(4, 14, 5, 26, true)
        .string(
            'Nomor Dokumen : '
        )
        .style(
            {
                border: {
                    left: {
                        style: 'none',
                    },
                    right: {
                        style: 'none',
                    },
                    top: {
                        style: 'thin',
                    },
                    bottom: {
                        style: 'none',
                        color: '#ffffff'
                    },

                },
                alignment: {
                    vertical: 'bottom'
                }
            },
        )
    sit.cell(6, 14, 7, 26, true)
        .string(
            'No Revisi : '
        )
        .style(
            {
                border: {
                    left: {
                        style: 'none',
                    },
                    right: {
                        style: 'none',
                    },
                    top: {
                        style: 'none',
                        color: '#ffffff'
                    },
                    bottom: {
                        style: 'thin',
                    },
                },
                alignment: {
                    vertical: 'top'
                }
            }
        );
    sit.cell(8, 14, 9, 26, true)
        .string(
            'Tanggal Dikeluarkan : '
        )
        .style(
            {
                border: {
                    left: {
                        style: 'thin',
                    },
                    right: {
                        style: 'thin',
                    },
                    top: {
                        style: 'thin'
                    },
                    bottom: {
                        style: 'thin',
                    },
                },
                alignment: {
                    vertical: 'center'
                }
            }
        );
    sit.cell(1, 27, 9, 34, true)
        .string('DAFTAR ASET TETAP')
        .style(
            {
                border: {
                    left: {
                        style: 'thin',
                    },
                    right: {
                        style: 'double',
                    },
                    top: {
                        style: 'thin'
                    },
                    bottom: {
                        style: 'thin',
                    },
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    bgColor: '#808080',
                    fgColor: '#808080',
                },

                alignment: {
                    horizontal: 'center',
                    vertical: 'center',
                    wrapText: true
                },
                font: {
                    size: 20,
                    bold: true,
                }
            }
        );

    sit.cell(11, 1, 11, 34, true)
        .string('DAFTAR ASET TETAP  YANG MASIH DIGUNAKAN')
        .style(
            {
                font: {
                    bold: true,
                    size: 18,
                },
                alignment: {
                    horizontal: ['center']
                }
            }
        );


    sit.cell(13, 1, 13, 16, true)
        .string('BPJS KETENAGAKERJAAN RUSUNAWA ' + data[0].nama_rusun)
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
    sit.cell(14, 1, 14, 16, true)
        .string('KELOMPOK ASET : KENDARAAN DINAS')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                },

            }
        );
    sit.cell(16, 1, 16, 16, true)
        .string('PER ' + data[0].periode_cetak !== undefined ? moment(data[0].periode_cetak).format('MMMM YYYY').toUpperCase() : '-')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );



    //HEADER
    sit.cell(18, 1, 20, 1, true)
        .string('NO')
        .style(styleHeader);
    sit.cell(18, 2, 18, 5, true)
        .string('NO. REGISTRASI')
        .style(
            styleHeader
        );
    sit.cell(19, 2, 20, 2, true)
        .string('kode u.k.')
        .style(styleHeader);
    sit.cell(19, 3, 20, 3, true)
        .string('kode A. T')
        .style(styleHeader);
    sit.cell(19, 4, 20, 4, true)
        .string('bln. Beli')
        .style(styleHeader);
    sit.cell(19, 5, 20, 5, true)
        .string('no. urut')
        .style(styleHeader);


    sit.cell(18, 6, 20, 6, true)
        .string('NAMA ASET TETAP')
        .style(
            styleHeader
        );
    sit.cell(18, 7, 20, 7, true)
        .string('TYPE')
        .style(styleHeader);
    sit.cell(18, 8, 20, 8, true)
        .string('MERK')
        .style(styleHeader);
    sit.cell(18, 9, 18, 11, true)
        .string('NOMOR')
        .style(styleHeader);
    sit.cell(19, 9, 20, 9, true)
        .string('RANGKA')
        .style(styleHeader);
    sit.cell(19, 10, 20, 10, true)
        .string('MESIN')
        .style(styleHeader);
    sit.cell(19, 11, 20, 11, true)
        .string('POLISI')
        .style(styleHeader);

    sit.cell(18, 12, 20, 12, true)
        .string('TAHUN PEMBUATAN')
        .style(styleHeader);
    sit.cell(18, 13, 20, 13, true)
        .string('TGL BELI')
        .style(styleHeader);
    sit.cell(18, 14, 20, 14, true)
        .string('UM')
        .style(styleHeader);
    sit.cell(18, 15, 20, 15, true)
        .string('SD TH ' + moment(data[0].periode_cetak).add(-1, 'years').format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 16, 20, 16, true)
        .string('TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 17, 20, 17, true)
        .string('SD TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 18, 20, 18, true)
        .string('NILAI PEROLEHAN')
        .style(styleHeader);
    sit.cell(18, 19, 20, 19, true)
        .string('NILAI RESIDU')
        .style(styleHeader);
    sit.cell(18, 20, 20, 20, true)
        .string('AKUM PENY SD THN LALU')
        .style(styleHeader);
    sit.cell(18, 21, 20, 21, true)
        .string('PENURUNAN NILAI')
        .style(styleHeader);
    sit.cell(18, 22, 20, 22, true)
        .string('KOREKSI PENYUSUTAN NILAI')
        .style(styleHeader);
    sit.cell(18, 23, 20, 23, true)
        .string('NILAI \nYANG DISUSUTKAN')
        .style(styleHeader);
    sit.cell(18, 24, 20, 24, true)
        .string('SISA UM TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 25, 18, 27, true)
        .string('BEBAN PENYUSUTAN TH BERJALAN')
        .style(styleHeader);
    sit.cell(19, 25, 20, 25, true)
        .string('SD BLN LALU')
        .style(styleHeader);
    sit.cell(19, 26, 20, 26, true)
        .string('BULAN INI')
        .style(styleHeader);
    sit.cell(19, 27, 20, 27, true)
        .string('SD BULAN INI')
        .style(styleHeader);




    sit.cell(18, 28, 20, 28, true)
        .string('AKUM PENY S/D BULAN INI')
        .style(styleHeader);
    sit.cell(18, 29, 20, 29, true)
        .string('NILAI BUKU PER\nBULAN LAPORAN')
        .style(styleHeader);
    sit.cell(18, 30, 18, 33, true)
        .string('KONDISI')
        .style(styleHeader);
    sit.cell(19, 30, 20, 30, true)
        .string('BAIK')
        .style(styleHeader);
    sit.cell(19, 31, 20, 31, true)
        .string('RUSAK')
        .style(styleHeader);
    sit.cell(19, 32, 20, 32, true)
        .string('USANG')
        .style(styleHeader);
    sit.cell(19, 33, 20, 33, true)
        .string('HILANG')
        .style(styleHeader);
    sit.cell(18, 34, 20, 34, true)
        .string('KETERANGAN')
        .style(styleHeader);





    //index
    sit.cell(21, 1)
        .string('1')
        .style(styleSubHeader);
    sit.cell(21, 2)
        .string('2')
        .style(styleSubHeader);
    sit.cell(21, 3)
        .string('3')
        .style(styleSubHeader);
    sit.cell(21, 4)
        .string('4')
        .style(styleSubHeader);
    sit.cell(21, 5)
        .string('5')
        .style(styleSubHeader);
    sit.cell(21, 6)
        .string('6')
        .style(styleSubHeader);
    sit.cell(21, 7)
        .string('7')
        .style(styleSubHeader);
    sit.cell(21, 8)
        .string('8')
        .style(styleSubHeader);
    sit.cell(21, 9)
        .string('9')
        .style(styleSubHeader);
    sit.cell(21, 10)
        .string('10')
        .style(styleSubHeader);
    sit.cell(21, 11)
        .string('11')
        .style(styleSubHeader);
    sit.cell(21, 12)
        .string('12')
        .style(styleSubHeader);
    sit.cell(21, 13)
        .string('12/01/1900')
        .style(styleSubHeader);
    sit.cell(21, 14)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 15)
        .string(moment(data[0].periode_cetak).add(-1, 'years').format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 16)
        .string(moment(data[0].periode_cetak).format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 17)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 18)
        .string('14')
        .style(styleSubHeader);
    sit.cell(21, 19)
        .string('15')
        .style(styleSubHeader);
    sit.cell(21, 20)
        .string('16')
        .style(styleSubHeader);
    sit.cell(21, 21)
        .string('17')
        .style(styleSubHeader);
    sit.cell(21, 22)
        .string('18')
        .style(styleSubHeader);
    sit.cell(21, 23)
        .string('19')
        .style(styleSubHeader);
    sit.cell(21, 24)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 25)
        .string('20')
        .style(styleSubHeader);
    sit.cell(21, 26)
        .string('21')
        .style(styleSubHeader);
    sit.cell(21, 27)
        .string('22=20+21')
        .style(styleSubHeader);
    sit.cell(21, 28)
        .string('23=22+16')
        .style(styleSubHeader);
    sit.cell(21, 29)
        .string('24=14-23')
        .style(styleSubHeader);
    sit.cell(21, 30, 21, 33, true)
        .string('Isi dengan tanda angka " 1 "')
        .style(styleSubHeader);
    sit.cell(21, 34)
        .string('25')
        .style(styleSubHeader);

    var sub_header = [];
    var tbl_data = [];
    var group = groupBy(data, (c) => c.kelompok_kendaraan);
    sub_header.push(Object.keys(group, 'kelompok_kendaraan'));
    //grand total
    var tot_kondisi_b = 0;
    var tot_kondisi_rr = 0;
    var tot_kondisi_rb = 0;
    var tot_kondisi_h = 0;
    var tot_nil = 0;
    var tot_nilai_residu = 0
    var tot_akum_sd_thn_lalu = 0
    var tot_nilai_yg_disusutkan = 0
    var tot_peny_sd_bln_lalu = 0
    var tot_peny_bln_ini = 0
    var tot_peny_sd_bln_ini = 0
    var tot_akum_sd_bln_ini = 0
    var tot_nilai_buku_bln_ini = 0
    var sum_n = 0
    var row_sub = 22
    for (var j = 0; j < sub_header[0].length; j++) {
        var body_len = group[Object.keys(group)[j]].length
        var sum_kondisi_b = 0;
        var kondisi_b = 0;

        var sum_kondisi_rr = 0;
        var kondisi_rr = 0;

        var sum_kondisi_rb = 0;
        var kondisi_rb = 0;

        var sum_kondisi_h = 0;
        var kondisi_h = 0;
        var sum_nil = 0;
        var sum_nilai_residu = 0
        var sum_akum_sd_thn_lalu = 0
        var sum_nilai_yg_disusutkan = 0
        var sum_peny_sd_bln_lalu = 0
        var sum_peny_bln_ini = 0
        var sum_peny_sd_bln_ini = 0
        var sum_akum_sd_bln_ini = 0
        var sum_nilai_buku_bln_ini = 0
        var no = j + 1;
        row_sub += 0
        if (j > 0) {
            row_sub += 2
            var body_len2 = group[Object.keys(group)[j - 1]].length
            row_sub += body_len2

        }
        sit.cell(row_sub, 1, row_sub, 34, true)
            .string(romawi(no) + '. ' + sub_header[0][j])
            .style(
                {
                    font: {
                        bold: true,
                        size: 10,
                    },
                    border: {
                        left: {
                            style: 'thin',
                        },
                        right: {
                            style: 'double',
                        },
                        top: {
                            style: 'thin',
                        },
                        bottom: {
                            style: 'thin',
                        },
                    }
                }
            );
        var jml_row
        for (var i = 0; i < body_len; i++) {
            var item = group[Object.keys(group)[j]][i];
            sum_kondisi_b = item.kondisi_aset == 'B' ? sum_kondisi_b += 1 : sum_kondisi_b
            kondisi_b = item.kondisi_aset == 'B' ? kondisi_b = 1 : kondisi_b

            sum_kondisi_rr = item.kondisi_aset == 'R' ? sum_kondisi_rr += 1 : sum_kondisi_rr
            kondisi_rr = item.kondisi_aset == 'R' ? kondisi_rr = 1 : kondisi_rr

            sum_kondisi_rb = item.kondisi_aset == 'U' ? sum_kondisi_rb += 1 : sum_kondisi_rb
            kondisi_rb = item.kondisi_aset == 'U' ? kondisi_rb = 1 : kondisi_rb

            sum_kondisi_h = item.kondisi_aset == 'U' ? sum_kondisi_h += 1 : sum_kondisi_h
            kondisi_h = item.kondisi_aset == 'H' ? kondisi_h = 1 : kondisi_h
            sum_nil += parseFloat(item.nilai_perolehan)
            sum_nilai_residu += parseFloat(item.nilai_residu !== null ? item.nilai_residu : '0')
            sum_akum_sd_thn_lalu += item.akum_sd_thn_lalu
            sum_nilai_yg_disusutkan += item.nilai_yg_disusutkan
            sum_peny_sd_bln_lalu += item.peny_sd_bln_lalu
            sum_peny_bln_ini += item.peny_bln_ini
            sum_peny_sd_bln_ini += item.peny_sd_bln_ini
            sum_akum_sd_bln_ini += parseFloat(item.akum_peny_sd_bln_ini)
            sum_nilai_buku_bln_ini += item.nilai_buku_bln_ini


            //grand total
            tot_kondisi_b = item.kondisi_aset == 'B' ? tot_kondisi_b += 1 : tot_kondisi_b
            tot_kondisi_rr = item.kondisi_aset == 'R' ? tot_kondisi_rr += 1 : tot_kondisi_rr
            tot_kondisi_rb = item.kondisi_aset == 'U' ? tot_kondisi_rb += 1 : tot_kondisi_rb
            tot_kondisi_h = item.kondisi_aset == 'U' ? tot_kondisi_h += 1 : tot_kondisi_h
            tot_nil += parseFloat(item.nilai_perolehan)
            tot_nilai_residu += parseFloat(item.nilai_residu !== null ? item.nilai_residu : '0')
            tot_akum_sd_thn_lalu += item.akum_sd_thn_lalu
            tot_nilai_yg_disusutkan += item.nilai_yg_disusutkan
            tot_peny_sd_bln_lalu += item.peny_sd_bln_lalu
            tot_peny_bln_ini += item.peny_bln_ini
            tot_peny_sd_bln_ini += item.peny_sd_bln_ini
            tot_akum_sd_bln_ini += parseFloat(item.akum_peny_sd_bln_ini)
            tot_nilai_buku_bln_ini += item.nilai_buku_bln_ini
            var nos = i + 1
            var row_body = row_sub + nos
            jml_row = row_body

            sit.cell(row_body, 1).string(i + 1 + '.').style(bodyLeftText)
            sit.cell(row_body, 2).string(item.no_reg1).style(bodyLeftText)
            sit.cell(row_body, 3).string(item.no_reg2).style(bodyLeftText)
            sit.cell(row_body, 4).string(item.no_reg3).style(bodyLeftText)
            sit.cell(row_body, 5).string(item.no_reg4).style(bodyLeftText)
            sit.cell(row_body, 6).string(item.nama_aset !== null ? item.nama_aset : '-').style(bodyLeftText)
            sit.cell(row_body, 7).string(item.aset_type !== null ? item.aset_type : '-').style(bodyLeftText)
            sit.cell(row_body, 8).string(item.aset_merk !== null ? item.aset_merk : '-').style(bodyLeftText)
            sit.cell(row_body, 9).string(item.no_rangka !== null ? item.no_rangka : '-').style(bodyLeftText)
            sit.cell(row_body, 10).string(item.no_mesin !== null ? item.no_mesin : '-').style(bodyLeftText)
            sit.cell(row_body, 11).string(item.no_polisi !== null ? item.no_polisi : '-').style(bodyLeftText)
            sit.cell(row_body, 12).string(item.tgl_pembuatan !== null ? moment(item.tgl_pembuatan).format('DD-MM-YYYY') : '-').style(bodyLeftText)
            sit.cell(row_body, 13).string(item.tgl_beli !== null ? moment(item.tgl_beli).format('DD-MM-YYYY') : '-').style(bodyLeftText)
            sit.cell(row_body, 14).number(item.umur_manfaat).style(bodyNumber)
            sit.cell(row_body, 15).string(item.sd_thn_lalu !== null ? item.sd_thn_lalu : '-').style(bodyNumber)
            sit.cell(row_body, 16).string(item.thn_ini !== null ? item.thn_ini : '-').style(bodyNumber)
            sit.cell(row_body, 17).string(item.sd_tahun_ini !== null ? currency(item.sd_tahun_ini) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 18).string(item.nilai_perolehan !== null ? currency(item.nilai_perolehan) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 19).string(item.nilai_residu !== null ? currency(item.nilai_residu) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 20).string(currency(item.akum_sd_thn_lalu)).style(bodyCurrency)
            sit.cell(row_body, 21).string('-').style(bodyCenterText)
            sit.cell(row_body, 22).string('-').style(bodyCenterText)
            sit.cell(row_body, 23).string(item.nilai_yg_disusutkan !== null ? currency(item.nilai_yg_disusutkan) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 24).string('-').style(bodyCenterText)
            sit.cell(row_body, 25).string(item.peny_sd_bln_lalu !== null ? currency(item.peny_sd_bln_lalu) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 26).string(item.peny_bln_ini !== null ? currency(item.peny_bln_ini) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 27).string(item.peny_sd_bln_ini !== null ? currency(item.peny_sd_bln_ini) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 28).string(item.akum_peny_sd_bln_ini !== null ? currency(item.akum_peny_sd_bln_ini) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 29).string(item.nilai_buku_bln_ini !== null ? currency(item.nilai_buku_bln_ini) : currency(0)).style(bodyCurrency)
            sit.cell(row_body, 30).number(kondisi_b).style(bodyCenterText)
            sit.cell(row_body, 31).number(kondisi_rr).style(bodyCenterText)
            sit.cell(row_body, 32).number(kondisi_rb).style(bodyCenterText)
            sit.cell(row_body, 33).number(kondisi_h).style(bodyCenterText)
            sit.cell(row_body, 34).string(item.keterangan !== null ? item.keterangan : '-').style(bodyBorderRight)
        }
        sit.cell(jml_row + 1, 1).string('0').style(bodyLeftText2)
        sit.cell(jml_row + 1, 2, jml_row + 1, 17, true).string('JUMLAH').style(bodyCenterText2)
        sit.cell(jml_row + 1, 18).string(currency(sum_nil)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 19).string(currency(sum_nilai_residu)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 20).string(currency(sum_akum_sd_thn_lalu)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 21).string('-').style(bodyCenterText2)
        sit.cell(jml_row + 1, 22).string('-').style(bodyCenterText2)
        sit.cell(jml_row + 1, 23).string(currency(sum_nilai_yg_disusutkan)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 24).string('-').style(bodyCenterText2)
        sit.cell(jml_row + 1, 25).string(currency(sum_peny_sd_bln_lalu)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 26).string(currency(sum_peny_bln_ini)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 27).string(currency(sum_peny_sd_bln_ini)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 28).string(currency(sum_akum_sd_bln_ini)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 29).string(currency(sum_nilai_buku_bln_ini)).style(bodyCurrency2)
        sit.cell(jml_row + 1, 30).number(sum_kondisi_b).style(bodyCenterText2)
        sit.cell(jml_row + 1, 31).number(sum_kondisi_rr).style(bodyCenterText2)
        sit.cell(jml_row + 1, 32).number(sum_kondisi_rb).style(bodyCenterText2)
        sit.cell(jml_row + 1, 33).number(sum_kondisi_h).style(bodyCenterText2)
        sit.cell(jml_row + 1, 34).string('-').style(bodyBorderRight2)

    }

    sit.cell(jml_row + 2, 1).string('0').style(bodyLeftText3)
    sit.cell(jml_row + 2, 2, jml_row + 2, 17, true).string('JUMLAH TOTAL').style(bodyCenterText3)
    sit.cell(jml_row + 2, 18).string(currency(tot_nil)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 19).string(currency(tot_nilai_residu)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 20).string(currency(tot_akum_sd_thn_lalu)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 21).string('-').style(bodyCenterText3)
    sit.cell(jml_row + 2, 22).string('-').style(bodyCenterText3)
    sit.cell(jml_row + 2, 23).string(currency(tot_nilai_yg_disusutkan)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 24).string('-').style(bodyCenterText3)
    sit.cell(jml_row + 2, 25).string(currency(tot_peny_sd_bln_lalu)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 26).string(currency(tot_peny_bln_ini)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 27).string(currency(tot_peny_sd_bln_ini)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 28).string(currency(tot_akum_sd_bln_ini)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 29).string(currency(tot_nilai_buku_bln_ini)).style(bodyCurrency3)
    sit.cell(jml_row + 2, 30).number(tot_kondisi_b).style(bodyCenterText3)
    sit.cell(jml_row + 2, 31).number(tot_kondisi_rr).style(bodyCenterText3)
    sit.cell(jml_row + 2, 32).number(tot_kondisi_rb).style(bodyCenterText3)
    sit.cell(jml_row + 2, 33).number(tot_kondisi_h).style(bodyCenterText3)
    sit.cell(jml_row + 2, 34).string('-').style(bodyBorderRight3)

    sit.cell(jml_row + 4, 26, jml_row + 4, 28, true).string('JAKARTA, ' + moment().format('DD MMMM YYYY').toUpperCase()).style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 6, 3, jml_row + 6, 8, true).string('MENGETAHUI,').style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 6, 26, jml_row + 6, 28, true).string('YANG MEMBUAT, ').style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 10, 3, jml_row + 10, 8, true).string(data[0].assigned_mengetahui).style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 10, 26, jml_row + 10, 28, true).string(data[0].assigned_membuat).style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 11, 3, jml_row + 11, 8, true).string(data[0].assigned_jabatan_mengetahui).style({ alignment: { horizontal: ['center'] } })
    sit.cell(jml_row + 11, 26, jml_row + 11, 28, true).string(data[0].assigned_jabatan_membuat).style({ alignment: { horizontal: ['center'] } })












    return wb
}