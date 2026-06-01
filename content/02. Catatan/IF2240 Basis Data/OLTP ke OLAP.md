---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa masalah model relasional untuk analisis?
> > - Bagaimana ilustrasi kompleksitas *query*?
> > - Apa perbedaan *Operational Queries* dan *Analysis Queries*?
> > - Apa yang menjadi perhatian model multidimensional?
> >
> > ## Reference Points
> > - Slide 3-10 dari "21. IF2240-SemII_2425-m14-1-Introduction-to-Data-Warehouse.pdf"
>
> >
> > ### Pemodelan Database untuk Itsy Bitsy (Sistem OLTP)
> > - **Itsy Bitsy** adalah perusahaan *e-commerce* yang menjual berbagai barang dari berbagai penjual. Saat ini, mereka membangun *database* untuk mencatat penjual dan barang yang dijual. Kemudian, dikembangkan juga penyimpanan informasi pembeli dan pembelian.
> > - **Pemodelan Relasional (ER Diagram) Itsy Bitsy** mencakup entitas-entitas berikut:
> >   1.  **Penjual**:
> >       - Atribut: Nama (unik), kontak email, alamat, dan nomor telepon.
> >       - Alamat dipecah menjadi: `nama_jalan`, `nama_kota`, dan `kodepos`.
> >   2.  **Barang**:
> >       - Atribut: id_barang (unik), nama, kategori, dan harga.
> >   3.  **Pembeli**:
> >       - Atribut: id_pembeli, nama, dan alamat.
> >       - Alamat dipecah menjadi: `nama_jalan`, `nama_kota`, dan `kodepos`.
> >   4.  **Order (Pembelian)**:
> >       - Atribut: id_pembelian, tanggal_pembelian, dan total_harga (dijumlahkan dari harga masing-masing barang yang dibeli).
> >   5.  **Order_Item**:
> >       - Mencatat setiap jenis barang yang dibeli dan kuantitasnya.
> >       - Atribut: `urutan` (mungkin nomor urut barang dalam satu order) dan `kuantitas`.
> >
> > ### Hubungan Antar Entitas (Foreign Keys - FK) 
> > - **`Menjual`**: Relasi antara Penjual dan Barang.
> >   - `Menjual(nama_penjual)` → `Penjual(nama)`
> >   - `Menjual(id_barang)` → `Barang(id_barang)`
> > - **`Order`**: Relasi antara Pembeli dan Order.
> >   - `Order(id_pembeli)` → `Pembeli(id_pembeli)`
> > - **`Order_item`**: Relasi antara Order dan Barang.
> >   - `Order_item(id_pembelian)` → `Order(id_pembelian)`
> >   - `Order_item(id_barang)` → `Barang(id_barang)`
> >
> > ### Kebutuhan Informasi untuk Tim Eksekutif (Analisis)
> > - Tim eksekutif memiliki kebutuhan informasi yang berorientasi analisis untuk mengetahui tren dan membuat keputusan. Contoh pertanyaan:
> >   1.  Berapa total penjualan barang setiap bulannya? 
> >   2.  Berapa rata-rata jumlah rupiah penjualan setiap bulannya? 
> >   3.  Penjual mana yang menjual barang terbanyak bulan ini? 
> >   4.  Di kota mana *market* terbesar dari perusahaan? 
> >   5.  Barang apa yang paling laku terjual? 
> > - Kebutuhan informasi ini melibatkan data dalam jumlah besar.
> >
> > ### Masalah Penggunaan Model Relasional untuk Analisis (Transisi ke OLAP)
> > - Jika model relasional tradisional (OLTP) digunakan untuk menjawab kebutuhan analisis ini, akan timbul beberapa masalah:
> >   1.  **Peningkatan kompleksitas *query***: *Query* menjadi sangat kompleks karena membutuhkan banyak *join* antar tabel untuk menggabungkan data dari berbagai entitas dan melakukan agregasi.
> >   2.  **Waktu eksekusi yang lama dan mengganggu proses operasional**: *Query* analisis cenderung memproses data dalam jumlah besar, sehingga memerlukan waktu eksekusi yang lama. Hal ini dapat membebani sistem *database* operasional dan mengganggu kinerja transaksi harian.
> > - **Perbandingan Tipe *Query***:
> >   - **Operational Queries**:
> >     - Frekuensi: Tinggi (sering).
> >     - Karakter: Ringan / Sedang (memproses sedikit data per transaksi).
> >     - Contoh: Pencatatan order, pembaruan stok. 
> >   - **Analysis Queries**:
> >     - Frekuensi: Jarang (*seldom*).
> >     - Karakter: Berat (memproses banyak data).
> >     - Contoh: Laporan penjualan bulanan, identifikasi penjual teratas. 
> >
> > ### Pendekatan Multidimensional (Pengantar)
> > - Model multidimensional dimulai dengan observasi bahwa faktor-faktor yang mempengaruhi proses pengambilan keputusan adalah **fakta-fakta spesifik perusahaan** (misalnya, penjualan, pengiriman, penerimaan rumah sakit, operasi).
> > - **Instansi sebuah fakta** sesuai dengan *event* yang terjadi. Contoh: setiap penjualan atau pengiriman yang dilakukan adalah sebuah *event*.
> > - Setiap fakta dijelaskan oleh nilai-nilai dari **serangkaian *measure* yang relevan** yang menyediakan deskripsi kuantitatif dari *event*. Contoh: penerimaan penjualan, jumlah yang dikirim, biaya masuk rumah sakit, dan waktu operasi adalah *measure*.
> > - **Terminologi Kunci**:
> >   - **Dimensi (Dimension)**: Label subjek untuk baris atau kolom. Ini adalah sudut pandang untuk menganalisis data (misalnya, Waktu, Lokasi, Produk).
> >   - **Member (Anggota)**: Nilai dari sebuah dimensi (misalnya, "Januari" adalah *member* dari dimensi Waktu).
> >   - **Measure (Ukuran)**: Variabel kuantitatif yang disimpan dalam sel. Ini adalah nilai numerik yang ingin dianalisis (misalnya, jumlah penjualan, total harga).

