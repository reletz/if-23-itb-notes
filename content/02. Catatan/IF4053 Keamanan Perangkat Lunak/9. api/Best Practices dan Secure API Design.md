---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Best Practices dan Secure API Design
>
> > ## Questions/Cues
> >
> > - Apa best practice utama untuk mengamankan API?
> > - Bagaimana perbedaan peran OAuth, JWT, dan API key?
> > - Apa prinsip-prinsip desain API yang aman?
> > - Mengapa fail-safe defaults (deny-by-default) penting?
> > - Apa peran API gateway dalam penegakan keamanan terpusat?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Secure APIs and Microservices — bagian "Best Practices, Secure API Design Principles & API Gateway")
>
> > ### Best Practices Keamanan API
> >
> > Praktik keamanan API yang baik dimulai dari **strong authentication**—memastikan identitas pemanggil benar-benar terverifikasi. Mekanisme umum meliputi **OAuth** (kerangka delegasi otorisasi, cocok untuk akses pihak ketiga tanpa berbagi kredensial langsung), **JWT (JSON Web Token)** (token mandiri yang membawa klaim identitas dan ditandatangani secara kriptografis sehingga dapat diverifikasi tanpa query database), serta **API key** (kunci sederhana untuk mengidentifikasi aplikasi pemanggil, cocok untuk kontrol kuota namun lemah bila berdiri sendiri). Pemilihan mekanisme bergantung konteks: OAuth/JWT untuk akses pengguna, API key untuk identifikasi aplikasi.
> >
> > Setelah autentikasi, **authorization harus diperiksa untuk setiap permintaan** (enforce authorization checks for every request). Ini penting karena autentikasi hanya menjawab "siapa kamu", sedangkan otorisasi menjawab "apakah kamu boleh melakukan ini terhadap objek ini". Pengecekan otorisasi tidak boleh hanya dilakukan sekali saat login, melainkan pada setiap akses sumber daya untuk mencegah BOLA dan broken function level authorization.
> >
> > Tiga praktik berikutnya melengkapi pertahanan: **validate dan sanitize semua input** untuk mencegah injection dan data malformasi—anggap semua input dari klien tidak tepercaya; **implement rate limiting dan throttling** untuk membatasi jumlah permintaan per klien dalam rentang waktu tertentu, sehingga menahan brute-force dan DoS; serta **gunakan HTTPS** untuk mengenkripsi data in transit, mencegah penyadapan (sniffing) dan serangan man-in-the-middle terhadap token maupun data sensitif yang melintas di jaringan.
> >
> > ### Prinsip Desain API yang Aman
> >
> > Desain yang aman mengakar pada beberapa prinsip fundamental. **Least privilege** berarti memberikan akses seminimal mungkin—sebuah klien atau layanan hanya boleh menyentuh sumber daya dan operasi yang benar-benar diperlukan. Contoh: layanan pelaporan yang hanya membaca data cukup diberi token dengan scope `read-only`, bukan akses penuh. Ini membatasi dampak (blast radius) bila kredensial bocor.
> >
> > **Fail-safe defaults** menerapkan prinsip **deny-by-default, allow-by-exception**: bila tidak ada kebijakan yang secara eksplisit mengizinkan suatu permintaan, maka permintaan ditolak. Pendekatan ini jauh lebih aman daripada *allow-by-default* di mana lupa menambahkan aturan justru membuka celah. **API versioning** (misalnya `/v1/`, `/v2/`) memungkinkan pengelolaan perubahan secara aman: perubahan yang memutus kompatibilitas dapat diisolasi ke versi baru tanpa memaksa migrasi mendadak, sekaligus mempermudah penonaktifan versi lama yang rentan.
> >
> > Dua prinsip terakhir: **limit data exposure**—API hanya mengembalikan informasi yang benar-benar diperlukan oleh pemanggil, menghindari pengiriman field sensitif (mencegah *excessive data exposure*); dan **log & monitor semua aktivitas API**—mencatat siapa mengakses apa, kapan, dan dengan hasil apa, sehingga aktivitas anomali dapat dideteksi dini dan tersedia jejak audit untuk investigasi insiden.
> >
> > ### API Gateway dan Keamanan
> >
> > **API gateway** adalah komponen yang menjadi pintu masuk tunggal (single entry point) untuk seluruh permintaan menuju layanan-layanan di belakangnya. Manfaat keamanannya adalah **sentralisasi penegakan (enforcement)**: alih-alih setiap layanan mengimplementasikan autentikasi, otorisasi, dan validasi input sendiri-sendiri (yang menyebabkan *inconsistent controls*), gateway menangani fungsi-fungsi ini secara terpusat dan konsisten sebelum permintaan diteruskan ke layanan internal.
> >
> > Gateway menangani **authentication** (memverifikasi token/kredensial), **authorization** (memeriksa hak akses), dan **input validation** di satu tempat. Selain itu, gateway adalah titik ideal untuk menerapkan **rate limiting** dan **logging**—karena semua lalu lintas melewatinya, pembatasan kuota dan pencatatan dapat diberlakukan secara seragam tanpa menduplikasi logika di tiap layanan. Hal ini juga **menyederhanakan monitoring dan threat detection** lintas layanan, karena gateway memberikan pandangan terpusat atas seluruh lalu lintas masuk.
> >
> > Meski demikian, gateway bukan solusi tunggal. Prinsip **defense in depth** tetap berlaku: layanan internal harus tetap menerapkan kontrol (misalnya tidak mempercayai permintaan hanya karena datang dari belakang gateway), karena penyerang yang berhasil masuk ke jaringan internal dapat melewati gateway. Gateway menyederhanakan dan menyeragamkan, tetapi tidak menggantikan keamanan berlapis di tiap layanan.
> >
> > ```mermaid
> > flowchart LR
> >     C["Client"] --> GW["API Gateway<br/>(AuthN/AuthZ, Input Validation,<br/>Rate Limiting, Logging)"]
> >     GW --> S1["Service A"]
> >     GW --> S2["Service B"]
> >     GW --> S3["Service C"]
> >     GW -.-> L[("Audit Log &amp; Monitoring")]
> > ```

