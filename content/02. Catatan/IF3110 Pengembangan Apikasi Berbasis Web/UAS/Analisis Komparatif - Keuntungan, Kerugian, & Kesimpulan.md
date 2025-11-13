---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - 5 Kelebihan Microservices?
> >     
> > - Technology Heterogeneity?
> >         
> > - Scaling?
> >         
> > - Ease of Deployment?
> >         
> > - Organizational Alignment?
> >         
> > - Composability?
> >         
> > - 8 Kerugian (Pain Points)?
> >     
> > - Developer Experience?
> >         
> > - Technology Overload?
> >         
> > - Cost?
> >         
> > - Reporting?
> >         
> > - Monitoring / Troubleshooting?
> >         
> > - Security?
> >         
> > - Testing?
> >         
> > - Latency & Data Consistency?
> >         
> > - Kesimpulan: Haruskah pakai?
> >     
> > - Alternatif: Monolith First?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-11b-Intro-to-Microservices-Arch.pdf (Slide 22-31)
> >     
> 
> > ### 5 Kelebihan Utama Microservices
> >
> > 1. ## **Technology Heterogeneity (Keberagaman Teknologi):**
> >     
> > 	- Kita bisa memilih *tools* yang tepat untuk pekerjaan yang tepat.
> > 	- Contoh: Layanan `Posts` pakai Ruby (dengan *Document store*), layanan `Friends` pakai Golang (dengan *Graph DB*), layanan `Pictures` pakai Java (dengan *Blob store*).
> >
> >
> > 2. ## **Scaling (Penskalaan):**
> >     
> > 	- Dengan layanan yang lebih kecil, kita bisa men-*scale* **hanya** layanan yang membutuhkan.
> > 	- Contoh: Jika layanan `Pictures` sangat sibuk, kita bisa menjalankan 6 *instance* `Pictures`, sementara `Posts` (3 *instance*) dan `Friends` (2 *instance*) tetap sedikit. Di *monolith*, kita harus men-*scale* semuanya bersama-sama.
> > 	
> >
> > 3. **Ease of Deployment (Kemudahan Deployment):**
> >     
> > 	- Perubahan 1 baris di *monolith* 1 juta baris mengharuskan seluruh aplikasi di-*deploy* ulang (risiko tinggi).
> > 	- Di *microservices*, kita bisa ubah 1 layanan dan men-*deploy* **hanya layanan itu** (risiko rendah, independen).
> > 
> >
> > 4. **Organizational Alignment (Kesejajaran Organisasi):**
> >     
> > 	- Tim yang lebih kecil yang bekerja di *codebase* yang lebih kecil cenderung **lebih produktif**.
> > 	- *Microservices* memungkinkan kita menyelaraskan arsitektur dengan organisasi (tim per domain bisnis).
> > 
> >
> > 5. **Composability (Dapat Disusun):**
> >     
> > 	- Membuka peluang untuk *reuse* fungsionalitas. Fungsionalitas (misal: layanan `Shipping`) dapat dikonsumsi dengan cara yang berbeda oleh konsumen yang berbeda (misal: oleh aplikasi web internal dan aplikasi *mobile* eksternal).
> > 	
> >
> > ### Kerugian / Pain Points Microservices
> >
> > _Microservices_ memiliki biaya dan kompleksitas yang tinggi.
> >
> > 1. **Developer Experience:** Bisa jadi sulit. Menjalankan 50 _microservices_ di 1 laptop developer bisa sangat berat.
> >     
> > 2. **Technology Overload:** Terlalu banyak teknologi baru (Docker, Kubernetes, gRPC, Kafka, dll) yang harus dipelajari.
> >     
> > 3. **Cost:** Biaya meningkat. Kita menjalankan lebih banyak proses, butuh lebih banyak _server_, mungkin lebih banyak lisensi _software_, dan ada **biaya waktu** untuk mempelajari semua ini.
> >     
> > 4. **Reporting:** Menjadi **jauh lebih sulit**. Di _monolith_, data ada di satu _database_ (mudah di-JOIN). Di _microservices_, data tersebar di puluhan _database_ yang terisolasi.
> >     
> > 5. **Monitoring & Troubleshooting:** Jauh lebih kompleks. Jika sebuah _request_ gagal, di mana letak kegagalannya? (di layanan A, B, atau C?). Butuh _tools_ _distributed tracing_.
> >     
> > 6. **Security:** Permukaan serangan lebih luas. Kita harus mengamankan komunikasi data antar layanan di jaringan (_data in transit_).
> >     
> > 7. **Testing:** _End-to-end testing_ menjadi mimpi buruk karena harus men-_deploy_ dan mengkonfigurasi banyak layanan yang berbeda hanya untuk 1 skenario tes.
> >     
> > 8. **Latency & Data Consistency:** Masalah inti dari sistem terdistribusi.
> >     
> >     - **Latency:** Panggilan fungsi _in-process_ di _monolith_ sangat cepat. Panggilan API antar layanan via jaringan jauh lebih lambat.
> >         
> >     - **Data Consistency:** Menjaga konsistensi data di banyak _database_ (transaksi terdistribusi) adalah masalah yang sangat sulit (seringkali harus menerima _eventual consistency_).
> >         
> >
> > ### Kesimpulan: Haruskah Saya Menggunakan Microservices?
> >
> > - **Bukan** _**default**_**:** Ini adalah _sebuah_ pendekatan, bukan _satu-satunya_ pendekatan.
> >     
> > - **Masalah Organisasi:** _Microservices_ seringkali merupakan solusi untuk **masalah organisasi** (memungkinkan tim besar bekerja paralel), BUKAN masalah teknis.
> >     
> >
> > **Bertahan dengan Monolith:**
> >
> > - Kecuali Anda punya alasan yang sangat kuat, **berhati-hatilah**.
> >     
> > - Ada banyak keuntungan membangun **Monolith First**. Jauh lebih sederhana untuk dioperasikan dan dipahami.
> >     
> > - **Modular Monolith:** Anda dapat mengatasi banyak tantangan _scaling_ dan _developer experience_ dengan membangun _Modular Monolith_ (kode terstruktur dengan batasan domain yang jelas). Ini seringkali merupakan titik awal terbaik.
> >     

