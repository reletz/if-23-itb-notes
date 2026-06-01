---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Lapisan Aplikasi: Protokol Email (SMTP, POP3, IMAP)
> 
> > ## Questions/Cues
> > 
> > - Apa saja tiga komponen utama sistem email?
> > - Apa peran **User Agent (UA)**?
> > - Apa peran **Mail Server**?
> > - Jelaskan protokol **SMTP**.
> > - Mengapa SMTP disebut protokol "push"?
> > - Bagaimana format interaksi SMTP?
> > - Apa batasan format pesan pada SMTP?
> > - Apa itu **MIME** dan apa tujuannya?
> > - Apa perbedaan **SMTP** dan **HTTP**?
> > - Apa fungsi protokol **akses email**?
> > - Bedakan **POP3** dan **IMAP**.
> > 
> > ## Reference Points
> > 
> > - Lecture 10
> 
> > ### Komponen Sistem Email
> > 
> > Sistem email secara umum terdiri dari tiga komponen utama:
> > 
> > 1. **User Agents (UA):** Ini adalah aplikasi klien email yang digunakan oleh pengguna untuk membaca, menulis, mengirim, dan mengelola pesan. Contohnya termasuk Microsoft Outlook, Mozilla Thunderbird, atau antarmuka web seperti GMail.
> > 2. **Mail Servers:** Merupakan infrastruktur inti yang bekerja di belakang layar. Setiap server memiliki _message queue_ untuk email keluar dan _mailbox_ untuk menyimpan email masuk bagi setiap penggunanya. Server-server ini selalu aktif untuk menerima dan mengirim email kapan saja.
> > 3. **SMTP (Simple Mail Transfer Protocol):** Protokol standar yang digunakan untuk mentransfer pesan email dari User Agent pengirim ke Mail Server, dan yang terpenting, untuk mentransfer email **antar Mail Server**.
> > ![[Pasted image 20250618220413.png]]
> > 
> > ### Simple Mail Transfer Protocol (SMTP)
> > 
> > SMTP adalah protokol untuk **mengirim (push)** email melalui jaringan. Ia mendorong pesan dari klien ke server, dan dari server ke server lain hingga mencapai server tujuan.
> > 
> > - **Karakteristik Utama:**
> >     - Menggunakan **TCP** pada **port 25** untuk memastikan pengiriman yang andal.
> >     - Interaksinya berupa _command/response_ dalam format teks ASCII. Klien mengirim perintah (misal, `HELO`, `MAIL FROM:`, `RCPT TO:`, `DATA`), dan server merespons dengan kode status.
> >     - **Batasan:** Protokol SMTP asli dirancang hanya untuk mentransfer teks dalam format **7-bit ASCII**.
> >     ![[Pasted image 20250618220458.png]]
> > 
> > ### Format Pesan Email & MIME
> > 
> > - **Format Dasar (RFC 822):** Sebuah pesan email standar terdiri dari dua bagian:
> >     1. **Header:** Berisi baris metadata seperti `To:`, `From:`, dan `Subject:`.
> >     2. **Body:** Berisi isi pesan utama.
> > - **MIME (Multimedia Internet Mail Extensions):** Karena batasan 7-bit ASCII pada SMTP, MIME diciptakan sebagai standar ekstensi untuk memungkinkan email membawa konten non-teks.
> >     - MIME menambahkan header tambahan seperti `Content-Type:` (misal, `image/jpeg`) dan `Content-Transfer-Encoding:` (misal, `base64`).
> >     - Header ini memberitahu User Agent penerima tentang jenis file yang dilampirkan dan bagaimana data tersebut di-encode, sehingga dapat ditampilkan dengan benar. MIME memungkinkan satu email untuk berisi beberapa jenis konten (_multipart message_).
> > 
> > ### Protokol Akses Email: POP3 dan IMAP
> > 
> > SMTP hanya bertugas mengantar email **ke** server tujuan. Untuk mengambil email **dari** server ke User Agent (klien), diperlukan protokol akses yang bersifat "pull".
> > 
> > 1. **POP3 (Post Office Protocol version 3):**
> >     - Protokol yang sangat sederhana.
> >     - Cara kerjanya seperti "mengambil surat dari kantor pos". Setelah terhubung, klien akan **mengunduh semua email** dari server, dan biasanya **menghapusnya** dari server setelah diunduh.
> >     - Karena pesan dihapus dari server, sulit untuk mengakses email yang sama dari beberapa perangkat berbeda.
> > 2. **IMAP (Internet Mail Access Protocol):**
> >     - Protokol yang jauh lebih canggih dan modern.
> >     - Pesan **tetap disimpan di server secara default**. Klien hanya menyinkronkan dan menampilkan salinan dari pesan tersebut.
> >     - IMAP mengelola status (seperti folder, email sudah dibaca/belum) di server, sehingga semua perubahan akan tersinkronisasi di semua perangkat yang mengakses akun email yang sama. Ini adalah protokol yang ideal untuk era multi-perangkat saat ini.
> >  
> >  ![[Pasted image 20250618220552.png]]
> > 
> > ### Perbandingan SMTP dengan HTTP
> > 
> > - **Persamaan:** Keduanya menggunakan interaksi command/response berbasis teks dan berjalan di atas TCP.
> > - **Perbedaan:**
> >     - **Arah Protokol:** HTTP adalah protokol **pull** (klien _menarik_ data dari server). SMTP adalah protokol **push** (pengirim _mendorong_ data ke server).
> >     - **Format Data:** HTTP mengenkapsulasi setiap objek (misal, gambar, file css) dalam pesan responsnya sendiri-sendiri. SMTP dapat menggabungkan banyak objek (lampiran) ke dalam satu pesan menggunakan format _multipart_ MIME.

