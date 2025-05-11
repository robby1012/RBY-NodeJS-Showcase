module.exports = {
  getRptSuratJatuhTempo: {
    text: `select 
      ks.id_kontrak_sewa, 
      ku.tarif, 
      ks.pihak2_nama_perusahaan, 
      ru.nama_unit,
      rl.nama_lantai,
      rb.nama_blok,
      ks.no_kontrak_sewa, 
      ks.tgl_berakhir_sewa, 
      ks.pihak2_nama_lengkap, 
      ks.pihak1_nama_lengkap,
      ks.jenis_registrasi, 
      ks.tgl_berakhir_sewa, 
      r.nama_rusun, 
      r.initial_nama_rusun, 
      r.initial_nama_daerah, 
      r.lokasi, 
      r.provinsi, 
      r.fax, 
      r.telpon 
      from kontrak_sewa ks
      left join kontrak_sewa_unit ku
      on ku.id_kontrak_sewa = ks.id_kontrak_sewa
      left join rusun_unit ru
      on ru.id_unit = ku.id_unit
      inner join rusun_lantai rl
      on rl.id_lantai = ru.id_lantai
      inner join rusun_blok rb
      on rb.id_rusun_blok = rl.id_rusun_blok
      left join rusun r on r.kode_rusun=ks.kode_rusun
      where ks.kode_rusun=$1::text
      and ks.id_kontrak_sewa=$2::int
      order by ru.nama_unit`,
    params: [
      'p_rusun',
      'p_kontrak'
    ]
  },
  getRptPenghuniRusunJenisKelamin: {
    text: `select 
    ks.pihak2_nama_perusahaan,
    rp.kpj,
    rp.kpj_nama,
    rp.nik,
	  rp.jenis_kelamin,
    ru.nama_unit,
    rl.nama_lantai,
    rb.nama_blok,
    r.nama_rusun,
    ($3::date)periode_awal,
    ($4::date)periode_akhir
    from
    kontrak_sewa ks 
    inner join registrasi_penghuni rp on ks.id_kontrak_sewa =rp.id_kontrak_sewa
    inner join profil_penghuni pp on pp.id_profil_penghuni =rp.id_profil_penghuni
    inner join rusun_unit ru on ru.id_unit=rp.id_unit 
    inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai 
    inner join rusun r on r.kode_rusun=ks.kode_rusun
    left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok 
    where rp.aktif 
    and rp.aktif_menghuni 
    and ks.aktif 
    and ks.approval 
    and ks.kontrak_berlaku 
    and ks.kode_rusun=$1::text
    and (
      (
        rp.tgl_out is null or 
        (rp.tgl_out is not null and rp.tgl_out between $3::date and $4::date)
      )
      and rp.tgl_in between $3::date and $4::date
    )
    and (
      coalesce($2::text,'')=''
      or rp.jenis_kelamin = $2::text
      or rp.jenis_kelamin like '%' || $2::text || '%'
    )
    
    order by rp.jenis_kelamin desc, rp.tgl_in desc`,
    params: [
      'p_rusun',
      'p_jenis_kelamin',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  /* getRptMonitoringPembayaranInvoiceAirListrik: {
    text: `
    select i.flag_rekon,i.no_invoice,pp.nik,rp.kpj_nama,rp.kpj,kw.no_kontrak_sewa,
      (select nama_rusun from rusun where rusun.kode_rusun = kw.kode_rusun)nama_rusun,
      p.media_pembayaran,
      p.tgl_pembayaran,
      unit.id_unit, unit.nama_unit, blok.kode_blok, blok.nama_blok,
      ($3::date)periode_awal, ($4::date)periode_akhir
      from invoice i
      left join pembayaran_invoices pi
      on i.no_invoice = pi.no_invoice
      left join pembayaran p
      on p.id_pembayaran = pi.id_pembayaran
      left join kontrak_sewa kw
      on kw.id_kontrak_sewa = i.id_kontrak_sewa
      left join registrasi_penghuni rp
      on rp.no_registrasi = kw.no_registrasi
      left join profil_penghuni pp
      on pp.id_profil_penghuni = rp.id_profil_penghuni
      left join rusun_unit unit
      on unit.id_unit=rp.id_unit 
      left join rusun_lantai lantai 
      on lantai.id_lantai = unit.id_lantai
      left join rusun_blok blok
      on blok.id_rusun_blok=lantai.id_rusun_blok
      where rp.penanggung_jawab
      and kw.kode_rusun = $1::text
      and (
        coalesce($2::text,'')=''
        or
        (i.flag_rekon = true or i.flag_rekon = false)
        and i.flag_rekon = $2::boolean
      )
      and i.tgl_invoice between $3::date and $4::date
      order by  p.tgl_pembayaran desc nulls first, i.tgl_invoice desc
  `,
    params: [
      'p_rusun',
      'p_status_pembayaran',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  }, */
  getRptMonitoringPembayaranInvoiceAirListrik: {
    text: `
    with dt as(
      select 
        case when iel.id_unit is null then iea.id_unit 
          else iel.id_unit end as id_unit,
        case when iel.id_kontrak_sewa is null then iea.id_kontrak_sewa 
          else iel.id_kontrak_sewa end as id_kontrak_sewa,
        ie.no_invoice,
        string_agg(ie.kode_invoice_entries,',') as kode_invoice_entries
      from invoice_entries ie 
      left outer join invoice_entries_invair iea on iea.id_invoice_entries = ie.ref_id_invoice_entries
      left outer join invoice_entries_invlstrk iel on iel.id_invoice_entries = ie.ref_id_invoice_entries
      where
        (kode_invoice_entries = 'INVLSTRK' OR kode_invoice_entries='INVAIR')
        and ie.id_invoice_entries is not null
      group by 
        case when iel.id_unit is null then iea.id_unit else iel.id_unit end,
        case when iel.id_kontrak_sewa is null then iea.id_kontrak_sewa else iel.id_kontrak_sewa end,
        ie.no_invoice
    )
    select 
      ks.pihak2_nik,
      ks.pihak2_nama_lengkap,
      ks.pihak2_kpj,
      ks.no_kontrak_sewa,
      i.no_invoice,
      rb.nama_blok,
      ru.nama_unit,
      r.nama_rusun,
      p.tgl_pembayaran,
      mb.nama_pembayaran_method,
      i.tahun_bulan_tagihan,
      i.flag_rekon,
      dt.kode_invoice_entries,
      ($3::date)periode_awal, 
      ($4::date)periode_akhir
    from kontrak_sewa ks 
    inner join invoice i on i.id_kontrak_sewa = ks.id_kontrak_sewa and i.aktif
    left outer join pembayaran_invoices pi on i.no_invoice=pi.no_invoice and pi.aktif
    left outer join pembayaran p on pi.id_pembayaran=p.id_pembayaran and p.aktif
    left outer join kode_pembayaran_method mb on p.media_pembayaran=mb.kode_pembayaran_method
    inner join dt on dt.id_kontrak_sewa = ks.id_kontrak_sewa and dt.no_invoice = i.no_invoice 
    inner join rusun_unit ru on ru.id_unit = dt.id_unit
    inner join rusun_lantai rl on rl.id_lantai = ru.id_lantai
    inner join rusun_blok rb on rb.id_rusun_blok = rl.id_rusun_blok
    inner join rusun r on r.kode_rusun = ks.kode_rusun
    where
    ks.approval
    and ks.aktif
    and ks.kode_rusun=$1::text
    and (
      coalesce($2::text,'')=''
      or
      (i.flag_rekon = true or i.flag_rekon = false)
      and i.flag_rekon = $2::boolean
    )
    and i.tahun_bulan_tagihan between to_char($3::date,'YYYY-MM') and to_char($4::date,'YYYY-MM')
    order by p.tgl_pembayaran desc nulls first, i.tgl_invoice desc
	`,
    params: [
      'p_rusun',
      'p_status_pembayaran',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  getRptPenghuniRusunPerusahaan: {
    text: `select 
    ks.jenis_registrasi,
    rp.kpj_nama,
    rp.nik,
    rp.kpj,
    ks.pihak2_nama_perusahaan,
    rb.nama_blok,
    ru.nama_unit,
    rp.tgl_in,
	  rp.tgl_out,
    r.nama_rusun,
    ($4::date)periode_awal,
    ($5::date)periode_akhir
    from
    kontrak_sewa ks
    inner join registrasi_penghuni rp on ks.id_kontrak_sewa =rp.id_kontrak_sewa 
    inner join profil_penghuni pp on pp.id_profil_penghuni =rp.id_profil_penghuni 	
    inner join rusun_unit ru on ru.id_unit=rp.id_unit 
    inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai 
    left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok 
    left outer join kode_tipe_out kto on kto.kode_tipe_out=rp.tipe_out
    left outer join rusun r on r.kode_rusun = ks.kode_rusun
    where
    ks.kode_rusun=$1::text
    and ks.aktif and ks.approval and ks.kontrak_berlaku
    and 
    (
      coalesce($2::text,'')=''
      or ks.pihak2_npp = $2::text 
      or ks.pihak2_nama_perusahaan like '%' || $2::text || '%'
    )
    and 
    case
  	when $3::text = '1' then (rp.aktif and rp.aktif_menghuni and (rp.tgl_out is null and rp.tgl_in between $4::date and $5::date))
  	when $3::text = '0' then ((rp.tgl_out is not null and rp.tgl_out between $4::date and $5::date)
  	  and rp.tgl_in between $4::date and $5::date)
  	else (
      ((rp.tgl_out is null or 
        (rp.tgl_out is not null and rp.tgl_out between $4::date and $5::date)
      )
        and rp.tgl_in between $4::date and $5::date)
  	)
    end
    order by rb.nama_blok,ru.nama_unit`,
    params: [
      'p_rusun',
      { name: 'p_search', default: null },
      { name: 'p_aktif', default: null },
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  getRptMonitorPerjanjianSewa: {
    text: `
    select 
    ks.no_kontrak_sewa,
    ks.tgl_kontrak_sewa,
    ks.tgl_mulai_sewa,
    ks.tgl_berakhir_sewa,
    ks.pihak2_nama_lengkap,
    ks.pihak2_nama_perusahaan,
    ks.pihak2_kpj,
    ks.pihak2_nik,
    ks.jenis_registrasi,
    ru.nama_unit,
    rb.nama_blok,
    r.nama_rusun,
    ($3::date)periode_awal,
    ($4::date)periode_akhir
    from
    kontrak_sewa ks
    inner join kontrak_sewa_unit ku on ku.id_kontrak_sewa = ks.id_kontrak_sewa
    inner join rusun_unit ru on ru.id_unit = ku.id_unit
    inner join rusun_lantai rl on rl.id_lantai = ru.id_lantai
    inner join rusun_blok rb on rb.id_rusun_blok = rl.id_rusun_blok
    inner join rusun r on r.kode_rusun = ks.kode_rusun
    where ks.kode_rusun = $1::text
    and ks.aktif
    and ks.kontrak_berlaku
    and (coalesce($2::text,'')='' or ks.jenis_registrasi = $2::text)
    and ks.tgl_mulai_sewa between $3::date and $4::date
    order by ks.tgl_kontrak_sewa desc
      `,
    params: [
      'p_rusun',
      'p_jenis_penghuni',
      'p_tgl_awal',
      'p_tgl_akhir',

    ]
  },
  getRptWorkOrder: {
    text: `
    select 
		r.*,
		tgl_request, 
    deskripsi_wo,
    title_wo,
    no_wo,
    mw.kode_wo_tipe,
	  kwt.nama_wo_tipe,
    runit.id_unit,
    runit.nama_unit,
    blok.kode_blok,
    blok.nama_blok,
    r.lokasi, 
    assigned_petugas,
    mw.assigned_to petugas_wo,
    p2.nama_pengguna pemberi_tugas,
    completion_notes, 
    status
    from mtnc_wo mw
    inner join kode_wo_tipe kwt on kwt.kode_wo_tipe = mw.kode_wo_tipe
    left join rusun_unit runit on runit.id_unit = mw.id_unit
    left outer join pengguna p2 on mw.assigned_petugas = p2.kode_pengguna 
    left join rusun_lantai rl on rl.id_lantai = runit.id_lantai
    left join rusun_blok blok on blok.id_rusun_blok = rl.id_rusun_blok
    left outer join rusun r on r.kode_rusun = blok.kode_rusun
    where blok.kode_rusun = $1::text
    and (coalesce($2::int,0)=0 or rl.id_rusun_blok=$2::int)
    and (coalesce($3::text,'')='' or mw.kode_wo_tipe=$3::text)
    and tgl_request between $4::date and $5::date
    order by blok.nama_blok,runit.nama_unit asc
    `,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_kode_wo_tipe', default: null },
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  getRptWorkOrderAssign: {
    text: `select f_mw_surat_tugas($1::text)`,
    params: [
      'p_no_wo',
    ]
  },
  getRptMonitorKamarRusunawa: {
    text: `select r.nama_rusun,rb.kode_blok, rb.nama_blok,rl.id_lantai, rl.no_lantai, rl.nama_lantai,ru.id_unit, ru.nama_unit,
    (
      select json_agg(t) from(
        select 
        rp.kpj_nama,
        pp.nik,
        rp.penanggung_jawab,
        pp.kpj
        from
        registrasi_penghuni rp
        left join profil_penghuni pp
        on pp.id_profil_penghuni = rp.id_profil_penghuni
        where rp.id_unit = ru.id_unit
        and rp.aktif 
        and rp.aktif_menghuni 
        and tgl_out is null 
        order by 
          case when rp.penanggung_jawab then rp.kpj_nama end asc
      )t
    )penghuni,
    (
      select 
      count(rp.kpj_nama)
      from
      registrasi_penghuni rp
      left join profil_penghuni pp
      on pp.id_profil_penghuni = rp.id_profil_penghuni
      where rp.id_unit = ru.id_unit
      and rp.aktif 
      and rp.aktif_menghuni 
      and tgl_out is null 
    )jumlah_penghuni,
    case
      when ru.is_rented and ru.is_filled then 'BERPENGHUNI'
      when ru.is_rented and ru.is_processed then 'SEDANG PROSES SEWA'
      when ru.is_rented and not ru.is_filled and not ru.is_processed then 'BELUM TERSEWA'
      when not ru.is_rented and not ru.is_filled and not ru.is_processed then 'TIDAK DISEWAKAN'
      when not ru.is_rented and not ru.is_filled and not ru.is_processed and ru.is_maintenance then 'SEDANG MAINTENANCE'
    end as status_kamar,
    ru.is_rented,
    ru.is_filled,
    ru.is_processed,
    ru.is_maintenance
    from
    rusun r
    left join rusun_blok rb
    on rb.kode_rusun = r.kode_rusun
    left join rusun_lantai rl
    on rl.id_rusun_blok = rb.id_rusun_blok
    left join rusun_unit ru
    on ru.id_lantai = rl.id_lantai
    where  ru.kode_unit_jenis = 'K'
    and r.kode_rusun = $1::text
    and (coalesce($2::int,0)=0 or rl.id_rusun_blok=$2::int)
		and (coalesce($3::int,0)=0 or rl.id_lantai=$3::int)
    and (
      case
        when $4::int = '0' then (ru.is_rented and ru.is_filled and ru.is_processed and ru.is_maintenance) is not null
        when $4::int = '1' then (not ru.is_rented and not ru.is_filled and not ru.is_processed)
        when $4::int = '2' then (ru.is_rented and ru.is_filled)
        when $4::int = '3' then (ru.is_rented and ru.is_processed)
        when $4::int = '4' then (ru.is_rented and not ru.is_filled and not ru.is_processed)
        when $4::int = '5' then (not ru.is_rented and not ru.is_filled and not ru.is_processed and ru.is_maintenance)
      end
    )
    order by rb.kode_blok,rb.nama_blok,rl.no_lantai asc`,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_lantai', default: null },
      'p_status_kamar',
    ]
  },
  getRptPenghuniRusunStatusPerkawinan: {
    text: `select 
    ks.pihak2_nama_perusahaan,
    rp.kpj,
    rp.kpj_nama,
    rp.nik,
    rp.tgl_in,
    rp.tgl_out,
    stts_nikah.nama_status_nikah,
    ks.tgl_mulai_sewa,
    ks.tgl_berakhir_sewa,
    ksa.no_adendum,
    ru.nama_unit,
    rl.nama_lantai,
    rb.nama_blok,
    r.nama_rusun,
    ($2::date)periode_awal,
    ($3::date)periode_akhir
      from
        kontrak_sewa ks 
        inner join registrasi_penghuni rp on ks.id_kontrak_sewa =rp.id_kontrak_sewa 
        left outer join kontrak_sewa_adendum ksa on ksa.id_kontrak_sewa = ks.id_kontrak_sewa
        inner join profil_penghuni pp on pp.id_profil_penghuni =rp.id_profil_penghuni 
        left outer join kode_status_nikah stts_nikah on stts_nikah.kode_status_nikah=pp.kode_status_nikah
        inner join rusun_unit ru on ru.id_unit=rp.id_unit 
        inner join rusun_lantai rl on rl.id_lantai=ru.id_lantai 
        inner join rusun r on r.kode_rusun=ks.kode_rusun
        left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok 
        where 
        rp.aktif 
        and rp.aktif_menghuni 
        and ks.aktif 
        and ks.approval 
        and ks.kontrak_berlaku 
        and r.kode_rusun=$1::text
        and (
          (
            rp.tgl_out is null or 
            (rp.tgl_out is not null and rp.tgl_out between $2::date and $3::date)
          )
          and rp.tgl_in between $2::date and $3::date
        )
    order by rb.nama_blok, rl.nama_lantai, ru.nama_unit`,
    params: [
      'p_rusun',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  getNotifTagihan: {
    text: `select 
      (inv.periode_bln_sewa_akhir - current_date) as due_days,
      inv_klp.title_invoice,
      kontrak.pihak2_kpj, 
      kontrak.pihak2_nama_lengkap,
      inv.*,
      (
        select json_agg(t) from (
          select 
            runit.kode_blok,
            (select no_lantai from rusun_lantai where rusun_lantai.id_lantai = runit.id_lantai) no_lantai,
            runit.no_unit
          from
          rusun_unit runit
          left join kontrak_sewa_unit kontrak_unit on runit.id_unit = kontrak_unit.id_unit
          where kontrak_unit.id_kontrak_sewa = kontrak.id_kontrak_sewa
        )t
      )unit,
      (
        select json_agg(t) from (
          select * from invoice_entries inv
            inner join invoice_entries_invlstrk invlstrk on inv.ref_id_invoice_entries=invlstrk.id_invoice_entries and invlstrk.aktif
          where 
            --kode_invoice_entries='INVLSTRK' and invlstrk.id_unit = sewa_unit.id_unit
            kode_invoice_entries='INVLSTRK' and no_invoice=$1::text
        ) t
      ) invlstrk,
      (
        select json_agg(t) from (
          select * from invoice_entries inv
            inner join invoice_entries_invair invair on inv.ref_id_invoice_entries=invair.id_invoice_entries and invair.aktif
          where 
            kode_invoice_entries='INVAIR' and no_invoice=$1::text
        ) t
      ) invair
      from 
        invoice inv
        inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
        inner join kode_invoice_kelompok inv_klp on inv.kode_invoice_kelompok=inv_klp.kode_invoice_kelompok
      where
        not inv.flag_rekon
        and (inv.periode_bln_sewa_akhir - current_date) <=7
        and inv.no_invoice=$1::text`,
    params: [
      'p_no_invoice'
    ]
  },

  /* getMtrPembayaranSewaKmr: {
    text: `
    select 
    distinct on (nama_blok, nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksu.id_unit )
    inv.flag_rekon,
    inv.no_invoice,
    ks.no_kontrak_sewa,
    ks.pihak2_nama_lengkap,
    ks.pihak2_nama_perusahaan,
    ks.pihak2_kpj,
    ks.pihak2_nik,
    ks.no_kontrak_sewa,
    p.media_pembayaran,
    p.tgl_pembayaran,
    nama_unit, 
    nama_blok,
    nama_lantai,
    r.nama_rusun,
    ($3::date)periode_awal, 
    ($4::date)periode_akhir
    from
    kontrak_sewa ks
    inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa = ksu.id_kontrak_sewa 
    inner join invoice inv on ks.id_kontrak_sewa = inv.id_kontrak_sewa
    inner join rusun_unit ru on ksu.id_unit=ru.id_unit
    inner join rusun_lantai rl on ru.id_lantai = rl.id_lantai
    left outer join rusun_blok rb on rb.id_rusun_blok=rl.id_rusun_blok
    left outer join pembayaran p on p.id_kontrak_sewa=ks.id_kontrak_sewa
    inner join invoice_entries_invsewa iei on 
    iei.aktif and iei.id_kontrak_sewa =ks.id_kontrak_sewa and iei.id_unit =ksu.id_unit 
    inner join rusun r on r.kode_rusun = ks.kode_rusun
    where ks.aktif 
    and ks.approval 
    and ks.kode_rusun=$1::text
    and (
        coalesce($2::text,'')=''
        or
        (inv.flag_rekon = true or inv.flag_rekon = false) 
        and inv.flag_rekon = $2::boolean
        )
    and inv.tgl_invoice between $3::date and $4::date
    order by	nama_blok,nama_lantai, nama_unit,ks.id_kontrak_sewa ,ksu.id_unit desc`,
    params: [
      'p_rusun',
      'p_status_pembayaran',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  }, */


  getMtrPembayaranSewaKmr: {
    text: `
    select 
		distinct(i.tahun_bulan_tagihan),
    i.tgl_invoice,
		i.flag_rekon,
		i.no_invoice,
		ks.no_kontrak_sewa,
		ks.pihak2_nama_lengkap,
		ks.pihak2_nama_perusahaan,
		ks.pihak2_kpj,
		ks.pihak2_nik,
		ks.no_kontrak_sewa,
		p.media_pembayaran,
		p.tgl_pembayaran,
		nama_unit, 
		nama_blok,
		nama_lantai,
		r.nama_rusun,
    ($3::date)periode_awal, 
    ($4::date)periode_akhir
	from 
		kontrak_sewa ks
		inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa = ksu.id_kontrak_sewa
		inner join invoice i on i.id_kontrak_sewa = ks.id_kontrak_sewa
		left outer join pembayaran_invoices pi on i.no_invoice=pi.no_invoice and pi.aktif
		left outer join pembayaran p on pi.id_pembayaran=p.id_pembayaran
		left outer join invoice_entries ie on i.no_invoice = ie.no_invoice  
			and kode_invoice_entries = 'INVSEWA'
			and ie.id_invoice_entries is not null
		inner join invoice_entries_invsewa iei on ie.ref_id_invoice_entries = iei.id_invoice_entries_invsewa
		inner join rusun_unit ru on ru.id_unit = iei.id_unit
		inner join rusun_lantai rl on rl.id_lantai = ru.id_lantai
		inner join rusun_blok rb on rb.id_rusun_blok = rl.id_rusun_blok
		left join rusun r on r.kode_rusun=ks.kode_rusun
		where
		ks.approval
		and ks.aktif
		and i.aktif
	  and ks.kode_rusun=$1::text
	  and (
        coalesce($2::text,'')=''
        or
        (i.flag_rekon = true or i.flag_rekon = false) 
        and i.flag_rekon = $2::boolean
        )
    and i.tahun_bulan_tagihan between  to_char($3::date,'YYYY-MM') and  to_char($4::date,'YYYY-MM')
    order by p.tgl_pembayaran desc nulls first, i.tgl_invoice desc`,
    params: [
      'p_rusun',
      'p_status_pembayaran',
      'p_tgl_awal',
      'p_tgl_akhir'
    ]
  },
  getReportWL: {
    text: `select  
		    now() as tgl_report,
        nama_rusun, 
        reg.nik,
        reg.kpj_nama, 
        reg.kpj, 
        reg.kpj_telp,
        perusahaan_nama, 
        tgl_request_menghuni,
        jenis_registrasi,
        waiting_list_no waiting_no
    from registrasi reg
        inner join rusun rusun on reg.kode_rusun = rusun.kode_rusun
    where 
        reg.aktif and reg.waiting_list and not waiting_list_proses
        and reg.kode_rusun=$1::text
        
        order by waiting_list_no`,
    params: ['p_rusun']
  },
  getRptInvoicePrs: {
    text: `select 
    inv.*
    ,rusun.nama_rusun,rusun.lokasi,rusun.provinsi,rusun.kecamatan,rusun.fax,rusun.telpon
	  ,kantor.nama_kantor, kantor.alamat, kantor.keterangan
    ,kontrak.no_kontrak_sewa, kontrak.pihak2_kpj,pihak2_nama_lengkap,kontrak.pihak2_npp, kontrak.pihak2_nama_perusahaan, kontrak.jenis_registrasi
    ,(select title_invoice from kode_invoice_kelompok where kode_invoice_kelompok=inv.kode_invoice_kelompok) nama_tagihan
    , (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
          left outer join invoice_entries_invsewa invsewa on inv.ref_id_invoice_entries=invsewa.id_invoice_entries_invsewa and invsewa.aktif
        where 
          kode_invoice_entries='INVSEWA' and no_invoice=$1::text
      ) t
    ) invsewa,
    (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
        left outer join invoice_entries_invdpst invdpst on inv.ref_id_invoice_entries=invdpst.id_invoice_entries_invdpst and invdpst.aktif
        where 
          kode_invoice_entries='INVDPST' and no_invoice=$1::text
      ) t
    ) invdpst,
    (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
        left outer join invoice_entries_invlstrk invlstrk on inv.ref_id_invoice_entries=invlstrk.id_invoice_entries and invlstrk.aktif
        where 
          kode_invoice_entries='INVLSTRK' and no_invoice=$1::text
      ) t
    ) invlstrk,
    (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
        left outer join invoice_entries_invair invair on inv.ref_id_invoice_entries=invair.id_invoice_entries and invair.aktif
        where 
          kode_invoice_entries='INVAIR' and no_invoice=$1::text
      ) t
    ) invair,
    (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
          left outer join invoice_entries_invfas invfas on inv.ref_id_invoice_entries=invfas.id_invoice_entries and invfas.aktif
          left outer join fasilitas fas
		      on invfas.kode_fasilitas = fas.kode_fasilitas
        where 
          kode_invoice_entries='INVFAS' and no_invoice=$1::text
      ) t
    ) invfas,
    (
      select json_agg(t) from (
        select * 
        from invoice_entries inv
        left outer join invoice_entries_invdenda invdenda on inv.ref_id_invoice_entries=invdenda.id_invoice_entries and invdenda.aktif
        where 
          kode_invoice_entries='INVDENDA' and no_invoice=$1::text
      ) t
    ) invdenda,
    (
      select json_agg(t) from (
        select unit.id_unit, lantai.no_lantai, blok.kode_blok, unit.no_unit, unit.nama_unit, blok.nama_blok, lantai.no_lantai
        from kontrak_sewa_unit k_unit
          inner join rusun_unit unit on k_unit.id_unit=unit.id_unit
          inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
          left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
        where 
          id_kontrak_sewa=kontrak.id_kontrak_sewa
      ) t
    ) unit,
    (
      select json_agg(t) from (
        select  tarif.kode_golongan_listrik,rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0)
        from tarif_listrik tarif
          inner join rusun_unit unit on tarif.kode_golongan_listrik=unit.kode_golongan_listrik
        where tarif.aktif and kode_rusun=kontrak.kode_rusun
          and current_date between tarif.tgl_mulai and tarif.tgl_berakhir
          and unit.id_unit in (select id_unit from kontrak_sewa_unit kontrak_unit where id_kontrak_sewa=kontrak.id_kontrak_sewa )
        order by tarif.tgl_mulai desc
      ) t
    ) tarif_listrik_now,
    (
      select json_agg(t) from (
        select  rate_per_m3, wmm
        from tarif_air
        where aktif and kode_rusun=kontrak.kode_rusun 
          and current_date between tgl_mulai and tgl_berakhir
        order by tgl_mulai desc
        limit 1
      ) t
    ) tarif_air_now,
    (
      select json_agg(t) from (
        select inv.*, invdpst_detil.id_unit, invdpst_detil.pajak_prosen,invdpst_detil.pajak_nominal, invdpst_detil.nominal_akhir
          from invoice_entries inv
            inner join invoice_entries_invdpst invdpst on inv.ref_id_invoice_entries=invdpst.id_invoice_entries_invdpst and invdpst.aktif
            inner join invoice_entries_invdpst_detil invdpst_detil on invdpst.id_invoice_entries_invdpst = invdpst_detil.id_invoice_entries_invdpst
        where 
          kode_invoice_entries='INVDPST' and no_invoice=$1::text
        ) t 
    )dpst_detil
  from 
    invoice inv
    inner join kontrak_sewa kontrak on inv.id_kontrak_sewa=kontrak.id_kontrak_sewa
    inner join rusun on kontrak.kode_rusun = rusun.kode_rusun
	  inner join kode_kantor kantor on rusun.kode_kantor = kantor.kode_kantor and kantor.aktif
  where 
    no_invoice=$1::text`,
    params: [
      'p_no_invoice_prs'
    ]
  },
  getRptKontrakSewa: {
    text: `select 
				kontrak.*,
        f_kontrak_last_date_get(kontrak.id_kontrak_sewa) tgl_last_date,
        (select provinsi from rusun where kode_rusun = kontrak.kode_rusun)provinsi,(select kecamatan from rusun where kode_rusun = kontrak.kode_rusun)kecamatan,
				(select lokasi from rusun where kode_rusun = kontrak.kode_rusun)pihak1_alamat,
        (
					select json_agg(t) 
					from (
						select 
							kontrak_unit.id_unit, unit.no_unit, unit.nama_unit
							,blok.nama_blok, lantai.no_lantai,blok.kode_blok,
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
					select json_agg(t) from(
						select distinct 
							(sum(tarif))tarif
						from 
							kontrak_sewa_unit_tarif tarif
						inner join rusun_unit unit
						on tarif.id_unit = unit.id_unit
						inner join rusun_lantai lantai
						on unit.id_lantai = lantai.id_lantai
            where tarif.id_kontrak_sewa = kontrak.id_kontrak_sewa
            and tarif.id_adendum is null
					)t
				)tarif_unit,
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
							fas.nama_fasilitas,
							f_kontrak_last_date_get(fas_unit.id_kontrak_sewa) kontrak_sewa_tgl_berakhir_sewa
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
					select json_agg(t) from(
						with data_penempatan_kontrak_items as(
              select 		
                kode_aset, id_unit, use_in_entri, biaya_kerusakan,biaya_kehilangan,tgl_penempatan_in,
                tgl_mulai_sewa , tgl_berakhir_sewa, kontrak_berakhir , kontrak_berakhir_tgl
              from 
                kontrak_sewa ks
                inner join kontrak_sewa_inventaris_items ksii on (
                  ksii.aktif and ks.id_kontrak_sewa = ksii.id_kontrak_sewa  
                  and (
                    (not kontrak_berakhir and tgl_penempatan_in<=tgl_berakhir_sewa)
                    or 
                    (kontrak_berakhir and tgl_penempatan_in<=kontrak_berakhir_tgl)
                  )
                )
              where ks.id_kontrak_sewa = $1::bigint
            )
            select 
              nama_aset, 
              (count(aset.nama_aset))qty, 
              ks.nama_satuan,
              avg(penempatan_in.biaya_kehilangan ) biaya_kehilangan,
              avg(penempatan_in.biaya_kerusakan ) biaya_kerusakan
            from (
                select distinct on (kode_aset,id_unit)
                  *
                from 
                  data_penempatan_kontrak_items
                order by kode_aset,id_unit,tgl_penempatan_in
              ) penempatan_in
              left outer join aset on penempatan_in.kode_aset=aset.kode_aset
              left join kode_satuan ks on ks.kode_satuan = aset.kode_satuan
            group by 
              aset.nama_aset,ks.nama_satuan
            order by aset.nama_aset
					)t
				)lampiran
			from 
				kontrak_sewa kontrak 
			where 
				kontrak.id_kontrak_sewa=$1::bigint`,
    params: ['p_kontrak']
  },
  getRptKontrakAdendum: {
    text: `select 
				kontrak.id_kontrak_sewa, adendum.id_adendum, no_adendum, no_kontrak_sewa, kontrak.no_registrasi, 
				kontrak.kode_rusun, kontrak.jenis_registrasi, kontrak.tgl_kontrak_sewa, kontrak.pihak1_nama_lengkap, 
				kontrak.pihak1_jabatan, kontrak.pihak2_kpj, kontrak.pihak2_nama_lengkap,kontrak.pihak2_jabatan, kontrak.pihak2_npp, 
				kontrak.pihak2_nama_perusahaan, kontrak.pihak2_alamat, kontrak.pihak2_telpon, kontrak.sewa_satu_unit, 
				kontrak.jmlh_unit, adendum.jmlh_bulan_adendum jmlh_bulan_sewa, adendum.tgl_mulai_sewa, 
				adendum.tgl_berakhir_sewa, kontrak.jmlh_bulan_deposit, 
				kontrak.inv_periode_bulan, kontrak.inv_duedate, kontrak.inv_duedate_bayar, kontrak.inv_duedate_utilitas, 
				kontrak.inv_duedate_utilitas_bayar, adendum.biaya_administrasi, adendum.biaya_administrasi_by_prosen, 
				kontrak.biaya_denda, kontrak.biaya_denda_by_prosen,kontrak. golongan_invoice, 
				adendum.pihak1_ttd_title, adendum.pihak1_ttd_nama, 
				adendum.pihak1_ttd_jabatan, adendum.pihak2_ttd_title, adendum.pihak2_ttd_nama, adendum.pihak2_ttd_jabatan, adendum.status, 
				adendum.approval, adendum.approval_tgl, adendum.approval_petugas, adendum.approval_alasan, adendum.signed, adendum.signed_date,adendum.adendum_berlaku kontrak_berlaku, 
				adendum.aktif, adendum.alasan_na, adendum.tgl_na, adendum.tgl_rekam, 
				adendum.petugas_rekam, adendum.tgl_ubah, adendum.petugas_ubah,
        f_kontrak_last_date_get(kontrak.id_kontrak_sewa) tgl_last_date,
				(select provinsi from rusun where kode_rusun = kontrak.kode_rusun)provinsi,(select kecamatan from rusun where kode_rusun = kontrak.kode_rusun)kecamatan,
				(select lokasi from rusun where kode_rusun = kontrak.kode_rusun)pihak1_alamat,
        (
					select json_agg(t) 
					from (
						select 
							kontrak_unit.id_unit, unit.no_unit, unit.nama_unit
							,blok.nama_blok, lantai.no_lantai,blok.kode_blok,
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
					select json_agg(t) from(
						select distinct 
							lantai.nama_lantai, 
							tarif
						from
							kontrak_sewa_unit_tarif tarif
							inner join rusun_unit unit
							on tarif.id_unit = unit.id_unit
							inner join rusun_lantai lantai
							on unit.id_lantai = lantai.id_lantai
							where id_adendum = adendum.id_adendum
							order by lantai.nama_lantai
						
					)t
				)tarif_unit,
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
							fas.nama_fasilitas,
							f_kontrak_last_date_get(fas_unit.id_kontrak_sewa) kontrak_sewa_tgl_berakhir_sewa
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
					select json_agg(t) from(
						with data_penempatan_kontrak_items as(
              select 		
                kode_aset, id_unit, use_in_entri, biaya_kerusakan,biaya_kehilangan,tgl_penempatan_in,
                ks.tgl_mulai_sewa , ksd.tgl_berakhir_sewa, kontrak_berakhir , kontrak_berakhir_tgl
              from 
                kontrak_sewa ks
                inner join kontrak_sewa_adendum ksd on ks.id_kontrak_sewa =ksd.id_kontrak_sewa 
                inner join kontrak_sewa_inventaris_items ksii on (
                  ksii.aktif and ks.id_kontrak_sewa = ksii.id_kontrak_sewa  
                  and (
                    (not kontrak_berakhir and tgl_penempatan_in<=ksd.tgl_berakhir_sewa)
                    or 
                    (kontrak_berakhir and tgl_penempatan_in<=kontrak_berakhir_tgl and tgl_penempatan_in<=ksd.tgl_berakhir_sewa)
                  )
                )
              where ksd.id_adendum = $1::bigint
            )
            select 
              nama_aset, 
              (count(aset.nama_aset))qty, 
              ks.nama_satuan,
              avg(penempatan_in.biaya_kehilangan ) biaya_kehilangan,
              avg(penempatan_in.biaya_kerusakan ) biaya_kerusakan
            from (
                select distinct on (kode_aset,id_unit)
                  *
                from 
                  data_penempatan_kontrak_items
                order by kode_aset,id_unit,tgl_penempatan_in
              ) penempatan_in
              left outer join aset on penempatan_in.kode_aset=aset.kode_aset
              left join kode_satuan ks on ks.kode_satuan = aset.kode_satuan
            group by 
              aset.nama_aset,ks.nama_satuan
            order by aset.nama_aset
					)t
				)lampiran
			from 
				kontrak_sewa kontrak 
				inner join kontrak_sewa_adendum adendum on kontrak.id_kontrak_sewa=adendum.id_kontrak_sewa
			where 
				adendum.id_adendum=$1::bigint`,
    params: ['p_adendum']
  },
  getRptAvailabilityStatusUnitPerLantai: {
    text: `with data_okupansi as(
      select 
      nama_rusun,nama_blok,nama_lantai
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
      lantai.id_lantai,nama_rusun,nama_blok,nama_lantai, unit.id_unit
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
      left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
      left outer join rusun on rusun.kode_rusun = blok.kode_rusun
      left outer join rusun_unit unit on lantai.id_lantai=unit.id_lantai and unit.aktif and unit.is_rented
      left outer join registrasi_penghuni penghuni on (
      penghuni.id_unit=unit.id_unit and penghuni.aktif_menghuni
      and (
          (tgl_out is null and  EXTRACT(YEAR FROM tgl_in)<=$2::int)
          or 
          (tgl_out is not null and  EXTRACT(YEAR FROM tgl_in)<=$2::int  and  EXTRACT(YEAR FROM tgl_out)>=$2::int)
      )
      )	
      where 
          lantai.kode_rusun=$1::text
          and lantai.aktif
          and (coalesce($3::int,0)=0 or lantai.id_rusun_blok=$3::int)
      group by lantai.id_lantai,nama_rusun,nama_blok,nama_lantai ,unit.id_unit
      ) a
      group by nama_rusun,nama_blok ,nama_lantai
  )
  select 1 as urutan,'OKUPANSI' nama_urutan,($2::text)periode,nama_rusun,nama_blok,nama_lantai,jan,feb,mar,apr,mei,jun,jul,aug,sep,okt,nov,des,kapasitas 
  from  data_okupansi
  union all
  select 2 as urutan,'TOTAL' nama_urutan,($2::text)periode ,nama_rusun,nama_blok, null nama_lantai,sum(jan),sum(feb),sum(mar),sum(apr),sum(mei),sum(jun),sum(jul),sum(aug),sum(sep),sum(okt),sum(nov),sum(des),sum(kapasitas)
  from  data_okupansi
  group by nama_rusun, nama_blok
  union all
  select 3 as urutan,'PERSENTASE' nama_urutan,($2::text)periode,nama_rusun,nama_blok,null nama_lantai,
    case when sum(kapasitas)=0 then 0 else sum(jan)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(feb)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(mar)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(apr)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(mei)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(jun)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(jul)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(aug)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(sep)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(okt)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(nov)/sum(kapasitas)*100 end, 	
    case when sum(kapasitas)=0 then 0 else sum(des)/sum(kapasitas)*100 end, 
    case when sum(kapasitas)=0 then 0 else sum(kapasitas)/sum(kapasitas)*100 end 
  from  data_okupansi
  group by nama_rusun, nama_blok
  order by nama_blok asc nulls last,nama_lantai, urutan
  `,

    params: [
      'p_rusun',
      'p_periode_tahun',
      { name: 'p_id_blok', default: null },
    ]
  },
  getRptTingkatHunian: {
    text: `with data_unit_disewa as (
      select 
        nama_rusun,nama_blok,nama_lantai, unit.id_unit, case when unit_terisi.id_unit is null then 0::int else 1::int end dihuni
      from 
        rusun_lantai lantai
        inner join rusun_unit unit on lantai.id_lantai=unit.id_lantai and unit.aktif and unit.is_rented
        inner join rusun on rusun.kode_rusun = lantai.kode_rusun
        left outer join rusun_blok blok on blok.id_rusun_blok=lantai.id_rusun_blok
        left outer join (
          select distinct id_unit
          from 
            kontrak_sewa ks 
            inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa = ksu.id_kontrak_sewa 
          where 
            ks.aktif and ks.kontrak_berlaku and kode_rusun=$1::text
            and tgl_mulai_sewa <=$2::date and
            date_trunc('month',$2::date) <= case 
                        when kontrak_berakhir then kontrak_berakhir_tgl 
                        when tgl_berakhir_adendum is not null then tgl_berakhir_adendum 
                        else tgl_berakhir_sewa 
                        end
        ) unit_terisi on unit.id_unit = unit_terisi.id_unit
      where lantai.kode_rusun = $1::text
    )
    select 
       $2::date as tgl_report,
       nama_rusun, nama_blok,
       count(distinct id_unit) kapasitas_kamar,
       sum(dihuni) dihuni,
       sum(case when orang>4 then 4 else orang end) orang,
       sum(masuk) masuk,
       sum(keluar) keluar,
       sum(dihuni)::float /count(distinct id_unit)::float as persentase
    from (
      select 
        dud.nama_rusun, dud.nama_blok, dud.id_unit, dud.dihuni,
        sum(case when penghuni.id_registrasi_penghuni is null or dihuni=0 then 0 else 1 end) orang,
        sum(case when tgl_in>=date_trunc('month',$2::date) then 1 else 0 end) masuk,
        sum(case when tgl_out<=$2::date then 1 else 0 end) keluar
      from 
        data_unit_disewa dud
        left outer join registrasi_penghuni penghuni on (
          penghuni.id_unit=dud.id_unit and penghuni.aktif_menghuni and penghuni.aktif
          and tgl_in<=$2::date
          and (
            tgl_out is null
                or 
                (tgl_out is not null  and  tgl_out>=date_trunc('month',$2::date))
          )
        )
      group by dud.nama_rusun, dud.nama_blok, dud.id_unit, dud.dihuni
     ) t
     group by nama_rusun, nama_blok`,
    params: [
      'p_rusun',
      'p_periode_tahun',
    ]
  },
  getReportSuratTugas: {
    text: `select f_mw_surat_tugas($1::text)`,
    params: [
      'p_no_wo',
    ]
  },
  getRptBillingEntriTagihan: {
    text: `
    with data_unit as (
      select nama_rusun, ru.id_unit , rb.nama_blok , rl.nama_lantai , ru.nama_unit ,  ru.is_rented 
      from 
        rusun_unit ru
        inner join rusun_lantai rl on ru.id_lantai =rl.id_lantai 
        left outer join rusun_blok rb on rl.id_rusun_blok =rb.id_rusun_blok 
        inner join rusun on rusun.kode_rusun = rl.kode_rusun
      where ru.aktif and rl.kode_rusun = $1::text
      )
      select 
        ($2::text) as bulan_report,
        u.*,
        coalesce(ied.nominal_akhir,0) nominal_deposit,
        coalesce(ies.nominal_akhir,0) nominal_sewa,
        coalesce(iel.nominal_total,0) nominal_listrik,
        coalesce(iea.nominal_total,0) nominal_air,
        coalesce(ief.nominal_total,0) nominal_fasilitas,
        coalesce(iedenda.nominal_denda,0) nominal_denda,
        coalesce(ieq.nominal_penggantian,0) nominal_penggantian_brg
      from 
        data_unit u
        left outer join(
          select id_unit, ieid.nominal_akhir 
          from 
            invoice_entries_invdpst iedpst
            inner join invoice_entries_invdpst_detil ieid on iedpst.id_invoice_entries_invdpst =ieid.id_invoice_entries_invdpst 
          where 
            iedpst.aktif and ieid.aktif
            and tahun_bulan_tagihan=$2::text
        ) ied on u.id_unit=ied.id_unit
        left outer join invoice_entries_invsewa ies on ies.aktif and u.id_unit=ies.id_unit and ies.tahun_bulan_tagihan =$2::text
        left outer join invoice_entries_invlstrk iel on iel.aktif and u.id_unit=iel.id_unit and iel.tahun_bulan_tagihan =$2::text
        left outer join invoice_entries_invair iea on iea.aktif and u.id_unit=iea.id_unit and iea.tahun_bulan_tagihan =$2::text
        left outer join (
          select id_unit , sum(nominal_total) nominal_total
          from invoice_entries_invfas 
          where aktif and tahun_bulan_tagihan =$2::text
          group by id_unit
        ) ief on ief.id_unit=u.id_unit
        left outer join invoice_entries_invdenda iedenda on iedenda.aktif and u.id_unit=iedenda.id_unit_kena_denda and iedenda.tahun_bulan_tagihan =$2::text
        left outer join (
          select id_unit , sum(nominal_penggantian) nominal_penggantian
          from invoice_entries_inveq
          where aktif and tahun_bulan_tagihan =$2::text
          group by id_unit
        ) ieq on ieq.id_unit=u.id_unit
      order by nama_blok nulls last, nama_lantai , nama_unit`,
    params: [
      'p_rusun',
      'p_periode_tahun',
    ]
  }
}
