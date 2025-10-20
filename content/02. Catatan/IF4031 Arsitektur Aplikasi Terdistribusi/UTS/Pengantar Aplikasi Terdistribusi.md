---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Aplikasi Terdistribusi?
> >     
> > - Mengapa sumber daya jadi masalah?
> >     
> > - Apa saja 5 pilar utama?
> >     
> > - Tantangan dalam Komunikasi
> >     
> > - Apa itu 'Leaky Abstractions'?
> >     
> > - Mengapa Koordinasi sulit?
> >     
> > - Beda 'Scale Up' vs 'Scale Out'
> >     
> > - Apa itu Resiliensi?
> >     
> > - 'Cascading Failure'
> >     
> > - Pentingnya Maintainability
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 2-13
> >     
> 
> > ### Definisi Aplikasi Terdistribusi
> > 
> > Sebuah aplikasi terdistribusi adalah sistem software yang komponennya (dalam bentuk _multiple proses_) berjalan di satu atau lebih komputer/node yang berbeda. Komponen-komponen ini saling berinteraksi untuk mencapai tujuan bersama.
> > 
> > - **Komunikasi:** Interaksi antar proses ini terjadi melalui jaringan menggunakan berbagai protokol seperti TCP/IP, HTTP, atau WebSocket.
> >     
> > - **Heterogen:** Sistem ini seringkali berjalan di lingkungan yang beragam (Windows, Linux, mobile) dan bisa dibangun dengan berbagai bahasa pemrograman (Python, Java, C).
> >     
> > 
> > ### Keterbatasan Sumber Daya Komputasi
> > 
> > Setiap komputer (node/server) memiliki batas kapasitas maksimal untuk sumber dayanya. Ketika beban (jumlah permintaan) melebihi kapasitas ini, akan terjadi antrian yang memperlambat sistem dan menurunkan _throughput_ (jumlah permintaan yang bisa dilayani per detik).
> > 
> > - **CPU:** Kekuatan pemrosesan terbatas.
> >     
> > - **Memory:** Kapasitas RAM untuk menyimpan data yang diakses cepat terbatas.
> >    
> > - **Storage (I/O):** Kecepatan baca/tulis disk memiliki batas (misal: SSD punya batasan IOPS - _Input/Output Operations Per Second_).
> >     
> > - **Network:** Bandwidth jaringan membatasi jumlah data yang bisa dikirim atau diterima per detik.
> >     
> > 
> > ### Lima Pilar Aplikasi Terdistribusi
> > 
> > Ini adalah lima aspek fundamental yang harus dipertimbangkan saat merancang, membangun, dan mengelola sistem terdistribusi.
> > 
> > 1. **Komunikasi:** Mekanisme bagaimana data dikirim antar node. Ini adalah inti dari sistem terdistribusi, namun penuh dengan tantangan seperti jaringan putus, paket hilang, atau _crash_ pada pengirim/penerima. Abstraksi seperti TCP dan gRPC membantu, tetapi tidak sempurna.
> >     
> >     - **The Law of Leaky Abstractions:** Menyatakan bahwa semua abstraksi yang signifikan (seperti TCP yang menjanjikan koneksi andal) pada suatu titik akan "bocor". Artinya, masalah dari lapisan di bawahnya (misal: jaringan fisik yang putus) akan tetap terasa. Pengembang harus sadar bahwa pemanggilan remote bisa gagal atau mengalami delay ekstrem, bahkan jika kodenya terlihat seperti pemanggilan fungsi lokal.
> >         
> > 2. **Koordinasi:** Proses untuk memastikan setiap komponen bekerja secara sinkron dan benar, terutama saat terjadi kegagalan. Ini sangat sulit karena masalah seperti _FLP Impossibility_, yang menyatakan bahwa mencapai konsensus (kesepakatan) yang sempurna dalam sistem asinkron yang bisa gagal adalah hal yang mustahil. Oleh karena itu, penanganan kegagalan harus dirancang secara eksplisit.
> >    
> > 3. **Skalabilitas:** Kemampuan sistem untuk menangani peningkatan beban secara efisien. Kinerja diukur dari _throughput_ (seberapa banyak) dan _latency_ (seberapa cepat).
> >     
> >     - **Scale Up (Vertical Scaling):** Menambah kapasitas pada satu mesin (e.g., CPU lebih cepat, RAM lebih besar).
> >         
> >    - **Scale Out (Horizontal Scaling):** Menambah lebih banyak mesin ke dalam sistem. Ini adalah pendekatan yang umum di sistem terdistribusi.
> >         
> > 4. **Resiliensi:** Kemampuan sistem untuk tetap beroperasi meskipun beberapa komponennya mengalami kegagalan.
> >     
> >     - **Redundancy:** Menyediakan komponen cadangan (misal: server replika) untuk mengambil alih jika komponen utama gagal.
> >         
> >     - **Fault Isolation:** Mencegah kegagalan satu komponen merembet dan menyebabkan kegagalan komponen lain. Ini untuk menghindari _cascading failure_.
> >         
> > 5. **Maintainability (Operations):** Kemudahan dalam mengelola sistem sepanjang siklus hidupnya. Biaya terbesar seringkali ada setelah fase pengembangan awal. Ini mencakup:
> >      
> >     - Perbaikan bug dan penambahan fitur.
> >         
> >     - Proses testing (unit, integration, end-to-end).
> >         
> >     - Praktik DevOps, monitoring, dan _observability_ untuk memahami kondisi sistem secara real-time.
> >         

> [!cornell] #### Summary
> Aplikasi terdistribusi adalah sistem kompleks yang komponennya berjalan di banyak mesin, menghadapi tantangan fundamental akibat keterbatasan sumber daya fisik (CPU, jaringan, dll.). Untuk berhasil, arsitekturnya harus dibangun di atas lima pilar utama: Komunikasi yang sadar akan ketidakandalannya ('leaky abstractions'), Koordinasi untuk menangani kegagalan, Skalabilitas untuk menangani beban (biasanya dengan 'scale out'), Resiliensi untuk mencegah kegagalan total ('cascading failure'), dan Maintainability untuk evolusi jangka panjang.