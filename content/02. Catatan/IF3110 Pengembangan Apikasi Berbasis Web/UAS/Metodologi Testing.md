type: Note

cssclasses:

- cornell-notes
    

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Usability Testing Methodologies
> 
> > ## Questions/Cues
> 
> > - Formative vs Summative
> >     
> > - Masalah "User Gap"
> >     
> > - Aturan "5 Users"
> >     
> > - Kurva Nielsen
> >     
> > - Kondisi Tes Ideal
> >     
> > - Key Metrics (Waktu & Kebingungan)
> >     
> > - Masalah "Ayam & Telur"
> >     
> 
> > ## Reference Points
> 
> > - Slides: IF3110-14-Usability-Test-and-Monitoring (Pages 7-17)
> >     
> > - "Discount Usability Testing" Theory
> >     
> 
> > ### Jenis Pengujian Usability
> 
> > Pengujian adalah aktivitas mengamati pengguna melakukan tugas nyata.
> 
> > 1. **Formative Testing:**
> >     
> >     - _Waktu:_ Selama proses pengembangan (iteratif).
> >         
> >     - _Tujuan:_ Mendiagnosa dan memperbaiki masalah (Fixing problems).
> >         
> >     - _Skala:_ Studi kecil, berulang-ulang.
> >         
> > 2. **Summative Testing:**
> >     
> >     - _Waktu:_ Saat produk hampir/sudah selesai.
> >         
> >     - _Tujuan:_ Menetapkan tolak ukur (baseline metrics) validasi kebutuhan.
> >         
> >     - _Skala:_ Butuh jumlah sampel besar untuk validitas statistik.
> >         
> 
> > ### Mengapa Perlu Testing? (The Gap)
> 
> > Terjadi kesenjangan pengalaman (_Experience Gap_) yang membesar:
> 
> > - Aplikasi web semakin kompleks (dulu teks, sekarang Rich Internet Apps/JS/Flash).
> >     
> > - Pengguna awam semakin banyak (kurang canggih dibanding developer).
> >     
> > - _Dampak:_ Fitur "keren" menurut developer bisa jadi mimpi buruk bagi pengguna. Beda itu buruk jika menambah klik/waktu. Setiap klik tambahan = 50% peluang user pergi.
> >     
> 
> > ### Aturan "5 Users" (Discount Usability Testing)
> 
> > Jakob Nielsen menemukan bahwa Anda tidak butuh 50 orang untuk menemukan masalah usability utama.
> 
> > - **Kurva Penemuan:**
> >     
> >     - 0 user = 0 wawasan.
> >         
> >     - 1 user = Menemukan 1/3 masalah (lonjakan wawasan tertinggi).
> >         
> >     - **5 user = Menemukan ~85% masalah.**
> >         
> > - **Logika:** Setelah user ke-5, Anda hanya akan melihat masalah yang sama berulang kali (_diminishing returns_).
> >     
> > - **Strategi:** Lebih baik lakukan tes kecil (5 orang) tapi sering (iteratif setiap revisi desain), daripada satu tes besar di akhir.
> >     
> 
> > ### Kondisi & Alur Tes Ideal
> 
> > 1. **Subjek:** Representatif (sesuai target market, bukan sesama developer).
> >     
> > 2. **Tugas (Task):** Skenario nyata (misal: "Cari forum dan posting pertanyaan", bukan "Klik tombol A").
> >     
> > 3. **Lingkungan:** Tenang, tanpa bantuan developer (biarkan mereka bingung).
> >     
> > 4. **Observasi:** One-way mirror atau rekaman video untuk analisis ekspresi/frustrasi.
> >     
> 
> > ### Key Questions saat Observasi
> 
> > Fokus pada data perilaku, bukan opini:
> 
> > - Berapa lama waktu yang dibutuhkan?
> >     
> > - Apakah mereka _stuck_ (macet) di langkah tertentu?
> >     
> > - Apakah mereka terlihat bingung menentukan langkah selanjutnya?
> >     
> > - _Catatan:_ Jika user pertama gagal total, hentikan tes, perbaiki software, baru lanjut ke user kedua. Jangan buang waktu menguji software yang jelas-jelas rusak.
> >     
> 
> > ### Masalah "Ayam dan Telur" (Insentif)
> 
> > Pada aplikasi sosial (seperti Forum/Marketplace), usability buruk jika konten kosong.
> 
> > - _Masalah:_ Tidak ada user karena tidak ada konten. Tidak ada konten karena tidak ada user.
> >     
> > - _Solusi:_ **Sistem Insentif**.
> >     
> > - _Contoh Amazon:_ Amazon ingin review banyak tapi tidak mau bayar. Solusinya: Gamifikasi ("Reviewer Rank", "Top 1000 Reviewer"). Pengguna bekerja gratis demi status sosial/reputasi.
> >     

