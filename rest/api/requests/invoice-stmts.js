/* eslint-disable no-mixed-spaces-and-tabs */
// const moment = require('moment')
// collapse: ctrl+k+0
// uncollapse: ctrl+k+j
const moment = require('moment')
module.exports = {
  //   getInvoiceEntriesSewa: {
  //     text: `select
  // 			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris,
  // 			(count(*) OVER())::int AS full_count_baris,
  // 			invsewa.tahun_bulan_tagihan, invsewa.status, invsewa.periode_bln_sewa_awal,invsewa.periode_bln_sewa_akhir,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan,
  // 			sum(tarif_unit) tarif,
  // 			sum(pajak_nominal) pajak,
  // 			sum(pajak_nominal_dibayar_penyewa) pajak_dibayar_penyewa,
  // 			sum(nominal_akhir) nominal,
  // 			max(invsewa.tgl_rekam) tgl_rekam,
  // 			max(invsewa.tgl_ubah) tgl_ubah,
  // 			json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok order by nama_unit) as x))  unit
  // 		from
  // 			invoice_entries_invsewa invsewa
  // 			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invsewa.id_kontrak_sewa
  // 			inner join rusun_unit unit on invsewa.id_unit=unit.id_unit
  // 			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  // 		where
  // 			kontrak.kode_rusun=$1::text
  // 			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
  // 			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)
  // 			and ( coalesce($6::text,'')='' or invsewa.status=$6::text)
  // 			and ( coalesce($7::text,'')='' or invsewa.tahun_bulan_tagihan=$7::text)
  // 			and
  // 			(
  // 				coalesce($8::text,'')=''
  // 				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
  // 				or kontrak.pihak2_kpj like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
  // 				or kontrak.pihak2_npp like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
  // 			)
  // 			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
  // 			and invsewa.aktif
  // 		group by
  // 			invsewa.tahun_bulan_tagihan,invsewa.status, invsewa.periode_bln_sewa_awal,invsewa.periode_bln_sewa_akhir,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan
  // 		order by
  // 			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc,
  // 			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
  // 			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
  // 			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
  // 			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc,
  // 			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
  // 			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc,
  // 			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
  // 			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc,
  // 			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
  // 			case when $12::text='tarif' and not coalesce($13::boolean,false) then sum(tarif_unit) end asc,
  // 			case when $12::text='tarif' and coalesce($13::boolean,false) then sum(tarif_unit) end desc,
  // 			case when $12::text='pajak' and not coalesce($13::boolean,false) then sum(pajak_nominal) end asc,
  // 			case when $12::text='pajak' and coalesce($13::boolean,false) then sum(pajak_nominal) end desc,
  // 			case when $12::text='nomTagihan' and not coalesce($13::boolean,false) then sum(nominal_akhir) end asc,
  // 			case when $12::text='nomTagihan' and coalesce($13::boolean,false) then sum(nominal_akhir) end desc,
  // 			case when $12::text='status' and not coalesce($13::boolean,false) then invsewa.status end asc,
  // 			case when $12::text='status' and coalesce($13::boolean,false) then invsewa.status end desc,
  // 			tgl_rekam
  // 		limit
  // 			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end
  // 		offset
  // 			case
  // 				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
  // 			end`,
  //     params: [
  //       'p_rusun',
  //       { name: 'p_no_kontrak', default: null },
  //       { name: 'p_id_blok', default: null },
  //       { name: 'p_id_lantai', default: null },
  //       { name: 'p_id_unit', default: null }, // 5
  //       { name: 'p_status', default: null },
  //       { name: 'p_blth', default: null },
  //       { name: 'p_search', default: null },
  //       { name: 'p_jenis_kontrak', default: null },
  //       { name: 'page', default: 1 }, // 10
  //       { name: 'itemsPerPage', default: null },
  //       { name: 'sortBy', default: null },
  //       { name: 'sortDesc', default: null }
  //     ]
  //   },
  getInvoiceEntriesSewa: {
    text: `select 			
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			invsewa.id_invoice_entries_invsewa,invsewa.tahun_bulan_tagihan, invsewa.status, invsewa.periode_bln_sewa_awal,invsewa.periode_bln_sewa_akhir,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			tarif_unit, 
			pajak_prosen,
			pajak_nominal,
			pajak_nominal_dibayar_penyewa,
			nominal_akhir,
			invsewa.tgl_rekam,
			invsewa.tgl_ubah,
			nama_blok, nama_lantai, nama_unit
		from 
			invoice_entries_invsewa invsewa
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invsewa.id_kontrak_sewa
			inner join rusun_unit unit on invsewa.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or invsewa.status=$6::text)
			and ( coalesce($7::text,'')='' or invsewa.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa ilike '%' || $8::text || '%'
				or kontrak.pihak2_kpj ilike '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap ilike '%' || $8::text || '%'
				or kontrak.pihak2_npp ilike '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan ilike '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and invsewa.aktif
		order by 
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='tarif' and not coalesce($13::boolean,false) then tarif_unit end asc, 
			case when $12::text='tarif' and coalesce($13::boolean,false) then tarif_unit end desc,
			case when $12::text='pajak' and not coalesce($13::boolean,false) then pajak_nominal end asc, 
			case when $12::text='pajak' and coalesce($13::boolean,false) then pajak_nominal end desc,
			case when $12::text='nomTagihan' and not coalesce($13::boolean,false) then nominal_akhir end asc, 
			case when $12::text='nomTagihan' and coalesce($13::boolean,false) then nominal_akhir end desc,
			case when $12::text='status' and not coalesce($13::boolean,false) then invsewa.status end asc, 
			case when $12::text='status' and coalesce($13::boolean,false) then invsewa.status end desc,
			nama_blok, nama_unit, nama_unit
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesSewaDetil: {
    text: `select 
			tahun_bulan_tagihan, invsewa.status, periode_bln_sewa_awal, periode_bln_sewa_akhir,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			tarif_unit tarif, 
			pajak_nominal pajak,
			pajak_nominal_dibayar_penyewa,
			nominal_akhir nominal,
			invsewa.tgl_rekam tgl_rekam,
			invsewa.tgl_ubah tgl_ubah,
			unit.id_unit,blok.kode_blok,unit.nama_unit,lantai.no_lantai
		from 
			invoice_entries_invsewa invsewa
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invsewa.id_kontrak_sewa
			inner join rusun_unit unit on invsewa.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			invsewa.aktif
			and kontrak.id_kontrak_sewa=$1::bigint
			and invsewa.tahun_bulan_tagihan=$2::text
		order by unit.id_unit`,
    params: ['p_kontrak', 'p_blth']
  },
  getInvoiceEntriesSewaBLTHTerakhir: {
    text: `WITH cte AS(
					select 
						RANK () OVER ( 
							PARTITION BY kontrak.id_kontrak_sewa
							ORDER BY case when entries.id_invoice_entries is null then null else  inv.tahun_bulan_tagihan end DESC nulls last
						) blth_rank,
						kontrak.id_kontrak_sewa,
						kontrak.jenis_registrasi,
						kontrak.no_kontrak_sewa,
						kontrak.tgl_mulai_sewa,
						case 
							when kontrak.kontrak_berakhir then kontrak.kontrak_berakhir_tgl
							when kontrak.tgl_berakhir_adendum is not null then kontrak.tgl_berakhir_adendum
							else kontrak.tgl_berakhir_sewa
						end tgl_berakhir_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan,
						case when entries.id_invoice_entries is null then null else  inv.nominal_akhir end tagihan,
						case when entries.id_invoice_entries is null then null else  inv.tahun_bulan_tagihan end tahun_bulan_tagihan,
						kontrak.tgl_rekam,
						case
							when not kontrak_berlaku then 'P'
							when kontrak_berlaku and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl then 'H'
							when kontrak_berlaku then 'B'
							else ''
						end status_kontrak
					from 
						kontrak_sewa kontrak 
						left outer join invoice inv on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
						left outer join invoice_entries entries on inv.no_invoice=entries.no_invoice and entries.kode_invoice_entries='INVSEWA'
								and entries.ref_id_invoice_entries is not null
						left outer join invoice_entries_invsewa invsewa on entries.ref_id_invoice_entries=invsewa.id_invoice_entries_invsewa and entries.kode_invoice_entries='INVSEWA'
						left outer join rusun_unit unit on invsewa.id_unit=unit.id_unit
						left outer join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
					where
						kontrak.aktif and kontrak.approval
						and kontrak.kode_rusun=$1::text
						and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
						and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
						and ( coalesce($4::int,0)=0	or  unit.id_unit=$4::int)	
						and ( 
							coalesce($5::text,'')='' 
							or (coalesce($5::text,'')='P' and not kontrak_berlaku)
							or (
								coalesce($5::text,'')='B' and kontrak_berlaku
								and not (kontrak_berakhir and current_date>kontrak.kontrak_berakhir_tgl)
							)
							or (
								coalesce($5::text,'')='H' and kontrak_berlaku
								and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl
							)
						)	
						and 
						(
							coalesce($6::text,'')='' 
							or kontrak.no_kontrak_sewa ilike '%' || $6::text || '%'
							or kontrak.pihak2_kpj ilike '%' || $6::text || '%'
							or kontrak.pihak2_nama_lengkap ilike '%' || $6::text || '%'
							or kontrak.pihak2_npp ilike '%' || $6::text || '%'
							or kontrak.pihak2_nama_perusahaan ilike '%' || $6::text || '%'
						)
						and (coalesce($7::bigint,0)=0 or kontrak.id_kontrak_sewa=$7::bigint)
				) 
				select 
					( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					cte.* ,
					f_kontrak_periode_sewa_by_blth_get(id_kontrak_sewa,tahun_bulan_tagihan) as periode_tagihan
				from cte
				where 
					blth_rank=1
				order by 
					case when $10::text='no_kontrak_sewa' and not coalesce($11::boolean,false) then no_kontrak_sewa end asc, 
					case when $10::text='no_kontrak_sewa' and coalesce($11::boolean,false) then no_kontrak_sewa end desc,
					case when $10::text='jenis_registrasi' and not coalesce($11::boolean,false) then jenis_registrasi end asc, 
					case when $10::text='jenis_registrasi' and coalesce($11::boolean,false) then jenis_registrasi end desc,
					case when $10::text='pihak2_nama_lengkap' and not coalesce($11::boolean,false) then pihak2_nama_lengkap end asc, 
					case when $10::text='pihak2_nama_lengkap' and coalesce($11::boolean,false) then pihak2_nama_lengkap end desc,
					case when $10::text='pihak2_perusahaan' and not coalesce($11::boolean,false) then pihak2_nama_perusahaan end asc, 
					case when $10::text='pihak2_perusahaan' and coalesce($11::boolean,false) then pihak2_nama_perusahaan end desc,
					case when $10::text='blth' and not coalesce($11::boolean,false) then tahun_bulan_tagihan end asc, 
					case when $10::text='blth' and coalesce($11::boolean,false) then tahun_bulan_tagihan end desc,
					case when $10::text='tagihan' and not coalesce($11::boolean,false) then tagihan end asc, 
					case when $10::text='tagihan' and coalesce($11::boolean,false) then tagihan end desc,
					case when $10::text='tglAwal' and not coalesce($11::boolean,false) then tgl_mulai_sewa end asc, 
					case when $10::text='tglAwal' and coalesce($11::boolean,false) then tgl_mulai_sewa end desc,
					case when $10::text='tglAkhir' and not coalesce($11::boolean,false) then tgl_berakhir_sewa end asc, 
					case when $10::text='tglAkhir' and coalesce($11::boolean,false) then tgl_berakhir_sewa end desc,
					case when $10::text='stKontrak' and not coalesce($11::boolean,false) then status_kontrak end asc, 
					case when $10::text='stKontrak' and coalesce($11::boolean,false) then status_kontrak end desc,
					tgl_rekam
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
      { name: 'p_status', default: null }, //  P: Progress (approve belum bayar deposit), H: Berhenti, B: Berlaku
      { name: 'p_search', default: null },
      { name: 'p_id', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getEntriesSewaCalculated: {
    text: `select f_invoice_entries_sewa_calculate($1::bigint,$2::text, $3::numeric) as ret`,
    params: ['p_id_kontrak_sewa', 'p_blth', 'p_pajak_prosen']
  },
  postEntriesSewa: {
    text: `select f_invoice_entries_sewa_submit($1::text,$2::bigint,$3::text,$4::numeric) as ret`,
    params: ['p_kode_pengguna', 'p_id_kontrak_sewa', 'p_blth', 'p_pajak_prosen']
  },
  delEntriesSewa: {
    text: `select f_invoice_entries_sewa_cancel($1::text,$2::bigint,$3::text) as ret`,
    params: ['p_pengguna', 'p_id_kontrak_sewa', 'p_blth']
  },
  getInvoiceEntriesSewaUnit: {
    text: `select * 
			from(
				select distinct on (nama_blok, nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksu.id_unit )
					ks.id_kontrak_sewa ,ksu.id_unit ,ks.no_kontrak_sewa , ks.jenis_registrasi , ks.pihak2_nama_lengkap , ks.pihak2_nama_perusahaan ,
					nama_blok, nama_lantai, nama_unit, ksut.tarif, ksut.id_kontrak_sewa_unit_tarif ,ksut.pajak,
					iei.id_invoice_entries_invsewa ,iei.status, iei.tahun_bulan_tagihan 
				from 
					kontrak_sewa ks 
					inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa = ksu.id_kontrak_sewa 
					inner join rusun_unit ru on ksu.id_unit=ru.id_unit
					inner join rusun_lantai rl on ru.id_lantai = rl.id_lantai
					left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
					left outer join invoice_entries_invsewa iei on 
						iei.aktif and iei.id_kontrak_sewa =ks.id_kontrak_sewa and iei.id_unit =ksu.id_unit 
						and $2::text=iei.tahun_bulan_tagihan 
					left outer join invoice_entries_invsewa ieiblth on 
						ieiblth.aktif and ieiblth.id_kontrak_sewa =ks.id_kontrak_sewa and ieiblth.id_unit =ksu.id_unit 
						and $2::text=ieiblth.tahun_bulan_tagihan 
					left outer join kontrak_sewa_unit_tarif ksut on 
						ksut.aktif and ksut.id_kontrak_sewa =ks.id_kontrak_sewa and ksut.id_unit = ksu.id_unit 
						and $2::text>=ksut.blth_mulai 
				where 
					ks.aktif and ks.approval  and ks.kode_rusun=$1::text
					and $2::text >= to_char(tgl_mulai_sewa,'YYYY-MM')
					and $2::text <=case
										when kontrak_berakhir then to_char(kontrak_berakhir_tgl,'YYYY-MM') 
										when tgl_berakhir_adendum is not null  then to_char(tgl_berakhir_adendum,'YYYY-MM')
										else to_char(tgl_berakhir_sewa,'YYYY-MM')
									end 
					and ieiblth.id_invoice_entries_invsewa  is null
				order by 
					nama_blok,nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksu.id_unit ,  
					ksut.blth_mulai desc, ksut.blth_akhir desc, iei.tahun_bulan_tagihan desc
			) t1
			where 
				id_invoice_entries_invsewa is null 
				or to_char(to_date(tahun_bulan_tagihan,'YYYY-MM')+ interval '1 month','YYYY-MM')=$2::text`,
    params: ['p_rusun', 'p_blth']
  },
  postEntriesSewaUnit: {
    text: `select f_invoice_entries_sewa_unit_create($1::text,$2::text,$3::text,$4::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_rusun',
      'p_blth',
      {
        name: 'p_data_units',
        type: 'array-json',
        data: ['id_kontrak_sewa', 'id_unit']
      }
    ]
  },
  delEntriesSewaUnit: {
    text: `select f_invoice_entries_sewa_unit_cancel($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_invoice_entries']
  },
  getInvoiceEntriesSewaPeriode: {
    text: `select f_kontrak_periode_sewa_by_blth_get($1::bigint,$2::text) as ret`,
    params: ['p_id_kontrak_sewa', 'p_blth']
  },
  getInvoiceEntriesDeposit: {
    text: `select 							
						( (row_number() over()) + coalesce($10::bigint,10) * (coalesce($9::int,1)-1) )::int nomor_baris, 
						(count(*) OVER())::int AS full_count_baris,
						kontrak.id_kontrak_sewa,kontrak.no_kontrak_sewa,kontrak.kode_rusun,
						kontrak.jenis_registrasi,
						kontrak.tgl_mulai_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan
						,invdpst.id_invoice_entries_invdpst, invdpst.jmlh_bulan_tagihan, invdpst.jmlh_tarif_unit, invdpst.pajak_prosen, 
						invdpst.pajak_nominal, invdpst.nominal_akhir,invdpst.status
						,case when invdpst.tgl_ubah is null then invdpst.tgl_rekam else invdpst.tgl_ubah end tgl_ubah
						,case when invdpst.petugas_ubah is null then invdpst.petugas_rekam else invdpst.petugas_ubah end petugas_ubah,
						json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok order by nama_unit) as x))  unit
					from 
						kontrak_sewa kontrak 
						inner join invoice_entries_invdpst invdpst on kontrak.id_kontrak_sewa=invdpst.id_kontrak_sewa
						inner join kontrak_sewa_unit kontrak_unit on kontrak_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa 
						inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
						inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
					where 
						kontrak.kode_rusun=$1::text
						and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
						and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
						and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
						and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
						and ( coalesce($6::text,'')='' or invdpst.status=$6::text)
						and 
						(
							coalesce($7::text,'')='' 
							or kontrak.no_kontrak_Sewa ilike '%' || $7::text || '%'
							or kontrak.pihak2_kpj ilike '%' || $7::text || '%'
							or kontrak.pihak2_nama_lengkap ilike '%' || $7::text || '%'
							or kontrak.pihak2_npp ilike '%' || $7::text || '%'
							or kontrak.pihak2_nama_perusahaan ilike '%' || $7::text || '%'
						)
						and ( coalesce($8::text,'')='' or kontrak.jenis_registrasi=$8::text)
						and invdpst.aktif
					group by
						kontrak.id_kontrak_sewa,kontrak.no_kontrak_sewa,kontrak.kode_rusun,
						kontrak.jenis_registrasi,
						kontrak.tgl_mulai_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan
						,invdpst.id_invoice_entries_invdpst, invdpst.jmlh_bulan_tagihan, invdpst.jmlh_tarif_unit, invdpst.pajak_prosen, 
						invdpst.pajak_nominal, invdpst.nominal_akhir,invdpst.status
						,case when invdpst.tgl_ubah is null then invdpst.tgl_rekam else invdpst.tgl_ubah end 
						,case when invdpst.petugas_ubah is null then invdpst.petugas_rekam else invdpst.petugas_ubah end
					order by 
						case when $11::text='noKontrak' and not coalesce($12::boolean,false) then no_kontrak_sewa end asc, 
						case when $11::text='noKontrak' and coalesce($12::boolean,false) then no_kontrak_sewa end desc,
						case when $11::text='jenisKontrak' and not coalesce($12::boolean,false) then jenis_registrasi end asc, 
						case when $11::text='jenisKontrak' and coalesce($12::boolean,false) then jenis_registrasi end desc,
						case when $11::text='namaPenyewa' and not coalesce($12::boolean,false) then pihak2_nama_lengkap end asc, 
						case when $11::text='namaPenyewa' and coalesce($12::boolean,false) then pihak2_nama_lengkap end desc,
						case when $11::text='namaPerusahaan' and not coalesce($12::boolean,false) then pihak2_nama_perusahaan end asc, 
						case when $11::text='namaPerusahaan' and coalesce($12::boolean,false) then pihak2_nama_perusahaan end desc,
						case when $11::text='tarif' and not coalesce($12::boolean,false) then invdpst.jmlh_tarif_unit end asc, 
						case when $11::text='tarif' and coalesce($12::boolean,false) then invdpst.jmlh_tarif_unit end desc,
						case when $11::text='pajak' and not coalesce($12::boolean,false) then invdpst.pajak_nominal end asc, 
						case when $11::text='pajak' and coalesce($12::boolean,false) then invdpst.pajak_nominal end desc,
						case when $11::text='nomTagihan' and not coalesce($12::boolean,false) then invdpst.nominal_akhir end asc, 
						case when $11::text='nomTagihan' and coalesce($12::boolean,false) then invdpst.nominal_akhir end desc,
						case when $11::text='status' and not coalesce($12::boolean,false) then invdpst.status end asc, 
						case when $11::text='status' and coalesce($12::boolean,false) then invdpst.status end desc,
						invdpst.tgl_rekam desc
					limit 
						case when coalesce($10::bigint,0)::bigint>0   then $10::bigint end 
					offset 
						case 
							when coalesce($10::bigint,0)::bigint>0 then  $10::bigint * (coalesce($9::int,1)-1)
						end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null }, // 6
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 9
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesDepositDetil: {
    text: `select invdpst_detil.* , unit.nama_unit, lantai.nama_lantai, blok.nama_blok
		from 
			invoice_entries_invdpst_detil invdpst_detil
			inner join rusun_unit unit on invdpst_detil.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where invdpst_detil.aktif and invdpst_detil.id_invoice_entries_invdpst=$1::bigint
		`,
    params: ['p_id_invdpst']
  },
  getInvoiceEntriesListrik: {
    text: `select 			
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			nama_blok, nama_lantai,nama_unit,
			invlstrk.*	
		from 
			invoice_entries_invlstrk invlstrk
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invlstrk.id_kontrak_sewa
			inner join rusun_unit unit on invlstrk.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or invlstrk.status=$6::text)
			and ( coalesce($7::text,'')='' or invlstrk.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa ilike '%' || $8::text || '%'
				or kontrak.pihak2_kpj ilike '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap ilike '%' || $8::text || '%'
				or kontrak.pihak2_npp ilike '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan ilike '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and invlstrk.aktif
		order by 
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='meterPemakaian' and not coalesce($13::boolean,false) then meter_pemakaian end asc, 
			case when $12::text='meterPemakaian' and coalesce($13::boolean,false) then meter_pemakaian end desc,
			case when $12::text='nomPemakaian' and not coalesce($13::boolean,false) then nominal_pemakaian end asc, 
			case when $12::text='nomPemakaian' and coalesce($13::boolean,false) then nominal_pemakaian end desc,
			case when $12::text='demmand' and not coalesce($13::boolean,false) then nominal_demand_charges end asc, 
			case when $12::text='demmand' and coalesce($13::boolean,false) then nominal_demand_charges end desc,
			case when $12::text='pju' and not coalesce($13::boolean,false) then nominal_pju end asc, 
			case when $12::text='pju' and coalesce($13::boolean,false) then nominal_pju end desc,
			case when $12::text='total' and not coalesce($13::boolean,false) then nominal_total end asc, 
			case when $12::text='total' and coalesce($13::boolean,false) then nominal_total end desc,
			case when $12::text='status' and not coalesce($13::boolean,false) then invlstrk.status end asc, 
			case when $12::text='status' and coalesce($13::boolean,false) then invlstrk.status end desc,
			case when $12::text='blok' and not coalesce($13::boolean,false) then nama_blok end asc, 
			case when $12::text='blok' and coalesce($13::boolean,false) then nama_blok end desc,
			case when $12::text='lantai' and not coalesce($13::boolean,false) then nama_lantai end asc, 
			case when $12::text='lantai' and coalesce($13::boolean,false) then nama_lantai end desc,
			case when $12::text='unit' and not coalesce($13::boolean,false) then nama_unit end asc, 
			case when $12::text='unit' and coalesce($13::boolean,false) then nama_unit end desc,
			case when $12::text='tglEndMeter' and not coalesce($13::boolean,false) then invlstrk.tgl_end end asc, 
			case when $12::text='tglEndMeter' and coalesce($13::boolean,false) then invlstrk.tgl_end end desc,
			nama_blok,nama_lantai,nama_unit,invlstrk.tgl_rekam
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesListrikBLTHTerakhir: {
    text: `WITH cte AS(
					select 
						RANK () OVER ( 
							PARTITION BY kontrak.id_kontrak_sewa
							ORDER BY inv.tahun_bulan_tagihan DESC nulls last
						) blth_rank,
						kontrak.id_kontrak_sewa,
						kontrak.jenis_registrasi,
						kontrak.no_kontrak_sewa,
						kontrak.tgl_mulai_sewa,
						case 
							when kontrak.kontrak_berakhir then kontrak.kontrak_berakhir_tgl
							when kontrak.tgl_berakhir_adendum is not null then kontrak.tgl_berakhir_adendum
							else kontrak.tgl_berakhir_sewa
						end tgl_berakhir_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan,
						(select count(*) from kontrak_sewa_unit where id_kontrak_sewa=kontrak.id_kontrak_sewa) unit,
						case when entries.id_invoice_entries is null then null else  inv.nominal_akhir end tagihan,
						case when entries.id_invoice_entries is null then null else  inv.tahun_bulan_tagihan end tahun_bulan_tagihan,
						kontrak.tgl_rekam,
						case
							when not kontrak_berlaku then 'P'
							when kontrak_berlaku and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl then 'H'
							when kontrak_berlaku then 'B'
							else ''
						end status_kontrak
					from 
						kontrak_sewa kontrak 
						left outer join invoice inv on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
						left outer join invoice_entries entries on inv.no_invoice=entries.no_invoice and entries.kode_invoice_entries='INVLSTRK'
								and entries.id_invoice_entries is not null
						left outer join invoice_entries_invlstrk invlstrk on entries.id_invoice_entries=invlstrk.id_invoice_entries
						left outer join rusun_unit unit on invlstrk.id_unit=unit.id_unit
						left outer join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
					where
						kontrak.aktif and kontrak.approval
						and not kontrak_berakhir
						and kontrak.kode_rusun=$1::text
						and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
						and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
						and ( coalesce($4::int,0)=0	or  unit.id_unit=$4::int)	
						and ( 
							coalesce($5::text,'')='' 
							or (coalesce($5::text,'')='P' and not kontrak_berlaku)
							or (
								coalesce($5::text,'')='B' and kontrak_berlaku
								and not (kontrak_berakhir and current_date>kontrak.kontrak_berakhir_tgl)
							)
							or (
								coalesce($5::text,'')='H' and kontrak_berlaku
								and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl
							)
						)	
						and 
						(
							( $6::text='' or kontrak.no_kontrak_sewa ilike '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_kpj ilike '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_lengkap ilike '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_npp ilike '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_perusahaan ilike '%' || $6::text || '%')
						)
						and (coalesce($7::bigint,0)=0 or kontrak.id_kontrak_sewa=$7::bigint)
				) 
				select 
					( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					cte.* ,
					f_kontrak_periode_sewa_by_blth_get(id_kontrak_sewa,tahun_bulan_tagihan) as periode_tagihan
				from cte
				where 
					blth_rank=1
				order by 
					case when $10::text='no_kontrak_sewa' and not coalesce($11::boolean,false) then no_kontrak_sewa end asc, 
					case when $10::text='no_kontrak_sewa' and coalesce($11::boolean,false) then no_kontrak_sewa end desc,
					case when $10::text='jenis_registrasi' and not coalesce($11::boolean,false) then jenis_registrasi end asc, 
					case when $10::text='jenis_registrasi' and coalesce($11::boolean,false) then jenis_registrasi end desc,
					case when $10::text='pihak2_nama_lengkap' and not coalesce($11::boolean,false) then pihak2_nama_lengkap end asc, 
					case when $10::text='pihak2_nama_lengkap' and coalesce($11::boolean,false) then pihak2_nama_lengkap end desc,
					case when $10::text='pihak2_perusahaan' and not coalesce($11::boolean,false) then pihak2_nama_perusahaan end asc, 
					case when $10::text='pihak2_perusahaan' and coalesce($11::boolean,false) then pihak2_nama_perusahaan end desc,
					case when $10::text='blth' and not coalesce($11::boolean,false) then tahun_bulan_tagihan end asc, 
					case when $10::text='blth' and coalesce($11::boolean,false) then tahun_bulan_tagihan end desc,
					case when $10::text='tagihan' and not coalesce($11::boolean,false) then tagihan end asc, 
					case when $10::text='tagihan' and coalesce($11::boolean,false) then tagihan end desc,
					tgl_rekam
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
      { name: 'p_status', default: null }, //  P: Progress (approve belum bayar deposit), H: Berhenti, B: Berlaku
      { name: 'p_search', default: null },
      { name: 'p_id', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getEntriesListrikCalculated: {
    text: `select f_invoice_entries_listrik_calculate($1::bigint,$2::text) as ret`,
    params: ['p_id_kontrak_sewa', 'p_blth']
  },
  postEntriesListrik: {
    text: `select f_invoice_entries_listrik_submit($1::text,$2::bigint,$3::text) as ret`,
    params: ['p_kode_pengguna', 'p_id_kontrak_sewa', 'p_blth']
  },
  delEntriesListrik: {
    text: `select f_invoice_entries_listrik_cancel($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_invoice_entries']
  },
  getInvoiceEntriesListrikLogs: {
    text: `with data_tarif as (
				select  
					rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0) pju_prosen 
				from tarif_listrik
				where aktif and kode_rusun=$1::text
					and current_date between tgl_mulai and tgl_berakhir
				order by tgl_mulai desc
				limit 1
			)
			select 
				nama_blok,nama_lantai, nama_unit,
				lml.*,
				dt.*,
				coalesce(dt.faktor_pengali,0)::numeric * coalesce(dt.demand_charges,0)::numeric nominal_demand_charges,
				coalesce(dt.rate_per_kwh,0)::numeric * lml.meter_pemakaian nominal_pemakaian,
				(coalesce(dt.rate_per_kwh,0)::numeric * lml.meter_pemakaian + coalesce(dt.faktor_pengali,0)::numeric * coalesce(dt.demand_charges,0)::numeric) * coalesce(dt.pju_prosen,0)::numeric / 100::numeric nominal_pju,
				(coalesce(dt.faktor_pengali,0)::numeric * coalesce(dt.demand_charges,0)::numeric) +
				(coalesce(dt.rate_per_kwh,0)::numeric * lml.meter_pemakaian)+
				((coalesce(dt.rate_per_kwh,0)::numeric * lml.meter_pemakaian + coalesce(dt.faktor_pengali,0)::numeric * coalesce(dt.demand_charges,0)::numeric) * coalesce(dt.pju_prosen,0)::numeric / 100::numeric) nominal_total
			from 
				listrik_meter_log lml 
				inner join rusun_unit ru on lml.id_unit = ru.id_unit 
				inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
				left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok 
				left outer join data_tarif dt on true
			where
				lml.aktif and not lml.use_in_billing 
				and meter_pemakaian>0
				and rl.kode_rusun=$1::text
				and to_char(lml.tgl_end_meter,'YYYY-MM')<=$2::text
			order by 
				nama_blok,nama_lantai, nama_unit, lml.tgl_end_meter `,
    params: ['p_rusun', 'p_blth']
  },
  postInvoiceEntriesListrikLogs: {
    text: `select f_invoice_entries_listrik_create($1::text,$2::text,$3::text,$4::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_rusun',
      'p_blth',
      {
        name: 'p_id_meter_logs',
        type: 'array-json',
        data: ['id']
      }
    ]
  },
  //   getInvoiceEntriesAir: {
  //     text: `select
  // 			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris,
  // 			(count(*) OVER())::int AS full_count_baris,
  // 			invair.tahun_bulan_tagihan, invair.status,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan,
  // 			sum(meter_pemakaian) meter_pemakain,
  // 			sum(nominal_pemakaian) nominal_pemakain,
  // 			sum(wmm) wmm,
  // 			sum(nominal_total) total,
  // 			max(invair.tgl_rekam) tgl_rekam,
  // 			max(invair.tgl_ubah) tgl_ubah,
  // 			json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok) as x))  unit
  // 		from
  // 			invoice_entries_invair invair
  // 			inner join kontrak_sewa_unit kontrak_unit on kontrak_unit.id_unit=invair.id_unit
  // 			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
  // 			inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
  // 			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  // 		where
  // 			kontrak.kode_rusun=$1::text
  // 			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
  // 			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)
  // 			and ( coalesce($6::text,'')='' or invair.status=$6::text)
  // 			and ( coalesce($7::text,'')='' or invair.tahun_bulan_tagihan=$7::text)
  // 			and
  // 			(
  // 				coalesce($8::text,'')=''
  // 				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
  // 				or kontrak.pihak2_kpj like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
  // 				or kontrak.pihak2_npp like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
  // 			)
  // 			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
  // 			and invair.aktif
  // 		group by
  // 		invair.tahun_bulan_tagihan, invair.status,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan
  // 		order by
  // 			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc,
  // 			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
  // 			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
  // 			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
  // 			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc,
  // 			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
  // 			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc,
  // 			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
  // 			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc,
  // 			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
  // 			case when $12::text='meter' and not coalesce($13::boolean,false) then sum(meter_pemakaian) end asc,
  // 			case when $12::text='meter' and coalesce($13::boolean,false) then sum(meter_pemakaian) end desc,
  // 			case when $12::text='pemakaian' and not coalesce($13::boolean,false) then sum(nominal_pemakaian) end asc,
  // 			case when $12::text='pemakaian' and coalesce($13::boolean,false) then sum(nominal_pemakaian) end desc,
  // 			case when $12::text='wmm' and not coalesce($13::boolean,false) then sum(wmm) end asc,
  // 			case when $12::text='wmm' and coalesce($13::boolean,false) then sum(wmm) end desc,
  // 			case when $12::text='total' and not coalesce($13::boolean,false) then sum(nominal_total) end asc,
  // 			case when $12::text='total' and coalesce($13::boolean,false) then sum(nominal_total) end desc,
  // 			case when $12::text='status' and not coalesce($13::boolean,false) then invair.status end asc,
  // 			case when $12::text='status' and coalesce($13::boolean,false) then invair.status end desc,
  // 			tgl_rekam
  // 		limit
  // 			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end
  // 		offset
  // 			case
  // 				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
  // 			end`,
  //     params: [
  //       'p_rusun',
  //       { name: 'p_no_kontrak', default: null },
  //       { name: 'p_id_blok', default: null },
  //       { name: 'p_id_lantai', default: null },
  //       { name: 'p_id_unit', default: null }, // 5
  //       { name: 'p_status', default: null },
  //       { name: 'p_blth', default: null },
  //       { name: 'p_search', default: null },
  //       { name: 'p_jenis_kontrak', default: null },
  //       { name: 'page', default: 1 }, // 10
  //       { name: 'itemsPerPage', default: null },
  //       { name: 'sortBy', default: null },
  //       { name: 'sortDesc', default: null }
  //     ]
  //   },
  getInvoiceEntriesAir: {
    text: `select 			
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			nama_blok, nama_lantai,nama_unit,
			invair.*	
		from 
			invoice_entries_invair invair
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invair.id_kontrak_sewa
			inner join rusun_unit unit on invair.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or invair.status=$6::text)
			and ( coalesce($7::text,'')='' or invair.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
				or kontrak.pihak2_kpj like '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
				or kontrak.pihak2_npp like '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and invair.aktif
		order by 
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='meterPemakaian' and not coalesce($13::boolean,false) then meter_pemakaian end asc, 
			case when $12::text='meterPemakaian' and coalesce($13::boolean,false) then meter_pemakaian end desc,
			case when $12::text='wmm' and not coalesce($13::boolean,false) then wmm end asc, 
			case when $12::text='wmm' and coalesce($13::boolean,false) then wmm end desc,
			case when $12::text='nomPemakaian' and not coalesce($13::boolean,false) then nominal_pemakaian end asc, 
			case when $12::text='nomPemakaian' and coalesce($13::boolean,false) then nominal_pemakaian end desc,
			case when $12::text='total' and not coalesce($13::boolean,false) then nominal_total end asc, 
			case when $12::text='total' and coalesce($13::boolean,false) then nominal_total end desc,
			case when $12::text='status' and not coalesce($13::boolean,false) then invair.status end asc, 
			case when $12::text='status' and coalesce($13::boolean,false) then invair.status end desc,
			case when $12::text='blok' and not coalesce($13::boolean,false) then nama_blok end asc, 
			case when $12::text='blok' and coalesce($13::boolean,false) then nama_blok end desc,
			case when $12::text='lantai' and not coalesce($13::boolean,false) then nama_lantai end asc, 
			case when $12::text='lantai' and coalesce($13::boolean,false) then nama_lantai end desc,
			case when $12::text='unit' and not coalesce($13::boolean,false) then nama_unit end asc, 
			case when $12::text='unit' and coalesce($13::boolean,false) then nama_unit end desc,
			case when $12::text='tglEndMeter' and not coalesce($13::boolean,false) then invair.tgl_end end asc, 
			case when $12::text='tglEndMeter' and coalesce($13::boolean,false) then invair.tgl_end end desc,
			nama_blok,nama_lantai,nama_unit,invair.tgl_rekam
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesAirBLTHTerakhir: {
    text: `WITH cte AS(
					select 
						RANK () OVER ( 
							PARTITION BY kontrak.id_kontrak_sewa
							ORDER BY inv.tahun_bulan_tagihan DESC nulls last
						) blth_rank,
						kontrak.id_kontrak_sewa,
						kontrak.jenis_registrasi,
						kontrak.no_kontrak_sewa,
						kontrak.tgl_mulai_sewa,
						case 
							when kontrak.kontrak_berakhir then kontrak.kontrak_berakhir_tgl
							when kontrak.tgl_berakhir_adendum is not null then kontrak.tgl_berakhir_adendum
							else kontrak.tgl_berakhir_sewa
						end tgl_berakhir_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan,
						(select count(*) from kontrak_sewa_unit where id_kontrak_sewa=kontrak.id_kontrak_sewa) unit,
						case when entries.id_invoice_entries is null then null else  inv.nominal_akhir end tagihan,
						case when entries.id_invoice_entries is null then null else  inv.tahun_bulan_tagihan end tahun_bulan_tagihan,
						kontrak.tgl_rekam,
						case
							when not kontrak_berlaku then 'P'
							when kontrak_berlaku and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl then 'H'
							when kontrak_berlaku then 'B'
							else ''
						end status_kontrak
					from 
						kontrak_sewa kontrak 
						left outer join invoice inv on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
						left outer join invoice_entries entries on inv.no_invoice=entries.no_invoice and entries.kode_invoice_entries='INVAIR'
								and entries.id_invoice_entries is not null
						left outer join invoice_entries_invair invair on entries.id_invoice_entries=invair.id_invoice_entries
						left outer join rusun_unit unit on invair.id_unit=unit.id_unit
						left outer join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
					where
						kontrak.aktif and kontrak.approval
						and not kontrak_berakhir
						and kontrak.kode_rusun=$1::text
						and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
						and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
						and ( coalesce($4::int,0)=0	or  unit.id_unit=$4::int)	
						and ( 
							coalesce($5::text,'')='' 
							or (coalesce($5::text,'')='P' and not kontrak_berlaku)
							or (
								coalesce($5::text,'')='B' and kontrak_berlaku
								and not (kontrak_berakhir and current_date>kontrak.kontrak_berakhir_tgl)
							)
							or (
								coalesce($5::text,'')='H' and kontrak_berlaku
								and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl
							)
						)	
						and 
						(
							( $6::text='' or kontrak.no_kontrak_sewa like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_kpj like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_lengkap like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_npp like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_perusahaan like '%' || $6::text || '%')
						)
						and (coalesce($7::bigint,0)=0 or kontrak.id_kontrak_sewa=$7::bigint)
				) 
				select 
					( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					cte.* ,
					f_kontrak_periode_sewa_by_blth_get(id_kontrak_sewa,tahun_bulan_tagihan) as periode_tagihan
				from cte
				where 
					blth_rank=1
				order by 
					case when $10::text='no_kontrak_sewa' and not coalesce($11::boolean,false) then no_kontrak_sewa end asc, 
					case when $10::text='no_kontrak_sewa' and coalesce($11::boolean,false) then no_kontrak_sewa end desc,
					case when $10::text='jenis_registrasi' and not coalesce($11::boolean,false) then jenis_registrasi end asc, 
					case when $10::text='jenis_registrasi' and coalesce($11::boolean,false) then jenis_registrasi end desc,
					case when $10::text='pihak2_nama_lengkap' and not coalesce($11::boolean,false) then pihak2_nama_lengkap end asc, 
					case when $10::text='pihak2_nama_lengkap' and coalesce($11::boolean,false) then pihak2_nama_lengkap end desc,
					case when $10::text='pihak2_perusahaan' and not coalesce($11::boolean,false) then pihak2_nama_perusahaan end asc, 
					case when $10::text='pihak2_perusahaan' and coalesce($11::boolean,false) then pihak2_nama_perusahaan end desc,
					case when $10::text='blth' and not coalesce($11::boolean,false) then tahun_bulan_tagihan end asc, 
					case when $10::text='blth' and coalesce($11::boolean,false) then tahun_bulan_tagihan end desc,
					case when $10::text='tagihan' and not coalesce($11::boolean,false) then tagihan end asc, 
					case when $10::text='tagihan' and coalesce($11::boolean,false) then tagihan end desc,
					tgl_rekam
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
      { name: 'p_status', default: null }, //  P: Progress (approve belum bayar deposit), H: Berhenti, B: Berlaku
      { name: 'p_search', default: null },
      { name: 'p_id', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getEntriesAirCalculated: {
    text: `select f_invoice_entries_air_calculate($1::bigint,$2::text) as ret`,
    params: ['p_id_kontrak_sewa', 'p_blth']
  },
  postEntriesAir: {
    text: `select f_invoice_entries_air_submit($1::text,$2::bigint,$3::text) as ret`,
    params: ['p_kode_pengguna', 'p_id_kontrak_sewa', 'p_blth']
  },
  delEntriesAir: {
    text: `select f_invoice_entries_air_cancel($1::text,$2::bigint) as ret`,
    params: ['p_kode_pengguna', 'p_id_invoice_entries']
  },
  getInvoiceEntriesAirLogs: {
    text: `with data_tarif as (
				select  
					rate_per_m3, wmm
				from tarif_air
				where aktif and kode_rusun=$1::text
					and current_date between tgl_mulai and tgl_berakhir
				order by tgl_mulai desc
				limit 1
			)
			select 
				nama_blok,nama_lantai, nama_unit,
				aml.*,
				dt.*,
				coalesce(dt.rate_per_m3,0)::numeric * aml.meter_pemakaian nominal_pemakaian,
				(coalesce(dt.rate_per_m3,0)::numeric * aml.meter_pemakaian) + dt.wmm nominal_total
			from 
				air_meter_log aml 
				inner join rusun_unit ru on aml.id_unit = ru.id_unit 
				inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
				left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok 
				left outer join data_tarif dt on true
			where
				aml.aktif and not aml.use_in_billing 
				and  to_char(aml.tgl_end_meter,'YYYY-MM')<=$2::text
				and meter_pemakaian>0
				and rl.kode_rusun=$1::text
			order by 
				nama_blok,nama_lantai, nama_unit, aml.tgl_end_meter `,
    params: ['p_rusun', 'p_blth']
  },
  postInvoiceEntriesAirLogs: {
    text: `select f_invoice_entries_air_create($1::text,$2::text,$3::text,$4::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_rusun',
      'p_blth',
      {
        name: 'p_id_meter_logs',
        type: 'array-json',
        data: ['id']
      }
    ]
  },
  //   getInvoiceEntriesFasilitas: {
  //     text: `select
  // 			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris,
  // 			(count(*) OVER())::int AS full_count_baris,
  // 			invfas.tahun_bulan_tagihan, invfas.status,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan,
  // 			invfas.kode_fasilitas,
  // 			(select nama_fasilitas from fasilitas where kode_fasilitas=invfas.kode_fasilitas) nama_fasilitas,
  // 			sum(invfas.tarif) tarif,
  // 			sum(invfas.nominal_total) nominal_total,
  // 			max(invfas.tgl_rekam) tgl_rekam,
  // 			max(invfas.tgl_ubah) tgl_ubah,
  // 			json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok) as x))  unit
  // 		from
  // 			invoice_entries_invfas invfas
  // 			inner join kontrak_sewa_unit kontrak_unit on kontrak_unit.id_unit=invfas.id_unit
  // 			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
  // 			inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
  // 			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
  // 			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
  // 		where
  // 			kontrak.kode_rusun=$1::text
  // 			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
  // 			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
  // 			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
  // 			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)
  // 			and ( coalesce($6::text,'')='' or invfas.status=$6::text)
  // 			and ( coalesce($7::text,'')='' or invfas.tahun_bulan_tagihan=$7::text)
  // 			and
  // 			(
  // 				coalesce($8::text,'')=''
  // 				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
  // 				or kontrak.pihak2_kpj like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
  // 				or kontrak.pihak2_npp like '%' || $8::text || '%'
  // 				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
  // 			)
  // 			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
  // 			and invfas.aktif
  // 		group by
  // 			invfas.tahun_bulan_tagihan, invfas.status,
  // 			kontrak.jenis_registrasi,
  // 			kontrak.id_kontrak_sewa,
  // 			kontrak.no_kontrak_sewa,
  // 			kontrak.tgl_mulai_sewa,
  // 			kontrak.pihak2_kpj,
  // 			kontrak.pihak2_nama_lengkap,
  // 			kontrak.pihak2_npp,
  // 			kontrak.pihak2_nama_perusahaan,
  // 			invfas.kode_fasilitas
  // 		order by
  // 			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc,
  // 			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
  // 			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
  // 			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
  // 			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc,
  // 			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
  // 			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc,
  // 			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
  // 			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc,
  // 			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
  // 			case when $12::text='fasilitas' and not coalesce($13::boolean,false) then kode_fasilitas end asc,
  // 			case when $12::text='fasilitas' and coalesce($13::boolean,false) then kode_fasilitas end desc,
  // 			case when $12::text='tarif' and not coalesce($13::boolean,false) then sum(invfas.tarif) end asc,
  // 			case when $12::text='tarif' and coalesce($13::boolean,false) then sum(invfas.tarif) end desc,
  // 			case when $12::text='nominal' and not coalesce($13::boolean,false) then sum(nominal_total) end asc,
  // 			case when $12::text='nominal' and coalesce($13::boolean,false) then sum(nominal_total) end desc,
  // 			case when $12::text='status' and not coalesce($13::boolean,false) then invfas.status end asc,
  // 			case when $12::text='status' and coalesce($13::boolean,false) then invfas.status end desc,
  // 			tgl_rekam
  // 		limit
  // 			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end
  // 		offset
  // 			case
  // 				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
  // 			end`,
  //     params: [
  //       'p_rusun',
  //       { name: 'p_no_kontrak', default: null },
  //       { name: 'p_id_blok', default: null },
  //       { name: 'p_id_lantai', default: null },
  //       { name: 'p_id_unit', default: null }, // 5
  //       { name: 'p_status', default: null },
  //       { name: 'p_blth', default: null },
  //       { name: 'p_search', default: null },
  //       { name: 'p_jenis_kontrak', default: null },
  //       { name: 'page', default: 1 }, // 10
  //       { name: 'itemsPerPage', default: null },
  //       { name: 'sortBy', default: null },
  //       { name: 'sortDesc', default: null }
  //     ]
  //   },
  getInvoiceEntriesFasilitas: {
    text: `select 			
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			nama_blok, nama_lantai,nama_unit,
			invfas.*, fas.nama_fasilitas , fas.keterangan 	
		from 
			invoice_entries_invfas invfas
			inner join fasilitas fas on invfas.kode_fasilitas = fas.kode_fasilitas 
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invfas.id_kontrak_sewa
			inner join rusun_unit unit on invfas.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or invfas.status=$6::text)
			and ( coalesce($7::text,'')='' or invfas.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
				or kontrak.pihak2_kpj like '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
				or kontrak.pihak2_npp like '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and invfas.aktif
		order by 
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='I' then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false)  and jenis_registrasi='I'  then pihak2_nama_lengkap end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='P'  then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) and jenis_registrasi='P' then pihak2_nama_perusahaan end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='status' and not coalesce($13::boolean,false) then invfas.status end asc, 
			case when $12::text='status' and coalesce($13::boolean,false) then invfas.status end desc,
			case when $12::text='blok' and not coalesce($13::boolean,false) then nama_blok end asc, 
			case when $12::text='blok' and coalesce($13::boolean,false) then nama_blok end desc,
			case when $12::text='lantai' and not coalesce($13::boolean,false) then nama_lantai end asc, 
			case when $12::text='lantai' and coalesce($13::boolean,false) then nama_lantai end desc,
			case when $12::text='unit' and not coalesce($13::boolean,false) then nama_unit end asc, 
			case when $12::text='unit' and coalesce($13::boolean,false) then nama_unit end desc,
			case when $12::text='fasilitas' and not coalesce($13::boolean,false) then fas.nama_fasilitas end asc, 
			case when $12::text='fasilitas' and coalesce($13::boolean,false) then fas.nama_fasilitas end desc,
			case when $12::text='keterangan' and not coalesce($13::boolean,false) then fas.keterangan end asc, 
			case when $12::text='keterangan' and coalesce($13::boolean,false) then fas.keterangan end desc,
			case when $12::text='nominal' and not coalesce($13::boolean,false) then invfas.nominal_total end asc, 
			case when $12::text='nominal' and coalesce($13::boolean,false) then invfas.nominal_total end desc,
			nama_blok,nama_lantai,nama_unit,invfas.tgl_rekam
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesFasilitasBLTHTerakhir: {
    text: `WITH cte AS(
					select 
						RANK () OVER ( 
							PARTITION BY kontrak.id_kontrak_sewa
							ORDER BY inv.tahun_bulan_tagihan DESC NULLS last
						) blth_rank,
						kontrak.id_kontrak_sewa,
						kontrak.jenis_registrasi,
						kontrak.no_kontrak_sewa,
						case 
							when kontrak.kontrak_berakhir then kontrak.kontrak_berakhir_tgl
							when kontrak.tgl_berakhir_adendum is not null then kontrak.tgl_berakhir_adendum
							else kontrak.tgl_berakhir_sewa
						end tgl_berakhir_sewa,
						kontrak.tgl_mulai_sewa,
						kontrak.pihak2_kpj,
						kontrak.pihak2_nama_lengkap,
						kontrak.pihak2_npp,
						kontrak.pihak2_nama_perusahaan,
						(select count(*) from kontrak_sewa_unit where id_kontrak_sewa=kontrak.id_kontrak_sewa) unit,						
						case when entries.id_invoice_entries is null then null else  inv.nominal_akhir end tagihan,
						case when entries.id_invoice_entries is null then null else  inv.tahun_bulan_tagihan end tahun_bulan_tagihan,
						kontrak.tgl_rekam,
						case
							when not kontrak_berlaku then 'P'
							when kontrak_berlaku and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl then 'H'
							when kontrak_berlaku then 'B'
							else ''
						end status_kontrak
					from 
						kontrak_sewa kontrak 
						left outer join invoice inv on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa and inv.aktif
						left outer join invoice_entries entries on inv.no_invoice=entries.no_invoice and entries.kode_invoice_entries='INVFAS' 
								and entries.id_invoice_entries is not null
						left outer join invoice_entries_invfas invfas on entries.id_invoice_entries=invfas.id_invoice_entries
						left outer join rusun_unit unit on invfas.id_unit=unit.id_unit
						left outer join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
						left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
					where
						kontrak.aktif and kontrak.approval
						and not kontrak_berakhir
						and kontrak.kode_rusun=$1::text
						and ( coalesce($2::int,0)=0 or lantai.id_rusun_blok=$2::int)		
						and ( coalesce($3::int,0)=0 or lantai.id_lantai=$3::int)
						and ( coalesce($4::int,0)=0	or  unit.id_unit=$4::int)	
						and ( 
							coalesce($5::text,'')='' 
							or (coalesce($5::text,'')='P' and not kontrak_berlaku)
							or (
								coalesce($5::text,'')='B' and kontrak_berlaku
								and not (kontrak_berakhir and current_date>kontrak.kontrak_berakhir_tgl)
							)
							or (
								coalesce($5::text,'')='H' and kontrak_berlaku
								and kontrak_berakhir  and current_date>kontrak.kontrak_berakhir_tgl
							)
						)	
						and 
						(
							( $6::text='' or kontrak.no_kontrak_sewa like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_kpj like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_lengkap like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_npp like '%' || $6::text || '%')
							or ( $6::text='' or kontrak.pihak2_nama_perusahaan like '%' || $6::text || '%')
						)
						and (coalesce($7::bigint,0)=0 or kontrak.id_kontrak_sewa=$7::bigint)
				) 
				select 
					( (row_number() over()) + coalesce($9::bigint,10) * (coalesce($8::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					cte.* ,
					f_kontrak_periode_sewa_by_blth_get(id_kontrak_sewa,tahun_bulan_tagihan) as periode_tagihan
				from cte
				where 
					blth_rank=1
				order by 
					case when $10::text='no_kontrak_sewa' and not coalesce($11::boolean,false) then no_kontrak_sewa end asc, 
					case when $10::text='no_kontrak_sewa' and coalesce($11::boolean,false) then no_kontrak_sewa end desc,
					case when $10::text='jenis_registrasi' and not coalesce($11::boolean,false) then jenis_registrasi end asc, 
					case when $10::text='jenis_registrasi' and coalesce($11::boolean,false) then jenis_registrasi end desc,
					case when $10::text='pihak2_nama_lengkap' and not coalesce($11::boolean,false) then pihak2_nama_lengkap end asc, 
					case when $10::text='pihak2_nama_lengkap' and coalesce($11::boolean,false) then pihak2_nama_lengkap end desc,
					case when $10::text='pihak2_perusahaan' and not coalesce($11::boolean,false) then pihak2_nama_perusahaan end asc, 
					case when $10::text='pihak2_perusahaan' and coalesce($11::boolean,false) then pihak2_nama_perusahaan end desc,
					case when $10::text='blth' and not coalesce($11::boolean,false) then tahun_bulan_tagihan end asc, 
					case when $10::text='blth' and coalesce($11::boolean,false) then tahun_bulan_tagihan end desc,
					case when $10::text='tagihan' and not coalesce($11::boolean,false) then tagihan end asc, 
					case when $10::text='tagihan' and coalesce($11::boolean,false) then tagihan end desc,
					tgl_rekam
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
      { name: 'p_status', default: null }, //  P: Progress (approve belum bayar deposit), H: Berhenti, B: Berlaku
      { name: 'p_search', default: null },
      { name: 'p_id', default: null },
      { name: 'page', default: 1 }, // 8
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getEntriesFasilitasCalculated: {
    text: `select f_invoice_entries_fasilitas_calculate($1::bigint,$2::text) as ret`,
    params: ['p_id_kontrak_sewa', 'p_blth']
  },
  postEntriesFasilitas: {
    text: `select f_invoice_entries_fasilitas_submit($1::text,$2::bigint,$3::text) as ret`,
    params: ['p_kode_pengguna', 'p_id_kontrak_sewa', 'p_blth']
  },
  delEntriesFasilitas: {
    text: `select f_invoice_entries_fasilitas_cancel($1::text,$2::bigint,$3::text) as ret`,
    params: [
      'p_kode_pengguna',
      'p_id_invoice_entries',
      { name: 'p_keterangan', default: null }
    ]
  },
  getEntriesFasilitasUnit: {
    text: `select *,to_char(to_date(tahun_bulan_tagihan,'YYYY-MM')+ interval '1 month','YYYY-MM') blth_proses from (
				select distinct on (nama_blok, nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksfu.id_unit,ksfu.kode_fasilitas )
					ks.id_kontrak_sewa ,ks.no_kontrak_sewa , ks.jenis_registrasi , ks.pihak2_nama_lengkap , ks.pihak2_nama_perusahaan ,
					nama_blok, nama_lantai, nama_unit, f2.nama_fasilitas , f2.keterangan  keterangan_fasilitas,
					ksfu.*, case when ksft.id_kontrak_sewa_fasilitas_tarif is null then tf.tarif else ksft.tarif  end tarif,				
					iei.id_invoice_entries ,iei.status, iei.tahun_bulan_tagihan 
				from 
					kontrak_sewa ks 
					inner join kontrak_sewa_fasilitas_unit ksfu on ks.id_kontrak_sewa = ksfu.id_kontrak_sewa  and ksfu.aktif and ksfu.approval
					inner join rusun_unit ru on ksfu.id_unit=ru.id_unit
					inner join rusun_lantai rl on ru.id_lantai = rl.id_lantai
					left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
					left outer join fasilitas f2 on f2.kode_fasilitas = ksfu.kode_fasilitas 
					left outer join invoice_entries_invfas iei on 
						iei.aktif and iei.kode_fasilitas = ksfu.kode_fasilitas and iei.id_unit = ksfu.id_unit 
						and ks.id_kontrak_sewa =iei.id_kontrak_sewa 
					left outer join invoice_entries_invfas ieiblth on 
						ieiblth.aktif and ieiblth.kode_fasilitas = ksfu.kode_fasilitas and ieiblth.id_unit = ksfu.id_unit 
						and ks.id_kontrak_sewa =ieiblth.id_kontrak_sewa and ieiblth.tahun_bulan_tagihan =$2::text
					left outer join kontrak_sewa_fasilitas_tarif ksft on 
						ksft.aktif and ksft.id_kontrak_sewa =ks.id_kontrak_sewa and ksft.kode_fasilitas = ksfu.kode_fasilitas 
						and $2::text>=ksft.blth_mulai  
					left outer join tarif_fasilitas tf on 
						tf.aktif and tf.kode_rusun=ks.kode_rusun and tf.kode_fasilitas = ksfu.kode_fasilitas 
						and to_date($2::text,'YYYY-MM')>=($2::text||'-'||to_char(ks.tgl_mulai_sewa ,'DD'))::date
				where 
					ks.aktif and ks.approval  and ks.kode_rusun=$1::text
					and $2::text >= to_char(tgl_mulai_sewa,'YYYY-MM')
					and $2::text <=case
										when kontrak_berakhir then to_char(kontrak_berakhir_tgl,'YYYY-MM') 
										when tgl_berakhir_adendum is not null  then to_char(tgl_berakhir_adendum,'YYYY-MM')
										else to_char(tgl_berakhir_sewa,'YYYY-MM')
									end 
					and $2::text>=to_char(ksfu.tgl_sewa_fasilitas,'YYYY-MM') and $2::text<=to_char(ksfu.tgl_berhenti_fasilitas,'YYYY-MM') 
					and ieiblth.id_invoice_entries is null
				order by 
					nama_blok, nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksfu.id_unit,ksfu.kode_fasilitas,
					ksft.blth_akhir desc,tf.tgl_berakhir  desc, iei.tahun_bulan_tagihan desc
			) t1
			where 
				id_invoice_entries is null 
				or tahun_bulan_tagihan<$2::text`,
    params: ['p_rusun', 'p_blth']
  },
  postEntriesFasilitasUnit: {
    text: `select f_invoice_entries_fasilitas_create($1::text,$2::text,$3::text,$4::json) as ret`,
    params: [
      'p_kode_pengguna',
      'p_rusun',
      'p_blth',
      {
        name: 'p_id_fasilitas_units',
        type: 'array-json',
        data: ['id']
      }
    ]
  },
  getInvoicePraInvoice: {
    text: `with data_kontrak as (
				select 
					distinct ks.id_kontrak_sewa
				from 
					kontrak_sewa ks
					inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
					inner join rusun_unit ru on ksu.id_unit =ru.id_unit 
					inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
					left outer join rusun_blok rb on rl.id_rusun_blok =rb.id_rusun_blok 
				where 
					ks.aktif and ks.kode_rusun=$1::text
					and (coalesce($2::text,'')='' or ks.no_kontrak_sewa like ('%' || $2::text || '%')::text)
					and (coalesce($3::text,'')='' or ks.pihak2_nama_lengkap like ('%' || $3::text || '%')::text)	
					and (coalesce($4::text,'')='' or ks.pihak2_nama_perusahaan like ('%' || $4::text || '%')::text)	
					and (coalesce($10::text,'')='' or ks.jenis_registrasi=$10::text)	
					and (coalesce($11::int,0)=0 or rl.id_rusun_blok =$11::int)
					and (coalesce($12::int,0)=0 or rl.id_lantai = $12::int)
					and (coalesce($13::int,0)=0 or ru.id_unit =$1::int)
					and (
						coalesce($14::text,'')='' 
						or ks.no_kontrak_sewa like '%' || $14::text || '%'
						or ks.pihak2_kpj like '%' || $14::text || '%'
						or ks.pihak2_nama_lengkap like '%' || $14::text || '%'
						or ks.pihak2_npp like '%' || $14::text || '%'
						or ks.pihak2_nama_perusahaan like '%' || $14::text || '%'
					)
			)
			select 
				( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				ks.id_kontrak_sewa, ks.no_kontrak_sewa, ks.jenis_registrasi,ks.pihak2_nama_lengkap, ks.pihak2_nama_perusahaan,
				data_entries.tahun_bulan_tagihan, sum(nominal_tagihan) nominal_tagihan, sum(pajak) pajak, sum(nominal_total) nominal_total,
				(
					select json_agg(t) from (
						select distinct rb.nama_blok,rl.nama_lantai,ru.nama_unit
						from 
							kontrak_sewa_unit ksu
							inner join rusun_unit ru on ksu.id_unit=ru.id_unit
							inner join rusun_lantai rl on ru.id_lantai=rl.id_lantai
							left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
						where 
							ksu.id_kontrak_sewa=ks.id_kontrak_sewa
					) t
				) unit
			from 
				data_kontrak
				inner join kontrak_sewa ks on data_kontrak.id_kontrak_sewa=ks.id_kontrak_sewa 
				inner join (	
					select 'INVSEWA' kode_entries,tahun_bulan_tagihan , sum(tarif_unit) nominal_tagihan, sum(pajak_nominal) pajak, sum(nominal_akhir)  nominal_total, id_kontrak_sewa 
					from  invoice_entries_invsewa iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVDPST' kode_entries,tahun_bulan_tagihan , sum(jmlh_tarif_unit) nominal_tagihan, sum(pajak_nominal) pajak, sum(nominal_akhir)  nominal_total,id_kontrak_sewa 
					from  invoice_entries_invdpst iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVLSTRK' kode_entries,tahun_bulan_tagihan , sum(nominal_total) nominal_tagihan, 0::numeric pajak, sum(nominal_total)  nominal_total,id_kontrak_sewa 
					from  invoice_entries_invlstrk iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVAIR' kode_entries,tahun_bulan_tagihan , sum(nominal_total) nominal_tagihan, 0::numeric pajak, sum(nominal_total)  nominal_total,id_kontrak_sewa 
					from  invoice_entries_invair iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVFAS' kode_entries,tahun_bulan_tagihan , sum(tarif) nominal_tagihan, 0::numeric pajak, sum(nominal_total)  nominal_total,id_kontrak_sewa 
					from  invoice_entries_invfas iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVDENDA' kode_entries,tahun_bulan_tagihan , sum(nominal_denda) nominal_tagihan, 0::numeric pajak, sum(nominal_denda)  nominal_total, id_kontrak_sewa 
					from  invoice_entries_invdenda iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
					union all
					select 'INVEQ' kode_entries,tahun_bulan_tagihan , sum(nominal_penggantian) nominal_tagihan, 0::numeric pajak, sum(nominal_penggantian)  nominal_total, id_kontrak_sewa 
					from  invoice_entries_inveq iei 
					where aktif and status='E' and (coalesce($5::text,'')='' or tahun_bulan_tagihan=$5::text)
					group by id_kontrak_sewa ,tahun_bulan_tagihan
				) data_entries on ks.id_kontrak_sewa = data_entries.id_kontrak_sewa
			group by 
				ks.id_kontrak_sewa, ks.no_kontrak_sewa, ks.jenis_registrasi,ks.pihak2_nama_lengkap, ks.pihak2_nama_perusahaan,
				data_entries.tahun_bulan_tagihan
			order by 
				case when $8::text='noKontrak' and not coalesce($9::boolean,false) then no_kontrak_sewa end asc, 
				case when $8::text='noKontrak' and coalesce($9::boolean,false) then no_kontrak_sewa end desc,
				case when $8::text='jenisKontrak' and not coalesce($9::boolean,false) then jenis_registrasi end asc, 
				case when $8::text='jenisKontrak' and coalesce($9::boolean,false) then jenis_registrasi end desc,
				case when $8::text='penyewa' and not coalesce($9::boolean,false) then (case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end) end asc, 
				case when $8::text='penyewa' and coalesce($9::boolean,false) then (case when jenis_registrasi='I' then pihak2_nama_lengkap else pihak2_nama_perusahaan end) end desc,
				case when $8::text='totalTagihan' and not coalesce($9::boolean,false) then sum(nominal_total) end asc, 
				case when $8::text='totalTagihan' and coalesce($9::boolean,false) then sum(nominal_total)  end desc,
				case when $8::text='blth' and not coalesce($9::boolean,false) then tahun_bulan_tagihan end asc, 
				case when $8::text='blth' and coalesce($9::boolean,false) then tahun_bulan_tagihan  end desc,
				tahun_bulan_tagihan , ks.id_kontrak_sewa 
			limit 
				case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end 
			offset 
				case 
					when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_kontrak', default: '' },
      { name: 'p_nama', default: '' },
      { name: 'p_prs', default: '' },
      { name: 'p_blth', default: null },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_jenis', default: null }, // 10
      { name: 'p_id_blok', default: null }, // 11
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null }
    ]
  },
  getInvoicePraInvoiceDetil: {
    text: `with data_kontrak as (
				select 
					ks.id_kontrak_sewa,ksu.id_unit,nama_blok,nama_lantai,nama_unit,
					ks.no_kontrak_sewa, ks.jenis_registrasi,ks.pihak2_nama_lengkap, ks.pihak2_nama_perusahaan	
				from 
					kontrak_sewa ks
					inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
					inner join rusun_unit ru on ksu.id_unit =ru.id_unit 
					inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
					left outer join rusun_blok rb on rl.id_rusun_blok =rb.id_rusun_blok 
				where 
					ks.id_kontrak_sewa=$1::bigint
			)
			select 
				data_kontrak.id_kontrak_sewa,data_kontrak.id_unit,nama_blok,data_kontrak.nama_lantai,data_kontrak.nama_unit,kode_entries,
				data_kontrak.no_kontrak_sewa, data_kontrak.jenis_registrasi,data_kontrak.pihak2_nama_lengkap, data_kontrak.pihak2_nama_perusahaan,
				nominal_tagihan, pajak, nominal_total,
				lstrk_tgl_start,lstrk_tgl_end,lstrk_meter_start,lstrk_meter_end,lstrk_meter_pemakaian,
				lstrk_rate_per_kwh,lstrk_faktor_pengali,lstrk_demand_charges,lstrk_pju_prosen,
				lstrk_nominal_demand_charges,lstrk_nominal_pemakaian,lstrk_nominal_pju,lstrk_nominal_total,				
				air_tgl_start,air_tgl_end,air_meter_start,air_meter_end,air_meter_pemakaian,
				air_rate_per_m3,air_wmm,air_nominal_pemakaian,air_nominal_total,
				fas_periode_bln_sewa_awal,fas_periode_bln_sewa_akhir,fas_nominal_total, fas_nama_fasilitas,
				denda_no_invoice_kena_denda,denda_tahun_bulan_tagihan_kena_denda, denda_nominal_kena_denda,denda_prosen_denda,denda_nominal_denda,
				eq_kode_aset,eq_nama_aset,eq_jenis_tagihan,eq_nominal_penggantian
			from 
				data_kontrak
				left outer join (
					select 
						'INVSEWA' kode_entries,tahun_bulan_tagihan , id_unit, tarif_unit nominal_tagihan, pajak_nominal pajak, nominal_akhir  nominal_total, 
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invsewa iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'INVDPST' kode_entries,tahun_bulan_tagihan , id_unit, ieid.tarif_unit nominal_tagihan, ieid.pajak_nominal pajak, ieid.nominal_akhir  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						iei.id_kontrak_sewa 
					from 
						invoice_entries_invdpst iei 
						inner join invoice_entries_invdpst_detil ieid  on iei.id_invoice_entries_invdpst = ieid.id_invoice_entries_invdpst  and ieid.aktif 
					where iei.aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'INVLSTRK' kode_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						tgl_start lstrk_tgl_start,tgl_end lstrk_tgl_end,meter_start lstrk_meter_start,meter_end lstrk_meter_end,meter_pemakaian lstrk_meter_pemakaian,
						rate_per_kwh lstrk_rate_per_kwh,faktor_pengali lstrk_faktor_pengali,demand_charges lstrk_demand_charges,pju_prosen lstrk_pju_prosen,
						nominal_demand_charges lstrk_nominal_demand_charges,nominal_pemakaian lstrk_nominal_pemakaian,nominal_pju lstrk_nominal_pju,nominal_total lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invlstrk iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'INVAIR' kode_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						tgl_start air_tgl_start,tgl_end air_tgl_end,meter_start air_meter_start,meter_end air_meter_end,meter_pemakaian air_meter_pemakaian,
						rate_per_m3 air_rate_per_m3,wmm air_wmm,nominal_pemakaian air_nominal_pemakaian,nominal_total air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invair iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'INVFAS' kode_entries,tahun_bulan_tagihan , id_unit, tarif nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						periode_bln_sewa_awal fas_periode_bln_sewa_awal,periode_bln_sewa_akhir fas_periode_bln_sewa_akhir,nominal_total  fas_nominal_total,
						(select nama_fasilitas from fasilitas where kode_fasilitas=iei.kode_fasilitas) fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa  
					from  invoice_entries_invfas iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'INVDENDA' kode_entries,iei.tahun_bulan_tagihan , iei.id_unit_kena_denda id_unit, iei.nominal_denda nominal_tagihan, 0::numeric pajak,  iei.nominal_denda  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						no_invoice_kena_denda denda_no_invoice_kena_denda,tahun_bulan_tagihan_kena_denda denda_tahun_bulan_tagihan_kena_denda, 
						nominal_kena_denda denda_nominal_kena_denda,prosen_denda denda_prosen_denda,nominal_denda denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						iei.id_kontrak_sewa 
					from  
						invoice_entries_invdenda iei 
					where 
						iei.aktif and iei.status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 'INVEQ' kode_entries,tahun_bulan_tagihan , id_unit, nominal_penggantian nominal_tagihan, 0::numeric pajak, nominal_penggantian  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						kode_aset eq_kode_aset,(select nama_aset from aset where kode_aset=iei.kode_aset) eq_nama_aset, jenis_tagihan eq_jenis_tagihan, nominal_penggantian eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_inveq iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
				) data_entries on data_entries.id_kontrak_sewa=data_kontrak.id_kontrak_sewa and data_entries.id_unit=data_kontrak.id_unit
			order by 
				nama_blok,nama_lantai,nama_unit`,
    params: ['p_kontrak', 'p_blth']
  },
  getInvoicePraInvoiceInfo: {
    text: `with data_kontrak as (
				select 
					ks.id_kontrak_sewa,ksu.id_unit,nama_blok,nama_lantai,nama_unit,ks.kode_rusun ,nama_unit_jenis,
					ks.no_kontrak_sewa, ks.jenis_registrasi,ks.pihak2_nama_lengkap, ks.pihak2_nama_perusahaan,
					(f_kontrak_periode_sewa_by_blth_get(ks.id_kontrak_sewa,$2::text)->>'periodeSewaAwal')::date periode_sewa_dari,
					(f_kontrak_periode_sewa_by_blth_get(ks.id_kontrak_sewa,$2::text)->>'periodeSewaAkhir')::date periode_sewa_ke	
				from 
					kontrak_sewa ks
					inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
					inner join rusun_unit ru on ksu.id_unit =ru.id_unit 
					inner join rusun_lantai rl on rl.id_lantai =ru.id_lantai 
					left outer join rusun_blok rb on rl.id_rusun_blok =rb.id_rusun_blok 
					left outer join kode_unit_jenis kuj on ru.kode_unit_jenis=kuj.kode_unit_jenis
				where 
					ks.id_kontrak_sewa=$1::bigint
			)
			select 
				data_kontrak.id_kontrak_sewa,data_kontrak.id_unit,nama_blok,data_kontrak.nama_lantai,data_kontrak.nama_unit,nama_unit_jenis,
				data_kontrak.no_kontrak_sewa, data_kontrak.jenis_registrasi,data_kontrak.pihak2_nama_lengkap, data_kontrak.pihak2_nama_perusahaan,
				data_kontrak.periode_sewa_dari,data_kontrak.periode_sewa_ke,
				nama_dsp,
				(
					select json_agg(d) from (
						select * from display where dsp_jenis='INV'
					)d
				) map_dsp,
				kode_entries,nominal_tagihan, pajak, nominal_total,tahun_bulan_tagihan,
				lstrk_tgl_start,lstrk_tgl_end,lstrk_meter_start,lstrk_meter_end,lstrk_meter_pemakaian,
				lstrk_rate_per_kwh,lstrk_faktor_pengali,lstrk_demand_charges,lstrk_pju_prosen,
				lstrk_nominal_demand_charges,lstrk_nominal_pemakaian,lstrk_nominal_pju,lstrk_nominal_total,				
				air_tgl_start,air_tgl_end,air_meter_start,air_meter_end,air_meter_pemakaian,
				air_rate_per_m3,air_wmm,air_nominal_pemakaian,air_nominal_total,
				fas_periode_bln_sewa_awal,fas_periode_bln_sewa_akhir,fas_nominal_total, fas_nama_fasilitas,
				denda_no_invoice_kena_denda,denda_tahun_bulan_tagihan_kena_denda, denda_nominal_kena_denda,denda_prosen_denda,denda_nominal_denda,
				eq_kode_aset,eq_nama_aset,eq_jenis_tagihan,eq_nominal_penggantian,
				(
					select json_agg(d) from (
						select rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0) pju_prosen
						from tarif_listrik
						where 
							aktif and kode_rusun=data_kontrak.kode_rusun 
							and to_date($2::text,'YYYY-MM') >= tgl_mulai 
						order by tgl_mulai desc
						limit 1
					)d
				) tarif_listrik_rusun_on_blth,
				(
					select json_agg(d) from (
						select rate_per_m3, wmm
						from tarif_air
						where 
							aktif and kode_rusun=data_kontrak.kode_rusun 
							and to_date($2::text,'YYYY-MM') >= tgl_mulai
						order by tgl_mulai desc
						limit 1
					)d
				) tarif_air_rusun_on_blth,
				(
					select json_agg(d) from (
						select * from rusun_mgr_setting_db where kode_rusun=data_kontrak.kode_rusun
					)d
				) defaultSetting
			from 
				data_kontrak
				left outer join (
					select 
						'ROOM' nama_dsp,
						'INVSEWA' kode_entries,id_invoice_entries_invsewa id_invoice_entries,tahun_bulan_tagihan , id_unit, tarif_unit nominal_tagihan, pajak_nominal pajak, nominal_akhir  nominal_total, 
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invsewa iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						'DEPOSIT' nama_dsp,
						'INVDPST' kode_entries,iei.id_invoice_entries_invdpst id_invoice_entries,tahun_bulan_tagihan , id_unit, ieid.tarif_unit nominal_tagihan, ieid.pajak_nominal pajak, ieid.nominal_akhir  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						iei.id_kontrak_sewa 
					from 
						invoice_entries_invdpst iei 
						inner join invoice_entries_invdpst_detil ieid  on iei.id_invoice_entries_invdpst = ieid.id_invoice_entries_invdpst  and ieid.aktif 
					where iei.aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						 'ELECTRICITY' nama_dsp,
						'INVLSTRK' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						tgl_start lstrk_tgl_start,tgl_end lstrk_tgl_end,meter_start lstrk_meter_start,meter_end lstrk_meter_end,meter_pemakaian lstrk_meter_pemakaian,
						rate_per_kwh lstrk_rate_per_kwh,faktor_pengali lstrk_faktor_pengali,demand_charges lstrk_demand_charges,pju_prosen lstrk_pju_prosen,
						nominal_demand_charges lstrk_nominal_demand_charges,nominal_pemakaian lstrk_nominal_pemakaian,nominal_pju lstrk_nominal_pju,nominal_total lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invlstrk iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						 'WATER' nama_dsp,
						'INVAIR' kode_entries ,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						tgl_start air_tgl_start,tgl_end air_tgl_end,meter_start air_meter_start,meter_end air_meter_end,meter_pemakaian air_meter_pemakaian,
						rate_per_m3 air_rate_per_m3,wmm air_wmm,nominal_pemakaian air_nominal_pemakaian,nominal_total air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_invair iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						  nama_fasilitas nama_dsp,
						'INVFAS' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, tarif nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						periode_bln_sewa_awal fas_periode_bln_sewa_awal,periode_bln_sewa_akhir fas_periode_bln_sewa_akhir,nominal_total  fas_nominal_total,
						nama_fasilitas fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						id_kontrak_sewa  
					from  
						invoice_entries_invfas iei 
						left outer join fasilitas fas on iei.kode_fasilitas=fas.kode_fasilitas
					where iei.aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						 'DENDA TAGIHAN' nama_dsp,
						'INVDENDA' kode_entries,id_invoice_entries id_invoice_entries,iei.tahun_bulan_tagihan , iei.id_unit_kena_denda id_unit, iei.nominal_denda nominal_tagihan, 0::numeric pajak,  iei.nominal_denda  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						no_invoice_kena_denda denda_no_invoice_kena_denda,tahun_bulan_tagihan_kena_denda denda_tahun_bulan_tagihan_kena_denda, 
						nominal_kena_denda denda_nominal_kena_denda,prosen_denda denda_prosen_denda,nominal_denda denda_nominal_denda,
						null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
						iei.id_kontrak_sewa 
					from  
						invoice_entries_invdenda iei 
					where 
						iei.aktif and iei.status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
					union all
					select 
						 'EQUIPMENT' nama_dsp,
						'INVEQ' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_penggantian nominal_tagihan, 0::numeric pajak, nominal_penggantian  nominal_total,
						null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
						0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
						0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
						null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
						0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
						null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
						null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
						0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
						kode_aset eq_kode_aset,(select nama_aset from aset where kode_aset=iei.kode_aset) eq_nama_aset, jenis_tagihan eq_jenis_tagihan, nominal_penggantian eq_nominal_penggantian,
						id_kontrak_sewa 
					from  invoice_entries_inveq iei 
					where aktif and status='E' and tahun_bulan_tagihan=$2::text and id_kontrak_sewa =$1::bigint
				) data_entries on data_entries.id_kontrak_sewa=data_kontrak.id_kontrak_sewa and data_entries.id_unit=data_kontrak.id_unit 
			order by 
				nama_blok,nama_lantai,nama_unit`,
    params: ['p_kontrak', 'p_blth']
  },
  //   postInvoiceCreate: {
  //     text: `select f_invoice_create($1::text,$2::bigint,$3::text,$4::text,$5::json) as ret`,
  //     params: [
  //       'p_pengguna',
  //       'p_kontrak',
  //       'p_kelompok',
  //       'p_blth',
  //       {
  //         name: 'p_data_info',
  //         type: 'json',
  //         data: [
  //           'tglJatuhTempo',
  //           'periodeSewaKamarAwal',
  //           'periodeSewaKamarAkhir',
  //           'tglMaxBayar',
  //           { name: 'say', default: null },
  //           { name: 'note', default: null },
  //           { name: 'notePaymentMethod', default: null },
  //           { name: 'ttdNama', default: null },
  //           { name: 'dendaKeterlambatan', default: null }
  //         ]
  //       }
  //     ]
  //   },
  getInvoice: {
    text: `select 
			( (row_number() over()) + coalesce($7::bigint,10) * (coalesce($6::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			i.no_invoice,i.periode_bln_sewa_akhir , i.nominal_akhir ,i.tahun_bulan_tagihan , i.flag_rekon,flag_ada_denda,
			ks.id_kontrak_sewa,ks.no_kontrak_sewa ,ks.jenis_registrasi , ks.pihak2_nama_lengkap , ks.pihak2_nama_perusahaan ,
			json_agg((select x from (select ru.id_unit,rl.id_lantai ,rb.id_rusun_blok ,nama_blok,nama_lantai, nama_unit) as x))  unit
		from 
			invoice i  
			inner join kontrak_sewa ks on i.id_kontrak_sewa =ks.id_kontrak_sewa 
			inner join kontrak_sewa_unit ksu on ksu.id_kontrak_sewa = ks.id_kontrak_sewa 
			inner join rusun_unit ru on ksu.id_unit=ru.id_unit
			inner join rusun_lantai rl on ru.id_lantai=rl.id_lantai
			left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
		where 
			ks.aktif and ks.kode_rusun=$1::text and i.aktif
			and (coalesce($2::text,'')='' or ks.no_kontrak_sewa like ('%' || $2::text || '%')::text)
			and (coalesce($3::text,'')='' or ks.pihak2_nama_lengkap like ('%' || $3::text || '%')::text)	
			and (coalesce($4::text,'')='' or ks.pihak2_nama_perusahaan like ('%' || $4::text || '%')::text)	
			and (coalesce($5::text,'')='' or i.tahun_bulan_tagihan=$5::text)
			and (coalesce($10::text,'')='' or ks.jenis_registrasi=$10::text)	
			and (coalesce($11::int,0)=0 or rl.id_rusun_blok =$11::int)
			and (coalesce($12::int,0)=0 or rl.id_lantai = $12::int)
			and (coalesce($13::int,0)=0 or ru.id_unit =$13::int)
			and (
				coalesce($14::text,'')='' 
				or ks.no_kontrak_sewa like '%' || $14::text || '%'
				or ks.pihak2_kpj like '%' || $14::text || '%' 
				or ks.pihak2_nama_lengkap like '%' || $14::text || '%'
				or ks.pihak2_npp like '%' || $14::text || '%' 
				or ks.pihak2_nama_perusahaan like '%' || $14::text || '%'
				or i.no_invoice like '%' || $14::text || '%'
			)
			and ($15::boolean is null or ($15::boolean is not null and i.flag_rekon=$15::boolean ))
			and (coalesce($16::text,'')='' or i.no_invoice=$16::text)
		group by 
			i.no_invoice,i.periode_bln_sewa_akhir , i.nominal_akhir ,i.tahun_bulan_tagihan ,i.flag_rekon,flag_ada_denda,
			ks.id_kontrak_sewa,ks.no_kontrak_sewa ,ks.jenis_registrasi , ks.pihak2_nama_lengkap , ks.pihak2_nama_perusahaan
		order by 
			case when $8::text='noKontrak' and not coalesce($9::boolean,false) then no_kontrak_sewa end asc, 
			case when $8::text='noKontrak' and coalesce($9::boolean,false) then no_kontrak_sewa end desc,
			case when $8::text='jenisKontrak' and not coalesce($9::boolean,false) then jenis_registrasi end asc, 
			case when $8::text='jenisKontrak' and coalesce($9::boolean,false) then jenis_registrasi end desc,
			case when $8::text='penyewa' and jenis_registrasi='I' and not coalesce($9::boolean,false) then pihak2_nama_lengkap end asc, 
			case when $8::text='penyewa' and jenis_registrasi='I' and coalesce($9::boolean,false) then pihak2_nama_lengkap end desc,
			case when $8::text='penyewa' and jenis_registrasi='P' and not coalesce($9::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $8::text='penyewa' and jenis_registrasi='P' and coalesce($9::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $8::text='totalTagihan' and not coalesce($9::boolean,false) then nominal_akhir end asc, 
			case when $8::text='totalTagihan' and coalesce($9::boolean,false) then nominal_akhir  end desc,
			case when $8::text='blth' and not coalesce($9::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $8::text='blth' and coalesce($9::boolean,false) then tahun_bulan_tagihan  end desc,
			tahun_bulan_tagihan 
		limit 
			case when coalesce($7::bigint,0)::bigint>0   then $7::bigint end 
		offset 
			case 
				when coalesce($7::bigint,0)::bigint>0 then  $7::bigint * (coalesce($6::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_kontrak', default: '' },
      { name: 'p_nama', default: '' },
      { name: 'p_prs', default: '' },
      { name: 'p_blth', default: null },
      { name: 'page', default: 1 }, // 6
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_jenis', default: null }, // 10
      { name: 'p_id_blok', default: null }, // 11
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_flag_rekon', default: null },
      { name: 'p_no_invoice', default: null }
    ]
  },
  getInvoiceDetil: {
    text: `select 
				data_detil.*,
				nama_blok,nama_lantai,nama_unit
			from (
				select 
					'INVSEWA' kode_entries,tahun_bulan_tagihan , id_unit, tarif_unit nominal_tagihan, pajak_nominal pajak, nominal_akhir  nominal_total, 
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					id_kontrak_sewa 
				from 
					invoice_entries_invsewa iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries_invsewa =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVSEWA' and ie.no_invoice =$1::text
				where aktif
				union all
				select 
					'INVDPST' kode_entries,tahun_bulan_tagihan , id_unit, ieid.tarif_unit nominal_tagihan, ieid.pajak_nominal pajak, ieid.nominal_akhir  nominal_total,
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					iei.id_kontrak_sewa 
				from 
					invoice_entries_invdpst iei 
					inner join invoice_entries_invdpst_detil ieid  on iei.id_invoice_entries_invdpst = ieid.id_invoice_entries_invdpst  and ieid.aktif 
					inner join invoice_entries ie on 
						iei.id_invoice_entries_invdpst =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVDPST' and ie.no_invoice =$1::text
				where iei.aktif
				union all
				select 
					'INVLSTRK' kode_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
					tgl_start lstrk_tgl_start,tgl_end lstrk_tgl_end,meter_start lstrk_meter_start,meter_end lstrk_meter_end,meter_pemakaian lstrk_meter_pemakaian,
					rate_per_kwh lstrk_rate_per_kwh,faktor_pengali lstrk_faktor_pengali,demand_charges lstrk_demand_charges,pju_prosen lstrk_pju_prosen,
					nominal_demand_charges lstrk_nominal_demand_charges,nominal_pemakaian lstrk_nominal_pemakaian,nominal_pju lstrk_nominal_pju,nominal_total lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					id_kontrak_sewa 
				from  
					invoice_entries_invlstrk iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVLSTRK' and ie.no_invoice =$1::text
				where aktif
				union all
				select 
					'INVAIR' kode_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					tgl_start air_tgl_start,tgl_end air_tgl_end,meter_start air_meter_start,meter_end air_meter_end,meter_pemakaian air_meter_pemakaian,
					rate_per_m3 air_rate_per_m3,wmm air_wmm,nominal_pemakaian air_nominal_pemakaian,nominal_total air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					id_kontrak_sewa 
				from  
					invoice_entries_invair iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVAIR' and ie.no_invoice =$1::text
				where aktif
				union all
				select 
					'INVFAS' kode_entries,tahun_bulan_tagihan , id_unit, tarif nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					periode_bln_sewa_awal fas_periode_bln_sewa_awal,periode_bln_sewa_akhir fas_periode_bln_sewa_akhir,nominal_total  fas_nominal_total,
					(select nama_fasilitas from fasilitas where kode_fasilitas=iei.kode_fasilitas) fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					id_kontrak_sewa  
				from  
					invoice_entries_invfas iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVFAS' and ie.no_invoice =$1::text
				where aktif 
				union all
				select 
					'INVDENDA' kode_entries,iei.tahun_bulan_tagihan , iei.id_unit_kena_denda id_unit, iei.nominal_denda nominal_tagihan, 0::numeric pajak,  iei.nominal_denda  nominal_total,
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					no_invoice_kena_denda denda_no_invoice_kena_denda,tahun_bulan_tagihan_kena_denda denda_tahun_bulan_tagihan_kena_denda, 
					nominal_kena_denda denda_nominal_kena_denda,prosen_denda denda_prosen_denda,nominal_denda denda_nominal_denda,
					null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
					iei.id_kontrak_sewa 
				from  
					invoice_entries_invdenda iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVDENDA' and ie.no_invoice =$1::text
				where 
					iei.aktif 
				union all
				select 'INVEQ' kode_entries,tahun_bulan_tagihan , id_unit, nominal_penggantian nominal_tagihan, 0::numeric pajak, nominal_penggantian  nominal_total,
					null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
					0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
					0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
					null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
					0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
					null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
					null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
					0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
					kode_aset eq_kode_aset,(select nama_aset from aset where kode_aset=iei.kode_aset) eq_nama_aset, jenis_tagihan eq_jenis_tagihan, nominal_penggantian eq_nominal_penggantian,
					id_kontrak_sewa 
				from  
					invoice_entries_inveq iei 
					inner join invoice_entries ie on 
						iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVEQ' and ie.no_invoice =$1::text
			) data_detil
				inner join rusun_unit ru on ru.id_unit=data_detil.id_unit
				inner join rusun_lantai rl on ru.id_lantai=rl.id_lantai
				left outer join rusun_blok rb on rl.id_rusun_blok=rb.id_rusun_blok
			order 
				by nama_blok,nama_lantai,nama_unit`,
    params: ['p_no_invoice']
  },
  getInvoiceInfo: {
    text: `with data_detil as(
			select 
				'ROOM' nama_dsp,
				'INVSEWA' kode_entries,id_invoice_entries_invsewa id_invoice_entries,tahun_bulan_tagihan , id_unit, tarif_unit nominal_tagihan, pajak_nominal pajak, nominal_akhir  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				id_kontrak_sewa 
			from  
				invoice_entries_invsewa iei 
				inner join invoice_entries ie on 
					iei.id_invoice_entries_invsewa =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVSEWA' and ie.no_invoice =$1::text
			where aktif 
			union all
			select 
				'DEPOSIT' nama_dsp,
				'INVDPST' kode_entries,iei.id_invoice_entries_invdpst id_invoice_entries,tahun_bulan_tagihan , id_unit, ieid.tarif_unit nominal_tagihan, ieid.pajak_nominal pajak, ieid.nominal_akhir  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				iei.id_kontrak_sewa 
			from 
				invoice_entries_invdpst iei 
				inner join invoice_entries_invdpst_detil ieid  on iei.id_invoice_entries_invdpst = ieid.id_invoice_entries_invdpst  and ieid.aktif 
				inner join invoice_entries ie on 
					iei.id_invoice_entries_invdpst =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVDPST' and ie.no_invoice =$1::text
			union all
			select 
				'ELECTRICITY' nama_dsp,
				'INVLSTRK' kode_entries,iei.id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
				tgl_start lstrk_tgl_start,tgl_end lstrk_tgl_end,meter_start lstrk_meter_start,meter_end lstrk_meter_end,meter_pemakaian lstrk_meter_pemakaian,
				rate_per_kwh lstrk_rate_per_kwh,faktor_pengali lstrk_faktor_pengali,demand_charges lstrk_demand_charges,pju_prosen lstrk_pju_prosen,
				nominal_demand_charges lstrk_nominal_demand_charges,nominal_pemakaian lstrk_nominal_pemakaian,nominal_pju lstrk_nominal_pju,nominal_total lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				id_kontrak_sewa 
			from  
				invoice_entries_invlstrk iei 
				inner join invoice_entries ie on 
					iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVLSTRK' and ie.no_invoice =$1::text
			union all
			select 
				'WATER' nama_dsp,
				'INVAIR' kode_entries ,iei.id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				tgl_start air_tgl_start,tgl_end air_tgl_end,meter_start air_meter_start,meter_end air_meter_end,meter_pemakaian air_meter_pemakaian,
				rate_per_m3 air_rate_per_m3,wmm air_wmm,nominal_pemakaian air_nominal_pemakaian,nominal_total air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				id_kontrak_sewa 
			from  
				invoice_entries_invair iei 
				inner join invoice_entries ie on 
					iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVAIR' and ie.no_invoice =$1::text
			union all
			select 
				nama_fasilitas nama_dsp,
				'INVFAS' kode_entries,iei.id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, tarif nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				periode_bln_sewa_awal fas_periode_bln_sewa_awal,periode_bln_sewa_akhir fas_periode_bln_sewa_akhir,nominal_total  fas_nominal_total,
				nama_fasilitas fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				id_kontrak_sewa  id_invoice_entries_invsewa
			from  
				invoice_entries_invfas iei 
				left outer join fasilitas fas on iei.kode_fasilitas=fas.kode_fasilitas
				inner join invoice_entries ie on 
					iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVFAS' and ie.no_invoice =$1::text
			union all
			select 
				'DENDA TAGIHAN' nama_dsp,
				'INVDENDA' kode_entries,iei.id_invoice_entries id_invoice_entries,iei.tahun_bulan_tagihan , iei.id_unit_kena_denda id_unit, iei.nominal_denda nominal_tagihan, 0::numeric pajak,  iei.nominal_denda  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				no_invoice_kena_denda denda_no_invoice_kena_denda,tahun_bulan_tagihan_kena_denda denda_tahun_bulan_tagihan_kena_denda, 
				nominal_kena_denda denda_nominal_kena_denda,prosen_denda denda_prosen_denda,nominal_denda denda_nominal_denda,
				null::varchar eq_kode_aset,null::varchar eq_nama_aset, null::varchar eq_jenis_tagihan, 0::numeric eq_nominal_penggantian,
				iei.id_kontrak_sewa 
			from  
				invoice_entries_invdenda iei 
				inner join invoice_entries ie on 
					iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVDENDA' and ie.no_invoice =$1::text
			union all
			select 
				'EQUIPMENT' nama_dsp,
				'INVEQ' kode_entries,iei.id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , id_unit, nominal_penggantian nominal_tagihan, 0::numeric pajak, nominal_penggantian  nominal_total,
				null::date lstrk_tgl_start,null::date lstrk_tgl_end,0::int lstrk_meter_start,0::int lstrk_meter_end,0::int lstrk_meter_pemakaian,
				0::numeric lstrk_rate_per_kwh,0::numeric lstrk_faktor_pengali,0::numeric lstrk_demand_charges,0::numeric lstrk_pju_prosen,
				0::numeric lstrk_nominal_demand_charges,0::numeric lstrk_nominal_pemakaian,0::numeric lstrk_nominal_pju,0::numeric lstrk_nominal_total,
				null::date air_tgl_start,null::date air_tgl_end,0::int air_meter_start,0::int air_meter_end,0::int  air_meter_pemakaian,
				0::numeric air_rate_per_m3,0::numeric air_wmm, 0::numeric air_nominal_pemakaian,0::numeric air_nominal_total,
				null::date fas_periode_bln_sewa_awal,null::date fas_periode_bln_sewa_akhir,0::numeric fas_nominal_total, null::text fas_nama_fasilitas,
				null::varchar denda_no_invoice_kena_denda,null::varchar denda_tahun_bulan_tagihan_kena_denda, 
				0::numeric denda_nominal_kena_denda,0::numeric denda_prosen_denda,0::numeric denda_nominal_denda,
				kode_aset eq_kode_aset,(select nama_aset from aset where kode_aset=iei.kode_aset) eq_nama_aset, jenis_tagihan eq_jenis_tagihan, nominal_penggantian eq_nominal_penggantian,
				id_kontrak_sewa 
			from  
				invoice_entries_inveq iei 
				inner join invoice_entries ie on 
					iei.id_invoice_entries =ie.ref_id_invoice_entries and ie.kode_invoice_entries='INVEQ' and ie.no_invoice =$1::text
		)
		select 
			i.* ,
			ks.no_kontrak_sewa, ks.jenis_registrasi,ks.pihak2_nama_lengkap, ks.pihak2_nama_perusahaan,
			(
				select json_agg(t) from (
					select distinct rb.nama_blok,rl.nama_lantai,ru.nama_unit,ru.id_unit, kuj.nama_unit_jenis
					from 
						kontrak_sewa_unit ksu
						inner join rusun_unit ru on ksu.id_unit=ru.id_unit
						inner join rusun_lantai rl on ru.id_lantai=rl.id_lantai
						left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
						left outer join kode_unit_jenis kuj on kuj.kode_unit_jenis=ru.kode_unit_jenis
					where 
						ksu.id_kontrak_sewa=ks.id_kontrak_sewa
					order by nama_blok , nama_lantai, nama_unit
				) t
			) unit,
			(
				select json_agg(t) from (
					select *from data_detil 
				) t
			) data_detil_invoice,
			(
				select json_agg(t) from (
					select * from display where dsp_jenis='INV'
				) t
			) map_dsp,
			(
				select json_agg(d) from (
					select rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0) pju_prosen
					from tarif_listrik
					where 
						aktif and kode_rusun=ks.kode_rusun 
						and to_date(i.tahun_bulan_tagihan,'YYYY-MM') >= tgl_mulai 
					order by tgl_mulai desc
					limit 1
				)d
			) tarif_listrik_rusun_on_blth,
			(
				select json_agg(d) from (
					select rate_per_m3, wmm
					from tarif_air
					where 
						aktif and kode_rusun=ks.kode_rusun 
						and to_date(i.tahun_bulan_tagihan,'YYYY-MM') >= tgl_mulai
					order by tgl_mulai desc
					limit 1
				)d
			) tarif_air_rusun_on_blth,
			(
				select json_agg(d) from (					
					select 
						lokasi, provinsi , telpon , fax , nama_kantor, kecamatan
					from 
						rusun r2
						left outer join kode_kantor kk on kk.kode_kantor = r2.kode_kantor 
					where r2.kode_rusun = ks.kode_rusun
					limit 1						
				)d
			) data_rusun
		from 
			invoice i 
			inner join kontrak_sewa ks on ks.id_kontrak_sewa = i.id_kontrak_sewa 
		where 
			no_invoice =$1::text`,
    params: ['p_no_invoice']
  },
  postInvoiceCreate: {
    text: `select f_invoice_submit($1::text,$2::bigint,$3::text,$4::json) as ret`,
    params: [
      'p_pengguna',
      'p_kontrak',
      'p_blth',
      {
        name: 'p_data_info',
        type: 'json',
        data: [
          'periodeAwal',
          'periodeAkhir',
          { name: 'say', default: null },
          { name: 'note', default: null },
          { name: 'notePaymentMethod', default: null },
          { name: 'ttdNama', default: null },
          { name: 'ttdJabatan', default: null },
          { name: 'dendaKeterlambatan', default: null }
        ]
      }
    ]
  },
  delInvoiceCancel: {
    text: `select f_invoice_cancel($1::text,$2::text,$3::text) as ret`,
    params: ['p_pengguna', 'p_no_invoice', 'p_alasan_na']
  },
  getInvoiceEntriesDenda: {
    text: `select 
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			invdenda.tahun_bulan_tagihan, invdenda.status, 
			invdenda.periode_bln_sewa_awal_kena_denda,invdenda.periode_bln_sewa_akhir_kena_denda,
			invdenda.tahun_bulan_tagihan_kena_denda, invdenda.no_invoice_kena_denda,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			sum(nominal_kena_denda) nominal_kena_denda, 
			max(prosen_denda) prosen_denda,
			sum(nominal_denda) nominal_denda,
			max(invdenda.tgl_rekam) tgl_rekam,
			max(invdenda.tgl_ubah) tgl_ubah,
			json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok,nominal_kena_denda,nominal_denda 
				order by nama_blok,nama_lantai,nama_unit) as x))  unit
		from 
			invoice_entries_invdenda invdenda
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=invdenda.id_kontrak_sewa
			inner join rusun_unit unit on invdenda.id_unit_kena_denda=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or invdenda.status=$6::text)
			and ( coalesce($7::text,'')='' or invdenda.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
				or kontrak.pihak2_kpj like '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
				or kontrak.pihak2_npp like '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and invdenda.aktif
		group by 
			invdenda.tahun_bulan_tagihan,invdenda.status,
			invdenda.periode_bln_sewa_awal_kena_denda,invdenda.periode_bln_sewa_akhir_kena_denda,
			invdenda.tahun_bulan_tagihan_kena_denda, invdenda.no_invoice_kena_denda,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan
		order by 
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='blthKena' and not coalesce($13::boolean,false) then tahun_bulan_tagihan_kena_denda end asc, 
			case when $12::text='blthKena' and coalesce($13::boolean,false) then tahun_bulan_tagihan_kena_denda end desc,
			case when $12::text='invoiceKena' and not coalesce($13::boolean,false) then no_invoice_kena_denda end asc, 
			case when $12::text='invoiceKena' and coalesce($13::boolean,false) then no_invoice_kena_denda end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc, 
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='dendaKena' and not coalesce($13::boolean,false) then sum(nominal_kena_denda) end asc, 
			case when $12::text='dendaKena' and coalesce($13::boolean,false) then sum(nominal_kena_denda) end desc,
			case when $12::text='denda' and not coalesce($13::boolean,false) then sum(nominal_denda) end asc, 
			case when $12::text='denda' and coalesce($13::boolean,false) then sum(nominal_denda) end desc,
			case when $12::text='status' and not coalesce($13::boolean,false) then invdenda.status end asc, 
			case when $12::text='status' and coalesce($13::boolean,false) then invdenda.status end desc,
			tgl_rekam
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getEntriesPraProsesDendaByRusun: {
    text: `select 
				kontrak.id_kontrak_sewa,kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,
				kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan,
				inv.no_invoice,
				inv.max_tgl_bayar,
				inv.flag_rekon,
				inv.tahun_bulan_tagihan,
				inv.periode_bln_sewa_akhir,
				byr.tgl_pembayaran,
				sum(inv_sewa.tarif_unit) tarif_unit,
				sum($3::numeric*inv_sewa.tarif_unit /100::numeric) denda,
				json_agg((select x from (select unit.id_unit, nama_blok,lantai.nama_lantai,unit.nama_unit,inv_sewa.tarif_unit nominal_kena_denda,$3::numeric*inv_sewa.tarif_unit /100::numeric nominal_denda order by nama_blok,lantai.nama_lantai,unit.nama_unit) as x))  unit
			from 
				invoice inv
				inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
				inner join invoice_entries inv_entri on inv.no_invoice=inv_entri.no_invoice 
				inner join invoice_entries_invsewa inv_sewa on inv_sewa.id_invoice_entries_invsewa=inv_entri.ref_id_invoice_entries and inv_entri.kode_invoice_entries='INVSEWA'				
				inner join rusun_unit unit on unit.id_unit=inv_sewa.id_unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
				left outer join pembayaran_invoices byr_inv on byr_inv.no_invoice=inv.no_invoice and byr_inv.aktif
				left outer join pembayaran byr on byr.id_pembayaran=byr_inv.id_pembayaran  and byr.aktif
				left outer join invoice_entries_invdenda invdenda on
					invdenda.aktif and invdenda.id_kontrak_sewa = kontrak.id_kontrak_sewa and invdenda.id_unit_kena_denda=unit.id_unit
					and invdenda.tahun_bulan_tagihan = $2::text and invdenda.no_invoice_kena_denda = inv.no_invoice 					
			where
				inv.aktif and invdenda.id_invoice_entries is null
				and inv.max_tgl_bayar < to_date($2::text,'YYYY-MM')::date
				and (
					(not inv.flag_rekon and (inv.max_tgl_bayar - to_date($2::text,'YYYY-MM')::date) <0)
					or
					(inv.flag_rekon and  (inv.max_tgl_bayar-byr.tgl_pembayaran)<0 and not flag_ada_denda)
				)
				and not exists ( select null from invoice_entries_invdenda iei where iei.aktif and iei.no_invoice_kena_denda=inv.no_invoice)
				and kontrak.kode_rusun=$1::text
				and inv.tahun_bulan_tagihan<$2::text
				and (
					coalesce($4::bigint,0)=0 or kontrak.id_kontrak_sewa=$4::bigint
				)
			group by
				kontrak.id_kontrak_sewa,kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,
				kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan,
				inv.no_invoice,
				inv.max_tgl_bayar,
				inv.flag_rekon,
				inv.tahun_bulan_tagihan,
				inv.periode_bln_sewa_akhir,
				byr.tgl_pembayaran
			order by kontrak.no_kontrak_sewa
				`,
    params: [
      'p_rusun',
      'p_blth',
      'p_prosen',
      { name: 'p_id_kontrak', default: null }
    ]
  },
  postInvoiceProsesDendaByRusun: {
    text: `select f_invoice_entries_denda_create($1::text,$2::text,$4::text,$3::numeric,$5::json)  as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      'p_prosen',
      'p_blth',
      {
        name: 'p_data_invoice',
        type: 'array-json',
        data: ['no_invoice']
      }
    ]
  },
  delInvoiceEntriesDenda: {
    text: `select f_invoice_entries_denda_cancel($1::text,$2::text,$3::text) as ret`,
    params: ['p_pengguna', 'p_no_invoice', 'p_blth']
  },
  postInvoiceProsesDendaByData: {
    text: `select f_invoice_denda_proses($1::text,$2::text,$3::json)  as ret`,
    params: [
      'p_pengguna',
      'p_blth',
      {
        name: 'p_data',
        type: 'array-json',
        data: [
          'noInvoice',
          'idUnit',
          'nomKena',
          'nom',
          'hapus',
          { name: 'idEntries', default: null },
          { name: 'status', default: null }
        ]
      }
    ]
  },
  postInvoiceFinalisasiBerhentiEqCreate: {
    text: `select f_invoice_kerusakan_barang_submit($1::text,$2::bigint)  as ret`,
    params: ['p_pengguna', 'p_id_berhenti']
  },
  getInvoiceSudahDenda: {
    text: `select 
					( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					(inv.periode_bln_sewa_awal - current_date) as due_days,
					inv_klp.title_invoice,
					kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,kontrak.id_kontrak_sewa,
					kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan, pihak2_alamat, pihak2_telpon,
					inv.no_invoice, inv.kode_invoice_kelompok, inv.tgl_invoice, inv.periode_bln_sewa_awal, inv.periode_bln_sewa_akhir, 
					inv.tahun_bulan_tagihan, inv.jmlh_bulan_tagihan, inv.nominal_invoice, inv.nominal_pajak, nominal_akhir, 
					inv.max_tgl_bayar,inv.prosen_denda_keterlambatan,
					json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok) as x))  unit
				from 
					invoice inv
					inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
					inner join kontrak_sewa_unit kontrak_unit on kontrak_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa
					inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
					inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
					left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
					left outer join kode_invoice_kelompok inv_klp on inv.kode_invoice_kelompok=inv_klp.kode_invoice_kelompok
				where
					not inv.flag_rekon and inv.aktif
					and kontrak.kode_rusun=$1::text 
					and  $2::date>inv.periode_bln_sewa_akhir
					and (coalesce($3::text,'')='' or kontrak.jenis_registrasi=$3::text) 
					and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)			
					and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
					and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
					and 
					(
						coalesce($7::text,'')='' 
						or kontrak.no_kontrak_sewa like '%' || $7::text || '%'
						or kontrak.pihak2_kpj like '%' || $7::text || '%'
						or kontrak.pihak2_nama_lengkap like '%' || $7::text || '%'
						or kontrak.pihak2_npp like '%' || $7::text || '%'
						or kontrak.pihak2_nama_perusahaan like '%' || $7::text || '%'
						or no_invoice like '%' || $7::text || '%'
					)
					and (coalesce($8::text,'')='' or kontrak.no_kontrak_sewa=$8::text)	
					and (coalesce($9::text,'')='' or no_invoice=$9::text)	
				group by
					inv_klp.title_invoice,
					kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,kontrak.id_kontrak_sewa,
					kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan, pihak2_alamat, pihak2_telpon,
					inv.no_invoice, inv.kode_invoice_kelompok, inv.tgl_invoice, inv.periode_bln_sewa_awal, inv.periode_bln_sewa_akhir, 
					inv.tahun_bulan_tagihan, inv.jmlh_bulan_tagihan, inv.nominal_invoice, inv.nominal_pajak, nominal_akhir, 
					inv.max_tgl_bayar,inv.prosen_denda_keterlambatan
				order by 
					case when $12::text='no_kontrak_sewa' and not coalesce($13::boolean,false) then kontrak.no_kontrak_sewa end asc, 
					case when $12::text='no_kontrak_sewa' and coalesce($13::boolean,false) then kontrak.no_kontrak_sewa end desc,
					case when $12::text='no_invoice' and not coalesce($13::boolean,false) then inv.no_invoice end asc, 
					case when $12::text='no_invoice' and coalesce($13::boolean,false) then inv.no_invoice end desc,
					case when $12::text='penyewa' and kontrak.jenis_registrasi='I' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
					case when $12::text='penyewa' and kontrak.jenis_registrasi='I' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
					case when $12::text='penyewa' and kontrak.jenis_registrasi='P' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
					case when $12::text='penyewa' and kontrak.jenis_registrasi='P' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
					case when $12::text='tahun_bulan_tagihan' and not coalesce($13::boolean,false) then inv.tahun_bulan_tagihan end asc, 
					case when $12::text='tahun_bulan_tagihan' and coalesce($13::boolean,false) then inv.tahun_bulan_tagihan end desc,					
					case when $12::text='nominal_akhir' and not coalesce($13::boolean,false) then nominal_akhir end asc, 
					case when $12::text='nominal_akhir' and coalesce($13::boolean,false) then nominal_akhir end desc,									
					case when $12::text='periode_bln_sewa_awal' and not coalesce($13::boolean,false) then inv.periode_bln_sewa_awal end asc, 
					case when $12::text='periode_bln_sewa_awal' and coalesce($13::boolean,false) then inv.periode_bln_sewa_awal end desc,
					(inv.periode_bln_sewa_awal - current_date)
				limit 
					case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
				offset 
					case 
						when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
					end`,
    params: [
      'p_rusun',
      { name: 'p_date', default: moment().format('YYYY-MM-DD') },
      { name: 'p_jenis', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_kontrak', default: '' },
      { name: 'p_no_invoice', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoicePayDueDate: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				(inv.periode_bln_sewa_awal - current_date) as due_days,
				inv_klp.title_invoice,
				kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,kontrak.id_kontrak_sewa,
				kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan, pihak2_alamat, pihak2_telpon,
				inv.no_invoice, inv.kode_invoice_kelompok, inv.tgl_invoice, inv.periode_bln_sewa_awal, inv.periode_bln_sewa_akhir, 
				inv.tahun_bulan_tagihan, inv.jmlh_bulan_tagihan, inv.nominal_invoice, inv.nominal_pajak, nominal_akhir, 
				inv.max_tgl_bayar,inv.prosen_denda_keterlambatan,
				json_agg((select x from (select unit.*,blok.kode_blok,lantai.no_lantai,lantai.nama_lantai,blok.nama_blok) as x))  unit
			from 
				invoice inv
				inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
				inner join kontrak_sewa_unit kontrak_unit on kontrak_unit.id_kontrak_sewa=kontrak.id_kontrak_sewa
				inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
				left outer join kode_invoice_kelompok inv_klp on inv.kode_invoice_kelompok=inv_klp.kode_invoice_kelompok
			where
				not inv.flag_rekon and inv.aktif
				and kontrak.kode_rusun=$1::text 
				and (inv.periode_bln_sewa_akhir - $2::date) <=7
				and (coalesce($3::text,'')='' or kontrak.jenis_registrasi=$3::text) 
				and (coalesce($4::int,0)=0 or lantai.id_rusun_blok=$4::int)			
				and (coalesce($5::int,0)=0 or lantai.id_lantai=$5::int)
				and (coalesce($6::int,0)=0 or unit.id_unit=$6::int)
				and 
				(
					coalesce($7::text,'')='' 
					or kontrak.no_kontrak_sewa like '%' || $7::text || '%'
					or kontrak.pihak2_kpj like '%' || $7::text || '%'
					or kontrak.pihak2_nama_lengkap like '%' || $7::text || '%'
					or kontrak.pihak2_npp like '%' || $7::text || '%'
					or kontrak.pihak2_nama_perusahaan like '%' || $7::text || '%'
					or no_invoice like '%' || $7::text || '%'
				)
				and (coalesce($8::text,'')='' or kontrak.no_kontrak_sewa=$8::text)	
				and (coalesce($9::text,'')='' or no_invoice=$9::text)	
			group by
				inv_klp.title_invoice,
				kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,kontrak.id_kontrak_sewa,
				kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan, pihak2_alamat, pihak2_telpon,
				inv.no_invoice, inv.kode_invoice_kelompok, inv.tgl_invoice, inv.periode_bln_sewa_awal, inv.periode_bln_sewa_akhir, 
				inv.tahun_bulan_tagihan, inv.jmlh_bulan_tagihan, inv.nominal_invoice, inv.nominal_pajak, nominal_akhir, 
				inv.max_tgl_bayar,inv.prosen_denda_keterlambatan
			order by 
				case when $12::text='no_kontrak_sewa' and not coalesce($13::boolean,false) then kontrak.no_kontrak_sewa end asc, 
				case when $12::text='no_kontrak_sewa' and coalesce($13::boolean,false) then kontrak.no_kontrak_sewa end desc,
				case when $12::text='no_invoice' and not coalesce($13::boolean,false) then inv.no_invoice end asc, 
				case when $12::text='no_invoice' and coalesce($13::boolean,false) then inv.no_invoice end desc,
				case when $12::text='penyewa' and kontrak.jenis_registrasi='I' and not coalesce($13::boolean,false) then pihak2_nama_lengkap end asc, 
				case when $12::text='penyewa' and kontrak.jenis_registrasi='I' and coalesce($13::boolean,false) then pihak2_nama_lengkap end desc,
				case when $12::text='penyewa' and kontrak.jenis_registrasi='P' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
				case when $12::text='penyewa' and kontrak.jenis_registrasi='P' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
				case when $12::text='tahun_bulan_tagihan' and not coalesce($13::boolean,false) then inv.tahun_bulan_tagihan end asc, 
				case when $12::text='tahun_bulan_tagihan' and coalesce($13::boolean,false) then inv.tahun_bulan_tagihan end desc,					
				case when $12::text='nominal_akhir' and not coalesce($13::boolean,false) then nominal_akhir end asc, 
				case when $12::text='nominal_akhir' and coalesce($13::boolean,false) then nominal_akhir end desc,									
				case when $12::text='periode_bln_sewa_awal' and not coalesce($13::boolean,false) then inv.periode_bln_sewa_awal end asc, 
				case when $12::text='periode_bln_sewa_awal' and coalesce($13::boolean,false) then inv.periode_bln_sewa_awal end desc,
				(inv.periode_bln_sewa_awal - current_date)
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_date', default: moment().format('YYYY-MM-DD') },
      { name: 'p_jenis', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_search', default: null },
      { name: 'p_kontrak', default: '' },
      { name: 'p_no_invoice', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesInventaris: {
    text: `select 
			( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			inveq.id_invoice_entries,inveq.tahun_bulan_tagihan, inveq.status, inveq.jenis_tagihan,inveq.nominal_penggantian,inveq.kode_aset,
			kontrak.jenis_registrasi,
			kontrak.id_kontrak_sewa,
			kontrak.no_kontrak_sewa,
			kontrak.tgl_mulai_sewa,
			kontrak.pihak2_kpj,
			kontrak.pihak2_nama_lengkap,
			kontrak.pihak2_npp,
			kontrak.pihak2_nama_perusahaan,
			blok.kode_blok, unit.no_unit,lantai.no_lantai,unit.nama_unit, nama_lantai, nama_blok,
			aset.nama_aset
		from 
			invoice_entries_inveq inveq
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=inveq.id_kontrak_sewa
			inner join rusun_unit unit on inveq.id_unit=unit.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			left outer join aset on aset.kode_aset=inveq.kode_aset
		where 
			kontrak.kode_rusun=$1::text
			and ( coalesce($2::text,'')='' or kontrak.no_kontrak_Sewa=$2::text)
			and ( coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)		
			and ( coalesce($4::int,0)=0 or lantai.id_lantai=$4::int)
			and ( coalesce($5::int,0) = 0	or  unit.id_unit=$5::int)	
			and ( coalesce($6::text,'')='' or inveq.status=$6::text)
			and ( coalesce($7::text,'')='' or inveq.tahun_bulan_tagihan=$7::text)
			and 
			(
				coalesce($8::text,'')='' 
				or kontrak.no_kontrak_Sewa like '%' || $8::text || '%'
				or kontrak.pihak2_kpj like '%' || $8::text || '%'
				or kontrak.pihak2_nama_lengkap like '%' || $8::text || '%'
				or kontrak.pihak2_npp like '%' || $8::text || '%'
				or kontrak.pihak2_nama_perusahaan like '%' || $8::text || '%'
			)
			and ( coalesce($9::text,'')='' or kontrak.jenis_registrasi=$9::text)
			and inveq.aktif
		order by 
			case when $12::text='blok' and not coalesce($13::boolean,false) then nama_blok end asc, 
			case when $12::text='blok' and coalesce($13::boolean,false) then nama_blok end desc,
			case when $12::text='lantai' and not coalesce($13::boolean,false) then nama_lantai end asc, 
			case when $12::text='lantai' and coalesce($13::boolean,false) then nama_lantai end desc,
			case when $12::text='unit' and not coalesce($13::boolean,false) then nama_unit end asc, 
			case when $12::text='unit' and coalesce($13::boolean,false) then nama_unit end desc,
			case when $12::text='blth' and not coalesce($13::boolean,false) then tahun_bulan_tagihan end asc, 
			case when $12::text='blth' and coalesce($13::boolean,false) then tahun_bulan_tagihan end desc,
			case when $12::text='noKontrak' and not coalesce($13::boolean,false) then no_kontrak_sewa end asc,
			case when $12::text='noKontrak' and coalesce($13::boolean,false) then no_kontrak_sewa end desc,
			case when $12::text='jenisKontrak' and not coalesce($13::boolean,false) then jenis_registrasi end asc, 
			case when $12::text='jenisKontrak' and coalesce($13::boolean,false) then jenis_registrasi end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='I' then pihak2_nama_lengkap end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false)  and jenis_registrasi='I'  then pihak2_nama_lengkap end desc,
			case when $12::text='namaPenyewa' and not coalesce($13::boolean,false)  and jenis_registrasi='P'  then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPenyewa' and coalesce($13::boolean,false) and jenis_registrasi='P' then pihak2_nama_perusahaan end desc,
			case when $12::text='namaPerusahaan' and not coalesce($13::boolean,false) then pihak2_nama_perusahaan end asc, 
			case when $12::text='namaPerusahaan' and coalesce($13::boolean,false) then pihak2_nama_perusahaan end desc,
			case when $12::text='jenisTagihan' and not coalesce($13::boolean,false) then jenis_tagihan end asc, 
			case when $12::text='jenisTagihan' and coalesce($13::boolean,false) then jenis_tagihan end desc,
			case when $12::text='kodeBarang' and not coalesce($13::boolean,false) then inveq.kode_aset end asc, 
			case when $12::text='kodeBarang' and coalesce($13::boolean,false) then inveq.kode_aset end desc,
			case when $12::text='namaBarang' and not coalesce($13::boolean,false) then aset.nama_aset end asc, 
			case when $12::text='namaBarang' and coalesce($13::boolean,false) then aset.nama_aset end desc,
			case when $12::text='nomTagihan' and not coalesce($13::boolean,false) then nominal_penggantian end asc, 
			case when $12::text='nomTagihan' and coalesce($13::boolean,false) then nominal_penggantian end desc,
			case when $12::text='inveq' and coalesce($13::boolean,false) then nominal_penggantian end desc,
			case when $12::text='inveq' and not coalesce($13::boolean,false) then inveq.status end asc, 
			case when $12::text='status' and not coalesce($13::boolean,false) then inveq.status end asc,
			case when $12::text='status' and coalesce($13::boolean,false) then inveq.status end desc,
			inveq.tgl_rekam
		limit 
			case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
		offset 
			case 
				when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
			end`,
    params: [
      'p_rusun',
      { name: 'p_no_kontrak', default: null },
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null }, // 5
      { name: 'p_status', default: null },
      { name: 'p_blth', default: null },
      { name: 'p_search', default: null },
      { name: 'p_jenis_kontrak', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getInvoiceEntriesInventarisBarangRusakHilang: {
    text: `with data_penempatan_kontrak_items as(
				select distinct on (id_inventaris_unit)
						kontrak_items.id_inventaris_unit, kontrak_items.kode_aset,kontrak_items.id_unit ,kontrak_items.id_kontrak_sewa ,
						kontrak_items.tgl_penempatan_in , kontrak_items.tgl_penempatan_out, kontrak_items.tgl_kondisi_awal , kontrak_items.kondisi_awal ,
						kontrak_items.biaya_kehilangan , kontrak_items.biaya_kerusakan ,
						case when kontrak_items.kondisi_akhir is null then kondisi_akhir.tgl_kondisi else kontrak_items.tgl_kondisi_akhir end tgl_kondisi_akhir ,
						case when kontrak_items.kondisi_akhir is null then kondisi_akhir.kondisi_aset else kontrak_items.kondisi_akhir end kondisi_akhir ,
						kontrak_items.use_in_entri ,
						kontrak_sewa.no_kontrak_sewa,kontrak_sewa.pihak2_nama_lengkap , kontrak_sewa.pihak2_nama_perusahaan ,kontrak_sewa.jenis_registrasi ,
						(select nama_aset from aset where kode_aset=kontrak_items.kode_aset) nama_aset
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
						kontrak_items.aktif and not kontrak_items.use_in_entri
						and kontrak_sewa.kode_rusun=$1::text
					order by id_inventaris_unit,tgl_kondisi desc,kondisi_akhir.tgl_rekam desc
			)
			select 
				dpki.* , nama_blok, nama_lantai, nama_unit
			from 
				data_penempatan_kontrak_items dpki
				inner join aset on aset.kode_aset=dpki.kode_aset
				inner join rusun_unit ru on dpki.id_unit=ru.id_unit
				inner join rusun_lantai rl on ru.id_lantai = rl.id_lantai
				left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
			where 
				to_char(dpki.tgl_kondisi_akhir,'YYYY-MM')<=$2::text
				and dpki.kondisi_akhir<>'B' and dpki.kondisi_akhir is not null
				and (dpki.kondisi_awal='B' or dpki.kondisi_awal is null)
				and not use_in_entri
			order by  nama_blok, nama_lantai, nama_unit, nama_aset`,
    params: ['p_rusun', 'p_blth']
  },
  postInvoiceEntriesInventarisSubmit: {
    text: `select f_invoice_entries_eq_create($1::text,$2::text,$3::text,$4::json) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      'p_blth',
      {
        name: 'p_data_inventaris',
        type: 'array-json',
        data: [
          'id_inventaris_unit',
          { name: 'nominal_penggantian', default: null }
        ]
      }
    ]
  },
  delInvoiceEntriesInventaris: {
    text: `select f_invoice_entries_eq_cancel($1::text,$2::bigint,$3::text) as ret`,
    params: [
      'p_pengguna',
      'p_id_invoice_entries',
      {
        name: 'p_keterangan',
        default: null
      }
    ]
  },
  getInvoiceDendaSetting: {
    text: `select * from invoice_denda_setting
			where 
				( coalesce($1::int,0)=0 or id_setting_denda=$1::int)
				and ( $2::boolean is null or aktif=$2::boolean)`,
    params: [
      { name: 'p_id_setting_denda', default: null },
      { name: 'p_aktif', default: null }
    ]
  },
  postInvoiceDendaSetting: {
    text: `select f_invoice_denda_setting_save($1::text,$2::int,$3::date,$4::numeric,$5::boolean) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id_setting_denda', default: null },
      { name: 'p_tgl_mulai_berlaku', default: null },
      { name: 'p_prosen_denda', default: null },
      { name: 'p_aktif', default: null }
    ]
  },
  getInvoicePajakDibayarPenyewa: {
    text: `select 
				( (row_number() over()) + coalesce($5::bigint,10) * (coalesce($4::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				inv.* ,
				kontrak.jenis_registrasi,kontrak.no_kontrak_sewa,kontrak.id_kontrak_sewa,
				kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,  pihak2_nama_perusahaan, pihak2_alamat, pihak2_telpon
			from 
				invoice inv				
				inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
			where inv.aktif and inv.pajak_dibayar_penyewa 
				and kontrak.kode_rusun=$1::text
				and(
					coalesce($2::text,'')=''
					or ($2::text='Y'  and inv.ada_bukti_potong_pajak)
					or ($2::text='T'  and not inv.ada_bukti_potong_pajak)
				) 
				and (
					coalesce($3::text,'')='' 
					or kontrak.no_kontrak_sewa like '%' || $3::text || '%'
					or kontrak.pihak2_kpj like '%' || $3::text || '%'
					or kontrak.pihak2_nama_lengkap like '%' || $3::text || '%'
					or kontrak.pihak2_npp like '%' || $3::text || '%'
					or kontrak.pihak2_nama_perusahaan like '%' || $3::text || '%'
					or no_invoice like '%' || $3::text || '%'
				)
			order by 
				case when $6::text='blth' and not coalesce($7::boolean,false) then tahun_bulan_tagihan end asc, 
				case when $6::text='blth' and coalesce($7::boolean,false) then tahun_bulan_tagihan end desc,
				case when $6::text='noKontrak' and not coalesce($7::boolean,false) then no_kontrak_sewa end asc, 
				case when $6::text='noKontrak' and coalesce($7::boolean,false) then no_kontrak_sewa end desc,
				case when $6::text='jenisKontrak' and not coalesce($7::boolean,false) then jenis_registrasi end asc, 
				case when $6::text='jenisKontrak' and coalesce($7::boolean,false) then jenis_registrasi end desc,
				case when $6::text='namaPenyewa' and not coalesce($7::boolean,false) then pihak2_nama_lengkap end asc, 
				case when $6::text='namaPenyewa' and coalesce($7::boolean,false) then pihak2_nama_lengkap end desc,
				case when $6::text='namaPerusahaan' and not coalesce($7::boolean,false) then pihak2_nama_perusahaan end asc, 
				case when $6::text='namaPerusahaan' and coalesce($7::boolean,false) then pihak2_nama_perusahaan end desc,
				case when $6::text='adaBuktiPotong' and not coalesce($7::boolean,false) then ada_bukti_potong_pajak end asc, 
				case when $6::text='adaBuktiPotong' and coalesce($7::boolean,false) then ada_bukti_potong_pajak end desc,
				tgl_rekam
			limit 
				case when coalesce($5::bigint,0)::bigint>0   then $5::bigint end 
			offset 
				case 
					when coalesce($5::bigint,0)::bigint>0 then  $5::bigint * (coalesce($4::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_ada_bukti_potong', default: null },
      { name: 'p_search', default: null },
      { name: 'page', default: 1 }, // 3
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postInvoiceBuktiPotongPajak: {
    text: `select f_invoice_bukti_potong_pajak_save($1::text,$2::text,$3::text,$4::text) as ret`,
    params: ['p_pengguna', 'p_no_invoice', 'p_no_bukti_pajak', 'p_path']
  },
  getInvoiceBuktiPotongPajakLampiran: {
    text: `select path_bukti_potong_pajak from invoice where no_invoice=$1::text`,
    params: ['p_no_invoice']
  },
  postInvoiceProcessAll: {
    text: `select f_invoice_entri_proses_all($1::text,$2::text,$3::text) as ret`,
    params: ['p_pengguna', 'p_kode_rusun', 'p_blth']
  },
  postInvoiceFinalisasiDeposit: {
    text: `select f_kontrak_berhenti_finalisasi_deposit($1::text,$2::bigint,$3::numeric) as ret`,
    params: ['p_pengguna', 'p_id_berhenti', 'p_bayar']
  },
  getInvoiceEntriesRekap: {
    text: `with data_units as(
				select 
					ru.id_unit,nama_lantai, nama_blok
				from 
					rusun_unit ru 
					inner join rusun_lantai rl on ru.id_lantai =rl.id_lantai 
					left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok 
				where rl.kode_rusun =$1::text 
			)
			select
				1 as no_urut,'ENTRI BILLING SEWA UNIT' nama_billing,du.nama_blok, du.nama_lantai,
				sum(case when iei.status='I' then 1 else 0 end) jlmh_sudah_invoice,
				count(iei.id_invoice_entries_invsewa) jlmh_entri,
				sum(nominal_akhir) nominal_tagihan
			from 
				invoice_entries_invsewa iei 
				inner join data_units  du on iei.id_unit=du.id_unit
			where 
				aktif and tahun_bulan_tagihan=$2::text
			group by 
				du.nama_blok, du.nama_lantai
			union all 
			select
				2 as no_urut,'ENTRI BILLING LISTRIK' nama_billing, du.nama_blok, du.nama_lantai,
				sum(case when iei.status='I' then 1 else 0 end) jlmh_sudah_invoice,
				count(iei.id_invoice_entries) jlmh_entri,
				sum(nominal_total) nominal_tagihan
			from
				invoice_entries_invlstrk iei 
				inner join data_units  du on iei.id_unit=du.id_unit
			where 
				aktif  and tahun_bulan_tagihan=$2::text
			group by 
				du.nama_blok, du.nama_lantai
			union all
			select
				3 as no_urut,'ENTRI BILLING AIR' nama_billing, du.nama_blok, du.nama_lantai,
				sum(case when iei.status='I' then 1 else 0 end) jlmh_sudah_invoice,
				count(iei.id_invoice_entries) jlmh_entri,
				sum(nominal_total) nominal_tagihan
			from
				invoice_entries_invair iei 
				inner join data_units  du on iei.id_unit=du.id_unit
			where 
				aktif  and tahun_bulan_tagihan=$2::text
			group by 
				du.nama_blok, du.nama_lantai
			union all 
			select
				4 as no_urut,'ENTRI BILLING FASILITAS' nama_billing, du.nama_blok, du.nama_lantai,
				sum(case when iei.status='I' then 1 else 0 end) jlmh_sudah_invoice,
				count(iei.id_invoice_entries) jlmh_entri,
				sum(nominal_total) nominal_tagihan
			from
				invoice_entries_invfas iei 
				inner join data_units  du on iei.id_unit=du.id_unit
			where 
				aktif  and tahun_bulan_tagihan=$2::text
			group by 
				du.nama_blok, du.nama_lantai
			union all 
			select
				5 as no_urut,'ENTRI BILLING DENDA' nama_billing, du.nama_blok, du.nama_lantai,
				sum(case when iei.status='I' then 1 else 0 end) jlmh_sudah_invoice,
				count(iei.id_invoice_entries) jlmh_entri,
				sum(nominal_denda) nominal_tagihan
			from
				invoice_entries_invdenda iei 
				inner join data_units  du on iei.id_unit_kena_denda=du.id_unit
			where 
				aktif  and tahun_bulan_tagihan=$2::text
			group by 
				du.nama_blok, du.nama_lantai
			order by 
				no_urut,nama_blok, nama_lantai`,
    params: ['p_rusun', 'p_blth']
  },
  getInvoicePembayaran: {
    text: `select 
		p.*,
		pi.no_invoice 
	from 
		pembayaran_invoices pi
		inner join pembayaran p on pi.id_pembayaran =p.id_pembayaran 
	where pi.aktif and p.id_pembayaran=$1::bigint `,
    params: [{ name: 'p_id_pembayaran', default: null }]
  }
}