> [!cornell] #### Summary
> Studi kasus toko *online* Itsy Bitsy menunjukkan pemodelan *database* relasional (`Penjual`, `Barang`, `Pembeli`, `Order`, `Order_Item`) yang optimal untuk **operasi harian (OLTP)**, namun menghadapi masalah **kompleksitas *query*** dan **performa yang lambat** saat digunakan untuk **analisis eksekutif (OLAP)** yang membutuhkan agregasi data bervolume besar. Kebutuhan analisis ini mendorong transisi ke **model multidimensional**, yang berfokus pada **fakta** yang dideskripsikan oleh **`measures`** (nilai kuantitatif) dan dianalisis melalui berbagai **`dimensions`** (sudut pandang kategorikal) seperti Waktu atau Lokasi.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Normalisasi vs. Denormalisasi**: Model relasional untuk OLTP biasanya sangat ter-normalisasi untuk mengurangi redundansi dan memastikan integritas data. Namun, ini menyebabkan *join* yang kompleks untuk *query* analisis. Model multidimensional, seperti yang akan dibahas, seringkali bersifat denormalisasi untuk mengoptimalkan *read performance* pada *query* analisis.
> - **Pemrosesan Transaksi Online (OLTP)**: Sistem OLTP dirancang untuk memproses transaksi dalam jumlah besar dengan cepat, fokus pada operasi `INSERT`, `UPDATE`, `DELETE` dalam skala kecil per transaksi. Contoh umum termasuk sistem perbankan, *e-commerce*, dan sistem pemesanan.
> - **Pemrosesan Analitis Online (OLAP)**: Sistem OLAP dirancang untuk analisis data yang kompleks, agregasi, dan pelaporan, fokus pada operasi `READ` dengan volume data yang sangat besar. Ini mendukung pengambilan keputusan strategis.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", Edisi ke-7, Bab 11: Data Analytics.
> - **Artikel**: Cari artikel tentang "Data Mart vs Data Warehouse" untuk memahami arsitektur yang lebih spesifik dalam konteks solusi BI.
>
> #### Eksplorasi Mandiri:
> - **Rancang Skema Dimensi**: Coba rancang dimensi-dimensi yang relevan untuk skenario bisnis lain (misalnya, rumah sakit, manufaktur) dan identifikasi *measure* yang penting.
> - **Simulasikan Query**: Coba tuliskan *query* SQL yang kompleks untuk menjawab salah satu pertanyaan analisis Itsy Bitsy (misalnya, total penjualan per bulan) menggunakan skema relasional yang diberikan, dan bandingkan kompleksitasnya.