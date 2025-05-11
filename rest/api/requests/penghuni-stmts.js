const moment = require('moment')
module.exports = {
  getPenghuni: {
    text: `select 
          ( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris, 
          (count(*) OVER())::int AS full_count_baris,
          rp.id_registrasi_penghuni  , rp.kpj_nama , rp.tgl_in , rp.tgl_out , rp.is_penyewa ,rp.id_kontrak_sewa , 
          rp.penanggung_jawab,rp.tipe_out ,deskripsi_tipe_out,
          rp.id_unit, nama_unit, ru.id_lantai, nama_lantai, rl.id_rusun_blok , nama_blok,
          pp.*,ks.no_kontrak_sewa 
        from 
          kontrak_sewa ks 
          inner join registrasi_penghuni rp on ks.id_kontrak_sewa =rp.id_kontrak_sewa 
          inner join profil_penghuni pp on pp.id_profil_penghuni =rp.id_profil_penghuni 	
          inner join rusun_unit ru on ru.id_unit=rp.id_unit 
          inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai 
          left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok 
          left outer join kode_tipe_out kto on kto.kode_tipe_out=rp.tipe_out
        where 
          rp.aktif and rp.aktif_menghuni and ks.kode_rusun = $1::text and ks.aktif and ks.approval and ks. kontrak_berlaku
          and tgl_in<=now()
          and (
            tgl_out is null
            or tgl_out>now()
          )
          and ($2::int is null or rl.id_rusun_blok=$2::int)
          and ($3::int is null or ru.id_lantai=$3::int)
          and ($4::int is null or rp.id_unit=$4::int)
          and (
            $5::text is null
            or rp.kpj_nama ilike  '%' || $5::text || '%'
            or rp.nik = $5::text
            or rp.kpj= $5::text
            or ks.no_kontrak_sewa = $5::text
          )
        order by         
          case when $8::text='nama_blok' and not coalesce($9::boolean,false) then nama_blok end asc, 
          case when $8::text='nama_blok' and coalesce($9::boolean,false) then nama_blok end desc,        
          case when $8::text='nama_lantai' and not coalesce($9::boolean,false) then nama_lantai end asc, 
          case when $8::text='nama_lantai' and coalesce($9::boolean,false) then nama_lantai end desc,
          case when $8::text='nama_unit' and not coalesce($9::boolean,false) then nama_unit end asc, 
          case when $8::text='nama_unit' and coalesce($9::boolean,false) then nama_unit end desc,
          case when $8::text='no_kontrak_sewa' and not coalesce($9::boolean,false) then no_kontrak_sewa end asc, 
          case when $8::text='no_kontrak_sewa' and coalesce($9::boolean,false) then no_kontrak_sewa end desc,
          case when $8::text='kpj' and not coalesce($9::boolean,false) then pp.kpj end asc, 
          case when $8::text='kpj' and coalesce($9::boolean,false) then pp.kpj end desc,
          case when $8::text='nik' and not coalesce($9::boolean,false) then pp.nik end asc, 
          case when $8::text='nik' and coalesce($9::boolean,false) then pp.nik end desc,
          case when $8::text='kpj_nama' and not coalesce($9::boolean,false) then kpj_nama end asc, 
          case when $8::text='kpj_nama' and coalesce($9::boolean,false) then kpj_nama end desc,
          case when $8::text='tgl_in' and not coalesce($9::boolean,false) then tgl_in end asc, 
          case when $8::text='tgl_in' and coalesce($9::boolean,false) then tgl_in end desc,
          case when $8::text='tgl_out' and not coalesce($9::boolean,false) then tgl_out end asc, 
          case when $8::text='tgl_out' and coalesce($9::boolean,false) then tgl_out end desc,
          nama_blok, nama_lantai, nama_unit            
        limit 
          case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end             
        offset 
          case 
            when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
          end`,
    params: [
      'p_rusun',
      {
        name: 'p_blok',
        default: null
      },
      {
        name: 'p_lantai',
        default: null
      },
      {
        name: 'p_unit',
        default: null
      },
      {
        name: 'p_search',
        default: ''
      },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getPenghuniHistory: {
    text: `select 
          ( (row_number() over()) + coalesce($8::bigint,10) * (coalesce($7::int,1)-1) )::int nomor_baris, 
          (count(*) OVER())::int AS full_count_baris,
          rp.id_registrasi_penghuni  , rp.kpj_nama , rp.tgl_in , rp.tgl_out , rp.is_penyewa ,rp.id_kontrak_sewa , 
          rp.penanggung_jawab,rp.tipe_out ,deskripsi_tipe_out,
          rp.id_unit, nama_unit, ru.id_lantai, nama_lantai, rl.id_rusun_blok , nama_blok,
          pp.*,ks.no_kontrak_sewa 
        from 
          kontrak_sewa ks 
          inner join registrasi_penghuni rp on ks.id_kontrak_sewa =rp.id_kontrak_sewa 
          inner join profil_penghuni pp on pp.id_profil_penghuni =rp.id_profil_penghuni 	
          inner join rusun_unit ru on ru.id_unit=rp.id_unit 
          inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai 
          left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok 
          left outer join kode_tipe_out kto on kto.kode_tipe_out=rp.tipe_out
        where 
          rp.aktif and rp.aktif_menghuni and ks.kode_rusun = $1::text and tgl_out is not null
          and tgl_in<=tgl_out
          and tgl_out<$2::date
          and ($3::int is null or rl.id_rusun_blok=$3::int)
          and ($4::int is null or ru.id_lantai=$4::int)
          and ($5::int is null or rp.id_unit=$5::int)
          and (
            $6::text is null
            or rp.kpj_nama ilike  '%' || $6::text || '%'
            or rp.nik = $6::text
            or rp.kpj= $6::text
            or ks.no_kontrak_sewa = $6::text
          )
        order by 
          case when $9::text='nama_blok' and not coalesce($10::boolean,false) then nama_blok end asc, 
          case when $9::text='nama_blok' and coalesce($10::boolean,false) then nama_blok end desc,        
          case when $9::text='nama_lantai' and not coalesce($10::boolean,false) then nama_lantai end asc, 
          case when $9::text='nama_lantai' and coalesce($10::boolean,false) then nama_lantai end desc,
          case when $9::text='nama_unit' and not coalesce($10::boolean,false) then nama_unit end asc, 
          case when $9::text='nama_unit' and coalesce($10::boolean,false) then nama_unit end desc,
          case when $9::text='no_kontrak_sewa' and not coalesce($10::boolean,false) then no_kontrak_sewa end asc, 
          case when $9::text='no_kontrak_sewa' and coalesce($10::boolean,false) then no_kontrak_sewa end desc,
          case when $9::text='kpj' and not coalesce($10::boolean,false) then pp.kpj end asc, 
          case when $9::text='kpj' and coalesce($10::boolean,false) then pp.kpj end desc,
          case when $9::text='nik' and not coalesce($10::boolean,false) then pp.nik end asc, 
          case when $9::text='nik' and coalesce($10::boolean,false) then pp.nik end desc,
          case when $9::text='kpj_nama' and not coalesce($10::boolean,false) then kpj_nama end asc, 
          case when $9::text='kpj_nama' and coalesce($10::boolean,false) then kpj_nama end desc,
          case when $9::text='tgl_in' and not coalesce($10::boolean,false) then tgl_in end asc, 
          case when $9::text='tgl_in' and coalesce($10::boolean,false) then tgl_in end desc,
          case when $9::text='tgl_out' and not coalesce($10::boolean,false) then tgl_out end asc, 
          case when $9::text='tgl_out' and coalesce($10::boolean,false) then tgl_out end desc,
          nama_blok, nama_lantai, nama_unit            
        limit 
          case when coalesce($8::bigint,0)::bigint>0   then $8::bigint end             
        offset 
          case 
            when coalesce($8::bigint,0)::bigint>0 then  $8::bigint * (coalesce($7::int,1)-1)
          end`,
    params: [
      'p_rusun',
      {
        name: 'p_date',
        default: moment().format('YYYY-MM-DD')
      },
      {
        name: 'p_blok',
        default: null
      },
      {
        name: 'p_lantai',
        default: null
      },
      {
        name: 'p_unit',
        default: null
      },
      {
        name: 'p_search',
        default: ''
      },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },

  postPenghuniInWithProfil: {
    text: `select f_penghuni_with_profil_in($1::text,$2::boolean,$3::text,$4::text,$5::text,$6::text,$7::text,$8::int,$9::date,$10::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_penanggung_jawab',
      { name: 'p_kpj', default: null },
      'p_kpj_nama',
      { name: 'p_nik', default: null },
      { name: 'p_nik_jenis', default: null },
      'p_jenis_kelamin',
      'p_id_unit',
      'p_tgl_in',
      {
        name: 'p_data_profil',
        type: 'json',
        data: [
          { name: 'idProfil', default: null },
          { name: 'noRegistrasi', default: null },
          { name: 'kpj', default: null },
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
  postPenghuniOut: {
    text: `select f_penghuni_out($1::text,$2::bigint,$3::date, $4:: text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_id_registrasi_penghuni',
      'p_tgl_out',
      { name: 'p_tipe_out', default: null }
    ]
  },
  putPenghuniPenanggungJawab: {
    text: `select f_penghuni_set_penanggung_jawab($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_registrasi_penghuni']
  },
  getPenghuniProfilByKPJ: {
    text: `	select *
		from profil_penghuni profil
		where kpj=$1 and profil_terakhir
		order by id_profil_penghuni desc
		limit 1`,
    params: ['p_kpj']
  },
  getPenghuniProfil: {
    text: `	select 
			case 
				when coalesce($3::bigint,0)<>0 and id_profil_penghuni=$3::bigint then 0
				when coalesce(kpj,'')=$1::text then 1
				when coalesce(nik,'')=$2::text then 2
				else 4
			end urut_profil
			,*
		from profil_penghuni profil
		where 
			(
				profil_terakhir
				and  
				(
					(coalesce($1::text,'')<>'' and kpj=$1::text)
					or 
					(coalesce($2::text,'')<>'' and nik=$2::text)
				)
			)
			or 
			(id_profil_penghuni=$3::bigint)
		order by urut_profil
		limit 1`,
    params: [
      { name: 'p_kpj', default: null },
      { name: 'p_nik', default: null },
      { name: 'p_id_profil', default: null }
    ]
  },
  putPenghuniProfil: {
    text: `select f_profil_save($1::text,$2::bigint,$3::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_id_registrasi_penghuni',
      {
        name: 'p_data_profil',
        type: 'json',
        data: [
          { name: 'idProfil', default: null },
          { name: 'noRegistrasi', default: null },
          { name: 'kpj', default: null },
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
  postPenghuniProfilLampiran: {
    text: `select f_profil_lampiran_save($1::text,$2::text,$3::text,$4::text,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      { name: 'p_kpj', default: null },
      { name: 'p_nik', default: null },
      'p_dokumen',
      'p_path'
    ]
  },
  getPenghuniProfilLampiran: {
    text: `select * from profil_penghuni_lampiran where kpj=$1::text and aktif
		 and ($2::text='' or kode_dokumen=$2::text)`,
    params: ['p_kpj', { name: 'p_dokumen', default: '' }]
  }
}
