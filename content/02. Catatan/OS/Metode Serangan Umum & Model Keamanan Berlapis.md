---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Masquerading?
> > - Serangan Replay
> > - Serangan Man-in-the-Middle (MitM)
> > - Pembajakan Sesi (Session Hijacking)
> > - Privilege Escalation
> > - Pentingnya Keamanan Berlapis
> > - Level Fisik
> > - Level Jaringan
> > - Level Sistem Operasi (OS)
> > - Level Aplikasi
> > - Peran Faktor Manusia
> > - Social Engineering & Phishing
>
> > ### Metode Pelanggaran Keamanan (Serangan Umum)    
> > **Masquerading (Penyamaran):**
> >  - **Apa itu:** Penyerang berpura-pura menjadi pengguna atau entitas yang sah untuk mendapatkan hak akses yang lebih tinggi. Ini adalah serangan langsung terhadap proses **otentikasi** (verifikasi identitas).
> >  - **Analogi:** Seseorang mencuri kartu identitas karyawan dan seragamnya untuk masuk ke area terlarang di sebuah gedung perkantoran.
> >  - **Contoh Praktis:** Penyerang mendapatkan username dan password seorang admin, lalu login ke sistem sebagai admin tersebut.
> >  
> > **Replay Attack (Serangan Pengulangan):**
> > - **Apa itu:** Penyerang secara jahat mencegat transmisi data yang sah (misalnya, proses login) dan kemudian **mengirimkannya kembali (replay)** di lain waktu untuk mendapatkan akses. Terkadang pesan tersebut dimodifikasi.
> > - **Contoh Praktis:** Penyerang merekam data login Anda yang dikirim melalui jaringan Wi-Fi publik yang tidak aman, lalu mengirim ulang data tersebut untuk masuk ke akun Anda.
> >
> > **Man-in-the-Middle (MitM) Attack:**
> > - **Apa itu:** Penyerang memposisikan dirinya di tengah-tengah jalur komunikasi antara dua pihak (misalnya, Anda dan server bank). Penyerang dapat menyadap, membaca, dan bahkan memodifikasi data tanpa disadari oleh kedua belah pihak.
> > - **Analogi:** Seorang petugas pos jahat yang membuka surat Anda, membacanya (pelanggaran kerahasiaan), mengubah isinya (pelanggaran integritas), lalu menyegelnya kembali dan mengirimkannya seolah-olah tidak terjadi apa-apa.
> > - **Ilustrasi:** `(Pengirim) <-- komunikasi --> (Penyerang) <-- komunikasi --> (Penerima)`
> >
> > **Session Hijacking (Pembajakan Sesi):**
> > - **Apa itu:** Penyerang mengambil alih sebuah sesi komunikasi yang sudah terjalin dan terotentikasi. Ini memungkinkan penyerang untuk melewati proses login awal.
> > - **Contoh Praktis:** Setelah Anda berhasil login ke sebuah situs web, server memberikan "session token" pada browser Anda. Penyerang mencuri token ini dan menggunakannya untuk mengakses akun Anda tanpa perlu tahu password Anda.
> > 
> > **Privilege Escalation (Eskalasi Hak Istimewa):**
> >  **Apa itu:** Penyerang yang sudah berhasil masuk ke sistem dengan hak akses terbatas (misalnya, sebagai pengguna biasa) kemudian mencari cara untuk **mendapatkan hak akses yang lebih tinggi** (misalnya, menjadi administrator atau _root_).
> >   - **Pentingnya:** Ini adalah jenis serangan yang sangat umum dan berbahaya karena memungkinkan penyerang untuk mengambil alih kontrol penuh atas sistem. Masquerading sering digunakan sebagai langkah awal untuk melakukan eskalasi hak istimewa.
> >   
> >   ### Level Tindakan Keamanan (Model 4 Lapis)
> >   Keamanan absolut tidak mungkin dicapai. Tujuannya adalah membuat biaya (waktu, tenaga, sumber daya) untuk menembus sistem menjadi sangat tinggi. Keamanan harus diterapkan secara berlapis, seperti lapisan pertahanan sebuah benteng. Jika satu lapisan gagal, masih ada lapisan berikutnya.
> >   ![[Pasted image 20250610105037.png]]
> >  
> > **Level 1: Fisik (Physical):**
> > - Ini adalah lapisan paling dasar. Melindungi lokasi fisik dari pusat data, server, terminal, dan perangkat jaringan dari akses yang tidak sah.
> > - **Contoh:** Menggunakan ruang server yang terkunci, penjaga keamanan, CCTV, dan brankas.
> >
> > **Level 2: Jaringan (Network):**
> > - Mengamankan jalur komunikasi. Jaringan adalah jalur utama untuk serangan jarak jauh seperti DoS dan akses tidak sah.
> > - **Contoh:** Menggunakan firewall untuk memfilter lalu lintas, enkripsi untuk melindungi data yang dikirim, dan sistem deteksi intrusi (IDS).
> >
> > **Level 3: Sistem Operasi (Operating System):**
> > - OS adalah inti dari sistem. OS harus selalu diperbarui (_patched_) dan "diperkeras" (_hardened_), yaitu mengonfigurasi OS untuk meminimalkan _attack surface_ (area yang bisa diserang) dengan mematikan layanan yang tidak perlu.
> > - **Contoh:** Menginstal pembaruan keamanan Windows secara teratur, membatasi hak akses pengguna.
> > 
> > **Level 4: Aplikasi (Application):**
> > - Mengamankan perangkat lunak yang berjalan di atas OS. Aplikasi bisa memiliki bug keamanan atau bahkan sengaja dirancang untuk berbahaya.
> > - **Contoh:** Melakukan validasi input pada formulir web untuk mencegah _code injection_, menggunakan _sandboxing_ untuk menjalankan aplikasi dalam lingkungan yang terisolasi.
> >  
> > ### Faktor Manusia
> > - Lapisan terlemah dalam keamanan seringkali adalah manusia.
> > - **Social Engineering (Rekayasa Sosial):** Seni memanipulasi orang untuk mendapatkan informasi rahasia. Penyerang tidak meretas sistem, tetapi "meretas" manusia.
> > - **Phishing:** Bentuk rekayasa sosial yang paling umum. Penyerang mengirim email atau membuat halaman web palsu yang terlihat sah (misalnya, halaman login bank palsu) untuk memancing korban memasukkan informasi sensitif mereka (password, nomor kartu kredit).

> [!cornell] #### Summary
> Penyerang menggunakan berbagai metode teknis seperti penyamaran (_masquerading_), serangan pengulangan (_replay attack_), menjadi perantara (_Man-in-the-Middle_), dan eskalasi hak istimewa (_privilege escalation_) untuk menembus sistem. Untuk melawan ini, pertahanan keamanan harus diimplementasikan dengan model berlapis (_defense in depth_) yang mencakup level Fisik, Jaringan, Sistem Operasi, dan Aplikasi, sambil terus waspada terhadap faktor manusia yang rentan terhadap serangan rekayasa sosial seperti _phishing_.

> [!ad-libitum]- Additional Information (Optional)
> 