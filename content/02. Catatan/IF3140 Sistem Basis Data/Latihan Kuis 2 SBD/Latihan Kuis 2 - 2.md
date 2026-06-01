_Back to_ [[IF3140 Sistem Basis Data]]

# Problem Set: Penanganan Deadlock

Mata Pelajaran: Sistem Basis Data (Concurrency Control Lanjutan)

Estimasi Waktu: 90-120 menit

Total Nilai: 100 poin (Bobot terdistribusi)

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Mengidentifikasi dan membedakan empat kondisi perlu _deadlock_.
    
2. Menganalisis secara kritis _trade-off_ antara strategi _Deadlock Prevention_, _Avoidance_, dan _Detection_.
    
3. Menguasai mekanisme skema _Deadlock Avoidance_ (Wait-Die, Wound-Wait) dan konsekuensinya (termasuk _starvation_).
    
4. Mampu membangun dan menginterpretasi _Wait-for Graph_ (WFG) untuk mendeteksi siklus _deadlock_.
    
5. Mengevaluasi faktor-faktor dalam _Victim Selection_ dan proses _Deadlock Recovery_.
    
6. Mensintesis dan merekomendasikan strategi penanganan _deadlock_ yang tepat untuk skenario dunia nyata.
    

## Petunjuk Umum

- Bacalah setiap bagian soal dengan teliti.
    
- **Bagian I & II:** Jawablah langsung pada tabel yang disediakan.
    
- **Bagian III:** Jawablah pertanyaan secara analitis dan berikan justifikasi yang kuat untuk setiap poin. Gunakan terminologi yang presisi.
    

## BAGIAN I: Matriks Analisis Strategi & Mekanisme (Total 20 Poin)

**Fokus:** Pemahaman komparatif dan konseptual tingkat tinggi.

### Soal 1. Matriks Perbandingan Strategi Deadlock (10 poin)

**Instruksi:** Tentukan strategi penanganan _deadlock_ (Prevention, Avoidance, Detection) yang paling sesuai dengan setiap pernyataan.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Pernyataan**|**Prevention**|**Avoidance**|**Detection**|
|1|Paling optimis; mengasumsikan _deadlock_ jarang terjadi.||||
|2|Paling pesimis; merancang sistem agar _deadlock_ mustahil terjadi.||||
|3|Melakukan pemeriksaan _safe state_ secara dinamis saat ada permintaan _lock_.||||
|4|Membutuhkan mekanisme _recovery_ (misal: _Victim Selection_).||||
|5|Menyerang salah satu dari 4 kondisi perlu (misal: _Circular Wait_).||||
|6|Menggunakan skema berbasis _timestamp_ (Wait-Die / Wound-Wait).||||
|7|Menggunakan _Wait-for Graph_ untuk menemukan siklus.||||
|8|Cenderung memiliki tingkat konkurensi tertinggi (mengabaikan biaya _recovery_).||||
|9|Cenderung memiliki tingkat konkurensi terendah (karena aturan kaku).||||
|10|Memiliki _overhead_ pada setiap permintaan _lock_ untuk memeriksa _timestamp_.||||

### Soal 2. Matriks Konsep & Mekanisme Deadlock (10 poin)

Instruksi: Tentukan konsep atau mekanisme yang paling tepat untuk setiap deskripsi.

Pilihan:

A. Mutual Exclusion

B. Hold and Wait

C. No Preemption

D. Circular Wait

E. Pre-declaration

F. Total Order

G. Wait-Die

H. Wound-Wait

I. Wait-for Graph (WFG)

J. Victim Selection

|   |   |   |
|---|---|---|
|**No**|**Deskripsi**|**Konsep (A-J)**|
|1|Kondisi: Sebuah transaksi memegang `lock-A` sambil meminta `lock-B`.||
|2|Kondisi: `T1 -> T2 -> T3 -> T1`.||
|3|Metode Pencegahan: Mengharuskan T meminta semua `lock` di awal.||
|4|Metode Pencegahan: Menetapkan `A=1`, `B=2`, `C=3`, dan memaksa T minta `lock` A sebelum B.||
|5|Skema: Ti(Tua) meminta ke Tj(Muda) $\rightarrow$ Ti **MENUNGGU**.||
|6|Skema: Ti(Tua) meminta ke Tj(Muda) $\rightarrow$ Tj di-**ROLLBACK**.||
|7|Skema: Ti(Muda) meminta ke Tj(Tua) $\rightarrow$ Ti **MENUNGGU**.||
|8|Alat Deteksi: Sebuah graf di mana siklus menandakan _deadlock_.||
|9|Proses Pemulihan: Memilih transaksi mana yang akan di-_abort_ untuk memutus siklus.||
|10|Kondisi: `lock` yang dipegang T tidak bisa diambil paksa oleh sistem.||

