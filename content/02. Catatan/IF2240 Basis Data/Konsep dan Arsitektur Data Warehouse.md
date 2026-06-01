---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa metafora model multidimensional?
> > - Contoh *Sales Data Cube*?
> > - Apa itu *Fact Tables*?
> > - Apa itu *Dimension Tables*?
> > - Atribut *Fact Tables* sebagai apa?
> > - Bagaimana masalah analisis diselesaikan?
> > - Kebutuhan manajerial apa yang diakali?
> > - Dimensi "Waktu" dan "Barang"?
> > - Dimensi "Penjual" dan "Pembeli"?
> > - Dimensi "Cuaca"?
> > - Bagaimana *Fact Table* "Penjualan"?
> > - Manfaat model multidimensional?
> > - Apa itu *Star Schema*?
> > - Apa itu *Snowflake Schema*?
> > - Apa itu *Fact Constellations*?
> > - Definisi *Data Warehousing*?
> > - Tujuan *Data Warehouse*?
> > - Apa itu OLTP?
> > - Apa itu OLAP?
> > - Perbedaan fitur OLTP vs. OLAP?
> > - Perbandingan detail OLTP vs. OLAP?
> >
> > ## Reference Points
> > - Slide 10-24 dari "21. IF2240-SemII_2425-m14-1-Introduction-to-Data-Warehouse.pdf"
>
> > ### Model Multidimensional: Konsep Cube
> > - Model multidimensional menggunakan **metafora kubus** (`cube`) untuk merepresentasikan data multidimensional.
> > - *Event* diasosiasikan dengan **sel-sel kubus** (`cube cells`). Setiap sel kubus diberikan nilai untuk setiap *measure*.
> > - **Sisi-sisi kubus** (`cube edges`) mewakili **dimensi analisis**.
> > - Jika terdapat lebih dari tiga dimensi, kubus tersebut disebut **`hypercube`**.
> > - **Contoh `Sales Data Cube`**: Memodelkan penjualan dalam rantai toko.
> >   - Jika `quantity = 10` dan `receipts = 25` untuk `date = '4/5/08'`, `store = 'EverMore'`, `product = 'Shiny'`, ini berarti 10 pak 'Shiny' terjual pada 4/5/2008 di toko EverMore dengan total $25.
> >   - Skema relasional yang sesuai: `SALES(store, product, date, quantity, receipts)`.
> >
> > ### Skema Data Multidimensional dan Gudang Data (Warehouse Schemas)
> > - Data dalam *data warehouse* biasanya dibagi menjadi:
> >   - **`Fact Tables`**: Ini adalah tabel yang **besar** dan berisi **fakta** atau *event*.
> >     - Contoh: `sales(item_id, store_id, customer_id, date, number, price)`.
> >     - Atribut pada *fact tables* biasanya dilihat sebagai:
> >       - **`Measure attributes`**: Mengukur suatu nilai dan dapat diagregasi (dijumlahkan, dirata-rata, dll.). Contoh: atribut `number` (jumlah barang) atau `price` (harga) dari relasi `sales`.
> >       - **`Dimension attributes`**: Dimensi di mana atribut *measure* dilihat. Contoh: atribut `item_id`, `color`, dan `size` dari relasi `sales`. Atribut ini biasanya adalah ID kecil yang merupakan *foreign keys* ke *dimension tables*.
> >   - **`Dimension Tables`**: Ini adalah tabel yang relatif **kecil** dan menyimpan informasi tambahan tentang dimensi (misalnya, toko, item, pelanggan).
> >     - Contoh: `store` (store_id, city, state, country), `item_info` (item_id, itemname, color, size, category), `date_info` (date, month, quarter, year), `customer` (customer_id, name, street, city, state, zipcode, country).
> >
> > ### Solusi untuk Kebutuhan Informasi Eksekutif dengan Model Multidimensional
> > - Kebutuhan informasi dari tim manajerial untuk mengetahui tren penjualan dan faktor yang mempengaruhinya dapat diselesaikan dengan pendekatan model multidimensional.
> > - Model ini membantu menghasilkan laporan untuk analisis tren yang dibutuhkan.
> > - **Dimensi-dimensi yang relevan** dalam konteks Itsy Bitsy:
> >   - **Dimensi: Waktu** 
> >     - Atribut: `Id_waktu`, `Tanggal`, `Bulan`, `Tahun`, `Quarter`.
> >     - Granularitas (tingkat detail) bisa disesuaikan dengan kebutuhan. Ini adalah dimensi 'wajib' dalam model multidimensional.
> >   - **Dimensi: Barang** 
> >     - Atribut: `Id_barang`, `Nama`, `Kategori`, `Harga`.
> >   - **Dimensi: Penjual** 
> >     - Atribut: `Nama_penjual`, `Alamat_nama_kota`, `Alamat_nama_kodepos`.
> >     - Data detail seperti 'email' penjual tidak perlu disimpan karena tidak memiliki makna bila diagregasi.
> >   - **Dimensi: Pembeli (tempat beli)** 
> >     - Atribut: `Id_tempat_beli`, `Nama_kota`, `Kodepos`. Data 'nama pembeli' tidak perlu disimpan karena tidak memiliki makna bila diagregasi.
> >   - **Dimensi: Cuaca** 
> >     - Atribut: `Id_cuaca`, `Jenis_cuaca`. Ini mungkin menambahkan sumber eksternal.
> > - **`Fact Table`: Penjualan** 
> >   - Atribut: `tanggal`, `Id_barang`, `Nama_penjual`, `Id_tempat_beli`, `Id_cuaca`.
> >   - Menambahkan atribut *measure* (`Jumlah_penjualan_barang`, `Jumlah_rupiah_penjualan`) yang ingin dilihat atau dianalisis.
> >   - *Fact table* berfokus pada 'subjek' atau hal yang ingin dianalisis.
> > - **Manfaat**: Model multidimensional dapat membantu menghasilkan laporan untuk analisis tren dan memungkinkan penambahan filter sesuai dengan dimensi yang tersedia.
> >
> > ### Conceptual Modeling of Data Warehouses (Skema Gudang Data)
> > - **`Star Schema`**:
> >   - Sebuah *fact table* berada di tengah, terhubung ke sekumpulan *dimension tables*. Bentuknya menyerupai bintang.
> >   - Ini adalah skema paling sederhana dan paling umum untuk *data warehouse*.
> > - **`Snowflake Schema`**:
> >   - Merupakan penyempurnaan dari *star schema* di mana beberapa hierarki dimensi dinormalisasi menjadi sekumpulan *dimension tables* yang lebih kecil, membentuk bentuk yang mirip kepingan salju (*snowflake*).
> >   - Meningkatkan normalisasi dimensi, tetapi bisa meningkatkan kompleksitas *query* karena lebih banyak *join*.
> > - **`Fact Constellations` (atau `Galaxy Schema`)**:
> >   - Beberapa *fact tables* berbagi *dimension tables*, yang dapat dilihat sebagai kumpulan bintang-bintang (*stars*).
> >   - Cocok untuk *data warehouse* yang sangat besar dengan beberapa proses bisnis yang saling terkait.
> >
> > ### Data Warehousing
> > - Sebuah *data warehouse* adalah **repositori (arsip) informasi** yang dikumpulkan dari berbagai sumber, disimpan di bawah skema terpadu (*unified schema*), di satu lokasi.
> >   - Sumber data operasional seringkali hanya menyimpan data saat ini, bukan data historis.
> >   - Pengambilan keputusan korporat memerlukan pandangan terpadu dari semua data organisasi, termasuk data historis.
> > - **Tujuan dan Manfaat `Data Warehouse`**:
> >   - **Sangat menyederhanakan *query***: Karena data sudah disiapkan untuk analisis, *query* menjadi lebih sederhana dan cepat.
> >   - **Memungkinkan studi tren historis**.
> >   - **Mengalihkan beban *query* dukungan keputusan** dari sistem pemrosesan transaksi (OLTP). Ini mencegah *query* analisis yang berat mengganggu operasi harian.
> >
> > ### Data Warehouse vs. Operational DBMS (OLTP vs. OLAP)
> > - **OLTP (On-Line Transaction Processing)**:
> >   - Tugas utama DBMS relasional tradisional.
> >   - Fokus pada operasi sehari-hari: pembelian, inventaris, perbankan, manufaktur, penggajian, pendaftaran, akuntansi, dll..
> > - **OLAP (On-Line Analytical Processing)**:
> >   - Tugas utama sistem *data warehouse*.
> >   - Fokus pada analisis data dan pengambilan keputusan.
> >
> > ### Fitur Pembeda OLTP vs. OLAP 
> > | Fitur               | OLTP                               | OLAP                                   |
> > | :------------------ | :--------------------------------- | :------------------------------------- |
> > | **Pengguna** | Clerk, IT Professional  | Knowledge worker (eksekutif, analis)  |
> > | **Fungsi** | Operasi sehari-hari      | Dukungan keputusan          |
> > | **Desain DB** | Berorientasi aplikasi (ER Model)  | Berorientasi subjek (Star Schema, dll.)  |
> > | **Data** | Current, up-to-date; Detailed, flat relasional; Isolated  | Historical; Summarized, multi-dimensional; Integrated, consolidated  |
> > | **Penggunaan** | Repetitif               | Ad-hoc, eksplorasi          |
> > | **Akses** | Read/Write; Index/hash pada PK  | Lots of scans; Complex query  |
> > | **Unit of Work** | Short, simple transaction  | Complex query               |
> > | **Jumlah Record Diakses** | Tens                    | Millions                    |
> > | **Jumlah Pengguna** | Thousands               | Hundreds                    |
> > | **Ukuran DB** | 100MB-GB                | 100GB-TB                    |
> > | **Metrik** | Transaction throughput  | Query throughput, response time  |
> >
> >
> >

