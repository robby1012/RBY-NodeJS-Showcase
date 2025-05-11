module.exports = {
  getRptKodeUnit: {
    text: `select *
		from 
			rusun_unit unit 
			inner join rusun_lantai lantai on lantai.id_lantai=unit.id_lantai
			left outer join kode_blok blok on unit.kode_blok=blok.kode_blok
		where  unit.aktif
			and lantai.kode_rusun=$1::text
			and ($2::int=0 or lantai.id_lantai=$2::int)
			and ($3::text='' or blok.kode_blok=$3::text)
    order by unit.id_lantai,unit.id_unit`,
    params: ['p_rusun',
      {name: 'p_lantai', default: ''},
      {name: 'p_blok', default: ''}
    ]
  }
}
