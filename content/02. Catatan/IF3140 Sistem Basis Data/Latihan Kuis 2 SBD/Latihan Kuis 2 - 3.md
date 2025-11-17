_Back to_ [[IF3140 Sistem Basis Data]]

# Problem Set: Analisis Concurrency Control & Deadlock

Mata Pelajaran: Sistem Basis Data

Estimasi Waktu: 60 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Menganalisis dan membedakan jadwal (schedule) yang mematuhi Two-Phase Locking (2PL) dan Strict 2PL.
    
2. Mengevaluasi dampak dari _cascading rollback_ dalam sebuah skenario transaksi.
    
3. Membangun dan menginterpretasi _Wait-for Graph_ (WFG) untuk mendeteksi adanya _deadlock_.
    
4. Mengaplikasikan skema _deadlock avoidance_ (Wait-Die dan Wound-Wait) pada studi kasus yang diberikan.
    
5. Mensintesis dan merekomendasikan strategi penanganan _deadlock_ (prevention, avoidance, detection) untuk sebuah skenario dunia nyata.
    

## Petunjuk Umum

- Bacalah setiap studi kasus dan skenario dengan teliti.
    
- Jawablah setiap pertanyaan dengan jelas dan berikan justifikasi yang kuat berdasarkan konsep yang telah dipelajari.
    
- Untuk soal analisis jadwal, perhatikan setiap operasi (Read, Write, Lock, Unlock, Commit, Abort).
    
- Gunakan terminologi yang presisi (misal: _lock point_, _timestamp_, _victim selection_).
    

## BAGIAN I: Analisis Skenario & Studi Kasus (75 poin)

**Fokus:** Application dan Analysis - Menerapkan konsep ke situasi baru.

### Soal 1. Studi Kasus: Analisis Two-Phase Locking (2PL) (25 poin)

**Kasus:** Diberikan dua buah jadwal (S1 dan S2) yang melibatkan transaksi T1 dan T2. Data item yang diakses adalah E dan F.

Jadwal S1:

> T1: XL(E); W(E); UL(E); T2: XL(E); W(E); XL(F); W(F); T1: Abort; T2: Commit; UL(E); UL(F);

Jadwal S2:

> T1: XL(E); W(E); T2: XL(E); (Wait); T1: XL(F); W(F); T1: Commit; UL(E); UL(F); T2: (Grant); W(E); T2: Commit; UL(E);

Pertanyaan:

a. (10 poin) Analisislah S1. Apakah S1 mematuhi protokol 2PL? Apakah S1 mematuhi protokol Strict 2PL? Jelaskan justifikasi Anda.

b. (10 poin) Apa konsekuensi dari T1: Abort pada S1? Fenomena apa yang terjadi, dan mengapa ini merugikan?

c. (5 poin) Analisislah S2. Protokol apa yang dipatuhi oleh S2 (2PL, Strict 2PL, atau Rigorous 2PL)? Jelaskan mengapa S2 dapat mencegah masalah yang terjadi pada S1.

### Soal 2. Analisis Deteksi: Wait-for Graph (WFG) (25 poin)

**Kasus:** Sebuah sistem basis data menggunakan _Deadlock Detection_ dengan _Wait-for Graph_ (WFG). Pada satu waktu (T), status sistem adalah sebagai berikut:

- **T1:** Sedang memegang _lock-X_ pada item `F` dan sedang menunggu (_request_) _lock-S_ pada item `G`.
    
- **T2:** Sedang memegang _lock-S_ pada item `G` dan sedang menunggu (_request_) _lock-X_ pada item `H`.
    
- **T3:** Sedang memegang _lock-X_ pada item `H` dan sedang menunggu (_request_) _lock-X_ pada item `G`.
    
- **T4:** Sedang memegang _lock-S_ pada item `I` dan sedang menunggu (_request_) _lock-X_ pada item `F`.
    
- **T5:** Sedang memegang _lock-X_ pada item `J`.
    

Pertanyaan:

a. (10 poin) Gambarkan Wait-for Graph (WFG) berdasarkan status sistem di atas.

