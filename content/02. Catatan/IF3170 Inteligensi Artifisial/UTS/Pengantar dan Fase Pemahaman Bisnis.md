---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> > ## Questions/Cues
> >
> > - Apa itu Data Science?
> >     
> > - Apa 4 tujuan task analitik?
> >     
> > - Apa itu CRISP-DM?
> >     
> > - Apa tujuan dari fase Business Understanding?
> >     
> > - Apa saja 4 tugas utama dalam fase ini?
> >     
> > - Apa output dari fase ini?
> >     
> > - Bagaimana menerjemahkan masalah bisnis ke tujuan data science?
> >     
> >
> > ## Reference Points
> >
> > - IF3170-data-science.pdf (Slide 3-4, 8, 14-16)
> >     
> > - SKKNI Bidang Keahlian Artificial Intelligence
> >     
> 
> > ### Definisi dan Tujuan Data Science
> > 
> > **Data science** adalah bidang studi interdisipliner yang menggabungkan statistika, matematika, dan ilmu komputer untuk mengekstrak pengetahuan dan _insight_ (wawasan) berharga dari data. Tujuannya adalah untuk memahami, menganalisis, dan mendukung pengambilan keputusan yang kompleks.
> > 
> > Ada empat tujuan utama dari sebuah _task_ analitik:
> > 
> > 1. **Descriptive**: Menjelaskan apa yang terjadi (misalnya, "Berapa total penjualan bulan lalu?").
> >     
> > 2. **Diagnostic**: Menjelaskan mengapa sesuatu terjadi (misalnya, "Mengapa penjualan turun di wilayah X?").
> >     
> > 3. **Predictive**: Memprediksi apa yang akan terjadi di masa depan (misalnya, "Berapa prediksi penjualan bulan depan?").
> >     
> > 4. **Prescriptive**: Menyarankan tindakan terbaik untuk diambil (misalnya, "Strategi apa yang harus diterapkan untuk menaikkan penjualan?").
> >     
> > 
> > ### Metodologi CRISP-DM
> > 
> > **CRISP-DM (Cross-Industry Standard Process for Data Mining)** adalah metodologi paling populer dan terstandar dalam proyek data science. Ini adalah proses iteratif (berulang) yang membagi proyek menjadi enam fase utama, memastikan pendekatan yang terstruktur dari awal hingga akhir.
> > 
> > ### Fase 1: Pemahaman Bisnis (Business Understanding)
> > 
> > Ini adalah fase paling krusial. Tujuannya adalah untuk memahami **objektif dan kebutuhan proyek dari perspektif bisnis**, lalu mengubah pemahaman ini menjadi definisi masalah data science dan rencana awal untuk mencapainya. Kegagalan di fase ini hampir pasti menyebabkan kegagalan proyek.
> > 
> > Empat tugas utama dalam fase ini adalah:
> > 
> > 1. **Menentukan Tujuan Bisnis (Determine Business Objectives)**:
> >     
> >     - Apa masalah bisnis yang sebenarnya ingin diselesaikan? (misalnya, "menurunkan tingkat kredit macet / Non-Performing Loan (NPL)").
> >         
> >     - Latar belakang masalahnya apa? Apa yang sudah pernah dicoba?
> >         
> >     - Apa kriteria kesuksesan dari sisi bisnis? (misalnya, "NPL turun sebesar 5% dalam 6 bulan").
> >         
> > 2. **Menilai Situasi (Assess Situation)**:
> >     
> >     - Inventarisasi sumber daya yang ada: data, personil (domain expert, IT), infrastruktur komputasi.
> >         
> >     - Identifikasi risiko, batasan (constraints), dan asumsi yang ada.
> >         
> >     - Lakukan analisis _cost-benefit_ dari proyek.
> >         
> > 3. **Menentukan Tujuan Data Science (Determine Data Science Goals)**:
> >     
> >     - Menerjemahkan tujuan bisnis menjadi tujuan teknis.
> >         
> >     - **Contoh**: Tujuan bisnis "menurunkan NPL" diterjemahkan menjadi tujuan data science "membangun model klasifikasi untuk memprediksi kolektibilitas pinjaman (lancar/macet) dengan F1-Score minimal 85%".
> >         
> >     - Di sini, kita menentukan jenis task (klasifikasi, regresi, clustering) dan metrik evaluasi teknisnya.
> >         
> > 4. **Menghasilkan Rencana Proyek (Produce Project Plan)**:
> >     
> >     - Membuat rencana detail yang menguraikan setiap tahapan, tugas, durasi, dan sumber daya yang dibutuhkan.
> >         
> >     - Mengidentifikasi _tools_ dan teknik yang akan digunakan.
> >         

