module.exports = {
  getDaftarAset: {
    text: `select a.kode_aset,a.kode_kantor,a.kode_aset_kategori,
      a.nama_aset,b.nama_kantor,c.nama_kategori,a.tgl_perolehan,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
      x.id_aset_penempatan,y.kode_rusun,y.nama_rusun
      from aset a 
      left join aset_penempatan x on a.kode_aset=x.kode_aset and x.penempatan_terakhir=true
      left join rusun y on x.kode_rusun=y.kode_rusun , kode_kantor b, kode_aset_kategori c
      where a.kode_kantor=b.kode_kantor
      and a.kode_aset_kategori=c.kode_kategori
      and a.kode_sub_kelompok=c.kode_sub_kelompok
      and a.aktif=true
      and (c.kode_kategori=$1::text or $1::text='')
      and (CASE WHEN (SELECT COUNT(1) FROM aset_penempatan where kode_aset=a.kode_aset and penempatan_terakhir=true)>0
      THEN y.kode_rusun=$2::text or $2::text='' ELSE
		  a.kode_rusun=$2::text or $2::text='' END)
      AND (a.nama_aset ilike '%' || $3::text || '%' or b.nama_kantor ilike '%' || $3::text || '%' or c.nama_kategori ilike '%' || $3::text || '%')
      AND a.kode_rusun in (select kode_rusun from rusun where kode_kantor in (WITH RECURSIVE cte AS (
        SELECT kode_kantor, nama_kantor,kode_kantor_induk, 1 AS level
        FROM   kode_kantor
        WHERE  kode_kantor = $4::text
        UNION  ALL
        SELECT t.kode_kantor, t.nama_kantor,t.kode_kantor_induk, c.level + 1
        FROM   cte      c
        JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
        )
      SELECT kode_kantor
																													 
													
				  
															 
																														 
																						   
													 
						
												   
		   
      FROM   cte))`,
		   
																																				   
	   
		   
				   
		  
																
		  
																	
	   
																																					
    params: [
      { name: 'p_kode_kategori', default: '' },
      { name: 'p_kode_rusun', default: '' },
      { name: 'p_keyword', default: '' },
      { name: 'p_kode_kantor', default: 'KPS' }
    ]
  },
  getDetailAset: {
    text: `select a.kode_aset,a.kode_kantor,a.kode_rusun,a.kode_aset_rusun,a.kode_aset_kategori,a.kode_sub_kelompok,
        a.nama_aset,b.nama_kantor,c.nama_kategori,c.kode_kelompok,d.nama_kelompok,a.tgl_perolehan,
        a.nilai_perolehan,a.masa_manfaat_bln,a.nilai_residu,a.kode_jenis_perolehan, f.deskripsi as deskripsi_perolehan,
        a.keterangan,a.kode_satuan,e.nama_satuan,k.kondisi_aset,g.nama_kondisi,a.aset_merk,a.aset_type,
        x.id_aset_penempatan,y.nama_rusun,a.as_inventaris_unit,a.inventaris_alias_name,a.biaya_kerusakan,a.biaya_kehilangan,
        a.tanah_status,a.tanah_sertifikat_no,a.tanah_sertifikat_berlaku,a.tanah_sertifikat_berakhir,a.tanah_sertifikat_berlaku_bln,
        a.tanah_luasan,a.tanah_luas_m2,a.bgn_imb_no,a.bgn_imb_tgl,a.bgn_imb_instansi,a.alamat_aset,a.keterangan,a.no_rangka,a.no_mesin,a.no_polisi,
        a.tgl_pembuatan,a.lampiran_file,a.lampiran_deskripsi
        from aset a 
        left join aset_penempatan x on a.kode_aset=x.kode_aset and x.penempatan_terakhir=true
		left join aset_kondisi k on a.kode_aset=k.kode_aset and k.kondisi_terakhir=true
        left join rusun y on x.kode_rusun=y.kode_rusun , kode_kantor b, kode_aset_kategori c,kode_satuan e, kode_aset_kelompok d,
        kode_jenis_perolehan f,kode_aset_kondisi g
        where a.kode_kantor=b.kode_kantor
        and a.kode_aset_kategori=c.kode_kategori
        and a.kode_sub_kelompok=c.kode_sub_kelompok
        and a.kode_satuan=e.kode_satuan
        and c.kode_kelompok=d.kode_kelompok
        and a.kode_jenis_perolehan=f.kode_jenis_perolehan
        and k.kondisi_aset=g.kode_kondisi
        and (a.kode_aset=$1::text or $1::text='')`,
    params: [{ name: 'p_kode_aset', default: '' }]
  },
  postSimpanAset: {
    text: `select f_pencatatan_aset_save($1::text,$2::json) as ret`,
    params: [
      'p_kode_pengguna',
      {
        name: 'p_data_aset',
        type: 'json',
        data: [
          'kode_kantor',
          'kode_rusun',
          'kode_aset_rusun',
          'kode_aset_kategori',
          'nama_aset',
          { name: 'kode_satuan', default: '1' },
          { name: 'kode_jenis_perolehan', default: '1' },
          'tgl_perolehan',
          'nilai_perolehan',
          'masa_manfaat_bln',
          'aset_type',
          'aset_merk',
          { name: 'kondisi_aset', default: 'B' },
          { name: 'kondisi_aset_ref', default: '' },
          { name: 'as_inventaris_unit', default: null },
          { name: 'inventaris_alias_name', default: null },
          { name: 'biaya_kerusakan', default: null },
          { name: 'biaya_kehilangan', default: null },
          { name: 'tanah_status', default: null },
          { name: 'tanah_sertifikat_no', default: null },
          { name: 'tanah_sertifikat_berlaku', default: null },
          { name: 'tanah_sertifikat_berakhir', default: null },
          { name: 'tanah_luasan', default: null },
          { name: 'tanah_luas_m2', default: null },
          { name: 'bgn_imb_no', default: null },
          { name: 'bgn_imb_tgl', default: null },
          { name: 'bgn_imb_instansi', default: null },
          { name: 'keterangan', default: null },
          { name: 'lampiran_file', default: null },
          { name: 'lampiran_deskripsi', default: null },
          { name: 'kode_sub_kelompok', default: null },
          { name: 'alamat_aset', default: null },
          { name: 'no_rangka', default: null },
          { name: 'no_mesin', default: null },
          { name: 'no_polisi', default: null },
          { name: 'tgl_pembuatan', default: null }
        ]
      }
    ]
  },
  putUpdateAset: {
    text: `select f_pencatatan_aset_update($1::text,$2::text,$3::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_aset',
      {
        name: 'p_data_aset',
        type: 'json',
        data: [
          'nama_aset',
          { name: 'kode_satuan', default: '1' },
          { name: 'kode_jenis_perolehan', default: '1' },
          'aset_type',
          'aset_merk',
          { name: 'kondisi_aset', default: 'B' },
          { name: 'kondisi_aset_ref', default: '' },
          { name: 'as_inventaris_unit', default: null },
          { name: 'inventaris_alias_name', default: null },
          { name: 'biaya_kerusakan', default: null },
          { name: 'biaya_kehilangan', default: null },
          { name: 'tanah_status', default: null },
          { name: 'tanah_sertifikat_no', default: null },
          { name: 'tanah_sertifikat_berlaku', default: null },
          { name: 'tanah_sertifikat_berakhir', default: null },
          { name: 'tanah_luasan', default: null },
          { name: 'tanah_luas_m2', default: null },
          { name: 'bgn_imb_no', default: null },
          { name: 'bgn_imb_tgl', default: null },
          { name: 'bgn_imb_instansi', default: null },
          { name: 'keterangan', default: null },
          { name: 'alamat_aset', default: null },
          { name: 'no_rangka', default: null },
          { name: 'no_mesin', default: null },
          { name: 'no_polisi', default: null },
          { name: 'tgl_pembuatan', default: null },
          { name: 'lampiran_file', default: null },
          { name: 'lampiran_deskripsi', default: null }
        ]
      }
    ]
  },
  putHapusAset: {
    text: `select f_pencatatan_aset_hapus($1::text,$2::text,$3::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode_aset', 'p_keterangan']
  },
  getDaftarPenempatanAset: {
    text: `select  a.id_aset_penempatan,a.kode_aset,a.tgl_penempatan,a.kode_rusun,b.nama_rusun,a.kode_lokasi,d.nama_unit_jenis,a.lokasi_unit,
          (case when a.kode_lokasi in (select kode_unit_jenis from kode_unit_jenis where st_unit=true) then
           (select nama_unit from rusun_unit where id_unit=a.lokasi_unit)
           else
           a.lokasi_non_unit
          end) as lokasi,a.keterangan,a.penempatan_terakhir
          from aset_penempatan a, rusun b, kode_unit_jenis d
          where 
          (a.kode_aset=$1::text or $1::text='')
          and a.kode_rusun=b.kode_rusun
          AND a.kode_lokasi=d.kode_unit_jenis order by id_aset_penempatan desc`,
    params: [{ name: 'p_kode_aset', default: '' }]
  },
  postSimpanPenempatanAset: {
    text: `select f_penempatan_aset_save($1::text,$2::text,$3::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_aset',
      {
        name: 'p_data_penempatan',
        type: 'json',
        data: [
          'tgl_penempatan',
          'kode_rusun',
          'kode_unit_jenis',
          'kode_unit',
          { name: 'lokasi_non_unit', default: '' },
          { name: 'keterangan', default: '' }
        ]
      }
    ]
  },
  getDaftarKondisiAset: {
    text: `select 
    id_aset_kondisi,kode_aset,tgl_kondisi,kondisi_aset,kondisi_aset_ref,keterangan, kak.nama_kondisi 
from aset_kondisi ak
left outer join kode_aset_kondisi kak on  kak.kode_kondisi =ak.kondisi_aset 
    where kode_aset=$1::text
    order by id_aset_kondisi asc`,
    params: [{ name: 'p_kode_aset', default: '' }]
  },
  postSimpanKondisiAset: {
    text: `select f_aset_kondisi_save($1::text,$2::text,$3::date,$4::text,$5::text,$6::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_aset',
      'p_tgl_kondisi',
      { name: 'p_kondisi_aset', default: 'B' },
      { name: 'p_kondisi_aset_ref', default: '' },
      { name: 'p_keterangan', default: '' }
    ]
  },
  getPenyusutanAset: {
    text: `select a.kode_aset,b.nama_aset,b.aset_merk,b.aset_type,bulan_ke,a.kode_kantor,blth_penyusutan::date,nilai_penyusutan,nilai_buku 
    from aset_amortisasi_proyeksi a, aset b 
    where
    (a.kode_aset=$1::text or $1::text='')
    and a.kode_aset=b.kode_aset
    order by bulan_ke asc`,
    params: [{ name: 'p_kode_aset', default: '' }]
  },
  postAsetLampiran: {
    text: `select f_aset_lampiran_save($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_pengguna', 'p_kode_aset', 'p_ket_dokumen', 'p_path']
  },
  getListInventarisasi: {
    text: `select a.id_inventarisasi, a.kode_kantor, a.kode_rusun, a.tgl_inventarisasi,a.tahun_inventarisasi,
    a.no_sprin,a.tgl_sprin,a.keterangan,b.nama_rusun
    from aset_inventarisasi a,rusun b
    where 
    (a.kode_rusun=$1::text or $1::text='' )
    and (a.tahun_inventarisasi=$2::text or $2::text='')
    and a.kode_rusun=b.kode_rusun
    order by id_inventarisasi desc`,
    params: [
      { name: 'p_kode_rusun', default: '' },
      { name: 'p_tahun', default: '' }
    ]
  },
  getEntryInventarisasi: {
    text: `select a.kode_aset,a.kode_lokasi,b.nama_aset,b.aset_type,b.aset_merk,a.lokasi_unit,c.nama_unit,a.lokasi_non_unit,
    d.kondisi_aset,e.nama_kondisi
    from aset_penempatan a 
      left join rusun_unit c on a.lokasi_unit=c.id_unit,
      aset b, aset_kondisi d,kode_aset_kondisi e
    WHERE  (a.kode_rusun=$1::text or $1::text='' )
    and a.kode_aset=b.kode_aset
    and a.penempatan_terakhir=true
    and a.kode_aset=d.kode_aset
    and d.kondisi_terakhir=true
    and d.kondisi_aset=e.kode_kondisi
    order by kode_aset asc`,
    params: [{ name: 'p_kode_rusun', default: '' }]
  },
  getDetilInventarisasi: {
    text: `select a.id_inventarisasi,a.kode_kantor,a.kode_rusun,b.nama_rusun,a.tgl_inventarisasi,a.tahun_inventarisasi,
    a.no_sprin,a.tgl_sprin,a.keterangan
    from aset_inventarisasi a, rusun b
    where (a.id_inventarisasi=$1::text or $1::text='')
    and a.kode_rusun=b.kode_rusun`,
    params: [{ name: 'p_id_invent', default: '' }]
  },
  getInventarisasiAktif: {
    text: `select count(1) as sudah_ada
    from aset_inventarisasi 
    where (kode_rusun=$1::text or $1::text='')
    and (tahun_inventarisasi=$2::text or $2::text='')
    and st_batal=false`,
    params: [
      { name: 'p_kode_rusun', default: '' },
      { name: 'p_tahun', default: '' }
    ]
  },
  getListDetilInventarisasi: {
    text: `select a.id_inventarisasi_dtl,a.id_inventarisasi,a.kode_aset,b.nama_aset,a.kondisi_barang,e.nama_kondisi,c.lokasi_unit,c.lokasi_non_unit,
    r.nama_unit,d.kondisi_aset,e.nama_kondisi
    from aset_inventarisasi_detil a, aset b,aset_penempatan c 
      left join rusun_unit r on c.lokasi_unit=r.id_unit,
      aset_kondisi d,kode_aset_kondisi e
    where (a.id_inventarisasi=$1::text or $1::text='')
    and a.kode_aset=b.kode_aset
    and a.kode_aset=c.kode_aset
    and c.penempatan_terakhir=true
    and a.kode_aset=d.kode_aset
    and d.kondisi_terakhir=true
    and d.kondisi_aset=e.kode_kondisi
    order by a.kondisi_barang desc`,
    params: [{ name: 'p_id_invent', default: '' }]
  },
  postSimpanInventarisasi: {
    text: `select f_inventarisasi_save($1::text,$2::text,$3::text,$4::date,$5::text,$6::date,$7::text,$8::text,$9::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_kantor',
      'p_kode_rusun',
      'p_tgl_sprin',
      'p_no_sprin',
      'p_tgl_invent',
      'p_thn_invent',
      'p_keterangan',
      {
        name: 'p_data_aset',
        type: 'array-json',
        data: ['kode_aset', 'kondisi_barang']
      }
    ]
  },
  getListInventarisRusun: {
    text: `select 
    aset.kode_aset,aset.nama_aset, satuan.nama_satuan,aset.biaya_kerusakan,aset.biaya_kehilangan,
    unit.id_unit, unit.nama_unit, 
    (
      select kode_blok from rusun_unit runit
      left join rusun_lantai rl
      on rl.id_lantai = runit.id_lantai
      left join rusun_blok blok
      on blok.id_rusun_blok = rl.id_rusun_blok
      where runit.id_unit = penempatan.lokasi_unit
    )kode_blok,
    kondisi.kondisi_aset, kode_kondisi.nama_kondisi,
    satuan.nama_satuan
  from 
    aset
    inner join kode_satuan satuan on satuan.kode_satuan=aset.kode_satuan
    inner join aset_penempatan penempatan on aset.kode_aset=penempatan.kode_aset and penempatan_terakhir
    inner join rusun_unit unit on unit.id_unit=penempatan.lokasi_unit
    left outer join aset_kondisi kondisi on kondisi.kode_aset=aset.kode_aset and kondisi_terakhir
    left outer join kode_aset_kondisi kode_kondisi on kode_kondisi.kode_kondisi=kondisi.kondisi_aset and aset.aktif and as_inventaris_unit
  where 
    aset.aktif 
    and penempatan.lokasi_unit=$1::int
  order by penempatan.lokasi_unit`,
    params: ['p_id_unit']
  },
  getListTanahGuna: {
    text: `select $2::date as periode_cetak,h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat, 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4, a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
    e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan,a.nilai_perolehan,a.tanah_sertifikat_no,a.alamat_aset,a.tanah_status,a.tanah_sertifikat_berlaku,
    a.tanah_sertifikat_berakhir,a.tanah_luas_m2,a.tanah_luasan,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
    from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
    left join rusun_unit u on u.id_unit=p.lokasi_unit,
    aset_kondisi b,
    kode_aset_kategori c,
    kode_aset_kelompok d,
    kode_satuan e,
    kode_jenis_perolehan f,
    kode_aset_kondisi g, 
    rusun  h
    where a.kode_rusun=$1::text
    and a.kode_rusun=h.kode_rusun
    and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
    and a.kode_aset=b.kode_aset
    and b.kondisi_terakhir=true
    and a.kode_aset_kategori=c.kode_kategori
    and a.kode_sub_kelompok=c.kode_sub_kelompok
    and c.kode_kelompok=d.kode_kelompok
    and a.kode_satuan=e.kode_satuan
    and a.kode_jenis_perolehan=f.kode_jenis_perolehan
    and b.kondisi_aset=g.kode_kondisi
    and d.kode_kelompok='T'
    ORDER BY a.kode_aset asc`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListBangunanGuna: {
    text: `select $2::date as periode_cetak,AA.*,(AA.sd_thn_lalu+aa.thn_ini) as sd_tahun_ini,
    (COALESCE(AA.nilai_perolehan,0)-COALESCE(AA.nilai_residu,0)-COALESCE(AA.akum_sd_thn_lalu)) as nilai_yg_disusutkan,
    (COALESCE(AA.umur_manfaat,0)-COALESCE(AA.sd_thn_lalu,0)) as sisa_utk_thn_ini,
    (COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as peny_sd_bln_ini,
    (COALESCE(AA.akum_sd_thn_lalu,0)+COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as akum_peny_sd_bln_ini
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,a.alamat_aset,
   (select count(1) as sd_thn_lalu
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as sd_thn_lalu,
   (select count(1) as thn_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<=date_trunc('month',$2::date)) as thn_ini, /*parameter tgl report*/
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as akum_sd_thn_lalu,
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<date_trunc('month',$2::date)) as peny_sd_bln_lalu,
   (select coalesce(nilai_penyusutan,0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date))  as peny_bln_ini,
   (select coalesce(nilai_buku,0) as nilai_buku_bln_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date)) as nilai_buku_bln_ini,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi, u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok='G'
   ORDER BY a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListKendaraanGuna: {
    text: `select $2::date as periode_cetak,AA.*,(AA.sd_thn_lalu+aa.thn_ini) as sd_tahun_ini,
    (COALESCE(AA.nilai_perolehan,0)-COALESCE(AA.nilai_residu,0)-COALESCE(AA.akum_sd_thn_lalu)) as nilai_yg_disusutkan,
    (COALESCE(AA.umur_manfaat,0)-COALESCE(AA.sd_thn_lalu,0)) as sisa_utk_thn_ini,
    (COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as peny_sd_bln_ini,
    (COALESCE(AA.akum_sd_thn_lalu,0)+COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as akum_peny_sd_bln_ini
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,a.kode_aset_kategori as kode_kategori,
		(CASE WHEN a.kode_aset_kategori='M02' THEN 'Roda 2' ELSE 'Roda 4 atau lebih' END) as kelompok_kendaraan,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
    a.aset_merk,a.aset_type,a.no_rangka,a.no_mesin,a.no_polisi,a.tgl_pembuatan,	 
   e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   (select count(1) as sd_thn_lalu
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as sd_thn_lalu,
   (select count(1) as thn_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<=date_trunc('month',$2::date)) as thn_ini, /*parameter tgl report*/
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as akum_sd_thn_lalu,
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<date_trunc('month',$2::date)) as peny_sd_bln_lalu,
   (select coalesce(nilai_penyusutan,0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date))  as peny_bln_ini,
   (select coalesce(nilai_buku,0) as nilai_buku_bln_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date)) as nilai_buku_bln_ini,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok='M'
   ORDER BY a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  putInventarisasiBatal: {
    text: `select f_inventarisasi_batal($1::text,$2::int) as ret`,
    params: ['p_kode_pengguna', 'p_id_invent']
  },
  getListPKantorGuna: {
    text: `select $2::date as periode_cetak,AA.*,(AA.sd_thn_lalu+aa.thn_ini) as sd_tahun_ini,
    (COALESCE(AA.nilai_perolehan,0)-COALESCE(AA.nilai_residu,0)-COALESCE(AA.akum_sd_thn_lalu)) as nilai_yg_disusutkan,
    (COALESCE(AA.umur_manfaat,0)-COALESCE(AA.sd_thn_lalu,0)) as sisa_utk_thn_ini,
    (COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as peny_sd_bln_ini,
    (COALESCE(AA.akum_sd_thn_lalu,0)+COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as akum_peny_sd_bln_ini
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   (select count(1) as sd_thn_lalu
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as sd_thn_lalu,
   (select count(1) as thn_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<=date_trunc('month',$2::date)) as thn_ini, /*parameter tgl report*/
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as akum_sd_thn_lalu,
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<date_trunc('month',$2::date)) as peny_sd_bln_lalu,
   (select coalesce(nilai_penyusutan,0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date))  as peny_bln_ini,
   (select coalesce(nilai_buku,0) as nilai_buku_bln_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date)) as nilai_buku_bln_ini,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok in ('H','B','A')
   and c.aset_kapitalisasi=true	 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListPKomputerGuna: {
    text: `select $2::date as periode_cetak,AA.*,(AA.sd_thn_lalu+aa.thn_ini) as sd_tahun_ini,
    (COALESCE(AA.nilai_perolehan,0)-COALESCE(AA.nilai_residu,0)-COALESCE(AA.akum_sd_thn_lalu)) as nilai_yg_disusutkan,
    (COALESCE(AA.umur_manfaat,0)-COALESCE(AA.sd_thn_lalu,0)) as sisa_utk_thn_ini,
    (COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as peny_sd_bln_ini,
    (COALESCE(AA.akum_sd_thn_lalu,0)+COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as akum_peny_sd_bln_ini
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   (select count(1) as sd_thn_lalu
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as sd_thn_lalu,
   (select count(1) as thn_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<=date_trunc('month',$2::date)) as thn_ini, /*parameter tgl report*/
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as akum_sd_thn_lalu,
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<date_trunc('month',$2::date)) as peny_sd_bln_lalu,
   (select coalesce(nilai_penyusutan,0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date))  as peny_bln_ini,
   (select coalesce(nilai_buku,0) as nilai_buku_bln_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date)) as nilai_buku_bln_ini,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok in ('I','C')
   and c.aset_kapitalisasi=true	 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListPLainGuna: {
    text: `select $2::date as periode_cetak,AA.*,(AA.sd_thn_lalu+aa.thn_ini) as sd_tahun_ini,
    (COALESCE(AA.nilai_perolehan,0)-COALESCE(AA.nilai_residu,0)-COALESCE(AA.akum_sd_thn_lalu)) as nilai_yg_disusutkan,
    (COALESCE(AA.umur_manfaat,0)-COALESCE(AA.sd_thn_lalu,0)) as sisa_utk_thn_ini,
    (COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as peny_sd_bln_ini,
    (COALESCE(AA.akum_sd_thn_lalu,0)+COALESCE(AA.peny_sd_bln_lalu,0)+COALESCE(AA.peny_bln_ini,0)) as akum_peny_sd_bln_ini
    FROM (
    select
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   (select count(1) as sd_thn_lalu
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as sd_thn_lalu,
   (select count(1) as thn_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<=date_trunc('month',$2::date)) as thn_ini, /*parameter tgl report*/
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')<=(date_part('year',$2::date)-1)::text) as akum_sd_thn_lalu,
   (select coalesce(sum(nilai_penyusutan),0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and to_char(blth_penyusutan,'YYYY')=(date_part('year',$2::date))::text
   and blth_penyusutan<date_trunc('month',$2::date)) as peny_sd_bln_lalu,
   (select coalesce(nilai_penyusutan,0)
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date))  as peny_bln_ini,
   (select coalesce(nilai_buku,0) as nilai_buku_bln_ini
   from aset_amortisasi_proyeksi
   where kode_aset=a.kode_aset
   and blth_penyusutan=date_trunc('month',$2::date)) as nilai_buku_bln_ini,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok='E'
   and c.aset_kapitalisasi=true	 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListPKantorNonKapGuna: {
    text: `select $2::date as periode_cetak,AA.*
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok in ('H','B','A')
   and c.aset_kapitalisasi=false	 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListPKomputerNonKapGuna: {
    text: `select $2::date as periode_cetak,AA.*
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok in ('I','C')
   and c.aset_kapitalisasi=false	 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getListPLainNonKapGuna: {
    text: `select $2::date as periode_cetak,AA.*
    FROM (
    select 
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    h.nama_rusun,h.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,a.kode_aset,substring(a.kode_aset,1,3) AS NO_REG1,substring(a.kode_aset,4,3) AS NO_REG2,substring(a.kode_aset,7,3) AS NO_REG3,
    substring(a.kode_aset,10,4) AS NO_REG4,d.nama_kelompok,a.kode_aset_kategori as kode_kategori,a.kode_sub_kelompok,a.kode_kantor,c.nama_kategori,a.nama_aset,a.kode_satuan,
   a.aset_merk,a.aset_type,e.nama_satuan, a.kode_jenis_perolehan,f.deskripsi as jenis_perolehan,a.tgl_perolehan as tgl_beli,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,
   a.bgn_imb_tgl,a.bgn_imb_no,a.bgn_imb_instansi,a.nilai_residu,b.kondisi_aset,g.nama_kondisi,u.nama_unit as keterangan
   from aset a left join aset_penempatan p on a.kode_aset=p.kode_aset and p.penempatan_terakhir=true
   left join rusun_unit u on u.id_unit=p.lokasi_unit,
   aset_kondisi b,
   kode_aset_kategori c,
   kode_aset_kelompok d,
   kode_satuan e,
   kode_jenis_perolehan f,
   kode_aset_kondisi g, 
   rusun  h
   where a.kode_rusun=$1::text
   and a.kode_rusun=h.kode_rusun
   and date_trunc('month',a.tgl_perolehan)<=date_trunc('month',$2::date)
   and a.kode_aset=b.kode_aset
   and b.kondisi_terakhir=true
   and a.kode_aset_kategori=c.kode_kategori
   and a.kode_sub_kelompok=c.kode_sub_kelompok
   and c.kode_kelompok=d.kode_kelompok
   and a.kode_satuan=e.kode_satuan
   and a.kode_jenis_perolehan=f.kode_jenis_perolehan
   and b.kondisi_aset=g.kode_kondisi
   and d.kode_kelompok in ('E')
   and c.aset_kapitalisasi=false 
   ORDER BY d.kode_kelompok asc,a.kode_aset asc)
   AA`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getKodeRusunAsetByRusun: {
    text: `select id_kode_aset_rusun,kode_rusun,kode_aset_rusun,keterangan,aktif 
    from KODE_ASET_RUSUN 
    WHERE KODE_RUSUN=$1::text
    AND AKTIF=TRUE`,
    params: ['p_kode_rusun']
  },
  getRekapKapGuna: {
    text: `select x.level1,x.level2,x.ket_level1,x.ket_level2,x.kode_rusun,x.nama_rusun,x.periode,x.provinsi,x.assigned_mengetahui,x.assigned_membuat,
    x.assigned_jabatan_mengetahui,
    x.assigned_jabatan_membuat,
    sum(peny_thnlalu) as peny_thnlalu,sum(peny_blnini) as peny_blnini,sum(peny_thnini_blnlalu) as peny_thnini_blnlalu,
    sum(peny_thnsd_blnini) as peny_thnsd_blnini,sum(peny_sd_blnini) as peny_sd_blnini,sum(nilai_buku) as nilai_buku,
    sum(jml_barang) as jml_barang,sum(jml_baik) as jml_baik,sum(jml_rusak) as jml_rusak,sum(jml_rusak_berat) as jml_rusak_berat
    ,sum(jml_hilang) as jml_hilang,sum(nilai_perolehan) as nilai_perolehan
    from (select level1,level2,ket_level1,ket_level2,$1::text as kode_rusun,b.nama_rusun,$2::text as periode,$5::text as assigned_jabatan_mengetahui,
      $6::text as assigned_jabatan_membuat,b.provinsi,$3::text as assigned_mengetahui, $4::text as assigned_membuat,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','01'),0) peny_thnlalu,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','02'),0) peny_blnini,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','03'),0) peny_thnini_blnlalu,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','04'),0) peny_thnsd_blnini,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','05'),0) peny_sd_blnini,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','06'),0) nilai_buku,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','07'),0) jml_barang,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','09'),0) jml_baik,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','10'),0) jml_rusak,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','11'),0) jml_rusak_berat,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','12'),0) jml_hilang,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','13'),0) nilai_perolehan,
    '0' akum_penurunan_nilai
    from aset_lap_format_rekap a,
    rusun b,
    kode_aset_subkelompok c left join kode_aset_kategori d on d.kode_kategori=c.kode_barang
    and d.kode_sub_kelompok=c.kode_subkelompok and d.aset_kapitalisasi='true'
    where  b.kode_rusun =$1::text
    and c.kode_barang =  a.kode_barang
    and c.aktif = 'true'
    and c.kode_barang in (select distinct kode_kategori from kode_aset_kategori where aktif = 'true' and aset_kapitalisasi='true' order by kode_kategori asc)
    ) x
    group by level1,level2,ket_level1,ket_level2,kode_rusun,nama_rusun,provinsi,periode,assigned_mengetahui,assigned_membuat,assigned_jabatan_mengetahui,
    assigned_jabatan_membuat
    order by level1 asc,level2 asc`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getRekapNonKapGuna: {
    text: `select x.level1,x.level2,
    (CASE x.ket_level1 WHEN 'IV    PERALATAN KANTOR' THEN 'I    PERALATAN KANTOR'
	   				WHEN 'V    PERALATAN KOMPUTER' THEN 'II    PERALATAN KOMPUTER'
	   				WHEN 'VI    PERALATAN LAIN' THEN 'III    PERALATAN KOMPUTER'
	   END) AS ket_level1,x.ket_level2,x.kode_rusun,x.nama_rusun,x.periode,x.assigned_mengetahui,x.assigned_membuat,
     x.assigned_jabatan_mengetahui,
     x.assigned_jabatan_membuat,
    sum(jml_barang) as jml_barang,sum(jml_baik) as jml_baik,sum(jml_rusak) as jml_rusak,sum(jml_rusak_berat) as jml_rusak_berat
    ,sum(jml_hilang) as jml_hilang,sum(nilai_perolehan) as nilai_perolehan
    from (select level1,level2,ket_level1,ket_level2,$1::text as kode_rusun,b.nama_rusun,$2::text as periode,$3::text as assigned_mengetahui, $4::text as assigned_membuat,
    $5::text as assigned_jabatan_mengetahui,
    $6::text as assigned_jabatan_membuat,
    coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','07'),0) jml_barang,
        coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','09'),0) jml_baik,
        coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','10'),0) jml_rusak,
        coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','11'),0) jml_rusak_berat,
        coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','12'),0) jml_hilang,
        coalesce(f_get_penyusutan_rekap(b.kode_rusun,c.kode_barang,$2::text,'B','13'),0) nilai_perolehan,
    '0' akum_penurunan_nilai
    from aset_lap_format_rekap a,
    rusun b,
    kode_aset_subkelompok c left join kode_aset_kategori d on d.kode_kategori=c.kode_barang
    and d.kode_sub_kelompok=c.kode_subkelompok and d.aset_kapitalisasi='false'
    where  b.kode_rusun =$1::text
    and c.kode_barang =  a.kode_barang
    and c.aktif = 'true'
    and c.kode_barang in (select distinct kode_kategori from kode_aset_kategori where aktif = 'true' AND aset_kapitalisasi=false order by kode_kategori asc)
    ) x
    group by level1,level2,ket_level1,ket_level2,kode_rusun,nama_rusun,periode,assigned_mengetahui,assigned_membuat,assigned_jabatan_mengetahui,
    assigned_jabatan_membuat
    order by level1 asc,level2 asc`,
    params: [
      'p_kode_rusun',
      'p_tgl_report',
      'p_assigned_mengetahui',
      'p_assigned_membuat',
      'p_assigned_jabatan_mengetahui',
      'p_assigned_jabatan_membuat'
    ]
  },
  getDaftarAsetInventaris: {
    text: `select
   -- ( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($7::bigint,1)-1) )::int nomor_baris,
    (count(*) OVER())::int AS full_count_baris,
    ASET.* FROM
    (select a.kode_aset,a.kode_kantor,a.kode_aset_kategori,
    a.nama_aset,b.nama_kantor,c.nama_kategori,a.tgl_perolehan,a.nilai_perolehan,a.masa_manfaat_bln as umur_manfaat,a.as_inventaris_unit,a.inventaris_alias_name,
    a.biaya_kehilangan,a.biaya_kerusakan,x.id_aset_penempatan,x.kode_lokasi,x.lokasi_unit,u.nama_unit,l.id_lantai,l.no_lantai,l.nama_lantai,k.id_rusun_blok,
    k.kode_blok,k.nama_blok,y.kode_rusun,y.nama_rusun
    from aset a 
    left join aset_penempatan x on a.kode_aset=x.kode_aset and x.penempatan_terakhir=true
    left join rusun y on x.kode_rusun=y.kode_rusun 
  left join rusun_unit u on u.id_unit=x.lokasi_unit
  left join rusun_lantai l on l.id_lantai=u.id_lantai
  left join rusun_blok k on k.id_rusun_blok=l.id_rusun_blok, kode_kantor b, kode_aset_kategori c
    where a.kode_kantor=b.kode_kantor
    and a.kode_aset_kategori=c.kode_kategori
    and a.kode_sub_kelompok=c.kode_sub_kelompok
    and a.aktif=true
  AND a.as_inventaris_unit=true
  and (y.kode_rusun=$1::text or $1::text='' )
  and (k.id_rusun_blok::text=$2::text or $2::text='' )
  and (l.id_lantai::text=$3::text or $3::text='' )
  and (u.id_unit::text=$4::text or $4::text='' )
  AND (a.nama_aset ilike '%' || $5::text || '%' or a.nama_aset ilike '%' || $5::text || '%' or a.inventaris_alias_name ilike '%' || $5::text || '%')
  ) ASET
	order by
  			case when $8::text='nama_unit' and not coalesce($9::boolean,false) then nama_unit end asc,
  			case when $8::text='nama_unit' and coalesce($9::boolean,false) then nama_unit end desc,
				case when $8::text='nama_blok' and not coalesce($9::boolean,false) then nama_blok end asc,
  			case when $8::text='nama_blok' and coalesce($9::boolean,false) then nama_blok end desc,
				case when $8::text='nama_lantai' and not coalesce($9::boolean,false) then nama_lantai end asc,
  			case when $8::text='nama_lantai' and coalesce($9::boolean,false) then nama_lantai end desc,
				case when $8::text='kode_aset' and not coalesce($9::boolean,false) then kode_aset end asc,
  			case when $8::text='kode_aset' and coalesce($9::boolean,false) then kode_aset end desc,
				case when $8::text='nama_aset' and not coalesce($9::boolean,false) then nama_aset end asc,
  			case when $8::text='nama_aset' and coalesce($9::boolean,false) then nama_aset end desc,
				case when $8::text='biaya_kerusakan' and not coalesce($9::boolean,false) then biaya_kerusakan end asc,
  			case when $8::text='biaya_kerusakan' and coalesce($9::boolean,false) then biaya_kerusakan end desc,
				case when $8::text='biaya_kehilangan' and not coalesce($9::boolean,false) then biaya_kehilangan end asc,
  			case when $8::text='biaya_kehilangan' and coalesce($9::boolean,false) then biaya_kehilangan end desc,
        case when $8::text='inventaris_alias_name' and not coalesce($9::boolean,false) then inventaris_alias_name end asc,
  			case when $8::text='inventaris_alias_name' and coalesce($9::boolean,false) then inventaris_alias_name end desc
				limit
  				case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end
  			offset
  				case
  					when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
  				end`,
    params: [
      { name: 'p_kode_rusun', default: '' },
      { name: 'p_id_rusun_blok', default: '' },
      { name: 'p_id_lantai', default: '' },
      { name: 'p_id_unit', default: '' },
      { name: 'p_keyword', default: '' },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
    ]
  },
  putAsetBiaya: {
    text: `select f_aset_biaya_update($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode_aset', 'p_biaya_kerusakan', 'p_biaya_kehilangan']
						
					
						  
						  
	 
  },
  getRekapLokasiAset: {
    text: `select a.id_aset_penempatan,a.kode_aset as no_registrasi,b.nama_aset,
    a.tgl_penempatan,a.kode_rusun,c.nama_rusun as lokasi,a.lokasi_unit as kode_unit,f.nama_unit as nama_ruangan,
    d.kode_blok,d.nama_blok,e.id_lantai,e.nama_lantai
    from aset_penempatan a,
    aset b,
    rusun c,
    rusun_blok d,
    rusun_lantai e,
    rusun_unit f
    where a.penempatan_terakhir='true'
    and a.kode_aset=b.kode_aset
    and c.kode_rusun=d.kode_rusun
    and d.id_rusun_blok=e.id_rusun_blok
    and e.id_lantai=f.id_lantai
    and a.lokasi_unit=f.id_unit
    and b.aktif='true'
    and (a.kode_rusun::text=$1::text or $1::text='')
    and (d.kode_blok::text=$2::text or $2::text='')
    and (e.id_lantai::text=$3::text or $3::text='')
    and (a.lokasi_unit::text=$4::text or $4::text='')
    order by kode_rusun asc, kode_blok asc, kode_unit asc, b.kode_aset asc`,
			 
    params: [{ name: 'p_kode_rusun', default: '' },
    { name: 'p_kode_blok', default: '' },
    { name: 'p_id_lantai', default: '' },
    { name: 'p_id_unit', default: '' }]
	 
  }
}