b. (10 poin) Analisislah WFG tersebut. Apakah terjadi deadlock di dalam sistem? Jika ya, sebutkan siklus (cycle) yang terbentuk dan transaksi mana saja yang terlibat.

c. (5 poin) Jika terjadi deadlock, dan sistem memutuskan T3 sebagai victim untuk di-rollback, jelaskan bagaimana recovery tersebut memutus siklus deadlock.

### Soal 3. Studi Kasus: Analisis Deadlock Avoidance (25 poin)

**Kasus:** Sebuah sistem menggunakan skema _Deadlock Avoidance_ berbasis _timestamp_ (TS). Semakin kecil nilai TS, semakin tua transaksi tersebut. Diberikan tiga transaksi dengan _timestamp_ berikut:

- `TS(T1) = 10`
    
- `TS(T2) = 20`
    
- `TS(T3) = 30`
    

Perhatikan urutan kejadian berikut yang terjadi secara sekuensial:

1. `T2` meminta dan mendapatkan `lock-X` pada item `A`.
    
2. `T3` meminta dan mendapatkan `lock-X` pada item `B`.
    
3. `T1` meminta `lock-X` pada item `B` (yang sedang dipegang `T3`).
    
4. `T3` meminta `lock-X` pada item `A` (yang sedang dipegang `T2`).
    

Pertanyaan:

Analisislah apa yang akan terjadi pada Kejadian 3 dan Kejadian 4 jika sistem menerapkan:

a. (10 poin) Skema Wait-Die.

b. (10 poin) Skema Wound-Wait.

c. (5 poin) Skema mana yang cenderung menghasilkan lebih banyak rollback dalam skenario ini? Jelaskan.

## BAGIAN II: Esai Sintesis (25 poin)

**Fokus:** Synthesis dan Evaluation - Integrasi konsep dan pemikiran kritis.

### Soal 4. Esai Sintesis: Memilih Strategi Penanganan Deadlock (25 poin)

**Skenario:** Anda adalah seorang Arsitek Basis Data yang ditugaskan untuk merancang sistem _core banking_ baru. Dua kebutuhan utama dari klien adalah:

1. **Konsistensi Data Kritis:** Transaksi (transfer, debit, kredit) tidak boleh gagal di tengah jalan atau menyebabkan data tidak konsisten.
    
2. **Ketersediaan Tinggi (High Availability):** Sistem tidak boleh "freeze" atau berhenti merespons, bahkan untuk beberapa detik.
    

Klien Anda khawatir tentang _deadlock_. Anda harus menjelaskan tiga pendekatan utama (Prevention, Avoidance, Detection) dan memberikan rekomendasi.

Instruksi:

Tuliskan esai analisis (sekitar 200-300 kata) yang membandingkan trade-off dari:

1. **Deadlock Prevention** (misal: menggunakan _Total Order_ pada sumber daya)
    
2. **Deadlock Avoidance** (misal: menggunakan _Wound-Wait_)
    
3. **Deadlock Detection** (misal: menggunakan WFG dan _victim selection_)
    

