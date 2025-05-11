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
    var bodyTable = []
    var wb = new xl.Workbook();
    var styleHeader = wb.createStyle({
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
    var sit = wb.addWorksheet('Rekap Non Kap Peralatan Kantor')
    sit.column(1).setWidth(5);
    sit.column(2).setWidth(5);
    sit.column(3).setWidth(5);
    sit.column(4).setWidth(5);
    sit.column(5).setWidth(5);
    sit.column(6).setWidth(30);
    sit.column(9).setWidth(20);
    sit.column(14).setWidth(20);
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
                col: 7,
                colOff: 0,
                row: 8,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 6, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 7, 3, 10, true)
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
    sit.cell(4, 7, 5, 10, true)
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
    sit.cell(6, 7, 7, 10, true)
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
    sit.cell(8, 7, 9, 10, true)
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
    sit.cell(1, 11, 9, 14, true)
        .string('REKAPITULASI ASET NON KAPITALISASI')
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

    sit.cell(11, 1, 11, 14, true)
        .string('DAFTAR ASET YANG MASIH DIGUNAKAN NON KAPITALISASI')
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
        .string('KELOMPOK ASET : PERALATAN KANTOR')
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
        .style(
            styleHeader
        );

    sit.cell(18, 8, 20, 8, true)
        .string('TGL BELI')
        .style(
            styleHeader
        );
    sit.cell(18, 9, 20, 9, true)
        .string('NILAI PEROLEHAN')
        .style(
            styleHeader
        )
    sit.cell(18, 10, 18, 13, true)
        .string('KONDISI')
        .style(
            styleHeader
        );
    sit.cell(19, 10, 20, 10, true)
        .string('BAIK')
        .style(
            styleHeader
        );
    sit.cell(19, 11, 20, 11, true)
        .string('RUSAK')
        .style(
            styleHeader
        );
    sit.cell(19, 12, 20, 12, true)
        .string('USANG')
        .style(
            styleHeader
        );
    sit.cell(19, 13, 20, 13, true)
        .string('HILANG')
        .style(
            styleHeader
        );
    sit.cell(18, 14, 20, 14, true)
        .string('KET')
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
    for (var i = 1; i <= 9; i++) {
        sit.cell(21, i)
            .number(i)
            .style(
                styleSubHeader
            );
    }
    sit.cell(21, 10, 21, 13, true)
        .string('Isi dengan tanda angka " 1 "')
        .style(
            styleSubHeader
        );
    sit.cell(21, 14)
        .number(10)
        .style(
            {
                font: {
                    size: 8,
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
                    }
                }
            }
        );
    var temp = [];
    var sub_header = [];
    var group = groupBy(data, (c) => c.nama_kategori);
    sub_header.push(Object.keys(group, 'nama_kategori',));
    //temp.toString()
    var tot_nilaiperolehan = 0
    var tot_kondisi_b = 0
    var tot_kondisi_rr = 0
    var tot_kondisi_rb = 0
    var tot_kondisi_h = 0
    var row_n = 0
    var tot_n
    var sum_n = 0
    var row_sub = 22
    for (var j = 0; j < sub_header[0].length; j++) {
        var body_len = group[Object.keys(group)[j]].length
        var no = j + 1;
        var kondisi_b = 0;
        var kondisi_rr = 0;
        var kondisi_rb = 0;
        var kondisi_h = 0;
        var sum_nilaiperolehan = 0;
        row_sub += 0
        if (j > 0) {
            row_sub += 2
            var body_len2 = group[Object.keys(group)[j - 1]].length
            row_sub += body_len2

        }
        sit.cell(row_sub, 1, row_sub, 14, true)
            .string(romawi(no) + '. ' + sub_header[0][j])
            .style(styleSubHeader1);
        var jml_row
        for (var i = 0; i < body_len; i++) {
            var item = group[Object.keys(group)[j]][i];
            var nos = i + 1
            var row_body = row_sub + nos
            jml_row = row_body
            sum_nilaiperolehan += parseFloat(item.nilai_perolehan)
            item.kondisi_aset == 'B' ? kondisi_b += 1 : kondisi_b
            item.kondisi_aset == 'R' ? kondisi_rr += 1 : kondisi_rr
            item.kondisi_aset == 'U' ? kondisi_rb += 1 : kondisi_rb
            item.kondisi_aset == 'H' ? kondisi_h += 1 : kondisi_h

            tot_nilaiperolehan += parseFloat(item.nilai_perolehan)
            item.kondisi_aset == 'B' ? tot_kondisi_b += 1 : tot_kondisi_b
            item.kondisi_aset == 'R' ? tot_kondisi_rr += 1 : tot_kondisi_rr
            item.kondisi_aset == 'U' ? tot_kondisi_rb += 1 : tot_kondisi_rb
            item.kondisi_aset == 'H' ? tot_kondisi_h += 1 : tot_kondisi_h
            sit.cell(row_body, 1)
                .string((i + 1).toString() + '.')
                .style(styleBody);
            sit.cell(row_body, 2)
                .string(item.no_reg1)
                .style(styleBody);
            sit.cell(row_body, 3)
                .string(item.no_reg2)
                .style(styleBody);
            sit.cell(row_body, 4)
                .string(item.no_reg3)
                .style(styleBody);
            sit.cell(row_body, 5)
                .string(item.no_reg4)
                .style(styleBody);
            sit.cell(row_body, 6)
                .string(item.nama_aset)
                .style(styleBody);
            sit.cell(row_body, 7)
                .string(item.aset_merk + ' / ' + item.aset_type)
                .style(styleBody);
            sit.cell(row_body, 8)
                .string(item.tgl_beli !== null ? moment(item.tgl_beli).format('DD-MM-YYYY').toUpperCase() : '-')
                .style(styleBody);
            sit.cell(row_body, 9)
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
            sit.cell(row_body, 10)
                .number(item.kondisi_aset == 'B' ? 1 : 0)
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
            sit.cell(row_body, 11)
                .number(item.kondisi_aset == 'R' ? 1 : 0)
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
            sit.cell(row_body, 12)
                .number(item.kondisi_aset == 'U' ? 1 : 0)
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
            sit.cell(row_body, 13)
                .number(item.kondisi_aset == 'H' ? 1 : 0)
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
            item.keterangan !== null ?
                sit.cell(row_body, 14)
                    .string(item.keterangan.toUpperCase())
                    .style(
                        {
                            font: {
                                size: 9,
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
                    )
                :
                sit.cell(row_body, 14)
                    .string('-')
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
                    )
        }
        sit.cell(jml_row + 1, 1)
            .string('0')
            .style(
                {
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
                }
            );
        sit.cell(jml_row + 1, 2, jml_row + 1, 8, true)
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
        sit.cell(jml_row + 1, 9)
            .string(currency(sum_nilaiperolehan))
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
        sit.cell(jml_row + 1, 10)
            .number(kondisi_b)
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
        sit.cell(jml_row + 1, 11)
            .number(kondisi_rr)
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
        sit.cell(jml_row + 1, 12)
            .number(kondisi_rb)
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
        sit.cell(jml_row + 1, 13)
            .number(kondisi_h)
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
        sit.cell(jml_row + 1, 14)
            .string('')
            .style(styleSubHeader1);
        sum_n = jml_row
    }
    sit.cell(sum_n + 2, 1, sum_n + 2, 8, true)
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 9)
        .string(currency(tot_nilaiperolehan))
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 10)
        .number(tot_kondisi_b)
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 11)
        .number(tot_kondisi_rr)
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 12)
        .number(tot_kondisi_rb)
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 13)
        .number(tot_kondisi_h)
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
                        style: 'double',
                    },
                }
            }
        );
    sit.cell(sum_n + 2, 14)
        .string('-')
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
                        style: 'double',
                    },
                }
            }
        );




    sit.cell(sum_n + 4, 10, sum_n + 4, 14, true)
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

    sit.cell(sum_n + 6, 3, sum_n + 6, 7, true)
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
    sit.cell(sum_n + 6, 10, sum_n + 6, 14, true)
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
    sit.cell(sum_n + 12, 3, sum_n + 12, 7, true)
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
    sit.cell(sum_n + 12, 10, sum_n + 12, 14, true)
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
    sit.cell(sum_n + 13, 3, sum_n + 13, 7, true)
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
    sit.cell(sum_n + 13, 10, sum_n + 13, 14, true)
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