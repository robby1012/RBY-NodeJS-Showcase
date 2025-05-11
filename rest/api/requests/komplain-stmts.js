module.exports = {
  getKomplain: {
    text: `select 
				( (row_number() over()) + coalesce($11::bigint,10) * (coalesce($10::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				rusun.nama_rusun, lantai.nama_lantai, blok.nama_blok, unit.id_lantai, blok.kode_blok, unit.nama_unit, lantai.no_lantai,lantai.id_rusun_blok,
				kategori.nama_kategori_komplain,
				komplain.* ,
				no_wo, no_wo_induk,  tgl_request, nama_requester, jenis_lokasi, deskripsi_wo, kode_wo_tipe, 
				req_completion_date, ref_id, mtnc_wo.status status_wo, assigned_to, assigned_work_start_date, assigned_completion_target_date, 
				assigned_prioritas, assigned_notes, completion_actual_date, completion_status,
				title_wo, completion_notes, assigned
			from 
				komplain
				inner join kode_kategori_komplain kategori on kategori.kode_kategori_komplain=komplain.kode_kategori_komplain
				inner join rusun on komplain.kode_rusun=rusun.kode_rusun
				left outer join rusun_unit unit on unit.id_unit=komplain.id_unit
				left outer join rusun_lantai lantai on lantai.id_lantai=komplain.id_lantai
				left outer join rusun_blok blok on blok.id_rusun_blok=komplain.id_rusun_blok
				left outer join mtnc_wo on penyelesaian_status='WO' and  mtnc_wo.ref_id=komplain.no_komplain 
			where 
				komplain.kode_rusun=$1::text
				and (coalesce($2::int,0)=0 or komplain.id_rusun_blok=$2::int)
				and (coalesce($3::int,0)=0 or komplain.id_lantai=$3::int)
				and (coalesce($4::int,0)=0 or komplain.id_unit=$4::int)
				and (
					$5::text='' 
					or nama_pelapor ilike '%'|| $5::text || '%'
					or title_komplain ilike '%'|| $5::text || '%'
					or komplain.no_komplain ilike '%'|| $5::text || '%'
				)
				and (coalesce($6::text,'')='' or komplain.no_komplain=$6::text)
				and (coalesce($7::text,'')='' or komplain.status=$7::text)
				and (coalesce($8::text,'')='' or komplain.penyelesaian_status=$8::text)
				and ($9::boolean is null or komplain.aktif=$9::boolean)
			order by 
				case when $12::text='no_komplain' and not coalesce($13::boolean,false) then komplain.no_komplain end asc, 
				case when $12::text='no_komplain' and coalesce($13::boolean,false) then komplain.no_komplain end desc,
				case when $12::text='blok_unit' and not coalesce($13::boolean,false) then blok.nama_blok end asc, 
				case when $12::text='blok_unit' and coalesce($13::boolean,false) then blok.nama_blok end desc,
				case when $12::text='blok_unit' then unit.nama_unit end asc, 
				case when $12::text='nama' and not coalesce($13::boolean,false) then komplain.nama_pelapor end asc, 
				case when $12::text='nama' and coalesce($13::boolean,false) then komplain.nama_pelapor end desc,
				case when $12::text='kategori' and not coalesce($13::boolean,false) then kategori.nama_kategori_komplain end asc, 
				case when $12::text='kategori' and coalesce($13::boolean,false) then kategori.nama_kategori_komplain end desc,
				case when $12::text='title_komplain' and not coalesce($13::boolean,false) then komplain.title_komplain end asc, 
				case when $12::text='title_komplain' and coalesce($13::boolean,false) then komplain.title_komplain end desc,
				case when $12::text='tgl_komplain' and not coalesce($13::boolean,false) then komplain.tgl_komplain end asc, 
				case when $12::text='tgl_komplain' and coalesce($13::boolean,false) then komplain.tgl_komplain end desc,
				case when $12::text='status' and not coalesce($13::boolean,false) then komplain.status end asc, 
				case when $12::text='status' and coalesce($13::boolean,false) then komplain.status end desc,
				case when $12::text='tgl_closed' and not coalesce($13::boolean,false) then komplain.penyelesaian_tgl end asc, 
				case when $12::text='tgl_closed' and coalesce($13::boolean,false) then komplain.penyelesaian_tgl end desc,
				case when $12::text='status_penyelesaian' and not coalesce($13::boolean,false) then komplain.penyelesaian_status end asc, 
				case when $12::text='status_penyelesaian' and coalesce($13::boolean,false) then komplain.penyelesaian_status end desc,
				komplain.tgl_ubah desc, komplain.tgl_rekam desc
			limit 
				case when coalesce($11::bigint,0)::bigint>0   then $11::bigint end 
			offset 
				case 
					when coalesce($11::bigint,0)::bigint>0 then  $11::bigint * (coalesce($10::int,1)-1)
				end`,
    params: [
      'p_rusun',
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: 0 },
      { name: 'p_id_unit', default: 0 },
      { name: 'p_search', default: '' },
      { name: 'p_no', default: '' },
      { name: 'p_status', default: '' },
      { name: 'p_penyelesaian_status', default: '' },
      { name: 'p_aktif', default: null },
      { name: 'page', default: 1 }, // 10
      { name: 'itemsPerPage', default: null },
      { name: 'sortBy', default: null },
      { name: 'sortDesc', default: null }
    ]
  },
  postKomplain: {
    text: `select f_komplain_submit($1::text, $2::text, $3::int, $4::text, $5::text,  $6::text, $7::text) as ret`,
    params: [
      'p_pengguna',
      'p_rusun',
      'p_unit',
      'p_pelapor',
      'p_kategori',
      'p_title',
      { name: 'p_deskripsi', default: null }
    ]
  },
  putKomplainPenyelesaian: {
    text: `select f_komplain_penyelesaian_submit($1::text, $2::text, $3::text, $4::date, $5::text) as ret`,
    params: ['p_pengguna', 'p_komplain', 'p_status', 'p_tgl', 'p_penyelesaian']
  },
  delKomplain: {
    text: `select f_komplain_cancel($1::text, $2::text, $3::text) as ret`,
    params: ['p_pengguna', 'p_komplain', { name: 'p_alasan', default: null }]
  },
  putKomplainForwardWo: {
    text: `select f_komplain_forward_wo_submit($1::text, $2::text, $3::date, $4::text,  $5::int,  $6::int,$7::int,$8::text,$9::text) as ret`,
    params: [
      'p_pengguna',
      'p_no_komplain',
      'p_req_date',
      'p_tipe',
      { name: 'p_id_blok', default: null },
      { name: 'p_id_lantai', default: null },
      { name: 'p_id_unit', default: null },
      { name: 'p_lokasi', default: null },
      { name: 'p_deskripsi_wo', default: null }
    ]
  }
}
