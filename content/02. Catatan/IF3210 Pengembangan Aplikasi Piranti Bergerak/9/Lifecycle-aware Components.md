---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Lifecycle-aware Components
>
> > ## Questions/Cues
> >
> > - Apa masalah yang dipecahkan oleh lifecycle-aware components?
> > - Apa perbedaan `Lifecycle`, `LifecycleOwner`, dan `LifecycleObserver`?
> > - Bagaimana cara membuat komponen yang merespons perubahan lifecycle?
> > - Mengapa Fragment dan AppCompatActivity disebut implementasi LifecycleOwner?
> > - Kapan sebaiknya menggunakan LifecycleObserver dibanding override callback langsung?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 28-31)
>
> > ### Masalah yang Dipecahkan
> >
> > Sebelum adanya lifecycle-aware components, kode yang bergantung pada lifecycle Activity/Fragment biasanya ditulis langsung di dalam callback seperti `onStart()` atau `onStop()`. Pendekatan ini memiliki masalah:
> >
> > - **God class**: Activity/Fragment menjadi sangat besar karena menangani logika dari banyak komponen sekaligus
> > - **Duplikasi**: Kode setup/teardown diulang di setiap Activity yang menggunakan komponen yang sama
> > - **Rawan bug**: Mudah lupa memanggil cleanup di callback yang tepat, menyebabkan memory leak
> >
> > **Lifecycle-aware components** dari library `androidx.lifecycle` memungkinkan komponen untuk **mengamati dan merespons lifecycle sendiri**, tanpa Activity/Fragment perlu tahu detail tentang mereka.
> >
> > ### Kelas Lifecycle
> >
> > Kelas `Lifecycle` (dari `androidx.lifecycle`) bertanggung jawab untuk:
> >
> > - **Menyimpan state lifecycle saat ini** — misalnya RESUMED atau STOPPED
> > - **Mendispatch lifecycle events** saat terjadi perubahan state — misalnya event ON_RESUME atau ON_STOP
> >
> > State dan event Lifecycle menggunakan enum yang terdefinisi di dalam kelas ini. Activity atau Fragment yang mengelola lifecycle-nya melalui kelas ini disebut **LifecycleOwner**.
> >
> > ### LifecycleOwner dan LifecycleObserver
> >
> > ```mermaid
> > flowchart TD
> >     LO["LifecycleOwner\n(Fragment / AppCompatActivity)"]
> >     L["Lifecycle\n(state + events)"]
> >     OB["LifecycleObserver\n(komponen kustom)"]
> >     LO -->|"getLifecycle()"| L
> >     L -->|"addObserver()"| OB
> >     L -->|"dispatches events"| OB
> > ```
> >
> > **`LifecycleOwner`** adalah interface yang menandakan bahwa suatu kelas memiliki lifecycle Android. Wajib mengimplementasikan satu metode: `getLifecycle()` yang mengembalikan instance `Lifecycle`. Contoh implementor bawaan: `Fragment` dan `AppCompatActivity`.
> >
> > **`LifecycleObserver`** adalah interface yang diimplementasikan oleh komponen yang ingin merespons perubahan lifecycle. Anotasi `@OnLifecycleEvent` digunakan untuk menandai metode yang harus dipanggil saat event tertentu terjadi:
> >
> > ```kotlin
> > class MyObserver : LifecycleObserver {
> >
> >     @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
> >     fun connectListener() {
> >         // dipanggil otomatis saat Activity/Fragment di-resume
> >     }
> >
> >     @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
> >     fun disconnectListener() {
> >         // dipanggil otomatis saat Activity/Fragment di-pause
> >     }
> > }
> > ```
> >
> > Untuk mendaftarkan observer ke lifecycle tertentu:
> >
> > ```kotlin
> > myLifecycleOwner.getLifecycle().addObserver(MyObserver())
> > ```
> >
> > Setelah ini, `MyObserver` akan secara otomatis menerima event lifecycle dari `myLifecycleOwner` tanpa Activity/Fragment perlu memanggil metode observer secara manual di setiap callback.

> [!cornell] #### Summary
>
> **Lifecycle-aware components** menggunakan library `androidx.lifecycle` agar komponen dapat mengatur dirinya sendiri berdasarkan lifecycle tanpa membebani Activity/Fragment. Tiga konsep inti: **`Lifecycle`** menyimpan state dan mendispatch event; **`LifecycleOwner`** (contoh: `Fragment`, `AppCompatActivity`) mengekspos Lifecycle via `getLifecycle()`; dan **`LifecycleObserver`** mendaftarkan dirinya ke Lifecycle dan menggunakan anotasi `@OnLifecycleEvent` untuk merespons perubahan state secara otomatis, menghasilkan kode yang lebih bersih dan terhindar dari memory leak.

> [!ad-libitum]- Additional Information
>
> #### DefaultLifecycleObserver — Pendekatan Modern
>
> Anotasi `@OnLifecycleEvent` sudah deprecated di versi terbaru. Cara yang direkomendasikan saat ini adalah mengimplementasikan interface `DefaultLifecycleObserver`:
>
> ```kotlin
> class MyObserver : DefaultLifecycleObserver {
>     override fun onResume(owner: LifecycleOwner) {
>         // Setup saat resume
>     }
>
>     override fun onPause(owner: LifecycleOwner) {
>         // Cleanup saat pause
>     }
> }
> ```
>
> Pendekatan ini lebih type-safe dan IDE-friendly karena menggunakan override method biasa.
>
> #### Contoh Kasus: Location Manager
>
> Salah satu contoh terbaik lifecycle-aware component adalah wrapper untuk location updates. Dengan LifecycleObserver, penghentian location listener dapat dikaitkan otomatis ke lifecycle Activity:
>
> ```kotlin
> class LocationAwareComponent(
>     private val lifecycle: Lifecycle
> ) : DefaultLifecycleObserver {
>
>     init { lifecycle.addObserver(this) }
>
>     override fun onStart(owner: LifecycleOwner) = startLocationUpdates()
>     override fun onStop(owner: LifecycleOwner) = stopLocationUpdates()
> }
> ```
>
> #### Komponen Bawaan yang Lifecycle-aware
>
> Banyak komponen AndroidX sudah lifecycle-aware secara bawaan:
>
> - **LiveData**: Hanya mengupdate observer yang aktif (lifecycle STARTED/RESUMED)
> - **ViewModel**: Bertahan selama lifecycle Activity, dihancurkan saat Activity benar-benar selesai
> - **WorkManager**: Mengelola background work dengan lifecycle awareness
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat `LifecycleObserver` kustom untuk mengelola koneksi Bluetooth/WiFi yang otomatis aktif/nonaktif sesuai lifecycle Activity
> 2. Migrasikan kode lifecycle manual (`onStart`/`onStop`) di sebuah Activity menjadi `DefaultLifecycleObserver`
> 3. Implementasikan timer yang pause dan resume otomatis mengikuti lifecycle Activity
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi AndroidX: "Handling Lifecycles with Lifecycle-Aware Components"
> - Android Architecture Components Guide: ViewModel dan LiveData
> - Codelab: "Use Android Jetpack Lifecycle Components"
> - Blog: "Android Lifecycle Best Practices" (Android Developers)
