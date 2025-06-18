---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Keamanan: Kriptografi Terapan untuk Jaringan
> 
> > ## Questions/Cues
> > 
> > - Apa 3 tujuan utama komunikasi aman?
> > - Bedakan Kriptografi **Simetris** dan **Asimetris**.
> > - Bagaimana kriptografi simetris mencapai **kerahasiaan**?
> > - Apa itu _Stream Cipher_ dan _Block Cipher_?
> > - Apa saja properti **Fungsi Hash Kriptografis**?
> > - Bagaimana cara mencapai **integritas**?
> > - Apa itu **HMAC**?
> > - Bagaimana cara mencapai **autentikasi**?
> > - Apa itu _Nonce_ dan mengapa diperlukan?
> > - Apa masalah utama Kriptografi Simetris?
> > - Bagaimana **TLS/SSL** bekerja secara umum?
> > 
> > ## Reference Points
> > 
> > - Lecture 11, Slides: 725, 731-732, 735-737, 739, 741, 743, 745, 749-752, 754-755, 757
> 
> > ### Tujuan dan Jenis Kriptografi
> > 
> > Kriptografi adalah ilmu dan seni untuk mengamankan komunikasi di hadapan pihak ketiga (penyerang). Tiga tujuan utamanya adalah:
> > 
> > 1. **Kerahasiaan (Confidentiality):** Memastikan hanya pihak yang berwenang yang dapat membaca isi pesan.
> > 2. **Integritas (Integrity):** Memastikan pesan tidak diubah atau dirusak selama transmisi.
> > 3. **Autentikasi (Authentication):** Memverifikasi identitas pengirim dan penerima.
> > 
> > Terdapat dua jenis utama kriptografi:
> > 
> > - **Kriptografi Simetris (Private Key):** Menggunakan **satu kunci rahasia yang sama** untuk proses enkripsi dan dekripsi. Algoritma ini sangat **cepat** dan efisien, namun memiliki tantangan besar dalam hal **distribusi kunci** yang aman. Contoh: AES, RC4.
> > - **Kriptografi Asimetris (Public Key):** Menggunakan **sepasang kunci** yang berbeda: sebuah _public key_ yang dapat dibagikan secara bebas untuk enkripsi, dan sebuah _private key_ yang harus dirahasiakan untuk dekripsi. Algoritma ini **lebih lambat**, tetapi secara elegan memecahkan masalah distribusi kunci. Contoh: RSA.
> > 
> > ### Kriptografi Simetris untuk Kerahasiaan
> > 
> > Kerahasiaan dicapai dengan proses enkripsi, mengubah plaintext menjadi ciphertext.
> > 
> > - **One-Time Pad (OTP):** Secara teoretis merupakan enkripsi paling aman. Menggunakan kunci acak yang panjangnya sama dengan pesan dan hanya digunakan sekali. Namun, ini tidak praktis karena manajemen kuncinya yang sulit.
> > - **Stream Cipher (misal, RC4):** Menggunakan kunci rahasia sebagai _seed_ untuk menghasilkan aliran bit pseudo-acak (disebut _keystream_). Plaintext kemudian di-XOR dengan _keystream_ ini untuk menghasilkan ciphertext.
> > - **Block Cipher (misal, AES):** Memecah plaintext menjadi blok-blok berukuran tetap (misal, 128 bit). Setiap blok dienkripsi secara terpisah menggunakan kunci rahasia melalui beberapa putaran substitusi dan permutasi yang kompleks.
> > 
> > ### Integritas & Autentikasi dengan HMAC
> > 
> > Integritas dan autentikasi sering kali dicapai menggunakan fungsi hash dan kunci rahasia.
> > 
> > - **Fungsi Hash Kriptografis:** Sebuah fungsi matematis yang mengambil input dengan panjang sembarang dan menghasilkan output (hash) dengan panjang tetap. Properti pentingnya:
> >     - _**One-way:**_ Sangat sulit untuk menemukan input asli dari sebuah hash.
> >     - _**Collision-resistant:**_ Sangat sulit untuk menemukan dua input berbeda yang menghasilkan hash yang sama.
> > - **HMAC (Hash-based Message Authentication Code):**
> >     - **Untuk Integritas:** Pengirim menggabungkan pesan dengan kunci rahasia, lalu menghitung hash dari kombinasi tersebut. Hasil hash ini (disebut MAC atau _tag_) dikirim bersama pesan. Penerima melakukan perhitungan yang sama; jika hash-nya cocok, berarti pesan tidak diubah.
> >     - **Untuk Autentikasi:** Karena hanya pihak yang memiliki kunci rahasia yang dapat menghasilkan MAC yang benar, validitas MAC juga membuktikan bahwa pesan tersebut benar-benar berasal dari pengirim yang sah.
> > - **Mencegah Replay Attack dengan Nonce:** Seorang penyerang bisa saja merekam sebuah pesan dan MAC-nya yang sah, lalu mengirimkannya kembali di lain waktu (_replay attack_). Untuk mencegah ini, digunakan **Nonce** (number used once), yaitu sebuah nilai acak yang dikirim sebagai "tantangan". Pengirim harus menyertakan nonce ini dalam perhitungan HMAC-nya. Karena nonce selalu baru untuk setiap sesi, MAC yang dihasilkan pun selalu baru, membuat MAC yang direkam menjadi tidak valid.
> > 
> > ### Studi Kasus: Transport Layer Security (TLS/SSL)
> > 
> > TLS (penerus SSL) adalah protokol keamanan yang paling banyak digunakan saat ini (misalnya, untuk HTTPS). TLS secara cerdas menggunakan **pendekatan hybrid** untuk mendapatkan yang terbaik dari kedua dunia kriptografi.
> > 
> > - **Proses TLS Handshake (Disederhanakan):**
> >     1. **Autentikasi & Pertukaran Kunci (Asimetris):** Klien dan server menggunakan kriptografi asimetris di awal. Server mengirimkan **sertifikat digital**-nya (yang berisi _public key_-nya) kepada klien. Klien memverifikasi sertifikat ini. Kemudian, klien membuat sebuah kunci rahasia sementara, mengenkripsinya dengan _public key_ server, dan mengirimkannya.
> >     2. **Pembuatan Kunci Sesi (Simetris):** Hanya server yang dapat mendekripsi kunci rahasia sementara tersebut menggunakan _private key_-nya. Sekarang, baik klien maupun server sama-sama memiliki rahasia yang sama. Mereka menggunakan rahasia ini untuk menghasilkan satu set **kunci sesi simetris** yang baru.
> >     3. **Komunikasi Aman:** Semua komunikasi data selanjutnya dienkripsi dan diautentikasi menggunakan kunci sesi simetris yang **cepat** ini.
> > 
> > Dengan cara ini, proses pertukaran kunci yang rumit dan lambat hanya dilakukan sekali di awal, sementara transfer data utama berjalan dengan cepat dan aman.

