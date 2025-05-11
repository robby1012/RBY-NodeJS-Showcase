module.exports = {
  getRusunByKantor: {
    text: `select * from rusun
			where kode_kantor in(
				WITH RECURSIVE cte AS (
					SELECT kode_kantor, nama_kantor, 1 AS level
					FROM   kode_kantor
					WHERE  kode_kantor = $1
			
					UNION  ALL
					SELECT t.kode_kantor, t.nama_kantor, c.level + 1
					FROM   cte      c
					JOIN   kode_kantor t ON t.kode_kantor_induk = c.kode_kantor
					)
				SELECT kode_kantor
				FROM   cte
				) and aktif`,
    params: [
      {
        name: 'p_kantor',
        default: 'ALL'
      }
    ]
  },
  getRusunByUser: {
    text: `select f_rusun_get_bypengguna($1::text) as ret`,
    params: [
      {
        name: 'p_pengguna'
      }
    ]
  },
  getRusunBlok: {
    text: `select * from kode_blok
			where kode_blok not in(
				select kode_blok from rusun_blok_exclude 
				where kode_rusun=$1 and aktif
			)`,
    params: [
      {
        name: 'p_rusun'
      }
    ]
  },
  getRusunLantai: {
    text: `select *
		  from rusun_lantai 
			where kode_rusun=$1 and
			(
				$2='ALL' or (
					id_lantai in (select id_lantai from rusun_unit where kode_rusun=$1 and kode_blok=$2)
				)
			) and aktif`,
    params: [
      {
        name: 'p_rusun'
      },
      {
        name: 'p_blok',
        default: 'ALL'
      }
    ]
  },
  getRusunUnitsByLantai: {
    text: `select unit.* ,lantai.no_lantai, lantai.nama_lantai, blok.nama_blok,
			(select nama_rusun from rusun where kode_rusun=(select kode_rusun from rusun_lantai where id_lantai=lantai.id_lantai)) nama_rusun,
			f_tarif_unit_get_numeric(unit.id_unit) as tarif
			from 
				rusun_unit unit
				inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
				left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			where unit.id_lantai=$1  and
			(
				$2='ALL' or kode_unit_jenis=$2
			) and unit.aktif`,
    params: [
      {
        name: 'p_lantai'
      },
      {
        name: 'p_jenis',
        default: 'ALL'
      }
    ]
  },
  getRusunUnitStatusByUnit: {
    text: `select unit.id_unit,unit.is_rented, is_filled,is_processed,is_maintenance,
				case 
					when not kontrak_berakhir or (kontrak_berakhir and kontrak_berakhir_tgl<=current_date)then true
					else false
				end kontrak_berlaku,
				kontrak_unit.hunian_keluarga
			from 
				rusun_unit unit
				left outer join kontrak_sewa_unit kontrak_unit on  unit.id_unit=kontrak_unit.id_unit
				left outer join kontrak_sewa kontrak  on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa 
						and kontrak.aktif and kontrak_berlaku and approval
			where unit.id_unit=$1::int`,
    params: ['p_id']
  }
}
