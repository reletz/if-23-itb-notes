---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Large-Scale Software: Problems and Characteristics
>
> > ## Questions/Cues
> >
> > - Mengapa pengembangan perangkat lunak skala besar bukan sekadar soal "ukuran kode yang besar"?
> > - Masalah teknis apa saja yang muncul pada aplikasi berukuran besar?
> > - Apa ciri-ciri khas (typical) sebuah large-scale software?
> > - Dimensi kompleksitas apa saja yang harus dihadapi?
> > - Seberapa besar effort yang dibutuhkan sistem berjuta baris kode?
> >
> > ## Reference Points
> >
> > - Large Scale Software Development (Halaman 2, 4-5)
> > - Large Scale Software Development (Halaman 9-14)
>
> > ### Mengapa Bukan Sekadar "Ukuran Besar"
> >
> > Poin inti materi: **"Development in a large scale software is not just the issue of the large size software application."** Artinya, tantangan utama bukan hanya jumlah baris kode, melainkan **kompleksitas interaksi**, **koordinasi antar pengembang**, **perbedaan lokasi/platform**, serta **proses dan politik organisasi** yang menyertainya. Sistem besar bisa gagal bukan karena algoritmanya sulit, tapi karena ribuan komponen dan ratusan orang sulit disinkronkan.
> >
> > ### Masalah Teknis pada Aplikasi Berukuran Besar
> >
> > Beberapa problem yang menonjol ketika aplikasi membesar:
> >
> > 1. **Memory Constraint** — memori harus dikelola sangat hati-hati karena terbatas oleh hardware sistem.
> > 2. **Time Constraint** — waktu tunggu untuk *rebuild* (compile time) menjadi mahal; sekali build bisa menghabiskan banyak waktu.
> > 3. **Performance** — bahasa interpreted (mis. Java) tidak akan pernah menyamai bahasa compiled; ada pula beban *garbage collection handling*.
> > 4. **Threads** — masalah akibat *threading* jauh lebih kompleks daripada pemrograman sekuensial (race condition, deadlock, dsb.).
> > 5. **Safety** — semakin besar masalahnya, semakin berisiko ("the bigger the problem is, the riskier it becomes").
> > 6. **Portability** — penjadwalan thread bervariasi antar platform, notasi spesifik platform (mis. `c:\meta\test.java` vs `/meta/test.java`), mesin berbeda bisa memunculkan bug berbeda pada compiler/VM, serta adanya *non-standard API*.
> >
> > ### Ciri Khas Typical Large-Scale Software
> >
> > - **Source code dalam jumlah besar** — tipikal jutaan baris.
> > - **Jumlah developer besar** — bisa ratusan, sering tersebar secara geografis.
> > - **Kompleksitas interaksi antar komponen yang tinggi**.
> > - **Penggunaan komponen off-the-shelf** yang ekstensif.
> > - **Multiple programming languages**.
> > - **Multiple persistence mechanisms** — file, relational database, object database.
> > - **Multiple hardware platforms**, distribusi komponen ke beberapa platform.
> > - **Concurrency tinggi**.
> >
> > ### Dimensi Kompleksitas (LS Software Development)
> >
> > Kompleksitas pengembangan skala besar berlapis pada banyak dimensi:
> >
> > - **Complexity in "Software"** — High LOC, banyak data access, banyak elemen komputasi.
> > - **Complexity in Requirements** — ukuran requirement besar, sering berubah, kadang konflik.
> > - **Complexity in location differences** — tim lintas lokasi/zona waktu.
> > - **Complexity in platform differences**.
> > - **Complexity in "politics"** — perbedaan aturan dan kebijakan antar pihak.
> > - **Complexity in Resource Allocations**.
> >
> > ### Contoh Sistem Besar dan Estimasi Effort
> >
> > Dua sistem besar yang berhasil diimplementasikan di Syracuse:
> >
> > - **OTHR (Over The Horizon Radar)** — ±3.000.000 baris kode, mayoritas FORTRAN dengan sedikit C dan assembly.
> > - **BSY-2 (submarine battle management system)** — beberapa kali lebih besar dari OTHR, mayoritas ditulis dalam Ada.
> >
> > Estimasi effort sebuah sistem 5 juta baris:
> >
> > $$\frac{5.000.000\ lines}{22\ lines/day} \times \frac{1}{240\ days/year} \approx 947\ \text{person-years of effort}$$
> >
> > Untuk menyelesaikan proyek dalam 2,5 tahun dibutuhkan **±380 developer terlatih**. Dua kesimpulan yang hampir *self-evident*:
> >
> > 1. Sistem sebesar ini **harus dipartisi** menjadi banyak komponen kecil yang relatif independen agar bisa berjalan.
> > 2. Jauh lebih baik **tidak membangun dari nol**, melainkan menyusun sebagian besar dari **komponen yang di-reuse**, dan menyisakan kode baru hanya untuk requirement baru.
> >
> > ### Studi Kasus: HP-UX Development
> >
> > Skala pengembangan HP-UX menggambarkan apa arti "besar" secara konkret:
> >
> > - 220.000+ source files
> > - ±2,5 juta versi
> > - 52.000+ derived files (single nightly build)
> > - 900+ user accounts
> > - \>1 Terabyte disk space
> > 
> > Dilakukan dengan cara berikut:
> > 
> > 1. **HP-UX Concurrent Development**: normalnya 2-3 release sedang dikembangkan, beberapa release dalam maintenance, dan penggunaan *branching & merging* yang masif. 
> > 2. **HP-UX Multisite Development**: empat situs pengembangan primer (tiga di USA dengan tiga zona waktu, satu di India), satu situs USA menampung tiga situs logis (partner companies), serta beberapa situs sekunder.

