---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Security Control dan Defense in Depth
>
> > ## Questions/Cues
> >
> > - Apa lima fungsi utama dari sebuah security control?
> > - Bagaimana security control mengurangi attack surface dan risk level?
> > - Mengapa countermeasure bisa bersifat non‑IT, dan apa contohnya?
> > - Apa prinsip Defense in Depth dan mengapa berlapis lebih baik?
> > - Mengapa kita sebaiknya tidak "reinventing the wheel" dalam keamanan?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W08 Software Security Design — bagian "Security Control & Defense in Depth")
>
> > ### Security Control / Countermeasure
> >
> > Sebuah **security control** (atau **countermeasure**) adalah mekanisme yang diterapkan untuk menangani ancaman terhadap sistem. Secara konseptual, sebuah control dapat menjalankan satu atau lebih dari lima fungsi yang berbeda. Pertama, **prevent**—mencegah serangan dengan memblokirnya atau menutup vulnerability sehingga serangan tidak mungkin terjadi (misalnya menambal sebuah bug). Kedua, **deter**—membuat serangan lebih sulit meskipun tidak mustahil, sehingga penyerang yang kurang gigih akan menyerah (misalnya menampilkan peringatan hukum). Ketiga, **deflect**—mengalihkan penyerang dengan membuat target lain lebih menarik atau target ini kurang menarik (misalnya honeypot).
> >
> > Dua fungsi terakhir berfokus pada respons. Keempat, **detect**—mendeteksi serangan, baik saat sedang berlangsung maupun beberapa waktu setelahnya (misalnya IDS atau analisis log). Kelima, **recover**—memulihkan sistem dari dampak serangan (misalnya restore dari backup). Penting dipahami bahwa tidak ada satu control pun yang sempurna; oleh karena itu kombinasi dari beberapa fungsi inilah yang memberikan perlindungan menyeluruh, mulai dari pencegahan hingga pemulihan.
> >
> > Tujuan akhir dari penerapan security control adalah mengurangi dua hal: **attack surface** (total titik di mana penyerang dapat mencoba masuk atau mengekstrak data) dan **risk level** (kombinasi probabilitas dan dampak serangan). Dengan menutup port yang tidak perlu, menonaktifkan fitur yang tidak digunakan, dan memperketat konfigurasi, sebuah organisasi memperkecil attack surface‑nya. Dengan menerapkan kontrol detektif dan pemulihan, organisasi menurunkan dampak ketika serangan tetap berhasil menembus, sehingga menurunkan risk level secara keseluruhan.
> >
> > Yang sering terlupakan adalah bahwa **countermeasure tidak harus bersifat IT**. Contoh kontrol non‑IT meliputi **physical security** (keamanan fisik gedung, misalnya kunci dan kartu akses), **screening of personnel** (penyaringan latar belakang karyawan), **legal framework** (kerangka hukum untuk menjerakan kriminal), dan **training employee** (pelatihan kesadaran keamanan bagi karyawan). Meskipun dalam mata kuliah ini fokus utama adalah kontrol teknis, kontrol non‑IT ini sama pentingnya—bahkan sering kali menjadi garis pertahanan paling efektif terhadap social engineering yang tidak dapat dicegah oleh teknologi.
> >
> > ### Defense in Depth
> >
> > **Defense in Depth** adalah strategi yang memanfaatkan **beberapa lapisan kontrol keamanan** (multiple security measures in various layers) untuk melindungi aset. Filosofinya sederhana namun kuat: **jika satu lapisan gagal, masih ada lapisan lain** yang menahan serangan. Pendekatan ini mengakui kenyataan bahwa tidak ada kontrol tunggal yang sempurna—setiap mekanisme memiliki kemungkinan untuk gagal, ditembus, atau dikonfigurasi salah. Dengan menumpuk pertahanan, kegagalan satu lapisan tidak otomatis berarti kompromi total terhadap sistem.
> >
> > Contoh klasik yang diberikan adalah proses **login berlapis**. Lapisan pertama adalah mekanisme **login** itu sendiri. Di atasnya ditambahkan persyaratan **strong password** untuk melawan tebakan dan brute‑force. Lapisan berikutnya adalah **OTP** (One‑Time Password) sebagai faktor kedua, sehingga meskipun password bocor, penyerang masih membutuhkan kode sekali pakai. Terakhir, **audit trail** mencatat setiap upaya akses, sehingga aktivitas mencurigakan dapat dideteksi dan diselidiki. Empat lapisan ini bekerja bersama: kegagalan pada satu lapisan ditangkap oleh lapisan berikutnya.
> >
> > Defense in Depth berlaku tidak hanya pada autentikasi, tetapi pada seluruh arsitektur sistem. Sebuah perusahaan dapat menerapkan firewall perimeter, segmentasi jaringan internal, enkripsi data, kontrol akses pada aplikasi, dan monitoring berkelanjutan—setiap lapisan melindungi aspek yang berbeda. Penting untuk dicatat bahwa lapisan‑lapisan ini sebaiknya beragam jenisnya (preventive, detective, recovery) dan tidak bergantung pada asumsi yang sama, agar satu kelemahan tidak meruntuhkan seluruh tumpukan sekaligus.
> >
> > ```mermaid
> > flowchart TB
> >     A["Penyerang"] --> L1["Login"]
> >     L1 --> L2["Strong Password"]
> >     L2 --> L3["OTP &#40;Faktor Kedua&#41;"]
> >     L3 --> L4["Audit Trail"]
> >     L4 --> ASSET["Aset Terlindungi"]
> > ```
> >
> > ### Don't Reinvent the Wheel
> >
> > Prinsip **Don't Reinvent the Wheel** memperingatkan bahwa **countermeasure baru sendiri dapat justru memperbesar attack surface**. Setiap kali tim menulis kode keamanan dari nol—misalnya membuat algoritma enkripsi sendiri—mereka memperkenalkan kemungkinan bug dan kelemahan baru yang belum teruji. Kode baru ini belum melewati pengujian dan audit ekstensif yang dialami oleh komponen yang sudah mapan, sehingga risikonya lebih tinggi meskipun niatnya baik.
> >
> > Solusinya adalah **mempromosikan reuse** terhadap komponen perangkat lunak, kode, dan fungsionalitas yang sudah ada dan terbukti. Untuk keamanan, ini berarti menggunakan **library kriptografi yang matang** alih‑alih membangun sendiri. Contoh konkret yang diberikan adalah penggunaan library seperti **OpenSSL** atau **BouncyCastle** untuk kebutuhan enkripsi, daripada mengimplementasikan algoritma kriptografi dari awal. Library ini telah ditinjau oleh ribuan ahli, telah diperbaiki melalui banyak iterasi, dan menerapkan praktik terbaik yang sulit direplikasi oleh tim individual.
> >
> > Prinsip ini terutama kritikal dalam kriptografi, di mana terdapat pepatah terkenal: "don't roll your own crypto". Kesalahan kecil dalam implementasi—misalnya penggunaan nonce yang dapat ditebak atau padding yang salah—dapat sepenuhnya membatalkan keamanan sebuah skema yang secara teoritis kuat. Dengan menggunakan komponen yang sudah teruji, tim pengembang dapat memfokuskan energi mereka pada logika bisnis aplikasi sambil mewarisi jaminan keamanan dari komunitas yang lebih besar. Namun perlu diingat, reuse pun harus disertai pemeliharaan: library bekas yang tidak diperbarui dapat menyimpan vulnerability yang sudah diketahui publik.
>
> [!cornell] #### Summary
>
> Sebuah **security control** menjalankan lima fungsi—**prevent, deter, deflect, detect, dan recover**—untuk mengurangi **attack surface** dan **risk level** sebuah sistem. Countermeasure tidak terbatas pada teknologi; kontrol **non‑IT** seperti keamanan fisik, screening personel, kerangka hukum, dan pelatihan karyawan sama pentingnya. **Defense in Depth** menumpuk beberapa lapisan kontrol sehingga kegagalan satu lapisan tidak berarti kompromi total—contohnya login + strong password + OTP + audit trail. Sementara itu, prinsip **Don't Reinvent the Wheel** mendorong reuse komponen yang sudah teruji, terutama menggunakan library kriptografi matang seperti **OpenSSL** atau **BouncyCastle** alih‑alih membangun sendiri, karena kode baru justru dapat memperbesar attack surface.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber: Taksonomi Kontrol (NIST & Administratif/Teknis/Fisik)
>
> Di dunia profesional, security control diklasifikasikan dalam dua dimensi. Berdasarkan **fungsi**, terdapat preventive, detective, corrective, deterrent, recovery, dan compensating control. Berdasarkan **jenis implementasi**, terdapat **administrative** (kebijakan, prosedur, pelatihan), **technical/logical** (firewall, enkripsi, IAM), dan **physical** (kunci, CCTV, mantrap). Kerangka **NIST SP 800‑53** menyediakan katalog ratusan kontrol yang dikelompokkan ke dalam family seperti Access Control (AC), Audit and Accountability (AU), dan System and Communications Protection (SC). Pemetaan ini membantu organisasi memilih kontrol secara sistematis dan membuktikan kepatuhan terhadap regulasi.
>
> #### Lebih dalam — Zero Trust sebagai Evolusi Defense in Depth
>
> Defense in Depth tradisional sering mengasumsikan model "perimeter": keras di luar, lunak di dalam. Arsitektur **Zero Trust** ("never trust, always verify") merupakan evolusi yang menghapus asumsi kepercayaan implisit terhadap jaringan internal. Setiap permintaan—bahkan dari dalam jaringan—harus diautentikasi, diotorisasi, dan dienkripsi, dengan keputusan akses berbasis identitas, postur perangkat, dan konteks. Microsegmentation, continuous verification, dan least‑privilege access menjadi pilar utamanya. Zero Trust dapat dilihat sebagai Defense in Depth yang diterapkan secara konsisten di setiap titik, bukan hanya di perimeter.
>
> #### Proyek Eksplorasi Mandiri
> 1. Rancang arsitektur Defense in Depth untuk sebuah aplikasi perbankan online. Petakan setiap lapisan ke salah satu dari lima fungsi control (prevent/deter/deflect/detect/recover) dan jelaskan apa yang terjadi jika satu lapisan gagal.
> 2. Lakukan eksperimen kecil: implementasikan autentikasi menggunakan library yang sudah ada (misalnya bcrypt untuk hashing password dan library TOTP untuk OTP), lalu dokumentasikan berapa banyak detail keamanan yang otomatis ditangani oleh library tersebut.
> 3. Telusuri katalog NIST SP 800‑53 dan pilih lima kontrol yang relevan untuk sebuah startup SaaS; jelaskan justifikasi pemilihannya.
>
> #### Bacaan Lanjutan
> - NIST SP 800‑53 Rev. 5, "Security and Privacy Controls for Information Systems and Organizations".
> - NIST SP 800‑207, "Zero Trust Architecture".
> - Dokumentasi OpenSSL dan BouncyCastle untuk memahami cara mengintegrasikan kriptografi dengan benar.
