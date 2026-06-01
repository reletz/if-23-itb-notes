---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Insecure Deserialization and Cryptographic Storage Weaknesses
>
> > ## Questions/Cues
> >
> > - Bagaimana deserialisasi dapat dimanfaatkan penyerang?
> > - Apa konsekuensi eksekusi kode jarak jauh?
> > - Mengapa tanda tangan digital penting pada objek?
> > - Bagaimana cara mengidentifikasi data sensitif?
> > - Apa risiko penyimpanan kriptografi yang lemah?
> > - Langkah apa untuk membatasi tipe deserialisasi?
> > - Bagaimana memantau aktivitas deserialisasi?
> >
> > ## Reference Points
> >
> > - Web Application Vulnerability IF4053 – Software Security (Halaman 46‑52)
> > - OWASP Top 10 2010 – A8 Insecure Cryptographic Storage (Halaman 51‑52)
> > - OWASP Top 10 2010 – A8 Insecure Deserialization (Halaman 46‑48)
>
> > ### Insecure Deserialization
> >
> > Insecure deserialization terjadi ketika sebuah aplikasi atau API menerima objek yang telah diserialisasi (diubah menjadi urutan byte atau teks) dari sumber yang tidak dapat dipercaya, kemudian mendeserialisasikannya tanpa melakukan validasi yang memadai. Proses deserialisasi pada dasarnya “membaca kembali” struktur data ke dalam memori, sehingga jika penyerang dapat memodifikasi representasi serialisasi, ia dapat mengubah alur logika aplikasi. Misalnya, dalam bahasa Java, objek yang mengimplementasikan antarmuka `Serializable` dapat berisi metode `readObject()` yang dipanggil selama deserialisasi; penyerang dapat menyisipkan kode berbahaya dalam bidang (field) yang kemudian dieksekusi ketika objek tersebut di‑reconstitute.
> >
> > Penyebab utama kerentanan ini meliputi penggunaan protokol RPC/IPC, pertukaran data melalui HTTP cookies, parameter formulir, atau pesan pada message broker. Karena banyak framework modern (misalnya Spring Boot, .NET, atau PHP) secara default menyediakan mekanisme serialisasi untuk mempermudah pertukaran state, developer sering kali menganggap proses ini aman tanpa meninjau risiko. Akibatnya, objek‑objek yang tampak tidak berbahaya dapat menjadi “pintu belakang” (backdoor) untuk eksekusi kode arbitrer, eskalasi hak istimewa, atau manipulasi kontrol akses.
> >
> > Dampak paling serius adalah **Remote Code Execution (RCE)**, di mana penyerang dapat menjalankan perintah sistem pada server target dengan hak yang sama seperti proses aplikasi. Selain itu, serangan deserialisasi dapat mengubah data penting (misalnya, mengubah peran pengguna) sehingga menghasilkan **Privilege Escalation** atau **Access‑Control Bypass**. Karena serangan ini biasanya tidak memerlukan interaksi pengguna, mereka dapat diotomatisasi dengan alat seperti *ysoserial* atau *Serial Killer*, meningkatkan skala ancaman.
> >
> > Secara konseptual, kerentanan ini menyoroti pentingnya memisahkan **data** (yang boleh di‑deserialisasi) dari **kode** (yang tidak boleh dipengaruhi oleh data). Pendekatan “trust no one” menjadi prinsip dasar: setiap objek yang datang dari luar harus diperlakukan sebagai tidak dapat dipercaya sampai terbukti aman.
> >
> > ### Contoh Insecure Deserialization
> >
> > Pada slide 47 terdapat dua skenario nyata. Skenario pertama melibatkan aplikasi React yang berkomunikasi dengan microservice Spring Boot. Tim pengembang menyimpan “state” pengguna dalam objek Java yang diserialisasi dan mengirimkannya pada setiap permintaan. Penyerang menemukan tanda tangan objek “R00” dan menggunakan alat *Java Serial Killer* untuk menyisipkan payload yang memicu eksekusi kode pada server. Skenario kedua memperlihatkan forum PHP yang menyimpan “super‑cookie” berisi ID pengguna, peran, dan hash password dalam format serialisasi PHP. Dengan memodifikasi string serialisasi (misalnya mengubah peran menjadi `admin`), penyerang memperoleh hak administratif tanpa harus menebak password. Kedua contoh menegaskan bahwa **format serialisasi yang dapat dibaca manusia** (seperti JSON, XML, atau PHP serialize) memudahkan manipulasi jika tidak ada integritas kriptografis.
> >
> > Contoh-contoh ini juga menyoroti **lingkungan runtime** yang menyediakan kelas‑kelas berbahaya (misalnya `java.lang.Runtime.exec`). Jika aplikasi memuat kelas tersebut selama deserialisasi, penyerang dapat memanggil metode yang mengeksekusi perintah sistem. Oleh karena itu, penting untuk meninjau *classpath* dan menghapus kelas yang tidak diperlukan dari lingkungan produksi.
> >
> > ### Mitigasi Insecure Deserialization
> >
> > Pendekatan paling aman adalah **menghindari** menerima objek yang diserialisasi dari sumber yang tidak tepercaya. Jika hal ini tidak memungkinkan (misalnya karena kebutuhan interoperabilitas), beberapa lapisan pertahanan harus diterapkan. Pertama, **tanda tangan digital** atau **HMAC** dapat diterapkan pada setiap payload serialisasi; server memverifikasi integritas sebelum mendeserialisasi, sehingga perubahan oleh penyerang akan terdeteksi. Kedua, **pembatasan tipe** (type constraints) harus diterapkan: hanya kelas yang secara eksplisit di‑whitelist yang diizinkan untuk dideserialisasi. Implementasi ini dapat menggunakan mekanisme seperti `ObjectInputFilter` di Java 9+ atau library serupa di bahasa lain.
> >
> > Ketiga, **isolasi lingkungan**: proses yang melakukan deserialisasi dijalankan dengan hak istimewa minimal (low‑privilege container) sehingga bahkan jika kode berbahaya dieksekusi, dampaknya terbatas. Keempat, **logging dan monitoring**: setiap kegagalan deserialisasi atau tipe yang tidak diharapkan harus dicatat dan dipantau secara real‑time, memungkinkan tim keamanan mendeteksi upaya serangan. Kelima, **pembatasan jaringan**: batasi koneksi masuk/keluar dari layanan yang melakukan deserialisasi, sehingga vektor serangan jaringan dapat diminimalisir. Kombinasi teknik‑teknik ini membentuk pertahanan berlapis (defense‑in‑depth) yang efektif.
> >
> > ### Insecure Cryptographic Storage
> >
> > Insecure cryptographic storage merujuk pada kegagalan dalam melindungi data sensitif (seperti nomor kartu kredit, rekam medis, atau kredensial) dengan teknik kriptografi yang memadai di setiap tempat penyimpanan: basis data, file, log, backup, atau cache. Masalah utama biasanya muncul karena **kurangnya identifikasi data sensitif**, **tidak konsisten dalam penggunaan enkripsi**, atau **pemilihan algoritma yang usang** (misalnya MD5, SHA‑1, atau enkripsi simetris dengan kunci statis). Tanpa enkripsi yang kuat, data dapat dibaca langsung oleh siapa saja yang memperoleh akses ke media penyimpanan, baik melalui pencurian fisik, kebocoran backup, atau eksploitasi kerentanan lain.
> >
> > Dampak bisnisnya signifikan: kebocoran data pribadi dapat menyebabkan **penalti regulasi** (misalnya GDPR atau PCI‑DSS), kerusakan reputasi, biaya forensik, serta potensi litigasi. Selain itu, data yang bocor dapat digunakan untuk **serangan lanjutan** seperti credential stuffing atau phishing yang lebih terpersonalisasi. Oleh karena itu, organisasi harus menganggap enkripsi data at‑rest sebagai komponen wajib dalam kebijakan keamanan informasi.
> >
> > Praktik yang buruk meliputi penyimpanan **hash** yang tidak “salted” untuk password, penggunaan **kunci hard‑coded** dalam kode sumber, atau penyimpanan **kunci enkripsi** di lokasi yang sama dengan data terenkripsi. Semua ini memudahkan penyerang yang berhasil mengakses satu komponen untuk mendekripsi seluruh kumpulan data.
> >
> > ### Contoh Penyimpanan Kriptografi Tidak Aman
> >
> > Slide 52 menampilkan ilustrasi di mana data sensitif disimpan dalam file konfigurasi tanpa enkripsi, atau dalam basis data dengan kolom yang hanya di‑hash menggunakan algoritma MD5. Contoh lain yang umum adalah **“super‑cookie”** pada PHP (seperti pada skenario deserialisasi) yang menyimpan hash password dalam bentuk teks biasa. Ketika backup atau log di‑export, data tersebut ikut terbawa tanpa perlindungan, meningkatkan permukaan serangan.
> >
> > Pada banyak kasus, pengembang mengandalkan **“enkripsi ringan”** seperti Base64 atau ROT13, yang sebenarnya bukan enkripsi melainkan encoding. Karena teknik ini mudah dibalik, data yang tampak “terenkripsi” tetap dapat dibaca oleh penyerang yang mengetahui pola encoding.
> >
> > ### Mitigasi Penyimpanan Kriptografi
> >
> > Langkah pertama adalah **inventarisasi data**: identifikasi semua lokasi penyimpanan (DB, file, cache, log, backup) dan klasifikasikan data berdasarkan sensitivitas. Selanjutnya, gunakan **enkripsi simetris yang kuat** (AES‑256 GCM) dengan **kunci yang dikelola secara terpusat** melalui layanan KMS (Key Management Service) seperti AWS KMS atau HashiCorp Vault. Kunci harus diputar secara periodik (key rotation) dan tidak pernah disimpan dalam kode sumber atau repositori.
> >
> > Untuk data yang bersifat **password**, gunakan fungsi hash adaptif seperti **bcrypt**, **scrypt**, atau **Argon2**, yang secara otomatis menambahkan salt dan menyesuaikan work factor. Hindari hash satu arah yang cepat (MD5, SHA‑1) karena rentan terhadap serangan brute‑force.
> >
> > Implementasikan **kontrol akses berbasis peran** (RBAC) pada layanan KMS sehingga hanya komponen yang memerlukan kunci yang dapat mengaksesnya. Selain itu, aktifkan **audit logging** pada semua operasi enkripsi/dekripsi untuk mendeteksi penggunaan kunci yang mencurigakan. Terakhir, pastikan **enkripsi end‑to‑end** pada saluran penyimpanan (misalnya, enkripsi volume disk) sehingga data tetap terlindungi bahkan jika lapisan aplikasi terkompromi.

