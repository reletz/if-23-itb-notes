---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Proteksi Platform - Windows, Android, iOS, dan Steam
>
> > ## Questions/Cues
> >
> > - Mekanisme apa saja yang dipakai Windows untuk melindungi software?
> > - Bagaimana alur product activation Windows bekerja dan apa limitasinya?
> > - Bagaimana Android dan iOS melindungi aplikasi, dan apa perbedaannya?
> > - Bagaimana Steam melindungi game dari pembajakan dan cheating?
> > - Mengapa tidak ada proteksi yang sempurna ("raising the bar")?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W12 Reverse Engineering & Application Protection — bagian "Platform Protection: Windows, Android, iOS, Steam & Challenges")
>
> > ### How Windows Protects Software
> >
> > Windows menerapkan beberapa lapis proteksi yang saling melengkapi. **Product Activation** mengikat (bind) sebuah lisensi ke perangkat keras tertentu melalui aktivasi online atau telepon, sehingga satu lisensi tidak dapat dipakai bebas pada banyak mesin. **Code Signing** menegakkan digital signature untuk driver dan sebagian aplikasi—Windows menolak atau memperingatkan ketika kode tidak ditandatangani dengan benar, sehingga driver berbahaya sulit masuk ke kernel.
> >
> > Pada level hardware, **Trusted Platform Module (TPM)** dimanfaatkan untuk secure boot dan enkripsi **BitLocker**, memastikan integritas sistem sejak proses boot dan melindungi data pada disk yang terenkripsi. Di sisi deteksi ancaman, **Windows Defender & SmartScreen** mendeteksi serta memblokir malware yang dikenal maupun software tidak bertanda tangan (unsigned) yang berisiko. Terakhir, **Regular Updates** menyediakan patch keamanan secara berkala untuk menutup kerentanan yang ditemukan dari waktu ke waktu. Kombinasi proteksi hukum (lisensi) dan teknis (signing, TPM, Defender) inilah yang membuat ekosistem Windows relatif terjaga.
> >
> > ### Product Activation@Windows
> >
> > Alur **Product Activation** Windows dapat dijelaskan langkah demi langkah. Pengguna memasukkan **product key** yang unik. Sistem lalu menghasilkan **hardware ID** berdasarkan konfigurasi perangkat keras mesin tersebut. Keduanya—product key dan hardware ID—dikirim ke server Microsoft, yang kemudian memeriksa validitas key serta riwayat penggunaannya.
> >
> > Fitur keamanannya mencakup: mengikat lisensi ke perangkat keras spesifik, membatasi jumlah aktivasi per key, serta mendeteksi dan memblokir pirated key yang sudah dikenal. Manfaatnya jelas: mengurangi pembajakan dan melindungi IP Microsoft, sekaligus memastikan pengguna sah memperoleh update dan dukungan resmi.
> >
> > Namun mekanisme ini memiliki **limitasi**. Aktivasi dapat menjadi sasaran **crack atau keygen**—program yang menghasilkan key palsu atau mem-bypass pemeriksaan aktivasi sepenuhnya. Selain itu, pengikatan ke hardware dapat menyusahkan pengguna sah ketika mereka mengganti komponen perangkat keras, sehingga aktivasi harus diulang. Inilah dilema klasik proteksi: semakin ketat barrier, semakin besar pula friksi yang dirasakan pengguna legitim.
> >
> > ```mermaid
> > flowchart LR
> >     K["User masukkan product key"] --> ID["Sistem buat hardware ID"]
> >     ID --> SRV["Kirim ke server Microsoft"]
> >     SRV --> CHK["Cek validitas &amp; jumlah aktivasi"]
> >     CHK --> OK["Aktivasi berhasil<br/>(lisensi terikat hardware)"]
> >     CHK --> NO["Blokir pirated key"]
> > ```
> >
> > ### How Android Protects Apps
> >
> > Android mengandalkan kombinasi isolasi, pemindaian, dan kebijakan. **App Sandboxing** menjalankan setiap aplikasi dalam proses dan user space-nya sendiri, membatasi akses ke data aplikasi lain—fondasi model keamanan Android yang berakar pada isolasi tingkat sistem operasi. **Google Play Protect** memindai aplikasi untuk mendeteksi malware, baik sebelum maupun setelah instalasi.
> >
> > Selain itu, **Code Signing** bersifat wajib: semua aplikasi harus ditandatangani secara digital oleh developer, sehingga identitas pembuat dan integritas paket dapat diverifikasi. **Obfuscation** dilakukan developer menggunakan tool seperti **ProGuard** untuk mempersulit reverse engineering kode mereka. Terakhir, **Play Store Policies** memberi Google kemampuan untuk menonaktifkan atau menghapus aplikasi berbahaya dari jarak jauh (remote disable/remove), memberikan kontrol pasca-distribusi atas aplikasi yang terbukti melanggar.
> >
> > ### How iOS & Apple App Store Protect
> >
> > iOS dikenal dengan model proteksi yang lebih ketat dan tertutup. **App Review Process** memastikan setiap aplikasi ditinjau oleh Apple sebelum dipublikasikan, menyaring aplikasi berbahaya atau melanggar kebijakan sejak awal. **Code Signing & Entitlements** mewajibkan aplikasi ditandatangani dengan sertifikat Apple Developer yang valid; entitlements membatasi kapabilitas apa saja yang boleh diakses aplikasi, menerapkan prinsip least privilege.
> >
> > **App Sandboxing** menerapkan isolasi ketat terhadap data dan proses aplikasi. Pada sisi hardware, **Secure Enclave** menyediakan penyimpanan kunci yang hardware-backed—kunci kriptografis tersimpan di koprosesor terpisah yang tidak dapat diakses langsung oleh sistem utama, melindungi data sensitif seperti biometrik. Terakhir, **Remote App Removal** memungkinkan Apple menonaktifkan atau menghapus aplikasi yang melanggar kebijakan dari jarak jauh. Dibanding Android, iOS lebih bergantung pada kontrol terpusat (review wajib + ekosistem tertutup), yang menghasilkan permukaan serang lebih kecil dengan harga fleksibilitas yang berkurang.
> >
> > ### How Steam Protects Games
> >
> > Steam melindungi game melalui beberapa mekanisme. **Steam DRM (Digital Rights Management)** mengharuskan game memerlukan autentikasi melalui Steam client untuk dapat diluncurkan, mengikat eksekusi game ke platform. **VAC (Valve Anti-Cheat)** mendeteksi dan mem-ban pemain yang curang pada game multiplayer, menjaga integritas pengalaman kompetitif.
> >
> > Selain itu, **Encrypted Game Files** membuat file game terenkripsi dan terikat ke akun pengguna, sehingga sekadar menyalin file tidak cukup untuk menjalankan game. **Frequent Updates** menghadirkan pembaruan otomatis untuk menambal kerentanan dan exploit secara cepat. Terakhir, **Account Binding** mengikat game ke akun Steam pengguna, mencegah sharing dan pembajakan yang mudah. Pendekatan Steam menunjukkan pergeseran dari proteksi murni client-side menuju proteksi berbasis layanan (server + akun), serupa dengan langkah Adobe ke model subscription.
> >
> > ### Challenges in Application Protection
> >
> > Terlepas dari beragam mekanisme di atas, terdapat tantangan fundamental. Penyerang **terus-menerus mengembangkan teknik reverse engineering baru**, sehingga proteksi yang efektif hari ini bisa usang esok—sebuah perlombaan tanpa garis akhir. Selain itu, proteksi **menambah cost dan kompleksitas** bagi developer: implementasi DRM, signing, dan anti-tamper memerlukan waktu, biaya, serta dapat memperkenalkan bug atau friksi bagi pengguna sah.
> >
> > Kesimpulan utamanya adalah: **no protection is perfect**. Tidak ada proteksi yang sempurna; intinya adalah **raising the bar**—menaikkan ambang kesulitan sehingga usaha membongkar proteksi menjadi tidak sebanding dengan keuntungannya. Tujuan realistis bukan menghentikan semua serangan, melainkan membuat pembajakan dan tampering cukup mahal, lambat, dan berisiko sehingga mayoritas penyerang menyerah. Inilah filosofi yang menyatukan seluruh teknik proteksi—dari obfuscation, packing, anti-debugging, code signing, hingga proteksi platform.

