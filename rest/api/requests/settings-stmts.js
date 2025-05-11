/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
  getSettingsAgama: {
    text: `select * from kode_agama where 
		(kode_agama=$1::text or $1::text='')
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsAgama: {
    text: `select f_settings_agama_save($1::text, $2::text, $3::text,$4::boolean,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsAgama: {
    text: `select f_settings_agama_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsJenisKelamin: {
    text: `select * from kode_jenis_kelamin  where 
		(kode_jenis_kelamin=$1::text or $1::text='')
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsJenisKelamin: {
    text: `select f_settings_jenis_kelamin_save($1::text, $2::text, $3::text,$4::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_act', default: null }
    ]
  },
  delSettingsJenisKelamin: {
    text: `select f_settings_jenis_kelamin_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsJenisKendaraan: {
    text: `select * from kode_jenis_kendaraan   where 
		(kode_jenis_kendaraan=$1::text or $1::text='')		
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsJeniKendaraan: {
    text: `select f_settings_jenis_kendaraan_save($1::text, $2::text, $3::text,$4::boolean,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsJenisKendaraan: {
    text: `select f_settings_jenis_kendaraan_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsStatusPekerjaan: {
    text: `select * from kode_status_pekerjaan  where 
		(kode_status_pekerjaan=$1::text or $1::text='')
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsStatusPekerjaan: {
    text: `select f_settings_status_pekerjaan_save($1::text, $2::text, $3::text,$4::boolean,$5::text) as ret`,
    params: [
      'p_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsStatusPekerjaan: {
    text: `select f_settings_status_pekerjaan_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsJenisNik: {
    text: `select * from kode_jenis_nik where 
		(kode_jenis_nik=$1::text or $1::text='')
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsJenisNik: {
    text: `select f_settings_jenis_nik_save($1::text, $2::text, $3::text,$4::boolean,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsJenisNik: {
    text: `select f_settings_jenis_nik_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsTipeOut: {
    text: `select * from kode_tipe_out where 
		(kode_tipe_out=$1::text or $1::text='')
		and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsTipeOut: {
    text: `select f_settings_tipe_out_save($1::text, $2::text, $3::text,$4::boolean,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsTipeOut: {
    text: `select f_settings_tipe_out_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsKantor: {
    text: `select 
		( (row_number() over()) + coalesce($4::bigint,10) * (coalesce($3::int,1)-1) )::int nomor_baris, 
		(count(*) OVER())::int AS full_count_baris,
		kode_kantor.* ,(select nama_kantor from kode_kantor k where k.kode_kantor=kode_kantor.kode_kantor_induk ) nama_kantor_induk
		from kode_kantor 
		where 
			(kode_kantor=$1::text or $1::text='')
			and ($2::boolean is null or aktif=$2::boolean)
			order by 
			case when $5::text='kodeKantor' and not coalesce($6::boolean,false) then kode_kantor end asc, 
			case when $5::text='kodeKantor' and coalesce($6::boolean,false) then kode_kantor end desc,
			case when $5::text='namaKantor' and not coalesce($6::boolean,false) then nama_kantor  end asc, 
			case when $5::text='namaKantor' and coalesce($6::boolean,false) then nama_kantor end desc,
			case when $5::text='jenisKantor' and not coalesce($6::boolean,false) then jenis_kantor  end asc, 
			case when $5::text='jenisKantor' and coalesce($6::boolean,false) then jenis_kantor end desc,
			kode_kantor.tgl_rekam desc
		limit 
			case when coalesce($4::bigint,0)::bigint>0   then $4::bigint end 
		offset 
			case 
				when coalesce($4::bigint,0)::bigint>0 then  $4::bigint * (coalesce($3::int,1)-1)
			end`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 3
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsKantor: {
    text: `select f_settings_kantor_save($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text,$8::boolean,$9::text) as ret`,
    params: [
      'p_pengguna',
      'p_kode',
      { name: 'p_induk', default: null },
      'p_nama',
      'p_jenis',
      { name: 'p_alamat', default: null },
      { name: 'p_keterangan', default: null },
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsKantor: {
    text: `select f_settings_kantor_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsRusun: {
    text: `select 
				( (row_number() over()) + coalesce($4::bigint,10) * (coalesce($3::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				rusun.* , kantor.nama_kantor
			from 
				rusun
				inner join kode_kantor kantor on kantor.kode_kantor=rusun.kode_kantor
			where 
				(kode_rusun=$1::text or $1::text='')
				and ($2::boolean is null or rusun.aktif=$2::boolean)
				order by 
				case when $5::text='kodeRusun' and not coalesce($6::boolean,false) then rusun.kode_rusun  end asc, 
				case when $5::text='kodeRusun' and coalesce($6::boolean,false) then rusun.kode_rusun end desc,
				case when $5::text='namaRusun' and not coalesce($6::boolean,false) then rusun.nama_rusun  end asc, 
				case when $5::text='namaRusun' and coalesce($6::boolean,false) then rusun.nama_rusun end desc,
				case when $5::text='kodeKantor' and not coalesce($6::boolean,false) then rusun.kode_kantor  end asc, 
				case when $5::text='kodeKantor' and coalesce($6::boolean,false) then rusun.kode_kantor end desc,
				case when $5::text='lokasi' and not coalesce($6::boolean,false) then rusun.lokasi  end asc, 
				case when $5::text='lokasi' and coalesce($6::boolean,false) then rusun.lokasi end desc,
				rusun.tgl_rekam desc
			limit 
				case when coalesce($4::bigint,0)::bigint>0   then $4::bigint end 
			offset 
				case 
					when coalesce($4::bigint,0)::bigint>0 then  $4::bigint * (coalesce($3::int,1)-1)
				end`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 3
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsRusun: {
    text: `select f_settings_rusun_save($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text ,$10::text, $11::text,$12::text,$13::text,$14::boolean,$15::text) as ret`,
    params: [
      'p_pengguna',
      'p_kode',
      'p_kantor',
      'p_nama',
      { name: 'p_lokasi', defualt: null },
      { name: 'p_provinsi', default: null },
      { name: 'p_kecamatan', default: null },
      { name: 'p_latitude', default: null },
      { name: 'p_longitude', default: null },
      { name: 'p_fax', default: null },
      { name: 'p_telpon', default: null },
      { name: 'p_initial_rusun', default: null },
      { name: 'p_initial_daerah', default: null },
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsRusun: {
    text: `select f_settings_rusun_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsLantai: {
    text: `select 
				( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				lantai.* , blok.nama_blok, (select nama_rusun from rusun where kode_rusun=lantai.kode_rusun) nama_rusun
			from 
				rusun_lantai  lantai
				left join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where 
				lantai.kode_rusun=$1::text 
				and (id_lantai=$2::int or coalesce($2::int,0)=0)
				and ($3::text='' or nama_lantai ilike '%' || $3::text || '%')
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and ($5::boolean is null or lantai.aktif=$5::boolean)
			order by 
				case when $8::text='namaLantai' and not coalesce($9::boolean,false) then nama_lantai  end asc, 
				case when $8::text='namaLantai' and coalesce($9::boolean,false) then nama_lantai end desc,
				case when $8::text='noLantai' and not coalesce($9::boolean,false) then no_lantai  end asc, 
				case when $8::text='noLantai' and coalesce($9::boolean,false) then no_lantai end desc,
				case when $8::text='blok' and not coalesce($9::boolean,false) then nama_blok  end asc, 
				case when $8::text='blok' and coalesce($9::boolean,false) then nama_blok end desc,
				lantai.tgl_rekam desc
			limit 
				case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end 
			offset 
				case 
					when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_id', default: 0 },
      { name: 'p_nama', default: '' },
      { name: 'p_blok', default: null },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsLantai: {
    text: `select f_settings_lantai_save($1::text, $2::int, $3::text, $4::int, $5::smallint, $6::text,$7::boolean,$8::text) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id', default: null },
      'p_rusun',
      { name: 'p_id_blok', default: null },
      'p_no',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsLantai: {
    text: `select f_settings_lantai_non_aktif($1::text, $2::int) as ret`,
    params: ['p_kode_pengguna', 'p_id']
  },
  getSettingsUnitJenis: {
    text: `select 
			( (row_number() over()) + coalesce($4::bigint,10) * (coalesce($3::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			kode_unit_jenis.* 
		from kode_unit_jenis 
		where 
		( $1::text='' or kode_unit_jenis=$1::text)
		and ($2::boolean is null or aktif=$2::boolean)
		order by 
				case when $5::text='kodeJenisUnit' and not coalesce($6::boolean,false) then kode_unit_jenis  end asc, 
				case when $5::text='kodeJenisUnit' and coalesce($6::boolean,false) then kode_unit_jenis end desc,
				case when $5::text='namaJenisUnit' and not coalesce($6::boolean,false) then nama_unit_jenis  end asc, 
				case when $5::text='namaJenisUnit' and coalesce($6::boolean,false) then nama_unit_jenis end desc,
				kode_unit_jenis.tgl_rekam desc
			limit 
				case when coalesce($4::bigint,0)::bigint>0   then $4::bigint end 
			offset 
				case 
					when coalesce($4::bigint,0)::bigint>0 then  $4::bigint * (coalesce($3::int,1)-1)
				end`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 5
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsUnitJenis: {
    text: `select f_settings_unit_jenis_save($1::text, $2::text,$3::text, $4::boolean,$5::boolean,$6::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_disewakan', default: true },
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsUnitJenis: {
    text: `select f_settings_unit_jenis_non_aktif($1::text, $2::text) as ret`,
    params: ['p_kode_pengguna', 'p_kode']
  },
  getSettingsUnit: {
    text: `select 
				( (row_number() over()) + coalesce($8::bigint,10) * (coalesce($7::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				lantai.nama_lantai,
				lantai.no_lantai,
				jenis.nama_unit_jenis,
				blok.nama_blok, lantai.id_rusun_blok,lantai.kode_rusun,blok.nama_blok, 
				(select nama_rusun from rusun where kode_rusun=lantai.kode_rusun) nama_rusun,
				unit.*
			from 
				rusun_unit unit
				inner join rusun_lantai lantai on lantai.id_lantai=unit.id_lantai
				inner join kode_unit_jenis jenis on jenis.kode_unit_jenis=unit.kode_unit_jenis
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where
				lantai.kode_rusun=$1::text
				and (coalesce($2::int,0)=0 or unit.id_lantai=$2::int)
				and ($3::text='' or unit.kode_unit_jenis=$3::text)
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or unit.id_unit=$5::int)
				and ($6::boolean is null or unit.aktif=$6::boolean)
			order by 
				case when $9::text='namaBlok' and not coalesce($10::boolean,false) then blok.nama_blok  end asc, 
				case when $9::text='namaBlok' and coalesce($10::boolean,false) then blok.nama_blok end desc,
				case when $9::text='noUnit' and not coalesce($10::boolean,false) then unit.no_unit  end asc, 
				case when $9::text='noUnit' and coalesce($10::boolean,false) then unit.no_unit end desc,
				case when $9::text='namaLantai' and not coalesce($10::boolean,false) then lantai.nama_lantai  end asc, 
				case when $9::text='namaLantai' and coalesce($10::boolean,false) then lantai.nama_lantai end desc,
				case when $9::text='noLantai' and not coalesce($10::boolean,false) then lantai.no_lantai end asc, 
				case when $9::text='noLantai' and coalesce($10::boolean,false) then lantai.no_lantai end desc,
				case when $9::text='jenisUnit' and not coalesce($10::boolean,false) then jenis.nama_unit_jenis  end asc, 
				case when $9::text='jenisUnit' and coalesce($10::boolean,false) then jenis.nama_unit_jenis end desc,
				case when $9::text='namaUnit' and not coalesce($10::boolean,false) then unit.nama_unit  end asc, 
				case when $9::text='namaUnit' and coalesce($10::boolean,false) then unit.nama_unit end desc,
				unit.tgl_rekam desc nulls last
			limit 
				case when coalesce($8::bigint,0)::bigint>0   then $8::bigint end 
			offset 
				case 
					when coalesce($8::bigint,0)::bigint>0 then  $8::bigint * (coalesce($7::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_lantai', default: null },
      { name: 'p_jenis', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id', default: null },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 7
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsUnit: {
    text: `select f_settings_unit_save($1::text, $2::int,$3::text,$4::int, $5::smallint, $6::text,$7::text,$8::boolean,$9::boolean,$10::text) as ret`,
    params: [
      'p_pengguna',
      'p_id',
      'p_jenis',
      'p_lantai',
      { name: 'p_no', default: null },
      'p_nama',
      { name: 'p_gol_listrik', default: null },
      { name: 'p_aktif', default: true },
      { name: 'p_rented', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsUnit: {
    text: `select f_settings_unit_non_aktif($1::text, $2::int) as ret`,
    params: ['p_pengguna', 'p_id']
  },
  getSettingsBlok: {
    text: `select 
					blok.* , (select nama_rusun from rusun where kode_rusun=blok.kode_rusun) nama_rusun
				from rusun_blok blok 
				where 
					blok.kode_rusun=coalesce($1::text,'')
					and (coalesce($2::text,'')='' or $2::text=kode_blok)
					and (coalesce($3::int,0)=0 or $3::int=id_rusun_blok)
					and ($4::boolean  is null or aktif=$4::boolean)
				order by 
					blok.tgl_rekam desc  nulls last`,
    params: [
      'p_rusun',
      { name: 'p_kode', default: '' },
      { name: 'p_id', default: null },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsBlok: {
    text: `select f_settings_blok_save($1::text,$2::int, $3::text, $4::text,$5::text,$6::boolean,$7::text) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id', default: null },
      'p_kode',
      'p_rusun',
      'p_nama',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsBlok: {
    text: `select f_settings_blok_non_aktif($1::text, $2::int) as ret`,
    params: ['p_kode_pengguna', 'p_id']
  },
  getSettingsBlokExclude: {
    text: `select blok.nama_blok, blok_ex.*
			from 
				rusun_blok_exclude blok_ex
				inner join kode_blok blok on blok_ex.kode_blok=blok.kode_blok
			where
				blok_ex.kode_rusun=$1::text
				and ($2::text='' or blok_ex.kode_blok=$2::text)
				and ($3::boolean is null or blok_ex.aktif=$3::boolean)`,
    params: [
      'p_rusun',
      { name: 'p_blok', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsBlokExclude: {
    text: `select f_settings_blok_exclude_save($1::text, $2::text, $3::text) as ret`,
    params: ['p_pengguna', 'p_rusun', 'p_blok']
  },
  putSettingsBlokExclude: {
    text: `select f_settings_blok_exclude_edit($1::text, $2::text, $3::text,$4::text,$5::text) as ret`,
    params: ['p_pengguna', 'p_rusun', 'p_blok', 'p_rusun_old', 'p_blok_old']
  },
  delSettingsBlokExclude: {
    text: `select f_settings_blok_exclude_non_aktif($1::text, $2::text, $3::text) as ret`,
    params: ['p_pengguna', 'p_rusun', 'p_blok']
  },
  getSettingsPengguna: {
    text: `WITH RECURSIVE cte AS (
      SELECT kode_kantor, nama_kantor, 1 AS level
      FROM   kode_kantor
      WHERE kode_kantor = coalesce($2::text,'')          
      UNION  ALL
      SELECT t.kode_kantor, t.nama_kantor, c.level + 1 as level
      FROM   cte      c
      JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
    )
  select 
      ( (row_number() over()) + coalesce($6::bigint,10) * (coalesce($5::int,1)-1) )::int nomor_baris, 
      (count(*) OVER())::int AS full_count_baris,kantor.kode_kantor, kantor.nama_kantor,rusun.nama_rusun,
      kode_pengguna, nama_pengguna, departemen, nama_atasan, email, last_login, last_change_pass, 
      pengguna.aktif, pengguna.tgl_na, pengguna.petugas_na, pengguna.locked, tgl_locked, pengguna.tgl_rekam, 
      pengguna.petugas_rekam, pengguna.tgl_ubah, 
      pengguna.petugas_ubah, pengguna.kode_rusun,
      (
        select json_agg(t) from (
          select p_role.kode_role, jenis_kantor, nama_role, p_role.aktif
          from 
            pengguna_role p_role
            left outer join  kode_role k_role on p_role.kode_role=k_role.kode_role
          where kode_pengguna= pengguna.kode_pengguna and p_role.aktif
        ) t
      ) pengguna_role		
    from 
      pengguna
      inner join kode_kantor kantor on kantor.kode_kantor=pengguna.kode_kantor
      left outer join rusun on rusun.kode_rusun=pengguna.kode_rusun
    where
      (coalesce($1::text,'')<>'' and pengguna.kode_pengguna =$1::text)
      or(
        coalesce($2::text)<>''
        and
        kantor.kode_kantor in (select kode_kantor from cte)
        and (
          coalesce($3::text,'')=''
          or nama_pengguna ilike '%' || $3::text || '%'	
          or pengguna.kode_pengguna ilike '%' || $3::text || '%'	
        )
        and ($4::boolean is null  or pengguna.aktif=$4::boolean)
      )
      order by 
        case when $7::text='kodePengguna' and not coalesce($8::boolean,false) then kode_pengguna end asc, 
        case when $7::text='kodePengguna' and coalesce($8::boolean,false) then kode_pengguna end desc,
        case when $7::text='namaPengguna' and not coalesce($8::boolean,false) then nama_pengguna end asc, 
        case when $7::text='namaPengguna' and coalesce($8::boolean,false) then nama_pengguna end desc,
        case when $7::text='namaKantor' and not coalesce($8::boolean,false) then  kantor.nama_kantor end asc, 
        case when $7::text='namaKantor' and coalesce($8::boolean,false) then  kantor.nama_kantor end desc,
        pengguna.tgl_rekam desc
      limit 
        case when coalesce($6::bigint,0)::bigint>0   then $6::bigint end 
      offset 
        case 
          when coalesce($6::bigint,0)::bigint>0 then  $6::bigint * (coalesce($5::int,1)-1)
        end`,
    params: [
      { name: 'p_pengguna', default: '' },
      { name: 'p_kantor', default: '' },
      { name: 'p_search', default: '' },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 5
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postSettingsPengguna: {
    text: `select f_settings_pengguna_save($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::boolean, $11::boolean,$12::json) as ret`,
    params: [
      'p_petugas',
      { name: 'p_kode', default: null },
      'p_nama',
      'p_kantor',
      { name: 'p_rusun', default: null },
      { name: 'p_departemen', default: null },
      { name: 'p_atasan', default: null },
      { name: 'p_email', default: null },
      { name: 'p_password', default: null },
      { name: 'p_aktif', default: false },
      { name: 'p_locked', default: false },
      {
        name: 'p_roles',
        type: 'array-json',
        data: ['kode_role']
      }
    ]
  },
  putSettingsPengguna: {
    text: `select f_settings_pengguna_save($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::boolean, $11::boolean,$12::json) as ret`,
    params: [
      'p_petugas',
      'p_kode',
      'p_nama',
      'p_kantor',
      { name: 'p_rusun', default: null },
      { name: 'p_departemen', default: null },
      { name: 'p_atasan', default: null },
      { name: 'p_email', default: null },
      { name: 'p_password', default: null },
      { name: 'p_aktif', default: null },
      { name: 'p_locked', default: false },
      {
        name: 'p_roles',
        type: 'array-json',
        data: ['kode_role', 'jenis_kantor']
      }
    ]
  },
  putSettingsPenggunaChangePassword: {
    text: `select f_settings_pengguna_set_password($1::text, $2::text, true::boolean, $3::text, $4::text) as ret`,
    params: ['p_petugas', 'p_kode', 'p_password_old', 'p_password_new']
  },
  putSettingsPenggunaResetPassword: {
    text: `select f_settings_pengguna_reset_password($1::text, $2::text, $3::text) as ret`,
    params: ['p_petugas', 'p_kode', 'p_password']
  },
  getSettingsPenggunaRole: {
    text: `select * from kode_role
		where $1::boolean is null or aktif=$1`,
    params: [{ name: 'p_aktif', default: null }]
  },
  getTarifLantai: {
    text: `select 
					( (row_number() over()) + coalesce($8::bigint,10) * (coalesce($7::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					lantai.no_lantai, nama_lantai,jenis.nama_unit_jenis,
					blok.nama_blok,blok.id_rusun_blok,
					tarif.* ,
					case 
						when exists(select null from tarif_lantai where aktif and id_tarif_lantai_edited=tarif.id_tarif_lantai) then true
						else false
					end edited,
					(
						select row_to_json(t) from(
							select 
								id_tarif_lantai,tgl_mulai,tgl_berakhir,tarif,
								case when tgl_mulai>tarif.tgl_berakhir then 'AFTER' else 'BEFORE' end periode
							from tarif_lantai
							where aktif and id_lantai=tarif.id_lantai and kode_unit_jenis=tarif.kode_unit_jenis
							and id_tarif_lantai<>tarif.id_tarif_lantai
							and (
								approval 
								or (not approval and status='S') 
							)
							limit 1
						) t
					) tarif_lain
				from 
					tarif_lantai tarif
					inner join rusun_lantai lantai on lantai.id_lantai=tarif.id_lantai
					inner join kode_unit_jenis jenis on jenis.kode_unit_jenis=tarif.kode_unit_jenis
					left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
				where
					lantai.kode_rusun=$1::text
					and ($2::int=0 or lantai.id_lantai=$2::int)
					and ($3::text='' or tarif.kode_unit_jenis=$3::text)
					and (coalesce($4::text,'')='' or tarif.status=$4::text)
					and ($5::int=0 or tarif.id_tarif_lantai=$5::int)
					and ($6::boolean is null or tarif.aktif=$6::boolean)
					and (coalesce($11::int,0)=0 or blok.id_rusun_blok=$11::int)
				order by 
					case when $9::text='lantai' and not coalesce($10::boolean,false) then no_lantai  end asc, 
					case when $9::text='lantai' and coalesce($10::boolean,false) then no_lantai end desc,
					case when $9::text='jnsUnit' and not coalesce($10::boolean,false) then jenis.nama_unit_jenis  end asc, 
					case when $9::text='jnsUnit' and coalesce($10::boolean,false) then jenis.nama_unit_jenis end desc,
					case when $9::text='tanggalMulai' and not coalesce($10::boolean,false) then tarif.tgl_mulai  end asc, 
					case when $9::text='tanggalMulai' and coalesce($10::boolean,false) then tarif.tgl_mulai end desc,
					case when $9::text='tanggalBerakhir' and not coalesce($10::boolean,false) then tarif.tgl_berakhir  end asc, 
					case when $9::text='tanggalBerakhir' and coalesce($10::boolean,false) then tarif.tgl_berakhir end desc,
					case when $9::text='statusApproval' and not coalesce($10::boolean,false) then tarif.status  end asc, 
					case when $9::text='statusApproval' and coalesce($10::boolean,false) then tarif.status end desc,
					case when $9::text='statusAktif' and not coalesce($10::boolean,false) then tarif.aktif  end asc, 
					case when $9::text='statusAktif' and coalesce($10::boolean,false) then tarif.aktif end desc,
					case when $9::text='tarif' and not coalesce($10::boolean,false) then tarif.tarif  end asc, 
					case when $9::text='tarif' and coalesce($10::boolean,false) then tarif.tarif end desc,
					tarif.tgl_rekam desc
				limit 
					case when coalesce($8::bigint,0)::bigint>0   then $8::bigint end 
				offset 
					case 
						when coalesce($8::bigint,0)::bigint>0 then  $8::bigint * (coalesce($7::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_id_lantai', default: 0 },
      { name: 'p_jenis', default: '' },
      { name: 'p_status', default: null },
      { name: 'p_id', default: 0 },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 7
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_id_blok', default: null }
    ]
  },
  getTarifLantaiLastPeriod: {
    text: `select id_tarif_lantai,tgl_mulai,tgl_berakhir,tarif  
			from tarif_lantai
			where 
				aktif and id_lantai=$1::int and kode_unit_jenis=$2::text
				and (coalesce($3::int,0)=0 or id_tarif_lantai<>$3::int)
				and (
					approval 
					or (not approval and status='S') 
				)
			order by tgl_berakhir desc
			limit 1
		`,
    params: [
      { name: 'p_id_lantai', default: null },
      { name: 'p_jenis', default: null },
      { name: 'p_exluded_id', default: null }
    ]
  },
  postTarifLantai: {
    text: `select f_settings_tarif_lantai_submit($1::text,$2::int,$3::int,$4::text,$5::date,$6::date,$7::numeric,$8::numeric,$9::numeric) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id_tarif_lantai', default: 0 },
      'p_id_lantai',
      'p_kode_unit_jenis',
      'p_tgl_mulai',
      'p_tgl_berakhir',
      'p_tarif',
      'p_deposit',
      'p_pajak'
    ]
  },
  putTarifLantaiApprove: {
    text: `select f_settings_tarif_lantai_approve($1::text,$2::int,$3::boolean,$4::text) as ret`,
    params: [
      'p_pengguna',
      'p_id_tarif_lantai',
      { name: 'p_approved', default: true },
      'p_keterangan'
    ]
  },
  delTarifLantai: {
    text: `select f_settings_tarif_lantai_cancel($1::text,$2::int,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_tarif_lantai', 'p_keterangan']
  },
  getTarifUnit: {
    text: `select 
					( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					blok.kode_blok, unit.nama_unit, lantai.no_lantai,lantai.id_lantai,lantai.no_lantai,unit.no_unit,blok.nama_blok,
					blok.id_rusun_blok,lantai.nama_lantai,
					tarif.*,
					case 
						when exists(select null from tarif_unit where aktif and id_tarif_unit_edited=tarif.id_tarif_unit) then true
						else false
					end edited,
					(
						select row_to_json(t) from(
							select 
								id_tarif_unit,tgl_mulai,tgl_berakhir,tarif,
								case when tgl_mulai>tarif.tgl_berakhir then 'AFTER' else 'BEFORE' end periode
							from tarif_unit
							where aktif and id_unit=tarif.id_unit
							and id_tarif_unit<>tarif.id_tarif_unit
							and (
								approval 
								or (not approval and status='S') 
							)
							limit 1
						) t
					) tarif_lain
				from 
					tarif_unit tarif
					inner join rusun_unit unit on unit.id_unit=tarif.id_unit
					inner join rusun_lantai lantai on lantai.id_lantai=unit.id_lantai
					left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
				where
					lantai.kode_rusun=$1::text
					and (coalesce($2::int,0)=0 or unit.id_unit=$2::int)
					and (coalesce($3::text,'')='' or tarif.status=$3::text)
					and (coalesce($4::int,0)=0 or tarif.id_tarif_unit=$4::int)
					and ($5::boolean is null or tarif.aktif=$5::boolean)
					and (coalesce($10::int,0)=0 or lantai.id_rusun_blok=$10::int)
					and (coalesce($11::int,0)=0 or lantai.id_lantai=$11::int)
				order by 
					case when $8::text='blok' and not coalesce($9::boolean,false) then blok.kode_blok  end asc, 
					case when $8::text='blok' and coalesce($9::boolean,false) then blok.kode_blok end desc,
					case when $8::text='lantai' and not coalesce($9::boolean,false) then lantai.no_lantai  end asc, 
					case when $8::text='lantai' and coalesce($9::boolean,false) then lantai.no_lantai end desc,
					case when $8::text='unit' and not coalesce($9::boolean,false) then unit.nama_unit  end asc, 
					case when $8::text='unit' and coalesce($9::boolean,false) then unit.nama_unit end desc,
					case when $8::text='tanggalMulai' and not coalesce($9::boolean,false) then tarif.tgl_mulai  end asc, 
					case when $8::text='tanggalMulai' and coalesce($9::boolean,false) then tarif.tgl_mulai end desc,
					case when $8::text='tanggalBerakhir' and not coalesce($9::boolean,false) then tarif.tgl_berakhir  end asc, 
					case when $8::text='tanggalBerakhir' and coalesce($9::boolean,false) then tarif.tgl_berakhir end desc,
					case when $8::text='statusApproval' and not coalesce($9::boolean,false) then tarif.status  end asc, 
					case when $8::text='statusApproval' and coalesce($9::boolean,false) then tarif.status end desc,
					case when $8::text='statusAktif' and not coalesce($9::boolean,false) then tarif.aktif  end asc, 
					case when $8::text='statusAktif' and coalesce($9::boolean,false) then tarif.aktif end desc,
					case when $8::text='tarif' and not coalesce($9::boolean,false) then tarif.tarif  end asc, 
					case when $8::text='tarif' and coalesce($9::boolean,false) then tarif.tarif end desc,
					tarif.tgl_rekam desc
				limit 
					case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end 
				offset 
					case 
						when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_id_unit', default: 0 },
      { name: 'p_status', default: '' },
      { name: 'p_id', default: 0 },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_id_blok', default: null }, // 10
      { name: 'p_id_lantai', default: null }
    ]
  },
  getTarifUnitLastPeriod: {
    text: `select id_tarif_unit,tgl_mulai,tgl_berakhir,tarif  
			from tarif_unit
			where aktif and approval 
				and id_unit=$1::int
				and (coalesce($2::int,0)=0 or id_tarif_unit<>$2::int)
				and (
					approval 
					or (not approval and status='S') 
				)
			order by tgl_berakhir desc
			limit 1
		`,
    params: [
      { name: 'p_id_unit', default: null },
      { name: 'p_exluded_id', default: null }
    ]
  },
  postTarifUnit: {
    text: `select f_settings_tarif_unit_submit($1::text,$2::int,$3::int,$4::date,$5::date,$6::numeric,$7::numeric,$8::numeric) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id_tarif_unit', default: 0 },
      'p_id_unit',
      'p_tgl_mulai',
      'p_tgl_berakhir',
      'p_tarif',
      'p_deposit',
      'p_pajak'
    ]
  },
  putTarifUnitApprove: {
    text: `select f_settings_tarif_unit_approve($1::text,$2::int,$3::boolean,$4::text) as ret`,
    params: [
      'p_pengguna',
      'p_id_tarif_unit',
      { name: 'p_approved', default: true },
      'p_keterangan'
    ]
  },
  delTarifUnit: {
    text: `select f_settings_tarif_unit_cancel($1::text,$2::int,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_tarif_unit', 'p_keterangan']
  },
  getTarifListrik: {
    text: `
				with data_entri_terakhir as (
					select $1::text kode_rusun, tgl_end tgl_entri_terakhir
					from invoice_entries_invlstrk
					where
						aktif
						and 
						id_unit in(
							select unit.id_unit
							from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							where kode_rusun= $1::text
						)
					order by tgl_end desc 
					limit 1
				)
				select 
				( (row_number() over()) + coalesce($5::bigint,10) * (coalesce($4::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				rusun.nama_rusun,golongan.deskripsi,
				listrik.* ,
				(
					select row_to_json(t) from(
						select 
							id_tarif_listrik,tgl_mulai,tgl_berakhir,
							case when tgl_mulai>listrik.tgl_mulai then 'AFTER' else 'BEFORE' end periode
						from tarif_listrik
						where aktif 
						and id_tarif_listrik<>listrik.id_tarif_listrik
						and kode_rusun=listrik.kode_rusun
						order by tgl_mulai desc
						limit 1
					) t
				) tarif_lain,
				data_entri_terakhir.tgl_entri_terakhir 
			from 
				tarif_listrik listrik
				inner join rusun on listrik.kode_rusun=rusun.kode_rusun
				left outer join kode_golongan_listrik golongan on golongan.kode_golongan_listrik=listrik.kode_golongan_listrik
				left outer join data_entri_terakhir on data_entri_terakhir.kode_rusun=listrik.kode_rusun
				where
					rusun.kode_rusun=$1::text
					and ($2::int=0 or id_tarif_listrik=$2::int)
					and ($3::boolean is null or listrik.aktif=$3::boolean)
				order by 
					case when $6::text='golonganListrik' and not coalesce($7::boolean,false) then golongan.deskripsi  end asc, 
					case when $6::text='golonganListrik' and coalesce($7::boolean,false) then golongan.deskripsi end desc,
					case when $6::text='tanggalMulai' and not coalesce($7::boolean,false) then listrik.tgl_mulai  end asc, 
					case when $6::text='tanggalMulai' and coalesce($7::boolean,false) then listrik.tgl_mulai end desc,
					case when $6::text='tanggalBerakhir' and not coalesce($7::boolean,false) then listrik.tgl_berakhir  end asc, 
					case when $6::text='tanggalBerakhir' and coalesce($7::boolean,false) then listrik.tgl_berakhir end desc,
					case when $6::text='rate' and not coalesce($7::boolean,false) then listrik.rate_per_kwh  end asc, 
					case when $6::text='rate' and coalesce($7::boolean,false) then listrik.rate_per_kwh end desc,
					case when $6::text='pengali' and not coalesce($7::boolean,false) then listrik.faktor_pengali  end asc, 
					case when $6::text='pengali' and coalesce($7::boolean,false) then listrik.faktor_pengali end desc,
					case when $6::text='demandCharges' and not coalesce($7::boolean,false) then listrik.demand_charges  end asc, 
					case when $6::text='demandCharges' and coalesce($7::boolean,false) then listrik.demand_charges end desc,
					case when $6::text='pju' and not coalesce($7::boolean,false) then listrik.pju_prosen  end asc, 
					case when $6::text='pju' and coalesce($7::boolean,false) then listrik.pju_prosen end desc,
					listrik.tgl_mulai desc
				limit 
					case when coalesce($5::bigint,0)::bigint>0   then $5::bigint end 
				offset 
					case 
						when coalesce($5::bigint,0)::bigint>0 then  $5::bigint * (coalesce($4::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_id', default: 0 },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 4
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getTarifListrikLastPeriod: {
    text: `		
		select (
				SELECT row_to_json(t) FROM (
					select id_tarif_listrik,tgl_mulai, tgl_berakhir, rate_per_kwh, faktor_pengali, demand_charges, pju_prosen 
					from tarif_listrik
					where aktif
						and tarif_listrik.kode_rusun=$1::text
						and $2::text=$2::text
						and (coalesce($3::int,0)=0 or id_tarif_listrik<>$3::int)
					order by tgl_mulai desc
					limit 1
				) t
			) last_period,
			(
				select tgl_end tgl_entri_terakhir
				from invoice_entries_invlstrk
				where
					aktif
					and 
					id_unit in(
						select unit.id_unit
						from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						where kode_rusun= $1::text
					)
				order by tgl_end desc 
				limit 1
			) `,
    params: [
      'p_rusun',
      { name: 'p_kode_golongan', default: null },
      { name: 'p_exluded_id', default: null }
    ]
  },
  postTarifListrik: {
    text: `select f_settings_tarif_listrik_submit($1::text,$2::text,$3::int,$4::text,$5::date,$6::date,$7::numeric,$8::numeric,$9::numeric,$10::numeric) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      { name: 'p_id_tarif', default: null },
      'p_gol_listrik',
      'p_tgl_mulai',
      'p_tgl_berakhir',
      'p_rate',
      'p_pengali',
      'p_demand',
      'p_pju'
    ]
  },
  delTarifListrik: {
    text: `select f_settings_tarif_listrik_cancel($1::text,$2::int,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_tarif_listrik', 'p_keterangan']
  },
  getTarifAir: {
    text: `with data_entri_terakhir as (
					select $1::text kode_rusun, tgl_end tgl_entri_terakhir
					from invoice_entries_invair
					where
						aktif
						and 
						id_unit in(
							select unit.id_unit
							from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							where kode_rusun= $1::text
						)
					order by tgl_end desc 
					limit 1
				)
				select 
					( (row_number() over()) + coalesce($5::bigint,10) * (coalesce($4::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					rusun.nama_rusun,
					air.* ,
					(
						select row_to_json(t) from(
							select 
								id_tarif_air,tgl_mulai,tgl_berakhir,
								case when tgl_mulai>air.tgl_berakhir then 'AFTER' else 'BEFORE' end periode
							from tarif_air
							where aktif 
							and id_tarif_air<>air.id_tarif_air
							and kode_rusun=air.kode_rusun
							order by tgl_mulai desc
							limit 1
						) t
					) tarif_lain,
					data_entri_terakhir.tgl_entri_terakhir 
				from 
					tarif_air air
					inner join rusun on Air.kode_rusun=rusun.kode_rusun
					left outer join data_entri_terakhir on data_entri_terakhir.kode_rusun=air.kode_rusun
				where
					rusun.kode_rusun=$1::text
					and ($2::int=0 or id_tarif_air=$2::int)
					and ($3::boolean is null or air.aktif=$3::boolean)
				order by
					case when $6::text='tanggalMulai' and not coalesce($7::boolean,false) then Air.tgl_mulai  end asc, 
					case when $6::text='tanggalMulai' and coalesce($7::boolean,false) then Air.tgl_mulai end desc,
					case when $6::text='tanggalBerakhir' and not coalesce($7::boolean,false) then Air.tgl_berakhir  end asc, 
					case when $6::text='tanggalBerakhir' and coalesce($7::boolean,false) then Air.tgl_berakhir end desc,
					case when $6::text='rate' and not coalesce($7::boolean,false) then Air.rate_per_m3  end asc, 
					case when $6::text='rate' and coalesce($7::boolean,false) then Air.rate_per_m3 end desc,
					case when $6::text='wmm' and not coalesce($7::boolean,false) then Air.wmm  end asc, 
					case when $6::text='wmm' and coalesce($7::boolean,false) then Air.wmm end desc,
					air.tgl_mulai desc
				limit 
					case when coalesce($5::bigint,0)::bigint>0   then $5::bigint end 
				offset 
					case 
						when coalesce($5::bigint,0)::bigint>0 then  $5::bigint * (coalesce($4::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_id', default: 0 },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 4
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getTarifAirLastPeriod: {
    text: `select (
			SELECT row_to_json(t) FROM (
				select id_tarif_air,  tgl_mulai, tgl_berakhir, rate_per_m3, wmm 
				from tarif_air
				where aktif
					and tarif_air.kode_rusun=$1::text
					and (coalesce($2::int,0)=0 or id_tarif_air<>$2::int)
				order by tgl_mulai desc
				limit 1
			) t
		) last_period,
		(
			select tgl_end tgl_entri_terakhir
			from invoice_entries_invair
			where
				aktif
				and 
				id_unit in(
					select unit.id_unit
					from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
					where kode_rusun= $1::text
				)
			order by tgl_end desc 
			limit 1
		)`,
    params: ['p_rusun', { name: 'p_exluded_id', default: null }]
  },
  postTarifAir: {
    text: `select f_settings_tarif_air_submit($1::text,$2::text,$3::int,$4::date,$5::date,$6::numeric,$7::numeric) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      { name: 'p_id_tarif', default: null },
      'p_tgl_mulai',
      'p_tgl_berakhir',
      'p_rate',
      'p_wmm'
    ]
  },
  delTarifAir: {
    text: `select f_settings_tarif_air_cancel($1::text,$2::int,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_tarif_air', 'p_keterangan']
  },
  getTarifFasilitas: {
    text: `select 
					( (row_number() over()) + coalesce($6::bigint,10) * (coalesce($5::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					rusun.nama_rusun,fasilitas.nama_fasilitas,fasilitas.keterangan,
					tarif.* 
				from 
					tarif_Fasilitas tarif
					inner join rusun on tarif.kode_rusun=rusun.kode_rusun
					inner join fasilitas on fasilitas.kode_fasilitas=tarif.kode_fasilitas
				where
					rusun.kode_rusun=$1::text
					and ($2::text='' or tarif.kode_fasilitas=$2::text)
					and ($3::int=0 or id_tarif_Fasilitas=$3::int)
					and ($4::boolean is null or tarif.aktif=$4::boolean)
				order by 
					case when $7::text='kodeFasilitas' and not coalesce($8::boolean,false) then tarif.kode_fasilitas  end asc, 
					case when $7::text='kodeFasilitas' and coalesce($8::boolean,false) then tarif.kode_fasilitas end desc,
					case when $7::text='namaFasilitas' and not coalesce($8::boolean,false) then fasilitas.nama_fasilitas  end asc, 
					case when $7::text='namaFasilitas' and coalesce($8::boolean,false) then fasilitas.nama_fasilitas end desc,					
					case when $7::text='tanggalMulai' and not coalesce($8::boolean,false) then tarif.tgl_mulai  end asc, 
					case when $7::text='tanggalMulai' and coalesce($8::boolean,false) then tarif.tgl_mulai end desc,
					case when $7::text='tanggalBerakhir' and not coalesce($8::boolean,false) then tarif.tgl_berakhir  end asc, 
					case when $7::text='tanggalBerakhir' and coalesce($8::boolean,false) then tarif.tgl_berakhir end desc,
					case when $7::text='statusAktif' and not coalesce($8::boolean,false) then tarif.aktif  end asc, 
					case when $7::text='statusAktif' and coalesce($8::boolean,false) then tarif.aktif end desc,
					case when $7::text='tarif' and not coalesce($8::boolean,false) then tarif.tarif  end asc, 
					case when $7::text='tarif' and coalesce($8::boolean,false) then tarif.tarif end desc,
					tarif.tgl_rekam desc
				limit 
					case when coalesce($6::bigint,0)::bigint>0   then $6::bigint end 
				offset 
					case 
						when coalesce($6::bigint,0)::bigint>0 then  $6::bigint * (coalesce($5::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_fasilitas', default: '' },
      { name: 'p_id', default: 0 },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 5
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postTarifFasilitas: {
    text: `select f_settings_tarif_fasilitas_submit($1::text,$2::text,$3::text,$4::date,$5::date,$6::numeric) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      'p_fasilitas',
      'p_tgl_mulai',
      'p_tgl_berakhir',
      'p_tarif'
    ]
  },
  delTarifFasilitas: {
    text: `select f_settings_tarif_fasilitas_cancel($1::text,$2::int,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_tarif_fasilitas', 'p_keterangan']
  },
  getSettingsGolListrik: {
    text: `select * from kode_golongan_listrik
				where
					($1::text='' or kode_golongan_listrik=$1::text)
					and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsGolListrik: {
    text: `select f_settings_golongan_listrik_save($1::text,$2::text,$3::text,$4::int,$5::boolean,$6::text) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_kode', default: null },
      'p_deskripsi',
      'p_daya',
      { name: 'p_aktif', default: true },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsGolListrik: {
    text: `select f_settings_golongan_listrik_non_aktif($1::text,$2::text) as ret`,
    params: ['p_pengguna', 'p_kode']
  },
  getSettingsGolInvoice: {
    text: `select * from kode_invoice_golongan
				where
					($1::text='' or kode_invoice_golongan=$1::text)
					and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsGolInvoice: {
    text: `select f_settings_invoice_golongan_save($1::text,$2::text,$3::text) as ret`,
    params: ['p_pengguna', { name: 'p_kode', default: null }, 'p_deskripsi']
  },
  delSettingsGolInvoice: {
    text: `select f_settings_invoice_golongan_non_aktif($1::text,$2::text) as ret`,
    params: ['p_pengguna', 'p_kode']
  },
  getSettingsKelompokInvoice: {
    text: `select * from kode_invoice_kelompok
				where
					($1::text='' or kode_invoice_kelompok=$1::text)
					and ($2::text='' or kode_invoice_golongan=$2::text)
					and ($3::boolean is null or aktif=$3::boolean)`,
    params: [
      { name: 'p_kelompok', default: '' },
      { name: 'p_golongan', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsKelompokInvoice: {
    text: `select f_settings_invoice_kelompok_save($1::text,$2::text,$3::text,$4::text,$5::boolean) as ret`,
    params: [
      'p_pengguna',
      'p_kelompok',
      'p_golongan',
      { name: 'p_title', default: null },
      { name: 'p_all_unit', default: true }
    ]
  },
  delSettingsKelompokInvoice: {
    text: `select f_settings_invoice_kelompok_non_aktif($1::text,$2::text) as ret`,
    params: ['p_pengguna', 'p_kode']
  },
  getSettingsFasilitas: {
    text: `select * from fasilitas
				where
					($1::text='' or kode_fasilitas=$1::text)
					and ($2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_kode', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsFasilitas: {
    text: `select f_settings_fasilitas_save($1::text,$2::text,$3::text,$4::text,$5::boolean,$6::text) as ret`,
    params: [
      'p_pengguna',
      'p_kode',
      'p_nama',
      { name: 'p_keterangan', default: null },
      { name: 'p_aktif', default: null },
      { name: 'p_act', default: null }
    ]
  },
  delSettingsFasilitas: {
    text: `select f_settings_fasilitas_non_aktif($1::text,$2::text) as ret`,
    params: ['p_pengguna', 'p_kode']
  },

  getSettingsFasilitasRusun: {
    text: `select fas_r.*,fas.nama_fasilitas, fas.keterangan keterangan_fasilitas,
          (select nama_rusun from rusun where kode_rusun=fas_r.kode_rusun) nama_rusun
				from 
					fasilitas_rusun fas_r left outer join fasilitas fas on fas_r.kode_fasilitas=fas.kode_fasilitas
				where kode_rusun=$1::text
					and (coalesce($2::text,'')='' or fas_r.kode_fasilitas=$2::text)
					and ($3::boolean is null or fas_r.aktif=$3::boolean)`,
    params: [
      'p_rusun',
      { name: 'p_fasilitas', default: '' },
      { name: 'p_aktif', default: null }
    ]
  },
  postSettingsFasilitasRusun: {
    text: `select f_settings_fasilitas_rusun_save($1::text,$2::int,$3::text,$4::text,$5::text,$6::boolean) as ret`,
    params: [
      'p_pengguna',
      'p_id_fasilitas_rusun',
      'p_rusun',
      'p_fasilitas',
      { name: 'p_keterangan', default: null },
      { name: 'p_aktif', default: null }
    ]
  }
}
