const Excel = require('xlsx')
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
module.exports = function (data) {
    /* const pathToExcelFile = __dirname + '/daftar-aset-tetap-digunakan-kelompok-aset-tanah.xlsx'
    let workbook = Excel.readFile(pathToExcelFile) // reads original file
    let SheetName = workbook.SheetNames[0] //get first sheet in file
    var ws = workbook.Sheets[workbook.SheetNames[0]]; */
    var bodyTable = []
    var wb = new xl.Workbook();
    var sit = wb.addWorksheet('Rekap Aset Tanah')
    var dts = data
    sit.column(6).setWidth(25);
    sit.column(7).setWidth(18);
    sit.column(8).setWidth(18);
    sit.column(9).setWidth(15);
    sit.cell(11, 1, 11, 16, true)
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


    sit.cell(13, 1, 13, 16, true)
        .string('BPJS KETENAGAKERJAAN RUSUNAWA ' + dts[0].nama_rusun)
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
    sit.cell(14, 1, 14, 16, true)
        .string('KELOMPOK ASET : TANAH')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
    sit.cell(16, 1, 16, 16, true)
        .string('PER ' + dts[0].periode_cetak !== undefined ? moment(dts[0].periode_cetak).format('MMMM YYYY').toUpperCase() : '-')
        .style(
            {
                font: {
                    bold: true,
                    size: 12,
                }
            }
        );
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
                style: 'thin',
            },
            bottom: {
                style: 'thin',
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
                col: 6,
                colOff: 0,
                row: 8,
                rowOff: 0,
            },
        },
    });
    sit.cell(1, 1, 9, 5, true)
        .string('')
        .style(styleHeader);
    sit.cell(1, 6, 3, 11, true)
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
    sit.cell(4, 6, 5, 11, true)
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
    sit.cell(6, 6, 7, 11, true)
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
    sit.cell(8, 6, 9, 11, true)
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
    sit.cell(1, 12, 9, 16, true)
        .string('DAFTAR ASET TETAP')
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
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    bgColor: '#808080',
                    fgColor: '#808080',
                },

                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                },
                font: {
                    size: 20,
                    bold: true,
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
        .string('LOKASI ASET TETAP')
        .style(
            styleHeader
        );
    sit.cell(18, 7, 20, 7, true)
        .string('TGL. PEROLEHAN')
        .style(
            styleHeader
        );
    sit.cell(18, 8, 20, 8, true)
        .string('NILAI PEROLEHAN')
        .style(
            styleHeader
        );
    sit.cell(18, 9, 20, 9, true)
        .string('STATUS TANAH')
        .style(
            styleHeader
        );
    sit.cell(18, 10, 18, 12, true)
        .string('SERTIFIKAT')
        .style(
            styleHeader
        );
    sit.cell(19, 10, 20, 10, true)
        .string('NOMOR')
        .style(
            styleHeader
        );
    sit.cell(19, 11, 20, 11, true)
        .string('MASA BERLAKU')
        .style(
            styleHeader
        );
    sit.cell(19, 12, 20, 12, true)
        .string('TGL BERAKHIR')
        .style(
            styleHeader
        );
    sit.cell(18, 13, 20, 13, true)
        .string('LUAS (M2)')
        .style(
            styleHeader
        );

    sit.cell(18, 14, 18, 15, true)
        .string('KONDISI')
        .style(
            styleHeader
        );
    sit.cell(19, 14, 20, 14, true)
        .string('BAIK')
        .style(
            styleHeader
        );
    sit.cell(19, 15, 20, 15, true)
        .string('RUSAK')
        .style(
            styleHeader
        );
    sit.cell(18, 16, 20, 16, true)
        .string('KETERANGAN')
        .style(
            styleHeader
        );

    for (var i = 1; i <= 13; i++) {
        sit.cell(21, i)
            .number(i)
            .style(
                styleSubHeader
            );
    }
    sit.cell(21, 14, 21, 15, true)
        .string('Isi dengan tanda angka " 1 "')
        .style(
            styleSubHeader
        );
    sit.cell(21, 16)
        .string('14')
        .style(
            styleSubHeader
        );



    var sum_kondisi_b = 0;
    var kondisi_b = 0;

    var sum_kondisi_rr = 0;
    var kondisi_rr = 0;
    var sum_nil = 0;
    var row_n
    for (var j = 0; j < dts.length; j++) {
        sum_kondisi_b = dts[j].kondisi_aset == 'B' ? sum_kondisi_b += 1 : sum_kondisi_b
        kondisi_b = dts[j].kondisi_aset == 'B' ? kondisi_b = 1 : kondisi_b
        sum_kondisi_rr = dts[j].kondisi_aset == 'R' ? sum_kondisi_rr += 1 : sum_kondisi_rr
        kondisi_rr = dts[j].kondisi_aset == 'R' ? kondisi_rr = 1 : kondisi_rr
        sum_nil += parseFloat(dts[j].nilai_perolehan)
        var no = j + 1
        var n = 22 + j
        row_n = n
        sit.cell(n, 1)
            .string('' + no + '.')
            .style(
                styleSubHeader
            );
        sit.cell(n, 2)
            .string(dts[j].no_reg1)
            .style(
                styleBodyText2
            );
        sit.cell(n, 3)
            .string(dts[j].no_reg2)
            .style(
                styleBodyText2
            );
        sit.cell(n, 4)
            .string(dts[j].no_reg3)
            .style(
                styleBodyText2
            );
        sit.cell(n, 5)
            .string(dts[j].no_reg4)
            .style(
                styleBodyText2
            );
        sit.cell(n, 6)
            .string(dts[j].alamat_aset !== null ? dts[j].alamat_aset : '-')
            .style(
                styleBodyText2
            );
        sit.cell(n, 7)
            .string(dts[j].tgl_perolehan !== null ? moment(dts[j].tgl_perolehan).format('DD/MM/YYYY') : '-')
            .style(
                styleBodyText1
            );
        sit.cell(n, 8)
            .string(dts[j].nilai_perolehan !== null ? currency(dts[j].nilai_perolehan) : currency(0))
            .style(
                styleBodyUang
            );
        sit.cell(n, 9)
            .string(dts[j].tanah_status !== null ? dts[j].tanah_status : '-')
            .style(
                styleBodyText2
            );
        sit.cell(n, 10)
            .string(dts[j].tanah_sertifikat_no !== null ? dts[j].tanah_sertifikat_no : '-')
            .style(
                styleBodyText2
            );
        sit.cell(n, 11)
            .string(dts[j].tanah_sertifikat_berlaku !== null ? moment(dts[j].tanah_sertifikat_berlaku).format('DD-MM-YYYY') : '-')
            .style(
                styleBodyText2
            );
        sit.cell(n, 12)
            .string(dts[j].tanah_sertifikat_berakhir !== null ? moment(dts[j].tanah_sertifikat_berakhir).format('DD-MM-YYYY') : '-')
            .style(
                styleBodyText2
            );
        sit.cell(n, 13)
            .string(dts[j].tanah_luas_m2 !== null ? dts[j].tanah_luas_m2.toString() : '-')
            .style(
                styleBodyText1
            );
        sit.cell(n, 14)
            .string(dts[j].kondisi_aset === 'B' ? '1' : '0')
            .style(
                styleBodyText1
            );
        sit.cell(n, 15)
            .string(dts[j].kondisi_aset === 'R' ? '1' : '0')
            .style(
                styleBodyText1
            );
        sit.cell(n, 16)
            .string(dts[j].keterangan !== null ? dts[j].keterangan : '-')
            .style(
                styleBodyText1
            );
    }
    var row = row_n +1
    sit.cell(row, 1, row, 7, true)
        .string('JUMLAH')
        .style(
            styleSubHeader
        );
    sit.cell(row, 8, row, 13, true)
        .string(currency(sum_nil))
        .style(
            styleSubHeader
        );
    sit.cell(row, 14)
        .string(currency(sum_kondisi_b))
        .style(
            styleSubHeader
        );
    sit.cell(row, 15)
        .string(currency(sum_kondisi_rr))
        .style(
            styleSubHeader
        );
    sit.cell(row, 16)
        .string('-')
        .style(
            styleSubHeader
        );

    sit.cell(row + 2, 11, row + 2, 15, true)
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

    sit.cell(row + 4, 2, row + 4, 6, true)
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
    sit.cell(row + 4, 11, row + 4, 15, true)
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
    sit.cell(row + 8, 2, row + 8, 6, true)
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
    sit.cell(row + 8, 11, row + 8, 15, true)
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
    sit.cell(row + 9, 2, row + 9, 6, true)
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
    sit.cell(row + 9, 11, row + 9, 15, true)
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
    /* //Excel.utils.sheet_add_aoa(ws, bodyTable, { origin: 'A30' });
    if (tipe === 'os') {
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'customer.xlsx'
        )
        await Excel.write(workbook, { bookType: 'xlsx', type: 'buffer' }) // write the same file with new values
        res.end()
    } else {
        wb.writeToBuffer().then(function (buffer) {
            'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
                buffer.toString('base64')
            res.status(200).json({
                ret: 0,
                file:
                    'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
                    buffer.toString('base64')
            })
        });
        //var file = await Excel.write(workbook, { bookType: 'xlsx', type: 'buffer' }) // write the same file with new values

    } */
}