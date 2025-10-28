---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Complex Event Processing (CEP)?
> >     
> > - Tantangan CEP?
> >     
> > - Data Federation vs Virtualization?
> >     
> > - Apa itu Data-as-a-Service (DaaS)? (Internal & Eksternal)
> >     
> > - Cloud-based Integration (IPaaS)?
> >     
> > - Pentingnya Data Exchange Standards?
> >     
> > - Contoh Standar? (GTFS, HL7, FDX)
> >     
> > - Tools untuk DII?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 35-41
> >     
> 
> > ### Complex Event Processing (CEP)
> > 
> > **CEP** adalah sebuah metode untuk **melacak dan menganalisis (memproses)** _**aliran**_ **(streams) informasi (data)** tentang hal-hal yang terjadi (events) secara _real-time_ untuk mengambil kesimpulan.
> > 
> > Sesuai namanya ("Complex"), CEP menggabungkan data dari _berbagai sumber_ untuk mengidentifikasi _event yang bermakna_ (seperti peluang atau ancaman) untuk memprediksi perilaku dan memicu respons otomatis.
> > 
> > - **Contoh Event:** Klik di website, order, tweet, data sensor IoT, harga saham, laporan cuaca.
> >     
> > - **Contoh CEP:** Mendeteksi pola _fraud_ kartu kredit. (Event 1: Transaksi di Jakarta jam 13:00) + (Event 2: Transaksi di Singapura jam 13:05) = _Complex Event_ "Pola Transaksi Mencurigakan" -> Picu Aksi "Blokir Kartu".
> >     
> > - **Tantangan:** Laju event sangat tinggi, sehingga tidak praktis untuk mengambil data tambahan. Lingkungan CEP harus bisa mengintegrasikan data dalam volume besar dan beragam jenis secara instan.
> >     
> > 
> > ### Data Federation & Virtualization
> > 
> > Ini adalah pendekatan integrasi data **tanpa memindahkan data secara fisik** (alternatif dari ETL).
> > 
> > - **Data Federation (Federasi):** Menyediakan akses ke kombinasi _data store individual_ yang terpisah, seolah-olah mereka satu.
> >     
> > - **Data Virtualization (Virtualisasi):** Memungkinkan _beberapa_ data store yang heterogen (berbeda jenis) untuk **dilihat (viewed)** sebagai satu database tunggal. Ini menciptakan "Virtual Data Layer" yang dilihat oleh pengguna, padahal datanya masih ada di lokasi aslinya.
> >     
> > 
> > ### Data-as-a-Service (DaaS)
> > 
> > DaaS memiliki dua arti:
> > 
> > 1. **Eksternal:** Data yang **dilisensikan dari vendor** dan disediakan sesuai permintaan (_on demand_). Contoh: Perusahaan Anda berlangganan _feed_ data harga saham dari Bursa Efek.
> >     
> > 2. **Internal:** Konsep di mana data enterprise (internal) atau layanan data disediakan untuk berbagai fungsi dan sistem operasional di dalam organisasi melalui "service" (biasanya API).
> >     
> > 
> > ### Cloud-based Integration (IPaaS)
> > 
> > **IPaaS (Integration Platform-as-a-Service)** adalah bentuk integrasi sistem yang disampaikan sebagai **layanan cloud (SaaS)**.
> > 
> > - **Pendorong:** Munculnya aplikasi SaaS (seperti Salesforce, Workday, Google Workspace) menciptakan kebutuhan untuk mengintegrasikan data yang lokasinya _di luar_ data center organisasi.
> >     
> > - IPaaS adalah solusi untuk "menjembatani" data antara aplikasi SaaS di cloud dengan sistem _on-premise_ (internal), atau antar-sesama aplikasi SaaS.
> >     
> > - Contoh vendor: MuleSoft Anypoint Platform, Boomi, Azure Data Factory.
> >     
> > 
> > ### Data Exchange Standards (Standar Pertukaran Data)
> > 
> > Ini adalah **aturan formal** untuk struktur elemen data. Standar ini sangat penting untuk menyederhanakan _interoperability_ (kemampuan sistem untuk bekerja sama). Jika semua pihak setuju pada satu format, biaya integrasi turun drastis.
> > 
> > - **Contoh Standar:**
> >     
> >     - `GTFS (General Transit Feed Specification)`: Standar _de facto_ di seluruh dunia untuk info transportasi publik (jadwal, rute, tarif).
> >         
> >     - `HL7 (Health Level Seven)`: Standar global untuk transfer data klinis dan administrasi kesehatan (rekam medis).
> >         
> >     - `FDX (Financial Data Exchange)`: Standar teknis (API) untuk berbagi data keuangan (antar bank dan aplikasi fintech).
> >         
> > 
> > ### Tools (Alat Bantu DII)
> > 
> > Ada banyak alat yang membantu proses DII, dikategorikan sebagai:
> > 
> > - **Data transformation engine/ETL tool:** (Contoh: Informatica, Talend, Microsoft SSIS, Azure Data Factory, Fivetran).
> >     
> > - **Data virtualization server:** (Contoh: Denodo, Tibco).
> >     
> > - **Enterprise Service Bus (ESB):** (Contoh: MuleSoft, TIBCO).
> >     
> > - **Business rules engine:** Mengelola logika/aturan bisnis secara terpusat.
> >     
> > - **Data and process modeling tools:** Alat untuk menggambar desain alur data.
> >     
> > - **Data profiling tools:** Alat untuk menganalisis kualitas data sumber.
> >     
> > - **Metadata repository:** Tempat penyimpanan "data tentang data" (misal: Business Glossary).
> >     