> [!cornell] #### Summary
> 
> Usability Testing paling efektif dilakukan secara formatif (selama pengembangan) dengan pendekatan "Discount Usability": cukup 5 pengguna untuk mengungkap 85% masalah. Kuncinya adalah observasi perilaku pengguna asli tanpa intervensi developer, melihat di mana mereka bingung atau terhambat. Untuk aplikasi berbasis komunitas, desain sistem insentif diperlukan untuk mengatasi masalah konten kosong ("ayam dan telur").

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Mengapa 5 User? (Poisson Distribution)
> 
> Rumus Nielsen didasarkan pada model probabilitas Poisson:
> 
> $$N(1 - (1 - L)^n)$$
> 
> - $N$ = Total masalah usability dalam desain.
>     
> - $L$ = Proporsi masalah yang ditemukan oleh satu user (rata-rata 31%).
>     
> - $n$ = Jumlah user.
>     
> 
> Dengan rumus ini, saat $n=5$, persentase masalah yang ditemukan mendekati 85%. Menambah user ke-6, ke-7 dst hanya memberikan info baru yang sangat sedikit (kurva melandai).
> 
> #### A/B Testing
> 
> Dokumen ini fokus pada _Qualitative Usability Testing_ (Observasi). Di era modern, ini sering dilengkapi dengan _Quantitative Testing_ seperti A/B Testing, di mana dua versi live (Versi A dan Versi B) diadu secara statistik untuk melihat mana yang menghasilkan konversi lebih tinggi.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa "Different is Bad" dalam konteks navigasi web?</strong></summary>
> 
> Karena jika navigasi berbeda dari standar umum, pengguna membutuhkan waktu ekstra untuk belajar, dan setiap klik ekstra meningkatkan risiko pengguna meninggalkan situs (abandonment rate) sebesar 50%.
> 
> </details>

> <details>
> 
> <summary><strong>2. Kapan sebaiknya kita menghentikan tes sebelum mencapai 5 user?</strong></summary>
> 
> Jika user pertama mengalami pengalaman "bencana" (disastrous/stuck total). Lebih baik perbaiki dulu bug kritis tersebut sebelum melanjutkan ke subjek tes berikutnya.
> 
> </details>

> <details>
> 
> <summary><strong>3. Apa yang dimaksud dengan "Discount Usability Testing"?</strong></summary>
> 
> Metode pengujian hemat biaya yang dipopulerkan Nielsen, di mana pengujian cukup dilakukan dengan segelintir peserta (biasanya 5) untuk mendapatkan hasil optimal (85% masalah), alih-alih studi skala besar yang mahal.
> 
> </details>

> <details>
> 
> <summary><strong>4. Bagaimana Amazon memecahkan masalah "Chicken and Egg" pada fitur review mereka?</strong></summary>
> 
> Dengan memberikan penghargaan non-moneter berupa "Reviewer Rank" dan lencana status. Ini memotivasi pengguna untuk menulis konten (review) demi reputasi.
> 
> </details>