> [!cornell] #### Summary
> 
> **Proyek data science yang sukses dimulai dengan metodologi terstruktur seperti CRISP-DM, di mana fase fundamentalnya adalah** _**Business Understanding**_**. Pada fase ini, tujuan bisnis yang jelas diidentifikasi, situasi dinilai, lalu diterjemahkan menjadi tujuan data science yang terukur (seperti klasifikasi atau regresi), dan diakhiri dengan sebuah rencana proyek yang komprehensif untuk memandu seluruh proses analitik.**

> [!ad-libitum]- Additional Information
> 
> #### Perbandingan Metodologi Data Science
> 
> Selain CRISP-DM, ada beberapa metodologi lain yang juga populer, masing-masing dengan fokus yang sedikit berbeda:
> 
> - **KDD (Knowledge Discovery in Databases)**: Lebih berfokus pada aspek teknis _data mining_. Langkah-langkahnya linear: _Selection -> Preprocessing -> Transformation -> Data Mining -> Evaluation_. CRISP-DM mengadopsi banyak ide dari KDD tetapi membingkainya dalam siklus proyek yang lebih berorientasi bisnis.
>     
> - **SEMMA (Sample, Explore, Modify, Model, Assess)**: Dikembangkan oleh SAS Institute. Ini adalah metodologi yang sangat berfokus pada urutan langkah-langkah teknis pemodelan, tetapi kurang eksplisit dalam menangani fase pemahaman bisnis dan _deployment_ dibandingkan CRISP-DM.
>     
> - **Microsoft Team Data Science Process (TDSP)**: Metodologi yang lebih modern yang dirancang untuk proyek kolaboratif dan lincah (_agile_). TDSP menekankan pada penggunaan _version control_ (seperti Git) dan manajemen proyek yang terstruktur dalam lingkungan tim.
>     
> 
> #### Peran dalam Tim Data Science
> 
> Sebuah proyek data science yang kompleks biasanya melibatkan beberapa peran:
> 
> - **Data Scientist**: Fokus pada analisis, pemodelan statistik, dan pengembangan algoritma untuk menjawab pertanyaan bisnis.
>     
> - **Data Engineer**: Membangun dan memelihara arsitektur data, _pipeline_ ETL (_Extract, Transform, Load_), dan memastikan data dapat diakses, andal, dan efisien untuk diolah.
>     
> - **Data Analyst**: Berfokus pada analisis deskriptif, membuat _dashboard_ dan visualisasi untuk memonitor metrik bisnis, serta menemukan _insight_ dari data historis.
>     
> - **Domain Expert**: Seseorang dengan pengetahuan mendalam tentang area bisnis (misal: perbankan, kesehatan). Mereka krusial dalam memberikan konteks dan memvalidasi asumsi.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba cari sebuah studi kasus bisnis (misalnya, "customer churn prediction" untuk perusahaan telekomunikasi). Uraikan masalah tersebut menggunakan kerangka kerja Fase 1 CRISP-DM: Apa tujuan bisnisnya? Apa kriteria suksesnya? Apa tujuan data science-nya (klasifikasi/regresi)? Metrik apa yang akan Anda gunakan?
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumen Resmi**: [CRISP-DM 1.0 Step-by-step data mining guide](https://www.google.com/search?q=https://www.the-modeling-agency.com/crisp-dm.pdf "null")
>     
> - **Standar Indonesia**: Keputusan Menteri Ketenagakerjaan No. 299 Tahun 2020 tentang SKKNI Bidang Keahlian Artificial Intelligence Subbidang Data Science.
>