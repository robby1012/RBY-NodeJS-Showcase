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
      and (y.kode_rusun=$2::text or $2::text='' )
      AND (a.nama_aset ilike '%' || $3::text || '%' or b.nama_kantor ilike '%' || $3::text || '%' or c.nama_kategori ilike '%' || $3::text || '%')
      AND a.kode_Kantor in (WITH RECURSIVE cte AS (
        SELECT kode_kantor, nama_kantor,kode_kantor_induk, 1 AS level
        FROM   kode_kantor
        WHERE  kode_kantor = $4::text
        UNION  ALL
        SELECT t.kode_kantor, t.nama_kantor,t.kode_kantor_induk, c.level + 1
        FROM   cte      c
        JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
        )
      SELECT kode_kantor
      FROM   cte)`,
    params: [
      {name: 'p_kode_kategori', default: ''},
      {name: 'p_kode_rusun', default: ''},
      {name: 'p_keyword', default: ''},
      {name: 'p_kode_kantor', default: 'KPS'}
    ]
  },
  getDetailAset: {
    text: `select a.kode_aset,a.kode_kantor,a.kode_aset_kategori,a.kode_sub_kelompok,
        a.nama_aset,b.nama_kantor,c.nama_kategori,c.kode_kelompok,d.nama_kelompok,a.tgl_perolehan,
        a.nilai_perolehan,a.masa_manfaat_bln,a.nilai_residu,a.kode_jenis_perolehan, f.deskripsi as deskripsi_perolehan,
        a.keterangan,a.kode_satuan,e.nama_satuan,a.kondisi_aset,g.nama_kondisi,a.aset_merk,a.aset_type,
        x.id_aset_penempatan,y.nama_rusun,a.as_inventaris_unit,a.inventaris_alias_name,a.biaya_kerusakan,a.biaya_kehilangan,
        a.tanah_status,a.tanah_sertifikat_no,a.tanah_sertifikat_berlaku,a.tanah_sertifikat_berakhir,a.tanah_sertifikat_berlaku_bln,
        a.tanah_luasan,a.tanah_luas_m2,a.bgn_imb_no,a.bgn_imb_tgl,a.bgn_imb_instansi,a.keterangan,a.lampiran_file,a.lampiran_deskripsi
        from aset a 
        left join aset_penempatan x on a.kode_aset=x.kode_aset and x.penempatan_terakhir=true
        left join rusun y on x.kode_rusun=y.kode_rusun , kode_kantor b, kode_aset_kategori c,kode_satuan e, kode_aset_kelompok d,
        kode_jenis_perolehan f,kode_aset_kondisi g
        where a.kode_kantor=b.kode_kantor
        and a.kode_aset_kategori=c.kode_kategori
        and a.kode_sub_kelompok=c.kode_sub_kelompok
        and a.kode_satuan=e.kode_satuan
        and c.kode_kelompok=d.kode_kelompok
        and a.kode_jenis_perolehan=f.kode_jenis_perolehan
        and a.kondisi_aset=g.kode_kondisi
        and (a.kode_aset=$1::text or $1::text='')`,
    params: [
      {name: 'p_kode_aset', default: ''}
    ]
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
          { name: 'kode_sub_kelompok', default: null }
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
          { name: 'lampiran_file', default: null },
          { name: 'lampiran_deskripsi', default: null }
        ]
      }
    ]
  },
  putHapusAset: {
    text: `select f_pencatatan_aset_hapus($1::text,$2::text,$3::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_aset',
      'p_keterangan'
    ]
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
          AND a.kode_lokasi=d.kode_unit_jenis`,
    params: [
      {name: 'p_kode_aset', default: ''}
    ]
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
    text: `select id_aset_kondisi,kode_aset,tgl_kondisi,kondisi_aset,kondisi_aset_ref,keterangan
    from aset_kondisi
    where kode_aset=$1::text
    order by id_aset_kondisi asc`,
    params: [
      {name: 'p_kode_aset', default: ''}
    ]
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
    params: [
      {name: 'p_kode_aset', default: ''}
    ]
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
      {name: 'p_kode_rusun', default: ''},
      {name: 'p_tahun', default: ''}
    ]
  }

}

