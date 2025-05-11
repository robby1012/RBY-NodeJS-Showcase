

INSERT INTO display VALUES ('INV', 'INVSEWA', 'kode_entries', 'nama_dsp', 'ROOM', 0, true, true);
INSERT INTO display VALUES ('INV', 'INVLSTRK', 'kode_entries', 'nama_dsp', 'ELECTRICITY', 2, true, true);
INSERT INTO display VALUES ('INV', 'INVAIR', 'kode_entries', 'nama_dsp', 'WATER', 3, true, true);
INSERT INTO display VALUES ('INV', 'INVFAS', 'kode_entries', 'nama_dsp', NULL, 4, false, false);
INSERT INTO display VALUES ('INV', 'INVEQ', 'kode_entries', 'nama_dsp', 'EQUIPMENT', 5, false, true);
INSERT INTO display VALUES ('INV', 'INVDENDA', 'kode_entries', 'nama_dsp', 'DENDA', 6, false, true);
INSERT INTO display VALUES ('INV', 'INVDPST', 'kode_entries', 'nama_dsp', 'DEPOSIT', 1, false, true);


--
-- TOC entry 3790 (class 0 OID 38035)
-- Dependencies: 219
-- Data for Name: invoice_denda_setting; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO invoice_denda_setting VALUES (1, '1990-01-01', 10.00, true, NULL, NULL, '2021-03-28 17:11:18.664418', 'GUA', NULL, NULL);

SELECT pg_catalog.setval('invoice_denda_setting_id_setting_denda_seq', 1, true);



