---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Fondasi & Trade-Off: Monolith vs. Microservices
> 
> > ## Questions/Cues
> > 
> > - Apa itu Arsitektur Monolit?
> >     
> > - Apa saja karakteristik utamanya?
> >     
> > - Apa kelebihan arsitektur monolit?
> >     
> > - Mengapa monolit menjadi masalah?
> >     
> > - Apa itu Arsitektur Microservice?
> >     
> > - Apa pendorong utama adopsi microservice?
> >     
> > - Apa kelemahan arsitektur microservice?
> >     
> > - Kapan monolit bisa lebih unggul?
> >     
> > - Apa saja trade-off kunci antara keduanya?
> >     
> > 
> > ## Reference Points
> > 
> > - 06-IF4031-05e-2024-Microservice.pdf (hlm. 4-10)
> >     
> > - 07-IF4031-Microservices.pdf (hlm. 7-17, 39-41)
> >     
> 
> > ### Arsitektur Monolit: Satu untuk Semua
> > 
> > Arsitektur monolit (atau monolitik) adalah model pengembangan perangkat lunak tradisional di mana seluruh aplikasi dibangun sebagai **satu unit tunggal yang utuh dan tidak terpisahkan**.
> > 
> > **Analogi Praktis:** Bayangkan sebuah kereta api barang yang sangat panjang. Setiap gerbong (misalnya, gerbong _User Accounts_, _Product Catalog_, _Shopping Cart_) memiliki fungsi yang berbeda, tetapi semuanya terhubung secara kaku dalam satu rangkaian. Jika satu gerbong mengalami masalah atau perlu perbaikan, seluruh kereta harus berhenti.
> > 
> > Secara teknis, semua komponen (UI, logika bisnis, akses data) berada dalam satu _codebase_, dikompilasi bersama, dan di-_deploy_ sebagai satu artifak (misalnya, satu file `.war` atau `.jar`). Komunikasi antar komponen terjadi melalui pemanggilan fungsi atau metode langsung di dalam memori, yang membuatnya sangat cepat.
> > 
> > ### Karakteristik dan Kelebihan Monolit
> > 
> > - **Satu Codebase (Single Codebase):** Semua kode sumber aplikasi berada dalam satu repositori. Ini mempermudah pengembangan awal karena IDE dan _tooling_ dapat mengelola keseluruhan proyek dengan mudah.
> >     
> > - **Pengembangan Awal yang Sederhana:** Proses pengembangan, _debugging_, dan _deployment_ di awal sangat lugas. Pengembang hanya perlu menjalankan satu aplikasi.
> >     
> > - **Performa Internal Cepat:** Karena semua komponen berjalan dalam proses yang sama, komunikasi antar-mereka tidak memiliki _overhead_ jaringan (latensi), sehingga sangat efisien.
> >     
> > - **Manajemen Operasional Terpusat:** Biasanya dikelola oleh satu tim operasional, membuatnya lebih mudah untuk ditangani pada skala kecil hingga menengah.
> >     
> > 
> > ### "Why not Monolith?": Kekurangan dan Batasan
> > 
> > Seiring pertumbuhan aplikasi dan organisasi, model monolit mulai menunjukkan kelemahan signifikan:
> > 
> > - **Sulit untuk Deployment Cepat (**_**Frequent Deployment**_**):** Perubahan sekecil apa pun, bahkan pada satu komponen, memerlukan _build_, tes, dan _deploy_ ulang keseluruhan aplikasi. Ini memperlambat siklus rilis dan menghambat _continuous delivery_.
> >     
> > - **Skalabilitas yang Tidak Efisien (**_**Undifferentiated Scaling**_**):** Jika hanya satu fitur (misalnya, _Product Catalog_) yang mengalami beban tinggi, kita harus men-skalakan seluruh aplikasi dengan menduplikasi semuanya di beberapa server. Ini boros sumber daya karena fitur lain yang tidak sibuk ikut digandakan.
> >     
> > - **Keterikatan Teknologi (**_**Technology Lock-in**_**):** Seluruh aplikasi terikat pada satu tumpukan teknologi (misalnya, semua harus menggunakan Java). Mengadopsi teknologi baru atau bahasa pemrograman yang lebih sesuai untuk fungsi tertentu menjadi sangat sulit.
> >     
> > - **Kurang Andal (**_**Less Reliability**_**):** Sebuah _bug_ atau _memory leak_ di satu komponen dapat meruntuhkan seluruh aplikasi (_single point of failure_). Isolasi kesalahan sangat buruk.
> >     
> > - **Kompleksitas Perawatan:** Seiring waktu, _codebase_ menjadi sangat besar dan saling terkait erat (_tightly coupled_). Memahami dan memodifikasi kode menjadi sulit, terutama bagi pengembang baru.
> >     
> > 
> > ### Arsitektur Microservice: Satu Tugas, Satu Service
> > 
> > Microservice adalah gaya arsitektur di mana sebuah aplikasi besar disusun sebagai **kumpulan layanan-layanan kecil yang independen**. Setiap layanan:
> > 
> > - Berjalan dalam prosesnya sendiri.
> >     
> > - Berfokus pada satu kapabilitas bisnis yang spesifik (_Single Responsibility Principle_).
> >     
> > - Berkomunikasi dengan layanan lain melalui mekanisme ringan seperti API berbasis HTTP (misalnya, REST).
> >     
> > - Dapat dikembangkan, di-_deploy_, dan diskalakan secara mandiri.
> >     
> > 
> > **Analogi Praktis:** Alih-alih satu kereta api, bayangkan armada mobil van pengiriman. Setiap van (layanan) memiliki satu tugas spesifik (misalnya, mengantar paket ke area A), memiliki pengemudinya sendiri (tim pengembang), dan dapat beroperasi secara independen. Jika satu van mogok, van lain tetap bisa beroperasi.
> > 
> > Pendorong utama adopsi microservice adalah kebutuhan **koordinasi antar tim yang lebih baik** dan **kecepatan pengiriman fitur**. Setiap tim kecil (aturan "Two Pizza Team" dari Amazon) bisa memiliki dan mengelola satu atau beberapa microservice, memungkinkan mereka bekerja secara paralel dan lebih cepat.
> > 
> > ### "Why not Microservices?": Kompleksitas Baru
> > 
> > Microservice memecahkan banyak masalah monolit, tetapi memperkenalkan serangkaian tantangannya sendiri:
> > 
> > - **Kompleksitas Sistem Terdistribusi:** Mengelola komunikasi jaringan, latensi, dan potensi kegagalan antar layanan adalah hal yang rumit.
> >     
> > - **Manajemen Data yang Sulit:** Setiap layanan idealnya memiliki database sendiri. Hal ini menyulitkan pengelolaan transaksi yang melibatkan beberapa layanan dan menjaga konsistensi data (_eventual consistency_).
> >     
> > - **Overhead Operasional (DevOps):** Dibutuhkan _tooling_ dan otomatisasi yang canggih untuk men-_deploy_, memonitor, dan mengelola puluhan hingga ratusan layanan.
> >     
> > - **Pengujian Menjadi Kompleks:** Menguji sebuah alur bisnis yang melibatkan beberapa layanan memerlukan lingkungan yang terintegrasi dan lebih kompleks.
> >     
> > 
> > ### Studi Kasus: Kapan Monolit Lebih Baik?
> > 
> > Microservice bukanlah solusi mujarab. Pada kasus **Prime Video**, tim mereka beralih kembali dari microservices ke monolit untuk layanan _audio/video monitoring_. Alasannya, untuk tugas spesifik tersebut, arsitektur microservice menciptakan _overhead_ komunikasi jaringan dan biaya infrastruktur yang tidak perlu. Arsitektur monolit ternyata lebih efisien, lebih tangguh, dan lebih hemat biaya **untuk konteks masalah tersebut**. Ini menunjukkan bahwa pilihan arsitektur adalah strategi, bukan dogma.
> > 
> > ### Trade-Off Kunci: Monolith vs. Microservices
> > 
> > Pilihan antara keduanya selalu melibatkan pertukaran:
> > 
> > 1. **Batas Layanan vs. Performa:** Microservice memberikan batas layanan yang jelas (_independent deployment_), tetapi menimbulkan _overhead_ komunikasi jaringan. Monolit memiliki performa internal super cepat tetapi komponennya saling terkait.
> >     
> > 2. **Independensi vs. Konsistensi:** Microservice memungkinkan _deployment_ mandiri tetapi menciptakan tantangan dalam menjaga konsistensi data lintas database (_eventual consistency_). Monolit menjamin konsistensi transaksional (ACID) dengan mudah tetapi mengorbankan independensi.
> >     
> > 3. **Independensi vs. Kompleksitas Operasional:** Kebebasan untuk men-_deploy_ layanan kapan saja di microservice harus dibayar dengan kompleksitas dalam hal _testing_, _debugging_, dan _monitoring_ sistem terdistribusi.
> >     
> > 4. **Keragaman Teknologi vs. Biaya Integrasi:** Microservice memungkinkan setiap tim memilih teknologi terbaik untuk tugasnya (_polyglot_), tetapi ini membuat integrasi antar layanan menjadi lebih kompleks.
> >     

> [!cornell] #### Summary
> 
> Arsitektur Monolit membangun aplikasi sebagai satu unit tunggal yang terintegrasi, menawarkan kesederhanaan di awal pengembangan namun menjadi sulit diskalakan, dirawat, dan diperbarui seiring pertumbuhan aplikasi. Sebaliknya, Arsitektur Microservice memecah aplikasi menjadi kumpulan layanan kecil yang independen, memungkinkan _**deployment**_ yang cepat, skalabilitas yang efisien, dan fleksibilitas teknologi, tetapi dengan mengorbankan peningkatan kompleksitas operasional dan tantangan dalam manajemen data terdistribusi. Pilihan di antara keduanya bukanlah tentang mana yang secara absolut lebih baik, melainkan sebuah keputusan strategis yang harus mempertimbangkan trade-off antara kecepatan pengembangan, kebutuhan skalabilitas, ketahanan sistem, dan struktur organisasi tim.