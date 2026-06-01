_Back to_ [[IF3140 Sistem Basis Data]]

![[Pasted image 20250919140734.png]]

|Operasi|Cost|Banyaknya Tuple|
|---|---|---|
|$\sigma_{\text{umur} \geq 21}\text{(Pelanggan)}$|1001|2222|
|$\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)}$|5001|100|
|$\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman}$|45030|600|
|$\sigma_{\text{umur} \geq 21}{(Pelanggan)} \bowtie (\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman})$|849|133|
|$\Pi_{nama}(\sigma_{\text{umur} \geq 21}{(Pelanggan)} \bowtie (\sigma_{\text{penulis = 'Andrea Hirata'}}\text{(Buku)} \bowtie \text{Peminjaman}))$|0 (Pipelined)|133|
|Total|51881|133 (Tuple final)|

**Penjelasan:**

1. Untuk seleksi pelanggan berumur lebih dari atau sama dengan 21, karena pencarian didasarkan pada umur, dapat dianggap pencarian dilakukan dengan metode A1 (Linear Scan)
    - Pemindaian dilakukan dengan $\text{cost} = 1000 + 1 = 1001$
    - Tuple:
        - Total ada 24 - 7 + 1 = 18 variasi umur.
        - Kondisi umur >= 21 mencakup umur 21, 22, 23, 24 (4 variasi).
        - Karena distribusi seragam, estimasi tuple: $n_{pelanggan} * (4 / 18) = 10.000 * (4 / 18) ≈ 2222$ tuple.
2. Untuk seleksi buku dengan atribut penulis bernilai ‘Andrea Hirata’, tidak ada indeks yang berlaku (karena memang penulis tidak unik). Kembali digunakan metode A1 (Linear Scan)
    - Pemindaian dilakukan dengan $\text{cost} = 5000 + 1 = 5001$
    - Tuple:
        - Total ada 500 variasi penulis
        - Hanya akan diambil 1 penulis
        - Karena distribusi seragam, estimasi tuple: $n_{buku} * 1/500 = 50000 * 1/500 = 100$ tuple.
3. Untuk join buku dan peminjaman, dapat digunakan Hash Join (data tidak terurut dan banyak, serta equi-joins)
    - Cost: Menggunakan formula dasar Hash Join: $3 * (b_{build} + b_{probe})$.
        - Blok Hasil #2: $b_{hasil_2} = ⌈100 \text{ tuple} / (50.000/5.000 \text{ tuple/blok)}⌉ = 10$ blok.
        - Cost = $3 * (b_{hasil_2} + b_{peminjaman}) = 3 * (10 + 15.000) = 45.030$ blok.
    - Banyaknya Tuple:
        - Kita mencari berapa kali 100 buku (Hasil #2) dipinjam.
        - Rata-rata peminjaman per buku =  $n_{peminjaman} / n_{buku} = 300.000 / 50.000 = 6$ kali.
        - Estimasi tuple = 100 buku * 6 = 600 tuple.
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