---

type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Kerangka Kerja (Framework) Data Management
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan **Framework** DM?
> >     
> > - Apa itu **Strategic Alignment Model**?
> >     
> > - Apa itu **Amsterdam Information Model (AIM)**?
> >     
> > - Apa itu **DAMA DMBOK Framework**?
> >     
> > - Apa itu **DAMA Wheel**?
> >     
> > - Apa **pusat** dari DAMA Wheel?
> >     
> > - Apa 10 _Knowledge Areas_ di DAMA Wheel?
> >     
> > - Apa 3 faktor di **DAMA Environmental Factors**?
> >     
> > - Apa itu **DAMA Pyramid (Aiken)**?
> >     
> > - Apa fondasi dari Piramida Aiken?
> >     
> > - Apa itu **DAMA Framework Evolved (Geuens)**?
> >     
> > - Apa fondasi dari framework Geuens?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "14 - Data Management.pdf" (Slide 16-25)
> >     
> > - DAMA DMBOK, Chapter 1
> >     
> 
> > ### Mengapa Perlu Framework?
> > 
> > Framework (kerangka kerja) menyediakan berbagai perspektif tentang cara mendekati Data Management (DM). Ini membantu untuk:
> > 
> > - Mengklarifikasi strategi.
> >     
> > - Mengembangkan _roadmap_ (peta jalan).
> >     
> > - Mengorganisasi tim.
> >     
> > - Menyelaraskan berbagai fungsi.
> >     
> > 
> > ### 1. Strategic Alignment Model (SAM)
> > 
> > ![[Pasted image 20251219001548.png]]
> > 
> > - Model ini menunjukkan **penyelarasan** fundamental antara **Bisnis** dan **IT**, yang dibagi lagi menjadi level **Strategi** dan **Operasi**.
> >     
> > - **Information (Informasi)** dan **Data** berada di tengah, berfungsi sebagai **jembatan** yang menghubungkan strategi bisnis (misal: "ingin jadi no. 1 di e-commerce") dengan sistem IT (misal: "butuh aplikasi mobile").
> >     
> > 
> > ### 2. The Amsterdam Information Model (AIM)
> > 
> > ![[Pasted image 20251219001601.png]]
> > 
> > - Ini adalah versi lebih detail dari SAM.
> >     
> > - Model ini membagi organisasi menjadi 3x3 grid:
> >     
> >     - **Kolom (Domain)**: Business, Information, IT.
> >         
> >     - **Baris (Level)**: Strategy, Tactics (Arsitektur), Operations.
> >         
> > - Model ini menyoroti **Information Governance** (Tata Kelola Informasi) dan **Data Quality** (Kualitas Data) sebagai payung yang melingkupi semua domain.
> >     
> > 
> > ### 3. The DAMA DMBOK Framework
> > 
> > Ini adalah framework standar industri dari DAMA (Data Management Association).
> > 
> > **a) DAMA Wheel (Roda DAMA)**
> > 
> > ![[Pasted image 20251219001620.png]]
> > 
> > - Framework paling terkenal. Berbentuk roda yang mendefinisikan _Knowledge Areas_ (Area Pengetahuan) dari DM.
> >     
> > - **Pusat Roda**: **Data Governance (Tata Kelola Data)**. Ini adalah inti yang mengendalikan semua area lain.
> >     
> > - **10 Area Pengetahuan (di Roda)**:
> >     
> >     1. Data Architecture
> >         
> >     2. Data Modeling & Design
> >         
> >     3. Data Storage & Operations
> >         
> >     4. Data Security
> >         
> >     5. Data Integration & Interoperability
> >         
> >     6. Document & Content Management
> >         
> >     7. Reference & Master Data
> >         
> >     8. Data Warehousing & Business Intelligence
> >         
> >     9. Metadata
> >         
> >     10. Data Quality
> >         
> > 
> > **b) Environmental Factors (Hexagon)**
> > 
> > ![[Pasted image 20251219001633.png]]
> > 
> > - Menunjukkan bahwa untuk sukses, setiap _Knowledge Area_ harus menyeimbangkan tiga faktor: **People** (Orang), **Process** (Proses), dan **Technology** (Teknologi).
> >     
> > - _Goals & Principles_ (Tujuan & Prinsip) ada di pusatnya.
> >     
> > 
> > ### 4. DAMA Pyramid (Aiken)
> > 
> > ![[Pasted image 20251219001656.png]]
> > 
> > - Framework ini menggunakan area DAMA Wheel tetapi menyusunnya sebagai piramida untuk menunjukkan **ketergantungan** dan **urutan implementasi**.
> >     
> > - **Fondasi (Fase 1 & 2)**: **Data Governance**, **Data Quality**, **Data Architecture**, **Metadata**. Anda tidak bisa membangun _data warehouse_ (Fase 3) jika fondasi kualitas data dan tata kelolanya berantakan.
> >     
> > - **Puncak (Fase 4)**: _Advanced Practices_ (Mining, Analytics, Big Data).
> >     
> > 
> > ### 5. DAMA Framework Evolved (Geuens)
> > 
> > ![[Pasted image 20251219001707.png]]
> > 
> > - Versi lain yang juga menunjukkan ketergantungan.
> >     
> > - **Fondasi (Data Governance)**: Mencakup Metadata, Security, Architecture, Reference Data.
> >     
> > - **Tengah (Fungsi Inti)**: Data Quality, Data Design, Integration.
> >     
> > - **Puncak (Output)**: Master Data, Data Warehouse, BI/Analytics.
> >     

