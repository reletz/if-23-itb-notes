---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Konsep API dan Microservices serta Tantangan Keamanannya
>
> > ## Questions/Cues
> >
> > - Apa itu API dan apa saja tipe-tipenya?
> > - Mengapa arsitektur microservices populer dan apa benefitnya?
> > - Bagaimana hubungan antara API dan microservices?
> > - Mengapa microservices justru memperbesar attack surface?
> > - Tantangan keamanan apa saja yang khas pada API dan microservices?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Secure APIs and Microservices — bagian "Definition & Security Challenges")
>
> > ### Definisi dan Tipe API
> >
> > **API (Application Programming Interface)** adalah kontrak yang memungkinkan komunikasi antar komponen atau sistem perangkat lunak melalui **protokol yang terdefinisi** (defined protocols). Alih-alih satu aplikasi monolitik mengakses fungsi internal secara langsung, API menyediakan "antarmuka" formal: pemanggil hanya perlu tahu format permintaan dan respons, tanpa perlu memahami implementasi di baliknya. Contoh konkret: aplikasi mobile cuaca tidak menghitung prakiraan sendiri, melainkan mengirim permintaan HTTP ke API penyedia data cuaca dan menerima respons dalam format JSON.
> >
> > Secara umum API dapat dikelompokkan menjadi beberapa tipe. **Web API** adalah API yang diakses melalui jaringan menggunakan protokol HTTP/HTTPS, dengan gaya populer **REST** (resource-oriented, menggunakan verb HTTP seperti GET/POST/PUT/DELETE) dan **GraphQL** (client menentukan secara presisi data apa yang diminta dalam satu query). **Internal API** digunakan di dalam organisasi untuk komunikasi antar layanan internal yang tidak terekspos ke publik. **Public API** sengaja dibuka untuk pihak ketiga atau developer eksternal, misalnya API pembayaran atau API peta, sehingga memerlukan kontrol akses dan kuota yang ketat.
> >
> > Perbedaan tipe ini penting dari sudut pandang keamanan karena masing-masing memiliki profil risiko berbeda. **Public API** menghadapi lalu lintas dari pihak yang tidak dipercaya sehingga butuh autentikasi, rate limiting, dan validasi input yang kuat. **Internal API**, meskipun tidak terekspos langsung, tetap berisiko bila penyerang berhasil masuk ke jaringan (asumsi "jaringan internal = aman" justru berbahaya). Karena itu prinsip **zero trust**—tidak mempercayai permintaan hanya karena asalnya internal—semakin relevan.
> >
> > ### Microservices dan Benefitnya
> >
> > **Microservices** adalah gaya arsitektur di mana sebuah aplikasi dibangun sebagai kumpulan **layanan yang independen, modular, dan saling berkomunikasi melalui API**. Berbeda dengan arsitektur **monolit** di mana seluruh fungsi (autentikasi, katalog, pembayaran, notifikasi) terikat dalam satu basis kode dan satu proses, microservices memecahnya menjadi layanan-layanan kecil yang masing-masing memiliki tanggung jawab tunggal. Sebagai contoh, sebuah platform e-commerce dapat memiliki layanan terpisah untuk `user-service`, `order-service`, `payment-service`, dan `inventory-service`, yang berkoordinasi lewat panggilan API.
> >
> > Benefit utama arsitektur ini meliputi: **scalability** (layanan yang padat beban, misalnya `payment-service` saat flash sale, dapat di-scale sendiri tanpa menggandakan seluruh aplikasi); **agility** (tim kecil dapat mengembangkan fitur secara paralel dan cepat); **independent deployment** (memperbarui `order-service` tidak mengharuskan men-deploy ulang seluruh sistem, mengurangi risiko dan downtime); serta **technology diversity** (tiap layanan bebas memilih bahasa dan database yang paling cocok, misalnya Go untuk layanan berperforma tinggi dan Python untuk layanan analitik).
> >
> > Namun fleksibilitas ini datang dengan konsekuensi. Komunikasi yang dulunya berupa pemanggilan fungsi in-memory di dalam monolit kini berubah menjadi panggilan jaringan (network call) yang melewati banyak endpoint. Setiap titik komunikasi ini adalah potensi vektor serangan baru, dan kompleksitas pengelolaannya jauh lebih tinggi dibanding monolit.
> >
> > ```mermaid
> > flowchart TD
> >     U["Client / Mobile App"] --> GW["API Gateway"]
> >     GW --> US["user-service"]
> >     GW --> OS["order-service"]
> >     GW --> PS["payment-service"]
> >     OS --> IS["inventory-service"]
> >     OS --> PS
> >     US --> DB1[("User DB")]
> >     OS --> DB2[("Order DB")]
> > ```
> >
> > ### Security Note: Attack Surface yang Membesar
> >
> > Catatan keamanan yang ditekankan adalah: **semakin banyak endpoint dan inter-service call, semakin besar attack surface** sehingga keamanan menjadi kritis. Pada monolit, hanya ada beberapa titik masuk yang perlu dijaga. Pada microservices, setiap layanan mengekspos API-nya sendiri, dan layanan-layanan saling memanggil satu sama lain. Jika sebuah sistem memiliki puluhan layanan, jumlah jalur komunikasi yang harus diamankan tumbuh secara dramatis. Satu endpoint yang lupa diberi autentikasi sudah cukup menjadi pintu masuk penyerang.
> >
> > Selain bertambahnya jumlah titik, sifat komunikasi **inter-service** menambah risiko. Data sensitif seperti token, nomor kartu, atau data pribadi sering melintas antar layanan. Bila kanal komunikasi ini tidak dienkripsi atau tidak diautentikasi, penyerang yang berhasil menyusup ke dalam jaringan dapat menyadap (sniffing) atau memalsukan (spoofing) panggilan antar layanan.
> >
> > ### Tantangan Keamanan pada API dan Microservices
> >
> > Beberapa tantangan keamanan khas yang muncul antara lain: **(1) Increased attack surface**—banyaknya endpoint membuat lebih banyak titik yang harus dilindungi dan dipantau, dan satu kelalaian kecil bisa berakibat fatal. **(2) Distributed complexity**—arsitektur terdistribusi membuat penelusuran (tracing) sebuah permintaan yang melewati banyak layanan menjadi rumit, sehingga mendeteksi dan menganalisis insiden lebih sulit dibanding sistem terpusat.
> >
> > **(3) Inconsistent security controls**—setiap layanan mungkin dikembangkan oleh tim berbeda dengan standar berbeda, sehingga kontrol keamanan (validasi input, autentikasi, logging) tidak seragam. Layanan yang paling lemah menentukan keamanan keseluruhan sistem (prinsip *weakest link*). **(4) Data exposure dalam komunikasi inter-service**—data yang melintas antar layanan berisiko bocor bila tidak dienkripsi (misalnya tidak menggunakan TLS internal) atau bila sebuah layanan mengembalikan lebih banyak data dari yang dibutuhkan pemanggilnya.
> >
> > Memahami tantangan-tantangan ini adalah fondasi sebelum membahas kerentanan spesifik (OWASP API Top 10) dan praktik mitigasinya. Intinya: kemudahan dan kelincahan microservices harus diimbangi dengan strategi keamanan yang konsisten, terpusat di titik-titik kunci seperti API gateway, namun tetap diberlakukan secara mendalam (defense in depth) hingga ke tiap layanan.