## BAGIAN II: Analisis Konseptual Benar/Salah (Total 20 Poin)

**Fokus:** Menguji pemahaman mendalam dan nuansa antar konsep.

**Instruksi:** Tentukan apakah setiap pernyataan berikut **BENAR (B)** atau **SALAH (S)**.

|   |   |   |
|---|---|---|
|**No**|**Pernyataan**|**B / S**|
|1|_Deadlock_ hanya dapat terjadi jika keempat kondisi perlu (Mutex, H&W, No Preemption, Circular Wait) terpenuhi secara bersamaan.||
|2|_Mutual Exclusion_ adalah kondisi yang paling ideal untuk dihilangkan guna mencegah _deadlock_.||
|3|Skenario klasik `T1: XL(A), req(B); T2: XL(B), req(A)` adalah contoh terpenuhinya kondisi _Hold and Wait_ dan _Circular Wait_.||
|4|_Deadlock Prevention_ (pencegahan) adalah strategi yang lebih dinamis daripada _Deadlock Avoidance_ (penghindaran).||
|5|Metode _Pre-declaration_ (minta semua _lock_ di awal) menyerang kondisi _Circular Wait_.||
|6|Kelemahan utama metode _Total Order_ adalah sulitnya transaksi memprediksi semua _lock_ yang dibutuhkan di awal.||
|7|_Deadlock Avoidance_ tidak menjamin _deadlock_ tidak akan pernah terjadi, tetapi hanya menguranginya.||
|8|Dalam skema _timestamp_, asumsi `TS(Ti) < TS(Tj)` berarti Ti lebih TUA dari Tj.||
|9|Dalam skema _Wait-Die_, jika Ti(Tua) meminta _lock_ yang dipegang Tj(Muda), Ti akan _rollback_ (Mati).||
|10|Dalam skema _Wound-Wait_, jika Ti(Muda) meminta _lock_ yang dipegang Tj(Tua), Tj akan _rollback_ (Terluka).||
|11|_Wait-Die_ adalah skema _non-preemptive_.||
|12|_Wound-Wait_ cenderung menghasilkan lebih sedikit _rollback_ daripada _Wait-Die_ karena transaksi muda diizinkan menunggu transaksi tua.||
|13|Solusi untuk _starvation_ di skema _timestamp_ adalah memberikan _timestamp_ baru yang lebih muda setiap kali transaksi di-_restart_.||
|14|Di _Wait-for Graph_ (WFG), panah `Ti -> Tj` berarti Ti sedang memegang _lock_ yang ditunggu oleh Tj.||
|15|Jika sebuah WFG tidak memiliki siklus, sistem dijamin bebas dari _deadlock_.||
|16|Menjalankan _deadlock detection_ setiap kali ada transaksi yang menunggu adalah strategi dengan _overhead_ pemeriksaan terendah.||
|17|_Victim Selection_ yang baik akan selalu memilih transaksi yang paling muda (TS terbesar) untuk di-_rollback_.||
|18|_Starvation_ dapat terjadi dalam _Deadlock Recovery_ jika sebuah transaksi yang sama terus-menerus dipilih sebagai _victim_.||
|19|_Partial Rollback_ (menggunakan _savepoint_) lebih kompleks untuk diimplementasikan tetapi lebih efisien daripada _Total Rollback_.||
|20|DBMS komersial modern (seperti PostgreSQL) cenderung menggunakan _Deadlock Avoidance_ (Wait-Die) karena lebih efisien.||

## BAGIAN III: Studi Kasus, Analisis, & Sintesis (Total 60 Poin)

**Fokus:** Aplikasi, analisis, dan sintesis konsep penanganan _deadlock_.

### Soal 3. Analisis Deadlock Detection & Recovery (20 poin)

Tipe: Analisis

Kasus: Sebuah sistem DBMS menggunakan Deadlock Detection. Pada suatu waktu (T), Lock Manager mencatat status berikut:

- **T1:** Memegang `lock-X` pada `Data-A`; Menunggu `lock-S` pada `Data-B`.
    
- **T2:** Memegang `lock-S` pada `Data-B`; Menunggu `lock-X` pada `Data-C`.
    
- **T3:** Memegang `lock-X` pada `Data-C`; Menunggu `lock-X` pada `Data-B`.
    
- **T4:** Memegang `lock-X` pada `Data-E`; Menunggu `lock-X` pada `Data-A`.
    
- **T5:** Memegang `lock-S` pada `Data-F`; Menunggu `lock-X` pada `Data-E`.
    

Pertanyaan:

a. (5 poin) Gambarkan Wait-for Graph (WFG) yang lengkap berdasarkan status sistem di atas.

b. (5 poin) Analisislah WFG tersebut. Apakah terjadi deadlock? Jika ya, sebutkan semua siklus (cycle) yang terbentuk dan transaksi mana saja yang terlibat.

c. (5 poin) Sistem memutuskan melakukan Deadlock Recovery dengan memilih T2 sebagai victim dan melakukan Total Rollback. Jelaskan bagaimana WFG berubah dan siklus mana yang terputus.

d. (5 poin) Sebutkan dua faktor (berdasarkan materi Victim Selection) yang mungkin menjadi alasan sistem TIDAK memilih T1 sebagai victim.

### Soal 4. Studi Kasus Deadlock Avoidance (20 poin)

Tipe: Studi Kasus

Kasus: Sebuah sistem menggunakan skema Deadlock Avoidance berbasis timestamp. Semakin kecil timestamp, semakin TUA transaksi. Diberikan 4 transaksi:

- `TS(T1) = 10`
    
- `TS(T2) = 20`
    
- `TS(T3) = 30`
    
- `TS(T4) = 40`
    

Berikut adalah urutan kejadian yang terjadi secara sekuensial:

1. `T2: XL(A)` (Diberikan)
    
2. `T3: XL(B)` (Diberikan)
    
3. `T1: XL(B)` (Meminta _lock_ yang dipegang T3)
    
4. `T4: XL(A)` (Meminta _lock_ yang dipegang T2)
    
5. `T3: XL(A)` (Meminta _lock_ yang dipegang T2)
    

Pertanyaan:

Analisislah secara rinci apa yang terjadi pada Langkah 3, Langkah 4, dan Langkah 5 jika sistem menerapkan:

a. (8 poin) Skema Wait-Die (Non-preemptive).

b. (8 poin) Skema Wound-Wait (Preemptive).

c. (4 poin) Jelaskan mengapa T4 sangat rentan mengalami starvation dalam skema Wait-Die, dan bagaimana solusi yang tepat untuk mengatasinya?

### Soal 5. Esai Sintesis: Strategi Prevention vs. Detection (20 poin)

Tipe: Esai Sintesis

Skenario: Anda sedang merancang sistem manajemen inventaris gudang. Ada dua operasi utama:

1. **T_Order (Order Fulfillment):** Transaksi singkat, sangat sering terjadi. Harus mengunci (`lock-X`) `ItemStok` dan `LokasiRak` untuk mengurangi stok.
    
2. **T_Audit (Audit Gudang):** Transaksi analitik, sangat lama (berjam-jam). Harus mengunci (`lock-S`) `ItemStok`, `LokasiRak`, dan `DataSupplier` secara bersamaan.
    

Masalah _deadlock_ klasik dapat terjadi jika:

- `T_Order_1`: `XL(ItemStok)`, menunggu `XL(LokasiRak)`
    
- `T_Order_2`: `XL(LokasiRak)`, menunggu `XL(ItemStok)`
    

Tugas (Esai Analisis):

Anda diminta membandingkan dua strategi untuk menangani deadlock antar T_Order ini.

a. (5 poin) Jelaskan bagaimana Deadlock Prevention (menggunakan Total Order, misal: selalu kunci ItemStok dulu baru LokasiRak) dapat menjamin deadlock ini tidak terjadi.

b. (5 poin) Jelaskan bagaimana Deadlock Detection (menggunakan WFG) menangani skenario jika deadlock ini terjadi.

