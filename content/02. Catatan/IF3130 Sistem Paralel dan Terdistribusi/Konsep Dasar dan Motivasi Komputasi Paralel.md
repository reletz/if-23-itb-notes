---
type: Note
cssclasses:
- cornell-notes
---


_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Mengapa komputasi paralel dibutuhkan?
> >     
> > - Bagaimana tren kinerja prosesor?
> >     
> > - Apa batasan fisik prosesor serial?
> >     
> > - Apa itu _Power Wall_?
> >     
> > - Mengapa kinerja aplikasi terus meningkat?
> >     
> > - Apa peran penting developer?
> >     
> > - Apa itu _Data Parallelism_?
> >     
> > - Apa itu _Task Parallelism_?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3230-01-Dasar-2024.pdf
> >     
> 
> > ### Motivasi Utama Komputasi Paralel
> >
> > Kebutuhan akan komputasi paralel didorong oleh dua faktor utama yang saling tarik-menarik:
> >
> > 1. **Perkembangan Hardware:** Cara produsen meningkatkan kinerja prosesor telah berubah secara fundamental.
> >     
> > 2. **Perkembangan Kebutuhan Kinerja:** Kompleksitas masalah yang ingin kita selesaikan dengan komputasi terus meningkat secara eksponensial.
> >     
> >
> > ### Tren Kinerja Prosesor
> >
> > Selama beberapa dekade (kira-kira 1986-2002), kinerja prosesor _single-core_ meningkat sekitar 50% setiap tahunnya. Namun, setelah tahun 2002, laju peningkatannya melambat drastis. Hal ini disebabkan oleh beberapa batasan fundamental.
> >
> > ### Batasan Fisik Prosesor Serial: The Power Wall
> >
> > Peningkatan kinerja prosesor secara tradisional dilakukan dengan memperkecil ukuran transistor dan meningkatkan kecepatan _clock_ (_clock speed_). Namun, pendekatan ini menabrak dinding yang disebut **"Power Wall"**.
> >
> > Siklus masalahnya adalah sebagai berikut:
> >
> > 1. **Transistor Lebih Kecil & Cepat:** Memungkinkan lebih banyak operasi per detik.
> >     
> > 2. **Konsumsi Daya Meningkat:** Prosesor yang lebih cepat membutuhkan lebih banyak listrik.
> >     
> > 3. **Panas Meningkat:** Konsumsi daya yang tinggi menghasilkan panas berlebih.
> >     
> > 4. **Prosesor Tidak Andal:** Panas yang berlebihan dapat menyebabkan kerusakan fisik pada chip.
> >     
> >
> > Karena batasan panas ini, meningkatkan _clock speed_ (misalnya di atas 3-4 GHz) menjadi tidak lagi praktis. Solusinya adalah berhenti membuat satu "otak" super cepat, dan mulai menambahkan lebih banyak "otak" (disebut _core_) dalam satu _chip_ yang sama. Inilah awal dari era **multicore**.
> >
> > ### Tuntutan Kinerja dari Aplikasi
> >
> > Di sisi lain, kemampuan komputasi yang lebih besar membuka pintu untuk menyelesaikan masalah-masalah yang sebelumnya dianggap mustahil. Kebutuhan komputasi performa tinggi (_High-Performance Computing_ - HPC) terus tumbuh di berbagai bidang:
> >
> > - **Sains & Riset:** Pemodelan cuaca, simulasi pelipatan protein (_protein folding_), penemuan obat baru, dan riset energi.
> >     
> > - **Data:** Analisis data dalam skala masif (_Big Data_).
> >     
> > - **Rekayasa:** Simulasi aerodinamika, uji tabrak virtual, dan desain molekul.
> >     
> >
> > ### Peran Krusial Developer
> >
> > Kehadiran prosesor _multicore_ tidak secara otomatis membuat program berjalan lebih cepat. Jika sebuah program ditulis secara serial (hanya memberikan satu urutan instruksi), maka program tersebut hanya akan berjalan di **satu core**, sementara core lainnya menganggur.
> >
> > Sebagai contoh, pada CPU dengan 16 _core_, aplikasi serial hanya memanfaatkan kurang dari 1% dari total kekuatan pemrosesan yang tersedia. Oleh karena itu, menjadi tugas **developer** untuk secara eksplisit menulis ulang algoritma dan program agar dapat memanfaatkan semua _core_ yang ada.
> > 
> > ![[Pasted image 20250902080017.png]]
> >
> > ### Konsep Dasar Paralelisme
> >
> > Ada dua cara utama untuk membagi pekerjaan agar bisa dikerjakan secara paralel:
> >
> > 1. **Data Parallelism (Paralelisme Data):**
> > 	  - **Konsep:** Membagi **data** menjadi potongan-potongan kecil, lalu setiap *core* mengerjakan instruksi yang **sama** pada potongan datanya masing-masing.
> > 	  - **Analogi:** Seorang dosen membagi 300 lembar ujian kepada 3 asisten. Masing-masing asisten menerima 100 lembar dan melakukan pekerjaan yang sama: memeriksa semua soal.
> >
> > 2. **Task Parallelism (Paralelisme Tugas):**
> > 	  - **Konsep:** Membagi **tugas (instruksi)** yang berbeda-beda kepada setiap *core*. Semua *core* bisa saja bekerja pada data yang sama atau data yang berbeda.
> > 	  - **Analogi:** Dosen membagi pekerjaan berdasarkan nomor soal. Asisten 1 memeriksa soal 1-5, asisten 2 memeriksa soal 6-10, dan asisten 3 memeriksa soal 11-15 untuk semua 300 lembar ujian.

