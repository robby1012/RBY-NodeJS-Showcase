const moment = require('moment');

module.exports = function (data) {
    moment.locale('id');
    try {
        //console.log(data[0].nik)
        const dataLength = data.length > 0 ? data[0] : {};
        const dataTable = [];
        const dataBody = [];
        var namaRusun = data[0].nama_rusun
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
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i].nik, data[i].nama_lengkap, data[i].kpj, data[i], data[i].no_kontrak_sewa, data[i].nama_rusun);
            var no = i + 1;
            var dataDum = new Array(
                { text: no.toString() + '.', alignment: 'center' },
                { text: data[i].nama_blok, fontSize: 7.5 },
                { text: data[i].nama_unit, fontSize: 7.5 },
                data[i].pihak2_nik !== null ? { text: data[i].pihak2_nik, fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 },
                data[i].pihak2_nama_lengkap !== null ? { text: data[i].pihak2_nama_lengkap, fontSize: 7.5 } : { text: '-', fontSize: 7.5 },
                data[i].pihak2_kpj !== null ? { text: data[i].pihak2_kpj, fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 },
                { text: data[i].no_kontrak_sewa, fontSize: 7.5 },

                { text: moment(data[i].tgl_invoice).format('MM-YYYY'), fontSize: 7.5 },
            );
            var datePbyr;
            var status = new Array()
            //console.log(data[i].tgl_pembayaran)
            if (data[i].tgl_pembayaran !== null) {
                // console.log(data[i].tgl_pembayaran)
                var datePbyr = moment(data[i].tgl_pembayaran).format("DD/MM/YYYY")
                var status = ['SUDAH', '', data[i].media_pembayaran == 'T' ? 'TRANSFER' : 'CASH']
            } else {
                var status = ['', 'BELUM', '']
            }
            //console.log(datePbyr)
            dataTable.push(
                [
                    ...dataDum,
                    data[i].tgl_pembayaran !== null ? { text: moment(data[i].tgl_pembayaran).format("DD/MM/YYYY"), fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 },
                    data[i].tgl_pembayaran != null ? { text: 'SUDAH', fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 },
                    data[i].tgl_pembayaran == null ? { text: 'BELUM', fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 },
                    data[i].tgl_pembayaran != null ? data[i].media_pembayaran == 'C' ? { text: 'CASH', fontSize: 7.5 } : { text: 'TRANSFER', fontSize: 7.5 } : { text: '-', alignment: 'center', fontSize: 7.5 }
                ]
            )

        }
        console.log(dataTable)
        return {
            pageOrientation: 'landscape',
            pageMargins: [40, 80, 40, 25],
            pageSize: 'A4',
            footer: function (currentPage, pageCount) {
                if (pageCount > 1) {
                    return [
                        { text: currentPage.toString(), alignment: 'center' }
                    ]
                }
            },
            header: function (currentPage, pageCount, pageSize) {
                var page_hal = currentPage.toString()
                var countPage = pageCount.toString()
                return [
                    {
                        lineHeight: 3,
                        text: '\n',
                    },
                    {
                        style: 'headerContent',
                        text: 'MONITORING LIST PEMBAYARAN SEWA KAMAR', alignment: (currentPage % 1) ? 'left' : 'center'
                    },
                    { text: 'Nama Rusun : RUSUNAWA BPJS KETENAGAKERJAAN ' + namaRusun, fontSize: 10, bold: true, alignment: 'center', },
                    { text: 'Periode Laporan : ' + moment(data[0].periode_awal).format("DD-MM-YYYY") + ' s/d ' + moment(data[0].periode_akhir).format("DD-MM-YYYY"), fontSize: 10, bold: true, alignment: 'center', },
                    { text: 'Tanggal Cetak :' + moment().format("DD-MM-YYYY,HH:mm:ss"), fontSize: 8, margin: [700, -40, 0, 0], },
                    { text: 'Hal :' + page_hal + ' / ' + countPage, fontSize: 8, margin: [700, 0, 0, 0], },
                ]
            },


            content: [
                {
                    margin: [-30, 10, 0, 0],
                    table: {
                        headerRows: 2,
                        widths: [20, 60, 48, 90, 120, 65, 100, 50, 45, 35, 35, 45],
                        body: [
                            [
                                { rowSpan: 2, text: 'NO', style: 'bodyContent' },
                                { rowSpan: 2, text: 'TWINBLOK', style: 'bodyContent' },
                                { rowSpan: 2, text: 'NAMA UNIT', style: 'bodyContent' },
                                { rowSpan: 2, text: 'NIK', style: 'bodyContent' },
                                { rowSpan: 2, text: 'NAMA PENGHUNI / PIC', style: 'bodyContent' },
                                { rowSpan: 2, text: 'NOMOR PESERTA', style: 'bodyContent' },
                                { rowSpan: 2, text: 'NOMOR SURAT PERJANJIAN', style: 'bodyContent' },
                                { rowSpan: 2, text: 'BLTH\nINVOICE', style: 'bodyContent' },
                                { rowSpan: 2, text: 'TANGGAL\nBAYAR', style: 'bodyContent' },
                                { colSpan: 2, text: 'STATUS', style: 'bodyContent' },
                                '',
                                { rowSpan: 2, text: 'SUMBER DANA', style: 'bodyContent' }
                            ],
                            ['', '', '', '', '', '', '', '', '', { text: 'SUDAH', style: 'bodyContent' }, { text: 'BELUM', style: 'bodyContent' }, ''],
                            ...dataTable
                        ],
                        dontBreakRows: true,
                    },
                },
                {
                    table: {
                        body: [
                            [{ text: '\nNOTE :\nSumber Dana', colSpan: 2 }, ''],
                            ['   ', 'cash \n transfer']
                        ],
                    },
                    layout: 'noBorders',
                    unbreakable: true,

                },


            ],
            styles: {
                headerContent: {
                    fontSize: 14,
                    alignment: 'center',
                    bold: true
                },
                bodyContent: {
                    fontSize: 8,
                    alignment: 'center',
                    bold: true
                },
                noborder: {
                    border: [false, false, false, false],
                }
            },
            defaultStyle: {
                fontSize: 9,
            }
        }
    } catch (e) {
        console.log(e)
    }
}