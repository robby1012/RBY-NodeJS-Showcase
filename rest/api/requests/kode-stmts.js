module.exports = {
  getKodeJenisKelamin: `select kode_jenis_kelamin, nama_jenis_kelamin from kode_jenis_kelamin where aktif`,
  // getKodeUnitJenis: `select kode_unit_jenis, nama_unit_jenis from kode_unit_jenis where aktif`,
  getKodeNikJenis: `select kode_jenis_nik, nama_jenis_nik from kode_jenis_nik where aktif`,
  getKodeTipeOut: `select kode_tipe_out, deskripsi_tipe_out from kode_tipe_out where aktif`,
  getKodeAgama: `select kode_agama, nama_agama from kode_agama where aktif`,
  getKodeJenisKendaraan: `select kode_jenis_kendaraan, nama_jenis_kendaraan from kode_jenis_kendaraan where aktif`,
  getKodeStatusPekerjaan: `select kode_status_pekerjaan, nama_status_pekerjaan from kode_status_pekerjaan where aktif`,
  getKodeInvoiceGolongan: `select kode_invoice_golongan, deskripsi_invoice_golongan from kode_invoice_golongan where aktif`,
  getKodePembayaranMethod: `select kode_pembayaran_method, nama_pembayaran_method from kode_pembayaran_method where aktif`,
  getKodeFasilitas: `select kode_fasilitas, nama_fasilitas from fasilitas where aktif`,
  getKodeStatusNikah: `select kode_status_nikah, nama_status_nikah from kode_status_nikah where aktif`,
  getKodeBerhentiKontrak: `select kode_tipe_kontrak_berakhir, nama_tipe_kontrak_berakhir from kode_tipe_kontrak_berakhir where aktif`,
  getKodeAsetKategori: {
    text: `select 
      kode_kategori,kode_sub_kelompok,kode_kategori||'#'||kode_sub_kelompok as kode_sub_kategori,nama_kategori,kode_kelompok,kode_title_kategori,nama_title_kategori,aset_kapitalisasi,aktif ,
      aktif
      from kode_aset_kategori 
    where aktif=$3::boolean
    and (kode_kelompok=$1::text  or $1::text='')
    and (kode_kategori=$2::text or $2::text='')`,
    params: [
      { name: 'p_kode_kelompok', default: '' },
      { name: 'p_kode_kategori', default: '' },
      { name: 'p_aktif', default: true }
    ]
  },
  getKodeAsetKelompok: {
    text: `select kode_kelompok,nama_kelompok, aktif from kode_aset_kelompok 
    where aktif=$3::boolean
    and (kode_kelompok=$1::text  or $1::text='')
    and (nama_kelompok ilike '%' || $2::text || '%' or $2::text='')`,
    params: [
      { name: 'p_kode_kelompok', default: '' },
      { name: 'p_nama_kelompok', default: '' },
      { name: 'p_aktif', default: true }
    ]
  },
  getKodeAsetKondisi: {
    text: `select kode_kondisi,nama_kondisi from kode_aset_kondisi where aktif=true
    and (kode_kondisi=$1::text  or $1::text='')
    and (nama_kondisi ilike '%' || $2::text || '%' or $2::text='')	`,
    params: [
      { name: 'p_kode_kondisi', default: '' },
      { name: 'p_nama_kondisi', default: '' }
    ]
  },
  getKodeSatuan: `select kode_satuan,nama_satuan from kode_satuan where aktif=true`,
  getKodeJenisPerolehan: `select kode_jenis_perolehan,deskripsi from kode_jenis_perolehan where aktif=true`,
  getKodeKantor: {
    text: `WITH RECURSIVE cte AS (
      SELECT kode_kantor, nama_kantor,kode_kantor_induk, 1 AS level
      FROM   kode_kantor
      WHERE  kode_kantor = $1::text
      UNION  ALL
      SELECT t.kode_kantor, t.nama_kantor,t.kode_kantor_induk, c.level + 1
      FROM   cte      c
      JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
      )
    SELECT kode_kantor,nama_kantor
    FROM   cte`,
    params: [{ name: 'p_kode_kantor', default: 'KPS' }]
  },
  getKodeUnitJenis: {
    text: `select kode_unit_jenis,nama_unit_jenis,aktif,disewakan,st_unit
    from kode_unit_jenis
    where  aktif=$3::boolean
    and  (kode_unit_jenis=$1::text or $1::text='')
    and nama_unit_jenis ilike '%' || $2::text || '%'
    order by st_unit asc,kode_unit_jenis desc`,
    params: [
      { name: 'p_kode_unit_jenis', default: '' },
      { name: 'p_nama_unit_jenis', default: '' },
      { name: 'p_aktif', default: 'true' }
    ]
  },
  getKodeUnit: {
    text: `select *
		from 
			rusun_unit unit 
			inner join rusun_lantai lantai on lantai.id_lantai=unit.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where  unit.aktif
			and lantai.kode_rusun=$1::text
			and ($2::int=0 or lantai.id_lantai=$2::int)
			and ($3::text='' or blok.kode_blok=$3::text)
    order by unit.id_lantai,unit.id_unit`,
    params: [
      'p_rusun',
      { name: 'p_lantai', default: '' },
      { name: 'p_blok', default: '' }
    ]
  },
  postSimpanKelompok: {
    text: `select f_aset_kelompok_save($1::text,$2::text,$3::text,$4::boolean) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kelompok',
      'p_nama_kelompok',
      'p_ada_amortisasi'
    ]
  },
  putUpdateKelompok: {
    text: `select f_aset_kelompok_update($1::text,$2::text,$3::text,$4::boolean,$5::boolean) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kelompok',
      'p_nama_kelompok',
      'p_ada_amortisasi',
      'p_aktif'
    ]
  },
  getMasaAmortisasiAset: {
    text: `select masa_manfaat_bln,nilai_residu,aktif,tgl_efektif
    from kode_aset_penyusutan
    where (kode_kategori=$1::text or $1::text='')
    AND (kode_sub_kelompok=$2::text or $2::text='')
    AND aktif=$3::boolean`,
    params: [
      { name: 'p_kode_kategori', default: '' },
      { name: 'p_kode_sub_kelompok', default: '' },
      { name: 'p_aktif', default: 'true' }
    ]
  },
  postSimpanKategori: {
    text: `select f_aset_kategori_save($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::boolean) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kelompok',
      'p_kode_title_kategori',
      'p_nama_title_kategori',
      'p_kode_kategori',
      'p_kode_sub_kelompok',
      'p_nama_kategori',
      'p_aset_kapitalisasi'
    ]
  },
  putUpdateKategori: {
    text: `select f_aset_kategori_update($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::boolean,$8::boolean) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kategori',
      'p_kode_sub_kelompok',
      'p_kode_title_kategori',
      'p_nama_title_kategori',
      'p_nama_kategori',
      'p_aset_kapitalisasi',
      'p_aktif'
    ]
  },
  getKodeKomplainKategori: `select * from kode_kategori_komplain where aktif`,
  getKodeMtncWoTipe: {
    text: `select * from kode_wo_tipe 
			where aktif
				and (
					$1::text<>'K' 
					or 
					($1::text='K' and kode_wo_tipe not in ('EL','AIR'))
				)`,
    params: [{ name: 'p_komplain', default: '' }]
  },
  getKodeMtncWoPrioritas: {
    text: `select * from kode_wo_prioritas 
			where aktif`,
    params: []
  },
  getListSetupPenyusutan: {
    text: `select a.id_kode_aset_penyusutan,a.kode_kategori,a.kode_sub_kelompok,a.tgl_efektif,a.masa_manfaat_bln,a.aktif,a.nilai_residu,b.nama_kategori 
    from kode_aset_penyusutan a,kode_aset_kategori b
    where a.kode_kategori=b.kode_kategori
    AND a.kode_sub_kelompok=b.kode_sub_kelompok
    and (a.kode_kategori=$1::text or $1::text='')
    and (a.kode_sub_kelompok=$2::text or $2::text='')`,
    params: [
      { name: 'p_kode_kategori', default: '' },
      { name: 'p_kode_sub_kelompok', default: '' }
    ]
  },
  getDetilSetupPenyusutan: {
    text: `select a.id_kode_aset_penyusutan,a.kode_kategori,a.kode_sub_kelompok,a.tgl_efektif,a.masa_manfaat_bln,a.aktif,a.nilai_residu,b.nama_kategori 
    from kode_aset_penyusutan a,kode_aset_kategori b
    where a.kode_kategori=b.kode_kategori
    and a.kode_sub_kelompok=b.kode_sub_kelompok
    and (a.id_kode_aset_penyusutan=$1::integer or $1::text='')`,
    params: [{ name: 'p_id_kode_aset_penyusutan', default: '' }]
  },
  postSimpanKodeAsetPenyusutan: {
    text: `select f_kode_aset_penyusutan_save($1::text,$2::text,$3::text,$4::date,$5::integer,$6::integer) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kategori',
      'p_kode_sub_kelompok',
      'p_tgl_efektif',
      'p_masa_manfaat_bln',
      'p_nilai_residu'
    ]
  },
  getKodeMenu: {
    text: `select f_menu_get_json($1::text) as ret`,
    params: [{ name: 'p_pengguna', default: '' }]
  }
}
