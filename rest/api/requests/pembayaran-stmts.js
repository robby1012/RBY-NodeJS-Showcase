/* eslint-disable no-mixed-spaces-and-tabs */
// const moment = require('moment')
module.exports = {
  getInvoiceChoosed: {
    text: `select 
					inv.*
					,kontrak.no_kontrak_sewa, kontrak.pihak2_kpj,pihak2_nama_lengkap,kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan, kontrak.jenis_registrasi
					,(select title_invoice from kode_invoice_kelompok where kode_invoice_kelompok=inv.kode_invoice_kelompok) nama_tagihan
					, (
						select json_agg(t) from (
							select 
								ksu.id_unit,unit.no_unit , lantai.no_lantai,blok.nama_blok, blok.kode_blok
							from 
								kontrak_sewa_unit ksu
								inner join rusun_unit unit on ksu.id_unit=unit.id_unit
								inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
								left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
							where id_kontrak_sewa=kontrak.id_kontrak_sewa 
						) t
					) unit,
					(
						select sum(coalesce(nominal_retur_in,0::numeric)-coalesce(nominal_retur_out,0::numeric))
						from kontrak_sewa_retur
						where id_kontrak_sewa=kontrak.id_kontrak_sewa and aktif
					) nominal_deposit_retur
				from 
					invoice inv
					inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
				where 
					($1::text='' or kontrak.kode_rusun=$1)
					and inv.no_invoice in (
						select (x->>'no_invoice')::text 
						from (select json_array_elements($2::json)  x) a
					)
				order by inv.no_invoice`,
    params: [
      { name: 'p_rusun', default: '' },
      {
        name: 'p_invoices',
        type: 'array-json',
        data: ['no_invoice']
      }
    ]
  },
  postPembayaran: {
    text: `select f_pembayaran_bayar($1::text,$2::bigint,to_date($3::text,'YYYY-MM-DD')::date,$4::text
							,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::numeric
							,$12::numeric,$13::numeric,$14::numeric,$15::boolean,$16::text,$17::json,$18::boolean) as ret`,
    params: [
      'p_pengguna',
      'p_kontrak',
      'p_tgl_bayar',
      'p_nama',
      'p_media',
      { name: 'p_asal_bank', default: null },
      { name: 'p_asal_rek', default: null },
      { name: 'p_asal_trxid', default: null },
      { name: 'p_penerima_bank', default: null },
      { name: 'p_penerima_rek', default: null },
      'p_nom_tagihan',
      'p_nom_bayar',
      'p_nom_terbayar',
      'p_nom_kembali',
      { name: 'p_isdeposit_retur', default: false },
      { name: 'p_keterangan', default: null },
      {
        name: 'p_distribusi',
        type: 'array-json',
        data: ['no_invoice', 'tagihan']
      },
      { name: 'p_pajak_dibayar_penyewa', default: false }
    ]
  },
  getPembayaran: {
    text: `select 
			( (row_number() over()) + coalesce($6::bigint,10) * (coalesce($5::int,1)-1) )::int nomor_baris, 
			(count(*) OVER())::int AS full_count_baris,
			b.id_pembayaran, b.id_kontrak_sewa, b.media_pembayaran, b.tgl_pembayaran, b.bank_asal_name, b.bank_asal_rek,
			b.bank_asal_transfer_id, b.bank_tujuan_name, b.bank_tujuan_rek, b.nama_pembayar, b.nominal_tagihan, 
			b.nominal_deposit, b.nominal_pembayaran, b.nominal_retur, 
			b.nominal_retur_isdeposit, b.nominal_kurang_bayar, b.keterangan,
			kontrak.no_kontrak_sewa, kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap, kontrak.pihak2_nama_perusahaan,kontrak.jenis_registrasi,
			nama_pembayaran_method,b.pajak_dibayar_penyewa,b.pajak_nominal_dibayar_penyewa,
			json_agg(
				(
					select x from (
						select 
							b_inv.no_invoice, b_inv.nominal_tagihan, b_inv.nominal_pembayaran nominal_terbayar, b_inv.nominal_sisa,
							inv.tahun_bulan_tagihan,inv.nominal_invoice,inv.nominal_pajak,inv.nominal_akhir,
							inv.pajak_dibayar_penyewa,inv.pajak_nominal_dibayar_penyewa,
							( 
								select title_invoice 
								from kode_invoice_kelompok where kode_invoice_kelompok=inv.kode_invoice_kelompok
							) title_invoice
							order by b_inv.no_invoice
					) as x
				)
			)  data_invoice
		from 
			pembayaran b
			inner join pembayaran_invoices b_inv on b.id_pembayaran=b_inv.id_pembayaran and b_inv.aktif
			inner join kontrak_sewa kontrak on b.id_kontrak_sewa=kontrak.id_kontrak_sewa
			inner join invoice inv on b_inv.no_invoice=inv.no_invoice
			left outer join kode_pembayaran_method media_bayar on b.media_pembayaran=media_bayar.kode_pembayaran_method
		where b.aktif 
			and kontrak.kode_rusun=$1::text
			and (coalesce($2::bigint,0)=0 or  $2::bigint=b.id_kontrak_sewa)
			and (coalesce($3::bigint,0)=0 or $3::bigint=b.id_pembayaran)
			and (
				coalesce($4::text,'')=''
				or kontrak.no_kontrak_sewa ilike '%' || $4::text || '%'
				or kontrak.pihak2_kpj ilike '%' || $4::text || '%'
				or kontrak.pihak2_nama_lengkap ilike '%' || $4::text || '%'
				or kontrak.pihak2_nama_perusahaan ilike '%' || $4::text || '%'
				or b_inv.no_invoice ilike '%' || $4::text || '%'
			)
			and (coalesce($9::text,'')='' or media_pembayaran=$9::text)
			and (coalesce($10::text,'')='' or b_inv.no_invoice=$10::text)
			and (coalesce($11::text,'')='' or kontrak.no_kontrak_sewa=$11::text)
		group by 
			b.id_pembayaran, b.id_kontrak_sewa, b.media_pembayaran, b.tgl_pembayaran, b.bank_asal_name, b.bank_asal_rek,
			b.bank_asal_transfer_id, b.bank_tujuan_name, b.bank_tujuan_rek, b.nama_pembayar, b.nominal_tagihan,
			b.nominal_deposit, b.nominal_pembayaran, b.nominal_retur, 
			b.nominal_retur_isdeposit, b.nominal_kurang_bayar, b.keterangan,
			kontrak.no_kontrak_sewa, kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap, kontrak.pihak2_nama_perusahaan,kontrak.jenis_registrasi,
			nama_pembayaran_method
		order by 
			case when $7::text='noKontrak' and not coalesce($8::boolean,false) then kontrak.no_kontrak_sewa end asc, 
			case when $7::text='noKontrak' and coalesce($8::boolean,false) then kontrak.no_kontrak_sewa end desc,
			case when $7::text='totalTagihan' and not coalesce($8::boolean,false) then b.nominal_tagihan end asc, 
			case when $7::text='totalTagihan' and coalesce($8::boolean,false) then b.nominal_tagihan end desc,
			case when $7::text='namaPembayar' and not coalesce($8::boolean,false) then b.nama_pembayar end asc, 
			case when $7::text='namaPembayar' and coalesce($8::boolean,false) then b.nama_pembayar end desc,
			case when $7::text='mediaPembayaran' and not coalesce($8::boolean,false) then b.media_pembayaran end asc, 
			case when $7::text='mediaPembayaran' and coalesce($8::boolean,false) then b.media_pembayaran end desc,
			case when $7::text='tanggalBayar' and not coalesce($8::boolean,false) then b.tgl_pembayaran end asc, 
			case when $7::text='tanggalBayar' and coalesce($8::boolean,false) then b.tgl_pembayaran end desc
		limit 
			case when coalesce($6::bigint,0)::bigint>0   then $6::bigint end 
		offset 
			case 
				when coalesce($6::bigint,0)::bigint>0 then  $6::bigint * (coalesce($5::int,1)-1)
			end`,
    params: [
      { name: 'p_rusun', default: '' },
      { name: 'p_id_kontrak', default: 0 },
      { name: 'p_id_pembayaran', default: 0 },
      { name: 'p_search', default: '' },
      { name: 'page', default: 1 }, // 5
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null },
      { name: 'p_media_bayar', default: null }, // 9
      { name: 'p_no_inv', default: null },
      { name: 'p_no_kontrak', default: null }
    ]
  },
  getPembayaranRetur: {
    text: `select 
		sum(coalesce(nominal_retur_in,0::numeric) - coalesce(nominal_retur_out,0::numeric)) retur
		from kontrak_sewa_retur
		where aktif and id_kontrak_sewa=$1::bigint`,
    params: [{ name: 'p_id_kontrak', default: 0 }]
  },
  getPembayaranReturAll: {
    text: `select 
					( (row_number() over()) + coalesce($4::bigint,10) * (coalesce($3::int,1)-1) )::int nomor_baris, 
					(count(*) OVER())::int AS full_count_baris,
					kontrak.id_kontrak_sewa, kontrak.no_kontrak_sewa, kontrak.kode_rusun, kontrak.jenis_registrasi, 
					kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, kontrak.pihak1_jabatan,kontrak. pihak2_kpj, kontrak.pihak2_nama_lengkap, 
					kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan,
					kontrak.tgl_mulai_sewa,
					sum(nominal_retur_in) nominal_retur_in,
					sum(nominal_retur_out) nominal_retur_out,
					sum(nominal_retur_in-nominal_retur_out) nominal_retur
				from 
					kontrak_sewa kontrak
					inner join kontrak_sewa_retur retur on kontrak.id_kontrak_sewa=retur.id_kontrak_sewa
				where retur.aktif
					and kontrak.kode_rusun=$1::text
					and (
						coalesce($2::text,'')='' 
						or kontrak.no_kontrak_sewa ilike '%' || $2::text || '%'
						or kontrak.pihak2_nama_lengkap ilike '%' || $2::text || '%'
						or  kontrak.pihak2_nama_perusahaan ilike '%' || $2::text || '%'
					)
				group by 
					kontrak.id_kontrak_sewa, no_kontrak_sewa, kode_rusun, jenis_registrasi, 
					tgl_kontrak_sewa, pihak1_nama_lengkap, pihak1_jabatan, pihak2_kpj, pihak2_nama_lengkap, 
					pihak2_npp, pihak2_nama_perusahaan,
					tgl_mulai_sewa
				order by 
					case when $5::text='noKontrak' and not coalesce($6::boolean,false) then kontrak.no_kontrak_sewa end asc, 
					case when $5::text='noKontrak' and coalesce($6::boolean,false) then kontrak.no_kontrak_sewa end desc,
					case when $5::text='namaPenyewa' and not coalesce($6::boolean,false) then kontrak.pihak2_nama_lengkap end asc, 
					case when $5::text='namaPenyewa' and coalesce($6::boolean,false) then kontrak.pihak2_nama_lengkap end desc,
					case when $5::text='namaPerusahaan' and not coalesce($6::boolean,false) then kontrak.pihak2_nama_perusahaan end asc, 
					case when $5::text='namaPerusahaan' and coalesce($6::boolean,false) then kontrak.pihak2_nama_perusahaan end desc,
					case when $5::text='jenisRegistrasi' and not coalesce($6::boolean,false) then kontrak.jenis_registrasi end asc, 
					case when $5::text='jenisRegistrasi' and coalesce($6::boolean,false) then kontrak.jenis_registrasi end desc,
					case when $5::text='nominalRetur' and not coalesce($6::boolean,false) then sum(nominal_retur_in-nominal_retur_out) end asc, 
					case when $5::text='nominalRetur' and coalesce($6::boolean,false) then sum(nominal_retur_in-nominal_retur_out) end desc
				limit 
					case when coalesce($4::bigint,0)::bigint>0   then $4::bigint end 
				offset 
					case 
						when coalesce($4::bigint,0)::bigint>0 then  $4::bigint * (coalesce($3::int,1)-1)
					end`,
    params: [
      { name: 'p_rusun', default: '' },
      { name: 'p_search', default: '' },
      { name: 'page', default: 1 }, // 3
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  getPembayaranRekening: {
    text: `select * 
			from pembayaran_rekening
			where 
				(coalesce($1::int,0)=0 or id_pembayaran_rekening=$1::int)
				and (
					coalesce($2::text,'')='' 
					or kode_kantor in (
						WITH RECURSIVE cte AS (
							SELECT kode_kantor
							FROM   kode_kantor
							WHERE  kode_kantor = $2::text
					
							UNION  ALL
							SELECT t.kode_kantor
							FROM   cte      c
							JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
							)
						SELECT kode_kantor
						FROM   cte
					)
				)
				and (coalesce($3::text,'')='' or nama_bank=$3::text)
				and (coalesce($4::text,'')='' or no_rekening=$4::text)
				and ($5::boolean is null or aktif=$5::boolean)`,
    params: [
      { name: 'p_id_pembayaran_rekening', default: null },
      { name: 'p_kode_kantor', default: null },
      { name: 'p_nama_bank', default: null },
      { name: 'p_no_rekening', default: null },
      { name: 'p_aktif', default: null }
    ]
  },
  postPembayaranRekening: {
    text: `select  f_pembayaran_rekening_save($1::text,$2::int,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::boolean) as ret`,
    params: [
      'p_pengguna',
      { name: 'p_id_pembayaran_rekening', default: null },
      { name: 'p_kode_kantor', default: null },
      { name: 'p_no_rekening', default: null },
      { name: 'p_nama_bank', default: null },
      { name: 'p_atas_nama_rekening', default: null },
      { name: 'p_cabang_bank', default: null },
      { name: 'p_keterangan', default: null },
      { name: 'p_aktif', default: null }
    ]
  },
  getPembayaranReturDetil: {
    text: `select retur.id_kontrak_sewa_retur,byr.tgl_pembayaran,byr.nominal_tagihan,byr.nominal_pembayaran,retur.nominal_retur_in, 
						retur.nominal_retur_out, retur.nominal_retur_in-retur.nominal_retur_out nominal_sisa,byr.media_pembayaran,
						(
							select json_agg(t) from 
							(
								select byr_out.tgl_pembayaran,retur_out.* 
								from 
									kontrak_sewa_retur_out retur_out
									inner join pembayaran byr_out on retur_out.id_pembayaran=byr_out.id_pembayaran
								where
									retur_out.aktif and retur_out.id_kontrak_sewa_retur=retur.id_kontrak_sewa_retur
								order by byr_out.tgl_pembayaran, byr_out.id_pembayaran
							) as t
						) detil_retur_out
					from 
						kontrak_sewa_retur retur
						inner join pembayaran byr on  retur.id_pembayaran=byr.id_pembayaran
					where retur.aktif and retur.id_kontrak_sewa=$1::bigint
					group by  retur.id_kontrak_sewa_retur,byr.tgl_pembayaran,byr.nominal_tagihan,byr.nominal_pembayaran,retur.nominal_retur_in, 
						retur.nominal_retur_out, retur.nominal_retur_in-retur.nominal_retur_out,byr.media_pembayaran
					order by byr.tgl_pembayaran, retur.id_pembayaran`,
    params: ['p_id_kontrak_sewa']
  }
}