> [!cornell] #### Summary
> 
> **Arsitektur integrasi modern mencakup `CEP` (menganalisis event stream real-time untuk mendeteksi pola), `Data Virtualization` (mengakses data tanpa memindahkannya), dan `IPaaS` (platform integrasi berbasis cloud untuk menghubungkan aplikasi SaaS). Untuk memastikan interoperabilitas yang mulus antar organisasi, `Data Exchange Standards` (seperti HL7 untuk kesehatan atau GTFS untuk transportasi) sangat penting. Seluruh proses ini didukung oleh berbagai `Tools`, mulai dari engine ETL/Transformasi hingga ESB dan Metadata Repository.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: ETL vs Data Virtualization
> 
> Kapan menggunakan ETL (fisik) vs Virtualisasi (virtual)?
>
> |**Kriteria**|**ETL (Fisik)**|**Data Virtualization (Virtual)**|
> |---|---|---|
> |**Pergerakan Data**|Data disalin, ditransformasi, dan disimpan di target (fisik).|Data tetap di sumber. Hanya metadata dan _view_ yang dibuat.|
> |**Performa**|Cepat saat kueri, karena data sudah bersih & terstruktur di target (DW).|Performa tergantung sistem sumber. Bisa lambat jika sumber lambat atau _join_ antar sistem kompleks.|
> |**Aktualitas Data**|Latency tinggi (tergantung jadwal Batch/ETL).|Real-time. Kueri langsung mengambil data terbaru dari sumber.|
> |**Kasus Penggunaan**|Data Warehousing, Analisis Historis, BI Laporan standar.|Analisis Cepat (Data Discovery), Prototipe, Dashboard Real-time, menggabungkan data yang sulit dipindah.|
> 
> Seringkali, keduanya dipakai bersamaan. Virtualisasi dipakai di depan untuk _prototyping_ dan _discovery_, dan jika sebuah kueri virtual terbukti sangat bernilai dan sering dipakai, maka datanya akan dibuatkan alur ETL fisik permanen untuk performa yang lebih baik.
> 
> #### Eksplorasi Mandiri
> 
> - Kunjungi Google Maps dan aktifkan layer "Transit". Data yang Anda lihat (jadwal bus, rute KRL) adalah hasil implementasi dari **GTFS** (Data Exchange Standard). Coba pikirkan, mengapa standar ini penting? Apa yang akan terjadi jika setiap kota (Jakarta, Bandung, Surabaya) punya format data transportasi sendiri-sendiri?
>