> [!cornell] #### Summary
> 
> - Komunikasi aman membutuhkan tiga pilar: **Kerahasiaan** (hanya pihak berwenang yang bisa membaca), **Integritas** (data tidak diubah), dan **Autentikasi** (identitas pihak terverifikasi).
> - **Kriptografi Simetris** (satu kunci) sangat cepat dan efisien untuk enkripsi (dengan AES) dan autentikasi (dengan **HMAC**), namun memiliki kelemahan dalam hal distribusi kunci yang aman.
> - **TLS/SSL** adalah solusi praktis yang menggunakan pendekatan _hybrid_: Kriptografi **Asimetris** (dua kunci) digunakan di awal untuk proses autentikasi server dan pertukaran kunci rahasia secara aman. Setelah itu, komunikasi data utama dienkripsi menggunakan **kunci sesi Simetris** yang cepat dan baru dibuat.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Public Key Infrastructure (PKI) dan Certificate Authority (CA)
> 
> - Bagaimana kita bisa percaya bahwa _public key_ yang diberikan oleh `google.com` benar-benar milik Google? Jawabannya adalah melalui **PKI**. Dalam sistem ini, ada entitas tepercaya yang disebut **Certificate Authority (CA)** (contoh: Let's Encrypt, DigiCert). CA akan memverifikasi identitas sebuah organisasi dan kemudian menandatangani **sertifikat digital** mereka secara kriptografis. Sertifikat inilah yang mengikat sebuah _public key_ ke sebuah identitas. Browser kita sudah dilengkapi dengan daftar CA tepercaya, sehingga ia bisa memverifikasi tanda tangan pada sertifikat yang diterima dari sebuah situs web.
> 
> #### Perfect Forward Secrecy (PFS)
> 
> - Ini adalah properti keamanan tingkat lanjut dalam protokol seperti TLS. Dengan PFS, kunci sesi yang digunakan untuk mengenkripsi data Anda dibuat sedemikian rupa sehingga **tidak bergantung** pada _private key_ jangka panjang server. Artinya, bahkan jika _private key_ server suatu saat nanti dicuri, penyerang tetap tidak akan bisa mendekripsi rekaman komunikasi Anda di masa lalu. Ini dicapai dengan menggunakan protokol pertukaran kunci sementara seperti _Ephemeral Diffie-Hellman (DHE)_.
> 
> #### Eksplorasi Mandiri
> 
> - Klik ikon gembok di _address bar_ browser Anda saat mengunjungi situs HTTPS. Pilih opsi seperti "View Certificate" atau "Connection is secure". Anda dapat melihat detail sertifikat situs tersebut, termasuk siapa yang menerbitkannya (CA), masa berlakunya, algoritma yang digunakan, dan bahkan _public key_-nya. Ini adalah cara praktis untuk melihat komponen PKI dan TLS dalam aksi.