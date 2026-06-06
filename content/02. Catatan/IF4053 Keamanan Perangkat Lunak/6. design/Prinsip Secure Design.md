---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Prinsip Secure Design
>
> > ## Questions/Cues
> >
> > - Apa itu Open Design dan mengapa security by obscurity ditolak?
> > - Bagaimana prinsip Least Privilege meningkatkan keamanan dan stabilitas?
> > - Apa beda Separation of Duties dan kaitannya dengan reference monitor?
> > - Mengapa sistem harus Secure by Default?
> > - Apa makna Fail‑Secure dan bagaimana sistem berperilaku saat gagal?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W08 Software Security Design — bagian "Secure Design Principles")
>
> > ### Open Design dan Kerckhoffs' Principle
> >
> > Prinsip **Open Design** menyatakan bahwa **detail implementasi dari sebuah desain harus independen dari desain itu sendiri**, dan yang lebih penting, keamanan sistem **tidak boleh bergantung pada kerahasiaan desainnya**. Ini adalah penolakan langsung terhadap pendekatan **security by obscurity**—asumsi keliru bahwa sebuah sistem aman hanya karena cara kerjanya dirahasiakan. Sejarah berulang kali membuktikan bahwa rahasia desain pada akhirnya bocor (melalui reverse engineering, kebocoran internal, atau analisis), dan ketika itu terjadi, sistem yang hanya mengandalkan kerahasiaan menjadi sepenuhnya rentan.
> >
> > Prinsip ini diformalkan oleh **Kerckhoffs' principle**, yang menyatakan bahwa keamanan sebuah sistem tidak boleh bergantung pada kerahasiaan detail desainnya—melainkan pada kerahasiaan kunci (key) yang dapat dengan mudah diganti. Dengan kata lain, **desain boleh terbuka (open)** dan diaudit publik, sementara **implementasi spesifik (dan kunci) dapat tetap dirahasiakan**. Desain yang dipublikasikan justru memperoleh keuntungan: ribuan ahli dapat menganalisis dan menemukan kelemahannya sebelum penyerang melakukannya.
> >
> > Contoh konkret membuat ini jelas. Protokol **OAuth** memiliki spesifikasi yang sepenuhnya terbuka dan dipublikasikan, tetapi setiap implementasi dapat berbeda dari satu kasus ke kasus lain—token, secret, dan konfigurasi tetap dirahasiakan. Demikian pula **TLS encryption**: algoritma dan protokolnya adalah standar terbuka yang telah ditinjau secara ekstensif, namun keamanannya bergantung pada kunci privat yang dirahasiakan, bukan pada kerahasiaan algoritma. Inilah mengapa kriptografi modern selalu menggunakan algoritma publik yang telah teruji.
> >
> > ### Least Privilege
> >
> > Prinsip **Least Privilege** dirumuskan oleh **Saltzer dan Schroeder**: "Every program and every user of the system should operate using the **least set of privileges** necessary to complete the job." Artinya, setiap program dan setiap pengguna seharusnya hanya memiliki hak akses minimum yang benar‑benar diperlukan untuk menyelesaikan tugasnya—tidak lebih. Prinsip ini sederhana namun menjadi salah satu fondasi paling penting dalam secure design.
> >
> > Manfaat pertama adalah **better security** (keamanan lebih baik). Jika sebuah program dijalankan dengan hak terbatas, maka vulnerability yang mungkin dikandungnya **lebih kecil kemungkinannya dieksploitasi** untuk merusak sistem secara keseluruhan. Seorang penyerang yang berhasil mengkompromikan proses dengan hak rendah hanya memperoleh akses terbatas, bukan kendali penuh atas sistem. Manfaat kedua adalah **better stability** (stabilitas lebih baik): bug atau kesalahan manusia menyebabkan kerusakan yang lebih kecil karena cakupan dampaknya dibatasi oleh hak akses yang sempit.
> >
> > Contoh konkret yang diberikan adalah **menjalankan server menggunakan akun "normal" user**, bukan root atau administrator. Jika sebuah web server yang berjalan sebagai user biasa berhasil ditembus melalui vulnerability, penyerang hanya memperoleh hak user biasa tersebut—mereka tidak dapat langsung memodifikasi file sistem, menginstal rootkit, atau mengakses data pengguna lain. Praktik ini sangat umum: layanan modern hampir selalu dijalankan dengan akun layanan khusus berhak minimal, dan privilege tambahan hanya diberikan ketika benar‑benar diperlukan, idealnya untuk durasi sesingkat mungkin.
> >
> > ### Separation of Duties / Privileges
> >
> > **Separation of Duties** (pemisahan tugas) adalah prinsip keamanan yang mensyaratkan bahwa **penyelesaian sebuah tugas tunggal bergantung pada dua atau lebih kondisi**, yang masing‑masing tidak cukup untuk menyelesaikan tugas itu sendiri. Latar belakangnya adalah pengakuan bahwa para pihak (principals) yang menjalankan tugas mungkin memiliki **conflict of interest** atau berpotensi **berkolusi**. Karena itu, tugas‑tugas tersebut harus dilakukan oleh **principal yang berbeda**, sehingga tidak ada satu orang pun yang dapat menyalahgunakan wewenang sendirian.
> >
> > Contoh klasik dari dunia keuangan adalah proses pinjaman: **mengajukan pinjaman (propose a loan)** dan **menyetujui pinjaman (approve a loan)** harus dilakukan oleh agen yang berbeda. Jika satu orang dapat mengajukan sekaligus menyetujui, ia dapat dengan mudah melakukan kecurangan—misalnya menyetujui pinjaman fiktif untuk dirinya sendiri. Dengan memisahkan kedua peran, dibutuhkan kolusi setidaknya dua orang untuk melakukan penyalahgunaan, yang jauh lebih sulit dan lebih mungkin terdeteksi.
> >
> > Dalam konteks sistem komputer, contoh yang diberikan adalah bahwa **sebuah shell process dan sebuah reference monitor memiliki process owner yang berbeda**. **Reference monitor** adalah komponen yang memeriksa setiap permintaan akses terhadap kebijakan keamanan—ia harus terisolasi dan tidak dapat dimanipulasi oleh proses yang sedang dievaluasinya. Dengan memisahkan kepemilikan, proses pengguna tidak dapat memodifikasi atau melumpuhkan mekanisme yang mengawasinya, menjaga integritas keputusan otorisasi.
> >
> > ### Secure by Default
> >
> > Prinsip **Secure by Default** mensyaratkan bahwa sistem **dikirimkan dengan konfigurasi yang aman langsung dari kotaknya (out of the box)**. Pengguna tidak perlu melakukan langkah konfigurasi tambahan untuk mendapatkan tingkat keamanan dasar—keamanan adalah keadaan awal, bukan opsi yang harus diaktifkan. Ini penting karena realitasnya banyak pengguna tidak pernah mengubah pengaturan default, sehingga konfigurasi awal yang lemah berarti mayoritas instalasi akan rentan.
> >
> > Beberapa contoh konkret menggambarkan prinsip ini. Pertama, **refuse all access, otherwise allowed**—kebijakan default yang menolak semua akses kecuali yang secara eksplisit diizinkan (prinsip "deny by default"). Kedua, memberikan **password WiFi yang kuat dan unik dari pabrikan** untuk setiap router, alih‑alih password generik seperti "admin/admin" yang mudah ditebak. Ketiga, **mengaktifkan firewall setelah instalasi** secara otomatis, sehingga sistem terlindungi bahkan sebelum pengguna sempat mengonfigurasinya.
> >
> > Secure by Default mengubah beban tanggung jawab: alih‑alih mengharapkan setiap pengguna menjadi ahli keamanan yang memperketat sistemnya sendiri, pembuat sistem yang bertanggung jawab memastikan keadaan awal sudah aman. Pengguna yang membutuhkan fleksibilitas lebih dapat secara sadar melonggarkan pengaturan, tetapi keputusan tersebut menjadi tindakan eksplisit yang disadari, bukan kelalaian default yang tidak terlihat.
> >
> > ### Fail‑Secure
> >
> > Prinsip **Fail‑Secure** adalah **adaptasi dari prinsip Fail‑safe**, yang bertujuan **mempertahankan keamanan ketika terjadi kondisi error atau kegagalan**. Kondisi error ini bisa merupakan akibat dari serangan, atau bisa juga disebabkan oleh kegagalan desain maupun implementasi. Apapun penyebabnya, prinsipnya tegas: ketika sesuatu gagal, sistem atau aplikasi harus **default ke keadaan aman (secure state)**, bukan ke keadaan tidak aman (unsafe state).
> >
> > Perbedaan antara fail‑secure dan fail‑safe layak dicermati. Fail‑safe tradisional memprioritaskan keselamatan—misalnya pintu darurat yang otomatis terbuka saat kebakaran agar orang bisa keluar. Fail‑secure memprioritaskan keamanan—misalnya pintu brankas yang otomatis terkunci saat sistem listrik gagal, agar isinya tetap terlindungi. Dalam konteks keamanan informasi, ketika ragu, sistem harus memilih menolak akses daripada mengizinkannya secara keliru.
> >
> > Contoh konkret yang diberikan: **subjek tidak dapat mengambil sebuah objek jika authorization server gagal (failed)**. Bayangkan sebuah sistem di mana setiap permintaan akses harus divalidasi oleh server otorisasi. Jika server tersebut mengalami kegagalan, perilaku fail‑secure adalah **menolak semua permintaan**—lebih baik menghalangi pengguna sah untuk sementara daripada secara tidak sengaja memberikan akses kepada pihak yang tidak berhak. Perilaku sebaliknya (fail‑open, yang mengizinkan akses saat validasi gagal) akan menciptakan celah berbahaya yang dapat dieksploitasi penyerang dengan sengaja merusak server otorisasi.
>
> [!cornell] #### Summary
>
> Prinsip‑prinsip **secure design** memberikan panduan fundamental untuk membangun sistem yang aman. **Open Design** (Kerckhoffs' principle) menolak security by obscurity—desain boleh terbuka selama kunci dirahasiakan, sebagaimana OAuth dan TLS. **Least Privilege** (Saltzer & Schroeder) memberikan hak minimum yang diperlukan, meningkatkan keamanan dan stabilitas, contohnya menjalankan server sebagai user biasa. **Separation of Duties** memecah tugas kritikal ke principal berbeda untuk mencegah penyalahgunaan dan kolusi, seperti memisahkan propose dan approve pinjaman, atau memisahkan kepemilikan shell process dan reference monitor. **Secure by Default** memastikan konfigurasi awal sudah aman (deny by default, password kuat, firewall aktif). Terakhir, **Fail‑Secure** memastikan sistem default ke keadaan aman saat terjadi error atau serangan—menolak akses ketika authorization server gagal, bukan mengizinkannya.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber: Delapan Prinsip Saltzer & Schroeder Lengkap
>
> Least Privilege dan Open Design adalah bagian dari delapan prinsip klasik yang dirumuskan Saltzer & Schroeder pada 1975. Selengkapnya: **Economy of Mechanism** (desain sesederhana mungkin agar mudah diaudit), **Fail‑safe Defaults** (deny by default), **Complete Mediation** (setiap akses harus dicek, tidak ada caching keputusan yang berbahaya), **Open Design**, **Separation of Privilege**, **Least Privilege**, **Least Common Mechanism** (minimalkan resource yang dibagi antar pengguna untuk mencegah jalur kebocoran), dan **Psychological Acceptability** (mekanisme keamanan harus mudah digunakan agar tidak dihindari pengguna). Prinsip terakhir ini menjelaskan mengapa UX keamanan yang buruk justru menurunkan keamanan secara keseluruhan.
>
> #### Lebih dalam — Reference Monitor dan Konsep Trusted Computing Base (TCB)
>
> Reference monitor yang disinggung dalam Separation of Duties adalah konsep formal dengan tiga syarat: **tamper‑proof** (tidak dapat dimanipulasi), **non‑bypassable / always invoked** (selalu dipanggil pada setiap akses, sejalan dengan Complete Mediation), dan **verifiable** (cukup kecil untuk dianalisis dan dibuktikan benar). Implementasi konkretnya membentuk inti dari **Trusted Computing Base (TCB)**—himpunan komponen yang keamanannya menjadi sandaran seluruh sistem. SELinux dan mekanisme Mandatory Access Control (MAC) lainnya adalah contoh modern penerapan reference monitor di tingkat kernel.
>
> #### Proyek Eksplorasi Mandiri
> 1. Audit sebuah aplikasi atau container Docker yang Anda miliki: periksa apakah ia berjalan sebagai root, lalu refactor agar berjalan sebagai non‑root user. Dokumentasikan perubahan dan dampaknya terhadap fungsi aplikasi.
> 2. Buat tabel yang membandingkan perilaku fail‑secure vs fail‑open pada lima skenario sistem nyata (gerbang akses, ATM, sistem otorisasi pembayaran, firewall, dan kunci pintu data center).
> 3. Telaah implementasi OAuth pada sebuah layanan populer dan identifikasi bagaimana ia menerapkan Open Design—bagian mana yang publik (spesifikasi) dan mana yang rahasia (token, client secret).
>
> #### Bacaan Lanjutan
> - Jerome Saltzer & Michael Schroeder, "The Protection of Information in Computer Systems", Proceedings of the IEEE (1975).
> - OWASP, "Secure Design Principles" dan OWASP Application Security Verification Standard (ASVS).
> - Auguste Kerckhoffs, "La cryptographie militaire" (1883) — sumber asli Kerckhoffs' principle.