--
-- TOC entry 3792 (class 0 OID 38116)
-- Dependencies: 241
-- Data for Name: kode_agama; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_agama VALUES ('P', 'PROTESTAN', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_agama VALUES ('KK', 'KHATOLIK', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_agama VALUES ('H', 'HINDU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_agama VALUES ('B', 'BUDHA', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_agama VALUES ('KU', 'KHONGHUCU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_agama VALUES ('I', 'ISLAM', true, NULL, NULL, NULL, NULL, '2021-04-07 03:31:32.903879', NULL);


--
-- TOC entry 3794 (class 0 OID 38125)
-- Dependencies: 243
-- Data for Name: kode_aset_kelompok; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_aset_kelompok VALUES ('D', 'AKTIVA TIDAK BERWUJUD', true, NULL, NULL, true, NULL, NULL, '2020-09-18 12:32:46.682972', 'KPS', '2020-09-19 00:05:05.70407', 'GUA');
INSERT INTO kode_aset_kelompok VALUES ('A', 'MEUBELAIR', true, NULL, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_kelompok VALUES ('T', 'TANAH', false, NULL, NULL, true, NULL, NULL, '2020-09-17 00:22:46.358517', 'GUA', '2020-09-17 00:38:39.628618', 'GUA');
INSERT INTO kode_aset_kelompok VALUES ('G', 'BANGUNAN', true, NULL, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_kelompok VALUES ('E', 'PERALATAN LAINNYA', true, NULL, NULL, true, NULL, NULL, '2020-09-18 12:30:38.73378', 'KPS', NULL, NULL);
INSERT INTO kode_aset_kelompok VALUES ('H', 'PERALATAN KANTOR', true, NULL, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_kelompok VALUES ('M', 'KENDARAAN DINAS', true, NULL, NULL, true, NULL, NULL, NULL, NULL, '2020-10-02 15:20:58.401701', 'GUA');
INSERT INTO kode_aset_kelompok VALUES ('B', 'MESIN KANTOR', true, NULL, NULL, true, NULL, NULL, '2020-09-17 00:39:21.014216', 'GUA', '2020-09-18 12:29:56.899304', 'GUA');
INSERT INTO kode_aset_kelompok VALUES ('C', 'PERANGKAT KERAS KOMPUTER', true, NULL, NULL, true, NULL, NULL, '2020-09-14 22:11:20.446571', 'KPS', '2020-09-14 22:50:26.040869', 'KPS');
INSERT INTO kode_aset_kelompok VALUES ('X', 'MESIN GENSET', true, NULL, NULL, true, NULL, NULL, '2021-01-20 15:38:39.969218', 'ATB', '2021-01-21 14:52:36.340369', 'ATB');
INSERT INTO kode_aset_kelompok VALUES ('I', 'PERALATAN KOMPUTER', true, NULL, NULL, true, NULL, NULL, '2020-09-14 22:26:48.216638', 'KPS', '2021-03-30 13:06:43.459635', 'GUA');


--
-- TOC entry 3793 (class 0 OID 38120)
-- Dependencies: 242
-- Data for Name: kode_aset_kategori; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_aset_kategori VALUES ('A00', 'A', '1', 'BARANG  MEUBELAIR (NON-KAP)', 'BARANG  MEUBELAIR (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A01', 'A', '1', 'UNTUK DIHAPUS', 'UNTUK DIHAPUS', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('A01', 'A', '1', 'MEJA BESI/LOGAM', 'MEJA BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A02', 'A', '1', 'KURSI KAYU', 'KURSI KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A02', 'A', '1', 'KURSI BESI/LOGAM', 'KURSI BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A02', 'A', '1', 'BARANG TESTING', 'BARANG TESTING', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '08');
INSERT INTO kode_aset_kategori VALUES ('A03', 'A', '1', 'LEMARI KAYU', 'LEMARI KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A03', 'A', '1', 'LEMARI BESI/LOGAM', 'LEMARI BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A04', 'A', '1', 'SOFA KAYU', 'SOFA KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A04', 'A', '1', 'SOFA BESI/LOGAM', 'SOFA BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A05', 'A', '1', 'CREDENZA KAYU', 'CREDENZA KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A05', 'A', '1', 'CREDENZA BESI/LOGAM', 'CREDENZA BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A06', 'A', '1', 'FILLING CABINET KAYU', 'FILLING CABINET KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A06', 'A', '1', 'FILLING CABINET BESI/LOGAM', 'FILLING CABINET BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A07', 'A', '1', 'ROLL O PACK KAYU', 'ROLL O PACK KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A07', 'A', '1', 'ROLL O PACK BESI/LOGAM', 'ROLL O PACK BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A08', 'A', '1', 'MEJA RIAS KAYU', 'MEJA RIAS KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A08', 'A', '1', 'MEJA RIAS BESI/LOGAM', 'MEJA RIAS BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A09', 'A', '1', 'RAK KAYU', 'RAK KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A09', 'A', '1', 'RAK ARSIP  BESI/LOGAM', 'RAK ARSIP  BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A10', 'A', '1', 'TEMPAT TIDUR KAYU', 'TEMPAT TIDUR KAYU', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('A10', 'A', '1', 'TEMPAT TIDUR BESI/LOGAM', 'TEMPAT TIDUR BESI/LOGAM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('A99', 'A', '1', 'MEUBELAIR/FURNITUR LAINNYA', 'MEUBELAIR/FURNITUR LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B00', 'B', '1', 'BARANG  MESIN KANTOR (NON-KAP)', 'BARANG  MESIN KANTOR (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B01', 'B', '1', 'MESIN TIK MANUAL', 'MESIN TIK MANUAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B02', 'B', '1', 'MESIN TIK LISTRIK', 'MESIN TIK LISTRIK', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B03', 'B', '1', 'MESIN CETAK', 'MESIN CETAK', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B04', 'B', '1', 'MESIN FOTOCOPY', 'MESIN FOTOCOPY', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B05', 'B', '1', 'MESIN PENGHANCUR KERTAS', 'MESIN PENGHANCUR KERTAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B06', 'B', '1', 'MESIN HITUNG MANUAL', 'MESIN HITUNG MANUAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B07', 'B', '1', 'MESIN HITUNG ELEKTRONIK', 'MESIN HITUNG ELEKTRONIK', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B08', 'B', '1', 'MESIN LAMINATING', 'MESIN LAMINATING', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B09', 'B', '1', 'MESIN ABSENSI', 'MESIN ABSENSI', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B10', 'B', '1', 'MESIN PENJILID', 'MESIN PENJILID', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B11', 'B', '1', 'MESIN ALAMAT', 'MESIN ALAMAT', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B12', 'B', '1', 'MESIN PERANGKO', 'MESIN PERANGKO', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B13', 'B', '1', 'MESIN TERAAN METERAI', 'MESIN TERAAN METERAI', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B14', 'B', '1', 'MESIN PEMBUAT HURUF/NOMOR', 'MESIN PEMBUAT HURUF/NOMOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B15', 'B', '1', 'MESIN POTONG KERTAS', 'MESIN POTONG KERTAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B16', 'B', '1', 'MESIN DELEGATES UNIT', 'MESIN DELEGATES UNIT', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B17', 'B', '1', 'MESIN MICRO FILM', 'MESIN MICRO FILM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B18', 'B', '1', 'MESIN HITUNG UANG', 'MESIN HITUNG UANG', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B19', 'B', '1', 'MESIN PENGOLAH KATA', 'MESIN PENGOLAH KATA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B20', 'B', '1', 'MESIN ANTRIAN', 'MESIN ANTRIAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('B99', 'B', '1', 'MESIN LAINNYA', 'MESIN LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C00', 'C', '1', 'KOMPUTER (NON-KAP)', 'KOMPUTER (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C00', 'C', '1', 'SERVER (NON-KAP)', 'SERVER (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('C00', 'C', '1', 'JARINGAN (NON-KAP)', 'JARINGAN (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('C00', 'C', '1', 'MESIN CETAK/PRINTER (NON-KAP)', 'MESIN CETAK/PRINTER (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('C01', 'C', '1', 'PERSONAL COMPUTER', 'PERSONAL COMPUTER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C02', 'C', '1', 'LAPTOP', 'LAPTOP', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C03', 'C', '1', 'SCANNER', 'SCANNER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C04', 'C', '1', 'BARCODE READER', 'BARCODE READER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C05', 'C', '1', 'MODEM EXTERNAL', 'MODEM EXTERNAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C06', 'C', '1', 'EDMS', 'EDMS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C07', 'C', '1', 'HARDISK EXTERNAL', 'HARDISK EXTERNAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C08', 'C', '1', 'MONITOR', 'MONITOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C09', 'C', '1', 'TABLET', 'TABLET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C30', 'C', '1', 'SERVER', 'SERVER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C31', 'C', '1', 'CD ROM SERVER EXTERNAL', 'CD ROM SERVER EXTERNAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C32', 'C', '1', 'EXTERNAL DISK SERVER', 'EXTERNAL DISK SERVER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C33', 'C', '1', 'MEMORI SERVER', 'MEMORI SERVER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C34', 'C', '1', 'DISK SERVER', 'DISK SERVER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C35', 'C', '1', 'CD ROM DRIVE EXTERNAL', 'CD ROM DRIVE EXTERNAL', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C36', 'C', '1', 'TAPE DRIVE', 'TAPE DRIVE', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C50', 'C', '1', 'HUB', 'HUB', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C51', 'C', '1', 'SWITCHING', 'SWITCHING', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C52', 'C', '1', 'ROUTER', 'ROUTER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C53', 'C', '1', 'ACCESS POINT', 'ACCESS POINT', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C70', 'C', '1', 'PRINTER DOT MATRIX (80 COL)', 'PRINTER DOT MATRIX (80 COL)', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C71', 'C', '1', 'PRINTER DOT MATRIX', 'PRINTER DOT MATRIX', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C72', 'C', '1', 'PRINTER DESKJET', 'PRINTER DESKJET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C73', 'C', '1', 'PRINTER INKJET', 'PRINTER INKJET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C74', 'C', '1', 'PRINTER LASERJET', 'PRINTER LASERJET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C80', 'C', '1', 'PRINTER SERVER', 'PRINTER SERVER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C90', 'C', '1', 'PERANGKAT KOMPUTER LAINNYA', 'PERANGKAT KOMPUTER LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('C99', 'C', '1', 'PERANGKAT SERVER LAINNYA', 'PERANGKAT SERVER LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D01', 'D', '1', 'PERANGKAT LUNAK BELANJA MODAL', 'PERANGKAT LUNAK BELANJA MODAL', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D01', 'D', '1', 'LOTTUS', 'LOTTUS', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('D02', 'D', '1', 'PERANGKAT LUNAK NON JHT', 'PERANGKAT LUNAK NON JHT', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D02', 'D', '1', 'LINUX', 'LINUX', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('D03', 'D', '1', 'ORACLE', 'ORACLE', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D04', 'D', '1', 'SIPT', 'SIPT', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D04', 'D', '1', 'GL', 'GL', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('D04', 'D', '1', 'SIAT', 'SIAT', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('D04', 'D', '1', 'SIPA', 'SIPA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('D10', 'D', '1', 'LISENSI PERANGKAT LUNAK', 'LISENSI PERANGKAT LUNAK', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D20', 'D', '1', 'PENGEMBANGAN PERANGKAT LUNAK BELANJA MODAL', 'PENGEMBANGAN PERANGKAT LUNAK BELANJA MODAL', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('D99', 'D', '1', 'PERANGKAT LUNAK LAINNYA', 'PERANGKAT LUNAK LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E00', 'E', '1', 'INTERIOR BANGUNAN (NON-KAP)', 'INTERIOR BANGUNAN (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E00', 'E', '1', 'PERALATAN JPK (NON-KAP)', 'PERALATAN JPK (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E00', 'E', '1', 'PERALATAN LAINNYA (NON-KAP)', 'PERALATAN LAINNYA (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'PERLENGKAPAN BANGUNAN LAINNYA', 'PERLENGKAPAN BANGUNAN LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'APAR', 'APAR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'WATER HYDRANT', 'WATER HYDRANT', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'LIFT', 'LIFT', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'FIRE DETECTOR', 'FIRE DETECTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'AIR CONDITIONER', 'AIR CONDITIONER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'WATER HEATER', 'WATER HEATER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '06');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'HAND DRYER', 'HAND DRYER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '07');
INSERT INTO kode_aset_kategori VALUES ('E01', 'E', '1', 'TENDA', 'TENDA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '08');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'PERANGKAT POWER SYSTEM LAINNYA', 'PERANGKAT POWER SYSTEM LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'GENSET', 'GENSET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'UPS', 'UPS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'STANDBY POWER SYSTEM', 'STANDBY POWER SYSTEM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'STABILIZER', 'STABILIZER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'INVERTER', 'INVERTER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E02', 'E', '1', 'VOLTAGE STABILIZER', 'VOLTAGE STABILIZER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '06');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'PERANGKAT KOMUNIKASI LAINNYA', 'PERANGKAT KOMUNIKASI LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'TELEX', 'TELEX', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'FACSIMILE', 'FACSIMILE', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'PABX', 'PABX', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'TELEPON', 'TELEPON', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'RADIO KOMUNIKASI (SSB/HT)', 'RADIO KOMUNIKASI (SSB/HT)', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'AIRPHONE', 'AIRPHONE', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '06');
INSERT INTO kode_aset_kategori VALUES ('E03', 'E', '1', 'PBA', 'PBA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '07');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'PERANGKAT RAPAT LAINNYA', 'PERANGKAT RAPAT LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'LCD PROYEKTOR', 'LCD PROYEKTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'OHP', 'OHP', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'SLIDE PROYEKTOR', 'SLIDE PROYEKTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'WHITE BOARD', 'WHITE BOARD', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E04', 'E', '1', 'PAPAN TULIS', 'PAPAN TULIS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E05', 'E', '1', 'PERANGKAT DOKUMENTASI LAINNYA', 'PERANGKAT DOKUMENTASI LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E05', 'E', '1', 'CAMERA', 'CAMERA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E05', 'E', '1', 'VIDEO CAMERA', 'VIDEO CAMERA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E05', 'E', '1', 'TAPE RECORDER', 'TAPE RECORDER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E05', 'E', '1', 'VOICE RECORDER', 'VOICE RECORDER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E06', 'E', '1', 'PERANGKAT VIDEO/AUDIO LAINNYA', 'PERANGKAT VIDEO/AUDIO LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E06', 'E', '1', 'RADIO TAPE', 'RADIO TAPE', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E06', 'E', '1', 'TELEVISI', 'TELEVISI', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E06', 'E', '1', 'AUDIO SPEAKER', 'AUDIO SPEAKER', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'INTERIOR LAINNYA', 'INTERIOR LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'PARTISI', 'PARTISI', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'KARPET', 'KARPET', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'LAMPU HIAS', 'LAMPU HIAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'GORDYN', 'GORDYN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'LUKISAN', 'LUKISAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'WALLPAPER', 'WALLPAPER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '06');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'VERTICAL BLIND', 'VERTICAL BLIND', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '07');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'HORIZONTAL BLIND', 'HORIZONTAL BLIND', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '08');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'ROLLER BLIND', 'ROLLER BLIND', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '09');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'PYLON', 'PYLON', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '10');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'LETTER SIGN', 'LETTER SIGN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '11');
INSERT INTO kode_aset_kategori VALUES ('E07', 'E', '1', 'CANOPY', 'CANOPY', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '12');
INSERT INTO kode_aset_kategori VALUES ('E08', 'E', '1', 'KARPET', 'KARPET', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E08', 'E', '1', 'LAMPU HIAS', 'LAMPU HIAS', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E08', 'E', '1', 'GORDYN', 'GORDYN', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E09', 'E', '1', 'PAJANGAN LAINNYA', 'PAJANGAN LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E09', 'E', '1', 'PAJANGAN', 'PAJANGAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E09', 'E', '1', 'AQUARIUM', 'AQUARIUM', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'PERLENGKAPAN RUMAH TANGGA LAINNYA', 'PERLENGKAPAN RUMAH TANGGA LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'KOMPOR GAS', 'KOMPOR GAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'MICROWAVE', 'MICROWAVE', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'KULKAS', 'KULKAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'MESIN CUCI', 'MESIN CUCI', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '04');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'DISPENSER', 'DISPENSER', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '05');
INSERT INTO kode_aset_kategori VALUES ('E10', 'E', '1', 'MESIN CUCI', 'MESIN CUCI', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '06');
INSERT INTO kode_aset_kategori VALUES ('E11', 'E', '1', 'SAFE BOX LAINNYA', 'SAFE BOX LAINNYA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '00');
INSERT INTO kode_aset_kategori VALUES ('E11', 'E', '1', 'BRANKAS', 'BRANKAS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E11', 'E', '1', 'CASH LOCKER', 'CASH LOCKER', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('E11', 'E', '1', 'CASH BOX', 'CASH BOX', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '03');
INSERT INTO kode_aset_kategori VALUES ('E12', 'E', '1', 'CCTV', 'CCTV', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E13', 'E', '1', 'KUNCI AKSES', 'KUNCI AKSES', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E14', 'E', '1', 'TABUNG OKSIGEN', 'TABUNG OKSIGEN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E15', 'E', '1', 'PERALATAN OLAHRAGA', 'PERALATAN OLAHRAGA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E16', 'E', '1', 'PERALATAN MUSIK', 'PERALATAN MUSIK', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E17', 'E', '1', 'TABUNG DARI BESI', 'TABUNG DARI BESI', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('E99', 'E', '1', 'PERALATAN LAINNYA', 'PERALATAN LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G00', 'G', '1', 'BARANG  DENGAN BANGUNAN (NON-KAP)', 'BARANG  DENGAN BANGUNAN (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G00', 'G', '1', 'BARANG  DENGAN BANGUNAN (NON-KAP)', 'BARANG  DENGAN BANGUNAN (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G01', 'G', '1', 'BANGUNAN KANTOR', 'BANGUNAN KANTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G01', 'G', '1', 'BANGUNAN KANTOR', 'BANGUNAN KANTOR', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G02', 'G', '1', 'BANGUNAN RUMAH JABATAN', 'BANGUNAN RUMAH JABATAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G02', 'G', '1', 'BANGUNAN RUMAH JABATAN  ', 'BANGUNAN RUMAH JABATAN  ', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G03', 'G', '1', 'BANGUNAN ARSIP', 'BANGUNAN ARSIP', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G03', 'G', '1', 'BANGUNAN ARSIP', 'BANGUNAN ARSIP', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G04', 'G', '1', 'BANGUNAN WISMA / MESS', 'BANGUNAN WISMA / MESS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G04', 'G', '1', 'BANGUNAN WISMA / MESS', 'BANGUNAN WISMA / MESS', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G05', 'G', '1', 'BANGUNAN PENDIDIKAN DAN LATIHAN', 'BANGUNAN PENDIDIKAN DAN LATIHAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G05', 'G', '1', 'BANGUNAN PENDIDIKAN DAN LATIHAN', 'BANGUNAN PENDIDIKAN DAN LATIHAN', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G06', 'G', '1', 'BANGUNAN PAGAR', 'BANGUNAN PAGAR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G06', 'G', '1', 'BANGUNAN PAGAR', 'BANGUNAN PAGAR', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G07', 'G', '1', 'BANGUNAN GUDANG', 'BANGUNAN GUDANG', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G07', 'G', '1', 'BANGUNAN GUDANG', 'BANGUNAN GUDANG', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G08', 'G', '1', 'BANGUNAN MUSHOLA', 'BANGUNAN MUSHOLA', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G08', 'G', '1', 'BANGUNAN MUSHOLAH', 'BANGUNAN MUSHOLAH', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('G99', 'G', '1', 'BANGUNAN LAINNYA', 'BANGUNAN LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('G99', 'G', '1', 'BANGUNAN LAINNYA', 'BANGUNAN LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H01', 'H', '1', 'MEJA KAYU', 'MEJA KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H01', 'H', '1', 'MEJA BESI/LOGAM', 'MEJA BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H02', 'H', '1', 'KURSI KAYU', 'KURSI KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H02', 'H', '1', 'KURSI BESI/LOGAM', 'KURSI BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H03', 'H', '1', 'LEMARI KAYU', 'LEMARI KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H03', 'H', '1', 'LEMARI BESI/LOGAM', 'LEMARI BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H04', 'H', '1', 'SOFA KAYU', 'SOFA KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H04', 'H', '1', 'SOFA BESI/LOGAM', 'SOFA BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H05', 'H', '1', 'CREDENZA KAYU', 'CREDENZA KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H05', 'H', '1', 'CREDENZA BESI/LOGAM', 'CREDENZA BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H06', 'H', '1', 'FILLING CABINET KAYU', 'FILLING CABINET KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H06', 'H', '1', 'FILLING CABINET BESI/LOGAM', 'FILLING CABINET BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H07', 'H', '1', 'MEJA RIAS KAYU', 'MEJA RIAS KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H07', 'H', '1', 'MEJA RIAS BESI/LOGAM', 'MEJA RIAS BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H08', 'H', '1', 'RAK ARSIP KAYU', 'RAK ARSIP KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H08', 'H', '1', 'RAK ARSIP BESI/LOGAM', 'RAK ARSIP BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('H09', 'H', '1', 'RAK KAYU', 'RAK KAYU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('H09', 'H', '1', 'RAK BESI/LOGAM', 'RAK BESI/LOGAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('I01', 'I', '1', 'EXTERNAL HARDISK', 'EXTERNAL HARDISK', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I02', 'I', '1', 'MODEM', 'MODEM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I03', 'I', '1', 'SCANNER', 'SCANNER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I04', 'I', '1', 'WEBCAM', 'WEBCAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I05', 'I', '1', 'VGA CARD', 'VGA CARD', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I06', 'I', '1', 'LAN CARD', 'LAN CARD', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I07', 'I', '1', 'CD/DVD RW', 'CD/DVD RW', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I08', 'I', '1', 'MOTHERBOARD/RAM', 'MOTHERBOARD/RAM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I09', 'I', '1', 'PRINTER', 'PRINTER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I10', 'I', '1', 'MOUSE', 'MOUSE', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I11', 'I', '1', 'KEYBOARD', 'KEYBOARD', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I12', 'I', '1', 'PERANGKAT JARINGAN', 'PERANGKAT JARINGAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I13', 'I', '1', 'TABLET', 'TABLET', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('I14', 'I', '1', 'MONITOR', 'MONITOR', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M00', 'M', '1', 'BARANG  KENDARAAN (NON-KAP)', 'BARANG  KENDARAAN (NON-KAP)', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M01', 'M', '1', 'MOBIL SEDAN', 'MOBIL SEDAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M01', 'M', '1', 'MOBIL NON SEDAN', 'MOBIL NON SEDAN', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '02');
INSERT INTO kode_aset_kategori VALUES ('M02', 'M', '1', 'SEPEDA MOTOR', 'SEPEDA MOTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M03', 'M', '1', 'MOBIL MINI BUS', 'MOBIL MINI BUS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M04', 'M', '1', 'BUS', 'BUS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M05', 'M', '1', 'MOBIL DOUBLE GARDAN', 'MOBIL DOUBLE GARDAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M06', 'M', '1', 'MOBIL BOX', 'MOBIL BOX', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('M07', 'M', '1', 'MOBIL TRUK', 'MOBIL TRUK', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T01', 'T', '1', 'TANAH GEDUNG KANTOR', 'TANAH GEDUNG KANTOR', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T02', 'T', '1', 'TANAH GEDUNG RUMAH JABATAN', 'TANAH GEDUNG RUMAH JABATAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T03', 'T', '1', 'TANAH GEDUNG ARSIP', 'TANAH GEDUNG ARSIP', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T04', 'T', '1', 'TANAH GEDUNG WISMA / MESS', 'TANAH GEDUNG WISMA / MESS', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T05', 'T', '1', 'TANAH GEDUNG PENDIDIKAN DAN LATIHAN', 'TANAH GEDUNG PENDIDIKAN DAN LATIHAN', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T06', 'T', '1', 'TANAH GUDANG', 'TANAH GUDANG', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T07', 'T', '1', 'TANAH KOSONG', 'TANAH KOSONG', true, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('T99', 'T', '1', 'TANAH LAINNYA', 'TANAH LAINNYA', true, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F01', 'B', '1', 'MESIN TIK MANUAL', 'MESIN TIK MANUAL', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F02', 'B', '1', 'MESIN CETAK', 'MESIN CETAK', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F03', 'B', '1', 'MESIN PENGHANCUR KERTAS', 'MESIN PENGHANCUR KERTAS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F04', 'B', '1', 'MESIN HITUNG MANUAL', 'MESIN HITUNG MANUAL', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F05', 'B', '1', 'MESIN HITUNG CALCULATOR', 'MESIN HITUNG CALCULATOR', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F06', 'B', '1', 'MESIN LAMINATING', 'MESIN LAMINATING', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F07', 'B', '1', 'MESIN ABSENSI', 'MESIN ABSENSI', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F08', 'B', '1', 'MESIN PENJILID', 'MESIN PENJILID', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('F09', 'B', '1', 'MESIN POTONG KERTAS', 'MESIN POTONG KERTAS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J01', 'E', '1', 'KARPET', 'KARPET', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J02', 'E', '1', 'LAMPU', 'LAMPU', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J03', 'E', '1', 'GORDYN', 'GORDYN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J04', 'E', '1', 'LUKISAN', 'LUKISAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J05', 'E', '1', 'JAM DINDING', 'JAM DINDING', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J06', 'E', '1', 'AC PORTABLE', 'AC PORTABLE', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J07', 'E', '1', 'UPS', 'UPS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J08', 'E', '1', 'STABILIZER', 'STABILIZER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J09', 'E', '1', 'PESAWAT TELEPHONE', 'PESAWAT TELEPHONE', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J10', 'E', '1', 'WHITEBOARD', 'WHITEBOARD', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J11', 'E', '1', 'MESIN FAX', 'MESIN FAX', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J12', 'E', '1', 'DISPENSER', 'DISPENSER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J13', 'E', '1', 'KULKAS', 'KULKAS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J14', 'E', '1', 'MICROWAVE', 'MICROWAVE', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J15', 'E', '1', 'TELEVISI', 'TELEVISI', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J16', 'E', '1', 'KIPAS ANGIN', 'KIPAS ANGIN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J17', 'E', '1', 'TANGGA ALUMUNIUM', 'TANGGA ALUMUNIUM', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J18', 'E', '1', 'SPEAKER', 'SPEAKER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J19', 'E', '1', 'DVD PLAYER', 'DVD PLAYER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J20', 'E', '1', 'VACUM CLEANER', 'VACUM CLEANER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J21', 'E', '1', 'CAMERA DIGITAL', 'CAMERA DIGITAL', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J22', 'E', '1', 'CASH BOX', 'CASH BOX', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J23', 'E', '1', 'RAK', 'RAK', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J24', 'E', '1', 'EXHAUST FAN', 'EXHAUST FAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J25', 'E', '1', 'AIR PURIFIER', 'AIR PURIFIER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J26', 'E', '1', 'AMPLIFIER', 'AMPLIFIER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J27', 'E', '1', 'HANDY TALKIE', 'HANDY TALKIE', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J28', 'E', '1', 'MICROFON', 'MICROFON', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J29', 'E', '1', 'BRACKET TV', 'BRACKET TV', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J30', 'E', '1', 'TRIPOD', 'TRIPOD', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J31', 'E', '1', 'RECEIVER DIGITAL', 'RECEIVER DIGITAL', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J32', 'E', '1', 'APAR', 'APAR', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J33', 'E', '1', 'TERMOMETER RUANGAN', 'TERMOMETER RUANGAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J34', 'E', '1', 'TROLLY', 'TROLLY', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J35', 'E', '1', 'POMPA JET PUMP', 'POMPA JET PUMP', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J36', 'E', '1', 'SETRIKA', 'SETRIKA', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J37', 'E', '1', 'BUNGA HIAS', 'BUNGA HIAS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J38', 'E', '1', 'RICE COOKER', 'RICE COOKER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J39', 'E', '1', 'TOASTER', 'TOASTER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J40', 'E', '1', 'EMERGENCY LAMP', 'EMERGENCY LAMP', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J41', 'E', '1', 'TEMPAT SAMPAH STAINLESS', 'TEMPAT SAMPAH STAINLESS', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J42', 'E', '1', 'POT BUNGA', 'POT BUNGA', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J43', 'E', '1', 'LASER POINTER', 'LASER POINTER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J44', 'E', '1', 'PENGHARUM RUANGAN', 'PENGHARUM RUANGAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J45', 'E', '1', 'PAJANGAN', 'PAJANGAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J46', 'E', '1', 'ACCESS POINT', 'ACCESS POINT', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J47', 'E', '1', 'PERALATAN OLAHRAGA', 'PERALATAN OLAHRAGA', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J48', 'E', '1', 'TIMBANGAN', 'TIMBANGAN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J49', 'E', '1', 'MONITOR', 'MONITOR', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J50', 'E', '1', 'CCTV', 'CCTV', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J51', 'E', '1', 'KUNCI AKSES', 'KUNCI AKSES', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J52', 'E', '1', 'STETOSKOP', 'STETOSKOP', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J53', 'E', '1', 'TENSI METER', 'TENSI METER', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J54', 'E', '1', 'STICK GOLF', 'STICK GOLF', false, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J55', 'E', '1', 'TEMPAT TIDUR', 'TEMPAT TIDUR', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J56', 'E', '1', 'SAFE BOX', 'SAFE BOX', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J57', 'E', '1', 'KOTAK P3K', 'KOTAK P3K', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J58', 'E', '1', 'PERLENGKAPAN RUMAH TANGGA', 'PERLENGKAPAN RUMAH TANGGA', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J59', 'E', '1', 'TABUNG OKSIGEN', 'TABUNG OKSIGEN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J60', 'E', '1', 'CERMIN', 'CERMIN', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J61', 'E', '1', 'TRAFFIC CONE', 'TRAFFIC CONE', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J62', 'E', '1', 'PERKAKAS TUKANG', 'PERKAKAS TUKANG', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J63', 'E', '1', 'WATER TORENT', 'WATER TORENT', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J64', 'E', '1', 'PERANGKAT DOKUMENTASI', 'PERANGKAT DOKUMENTASI', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');
INSERT INTO kode_aset_kategori VALUES ('J65', 'E', '1', 'DETECTOR', 'DETECTOR', false, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, '01');


--
-- TOC entry 3795 (class 0 OID 38130)
-- Dependencies: 244
-- Data for Name: kode_aset_kondisi; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_aset_kondisi VALUES ('B', 'BAIK', true, NULL, NULL, '2020-09-09 00:00:00', 'ADMIN', NULL, NULL);
INSERT INTO kode_aset_kondisi VALUES ('R', 'RUSAK', true, NULL, NULL, '2020-09-09 00:00:00', 'ADMIN', NULL, NULL);
INSERT INTO kode_aset_kondisi VALUES ('H', 'HILANG', true, NULL, NULL, '2020-09-09 00:00:00', 'ADMIN', NULL, NULL);
INSERT INTO kode_aset_kondisi VALUES ('U', 'USANG', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3796 (class 0 OID 38134)
-- Dependencies: 245
-- Data for Name: kode_aset_penyusutan; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO kode_aset_penyusutan VALUES (2, 'A01', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (3, 'A01', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (4, 'A01', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (5, 'A02', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (6, 'A02', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (7, 'A02', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (8, 'A02', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (9, 'A03', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (10, 'A03', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (11, 'A03', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (12, 'A03', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (13, 'A04', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (14, 'A04', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (15, 'A04', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (16, 'A04', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (17, 'A05', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (18, 'A05', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (19, 'A05', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (20, 'A05', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (21, 'A06', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (22, 'A06', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (23, 'A06', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (24, 'A06', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (25, 'A07', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (26, 'A07', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (27, 'A07', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (28, 'A07', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (29, 'A08', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (30, 'A08', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (31, 'A08', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (32, 'A08', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (33, 'A09', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (34, 'A09', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (35, 'A09', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (36, 'A09', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (37, 'A10', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (38, 'A10', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (39, 'A10', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (40, 'A10', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (41, 'B01', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (42, 'B01', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (43, 'B02', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (44, 'B02', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (45, 'B03', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (46, 'B03', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (47, 'B04', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (48, 'B04', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (49, 'B05', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (50, 'B05', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (51, 'B06', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (52, 'B06', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (53, 'B07', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (54, 'B07', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (55, 'B08', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (56, 'B08', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (57, 'B09', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (58, 'B09', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (59, 'B10', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (60, 'B10', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (61, 'B11', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (62, 'B11', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (63, 'B12', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (64, 'B12', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (65, 'B13', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (66, 'B13', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (67, 'B14', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (68, 'B14', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (69, 'B15', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (70, 'B15', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (71, 'B16', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (72, 'B16', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (73, 'B17', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (74, 'B17', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (75, 'B18', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (76, 'B18', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (77, 'B19', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (78, 'B19', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (79, 'B20', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (80, 'B20', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (81, 'C01', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (82, 'C01', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (83, 'C02', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (84, 'C02', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (85, 'C03', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (86, 'C03', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (87, 'C04', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (88, 'C04', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (89, 'C05', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (90, 'C05', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (91, 'C06', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (92, 'C06', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (93, 'C07', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (94, 'C07', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (95, 'C08', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (96, 'C08', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (97, 'C09', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (98, 'C09', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (99, 'C30', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (100, 'C30', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (101, 'C31', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (102, 'C31', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (103, 'C32', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (104, 'C32', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (105, 'C33', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (106, 'C33', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (107, 'C34', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (108, 'C34', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (109, 'C35', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (110, 'C35', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (111, 'C36', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (112, 'C36', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (113, 'C50', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (114, 'C50', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (115, 'C51', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (116, 'C51', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (117, 'C52', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (118, 'C52', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (119, 'C53', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (120, 'C53', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (121, 'C71', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (122, 'C71', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (123, 'C72', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (124, 'C72', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (125, 'C73', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (126, 'C73', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (127, 'C74', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (128, 'C74', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (129, 'C80', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (130, 'C80', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (131, 'E01', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (132, 'E01', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (133, 'E01', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (134, 'E01', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (135, 'E01', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (136, 'E01', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (137, 'E01', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (138, 'E01', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (139, 'E01', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (140, 'E01', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (141, 'E01', '05', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (142, 'E01', '05', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (143, 'E01', '06', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (144, 'E01', '06', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (145, 'E01', '07', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (146, 'E01', '07', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (147, 'E01', '08', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (148, 'E01', '08', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (149, 'E02', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (150, 'E02', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (151, 'E02', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (152, 'E02', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (153, 'E02', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (154, 'E02', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (155, 'E02', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (156, 'E02', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (157, 'E02', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (158, 'E02', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (159, 'E02', '05', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (160, 'E02', '05', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (161, 'E02', '06', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (162, 'E02', '06', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (163, 'E03', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (164, 'E03', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (165, 'E03', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (166, 'E03', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (167, 'E03', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (168, 'E03', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (169, 'E03', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (170, 'E03', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (171, 'E03', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (172, 'E03', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (173, 'E03', '05', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (174, 'E03', '05', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (175, 'E03', '06', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (176, 'E03', '06', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (177, 'E03', '07', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (178, 'E03', '07', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (179, 'E04', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (180, 'E04', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (181, 'E04', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (182, 'E04', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (183, 'E04', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (184, 'E04', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (185, 'E04', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (186, 'E04', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (187, 'E04', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (188, 'E04', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (189, 'E04', '05', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (190, 'E04', '05', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (191, 'E05', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (192, 'E05', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (193, 'E05', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (194, 'E05', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (195, 'E05', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (196, 'E05', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (197, 'E05', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (198, 'E05', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (199, 'E05', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (200, 'E05', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (201, 'E06', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (202, 'E06', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (203, 'E06', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (204, 'E06', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (205, 'E06', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (206, 'E06', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (207, 'E07', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (208, 'E07', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (209, 'E07', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (210, 'E07', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (211, 'E07', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (212, 'E07', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (213, 'E07', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (214, 'E07', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (215, 'E07', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (216, 'E07', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (217, 'E07', '05', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (218, 'E07', '05', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (219, 'E07', '06', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (220, 'E07', '06', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (221, 'E07', '07', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (222, 'E07', '07', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (223, 'E07', '08', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (224, 'E07', '08', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (225, 'E07', '09', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (226, 'E07', '09', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (227, 'E07', '10', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (228, 'E07', '10', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (229, 'E07', '11', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (230, 'E07', '11', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (231, 'E07', '12', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (232, 'E07', '12', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (233, 'E09', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (234, 'E09', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (235, 'E09', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (236, 'E09', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (237, 'E09', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (238, 'E09', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (239, 'E10', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (240, 'E10', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (241, 'E10', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (242, 'E10', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (243, 'E10', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (244, 'E10', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (245, 'E10', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (246, 'E10', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (247, 'E10', '04', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (248, 'E10', '04', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (249, 'E11', '00', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (250, 'E11', '00', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (251, 'E11', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (252, 'E11', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (253, 'E11', '02', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (254, 'E11', '02', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (255, 'E11', '03', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (256, 'E11', '03', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (257, 'E12', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (258, 'E12', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (259, 'E13', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (260, 'E13', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (261, 'E14', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (262, 'E14', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (263, 'E15', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (264, 'E15', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (265, 'E16', '01', '1900-01-01', 48, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (266, 'E16', '01', '2011-01-01', 48, true, 5, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (267, 'G01', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (268, 'G01', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (269, 'G02', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (270, 'G02', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (271, 'G03', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (272, 'G03', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (273, 'G04', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (274, 'G04', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (275, 'G05', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (276, 'G05', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (277, 'G06', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (278, 'G06', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (279, 'G07', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (280, 'G07', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (281, 'G08', '01', '1900-01-01', 240, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (282, 'G08', '01', '2011-01-01', 240, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (283, 'M01', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (284, 'M01', '01', '2008-01-01', 60, true, 25, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (285, 'M02', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (286, 'M02', '01', '2008-01-01', 60, true, 10, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (287, 'M03', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (288, 'M03', '01', '2008-01-01', 60, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (289, 'M04', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (290, 'M04', '01', '2008-01-01', 60, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (291, 'M05', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (292, 'M05', '01', '2008-01-01', 60, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (293, 'M06', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (294, 'M06', '01', '2008-01-01', 60, true, 20, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (295, 'M07', '01', '1900-01-01', 60, true, 1, NULL, NULL, NULL, NULL);
INSERT INTO kode_aset_penyusutan VALUES (296, 'M07', '01', '2008-01-01', 60, true, 20, NULL, NULL, NULL, NULL);

SELECT pg_catalog.setval('kode_aset_penyusutan_id_kode_aset_penyusutan_seq', 296, true);


INSERT INTO kode_aset_subkelompok VALUES ('A00', 'A', '00', 'HAPUS EDIT 1', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('A01', 'A', '01', 'MEJA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A02', 'A', '02', 'KURSI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A03', 'A', '03', 'LEMARI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A04', 'A', '04', 'SOFA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A05', 'A', '05', 'CREDENZA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A06', 'A', '06', 'FILLING CABINET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A07', 'A', '07', 'ROLL O PACK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A08', 'A', '08', 'MEJA RIAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A09', 'A', '09', 'RAK BESI (ARSIP)', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A10', 'A', '10', 'TEMPAT TIDUR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('A99', 'A', '99', 'MEUBELAIR/FURNITUR LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('B00', 'B', '00', 'MESIN KANTOR (PERALATAN KANTOR NON-KAPITALISASI)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('B01', 'B', '01', 'MESIN TIK MANUAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B02', 'B', '02', 'MESIN TIK LISTRIK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B03', 'B', '03', 'MESIN CETAK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B04', 'B', '04', 'MESIN FOTO COPY', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B05', 'B', '05', 'MESIN PENGHANCUR KERTAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B06', 'B', '06', 'MESIN HITUNG MANUAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B07', 'B', '07', 'MESIN HITUNG ELEKTRONIK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B08', 'B', '08', 'MESIN LAMINATING', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B09', 'B', '09', 'MESIN ABSENSI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B10', 'B', '10', 'MESIN PENJILID', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B11', 'B', '11', 'MESIN ALAMAT (ADDRESS MACHINE)', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B12', 'B', '12', 'MESIN PERANGKO', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B13', 'B', '13', 'MESIN TERAAN METERAI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B14', 'B', '14', 'MESIN PEMBUAT HURUF', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B15', 'B', '15', 'MESIN POTONG KERTAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B16', 'B', '16', 'MESIN DELEGATES UNIT', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B17', 'B', '17', 'MESIN MICRO FILM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B18', 'B', '18', 'MESIN HITUNG UANG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B19', 'B', '19', 'MESIN PENGOLAH KATA (WORD PROCESSOR )', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B20', 'B', '20', 'MESIN ANTRIAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('B99', 'B', '99', 'MESIN LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('C00', 'C', '00', 'PERANGKAT KERAS KOMPUTER (NON KAPITALISASI)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('C01', 'C', '01', 'PERSONAL COMPUTER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C02', 'C', '02', 'NOTEBOOK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C03', 'C', '03', 'SCANNER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C04', 'C', '04', 'BARCODE READER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C05', 'C', '05', 'MODEM EXTERNAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C06', 'C', '06', 'EDMS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C07', 'C', '07', 'HARDISK EXTERNAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C08', 'C', '08', 'MONITOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C09', 'C', '09', 'TABLET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C30', 'C', '30', 'SERVER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C31', 'C', '31', 'CD ROM SERVER EXTERNAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C32', 'C', '32', 'EXTERNAL DISK SERVER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C33', 'C', '33', 'MEMORI SERVER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C34', 'C', '34', 'DISK SERVER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C35', 'C', '35', 'CD ROM DRIVE EXTERNAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C36', 'C', '36', 'TAPE DRIVE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C50', 'C', '50', 'HUB', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C51', 'C', '51', 'SWITCHING', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C52', 'C', '52', 'ROUTER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C53', 'C', '53', 'ACCESS POINT', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C70', 'C', '70', 'PRINTER DOT MATRIX (80 COL)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('C71', 'C', '71', 'PRINTER DOT MATRIX (132 COL)', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C72', 'C', '72', 'PRINTER DESKJET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C73', 'C', '73', 'PRINTER INKJET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C74', 'C', '74', 'PRINTER LASERJET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C80', 'C', '80', 'PRINTER SERVER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('C81', 'C', '81', 'TABLET PC', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('C90', 'C', '90', 'PERANGKAT KOMPUTER LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('C99', 'C', '99', 'PERANGKAT SERVER LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('D01', 'D', '01', 'PERANGKAT LUNAK BELANJA MODAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('D02', 'D', '02', 'PERANGKAT LUNAK NON JHT', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('D03', 'D', '03', 'PERANGKAT LUNAK DATABASE', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('D04', 'D', '04', 'PERANGKAT LUNAK PEMROGRAMAN', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('D10', 'D', '10', 'LISENSI PERANGKAT LUNAK', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('D20', 'D', '20', 'PENGEMBANGAN PERANGKAT LUNAK BELANJA MODAL', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('D99', 'D', '99', 'PERANGKAT LUNAK LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('E00', 'E', '00', 'PERALATAN LAINNYA (NON-KAPITALISASI)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('E01', 'E', '01', 'PERLENGKAPAN BANGUNAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E02', 'E', '02', 'PERANGKAT POWER SYSTEM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E03', 'E', '03', 'PERANGKAT KOMUNIKASI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E04', 'E', '04', 'PERANGKAT VIDEO CONFERENCE / SEMINAR / RAPAT', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E05', 'E', '05', 'PERANGKAT DOKUMENTASI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E06', 'E', '06', 'PERANGKAT AUDIO / VIDEO SYSTEM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E07', 'E', '07', 'INTERIOR GEDUNG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E08', 'E', '08', 'SEMUA JENIS INTERIOR RUMAH', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('E09', 'E', '09', 'AKSESORIES / ARTWORK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E10', 'E', '10', 'PERLENGKAPAN RUMAH TANGGA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E11', 'E', '11', 'SAFE BOX', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E12', 'E', '12', 'CCTV', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E13', 'E', '13', 'KUNCI AKSES', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E14', 'E', '14', 'TABUNG OKSIGEN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E15', 'E', '15', 'PERALATAN OLAHRAGA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E16', 'E', '16', 'PERALATAN MUSIK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('E17', 'E', '01', 'TABUNG PEMADAM', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('E99', 'E', '99', 'PERALATAN LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('F01', 'B', '01', 'MESIN TIK MANUAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F02', 'B', '02', 'MESIN CETAK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F03', 'B', '03', 'MESIN PENGHANCUR KERTAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F04', 'B', '04', 'MESIN HITUNG MANUAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F05', 'B', '05', 'MESIN HITUNG CALCULATOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F06', 'B', '06', 'MESIN LAMINATING', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F07', 'B', '07', 'MESIN ABSENSI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F08', 'B', '08', 'MESIN PENJILID', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('F09', 'B', '09', 'MESIN POTONG KERTAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G00', 'G', '00', 'BANGUNAN (NON-KAPITALISASI)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('G01', 'G', '01', 'BANGUNAN KANTOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G02', 'G', '02', 'BANGUNAN RUMAH JABATAN  ', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G03', 'G', '03', 'BANGUNAN ARSIP', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G04', 'G', '04', 'BANGUNAN WISMA / MESS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G05', 'G', '05', 'BANGUNAN PENDIDIKAN DAN LATIHAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G06', 'G', '06', 'BANGUNAN PAGAR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G07', 'G', '07', 'BANGUNAN GUDANG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G08', 'G', '08', 'BANGUNAN MUSHOLAH', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('G99', 'G', '99', 'BANGUNAN LAINNYA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('H01', 'A', '01', 'MEJA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H02', 'A', '02', 'KURSI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H03', 'A', '03', 'LEMARI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H04', 'A', '04', 'SOFA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H05', 'A', '05', 'CREDENZA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H06', 'A', '06', 'FILLING CABINET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H07', 'A', '07', 'MEJA RIAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H08', 'A', '08', 'RAK BESI (ARSIP)', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('H09', 'A', '09', 'RAK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I01', 'I', '01', 'EXTERNAL HARDISK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I02', 'I', '02', 'MODEM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I03', 'I', '03', 'SCANNER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I04', 'I', '04', 'WEBCAM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I05', 'I', '05', 'VGA CARD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I06', 'I', '06', 'LAN CARD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I07', 'I', '07', 'CD RW', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I08', 'I', '08', 'MOTHERBOARD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I09', 'I', '09', 'PRINTER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I10', 'I', '10', 'MOUSE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I11', 'I', '11', 'KEYBOARD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I12', 'I', '12', 'PERANGKAT JARINGAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I13', 'I', '13', 'TABLET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('I14', 'I', '14', 'MONITOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J01', 'E', '01', 'KARPET', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J02', 'E', '02', 'LAMPU HIAS ', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J03', 'E', '03', 'GORDYN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J04', 'E', '04', 'LUKISAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J05', 'E', '05', 'JAM DINDING', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J06', 'E', '06', 'AC PORTABLE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J07', 'E', '07', 'UPS KAPASITAS 500 VA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J08', 'E', '08', 'STABILIZER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J09', 'E', '09', 'PESAWAT TELEPHONE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J10', 'E', '10', 'WHITEBOARD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J11', 'E', '11', 'MESIN FAX', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J12', 'E', '12', 'DISPENSER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J13', 'E', '13', 'KULKAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J14', 'E', '14', 'MICROWAVE', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J15', 'E', '15', 'TELEVISI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J16', 'E', '16', 'KIPAS ANGIN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J17', 'E', '17', 'TANGGA ALUMUNIUM', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J18', 'E', '18', 'SPEAKER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J19', 'E', '19', 'DVD PLAYER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J20', 'E', '20', 'VACUM CLEANER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J21', 'E', '21', 'CAMERA DIGITAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J22', 'E', '22', 'CASH BOX', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J23', 'E', '23', 'RAK', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J24', 'E', '24', 'EXHAUST FAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J25', 'E', '25', 'AIR PURIFIER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J26', 'E', '26', 'AMPLIFIER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J27', 'E', '27', 'HANDY TALKIE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J28', 'E', '28', 'MICROFON', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J29', 'E', '29', 'BRACKET TV', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J30', 'E', '30', 'TRIPOD', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J31', 'E', '31', 'RECEIVER DIGITAL', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J32', 'E', '32', 'APAR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J33', 'E', '33', 'TERMOMETER RUANGAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J34', 'E', '34', 'TROLLY', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J35', 'E', '35', 'POMPA JET PUMP', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J36', 'E', '36', 'SETRIKA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J37', 'E', '37', 'BUNGA HIAS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J38', 'E', '38', 'RICE COOKER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J39', 'E', '39', 'TOASTER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J40', 'E', '40', 'EMERGENCY LAMP', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J41', 'E', '41', 'TEMPAT SAMPAH', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J42', 'E', '42', 'POT BUNGA', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J43', 'E', '43', 'LASER POINTER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J44', 'E', '44', 'PENGHARUM RUANGAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J45', 'E', '45', 'PAJANGAN/ARTWORK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J46', 'E', '46', 'ACCESS POINT', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J47', 'E', '47', 'PERALATAN OLAHRAGA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J48', 'E', '48', 'TIMBANGAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J49', 'E', '49', 'MONITOR', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J50', 'E', '50', 'CCTV', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J51', 'E', '51', 'KUNCI AKSES', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J52', 'E', '52', 'STETOSKOP', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J53', 'E', '53', 'TENSI METER', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J54', 'E', '54', 'STICK GOLF', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('J55', 'E', '55', 'TEMPAT TIDUR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J56', 'E', '56', 'SAFEBOX', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J57', 'E', '57', 'KOTAK P3K', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J58', 'E', '58', 'PERLENGKAPAN RUMAH TANGGA', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J59', 'E', '59', 'TABUNG OKSIGEN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J60', 'E', '60', 'CERMIN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J61', 'E', '61', 'TRAFFIC CONE', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J62', 'E', '62', 'PERKAKAS TUKANG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J63', 'E', '63', 'WATER TORENT', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J64', 'E', '64', 'PERANGKAT DOKUMENTASI', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('J65', 'E', '65', 'DETECTOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M00', 'M', '00', 'KENDARAAN DINAS (NON-KAPITALISASI)', NULL, NULL, NULL, NULL, false);
INSERT INTO kode_aset_subkelompok VALUES ('M01', 'M', '01', 'MOBIL SEDAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M02', 'M', '02', 'SEPEDA MOTOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M03', 'M', '03', 'MOBIL MINI BUS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M04', 'M', '04', 'BUS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M05', 'M', '05', 'MOBIL DOUBLE GARDAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M06', 'M', '06', 'MOBIL BOX', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('M07', 'M', '07', 'MOBIL TRUK', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T01', 'T', '01', 'TANAH GEDUNG KANTOR', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T02', 'T', '02', 'TANAH GEDUNG RUMAH JABATAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T03', 'T', '03', 'TANAH GEDUNG ARSIP', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T04', 'T', '04', 'TANAH GEDUNG WISMA / MESS', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T05', 'T', '05', 'TANAH GEDUNG PENDIDIKAN DAN LATIHAN', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T06', 'T', '06', 'TANAH GUDANG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T07', 'T', '07', 'TANAH KOSONG', NULL, NULL, NULL, NULL, true);
INSERT INTO kode_aset_subkelompok VALUES ('T99', 'T', '99', 'TANAH LAINNYA', NULL, NULL, NULL, NULL, false);


--
-- TOC entry 3801 (class 0 OID 38152)
-- Dependencies: 251
-- Data for Name: kode_batas_kap; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_batas_kap VALUES (1, 5000000, '2019-01-01', true, NULL, NULL, NULL, NULL);
INSERT INTO kode_batas_kap VALUES (2, 2500000, '2011-01-01', false, NULL, NULL, NULL, NULL);

SELECT pg_catalog.setval('kode_batas_kap_id_batas_kap_seq', 2, true);


--
-- TOC entry 3803 (class 0 OID 38157)
-- Dependencies: 253
-- Data for Name: kode_dokumen; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_dokumen VALUES ('ID', 'KARTU IDENTITAS', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('F1', 'FORM PENDAFTARAN BPJS KETENAGAKERJAAN', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('F2', 'FORM PROFIL PENYEWA', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('P', 'FOTO', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('SK', 'SURAT KETERANGAN BEKERJA', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('PKL', 'SURAT KETERANGAN PKL', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('ST', 'STATUS KARYAWAN (LAJANG/ KAWIN)', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('KPJ', 'KARTU PESERTA BPJS kETENAGAKERJAAN', true, NULL, NULL, '2020-08-25 21:24:34.957421', 'SYSY', NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('NKH', 'SURAT NIKAH', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_dokumen VALUES ('KK', 'KARTU KELUARGA', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3804 (class 0 OID 38161)
-- Dependencies: 254
-- Data for Name: kode_fitur; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_fitur VALUES ('F0502', 'PENGGUNA APP', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010101', 'DRAFT REGISTRASI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010102', 'SUBMIT KONTRAK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010103', 'WAITING LIST', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010201', 'KONTRAK AKTIF', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010202', 'APPROVAL KONTRAK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010203', 'DALAM PROSES', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010204', 'KONTRAK BERHENTI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010301', 'PENGHUNI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F010302', 'HISTORI PENGHUNI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020101', 'ENTRI BILLING', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020102', 'SEWA UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020103', 'DEPOSIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020104', 'LISTRIK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020105', 'AIR', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020106', 'BARANG RUSAK/HILANG', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020107', 'FASILITAS', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020108', 'DENDA', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020201', 'PRA INVOICE', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020202', 'INVOICE', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020203', 'SETUP REKENING PEMBAYARAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020401', 'PEMBAYARAN INVOICE', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020402', 'HISTORY PEMBAYARAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020403', 'DEPOSIT RETUR PEMBAYARAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020601', 'TARIF LANTAI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020602', 'APPROVAL TARIF LANTAI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020603', 'TARIF KHUSUS UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020604', 'APPROVAL TARIF KHUSUS UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020605', 'TARIF LISTRIK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020606', 'TARIF AIR', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020607', 'TARIF FASILITAS', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020608', 'SETTING DENDA', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F030201', 'UTILITAS LISTRIK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F030202', 'UTILITAS AIR', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F040101', 'ASET', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F040102', 'KODE KELOMPOK ASET', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F040103', 'KODE KATEGORI ASET', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F040104', 'INVENTARIS UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050102', 'RUSUN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050103', 'BLOK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050104', 'LANTAI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050105', 'UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050106', 'JENIS UNIT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050107', 'FASILITAS', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050108', 'FASILITAS RUSUN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050109', 'GOLONGAN LISTRIK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050301', 'AGAMA', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050302', 'JENIS KENDARAAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050303', 'STATUS PEKERJAAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050304', 'JENIS IDENTITAS', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050305', 'TIPE BERHENTI', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0301', 'WORK ORDER', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F050101', 'KANTOR', '', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020301', 'MONITORING INVOICE JATUH TEMPO', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020302', 'MONITORING INVOICE KENA DENDA', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0205', 'BERHENTI SEWA', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0104', 'DAFTAR KOMPLAIn', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0601', 'REPORT TENANT', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0602', 'REPORT ASET', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0603', 'REPORT MAINTENANCE', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F020303', 'LAMPIRAN BUKTI PAJAK', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_fitur VALUES ('F0402', 'PENYUSUTAN', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3805 (class 0 OID 38165)
-- Dependencies: 255
-- Data for Name: kode_golongan_listrik; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_golongan_listrik VALUES ('B3', 'BISNIS AREA', 1600000, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3806 (class 0 OID 38169)
-- Dependencies: 256
-- Data for Name: kode_invoice_entries; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_invoice_entries VALUES ('INVSEWA', 'SEWA KONTRAK', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVLSTRK', 'LISTRIK', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVAIR', 'AIR', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVFAS', 'FASILITAS', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVDENDA', 'DENDA', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVMTNC', 'MAINTENANCE', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVEQ', 'EQUIPMENT', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVDPST', 'DEPOSIT', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_invoice_entries VALUES ('INVLAIN', 'LAINNYA', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);


--
-- TOC entry 3807 (class 0 OID 38173)
-- Dependencies: 257
-- Data for Name: kode_invoice_golongan; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3808 (class 0 OID 38180)
-- Dependencies: 258
-- Data for Name: kode_invoice_kelompok; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3809 (class 0 OID 38185)
-- Dependencies: 259
-- Data for Name: kode_invoice_kelompok_entries; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3810 (class 0 OID 38189)
-- Dependencies: 260
-- Data for Name: kode_jenis_kelamin; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_jenis_kelamin VALUES ('L', 'Laki-Laki', NULL, NULL, NULL, NULL, true, NULL, NULL);
INSERT INTO kode_jenis_kelamin VALUES ('P', 'Perempuan', NULL, NULL, NULL, NULL, true, NULL, NULL);


--
-- TOC entry 3811 (class 0 OID 38193)
-- Dependencies: 261
-- Data for Name: kode_jenis_kendaraan; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_jenis_kendaraan VALUES ('RE', 'Roda Empat', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_kendaraan VALUES ('RD', 'RODA DUA', true, NULL, NULL, NULL, NULL, '2021-04-07 03:34:41.216831', NULL);


--
-- TOC entry 3812 (class 0 OID 38197)
-- Dependencies: 262
-- Data for Name: kode_jenis_nik; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_jenis_nik VALUES ('KTP', 'KTP', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_nik VALUES ('KK', 'KK', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_nik VALUES ('BK', 'BUKU NIKAH ', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_nik VALUES ('KBK', 'Kartu BPJS Ketengakerjaan', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3813 (class 0 OID 38201)
-- Dependencies: 263
-- Data for Name: kode_jenis_perolehan; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_jenis_perolehan VALUES ('1', 'PENGADAAN', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_perolehan VALUES ('2', 'HIBAH', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_jenis_perolehan VALUES ('3', 'MUTASI', false, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3814 (class 0 OID 38205)
-- Dependencies: 264
-- Data for Name: kode_kantor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_kantor VALUES ('BPJS', NULL, 'BPJS KETENAGAKERJAAN', 'I', 'JAKARTA', 'KANTOR PUSAT', true, '2020-09-16 11:02:14.539991', NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', '2021-01-12 14:18:36.67177', 'ATB');
INSERT INTO kode_kantor VALUES ('BJK', 'BPJS', 'PT. BINAJASA ABADIKARYA GRAHA NAGOYA MAS (GEDUNG BPJSTK)', 'E', '', '', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', '2020-11-12 16:57:14.80566', 'GUA');



--
-- TOC entry 3815 (class 0 OID 38212)
-- Dependencies: 265
-- Data for Name: kode_kategori_komplain; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_kategori_komplain VALUES ('BILL', 'MASALAH BILLING', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('LSTRK', 'MASALAH LISTRIK', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('AIR', 'MASALAH AIR', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('ITEM', 'MASALAH ITEM UNIT', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('PEL', 'MASALAH PELAYANAN', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('REG', 'MASALAH REGISTRASI', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('FAS', 'MASALAH FASILITAS UNIT', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);
INSERT INTO kode_kategori_komplain VALUES ('O', 'MASALAH LAINNYA', true, NULL, NULL, NULL, '2020-09-16 10:51:30.886156', 'SYS', NULL, NULL);


--
-- TOC entry 3816 (class 0 OID 38216)
-- Dependencies: 266
-- Data for Name: kode_menu; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_menu VALUES ('M0503', 'M05', 'PENGHUNI', '', 503, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M03', '', 'MAINTENANCE', '', 300, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-hammer-wrench');
INSERT INTO kode_menu VALUES ('M06', '', 'REPORT', '', 600, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-file-document');
INSERT INTO kode_menu VALUES ('M0301', 'M03', 'WORK ORDER', '', 301, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0302', 'M03', 'UTILITAS LISTRIK & AIR', '', 302, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0102', 'M01', 'KONTRAK SEWA', '', 102, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0103', 'M01', 'PENGHUNI', '', 103, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0104', 'M01', 'KOMPLAIN', '', 104, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0201', 'M02', 'ENTRI BILLING', '', 201, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0202', 'M02', 'INVOICE', '', 202, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0203', 'M02', 'MONITORING INVOICE', '', 203, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0204', 'M02', 'PEMBAYARAN', '', 204, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0205', 'M02', 'BERHENTI SEWA', '', 205, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0401', 'M04', 'PENCATATAN ASET', '', 401, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0402', 'M04', 'PENYUSUTAN', '', 402, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M01', '', 'TENANT', '', 100, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-home-modern');
INSERT INTO kode_menu VALUES ('M02', '', 'BILLING', '', 200, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-cash-usd');
INSERT INTO kode_menu VALUES ('M04', '', 'ASET', '', 400, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-widgets');
INSERT INTO kode_menu VALUES ('M0101', 'M01', 'REGISTRASI', '', 101, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0502', 'M05', 'PENGGUNA APP', '', 502, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M05', '', 'DATA PENDUKUNG', '', 500, true, NULL, NULL, NULL, NULL, NULL, NULL, 'mdi-cog');
INSERT INTO kode_menu VALUES ('M0501', 'M05', 'KANTOR & BANGUNAN', '', 501, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_menu VALUES ('M0206', 'M02', 'TARIF', NULL, 206, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3817 (class 0 OID 38223)
-- Dependencies: 267
-- Data for Name: kode_pembayaran_method; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_pembayaran_method VALUES ('C', 'CASH', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYS', NULL, NULL);
INSERT INTO kode_pembayaran_method VALUES ('T', 'TRANSFER', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYS', NULL, NULL);
INSERT INTO kode_pembayaran_method VALUES ('FD', 'FINALISASI DEPOSIT & RETUR', false, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3818 (class 0 OID 38227)
-- Dependencies: 268
-- Data for Name: kode_role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_role VALUES ('ADM', 'ADMINISTRATOR', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('MKT', 'MARKETING', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('HM', 'HOUSING MANAGER', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('MTC', 'MAINTENANCE', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('KEU', 'KEUANGAN', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('KC', 'KACAB', NULL, true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_role VALUES ('ALU', 'ALU', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3819 (class 0 OID 38234)
-- Dependencies: 269
-- Data for Name: kode_role_fitur; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_role_fitur VALUES ('F050301ALU', 'F050301', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303HM', 'F050303', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303KC', 'F050303', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102MTC', 'F050102', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106ALU', 'F020106', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205ADM', 'F0205', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205ALU', 'F0205', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205HM', 'F0205', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205KC', 'F0205', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205KEU', 'F0205', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205MKT', 'F0205', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0205MTC', 'F0205', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601ADM', 'F0601', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601ALU', 'F0601', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601HM', 'F0601', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601KC', 'F0601', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601KEU', 'F0601', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601MKT', 'F0601', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0601MTC', 'F0601', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602ADM', 'F0602', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602ALU', 'F0602', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602HM', 'F0602', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602KC', 'F0602', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602KEU', 'F0602', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602MKT', 'F0602', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0602MTC', 'F0602', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603ADM', 'F0603', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603ALU', 'F0603', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603HM', 'F0603', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603KC', 'F0603', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603KEU', 'F0603', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603MKT', 'F0603', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0603MTC', 'F0603', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304MKT', 'F050304', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106KC', 'F050106', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402ALU', 'F0402', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402HM', 'F0402', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402KC', 'F0402', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402KEU', 'F0402', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402MKT', 'F0402', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402MTC', 'F0402', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0402ADM', 'F0402', 'ADM', false, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305ALU', 'F050305', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302HM', 'F050302', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301HM', 'F050301', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305KC', 'F050305', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302KEU', 'F050302', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301KEU', 'F050301', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305KEU', 'F050305', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103KC', 'F050103', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305MTC', 'F050305', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502ADM', 'F0502', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502MKT', 'F0502', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101ADM', 'F020101', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105KEU', 'F050105', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106MKT', 'F050106', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104ADM', 'F050104', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108KC', 'F050108', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202HM', 'F020202', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107HM', 'F050107', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107KEU', 'F050107', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103MTC', 'F050103', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108MTC', 'F050108', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108KEU', 'F050108', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102HM', 'F050102', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105HM', 'F050105', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107KC', 'F050107', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102KEU', 'F050102', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201MKT', 'F020201', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106ADM', 'F050106', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103ALU', 'F050103', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108ALU', 'F050108', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103MKT', 'F040103', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104MKT', 'F040104', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104MTC', 'F040104', 'MTC', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104HM', 'F040104', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102KC', 'F040102', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102HM', 'F040102', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101KEU', 'F040101', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103HM', 'F040103', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103KC', 'F040103', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102ALU', 'F040102', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301KEU', 'F0301', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202KEU', 'F030202', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202HM', 'F030202', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301ADM', 'F0301', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301KC', 'F0301', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105KC', 'F020105', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301HM', 'F0301', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301MKT', 'F0301', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301MTC', 'F0301', 'MTC', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101MKT', 'F020101', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104ADM', 'F020104', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103ALU', 'F020103', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103MTC', 'F020103', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103KEU', 'F020103', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104ALU', 'F040104', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104MKT', 'F020104', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101ADM', 'F050101', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105ALU', 'F020105', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106KC', 'F020106', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105MTC', 'F020105', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402HM', 'F020402', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108KC', 'F020108', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106MTC', 'F020106', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108ALU', 'F020108', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403MKT', 'F020403', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108MTC', 'F020108', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202ALU', 'F020202', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202KEU', 'F020202', 'KEU', true, true, true, false, true, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201ADM', 'F020201', 'ADM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403ADM', 'F020403', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102ADM', 'F010102', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202MTC', 'F020202', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103KC', 'F020103', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402KEU', 'F020402', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601ADM', 'F020601', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601MKT', 'F020601', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602HM', 'F020602', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602KC', 'F020602', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602MTC', 'F020602', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603ADM', 'F020603', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603MKT', 'F020603', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604HM', 'F020604', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604KEU', 'F020604', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606ALU', 'F020606', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606HM', 'F020606', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606KC', 'F020606', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606MTC', 'F020606', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607HM', 'F020607', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607KEU', 'F020607', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608ADM', 'F020608', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101MKT', 'F050101', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101HM', 'F010101', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101KEU', 'F010101', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204HM', 'F010204', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102MKT', 'F010102', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204KEU', 'F010204', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103MKT', 'F010103', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103ADM', 'F010103', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602ALU', 'F020602', 'ALU', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303MKT', 'F050303', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301MKT', 'F010301', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302MKT', 'F010302', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101HM', 'F040101', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302ADM', 'F010302', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301ADM', 'F010301', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106HM', 'F020106', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608MKT', 'F020608', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102MTC', 'F040102', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104KC', 'F040104', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304ADM', 'F050304', 'ADM', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303ADM', 'F050303', 'ADM', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302ALU', 'F050302', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305HM', 'F050305', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302KC', 'F050302', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301KC', 'F050301', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301MTC', 'F050301', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302MTC', 'F050302', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502KC', 'F0502', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103HM', 'F050103', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109ADM', 'F050109', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102ALU', 'F050102', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105ALU', 'F050105', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106ALU', 'F050106', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107MTC', 'F050107', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103KEU', 'F050103', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605ADM', 'F020605', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109MKT', 'F050109', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106MTC', 'F050106', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104MKT', 'F050104', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105MTC', 'F050105', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102KC', 'F050102', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105KC', 'F050105', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107ALU', 'F050107', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108HM', 'F050108', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101ADM', 'F040101', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102KEU', 'F040102', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104KEU', 'F040104', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101MKT', 'F040101', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040104ADM', 'F040104', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201ADM', 'F030201', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103ADM', 'F040103', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202KC', 'F030202', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102ADM', 'F020102', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201MKT', 'F030201', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202MTC', 'F030202', 'MTC', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202ALU', 'F030202', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101ALU', 'F020101', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103HM', 'F020103', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102KEU', 'F020102', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102MKT', 'F020102', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105HM', 'F020105', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104MTC', 'F020104', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107HM', 'F020107', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105KEU', 'F020105', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105MKT', 'F020105', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106KEU', 'F020106', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107ADM', 'F020107', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108HM', 'F020108', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107MKT', 'F020107', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108ADM', 'F020108', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605HM', 'F020605', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108KEU', 'F020108', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020108MKT', 'F020108', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201KC', 'F020201', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605KEU', 'F020605', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202ADM', 'F010202', 'ADM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203HM', 'F020203', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203KEU', 'F020203', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203MKT', 'F020203', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401HM', 'F020401', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401ADM', 'F020401', 'ADM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401KEU', 'F020401', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401MKT', 'F020401', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402ALU', 'F020402', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402KC', 'F020402', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402MTC', 'F020402', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601KC', 'F020601', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602KEU', 'F020602', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603KC', 'F020603', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607ALU', 'F020607', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604KC', 'F020604', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604MTC', 'F020604', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203ADM', 'F020203', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202KC', 'F020202', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102HM', 'F020102', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203ADM', 'F010203', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605MKT', 'F020605', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606KEU', 'F020606', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607KC', 'F020607', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607MTC', 'F020607', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608MTC', 'F020608', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101ALU', 'F010101', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101KC', 'F010101', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101MTC', 'F010101', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102KC', 'F010102', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103MTC', 'F010103', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203MKT', 'F010203', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604ALU', 'F020604', 'ALU', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201HM', 'F010201', 'HM', true, false, false, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301KC', 'F010301', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204ALU', 'F010204', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202KEU', 'F010202', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103ADM', 'F050103', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201ADM', 'F010201', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201KEU', 'F010201', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201MKT', 'F010201', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204MTC', 'F010204', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202MKT', 'F010202', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302KC', 'F010302', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204KC', 'F010204', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305ADM', 'F050305', 'ADM', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302ADM', 'F050302', 'ADM', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301ADM', 'F050301', 'ADM', true, true, true, true, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304HM', 'F050304', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304KC', 'F050304', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303KEU', 'F050303', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304KEU', 'F050304', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050103MKT', 'F050103', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050305MKT', 'F050305', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502ALU', 'F0502', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502MTC', 'F0502', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050302MKT', 'F050302', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102ADM', 'F050102', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107ADM', 'F050107', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108ADM', 'F050108', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109HM', 'F050109', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104KC', 'F050104', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050107MKT', 'F050107', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101KC', 'F050101', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109KC', 'F050109', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105MKT', 'F050105', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109MTC', 'F050109', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104KEU', 'F050104', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104HM', 'F050104', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106HM', 'F050106', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050102MKT', 'F050102', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403KC', 'F020403', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109KEU', 'F050109', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050106KEU', 'F050106', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050108MKT', 'F050108', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050105ADM', 'F050105', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101KEU', 'F050101', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102MKT', 'F040102', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040102ADM', 'F040102', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103KEU', 'F040103', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101ALU', 'F040101', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202ADM', 'F030202', 'ADM', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201KC', 'F030201', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103ADM', 'F020103', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030202MKT', 'F030202', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104HM', 'F020104', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201HM', 'F030201', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104KC', 'F020104', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101MTC', 'F020101', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101KEU', 'F020101', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102ALU', 'F020102', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102MTC', 'F020102', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104ALU', 'F020104', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201KEU', 'F030201', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020103MKT', 'F020103', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403HM', 'F020403', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203KC', 'F020203', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020104KEU', 'F020104', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020105ADM', 'F020105', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106ADM', 'F020106', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020106MKT', 'F020106', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107ALU', 'F020107', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107KEU', 'F020107', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107MTC', 'F020107', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203KEU', 'F010203', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201MTC', 'F020201', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203ALU', 'F020203', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605ALU', 'F020605', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020203MTC', 'F020203', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401KC', 'F020401', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401ALU', 'F020401', 'ALU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020401MTC', 'F020401', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601ALU', 'F020601', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601MTC', 'F020601', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602ADM', 'F020602', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020602MKT', 'F020602', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603ALU', 'F020603', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603MTC', 'F020603', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604ADM', 'F020604', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020604MKT', 'F020604', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608ALU', 'F020608', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101HM', 'F050101', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606ADM', 'F020606', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020606MKT', 'F020606', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607ADM', 'F020607', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020607MKT', 'F020607', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101MKT', 'F010101', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608HM', 'F020608', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608KC', 'F020608', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020608KEU', 'F020608', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101HM', 'F020101', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102ALU', 'F010102', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102KEU', 'F010102', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102MTC', 'F010102', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103ALU', 'F010103', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103HM', 'F010103', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103KC', 'F010103', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010103KEU', 'F010103', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203HM', 'F010203', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101MTC', 'F040101', 'MTC', true, false, false, false, false, true, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301ALU', 'F010301', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201MTC', 'F010201', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202MTC', 'F010202', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202HM', 'F010202', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204ADM', 'F010204', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010204MKT', 'F010204', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203MTC', 'F010203', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201ALU', 'F020201', 'ALU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201ALU', 'F010201', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203KC', 'F010203', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301MTC', 'F010301', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302ALU', 'F010302', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302MTC', 'F010302', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202ALU', 'F010202', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020101KC', 'F020101', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403KEU', 'F020403', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605MTC', 'F020605', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304ALU', 'F050304', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303ALU', 'F050303', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303ADM', 'F020303', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050303MTC', 'F050303', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050304MTC', 'F050304', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502HM', 'F0502', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0502KEU', 'F0502', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101ALU', 'F050101', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303ALU', 'F020303', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303HM', 'F020303', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050101MTC', 'F050101', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303KC', 'F020303', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103ALU', 'F040103', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301HM', 'F010301', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040103MTC', 'F040103', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201MTC', 'F030201', 'MTC', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F030201ALU', 'F030201', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0301ALU', 'F0301', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303KEU', 'F020303', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303MKT', 'F020303', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020303MTC', 'F020303', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201KEU', 'F020201', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010101ADM', 'F010101', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301ADM', 'F020301', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301ALU', 'F020301', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301HM', 'F020301', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301KC', 'F020301', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301KEU', 'F020301', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301MKT', 'F020301', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020301MTC', 'F020301', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302ADM', 'F020302', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302ALU', 'F020302', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302HM', 'F020302', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302KC', 'F020302', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302KEU', 'F020302', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302MKT', 'F020302', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020302MTC', 'F020302', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402ADM', 'F020402', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020402MKT', 'F020402', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601HM', 'F020601', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020601KEU', 'F020601', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603HM', 'F020603', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020603KEU', 'F020603', 'KEU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302HM', 'F010302', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010102HM', 'F010102', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104ADM', 'F0104', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104ALU', 'F0104', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104HM', 'F0104', 'HM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104KC', 'F0104', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104KEU', 'F0104', 'KEU', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104MKT', 'F0104', 'MKT', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F0104MTC', 'F0104', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050301MKT', 'F050301', 'MKT', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104ALU', 'F050104', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050104MTC', 'F050104', 'MTC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F050109ALU', 'F050109', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403ALU', 'F020403', 'ALU', true, true, true, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020201HM', 'F020201', 'HM', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020102KC', 'F020102', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020107KC', 'F020107', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020605KC', 'F020605', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202MKT', 'F020202', 'MKT', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020403MTC', 'F020403', 'MTC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010201KC', 'F010201', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F020202ADM', 'F020202', 'ADM', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010203ALU', 'F010203', 'ALU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010202KC', 'F010202', 'KC', false, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010301KEU', 'F010301', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F010302KEU', 'F010302', 'KEU', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_fitur VALUES ('F040101KC', 'F040101', 'KC', true, false, false, false, false, false, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3820 (class 0 OID 38244)
-- Dependencies: 270
-- Data for Name: kode_role_menu; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_role_menu VALUES ('M01ADM', 'M01', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101ADM', 'M0101', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102ADM', 'M0102', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103ADM', 'M0103', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104ADM', 'M0104', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02ADM', 'M02', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201ADM', 'M0201', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202ADM', 'M0202', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203ADM', 'M0203', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204ADM', 'M0204', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205ADM', 'M0205', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03ADM', 'M03', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301ADM', 'M0301', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302ADM', 'M0302', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04ADM', 'M04', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401ADM', 'M0401', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05ADM', 'M05', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501ADM', 'M0501', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503ADM', 'M0503', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06ADM', 'M06', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M01MKT', 'M01', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101MKT', 'M0101', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102MKT', 'M0102', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103MKT', 'M0103', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104MKT', 'M0104', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205MKT', 'M0205', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03MKT', 'M03', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302MKT', 'M0302', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05MKT', 'M05', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501MKT', 'M0501', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06MKT', 'M06', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M01HM', 'M01', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102HM', 'M0102', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103HM', 'M0103', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104HM', 'M0104', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203HM', 'M0203', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205HM', 'M0205', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03HM', 'M03', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302HM', 'M0302', 'HM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402HM', 'M0402', 'HM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06HM', 'M06', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M01KC', 'M01', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102KC', 'M0102', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103KC', 'M0103', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104KC', 'M0104', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02KC', 'M02', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203KC', 'M0203', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205KC', 'M0205', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03KC', 'M03', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302KC', 'M0302', 'KC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402KC', 'M0402', 'KC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06KC', 'M06', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M01MTC', 'M01', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101MTC', 'M0101', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102MTC', 'M0102', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103MTC', 'M0103', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201MTC', 'M0201', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202MTC', 'M0202', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203MTC', 'M0203', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204MTC', 'M0204', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205MTC', 'M0205', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03MTC', 'M03', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301MTC', 'M0301', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302MTC', 'M0302', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04MTC', 'M04', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401MTC', 'M0401', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06MTC', 'M06', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02KEU', 'M02', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201KEU', 'M0201', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202KEU', 'M0202', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203KEU', 'M0203', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204KEU', 'M0204', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205KEU', 'M0205', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04KEU', 'M04', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402KEU', 'M0402', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M06KEU', 'M06', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05HM', 'M05', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501HM', 'M0501', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05KC', 'M05', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501KC', 'M0501', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05MTC', 'M05', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501MTC', 'M0501', 'MTC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M05KEU', 'M05', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0501KEU', 'M0501', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503KEU', 'M0503', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502ADM', 'M0502', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502ALU', 'M0502', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502HM', 'M0502', 'HM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502KC', 'M0502', 'KC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502MTC', 'M0502', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502KEU', 'M0502', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0502MKT', 'M0502', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503HM', 'M0503', 'HM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503KC', 'M0503', 'KC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503MTC', 'M0503', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503ALU', 'M0503', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04ALU', 'M04', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401ALU', 'M0401', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402ALU', 'M0402', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402MKT', 'M0402', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402MTC', 'M0402', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301MKT', 'M0301', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301HM', 'M0301', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301KC', 'M0301', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M03KEU', 'M03', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201HM', 'M0201', 'HM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201MKT', 'M0201', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201KC', 'M0201', 'KC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02MTC', 'M02', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02HM', 'M02', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02MKT', 'M02', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0301KEU', 'M0301', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0302KEU', 'M0302', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204HM', 'M0204', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204KC', 'M0204', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101HM', 'M0101', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101KC', 'M0101', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0503MKT', 'M0503', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202HM', 'M0202', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202KC', 'M0202', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202MKT', 'M0202', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204MKT', 'M0204', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M01KEU', 'M01', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0103KEU', 'M0103', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104KEU', 'M0104', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0104MTC', 'M0104', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0102KEU', 'M0102', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04HM', 'M04', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04KC', 'M04', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M04MKT', 'M04', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0402ADM', 'M0402', 'ADM', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401HM', 'M0401', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401KC', 'M0401', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401KEU', 'M0401', 'KEU', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0401MKT', 'M0401', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M02ALU', 'M02', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0201ALU', 'M0201', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0202ALU', 'M0202', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203ALU', 'M0203', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0204ALU', 'M0204', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0205ALU', 'M0205', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206ALU', 'M0206', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206ADM', 'M0206', 'ADM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206MKT', 'M0206', 'MKT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206KEU', 'M0206', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206MTC', 'M0206', 'MTC', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206KC', 'M0206', 'KC', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0206HM', 'M0206', 'HM', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101ALU', 'M0101', 'ALU', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0203MKT', 'M0203', 'MKT', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_role_menu VALUES ('M0101KEU', 'M0101', 'KEU', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3821 (class 0 OID 38248)
-- Dependencies: 271
-- Data for Name: kode_satuan; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_satuan VALUES ('U', 'UNIT', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_satuan VALUES ('B', 'BUAH', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_satuan VALUES ('P', 'PAKET', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3822 (class 0 OID 38252)
-- Dependencies: 272
-- Data for Name: kode_status_nikah; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_status_nikah VALUES ('K', 'kawin', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_status_nikah VALUES ('BK', 'Belum kawin', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_status_nikah VALUES ('CH', 'Cerai Hidup', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_status_nikah VALUES ('CM', 'Cerai Mati', true, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3823 (class 0 OID 38256)
-- Dependencies: 273
-- Data for Name: kode_status_pekerjaan; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_status_pekerjaan VALUES ('PU', 'PEMBANTU UMUM', false, '2020-09-09 09:39:38.948364', NULL, '2020-09-08 23:14:21.063417', NULL, '2020-09-08 23:14:47.328192', NULL);
INSERT INTO kode_status_pekerjaan VALUES ('PKL', 'PEDAGANG KAKI LIMA', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', '2020-09-15 14:16:51.579067', NULL);
INSERT INTO kode_status_pekerjaan VALUES ('PT', 'PEGAWAI TETAP', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', '2020-11-10 00:27:21.371657', NULL);
INSERT INTO kode_status_pekerjaan VALUES ('SWA', 'PEKERJA SWASTA', true, NULL, NULL, '2021-01-12 15:58:15.366476', 'ATB', NULL, NULL);
INSERT INTO kode_status_pekerjaan VALUES ('O', 'LAINNYA', true, NULL, NULL, '2021-01-12 15:58:15.366476', 'ATB', NULL, NULL);


--
-- TOC entry 3824 (class 0 OID 38260)
-- Dependencies: 274
-- Data for Name: kode_tipe_kontrak_berakhir; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_tipe_kontrak_berakhir VALUES ('N', 'BARAKHIR KONTRAK', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_tipe_kontrak_berakhir VALUES ('B', 'BERHENTI TENGAH KONTRAK', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_tipe_kontrak_berakhir VALUES ('M', 'BERHENTI KARENA MASALAH KONTRAK', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO kode_tipe_kontrak_berakhir VALUES ('O', 'LAINNYA', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3825 (class 0 OID 38264)
-- Dependencies: 275
-- Data for Name: kode_tipe_out; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_tipe_out VALUES ('G', 'GANTI PENGHUNI', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_tipe_out VALUES ('M', 'BERMASALAH', true, NULL, NULL, '2020-08-24 08:47:44.841988', 'SYSTEM', NULL, NULL);
INSERT INTO kode_tipe_out VALUES ('OT', 'BERHENTI SEWA', true, NULL, NULL, '2020-11-17 10:30:54.732485', NULL, NULL, NULL);


--
-- TOC entry 3826 (class 0 OID 38268)
-- Dependencies: 276
-- Data for Name: kode_unit_jenis; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_unit_jenis VALUES ('K', 'KAMAR', true, NULL, NULL, NULL, NULL, NULL, NULL, true, NULL);
INSERT INTO kode_unit_jenis VALUES ('BA', 'BUSINESS AREA', true, NULL, NULL, NULL, NULL, NULL, NULL, true, NULL);


--
-- TOC entry 3827 (class 0 OID 38273)
-- Dependencies: 277
-- Data for Name: kode_wo_prioritas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_wo_prioritas VALUES ('N', 'NORMAL', NULL, true, NULL, NULL, '2020-09-16 16:38:55.771917', 'SYS', NULL, NULL);
INSERT INTO kode_wo_prioritas VALUES ('U', 'URGENT', NULL, true, NULL, NULL, '2020-09-16 16:38:55.771917', 'SYS', NULL, NULL);
INSERT INTO kode_wo_prioritas VALUES ('H', 'HIGH', NULL, true, NULL, NULL, '2020-09-16 16:38:55.771917', 'SYS', NULL, NULL);
INSERT INTO kode_wo_prioritas VALUES ('L', 'LOW', NULL, true, NULL, NULL, '2020-09-16 16:38:55.771917', 'SYS', NULL, NULL);


--
-- TOC entry 3828 (class 0 OID 38280)
-- Dependencies: 278
-- Data for Name: kode_wo_tipe; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO kode_wo_tipe VALUES ('I', 'INSPECTION', 'An inspection work order requires a maintenance technician to audit or inspect an asset ', true, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, false);
INSERT INTO kode_wo_tipe VALUES ('E', 'EMERGENCY', 'An emergency work order is generated when an unscheduled breakdown occurs and an asset needs to be repaired right away. ', true, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, false);
INSERT INTO kode_wo_tipe VALUES ('EL', 'MASALAH LISTRIK', '', false, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, false);
INSERT INTO kode_wo_tipe VALUES ('AIR', 'MASALAH AIR', '', false, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, false);
INSERT INTO kode_wo_tipe VALUES ('MTR', 'PENCATATAN LISTRIK & AIR', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO kode_wo_tipe VALUES ('IC', 'CHECKOUT INSPECTION', 'Inspection couse by Checkout', true, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, true);
INSERT INTO kode_wo_tipe VALUES ('O', 'LAINNYA', '', true, NULL, NULL, '2020-09-16 16:35:26.353251', 'SYSY', NULL, NULL, false);


--
-- TOC entry 3829 (class 0 OID 38413)
-- Dependencies: 304
-- Data for Name: master_kapnonkap; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO master_kapnonkap VALUES (1, '2019-01-01', 4999999, 'Y', '2020-02-09', 'SYSTEM', NULL, NULL);
SELECT pg_catalog.setval('master_kapnonkap_id_kapnonkap_seq', 1, true);