> [!cornell] #### Summary
> Pergeseran ke komputasi paralel adalah sebuah keniscayaan yang didorong oleh batasan fisik prosesor serial—terutama masalah panas yang dikenal sebagai _**Power Wall**_—yang menghentikan laju peningkatan _**clock speed**_. Sebagai respons, industri _**hardware**_ beralih ke desain  _**multicore**_. Namun, _**hardware**_ ini tidak berguna tanpa  _**software**_  yang dirancang secara paralel. Oleh karena itu, developer harus secara aktif memecah masalah menggunakan strategi seperti _**data parallelism**_  atau  _**task parallelism**_ untuk memanfaatkan kekuatan komputasi modern dan memenuhi tuntutan kinerja dari aplikasi yang semakin kompleks.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Konsep: Hukum Amdahl
>  Gene Amdahl, seorang arsitek komputer, merumuskan sebuah hukum yang menyatakan bahwa percepatan (_speedup_) sebuah program yang diparalelkan akan dibatasi oleh bagian dari program tersebut yang **tidak bisa diparalelkan** (bagian serial). Misalnya, jika 10% dari program Anda harus berjalan secara serial, maka seberapa banyak pun _core_ yang Anda tambahkan, program Anda tidak akan pernah bisa berjalan lebih dari 10 kali lebih cepat. Ini menunjukkan betapa pentingnya mengidentifikasi dan meminimalkan bagian serial dalam sebuah algoritma.
>  #### Analogi Sederhana: Membangun Rumah
>  Bayangkan membangun sebuah rumah sendirian (serial). Anda harus melakukan semuanya satu per satu: menggali fondasi, memasang bata, memasang atap, mengecat, dll.
> - **Task Parallelism:** Anda mempekerjakan tim spesialis: satu tim menggali fondasi, satu tim memasang bata, satu tim mengerjakan atap. Mereka adalah tugas-tugas berbeda yang bisa tumpang tindih.
> - **Data Parallelism:** Untuk tugas mengecat, Anda tidak menyuruh satu orang mengecat seluruh rumah. Anda menyuruh 4 orang, masing-masing mengecat satu sisi dinding (data-nya adalah dinding, tugasnya sama yaitu mengecat).
>  Hasilnya, rumah selesai jauh lebih cepat. Namun, ada bagian yang tetap serial, misalnya menunggu fondasi kering sebelum memasang bata. Inilah _bottleneck_ yang dijelaskan dalam Hukum Amdahl.
>  #### Eksplorasi Mandiri
>  - **Cek CPU Anda:** Buka Task Manager (Windows) atau Activity Monitor (Mac) di komputer Anda. Pergi ke tab Performance/CPU. Berapa banyak _cores_ dan _logical processors_ (threads) yang dimiliki komputer Anda? Ini akan memberi Anda gambaran nyata tentang potensi paralelisme yang ada di perangkat Anda sehari-hari.
> 