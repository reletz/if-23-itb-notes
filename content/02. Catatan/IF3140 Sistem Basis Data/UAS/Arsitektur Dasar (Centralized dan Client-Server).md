---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Arsitektur Dasar: Centralized & Client-Server
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Centralized System**?
> >     
> > - Apa beda _single-user_ vs _multi-user_ system?
> >     
> > - Apa itu **Client-Server System**?
> >     
> > - Apa peran **front-end**?
> >     
> > - Apa peran **back-end**?
> >     
> > - Apa **interface** antara front-end dan back-end?
> >     
> > - Apa **keuntungan** (advantages) arsitektur Client-Server?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "13 - Database System Architectures.pdf" (Slide 4-7)
> >     
> 
> > ### 1. Centralized Systems (Sistem Terpusat)
> > 
> > **Centralized System** adalah arsitektur di mana seluruh database dan DBMS berjalan di satu sistem komputer (dalam satu "kotak"). Semua pemrosesan, manajemen data, dan I/O terjadi di satu tempat.
> > 
> > Arsitektur ini bisa berupa:
> > 
> > 1. **Single-User System**:
> >     
> >     - Contoh: Personal Computer (PC) atau workstation.
> >         
> >     - Biasanya memiliki satu CPU, OS yang mungkin hanya mendukung satu pengguna, dan menjalankan aplikasi database lokal (misal: Microsoft Access).
> >         
> > 2. **Multi-User System**:
> >     
> >     - Contoh: _Mainframe_ atau _Server_ perusahaan.
> >         
> >     - Memiliki spesifikasi lebih tinggi: banyak CPU, RAM besar, disk array.
> >         
> >     - Menjalankan OS multi-user (seperti Linux/Windows Server).
> >         
> >     - Melayani banyak pengguna yang terhubung melalui _terminal_ (atau terminal emulator) ke server pusat. Seluruh pemrosesan tetap terjadi di server.
> >         
> > 
> > ### 2. Client-Server Systems
> > 
> > Ini adalah evolusi dari _centralized multi-user_. Alih-alih menggunakan _terminal_ "bodoh", arsitektur ini membagi pekerjaan antara dua jenis komputer yang berbeda:
> > 
> > - **Server**: Sistem _back-end_ yang kuat, tugas utamanya adalah mengelola data.
> >     
> > - **Client**: Sistem _front-end_ yang digunakan oleh pengguna (misal: PC, laptop, smartphone).
> >     
> > 
> > Keduanya terhubung melalui jaringan (network).
> > 
> > ### Pembagian Fungsi: Front-End vs Back-End
> > 
> > Fungsionalitas database dibagi menjadi dua lapisan:
> > 
> > **1. Front-End (Sisi Klien)**
> > 
> > - Tugas: Berinteraksi dengan pengguna.
> >     
> > - Komponen: Tools antarmuka pengguna (GUI), _forms_, _report-writer_, aplikasi analisis, dll.
> >     
> > - Contoh: Aplikasi perbankan di HP Anda, website e-commerce, software Tableau/PowerBI.
> >     
> > 
> > **2. Back-End (Sisi Server)**
> > 
> > - Tugas: "Jantung" dari database.
> >     
> > - Komponen: Query evaluation, query optimization, concurrency control, recovery system, manajemen struktur data.
> >     
> > 
> > Interface (Penghubung):
> > 
> > Klien dan Server berkomunikasi melalui sebuah standar.
> > 
> > - Cara paling umum adalah melalui bahasa **SQL**.
> >     
> > - Cara programatik adalah melalui **API** (Application Program Interface) seperti **ODBC** atau **JDBC**.
> >     
> > 
> > ### Keuntungan Arsitektur Client-Server
> > 
> > Mengganti model _mainframe_ terpusat dengan Client-Server memberikan banyak keuntungan:
> > 
> > 1. **Biaya**: Fungsionalitas yang lebih baik dengan biaya yang lebih rendah (menggunakan hardware komoditas).
> >     
> > 2. **Fleksibilitas**: Mudah untuk menambah/mengurangi klien atau server (skalabilitas) dan menempatkan sumber daya di mana saja.
> >     
> > 3. **User Interface (UI)**: UI di sisi klien (PC/HP) jauh lebih baik dan interaktif daripada UI berbasis terminal.
> >     
> > 4. **Perawatan**: Lebih mudah merawat sistem yang terpisah; server bisa di-upgrade tanpa mengganggu klien (selama interface-nya sama).
> >     

> [!cornell] #### Summary
> 
> **Arsitektur database berevolusi dari **Centralized System** (di mana semua pemrosesan terjadi di satu mesin, baik** _**single-user**_ **seperti PC atau** _**multi-user**_ **seperti mainframe) ke arsitektur **Client-Server**. Model Client-Server membagi tugas: **Front-End** (klien) menangani antarmuka pengguna (UI), sementara **Back-End** (server) fokus pada manajemen data inti (query, concurrency, recovery). Keduanya terhubung via jaringan menggunakan interface standar seperti **SQL** atau **API** (ODBC/JDBC), memberikan keuntungan besar dalam hal biaya, fleksibilitas, dan kualitas UI.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Evolusi Arsitektur (2-Tier vs 3-Tier)
> 
> Arsitektur Client-Server yang dijelaskan di slide (Slide 6) secara teknis adalah model **2-Tier (Dua Lapis)**:
> 
> 1. **Tier 1**: Klien (Menangani UI + Logika Aplikasi)
>     
> 2. **Tier 2**: Server (Menangani Database)
>     
> 
> **Masalah**: Model ini "gemuk" di klien (_fat client_). Setiap klien harus berisi logika bisnis. Jika ada perubahan aturan bisnis (misal: "minimum transfer naik dari 10.000 ke 15.000"), _semua_ aplikasi klien harus di-update.
> 
> **Solusi**: Arsitektur modern hampir selalu menggunakan **3-Tier (Tiga Lapis)**:
> 
> 1. **Tier 1: Klien (Presentation Layer)**: "Klien tipis" (_thin client_) seperti browser web. Tugasnya _hanya_ menampilkan UI.
>     
> 2. **Tier 2: Application Server (Business Logic Layer)**: Ini adalah server baru di tengah. Semua logika bisnis (validasi, aturan) ada di sini.
>     
> 3. **Tier 3: Database Server (Data Layer)**: Sama seperti back-end, tugasnya hanya menyimpan dan mengambil data.
>     
> 
> Model 3-Tier inilah yang mendominasi pengembangan web modern. _Front-end_ (React/Angular) adalah Tier 1, _Back-end_ (Node.js/Python/Java) adalah Tier 2, dan _Database_ (PostgreSQL/MongoDB) adalah Tier 3.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 20.1.
>     
> - **Konsep**: "2-Tier vs 3-Tier Architecture", "Fat Client vs Thin Client".
>