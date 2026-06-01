---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic: Karakteristik Sistem Kompleks & Studi Kasus Microsoft
> 
> > ## Questions/Cues
> >
> > - Mengapa sistem kompleks rentan?
> >     
> > - Kegagalan besar vs kecil
> >     
> > - Flaws & Biaya Realistis
> >     
> > - Bias Hindsight (Post-mortem)
> >     
> > - Safety sebagai Properti Sistem
> >     
> > - Mitos "Root Cause" Tunggal
> >     
> > - Kasus Azure 2018
> >     
> > - Integritas vs Ketersediaan
> >     
> > - Fenomena Retry Storm
> >     
> >
> > ## Reference Points
> >
> > - Karakteristik Sistem Kompleks.pdf
> >     
> 
> > ### 1. Sifat Inherent Sistem Kompleks
> >
> > Definisi: Sistem kompleks pada dasarnya penuh risiko karena menangani persoalan yang juga berisiko. Kegagalan bukan anomali, melainkan karakteristik bawaan.
> > 
> > Perlindungan: Sistem didesain dengan "benteng" seperti backup, training staf, dan alat pengaman. Namun, perlindungan ini seringkali hanya mampu menangani masalah kecil yang terisolasi.
> > 
> > Kegagalan Katastropik: Kegagalan besar tidak pernah disebabkan oleh satu pemicu tunggal, melainkan kombinasi unik dari beberapa kegagalan kecil yang terjadi secara berurutan (efek domino).
> >
> > ### 2. Filosofi Flaws (Celah) dan Praktisi
> >
> > Celah yang Mustahil Ditutup: Sistem kompleks akan selalu berjalan dengan celah (flaws). Menutup semua kemungkinan kegagalan memerlukan biaya yang tidak realistis dan hampir mustahil secara teknis.
> > 
> > Peran Manusia: Sistem tetap bisa berjalan karena adanya praktisi (manusia) yang adaptif dan aktif menghindari kegagalan di tengah kondisi yang tidak menentu.
> >
> > ### 3. Bias dalam Aktivitas Post-Mortem
> >
> > Hindsight Bias: Setelah kegagalan terjadi, penilai cenderung menganggap insiden tersebut "bodoh" atau mudah dihindari. Ini terjadi karena penilai sudah tahu hasilnya (outcome), sehingga pandangannya tidak lagi murni.
> > 
> > Sistem vs Praktisi: Keamanan (Safety) adalah properti dari sistem, bukan individu. Jika praktisi melakukan kesalahan, itu berarti sistem gagal mencegah atau memungkinkan kesalahan tersebut terjadi.
> > 
> > Mitos Root Cause: Mencari satu "penyebab utama" adalah kesalahan logika dalam sistem kompleks. Realitanya, selalu ada jaringan penyebab yang saling terkait.
> >
> > ### 4. Studi Kasus: Outage Microsoft South Central US (2018)
> >
> > Kronologi: Badai petir → Lonjakan listrik → Sistem pendingin mati → Suhu server naik → Sistem otomatis mematikan hardware (untuk lindungi data) → Layanan Azure mati total selama 21+ jam.
> > 
> > Ketergantungan Tersembunyi: Meskipun masalah di Texas, layanan global seperti Marketplace dan Dashboard ikut mati karena dependensi yang tidak terlihat di wilayah tersebut.
> > 
> > Trade-off Integritas Data: Microsoft memilih mematikan hardware (downtime lama) daripada membiarkannya tetap nyala dan berisiko merusak data secara fisik. Di sini, Integritas Data > Ketersediaan Layanan.
> >
> > ### 5. Hambatan Pemulihan: Retry Storm
> >
> > Saat sistem mulai pulih, jutaan klien mencoba terhubung kembali secara bersamaan. Lonjakan koneksi ini menciptakan **Retry Storm** (Badai Percobaan Ulang) yang membebani server yang baru bangkit, sehingga proses pemulihan menjadi jauh lebih lambat.

> [!cornell] #### Summary
> 
> Sistem Kompleks dicirikan oleh kerentanan inheren di mana kegagalan besar muncul dari akumulasi kegagalan-kegagalan kecil yang tak terduga. Kita harus berhenti menyalahkan individu (hindsight bias) dan menyadari bahwa Safety adalah tanggung jawab desain sistem. Kasus Microsoft 2018 membuktikan bahwa otomatisasi memiliki batas, ketergantungan antar-komponen seringkali tersembunyi, dan dalam skenario ekstrem, menjaga integritas data seringkali lebih diprioritaskan daripada ketersediaan layanan meskipun harus membayar harga dengan downtime yang panjang.

> [!ad-libitum]- Additional Information: Pendalaman Teknis
> 
> #### Teori Swiss Cheese Model
> 
> Dalam keamanan sistem, kegagalan kompleks sering digambarkan dengan **Swiss Cheese Model**. Setiap lapis perlindungan (backup, aturan, alat) diibaratkan sebagai irisan keju Swiss yang memiliki lubang (celah). Kegagalan besar terjadi hanya ketika lubang-lubang pada setiap lapisan tersebut sejajar secara sempurna, memungkinkan sebuah ancaman menembus seluruh pertahanan.
> 
> #### Data Sovereignty & Redundancy
> 
> Mengapa Microsoft tidak langsung memindahkan data ke region lain saat Texas mati? Karena aturan **Kedaulatan Data**. Banyak data pelanggan yang secara hukum tidak boleh keluar dari wilayah geografis tertentu. Ini menciptakan batasan pada desain redundansi, memaksa backup harus berada di zona yang sama, yang sayangnya juga rentan terkena bencana alam yang sama.
> 
> #### Analisis Retry Storm (Teknis)
> 
> Secara teknis, _retry storm_ adalah bentuk tidak sengaja dari _Distributed Denial of Service_ (DDoS). Solusi teknis untuk ini biasanya melibatkan **Exponential Backoff** (menambah jeda waktu percobaan ulang) dan **Jitter** (menambahkan delay acak agar tidak semua klien menembak server di milidetik yang sama).
> 
> #### Sumber & Referensi Lanjutan:
> 
> - _Microsoft Azure Post-Mortem Report_: South Central US Outage 2018.
>     
> - _Cook, R. I. (1998)_: "How Complex Systems Fail" (Fondasi teori kegagalan sistem).
>     
> - _Sydney Dekker_: "The Field Guide to Understanding Human Error".
>     