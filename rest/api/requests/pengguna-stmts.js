module.exports = {
  getInfoPengguna: `select f_pengguna_get_info($1::text) as ret`,
  getRolePengguna: `select kode_role,jenis_kantor	from pengguna_role where aktif where kode_pengguna=$1`,
  // getListPengguna: `select kode_pengguna, nama_pengguna,kode_kantor,departemen,nama_atasan,email,
  // 		last_login,last_change_pass,aktif,tgl_na,petugas_na,locked,tgl_locked,tgl_rekam,petugas_rekam,
  // 		tgl_ubah,petugas_ubah
  // 		, f02_pengguna_get_role_21line(a.kode_pengguna) roles
  // 		from pengguna a`,
  getPengguna: {
    text: `select kode_pengguna, nama_pengguna,kode_kantor,departemen,nama_atasan,email,
			last_login,last_change_pass,aktif,tgl_na,petugas_na,locked,tgl_locked,tgl_rekam,petugas_rekam,
			tgl_ubah,petugas_ubah
			, f02_pengguna_get_role_21line(a.kode_pengguna) roles
			from pengguna a
			where a.kode_pengguna=$1`,
    params: ['p_pengguna']
  }
}
