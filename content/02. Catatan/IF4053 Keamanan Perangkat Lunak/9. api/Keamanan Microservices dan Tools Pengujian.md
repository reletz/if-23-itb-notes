---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Keamanan Microservices dan Tools Pengujian
>
> > ## Questions/Cues
> >
> > - Bagaimana mengamankan komunikasi service-to-service?
> > - Apa cara aman menyimpan secret pada microservices?
> > - Mengapa network segmentation penting untuk isolasi layanan?
> > - Mengapa monitoring inter-service dan patching rutin krusial?
> > - Tool apa saja yang dipakai untuk pengujian keamanan API?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Secure APIs and Microservices — bagian "Microservices Security Considerations & Tools for API Security Testing")
>
> > ### Pertimbangan Keamanan Microservices
> >
> > Karena layanan saling memanggil melalui jaringan, **service-to-service authentication** menjadi keharusan. Asumsi lama bahwa "lalu lintas internal pasti aman" sudah usang; setiap panggilan antar layanan harus diautentikasi. Mekanisme yang umum adalah **mTLS (mutual TLS)**, di mana kedua belah pihak (pemanggil dan yang dipanggil) saling memverifikasi sertifikat, sehingga selain terenkripsi, identitas masing-masing layanan terbukti. Pengelolaan mTLS secara manual rumit, sehingga sering didelegasikan ke **service mesh** (misalnya Istio) yang menerapkan mTLS otomatis dan transparan tanpa mengubah kode layanan.
> >
> > **Penyimpanan secret yang aman** juga kritis. Kredensial database, API key, dan kunci kriptografis tidak boleh ditanam (hardcode) di kode atau di-commit ke repository. Praktik yang dianjurkan adalah menggunakan **secret vault** (misalnya HashiCorp Vault, AWS Secrets Manager) yang menyimpan, merotasi, dan mengontrol akses secret secara terpusat, atau setidaknya **environment variable** yang diinjeksikan saat runtime. Vault menambah keuntungan rotasi otomatis dan audit terhadap siapa mengakses secret.
> >
> > **Network segmentation** mengisolasi layanan kritis ke dalam segmen jaringan terpisah sehingga, bila satu layanan terkompromikan, penyerang tidak dapat bergerak bebas (lateral movement) ke layanan sensitif lain. Contohnya, `payment-service` dan database-nya ditempatkan di segmen yang hanya dapat diakses oleh layanan tertentu. Selain itu, **monitor dan log komunikasi inter-service** untuk mendeteksi anomali—pola panggilan yang tidak biasa bisa menandakan serangan—dan lakukan **update serta patching rutin** terhadap setiap layanan beserta dependensinya, karena komponen usang dengan kerentanan yang diketahui adalah target empuk.
> >
> > ```mermaid
> > flowchart LR
> >     A["Service A"] -- "mTLS" --> B["Service B"]
> >     B -- "mTLS" --> C["Service C (kritis)"]
> >     V[("Secret Vault")] -.-> A
> >     V -.-> B
> >     V -.-> C
> >     A -.-> M[("Monitoring &amp; Log")]
> >     B -.-> M
> >     C -.-> M
> > ```
> >
> > ### Tools untuk Pengujian Keamanan API
> >
> > Untuk menguji keamanan API, tersedia beragam tool dengan fokus berbeda. **Postman** adalah alat populer untuk **pengujian dan otomasi API**—memudahkan menyusun, mengirim, dan menyimpan koleksi permintaan, serta menjalankan skrip pengujian otomatis (misalnya memverifikasi respons, menguji alur autentikasi). Postman sering menjadi langkah pertama untuk mengeksplorasi perilaku API sebelum pengujian keamanan mendalam.
> >
> > Untuk **security scanning**, **OWASP ZAP (Zed Attack Proxy)** adalah scanner open-source yang dapat memindai API dan aplikasi web untuk kerentanan umum (injection, misconfiguration) dan dapat diintegrasikan ke pipeline CI/CD untuk pengujian otomatis berkelanjutan. **Burp Suite** adalah platform pengujian keamanan yang banyak dipakai profesional; dengan kemampuan *intercepting proxy*, ia memungkinkan menangkap, memodifikasi, dan mengulang (replay) permintaan—sangat efektif untuk menemukan kerentanan kontekstual seperti BOLA yang sulit dideteksi scanner otomatis.
> >
> > Tool tambahan melengkapi cakupan: **APIsec** adalah platform yang berfokus pada pengujian keamanan API secara otomatis dan menyeluruh, kerap menyasar kerentanan logika bisnis dan otorisasi. **Insomnia** adalah klien API (mirip Postman) yang ringan untuk membuat dan menguji permintaan, termasuk API REST dan GraphQL. Dalam praktik, pendekatan terbaik menggabungkan beberapa tool: eksplorasi dengan Postman/Insomnia, scanning otomatis dengan ZAP/APIsec, dan pengujian manual mendalam dengan Burp Suite.

> [!cornell] #### Summary
>
> Keamanan **microservices** menuntut **service-to-service authentication** (mTLS, service mesh) agar setiap panggilan antar layanan terverifikasi dan terenkripsi, **penyimpanan secret yang aman** lewat vault atau environment variable (tidak hardcode), **network segmentation** untuk mengisolasi layanan kritis dan menahan lateral movement, **monitoring serta logging komunikasi inter-service** guna mendeteksi anomali, dan **update/patching rutin** untuk menutup kerentanan yang diketahui. Untuk menguji keamanan API, tersedia **Postman** (pengujian & otomasi), **OWASP ZAP** dan **Burp Suite** (security scanning & pengujian manual), serta **APIsec** dan **Insomnia** sebagai tool pelengkap.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Zero Trust untuk Microservices (DI LUAR sumber)
> Model **zero trust** ("never trust, always verify") sangat cocok untuk microservices. Alih-alih mengandalkan perimeter, setiap permintaan—termasuk internal—diautentikasi, diotorisasi, dan dienkripsi. Identitas layanan dapat diwujudkan dengan standar seperti **SPIFFE/SPIRE** yang memberikan identitas kriptografis (SVID) ke setiap workload, menjadi fondasi mTLS dan kebijakan otorisasi yang granular antar layanan.
>
> #### Lebih dalam — Mengintegrasikan Pengujian Keamanan ke CI/CD (DevSecOps)
> Pengujian tidak harus manual dan sporadis. **OWASP ZAP** dapat dijalankan headless dalam pipeline (baseline/full scan) pada setiap pull request, sementara **SAST** (analisis kode statis) dan **dependency scanning** (misalnya untuk menemukan library rentan) melengkapi DAST. Pendekatan "shift-left" ini menemukan kerentanan lebih awal, jauh lebih murah diperbaiki dibanding saat sudah produksi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Deploy aplikasi API rentan (misalnya **OWASP crAPI**), lalu jalankan **OWASP ZAP** dan **Burp Suite** terhadapnya; bandingkan jenis temuan yang ditemukan masing-masing tool.
> 2. Integrasikan secret management dengan **HashiCorp Vault** pada dua microservice, lalu rotasi sebuah secret dan amati bahwa layanan tetap berjalan tanpa redeploy kode.
> 3. Bangun pipeline GitHub Actions yang menjalankan ZAP baseline scan otomatis pada setiap push, dan dokumentasikan temuannya.
>
> #### Bacaan Lanjutan
> - Dokumentasi OWASP ZAP dan Burp Suite (Academy gratis dari PortSwigger).
> - NIST SP 800-207: *Zero Trust Architecture*.
> - Dokumentasi HashiCorp Vault dan proyek SPIFFE/SPIRE.
