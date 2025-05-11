/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
  getContohPagingUnit: {
    text: `select  
				( (row_number() over()) + coalesce($8::bigint,10) * (coalesce($7::int,1)-1) )::int nomor_baris, 
				(count(*) OVER())::int AS full_count_baris,
				lantai.nama_lantai,
				jenis.nama_unit_jenis,
				blok.nama_blok,
				unit.*
			from 
				rusun_unit unit
				inner join rusun_lantai lantai on lantai.id_lantai=unit.id_lantai
				inner join kode_unit_jenis jenis on jenis.kode_unit_jenis=unit.kode_unit_jenis
				left outer join kode_blok blok on blok.kode_blok=unit.kode_blok
			where
				lantai.kode_rusun=$1::text
				and ($2::int=0 or unit.id_lantai=$2::int)
				and ($3::text='' or unit.kode_unit_jenis=$3::text)
				and ($4::text='' or unit.kode_blok=$4::text)
				and ($5::int=0 or unit.id_unit=$5::int)
				and ($6::boolean is null or unit.aktif=$6::boolean)
			order by 
				case when $9::text='namaLantai' and not coalesce($10::boolean,false) then lantai.nama_lantai end asc, 
				case when $9::text='namaLantai' and coalesce($10::boolean,false) then lantai.nama_lantai end desc,
				case when $9::text='namaUnit' and not coalesce($10::boolean,false) then unit.nama_unit end asc, 
				case when $9::text='namaUnit' and coalesce($10::boolean,false) then unit.nama_unit end desc,
				case when $9::text='isRented' and not coalesce($10::boolean,false) then unit.is_rented end asc, 
				case when $9::text='isRented' and coalesce($10::boolean,false) then unit.is_rented end desc,
				case when $9::text='status' and not coalesce($10::boolean,false) then unit.aktif end asc, 
				case when $9::text='status' and coalesce($10::boolean,false) then unit.aktif end desc
			limit 
				case when $8::bigint is not null  then $8::bigint end 
			offset 
				case 
					when $8::bigint is  not null then  $8::bigint * (coalesce($7::int,1)-1)
				end`,
    params: [
      'p_rusun',
      {name: 'p_lantai', default: 0},
      {name: 'p_jenis', default: ''},
      {name: 'p_blok', default: ''},
      {name: 'p_id', default: 0},
      {name: 'p_aktif', default: null},
      {name: 'page', default: 1},
      {name: 'itemsPerPage', default: null},
      {name: 'sortBy', default: null},
      {name: 'sortDesc', default: null}
    ]
  }
}
