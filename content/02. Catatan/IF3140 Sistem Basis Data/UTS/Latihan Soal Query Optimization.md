_Back to _ [[IF3140 Sistem Basis Data]]

![[Pasted image 20250925092618.png]]

Naufarrel Zhafif Abhista
13523149
## Soal 1

|Operasi|Cost|Banyaknya Tuple|
|---|---|---|
|$\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)}$|12|100|
|$\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman}$|910|600|
|$\sigma_{\text{umur} \geq 21}\text{(Pelanggan)}$|1001|2222|
|$\sigma_{\text{umur} \geq 21}{(Pelanggan)} \bowtie (\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman})$|849|133|
|$\Pi_{nama}(\sigma_{\text{umur} \geq 21}{(Pelanggan)} \bowtie (\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman}))$|0 (Pipelined)|133|
|Total|2772|133 (Tuple final)|

**Penjelasan:**

1. Untuk seleksi buku dengan atribut penulis bernilai ‘Andrea Hirata’, ada indeks yang berlaku. Maka, digunakan metode A3 (Primary Index, pada Non-Key):
    - Pemindaian dilakukan dengan $\text{cost} = h_i​+b = 2 + ⌈100 \text{ tuple} / (50.000/5.000⌉  = 12$ blok
    - Tuple:
        - Total ada 500 variasi penulis
        - Hanya akan diambil 1 penulis
        - Karena distribusi seragam, estimasi tuple: $n_{buku} * 1/500 = 50000 * 1/500 = 100$ tuple.
2. Untuk join buku dan peminjaman, kita memiliki 100 tuple buku dari langkah sebelumnya. Kita bisa menggunakan `bid` dari setiap buku untuk mencari data di `Peminjaman` menggunakan _secondary index_-nya. Metode terbaiknya adalah Nested-Loop Join.
    - Cost: Menggunakan formula dasar Nested-Loop Join: $b_{luar}​+(n_{luar}​×(h_i​+s))$.
        - $b_{luar} = b_{hasil_1} = 10$ blok.
        - $n_{luar} = 100$ tuple.
        - $h_i = 3$
        - $s = \frac{300000}{50000} = 6$
        - Cost = $10 + (100 \times (3 + 6)) = 10 + (900) = 910$ blok.
    - Banyaknya Tuple:
        - Kita mencari berapa kali 100 buku (Hasil #2) dipinjam.
        - Rata-rata peminjaman per buku =  $n_{peminjaman} / n_{buku} = 300.000 / 50.000 = 6$ kali.
        - Estimasi tuple = 100 buku * 6 = 600 tuple.
3. Untuk seleksi pelanggan berumur lebih dari atau sama dengan 21, karena pencarian didasarkan pada umur, dapat dianggap pencarian dilakukan dengan metode A1 (Linear Scan)
    - Pemindaian dilakukan dengan $\text{cost} = 1000 + 1 = 1001$
    - Tuple:
        - Total ada 24 - 7 + 1 = 18 variasi umur.
        - Kondisi umur >= 21 mencakup umur 21, 22, 23, 24 (4 variasi).
        - Karena distribusi seragam, estimasi tuple: $n_{pelanggan} * (4 / 18) = 10.000 * (4 / 18) ≈ 2222$ tuple.
4. Join hasil Pelanggan dengan Hasil Join Sebelumnya ((Hasil #1) ⋈ (Hasil #3)) dapat menggunakan Hash Join lagi. Hasil join sebelumnya (Hasil #3) lebih kecil dalam jumlah blok, sehingga akan menjadi build input.
    - Cost:
        - Blok Hasil #1:  $b_{hasil_1} = ⌈2.222 \text{ tuple} / (10.000/1.000 \text{ tuple/blok})⌉ = 223$ blok.
        - Blok Hasil #3 (berdasarkan asumsi soal): tuples per block peminjaman = 300.000 / 15.000 = 20. Ukuran tuple hasil join 2x lipat, jadi tuples per block hasil3 = 10. Maka $b_{hasil_3}=⌈600/10⌉=60$ blok
    - Cost =  $3 * (b_{hasil_3} + b_{hasil_1}) = 3 * (60 + 223) = 3 * 283 = 849$ blok.
    - Banyaknya Tuple:
        - Dari 600 peminjaman di Hasil #3, kita ingin tahu berapa yang dilakukan oleh pelanggan berumur >= 21.
        - Fraksi pelanggan berumur >= 21 adalah 4/18.
        - Estimasi tuple = 600 * (4 / 18) ≈ 133 tuple.
5. Proyeksi Nama
    - Karena asumsi mekanisme evaluasi adalah pipeline, hasil dari join terakhir (Hasil #4) langsung dialirkan ke operasi proyeksi tanpa disimpan ke disk.
    - Cost: 0 (biayanya sudah termasuk dalam operasi join sebelumnya).
    - Banyaknya Tuple: Operasi proyeksi tidak mengubah jumlah tuple, hanya kolomnya => 133 tuple.

## Soal 2


#### 1. Ekspresi Aljabar Relasional Awal

Ekspresi awal yang diberikan adalah:

$Π_{nama}​((σ_{umur≥21}​(Pelanggan))⋈((σ_{penulis = ’Andrea Hirata’}​(Buku))⋈Peminjaman))$

#### 2. Transformasi dengan Aturan Ekuivalensi

Kita dapat mengoptimalkan ekspresi ini dengan menerapkan aturan **"mendorong proyeksi sedini mungkin" (Push Projection)**. Tujuannya adalah untuk mengurangi ukuran (jumlah atribut/kolom) dari relasi-relasi perantara, sehingga proses join selanjutnya menjadi lebih ringan.

Dengan menerapkan aturan ekuivalensi No. 8 (Distribusi Proyeksi terhadap Join), kita mendapatkan ekspresi baru yang lebih optimal:

$Π_{nama}​((Π_{nama,pid​}(σ_{umur≥21}​(Pelanggan)))⋈((Π_{bid}​(σ_{penulis=’Andrea Hirata’​}(Buku)))⋈(Π_{pid,bid}​(Peminjaman))))$  

Ekspresi ini secara signifikan mengurangi jumlah data yang harus diproses pada setiap langkah join.

#### 3. Rencana Evaluasi (Evaluation Plan) Baru dan Estimasi Biaya

Berikut adalah tabel rencana evaluasi berdasarkan ekspresi yang telah dioptimalkan, dengan memanfaatkan index yang tersedia.

|**Operasi**|Cost (Akses Blok)**|**Banyaknya Tuple**|
|---|---|---|
|$σ_{umur≥21}​(Pelanggan)$|1001|2222|
|$Π_{nama,pid​}$ (dari hasil #1)|0|2222|
|$σ_{penulis = ’Andrea Hirata’​}(Buku)$|**12**|100|
|$Π_{bid}​$|0|100|
|$(\text{Hasil \#4}) \bowtie \Pi_{pid, bid}(\text{Peminjaman})$|**901**|600|
|$Π_{pid}​$ (dari hasil #5)|0|600|
|$(\text{Hasil \#2}) \bowtie (\text{Hasil \#6})$|339|133|
|$Π_{nama}$​ (dari hasil #7)|0|133|
|**Total**|**2253**|**133 (Tuple final)**|

#### **Penjelasan Estimasi Biaya:**

1. **Seleksi Pelanggan & Proyeksi (Hasil #1 & #2):**
    
    - Tidak ada index pada `umur`, jadi menggunakan **Linear Scan**. Cost = **1001**.
        
    - Proyeksi ke `nama` dan `pid` dilakukan secara _pipelined_ (Cost = 0).
        
2. **Seleksi Buku & Proyeksi (Hasil #3 & #4):**
    
    - Menggunakan **primary index** pada `penulis`. Metodenya adalah **Index Scan**.
        
    - Cost = $h_i​+b=2+⌈100/10⌉=12$**
        
    - Proyeksi ke `bid` dilakukan secara _pipelined_ (Cost = 0). Hasilnya (100 tuple `bid`) sangat kecil dan hanya membutuhkan **1 blok**.
        
3. **Join Buku dan Peminjaman (Hasil #5):**
    
    - Menggunakan hasil proyeksi Buku (100 tuple `bid` dalam 1 blok) untuk mencari data di `Peminjaman` melalui _secondary index_-nya pada `bid`. Metode terbaik adalah **Index Nested-Loop Join**.
        
    - Cost = $b_{luar}​+(n_{luar}​×(h_i​+s))=1+(100×(3+6))=901$.
        
4. **Join Pelanggan dengan Hasil Join Sebelumnya (Hasil #7):**
    
    - Menggunakan **Hash Join**. _Build input_ adalah hasil join sebelumnya yang sudah diproyeksi ke `pid` (600 tuple, sangat kecil, **~1 blok**). _Probe input_ adalah hasil proyeksi Pelanggan (2222 tuple).
        
    - Ukuran blok probe input: Tuple Pelanggan setelah proyeksi lebih kecil, anggap _blocking factor_ menjadi 20. Maka, bprobe​=⌈2222/20⌉=112 blok.
        
    - Cost = $3×(b_{build}​+b_{probe}​)=3×(1+112)=339$.
        

#### Kesimpulan

Dengan menerapkan aturan ekuivalensi (Push Projection) **DAN** memanfaatkan index yang tersedia, total biaya untuk rencana evaluasi baru ini adalah **2.253**.

Ini menunjukkan bahwa rencana ini **lebih optimal** daripada rencana di soal 1 (yang biayanya 2.772), membuktikan bahwa menerapkan aturan ekuivalensi seperti mendorong proyeksi dapat menghasilkan rencana eksekusi yang lebih cepat dan efisien.