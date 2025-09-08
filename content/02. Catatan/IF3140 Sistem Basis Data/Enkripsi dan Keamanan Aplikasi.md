---


type: Note

cssclasses:

- cornell-notes
---


_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic: Enkripsi dan Keamanan Aplikasi
> 
> > ## Questions/Cues
> >
> > - Apa itu enkripsi?
> >     
> > - Beda enkripsi simetris & kunci publik?
> >     
> > - Bagaimana enkripsi diterapkan di database?
> >     
> > - Apa itu SQL Injection?
> >     
> > - Bagaimana cara mencegah SQL Injection?
> >     
> > - Apa itu Cross-Site Scripting (XSS)?
> >     
> > - Apa pentingnya Two-Factor Authentication?
> >     
> > - Apa fungsi Audit Trail?
> >     
> >
> > ## Reference Points
> >
> > - Slides 44-60: Database Security.pdf
> >     
> 
> > ### Enkripsi Data
> >
> > **Enkripsi** adalah proses mengubah data (plaintext) menjadi format terenkode (ciphertext) yang tidak dapat dibaca tanpa kunci dekripsi. Tujuannya adalah untuk melindungi kerahasiaan data saat disimpan atau ditransmisikan.
> >
> > - **Properti Enkripsi yang Baik:**
> >   - Mudah digunakan oleh pengguna yang sah.
> >   - Sangat sulit dipecahkan oleh penyusup.
> >   - Keamanannya bergantung pada kerahasiaan **kunci enkripsi**, bukan pada kerahasiaan algoritmanya.
> > 
> > - **Jenis-jenis Enkripsi:**
> > 
> > 	1.  **Enkripsi Simetris (Symmetric-key):** Menggunakan kunci yang sama untuk proses enkripsi dan dekripsi. Contoh: DES, AES. Cepat, namun memiliki tantangan dalam distribusi kunci yang aman.
> > 	2.  **Enkripsi Kunci Publik (Public-key / Asymmetric):** Menggunakan sepasang kunci: **kunci publik** untuk mengenkripsi (dapat dibagikan) dan **kunci privat** untuk mendekripsi (harus dirahasiakan). Contoh: RSA. Lebih aman untuk komunikasi, tetapi lebih lambat.
> >
> > ### Keamanan pada Lapisan Aplikasi (Application Security)
> >
> > Keamanan pada lapisan ini sangat krusial karena banyak serangan modern menargetkan celah pada bagaimana aplikasi berinteraksi dengan database.
> >
> > - SQL Injection:
> > 	- Serangan di mana penyerang menyisipkan (inject) kode SQL berbahaya melalui input dari pengguna (misalnya, form login atau search bar). Jika input tidak divalidasi dengan benar, kode ini bisa dieksekusi oleh database, memungkinkan penyerang untuk mencuri, mengubah, atau menghapus data.
> > 	- **Pencegahan Utama:** **Selalu gunakan *Prepared Statements* (atau *parameterized queries*).** Dengan cara ini, input pengguna diperlakukan sebagai data murni, bukan sebagai bagian dari perintah SQL yang bisa dieksekusi.
> > 
> > - Cross-Site Scripting (XSS/CSRF):
> > 	- Serangan di mana penyerang menyisipkan skrip berbahaya (biasanya JavaScript) ke dalam halaman web yang dilihat oleh pengguna lain. Skrip ini dapat mencuri cookie sesi, membajak akun, atau melakukan tindakan atas nama pengguna tanpa persetujuan mereka
> > 	- **Pencegahan:** Lakukan sanitasi input (buang tag HTML/skrip berbahaya), gunakan header HTTP yang aman, dan jangan pernah gunakan metode `GET` untuk operasi yang mengubah data.
> > 
> > **Otentikasi dan Otorisasi:**
> > - **Otentikasi:** Proses verifikasi identitas pengguna. Menggunakan *Two-Factor Authentication* (2FA) sangat disarankan untuk menambah lapisan keamanan di luar password.
> > - **Otorisasi:** Proses menentukan hak akses pengguna. Seringkali, otorisasi yang kompleks (misalnya, "mahasiswa hanya bisa melihat nilainya sendiri") harus diimplementasikan di dalam logika aplikasi, karena SQL standar memiliki keterbatasan dalam otorisasi level baris (*row-level*).
> > 
> > **Audit Trails** 
> > Ini adalah log atau catatan jejak rekam dari semua tindakan penting yang terjadi di dalam aplikasi atau database. Audit trail sangat penting untuk investigasi after-the-fact guna mendeteksi pelanggaran, melacak pelaku, dan memperbaiki kerusakan.
> >     

> [!cornell] #### Summary
> Untuk melindungi database secara menyeluruh, dua lapisan pertahanan utama diperlukan: _**enkripsi**_ untuk mengamankan data saat disimpan dengan mengubahnya menjadi format yang tidak dapat dibaca, dan _**keamanan aplikasi**_ untuk bertahan dari serangan seperti SQL Injection dan XSS yang mengeksploitasi interaksi antara pengguna dan database. Praktik seperti menggunakan prepared statements, sanitasi input, otentikasi kuat, dan pencatatan audit trail adalah fondasi penting dalam membangun sistem yang aman.

> [!ad-libitum]- Additional Information
> #### Pendalaman Teknis: Password Hashing dan Salting
> Jangan pernah menyimpan password dalam bentuk _clear text_. Password harus di-_hash_ (diubah menjadi string acak dengan panjang tetap menggunakan algoritma seperti SHA-256). Untuk keamanan ekstra, gunakan teknik **salting**: sebelum di-hash, tambahkan sebuah string acak unik ("salt") ke setiap password. Ini memastikan bahwa bahkan jika dua pengguna memiliki password yang sama, hasil hash-nya akan berbeda, membuatnya jauh lebih tahan terhadap serangan _rainbow table_.
> 
> #### Eksplorasi Mandiri
> 
> Pelajari **OWASP Top 10**, sebuah laporan standar yang merangkum sepuluh risiko keamanan aplikasi web yang paling kritis. Memahami daftar ini akan memberikan Anda gambaran yang sangat baik tentang ancaman nyata yang dihadapi oleh pengembang web saat ini. Anda juga bisa mencoba tools seperti _OWASP ZAP_ untuk melakukan pemindaian keamanan dasar pada aplikasi web sederhana.
> 
> #### Sumber & Referensi Lanjutan:
> 
>  - OWASP (Open Web Application Security Project) Top 10 List.
>      
>  - Abraham Silberschatz, Henry F. Korth, S. Sudarshan: "Database System Concepts", 7th Edition (Chapter 9.8 & 9.9)
> 