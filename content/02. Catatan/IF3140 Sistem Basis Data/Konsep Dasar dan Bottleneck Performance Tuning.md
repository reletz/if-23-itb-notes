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
> > - Apa itu performance tuning?
> >     
> > - Apa prosedur umum untuk melakukan tuning?
> >     
> > - Apa itu bottleneck dan di level mana saja tuning bisa dilakukan?
> >     
> > - Mengapa Disk I/O menjadi target utama tuning?
> >     
> 
> > ### Definisi dan Tujuan Performance Tuning
> > 
> > **Performance Tuning** adalah serangkaian aktivitas untuk menyesuaikan berbagai parameter dan pilihan desain dengan tujuan meningkatkan performa sistem. Secara spesifik, tujuannya adalah mengoptimalkan penggunaan sumber daya untuk **meningkatkan throughput** (jumlah pekerjaan yang bisa diselesaikan) dan **meminimalkan kontensi** (konflik perebutan sumber daya), sehingga sistem mampu memproses beban kerja sebesar mungkin.
> >
> > ### Prosedur Umum: Menemukan Bottleneck
> > 
> > Prosedur umum untuk melakukan tuning adalah dengan **mengidentifikasi bottleneck** (komponen yang menghambat laju sistem) lalu **menghilangkannya**. Contohnya, jika sebuah query berjalan sangat lambat, investigasi mungkin menunjukkan adanya _full relation scan_. Solusinya adalah dengan menambahkan indeks pada kolom yang relevan untuk mempercepat pencarian.
> >
> > ### Bottleneck dan Level Tuning
> > 
> > **Bottleneck** adalah satu atau beberapa komponen yang kinerjanya membatasi keseluruhan performa sistem. Prinsipnya mirip aturan 80/20: 20% dari kode mungkin bertanggung jawab atas 80% waktu eksekusi. Proses menemukan dan memperbaiki bottleneck ini bersifat iteratif; memperbaiki satu bottleneck sering kali akan mengungkap bottleneck berikutnya.
> > 
> > Tuning dapat dilakukan pada tiga level berbeda:
> > 
> > - **Level Desain:** Mengubah skema fisik (indeks, materialized views), memperbaiki query atau transaksi, dan menyempurnakan skema logis.
> >     
> > - **Level Parameter Sistem:** Menyesuaikan pengaturan internal DBMS, seperti ukuran buffer atau interval checkpoint.
> >     
> > - **Level Hardware:** Meningkatkan kapasitas perangkat keras, seperti menambah disk, menambah memori (RAM), atau menggunakan prosesor yang lebih cepat.
> >     
> >
> > ### Target Utama: Meminimalkan Disk I/O
> > 
> > Pada umumnya, tuning performa basis data menargetkan untuk **meminimalkan operasi Disk I/O (Input/Output)**. Hal ini karena akses ke disk merupakan potensi bottleneck terbesar, dengan waktu akses yang ribuan kali lebih lambat dibandingkan akses ke memori utama (RAM). Sebagai perbandingan, waktu baca blok acak dari HDD sekitar 10 milidetik, sementara akses blok di memori hanya sekitar 100 nanodetik.

> [!cornell] #### Summary
> 
> **Performance Tuning** adalah proses iteratif untuk **mengidentifikasi dan menghilangkan bottleneck** guna meningkatkan throughput sistem. Proses ini dapat dilakukan pada tiga level: **desain (skema/query), parameter sistem, dan hardware**. Karena akses disk ribuan kali lebih lambat dari akses memori, target utama dari sebagian besar aktivitas tuning adalah **meminimalkan operasi Disk I/O**.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Analogi "Selang Air"
> 
> Bayangkan sistem basis data Anda seperti selang air yang panjangnya terdiri dari beberapa sambungan. Laju air (_throughput_) yang keluar di ujung selang akan ditentukan oleh sambungan yang paling sempit (_bottleneck_). Anda bisa memasang pompa air yang lebih kuat (CPU lebih cepat) atau membuka keran lebih besar (jaringan lebih kencang), tetapi jika ada satu sambungan yang tertekuk atau sempit, laju air tidak akan meningkat signifikan. Tugas seorang "performance tuner" adalah berjalan di sepanjang selang, menemukan tekukan paling parah, meluruskannya, lalu mencari tekukan berikutnya.
> 
> #### Proactive vs. Reactive Tuning
> 
> - **Reactive Tuning:** Dilakukan ketika masalah sudah terjadi. Pengguna mengeluh sistem lambat, lalu DBA melakukan investigasi untuk mencari dan memperbaiki bottleneck. Ini adalah pendekatan yang paling umum.
>     
> - **Proactive Tuning:** Dilakukan sebelum masalah muncul. Ini melibatkan pemahaman mendalam terhadap _workload_ aplikasi, melakukan pemodelan, dan merancang skema, indeks, serta konfigurasi hardware yang optimal sejak awal. Ini lebih sulit tetapi jauh lebih baik untuk sistem skala besar.
>