> [!cornell] #### Summary
> 
> _Microservices_ menawarkan keunggulan kuat dalam _**Technology Heterogeneity**_ (pilih _tools_ terbaik), _**Scaling**_ (granuler), _**Ease of Deployment**_ (independen, risiko rendah), dan _**Organizational Alignment**_ (tim kecil produktif). Namun, keunggulan ini dibayar mahal dengan _**Pain Points**_ yang signifikan, terutama kompleksitas sistem terdistribusi seperti _**Latency**_, _**Data Consistency**_, dan kesulitan ekstrem dalam _**Reporting**_ **dan** _**End-to-End Testing**_. _Microservices_ seringkali merupakan solusi untuk **masalah organisasi (skala tim)**, bukan teknis. Banyak sistem lebih baik dimulai sebagai _**Modular Monolith**_ yang terstruktur dengan baik.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Strategi "Monolith First"
> 
> _Slide_ terakhir (slide 31) menyiratkan strategi yang sangat populer di industri: **"Monolith First"**.
> 
> - **Ide:** Jangan memulai proyek baru dengan arsitektur _microservices_. Anda akan menghabiskan 6 bulan untuk membangun infrastruktur (Kubernetes, Kafka, CI/CD) sebelum 1 baris kode bisnis ditulis.
>     
> - **Langkah 1:** Mulailah dengan membangun **Modular Monolith**. Fokus pada batasan yang bersih antar modul Anda. Ini memungkinkan Anda bergerak cepat, menghindari pusingnya sistem terdistribusi, dan menemukan _product-market fit_.
>     
> - **Langkah 2:** Seiring pertumbuhan aplikasi, Anda akan mulai "merasakan sakit". _Delivery contention_ akan mulai terjadi. Mungkin 90% sistem baik-baik saja, tapi modul `Payment` atau `Reporting` sangat lambat berubah dan butuh _scaling_ khusus.
>     
> - **Langkah 3:** _Hanya_ pada saat itu, Anda "mengukir" (_carve out_) modul `Payment` menjadi _**microservice**_ **pertama** Anda.
>     
> 
> Dengan cara ini, Anda berevolusi ke _microservices_ secara pragmatis, berdasarkan kebutuhan nyata, bukan berdasarkan _hype_ arsitektur.