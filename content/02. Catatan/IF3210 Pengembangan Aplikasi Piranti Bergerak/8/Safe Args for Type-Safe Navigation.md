---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Safe Args for Type-Safe Navigation
>
> > ## Questions/Cues
> >
> > - Mengapa Safe Args diperlukan dalam navigasi antar-Fragment?
> > - Bagaimana cara mengkonfigurasi Safe Args di build.gradle?
> > - Langkah-langkah mengirim data menggunakan Directions class
> > - Cara mengambil argumen di Fragment tujuan dengan navArgs()
> > - Jenis data apa yang didukung oleh Safe Args?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Pages 34-42)
> > - Android Development with Kotlin (Page 50)
>
> > ### Konsep Dasar Safe Args
> >
> > Safe Args adalah plugin Gradle yang menyediakan tipe data aman (type-safe) untuk navigasi antar komponen di Android, khususnya saat berpindah antar Fragment. Plugin ini menghasilkan kelas-kelas khusus yang memastikan keamanan tipe data (type-safety) saat melewatkan argumen, sehingga mencegah kesalahan runtime akibat tipe data yang tidak sesuai.
> >
> > Keuntungan utama penggunaan Safe Args:
> >
> > 1. **Validasi tipe data otomatis**: Kompiler akan mengecek kecocokan tipe data saat kompilasi
> > 2. **Default values**: Memungkinkan penetapan nilai default untuk argumen
> > 3. **Null-safety**: Mendukung nullable types untuk argumen tertentu
> > 4. **Kode yang lebih bersih**: Mengurangi boilerplate code untuk parsing Bundle
> >
> > Contoh kasus: Tanpa Safe Args, developer harus menggunakan Bundle dengan key-value pairs yang rentan terhadap typo dan kesalahan tipe data. Safe Args menghilangkan risiko ini dengan menghasilkan kelas wrapper yang terotomatisasi.
> >
> > ### Konfigurasi Safe Args
> >
> > Untuk menggunakan Safe Args, tambahkan dependensi berikut di file build.gradle level project:
> >
> > ```groovy
> >
> > buildscript {
> >
> > dependencies {
> >
> > classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
> >
> > }
> >
> > }
> >
> > ```
> >
> > Selanjutnya, terapkan plugin di modul aplikasi:
> >
> > ```groovy
> >
> > plugins {
> >
> > id 'androidx.navigation.safeargs.kotlin'
> >
> > }
> >
> > ```
> >
> > Versi `$nav_version` harus sesuai dengan versi Navigation Component yang digunakan (misal: 2.5.3). Setelah sinkronisasi Gradle, sistem akan menghasilkan kelas Directions dan Args secara otomatis berdasarkan definisi navigation graph.
> >
> > ### Mendefinisikan Argumen di Navigation Graph
> >
> > Argumen untuk Fragment tujuan dideklarasikan dalam file XML navigation graph (res/navigation/nav_graph.xml). Setiap argumen memiliki:
> >
> > - `android:name`: Identifier unik
> > - `app:argType`: Tipe data (integer, string, float, dll)
> > - `android:defaultValue`: Nilai default opsional
> >
> > Contoh deklarasi argumen untuk Fragment perkalian:
> >
> > ```xml
> >
> > <fragment android:id="@+id/multiplyFragment">
> >
> > <argument
> >
> > android:name="number1"
> >
> > app:argType="float"
> >
> > android:defaultValue="1.0" />
> >
> > <argument
> >
> > android:name="number2"
> >
> > app:argType="float"
> >
> > android:defaultValue="1.0" />
> >
> > </fragment>
> >
> > ```
> >
> > Tipe data khusus (Parcelable/Serializable) juga didukung dengan menyertakan nama kelas lengkap.
> >
> > ### Mengirim Data dengan Directions Class
> >
> > Safe Args menghasilkan kelas Directions berdasarkan navigation graph. Untuk mengirim data:
> >
> > 1. Dapatkan referensi ke action yang didefinisikan di navigation graph
> > 2. Gunakan metode generated yang sesuai dengan argumen
> > 3. Jalankan navigasi dengan NavController
> >
> > Contoh implementasi di Fragment sumber:
> >
> > ```kotlin
> >
> > binding.button.setOnClickListener {
> >
> > val number1 = binding.number1.text.toString().toFloatOrNull() ?: 0.0f
> >
> > val number2 = binding.number2.text.toString().toFloatOrNull() ?: 0.0f
> >
> > val action = InputFragmentDirections.actionToMultiplyFragment(number1, number2)
> >
> > findNavController().navigate(action)
> >
> > }
> >
> > ```
> >
> > Kelas `InputFragmentDirections` dihasilkan otomatis dan menyediakan method yang type-safe.
> >
> > ### Menerima Data di Fragment Tujuan
> >
> > Untuk mengakses argumen di Fragment penerima:
> >
> > 1. Gunakan delegated property `by navArgs()`
> > 2. Akses nilai melalui properti yang terdefinisi
> >
> > Contoh implementasi:
> >
> > ```kotlin
> >
> > class MultiplyFragment : Fragment() {
> >
> > private val args: MultiplyFragmentArgs by navArgs()
> >
> > override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
> >
> > val result = args.number1 * args.number2
> >
> > binding.output.text = "${args.number1} * ${args.number2} = $result"
> >
> > }
> >
> > }
> >
> > ```
> >
> > Metode `navArgs()` menangani proses ekstraksi argumen dari Bundle secara otomatis dan aman.
> >
> > ### Tipe Data yang Didukung
> >
> > Safe Args mendukung berbagai tipe data:
> >
> > | Tipe Data          | Sintaks XML         | Nullable | Default Value |
> >
> > |---------------------|---------------------|----------|---------------|
> >
> > | Integer            | `integer`           | Tidak    | Ya            |
> >
> > | Float              | `float`             | Tidak    | Ya            |
> >
> > | String             | `string`            | Ya       | Ya            |
> >
> > | Boolean            | `boolean`           | Tidak    | Ya            |
> >
> > | Parcelable         | Nama kelas lengkap | Ya       | Terbatas      |
> >
> > | Array              | `integer[]`         | Ya       | Terbatas      |
> >
> > | Resource Reference | `reference`         | Tidak    | Ya            |
> >
> > Untuk tipe data kustom, pastikan kelas mengimplementasikan Parcelable atau Serializable.

