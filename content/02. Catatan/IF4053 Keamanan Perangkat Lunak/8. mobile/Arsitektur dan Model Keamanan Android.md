---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Arsitektur dan Model Keamanan Android
>
> > ## Questions/Cues
> >
> > - Apa saja lapisan dalam Android software stack dan bagaimana hubungannya?
> > - Apa perbedaan mendasar antara Dalvik VM dan ART?
> > - Mengapa Android dibangun di atas Linux Kernel?
> > - Bagaimana asumsi "each component assumes components below are secured" memengaruhi desain keamanan?
> > - Apa empat pilar Android Security Model dan tiga Security Goals-nya?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W10 Mobile Security — bagian "Android Security Basics & Architecture")
>
> > ### Android Software Stack: Dari Hardware hingga IDE
> >
> > Android dibangun sebagai *stack* berlapis. Pada lapisan paling bawah terdapat **hardware**: perangkat kompatibel Android yang kini meliputi smartphone, TV, mobil, dan jam tangan. Di atasnya berjalan **OS Android yang berbasis Linux**, yang memanfaatkan kernel Linux untuk layanan sistem inti seperti manajemen proses dan memori. Lapisan berikutnya berisi **low-level libraries** yang ditulis dalam C/C++, mencakup **OpenGL** (rendering 3D), **SQLite** (basis data embedded), pustaka **media**, serta **SSL & WebKit** (komunikasi aman dan rendering web).
> >
> > Di atas pustaka tersebut berdiri **Android Application Framework (AAF)**, yang menyediakan API tingkat tinggi bagi pengembang untuk membangun aplikasi—mengelola *activity*, *content provider*, *resource*, dan *notification*. Framework ini menekankan **kesetaraan antar aplikasi** (tidak ada aplikasi istimewa), **paralelisme** (aplikasi berjalan bersamaan), dan kemudahan menyematkan browser web. Untuk pengembangan, Android menyediakan **IDE** yang awalnya berbasis Eclipse dan kini bergeser ke **Android Studio** (berbasis IntelliJ).
> >
> > Visualisasi lapisan-lapisan ini membantu memahami prinsip keamanannya:
> >
> > ```mermaid
> > flowchart TB
> >     A["Aplikasi (Java/Kotlin)"] --> F["Application Framework (AAF)"]
> >     F --> L["Libraries / ART &amp; Core Libraries<br/>(OpenGL, SQLite, SSL, WebKit, Media)"]
> >     L --> K["Linux Kernel<br/>(Application Sandbox di sini)"]
> >     K --> H["Hardware<br/>(smartphone, TV, mobil, watch)"]
> > ```
> >
> > ### Dalvik VM vs Android Runtime (ART)
> >
> > Aplikasi Android secara tradisional ditulis dalam **Java**, lalu dikompilasi ke format **Dalvik VM** dengan ekstensi **.dex** (atau .odex). **Dalvik** adalah *virtual machine* berbasis register yang dioptimasi untuk perangkat mobile dengan memori rendah; setiap aplikasi berjalan pada **satu instance VM** tersendiri. Tool **DX** mengonversi *class* Java menjadi format .dex. Karakteristik kunci Dalvik adalah penggunaan kompilasi **JIT (Just-In-Time)**, di mana bytecode diterjemahkan ke kode mesin saat runtime.
> >
> > **ART (Android Runtime)** diperkenalkan secara eksperimental pada rilis **4.4 KitKat** dan menggantikan Dalvik secara penuh sejak **5.0 Lollipop**. Perbedaan fundamentalnya: ART mengompilasi *intermediate language* (Dalvik bytecode) menjadi **biner yang bergantung sistem (system-dependent binary)** menggunakan pendekatan **AOT (Ahead-Of-Time)**—seluruh kode aplikasi **pra-kompilasi saat instalasi**, hanya sekali. Hasilnya, eksekusi runtime lebih cepat dan hemat baterai dibanding Dalvik yang mengompilasi berulang saat runtime, dengan trade-off waktu instalasi lebih lama dan ukuran biner lebih besar.
> >
> > ### Linux Kernel dan Core Libraries
> >
> > Android hanya menggunakan **bagian "Kernel"** dari Linux, dengan kebutuhan khusus pada **power management**, **memory management**, dan **runtime environment**. Versi awal berbasis Linux **2.6.x** untuk layanan sistem inti, sementara KitKat menjalankan kernel **3.10**. Kernel ini juga membawa komponen spesifik seperti **bluez** untuk dukungan Bluetooth dan **wpa_supplicant** untuk enkripsi WiFi. Pemilihan Linux sebagai fondasi memberikan model izin berbasis pengguna, isolasi proses, dan manajemen memori yang sudah teruji.
> >
> > **Core Libraries** menyediakan fungsionalitas bahasa pemrograman Java. Setiap aplikasi Android berjalan dalam **proses tersendiri** dengan **instance Dalvik VM-nya sendiri**—sebuah VM berbasis register yang bebas lisensi, dioptimasi untuk kebutuhan memori rendah, dan mengeksekusi file dalam format **DalvikExecutable (.dex)**. Selain itu, lapisan pustaka mencakup **Libc** (pustaka C standar), **SSL**, **SGL** (engine gambar 2D), **OpenGL|ES** (3D), **Media Framework**, **SQLite**, **WebKit** (kernel browser), **FreeType** (bitmap & vektor), dan **SurfaceManager** (pengelola jendela antar aplikasi).
> >
> > ### Prinsip Software Stack dan Application Sandbox
> >
> > Desain keamanan Android berpijak pada prinsip berlapis: **"each component assumes that the components below are properly secured"**—setiap komponen mengasumsikan komponen di bawahnya sudah aman. Konsekuensinya, **seluruh kode di atas Linux Kernel dibatasi oleh Application Sandbox**, dan **Linux kernel-lah yang bertanggung jawab melakukan sandboxing aplikasi**. Aplikasi diperlakukan sebagai **"mutually distrusting principals"**—prinsipal yang saling tidak memercayai—dengan akses default hanya ke datanya sendiri.
> >
> > Karena terisolasi, aplikasi dalam sandbox hanya dapat berkomunikasi dengan aplikasi lain melalui mekanisme terkontrol: **Intent** (pesan), **IPC (Inter-Process Communication)**, dan **ContentProvider**. Untuk **keluar dari sandbox** dan mengakses sumber daya di luar lingkupnya, aplikasi memerlukan **permission** yang dideklarasikan secara eksplisit. Model ini memastikan bahwa kompromi satu aplikasi tidak otomatis menjalar ke aplikasi atau data lain.
> >
> > ### Android Security Model dan Security Goals
> >
> > **Android Security Model** bertumpu pada empat pilar utama. Pertama, **application sandboxing**—isolasi tiap aplikasi pada level kernel. Kedua, **permission-based access control**—akses ke sumber daya sensitif harus diberikan secara eksplisit. Ketiga, **SELinux enforcement**—*Mandatory Access Control* yang memberlakukan kebijakan keamanan di tingkat kernel, membatasi apa yang boleh dilakukan proses meski berjalan dengan privilege tertentu. Keempat, **Verified Boot dan hardware-backed security**—memastikan integritas sistem operasi sejak boot dan menyimpan kunci kriptografi pada perangkat keras aman.
> >
> > Ketiga **Security Goals** Android menjadi acuan seluruh desain: **melindungi data pengguna**, **melindungi sumber daya sistem** (perangkat keras dan perangkat lunak), dan **menyediakan isolasi aplikasi**. Fondasi keamanan Android secara keseluruhan mencakup isolasi aplikasi dan kewajiban permission, sandbox wajib untuk semua aplikasi, IPC antar-proses yang aman, permission bawaan sistem maupun yang didefinisikan pengguna, serta penandatanganan aplikasi (*application signing*). Di sisi layanan, Google melengkapinya dengan **Play Integrity API**, **Safe Browsing API**, **Verify Apps**, **SafetyNet**, dan **Android Device Manager**.

