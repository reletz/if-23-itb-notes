---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell]  Isu-Isu Kritis dalam Decision Tree Learning (DTL)
> 
> > ## Questions/Cues
> >
> > - Apa itu algoritma DTL?
> >     
> > - Apa itu `PLURALITY-VALUE`?
> >     
> > - Apa saja isu-isu utama dalam DTL?
> >     
> > - Apa itu Overfitting?
> >     
> > - Mengapa Overfitting berbahaya?
> >     
> > - Bagaimana cara mengatasi Overfitting?
> >     
> > - Apa itu Pre-Pruning?
> >     
> > - Apa itu Post-Pruning?
> >     
> > - 3 cara menentukan ukuran tree?
> >     
> > - Apa itu Reduced Error Pruning?
> >     
> > - Apa itu Rule Post-Pruning (C4.5)?
> >     
> > - Mengapa mengubah tree menjadi _rules_?
> >     
> > - Apa saja tipe-tipe atribut data?
> >     
> > - Perbedaan Interval vs Ratio Scaled?
> >     
> > - Perbedaan Nominal vs Ordinal?
> >     
> > - Perbedaan Biner Simetris vs Asimetris?
> >     
> > - Bagaimana DTL menangani atribut kontinu?
> >     
> > - Apa itu Discretization?
> >     
> > - Bagaimana cara memilih _threshold_?
> >     
> > - Bagaimana DTL menangani nilai yang _missing_?
> >     
> > - Kapan "Null" tidak boleh jadi nilai?
> >     
> > - Mengapa perlu alternatif selain Info Gain?
> >     
> > - Apa itu Gain Ratio?
> >     
> > - Apa masalah dari Gain Ratio?
> >     
> > - Bagaimana menangani atribut dengan _cost_?
> >     
> > - Apa tujuan memperhitungkan _cost_?
> >     
> >
> > ## Reference Points
> >
> > - Slides 1-37, Modul Issues in Decision Tree Learning (DTL)
> >     
> > - Russel & Norvig, 2021
> >     
> > - Tom Mitchell, Machine Learning ch 6.6
> >     
> > - Jiawei Han, dkk. DataMining Concepts and Techniques
> >     
> 
> > ### 1. Algoritma Dasar Decision Tree Learning (DTL)
> >
> > DTL adalah sebuah fungsi yang membangun _decision tree_ secara rekursif.
> >
> > **Proses Algoritma:**
> >
> > 1. **Kasus Dasar 1 (Empty):** Jika tidak ada lagi contoh (_examples_) tersisa, kembalikan nilai default dari _parent_. Ini menggunakan `PLURALITY-VALUE(parent_examples)`.
> >     
> > 2. **Kasus Dasar 2 (Pure):** Jika semua _examples_ yang tersisa memiliki klasifikasi yang sama (misal, semua 'Yes' atau semua 'No'), kembalikan klasifikasi tersebut.
> >     
> > 3. **Kasus Dasar 3 (No Attributes):** Jika tidak ada lagi atribut yang bisa digunakan untuk membagi data, kembalikan nilai yang paling umum dari _examples_ saat ini. Ini menggunakan `PLURALITY-VALUE(examples)`.
> >     
> > 4. **Langkah Rekursif (Split):**
> >     
> >     - Pilih atribut terbaik (`A`) menggunakan fungsi `IMPORTANCE` (misalnya, Information Gain).
> >         
> >     - Jadikan `A` sebagai _root_ dari _tree_ atau _subtree_ saat ini.
> >         
> >     - Untuk setiap nilai $v_k$ dari atribut `A`:
> >         
> >         - Buat cabang baru dengan label $A = v_k$.
> >             
> >         - Ambil subset data (`exs`) di mana $A = v_k$.
> >             
> >         - Panggil ulang `DECISION-TREE-LEARNING` dengan sisa atribut (`attributes - A`) dan data subset (`exs`).
> >             
> >         - Pasang hasilnya sebagai _subtree_ di bawah cabang $A = v_k$.
> >             
> >
> > **PLURALITY-VALUE:** Ini adalah fungsi pembantu yang memilih nilai output (klasifikasi) yang paling umum dalam satu set contoh. Jika ada hasil imbang (misal, 5 'Yes' dan 5 'No'), ia akan memilih secara acak.
> >
> > ### 2. Isu Utama dalam DTL
> >
> > DTL dalam praktiknya menghadapi beberapa tantangan:
> >
> > 1. **Overfitting:** Model terlalu "pas" dengan data latihan.
> >     
> > 2. **Atribut Kontinu:** Menangani atribut yang nilainya berupa angka riil (misal, Suhu=80.5).
> >     
> > 3. **Atribut dengan Cost Berbeda:** Mempertimbangkan "biaya" untuk mendapatkan data (misal, tes darah lebih mahal daripada mengukur suhu).
> >     
> > 4. **Nilai Atribut Hilang (Missing):** Apa yang harus dilakukan jika data tidak lengkap (misal, Kelembapan=?).
> >     
> > 5. **Ukuran Alternatif:** Menggunakan metrik selain Information Gain untuk memilih atribut (misal, Gain Ratio).
> >     
> >
> > ### 3. Isu 1: Overfitting
> >
> > - **Definisi:** Overfitting terjadi ketika sebuah hipotesis (model) $h$ memiliki _error_ yang lebih rendah pada data latihan daripada hipotesis alternatif $h'$, ($error_{train}(h) < error_{train}(h')$), TAPI $h$ memiliki _error_ yang lebih tinggi pada keseluruhan distribusi data (data baru) ($error_{D}(h) > error_{D}(h')$).
> >
> > - **Analogi Sederhana:** Model tersebut "terlalu menghafal" data latihan, termasuk menghafal _noise_ atau kebetulan yang ada di data. Akibatnya, ia tidak bisa menggeneralisasi dengan baik untuk data baru yang belum pernah dilihat.
> >
> > - **Penyebab:** Overfitting bisa terjadi bahkan jika data latihannya _noise-free_ (bebas _noise_), terutama ketika jumlah contoh yang terkait dengan _leaf node_ (daun) sangat sedikit. Ini bisa menurunkan akurasi pada data baru sebesar 10-25%.
> >
> > ### 4. Solusi Overfitting: Pruning (Pemangkasan)
> >
> > Ada dua pendekatan utama untuk menghindari overfitting:
> >
> > 1. **Pre-Pruning (Stop Awal):**
> >     
> > 	- **Cara:** Menghentikan pertumbuhan *tree* lebih awal, sebelum ia mencapai titik di mana ia mengklasifikasikan data latihan dengan sempurna.
> > 	- **Kelebihan:** Lebih langsung (cepat).
> > 	- **Kekurangan:** Sulit untuk memperkirakan secara tepat kapan harus berhenti.
> >
> >
> > 2. **Post-Pruning (Pangkas Nanti):**
> >     
> > 	- **Cara:** Biarkan *tree* tumbuh hingga *overfit*, lalu pangkas *tree* tersebut.
> > 	- **Kelebihan:** Terbukti lebih sukses dalam praktiknya.
> > 	- **Kekurangan:** Membutuhkan lebih banyak langkah dan perlu kriteria untuk menentukan ukuran *tree* final yang "tepat".
> >
> >
> > **Cara Menentukan Ukuran Tree Final (untuk Post-Pruning):**
> >
> > - **Gunakan Validation Set:** Pisahkan data. Misal, 2/3 untuk _training set_ dan 1/3 untuk _validation set_. Gunakan _validation set_ untuk mengevaluasi dampak dari pemangkasan.
> >     
> > - **Gunakan Uji Statistik:** Gunakan semua data untuk _training_, lalu lakukan uji statistik (misal, _chi-square test_) untuk memeriksa apakah memangkas atau mengembangkan sebuah _node_ akan menghasilkan peningkatan yang signifikan.
> >     
> > - **Gunakan Minimum Description Length (MDL):** Cari _tree_ yang paling sederhana (kompleksitas rendah) yang masih bisa menjelaskan data dengan baik. (Lihat Ad-Libitum untuk formula).
> >     
> >
> > **Teknik Post-Pruning 1: Reduced Error Pruning**
> > 
> > Ini adalah pendekatan yang efektif jika tersedia banyak data.
> >
> > 1. Bagi data menjadi _training_ dan _validation set_.
> >     
> > 2. Tumbuhkan _tree_ sampai _fit_ dengan data _training_.
> >     
> > 3. Lakukan berulang kali (Do until...):
> >     
> >     - Evaluasi dampak pemangkasan setiap _node_ (menggantinya dengan klasifikasi paling umum di _node_ itu) terhadap akurasi di _validation set_.
> >         
> >     - Pangkas (hapus) _node_ yang paling meningkatkan akurasi _validation set_.
> >         
> > 4. Berhenti ketika pemangkasan lebih lanjut bersifat merugikan (menurunkan akurasi).
> >     
> >
> > **Teknik Post-Pruning 2: Rule Post-Pruning (digunakan di C4.5)**
> > 
> > Ini adalah peningkatan dari ID3 dan cocok untuk data yang terbatas.
> >
> > 1. Tumbuhkan _tree_ sampai _fit_ (boleh _overfit_).
> >     
> > 2. Konversi _tree_ menjadi _rules_ (aturan). Setiap satu jalur dari _root_ ke _leaf_ menjadi satu _rule_.
> >     
> >     - _Contoh Rule:_ `IF Outlook=Sunny AND Humidity=High THEN Play=No`.
> >         
> > 3. Pangkas (generalisasi) _setiap rule_ dengan menghapus prakondisi (misal, `Humidity=High`) jika penghapusan itu meningkatkan estimasi akurasi _rule_.
> >     
> > 4. Urutkan _rules_ yang sudah dipangkas berdasarkan akurasinya. Gunakan urutan ini saat mengklasifikasikan data baru.
> >     
> >
> > **Keuntungan Konversi ke** _**Rules**_**:**
> >
> > 1. Setiap _rule_ (jalur) dapat dipangkas secara independen.
> >     
> > 2. Menghilangkan perbedaan antara tes atribut (misal, tes di dekat _root_ vs. di dekat _leaf_ diperlakukan sama).
> >     
> > 3. Meningkatkan keterbacaan (lebih mudah dipahami manusia).
> >     
> >
> > ### 5. Tipe-Tipe Atribut
> >
> > DTL perlu tahu cara menangani berbagai jenis data.
> >
> > - **1. Kuantitatif (Numerik):** Berupa angka yang dapat diukur.
> >     
> >     - **Interval-Scaled:** Punya urutan dan unit yang sama besar, tapi tidak punya "nol" mutlak (misal: Suhu, Tanggal Kalender). Anda bisa bilang 20°C lebih panas 10°C dari 10°C, tapi 20°C tidak "dua kali lebih panas".
> >         
> >     - **Ratio-Scaled:** Punya "nol" mutlak, sehingga rasio/perkaliannya bermakna (misal: Berat, Lama Pengalaman, Jumlah Kata). 20kg adalah dua kali lebih berat dari 10kg.
> >         
> > - **2. Nominal (Kategorikal):** Berupa simbol atau nama.
> >     
> >     - Tidak memiliki urutan yang bermakna.
> >         
> >     - Bisa direpresentasikan dengan angka, tapi tidak bisa dioperasikan secara kuantitatif (misal: Kode Pos, ID Mahasiswa, Tipe Pekerjaan).
> >         
> > - **3. Biner:** Hanya punya dua kategori/status (bisa _boolean_ True/False).
> >     
> >     - **Symmetric (Simetris):** Kedua status sama pentingnya (misal: Gender L/P).
> >         
> >     - **Asymmetric (Asimetris):** Satu status dianggap lebih penting/langka (misal: Tes HIV Positif/Negatif; 'Positif' biasanya lebih penting).
> >         
> > - **4. Ordinal:** Punya urutan atau ranking yang bermakna.
> >     
> >     - Namun, jarak (magnitudo) antar nilai tidak diketahui atau tidak sama.
> >         
> >     - Berguna untuk penilaian subjektif (misal: Kepuasan Pelanggan (1-5), Ukuran Minuman (Small, Medium, Large), Nilai (A, B, C, D, E)).
> >         
> >
> > ### 6. Isu 2: Atribut Bernilai Kontinu
> >
> > **Masalah:** Algoritma DTL standar (seperti ID3) dirancang untuk atribut diskrit (seperti Outlook=Sunny/Overcast/Rain). Bagaimana jika atributnya kontinu (seperti Suhu=80.5, 72.3, 90.1)?
> >
> > **Solusi: Discretization (Diskretisasi)**
> >
> > 1. **Ide:** Mengubah atribut kontinu (misal, `Temperature`) menjadi atribut _boolean_ (diskrit) baru (misal, `Temperature_54`) berdasarkan sebuah _threshold_ $c$.
> >     
> > 2. **Cabang Baru:** _Tree_ akan memiliki dua cabang, misal: `Temperature < 54` (True) dan `Temperature >= 54` (False).
> >     
> >
> > **Cara Menemukan** _**Threshold**_ $c$ **Terbaik:**
> >
> > 1. **Urutkan (Sort):** Urutkan semua nilai atribut kontinu tersebut dari terkecil ke terbesar.
> >     
> > 2. **Identifikasi:** Cari pasangan nilai yang berdekatan yang memiliki _kelas target berbeda_. (Misal: Temp=48 (No), Temp=60 (Yes)).
> >     
> > 3. **Buat Kandidat:** Buat _threshold_ kandidat $c$ diengah-tengah pasangan tersebut. (Misal: c = (48+60)/2 = 54). Akan ada beberapa kandidat (misal, c=85 juga kandidat).
> >     
> > 4. **Hitung Gain:** Hitung Information Gain untuk _setiap kandidat threshold_ seolah-olah itu adalah atribut diskrit.
> >     
> > 5. **Pilih:** Pilih kandidat $c$ (misal, $c=54$ atau $c=85$) yang memberikan **Gain tertinggi**. Gain ini kemudian dibandingkan dengan Gain dari atribut-atribut diskrit lainnya (seperti Outlook, Wind) untuk memilih _root_ terbaik.
> >     
> >
> > ### 7. Isu 3: Nilai Atribut yang Hilang (Missing)
> >
> > **Masalah:** Apa yang harus dilakukan jika data tidak lengkap (misal, Outlook=Sunny, Humidity=?) saat _training_ atau _testing_?
> >
> > **Strategi Alternatif:**
> >
> > 1. **Common Value (Node):** Isi nilai yang hilang dengan nilai yang paling umum dari atribut tersebut di _node_ saat ini.
> >     
> > 2. **Common Value (Class):** Isi dengan nilai paling umum dari atribut tersebut, _khusus_ dari contoh-contoh di _node_ saat ini yang memiliki _klasifikasi yang sama_.
> >     
> > 3. **Probabilitas (C4.5):** Tetapkan probabilitas untuk setiap kemungkinan nilai.
> >     
> >     - Misal, di _node_ n, atribut A punya 6 nilai 'v1' dan 4 nilai 'v2' (total 10 data).
> >         
> >     - Untuk data ke-11 yang nilai A-nya _missing_, data ini akan "dibagi": 0.6 (6/10) dikirim ke cabang 'v1' dan 0.4 (4/10) dikirim ke cabang 'v2'.
> >         
> >     - Probabilitas ini juga bisa dipakai saat mengklasifikasikan instans baru.
> >         
> >     - Saat menghitung Gain(S,A), perhitungannya hanya mempertimbangkan fraksi contoh yang nilainya diketahui.
> >         
> >
> > **Perhatian:** Menganggap "Hilang" (misal, "?") sebagai nilai tersendiri **tidak selalu tepat**. Ini tidak boleh dilakukan jika nilai bisa hilang karena alasan yang berbeda.
> >
> > - _Contoh:_ Atribut `IsPregnant` yang _missing_ untuk pasien Pria harus diperlakukan sebagai 'No', sedangkan jika _missing_ untuk pasien Wanita usia 25, itu harus diperlakukan sebagai 'Unknown'.
> >     
> >
> > ### 8. Isu 4: Ukuran Alternatif (Gain Ratio)
> >
> > **Masalah Information Gain:** Information Gain (ukuran standar di ID3) memiliki bias. Ia **sangat menyukai atribut yang memiliki banyak nilai unik** (misal, Atribut 'Tanggal' atau 'ID Mahasiswa').
> >
> > **Kenapa Buruk?** Atribut 'Tanggal' mungkin akan mengklasifikasikan data latihan dengan sempurna (Gain sangat tinggi), tapi ia adalah prediktor yang sangat buruk untuk data baru. Ini adalah bentuk _overfitting_.
> >
> > **Solusi: Gain Ratio (digunakan di C4.5)**
> >
> > - **Ide:** Menormalkan Information Gain dengan membaginya dengan `SplitInformation`.
> >     
> > - **SplitInformation:** Ini adalah metrik yang mengukur seberapa banyak _node_ terpecah. Nilainya akan sangat tinggi untuk atribut seperti 'Tanggal' (karena terpecah menjadi banyak sekali cabang, satu untuk setiap tanggal). (Lihat Ad-Libitum untuk formula).
> >     
> > - **Hasil:** Atribut seperti 'Tanggal' akan memiliki `SplitInformation` yang tinggi, sehingga `GainRatio`-nya menjadi kecil (Gain / InfoSplit_Tinggi = Kecil). Ini "menghukum" atribut yang memiliki terlalu banyak nilai.
> >     
> >
> > **Masalah Gain Ratio:** Jika `SplitInformation` sangat kecil atau nol (misal, atribut hanya punya 1 nilai), `GainRatio` bisa menjadi tidak terdefinisi atau sangat besar.
> >
> > **Solusi (Heuristik):** Hanya hitung `GainRatio` untuk atribut-atribut yang memiliki Information Gain di atas rata-rata.
> >
> > ### 9. Isu 5: Atribut dengan Biaya (Cost) Berbeda
> >
> > **Masalah:** Di dunia nyata, mendapatkan data atribut tidak gratis. Beberapa atribut murah (misal, `Temperature`), sementara yang lain mahal (misal, `BiopsyResult`, `BloodTestResults`), baik secara moneter maupun kenyamanan pasien.
> >
> > **Tujuan:** _Decision tree_ harusnya lebih memilih atribut berbiaya rendah, dan hanya menggunakan atribut berbiaya tinggi jika benar-benar diperlukan untuk menghasilkan klasifikasi yang andal.
> >
> > **Solusi:** Memasukkan _Cost_ ke dalam formula perhitungan "Gain". Tujuannya bukan lagi memaksimalkan Gain, tapi memaksimalkan (Gain / Cost).
> >
> > **Contoh Pendekatan:** Ada beberapa formula yang diusulkan, seperti oleh Tan dan Schlimmer (1990) atau Nunez (1988). (Lihat Ad-Libitum untuk formula).

> [!cornell] #### Summary
> 
> **Meskipun algoritma Decision Tree Learning (DTL) dasar kuat, penerapannya di dunia nyata menghadapi berbagai isu kritis. Isu utama adalah** _**overfitting**_**, di mana model terlalu "menghafal" data latihan, yang solusinya melibatkan** _**pruning**_ **(baik** _**pre-pruning**_ **maupun** _**post-pruning**_ **seperti Reduced Error Pruning dan Rule Post-Pruning C4.5). Selain itu, DTL harus dimodifikasi untuk menangani berbagai tipe data, seperti mengubah atribut** _**kontinu**_ **menjadi diskrit melalui** _**discretization**_**, dan memiliki strategi untuk mengisi nilai atribut yang** _**hilang**_ **(**_**missing**_**). Terakhir, untuk meningkatkan performa dan relevansi, ukuran pemilihan atribut standar (Information Gain) sering diganti dengan** _**Gain Ratio**_ **untuk menghindari bias terhadap atribut dengan banyak nilai unik, dan disesuaikan untuk memperhitungkan** _**biaya**_ **perolehan atribut yang berbeda-beda.**

> [!ad-libitum]- Additional Information (Technical Deep Dive)
> 
> #### Formula: Minimum Description Length (MDL)
> 
> Prinsip MDL adalah mencari hipotesis $h$ yang meminimalkan total "panjang" (bit) yang dibutuhkan untuk mendeskripsikan $h$ itu sendiri ditambah panjang untuk mendeskripsikan data $D$ _jika kita_ menggunakan $h$.
> 
> $$h_{MDL}=argmin_{h\in H}L_{C_{1}}(h)+L_{C_{2}}(D|h)$$
> 
> - $L_{C_{1}}(h)$: Panjang (jumlah bit) untuk mengkodekan hipotesis (tree) $h$. _Tree_ yang lebih kompleks (banyak _node_) akan memiliki nilai ini lebih besar.
>     
> - $L_{C_{2}}(D|h)$: Panjang (jumlah bit) untuk mengkodekan data $D$ _dengan_ hipotesis $h$. Ini biasanya bit yang diperlukan untuk mencatat contoh-contoh yang salah diklasifikasikan oleh $h$. _Tree_ yang _overfit_ akan memiliki nilai $L_{C_{1}}(h)$ yang sangat besar.
>     
> 
> #### Formula: Kalkulasi Gain untuk Atribut Kontinu
> 
> Saat mengevaluasi _threshold_ $c$, kita menghitung Gain seolah-olah itu adalah atribut biner (di bawah $c$ vs. di atas/sama dengan $c$).
> 
> - **Contoh (c=54):**
>     
>     - Data: 6 total.
>         
>     - Temperature < 54: 2 contoh (0 Yes, 2 No)
>         
>     - Temperature $\ge 54$: 4 contoh (3 Yes, 1 No)
>         
>     - $Gain(S, T_{54}) = Entropi(S) - [ (\frac{2}{6} \times Entropi(0, 2)) + (\frac{4}{6} \times Entropi(3, 1)) ]$  
>         
> - **Contoh (c=85):**
>     
>     - Temperature < 85: 5 contoh (3 Yes, 2 No)
>         
>     - Temperature $\ge 85$: 1 contoh (0 Yes, 1 No)
>         
>     - $Gain(S, T_{85}) = Entropi(S) - [ (\frac{5}{6} \times Entropi(3, 2)) + (\frac{1}{6} \times Entropi(0, 1)) ]$  
>         
> 
> Kita akan menghitung keduanya dan memilih $c$ yang memberikan Gain tertinggi.
> 
> #### Formula: Gain Ratio dan Split Information
> 
> 1. Gain Ratio:
>     
>     $$GainRatio(S,A) \equiv \frac{Gain(S,A)}{SplitInformation(S,A)}$$
> 2. Split Information:
>     
>     $$SplitInformation(S,A) \equiv - \sum_{i=1}^{c} \frac{|S_i|}{|S|} log_{2} \frac{|S_i|}{|S|}$$
>     - $S_i$ adalah subset dari $S$ di mana atribut A memiliki nilai $v_i$.
>         
>
> - Contoh (Atribut 'Date' dengan 6 nilai unik):
>     
>     $SplitInfo(S, Date) = - ( (\frac{1}{6}log_2\frac{1}{6}) + (\frac{1}{6}log_2\frac{1}{6}) + ... \text{[6x]} )$
>     
>     Nilai ini akan sangat tinggi, sehingga $GainRatio$ menjadi rendah.
>     
> - Contoh (Atribut 'Atr2' dengan 2 nilai, 4 'V1' dan 2 'V2'):
>     
>     $SplitInfo(S, Atr2) = - ( (\frac{4}{6}log_2\frac{4}{6}) + (\frac{2}{6}log_2\frac{2}{6}) )$
>     
>     Nilai ini akan jauh lebih rendah, memungkinkan $GainRatio$ yang lebih tinggi.
>     
> 
> #### Formula: Menyesuaikan Gain dengan Biaya (Cost)
> 
> Ada beberapa pendekatan untuk memasukkan biaya:
> 
> 1. Tan and Schlimmer (1990), Tan (1993):
>     
>     $$\frac{Gain^2(S,A)}{Cost(A)}$$
>     
>     Mengkuadratkan Gain memberikan bobot lebih pada akurasi, sambil tetap menghukum atribut berbiaya tinggi.
>     
> 2. Nunez (1988):
>     
>     $$\frac{2^{Gain(S,A)} - 1}{(Cost(A) + 1)^w}$$
>     $w$ adalah koefisien antara 0 dan 1 yang menentukan pentingnya biaya. Jika $w=0$, biaya diabaikan. Jika $w=1$, biaya sangat dipertimbangkan.
>         