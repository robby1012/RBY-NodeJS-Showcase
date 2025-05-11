module.exports = function (data) {
    return {

        pageSize: 'A4',
        pageOrientation: 'potrait',
        pageMargins: [50, 50, 50, 50],
        content: [
            {
                width: 250,
                image: 'data:image/png;base64,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'
            },
            {
                margin: [0, 20, 0, 0],
                lineHeight: 1.1,
                style: 'header',
                text: [
                    { text: 'FORMULIR PENDAFTARAN\n\n\n', decoration: 'underline', normal: 'Times-Roman' },
                ],
            },
            {
                lineHeight: 1.5,
                table: {
                    widths: [138, 0, 320],
                    body: [
                        ['Nama', ':', { text: '..............................................................................(Pria/Wanita)', alignment: 'right' }],
                        ['Jabatan', ':', { text: '....................................................................................................', alignment: 'right' }],
                        ['Nama Perusahaan', ':', { text: '....................................................................................................', alignment: 'right' }],
                        ['Alamat Perusahaan', ':', { text: '....................................................................................................\n....................................................................................................', alignment: 'right' }],
                        ['No. Telephone', ':', { text: '....................................................................................................', alignment: 'right' }],
                        ['No. Kepesertaan BPJS TK', ':', { text: '....................................................................................................', alignment: 'right' }],
                    ]
                },
                layout: 'headerLineOnly'
            },
            {
                margin: [0, 0, 0, 0],
                text: [
                    { text: '\nBersama ini mengajukan permohonan untuk menyewa unit di Rumah Susun BPJS Ketenagakerjaan Kabil sebagai Berikut :\n\n', normal: 'Times-Roman' },
                ],
                style: 'parRegist',
            },
            {
                lineHeight: 1,
                table: {
                    body: [
                        ['Karyawan Calon Penghuni', ':', '..........................................................Orang'],
                        ['Blok/Lantai Yang dikehendaki', ':', '.......................................................... '],
                        ['Mulai Menempati Tanggal', ':', '.......................................................... '],
                        ['Perkiraan Sewa Selama', ':', '..........................................................Bulan'],
                        ['Sistem Pembayaran', ':', 'Deposit + ...................................................Bulan/Tahun'],
                    ]
                },
                layout: 'headerLineOnly'
            },
            { text: '\nKami bersedia untuk memenuhi persyaratan-persyaratan sebagai berikut :' },
            {
                ol: [{
                    ul: [
                        'Karyawan dengan status lajang',
                        'Peserta BPJS Ketenagakerjaan',
                        'Kontrak sewa Minimal 6 (enam) bulan',
                        'Membayar Deposit dan uang sewa dengan menyetorkan ke Rekening Pengelola',
                        'Calon penyewa akan melalui proses seleksi',
                    ]
                }]
            },
            {
                margin: [0, 20, 0, 0],
                table: {
                    heights: [0, 100, 0],
                    body: [
                        ['Batam,  .....................................'],
                        ['Pemohon,'],
                        ['(.....................................................)'],
                        [{ text: 'Calon Penghuni', alignment: 'center' }]
                    ]
                },
                layout: 'headerLineOnly',
                pageBreak: 'after',
            },
            {
                margin: [0, 20, 0, 0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    'PERJANJIAN TENTANG\n SEWA MENYEWA UNIT HUNIAN\n RUSUN BPJS KETENAGAKERJAAN\n ', { text: 'KABIL-BATAM', decoration: 'underline' },
                ],
            },
            {
                lineHeight: 1.1,
                style: 'formRegist',
                text: [
                    { text: 'Nomor : ............. /PSRS/BTM/.........../20 …….\n\n', alignment: 'center' }
                ]
            },
            {
                margin: [-25, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [
                        {
                            text: [
                                'Pada hari ini ',
                                'tangggal .......... ',
                                'bulan ............................ ',
                                'tahun ............. ',
                                'yang bertanda tangan dibawah ini',
                            ],


                        },

                        {
                            ol: [
                                {
                                    margin: [26, 8, 0, 0],
                                    table: {
                                        body: [
                                            ['Nama', ': ', { text: 'Syamsuddin', bold: true }],
                                            ['Jabatan', ':', { text: 'Housing Manager Rusun Kabil', bold: true }],
                                        ]
                                    },
                                    layout: 'headerLineOnly'
                                }
                            ]
                        },
                        {
                            text: [
                                '\nDalam hal ini bertindak untuk dan atas nama Pengelola Rumah Susun BPJS Ketenagakerjaan berkedudukan di Jln. Hang Kesturi – Kabil Batam, selanjutnya disebut ',
                                { text: 'PIHAK PERTAMA ', bold: true }
                            ]

                        },
                        {
                            ol: [
                                {
                                    margin: [26, 8, 0, 0],
                                    table: {
                                        body: [
                                            ['Nama		', ':', '.........................................................................................'],
                                            ['Jabatan	', ':', '.........................................................................................'],
                                            ['Perusahaan', ':', '.........................................................................................'],
                                            ['Alamat	', ':', '.........................................................................................'],

                                        ]
                                    },
                                    layout: 'headerLineOnly',
                                    counter: 2,
                                }
                            ]
                        }
                    ]
                }]
            },
            {
                style: 'formRegist',
                text: [
                    '\nDalam hal ini bertindak untuk dan atas nama Penyewa selanjutnya disebut ',
                    { text: 'PIHAK KEDUA \n\n', bold: true },
                    'Kedua belah pihak sepakat dan setuju mengadakan perjanjian Sewa Menyewa Unit Hunian Rumah Susun BPJS Ketenagakerjaan (selanjutnya disebut “Rusun BPJS Ketenagakerjaan”) dengan ketentuan sebagai berikut :'
                ],
            },
            {
                margin: [0, 20, 0, 0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    'PASAL 1\nKETENTUAN UMUM\n',
                ],
            },
            {
                margin: [-25, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [26, 0, 0, 0],
                            ol: [

                                'Pihak kedua harus patuh dan mendukung pekerjaan pengelolaan oleh pengelola Rusun BPJS Ketenagakerjaan.',
                                'Kedua belah pihak disamping mematuhi peraturan bersama juga harus mentaati Undang-Undang Peraturan Pemerintahan maupun Peraturan Daerah (Perda) tentang Rumah Susun.',
                                {
                                    text: [
                                        'Pihak Pertama dengan ini setuju menyewakan kepada Pihak Kedua Sebanyak ',
                                        '(.....................................) ',
                                        'unit Rusun BPJS Ketenagakerjaan yang terletak di:\n',
                                    ]
                                },
                                {
                                    table: {
                                        body: [
                                            ['Kamar No', ':', ' .......................'],
                                            ['Blok		', ':', ' .......................'],
                                        ]
                                    },
                                    layout: 'headerLineOnly',
                                    listType: 'none'
                                },
                                {
                                    text: [
                                        'Yang akan dihuni oleh Pihak Kedua sesuai daftar pada lampiran kontrak (Lampiran I), beserta Fasilitas-fasilitasnya (Lampiran II).',
                                    ],
                                    listType: 'none'
                                },
                                { text: 'Pihak kedua setuju bahwa satu/satuan Rusun BPJS Ketenagakerjaan yang disewa sebagaimana dimaksudkan pada ayat (3) perjanjian ini, dipergunakan hanya untuk tempat tinggal dan tidak diperpolehkan merubah/menambah bangunan dalam ruangan.', counter: 4, pageBreak: 'before', },
                                { text: 'Dalam hal ini perjanjian sewa menyewa Rusun BPJS Ketenagakerjaan ini dilakukan oleh pihak kedua sebagai hunian lebih dari satu orang dan semuanya mempunyai status sebagai karyawan dari Pihak Kedua, maka Pihak Kedua bertanggung jawab sepenbefore atas keberadaan para karyawannya yang tinggal di Rusun tersebut.', counter: 5 },
                            ]
                        }
                    ]
                }]
            },
            {
                //margin:[0,20,0,0],
                //lineHeight:1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 2\n BIAYA SEWA\n',
                ],
            },
            {
                margin: [-25, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [26, 0, 0, 0],
                            ol: [
                                {
                                    text: [
                                        'Pihak Kedua berkewajiban membayar sewa Rumah sebagaimana dimaksud pada pasal 1 (satu) Perjanjian ini kepada Pihak Pertama Sebesar ',
                                        'Rp. ......................... ',
                                        '(........................................................................................................................) ',
                                        'per bulan dan belum termasuk biaya pajak, pemakain Fasilitas listrik (PLN), Air (ATB), dan biaya pemeliharaan Air Conditioner.',
                                    ]
                                },
                                {
                                    text: [
                                        'Penagihan sewa rumah dilakukan ',
                                        '...... ',
                                        '(.......................) ',
                                        'bulan dimuka dengan menyerahkan invoice dari Pihak Pertama kepada Pihak Kedua. Pembayaran dilakukan oleh Pihak Kedua paling lambat 2 (Dua) minggu setelah penerimaan invoice dari Pihak Pertama.'

                                    ]
                                },
                                'Uang jaminan (deposit) dibayarkan oleh Pihak Kedua kepada Pihak Pertama, sebesar 1 ,5 (satu setengah ) bulan uang sewa rumah dan dibayarkan pada waktu perjanjian sewa menyewa ditanda tangani.',
                                'Setiap bulan keterlambatan pembayaran, Pihak Kedua akan dikenakan denda sebesar 10% dari harga sewa rumah per bulan.',
                                'Pembayaran listrik dan air dilakukan oleh Pihak Kedua s/d tanggal 20 bulan berjalan sesuai dengan faktur penagihan dariPihak Pertama.\n Keterlambatan pembayaran disamping denda dikenakan juga sanksi sesuai Pasal 7.',

                            ]
                        }
                    ]
                }]
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 3\n JANGKA WAKTU DAN BERAKHIRNYA\n PERJANJIAN SEWA\n',
                ],
            },
            {
                text: 'Berakhirnya surat perjanjian ini apabila:\n'
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [20, 0, 0, 0],
                            ol: [
                                {
                                    text: [
                                        'Kedua  belah pihak setuju bahwa jangka waktu Sewa menyewa Rusun sebagaimana dimaksud pada pasal 1 perjanjian ini adalah selama',
                                        ' ............. ',
                                        '( ..................................... ) ',
                                        'bulan terhitung mulai tanggal ',
                                        '......................................... ',
                                        'dan akan berakhir pada tanggal ',
                                        '.........................................',
                                    ]
                                },
                                'Pihak Pertama akan meninjau kembali besarnya biaya sewa setelah perjanjian ini berakhir.',
                                'Kedua belah pihak setuju bahwa setelah berakhirnya jangka waktu sebagaimana dimaksud ayat 1 pasal ini, bila tidak ada pemberitahuan lebih lanjut oleh kedua belah pihak, maka secara otomatis perjanjian sewa ini dilanjutkan untuk waktu yang sama seperti perjanjian kontrak sebelumnya.',
                                'Pemberitahuan untuk penghentian kontrak oleh kedua belah pihak selambat-lambatnya 3 (Tiga) bulan sebelum perjanjian sewa berakhir.',
                                'Bila pihak kedua menghentikan kontrak sebelum perjanjian sewa menyewa ini berakhir, maka uang sewa yang telah dibayarkan tidak dapat dikembalikan.',
                                'Bila pihak kedua tidak memenuhi segala kewajiban pada pasal 5, maka perjanjian kontrak dianggap berakhir.',
                                'Setelah jangka sewa berakhir, Pihak kedua wajib menyerahkan unit di Rusun BPJS Ketenagakerjaan yang disewa berikut barang-barang inventarisnya kepada Pihak Pertama paling lambat 7 (Tujuh) hari setelah berakhirnya waktu sewa dan bila ada kerusakan/perbaikan atau kehilangan barang inventaris akan merupakan tanggung jawab Pihak Kedua.',

                            ]
                        }
                    ]
                }]
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 4\n HAK DAN KEWAJIBAN PIHAK PERTAMA\n',
                ],
            },
            {
                text: 'Pihak pertama selama jangka waktu perjanjian Sewa Menyewa ini berlangsung berhak dan berkewajiban:\n'
            },
            {
                text: 'HAK:', bold: true
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Memungut uang sewa satuan Rusun BPJS Ketenagakerjaan beserta dendanya (bila ada).',
                                'Melaksanakan sanksi atas pelanggaran-pelanggaran penghunian.',
                                'Melaksanakan pemutusan atas aliran listrik dan air apabila Pihak Kedua menunggak salah satu atau lebih kewajiban untuk membayar sewa Rusun, pemakaian listrik atau air.',
                            ]
                        }
                    ]
                }]
            },
            {
                text: '\nKEWAJIBAN:', bold: true
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Mengasuransikan bangunan Rusun BPJS Ketenagakerjaan yang disewakan kepada Pihak Kedua terhadap bahaya kebakaran.',
                                'Menyediakan fasilitas listrik sebesar 1300 watt per unit rumah.',
                                'Menyediakan fasilitas air bersih yang merupakan satu kesatuan dari rumah yang disewa.',
                                'Mengelola komplek Rusun BPJS Ketenagakerjaan.',
                                'Memperbaiki peraturan pengelolaan hingga meningkatkan kemampuan pengelolaan komplek Rusun BPJS Ketenagakerjaan dengan lebih baik.',
                                'Melakukan pemeriksaan, pemeliharaan, perbaikan  secara teratur ataupun mendadak atas: Pipa air bersih saluran air hujan dan limbah.',
                                'Menjaga keamanan lingkungan bekerjasama dengan aparat keamanan setempat.',
                                'Mewujudkan lingkungan yang bersih dan lestari.',

                            ]
                        }
                    ]
                }],
                pageBreak: 'after',
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 5\n HAK DAN KEWAJIBAN PIHAK KEDUA\n',
                ],
            },
            {
                text: 'Pihak Kedua setuju bahwa selama jangka waktu perjanjian Sewa Menyewa ini berlangsung berhak dan berkewajiban:\n',
            },
            {
                text: 'HAK:', bold: true
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Menempati satuan Rusun BPJS Ketenagakerjaan dimaksud untuk keperluan tempat tinggal sebagaimana dimaksud pada pasal 1 perjanjian ini.',
                                'Berhak untuk menggunakan fasilitas umum dalam komplek Rusun BPJS Ketenagakerjaan.',
                                'Berhak melaporkan pada Housing Manager/Pimpinan pengelola atas tingkah laku petugas dari Pihak Pertama yang kurang baik.',
                            ]
                        }
                    ]
                }]
            },
            {
                text: '\nKEWAJIBAN:', bold: true
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Membayar sewa yang ditetapkan sesuai dengan ketentuan yang berlaku.',
                                'Membayar rekening listrik dan air bersih sesuai ketentuan yang berlaku.',
                                'Pembuangan sampah setiap hari harus dilakukan ditempatnya secara rapi dan teratur serta tidak berceceran.',
                                'Mengganti atau membayar biaya atas kehilangan atau kerusakan barang-barang inventaris, baik yang berada di dalam maupun di luar kamar, sesuai daftar terlampir.',
                                'Melaksanakan segala tata tertib/peraturan yang berlaku diarea Rusun, sebagaimana ditetapkan dalam perjanjian.',
                            ]
                        }
                    ]
                }],
            },
            {
                //margin:[0,20,0,0],
                //lineHeight:1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 6\n KEADAAN DILUAR KEMAMPUAN (FORCE MAYEURE)\n',
                ],
            },
            {
                text: 'Jika unit Rusun yang disewakan atau sebagian dari padanya hancur atau rusak karena bencana alam, kebakaran, huru hara, banjir, angin topan atau sebab lain (force mayeure), maka perjanjian ini menjadi batal dengan sendirinya dan uang uang sewa yang telah dibayarkan Pihak Kedua Kepada Pihak Pertama tidak dapat dikembalikan dan Pihak Kedua tidak mengadakan tuntutan dalam bentuk apapun terhadap Pihak Pertama.\n'
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 7\n SANKSI-SANKSI\n',
                ],
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Pihak Kedua setuju apabila Pihak Kedua Melanggar pasal 3 dan 5, maka seketika perjanjian sewa-menyewa ini menjadi batal dan Pihak kedua bersedia memberi penggantian kerugian kepada Pihak Pertama sebesar jaminan sewa.',
                                'Keterlambatan pembayaran sewa rumah,listrik dan air akan dilakukan sanksi pemutusan fasilitas (PLN,ATB).',
                                'Dalam jangka waktu satu bulan sejak penandatang Surat Perjanjian ini Pihak Kedua tidak atau belum menempati rumah yang disewa, maka Pihak Pertama secara sepihak dapat membatalkan Surat Perjanjian Sewa Menyewa ini dan uang sewa yang telah disetorkan dan diterima Pihak Pertama akan dikembalikan kepada Pihak Kedua setelah dipotong biaya administrasi yang timbul dan merupakan kewajiban Pihak Kedua seperti: listrik,air serta sewa rumah.',
                                'Pihak Kedua harus meninggalkan satuan Rusun BPJS Ketenagakerjaan tersebut dengan seluruh barang-barang miliknya dalam waktu selambat-lambatnya 7 (Tujuh) hari setelah pemutusan sewa dan menyerahkan kunci dan perlengkapan rumah kepada Pihak Pertama.',
                                'Dalam hal Kedua tidak bersedia meninggalkan dan mengosongkan satuan Rusun BPJS Ketenagakerjaan maka Pihak Pertama dapat meminta bantuan Pihak Berwajib/Aparat Kepolisian.',
                                'Apabila ada barang –barang yang tertinggal /tidak dalam waktu batas tersebut maka kehilangan /kerusakan yang terjadi tidak tanggung jawab Pihak Pertama.',
                                'Apabila Pihak Kedua melanggar Pasal 5, maka perjanjian Sewa Menyewa ini menjadi batal dan semua Kerugian yang timbul akibat pembatalan Sewa Menyewa ini sepenuhnya menjadi beban dan tanggung jawab Pihak Kedua.',
                                'Pihak Kedua setuju mengesampingkan pasal 1266 dan 1267 Kitab Undang-Undang Hukum Perdata dalam rangka pembatalan sepihak oleh Pihak Pertama kepada Pihak Kedua dalam perjanjian Sewa Menyewa Rusun BPJS Ketenagakerjaan.',
                                'Bila selama perjanjian sewa menyewa terjadi keributan atau pelanggaran oleh Pihak Kedua dan mengganggu ketentaraman penghuni lain, maka perjanjian Sewa menyewa ini batal dengan sendirinya dan Pihak Kedua Harus meninggalkan area Rusun BPJS Ketenagakerjaan dalam waktu 1 x 24 jam.',

                            ]
                        }
                    ]
                }]
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 8\n LAIN-LAIN\n',
                ],
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Pihak Pertama tidak bertanggung jawab atas kerugian badan atau benda barang milik Pihak Kedua yang berada dalam halaman atau di dalam unit hunian Rusun BPJS Ketenagakerjaan milik Pihak Pertama yang diakibatkan kejadian –kejadian perampokan,pencurian dan sejenisnya.',
                                'Pihak Kedua dianjurkan untuk mengasuransikan semua bendda atau barang Milik Pihak Kedua yang berada dalam lingkungan Rusun BPJS Ketenagakerjaan karena Pihak Pertama tidak bertanggung Jawab sama sekali atas kerusakan dan kehilangan barang Pihak Kedua yang berada dalam lingkungan Rusun BPJS Ketenagakerjaan yang disewakan.',
                            ]
                        }
                    ]
                }]
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 9\n DOMISILI\n',
                ],
            },
            {
                text: 'Kedua belah pihak sepakat untuk memilih domisili yang tetap dan tidak berubah pada kantor kepaniteraan Pengadilan Negeri Batam.\n'
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 10\n PERSELISIHAN\n',
                ],
            },
            {
                margin: [-20, 0, 0, 0],
                ol: [{
                    type: 'none',
                    ul: [

                        {
                            margin: [12, 0, 0, 0],
                            ol: [
                                'Semua perselisihan/persengketaan yang mungkin timbul diantara kedua belah pihak atau yang timbul dari Perjanjian Sewa Menyewa ini baik dalam pelaksanaan maupun mengenai penafsiran dari ketentuan-ketentuan dalam perjanjian ini akan diselesaikan dengan musyawarah.',
                                'Apabila tidak tercapai kata sepekat antara kedua belah Pihak, maka Pihak Pertama dan Pihak Kedua setuju untuk menyerahkan permasalahan tersebut kepada Pengadilan Negeri Batam.',
                            ]
                        }
                    ]
                }],
            },
            {
                //margin:[0,20,0,0],
                lineHeight: 1.1,
                style: 'headerForm',
                text: [
                    '\nPASAL 11\n PENUTUP\n',
                ],
                pageBreak: 'before'
            },
            {
                text: 'Hal-hal yang belum/tidak cukup diatur dalam Surat Perjanjian ini dan ternyata dalam pelaksanaanya perlu untuk diatur, akan diselesaikan secara musyawarah untuk Mufakat oleh kedua belah Pihak.\n Demikian Surat perjanjian ini ditandatangani oleh kedua belah Pihak di Batam pada hari dan tanggal tersebut di muka dalam keadaan sehat jasmani dan rohani, tanpa ada paksaan dari pihak manapun, dibuat dalam rangkap 2 (Dua) bermatrai cukup masing-masing mempunyai kekuatan hukum yang sama untuk masing-masing pihak.\n\n\n\n'
            },
            {
                table: {
                    widths: [240, 240],
                    alignment: 'center',
                    body: [
                        [
                            { text: 'PIHAK KEDUA', bold: true, alignment: 'center' },
                            {
                                text: [
                                    { text: 'PIHAK PERTAMA\n', bold: true, alignment: 'center' },
                                    { text: 'PENGELOLA RUSUN\nBPJS KETENAGAKERJAAN\n', alignment: 'center' },
                                ]

                            }
                        ]

                    ],
                },
                layout: 'headerLineOnly',

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
                                    { text: 'Syamsudin\n', bold: true, alignment: 'center' },

                                    { text: 'Housing Manager', alignment: 'center' },
                                ]

                            },
                        ]

                    ],
                },
                layout: 'headerLineOnly',

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
        ],
        styles: {
            header: {
                bold: true,
                fontSize: 16,
                alignment: 'center',
            },
            headerForm: {
                fontSize: 12,
                bold: true,
                alignment: 'center',
            },
            formRegist: {
                fontSize: 12,
            },
            parRegist: {
                fontSize: 12,
                alignment: 'justify'
            },

        },
        defaultStyle: {
            alignment: 'justify'
        }

    }
}