Dalam esai Anda, fokuslah pada dampaknya terhadap **kinerja, konkurensi, dan kompleksitas implementasi**. Akhiri esai Anda dengan **rekomendasi** strategi mana (atau kombinasi strategi) yang paling cocok untuk sistem _core banking_ tersebut, dan berikan justifikasi yang kuat untuk pilihan Anda.

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I
> 
> **Soal 1:**
> 
> - **a. (10 poin) Analisis S1:**
>     
>     - **2PL:** S1 **MEMATUHI** 2PL.
>         
>         - T1: _Growing phase_ (XL(E)), _Shrinking phase_ (UL(E)). _Lock point_ setelah XL(E).
>             
>         - T2: _Growing phase_ (XL(E), XL(F)), _Shrinking phase_ (UL(E), UL(F)). _Lock point_ setelah XL(F).
>             
>         - Kedua transaksi memiliki fase _growing_ dan _shrinking_ yang terpisah. (5 poin)
>             
>     - **Strict 2PL:** S1 **TIDAK MEMATUHI** Strict 2PL.
>         
>         - _Strict 2PL_ mengharuskan _lock-X_ (Eksklusif) ditahan sampai transaksi _commit_ atau _abort_.
>             
>         - T1 melepaskan _lock-X_ pada E (`UL(E)`) **sebelum** ia _Abort_. Ini adalah pelanggaran _Strict 2PL_. (5 poin)
>             
> - **b. (10 poin) Konsekuensi S1:**
>     
>     - Ketika T1 _Abort_, operasinya (`W(E)`) harus dibatalkan (_rollback_).
>         
>     - **Masalah:** T2 telah membaca (`XL(E)` juga berarti R(E)) dan menulis (`W(E)`) data E yang "kotor" (_dirty read/write_) yang ditinggalkan oleh T1.
>         
>     - **Fenomena:** Ini menyebabkan **Cascading Rollback**. Karena T2 telah beroperasi pada data tidak valid dari T1, T2 juga **WAJIB** di-_rollback_ untuk menjaga konsistensi, meskipun T2 sudah _Commit_. (10 poin)
>         
> - **c. (5 poin) Analisis S2:**
>     
>     - S2 mematuhi **Strict 2PL** (dan juga **Rigorous 2PL** karena semua _lock_ ditahan).
>         
>     - T1 menahan semua _lock_-nya (`XL(E)`, `XL(F)`) sampai ia _Commit_. T2 baru diizinkan mendapatkan _lock_ pada E **setelah** T1 selesai.
>         
>     - Ini mencegah masalah _dirty read_ yang terlihat di S1. Jika T1 _Abort_ di S2, tidak ada transaksi lain yang terpengaruh. (5 poin)
>         
> 
> **Soal 2:**
> 
> - **a. (10 poin) Wait-for Graph:**
>     
>     - (Wajib ada gambar/deskripsi node dan panah)
>         
>     - Nodes: T1, T2, T3, T4, T5
>         
>     - Edges (Panah):
>         
>         - `T1 -> T2` (T1 menunggu G yang dipegang T2)
>             
>         - `T2 -> T3` (T2 menunggu H yang dipegang T3)
>             
>         - `T3 -> T2` (T3 menunggu G yang dipegang T2)
>             
>         - `T4 -> T1` (T4 menunggu F yang dipegang T1)
>             
> - **b. (10 poin) Analisis Deadlock:**
>     
>     - **YA, terjadi deadlock.**
>         
>     - Terdapat siklus yang melibatkan T1, T2, T3, dan T4.
>         
>     - Siklus utamanya adalah **`T1 -> T2 -> T3 -> T2`** (ini adalah siklus, T2 dan T3 saling tunggu) dan **`T4 -> T1 -> T2 -> ...`**.
>         
>     - _Self-correction:_ Mari kita lihat lebih dekat.
>         
>         - T1 -> T2 (karena G)
>             
>         - T2 -> T3 (karena H)
>             
>         - T3 -> T2 (karena G)
>             
>         - T4 -> T1 (karena F)
>             
>     - Siklus yang paling jelas adalah **`T2 -> T3 -> T2`**. Ini adalah _deadlock_ antara T2 dan T3. (5 poin)
>         
>     - Ada juga siklus yang lebih besar: **`T1 -> T2 -> T3 -> T2`** (redundan) dan **`T4 -> T1 -> T2 -> T3 -> T2`** (redundan).
>         
>     - Fokus pada siklus `T2 -> T3 -> T2` sudah cukup untuk membuktikan _deadlock_. (5 poin)
>         
> - **c. (5 poin) Recovery (T3 Victim):**
>     
>     - Jika T3 dipilih sebagai _victim_, T3 akan di-_abort_ dan di-_rollback_.
>         
>     - Akibatnya, T3 melepaskan semua _lock_ yang dipegangnya (termasuk `lock-X` pada H).
>         
>     - Ini memutus panah `T2 -> T3` (karena T2 akan mendapatkan _lock_ H).
>         
>     - Ini juga memutus panah `T3 -> T2` (karena T3 tidak lagi menunggu G).
>         
>     - Siklus `T2 -> T3 -> T2` terputus, dan _deadlock_ teratasi. (5 poin)
>         
> 
> **Soal 3:**
> 
> - **a. (10 poin) Skema Wait-Die (Non-preemptive):**
>     
>     - _Aturan: Ti (minta) vs Tj (pegang). Jika TS(Ti) < TS(Tj) (Tua minta ke Muda), Ti MENUNGGU. Jika TS(Ti) > TS(Tj) (Muda minta ke Tua), Ti MATI (rollback)._
>         
>     - **Kejadian 3:** `T1` (TS=10) meminta `B` yang dipegang `T3` (TS=30).
>         
>         - TS(T1) < TS(T3). Tua minta ke Muda.
>             
>         - Hasil: **T1 MENUNGGU**.
>             
>     - **Kejadian 4:** `T3` (TS=30) meminta `A` yang dipegang `T2` (TS=20).
>         
>         - TS(T3) > TS(T2). Muda minta ke Tua.
>             
>         - Hasil: **T3 MATI (di-rollback)**.
>             
> - **b. (10 poin) Skema Wound-Wait (Preemptive):**
>     
>     - _Aturan: Ti (minta) vs Tj (pegang). Jika TS(Ti) < TS(Tj) (Tua minta ke Muda), Ti MELUKAI (wound) Tj (Tj rollback). Jika TS(Ti) > TS(Tj) (Muda minta ke Tua), Ti MENUNGGU._
>         
>     - **Kejadian 3:** `T1` (TS=10) meminta `B` yang dipegang `T3` (TS=30).
>         
>         - TS(T1) < TS(T3). Tua minta ke Muda.
>             
>         - Hasil: **T1 MELUKAI T3. T3 di-rollback** dan melepaskan _lock B_. T1 mendapatkan _lock B_.
>             
>     - **Kejadian 4:** `T3` (TS=30) meminta `A` yang dipegang `T2` (TS=20).
>         
>         - TS(T3) > TS(T2). Muda minta ke Tua.
>             
>         - Hasil: **T3 MENUNGGU**. (Namun, jika Kejadian 3 terjadi lebih dulu, T3 sudah di-rollback dan tidak akan sampai ke Kejadian 4).
>             
> - **c. (5 poin) Perbandingan:**
>     
>     - Dalam skenario ini, **Wait-Die** menghasilkan 1 _rollback_ (T3 mati) dan 1 _wait_ (T1 menunggu).
>         
>     - **Wound-Wait** juga menghasilkan 1 _rollback_ (T3 dilukai).
>         
>     - Secara umum, _Wait-Die_ sering dianggap menghasilkan lebih banyak _rollback_ karena transaksi "Muda" yang aktif meminta akan langsung "Mati", sementara di _Wound-Wait_, transaksi "Muda" diizinkan menunggu yang "Tua".
>         
> 
> ### Bagian II
> 
> **Soal 4:**
> 
> - **(25 poin) Rubrik Esai Sintesis:**
>     
>     - **Perbandingan Prevention (5 poin):** Menjelaskan _Prevention_ (misal: _Total Order_) dengan benar. Menyebutkan keunggulannya (jaminan tidak ada _deadlock_) dan kelemahannya (kaku, sangat mengurangi konkurensi, tidak praktis untuk skenario dinamis).
>         
>     - **Perbandingan Avoidance (5 poin):** Menjelaskan _Avoidance_ (misal: _Wait-Die/Wound-Wait_) dengan benar. Menyebutkan keunggulannya (lebih dinamis dari _prevention_) dan kelemahannya (_overhead_ tinggi karena setiap _request_ dicek, _starvation_).
>         
>     - **Perbandingan Detection (5 poin):** Menjelaskan _Detection_ (WFG) dengan benar. Menyebutkan keunggulannya (konkurensi tertinggi, optimis) dan kelemahannya (membiarkan _deadlock_ terjadi, biaya _rollback/victim selection_).
>         
>     - **Rekomendasi & Justifikasi (10 poin):**
>         
>         - **Rekomendasi yang baik:** Mengusulkan **kombinasi** dari **Strict 2PL** (untuk Konsistensi Kritis / mencegah _cascading rollback_) DENGAN **Deadlock Detection** (untuk Ketersediaan Tinggi).
>             
>         - **Justifikasi:**
>             
>             - _Strict 2PL_ adalah wajib untuk sistem _banking_ untuk memastikan data tidak "kotor" dan _commit_ bersifat atomik.
>                 
>             - _Detection_ dipilih di atas _Prevention/Avoidance_ karena: (1) _Deadlock_ dalam sistem yang dirancang baik (seperti _banking_ yang transaksinya singkat) sebenarnya **jarang terjadi**. (2) _Overhead_ dari _Avoidance_ pada setiap _lock request_ akan membunuh kinerja (Ketersediaan Tinggi), sementara _Detection_ (dijalankan periodik) lebih murah. (3) Sistem "freeze" karena _deadlock_ (masalah _detection_) lebih baik ditangani dengan _rollback_ korban yang cepat daripada "freeze" karena _overhead_ _avoidance_ yang konstan.
                

