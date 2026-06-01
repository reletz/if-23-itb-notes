---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Studi Kasus: Analisis Kapasitas & Beban "Lumpy"
> 
> > ## Questions/Cues
>  >
> > - Skenario Awal (E-commerce)
> >     
> > - Analisis Naif (Rata-rata)
> >     
> > - Analisis Konservatif (50% Rule)
> >     
> > - Konsep "Lumpy Workload"
> >     
> > - Masalah Locking DB
> >     
> > - Solusi Dua Kondisi (State)
> >     
> > - Perhitungan Budget per Task
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3110-12-Performance_Engineering (Pages 19-31)
> >     
> 
> > ### 1. Skenario Kasus (The Requirements)
> >
> > Kita diminta merancang kapasitas sistem monitoring transaksi e-commerce dengan spesifikasi:
> >
> > - **Beban Utama:** 60.000 transaksi/jam (Peak Hour).
> >     
> > - **Alur Proses per Transaksi:**
> >     
> > 	1. Validasi Transaksi.
> > 			
> > 	2. Update Statistik (di memori).
> > 			
> > 	3. Cari Pengecualian/Exceptions.
> > 			
> > - **Beban Tambahan (The "Lumps"):**
> >     
> > 	- _Display Update:_ 5 layar monitoring harus update setiap 10 detik.
> > 			
> > 	- _DB Backup:_ Data di memori disimpan ke SQL Server setiap 10 menit.
> >         
> >
> > ### 2. Analisis Naif (Jebakan Rata-rata)
> >
> > Cara hitung yang salah tapi umum dilakukan pemula:
> >
> > - Matematika:
> >     
> >     $$60.000 \text{ trans/jam} = 1.000 \text{ trans/menit} = 16,7 \text{ trans/detik}.$$$$1 \text{ detik} / 16,7 \approx 60 \text{ ms per transaksi (waktu tersedia)}.$$
> > - Asumsi Salah: "Kita punya 3 fungsi (Validasi, Stats, Exception), jadi bagi rata saja."
> >     
> >     $$60 \text{ ms} / 3 = 20 \text{ ms per fungsi}.$$
> > - **Mengapa Salah?** Ini mengabaikan _Display Update_ dan _DB Backup_. Jika CPU sibuk 100% untuk transaksi, siapa yang mengerjakan update layar dan database? Sistem pasti _crash_ saat tugas tambahan itu berjalan.
> >     
> >
> > ### 3. Analisis Realistis (Alokasi Budget)
> >
> > Kita harus "menyisihkan" jatah CPU untuk tugas tambahan.
> >
> > - **Strategi:** Anggap ada 5 tugas besar (3 fungsi transaksi + 1 Display + 1 DB).
> >     
> > - Perhitungan Baru:
> >     
> >     $$60 \text{ ms} / 5 = 12 \text{ ms per fungsi transaksi}.$$
> >     
> >     Sisa waktu dialokasikan untuk Display dan DB (masing-masing dapat porsi setara 20% kapasitas CPU).
> >     
> >
> > ### 4. Analisis Konservatif (Safety Margin)
> >
> > Slide menyarankan untuk lebih aman lagi dengan **hanya menggunakan 50% kapasitas CPU** (agar sistem tidak _overheat_ saat beban naik sedikit).
> >
> > - Efek: Semua budget dipotong setengah.
> >     
> >     $$12 \text{ ms} \rightarrow 6 \text{ ms per fungsi transaksi}.$$
> > - Penyesuaian Kompleksitas:
> >     
> > 	Diketahui kode "Validasi" ternyata lebih ringan (setengah kompleksitas) dibanding "Update Stats" dan "Exception".
> > 	
> > 	- Total Budget Transaksi = $6+6+6 = 18 \text{ ms}$.
> > 			
> > 	- Rumus: $x (\text{Validasi}) + 2x (\text{Stats}) + 2x (\text{Exception}) = 18$.
> > 			
> > 	- $5x = 18 \rightarrow x = 3,6 \text{ ms}$.
> > 			
> > 	- **Hasil Akhir:** Validasi ($3,6 \text{ ms}$), Stats ($7,2 \text{ ms}$), Exception ($7,2 \text{ ms}$).
> > 			
> >
> > ### 5. Menangani "Lumpy" Workload (Database Lock)
> >
> > Masalah terbesar muncul di tugas "Simpan ke DB setiap 10 menit".
> >
> > - **Masalah:** Proses ini butuh waktu **5 detik** dan bersifat _Synchronized_ (mengunci tabel). Artinya, selama 5 detik ini, fungsi "Update Stats" tidak bisa jalan (karena tabel/memori dikunci).
> >     
> >
> > - **Solusi:** Jangan hitung rata-rata! Pecah analisis menjadi dua kondisi/state:
> >     
> > **Kondisi A: Saat DB Backup Berjalan (Durasi 5 detik)**
> > 
> >   * Budget CPU untuk DB: **Full (Prioritas Utama)**.
> >   * Budget untuk Transaksi: **0 ms** (Sistem "berhenti" sebentar).
> >   * *Konsekuensi:* Transaksi yang masuk selama 5 detik ini harus **ditampung di Buffer (Antrean)**, tidak boleh ditolak.
> > 
> > **Kondisi B: Saat Normal (Durasi 9 menit 55 detik)**
> > 
> >
> >   * Budget Transaksi: Kembali ke $3,6 \text{ ms}$ / $7,2 \text{ ms}$.
> >   * Budget DB: Sisa alokasi waktu digunakan untuk tugas DB non-locking lainnya.
> > 
> > ### 6. Kesimpulan Perancangan
> >
> > Dengan analisis ini, kita menemukan dua kebutuhan arsitektur yang tidak terlihat di awal:
> >
> > 1. Kita butuh algoritma kode yang sangat efisien (hanya $3,6 \text{ ms}$ untuk validasi).
> >     
> > 2. Kita butuh mekanisme **Buffering/Queueing** yang kuat untuk menampung transaksi yang tertahan selama 5 detik setiap 10 menit. Tanpa buffer, data akan hilang.
> >     

