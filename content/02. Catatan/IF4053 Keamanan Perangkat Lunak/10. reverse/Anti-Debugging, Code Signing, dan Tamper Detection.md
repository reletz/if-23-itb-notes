---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Anti-Debugging, Code Signing, dan Tamper Detection
>
> > ## Questions/Cues
> >
> > - Teknik anti-debugging apa saja yang digunakan untuk mendeteksi debugger?
> > - Bagaimana respons program ketika debugging terdeteksi?
> > - Bagaimana proses code signing dari hashing hingga verifikasi?
> > - Apa peran Certificate Authority dan certificate chain dalam code signing?
> > - Metode tamper detection apa saja dan bagaimana integrasinya dengan proteksi lain?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W12 Reverse Engineering & Application Protection — bagian "Anti-Debugging, Code Signing & Tamper Detection")
>
> > ### Anti-Debugging
> >
> > **Anti-debugging** adalah kumpulan mekanisme yang diimplementasikan untuk mendeteksi dan merespons upaya debugging, sehingga menghalangi reverse engineer menganalisis perilaku kode secara dinamis. Karena debugger memungkinkan analis menjalankan program langkah demi langkah serta mengamati memori dan register, kemampuan untuk mendeteksi kehadirannya menjadi garis pertahanan penting bagi software yang ingin menjaga rahasianya saat runtime.
> >
> > Beberapa teknik umum digunakan. **Timing Checks** mengukur waktu eksekusi untuk mendeteksi keterlambatan yang disebabkan oleh debugger—ketika kode dijalankan step-by-step di bawah debugger, jeda antarinstruksi melonjak jauh melampaui kondisi normal. **Debugger Detection via API** memeriksa kehadiran tool debugging melalui pemanggilan API sistem (contoh klasik di Windows adalah `IsDebuggerPresent`). **Exception Handling** memanfaatkan structured exception handling untuk mengidentifikasi intervensi debugger, karena debugger sering menangkap atau mengubah penanganan exception yang seharusnya ditangani program sendiri.
> >
> > Teknik lanjutan menambah lapisan kesulitan. **Self-Modifying Code** mengubah kode selama eksekusi untuk membingungkan debugger, sehingga instruksi yang dilihat analis di disassembler berbeda dengan yang benar-benar dijalankan. **Hardware Breakpoint Detection** mengidentifikasi hardware breakpoint yang dipasang analis (dengan memeriksa debug register CPU), sebuah teknik yang menyasar metode debugging tingkat rendah yang sulit disembunyikan dengan cara lain.
> >
> > Ketika debugging terdeteksi, program dapat memberikan beragam **respons**. Yang paling langsung adalah **terminating the application** (mengakhiri program). Yang lebih licik adalah **executing decoy code paths** (menjalankan jalur kode umpan) untuk menyesatkan analis ke logika palsu, **corrupting data** untuk menggiring analis pada kesimpulan yang salah, atau **slowing down execution dramatically** agar proses analisis menjadi sangat lambat dan menjemukan. Respons yang halus (seperti decoy dan korupsi data) sering lebih efektif daripada terminasi langsung, karena tidak segera memberi tahu analis bahwa proteksi telah aktif.
> >
> > ### Code Signing
> >
> > **Code signing** adalah praktik keamanan yang menggunakan digital signature untuk memverifikasi **authenticity** (keaslian publisher) dan **integrity** (keutuhan kode) sebuah perangkat lunak. Prosesnya dimulai ketika developer memperoleh sertifikat digital dari sebuah **Certificate Authority (CA)** terpercaya. Selanjutnya, kode di-*hash* menggunakan algoritma kriptografis untuk menghasilkan ringkasan unik (digest) dari isi software. Hash tersebut kemudian dienkripsi dengan **private key** developer untuk membentuk **signature**, yang lalu dilampirkan ke software bersama sertifikatnya.
> >
> > Pada sisi pengguna, berlangsung **verification process**. Sistem operasi memeriksa signature menggunakan **public key** publisher (yang terdapat di sertifikat). OS lalu memvalidasi **certificate chain** hingga ke sebuah **trusted root authority**—memastikan sertifikat memang dikeluarkan oleh CA yang dipercaya, bukan dibuat sendiri oleh penyerang. Terakhir, OS menghitung ulang hash dari kode saat ini dan mencocokkannya dengan hash yang didekripsi dari signature. Jika cocok, kode terbukti tidak diubah; jika tidak, kode dianggap telah dimodifikasi.
> >
> > Manfaat code signing meliputi: mengonfirmasi identitas publisher software, mendeteksi tampering atau injeksi malware sejak penandatanganan, membangun trust dan kepercayaan pengguna, mengurangi pesan peringatan saat instalasi, serta menjadi syarat wajib distribusi pada banyak platform (iOS, macOS, dan driver Windows). Perlu disadari bahwa keamanan keseluruhan bergantung pada kerahasiaan private key: sertifikat yang dicuri (stolen certificate) dapat disalahgunakan untuk menandatangani malware secara "sah" jika tidak dilindungi dengan baik.
> >
> > ```mermaid
> > flowchart LR
> >     C["Kode"] --> H["Hash kode<br/>(algoritma kriptografis)"]
> >     H --> E["Enkripsi hash dengan private key"]
> >     E --> S["Signature + sertifikat dilampirkan"]
> >     S --> V["Verifikasi: OS cek dengan public key"]
> >     V --> CH["Validasi certificate chain ke trusted root"]
> >     CH --> MM["Cocokkan hash dengan kondisi kode saat ini"]
> >     MM --> OK["Authentic &amp; integrity terjaga"]
> > ```
> >
> > ### Tamper Detection
> >
> > **Tamper detection** mencakup implementasi mekanisme untuk mengidentifikasi modifikasi tidak sah terhadap software dan merespons secara tepat. Berbeda dengan code signing yang umumnya diverifikasi sekali saat instalasi/peluncuran, tamper detection sering berjalan terus-menerus selama runtime untuk menangkap perubahan yang terjadi setelah program mulai berjalan—misalnya patch memori oleh cracker atau injeksi kode.
> >
> > Beberapa metode implementasi digunakan. **Checksum Verification** menghitung dan membandingkan nilai hash dari bagian-bagian kode untuk mendeteksi perubahan. **Self-Checking Code** membuat aplikasi memverifikasi integritasnya sendiri saat runtime, sehingga kode "menjaga dirinya sendiri". **Environmental Checks** mendeteksi lingkungan eksekusi yang tidak biasa (misalnya berjalan di dalam emulator, sandbox, atau virtual machine yang lazim dipakai analis). **Integrity Verification** memvalidasi struktur data kritis dan konfigurasi. **Runtime Memory Scanning** memonitor perubahan tak terduga pada memori, menangkap upaya patching yang terjadi langsung di RAM.
> >
> > Ketika tampering terdeteksi, tersedia beberapa **respons**: **graceful degradation** (menurunkan fungsionalitas secara bertahap), **alerting administrators** (memberi tahu admin), **self-termination** (program mengakhiri dirinya), **activating decoy features** (mengaktifkan fitur umpan untuk menyesatkan), dan **logging tamper attempts** (mencatat upaya tampering untuk analisis forensik). Sebagaimana pada anti-debugging, respons yang tidak langsung—seperti degradasi bertahap atau decoy—sering lebih sulit dilawan penyerang karena tidak segera mengungkap mekanisme deteksi.
> >
> > Kekuatan sebenarnya muncul dari **integrasi**. Tamper detection bekerja bersama **code signing** untuk proteksi menyeluruh: signing menjamin integritas saat distribusi, sementara tamper detection menjaga integritas saat runtime. Selain itu, mekanisme deteksinya dapat dikombinasikan dengan **obfuscation** untuk menyembunyikan mekanisme deteksi itu sendiri—sehingga penyerang tidak mudah menemukan dan menonaktifkan rutin pengecekan. Tamper detection umumnya merupakan bagian dari strategi keamanan aplikasi yang lebih besar, bukan solusi tunggal.

