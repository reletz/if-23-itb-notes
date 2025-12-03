---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Algoritma Election (Pemilihan Koordinator)
> 
> > ## Questions/Cues
> >
> > - **Definisi & Tujuan Election**
> >     
> > - **Asumsi Dasar (Unique ID)**
> >     
> > - **Bully Algorithm (Mekanisme Lengkap)**
> >     
> > - **Analisis Bully (Traffic & Flapping)**
> >     
> > - **Ring Algorithm (Logika Sirkular)**
> >     
> > - **Optimasi Chang & Roberts**
> >     
> > - **Masalah Split Brain**
> >     
> > - **Solusi Network Partitioning**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-20-Mutex-2022.pdf (Halaman 23-38)
> >     
> > - Fokus: Menentukan Leader/Koordinator
> >     
> 
> > ### 1. Masalah Election dalam Sistem Terdistribusi
> >
> > Banyak algoritma terdistribusi (seperti _Centralized Mutual Exclusion_, _Primary-Backup Replication_, atau _GFS Master_) tidak simetris; mereka membutuhkan satu node khusus yang bertindak sebagai **Koordinator**, **Leader**, atau **Master**.
> >
> > - **Masalah:** Apa yang terjadi jika Koordinator tersebut mati (crash)? Sistem akan macet.
> >     
> > - **Solusi:** Sistem harus bisa menunjuk pengganti secara otomatis tanpa intervensi manusia. Proses ini disebut **Election**.
> >     
> > - **Kriteria Pemenang:** Biasanya proses dengan **Identifier (ID) Tertinggi** (atau terendah, tergantung konvensi) dipilih sebagai koordinator baru. ID bisa berupa IP Address, MAC Address, atau nomor urut proses.
> >     
> > - **Asumsi:** Setiap proses tahu ID proses lain, tapi tidak tahu apakah mereka hidup atau mati.
> >     
> >
> > ### 2. The Bully Algorithm (Algoritma Penindas)
> >
> > Algoritma klasik karya Garcia-Molina (1982). Disebut "Bully" karena proses dengan ID besar "menindas" proses ID kecil untuk membatalkan pencalonan mereka.
> >
> > Mekanisme Deteksi & Pemilihan:
> > 
> > Misalkan Proses P mendeteksi Koordinator mati (timeout saat request).
> >
> > 1. **P Menggelar Pemilihan:** P mengirim pesan `ELECTION` ke semua proses yang memiliki **ID > P**.
> >     
> > 2. **Respon:**
> >     
> > 	- **Skenario A (Ada yang lebih kuat):** Jika ada proses Q (ID > P) yang menjawab `OK`, maka P "kalah" dan mundur. P menunggu Q mengumumkan pemenang.
> > 			
> > 	- **Skenario** B (P **paling kuat):** Jika tidak ada yang menjawab setelah batas waktu (timeout), P menganggap semua proses ID tinggi sudah mati. P mengangkat dirinya sendiri.
> > 			
> > 3. **Pengambilalihan (Takeover):** Pemenang mengirim pesan `COORDINATOR` ke semua proses (baik ID tinggi maupun rendah) untuk memberitahu bahwa dia adalah bos baru.
> >     
> >
> > **Kelemahan:**
> >
> > - **Message Traffic:** Pada worst case (node ID terendah sadar leader mati), pesan berantai membanjiri jaringan ($O(N^2)$).
> >     
> > - **Flapping:** Jika node ID tertinggi labil (mati-hidup-mati-hidup), ia akan terus menerus memicu election baru segera setelah hidup, mengganggu stabilitas sistem.
> >     
> >
> > ### 3. Ring Algorithm (Algoritma Cincin)
> >
> > Algoritma ini menyusun proses dalam struktur cincin logis (_logical ring_), di mana setiap proses tahu siapa suksesornya.
> >
> > **Mekanisme:**
> >
> > 1. Proses P sadar koordinator mati $\rightarrow$ Buat pesan `ELECTION` berisi list `[P]`. Kirim ke tetangga.
> >     
> > 2. **Sirkulasi Pesan:** Setiap penerima menambahkan ID-nya ke list pesan (`[P, Q, R...]`) dan meneruskan ke tetangga berikutnya.
> >     
> > 	- _Handling Crash:_ Jika tetangga mati, lewati (skip) ke node berikutnya di cincin sampai ketemu yang hidup.
> > 			
> > 3. **Penentuan Pemenang:** Saat pesan kembali ke pengirim awal (P), list tersebut berisi semua ID proses yang **hidup**.
> >     
> > 4. **Pengumuman:** P mencari ID terbesar dalam list, menetapkannya sebagai Koordinator, dan mengirim pesan `COORDINATOR` berisi ID pemenang keliling cincin.
> >     
> >
> > ### 4. Optimasi Chang & Roberts (Cincin Hemat Pesan)
> >
> > Algoritma Ring standar boros karena pesan membesar (list ID). Optimasi ini membunuh kandidat lemah di tengah jalan.
> >
> > - **Aturan:** Pesan `ELECTION` hanya membawa **satu ID** (kandidat terkuat saat ini).
> >     
> > - Saat Proses Q menerima `ELECTION(ID_P)`:
> >     
> > 	1. **Jika ID_P > ID_Q:** Teruskan pesan. (P lebih layak jadi bos daripada Q).
> > 			
> > 	2. **Jika ID_P < ID_Q:** **Matikan pesan P**. Ganti dengan pesan `ELECTION(ID_Q)` dan kirim. (Q mengkudeta P).
> > 			
> > 	3. **Jika ID_P == ID_Q:** Pesan sudah keliling satu putaran tanpa ada yang mengkudeta. Q menang! $\rightarrow$ Umumkan `COORDINATOR`.
> > 			
> > - **Efisiensi:** Mengurangi trafik karena pesan dari node ID kecil tidak akan berputar penuh.
> >     
> >
> > ### 5. Masalah Split Brain & Network Partitioning
> >
> > Ini adalah mimpi buruk dalam election. Terjadi jika jaringan putus di tengah, membagi cluster menjadi dua kubu (Partisi A dan Partisi B) yang tidak bisa saling kontak.
> >
> > - **Skenario:**
> >     
> > 	- Partisi A merasa Leader lama (di Partisi B) mati $\rightarrow$ Memilih Leader A.
> > 			
> > 	- Partisi B merasa Leader lama masih hidup (atau memilih Leader B).
> > 			
> > 	- **Hasil:** Ada dua Leader aktif (**Split Brain**). Jika keduanya menerima perintah tulis ke database yang sama, data akan korup/konflik (_divergent state_).
> > 			
> > - **Solusi Mitigasi:**
> >     
> > 	- **Quorum/Majority Rule:** Syarat jadi Leader harus didukung $> 50\%$ total node. Dalam partisi 2 bagian, hanya satu bagian yang mungkin punya mayoritas. Bagian minoritas akan sadar diri dan berhenti melayani request.
> > 			
> > 	- **Redundant Link:** Gunakan kabel jaringan cadangan atau jalur serial khusus untuk "ping" cek status (Heartbeat network).
> > 			

