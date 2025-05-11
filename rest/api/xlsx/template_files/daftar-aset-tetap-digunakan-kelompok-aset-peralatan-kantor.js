const xl = require('excel4node');
const moment = require('moment')
const { isNumber } = require("validate.js");
moment.locale('id')
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
            size: 9,
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
                style: 'thin',
            },
        }

    });
    var styleSubHeader1 = wb.createStyle({
        font: {
            bold: true,
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
    var styleSubHeader2 = wb.createStyle({
        font: {
            bold: true,
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
    var styleBodyUang = wb.createStyle({
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
    var styleBodyText1 = wb.createStyle({
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

    var styleBodyText2 = wb.createStyle({
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
    var sit = wb.addWorksheet('Daftar Aset Tetap Digunakan Peralatan Kantor')
    sit.row(18).setHeight(30);
    sit.column(1).setWidth(5);
    sit.column(2).setWidth(5);
    sit.column(3).setWidth(5);
    sit.column(4).setWidth(5);
    sit.column(5).setWidth(5);
    sit.column(6).setWidth(30);
    sit.column(9).setWidth(20);
    sit.column(29).setWidth(50);
    sit.addImage({
        path: __dirname + '/assets/logo.png',
        type: 'picture',
        position: {
            type: 'twoCellAnchor',
            from: {
                col: 2,
                colOff: 0,
                row: 2,
                rowOff: 0,
            },
            to: {
                col: 10,
                colOff: 0,
                row: 9,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 11, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 12, 3, 20, true)
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
    sit.cell(4, 12, 5, 20, true)
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
    sit.cell(6, 12, 7, 20, true)
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
    sit.cell(8, 12, 9, 20, true)
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
                        style: 'double',
                    },
                },
                alignment: {
                    vertical: 'center'
                }
            }
        );
    sit.cell(1, 21, 9, 29, true)
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
                        style: 'double',
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

    sit.cell(11, 1, 11, 29, true)
        .string('DAFTAR ASET TETAP YANG MASIH DIGUNAKAN')
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


    sit.cell(13, 1, 13, 29, true)
        .string('BPJS KETENAGAKERJAAN RUSUNAWA ' + data[0].nama_rusun)
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
    sit.cell(14, 1, 14, 29, true)
        .string('KELOMPOK ASET : PERALATAN KANTOR')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                },

            }
        );
    sit.cell(16, 1, 16, 29, true)
        .string('PER ' + data[0].periode_cetak !== undefined ? moment(data[0].periode_cetak).format('MMMM YYYY').toUpperCase() : '-')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
    sit.cell(18, 1, 20, 1, true)
        .string('NO')
        .style(styleHeader);
    sit.cell(18, 2, 20, 5, true)
        .string('NO. REGISTRASI')
        .style(
            styleHeader
        );
    sit.cell(18, 6, 20, 6, true)
        .string('NAMA ASET TETAP')
        .style(
            styleHeader
        );
    sit.cell(18, 7, 20, 7, true)
        .string('MERK/TYPE')
        .style(styleHeader);
    sit.cell(18, 8, 20, 8, true)
        .string('TGL BELI')
        .style(styleHeader);
    sit.cell(18, 9, 20, 9, true)
        .string('UM')
        .style(styleHeader);
    sit.cell(18, 10, 20, 10, true)
        .string('SD TH ' + moment(data[0].periode_cetak).add(-1, 'years').format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 11, 20, 11, true)
        .string('TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 12, 20, 12, true)
        .string('SD TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 13, 20, 13, true)
        .string('NILAI PEROLEHAN')
        .style(styleHeader);
    sit.cell(18, 14, 20, 14, true)
        .string('NILAI RESIDU')
        .style(styleHeader);
    sit.cell(18, 15, 20, 15, true)
        .string('AKUM PENY S.D THN LALU')
        .style(styleHeader);
    sit.cell(18, 16, 20, 16, true)
        .string('PENURUNAN NILAI')
        .style(styleHeader);
    sit.cell(18, 17, 20, 17, true)
        .string('KOREKSI PENYUSUTAN NILAI')
        .style(styleHeader);
    sit.cell(18, 18, 20, 18, true)
        .string('NILAI YANG DISUSUTKAN')
        .style(styleHeader);
    sit.cell(18, 19, 20, 19, true)
        .string('SISA UM TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 20, 18, 22, true)
        .string('BEBAN PENYUSUTAN TH BERJALAN')
        .style(styleHeader);
    sit.cell(19, 20, 20, 20, true)
        .string('SD BLN LALU')
        .style(styleHeader);
    sit.cell(19, 21, 20, 21, true)
        .string('BULAN INI')
        .style(styleHeader);
    sit.cell(19, 22, 20, 22, true)
        .string('SD BULAN INI')
        .style(styleHeader);
    sit.cell(18, 23, 20, 23, true)
        .string('AKUM PENY S/D BULAN INI')
        .style(styleHeader);
    sit.cell(18, 24, 20, 24, true)
        .string('NILAI BUKU PER BULAN LAPORAN')
        .style(styleHeader);
    sit.cell(18, 25, 18, 28, true)
        .string('KONDISI')
        .style(styleHeader);
    sit.cell(19, 25, 20, 25, true)
        .string('BAIK')
        .style(styleHeader);
    sit.cell(19, 26, 20, 26, true)
        .string('RUSAK')
        .style(styleHeader);
    sit.cell(19, 27, 20, 27, true)
        .string('USANG')
        .style(styleHeader);
    sit.cell(19, 28, 20, 28, true)
        .string('HILANG')
        .style(styleHeader);
    sit.cell(18, 29, 20, 29, true)
        .string('KETERANGAN')
        .style(
            {
                font: {
                    bold: true,
                    size: 11,
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
                        style: 'double',
                    },
                    top: {
                        style: 'double',
                    },
                    bottom: {
                        style: 'double',
                    },
                }
            }
        );

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
        .string('/')
        .style(styleSubHeader);
    sit.cell(21, 8)
        .string('12/01/1900')
        .style(styleSubHeader);
    sit.cell(21, 9)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 10)
        .string(moment(data[0].periode_cetak).add(-1, 'years').format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 11)
        .string(moment(data[0].periode_cetak).format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 12)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 13)
        .string('9')
        .style(styleSubHeader);
    sit.cell(21, 14)
        .string('10')
        .style(styleSubHeader);
    sit.cell(21, 15)
        .string('11')
        .style(styleSubHeader);
    sit.cell(21, 16)
        .string('12')
        .style(styleSubHeader);
    sit.cell(21, 17)
        .string('13')
        .style(styleSubHeader);
    sit.cell(21, 18)
        .string('14')
        .style(styleSubHeader);
    sit.cell(21, 19)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 20)
        .string('15')
        .style(styleSubHeader);
    sit.cell(21, 21)
        .string('16')
        .style(styleSubHeader);
    sit.cell(21, 22)
        .string('17 = 15+16')
        .style(styleSubHeader);
    sit.cell(21, 23)
        .string('18 = 11 +17')
        .style(styleSubHeader);
    sit.cell(21, 24)
        .string('19 = 9 - 18')
        .style(styleSubHeader);
    sit.cell(21, 25, 21, 28, true)
        .string('Isi dengan tanda angka " 1 "')
        .style(styleSubHeader);
    sit.cell(21, 29)
        .string('20')
        .style(
            {
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
                        style: 'double',
                    },
                    top: {
                        style: 'double',
                    },
                    bottom: {
                        style: 'thin',
                    },
                }
            }
        );

    var dataBody = [];
    var sumDataBody = [];
    var sub_header = [];
    var tbl_data = [];
    var group = groupBy(data, (c) => c.nama_kelompok);
    sub_header.push(Object.keys(group, 'nama_kelompok'));
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

        var sum_kondisi_rr = 0;

        var sum_kondisi_rb = 0;

        var sum_kondisi_h = 0;
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
        sit.cell(row_sub, 1, row_sub, 29, true)
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
            var kondisi_b = 0;
            var kondisi_rr = 0;
            var kondisi_rb = 0;
            var kondisi_h = 0;
            var nos = i + 1
            var row_body = row_sub + nos
            jml_row = row_body
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
            item.nilai_residu !== null ? sum_nilai_residu += parseFloat(item.nilai_residu) : sum_nilai_residu += 0
            sum_akum_sd_thn_lalu += item.akum_sd_thn_lalu
            sum_nilai_yg_disusutkan += item.nilai_yg_disusutkan
            sum_peny_sd_bln_lalu += item.peny_sd_bln_lalu
            sum_peny_bln_ini += item.peny_bln_ini
            sum_peny_sd_bln_ini += item.peny_sd_bln_ini
            sum_akum_sd_bln_ini += parseFloat(item.akum_peny_sd_bln_ini)
            sum_nilai_buku_bln_ini += item.nilai_buku_bln_ini

            console.log(item.nilai_residu)
            //grand total
            tot_kondisi_b = item.kondisi_aset == 'B' ? tot_kondisi_b += 1 : tot_kondisi_b
            tot_kondisi_rr = item.kondisi_aset == 'R' ? tot_kondisi_rr += 1 : tot_kondisi_rr
            tot_kondisi_rb = item.kondisi_aset == 'U' ? tot_kondisi_rb += 1 : tot_kondisi_rb
            tot_kondisi_h = item.kondisi_aset == 'U' ? tot_kondisi_h += 1 : tot_kondisi_h
            tot_nil += parseFloat(item.nilai_perolehan)
            item.nilai_residu !== null ? tot_nilai_residu += parseFloat(item.nilai_residu) : tot_nilai_residu += 0
            tot_akum_sd_thn_lalu += item.akum_sd_thn_lalu
            tot_nilai_yg_disusutkan += item.nilai_yg_disusutkan
            tot_peny_sd_bln_lalu += item.peny_sd_bln_lalu
            tot_peny_bln_ini += item.peny_bln_ini
            tot_peny_sd_bln_ini += item.peny_sd_bln_ini
            tot_akum_sd_bln_ini += parseFloat(item.akum_peny_sd_bln_ini)
            tot_nilai_buku_bln_ini += item.nilai_buku_bln_ini

            sit.cell(row_body, 1).string((i + 1).toString() + '.').style(styleBody);
            sit.cell(row_body, 2).string(item.no_reg1).style(styleBody);
            sit.cell(row_body, 3).string(item.no_reg2).style(styleBody);
            sit.cell(row_body, 4).string(item.no_reg3).style(styleBody);
            sit.cell(row_body, 5).string(item.no_reg4).style(styleBody);
            sit.cell(row_body, 6).string(item.nama_aset).style(styleBody);
            sit.cell(row_body, 7).string(item.aset_type).style(styleBody);
            sit.cell(row_body, 8).string(item.tgl_beli !== null ? moment(item.tgl_beli).format('DD-MM-YYYY') : '-').style(styleBody);
            sit.cell(row_body, 9).number(item.umur_manfaat).style(styleBodyText1);
            sit.cell(row_body, 10).string(item.sd_thn_lalu !== null ? item.sd_thn_lalu : '-').style(styleBodyText1);
            sit.cell(row_body, 11).string(item.thn_ini !== null ? item.thn_ini : '-').style(styleBodyText1);
            sit.cell(row_body, 12).string(item.sd_tahun_ini !== null ? item.sd_tahun_ini : '-').style(styleBodyText1);
            sit.cell(row_body, 13).string(currency(item.nilai_perolehan)).style(styleBodyUang);
            sit.cell(row_body, 14).string(currency(item.nilai_residu)).style(styleBodyUang);
            sit.cell(row_body, 15).string(currency(item.akum_sd_thn_lalu)).style(styleBodyUang);
            sit.cell(row_body, 16).string('-').style(styleBodyText1);
            sit.cell(row_body, 17).string('-').style(styleBodyText1);
            sit.cell(row_body, 18).string(currency(item.nilai_yg_disusutkan)).style(styleBodyUang);
            sit.cell(row_body, 19).string('-').style(styleBodyText1);
            sit.cell(row_body, 20).string(currency(item.peny_sd_bln_lalu)).style(styleBodyUang);
            sit.cell(row_body, 21).string(item.peny_bln_ini !== null ? currency(item.peny_bln_ini) : currency(0)).style(styleBodyUang);
            sit.cell(row_body, 22).string(currency(item.peny_sd_bln_ini)).style(styleBodyUang);
            sit.cell(row_body, 23).string(item.akum_peny_sd_bln_ini !== null ? currency(item.akum_peny_sd_bln_ini) : currency(0)).style(styleBodyUang);
            sit.cell(row_body, 24).string(item.nilai_buku_bln_ini !== null ? currency(item.nilai_buku_bln_ini) : currency(0)).style(styleBodyUang);
            sit.cell(row_body, 25).number(kondisi_b).style(styleBodyText1);
            sit.cell(row_body, 26).number(kondisi_rr).style(styleBodyText1);
            sit.cell(row_body, 27).number(kondisi_rb).style(styleBodyText1);
            sit.cell(row_body, 28).number(kondisi_h).style(styleBodyText1);
            sit.cell(row_body, 29).string(item.keterangan !== null ? item.keterangan : '-').style({
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
        }
        sit.cell(jml_row + 1, 1).string('0').style(styleSubHeader);
        sit.cell(jml_row + 1, 2, jml_row + 1, 12, true).string('JUMLAH').style(styleSubHeader);
        sit.cell(jml_row + 1, 13).string(currency(sum_nil)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 14).string(currency(sum_nilai_residu)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 15).string(currency(sum_akum_sd_thn_lalu)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 16).string('-').style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 17).string('-').style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 18).string(currency(sum_nilai_yg_disusutkan)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 19).string('-').style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 20).string(currency(sum_peny_sd_bln_lalu)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 21).string(currency(sum_peny_bln_ini)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 22).string(currency(sum_peny_sd_bln_ini)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 23).string(currency(sum_akum_sd_bln_ini)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 24).string(currency(sum_nilai_buku_bln_ini)).style({
            font: {
                bold: true,
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
        sit.cell(jml_row + 1, 25).number(sum_kondisi_b).style(styleSubHeader);
        sit.cell(jml_row + 1, 26).number(sum_kondisi_rr).style(styleSubHeader);
        sit.cell(jml_row + 1, 27).number(sum_kondisi_rb).style(styleSubHeader);
        sit.cell(jml_row + 1, 28).number(sum_kondisi_h).style(styleSubHeader);
        sit.cell(jml_row + 1, 29).string('-').style({
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
        sum_n = jml_row
    }
    sit.cell(sum_n + 2, 1).string('0').style({
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
    sit.cell(sum_n + 2, 2, sum_n + 2, 12, true).string('JUMLAH TOTAL').style({
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
    sit.cell(sum_n + 2, 13).string(currency(tot_nil)).style({
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
    sit.cell(sum_n + 2, 14).string(currency(tot_nilai_residu)).style({
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
    sit.cell(sum_n + 2, 15).string(currency(tot_akum_sd_thn_lalu)).style({
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
    sit.cell(sum_n + 2, 16).string('-').style({
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
    sit.cell(sum_n + 2, 17).string('-').style({
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
    sit.cell(sum_n + 2, 18).string(currency(tot_nilai_yg_disusutkan)).style({
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
    sit.cell(sum_n + 2, 19).string('-').style({
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
    sit.cell(sum_n + 2, 20).string(currency(tot_peny_sd_bln_lalu)).style({
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
    sit.cell(sum_n + 2, 21).string(currency(tot_peny_bln_ini)).style({
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
    sit.cell(sum_n + 2, 22).string(currency(tot_peny_sd_bln_ini)).style({
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
    sit.cell(sum_n + 2, 23).string(currency(tot_akum_sd_bln_ini)).style({
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
    sit.cell(sum_n + 2, 24).string(currency(tot_nilai_buku_bln_ini)).style({
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
    sit.cell(sum_n + 2, 25).number(tot_kondisi_b).style({
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
    sit.cell(sum_n + 2, 26).number(tot_kondisi_rr).style({
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
    sit.cell(sum_n + 2, 27).number(tot_kondisi_rb).style({
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
    sit.cell(sum_n + 2, 28).number(tot_kondisi_h).style({
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
    sit.cell(sum_n + 2, 29).string('-').style({
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
                style: 'double',
            },
            top: {
                style: 'thin',
            },
            bottom: {
                style: 'double',
            },
        }
    });
    sit.cell(sum_n + 4, 21, sum_n + 4, 25, true)
        .string('JAKARTA, ' + moment().format('DD MMMM YYYY').toUpperCase())
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );

    sit.cell(sum_n + 6, 3, sum_n + 6, 8, true)
        .string('Mengetahui,')
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    sit.cell(sum_n + 6, 21, sum_n + 6, 25, true)
        .string('Yang Membuat,')
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    sit.cell(sum_n + 12, 3, sum_n + 12, 8, true)
        .string(data[0].assigned_mengetahui)
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    sit.cell(sum_n + 12, 21, sum_n + 12, 25, true)
        .string(data[0].assigned_membuat)
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    sit.cell(sum_n + 13, 3, sum_n + 13, 8, true)
        .string(data[0].assigned_jabatan_mengetahui)
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    sit.cell(sum_n + 13, 21, sum_n + 13, 25, true)
        .string(data[0].assigned_jabatan_membuat)
        .style(
            {
                font: {
                    size: 12,
                },
                alignment: {
                    horizontal: ['center']
                },
            }
        );
    return wb
}