> [!cornell] #### Summary
>
> **Anti-debugging** mendeteksi dan merespons upaya debugging melalui **Timing Checks**, **Debugger Detection via API**, **Exception Handling**, **Self-Modifying Code**, dan **Hardware Breakpoint Detection**, dengan respons berupa terminasi, decoy code path, korupsi data, atau perlambatan eksekusi. **Code signing** memakai digital signature untuk memverifikasi authenticity dan integrity: developer memperoleh sertifikat dari CA, meng-hash kode, mengenkripsi hash dengan private key menjadi signature, lalu OS memverifikasi dengan public key, memvalidasi certificate chain ke trusted root, dan mencocokkan hash. **Tamper detection** menjaga integritas runtime via **Checksum Verification**, **Self-Checking Code**, **Environmental Checks**, **Integrity Verification**, dan **Runtime Memory Scanning**, dengan respons seperti graceful degradation, alert, self-termination, decoy, dan logging—terintegrasi erat dengan code signing dan obfuscation.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Di balik `IsDebuggerPresent`, Windows menyimpan flag `BeingDebugged` di **Process Environment Block (PEB)**, yang dapat dibaca langsung untuk menghindari pemanggilan API yang mudah di-hook. Teknik anti-debugging lain yang umum di lapangan mencakup pemeriksaan `NtGlobalFlag`, pengukuran selisih `rdtsc` (Read Time-Stamp Counter) untuk timing check presisi tinggi, serta `INT 3 / 0xCC` scanning untuk mendeteksi software breakpoint. Reverse engineer melawannya dengan plugin seperti **ScyllaHide** atau **TitanHide** yang menyembunyikan keberadaan debugger pada level kernel—ilustrasi nyata dari sifat "kucing-dan-tikus" proteksi software.
>
> Dalam code signing, hash kriptografis yang relevan adalah keluarga **SHA-2** (SHA-256 ke atas), karena SHA-1 sudah dianggap rentan terhadap collision. Aspek penting lainnya adalah **timestamping**: server timestamp tepercaya menandai *kapan* kode ditandatangani, sehingga signature tetap valid meski sertifikat kedaluwarsa setelah penandatanganan. Standar yang lebih kuat seperti **Extended Validation (EV) code signing** mensyaratkan private key disimpan di hardware (HSM atau token), mengurangi risiko pencurian sertifikat yang disinggung pada slide.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis program C kecil yang memanggil `IsDebuggerPresent` (atau membaca PEB) dan mencetak pesan berbeda saat dijalankan di bawah debugger vs normal. Uji dengan x64dbg.
> 2. Tandatangani sebuah skrip PowerShell atau executable dengan self-signed certificate, lalu amati bagaimana OS memperlakukannya, dan apa yang berubah saat satu byte file diubah setelah ditandatangani.
> 3. Implementasikan checksum self-check sederhana: program menghitung hash bagian kodenya sendiri saat startup dan menolak berjalan jika hash tidak cocok. Uji dengan mem-patch satu instruksi.
>
> #### Bacaan Lanjutan
> - Peter Ferrie — "The Ultimate Anti-Debugging Reference", katalog lengkap teknik anti-debugging.
> - Dokumentasi Microsoft Authenticode dan SignTool untuk detail praktik code signing di Windows.
> - OWASP Mobile — bagian Anti-Tampering & Anti-Reversing untuk pola tamper detection pada aplikasi mobile.