c. (10 poin) Sintesis & Rekomendasi: Bandingkan trade-off (kinerja, konkurensi, kompleksitas implementasi bagi developer) antara strategi (a) dan (b) khusus untuk T_Order. Strategi mana yang akan Anda rekomendasikan untuk menangani deadlock T_Order vs T_Order? Berikan justifikasi yang kuat. (Abaikan T_Audit untuk pertanyaan ini).

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### BAGIAN I: Matriks Analisis Strategi & Mekanisme
> 
> **Soal 1. Matriks Perbandingan Strategi Deadlock**
> 
> |   |   |   |   |   |
> |---|---|---|---|---|
> |**No**|**Pernyataan**|**Prevention**|**Avoidance**|**Detection**|
> |1|Paling optimis; mengasumsikan _deadlock_ jarang terjadi.|||**X**|
> |2|Paling pesimis; merancang sistem agar _deadlock_ mustahil terjadi.|**X**|||
> |3|Melakukan pemeriksaan _safe state_ secara dinamis saat ada permintaan _lock_.||**X**||
> |4|Membutuhkan mekanisme _recovery_ (misal: _Victim Selection_).|||**X**|
> |5|Menyerang salah satu dari 4 kondisi perlu (misal: _Circular Wait_).|**X**|||
> |6|Menggunakan skema berbasis _timestamp_ (Wait-Die / Wound-Wait).||**X**||
> |7|Menggunakan _Wait-for Graph_ untuk menemukan siklus.|||**X**|
> |8|Cenderung memiliki tingkat konkurensi tertinggi (mengabaikan biaya _recovery_).|||**X**|
> |9|Cenderung memiliki tingkat konkurensi terendah (karena aturan kaku).|**X**|||
> |10|Memiliki _overhead_ pada setiap permintaan _lock_ untuk memeriksa _timestamp_.||**X**||
> 
> **Soal 2. Matriks Konsep & Mekanisme Deadlock**
> 
> |   |   |   |
> |---|---|---|
> |**No**|**Deskripsi**|**Konsep (A-J)**|
> |1|Kondisi: Sebuah transaksi memegang `lock-A` sambil meminta `lock-B`.|**B** (Hold and Wait)|
> |2|Kondisi: `T1 -> T2 -> T3 -> T1`.|**D** (Circular Wait)|
> |3|Metode Pencegahan: Mengharuskan T meminta semua `lock` di awal.|**E** (Pre-declaration)|
> |4|Metode Pencegahan: Menetapkan `A=1`, `B=2`, `C=3`, dan memaksa T minta `lock` A sebelum B.|**F** (Total Order)|
> |5|Skema: Ti(Tua) meminta ke Tj(Muda) $\rightarrow$ Ti **MENUNGGU**.|**G** (Wait-Die)|
> |6|Skema: Ti(Tua) meminta ke Tj(Muda) $\rightarrow$ Tj di-**ROLLBACK**.|**H** (Wound-Wait)|
> |7|Skema: Ti(Muda) meminta ke Tj(Tua) $\rightarrow$ Ti **MENUNGGU**.|**H** (Wound-Wait)|
> |8|Alat Deteksi: Sebuah graf di mana siklus menandakan _deadlock_.|**I** (Wait-for Graph)|
> |9|Proses Pemulihan: Memilih transaksi mana yang akan di-_abort_ untuk memutus siklus.|**J** (Victim Selection)|
> |10|Kondisi: `lock` yang dipegang T tidak bisa diambil paksa oleh sistem.|**C** (No Preemption)|
> 
> ### BAGIAN II: Analisis Konseptual Benar/Salah
> 
> |   |   |   |
> |---|---|---|
> |**No**|**Pernyataan**|**B / S**|
> |1|_Deadlock_ hanya dapat terjadi jika keempat kondisi perlu (Mutex, H&W, No Preemption, Circular Wait) terpenuhi secara bersamaan.|**B**|
> |2|_Mutual Exclusion_ adalah kondisi yang paling ideal untuk dihilangkan guna mencegah _deadlock_.|**S** (Ini hampir tidak mungkin dihilangkan karena inheren dengan _locking_ eksklusif).|
> |3|Skenario klasik `T1: XL(A), req(B); T2: XL(B), req(A)` adalah contoh terpenuhinya kondisi _Hold and Wait_ dan _Circular Wait_.|**B**|
> |4|_Deadlock Prevention_ (pencegahan) adalah strategi yang lebih dinamis daripada _Deadlock Avoidance_ (penghindaran).|**S** (_Prevention_ kaku, _Avoidance_ dinamis).|
> |5|Metode _Pre-declaration_ (minta semua _lock_ di awal) menyerang kondisi _Circular Wait_.|**S** (Menyerang _Hold and Wait_).|
> |6|Kelemahan utama metode _Total Order_ adalah sulitnya transaksi memprediksi semua _lock_ yang dibutuhkan di awal.|**S** (Ini kelemahan _Pre-declaration_. Kelemahan _Total Order_ adalah tidak fleksibel).|
> |7|_Deadlock Avoidance_ tidak menjamin _deadlock_ tidak akan pernah terjadi, tetapi hanya menguranginya.|**S** (_Avoidance_ (Wait-Die/Wound-Wait) _menjamin_ deadlock tidak terjadi).|
> |8|Dalam skema _timestamp_, asumsi `TS(Ti) < TS(Tj)` berarti Ti lebih TUA dari Tj.|**B**|
> |9|Dalam skema _Wait-Die_, jika Ti(Tua) meminta _lock_ yang dipegang Tj(Muda), Ti akan _rollback_ (Mati).|**S** (Ti MENUNGGU).|
> |10|Dalam skema _Wound-Wait_, jika Ti(Muda) meminta _lock_ yang dipegang Tj(Tua), Tj akan _rollback_ (Terluka).|**S** (Ti MENUNGGU).|
> |11|_Wait-Die_ adalah skema _non-preemptive_.|**B** (Karena T yang meminta (Ti) yang _rollback_, bukan T yang memegang (Tj)).|
> |12|_Wound-Wait_ cenderung menghasilkan lebih sedikit _rollback_ daripada _Wait-Die_ karena transaksi muda diizinkan menunggu transaksi tua.|**B**|
> |13|Solusi untuk _starvation_ di skema _timestamp_ adalah memberikan _timestamp_ baru yang lebih muda setiap kali transaksi di-_restart_.|**S** (Solusinya adalah memakai _timestamp_ LAMA/ASLI agar ia menjadi "tua").|
> |14|Di _Wait-for Graph_ (WFG), panah `Ti -> Tj` berarti Ti sedang memegang _lock_ yang ditunggu oleh Tj.|**S** (Artinya Ti MENUNGGU Tj).|
> |15|Jika sebuah WFG tidak memiliki siklus, sistem dijamin bebas dari _deadlock_.|**B**|
> |16|Menjalankan _deadlock detection_ setiap kali ada transaksi yang menunggu adalah strategi dengan _overhead_ pemeriksaan terendah.|**S** (Tertinggi. Yang periodik lebih rendah).|
> |17|_Victim Selection_ yang baik akan selalu memilih transaksi yang paling muda (TS terbesar) untuk di-_rollback_.|**S** (Belum tentu. Faktor utamanya adalah biaya _rollback_, jumlah _lock_, dll).|
> |18|_Starvation_ dapat terjadi dalam _Deadlock Recovery_ jika sebuah transaksi yang sama terus-menerus dipilih sebagai _victim_.|**B**|
> |19|_Partial Rollback_ (menggunakan _savepoint_) lebih kompleks untuk diimplementasikan tetapi lebih efisien daripada _Total Rollback_.|**B**|
> |20|DBMS komersial modern (seperti PostgreSQL) cenderung menggunakan _Deadlock Avoidance_ (Wait-Die) karena lebih efisien.|**S** (Cenderung menggunakan _Deadlock Detection_ karena _deadlock_ dianggap jarang terjadi).|
> 
> ### BAGIAN III: Studi Kasus, Analisis, & Sintesis
> 
> Soal 3. Analisis Deadlock Detection & Recovery
> 
> a. Wait-for Graph (WFG):
> 
> * Nodes: T1, T2, T3, T4, T5
> 
> * Edges (Panah):
> 
> * T1 -> T2 (T1 tunggu B dari T2)
> 
> * T2 -> T3 (T2 tunggu C dari T3)
> 
> * T3 -> T2 (T3 tunggu B dari T2)
> 
> * T4 -> T1 (T4 tunggu A dari T1)
> 
> * T5 -> T4 (T5 tunggu E dari T4)
> 
> b. Analisis Deadlock:
> 
> * YA, terjadi deadlock.
> 
> * Siklus 1 (Utama): T2 -> T3 -> T2. Transaksi T2 dan T3 saling menunggu dan deadlock.
> 
> * Siklus 2 (Implisit): T1 -> T2 -> T3 -> T2. Melibatkan T1.
> 
> * Siklus 3 (Implisit): T4 -> T1 -> T2 -> T3 -> T2. Melibatkan T4.
> 
> * Siklus 4 (Implisit): T5 -> T4 -> T1 -> T2 -> T3 -> T2. Melibatkan T5.
> 
> * (Inti dari deadlock adalah siklus T2 -> T3 -> T2. Transaksi lain (T1, T4, T5) terjebak dalam rantai tunggu yang berujung pada siklus tersebut).
> 
> c. Recovery (T2 Victim):
> 
> * T2 di-abort dan melakukan Total Rollback.
> 
> * T2 melepaskan semua lock yang dipegangnya (yaitu lock-S pada Data-B).
> 
> * Perubahan WFG:
> 
> * Panah T1 -> T2 HILANG (karena T1 tidak lagi menunggu B dari T2; T1 akan mendapatkan lock-S pada B).
> 
> * Panah T3 -> T2 HILANG (karena T3 tidak lagi menunggu B dari T2; T3 akan mendapatkan lock-X pada B).
> 
> * Panah T2 -> T3 HILANG (karena T2 di-abort dan tidak lagi menunggu C).
> 
> * Hasil: Siklus T2 -> T3 -> T2 terputus. Deadlock teratasi.
> 
> d. Alasan TIDAK memilih T1:
> 
> * 1. Biaya Rollback: T1 mungkin telah berjalan lebih lama atau memodifikasi lebih banyak data daripada T2, sehingga biaya rollback T1 jauh lebih mahal.
> 
> * 2. Prioritas: T1 mungkin merupakan transaksi dengan prioritas lebih tinggi (misal: transaksi admin) dibandingkan T2 (misal: transaksi pengguna biasa).
> 
> * (Jawaban lain yang diterima: Faktor Starvation, T1 sudah pernah jadi victim sebelumnya).
> 
> **Soal 4. Studi Kasus Deadlock Avoidance**
> 
> - Aturan: Ti(Minta) vs Tj(Pegang). T1(10) < T2(20) < T3(30) < T4(40). (Tua -> Muda).
>     
>     a. Skema Wait-Die (Tua MENUNGGU Muda; Muda MATI lawan Tua):
>     
>     - **Langkah 3:** `T1` (TS=10) meminta `B` dari `T3` (TS=30). (Tua meminta ke Muda).
>         
>         - Hasil: **T1 MENUNGGU**.
>             
>     - **Langkah 4:** `T4` (TS=40) meminta `A` dari `T2` (TS=20). (Muda meminta ke Tua).
>         
>         - Hasil: **T4 MATI (Rollback)**.
>             
>     - **Langkah 5:** `T3` (TS=30) meminta `A` dari `T2` (TS=20). (Muda meminta ke Tua).
>         
>         - Hasil: **T3 MATI (Rollback)**.
>             
> 
> b. Skema Wound-Wait (Tua MELUKAI Muda; Muda MENUNGGU Tua):
> 
> * Langkah 3: T1 (TS=10) meminta B dari T3 (TS=30). (Tua meminta ke Muda).
> 
> * Hasil: T1 MELUKAI T3. T3 di-rollback dan melepaskan lock B. T1 mendapatkan lock B.
> 
> * Langkah 4: T4 (TS=40) meminta A dari T2 (TS=20). (Muda meminta ke Tua).
> 
> * Hasil: T4 MENUNGGU.
> 
> * Langkah 5: T3 (TS=30) meminta A dari T2 (TS=20). (Muda meminta ke Tua).
> 
> * Hasil: T3 MENUNGGU. (Asumsi T3 di-restart dari Langkah 3 dan belum sampai ke langkah ini. Jika T3 restart dan mencoba lagi, ia akan menunggu T2).
> 
> c. Starvation T4 (Wait-Die):
> 
> * T4 adalah transaksi paling MUDA (TS=40). Dalam skema Wait-Die, setiap kali T4 meminta lock yang dipegang oleh transaksi yang lebih TUA (T1, T2, atau T3), T4 akan "MATI" (di-rollback). Jika T4 terus-menerus bertemu lock yang dipegang transaksi tua, T4 tidak akan pernah selesai.
> 
> * Solusi: Ketika T4 di-restart setelah rollback, T4 harus tetap menggunakan timestamp aslinya (TS=40). Ini penting. Meskipun T4 akan tetap rollback jika bertemu T1/T2/T3, seiring T1/T2/T3 selesai, T4 akhirnya akan menjadi transaksi "paling tua" yang aktif di sistem dan dijamin akan selesai.
> 
> Soal 5. Esai Sintesis: Strategi Prevention vs. Detection
> 
> a. Deadlock Prevention (Total Order):
> 
> * Strategi ini menyerang kondisi Circular Wait. Kita menetapkan urutan total pada sumber daya, misal: ItemStok = 1, LokasiRak = 2.
> 
> * Sistem memaksa semua transaksi (T_Order) untuk meminta lock hanya dalam urutan tersebut.
> 
> * T_Order WAJIB meminta XL(ItemStok) terlebih dahulu, baru kemudian meminta XL(LokasiRak).
> 
> * Skenario deadlock T_Order_2 (pegang LokasiRak, minta ItemStok) menjadi mustahil secara struktural, karena T_Order_2 akan dipaksa meminta ItemStok (1) sebelum LokasiRak (2).
> 
> * Dampak pada Developer: Ini memindahkan beban penanganan deadlock dari DBMS ke developer. Developer harus tahu dan mematuhi urutan locking ini di kode aplikasi mereka. Jika mereka salah urutan, aplikasi gagal.
> 
> b. Deadlock Detection (WFG):
> 
> * Strategi ini membiarkan developer meminta lock dalam urutan apapun (misal: T_Order_1 minta Stok->Rak, T_Order_2 minta Rak->Stok).
> 
> * Ketika skenario deadlock terjadi, WFG akan membentuk siklus: T_Order_1 -> T_Order_2 -> T_Order_1.
> 
> * Sistem DBMS (bukan developer) akan menjalankan algoritma deteksi (misal: setiap 1 detik).
> 
> * Ketika siklus ditemukan, DBMS secara otomatis melakukan Recovery: memilih satu T_Order sebagai victim (misal: T_Order_2), me-rollback (abort) transaksi tersebut, dan melepaskan lock-nya.
> 
> * T_Order_1 kemudian mendapatkan lock dan selesai. T_Order_2 akan di-restart oleh aplikasi.
> 
> c. Sintesis & Rekomendasi:
> 
> * Trade-off:
> 
> * Prevention (Total Order):
> 
> * Kinerja/Konkurensi: Sedikit mengurangi konkurensi karena memaksa urutan, tapi tidak ada biaya runtime check atau rollback. Kinerja sangat prediktabel.
> 
> * Kompleksitas: Kompleksitas tinggi bagi developer (harus hafal dan patuh urutan).
> 
> * Detection (WFG):
> 
> * Kinerja/Konkurensi: Konkurensi tertinggi (membolehkan urutan fleksibel). Namun, kinerja tidak prediktabel karena adanya biaya deteksi (periodik) dan biaya recovery (rollback T_Order yang mahal).
> 
> * Kompleksitas: Kompleksitas nol bagi developer (DBMS menangani semua).
> 
> * Rekomendasi: Untuk skenario ini (transaksi T_Order yang sangat sering terjadi dan kritis), Deadlock Prevention (Total Order) adalah pilihan yang lebih superior.
> 
> * Justifikasi:
> 
> 1. Prediktabilitas Kinerja: T_Order adalah transaksi inti. Kita tidak bisa menerima T_Order random di-rollback (seperti pada Detection), yang menyebabkan pengalaman pengguna buruk (pesanan gagal tanpa alasan jelas). Prevention menjamin T_Order tidak akan pernah gagal karena deadlock.
> 
> 2. Biaya Rollback vs. Disiplin: Biaya rollback sebuah order (batal bayar, kembalikan stok) lebih mahal daripada biaya mendisiplinkan developer untuk selalu mengunci ItemStok sebelum LokasiRak.
> 
> 3. Kesederhanaan Aturan: Aturannya sederhana ("selalu kunci Stok dulu"). Ini adalah overhead implementasi yang wajar untuk menjamin tidak ada deadlock pada proses bisnis inti. Detection lebih cocok jika urutan lock tidak dapat diprediksi, tapi di sini urutannya sangat prediktabel.