> [!cornell] #### Summary
>
> Mengamankan API berpijak pada **best practices**: autentikasi kuat (OAuth, JWT, API key), pengecekan **authorization untuk setiap permintaan**, validasi dan sanitasi seluruh input, rate limiting & throttling, serta HTTPS untuk enkripsi data in transit. Pada level desain, prinsip kunci meliputi **least privilege**, **fail-safe defaults** (deny-by-default), **API versioning**, pembatasan data exposure, serta logging dan monitoring menyeluruh. **API gateway** memusatkan penegakan keamanan—autentikasi, otorisasi, validasi, rate limiting, dan logging—sehingga kontrol menjadi konsisten dan pemantauan ancaman lebih sederhana, namun tetap harus dilengkapi defense in depth di tiap layanan.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — OAuth 2.0 vs JWT vs API Key (DI LUAR sumber)
> Ketiganya sering disalahpahami sebagai hal yang sama. **OAuth 2.0** adalah *framework otorisasi*—ia mendefinisikan alur (flow) bagaimana sebuah aplikasi memperoleh akses atas nama pengguna (misalnya Authorization Code flow dengan PKCE untuk aplikasi publik). **JWT** adalah *format token* yang sering dipakai sebagai access token dalam OAuth; ia berisi header, payload (klaim), dan signature. Risiko JWT: jangan menerima algoritma `none`, selalu verifikasi signature, dan jangan menaruh data sensitif di payload karena hanya di-encode (bukan dienkripsi). **API key** hanya mengidentifikasi aplikasi, tidak membawa konteks pengguna, dan sebaiknya dikombinasikan dengan mekanisme lain.
>
> #### Lebih dalam — Pola Rate Limiting
> Algoritma umum mencakup **token bucket** (mengizinkan burst hingga kapasitas bucket lalu mengisi ulang dengan laju tetap), **leaky bucket**, dan **sliding window**. Rate limiting dapat berbasis IP, API key, atau identitas pengguna. Untuk arsitektur terdistribusi, penghitung rate sering disimpan di store terpusat seperti **Redis** agar konsisten lintas instance gateway.
>
> #### Proyek Eksplorasi Mandiri
> 1. Konfigurasi sebuah API gateway (misalnya **Kong**, **Tyk**, atau **NGINX**) untuk menerapkan autentikasi JWT, rate limiting, dan logging terpusat di depan dua layanan dummy.
> 2. Implementasikan OAuth 2.0 Authorization Code flow dengan PKCE pada aplikasi contoh, dan analisis token yang dihasilkan menggunakan jwt.io.
> 3. Buat eksperimen yang membuktikan deny-by-default: hapus satu aturan otorisasi dan verifikasi bahwa permintaan ditolak alih-alih lolos.
>
> #### Bacaan Lanjutan
> - RFC 6749 (OAuth 2.0) dan RFC 7519 (JWT).
> - OWASP API Security Top 10 — bagian rekomendasi mitigasi.
> - Dokumentasi Kong/Tyk Gateway tentang plugin keamanan (auth, rate limiting).