## Tips Pengerjaan untuk Peserta

### Strategi Umum:

1. **Baca semua soal terlebih dahulu** - Alokasikan waktu Anda. Soal 1, 2, dan 3 adalah analisis skenario, sementara soal 4 adalah sintesis.
    
2. **Pahami instruksi** - Perhatikan kata kunci: "analisis", "gambarkan WFG", "apa yang terjadi (Wait-Die vs Wound-Wait)", "bandingkan trade-off".
    
3. **Kelola waktu:**
    
    - Bagian I (3 Soal): ~45 menit (~15 menit per soal)
        
    - Bagian II (1 Esai): ~15 menit
        
    - Review: (Waktu sisa)
        

### Strategi Per Bagian:

- **Bagian I:**
    
    - **Soal 1:** Buat tabel atau garis waktu untuk melacak status _lock_ (Growing/Shrinking) dan status _commit_ (kapan _lock-X_ dilepas).
        
    - **Soal 2:** Gunakan pendekatan sistematis. Buat daftar semua _node_ (transaksi). Lalu, untuk setiap transaksi yang _waiting_, gambarkan panah DARI dia KE transaksi yang memegang _lock_. Cari siklus tertutup.
        
    - **Soal 3:** Tuliskan aturan Wait-Die dan Wound-Wait di kertas coretan Anda. Aplikasikan aturan (TS(Minta) vs TS(Pegang)) secara ketat untuk setiap kejadian.
        
