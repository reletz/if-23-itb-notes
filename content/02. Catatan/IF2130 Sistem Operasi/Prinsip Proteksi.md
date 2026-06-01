---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Definisi & Tujuan Proteksi
> > - Mekanisme vs. Kebijakan
> > - Prinsip Privilege Terkecil
> > - Prinsip Proteksi Lainnya
> > - Apa itu Protection Rings?
> > - Implementasi Rings (Intel)
> > - ARM: TrustZone & Exception Levels
> >
> > ## Reference Points
> > - Page 34-36
> > - Lecture slides 12-15
>
> > This right column contains your detailed notes. Structure them with headings, paragraphs, and lists.
> >
> > ### Definisi dan Tujuan Proteksi
> > **Proteksi** adalah seperangkat mekanisme yang mengontrol akses oleh program, proses, atau pengguna terhadap sumber daya sistem. Jika **Keamanan** adalah tentang bertahan dari serangan eksternal, maka **Proteksi** adalah tentang mengatur "siapa boleh melakukan apa" di dalam sistem itu sendiri.
> > 
> > **Tujuan Proteksi**
> > 1. Mencegah pelanggaran akses yang disengaja (misalnya, pengguna A tidak boleh membaca file milik pengguna B).
> > 2. Memastikan setiap komponen menggunakan sumber daya sesuai aturan, yang meningkatkan **keandalan (reliability)** sistem secara keseluruhan.
> > 3. Mendeteksi kesalahan pada antarmuka antar subsistem.
> > 
> > ### Pemisahan Mekanisme dan Kebijakan (Mechanism vs. Policy)
> > Ini adalah prinsip desain fundamental dalam sistem operasi.
> > **Mekanisme**
> > Menentukan **BAGAIMANA** sesuatu dilakukan. Ini adalah alat atau fondasi yang disediakan oleh OS.
> > - _Contoh:_ Mekanisme kunci dan pintu.
> > 
> > **Kebijakan (Policy):** Memutuskan **APA** yang akan dilakukan. Ini adalah aturan yang ditentukan oleh administrator atau pengguna.
> > - _Contoh:_ Kebijakan siapa saja yang boleh mendapatkan kunci dari pintu tersebut.
> > 
> > Dengan memisahkan keduanya, kebijakan dapat diubah dengan fleksibel tanpa harus merancang ulang mekanisme dasarnya.
> > 
> > ### Prinsip-prinsip Proteksi
> >  **Prinsip Privilege Terkecil (Principle of Least Privilege):**
> >  - Ini adalah prinsip panduan **paling penting** dalam proteksi.
> >  - Setiap program, pengguna, atau sistem hanya boleh diberikan **hak istimewa (privilege) paling minimum** yang diperlukan untuk menyelesaikan tugasnya. Tidak lebih.
> >  - **Analogi:** Seorang kasir di bank memiliki akses ke laci kasnya sendiri (privilege minimum), tetapi tidak ke brankas utama bank. Ini membatasi kerusakan jika kasir tersebut melakukan kesalahan atau berniat jahat.
> > 
> > **Prinsip Proteksi Lainnya:**
> >  - **Pemisahan Privilege (Separation of Privilege):** Memecah program menjadi bagian-bagian dengan hak akses berbeda untuk membatasi cakupan kekuatan setiap bagian.
> >  - **Kompartementalisasi (Compartmentalization):** Mengisolasi komponen sistem. Jika satu kompartemen berhasil diretas, kompartemen lain tetap aman. Contoh: _Virtual Machines_, _network DMZ_.
> >  - **Need-to-Know:** Proses hanya boleh mengakses objek yang ia butuhkan pada saat itu juga.
> >
> > ### Protection Rings (Cincin Proteksi)
> > - Sebuah model arsitektur untuk memisahkan hak istimewa secara hierarkis, yang seringkali didukung langsung oleh perangkat keras (CPU).
> > - **Konsep:** Bayangkan serangkaian cincin konsentris. Cincin terdalam memiliki hak istimewa tertinggi, dan semakin keluar cincinnya, hak istimewanya semakin rendah.
> > - **Aturan:** Program di cincin luar tidak bisa mengakses sumber daya di cincin yang lebih dalam secara langsung. Untuk melakukannya, ia harus melalui "gerbang" (_gate_) yang terkontrol ketat, seperti **system call**.
> > - **Implementasi Umum (Intel x86):**
> > - **Ring 0 (Kernel Mode):** Hak akses penuh. Ditempati oleh inti (kernel) sistem operasi. Dapat mengakses semua perangkat keras.
> > - **Ring 3 (User Mode):** Hak akses paling terbatas. Ditempati oleh aplikasi pengguna (misalnya, browser, game, office).
> > 
> > ### Arsitektur ARM: TrustZone & Exception Levels (EL)
> > Arsitektur ARM (yang digunakan di hampir semua smartphone) memiliki model yang lebih canggih.
> > 
> > **Exception Levels (EL):**
> > - **EL0:** User Mode (aplikasi).
> > - **EL1:** OS Kernel Mode (kernel Android/iOS).
> > - **EL2:** Hypervisor Mode (untuk virtualisasi).
> > - **EL3:** Secure Monitor Mode (paling istimewa).
> >
> > **ARM TrustZone:**
> > - Ini adalah fitur perangkat keras yang menciptakan dua "dunia" yang berjalan secara paralel di dalam satu CPU: **Secure World** (dijalankan oleh _Secure Monitor_ di EL3) dan **Normal World** (tempat OS biasa seperti Android berjalan).
> > - **Tujuan:** Fungsi yang sangat sensitif (seperti pemrosesan sidik jari, pembayaran seluler) dijalankan di _Secure World_. Kernel Android (di EL1 _Normal World_) bahkan tidak dapat mengaksesnya. Ini adalah bentuk kompartementalisasi yang sangat kuat di level perangkat keras.s

