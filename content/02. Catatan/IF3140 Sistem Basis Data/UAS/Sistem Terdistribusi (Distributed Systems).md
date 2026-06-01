---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Sistem Terdistribusi (Distributed Systems)
> 
> > ## Questions/Cues
> >
> > - Apa itu **Distributed System**?
> >     
> > - Apa beda _Paralel_ vs _Terdistribusi_?
> >     
> > - Apa itu **Homogeneous** Distributed Database?
> >     
> > - Apa itu **Heterogeneous** Distributed Database?
> >     
> > - Apa beda **Local Transaction** vs **Global Transaction**?
> >     
> > - Apa 3 **Keuntungan** (Advantages) sistem terdistribusi?
> >     
> > - Apa 4 **Kerugian** (Disadvantages) sistem terdistribusi?
> >     
> > - Apa isu implementasi utama?
> >     
> > - Apa itu **Two-Phase Commit (2PC)**?
> >     
> > - Apa itu **LAN** vs **WAN**?
> >     
> >
> > ## Reference Points
> >
> > - Slides "13 - Database System Architectures.pdf" (Slide 33-38)
> 
> >
> > ### Distributed Systems (Sistem Terdistribusi)
> > 
> > ![[Pasted image 20251218232321.png]]
> >
> > **Distributed System** adalah sistem di mana data tersebar di banyak mesin (disebut _sites_ atau _nodes_) yang terhubung oleh jaringan. Mesin-mesin ini bisa jadi terpisah secara geografis (antar kota atau negara).
> >
> > - **Perbedaan Paralel vs Terdistribusi**:
> >     
> >     - **Paralel**: Node-node terhubung oleh jaringan _berkecepatan sangat tinggi_ (seperti _hypercube_), terletak _berdekatan_ (dalam satu rak/data center), dan _bekerja sama_ untuk satu tugas. Tujuannya: **Performa**.
> >         
> >     - **Terdistribusi**: Node-node terhubung oleh jaringan _berkecepatan lebih rendah_ (internet/WAN), terletak _berjauhan_, dan seringkali _independen_ (otonom). Tujuannya: **Berbagi data** dan **Ketersediaan (Availability)**.
> >         
> >
> > ### Jenis Distributed Database
> >
> > 1. **Homogeneous (Homogen)**
> >     
> > 	- Semua *site* menjalankan **software DBMS yang sama** (misal: semua pakai Oracle).
> > 	- Skema datanya sama (atau kompatibel).
> > 	- Tujuan: Terlihat seperti satu database tunggal raksasa bagi pengguna, padahal datanya tersebar.
> > 
> >
> > 2. **Heterogeneous (Heterogen)**
> >     
> > 	- *Site* yang berbeda menjalankan **software DBMS yang berbeda** (misal: Site A pakai Oracle, Site B pakai MySQL, Site C pakai MongoDB).
> > 	- Seringkali ini adalah database warisan (*legacy*) yang ingin digabungkan.
> > 	- Tujuan: Mengintegrasikan data dari berbagai sumber agar bisa di-query bersama.
> > 
> >
> > ### Transaksi: Local vs. Global
> >
> > - **Local Transaction**: Transaksi yang mengakses data _hanya_ di satu _site_ (site tempat transaksi itu dimulai).
> >     
> > - **Global Transaction**: Transaksi yang mengakses data di _site_ yang berbeda, atau di beberapa _site_ sekaligus.
> >     
> >     - Contoh: Transfer antar bank. Mengurangi saldo di database Bank A (Site A), menambah saldo di database Bank B (Site B).
> >         
> >
> > ### Trade-Offs (Keuntungan & Kerugian)
> >
> > **Keuntungan (Advantages):**
> >
> > 1. **Sharing Data**: Pengguna di Site A bisa mengakses data di Site B.
> >     
> > 2. **Autonomy (Otonomi)**: Setiap _site_ tetap memiliki kontrol penuh atas data yang disimpannya secara lokal.
> >     
> > 3. **Availability (Ketersediaan)**: Jika data direplikasi (disalin) ke _site_ lain, sistem bisa tetap berjalan meskipun satu _site_ mati.
> >     
> >
> > **Kerugian (Disadvantages):**
> >
> > 1. **Kompleksitas**: Sangat kompleks untuk memastikan koordinasi antar _site_ berjalan benar.
> >     
> > 2. **Biaya Pengembangan**: Software untuk ini sangat mahal untuk dibuat.
> >     
> > 3. **Potensi Bug**: Lebih banyak _bug_ karena banyaknya interaksi.
> >     
> > 4. **Processing Overhead**: Ada _overhead_ tambahan dari komunikasi jaringan dan protokol koordinasi.
> >     
> >
> > ### Isu Implementasi & Tipe Jaringan
> >
> > - **Atomicity**: Tantangan terbesar. Bagaimana jika _global transaction_ berhasil di Site A tapi _gagal_ di Site B? (Misal: uang terdebet tapi tidak ter-kredit).
> >     
> >     - **Solusi**: **Two-Phase Commit (2PC)**. Protokol ini menggunakan "koordinator" untuk memastikan _semua_ _site_ setuju untuk `commit` atau `abort` bersama-sama.
> >         
> > - **Distributed Concurrency Control**: Perlu mekanisme _lock_ yang bekerja antar _site_ (sangat kompleks).
> >     
> > - **Data Replication**: Perlu mekanisme untuk menjaga data yang disalin tetap sinkron.
> >     
> >
> > **Tipe Jaringan:**
> >
> > - **LAN (Local-Area Network)**: Jaringan area lokal (misal: satu gedung). Cepat, reliabel. (Sering dipakai untuk _Parallel System_).
> >     
> > - **WAN (Wide-Area Network)**: Jaringan area luas (misal: internet, antar kota). Lebih lambat, kurang reliabel. (Khas untuk _Distributed System_).
> >     

