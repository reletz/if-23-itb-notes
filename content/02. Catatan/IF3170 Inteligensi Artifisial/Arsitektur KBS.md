---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa saja komponen inti arsitektur KBS?
> >     
> > - Apa fungsi dari Knowledge Base?
> >     
> > - Apa isi dari Knowledge Base?
> >     
> > - Apa fungsi dari Inference Engine?
> >     
> > - Apa peran User Interface?
> >     
> > - Bagaimana alur interaksi dalam sistem?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Materi-05-Seg-01-KBS---WhatWhy.pdf
> >     
> 
> > ### Arsitektur Umum Knowledge-Based System
> > 
> > Arsitektur KBS, khususnya yang dicontohkan pada _Expert System_, dirancang untuk memisahkan basis pengetahuan dari mekanisme pemrosesan atau penalarannya. Ini adalah prinsip desain kunci yang membuatnya fleksibel. Arsitektur ini terdiri dari tiga komponen utama yang saling berinteraksi.
> > 
> > #### 1. Knowledge Base (Basis Pengetahuan)
> > 
> > Ini adalah **repositori atau "perpustakaan"** dari sistem. Komponen ini berfungsi untuk menyimpan semua pengetahuan yang relevan dengan domain masalah tertentu. Pengetahuan ini diekstraksi dari seorang pakar manusia (_human expert_).
> > 
> > - **Isi**: Berisi fakta-fakta, aturan-aturan (rules), konsep, relasi, dan heuristik (aturan praktis) yang mendefinisikan domain tersebut.
> >     
> > - **Analogi**: Jika sistem adalah seorang dokter, _Knowledge Base_ adalah gabungan dari semua buku teks kedokteran, jurnal penelitian, dan pengalaman klinis yang dimilikinya.
> >     
> > 
> > #### 2. Inference Engine (Mesin Inferensi)
> > 
> > Ini adalah **"otak" atau unit pemrosesan pusat** dari KBS. Komponen ini berfungsi untuk melakukan penalaran (_reasoning_) dengan cara menggunakan pengetahuan yang ada di _Knowledge Base_ untuk menyelesaikan masalah.
> > 
> > - **Fungsi**: Ia mengambil fakta-fakta yang diberikan oleh pengguna (melalui User Interface), mencocokkannya dengan pengetahuan di _Knowledge Base_, dan menarik kesimpulan atau solusi baru.
> >     
> > - **Mekanisme**: Menggunakan strategi penalaran seperti _Forward Chaining_ atau _Backward Chaining_ untuk menavigasi aturan dan fakta.
> >     
> > 
> > #### 3. User Interface (Antarmuka Pengguna)
> > 
> > Ini adalah **jembatan komunikasi** antara pengguna dan sistem. Komponen ini memungkinkan pengguna non-ahli untuk berinteraksi dengan sistem secara efektif.
> > 
> > - **Input**: Pengguna memasukkan pertanyaan (_query_), fakta, atau detail masalah ke dalam sistem.
> >     
> > - **Output**: Sistem menyajikan hasil, kesimpulan, atau saran (_advice_) kepada pengguna dalam format yang mudah dimengerti.
> >     
> > 
> > ### Alur Kerja Sistem
> > 
> > 1. Seorang **pengguna non-ahli** menghadapi suatu masalah dan mengajukan pertanyaan melalui **User Interface**.
> >     
> > 2. **Inference Engine** menerima input ini.
> >     
> > 3. **Inference Engine** kemudian "berkonsultasi" dengan **Knowledge Base**, menerapkan aturan dan fakta yang relevan untuk menganalisis masalah tersebut.
> >     
> > 4. Setelah proses penalaran selesai, **Inference Engine** menghasilkan sebuah kesimpulan atau saran.
> >     
> > 5. Saran ini kemudian ditampilkan kembali kepada pengguna melalui **User Interface**.
> >     

> [!cornell] #### Summary
> 
> **Arsitektur fundamental sebuah Knowledge-Based System (KBS) secara modular memisahkan pengetahuan dari pemrosesan. Ia terdiri dari tiga komponen inti: Knowledge Base yang menyimpan pengetahuan domain dari seorang pakar, Inference Engine yang berfungsi sebagai "otak" untuk melakukan penalaran logis, dan User Interface yang menjadi jembatan interaksi antara pengguna dan sistem. Ketiga komponen ini bekerja sama untuk menerima masalah, menganalisisnya berdasarkan pengetahuan yang tersimpan, dan memberikan solusi atau saran.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Peran "Knowledge Engineer"
> 
> Proses mengekstraksi pengetahuan dari seorang pakar manusia dan merepresentasikannya di dalam _Knowledge Base_ tidaklah trivial. Proses ini dilakukan oleh seorang spesialis yang disebut **Knowledge Engineer**. Tugas mereka meliputi:
> 
> - **Wawancara Pakar**: Melakukan sesi wawancara mendalam dengan pakar domain untuk memahami cara mereka berpikir, aturan yang mereka gunakan, dan heuristik yang mereka terapkan.
>     
> - **Formalisasi Pengetahuan**: Menerjemahkan pengetahuan yang seringkali bersifat implisit atau tidak terstruktur dari pakar menjadi representasi formal yang dapat dimengerti oleh komputer (misalnya, menjadi _production rules_ atau _semantic networks_).
>     
> - **Validasi & Iterasi**: Bekerja sama dengan pakar untuk menguji dan memvalidasi _Knowledge Base_, lalu memperbaikinya secara berulang hingga performa sistem memuaskan.
>     
> 
> #### Topik Teknis 2: "Knowledge Acquisition Bottleneck"
> 
> Salah satu tantangan terbesar dalam membangun KBS secara historis adalah **Knowledge Acquisition Bottleneck** (hambatan akuisisi pengetahuan). Ini merujuk pada kesulitan dalam mentransfer pengetahuan dari kepala seorang ahli ke dalam _Knowledge Base_. Penyebabnya antara lain:
> 
> - **Pengetahuan Implisit**: Pakar seringkali tidak menyadari semua aturan atau pengetahuan yang mereka gunakan; banyak yang sudah menjadi "intuisi".
>     
> - **Komunikasi**: Pakar mungkin kesulitan menjelaskan proses berpikir mereka dalam kata-kata yang dapat diformalkan.
>     
> - Waktu & Biaya: Proses knowledge engineering sangat memakan waktu dan mahal karena melibatkan waktu dari pakar yang sangat berharga.
>     
>     Untuk mengatasi ini, beberapa sistem modern menyertakan Knowledge Acquisition Component, sebuah alat yang membantu pakar untuk memasukkan pengetahuan mereka langsung ke sistem dengan lebih mudah.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Riset Sistem Pakar Klasik**: Cari tahu tentang sistem pakar terkenal seperti **MYCIN** (diagnosis medis), **DENDRAL** (analisis kimia), dan **XCON** (konfigurasi komputer). Pelajari domain masalah mereka dan bagaimana arsitektur KBS diterapkan.
>     
> - **Komponen Penjelasan (**_**Explanation Component**_**)**: Banyak _expert system_ memiliki komponen tambahan yang tidak ditampilkan di diagram dasar, yaitu _Explanation Component_. Komponen ini memungkinkan sistem untuk menjelaskan _mengapa_ ia sampai pada suatu kesimpulan ("_Why?_") dan _bagaimana_ caranya ("_How?_"), biasanya dengan menunjukkan rantai aturan yang dieksekusi. Ini sangat penting untuk membangun kepercayaan pengguna.
>