> [!cornell] #### Summary
>
> Android adalah *stack* berlapis: **hardware → OS berbasis Linux → low-level libraries (OpenGL, SQLite, SSL, WebKit) → Application Framework → IDE Android Studio**. Aplikasi dikompilasi ke **.dex**; runtime bergeser dari **Dalvik (JIT)** ke **ART (AOT, pra-kompilasi saat instalasi)** sejak Lollipop. Kernel Linux menyediakan model izin, isolasi proses, dan manajemen memori; **Core Libraries** menyediakan fungsionalitas Java dengan tiap aplikasi punya proses dan VM sendiri. Prinsip **"each component assumes components below are secured"** menempatkan **Application Sandbox** di kernel, memperlakukan aplikasi sebagai **mutually distrusting principals** yang hanya berkomunikasi via **Intent/IPC/ContentProvider** dan butuh **permission** untuk keluar sandbox. **Android Security Model** berpilar pada sandboxing, permission, **SELinux**, dan **Verified Boot/hardware-backed security**, dengan tujuan melindungi data pengguna, sumber daya sistem, dan menjamin isolasi aplikasi.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Sejak Android 7.0, ART mengadopsi pendekatan **hybrid JIT/AOT dengan profile-guided compilation**: aplikasi awalnya berjalan via interpreter+JIT, lalu metode "panas" yang sering dieksekusi dikompilasi AOT saat perangkat idle—menggabungkan keunggulan instalasi cepat (Dalvik) dan eksekusi cepat (ART awal). Pada level IPC, semua Intent dan ContentProvider sebenarnya melewati driver kernel **Binder**, yang memvalidasi UID/PID pemanggil sehingga server dapat memberlakukan permission terhadap klien. Untuk **hardware-backed security**, perangkat modern menggunakan **TrustZone (TEE)** atau **Titan M / StrongBox secure element** guna menyimpan kunci di luar jangkauan OS utama, sehingga kompromi kernel sekalipun tidak langsung membocorkan kunci.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bongkar satu APK dengan **apktool** dan **jadx**, lalu telusuri bagaimana kode .dex direpresentasikan; bandingkan ukuran dan struktur sebelum/sesudah kompilasi.
> 2. Jalankan `getenforce` dan telusuri kebijakan **SELinux** pada emulator Android; eksperimen dengan domain `untrusted_app` untuk melihat batasan yang diberlakukan.
> 3. Petakan empat pilar Android Security Model ke ancaman konkret dari OWASP Mobile Top 10 dan jelaskan pilar mana yang memitigasi tiap risiko.
>
> #### Bacaan Lanjutan
> - "Android Security Internals" oleh Nikolay Elenkov, No Starch Press.
> - Android Platform Security Model (Mayrhofer et al.) — paper resmi Google.
> - Dokumentasi resmi: https://source.android.com/docs/security