> [!cornell] #### Summary
> 
> **Framework Data Management (DM) membantu organisasi menyusun strategi dan mengimplementasikan DM. Model awal seperti **Strategic Alignment Model** dan **Amsterdam Information Model** menunjukkan hubungan antara Bisnis, Informasi, dan IT. Framework standar industri, **DAMA DMBOK**, menggunakan **DAMA Wheel** untuk mendefinisikan 10** _**Knowledge Area**_ **(area pengetahuan) dengan **Data Governance** sebagai pusatnya, serta menyeimbangkan faktor **People, Process, & Technology**. Variasi lain seperti **Aiken's Pyramid** dan **Geuens' Evolved Framework** menyusun area-area ini secara hirarkis untuk menunjukkan ketergantungan implementasi, di mana **Data Governance** dan **Data Quality** selalu menjadi fondasi utama.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Data Governance vs. Data Management
> 
> DAMA Wheel menempatkan _Data Governance_ di pusat. Apa bedanya dengan _Data Management_?
> 
> - **Data Management (DM)**: Adalah _keseluruhan_ disiplin (roda). Ini adalah **pelaksanaan** pekerjaan (misal: tim DBA melakukan _backup_ database, tim ETL memuat data).
>     
> - **Data Governance (DG)**: Adalah _fungsi pengawasan dan strategi_ (pusat roda). Ini **bukan** pelaksana, melainkan pembuat aturan. DG menentukan:
>     
>     - Siapa yang _boleh_ mengakses data?
>         
>     - Siapa yang _bertanggung jawab_ atas data (Data Stewardship)?
>         
>     - Apa _definisi_ standar dari data (misal: "Pelanggan Aktif")?
>         
>     - Apa _kebijakan_ (policy) keamanan dan kualitas data?
>         
> 
> Singkatnya: **Data Management** adalah _melakukan pekerjaan_, **Data Governance** adalah _memastikan pekerjaan dilakukan dengan benar_ sesuai aturan.
> 
> #### Pendalaman Teknis: Master Data vs. Reference Data
> 
> Dua area di DAMA Wheel yang sering tertukar:
> 
> - **Reference Data**: Data yang digunakan untuk _mengklasifikasikan_ data lain. Cenderung statis.
>     
>     - Contoh: Daftar kode negara (ID, US, SG), daftar jenis kelamin (L, P), daftar kategori produk (Elektronik, Pakaian).
>         
> - **Master Data**: Data inti, penting, dan _shared_ (dibagi) tentang _business entity_ utama.
>     
>     - Contoh: Data Pelanggan (Nama, Alamat, Tgl Lahir), Data Produk (Nama Produk, SKU), Data Karyawan.
>         
> 
> Jika _Master Data_ Anda berantakan (misal: 1 pelanggan tercatat 3x dengan ejaan nama beda), bisnis Anda akan kacau.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: DAMA DMBOK: Data Management Body of Knowledge, 2nd Edition, Chapter 1 & 3.
>     
> - **Konsep**: "Data Governance", "Master Data Management (MDM)".
>