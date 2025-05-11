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
function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
moment.locale('id')
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
    var sit = wb.addWorksheet('Daftar Aset Tetap Digunakan Peralatan Komputer')
    sit.row(18).setHeight(30);
    sit.column(1).setWidth(5);
    sit.column(2).setWidth(40);
    sit.column(3).setWidth(20);
    sit.column(4).setWidth(30);
    sit.column(5).setWidth(20);
    sit.column(6).setWidth(20);
    sit.column(7).setWidth(20);
    sit.column(8).setWidth(20);
    sit.addImage({
        path: __dirname + '/assets/logo.png',
        type: 'picture',
        position: {
            type: 'twoCellAnchor',
            from: {
                col: 1,
                colOff: 0,
                row: 3,
                rowOff: 0,
            },
            to: {
                col: 3,
                colOff: 0,
                row: 8,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 2, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 3, 3, 5, true)
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
    sit.cell(4, 3, 5, 5, true)
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
    sit.cell(6, 3, 7, 5, true)
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
    sit.cell(8, 3, 9, 5, true)
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
    sit.cell(1, 6, 9, 8, true)
        .string('REKAPITULASI ASET NON KAPITLAISASI')
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


    sit.cell(11, 1, 11, 8, true)
        .string('BPJS KETENAGAKERJAAN RUSUNAWA ' + data[0].nama_rusun)
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
    sit.cell(12, 1, 12, 8, true)
        .string('REKAPITULASI ASET NON KAPITALISASI YANG MASIH DIGUNAKAN ')
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
    sit.cell(14, 1, 14, 8, true)
        .string('PER ' + data[0].periode_cetak !== undefined ? moment(data[0].periode_cetak).format('MMMM YYYY').toUpperCase() : '-')
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
    sit.cell(16, 1, 18, 1, true)
        .string('NO')
        .style(styleHeader);
    sit.cell(16, 2, 18, 2, true)
        .string('KELOMPOK ASET TETAP')
        .style(
            styleHeader
        );
    sit.cell(16, 3, 18, 3, true)
        .string('JUMLAH UNIT')
        .style(
            styleHeader
        );
    sit.cell(16, 4, 18, 4, true)
        .string('NILAI PEROLEHAN')
        .style(styleHeader);
    sit.cell(16, 5, 16, 8, true)
        .string('KONDISI')
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
    sit.cell(17, 5, 18, 5, true)
        .string('BAIK')
        .style(styleHeader);
    sit.cell(17, 6, 18, 6, true)
        .string('RUSAK')
        .style(styleHeader);
    sit.cell(17, 7, 18, 7, true)
        .string('USANG')
        .style(styleHeader);
    sit.cell(17, 8, 18, 8, true)
        .string('HILANG')
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
                        style: 'thin',
                    },
                    bottom: {
                        style: 'double',
                    },
                }
            }
        );


    var sub_header = [];
    var body = [];
    var footer = [];
    var group = groupBy(data, (c) => c.ket_level1)
    sub_header.push(Object.keys(group, 'ket_level1'));
    tot_unit = 0
    tot_nilaiperolehan = 0
    //'kosong'
    tot_peny_thnlalu = 0
    tot_peny_thnini_blnlalu = 0
    tot_peny_blnini = 0
    tot_peny_thnsd_blnini = 0
    tot_peny_sd_blnini = 0
    tot_nil_buku = 0
    tot_baik = 0
    tot_rusak = 0
    tot_rusak_berat = 0
    tot_hilang = 0
    var sum_n = 0
    var row_sub = 19
    for (var j = 0; j < sub_header[0].length; j++) {
        var body_len = group[Object.keys(group)[j]].length
        var no = j + 1;
        var sum_unit = 0
        var sum_nilaiperolehan = 0
        //'kosong'
        var sum_peny_thnlalu = 0
        var sum_peny_blnini = 0
        var sum_peny_thnini_blnlalu = 0
        var sum_peny_thnsd_blnini = 0
        var sum_peny_sd_blnini = 0
        var sum_nil_buku = 0
        var sum_baik = 0
        var sum_rusak = 0
        var sum_rusak_berat = 0
        var sum_hilang = 0
        row_sub += 0
        if (j > 0) {
            row_sub += 2
            var body_len2 = group[Object.keys(group)[j - 1]].length
            row_sub += body_len2
        }
        sit.cell(row_sub, 1, row_sub, 8, true)
            .string(sub_header[0][j])
            .style(styleSubHeader1);
        var jml_row
        for (var i = 0; i < body_len; i++) {
            var item = group[Object.keys(group)[j]][i];
            var nos = i + 1
            var row_body = row_sub + nos
            jml_row = row_body
            sit.cell(row_body, 1)
                .string('')
                .style(styleBody);
            sit.cell(row_body, 2)
                .string(item.ket_level2)
                .style(styleBody);
            sit.cell(row_body, 3)
                .number(item.jml_barang)
                .style(
                    {
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
                    }
                );
            sit.cell(row_body, 4)
                .string(currency(item.nilai_perolehan))
                .style(
                    {
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
                    }
                );
            sit.cell(row_body, 5)
                .number(item.jml_baik)
                .style(
                    {
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
                    }
                );
            sit.cell(row_body, 6)
                .number(item.jml_rusak)
                .style(
                    {
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
                    }
                );
            sit.cell(row_body, 7)
                .number(item.jml_rusak_berat)
                .style(
                    {
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
                    }
                );
            sit.cell(row_body, 8)
                .number(item.jml_hilang)
                .style(
                    {
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
            sum_unit += item.jml_barang
            sum_nilaiperolehan += item.nilai_perolehan
            //'kosong'
            sum_baik += item.jml_baik;
            sum_rusak += item.jml_rusak;
            sum_rusak_berat += item.jml_rusak_berat;
            sum_hilang += item.jml_hilang;

            //TOTAL
            tot_unit += item.jml_barang
            tot_nilaiperolehan += item.nilai_perolehan
            //'kosong'
            tot_baik += item.jml_baik
            tot_rusak += item.jml_rusak
            tot_rusak_berat += item.jml_rusak_berat
            tot_hilang += item.jml_hilang
        }
        sit.cell(jml_row + 1, 1)
            .string('')
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 2)
            .string('JUMLAH')
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 3)
            .number(sum_unit)
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 4)
            .string(currency(sum_nilaiperolehan))
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 5)
            .number(sum_baik)
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 6)
            .number(sum_rusak)
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 7)
            .number(sum_rusak_berat)
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 8)
            .number(sum_hilang)
            .style(
                {
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
                }
            );
        sum_n = jml_row
    }
    sit.cell(sum_n + 2, 1)
        .string('')
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 2)
        .string('GRAND TOTAL')
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 3)
        .number(tot_unit)
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 4)
        .string(currency(tot_nilaiperolehan))
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 5)
        .number(tot_baik)
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 6)
        .number(tot_rusak)
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 7)
        .number(tot_rusak_berat)
        .style(
            {
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
            }
        );
    sit.cell(sum_n + 2, 8)
        .number(tot_hilang)
        .style(
            {
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
            }
        );


    sit.cell(sum_n + 4, 5, sum_n + 4, 8, true)
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

    sit.cell(sum_n + 6, 1, sum_n + 6, 3, true)
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
    sit.cell(sum_n + 6, 5, sum_n + 6, 8, true)
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
    sit.cell(sum_n + 12, 1, sum_n + 12, 3, true)
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
    sit.cell(sum_n + 12, 5, sum_n + 12, 8, true)
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
    sit.cell(sum_n + 13, 1, sum_n + 13, 3, true)
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
    sit.cell(sum_n + 13, 5, sum_n + 13, 8, true)
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