> [!cornell] #### Summary
> 
> Studi kasus ini mendemonstrasikan bahwa menghitung kapasitas rata-rata adalah resep kegagalan. Analisis performa yang benar harus memperhitungkan (1) Overhead tugas background, (2) Safety margin (misal 50% idle), (3) Variasi kompleksitas kode, dan (4) Perilaku "Lumpy" di mana sistem mungkin berhenti merespons sesaat (blocking). Solusinya seringkali melibatkan komputasi budget CPU yang ketat dan penambahan mekanisme antrean (buffer).

> [!ad-libitum]- Additional Information: Bedah Perhitungan Matematika
> 
> Mari kita uraikan matematika di balik angka **3,6 ms** yang sering membingungkan di slide 26:
> 
> 1. Total Budget Waktu:
>     
>     Di tahap "Konservatif", kita punya budget dasar 6 ms untuk tiap fungsi transaksi (Validasi, Stats, Exception).
>     
>     Total jatah waktu untuk satu paket transaksi = $6 + 6 + 6 = 18 \text{ ms}$.
>     
> 2. Pembobotan Kompleksitas:
>     
>     Tim developer bilang: "Fungsi Validasi itu enteng, cuma setengah beban fungsi lainnya."
>     
>     Mari kita buat variabel beban $x$.
>     
>     - Validasi = $1x$  
>         
>     - Update Stats = $2x$ (karena 2x lebih berat)
>         
>     - Find Exception = $2x$ (karena 2x lebih berat)
>         
> 3. Persamaan Linear:
>     
>     Total beban harus muat dalam total budget 18 ms.
>     
>     $$1x + 2x + 2x = 18$$$$5x = 18$$$$x = 18 / 5 = 3,6$$
> 4. **Distribusi Akhir:**
>     
>     - Validasi ($1x$) = **3,6 ms**.
>         
>     - Update Stats ($2x$) = $2 \times 3,6$ = **7,2 ms**.
>         
>     - Find Exception ($2x$) = $2 \times 3,6$ = **7,2 ms**.
>         
>     
>     _Inilah target performa yang harus diberikan ke programmer: "Buat fungsi validasi yang selesai dalam 3,6 milidetik!"_
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa membagi rata waktu tersedia (60ms) dengan jumlah fungsi (3) dianggap analisis yang naif?</strong></summary>
> 
> Karena mengabaikan beban dari tugas-tugas background (seperti update display dan backup DB) yang juga memakan resource CPU secara signifikan.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa yang dimaksud dengan "Lumpy Workload" dalam studi kasus ini?</strong></summary>
> 
> Beban kerja yang tidak rata/konstan, melainkan memiliki lonjakan besar sesekali (gumpalan), seperti proses backup database yang memakan resource besar setiap 10 menit.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa konsekuensi arsitektur dari adanya proses "Synchronized DB Update" selama 5 detik?</strong></summary>
> 
> Sistem membutuhkan mekanisme Buffer/Antrean untuk menampung transaksi yang masuk selama 5 detik tersebut karena proses utama terhenti (locked).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Mengapa analisis konservatif menyarankan penggunaan kapasitas CPU hanya 50%?</strong></summary>
> 
> Sebagai Safety Margin untuk menangani ketidakpastian estimasi, lonjakan trafik tak terduga, atau pertumbuhan sistem di masa depan tanpa membuat sistem langsung lumpuh.
> 
> </details>