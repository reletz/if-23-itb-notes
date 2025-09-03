---
type: Note
cssclasses:
- cornell-notes
---
_Back to_ [[II4023 Forensik Digital]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Mengapa forensik email penting?
> >     
> > - Bagaimana alur kerja email?
> >     
> > - Apa saja komponen email?
> >     
> > - Apa itu _email header_?
> >     
> > - Informasi apa saja yang ada di _header_?
> >     
> > - Bagaimana cara menganalisis _header_?
> >     
> > - Apa ancaman dari _body_ email?
> >     
> > - Apa ancaman dari _attachment_?
> >     
> >
> > ## Reference Points
> >
> > - Slides II4023-05-2-Email-Forensics.pdf
> >     
> 
> > ### Latar Belakang Forensik Email
> >
> > Email merupakan salah satu media komunikasi digital yang paling umum digunakan, namun juga menjadi vektor utama untuk berbagai serangan siber. Investigasi forensik pada email sangat penting untuk melacak dan menganalisis kejahatan siber seperti:
> >
> > - **Spam:** Pengiriman email yang tidak diinginkan secara massal.
> >     
> > - **Phishing:** Upaya penipuan untuk mencuri informasi sensitif (seperti kredensial login atau data kartu kredit) dengan menyamar sebagai entitas terpercaya.
> >     
> >
> > Pelaku seringkali menggunakan layanan _anonymizer_ atau pemalsuan email (_email spoofing_) untuk menyembunyikan identitas asli mereka.
> >
> > ### Alur Kerja Pengiriman Email
> >
> > Proses pengiriman email melibatkan beberapa komponen utama:
> >
> > 1. **MUA (Mail User Agent):** Aplikasi yang digunakan oleh pengguna untuk membaca dan menulis email (contoh: Gmail, Outlook, Thunderbird).
> >     
> > 2. **MTA (Mail Transfer Agent):** Server yang bertugas mengirimkan email dari satu titik ke titik lain. Ini adalah "kantor pos"-nya internet.
> >     
> > 3. **MDA (Mail Delivery Agent):** Server yang menerima email dari MTA dan menempatkannya di kotak surat (_mailbox_) penerima.
> >     
> >
> > ### Struktur Email
> >
> > Sebuah email secara umum terdiri dari tiga bagian utama:
> >
> > - **Header:** Bagian metadata yang berisi informasi teknis tentang pengiriman email. Bagian ini seringkali tersembunyi dari pandangan pengguna biasa.
> >     
> > - **Body:** Isi utama dari pesan email yang bisa berupa teks biasa atau HTML.
> >     
> > - **Attachment:** File atau lampiran yang disertakan dalam email.
> >     
> >
> > ### Analisis Header Email
> >
> > _Header_ adalah sumber informasi paling krusial dalam forensik email. Untuk melihatnya, pengguna bisa menggunakan opsi seperti "Show Original" (tampilkan yang asli) pada klien email.
> >
> > **Informasi Kunci dalam Header:**
> >
> > - **From/To:** Menampilkan alamat email pengirim dan penerima. **Penting:** Bagian `From:` bisa dengan mudah dipalsukan.
> >     
> > - **Received:** Jejak digital yang mencatat setiap server (MTA) yang dilalui email, lengkap dengan alamat IP dan stempel waktu. Ini adalah bagian yang paling sulit dipalsukan dan sangat penting untuk melacak asal-usul email.
> >     
> > - **Return-Path:** Alamat email tujuan jika email gagal terkirim.
> >     
> > - **Received-SPF (Sender Policy Framework):** Hasil verifikasi apakah server pengirim diizinkan untuk mengirim email atas nama domain tersebut. Hasil `pass` menandakan server valid, sedangkan `fail` atau `neutral` bisa mengindikasikan pemalsuan.
> >     
> > - **DKIM (DomainKeys Identified Mail):** Tanda tangan digital yang memverifikasi bahwa konten email tidak diubah di tengah jalan dan pengirimnya adalah benar dari domain tersebut.
> >     
> > - **Message-ID:** Pengidentifikasi unik untuk setiap email.
> >     
> >
> > Tools untuk Analisis Header:
> > 
> > Untuk mempermudah analisis, header yang mentah dapat disalin dan ditempelkan ke alat bantu online seperti:
> >
> > - Google Apps Toolbox: Messageheader
> >     
> > - MXToolbox: Email Header Analyzer
> >     
> > - MHA (Microsoft Header Analyzer)
> >     
> >
> > Alat-alat ini akan mem-parsing informasi, menampilkan rute pengiriman (_email hops_), dan menyoroti hasil verifikasi SPF & DKIM.
> >
> > ### Analisis Body dan Attachment
> >
> > Selain _header_, bagian _body_ dan _attachment_ juga merupakan sumber ancaman.
> >
> > - **Analisis Body:**
> > 	- **Hyperlink Berbahaya:** Penyerang seringkali menyamarkan tautan berbahaya. Teks yang terlihat (`apple.com`) bisa saja mengarah ke alamat yang sama sekali berbeda (`malicious-site.com`). Penting untuk selalu memeriksa URL tujuan sebenarnya sebelum mengklik.
> > 	- **Redirect Chains:** Tautan seringkali melewati beberapa kali pengalihan (*redirect*) untuk menyembunyikan tujuan akhir yang berbahaya.
> >
> > - **Ancaman Attachment:**
> > 	- **Judul Clickbait:** Menggunakan judul yang memancing rasa penasaran agar korban membuka lampiran.
> > 	- **Ekstensi Ganda & Palsu:** Menyamarkan file berbahaya, misalnya `faktur.pdf.exe`.
> > 	- **Eksploit:** Memanfaatkan kerentanan pada perangkat lunak (misalnya, Adobe Reader atau Microsoft Office) untuk menjalankan kode berbahaya saat lampiran dibuka.
> > 	- **Analisis:** Semua *attachment* yang mencurigakan harus dianalisis di lingkungan yang aman (*sandbox*) atau menggunakan layanan seperti **VirusTotal** untuk memeriksa apakah file tersebut mengandung *malware*.


> [!cornell] #### Summary
> Forensik email adalah proses investigasi untuk melacak dan memvalidasi email, terutama dalam kasus _**spam**_ **dan** _**phishing**_. Kunci utama dari analisis ini terletak pada email header, yang berisi jejak digital pengiriman (jalur `Received` dari server ke server) serta hasil verifikasi otentikasi seperti SPF dan DKIM untuk mendeteksi pemalsuan. Selain _**header**_, analisis pada body email untuk tautan berbahaya dan pemeriksaan attachment menggunakan alat seperti VirusTotal juga sangat krusial untuk mengungkap ancaman secara keseluruhan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Spoofing via Telnet
>  Demonstrasi sederhana tentang betapa mudahnya memalsukan email bisa dilakukan dengan `telnet`. Dengan terhubung ke port 25 (port SMTP) sebuah mail server, seorang penyerang bisa mengetikkan perintah SMTP secara manual. Mereka bisa mendefinisikan `mail from:` (pengirim amplop) dan `From:` (pengirim yang tampil di email) dengan alamat palsu. Selama server email penerima tidak memiliki proteksi SPF atau DKIM yang ketat, email palsu ini bisa saja lolos dan masuk ke kotak masuk korban.
> 
> #### Analogi Sederhana: Email sebagai Surat Pos
> 
> - **MUA (Gmail/Outlook):** Anda (pengguna) dan kertas surat Anda.
>     
> - **MTA (Mail Server):** Kantor pos dan para kurir yang mengantarkan surat.
>     
> - **Body Email:** Isi surat yang Anda tulis.
>     
> - **Attachment:** Paket atau dokumen yang Anda lampirkan.
>     
> - **Email Header:** Bagian terpenting. Ini seperti **semua stempel pos, catatan kurir, dan informasi pelacakan** yang tercetak di amplop dari awal hingga akhir. Anda bisa memalsukan nama pengirim di dalam surat (`From:`), tapi Anda tidak bisa memalsukan stempel pos (`Received:`) dari setiap kantor pos yang dilewati.
>      
>  #### Eksplorasi Mandiri
> 
>  - **Periksa Header Email Anda:** Buka salah satu email di kotak masuk Anda (misalnya, dari buletin atau notifikasi). Cari opsi "Show original" atau "Tampilkan yang asli". Coba identifikasi baris-baris `Received:`. Anda akan melihat rute yang ditempuh email tersebut dari server pengirim hingga sampai ke server Google/Microsoft.
>      
> - **Gunakan Google Takeout:** Jika Anda menggunakan Gmail, coba fitur Google Takeout untuk mengekspor data email Anda dalam format MBOX. Anda bisa membuka file MBOX ini dengan editor teks dan melihat struktur mentah dari ribuan email Anda, termasuk semua _header_-nya.
>