- **Bagian II (Esai):**
    
    - Struktur esai Anda: (1) Intro singkat. (2) Paragraf Prevention (Pro/Con). (3) Paragraf Avoidance (Pro/Con). (4) Paragraf Detection (Pro/Con). (5) Paragraf Rekomendasi (Pilihan + Justifikasi Kuat).
        

### Red Flags untuk Dihindari:

- ❌ Tertukar antara 2PL dan Strict 2PL. Ingat: Strict 2PL = Tahan _lock-X_ sampai _commit/abort_.
    
- ❌ Tertukar antara Wait-Die dan Wound-Wait. Ingat: **W**ound-**W**ait = **Tua** "melukai" **Muda**. **W**ait-**D**ie = **Muda** "mati" saat bertemu **Tua**.
    
- ❌ Menggambar WFG secara tidak akurat. Panah **SELALU** dari (yang Menunggu) -> (yang Memegang).
    
- ❌ Memberikan rekomendasi di Soal 4 tanpa justifikasi yang mengaitkannya kembali ke kebutuhan klien (Konsistensi vs Ketersediaan).
    

## Sumber Belajar yang Direkomendasikan

- Catatan "Pengantar Concurrency Control dan Jenis Kunci.md"
    
- Catatan "Two-Phase Locking.md"
    
- Catatan "Konsep dan Deadlock Prevention.md"
    
- Catatan "Deadlock Avoidance.md"
    
- Catatan "Deteksi dan Deadlock Recovery.md"