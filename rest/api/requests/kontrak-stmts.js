// const moment = require('moment')
module.exports = {
  getKontrakSewaInfo: {
    text: `select 
				kontrak.*,
				f_kontrak_last_date_get(kontrak.id_kontrak_sewa) tgl_last_date,
				row_to_json(reg) as reg,
				(
					select count(*) 
					from
						invoice inv 
						inner join invoice_entries inv_e on inv.no_invoice=inv_e.no_invoice and  kode_invoice_entries='INVDPST'
					where  inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
				)::int cstatus_deposit,
				(
					select json_agg(t) 
					from (
						select 
							kontrak_unit.id_unit, unit.no_unit, unit.nama_unit
							,blok.nama_blok, lantai.no_lantai,blok.kode_blok,lantai.nama_lantai,
							(select nama_unit_jenis from kode_unit_jenis where kode_unit_jenis=unit.kode_unit_jenis) nama_unit_jenis,
							kontrak_unit.tarif
						from 
							kontrak_sewa_unit kontrak_unit  
							inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit							
							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where kontrak_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa
					) t
				) unit,				
				(
					select json_agg(t) 
					from (
						select 
							kontrak_unit.id_unit, unit.no_unit, unit.nama_unit
							,blok.nama_blok, lantai.no_lantai,blok.kode_blok,
							penghuni.*
						from 
							registrasi_penghuni penghuni
							inner join kontrak_sewa_unit kontrak_unit on penghuni.id_unit=kontrak_unit.id_unit
							inner join rusun_unit unit on penghuni.id_unit=unit.id_unit							
							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where 
							penghuni.aktif and
							(
								(
									kontrak.approval
									and aktif_menghuni 
									and (
										(kontrak.kontrak_berakhir_tgl is null and tgl_in>=kontrak.tgl_mulai_sewa)
										or
										(kontrak.kontrak_berakhir_tgl is not null and tgl_in between kontrak.tgl_mulai_sewa and kontrak.kontrak_berakhir_tgl)
									)
									and (tgl_out is null or tgl_out>=current_date)
								)
								or 
								(
									not kontrak.approval
									and
									penghuni.no_registrasi=kontrak.no_registrasi
								)
							)
							and kontrak_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa
					) t
				) penghuni,
				(
					select json_agg(t)
					from
					(
						select *
						from 
							kontrak_sewa_adendum adendum
						where adendum.id_kontrak_sewa=kontrak.id_kontrak_sewa and adendum.aktif
						order by adendum.tgl_mulai_sewa
					)t
				) adendum,
				(
					select json_agg(t)
					from
					(
						select 
							fas_unit.* ,
							unit.nama_unit, unit.no_unit,unit.nama_unit,blok.kode_blok,
							fas.nama_fasilitas, fas.keterangan,
							f_kontrak_last_date_get(fas_unit.id_kontrak_sewa) kontrak_sewa_tgl_berakhir_sewa,
							f_tarif_fasilitas_get_bykontrak_numeric(fas_unit.id_kontrak_sewa,fas_unit.kode_fasilitas,current_date) tarif_fasilitas
						from 
							kontrak_sewa_fasilitas_unit fas_unit
							inner join rusun_unit unit on unit.id_unit=fas_unit.id_unit
							inner join fasilitas fas on fas.kode_fasilitas=fas_unit.kode_fasilitas
							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where fas_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa	and fas_unit.aktif
					) t
				) fasilitas,
				(
					select json_agg(t)
					from
					(
						select * 
						from kontrak_lampiran 
						where aktif 
						and no_perjanjian in(
							select no_kontrak_sewa nomor from kontrak_sewa where id_kontrak_sewa=kontrak.id_kontrak_sewa and jenis_perjanjian='K'
							union all
							select no_adendum nomor from kontrak_sewa_adendum where id_kontrak_sewa=kontrak.id_kontrak_sewa and jenis_perjanjian='A'
						)
					) t
				) lampiran,
				(
					select json_agg(t)
					from
					(
						select *, 
						(select nama_tipe_kontrak_berakhir from kode_tipe_kontrak_berakhir where kode_tipe_kontrak_berakhir=kontrak_sewa_berhenti.tipe_berakhir)nama_tipe_berakhir,
						(select no_wo from mtnc_wo where kode_wo_tipe='IC' and ref_id=kontrak_sewa_berhenti.id_berhenti::text and mtnc_wo.aktif) no_wo,
						(select status from mtnc_wo where kode_wo_tipe='IC' and ref_id=kontrak_sewa_berhenti.id_berhenti::text and mtnc_wo.aktif) status_wo
						from kontrak_sewa_berhenti where id_kontrak_sewa=kontrak.id_kontrak_sewa and kontrak_sewa_berhenti.aktif
					) t
				) berhenti
			from 
				kontrak_sewa kontrak 
				left outer join 
				(
					select 
						reg.* , 
						case when reg.jenis_registrasi='I' then 'INDIVIDU' else 'PERUSAHAAN' end jenis_reg,
						jnis.nama_unit_jenis,nama_jenis_kelamin
					from 
						registrasi reg 
						left outer join kode_unit_jenis jnis on reg.kode_unit_jenis=jnis.kode_unit_jenis
						left outer join kode_jenis_kelamin jkelamin on reg.kode_jenis_kelamin=jkelamin.kode_jenis_kelamin
				) reg on kontrak.no_registrasi=reg.no_registrasi
			where 
				kontrak.id_kontrak_sewa=$1::bigint`,
    params: ['p_kontrak']
  },
  getKontrakApproval: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				kontrak.no_urut,
				kontrak.nama_approval ,kontrak.id ,kontrak.id_kontrak_sewa ,kontrak.no_kontrak_sewa ,
				kontrak.jenis_registrasi ,kontrak.no_adendum ,kontrak.pihak2_kpj ,kontrak.pihak2_nama_lengkap ,
				kontrak.pihak2_nama_perusahaan ,kontrak.jmlh_unit ,kontrak.jmlh_bulan_sewa ,kontrak.jmlh_bulan_sewa ,
				kontrak.tgl_mulai_sewa ,kontrak.tgl_berakhir_sewa ,kontrak.tgl_rekam ,kontrak.petugas_rekam ,
				kontrak.tgl_ubah,kontrak.petugas_ubah,
				json_agg((select x from (select nama_blok,nama_lantai,nama_unit) as x  order by nama_blok,nama_lantai,nama_unit))  unit
				from
				(
					select 
						1::int no_urut,
						'KONTRAK SEWA' nama_approval,
						kontrak.id_kontrak_sewa id,
						kontrak.id_kontrak_sewa ,
						kontrak.no_kontrak_sewa,
						kontrak.jenis_registrasi,
						''::text no_adendum,
						pihak2_kpj,
						pihak2_nama_lengkap,
						pihak2_nama_perusahaan,
						jmlh_unit,
						jmlh_bulan_sewa,
						tgl_mulai_sewa,
						tgl_berakhir_sewa,
						tgl_rekam,
						petugas_rekam,
						tgl_ubah,
						petugas_ubah
					from 
						kontrak_sewa kontrak
					where 
						aktif
						and status='S'
						and kode_rusun=$1::text
						and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
						and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
						and (coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
						and	(
							$7::text=''::text 
							or no_kontrak_sewa ilike '%' || $7::text || '%'
							or pihak2_kpj ilike '%' || $7::text || '%'
							or pihak2_nama_lengkap ilike '%' || $7::text || '%'
							or pihak2_nama_perusahaan ilike '%' || $7::text || '%'
						)
					union all
					select 
						2::int no_urut,
						'ADENDUM' nama_approval,
						kontrak_adendum.id_adendum id,
						kontrak.id_kontrak_sewa ,
						kontrak.no_kontrak_sewa,
						kontrak.jenis_registrasi,
						no_adendum no_adendum,
						pihak2_kpj,
						pihak2_nama_lengkap,
						pihak2_nama_perusahaan,
						jmlh_unit,
						kontrak_adendum.jmlh_bulan_adendum jmlh_bulan_sewa,
						kontrak_adendum.tgl_mulai_sewa,
						kontrak_adendum.tgl_berakhir_sewa,
						kontrak_adendum.tgl_rekam,
						kontrak_adendum.petugas_rekam,
						kontrak_adendum.tgl_ubah,
						kontrak_adendum.petugas_ubah
					from 
						kontrak_sewa kontrak
						inner join kontrak_sewa_adendum kontrak_adendum on kontrak.id_kontrak_sewa=kontrak_adendum.id_kontrak_sewa
					where 
						kontrak_adendum.aktif
						and kontrak_adendum.status='S'
						and kontrak.kode_rusun=$1::text
						and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
						and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
						and (coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
						and	(
							$7::text=''::text 
							or no_kontrak_sewa ilike '%' || $7::text || '%'
							or pihak2_kpj ilike '%' || $7::text || '%'
							or pihak2_nama_lengkap ilike '%' || $7::text || '%'
							or pihak2_nama_perusahaan ilike '%' || $7::text || '%'
						)
				) kontrak				
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit 
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
			where 					
				(coalesce($4::int,0)=0 or blok.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
				and (coalesce($9::int,0)=0 or no_urut=$9::int)
			group by
				kontrak.no_urut,
				kontrak.nama_approval ,kontrak.id ,kontrak.id_kontrak_sewa ,kontrak.no_kontrak_sewa ,
				kontrak.jenis_registrasi ,kontrak.no_adendum ,kontrak.pihak2_kpj ,kontrak.pihak2_nama_lengkap ,
				kontrak.pihak2_nama_perusahaan ,kontrak.jmlh_unit ,kontrak.jmlh_bulan_sewa ,kontrak.jmlh_bulan_sewa ,
				kontrak.tgl_mulai_sewa ,kontrak.tgl_berakhir_sewa ,kontrak.tgl_rekam ,kontrak.petugas_rekam ,
				kontrak.tgl_ubah,kontrak.petugas_ubah
			order by 
				case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
				case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
				case when $12::text='jenisReg' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
				case when $12::text='jenisReg' and coalesce($13::boolean,false) then jenis_registrasi end desc,
				case when $12::text='kpj' and not coalesce($13::boolean,false) then pihak2_kpj end asc, 
				case when $12::text='kpj' and coalesce($13::boolean,false) then pihak2_kpj end desc,
				case when $12::text='nama' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
				case when $12::text='nama' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
				case when $12::text='prs' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
				case when $12::text='prs' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
				kontrak.tgl_ubah desc nulls first, kontrak.tgl_rekam desc
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_jenis', default: null },
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_jenis_app', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postKontrakApproval: {
    text: `select f_kontrak_approve($1::text,$2::bigint,$3::boolean,$4::text) as ret`,
    params: ['p_pengguna', 'p_kontrak', 'p_approved', 'p_alasan']
  },
  getKontrakAdendum: {
    text: `
			select 
				kontrak.no_kontrak_sewa,
				pihak2_kpj,
				pihak2_nama_lengkap,
				pihak2_nama_perusahaan,
				adendum.*
			from 
				kontrak_sewa_adendum adendum
				inner join kontrak_sewa kontrak on adendum.id_kontrak_sewa=kontrak.id_kontrak_sewa
			where 
				($1::bigint=0 or kontrak.id_kontrak_sewa=$1::bigint )
				and
				($2::bigint=0 or adendum.id_adendum=$2::bigint)
			order by kontrak.id_kontrak_sewa, adendum.id_adendum
		`,
    params: [
      { name: 'p_kontrak', default: 0 },
      { name: 'p_adendum', default: 0 }
    ]
  },
  getKontrakAdendumPreData: {
    text: `select 
				kontrak.tgl_mulai_sewa,
				case when pihak1_nama_lengkap is null then submit_kontrak_pihak1_nama_lengkap else  pihak1_nama_lengkap end pihak1_nama_lengkap,
				case when pihak1_nama_lengkap is null then submit_kontrak_pihak1_jabatan else  pihak1_nama_lengkap end pihak1_jabatan,
				pihak2_nama_lengkap,
				pihak2_jabatan,
				max(
					case 
						when kontrak_berakhir then kontrak_berakhir_tgl
						when id_adendum is null then kontrak.tgl_berakhir_sewa 
						when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
						else kontrak.tgl_berakhir_sewa 
					end 
				) tgl_berakhir_sewa
			from 
				kontrak_sewa kontrak
				left outer join kontrak_sewa_adendum adendum on adendum.id_kontrak_sewa=kontrak.id_kontrak_sewa and adendum.aktif
				left outer join rusun_mgr_setting_db mgr on mgr.kode_rusun=kontrak.kode_rusun
			where  kontrak.id_kontrak_sewa=$1::bigint  
			group by
				kontrak.tgl_mulai_sewa,
				case when pihak1_nama_lengkap is null then submit_kontrak_pihak1_nama_lengkap else  pihak1_nama_lengkap end ,
				case when pihak1_nama_lengkap is null then submit_kontrak_pihak1_jabatan else  pihak1_nama_lengkap end,
				pihak2_nama_lengkap,
				pihak2_jabatan`,
    params: [{ name: 'p_id_kontrak', default: null }]
  },
  postKontrakAdendum: {
    text: `select f_kontrak_adendum_save_and_submit($1::text,$2::bigint,$3::json) as ret`,
    params: [
      'p_pengguna',
      'p_kontrak',
      {
        name: 'p_data_adendum',
        type: 'json',
        data: [
          { name: 'idAdendum', default: 0 },
          'jmlhBulanAdendum',
          'tglMulaiSewa',
          'tglBerakhirSewa',
          { name: 'biayaAdmin', default: 0 },
          { name: 'biayaAdminProsen', default: true },
          { name: 'pihak1TtdTitle', default: null },
          { name: 'pihak1TtdNama', default: null },
          { name: 'pihak1TtdJabatan', default: null },
          { name: 'pihak2TtdTitle', default: null },
          { name: 'pihak2TtdNama', default: null },
          { name: 'pihak2TtdJabatan', default: null }
        ]
      }
    ]
  },
  postKontrakAdendumApproval: {
    text: `select f_kontrak_adendum_approve($1::text,$2::bigint,$3::boolean,$4::text) as ret`,
    params: ['p_pengguna', 'p_id_adendum', 'p_approved', 'p_alasan']
  },
  getKontrakBerjalan: {
    text: `select distinct
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
				kontrak.tgl_mulai_sewa, 				
				case 
					when kontrak_berakhir then kontrak_berakhir_tgl
					when id_adendum is null then kontrak.tgl_berakhir_sewa 
					when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
					else kontrak.tgl_berakhir_sewa 
				end tgl_berakhir_sewa
			from 
				kontrak_sewa kontrak
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
				inner join rusun_lantai lantai on unit.id_lantai = lantai.id_lantai
				inner join rusun_blok blok on lantai.id_rusun_blok = blok.id_rusun_blok
				left outer join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku
			where kontrak.aktif and kontrak.kontrak_berlaku
				and (
					(
						not kontrak_berakhir 
						and (
							(id_adendum is  null and current_date between kontrak.tgl_mulai_sewa and kontrak.tgl_berakhir_sewa )
							or
							(id_adendum is not null and current_date between kontrak.tgl_mulai_sewa and adendum.tgl_berakhir_sewa )
						)
					)
					or (
						kontrak_berakhir 
						and current_date<=kontrak.kontrak_berakhir_tgl
					)
				)
				and kontrak.kode_rusun=$1
				and ($2::text='' or kontrak.no_kontrak_sewa=$2::text)
				and ($3::text='' or blok.kode_blok=$3)
				and (
					$4::text=''
					or
					kontrak.no_kontrak_sewa  ilike '%'|| $4::text || '%'
					or
					kontrak.pihak2_kpj ilike '%'|| $4::text || '%'
					or 
					kontrak.pihak2_nama_lengkap ilike '%'|| $4::text || '%'
					or 
					kontrak. pihak2_kpj ilike '%'|| $4::text || '%'
					or 
					kontrak.pihak2_nama_perusahaan ilike '%'|| $4::text || '%'
				)
				and ( $5::bigint=0 or kontrak.id_kontrak_sewa=$5::bigint)`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_blok', default: '' },
      { name: 'p_search', default: '' },
      { name: 'p_id_kontrak', default: 0 }
    ]
  },
  getKontrakAktif: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
				kontrak.tgl_mulai_sewa, 				
				max(
					case 
						when kontrak_berakhir then kontrak_berakhir_tgl
						when id_adendum is null then kontrak.tgl_berakhir_sewa 
						when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
						else kontrak.tgl_berakhir_sewa 
					end
				) tgl_berakhir_sewa,
				kontrak.jmlh_bulan_sewa,
				json_agg((select x from (select nama_blok,nama_lantai,nama_unit order by nama_unit) as x))  unit
			from 
				kontrak_sewa kontrak
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit 
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku
			where kontrak.aktif  and kontrak.kontrak_berlaku 
				and (
						coalesce($9::text,'')=''
					or
					(
						$9::text='M'::text
						and (
							(
								not kontrak_berakhir 
								and (
									(id_adendum is  null and current_date between kontrak.tgl_mulai_sewa and kontrak.tgl_berakhir_sewa )
									or
									(id_adendum is not null and current_date between kontrak.tgl_mulai_sewa and adendum.tgl_berakhir_sewa )
								)
							)
							or (
								kontrak_berakhir 
								and current_date<=kontrak.kontrak_berakhir_tgl
							)
						)
					)
					or
					(
						$9::text='BM'::text
						and not kontrak_berakhir 
						and  current_date  <kontrak.tgl_mulai_sewa
					)					
					or
					(
						$9::text='H'::text
						and 
						kontrak_berakhir
						and current_date>kontrak.kontrak_berakhir_tgl
					)									
					or
					(
						$9::text='JT'::text
						and 
						not kontrak_berakhir
						and (
							(id_adendum is  null and DATE_PART('day', kontrak.tgl_berakhir_sewa - date_trunc('day',now()))  <=14 )
							or
							(id_adendum is not null and DATE_PART('day', adendum.tgl_berakhir_sewa - date_trunc('day',now())) <=14)
						)
					)
				)
				and kontrak.kode_rusun=$1::text
				and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
				and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
				and (
					coalesce($7::text,'')=''
					or 
					kontrak.pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_lengkap ilike '%'|| $7::text || '%'
					or 
					kontrak. pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_perusahaan ilike '%'|| $7::text || '%'
					or 
					kontrak.no_kontrak_sewa ilike '%'|| $7::text || '%'
				)
				and (coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
			group by
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, kontrak.tgl_mulai_sewa,kontrak.tgl_rekam,
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan
			order by 
				case when $12::text='no_kontrak_sewa' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
				case when $12::text='no_kontrak_sewa' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
				case when $12::text='jenis_registrasi' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
				case when $12::text='jenis_registrasi' and coalesce($13::boolean,false) then jenis_registrasi end desc,
				case when $12::text='penyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='I' then pihak2_nama_lengkap end asc, 
				case when $12::text='penyewa' and coalesce($13::boolean,false)  and jenis_registrasi='I'  then pihak2_nama_lengkap end desc,
				case when $12::text='penyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='P'  then pihak2_nama_perusahaan end asc, 
				case when $12::text='penyewa' and coalesce($13::boolean,false) and jenis_registrasi='P' then pihak2_nama_perusahaan end desc,
				case when $12::text='jmlh_bulan_sewa' and not coalesce($13::boolean,false) then jmlh_bulan_sewa end asc, 
				case when $12::text='jmlh_bulan_sewa' and coalesce($13::boolean,false) then jmlh_bulan_sewa end desc,
				case when $12::text='tgl_mulai_sewa' and not coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end asc, 
				case when $12::text='tgl_mulai_sewa' and coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end desc,
				case when $12::text='tgl_berakhir_sewa' and not coalesce($13::boolean,false) then max(
					case 
						when kontrak_berakhir then kontrak_berakhir_tgl
						when id_adendum is null then kontrak.tgl_berakhir_sewa 
						when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
						else kontrak.tgl_berakhir_sewa 
					end
				) end asc, 
				case when $12::text='tgl_berakhir_sewa' and coalesce($13::boolean,false) then max(
					case 
						when kontrak_berakhir then kontrak_berakhir_tgl
						when id_adendum is null then kontrak.tgl_berakhir_sewa 
						when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
						else kontrak.tgl_berakhir_sewa 
					end
				) end desc
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_jenis', default: null },
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: '' },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_status', default: '' },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getKontrakStatusPembayaranDeposit: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
				kontrak.tgl_mulai_sewa, 				
				case 
					when kontrak_berakhir then kontrak_berakhir_tgl
					when id_adendum is null then kontrak.tgl_berakhir_sewa 
					when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
					else kontrak.tgl_berakhir_sewa 
				end tgl_berakhir_sewa,
				case 
					when inv_e.id_invoice_entries is null then false
					else true
				end sudah_bayar
			from 
				kontrak_sewa kontrak
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku
				left outer join invoice inv on inv.flag_rekon and inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
				left outer join invoice_entries inv_e on inv.no_invoice=inv_e.no_invoice and  kode_invoice_entries='INVDPST'
			where kontrak.aktif  and kontrak.approval and not kontrak_berlaku
				and kontrak.kode_rusun=$1::text
				and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
				and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
				and (
					coalesce($7::text,'')=''
					or
					kontrak.no_kontrak_sewa ilike '%'|| $7::text || '%'
					or
					kontrak.pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_lengkap ilike '%'|| $7::text || '%'
					or 
					kontrak. pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_perusahaan ilike '%'|| $7::text || '%'
				)
				and ( coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
				and (
					$9::boolean is null 
					or 
					($9::boolean=true and inv_e.id_invoice_entries is not null)
					or 
					($9::boolean=false and inv_e.id_invoice_entries is  null)
				)
			order by 
				case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
				case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
				case when $12::text='jenisReg' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
				case when $12::text='jenisReg' and coalesce($13::boolean,false) then jenis_registrasi end desc,
				case when $12::text='kpj' and not coalesce($13::boolean,false) then pihak2_kpj end asc, 
				case when $12::text='kpj' and coalesce($13::boolean,false) then pihak2_kpj end desc,
				case when $12::text='nama' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
				case when $12::text='nama' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
				case when $12::text='prs' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
				case when $12::text='prs' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
				case when $12::text='tglMulaiSewa' and not coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end asc, 
				case when $12::text='tglMulaiSewa' and coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end desc,
				kontrak.tgl_rekam desc
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_jenis', default: null },
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_bayar', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getKontrakDalamProses: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
				kontrak.tgl_mulai_sewa, 				
				case 
					when kontrak_berakhir then kontrak_berakhir_tgl
					when id_adendum is null then kontrak.tgl_berakhir_sewa 
					when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
					else kontrak.tgl_berakhir_sewa 
				end tgl_berakhir_sewa,
				case 
					when inv_e.id_invoice_entries is null then false
					else true
				end sudah_bayar,
				kontrak.approval,
				kontrak.jmlh_bulan_sewa,
				json_agg((select x from (select nama_blok,nama_lantai,nama_unit) as x  order by nama_blok,nama_lantai,nama_unit))  unit
			from 
				kontrak_sewa kontrak
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku
				left outer join invoice inv on inv.flag_rekon and inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
				left outer join invoice_entries inv_e on inv.no_invoice=inv_e.no_invoice and  kode_invoice_entries='INVDPST'
			where kontrak.aktif  and not kontrak.kontrak_berlaku
				and (
					(not kontrak.approval and kontrak.status='S')
					or
					(kontrak.approval and inv_e.id_invoice_entries is  null)
				)
				and kontrak.kode_rusun=$1::text
				and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
				and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
				and (
					coalesce($7::text,'')=''
					or
					kontrak.no_kontrak_sewa ilike '%'|| $7::text || '%'
					or
					kontrak.pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_lengkap ilike '%'|| $7::text || '%'
					or 
					kontrak. pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_perusahaan ilike '%'|| $7::text || '%'
				)
				and ( coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
				and (
					coalesce($9::text,'')=''
					or
					(coalesce($9::text,'')='A' and not kontrak.approval and kontrak.status='S')
					or
					(coalesce($9::text,'')='D' and kontrak.approval and inv_e.id_invoice_entries is  null)
				)
			group by
				kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
				kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
				kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
				kontrak.tgl_mulai_sewa, kontrak.tgl_rekam,				
				case 
					when kontrak_berakhir then kontrak_berakhir_tgl
					when id_adendum is null then kontrak.tgl_berakhir_sewa 
					when adendum.aktif and adendum.approval then adendum.tgl_berakhir_sewa 
					else kontrak.tgl_berakhir_sewa 
				end ,
				case 
					when inv_e.id_invoice_entries is null then false
					else true
				end ,
				kontrak.approval
			order by 
				case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
				case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
				case when $12::text='jenisReg' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
				case when $12::text='jenisReg' and coalesce($13::boolean,false) then jenis_registrasi end desc,
				case when $12::text='kpj' and not coalesce($13::boolean,false) then pihak2_kpj end asc, 
				case when $12::text='kpj' and coalesce($13::boolean,false) then pihak2_kpj end desc,
				case when $12::text='nama' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
				case when $12::text='nama' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
				case when $12::text='prs' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
				case when $12::text='prs' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
				case when $12::text='tglMulaiSewa' and not coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end asc, 
				case when $12::text='tglMulaiSewa' and coalesce($13::boolean,false) then kontrak.tgl_mulai_sewa end desc,
				kontrak.tgl_rekam desc
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_jenis', default: null },
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_status', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getKontrakUnit: {
    text: `select 
			kontrak_unit.*,
			unit.nama_unit, unit.no_unit, lantai.no_lantai, blok.kode_blok
		from kontrak_sewa_unit kontrak_unit
			inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where kontrak_unit.id_kontrak_sewa=$1::bigint	`,
    params: ['p_id_kontrak']
  },
  getKontrakPenghuniUnit: {
    text: `select distinct 
			 kontrak_unit.id_kontrak_sewa,penanggung_jawab, kpj, kpj_nama, nik, nik_jenis, jenis_kelamin, id_profil_penghuni, 
			reg_penghuni.id_unit, tgl_in, tgl_out, tipe_out, aktif_menghuni, reg_penghuni.aktif,
			unit.nama_unit, unit.no_unit,lantai.no_lantai, blok.kode_blok
		from 
			registrasi_penghuni reg_penghuni
			inner join kontrak_sewa_unit kontrak_unit on reg_penghuni.id_unit=kontrak_unit.id_unit 
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
			inner join rusun_unit unit on unit.id_unit=reg_penghuni.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			left outer join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku
		where 
			reg_penghuni.aktif_menghuni and reg_penghuni.aktif
			and (
				reg_penghuni.no_registrasi is null 
				or 
				(reg_penghuni.no_registrasi is not null and reg_penghuni.no_registrasi = kontrak.no_registrasi)
			)
			and (
				(id_adendum is  null and reg_penghuni.tgl_in between kontrak.tgl_mulai_sewa and kontrak.tgl_berakhir_sewa )
				or
				(id_adendum is not null and reg_penghuni.tgl_in between kontrak.tgl_mulai_sewa and adendum.tgl_berakhir_sewa )
			)
			and (
				reg_penghuni.tgl_out is null 
				or 
				reg_penghuni.tgl_out>current_date
			)
			and kontrak_unit.id_kontrak_sewa=$1::bigint
		order by reg_penghuni.id_unit`,
    params: ['p_id_kontrak']
  },
  getKontrakFasilitasUnit: {
    text: `select 
			fas_unit.* ,
			unit.nama_unit, unit.no_unit,unit.nama_unit,blok.kode_blok,
			fas.nama_fasilitas,
			f_kontrak_last_date_get(fas_unit.id_kontrak_sewa) kontrak_sewa_tgl_berakhir_sewa
		from 
			kontrak_sewa_fasilitas_unit fas_unit
			inner join rusun_unit unit on unit.id_unit=fas_unit.id_unit
			inner join fasilitas fas on fas.kode_fasilitas=fas_unit.kode_fasilitas
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where fas_unit.id_kontrak_sewa=$1::bigint	and fas_unit.aktif`,
    params: ['p_id_kontrak']
  },
  getKontrakFasilitasUnitTarif: {
    text: `select  f_tarif_fasilitas_get_bykontrak_numeric($1::bigint,$2::text, $3::date) as tarif `,
    params: ['p_id_kontrak', 'p_kode_fasilitas', 'p_periode_awal']
  },
  postKontrakFasilitasUnit: {
    text: `select f_kontrak_fasilitas_unit_add($1::text,$2::bigint,$3::int,$4::text,$5::date,$6::date) as ret`,
    params: [
      'p_pengguna',
      'p_id_kontrak',
      'p_id_unit',
      'p_kode_fasilitas',
      'tgl_mulai',
      'tgl_berakhir'
    ]
  },
  putKontrakFasilitasUnit: {
    text: `select f_kontrak_fasilitas_unit_edit($1::text,$2::bigint,$3::date) as ret`,
    params: ['p_pengguna', 'p_id_kontrak_fasilitas', 'tgl_berakhir']
  },
  delKontrakFasilitasUnit: {
    text: `select f_kontrak_fasilitas_unit_delete($1::text,$2::bigint) as ret`,
    params: ['p_pengguna', 'p_id_kontrak_fasilitas']
  },
  getKontrakBerhenti: {
    text: `select 		
				( (row_number() over()) + coalesce($12::bigint,10) * (coalesce($11::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				kontrak.no_kontrak_sewa,
				kontrak.jenis_registrasi,
				pihak2_kpj,
				pihak2_nama_lengkap,
				pihak2_nama_perusahaan,
				case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end nama_penyewa,
				wo.no_wo, wo.status as status_wo,tberakhir.nama_tipe_kontrak_berakhir,
				berhenti.id_berhenti, berhenti.id_kontrak_sewa, 
				kontrak.tgl_mulai_sewa,
				case 
					when kontrak_berakhir then kontrak_berakhir_tgl
					when tgl_berakhir_adendum is null then tgl_berakhir_sewa 
					else tgl_berakhir_adendum 
				end tgl_berakhir_sewa,
				tgl_req_berhenti_sewa, 
				tipe_berakhir, 
				alasan_berakhir, berhenti.status, berhenti.aktif, berhenti.approval, berhenti.approval_tgl, berhenti.approval_petugas, 
				berhenti.approval_alasan, berhenti.tgl_rekam, berhenti.petugas_rekam, berhenti.finalisasi_tagihan_sisa, 
				finalisasi_deposit, finalisasi_retur, finalisasi_kurang_bayar, finalisasi_kembali, finalisasi_date,
				json_agg((select x from (select unit.id_unit,unit.nama_unit,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok) as x))  unit
			from 
				kontrak_sewa_berhenti berhenti
				inner join kontrak_sewa kontrak on berhenti.id_kontrak_sewa=kontrak.id_kontrak_sewa
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit 
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join mtnc_wo wo on wo.aktif and berhenti.id_berhenti::text=wo.ref_id and wo.kode_wo_tipe='IC'
				left outer join kode_tipe_kontrak_berakhir tberakhir on tberakhir.kode_tipe_kontrak_berakhir=berhenti.tipe_berakhir
			where kontrak.kode_rusun=$1::text
				and (coalesce($2::text,'')='' or kontrak.jenis_registrasi=$2::text)
				and (coalesce($3::text,'')='' or kontrak.no_kontrak_sewa=$3::text)
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)

				and (
					$7::text=''
					or 
					kontrak.pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_lengkap ilike '%'|| $7::text || '%'
					or 
					kontrak. pihak2_kpj ilike '%'|| $7::text || '%'
					or 
					kontrak.pihak2_nama_perusahaan ilike '%'|| $7::text || '%'
					or 
					kontrak.no_kontrak_sewa ilike '%'|| $7::text || '%'
				)
				and ( coalesce($8::bigint,0)=0 or kontrak.id_kontrak_sewa=$8::bigint)
				and (coalesce($9::text,'')='' or berhenti.status=$9::text)
				and (coalesce($10::text,'')='' or wo.status=$10::text)
				and (coalesce($15::bigint,0)=0 or berhenti.id_berhenti=$15::bigint)
			group by
				kontrak.no_kontrak_sewa,
				kontrak.jenis_registrasi,
				pihak2_kpj,
				pihak2_nama_lengkap,
				pihak2_nama_perusahaan,
				case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end,
				wo.no_wo, wo.status ,tberakhir.nama_tipe_kontrak_berakhir,
				berhenti.id_berhenti, berhenti.id_kontrak_sewa, 
				kontrak.tgl_mulai_sewa,
				case	when kontrak_berakhir then kontrak_berakhir_tgl when tgl_berakhir_adendum is null then tgl_berakhir_sewa else tgl_berakhir_adendum end ,
				tgl_req_berhenti_sewa, 
				tipe_berakhir, 
				alasan_berakhir, berhenti.status, berhenti.aktif, berhenti.approval, berhenti.approval_tgl, berhenti.approval_petugas, 
				berhenti.approval_alasan, berhenti.tgl_rekam, berhenti.petugas_rekam, berhenti.finalisasi_tagihan_sisa, 
				finalisasi_deposit, finalisasi_retur, finalisasi_kurang_bayar, finalisasi_kembali, finalisasi_date
			order by 
				case when $13::text='noKontrak' and not coalesce($14::boolean,false) then no_kontrak_sewa end asc, 
				case when $13::text='noKontrak' and coalesce($14::boolean,false) then no_kontrak_sewa end desc,
				case when $13::text='jenisReg' and not coalesce($14::boolean,false) then jenis_registrasi end asc, 
				case when $13::text='jenisReg' and coalesce($14::boolean,false) then jenis_registrasi end desc,
				case when $13::text='kpj' and not coalesce($14::boolean,false) then pihak2_kpj end asc, 
				case when $13::text='kpj' and coalesce($14::boolean,false) then pihak2_kpj end desc,
				case when $13::text='namaPenyewa' and not coalesce($14::boolean,false) then (case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end) end asc, 
				case when $13::text='namaPenyewa' and coalesce($14::boolean,false) then (case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end) end desc,
				case when $13::text='wo' and not coalesce($14::boolean,false) then  wo.status  end asc, 
				case when $13::text='wo' and coalesce($14::boolean,false) then  wo.status  end desc,
				case when $13::text='tipe' and not coalesce($14::boolean,false) then  tberakhir.nama_tipe_kontrak_berakhir  end asc, 
				case when $13::text='tipe' and coalesce($14::boolean,false) then  tberakhir.nama_tipe_kontrak_berakhir  end desc,
				case when $13::text='tglMulai' and not coalesce($14::boolean,false) then  kontrak.tgl_mulai_sewa  end asc, 
				case when $13::text='tglMulai' and coalesce($14::boolean,false) then  kontrak.tgl_mulai_sewa end desc,
				case when $13::text='tglBerakhir' and not coalesce($14::boolean,false) then  case	when kontrak_berakhir then kontrak_berakhir_tgl when tgl_berakhir_adendum is null then tgl_berakhir_sewa else tgl_berakhir_adendum end  end asc, 
				case when $13::text='tglBerakhir' and coalesce($14::boolean,false) then  case	when kontrak_berakhir then kontrak_berakhir_tgl when tgl_berakhir_adendum is null then tgl_berakhir_sewa else tgl_berakhir_adendum end  end desc,
				case when $13::text='tglReq' and not coalesce($14::boolean,false) then  tgl_req_berhenti_sewa  end asc, 
				case when $13::text='tglReq' and coalesce($14::boolean,false) then  tgl_req_berhenti_sewa  end desc,
				case when $13::text='status' and not coalesce($14::boolean,false) then  berhenti.status  end asc, 
				case when $13::text='status' and coalesce($14::boolean,false) then  berhenti.status  end desc,
				berhenti.tgl_rekam desc
			limit 
				case when coalesce($12::bigint,0)::bigint>0   then $12::bigint end 
			offset 
				case 
					when coalesce($12::bigint,0)::bigint>0 then  $8::bigint * (coalesce($11::int,1)-1)
				end
		`,
    params: [
      'p_rusun',
      { name: 'p_jenis', default: null },
      { name: 'p_no_kontrak', default: '' },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: '' },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_status', default: '' },
      { name: 'p_wo_status', default: '' },
      { name: 'page', default: 1 }, // 11
      { name: 'itemsPerPage', default: 10 },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_id_berhenti', default: null }
    ]
  },
  postKontrakBerhenti: {
    text: `select f_kontrak_berhenti_submit($1::text,$2::bigint,$3::date,$4::text,$5::text) as ret`,
    params: [
      'p_pengguna',
      'p_id_kontrak_sewa',
      'p_tgl_berhenti',
      { name: 'p_tipe_berakhir', default: null },
      { name: 'p_alasan_berhenti', default: '' }
    ]
  },
  getKontrakDaftarItem: {
    text: `with data_items as (
			select distinct on (id_inventaris_unit)
				kontrak_items.id_inventaris_unit, kontrak_items.kode_aset,kontrak_items.id_unit ,kontrak_items.id_kontrak_sewa ,
				kontrak_items.tgl_penempatan_in , kontrak_items.tgl_penempatan_out, kontrak_items.tgl_kondisi_awal , kontrak_items.kondisi_awal ,
				kontrak_items.biaya_kehilangan , kontrak_items.biaya_kerusakan ,
				case when kontrak_items.kondisi_akhir is null then kondisi_akhir.tgl_kondisi else kontrak_items.tgl_kondisi_akhir end tgl_kondisi_akhir ,
				case when kontrak_items.kondisi_akhir is null then kondisi_akhir.kondisi_aset else kontrak_items.kondisi_akhir end kondisi_akhir 
			from 
				kontrak_sewa_inventaris_items kontrak_items
				inner join kontrak_sewa on kontrak_sewa.id_kontrak_sewa=kontrak_items.id_kontrak_sewa
				left outer join kontrak_sewa_berhenti ksb on ksb.aktif and ksb.approval  and kontrak_sewa.id_kontrak_sewa =ksb.id_kontrak_sewa 
				left outer join aset_kondisi kondisi_akhir on (
					kontrak_items.kode_aset=kondisi_akhir.kode_aset 
					and tgl_kondisi<=case
										when ksb.id_berhenti is not null then ksb.tgl_req_berhenti_sewa 
										when kontrak_berakhir then kontrak_berakhir_tgl 
										when tgl_berakhir_adendum is not null  then tgl_berakhir_adendum
										else tgl_berakhir_sewa
									end 
				)
			where 
				kontrak_items.aktif and
				kontrak_items.id_kontrak_sewa=$1::bigint
				and (
					coalesce($2::int,0)=0
					or id_unit=$2::int
				)
			order by id_inventaris_unit,tgl_kondisi desc, kondisi_akhir.tgl_rekam desc
		) 
		select 
				data_items.kode_aset,data_items.biaya_kerusakan, data_items.biaya_kehilangan,
				tgl_kondisi_awal,kondisi_awal,( select nama_kondisi from kode_aset_kondisi where kode_kondisi=data_items.kondisi_awal) nama_kondisi_awal,
				tgl_kondisi_akhir,kondisi_akhir,( select nama_kondisi from kode_aset_kondisi where kode_kondisi=data_items.kondisi_akhir) nama_kondisi_akhir,
				unit.id_unit,nama_blok,nama_lantai, nama_unit,
				nama_satuan,aset.nama_aset, tgl_penempatan_in, tgl_penempatan_out
			from 
				data_items
				inner join aset on aset.kode_aset=data_items.kode_aset
				inner join rusun_unit unit on unit.id_unit=data_items.id_unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
				left outer join kode_satuan satuan on satuan.kode_satuan=aset.kode_satuan
			order by nama_blok,nama_lantai,nama_unit,aset.nama_aset,data_items.kode_aset`,
    params: ['p_id_kontrak_sewa', { name: 'p_id_unit', default: null }]
  },
  getKontrakBerhentiFinalisasi: {
    text: `select f_kontrak_berhenti_finalisasi_check_data($1::bigint) as ret`,
    params: ['p_id_berhenti']
  },
  putKontrakBerhentiFinalisasi: {
    text: `select f_kontrak_berhenti_finalisasi($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_berhenti']
  },
  getKontrakLampiran: {
    text: `select * 
				from kontrak_lampiran 
				where aktif 
					and no_perjanjian in(
						select no_kontrak_sewa nomor from kontrak_sewa where id_kontrak_sewa=$1::bigint and jenis_perjanjian='K'
						union all
						select no_adendum nomor from kontrak_sewa_adendum where id_kontrak_sewa=$1::bigint and jenis_perjanjian='A'
					)`,
    params: ['p_id_kontrak_sewa']
  },
  getKontrakLampiranFile: {
    text: `select * from kontrak_lampiran where aktif and id_kontrak_lampiran=$1::bigint`,
    params: ['p_id_kontrak_lampiran']
  },
  postKontrakLampiran: {
    text: `select f_kontrak_lampiran_save($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_pengguna', 'p_jenis_perjanjian', 'p_no_perjanjian', 'p_path']
  },
  getKontrakNoPerjanjian: {
    text: `select
				case 
					when $1::text='K' then (select no_kontrak_sewa from kontrak_sewa where id_kontrak_sewa=$2::bigint)
					when $1::text='A' then (select no_adendum from kontrak_sewa_adendum where id_kontrak_sewa=$2::bigint)
					else ''
				end no_perjanjian`,
    params: ['p_jenis_perjanjian', 'p_id_kontrak_sewa']
  }
}