> [!cornell] #### Summary
> 
> - Sistem email terdiri dari tiga komponen: **User Agents** (klien seperti Outlook), **Mail Servers** (penyimpanan dan relay), dan protokol **SMTP** yang berfungsi untuk "mendorong" (push) email antar server.
> - **SMTP** memiliki batasan hanya untuk teks ASCII, sehingga ekstensi **MIME** digunakan untuk memungkinkan pengiriman konten multimedia seperti gambar dan lampiran.
> - Untuk "menarik" (pull) email dari server ke klien, digunakan protokol akses seperti **POP3** (mengunduh dan menghapus) atau **IMAP** (menyinkronkan dan menyimpan email di server), di mana IMAP lebih cocok untuk akses dari berbagai perangkat.
> - ![[Pasted image 20250618220612.png]]

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Email Berbasis Web (GMail, Outlook.com)
> 
> - Layanan ini adalah contoh menarik dari arsitektur hybrid. Saat Anda membuka GMail di browser, komunikasi antara browser Anda dan server Google terjadi melalui protokol **HTTP**. Namun, ketika server Google perlu mengirim email Anda ke teman Anda yang menggunakan alamat email lain (misalnya, di Yahoo), komunikasi **antar server** (Google ke Yahoo) tetap menggunakan protokol standar **SMTP**. Jadi, pengguna berinteraksi via HTTP, tetapi tulang punggung pengiriman email global tetap SMTP.
> 
> #### Keamanan Email
> 
> - Secara default, email yang dikirim melalui SMTP adalah teks biasa (tidak dienkripsi) dan rentan untuk disadap atau dipalsukan. Untuk mengamankannya, digunakan standar enkripsi seperti **PGP (Pretty Good Privacy)** dan **S/MIME (Secure/MIME)**. Standar-standar ini memungkinkan pengguna untuk mengenkripsi isi email dan memberikan tanda tangan digital untuk memastikan privasi (kerahasiaan) dan keaslian (autentikasi) pengirim.
> 
> #### Eksplorasi Mandiri
> 
> - Coba gunakan perintah `telnet` di _command line_ untuk berinteraksi langsung dengan server SMTP (jika tidak diblokir oleh ISP Anda). Ketik `telnet gmail-smtp-in.l.google.com 25`. Setelah terhubung, Anda bisa mencoba mengetik perintah SMTP seperti `HELO your-computer-name`, `MAIL FROM:<your-email@gmail.com>`, dll., untuk melihat respons langsung dari server email raksasa seperti Google.