> [!cornell] #### Summary
>
> **API** adalah antarmuka yang memungkinkan komunikasi antar komponen perangkat lunak melalui protokol terdefinisi, dengan tipe utama Web API (REST, GraphQL), Internal API, dan Public API. **Microservices** memecah aplikasi menjadi layanan-layanan independen yang berkomunikasi via API, menawarkan **scalability, agility, independent deployment, dan technology diversity**. Namun banyaknya endpoint dan inter-service call secara signifikan **memperbesar attack surface**, menjadikan keamanan sebagai aspek kritis. Tantangan keamanan utamanya meliputi attack surface yang membesar, kompleksitas arsitektur terdistribusi, kontrol keamanan yang tidak konsisten antar layanan, serta risiko data exposure pada komunikasi antar layanan.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Pola Komunikasi Antar Microservices (DI LUAR sumber)
> Komunikasi antar layanan tidak hanya synchronous (REST/gRPC request-response), tetapi juga sering **asynchronous** melalui message broker seperti **Kafka** atau **RabbitMQ**. Pola async (event-driven) memperbaiki ketahanan (resiliensi) karena layanan tidak saling menunggu, namun memunculkan tantangan keamanan baru: pesan dalam antrian (queue) harus dienkripsi, akses ke topic harus dikontrol, dan event yang berisi data sensitif dapat tersimpan lama di broker. **gRPC** yang berbasis HTTP/2 dan Protobuf juga populer untuk komunikasi internal karena efisien, dan secara native mendukung mTLS untuk autentikasi mutual.
>
> #### Lebih dalam — Service Mesh sebagai Lapisan Keamanan
> **Service mesh** (misalnya Istio atau Linkerd) menyisipkan proxy "sidecar" di samping setiap layanan untuk menangani komunikasi jaringan secara transparan. Mesh dapat menerapkan **mTLS otomatis** antar layanan, kebijakan otorisasi (siapa boleh memanggil siapa), serta observability (metrics, tracing, logging) tanpa mengubah kode aplikasi. Ini mengatasi masalah *inconsistent security controls* karena kontrol diberlakukan secara seragam di lapisan infrastruktur.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun dua microservice sederhana (misalnya `auth-service` dan `profile-service`) dengan Docker Compose, lalu ukur dan dokumentasikan jumlah endpoint serta jalur komunikasi yang harus diamankan dibanding versi monolitnya.
> 2. Aktifkan mTLS antar kedua layanan menggunakan sertifikat self-signed, dan gunakan Wireshark untuk membuktikan bahwa lalu lintas inter-service kini terenkripsi.
> 3. Petakan attack surface kedua arsitektur (monolit vs microservices) dalam sebuah diagram threat model, identifikasi titik mana yang paling rawan.
>
> #### Bacaan Lanjutan
> - Sam Newman, *Building Microservices* (O'Reilly) — bab tentang security.
> - NIST SP 800-204: *Security Strategies for Microservices-based Application Systems*.
> - Dokumentasi Istio: konsep Security (mTLS, Authorization Policy).
