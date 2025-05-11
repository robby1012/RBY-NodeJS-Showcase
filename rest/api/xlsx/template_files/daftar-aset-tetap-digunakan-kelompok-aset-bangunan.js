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
    var styleSubHeader2 = wb.createStyle({
        font: {
            bold: true,
            size: 8,
        },
        alignment: {
            horizontal: ['right'],
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
    sit.column(29).setWidth(40);
    sit.addImage({
        path: __dirname + '/assets/logo.png',
        type: 'picture',
        position: {
            type: 'twoCellAnchor',
            from: {
                col: 1,
                colOff: 0,
                row: 2,
                rowOff: 0,
            },
            to: {
                col: 8,
                colOff: 0,
                row: 9,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 7, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 8, 3, 19, true)
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
    sit.cell(4, 8, 5, 19, true)
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
    sit.cell(6, 8, 7, 19, true)
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
    sit.cell(8, 8, 9, 19, true)
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
    sit.cell(1, 20, 9, 29, true)
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
        .string('KELOMPOK ASET : BANGUNAN')
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
        .string('ALAMAT ASET TETAP')
        .style(
            styleHeader
        );
    sit.cell(18, 7, 20, 7, true)
        .string('TGL BELI')
        .style(styleHeader);
    sit.cell(18, 8, 20, 8, true)
        .string('UM')
        .style(styleHeader);
    sit.cell(18, 9, 20, 9, true)
        .string('SD TH ' + moment(data[0].periode_cetak).add(-1, 'years').format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 10, 20, 10, true)
        .string('TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 11, 20, 11, true)
        .string('SD TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 12, 18, 14, true)
        .string('IMB')
        .style(styleHeader);
    sit.cell(19, 12, 20, 12, true)
        .string('TANGGAL')
        .style(styleHeader);
    sit.cell(19, 13, 20, 13, true)
        .string('NOMOR')
        .style(styleHeader);
    sit.cell(19, 14, 20, 14, true)
        .string('INSTANSI')
        .style(styleHeader);

    sit.cell(18, 15, 20, 15, true)
        .string('NILAI PEROLEHAN')
        .style(styleHeader);
    sit.cell(18, 16, 20, 16, true)
        .string('NILAI RESIDU')
        .style(styleHeader);
    sit.cell(18, 17, 20, 17, true)
        .string('AKUM PENY S.D THN LALU')
        .style(styleHeader);
    sit.cell(18, 18, 20, 18, true)
        .string('PENURUNAN NILAI')
        .style(styleHeader);
    sit.cell(18, 19, 20, 19, true)
        .string('KOREKSI AKM. PENYUSUTAN')
        .style(styleHeader);
    sit.cell(18, 20, 20, 20, true)
        .string('NILAI YANG DISUSUTKAN')
        .style(styleHeader);
    sit.cell(18, 21, 20, 21, true)
        .string('SISA UM TH ' + moment(data[0].periode_cetak).format('YYYY'))
        .style(styleHeader);
    sit.cell(18, 22, 18, 24, true)
        .string('BEBAN PENYUSUTAN TH BERJALAN')
        .style(styleHeader);
    sit.cell(19, 22, 20, 22, true)
        .string('SD BLN LALU')
        .style(styleHeader);
    sit.cell(19, 23, 20, 23, true)
        .string('BULAN INI')
        .style(styleHeader);
    sit.cell(19, 24, 20, 24, true)
        .string('SD BULAN INI')
        .style(styleHeader);
    sit.cell(18, 25, 20, 25, true)
        .string('AKUM PENY S/D BULAN INI')
        .style(styleHeader);
    sit.cell(18, 26, 20, 26, true)
        .string('NILAI BUKU PER BULAN LAPORAN')
        .style(styleHeader);
    sit.cell(18, 27, 18, 28, true)
        .string('KONDISI')
        .style(styleHeader);
    sit.cell(19, 27, 20, 27, true)
        .string('BAIK')
        .style(styleHeader);
    sit.cell(19, 28, 20, 28, true)
        .string('RUSAK')
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
        .string('7')
        .style(styleSubHeader);
    sit.cell(21, 8)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 9)
        .string(moment(data[0].periode_cetak).add(-1, 'years').format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 10)
        .string(moment(data[0].periode_cetak).format('DD-MM-YYYY'))
        .style(styleSubHeader);
    sit.cell(21, 11)
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 12)
        .string('8')
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
        .string('12 = 20% X 11')
        .style(styleSubHeader);
    sit.cell(21, 17)
        .string('13')
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
        .string('')
        .style(styleSubHeader);
    sit.cell(21, 22)
        .string('17')
        .style(styleSubHeader);
    sit.cell(21, 23)
        .string('18= ( 16 - 12 ) / UM')
        .style(styleSubHeader);
    sit.cell(21, 24)
        .string('19 = 17 + 18')
        .style(styleSubHeader);
    sit.cell(21, 25)
        .string('20= 13 + 19')
        .style(styleSubHeader);
    sit.cell(21, 26)
        .string('21 = 11 - 20')
        .style(styleSubHeader);
    sit.cell(21, 27, 21, 28, true)
        .string(' Isi dengan tanda angka " 1 "')
        .style(styleSubHeader);
    sit.cell(21, 29)
        .string('22')
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
                        style: 'thin',
                    },
                    bottom: {
                        style: 'double',
                    },
                }
            }
        );

    var dataBody = [];
    var sumDataBody = [];
    var sub_header = [];
    var tbl_data = [];
    var group = groupBy(data, (c) => c.nama_kategori);
    sub_header.push(Object.keys(group, 'nama_kategori'));
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
    
    /* for (var j = 0; j < sub_header[0].length; j++) { */
        //var body_len = group[Object.keys(group)[j]].length
        var sum_kondisi_b = 0;
        

        var sum_kondisi_r = 0;
        

        var sum_nil = 0;
        var sum_nilai_residu = 0
        var sum_akum_sd_thn_lalu = 0
        var sum_nilai_yg_disusutkan = 0
        var sum_peny_sd_bln_lalu = 0    
        var sum_peny_bln_ini = 0
        var sum_peny_sd_bln_ini = 0
        var sum_akum_sd_bln_ini = 0
        var sum_nilai_buku_bln_ini = 0
        var row_n = 0
        for (var i = 0; i < data.length; i++) {
            var kondisi_r = 0;
            var kondisi_b = 0;
            data[i].kondisi_aset == 'B' ? sum_kondisi_b += 1 : sum_kondisi_b
            data[i].kondisi_aset == 'B' ? kondisi_b = 1 : kondisi_b

            data[i].kondisi_aset == 'R' ? sum_kondisi_r += 1 : sum_kondisi_r
            data[i].kondisi_aset == 'R' ? kondisi_r = 1 : kondisi_r
            sum_nil += parseFloat(data[i].nilai_perolehan)
            sum_nilai_residu += parseFloat(data[i].nilai_residu !== null ? data[i].nilai_residu : '0')
            sum_akum_sd_thn_lalu += data[i].akum_sd_thn_lalu
            sum_nilai_yg_disusutkan += data[i].nilai_yg_disusutkan
            sum_peny_sd_bln_lalu += data[i].peny_sd_bln_lalu
            sum_peny_bln_ini += data[i].peny_bln_ini
            sum_peny_sd_bln_ini += data[i].peny_sd_bln_ini
            sum_akum_sd_bln_ini += parseFloat(data[i].akum_peny_sd_bln_ini)
            sum_nilai_buku_bln_ini += data[i].nilai_buku_bln_ini


            
            var no = i + 1
            var n = 22 + i
            row_n = n
            sit.cell(n, 1)
                .string('' + no + '.')
                .style(
                    styleBodyText1
                );
            sit.cell(n, 2)
                .string(data[i].no_reg1)
                .style(
                    styleBodyText1
                );
            sit.cell(n, 3)
                .string(data[i].no_reg2)
                .style(
                    styleBodyText1
                );
            sit.cell(n, 4)
                .string(data[i].no_reg3)
                .style(
                    styleBodyText1
                );
            sit.cell(n, 5)
                .string(data[i].no_reg4)
                .style(
                    styleBodyText1
                );
            sit.cell(n, 6)
                .string(data[i].alamat_aset !== null ? data[i].alamat_aset : '-')
                .style(
                    styleBodyText2
                );
            sit.cell(n, 7)
                .string(data[i].tgl_beli !== null ? moment(data[i].tgl_beli).format('DD-MM-YYYY') : '-')
                .style(styleBodyText2);
            sit.cell(n, 8)
                .number(data[i].umur_manfaat)
                .style(styleBodyText1);
            sit.cell(n, 9)
                .string(data[i].sd_thn_lalu !== null ? data[i].sd_thn_lalu : '-')
                .style(styleBodyText1);
            sit.cell(n, 10)
                .string(data[i].thn_ini !== null ? data[i].thn_ini : '-')
                .style(styleBodyText1);
            sit.cell(n, 11)
                .string(data[i].sd_thn_ini !== null ? data[i].thn_ini : '-')
                .style(styleBodyText1);
            sit.cell(n, 12)
                .string(data[i].bgn_imb_tgl !== null ? moment(data[i].bgn_imb_tgl).format('DD-MM-YYYY') : '-')
                .style(styleBodyText2);
            sit.cell(n, 13)
                .string(data[i].bgn_imb_no !== null && data[i].bgn_imb_no !== '' ? data[i].bgn_imb_no : '-')
                .style(styleBodyText2);
            sit.cell(n, 14)
                .string(data[i].bgn_imb_instansi !== null && data[i].bgn_imb_instansi !== '' ? data[i].bgn_imb_instansi : '-')
                .style(styleBodyText2);

            sit.cell(n, 15)
                .string(currency(data[i].nilai_perolehan))
                .style(styleBodyUang);
            sit.cell(n, 16)
                .string(currency(data[i].nilai_residu))
                .style(styleBodyUang);
            sit.cell(n, 17)
                .string(currency(data[i].akum_sd_thn_lalu))
                .style(styleBodyUang);
            sit.cell(n, 18)
                .string('-')
                .style(styleBodyText1);
            sit.cell(n, 19)
                .string('-')
                .style(styleBodyText1);
            sit.cell(n, 20)
                .string(currency(data[i].nilai_yg_disusutkan))
                .style(styleBodyUang);
            sit.cell(n, 21)
                .string('-')
                .style(styleBodyText1);
            sit.cell(n, 22)
                .string(currency(data[i].peny_sd_bln_lalu))
                .style(styleBodyUang);
            sit.cell(n, 23)
                .string(data[i].peny_bln_ini !== null ? currency(data[i].peny_bln_ini) : currency(0))
                .style(styleBodyUang);
            sit.cell(n, 24)
                .string(currency(data[i].peny_sd_bln_ini))
                .style(styleBodyUang);
            sit.cell(n, 25)
                .string(data[i].akum_peny_sd_bln_ini !== null ? currency(data[i].akum_peny_sd_bln_ini) : currency(0))
                .style(styleBodyUang);
            sit.cell(n, 26)
                .string(data[i].nilai_buku_bln_ini !== null ? currency(data[i].nilai_buku_bln_ini) : currency(0))
                .style(styleBodyUang);
            sit.cell(n, 27)
                .number(kondisi_b)
                .style(styleBodyText1);
            sit.cell(n, 28)
                .number(kondisi_r)
                .style(styleBodyText1);
            sit.cell(n, 29)
                .string(data[i].keterangan !== null ? data[i].keterangan : '-')
                .style(
                    {
                        font: {
                            bold: true,
                            size: 11,
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
                    }
                );
        }

    var row = row_n+1
    /* } */
    sit.cell(row, 1)
        .string('')
        .style(
            styleSubHeader
        );
    sit.cell(row, 2, row, 14, true)
        .string('Total')
        .style(
            styleSubHeader
        );
    sit.cell(row, 15)
        .string(currency(sum_nil))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 16)
        .string(currency(sum_nilai_residu))
        .style(
            styleBodyUang
        );
    sit.cell(row, 17)
        .string(currency(sum_akum_sd_thn_lalu))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 18)
        .string('-')
        .style(
            styleSubHeader
        );
    sit.cell(row, 19)
        .string('-')
        .style(
            styleSubHeader
        );
    sit.cell(row, 20)
        .string(currency(sum_nilai_yg_disusutkan))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 21)
        .string('-')
        .style(
            styleSubHeader
        );
    sit.cell(row, 22)
        .string(currency(sum_peny_sd_bln_lalu))
        .style(
            styleBodyUang
        );
    sit.cell(row, 23)
        .string(currency(sum_peny_bln_ini))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 24)
        .string(currency(sum_peny_sd_bln_ini))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 25)
        .string(currency(sum_akum_sd_bln_ini))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 26)
        .string(currency(sum_nilai_buku_bln_ini))
        .style(
            styleSubHeader2
        );
    sit.cell(row, 27)
        .number(sum_kondisi_b)
        .style(
            styleSubHeader
        );
    sit.cell(row, 28)
        .number(sum_kondisi_r)
        .style(
            styleSubHeader
        );
    sit.cell(row, 29)
        .string('-')
        .style(
            {
                font: {
                    bold: true,
                    size: 11,
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
            }
        );
    sit.cell(row + 4, 26, row + 4, 28, true).string('JAKARTA, ' + moment().format('DD MMMM YYYY').toUpperCase()).style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 6, 3, row + 6, 8, true).string('MENGETAHUI,').style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 6, 26, row + 6, 28, true).string('YANG MEMBUAT, ').style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 10, 3, row + 10, 8, true).string(data[0].assigned_mengetahui).style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 10, 26, row + 10, 28, true).string(data[0].assigned_membuat).style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 11, 3, row + 11, 8, true).string(data[0].assigned_jabatan_mengetahui).style({ alignment: { horizontal: ['center'] } })
    sit.cell(row + 11, 26, row + 11, 28, true).string(data[0].assigned_jabatan_membuat).style({ alignment: { horizontal: ['center'] } })




    return wb
}