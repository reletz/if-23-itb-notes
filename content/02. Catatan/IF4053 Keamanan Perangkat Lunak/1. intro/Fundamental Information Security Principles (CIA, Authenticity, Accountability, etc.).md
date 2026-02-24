---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Informasi]]

> [!cornell] Fundamental Information Security Principles
>
> > ## Questions/Cues
> >
> > - Mengapa kerahasiaan penting dalam sistem?
> > - Bagaimana integritas dijaga pada data?
> > - Kapan ketersediaan menjadi kritis?
> > - Apa perbedaan autentikasi dan otorisasi?
> > - Bagaimana akuntabilitas mendukung audit?
> > - Mengapa non‑repudiation diperlukan dalam transaksi?
> > - Contoh kegagalan keandalan dalam layanan?
> >
> > ## Reference Points
> >
> > - Information Security (Slides 2)
> > - Security Concepts (Slides 7)
>
> > ### Confidentiality (Kerahasiaan)
> >
> > Kerahasiaan merupakan sifat informasi yang **tidak boleh diungkapkan** kepada pihak yang tidak berwenang. Pada dasarnya, kerahasiaan melindungi nilai strategis, pribadi, atau komersial dari eksposur yang dapat menimbulkan kerugian. Misalnya, data medis pasien yang disimpan dalam sistem rumah sakit harus hanya dapat diakses oleh dokter yang merawat, bukan oleh staf administrasi yang tidak memiliki kebutuhan klinis. Untuk mencapai kerahasiaan, organisasi biasanya menerapkan kontrol akses berbasis peran (Role‑Based Access Control, RBAC), enkripsi data saat disimpan (data‑at‑rest) maupun saat ditransmisikan (data‑in‑transit), serta kebijakan “need‑to‑know” yang membatasi siapa yang boleh melihat informasi tertentu.
> >
> > Secara teknis, enkripsi simetris (misalnya AES) atau asimetris (misalnya RSA) mengubah data menjadi bentuk yang tidak dapat dibaca tanpa kunci yang tepat. Kunci tersebut harus dikelola dengan aman melalui infrastruktur manajemen kunci (Key Management System, KMS). Tanpa mekanisme ini, bahkan jika kontrol akses berhasil, data yang bocor tetap dapat dibaca oleh pihak yang tidak berwenang.
> >
> > Kerahasiaan juga berhubungan erat dengan **prinsip privasi** yang diatur dalam regulasi seperti GDPR (General Data Protection Regulation) atau UU ITE di Indonesia. Kegagalan menjaga kerahasiaan dapat mengakibatkan sanksi hukum, kerusakan reputasi, serta kehilangan kepercayaan pelanggan. Oleh karena itu, organisasi harus melakukan penilaian risiko secara periodik untuk mengidentifikasi aset yang paling sensitif dan memastikan kontrol yang memadai.
> >
> > ### Integrity (Integritas)
> >
> > Integritas menekankan bahwa informasi harus **akurat, lengkap, dan tidak berubah** tanpa otorisasi. Dalam konteks sistem informasi, integritas melindungi data dari modifikasi tidak sah, baik yang disengaja (misalnya serangan manipulasi) maupun tidak disengaja (misalnya kerusakan hardware). Contoh klasik adalah transaksi perbankan: saldo rekening harus tetap konsisten setelah serangkaian debit dan kredit; jika satu transaksi diubah secara ilegal, seluruh sistem keuangan dapat runtuh.
> >
> > Mekanisme yang umum dipakai untuk menjamin integritas meliputi checksum, hash kriptografis (seperti SHA‑256), dan tanda tangan digital. Hash kriptografis menghasilkan nilai tetap (digest) yang unik untuk setiap input; perubahan sekecil apa pun pada data menghasilkan digest yang berbeda, sehingga perubahan dapat dideteksi. Tanda tangan digital menambahkan lapisan otentikasi dengan meng-enkripsi hash menggunakan kunci privat pengirim; penerima dapat memverifikasi integritas dan asal usul data menggunakan kunci publik.
> >
> > Selain teknik kriptografis, kontrol prosedural seperti **audit trail** (jejak audit) dan **version control** (kontrol versi) membantu melacak perubahan data serta mengidentifikasi siapa yang melakukan perubahan. Sistem basis data biasanya menyediakan **constraint** (misalnya primary key, foreign key) dan **transaction isolation levels** untuk mencegah inkonsistensi akibat operasi bersamaan. Integritas yang terjaga meningkatkan kepercayaan pengguna dan meminimalkan risiko keputusan berbasis data yang salah.
> >
> > ### Availability (Ketersediaan)
> >
> > Ketersediaan memastikan bahwa informasi dan layanan dapat diakses **ketika dibutuhkan** oleh entitas yang berwenang. Kegagalan ketersediaan dapat terjadi karena serangan (misalnya Distributed Denial‑of‑Service, DDoS), kegagalan hardware, kesalahan konfigurasi, atau bencana alam. Misalnya, sebuah portal e‑commerce yang tidak dapat diakses selama jam belanja puncak akan kehilangan pendapatan dan merusak reputasi.
> >
> > Untuk meningkatkan ketersediaan, organisasi mengadopsi strategi **redundansi** (misalnya server klaster, load balancer), **replikasi data** (misalnya database mirroring), serta **disaster recovery** (DR) dan **business continuity planning** (BCP). Penggunaan **Service Level Agreements** (SLA) dengan penyedia layanan cloud juga menetapkan metrik uptime yang harus dipenuhi. Selain itu, monitoring real‑time (misalnya dengan Prometheus atau Zabbix) memungkinkan deteksi dini gangguan sehingga tim dapat merespons secara cepat.
> >
> > Ketersediaan tidak hanya soal infrastruktur; kebijakan **patch management** dan **maintenance windows** yang terjadwal dengan baik memastikan sistem tetap up‑to‑date tanpa mengganggu layanan kritis. Pada tingkat organisasi, penilaian **risk appetite** membantu menentukan berapa banyak sumber daya yang dialokasikan untuk menjaga ketersediaan dibandingkan dengan risiko yang dapat diterima.
> >
> > ### Authenticity (Autentikasi)
> >
> > Autentikasi adalah proses **memastikan bahwa entitas (pengguna, perangkat, atau sistem) adalah apa yang diklaimnya**. Tanpa autentikasi yang kuat, sistem tidak dapat membedakan antara pengguna sah dan penyerang yang mencoba menyamar. Contoh sederhana adalah login dengan username dan password; namun, metode ini rentan terhadap pencurian kredensial. Oleh karena itu, organisasi menggabungkan faktor-faktor autentikasi: sesuatu yang Anda tahu (password), sesuatu yang Anda miliki (token OTP, smart card), dan sesuatu yang Anda adalah (biometrik).
> >
> > Pada tingkat protokol, **TLS/SSL** menyediakan autentikasi server melalui sertifikat digital yang dikeluarkan oleh Certificate Authority (CA). Sertifikat ini mengikat kunci publik ke identitas organisasi, memungkinkan klien memverifikasi keaslian server sebelum pertukaran data. Untuk autentikasi pengguna, standar **OAuth 2.0** dan **OpenID Connect** memungkinkan delegasi otorisasi dengan token akses yang memiliki masa berlaku terbatas, mengurangi eksposur kredensial.
> >
> > Autentikasi yang tepat juga menjadi dasar bagi **kontrol akses** (authorization). Tanpa identitas yang terverifikasi, tidak mungkin menentukan hak apa yang harus diberikan. Oleh karena itu, kebijakan manajemen identitas (Identity and Access Management, IAM) menjadi komponen kritis dalam arsitektur keamanan modern.
> >
> > ### Accountability (Akuntabilitas)
> >
> > Akuntabilitas memastikan bahwa **setiap tindakan dapat ditelusuri kembali ke entitas yang melakukannya**. Ini penting untuk audit, investigasi insiden, serta penegakan kebijakan keamanan. Dalam praktiknya, akuntabilitas diwujudkan melalui **logging** yang lengkap, **audit trails**, dan **non‑repudiation** (yang akan dibahas selanjutnya). Misalnya, dalam sistem perbankan, setiap transaksi harus mencatat ID pengguna, timestamp, dan hasil verifikasi, sehingga jika terjadi penyalahgunaan, pihak berwenang dapat mengidentifikasi pelaku.
> >
> > Implementasi akuntabilitas memerlukan kebijakan retensi log yang jelas (misalnya menyimpan log selama 1‑2 tahun sesuai regulasi) serta mekanisme **integritas log** (misalnya menandatangani log dengan HMAC). Selain itu, kontrol **privilege separation** memastikan bahwa hanya pengguna dengan hak istimewa yang dapat melakukan tindakan sensitif, sehingga jejak audit menjadi lebih bermakna.
> >
> > Akuntabilitas juga mendukung **principle of least privilege**: dengan mengetahui siapa yang melakukan apa, organisasi dapat meninjau dan menurunkan hak akses yang tidak diperlukan, mengurangi permukaan serangan.
> >
> > ### Non‑Repudiation (Non‑Repudiation)
> >
> > Non‑repudiation adalah kemampuan untuk **membuktikan bahwa suatu tindakan atau komunikasi memang terjadi** dan dilakukan oleh pihak tertentu, sehingga pihak tersebut tidak dapat menyangkalnya. Dalam konteks digital, ini biasanya dicapai melalui **tanda tangan digital** dan **timestamping**. Tanda tangan digital menggunakan kunci privat pengirim untuk menandatangani hash dari pesan; penerima dapat memverifikasi tanda tangan dengan kunci publik, memastikan integritas dan asal usul.
> >
> > Contoh penerapan non‑repudiation adalah dalam kontrak elektronik (e‑contract) atau transaksi e‑commerce, di mana pembeli dan penjual memerlukan bukti sah bahwa pembayaran telah dilakukan dan barang telah dikirim. Tanpa non‑repudiation, salah satu pihak dapat mengklaim tidak pernah melakukan transaksi, menimbulkan sengketa hukum.
> >
> > Untuk meningkatkan kepercayaan, organisasi dapat menggunakan **Trusted Timestamp Authority (TSA)** yang menandai waktu tepat ketika dokumen ditandatangani, sehingga bukti tidak dapat dimanipulasi setelahnya. Selain itu, **audit log yang ditandatangani** (log signing) memastikan bahwa catatan tidak dapat diubah tanpa terdeteksi.
> >
> > ### Reliability (Keandalan)
> >
> > Keandalan mengacu pada **kemampuan sistem untuk beroperasi secara konsisten dan menghasilkan hasil yang diharapkan** dalam kondisi normal maupun gangguan sebagian. Keandalan berbeda dari ketersediaan; meskipun sistem tersedia, ia mungkin memberikan output yang salah atau tidak konsisten. Contoh keandalan yang buruk adalah sistem sensor IoT yang mengirimkan data suhu yang tidak akurat karena kalibrasi yang salah, yang dapat menyebabkan keputusan operasional yang keliru.
> >
> > Untuk mencapai keandalan, teknik **fault tolerance** seperti replikasi, checkpointing, dan graceful degradation diterapkan. Sistem basis data sering menggunakan **two‑phase commit** untuk memastikan transaksi selesai secara atomik, sementara layanan mikro (microservices) dapat menggunakan **circuit breaker pattern** untuk mencegah kegagalan berantai. Pengujian **stress testing** dan **chaos engineering** (misalnya dengan tool Gremlin) membantu mengidentifikasi titik lemah sebelum terjadi kegagalan di lingkungan produksi.
> >
> > Keandalan juga dipengaruhi oleh **quality of code**, **configuration management**, dan **continuous integration/continuous deployment (CI/CD)** yang memastikan perubahan perangkat lunak tidak memperkenalkan regresi. Dengan menggabungkan praktik‑praktik ini, organisasi dapat menyediakan layanan yang tidak hanya tersedia, tetapi juga dapat dipercaya untuk memberikan hasil yang tepat.

