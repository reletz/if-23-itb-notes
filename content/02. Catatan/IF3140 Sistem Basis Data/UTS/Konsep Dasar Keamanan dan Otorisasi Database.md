---


type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic: Konsep Dasar Keamanan dan Otorisasi Database
> 
> > ## Questions/Cues
> > 
> > - Mengapa harus mempelajari keamanan database?
> > 
> > - Apa saja isu utama dalam keamanan database?
> >     
> > - Apa 3 ancaman utama terhadap database?
> >     
> > - Apa 4 jenis kontrol keamanan?
> >     
> > - Apa beda Discretionary & Mandatory Security?
> >     
> > - Apa peran DBA dalam keamanan?
> >     
> > - Bagaimana mekanisme proteksi akses dasar bekerja?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 5-12: Database Security.pdf
> >     
> 
> > 
> > ### Tujuan
> > - Memahami properti penting dalam keamanan database
> > - Meninjau _access control_ menggunakan _authorization-grant graph_
> > - Memanajemen pengguna database 
> > 
> > ### Apa Saja Yang Dibahas Pada Keamanan Database?
> > Keamanan database adalah serangkaian tindakan untuk melindungi database dari penggunaan yang tidak sah, penyalahgunaan, atau kerusakan. Isu yang ditangani mencakup aspek legal & etis, kebijakan institusional, hingga implementasi teknis pada level sistem, seperti:
> > - Berbagai isu hukum dan etika terkait hak untuk mengakses informasi tertentu
> > - Isu kebijakan di tingkat pemerintahan, kelembagaan, atau perusahaan mengenai jenis informasi apa yang tidak boleh dipublikasikan
> > - Isu terkait sistem seperti tingkat sistem di mana berbagai fungsi keamanan harus ditegakkan
> > - Kebutuhan di beberapa organisasi untuk mengidentifikasi beberapa tingkat keamanan dan mengkategorikan data dan pengguna berdasarkan klasifikasi tersebut
> > 
> > ### Isu dan Ancaman dalam Keamanan Database
> > 
> > Ada tiga ancaman utama yang harus dimitigasi:
> > ![[Pasted image 20251008211349.png]]
> > 
> > 1. **Loss of Confidentiality (Kehilangan Kerahasiaan):** Perlindungan data dari pengungkapan yang tidak sah. Contoh: Data gaji karyawan tidak boleh bisa diakses oleh semua orang.
> >     
> > 2. **Loss of Integrity (Kehilangan Integritas):** Perlindungan informasi dari modifikasi yang tidak semestinya. Data harus tetap akurat dan konsisten. Contoh: Saldo rekening bank tidak boleh bisa diubah secara sewenang-wenang.
> >     
> > 3. **Loss of Availability (Kehilangan Ketersediaan):** Jaminan bahwa data dan layanan database dapat diakses oleh pengguna yang sah kapan pun dibutuhkan. Contoh: Serangan DDoS (Denial of Service) yang membuat server database tidak bisa diakses.
> >     
> > 
> > ### Jenis-jenis Kontrol dan Mekanisme Keamanan
> > 
> > Untuk mengatasi ancaman, ada empat jenis tindakan kontrol utama:
> > 
> > ![[Pasted image 20251008211438.png]]
> > 
> > - **Access Control:** Mekanisme utama yang membatasi akses ke database, biasanya melalui akun pengguna dan kata sandi.
> >     
> > - **Inference Control:** Digunakan pada database statistik untuk mencegah pengguna menyimpulkan data individu dari hasil query statistik (agregat).
> >     
> > - **Flow Control:** Mencegah informasi "mengalir" dari level keamanan tinggi ke level yang lebih rendah.
> >     
> > - **Encryption:** Mengubah data menjadi format yang tidak dapat dibaca (ciphertext) untuk melindunginya, terutama saat ditransmisikan melalui jaringan.
> >     
> > 
> > Terdapat dua mekanisme keamanan utama dalam DBMS:
> > 
> > 1. **Discretionary Security:** Memberikan _privileges_ (hak istimewa) seperti `read`, `insert`, `update`, `delete` kepada pengguna tertentu. Model ini fleksibel dan berbasis pada identitas pengguna. Siapa yang memiliki hak bisa memberikan hak itu kepada orang lain (jika diizinkan).
> >     
> > 2. **Mandatory Security:** Menerapkan keamanan multilevel dengan mengklasifikasikan data dan pengguna ke dalam level keamanan (misal: Top Secret, Secret, Confidential). Akses ditentukan oleh perbandingan level keamanan pengguna dengan level keamanan data, bukan hanya identitas.
> >     
> > 
> > ### Peran Database Administrator (DBA)
> > 
> > **DBA** adalah otoritas pusat yang bertanggung jawab atas pengelolaan dan keamanan sistem database secara keseluruhan. Tanggung jawab utamanya meliputi:
> > 
> > - **Account Creation:** Membuat akun untuk pengguna.
> >     
> > - **Privilege Granting:** Memberikan hak akses yang sesuai kepada pengguna.
> >     
> > - **Privilege Revocation:** Mencabut hak akses jika sudah tidak diperlukan atau disalahgunakan.
> >     
> > - **Security Level Assignment:** Menentukan klasifikasi keamanan untuk data dan pengguna dalam model Mandatory Security.
> >   
> >   ![[Pasted image 20251024031114.png]]
> > 
> > ### Proteksi Akses Dasar: Akun dan Audit
> > 
> > Proses akses ke database dimulai ketika seorang pengguna mengajukan permohonan akun. DBA akan membuat **account ID** dan **password**. Pengguna harus menggunakan kredensial ini setiap kali login.
> > 
> > Untuk memantau aktivitas, DBMS mencatat semua operasi yang dilakukan oleh pengguna dalam sebuah **database log**. Ketika log ini digunakan secara spesifik untuk tujuan keamanan, ia disebut **Audit Trail**. Jika ada kecurigaan aktivitas ilegal, DBA dapat melakukan **database audit** dengan memeriksa log ini untuk melacak semua akses dan operasi yang terjadi dalam periode waktu tertentu.

