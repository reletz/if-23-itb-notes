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
> > - Siapa saja jenis-jenis pengguna basis data?
> >     
> > - Apa saja fungsi dan tanggung jawab seorang DBA?
> >     
> > - Apa perbedaan arsitektur two-tier dan three-tier?
> >     
> 
> > ### Jenis-Jenis Pengguna Basis Data
> > 
> > Pengguna basis data dapat dikategorikan ke dalam empat peran berbeda, tergantung pada cara mereka berinteraksi dengan sistem:
> > 
> > - **Naive Users:** Pengguna akhir yang berinteraksi melalui antarmuka aplikasi yang sudah jadi, seperti teller bank, agen travel, atau pengguna web pada umumnya. Mereka tidak menulis query secara langsung.
> >     
> > - **Application Programmers:** Para profesional IT yang menulis program aplikasi (misalnya dalam bahasa Java atau Python) yang di dalamnya terdapat kode untuk mengakses dan memanipulasi data di dalam basis data.
> >     
> > - **Sophisticated Users:** Para analis atau ilmuwan data yang ahli dalam menulis query kompleks secara langsung menggunakan _query tools_. Mereka bertujuan untuk melakukan analisis data mendalam tanpa perlu menulis program aplikasi lengkap.
> >     
> > - **Database Administrators (DBA):** Orang yang memiliki kontrol terpusat atas keseluruhan sistem basis data.
> >     
> >
> > ### Fungsi Seorang Database Administrator (DBA)
> > 
> > Seorang **Database Administrator (DBA)** memiliki kontrol dan tanggung jawab penuh atas sistem basis data. Fungsi utamanya meliputi:
> > 
> > - **Definisi Skema & Struktur Penyimpanan:** Merancang struktur logis (skema) dan juga mendefinisikan bagaimana data disimpan secara fisik (metode akses).
> >     
> > - **Modifikasi Organisasi:** Melakukan perubahan pada skema atau organisasi fisik dari basis data seiring dengan berkembangnya kebutuhan.
> >     
> > - **Manajemen Otorisasi Akses:** Memberikan hak akses kepada para pengguna dan memastikan keamanan data dari akses yang tidak sah.
> >     
> > - **Pemeliharaan Rutin:** Melakukan tugas-tugas operasional penting seperti melakukan backup data secara berkala, memastikan ketersediaan ruang disk yang cukup, dan memonitor aktivitas atau pekerjaan yang berjalan di basis data.
> >     
> >
> > ### Arsitektur Aplikasi Basis Data
> > 
> > Terdapat dua model arsitektur umum untuk aplikasi yang dirancang untuk berinteraksi dengan basis data:
> > 
> > - **Two-Tier Architecture:** Ini adalah model client-server yang sederhana. Aplikasi berada di mesin client dan secara langsung memanggil fungsionalitas dari sistem basis data yang berjalan di mesin server.
> >     
> > - **Three-Tier Architecture:** Arsitektur yang lebih modern dan menjadi standar untuk aplikasi web. Mesin client hanya bertindak sebagai _front-end_ (misalnya, browser) dan tidak berisi logika database. Client berkomunikasi dengan sebuah **application server**, dan _application server_ inilah yang kemudian berkomunikasi dengan sistem basis data untuk mengakses data.
> >     

> [!cornell] #### Summary
> 
> Interaksi dengan sistem basis data dilakukan oleh berbagai jenis **pengguna**: **naive users** yang menggunakan antarmuka jadi, **application programmers** yang menulis kode, **sophisticated users** yang membuat query kompleks, hingga **Database Administrator (DBA)** yang memiliki kontrol penuh. Seorang DBA bertanggung jawab atas **definisi skema, keamanan, dan pemeliharaan**. Aplikasi yang mengakses basis data umumnya mengikuti arsitektur **two-tier** (client-server langsung) atau **three-tier** (client berkomunikasi via _application server_), di mana model _three-tier_ menjadi standar untuk aplikasi web modern.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Arsitektur Three-Tier Mendominasi?
> 
> Arsitektur Three-Tier sangat populer karena beberapa alasan kuat: **Skalabilitas** (jumlah _application server_ bisa ditambah tanpa mengubah client), **Keamanan** (logika bisnis dan akses data tersembunyi dari client, mengurangi celah serangan), dan **Fleksibilitas** (client bisa berupa browser, aplikasi mobile, atau lainnya, semua terhubung ke _application server_ yang sama). Arsitektur ini secara bersih memisahkan lapisan presentasi (UI), logika bisnis (_application server_), dan data (_database server_).
> 
> #### DBA: Peran yang Terus Berevolusi
> 
> Di era _cloud computing_, peran DBA telah berevolusi. Meskipun tugas inti seperti desain skema dan optimasi kinerja tetap penting, banyak tugas pemeliharaan rutin (seperti backup, patching, dan manajemen disk) kini diotomatisasi oleh penyedia cloud (misalnya, Amazon RDS, Google Cloud SQL). DBA modern lebih fokus pada arsitektur data, keamanan di cloud, serta memastikan performa dan biaya penggunaan cloud tetap efisien.