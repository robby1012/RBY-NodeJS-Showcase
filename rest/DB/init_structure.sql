CREATE FUNCTION f_air_log_cancel(p_kode_pengguna character varying, p_id_meter_log bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_air_meter_log bigint;
	v_id_unit int;
	v_use_in_billing boolean:=false;
BEGIN
	raise notice 'cek if exists log on id meter log';
	select id_air_meter_log,use_in_billing,id_unit
	into v_id_air_meter_log,v_use_in_billing,v_id_unit
	from air_meter_log
	where id_air_meter_log=p_id_meter_log and aktif;
	
	if v_id_air_meter_log is null then
		return '{"ret":-1,"msg":"Tidak ada id pencatatan"}'::json ;
	elsif v_use_in_billing then
		return '{"ret":-2,"msg":"Sudah digunakan pada entri billing, cancel dulu entrinya"}'::json ;
	else
		select id_air_meter_log
		into v_id_air_meter_log
		from air_meter_log
		where id_unit=v_id_unit and aktif
		order by tgl_end_meter desc
		limit 1;
		
		if v_id_air_meter_log<>p_id_meter_log then
			return '{"ret":-3,"msg":"Bukan entri terakhir, tidak bisa di cancel"}'::json ;
		else
			update air_meter_log
			set
				aktif=false,
				tgl_na=now(),
				petugas_na=p_kode_pengguna
			where id_air_meter_log=p_id_meter_log ;
			-- update pencatatan terakhir
			
			select id_air_meter_log
			into v_id_air_meter_log
			from air_meter_log
			where id_unit=v_id_unit and aktif
			order by tgl_end_meter desc
			limit 1;
			if v_id_air_meter_log is not null then
				update air_meter_log
				set
					pencatatan_terakhir=true
				where id_air_meter_log=v_id_air_meter_log ;
			end if;
			return ('{"ret":0,"Action":"Deleted"}')::json;
		end if;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 397 (class 1255 OID 37785)
-- Name: f_air_log_submit(character varying, character varying, integer, date, date, integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_air_log_submit(p_kode_pengguna character varying, p_petugas_pencatat character varying, p_id_air_meter_log integer, p_tgl_start_meter date, p_tgl_end_meter date, p_meter_start integer, p_meter_end integer, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_air_meter_log bigint;
	v_tgl_pencatatan date;
	v_use_in_billing boolean:=false;
	v_id_unit int;
	
	v_id_air_meter_log1 bigint;
	v_tgl_start_meter1 date;
	v_tgl_end_meter1 date;
BEGIN	
	
	raise notice 'cek if exists log on tgl_pencatatan';
	select id_air_meter_log ,use_in_billing,id_unit
	into v_id_air_meter_log,v_use_in_billing,v_id_unit
	from air_meter_log 
	where aktif and id_air_meter_log=p_id_air_meter_log;
	
	if v_id_air_meter_log is  null then
		return '{"ret":-1,"msg":"Pencatatan tidak ditemukan"}'::json ;
	elsif v_use_in_billing then
		return '{"ret":-1,"msg":"Sudah menjadi Billing tidak bisa di edit"}'::json ;
	else
		raise notice 'get data pencatatan terakhir';
		select id_air_meter_log, tgl_start_meter,tgl_end_meter,use_in_billing
		into v_id_air_meter_log1, v_tgl_start_meter1,v_tgl_end_meter1,v_use_in_billing
		from air_meter_log 
		where aktif and id_unit=v_id_unit and pencatatan_terakhir;
		if p_id_air_meter_log<>v_id_air_meter_log1 then
			return '{"ret":-1,"msg":"Bukan pencatatan terakhir, tidak bisa di edit"}'::json ;
		elsif  p_tgl_start_meter<coalesce(v_tgl_start_meter1,p_tgl_start_meter) then
			return '{"ret":-1,"msg":"Pencatatan pada tgl start meter < tgl start meter pencatatan terakhir, hapus dulu pencatatan terakhir"}'::json ;
		elsif v_use_in_billing and p_tgl_start_meter>= v_tgl_start_meter1 and p_tgl_start_meter<v_tgl_end_meter1 then
			return '{"ret":-1,"msg":"Pencatatan pada tgl meter sudah ada  dan sudah di gunakan pada entri billing"}'::json ;
		elsif v_use_in_billing and p_tgl_end_meter<=v_tgl_end_meter1 then
			return '{"ret":-1,"msg":"Pencatatan pada tgl meter sudah ada  dan sudah di gunakan pada entri billing"}'::json ;
		elsif p_tgl_start_meter>= v_tgl_start_meter1 and p_tgl_start_meter<v_tgl_end_meter1 and v_id_air_meter_log1<>v_id_air_meter_log then
			return '{"ret":-1,"msg":"Sudah ada pencatatan pada tgl start meter dengan tgl pencatatan berbeda, hapus dulu pencatatan sebelumnya"}'::json ;
		else
			update air_meter_log
			set
				tgl_start_meter=p_tgl_start_meter, 
				tgl_end_meter=p_tgl_end_meter, 
				meter_start=p_meter_start, 
				meter_end=p_meter_end, 
				tahun_bulan= to_char(p_tgl_end_meter,'YYYY-MM'),
				meter_pemakaian=(p_meter_end-p_meter_start)::int, 
				keterangan=p_keterangan, 
				petugas_pencatat=p_petugas_pencatat, 
				tgl_ubah=now(), 
				petugas_ubah=p_kode_pengguna
			where id_air_meter_log=v_id_air_meter_log;
			return ('{"ret":0,"action":"Updated","id_meter_log":'|| v_id_air_meter_log::text ||'}')::json;
		end if;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 398 (class 1255 OID 37786)
-- Name: f_air_log_submit_masal(character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_air_log_submit_masal(p_kode_pengguna character varying, p_data_logs json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_json json;
	v_result json;
	v_response json[]:=ARRAY[]::json[];
BEGIN
	-- looping each data
	for v_json  IN  select json_array_elements(p_data_logs) 
	loop
		-- submit data
		select f_air_log_submit(
			p_kode_pengguna,
			(v_json->>'p_petugas_pencatat')::text,
			(v_json->>'p_id_unit')::int,
			(v_json->>'p_tgl_pencatatan')::date,
			(v_json->>'p_tgl_start_meter')::date,
			(v_json->>'p_tgl_end_meter')::date,
			(v_json->>'p_meter_start')::int,
			(v_json->>'p_meter_end')::int,
			'upload data'
		) into v_result;
		-- push the result from submit
		raise notice 'resul: %', v_result;
		if (v_result->>'ret')::int=0 then
			v_response := array_append(v_response,('{"ret":0,"id_unit":'|| (v_json->>'p_id_unit')::text||',"msg":"'|| (v_result->>'action')::text ||'"}')::json);
		else
			v_response := array_append(v_response,('{"ret":'|| (v_result->>'ret')::text || ',"id_unit":'|| (v_json->>'p_id_unit')::text||',"msg":"'|| (v_result->>'msg')::text ||'"}')::json);
		end if;
		raise notice 'response: %', v_response;
	end loop;
	return ('{"ret":0,"res":'|| array_to_json(v_response)::text ||'}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 399 (class 1255 OID 37787)
-- Name: f_aset_biaya_update(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_biaya_update(p_kode_pengguna character varying, p_kode_aset character varying, p_biaya_kerusakan character varying, p_biaya_kehilangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	UPDATE aset
	SET biaya_kerusakan=p_biaya_kerusakan::numeric, biaya_kehilangan=p_biaya_kehilangan::numeric,
	tgl_ubah=now(), petugas_ubah=p_kode_pengguna::text
	WHERE kode_aset=p_kode_aset::text;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 400 (class 1255 OID 37788)
-- Name: f_aset_kategori_save(character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_kategori_save(p_kode_pengguna character varying, p_kode_kelompok character varying, p_kode_title_kategori character varying, p_nama_title_kategori character varying, p_kode_kategori character varying, p_kode_sub_kelompok character varying, p_nama_kategori character varying, p_aset_kapitalisasi boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	--return ('{"ret":0,"ada":"'|| p_ada_amortisasi::text ||'"}')::json;
	/* CEK ADA KELOMPOK NYA? */
	select count(1) into v_cek_ada from kode_aset_kategori where kode_kategori=p_kode_kategori and kode_sub_kelompok=p_kode_sub_kelompok and aktif=true;

	if v_cek_ada=0 then
		/*INSERT YANG BARU*/
		
		INSERT INTO kode_aset_kategori(
		kode_kategori, kode_kelompok, kode_title_kategori, nama_title_kategori, kode_sub_kelompok, nama_kategori,
			aset_kapitalisasi, aktif, tgl_rekam, petugas_rekam)
		VALUES (p_kode_kategori::text,p_kode_kelompok::text, p_kode_title_kategori::text, p_nama_title_kategori::text, p_kode_sub_kelompok::text
				,p_nama_kategori::text, p_aset_kapitalisasi::boolean, true, now(),  p_kode_pengguna::text);
	
		return ('{"ret":0,"msg":"Sukses"}')::json;
	else
		return ('{"ret":-1,"msg":"Kode Kategori sudah dipakai"}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 401 (class 1255 OID 37789)
-- Name: f_aset_kategori_update(character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_kategori_update(p_kode_pengguna character varying, p_kode_kategori character varying, p_kode_sub_kelompok character varying, p_kode_title_kategori character varying, p_nama_title_kategori character varying, p_nama_kategori character varying, p_aset_kapitalisasi boolean, p_aktif boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	UPDATE kode_aset_kategori
	SET kode_title_kategori=p_kode_title_kategori::text, nama_title_kategori=p_nama_title_kategori::text, 
	nama_kategori=p_nama_kategori::text, aset_kapitalisasi=p_aset_kapitalisasi::boolean, aktif=p_aktif::boolean,
	tgl_ubah=now(), petugas_ubah=p_kode_pengguna::text
	WHERE kode_kategori=p_kode_kategori::text and kode_sub_kelompok=p_kode_sub_kelompok::text;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 391 (class 1255 OID 37790)
-- Name: f_aset_kelompok_save(character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_kelompok_save(p_kode_pengguna character varying, p_kode_kelompok character varying, p_nama_kelompok character varying, p_ada_amortisasi boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	--return ('{"ret":0,"ada":"'|| p_ada_amortisasi::text ||'"}')::json;
	/* CEK ADA KELOMPOK NYA? */
	select count(1) into v_cek_ada from kode_aset_kelompok where kode_kelompok=p_kode_kelompok;

	if v_cek_ada=0 then
		/*INSERT YANG BARU*/
		
		INSERT INTO kode_aset_kelompok(kode_kelompok, nama_kelompok, ada_amortisasi, aktif, tgl_rekam, petugas_rekam)
		VALUES (p_kode_kelompok::text,p_nama_kelompok::text, p_ada_amortisasi, true,now(), p_kode_pengguna::text);
		return ('{"ret":0,"msg":"Sukses"}')::json;
	else
		return ('{"ret":-1,"msg":"Kode Kelompok sudah dipakai"}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 392 (class 1255 OID 37791)
-- Name: f_aset_kelompok_update(character varying, character varying, character varying, boolean, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_kelompok_update(p_kode_pengguna character varying, p_kode_kelompok character varying, p_nama_kelompok character varying, p_ada_amortisasi boolean, p_aktif boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	UPDATE kode_aset_kelompok set tgl_ubah=now(), petugas_ubah=p_kode_pengguna::text, nama_kelompok=p_nama_kelompok::text, 
	ada_amortisasi=p_ada_amortisasi::boolean, aktif=p_aktif::boolean
	where kode_kelompok=p_kode_kelompok::text;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 393 (class 1255 OID 37792)
-- Name: f_aset_kondisi_save(character varying, character varying, date, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_kondisi_save(p_kode_pengguna character varying, p_kode_aset character varying, p_tgl_kondisi date, p_kondisi_aset character varying, p_kondisi_aset_ref character varying, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
	v_tgl_kondisi date;
	v_kondisi_awal char(5);
	v_rslt json;
BEGIN
	--return ('{"ret":0,"ada":"'|| p_ada_amortisasi::text ||'"}')::json;
	/* CEK ADA KELOMPOK NYA? */		
	if (p_tgl_kondisi)::text = null or (p_tgl_kondisi)::text = '' then
		v_tgl_kondisi:=null;
	else
		v_tgl_kondisi:=p_tgl_kondisi;
	end if;
	
	select kondisi_aset into v_kondisi_awal from aset_kondisi where kode_aset=p_kode_aset::text and kondisi_terakhir;
	
	/* UPDATE YANG LAMA JADI 'T'*/
	UPDATE aset_kondisi set kondisi_terakhir=false, tgl_ubah=now(), petugas_ubah=p_kode_pengguna 
	where kode_aset=p_kode_aset and kondisi_terakhir=true;
	
	INSERT INTO aset_kondisi(
	kode_aset,tgl_kondisi,kondisi_aset,kondisi_aset_ref,keterangan, tgl_rekam, petugas_rekam,kondisi_terakhir)
	VALUES (p_kode_aset::text,v_tgl_kondisi::date, p_kondisi_aset::text, p_kondisi_aset_ref::text, p_keterangan::text
			,now(),  p_kode_pengguna::text,true);
			
--	select f_kontrak_inventaris_kondisi_check_n_update(p_kode_pengguna::text,p_kode_aset::text,v_kondisi_awal::text, p_kondisi_aset::text,v_tgl_kondisi::date) into v_rslt;

	return ('{"ret":0,"msg":"Sukses"}')::json;

exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 388 (class 1255 OID 37793)
-- Name: f_aset_lampiran_save(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_aset_lampiran_save(p_kode_pengguna character varying, p_kode_aset character varying, p_ket_dokumen character varying, p_path_dokumen character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_registrasi_lampiran bigint;
BEGIN
	update aset set tgl_ubah=now(), petugas_ubah=p_kode_pengguna::text, 
	lampiran_file=p_path_dokumen::text, lampiran_deskripsi=p_ket_dokumen::text 
	where kode_aset=p_kode_aset::text;
	return ('{"ret":0,"id":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 389 (class 1255 OID 37794)
-- Name: f_code_angka_to_huruf(bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_code_angka_to_huruf(p_angka bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
declare
	v_count_huruf smallint:=0;
 	v_angka bigint:=p_angka;
  	v_kode_huruf varchar(30) := ''::text;
  	v_kode_angka smallint;
BEGIN
   loop
   	if p_angka - power(26,v_count_huruf)<=0 then
		exit;
	end if;
	v_count_huruf := v_count_huruf+1;
   end loop;
   loop
		v_kode_angka := case when v_angka<=26 then v_angka else floor( (v_angka-1)/ power(26,v_count_huruf-1)) end;
		v_kode_huruf := v_kode_huruf || chr(v_kode_angka+64);
   		if v_count_huruf-1<=0 then
			exit; 
		end if;
		v_angka := v_angka - (v_kode_angka* power(26,v_count_huruf-1));
		v_count_huruf := v_count_huruf- 1;
   	end loop;
	return v_kode_huruf;
exception 
	when others then
		return '';
END;								
$$;


--
-- TOC entry 390 (class 1255 OID 37795)
-- Name: f_code_huruf_to_angka(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_code_huruf_to_angka(p_kode_huruf character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare
	v_angka bigint;
	v_len smallint;
	v_count smallint;
BEGIN
   v_len := length(p_kode_huruf);
   v_count := 1;
   v_angka :=0;
   loop
		v_angka := v_angka + power(26, (v_len-v_count)) * (ascii(substr(p_kode_huruf,v_count,1))-64);
   		if v_len-v_count<=0 then
			exit; 
		end if;
		v_count := v_count + 1;
   	end loop;
	return v_angka;
exception 
	when others then
		return 0;
END;								
$$;


--
-- TOC entry 394 (class 1255 OID 37796)
-- Name: f_encode_time(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_encode_time() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
declare
	v_time timestamp := current_timestamp;
    v_code varchar(2)[] := array[
	  							'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X',
                                'YA','YB','YC','YD','YE','YF','YG','YH','YI','YJ','YK','YL','YM','YN','YO','YP','YQ','YR',
	  							'ZA','ZB','ZC','ZD','ZE','ZF','ZG','ZH','ZI','ZJ','ZK','ZL','ZM','ZN','ZO','ZP','ZQ','ZR'
  							];
  	v_time_code varchar(15);
BEGIN
	v_time_code := date_part('year',v_time)::text || v_code[date_part('month',v_time)] || v_code[date_part('day',v_time)] 
				|| v_code[ case when date_part('hour',v_time) =0 then 24 else date_part('hour',v_time) end] 
				|| v_code[ case when date_part('minute',v_time) =0 then 60 else date_part('minute',v_time) end]
				|| v_code[ case when date_part('second',v_time) =0 then 60 else date_part('second',v_time) end];
	return coalesce(v_time_code,''::text);
exception 
	when others then
		return ''::text;
END;								
$$;


--
-- TOC entry 402 (class 1255 OID 37797)
-- Name: f_gen_kode_aset(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_gen_kode_aset(p_blth character varying, p_kode_kantor character varying, p_kode_kategori character varying) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_urut integer:=0;
	v_tahun	varchar(5):=substring(p_blth,1,4);
	v_bulan varchar(2):=substring(p_blth,5,2);
	v_kode_kategori	varchar(5):='';
	v_kode_alfabln	varchar(2):='';
    v_nilai_sek integer;
	v_kode_aset varchar(20);
	v_str_sek varchar(5);
BEGIN
	select coalesce(nilai_akhir,0) into v_nilai_sek from master_sekuens_tahun
	where kode_sekuen=p_kode_kategori and kode_kantor=p_kode_kantor and tahun=v_tahun and aktif='Y';

	
	if v_nilai_sek is null then --jika null maka create row
		insert into master_sekuens_tahun(kode_sekuen,tahun,kode_kantor,nilai_akhir,aktif)
		values(p_kode_kategori,v_tahun,p_kode_kantor,0,'Y');
		
	end if;	
	
		select coalesce(nilai_akhir,0)+1 into v_nilai_sek from master_sekuens_tahun
		where kode_sekuen=p_kode_kategori and kode_kantor=p_kode_kantor and tahun=v_tahun and aktif='Y';
		
		select (CASE v_bulan::integer 
		WHEN 1 THEN 'A'
		WHEN 2 THEN 'B'
		WHEN 3 THEN 'C'
		WHEN 4 THEN 'D'
		WHEN 5 THEN 'E'
		WHEN 6 THEN 'F'
		WHEN 7 THEN 'G'
		WHEN 8 THEN 'H'
		WHEN 9 THEN 'I'
		WHEN 10 THEN 'J'
		WHEN 11 THEN 'K'
		WHEN 12 THEN 'L'
		END) into v_kode_alfabln;
		
		select lpad(v_nilai_sek::character varying,4,'0') into v_str_sek;
		
		v_kode_aset:=p_kode_kantor||p_kode_kategori||v_kode_alfabln||substring(v_tahun,3,2)||v_str_sek;
		
		update master_sekuens_tahun set nilai_akhir=v_nilai_sek
		where kode_sekuen=p_kode_kategori and kode_kantor=p_kode_kantor and tahun=v_tahun and aktif='Y';
	
	return v_kode_aset;
exception
	when others then
		return  '0';
END;
$$;


--
-- TOC entry 403 (class 1255 OID 37798)
-- Name: f_gen_penyusutan_aset(character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_gen_penyusutan_aset(p_kode_pengguna character varying, p_kode_aset character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_tgl_perolehan date;
	v_tgl_mulai_amor date;
	v_batas_kap float:=0;
	v_nilai_perolehan float:=0;
	v_nilai_penyusutan float:=0;
	v_nilai_residu float:=0;
	v_persen_residu float:=0;
	v_masa_manfaat_bln float:=0;
	v_nilai_buku float:=0;
	v_nilai_sisa float:=0;
	v_kode_kantor character varying:='';
BEGIN
/* delete jika ada */
delete from aset_amortisasi_proyeksi where kode_aset=p_kode_aset::text;
	
select  a.tgl_perolehan,a.nilai_perolehan,(CASE WHEN b.nilai_residu>1 THEN 
round((a.nilai_perolehan*b.nilai_residu/100),2)
ELSE
1
END ) AS nilai_residu,
b.masa_manfaat_bln,b.nilai_residu as persen_residu ,a.kode_kantor
into v_tgl_perolehan,v_nilai_perolehan,v_nilai_residu,v_masa_manfaat_bln,v_persen_residu,v_kode_kantor
from aset a, kode_aset_penyusutan b
where kode_aset=p_kode_aset::text
and a.kode_aset_kategori=b.kode_kategori 
and a.kode_sub_kelompok=b.kode_sub_kelompok
and b.aktif=true
and b.tgl_efektif<=a.tgl_perolehan
order by b.tgl_efektif desc limit 1;
		
	
	v_tgl_mulai_amor:=DATE_TRUNC('MONTH',v_tgl_perolehan::date)::DATE;
	v_nilai_penyusutan:=(v_nilai_perolehan-v_nilai_residu)/v_masa_manfaat_bln;
	v_nilai_penyusutan:=ROUND(v_nilai_penyusutan::numeric,2);
	v_nilai_sisa:=v_nilai_perolehan;
	v_nilai_buku:=v_nilai_perolehan;
	
	/*update nilai_residu di table aset*/
	update aset set nilai_residu=v_nilai_residu where kode_aset=p_kode_aset;
	
	select nilai_min_kap into v_batas_kap from kode_batas_kap where st_aktif=true;
	
	if v_nilai_perolehan>=v_batas_kap then/*JIKA KAP MAKA LAKUKAN PENYUSUTAN*/
	FOR idx IN 1..v_masa_manfaat_bln::int
	loop
		v_nilai_buku:=round((v_nilai_buku::float-v_nilai_penyusutan::float)::numeric,2);
		insert into aset_amortisasi_proyeksi(kode_aset,bulan_ke,kode_kantor,
											 blth_penyusutan,nilai_penyusutan,nilai_buku,st_amortisasi,tgl_rekam,petugas_rekam)
		values(p_kode_aset,idx,v_kode_kantor,v_tgl_mulai_amor::date,v_nilai_penyusutan::float,v_nilai_buku::float,false,now(),p_kode_pengguna::text);
		v_tgl_mulai_amor:=(v_tgl_mulai_amor::date+ INTERVAL '1 month')::DATE;
	END loop;
	end if;
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 404 (class 1255 OID 37799)
-- Name: f_get_penyusutan_rekap(character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_get_penyusutan_rekap(p_kode_rusun character varying, p_kode_barang character varying, p_periode character varying, p_kondisi character varying, p_jenis character varying) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
	v_nilai double precision:=0;
BEGIN
	if p_jenis = '01' THEN 
   	   -- penyusutan s/d tahun lalu
       SELECT sum(nilai_penyusutan) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyy') < substring(p_periode,1,4)
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;

		return v_nilai;
	elsif p_jenis='02' THEN
		--penyusutan bulan ini
		SELECT sum(nilai_penyusutan) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyymm') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyymm')
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='03' THEN
		--penyusutan tahun ini s/d bln lalu
		SELECT sum(nilai_penyusutan) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyymm') < to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyymm')
	   and to_char(a.blth_penyusutan,'yyyy') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyy')
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='04' THEN
		--penyusutan tahun ini s/d bln ini
		SELECT sum(nilai_penyusutan) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyymm') <= to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyymm')
	   and to_char(a.blth_penyusutan,'yyyy') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyy')
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='05' THEN
		--penyusutan dr awal s/d bln ini
		SELECT sum(nilai_penyusutan) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyymm') <= to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyymm')
	   --and to_char(a.blth_penyusutan,'yyyy') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyy')
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='06' THEN
		--total_nilai_buku
		SELECT sum(nilai_buku) 
       INTO v_nilai
       FROM aset_amortisasi_proyeksi a, aset b
       WHERE to_char(a.blth_penyusutan,'yyyymm') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyymm')
	   --and to_char(a.blth_penyusutan,'yyyy') = to_char(to_date(p_periode,'yyyy-mm-dd'),'yyyy')
       AND a.kode_aset = b.kode_aset
	   AND b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;	
	elsif p_jenis='07' THEN
		--total_barang
		SELECT count(1)
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset = p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='09' THEN
		--total_barang BAIK
		SELECT count(1)
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset ='B'
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;	 
	elsif p_jenis='10' THEN
		--total_barang rusak
		SELECT count(1)
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset ='R'
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
	elsif p_jenis='11' THEN
		--total_barang rusak BERAT
		SELECT count(1)
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset  in ('RB','U')
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;
    elsif p_jenis='12' THEN
		--total_barang HILANG
		SELECT count(1)
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset ='H'
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;	
    elsif p_jenis='13' THEN
		--total_nilai_perolehan
		SELECT sum(coalesce(nilai_perolehan,0))
       INTO v_nilai
       FROM aset b
       WHERE b.kode_rusun=p_kode_rusun
       AND b.kondisi_aset =p_kondisi
       AND b.kode_aset_kategori =p_kode_barang;
	   
	   RETURN v_nilai;		   
	else
		return v_nilai;
	end if;
exception
	when others then
		return 0;
END;
$$;


--
-- TOC entry 405 (class 1255 OID 37800)
-- Name: f_inventarisasi_batal(character varying, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_inventarisasi_batal(p_kode_pengguna character varying, p_id_inventarisasi integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_error json[]:=ARRAY[]::json[];
	v_sukses json[]:=ARRAY[]::json[];
	v_json json:=ARRAY[]::json[];
	v_insert_data boolean;
	v_id_inventarisasi bigint;
	v_lock int:=0;
	v_cek_kondisi json;
BEGIN
	UPDATE aset_inventarisasi set st_batal=true,petugas_batal=p_kode_pengguna::text,tgl_batal=now() 
	where id_inventarisasi=p_id_inventarisasi::int;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 406 (class 1255 OID 37801)
-- Name: f_inventarisasi_save(character varying, character varying, character varying, date, character varying, date, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_inventarisasi_save(p_kode_pengguna character varying, p_kode_kantor character varying, p_kode_rusun character varying, p_tgl_sprin date, p_no_sprin character varying, p_tgl_inventarisasi date, p_thn_inventarisasi character varying, p_keterangan character varying, p_data_aset json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_error json[]:=ARRAY[]::json[];
	v_sukses json[]:=ARRAY[]::json[];
	v_json json:=ARRAY[]::json[];
	v_insert_data boolean;
	v_id_inventarisasi bigint;
	v_lock int:=0;
	v_cek_kondisi json;
BEGIN
	raise notice 'loop data aset';
	BEGIN
	/*--insert dlu ke header----*/
	INSERT INTO aset_inventarisasi(kode_kantor,kode_rusun,tgl_inventarisasi,tahun_inventarisasi,
								   no_sprin,tgl_sprin,keterangan,st_approve,tgl_rekam,petugas_rekam)
					values(p_kode_kantor::text,p_kode_rusun::text,p_tgl_inventarisasi::date,p_thn_inventarisasi::text,
		   				   p_no_sprin::text,p_tgl_sprin::date,p_keterangan::text,'Y',now(),p_kode_pengguna::text) 
						   returning id_inventarisasi into v_id_inventarisasi;
	exception
		when others then
		return '{"ret":-99,"msg":"Others error"}'::json;
		v_lock:=1;
	END;
	if v_lock=0 then 
		for v_json  IN  select json_array_elements(p_data_aset) 
		loop
			INSERT INTO aset_inventarisasi_detil(id_inventarisasi,kode_aset,kondisi_barang,tgl_rekam,petugas_rekam)
				values(v_id_inventarisasi,v_json->>'kode_aset'::text,v_json->>'kondisi_barang'::text,now(),p_kode_pengguna::text);
			PERFORM f_aset_kondisi_save(p_kode_pengguna::text,v_json->>'kode_aset'::text,now()::date,v_json->>'kondisi_barang'::text,
									   v_json->>'kondisi_barang'::text,'Inventarisasi Aset - '||v_id_inventarisasi);
		end loop;
		
	end if;
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 407 (class 1255 OID 37802)
-- Name: f_invoice_bukti_potong_pajak_save(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_bukti_potong_pajak_save(p_kode_pengguna character varying, p_no_invoice character varying, p_no_bukti_potong_pajak character varying, p_path character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_no_invoice varchar(50);
BEGIN	
	raise notice 'check invoice tax was paid by tenant';
	if not exists(select null from invoice where aktif and no_invoice=p_no_invoice and pajak_dibayar_penyewa) then
		return '{"ret":-1,"msg":"Pajak tidak dibayar sendiri oleh penyewa, tidak bisa di upload"}'::json ;
	end if;
	raise notice 'a';
	update invoice
	set
		ada_bukti_potong_pajak=true,
		tgl_upload_bukti_potong_pajak=now(),
		path_bukti_potong_pajak=p_path,
		no_bukti_potong_pajak=p_no_bukti_potong_pajak
	where no_invoice=p_no_invoice;
	return '{"ret":0}'::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 395 (class 1255 OID 37803)
-- Name: f_invoice_cancel(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_cancel(p_kode_pengguna character varying, p_no_invoice character varying, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_rec record;
	v_flag_rekon boolean:=false;
	v_flag_ada_denda boolean:=false;
	v_tahun_bulan_tagihan varchar(8);
	v_id_kontrak_sewa bigint;
BEGIN	
	-- chek rekon invoice
	select flag_rekon,flag_ada_denda,tahun_bulan_tagihan,id_kontrak_sewa
	into v_flag_rekon,v_flag_ada_denda, v_tahun_bulan_tagihan,v_id_kontrak_sewa
	from invoice 
	where no_invoice=p_no_invoice and aktif;
	
	if v_flag_rekon is null then
		return '{"ret":-1,"msg":"No Invoice Aktif tidak ditemukan"}'::json;
	elsif v_flag_rekon then
		return '{"ret":-2,"msg":"Sudah ada pembayaran untuk invoice ini"}'::json;
	elsif v_flag_ada_denda then
		return '{"ret":-2,"msg":"Sudah ada denda untuk invoice ini"}'::json;
	end if;
	
	-- cek jika invoice ada lah invoice termuda
	
	if exists(select * from invoice where aktif and id_kontrak_sewa=v_id_kontrak_sewa and tahun_bulan_tagihan>v_tahun_bulan_tagihan) then
		return '{"ret":-3,"msg":"BLTH invoice bukan blth yang paling akhir"}'::json;
	end if;
		raise notice 'a';
	-- balikkan status entries invoice
	for v_rec in select * from invoice_entries where no_invoice=p_no_invoice
	loop
		if v_rec.kode_invoice_entries='INVSEWA' then
			update invoice_entries_invsewa set status='E' where id_invoice_entries_invsewa=v_rec.ref_id_invoice_entries;
		elsif v_rec.kode_invoice_entries='INVDPST' then
			update invoice_entries_invdpst set status='E' where id_invoice_entries_invdpst=v_rec.ref_id_invoice_entries;
		elsif v_rec.kode_invoice_entries='INVLSTRK' then
			update invoice_entries_invlstrk set status='E' where id_invoice_entries=v_rec.ref_id_invoice_entries;
		elsif v_rec.kode_invoice_entries='INVAIR' then
			update invoice_entries_invair set status='E' where id_invoice_entries=v_rec.ref_id_invoice_entries;
		elsif v_rec.kode_invoice_entries='INVFAS' then
			update invoice_entries_invfas set status='E' where id_invoice_entries=v_rec.ref_id_invoice_entries;
		elsif v_rec.kode_invoice_entries='INVDENDA' then
			update invoice_entries_invdenda set status='E' where id_invoice_entries=v_rec.ref_id_invoice_entries;
			-- update flag denda invoice yang terkena
--			update invoice 
--			set
--				flag_ada_denda=false
--			where no_invoice in (
--				select no_invoice_kena_denda from  invoice_entries_invdenda where id_invoice_entries=v_rec.ref_id_invoice_entries
--			);
		elsif v_rec.kode_invoice_entries='INVEQ' then
			update invoice_entries_inveq set status='E' where id_invoice_entries=v_rec.ref_id_invoice_entries;
		end if;
	end loop;
	
	-- set non aktif invoice
	update invoice
	set aktif=false, tgl_na=now(), alasan_na=p_alasan_na
	where no_invoice=p_no_invoice and aktif;

	return ('{"ret":0,"action":"canceled"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 408 (class 1255 OID 37804)
-- Name: f_invoice_denda_setting_save(character varying, integer, date, numeric, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_denda_setting_save(p_kode_pengguna character varying, p_id_setting_denda integer, p_tgl_mulai_berlaku date, p_prosen_denda numeric, p_aktif boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_action varchar(40):='';
BEGIN	
	raise notice 'check p_id_setting_denda is null or 0';
	if coalesce(p_id_setting_denda,0)=0 then
		-- insert baru
		-- cek apakah ada denda di tanggal mulai tersebut
		if exists(select null from invoice_denda_setting where aktif and tgl_mulai_berlaku=p_tgl_mulai_berlaku) then
			return '{"ret":-1,"msg":"Sudah ada setting denda pada tanggal mulai berlaku tersebut"}'::json ;
		else
			INSERT INTO invoice_denda_setting(
				tgl_mulai_berlaku, prosen_denda, tgl_rekam, petugas_rekam
			)
			VALUES (
				p_tgl_mulai_berlaku, p_prosen_denda, now(), p_kode_pengguna
			);
			return '{"ret":0,"action":"Inserted"}'::json ;
		end if;
	else
		-- update data
		-- cek apakah sudah ada setting denda pada tanggal berlaku tersebut
		if exists(select null from invoice_denda_setting where aktif and tgl_mulai_berlaku=p_tgl_mulai_berlaku and id_setting_denda<>p_id_setting_denda) then
			return '{"ret":-1,"msg":"Sudah ada setting denda pada tanggal mulai berlaku tersebut"}'::json ;
		else
			update invoice_denda_setting
			set
				tgl_mulai_berlaku=case when coalesce(p_aktif,false) then tgl_mulai_berlaku else p_tgl_mulai_berlaku end,
				prosen_denda=case when coalesce(p_aktif,false) then prosen_denda else p_prosen_denda end, 
				aktif=coalesce(p_aktif,false),
				tgl_na=case when coalesce(p_aktif,false) then tgl_na else now() end,
				petugas_na=case when coalesce(p_aktif,false) then petugas_na else p_kode_pengguna end,
				tgl_ubah=now(), 
				petugas_ubah=p_kode_pengguna
			where id_setting_denda=p_id_setting_denda;
		end if;
	end if;
	
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 409 (class 1255 OID 37805)
-- Name: f_invoice_entries_air_cancel(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_air_cancel(p_kode_pengguna character varying, p_id_invoice_entries bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_status varchar(1);
	v_id_air_meter_log bigint;
begin
	-- check apakah status invoice sudah I
	select status,id_air_meter_log
	into v_status,v_id_air_meter_log
	from invoice_entries_invair invair 
	where aktif and  id_invoice_entries= p_id_invoice_entries;
	
	if v_status is null then
		return '{"ret":-1,"msg":"Entri air tidak ditemukan"}'::json ;
	elsif v_status='I' then
		return '{"ret":-1,"msg":"Sudah menjadi invoice, tidak bisa di cancel"}'::json ;
	end if;
	
	--'set non aktif entries'
	update air_meter_log set use_in_billing=false
	where id_air_meter_log = v_id_air_meter_log;

	update 	invoice_entries_invair invair
	set aktif=false
	where id_invoice_entries =p_id_invoice_entries;
		
	
	return ('{"ret":0}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 410 (class 1255 OID 37806)
-- Name: f_invoice_entries_air_create(character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_air_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_id_logs json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_log_proses  json[]:=ARRAY[]::json[];
	v_rate_per_m3 numeric(15,2);
	v_wmm numeric(10,2);

	v_nominal_pemakaian numeric(15,2);
	v_nominal_total numeric(15,2);
	
	v_id_kontrak_sewa bigint;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	-- get tarif listrik
	select rate_per_m3, wmm 
	into v_rate_per_m3, v_wmm
	from tarif_air
	where 
		aktif and kode_rusun=p_kode_rusun
		and current_date between tgl_mulai and tgl_berakhir
	order by tgl_mulai desc
	limit 1;
	v_rate_per_m3:= coalesce(v_rate_per_m3,0)::numeric;
	v_wmm:= coalesce(v_wmm,0)::numeric;

	for v_rec  IN  
		select t1.id_log, aml.*
   		from (
			select (x->>'id')::bigint id_log 
			from ( select json_array_elements(p_id_logs)  x) a
			) t1 
			left outer join air_meter_log aml on t1.id_log=aml.id_air_meter_log 
	loop
		if v_rec.id_air_meter_log is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"id log meter tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not v_rec.aktif then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"id log meter aktif tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not exists(
				select null 
				from rusun_lantai rl inner join rusun_unit ru on rl.id_lantai =ru.id_lantai  
				where rl.kode_rusun = p_kode_rusun and ru.aktif and ru.id_unit = v_rec.id_unit
			) 
		then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"unit tidak ditemukan pada rusun yang di proses"}')::json);
			v_error := v_error + 1;
		elseif v_rec.meter_pemakaian<=0 then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"meter pemakaian kurang dari 0"}')::json);
			v_error := v_error + 1;
		elseif v_rec.use_in_billing then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"log meter sudah digunakan untuk entri billing"}')::json);
			v_error := v_error + 1;
		elseif to_char(v_rec.tgl_end_meter,'YYYY-MM')>p_blth then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"bulan tagihan harusnya lebih besar atau sama dengan dengan tgl end meter"}')::json);
			v_error := v_error + 1;
		else
			-- get currect id_kontrak_sewa_aktif for id _unit
			select ks.id_kontrak_sewa 
			into v_id_kontrak_sewa
			from 
				kontrak_sewa ks 
				inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
			where 
				ks.aktif and ks.kontrak_berlaku 
				and ksu.id_unit=v_rec.id_unit
				and v_rec.tgl_end_meter>=ks.tgl_mulai_sewa 
				and v_rec.tgl_end_meter<=
						case 
							when ks.kontrak_berakhir  then ks.kontrak_berakhir_tgl 
							when ks.tgl_berakhir_adendum  is not null then ks.tgl_berakhir_adendum 
							else ks.tgl_berakhir_sewa 
						end
			order by ks.id_kontrak_sewa desc
			limit 1;
		
			if v_id_kontrak_sewa is null then 
				v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"unit pada tgl end meter tidak sedang dalam sewa"}')::json);
				v_error := v_error + 1;
			else
				-- kalkulasi tagihan
				v_nominal_pemakaian := v_rate_per_m3 * v_rec.meter_pemakaian;
				v_nominal_total := v_wmm +  v_nominal_pemakaian;

				-- insert data entri 
				INSERT INTO invoice_entries_invair(
					id_kontrak_sewa,id_unit, tahun_bulan_tagihan, tgl_start, tgl_end, meter_start, meter_end, meter_pemakaian, 
					rate_per_m3, wmm, nominal_pemakaian, nominal_total, 
					id_air_meter_log, status,tgl_rekam, petugas_rekam
				) values(
					v_id_kontrak_sewa,v_rec.id_unit, p_blth, v_rec.tgl_start_meter, v_rec.tgl_end_meter, v_rec.meter_start, v_rec.meter_end, v_rec.meter_pemakaian, 
					v_rate_per_m3, v_wmm, v_nominal_pemakaian,  v_nominal_total, 
					v_rec.id_log, 'E',now(),p_kode_pengguna
				);
				update air_meter_log 
				set use_in_billing=true
				where id_air_meter_log=v_rec.id_log;
				
				v_log_proses:= array_append(
					v_log_proses,
					(
						'{"id":'|| v_rec.id_log::text 
						||',"sukses":true,"msg":"sukses membuat entri tagihan"'
						||',"rate":'|| v_rate_per_m3::text
						||',"wmm":'|| v_wmm::text
						||',"nomPakai":'|| v_nominal_pemakaian::text
						||',"nomTotal":'|| v_nominal_total::text
						||'}'
					)::json
				);
				v_sukses := v_sukses + 1;
			end if;
		end if;
	end loop;
	return (
			'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
			|| array_to_json(v_log_proses)::text || '}'
		)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 411 (class 1255 OID 37808)
-- Name: f_invoice_entries_air_submit(character varying, bigint, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_air_submit(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_blth character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_ada_entri_lain boolean:=false;
	v_status_entri_lain varchar(1);
	v_json json;
	v_count_inserted int:=0;
	v_tarif json;
	v_tarif_air  json[]:=ARRAY[]::json[];
	v_rec record;
	v_rec_meter record;
BEGIN
	raise notice 'checking kontrak berlaku tidak.....';
	if not exists( select null from kontrak_sewa where aktif  and approval and not kontrak_berakhir  and id_kontrak_sewa=p_id_kontrak_sewa) then
		return '{"ret":-1,"msg":"tidak ada kontrak approved pada no tersebut"}'::json ;
	end if;
	raise notice 'check dan get periode entries jika sudah ada data entrie di dalam periode penarikan.....';
-- 	select  status
-- 	into v_status_entri_lain
-- 	from invoice_entries_invair invair
-- 	where
-- 		id_unit in(select id_unit from kontrak_sewa_unit where id_kontrak_sewa=p_id_kontrak_sewa)
-- 		and tahun_bulan_tagihan=p_blth
-- 		and aktif
-- 	order by invair.tgl_end desc, invair.tgl_start desc
-- 	limit 1;
-- 	if v_status_entri_lain='I' then
	if exists (select  null from invoice_entries_invair invair
			where
				id_unit in(select id_unit from kontrak_sewa_unit where id_kontrak_sewa=p_id_kontrak_sewa)
				and tahun_bulan_tagihan=p_blth
				and aktif and status='I')
	then
		return '{"ret":-3,"msg":"Sudah ada entri yang sudah menjadi invoice, tidak bisa lanjut submit entri"}'::json ;
	else
		raise notice 'update  entri status E yang sudah ada menjadi non aktif';
		update air_meter_log set use_in_billing=false
		where id_air_meter_log in (
			select id_air_meter_Log 
			from invoice_entries_invair
		where 
			id_unit in(select id_unit from kontrak_sewa_unit where id_kontrak_sewa=p_id_kontrak_sewa)
			and tahun_bulan_tagihan=p_blth
			and status='E'
			and aktif
		);
		
		update invoice_entries_invair
		set aktif=false,
			tgl_na=now(),
			alasan_na='replace with new entry'
		where 
			id_unit in(select id_unit from kontrak_sewa_unit where id_kontrak_sewa=p_id_kontrak_sewa)
			and tahun_bulan_tagihan=p_blth
			and status='E'
			and aktif;
	end if;
	-- loooping for every unit in kontrak
	for v_rec in
		select 
			unit.id_unit,
			unit.no_unit,
			unit.nama_unit,
			kontrak.kode_rusun,
			kontrak.tgl_mulai_sewa
		from
			kontrak_sewa_unit kontrak_unit
			inner join rusun_unit unit on kontrak_unit.id_unit=unit.id_unit
			inner join kontrak_sewa kontrak on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
		where kontrak.id_kontrak_sewa=p_id_kontrak_sewa
		order by id_unit
	loop
		-- get tarif
		select f_tarif_air_get(v_rec.kode_rusun)
		into v_tarif
		from air_meter_unit meter_unit where id_unit=v_rec.id_unit and aktif;
		-- fetch data pencatatan air dimana tgl_end<=p_blth dan tgl_end>tgl_mulai sewa
		-- dan status use_in_billing=false
		raise notice 'tarif%',v_tarif;
		for v_rec_meter in
			select 
				id_unit,id_air_meter_log,tgl_start_meter tgl_start, tgl_end_meter tgl_end, meter_start, meter_end, meter_pemakaian,
				(v_tarif->>'rateM3')::numeric rate_per_m3, (v_tarif->>'wmm')::numeric wmm,
				(v_tarif->>'rateM3')::numeric * meter_pemakaian nominal_pemakaian, 
				((v_tarif->>'rateM3')::numeric * meter_pemakaian) +  (v_tarif->>'wmm')::numeric
				nominal_total
			from air_meter_log 
			where id_unit=v_rec.id_unit and not use_in_billing
				and to_char(tgl_end_meter + interval '1 month','YYYY-MM')=p_blth
		loop
			INSERT INTO invoice_entries_invair(
				id_unit, tahun_bulan_tagihan, tgl_start, tgl_end, meter_start, meter_end, meter_pemakaian, 
				rate_per_m3, wmm, nominal_pemakaian, nominal_total, id_air_meter_log, status,tgl_rekam, petugas_rekam
			) values(
				v_rec_meter.id_unit, p_blth, v_rec_meter.tgl_start, v_rec_meter.tgl_end, v_rec_meter.meter_start, v_rec_meter.meter_end, v_rec_meter.meter_pemakaian, 
				v_rec_meter.rate_per_m3, v_rec_meter.wmm, v_rec_meter.nominal_pemakaian,  v_rec_meter.nominal_total, v_rec_meter.id_air_meter_log, 'E',now(),p_kode_pengguna
			);
			update air_meter_log 
			set use_in_billing=true
			where id_air_meter_log=v_rec_meter.id_air_meter_log;
			v_count_inserted := v_count_inserted + 1;
		end loop;
	end loop;
	
	return ('{"ret":0,"insertedCount":'|| v_count_inserted:: text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 412 (class 1255 OID 37809)
-- Name: f_invoice_entries_denda_cancel(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_denda_cancel(p_kode_pengguna character varying, p_no_invoice character varying, p_blth character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
BEGIN
	raise notice 'chek apakah ada entri yang jadi invoice di blth itu';
	if exists(
		select null from invoice_entries_invdenda invdenda
		where invdenda.aktif and invdenda.status<>'E' and invdenda.tahun_bulan_tagihan=p_blth and invdenda.no_invoice_kena_denda =p_no_invoice
	) then
		return '{"ret":-1,"msg":"Sudah menjadi invoice, tidak bisa di cancel"}'::json ;
	end if;
	
	raise notice 'set non aktif entries';
	
	update 	invoice_entries_invdenda invdenda
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na = p_kode_pengguna
	where 
		invdenda.tahun_bulan_tagihan=p_blth
		and invdenda.no_invoice_kena_denda =p_no_invoice
		and invdenda.status='E';
	return ('{"ret":0}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 413 (class 1255 OID 37810)
-- Name: f_invoice_entries_denda_create(character varying, character varying, character varying, numeric, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_denda_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_prosen_denda numeric, p_data_invoice json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_rec_detil record;
	v_log_proses  json[]:=ARRAY[]::json[];
	v_detil_unit  json[]:=ARRAY[]::json[];

	v_blth_akhir varchar(8);
	v_periode_awal date;
	v_periode_akhir date;

	v_tarif numeric(18,2);
	v_denda numeric(18,2);

	v_detil_ada_sukses boolean;
	v_id_kontrak_sewa bigint;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	for v_rec  IN  
		select 
			t1.*, i.*, ks.kode_rusun ,byr.tgl_pembayaran, ks.tgl_mulai_sewa
   		from (
			select (x->>'no_invoice')::text no_inv
			from ( select json_array_elements(p_data_invoice)  x) a
			) t1 
			left outer join invoice i on t1.no_inv=i.no_invoice and i.aktif 
			left outer join kontrak_sewa ks on ks.id_kontrak_sewa =i.id_kontrak_sewa 
			left outer join pembayaran_invoices byr_inv on byr_inv.no_invoice=i.no_invoice and byr_inv.aktif
			left outer join pembayaran byr on byr.id_pembayaran=byr_inv.id_pembayaran  and byr.aktif
	loop
		if v_rec.no_invoice is null then
			v_log_proses:= array_append(v_log_proses,('{"no":"'|| v_rec.no_inv::text  ||'","sukses":false,"msg":"No invoice tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif v_rec.kode_rusun<>p_kode_rusun then
			v_log_proses:= array_append(v_log_proses,('{"no":"'|| v_rec.no_inv::text  ||'","sukses":false,"msg":"No Invoice tidak terdaftar pada rusun tersebut"}')::json);
			v_error := v_error + 1;
		elsif v_rec.max_tgl_bayar >= to_date(p_blth,'YYYY-MM')::date then
			v_log_proses:= array_append(v_log_proses,('{"no":"'|| v_rec.no_inv::text  ||'","sukses":false,"msg":"Invoice dengan max bayar:'|| to_char( v_rec.max_tgl_bayar,'YYYY-MM-DD')::text ||' belum kena denda"}')::json);
			v_error := v_error + 1;
		elsif  not (
					(not v_rec.flag_rekon and (v_rec.max_tgl_bayar - to_date(p_blth,'YYYY-MM')::date) <0)
					or
					(v_rec.flag_rekon and  (v_rec.max_tgl_bayar-v_rec.tgl_pembayaran)<0 and not v_rec.flag_ada_denda)
				) then
			v_log_proses:= array_append(v_log_proses,('{"no":"'|| v_rec.no_inv::text  ||'","sukses":false,"msg":"Invoice dengan max bayar:'|| to_char( v_rec.max_tgl_bayar,'YYYY-MM-DD')::text ||' belum kena denda"}')::json);
			v_error := v_error + 1;
		else
			v_blth_akhir :=to_char(to_date(p_blth,'YYYY-MM')+ interval '1 month','YYYY-MM');
			v_periode_awal := 	case 
									when to_char(last_day(to_date(p_blth,'YYYY-MM')),'DD')<to_char(v_rec.tgl_mulai_sewa,'DD') then last_day(to_date(p_blth,'YYYY-MM'))
									else (p_blth || '-' || to_char(v_rec.tgl_mulai_sewa,'DD'))::date
								end;
			v_periode_akhir := 	case 
									when to_char(last_day(to_date(v_blth_akhir,'YYYY-MM')),'DD')<to_char(v_rec.tgl_mulai_sewa,'DD') then last_day(to_date(v_blth_akhir,'YYYY-MM')) - interval '1 day'
									else (v_blth_akhir || '-' || to_char(v_rec.tgl_mulai_sewa,'DD'))::date - interval '1 day'
								end;
			
			v_detil_unit :=ARRAY[]::json[];
			v_detil_ada_sukses := false;
			v_tarif :=0;
			v_denda :=0;
			for v_rec_detil in
				select iei.* 
				from
					invoice_entries ie 
					inner join invoice_entries_invsewa iei on 
						iei.aktif and iei.id_invoice_entries_invsewa =ie.ref_id_invoice_entries 
				where 
					ie.no_invoice = v_rec.no_inv
					and ie.kode_invoice_entries ='INVSEWA'
			loop 
				if not exists(
					select null from invoice_entries_invdenda invdenda 
					where aktif and no_invoice_kena_denda =v_rec.no_inv and  id_unit_kena_denda =v_rec_detil.id_unit
				)
				then
					INSERT INTO invoice_entries_invdenda(
						tahun_bulan_tagihan, no_invoice_kena_denda, id_unit_kena_denda, tahun_bulan_tagihan_kena_denda, 
						periode_bln_sewa_awal_kena_denda, periode_bln_sewa_akhir_kena_denda, nominal_kena_denda, prosen_denda, 
						nominal_denda, tgl_rekam, petugas_rekam, jenis_denda,id_kontrak_sewa
					)
					VALUES (
						p_blth, v_rec.no_inv, v_rec_detil.id_unit, v_rec.tahun_bulan_tagihan, 
						v_periode_awal, v_periode_akhir, v_rec_detil.tarif_unit, p_prosen_denda, 
						v_rec_detil.tarif_unit * p_prosen_denda /100::numeric, now(), p_kode_pengguna,'INVSEWA',v_rec.id_kontrak_sewa
					);
					v_detil_unit:= array_append(v_detil_unit,(
								'{"id_unit":'|| v_rec_detil.id_unit::text  
								||',"sukses":true'
								||',"msg":"Sukses membuat entri"'
								||',"terdenda":'|| v_rec_detil.tarif_unit::text  
								||',"denda":'|| (v_rec_detil.tarif_unit * p_prosen_denda /100::numeric)::text  
								|| '}'
							)::json
					);	
					v_tarif := v_tarif +  v_rec_detil.tarif_unit::numeric;
					v_denda := v_denda +  (v_rec_detil.tarif_unit * p_prosen_denda /100::numeric)::numeric;
					v_detil_ada_sukses :=true;
				elsif v_rec_detil.terbentuk_denda then
					v_detil_unit:= array_append(v_detil_unit,(
								'{"id_unit":'|| v_rec_detil.id_unit::text  
								||',"sukses":false'
								||',"msg":"Sudah terbentuk denda untuk invoice pada unit ini"'
								||',"terdenda":'|| v_rec_detil.tarif_unit::text  
								||',"denda":'|| (v_rec_detil.tarif_unit * p_prosen_denda /100::numeric)::text  
								|| '}'
							)::json
					);
				else
					v_detil_unit:= array_append(v_detil_unit,(
								'{"id_unit":'|| v_rec_detil.id_unit::text  
								||',"sukses":false'
								||',"msg":"Sudah ada invoice untuk invoice pada unit ini"'
								||',"terdenda":'|| v_rec_detil.tarif_unit::text  
								||',"denda":'|| (v_rec_detil.tarif_unit * p_prosen_denda /100::numeric)::text  
								|| '}'
							)::json
					);
				end if;
			end loop;
			if v_detil_ada_sukses then
				v_log_proses:= array_append(
					v_log_proses,
					(
						'{"no":"'|| v_rec.no_inv::text 						 
						||'","sukses":true,"msg":"sukses membuat entri tagihan"'
						||',"terdenda":'|| v_tarif::text  
						||',"denda":'|| v_denda::text  
						||',"detil":'|| array_to_json(v_detil_unit)::text
						||'}'
					)::json
				);
				v_sukses := v_sukses + 1;	
			else
				v_log_proses:= array_append(v_log_proses,('{"no":"'|| v_rec.no_inv::text  ||'","sukses":false,"msg":"Tidak ada unit pad invoice yang di denda"}')::json);
				v_error := v_error + 1;
			end if;
		end if;
	end loop;
	return (
			'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
			|| array_to_json(v_log_proses)::text || '}'
		)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 414 (class 1255 OID 37812)
-- Name: f_invoice_entries_eq_cancel(character varying, bigint, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_eq_cancel(p_kode_pengguna character varying, p_id_invoice_entries bigint, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_id_inventaris_unit bigint;
begin
	-- hanya status yang E yang bisa di non aktifkan
	select id_inventaris_unit
	into v_id_inventaris_unit
	from invoice_entries_inveq where aktif and id_invoice_entries=p_id_invoice_entries and status='E';
	if v_id_inventaris_unit is  null  then
		return '{"ret":-1,"msg":"Hanya entri yang belum invoice (status E) yang bisa di cancel"}'::json ;
	else 
		update invoice_entries_inveq  
		set aktif =false,
			tgl_na = now(),
			petugas_na=p_kode_pengguna,
			alasan_na = p_keterangan
		where id_invoice_entries = p_id_invoice_entries;
	
		update kontrak_sewa_inventaris_items 
		set
			use_in_entri = false,
			tgl_kondisi_akhir = null,
			kondisi_akhir = null,
			tgl_ubah=now(),
			petugas_ubah =p_kode_pengguna
		where 
			id_inventaris_unit = v_id_inventaris_unit;
	end if;
	-- looping untuk semua data yang akan di bentuk entri tagihannya
		
	return ('{"ret":0,"action":"cancel entri"}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 415 (class 1255 OID 37813)
-- Name: f_invoice_entries_eq_create(character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_eq_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_id_inventaris json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_log_proses  json[]:=ARRAY[]::json[];
	
	v_id_kontrak_sewa bigint;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	for v_rec  IN  
		select distinct on (t1.id_inventaris)
			t1.id_inventaris, 
			ksii.id_inventaris_unit,ksii.biaya_kehilangan , ksii.biaya_kerusakan ,ksii.aktif, ksii.id_unit,ksii.kode_aset,ksii.tgl_penempatan_in,
			case when ksii.kondisi_akhir is null then kondisi_akhir.tgl_kondisi else ksii.tgl_kondisi_akhir end tgl_kondisi_akhir ,
			case when ksii.kondisi_akhir is null then kondisi_akhir.kondisi_aset else ksii.kondisi_akhir end kondisi_akhir ,
			ksii.use_in_entri ,kontrak_sewa.id_kontrak_sewa 
   		from (
			select (x->>'id_inventaris_unit')::bigint id_inventaris 
			from ( select json_array_elements(p_id_inventaris)  x) a
			) t1 
			left outer join kontrak_sewa_inventaris_items ksii on t1.id_inventaris=ksii.id_inventaris_unit and ksii.aktif 
			left outer join kontrak_sewa on kontrak_sewa.id_kontrak_sewa=ksii.id_kontrak_sewa
			left outer join kontrak_sewa_berhenti ksb on ksb.aktif and ksb.approval  and kontrak_sewa.id_kontrak_sewa =ksb.id_kontrak_sewa 
				left outer join aset_kondisi kondisi_akhir on (
					ksii.kode_aset=kondisi_akhir.kode_aset 
					and tgl_kondisi<=case
										when ksb.id_berhenti is not null then ksb.tgl_req_berhenti_sewa 
										when kontrak_berakhir then kontrak_berakhir_tgl 
										when tgl_berakhir_adendum is not null  then tgl_berakhir_adendum
										else tgl_berakhir_sewa
									end 
				)
		order by t1.id_inventaris, kondisi_akhir.tgl_kondisi desc nulls last, kondisi_akhir.tgl_rekam desc
	loop
		raise notice 'a';
		if v_rec.id_inventaris_unit is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"id inventaris unit tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not v_rec.aktif then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"id inventaris unit aktif tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not exists(
				select null 
				from rusun_lantai rl inner join rusun_unit ru on rl.id_lantai =ru.id_lantai  
				where rl.kode_rusun = p_kode_rusun and ru.aktif and ru.id_unit = v_rec.id_unit
			) 
		then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"unit tidak ditemukan pada rusun yang di proses"}')::json);
			v_error := v_error + 1;
		elseif v_rec.kondisi_akhir is null or v_rec.kondisi_akhir='B' then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"Kondisi akhir bukan Rusak/ Hilang"}')::json);
			v_error := v_error + 1;
		elseif v_rec.use_in_entri then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"Sudah di bentuk entri tagihannya"}')::json);
			v_error := v_error + 1;
		elseif to_char(v_rec.tgl_kondisi_akhir,'YYYY-MM')>p_blth then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_inventaris::text ||',"sukses":false,"msg":"bulan tagihan harusnya lebih besar atau sama dengan dengan tgl kondisi akhir"}')::json);
			v_error := v_error + 1;
		else
			insert into invoice_entries_inveq(
	   			id_kontrak_sewa , id_unit , kode_aset,jenis_tagihan,nominal_penggantian,tahun_bulan_tagihan,id_inventaris_unit 
	   		)
	   		values(
	   			v_rec.id_kontrak_sewa, v_rec.id_unit, v_rec.kode_aset,
	   			case when v_rec.kondisi_akhir='H' then 'H' else 'R' end,
	   			case when v_rec.kondisi_akhir='H' then v_rec.biaya_kehilangan else v_rec.biaya_kerusakan end,
	   			p_blth, v_rec.id_inventaris_unit
	   		);
	   		
	   		-- update status entri di data inventaris
	   		update kontrak_sewa_inventaris_items  
	   		set 
	   			use_in_entri =true,
	   			tgl_kondisi_akhir = v_rec.tgl_kondisi_akhir,
	   			kondisi_akhir = v_rec.kondisi_akhir
	   		where id_inventaris_unit =v_rec.id_inventaris_unit;
	   	
			v_log_proses:= array_append(
				v_log_proses,
				(
					'{"id":'|| v_rec.id_inventaris::text 
					||',"sukses":true,"msg":"sukses membuat entri tagihan"'
					||'}'
				)::json
			);
			v_sukses := v_sukses + 1;
		end if;
	end loop;
	return (
		'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
		|| array_to_json(v_log_proses)::text || '}'
	)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 416 (class 1255 OID 37814)
-- Name: f_invoice_entries_fasilitas_cancel(character varying, bigint, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_fasilitas_cancel(p_kode_pengguna character varying, p_id_invoice_entries bigint, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_id_inventaris_unit bigint;
begin 
	-- hanya status yang E yang bisa di non aktifkan
	if not exists(
		select null 
		from invoice_entries_invfas where aktif and id_invoice_entries=p_id_invoice_entries and status='E'
	)then
		return '{"ret":-1,"msg":"Hanya entri yang belum invoice (status E) yang bisa di cancel"}'::json ;
	else 
		update invoice_entries_invfas
		set aktif =false,
			tgl_na = now(),
			petugas_na=p_kode_pengguna,
			alasan_na = p_keterangan
		where id_invoice_entries = p_id_invoice_entries;
	end if;
	-- looping untuk semua data yang akan di bentuk entri tagihannya
		
	return ('{"ret":0,"action":"cancel entri"}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 417 (class 1255 OID 37815)
-- Name: f_invoice_entries_fasilitas_create(character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_fasilitas_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_id_fasilitas_units json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_log_proses  json[]:=ARRAY[]::json[];

	v_tgl_mulai_sewa date;
	v_blth_akhir varchar(8);
	v_periode_awal date;
	v_periode_akhir date;
	v_tarif numeric(15,2);
	
	v_id_kontrak_sewa bigint;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	for v_rec  IN  
		select 
			t1.id_fasilitas_unit, ksfu.*
   		from (
			select (x->>'id')::bigint id_fasilitas_unit 
			from ( select json_array_elements(p_id_fasilitas_units)  x) a
			) t1 
			left outer join kontrak_sewa_fasilitas_unit ksfu on t1.id_fasilitas_unit=ksfu.id_kontrak_sewa_fasilitas_unit
	loop
		if v_rec.id_kontrak_sewa_fasilitas_unit is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_fasilitas_unit::text ||',"sukses":false,"msg":"id kontrak sewa fasilitas unit tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not v_rec.aktif then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_fasilitas_unit::text ||',"sukses":false,"msg":"id kontrak sewa fasilitas unit aktif tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not v_rec.approval then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_fasilitas_unit::text ||',"sukses":false,"msg":"id kontrak sewa fasilitas unit approved tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not exists(
				select null 
				from rusun_lantai rl inner join rusun_unit ru on rl.id_lantai =ru.id_lantai  
				where rl.kode_rusun = p_kode_rusun and ru.aktif and ru.id_unit = v_rec.id_unit
		) then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_fasilitas_unit::text ||',"sukses":false,"msg":"unit tidak ditemukan pada rusun yang di proses"}')::json);
			v_error := v_error + 1;
		elsif exists(
			select * from invoice_entries_invfas iei 
			where 
				aktif and id_kontrak_sewa=v_rec.id_kontrak_sewa 
				and id_unit=v_rec.id_unit and kode_fasilitas =v_rec.kode_fasilitas
				and tahun_bulan_tagihan =p_blth
		) then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_fasilitas_unit::text ||',"sukses":false,"msg":"sudah ada entri tagihan untuk fasilitas ini."}')::json);
			v_error := v_error + 1;
		else
			-- get currect id_kontrak_sewa_aktif for id _unit
			select ks.id_kontrak_sewa , tgl_mulai_sewa
			into v_id_kontrak_sewa, v_tgl_mulai_sewa
			from 
				kontrak_sewa ks 
				
			where 
				ks.aktif and ks.approval 
				and ks.id_kontrak_sewa=v_rec.id_kontrak_sewa
				and p_blth>= to_char(tgl_mulai_sewa,'YYYY-MM')
				and p_blth <=case
									when kontrak_berakhir then to_char(kontrak_berakhir_tgl,'YYYY-MM') 
									when tgl_berakhir_adendum is not null  then to_char(tgl_berakhir_adendum,'YYYY-MM')
									else to_char(tgl_berakhir_sewa,'YYYY-MM')
								end;
		
			if v_id_kontrak_sewa is null then 
				v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"Kontrak tidak sedang dalam sewa untuk blth tersebut"}')::json);
				v_error := v_error + 1;
			else
				-- get periode sewa fasilitas
				v_blth_akhir :=to_char(to_date(p_blth,'YYYY-MM')+ interval '1 month','YYYY-MM');
				v_periode_awal := 	case 
										when to_char(last_day(to_date(p_blth,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(p_blth,'YYYY-MM'))
										else (p_blth || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date
									end;
				v_periode_akhir := 	case 
										when to_char(last_day(to_date(v_blth_akhir,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(v_blth_akhir,'YYYY-MM')) - interval '1 day'
										else (v_blth_akhir || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date - interval '1 day'
									end;
				-- get tarif fasilitas
				select tarif
				into v_tarif
				from kontrak_sewa_fasilitas_tarif ksft 
				where 
					aktif and id_kontrak_sewa =v_rec.id_kontrak_sewa and kode_fasilitas =v_rec.kode_fasilitas
					and p_blth>=blth_mulai 
				order by blth_akhir desc
				limit 1;
			
				if v_tarif is null or v_tarif=0 then
					select tarif
					into v_tarif
					from tarif_fasilitas tf 
					where 
						tf.aktif and tf.kode_rusun=p_kode_rusun and tf.kode_fasilitas = v_rec.kode_fasilitas
						and to_date(p_blth,'YYYY-MM')>=(p_blth||'-'||to_char(v_tgl_mulai_sewa ,'DD'))::date
					order by tf.tgl_berakhir  desc 
					limit 1;
				end if;
			
				INSERT into invoice_entries_invfas(
					id_kontrak_sewa,id_unit, kode_fasilitas, tahun_bulan_tagihan, periode_bln_sewa_awal, periode_bln_sewa_akhir, 
					jmlh_bulan_tagihan, tarif, nominal_total, status, tgl_rekam, petugas_rekam
				)
				VALUES (
					v_rec.id_kontrak_sewa,v_rec.id_unit, v_rec.kode_fasilitas, p_blth, v_periode_awal, v_periode_akhir, 
					1::smallint, coalesce(v_tarif,0), coalesce(v_tarif,0), 'E'::text, now(), p_kode_pengguna
				);
				
				v_log_proses:= array_append(
					v_log_proses,
					(
						'{"id":'|| v_rec.id_fasilitas_unit::text 
						||',"sukses":true,"msg":"sukses membuat entri tagihan"'
						||',"tarif":'|| coalesce(v_tarif,0)::text
						||',"nomTotal":'|| coalesce(v_tarif,0)::text
						||'}'
					)::json
				);
				v_sukses := v_sukses + 1;
			end if;
		end if;
	end loop;
	return (
			'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
			|| array_to_json(v_log_proses)::text || '}'
		)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 418 (class 1255 OID 37817)
-- Name: f_invoice_entries_listrik_cancel(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_listrik_cancel(p_kode_pengguna character varying, p_id_invoice_entries bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_status varchar(1);
	v_id_listrik_meter_log bigint;
begin
	-- check apakah status invoice sudah I
	select status,id_listrik_meter_log
	into v_status,v_id_listrik_meter_log
	from invoice_entries_invlstrk invlstrk 
	where aktif and  id_invoice_entries= p_id_invoice_entries;
	
	if v_status is null then
		return '{"ret":-1,"msg":"Entri listrik tidak ditemukan"}'::json ;
	elsif v_status='I' then
		return '{"ret":-1,"msg":"Sudah menjadi invoice, tidak bisa di cancel"}'::json ;
	end if;
	
	--'set non aktif entries'
	update listrik_meter_log set use_in_billing=false
	where id_listrik_meter_log = v_id_listrik_meter_log;

	update 	invoice_entries_invlstrk invlstrk
	set aktif=false
	where id_invoice_entries =p_id_invoice_entries;
		
	
	return ('{"ret":0}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 419 (class 1255 OID 37818)
-- Name: f_invoice_entries_listrik_create(character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_listrik_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_id_logs json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_log_proses  json[]:=ARRAY[]::json[];
	v_rate_per_kwh numeric(18,2);
	v_faktor_pengali numeric(18,2);
	v_demand_charges numeric(18,2);
	v_pju_prosen numeric(18,2);
	
	v_nominal_demand_charges numeric(10,2);
	v_nominal_pemakaian numeric(15,2);
	v_nominal_pju numeric(15,2);
	v_nominal_total numeric(15,2);
  	v_id_kontrak_sewa bigint;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	for v_rec  IN  
		select t1.id_log, lml.*
   		from (
			select (x->>'id')::bigint id_log 
			from ( select json_array_elements(p_id_logs)  x) a
			) t1 
			left outer join listrik_meter_log lml on t1.id_log=lml.id_listrik_meter_log 
	loop
		if v_rec.id_listrik_meter_log is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"id log meter tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not v_rec.aktif then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"id log meter aktif tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif not exists(
				select null 
				from rusun_lantai rl inner join rusun_unit ru on rl.id_lantai =ru.id_lantai  
				where rl.kode_rusun = p_kode_rusun and ru.aktif and ru.id_unit = v_rec.id_unit
			) 
		then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"unit tidak ditemukan pada rusun yang di proses"}')::json);
			v_error := v_error + 1;
		elseif v_rec.meter_pemakaian<=0 then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"meter pemakaian kurang dari 0"}')::json);
			v_error := v_error + 1;
		elseif v_rec.use_in_billing then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"log meter sudah digunakan untuk entri billing"}')::json);
			v_error := v_error + 1;
		elseif to_char(v_rec.tgl_end_meter,'YYYY-MM')>p_blth then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"bulan tagihan harusnya lebih besar atau sama dengan dengan tgl end meter"}')::json);
			v_error := v_error + 1;
		else
			raise notice 'a';
			-- get currect id_kontrak_sewa_aktif for id _unit
			select ks.id_kontrak_sewa 
			into v_id_kontrak_sewa
			from 
				kontrak_sewa ks 
				inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
			where 
				ks.aktif and ks.kontrak_berlaku 
				and ksu.id_unit=v_rec.id_unit
				and v_rec.tgl_end_meter>=ks.tgl_mulai_sewa 
				and v_rec.tgl_end_meter<=
						case 
							when ks.kontrak_berakhir  then ks.kontrak_berakhir_tgl 
							when ks.tgl_berakhir_adendum  is not null then ks.tgl_berakhir_adendum 
							else ks.tgl_berakhir_sewa 
						end
			order by ks.id_kontrak_sewa desc
			limit 1;
		
			if v_id_kontrak_sewa is null then 
				v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_log::text ||',"sukses":false,"msg":"unit pada tgl end meter tidak sedang dalam sewa"}')::json);
				v_error := v_error + 1;
			else
				-- get tarif listrik	
				select rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0) pju_prosen 
				into v_rate_per_kwh, v_faktor_pengali, v_demand_charges, v_pju_prosen
				from tarif_listrik
				where 
					aktif and kode_rusun=p_kode_rusun
					and(
						to_date(p_blth,'YYYY-MM') between tgl_mulai and tgl_berakhir
						or
						v_rec.tgl_end_meter between tgl_mulai and tgl_berakhir
					)
				order by tgl_mulai desc
				limit 1;

				v_rate_per_kwh:= coalesce(v_rate_per_kwh,0)::numeric;
				v_faktor_pengali:= coalesce(v_faktor_pengali,0)::numeric;
				v_demand_charges:= coalesce(v_demand_charges,0)::numeric;
				v_pju_prosen:= coalesce(v_pju_prosen,0)::numeric;
			
				-- kalkulasi tagihan
				v_nominal_demand_charges := v_faktor_pengali*v_demand_charges;
				v_nominal_pemakaian := v_rate_per_kwh * v_rec.meter_pemakaian;
				v_nominal_pju := round((v_nominal_demand_charges + v_nominal_pemakaian) * v_pju_prosen / 100::numeric);
				v_nominal_total := v_nominal_demand_charges +  v_nominal_pemakaian + v_nominal_pju;

				-- insert data entri 
				INSERT INTO invoice_entries_invlstrk(
					id_kontrak_sewa,id_unit, tahun_bulan_tagihan, tgl_start, tgl_end, meter_start, meter_end, meter_pemakaian, 
					rate_per_kwh, faktor_pengali, demand_charges, pju_prosen, 
					nominal_demand_charges, nominal_pemakaian, nominal_pju, nominal_total, 
					id_listrik_meter_log, status,tgl_rekam, petugas_rekam
				) values(
					v_id_kontrak_sewa,v_rec.id_unit, p_blth, v_rec.tgl_start_meter, v_rec.tgl_end_meter, v_rec.meter_start, v_rec.meter_end, v_rec.meter_pemakaian, 
					v_rate_per_kwh, v_faktor_pengali, v_demand_charges, v_pju_prosen, 
					v_nominal_demand_charges, v_nominal_pemakaian, v_nominal_pju,v_nominal_total,
					v_rec.id_log, 'E',now(),p_kode_pengguna
				);
				
				update listrik_meter_log 
				set use_in_billing=true
				where id_listrik_meter_log=v_rec.id_log;
				
				v_log_proses:= array_append(
					v_log_proses,
					(
						'{"id":'|| v_rec.id_log::text 
						||',"sukses":true,"msg":"sukses membuat entri tagihan"'
						||',"rate":'|| coalesce(v_rate_per_kwh,0)::text
						||',"fx":'|| coalesce(v_faktor_pengali,0)::text
						||',"dcharges":'|| coalesce(v_demand_charges,0)::text
						||',"pju":'|| coalesce(v_pju_prosen,0)::text
						||',"nomDCharges":'|| coalesce(v_nominal_demand_charges,0)::text
						||',"nomPakai":'|| coalesce(v_nominal_pemakaian,0)::text
						||',"nomPju":'|| coalesce(v_nominal_pju,0)::text
						||',"nomTotal":'|| coalesce(v_nominal_total,0)::text
						||'}'
					)::json
				);
				v_sukses := v_sukses + 1;
			end if;
		end if;
	end loop;
	return (
			'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
			|| array_to_json(v_log_proses)::text || '}'
		)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 420 (class 1255 OID 37820)
-- Name: f_invoice_entries_sewa_unit_cancel(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_sewa_unit_cancel(p_kode_pengguna character varying, p_id_invoice_entries bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_status varchar(1);
begin
	-- check apakah sudah menjadi invoice
	if exists(select null from invoice_entries_invsewa iei where aktif and status='I' and id_invoice_entries_invsewa = p_id_invoice_entries) then
		return '{"ret":-1,"msg":"Sudah menjadi invoice, tidak bisa di cancel"}'::json ;
	end if;
	
	--'set non aktif entries'
	update 	invoice_entries_invsewa invsewa
	set 
		aktif=false,
		tgl_na = now(),
		petugas_na=p_kode_pengguna
	where id_invoice_entries_invsewa =p_id_invoice_entries;
		
	
	return ('{"ret":0}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 421 (class 1255 OID 37821)
-- Name: f_invoice_entries_sewa_unit_create(character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_entries_sewa_unit_create(p_kode_pengguna character varying, p_kode_rusun character varying, p_blth character varying, p_data_units json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rec record;
	v_log_proses  json[]:=ARRAY[]::json[];

	v_blth_akhir varchar(8);
	v_periode_awal date;
	v_periode_akhir date;
	v_prosen_pajak numeric(7,2);	
	v_tarif numeric(15,2);
	v_nom_pajak numeric(15,2);
	v_nom_total numeric(20,2);

	v_id_kontrak_sewa bigint;
	v_blth_terakhir varchar(8);
	v_blth_ok boolean;
  	v_sukses int := 0;
  	v_error int := 0;
begin
	for v_rec  IN  
		select distinct on (t1.id_kontrak,t1.id_unit)
			t1.*, ksut.tarif , ksu.id_kontrak_sewa_unit , ks.id_kontrak_sewa ,ks.tgl_mulai_sewa
   		from (
			select (x->>'id_kontrak_sewa')::bigint id_kontrak, (x->>'id_unit')::int id_unit
			from ( select json_array_elements(p_data_units)  x) a
			) t1 
			left outer join kontrak_sewa ks on
				ks.aktif and ks.approval  and ks.id_kontrak_sewa = t1.id_kontrak
				and p_blth >= to_char(tgl_mulai_sewa,'YYYY-MM')
				and p_blth <=case
								when kontrak_berakhir then to_char(kontrak_berakhir_tgl,'YYYY-MM') 
								when tgl_berakhir_adendum is not null  then to_char(tgl_berakhir_adendum,'YYYY-MM')
								else to_char(tgl_berakhir_sewa,'YYYY-MM')
							end 
			left outer join kontrak_sewa_unit ksu on t1.id_kontrak = ksu.id_kontrak_sewa and ksu.id_unit=t1.id_unit
			left outer join kontrak_sewa_unit_tarif ksut on 
					ksut.aktif and ksut.id_kontrak_sewa=t1.id_kontrak and ksut.id_unit = t1.id_unit 
					and p_blth>=ksut.blth_mulai 
		order by t1.id_kontrak,t1.id_unit,ksut.blth_mulai desc,ksut.blth_akhir desc
	loop
		if v_rec.id_kontrak_sewa is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_kontrak::text ||',"idUnit":'|| v_rec.id_unit::text ||',"sukses":false,"msg":"Kontrak sewa tidak ditemukan"}')::json);
			v_error := v_error + 1;
		elsif v_rec.id_kontrak_sewa_unit is null then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_kontrak::text ||',"idUnit":'|| v_rec.id_unit::text ||',"sukses":false,"msg":"unit tidak terdaftar dalam kontrak sewa tersebut"}')::json);
			v_error := v_error + 1;
		elsif not exists(
				select null 
				from rusun_lantai rl inner join rusun_unit ru on rl.id_lantai =ru.id_lantai  
				where rl.kode_rusun = p_kode_rusun and ru.aktif and ru.id_unit = v_rec.id_unit
		) then 
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_kontrak::text ||',"idUnit":'|| v_rec.id_unit::text ||',"sukses":false,"msg":"unit tidak ditemukan pada rusun yang di proses"}')::json);
			v_error := v_error + 1;
		elsif exists(
			select * from invoice_entries_invsewa iei 
			where 
				aktif and id_kontrak_sewa=v_rec.id_kontrak 
				and id_unit=v_rec.id_unit 
				and tahun_bulan_tagihan =p_blth
		) then
			v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_kontrak::text ||',"idUnit":'|| v_rec.id_unit::text ||',"sukses":false,"msg":"sudah ada entri tagihan sewa untuk unit tersebut"}')::json);
			v_error := v_error + 1;
		else
			-- cek blth entri terakhir
			v_blth_ok := true;
			select max(tahun_bulan_tagihan) blth_terakhir
			into v_blth_terakhir
			from invoice_entries_invsewa iei 
			where 
				aktif and id_kontrak_sewa=v_rec.id_kontrak 
				and id_unit=v_rec.id_unit ;
			if v_blth_terakhir is not  null then
				if to_char(to_date(v_blth_terakhir,'YYYY-MM')+ interval '1 month','YYYY-MM')<>p_blth then
					v_blth_ok := false;
				end if;
			end if;
			
			if not v_blth_ok then
				v_log_proses:= array_append(v_log_proses,('{"id":'|| v_rec.id_kontrak::text ||',"idUnit":'|| v_rec.id_unit::text ||',"sukses":false,"msg":"BLTH terakhir (' || v_blth_terakhir::text || '), BLTH proses seharusnya ('|| to_char(to_date(v_blth_terakhir,'YYYY-MM')+ interval '1 month','YYYY-MM') ||')"}')::json);
				v_error := v_error + 1;
			else
				--get periode sewa
				v_blth_akhir :=to_char(to_date(p_blth,'YYYY-MM')+ interval '1 month','YYYY-MM');
				v_periode_awal := 	case 
										when to_char(last_day(to_date(p_blth,'YYYY-MM')),'DD')<to_char(v_rec.tgl_mulai_sewa,'DD') then last_day(to_date(p_blth,'YYYY-MM'))
										else (p_blth || '-' || to_char(v_rec.tgl_mulai_sewa,'DD'))::date
									end;
				v_periode_akhir := 	case 
										when to_char(last_day(to_date(v_blth_akhir,'YYYY-MM')),'DD')<to_char(v_rec.tgl_mulai_sewa,'DD') then last_day(to_date(v_blth_akhir,'YYYY-MM')) - interval '1 day'
										else (v_blth_akhir || '-' || to_char(v_rec.tgl_mulai_sewa,'DD'))::date - interval '1 day'
									end;
	
				--get pajak sewa
--				select prosen_pajak
--				into v_prosen_pajak
--				from pajak_tarif_sewa_unit ptsu 
--				where kode_rusun=p_kode_rusun and to_date(p_blth,'YYYY-MM')>=tgl_mulai_berlaku
--				order by tgl_mulai_berlaku desc limit 1;
			
--				v_prosen_pajak := coalesce(v_prosen_pajak,0)::numeric;
			
				
				v_prosen_pajak := f_pajak_tarif_sewa_unit_get(p_kode_rusun);	
			
				v_tarif := coalesce(v_rec.tarif,0);
				v_nom_pajak := v_tarif * v_prosen_pajak / 100::numeric;
				v_nom_total := v_tarif+(v_tarif * v_prosen_pajak / 100::numeric)::numeric;
			
				INSERT INTO invoice_entries_invsewa(
					id_kontrak_sewa,id_unit, tahun_bulan_tagihan, jmlh_bulan_tagihan, periode_bln_sewa_awal, periode_bln_sewa_akhir,
					tarif_unit, pajak_prosen, pajak_nominal, nominal_akhir, 
					tgl_rekam, petugas_rekam, 
					status
				) values(
					v_rec.id_kontrak,v_rec.id_unit, p_blth, 1::smallint, v_periode_awal,v_periode_akhir,
					v_tarif, v_prosen_pajak, 
					v_nom_pajak, 
					v_nom_total,
					now(), p_kode_pengguna,
					'E'
				);
				
				v_log_proses:= array_append(
					v_log_proses,
					(
						'{"id":'|| v_rec.id_kontrak::text 
						||',"idUnit":'|| v_rec.id_unit::text 
						||',"sukses":true,"msg":"sukses membuat entri tagihan"'
						||',"tarif":'|| v_tarif::text
						||',"pajakProsen":'|| v_prosen_pajak::text
						||',"pajak":'|| v_nom_pajak::text
						||',"nomTotal":'|| v_nom_total::text
						||'}'
					)::json
				);
				v_sukses := v_sukses + 1;
			end if;
		end if;
	end loop;
	return (
			'{"ret":0,"count_sukses":'|| v_sukses::text ||',"count_error":'|| v_error::text ||',"process_log":'
			|| array_to_json(v_log_proses)::text || '}'
		)::json;
exception
	when others then
		return ('{"ret":-99,"msg":"Other errors"}')::json;
END;
$$;


--
-- TOC entry 422 (class 1255 OID 37823)
-- Name: f_invoice_submit(character varying, bigint, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_invoice_submit(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_blth character varying, p_data_info json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_rec record;
	v_tgl_kontrak_sewa date;
	v_tgl_mulai_sewa date;
	v_periode_awal date;
	v_periode_akhir date;
	v_kode_rusun varchar(5);

	v_no_invoice varchar(50);
	v_tagihan	numeric(18,2):=0;
	v_pajak	numeric(15,2):=0;
	v_tagihan_total	numeric(18,2):=0;

	
	

	v_inv_duedate_bayar smallint;
	v_tgl_invoice date;
	v_blth_akhir varchar(8);
	v_ada_denda boolean:=false;
BEGIN	
	-- get data periode sewa
	select tgl_kontrak_sewa, tgl_mulai_sewa,kode_rusun
	into v_tgl_kontrak_sewa, v_tgl_mulai_sewa,v_kode_rusun
	from kontrak_sewa where aktif  and approval and id_kontrak_sewa=p_id_kontrak_sewa;
	if v_tgl_kontrak_sewa is null then
		return '{"ret":-2,"msg":"tidak ada kontrak approved pada id kontrak sewa  tersebut"}'::json ;
	end if;
	v_blth_akhir :=to_char(to_date(p_blth,'YYYY-MM')+ interval '1 month','YYYY-MM');
	v_periode_awal := case 
		when to_char(last_day(to_date(p_blth,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(p_blth,'YYYY-MM'))
		else (p_blth || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date
	end;
	v_periode_akhir := case 
		when to_char(last_day(to_date(v_blth_akhir,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(v_blth_akhir,'YYYY-MM')) - interval '1 day'
		else (v_blth_akhir || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date - interval '1 day'
	end;
	v_tgl_invoice := case
						when p_blth=to_char(v_tgl_mulai_sewa,'YYYY-MM') then v_periode_awal
						else to_date(p_blth, 'YYYY-MM' )
					end ;
				
	raise notice 'ase1 %,%,%,%,%,%,%,%,%,%,%,%,%',p_id_kontrak_sewa,p_blth, 
			v_tgl_invoice,
			( p_data_info->>'periodeAwal')::date,
			( p_data_info->>'periodeAkhir')::date,
			( p_data_info->>'periodeAkhir')::date,
			( p_data_info->>'say')::text,(p_data_info->>'note')::text,(p_data_info->>'notePaymentMethod')::text,now(),p_kode_pengguna,
			( p_data_info->>'ttdNama')::text,( p_data_info->>'ttdJabatan')::text;
	INSERT INTO invoice(
	 	id_kontrak_sewa,   tahun_bulan_tagihan, jmlh_bulan_tagihan, 
		tgl_invoice, periode_bln_sewa_awal, periode_bln_sewa_akhir, 
		max_tgl_bayar, 
		say, note, note_payment_method , tgl_rekam, petugas_rekam,ttd_nama,ttd_jabatan)
	VALUES (p_id_kontrak_sewa,p_blth, 1, 
			v_tgl_invoice,
			( p_data_info->>'periodeAwal')::date,
			( p_data_info->>'periodeAkhir')::date,
			( p_data_info->>'periodeAkhir')::date,
			( p_data_info->>'say')::text,(p_data_info->>'note')::text,(p_data_info->>'notePaymentMethod')::text,now(),p_kode_pengguna,
			( p_data_info->>'ttdNama')::text,( p_data_info->>'ttdJabatan')::text
		   )
	returning no_invoice
	into v_no_invoice; 
	
	raise notice 'ase2';
	-- 'create invoice_entries';
	for v_rec in 		
		select 
			'INVSEWA' kode_entries,id_invoice_entries_invsewa id_invoice_entries,tahun_bulan_tagihan , tarif_unit nominal_tagihan, pajak_nominal pajak, nominal_akhir  nominal_total,
			null::text no_invoice_kena_denda
		from  invoice_entries_invsewa iei 
		where aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVDPST' kode_entries,iei.id_invoice_entries_invdpst id_invoice_entries,tahun_bulan_tagihan , iei.jmlh_tarif_unit nominal_tagihan, iei.pajak_nominal pajak, iei.nominal_akhir  nominal_total,
			null::text no_invoice_kena_denda
		from 
			invoice_entries_invdpst iei 
		where iei.aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVLSTRK' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
			null::text no_invoice_kena_denda
		from  invoice_entries_invlstrk iei 
		where aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVAIR' kode_entries ,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , nominal_total nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
			null::text no_invoice_kena_denda
		from  invoice_entries_invair iei 
		where aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVFAS' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , tarif nominal_tagihan, 0::numeric pajak, nominal_total  nominal_total,
			null::text no_invoice_kena_denda
		from  
			invoice_entries_invfas iei 
			left outer join fasilitas fas on iei.kode_fasilitas=fas.kode_fasilitas
		where iei.aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVDENDA' kode_entries,id_invoice_entries id_invoice_entries,iei.tahun_bulan_tagihan ,  iei.nominal_denda nominal_tagihan, 0::numeric pajak,  iei.nominal_denda  nominal_total,
			no_invoice_kena_denda
		from  
			invoice_entries_invdenda iei 
		where 
			iei.aktif and iei.status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
		union all
		select 
			'INVEQ' kode_entries,id_invoice_entries id_invoice_entries,tahun_bulan_tagihan , nominal_penggantian nominal_tagihan, 0::numeric pajak, nominal_penggantian  nominal_total,
			null::text no_invoice_kena_denda
		from  invoice_entries_inveq iei 
		where aktif and status='E' and tahun_bulan_tagihan=p_blth and id_kontrak_sewa =p_id_kontrak_sewa
	loop
	raise notice 'asee%-%-%-%-%-',v_no_invoice,v_rec.kode_entries, v_rec.id_invoice_entries,now(),p_kode_pengguna;
		-- 'insert invoice entries'
		INSERT INTO invoice_entries(
			no_invoice, kode_invoice_entries, ref_id_invoice_entries, tgl_rekam, petugas_rekam)
		VALUES (v_no_invoice,v_rec.kode_entries, v_rec.id_invoice_entries,now(),p_kode_pengguna);
			raise notice 'asee';
		-- update status entries
		if v_rec.kode_entries='INVSEWA' then
			update invoice_entries_invsewa set status='I' where id_invoice_entries_invsewa=v_rec.id_invoice_entries;
		elsif v_rec.kode_entries='INVDPST' then
			update invoice_entries_invdpst set status='I' where id_invoice_entries_invdpst=v_rec.id_invoice_entries;
		elsif v_rec.kode_entries='INVLSTRK' then
			update invoice_entries_invlstrk set status='I' where id_invoice_entries=v_rec.id_invoice_entries;
		elsif v_rec.kode_entries='INVAIR' then
			update invoice_entries_invair set status='I' where id_invoice_entries=v_rec.id_invoice_entries;
		elsif v_rec.kode_entries='INVFAS' then
			update invoice_entries_invfas set status='I' where id_invoice_entries=v_rec.id_invoice_entries;
		elsif v_rec.kode_entries='INVDENDA' then
			update invoice_entries_invdenda set status='I' where id_invoice_entries=v_rec.id_invoice_entries;
			update invoice 
			set 
				flag_ada_denda=true,
				tgl_ubah=now(),
				petugas_ubah=p_kode_pengguna
			where no_invoice = v_rec.no_invoice_kena_denda;
		elsif v_rec.kode_entries='INVEQ' then
			update invoice_entries_inveq set status='I' where id_invoice_entries=v_rec.id_invoice_entries;
		end if;		
		-- 'akumulasi tagihan, pajak, total tagihan';
		v_tagihan := v_tagihan + coalesce(v_rec.nominal_tagihan,0)::numeric;
		v_pajak := v_pajak + coalesce(v_rec.pajak,0)::numeric;
		v_tagihan_total := v_tagihan_total + coalesce(v_rec.nominal_total,0)::numeric;
		
	end loop; 
	-- 'update nilai invoice';
	update invoice set 
		nominal_invoice=v_tagihan,
		nominal_pajak=v_pajak,
		nominal_akhir=v_tagihan_total
	where no_invoice=v_no_invoice;
	
	
	-- update setting not invoice
	if exists(select null from rusun_mgr_setting_db where kode_rusun=v_kode_rusun ) then
		update rusun_mgr_setting_db
		set
			invoice_say=(p_data_info->>'say')::text, 
			invoice_note=(p_data_info->>'note')::text, 
			invoice_note_payment_method=(p_data_info->>'notePaymentMethod')::text, 
			invoice_ttd_nama=( p_data_info->>'ttdNama')::text, 
			invoice_ttd_jabatan=( p_data_info->>'ttdJabatan')::text, 
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where kode_rusun=v_kode_rusun;
	else
		INSERT INTO rusun_mgr_setting_db(
		kode_rusun, invoice_say, invoice_note, invoice_note_payment_method, invoice_ttd_nama, invoice_ttd_jabatan,tgl_rekam, petugas_rekam)
		VALUES (
			v_kode_rusun,(p_data_info->>'say')::text,(p_data_info->>'note')::text,(p_data_info->>'notePaymentMethod')::text,( p_data_info->>'ttdNama')::text,( p_data_info->>'ttdJabatan')::text,now(),p_kode_pengguna
		);				
	end if;
	return ('{"ret":0,"no_invoice":"'|| v_no_invoice ||'"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 423 (class 1255 OID 37825)
-- Name: f_kode_aset_penyusutan_save(character varying, character varying, character varying, date, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kode_aset_penyusutan_save(p_kode_pengguna character varying, p_kode_kelompok character varying, p_kode_sub_kelompok character varying, p_tgl_efektif date, p_masa_manfaat_bln integer, p_nilai_residu integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_ada_amortisasi boolean;
	v_cek_ada integer:=0;
BEGIN
	--return ('{"ret":0,"ada":"'|| p_ada_amortisasi::text ||'"}')::json;
	/* CEK ADA DATA YG EFEKTIF NYA? */
	select count(1) into v_cek_ada 
	from kode_aset_penyusutan 
	where kode_kategori=p_kode_kelompok and kode_sub_kelompok=p_kode_sub_kelompok and aktif=true
	and tgl_efektif>=p_tgl_efektif::date;

	if v_cek_ada=0 then
		/*UPDATE YANG LAMA AKTIF JADI FALSE*/
		UPDATE kode_aset_penyusutan set aktif=false
		where kode_kategori=p_kode_kelompok and kode_sub_kelompok=p_kode_sub_kelompok and aktif=true
		and tgl_efektif<p_tgl_efektif::date;
		
		/*INSERT YANG BARU*/
		INSERT INTO kode_aset_penyusutan(
		kode_kategori, kode_sub_kelompok, tgl_efektif,masa_manfaat_bln,nilai_residu, aktif, tgl_rekam, petugas_rekam)
		VALUES (p_kode_kelompok::text,p_kode_sub_kelompok::text, p_tgl_efektif::date, p_masa_manfaat_bln::integer, 
				p_nilai_residu::integer, true, now(),  p_kode_pengguna::text);
		
		return ('{"ret":0,"msg":"Sukses"}')::json;
	else
		return ('{"ret":-1,"msg":"Setup penyusutan sudah ada"}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 374 (class 1255 OID 37826)
-- Name: f_komplain_cancel(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_komplain_cancel(p_kode_pengguna character varying, p_no_komplain character varying, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_status varchar(1);
	v_action varchar(20):='cancelled';
BEGIN
	raise notice 'Check no_komplain dan statusnya';
	select status
	into v_status
	from komplain
	where aktif and no_komplain=p_no_komplain;
	
	if v_status is null then
		return '{"ret":-1,"msg":"No Komplain tidak ditemukan"}'::json ;
	elsif v_status='C' then
		return '{"ret":-2,"msg":"Komplain sudah closed"}'::json ;
	end if;
	
	update komplain
	set
		aktif=false,
		tgl_na=now(),
		alasan_na=p_alasan_na,
		petugas_na=p_kode_pengguna
	where no_komplain=p_no_komplain;
	
	return ('{"ret":0,"Action":"canceled","noKomplain":"' || p_no_komplain || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 375 (class 1255 OID 37827)
-- Name: f_komplain_forward_wo_submit(character varying, character varying, date, character varying, integer, integer, integer, character varying, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_komplain_forward_wo_submit(p_kode_pengguna character varying, p_no_komplain character varying, p_req_completion_date date, p_kode_wo_tipe character varying, p_id_rusun_blok integer, p_id_lantai integer, p_id_unit integer, p_lokasi character varying, p_deskripsi_wo text) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_wo varchar(50);
	v_kode_rusun varchar(5);
	v_nama_pelapor varchar(75);
	v_title_komplain varchar(100);
	v_id_rusun_blok int;
	v_id_lantai int;
	v_action varchar(20):='updated';
begin
	-- check if id_unit not null get id_rusun_blok and id_lantai
	v_id_rusun_blok:= p_id_rusun_blok;
	if p_id_lantai is not null then
		select rl.id_rusun_blok,rl.id_lantai
		into v_id_rusun_blok,v_id_lantai
		from 
			rusun_lantai rl
		where rl.id_lantai=p_id_lantai;
	end if;
	if p_id_unit is not null then
		select rl.id_rusun_blok,rl.id_lantai
		into v_id_rusun_blok,v_id_lantai
		from 
			rusun_lantai rl
			inner join rusun_unit ru on rl.id_lantai=ru.id_lantai
		where ru.id_unit=p_id_unit;
	end if;

	select nama_pelapor, title_komplain , kode_rusun
	into  v_nama_pelapor, v_title_komplain , v_kode_rusun
	from komplain
	where no_komplain=p_no_komplain;
	if v_nama_pelapor is null then
		return '{"ret":-1,"msg":"Komplain tidak ditemukan"}'::json ;
	end if;
	
	INSERT INTO mtnc_wo(
		kode_rusun, tgl_request, nama_requester, jenis_lokasi, id_rusun_blok , id_lantai, id_unit, ref_id,
		lokasi, title_wo,deskripsi_wo, kode_wo_tipe, req_completion_date, tgl_rekam, petugas_rekam)
	values(
		v_kode_rusun, now(), v_nama_pelapor, 'U', v_id_rusun_blok, v_id_lantai, p_id_unit, p_no_komplain,
		p_lokasi, v_title_komplain,p_deskripsi_wo, p_kode_wo_tipe, p_req_completion_date, now(), p_kode_pengguna
	)
	returning no_wo
	into v_no_wo;
	
	raise notice 'e';
	return ('{"ret":0,"Action":"inserted","noWO":"' || v_no_wo || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 424 (class 1255 OID 37828)
-- Name: f_komplain_penyelesaian_submit(character varying, character varying, character varying, date, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_komplain_penyelesaian_submit(p_kode_pengguna character varying, p_no_komplain character varying, p_penyelesaian_status character varying, p_penyelesaian_tgl date, p_penyelesaian text) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_status varchar(1);
	v_penyelesaian_status varchar(2);
	v_action varchar(20):='updated';
BEGIN
	raise notice 'Check no_komplain dan statusnya';
	select status, penyelesaian_status
	into v_status, v_penyelesaian_status
	from komplain
	where aktif and no_komplain=p_no_komplain;
	
	if v_status is null then
		return '{"ret":-1,"msg":"No Komplain tidak ditemukan"}'::json ;
	elsif v_status='C' then
		return '{"ret":-2,"msg":"Komplain sudah closed"}'::json ;
	elsif v_penyelesaian_status in('U','R','WO') then
		return '{"ret":-3,"msg":"Sudah submit penyelesian, tidak bisa submit lagi"}'::json ;
	end if;
	
	update komplain
	set
		penyelesaian_status=p_penyelesaian_status,
		penyelesaian_tgl=p_penyelesaian_tgl,
		penyelesaian=p_penyelesaian,
		status= case when p_penyelesaian_status in ('U','R') then 'C' else status end,
-- 		status= 'C',
		tgl_ubah=now(),
		petugas_ubah=p_kode_pengguna
	where no_komplain=p_no_komplain;
	
	return ('{"ret":0,"Action":"updated","noKomplain":"' || p_no_komplain || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 425 (class 1255 OID 37829)
-- Name: f_komplain_submit(character varying, character varying, integer, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_komplain_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_id_unit integer, p_nama_pelapor character varying, p_kode_kategori_komplain character varying, p_title_komplain character varying, p_deskripsi_komplain character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_komplain varchar(50);
	v_action varchar(20):='updated';
	v_id_rusun_blok int;
	v_id_lantai int;
begin
	
	select ru.id_lantai , rl.id_rusun_blok 
	into v_id_lantai,v_id_rusun_blok
	from rusun_unit ru 
		inner join rusun_lantai rl on ru.id_lantai =rl.id_lantai  
	where id_unit=p_id_unit;
	
	
	insert into komplain(
		kode_rusun, id_unit, nama_pelapor, tgl_komplain, kode_kategori_komplain, title_komplain, deskripsi_komplain, tgl_rekam,petugas_rekam,id_lantai, id_rusun_blok 
	)
	values (
		p_kode_rusun, p_id_unit, p_nama_pelapor, current_date, p_kode_kategori_komplain, p_title_komplain, p_deskripsi_komplain,now(),p_kode_pengguna,v_id_lantai,v_id_rusun_blok
	)
	returning no_komplain
	into v_no_komplain;
	
raise notice 'a';
	return ('{"ret":0,"Action":"inserted","noKomplain":"' || v_no_komplain || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 426 (class 1255 OID 37830)
-- Name: f_kontrak_adendum_approve(character varying, bigint, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_adendum_approve(p_kode_pengguna character varying, p_id_adendum bigint, p_approved boolean, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_rslt json;
	v_id_kontrak_sewa bigint;
	v_tgl_mulai_sewa date;
	v_tgl_berakhir_sewa date;
	v_jmlh_bulan_adendum int;
	v_kode_rusun varchar(5);
	v_rec record;
	v_tarif numeric (18,2);

	v_total_deposit_sebelumnya numeric(18,2):=0;
	v_total_tarif numeric(18,2):=0;
	v_id_invoice_entries_invdpst bigint;
BEGIN	
	raise notice 'check jika kontrak dalam posisi submit';
	if exists (select null from kontrak_sewa_adendum where id_adendum=p_id_adendum and aktif and status='S') then
		raise notice 'approve kontrak_sewa adendum';
		-- saat ini belum ada step signed kontrak sewa sehingga ketika di approve maka di anggap kontrak telah di tanda tangani
		-- sehingga langsung terbentuk entri billing deposit
		select kode_rusun
		into v_kode_rusun
		from kontrak_sewa
			inner join kontrak_sewa_adendum on kontrak_sewa.id_kontrak_sewa=kontrak_sewa_adendum.id_kontrak_sewa
		where  id_adendum=p_id_adendum;
		
		update kontrak_sewa_adendum 
		set
			no_adendum = case when p_approved then f_kontrak_generate_no(v_kode_rusun) else no_adendum end,
			approval = case when p_approved then true else approval end,
			status= case when p_approved then 'A'::text else 'R'::text end,
			adendum_berlaku= case when p_approved then true else approval end,
			approval_tgl = now(),
			approval_petugas = p_kode_pengguna,
			approval_alasan = p_keterangan
			where id_adendum=p_id_adendum
		returning id_kontrak_sewa, tgl_mulai_sewa,tgl_berakhir_sewa,jmlh_bulan_adendum
		into v_id_kontrak_sewa,v_tgl_mulai_sewa,v_tgl_berakhir_sewa,v_jmlh_bulan_adendum;
		
		-- update tgl_berakhir_adendum pada kontrak sewa sesuai adendum jika approved
		if v_id_kontrak_sewa is not null and p_approved then
			update kontrak_sewa
			set
				tgl_berakhir_adendum=v_tgl_berakhir_sewa
			where 
				id_kontrak_sewa=v_id_kontrak_sewa  and kontrak_berlaku and aktif and not kontrak_berakhir
				and (
					tgl_berakhir_adendum is null 
					or
					tgl_berakhir_adendum<v_tgl_berakhir_sewa
				);
			--- bentuk tarif sewa unit baru sesuai adendum baru
			raise notice 'Update tarif unit sesuai tarif unit yang berlaku';
			for v_rec in select id_unit, tarif, id_kontrak_sewa_unit from kontrak_sewa_unit where id_kontrak_sewa=v_id_kontrak_sewa
			loop			
				-- 2020-12-01 revisi terhadap pemberian tarif kontrak unit			
				v_tarif := f_tarif_unit_get_numeric(v_rec.id_unit,v_tgl_mulai_sewa);
				
				-- 2020-12-01 insert data tarif kontrak
				INSERT INTO kontrak_sewa_unit_tarif(
					 id_kontrak_sewa,  id_adendum,id_unit, tgl_tarif, blth_mulai, blth_akhir, tarif, tgl_rekam, petugas_rekam
				)
				values(
					v_id_kontrak_sewa,p_id_adendum,v_rec.id_unit,v_tgl_mulai_sewa,
					to_char(v_tgl_mulai_sewa,'YYYY-MM'),to_char(v_tgl_mulai_sewa+ (v_jmlh_bulan_adendum-1)* interval '1 months','YYYY-MM'),
					v_tarif,
					now(),p_kode_pengguna
				);
				
				
				v_total_tarif := v_total_tarif+ v_tarif;
			end loop;
		
			-- 20210406 penerbitan entries  deposit jika jumlah tarif > jumlah deposit yang ada
			
			raise notice 'insert deposit if tarif>deposit yang ada';
			select  sum(nominal_akhir) 
			into v_total_deposit_sebelumnya
			from invoice_entries_invdpst
			where id_kontrak_sewa = v_id_kontrak_sewa and aktif ;
			
			if v_total_tarif>v_total_deposit_sebelumnya then
				INSERT INTO invoice_entries_invdpst(
					id_kontrak_sewa, tahun_bulan_tagihan,jmlh_bulan_tagihan,
					jmlh_tarif_unit,pajak_prosen,pajak_nominal,nominal_akhir
				)
				values(
					v_id_kontrak_sewa, to_char(v_tgl_mulai_sewa,'YYYY-MM'),1,
					v_total_tarif-v_total_deposit_sebelumnya,0,0,v_total_tarif-v_total_deposit_sebelumnya
				)
				returning id_invoice_entries_invdpst
				into v_id_invoice_entries_invdpst;
											
				for v_rec in 
					with data_dpst_sebelumnya as(
						select id_unit ,sum(ieid.nominal_akhir) nominal_akhir
						from 
							invoice_entries_invdpst_detil ieid 
							inner join invoice_entries_invdpst iei on ieid.id_invoice_entries_invdpst = iei.id_invoice_entries_invdpst 
						where ieid.aktif and iei.status ='I' and iei.aktif and iei.id_kontrak_sewa =v_id_kontrak_sewa
						group by id_unit
					) 
					select ksut.id_unit, t.nominal_akhir, ksut.tarif 
					from
						kontrak_sewa_unit_tarif ksut
						left outer join data_dpst_sebelumnya t on t.id_unit=ksut.id_unit 
					where ksut.id_kontrak_sewa =v_id_kontrak_sewa and id_adendum=p_id_adendum
				loop
					if coalesce(v_rec.tarif,0)>coalesce (v_rec.nominal_akhir,0) then
						INSERT INTO invoice_entries_invdpst_detil(
							id_invoice_entries_invdpst, id_unit, jmlh_bulan_tagihan, 
							tarif_unit, pajak_prosen, pajak_nominal, nominal_akhir, 
							tgl_rekam, petugas_rekam
						)
						VALUES (
							v_id_invoice_entries_invdpst,v_rec.id_unit,1,
							coalesce(v_rec.tarif,0)-coalesce (v_rec.nominal_akhir,0), 0, 0, coalesce(v_rec.tarif,0)-coalesce (v_rec.nominal_akhir,0),
							now(),p_kode_pengguna
						);
					end if;
				end loop;
			end if;
			
			-- 2020-12-01 pembentukan data tarif fasilitas
			raise notice 'Update tarif fasilitas sesuai fasilitas unit yang berlaku';
			for v_rec in
				select kode_fasilitas from fasilitas_rusun where aktif and kode_rusun=v_kode_rusun
			loop
				v_tarif := f_tarif_fasilitas_get_numeric(v_kode_rusun,v_rec.kode_fasilitas,v_tgl_mulai_sewa);
				INSERT INTO kontrak_sewa_fasilitas_tarif(
					 id_kontrak_sewa, id_adendum,  kode_fasilitas, tgl_tarif, blth_mulai, blth_akhir, tarif, tgl_rekam, petugas_rekam
				)
				values(
					v_id_kontrak_sewa,p_id_adendum,v_rec.kode_fasilitas,v_tgl_mulai_sewa,
					to_char(v_tgl_mulai_sewa,'YYYY-MM'),to_char(v_tgl_mulai_sewa+ (v_jmlh_bulan_adendum-1)* interval '1 months','YYYY-MM'),
					v_tarif,
					now(),p_kode_pengguna
				);
			end loop;
		end if;
		return ('{"ret":0}')::json;
	else
		return '{"ret":-1,"msg":"Status kontrak sewa adendum bukan submit"}'::json ;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 427 (class 1255 OID 37832)
-- Name: f_kontrak_adendum_save_and_submit(character varying, bigint, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_adendum_save_and_submit(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_data_adendum json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_kontrak_sewa bigint;
	v_tgl_berakhir_sewa date;
	v_tgl_berakhir_adendum date;
	v_id_adendum bigint;
	v_no_adendum varchar(50);
	v_action varchar(30):='INSERT';
	v_count_adendum_pengajuan smallint;
	v_count_adendum_approve smallint;
	v_rec record;
BEGIN	
	raise notice 'cek apakah kontrak berjalan';
	select id_kontrak_sewa,tgl_berakhir_sewa
	into v_id_kontrak_sewa,v_tgl_berakhir_sewa
	from kontrak_sewa 
	where id_kontrak_sewa=p_id_kontrak_sewa and aktif and kontrak_berlaku and not kontrak_berakhir;
	
	if v_id_kontrak_sewa is null then
		return '{"ret":-1,"msg":"Kontrak aktif berjalan tidak ditemukan"}'::json ; 
	end if;
	
	raise notice 'pengecekan Adendum yang ada';
	select max( case when status='A' then tgl_berakhir_sewa else null::date end),
		sum(case when status in ('S','D','R') then 1 else 0 end) count_adendum_pengajuan,
		sum(case when status ='A' then 1 else 0 end) count_adendum_approve
	into v_tgl_berakhir_adendum, v_count_adendum_pengajuan, v_count_adendum_approve
	from kontrak_sewa_adendum where id_kontrak_sewa=p_id_kontrak_sewa and aktif and approval;
	
	raise notice 'Insert atau update data adendum';
	if not exists(select null from kontrak_sewa_adendum where id_adendum=(p_data_adendum->>'idAdendum')::bigint) then
		if v_count_adendum_pengajuan<>0  then
			return '{"ret":-2,"msg":"Sudah ada pengajuan adendum"}'::json ; 
		end if;
		if ( v_count_adendum_approve=0 and (p_data_adendum->>'tglMulaiSewa')::date<v_tgl_berakhir_sewa ) or
		   ( v_count_adendum_approve<>0 and (p_data_adendum->>'tglMulaiSewa')::date<v_tgl_berakhir_adendum) then
			return '{"ret":-3,"msg":"Tgl mulai sewa harus lebih besar dari tanggal berakhir sewa/ adendum","tglAkhirSewaExisting":"'|| coalesce(v_tgl_berakhir_sewa::text,'') ||'","tglAkhirAdendumExisting":"'|| coalesce(v_tgl_berakhir_adendum::text,'') ||'"}'::json ; 
		end if;
		-- insert baru dan submit
		INSERT INTO kontrak_sewa_adendum(
			id_kontrak_sewa,  jmlh_bulan_adendum, 
			tgl_mulai_sewa, tgl_berakhir_sewa, biaya_administrasi, biaya_administrasi_by_prosen,
			pihak1_ttd_title, pihak1_ttd_nama, pihak1_ttd_jabatan,
			pihak2_ttd_title, pihak2_ttd_nama, pihak2_ttd_jabatan, 
			status, tgl_rekam, petugas_rekam)
	VALUES (
		p_id_kontrak_sewa, (p_data_adendum->>'jmlhBulanAdendum')::bigint,
		((p_data_adendum->>'tglMulaiSewa')::text)::date,((p_data_adendum->>'tglBerakhirSewa')::text)::date,(p_data_adendum->>'biayaAdmin')::numeric,(p_data_adendum->>'biayaAdminProsen')::boolean,
		(p_data_adendum->>'pihak1TtdTitle')::text,(p_data_adendum->>'pihak1TtdNama')::text,(p_data_adendum->>'pihak1TtdJabatan')::text,
		(p_data_adendum->>'pihak2TtdTitle')::text,(p_data_adendum->>'pihak2TtdNama')::text,(p_data_adendum->>'pihak2TtdJabatan')::text,
		'S',now(), p_kode_pengguna
	) returning id_adendum, no_adendum
	into v_id_adendum, v_no_adendum;
	else
		if ( v_count_adendum_approve=0 and (p_data_adendum->>'tglMulaiSewa')::date<v_tgl_berakhir_sewa ) or
		   ( v_count_adendum_approve<>0 and (p_data_adendum->>'tglMulaiSewa')::date<v_tgl_berakhir_adendum) then
		   
			return '{"ret":-3,"msg":"Tgl mulai sewa harus lebih besar dari tanggal berakhir sewa/ adendum","tglAkhirSewaExisting":"'|| coalesce(v_tgl_berakhir_sewa::text ,'')||'","tglAkhirAdendumExisting":"'|| coalesce(v_tgl_berakhir_adendum::text,'') ||'"}'::json ; 
		end if;
		
		update kontrak_sewa_adendum
		set 
			jmlh_bulan_adendum=(p_data_adendum->>'jmlhBulanAdendum')::bigint, 
			tgl_mulai_sewa=((p_data_adendum->>'tglMulaiSewa')::text)::date, 
			tgl_berakhir_sewa=((p_data_adendum->>'tglBerakhirSewa')::text)::date, 
			biaya_administrasi=(p_data_adendum->>'biayaAdmin')::numeric, 
			biaya_administrasi_by_prosen=(p_data_adendum->>'biayaAdminProsen')::boolean,
			pihak1_ttd_title=(p_data_adendum->>'pihak1TtdTitle')::text, 
			pihak1_ttd_nama=(p_data_adendum->>'pihak1TtdNama')::text, 
			pihak1_ttd_jabatan=(p_data_adendum->>'pihak1TtdJabatan')::text,
			pihak2_ttd_title=(p_data_adendum->>'pihak2TtdTitle')::text, 
			pihak2_ttd_nama=(p_data_adendum->>'pihak2TtdNama')::text, 
			pihak2_ttd_jabatan=(p_data_adendum->>'pihak2TtdJabatan')::text, 
			status='S', 
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where id_adendum=(p_data_adendum->>'idAdendum')::bigint
		returning id_adendum,no_adendum
		into v_id_adendum, v_no_adendum;
		v_action := 'UPDATE';
	end if;
	
	return ('{"ret":0,"iAdendum":'|| coalesce(v_id_adendum::text,'') ||',"noAdendum":"'|| coalesce(v_no_adendum::text,'') ||'"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 428 (class 1255 OID 37833)
-- Name: f_kontrak_approve(character varying, bigint, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_approve(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_approved boolean, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_rslt json;
	v_id_kontrak_sewa bigint;
	v_rec record;
-- 	v_tarifs json;
	v_tarif numeric(18,2);
	v_blth varchar(8);
	v_tgl_mulai_sewa date;
	v_jmlh_bulan_sewa int;
	v_kode_rusun varchar(5);
	v_prosen_pajak numeric(7,2);
BEGIN	
	raise notice 'check jika kontrak dalam posisi submit';
	select tgl_mulai_sewa ,kode_rusun,jmlh_bulan_sewa
	into v_tgl_mulai_sewa, v_kode_rusun,v_jmlh_bulan_sewa
	from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa and aktif and status='S';

	if v_kode_rusun is not null then		
		if p_approved then
			raise notice 'approve kontrak_sewa';
			-- saat ini belum ada step signed kontrak sewa sehingga ketika di approve maka di anggap kontrak telah di tanda tangani
			-- sehingga langsung terbentuk entri billing deposit
			update kontrak_sewa 
			set
				no_kontrak_sewa= case when coalesce(no_kontrak_sewa,'')= '' then f_kontrak_generate_no(v_kode_rusun) else no_kontrak_sewa end,
				approval = true,
				status= 'A',
				approval_tgl = now(),
				approval_petugas = p_kode_pengguna,
				approval_alasan = p_keterangan,
				signed=true,
				signed_date=now()
				where id_kontrak_sewa=p_id_kontrak_sewa;
			raise notice  'update registrasi status menjadi K';
			update registrasi set status='K' where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif;
			raise notice 'update data penghuni menjadi aktif menghuni';
			
			update registrasi_penghuni set aktif_menghuni=true,id_kontrak_sewa=p_id_kontrak_sewa
			where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif;
				
--			raise notice 'Set non aktif registrasi_unit';
--			update registrasi_unit set aktif=false 
--			where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif;
			
			raise notice 'Update tarif unit sesuai tarif unit yang berlaku';
			for v_rec in select id_unit from kontrak_sewa_unit where id_kontrak_sewa=p_id_kontrak_sewa
			loop
				raise notice 'Update status unit';
				update rusun_unit set is_filled=true, is_processed=false
				where id_unit=v_rec.id_unit;
				
				-- 2020-12-01 revisi terhadap pemberian tarif kontrak unit			
				v_tarif := f_tarif_unit_get_numeric(v_rec.id_unit,v_tgl_mulai_sewa);
				update kontrak_sewa_unit 
				set tarif=v_tarif,
				tipe_periode='B',n_periode=1
				where id_kontrak_sewa=p_id_kontrak_sewa and id_unit=v_rec.id_unit;
				
				-- 2020-12-01 insert data tarif kontrak
				INSERT INTO kontrak_sewa_unit_tarif(
					 id_kontrak_sewa,  id_unit, tgl_tarif, blth_mulai, blth_akhir, tarif, tgl_rekam, petugas_rekam
				)
				values(
					p_id_kontrak_sewa,v_rec.id_unit,v_tgl_mulai_sewa,
					to_char(v_tgl_mulai_sewa,'YYYY-MM'),to_char(v_tgl_mulai_sewa+ (v_jmlh_bulan_sewa-1)* interval '1 months','YYYY-MM'),
					v_tarif,
					now(),p_kode_pengguna
				);
			end loop;

			raise notice 'buat entries invoice deposit';
			v_rslt :=  f_invoice_entries_invdpst(p_kode_pengguna,p_id_kontrak_sewa);
			if (v_rslt->>'ret')::smallint <> 0 then
				raise exception 'create entries invoice deposit error';
			end if;
			-- 20201009 pembuatan invoice entries sewa pertama otomatis -- sudah otonmatis waktu pembentukan deposit
--			v_blth := to_char(v_tgl_mulai_sewa,'YYYY-MM');
--			raise notice 'buat entries invoice sewa ';
--			v_rslt := f_invoice_entries_sewa_unit_create(p_kode_pengguna,v_kode_rusun,v_blth,'[{"id_kontrak_sewa":'|| p_id_kontrak_sewa::text ||',"id_unit":'|| v_rec.id_unit::text ||'}]'::json);
----			v_rslt :=  f_invoice_entries_sewa_submit(p_kode_pengguna,p_id_kontrak_sewa,v_blth,v_prosen_pajak);
--			
--			if (v_rslt->>'ret')::smallint <> 0 then
--				raise exception 'create entries invoice sewa error';
--			end if;
			
			-- 2020-12-01 pembentukan data tarif fasilitas
			for v_rec in
				select kode_fasilitas from fasilitas_rusun where aktif and kode_rusun=v_kode_rusun
			loop
				v_tarif := f_tarif_fasilitas_get_numeric(v_kode_rusun,v_rec.kode_fasilitas,v_tgl_mulai_sewa);
				INSERT INTO kontrak_sewa_fasilitas_tarif(
					 id_kontrak_sewa,  kode_fasilitas, tgl_tarif, blth_mulai, blth_akhir, tarif, tgl_rekam, petugas_rekam
				)
				values(
					p_id_kontrak_sewa,v_rec.kode_fasilitas,v_tgl_mulai_sewa,
					to_char(v_tgl_mulai_sewa,'YYYY-MM'),to_char(v_tgl_mulai_sewa+ (v_jmlh_bulan_sewa-1)* interval '1 months','YYYY-MM'),
					v_tarif,
					now(),p_kode_pengguna
				);
			end loop;
			
			return ('{"ret":0,"action":"approved"}')::json;
		else
			
			update registrasi set status='R' where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif;
			
			update registrasi_penghuni  set id_kontrak_sewa=p_id_kontrak_sewa where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif ;
			
			update kontrak_sewa 
			set
				approval = false,
				status= 'R',
				approval_tgl = now(),
				approval_petugas = p_kode_pengguna,
				approval_alasan = p_keterangan
			where id_kontrak_sewa=p_id_kontrak_sewa;
			
			return ('{"ret":0,"action":"rejected"}')::json;
		end if;
	else
		return '{"ret":-1,"msg":"Status kontrak sewa bukan submit"}'::json ;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 429 (class 1255 OID 37835)
-- Name: f_kontrak_berhenti_finalisasi_check_data(bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_berhenti_finalisasi_check_data(p_id_berhenti bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_id_kontrak_sewa bigint;

	v_jumlah numeric(20,2);
	v_jumlah_tagihan numeric(20,2):=0;
	v_jumlah_deposit numeric(20,2):=0;
	v_jumlah_retur numeric(20,2):=0;
	v_jumlah_kurang_bayar numeric(20,2):=0;
	v_jumlah_kembali numeric(20,2):=0;
	v_rec json;
	
	v_json_berhenti json;
	v_json_unit json;
	v_json_invoice json;
	v_json_wo json;
	v_json_item json;
BEGIN
	-- get id_kontrak_sewa
	select json_agg(t)
	into v_json_berhenti
	from ( 
		select 
			ksb.*, ktkb.nama_tipe_kontrak_berakhir ,
			ks.jenis_registrasi , ks.pihak2_nama_lengkap , ks.pihak2_nama_perusahaan ,
			ks.tgl_mulai_sewa ,ks.no_kontrak_sewa,
			case 
				when ks.kontrak_berakhir  then ks.kontrak_berakhir_tgl 
				when ks.tgl_berakhir_adendum is not null then ks.tgl_berakhir_adendum 
				else ks.tgl_berakhir_sewa 
			end tgl_berakhir_sewa
		from 
			kontrak_sewa_berhenti ksb
			inner join kontrak_sewa ks on ksb.id_kontrak_sewa = ks.id_kontrak_sewa 
			left outer join kode_tipe_kontrak_berakhir ktkb  on ksb.tipe_berakhir =ktkb.kode_tipe_kontrak_berakhir 
		where ksb.id_berhenti=p_id_berhenti and ksb.aktif 
	) t;
	
	if v_json_berhenti is null then
		return '{"ret":-1,"msg":"Data berhenti kontrak tidak ditemukan"}'::json ;
	end if;
	
	select id_kontrak_sewa 
	into v_id_kontrak_sewa
	from kontrak_sewa_berhenti ksb  where id_berhenti = p_id_berhenti;
	raise notice 'id_kontrak: %', v_id_kontrak_sewa;

	-- get data unit sewa
	select json_agg(t)
	into v_json_unit
	from (
		select ksu.id_unit , rb.nama_blok , rl.nama_lantai , ru.nama_unit 
		from 
			kontrak_sewa_unit ksu 
			inner join rusun_unit ru on ru.id_unit = ksu.id_unit 
			inner join rusun_lantai rl on rl.id_lantai = ru.id_lantai 
			left outer join rusun_blok rb on rb.id_rusun_blok =rl.id_rusun_blok 
		where ksu.id_kontrak_sewa =v_id_kontrak_sewa
		order by rb.nama_blok , rl.nama_lantai , ru.nama_unit 
	) t;
	if v_json_unit is null then
		v_json_unit:='[]'::json;
	end if;

	-- get data invoice
	select json_agg(t)
	into v_json_invoice
	from (
	   select 
			inv.no_invoice, inv_klp.title_invoice, inv.tahun_bulan_tagihan, inv.nominal_akhir
	   from 
		invoice inv 
		left join kode_invoice_kelompok inv_klp on inv.kode_invoice_kelompok=inv_klp.kode_invoice_kelompok
	   where id_kontrak_sewa=v_id_kontrak_sewa and inv.aktif and not inv.flag_rekon
	   order by inv.tahun_bulan_tagihan
	) t;
	if v_json_invoice is null then
		v_json_invoice:='[]'::json;
	end if;
   	raise notice 'invoice belum bayar: %', v_json_invoice;
	
	-- get data status wo
	select json_agg(t)
	into v_json_wo
	from (
		select 
			no_wo, assigned_to,assigned_work_start_date, status
		from 
			mtnc_wo
		where
			mtnc_wo.aktif and kode_wo_tipe='IC' and mtnc_wo.ref_id=p_id_berhenti::text
	) t;
	if v_json_wo is null then
		v_json_wo:='[]'::json;
	end if;
   	raise notice 'Status WO: %', v_json_wo;
	
	-- get data item rusak / hilang
	
	with data_penempatan_kontrak_items as(
		select distinct on (id_inventaris_unit)
				kontrak_items.id_inventaris_unit, kontrak_items.kode_aset,kontrak_items.id_unit ,kontrak_items.id_kontrak_sewa ,
				kontrak_items.tgl_penempatan_in , kontrak_items.tgl_penempatan_out, kontrak_items.tgl_kondisi_awal , kontrak_items.kondisi_awal ,
				kontrak_items.biaya_kehilangan , kontrak_items.biaya_kerusakan ,
				case when kontrak_items.kondisi_akhir is null then kondisi_akhir.tgl_kondisi else kontrak_items.tgl_kondisi_akhir end tgl_kondisi_akhir ,
				case when kontrak_items.kondisi_akhir is null then kondisi_akhir.kondisi_aset else kontrak_items.kondisi_akhir end kondisi_akhir ,
				kontrak_items.use_in_entri 
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
				kontrak_items.aktif and
				kontrak_items.id_kontrak_sewa=v_id_kontrak_sewa
			order by id_inventaris_unit,tgl_kondisi desc, kondisi_akhir.tgl_rekam desc
	)
	select json_agg(t)
	into v_json_item
	from (
		select 
			dpki.kode_aset,aset.nama_aset,nama_satuan,dpki.biaya_kerusakan, dpki.biaya_kehilangan,
			dpki.id_unit,nama_unit,kode_blok, no_lantai,no_unit,nama_blok,nama_lantai,
			dpki.tgl_penempatan_in tgl_penempatan,
			dpki.kondisi_awal,(select nama_kondisi from kode_aset_kondisi where kode_kondisi=dpki.kondisi_awal) nama_kondisi_awal,
			dpki.kondisi_akhir,(select nama_kondisi from kode_aset_kondisi where kode_kondisi=dpki.kondisi_akhir) nama_kondisi_akhir,
			case when dpki.kondisi_akhir='H' then dpki.biaya_kehilangan else dpki.biaya_kerusakan end biaya_pengembalian,
			nama_satuan,
			case 
				when inveq.status='E' then 'E'
				when inveq.status ='I' and i.flag_rekon then 'B'
				when inveq.status ='I'  then 'I'
				else null
			end
			status_billing 
		from 
			data_penempatan_kontrak_items dpki
			inner join aset on aset.kode_aset=dpki.kode_aset
			inner join rusun_unit unit on unit.id_unit=dpki.id_unit
			inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			left outer join rusun_blok blok on lantai.id_rusun_blok=blok.id_rusun_blok
			left outer join kode_satuan satuan on satuan.kode_satuan=aset.kode_satuan
			left outer join invoice_entries_inveq inveq on inveq.aktif and inveq.id_inventaris_unit=dpki.id_inventaris_unit
			left outer join invoice_entries ie on ie.kode_invoice_entries ='INVEQ' and ie.ref_id_invoice_entries = inveq.id_invoice_entries 
			left outer join invoice i on i.no_invoice=ie.no_invoice  and i.aktif
		where 
			(dpki.kondisi_awal='B' or dpki.kondisi_awal is null)
			and dpki.kondisi_akhir<>'B' and dpki.kondisi_akhir is not null
		order by nama_blok,nama_lantai,nama_unit, aset.nama_aset, dpki.kode_aset

	) t;
	if v_json_item is null then
		v_json_item:='[]'::json;
	end if;
   	raise notice 'Data Barang rusak dan Hilang: %', v_json_item;
	
	-- hitung jumlah tagihan 
	for v_rec  IN  select json_array_elements(v_json_invoice) 
	loop
		v_jumlah_tagihan := v_jumlah_tagihan + (v_rec->>'nominal_akhir')::numeric;
	end loop;
	raise notice 'Jumlah tagihan : %', v_jumlah_tagihan;
	-- get Deposit and perhitungannya
	
	-- get nominal depositcoalesce(v_jumlah_kembali,0::numeric)
--	select sum(nominal_akhir-coalesce(nominal_out,0::numeric))
--	into v_jumlah_deposit
--	from invoice_entries_invdpst invdpst
--	where invdpst.aktif and status='I'  and  id_kontrak_sewa=v_id_kontrak_sewa;
--	v_jumlah_deposit := coalesce(v_jumlah_deposit,0::numeric);	
	
	select sum(iei.nominal_akhir-coalesce(iei.nominal_out,0::numeric))
	into v_jumlah_deposit
	from invoice i 
		inner join invoice_entries ie on i.no_invoice =ie.no_invoice and ie.kode_invoice_entries ='INVDPST'
		inner join invoice_entries_invdpst iei on iei.id_invoice_entries_invdpst =ie.ref_id_invoice_entries
	where i.aktif  and i.flag_rekon 
	and i.id_kontrak_sewa =v_id_kontrak_sewa;
	v_jumlah_deposit := coalesce(v_jumlah_deposit,0::numeric);	
	
	-- get nominal retur
	select 
		sum(coalesce(nominal_retur_in,0::numeric)-coalesce(nominal_retur_out,0::numeric))
	into
		v_jumlah_retur
	from kontrak_sewa_retur
	where id_kontrak_sewa=v_id_kontrak_sewa and aktif;
	raise notice 'Jumlah Retur: %', v_jumlah_retur;
	
	-- get nominal kurang bayar
	v_jumlah_kurang_bayar := coalesce(v_jumlah_tagihan,0::numeric)-coalesce(v_jumlah_deposit,0::numeric)-coalesce(v_jumlah_retur,0::numeric);
	if v_jumlah_kurang_bayar<=0 then
		v_jumlah_kurang_bayar:=0;
	end if;
	raise notice 'Jumlah Kurang bayar: %', v_jumlah_kurang_bayar;
	
	-- get jumlah kembali
	v_jumlah_kembali := coalesce(v_jumlah_deposit,0::numeric)+coalesce(v_jumlah_retur,0::numeric)-coalesce(v_jumlah_tagihan,0::numeric);
	if v_jumlah_kembali<=0 then
		v_jumlah_kembali:=0;
	end if;
	raise notice 'Jumlah Pengembalian: %', v_jumlah_kembali;
	
	return ('{"ret":0,"idKontrakSewa":'|| v_id_kontrak_sewa::text
		|| ',"dataBerhenti":'|| v_json_berhenti::text 
		|| ',"dataUnit":'|| v_json_unit::text 
		|| ',"invoiceBelumRekon":'|| v_json_invoice::text 
		||',"statusWO":'|| v_json_wo::text
		||',"itemRusakHilang":'|| v_json_item::text
		||',"tagihanBelumBayar":'|| coalesce(v_jumlah_tagihan,0::numeric)::text
		||',"deposit":'|| coalesce(v_jumlah_deposit,0::numeric)::text
		||',"retur":'|| coalesce(v_jumlah_retur,0::numeric)::text
		||',"kurangBayar":'|| coalesce(v_jumlah_kurang_bayar,0::numeric)::text
		||',"pengembalian":'|| coalesce(v_jumlah_kembali,0::numeric)::text
		|| '}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 430 (class 1255 OID 37837)
-- Name: f_kontrak_berhenti_finalisasi_deposit(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_berhenti_finalisasi_deposit(p_kode_pengguna character varying, p_id_berhenti bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_id_kontrak_sewa bigint;
	v_is_finalisasi_deposit boolean;
	v_status_berhenti varchar(1);
	v_status_wo varchar(2);
	v_jumlah_tagihan numeric(20,2):=0;
	v_jumlah_deposit numeric(20,2):=0;
	v_jumlah_retur numeric(20,2):=0;
	v_jumlah_kurang_bayar numeric(20,2):=0;
	v_jumlah_kembali numeric(20,2):=0;

	v_id_pembayaran bigint;

	v_jumlah_tagihan_sisa numeric(20,2);
	v_nominal_retur_out numeric(20,2);
	v_nominal_deposit_out numeric(20,2);
	v_sum_out numeric(18,2);

	v_rec record;	
BEGIN
	-- get id_kontrak_sewa	
	select id_kontrak_sewa , ksb.is_finalisasi_deposit , ksb.status 
	into v_id_kontrak_sewa,v_is_finalisasi_deposit,v_status_berhenti
	from kontrak_sewa_berhenti ksb  where id_berhenti = p_id_berhenti;
	if v_id_kontrak_sewa is null then
		return '{"ret":-1,"msg":"Id Berhenti sewa tidak ditemukan"}'::json ;
	end if;
	if 	v_status_berhenti='F' then
		return '{"ret":-2,"msg":"Pengajuan sudah final"}'::json ;
	end if;
	if 	v_status_berhenti<>'A' then
		return '{"ret":-2,"msg":"Pengajuan belum approved"}'::json ;
	end if;
	if 	v_is_finalisasi_deposit then
		return '{"ret":-2,"msg":"Status sudah tutup tagihan/deposit"}'::json ;
	end if;

	-- get status wo
	select status
	into v_status_wo
	from mtnc_wo
	where
		mtnc_wo.aktif and kode_wo_tipe='IC' and mtnc_wo.ref_id=p_id_berhenti::text;
	if v_status_wo<>'C' then
		return '{"ret":-1,"msg":"Masih dalam pemeriksaan unit, tidak bisa tutup tagihan/deposit"}'::json ;
	end if;
		
	-- get nominal invoice belum bayar
   	select sum(inv.nominal_akhir)
	into v_jumlah_tagihan
   	from invoice inv 
   	where id_kontrak_sewa=v_id_kontrak_sewa and inv.aktif and not inv.flag_rekon;
    v_jumlah_tagihan := coalesce(v_jumlah_tagihan,0::numeric);
	raise notice 'Jumlah tagihan belum bayar: %', v_jumlah_tagihan;
	
   
	-- get nominal depositcoalesce(v_jumlah_kembali,0::numeric)
--	select sum(nominal_akhir-coalesce(nominal_out,0::numeric))
--	into v_jumlah_deposit
--	from invoice_entries_invdpst invdpst
--	where invdpst.aktif and status='I'  and  id_kontrak_sewa=v_id_kontrak_sewa;
	select sum(iei.nominal_akhir-coalesce(iei.nominal_out,0::numeric))
	into v_jumlah_deposit
	from invoice i 
		inner join invoice_entries ie on i.no_invoice =ie.no_invoice and ie.kode_invoice_entries ='INVDPST'
		inner join invoice_entries_invdpst iei on iei.id_invoice_entries_invdpst =ie.ref_id_invoice_entries
	where i.aktif  and i.flag_rekon 
	and i.id_kontrak_sewa =v_id_kontrak_sewa;
	v_jumlah_deposit := coalesce(v_jumlah_deposit,0::numeric);
	raise notice 'Jumlah deposit: %', v_jumlah_deposit;
	
	-- get nominal retur
	select 	sum(coalesce(nominal_retur_in,0::numeric)-coalesce(nominal_retur_out,0::numeric))
	into	v_jumlah_retur
	from kontrak_sewa_retur
	where id_kontrak_sewa=v_id_kontrak_sewa and aktif;
	raise notice 'Jumlah Retur: %', v_jumlah_retur;
	
	-- get nominal kurang bayar
	v_jumlah_kurang_bayar := coalesce(v_jumlah_tagihan,0::numeric)-coalesce(v_jumlah_deposit,0::numeric)-coalesce(v_jumlah_retur,0::numeric);
	if v_jumlah_kurang_bayar<=0 then
		v_jumlah_kurang_bayar:=0;
	end if;
	raise notice 'Jumlah Kurang bayar: %', v_jumlah_kurang_bayar;
	
	if v_jumlah_kurang_bayar>0 then
		return '{"ret":-2,"msg":"Nominal deposit+retur tidak mencukupi untuk menutup tagihan belum bayar"}'::json ;
	end if;

	-- get jumlah kembali
	v_jumlah_kembali := coalesce(v_jumlah_deposit,0::numeric)+coalesce(v_jumlah_retur,0::numeric)-coalesce(v_jumlah_tagihan,0::numeric) ;
	raise notice 'Jumlah Pengembalian: %', v_jumlah_kembali;
	
	
	-- jika ada tagihan belum bayar distribusikan untuk pembayaran tagihan tersebut
	if v_jumlah_tagihan>0 then
		-- buat pembayaran dengan method bayar FD
		INSERT INTO pembayaran(
			id_kontrak_sewa ,media_pembayaran, tgl_pembayaran, nominal_tagihan, nominal_deposit, nominal_pembayaran, nominal_retur, 
			nominal_retur_isdeposit, nominal_kurang_bayar, keterangan, tgl_rekam, petugas_rekam
		)
		VALUES(
			v_id_kontrak_sewa,'FD', now(), v_jumlah_tagihan, v_jumlah_tagihan, 0, 0, 
			false, 0, 'Pendistribusion finalisasi deposit berhenti sewa',now(), p_kode_pengguna
		)
		returning id_pembayaran
		into v_id_pembayaran;
		
		for v_rec in 
			select no_invoice, nominal_akhir 
		   	from invoice inv 
		   	where id_kontrak_sewa=v_id_kontrak_sewa and inv.aktif and not inv.flag_rekon
		loop
			INSERT INTO pembayaran_invoices(
				id_pembayaran, no_invoice, nominal_tagihan, nominal_pembayaran, nominal_sisa, 
				tgl_rekam, petugas_rekam
			)
			VALUES(
				v_id_pembayaran, v_rec.no_invoice, v_rec.nominal_akhir,v_rec.nominal_akhir,0,
				now(),p_kode_pengguna
			);
		
			-- set rekon_flag invoice
			update  invoice set flag_rekon = true 
			where no_invoice = v_rec.no_invoice;
		end loop;
	
		-- - jika ada retur pembayaran maka keluarkan returnya begitu juga deposit
		v_jumlah_tagihan_sisa := v_jumlah_tagihan;
		v_sum_out := 0;
	
		<<retur_out_pembayaran>>	
		for v_rec in 
			select * from kontrak_sewa_retur ksr 
			where 
				aktif and id_kontrak_sewa =v_id_kontrak_sewa
				and  nominal_retur_in-nominal_retur_out>0
			order by id_kontrak_sewa_retur 
		loop
			v_nominal_retur_out := case 
				when v_jumlah_tagihan_sisa>=v_rec.nominal_retur_in- v_rec.nominal_retur_out then  v_rec.nominal_retur_in- v_rec.nominal_retur_out
				else v_jumlah_tagihan_sisa 
			end;
			update kontrak_sewa_retur 
			set 
				nominal_retur_out = v_nominal_retur_out + v_rec.nominal_retur_out,
				tgl_ubah=now(),
				petugas_ubah = p_kode_pengguna
			where id_kontrak_sewa_retur =v_rec.id_kontrak_sewa_retur ;
				
			INSERT INTO kontrak_sewa_retur_out(
				id_kontrak_sewa_retur, id_pembayaran, nominal_retur_out,  tgl_rekam, petugas_rekam,alasan_out
			)
			VALUES(
				v_rec.id_kontrak_sewa_retur , v_id_pembayaran,v_nominal_retur_out, now(),p_kode_pengguna, 'FDP ' || p_id_berhenti::text
			);
			v_jumlah_tagihan_sisa := v_jumlah_tagihan_sisa - v_nominal_retur_out;
			if v_jumlah_tagihan_sisa<=0 then
				exit retur_out_pembayaran;
			end if;
		end loop retur_out_pembayaran;
	
		-- jika masih ada tagihan sisa, keluarkan dari deposit
		if v_jumlah_tagihan_sisa>0  and v_jumlah_deposit >=v_jumlah_tagihan_sisa then
			
			<<deposit_out_pembayaran>>
			for v_rec in
--				select *
--				from invoice_entries_invdpst
--				where id_kontrak_sewa=v_id_kontrak_sewa and aktif and status='I'
--					and nominal_akhir - coalesce (nominal_out,0::numeric) >0
				select iei.*
				from invoice i 
					inner join invoice_entries ie on i.no_invoice =ie.no_invoice and ie.kode_invoice_entries ='INVDPST'
					inner join invoice_entries_invdpst iei on iei.id_invoice_entries_invdpst =ie.ref_id_invoice_entries
				where i.aktif  and i.flag_rekon 
				and i.id_kontrak_sewa =v_id_kontrak_sewa
			loop
				v_nominal_deposit_out := case 
					when v_jumlah_tagihan_sisa>=v_rec.nominal_akhir - coalesce(v_rec.nominal_out,0::numeric) then  v_rec.nominal_akhir - coalesce(v_rec.nominal_out,0::numeric)
					else v_jumlah_tagihan_sisa 
				end;
				INSERT INTO invoice_entries_invdpst_out(
					id_invoice_entries_invdpst, nominal_out, alasan_out, tgl_rekam, petugas_rekam
				)
				VALUES(
					v_rec.id_invoice_entries_invdpst,v_nominal_deposit_out,'FDP '  || p_id_berhenti::text || ' ' || v_id_pembayaran::text, now(),p_kode_pengguna 
				);
				
				update invoice_entries_invdpst 
				set nominal_out = coalesce(nominal_out,0::numeric) + v_nominal_deposit_out
				where id_invoice_entries_invdpst = v_rec.id_invoice_entries_invdpst ;
			
				v_jumlah_tagihan_sisa := v_jumlah_tagihan_sisa -  v_nominal_deposit_out;
				if v_jumlah_tagihan_sisa<=0 then
					exit deposit_out_pembayaran;
				end if;
			end loop deposit_out_pembayaran;		
		end if;
	end if;
	
	-- seharusnya tagihan sisa =0 dan sisa retur yang belum out + deposit yang belum out harusnya = coalesce(v_jumlah_kembali,0::numeric)
	-- outkan semua retur dan deposit untuk di kembalikan ke penyewa
	v_sum_out := 0;
	for v_rec in
		select * from kontrak_sewa_retur ksr 
		where aktif and id_kontrak_sewa =v_id_kontrak_sewa
				and  nominal_retur_in-nominal_retur_out>0
	loop
		update kontrak_sewa_retur 
		set 
			nominal_retur_out = v_rec.nominal_retur_in,
			tgl_ubah=now(),
			petugas_ubah = p_kode_pengguna
		where id_kontrak_sewa_retur =v_rec.id_kontrak_sewa_retur ;
			
		INSERT INTO kontrak_sewa_retur_out(
			id_kontrak_sewa_retur, id_pembayaran, nominal_retur_out,  tgl_rekam, petugas_rekam,alasan_out
		)
		VALUES(
			v_rec.id_kontrak_sewa_retur , v_id_pembayaran,v_rec.nominal_retur_in-v_rec.nominal_retur_out, now(),v_kode_penggguna, 'FD ' || p_id_berhenti::text
		);
		v_sum_out := v_sum_out + v_rec.nominal_retur_in-v_rec.nominal_retur_out;
	end loop;

	for v_rec in
		select *
		from invoice_entries_invdpst
		where id_kontrak_sewa=v_id_kontrak_sewa and aktif and status='I'
			and nominal_akhir - coalesce (nominal_out,0::numeric) >0
	loop
		INSERT INTO invoice_entries_invdpst_out(
			id_invoice_entries_invdpst, nominal_out, alasan_out, tgl_rekam, petugas_rekam
		)
		VALUES(
			v_rec.id_invoice_entries_invdpst,v_rec.nominal_akhir - coalesce (v_rec.nominal_out,0::numeric),'FD '  || p_id_berhenti::text , now(),p_kode_pengguna 
		);
		
		update invoice_entries_invdpst 
		set nominal_out = nominal_akhir 
		where id_invoice_entries_invdpst = v_rec.id_invoice_entries_invdpst ;
	
		v_sum_out := v_sum_out + v_rec.nominal_akhir - coalesce (v_rec.nominal_out,0::numeric);
	end loop;

	raise notice 'kembali: % --- sumout: %', v_jumlah_kembali,v_sum_out;
	-- updata data kontrak berhenti
	update kontrak_sewa_berhenti 
	set
		is_finalisasi_deposit =true,
		finalisasi_deposit_date = now(),
		finalisasi_deposit = coalesce(v_jumlah_deposit,0::numeric),
		finalisasi_retur =coalesce(v_jumlah_retur,0::numeric),
		finalisasi_tagihan_sisa = coalesce (v_jumlah_tagihan,0::numeric),
		finalisasi_kurang_bayar = coalesce(v_jumlah_kurang_bayar,0::numeric),
--		finalisasi_pembayarang_krg_byr = coalesce (p_nominal_bayar,0::numeric),
		finalisasi_kembali = coalesce(v_jumlah_kembali,0::numeric),
		finalisasi_deposit_petugas=p_kode_pengguna
	where id_berhenti = p_id_berhenti;
		
	
			raise notice 'debug';
	return ('{"ret":0,"idKontrakSewa":'|| v_id_kontrak_sewa::text
		||',"sisaTagihan":'|| coalesce(v_jumlah_tagihan,0::numeric)::text
		||',"deposit":'|| coalesce(v_jumlah_deposit,0::numeric)::text
		||',"retur":'|| coalesce(v_jumlah_retur,0::numeric)::text
		||',"kurangBayar":'|| coalesce(v_jumlah_kurang_bayar,0::numeric)::text
--		||',"nominalBayar":'|| coalesce (p_nominal_bayar,0::numeric)::text
		||',"pengembalian":'|| coalesce(v_jumlah_kembali,0::numeric)::text
		|| '}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 431 (class 1255 OID 37839)
-- Name: f_kontrak_berhenti_submit(character varying, bigint, date, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_berhenti_submit(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_tgl_req_berhenti_sewa date, p_tipe_berakhir character varying, p_alasan_berakhir character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_status json;
	v_id_kontrak_sewa bigint;
	v_status_berhenti varchar(1);
	v_id_berhenti bigint;
	v_ret json;
BEGIN
	-- cek status kontrak
	v_status := f_kontrak_cek_status(p_id_kontrak_sewa);
	if (v_status->>'status')::text not in ('B','BE') then
		return ('{"ret":-1,"msg":"'||(v_status->>'msg')::text||'"}')::json;
	end if;
	
	-- cek tgl_req_berhenti
	if p_tgl_req_berhenti_sewa>(v_status->>'tglBerakhirSewa')::date then
		return ('{"ret":-1,"msg":"Tgl req berhenti tidak boleh melebihi tgl akhir sewa","tglBerakhirSewa":"'||(v_status->>'tglBerakhirSewa')::text||'"}')::json;
	end if;
	
	select id_kontrak_sewa , status
	into v_id_kontrak_sewa,v_status_berhenti
	from kontrak_sewa_berhenti where id_kontrak_sewa=p_id_kontrak_sewa and aktif;
	
	if v_id_kontrak_sewa is null then
		INSERT INTO kontrak_sewa_berhenti(
			id_kontrak_sewa, tgl_req_berhenti_sewa, tipe_berakhir, alasan_berakhir,tgl_rekam, petugas_rekam
		)
		VALUES (
			p_id_kontrak_sewa, p_tgl_req_berhenti_sewa, p_tipe_berakhir, p_alasan_berakhir,now(), p_kode_pengguna
		) returning id_berhenti
		into v_id_berhenti;
	elsif v_status_berhenti in ('D','R') then
		update kontrak_sewa_berhenti
		set
			tgl_req_berhenti_sewa=p_tgl_req_berhenti_sewa, 
			tipe_berakhir=p_tipe_berakhir, 
			alasan_berakhir=p_alasan_berakhir,
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where id_kontrak_sewa=p_id_kontrak_sewa;
	else
		return '{"ret":-2,"msg":"Sudah ada pengajuan berhenti kontrak dengan status bukan Draft/Reject"}'::json;
	end if;
	
	-- saat ini kontrak berhenti tidak perlu approval
	v_ret := f_kontrak_berhenti_approve(p_kode_pengguna,v_id_berhenti,true,'Approve by system');
	return ('{"ret":0,"Action":"inserted","idBerhenti":'||v_id_berhenti::text||'}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 432 (class 1255 OID 37840)
-- Name: f_kontrak_cek_status(bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_cek_status(p_id_kontrak_sewa bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_approval boolean;
	v_tgl_mulai_sewa date;
	v_kontrak_berlaku boolean;
	v_aktif boolean;
	v_kontrak_berakhir boolean;
	v_kontrak_berakhir_tgl date;
	v_last_date date;
	v_json json;
BEGIN		
	select kontrak.approval,kontrak.tgl_mulai_sewa, kontrak_berlaku, kontrak.aktif,kontrak_berakhir,kontrak_berakhir_tgl , max(case when adendum.id_adendum is null then kontrak.tgl_berakhir_sewa else adendum.tgl_berakhir_sewa end)
	into v_approval,v_tgl_mulai_sewa, v_kontrak_berlaku, v_aktif,v_kontrak_berakhir,v_kontrak_berakhir_tgl,v_last_date
	from 
		kontrak_sewa kontrak
		left outer join kontrak_sewa_adendum adendum on kontrak.id_Kontrak_sewa=adendum.id_kontrak_sewa and adendum.aktif and adendum.adendum_berlaku 
	where kontrak.id_kontrak_sewa=p_id_kontrak_sewa and kontrak.aktif
	group by kontrak.approval,kontrak.tgl_mulai_sewa, kontrak_berlaku, kontrak.aktif,kontrak_berakhir,kontrak_berakhir_tgl ;
	if v_approval is null then
		return '{"ret":0,"msg":"Kontrak tidak ditemukan",status":"NE"}'::json;
	elsif not v_aktif then
		return ('{"ret":0,"msg":"Kontrak belum aktif","status":"N","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif not v_approval then
		return ('{"ret":0,"msg":"Kontrak sudah submit tetapi belum approve","status":"S","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and not v_kontrak_berlaku then
		return ('{"ret":0,"msg":"Sudah Approve tapi belum  berlaku","status":"A","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and  v_kontrak_berlaku and current_date<v_tgl_mulai_sewa then
		return ('{"ret":0,"msg":"sudah approve dan sudah berlaku tapi belum masuk tgl_mulai_sewa","status":"AB","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and  v_kontrak_berlaku and current_date>=v_tgl_mulai_sewa and current_date<=v_last_date and (v_kontrak_berakhir_tgl is null or current_date<=v_kontrak_berakhir_tgl) then
		return ('{"ret":0,"msg":"Aktif berjalan","status":"B","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and  v_kontrak_berlaku and current_date>=v_tgl_mulai_sewa and current_date<=v_last_date and (v_kontrak_berakhir_tgl is null or current_date<=v_kontrak_berakhir_tgl) and v_kontrak_berakhir then
		return ('{"ret":0,"msg":"Masih Aktif berjalan dan belum finalisasi proses berhenti tapi sudah lewat tgl akhir sewa","status":"BH","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and  v_kontrak_berlaku and current_date>=v_tgl_mulai_sewa and not v_kontrak_berakhir and current_date>v_last_date then
		return ('{"ret":0,"msg":"Masih Aktif berjalan tetapi sudah finalisasi proses berhenti dan belum lewat tgl berhenti","status":"BE","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	elsif v_approval and  v_kontrak_berlaku and current_date>=v_tgl_mulai_sewa and v_kontrak_berakhir and current_date>v_kontrak_berakhir_tgl then
		return ('{"ret":0,"msg":"Sudah Berhenti/Berakhir","status":"H","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	else
		return ('{"ret":0,"msg":"Status lainnya","status":"O","approved":'||v_approval::text||',"tglMulaiSewa":"'||v_tgl_mulai_sewa::date||'","berlaku":'||v_kontrak_berlaku::text||',"aktif":'||v_aktif::text||',"berakhir":'||v_kontrak_berakhir::text||',"tglBerhenti":"'||coalesce(v_kontrak_berakhir_tgl::text,''::text)||'","tglBerakhirSewa":"'||v_last_date::text||'"}')::json;
	end if;
exception
	when others then
		return '{"ret":-1,"msg":"Error pengecekan status","status":"E"}'::json;
END;
$$;


--
-- TOC entry 433 (class 1255 OID 37841)
-- Name: f_kontrak_fasilitas_unit_add(character varying, bigint, integer, character varying, date, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_fasilitas_unit_add(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_id_unit integer, p_kode_fasilitas character varying, p_tgl_sewa_fasilitas date, p_tgl_berhenti_fasilitas date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_kontrak_sewa_fasilitas_unit bigint;
	v_tgl_awal_kontrak date;
	v_tgl_akhir_kontrak date;
	v_action varchar(20):='';
BEGIN
	if p_tgl_berhenti_fasilitas<p_tgl_sewa_fasilitas then
		return '{"ret":-1,"msg":"Tgl berhenti sewa fasilitas harus lebih besara dari tanggal munlai sewa fasilitas"}'::json;
	end if;
	-- check jika id_unit terdaftar dalam kontrak
	if not exists (select null from kontrak_sewa_unit  
				   where id_kontrak_sewa=p_id_kontrak_sewa and id_unit=p_id_unit) then
		return '{"ret":-2,"msg":"Unit tidak terdaftar pada kontrak tersebut"}'::json;
	end if;
	-- check jika ada fasilitas_unit untuk id_unit dan kode_fasilitas tersebut yang  ambil periodenya
	if exists(select null from kontrak_sewa_fasilitas_unit where id_kontrak_sewa=p_id_kontrak_sewa and id_unit=p_id_unit and kode_fasilitas=p_kode_fasilitas 
			  and p_tgl_sewa_fasilitas <=tgl_berhenti_fasilitas and aktif) then
		return '{"ret":-3,"msg":"Sudah ada fasilitas sewa untuk unit tersebut yang belum berakhir pada tanggal sewa yang di minta(inout)"}'::json;
	end if;
	
	-- get tgl_awal dan akhir kontrak
	select tgl_mulai_sewa into v_tgl_awal_kontrak from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa;
	v_tgl_akhir_kontrak := f_kontrak_last_date_get(p_id_kontrak_sewa);
	
	-- check jika periode  sewa fasilitas di dalam periode kontrak sewa
	if not (p_tgl_sewa_fasilitas>=v_tgl_awal_kontrak and p_tgl_berhenti_fasilitas<=v_tgl_akhir_kontrak) then
		return '{"ret":-4,"msg":"Pastikan tgl sewa fasilitas di dalam periode sewa kontrak"}'::json;
	end if;

	-- Untuk sementara langsung sumbit approval dan approve (tidak ada approval)
	INSERT INTO kontrak_sewa_fasilitas_unit(
		 id_kontrak_sewa, id_unit, kode_fasilitas, tgl_sewa_fasilitas, status, approval, tgl_rekam, petugas_rekam, tgl_berhenti_fasilitas
	)
	VALUES (
		p_id_kontrak_sewa, p_id_unit, p_kode_fasilitas, p_tgl_sewa_fasilitas, 'S', true, now(), p_kode_pengguna, p_tgl_berhenti_fasilitas
	)
	returning id_kontrak_sewa_fasilitas_unit
	into v_id_kontrak_sewa_fasilitas_unit;
	v_action := 'Inserted';
	
	return ('{"ret":0,"Action":"'|| v_action || '","id":'|| v_id_kontrak_sewa_fasilitas_unit::text ||'}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 434 (class 1255 OID 37842)
-- Name: f_kontrak_fasilitas_unit_delete(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_fasilitas_unit_delete(p_kode_pengguna character varying, p_id_kontrak_sewa_fasilitas_unit bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_kontrak_sewa_fasilitas_unit bigint;
	v_tgl_sewa_fasilitas date;
	v_tgl_berhenti_fasilitas date;
	v_action varchar(20):='';
BEGIN
	select id_kontrak_sewa_fasilitas_unit,tgl_sewa_fasilitas,tgl_berhenti_fasilitas
	into v_id_kontrak_sewa_fasilitas_unit,v_tgl_sewa_fasilitas,v_tgl_berhenti_fasilitas
	from kontrak_sewa_fasilitas_unit where id_kontrak_sewa_fasilitas_unit =p_id_kontrak_sewa_fasilitas_unit and aktif;
	
	if v_id_kontrak_sewa_fasilitas_unit is null then
		return '{"ret":-1,"msg":"Tidak ditemukan  kontrak sewa aktif untuk id tersebut"}'::json;
	end if;
	if current_date>v_tgl_sewa_fasilitas then
		return '{"ret":-2,"msg":"Kontrak yang tanggal sewa nya hari ini dan setelahnya yang bisa di non aktifkan"}'::json;
	end if;
	
	UPDATE kontrak_sewa_fasilitas_unit
	SET 
		aktif=false,
		tgl_na=now(), 
		petugas_na=p_kode_pengguna
	where id_kontrak_sewa_fasilitas_unit=p_id_kontrak_sewa_fasilitas_unit;
	v_action := 'Non Aktivate';
	
	return ('{"ret":0,"Action":"'|| v_action || '","id":'|| v_id_kontrak_sewa_fasilitas_unit::text ||'}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 435 (class 1255 OID 37843)
-- Name: f_kontrak_fasilitas_unit_edit(character varying, bigint, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_fasilitas_unit_edit(p_kode_pengguna character varying, p_id_kontrak_sewa_fasilitas_unit bigint, p_tgl_berhenti_fasilitas date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_kontrak_sewa_fasilitas_unit bigint;
	v_tgl_akhir_kontrak date;
	v_action varchar(20):='';
BEGIN
	select  f_kontrak_last_date_get(id_kontrak_sewa) 
	into v_tgl_akhir_kontrak
	from kontrak_sewa_fasilitas_unit
	where id_kontrak_sewa_fasilitas_unit=p_id_kontrak_sewa_fasilitas_unit;
	
	if v_tgl_akhir_kontrak is null then 
		return '{"ret":-1,"msg":"Kontrak tidak ditemukan"}'::json;
	end if;
	if p_tgl_berhenti_fasilitas>v_tgl_akhir_kontrak then
		return '{"ret":-2,"msg":"Tgl berhenti sewa fasilitas harus kurang dari tanggal berakhir kontrak sewa"}'::json;
	end if;
	
	-- Yang bisa di edit adalah tanggal berakhir sewa saja.
	UPDATE kontrak_sewa_fasilitas_unit
	SET 
		tgl_berhenti_fasilitas=p_tgl_berhenti_fasilitas,
		tgl_ubah=now(), 
		petugas_ubah=p_kode_pengguna
	where id_kontrak_sewa_fasilitas_unit=p_id_kontrak_sewa_fasilitas_unit
	returning id_kontrak_sewa_fasilitas_unit
	into v_id_kontrak_sewa_fasilitas_unit;
	v_action := 'Updated';
	
	return ('{"ret":0,"Action":"'|| v_action || '","id":'|| v_id_kontrak_sewa_fasilitas_unit::text ||'}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 436 (class 1255 OID 37844)
-- Name: f_kontrak_generate_no(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_generate_no(p_kode_rusun character varying) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_kode_rusun varchar(5);
	v_initial_nama_rusun varchar(5);
	v_initial_nama_daerah varchar(5);
	v_no_kontrak_sewa varchar(50) := '';
	v_bulan_tahun varchar(6) :=  to_char(current_date,'MMYYYY');
	v_no_terakhir int ;
BEGIN
	select kode_rusun,initial_nama_rusun, initial_nama_daerah
	into v_kode_rusun,v_initial_nama_rusun, v_initial_nama_daerah
	from rusun 
	where kode_rusun=p_kode_rusun;
	if v_kode_rusun is null then
		return '';
	end if;
-- 	v_no_kontrak_sewa :=  v_no_kontrak_sewa || '/' || v_kode_rusun;
	if coalesce(v_initial_nama_rusun,'')<>'' then
		v_no_kontrak_sewa :=  v_no_kontrak_sewa || '/' || v_initial_nama_rusun;
	end if;
	if coalesce(v_initial_nama_daerah,'')<>'' then
		v_no_kontrak_sewa :=  v_no_kontrak_sewa || '/' || v_initial_nama_daerah;
	end if;
	if v_no_kontrak_sewa='' then
		v_no_kontrak_sewa := '/' || v_kode_rusun;
	end if;
	
	select no_terakhir
	into v_no_terakhir
	from kontrak_sewa_no_perjanjian
	where 
		coalesce(initial_nama_rusun,'')=coalesce(v_initial_nama_rusun,'')
		and coalesce(initial_nama_daerah,'')=coalesce(v_initial_nama_daerah,'')
		and bulan_tahun=v_bulan_tahun;
	raise notice '%-%-%', v_initial_nama_rusun, v_initial_nama_daerah, v_bulan_tahun;
	if v_no_terakhir is null then
		insert into kontrak_sewa_no_perjanjian(bulan_tahun,initial_nama_rusun,initial_nama_daerah,no_terakhir)
		values (v_bulan_tahun,v_initial_nama_rusun,v_initial_nama_daerah,1);
		return '0001'::text || v_no_kontrak_sewa || '/' || v_bulan_tahun;
	else
		update kontrak_sewa_no_perjanjian
		set
			no_terakhir=v_no_terakhir+1
		where 
			coalesce(initial_nama_rusun,'')=coalesce(v_initial_nama_rusun,'')
			and coalesce(initial_nama_daerah,'')=coalesce(v_initial_nama_daerah,'')
			and bulan_tahun=v_bulan_tahun
		returning lpad(no_terakhir::text,4,'0') ||  v_no_kontrak_sewa || '/' || v_bulan_tahun
		into v_no_kontrak_sewa;
		return v_no_kontrak_sewa;
	end if;
	
exception
	when others then
		return '' ;
END;
$$;


--
-- TOC entry 437 (class 1255 OID 37845)
-- Name: f_kontrak_inventaris_create(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_inventaris_create(p_kode_pengguna character varying, p_id_kontrak_sewa bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_tgl_mulai_sewa date;
	v_rec record;
BEGIN
	raise notice 'check if kontrak is approved and get tgl_mulai sewa';
	select tgl_mulai_sewa 
	into v_tgl_mulai_sewa
	from kontrak_sewa 
	where id_kontrak_sewa=p_id_kontrak_sewa and approval and aktif;
	if v_tgl_mulai_sewa is null then
		return '{"ret":-1,"msg":"Kontrak sewa yang sudah di approve tidak ditemukan"}'::json ;
	end if;
	raise notice 'get all aset list in unit that as inventaris_unit is true';
	for v_rec in
		WITH cte AS(
			select 
				RANK () OVER ( 
					PARTITION BY kontrak_unit.id_unit
					ORDER BY aset_p.id_aset_penempatan DESC ,aset_k.id_aset_kondisi DESC 
				) kondisi_rank,
			kontrak_unit.id_unit,aset.kode_aset,tgl_penempatan,tgl_kondisi,aset_k.kondisi_aset, biaya_kerusakan, biaya_kehilangan
			from 
				aset
				inner join aset_penempatan aset_p on aset.kode_aset=aset_p.kode_aset and aset_p.tgl_penempatan<=v_tgl_mulai_sewa
				inner join kontrak_sewa_unit kontrak_unit on aset_p.lokasi_unit=kontrak_unit.id_unit
				left outer join aset_kondisi  aset_k on aset.kode_aset=aset_k.kode_aset and aset_k.tgl_kondisi<=v_tgl_mulai_sewa
			where as_inventaris_unit and id_kontrak_sewa=p_id_kontrak_sewa
		)
		select * from cte 
		where kondisi_rank=1
	loop
		INSERT INTO kontrak_sewa_inventaris_items(
		 	id_kontrak_sewa, id_unit, kode_aset, tgl_penempatan_in, 
			kondisi_awal,tgl_kondisi_awal, 
			biaya_kerusakan, biaya_kehilangan, 
			tgl_rekam, petugas_rekam
		)
		VALUES (
			p_id_kontrak_sewa,v_rec.id_unit,v_rec.kode_aset,v_rec.tgl_penempatan,
			v_rec.kondisi_aset,v_rec.tgl_kondisi,
			v_rec.biaya_kerusakan,v_rec.biaya_kehilangan,
			now(),p_kode_pengguna
		);
	end loop;
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 438 (class 1255 OID 37846)
-- Name: f_kontrak_inventaris_kondisi_check_n_update(character varying, character varying, character varying, character varying, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_inventaris_kondisi_check_n_update(p_kode_pengguna character varying, p_kode_aset character varying, p_kondisi_aset_awal character varying, p_kondisi_aset_akhir character varying, p_kondisi_date date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE 	
   	v_biaya_kerusakan numeric(22,2);
    v_biaya_kehilangan numeric(22,2);
	v_rec record;
BEGIN
	raise notice 'loop for  kode_aset if exists in aktif inventaris kontrak and does not  have kondisi_akhir';
	if p_kondisi_aset_awal<>p_kondisi_aset_akhir then
		for v_rec in
			select 
				id_inventaris_unit ,aktif_kontrak,id_kontrak_sewa,
				id_unit, kode_aset, tgl_penempatan_in, 
				kondisi_awal,tgl_kondisi_awal, 
				biaya_kerusakan, biaya_kehilangan
			from kontrak_sewa_inventaris_items
			where aktif_kontrak and kondisi_akhir is null and kode_aset=p_kode_aset 
		loop
			raise notice 'Update kondisi akhir inventaris unit';
			update kontrak_sewa_inventaris_items
			set
				kondisi_akhir=p_kondisi_aset_akhir,
				tgl_kondisi_akhir=p_kondisi_date,
				tgl_ubah=now(),
				petugas_ubah=p_kode_pengguna
			where 
				id_inventaris_unit=v_rec.id_inventaris_unit;
			
			raise notice 'If kontrak not in process berhenti(in active kontrak) then add new row for new condition';
			if not exists (select null from kontrak_sewa_berhenti where aktif and approval and id_kontrak_sewa=v_rec.id_kontrak_sewa) and v_rec.aktif_kontrak then 
				raise notice 'get biaya kerusakan and biaya kehilangan';
				select biaya_kerusakan, biaya_kehilangan
				into v_biaya_kerusakan, v_biaya_kehilangan
				from aset where kode_aset=p_kode_aset;
				
				raise notice 'insert new data';
				INSERT INTO kontrak_sewa_inventaris_items(
					id_kontrak_sewa, id_unit, kode_aset, tgl_penempatan_in, 
					kondisi_awal,tgl_kondisi_awal, 
					biaya_kerusakan, biaya_kehilangan, 
					tgl_rekam, petugas_rekam
				)
				VALUES (
					v_rec.id_kontrak_sewa,v_rec.id_unit,p_kode_aset,v_rec.tgl_penempatan_in,
					p_kondisi_aset_akhir,p_kondisi_date,
					v_biaya_kerusakan,v_biaya_kehilangan,
					now(),p_kode_pengguna
				);
			end if;
		end loop;
	end if;
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 439 (class 1255 OID 37847)
-- Name: f_kontrak_inventaris_penempatan_check_n_update(character varying, character varying, integer, integer, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_inventaris_penempatan_check_n_update(p_kode_pengguna character varying, p_kode_aset character varying, p_penempatan_aset_awal integer, p_penempatan_aset_akhir integer, p_penempatan_date date) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE 
	v_kondisi_aset varchar(2);
	v_tgl_kondisi date;
	
   	v_biaya_kerusakan numeric(22,2);
    v_biaya_kehilangan numeric(22,2);
	v_rec record;
BEGIN
	raise notice 'loop for  kode_aset if exists in aktif inventaris kontrak and does not  have kondisi_akhir';
	if p_penempatan_aset_awal is null or  p_penempatan_aset_awal<>p_penempatan_aset_akhir then
		raise notice 'get kondisi on out';
		select kondisi_aset,tgl_kondisi
		into v_kondisi_aset,v_tgl_kondisi
		from aset_kondisi where kode_aset=p_kode_aset and tgl_kondisi<=p_penempatan_date
		order by tgl_kondisi desc limit 1;
		
		raise notice 'get biaya kerusakan and biaya kehilangan';
		select biaya_kerusakan, biaya_kehilangan
		into v_biaya_kerusakan, v_biaya_kehilangan
		from aset where kode_aset=p_kode_aset;
		
		
		raise notice 'take out aset from src unit'; 
		for v_rec in
			select 
				ksii.id_inventaris_unit 
			from 
				kontrak_sewa_inventaris_items ksii 
				inner join kontrak_sewa ks on (
					ks.aktif
					and ks.id_kontrak_sewa =ksii.id_kontrak_sewa 
					and p_penempatan_date<=case
										when kontrak_berakhir then tgl_berakhir_sewa 
										when tgl_berakhir_adendum is not null  then tgl_berakhir_adendum
										else tgl_berakhir_sewa
									end 
				)
			where ksii.aktif and ksii.tgl_penempatan_out is null and kode_aset=p_kode_aset and id_unit=p_penempatan_aset_awal and aktif_kontrak
		loop 			
			update kontrak_sewa_inventaris_items
			set
				tgl_penempatan_out=p_penempatan_date,
				kondisi_akhir=case when kondisi_akhir is null then v_kondisi_aset else kondisi_akhir end,
				tgl_kondisi_akhir=case when kondisi_akhir is null then v_tgl_kondisi else tgl_kondisi_akhir end,
				tgl_ubah=now(),
				petugas_ubah=p_kode_pengguna
			where 
				id_inventaris_unit = v_rec.id_inventaris_unit;
		end loop;
	
		raise notice 'insert into dst unit in kontrak aktif';
		for v_rec in
			select distinct kontrak.id_kontrak_sewa 
			from
				kontrak_sewa kontrak 
				inner join kontrak_sewa_unit kontrak_unit on kontrak.id_kontrak_sewa=kontrak_unit.id_kontrak_sewa
			where kontrak_unit.id_unit=p_penempatan_aset_akhir and kontrak.aktif and kontrak.approval   
				and not kontrak_berakhir
		loop 
			INSERT INTO kontrak_sewa_inventaris_items(
				id_kontrak_sewa, id_unit, kode_aset, tgl_penempatan_in, 
				kondisi_awal,tgl_kondisi_awal, 
				biaya_kerusakan, biaya_kehilangan, 
				tgl_rekam, petugas_rekam
			)
			VALUES (
				v_rec.id_kontrak_sewa,p_penempatan_aset_akhir,p_kode_aset,p_penempatan_date,
				v_kondisi_aset,v_tgl_kondisi,
				v_biaya_kerusakan,v_biaya_kehilangan,
				now(),p_kode_pengguna
			);
		end loop;
	end if;
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 440 (class 1255 OID 37848)
-- Name: f_kontrak_lampiran_save(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_lampiran_save(p_kode_pengguna character varying, p_jenis_perjanjian character varying, p_no_perjanjian character varying, p_path_dokumen character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_kontrak_lampiran bigint;
BEGIN
	update kontrak_lampiran set aktif=false where no_perjanjian=p_no_perjanjian;
	
	INSERT INTO kontrak_lampiran(
	 	jenis_perjanjian, no_perjanjian, path_dokumen,tgl_rekam, petugas_rekam
	)
	VALUES (
		p_jenis_perjanjian, p_no_perjanjian, p_path_dokumen,now(),p_kode_pengguna
	) returning id_kontrak_lampiran
	into v_id_kontrak_lampiran;
	
	return ('{"ret":0,"id":'|| v_id_kontrak_lampiran::text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 441 (class 1255 OID 37849)
-- Name: f_kontrak_last_date_get(bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_last_date_get(p_id_kontrak_sewa bigint) RETURNS date
    LANGUAGE plpgsql
    AS $$
declare
	v_date date;
BEGIN	
	select 
		case 
			when kontrak.kontrak_berakhir then kontrak.kontrak_berakhir_tgl
			when kontrak.tgl_berakhir_adendum is not null then kontrak.tgl_berakhir_adendum
			else kontrak.tgl_berakhir_sewa
		end 
	into v_date
	from 
		kontrak_sewa kontrak
	where kontrak.id_kontrak_sewa=p_id_kontrak_sewa;
	
	return v_date;
exception
	when others then
		return  null::date;
END;
$$;


--
-- TOC entry 442 (class 1255 OID 37850)
-- Name: f_kontrak_periode_sewa_by_blth_get(bigint, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_kontrak_periode_sewa_by_blth_get(p_id_kontrak_sewa bigint, p_blth character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_tgl_mulai_sewa date;
	v_blth_akhir varchar(8);
	v_tgl_awal date;
  	v_tgl_akhir date;
	v_rslt json;
	v_id_kontrak_sewa bigint;
	v_rec record;
	v_tarifs json;
	v_tarif json;
	v_blth varchar(8);
BEGIN	
	raise notice 'check jika kontrak dalam posisi submit';
	select tgl_mulai_sewa 
	into v_tgl_mulai_sewa
	from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa and aktif ; --and  approval;
	if v_tgl_mulai_sewa is null then
		return '{"ret":-1,"msg":"tidak ada kontrak tersebut"}'::json;
	else
		v_blth_akhir :=to_char(to_date(p_blth,'YYYY-MM')+ interval '1 month','YYYY-MM');
		v_tgl_awal := case 
			when to_char(last_day(to_date(p_blth,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(p_blth,'YYYY-MM'))
			else (p_blth || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date
		end;
		v_tgl_akhir := case 
			when to_char(last_day(to_date(v_blth_akhir,'YYYY-MM')),'DD')<to_char(v_tgl_mulai_sewa,'DD') then last_day(to_date(v_blth_akhir,'YYYY-MM')) - interval '1 day'
			else (v_blth_akhir || '-' || to_char(v_tgl_mulai_sewa,'DD'))::date - interval '1 day'
		end;
		return ('{"ret":0,"blth":"'||p_blth||'","tglMasuk":"'|| v_tgl_mulai_sewa::text||'","periodeSewaAwal":"'|| v_tgl_awal::text||'","periodeSewaAkhir":"'|| v_tgl_akhir::text||'"}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 443 (class 1255 OID 37851)
-- Name: f_listrik_log_cancel(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_listrik_log_cancel(p_kode_pengguna character varying, p_id_meter_log bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_listrik_meter_log bigint;
	v_id_unit int;
	v_use_in_billing boolean:=false;
BEGIN
	raise notice 'cek if exists log on id meter log';
	select id_listrik_meter_log,use_in_billing,id_unit
	into v_id_listrik_meter_log,v_use_in_billing,v_id_unit
	from listrik_meter_log
	where id_listrik_meter_log=p_id_meter_log and aktif;
	
	if v_id_listrik_meter_log is null then
		return '{"ret":-1,"msg":"Tidak ada id pencatatan"}'::json ;
	elsif v_use_in_billing then
		return '{"ret":-2,"msg":"Sudah digunakan pada entri billing, cancel dulu entrinya"}'::json ;
	else
		select id_listrik_meter_log
		into v_id_listrik_meter_log
		from listrik_meter_log
		where id_unit=v_id_unit and aktif
		order by tgl_end_meter desc
		limit 1;
		
		if v_id_listrik_meter_log<>p_id_meter_log then
			return '{"ret":-3,"msg":"Bukan entri terakhir, tidak bisa di cancel"}'::json ;
		else
			update listrik_meter_log
			set
				aktif=false,
				tgl_na=now(),
				petugas_na=p_kode_pengguna
			where id_listrik_meter_log=p_id_meter_log ;
			-- update pencatatan terakhir
			
			select id_listrik_meter_log
			into v_id_listrik_meter_log
			from listrik_meter_log
			where id_unit=v_id_unit and aktif
			order by tgl_end_meter desc
			limit 1;
			if v_id_listrik_meter_log is not null then
				update listrik_meter_log
				set
					pencatatan_terakhir=true
				where id_listrik_meter_log=v_id_listrik_meter_log ;
			end if;
			return ('{"ret":0,"Action":"Deleted"}')::json;
		end if;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 444 (class 1255 OID 37852)
-- Name: f_listrik_log_submit(character varying, character varying, integer, date, date, integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_listrik_log_submit(p_kode_pengguna character varying, p_petugas_pencatat character varying, p_id_listrik_meter_log integer, p_tgl_start_meter date, p_tgl_end_meter date, p_meter_start integer, p_meter_end integer, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_id_listrik_meter_log bigint;
	v_tgl_pencatatan date;
	v_use_in_billing boolean:=false;
	v_id_unit int;
	
	v_id_listrik_meter_log1 bigint;
	v_tgl_start_meter1 date;
	v_tgl_end_meter1 date;
BEGIN	
	
	raise notice 'cek if exists log on tgl_pencatatan';
	select id_listrik_meter_log ,use_in_billing,id_unit
	into v_id_listrik_meter_log,v_use_in_billing,v_id_unit
	from listrik_meter_log 
	where aktif and id_listrik_meter_log=p_id_listrik_meter_log;
	
	if v_id_listrik_meter_log is  null then
		return '{"ret":-1,"msg":"Pencatatan tidak ditemukan"}'::json ;
	elsif v_use_in_billing then
		return '{"ret":-1,"msg":"Sudah menjadi Billing tidak bisa di edit"}'::json ;
	else
		raise notice 'get data pencatatan terakhir';
		select id_listrik_meter_log, tgl_start_meter,tgl_end_meter,use_in_billing
		into v_id_listrik_meter_log1, v_tgl_start_meter1,v_tgl_end_meter1,v_use_in_billing
		from listrik_meter_log 
		where aktif and id_unit=v_id_unit and pencatatan_terakhir;
		if p_id_listrik_meter_log<>v_id_listrik_meter_log1 then
			return '{"ret":-1,"msg":"Bukan pencatatan terakhir, tidak bisa di edit"}'::json ;
		elsif  p_tgl_start_meter<coalesce(v_tgl_start_meter1,p_tgl_start_meter) then
			return '{"ret":-1,"msg":"Pencatatan pada tgl start meter < tgl start meter pencatatan terakhir, hapus dulu pencatatan terakhir"}'::json ;
		elsif v_use_in_billing and p_tgl_start_meter>= v_tgl_start_meter1 and p_tgl_start_meter<v_tgl_end_meter1 then
			return '{"ret":-1,"msg":"Pencatatan pada tgl meter sudah ada  dan sudah di gunakan pada entri billing"}'::json ;
		elsif v_use_in_billing and p_tgl_end_meter<=v_tgl_end_meter1 then
			return '{"ret":-1,"msg":"Pencatatan pada tgl meter sudah ada  dan sudah di gunakan pada entri billing"}'::json ;
		elsif p_tgl_start_meter>= v_tgl_start_meter1 and p_tgl_start_meter<v_tgl_end_meter1 and v_id_listrik_meter_log1<>v_id_listrik_meter_log then
			return '{"ret":-1,"msg":"Sudah ada pencatatan pada tgl start meter dengan tgl pencatatan berbeda, hapus dulu pencatatan sebelumnya"}'::json ;
		else
			update listrik_meter_log
			set
				tgl_start_meter=p_tgl_start_meter, 
				tgl_end_meter=p_tgl_end_meter, 
				meter_start=p_meter_start, 
				meter_end=p_meter_end, 
				tahun_bulan= to_char(p_tgl_end_meter,'YYYY-MM'),
				meter_pemakaian=(p_meter_end-p_meter_start)::int, 
				keterangan=p_keterangan, 
				petugas_pencatat=p_petugas_pencatat, 
				tgl_ubah=now(), 
				petugas_ubah=p_kode_pengguna
			where id_listrik_meter_log=v_id_listrik_meter_log;
			return ('{"ret":0,"action":"Updated","id_meter_log":'|| v_id_listrik_meter_log::text ||'}')::json;
		end if;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 445 (class 1255 OID 37853)
-- Name: f_listrik_log_submit_masal(character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_listrik_log_submit_masal(p_kode_pengguna character varying, p_data_logs json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_json json;
	v_result json;
	v_response json[]:=ARRAY[]::json[];
BEGIN
	-- looping each data
	for v_json  IN  select json_array_elements(p_data_logs) 
	loop
		-- submit data
		select f_listrik_log_submit(
			p_kode_pengguna,
			(v_json->>'p_petugas_pencatat')::text,
			(v_json->>'p_id_unit')::int,
			(v_json->>'p_tgl_pencatatan')::date,
			(v_json->>'p_tgl_start_meter')::date,
			(v_json->>'p_tgl_end_meter')::date,
			(v_json->>'p_meter_start')::int,
			(v_json->>'p_meter_end')::int,
			'upload data'
		) into v_result;
		-- push the result from submit
		raise notice 'resul: %', v_result;
		if (v_result->>'ret')::int=0 then
			v_response := array_append(v_response,('{"ret":0,"id_unit":'|| (v_json->>'p_id_unit')::text||',"msg":"'|| (v_result->>'action')::text ||'"}')::json);
		else
			v_response := array_append(v_response,('{"ret":'|| (v_result->>'ret')::text || ',"id_unit":'|| (v_json->>'p_id_unit')::text||',"msg":"'|| (v_result->>'msg')::text ||'"}')::json);
		end if;
		raise notice 'response: %', v_response;
	end loop;
	return ('{"ret":0,"res":'|| array_to_json(v_response)::text ||'}')::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 446 (class 1255 OID 37854)
-- Name: f_mtnc_wo_assign(character varying, character varying, character varying, date, date, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_assign(p_kode_pengguna character varying, p_no_wo character varying, p_assigned_to character varying, p_assigned_work_start_date date, p_assigned_completion_target_date date, p_assigned_prioritas character varying, p_assigned_notes character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_wo varchar(50);
	v_action varchar(20):='asigned';
BEGIN
	update mtnc_wo
	set
		assigned_to=p_assigned_to, 
		assigned_work_start_date=p_assigned_work_start_date, 
		assigned_completion_target_date=p_assigned_completion_target_date, 
		assigned_prioritas=p_assigned_prioritas, 
		assigned_notes=p_assigned_notes,
		assigned_petugas =p_kode_pengguna,
		status='A',
		assigned=true,
		tgl_ubah=now(),
		petugas_ubah=p_kode_pengguna
	where 
		no_wo=p_no_wo and aktif and status='N'
	returning no_wo
	into v_no_wo;
	
	if v_no_wo is not null then
		return ('{"ret":0,"Action":"inserted","noKomplain":"' || v_no_wo || '"}')::json;	
	else 
		return ('{"ret":-1,"msg":"Error  assignment, hanya wo dengan status N yang bisa di assign"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 447 (class 1255 OID 37855)
-- Name: f_mtnc_wo_cancel(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_cancel(p_kode_pengguna character varying, p_no_wo character varying, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_wo varchar(50);
	v_action varchar(20):='asigned';
BEGIN
	update mtnc_wo
	set
		aktif=false,
		tgl_na=now(),
		alasan_na=p_alasan_na,
		petugas_na=p_kode_pengguna
	where 
		no_wo=p_no_wo and aktif and status='N'
	returning no_wo
	into v_no_wo;
	
	if v_no_wo is not null then
		return ('{"ret":0,"Action":"cancelled","noKomplain":"' || v_no_wo || '"}')::json;	
	else 
		return ('{"ret":-1,"msg":"Error  cance, hanya wo dengan status N yang bisa di cancel"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 448 (class 1255 OID 37856)
-- Name: f_mtnc_wo_lampiran_delete(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_lampiran_delete(p_kode_pengguna character varying, p_id_wo_lampiran bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
BEGIN
	delete from mtnc_wo_lampiran
	where id_wo_lampiran =p_id_wo_lampiran;
	
	return ('{"ret":0,"action":"deleted"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 449 (class 1255 OID 37857)
-- Name: f_mtnc_wo_lampiran_save(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_lampiran_save(p_kode_pengguna character varying, p_no_wo character varying, p_nama_dokumen character varying, p_path_dokumen character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_wo_lampiran bigint;
BEGIN
	INSERT INTO mtnc_wo_lampiran(
	 	no_wo, nama_dokumen, path_dokumen,tgl_rekam, petugas_rekam
	)
	VALUES (
		p_no_wo, p_nama_dokumen, p_path_dokumen,now(),p_kode_pengguna
	) returning id_wo_lampiran
	into v_id_wo_lampiran;
	return ('{"ret":0,"id":'|| v_id_wo_lampiran::text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 450 (class 1255 OID 37858)
-- Name: f_mtnc_wo_result_submit(character varying, character varying, date, character varying, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_result_submit(p_kode_pengguna character varying, p_no_wo character varying, p_completion_actual_date date, p_completion_status character varying, p_completion_notes text) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_wo varchar(50);
	v_ref_id varchar(50);
	v_action varchar(20):='asigned';
BEGIN
	update mtnc_wo
	set
		completion_actual_date=p_completion_actual_date, 
		completion_status=p_completion_status, 
		completion_notes=p_completion_notes,
		status='C',
		tgl_ubah=now(),
		petugas_ubah=p_kode_pengguna
	where 
		no_wo=p_no_wo and aktif and status='A'
	returning no_wo,ref_id
	into v_no_wo, v_ref_id;
		
	if v_ref_id is not null then 
		if exists (select null from komplain where no_komplain=v_ref_id) then
			update komplain 
			set 
				status='C'
			where no_komplain=v_ref_id;
		end if;
		return ('{"ret":0,"Action":"inserted","noKomplain":"' || v_no_wo || '","noWO":"' || v_no_wo || '"}')::json;	
	else 
		return ('{"ret":-1,"msg":"Error submit Result"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 451 (class 1255 OID 37859)
-- Name: f_mtnc_wo_submit(character varying, character varying, character varying, integer, integer, integer, character varying, character varying, character varying, date, character varying, text, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_mtnc_wo_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_no_wo character varying, p_id_rusun_blok integer, p_id_lantai integer, p_id_unit integer, p_nama_requester character varying, p_jenis_lokasi character varying, p_lokasi character varying, p_req_completion_date date, p_title_wo character varying, p_deskripsi_wo text, p_kode_wo_tipe character varying, p_ref_id character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_no_wo varchar(50);
	v_id_rusun_blok int;
	v_id_lantai int;
	v_action varchar(20):='updated';
begin
	-- check if id_unit not null get id_rusun_blok and id_lantai

	v_id_rusun_blok:= p_id_rusun_blok;
	if p_id_lantai is not null then
		select rl.id_rusun_blok,rl.id_lantai
		into v_id_rusun_blok,v_id_lantai
		from 
			rusun_lantai rl
		where rl.id_lantai=p_id_lantai;
	end if;
	if p_id_unit is not null then
		select rl.id_rusun_blok,rl.id_lantai
		into v_id_rusun_blok,v_id_lantai
		from 
			rusun_lantai rl
			inner join rusun_unit ru on rl.id_lantai=ru.id_lantai
		where ru.id_unit=p_id_unit;
	end if;

	-- do inert or update
	if coalesce(p_no_wo,'')='' then
		raise notice 'insert data %-%-%',v_id_rusun_blok,v_id_lantai, p_id_unit;
		INSERT INTO mtnc_wo(
			kode_rusun, tgl_request, nama_requester, jenis_lokasi, id_rusun_blok, id_lantai, id_unit, ref_id,
			lokasi, title_wo,deskripsi_wo, kode_wo_tipe, req_completion_date, tgl_rekam, petugas_rekam)
		values(
			p_kode_rusun, now(), p_nama_requester, p_jenis_lokasi, v_id_rusun_blok, v_id_lantai, p_id_unit, p_ref_id,
			p_lokasi, p_title_wo,p_deskripsi_wo, p_kode_wo_tipe, p_req_completion_date, now(), p_kode_pengguna
		)
		returning no_wo
		into v_no_wo;
		raise notice '1';

		return ('{"ret":0,"Action":"inserted","noKomplain":"' || v_no_wo || '"}')::json;	
	elsif not exists(select null from mtnc_wo where no_wo=p_no_wo and aktif) then
		return '{"ret":-1,"msg":"No WO TIdak ditemukan"}'::json ;
	elsif exists(select null from mtnc_wo where no_wo=p_no_wo and status='N' and aktif) then
		raise notice 'update data';
		update mtnc_wo
		set
			kode_rusun=p_kode_rusun, 	
			nama_requester=p_nama_requester, 
			jenis_lokasi=p_jenis_lokasi,  
			id_rusun_blok=v_id_rusun_blok,
			id_lantai=v_id_lantai, 
			id_unit=p_id_unit, 
			ref_id=p_ref_id,
			lokasi=p_lokasi, 
			title_wo=p_title_wo,
			deskripsi_wo=p_deskripsi_wo, 
			kode_wo_tipe=p_kode_wo_tipe, 
			req_completion_date=p_req_completion_date, 
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where no_wo=p_no_wo ;
		return ('{"ret":0,"Action":"Update","noKomplain":"' || p_no_wo || '"}')::json;	
	else
		return '{"ret":-1,"msg":"WO tidak bisa di edit}'::json ;
	end if;
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 452 (class 1255 OID 37860)
-- Name: f_pajak_tarif_sewa_unit_get(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pajak_tarif_sewa_unit_get(p_kode_rusun character varying) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_prosen_pajak numeric(7,2);
BEGIN
	select prosen_pajak
	into v_prosen_pajak
	from pajak_tarif_sewa_unit
	where kode_rusun=p_kode_rusun and aktif;
	
	return coalesce(v_prosen_pajak,10);
	
exception
	when others then
		return 0::numeric;
END;
$$;


--
-- TOC entry 453 (class 1255 OID 37861)
-- Name: f_pembayaran_bayar(character varying, bigint, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, numeric, numeric, boolean, character varying, json, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pembayaran_bayar(p_kode_pengguna character varying, p_id_kontrak_sewa bigint, p_tglbayar date, p_namapembayar character varying, p_mediapembayaran character varying, p_bankasal character varying, p_rekasal character varying, p_transferidasal character varying, p_bankpenerima character varying, p_rekpenerima character varying, p_nomtagihan numeric, p_nombayar numeric, p_nomterbayar numeric, p_nompengembalian numeric, p_depositkelebihanbayar boolean, p_keterangan character varying, p_distribusipembayaran json, p_pajak_dibayar_penyewa boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_rec record;
	
	v_rec_sewa record;
	v_total_tagihan numeric(18,2);
	v_total_pajak numeric(18,2):=0;
	v_count_tagihan smallint;
	
	v_total_tagihan_distribusi numeric(18,2);
	v_count_tagihan_distribusi smallint;
	
	--20201015 untuk keperluan ambil retur
	v_nombayar numeric(18,2):=p_nombayar;
	v_nomSisaTagihan numeric(18,2):=0;
	v_nomAmbilRetur numeric(18,2):=0;
	
	v_nominal_bayar numeric(18,2);
	v_nominal_deposit numeric(18,2);
	v_nominal_terbayar numeric(18,2);
	v_nominal_retur numeric(18,2);
	v_nominal_kurang_bayar numeric(18,2);
	
	v_id_pembayaran bigint;
	v_ada_deposit boolean:=false;
	v_ada_retur_out boolean := false;
	v_pajak_dibayar_penyewa boolean:=false;
	
	v_blth_invoice_bayar_max varchar(8);
	
BEGIN	
	raise notice 'check jika blth invoice tidak berurut';
	select max(tahun_bulan_tagihan)
	into v_blth_invoice_bayar_max
	from invoice i 
	where no_invoice in (select (x->>'no_invoice')::text
							from (select json_array_elements(p_distribusiPembayaran)  x) a);
						
	if exists(
		select null from invoice 
		where 
			id_kontrak_sewa=p_id_kontrak_sewa and aktif and not flag_rekon and tahun_bulan_tagihan<v_blth_invoice_bayar_max
			and no_invoice not in (select (x->>'no_invoice')::text
							from (select json_array_elements(p_distribusiPembayaran)  x) a)
	) then 
		return '{"ret":-1,"msg":"Pembayaran invoice harus berurut dari invoice dengan bulan yang terendah!"}'::json ; 
	end if;
	
	raise notice 'check apakah semua invoice memang berada di dalam kontrak sewa dan belum rekon dan juga hitung total tagiha untuk invoice tersebut ...done';
	raise notice 'check apakah total tagihan sudah sesuai ...done';
	raise notice 'check apakah jumlah bayar >= jumlah tagihan .... done';
	
	v_pajak_dibayar_penyewa := coalesce(p_pajak_dibayar_penyewa,false);
	
	select count(x->>'no_invoice'),sum( (x->>'tagihan')::numeric) 
	into v_count_tagihan_distribusi,v_total_tagihan_distribusi
	from (select json_array_elements(p_distribusiPembayaran)  x) a;
	
	select 
		count(*),
		sum(
			case when v_pajak_dibayar_penyewa then nominal_invoice else nominal_akhir end
		) ,
		sum(
			case when v_pajak_dibayar_penyewa then nominal_pajak else 0 end
		) 
	into v_count_tagihan,v_total_tagihan,v_total_pajak
	from invoice
	where 
		id_kontrak_sewa=p_id_kontrak_sewa 
		and not flag_rekon
		and no_invoice in (select (x->>'no_invoice')::text
							from (select json_array_elements(p_distribusiPembayaran)  x) a);
	
	if v_count_tagihan_distribusi<>v_count_tagihan then
		return '{"ret":-1,"msg":"Ada no invoice yang bukan dalam kontrak atau sudah rekon"}'::json ; 
	elsif p_nomBayar<v_total_tagihan then
		-- 20201015 jika nomBayar kurang, maka cek data retur dan akan mengambil sebagian/ semua dari retur
		select sum(coalesce(nominal_retur_in,0::numeric)-coalesce(nominal_retur_out,0::numeric))
		into v_nominal_deposit
		from kontrak_sewa_retur
		where id_kontrak_sewa=p_id_kontrak_sewa and aktif;
		if p_nomBayar+coalesce(v_nominal_deposit,0::numeric)<v_total_tagihan then
			return '{"ret":-4,"msg":"Nominal bayar kurang"}'::json ; 
		else
			v_nomSisaTagihan := v_total_tagihan - p_nomBayar;
			for v_rec in select * from kontrak_sewa_retur
					where id_kontrak_sewa=p_id_kontrak_sewa and aktif
						and (coalesce(nominal_retur_in,0::numeric)-coalesce(nominal_retur_out,0::numeric))>0
			loop
				if v_nomSisaTagihan>=0 then
					v_nomAmbilRetur = case 
								when v_nomSisaTagihan - (coalesce(v_rec.nominal_retur_in,0::numeric)-coalesce(v_rec.nominal_retur_out,0::numeric))>=0 then (coalesce(v_rec.nominal_retur_in,0::numeric)-coalesce(v_rec.nominal_retur_out,0::numeric))
								else v_nomSisaTagihan
							end;
					v_nomSisaTagihan := v_nomSisaTagihan - v_nomAmbilRetur;
					UPDATE kontrak_sewa_retur
					SET  
						nominal_retur_out=v_nomAmbilRetur+ coalesce(v_rec.nominal_retur_out,0::numeric),
						tgl_ubah=now(), 
						petugas_ubah=p_kode_pengguna
					WHERE id_kontrak_sewa_retur=v_rec.id_kontrak_sewa_retur;
					
					-- jika ada nominal ambil retur maka insert data retur out dengan id_pembayaran null
					if v_nomAmbilRetur>0 then
						insert into kontrak_sewa_retur_out(
								id_kontrak_sewa_retur, nominal_retur_out,tgl_rekam,petugas_rekam
						)
						values(
							v_rec.id_kontrak_sewa_retur, v_nomAmbilRetur,now(),p_kode_pengguna
						);
						v_ada_retur_out:=true;
					end if;
				end if;
			end loop;
			v_nombayar := v_total_tagihan;
		end if;
	end if;
	raise notice 'insert new pembayaran...done1';
	-- untuk sementara nominal_deposit masih di anggap nol	
-- 	v_nominal_deposit := 0;

	-- 20201015 - nominal deposit jika ada adalah sisata tagihan dari perhitungan di atas
-- 	v_nominal_deposit := coalesce(v_nomSisaTagihan,0::numeric);
	-- untuk sementara tidak boleh ada kurang bayar
	v_nominal_kurang_bayar := 0;
	
	v_nominal_terbayar := v_total_tagihan -v_nombayar;
	if v_nominal_terbayar<0  then
		v_nominal_terbayar := v_total_tagihan;
	else
		v_nominal_terbayar := v_nombayar;
	end if;
	v_nominal_kurang_bayar := v_total_tagihan - v_nominal_terbayar;	
	v_nominal_retur:= v_nombayar-v_nominal_terbayar;
			
-- 	raise notice 'check jika ada pembayaran deposit dan kontrak belum berlaku, kontrak_berlaku di set true';
	INSERT INTO pembayaran(
		id_kontrak_sewa, media_pembayaran, tgl_pembayaran, bank_asal_name, bank_asal_rek, bank_asal_transfer_id, bank_tujuan_name, bank_tujuan_rek, nama_pembayar, 
		nominal_tagihan, nominal_deposit, nominal_pembayaran, nominal_retur, nominal_retur_isdeposit, nominal_kurang_bayar, 
		keterangan, tgl_rekam, petugas_rekam,
		pajak_dibayar_penyewa,pajak_nominal_dibayar_penyewa)
	VALUES (p_id_kontrak_sewa,p_mediaPembayaran,p_tglBayar,p_bankAsal,p_rekAsal,p_transferIdAsal,p_bankPenerima,p_rekPenerima,p_namaPembayar,
			v_total_tagihan,
			case 
				when p_depositKelebihanBayar then p_nomBayar-v_total_tagihan
				else 0 
			end
			,p_nombayar,			
			case 
				when not p_depositKelebihanBayar and v_nominal_kurang_bayar=0 then v_nominal_deposit-v_total_tagihan+p_nomBayar
				else 0 
			end
			,p_depositKelebihanBayar,0,
			p_keterangan,now(),p_kode_pengguna,
			v_pajak_dibayar_penyewa,
			case 
				when v_pajak_dibayar_penyewa then v_total_pajak
				else 0
			end
		   )
	returning id_pembayaran
	into v_id_pembayaran;
	
	-- 20201015 tambah untuk retur in
	if coalesce(v_nominal_retur,0::numeric)>0 and p_depositKelebihanBayar then
		insert into kontrak_sewa_retur(
			id_kontrak_sewa, id_pembayaran, nominal_retur_in,tgl_rekam, petugas_rekam
		)
		values(
			p_id_kontrak_sewa,v_id_pembayaran, v_nominal_retur,now(), p_kode_pengguna
		);
	end if;
	--update id_pembayaran sesuai yang baru
	if v_ada_retur_out then
		update kontrak_sewa_retur_out 
		set
			id_pembayaran=v_id_pembayaran
		where aktif and id_pembayaran is null and  id_kontrak_sewa_retur in(select id_kontrak_sewa_retur from kontrak_sewa_retur where id_kontrak_sewa=p_id_kontrak_sewa);
	end if;
	
	-- jika pengembalian langsung maka kosongkan semua data retur 
	-- dan tambah 1 data out untuk sisa semua retur
	if not p_depositKelebihanBayar then
		for v_rec in
			select * from kontrak_sewa_retur where id_kontrak_sewa=p_id_kontrak_sewa and aktif
		loop
			if v_rec.nominal_retur_in-v_rec.nominal_retur_out>0 then
				insert into kontrak_sewa_retur_out(
					id_kontrak_sewa_retur,id_pembayaran, nominal_retur_out,tgl_rekam,petugas_rekam
				)
				values(
					v_rec.id_kontrak_sewa_retur, v_id_pembayaran,v_rec.nominal_retur_in-v_rec.nominal_retur_out,now(),p_kode_pengguna
				);
				update kontrak_sewa_retur set nominal_retur_out=v_rec.nominal_retur_in
				where id_kontrak_sewa_retur=v_rec.id_kontrak_sewa_retur;
			end if;
		end loop;
	end if;
	raise notice 'insert invoice pembayaran...done1';
	v_nominal_bayar := v_nomBayar;
	for v_rec in  select *
				from invoice
				where 
					id_kontrak_sewa=p_id_kontrak_sewa 
					and  not flag_rekon
					and no_invoice in (select (x->>'no_invoice')::text
										from (select json_array_elements(p_distribusiPembayaran)  x) a)
				order by no_invoice
	loop
		v_nominal_terbayar := case when v_pajak_dibayar_penyewa then v_rec.nominal_invoice else v_rec.nominal_akhir end  -v_nominal_bayar;
		if v_nominal_terbayar<0  then
			v_nominal_terbayar := case when v_pajak_dibayar_penyewa then v_rec.nominal_invoice else v_rec.nominal_akhir end ;
		else
			v_nominal_terbayar := v_nominal_bayar;
		end if;
		v_nominal_kurang_bayar :=case when v_pajak_dibayar_penyewa then v_rec.nominal_invoice else v_rec.nominal_akhir end  - v_nominal_terbayar;
		v_nominal_bayar := v_nominal_bayar - v_nominal_terbayar;
		
		INSERT INTO pembayaran_invoices(
		id_pembayaran, no_invoice, nominal_tagihan, nominal_pembayaran, nominal_sisa, tgl_rekam, petugas_rekam,
		pajak_dibayar_penyewa,pajak_nominal_dibayar_penyewa)
		VALUES (v_id_pembayaran, v_rec.no_invoice, v_rec.nominal_akhir, v_nominal_terbayar, v_nominal_kurang_bayar, now(),p_kode_pengguna,
			  v_pajak_dibayar_penyewa, case when v_pajak_dibayar_penyewa then v_rec.nominal_pajak else 0 end );
		
		raise notice 'update status invoice flag_rekon';
		if v_nominal_kurang_bayar<=0 then
			update invoice 
			set 
				flag_rekon=true ,
				tgl_ubah=now(),
				petugas_ubah=p_kode_pengguna,
				pajak_dibayar_penyewa=v_pajak_dibayar_penyewa, 
				pajak_nominal_dibayar_penyewa=case when v_pajak_dibayar_penyewa then v_rec.nominal_pajak else 0 end
			where no_invoice=v_rec.no_invoice;
			
			if exists(
					select null 
					from
						invoice_entries entries
					where no_invoice=v_rec.no_invoice and kode_invoice_entries='INVDPST'
			) then
				v_ada_deposit := true;
			end if;
			
			-- jika pajak di bayar penyewa dan ada INVSEWA (invoice sewa)
			if v_pajak_dibayar_penyewa then
				for v_rec_sewa in
					select * from invoice_entries where no_invoice=v_rec.no_invoice and kode_invoice_entries='INVSEWA'
				loop
					update  invoice_entries_invsewa
					set 
						pajak_dibayar_penyewa=v_pajak_dibayar_penyewa,
						pajak_nominal_dibayar_penyewa=pajak_nominal
					where id_invoice_entries_invsewa=v_rec_sewa.id_invoice_entries and aktif;
				end loop;
			end if;
		end if;
	end loop;
	
	if v_nominal_kurang_bayar>0 then
		update pembayaran set nominal_kurang_bayar=v_nominal_kurang_bayar where id_pembayaran=v_id_pembayaran;
	end if;
	
	if v_ada_deposit then
		update kontrak_sewa
		set kontrak_berlaku=true
		where id_kontrak_sewa=p_id_kontrak_sewa and not kontrak_berlaku;
		
		raise notice 'data penghuni menjadi aktif menghuni';
		update registrasi_penghuni set aktif_menghuni=true
		where no_registrasi in (select no_registrasi from kontrak_sewa where id_kontrak_sewa=p_id_kontrak_sewa ) and aktif;
	end if;
	return ('{"ret":0,"idPembayaran":"'|| v_id_pembayaran::text ||'"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 454 (class 1255 OID 37863)
-- Name: f_pembayaran_rekening_save(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pembayaran_rekening_save(p_kode_pengguna character varying, p_id_pembayaran_rekening integer, p_kode_kantor character varying, p_no_rekening character varying, p_nama_bank character varying, p_atas_nama_rekening character varying, p_cabang_bank character varying, p_keterangan character varying, p_aktif boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_action varchar(40):='';
BEGIN	
	raise notice 'check p_id_setting_pembayaranis null or 0';
	if coalesce(p_id_pembayaran_rekening,0)=0 then
		-- insert baru
		-- cek apakah ada denda di tanggal mulai tersebut
		if exists(select null from pembayaran_rekening where aktif and kode_kantor=p_kode_kantor and no_rekening=p_no_rekening and nama_bank=p_nama_bank) then
			return '{"ret":-1,"msg":"No rekening sudah terdaftar pada kantor tersebut"}'::json ;
		else
			INSERT INTO pembayaran_rekening(
				kode_kantor, no_rekening, nama_bank, atas_nama_rekening, cabang_bank, keterangan, tgl_rekam, petugas_rekam
			)
			VALUES (
				p_kode_kantor, p_no_rekening, p_nama_bank, p_atas_nama_rekening, p_cabang_bank, p_keterangan, now(), p_kode_pengguna
			);
			return '{"ret":0,"action":"Inserted"}'::json ;
		end if;
	else
		-- update data
		-- cek apakah sudah ada setting denda pada tanggal berlaku tersebut
		if exists(select null from pembayaran_rekening where aktif and kode_kantor=p_kode_kantor and no_rekening=p_no_rekening  and nama_bank=p_nama_bank and id_pembayaran_rekening<>p_id_pembayaran_rekening) then
			return '{"ret":-1,"msg":"Nomor rekening sudah terdaftar pada kantor tersebut"}'::json ;
		else
			update pembayaran_rekening
			set
				kode_kantor=p_kode_kantor,
				no_rekening= p_no_rekening ,
				nama_bank=p_nama_bank,
				atas_nama_rekening=p_atas_nama_rekening ,
				cabang_bank=p_cabang_bank ,
				keterangan=p_keterangan ,
				aktif=coalesce(p_aktif,true),
				tgl_na=case when not coalesce(p_aktif,true) then tgl_na else now() end,
				petugas_na=case when not coalesce(p_aktif,true) then petugas_na else p_kode_pengguna end,
				tgl_ubah=now(), 
				petugas_ubah=p_kode_pengguna
			where  id_pembayaran_rekening=p_id_pembayaran_rekening;
			return '{"ret":0,"action":"Updated"}'::json ;
		end if;
	end if;
	
	return '{"ret":0}'::json ;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 455 (class 1255 OID 37864)
-- Name: f_pencatatan_aset_hapus(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pencatatan_aset_hapus(p_kode_pengguna character varying, p_kode_aset character varying, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
BEGIN
	/*update aktif jadi false*/
	UPDATE aset set aktif=false, tgl_ubah=now(), petugas_ubah=p_kode_pengguna, tgl_na=now(), alasan_na=p_keterangan
	where kode_aset=p_kode_aset;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 456 (class 1255 OID 37865)
-- Name: f_pencatatan_aset_mig_new(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pencatatan_aset_mig_new(p_kode_pengguna character varying, p_kode_aset character varying, p_kode_kantor character varying, p_kode_rusun character varying, p_kode_aset_rusun character varying, p_kode_aset_kategori character varying, p_nama_aset character varying, p_kode_satuan character varying, p_kode_jenis_perolehan character varying, p_tgl_perolehan character varying, p_nilai_perolehan numeric, p_masa_manfaat_bln numeric, p_aset_type character varying, p_aset_merk character varying, p_kondisi_aset character varying, p_kondisi_aset_ref character varying, p_as_inventaris_unit character varying, p_inventaris_alias_name character varying, p_keterangan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_kode_aset character varying(20):='';
	v_tgl_perolehan date;
	v_tanah_berlaku date;
	v_tanah_berakhir date;
	v_tanah_berlaku_bln smallint;
	v_tanah_luas_m2 smallint;
	v_bgn_imb_tgl date;
	v_tgl_pembuatan date;
BEGIN
	if (p_tgl_perolehan)::text = null or (p_tgl_perolehan)::text = '' then
		v_tgl_perolehan:=null;
	else
		v_tgl_perolehan:=TO_DATE((p_tgl_perolehan)::text,'YYYY-MM-DD');
	end if;
	
	INSERT INTO aset(
			kode_aset,kode_kantor,kode_rusun,kode_aset_kategori,nama_aset,kode_satuan,kode_jenis_perolehan,tgl_perolehan,nilai_perolehan,
	 		masa_manfaat_bln,aset_type,aset_merk,kondisi_aset,kondisi_aset_ref,as_inventaris_unit,inventaris_alias_name,keterangan,
			tgl_rekam,petugas_rekam,kode_sub_kelompok)
		VALUES (
			(p_kode_aset)::text,(p_kode_kantor)::text,(p_kode_rusun)::text,
			(p_kode_aset_kategori)::text,(p_nama_aset)::text,(p_kode_satuan)::text,
			(p_kode_jenis_perolehan)::text,v_tgl_perolehan,(p_nilai_perolehan)::numeric,
	 		(p_masa_manfaat_bln)::smallint,(p_aset_type)::text,(p_aset_merk)::text,(p_kondisi_aset)::text,
			(p_kondisi_aset_ref)::text,(p_as_inventaris_unit)::boolean,(p_inventaris_alias_name)::text,
			(p_keterangan)::text,now(),p_kode_pengguna::text,'01'::text)
			returning kode_aset INTO v_kode_aset;

--return ('{"ret":0,"kode_aset":"'|| v_kode_aset::text ||'"}')::json;

	INSERT INTO aset_kondisi(
	kode_aset,tgl_kondisi,kondisi_aset,kondisi_aset_ref,keterangan, tgl_rekam, petugas_rekam,kondisi_terakhir)
	VALUES (v_kode_aset::text,now()::date,(p_kondisi_aset)::text,(p_kondisi_aset_ref)::text, 'Pencatatan Awal'
			,now(),  p_kode_pengguna::text,true);
			
			BEGIN
				PERFORM f_gen_penyusutan_aset(p_kode_pengguna::text,v_kode_aset::text);
				return ('{"ret":0,"kode_aset":"'|| v_kode_aset::text ||'"}')::json;
				exception
				when others then
					return '{"ret":-99,"msg":"Others error"}'::json ;
			END;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 457 (class 1255 OID 37866)
-- Name: f_pencatatan_aset_save(character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pencatatan_aset_save(p_kode_pengguna character varying, p_data_aset json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_kode_aset character varying(20):='';
	v_tgl_perolehan date;
	v_tanah_berlaku date;
	v_tanah_berakhir date;
	v_tanah_berlaku_bln smallint;
	v_tanah_luas_m2 smallint;
	v_bgn_imb_tgl date;
	v_tgl_pembuatan date;
BEGIN
	if (p_data_aset->>'tgl_perolehan')::text = null or (p_data_aset->>'tgl_perolehan')::text = '' then
		v_tgl_perolehan:=null;
	else
		v_tgl_perolehan:=TO_DATE((p_data_aset->>'tgl_perolehan')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'tgl_pembuatan')::text = null or (p_data_aset->>'tgl_pembuatan')::text = '' then
		v_tgl_pembuatan:=null;
	else
		v_tgl_pembuatan:=TO_DATE((p_data_aset->>'tgl_pembuatan')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'tanah_sertifikat_berakhir')::text = null or (p_data_aset->>'tanah_sertifikat_berakhir')::text = '' then
		v_tanah_berakhir:=null;
	else
		v_tanah_berakhir:=TO_DATE((p_data_aset->>'tanah_sertifikat_berakhir')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'tanah_sertifikat_berlaku')::text = null or (p_data_aset->>'tanah_sertifikat_berlaku')::text = '' then
		v_tanah_berlaku:=null;
	else
		v_tanah_berlaku:=TO_DATE((p_data_aset->>'tanah_sertifikat_berlaku')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'bgn_imb_tgl')::text = null or (p_data_aset->>'bgn_imb_tgl')::text = '' then
		v_bgn_imb_tgl:=null;
	else
		v_bgn_imb_tgl:=TO_DATE((p_data_aset->>'bgn_imb_tgl')::text,'YYYY-MM-DD');
	end if;
	if v_tanah_berlaku>to_date('1900-01-01','yyyy-mm-dd') and v_tanah_berakhir>to_date('1900-01-01','yyyy-mm-dd') then
		v_tanah_berlaku_bln:=date_part('month',age(v_tanah_berakhir, v_tanah_berlaku))::smallint;
	else 
		v_tanah_berlaku_bln:=null;
	end if;
	if (p_data_aset->>'tanah_luas_m2')::text = null or (p_data_aset->>'tanah_luas_m2')::text = '' then
		v_tanah_luas_m2:=null;
	else
		v_tanah_luas_m2:=(p_data_aset->>'tanah_luas_m2')::smallint;
	end if;
	/*return ('{"ret":0,"kode_aset":"'|| v_tanah_luas_m2::text ||'"}')::json;*/
	INSERT INTO aset(
			kode_aset,kode_kantor,kode_rusun,kode_aset_kategori,nama_aset,kode_satuan,kode_jenis_perolehan,tgl_perolehan,nilai_perolehan,
	 		masa_manfaat_bln,aset_type,aset_merk,kondisi_aset,kondisi_aset_ref,as_inventaris_unit,inventaris_alias_name,
			biaya_kerusakan,biaya_kehilangan,tanah_status,tanah_sertifikat_no,tanah_sertifikat_berlaku,tanah_sertifikat_berakhir,
			tanah_sertifikat_berlaku_bln,tanah_luasan,tanah_luas_m2,bgn_imb_no,bgn_imb_tgl,bgn_imb_instansi,keterangan,
			lampiran_file,lampiran_deskripsi,tgl_rekam, petugas_rekam,kode_sub_kelompok,alamat_aset,no_rangka,no_mesin,no_polisi,tgl_pembuatan,kode_aset_rusun)
		VALUES (
			f_gen_kode_aset(to_char(v_tgl_perolehan,'yyyymm'),(p_data_aset->>'kode_aset_rusun')::text,(p_data_aset->>'kode_aset_kategori')::text),
			(p_data_aset->>'kode_kantor')::text,(p_data_aset->>'kode_rusun')::text,(p_data_aset->>'kode_aset_kategori')::text,(p_data_aset->>'nama_aset')::text,(p_data_aset->>'kode_satuan')::text,
			(p_data_aset->>'kode_jenis_perolehan')::text,v_tgl_perolehan,(p_data_aset->>'nilai_perolehan')::numeric,
	 		(p_data_aset->>'masa_manfaat_bln')::smallint,(p_data_aset->>'aset_type')::text,(p_data_aset->>'aset_merk')::text,(p_data_aset->>'kondisi_aset')::text,
			(p_data_aset->>'kondisi_aset_ref')::text,(p_data_aset->>'as_inventaris_unit')::boolean,(p_data_aset->>'inventaris_alias_name')::text,
			(p_data_aset->>'biaya_kerusakan')::numeric,(p_data_aset->>'biaya_kehilangan')::numeric,(p_data_aset->>'tanah_status')::text,(p_data_aset->>'tanah_sertifikat_no')::text,
			v_tanah_berlaku,v_tanah_berakhir,v_tanah_berlaku_bln,(p_data_aset->>'tanah_luasan')::text,v_tanah_luas_m2,
			(p_data_aset->>'bgn_imb_no')::text,v_bgn_imb_tgl,(p_data_aset->>'bgn_imb_instansi')::text,(p_data_aset->>'keterangan')::text,
			(p_data_aset->>'lampiran_file')::text,(p_data_aset->>'lampiran_deskripsi')::text,now(), p_kode_pengguna,(p_data_aset->>'kode_sub_kelompok')::text,(p_data_aset->>'alamat_aset')::text,
			(p_data_aset->>'no_rangka')::text,(p_data_aset->>'no_mesin')::text,(p_data_aset->>'no_polisi')::text,v_tgl_pembuatan,(p_data_aset->>'kode_aset_rusun')::text)
			returning kode_aset INTO v_kode_aset;
			
	INSERT INTO aset_kondisi(
	kode_aset,tgl_kondisi,kondisi_aset,kondisi_aset_ref,keterangan, tgl_rekam, petugas_rekam,kondisi_terakhir)
	VALUES (v_kode_aset::text,now()::date,(p_data_aset->>'kondisi_aset')::text,(p_data_aset->>'kondisi_aset_ref')::text, 'Pencatatan Awal'
			,now(),  p_kode_pengguna::text,true);
			
			BEGIN
				PERFORM f_gen_penyusutan_aset(p_kode_pengguna::text,v_kode_aset::text);
				return ('{"ret":0,"kode_aset":"'|| v_kode_aset::text ||'"}')::json;
				exception
				when others then
					return '{"ret":-99,"msg":"Others error"}'::json ;
			END;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 458 (class 1255 OID 37867)
-- Name: f_pencatatan_aset_update(character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pencatatan_aset_update(p_kode_pengguna character varying, p_kode_aset character varying, p_data_aset json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_kode_aset character varying(20):='';
	v_tanah_berlaku date;
	v_tanah_berakhir date;
	v_tanah_berlaku_bln smallint;
	v_tanah_luas_m2 smallint;
	v_bgn_imb_tgl date;
	v_tgl_pembuatan date;
BEGIN
	if (p_data_aset->>'tanah_sertifikat_berakhir')::text = null or (p_data_aset->>'tanah_sertifikat_berakhir')::text = '' then
		v_tanah_berakhir:=null;
	else
		v_tanah_berakhir:=TO_DATE((p_data_aset->>'tanah_sertifikat_berakhir')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'tgl_pembuatan')::text = null or (p_data_aset->>'tgl_pembuatan')::text = '' then
		v_tgl_pembuatan:=null;
	else
		v_tgl_pembuatan:=TO_DATE((p_data_aset->>'tgl_pembuatan')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'tanah_sertifikat_berlaku')::text = null or (p_data_aset->>'tanah_sertifikat_berlaku')::text = '' then
		v_tanah_berlaku:=null;
	else
		v_tanah_berlaku:=TO_DATE((p_data_aset->>'tanah_sertifikat_berlaku')::text,'YYYY-MM-DD');
	end if;
	if (p_data_aset->>'bgn_imb_tgl')::text = null or (p_data_aset->>'bgn_imb_tgl')::text = '' then
		v_bgn_imb_tgl:=null;
	else
		v_bgn_imb_tgl:=TO_DATE((p_data_aset->>'bgn_imb_tgl')::text,'YYYY-MM-DD');
	end if;
	if v_tanah_berlaku>to_date('1900-01-01','yyyy-mm-dd') and v_tanah_berakhir>to_date('1900-01-01','yyyy-mm-dd') then
		v_tanah_berlaku_bln:=date_part('month',age(v_tanah_berakhir, v_tanah_berlaku))::smallint;
	else 
		v_tanah_berlaku_bln:=null;
	end if;
	if (p_data_aset->>'tanah_luas_m2')::text = null or (p_data_aset->>'tanah_luas_m2')::text = '' then
		v_tanah_luas_m2:=null;
	else
		v_tanah_luas_m2:=(p_data_aset->>'tanah_luas_m2')::smallint;
	end if;
	
	/*update langsung*/
	UPDATE aset set tgl_ubah=now(), petugas_ubah=p_kode_pengguna,
	nama_aset=(p_data_aset->>'nama_aset')::text,kode_satuan=(p_data_aset->>'kode_satuan')::text,
	kode_jenis_perolehan=(p_data_aset->>'kode_jenis_perolehan')::text,aset_type=(p_data_aset->>'aset_type')::text,
	aset_merk=(p_data_aset->>'aset_merk')::text,kondisi_aset=(p_data_aset->>'kondisi_aset')::text,
	kondisi_aset_ref=(p_data_aset->>'kondisi_aset_ref')::text,as_inventaris_unit=(p_data_aset->>'as_inventaris_unit')::boolean,
	inventaris_alias_name=(p_data_aset->>'inventaris_alias_name')::text, biaya_kerusakan=(p_data_aset->>'biaya_kerusakan')::numeric,
	biaya_kehilangan=(p_data_aset->>'biaya_kehilangan')::numeric,tanah_status=(p_data_aset->>'tanah_status')::text,
	tanah_sertifikat_no=(p_data_aset->>'tanah_sertifikat_no')::text,tanah_sertifikat_berlaku=v_tanah_berlaku,
	tanah_sertifikat_berakhir=v_tanah_berakhir,tanah_sertifikat_berlaku_bln=v_tanah_berlaku_bln,tanah_luasan=(p_data_aset->>'tanah_luasan')::text,
	tanah_luas_m2=v_tanah_luas_m2,bgn_imb_no=(p_data_aset->>'bgn_imb_no')::text,bgn_imb_tgl=v_bgn_imb_tgl,
	bgn_imb_instansi=(p_data_aset->>'bgn_imb_instansi')::text,keterangan=(p_data_aset->>'keterangan')::text,lampiran_file=(p_data_aset->>'lampiran_file')::text,
	lampiran_deskripsi=(p_data_aset->>'lampiran_deskripsi')::text,alamat_aset=(p_data_aset->>'alamat_aset')::text
	,no_rangka=(p_data_aset->>'no_rangka')::text,no_mesin=(p_data_aset->>'no_mesin')::text,no_polisi=(p_data_aset->>'no_polisi')::text
	,tgl_pembuatan=v_tgl_pembuatan
	where kode_aset=p_kode_aset;
	
	return ('{"ret":0,"msg":"Sukses"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 459 (class 1255 OID 37868)
-- Name: f_penempatan_aset_save(character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_penempatan_aset_save(p_kode_pengguna character varying, p_kode_aset character varying, p_data_penempatan json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_tgl_penempatan date;
	v_kode_unit integer;
	v_penempatan_awal integer;
	v_rslt json;
BEGIN
	if (p_data_penempatan->>'tgl_penempatan')::text = null or (p_data_penempatan->>'tgl_penempatan')::text = '' then
		v_tgl_penempatan:=null;
	else
		v_tgl_penempatan:=TO_DATE((p_data_penempatan->>'tgl_penempatan')::text,'YYYY-MM-DD');
	end if;
	if (p_data_penempatan->>'kode_unit')::text = null or (p_data_penempatan->>'kode_unit')::text = '' then
		v_kode_unit:=null;
	else
		v_kode_unit:=(p_data_penempatan->>'kode_unit')::int;
	end if;
	/*return ('{"ret":0,"kode_aset":"'|| v_kode_unit::text ||'"}')::json;*/
	
	select lokasi_unit::int into v_penempatan_awal from aset_penempatan where kode_aset=p_kode_aset::text and penempatan_terakhir;
	
	/* UPDATE YANG LAMA JADI 'T'*/
	UPDATE aset_penempatan set penempatan_terakhir=false, tgl_ubah=now(), petugas_ubah=p_kode_pengguna 
	where kode_aset=p_kode_aset and penempatan_terakhir=true;
	
	/*INSERT YANG BARU*/
	INSERT INTO aset_penempatan(kode_aset, tgl_penempatan, kode_rusun, kode_lokasi, lokasi_unit, 
									   lokasi_non_unit, keterangan, penempatan_terakhir, tgl_rekam, petugas_rekam)
	VALUES (p_kode_aset, v_tgl_penempatan, p_data_penempatan->>'kode_rusun'::text, p_data_penempatan->>'kode_unit_jenis'::text
			, v_kode_unit,p_data_penempatan->>'lokasi_non_unit'::text
			, p_data_penempatan->>'keterangan'::text, true, now(), p_kode_pengguna);
	
	raise notice  '%-%-%-%-%',p_kode_pengguna,p_kode_aset,v_penempatan_awal, v_kode_unit,v_tgl_penempatan;
	select f_kontrak_inventaris_penempatan_check_n_update(p_kode_pengguna::text,p_kode_aset::text,v_penempatan_awal::int, v_kode_unit::int,v_tgl_penempatan::date) into v_rslt;
					
			return ('{"ret":0,"msg":"Sukses"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 460 (class 1255 OID 37869)
-- Name: f_pengguna_get_info(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_pengguna_get_info(p_kode_pengguna character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$	
declare
	v_login_period_bfr_locked smallint;
	v_login_period_bfr_disabled smallint;
	v_password_period_change smallint;
	v_rec record;
	v_rec1 record;

	v_role json;	
	v_menu json;
	v_fitur json;
BEGIN
    -- ambil pengguna
	for v_rec in 
		select kode_pengguna, nama_pengguna, kode_kantor,departemen,nama_atasan,email,last_login,last_change_pass,aktif,
				locked, password_pengguna,
		(select nama_kantor from kode_kantor where kode_kantor=a.kode_kantor) nama_kantor 
		from pengguna a
		where kode_pengguna=p_kode_pengguna
	loop
		-- get pengguna settings
		select login_period_bfr_locked, login_period_bfr_disabled, password_period_change
		into v_login_period_bfr_locked, v_login_period_bfr_disabled, v_password_period_change
		from pengguna_settings
		where aktif;

		if not v_rec.aktif then
			return json_build_object('ret',0,'can_login',-1,'msg','non aktif','data',v_rec, 'roles', v_role);
		elsif v_rec.locked then
			return json_build_object('ret',0,'can_login',-2,'msg','locked','data',v_rec, 'roles', v_role);
		elseif current_timestamp>(v_rec.last_login + interval '1 day' * v_login_period_bfr_locked) then
			update pengguna
			set locked=true, tgl_locked=now()
			where kode_pengguna=v_kode_pengguna;
			return json_build_object('ret',0,'can_login',-3,'msg','locked last login expired','data',v_rec, 'roles', v_role);
		elseif current_timestamp>(v_rec.last_login + interval '1 day' * v_login_period_bfr_disabled) then
			update pengguna
			set aktif=false, tgl_na=now()
			where kode_pengguna=v_kode_pengguna;
			return json_build_object('ret',0,'can_login',-4,'msg','disabled last login expired','data',v_rec, 'roles', v_role);
		elseif current_timestamp>(v_rec.last_change_pass + interval '1 day' * v_password_period_change) then
			return json_build_object('ret',0,'can_login',-5,'msg','password expired','data','data',v_rec, 'roles', v_role);
		end if;

		-- update last login 
		update pengguna 
		set 
			last_login = now()
		where kode_pengguna =p_kode_pengguna;
		--get role
		select json_agg(t) 
		into v_role
		from (
			select kode_role , kk.jenis_kantor 
			from pengguna_role pr
				inner join pengguna p on p.kode_pengguna =pr.kode_pengguna 
				inner join kode_kantor kk on kk.kode_kantor =p.kode_kantor 
			where pr.kode_pengguna=p_kode_pengguna
		) t;
		-- get menu
		select json_agg(t) 
		into v_menu
		from (
			select distinct
				km.kode_menu, km.kode_menu_induk , km.nama_menu , km.no_urut, km.icon_menu
			from 
				pengguna_role pr 
				inner join  kode_role_menu krm on pr.kode_role = krm.kode_role and krm.aktif
				inner join kode_menu km on krm.kode_menu= km.kode_menu and km.aktif 
			where 
				pr.kode_pengguna =p_kode_pengguna and pr.aktif 
			order by 
				km.no_urut 
		) t;
		-- get role fitur
		select json_agg(t) 
		into v_fitur
		from (
			select distinct
				krf.kode_fitur , krf.can_view , krf.can_edit , krf.can_delete , krf.can_approve , krf.can_act_other1 , krf.can_act_other2 , kk.jenis_kantor 
			from 
				pengguna_role pr 
				inner join  kode_role_fitur krf on pr.kode_role = krf.kode_role and krf.aktif
				inner join pengguna p on p.kode_pengguna =pr.kode_pengguna 
				inner join kode_kantor kk on kk.kode_kantor =p.kode_kantor 
			where 
				pr.kode_pengguna =p_kode_pengguna and pr.aktif 
		) t;
		return json_build_object('ret',0,'can_login',0,'msg','sukses','data',v_rec, 'roles', coalesce(v_role,'[]'::json),
			'menu',coalesce(v_menu,'[]'::json), 'fitur', coalesce(v_fitur,'[]'::json));
	end loop;
	return json_build_object('ret',0,'can_login',-6,'msg','Username atau Password salah. Pastikan besar/kecil huruf dan angka benar!','data','{}'::json, 'roles',array[]::json[] );
exception 
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json;
END;								
$$;


--
-- TOC entry 461 (class 1255 OID 37870)
-- Name: f_penghuni_submit(character varying, character varying, bigint, character varying, bigint, bigint, character varying, character varying, character varying, character varying, integer, date, date, character varying, date, character varying, character varying, smallint, smallint, character varying, numeric, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, smallint, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_penghuni_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_id_kontrak_sewa bigint, p_no_registrasi character varying, p_id_registrasi_penghuni bigint, p_id_profil_penghuni bigint, p_kpj character varying, p_kpj_nama character varying, p_nik character varying, p_nik_jenis character varying, p_id_unit integer, p_tgl_in date, p_tgl_out date, p_tempat_lahir character varying, p_tgl_lahir date, p_jenis_kelamin character varying, p_nik_alamat character varying, p_anak_ke smallint, p_jmlh_saudara smallint, p_hoby character varying, p_gaji_perbulan numeric, p_kode_agama character varying, p_suku_provinsi character varying, p_kode_jenis_kendaraan character varying, p_no_kendaraan character varying, p_pekerjaan_nama_prs character varying, p_pekerjaan_alamat_prs character varying, p_pekerjaan_telp character varying, p_pekerjaan_fax character varying, p_pekerjaan_status character varying, p_pekerjaan_masakerja_bln smallint, p_pekerjaan_atasan_langsung character varying, p_keluarga_ayah character varying, p_keluarga_ayah_status character varying, p_keluarga_ibu character varying, p_keluarga_ibu_status character varying, p_keluarga_alamat character varying, p_keluarga_telp character varying, p_darurat_nama character varying, p_darurat_hubungan character varying, p_darurat_alamat character varying, p_darurat_telp character varying, p_kode_status_nikah character varying, p_kode_segmen character varying, p_penanggung_jawab boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_reg_no varchar(50);
	v_reg_tgl_min date;
	v_reg_tgl_max date;
	v_reg_status varchar(1);
	v_reg_hunian_keluarga boolean;
	
	v_kontrak_id bigint;
	v_kontrak_tgl_min date;
	v_kontrak_tgl_max date;
	v_kontrak_hunian_keluarga boolean;

	v_aktif_menghuni boolean;
	v_jenis_kelamin varchar(2);	
	v_kode_unit_jenis varchar(5);

	v_id_profil_penghuni bigint;
	v_id_profil_penghuni_ref bigint;
	v_id_registrasi_penghuni bigint;

	v_penanggung_jawab boolean;
	v_penanggung_jawab_id bigint;

	v_count_penghuni smallint;
begin
	if p_tgl_in>=p_tgl_out and p_tgl_out is not null then 
		return ('{"ret":-1,"msg":"Tanggal out harus lebih besar dari tanggal in"}')::json ;
	end if;

	if coalesce(p_id_unit,0)=0 then 
		return ('{"ret":-1,"msg":"Pilih unit nya terlebih dahulu"}')::json ;
	end if;

	select r.no_registrasi , r.tgl_request_menghuni , r.tgl_request_menghuni  + interval '1 month' * r.jangka_waktu_bln , r.status, ru.hunian_keluarga
	into v_reg_no,v_reg_tgl_min,v_reg_tgl_max,v_reg_status,v_reg_hunian_keluarga
	from 
		registrasi r
		inner join registrasi_unit ru on ru.no_registrasi =r.no_registrasi 
	where r.aktif and r.status in ('D','S','R','K') and r.no_registrasi = p_no_registrasi and ru.id_unit = p_id_unit and ru.aktif;

	
	select count(*) 
	into v_count_penghuni
	from registrasi_penghuni 
	where id_unit =p_id_unit and aktif 
		and (
			(p_no_registrasi is null and aktif_menghuni and tgl_in<=p_tgl_in and (tgl_out is null or p_tgl_in<tgl_out) )
			or 
			( p_no_registrasi is not null and no_registrasi =p_no_registrasi)
		);
	
	if v_count_penghuni>=4 and p_id_registrasi_penghuni is null then 
		return ('{"ret":-1,"msg":"Unit sudah penuh"}')::json ;
	end if;

	if p_no_registrasi is not null and v_reg_no is null then 
		return ('{"ret":-1,"msg":"Unit Registrasi aktif tidak ditemukan"}')::json ;
	end if;

	if p_no_registrasi is not null and v_reg_status='K' then 
		return ('{"ret":-1,"msg":"Sudah kontrak, silahkan melakukan perubahan penghuni melalui registrasi penghuni"}')::json ;
	end if;

	if p_no_registrasi is not null and not v_reg_hunian_keluarga then 
		if exists(
			select null from registrasi_penghuni rp 
			where jenis_kelamin<>p_jenis_kelamin and aktif and no_registrasi = p_no_registrasi and id_unit=p_id_unit
		) then
			return ('{"ret":-1,"msg":"Unit bukan hunian keluarga, tidak bisa berbeda jenis kelamin"}')::json ;
		end if;
	end if;

	select 
		ks.id_kontrak_sewa,ks.tgl_mulai_sewa,
		case
			when ks.tgl_berakhir_adendum is not null then ks.tgl_berakhir_adendum 
			else ks.tgl_berakhir_sewa 
		end tgl_berakhir_sewa, ksu.hunian_keluarga 
	into v_kontrak_id,v_kontrak_tgl_min,v_kontrak_tgl_max,v_kontrak_hunian_keluarga
	from
		kontrak_sewa ks
		inner join kontrak_sewa_unit ksu on ks.id_kontrak_sewa =ksu.id_kontrak_sewa 
	where ks.aktif and ks.approval and ks.kontrak_berlaku and not ks.kontrak_berakhir  
		and (
			(p_id_kontrak_sewa is not null and ks.id_kontrak_sewa=p_id_kontrak_sewa)
			or 
			(
				p_id_kontrak_sewa is  null 
				and	id_unit =p_id_unit 
			)
		)
	order by ks.tgl_mulai_sewa desc
	limit 1;

	if p_no_registrasi is null and v_kontrak_id is null then 
		return ('{"ret":-1,"msg":"Unit tidak sedang di sewa atau dalam proses kontrak"}')::json ;
	end if;
	
	if p_no_registrasi is null and not v_kontrak_hunian_keluarga then 
		if exists(
			select null from registrasi_penghuni rp where jenis_kelamin<>p_jenis_kelamin and aktif  and aktif_menghuni 
			and id_unit=p_id_unit and id_kontrak_sewa  is not null and tgl_in <=p_tgl_in and (tgl_out is null or tgl_out>p_tgl_out)
		) then
			return ('{"ret":-1,"msg":"Unit bukan hunian keluarga, tidak bisa berbeda jenis kelamin"}')::json ;
		end if;
	end if;

	
	-- cek apakah kpj or nik sudah terdaftar di unit yang sedang kontrak atau registrasi
	select kode_unit_jenis 
	into v_kode_unit_jenis
	from rusun_unit where id_unit=p_id_unit;
	
	if v_kode_unit_jenis is null then
		return ('{"ret":-1,"msg":"Jenis unit tidak ditemukan"}')::json ;
	end if;
	
	select aktif_menghuni 
	into v_aktif_menghuni
	from registrasi_penghuni rp 
		inner join rusun_unit ru on ru.id_unit = rp.id_unit 
	where rp.aktif and 
		(
			(coalesce(p_kpj,'')<>'' and kpj=p_kpj)
			or 
			(coalesce(p_nik,'')<>'' and nik=p_nik)
		)  
		and ru.kode_unit_jenis =v_kode_unit_jenis 
		and  (tgl_out is null or (tgl_out is not null and tgl_out>=date_trunc('day',p_tgl_in)))
		and  (
			(p_id_registrasi_penghuni is null)
			or 
			(p_id_registrasi_penghuni is not null and rp.id_unit<>p_id_unit)
		)
	order by aktif_menghuni ;
	
	if v_aktif_menghuni is not null and v_aktif_menghuni then
		return ('{"ret":-1,"msg":"KPJ/NIK sudah terdaftar di unit lain pada jenis unit yang sama"}')::json ;
	end if;
	if v_aktif_menghuni is not null and not v_aktif_menghuni then
		return ('{"ret":-1,"msg":"KPJ/NIK dalam proses registrasi di unit lain pada jenis unit yang sama"}')::json ;
	end if;
	
	if p_id_profil_penghuni is null or not exists(select null from profil_penghuni where aktif and p_id_profil_penghuni=p_id_profil_penghuni) then
		select id_profil_penghuni 
		into v_id_profil_penghuni_ref
		from profil_penghuni pp 
		where aktif and profil_terakhir  and 
		(
			(coalesce(p_kpj,'')<>'' and kpj=p_kpj)
			or 
			(coalesce(p_nik,'')<>'' and nik=p_nik)
		)  
		order by tgl_rekam  desc
		limit 1;
	else
		v_id_profil_penghuni_ref:= p_id_profil_penghuni;
	end if;

	-- checking untuk individu, penywa tidak bisa di out
	
	if  p_id_registrasi_penghuni is  not null and p_tgl_out is not null then
		if exists(
				select rp.id_registrasi_penghuni 
				from registrasi_penghuni rp
					left join registrasi r on r.no_registrasi = rp.no_registrasi  and rp.no_registrasi is not null and r.jenis_registrasi ='I' and r.aktif 
					left outer join kontrak_sewa ks on rp.id_kontrak_sewa = ks.id_kontrak_sewa and ks.id_kontrak_sewa  is not null and ks.jenis_registrasi ='I' and ks.aktif 
				where id_registrasi_penghuni=p_id_registrasi_penghuni and rp.is_penyewa 
				and case 
					when r.no_registrasi is not null then 1
					when ks.id_kontrak_sewa is not null then 1
					else 0
				end	>0		
		)
		then
			return ('{"ret":-1,"msg":"Untuk penghuni dengan kontrak individu, penyewa/penanggung jawab tidak bisa out"}')::json ;
		end if;
	end if;

--		return ('{"ret":-1,"msg":"aaaa"}')::json ;
	-- cek penanggung jawab unit
	if  p_penanggung_jawab  and p_id_registrasi_penghuni is  null then
		if p_no_registrasi is not null and exists (select null from registrasi where no_registrasi=p_no_registrasi and jenis_registrasi='I') then
			return ('{"ret":-1,"msg":"Tidak bisa merubah penanggung jawab unit untuk kontrak jenis individu"}')::json ;
		elsif v_kontrak_id is not null and exists (select null from kontrak_sewa where id_kontrak_sewa=v_kontrak_id and jenis_registrasi='I') then
			return ('{"ret":-1,"msg":"Tidak bisa merubah penanggung jawab unit untuk kontrak jenis individu"}')::json ;
		end if;
	elsif not p_penanggung_jawab  and p_id_registrasi_penghuni is not  null then
		if exists (select null from registrasi_penghuni  where id_registrasi_penghuni=p_id_registrasi_penghuni and is_penyewa) then 
			return ('{"ret":-1,"msg":"Tidak bisa merubah penanggung jawab unit untuk kontrak jenis individu"}')::json ;
		end if;	
	elsif  p_penanggung_jawab  and p_id_registrasi_penghuni is not  null then
		if v_kontrak_id is not null then
			if exists (select null from registrasi_penghuni  rp inner join kontrak_sewa ks on rp.id_kontrak_sewa =ks.id_kontrak_sewa and ks.jenis_registrasi='I'
				where id_registrasi_penghuni=p_id_registrasi_penghuni and not is_penyewa
			) then 
				return ('{"ret":-1,"msg":"Tidak bisa merubah penanggung jawab unit untuk kontrak jenis individu"}')::json ;
			end if;
		elsif p_no_registrasi is not null then
			if exists (select null from registrasi_penghuni  rp inner join registrasi r  on rp.no_registrasi=r.no_registrasi and r.jenis_registrasi='I'
				where id_registrasi_penghuni=p_id_registrasi_penghuni and not rp.is_penyewa
			) then 
				return ('{"ret":-1,"msg":"Tidak bisa merubah penanggung jawab unit untuk kontrak jenis individu"}')::json ;
			end if;
		end if;
	end if;

	if p_id_profil_penghuni is null or not exists(
		select null
		from profil_penghuni pp 
		where p_id_profil_penghuni = v_id_profil_penghuni_ref  
			and kpj=p_kpj and nama_lengkap=p_kpj_nama and tempat_lahir=p_tempat_lahir and date_trunc('day',tgl_lahir)=p_tgl_lahir and jenis_kelamin=p_jenis_kelamin and nik=p_nik and 
			nik_jenis=p_nik_jenis and nik_alamat=p_nik_alamat and anak_ke=p_anak_ke and jmlh_saudara=p_jmlh_saudara and hoby=p_hoby and gaji_perbulan=p_gaji_perbulan and 
			kode_agama=p_kode_agama and suku_provinsi=p_suku_provinsi and kode_jenis_kendaraan=p_kode_jenis_kendaraan and no_kendaraan=p_no_kendaraan and 
			pekerjaan_nama_prs=p_pekerjaan_nama_prs and pekerjaan_alamat_prs=p_pekerjaan_alamat_prs and pekerjaan_telp=p_pekerjaan_telp and pekerjaan_fax=p_pekerjaan_fax and
			pekerjaan_status=p_pekerjaan_status and pekerjaan_masakerja_th=(p_pekerjaan_masakerja_bln/12)::smallint and pekerjaan_masakerja_bln=p_pekerjaan_masakerja_bln and 
			pekerjaan_atasan_langsung=p_pekerjaan_atasan_langsung and keluarga_ayah=p_keluarga_ayah and keluarga_ayah_status=p_keluarga_ayah_status and 
			keluarga_ibu=p_keluarga_ibu and keluarga_ibu_status=p_keluarga_ibu_status and keluarga_alamat=p_keluarga_alamat and keluarga_telp=p_keluarga_telp and 
			darurat_nama=p_darurat_nama and darurat_hubungan=p_darurat_hubungan and darurat_alamat=p_darurat_alamat and darurat_telp=p_darurat_telp and 
			kode_status_nikah=p_kode_status_nikah and kode_segmen=p_kode_segmen
	)then
		INSERT INTO profil_penghuni(
			kpj, nama_lengkap, tempat_lahir, tgl_lahir, jenis_kelamin, nik, nik_jenis, nik_alamat, 
			anak_ke, jmlh_saudara, hoby, gaji_perbulan, kode_agama, suku_provinsi, kode_jenis_kendaraan, 
			no_kendaraan, pekerjaan_nama_prs, pekerjaan_alamat_prs, pekerjaan_telp, pekerjaan_fax, 
			pekerjaan_status, pekerjaan_masakerja_th, pekerjaan_masakerja_bln, pekerjaan_atasan_langsung, 
			keluarga_ayah, keluarga_ayah_status, keluarga_ibu, keluarga_ibu_status, keluarga_alamat, 
			keluarga_telp, darurat_nama, darurat_hubungan, darurat_alamat, darurat_telp,  kode_status_nikah, 
			profil_terakhir, id_profil_penghuni_ref, kode_segmen, tgl_rekam, petugas_rekam
		)
		values ( 
			p_kpj,p_kpj_nama,p_tempat_lahir,p_tgl_lahir,p_jenis_kelamin,p_nik,p_nik_jenis,p_nik_alamat,
			p_anak_ke,p_jmlh_saudara,p_hoby , p_gaji_perbulan,p_kode_agama , p_suku_provinsi,p_kode_jenis_kendaraan,
			p_no_kendaraan , p_pekerjaan_nama_prs , p_pekerjaan_alamat_prs , p_pekerjaan_telp , p_pekerjaan_fax,
			p_pekerjaan_status,(p_pekerjaan_masakerja_bln/12)::smallint, p_pekerjaan_masakerja_bln,p_pekerjaan_atasan_langsung,
			p_keluarga_ayah , p_keluarga_ayah_status , p_keluarga_ibu , p_keluarga_ibu_status , p_keluarga_alamat,
			p_keluarga_telp,p_darurat_nama , p_darurat_hubungan , p_darurat_alamat , p_darurat_telp,p_kode_status_nikah,
			true,v_id_profil_penghuni_ref,p_kode_segmen,now(),p_kode_pengguna
		)
		returning id_profil_penghuni
		into v_id_profil_penghuni;
	else
		v_id_profil_penghuni := p_id_profil_penghuni ;
	end if;

	if v_id_profil_penghuni_ref<>v_id_profil_penghuni then
		update profil_penghuni 
		set profil_terakhir =false , tgl_ubah =now(), petugas_ubah =p_kode_pengguna
		where id_profil_penghuni = v_id_profil_penghuni_ref;
	end if;

	-- cek penanggunggung jawab unit
	v_penanggung_jawab := p_penanggung_jawab;
	 
	if p_no_registrasi is not null then
		-- update available step 
		update registrasi 
		set 
			available_step = case when available_step <3 then 3 else available_step end
		where no_registrasi=p_no_registrasi and aktif;
	
		select id_registrasi_penghuni 
		into v_penanggung_jawab_id
		from registrasi_penghuni where aktif and no_registrasi=p_no_registrasi and penanggung_jawab and id_unit=p_id_unit
		limit 1;
		
		if v_penanggung_jawab_id is not null and p_penanggung_jawab and v_penanggung_jawab_id<>p_id_registrasi_penghuni  then
			update registrasi_penghuni 
			set penanggung_jawab = false 
			where aktif and no_registrasi=p_no_registrasi and penanggung_jawab and id_unit=p_id_unit and id_registrasi_penghuni <>p_id_registrasi_penghuni;
		elsif v_penanggung_jawab_id is not null and not p_penanggung_jawab and v_penanggung_jawab_id=p_id_registrasi_penghuni then 
			v_penanggung_jawab := true;
		elsif v_penanggung_jawab_id is null  and not p_penanggung_jawab  then
			v_penanggung_jawab := true;
		end if;
	elsif v_kontrak_id is not null then
		select id_registrasi_penghuni 
		into v_penanggung_jawab_id
		from registrasi_penghuni where aktif and id_kontrak_sewa =v_kontrak_id and penanggung_jawab and id_unit=p_id_unit
		limit 1;
		
		if v_penanggung_jawab_id is not null and p_penanggung_jawab and v_penanggung_jawab_id<>p_id_registrasi_penghuni  then
			update registrasi_penghuni 
			set penanggung_jawab = false 
			where aktif and id_kontrak_sewa =v_kontrak_id and penanggung_jawab and id_unit=p_id_unit and id_registrasi_penghuni <>p_id_registrasi_penghuni;
		elsif v_penanggung_jawab_id is not null and not p_penanggung_jawab and v_penanggung_jawab_id=p_id_registrasi_penghuni then 
			v_penanggung_jawab := true;
		elsif v_penanggung_jawab_id is null  and not p_penanggung_jawab  then
			v_penanggung_jawab := true;
		end if;
	end if;

	if p_id_registrasi_penghuni is null then	
		INSERT INTO registrasi_penghuni(
			no_registrasi, penanggung_jawab, kpj, kpj_nama, nik, nik_jenis, jenis_kelamin,
			id_profil_penghuni, id_unit, tgl_in, 
			aktif_menghuni, 
			tgl_rekam, petugas_rekam, id_kontrak_sewa
		)
		VALUES(
			p_no_registrasi,v_penanggung_jawab,p_kpj, p_kpj_nama,p_nik, p_nik_jenis, p_jenis_kelamin,
			v_id_profil_penghuni, p_id_unit, p_tgl_in, 
			case when p_no_registrasi is null and v_kontrak_id is not null then true else false end,
			now(), p_kode_pengguna, v_kontrak_id
		) 
		returning id_registrasi_penghuni
		into v_id_registrasi_penghuni;
		
		 
		return ('{"ret":0,"action":"Inserted","id":'|| coalesce(v_id_registrasi_penghuni::text,'null')::text ||'}')::json;
	else
		update registrasi_penghuni 
		set 
			id_profil_penghuni = v_id_profil_penghuni,
			kpj_nama=p_kpj_nama,
			tgl_in=p_tgl_in,
			tgl_out=case when p_no_registrasi is not null and v_kontrak_id is null then tgl_out else p_tgl_out end,
			penanggung_jawab = v_penanggung_jawab
		where id_registrasi_penghuni =p_id_registrasi_penghuni;
		return ('{"ret":0,"action":"Updated","id":'|| coalesce(p_id_registrasi_penghuni::text,'null')::text ||'}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 462 (class 1255 OID 37872)
-- Name: f_profil_lampiran_save(character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_profil_lampiran_save(p_kode_pengguna character varying, p_kpj character varying, p_nik character varying, p_kode_dokumen character varying, p_path_dokumen character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_profil_penghuni_lampiran bigint;
BEGIN
-- 	raise notice 'chek apakah ada entri yang jadi invoice di blth itu';
-- 	select id_profil_penghuni_lampiran 
-- 	into v_id_profil_penghuni_lampiran
-- 	from profil_penghuni_lampiran where kpj=p_kpj and kode_dokumen=p_kode_dokumen;
	update  profil_penghuni_lampiran
	set aktif=false
	where  kpj=p_kpj and nik=p_nik and kode_dokumen=p_kode_dokumen;
	INSERT INTO profil_penghuni_lampiran(
	 	kpj, nik, kode_dokumen, path_dokumen,tgl_rekam, petugas_rekam
	)
	VALUES (
		p_kpj, p_nik,p_kode_dokumen, p_path_dokumen,now(),p_kode_pengguna
	) returning id_profil_penghuni_lampiran
	into v_id_profil_penghuni_lampiran;
	
	return ('{"ret":0,"id":'|| v_id_profil_penghuni_lampiran::text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 464 (class 1255 OID 37873)
-- Name: f_registrasi_cancel(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_cancel(p_kode_pengguna character varying, p_no_registrasi character varying, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
-- p_data {data_reg:{}, data_units:[]}
DECLARE
  v_rec record;
  v_json json;
  v_count_deleted int:=0;
  v_count_inserted int:=0;
  v_id_unit int;
BEGIN
	-- registrasi yang bisa di cancel adalah registrasi dengan status D dan R
	-- Akibat dari pencancelan ini
	--	untuk tiap2 unit dalam registrasi unit
	--		jika status process, cek jika tidak ada wl, maka set is_processed rusun_unit = false
	-- 		nonaktifkan registrasi_unit
	-- 	nonaktifkan registrasi penghuni
	--	non aktifkan registrasi
	
	raise notice 'check status registrasi';
	if not exists(select null from registrasi where no_registrasi=p_no_registrasi and status in('R','D') and aktif) then
		return '{"ret":-1,"msg":"Status registrasi hanya yang Draft/ Reject dan aktif yang bisa dicancel"}'::json ;
	end if;
	for v_rec in select * from registrasi_unit where no_registrasi=p_no_registrasi and aktif
	loop
		if not exists(select null from registrasi_unit where no_registrasi<>p_no_registrasi and aktif and id_unit=v_rec.id_unit) then
			update rusun_unit set is_processed=false where id_unit=v_rec.id_unit;
		end if;
	end loop;
	update registrasi_unit 
	set 
		aktif=false , tgl_na=now(), petugas_na=p_kode_pengguna
	where no_registrasi=p_no_registrasi and aktif;
	
	update registrasi_penghuni
	set aktif=false , tgl_na=now(), petugas_na=p_kode_pengguna
	where no_registrasi=p_no_registrasi and aktif;
	
	update registrasi
	set 
		aktif=false , tgl_na=now(), petugas_na=p_kode_pengguna,alasan_na=p_alasan_na
	where no_registrasi=p_no_registrasi and aktif;
	return ('{"ret":0,"msg":"Cancel registrasi berhasil"}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 465 (class 1255 OID 37874)
-- Name: f_registrasi_individu(character varying, character varying, character varying, character varying, character varying, character varying, character varying, date, smallint, smallint, boolean, character varying, character varying, character varying, character varying, bigint, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_individu(p_kode_pengguna character varying, p_kode_rusun character varying, p_no_registrasi character varying, p_kode_segmen character varying, p_kpj character varying, p_nik character varying, p_kode_unit_jenis character varying, p_tgl_req_menghuni date, p_jangka_waktu smallint, p_jmlh_unit smallint, p_hunian_keluarga boolean, p_nama character varying, p_kode_jenis_kelamin character varying, p_telpon character varying, p_email character varying, p_id_profil bigint, p_id_unit integer, p_alamat character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_no_registrasi varchar (50);

	v_rslt json;
	v_max_wl_no int;
	v_status varchar(1); 
	v_waiting_list boolean;
 
	v_waiting_proses boolean;
	v_waiting_list_no int;
	v_profil_ref_id bigint;
begin
	if coalesce(p_no_registrasi,'')='' then
		if exists(
			select null 
			from registrasi r 
			where aktif 
			and jenis_registrasi ='I'
			and status in ('D','S','R')
			and (
                  (kpj=p_kpj )
                  or 
                  (nik=p_nik )
                )
		) then
			return ('{"ret":-1,"msg":"Masih ada proses registrasi untuk KPJ/NIK tersebut"}')::json ;
		end if;
		if exists(select null
              from 
                registrasi_penghuni  rp
              where 
                aktif  and aktif_menghuni
                and rp.tgl_in<date_trunc('day',now()) 
                and (tgl_out is null or tgl_out>date_trunc('day',now()))
                and (
                  (rp.kpj=p_kpj )
                  or 
                  (rp.nik=p_nik )
                )
        )then
			return ('{"ret":-1,"msg":"KPJ/NIK tersebut masih menghuni unit"}')::json ;
		end if;
	
		if coalesce(p_id_unit,0)=0 then
			select max(waiting_list_no)
			into v_max_wl_no
			from registrasi r2 
			where aktif  and waiting_list  and not waiting_list_proses ;
			v_max_wl_no := coalesce(v_max_wl_no,0) + 1;
		
			INSERT INTO registrasi(
				jenis_registrasi,kode_rusun, kode_segmen , kpj,nik, kode_unit_jenis, tgl_request_menghuni, jangka_waktu_bln , jml_unit ,hunian_keluarga,
				kpj_nama , kode_jenis_kelamin, kpj_telp, kpj_email, waiting_list , waiting_list_no , available_step , tgl_rekam ,petugas_rekam ,profil_ref_id,
				kpj_alamat
			)
			values(
				'I', p_kode_rusun,p_kode_segmen, p_kpj, p_nik, p_kode_unit_jenis,	p_tgl_req_menghuni,	p_jangka_waktu,	p_jmlh_unit,p_hunian_keluarga,
				p_nama,	p_kode_jenis_kelamin,	p_telpon,	p_email, true, v_max_wl_no, 1, now(),p_kode_pengguna,p_id_profil,
				p_alamat
			)
			returning no_registrasi
			into v_no_registrasi;
			return ('{"ret":0,"action":"Inserted","noReg":"' || v_no_registrasi || '","wl":true,"wlNo":'|| v_max_wl_no::text ||'}')::json;
		else
			if coalesce(p_id_unit,0)<>0 and  not exists(
				select null from rusun_unit where id_unit=p_id_unit and is_rented and not is_filled and not is_maintenance and not is_processed
			) then
				return ('{"ret":-1,"msg":"Tidak bisa melakukan registrasi pad unit yang dipilih"}')::json ;
			end if;
			INSERT INTO registrasi(
				jenis_registrasi,kode_rusun, kode_segmen , kpj,nik, kode_unit_jenis, tgl_request_menghuni, jangka_waktu_bln , jml_unit ,hunian_keluarga,
				kpj_nama , kode_jenis_kelamin, kpj_telp, kpj_email, 
				available_step, 
				tgl_rekam ,petugas_rekam , profil_ref_id,kpj_alamat
			)
			values(
				'I',p_kode_rusun, p_kode_segmen, p_kpj, p_nik, p_kode_unit_jenis,	p_tgl_req_menghuni,	p_jangka_waktu,	p_jmlh_unit,p_hunian_keluarga,
				p_nama,	p_kode_jenis_kelamin,	p_telpon,	p_email, 
				case when p_id_profil is not null then 3 else 2 end ,
				now(),p_kode_pengguna,p_id_profil, p_alamat
			)
			returning no_registrasi
			into v_no_registrasi;
			
			-- insert into registrasi_unit
			insert into registrasi_unit (
				no_registrasi , id_unit , tgl_rekam , petugas_rekam , hunian_keluarga 
			)
			values(
				v_no_registrasi, p_id_unit, now(), p_kode_pengguna, p_hunian_keluarga
			);
			update rusun_unit  set is_processed = true where id_unit=p_id_unit;
		
			-- insert into registrasi_penghuni
			INSERT INTO registrasi_penghuni(
				no_registrasi, penanggung_jawab, kpj, kpj_nama, nik, nik_jenis, tgl_in,
				jenis_kelamin, id_profil_penghuni, id_unit, tgl_rekam, petugas_rekam, is_penyewa 
			)
			VALUES(
				v_no_registrasi, true,p_kpj,p_nama,p_nik,'KTP',p_tgl_req_menghuni,
				p_kode_jenis_kelamin, p_id_profil, p_id_unit,now(),p_kode_pengguna, true
			);
			
			return ('{"ret":0,"action":"Inserted","noReg":"' || v_no_registrasi || '","wl":false}')::json;
		end if;
	else
	
		select status , waiting_list , waiting_list_proses , profil_ref_id
		into v_status , v_waiting_list ,v_waiting_proses,v_profil_ref_id
		from registrasi  
		where no_registrasi =p_no_registrasi and aktif ;
		
		if 	v_status is null then
			return ('{"ret":-1,"msg":"Registrasi tidak ditemukan"}')::json ;
		end if;
	
		if 	v_status not in ('D','R') then
			return ('{"ret":-1,"msg":"Draft/ Reject Registrasi tidak ditemukan"}')::json ;
		end if;
		if coalesce(p_id_unit,0)=0 then
			update registrasi 
			set
				kpj_nama = p_nama, 
				kpj_telp = p_telpon, 
				kpj_alamat=p_alamat,
				kpj_email = p_email, 
				tgl_ubah = now(), 
				petugas_ubah = p_kode_pengguna
			where no_registrasi =p_no_registrasi;
		else		
			if v_waiting_list then	
				if not exists (select null from registrasi_unit ru where aktif and no_registrasi=p_no_registrasi) then 				
					if coalesce(p_id_unit,0)<>0 and  not exists(
						select null from rusun_unit where id_unit=p_id_unit and is_rented and not is_filled and not is_maintenance and not is_processed
					) then
						return ('{"ret":-1,"msg":"Tidak bisa melakukan registrasi pad unit yang dipilih"}')::json ;
					end if;
					insert into registrasi_unit (
						no_registrasi , id_unit , tgl_rekam , petugas_rekam ,hunian_keluarga 
					)
					values(
						p_no_registrasi, p_id_unit, now(), p_kode_pengguna,p_hunian_keluarga 
					);
					update rusun_unit  set is_processed = true where id_unit=p_id_unit;
				
					-- insert into registrasi_penghuni
					INSERT INTO registrasi_penghuni(
						no_registrasi, penanggung_jawab, kpj, kpj_nama, nik, nik_jenis, tgl_in,
						jenis_kelamin, id_profil_penghuni, id_unit, tgl_rekam, petugas_rekam, is_penyewa 
					)
					VALUES(
						p_no_registrasi, true,p_kpj,p_nama,p_nik,'KTP',p_tgl_req_menghuni,
						p_kode_jenis_kelamin, v_profil_ref_id, p_id_unit,now(),p_kode_pengguna,true
					);
				end if;
			
				update registrasi 
				set
					kpj_nama = p_nama, 
					kpj_telp = p_telpon, 
					kpj_alamat=p_alamat,
					kpj_email = p_email, 
					tgl_request_menghuni = p_tgl_req_menghuni,
					jangka_waktu_bln = p_jangka_waktu,
					waiting_list_proses = true,
					available_step = case when v_profil_ref_id is not null then 3 else 2 end,
					tgl_ubah = now(), 
					petugas_ubah = p_kode_pengguna
				where no_registrasi =p_no_registrasi;
			else
				update registrasi 
				set
					kpj_nama = p_nama, 
					kpj_telp = p_telpon, 
					kpj_alamat=p_alamat,
					kpj_email = p_email, 
					tgl_request_menghuni = p_tgl_req_menghuni,
					jangka_waktu_bln = p_jangka_waktu,
					tgl_ubah = now(), 
					petugas_ubah = p_kode_pengguna
				where no_registrasi =p_no_registrasi;
			end if;
		end if;
		return '{"ret":0,"action":"Updated"}'::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 466 (class 1255 OID 37876)
-- Name: f_registrasi_lampiran_save(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_lampiran_save(p_kode_pengguna character varying, p_no_registrasi character varying, p_kode_dokumen character varying, p_path_dokumen character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_registrasi_lampiran bigint;
BEGIN
	update registrasi_lampiran set aktif=false where no_registrasi=p_no_registrasi and kode_dokumen=p_kode_dokumen;
	INSERT INTO registrasi_lampiran(
	 	no_registrasi, kode_dokumen, path_dokumen,tgl_rekam, petugas_rekam
	)
	VALUES (
		p_no_registrasi, p_kode_dokumen, p_path_dokumen,now(),p_kode_pengguna
	) returning id_registrasi_lampiran
	into v_id_registrasi_lampiran;
-- 	if v_id_registrasi_lampiran is not null then
-- 		update registrasi_lampiran set aktif=false where id_registrasi_lampiran<>v_id_registrasi_lampiran and no_registrasi=p_no_registrasi and kode_dokumen=p_kode_dokumen;
		
-- 		-- set availability step menjadi 4 jika kode dokumen = 'F1'
-- 	end if;
	update registrasi set available_step=4 where no_registrasi=p_no_registrasi and p_kode_dokumen='F1';
	return ('{"ret":0,"id":'|| v_id_registrasi_lampiran::text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 467 (class 1255 OID 37877)
-- Name: f_registrasi_penghuni_cancel(character varying, bigint); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_penghuni_cancel(p_kode_pengguna character varying, p_id_registrasi_penghuni bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_registrasi_penghuni bigint;
	v_penanggung_jawab boolean;
	v_no_registrasi varchar(50);
	v_id_kontrak_sewa bigint;
	
	v_kpj varchar(50);
	v_nik varchar(50);
	v_is_penyewa boolean;
begin
	-- cek penghuni
	select id_registrasi_penghuni, penanggung_jawab, no_registrasi , id_kontrak_sewa , kpj,nik,is_penyewa
	into v_id_registrasi_penghuni, v_penanggung_jawab, v_no_registrasi , v_id_kontrak_sewa , v_kpj,v_nik, v_is_penyewa
	from registrasi_penghuni rp 
	where aktif and id_registrasi_penghuni=p_id_registrasi_penghuni;

	if v_id_registrasi_penghuni is null then 
		return ('{"ret":-1,"msg":"Registrasi penghuni tidak ditemukan"}')::json ;
	end if;
	
	if v_penanggung_jawab then 
		return ('{"ret":-1,"msg":"Tidak bisa membatalkan penghuni penanggung jawab unit"}')::json ;
	end if;

	if v_id_kontrak_sewa is not null then
		return ('{"ret":-1,"msg":"Sudah kontrak tidak bisa membatalkan registrasi penghuni"}')::json ;	
	end if;
	
	if v_is_penyewa then
		return ('{"ret":-1,"msg":"Penyewa tidak bisa di batalkan"}')::json ;	
	end if;
	
	update registrasi_penghuni 
	set aktif =false, tgl_na =now()
	where id_registrasi_penghuni = p_id_registrasi_penghuni;

	return '{"ret":0,"action":"Deleted"}'::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 468 (class 1255 OID 37878)
-- Name: f_registrasi_perusahaan(character varying, character varying, character varying, character varying, character varying, date, smallint, smallint, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_perusahaan(p_kode_pengguna character varying, p_kode_rusun character varying, p_no_registrasi character varying, p_npp character varying, p_kode_unit_jenis character varying, p_tgl_req_menghuni date, p_jangka_waktu smallint, p_jmlh_unit smallint, p_hunian_keluarga boolean, p_prs_nama character varying, p_prs_depatermen character varying, p_prs_telp character varying, p_prs_alamat character varying, p_prs_email character varying, p_pic_nik character varying, p_pic_nama character varying, p_pic_telp character varying, p_pic_email character varying, p_data_units json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_no_registrasi varchar (50);

	v_json json;
	v_rslt json;
	v_max_wl_no int;
	v_status varchar(1); 
	v_waiting_list boolean;
	v_waiting_list_no int;
begin	
	if coalesce(p_no_registrasi,'')='' then			
		-- cek unit 
		for v_json  IN  select json_array_elements(p_data_units) 
		loop
			
			if not exists(
				select null from rusun_unit where id_unit=(v_json->>'id_unit')::int and is_rented and not is_filled and not is_maintenance and not is_processed
			) then
				return ('{"ret":-1,"msg":"Tidak bisa melakukan registrasi pada unit :"' || coalesce((select nama_unit from rusun_unit where id_unit=(v_json->>'id_unit')::int),'') || '}')::json ;
			end if;
		end loop;

		INSERT INTO registrasi(
			jenis_registrasi,kode_rusun, npp, kode_unit_jenis, tgl_request_menghuni, jangka_waktu_bln , jml_unit ,hunian_keluarga,
			perusahaan_nama,perusahaan_departemen,perusahaan_telp,perusahaan_alamat,perusahaan_email,
			perusahaan_pic,perusahaan_pic_nik,perusahaan_pic_telp,perusahaan_pic_email,
			available_step, tgl_rekam ,petugas_rekam 
		)
		values(
			'P',p_kode_rusun, p_npp, p_kode_unit_jenis,	p_tgl_req_menghuni,	p_jangka_waktu,	p_jmlh_unit,p_hunian_keluarga,
			p_prs_nama,p_prs_depatermen,p_prs_telp,p_prs_alamat,p_prs_email,
			p_pic_nama,p_pic_nik,p_pic_telp,p_pic_email,
			3,  now(),p_kode_pengguna
		)
		returning no_registrasi
		into v_no_registrasi;
		
		for v_json  IN  select json_array_elements(p_data_units) 
		loop
			insert into registrasi_unit (
				no_registrasi , id_unit , tgl_rekam , petugas_rekam 
			)
			values(
				v_no_registrasi, (v_json->>'id_unit')::int , now(), p_kode_pengguna
			);
			update rusun_unit  set is_processed = true where id_unit=(v_json->>'id_unit')::int;
		end loop;
	
		return ('{"ret":0,"action":"Inserted","noReg":"' || v_no_registrasi || '"}')::json;
	
	else
		if not exists(select null from registrasi where no_registrasi=p_no_registrasi and aktif and status in('D','R')) then
			return ('{"ret":-1,"msg":"Draft/ Reject registrasi tidak ditemukan"}')::json ;
		end if;
		UPDATE registrasi
		SET 
			tgl_request_menghuni=p_tgl_req_menghuni, 
			jangka_waktu_bln=p_jangka_waktu, 
			perusahaan_nama=p_prs_nama, 
			perusahaan_departemen=p_prs_depatermen, 
			perusahaan_alamat=p_prs_alamat, 
			perusahaan_telp=p_prs_telp, 
			perusahaan_email=p_prs_email, 
			perusahaan_pic=p_pic_nama, 
			perusahaan_pic_telp=p_pic_nik, 
			perusahaan_pic_email=p_pic_email, 
			perusahaan_pic_nik=p_pic_telp,
			tgl_ubah = now(), 
			petugas_ubah = p_kode_pengguna
		WHERE no_registrasi=p_no_registrasi;

		return '{"ret":0,"action":"Updated"}'::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 469 (class 1255 OID 37879)
-- Name: f_registrasi_submit(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_submit(p_kode_pengguna character varying, p_no_registrasi character varying, p_pihak1_nama character varying, p_pihak1_jabatan character varying, p_pihak1_ttd_title character varying, p_pihak2_nama character varying, p_pihak2_jabatan character varying, p_pihak2_perusahaan character varying, p_pihak2_ttd_nama character varying, p_pihak2_ttd_jabatan character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
	v_id_kontrak bigint;
	v_approval boolean;
	v_aktif  boolean;
	v_status varchar(1);
	v_no_kontrak varchar(50);
	v_rec record;
	v_rec_unit record;
BEGIN	
	raise notice 'get informasi registrasi';
	select status
	into v_status
	from registrasi where no_registrasi=p_no_registrasi and aktif;
	
	if v_status is null then
		return '{"ret":-1,"msg":"No Registrasi tidak terdaftar"}'::json ; 
	elsif v_status<>'D' and v_status<>'R' then
		return '{"ret":-2,"msg":"Bukan Draft registrasi, tidak bisa di submit"}'::json ; 
	end if;
	
	
	raise notice 'get id_kotrak_sewa from kontrak_sewa';
	select id_kontrak_sewa , approval, no_kontrak_sewa, aktif
	into v_id_kontrak, v_approval, v_no_kontrak, v_aktif
	from kontrak_sewa where no_registrasi=p_no_registrasi;
	if v_id_Kontrak is not null and not v_aktif then 
		return '{"ret":-2,"msg":"Kontrak tidak aktif"}'::json ; 
	elsif v_id_Kontrak is not null and v_approval then 
		return '{"ret":-2,"msg":"Kontrak sudah di approve"}'::json ; 	
	end if;

	for v_rec in
		select * from registrasi where no_registrasi=p_no_registrasi and aktif
	loop
		if v_id_kontrak is  null then
		
			
			raise notice '%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%,%',
			p_no_registrasi, v_rec.kode_rusun, v_rec.jenis_registrasi, now(), 
				p_pihak1_nama, p_pihak1_jabatan,p_pihak1_ttd_title,p_pihak1_nama,p_pihak1_jabatan,
				v_rec.kpj, p_pihak2_nama, v_rec.npp, p_pihak2_perusahaan, 
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_alamat else  v_rec.perusahaan_alamat end,
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_telp else  v_rec.perusahaan_pic_telp end,
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_email else  v_rec.perusahaan_pic_email end,
				case when v_rec.jenis_registrasi='I' then v_rec.nik else  v_rec.perusahaan_pic_nik end,
				case when v_rec.jenis_registrasi='I' then v_rec.kode_jenis_kelamin else  null end,
				case when v_rec.jenis_registrasi='I' then null  else  v_rec.perusahaan_pic_jabatan end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_departemen end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_telp end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_alamat end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_email end,
				case when v_rec.jenis_registrasi='I' then 'PENYEWA' else  p_pihak2_nama end,
				case when v_rec.jenis_registrasi='I' then p_pihak2_nama else  p_pihak2_ttd_nama end,
				case when v_rec.jenis_registrasi='I' then null else  p_pihak2_ttd_jabatan end,
				case when coalesce(v_rec.jml_unit,0)=1 then true else false end,v_rec.jml_unit,v_rec.jangka_waktu_bln,
				v_rec.tgl_request_menghuni, v_rec.tgl_request_menghuni + interval '1 month' * v_rec.jangka_waktu_bln - interval '1 day',
				1,1, extract (day from v_rec.tgl_request_menghuni), extract (day from v_rec.tgl_request_menghuni), 
				20, extract (day from v_rec.tgl_request_menghuni), null,
				0, 0, 10, true, now(), p_kode_pengguna;
			
			INSERT INTO kontrak_sewa(
				no_registrasi, kode_rusun, jenis_registrasi, tgl_kontrak_sewa, 
				pihak1_nama_lengkap, pihak1_jabatan,pihak1_ttd_title, pihak1_ttd_nama, pihak1_ttd_jabatan, 
				pihak2_kpj, pihak2_nama_lengkap, pihak2_npp, pihak2_nama_perusahaan, 
				pihak2_alamat ,
				pihak2_telpon, 
				pihak2_email, 
				pihak2_nik ,
				pihak2_jenis_kelamin, 
				pihak2_jabatan, 
				pihak2_departemen_prs,
				pihak2_telp_prs, 
				pihak2_alamat_prs, 
				pihak2_email_prs,
				pihak2_ttd_title,
				pihak2_ttd_nama, 
				pihak2_ttd_jabatan, 
				sewa_satu_unit, jmlh_unit, jmlh_bulan_sewa, 
				tgl_mulai_sewa, tgl_berakhir_sewa, 
				jmlh_bulan_deposit, inv_periode_bulan, inv_duedate, inv_duedate_bayar, 
				inv_duedate_utilitas, inv_duedate_utilitas_bayar, golongan_invoice, 
				biaya_administrasi, biaya_administrasi_by_prosen, biaya_denda, biaya_denda_by_prosen, 	
				tgl_rekam, petugas_rekam)
			VALUES (
				p_no_registrasi, v_rec.kode_rusun, v_rec.jenis_registrasi, now(), 
				p_pihak1_nama, p_pihak1_jabatan,p_pihak1_ttd_title,p_pihak1_nama,p_pihak1_jabatan,
				v_rec.kpj, p_pihak2_nama, v_rec.npp, p_pihak2_perusahaan, 
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_alamat else  v_rec.perusahaan_alamat end,
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_telp else  v_rec.perusahaan_pic_telp end,
				case when v_rec.jenis_registrasi='I' then v_rec.kpj_email else  v_rec.perusahaan_pic_email end,
				case when v_rec.jenis_registrasi='I' then v_rec.nik else  v_rec.perusahaan_pic_nik end,
				case when v_rec.jenis_registrasi='I' then v_rec.kode_jenis_kelamin else  null end,
				case when v_rec.jenis_registrasi='I' then null  else  v_rec.perusahaan_pic_jabatan end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_departemen end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_telp end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_alamat end,
				case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_email end,
				case when v_rec.jenis_registrasi='I' then 'PENYEWA' else  p_pihak2_nama end,
				case when v_rec.jenis_registrasi='I' then p_pihak2_nama else  p_pihak2_ttd_nama end,
				case when v_rec.jenis_registrasi='I' then null else  p_pihak2_ttd_jabatan end,
				case when coalesce(v_rec.jml_unit,0)=1 then true else false end,v_rec.jml_unit,v_rec.jangka_waktu_bln,
				v_rec.tgl_request_menghuni, v_rec.tgl_request_menghuni + interval '1 month' * v_rec.jangka_waktu_bln - interval '1 day',
				1,1, extract (day from v_rec.tgl_request_menghuni), extract (day from v_rec.tgl_request_menghuni), 
				20, extract (day from v_rec.tgl_request_menghuni), null,
				0, true, 10, true, now(), p_kode_pengguna)
			returning no_kontrak_sewa,id_kontrak_sewa
			into  v_no_kontrak, v_id_kontrak;
			
			-- insert kontrak sewa unit
			for v_rec_unit in select * from registrasi_unit where no_registrasi=p_no_registrasi and aktif
			loop
				INSERT INTO kontrak_sewa_unit(id_kontrak_sewa, id_unit,tgl_rekam, petugas_rekam,hunian_keluarga)
				VALUES (v_id_kontrak,v_rec_unit.id_unit,now(),p_kode_pengguna,v_rec_unit.hunian_keluarga);
			end loop;
			-- update penghuni
			update registrasi_penghuni
			set 
				tgl_in=case when tgl_in < v_rec.tgl_request_menghuni then v_rec.tgl_request_menghuni else tgl_in end,
				id_kontrak_sewa=v_id_kontrak
			where 
				no_registrasi=p_no_registrasi 
				and aktif;
		else
			UPDATE kontrak_sewa
			SET
				tgl_kontrak_sewa=now(), 
				pihak1_nama_lengkap=p_pihak1_nama, 
				pihak1_jabatan=p_pihak1_jabatan, 
				pihak1_ttd_title=p_pihak1_ttd_title, 
				pihak1_ttd_nama=p_pihak1_nama, 
				pihak1_ttd_jabatan=pihak1_jabatan, 
				pihak2_kpj=v_rec.kpj, 
				pihak2_nama_lengkap=p_pihak2_nama, 
				pihak2_npp=v_rec.npp, 
				pihak2_nama_perusahaan=p_pihak2_perusahaan, 
				pihak2_alamat = case when v_rec.jenis_registrasi='I' then v_rec.kpj_alamat else  v_rec.perusahaan_alamat end,
				pihak2_telpon= case when v_rec.jenis_registrasi='I' then v_rec.kpj_telp else  v_rec.perusahaan_pic_telp end, 
				pihak2_jabatan=case when v_rec.jenis_registrasi='I' then null  else  v_rec.perusahaan_pic_jabatan end, 
				pihak2_nik=case when v_rec.jenis_registrasi='I' then v_rec.nik else  v_rec.perusahaan_pic_nik end, 
				pihak2_jenis_kelamin=case when v_rec.jenis_registrasi='I' then v_rec.kode_jenis_kelamin else  null end, 
				pihak2_email=case when v_rec.jenis_registrasi='I' then v_rec.kpj_email else  v_rec.perusahaan_pic_email end, 
				pihak2_telp_prs=case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_telp end, 
				pihak2_alamat_prs=case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_alamat end, 
				pihak2_departemen_prs=case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_departemen end, 
				pihak2_email_prs=case when v_rec.jenis_registrasi='I' then null else  v_rec.perusahaan_email end,
				pihak2_ttd_title=case when v_rec.jenis_registrasi='I' then 'PENYEWA' else  p_pihak2_nama end, 
				pihak2_ttd_nama=case when v_rec.jenis_registrasi='I' then p_pihak2_nama else  p_pihak2_ttd_nama end, 
				pihak2_ttd_jabatan=case when v_rec.jenis_registrasi='I' then null else  p_pihak2_ttd_jabatan end, 
				sewa_satu_unit=case when coalesce(v_rec.jml_unit,0)=1 then true else false end, 
				jmlh_unit=v_rec.jml_unit, 
				jmlh_bulan_sewa=v_rec.jangka_waktu_bln, 
				tgl_mulai_sewa=v_rec.tgl_request_menghuni, 
				tgl_berakhir_sewa= v_rec.tgl_request_menghuni + interval '1 month' * v_rec.jangka_waktu_bln - interval '1 day', 
				inv_duedate= extract (day from v_rec.tgl_request_menghuni), 
				inv_duedate_bayar= extract (day from v_rec.tgl_request_menghuni), 
				tgl_ubah=now(), 
				petugas_ubah=p_kode_pengguna
			WHERE id_kontrak_sewa=v_id_kontrak;
			-- delete from kontrak_unit where id unit tidak ada di registrasi
			delete from kontrak_sewa_unit  
			where id_kontrak_sewa=v_id_kontrak and id_unit not in(select id_unit from registrasi_unit where no_registrasi=p_no_registrasi and aktif);
		
			-- insert into kontrak_sewa unit
			for v_rec_unit in 
				select id_unit from registrasi_unit 
				where no_registrasi=p_no_registrasi and aktif 
				and id_unit not in(select id_unit from kontrak_sewa_unit where id_kontrak_sewa=v_id_kontrak)
			loop
				INSERT INTO kontrak_sewa_unit(id_kontrak_sewa, id_unit,tgl_rekam, petugas_rekam,hunian_keluarga)
				VALUES (v_id_kontrak,v_rec_unit.id_unit,now(),p_kode_pengguna,v_rec_unit.hunian_keluarga);
			end loop;
			
			-- update penghuni 
			update registrasi_penghuni
			set 
				tgl_in=case when tgl_in < v_rec.tgl_request_menghuni then v_rec.tgl_request_menghuni else tgl_in end,
				id_kontrak_sewa=v_id_kontrak
			where 
				no_registrasi=p_no_registrasi 
				and aktif;
		end if;
	end loop;
	
	-- update status registrasi
	update registrasi 
	set status ='S'
	where no_registrasi =p_no_registrasi ;
	
	return ('{"ret":0,"idKontrak":'|| v_id_kontrak::text ||'}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 463 (class 1255 OID 37881)
-- Name: f_registrasi_unit(character varying, character varying, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_unit(p_kode_pengguna character varying, p_no_registrasi character varying, p_data_units json) RETURNS json
    LANGUAGE plpgsql
    AS $$
-- p_data {data_reg:{}, data_units:[]}
DECLARE
  v_rec record;
  v_json json;
  v_count_deleted int:=0;
  v_count_inserted int:=0;
  v_id_unit int;
  v_hunian_keluarga boolean;
BEGIN
	raise notice 'checking unit jika unit tidak ada dalam parameter data unit';
	-- registrasi_unit --> process=true
	-- 	cari max min no_waiting_list 
	-- 		jika tidak ada maka set rusun_unit field is_processed=false
	-- 		jika ada maka set status process registrasi_unit wl tsb menjadi true
	-- 	delete unit dari registrasi unit
	for v_rec in select reg_u.*,
				(	select min(waiting_no) 
				 	from registrasi_unit 
				 	where  aktif and waiting_list
				 		and waiting_no>coalesce(reg_u.waiting_no,0)
				 		and id_unit=reg_u.id_unit
				) min_wl
				from registrasi_unit reg_u
				where  no_registrasi= p_no_registrasi 
						and id_unit not in (select (x->>'id_unit')::int from (select json_array_elements(p_data_units)  x) a)
	loop
-- 		if v_rec.process and v_rec.min_wl is not null then
-- 			update registrasi_unit set process=true where  id_unit=v_rec.id_unit and waiting_no=v_rec.min_wl and aktif and waiting_list;
-- 		els
		-- jika tidak ada waiting list maka balikkan status processes unit menjadi false 
		if v_rec.process and v_rec.min_wl is null then
			update rusun_unit set is_processed=false where id_unit=v_rec.id_unit;
		end if;
		-- hapus data unit dan penghuni untuk registrasi unit ini
		delete from registrasi_unit where no_registrasi= p_no_registrasi and id_unit=v_rec.id_unit;
		delete from registrasi_penghuni where no_registrasi= p_no_registrasi and id_unit=v_rec.id_unit;
	end loop;
	-- get data hunian_keluarga from registrasi
	select hunian_keluarga 
	into v_hunian_keluarga
	from registrasi
	where no_registrasi=p_no_registrasi;
	
	raise notice 'insert data unit baru yang tidak ada dalam no registrasi_unit tersebut';	
	for v_json  IN  select json_array_elements(p_data_units) 
	loop
		if not exists(select id_unit from registrasi_unit where aktif and no_registrasi= p_no_registrasi  and id_unit=(v_json->>'id_unit')::bigint) then
			INSERT INTO registrasi_unit(no_registrasi, id_unit, tgl_rekam, petugas_rekam,hunian_keluarga)
			values(p_no_registrasi,(v_json->>'id_unit')::int,now(), p_kode_pengguna,coalesce(v_hunian_keluarga,false));
			v_id_unit = (v_json->>'id_unit')::int;
			v_count_inserted = v_count_inserted + 1;
		end if;
	end loop;
	if v_count_inserted =1 then
		return ('{"ret":0,"deletedCount":'|| v_count_deleted::text ||',"insertedCount":'|| v_count_inserted:: text ||',"id_unit":'|| v_id_unit::text ||'}')::json;
	else
		return ('{"ret":0,"deletedCount":'|| v_count_deleted::text ||',"insertedCount":'|| v_count_inserted:: text ||'}')::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 470 (class 1255 OID 37882)
-- Name: f_registrasi_waiting_list_delete(character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_waiting_list_delete(p_kode_pengguna character varying, p_no_registrasi character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_kode_rusun varchar(5);
	v_waiting_list_no integer;
	v_no_registrasi varchar(50);
	v_kode_unit_jenis varchar(5);
BEGIN
	raise notice 'check jika registrasi adalah waiting list';
	select no_registrasi,waiting_list_no,kode_rusun,kode_unit_jenis 
	into v_no_registrasi,v_waiting_list_no,v_kode_rusun,v_kode_unit_jenis
	from registrasi
	where no_registrasi=p_no_registrasi and aktif and waiting_list and not waiting_list_proses and status='D';
	
	if  v_no_registrasi is null then
		return '{"ret":-1,"msg":"Tidak ditemukan waiting list pada no registrasi ini"}'::json;
	end if;
	raise notice 'set waiting aktif waiting list false';
	update registrasi
	set 
		aktif=false,
		tgl_na=now(),
		alasan_na='Cancel waiting list',
		petugas_na=p_kode_pengguna
	where   no_registrasi=p_no_registrasi;
	
	-- update no waiting list yang di atasnya
--	update registrasi
--	set 
--		waiting_list_no=waiting_list_no-1
--	where   aktif and waiting_list and waiting_list_no>v_waiting_list_no and kode_rusun=v_kode_rusun and kode_unit_jenis=v_kode_unit_jenis;
	return ('{"ret":0}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 471 (class 1255 OID 37883)
-- Name: f_registrasi_waiting_reset_no(character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_registrasi_waiting_reset_no(p_kode_pengguna character varying, p_kode_rusun character varying, p_by_tgl_req_menghuni boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare 
	v_waiting_list_no integer;
BEGIN
	if coalesce(p_by_tgl_req_menghuni,false)=false then
		with data_urut as(
			select no_registrasi,
				ROW_NUMBER () OVER (ORDER BY waiting_list_no) waiting_list_no
			from  registrasi 
			where aktif and waiting_list and not waiting_list_proses and kode_rusun=p_kode_rusun
		)
		update registrasi 
		set waiting_list_no=data_urut.waiting_list_no
		from data_urut
		where registrasi.no_registrasi=data_urut.no_registrasi;
		return '{"ret":0,"msg":"No waiting list direset mulai dari no 1"}'::json;
	else
		with data_urut as(
			select no_registrasi,
				ROW_NUMBER () OVER (ORDER BY tgl_request_menghuni,waiting_list_no) waiting_list_no
			from  registrasi 
			where aktif and waiting_list and not waiting_list_proses
		)
		update registrasi 
		set waiting_list_no=data_urut.waiting_list_no
		from data_urut
		where registrasi.no_registrasi=data_urut.no_registrasi;
		
		return '{"ret":0,"msg":"No waiting list direset berdasar tgl request menghuni"}'::json;
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 472 (class 1255 OID 37884)
-- Name: f_settings_agama_save(character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_agama_save(p_kode_pengguna character varying, p_kode_agama character varying, p_nama_agama character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if exists(select null from kode_agama where kode_agama=p_kode_agama) then
			return '{"ret":-1,"msg":"Kode Agama sudah terdaftar"}'::json ;
		end if;
		
		insert into kode_agama(kode_agama,nama_agama, tgl_rekam,petugas_rekam)
		values (p_kode_agama,p_nama_agama,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_agama
		set 
			nama_agama=p_nama_agama,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_agama=p_kode_agama;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 473 (class 1255 OID 37885)
-- Name: f_settings_blok_save(character varying, integer, character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_blok_save(p_kode_pengguna character varying, p_id_rusun_blok integer, p_kode_blok character varying, p_kode_rusun character varying, p_nama_blok character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_rusun varchar(5);
	v_kode_blok varchar(5);
BEGIN
	if p_act='N' then
		raise notice 'Cek kode  rusun';
		if not exists(select null from rusun where kode_rusun=p_kode_rusun and aktif) then
			return '{"ret":-1,"msg":"Kode Rusun aktif tidak ditemukan"}'::json ;
		end if;
		
		if exists(select null from rusun_blok where kode_blok=p_kode_blok  and kode_rusun=p_kode_rusun) then
			return '{"ret":-1,"msg":"Kode blok sudah terdaftar pada rusun tersebut"}'::json ;
		end if;
		
		insert into rusun_blok(kode_blok,nama_blok, tgl_rekam,petugas_rekam,kode_rusun)
		values (p_kode_blok,p_nama_blok,now(),p_kode_pengguna,p_kode_rusun);
		v_action := 'Inserted';
	else
		select kode_rusun,kode_blok 
		into v_kode_rusun,v_kode_blok 
		from rusun_blok where id_rusun_blok=p_id_rusun_blok;
		
		if v_kode_rusun is null then
			return '{"ret":-4,"msg":"id rusun blok tidak ditemukan"}'::json ;
		end if;
		raise notice '%-%-%-%',v_kode_rusun,p_kode_rusun,v_kode_blok,p_kode_blok;
		if v_kode_rusun<>p_kode_rusun  or v_kode_blok<>p_kode_blok then
			if not exists (select null from rusun where kode_rusun=p_kode_rusun and aktif) then
				return '{"ret":-5,"msg":"Kode Rusun aktif tidak ditemukan"}'::json ;
			end if;
			if exists (select null from rusun_blok where kode_rusun=p_kode_rusun and kode_blok=p_kode_blok and aktif) then
				return '{"ret":-6,"msg":"Kode Blok telah terdaftar "}'::json ;
			end if;
		end if;
		
		update rusun_blok
		set 
			nama_blok=p_nama_blok,
			aktif=coalesce(p_aktif,true),
			kode_rusun=p_kode_rusun,
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_blok=p_kode_blok;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 474 (class 1255 OID 37886)
-- Name: f_settings_fasilitas_rusun_save(character varying, integer, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_fasilitas_rusun_save(p_kode_pengguna character varying, p_id_fasilitas_rusun integer, p_kode_rusun character varying, p_kode_fasilitas character varying, p_keterangan character varying, p_aktif boolean) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_kode_fasilitas varchar(5);
	v_action varchar(20):='';
BEGIN
	if not exists(select null from fasilitas_rusun where id_fasilitas_rusun=p_id_fasilitas_rusun) then
		if  exists(select null from fasilitas_rusun where kode_fasilitas=p_kode_fasilitas and kode_rusun=p_kode_rusun) then
			return '{"ret":-1,"msg":"Kode fasilitas sudah terdaftar pada rusun tersebut"}'::json ;
		end if;
		insert into fasilitas_rusun(kode_rusun,kode_fasilitas, keterangan, tgl_rekam,petugas_rekam)
		values (p_kode_rusun,p_kode_fasilitas,  p_keterangan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		select kode_fasilitas
		into v_kode_fasilitas
		from fasilitas_rusun
		where id_fasilitas_rusun=p_id_fasilitas_rusun;
		
		if v_kode_fasilitas<>p_kode_fasilitas and 
			exists(select null from fasilitas_rusun where kode_fasilitas=p_kode_fasilitas and kode_rusun=p_kode_rusun and id_fasilitas_rusun<>p_id_fasilitas_rusun) then
			return '{"ret":-2,"msg":"Fasilitas sudah terdaftar dalam rusun tersebut"}'::json ;
		end if;
		
		update fasilitas_rusun
		set  
			kode_fasilitas=p_kode_fasilitas,
			keterangan=p_keterangan,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where id_fasilitas_rusun=p_id_fasilitas_rusun;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 476 (class 1255 OID 37887)
-- Name: f_settings_fasilitas_save(character varying, character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_fasilitas_save(p_kode_pengguna character varying, p_kode_fasilitas character varying, p_nama_fasilitas character varying, p_keterangan character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if  exists(select null from fasilitas where kode_fasilitas=p_kode_fasilitas) then
			return '{"ret":-1,"msg":"Kode fasilitas sudah terdaftar"}'::json ;
		end if;
		if exists(select null from fasilitas where nama_fasilitas=p_nama_fasilitas) then
			return '{"ret":-2,"msg":"Nama Fasilitas sudah terdaftar"}'::json ;
		end if;
		insert into fasilitas(kode_fasilitas, nama_fasilitas, keterangan, tgl_rekam,petugas_rekam)
		values (p_kode_fasilitas, p_nama_fasilitas, p_keterangan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		if exists(select null from fasilitas where nama_fasilitas=p_nama_fasilitas and kode_fasilitas<>p_kode_fasilitas) then
			return '{"ret":-2,"msg":"Nama Fasilitas sudah terdaftar"}'::json ;
		end if;
		update fasilitas
		set 
			nama_fasilitas=p_nama_fasilitas,
			keterangan=p_keterangan,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_fasilitas=p_kode_fasilitas;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 477 (class 1255 OID 37888)
-- Name: f_settings_golongan_listrik_save(character varying, character varying, character varying, smallint, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_golongan_listrik_save(p_kode_pengguna character varying, p_kode_golongan_listrik character varying, p_deskripsi character varying, p_besar_daya_watt smallint, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if  exists(select null from kode_golongan_listrik where kode_golongan_listrik=p_kode_golongan_listrik) then
			return '{"ret":-1,"msg":"Kode golongan listrik sudah terdaftar"}'::json ;
		end if;
		insert into kode_golongan_listrik(kode_golongan_listrik, deskripsi, besar_daya_watt, tgl_rekam,petugas_rekam)
		values (p_kode_golongan_listrik, p_deskripsi, p_besar_daya_watt,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_golongan_listrik
		set 
			deskripsi=p_deskripsi,
			besar_daya_watt=p_besar_daya_watt,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_golongan_listrik=p_kode_golongan_listrik;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 478 (class 1255 OID 37889)
-- Name: f_settings_jenis_kendaraan_save(character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_jenis_kendaraan_save(p_kode_pengguna character varying, p_kode_jenis_kendaraan character varying, p_nama_jenis_kendaraan character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if  exists(select null from kode_jenis_kendaraan where kode_jenis_kendaraan=p_kode_jenis_kendaraan) then
			return '{"ret":-1,"msg":"Kode jenis kendaran sudah terdaftar"}'::json ;
		end if;
		insert into kode_jenis_kendaraan(kode_jenis_kendaraan,nama_jenis_kendaraan, tgl_rekam,petugas_rekam)
		values (p_kode_jenis_kendaraan,p_nama_jenis_kendaraan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_jenis_kendaraan
		set 
			nama_jenis_kendaraan=p_nama_jenis_kendaraan,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_jenis_kendaraan=p_kode_jenis_kendaraan;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 479 (class 1255 OID 37890)
-- Name: f_settings_jenis_nik_save(character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_jenis_nik_save(p_kode_pengguna character varying, p_kode_jenis_nik character varying, p_nama_jenis_nik character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if  exists(select null from kode_jenis_nik where kode_jenis_nik=p_kode_jenis_nik) then
			return '{"ret":-1,"msg":"Kode Jenis NIK sudah terdaftar"}'::json ;
		end if;
		insert into kode_jenis_nik(kode_jenis_nik,nama_jenis_nik, tgl_rekam,petugas_rekam)
		values (p_kode_jenis_nik,p_nama_jenis_nik,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_jenis_nik
		set 
			nama_jenis_nik=p_nama_jenis_nik,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_jenis_nik=p_kode_jenis_nik;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 480 (class 1255 OID 37891)
-- Name: f_settings_kantor_save(character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_kantor_save(p_kode_pengguna character varying, p_kode_kantor character varying, p_kode_kantor_induk character varying, p_nama_kantor character varying, p_jenis_kantor character varying, p_alamat character varying, p_keterangan character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_kantor_induk varchar(5);
BEGIN
	if p_act='N' then
		raise notice 'Cek kode induk kantor';
		if p_kode_kantor_induk::text is not null and not exists(select kode_kantor from kode_kantor where kode_kantor=p_kode_kantor_induk and aktif) then
			return '{"ret":-1,"msg":"Kode kantor induk tidak ditemukan"}'::json ;
		end if;
		if exists(select null from kode_kantor where kode_kantor=p_kode_kantor) then
			return '{"ret":-1,"msg":"Kode kantor sudah terdaftar"}'::json ;
		end if;
		
		raise notice 'tes';
		insert into kode_kantor(kode_kantor,kode_kantor_induk,nama_kantor,jenis_kantor, alamat, keterangan, tgl_rekam,petugas_rekam)
		values (p_kode_kantor,p_kode_kantor_induk,p_nama_kantor,p_jenis_kantor,p_alamat,p_keterangan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		select kode_kantor_induk 
		into v_kode_kantor_induk
		from kode_kantor where kode_kantor=p_kode_kantor and aktif;
		
		if p_kode_kantor_induk::text is not null and p_kode_kantor_induk<>v_kode_kantor_induk and not exists(select kode_kantor from kode_kantor where kode_kantor=p_kode_kantor_induk and aktif) then
			return '{"ret":-1,"msg":"Kode kantor induk aktif tidak ditemukan"}'::json ;
		end if;
		update kode_kantor
		set 
			kode_kantor_induk=p_kode_kantor_induk,
			nama_kantor=p_nama_kantor,
			aktif=coalesce(p_aktif,true),
			jenis_kantor=p_jenis_kantor,
			alamat=p_alamat,
			keterangan=p_keterangan,
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_kantor=p_kode_kantor;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 481 (class 1255 OID 37892)
-- Name: f_settings_lantai_save(character varying, integer, character varying, integer, smallint, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_lantai_save(p_kode_pengguna character varying, p_id_lantai integer, p_kode_rusun character varying, p_id_rusun_blok integer, p_no_lantai smallint, p_nama_lantai character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_rusun varchar(5);
	v_no_lantai smallint;
	v_id_rusun_blok int;
BEGIN
	if p_act='N' then
		raise notice 'Cek kode rusun';
		if not  exists(select null from rusun where kode_rusun=p_kode_rusun and aktif) then
			return '{"ret":-1,"msg":"kode rusun aktif tidak ditemukan"}'::json ;
		end if;
		
		if exists(select null from rusun_lantai where kode_rusun=p_kode_rusun and coalesce(id_rusun_blok,0)=coalesce(p_id_rusun_blok,0) and no_lantai=p_no_lantai ) then
			return '{"ret":-1,"msg":"No Lantai sudah terdaftar pada blok-rusun tersebut"}'::json ;
		end if;
		
		insert into rusun_lantai(kode_rusun,id_rusun_blok,no_lantai,nama_lantai, tgl_rekam,petugas_rekam)
		values (p_kode_rusun, p_id_rusun_blok,p_no_lantai,p_nama_lantai,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		select kode_rusun,no_lantai ,id_rusun_blok
		into v_kode_rusun,v_no_lantai,v_id_rusun_blok
		from rusun_lantai where id_lantai=p_id_lantai;
		
		if v_kode_rusun is null then
			return '{"ret":-4,"msg":"id lantai tidak ditemukan"}'::json ;
		end if;
		
		if v_kode_rusun=p_kode_rusun  then
			if exists(select null from rusun_lantai where kode_rusun=p_kode_rusun and coalesce(id_rusun_blok,0)=coalesce(p_id_rusun_blok,0) and no_lantai=p_no_lantai and id_lantai<>p_id_lantai) then
				return '{"ret":-5,"msg":"No Lantai sudah terdaftar pada blok-rusun tersebut"}'::json ;
			end if;
		end if;
	
		if v_kode_rusun<>p_kode_rusun  then
			if not exists (select null from rusun where kode_rusun=p_kode_rusun and aktif) then
				return '{"ret":-5,"msg":"Kode Rusun aktif tidak ditemukan"}'::json ;
			end if;
			if exists(select null from rusun_lantai where kode_rusun=p_kode_rusun and coalesce(id_rusun_blok,0)=coalesce(p_id_rusun_blok,0) and no_lantai=p_no_lantai and id_lantai<>p_id_lantai) then
				return '{"ret":-5,"msg":"No Lantai sudah terdaftar pada blok-rusun tersebut"}'::json ;
			end if;
		end if;
		
		update rusun_lantai
		set 
			kode_rusun=p_kode_rusun,
			no_lantai=p_no_lantai,
			nama_lantai=p_nama_lantai,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where id_lantai=p_id_lantai;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 482 (class 1255 OID 37893)
-- Name: f_settings_pengguna_reset_password(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_pengguna_reset_password(p_petugas character varying, p_kode_pengguna character varying, p_password_pengguna character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_kode_pengguna varchar(30);
	v_password_pengguna varchar(60);
BEGIN
	UPDATE pengguna
	SET 
		password_pengguna=p_password_pengguna,
		tgl_ubah=now(), 
		petugas_ubah=p_petugas
	WHERE kode_pengguna=p_kode_pengguna
	returning kode_pengguna
	into v_kode_pengguna;
	if v_kode_pengguna is null then
		return ('{"ret":-1,"msg":"Kode pengguna tidak ditemukan"}')::json;	
	else
		return ('{"ret":0,"kodePengguna":"'|| p_kode_pengguna::text || '"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 475 (class 1255 OID 37894)
-- Name: f_settings_pengguna_save(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, json); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_pengguna_save(p_petugas character varying, p_kode_pengguna character varying, p_nama_pengguna character varying, p_kode_kantor character varying, p_kode_rusun character varying, p_departemen character varying, p_nama_atasan character varying, p_email character varying, p_password_pengguna character varying, p_aktif boolean, p_locked boolean, p_roles json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_kode_pengguna varchar(30);
	v_ret json;
	v_rec json;
BEGIN
	if  not exists(select null from pengguna where kode_pengguna=p_kode_pengguna) then
		insert into pengguna (
			nama_pengguna, kode_kantor, kode_rusun, departemen, nama_atasan, email,  tgl_rekam, petugas_rekam,
			aktif,tgl_na,petugas_na,
			locked,tgl_locked
		)
		values (
			p_nama_pengguna, p_kode_kantor, p_kode_rusun, p_departemen, p_nama_atasan, p_email,now(),p_petugas,
			p_aktif, case when not p_aktif then now() else null end, case when not p_aktif then p_petugas else null end,
			p_locked, case when p_locked then now() else null end
		)
		returning kode_pengguna
		into v_kode_pengguna;
		raise notice 'b';
		select f_settings_pengguna_set_password(p_petugas, v_kode_pengguna, false, null, p_password_pengguna) as ret
		into v_ret;
		
		for v_rec  IN  select json_array_elements(p_roles) 
		loop
			insert into pengguna_role(kode_pengguna,kode_role,tgl_rekam,petugas_rekam)
			values(
				v_kode_pengguna,
				(v_rec->>'kode_role')::text,
				now(), p_petugas
			);
		end loop;
		return ('{"ret":0,"kodePengguna":"'|| v_kode_pengguna::text || '"}')::json;	
	else
		UPDATE pengguna
		SET 
			nama_pengguna=p_nama_pengguna, 
			kode_kantor=p_kode_kantor, 
			kode_rusun=p_kode_rusun,
			departemen=p_departemen, 
			nama_atasan=p_nama_atasan, 
			email=p_email, 
			aktif=p_aktif, 
			tgl_na=case when not p_aktif then now() else tgl_na end, 
			petugas_na=case when not p_aktif then p_petugas else petugas_na end, 
			locked=p_locked, 
			tgl_locked=case when p_locked then now() else tgl_locked end, 
			tgl_ubah=now(), 
			petugas_ubah=p_petugas
		WHERE kode_pengguna=p_kode_pengguna
		returning kode_pengguna
		into v_kode_pengguna;
		
		raise notice 'set role';
		update pengguna_role
		set aktif=false
		where kode_pengguna= v_kode_pengguna ;
		
		for v_rec  IN  select json_array_elements(p_roles) 
		loop
			if not exists(select null from pengguna_role where kode_pengguna=v_kode_pengguna and kode_role=(v_rec->>'kode_role')::text  ) then
				insert into pengguna_role(kode_pengguna,kode_role,aktif,tgl_rekam,petugas_rekam)
				values(
					v_kode_pengguna,
					(v_rec->>'kode_role')::text,
					true,
					now(), p_petugas
				);
			else
				update pengguna_role
				set
					kode_role=(v_rec->>'kode_role')::text,				
					aktif=true,
					tgl_ubah=now(),
					petugas_ubah=p_petugas
				where kode_pengguna=v_kode_pengguna and kode_role=(v_rec->>'kode_role')::text;
			end if;
		end loop;
		return ('{"ret":0,"kodePengguna":"'|| p_kode_pengguna::text || '"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 483 (class 1255 OID 37895)
-- Name: f_settings_pengguna_set_password(character varying, character varying, boolean, character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_pengguna_set_password(p_petugas character varying, p_kode_pengguna character varying, p_reset boolean, p_password_pengguna_old character varying, p_password_pengguna_new character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_kode_pengguna varchar(30);
	v_password_pengguna varchar(60);
BEGIN
	select kode_pengguna,password_pengguna 
	into v_kode_pengguna,v_password_pengguna 
	from pengguna where kode_pengguna=p_kode_pengguna;
	if  v_kode_pengguna is  null then
		return ('{"ret":-1,"msg":"Kode pengguna tidak ditemukan"}')::json;	
	elsif v_password_pengguna<> p_password_pengguna_old and p_reset then
		return ('{"ret":-2,"msg":"Password lama tidak ditemukan"}')::json;	
	else
		UPDATE pengguna
		SET 
			password_pengguna=p_password_pengguna_new,
			tgl_ubah=now(), 
			petugas_ubah=p_petugas
		WHERE kode_pengguna=p_kode_pengguna;
		return ('{"ret":0,"kodePengguna":"'|| p_kode_pengguna::text || '"}')::json;	
	end if;
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 484 (class 1255 OID 37896)
-- Name: f_settings_rusun_save(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_rusun_save(p_kode_pengguna character varying, p_kode_rusun character varying, p_kode_kantor character varying, p_nama_rusun character varying, p_lokasi character varying, p_provinsi character varying, p_kecamatan character varying, p_latitude character varying, p_longitude character varying, p_fax character varying, p_telpon character varying, p_initial_nama_rusun character varying, p_initial_nama_daerah character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_kantor varchar(5);
BEGIN
	if p_act='N' then
		raise notice 'Cek kode  kantor';
		if not exists(select null from kode_kantor where kode_kantor=p_kode_kantor and aktif) then
			return '{"ret":-1,"msg":"Kode kantor aktif tidak ditemukan"}'::json ;
		end if;
		
		if exists(select null from rusun where kode_rusun=p_kode_rusun) then
			return '{"ret":-1,"msg":"Kode rusun sudah terdaftar"}'::json ;
		end if;
		
		insert into rusun(kode_rusun,kode_kantor,nama_rusun,lokasi, provinsi, kecamatan,google_latitude,google_longitude, tgl_rekam,petugas_rekam,fax,telpon,initial_nama_rusun,initial_nama_daerah)
		values (p_kode_rusun,p_kode_kantor, p_nama_rusun, p_lokasi,p_provinsi,p_kecamatan,p_latitude, p_longitude,now(),p_kode_pengguna,p_fax,p_telpon,p_initial_nama_rusun,p_initial_nama_daerah);
		v_action := 'Inserted';
	else
		select kode_kantor
		into v_kode_kantor
		from rusun where kode_rusun=p_kode_rusun and aktif;
		
		if p_kode_kantor<>v_kode_kantor and not exists(select kode_kantor from kode_kantor where kode_kantor=p_kode_kantor and aktif) then
			return '{"ret":-1,"msg":"Kode kantor induk aktif tidak ditemukan"}'::json ;
		end if;
				update rusun
		set 
			kode_kantor=p_kode_kantor,
			nama_rusun=p_nama_rusun,
			lokasi=p_lokasi,
			provinsi=p_provinsi,
			kecamatan=p_kecamatan,
			google_latitude=p_latitude,
			google_longitude=p_longitude,
			fax=p_fax,
			telpon=p_telpon,
			initial_nama_rusun=p_initial_nama_rusun,
			initial_nama_daerah=p_initial_nama_daerah,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_rusun=p_kode_rusun;
		v_action := 'Updated';
	end if;
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 485 (class 1255 OID 37897)
-- Name: f_settings_status_pekerjaan_save(character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_status_pekerjaan_save(p_kode_pengguna character varying, p_kode_status_pekerjaan character varying, p_nama_status_pekerjaan character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if  exists(select null from kode_status_pekerjaan where kode_status_pekerjaan=p_kode_status_pekerjaan) then
			return '{"ret":-1,"msg":"Kode status pekerjaan sudah terdaftar"}'::json ;
		end if;
		insert into kode_status_pekerjaan(kode_status_pekerjaan,nama_status_pekerjaan, tgl_rekam,petugas_rekam)
		values (p_kode_status_pekerjaan,p_nama_status_pekerjaan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_status_pekerjaan
		set 
			nama_status_pekerjaan=p_nama_status_pekerjaan,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_status_pekerjaan=p_kode_status_pekerjaan;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 486 (class 1255 OID 37898)
-- Name: f_settings_tarif_air_cancel(character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_air_cancel(p_kode_pengguna character varying, p_id_tarif_air integer, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_rusun varchar(5);
	v_id_tarif_air int;
	v_tgl_mulai date;
	v_tgl_entri_terakhir date;
BEGIN
	select kode_rusun, tgl_mulai
	into v_kode_rusun, v_tgl_mulai
	from tarif_air where id_tarif_air=coalesce(p_id_tarif_air,0);
	
	if  v_kode_rusun is null then
		return ('{"ret":-1,"msg":"Data tarif tidak ditemukan"}')::json;	
	end if;
	
	-- get tgl end_meter tarkhir dari entri billing terakhir
	select tgl_end
	into v_tgl_entri_terakhir
	from invoice_entries_invair
	where
		aktif
		and 
		id_unit in(
			select unit.id_unit
			from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			where kode_rusun=v_kode_rusun
		)
	order by tgl_end desc 
	limit 1;
	v_tgl_entri_terakhir := coalesce(v_tgl_entri_terakhir,'1900-01-01'::date);
	
	if  v_tgl_mulai<=v_tgl_entri_terakhir then
		return ('{"ret":-1,"msg":"Sudah dipakai dalam entri tagihan"}')::json;	
	end if;

	update tarif_air 
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na=p_kode_pengguna,
		alasan_na=p_alasan_na
	where id_tarif_air=p_id_tarif_air and aktif 
	returning id_tarif_air
	into v_id_tarif_air;
	
	if v_id_tarif_air is null then
		return '{"ret":-1,"msg":"Tidak bisa di cancel"}'::json ;
	else
		v_action:='cancelled';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 487 (class 1255 OID 37899)
-- Name: f_settings_tarif_air_submit(character varying, character varying, integer, date, date, numeric, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_air_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_id_tarif_air integer, p_tgl_mulai date, p_tgl_berakhir date, p_rate_per_m3 numeric, p_wmm numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_status varchar(1);
	v_id_tarif_air int;
	v_tgl_mulai date;
	v_tgl_entri_terakhir date;
	v_tgl_mulai_terakhir date;
BEGIN
	-- get tgl end_meter tarkhir dari entri billing terakhir
	select tgl_end
	into v_tgl_entri_terakhir
	from invoice_entries_invair
	where
		aktif
		and 
		id_unit in(
			select unit.id_unit
			from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			where kode_rusun=p_kode_rusun
		)
	order by tgl_end desc 
	limit 1;
	v_tgl_entri_terakhir := coalesce(v_tgl_entri_terakhir,'1900-01-01'::date);
	
	if exists(select null from tarif_air where id_tarif_air=coalesce(p_id_tarif_air,0)) then
		-- check apakah sudah digunakan entri tagihan
		select tgl_mulai
		into v_tgl_mulai
		from tarif_air 
		where id_tarif_air=p_id_tarif_air;
		v_tgl_mulai:=coalesce(v_tgl_mulai,'1900-01-01'::date);
		if p_tgl_mulai<>v_tgl_mulai and p_tgl_mulai<=v_tgl_entri_terakhir then
			return ('{"ret":-1,"msg":"Sudah ada entri tagihan sebelum/pada tgl mulai tersebut"}')::json;	
		end if;
		
		-- get tgl mulai tarif listrik terakhir yang terakhir
		select tgl_mulai
		into v_tgl_mulai_terakhir
		from tarif_air
		where aktif and kode_rusun=p_kode_rusun and id_tarif_air<>p_id_tarif_air
		order by tgl_mulai desc 
		limit 1;
		v_tgl_mulai_terakhir:=coalesce(v_tgl_mulai_terakhir,'1900-01-01'::date);
		if p_tgl_mulai<=v_tgl_mulai_terakhir then
			return ('{"ret":-2,"msg":"Tgl mulai yang baru<=tgl mulai tarif sebelumnya, harus lebih besar"}')::json;	
		end if;
		
		update tarif_air
		set
			tgl_mulai=p_tgl_mulai, 
			tgl_berakhir=p_tgl_berakhir, 
			rate_per_m3=p_rate_per_m3, 
			wmm=p_wmm, 
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where id_tarif_air=p_id_tarif_air;
		v_action := 'Updated';
	else
		if p_tgl_mulai<=v_tgl_entri_terakhir then
			return ('{"ret":-1,"msg":"Sudah ada entri tagihan sebelum/pada tgl mulai tersebut"}')::json;	
		end if;
		-- get tgl mulai tarif listrik terakhir yang terakhir
		select tgl_mulai
		into v_tgl_mulai_terakhir
		from tarif_air
		where aktif and kode_rusun=p_kode_rusun
		order by tgl_mulai desc 
		limit 1;
		v_tgl_mulai:=coalesce(v_tgl_mulai,'1900-01-01'::date);
		if p_tgl_mulai<=v_tgl_mulai_terakhir then
			return ('{"ret":-2,"msg":"Tgl mulai yang baru<=tgl mulai tarif sebelumnya, harus lebih besar"}')::json;	
		end if;
		
		INSERT INTO tarif_air(
			kode_rusun, tgl_mulai, tgl_berakhir, rate_per_m3, wmm, tgl_rekam, petugas_rekam
		)
		VALUES (
			p_kode_rusun,  p_tgl_mulai, p_tgl_berakhir, p_rate_per_m3, p_wmm,now(),p_kode_pengguna
		)
		returning id_tarif_air
		into v_id_tarif_air;
		v_action := 'Inserted';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 488 (class 1255 OID 37900)
-- Name: f_settings_tarif_fasilitas_cancel(character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_fasilitas_cancel(p_kode_pengguna character varying, p_id_tarif_fasilitas integer, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_fasilitas int;
BEGIN
	update tarif_fasilitas 
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na=p_kode_pengguna,
		alasan_na=p_alasan_na
	where id_tarif_fasilitas=p_id_tarif_fasilitas and aktif 
	returning id_tarif_fasilitas
	into v_id_tarif_fasilitas;
	
	if v_id_tarif_fasilitas is null then
		return '{"ret":-1,"msg":"Tidak bisa di cancel"}'::json ;
	else
		v_action:='cancelled';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 377 (class 1255 OID 37901)
-- Name: f_settings_tarif_fasilitas_submit(character varying, character varying, character varying, date, date, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_fasilitas_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_kode_fasilitas character varying, p_tgl_mulai date, p_tgl_berakhir date, p_tarif numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_status varchar(1);
	v_id_tarif_fasilitas int;
BEGIN
	INSERT INTO tarif_fasilitas(
		kode_rusun, kode_fasilitas, tgl_mulai, tgl_berakhir, tarif, tgl_rekam, petugas_rekam
	)
	VALUES (
		p_kode_rusun, p_kode_fasilitas, p_tgl_mulai, p_tgl_berakhir, p_tarif,now(),p_kode_pengguna
	)
	returning id_tarif_fasilitas
	into v_id_tarif_fasilitas;
	v_action := 'Inserted';
	
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 372 (class 1255 OID 37902)
-- Name: f_settings_tarif_lantai_approve(character varying, integer, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_lantai_approve(p_kode_pengguna character varying, p_id_tarif_lantai integer, p_approved boolean, p_approved_ket character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_lantai_edited int;
	v_status varchar(1);
	v_id_tarif_lantai int;
BEGIN
	select id_tarif_lantai_edited 
	into v_id_tarif_lantai_edited
	from tarif_lantai where id_tarif_lantai=p_id_tarif_lantai and status='S' and aktif;
	
	if  v_id_tarif_lantai_edited is not null then
		-- jika approval terhadap edit tari yang sudah di approve
		if not exists(select null from tarif_lantai where id_tarif_lantai=v_id_tarif_lantai_edited) then
			return '{"ret":-1,"msg":"Tidak ditemukan tarif yang di edit"}'::json ;
		else
			if p_approved then
				-- non aktifkan data lama
				update tarif_lantai 
				set 
					aktif=false ,
					tgl_na=now(),
					petugas_na=p_kode_pengguna,
					alasan_na='Pembentukan data baru karena perubahan data'
				where 
					id_tarif_lantai=v_id_tarif_lantai_edited;
			end if;
		end if;
	end if;
	
	update tarif_lantai 
	set 
		status= case when p_approved then 'A' else 'R' end,
		approval= case when p_approved then true else false end,
		approved_tgl=now(),
		approved_petugas=p_kode_pengguna,
		approved_ket=p_approved_ket
	where id_tarif_lantai=p_id_tarif_lantai and aktif  and status='S'
	returning id_tarif_lantai
	into v_id_tarif_lantai;

	if v_id_tarif_lantai is null then
		return '{"ret":-2,"msg":"Tidak bisa di approve"}'::json ;
	else
		v_action:='Approved';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 373 (class 1255 OID 37903)
-- Name: f_settings_tarif_lantai_cancel(character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_lantai_cancel(p_kode_pengguna character varying, p_id_tarif_lantai integer, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_lantai int;
BEGIN
	update tarif_lantai 
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na=p_kode_pengguna,
		alasan_na=p_alasan_na
	where id_tarif_lantai=p_id_tarif_lantai and aktif  and status in ('D','R')
	returning id_tarif_lantai
	into v_id_tarif_lantai;
	
	if v_id_tarif_lantai is null then
		return '{"ret":-1,"msg":"Tidak bisa di cancel"}'::json ;
	else
		v_action:='cancelled';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 489 (class 1255 OID 37904)
-- Name: f_settings_tarif_lantai_submit(character varying, integer, integer, character varying, date, date, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_lantai_submit(p_kode_pengguna character varying, p_id_tarif_lantai integer, p_id_lantai integer, p_kode_unit_jenis character varying, p_tgl_mulai date, p_tgl_berakhir date, p_tarif numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_lantai int;
	v_tgl_berakhir_current date;
	v_tgl_mulai date;
	v_approval boolean;
	v_status varchar(1);
	v_aktif boolean;
BEGIN
	if coalesce(p_id_tarif_lantai,0)=0 then
		if not exists (select null from tarif_lantai 
					   where id_lantai=p_id_lantai and kode_unit_jenis=p_kode_unit_jenis 
					   and tgl_mulai>=p_tgl_mulai 
					   and (
						   approval
						   or (not approval and status='S')
					   )
						and aktif
		) then
			INSERT INTO tarif_lantai(
			id_lantai, kode_unit_jenis, tgl_mulai, tgl_berakhir, tarif, tipe_periode, n_periode,status,tgl_rekam, petugas_rekam
			)
			VALUES (
				p_id_lantai,p_kode_unit_jenis,p_tgl_mulai,p_tgl_berakhir, p_tarif, 'B',1, 'S',now(), p_kode_pengguna
			)
			returning id_tarif_lantai
			into v_id_tarif_lantai;
			v_action := 'Inserted';
		else
			return '{"ret":-1,"msg":"Sudah ada tarif periode saat ini atau berikutnya"}'::json ;
		end if;
	else
		-- cari tgl terakhir dan status tarif yang di edit
		select tgl_berakhir ,status,approval,aktif
		into v_tgl_berakhir_current, v_status, v_approval,v_aktif
		from tarif_lantai where id_tarif_lantai=p_id_tarif_lantai;
		if v_tgl_berakhir_current is null then
			return '{"ret":-2,"msg":"Tidak Ditemukan tarif yang mau di edit  "}'::json ;
		end if;
		
		if v_status='S' or v_status='R' or not v_aktif then
			return '{"ret":-3,"msg":"Tarif status submit, non aktif  tidak bisa di edit"}'::json ;
		end if;
		
		-- cari tgl awal tarif terakhir
		select tgl_mulai
		into v_tgl_mulai
		from tarif_lantai
		where 
			aktif and id_lantai=p_id_lantai and kode_unit_jenis=p_kode_unit_jenis
			and id_tarif_lantai<>p_id_tarif_lantai
			and (
				approval 
				or (not approval and status='S') 
			)
		order by tgl_berakhir desc
		limit 1;
		
		if v_tgl_mulai is not null and v_tgl_mulai>v_tgl_berakhir_current then
			return '{"ret":-4,"msg":"Sudah ada tarif submit/approve di periode berikutnya")'::json ;
		end if;
		
-- 		select status , aktif
-- 		into v_status , v_aktif
-- 		from tarif_lantai where id_tarif_lantai=p_id_tarif_lantai;
-- 		if v_status is null or (v_status is not null and v_status ='S') then
-- 			return '{"ret":-2,"msg":"Tidak bisa di update untuk status Submit  "}'::json ;
-- 		elsif not v_aktif then
-- 			return '{"ret":-2,"msg":"Tidak bisa di update sudah non aktif"}'::json ;
-- 		end if;
		
		--  update berari menginsert tarif baru sesuai data dan meminta pengajuan
-- 		update tarif_lantai 
-- 		set
-- 			id_lantai=p_id_lantai, 
-- 			kode_unit_jenis=p_kode_unit_jenis, 
-- 			tgl_mulai=p_tgl_mulai, 
-- 			tgl_berakhir=p_tgl_berakhir, 
-- 			status='S',
-- 			tarif=p_tarif,
-- 			tgl_ubah=now(),
-- 			petugas_ubah=p_kode_pengguna
-- 		where 
-- 			id_tarif_lantai=p_id_tarif_lantai;
		INSERT INTO tarif_lantai(
			id_lantai, kode_unit_jenis, tgl_mulai, tgl_berakhir, tarif, tipe_periode, n_periode,status,tgl_rekam, petugas_rekam,id_tarif_lantai_edited
		)
		VALUES (
			p_id_lantai,p_kode_unit_jenis,p_tgl_mulai,p_tgl_berakhir, p_tarif, 'B',1, 'S',now(), p_kode_pengguna, p_id_tarif_lantai
		)
		returning id_tarif_lantai
		into v_id_tarif_lantai;
		v_action := 'Insert new data';
	end if;
	
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 490 (class 1255 OID 37905)
-- Name: f_settings_tarif_listrik_cancel(character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_listrik_cancel(p_kode_pengguna character varying, p_id_tarif_listrik integer, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_kode_rusun varchar(5);
	v_id_tarif_listrik int;
	v_tgl_mulai date;
	v_tgl_entri_terakhir date;
BEGIN
	select kode_rusun, tgl_mulai
	into v_kode_rusun, v_tgl_mulai
	from tarif_listrik where id_tarif_listrik=coalesce(p_id_tarif_listrik,0);
	
	if  v_kode_rusun is null then
		return ('{"ret":-1,"msg":"Data tarif tidak ditemukan"}')::json;	
	end if;
	
	-- get tgl end_meter tarkhir dari entri billing terakhir
	select tgl_end
	into v_tgl_entri_terakhir
	from invoice_entries_invlstrk
	where
		aktif
		and 
		id_unit in(
			select unit.id_unit
			from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			where kode_rusun=v_kode_rusun
		)
	order by tgl_end desc 
	limit 1;
	v_tgl_entri_terakhir := coalesce(v_tgl_entri_terakhir,'1900-01-01'::date);
	
	if  v_tgl_mulai<=v_tgl_entri_terakhir then
		return ('{"ret":-1,"msg":"Sudah dipakai dalam entri tagihan"}')::json;	
	end if;

	update tarif_listrik 
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na=p_kode_pengguna,
		alasan_na=p_alasan_na
	where id_tarif_listrik=p_id_tarif_listrik and aktif 
	returning id_tarif_listrik
	into v_id_tarif_listrik;
	
	if v_id_tarif_listrik is null then
		return '{"ret":-1,"msg":"Tidak bisa di cancel"}'::json ;
	else
		v_action:='cancelled';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 491 (class 1255 OID 37906)
-- Name: f_settings_tarif_listrik_submit(character varying, character varying, integer, character varying, date, date, numeric, numeric, numeric, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_listrik_submit(p_kode_pengguna character varying, p_kode_rusun character varying, p_id_tarif_listrik integer, p_kode_golongan_listrik character varying, p_tgl_mulai date, p_tgl_berakhir date, p_rate_per_kwh numeric, p_faktor_pengali numeric, p_demand_charges numeric, p_pju_prosen numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_status varchar(1);
	v_id_tarif_listrik int;
	v_tgl_mulai date;
	v_tgl_entri_terakhir date;
	v_tgl_mulai_terakhir date;
BEGIN
	-- get tgl end_meter tarkhir dari entri billing terakhir
	select tgl_end
	into v_tgl_entri_terakhir
	from invoice_entries_invlstrk
	where
		aktif
		and 
		id_unit in(
			select unit.id_unit
			from rusun_unit unit inner join rusun_lantai lantai on unit.id_lantai=lantai.id_lantai
			where kode_rusun=p_kode_rusun
		)
	order by tgl_end desc 
	limit 1;
	v_tgl_entri_terakhir := coalesce(v_tgl_entri_terakhir,'1900-01-01'::date);
	
	if exists(select null from tarif_listrik where id_tarif_listrik=coalesce(p_id_tarif_listrik,0)) then
		-- check apakah sudah digunakan entri tagihan
		select tgl_mulai
		into v_tgl_mulai
		from tarif_listrik 
		where id_tarif_listrik=p_id_tarif_listrik;
		v_tgl_mulai:=coalesce(v_tgl_mulai,'1900-01-01'::date);
		if p_tgl_mulai<>v_tgl_mulai and p_tgl_mulai<=v_tgl_entri_terakhir then
			return ('{"ret":-1,"msg":"Sudah ada entri tagihan sebelum/pada tgl mulai tersebut"}')::json;	
		end if;
		
		-- get tgl mulai tarif listrik terakhir yang terakhir
		select tgl_mulai
		into v_tgl_mulai_terakhir
		from tarif_listrik
		where aktif and kode_rusun=p_kode_rusun and id_tarif_listrik<>p_id_tarif_listrik
		order by tgl_mulai desc 
		limit 1;
		v_tgl_mulai_terakhir:=coalesce(v_tgl_mulai_terakhir,'1900-01-01'::date);
		if p_tgl_mulai<=v_tgl_mulai_terakhir then
			return ('{"ret":-2,"msg":"Tgl mulai yang baru<=tgl mulai tarif sebelumnya, harus lebih besar"}')::json;	
		end if;
		
		update tarif_listrik
		set
			tgl_mulai=p_tgl_mulai, 
			tgl_berakhir=p_tgl_berakhir, 
			rate_per_kwh=p_rate_per_kwh, 
			faktor_pengali=p_faktor_pengali, 
			demand_charges=p_demand_charges, 
			pju_prosen=p_pju_prosen, 
			tgl_ubah=now(), 
			petugas_ubah=p_kode_pengguna
		where id_tarif_listrik=p_id_tarif_listrik;
		v_action := 'Updated';
	else
		if p_tgl_mulai<=v_tgl_entri_terakhir then
			return ('{"ret":-1,"msg":"Sudah ada entri tagihan sebelum/pada tgl mulai tersebut"}')::json;	
		end if;
		-- get tgl mulai tarif listrik terakhir yang terakhir
		select tgl_mulai
		into v_tgl_mulai_terakhir
		from tarif_listrik
		where aktif and kode_rusun=p_kode_rusun
		order by tgl_mulai desc 
		limit 1;
		v_tgl_mulai:=coalesce(v_tgl_mulai,'1900-01-01'::date);
		if p_tgl_mulai<=v_tgl_mulai_terakhir then
			return ('{"ret":-2,"msg":"Tgl mulai yang baru<=tgl mulai tarif sebelumnya, harus lebih besar"}')::json;	
		end if;
		
		INSERT INTO tarif_listrik(
			kode_rusun, kode_golongan_listrik, tgl_mulai, tgl_berakhir, rate_per_kwh, faktor_pengali, demand_charges, pju_prosen, tgl_rekam, petugas_rekam
		)
		VALUES (
			p_kode_rusun, p_kode_golongan_listrik, p_tgl_mulai, p_tgl_berakhir, p_rate_per_kwh, p_faktor_pengali, p_demand_charges, p_pju_prosen,now(),p_kode_pengguna
		)
		returning id_tarif_listrik
		into v_id_tarif_listrik;
		v_action := 'Inserted';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 492 (class 1255 OID 37907)
-- Name: f_settings_tarif_unit_approve(character varying, integer, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_unit_approve(p_kode_pengguna character varying, p_id_tarif_unit integer, p_approved boolean, p_approved_ket character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_unit_edited int;
	v_status varchar(1);
	v_id_tarif_unit int;
BEGIN
	select id_tarif_unit_edited 
	into v_id_tarif_unit_edited
	from tarif_unit where id_tarif_unit=p_id_tarif_unit and status='S' and aktif;
	
	if  v_id_tarif_unit_edited is not null then
		-- jika approval terhadap edit tari yang sudah di approve
		if not exists(select null from tarif_unit where id_tarif_unit=v_id_tarif_unit_edited) then
			return '{"ret":-1,"msg":"Tidak ditemukan tarif yang di edit"}'::json ;
		else
			if p_approved then
				-- non aktifkan data lama
				update tarif_unit
				set 
					aktif=false ,
					tgl_na=now(),
					petugas_na=p_kode_pengguna,
					alasan_na='Pembentukan data baru karena perubahan data'
				where 
					id_tarif_unit=v_id_tarif_unit_edited;
			end if;
		end if;
	end if;
	
	update tarif_unit
	set 
		status= case when p_approved then 'A' else 'R' end,
		approval= case when p_approved then true else false end,
		approved_tgl=now(),
		approved_petugas=p_kode_pengguna,
		approved_ket=p_approved_ket
	where id_tarif_unit=p_id_tarif_unit and aktif  and status='S'
	returning id_tarif_unit
	into v_id_tarif_unit;

	if v_id_tarif_unit is null then
		return '{"ret":-2,"msg":"Tidak bisa di approve"}'::json ;
	else
		v_action:='Approved';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 493 (class 1255 OID 37908)
-- Name: f_settings_tarif_unit_cancel(character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_unit_cancel(p_kode_pengguna character varying, p_id_tarif_unit integer, p_alasan_na character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_unit int;
BEGIN
	update tarif_unit 
	set 
		aktif=false,
		tgl_na=now(),
		petugas_na=p_kode_pengguna,
		alasan_na=p_alasan_na
	where id_tarif_unit=p_id_tarif_unit and aktif  and status in ('D','R')
	returning id_tarif_unit
	into v_id_tarif_unit;
	
	if v_id_tarif_unit is null then
		return '{"ret":-1,"msg":"Tidak bisa di cancel"}'::json ;
	else
		v_action:='cancelled';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 376 (class 1255 OID 37909)
-- Name: f_settings_tarif_unit_submit(character varying, integer, integer, date, date, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tarif_unit_submit(p_kode_pengguna character varying, p_id_tarif_unit integer, p_id_unit integer, p_tgl_mulai date, p_tgl_berakhir date, p_tarif numeric) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_tarif_unit int;
	v_tgl_berakhir_current date;
	v_tgl_mulai date;
	v_approval boolean;
	v_status varchar(1);
	v_aktif boolean;
BEGIN
	if coalesce(p_id_tarif_unit,0)=0 then
		if not exists (select null from tarif_unit
					   where id_unit=p_id_unit
					   and tgl_mulai>=p_tgl_mulai 
					   and (
						   approval
						   or (not approval and status='S')
					   )
						and aktif
		) then
			INSERT INTO tarif_unit(
			id_unit,  tgl_mulai, tgl_berakhir, tarif, tipe_periode, n_periode,status,tgl_rekam, petugas_rekam
			)
			VALUES (
				p_id_unit,p_tgl_mulai,p_tgl_berakhir, p_tarif, 'B',1, 'S',now(), p_kode_pengguna
			)
			returning id_tarif_unit
			into v_id_tarif_unit;
			v_action := 'Inserted';
		else
			return '{"ret":-1,"msg":"Sudah ada tarif periode saat ini atau berikutnya"}'::json ;
		end if;
	else
		-- cari tgl terakhir dan status tarif yang di edit
		select tgl_berakhir ,status,approval,aktif
		into v_tgl_berakhir_current, v_status, v_approval,v_aktif
		from tarif_unit where id_tarif_unit=p_id_tarif_unit;
		if v_tgl_berakhir_current is null then
			return '{"ret":-2,"msg":"Tidak Ditemukan tarif yang mau di edit  "}'::json ;
		end if;
		
		if v_status='S' or v_status='R' or not v_aktif then
			return '{"ret":-3,"msg":"Tarif status submit, non aktif  tidak bisa di edit"}'::json ;
		end if;
		
		-- cari tgl awal tarif terakhir
		select tgl_mulai
		into v_tgl_mulai
		from tarif_unit
		where 
			aktif and id_unit=p_id_unit
			and id_tarif_unit<>p_id_tarif_unit
			and (
				approval 
				or (not approval and status='S') 
			)
		order by tgl_berakhir desc
		limit 1; 
		
		if v_tgl_mulai is not null and v_tgl_mulai>v_tgl_berakhir_current then
			return '{"ret":-4,"msg":"Sudah ada tarif submit/approve di periode berikutnya")'::json ;
		end if;
		
		INSERT INTO tarif_unit(
			id_unit, tgl_mulai, tgl_berakhir, tarif, tipe_periode, n_periode,status,tgl_rekam, petugas_rekam,id_tarif_unit_edited
		)
		VALUES (
			p_id_unit,p_tgl_mulai,p_tgl_berakhir, p_tarif, 'B',1, 'S',now(), p_kode_pengguna, p_id_tarif_unit
		)
		returning id_tarif_unit
		into v_id_tarif_unit;
		v_action := 'Insert new data';
	end if;
	
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 494 (class 1255 OID 37910)
-- Name: f_settings_tipe_out_save(character varying, character varying, character varying, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_tipe_out_save(p_kode_pengguna character varying, p_kode_tipe_out character varying, p_deskripsi_tipe_out character varying, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then
		if exists(select null from kode_tipe_out where kode_tipe_out=p_kode_tipe_out) then
			return '{"ret":-1,"msg":"Kode tipe outsudah terdaftar"}'::json ;
		end if;
		insert into kode_tipe_out(kode_tipe_out,deskripsi_tipe_out, tgl_rekam,petugas_rekam)
		values (p_kode_tipe_out,p_deskripsi_tipe_out,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		update kode_tipe_out
		set 
			deskripsi_tipe_out=p_deskripsi_tipe_out,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_tipe_out=p_kode_tipe_out;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 495 (class 1255 OID 37911)
-- Name: f_settings_unit_jenis_save(character varying, character varying, character varying, boolean, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_unit_jenis_save(p_kode_pengguna character varying, p_kode_unit_jenis character varying, p_nama_unit_jenis character varying, p_disewakan boolean, p_aktif boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
BEGIN
	if p_act='N' then		
		if exists(select null from kode_unit_jenis where kode_unit_jenis=P_kode_unit_jenis) then
			return '{"ret":-1,"msg":"Kode Jenis Unit sudah terdaftar"}'::json ;
		end if;
		if exists(select null from kode_unit_jenis where nama_unit_jenis=p_nama_unit_jenis) then
			return '{"ret":-2,"msg":"Nama Jenis Unit sudah terdaftar"}'::json ;
		end if;
		
		insert into kode_unit_jenis(kode_unit_jenis,nama_unit_jenis,disewakan, tgl_rekam,petugas_rekam)
		values (p_kode_unit_jenis, p_nama_unit_jenis,p_disewakan,now(),p_kode_pengguna);
		v_action := 'Inserted';
	else
		if exists(select null from kode_unit_jenis where nama_unit_jenis=p_nama_unit_jenis and kode_unit_jenis<>p_kode_unit_jenis) then
			return '{"ret":-2,"msg":"Nama Jenis Unit sudah terdaftar"}'::json ;
		end if;
		update kode_unit_jenis 
		set 
			nama_unit_jenis=p_nama_unit_jenis,
			disewakan=p_disewakan,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where kode_unit_jenis=p_kode_unit_jenis;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 496 (class 1255 OID 37912)
-- Name: f_settings_unit_save(character varying, integer, character varying, integer, smallint, character varying, character varying, boolean, boolean, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_settings_unit_save(p_kode_pengguna character varying, p_id_unit integer, p_kode_unit_jenis character varying, p_id_lantai integer, p_no_unit smallint, p_nama_unit character varying, p_kode_golongan_listrik character varying, p_aktif boolean, p_rented boolean, p_act character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_action varchar(20):='';
	v_id_lantai int;
	v_no_unit smallint;
	v_kode_rusun varchar(5);
BEGIN
	if p_act not in('N','E') then
		return '{"ret":-1,"msg":"Action "}'::json ;
	end if;
	select kode_rusun into v_kode_rusun from rusun_lantai where id_lantai=p_id_lantai;
	if p_act='N' then
		raise notice 'Cek id lantai';
		if not exists(select null from rusun_lantai where id_lantai=p_id_lantai and aktif) then
			return '{"ret":-2,"msg":"id lantai aktif tidak ditemukan"}'::json ;
		end if;
		if exists(select null from rusun_unit where  id_lantai=p_id_lantai and no_unit=p_no_unit) then
			return '{"ret":-3,"msg":"No unit pada lantai ini sudah terdaftar"}'::json;
		end if;
		if exists(select null from rusun_unit inner join  rusun_lantai on rusun_unit.id_lantai=rusun_lantai.id_lantai
				  where nama_unit=p_nama_unit and exists(
					  select null from rusun_lantai where kode_rusun=v_kode_rusun and id_lantai=rusun_unit.id_lantai
				  ) 
		) then
			return '{"ret":-3,"msg":"Nama unit sudah ada pada rusun ini"}'::json ;
		end if;
		raise notice 'Cek id lantai';
		insert into rusun_unit(kode_unit_jenis,id_lantai,no_unit,nama_unit,kode_golongan_listrik, tgl_rekam,petugas_rekam,is_rented)
		values (p_kode_unit_jenis,p_id_lantai,p_no_unit,p_nama_unit,p_kode_golongan_listrik,now(),p_kode_pengguna,p_rented);
		v_action := 'Inserted';
	else
		
		select id_lantai,no_unit 
		into v_id_lantai,v_no_unit 
		from rusun_unit where id_unit=p_id_unit;
		
		if v_id_lantai is null then
			return '{"ret":-4,"msg":"id Unit tidak ditemukan"}'::json ;
		end if;
		
		if not exists (select null from rusun_lantai where id_lantai=p_id_lantai and aktif) then
			return '{"ret":-5,"msg":"lantai aktif tidak ditemukan"}'::json ;
		end if;
		if exists (select null from rusun_unit where id_lantai=p_id_lantai and no_unit=p_no_unit and id_unit<>p_id_unit) then
			return '{"ret":-6,"msg":"No unit telah terdaftar pada lantai tersebut"}'::json ;
		end if;
		if exists(select null from rusun_unit inner join  rusun_lantai on rusun_unit.id_lantai=rusun_lantai.id_lantai
			  where nama_unit=p_nama_unit and id_unit<>p_id_unit and exists(
				  select null from rusun_lantai where kode_rusun=v_kode_rusun and id_lantai=rusun_unit.id_lantai
			  ) 
		) then
			return '{"ret":-3,"msg":"Nama unit sudah ada pada rusun ini"}'::json ;
		end if;
		
		update rusun_unit
		set 
			kode_unit_jenis=p_kode_unit_jenis,
			id_lantai=p_id_lantai,
			no_unit=p_no_unit,
			nama_unit=p_nama_unit,
			is_rented=p_rented,
--			kode_golongan_listrik=p_kode_golongan_listrik,
			aktif=coalesce(p_aktif,true),
			tgl_ubah=now(),
			petugas_ubah=p_kode_pengguna
		where id_unit=p_id_unit;
		v_action := 'Updated';
	end if;
	
	return ('{"ret":0,"Action":"'|| v_action || '"}')::json;	
exception
	when others then
		return '{"ret":-99,"msg":"Others error"}'::json ;
END;
$$;


--
-- TOC entry 497 (class 1255 OID 37913)
-- Name: f_tarif_air_get(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_air_get(p_kode_rusun character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rate_per_m3 numeric(10,2);
	v_wmm numeric(10,2); 
BEGIN
	select  rate_per_m3, wmm
	into v_rate_per_m3, v_wmm
	from tarif_air
	where aktif and kode_rusun=p_kode_rusun 
		and current_date between tgl_mulai and tgl_berakhir
	order by tgl_mulai desc
	limit 1;
	
	raise notice 'a';
	if v_rate_per_m3 is null then
		return ('{"ret":-1,"rateM3":0,"wmm":0}')::json;
	else
		raise notice 'b';
		return ('{"ret":0,"rateM3":'|| v_rate_per_m3::text ||',"wmm":'|| v_wmm::text ||'}')::json;
	end if;
	
exception
	when others then
		return ('{"ret":-99,"rateM3":0,"wmm":0}')::json;
END;
$$;


--
-- TOC entry 498 (class 1255 OID 37914)
-- Name: f_tarif_fasilitas_get(character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_fasilitas_get(p_kode_rusun character varying, p_kode_fasilitas character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(10,2);
BEGIN
	select  tarif
	into v_tarif
	from tarif_fasilitas
	where aktif and kode_rusun=p_kode_rusun and kode_fasilitas=p_kode_fasilitas
		and current_date between tgl_mulai and tgl_berakhir
	order by tgl_mulai desc
	limit 1;
	
	if v_tarif is null then
		return ('{"ret":-1,"tarif":0}')::json;
	else
		return ('{"ret":0,"tarif":'|| v_tarif::text ||'}')::json;
	end if;
	
exception
	when others then
		return ('{"ret":-99,"tarif":0}')::json;
END;
$$;


--
-- TOC entry 499 (class 1255 OID 37915)
-- Name: f_tarif_fasilitas_get_bykontrak_numeric(bigint, character varying, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_fasilitas_get_bykontrak_numeric(p_id_kontrak_sewa bigint, p_kode_fasilitas character varying, p_date date) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(18,2):=0;
BEGIN
	select tarif 
	into v_tarif
	from kontrak_sewa_fasilitas_tarif
	where aktif and id_kontrak_sewa=p_id_kontrak_sewa and kode_fasilitas=p_kode_fasilitas
	and to_char(p_date,'YYYY-MM') >= blth_mulai 
	order by blth_mulai desc
	limit 1;
	
	if coalesce(v_tarif,0)>0 then
		return coalesce(v_tarif,0)::numeric;
	else
		select tarif
		into v_tarif
		from tarif_fasilitas tf 
		where 
			aktif and kode_rusun in (select kode_rusun from kontrak_sewa ks where id_kontrak_sewa=p_id_kontrak_sewa)
			and kode_fasilitas=p_kode_fasilitas
			and p_date>= tgl_mulai
		order by  tgl_mulai desc, id_tarif_fasilitas
		limit 1;
	
		return coalesce(v_tarif,0)::numeric;
	end if;
exception
	when others then
		return 0::numeric;
END;
$$;


--
-- TOC entry 500 (class 1255 OID 37916)
-- Name: f_tarif_fasilitas_get_numeric(character varying, character varying, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_fasilitas_get_numeric(p_kode_rusun character varying, p_kode_fasilitas character varying, p_date date) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(18,2):=0;
BEGIN
	select tarif 
	into v_tarif
	from tarif_fasilitas 
	where aktif and kode_rusun=p_kode_rusun and kode_fasilitas=p_kode_fasilitas
	and  tgl_mulai<=p_date and tgl_berakhir>=p_date 
	order by tgl_mulai desc limit 1;
	
	return coalesce(v_tarif,0)::numeric;
exception
	when others then
		return 0::numeric;
END;
$$;


--
-- TOC entry 501 (class 1255 OID 37917)
-- Name: f_tarif_listrik_get(character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_listrik_get(p_kode_rusun character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rate_per_kwh numeric(10,2);
	v_faktor_pengali numeric(10,2); 
	v_demand_charges numeric(10,2);
	v_pju_prosen numeric(10,2);
BEGIN
	select  rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0)
	into v_rate_per_kwh, v_faktor_pengali, v_demand_charges, v_pju_prosen
	from tarif_listrik
	where aktif and kode_rusun=p_kode_rusun 
		and current_date between tgl_mulai and tgl_berakhir
	order by tgl_mulai desc
	limit 1;
	
	if v_rate_per_kwh is null then
		return ('{"ret":-1,"rateKwh":0,"fx":0,"demandCharges":0,"pju":0}')::json;
	else
		return ('{"ret":0,"rateKwh":'|| v_rate_per_kwh::text ||',"fx":'|| v_faktor_pengali::text ||',"demandCharges":'|| v_demand_charges::text ||',"pju":'|| v_pju_prosen::text ||'}')::json;
	end if;
	
exception
	when others then
		return ('{"ret":-99,"rateKwh":0,"fx":0,"demandCharges":0,"pju":0}')::json;
END;
$$;


--
-- TOC entry 502 (class 1255 OID 37918)
-- Name: f_tarif_listrik_get(character varying, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_listrik_get(p_kode_rusun character varying, p_kode_golongan_listrik character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_rate_per_kwh numeric(10,2);
	v_faktor_pengali numeric(10,2); 
	v_demand_charges numeric(10,2);
	v_pju_prosen numeric(10,2);
BEGIN
	select  rate_per_kwh, faktor_pengali, demand_charges, coalesce(pju_prosen,0)
	into v_rate_per_kwh, v_faktor_pengali, v_demand_charges, v_pju_prosen
	from tarif_listrik
	where aktif and kode_rusun=p_kode_rusun 
		-- and kode_golongan_listrik=p_kode_golongan_listrik
		and current_date between tgl_mulai and tgl_berakhir
	order by tgl_mulai desc
	limit 1;
	
	raise notice 'a';
	if v_rate_per_kwh is null then
		return ('{"ret":-1,"rateKwh":0,"fx":0,"demandCharges":0,"pju":0}')::json;
	else
		raise notice 'b';
		return ('{"ret":0,"rateKwh":'|| v_rate_per_kwh::text ||',"fx":'|| v_faktor_pengali::text ||',"demandCharges":'|| v_demand_charges::text ||',"pju":'|| v_pju_prosen::text ||'}')::json;
	end if;
	
exception
	when others then
		return ('{"ret":-99,"rateKwh":0,"fx":0,"demandCharges":0,"pju":0}')::json;
END;
$$;


--
-- TOC entry 503 (class 1255 OID 37919)
-- Name: f_tarif_unit_get(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_unit_get(p_id_unit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(18,2):=0;
	v_tipe_periode	varchar(1):='B';
	v_n_periode	smallint:=1;
BEGIN
	select tarif, tipe_periode,n_periode 
	into v_tarif,v_tipe_periode,v_n_periode
	from(
		select 1 as urut, tarif, tipe_periode,n_periode, tgl_mulai 
		from tarif_lantai 
-- 		where aktif and status='A'  and tgl_mulai<=now() and tgl_berakhir>=now() and id_lantai = (select id_lantai from rusun_unit where id_unit=p_id_unit)
		where aktif and approval  and tgl_mulai<=now() and tgl_berakhir>=now() and id_lantai = (select id_lantai from rusun_unit where id_unit=p_id_unit)
		and kode_unit_jenis=(select kode_unit_jenis from rusun_unit where id_unit=p_id_unit)
		union all
		select 0 as urut ,tarif, tipe_periode,n_periode, tgl_mulai 
		from tarif_unit
-- 		where aktif  and status='A'  and tgl_mulai<=now() and tgl_berakhir>=now() and id_unit=p_id_unit
		where aktif  and approval  and tgl_mulai<=now() and tgl_berakhir>=now() and id_unit=p_id_unit
		order by urut,tgl_mulai desc limit 1
	) a;
	
	if v_tarif is null then
		v_tarif :=0;
		v_tipe_periode	:='B';
		v_n_periode	:=1;
	end if;
	
	return ('{"ret":0,"data":{"tarif":'|| v_tarif::text || ',"periode":"'|| v_tipe_periode ||'","n_periode":'|| v_n_periode::text ||'}}')::json;
exception
	when others then
		return '{"ret":-99,"msg":"Others error","data":{"tarif":0,"periode":"B","n_periode":1}}'::json ;
END;
$$;


--
-- TOC entry 504 (class 1255 OID 37920)
-- Name: f_tarif_unit_get_bykontrak_numeric(bigint, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_unit_get_bykontrak_numeric(p_id_kontrak_sewa bigint, p_id_unit integer, p_blth character varying) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(18,2):=0;
BEGIN
	select tarif
	into v_tarif
	from kontrak_sewa_unit_tarif
	where aktif and id_kontrak_sewa=p_id_kontrak_sewa and id_unit=p_id_unit
--	and p_blth between blth_mulai and blth_akhir
	and p_blth >= blth_mulai 
	order by blth_mulai desc
	limit 1;
		
	if v_tarif is null then
		return 0::numeric;
	end if;
	
	return v_tarif;
exception
	when others then
		return 0::numeric;
END;
$$;


--
-- TOC entry 505 (class 1255 OID 37921)
-- Name: f_tarif_unit_get_numeric(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION f_tarif_unit_get_numeric(p_id_unit integer) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
  	v_tarif numeric(18,2):=0;
	v_tipe_periode	varchar(1):='B';
	v_n_periode	smallint:=1;
BEGIN
	select tarif, tipe_periode,n_periode 
	into v_tarif,v_tipe_periode,v_n_periode
	from(
		select 1 as urut, tarif, tipe_periode,n_periode, tgl_mulai 
		from tarif_lantai 
-- 		where aktif and status='A' and tgl_mulai<=now() and tgl_berakhir>=now() and id_lantai = (select id_lantai from rusun_unit where id_unit=p_id_unit)
		where aktif and approval and tgl_mulai<=date_trunc('day',now()) and tgl_berakhir>=date_trunc('day',now()) and id_lantai = (select id_lantai from rusun_unit where id_unit=p_id_unit)
			and kode_unit_jenis=(select kode_unit_jenis from rusun_unit where id_unit=p_id_unit)
		union all
		select 0 as urut ,tarif, tipe_periode,n_periode, tgl_mulai 
		from tarif_unit
-- 		where aktif and status='A'  and tgl_mulai<=now() and tgl_berakhir>=now() and id_unit=p_id_unit
		where aktif and approval and tgl_mulai<=date_trunc('day',now()) and tgl_berakhir>=date_trunc('day',now()) and id_unit=p_id_unit
		order by urut,tgl_mulai desc limit 1
	) a;
	
	if v_tarif is null then
		v_tarif :=0;
		v_tipe_periode	:='B';
		v_n_periode	:=1;
	end if;
	return v_tarif;
exception
	when others then
		return  0::numeric ;
END;
$$;


--
-- TOC entry 506 (class 1255 OID 37922)
-- Name: ft_aset_gen_kode_aset(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_aset_gen_kode_aset() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
v_kode_aset varchar(16);
v_blth varchar(6);
BEGIN
	select to_char(NEW.tgl_perolehan,'yyyymm') into v_blth;
	select f_gen_kode_aset(v_blth,NEW.kode_aset_rusun,NEW.kode_aset_kategori) INTO v_kode_aset;
        UPDATE aset set kode_aset=v_kode_aset where ctid=NEW.ctid;
 
    RETURN NEW;
END;
$$;


--
-- TOC entry 507 (class 1255 OID 37923)
-- Name: ft_invoice_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_invoice_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
	declare
		v_count_invoice bigint;
		v_time timestamp := current_timestamp;
		v_kode_kantor varchar(10);
		v_kode_rusun varchar(5);
		v_kode_unit_jenis varchar(5);
		v_jenis_registrasi varchar(1);
		v_month_romawi varchar(4)[]:= array['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    BEGIN						
		-- get count(registrasi of the month)
-- 		select count(1)
-- 		into v_count_invoice
-- 		from invoice where date_trunc('month',tgl_rekam)=date_trunc('month',v_time) and 
-- 			id_kontrak_sewa in (
-- 				select id_kontrak_sewa from kontrak_sewa
-- 				where kode_rusun in (select kode_rusun from kontrak_sewa where id_kontrak_sewa=72)
-- 			);
		select left(no_invoice,4)::int a
		into v_count_invoice
		from invoice where date_trunc('month',tgl_rekam)=date_trunc('month',v_time) and 
			id_kontrak_sewa in (
				select id_kontrak_sewa from kontrak_sewa
				where kode_rusun in (select kode_rusun from kontrak_sewa where id_kontrak_sewa=new.id_kontrak_sewa)
			)
		order by a desc limit 1;
		if v_count_invoice is null then
			v_count_invoice := 0;
		end if;
		
--		select kode_unit_jenis,jenis_registrasi
--		into v_kode_unit_jenis,v_jenis_registrasi
--		from registrasi where no_registrasi in(select no_registrasi from kontrak_sewa where id_kontrak_sewa=new.id_kontrak_sewa)
--		limit 1;
---- 		raise notice 'v_kode_unit_jenis %',new.id_kontrak_sewa;
--		
--		select kode_kantor,kode_rusun 
--		into v_kode_kantor,v_kode_rusun
--		from rusun where kode_rusun in(select kode_rusun from kontrak_sewa where id_kontrak_sewa=new.id_kontrak_sewa);
--		raise notice '%',v_kode_unit_jenis;
--		
--        -- create no_registrasi		
--		new.no_invoice := lpad((v_count_invoice+1)::text,4,'0')::text || '/'::text || upper(v_kode_unit_jenis) || '/'::text || upper(v_kode_rusun) || '/'::text
--							|| v_month_romawi[date_part('month',v_time)] || '/'::text || v_jenis_registrasi || '/'::text || to_char(v_time,'MM') || '/'::text || to_char(v_time,'YYYY');						
		
		select jenis_registrasi
		into v_jenis_registrasi
		from kontrak_sewa
		where id_kontrak_sewa=new.id_kontrak_sewa
		limit 1;
-- 		raise notice 'v_kode_unit_jenis %',new.id_kontrak_sewa;
		
		select kode_kantor,kode_rusun 
		into v_kode_kantor,v_kode_rusun
		from rusun where kode_rusun in(select kode_rusun from kontrak_sewa where id_kontrak_sewa=new.id_kontrak_sewa);
		
		
		select kode_unit_jenis 
		into v_kode_unit_jenis
		from rusun_unit ru 
			inner join kontrak_sewa_unit ksu on ru.id_unit =ksu.id_unit 
		limit 1;
        -- create no_registrasi		
       
		new.no_invoice := lpad((v_count_invoice+1)::text,4,'0')::text || '/'::text || upper(coalesce(v_kode_unit_jenis,'')) || '/'::text || upper(v_kode_rusun) || '/'::text
							|| v_month_romawi[date_part('month',v_time)] || '/'::text || v_jenis_registrasi || '/'::text || to_char(v_time,'MM') || '/'::text || to_char(v_time,'YYYY');						
				
        RETURN NEW;								
    END;								
$$;


--
-- TOC entry 508 (class 1255 OID 37924)
-- Name: ft_kode_role_fitur_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_kode_role_fitur_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
BEGIN
	new.kode_role_fitur = trim(upper(new.kode_fitur)) || trim(upper(new.kode_role));
	RETURN NEW;								
END;								
$$;


--
-- TOC entry 381 (class 1255 OID 37925)
-- Name: ft_kode_role_menu_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_kode_role_menu_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
BEGIN
	new.kode_role_menu = trim(upper(new.kode_menu)) || trim(upper(new.kode_role));
	RETURN NEW;								
END;								
$$;


--
-- TOC entry 382 (class 1255 OID 37926)
-- Name: ft_komplain_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_komplain_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
	declare
		v_kode varchar(50);
		v_time date:=current_date;
		v_max_komplain smallint;
		v_count_komplain smallint;
		
    BEGIN
		-- kode 'CP-{kode_kategori_komplain}-{tahun}-{bulan}-{tgl}-{xxxxx}';	
		-- get count(komplain of the month)
		v_kode :=  'CP-'|| new.kode_kategori_komplain::text || '-' || f_code_angka_to_huruf(date_part('year',v_time)::bigint) || f_code_angka_to_huruf(date_part('month',v_time)::bigint) ||  '-';
		
		select max(kode),count(*)
		into v_max_komplain,v_count_komplain
		from
		(
			select right(no_komplain,5)::smallint kode
			from komplain
			where left(no_komplain,length(v_kode))=v_kode
		) t;
		if v_count_komplain=0 then
			v_max_komplain:=0;
		end if;
		new.no_komplain := v_kode || lpad( (v_max_komplain+1)::text,5,'0' );	
        RETURN NEW;								
    END;								
$$;


--
-- TOC entry 378 (class 1255 OID 37927)
-- Name: ft_kontrak_sewa_biu(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_kontrak_sewa_biu() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
BEGIN
	new.pihak1_nama_lengkap := upper(new.pihak1_nama_lengkap);
	new.pihak1_jabatan := upper(new.pihak1_jabatan);
	new.pihak2_kpj := upper(new.pihak2_kpj);
	new.pihak2_nama_lengkap := upper(new.pihak2_nama_lengkap);
	new.pihak2_npp := upper(new.pihak2_npp);
	new.pihak2_nama_perusahaan := upper(new.pihak2_nama_perusahaan);
	new.pihak2_alamat := upper(new.pihak2_alamat);
	new.pihak2_telpon := upper(new.pihak2_telpon);
	new.pihak1_ttd_title := upper(new.pihak1_ttd_title);
	new.pihak1_ttd_nama := upper(new.pihak1_ttd_nama);
	new.pihak1_ttd_jabatan := upper(new.pihak1_ttd_jabatan);
	new.pihak2_ttd_title := upper(new.pihak2_ttd_title);
	new.pihak2_ttd_nama := upper(new.pihak2_ttd_nama);
	new.pihak2_ttd_jabatan := upper(new.pihak2_ttd_jabatan);
	new.alasan_cancel_approval := upper(new.alasan_cancel_approval);
	RETURN NEW;								
END;								
$$;


--
-- TOC entry 379 (class 1255 OID 37928)
-- Name: ft_kontrak_sewa_unit_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_kontrak_sewa_unit_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
	declare
		v_tarif_unit json;
	BEGIN						
		-- get tarif unit;
		select f_tarif_unit_get(new.id_unit)
		into v_tarif_unit;
		
		new.tarif = (v_tarif_unit->>'tarif')::numeric;
		new.tipe_periode = v_tarif_unit->>'tipe_periode';
		new.n_periode = (v_tarif_unit->>'n_periode')::smallint;
	
		RETURN NEW;								
	END;								
$$;


--
-- TOC entry 380 (class 1255 OID 37929)
-- Name: ft_mtnc_wo_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_mtnc_wo_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
	declare
		v_kode varchar(50);
		v_time date:=current_date;
		v_max_wo smallint;
		v_count_wo smallint;
		
    BEGIN
		-- kode 'WO-{jenis_lokasi}-{kode_mtnc_tipe}-{tahunbulan}-{xxxx}';	
		-- get count(mtnc_wo of the month)
		v_kode :=  'WO-'|| new.jenis_lokasi::text || '-' ||  new.kode_wo_tipe::text || '-' || f_code_angka_to_huruf(date_part('year',v_time)::bigint) || f_code_angka_to_huruf(date_part('month',v_time)::bigint) || '-';
		
		select max(kode),count(*)
		into v_max_wo,v_count_wo
		from
		(
			select right(no_wo,5)::smallint kode
			from mtnc_wo
			where left(no_wo,length(v_kode))=v_kode
		) t;
		if v_count_wo=0 then
			v_max_wo:=0;
		end if;
		new.no_wo := v_kode || lpad( (v_max_wo+1)::text,5,'0' );	
        RETURN NEW;								
    END;								
$$;


--
-- TOC entry 383 (class 1255 OID 37930)
-- Name: ft_pengguna_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_pengguna_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
declare
	v_initial varchar(2);
  	v_kode_huruf varchar(28);
  	v_kode_angka bigint;
BEGIN
	v_initial := rpad(trim(substr(upper(new.nama_pengguna),1,2)),2,'X');
	select substr(kode_pengguna,3)
	into v_kode_huruf
	from pengguna
	where kode_pengguna like v_initial || '%'
	order by tgl_rekam desc
	limit 1;
	if v_kode_huruf is null then
		v_kode_angka:=0;
	else
		select f_code_huruf_to_angka(v_kode_huruf) into v_kode_angka;
	end if;
	v_kode_angka := v_kode_angka + 1;
	new.kode_pengguna = v_initial || f_code_angka_to_huruf(v_kode_angka::bigint);
	RETURN NEW;								
END;								
$$;


--
-- TOC entry 384 (class 1255 OID 37931)
-- Name: ft_registrasi_bi(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ft_registrasi_bi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$	
	declare
		v_count_reg bigint;
		v_time timestamp := current_timestamp;
    	v_month_romawi varchar(4)[] := array['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    BEGIN						
		-- get count(registrasi of the month)
		select count(1)
		into v_count_reg
		from registrasi where date_trunc('month',tgl_rekam)=date_trunc('month',v_time);
		if v_count_reg is null then
			v_count_reg := 0;
		end if;
        -- create no_registrasi						
        new.no_registrasi = upper(new.kode_unit_jenis) || '-'::text || upper(new.kode_rusun) || '-'::text
							|| v_month_romawi[date_part('month',v_time)] || '-'::text || to_char(v_time,'YYYY') 
							|| '-'::text || lpad((v_count_reg+1)::text,4,'0')::text;						
        RETURN NEW;								
    END;								
$$;


--
-- TOC entry 385 (class 1255 OID 37932)
-- Name: last_day(date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION last_day(date) RETURNS date
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
        SELECT (date_trunc('MONTH', $1) + INTERVAL '1 MONTH - 1 day')::date;
        $_$;


--
-- TOC entry 386 (class 1255 OID 37933)
-- Name: to_date_from_excel(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION to_date_from_excel(exceldate integer) RETURNS date
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF ExcelDate > 59 THEN
    ExcelDate = ExcelDate - 1;
   END IF;
   RETURN date '1899-12-31' + ExcelDate;
END;
$$;


--
-- TOC entry 387 (class 1255 OID 37934)
-- Name: to_timestamp_from_excel(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION to_timestamp_from_excel(exceldate integer) RETURNS timestamp without time zone
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF ExcelDate > 59 THEN
    ExcelDate = ExcelDate - 1;
   END IF;
   RETURN date '1899-12-31' + ExcelDate;
END;
$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 37935)
-- Name: air_meter_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE air_meter_log (
    id_air_meter_log bigint NOT NULL,
    no_meter_air character varying(50),
    id_unit integer,
    tgl_pencatatan date,
    tahun_bulan character varying(8),
    tgl_start_meter date,
    tgl_end_meter date,
    meter_start integer,
    meter_end integer,
    meter_pemakaian integer,
    keterangan character varying(300),
    petugas_pencatat character varying(75),
    use_in_billing boolean DEFAULT false,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    aktif boolean DEFAULT true,
    tgl_na date,
    petugas_na character varying(30),
    pencatatan_terakhir boolean DEFAULT false
);


--
-- TOC entry 4391 (class 0 OID 0)
-- Dependencies: 196
-- Name: TABLE air_meter_log; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE air_meter_log IS 'Daftar pencatatan meter tiap2 meter listrik';


--
-- TOC entry 197 (class 1259 OID 37944)
-- Name: air_meter_log_id_air_meter_log_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE air_meter_log_id_air_meter_log_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4392 (class 0 OID 0)
-- Dependencies: 197
-- Name: air_meter_log_id_air_meter_log_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE air_meter_log_id_air_meter_log_seq OWNED BY air_meter_log.id_air_meter_log;


--
-- TOC entry 198 (class 1259 OID 37946)
-- Name: aset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset (
    kode_aset character varying(16) NOT NULL,
    kode_kantor character varying(10),
    kode_aset_kategori character varying(5),
    nama_aset character varying(100),
    kode_satuan character varying(3),
    kode_jenis_perolehan character varying(3),
    tgl_perolehan date,
    nilai_perolehan numeric(22,2),
    nilai_residu numeric(22,2),
    masa_manfaat_bln smallint,
    kondisi_aset character varying(2),
    kondisi_aset_ref character varying(50),
    as_inventaris_unit boolean DEFAULT false,
    inventaris_alias_name character varying(100),
    biaya_kerusakan numeric(22,2),
    biaya_kehilangan numeric(22,2),
    tanah_status character varying(6),
    tanah_sertifikat_no character varying(75),
    tanah_sertifikat_berlaku_bln smallint,
    tanah_sertifikat_berakhir date,
    tanah_luasan character varying(30),
    tanah_luas_m2 smallint,
    bgn_imb_no character varying(75),
    bgn_imb_tgl date,
    bgn_imb_instansi character varying(75),
    aset_type character varying(75),
    aset_merk character varying(75),
    for_sell boolean DEFAULT false,
    keterangan character varying(300),
    amortisasi_metode character varying(2),
    amortisasi_faktor numeric(5,3),
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    lampiran_file character varying(150),
    lampiran_deskripsi character varying(150),
    tanah_sertifikat_berlaku date,
    kode_sub_kelompok character varying(5),
    kode_rusun character varying(5),
    alamat_aset character varying(250),
    no_rangka character varying(50),
    no_mesin character varying(50),
    no_polisi character varying(20),
    tgl_pembuatan date,
    kode_aset_rusun character varying(5)
);


--
-- TOC entry 199 (class 1259 OID 37955)
-- Name: aset_amortisasi_komersil; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_amortisasi_komersil (
    kode_aset character varying(20),
    bulan_ke integer,
    kode_kantor character varying(5),
    blth_penyusutan date,
    nilai_penyusutan double precision,
    nilai_buku double precision,
    tgl_rekam date,
    petugas_rekam character varying(20),
    tgl_ubah date,
    petugas_ubah character varying(20)
);


--
-- TOC entry 200 (class 1259 OID 37958)
-- Name: aset_amortisasi_proyeksi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_amortisasi_proyeksi (
    kode_aset character varying(20),
    bulan_ke integer,
    kode_kantor character varying(5),
    blth_penyusutan date,
    nilai_penyusutan double precision,
    nilai_buku double precision,
    st_amortisasi boolean DEFAULT false,
    tgl_amortisasi date,
    petugas_amortisasi date,
    tgl_rekam date,
    petugas_rekam character varying(20),
    tgl_ubah date,
    petugas_ubah character varying(20)
);


--
-- TOC entry 201 (class 1259 OID 37962)
-- Name: aset_amortisasi_rkp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_amortisasi_rkp (
    id_amortisasi bigint NOT NULL,
    kode_aset character varying(10),
    nilai_perolehan numeric(22,2),
    nilai_residu_prosen numeric(5,3),
    nilai_residu numeric(22,2),
    sum_penyusutan_thn_bfr numeric(22,2),
    penurunan_nilai smallint,
    koreksi_sum_penyusutan_thn_bfr smallint,
    nilai_yang_diamortisasi numeric(22,2),
    cur_year_penyusutan_bln_lalu_sum numeric(22,2),
    cur_year_penyusutan_bln_ini numeric(22,2),
    cur_year_penyusutan_bln_ini_sum numeric(22,2),
    sum_penyusutan_bln_ini numeric(22,2),
    nilai_buku_laporan numeric(22,2),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 202 (class 1259 OID 37965)
-- Name: aset_amortisasi_rkp_id_amortisasi_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_amortisasi_rkp_id_amortisasi_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4393 (class 0 OID 0)
-- Dependencies: 202
-- Name: aset_amortisasi_rkp_id_amortisasi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_amortisasi_rkp_id_amortisasi_seq OWNED BY aset_amortisasi_rkp.id_amortisasi;


--
-- TOC entry 203 (class 1259 OID 37967)
-- Name: aset_inventarisasi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_inventarisasi (
    id_inventarisasi bigint NOT NULL,
    kode_kantor character varying(10),
    kode_rusun character varying(10),
    tgl_inventarisasi date,
    tahun_inventarisasi character varying(5) NOT NULL,
    no_sprin character varying(50),
    tgl_sprin date,
    keterangan character varying(250),
    st_approve boolean DEFAULT true,
    tgl_approve date,
    petugas_approve character varying(10),
    st_batal boolean DEFAULT false,
    tgl_batal date,
    petugas_batal character varying(10),
    tgl_rekam date,
    petugas_rekam character varying(10),
    tgl_ubah date,
    petugas_ubah character varying(10)
);


--
-- TOC entry 204 (class 1259 OID 37972)
-- Name: aset_inventarisasi_detil; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_inventarisasi_detil (
    id_inventarisasi_dtl bigint NOT NULL,
    id_inventarisasi bigint NOT NULL,
    kode_aset character varying(20),
    kondisi_barang character varying(10),
    status_barang character varying(10),
    tgl_rekam date,
    petugas_rekam character varying(10),
    tgl_ubah date,
    petugas_ubah character varying(10)
);


--
-- TOC entry 205 (class 1259 OID 37975)
-- Name: aset_inventarisasi_detil_id_inventarisasi_dtl_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_inventarisasi_detil_id_inventarisasi_dtl_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4394 (class 0 OID 0)
-- Dependencies: 205
-- Name: aset_inventarisasi_detil_id_inventarisasi_dtl_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_inventarisasi_detil_id_inventarisasi_dtl_seq OWNED BY aset_inventarisasi_detil.id_inventarisasi_dtl;


--
-- TOC entry 206 (class 1259 OID 37977)
-- Name: aset_inventarisasi_id_inventarisasi_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_inventarisasi_id_inventarisasi_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4395 (class 0 OID 0)
-- Dependencies: 206
-- Name: aset_inventarisasi_id_inventarisasi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_inventarisasi_id_inventarisasi_seq OWNED BY aset_inventarisasi.id_inventarisasi;


--
-- TOC entry 207 (class 1259 OID 37979)
-- Name: aset_kondisi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_kondisi (
    id_aset_kondisi bigint NOT NULL,
    kode_aset character varying(16),
    tgl_kondisi date,
    kondisi_aset character varying(2),
    kondisi_aset_ref character varying(50),
    keterangan character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    kondisi_terakhir boolean DEFAULT true
);


--
-- TOC entry 208 (class 1259 OID 37983)
-- Name: aset_kondisi_id_aset_kondisi_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_kondisi_id_aset_kondisi_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4396 (class 0 OID 0)
-- Dependencies: 208
-- Name: aset_kondisi_id_aset_kondisi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_kondisi_id_aset_kondisi_seq OWNED BY aset_kondisi.id_aset_kondisi;


--
-- TOC entry 209 (class 1259 OID 37985)
-- Name: aset_lap_format_rekap; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_lap_format_rekap (
    id_lap_format_rekap integer NOT NULL,
    level1 integer,
    level2 integer,
    ket_level1 character varying(100),
    ket_level2 character varying(100),
    kode_barang character varying(10),
    petugas_rekam character varying(10),
    tgl_rekam date,
    petugas_ubah character varying(10),
    tgl_ubah date
);


--
-- TOC entry 210 (class 1259 OID 37988)
-- Name: aset_lap_format_rekap_id_lap_format_rekap_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_lap_format_rekap_id_lap_format_rekap_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4397 (class 0 OID 0)
-- Dependencies: 210
-- Name: aset_lap_format_rekap_id_lap_format_rekap_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_lap_format_rekap_id_lap_format_rekap_seq OWNED BY aset_lap_format_rekap.id_lap_format_rekap;


--
-- TOC entry 211 (class 1259 OID 37990)
-- Name: aset_migrasi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_migrasi (
    kode_aset character varying(16) NOT NULL,
    kode_kantor character varying(10),
    kode_aset_kategori character varying(5),
    nama_aset character varying(100),
    kode_satuan character varying(3),
    kode_jenis_perolehan character varying(3),
    tgl_perolehan integer,
    nilai_perolehan numeric(22,2),
    nilai_residu numeric(22,2),
    masa_manfaat_bln smallint,
    kondisi_aset character varying(2),
    kondisi_aset_ref character varying(50),
    as_inventaris_unit boolean DEFAULT false,
    inventaris_alias_name character varying(100),
    biaya_kerusakan numeric(22,2),
    biaya_kehilangan numeric(22,2),
    tanah_status character varying(6),
    tanah_sertifikat_no character varying(75),
    tanah_sertifikat_berlaku_bln smallint,
    tanah_sertifikat_berakhir integer,
    tanah_luasan character varying(30),
    tanah_luas_m2 smallint,
    bgn_imb_no character varying(75),
    bgn_imb_tgl integer,
    bgn_imb_instansi character varying(75),
    aset_type character varying(75),
    aset_merk character varying(75),
    for_sell boolean DEFAULT false,
    keterangan character varying(300),
    amortisasi_metode character varying(2),
    amortisasi_faktor numeric(5,3),
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    lampiran_file character varying(150),
    lampiran_deskripsi character varying(150),
    tanah_sertifikat_berlaku integer,
    kode_sub_kelompok character varying(5),
    kode_rusun character varying(5),
    alamat_aset character varying(250),
    no_rangka character varying(50),
    no_mesin character varying(50),
    no_polisi character varying(20),
    tgl_pembuatan integer,
    kode_aset_rusun character varying(5)
);


--
-- TOC entry 212 (class 1259 OID 37999)
-- Name: aset_penempatan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE aset_penempatan (
    id_aset_penempatan bigint NOT NULL,
    kode_aset character varying(16),
    tgl_penempatan date,
    kode_rusun character varying(5),
    kode_lokasi character varying(2),
    lokasi_unit integer,
    lokasi_non_unit character varying(20),
    keterangan character varying(300),
    penempatan_terakhir boolean DEFAULT true,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 213 (class 1259 OID 38003)
-- Name: aset_penempatan_id_aset_penempatan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE aset_penempatan_id_aset_penempatan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4398 (class 0 OID 0)
-- Dependencies: 213
-- Name: aset_penempatan_id_aset_penempatan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE aset_penempatan_id_aset_penempatan_seq OWNED BY aset_penempatan.id_aset_penempatan;


--
-- TOC entry 214 (class 1259 OID 38005)
-- Name: display; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE display (
    dsp_jenis character varying(10),
    dsp_kode character varying(30),
    dsp_kode_map character varying(50),
    dsp_nama_map character varying(50),
    dsp_nama_default character varying(100),
    dsp_urut smallint,
    dsp_mandatory boolean DEFAULT false,
    dsp_use_nama_default boolean DEFAULT false
);


--
-- TOC entry 215 (class 1259 OID 38010)
-- Name: fasilitas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE fasilitas (
    kode_fasilitas character varying(5) NOT NULL,
    nama_fasilitas character varying(100),
    keterangan character varying(300),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 216 (class 1259 OID 38017)
-- Name: fasilitas_rusun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE fasilitas_rusun (
    id_fasilitas_rusun integer NOT NULL,
    kode_rusun character varying(5),
    kode_fasilitas character varying(5),
    keterangan character varying(300),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4399 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE fasilitas_rusun; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE fasilitas_rusun IS 'Daftar fasilitas_rusun';


--
-- TOC entry 217 (class 1259 OID 38021)
-- Name: fasilitas_rusun_id_fasilitas_rusun_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE fasilitas_rusun_id_fasilitas_rusun_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4400 (class 0 OID 0)
-- Dependencies: 217
-- Name: fasilitas_rusun_id_fasilitas_rusun_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE fasilitas_rusun_id_fasilitas_rusun_seq OWNED BY fasilitas_rusun.id_fasilitas_rusun;


--
-- TOC entry 218 (class 1259 OID 38023)
-- Name: invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice (
    no_invoice character varying(50) NOT NULL,
    id_kontrak_sewa bigint,
    kode_invoice_kelompok character varying(3),
    tgl_invoice date,
    periode_bln_sewa_awal date,
    periode_bln_sewa_akhir date,
    tahun_bulan_tagihan character varying(8),
    jmlh_bulan_tagihan smallint,
    nominal_invoice numeric(18,2),
    nominal_pajak numeric(18,2),
    nominal_akhir numeric(18,2),
    max_tgl_bayar date,
    say character varying(300),
    note character varying(300),
    note_payment_method character varying(300),
    flag_rekon boolean DEFAULT false,
    flag_ada_denda boolean DEFAULT false,
    ttd_nama character varying(75),
    prosen_denda_keterlambatan numeric(7,2),
    pajak_dibayar_penyewa boolean DEFAULT false,
    pajak_nominal_dibayar_penyewa numeric(18,2) DEFAULT 0,
    ada_bukti_potong_pajak boolean DEFAULT false,
    no_bukti_potong_pajak character varying(500),
    path_bukti_potong_pajak character varying(500),
    tgl_upload_bukti_potong_pajak timestamp without time zone,
    ttd_jabatan character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(100),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4401 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE invoice; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice IS 'Invoice ';


--
-- TOC entry 4402 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN invoice.no_invoice; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN invoice.no_invoice IS '{no urut}/{kode unit jenis}/{kode rusun}/{jenis registrasi}/{bln}/{tahun} ';


--
-- TOC entry 219 (class 1259 OID 38035)
-- Name: invoice_denda_setting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_denda_setting (
    id_setting_denda bigint NOT NULL,
    tgl_mulai_berlaku date,
    prosen_denda numeric(7,2) DEFAULT 10,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4403 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE invoice_denda_setting; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_denda_setting IS 'Data Setting denda tarif sewa Kontrak Sewa';


--
-- TOC entry 220 (class 1259 OID 38040)
-- Name: invoice_denda_setting_id_setting_denda_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_denda_setting_id_setting_denda_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4404 (class 0 OID 0)
-- Dependencies: 220
-- Name: invoice_denda_setting_id_setting_denda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_denda_setting_id_setting_denda_seq OWNED BY invoice_denda_setting.id_setting_denda;


--
-- TOC entry 221 (class 1259 OID 38042)
-- Name: invoice_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries (
    id_invoice_entries bigint NOT NULL,
    no_invoice character varying(50),
    kode_invoice_entries character varying(10),
    ref_id_invoice_entries bigint,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30)
);


--
-- TOC entry 4405 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE invoice_entries; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries IS 'Invoice entries';


--
-- TOC entry 222 (class 1259 OID 38045)
-- Name: invoice_entries_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4406 (class 0 OID 0)
-- Dependencies: 222
-- Name: invoice_entries_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_id_invoice_entries_seq OWNED BY invoice_entries.id_invoice_entries;


--
-- TOC entry 223 (class 1259 OID 38047)
-- Name: invoice_entries_invair; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invair (
    id_invoice_entries bigint NOT NULL,
    id_unit integer,
    tahun_bulan_tagihan character varying(8),
    tgl_start date,
    tgl_end date,
    meter_start integer,
    meter_end integer,
    meter_pemakaian integer,
    rate_per_m3 numeric(10,2),
    wmm numeric(10,2),
    nominal_pemakaian numeric(15,2),
    nominal_total numeric(15,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_air_meter_log bigint,
    id_kontrak_sewa bigint
);


--
-- TOC entry 4407 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE invoice_entries_invair; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invair IS 'Entrie billing air';


--
-- TOC entry 224 (class 1259 OID 38052)
-- Name: invoice_entries_invair_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invair_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4408 (class 0 OID 0)
-- Dependencies: 224
-- Name: invoice_entries_invair_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invair_id_invoice_entries_seq OWNED BY invoice_entries_invair.id_invoice_entries;


--
-- TOC entry 225 (class 1259 OID 38054)
-- Name: invoice_entries_invdenda; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invdenda (
    id_invoice_entries bigint NOT NULL,
    tahun_bulan_tagihan character varying(8),
    no_invoice_kena_denda character varying(50),
    id_unit_kena_denda integer,
    tahun_bulan_tagihan_kena_denda character varying(8),
    periode_bln_sewa_awal_kena_denda date,
    periode_bln_sewa_akhir_kena_denda date,
    nominal_kena_denda numeric(15,2),
    prosen_denda numeric(7,4),
    nominal_denda numeric(15,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    jenis_denda character varying(10) DEFAULT 'INVSEWA'::character varying,
    id_kontrak_sewa bigint
);


--
-- TOC entry 4409 (class 0 OID 0)
-- Dependencies: 225
-- Name: TABLE invoice_entries_invdenda; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invdenda IS 'Entries Billing Denda';


--
-- TOC entry 226 (class 1259 OID 38060)
-- Name: invoice_entries_invdenda_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invdenda_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4410 (class 0 OID 0)
-- Dependencies: 226
-- Name: invoice_entries_invdenda_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invdenda_id_invoice_entries_seq OWNED BY invoice_entries_invdenda.id_invoice_entries;


--
-- TOC entry 227 (class 1259 OID 38062)
-- Name: invoice_entries_invdpst; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invdpst (
    id_invoice_entries_invdpst bigint NOT NULL,
    id_kontrak_sewa bigint,
    jmlh_bulan_tagihan smallint,
    jmlh_tarif_unit numeric(18,2),
    pajak_prosen numeric(5,2),
    pajak_nominal numeric(15,2),
    nominal_akhir numeric(18,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    nominal_out numeric(20,2),
    tahun_bulan_tagihan character varying(8)
);


--
-- TOC entry 4411 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE invoice_entries_invdpst; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invdpst IS 'Invoice entries untuk deposit sewa unit';


--
-- TOC entry 228 (class 1259 OID 38067)
-- Name: invoice_entries_invdpst_detil; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invdpst_detil (
    id_invoice_entries_invdpst_detil bigint NOT NULL,
    id_invoice_entries_invdpst bigint,
    id_unit integer,
    jmlh_bulan_tagihan smallint DEFAULT 1,
    tarif_unit numeric(18,2),
    pajak_prosen numeric(5,2) DEFAULT 0,
    pajak_nominal numeric(15,2) DEFAULT 0,
    nominal_akhir numeric(18,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4412 (class 0 OID 0)
-- Dependencies: 228
-- Name: TABLE invoice_entries_invdpst_detil; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invdpst_detil IS 'Detil Invoice entries untuk deposit sewa unit';


--
-- TOC entry 229 (class 1259 OID 38074)
-- Name: invoice_entries_invdpst_detil_id_invoice_entries_invdpst_de_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invdpst_detil_id_invoice_entries_invdpst_de_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4413 (class 0 OID 0)
-- Dependencies: 229
-- Name: invoice_entries_invdpst_detil_id_invoice_entries_invdpst_de_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invdpst_detil_id_invoice_entries_invdpst_de_seq OWNED BY invoice_entries_invdpst_detil.id_invoice_entries_invdpst_detil;


--
-- TOC entry 230 (class 1259 OID 38076)
-- Name: invoice_entries_invdpst_id_invoice_entries_invdpst_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invdpst_id_invoice_entries_invdpst_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4414 (class 0 OID 0)
-- Dependencies: 230
-- Name: invoice_entries_invdpst_id_invoice_entries_invdpst_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invdpst_id_invoice_entries_invdpst_seq OWNED BY invoice_entries_invdpst.id_invoice_entries_invdpst;


--
-- TOC entry 231 (class 1259 OID 38078)
-- Name: invoice_entries_invdpst_out; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invdpst_out (
    id_invoice_entries_invdpst_out bigint NOT NULL,
    id_invoice_entries_invdpst bigint,
    nominal_out numeric(18,2),
    alasan_out character varying(200),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(200),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 232 (class 1259 OID 38082)
-- Name: invoice_entries_invdpst_out_id_invoice_entries_invdpst_out_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invdpst_out_id_invoice_entries_invdpst_out_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4415 (class 0 OID 0)
-- Dependencies: 232
-- Name: invoice_entries_invdpst_out_id_invoice_entries_invdpst_out_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invdpst_out_id_invoice_entries_invdpst_out_seq OWNED BY invoice_entries_invdpst_out.id_invoice_entries_invdpst_out;


--
-- TOC entry 233 (class 1259 OID 38084)
-- Name: invoice_entries_inveq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_inveq (
    id_invoice_entries bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_unit integer,
    kode_aset character varying(16),
    jenis_tagihan character varying(1),
    nominal_penggantian numeric(18,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    petugas_na character varying(30),
    tahun_bulan_tagihan character varying(8),
    id_inventaris_unit bigint
);


--
-- TOC entry 4416 (class 0 OID 0)
-- Dependencies: 233
-- Name: TABLE invoice_entries_inveq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_inveq IS 'Entries billing item unit';


--
-- TOC entry 4417 (class 0 OID 0)
-- Dependencies: 233
-- Name: COLUMN invoice_entries_inveq.jenis_tagihan; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN invoice_entries_inveq.jenis_tagihan IS 'H: KEhilangan, R: Kerusakan';


--
-- TOC entry 234 (class 1259 OID 38089)
-- Name: invoice_entries_inveq_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_inveq_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4418 (class 0 OID 0)
-- Dependencies: 234
-- Name: invoice_entries_inveq_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_inveq_id_invoice_entries_seq OWNED BY invoice_entries_inveq.id_invoice_entries;


--
-- TOC entry 235 (class 1259 OID 38091)
-- Name: invoice_entries_invfas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invfas (
    id_invoice_entries bigint NOT NULL,
    id_unit integer,
    kode_fasilitas character varying(5),
    tahun_bulan_tagihan character varying(8),
    periode_bln_sewa_awal date,
    periode_bln_sewa_akhir date,
    jmlh_bulan_tagihan smallint,
    tarif numeric(10,2),
    nominal_total numeric(15,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_kontrak_sewa bigint,
    petugas_na character varying(30)
);


--
-- TOC entry 4419 (class 0 OID 0)
-- Dependencies: 235
-- Name: TABLE invoice_entries_invfas; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invfas IS 'Entrie billing Fasilitas';


--
-- TOC entry 236 (class 1259 OID 38096)
-- Name: invoice_entries_invfas_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invfas_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4420 (class 0 OID 0)
-- Dependencies: 236
-- Name: invoice_entries_invfas_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invfas_id_invoice_entries_seq OWNED BY invoice_entries_invfas.id_invoice_entries;


--
-- TOC entry 237 (class 1259 OID 38098)
-- Name: invoice_entries_invlstrk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invlstrk (
    id_invoice_entries bigint NOT NULL,
    id_unit integer,
    tahun_bulan_tagihan character varying(8),
    tgl_start date,
    tgl_end date,
    meter_start integer,
    meter_end integer,
    meter_pemakaian integer,
    rate_per_kwh numeric(10,2),
    faktor_pengali numeric(10,2),
    demand_charges numeric(10,2),
    pju_prosen numeric(10,2),
    nominal_demand_charges numeric(10,2),
    nominal_pemakaian numeric(15,2),
    nominal_pju numeric(15,2),
    nominal_total numeric(15,2),
    id_listrik_meter_log bigint,
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_kontrak_sewa bigint
);


--
-- TOC entry 4421 (class 0 OID 0)
-- Dependencies: 237
-- Name: TABLE invoice_entries_invlstrk; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invlstrk IS 'Entrie bliing listrik';


--
-- TOC entry 238 (class 1259 OID 38103)
-- Name: invoice_entries_invlstrk_id_invoice_entries_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invlstrk_id_invoice_entries_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4422 (class 0 OID 0)
-- Dependencies: 238
-- Name: invoice_entries_invlstrk_id_invoice_entries_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invlstrk_id_invoice_entries_seq OWNED BY invoice_entries_invlstrk.id_invoice_entries;


--
-- TOC entry 239 (class 1259 OID 38105)
-- Name: invoice_entries_invsewa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE invoice_entries_invsewa (
    id_invoice_entries_invsewa bigint NOT NULL,
    id_unit integer,
    tahun_bulan_tagihan character varying(8),
    jmlh_bulan_tagihan smallint DEFAULT 1,
    periode_bln_sewa_awal date,
    periode_bln_sewa_akhir date,
    tarif_unit numeric(18,2),
    pajak_prosen numeric(5,2),
    pajak_nominal numeric(15,2),
    nominal_akhir numeric(18,2),
    status character varying(1) DEFAULT 'E'::character varying,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    terbentuk_denda boolean DEFAULT false,
    pajak_dibayar_penyewa boolean DEFAULT false,
    pajak_nominal_dibayar_penyewa numeric(18,2) DEFAULT 0,
    id_kontrak_sewa bigint,
    petugas_na character varying(30)
);


--
-- TOC entry 4423 (class 0 OID 0)
-- Dependencies: 239
-- Name: TABLE invoice_entries_invsewa; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE invoice_entries_invsewa IS 'Invoice entries untuk sewa unit';


--
-- TOC entry 4424 (class 0 OID 0)
-- Dependencies: 239
-- Name: COLUMN invoice_entries_invsewa.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN invoice_entries_invsewa.status IS 'E: ENTRIES, I: INVOICE';


--
-- TOC entry 240 (class 1259 OID 38114)
-- Name: invoice_entries_invsewa_id_invoice_entries_invsewa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE invoice_entries_invsewa_id_invoice_entries_invsewa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4425 (class 0 OID 0)
-- Dependencies: 240
-- Name: invoice_entries_invsewa_id_invoice_entries_invsewa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE invoice_entries_invsewa_id_invoice_entries_invsewa_seq OWNED BY invoice_entries_invsewa.id_invoice_entries_invsewa;


--
-- TOC entry 241 (class 1259 OID 38116)
-- Name: kode_agama; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_agama (
    kode_agama character varying(10) NOT NULL,
    nama_agama character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4426 (class 0 OID 0)
-- Dependencies: 241
-- Name: TABLE kode_agama; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_agama IS 'Kode Agama';


--
-- TOC entry 242 (class 1259 OID 38120)
-- Name: kode_aset_kategori; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_kategori (
    kode_kategori character varying(5) NOT NULL,
    kode_kelompok character varying(5) NOT NULL,
    kode_title_kategori character varying(1),
    nama_title_kategori character varying(50),
    nama_kategori character varying(50),
    aset_kapitalisasi boolean DEFAULT true,
    no_urut smallint,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    kode_sub_kelompok character varying(5) NOT NULL
);


--
-- TOC entry 243 (class 1259 OID 38125)
-- Name: kode_aset_kelompok; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_kelompok (
    kode_kelompok character varying(1) NOT NULL,
    nama_kelompok character varying(50),
    ada_amortisasi boolean DEFAULT true,
    kode_kelompok_amortisasi character varying(10),
    no_urut smallint,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 244 (class 1259 OID 38130)
-- Name: kode_aset_kondisi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_kondisi (
    kode_kondisi character varying(5) NOT NULL,
    nama_kondisi character varying(50),
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 245 (class 1259 OID 38134)
-- Name: kode_aset_penyusutan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_penyusutan (
    id_kode_aset_penyusutan integer NOT NULL,
    kode_kategori character varying(5),
    kode_sub_kelompok character varying(5),
    tgl_efektif date,
    masa_manfaat_bln smallint,
    aktif boolean NOT NULL,
    nilai_residu integer,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 246 (class 1259 OID 38137)
-- Name: kode_aset_penyusutan_id_kode_aset_penyusutan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kode_aset_penyusutan_id_kode_aset_penyusutan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4427 (class 0 OID 0)
-- Dependencies: 246
-- Name: kode_aset_penyusutan_id_kode_aset_penyusutan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kode_aset_penyusutan_id_kode_aset_penyusutan_seq OWNED BY kode_aset_penyusutan.id_kode_aset_penyusutan;


--
-- TOC entry 247 (class 1259 OID 38139)
-- Name: kode_aset_penyusutan_temp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_penyusutan_temp (
    kode_kategori character varying(5),
    kode_sub_kelompok character varying(5),
    tgl_efektif character varying(50),
    masa_manfaat_bln smallint,
    aktif boolean,
    nilai_residu integer,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 248 (class 1259 OID 38142)
-- Name: kode_aset_rusun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_rusun (
    id_kode_aset_rusun integer NOT NULL,
    kode_rusun character varying(5) NOT NULL,
    kode_aset_rusun character varying(3) NOT NULL,
    keterangan character varying(150),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_rusun_blok integer
);


--
-- TOC entry 4428 (class 0 OID 0)
-- Dependencies: 248
-- Name: TABLE kode_aset_rusun; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_aset_rusun IS 'Daftar pengkodean aset rusun';


--
-- TOC entry 249 (class 1259 OID 38146)
-- Name: kode_aset_rusun_id_kode_aset_rusun_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kode_aset_rusun_id_kode_aset_rusun_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4429 (class 0 OID 0)
-- Dependencies: 249
-- Name: kode_aset_rusun_id_kode_aset_rusun_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kode_aset_rusun_id_kode_aset_rusun_seq OWNED BY kode_aset_rusun.id_kode_aset_rusun;


--
-- TOC entry 250 (class 1259 OID 38148)
-- Name: kode_aset_subkelompok; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_aset_subkelompok (
    kode_barang character varying(3) NOT NULL,
    kode_kelompok character varying(3),
    kode_subkelompok character varying(3),
    nama_subkelompok character varying(50),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(10),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(10),
    aktif boolean DEFAULT true
);


--
-- TOC entry 251 (class 1259 OID 38152)
-- Name: kode_batas_kap; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_batas_kap (
    id_batas_kap integer NOT NULL,
    nilai_min_kap integer,
    tgl_berlaku date,
    st_aktif boolean,
    tgl_rekam date,
    petugas_rekam character varying(20),
    tgl_ubah date,
    petugas_ubah character varying(20)
);


--
-- TOC entry 252 (class 1259 OID 38155)
-- Name: kode_batas_kap_id_batas_kap_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kode_batas_kap_id_batas_kap_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4430 (class 0 OID 0)
-- Dependencies: 252
-- Name: kode_batas_kap_id_batas_kap_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kode_batas_kap_id_batas_kap_seq OWNED BY kode_batas_kap.id_batas_kap;


--
-- TOC entry 253 (class 1259 OID 38157)
-- Name: kode_dokumen; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_dokumen (
    kode_dokumen character varying(5) NOT NULL,
    nama_dokumen character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    kode_kategori character varying(3)
);


--
-- TOC entry 4431 (class 0 OID 0)
-- Dependencies: 253
-- Name: TABLE kode_dokumen; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_dokumen IS 'Daftar Dokumen';


--
-- TOC entry 254 (class 1259 OID 38161)
-- Name: kode_fitur; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_fitur (
    kode_fitur character varying(10) NOT NULL,
    nama_fitur character varying(50),
    keterangan character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4432 (class 0 OID 0)
-- Dependencies: 254
-- Name: TABLE kode_fitur; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_fitur IS 'Data fitur';


--
-- TOC entry 255 (class 1259 OID 38165)
-- Name: kode_golongan_listrik; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_golongan_listrik (
    kode_golongan_listrik character varying(10) NOT NULL,
    deskripsi character varying(100),
    besar_daya_watt integer,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4433 (class 0 OID 0)
-- Dependencies: 255
-- Name: TABLE kode_golongan_listrik; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_golongan_listrik IS 'Kode Golongan Listrik';


--
-- TOC entry 256 (class 1259 OID 38169)
-- Name: kode_invoice_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_invoice_entries (
    kode_invoice_entries character varying(10) NOT NULL,
    deskripsi_invoice_entries character varying(150),
    no_urut smallint,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4434 (class 0 OID 0)
-- Dependencies: 256
-- Name: TABLE kode_invoice_entries; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_invoice_entries IS 'Entries invoice';


--
-- TOC entry 257 (class 1259 OID 38173)
-- Name: kode_invoice_golongan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_invoice_golongan (
    kode_invoice_golongan character varying(1) NOT NULL,
    deskripsi_invoice_golongan text,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4435 (class 0 OID 0)
-- Dependencies: 257
-- Name: TABLE kode_invoice_golongan; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_invoice_golongan IS 'Golongan kontrak invoice';


--
-- TOC entry 258 (class 1259 OID 38180)
-- Name: kode_invoice_kelompok; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_invoice_kelompok (
    kode_invoice_kelompok character varying(3) NOT NULL,
    kode_invoice_golongan character varying(1),
    title_invoice character varying(100),
    all_unit boolean DEFAULT true,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4436 (class 0 OID 0)
-- Dependencies: 258
-- Name: TABLE kode_invoice_kelompok; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_invoice_kelompok IS 'Kelompok invoice';


--
-- TOC entry 259 (class 1259 OID 38185)
-- Name: kode_invoice_kelompok_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_invoice_kelompok_entries (
    kode_invoice_kelompok character varying(3) NOT NULL,
    kode_invoice_entries character varying(10) NOT NULL,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4437 (class 0 OID 0)
-- Dependencies: 259
-- Name: TABLE kode_invoice_kelompok_entries; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_invoice_kelompok_entries IS 'Kelompok entries invoice';


--
-- TOC entry 260 (class 1259 OID 38189)
-- Name: kode_jenis_kelamin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_jenis_kelamin (
    kode_jenis_kelamin character varying(1) NOT NULL,
    nama_jenis_kelamin character varying(100),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    aktif boolean DEFAULT true,
    tgl_na date,
    petugas_na character varying(30)
);


--
-- TOC entry 4438 (class 0 OID 0)
-- Dependencies: 260
-- Name: TABLE kode_jenis_kelamin; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_jenis_kelamin IS 'Kode Jenis Kelamin';


--
-- TOC entry 261 (class 1259 OID 38193)
-- Name: kode_jenis_kendaraan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_jenis_kendaraan (
    kode_jenis_kendaraan character varying(3) NOT NULL,
    nama_jenis_kendaraan character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4439 (class 0 OID 0)
-- Dependencies: 261
-- Name: TABLE kode_jenis_kendaraan; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_jenis_kendaraan IS 'Jenis kendaran';


--
-- TOC entry 262 (class 1259 OID 38197)
-- Name: kode_jenis_nik; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_jenis_nik (
    kode_jenis_nik character varying(10) NOT NULL,
    nama_jenis_nik character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4440 (class 0 OID 0)
-- Dependencies: 262
-- Name: TABLE kode_jenis_nik; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_jenis_nik IS 'Data Jenis nik';


--
-- TOC entry 263 (class 1259 OID 38201)
-- Name: kode_jenis_perolehan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_jenis_perolehan (
    kode_jenis_perolehan character varying(3) NOT NULL,
    deskripsi character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 264 (class 1259 OID 38205)
-- Name: kode_kantor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_kantor (
    kode_kantor character varying(5) NOT NULL,
    kode_kantor_induk character varying(5),
    nama_kantor character varying(100),
    jenis_kantor character varying(1),
    alamat character varying(300),
    keterangan text,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 265 (class 1259 OID 38212)
-- Name: kode_kategori_komplain; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_kategori_komplain (
    kode_kategori_komplain character varying(5) NOT NULL,
    nama_kategori_komplain character varying(75),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4441 (class 0 OID 0)
-- Dependencies: 265
-- Name: TABLE kode_kategori_komplain; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_kategori_komplain IS 'Kode kategori komplain';


--
-- TOC entry 266 (class 1259 OID 38216)
-- Name: kode_menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_menu (
    kode_menu character varying(10) NOT NULL,
    kode_menu_induk character varying(10),
    nama_menu character varying(50),
    keterangan character varying(100),
    no_urut smallint,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    icon_menu character varying(255)
);


--
-- TOC entry 4442 (class 0 OID 0)
-- Dependencies: 266
-- Name: TABLE kode_menu; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_menu IS 'Data Menu';


--
-- TOC entry 267 (class 1259 OID 38223)
-- Name: kode_pembayaran_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_pembayaran_method (
    kode_pembayaran_method character varying(3) NOT NULL,
    nama_pembayaran_method character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4443 (class 0 OID 0)
-- Dependencies: 267
-- Name: TABLE kode_pembayaran_method; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_pembayaran_method IS 'Method Pembayaran';


--
-- TOC entry 268 (class 1259 OID 38227)
-- Name: kode_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_role (
    kode_role character varying(5) NOT NULL,
    nama_role character varying(100),
    keterangan character varying(300),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4444 (class 0 OID 0)
-- Dependencies: 268
-- Name: TABLE kode_role; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_role IS 'Data ROLE';


--
-- TOC entry 269 (class 1259 OID 38234)
-- Name: kode_role_fitur; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_role_fitur (
    kode_role_fitur character varying(20) NOT NULL,
    kode_fitur character varying(10),
    kode_role character varying(5),
    can_view boolean DEFAULT true,
    can_edit boolean DEFAULT true,
    can_delete boolean DEFAULT true,
    can_approve boolean DEFAULT true,
    can_act_other1 boolean DEFAULT false,
    can_act_other2 boolean DEFAULT false,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4445 (class 0 OID 0)
-- Dependencies: 269
-- Name: TABLE kode_role_fitur; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_role_fitur IS 'Data Role fitur';


--
-- TOC entry 270 (class 1259 OID 38244)
-- Name: kode_role_menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_role_menu (
    kode_role_menu character varying(20) NOT NULL,
    kode_menu character varying(10),
    kode_role character varying(5),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4446 (class 0 OID 0)
-- Dependencies: 270
-- Name: TABLE kode_role_menu; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_role_menu IS 'Data Role Menu';


--
-- TOC entry 271 (class 1259 OID 38248)
-- Name: kode_satuan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_satuan (
    kode_satuan character varying(3) NOT NULL,
    nama_satuan character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 272 (class 1259 OID 38252)
-- Name: kode_status_nikah; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_status_nikah (
    kode_status_nikah character varying(2) NOT NULL,
    nama_status_nikah character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4447 (class 0 OID 0)
-- Dependencies: 272
-- Name: TABLE kode_status_nikah; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_status_nikah IS 'Data Status pernikahan';


--
-- TOC entry 273 (class 1259 OID 38256)
-- Name: kode_status_pekerjaan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_status_pekerjaan (
    kode_status_pekerjaan character varying(3) NOT NULL,
    nama_status_pekerjaan character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4448 (class 0 OID 0)
-- Dependencies: 273
-- Name: TABLE kode_status_pekerjaan; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_status_pekerjaan IS 'Status pekerjaan';


--
-- TOC entry 274 (class 1259 OID 38260)
-- Name: kode_tipe_kontrak_berakhir; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_tipe_kontrak_berakhir (
    kode_tipe_kontrak_berakhir character varying(3) NOT NULL,
    nama_tipe_kontrak_berakhir character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4449 (class 0 OID 0)
-- Dependencies: 274
-- Name: TABLE kode_tipe_kontrak_berakhir; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_tipe_kontrak_berakhir IS 'Tipe kontrak berakhir';


--
-- TOC entry 275 (class 1259 OID 38264)
-- Name: kode_tipe_out; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_tipe_out (
    kode_tipe_out character varying(2) NOT NULL,
    deskripsi_tipe_out character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4450 (class 0 OID 0)
-- Dependencies: 275
-- Name: TABLE kode_tipe_out; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_tipe_out IS 'Deskripsi penghuni out';


--
-- TOC entry 276 (class 1259 OID 38268)
-- Name: kode_unit_jenis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_unit_jenis (
    kode_unit_jenis character varying(5) NOT NULL,
    nama_unit_jenis character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    disewakan boolean DEFAULT true,
    st_unit boolean
);


--
-- TOC entry 4451 (class 0 OID 0)
-- Dependencies: 276
-- Name: TABLE kode_unit_jenis; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_unit_jenis IS 'Datajenis unit yang ada di rusunawa';


--
-- TOC entry 277 (class 1259 OID 38273)
-- Name: kode_wo_prioritas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_wo_prioritas (
    kode_wo_prioritas character varying(3) NOT NULL,
    nama_wo_prioritas character varying(50),
    keterangan character varying(200),
    aktif boolean DEFAULT true,
    tgl_na date,
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4452 (class 0 OID 0)
-- Dependencies: 277
-- Name: TABLE kode_wo_prioritas; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_wo_prioritas IS 'Status yang ada di Maintenance work order';


--
-- TOC entry 278 (class 1259 OID 38280)
-- Name: kode_wo_tipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kode_wo_tipe (
    kode_wo_tipe character varying(3) NOT NULL,
    nama_wo_tipe character varying(50),
    keterangan character varying(200),
    aktif boolean DEFAULT true,
    tgl_na date,
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    hide_in_form boolean DEFAULT false
);


--
-- TOC entry 4453 (class 0 OID 0)
-- Dependencies: 278
-- Name: TABLE kode_wo_tipe; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kode_wo_tipe IS 'Tipe-tipe Maintenance work order';


--
-- TOC entry 279 (class 1259 OID 38288)
-- Name: komplain; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE komplain (
    no_komplain character varying(50) NOT NULL,
    kode_rusun character varying(5),
    id_rusun_blok integer,
    id_lantai integer,
    id_unit integer,
    nama_pelapor character varying(100),
    tgl_komplain timestamp without time zone,
    kode_kategori_komplain character varying(5),
    title_komplain character varying(100),
    deskripsi_komplain text,
    status character varying(1) DEFAULT 'O'::character varying,
    lokasi_keterangan text,
    penyelesaian_status character varying(2),
    penyelesaian_tgl date,
    penyelesaian text,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4454 (class 0 OID 0)
-- Dependencies: 279
-- Name: TABLE komplain; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE komplain IS 'komplain';


--
-- TOC entry 4455 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN komplain.no_komplain; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN komplain.no_komplain IS 'CP-{kode_kategori_komplai}-{tahun}-{bulan}-{xxxx}';


--
-- TOC entry 4456 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN komplain.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN komplain.status IS 'O: Open, C: Close';


--
-- TOC entry 4457 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN komplain.penyelesaian_status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN komplain.penyelesaian_status IS 'R: Resolved, U: UNRESOLVED, WO: FORWARD TO WO';


--
-- TOC entry 280 (class 1259 OID 38296)
-- Name: kontrak_lampiran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_lampiran (
    id_kontrak_lampiran bigint NOT NULL,
    jenis_perjanjian character varying(1) DEFAULT 'K'::character varying,
    no_perjanjian character varying(50),
    path_dokumen character varying(500),
    aktif boolean DEFAULT true,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30)
);


--
-- TOC entry 4458 (class 0 OID 0)
-- Dependencies: 280
-- Name: TABLE kontrak_lampiran; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_lampiran IS 'Data lampiran dokumen perjanjian';


--
-- TOC entry 281 (class 1259 OID 38304)
-- Name: kontrak_lampiran_id_kontrak_lampiran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_lampiran_id_kontrak_lampiran_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 281
-- Name: kontrak_lampiran_id_kontrak_lampiran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_lampiran_id_kontrak_lampiran_seq OWNED BY kontrak_lampiran.id_kontrak_lampiran;


--
-- TOC entry 282 (class 1259 OID 38306)
-- Name: kontrak_sewa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa (
    id_kontrak_sewa bigint NOT NULL,
    no_kontrak_sewa character varying(50),
    no_registrasi character varying(50),
    kode_rusun character varying(5),
    jenis_registrasi character varying(1),
    tgl_kontrak_sewa date,
    pihak1_nama_lengkap character varying(75),
    pihak1_jabatan character varying(75),
    pihak2_kpj character varying(30),
    pihak2_nama_lengkap character varying(75),
    pihak2_npp character varying(75),
    pihak2_nama_perusahaan character varying(75),
    pihak2_alamat character varying(150),
    pihak2_telpon character varying(30),
    sewa_satu_unit boolean DEFAULT true,
    jmlh_unit smallint,
    jmlh_bulan_sewa smallint,
    tgl_mulai_sewa date,
    tgl_berakhir_sewa date,
    jmlh_bulan_deposit smallint DEFAULT 1,
    inv_periode_bulan smallint DEFAULT 1,
    inv_duedate smallint DEFAULT 1,
    inv_duedate_bayar smallint DEFAULT 10,
    inv_duedate_utilitas smallint DEFAULT 1,
    inv_duedate_utilitas_bayar smallint DEFAULT 10,
    biaya_administrasi numeric(15,2),
    biaya_administrasi_by_prosen boolean DEFAULT true,
    biaya_denda numeric(15,2),
    biaya_denda_by_prosen boolean DEFAULT true,
    golongan_invoice character varying(1),
    pihak1_ttd_title character varying(100),
    pihak1_ttd_nama character varying(100),
    pihak1_ttd_jabatan character varying(100),
    pihak2_ttd_title character varying(100),
    pihak2_ttd_nama character varying(100),
    pihak2_ttd_jabatan character varying(100),
    pihak2_nik character varying(50),
    pihak2_jenis_kelamin character varying(1),
    pihak2_email character varying(255),
    pihak2_telp_prs character varying(50),
    pihak2_alamat_prs character varying(200),
    pihak2_departemen_prs character varying(100),
    pihak2_telp character varying(50),
    pihak2_email_prs character varying(255),
    status character varying(1) DEFAULT 'S'::character varying,
    approval boolean DEFAULT false,
    approval_tgl timestamp without time zone,
    approval_petugas character varying(30),
    approval_alasan character varying(100),
    signed boolean DEFAULT false,
    signed_date timestamp without time zone,
    kontrak_berlaku boolean DEFAULT false,
    kontrak_berakhir boolean DEFAULT false,
    kontrak_berakhir_tipe character varying(3),
    kontrak_berakhir_tgl date,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    inv_keterlambatan_hari_bayar smallint,
    tgl_berakhir_adendum date,
    pihak2_jabatan character varying(75),
    tgl_cancel_approval date,
    petugas_cancel_approval character varying(30),
    alasan_cancel_approval character varying(150)
);


--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 282
-- Name: TABLE kontrak_sewa; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa IS 'Registrasi';


--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 282
-- Name: COLUMN kontrak_sewa.no_kontrak_sewa; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa.no_kontrak_sewa IS 'K/{kode_kantor}/{kode_unit_jenis}/{kode_rusun}/{bln romawi}/{tahun}/{max(kontrak)+1';


--
-- TOC entry 4462 (class 0 OID 0)
-- Dependencies: 282
-- Name: COLUMN kontrak_sewa.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa.status IS 'D: Draft, S: Submit, K: Kontrak, C: Cancel kontrak, R: Reject';


--
-- TOC entry 4463 (class 0 OID 0)
-- Dependencies: 282
-- Name: COLUMN kontrak_sewa.aktif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa.aktif IS 'Jadi false jika status C';


--
-- TOC entry 283 (class 1259 OID 38327)
-- Name: kontrak_sewa_adendum; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_adendum (
    id_adendum bigint NOT NULL,
    id_kontrak_sewa bigint,
    no_adendum character varying(50),
    jmlh_bulan_adendum smallint,
    tgl_mulai_sewa date,
    tgl_berakhir_sewa date,
    biaya_administrasi numeric(15,2) DEFAULT 0,
    biaya_administrasi_by_prosen boolean DEFAULT false,
    pihak1_ttd_title character varying(100),
    pihak1_ttd_nama character varying(100),
    pihak1_ttd_jabatan character varying(100),
    pihak2_ttd_title character varying(100),
    pihak2_ttd_nama character varying(100),
    pihak2_ttd_jabatan character varying(100),
    status character varying(1) DEFAULT 'D'::character varying,
    approval boolean DEFAULT false,
    approval_tgl timestamp without time zone,
    approval_petugas character varying(30),
    approval_alasan character varying(100),
    signed boolean DEFAULT false,
    signed_date timestamp without time zone,
    adendum_berlaku boolean DEFAULT false,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4464 (class 0 OID 0)
-- Dependencies: 283
-- Name: TABLE kontrak_sewa_adendum; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_adendum IS 'Kontrak sewa adendum';


--
-- TOC entry 4465 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN kontrak_sewa_adendum.no_adendum; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa_adendum.no_adendum IS 'AD/{no_kontrak}/max( adendum pada no kontrak itu)';


--
-- TOC entry 4466 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN kontrak_sewa_adendum.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa_adendum.status IS 'D: Draft, S: Submit, K: Kontrak, C: Cancel kontrak, R: Reject';


--
-- TOC entry 4467 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN kontrak_sewa_adendum.aktif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN kontrak_sewa_adendum.aktif IS 'Jadi false jika status C';


--
-- TOC entry 284 (class 1259 OID 38340)
-- Name: kontrak_sewa_adendum_id_adendum_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_adendum_id_adendum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4468 (class 0 OID 0)
-- Dependencies: 284
-- Name: kontrak_sewa_adendum_id_adendum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_adendum_id_adendum_seq OWNED BY kontrak_sewa_adendum.id_adendum;


--
-- TOC entry 285 (class 1259 OID 38342)
-- Name: kontrak_sewa_berhenti; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_berhenti (
    id_berhenti bigint NOT NULL,
    id_kontrak_sewa bigint,
    tgl_req_berhenti_sewa date,
    tipe_berakhir character varying(2),
    alasan_berakhir character varying(150),
    status character varying(1) DEFAULT 'D'::character varying,
    aktif boolean DEFAULT true,
    approval boolean DEFAULT false,
    approval_tgl timestamp without time zone,
    approval_petugas character varying(30),
    approval_alasan character varying(100),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    finalisasi_tagihan_sisa numeric(18,2),
    finalisasi_deposit numeric(18,2),
    finalisasi_retur numeric(18,2),
    finalisasi_kurang_bayar numeric(18,2),
    finalisasi_kembali numeric(18,2),
    finalisasi_date timestamp without time zone,
    is_finalisasi_deposit boolean DEFAULT false,
    finalisasi_deposit_date timestamp without time zone,
    finalisasi_pembayarang_krg_byr numeric(18,2) DEFAULT 0,
    finalisasi_deposit_petugas character varying(30)
);


--
-- TOC entry 4469 (class 0 OID 0)
-- Dependencies: 285
-- Name: TABLE kontrak_sewa_berhenti; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_berhenti IS 'Pengajuan berhenti sewa';


--
-- TOC entry 286 (class 1259 OID 38350)
-- Name: kontrak_sewa_berhenti_id_berhenti_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_berhenti_id_berhenti_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4470 (class 0 OID 0)
-- Dependencies: 286
-- Name: kontrak_sewa_berhenti_id_berhenti_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_berhenti_id_berhenti_seq OWNED BY kontrak_sewa_berhenti.id_berhenti;


--
-- TOC entry 287 (class 1259 OID 38352)
-- Name: kontrak_sewa_fasilitas_tarif; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_fasilitas_tarif (
    id_kontrak_sewa_fasilitas_tarif bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_adendum bigint,
    kode_fasilitas character varying(5),
    tgl_tarif date,
    blth_mulai character varying(8),
    blth_akhir character varying(8),
    tarif numeric(18,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4471 (class 0 OID 0)
-- Dependencies: 287
-- Name: TABLE kontrak_sewa_fasilitas_tarif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_fasilitas_tarif IS 'Data Tarif Fasilitas Kontrak Sewa';


--
-- TOC entry 288 (class 1259 OID 38356)
-- Name: kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fasilitas_tari_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fasilitas_tari_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4472 (class 0 OID 0)
-- Dependencies: 288
-- Name: kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fasilitas_tari_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fasilitas_tari_seq OWNED BY kontrak_sewa_fasilitas_tarif.id_kontrak_sewa_fasilitas_tarif;


--
-- TOC entry 289 (class 1259 OID 38358)
-- Name: kontrak_sewa_fasilitas_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_fasilitas_unit (
    id_kontrak_sewa_fasilitas_unit bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_unit integer,
    kode_fasilitas character varying(5),
    tgl_sewa_fasilitas date,
    status character varying(1) DEFAULT 'D'::character varying,
    approval boolean DEFAULT false,
    approval_tgl timestamp without time zone,
    approval_petugas character varying(30),
    approval_alasan character varying(100),
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    tgl_berhenti_fasilitas date,
    petugas_na character varying(30)
);


--
-- TOC entry 4473 (class 0 OID 0)
-- Dependencies: 289
-- Name: TABLE kontrak_sewa_fasilitas_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_fasilitas_unit IS 'Daftar kontrak_sewa_fasilitas_unit';


--
-- TOC entry 290 (class 1259 OID 38364)
-- Name: kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fasilitas_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fasilitas_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4474 (class 0 OID 0)
-- Dependencies: 290
-- Name: kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fasilitas_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fasilitas_unit_seq OWNED BY kontrak_sewa_fasilitas_unit.id_kontrak_sewa_fasilitas_unit;


--
-- TOC entry 291 (class 1259 OID 38366)
-- Name: kontrak_sewa_id_kontrak_sewa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_id_kontrak_sewa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4475 (class 0 OID 0)
-- Dependencies: 291
-- Name: kontrak_sewa_id_kontrak_sewa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_id_kontrak_sewa_seq OWNED BY kontrak_sewa.id_kontrak_sewa;


--
-- TOC entry 292 (class 1259 OID 38368)
-- Name: kontrak_sewa_inventaris_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_inventaris_items (
    id_inventaris_unit bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_unit integer,
    kode_aset character varying(16),
    tgl_penempatan_in date,
    tgl_penempatan_out date,
    kondisi_awal character varying(2),
    kondisi_akhir character varying(2),
    tgl_kondisi_awal date,
    tgl_kondisi_akhir date,
    biaya_kerusakan numeric(18,2),
    biaya_kehilangan numeric(18,2),
    aktif_kontrak boolean DEFAULT true,
    use_in_entri boolean DEFAULT false,
    use_in_entri_blth character varying(8),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    alasan_na character varying(150),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4476 (class 0 OID 0)
-- Dependencies: 292
-- Name: TABLE kontrak_sewa_inventaris_items; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_inventaris_items IS 'Data barang inventaris Unit';


--
-- TOC entry 293 (class 1259 OID 38374)
-- Name: kontrak_sewa_inventaris_items_id_inventaris_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_inventaris_items_id_inventaris_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4477 (class 0 OID 0)
-- Dependencies: 293
-- Name: kontrak_sewa_inventaris_items_id_inventaris_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_inventaris_items_id_inventaris_unit_seq OWNED BY kontrak_sewa_inventaris_items.id_inventaris_unit;


--
-- TOC entry 294 (class 1259 OID 38376)
-- Name: kontrak_sewa_retur; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_retur (
    id_kontrak_sewa_retur bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_pembayaran bigint,
    nominal_retur_in numeric(18,2),
    nominal_retur_out numeric(18,2) DEFAULT 0,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4478 (class 0 OID 0)
-- Dependencies: 294
-- Name: TABLE kontrak_sewa_retur; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_retur IS 'Retur pembayaran pad kontrak sewa';


--
-- TOC entry 295 (class 1259 OID 38381)
-- Name: kontrak_sewa_retur_id_kontrak_sewa_retur_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_retur_id_kontrak_sewa_retur_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4479 (class 0 OID 0)
-- Dependencies: 295
-- Name: kontrak_sewa_retur_id_kontrak_sewa_retur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_retur_id_kontrak_sewa_retur_seq OWNED BY kontrak_sewa_retur.id_kontrak_sewa_retur;


--
-- TOC entry 296 (class 1259 OID 38383)
-- Name: kontrak_sewa_retur_out; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_retur_out (
    id_kontrak_sewa_retur_out bigint NOT NULL,
    id_kontrak_sewa_retur bigint,
    id_pembayaran bigint,
    nominal_retur_out numeric(18,2) DEFAULT 0,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_out character varying(150)
);


--
-- TOC entry 4480 (class 0 OID 0)
-- Dependencies: 296
-- Name: TABLE kontrak_sewa_retur_out; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_retur_out IS 'Histori Retur Out pembayaran pada kontrak sewa';


--
-- TOC entry 297 (class 1259 OID 38388)
-- Name: kontrak_sewa_retur_out_id_kontrak_sewa_retur_out_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_retur_out_id_kontrak_sewa_retur_out_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4481 (class 0 OID 0)
-- Dependencies: 297
-- Name: kontrak_sewa_retur_out_id_kontrak_sewa_retur_out_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_retur_out_id_kontrak_sewa_retur_out_seq OWNED BY kontrak_sewa_retur_out.id_kontrak_sewa_retur_out;


--
-- TOC entry 298 (class 1259 OID 38390)
-- Name: kontrak_sewa_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_unit (
    id_kontrak_sewa_unit bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_unit integer,
    tarif numeric(18,2),
    tipe_periode character varying(1),
    n_periode smallint,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    hunian_keluarga boolean DEFAULT false
);


--
-- TOC entry 4482 (class 0 OID 0)
-- Dependencies: 298
-- Name: TABLE kontrak_sewa_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_unit IS 'Unit-unit yang ada dalam kontrak sewa';


--
-- TOC entry 299 (class 1259 OID 38394)
-- Name: kontrak_sewa_unit_id_kontrak_sewa_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_unit_id_kontrak_sewa_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4483 (class 0 OID 0)
-- Dependencies: 299
-- Name: kontrak_sewa_unit_id_kontrak_sewa_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_unit_id_kontrak_sewa_unit_seq OWNED BY kontrak_sewa_unit.id_kontrak_sewa_unit;


--
-- TOC entry 300 (class 1259 OID 38396)
-- Name: kontrak_sewa_unit_tarif; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE kontrak_sewa_unit_tarif (
    id_kontrak_sewa_unit_tarif bigint NOT NULL,
    id_kontrak_sewa bigint,
    id_adendum bigint,
    id_unit integer,
    tgl_tarif date,
    blth_mulai character varying(8),
    blth_akhir character varying(8),
    tarif numeric(18,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4484 (class 0 OID 0)
-- Dependencies: 300
-- Name: TABLE kontrak_sewa_unit_tarif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE kontrak_sewa_unit_tarif IS 'Data Tarif Kontrak Sewa';


--
-- TOC entry 301 (class 1259 OID 38400)
-- Name: kontrak_sewa_unit_tarif_id_kontrak_sewa_unit_tarif_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE kontrak_sewa_unit_tarif_id_kontrak_sewa_unit_tarif_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4485 (class 0 OID 0)
-- Dependencies: 301
-- Name: kontrak_sewa_unit_tarif_id_kontrak_sewa_unit_tarif_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE kontrak_sewa_unit_tarif_id_kontrak_sewa_unit_tarif_seq OWNED BY kontrak_sewa_unit_tarif.id_kontrak_sewa_unit_tarif;


--
-- TOC entry 302 (class 1259 OID 38402)
-- Name: listrik_meter_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE listrik_meter_log (
    id_listrik_meter_log bigint NOT NULL,
    no_meter_listrik character varying(50),
    id_unit integer,
    tgl_pencatatan date,
    tahun_bulan character varying(8),
    tgl_start_meter date,
    tgl_end_meter date,
    meter_start integer,
    meter_end integer,
    meter_pemakaian integer,
    keterangan character varying(300),
    petugas_pencatat character varying(75),
    use_in_billing boolean DEFAULT false,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    aktif boolean DEFAULT true,
    tgl_na date,
    petugas_na character varying(30),
    pencatatan_terakhir boolean DEFAULT false
);


--
-- TOC entry 4486 (class 0 OID 0)
-- Dependencies: 302
-- Name: TABLE listrik_meter_log; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE listrik_meter_log IS 'Daftar pencatatan meter tiap2 meter listrik';


--
-- TOC entry 303 (class 1259 OID 38411)
-- Name: listrik_meter_log_id_listrik_meter_log_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE listrik_meter_log_id_listrik_meter_log_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4487 (class 0 OID 0)
-- Dependencies: 303
-- Name: listrik_meter_log_id_listrik_meter_log_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE listrik_meter_log_id_listrik_meter_log_seq OWNED BY listrik_meter_log.id_listrik_meter_log;


--
-- TOC entry 304 (class 1259 OID 38413)
-- Name: master_kapnonkap; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE master_kapnonkap (
    id_kapnonkap integer NOT NULL,
    tgl_efektif date,
    nilai double precision,
    status_aktif character varying(2) DEFAULT 'T'::character varying,
    tgl_rekam date,
    petugas_rekam character varying(10),
    tgl_ubah date,
    petugas_ubah character varying(10)
);


--
-- TOC entry 305 (class 1259 OID 38417)
-- Name: master_kapnonkap_id_kapnonkap_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE master_kapnonkap_id_kapnonkap_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4488 (class 0 OID 0)
-- Dependencies: 305
-- Name: master_kapnonkap_id_kapnonkap_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE master_kapnonkap_id_kapnonkap_seq OWNED BY master_kapnonkap.id_kapnonkap;


--
-- TOC entry 306 (class 1259 OID 38419)
-- Name: master_penyusutan_komersil; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE master_penyusutan_komersil (
    id_master_penyusutan integer NOT NULL,
    kode_aset character varying(10),
    kode_sub_kelompok character varying(10),
    tgl_efektif date,
    masa_manfaat integer,
    persentase double precision,
    residu double precision,
    petugas_rekam character varying(10),
    tgl_rekam date,
    petugas_ubah character varying(10),
    tgl_ubah date
);


--
-- TOC entry 307 (class 1259 OID 38422)
-- Name: master_penyusutan_komersil_id_master_penyusutan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE master_penyusutan_komersil_id_master_penyusutan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4489 (class 0 OID 0)
-- Dependencies: 307
-- Name: master_penyusutan_komersil_id_master_penyusutan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE master_penyusutan_komersil_id_master_penyusutan_seq OWNED BY master_penyusutan_komersil.id_master_penyusutan;


--
-- TOC entry 308 (class 1259 OID 38424)
-- Name: master_sekuens_tahun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE master_sekuens_tahun (
    id_sekuen bigint NOT NULL,
    kode_sekuen character varying(5),
    tahun character varying(4),
    kode_kantor character varying(5),
    nilai_akhir integer,
    aktif character varying(1) DEFAULT 'Y'::character varying,
    keterangan character varying(300)
);


--
-- TOC entry 309 (class 1259 OID 38428)
-- Name: master_sekuens_tahun_id_sekuen_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE master_sekuens_tahun_id_sekuen_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4490 (class 0 OID 0)
-- Dependencies: 309
-- Name: master_sekuens_tahun_id_sekuen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE master_sekuens_tahun_id_sekuen_seq OWNED BY master_sekuens_tahun.id_sekuen;


--
-- TOC entry 310 (class 1259 OID 38430)
-- Name: mtnc_wo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mtnc_wo (
    no_wo character varying(50) NOT NULL,
    no_wo_induk character varying(50),
    kode_rusun character varying(5),
    tgl_request timestamp without time zone,
    nama_requester character varying(75),
    jenis_lokasi character varying(2),
    id_unit integer,
    lokasi character varying(100),
    deskripsi_wo character varying(150),
    kode_wo_tipe character varying(3),
    req_completion_date date,
    ref_id character varying(50),
    status character varying(2) DEFAULT 'N'::character varying,
    assigned_to character varying(75),
    assigned_work_start_date date,
    assigned_completion_target_date date,
    assigned_prioritas character varying(1),
    assigned_notes text,
    completion_actual_date date,
    completion_status character varying(3),
    aktif boolean DEFAULT true,
    tgl_na date,
    alasan_na character varying(300),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    title_wo character varying(100),
    completion_notes text,
    assigned boolean DEFAULT false,
    petugas_na character varying(30),
    id_lantai integer,
    assigned_petugas character varying(30),
    id_rusun_blok integer
);


--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 310
-- Name: TABLE mtnc_wo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE mtnc_wo IS 'Maintenance work order';


--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 310
-- Name: COLUMN mtnc_wo.no_wo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN mtnc_wo.no_wo IS 'WO-{jenis_lokasi}-{kode_wo_tipe}-{tahunbulan}-{xxxx}';


--
-- TOC entry 4493 (class 0 OID 0)
-- Dependencies: 310
-- Name: COLUMN mtnc_wo.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN mtnc_wo.status IS 'O: Open, A: Assigned, C: Close';


--
-- TOC entry 4494 (class 0 OID 0)
-- Dependencies: 310
-- Name: COLUMN mtnc_wo.completion_status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN mtnc_wo.completion_status IS 'U: Unresolved, R: Resolved, D: Declined';


--
-- TOC entry 311 (class 1259 OID 38439)
-- Name: mtnc_wo_lampiran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mtnc_wo_lampiran (
    id_wo_lampiran bigint NOT NULL,
    no_wo character varying(50),
    nama_dokumen character varying(100),
    path_dokumen character varying(500),
    aktif boolean DEFAULT true,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30)
);


--
-- TOC entry 312 (class 1259 OID 38446)
-- Name: mtnc_wo_lampiran_id_wo_lampiran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mtnc_wo_lampiran_id_wo_lampiran_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4495 (class 0 OID 0)
-- Dependencies: 312
-- Name: mtnc_wo_lampiran_id_wo_lampiran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mtnc_wo_lampiran_id_wo_lampiran_seq OWNED BY mtnc_wo_lampiran.id_wo_lampiran;


--
-- TOC entry 313 (class 1259 OID 38448)
-- Name: pajak_tarif_sewa_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pajak_tarif_sewa_unit (
    id_pajak integer NOT NULL,
    kode_rusun character varying(5),
    prosen_pajak numeric(7,2) DEFAULT 10,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    tgl_mulai_berlaku date
);


--
-- TOC entry 4496 (class 0 OID 0)
-- Dependencies: 313
-- Name: TABLE pajak_tarif_sewa_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE pajak_tarif_sewa_unit IS 'Data Setup pajak Tarif Kontrak Sewa';


--
-- TOC entry 314 (class 1259 OID 38453)
-- Name: pajak_tarif_sewa_unit_id_pajak_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pajak_tarif_sewa_unit_id_pajak_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4497 (class 0 OID 0)
-- Dependencies: 314
-- Name: pajak_tarif_sewa_unit_id_pajak_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pajak_tarif_sewa_unit_id_pajak_seq OWNED BY pajak_tarif_sewa_unit.id_pajak;


--
-- TOC entry 315 (class 1259 OID 38455)
-- Name: pembayaran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pembayaran (
    id_pembayaran bigint NOT NULL,
    id_kontrak_sewa bigint,
    media_pembayaran character varying(3),
    tgl_pembayaran date,
    bank_asal_name character varying(75),
    bank_asal_rek character varying(50),
    bank_asal_transfer_id character varying(50),
    bank_tujuan_name character varying(75),
    bank_tujuan_rek character varying(50),
    nama_pembayar character varying(75),
    nominal_tagihan numeric(18,2),
    nominal_deposit numeric(18,2),
    nominal_pembayaran numeric(18,2),
    nominal_retur numeric(18,2),
    nominal_retur_isdeposit boolean DEFAULT false,
    nominal_kurang_bayar numeric(18,2),
    keterangan character varying(300),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    alasan_na character varying(100),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    pajak_dibayar_penyewa boolean DEFAULT false,
    pajak_nominal_dibayar_penyewa numeric(18,2) DEFAULT 0
);


--
-- TOC entry 4498 (class 0 OID 0)
-- Dependencies: 315
-- Name: TABLE pembayaran; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE pembayaran IS 'Pembayara terhadap 1invoice atau lebih.';


--
-- TOC entry 316 (class 1259 OID 38465)
-- Name: pembayaran_id_pembayaran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pembayaran_id_pembayaran_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4499 (class 0 OID 0)
-- Dependencies: 316
-- Name: pembayaran_id_pembayaran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pembayaran_id_pembayaran_seq OWNED BY pembayaran.id_pembayaran;


--
-- TOC entry 317 (class 1259 OID 38467)
-- Name: pembayaran_invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pembayaran_invoices (
    id_pembayaran_invoices bigint NOT NULL,
    id_pembayaran bigint,
    no_invoice character varying(50),
    nominal_tagihan numeric(18,2),
    nominal_pembayaran numeric(18,2),
    nominal_sisa numeric(18,2),
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    pajak_dibayar_penyewa boolean DEFAULT false,
    pajak_nominal_dibayar_penyewa numeric(18,2) DEFAULT 0
);


--
-- TOC entry 4500 (class 0 OID 0)
-- Dependencies: 317
-- Name: TABLE pembayaran_invoices; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE pembayaran_invoices IS 'Invoice yang di bayar.';


--
-- TOC entry 318 (class 1259 OID 38473)
-- Name: pembayaran_invoices_id_pembayaran_invoices_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pembayaran_invoices_id_pembayaran_invoices_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4501 (class 0 OID 0)
-- Dependencies: 318
-- Name: pembayaran_invoices_id_pembayaran_invoices_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pembayaran_invoices_id_pembayaran_invoices_seq OWNED BY pembayaran_invoices.id_pembayaran_invoices;


--
-- TOC entry 319 (class 1259 OID 38475)
-- Name: pembayaran_rekening; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pembayaran_rekening (
    id_pembayaran_rekening integer NOT NULL,
    kode_kantor character varying(5),
    no_rekening character varying(50),
    nama_bank character varying(150),
    atas_nama_rekening character varying(150),
    cabang_bank character varying(150),
    keterangan character varying(150),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4502 (class 0 OID 0)
-- Dependencies: 319
-- Name: TABLE pembayaran_rekening; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE pembayaran_rekening IS 'Data Tarif Kontrak Sewa';


--
-- TOC entry 320 (class 1259 OID 38482)
-- Name: pembayaran_rekening_id_pembayaran_rekening_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pembayaran_rekening_id_pembayaran_rekening_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4503 (class 0 OID 0)
-- Dependencies: 320
-- Name: pembayaran_rekening_id_pembayaran_rekening_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pembayaran_rekening_id_pembayaran_rekening_seq OWNED BY pembayaran_rekening.id_pembayaran_rekening;


--
-- TOC entry 321 (class 1259 OID 38484)
-- Name: pengguna; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pengguna (
    kode_pengguna character varying(30) NOT NULL,
    nama_pengguna character varying(100),
    kode_kantor character varying(5),
    departemen character varying(100),
    nama_atasan character varying(100),
    email character varying(300),
    password_pengguna character varying(60),
    last_login timestamp without time zone,
    last_change_pass timestamp without time zone,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    locked boolean DEFAULT false,
    tgl_locked timestamp without time zone,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    kode_rusun character varying(5)
);


--
-- TOC entry 322 (class 1259 OID 38492)
-- Name: pengguna_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pengguna_role (
    kode_role character varying(5) NOT NULL,
    kode_pengguna character varying(30) NOT NULL,
    jenis_kantor character varying(1),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 323 (class 1259 OID 38496)
-- Name: pengguna_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pengguna_settings (
    id_pengguna_settings integer NOT NULL,
    password_min_length smallint DEFAULT 8,
    password_must_contain_capital boolean DEFAULT true,
    password_must_contain_number boolean DEFAULT true,
    password_must_contain_symbol boolean DEFAULT false,
    login_period_bfr_locked smallint DEFAULT 30,
    login_period_bfr_disabled smallint DEFAULT 90,
    password_period_change smallint DEFAULT 30,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4504 (class 0 OID 0)
-- Dependencies: 323
-- Name: TABLE pengguna_settings; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE pengguna_settings IS 'Data Setting pengguna';


--
-- TOC entry 324 (class 1259 OID 38507)
-- Name: pengguna_settings_id_pengguna_settings_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pengguna_settings_id_pengguna_settings_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4505 (class 0 OID 0)
-- Dependencies: 324
-- Name: pengguna_settings_id_pengguna_settings_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pengguna_settings_id_pengguna_settings_seq OWNED BY pengguna_settings.id_pengguna_settings;


--
-- TOC entry 325 (class 1259 OID 38509)
-- Name: profil_penghuni; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE profil_penghuni (
    id_profil_penghuni bigint NOT NULL,
    kpj character varying(50),
    nama_lengkap character varying(100),
    tempat_lahir character varying(75),
    tgl_lahir date,
    jenis_kelamin character varying(1),
    nik character varying(50),
    nik_jenis character varying(10),
    nik_alamat character varying(150),
    anak_ke smallint,
    jmlh_saudara smallint,
    hoby character varying(50),
    gaji_perbulan numeric(18,2),
    kode_agama character varying(10),
    suku_provinsi character varying(50),
    kode_jenis_kendaraan character varying(3),
    no_kendaraan character varying(20),
    pekerjaan_nama_prs character varying(75),
    pekerjaan_alamat_prs character varying(150),
    pekerjaan_telp character varying(50),
    pekerjaan_fax character varying(50),
    pekerjaan_status character varying(3),
    pekerjaan_masakerja_th smallint,
    pekerjaan_masakerja_bln smallint,
    pekerjaan_atasan_langsung character varying(100),
    keluarga_ayah character varying(100),
    keluarga_ayah_status character varying(1),
    keluarga_ibu character varying(100),
    keluarga_ibu_status character varying(1),
    keluarga_alamat character varying(150),
    keluarga_telp character varying(50),
    darurat_nama character varying(100),
    darurat_hubungan character varying(50),
    darurat_alamat character varying(150),
    darurat_telp character varying(50),
    kode_status_nikah character varying(2),
    profil_terakhir boolean DEFAULT true,
    id_profil_penghuni_ref bigint,
    kode_segmen character varying(5),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4506 (class 0 OID 0)
-- Dependencies: 325
-- Name: TABLE profil_penghuni; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE profil_penghuni IS 'Profil penghuni  rusunawa';


--
-- TOC entry 326 (class 1259 OID 38517)
-- Name: profil_penghuni_id_profil_penghuni_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE profil_penghuni_id_profil_penghuni_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4507 (class 0 OID 0)
-- Dependencies: 326
-- Name: profil_penghuni_id_profil_penghuni_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE profil_penghuni_id_profil_penghuni_seq OWNED BY profil_penghuni.id_profil_penghuni;


--
-- TOC entry 327 (class 1259 OID 38519)
-- Name: profil_penghuni_lampiran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE profil_penghuni_lampiran (
    id_profil_penghuni_lampiran bigint NOT NULL,
    kpj character varying(50),
    kode_dokumen character varying(100),
    path_dokumen character varying(500),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    nik character varying(50),
    aktif boolean DEFAULT true
);


--
-- TOC entry 328 (class 1259 OID 38526)
-- Name: profil_penghuni_lampiran_id_profil_penghuni_lampiran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE profil_penghuni_lampiran_id_profil_penghuni_lampiran_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4508 (class 0 OID 0)
-- Dependencies: 328
-- Name: profil_penghuni_lampiran_id_profil_penghuni_lampiran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE profil_penghuni_lampiran_id_profil_penghuni_lampiran_seq OWNED BY profil_penghuni_lampiran.id_profil_penghuni_lampiran;


--
-- TOC entry 329 (class 1259 OID 38528)
-- Name: registrasi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE registrasi (
    no_registrasi character varying(50) NOT NULL,
    jenis_registrasi character varying(1),
    kode_segmen character varying(5),
    kpj character varying(50),
    kode_jenis_kelamin character varying(1),
    kpj_nama character varying(100),
    kpj_telp character varying(50),
    kpj_email character varying(255),
    kpj_alamat character varying(100),
    nik character varying(50),
    npp character varying(50),
    perusahaan_nama character varying(100),
    perusahaan_departemen character varying(100),
    perusahaan_alamat character varying(200),
    perusahaan_telp character varying(50),
    perusahaan_pic character varying(100),
    perusahaan_email character varying(255),
    perusahaan_pic_telp character varying(50),
    perusahaan_pic_email character varying(255),
    perusahaan_pic_nik character varying(50),
    perusahaan_pic_jabatan character varying(50),
    hunian_keluarga boolean DEFAULT false,
    kode_rusun character varying(5),
    kode_unit_jenis character varying(5),
    kode_blok character varying(5),
    jml_unit smallint DEFAULT 1,
    tgl_request_menghuni date,
    jangka_waktu_bln smallint,
    available_step smallint DEFAULT 1,
    waiting_list boolean DEFAULT false,
    waiting_list_no integer,
    waiting_list_keterangan character varying(200),
    waiting_list_proses boolean DEFAULT false,
    waiting_list_proses_tgl date,
    profil_ref_id bigint,
    status character varying(1) DEFAULT 'D'::character varying,
    aktif boolean DEFAULT true,
    alasan_na character varying(100),
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4509 (class 0 OID 0)
-- Dependencies: 329
-- Name: TABLE registrasi; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE registrasi IS 'Registrasi';


--
-- TOC entry 4510 (class 0 OID 0)
-- Dependencies: 329
-- Name: COLUMN registrasi.no_registrasi; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi.no_registrasi IS 'REG-{kode_kantor}-{kode_unit_jenis}-{kode_rusun}-{bln romawi}-{tahun}-{max(reg)+1';


--
-- TOC entry 4511 (class 0 OID 0)
-- Dependencies: 329
-- Name: COLUMN registrasi.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi.status IS 'D: Draft, S: Submit, K: Kontrak, C: Cancel Registrasi, F: Kontrak Failed, A: Kontrak Aktif';


--
-- TOC entry 4512 (class 0 OID 0)
-- Dependencies: 329
-- Name: COLUMN registrasi.aktif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi.aktif IS 'Jadi false jika status C';


--
-- TOC entry 330 (class 1259 OID 38541)
-- Name: registrasi_lampiran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE registrasi_lampiran (
    id_registrasi_lampiran bigint NOT NULL,
    no_registrasi character varying(50),
    kode_dokumen character varying(5),
    path_dokumen character varying(500),
    aktif boolean DEFAULT true,
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30)
);


--
-- TOC entry 331 (class 1259 OID 38548)
-- Name: registrasi_lampiran_id_registrasi_lampiran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE registrasi_lampiran_id_registrasi_lampiran_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4513 (class 0 OID 0)
-- Dependencies: 331
-- Name: registrasi_lampiran_id_registrasi_lampiran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE registrasi_lampiran_id_registrasi_lampiran_seq OWNED BY registrasi_lampiran.id_registrasi_lampiran;


--
-- TOC entry 332 (class 1259 OID 38550)
-- Name: registrasi_penghuni; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE registrasi_penghuni (
    id_registrasi_penghuni bigint NOT NULL,
    no_registrasi character varying(50),
    penanggung_jawab boolean DEFAULT false,
    kpj character varying(50),
    kpj_nama character varying(100),
    nik character varying(50),
    nik_jenis character varying(10),
    jenis_kelamin character varying(1),
    id_profil_penghuni bigint,
    id_unit integer,
    tgl_in date,
    tgl_out date,
    tipe_out character varying(2),
    aktif_menghuni boolean DEFAULT false,
    is_penyewa boolean DEFAULT false,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_kontrak_sewa bigint
);


--
-- TOC entry 4514 (class 0 OID 0)
-- Dependencies: 332
-- Name: TABLE registrasi_penghuni; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE registrasi_penghuni IS 'Registrasi penghuni';


--
-- TOC entry 4515 (class 0 OID 0)
-- Dependencies: 332
-- Name: COLUMN registrasi_penghuni.no_registrasi; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi_penghuni.no_registrasi IS 'null jika ada penambahan di tengah, bukan dari awal kontrak';


--
-- TOC entry 4516 (class 0 OID 0)
-- Dependencies: 332
-- Name: COLUMN registrasi_penghuni.nik; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi_penghuni.nik IS 'Optional jika hunian keluarga';


--
-- TOC entry 4517 (class 0 OID 0)
-- Dependencies: 332
-- Name: COLUMN registrasi_penghuni.aktif_menghuni; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi_penghuni.aktif_menghuni IS 'TRUE jika sudah menjadi aktif menghuni dan atau pernah menghuni ';


--
-- TOC entry 333 (class 1259 OID 38557)
-- Name: registrasi_penghuni_id_registrasi_penghuni_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE registrasi_penghuni_id_registrasi_penghuni_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4518 (class 0 OID 0)
-- Dependencies: 333
-- Name: registrasi_penghuni_id_registrasi_penghuni_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE registrasi_penghuni_id_registrasi_penghuni_seq OWNED BY registrasi_penghuni.id_registrasi_penghuni;


--
-- TOC entry 334 (class 1259 OID 38559)
-- Name: registrasi_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE registrasi_unit (
    id_registrasi_unit bigint NOT NULL,
    no_registrasi character varying(50),
    id_unit integer,
    process boolean DEFAULT true,
    waiting_list boolean DEFAULT false,
    waiting_no smallint DEFAULT 0,
    hunian_keluarga boolean DEFAULT false,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4519 (class 0 OID 0)
-- Dependencies: 334
-- Name: TABLE registrasi_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE registrasi_unit IS 'Registrasi unit ';


--
-- TOC entry 4520 (class 0 OID 0)
-- Dependencies: 334
-- Name: COLUMN registrasi_unit.aktif; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN registrasi_unit.aktif IS 'Jadi false jika (status registrasi=C atau aktif registrasi=false untuk unit tersebut) atau (ada kontrak aktif untuk unit tersebut)';


--
-- TOC entry 335 (class 1259 OID 38567)
-- Name: registrasi_unit_id_registrasi_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE registrasi_unit_id_registrasi_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4521 (class 0 OID 0)
-- Dependencies: 335
-- Name: registrasi_unit_id_registrasi_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE registrasi_unit_id_registrasi_unit_seq OWNED BY registrasi_unit.id_registrasi_unit;


--
-- TOC entry 336 (class 1259 OID 38569)
-- Name: rusun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE rusun (
    kode_rusun character varying(5) NOT NULL,
    kode_kantor character varying(5),
    nama_rusun character varying(100) NOT NULL,
    lokasi character varying(255),
    provinsi character varying(100),
    kecamatan character varying(100),
    google_latitude character varying(75),
    google_longitude character varying(75),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    fax character varying(100),
    telpon character varying(100),
    initial_nama_rusun character varying(5),
    initial_nama_daerah character varying(5)
);


--
-- TOC entry 337 (class 1259 OID 38576)
-- Name: rusun_blok; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE rusun_blok (
    id_rusun_blok integer NOT NULL,
    kode_rusun character varying(5),
    kode_blok character varying(5),
    nama_blok character varying(100),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 4522 (class 0 OID 0)
-- Dependencies: 337
-- Name: TABLE rusun_blok; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE rusun_blok IS 'Data Blok Rusun';


--
-- TOC entry 338 (class 1259 OID 38580)
-- Name: rusun_blok_id_rusun_blok_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE rusun_blok_id_rusun_blok_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4523 (class 0 OID 0)
-- Dependencies: 338
-- Name: rusun_blok_id_rusun_blok_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rusun_blok_id_rusun_blok_seq OWNED BY rusun_blok.id_rusun_blok;


--
-- TOC entry 339 (class 1259 OID 38582)
-- Name: rusun_lantai; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE rusun_lantai (
    id_lantai integer NOT NULL,
    kode_rusun character varying(5),
    no_lantai smallint,
    nama_lantai character varying(50),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    id_rusun_blok integer
);


--
-- TOC entry 4524 (class 0 OID 0)
-- Dependencies: 339
-- Name: TABLE rusun_lantai; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE rusun_lantai IS 'Lantai yang ada dalam gedung rusunawa';


--
-- TOC entry 340 (class 1259 OID 38586)
-- Name: rusun_lantai_id_lantai_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE rusun_lantai_id_lantai_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4525 (class 0 OID 0)
-- Dependencies: 340
-- Name: rusun_lantai_id_lantai_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rusun_lantai_id_lantai_seq OWNED BY rusun_lantai.id_lantai;


--
-- TOC entry 341 (class 1259 OID 38588)
-- Name: rusun_mgr_setting_db; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE rusun_mgr_setting_db (
    kode_rusun character varying(5) NOT NULL,
    submit_kontrak_pihak1_nama_lengkap character varying(75),
    submit_kontrak_pihak1_jabatan character varying(75),
    submit_kontrak_pihak1_ttd_title character varying(75),
    submit_kontrak_pihak1_ttd_nama character varying(75),
    submit_kontrak_pihak1_ttd_jabatan character varying(75),
    invoice_say character varying(300),
    invoice_note character varying(300),
    invoice_note_payment_method character varying(300),
    invoice_ttd_nama character varying(75),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    invoice_ttd_jabatan character varying(100)
);


--
-- TOC entry 4526 (class 0 OID 0)
-- Dependencies: 341
-- Name: TABLE rusun_mgr_setting_db; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE rusun_mgr_setting_db IS 'Lookup untuk setting default manager rusun';


--
-- TOC entry 342 (class 1259 OID 38594)
-- Name: rusun_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE rusun_unit (
    id_unit integer NOT NULL,
    id_lantai integer,
    kode_unit_jenis character varying(5),
    no_unit smallint DEFAULT 1,
    nama_unit character varying(50),
    kode_golongan_listrik character varying(10),
    is_rented boolean DEFAULT true,
    is_filled boolean DEFAULT false,
    is_processed boolean DEFAULT false,
    is_maintenance boolean DEFAULT false,
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30)
);


--
-- TOC entry 343 (class 1259 OID 38603)
-- Name: rusun_unit_id_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE rusun_unit_id_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4527 (class 0 OID 0)
-- Dependencies: 343
-- Name: rusun_unit_id_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rusun_unit_id_unit_seq OWNED BY rusun_unit.id_unit;


--
-- TOC entry 344 (class 1259 OID 38605)
-- Name: tarif_air; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tarif_air (
    id_tarif_air integer NOT NULL,
    kode_rusun character varying(5),
    tgl_mulai date,
    tgl_berakhir date,
    rate_per_m3 numeric(10,2),
    wmm numeric(10,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_na character varying(100)
);


--
-- TOC entry 4528 (class 0 OID 0)
-- Dependencies: 344
-- Name: TABLE tarif_air; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tarif_air IS 'Tarif air';


--
-- TOC entry 345 (class 1259 OID 38609)
-- Name: tarif_air_id_tarif_air_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tarif_air_id_tarif_air_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4529 (class 0 OID 0)
-- Dependencies: 345
-- Name: tarif_air_id_tarif_air_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tarif_air_id_tarif_air_seq OWNED BY tarif_air.id_tarif_air;


--
-- TOC entry 346 (class 1259 OID 38611)
-- Name: tarif_fasilitas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tarif_fasilitas (
    id_tarif_fasilitas integer NOT NULL,
    kode_rusun character varying(5),
    kode_fasilitas character varying(5),
    tgl_mulai date,
    tgl_berakhir date,
    tarif numeric(18,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_na character varying(100)
);


--
-- TOC entry 4530 (class 0 OID 0)
-- Dependencies: 346
-- Name: TABLE tarif_fasilitas; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tarif_fasilitas IS 'Daftar tarif_fasilitas';


--
-- TOC entry 347 (class 1259 OID 38615)
-- Name: tarif_fasilitas_id_tarif_fasilitas_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tarif_fasilitas_id_tarif_fasilitas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4531 (class 0 OID 0)
-- Dependencies: 347
-- Name: tarif_fasilitas_id_tarif_fasilitas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tarif_fasilitas_id_tarif_fasilitas_seq OWNED BY tarif_fasilitas.id_tarif_fasilitas;


--
-- TOC entry 348 (class 1259 OID 38617)
-- Name: tarif_lantai; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tarif_lantai (
    id_tarif_lantai integer NOT NULL,
    id_lantai integer,
    kode_unit_jenis character varying(10),
    tgl_mulai date,
    tgl_berakhir date,
    tarif numeric(18,2),
    tipe_periode character varying(1) DEFAULT 'B'::character varying,
    n_periode smallint DEFAULT 1,
    status character varying(1) DEFAULT 'S'::character varying,
    approved_tgl timestamp without time zone,
    approved_petugas character varying(30),
    approved_ket character varying(250),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_na character varying(150),
    approval boolean DEFAULT false,
    id_tarif_lantai_edited integer
);


--
-- TOC entry 4532 (class 0 OID 0)
-- Dependencies: 348
-- Name: TABLE tarif_lantai; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tarif_lantai IS 'Tarif Jenis Unit Per Lantai';


--
-- TOC entry 4533 (class 0 OID 0)
-- Dependencies: 348
-- Name: COLUMN tarif_lantai.tipe_periode; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_lantai.tipe_periode IS 'B	D: Harian, B: Bulanan, T: Tahunan';


--
-- TOC entry 4534 (class 0 OID 0)
-- Dependencies: 348
-- Name: COLUMN tarif_lantai.n_periode; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_lantai.n_periode IS 'jml periode tarif base on tipe_periode';


--
-- TOC entry 4535 (class 0 OID 0)
-- Dependencies: 348
-- Name: COLUMN tarif_lantai.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_lantai.status IS 'S: Submitted, A: Approved, R: Reject';


--
-- TOC entry 349 (class 1259 OID 38628)
-- Name: tarif_lantai_id_tarif_lantai_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tarif_lantai_id_tarif_lantai_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4536 (class 0 OID 0)
-- Dependencies: 349
-- Name: tarif_lantai_id_tarif_lantai_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tarif_lantai_id_tarif_lantai_seq OWNED BY tarif_lantai.id_tarif_lantai;


--
-- TOC entry 350 (class 1259 OID 38630)
-- Name: tarif_listrik; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tarif_listrik (
    id_tarif_listrik integer NOT NULL,
    kode_rusun character varying(5),
    kode_golongan_listrik character varying(10),
    tgl_mulai date,
    tgl_berakhir date,
    rate_per_kwh numeric(10,2),
    faktor_pengali numeric(10,2),
    demand_charges numeric(10,2),
    pju_prosen numeric(10,2),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_na character varying(100)
);


--
-- TOC entry 4537 (class 0 OID 0)
-- Dependencies: 350
-- Name: TABLE tarif_listrik; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tarif_listrik IS 'Tarif Listrik';


--
-- TOC entry 4538 (class 0 OID 0)
-- Dependencies: 350
-- Name: COLUMN tarif_listrik.kode_golongan_listrik; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_listrik.kode_golongan_listrik IS 'Golongan listrik';


--
-- TOC entry 351 (class 1259 OID 38634)
-- Name: tarif_listrik_id_tarif_listrik_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tarif_listrik_id_tarif_listrik_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4539 (class 0 OID 0)
-- Dependencies: 351
-- Name: tarif_listrik_id_tarif_listrik_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tarif_listrik_id_tarif_listrik_seq OWNED BY tarif_listrik.id_tarif_listrik;


--
-- TOC entry 352 (class 1259 OID 38636)
-- Name: tarif_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tarif_unit (
    id_tarif_unit integer NOT NULL,
    id_unit integer,
    tgl_mulai date,
    tgl_berakhir date,
    tarif numeric(18,2),
    tipe_periode character varying(1) DEFAULT 'B'::character varying,
    n_periode smallint DEFAULT 1,
    status character varying(1) DEFAULT 'S'::character varying,
    approved_tgl timestamp without time zone,
    approved_petugas character varying(30),
    approved_ket character varying(250),
    aktif boolean DEFAULT true,
    tgl_na timestamp without time zone,
    petugas_na character varying(30),
    tgl_rekam timestamp without time zone,
    petugas_rekam character varying(30),
    tgl_ubah timestamp without time zone,
    petugas_ubah character varying(30),
    alasan_na character varying(100),
    approval boolean DEFAULT false,
    id_tarif_unit_edited integer
);


--
-- TOC entry 4540 (class 0 OID 0)
-- Dependencies: 352
-- Name: TABLE tarif_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tarif_unit IS 'Tarif khusus unit jika tidak mengikuti tarif unit_jenis per lantai';


--
-- TOC entry 4541 (class 0 OID 0)
-- Dependencies: 352
-- Name: COLUMN tarif_unit.tipe_periode; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_unit.tipe_periode IS 'B	D: Harian, B: Bulanan, T: Tahunan';


--
-- TOC entry 4542 (class 0 OID 0)
-- Dependencies: 352
-- Name: COLUMN tarif_unit.n_periode; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tarif_unit.n_periode IS 'jml periode tarif base on tipe_periode';


--
-- TOC entry 353 (class 1259 OID 38647)
-- Name: tarif_unit_id_tarif_unit_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tarif_unit_id_tarif_unit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4543 (class 0 OID 0)
-- Dependencies: 353
-- Name: tarif_unit_id_tarif_unit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tarif_unit_id_tarif_unit_seq OWNED BY tarif_unit.id_tarif_unit;


--
-- TOC entry 354 (class 1259 OID 38649)
-- Name: tmp_migrasi_fasilitas_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_fasilitas_unit (
    blok character varying(4),
    lantai character varying,
    unit character varying,
    kode_fasilitas character varying(5),
    id_unit integer
);


--
-- TOC entry 355 (class 1259 OID 38655)
-- Name: tmp_migrasi_kontrak_individu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_kontrak_individu (
    no_perjanjian character varying(50),
    tgl_kontrak date,
    blok character varying(4),
    lantai character varying,
    unit character varying,
    tgl_menghuni date,
    jangka_waktu smallint,
    hunian_keluarga boolean,
    kpj character varying(30),
    no_identitas character varying(50),
    jenis_identitas character varying(3),
    jenis_kelamin character varying(1),
    nama character varying(33),
    nama_prs character varying(30),
    pihak1_nama character varying(10),
    pihak1_jabatan character varying(15),
    telp character varying(15),
    id_unit integer
);


--
-- TOC entry 356 (class 1259 OID 38661)
-- Name: tmp_migrasi_kontrak_perusahaan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_kontrak_perusahaan (
    no_perjanjian character varying(35),
    tgl_kontrak date,
    jumlah_unit smallint,
    tgl_menghuni date,
    jangka_waktu smallint,
    kpj character varying(12),
    nik character varying(30),
    jenis_identitas character varying(3),
    jenis_kelamin character varying(1),
    nama character varying(16),
    telp character varying(30),
    nama_prs character varying(41),
    departemen_prs character varying(18),
    telp_prs character varying(14),
    alamar_prs character varying(124),
    pihak1_nama character varying(10),
    pihak1_jabatan character varying(15),
    npp character varying(1),
    pic character varying(1)
);


--
-- TOC entry 357 (class 1259 OID 38664)
-- Name: tmp_migrasi_kontrak_perusahaan_unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_kontrak_perusahaan_unit (
    no_perjanjian character varying(35),
    blok character varying(4),
    lantai character varying,
    unit character varying,
    id_unit integer
);


--
-- TOC entry 358 (class 1259 OID 38670)
-- Name: tmp_migrasi_listrik_air; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_listrik_air (
    blok character varying(4),
    lantai integer,
    unit integer,
    petugas_pencatat character varying(7),
    tgl_awal date,
    tgl_akhir date,
    listrik_awal integer,
    listrik_akhir integer,
    listrik_pemakaian integer,
    air_awal integer,
    air_akhir integer,
    air_pemakaian integer,
    id_unit integer
);


--
-- TOC entry 359 (class 1259 OID 38673)
-- Name: tmp_migrasi_penghuni; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tmp_migrasi_penghuni (
    no_perjanjian character varying(35),
    blok character varying(4),
    lantai integer,
    unit integer,
    tgl_masuk date,
    kpj character varying(50),
    nama_lengkap character varying(50),
    tempat_lahir character varying(50),
    tgl_lahir date,
    no_identitas character varying(50),
    jenis_identitas character varying(3),
    hoby character varying(1),
    kode_agama character varying(2),
    pekerjaan_nama_prs character varying(30),
    status_nikah boolean,
    jenis_kelamin character varying(1),
    id_unit integer
);


--
-- TOC entry 3607 (class 2604 OID 38676)
-- Name: air_meter_log id_air_meter_log; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY air_meter_log ALTER COLUMN id_air_meter_log SET DEFAULT nextval('air_meter_log_id_air_meter_log_seq'::regclass);


--
-- TOC entry 3612 (class 2604 OID 38677)
-- Name: aset_amortisasi_rkp id_amortisasi; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_amortisasi_rkp ALTER COLUMN id_amortisasi SET DEFAULT nextval('aset_amortisasi_rkp_id_amortisasi_seq'::regclass);


--
-- TOC entry 3615 (class 2604 OID 38678)
-- Name: aset_inventarisasi id_inventarisasi; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_inventarisasi ALTER COLUMN id_inventarisasi SET DEFAULT nextval('aset_inventarisasi_id_inventarisasi_seq'::regclass);


--
-- TOC entry 3616 (class 2604 OID 38679)
-- Name: aset_inventarisasi_detil id_inventarisasi_dtl; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_inventarisasi_detil ALTER COLUMN id_inventarisasi_dtl SET DEFAULT nextval('aset_inventarisasi_detil_id_inventarisasi_dtl_seq'::regclass);


--
-- TOC entry 3618 (class 2604 OID 38680)
-- Name: aset_kondisi id_aset_kondisi; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_kondisi ALTER COLUMN id_aset_kondisi SET DEFAULT nextval('aset_kondisi_id_aset_kondisi_seq'::regclass);


--
-- TOC entry 3619 (class 2604 OID 38681)
-- Name: aset_lap_format_rekap id_lap_format_rekap; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_lap_format_rekap ALTER COLUMN id_lap_format_rekap SET DEFAULT nextval('aset_lap_format_rekap_id_lap_format_rekap_seq'::regclass);


--
-- TOC entry 3624 (class 2604 OID 38682)
-- Name: aset_penempatan id_aset_penempatan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_penempatan ALTER COLUMN id_aset_penempatan SET DEFAULT nextval('aset_penempatan_id_aset_penempatan_seq'::regclass);


--
-- TOC entry 3629 (class 2604 OID 38683)
-- Name: fasilitas_rusun id_fasilitas_rusun; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY fasilitas_rusun ALTER COLUMN id_fasilitas_rusun SET DEFAULT nextval('fasilitas_rusun_id_fasilitas_rusun_seq'::regclass);


--
-- TOC entry 3638 (class 2604 OID 38684)
-- Name: invoice_denda_setting id_setting_denda; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_denda_setting ALTER COLUMN id_setting_denda SET DEFAULT nextval('invoice_denda_setting_id_setting_denda_seq'::regclass);


--
-- TOC entry 3639 (class 2604 OID 38685)
-- Name: invoice_entries id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3642 (class 2604 OID 38686)
-- Name: invoice_entries_invair id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invair ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_invair_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3646 (class 2604 OID 38687)
-- Name: invoice_entries_invdenda id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdenda ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_invdenda_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3649 (class 2604 OID 38688)
-- Name: invoice_entries_invdpst id_invoice_entries_invdpst; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst ALTER COLUMN id_invoice_entries_invdpst SET DEFAULT nextval('invoice_entries_invdpst_id_invoice_entries_invdpst_seq'::regclass);


--
-- TOC entry 3654 (class 2604 OID 38689)
-- Name: invoice_entries_invdpst_detil id_invoice_entries_invdpst_detil; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_detil ALTER COLUMN id_invoice_entries_invdpst_detil SET DEFAULT nextval('invoice_entries_invdpst_detil_id_invoice_entries_invdpst_de_seq'::regclass);


--
-- TOC entry 3656 (class 2604 OID 38690)
-- Name: invoice_entries_invdpst_out id_invoice_entries_invdpst_out; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_out ALTER COLUMN id_invoice_entries_invdpst_out SET DEFAULT nextval('invoice_entries_invdpst_out_id_invoice_entries_invdpst_out_seq'::regclass);


--
-- TOC entry 3659 (class 2604 OID 38691)
-- Name: invoice_entries_inveq id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_inveq ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_inveq_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3662 (class 2604 OID 38692)
-- Name: invoice_entries_invfas id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invfas ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_invfas_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3665 (class 2604 OID 38693)
-- Name: invoice_entries_invlstrk id_invoice_entries; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invlstrk ALTER COLUMN id_invoice_entries SET DEFAULT nextval('invoice_entries_invlstrk_id_invoice_entries_seq'::regclass);


--
-- TOC entry 3672 (class 2604 OID 38694)
-- Name: invoice_entries_invsewa id_invoice_entries_invsewa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invsewa ALTER COLUMN id_invoice_entries_invsewa SET DEFAULT nextval('invoice_entries_invsewa_id_invoice_entries_invsewa_seq'::regclass);


--
-- TOC entry 3679 (class 2604 OID 38695)
-- Name: kode_aset_penyusutan id_kode_aset_penyusutan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_penyusutan ALTER COLUMN id_kode_aset_penyusutan SET DEFAULT nextval('kode_aset_penyusutan_id_kode_aset_penyusutan_seq'::regclass);


--
-- TOC entry 3681 (class 2604 OID 38696)
-- Name: kode_aset_rusun id_kode_aset_rusun; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_rusun ALTER COLUMN id_kode_aset_rusun SET DEFAULT nextval('kode_aset_rusun_id_kode_aset_rusun_seq'::regclass);


--
-- TOC entry 3683 (class 2604 OID 38697)
-- Name: kode_batas_kap id_batas_kap; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_batas_kap ALTER COLUMN id_batas_kap SET DEFAULT nextval('kode_batas_kap_id_batas_kap_seq'::regclass);


--
-- TOC entry 3723 (class 2604 OID 38698)
-- Name: kontrak_lampiran id_kontrak_lampiran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_lampiran ALTER COLUMN id_kontrak_lampiran SET DEFAULT nextval('kontrak_lampiran_id_kontrak_lampiran_seq'::regclass);


--
-- TOC entry 3739 (class 2604 OID 38699)
-- Name: kontrak_sewa id_kontrak_sewa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa ALTER COLUMN id_kontrak_sewa SET DEFAULT nextval('kontrak_sewa_id_kontrak_sewa_seq'::regclass);


--
-- TOC entry 3747 (class 2604 OID 38700)
-- Name: kontrak_sewa_adendum id_adendum; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_adendum ALTER COLUMN id_adendum SET DEFAULT nextval('kontrak_sewa_adendum_id_adendum_seq'::regclass);


--
-- TOC entry 3753 (class 2604 OID 38701)
-- Name: kontrak_sewa_berhenti id_berhenti; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_berhenti ALTER COLUMN id_berhenti SET DEFAULT nextval('kontrak_sewa_berhenti_id_berhenti_seq'::regclass);


--
-- TOC entry 3755 (class 2604 OID 38702)
-- Name: kontrak_sewa_fasilitas_tarif id_kontrak_sewa_fasilitas_tarif; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_tarif ALTER COLUMN id_kontrak_sewa_fasilitas_tarif SET DEFAULT nextval('kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fasilitas_tari_seq'::regclass);


--
-- TOC entry 3759 (class 2604 OID 38703)
-- Name: kontrak_sewa_fasilitas_unit id_kontrak_sewa_fasilitas_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_unit ALTER COLUMN id_kontrak_sewa_fasilitas_unit SET DEFAULT nextval('kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fasilitas_unit_seq'::regclass);


--
-- TOC entry 3763 (class 2604 OID 38704)
-- Name: kontrak_sewa_inventaris_items id_inventaris_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_inventaris_items ALTER COLUMN id_inventaris_unit SET DEFAULT nextval('kontrak_sewa_inventaris_items_id_inventaris_unit_seq'::regclass);


--
-- TOC entry 3766 (class 2604 OID 38705)
-- Name: kontrak_sewa_retur id_kontrak_sewa_retur; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur ALTER COLUMN id_kontrak_sewa_retur SET DEFAULT nextval('kontrak_sewa_retur_id_kontrak_sewa_retur_seq'::regclass);


--
-- TOC entry 3769 (class 2604 OID 38706)
-- Name: kontrak_sewa_retur_out id_kontrak_sewa_retur_out; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur_out ALTER COLUMN id_kontrak_sewa_retur_out SET DEFAULT nextval('kontrak_sewa_retur_out_id_kontrak_sewa_retur_out_seq'::regclass);


--
-- TOC entry 3771 (class 2604 OID 38707)
-- Name: kontrak_sewa_unit id_kontrak_sewa_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit ALTER COLUMN id_kontrak_sewa_unit SET DEFAULT nextval('kontrak_sewa_unit_id_kontrak_sewa_unit_seq'::regclass);


--
-- TOC entry 3773 (class 2604 OID 38708)
-- Name: kontrak_sewa_unit_tarif id_kontrak_sewa_unit_tarif; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit_tarif ALTER COLUMN id_kontrak_sewa_unit_tarif SET DEFAULT nextval('kontrak_sewa_unit_tarif_id_kontrak_sewa_unit_tarif_seq'::regclass);


--
-- TOC entry 3777 (class 2604 OID 38709)
-- Name: listrik_meter_log id_listrik_meter_log; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY listrik_meter_log ALTER COLUMN id_listrik_meter_log SET DEFAULT nextval('listrik_meter_log_id_listrik_meter_log_seq'::regclass);


--
-- TOC entry 3779 (class 2604 OID 38710)
-- Name: master_kapnonkap id_kapnonkap; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_kapnonkap ALTER COLUMN id_kapnonkap SET DEFAULT nextval('master_kapnonkap_id_kapnonkap_seq'::regclass);


--
-- TOC entry 3780 (class 2604 OID 38711)
-- Name: master_penyusutan_komersil id_master_penyusutan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_penyusutan_komersil ALTER COLUMN id_master_penyusutan SET DEFAULT nextval('master_penyusutan_komersil_id_master_penyusutan_seq'::regclass);


--
-- TOC entry 3782 (class 2604 OID 38712)
-- Name: master_sekuens_tahun id_sekuen; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_sekuens_tahun ALTER COLUMN id_sekuen SET DEFAULT nextval('master_sekuens_tahun_id_sekuen_seq'::regclass);


--
-- TOC entry 3787 (class 2604 OID 38713)
-- Name: mtnc_wo_lampiran id_wo_lampiran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo_lampiran ALTER COLUMN id_wo_lampiran SET DEFAULT nextval('mtnc_wo_lampiran_id_wo_lampiran_seq'::regclass);


--
-- TOC entry 3790 (class 2604 OID 38714)
-- Name: pajak_tarif_sewa_unit id_pajak; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pajak_tarif_sewa_unit ALTER COLUMN id_pajak SET DEFAULT nextval('pajak_tarif_sewa_unit_id_pajak_seq'::regclass);


--
-- TOC entry 3795 (class 2604 OID 38715)
-- Name: pembayaran id_pembayaran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran ALTER COLUMN id_pembayaran SET DEFAULT nextval('pembayaran_id_pembayaran_seq'::regclass);


--
-- TOC entry 3799 (class 2604 OID 38716)
-- Name: pembayaran_invoices id_pembayaran_invoices; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_invoices ALTER COLUMN id_pembayaran_invoices SET DEFAULT nextval('pembayaran_invoices_id_pembayaran_invoices_seq'::regclass);


--
-- TOC entry 3801 (class 2604 OID 38717)
-- Name: pembayaran_rekening id_pembayaran_rekening; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_rekening ALTER COLUMN id_pembayaran_rekening SET DEFAULT nextval('pembayaran_rekening_id_pembayaran_rekening_seq'::regclass);


--
-- TOC entry 3813 (class 2604 OID 38718)
-- Name: pengguna_settings id_pengguna_settings; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna_settings ALTER COLUMN id_pengguna_settings SET DEFAULT nextval('pengguna_settings_id_pengguna_settings_seq'::regclass);


--
-- TOC entry 3816 (class 2604 OID 38719)
-- Name: profil_penghuni id_profil_penghuni; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni ALTER COLUMN id_profil_penghuni SET DEFAULT nextval('profil_penghuni_id_profil_penghuni_seq'::regclass);


--
-- TOC entry 3818 (class 2604 OID 38720)
-- Name: profil_penghuni_lampiran id_profil_penghuni_lampiran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni_lampiran ALTER COLUMN id_profil_penghuni_lampiran SET DEFAULT nextval('profil_penghuni_lampiran_id_profil_penghuni_lampiran_seq'::regclass);


--
-- TOC entry 3827 (class 2604 OID 38721)
-- Name: registrasi_lampiran id_registrasi_lampiran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_lampiran ALTER COLUMN id_registrasi_lampiran SET DEFAULT nextval('registrasi_lampiran_id_registrasi_lampiran_seq'::regclass);


--
-- TOC entry 3832 (class 2604 OID 38722)
-- Name: registrasi_penghuni id_registrasi_penghuni; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni ALTER COLUMN id_registrasi_penghuni SET DEFAULT nextval('registrasi_penghuni_id_registrasi_penghuni_seq'::regclass);


--
-- TOC entry 3838 (class 2604 OID 38723)
-- Name: registrasi_unit id_registrasi_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_unit ALTER COLUMN id_registrasi_unit SET DEFAULT nextval('registrasi_unit_id_registrasi_unit_seq'::regclass);


--
-- TOC entry 3841 (class 2604 OID 38724)
-- Name: rusun_blok id_rusun_blok; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_blok ALTER COLUMN id_rusun_blok SET DEFAULT nextval('rusun_blok_id_rusun_blok_seq'::regclass);


--
-- TOC entry 3843 (class 2604 OID 38725)
-- Name: rusun_lantai id_lantai; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_lantai ALTER COLUMN id_lantai SET DEFAULT nextval('rusun_lantai_id_lantai_seq'::regclass);


--
-- TOC entry 3850 (class 2604 OID 38726)
-- Name: rusun_unit id_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_unit ALTER COLUMN id_unit SET DEFAULT nextval('rusun_unit_id_unit_seq'::regclass);


--
-- TOC entry 3852 (class 2604 OID 38727)
-- Name: tarif_air id_tarif_air; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_air ALTER COLUMN id_tarif_air SET DEFAULT nextval('tarif_air_id_tarif_air_seq'::regclass);


--
-- TOC entry 3854 (class 2604 OID 38728)
-- Name: tarif_fasilitas id_tarif_fasilitas; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_fasilitas ALTER COLUMN id_tarif_fasilitas SET DEFAULT nextval('tarif_fasilitas_id_tarif_fasilitas_seq'::regclass);


--
-- TOC entry 3860 (class 2604 OID 38729)
-- Name: tarif_lantai id_tarif_lantai; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_lantai ALTER COLUMN id_tarif_lantai SET DEFAULT nextval('tarif_lantai_id_tarif_lantai_seq'::regclass);


--
-- TOC entry 3862 (class 2604 OID 38730)
-- Name: tarif_listrik id_tarif_listrik; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_listrik ALTER COLUMN id_tarif_listrik SET DEFAULT nextval('tarif_listrik_id_tarif_listrik_seq'::regclass);


--
-- TOC entry 3868 (class 2604 OID 38731)
-- Name: tarif_unit id_tarif_unit; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_unit ALTER COLUMN id_tarif_unit SET DEFAULT nextval('tarif_unit_id_tarif_unit_seq'::regclass);


--
-- TOC entry 3871 (class 2606 OID 38743)
-- Name: air_meter_log air_meter_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY air_meter_log
    ADD CONSTRAINT air_meter_log_pkey PRIMARY KEY (id_air_meter_log);


--
-- TOC entry 3876 (class 2606 OID 38745)
-- Name: aset_amortisasi_rkp aset_amortisasi_rkp_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_amortisasi_rkp
    ADD CONSTRAINT aset_amortisasi_rkp_pkey PRIMARY KEY (id_amortisasi);


--
-- TOC entry 3880 (class 2606 OID 38747)
-- Name: aset_inventarisasi_detil aset_inventarisasi_dtl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_inventarisasi_detil
    ADD CONSTRAINT aset_inventarisasi_dtl_pkey PRIMARY KEY (id_inventarisasi_dtl);


--
-- TOC entry 3878 (class 2606 OID 38749)
-- Name: aset_inventarisasi aset_inventarisasi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_inventarisasi
    ADD CONSTRAINT aset_inventarisasi_pkey PRIMARY KEY (id_inventarisasi);


--
-- TOC entry 3882 (class 2606 OID 38751)
-- Name: aset_kondisi aset_kondisi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_kondisi
    ADD CONSTRAINT aset_kondisi_pkey PRIMARY KEY (id_aset_kondisi);


--
-- TOC entry 3884 (class 2606 OID 38753)
-- Name: aset_lap_format_rekap aset_lap_format_rekap_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_lap_format_rekap
    ADD CONSTRAINT aset_lap_format_rekap_pkey PRIMARY KEY (id_lap_format_rekap);


--
-- TOC entry 3886 (class 2606 OID 38755)
-- Name: aset_migrasi aset_migrasi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_migrasi
    ADD CONSTRAINT aset_migrasi_pkey PRIMARY KEY (kode_aset);


--
-- TOC entry 3888 (class 2606 OID 38757)
-- Name: aset_penempatan aset_penempatan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_penempatan
    ADD CONSTRAINT aset_penempatan_pkey PRIMARY KEY (id_aset_penempatan);


--
-- TOC entry 3874 (class 2606 OID 38759)
-- Name: aset aset_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset
    ADD CONSTRAINT aset_pkey PRIMARY KEY (kode_aset);


--
-- TOC entry 3891 (class 2606 OID 38761)
-- Name: fasilitas fasilitas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY fasilitas
    ADD CONSTRAINT fasilitas_pkey PRIMARY KEY (kode_fasilitas);


--
-- TOC entry 3894 (class 2606 OID 38763)
-- Name: fasilitas_rusun fasilitas_rusun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY fasilitas_rusun
    ADD CONSTRAINT fasilitas_rusun_pkey PRIMARY KEY (id_fasilitas_rusun);


--
-- TOC entry 3900 (class 2606 OID 38765)
-- Name: invoice_denda_setting invoice_denda_setting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_denda_setting
    ADD CONSTRAINT invoice_denda_setting_pkey PRIMARY KEY (id_setting_denda);


--
-- TOC entry 3906 (class 2606 OID 38767)
-- Name: invoice_entries_invair invoice_entries_invair_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invair
    ADD CONSTRAINT invoice_entries_invair_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3909 (class 2606 OID 38769)
-- Name: invoice_entries_invdenda invoice_entries_invdenda_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdenda
    ADD CONSTRAINT invoice_entries_invdenda_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3915 (class 2606 OID 38771)
-- Name: invoice_entries_invdpst_detil invoice_entries_invdpst_detil_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_detil
    ADD CONSTRAINT invoice_entries_invdpst_detil_pkey PRIMARY KEY (id_invoice_entries_invdpst_detil);


--
-- TOC entry 3918 (class 2606 OID 38773)
-- Name: invoice_entries_invdpst_out invoice_entries_invdpst_out_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_out
    ADD CONSTRAINT invoice_entries_invdpst_out_pkey PRIMARY KEY (id_invoice_entries_invdpst_out);


--
-- TOC entry 3912 (class 2606 OID 38775)
-- Name: invoice_entries_invdpst invoice_entries_invdpst_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst
    ADD CONSTRAINT invoice_entries_invdpst_pkey PRIMARY KEY (id_invoice_entries_invdpst);


--
-- TOC entry 3921 (class 2606 OID 38777)
-- Name: invoice_entries_inveq invoice_entries_inveq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_inveq
    ADD CONSTRAINT invoice_entries_inveq_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3924 (class 2606 OID 38779)
-- Name: invoice_entries_invfas invoice_entries_invfas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invfas
    ADD CONSTRAINT invoice_entries_invfas_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3927 (class 2606 OID 38781)
-- Name: invoice_entries_invlstrk invoice_entries_invlstrk_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invlstrk
    ADD CONSTRAINT invoice_entries_invlstrk_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3930 (class 2606 OID 38783)
-- Name: invoice_entries_invsewa invoice_entries_invsewa_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invsewa
    ADD CONSTRAINT invoice_entries_invsewa_pkey PRIMARY KEY (id_invoice_entries_invsewa);


--
-- TOC entry 3903 (class 2606 OID 38785)
-- Name: invoice_entries invoice_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries
    ADD CONSTRAINT invoice_entries_pkey PRIMARY KEY (id_invoice_entries);


--
-- TOC entry 3897 (class 2606 OID 38787)
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (no_invoice);


--
-- TOC entry 3933 (class 2606 OID 38789)
-- Name: kode_agama kode_agama_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_agama
    ADD CONSTRAINT kode_agama_pkey PRIMARY KEY (kode_agama);


--
-- TOC entry 3939 (class 2606 OID 38791)
-- Name: kode_aset_kelompok kode_aset_kelompok_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_kelompok
    ADD CONSTRAINT kode_aset_kelompok_pkey PRIMARY KEY (kode_kelompok);


--
-- TOC entry 3941 (class 2606 OID 38793)
-- Name: kode_aset_kondisi kode_aset_kondisi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_kondisi
    ADD CONSTRAINT kode_aset_kondisi_pkey PRIMARY KEY (kode_kondisi);


--
-- TOC entry 3943 (class 2606 OID 38795)
-- Name: kode_aset_penyusutan kode_aset_penyusutan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_penyusutan
    ADD CONSTRAINT kode_aset_penyusutan_pkey PRIMARY KEY (id_kode_aset_penyusutan);


--
-- TOC entry 3946 (class 2606 OID 38797)
-- Name: kode_aset_rusun kode_aset_rusun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_rusun
    ADD CONSTRAINT kode_aset_rusun_pkey PRIMARY KEY (id_kode_aset_rusun);


--
-- TOC entry 3948 (class 2606 OID 38799)
-- Name: kode_aset_subkelompok kode_aset_subkelompok_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_subkelompok
    ADD CONSTRAINT kode_aset_subkelompok_pkey PRIMARY KEY (kode_barang);


--
-- TOC entry 3950 (class 2606 OID 38801)
-- Name: kode_batas_kap kode_batas_kap_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_batas_kap
    ADD CONSTRAINT kode_batas_kap_pkey PRIMARY KEY (id_batas_kap);


--
-- TOC entry 3953 (class 2606 OID 38803)
-- Name: kode_dokumen kode_dokumen_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_dokumen
    ADD CONSTRAINT kode_dokumen_pkey PRIMARY KEY (kode_dokumen);


--
-- TOC entry 3956 (class 2606 OID 38805)
-- Name: kode_fitur kode_fitur_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_fitur
    ADD CONSTRAINT kode_fitur_pkey PRIMARY KEY (kode_fitur);


--
-- TOC entry 3959 (class 2606 OID 38807)
-- Name: kode_golongan_listrik kode_golongan_listrik_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_golongan_listrik
    ADD CONSTRAINT kode_golongan_listrik_pkey PRIMARY KEY (kode_golongan_listrik);


--
-- TOC entry 3962 (class 2606 OID 38809)
-- Name: kode_invoice_entries kode_invoice_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_entries
    ADD CONSTRAINT kode_invoice_entries_pkey PRIMARY KEY (kode_invoice_entries);


--
-- TOC entry 3965 (class 2606 OID 38811)
-- Name: kode_invoice_golongan kode_invoice_golongan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_golongan
    ADD CONSTRAINT kode_invoice_golongan_pkey PRIMARY KEY (kode_invoice_golongan);


--
-- TOC entry 3971 (class 2606 OID 38813)
-- Name: kode_invoice_kelompok_entries kode_invoice_kelompok_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_kelompok_entries
    ADD CONSTRAINT kode_invoice_kelompok_entries_pkey PRIMARY KEY (kode_invoice_kelompok, kode_invoice_entries);


--
-- TOC entry 3968 (class 2606 OID 38815)
-- Name: kode_invoice_kelompok kode_invoice_kelompok_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_kelompok
    ADD CONSTRAINT kode_invoice_kelompok_pkey PRIMARY KEY (kode_invoice_kelompok);


--
-- TOC entry 3974 (class 2606 OID 38817)
-- Name: kode_jenis_kelamin kode_jenis_kelamin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_jenis_kelamin
    ADD CONSTRAINT kode_jenis_kelamin_pkey PRIMARY KEY (kode_jenis_kelamin);


--
-- TOC entry 3977 (class 2606 OID 38819)
-- Name: kode_jenis_kendaraan kode_jenis_kendaraan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_jenis_kendaraan
    ADD CONSTRAINT kode_jenis_kendaraan_pkey PRIMARY KEY (kode_jenis_kendaraan);


--
-- TOC entry 3980 (class 2606 OID 38821)
-- Name: kode_jenis_nik kode_jenis_nik_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_jenis_nik
    ADD CONSTRAINT kode_jenis_nik_pkey PRIMARY KEY (kode_jenis_nik);


--
-- TOC entry 3982 (class 2606 OID 38823)
-- Name: kode_jenis_perolehan kode_jenis_perolehan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_jenis_perolehan
    ADD CONSTRAINT kode_jenis_perolehan_pkey PRIMARY KEY (kode_jenis_perolehan);


--
-- TOC entry 3985 (class 2606 OID 38825)
-- Name: kode_kantor kode_kantor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_kantor
    ADD CONSTRAINT kode_kantor_pkey PRIMARY KEY (kode_kantor);


--
-- TOC entry 3988 (class 2606 OID 38827)
-- Name: kode_kategori_komplain kode_kategori_komplain_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_kategori_komplain
    ADD CONSTRAINT kode_kategori_komplain_pkey PRIMARY KEY (kode_kategori_komplain);


--
-- TOC entry 3991 (class 2606 OID 38829)
-- Name: kode_menu kode_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_menu
    ADD CONSTRAINT kode_menu_pkey PRIMARY KEY (kode_menu);


--
-- TOC entry 3994 (class 2606 OID 38831)
-- Name: kode_pembayaran_method kode_pembayaran_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_pembayaran_method
    ADD CONSTRAINT kode_pembayaran_method_pkey PRIMARY KEY (kode_pembayaran_method);


--
-- TOC entry 4000 (class 2606 OID 38833)
-- Name: kode_role_fitur kode_role_fitur_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_fitur
    ADD CONSTRAINT kode_role_fitur_pkey PRIMARY KEY (kode_role_fitur);


--
-- TOC entry 4003 (class 2606 OID 38835)
-- Name: kode_role_menu kode_role_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_menu
    ADD CONSTRAINT kode_role_menu_pkey PRIMARY KEY (kode_role_menu);


--
-- TOC entry 3997 (class 2606 OID 38837)
-- Name: kode_role kode_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role
    ADD CONSTRAINT kode_role_pkey PRIMARY KEY (kode_role);


--
-- TOC entry 4005 (class 2606 OID 38839)
-- Name: kode_satuan kode_satuan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_satuan
    ADD CONSTRAINT kode_satuan_pkey PRIMARY KEY (kode_satuan);


--
-- TOC entry 4008 (class 2606 OID 38841)
-- Name: kode_status_nikah kode_status_nikah_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_status_nikah
    ADD CONSTRAINT kode_status_nikah_pkey PRIMARY KEY (kode_status_nikah);


--
-- TOC entry 4011 (class 2606 OID 38843)
-- Name: kode_status_pekerjaan kode_status_pekerjaan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_status_pekerjaan
    ADD CONSTRAINT kode_status_pekerjaan_pkey PRIMARY KEY (kode_status_pekerjaan);


--
-- TOC entry 4014 (class 2606 OID 38845)
-- Name: kode_tipe_kontrak_berakhir kode_tipe_kontrak_berakhir_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_tipe_kontrak_berakhir
    ADD CONSTRAINT kode_tipe_kontrak_berakhir_pkey PRIMARY KEY (kode_tipe_kontrak_berakhir);


--
-- TOC entry 4017 (class 2606 OID 38847)
-- Name: kode_tipe_out kode_tipe_out_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_tipe_out
    ADD CONSTRAINT kode_tipe_out_pkey PRIMARY KEY (kode_tipe_out);


--
-- TOC entry 4020 (class 2606 OID 38849)
-- Name: kode_unit_jenis kode_unit_jenis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_unit_jenis
    ADD CONSTRAINT kode_unit_jenis_pkey PRIMARY KEY (kode_unit_jenis);


--
-- TOC entry 4023 (class 2606 OID 38851)
-- Name: kode_wo_prioritas kode_wo_prioritas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_wo_prioritas
    ADD CONSTRAINT kode_wo_prioritas_pkey PRIMARY KEY (kode_wo_prioritas);


--
-- TOC entry 4026 (class 2606 OID 38853)
-- Name: kode_wo_tipe kode_wo_tipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_wo_tipe
    ADD CONSTRAINT kode_wo_tipe_pkey PRIMARY KEY (kode_wo_tipe);


--
-- TOC entry 4029 (class 2606 OID 38855)
-- Name: komplain komplain_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY komplain
    ADD CONSTRAINT komplain_pkey PRIMARY KEY (no_komplain);


--
-- TOC entry 4032 (class 2606 OID 38857)
-- Name: kontrak_lampiran kontrak_lampiran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_lampiran
    ADD CONSTRAINT kontrak_lampiran_pkey PRIMARY KEY (id_kontrak_lampiran);


--
-- TOC entry 4038 (class 2606 OID 38859)
-- Name: kontrak_sewa_adendum kontrak_sewa_adendum_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_adendum
    ADD CONSTRAINT kontrak_sewa_adendum_pkey PRIMARY KEY (id_adendum);


--
-- TOC entry 4041 (class 2606 OID 38861)
-- Name: kontrak_sewa_berhenti kontrak_sewa_berhenti_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_berhenti
    ADD CONSTRAINT kontrak_sewa_berhenti_pkey PRIMARY KEY (id_berhenti);


--
-- TOC entry 4044 (class 2606 OID 38863)
-- Name: kontrak_sewa_fasilitas_tarif kontrak_sewa_fasilitas_tarif_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_tarif
    ADD CONSTRAINT kontrak_sewa_fasilitas_tarif_pkey PRIMARY KEY (id_kontrak_sewa_fasilitas_tarif);


--
-- TOC entry 4047 (class 2606 OID 38865)
-- Name: kontrak_sewa_fasilitas_unit kontrak_sewa_fasilitas_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_unit
    ADD CONSTRAINT kontrak_sewa_fasilitas_unit_pkey PRIMARY KEY (id_kontrak_sewa_fasilitas_unit);


--
-- TOC entry 4050 (class 2606 OID 38867)
-- Name: kontrak_sewa_inventaris_items kontrak_sewa_inventaris_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_inventaris_items
    ADD CONSTRAINT kontrak_sewa_inventaris_items_pkey PRIMARY KEY (id_inventaris_unit);


--
-- TOC entry 4035 (class 2606 OID 38869)
-- Name: kontrak_sewa kontrak_sewa_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa
    ADD CONSTRAINT kontrak_sewa_pkey PRIMARY KEY (id_kontrak_sewa);


--
-- TOC entry 4056 (class 2606 OID 38871)
-- Name: kontrak_sewa_retur_out kontrak_sewa_retur_out_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur_out
    ADD CONSTRAINT kontrak_sewa_retur_out_pkey PRIMARY KEY (id_kontrak_sewa_retur_out);


--
-- TOC entry 4053 (class 2606 OID 38873)
-- Name: kontrak_sewa_retur kontrak_sewa_retur_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur
    ADD CONSTRAINT kontrak_sewa_retur_pkey PRIMARY KEY (id_kontrak_sewa_retur);


--
-- TOC entry 4059 (class 2606 OID 38875)
-- Name: kontrak_sewa_unit kontrak_sewa_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit
    ADD CONSTRAINT kontrak_sewa_unit_pkey PRIMARY KEY (id_kontrak_sewa_unit);


--
-- TOC entry 4062 (class 2606 OID 38877)
-- Name: kontrak_sewa_unit_tarif kontrak_sewa_unit_tarif_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit_tarif
    ADD CONSTRAINT kontrak_sewa_unit_tarif_pkey PRIMARY KEY (id_kontrak_sewa_unit_tarif);


--
-- TOC entry 4065 (class 2606 OID 38879)
-- Name: listrik_meter_log listrik_meter_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY listrik_meter_log
    ADD CONSTRAINT listrik_meter_log_pkey PRIMARY KEY (id_listrik_meter_log);


--
-- TOC entry 4067 (class 2606 OID 38881)
-- Name: master_kapnonkap master_kapnonkap_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_kapnonkap
    ADD CONSTRAINT master_kapnonkap_pkey PRIMARY KEY (id_kapnonkap);


--
-- TOC entry 4069 (class 2606 OID 38883)
-- Name: master_penyusutan_komersil master_penyusutan_komersil_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_penyusutan_komersil
    ADD CONSTRAINT master_penyusutan_komersil_pkey PRIMARY KEY (id_master_penyusutan);


--
-- TOC entry 4071 (class 2606 OID 38885)
-- Name: master_sekuens_tahun master_sekuens_tahun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_sekuens_tahun
    ADD CONSTRAINT master_sekuens_tahun_pkey PRIMARY KEY (id_sekuen);


--
-- TOC entry 4077 (class 2606 OID 38887)
-- Name: mtnc_wo_lampiran mtnc_wo_lampiran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo_lampiran
    ADD CONSTRAINT mtnc_wo_lampiran_pkey PRIMARY KEY (id_wo_lampiran);


--
-- TOC entry 4074 (class 2606 OID 38889)
-- Name: mtnc_wo mtnc_wo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_pkey PRIMARY KEY (no_wo);


--
-- TOC entry 4080 (class 2606 OID 38891)
-- Name: pajak_tarif_sewa_unit pajak_tarif_sewa_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pajak_tarif_sewa_unit
    ADD CONSTRAINT pajak_tarif_sewa_unit_pkey PRIMARY KEY (id_pajak);


--
-- TOC entry 4086 (class 2606 OID 38893)
-- Name: pembayaran_invoices pembayaran_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_invoices
    ADD CONSTRAINT pembayaran_invoices_pkey PRIMARY KEY (id_pembayaran_invoices);


--
-- TOC entry 4083 (class 2606 OID 38895)
-- Name: pembayaran pembayaran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran
    ADD CONSTRAINT pembayaran_pkey PRIMARY KEY (id_pembayaran);


--
-- TOC entry 4089 (class 2606 OID 38897)
-- Name: pembayaran_rekening pembayaran_rekening_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_rekening
    ADD CONSTRAINT pembayaran_rekening_pkey PRIMARY KEY (id_pembayaran_rekening);


--
-- TOC entry 4091 (class 2606 OID 38899)
-- Name: pengguna pengguna_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna
    ADD CONSTRAINT pengguna_pkey PRIMARY KEY (kode_pengguna);


--
-- TOC entry 4093 (class 2606 OID 38901)
-- Name: pengguna_settings pengguna_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna_settings
    ADD CONSTRAINT pengguna_settings_pkey PRIMARY KEY (id_pengguna_settings);


--
-- TOC entry 3936 (class 2606 OID 38903)
-- Name: kode_aset_kategori pk_kode_aset_kategori; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_kategori
    ADD CONSTRAINT pk_kode_aset_kategori PRIMARY KEY (kode_kategori, kode_kelompok, kode_sub_kelompok);


--
-- TOC entry 4099 (class 2606 OID 38905)
-- Name: profil_penghuni_lampiran profil_penghuni_lampiran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni_lampiran
    ADD CONSTRAINT profil_penghuni_lampiran_pkey PRIMARY KEY (id_profil_penghuni_lampiran);


--
-- TOC entry 4096 (class 2606 OID 38907)
-- Name: profil_penghuni profil_penghuni_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_pkey PRIMARY KEY (id_profil_penghuni);


--
-- TOC entry 4105 (class 2606 OID 38909)
-- Name: registrasi_lampiran registrasi_lampiran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_lampiran
    ADD CONSTRAINT registrasi_lampiran_pkey PRIMARY KEY (id_registrasi_lampiran);


--
-- TOC entry 4108 (class 2606 OID 38911)
-- Name: registrasi_penghuni registrasi_penghuni_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_pkey PRIMARY KEY (id_registrasi_penghuni);


--
-- TOC entry 4102 (class 2606 OID 38913)
-- Name: registrasi registrasi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi
    ADD CONSTRAINT registrasi_pkey PRIMARY KEY (no_registrasi);


--
-- TOC entry 4111 (class 2606 OID 38915)
-- Name: registrasi_unit registrasi_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_unit
    ADD CONSTRAINT registrasi_unit_pkey PRIMARY KEY (id_registrasi_unit);


--
-- TOC entry 4117 (class 2606 OID 38917)
-- Name: rusun_blok rusun_blok_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_blok
    ADD CONSTRAINT rusun_blok_pkey PRIMARY KEY (id_rusun_blok);


--
-- TOC entry 4120 (class 2606 OID 38919)
-- Name: rusun_lantai rusun_lantai_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_lantai
    ADD CONSTRAINT rusun_lantai_pkey PRIMARY KEY (id_lantai);


--
-- TOC entry 4123 (class 2606 OID 38921)
-- Name: rusun_mgr_setting_db rusun_mgr_setting_db_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_mgr_setting_db
    ADD CONSTRAINT rusun_mgr_setting_db_pkey PRIMARY KEY (kode_rusun);


--
-- TOC entry 4114 (class 2606 OID 38923)
-- Name: rusun rusun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun
    ADD CONSTRAINT rusun_pkey PRIMARY KEY (kode_rusun);


--
-- TOC entry 4126 (class 2606 OID 38925)
-- Name: rusun_unit rusun_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_unit
    ADD CONSTRAINT rusun_unit_pkey PRIMARY KEY (id_unit);


--
-- TOC entry 4130 (class 2606 OID 38927)
-- Name: tarif_fasilitas tarif_fasilitas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_fasilitas
    ADD CONSTRAINT tarif_fasilitas_pkey PRIMARY KEY (id_tarif_fasilitas);


--
-- TOC entry 4133 (class 2606 OID 38929)
-- Name: tarif_lantai tarif_lantai_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_lantai
    ADD CONSTRAINT tarif_lantai_pkey PRIMARY KEY (id_tarif_lantai);


--
-- TOC entry 4136 (class 2606 OID 38931)
-- Name: tarif_listrik tarif_listrik_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_listrik
    ADD CONSTRAINT tarif_listrik_pkey PRIMARY KEY (id_tarif_listrik);


--
-- TOC entry 4139 (class 2606 OID 38933)
-- Name: tarif_unit tarif_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_unit
    ADD CONSTRAINT tarif_unit_pkey PRIMARY KEY (id_tarif_unit);


--
-- TOC entry 3869 (class 1259 OID 38934)
-- Name: air_meter_log_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX air_meter_log_idx ON air_meter_log USING btree (no_meter_air, id_unit, use_in_billing, tgl_pencatatan, tgl_start_meter, tgl_end_meter);


--
-- TOC entry 3872 (class 1259 OID 38935)
-- Name: aset_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX aset_idx ON aset USING btree (kode_kantor, kode_aset_kategori, as_inventaris_unit, kode_sub_kelompok, kode_rusun, kode_aset_rusun, aktif);


--
-- TOC entry 3889 (class 1259 OID 38936)
-- Name: fasilitas_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fasilitas_idx ON fasilitas USING btree (aktif);


--
-- TOC entry 3892 (class 1259 OID 38937)
-- Name: fasilitas_rusun_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fasilitas_rusun_idx ON fasilitas_rusun USING btree (kode_rusun, aktif);


--
-- TOC entry 3934 (class 1259 OID 38938)
-- Name: fki_fk_kategori_kelompok; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_fk_kategori_kelompok ON kode_aset_kategori USING btree (kode_kelompok);


--
-- TOC entry 3898 (class 1259 OID 38939)
-- Name: invoice_denda_setting_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_denda_setting_idx ON invoice_denda_setting USING btree (tgl_mulai_berlaku, aktif);


--
-- TOC entry 3901 (class 1259 OID 38940)
-- Name: invoice_entries_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_idx ON invoice_entries USING btree (no_invoice, kode_invoice_entries, ref_id_invoice_entries);


--
-- TOC entry 3904 (class 1259 OID 38941)
-- Name: invoice_entries_invair_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invair_idx ON invoice_entries_invair USING btree (id_unit, tahun_bulan_tagihan, id_kontrak_sewa, id_air_meter_log, aktif);


--
-- TOC entry 3907 (class 1259 OID 38942)
-- Name: invoice_entries_invdenda_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invdenda_idx ON invoice_entries_invdenda USING btree (tahun_bulan_tagihan, no_invoice_kena_denda, status, jenis_denda, id_kontrak_sewa, aktif);


--
-- TOC entry 3913 (class 1259 OID 38943)
-- Name: invoice_entries_invdpst_detil_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invdpst_detil_idx ON invoice_entries_invdpst_detil USING btree (id_invoice_entries_invdpst, id_unit, aktif);


--
-- TOC entry 3910 (class 1259 OID 38944)
-- Name: invoice_entries_invdpst_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invdpst_idx ON invoice_entries_invdpst USING btree (id_kontrak_sewa, tahun_bulan_tagihan, status, aktif);


--
-- TOC entry 3916 (class 1259 OID 38945)
-- Name: invoice_entries_invdpst_out_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invdpst_out_idx ON invoice_entries_invdpst_out USING btree (id_invoice_entries_invdpst, aktif);


--
-- TOC entry 3919 (class 1259 OID 38946)
-- Name: invoice_entries_inveq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_inveq_idx ON invoice_entries_inveq USING btree (tahun_bulan_tagihan, id_unit, id_kontrak_sewa, kode_aset, jenis_tagihan, id_inventaris_unit, status, aktif);


--
-- TOC entry 3922 (class 1259 OID 38947)
-- Name: invoice_entries_invfas_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invfas_idx ON invoice_entries_invfas USING btree (id_unit, kode_fasilitas, tahun_bulan_tagihan, periode_bln_sewa_awal, periode_bln_sewa_akhir, id_kontrak_sewa, status, aktif);


--
-- TOC entry 3925 (class 1259 OID 38948)
-- Name: invoice_entries_invlstrk_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invlstrk_idx ON invoice_entries_invlstrk USING btree (id_unit, tahun_bulan_tagihan, id_kontrak_sewa, status, aktif);


--
-- TOC entry 3928 (class 1259 OID 38949)
-- Name: invoice_entries_invsewa_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_entries_invsewa_idx ON invoice_entries_invsewa USING btree (id_unit, tahun_bulan_tagihan, id_kontrak_sewa, pajak_dibayar_penyewa, status, aktif);


--
-- TOC entry 3895 (class 1259 OID 38950)
-- Name: invoice_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX invoice_idx ON invoice USING btree (id_kontrak_sewa, tahun_bulan_tagihan, flag_rekon, flag_ada_denda, pajak_dibayar_penyewa, ada_bukti_potong_pajak, aktif);


--
-- TOC entry 3931 (class 1259 OID 38951)
-- Name: kode_agama_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_agama_idx ON kode_agama USING btree (aktif);


--
-- TOC entry 3937 (class 1259 OID 38952)
-- Name: kode_aset_kelompok_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_aset_kelompok_idx ON kode_aset_kelompok USING btree (no_urut, aktif);


--
-- TOC entry 3944 (class 1259 OID 38953)
-- Name: kode_aset_rusun_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_aset_rusun_idx ON kode_aset_rusun USING btree (kode_rusun, kode_aset_rusun, aktif);


--
-- TOC entry 3951 (class 1259 OID 38954)
-- Name: kode_dokumen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_dokumen_idx ON kode_dokumen USING btree (aktif);


--
-- TOC entry 3954 (class 1259 OID 38955)
-- Name: kode_fitur_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_fitur_idx ON kode_fitur USING btree (aktif);


--
-- TOC entry 3957 (class 1259 OID 38956)
-- Name: kode_golongan_listrik_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_golongan_listrik_idx ON kode_golongan_listrik USING btree (aktif);


--
-- TOC entry 3960 (class 1259 OID 38957)
-- Name: kode_invoice_entries_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_invoice_entries_idx ON kode_invoice_entries USING btree (kode_invoice_entries, aktif);


--
-- TOC entry 3963 (class 1259 OID 38958)
-- Name: kode_invoice_golongan_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_invoice_golongan_idx ON kode_invoice_golongan USING btree (kode_invoice_golongan, aktif);


--
-- TOC entry 3969 (class 1259 OID 38959)
-- Name: kode_invoice_kelompok_entries_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_invoice_kelompok_entries_idx ON kode_invoice_kelompok_entries USING btree (kode_invoice_kelompok, kode_invoice_entries, aktif);


--
-- TOC entry 3966 (class 1259 OID 38960)
-- Name: kode_invoice_kelompok_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_invoice_kelompok_idx ON kode_invoice_kelompok USING btree (kode_invoice_kelompok, kode_invoice_golongan, aktif);


--
-- TOC entry 3972 (class 1259 OID 38961)
-- Name: kode_jenis_kelamin_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_jenis_kelamin_idx ON kode_jenis_kelamin USING btree (aktif);


--
-- TOC entry 3975 (class 1259 OID 38962)
-- Name: kode_jenis_kendaraan_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_jenis_kendaraan_idx ON kode_jenis_kendaraan USING btree (aktif);


--
-- TOC entry 3978 (class 1259 OID 38963)
-- Name: kode_jenis_nik_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_jenis_nik_idx ON kode_jenis_nik USING btree (aktif);


--
-- TOC entry 3983 (class 1259 OID 38964)
-- Name: kode_kantor_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_kantor_idx ON kode_kantor USING btree (kode_kantor_induk, aktif);


--
-- TOC entry 3986 (class 1259 OID 38965)
-- Name: kode_kategori_komplain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_kategori_komplain_idx ON kode_kategori_komplain USING btree (kode_kategori_komplain, aktif);


--
-- TOC entry 3989 (class 1259 OID 38966)
-- Name: kode_menu_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_menu_idx ON kode_menu USING btree (aktif);


--
-- TOC entry 3992 (class 1259 OID 38967)
-- Name: kode_pembayaran_method_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_pembayaran_method_idx ON kode_pembayaran_method USING btree (aktif);


--
-- TOC entry 3998 (class 1259 OID 38968)
-- Name: kode_role_fitur_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_role_fitur_idx ON kode_role_fitur USING btree (kode_fitur, kode_role, aktif);


--
-- TOC entry 3995 (class 1259 OID 38969)
-- Name: kode_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_role_idx ON kode_role USING btree (aktif);


--
-- TOC entry 4001 (class 1259 OID 38970)
-- Name: kode_role_menu_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_role_menu_idx ON kode_role_menu USING btree (kode_menu, kode_role, aktif);


--
-- TOC entry 4006 (class 1259 OID 38971)
-- Name: kode_status_nikah_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_status_nikah_idx ON kode_status_nikah USING btree (aktif);


--
-- TOC entry 4009 (class 1259 OID 38972)
-- Name: kode_status_pekerjaan_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_status_pekerjaan_idx ON kode_status_pekerjaan USING btree (aktif);


--
-- TOC entry 4012 (class 1259 OID 38973)
-- Name: kode_tipe_kontrak_berakhir_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_tipe_kontrak_berakhir_idx ON kode_tipe_kontrak_berakhir USING btree (aktif);


--
-- TOC entry 4015 (class 1259 OID 38974)
-- Name: kode_tipe_out_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_tipe_out_idx ON kode_tipe_out USING btree (aktif);


--
-- TOC entry 4018 (class 1259 OID 38975)
-- Name: kode_unit_jenis_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_unit_jenis_idx ON kode_unit_jenis USING btree (aktif);


--
-- TOC entry 4021 (class 1259 OID 38976)
-- Name: kode_wo_prioritas_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_wo_prioritas_idx ON kode_wo_prioritas USING btree (kode_wo_prioritas, aktif);


--
-- TOC entry 4024 (class 1259 OID 38977)
-- Name: kode_wo_tipe_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kode_wo_tipe_idx ON kode_wo_tipe USING btree (kode_wo_tipe, aktif);


--
-- TOC entry 4027 (class 1259 OID 38978)
-- Name: komplain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX komplain_idx ON komplain USING btree (kode_rusun, id_unit, nama_pelapor, kode_kategori_komplain, status, penyelesaian_status, aktif);


--
-- TOC entry 4030 (class 1259 OID 38979)
-- Name: kontrak_lampiran_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_lampiran_idx ON kontrak_lampiran USING btree (jenis_perjanjian, no_perjanjian, aktif);


--
-- TOC entry 4036 (class 1259 OID 38980)
-- Name: kontrak_sewa_adendum_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_adendum_idx ON kontrak_sewa_adendum USING btree (id_adendum, id_kontrak_sewa, no_adendum, status, approval, aktif);


--
-- TOC entry 4039 (class 1259 OID 38981)
-- Name: kontrak_sewa_berhenti_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_berhenti_idx ON kontrak_sewa_berhenti USING btree (id_berhenti, id_kontrak_sewa, tipe_berakhir, status, aktif);


--
-- TOC entry 4042 (class 1259 OID 38982)
-- Name: kontrak_sewa_fasilitas_tarif_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_fasilitas_tarif_idx ON kontrak_sewa_fasilitas_tarif USING btree (id_kontrak_sewa, id_adendum, kode_fasilitas, tgl_tarif, blth_mulai, blth_akhir, aktif);


--
-- TOC entry 4045 (class 1259 OID 38983)
-- Name: kontrak_sewa_fasilitas_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_fasilitas_unit_idx ON kontrak_sewa_fasilitas_unit USING btree (id_kontrak_sewa_fasilitas_unit, id_kontrak_sewa, id_unit, kode_fasilitas, tgl_sewa_fasilitas, aktif);


--
-- TOC entry 4033 (class 1259 OID 38984)
-- Name: kontrak_sewa_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_idx ON kontrak_sewa USING btree (no_kontrak_sewa, kode_rusun, jenis_registrasi, pihak2_kpj, pihak2_nama_lengkap, pihak2_npp, pihak2_nama_perusahaan, status, kontrak_berlaku, kontrak_berakhir, aktif);


--
-- TOC entry 4048 (class 1259 OID 38985)
-- Name: kontrak_sewa_inventaris_items_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_inventaris_items_idx ON kontrak_sewa_inventaris_items USING btree (id_kontrak_sewa, id_unit, kode_aset, tgl_penempatan_out, kondisi_akhir, aktif_kontrak, use_in_entri, use_in_entri_blth, aktif);


--
-- TOC entry 4051 (class 1259 OID 38986)
-- Name: kontrak_sewa_retur_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_retur_idx ON kontrak_sewa_retur USING btree (id_kontrak_sewa, id_pembayaran, aktif);


--
-- TOC entry 4054 (class 1259 OID 38987)
-- Name: kontrak_sewa_retur_out_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_retur_out_idx ON kontrak_sewa_retur_out USING btree (id_kontrak_sewa_retur_out, id_kontrak_sewa_retur, id_pembayaran, aktif);


--
-- TOC entry 4057 (class 1259 OID 38988)
-- Name: kontrak_sewa_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_unit_idx ON kontrak_sewa_unit USING btree (id_kontrak_sewa, id_unit);


--
-- TOC entry 4060 (class 1259 OID 38989)
-- Name: kontrak_sewa_unit_tarif_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kontrak_sewa_unit_tarif_idx ON kontrak_sewa_unit_tarif USING btree (id_kontrak_sewa, id_adendum, id_unit, tgl_tarif, blth_mulai, blth_akhir, aktif);


--
-- TOC entry 4063 (class 1259 OID 38990)
-- Name: listrik_meter_log_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX listrik_meter_log_idx ON listrik_meter_log USING btree (no_meter_listrik, id_unit, use_in_billing, tgl_pencatatan, tgl_start_meter, tgl_end_meter);


--
-- TOC entry 4072 (class 1259 OID 38991)
-- Name: mtnc_wo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX mtnc_wo_idx ON mtnc_wo USING btree (kode_rusun, id_unit, id_rusun_blok, id_lantai, ref_id, kode_wo_tipe, status, completion_status, assigned, aktif);


--
-- TOC entry 4075 (class 1259 OID 38992)
-- Name: mtnc_wo_lampiran_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX mtnc_wo_lampiran_idx ON mtnc_wo_lampiran USING btree (no_wo, aktif);


--
-- TOC entry 4078 (class 1259 OID 38993)
-- Name: pajak_tarif_sewa_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pajak_tarif_sewa_unit_idx ON pajak_tarif_sewa_unit USING btree (id_pajak, kode_rusun, aktif);


--
-- TOC entry 4081 (class 1259 OID 38994)
-- Name: pembayaran_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pembayaran_idx ON pembayaran USING btree (media_pembayaran, id_kontrak_sewa, pajak_dibayar_penyewa, aktif);


--
-- TOC entry 4084 (class 1259 OID 38995)
-- Name: pembayaran_invoices_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pembayaran_invoices_idx ON pembayaran_invoices USING btree (id_pembayaran, no_invoice, pajak_dibayar_penyewa, aktif);


--
-- TOC entry 4087 (class 1259 OID 38996)
-- Name: pembayaran_rekening_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pembayaran_rekening_idx ON pembayaran_rekening USING btree (kode_kantor, aktif);


--
-- TOC entry 4094 (class 1259 OID 38997)
-- Name: profil_penghuni_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX profil_penghuni_idx ON profil_penghuni USING btree (kpj, nik, aktif, jenis_kelamin, nama_lengkap);


--
-- TOC entry 4097 (class 1259 OID 38998)
-- Name: profil_penghuni_lampiran_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX profil_penghuni_lampiran_idx ON profil_penghuni_lampiran USING btree (id_profil_penghuni_lampiran, kode_dokumen);


--
-- TOC entry 4100 (class 1259 OID 38999)
-- Name: registrasi_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX registrasi_idx ON registrasi USING btree (jenis_registrasi, nik, kpj, npp, kpj_nama, perusahaan_nama, kode_rusun, kode_blok, aktif);


--
-- TOC entry 4103 (class 1259 OID 39000)
-- Name: registrasi_lampiran_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX registrasi_lampiran_idx ON registrasi_lampiran USING btree (no_registrasi, kode_dokumen, aktif);


--
-- TOC entry 4106 (class 1259 OID 39001)
-- Name: registrasi_penghuni_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX registrasi_penghuni_idx ON registrasi_penghuni USING btree (id_registrasi_penghuni, no_registrasi, id_profil_penghuni, tgl_in, tgl_out, aktif);


--
-- TOC entry 4109 (class 1259 OID 39002)
-- Name: registrasi_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX registrasi_unit_idx ON registrasi_unit USING btree (id_registrasi_unit, no_registrasi, id_unit, process, waiting_list, waiting_no, aktif);


--
-- TOC entry 4115 (class 1259 OID 39003)
-- Name: rusun_blok_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX rusun_blok_idx ON rusun_blok USING btree (kode_rusun, nama_blok, aktif);


--
-- TOC entry 4112 (class 1259 OID 39004)
-- Name: rusun_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX rusun_idx ON rusun USING btree (kode_kantor, initial_nama_rusun, initial_nama_daerah, aktif);


--
-- TOC entry 4118 (class 1259 OID 39005)
-- Name: rusun_lantai_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX rusun_lantai_idx ON rusun_lantai USING btree (kode_rusun, no_lantai, nama_lantai, id_rusun_blok, aktif);


--
-- TOC entry 4121 (class 1259 OID 39006)
-- Name: rusun_mgr_setting_db_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX rusun_mgr_setting_db_idx ON rusun_mgr_setting_db USING btree (kode_rusun);


--
-- TOC entry 4124 (class 1259 OID 39007)
-- Name: rusun_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX rusun_unit_idx ON rusun_unit USING btree (id_lantai, nama_unit, aktif);


--
-- TOC entry 4127 (class 1259 OID 39008)
-- Name: tarif_air_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tarif_air_idx ON tarif_air USING btree (kode_rusun, tgl_mulai, tgl_berakhir, aktif);


--
-- TOC entry 4128 (class 1259 OID 39009)
-- Name: tarif_fasilitas_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tarif_fasilitas_idx ON tarif_fasilitas USING btree (kode_fasilitas, kode_rusun, tgl_mulai, tgl_berakhir, aktif);


--
-- TOC entry 4131 (class 1259 OID 39010)
-- Name: tarif_lantai_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tarif_lantai_idx ON tarif_lantai USING btree (kode_unit_jenis, id_lantai, tgl_mulai, tgl_berakhir, aktif);


--
-- TOC entry 4134 (class 1259 OID 39011)
-- Name: tarif_listrik_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tarif_listrik_idx ON tarif_listrik USING btree (kode_rusun, kode_golongan_listrik, tgl_mulai, tgl_berakhir, aktif);


--
-- TOC entry 4137 (class 1259 OID 39012)
-- Name: tarif_unit_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tarif_unit_idx ON tarif_unit USING btree (id_tarif_unit, id_unit, tgl_mulai, tgl_berakhir, aktif);


--
-- TOC entry 4255 (class 2620 OID 39013)
-- Name: invoice trg_invoice_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_invoice_bi BEFORE INSERT ON invoice FOR EACH ROW EXECUTE PROCEDURE ft_invoice_bi();


--
-- TOC entry 4256 (class 2620 OID 39014)
-- Name: kode_role_fitur trg_kode_role_fitur_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_kode_role_fitur_bi BEFORE INSERT ON kode_role_fitur FOR EACH ROW EXECUTE PROCEDURE ft_kode_role_fitur_bi();


--
-- TOC entry 4257 (class 2620 OID 39015)
-- Name: kode_role_menu trg_kode_role_menu_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_kode_role_menu_bi BEFORE INSERT ON kode_role_menu FOR EACH ROW EXECUTE PROCEDURE ft_kode_role_menu_bi();


--
-- TOC entry 4258 (class 2620 OID 39016)
-- Name: komplain trg_komplain_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_komplain_bi BEFORE INSERT ON komplain FOR EACH ROW EXECUTE PROCEDURE ft_komplain_bi();


--
-- TOC entry 4259 (class 2620 OID 39017)
-- Name: kontrak_sewa trg_kontrak_sewa_biu; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_kontrak_sewa_biu BEFORE INSERT OR UPDATE ON kontrak_sewa FOR EACH ROW EXECUTE PROCEDURE ft_kontrak_sewa_biu();


--
-- TOC entry 4260 (class 2620 OID 39018)
-- Name: kontrak_sewa_unit trg_kontrak_sewa_unit_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_kontrak_sewa_unit_bi BEFORE INSERT ON kontrak_sewa_unit FOR EACH ROW EXECUTE PROCEDURE ft_kontrak_sewa_unit_bi();


--
-- TOC entry 4261 (class 2620 OID 39019)
-- Name: mtnc_wo trg_mtnc_wo_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_mtnc_wo_bi BEFORE INSERT ON mtnc_wo FOR EACH ROW EXECUTE PROCEDURE ft_mtnc_wo_bi();


--
-- TOC entry 4262 (class 2620 OID 39020)
-- Name: pengguna trg_pengguna_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_pengguna_bi BEFORE INSERT ON pengguna FOR EACH ROW EXECUTE PROCEDURE ft_pengguna_bi();


--
-- TOC entry 4263 (class 2620 OID 39021)
-- Name: registrasi trg_registrasi_bi; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_registrasi_bi BEFORE INSERT ON registrasi FOR EACH ROW EXECUTE PROCEDURE ft_registrasi_bi();


--
-- TOC entry 4140 (class 2606 OID 39022)
-- Name: air_meter_log air_meter_log_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY air_meter_log
    ADD CONSTRAINT air_meter_log_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4147 (class 2606 OID 39027)
-- Name: fasilitas_rusun fasilitas_rusun_kode_fasilitas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY fasilitas_rusun
    ADD CONSTRAINT fasilitas_rusun_kode_fasilitas_fkey FOREIGN KEY (kode_fasilitas) REFERENCES fasilitas(kode_fasilitas);


--
-- TOC entry 4148 (class 2606 OID 39032)
-- Name: fasilitas_rusun fasilitas_rusun_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY fasilitas_rusun
    ADD CONSTRAINT fasilitas_rusun_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4142 (class 2606 OID 39037)
-- Name: aset_amortisasi_rkp fk_aset_amort_aset; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_amortisasi_rkp
    ADD CONSTRAINT fk_aset_amort_aset FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4141 (class 2606 OID 39042)
-- Name: aset fk_aset_kode_kantor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset
    ADD CONSTRAINT fk_aset_kode_kantor FOREIGN KEY (kode_kantor) REFERENCES kode_kantor(kode_kantor) ON UPDATE CASCADE;


--
-- TOC entry 4143 (class 2606 OID 39047)
-- Name: aset_kondisi fk_aset_kondisi_aset; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_kondisi
    ADD CONSTRAINT fk_aset_kondisi_aset FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4144 (class 2606 OID 39052)
-- Name: aset_penempatan fk_aset_pnmp_aset; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_penempatan
    ADD CONSTRAINT fk_aset_pnmp_aset FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4145 (class 2606 OID 39057)
-- Name: aset_penempatan fk_aset_pnmp_lokasiunit; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_penempatan
    ADD CONSTRAINT fk_aset_pnmp_lokasiunit FOREIGN KEY (lokasi_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4146 (class 2606 OID 39062)
-- Name: aset_penempatan fk_aset_pnmp_rusun; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY aset_penempatan
    ADD CONSTRAINT fk_aset_pnmp_rusun FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4171 (class 2606 OID 39067)
-- Name: kode_aset_kategori fk_kategori_kelompok; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_kategori
    ADD CONSTRAINT fk_kategori_kelompok FOREIGN KEY (kode_kelompok) REFERENCES kode_aset_kelompok(kode_kelompok);


--
-- TOC entry 4206 (class 2606 OID 39072)
-- Name: master_penyusutan_komersil fk_ms_penyusutan_aset; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY master_penyusutan_komersil
    ADD CONSTRAINT fk_ms_penyusutan_aset FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4153 (class 2606 OID 39077)
-- Name: invoice_entries_invair invoice_entries_invair_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invair
    ADD CONSTRAINT invoice_entries_invair_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4154 (class 2606 OID 39082)
-- Name: invoice_entries_invair invoice_entries_invair_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invair
    ADD CONSTRAINT invoice_entries_invair_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4155 (class 2606 OID 39087)
-- Name: invoice_entries_invdenda invoice_entries_invdenda_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdenda
    ADD CONSTRAINT invoice_entries_invdenda_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4156 (class 2606 OID 39092)
-- Name: invoice_entries_invdenda invoice_entries_invdenda_id_unit_kena_denda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdenda
    ADD CONSTRAINT invoice_entries_invdenda_id_unit_kena_denda_fkey FOREIGN KEY (id_unit_kena_denda) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4157 (class 2606 OID 39097)
-- Name: invoice_entries_invdenda invoice_entries_invdenda_no_invoice_kena_denda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdenda
    ADD CONSTRAINT invoice_entries_invdenda_no_invoice_kena_denda_fkey FOREIGN KEY (no_invoice_kena_denda) REFERENCES invoice(no_invoice);


--
-- TOC entry 4159 (class 2606 OID 39102)
-- Name: invoice_entries_invdpst_detil invoice_entries_invdpst_detil_id_invoice_entries_invdpst_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_detil
    ADD CONSTRAINT invoice_entries_invdpst_detil_id_invoice_entries_invdpst_fkey FOREIGN KEY (id_invoice_entries_invdpst) REFERENCES invoice_entries_invdpst(id_invoice_entries_invdpst);


--
-- TOC entry 4160 (class 2606 OID 39107)
-- Name: invoice_entries_invdpst_detil invoice_entries_invdpst_detil_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_detil
    ADD CONSTRAINT invoice_entries_invdpst_detil_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4158 (class 2606 OID 39112)
-- Name: invoice_entries_invdpst invoice_entries_invdpst_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst
    ADD CONSTRAINT invoice_entries_invdpst_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4161 (class 2606 OID 39117)
-- Name: invoice_entries_invdpst_out invoice_entries_invdpst_out_id_invoice_entries_invdpst_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invdpst_out
    ADD CONSTRAINT invoice_entries_invdpst_out_id_invoice_entries_invdpst_fkey FOREIGN KEY (id_invoice_entries_invdpst) REFERENCES invoice_entries_invdpst(id_invoice_entries_invdpst);


--
-- TOC entry 4162 (class 2606 OID 39122)
-- Name: invoice_entries_inveq invoice_entries_inveq_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_inveq
    ADD CONSTRAINT invoice_entries_inveq_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4163 (class 2606 OID 39127)
-- Name: invoice_entries_inveq invoice_entries_inveq_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_inveq
    ADD CONSTRAINT invoice_entries_inveq_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4164 (class 2606 OID 39132)
-- Name: invoice_entries_inveq invoice_entries_inveq_kode_aset_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_inveq
    ADD CONSTRAINT invoice_entries_inveq_kode_aset_fkey FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4165 (class 2606 OID 39137)
-- Name: invoice_entries_invfas invoice_entries_invfas_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invfas
    ADD CONSTRAINT invoice_entries_invfas_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4166 (class 2606 OID 39142)
-- Name: invoice_entries_invfas invoice_entries_invfas_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invfas
    ADD CONSTRAINT invoice_entries_invfas_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4167 (class 2606 OID 39147)
-- Name: invoice_entries_invfas invoice_entries_invfas_kode_fasilitas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invfas
    ADD CONSTRAINT invoice_entries_invfas_kode_fasilitas_fkey FOREIGN KEY (kode_fasilitas) REFERENCES fasilitas(kode_fasilitas);


--
-- TOC entry 4168 (class 2606 OID 39152)
-- Name: invoice_entries_invlstrk invoice_entries_invlstrk_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invlstrk
    ADD CONSTRAINT invoice_entries_invlstrk_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4169 (class 2606 OID 39157)
-- Name: invoice_entries_invsewa invoice_entries_invsewa_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invsewa
    ADD CONSTRAINT invoice_entries_invsewa_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4170 (class 2606 OID 39162)
-- Name: invoice_entries_invsewa invoice_entries_invsewa_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries_invsewa
    ADD CONSTRAINT invoice_entries_invsewa_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4151 (class 2606 OID 39167)
-- Name: invoice_entries invoice_entries_kode_invoice_entries_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries
    ADD CONSTRAINT invoice_entries_kode_invoice_entries_fkey FOREIGN KEY (kode_invoice_entries) REFERENCES kode_invoice_entries(kode_invoice_entries);


--
-- TOC entry 4152 (class 2606 OID 39172)
-- Name: invoice_entries invoice_entries_no_invoice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice_entries
    ADD CONSTRAINT invoice_entries_no_invoice_fkey FOREIGN KEY (no_invoice) REFERENCES invoice(no_invoice) ON UPDATE CASCADE;


--
-- TOC entry 4149 (class 2606 OID 39177)
-- Name: invoice invoice_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice
    ADD CONSTRAINT invoice_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4150 (class 2606 OID 39182)
-- Name: invoice invoice_kode_invoice_kelompok_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY invoice
    ADD CONSTRAINT invoice_kode_invoice_kelompok_fkey FOREIGN KEY (kode_invoice_kelompok) REFERENCES kode_invoice_kelompok(kode_invoice_kelompok);


--
-- TOC entry 4172 (class 2606 OID 39187)
-- Name: kode_aset_rusun kode_aset_rusun_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_aset_rusun
    ADD CONSTRAINT kode_aset_rusun_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4174 (class 2606 OID 39192)
-- Name: kode_invoice_kelompok_entries kode_invoice_kelompok_entries_kode_invoice_entries_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_kelompok_entries
    ADD CONSTRAINT kode_invoice_kelompok_entries_kode_invoice_entries_fkey FOREIGN KEY (kode_invoice_entries) REFERENCES kode_invoice_entries(kode_invoice_entries);


--
-- TOC entry 4173 (class 2606 OID 39197)
-- Name: kode_invoice_kelompok kode_invoice_kelompok_kode_invoice_golongan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_invoice_kelompok
    ADD CONSTRAINT kode_invoice_kelompok_kode_invoice_golongan_fkey FOREIGN KEY (kode_invoice_golongan) REFERENCES kode_invoice_golongan(kode_invoice_golongan);


--
-- TOC entry 4175 (class 2606 OID 39202)
-- Name: kode_role_fitur kode_role_fitur_kode_fitur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_fitur
    ADD CONSTRAINT kode_role_fitur_kode_fitur_fkey FOREIGN KEY (kode_fitur) REFERENCES kode_fitur(kode_fitur);


--
-- TOC entry 4176 (class 2606 OID 39207)
-- Name: kode_role_fitur kode_role_fitur_kode_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_fitur
    ADD CONSTRAINT kode_role_fitur_kode_role_fkey FOREIGN KEY (kode_role) REFERENCES kode_role(kode_role);


--
-- TOC entry 4177 (class 2606 OID 39212)
-- Name: kode_role_menu kode_role_menu_kode_menu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_menu
    ADD CONSTRAINT kode_role_menu_kode_menu_fkey FOREIGN KEY (kode_menu) REFERENCES kode_menu(kode_menu);


--
-- TOC entry 4178 (class 2606 OID 39217)
-- Name: kode_role_menu kode_role_menu_kode_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kode_role_menu
    ADD CONSTRAINT kode_role_menu_kode_role_fkey FOREIGN KEY (kode_role) REFERENCES kode_role(kode_role);


--
-- TOC entry 4179 (class 2606 OID 39222)
-- Name: komplain komplain_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY komplain
    ADD CONSTRAINT komplain_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4180 (class 2606 OID 39227)
-- Name: komplain komplain_kode_kategori_komplain_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY komplain
    ADD CONSTRAINT komplain_kode_kategori_komplain_fkey FOREIGN KEY (kode_kategori_komplain) REFERENCES kode_kategori_komplain(kode_kategori_komplain);


--
-- TOC entry 4181 (class 2606 OID 39232)
-- Name: komplain komplain_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY komplain
    ADD CONSTRAINT komplain_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4185 (class 2606 OID 39237)
-- Name: kontrak_sewa_adendum kontrak_sewa_adendum_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_adendum
    ADD CONSTRAINT kontrak_sewa_adendum_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4186 (class 2606 OID 39242)
-- Name: kontrak_sewa_berhenti kontrak_sewa_berhenti_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_berhenti
    ADD CONSTRAINT kontrak_sewa_berhenti_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4187 (class 2606 OID 39247)
-- Name: kontrak_sewa_berhenti kontrak_sewa_berhenti_tipe_berakhir_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_berhenti
    ADD CONSTRAINT kontrak_sewa_berhenti_tipe_berakhir_fkey FOREIGN KEY (tipe_berakhir) REFERENCES kode_tipe_kontrak_berakhir(kode_tipe_kontrak_berakhir);


--
-- TOC entry 4188 (class 2606 OID 39252)
-- Name: kontrak_sewa_fasilitas_tarif kontrak_sewa_fasilitas_tarif_id_adendum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_tarif
    ADD CONSTRAINT kontrak_sewa_fasilitas_tarif_id_adendum_fkey FOREIGN KEY (id_adendum) REFERENCES kontrak_sewa_adendum(id_adendum);


--
-- TOC entry 4189 (class 2606 OID 39257)
-- Name: kontrak_sewa_fasilitas_tarif kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_tarif
    ADD CONSTRAINT kontrak_sewa_fasilitas_tarif_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4190 (class 2606 OID 39262)
-- Name: kontrak_sewa_fasilitas_tarif kontrak_sewa_fasilitas_tarif_kode_fasilitas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_tarif
    ADD CONSTRAINT kontrak_sewa_fasilitas_tarif_kode_fasilitas_fkey FOREIGN KEY (kode_fasilitas) REFERENCES fasilitas(kode_fasilitas);


--
-- TOC entry 4191 (class 2606 OID 39267)
-- Name: kontrak_sewa_fasilitas_unit kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_unit
    ADD CONSTRAINT kontrak_sewa_fasilitas_unit_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4192 (class 2606 OID 39272)
-- Name: kontrak_sewa_fasilitas_unit kontrak_sewa_fasilitas_unit_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_fasilitas_unit
    ADD CONSTRAINT kontrak_sewa_fasilitas_unit_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4193 (class 2606 OID 39277)
-- Name: kontrak_sewa_inventaris_items kontrak_sewa_inventaris_items_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_inventaris_items
    ADD CONSTRAINT kontrak_sewa_inventaris_items_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4194 (class 2606 OID 39282)
-- Name: kontrak_sewa_inventaris_items kontrak_sewa_inventaris_items_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_inventaris_items
    ADD CONSTRAINT kontrak_sewa_inventaris_items_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4195 (class 2606 OID 39287)
-- Name: kontrak_sewa_inventaris_items kontrak_sewa_inventaris_items_kode_aset_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_inventaris_items
    ADD CONSTRAINT kontrak_sewa_inventaris_items_kode_aset_fkey FOREIGN KEY (kode_aset) REFERENCES aset(kode_aset);


--
-- TOC entry 4182 (class 2606 OID 39292)
-- Name: kontrak_sewa kontrak_sewa_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa
    ADD CONSTRAINT kontrak_sewa_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4183 (class 2606 OID 39297)
-- Name: kontrak_sewa kontrak_sewa_kontrak_berakhir_tipe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa
    ADD CONSTRAINT kontrak_sewa_kontrak_berakhir_tipe_fkey FOREIGN KEY (kontrak_berakhir_tipe) REFERENCES kode_tipe_kontrak_berakhir(kode_tipe_kontrak_berakhir);


--
-- TOC entry 4184 (class 2606 OID 39302)
-- Name: kontrak_sewa kontrak_sewa_no_registrasi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa
    ADD CONSTRAINT kontrak_sewa_no_registrasi_fkey FOREIGN KEY (no_registrasi) REFERENCES registrasi(no_registrasi);


--
-- TOC entry 4196 (class 2606 OID 39307)
-- Name: kontrak_sewa_retur kontrak_sewa_retur_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur
    ADD CONSTRAINT kontrak_sewa_retur_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4197 (class 2606 OID 39312)
-- Name: kontrak_sewa_retur kontrak_sewa_retur_id_pembayaran_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur
    ADD CONSTRAINT kontrak_sewa_retur_id_pembayaran_fkey FOREIGN KEY (id_pembayaran) REFERENCES pembayaran(id_pembayaran);


--
-- TOC entry 4198 (class 2606 OID 39317)
-- Name: kontrak_sewa_retur_out kontrak_sewa_retur_out_id_kontrak_sewa_retur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur_out
    ADD CONSTRAINT kontrak_sewa_retur_out_id_kontrak_sewa_retur_fkey FOREIGN KEY (id_kontrak_sewa_retur) REFERENCES kontrak_sewa_retur(id_kontrak_sewa_retur);


--
-- TOC entry 4199 (class 2606 OID 39322)
-- Name: kontrak_sewa_retur_out kontrak_sewa_retur_out_id_pembayaran_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_retur_out
    ADD CONSTRAINT kontrak_sewa_retur_out_id_pembayaran_fkey FOREIGN KEY (id_pembayaran) REFERENCES pembayaran(id_pembayaran);


--
-- TOC entry 4200 (class 2606 OID 39327)
-- Name: kontrak_sewa_unit kontrak_sewa_unit_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit
    ADD CONSTRAINT kontrak_sewa_unit_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4201 (class 2606 OID 39332)
-- Name: kontrak_sewa_unit kontrak_sewa_unit_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit
    ADD CONSTRAINT kontrak_sewa_unit_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4202 (class 2606 OID 39337)
-- Name: kontrak_sewa_unit_tarif kontrak_sewa_unit_tarif_id_adendum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit_tarif
    ADD CONSTRAINT kontrak_sewa_unit_tarif_id_adendum_fkey FOREIGN KEY (id_adendum) REFERENCES kontrak_sewa_adendum(id_adendum);


--
-- TOC entry 4203 (class 2606 OID 39342)
-- Name: kontrak_sewa_unit_tarif kontrak_sewa_unit_tarif_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit_tarif
    ADD CONSTRAINT kontrak_sewa_unit_tarif_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4204 (class 2606 OID 39347)
-- Name: kontrak_sewa_unit_tarif kontrak_sewa_unit_tarif_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY kontrak_sewa_unit_tarif
    ADD CONSTRAINT kontrak_sewa_unit_tarif_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4205 (class 2606 OID 39352)
-- Name: listrik_meter_log listrik_meter_log_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY listrik_meter_log
    ADD CONSTRAINT listrik_meter_log_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4207 (class 2606 OID 39357)
-- Name: mtnc_wo mtnc_wo_asigned_prioritas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_asigned_prioritas_fkey FOREIGN KEY (assigned_prioritas) REFERENCES kode_wo_prioritas(kode_wo_prioritas);


--
-- TOC entry 4208 (class 2606 OID 39362)
-- Name: mtnc_wo mtnc_wo_id_lantai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_id_lantai_fkey FOREIGN KEY (id_lantai) REFERENCES rusun_lantai(id_lantai);


--
-- TOC entry 4209 (class 2606 OID 39367)
-- Name: mtnc_wo mtnc_wo_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4210 (class 2606 OID 39372)
-- Name: mtnc_wo mtnc_wo_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4211 (class 2606 OID 39377)
-- Name: mtnc_wo mtnc_wo_kode_wo_tipe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo
    ADD CONSTRAINT mtnc_wo_kode_wo_tipe_fkey FOREIGN KEY (kode_wo_tipe) REFERENCES kode_wo_tipe(kode_wo_tipe);


--
-- TOC entry 4212 (class 2606 OID 39382)
-- Name: mtnc_wo_lampiran mtnc_wo_lampiran_no_wo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mtnc_wo_lampiran
    ADD CONSTRAINT mtnc_wo_lampiran_no_wo_fkey FOREIGN KEY (no_wo) REFERENCES mtnc_wo(no_wo);


--
-- TOC entry 4213 (class 2606 OID 39387)
-- Name: pajak_tarif_sewa_unit pajak_tarif_sewa_unit_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pajak_tarif_sewa_unit
    ADD CONSTRAINT pajak_tarif_sewa_unit_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4214 (class 2606 OID 39392)
-- Name: pembayaran pembayaran_id_kontrak_sewa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran
    ADD CONSTRAINT pembayaran_id_kontrak_sewa_fkey FOREIGN KEY (id_kontrak_sewa) REFERENCES kontrak_sewa(id_kontrak_sewa);


--
-- TOC entry 4216 (class 2606 OID 39397)
-- Name: pembayaran_invoices pembayaran_invoices_id_pembayaran_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_invoices
    ADD CONSTRAINT pembayaran_invoices_id_pembayaran_fkey FOREIGN KEY (id_pembayaran) REFERENCES pembayaran(id_pembayaran);


--
-- TOC entry 4217 (class 2606 OID 39402)
-- Name: pembayaran_invoices pembayaran_invoices_no_invoice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_invoices
    ADD CONSTRAINT pembayaran_invoices_no_invoice_fkey FOREIGN KEY (no_invoice) REFERENCES invoice(no_invoice);


--
-- TOC entry 4215 (class 2606 OID 39407)
-- Name: pembayaran pembayaran_media_pembayaran_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran
    ADD CONSTRAINT pembayaran_media_pembayaran_fkey FOREIGN KEY (media_pembayaran) REFERENCES kode_pembayaran_method(kode_pembayaran_method);


--
-- TOC entry 4218 (class 2606 OID 39412)
-- Name: pembayaran_rekening pembayaran_rekening_kode_kantor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pembayaran_rekening
    ADD CONSTRAINT pembayaran_rekening_kode_kantor_fkey FOREIGN KEY (kode_kantor) REFERENCES kode_kantor(kode_kantor);


--
-- TOC entry 4219 (class 2606 OID 39417)
-- Name: pengguna pengguna_kode_kantor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna
    ADD CONSTRAINT pengguna_kode_kantor_fkey FOREIGN KEY (kode_kantor) REFERENCES kode_kantor(kode_kantor);


--
-- TOC entry 4220 (class 2606 OID 39422)
-- Name: pengguna_role pengguna_role_kode_pengguna_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna_role
    ADD CONSTRAINT pengguna_role_kode_pengguna_fkey FOREIGN KEY (kode_pengguna) REFERENCES pengguna(kode_pengguna) ON UPDATE CASCADE;


--
-- TOC entry 4221 (class 2606 OID 39427)
-- Name: pengguna_role pengguna_role_kode_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pengguna_role
    ADD CONSTRAINT pengguna_role_kode_role_fkey FOREIGN KEY (kode_role) REFERENCES kode_role(kode_role);


--
-- TOC entry 4222 (class 2606 OID 39432)
-- Name: profil_penghuni profil_penghuni_jenis_kelamin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_jenis_kelamin_fkey FOREIGN KEY (jenis_kelamin) REFERENCES kode_jenis_kelamin(kode_jenis_kelamin);


--
-- TOC entry 4223 (class 2606 OID 39437)
-- Name: profil_penghuni profil_penghuni_kode_agama_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_kode_agama_fkey FOREIGN KEY (kode_agama) REFERENCES kode_agama(kode_agama);


--
-- TOC entry 4224 (class 2606 OID 39442)
-- Name: profil_penghuni profil_penghuni_kode_jenis_kendaraan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_kode_jenis_kendaraan_fkey FOREIGN KEY (kode_jenis_kendaraan) REFERENCES kode_jenis_kendaraan(kode_jenis_kendaraan);


--
-- TOC entry 4225 (class 2606 OID 39447)
-- Name: profil_penghuni profil_penghuni_kode_status_nikah_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_kode_status_nikah_fkey FOREIGN KEY (kode_status_nikah) REFERENCES kode_status_nikah(kode_status_nikah);


--
-- TOC entry 4228 (class 2606 OID 39452)
-- Name: profil_penghuni_lampiran profil_penghuni_lampiran_kode_dokumen_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni_lampiran
    ADD CONSTRAINT profil_penghuni_lampiran_kode_dokumen_fkey FOREIGN KEY (kode_dokumen) REFERENCES kode_dokumen(kode_dokumen);


--
-- TOC entry 4226 (class 2606 OID 39457)
-- Name: profil_penghuni profil_penghuni_nik_jenis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_nik_jenis_fkey FOREIGN KEY (nik_jenis) REFERENCES kode_jenis_nik(kode_jenis_nik);


--
-- TOC entry 4227 (class 2606 OID 39462)
-- Name: profil_penghuni profil_penghuni_pekerjaan_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profil_penghuni
    ADD CONSTRAINT profil_penghuni_pekerjaan_status_fkey FOREIGN KEY (pekerjaan_status) REFERENCES kode_status_pekerjaan(kode_status_pekerjaan);


--
-- TOC entry 4229 (class 2606 OID 39467)
-- Name: registrasi registrasi_kode_jenis_kelamin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi
    ADD CONSTRAINT registrasi_kode_jenis_kelamin_fkey FOREIGN KEY (kode_jenis_kelamin) REFERENCES kode_jenis_kelamin(kode_jenis_kelamin);


--
-- TOC entry 4230 (class 2606 OID 39472)
-- Name: registrasi registrasi_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi
    ADD CONSTRAINT registrasi_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4231 (class 2606 OID 39477)
-- Name: registrasi registrasi_kode_unit_jenis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi
    ADD CONSTRAINT registrasi_kode_unit_jenis_fkey FOREIGN KEY (kode_unit_jenis) REFERENCES kode_unit_jenis(kode_unit_jenis);


--
-- TOC entry 4232 (class 2606 OID 39482)
-- Name: registrasi_lampiran registrasi_lampiran_kode_dokumen_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_lampiran
    ADD CONSTRAINT registrasi_lampiran_kode_dokumen_fkey FOREIGN KEY (kode_dokumen) REFERENCES kode_dokumen(kode_dokumen);


--
-- TOC entry 4233 (class 2606 OID 39487)
-- Name: registrasi_lampiran registrasi_lampiran_no_registrasi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_lampiran
    ADD CONSTRAINT registrasi_lampiran_no_registrasi_fkey FOREIGN KEY (no_registrasi) REFERENCES registrasi(no_registrasi);


--
-- TOC entry 4234 (class 2606 OID 39492)
-- Name: registrasi_penghuni registrasi_penghuni_id_profil_penghuni_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_id_profil_penghuni_fkey FOREIGN KEY (id_profil_penghuni) REFERENCES profil_penghuni(id_profil_penghuni);


--
-- TOC entry 4235 (class 2606 OID 39497)
-- Name: registrasi_penghuni registrasi_penghuni_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4236 (class 2606 OID 39502)
-- Name: registrasi_penghuni registrasi_penghuni_jenis_kelamin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_jenis_kelamin_fkey FOREIGN KEY (jenis_kelamin) REFERENCES kode_jenis_kelamin(kode_jenis_kelamin);


--
-- TOC entry 4237 (class 2606 OID 39507)
-- Name: registrasi_penghuni registrasi_penghuni_nik_jenis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_nik_jenis_fkey FOREIGN KEY (nik_jenis) REFERENCES kode_jenis_nik(kode_jenis_nik);


--
-- TOC entry 4238 (class 2606 OID 39512)
-- Name: registrasi_penghuni registrasi_penghuni_no_registrasi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_no_registrasi_fkey FOREIGN KEY (no_registrasi) REFERENCES registrasi(no_registrasi);


--
-- TOC entry 4239 (class 2606 OID 39517)
-- Name: registrasi_penghuni registrasi_penghuni_tipe_out_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_penghuni
    ADD CONSTRAINT registrasi_penghuni_tipe_out_fkey FOREIGN KEY (tipe_out) REFERENCES kode_tipe_out(kode_tipe_out);


--
-- TOC entry 4240 (class 2606 OID 39522)
-- Name: registrasi_unit registrasi_unit_id_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_unit
    ADD CONSTRAINT registrasi_unit_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES rusun_unit(id_unit);


--
-- TOC entry 4241 (class 2606 OID 39527)
-- Name: registrasi_unit registrasi_unit_no_registrasi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY registrasi_unit
    ADD CONSTRAINT registrasi_unit_no_registrasi_fkey FOREIGN KEY (no_registrasi) REFERENCES registrasi(no_registrasi);


--
-- TOC entry 4243 (class 2606 OID 39532)
-- Name: rusun_blok rusun_blok_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_blok
    ADD CONSTRAINT rusun_blok_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4242 (class 2606 OID 39537)
-- Name: rusun rusun_kode_kantor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun
    ADD CONSTRAINT rusun_kode_kantor_fkey FOREIGN KEY (kode_kantor) REFERENCES kode_kantor(kode_kantor);


--
-- TOC entry 4244 (class 2606 OID 39542)
-- Name: rusun_lantai rusun_lantai_id_rusun_blok_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_lantai
    ADD CONSTRAINT rusun_lantai_id_rusun_blok_fkey FOREIGN KEY (id_rusun_blok) REFERENCES rusun_blok(id_rusun_blok);


--
-- TOC entry 4245 (class 2606 OID 39547)
-- Name: rusun_lantai rusun_lantai_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_lantai
    ADD CONSTRAINT rusun_lantai_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4246 (class 2606 OID 39552)
-- Name: rusun_mgr_setting_db rusun_mgr_setting_db_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_mgr_setting_db
    ADD CONSTRAINT rusun_mgr_setting_db_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4247 (class 2606 OID 39557)
-- Name: rusun_unit rusun_unit_id_lantai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_unit
    ADD CONSTRAINT rusun_unit_id_lantai_fkey FOREIGN KEY (id_lantai) REFERENCES rusun_lantai(id_lantai);


--
-- TOC entry 4248 (class 2606 OID 39562)
-- Name: rusun_unit rusun_unit_kode_unit_jenis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY rusun_unit
    ADD CONSTRAINT rusun_unit_kode_unit_jenis_fkey FOREIGN KEY (kode_unit_jenis) REFERENCES kode_unit_jenis(kode_unit_jenis);


--
-- TOC entry 4249 (class 2606 OID 39567)
-- Name: tarif_air tarif_air_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_air
    ADD CONSTRAINT tarif_air_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4250 (class 2606 OID 39572)
-- Name: tarif_fasilitas tarif_fasilitas_kode_fasilitas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_fasilitas
    ADD CONSTRAINT tarif_fasilitas_kode_fasilitas_fkey FOREIGN KEY (kode_fasilitas) REFERENCES fasilitas(kode_fasilitas);


--
-- TOC entry 4251 (class 2606 OID 39577)
-- Name: tarif_fasilitas tarif_fasilitas_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_fasilitas
    ADD CONSTRAINT tarif_fasilitas_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


--
-- TOC entry 4252 (class 2606 OID 39582)
-- Name: tarif_lantai tarif_lantai_id_lantai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_lantai
    ADD CONSTRAINT tarif_lantai_id_lantai_fkey FOREIGN KEY (id_lantai) REFERENCES rusun_lantai(id_lantai);


--
-- TOC entry 4253 (class 2606 OID 39587)
-- Name: tarif_listrik tarif_listrik_kode_golongan_listrik_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_listrik
    ADD CONSTRAINT tarif_listrik_kode_golongan_listrik_fkey FOREIGN KEY (kode_golongan_listrik) REFERENCES kode_golongan_listrik(kode_golongan_listrik);


--
-- TOC entry 4254 (class 2606 OID 39592)
-- Name: tarif_listrik tarif_listrik_kode_rusun_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tarif_listrik
    ADD CONSTRAINT tarif_listrik_kode_rusun_fkey FOREIGN KEY (kode_rusun) REFERENCES rusun(kode_rusun);


-- Completed on 2021-05-11 21:00:41 WIB

--
-- PostgreSQL database dump complete
--