> [!cornell] #### Summary
>
> **Windows** melindungi software lewat Product Activation (bind lisensi ke hardware), Code Signing driver, TPM untuk secure boot & BitLocker, Windows Defender & SmartScreen, serta regular updates; alur aktivasinya mengirim product key + hardware ID ke server Microsoft, namun rentan terhadap crack/keygen. **Android** memakai app sandboxing, Google Play Protect, code signing wajib, obfuscation ProGuard, dan Play Store policy untuk remote disable. **iOS** menambahkan app review wajib, code signing & entitlements, sandboxing, Secure Enclave hardware-backed, dan remote removal dalam ekosistem tertutup. **Steam** mengamankan game via Steam DRM, VAC anti-cheat, encrypted game files, frequent updates, dan account binding. Tantangan utamanya adalah penyerang terus berinovasi dan proteksi menambah cost—karena **no protection is perfect**, tujuannya adalah "raising the bar".

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Pada Windows modern, secure boot dan TPM kini menjadi syarat Windows 11, dan fitur seperti **Virtualization-Based Security (VBS)** serta **Hypervisor-Protected Code Integrity (HVCI)** mengisolasi kredensial dan memvalidasi integritas kode di tingkat hypervisor—lapisan jauh di atas signing biasa. Di sisi DRM game, **Denuvo Anti-Tamper** adalah contoh proteksi komersial terkenal yang membungkus eksekutabel game dengan pemeriksaan integritas berkala; ia kerap memicu perdebatan komunitas karena dampaknya pada performa, ilustrasi nyata dari "proteksi menambah cost dan kompleksitas" yang disebut slide.
>
> Perbedaan filosofi Android vs iOS menarik dianalisis: Android bersifat lebih terbuka (sideloading diizinkan, sehingga sandboxing dan Play Protect menjadi krusial sebagai pertahanan), sedangkan iOS bersifat tertutup (sideloading dibatasi, review wajib jadi gerbang utama). Fenomena **jailbreak** (iOS) dan **rooting** (Android) menunjukkan bahwa bahkan proteksi platform terkuat pun dapat ditembus—sekali lagi menegaskan prinsip "no protection is perfect". Regulasi seperti **EU Digital Markets Act** kini bahkan memaksa Apple membuka sideloading, mengubah lanskap proteksi platform secara fundamental.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bandingkan dalam tabel mekanisme proteksi Windows, Android, iOS, dan Steam berdasarkan dimensi: legal vs teknis, client-side vs server-side, hardware-backed vs software-only.
> 2. Teliti cara kerja Secure Enclave (atau Android StrongBox/Titan M) dan tulis ringkasan bagaimana hardware-backed key storage meningkatkan keamanan dibanding software keystore.
> 3. Analisis sebuah kasus jailbreak/root publik: identifikasi lapisan proteksi mana yang ditembus dan bagaimana vendor merespons pada update berikutnya.
>
> #### Bacaan Lanjutan
> - Dokumentasi Apple Platform Security Guide — penjelasan resmi Secure Enclave, code signing, dan sandboxing iOS.
> - Android Security Documentation (source.android.com) — bagian Application Sandbox & App Signing.
> - Microsoft Docs — "Trusted Platform Module Technology Overview" dan dokumentasi BitLocker.
> - Artikel teknis tentang Denuvo dan Steamworks DRM untuk memahami proteksi game modern.