> [!cornell] #### Summary
>
> **Kerahasiaan, integritas, dan ketersediaan (CIA)** membentuk fondasi utama keamanan informasi, masing‑masing melindungi data dari pengungkapan tidak sah, perubahan yang tidak diotorisasi, dan gangguan layanan. **Autentikasi** memastikan identitas entitas, sementara **akuntabilitas** dan **non‑repudiation** menyediakan jejak audit yang dapat dipertanggungjawabkan, penting untuk investigasi dan kepatuhan. **Keandalan** menambah dimensi kualitas layanan dengan menjamin hasil yang konsisten dan tepat. Bersama‑sama, prinsip‑prinsip ini membentuk kerangka kerja yang komprehensif untuk melindungi aset informasi dalam konteks organisasi modern.

> [!ad-libitum]- Additional Information
>
> #### Formal Security Models
>
> Model formal memberikan kerangka matematis untuk memverifikasi kebijakan keamanan. **Model Bell‑LaPadula** (confidentiality‑focused) memperkenalkan aturan *no‑read‑up* (simple security property) dan *no‑write‑down* (∗‑property) untuk mencegah kebocoran informasi ke level yang lebih rendah. Sebaliknya, **Model Biba** berfokus pada integritas dengan aturan *no‑read‑down* dan *no‑write‑up*, memastikan entitas tidak dapat mengakses atau memodifikasi data yang kurang terpercaya. Kedua model ini dapat digabungkan dalam **Lattice‑based Access Control (LBAC)**, yang memetakan label keamanan pada objek dan subjek, memungkinkan analisis formal terhadap alur informasi.
>
> Implementasi praktis sering menggunakan **Role‑Based Access Control (RBAC)** atau **Attribute‑Based Access Control (ABAC)**, yang dapat diverifikasi terhadap model formal menggunakan teknik **model checking** (misalnya dengan alat NuSMV atau Alloy). Pendekatan ini membantu mengidentifikasi kebijakan yang kontradiktif atau celah yang tidak terdeteksi secara manual.
>
> #### Cryptographic Foundations
>
> Kriptografi adalah pilar utama untuk mewujudkan kerahasiaan, integritas, autentikasi, dan non‑repudiation. **Enkripsi simetris** (AES, ChaCha20) menawarkan kecepatan tinggi untuk melindungi data dalam penyimpanan, sementara **enkripsi asimetris** (RSA, ECC) memungkinkan pertukaran kunci aman dan tanda tangan digital. **Protokol Diffie‑Hellman** (termasuk varian Elliptic Curve Diffie‑Hellman) menyediakan mekanisme pertukaran kunci rahasia di atas saluran tidak aman.
>
> **Hash kriptografis** (SHA‑2, SHA‑3) menghasilkan nilai tetap yang unik, menjadi dasar bagi **Message Authentication Codes (MAC)** dan **HMAC**, yang menambahkan integritas dan autentikasi pada pesan. **Zero‑Knowledge Proofs** dan **Homomorphic Encryption** merupakan area riset lanjutan yang memungkinkan verifikasi data tanpa mengungkapkan isi, relevan untuk privasi dalam komputasi awan. Implementasi yang tepat memerlukan manajemen siklus hidup kunci (key lifecycle) serta pemilihan parameter kriptografis yang sesuai dengan standar NIST SP 800‑57.
>
> #### Risk Assessment and Management
>
> Penilaian risiko (risk assessment) mengidentifikasi **aset**, **ancaman**, **kerentanan**, dan **dampak** potensial, kemudian menghitung **likelihood** (probabilitas) dan **impact** (konsekuensi) untuk menghasilkan **risk score**. Metodologi populer meliputi **ISO/IEC 27005**, **NIST SP 800‑30**, dan **FAIR (Factor Analysis of Information Risk)**. Proses ini biasanya melibatkan tiga fase: *identifikasi*, *analisis*, dan *evaluasi* risiko.
>
> Setelah risiko dipetakan, organisasi dapat memilih strategi mitigasi: *accept*, *avoid*, *transfer* (misalnya asuransi cyber), atau *mitigate* (mengimplementasikan kontrol). **Control frameworks** seperti **NIST SP 800‑53** atau **ISO/IEC 27001** menyediakan katalog kontrol (technical, administrative, physical) yang dapat dipilih berdasarkan tingkat risiko. Penting juga untuk melakukan **continuous monitoring** (misalnya dengan Security Information and Event Management – SIEM) agar penilaian tetap relevan seiring perubahan lingkungan dan ancaman.
>
> #### Policy Frameworks and Standards
>
> Kebijakan keamanan (security policies) mendefinisikan aturan, prosedur, dan tanggung jawab yang mengikat seluruh organisasi. **Policy hierarchy** biasanya mencakup: *Enterprise‑wide policy*, *System‑specific policy*, *Procedural guidelines*, dan *Standards*. Contoh kebijakan penting meliputi *Acceptable Use Policy*, *Data Classification Policy*, dan *Incident Response Policy*. Standar internasional seperti **ISO/IEC 27001** menyediakan kerangka kerja untuk **Information Security Management System (ISMS)**, yang mengintegrasikan CIA, autentikasi, akuntabilitas, dan aspek lainnya ke dalam proses manajemen berkelanjutan.