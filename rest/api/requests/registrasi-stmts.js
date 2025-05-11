const moment = require('moment')
module.exports = {
  postRegistrasi: {
    text: `select f_registrasi($1::text,$2::json,$3::json) as ret`,
    params: [
      {
        name: 'p_pengguna'
      },
      {
        name: 'data_reg',
        type: 'json',
        data: [
          { name: 'no', default: null },
          { name: 'kodeSegmen', default: null },
          { name: 'nik', default: null },
          'jenis',
          'kpj',
          'jenisKelamin',
          'nama',
          { name: 'telp', default: null },
          { name: 'mail', default: null },
          { name: 'npp', default: null },
          { name: 'namaPrs', default: '' },
          { name: 'departemenPrs', default: null },
          { name: 'alamatPrs', default: null },
          { name: 'telpPrs', default: null },
          { name: 'picPrs', default: null },
          { name: 'mailPrs', default: null },
          { name: 'hunianKeluarga', default: false },
          'rusun',
          'jenisUnit',
          { name: 'blok', default: null },
          'jumlahUnit',
          'tglReq',
          'jangkaWaktu'
        ]
      },
      {
        name: 'data_units',
        type: 'array-json',
        data: ['id_unit']
      }
    ]
  },
  getRegistrasiInfo: {
    text: `select 
              r.*,
              (
                select json_agg(t) 
                from (
                  select
                    reg_unit.id_unit, nama_blok,nama_unit,nama_lantai,f_tarif_unit_get_numeric(reg_unit.id_unit) as tarif
                  from 
                    registrasi_unit reg_unit
                    inner join rusun_unit unit on reg_unit.id_unit=unit.id_unit       
                    inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
                    left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
                  where reg_unit.aktif and reg_unit.no_registrasi=r.no_registrasi
                ) t
              ) unit,
              (
                select json_agg(t) 
                from (
                  select 
                    no_kontrak_sewa,pihak1_nama_lengkap , pihak1_jabatan , pihak1_ttd_title ,
                    pihak2_nama_lengkap , pihak2_nama_perusahaan , pihak2_ttd_title , pihak2_ttd_nama , pihak2_ttd_jabatan 
                  from 
                    kontrak_sewa
                  where 
                    aktif and no_registrasi=r.no_registrasi
                ) t
              ) data_kontrak,    
              (
                select json_agg(t) 
                from (
                  select 
                    submit_kontrak_pihak1_nama_lengkap , submit_kontrak_pihak1_jabatan , submit_kontrak_pihak1_ttd_title 
                  from 
                    rusun_mgr_setting_db  
                  where kode_rusun=r.kode_rusun
                ) t
              ) data_setting_kontrak,              
              (
                select json_agg(t) 
                from (
                  select 
                    id_registrasi_lampiran, kode_dokumen, path_dokumen
                  from 
                    registrasi_lampiran  
                  where no_registrasi=r.no_registrasi and aktif
                ) t
              ) data_lampiran
            from registrasi r 
            where no_registrasi =$1::text`,
    params: ['p_no_registrasi']
  },
  postRegistrasiIndividu: {
    text: `select f_registrasi_individu($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::date,
      $9::smallint,$10::smallint,$11::boolean,$12::text, $13::text,$14::text,$15::text,$16::bigint,$17::int,$18::text) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      {
        name: 'p_no_registrasi',
        default: null
      },
      'p_kode_segmen',
      {
        name: 'p_kpj',
        default: null
      },
      {
        name: 'p_nik',
        default: null
      },
      'p_kode_unit_jenis',
      'p_tgl_req_menghuni',
      'p_jangka_waktu',
      'p_jmlh_unit',
      {
        name: 'p_hunian_keluarga',
        default: false
      },
      'p_nama',
      'p_kode_jenis_kelamin',
      {
        name: 'p_telpon',
        default: null
      },
      {
        name: 'p_email',
        default: null
      },
      { name: 'p_id_profil', value: null },
      'p_id_unit',
      { name: 'p_alamat', default: null }
    ]
  },
  postRegistrasiPerusahaan: {
    text: `select f_registrasi_perusahaan($1::text,$2::text,$3::text,$4::text,$5::text,$6::date,$7::smallint,$8::smallint,$9::boolean,
          $10::text, $11::text,$12::text,$13::text,$14::text,$15::text,$16::text,$17::text,$18::text,$19::json) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      {
        name: 'p_no_registrasi',
        default: null
      },
      'p_npp',
      'p_kode_unit_jenis',
      'p_tgl_req_menghuni',
      'p_jangka_waktu',
      'p_jmlh_unit',
      {
        name: 'p_hunian_keluarga',
        default: false
      },
      'p_prs_nama',
      {
        name: 'p_prs_depatermen',
        default: null
      },
      {
        name: 'p_prs_telp',
        default: null
      },
      {
        name: 'p_prs_alamat',
        default: null
      },
      {
        name: 'p_prs_email',
        default: null
      },
      {
        name: 'p_pic_nik',
        default: null
      },
      {
        name: 'p_pic_nama',
        default: null
      },
      {
        name: 'p_pic_telp',
        default: null
      },
      {
        name: 'p_pic_email',
        default: null
      },
      {
        name: 'p_data_units',
        type: 'array-json',
        data: ['id_unit']
      }
    ]
  },
  getRegistrasiCariTenant: {
    text: `select 
          case when $1::text='I' then
            (
              select json_agg(t)
              from ( 
                select distinct on (kpj,nik,kpj_nama,r.kode_jenis_kelamin)
                  r.*,kjk.nama_jenis_kelamin 
                from 
                  registrasi r
                  left outer join kode_jenis_kelamin kjk  on kjk.kode_jenis_kelamin =r.kode_jenis_kelamin 
                where 
                  $1::text='I' and jenis_registrasi ='I' 
                  and (
                    ($2::text='nama' and kpj_nama ilike '%' || $3::text || '%' )
                    or 
                    ($2::text='kpj' and kpj=$3::text )
                    or 
                    ($2::text='nik' and nik=$3::text )
                  )
                order by kpj,nik,kpj_nama,r.kode_jenis_kelamin,r.aktif desc,r.tgl_rekam desc
              ) t
            ) 
          else null end data_reg_individu,
          case when $1::text='I' then
            (
              select json_agg(t)
              from (
                select distinct on (pp.kpj , pp.nik , pp.nama_lengkap , pp.jenis_kelamin )
                  pp.* ,kjk.nama_jenis_kelamin , rp.tgl_in, rp.tgl_out, 
                  nama_blok,nama_lantai, nama_unit, rp.aktif_menghuni,
                  case 
                    when 
                      rp.aktif_menghuni and rp.aktif 
                      and rp.tgl_in<date_trunc('day',now()) 
                      and (tgl_out is null or tgl_out>date_trunc('day',now())) 
                    then true else false
                  end sedang_menghuni, rp.no_registrasi,r.kpj_telp,r.kpj_email,
                  case when ks.id_kontrak_sewa is not null then ks.jenis_registrasi else r.jenis_registrasi end jenis_registrasi,
                  rp.is_penyewa,rp.penanggung_jawab
                from 
                  profil_penghuni pp
                  left outer join registrasi_penghuni rp on pp.id_profil_penghuni = rp.id_profil_penghuni and rp.aktif 
                  left outer join kode_jenis_kelamin kjk  on kjk.kode_jenis_kelamin =pp.jenis_kelamin 
                  left outer join rusun_unit ru on ru.id_unit=rp.id_unit 
                  left outer join rusun_lantai rl on  rl.id_lantai=ru.id_lantai 
                  left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok    
                  left outer join registrasi r on r.no_registrasi=rp.no_registrasi 
                  left outer join kontrak_sewa ks on ks.id_kontrak_sewa=rp.id_kontrak_sewa      
                where 
                  pp.aktif and profil_terakhir
                  and (
                    ($2::text='nama' and nama_lengkap ilike '%' || $3::text || '%' )
                    or 
                    ($2::text='kpj' and rp.kpj=$3::text )
                    or 
                    ($2::text='nik' and rp.nik=$3::text )
                  )
               order by pp.kpj , pp.nik , pp.nama_lengkap , pp.jenis_kelamin ,rp.aktif desc, rp.aktif_menghuni desc, 
               		case when rp.aktif_menghuni and rp.aktif and rp.tgl_in<date_trunc('day',now()) and (tgl_out is null or tgl_out>date_trunc('day',now()))  then 0 else 1 end 
              ) t
            ) 
          else null end data_penghuni,
          case when $1::text='P' then
            (
              select json_agg(t)
              from ( 
                select distinct on (npp,perusahaan_nama)
                  r.*
                from 
                  registrasi r
                where 
                  $1::text='P' and jenis_registrasi ='P' 
                  and (
                    ($2::text='nama' and perusahaan_nama ilike '%' || $3::text || '%' )
                    or 
                    ($2::text='npp' and npp=$3::text )
                  )
                order by npp,perusahaan_nama,r.aktif desc,r.tgl_rekam desc
              ) t
            ) 
          else null end data_reg_perusahaan`,
    params: ['p_jenis_registrasi', 'p_search_by', 'p_search']
  },
  getRegistrasiCekTenantIndividu: {
    text: `select 
            (
              select count(*)
              from 
                registrasi r
              where 
                jenis_registrasi ='I' and status in('D','R','S')  and aktif
                and (
                  ( coalesce($1::text,'')<>'' and kpj=$1::text )
                  or 
                  ( coalesce($2::text,'')<>'' and nik=$2::text )
                )
            )::int  count_reg_proses,
            (
              select count(*)
              from 
                registrasi_penghuni  rp
              where 
                aktif  and aktif_menghuni
                and rp.tgl_in<date_trunc('day',now()) 
                and (tgl_out is null or tgl_out>date_trunc('day',now()))
                and (
                  ( coalesce($1::text,'')<>'' and rp.kpj=$1::text )
                  or 
                  ( coalesce($2::text,'')<>'' and rp.nik=$2::text )
                )
            )::int count_menghuni,
            (
              select count(*)
              from 
                profil_penghuni pp  
              where 
                aktif  and profil_terakhir 
                and (
                  ( coalesce($1::text,'')<>'' and pp.kpj=$1::text )
                  or 
                  ( coalesce($2::text,'')<>'' and pp.nik=$2::text )
                )
            )::int count_profil,
            (
              select count(*)
              from 
                registrasi r
              where 
                jenis_registrasi ='I' 
                and (
                  ( coalesce($1::text,'')<>'' and  kpj=$1::text )
                  or 
                  ( coalesce($2::text,'')<>'' and nik=$2::text )
                )
            )::int  count_reg`,
    params: ['p_kpj', 'p_nik']
  },
  getRegistrasiUnitChoose: {
    text: `select ru.id_unit, nama_blok, nama_lantai, nama_unit, f_tarif_unit_get_numeric(ru.id_unit) tarif,
    is_rented,is_filled,is_maintenance,is_processed,rb.id_rusun_blok
    from
      rusun_unit ru
      inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai
      left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok
    where
      ru.aktif
      and rl.kode_rusun=$1::text
      and ($2::int is null or rb.id_rusun_blok=$2::int)
      and ($3::int is null or rl.id_lantai=$3::int)
      and ($4::text is null or ru.kode_unit_jenis=$4::text)
    order by nama_blok , nama_lantai, nama_unit `,
    params: [
      'p_rusun',
      {
        name: 'p_id_blok',
        default: null
      },
      {
        name: 'p_id_lantai',
        default: null
      },
      {
        name: 'p_jenis_unit',
        default: null
      }
    ]
  },
  getRegistrasiPenghuni: {
    text: `select reg_p.*,lantai.no_lantai,blok.kode_blok, blok.nama_blok, unit.id_lantai,unit.nama_unit, lantai.nama_lantai,
      kelamin.nama_jenis_kelamin jenis_kelamin_nama, r.jenis_registrasi
			from registrasi_penghuni reg_p
        inner join registrasi r on r.no_registrasi=reg_p.no_registrasi
				inner join rusun_unit unit on reg_p.id_unit=unit.id_unit				     
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join kode_jenis_kelamin kelamin on reg_p.jenis_kelamin=kelamin.kode_jenis_kelamin
  		where reg_p.no_registrasi=$1 and reg_p.aktif
      order by penanggung_jawab desc, reg_p.tgl_rekam desc`,
    params: ['p_no']
  },
  getRegistrasiPenghuniProfil: {
    text: `select
          rp.no_registrasi,pp.*,rp.id_unit, ru.id_lantai , rl.id_rusun_blok , rp.penanggung_jawab , rp.tgl_in, rp.tgl_out,rp.is_penyewa,
          rp.kpj kpj_reg, rp.nik nik_reg, rp.kpj_nama kpj_nama_reg, rp.nik_jenis nik_jenis_reg, rp.jenis_kelamin jenis_kelamin_reg,
          case 
            when ks.id_kontrak_sewa is not null then ks.tgl_mulai_sewa 
            when  r.no_registrasi is not null  then r.tgl_request_menghuni
            else date_trunc('day',now())
          end min_tgl_in,
          case 
            when ks.id_kontrak_sewa is not null then (
              case
                when ks.kontrak_berakhir then ks.kontrak_berakhir_tgl 
                when ks.tgl_berakhir_adendum  is not null then ks.tgl_berakhir_adendum
                else ks.tgl_berakhir_sewa 
              end
            )
            when  r.no_registrasi is not null  then r.tgl_request_menghuni + interval '1 month' * r.jangka_waktu_bln
            else date_trunc('day',now())
          end max_tgl_out,
          case 
            when ks.id_kontrak_sewa is not null and  ks.aktif and ks.approval and ks.kontrak_berlaku and
                not (
                  rp.tgl_in>=ks.tgl_mulai_sewa 
                  and 
                  rp.tgl_in<= 
                    case
                      when ks.kontrak_berakhir then ks.kontrak_berakhir_tgl 
                      when ks.tgl_berakhir_adendum  is not null then ks.tgl_berakhir_adendum
                      else ks.tgl_berakhir_sewa 
                    end
                )
                then false
            when ks.id_kontrak_sewa is not null and not ks.aktif then false	
            when r.no_registrasi is not null and not r.aktif then false
            else true
          end penghuni_is_editable,
          case 
            when ks.id_kontrak_sewa is not null then (
              select max(hunian_keluarga::int)::boolean from kontrak_sewa_unit where id_kontrak_sewa=ks.id_kontrak_sewa and id_unit=rp.id_unit
            )
            when r.no_registrasi is not null then r.hunian_keluarga
            else false
          end hunian_keluarga,
          case when ks.id_kontrak_sewa is null then true else false end unit_is_editable,
          case when ks.id_kontrak_sewa is not null then ks.jenis_registrasi else r.jenis_registrasi end jenis_registrasi,
          (
            select json_agg(t)
            from (
              select
                id_profil_penghuni_lampiran ,kode_dokumen 
              from
                profil_penghuni_lampiran
              where profil_penghuni_lampiran.aktif and kpj=pp.kpj and nik=pp.nik
            ) t
          ) data_lampiran
        from 
          registrasi_penghuni rp
          left outer join  profil_penghuni pp  on pp.id_profil_penghuni = rp.id_profil_penghuni 
          left outer join kontrak_sewa ks on ks.id_kontrak_sewa = rp.id_kontrak_sewa 
          left outer join registrasi r on r.no_registrasi =rp.no_registrasi 
          left outer join rusun_unit ru on ru.id_unit=rp.id_unit 
          left outer join rusun_lantai rl on rl.id_lantai = ru.id_lantai
        where 
          rp.id_registrasi_penghuni = $1::bigint`,
    params: ['p_id_reg_penghuni']
  },
  postRegistrasiPenghuniSave: {
    text: `select f_penghuni_submit(
            $1::text, $2::text, $3::bigint, $4::text, $5::bigint, $6::bigint, $7::text, $8::text, $9::text, $10::text, 
            $11::int, $12::date, $13::date, $14::text, $15::date, $16::text, $17::text, $18::smallint, $19::smallint, $20::text, 
            $21::numeric, $22::text, $23::text, $24::text, $25::text, $26::text, $27::text, $28::text, $29::text, $30::text, 
            $31::smallint, $32::text, $33::text, $34::text, $35::text, $36::text, $37::text, $38::text, $39::text, $40::text, 
            $41::text, $42::text, $43::text, $44::text,$45::boolean
        ) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode_rusun',
      { name: 'p_id_kontrak_sewa', default: null },
      { name: 'p_no_registrasi', default: null },
      { name: 'p_id_registrasi_penghuni', default: null },
      { name: 'p_id_profil_penghuni', default: null },
      { name: 'p_kpj', default: null },
      { name: 'p_kpj_nama', default: null },
      { name: 'p_nik', default: null },
      { name: 'p_nik_jenis', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_tgl_in', default: null },
      { name: 'p_tgl_out', default: null },
      { name: 'p_tempat_lahir', default: null },
      { name: 'p_tgl_lahir', default: null },
      { name: 'p_jenis_kelamin', default: null },
      { name: 'p_nik_alamat', default: null },
      { name: 'p_anak_ke', default: null },
      { name: 'p_jmlh_saudara', default: null },
      { name: 'p_hoby', default: null },
      { name: 'p_gaji_perbulan', default: null },
      { name: 'p_kode_agama', default: null },
      { name: 'p_suku_provinsi', default: null },
      { name: 'p_kode_jenis_kendaraan', default: null },
      { name: 'p_no_kendaraan', default: null },
      { name: 'p_pekerjaan_nama_prs', default: null },
      { name: 'p_pekerjaan_alamat_prs', default: null },
      { name: 'p_pekerjaan_telp', default: null },
      { name: 'p_pekerjaan_fax', default: null },
      { name: 'p_pekerjaan_status', default: null },
      { name: 'p_pekerjaan_masakerja_bln', default: null },
      { name: 'p_pekerjaan_atasan_langsung', default: null },
      { name: 'p_keluarga_ayah', default: null },
      { name: 'p_keluarga_ayah_status', default: null },
      { name: 'p_keluarga_ibu', default: null },
      { name: 'p_keluarga_ibu_status', default: null },
      { name: 'p_keluarga_alamat', default: null },
      { name: 'p_keluarga_telp', default: null },
      { name: 'p_darurat_nama', default: null },
      { name: 'p_darurat_hubungan', default: null },
      { name: 'p_darurat_alamat', default: null },
      { name: 'p_darurat_telp', default: null },
      { name: 'p_kode_status_nikah', default: null },
      { name: 'p_kode_segmen', default: null },
      { name: 'p_penanggung_jawab', default: false }
    ]
  },
  postRegistrasiPenghuniDelete: {
    text: `select f_registrasi_penghuni_cancel($1::text, $2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_registrasi_penghuni']
  },
  postRegistrasiKontrak: {
    text: `select f_registrasi_submit($1::text, $2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_no_registrasi',
      'p_pihak1_nama',
      { name: 'p_pihak1_jabatan', default: null },
      { name: 'p_pihak1_ttd_title', default: null },
      'p_pihak2_nama',
      { name: 'p_pihak2_jabatan', default: null },
      { name: 'p_pihak2_perusahaan', default: null },
      'p_pihak2_ttd_nama',
      { name: 'p_pihak2_ttd_jabatan', default: null }
    ]
  },
  getRegistrasi: {
    text: `select
  			( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris,
  			(count(*) OVER())::int AS full_count_baris,
  				registrasi.*,
  			(
  				select json_agg(t)
  				from (
  					select
  					unit.no_unit, lantai.no_lantai, unit.nama_unit, blok.kode_blok, blok.nama_blok
  					from
  						registrasi_unit reg_unit
  						inner join rusun_unit unit on reg_unit.id_unit=unit.id_unit
  						inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  						left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
  					where reg_unit.aktif and reg_unit.no_registrasi=registrasi.no_registrasi
  				) t
  			) unit
  			from
  				registrasi
  			where kode_rusun=$1 and (no_registrasi=$2 or $2='ALL') and aktif
  				and (
            $3::boolean is null
            or
  					(coalesce($3::boolean,true)=true and not (waiting_list and not waiting_list_proses))
  					or
  					(coalesce($3::boolean,true)=false and waiting_list and not waiting_list_proses)
  				)
  				and (
  					$4::text is null or $4::text='' or status=$4::text
  					or
  					($4::text='D' and status in ('D','R'))
  					or
  					($4::text='S' and status in ('S'))
  					or
  					($4::text='K' and status in ('K'))
  					or
  					($4::text='A' and status in ('A'))
  					or
  					($4::text='C' and not aktif)
  				)
  				and (
  					$5::boolean is null or aktif=$5::boolean
  				)
  				and (
  					( coalesce($10::int,0)=0 and coalesce($11::int,0)=0 )
  					or
  					exists(
  						select null
  						from
  							registrasi_unit reg_unit
  							inner join rusun_unit unit on reg_unit.id_unit=unit.id_unit
  							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  							left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
  						where
  							reg_unit.aktif and reg_unit.no_registrasi=registrasi.no_registrasi
  							and (coalesce($10::int,0)=0 or lantai.id_rusun_blok=$10::int)
  							and (coalesce($11::int,0)=0 or lantai.id_lantai=$11::int)
  					)
  				)
  				and (
  					coalesce($12::text,'')=''
  					or no_registrasi ilike '%' || $12::text || '%'
  					or jenis_registrasi ilike '%' || $12::text || '%'
  					or kpj_nama ilike '%' || $12::text || '%'
  					or perusahaan_nama ilike '%' || $12::text || '%'
  				)
  				and (
  					coalesce($13::text,'')=''
  					or jenis_registrasi=$13::text
  				)
  			order by
  				case when $8::text='no_registrasi' and not coalesce($9::boolean,false) then no_registrasi end asc,
  				case when $8::text='no_registrasi' and coalesce($9::boolean,false) then no_registrasi end desc,
  				case when $8::text='jenis_registrasi' and not coalesce($9::boolean,false) then jenis_registrasi end asc,
  				case when $8::text='jenis_registrasi' and coalesce($9::boolean,false) then jenis_registrasi end desc,
          case when $8::text='penyewa' and not coalesce($9::boolean,false)  and jenis_registrasi='I' then kpj_nama end asc, 
          case when $8::text='penyewa' and coalesce($9::boolean,false)  and jenis_registrasi='I'  then kpj_nama end desc,
          case when $8::text='penyewa' and not coalesce($9::boolean,false)  and jenis_registrasi='P'  then perusahaan_nama end asc, 
          case when $8::text='penyewa' and coalesce($9::boolean,false) and jenis_registrasi='P' then perusahaan_nama end desc,
  				case when $8::text='jml_unit' and not coalesce($9::boolean,false) then jml_unit end asc,
  				case when $8::text='jml_unit' and coalesce($9::boolean,false) then jml_unit end desc,
  				case when $8::text='jangka_waktu_bln' and not coalesce($9::boolean,false) then jangka_waktu_bln end asc,
  				case when $8::text='jangka_waktu_bln' and coalesce($9::boolean,false) then jangka_waktu_bln end desc,
  				case when $8::text='status' and not coalesce($9::boolean,false) then status end asc,
  				case when $8::text='status' and coalesce($9::boolean,false) then status end desc,
  				case when $8::text='tgl_request_menghuni' and not coalesce($9::boolean,false) then tgl_request_menghuni end asc,
  				case when $8::text='tgl_request_menghuni' and coalesce($9::boolean,false) then tgl_request_menghuni end desc,
  				registrasi.tgl_rekam desc
  			limit
  				case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end
  			offset
  				case
  					when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
  				end`,
    params: [
      'p_rusun',
      { name: 'p_no', default: 'ALL' },
      { name: 'p_bukan_wl', default: null },
      { name: 'p_status', default: null },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_id_blok', default: null }, // 10
      { name: 'p_id_lantai', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis', default: null }
    ]
  },
  getRegistrasiWL: {
    text: `select 
						( (row_number() over()) + coalesce($5::bigint,10) * (coalesce($4::int,1)-1) )::int nomor_baris, 
						(count(*) OVER())::int AS full_count_baris,
						reg.* 
					from registrasi reg
					where 
						aktif and  waiting_list
						and not waiting_list_proses and status='D'
						and reg.kode_rusun=$1::text
						and reg.jenis_registrasi='I'
						and ( coalesce($2::text,'')='' or reg.no_registrasi=$2::text)
						and (
							$3::text=''
							or kpj ilike '%' || $3::text || '%'
							or kpj_nama ilike '%' || $3::text || '%'
							or perusahaan_nama ilike '%' || $3::text || '%'
							or reg.no_registrasi ilike '%' || $3::text || '%'
						) 
				order by 
          case when $6::text='no_registrasi' and not coalesce($7::boolean,false) then no_registrasi end asc,
          case when $6::text='no_registrasi' and coalesce($7::boolean,false) then no_registrasi end desc,
          case when $6::text='jenis_registrasi' and not coalesce($7::boolean,false) then jenis_registrasi end asc,
          case when $6::text='jenis_registrasi' and coalesce($7::boolean,false) then jenis_registrasi end desc,
          case when $6::text='penyewa' and not coalesce($7::boolean,false)  and jenis_registrasi='I' then kpj_nama end asc, 
          case when $6::text='penyewa' and coalesce($7::boolean,false)  and jenis_registrasi='I'  then kpj_nama end desc,
          case when $6::text='penyewa' and not coalesce($7::boolean,false)  and jenis_registrasi='P'  then perusahaan_nama end asc, 
          case when $6::text='penyewa' and coalesce($7::boolean,false) and jenis_registrasi='P' then perusahaan_nama end desc,
          case when $6::text='jml_unit' and not coalesce($7::boolean,false) then jml_unit end asc,
          case when $6::text='jml_unit' and coalesce($7::boolean,false) then jml_unit end desc,
          case when $6::text='jangka_waktu_bln' and not coalesce($7::boolean,false) then jangka_waktu_bln end asc,
          case when $6::text='jangka_waktu_bln' and coalesce($7::boolean,false) then jangka_waktu_bln end desc,
          case when $6::text='status' and not coalesce($7::boolean,false) then status end asc,
          case when $6::text='status' and coalesce($7::boolean,false) then status end desc,
          case when $6::text='tgl_request_menghuni' and not coalesce($7::boolean,false) then tgl_request_menghuni end asc,
          case when $6::text='tgl_request_menghuni' and coalesce($7::boolean,false) then tgl_request_menghuni end,
          case when $6::text='telpon' and not coalesce($7::boolean,false)  and jenis_registrasi='I' then kpj_telp end asc, 
          case when $6::text='telpon' and coalesce($7::boolean,false)  and jenis_registrasi='I'  then kpj_telp end desc,
          case when $6::text='telpon' and not coalesce($7::boolean,false)  and jenis_registrasi='P'  then perusahaan_pic_telp end asc, 
          case when $6::text='telpon' and coalesce($7::boolean,false) and jenis_registrasi='P' then perusahaan_pic_telp end desc,
          case when $6::text='waiting_list_no' and not coalesce($7::boolean,false) then waiting_list_no end asc,
          case when $6::text='waiting_list_no' and coalesce($7::boolean,false) then waiting_list_no end,
					waiting_list_no
			limit 
				case when coalesce($5::bigint,0)::bigint>0   then $5::bigint end 
			offset 
				case 
					when coalesce($5::bigint,0)::bigint>0 then  $5::bigint * (coalesce($4::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_no_reg', default: null },
      { name: 'p_search', default: null },
      { name: 'page', default: 1 }, // 4
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },

  getRegistrasiUnit: {
    text: `select unit.* ,
  	lantai.nama_lantai,
  	blok.nama_blok,
  	(select nama_rusun from rusun where kode_rusun=(select kode_rusun from rusun_lantai where id_lantai=unit.id_lantai)) nama_rusun,
  	reg.status,
  	f_tarif_unit_get_numeric(unit.id_unit) as tarif
  	from rusun_unit unit
  	 inner join registrasi_unit  reg_unit on unit.id_unit=reg_unit.id_unit
  	 inner join registrasi reg on reg_unit.no_registrasi=reg.no_registrasi
  	 inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  	 left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  	where
  	unit.aktif
  	and reg.no_registrasi=$1 and
  	(
  	coalesce($2::int,0)=0 or blok.id_rusun_blok=$2::int
  	) order by nama_blok,nama_lantai, nama_unit`,
    params: [
      'p_no',
      {
        name: 'p_id_blok',
        default: null
      }
    ]
  },

  getRegistrasiStatus: {
    text: `select
  						(select count(case when id_profil_penghuni is null then 1 else 0 end) count_profil
  							from registrasi_penghuni
  							where no_registrasi=$1
  						) count_profil,
  						(
  							select count(*) from registrasi_unit
  							where no_registrasi=$1
  						) count_unit`,
    params: ['p_no']
  },
  postRegistrasiPenghuni: {
    text: `select f_registrasi_penghuni_with_profils($1::text,$2::text,$3::json,$4::json) as ret`,
    params: [
      'p_pengguna',
      'p_noreg',
      {
        name: 'data_penghunis',
        type: 'array-json',
        data: [
          'id_unit',
          { name: 'penanggung_jawab', default: false },
          'kpj',
          'kpj_nama',
          { name: 'nik', default: null },
          { name: 'nik_jenis', default: null },
          'jenis_kelamin',
          { name: 'tgl_in', default: moment().format('YYYY-MM-DD') }
        ]
      },
      {
        name: 'data_profils',
        type: 'array-json',
        data: [
          { name: 'idProfil', default: null },
          { name: 'noRegistrasi', default: null },
          'kpj',
          'kpjNama',
          { name: 'tempatLahir', default: null },
          { name: 'tglLahir', default: moment().format('YYYY-MM-DD') },
          { name: 'jenisKelamin', default: null },
          { name: 'nik', default: null },
          { name: 'nikJenis', default: null },
          { name: 'nikAlamat', default: null },
          { name: 'anakKe', default: 1 },
          { name: 'nSaudara', default: 1 },
          { name: 'hobby', default: null },
          { name: 'prsGaji', default: 0 },
          { name: 'agama', default: null },
          { name: 'suku', default: null },
          { name: 'jenisKendaraan', default: null },
          { name: 'noKendaraan', default: null },
          { name: 'prsName', default: null },
          { name: 'prsFax', default: null },
          { name: 'prsStatusKerja', default: null },
          { name: 'prsMasaKerja', default: null },
          { name: 'prsAtasan', default: null },
          { name: 'prsAlamat', default: null },
          { name: 'prsTelp', default: null },
          { name: 'ayahNama', default: null },
          { name: 'ayahStatus', default: 'H' },
          { name: 'ibuName', default: null },
          { name: 'ibuStatus', default: 'H' },
          { name: 'ayahAlamat', default: null },
          { name: 'ayahTelp', default: null },
          { name: 'daruratNama', default: null },
          { name: 'daruratHubungan', default: null },
          { name: 'daruratAlamat', default: null },
          { name: 'daruratTelp', default: null }
        ]
      }
    ]
  },
  getRegistrasiLampiran: {
    text: `select * from registrasi_lampiran where aktif and no_registrasi=$1::text and kode_dokumen=$2::text`,
    params: ['p_noreg', 'p_dokumen']
  },
  postRegistrasiLampiran: {
    text: `select f_registrasi_lampiran_save($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_pengguna', 'p_noreg', 'p_dokumen', 'p_path']
  },
  getRegistrasiKontrak: {
    text: `select
  			kontrak.id_kontrak_sewa,
  			kontrak.no_kontrak_sewa,
  			reg.no_registrasi,
  			reg.kode_rusun,
  			reg.jenis_registrasi,
  			case when reg.jenis_registrasi='I' then 'INDIVIDU' else 'PERUSAHAAN' end nama_jenis_registrasi,
  			case when kontrak.id_kontrak_sewa is null then now() else kontrak.tgl_kontrak_sewa end tgl_kontrak_sewa,
  			case when kontrak.id_kontrak_sewa is null then reg.tgl_request_menghuni else kontrak.tgl_mulai_sewa end tgl_mulai_sewa,
  			case when kontrak.id_kontrak_sewa is null then reg.tgl_request_menghuni + (interval '1 month' * reg.jangka_waktu_bln)-interval '1 day' else kontrak.tgl_berakhir_sewa end tgl_berakhir_sewa,
  			case when kontrak.id_kontrak_sewa is null then 1 else kontrak.jmlh_bulan_deposit end jmlh_bulan_deposit,
  			case when kontrak.id_kontrak_sewa is null then 1 else kontrak.inv_periode_bulan end inv_periode_bulan,
  			case when kontrak.id_kontrak_sewa is null then 25 else kontrak.inv_duedate end inv_duedate,
  			case when kontrak.id_kontrak_sewa is null then 0 else kontrak.biaya_administrasi end biaya_administrasi,
  			case when kontrak.id_kontrak_sewa is null then 10 else kontrak.biaya_denda end biaya_denda,
  			case when kontrak.id_kontrak_sewa is null then 10 else kontrak.inv_keterlambatan_hari_bayar end inv_keterlambatan_hari_bayar,
  			case when kontrak.id_kontrak_sewa is null then 25 else kontrak.inv_duedate_utilitas end inv_duedate_utilitas,
  			case when kontrak.id_kontrak_sewa is null then reg.kpj else kontrak.pihak2_kpj end pihak2_kpj,
  			case when kontrak.id_kontrak_sewa is null then reg.kpj_nama else kontrak.pihak2_nama_lengkap end pihak2_nama_lengkap,
  			case when kontrak.id_kontrak_sewa is null then reg.npp else kontrak.pihak2_npp end pihak2_npp,
  			case when kontrak.id_kontrak_sewa is null then reg.perusahaan_nama else kontrak.pihak2_nama_perusahaan end pihak2_nama_perusahaan,
  			case when kontrak.id_kontrak_sewa is null then reg.kpj_nama else kontrak.pihak2_jabatan end pihak2_jabatan,
  			case when kontrak.id_kontrak_sewa is null then reg.perusahaan_alamat else kontrak.pihak2_alamat end pihak2_alamat,
  			case when kontrak.id_kontrak_sewa is null then kpj_telp else kontrak.pihak2_telpon end pihak2_telpon,
  			case
  				when kontrak.id_kontrak_sewa is null then
  					case when reg.jenis_registrasi='I' then 'PENYEWA' else null end
  				else kontrak.pihak2_ttd_title
  			end pihak2_ttd_title,
  			case
  				when kontrak.id_kontrak_sewa is null then
  					case when reg.jenis_registrasi='I' then  reg.kpj_nama else null end
  				else kontrak.pihak2_ttd_nama
  			end pihak2_ttd_nama,
  			case
  				when kontrak.id_kontrak_sewa is null then null
  				else kontrak.pihak2_ttd_jabatan
  			end pihak2_ttd_jabatan,
  			reg.jml_unit,
  			reg.jangka_waktu_bln,
  			case
  				when kontrak.id_kontrak_sewa is null then  mgr.submit_kontrak_pihak1_nama_lengkap
  				else pihak1_nama_lengkap
  			end pihak1_nama_lengkap,
  			case
  				when kontrak.id_kontrak_sewa is null then  mgr.submit_kontrak_pihak1_jabatan
  				else pihak1_jabatan
  			end pihak1_jabatan,
  			case
  				when kontrak.id_kontrak_sewa is null then  mgr.submit_kontrak_pihak1_ttd_title
  				else pihak1_ttd_title
  			end pihak1_ttd_title,
  			case
  				when kontrak.id_kontrak_sewa is null then  mgr.submit_kontrak_pihak1_ttd_nama
  				else pihak1_ttd_nama
  			end pihak1_ttd_nama,
  			case
  				when kontrak.id_kontrak_sewa is null then  mgr.submit_kontrak_pihak1_ttd_jabatan
  				else pihak1_ttd_jabatan
  			end pihak1_ttd_jabatan,
  			case when kontrak.id_kontrak_sewa is null then 'A'::text else kontrak.golongan_invoice end golongan_invoice,
  			kontrak.signed, kontrak.kontrak_berlaku,kontrak.kontrak_berakhir,kontrak.approval	, kontrak.status
  		from
  			registrasi reg
  			left outer join kontrak_sewa kontrak on reg.no_registrasi=kontrak.no_registrasi and kontrak.aktif
  			left outer join rusun_mgr_setting_db mgr on mgr.kode_rusun=reg.kode_rusun
  		where reg.no_registrasi=$1`,
    params: ['p_no']
  },
  // postRegistrasiKontrak: {
  //   text: `select f_registrasi_submit($1::text,$2::text,$3::json) as ret`,
  //   params: [
  //     'p_pengguna',
  //     'p_noreg',
  //     {
  //       name: 'data_kontrak',
  //       type: 'json',
  //       data: [
  //         'noReg',
  //         { name: 'tglKontrak', default: moment().format('YYYY-MM-DD') },
  //         { name: 'tglMulaiSewa', default: moment().format('YYYY-MM-DD') },
  //         { name: 'tglAkhirSewa', default: moment().format('YYYY-MM-DD') },
  //         { name: 'jmlhBlnDeposit', default: 1 },
  //         { name: 'blnInvoice', default: 1 },
  //         { name: 'tglInvoice', default: 25 },
  //         { name: 'hariKeterlambatan', default: 10 },
  //         { name: 'tglPenagihanUtilitas', default: 25 },
  //         { name: 'hariKeterlambatanUtilitas', default: 10 },
  //         { name: 'golInvoice', default: 'A' },
  //         { name: 'pihak1Nama', default: null },
  //         { name: 'pihak1Jabatan', default: null },
  //         { name: 'pihak1TtdTitle', default: null },
  //         { name: 'pihak1TtdTitle', default: null },
  //         { name: 'pihak1TtdNama', default: null },
  //         { name: 'pihak1TtdJabatan', default: null },
  //         { name: 'pihak2Kpj', default: null },
  //         { name: 'pihak2KpjNama', default: null },
  //         { name: 'pihak2Npp', default: null },
  //         { name: 'pihak2PrsNama', default: null },
  //         { name: 'pihak2Jabatan', default: null },
  //         { name: 'pihak2PrsAlamat', default: null },
  //         { name: 'pihak2PrsTelp', default: null },
  //         { name: 'pihak2TtdTitle', default: null },
  //         { name: 'pihak2TtdNama', default: null },
  //         { name: 'pihak2TtdJabatan', default: null },
  //         { name: 'biayaAdministrasi', default: 0 },
  //         { name: 'biayaAdministrasiByProsen', default: false },
  //         { name: 'nominalDenda', default: 10 },
  //         { name: 'nominalDendaByProsen', default: true }
  //       ]
  //     }
  //   ]
  // },
  // getRegistrasiWL: {
  //   text: `select
  // 				( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris,
  // 				(count(*) OVER())::int AS full_count_baris,
  // 				t.*
  // 			from (
  // 				select
  // 					reg.no_registrasi, jenis_registrasi, kpj, kode_jenis_kelamin, kpj_nama, kpj_telp, kpj_email, npp, perusahaan_nama, perusahaan_departemen, perusahaan_alamat,
  // 					perusahaan_telp, perusahaan_pic, perusahaan_email, reg.hunian_keluarga, reg.kode_rusun, unit.kode_unit_jenis,  jml_unit, tgl_request_menghuni, jangka_waktu_bln,
  // 						unit.id_unit,blok.kode_blok, unit.nama_unit,reg_unit.waiting_no, unit.no_unit, lantai.no_lantai,
  // 						reg_unit.id_registrasi_unit,
  // 						t.no_registrasi no_registrasi_processed,
  // 						f_registrasi_check_wl(reg_unit.no_registrasi, reg_unit.id_unit) status_wl,
  // 						reg_unit.process,reg_unit.waiting_list, reg_unit.aktif
  // 				from registrasi reg
  // 					inner join registrasi_unit reg_unit on reg.no_registrasi=reg_unit.no_registrasi
  // 					inner join rusun_unit unit on reg_unit.id_unit=unit.id_unit
  // 					inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 					left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
  // 					left outer join (
  // 						select no_registrasi, id_unit
  // 						from registrasi_unit
  // 						where aktif and process
  // 						limit 1
  // 					) t on t.id_unit=reg_unit.id_unit
  // 				where
  // 					reg.aktif and
  // 					reg_unit.aktif and waiting_list
  // 					and reg.kode_rusun=$1::text
  // 					and reg.jenis_registrasi='I'
  // 					and ( coalesce($2::text,'')='' or reg.no_registrasi=$2::text)
  // 					and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 					and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 					and ( coalesce($5::int,0)=0 or unit.id_unit=$5::int)
  // 					and (
  // 						$7::text=''
  // 						or unit.nama_unit like '%' || $7::text || '%'
  // 						or kpj like '%' || $7::text || '%'
  // 						or kpj_nama like '%' || $7::text || '%'
  // 						or perusahaan_nama like '%' || $7::text || '%'
  // 						or reg.no_registrasi like '%' || $7::text || '%'
  // 					)
  // 			) t
  // 		where
  // 			 (
  // 				 coalesce($6::text,'')=''
  // 				 or ( coalesce($6::text,'')='S' and status_wl=0 )
  // 				 or ( coalesce($6::text,'')='W' and status_wl<>0 )
  // 				)
  // 		order by
  // 			case when $10::text='noReg' and not coalesce($11::boolean,false) then no_registrasi end asc,
  // 			case when $10::text='noReg' and coalesce($11::boolean,false) then no_registrasi end desc,
  // 			case when $10::text='jenisReg' and not coalesce($11::boolean,false) then jenis_registrasi end asc,
  // 			case when $10::text='jenisReg' and coalesce($11::boolean,false) then jenis_registrasi end desc,
  // 			case when $10::text='nama' and not coalesce($11::boolean,false) then kpj_nama end asc,
  // 			case when $10::text='nama' and coalesce($11::boolean,false) then kpj_nama end desc,
  // 			case when $10::text='prs' and not coalesce($11::boolean,false) then perusahaan_nama end asc,
  // 			case when $10::text='prs' and coalesce($11::boolean,false) then perusahaan_nama end desc,
  // 			case when $10::text='jangkaWaktu' and not coalesce($11::boolean,false) then jangka_waktu_bln end asc,
  // 			case when $10::text='jangkaWaktu' and coalesce($11::boolean,false) then jangka_waktu_bln end desc,
  // 			case when $10::text='unit' and not coalesce($11::boolean,false) then no_unit end asc,
  // 			case when $10::text='unit' and coalesce($11::boolean,false) then no_unit end desc,
  // 			case when $10::text='status' and not coalesce($11::boolean,false) then status_wl end asc,
  // 			case when $10::text='status' and coalesce($11::boolean,false) then status_wl end desc,
  // 			id_unit, waiting_no
  // 		limit
  // 			case when coalesce($9::bigint,0)::bigint>0   then $9::bigint end
  // 		offset
  // 			case
  // 				when coalesce($9::bigint,0)::bigint>0 then  $9::bigint * (coalesce($8::int,1)-1)
  // 			end`,
  //   params: [
  //     'p_rusun',
  //     { name: 'p_no_reg', default: null },
  //     { name: 'p_id_blok', default: null },
  //     { name: 'p_id_lantai', default: null },
  //     { name: 'p_id_unit', default: null }, // 5
  //     { name: 'p_status', default: null },
  //     { name: 'p_search', default: null },
  //     {name: 'page', default: 1}, // 8
  //     {name: 'itemsPerPage', default: null},
  //     {name: 'sortBy', default: null},
  //     {name: 'sortDesc', default: null}
  //   ]
  // },

  // delRegistrasiWL: {
  //   text: `select f_registrasi_waiting_list_delete($1::text,$2::bigint) as ret`,
  //   params: ['p_pengguna', 'p_id_registrasi_unit']
  // },
  delRegistrasiWL: {
    text: `select f_registrasi_waiting_list_delete($1::text,$2::text) as ret`,
    params: ['p_pengguna', 'p_no_registrasi']
  },
  resetRegistrasiWL: {
    text: `select f_registrasi_waiting_reset_no($1::text,$2::text,$3::boolean) as ret`,
    params: [
      'p_pengguna',
      'p_kode_rusun',
      { name: 'p_by_tgl_req_menghuni', default: 'false' }
    ]
  },
  getRegistrasiAvailableStep: {
    text: `select available_step, count_wl, status_process_wl, 
							case 
								when available_step=2 and count_penghuni<>count_profil then 1
								when available_step=2 and count_penghuni=count_profil then 2
								when available_step=4 and status ='D'   then 3
								when available_step=4 and status <>'D'   then 4
								else available_step-1
							end completed_step
						from (
							select 
								available_step,
								registrasi.status,
								sum(
									case
										when registrasi_unit.waiting_list and  not registrasi_unit.process  then 1
										else 0
									end 
								) count_wl,
								sum(
									case 
										when f_registrasi_check_wl(registrasi.no_registrasi,coalesce(registrasi_unit.id_unit,0)) = 0 then 0
										else -1
									end 
								) status_process_wl,
								sum(
									case 
										when id_registrasi_penghuni is null then 0 
										else 1
									end 
								) count_penghuni,
								sum(
									case 
										when id_profil_penghuni is null then 0 
										else 1
									end 
								) count_profil
							from registrasi 
									left outer join registrasi_unit on registrasi.no_registrasi=registrasi_unit.no_registrasi 
										and registrasi_unit.aktif
									left outer join registrasi_penghuni penghuni on penghuni.no_registrasi=registrasi.no_registrasi and penghuni.aktif
							where registrasi.no_registrasi=$1::text
							group by available_step,registrasi.status
						) t`,
    params: ['p_noreg']
  },
  getRegistrasiCekUnit: {
    text: `select f_registrasi_check_wl($1::text,$2::int) as ret`,
    params: ['p_noreg', 'p_id_unit']
  },
  delRegistrasiCancel: {
    text: `select f_registrasi_cancel($1::text,$2::text,$3::text) as ret`,
    params: ['p_pengguna', 'p_noreg', { name: 'p_alasan', default: null }]
  }
  // getRegistrasiCariTenant: {
  //   text: `select f_registrasi_cek_tenant($1::text,$2::text,$3::text,$4::text) as ret`,
  //   params: ['p_jenis_registrasi', 'p_kpj', 'p_nik', 'p_npp']
  // }
}
