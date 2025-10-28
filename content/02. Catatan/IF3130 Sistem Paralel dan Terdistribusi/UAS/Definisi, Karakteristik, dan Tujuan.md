---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Pengantar Dasar Sistem Terdistribusi
> 
> > ## Questions/Cues
> > 
> > - Apa itu Sistem Terdistribusi (ST)?
> >     
> > - Definisi Lamport?
> >     
> > - Definisi formal (komponen)?
> >     
> > - Definisi Tanenbaum?
> >     
> > - Definisi Coulouris?
> >     
> > - Karakteristik utama (Coulouris)?
> >     
> > - Definisi Schroeder?
> >     
> > - Contoh ST?
> >     
> > - Apa tujuan utama ST?
> >     
> > - Apa itu Scalability?
> >     
> > - Apa itu Performance?
> >     
> > - Apa itu Availability?
> >     
> > - Metrik Performance?
> >     
> > - Metrik Availability?
> >     
> > - Apa itu Fault Tolerant?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-12
> >     
> 
> > ### Definisi Sistem Terdistribusi
> > 
> > Terdapat beberapa cara untuk mendefinisikan sistem terdistribusi (tersebar):
> > 
> > 1. **Definisi Informal (Leslie Lamport):** "Sebuah sistem terdistribusi adalah sistem di mana kegagalan komputer yang bahkan tidak Anda ketahui keberadaannya dapat membuat komputer Anda sendiri tidak dapat digunakan."
> >     
> >     - Ini menyoroti karakteristik _independent failure_ (kegagalan independen) dan ketergantungan antar komponen.
> >         
> > 2. **Definisi Umum:** Sistem yang terdiri atas komponen yang independen, namun menyediakan kesatuan layanan (satu layanan yang utuh) kepada penggunanya.
> >     
> > 3. **Definisi Tanenbaum (1988):** Membatasi definisi dengan mensyaratkan adanya aspek **transparansi** terhadap pengguna. Pengguna tidak sadar (atau tidak perlu tahu) bahwa ia sedang berinteraksi dengan banyak komputer.
> >     
> > 4. **Definisi Coulouris (2001):** Sistem yang komponennya berada dalam satu jaringan komputer dan saling berkomunikasi **hanya** dengan pertukaran pesan.
> >     
> > 5. **Definisi Schroeder (1993):** Definisi sederhana: beberapa komputer yang melakukan sesuatu bersama-sama.
> >     
> > 
> > ### Karakteristik Utama (menurut Coulouris & Schroeder)
> > 
> > Berdasarkan definisi di atas, karakteristik utamanya adalah:
> > 
> > - **Independent Failure:** Kegagalan satu komponen tidak serta merta menghentikan seluruh sistem, tetapi dapat memengaruhinya (seperti kata Lamport).
> >     
> > - **Lack of Global Clock:** Tidak ada satu sumber waktu (jam) tunggal yang disetujui oleh semua komponen. Setiap komputer memiliki jamnya sendiri, yang menimbulkan masalah sinkronisasi.
> >     
> > - **Concurrency:** Komponen-komponen berjalan secara bersamaan (konkuren).
> >     
> > - **Multiple Computers:** Jelas membutuhkan lebih dari satu komputer.
> >     
> > - **Interconnections:** Komputer-komputer tersebut terhubung (biasanya melalui jaringan).
> >     
> > - **Shared State:** Meskipun independen, mereka sering kali perlu berbagi status atau data untuk bekerja sama.
> >     
> > 
> > ### Contoh Sistem Terdistribusi
> > 
> > Kita menggunakannya setiap hari, misalnya:
> > 
> > - Aplikasi media sosial (Facebook, Twitter, Instagram)
> >     
> > - Layanan Google (Search, Gmail, Drive)
> >     
> > - Platform streaming (YouTube, Netflix)
> >     
> > - Infrastruktur cloud dan container (Kubernetes, Docker Swarm)
> >     
> > - Sistem perbankan (ATM), pemesanan tiket, dll.
> >     
> > 
> > ### Tujuan Utama Sistem Terdistribusi
> > 
> > Ada tiga alasan utama mengapa kita membangun sistem terdistribusi:
> > 
> > 1. **Scalability (Skalabilitas):** Kemampuan sistem untuk bertumbuh. Jika beban kerja meningkat, kita bisa menambahkan lebih banyak komputer (horizontal scaling) untuk menanganinya.
> >     
> > 2. **Performance (Kinerja):** Jumlah pekerjaan yang dapat diselesaikan sistem berdasarkan waktu dan sumber daya yang digunakan.
> >     
> > 3. **Availability (Ketersediaan):** Persentase waktu di mana sistem berada dalam kondisi berfungsi baik dan dapat melayani permintaan.
> >     
> > 
> > ### Detail: Performance (Kinerja)
> > 
> > Kinerja sistem terdistribusi diukur melalui beberapa metrik:
> > 
> > - **Response Time:** Waktu yang dibutuhkan sistem untuk merespons satu permintaan (inginnya singkat/cepat).
> >     
> > - **Throughput:** Jumlah total pekerjaan (misalnya, transaksi atau permintaan) yang dapat diselesaikan per satuan waktu (inginnya tinggi).
> >     
> > - **Efisiensi:** Penggunaan sumber daya (CPU, memori, jaringan) yang rendah untuk menyelesaikan pekerjaan.
> >     
> > - **Latency:** Periode antara _mulai_ terjadinya sesuatu hingga _efek_ kejadian tersebut dapat diamati. Ini sering menjadi _bottleneck_ utama dalam kinerja.
> >     
> > 
> > ### Detail: Availability (Ketersediaan)
> > 
> > Ketersediaan sering diukur dengan "jumlah sembilan" (nines):
> > 
> > - **90%** (One nine): Downtime lebih dari 1 bulan per tahun.
> >     
> > - **99%** (Two nines): Downtime kurang dari 4 hari per tahun.
> >     
> > - **99.9%** (Three nines): Downtime kurang dari 9 jam per tahun.
> >     
> > - **99.99%** (Four nines): Downtime kurang dari 1 jam per tahun.
> >     
> > - **99.999%** (Five nines): Downtime sekitar 5 menit per tahun. (Ini adalah standar emas untuk layanan kritikal).
> >     
> > - **99.9999%** (Six nines): Downtime sekitar 31 detik per tahun.
> >     
> > 
> > Ini terkait erat dengan **Fault Tolerance**: yaitu kemampuan sistem untuk tetap berfungsi dengan baik _meskipun_ terjadi _fault_ (kegagalan) pada sebagian komponennya.

