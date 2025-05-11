module.exports = {
  getLovAgama: {
    text: `select kode_agama, nama_agama from kode_agama 
			where aktif or ($1::text is not null and kode_agama=$1::text)
			order by nama_agama`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovFasilitas: {
    text: `select kode_fasilitas, nama_fasilitas  || (case when keterangan is not null then ' - ' ||  keterangan  else '' end) nama_fasilitas
    from fasilitas 
			where aktif or ($1::text is not null and kode_fasilitas=$1::text)
			order by nama_fasilitas`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovFasilitasRusun: {
    text: `select fas_r.kode_fasilitas, 
        fas.nama_fasilitas || (case when fas.keterangan is not null then ' - ' ||  fas.keterangan  else '' end) nama_fasilitas
			from 
				fasilitas_rusun fas_r 
				inner join fasilitas fas on fas_r.kode_fasilitas=fas.kode_fasilitas
			where 
				kode_rusun=$1::text
				and (fas_r.aktif or ($2::text is not null and fas_r.kode_fasilitas=$2::text))
			order by nama_fasilitas`,
    params: ['p_rusun', { name: 'p_exception', default: null }]
  },
  getLovGolonganInvoice: {
    text: `select kode_invoice_golongan, deskripsi_invoice_golongan from kode_invoice_golongan 
			where aktif or ($1::text is not null and kode_invoice_golongan=$1::text)
			order by deskripsi_invoice_golongan`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovGolonganListrik: {
    text: `select kode_golongan_listrik, deskripsi from kode_golongan_listrik 
			where aktif or ($1::text is not null and kode_golongan_listrik=$1::text)
			order by kode_golongan_listrik`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovStatusPekerjaan: {
    text: `select kode_status_pekerjaan, nama_status_pekerjaan from kode_status_pekerjaan 
			where aktif or ($1::text is not null and kode_status_pekerjaan=$1::text)
			order by kode_status_pekerjaan`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovJenisKelamin: {
    text: `select kode_jenis_kelamin, nama_jenis_kelamin from kode_jenis_kelamin 
			where aktif or ($1::text is not null and kode_jenis_kelamin=$1::text)
			order by nama_jenis_kelamin`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovJenisNik: {
    text: `select kode_jenis_nik, nama_jenis_nik, aktif from kode_jenis_nik 
			where aktif or ($1::text is not null and kode_jenis_nik=$1::text) 
			order by nama_jenis_nik`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovJenisKendaraan: {
    text: `select kode_jenis_kendaraan, nama_jenis_kendaraan, aktif from kode_jenis_kendaraan 
			where aktif or ($1::text is not null and kode_jenis_kendaraan=$1::text)
			order by nama_jenis_kendaraan`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovJenisUnit: {
    text: `select kode_unit_jenis, nama_unit_jenis, aktif from kode_unit_jenis 
			where aktif or ($1::text is not null and kode_unit_jenis=$1::text)
			order by nama_unit_jenis`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovJenisRole: {
    text: `select kode_role, nama_role, aktif from kode_role 
			where aktif or ($1::text is not null and kode_role=$1::text)
			order by nama_role`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovKantor: {
    text: `
			SELECT kode_kantor,nama_kantor
			FROM   kode_kantor
			where aktif or  ($1::text is not null and kode_kantor=$1::text)
			order by nama_kantor`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovKantorByUser: {
    text: `
			WITH RECURSIVE cte AS (
				SELECT kode_kantor, nama_kantor,kode_kantor.aktif, jenis_kantor,1 AS level
				FROM   kode_kantor
				WHERE  kode_kantor =  (select kode_kantor from pengguna where kode_pengguna=$1::text)
		
				UNION  ALL
				SELECT t.kode_kantor, t.nama_kantor,t.aktif, t.jenis_kantor, c.level + 1 as level
				FROM   cte      c
				JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
				)
			SELECT kode_kantor,nama_kantor
			FROM   kode_kantor
      where (
        kode_kantor in ( 
          select kode_kantor from cte
          where  (coalesce($3::text,'')='' or cte.jenis_kantor=$3::text)
        )
        or 
        ($2::text is not null and kode_kantor=$2::text)
      ) 
      and (
        aktif 
        or  
        ($2::text is not null and kode_kantor=$2::text)
      )`,
    params: [
      'p_pengguna',
      { name: 'p_exception', default: null },
      { name: 'p_jenis', default: null }
    ]
  },
  getLovPembayaranMethod: {
    text: `select kode_pembayaran_method, nama_pembayaran_method, aktif from kode_pembayaran_method 
			where aktif or  ($1::text is not null and kode_pembayaran_method=$1::text)
			order by nama_pembayaran_method`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovStatusNikah: {
    text: `select kode_status_nikah, nama_status_nikah, aktif  from kode_status_nikah 
		where aktif or  ($1::text is not null and kode_status_nikah=$1::text)
		order by nama_status_nikah`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovRusunByUser: {
    text: `WITH RECURSIVE cte AS (
                SELECT kode_kantor, nama_kantor,kode_kantor.aktif, 1 AS level
                FROM   kode_kantor
                WHERE  kode_kantor =  (select kode_kantor from pengguna where kode_pengguna=$1::text)
                UNION  ALL
                SELECT t.kode_kantor, t.nama_kantor,t.aktif, c.level + 1 as level
                FROM   cte      c
                JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
              )
          select kode_rusun,nama_rusun 
          from rusun
          where 
            kode_kantor in(
              select kode_kantor from cte
            )
            and (
              rusun.aktif 
              or
              ($2::text is not null and rusun.kode_rusun=$2::text)
            )
            and (
              exists(
                select null from kode_kantor kk inner join pengguna p on kk.kode_kantor=p.kode_kantor 
                where  jenis_kantor='I' and kk.aktif
              )
            )
            and exists(select null from pengguna where kode_pengguna=$1::text and (kode_rusun=rusun.kode_rusun or kode_rusun is null))
          order by nama_rusun`,
    params: ['p_pengguna', { name: 'p_exception', default: null }]
  },
  getLovRusunKantor: {
    text: `select 
			kode_rusun,nama_rusun from rusun
			where kode_kantor in(
			WITH RECURSIVE cte AS (
				SELECT kode_kantor, nama_kantor, 1 AS level
				FROM   kode_kantor
				WHERE  (coalesce($1::text,'')='' and kode_kantor = 'KPS') or (coalesce($1::text,'')<>'' and kode_kantor=$1::text)
		
				UNION  ALL
				SELECT t.kode_kantor, t.nama_kantor, c.level + 1 as level
				FROM   cte      c
				JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
				)
			SELECT kode_kantor
			FROM   cte
			) and (aktif or  ($2::text is not null and kode_rusun=$2::text))
			order by nama_rusun`,
    params: [
      { name: 'p_kantor', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovRusun: {
    text: `select 
			kode_rusun,nama_rusun from rusun
			where aktif or  ($1::text is not null and kode_rusun=$1::text)
			order by nama_rusun`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovRusunBlok: {
    text: `select kode_blok,  nama_blok, aktif  from rusun_blok 
			where kode_rusun=$1::text and (aktif or  ($2::text is not null and kode_blok=$2::text))
			order by rusun_blok`,
    params: ['p_rusun', { name: 'p_exception', default: null }]
  },
  getLovRusunBlokId: {
    text: `select id_rusun_blok,kode_blok, nama_blok, aktif  from rusun_blok 
			where kode_rusun=$1::text and (aktif or  ($2::int is not null and id_rusun_blok=$2::int))
			order by rusun_blok`,
    params: ['p_rusun', { name: 'p_exception', default: null }]
  },
  getLovRusunLantai: {
    text: `select lantai.id_lantai,lantai.nama_lantai::text nama_lantai 
			from 
				rusun_lantai lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where 
				lantai.kode_rusun=$1::text
				and (coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int) 
				and (lantai.aktif or  ($3::int is not null and lantai.id_lantai=$3::int))
			order by lantai.no_lantai`,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovRusunUnit: {
    text: `select unit.id_unit,unit.nama_unit, blok.kode_blok
			from 
				rusun_unit unit 
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where
				lantai.kode_rusun=$1::text
				and (coalesce($2::int,0)=0 or lantai.id_lantai=$2::int)
				and (coalesce($3::text,'')='' or blok.kode_blok=$3::text)
				and (unit.aktif or  ($4::int is not null and unit.id_unit=$4::int))
			order by lantai.no_lantai,unit.nama_unit,unit.no_unit`,
    params: [
      'p_rusun',
      { name: 'p_lantai', default: null },
      { name: 'p_blok', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovRusunUnitByIDBlok: {
    text: `select unit.id_unit,nama_unit, blok.kode_blok
			from 
				rusun_unit unit 
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where
				lantai.kode_rusun=$1::text
				and (coalesce($2::int,0)=0 or lantai.id_lantai=$2::int)
				and (coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
				and (unit.aktif or  ($4::int is not null and unit.id_unit=$4::int))
				and (coalesce($5::text,'')='' or unit.kode_unit_jenis=$5::text)
			order by lantai.no_lantai,unit.nama_unit,unit.no_unit`,
    params: [
      'p_rusun',
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_exception', default: null },
      { name: 'p_jenis', default: null }
    ]
  },
  getLovRegistrasiUnit: {
    text: `select reg_unit.id_unit,nama_unit,unit.no_unit
		from registrasi_unit reg_unit
			inner join rusun_unit unit on reg_unit.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where no_registrasi=$1::text
		and (reg_unit.aktif or  ($3::int is not null and reg_unit.id_unit=$3::int))
			 and ( coalesce($2::text,'')='' or blok.kode_blok=$2::text)
		order by lantai.no_lantai, unit.no_unit`,
    params: [
      'p_no',
      { name: 'p_blok', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovTipeKontrakBerakhir: {
    text: `select kode_tipe_kontrak_berakhir, nama_tipe_kontrak_berakhir, aktif from kode_tipe_kontrak_berakhir 
			where aktif or  ($1::text is not null and kode_tipe_kontrak_berakhir=$1::text)
			order by nama_tipe_kontrak_berakhir`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovTipeOut: {
    text: `select kode_tipe_out, deskripsi_tipe_out, aktif from kode_tipe_out 
			where aktif or  ($1::text is not null and kode_tipe_out=$1::text)
			order by deskripsi_tipe_out`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovKontrakUnit: {
    text: `select kontrak_unit.id_unit, lantai.no_lantai||'. '||unit.nama_unit::text||' (No. '||unit.no_unit||')' nama_unit,unit.no_unit
		from kontrak_sewa_unit kontrak_unit
			inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where id_kontrak_sewa=$1::bigint
			and ($2::bigint is null or $2::bigint is not null)
		order by lantai.no_lantai, unit.no_unit`,
    params: ['p_id_kontrak', { name: 'p_exception', default: null }]
  },
  getLovAsetKategori: {
    text: `select kode_kategori, nama_kategori, aktif from kode_aset_kategori 
			where 
				(coalesce($1::text,'')='' or kode_kelompok=$1::text)
				and
				(aktif or  ($2::text is not null and kode_kategori=$2::text))
			order by nama_kategori`,
    params: [
      { name: 'p_kode_kelompok', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovAsetKelompok: {
    text: `select kode_kelompok, nama_kelompok, aktif from kode_aset_kelompok 
			where 
				(aktif or  ($1::text is not null and kode_kelompok=$1::text))
			order by nama_kelompok`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovAsetSatuan: {
    text: `select kode_satuan, nama_satuan, aktif from kode_satuan 
			where 
				(aktif or  ($1::text is not null and kode_satuan=$1::text))
			order by nama_satuan`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovAsetJenisPerolehan: {
    text: `select kode_jenis_perolehan, deskripsi, aktif from kode_jenis_perolehan 
			where 
				(aktif or  ($1::text is not null and kode_jenis_perolehan=$1::text))
			order by deskripsi`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovAsetKondisi: {
    text: `select kode_kondisi, nama_kondisi, aktif from kode_aset_kondisi 
			where 
				(aktif or  ($1::text is not null and kode_kondisi=$1::text))
			order by nama_kondisi`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovKomplainKategori: {
    text: `select kode_kategori_komplain, nama_kategori_komplain, aktif from kode_kategori_komplain 
			where 
				(aktif or  ($1::text is not null and kode_kategori_komplain=$1::text))
			order by nama_kategori_komplain`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovWoPrioritas: {
    text: `select kode_wo_prioritas, nama_wo_prioritas, aktif from kode_wo_prioritas 
			where 
				(aktif or  ($1::text is not null and kode_wo_prioritas=$1::text))
			order by nama_wo_prioritas`,
    params: [{ name: 'p_exception', default: null }]
  },
  getLovWoTipe: {
    text: `select kode_wo_tipe, nama_wo_tipe, aktif 
		from kode_wo_tipe 
			where 
        (aktif or  (coalesce($3::text,'')<>'' and kode_wo_tipe=$3::text))
        and (
          $1::boolean is null 
          or (
            ($1::boolean is not null and  (hide_in_form=not true::boolean  or (
              coalesce($3::text,'')<>'' 
              and kode_wo_tipe=$3::text
            ) ) )
            or 
            ($1::boolean is not null and  coalesce($2::text,'')<>'' and kode_wo_tipe=$2::text)
          )
        )
        and (
          coalesce($2::boolean,false)=false
          or 
          (
            kode_wo_tipe not in('IC','MTR') 
            or (
              coalesce($3::text,'')<>'' 
              and kode_wo_tipe=$3::text
            )
          )
        )
			order by nama_wo_tipe`,
    params: [
      { name: 'p_hide_form', default: null },
      { name: 'p_fo_komplain', default: false },
      { name: 'p_exception', default: null }
    ]
  },
  getKontrakNoPerjanjian: {
    text: `select * from
		(
			select 'K' as jenis,no_kontrak_sewa no_perjanjian from kontrak_sewa where id_kontrak_sewa=$1::bigint
			union all 
			select 'A' as jenis, no_adendum no_perjanjian from kontrak_sewa_adendum where aktif and approval and id_kontrak_sewa=$1::bigint
		) t
			where jenis=$2::text
			order by no_perjanjian`,
    params: ['p_id_kontrak', 'p_jenis']
  },
  getLovKodeRusunAsetByRusun: {
    text: `select id_kode_aset_rusun,kode_rusun,kode_aset_rusun,keterangan,aktif 
    from KODE_ASET_RUSUN 
    WHERE KODE_RUSUN=$1::text
    AND AKTIF=TRUE`,
    params: ['p_kode_rusun']
  },
  getLovPembayaranRekening: {
    text: `select 
				id_pembayaran_rekening, nama_bank || ', NO REK: ' || no_rekening || ', AN: ' || atas_nama_rekening  rek_pembayaran 
			from pembayaran_rekening
				WHERE kode_kantor in (
					WITH RECURSIVE cte AS (
						SELECT kode_kantor
						FROM   kode_kantor
						WHERE  kode_kantor = $1::text
				
						UNION  ALL
						SELECT t.kode_kantor
						FROM   cte      c
						JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
						)
					SELECT kode_kantor
					FROM   cte
				) and aktif`,
    params: ['p_kantor']
  },
  getLovBlokForPenghuni: {
    text: `with data_blok as(
			select distinct rl.id_rusun_blok
	        from 
	          rusun_unit ru 
	          inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
	          inner join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok 
	          where 
        		(coalesce($1::bigint,0)<>0 and  id_unit in (select id_unit from kontrak_sewa_unit ksu where id_kontrak_sewa=$1::bigint))
        		or 
        		(coalesce($2::text,'')<>''and  id_unit in (select id_unit from registrasi_unit where no_registrasi=$2::text)) 
	     )
	     select rb.id_rusun_blok , rb.nama_blok 
	     from rusun_blok rb 
	     	left outer join data_blok db on rb.id_rusun_blok =db.id_rusun_blok
	     where
          rb.kode_rusun=$3::text
          and  (
              aktif 
              or  
              db.id_rusun_blok is not null
              or
              (coalesce($4::int,0)<>0 and rb.id_rusun_blok=$4::int)
          )
            order by rb.nama_blok`,
    params: [
      { name: 'p_id_kontrak', default: null },
      { name: 'p_no_registrasi', default: null },
      { name: 'p_rusun', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovLantaiForPenghuni: {
    text: `with data_lantai as(
            select distinct rl.id_lantai 
              from 
                rusun_unit ru 
              inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
            where 
              (coalesce($1::bigint,0)<>0 and  id_unit in (select id_unit from kontrak_sewa_unit ksu where id_kontrak_sewa=$1::bigint))
              or 
              (coalesce($2::text,'')<>'' and  id_unit in (select id_unit from registrasi_unit where no_registrasi=$2::text)) 
          )
          select rl.id_lantai, rl.nama_lantai
          from rusun_lantai rl
            left outer join data_lantai dl on rl.id_lantai =dl.id_lantai
          where
            rl.kode_rusun=$3::text
            and (
              coalesce ($4::int,0)=0 
              or 
              rl.id_rusun_blok=coalesce ($4::int,0)
            )
            and  (
              aktif 
              or  
              dl.id_lantai is not null
              or
              (coalesce($5::int,0)<>0 and rl.id_lantai=$5::int)
          ) order by rl.nama_lantai`,
    params: [
      { name: 'p_id_kontrak', default: null },
      { name: 'p_no_registrasi', default: null },
      { name: 'p_rusun', default: null },
      { name: 'p_blok', default: null },
      { name: 'p_exception', default: null }
    ]
  },
  getLovUnitForPenghuni: {
    text: `with data_unit as(
          select distinct ru.id_unit
            from 
              rusun_unit ru 
          where 
            (coalesce($1::bigint,0)<>0 and  id_unit in (select id_unit from kontrak_sewa_unit ksu where id_kontrak_sewa=$1::bigint))
            or 
            (coalesce($2::text,'')<>'' and  id_unit in (select id_unit from registrasi_unit where no_registrasi=$2::text)) 
        )
        select ru.id_unit, ru.nama_unit 
        from 
          rusun_unit ru
          inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai
          left outer join data_unit du on du.id_unit=ru.id_unit
        where
          rl.kode_rusun=$3::text
          and (
            coalesce ($4::int,0)=0 
            or 
            rl.id_rusun_blok=coalesce ($4::int,0)
          ) 
          and (
            coalesce ($5::int,0)=0 
            or 
            rl.id_lantai=coalesce ($5::int,0)
          )
          and  (
            ru.aktif 
            or  
            du.id_unit is not null
            or
            (coalesce($6::int,0)<>0 and ru.id_unit=$6::int)
        ) order by ru.nama_unit`,
    params: [
      { name: 'p_id_kontrak', default: null },
      { name: 'p_no_registrasi', default: null },
      { name: 'p_rusun', default: null },
      { name: 'p_blok', default: null },
      { name: 'p_lantai', default: null },
      { name: 'p_exception', default: null }
    ]
  }
}
