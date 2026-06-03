---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Ready-made Solutions - COTS and Open Source
>
> > ## Questions/Cues
> >
> > - Apa perbedaan solusi bespoke dan ready-made?
> > - Mengapa pengembangan bespoke kini menjadi kemewahan?
> > - Apa itu COTS dan ciri khasnya?
> > - Apa keuntungan utama solusi open source?
> > - Apakah open source berarti solusi tanpa biaya?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 4-6)
>
> > ### Bespoke vs Ready-made
> >
> > Pada masa lalu, **pengembangan bespoke** merupakan satu-satunya opsi yang tersedia bagi organisasi yang ingin mengadopsi teknologi komputer. Setiap sistem harus dibangun dari awal sesuai kebutuhan. Dalam pendekatan **bespoke**, sebuah solusi **'tailor-made'** dirancang dan dikembangkan untuk memenuhi secara presisi sekumpulan kebutuhan yang telah disepakati.
> >
> > Namun di era modern, tampaknya **hanya organisasi terbesar dan terkaya** yang memiliki kemewahan untuk memelihara **tim pengembangan in-house** yang berdedikasi. Bahkan organisasi-organisasi tersebut sering **mengalihdayakan (outsource)** pekerjaan pengembangan ke pihak ketiga. Sebagai alternatif, muncul pendekatan **ready-made** yang memanfaatkan solusi yang sudah jadi.
> >
> > Terdapat dua pendekatan luas untuk mengadakan solusi ready-made: **membeli solusi COTS (commercial off-the-shelf)** atau **memperoleh solusi open source**.
> >
> > ```mermaid
> > flowchart TD
> >     S["Solusi"]
> >     S --> BP["Bespoke<br/>(tailor-made,<br/>dibangun dari awal)"]
> >     S --> RM["Ready-made"]
> >     RM --> C["COTS<br/>(dibeli/disewa/<br/>dilisensikan, as-is)"]
> >     RM --> O["Open Source<br/>(akses ke source code,<br/>dapat di-tailor)"]
> > ```
> >
> > ### COTS (Commercial Off-The-Shelf)
> >
> > Dalam konteks sistem komputer, **produk perangkat lunak COTS** adalah paket perangkat lunak siap pakai yang **dibeli, disewa (leased), atau dilisensikan**, secara off-the-shelf, oleh seorang **acquirer (pengakuisisi) yang tidak memiliki pengaruh atas fitur dan kualitas lain** dari produk tersebut.
> >
> > Ciri kunci COTS adalah bahwa pembeli menerima produk **sebagaimana adanya (as-is)**: fitur, antarmuka, dan kualitasnya telah ditentukan oleh vendor untuk pasar massal, bukan untuk satu pelanggan. Contoh COTS sehari-hari antara lain Microsoft Office, SAP ERP, dan Adobe Photoshop. Keunggulannya adalah ketersediaan instan, kematangan produk, dan dukungan vendor; kelemahannya adalah keterbatasan dalam penyesuaian dan potensi vendor lock-in.
> >
> > ### Open Source dan Akses ke Source Code
> >
> > Dengan opsi **open source**, pelanggan memperoleh solusi ready-made **namun juga mendapatkan akses ke kode sumber (source code)**. Akses ini memungkinkan pengembang in-house maupun pihak ketiga untuk **menyesuaikan (tailor) solusi agar memenuhi kebutuhan presisi** organisasi pelanggan — sesuatu yang tidak dimungkinkan oleh COTS.
> >
> > Open source dengan demikien menjembatani dunia ready-made dan bespoke: pelanggan mendapat fondasi yang sudah jadi, tetapi tetap memiliki kebebasan untuk memodifikasinya. Contoh populer meliputi Linux, PostgreSQL, Moodle, dan WordPress.
> >
> > ### Keuntungan dan Catatan Penting Open Source
> >
> > Opsi open source jelas menawarkan sejumlah keuntungan: **zero license cost (biaya lisensi nol)** dan tersedianya **solusi ready-made yang juga dapat di-tailor dan dipelihara** sesuai kebutuhan organisasi pelanggan.
> >
> > Catatan kritis: **biaya lisensi nol tidak berarti solusi tanpa biaya (zero cost solution)**. Tetap ada biaya implementasi, kustomisasi, integrasi, pelatihan, hosting, dan terutama **pemeliharaan jangka panjang**. Banyak organisasi memilih membayar dukungan komersial (misalnya Red Hat untuk Linux) untuk memperoleh jaminan SLA dan keamanan. Karena itu evaluasi open source harus tetap berbasis **Total Cost of Ownership**, bukan sekadar harga lisensi.
>
> [!cornell] #### Summary
>
> Solusi **ready-made** kini mendominasi karena pengembangan **bespoke** in-house menjadi kemewahan bagi organisasi besar, dan kerap di-**outsource**. Terdapat dua jalur ready-made: **COTS** — paket komersial yang dibeli/disewa/dilisensikan as-is, di mana acquirer **tidak berpengaruh atas fitur dan kualitasnya** — dan **open source**, yang memberi **akses ke source code** sehingga solusi dapat di-tailor dan dipelihara secara presisi. Open source menawarkan **zero license cost** dan fleksibilitas penyesuaian, namun **bukan berarti tanpa biaya** karena implementasi, kustomisasi, dan pemeliharaan tetap menimbulkan **TCO** yang nyata.

> [!ad-libitum]- Additional Information
>
> #### Spektrum Lisensi Perangkat Lunak
>
> - **Proprietary/COTS**: Kode tertutup, lisensi membatasi penggunaan dan modifikasi.
> - **Permissive open source** (MIT, Apache 2.0, BSD): Bebas memodifikasi dan mendistribusikan ulang termasuk dalam produk proprietary.
> - **Copyleft** (GPL, AGPL): Mewajibkan turunan tetap open source — penting dipahami untuk menghindari pelanggaran lisensi.
>
> #### Model Bisnis di Balik Open Source
>
> - **Open core**: Inti gratis, fitur enterprise berbayar (mis. GitLab).
> - **Support & subscription**: Berbayar untuk dukungan/SLA (mis. Red Hat).
> - **SaaS hosting**: Versi terkelola di cloud (mis. WordPress.com).
>
> #### Evaluasi Kematangan Open Source
>
> Periksa kesehatan proyek sebelum adopsi: frekuensi commit, ukuran komunitas, kecepatan respons issue keamanan (CVE), kualitas dokumentasi, dan keberlanjutan tata kelola (yayasan vs individu).
>
> #### Self-Exploration Projects
>
> 1. Bandingkan TCO 3 tahun antara Microsoft SharePoint (COTS) dan Nextcloud (open source) untuk kolaborasi dokumen.
> 2. Kustomisasi tema dan plugin pada instalasi WordPress untuk kebutuhan portal berita kampus.
> 3. Audit lisensi dependensi sebuah proyek menggunakan tool seperti FOSSA atau license-checker.
>
> #### Further Reading
>
> - Raymond, E.S. *The Cathedral and the Bazaar*.
> - Open Source Initiative (OSI) — daftar lisensi resmi.
> - ISO/IEC 25010 — model kualitas produk perangkat lunak (relevan menilai kualitas COTS).