> [!cornell] #### Summary
> Keamanan database adalah pendekatan berlapis untuk melindungi data dari ancaman terhadap kerahasiaan, integritas, dan ketersediaannya. Ini dicapai melalui berbagai jenis kontrol (seperti Access Control dan Enkripsi) yang dikelola oleh DBA sebagai otoritas pusat. Mekanisme fundamentalnya adalah pemberian hak akses melalui akun pengguna, yang aktivitasnya diawasi secara ketat melalui audit trail untuk memastikan akuntabilitas dan deteksi pelanggaran.

> [!ad-libitum]- Additional Information
>  #### Pendalaman Teknis: CIA Triad
>  Tiga ancaman utama (Confidentiality, Integrity, Availability) dikenal sebagai "CIA Triad" dalam dunia keamanan siber. Ini adalah model dasar untuk memandu kebijakan keamanan informasi. Memahami bagaimana setiap ancaman dapat dieksploitasi adalah langkah pertama dalam merancang pertahanan yang efektif. Misalnya, _Loss of Integrity_ tidak hanya berarti data diubah, tetapi juga bisa berarti data yang tidak valid dimasukkan karena kurangnya validasi.
> 
> #### Eksplorasi Mandiri
>  Coba periksa log audit (audit trail) pada sistem database sederhana seperti MySQL atau PostgreSQL. Aktifkan fitur logging untuk semua query dan amati bagaimana setiap tindakan (SELECT, UPDATE, INSERT, DELETE) dicatat, lengkap dengan informasi pengguna dan timestamp. Ini akan memberikan gambaran nyata tentang bagaimana audit trail bekerja dalam praktik.
>
> #### Sumber & Referensi Lanjutan:
> - Ramez Elmasri, Shamkant B. Navathe: "Fundamentals of Database Systems", 6th Edition (Chapter 24)     
> - Abraham Silberschutz, Henry F. Korth, S. Sudarshan: "Database System Concepts", 7th Edition (Chapter 4.7, 9.8, 9.9)
>