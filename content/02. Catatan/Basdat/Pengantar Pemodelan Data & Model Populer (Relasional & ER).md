---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan dari _Data Modelling_?
> > - Apa saja 3 jenis model data dalam proses perancangan?
> > - Apa definisi dari _Data Model_?
> > - Bagaimana Model Relasional merepresentasikan data?
> > - Apa kegunaan utama dari Model E-R?
> > - Apa itu Entitas dan Relasi dalam Model E-R?
> 
> > ### Data Modelling (Pemodelan Data)
> > 
> > - **Definisi:** Sebuah teknik yang bertujuan untuk mengoptimalkan cara penyimpanan dan penggunaan informasi dalam sebuah organisasi. Proses ini dimulai dengan mengidentifikasi kelompok-kelompok data utama, kemudian dilanjutkan dengan mendefinisikan isi detail dari setiap kelompok tersebut. Hasilnya adalah definisi terstruktur untuk semua informasi yang disimpan.
> >     
> > - **Peran Penting:** Pemodelan data merupakan prasyarat yang sangat penting untuk berbagai tahap dalam siklus hidup sistem, termasuk analisis, desain, pemeliharaan, dokumentasi, dan bahkan untuk peningkatan kinerja sistem yang sudah ada.
> >     
> > - **Tiga Jenis Model Data dalam Perancangan:** Selama proses perancangan dari tahap awal hingga menjadi basis data fisik, ada tiga jenis model yang dihasilkan secara berurutan:
> >     
> >     - **Conceptual Data Model (Model Data Konseptual):** Ini adalah model tingkat tinggi yang bersifat independen terhadap teknologi. Tujuannya adalah untuk mendiskusikan dan memvalidasi kebutuhan data awal dengan para pemangku kepentingan bisnis, tanpa membicarakan detail teknis implementasi.
> >     - **Logical Data Model (Model Data Logis):** Model ini lebih detail dan mendeskripsikan struktur data yang sudah dapat diimplementasikan dalam sebuah basis data. Model ini menjelaskan entitas, atribut, dan relasi, namun masih belum terikat pada satu produk DBMS tertentu.
> >     - **Physical Data Model (Model Data Fisik):** Ini adalah model yang paling detail. Model ini mengorganisasi data ke dalam tabel-tabel spesifik, serta mempertimbangkan detail teknis seperti tipe data yang akan digunakan, metode akses, indeks untuk performa, dan bagaimana data akan disimpan secara fisik.
> > 
> > ### Data Model (Model Data)
> > 
> > - **Definisi:** Sebuah **Data Model** adalah kumpulan alat bantu konseptual yang digunakan untuk mendeskripsikan data, hubungan antar data, semantik (makna) data, dan batasan-batasan konsistensi data. Secara sederhana, model data adalah kerangka kerja teoretis yang menjadi dasar dari desain sebuah basis data.
> > 
> > ### Model Populer: Relational Model (Model Relasional)
> > 
> > - **Konsep Inti:** Model ini merepresentasikan data dan hubungan antar data menggunakan sekumpulan **tabel** dua dimensi. Setiap tabel mewakili satu jenis objek atau konsep (misalnya, tabel `mahasiswa`, tabel `mata_kuliah`), di mana baris berisi data individual dan kolom berisi atribut atau properti dari data tersebut.
> > - **Kelebihan:** Model ini sangat populer karena strukturnya yang sederhana, intuitif, dan didukung oleh teori matematika yang solid, yang membuatnya kuat dan fleksibel.
> > 
> > ### Model Populer: Entity-Relationship (E-R) Model
> > 
> > - **Konsep Inti:** Model E-R digunakan untuk memodelkan sebuah organisasi atau sistem sebagai kumpulan "entitas" dan "hubungan" di antara entitas-entitas tersebut. Model ini tidak langsung diimplementasikan, tetapi berfungsi sebagai cetak biru konseptual.
> >     
> > - **Tujuan Utama:** Model E-R banyak digunakan untuk **desain basis data tingkat tinggi atau konseptual**. Hasil dari desain menggunakan model E-R (yang disebut ER Diagram) biasanya akan dikonversi atau diterjemahkan ke dalam desain Model Relasional (berupa tabel-tabel) sebelum diimplementasikan.
> >     
> > - **Komponen Dasar:**
> >     
> >     - **Entitas (_Entity_):** Sebuah "hal" atau "objek" di dunia nyata yang dapat dibedakan dari objek lainnya, misalnya seorang mahasiswa spesifik, sebuah mobil, atau sebuah transaksi.
> >     - **Relasi (_Relationship_):** Sebuah hubungan atau asosiasi yang terjadi di antara beberapa entitas. Contohnya, relasi "Mendaftar" yang menghubungkan entitas "Mahasiswa" dengan entitas "Mata Kuliah".

> [!cornell] #### Summary
> 
> Pemodelan data adalah proses perancangan basis data yang fundamental, yang berjalan melalui tiga tahap: konseptual, logis, dan fisik. Model E-R sangat ideal digunakan pada tahap konseptual untuk memvisualisasikan entitas dan relasi di dunia nyata. Hasil dari model E-R ini kemudian diterjemahkan ke dalam Model Relasional, yang menggunakan struktur tabel yang logis dan intuitif, untuk implementasi basis data yang sebenarnya.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Bukan Hanya Relasional dan E-R
> 
> Meskipun Model Relasional dan E-R adalah yang paling dominan dan sering dibahas dalam konteks basis data modern, ada berbagai model data lain yang dikembangkan untuk kebutuhan yang berbeda, antara lain:
> 
> - Object-based data model (Model berorientasi objek)
> - Semi-structured data model (Contoh: XML)
> - Hierarical Model (Model Hirarkis)
> - Network Model (Model Jaringan) Model-model ini akan dibahas lebih lanjut pada catatan berikutnya.