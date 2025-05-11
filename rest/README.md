# MANUAL SETTING REST API RUSUNAWA

Untuk setting rest api rusunawa ada pada file **.env**

## ENVIRONMENT
Environment bisa di set pada **NODE_ENV** yang berisi *development* atau *production*. Untuk production di set **production**

**Contoh** :

> *NODE_ENV=production*

## DATABASE
Database menggunakan **POSTGRESQL** dengan Setting database ada pada:

- **PGHOST** 
berisi **alamat** *HOST* atau *IP* dari database server.
- **PGPORT**
berisi **port** yang digunakan oleh database server
- **PGDATABASE**
berisi **nama** database yang digunakan.
- **PGUSER**
berisi **nama user** untuk koneksi ke database.
- **PGPASSWORD**
berisi **password** untuk koneksi ke database.

**Contoh** :

> *PGHOST=172.28.108.100*

> *PGPORT=5432*

> *PGDATABASE=rusunawa*

> *PGUSER=rusun_user*

> *PGPASSWORD=user_password*


## PORT REST API
Port yang digunakan oleh rest api rusunawa ini bisa di set pada **REST_PORT** .

**Contoh** :

> *REST_PORT=3241*

## SESSION KEY 
Untuk session menggunakan **JSON WEB TOKEN (JWT)** dengan kata kunci bisa di set di **JWTKEY**.

**Contoh** :

> *JWTKEY=rusun_jwt_key*

## KRIPTOGRAPI
Untuk komunikasi jika *environment* di set ke *production* maka komunikasi ke rest api rusunawa akan menggunakan kriptograpi. Untuk setting kriptograpi ada pada:

- **DH_PRIME**
Berisi nilai  **bilangan prime** yang digunakan pada metode kriptograpi
- **DH_GEN**
Berisi nilai **generator** yang digunakan pada metode kriptograpi'

**Contoh** :

> *DH_PRIME=xA30GVnT2smUHaQ6GMP11mBHTljah6hmtTcKWVFaecM=*

> *DH_GEN=Ag==*

Khusus setting kriptograpi ini harus sama dengan setting kriptograpi yang ada di **UI rusunawa** .

## CAPTCHA
Untuk captcha menggunakan classical captcha dengan pengecekan gambar nilai angka  yang setting terletak pada **CAPTCHA** dengan nilai **Y** untuk pengecekan captcha pada waktu login atau **T** untuk mengabaikan pengecekan captcha pada waktu login.

**Contoh**  :

>  *CAPTCHA=Y*

## Cross-Origin Resource Sharing(_CORS_)

Merupakan mekanisme yang berdasarkan *header HTTP* yang mengindikasikan sumber asala yang **diperbolehkan** untuk mengakses **rest api rusunawa** ini. Settingan unttuk **CORS** ini ada pada:


- **CORS_ORIGIN**
Berisi array **alamat sumber asal** yang diperbolehkan untuk mengakses rest api.
- **CORS_METHODS**
Method-method yang diperbolehkan untuk mengakses rest api.

**Contoh** :

> *CORS_ORIGIN=["http://172.28.108.97:3242", "http://rusunawa.bpjsketenagakerjaan.go.id"]*

> *CORS_METHODS=GET,HEAD,POST,DELETE,PUT*

 Biasanya untuk production (seperti yang lain) rest api / adapter di taruh sama dengan domain UI. 

# CEPH STORAGE

Untuk penyimpanan file, menggunakan **CEPH** yang settingannya ada pada:

- **CEPH_URL**
Berisi **alamat ceph**.
- **CEPH_POST**
Berisi **alamat direktory path** untuk menyimpan file pada ceph storage.
- **CEPH_GET**
Berisi **alamat direktory path** untuk mengambil file dari ceph storage.
- **CEPH_BUCKET**
Berisi **nama bucket** yang sudah didaftarkan di ceph.
- **CEPH_MAXMB**
Berisi **ukuran maksimum** file yang diperbolehkan dalam **MB**.
- **CEPH_KANTOR**
Berisi **kode kantor** yang digunakan untuk penamaan file pada ceph.

**Contoh** :

> *CEPH_URL=http://172.28.108.208:2024*

> *CEPH_POST=put-object*

> *CEPH_GET=*

> *CEPH_BUCKET=rusunawa*

> *CEPH_MAXMB=2*

> *CEPH_KANTOR=41A*


## WS KEPESERTAAN

Digunakan untuk setting  **akses ws internal** yang digunakan untuk pengecekan kepesertaan. Setting ada pada:


- **WS_URL**
Berisi **alamat ws internal**.
- **WS_NPP**
Berisi **alamat direktory path** untuk pengecekan npp.
- **WS_PESERTA**
Berisi **alamat direktory path** untuk pengecekan kpj/ identitas.

**Contoh** :

> *WS_URL=http://172.28.108.34:7003*

> *WS_NPP=/perusahaan/getInformationByNpp*

> *WS_PESERTA=/tk/getInformation*

## TOOLS LAINNYA

Untuk tools yang digunakan pada inisialisasi applikasi ada pada folder **others**.
|Nama                   |Keterangan                                               |
|-----------------------|---------------------------------------------------------|
|hash-pass-rusunawa.js  |`Digunakan untuk create hash password admin awal`        |
|crypto-generator.js    |`Digunakan untuk menggenerate nilai prime dan generator` |
|Daftar Router.xlsx     |`Berisi daftar router yang ada di rest api`              |


## LIBRARI

Untuk menginstall librari yang dipakai oleh rest api ini gunakan perintah **npm install**

