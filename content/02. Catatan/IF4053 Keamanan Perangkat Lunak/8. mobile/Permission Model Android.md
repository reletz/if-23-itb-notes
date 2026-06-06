---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Permission Model Android
>
> > ## Questions/Cues
> >
> > - Bagaimana aplikasi mendeklarasikan permission yang dibutuhkannya?
> > - Mengapa permission diminta saat runtime, bukan saat instalasi?
> > - Apa trade-off antara granularity dan understandability pada ~194 permission?
> > - Apa saja best practice dalam mengelola permission?
> > - Bagaimana update aplikasi dapat menyebabkan privilege escalation?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W10 Mobile Security — bagian "Permission Model")
>
> > ### Deklarasi Permission dan Manifest XML
> >
> > Di Android, **setiap aplikasi berjalan sebagai pengguna (user) tersendiri**. Kecuali pengembang secara eksplisit mengekspos file ke aplikasi lain, **file yang dibuat satu aplikasi tidak dapat dibaca atau diubah aplikasi lain**. Untuk keluar dari batas ini dan mengakses sumber daya bersama, aplikasi harus **mendeklarasikan permission yang dibutuhkannya**—misalnya menggunakan internet, menulis file lokal, melihat kontak, menggunakan Bluetooth, mengakses lokasi GPS, atau mengirim SMS.
> >
> > Deklarasi ini dilakukan melalui **kontrol akses fine-grained pada file Manifest XML**, dengan kemampuan permission spesifik per file/URL. Contoh deklarasi sederhana:
> >
> > ```
> > <manifest xmlns:android="http://schemas.android.com/apk/res/android"
> >     package="com.android.app.myapp" >
> >     <uses-permission android:name="android.permission.RECEIVE_SMS" />
> >     ...
> > </manifest>
> > ```
> >
> > Permission pada dasarnya melindungi dua hal: **restricted data**—seperti *system state* dan informasi kontak pengguna; dan **restricted actions**—seperti menghubungkan ke perangkat yang dipasangkan (paired device) dan merekam audio. Pengguna **harus memberikan izin secara manual** untuk tindakan-tindakan tersebut.
> >
> > ### Runtime Permission, Whitelist Model, dan Granularity
> >
> > Filosofi permission Android menekankan untuk **meminta saat runtime jika memungkinkan—bukan saat instalasi (ask at runtime, not install time)**. Pendekatan ini menerapkan **whitelist model**: **berikan akses minimal secara default**, lalu izinkan akses ke sumber daya hanya setelah pengguna menyetujuinya. Dengan demikian, pengguna melihat permintaan izin dalam konteks tindakan yang sedang berlangsung, sehingga keputusannya lebih bermakna.
> >
> > Dua prinsip desain antarmuka melengkapi ini: **ajukan lebih sedikit pertanyaan kepada pengguna (ask users less questions)** dan **buat pertanyaan lebih mudah dipahami (make questions more understandable)**. Namun, Android memiliki sekitar **194 permission**, yang menciptakan trade-off klasik: **lebih banyak permission ⇒ granularity lebih tinggi** (kontrol lebih halus), tetapi **lebih sedikit ⇒ understandability lebih baik** (pengguna lebih mudah memahami). Menyeimbangkan keduanya adalah tantangan desain utama—terlalu granular membuat pengguna kewalahan, terlalu kasar membuat permission memberi akses berlebih.
> >
> > ### Best Practices dalam Mengelola Permission
> >
> > Sejumlah praktik terbaik direkomendasikan untuk pengembang. Pertama, **minimalkan jumlah permission yang diminta** dan hanya minta jika diperlukan oleh tugas pengguna tertentu. Kedua, **definisikan sesedikit mungkin permission** sambil tetap memenuhi kebutuhan keamanan. Ketiga, **transparan kepada pengguna** agar mereka memahami data apa yang digunakan aplikasi dan mengapa. Keempat, **berikan kontrol penuh kepada pengguna** untuk *granting/revoking/denying* permission.
> >
> > Praktik teknis lainnya meliputi: **akses permission fine-grained saat runtime**, **permission hanya digunakan pada default handler**, **batasi interaksi dengan aplikasi lain**, dan **gunakan Intent (jika memungkinkan) untuk menunda permission**—misalnya operasi R/W Contact dapat didelegasikan via Intent sehingga aplikasi tidak perlu memegang permission kontak. Aplikasi juga harus **menangani pencabutan/penolakan permission secara graceful (gracefully handle permission revocation/denial)** agar tidak crash.
> >
> > Lebih lanjut, gunakan **user-granted permissions** untuk membatasi akses ke fitur sistem dan data pengguna, serta **application-defined permissions** untuk mengontrol data aplikasi per-aplikasi. Terapkan **signature-based permissions** (hanya aplikasi dengan tanda tangan yang cocok yang memperoleh izin). Untuk lokasi, **batasi akses**: hati-hati dengan **background access to location**, **minta COARSE location jika memungkinkan**, dan ingat bahwa akses jaringan terkadang memerlukan akses lokasi.
> >
> > ### Problems with Android
> >
> > Meski model permission Android kuat secara konsep, implementasinya menghadapi masalah praktis. **Aplikasi dapat meminta terlalu banyak permission**, sementara **pengguna tidak benar-benar memahami permission**. Akibatnya, **pengguna kewalahan dan sekadar mengklik "Yes"**—dan begitu disetujui, **aplikasi kini dapat melakukan hampir apa saja**. Inilah celah terbesar: keputusan keamanan yang seharusnya melindungi pengguna justru dibuat tanpa pemahaman.
> >
> > Masalah lain adalah **update aplikasi dapat mengubah permission-nya**—contohnya update aplikasi Facebook yang pernah dilaporkan menambah permission baru. Karena **pengguna cenderung mengklik "Yes" jika sudah memercayai aplikasi**, update semacam ini membuka jalan bagi **privilege escalation**: aplikasi yang awalnya tidak berbahaya perlahan memperoleh hak akses yang jauh lebih luas. Terakhir, ada **spammy apps** yang **menolak upaya uninstall**, **menampilkan iklan yang menyerupai UI sistem/OS**, **mengungkap atau merusak data pribadi pengguna**, dan **menyamar sebagai pengguna (impersonate)**. Kombinasi masalah ini menunjukkan bahwa keamanan teknis saja tidak cukup tanpa literasi pengguna.