> [!cornell] #### Summary
> Proteksi adalah mekanisme internal untuk mengontrol akses sumber daya, yang dipandu oleh Prinsip Privilege Terkecil dan pemisahan antara mekanisme (cara) dengan kebijakan (apa). Implementasi teknisnya seringkali menggunakan model hierarkis seperti Protection Rings pada perangkat keras untuk memisahkan mode kernel dan user, dengan arsitektur modern seperti ARM TrustZone yang menyediakan "Secure World" terisolasi untuk fungsi keamanan paling kritis.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> **System Call: Gerbang Antar Protection Rings**
> Bagaimana sebuah aplikasi di Ring 3 (User Mode) bisa meminta layanan dari kernel di Ring 0, seperti membuka file? Jawabannya adalah **System Call**. Prosesnya adalah sebagai berikut:
> 1. Aplikasi di User Mode mengeksekusi instruksi khusus yang disebut `TRAP` (atau `SYSCALL`/`SYSENTER` pada arsitektur modern).
> 2. `TRAP` ini menyebabkan CPU untuk beralih konteks dari User Mode ke Kernel Mode (dari Ring 3 ke Ring 0).
> 3. Eksekusi "melompat" bukan ke sembarang tempat, tetapi ke sebuah titik masuk (_entry point_) yang sudah terdefinisi dan aman di dalam kernel, yang disebut _system call handler_.
> 4. Kernel memeriksa permintaan dari aplikasi, memvalidasinya, dan menjalankannya atas nama aplikasi tersebut.
> 5. Setelah selesai, kernel mengembalikan hasilnya dan mengeksekusi instruksi `IRET` (Interrupt Return) untuk mengembalikan kontrol ke aplikasi di User Mode.
> 
> Gerbang ini memastikan aplikasi tidak bisa sembarangan menjalankan kode dengan hak akses kernel.
>  
>  **Studi Kasus: Penggunaan ARM TrustZone di Dunia Nyata**
>  Teknologi TrustZone bukan sekadar teori. Ia digunakan secara aktif di ponsel Anda untuk:
>  - **Pemrosesan Biometrik:** Saat Anda memindai sidik jari, data mentah dari sensor dikirim langsung ke _Secure World_. Proses pencocokan dengan template sidik jari Anda yang tersimpan juga terjadi di sana. OS Android hanya menerima jawaban "ya" atau "tidak", dan tidak pernah melihat data sidik jari Anda.
>  - **Pembayaran Seluler (Mobile Payments):** _Token_ pembayaran yang digunakan oleh layanan seperti Google Pay atau Samsung Pay disimpan dan diproses di dalam _Secure World_ untuk mencegah malware di _Normal World_ mencurinya.
>  - **DRM (Digital Rights Management):** Untuk memutar konten video beresolusi tinggi yang dilindungi hak cipta (misalnya dari Netflix), proses dekripsi video terjadi di _Secure World_ untuk mencegah pembajakan.
>  
>  **Biaya Kinerja dari Mekanisme Proteksi (Performance Overhead)**
>  - Proteksi tidak gratis. Setiap kali _system call_ terjadi, CPU harus melakukan **context switch**.
>  - _Context switch_ melibatkan penyimpanan semua register dari proses pengguna, memuat register yang diperlukan kernel, melakukan operasi, lalu memulihkan kembali register proses pengguna. Proses ini juga seringkali melibatkan pembersihan _cache_ memori tertentu (seperti TLB - Translation Lookaside Buffer).
>  - Semua ini membutuhkan waktu—meskipun sangat singkat (dalam orde mikrodetik atau nanodetik), jika sebuah program melakukan ribuan _system call_, overhead ini dapat terakumulasi dan memengaruhi kinerja secara signifikan. Ini adalah salah satu trade-off fundamental dalam desain sistem: **keamanan/proteksi vs. kecepatan**.
>
> #### Sumber & Referensi Lanjutan:
>**Dokumentasi Resmi Produsen Chip:**
> - **Intel® 64 and IA-32 Architectures Software Developer's Manuals:** Volume 3A adalah sumber definitif tentang arsitektur sistem, termasuk detail tentang _protection rings_, _gates_, dan _interrupts_.
> - **ARM Architecture Reference Manuals (ARM ARM):** Menyediakan detail lengkap tentang _Exception Levels_, _TrustZone_, dan arsitektur keamanan ARM.
> **Sistem Operasi Klasik:**
> - **Multics (Multiplexed Information and Computing Service):** Sistem operasi legendaris dari tahun 1960-an yang menjadi pelopor konsep _protection rings_. Banyak ide dari Multics yang kemudian memengaruhi desain UNIX.
>
>#### Eksplorasi Mandiri:
>- **Melihat System Calls Secara Langsung:** Jika Anda menggunakan Linux, coba jalankan perintah sederhana di terminal dengan `strace` di depannya. Contoh: `strace ls -l`. Anda akan melihat daftar panjang _system call_ (`openat`, `read`, `write`, `close`, dll.) yang dibuat oleh perintah `ls` yang tampaknya sederhana itu untuk bisa berinteraksi dengan kernel.
>- **Riset TEE (Trusted Execution Environment):** "TEE" adalah istilah generik untuk lingkungan eksekusi aman. ARM TrustZone adalah salah satu implementasinya. Cari implementasi lain seperti **Intel SGX (Software Guard Extensions)**. Apa persamaan dan perbedaannya?
>- **Pikirkan Prinsip Privilege Terkecil:** Analisis aplikasi di ponsel atau komputer Anda. Aplikasi kalkulator, misalnya, apakah ia memerlukan akses ke kontak, lokasi, atau mikrofon Anda? Jika sebuah aplikasi meminta izin (privilege) yang tidak masuk akal untuk fungsinya, itu adalah pelanggaran terhadap Prinsip Privilege Terkecil dan bisa menjadi pertanda buruk.