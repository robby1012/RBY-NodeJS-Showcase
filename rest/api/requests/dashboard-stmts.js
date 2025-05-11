module.exports = {
  getDashboardOkupansi: {
    text: `with data_okupansi as(
		select 
			nama_lantai
			,sum(case  when jan>4 then 4 else jan end) jan
			,sum(case when feb>4 then 4 else feb end) feb
			,sum(case when mar>4 then 4 else mar end) mar
			,sum(case when apr>4 then 4 else apr end) apr
			,sum(case when mei>4 then 4 else mei end) mei
			,sum(case when jun>4 then 4 else jun end) jun
			,sum(case when jul>4 then 4 else jul end) jul
			,sum(case when aug>4 then 4 else aug end) aug
			,sum(case when sep>4 then 4 else sep end) sep
			,sum(case when okt>4 then 4 else okt end) okt
			,sum(case when nov>4 then 4 else nov end) nov
			,sum(case when des>4 then 4 else des end) des
			, count(distinct id_unit) * 4 kapasitas
		from (
			select 
				lantai.id_lantai,nama_lantai, unit.id_unit
				, sum(case when ($2::text || '-01-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-02-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-02-01')::date and tgl_out>=($2::text || '-01-01')::date) then 1 else 0 end) JAN
				, sum(case when ($2::text || '-02-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-03-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-03-01')::date and tgl_out>=($2::text || '-02-01')::date) then 1 else 0 end) FEB
				, sum(case when ($2::text || '-03-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-04-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-04-01')::date and tgl_out>=($2::text || '-03-01')::date) then 1 else 0 end) MAR
				, sum(case when ($2::text || '-04-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-05-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-05-01')::date and tgl_out>=($2::text || '-04-01')::date) then 1 else 0 end) APR
				, sum(case when ($2::text || '-05-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-06-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-06-01')::date and tgl_out>=($2::text || '-05-01')::date) then 1 else 0 end) MEI
				, sum(case when ($2::text || '-06-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-07-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-07-01')::date and tgl_out>=($2::text || '-06-01')::date) then 1 else 0 end) JUN
				, sum(case when ($2::text || '-07-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-08-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-08-01')::date and tgl_out>=($2::text || '-07-01')::date) then 1 else 0 end) JUL
				, sum(case when ($2::text || '-08-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-09-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-09-01')::date and tgl_out>=($2::text || '-08-01')::date) then 1 else 0 end) AUG
				, sum(case when ($2::text || '-09-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-10-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-10-01')::date and tgl_out>=($2::text || '-09-01')::date) then 1 else 0 end) SEP
				, sum(case when ($2::text || '-10-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-11-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-11-01')::date and tgl_out>=($2::text || '-10-01')::date) then 1 else 0 end) OKT
				, sum(case when ($2::text || '-11-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<($2::text || '-12-01')::date) or ( tgl_out is not null  and tgl_in<($2::text || '-12-01')::date and tgl_out>=($2::text || '-11-01')::date) then 1 else 0 end) NOV
				, sum(case when ($2::text || '-12-01')::date>date_trunc('month',current_date) then 0 when ( tgl_out is null  and tgl_in<=($2::text || '-12-31')::date) or ( tgl_out is not null  and tgl_in<=($2::text || '-12-31')::date and tgl_out>=($2::text || '-12-01')::date) then 1 else 0 end) DES
			from 
				rusun_lantai lantai
				left outer join rusun_unit unit on lantai.id_lantai=unit.id_lantai and unit.aktif and unit.is_rented
				left outer join registrasi_penghuni penghuni on (
					penghuni.id_unit=unit.id_unit and penghuni.aktif_menghuni
					and (
						(tgl_out is null and  EXTRACT(YEAR FROM tgl_in)<=$2::int)
						or 
						(tgl_out is not null and  EXTRACT(YEAR FROM tgl_in)<=$2::int  and  EXTRACT(YEAR FROM tgl_out)>=$2::int)
					)
				)	
			where kode_rusun=$1::text and lantai.aktif
			group by lantai.id_lantai,nama_lantai ,unit.id_unit
		) a
		group by nama_lantai
		order by nama_lantai
	)
	select 1::int as n,'JUMLAH' okupansi,sum(jan)::numeric jan,sum(feb)::numeric feb,sum(mar)::numeric mar,sum(apr)::numeric apr,sum(mei)::numeric mei,sum(jun)::numeric jun,sum(jul)::numeric jul,sum(aug)::numeric aug,sum(sep)::numeric sep,sum(okt)::numeric okt,sum(nov)::numeric nov,sum(des)::numeric des,sum(kapasitas)::numeric kapasitas
	from  data_okupansi		
	union all
	select 2::int as n,'PROSENTASE' okupansi,(sum(jan)/sum(kapasitas)*100)::numeric,(sum(feb)/sum(kapasitas)*100)::numeric,(sum(mar)/sum(kapasitas)*100)::numeric,(sum(apr)/sum(kapasitas)*100)::numeric,(sum(mei)/sum(kapasitas)*100)::numeric,(sum(jun)/sum(kapasitas)*100)::numeric,(sum(jul)/sum(kapasitas)*100)::numeric,(sum(aug)/sum(kapasitas)*100)::numeric,(sum(sep)/sum(kapasitas)*100)::numeric,(sum(okt)/sum(kapasitas)*100)::numeric,(sum(nov)/sum(kapasitas)*100)::numeric,(sum(des)/sum(kapasitas)*100)::numeric,(sum(kapasitas)/sum(kapasitas)/sum(kapasitas)*100)::numeric
	from  data_okupansi`,
    params: ['p_rusun', 'p_tahun']
  },
  getDashboardRegistrasi: {
    text: `with data_registrasi as(
			select tgl_rekam,status,waiting_list , waiting_list_proses
			from registrasi 
			where aktif and kode_rusun=$1::text and extract('YEAR' from tgl_rekam)=$2::int
		)
		select 
			1::int as n,'JUMLAH REGISTRASI' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =1 then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =2 then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =3 then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =4 then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =5 then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =6 then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =7 then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =8 then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =9 then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =10 then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =11 then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =12 then 1 else 0 end),0) des
		from data_registrasi
		union all
		select 
			2::int as n,'MASIH DRAFT' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =1  and status='D' then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =2  and status='D' then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =3  and status='D' then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =4  and status='D' then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =5  and status='D' then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =6  and status='D' then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =7  and status='D' then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =8  and status='D' then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =9  and status='D' then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =10  and status='D' then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =11  and status='D' then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =12  and status='D' then 1 else 0 end),0) des
		from data_registrasi
		union all
		select 
			3::int as n,'SUDAH SUBMIT KONTRAK' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =1  and status in ('S','R','K') then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =2  and status in ('S','R','K') then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =3  and status in ('S','R','K') then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =4  and status in ('S','R','K') then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =5  and status in ('S','R','K') then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =6  and status in ('S','R','K') then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =7  and status in ('S','R','K') then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =8  and status in ('S','R','K') then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =9  and status in ('S','R','K') then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =10  and status in ('S','R','K') then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =11  and status in ('S','R','K') then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =12  and status in ('S','R','K') then 1 else 0 end),0) des
		from data_registrasi
		union all
		select 
			4::int as n,'JUMLAH DITOLAK' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =1  and status='R' then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =2  and status='R' then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =3  and status='R' then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =4  and status='R' then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =5  and status='R' then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =6  and status='R' then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =7  and status='R' then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =8  and status='R' then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =9  and status='R' then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =10  and status='R' then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =11  and status='R' then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =12  and status='R' then 1 else 0 end),0) des
		from data_registrasi
		union all
		select 
			5::int as n,'JUMLAH DIAPPROVE' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =1  and status='K' then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =2  and status='K' then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =3  and status='K' then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =4  and status='K' then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =5  and status='K' then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =6  and status='K' then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =7  and status='K' then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =8  and status='K' then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =9  and status='K' then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =10  and status='K' then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =11  and status='K' then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_rekam) =12  and status='K' then 1 else 0 end),0) des
		from data_registrasi`,
    params: ['p_rusun', 'p_tahun']
  },
  getDashboardKontrakProses: {
    text: `with data_kontrak_sewa as(
			select approval_tgl,case when t.tgl_pembayaran is null then approval_tgl else t.tgl_pembayaran end tgl_berlaku,kontrak_berlaku,kontrak.id_kontrak_sewa, tgl_mulai_sewa
			from 
				kontrak_sewa kontrak
				left outer join (
					select inv.id_kontrak_sewa,p.tgl_pembayaran
					from
						invoice inv
						inner join invoice_entries inv_e on inv.no_invoice=inv_e.no_invoice and kode_invoice_entries='INVDPST'
						inner join pembayaran_invoices p_i on p_i.no_invoice=inv.no_invoice and p_i.aktif
						inner join pembayaran p on p_i.id_pembayaran=p.id_pembayaran and p.aktif 
					where inv.aktif and inv.flag_rekon 
				) t on t.id_kontrak_sewa=kontrak.id_kontrak_sewa
			where kontrak.aktif and kontrak.approval  and kode_rusun=$1::text and  extract('YEAR' from approval_tgl)=$2::int
		)
		select 
			1::int as n,'APPROVED' NAMA
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =1 then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =2 then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =3 then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =4 then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =5 then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =6 then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =7 then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =8 then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =9 then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =10 then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =11 then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =12 then 1 else 0 end),0) des
		from data_kontrak_sewa
		union all
		select 
			2::int as n,'BELUM BAYAR DEPOSIT' NAMA
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =1 and not kontrak_berlaku then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =2 and not kontrak_berlaku then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =3 and not kontrak_berlaku then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =4 and not kontrak_berlaku then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =5 and not kontrak_berlaku then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =6 and not kontrak_berlaku then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =7 and not kontrak_berlaku then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =8 and not kontrak_berlaku then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =9 and not kontrak_berlaku then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =10 and not kontrak_berlaku then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =11 and not kontrak_berlaku then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =12 and not kontrak_berlaku then 1 else 0 end),0) des
		from data_kontrak_sewa
		union all
		select 
			3::int as n,'SUDAH BAYAR DEPOSIT' NAMA
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =1 and kontrak_berlaku then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =2 and kontrak_berlaku then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =3 and kontrak_berlaku then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =4 and kontrak_berlaku then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =5 and kontrak_berlaku then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =6 and kontrak_berlaku then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =7 and kontrak_berlaku then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =8 and kontrak_berlaku then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =9 and kontrak_berlaku then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =10 and kontrak_berlaku then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =11 and kontrak_berlaku then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from approval_tgl) =12 and kontrak_berlaku then 1 else 0 end),0) des
		from data_kontrak_sewa
		union all
		select 
			4::int as n,'MULAI AKTIF MENGHUNI' NAMA
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =1  and kontrak_berlaku then 1 else 0 end),0) jan
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =2  and kontrak_berlaku then 1 else 0 end),0) feb
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =3  and kontrak_berlaku then 1 else 0 end),0) mar
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =4  and kontrak_berlaku then 1 else 0 end),0) apr
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =5  and kontrak_berlaku then 1 else 0 end),0) mei
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =6  and kontrak_berlaku then 1 else 0 end),0) jun
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =7  and kontrak_berlaku then 1 else 0 end),0) jul
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =8  and kontrak_berlaku then 1 else 0 end),0) aug
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =9  and kontrak_berlaku then 1 else 0 end),0) sep
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =10  and kontrak_berlaku then 1 else 0 end),0) okt
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =11  and kontrak_berlaku then 1 else 0 end),0) nov
			,coalesce(sum(case when extract('MONTH' from tgl_mulai_sewa) =12  and kontrak_berlaku then 1 else 0 end),0) des
		from data_kontrak_sewa`,
    params: ['p_rusun', 'p_tahun']
  },
  getDashboardAvailabilityUnit: {
    text: `select 
		count(*) unit_disewakan,
		sum(case when is_filled then 1 else 0 end) unit_terisi,
		sum(case when not is_filled and is_processed then 1 else 0 end) unit_dalam_proses,
		sum(case when not is_filled and not is_processed then 1 else 0 end) unit_available
	from 
		rusun_lantai lantai
		inner join rusun_unit unit on lantai.id_lantai=unit.id_lantai
	where lantai.aktif and unit.aktif and unit.is_rented and lantai.kode_rusun=$1::text
	`,
    params: ['p_rusun']
  },
  getDashboardPenghuni: {
    text: `select 
		sum(case when jmlh_penghuni>4 then 4 else jmlh_penghuni end) jmlh_penghuni
		from (
			select 
				unit.id_unit, count(*) jmlh_penghuni
			from 
				rusun_lantai lantai
				inner  join rusun_unit unit on lantai.id_lantai=unit.id_lantai and unit.aktif and unit.is_rented
				inner join registrasi_penghuni penghuni on (
					penghuni.id_unit=unit.id_unit and penghuni.aktif_menghuni
					and (
						(tgl_out is null and  tgl_in<=date_trunc('day',now()))
						or 
						(tgl_out is not null and  tgl_in<=date_trunc('day',now())  and  tgl_out>=date_trunc('day',now()))
					)
				)	
			where lantai.aktif and lantai.kode_rusun=$1::text 
			group by unit.id_unit
		) t`,
    params: ['p_rusun']
  },
  getDashboardWaitingList: {
    text: `select 
		kode_unit_jenis,
		(select nama_unit_jenis from kode_unit_jenis where kode_unit_jenis=registrasi.kode_unit_jenis) nama_unit_jenis,
		count(*) wl
		from registrasi
		where 
			aktif and  waiting_list
			and not waiting_list_proses and status='D'
			and kode_rusun=$1::text
		group by kode_unit_jenis`,
    params: ['p_rusun']
  }
}