> [!cornell] #### Summary
>
> Model permission Android mewajibkan aplikasi **mendeklarasikan permission** yang dibutuhkan dalam **Manifest XML** (mis. `uses-permission`) untuk mengakses **restricted data** dan **restricted actions**. Filosofinya: **minta saat runtime, bukan instalasi**, dengan **whitelist model** dan akses minimal default. Dari ~**194 permission** muncul trade-off **granularity vs understandability**. Best practice mencakup minimalisasi permission, transparansi, kontrol penuh pengguna, runtime fine-grained, signature-based permission, pembatasan lokasi (COARSE/background), penggunaan **Intent untuk menunda permission**, dan penanganan pencabutan secara graceful. Masalah praktis tetap ada: aplikasi meminta terlalu banyak izin, pengguna tak paham dan mengklik **"Yes"**, **update mengubah permission** memicu **privilege escalation**, serta keberadaan **spammy apps** yang menolak uninstall dan menyalahgunakan data.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Android mengelompokkan permission ke dalam tingkat proteksi: **normal** (otomatis diberikan, risiko rendah seperti `INTERNET`), **dangerous** (memerlukan persetujuan runtime, seperti kamera/lokasi/kontak), dan **signature** (hanya untuk aplikasi yang ditandatangani kunci yang sama). Sejak Android 6.0 (Marshmallow) barulah dangerous permission benar-benar diminta saat runtime; sebelumnya semua diberikan saat instalasi—konteks historis yang menjelaskan mengapa slide menekankan "ask at runtime". Android 10+ menambah opsi **"Allow only while using the app"** dan **one-time permission**, sementara Android 11 memperkenalkan **auto-reset permission** untuk aplikasi yang lama tak dipakai. Untuk lokasi, pemisahan `ACCESS_COARSE_LOCATION` vs `ACCESS_FINE_LOCATION` dan permission `ACCESS_BACKGROUND_LOCATION` terpisah adalah respons langsung terhadap penyalahgunaan pelacakan lokasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis manifest beberapa aplikasi populer dengan `aapt dump permissions` atau MobSF; identifikasi aplikasi yang meminta permission berlebih (over-privileged) relatif terhadap fungsinya.
> 2. Bangun aplikasi demo yang meminta lokasi via Intent ke aplikasi peta eksternal, demonstrasikan pola "defer permission" sehingga aplikasi sendiri tidak perlu permission lokasi.
> 3. Telusuri changelog satu aplikasi lintas beberapa versi dan dokumentasikan bagaimana permission-nya berubah—kaitkan dengan risiko privilege escalation.
>
> #### Bacaan Lanjutan
> - Felt et al., "Android Permissions Demystified" (CCS 2011) — studi empiris over-privilege.
> - Dokumentasi resmi: https://developer.android.com/guide/topics/permissions/overview
> - "Android Permissions: User Attention, Comprehension, and Behavior" (SOUPS 2012).