> [!cornell] #### Summary
> 
> **Sistem Terdistribusi (Distributed System) menyebarkan data di berbagai** _**site**_ **yang terpisah secara geografis dan terhubung oleh jaringan (biasanya WAN). Tujuannya adalah untuk berbagi data (sharing), otonomi (autonomy), dan ketersediaan tinggi (availability). Sistem ini bisa Homogen (semua DBMS sama) atau Heterogen (DBMS berbeda). Tantangan terbesarnya adalah kompleksitas dalam mengelola Global Transaction (yang mengakses banyak site), di mana Atomicity harus dijamin menggunakan protokol seperti Two-Phase Commit (2PC).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Two-Phase Commit (2PC) dalam 5 Menit
> 
> 2PC adalah protokol klasik untuk mencapai _atomic commit_ dalam sistem terdistribusi.
> 
> **Aktor**: 1 **Koordinator** (memulai transaksi), banyak **Peserta** (database lain).
> 
> **Fase 1: Voting Phase (Fase Voting)**
> 
> 1. **Koordinator**: Melakukan semua pekerjaan lokal, lalu mengirim pesan `prepare` ke semua Peserta. (Artinya: "Hei, kalian semua siap `commit`?").
>     
> 2. **Peserta**: Menerima `prepare`. Ia akan mengecek apakah ia _bisa_ `commit`.
>     
>     - Jika bisa, ia menulis _log_ `ready` ke _stable storage_ (penting!) dan mengirim balasan `ready` ke Koordinator.
>         
>     - Jika tidak bisa (misal: _lock_ gagal), ia mengirim balasan `abort`.
>         
> 
> Fase 2: Decision Phase (Fase Keputusan)
> 
> 3. Koordinator: Mengumpulkan semua balasan.
> 
> - Jika SEMUA Peserta membalas ready -> Koordinator memutuskan COMMIT.
> 
> - Jika SATU SAJA Peserta membalas abort (atau timeout) -> Koordinator memutuskan ABORT.
> 
> 4. Koordinator: Menulis keputusannya (commit atau abort) ke log-nya, lalu mengirim pesan keputusan itu ke semua Peserta.
> 
> 5. Peserta: Menerima keputusan. Mereka wajib mengikutinya. Jika pesannya commit, mereka commit. Jika abort, mereka abort.
> 
> **Masalah**: 2PC itu _blocking_. Jika Koordinator _crash_ setelah Fase 1 tapi sebelum Fase 2, semua Peserta yang sudah membalas `ready` akan "tergantung", tidak tahu harus `commit` atau `abort`, dan mereka harus menunggu Koordinator hidup kembali.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 20.4.
>     
> - **Konsep**: "Two-Phase Commit (2PC) Protocol", "CAP Theorem" (Sistem terdistribusi hanya bisa memilih 2 dari 3: Consistency, Availability, Partition Tolerance).
>