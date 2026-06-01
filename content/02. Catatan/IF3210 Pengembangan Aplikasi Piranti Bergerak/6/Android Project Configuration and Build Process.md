---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Android Project Configuration and Build Process
>
> > ## Questions/Cues
> >
> > - Apa peran file build.gradle dalam proyek Android?
> > - Bagaimana menentukan versi SDK minimum dan target?
> > - Bagaimana struktur direktori proyek Android disusun?
> > - Apa fungsi Gradle dalam proses build Android?
> > - Bagaimana mengelola dependensi eksternal dalam proyek?
> > - Apa perbedaan compileSdkVersion dan targetSdkVersion?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 41-49, 79-86)
> > - Android Development with Kotlin (Slide 22)
> > - Android Development with Kotlin (Slide 47)
> > - Android Development with Kotlin (Slide 81-86)
>
> > ### Struktur Proyek Android
> >
> > Proyek Android di Android Studio memiliki struktur direktori yang terorganisir. Folder utama berisi modul aplikasi (`app`), file konfigurasi Gradle (`build.gradle`), dan skrip wrapper Gradle (`gradlew`). Di dalam modul `app`, terdapat direktori `src` yang memisahkan kode sumber (`main/java`), sumber daya (`res`), dan file manifes (`AndroidManifest.xml`).
> >
> > Contoh struktur dasar:
> >
> > ```
> >
> > MyApplication
> >
> > ├── app
> >
> > │   └── src
> >
> > │       ├── main
> >
> > │       │   ├── java      # Kode sumber Kotlin/Java
> >
> > │       │   ├── res       # Layout, gambar, string
> >
> > │       │   └── AndroidManifest.xml
> >
> > ├── build.gradle          # Konfigurasi level proyek
> >
> > └── gradlew               # Skrip eksekusi Gradle
> >
> > ```
> >
> > Setiap direktori `res` memiliki subfolder khusus seperti `layout` untuk XML UI, `drawable` untuk aset gambar, dan `values` untuk konstanta string/color.
> >
> > ### Konfigurasi Versi SDK
> >
> > File `build.gradle (Module: app)` menentukan tiga parameter SDK penting:
> >
> > 1. `compileSdkVersion`: Versi SDK untuk kompilasi (harus versi terbaru)
> > 2. `minSdkVersion`: Versi minimum OS yang didukung
> > 3. `targetSdkVersion`: Versi OS yang dioptimalkan
> >
> > Contoh konfigurasi:
> >
> > ```gradle
> >
> > android {
> >
> > compileSdkVersion 33
> >
> > defaultConfig {
> >
> > minSdkVersion 21   // Android 5.0 Lollipop
> >
> > targetSdkVersion 33 // Android 13
> >
> > }
> >
> > }
> >
> > ```
> >
> > Relasi versi harus memenuhi: `minSdkVersion ≤ targetSdkVersion ≤ compileSdkVersion`. Versi SDK yang lebih tinggi memungkinkan penggunaan fitur terbaru tetapi mengurangi kompatibilitas dengan perangkat lama.
> >
> > ### Sistem Build dengan Gradle
> >
> > Gradle adalah sistem otomasi build yang mengelola:
> >
> > - Kompilasi kode dan sumber daya
> > - Pengemasan APK/AAB
> > - Manajemen dependensi
> > - Tugas pengujian
> >
> > Ada dua jenis file `build.gradle`:
> >
> > 1. **Level Proyek**: Mengkonfigurasi repositori dan plugin
> >
> > ```gradle
> >
> > buildscript {
> >
> > repositories {
> >
> > google()    // Repositori plugin Android
> >
> > mavenCentral()
> >
> > }
> >
> > dependencies {
> >
> > classpath 'com.android.tools.build:gradle:7.4.2'
> >
> > }
> >
> > }
> >
> > ```
> >
> > 2. **Level Modul**: Mengatur SDK, versi aplikasi, dan dependensi
> >
> > ### Manajemen Dependensi
> >
> > Dependensi eksternal dideklarasikan di `build.gradle (Module: app)` dalam blok `dependencies`. Tiga jenis dependensi utama:
> >
> > 1. Implementasi lokal: `implementation files('libs/local-library.jar')`
> > 2. Modul lokal: `implementation project(':mylibrary')`
> > 3. Repositori eksternal: `implementation 'com.google.android.material:material:1.9.0'`
> >
> > Contoh:
> >
> > ```gradle
> >
> > dependencies {
> >
> > implementation 'androidx.core:core-ktx:1.10.1'  // Library AndroidX
> >
> > testImplementation 'junit:junit:4.13.2'          // Testing
> >
> > androidTestImplementation 'androidx.test.ext:junit:1.1.5'
> >
> > }
> >
> > ```
> >
> > Gradle secara otomatis mendownload dependensi dari repositori yang dikonfigurasi (Google's Maven, Maven Central).
> >
> > ### Proses Build Android
> >
> > Proses build mengubah kode sumber menjadi APK melalui tahapan:
> >
> > 1. Kompilasi sumber daya (XML, gambar) ke format biner
> > 2. Kompilasi kode Kotlin/Java ke bytecode DEX
> > 3. Penggabungan aset dan kode ke APK mentah
> > 4. Penandatanganan dengan kunci digital
> > 5. Optimasi dengan alat seperti R8/ProGuard
> >
> > Perintah Gradle umum:
> >
> > - `./gradlew assembleDebug`: Membuat APK debug
> > - `./gradlew installDebug`: Menginstal APK ke perangkat
> > - `./gradlew clean`: Menghapus output build sebelumnya

> [!cornell] #### Summary
>
> **Konfigurasi proyek Android** melibatkan struktur direktori spesifik dengan file manifes, kode sumber, dan sumber daya terpisah. **Gradle** berfungsi sebagai tulang punggung proses build dengan mengelola dependensi, versi SDK (`minSdkVersion`, `targetSdkVersion`, `compileSdkVersion`), dan tugas kompilasi. **Manajemen dependensi** dilakukan melalui deklarasi dalam `build.gradle` yang terhubung ke repositori eksternal. Proses build melalui tahapan kompilasi sumber daya, konversi kode ke DEX, pengemasan APK, dan penandatanganan untuk menghasilkan aplikasi yang dapat dijalankan di perangkat Android.

> [!ad-libitum]- Additional Information
>
> #### Optimasi Proses Build
>
> Untuk mempercepat build pada proyek besar, gunakan:
>
> - **Build Cache**: Mengaktifkan `org.gradle.caching=true` di `gradle.properties`
> - **Konfigurasi On-Demand**: Hanya mengkonfigurasi modul yang diperlukan
> - **Gradle Daemon**: Proses latar belakang yang mengurangi waktu inisialisasi
> - **Parallel Execution**: `org.gradle.parallel=true` untuk tugas independen
>
> #### Multidex dan Limit Metode
>
> Aplikasi dengan >65.536 metode memerlukan konfigurasi multidex:
>
> ```gradle
>
> android {
>
> defaultConfig {
>
> multiDexEnabled true
>
> }
>
> }
>
> dependencies {
>
> implementation 'androidx.multidex:multidex:2.0.1'
>
> }
>
> ```
>
> #### Varians Build dan Flavors
>
> Membuat varian berbeda dari aplikasi yang sama:
>
> ```gradle
>
> flavorDimensions "version"
>
> productFlavors {
>
> demo {
>
> dimension "version"
>
> applicationIdSuffix ".demo"
>
> }
>
> full {
>
> dimension "version"
>
> applicationIdSuffix ".full"
>
> }
>
> }
>
> ```
>
> #### Versi Gradle dan Kompatibilitas
>
> Hubungan versi Android Gradle Plugin (AGP) dengan Gradle:
>
> | AGP Version | Gradle Version |
>
> |-------------|----------------|
>
> | 7.0.x       | 7.0+           |
>
> | 7.1.x       | 7.2+           |
>
> | 7.2.x       | 7.3.3+         |
>
> | 7.3.x       | 7.4+           |
>
> | 7.4.x       | 7.5+           |
>
> #### Self-Exploration Projects
>
> 1. Bandingkan waktu build dengan berbagai konfigurasi cache
> 2. Buat flavor berbeda dengan ID aplikasi dan sumber daya unik
> 3. Implementasikan continuous integration dengan GitHub Actions
>
> #### Tools dan Resources
>
> - **Build Analyzer**: Analisis kinerja build di Android Studio
> - **Gradle Build Scan**: Laporan detail proses build
> - **AndroidX Documentation**: Daftar library resmi
> - **MVN Repository**: Pencarian dependensi eksternal
>
> #### Further Reading
>
> - "Gradle for Android" oleh Kevin Pelgrims
> - "Android Studio 4.1 Development Essentials" oleh Neil Smyth
> - Dokumentasi Resmi Android Gradle: https://developer.android.com/studio/build
> - Plugin Gradle Esensial: https://plugins.gradle.org
> - Konvensi Build Android: https://developer.android.com/build