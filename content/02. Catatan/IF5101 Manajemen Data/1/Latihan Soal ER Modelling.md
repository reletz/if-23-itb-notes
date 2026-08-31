_Back to_ [[IF5101 Manajemen Data]]

Diketahui deskripsi basis data sistem layanan kependudukan nasional sebagai berikut.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Sebuah sistem layanan kependudukan nasional menyimpan data penduduk yang terdiri atas NIK (unik), nama, tanggal lahir, umur (dihitung berdasarkan tanggal lahir), jenis kelamin, alamat (terdiri atas jalan, RT, RW, kelurahan, kecamatan, kabupaten/kota, provinsi), agama, status pernikahan, pekerjaan, kewarganegaraan, dan golongan darah. Sistem ini juga menyimpan data layanan yang terdiri atas id layanan (unik), nama layanan, dan deskripsi layanan. Setiap layanan tergolong dalam kategori layanan. Untuk setiap kategori layanan diketahui id kategori layanan (unik), nama kategori, dan deskripsi kategori tersebut.

Penduduk yang ingin menggunakan sistem layanan ini harus mendaftar sebagai pengguna dengan menggunakan email sebagai identitas unik. Pengguna harus menyediakan juga password dan nomor telepon (bisa lebih dari satu nomor). Seorang penduduk hanya boleh terdaftar tepat sebagai satu pengguna dan pengguna berasosiasi dengan seorang penduduk. Tidak semua penduduk terdaftar sebagai pengguna, tapi seorang pengguna pasti seorang penduduk. Seorang pengguna dapat merupakan seorang petugas, yaitu petugas kementerian yang mengurusi layanan kependudukan, termasuk melayani permintaan penduduk. Selain memiliki data yang sama seperti pengguna biasa, disimpan juga NIP (nomor induk pegawai, unik untuk setiap petugas) dan keahliannya (bisa lebih dari satu). Ada juga jenis pengguna lain, yaitu auditor. Auditor adalah pengguna yang melakukan monitoring terhadap kegiatan permintaan layanan. Untuk setiap auditor disimpan nomor surat tugasnya dan kualifikasinya. Seorang petugas tidak boleh menjadi auditor, demikian pula seorang auditor dipastikan bukan petugas. Tidak semua pengguna harus menjadi auditor atau petugas.

Sistem ini melayani permintaan layanan dari penduduk di seluruh negeri (penduduk yang meminta layanan harus terdaftar sebagai pengguna). Untuk setiap permintaan layanan dicatat: tanggal permintaan layanan, pengguna yang meminta layanan, layanan yang diminta. Ketiga informasi ini unik untuk setiap data permintaan layanan, artinya dalam sehari seorang pengguna hanya boleh meminta suatu jenis layanan (tapi dia bisa meminta layanan yang berbeda di hari yang sama). Selain ketiga informasi tadi, dicatat juga deskripsi layanan yang diminta, url penyimpanan file-file pendukung, tanggal selesai pelayanan permintaan, jumlah hari (dihitung sebagai selisih antara tanggal permintaan layanan dan tanggal selesai pelayanan). Dicatat juga petugas mana saja yang bertanggung jawab terhadap permintaan layanan tersebut. Seorang petugas bisa bertugas pada lebih dari satu permintaan layanan (walaupun bisa juga belum pernah tercatat bertugas, misalnya karena petugas baru) dan sebuah permintaan layanan dilayani oleh satu atau lebih petugas. Untuk setiap keterlibatan petugas dalam sebuah permintaan layanan, dicatat deskripsi tugasnya dan jumlah jam yang digunakan untuk melakukan tugasnya. 

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Buatlah diagram ER untuk persoalan di atas dengan menggunakan teknik pemodelan ER sesuai standar yang digunakan di kelas. Buat asumsi-asumsi (yang masuk akal dan tidak berlebihan) jika ada bagian soal yang kurang jelas dan tuliskan dalam jawaban. Jika ada constraints yang tidak dapat dimodelkan dengan menggunakan ER, tuliskan dengan jelas dalam jawaban Anda.

Jawab:
![[Pasted image 20260827082733.png]]

JUJUR SEGITIGA-NYA KEBALIK

## Asumsi yang Digunakan

1. Pengguna dimodelkan sebagai spesialisasi (IS A) dari Penduduk, bukan entity terpisah, karena Pengguna secara konsep adalah Penduduk yang sama dengan peran tambahan.
2. Primary key formal untuk Pengguna, Petugas, dan Auditor tetap NIK (diwariskan dari Penduduk), sedangkan email dan NIP hanya berstatus candidate key.
3. Partisipasi Layanan dalam relasi `tergolong` diasumsikan total (setiap layanan pasti punya kategori), sedangkan Kategori_Layanan diasumsikan partial (kategori boleh belum punya layanan).
4. `Permintaan_Layanan` dimodelkan sebagai weak entity dengan discriminator `tanggal_permintaan`, diidentifikasi oleh dua identifying relationship N:1 (`diajukan_oleh` ke Pengguna dan `untuk_layanan` ke Layanan), sehingga atribut NIK dan id_layanan tidak dicatat ulang di dalamnya karena sudah terwakili lewat relationship tersebut.
5. `url_file_pendukung` diasumsikan atribut tunggal (satu lokasi penyimpanan), bukan multivalued.
6. `keahlian` (Petugas) diasumsikan atribut multivalued berupa teks bebas, tanpa keterkaitan eksplisit ke entity Kategori_Layanan.

## Constraint yang Tidak Dapat Dimodelkan dengan ER

1. Constraint temporal `tanggal_selesai ≥ tanggal_permintaan` tidak bisa dinyatakan dalam ER, perlu CHECK constraint di level DDL.
2. Status email dan NIP sebagai candidate/alternate key tidak punya simbol baku di notasi ER kelas ini (hanya primary key yang bisa digarisbawahi).
3. ER tidak mendukung batas kardinalitas minimum-maksimum eksplisit (misalnya "maksimal 3 petugas per permintaan"), hanya mendukung one/many dan total/partial.