> [!cornell] #### Summary
> 
> **Sistem terdistribusi adalah kumpulan komputer independen yang terhubung jaringan dan berkomunikasi via pesan untuk memberikan satu kesatuan layanan, seolah-olah satu sistem tunggal. Karakteristik utamanya adalah adanya** _**independent failure**_**,** _**konkurensi**_**, dan** _**tidak adanya global clock**_**. Tujuan utama membangunnya adalah untuk mencapai** _**Scalability**_ **(kemampuan tumbuh),** _**Performance**_ **(throughput tinggi, latency rendah), dan** _**Availability**_ **(ketersediaan tinggi atau** _**fault tolerant**_**).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Implikasi 'Lack of Global Clock'
> 
> Karakteristik "Lack of Global Clock" adalah salah satu masalah paling fundamental. Tanpa jam global, kita tidak bisa secara pasti menentukan _urutan kejadian_ (event ordering) di antara komputer yang berbeda.
> 
> - **Masalah:** Jika Komputer A mencatat kejadian X pada jam 10:00:01.005 dan Komputer B mencatat kejadian Y pada 10:00:01.006, kita tidak bisa yakin Y terjadi setelah X. Jam mereka mungkin _drift_ (bergeser) dan tidak sinkron.
>     
> - **Solusi Teoretis (Lamport Timestamps):** Leslie Lamport (yang juga dikutip di awal) mengusulkan "jam logis" (logical clock). Ini tidak melacak waktu nyata, tetapi melacak _urutan kausal_ (sebab-akibat).
>     
>     - Aturannya sederhana: Jika kejadian A terjadi sebelum kejadian B di komputer yang sama, maka $Timestamp(A) < Timestamp(B)$.
>         
>     - Jika A adalah pesan yang dikirim dan B adalah pesan yang diterima, maka $Timestamp(A) < Timestamp(B)$.
>         
>     - Ini menciptakan **partial order** (urutan sebagian) dari kejadian, yang jauh lebih baik daripada tidak ada urutan sama sekali.
>         
> - **Pengembangan Lanjutan:** **Vector Clocks** adalah pengembangan dari Lamport Timestamps yang dapat mendeteksi _causal dependency_ (ketergantungan sebab-akibat) secara lebih akurat dan membedakan antara kejadian yang benar-benar konkuren.
>     
> 
> #### Pendalaman: Trade-off (Availability vs. Consistency)
> 
> Catatan utama menyebutkan _Availability_ sebagai tujuan. Dalam praktiknya, _Availability_ seringkali harus ditukar (trade-off) dengan _Consistency_ (data di semua node harus sama persis).
> 
> - **Teorema CAP (Brewer's Theorem):** Sebuah teorema terkenal yang menyatakan bahwa sistem terdistribusi hanya dapat memilih _dua_ dari tiga jaminan berikut:
>     
>     1. **C**onsistency (Konsistensi): Semua node melihat data yang sama pada saat yang sama.
>         
>     2. **A**vailability (Ketersediaan): Setiap permintaan non-gagal akan menerima respons (meskipun datanya mungkin sedikit kedaluwarsa).
>         
>     3. **P**artition Tolerance (Toleransi Partisi): Sistem tetap beroperasi meskipun terjadi _network partition_ (jaringan terputus antara dua set node).
>         
> - **Realitas:** Dalam sistem terdistribusi, _Partition Tolerance_ (P) bukanlah pilihan; itu adalah _kenyataan_ yang harus diterima (jaringan _pasti_ akan gagal). Oleh karena itu, desainer sistem harus memilih antara:
>     
>     - **CP (Consistent + Partition Tolerant):** Mengorbankan ketersediaan. Jika terjadi partisi jaringan, sistem akan berhenti merespons (menjadi _unavailable_) untuk menjaga data tetap konsisten. Contoh: Bank.
>         
>     - **AP (Available + Partition Tolerant):** Mengorbankan konsistensi. Jika terjadi partisi, sistem tetap merespons (tetap _available_), meskipun data yang dikembalikan mungkin _stale_ (kedaluwarsa). Sistem akan _eventually consistent_ (akhirnya konsisten) nanti. Contoh: Media sosial, DNS.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Paper Klasik:** "Time, Clocks, and the Ordering of Events in a Distributed System" oleh Leslie Lamport. (Ini adalah bacaan fundamental).
>     
> - **Teorema CAP:** "Brewer's conjecture and the feasibility of consistent, available, partition-tolerant web services" oleh Seth Gilbert dan Nancy Lynch.
>