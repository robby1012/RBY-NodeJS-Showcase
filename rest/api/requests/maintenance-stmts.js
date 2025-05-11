/* eslint-disable no-mixed-spaces-and-tabs */
const moment = require('moment')
module.exports = {
  getMtncWo: {
    text: `select 
				( (row_number() over()) + coalesce($12::bigint,10) * (coalesce($11::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				rusun.nama_rusun,blok.nama_blok,lantai.nama_lantai,unit.nama_unit, lantai.no_lantai, unit.no_unit,
				lantai.id_lantai,lantai.id_rusun_blok,
				wo_tipe.nama_wo_tipe,
				case when mtnc_wo.tgl_ubah is null then mtnc_wo.tgl_rekam else mtnc_wo.tgl_ubah end tgl_urutan,
				mtnc_wo.*,
				(
					select json_agg(t) from (
						select id_wo_lampiran, nama_dokumen
						from mtnc_wo_lampiran lampiran
						where aktif and lampiran.no_wo=mtnc_wo.no_wo
					) t
				) lampiran
			from 
				mtnc_wo
				inner join rusun on rusun.kode_rusun=mtnc_wo.kode_rusun
				inner join kode_wo_tipe wo_tipe on wo_tipe.kode_wo_tipe=mtnc_wo.kode_wo_tipe
				left outer join rusun_unit unit on unit.id_unit=mtnc_wo.id_unit
				left outer join rusun_lantai lantai on lantai.id_lantai=mtnc_wo.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=mtnc_wo.id_rusun_blok
			where
				mtnc_wo.kode_rusun=$1::text
				and ( coalesce($2::int,0)=0 or mtnc_wo.id_rusun_blok=$2::int)	
				and (coalesce($3::int,0)=0 or mtnc_wo.id_lantai=$3::int)	
				and (coalesce($4::int,0)=0 or mtnc_wo.id_unit=$4::int)	
				and (coalesce($5::text,'')='' or mtnc_wo.kode_wo_tipe=$5::text)	
				and (coalesce($6::text,'')='' or mtnc_wo.status=$6::text)	
				and (coalesce($7::text,'')='' or mtnc_wo.completion_status=$7::text)	
				and (coalesce($8::text,'')='' or mtnc_wo.no_wo=$8::text)
				and (coalesce($9::text,'')='' or mtnc_wo.ref_id=$9::text)
				and (mtnc_wo.aktif=coalesce($10::boolean,true))	
			order by 
					case when $13::text='noWO' and not coalesce($14::boolean,false) then mtnc_wo.no_wo end asc, 
					case when $13::text='noWO' and coalesce($14::boolean,false) then mtnc_wo.no_wo end desc,
					case when $13::text='tglOrder' and not coalesce($14::boolean,false) then mtnc_wo.tgl_request end asc, 
					case when $13::text='tglOrder' and coalesce($14::boolean,false) then mtnc_wo.tgl_request end desc,
					case when $13::text='jenisLokasi' and not coalesce($14::boolean,false) then mtnc_wo.jenis_lokasi end asc, 
					case when $13::text='jenisLokasi' and coalesce($14::boolean,false) then mtnc_wo.jenis_lokasi end desc,
					case when $13::text='blok' and not coalesce($14::boolean,false) then blok.nama_blok end asc, 
					case when $13::text='blok' and coalesce($14::boolean,false) then blok.nama_blok end desc,
					case when $13::text='lantai' and not coalesce($14::boolean,false) then lantai.nama_lantai end asc, 
					case when $13::text='lantai' and coalesce($14::boolean,false) then lantai.nama_lantai end desc,
					case when $13::text='unit' and not coalesce($14::boolean,false) then unit.nama_unit end asc, 
					case when $13::text='unit' and coalesce($14::boolean,false) then unit.nama_unit end desc,
					case when $13::text='lokasi' and not coalesce($14::boolean,false) then mtnc_wo.lokasi end asc, 
					case when $13::text='lokasi' and coalesce($14::boolean,false) then mtnc_wo.lokasi end desc,
					case when $13::text='requester' and not coalesce($14::boolean,false) then mtnc_wo.nama_requester end asc, 
					case when $13::text='requester' and coalesce($14::boolean,false) then mtnc_wo.nama_requester end desc,
					case when $13::text='woTipe' and coalesce($14::boolean,false) then wo_tipe.nama_wo_tipe end desc,
					case when $13::text='woTitle' and not coalesce($14::boolean,false) then mtnc_wo.title_wo end asc, 
					case when $13::text='woTitle' and coalesce($14::boolean,false) then mtnc_wo.title_wo end desc,
					case when $13::text='woStatus' and not coalesce($14::boolean,false) then mtnc_wo.status end asc, 
					case when $13::text='woStatus' and coalesce($14::boolean,false) then mtnc_wo.status end desc,
					tgl_urutan desc
			limit 
				case when coalesce($12::bigint,0)::bigint>0   then $12::bigint end 
			offset 
				case 
					when coalesce($12::bigint,0)::bigint>0 then  $12::bigint * (coalesce($11::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_blok', default: null },
      { name: 'p_lantai', default: null },
      { name: 'p_unit', default: null },
      { name: 'p_tipe', default: null },
      { name: 'p_status', default: null },
      { name: 'p_complete_status', default: null },
      { name: 'p_no', default: null },
      { name: 'p_ref', default: null },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 11
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getMtncWoLampiranByNo: {
    text: `select id_wo_lampiran, nama_dokumen
		from mtnc_wo_lampiran lampiran
		where aktif and lampiran.no_wo=$1::text`,
    params: ['p_no_wo']
  },
  postMtncWo: {
    text: `select f_mtnc_wo_submit($1::text,$2::text,$3::text,$4::int,$5::int,$6::int,$7::text,$8::text,$9::text,$10::date,$11::text,$12::text,$13::text,$14::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_rusun',
      { name: 'p_no_wo', default: null },
      { name: 'p_blok', default: null },
      { name: 'p_lantai', default: null },
      { name: 'p_unit', default: null },
      'p_nama',
      'p_jenis_lokasi',
      { name: 'p_lokasi', default: null },
      'p_req_complete_date',
      'p_title',
      { name: 'p_deskripsi', default: null },
      { name: 'p_tipe', default: null },
      { name: 'p_ref', default: null }
    ]
  },
  delMtncWo: {
    text: `select f_mtnc_wo_cancel($1::text,$2::text,$3::text) as ret`,
    params: ['p_kode_pengguna', 'p_no_wo', { name: 'p_alasan', default: null }]
  },
  putMtncWoAsign: {
    text: `select f_mtnc_wo_assign($1::text,$2::text,$3::text,$4::date,$5::date,$6::text,$7::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_no_wo',
      'p_assign_to',
      'p_work_start_date',
      { name: 'p_completion_target_date', default: null },
      { name: 'p_prioritas', default: 'H' },
      'p_notes'
    ]
  },
  putMtncWoResult: {
    text: `select f_mtnc_wo_result_submit($1::text,$2::text,$3::date,$4::text,$5::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_no_wo',
      'p_completion_actual_date',
      { name: 'p_completion_status', default: 'U' },
      'p_notes'
    ]
  },
  getMtncWoLampiran: {
    text: `select * from mtnc_wo_lampiran 
			where aktif 
			and id_wo_lampiran=$1::bigint`,
    params: [{ name: 'p_id', default: 0 }]
  },
  postMtncWoLampiran: {
    text: `select f_mtnc_wo_lampiran_save($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_kode_pengguna', 'p_no_wo', 'p_dokumen', 'p_path']
  },
  delMtncWoLampiran: {
    text: `select f_mtnc_wo_lampiran_delete($1::text,$2::bigint) as ret`,
    params: ['p_pengguna', 'p_id']
  },
  /* yang baru untuk air dan listrik */
  // getMtncListrikLog: {
  //   text: `select
  // 						( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris,
  // 						(count(*) OVER())::int AS full_count_baris,
  //             kontrak.id_kontrak_sewa,kontrak.no_kontrak_sewa, kontrak.jenis_registrasi,kontrak.pihak2_nama_lengkap, kontrak.pihak2_nama_perusahaan,kontrak.pihak2_kpj,kontrak.pihak2_npp,
  //             kontrak_unit.id_unit,
  //             blok.kode_blok, unit.no_unit, unit.nama_unit, unit.no_unit, lantai.no_lantai,lantai.id_lantai,lantai.id_rusun_blok,
  //             listrik_log.*
  //           from
  //             kontrak_sewa kontrak
  //             inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
  //             inner join rusun_unit unit on unit.id_unit=kontrak_unit.id_unit
  //             inner join listrik_meter_log listrik_log on listrik_log.id_unit=unit.id_unit
  // 						inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  //           where
  // 						listrik_log.aktif
  //             and kontrak.kode_rusun=$1::text
  //             and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
  // 						and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 						and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 						and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)
  // 						and ( $6::boolean is null or listrik_log.use_in_billing=$6::boolean)
  // 						and date_trunc('month',listrik_log.tgl_end_meter)= ($7::text||'-01')::date
  // 						and
  // 						(
  // 							coalesce($8::text,'')=''
  // 							or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
  // 							or kontrak.pihak2_kpj like '%' || $8::text || '%'
  // 							or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
  // 							or kontrak.pihak2_npp like '%' || $8::text || '%'
  // 							or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
  // 						)
  // 						and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
  // 					order by
  // 						case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan end asc,
  // 						case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan end desc,
  // 						case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
  // 						case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
  // 						case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc,
  // 						case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
  // 						case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc,
  // 						case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
  // 						case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc,
  // 						case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
  // 						case when $12::text='unit' and not coalesce($13::boolean,false) then unit.nama_unit end asc,
  // 						case when $12::text='unit' and coalesce($13::boolean,false) then unit.nama_unit end desc,
  // 						case when $12::text='tglMeterAwal' and not coalesce($13::boolean,false) then listrik_log.tgl_start_meter end asc,
  // 						case when $12::text='tglMeterAwal' and coalesce($13::boolean,false) then listrik_log.tgl_start_meter end desc,
  // 						case when $12::text='tglMeterAkhir' and not coalesce($13::boolean,false) then listrik_log.tgl_end_meter end asc,
  // 						case when $12::text='tglMeterAkhir' and coalesce($13::boolean,false) then listrik_log.tgl_end_meter end desc,
  // 						case when $12::text='meterAwal' and not coalesce($13::boolean,false) then listrik_log.meter_start end asc,
  // 						case when $12::text='meterAwal' and coalesce($13::boolean,false) then listrik_log.meter_start end desc,
  // 						case when $12::text='meterAkhir' and not coalesce($13::boolean,false) then listrik_log.meter_end end asc,
  // 						case when $12::text='meterAkhir' and coalesce($13::boolean,false) then listrik_log.meter_end end desc,
  // 						case when $12::text='pemakaian' and not coalesce($13::boolean,false) then meter_pemakaian end asc,
  // 						case when $12::text='pemakaian' and coalesce($13::boolean,false) then meter_pemakaian end desc,
  // 						listrik_log.tgl_start_meter desc, listrik_log.tgl_end_meter desc, kontrak.id_kontrak_sewa, unit.id_unit
  // 					limit
  // 						case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end
  // 					offset
  // 						case
  // 							when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
  // 						end`,
  //   params: [
  //     'p_rusun',
  //     { name: 'p_no_kontrak', default: null },
  //     { name: 'p_id_blok', default: null },
  //     { name: 'p_id_lantai', default: null },
  //     { name: 'p_id_unit', default: null }, // 5
  //     { name: 'p_in_billing', default: null },
  //     { name: 'p_blth', default: moment().format('YYYY-MM') },
  //     { name: 'p_search', default: null },
  //     { name: 'p_jenis_kontrak', default: null },
  //     { name: 'page', default: 1 }, // 10
  //     { name: 'itemsPerPage', default: null },
  //     { name: 'sortBy', default: null },
  //     { name: 'sortDesc', default: null }
  //   ]
  // },
  getMtncListrikLog: {
    text: `select 
							( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
							(count(*) OVER())::int AS full_count_baris,
              blok.nama_blok, lantai.nama_lantai , unit.nama_unit, unit.id_unit,
              listrik_log.*
						from 
              rusun_unit unit 
              inner join listrik_meter_log listrik_log on listrik_log.id_unit=unit.id_unit
              inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
              left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where 
            listrik_log.aktif
							and lantai.kode_rusun=$1::text
							and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
							and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
							and ( coalesce($4::int,0) = 0	or  unit.id_unit=$4::int)	
							and ( $5::boolean is null or listrik_log.use_in_billing=$5::boolean)
							and ( coalesce($6::text,'')='' or to_char(listrik_log.tgl_end_meter,'YYYY-MM')= $6::text)
							and 
							(
								coalesce($7::text,'')='' 
								or unit.nama_unit ilike '%' || $7::text || '%'
								or lantai.nama_lantai ilike '%' || $7::text || '%'
								or blok.nama_blok ilike '%' || $7::text || '%'
							)
						order by 
              case when $10::text='blok' and not coalesce($11::boolean,false) then blok.nama_blok end asc, 
              case when $10::text='blok' and coalesce($11::boolean,false) then blok.nama_blok end desc,
              case when $10::text='lantai' and not coalesce($11::boolean,false) then lantai.nama_lantai end asc, 
              case when $10::text='lantai' and coalesce($11::boolean,false) then lantai.nama_lantai end desc,
              case when $10::text='unit' and not coalesce($11::boolean,false) then unit.nama_unit end asc, 
              case when $10::text='unit' and coalesce($11::boolean,false) then unit.nama_unit end desc,
              case when $10::text='petugasPencatat' and not coalesce($11::boolean,false) then listrik_log.petugas_pencatat end asc, 
              case when $10::text='petugasPencatat' and coalesce($11::boolean,false) then listrik_log.petugas_pencatat end desc,
              case when $10::text='tglMeterAwal' and not coalesce($11::boolean,false) then listrik_log.tgl_start_meter end asc, 
              case when $10::text='tglMeterAwal' and coalesce($11::boolean,false) then listrik_log.tgl_start_meter end desc,
              case when $10::text='tglMeterAkhir' and not coalesce($11::boolean,false) then listrik_log.tgl_end_meter end asc, 
              case when $10::text='tglMeterAkhir' and coalesce($11::boolean,false) then listrik_log.tgl_end_meter end desc,
              case when $10::text='meterAwal' and not coalesce($11::boolean,false) then listrik_log.meter_start end asc, 
              case when $10::text='meterAwal' and coalesce($11::boolean,false) then listrik_log.meter_start end desc,
              case when $10::text='meterAkhir' and not coalesce($11::boolean,false) then listrik_log.meter_end end asc, 
              case when $10::text='meterAkhir' and coalesce($11::boolean,false) then listrik_log.meter_end end desc,
              case when $10::text='pemakaian' and not coalesce($11::boolean,false) then meter_pemakaian end asc, 
              case when $10::text='pemakaian' and coalesce($11::boolean,false) then meter_pemakaian end desc,
              blok.nama_blok, lantai.nama_lantai, unit.nama_unit,listrik_log.tgl_start_meter desc, listrik_log.tgl_end_meter desc, unit.id_unit
						limit 
							case when coalesce($9::bigint,0)::bigint>0   then $9::bigint end 
						offset 
							case 
								when coalesce($9::bigint,0)::bigint>0 then  $9::bigint * (coalesce($8::int,1)-1)
							end`,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 4
      { name: 'p_in_billing', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getMtncListrikLogById: {
    text: `select 
              blok.kode_blok, unit.no_unit, unit.nama_unit, unit.no_unit, lantai.no_lantai,lantai.id_lantai,lantai.id_rusun_blok,
              listrik_log.*
            from 
              rusun_unit unit 
              inner join listrik_meter_log listrik_log on listrik_log.id_unit=unit.id_unit
							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
            where listrik_log.id_listrik_meter_log=$1::bigint`,
    params: ['p_id']
  },
  postMtncListrikLog: {
    text: `select f_listrik_log_submit($1::text,$2::text,$3::int,$4::date,$5::date,$6::int,$7::int,$8::text) as ret`,
    params: [
      'p_kode_pengguna',
      { name: 'p_petugas_pencatat', default: null },
      'p_id_listrik_meter_log',
      'p_tgl_start_meter',
      'p_tgl_end_meter',
      'p_meter_start',
      'p_meter_end',
      { name: 'p_keterangan', default: null }
    ]
  },
  postMtncListrikLogMasal: {
    text: `select f_listrik_log_submit_masal($1::text,$2::json) as ret`,
    params: [
      'p_kode_pengguna',
      {
        name: 'p_data_logs',
        type: 'array-json',
        data: [
          'p_id_unit',
          'p_petugas_pencatat',
          'p_tgl_pencatatan',
          'p_tgl_start_meter',
          'p_tgl_end_meter',
          'p_meter_start',
          'p_meter_end'
        ]
      }
    ]
  },
  delMtncListrikLog: {
    text: `select f_listrik_log_cancel($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_listrik_log']
  },
  getMtncTempLogListrik: {
    text: `select distinct on(id_unit,nama_unit,nama_lantai,nama_blok)
    unit.id_unit, blok.nama_blok, lantai.nama_lantai, unit.nama_unit,
    tgl_pencatatan tgl_pencatatan_lalu,tgl_start_meter tgl_start_meter_lalu,tgl_end_meter tgl_end_meter_lalu,
    meter_start meter_start_lalu,meter_end meter_end_lalu,meter_pemakaian meter_pemakaian_lalu,petugas_pencatat petugas_pencatat_lalu
  from
    rusun_unit unit 
    inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai 
    left outer join listrik_meter_log  air on air.id_unit=unit.id_unit and tgl_pencatatan<=$2::date  and air.aktif 
    left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
  where 
    unit.aktif and lantai.aktif 
    and lantai.kode_rusun=$1::text
  order by nama_blok,nama_lantai,nama_unit,id_unit,tgl_pencatatan desc`,
    params: ['p_rusun', 'p_tgl_pencatatan']
  },
  // getMtncAirLog: {
  //   text: `select
  // 						( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris,
  // 						(count(*) OVER())::int AS full_count_baris,
  // 						kontrak.id_kontrak_sewa,kontrak.no_kontrak_sewa, kontrak.jenis_registrasi,kontrak.pihak2_nama_lengkap, kontrak.pihak2_nama_perusahaan,kontrak.pihak2_kpj,kontrak.pihak2_npp,
  // 						kontrak_unit.id_unit,
  // 						blok.kode_blok, unit.no_unit, unit.nama_unit, unit.no_unit, lantai.no_lantai,lantai.id_lantai,lantai.id_rusun_blok,
  // 						air_log.*
  // 					from
  // 						kontrak_sewa kontrak
  // 						inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
  // 						inner join rusun_unit unit on unit.id_unit=kontrak_unit.id_unit
  // 						inner join air_meter_log air_log on air_log.id_unit=unit.id_unit
  // 						inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  // 					where
  // 						air_log.aktif
  // 						and kontrak.kode_rusun=$1::text
  // 						and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
  // 						and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 						and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 						and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)
  // 						and ( $6::boolean is null or air_log.use_in_billing=$6::boolean)
  // 						and date_trunc('month',air_log.tgl_end_meter)= ($7::text||'-01')::date
  // 						and
  // 						(
  // 							coalesce($8::text,'')=''
  // 							or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
  // 							or kontrak.pihak2_kpj like '%' || $8::text || '%'
  // 							or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
  // 							or kontrak.pihak2_npp like '%' || $8::text || '%'
  // 							or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
  // 						)
  // 						and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
  // 					order by
  // 						case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan end asc,
  // 						case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan end desc,
  // 						case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
  // 						case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
  // 						case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc,
  // 						case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
  // 						case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc,
  // 						case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
  // 						case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc,
  // 						case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
  // 						case when $12::text='unit' and not coalesce($13::boolean,false) then unit.nama_unit end asc,
  // 						case when $12::text='unit' and coalesce($13::boolean,false) then unit.nama_unit end desc,
  // 						case when $12::text='tglMeterAwal' and not coalesce($13::boolean,false) then air_log.tgl_start_meter end asc,
  // 						case when $12::text='tglMeterAwal' and coalesce($13::boolean,false) then air_log.tgl_start_meter end desc,
  // 						case when $12::text='tglMeterAkhir' and not coalesce($13::boolean,false) then air_log.tgl_end_meter end asc,
  // 						case when $12::text='tglMeterAkhir' and coalesce($13::boolean,false) then air_log.tgl_end_meter end desc,
  // 						case when $12::text='meterAwal' and not coalesce($13::boolean,false) then air_log.meter_start end asc,
  // 						case when $12::text='meterAwal' and coalesce($13::boolean,false) then air_log.meter_start end desc,
  // 						case when $12::text='meterAkhir' and not coalesce($13::boolean,false) then air_log.meter_end end asc,
  // 						case when $12::text='meterAkhir' and coalesce($13::boolean,false) then air_log.meter_end end desc,
  // 						case when $12::text='pemakaian' and not coalesce($13::boolean,false) then meter_pemakaian end asc,
  // 						case when $12::text='pemakaian' and coalesce($13::boolean,false) then meter_pemakaian end desc,
  // 						air_log.tgl_start_meter desc, air_log.tgl_end_meter desc, kontrak.id_kontrak_sewa, unit.id_unit
  // 					limit
  // 						case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end
  // 					offset
  // 						case
  // 							when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
  // 						end`,
  //   params: [
  //     'p_rusun',
  //     { name: 'p_no_kontrak', default: null },
  //     { name: 'p_id_blok', default: null },
  //     { name: 'p_id_lantai', default: null },
  //     { name: 'p_id_unit', default: null }, // 5
  //     { name: 'p_in_billing', default: null },
  //     { name: 'p_blth', default: moment().format('YYYY-MM') },
  //     { name: 'p_search', default: null },
  //     { name: 'p_jenis_kontrak', default: null },
  //     { name: 'page', default: 1 }, // 10
  //     { name: 'itemsPerPage', default: null },
  //     { name: 'sortBy', default: null },
  //     { name: 'sortDesc', default: null }
  //   ]
  // },
  getMtncAirLog: {
    text: `select 
							( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
							(count(*) OVER())::int AS full_count_baris,
              blok.nama_blok, lantai.nama_lantai , unit.nama_unit, unit.id_unit,
              air_log.*
						from 
              rusun_unit unit 
              inner join air_meter_log air_log on air_log.id_unit=unit.id_unit
              inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
              left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where 
							air_log.aktif
							and lantai.kode_rusun=$1::text
							and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
							and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
							and ( coalesce($4::int,0) = 0	or  unit.id_unit=$4::int)	
							and ( $5::boolean is null or air_log.use_in_billing=$5::boolean)
							and to_char(air_log.tgl_end_meter,'YYYY-MM')= $6::text
							and 
							(
								coalesce($7::text,'')='' 
								or unit.nama_unit ilike '%' || $7::text || '%'
								or lantai.nama_lantai ilike '%' || $7::text || '%'
								or blok.nama_blok ilike '%' || $7::text || '%'
							)
						order by 
              case when $10::text='blok' and not coalesce($11::boolean,false) then blok.nama_blok end asc, 
              case when $10::text='blok' and coalesce($11::boolean,false) then blok.nama_blok end desc,
              case when $10::text='lantai' and not coalesce($11::boolean,false) then lantai.nama_lantai end asc, 
              case when $10::text='lantai' and coalesce($11::boolean,false) then lantai.nama_lantai end desc,
              case when $10::text='unit' and not coalesce($11::boolean,false) then unit.nama_unit end asc, 
              case when $10::text='unit' and coalesce($11::boolean,false) then unit.nama_unit end desc,
              case when $10::text='petugasPencatat' and not coalesce($11::boolean,false) then air_log.petugas_pencatat end asc, 
              case when $10::text='petugasPencatat' and coalesce($11::boolean,false) then air_log.petugas_pencatat end desc,
              case when $10::text='tglMeterAwal' and not coalesce($11::boolean,false) then air_log.tgl_start_meter end asc, 
              case when $10::text='tglMeterAwal' and coalesce($11::boolean,false) then air_log.tgl_start_meter end desc,
              case when $10::text='tglMeterAkhir' and not coalesce($11::boolean,false) then air_log.tgl_end_meter end asc, 
              case when $10::text='tglMeterAkhir' and coalesce($11::boolean,false) then air_log.tgl_end_meter end desc,
              case when $10::text='meterAwal' and not coalesce($11::boolean,false) then air_log.meter_start end asc, 
              case when $10::text='meterAwal' and coalesce($11::boolean,false) then air_log.meter_start end desc,
              case when $10::text='meterAkhir' and not coalesce($11::boolean,false) then air_log.meter_end end asc, 
              case when $10::text='meterAkhir' and coalesce($11::boolean,false) then air_log.meter_end end desc,
              case when $10::text='pemakaian' and not coalesce($11::boolean,false) then meter_pemakaian end asc, 
              case when $10::text='pemakaian' and coalesce($11::boolean,false) then meter_pemakaian end desc,
              blok.nama_blok, lantai.nama_lantai, unit.nama_unit,air_log.tgl_start_meter desc, air_log.tgl_end_meter desc, unit.id_unit
						limit 
							case when coalesce($9::bigint,0)::bigint>0   then $9::bigint end 
						offset 
							case 
								when coalesce($9::bigint,0)::bigint>0 then  $9::bigint * (coalesce($8::int,1)-1)
							end`,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 4
      { name: 'p_in_billing', default: null },
      { name: 'p_blth', default: moment().format('YYYY-MM') },
      { name: 'p_search', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getMtncAirLogById: {
    text: `select 
							blok.kode_blok, unit.no_unit, unit.nama_unit, unit.no_unit, lantai.no_lantai,lantai.id_lantai,lantai.id_rusun_blok,
							air_log.*
						from 
              rusun_unit unit 
							inner join air_meter_log air_log on air_log.id_unit=unit.id_unit
							inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
							left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
						where air_log.id_air_meter_log=$1::bigint`,
    params: ['p_id']
  },
  postMtncAirLog: {
    text: `select f_air_log_submit($1::text,$2::text,$3::int,$4::date,$5::date,$6::int,$7::int,$8::text) as ret`,
    params: [
      'p_kode_pengguna',
      { name: 'p_petugas_pencatat', default: null },
      'p_id_air_meter_log',
      'p_tgl_start_meter',
      'p_tgl_end_meter',
      'p_meter_start',
      'p_meter_end',
      { name: 'p_keterangan', default: null }
    ]
  },
  postMtncAirLogMasal: {
    text: `select f_air_log_submit_masal($1::text,$2::json) as ret`,
    params: [
      'p_kode_pengguna',
      {
        name: 'p_data_logs',
        type: 'array-json',
        data: [
          'p_id_unit',
          'p_petugas_pencatat',
          'p_tgl_pencatatan',
          'p_tgl_start_meter',
          'p_tgl_end_meter',
          'p_meter_start',
          'p_meter_end'
        ]
      }
    ]
  },
  delMtncAirLog: {
    text: `select f_air_log_cancel($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_air_log']
  },
  getMtncTempLogAir: {
    text: `select distinct on(id_unit,nama_unit,nama_lantai,nama_blok)
    unit.id_unit, blok.nama_blok, lantai.nama_lantai, unit.nama_unit,
    tgl_pencatatan tgl_pencatatan_lalu,tgl_start_meter tgl_start_meter_lalu,tgl_end_meter tgl_end_meter_lalu,
    meter_start meter_start_lalu,meter_end meter_end_lalu,meter_pemakaian meter_pemakaian_lalu,petugas_pencatat petugas_pencatat_lalu
  from
    rusun_unit unit 
    inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai 
    left outer join air_meter_log  air on air.id_unit=unit.id_unit and tgl_pencatatan<=$2::date  and air.aktif 
    left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
  where 
    unit.aktif and lantai.aktif 
    and lantai.kode_rusun=$1::text
  order by nama_blok,nama_lantai,nama_unit,id_unit,tgl_pencatatan desc`,
    params: ['p_rusun', 'p_tgl_pencatatan']
  },
  getMtncListrikLastDataByUnit: {
    text: `select 
            *
          from listrik_meter_log lml 
          where id_unit =$1::int and aktif
          order by tgl_end_meter  desc
          limit 1`,
    params: ['p_id_unit']
  },
  getMtncAirLastDataByUnit: {
    text: `select 
            *
          from air_meter_log lml 
          where id_unit =$1::int and aktif
          order by tgl_end_meter  desc
          limit 1`,
    params: ['p_id_unit']
  }
}