> [!cornell] #### Summary
>
> **Insecure deserialization** memungkinkan penyerang memodifikasi objek yang dikirimkan, yang dapat berujung pada **eksekusi kode jarak jauh** atau **eskalasi hak** bila tidak ada validasi tipe dan integritas. **Penyimpanan kriptografi yang tidak aman** memperlihatkan risiko kebocoran data sensitif karena penggunaan algoritma lemah, kunci hard‑coded, atau kurangnya enkripsi konsisten di semua media penyimpanan. Kedua kerentanan ini dapat diminimalisir dengan **tanda tangan digital**, **pembatasan tipe**, **isolasi proses**, serta **enkripsi kuat dengan manajemen kunci terpusat**. Implementasi pertahanan berlapis serta inventarisasi data menjadi kunci untuk melindungi aplikasi dari ancaman ini.

> [!ad-libitum]- Additional Information
>
> #### Formal Threat Modeling of Deserialization
>
> Pada tingkat lanjutan, deserialization dapat dimodelkan menggunakan **STRIDE** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). *Tampering* menjadi vektor utama karena penyerang mengubah payload serialized. Model ini membantu tim keamanan mengidentifikasi **asset** (objek yang dideserialisasi), **entry point** (API, cookie, message queue), dan **mitigasi** (whitelisting kelas, HMAC). Analisis ini juga menghubungkan deserialization dengan **privilege escalation** melalui *gadget chains*—rangkaian kelas yang secara tidak sengaja menyediakan metode berbahaya ketika dipanggil selama proses deserialisasi.
>
> Untuk memformalkan gadget chain, peneliti biasanya menggunakan **static analysis** pada classpath untuk menemukan metode `readObject`, `readResolve`, atau `invoke` yang dapat mengeksekusi perintah sistem. Alat seperti **Marshalsec** atau **ysoserial** secara otomatis menghasilkan payload yang memanfaatkan gadget tersebut. Dengan memahami struktur gadget, tim dapat **prune** kelas berbahaya dari deployment atau menambahkan *classloader* yang menolak pemuatan kelas tidak dikenal.
>
> #### Cryptographic Algorithm Selection and Key Management
>
> Pilihan algoritma kriptografi tidak hanya soal **panjang kunci**, tetapi juga **mode operasi** dan **parameter**. AES‑256 dalam mode **GCM** (Galois/Counter Mode) menyediakan **confidentiality** dan **integrity** sekaligus, menghindari kebutuhan MAC terpisah. Sebaliknya, mode ECB harus dihindari karena mengungkap pola data.
>
> Manajemen kunci (Key Management) melibatkan **generation**, **storage**, **rotation**, dan **destruction**. Standar NIST SP 800‑57 merekomendasikan rotasi kunci setiap 2‑3 tahun untuk data berisiko tinggi, serta penggunaan **Hardware Security Modules (HSM)** untuk penyimpanan kunci yang tidak dapat diakses oleh proses aplikasi. Implementasi KMS modern (AWS KMS, Azure Key Vault, Google Cloud KMS) menyediakan API yang memungkinkan enkripsi/dekripsi tanpa mengungkapkan kunci ke memori aplikasi, mengurangi permukaan serangan.
>
> Selain itu, **key derivation functions (KDF)** seperti HKDF atau PBKDF2 harus dipakai ketika kunci dihasilkan dari password atau secret yang memiliki entropi rendah. Penggunaan **salt** dan **iterasi** meningkatkan resistensi terhadap serangan brute‑force.
>
> #### Automated Scanning and Dependency Management for Deserialization Vulnerabilities
>
> Karena banyak kerentanan deserialization berasal dari **komponen pihak ketiga**, otomatisasi menjadi penting. Alat **OWASP Dependency‑Check**, **Snyk**, atau **GitHub Dependabot** dapat memindai *dependency tree* untuk versi library yang diketahui rentan (misalnya Apache Commons Collections < 4.4). Untuk Java, plugin **Maven Enforcer** dapat menolak penggunaan versi yang tidak aman pada saat build.
>
> Di sisi runtime, **dynamic instrumentation** dengan **BTrace** atau **AspectJ** memungkinkan pemantauan panggilan ke `ObjectInputStream.readObject()` dan memblokir deserialisasi yang tidak di‑whitelist. Integrasi dengan **CI/CD pipeline** (Jenkins, GitLab CI) memastikan setiap commit diuji dengan **fuzzing** (misalnya **Jazzer** untuk Java) yang menghasilkan payload acak untuk menguji ketahanan deserialization.
>
> #### Performance vs Security Trade‑offs in Encryption at Rest
>
> Enkripsi data at‑rest menambah **overhead CPU** dan **latensi I/O**, terutama pada sistem dengan volume transaksi tinggi. Untuk menyeimbangkan, arsitektur dapat menggunakan **enkripsi berbasis hardware** (AES‑NI pada CPU) atau **