> [!cornell] #### Summary
> Model multidimensional merepresentasikan data sebagai **kubus (`cube`)** dengan **fakta** yang diukur oleh **`measures`** dan dianalisis melalui berbagai **`dimensions`**, yang diimplementasikan dalam *data warehouse* menggunakan **`fact tables`** (data transaksional yang besar) dan **`dimension tables`** (informasi atribut kecil). Pendekatan ini secara efektif menyelesaikan masalah kompleksitas dan performa *query* analisis yang muncul pada sistem OLTP tradisional, memungkinkan studi tren historis. Desain *data warehouse* umumnya mengikuti skema seperti **`Star Schema`**, **`Snowflake Schema`**, atau **`Fact Constellations`**. Perbedaan fundamental antara **OLTP (operasional, transaksi, data terkini)** dan **OLAP (analitis, dukungan keputusan, data historis)** menegaskan perlunya arsitektur *data warehouse* terpisah untuk analisis data skala besar.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Proses ETL (Extract, Transform, Load)**: Data dari berbagai sumber operasional diekstraksi, ditransformasi (dibersihkan, diintegrasikan, diagregasi), dan kemudian dimuat ke dalam *data warehouse*. Proses ETL ini merupakan inti dari *data warehousing*.
> - **Granularitas**: Tingkat detail data dalam *fact table* disebut granularitas. Memilih granularitas yang tepat sangat penting untuk *data warehouse* yang efektif. Data bisa disimpan pada granularitas paling rendah (misalnya, setiap transaksi individu) dan kemudian diagregasi untuk analisis tingkat tinggi.
> - **Inmon vs. Kimball**: Ada dua pendekatan utama dalam desain *data warehouse*: pendekatan "Top-Down" Ralph Kimball (berbasis *data mart* dan *star schema*) dan pendekatan "Bottom-Up" Bill Inmon (berbasis model data enterprise terintegrasi dan kemudian *data mart*). Keduanya memiliki kelebihan dan kekurangan tergantung pada kebutuhan organisasi.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Rick Sherman: "Business Intelligence Guidebook: From Data Integration to Analytics", Edisi ke-1, Bab 1: The Business Demand for Data, Information, and Analytics.
> - **Topik Terkait**: Pelajari tentang konsep *Data Marts*, *Online Analytical Processing (OLAP) Operations* (seperti *roll-up, drill-down, slice, dice, pivot*), dan *Business Intelligence (BI) Tools*.
>
> #### Eksplorasi Mandiri:
> - **Alat OLAP**: Eksplorasi alat-alat OLAP komersial atau *open-source* (misalnya, Tableau, Power BI, Mondrian OLAP, Apache Kylin) dan coba buat *dashboard* sederhana menggunakan data multidimensional.
> - **Desain Skema**: Latih diri Anda dalam mendesain *star schema* dan *snowflake schema* untuk skenario bisnis yang berbeda, mengidentifikasi *facts*, *measures*, dan *dimensions*.