> [!cornell] #### Summary
>
> **Safe Args** menyediakan solusi type-safe untuk pertukaran data antar Fragment dalam Navigation Component, **menghilangkan risiko kesalahan runtime** terkait tipe data. Konfigurasi melalui plugin Gradle menghasilkan kelas Directions dan Args yang **memvalidasi tipe data saat kompilasi**. Proses pengiriman data menggunakan metode generated yang **memastikan kecocokan parameter**, sementara penerimaan data di Fragment tujuan menggunakan delegated property yang **menyederhanakan ekstraksi argumen**. Dukungan untuk berbagai tipe data termasuk null-safety dan default values membuat implementasi navigasi **lebih robust dan maintainable**.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Safe Args
>
> Secara internal, Safe Args bekerja dengan melakukan proses annotasi pada navigation graph selama kompilasi. Proses generasi kode menggunakan Java Poet untuk membuat kelas wrapper yang sesuai dengan definisi argumen. Waktu kompilasi mungkin meningkat sekitar 5-10% untuk proyek besar, tetapi optimasi dilakukan melalui incremental annotation processing.
>
> Untuk tipe data kustom, Safe Args menggunakan mekanisme caching untuk Parcelable guna menghindari overhead deserialisasi berulang. Implementasi Parcelize Kotlin (plugin `kotlin-parcelize`) sangat direkomendasikan untuk kompatibilitas optimal.
>
> #### Implementasi Lanjutan dengan Navigasi Bertingkat
>
> Untuk navigasi bersarang (nested navigation), Safe Args dapat diintegrasikan dengan Navigation Graph bertingkat. Setiap sub-graph akan menghasilkan Directions class sendiri. Contoh implementasi:
>
> ```kotlin
>
> val action = NavGraphDirections.actionGlobalDetailFragment(entityId)
>
> ```
>
> Penting untuk mendefinisikan argumen di root graph jika ingin digunakan secara global.
>
> #### Edge Cases dan Solusi
>
> 1. **Large Data Objects**: Untuk data besar (>1MB), hindari menggunakan Safe Args langsung karena keterbatasan Bundle. Solusi: Gunakan ViewModel bersama atau penyimpanan sementara.
> 2. **Circular Dependencies**: Hindari dependency silang antara modul yang berisi navigation graph dan model data. Solusi: Gunakan base module untuk model data bersama.
> 3. **ProGuard/R8**: Tambahkan aturan optimasi untuk kelas generated:
>
> ```proguard
>
> -keep class * extends androidx.navigation.NavArgs
>
> -keepclassmembers class * implements androidx.navigation.NavArgs {
>
> <init>(...);
>
> }
>
> ```
>
> #### Proyek Eksperimen Mandiri
>
> 1. Implementasikan Safe Args dengan tipe data kustom Parcelable:
> - Buat class `User` yang mengimplementasikan Parcelable
> - Tambahkan sebagai argumen di navigation graph
> - Uji pengiriman objek dengan berbagai keadaan null/non-null
> 2. Bandingkan performa antara Safe Args dan Bundle konvensional:
> - Ukur waktu navigasi untuk payload besar (>100KB)
> - Uji kasus error handling saat tipe data tidak sesuai
>
> #### Alat dan Referensi
>
> - **Safe Args Playground**: Contoh proyek lengkap dari Google: [github.com/android/safeargs-sample](https://github.com/android/safeargs-sample)
> - **TypeSafeNavigationValidator**: Plugin Android Studio untuk inspeksi navigation graph: [plugins.jetbrains.com/plugin/18824](https://plugins.jetbrains.com/plugin/18824)
> - **Bundle vs Safe Args Analyzer**: Alat CLI untuk membandingkan ukuran APK
>
> #### Bacaan Lanjutan
>
> - "Advanced Navigation in Android" by Tutorials Dojo (Chapter 7: Type-Safe Navigation)
> - Google Codelabs: "Android Navigation with Safe Args"
> - Dokumen resmi Android: "Pass data between destinations safely"
> - Artikel Medium: "Under the Hood of Safe Args" by Android Platform Team