> [!cornell] #### Summary
> 
> Election Algorithm bertujuan memilih satu proses unik sebagai koordinator (biasanya ID tertinggi) saat koordinator lama gagal. Bully Algorithm menggunakan pendekatan agresif (flooding) yang cepat namun boros pesan. Ring Algorithm menggunakan topologi cincin yang lebih teratur namun bergantung pada pemeliharaan struktur cincin. Masalah terberat election adalah Split Brain akibat Network Partitioning, di mana dua leader terpilih bersamaan; solusi utamanya adalah mekanisme Quorum (butuh suara mayoritas) untuk mencegah sisi minoritas mengangkat leader ilegal.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Analisis Kinerja (Bully vs Ring)
> 
> - **Bully Algorithm:**
>     
>     - Latency: Rendah (bisa 1 RTT jika ID tertinggi kedua yang memulai).
>         
>     - Bandwidth: Tinggi ($O(N^2)$ worst case).
>         
> - **Ring Algorithm:**
>     
>     - Latency: Tinggi (pesan harus keliling cincin, $2N$ messages).
>         
>     - Bandwidth: Rendah dan deterministik.
>         
> 
> #### STONITH (Shoot The Other Node In The Head)
> 
> Dalam sistem High Availability (HA), jika terjadi Split Brain, leader baru seringkali menggunakan mekanisme STONITH untuk mematikan paksa (reboot/power off) server leader lama melalui hardware switch khusus. Ini untuk menjamin leader lama benar-benar mati dan tidak mengacak-acak data.
> 
> #### Sumber & Referensi:
> 
> - **Paper:** H. Garcia-Molina, "Elections in a Distributed Computing System", IEEE Trans. Comput., 1982.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa Algoritma Bully disebut memiliki masalah "Flapping" jika node ID tertinggi tidak stabil?</strong></summary>
> 
> Jika node ID tertinggi (Boss) hidup-mati berulang kali: Setiap kali ia hidup, ia akan segera mem-bully node lain dan mengambil alih kekuasaan. Sesaat kemudian ia mati lagi, memicu election baru. Proses pergantian kepemimpinan yang terus menerus ini menghabiskan resource sistem dan membuat layanan tidak stabil.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Dalam Optimasi Chang & Roberts, apa yang dilakukan sebuah node jika menerima pesan election dengan ID yang lebih KECIL dari ID-nya sendiri?</strong></summary>
> 
> Node tersebut tidak akan meneruskan pesan itu. Sebaliknya, ia akan "memakan" pesan tersebut (menghentikan sirkulasinya) dan menggantinya dengan pesan election baru yang berisi ID dirinya sendiri, lalu mengirimkannya ke tetangga. Ini karena ia tahu dirinya kandidat yang lebih baik daripada pengirim pesan sebelumnya.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Bagaimana aturan "Majority Vote" (Quorum) mencegah terjadinya Split Brain?</strong></summary>
> 
> Dengan aturan Majority Vote, seseorang hanya bisa menjadi Leader jika mendapatkan > 50% suara dari total node dalam cluster. Jika jaringan terbelah dua (misal 5 node terbagi jadi 3 dan 2), hanya sisi yang punya 3 node yang bisa membentuk quorum. Sisi dengan 2 node tidak akan pernah mencapai suara mayoritas, sehingga tidak akan bisa memilih Leader tandingan.
> 
> </details>