> [!cornell] #### Summary
>
> Pengembangan **large-scale software** ditandai bukan oleh ukuran kode semata, melainkan oleh **kompleksitas interaksi, koordinasi, lokasi, platform, dan politik**. Aplikasi besar menghadapi kendala **memori, waktu kompilasi, performa, threading, keamanan, dan portabilitas**. Cirinya: jutaan baris kode, ratusan developer terdistribusi, banyak bahasa & mekanisme persistensi, serta konkurensi tinggi. Karena effort bisa mencapai ratusan *person-years* (mis. sistem 5 juta baris ≈ 947 person-years), strateginya adalah **partisi menjadi komponen kecil independen** dan **reuse** sebanyak mungkin. Contoh dunia nyata seperti OTHR, BSY-2, dan HP-UX menegaskan skala dan pentingnya manajemen konkurensi serta multisite development.

> [!ad-libitum]- Additional Information
>
> #### Hubungan dengan Topik Lain
>
> Strategi "partisi menjadi komponen kecil dan reuse" merupakan jembatan langsung ke [[Domain-Specific Software Architecture (DSSA)]] dan reuse berbasis domain. Sementara isu koordinasi tim besar dibahas lebih lanjut di [[Principles and Coordination in Large-Scale Development]] dan penskalaan proses di [[Scaling Agile for Large Teams (LeSS and SAFe)]].
>
> #### Mengapa "22 lines/day"?
>
> Angka produktivitas ±22 baris/hari terkesan kecil, tetapi mencakup **seluruh siklus**: analisis, desain, coding, review, testing, dokumentasi, dan rapat — bukan sekadar mengetik kode. Inilah alasan estimasi effort sistem besar melonjak ke ratusan person-years.
>
> #### Further Reading
>
> - Garland, Jeff & Richard Anthony. *Large-scale Software Architecture: A Practical Guide using UML*. John Wiley & Sons, 2003.
> - Jim Fawcett, Dave Penny, "Large-Scale Application Development and Integration — Large Scale Systems – System Decomposition".
