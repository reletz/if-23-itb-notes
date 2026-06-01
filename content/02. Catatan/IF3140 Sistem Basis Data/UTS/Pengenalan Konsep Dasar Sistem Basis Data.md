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
> > - Apa itu basis data?
> >     
> > - Mengapa basis data lebih unggul dari sistem file?
> >     
> > - Apa saja komponen lingkungan basis data?
> >     
> > - Apa itu DBMS dan apa manfaatnya?
> >     
> 
> > ### Definisi dan Keunggulan Basis Data
> > 
> > **Basis Data** adalah sebuah kumpulan data yang saling berhubungan secara logis dan disimpan dalam satu repositori tunggal. Pendekatan ini secara inheren lebih unggul dibandingkan manajemen menggunakan sistem file tradisional karena dirancang untuk mengatasi masalah fundamental seperti inkonsistensi data, anomali data, serta ketergantungan data dan struktural. Basis data tidak hanya menyimpan data mentah, tetapi juga **struktur data**, **relasi** antar data, dan **jalur aksesnya**.
> >
> > ### Lingkungan Sistem Basis Data
> > 
> > Sebuah sistem basis data yang fungsional beroperasi dalam sebuah ekosistem yang disebut **Lingkungan Sistem Basis Data**. Lingkungan ini terdiri dari lima komponen utama yang saling bekerja sama:
> > 
> > - **Hardware**
> >     
> > - **Software**
> >     
> > - **People/Users**
> >     
> > - **Procedures** (atau governance)
> >     
> > - **Data**
> > 
> > ![[Pasted image 20250902114213.png]]
> >
> > ### Peran Database Management System (DBMS)
> > 
> > **DBMS (Database Management System)** adalah paket perangkat lunak yang dirancang secara spesifik untuk menyimpan dan mengelola basis data. Tujuan utamanya adalah menyediakan lingkungan yang **nyaman (convenient) dan efisien (efficient)** bagi pengguna. 
> > 
> > Manfaat utama yang ditawarkan oleh DBMS meliputi:
> > 
> > - Independensi Data dan Akses yang Efisien
> >     
> > - Waktu Pengembangan Aplikasi yang Lebih Singkat
> >     
> > - Integritas dan Keamanan Data
> >     
> > - Administrasi Data yang Seragam
> >     
> > - Penanganan Akses Bersamaan (Concurrent Access) dan Pemulihan dari Kegagalan
> >     

> [!cornell] #### Summary
> 
> Basis data adalah pendekatan terpusat untuk mengelola **data yang saling berhubungan secara logis** menggunakan software bernama **DBMS**, yang secara fundamental mengatasi masalah **inkonsistensi, anomali, dan ketergantungan data** yang melekat pada sistem file. Lingkungan basis data yang utuh merupakan sinergi dari lima komponen—**Hardware, Software, People, Procedures, dan Data**—di mana DBMS menyediakan manfaat krusial seperti keamanan, efisiensi pengembangan, dan kemampuan pemulihan dari kegagalan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Dari "Pain Points" Sistem File ke Solusi DBMS
> 
> Kelahiran DBMS didorong oleh "penderitaan" dalam menggunakan sistem file. Bayangkan sebuah universitas di tahun 1970. Bagian akademik punya lemari arsip (file) mahasiswa. Bagian keuangan juga punya. Jika seorang mahasiswa pindah alamat, ia harus melapor ke kedua bagian. Jika lupa lapor ke salah satunya, terjadilah **inkonsistensi data**. DBMS lahir sebagai solusi "satu pintu" (repositori tunggal) untuk memastikan semua bagian melihat data yang sama dan akurat.
> 
> #### Eksplorasi Mandiri
> 
> - **Identifikasi Lingkungan Basis Data di Sekitarmu:** Coba identifikasi 5 komponen lingkungan basis data pada aplikasi yang kamu gunakan sehari-hari.
>     
>     - **Contoh (Spotify):**
>         
>         - **Hardware:** Server milik Spotify di seluruh dunia.
>             
>         - **Software:** Aplikasi Spotify di HP/desktop dan DBMS internal Spotify.
>             
>         - **People:** Kamu (pengguna akhir), para engineer Spotify (programmer, DBA).
>             
>         - **Procedures:** _Terms of Service_ yang kamu setujui.
>             
>         - **Data:** Daftar lagumu, playlist-mu, riwayat dengar.
>