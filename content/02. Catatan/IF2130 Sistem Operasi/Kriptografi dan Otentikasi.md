---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Tujuan Kriptografi
> > - Enkripsi Simetris (AES)
> > - Enkripsi Asimetris (RSA)
> > - Simetris vs. Asimetris
> > - Otentikasi Pesan (Hashing)
> > - MAC vs. Tanda Tangan Digital
> > - Masalah Distribusi Kunci
> > - Solusi: Sertifikat Digital (CA)
> > - Implementasi Kripto (TLS, IPSec)
> > - Otentikasi Pengguna
> > - Kelemahan & Proteksi Password
> > - Hashing & Salting Password
> > - OTP, Biometrik, & MFA
> >
>
> > ###  Kriptografi sebagai Alat Keamanan
> > Kriptografi adalah ilmu dan seni untuk mengamankan komunikasi menggunakan kode rahasia yang disebut **kunci (key)**. Tujuannya adalah untuk membatasi siapa yang bisa mengirim dan/atau menerima sebuah pesan. Ini adalah alat terluas dan paling kuat untuk keamanan digital.
> > 
> > ### Enkripsi (Menjamin Kerahasiaan)
> > Proses mengubah data yang dapat dibaca (_plaintext_) menjadi format acak yang tidak dapat dibaca (_ciphertext_). Hanya pihak yang memiliki kunci yang benar yang dapat mengembalikannya ke bentuk semula (_decryption_).
> > 
> > **Enkripsi Simetris:** 
> > - Menggunakan **kunci yang sama** untuk proses enkripsi dan dekripsi.
> > - **Analogi:** Sebuah gembok dengan satu kunci. Siapapun yang ingin mengunci atau membuka gembok harus memiliki duplikat kunci yang sama
> > - **Keunggulan:** Sangat cepat dan efisien.
> > - **Kelemahan:** Masalah distribusi kunci (bagaimana cara aman mengirimkan kunci ke pihak lain?).
> > - **Contoh:** **AES (Advanced Encryption Standard)**, yang menjadi standar global saat ini.
> > 
> > **Enkripsi Asimetris (Public-Key Cryptography):**
> > - Menggunakan **sepasang kunci** yang berbeda namun terhubung secara matematis: **Public Key** dan **Private Key**.
> > - **Public Key:** Dapat dibagikan secara bebas ke semua orang. Digunakan untuk **mengenkripsi** data.
> > - **Private Key:** Harus dijaga kerahasiaannya oleh pemilik. Digunakan untuk **mendekripsi** data.
> > - **Analogi:** Sebuah kotak surat dengan dua slot. Slot surat (Public Key) terbuka untuk umum, siapa saja bisa memasukkan surat. Tetapi hanya pemilik yang memiliki kunci (Private Key) yang bisa membuka kotak surat dan membaca isinya.
> > - **Keunggulan:** Memecahkan masalah distribusi kunci.
> > - **Kelemahan:** Jauh lebih lambat (secara komputasi) daripada enkripsi simetris.
> > - **Contoh:** **RSA (Rivest-Shamir-Adleman)**, yang paling umum digunakan.
> >
> > ### Otentikasi Pesan (Menjamin Integritas & Keaslian)
> > Membuktikan bahwa sebuah pesan tidak diubah selama transmisi dan benar-benar berasal dari pengirim yang sah.
> > 
> > **Hash Function**
> > Algoritma yang mengubah data berukuran apa pun menjadi sebuah "sidik jari" digital berukuran tetap yang disebut _hash value_ atau _message digest_. Contoh: SHA-256. Properti pentingnya adalah _collision resistance_ (sangat sulit menemukan dua data berbeda yang menghasilkan hash yang sama).
> > **Message-Authentication Code (MAC)**
> > Sebuah _hash_ yang dibuat menggunakan **kunci simetris rahasia**. Hanya pihak yang memiliki kunci yang sama yang bisa membuat atau memverifikasi MAC. Ini membuktikan integritas dan keaslian pengirim.
> > **Tanda Tangan Digital (Digital Signature):** Versi asimetris dari MAC.      
> > 1. Pengirim membuat _hash_ dari pesan.
> > 2. Pengirim mengenkripsi _hash_ tersebut dengan **Private Key** miliknya. Hasilnya adalah tanda tangan digital.
> > 3. Penerima mendekripsi tanda tangan menggunakan **Public Key** pengirim untuk mendapatkan _hash_ asli.
> > 4. Penerima juga membuat _hash_ dari pesan yang ia terima. Jika kedua _hash_ cocok, pesan tersebut otentik dan utuh.
> > 5. 
> > Ini memberikan **non-repudiation** (pengirim tidak dapat menyangkal telah mengirim pesan tersebut).
> > 
> > ### Distribusi Kunci & Implementasi
> > - **Masalah:** Bagaimana cara memastikan _public key_ yang kita terima benar-benar milik orang yang kita tuju, bukan milik penyerang (serangan _Man-in-the-Middle_)?
> > - **Solusi: Sertifikat Digital (Digital Certificate):**
> > 	- Sebuah "KTP digital" yang mengikat identitas seseorang/organisasi dengan _public key_ mereka.
> > 	- Sertifikat ini ditandatangani secara digital oleh pihak ketiga yang tepercaya, yang disebut **Certificate Authority (CA)**. Browser web kita sudah memiliki daftar CA tepercaya. Ini adalah fondasi dari HTTPS.
> > - **Implementasi:** Kriptografi diterapkan di berbagai lapisan, yang paling umum adalah **TLS (Transport Layer Security)** yang mengamankan koneksi web (HTTP menjadi HTTPS), dan **IPSec** yang sering digunakan untuk VPN.
> > 
> > ### Otentikasi Pengguna (User Authentication)
> > Proses memverifikasi identitas pengguna yang mencoba mengakses sistem.
> >**Password** 
> >Metode paling umum, tetapi sangat rentan.
> >- **Proteksi Password:** Jangan pernah menyimpan password dalam bentuk teks biasa. Simpan dalam bentuk _hash_.
> >- **Salting:** Sebelum di-_hash_, tambahkan sepotong data acak yang unik (_salt_) ke setiap password. Ini memastikan bahkan jika dua pengguna memiliki password yang sama, _hash_ yang disimpan akan berbeda. Ini membuat serangan _dictionary_ dan _rainbow table_ (database _hash_ yang sudah dihitung) menjadi tidak efektif.
> >- 
> >**One-Time Password (OTP)**
> >Password yang hanya valid untuk satu sesi atau transaksi. Dikirim melalui SMS atau dihasilkan oleh aplikasi authenticator.
> >
> >**Biometrik**
> >Menggunakan atribut fisik unik seperti sidik jari, wajah, atau retina.
> >
> >  **Multi-Factor Authentication (MFA)**
> >  Standar emas untuk keamanan login. Mengharuskan pengguna untuk memberikan **dua atau lebih** bukti identitas dari kategori yang berbeda:
> >  1. Sesuatu yang Anda **tahu** (password).
> >  2. Sesuatu yang Anda **miliki** (ponsel untuk menerima OTP, kunci hardware).
> >  3. Sesuatu yang **Anda** (sidik jari, wajah).

> [!cornell] #### Summary
> Kriptografi adalah alat fundamental untuk mencapai kerahasiaan melalui enkripsi (simetris & asimetris) dan integritas/keaslian melalui otentikasi pesan (MAC & tanda tangan digital), di mana tantangan distribusi kunci diatasi dengan sertifikat digital. Pada level pengguna, otentikasi yang kuat dicapai dengan melindungi password melalui _hashing_ dan _salting_ serta menerapkan Otentikasi Multi-Faktor (MFA) yang menggabungkan berbagai bukti identitas.

> [!ad-libitum]- Additional Information (Optional)