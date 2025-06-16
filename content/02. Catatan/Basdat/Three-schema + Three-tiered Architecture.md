---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu *Three-schema architecture*?
> > - Apa itu *External Schema*?
> > - Apa itu *Conceptual Schema*?
> > - Apa itu *Internal Schema*?
> > - Bagaimana pengembangan arsitektur *three-tiered*?
> > - Apa itu *Three-tiered client/server database architecture*?
> > - Apa peran *Client Tier*?
> > - Apa peran *Application/Web Tier*?
> > - Apa peran *Enterprise Tier*?
> >
> > ## Reference Points
> > - Slide 16-18 dari "22. IF2240-SemII_2324-m15-1-DB-Development-Process.pdf"
>
> > ### Three-Schema Architecture
> > - Arsitektur tiga skema adalah konsep dalam desain *database* yang memisahkan tampilan data dari penyimpanan fisiknya, memungkinkan fleksibilitas dan abstraksi.
> > - **Tiga Tingkatan Skema**:
> >   1.  **`External Schema` (User View)**:
> >       - Merupakan tampilan *database* yang **berbeda untuk orang yang berbeda**.
> >       - Mencerminkan bagaimana pengguna akhir atau aplikasi melihat data.
> >       - Contoh: Tampilan laporan, tampilan layar, atau form order.
> >   2.  **`Conceptual Schema` (Enterprise Data Model)**:
> >       - Merupakan model data *enterprise* yang **menjelaskan seluruh struktur *database* secara logis**, terlepas dari detail fisik atau bagaimana data digunakan oleh aplikasi tertentu.
> >       - Bertujuan untuk memberikan pemahaman umum tentang proyek *database*.
> >   3.  **`Internal Schema` (Physical Schemas)**:
> >       - Merupakan desain dan implementasi **dasar atau fisik** dari *database*.
> >       - Menjelaskan bagaimana data disimpan secara fisik di media penyimpanan.
> >       - Contoh: `Physical Schema 1`, `Physical Schema 2`, `Physical Schema m`.
> >
> > - **Proses Pengembangan Arsitektur Tiga Tingkat (Developing the three-tiered architecture)**:
> >   - **START HERE**: Pemahaman umum tentang persyaratan *database* proyek (*General understanding of project's database requirements*).
> >   - **`Develop conceptual schema`**: Berdasarkan model data *enterprise*.
> >   - **`Develop user views (external schemas) and logical database specifications`**: Berdasarkan pemahaman transaksi, laporan, tampilan layar, dan penggunaan *database*.
> >     - Terjadi bolak-balik antara pengembangan *conceptual schema* dan *user views* (External Schemas).
> >   - **`Develop physical schema`**: Dilakukan setelah *conceptual* dan *external databases* sepenuhnya didefinisikan.
> >     - Dipengaruhi oleh fitur perangkat keras dan perangkat lunak, karakteristik fisik data, dan ekspektasi performa.
> >     - Terjadi bolak-balik antara *develop physical schema* dan *user views* untuk memastikan ekspektasi performa terpenuhi.
> >
> > ### Three-Tiered Client/Server Database Architecture
> > - Arsitektur tiga tingkat adalah model arsitektur sistem yang memisahkan aplikasi menjadi tiga lapisan logis atau fisik, yang meningkatkan skalabilitas, fleksibilitas, dan keamanan.
> > - **Tiga Tingkatan (Tiers)**:
> >   1.  **`Client Tier`**:
> >       - Merupakan lapisan presentasi tempat pengguna berinteraksi langsung dengan aplikasi.
> >       - Biasanya berupa *browser* atau aplikasi klien dengan sedikit atau tanpa *database* lokal.
> >       - Contoh: Akun dibayar, analis *cash flow*, perwakilan layanan pelanggan.
> >   2.  **`Application/Web Tier`**:
> >       - Merupakan lapisan tengah yang berisi logika bisnis dan memproses permintaan dari *client tier*.
> >       - Bertindak sebagai perantara antara *client tier* dan *enterprise tier*.
> >       - Menangani pemrosesan Akun Dibayar (A/P), Akun Diterima (A/R), pemrosesan pesanan, kontrol inventaris, dan sebagainya; akses dan konektivitas ke DBMS; halaman Web dinamis; manajemen sesi.
> >       - Biasanya berjalan di *Application/Web server*.
> >   3.  **`Enterprise Tier`**:
> >       - Merupakan lapisan data, tempat *database* reside.
> >       - Berisi *database* transaksi yang mengandung semua data organisasi atau ringkasan data di server departemen.
> >       - Biasanya berjalan di *Enterprise server* dengan DBMS.

> [!cornell] #### Summary
> **Arsitektur tiga skema** dalam desain *database* memisahkan data menjadi tiga tingkatan abstraksi: **`External Schema`** (tampilan pengguna spesifik), **`Conceptual Schema`** (model logis seluruh *database*), dan **`Internal Schema`** (penyimpanan fisik data), yang memungkinkan fleksibilitas dan pemeliharaan independen. Sementara itu, **arsitektur tiga tingkat *client/server*** membagi sistem menjadi lapisan **`Client Tier`** (presentasi pengguna), **`Application/Web Tier`** (logika bisnis dan manajemen sesi), dan **`Enterprise Tier`** (lapisan data dan DBMS), meningkatkan skalabilitas, fleksibilitas, dan keamanan dengan memisahkan tanggung jawab.


> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Data Independence**: Arsitektur tiga skema mendukung *data independence*, yaitu kemampuan untuk mengubah skema pada satu level tanpa memengaruhi skema pada level di atasnya.
>   - **Logical Data Independence**: Perubahan pada *conceptual schema* tidak memengaruhi *external schemas*.
>   - **Physical Data Independence**: Perubahan pada *internal schema* tidak memengaruhi *conceptual schema*.
> - **Middleware**: Lapisan tengah dalam arsitektur tiga tingkat sering disebut *middleware*, yang menyediakan layanan seperti koneksi *database*, manajemen transaksi, dan *load balancing*.
> - **N-Tier Architecture**: Arsitektur tiga tingkat dapat diperluas menjadi N-tingkat (*N-tiered architecture*) untuk kompleksitas atau skalabilitas yang lebih besar, dengan memecah lapisan aplikasi menjadi sub-lapisan yang lebih kecil.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Jeffrey A. Hoffer, V. Ramesh, Heikki Topi: "Modern Database Management", 10th Edition, Chapter 1: The Database Environment and Development Process.
> - **Arsitektur Sistem**: Pelajari lebih lanjut tentang arsitektur perangkat lunak seperti *Monolithic*, *Microservices*, dan *Service-Oriented Architecture (SOA)* untuk memahami bagaimana *database* berintegrasi dalam konteks yang lebih luas.
>
> #### Eksplorasi Mandiri:
> - **Identifikasi Skema**: Untuk aplikasi yang Anda gunakan sehari-hari (misalnya, aplikasi perbankan online, media sosial), coba identifikasi potensi *external*, *conceptual*, dan *internal schema* yang mungkin ada.
> - **Perbandingan Arsitektur**: Bandingkan arsitektur *client/server* dua tingkat tradisional dengan arsitektur tiga tingkat dalam hal skalabilitas, keamanan, dan pemeliharaan.