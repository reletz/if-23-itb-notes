---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Tasks and Back Stack
>
> > ## Questions/Cues
> >
> > - Apa itu "task" dan "back stack" di konteks Android?
> > - Bagaimana Activity ditambah dan dihapus dari back stack?
> > - Bagaimana Fragment dikelola dalam back stack?
> > - Kapan perlu memodifikasi perilaku tombol Back?
> > - Apa perbedaan back stack Activity vs Fragment?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 32-42)
>
> > ### Konsep Task dan Back Stack
> >
> > Sebuah **task** adalah kumpulan Activity yang diatur dalam struktur stack (tumpukan) yang disebut **back stack**. Konsep ini adalah cara Android mengelola navigasi sehingga pengguna dapat menekan tombol Back untuk kembali ke layar sebelumnya.
> >
> > Prinsip dasar back stack mengikuti aturan **LIFO (Last In, First Out)**: Activity yang terakhir dibuka berada di paling atas stack dan menjadi yang pertama dihapus saat pengguna menekan Back. Activity yang berada di bawah stack tidak aktif tetapi tetap ada di memori.
> >
> > ### Back Stack Activity
> >
> > ```mermaid
> > flowchart LR
> >     subgraph "Setelah navigasi 3 langkah"
> >         A3["AttachFileActivity\n(TOP — aktif)"]
> >         A2["ComposeActivity"]
> >         A1["EmailActivity\n(BOTTOM)"]
> >     end
> >     A3 --> A2 --> A1
> > ```
> >
> > Contoh alur navigasi Activity:
> >
> > 1. **EmailActivity** dibuka → masuk ke back stack sebagai elemen pertama
> > 2. Pengguna membuka **ComposeActivity** → ditumpuk di atas EmailActivity
> > 3. Pengguna membuka **AttachFileActivity** → berada di paling atas stack
> > 4. Pengguna menekan Back → AttachFileActivity **di-pop** (dihancurkan), ComposeActivity kembali aktif
> > 5. Pengguna menekan Back lagi → ComposeActivity di-pop, EmailActivity kembali aktif
> >
> > Saat sebuah Activity di-pop dari stack, sistem memanggilnya melalui `onDestroy()`. Activity yang kembali ke foreground akan melewati `onRestart()` → `onStart()` → `onResume()`.
> >
> > ### Back Stack Fragment
> >
> > Fragment juga dikelola dalam back stack, tetapi back stack Fragment dikelola oleh **FragmentManager**, bukan sistem Android secara langsung. Penambahan ke back stack harus dilakukan secara eksplisit menggunakan `FragmentTransaction`:
> >
> > ```kotlin
> > supportFragmentManager.beginTransaction()
> >     .replace(R.id.container, SecondFragment())
> >     .addToBackStack(null)  // Tanpa ini, Back tidak akan kembali ke FirstFragment
> >     .commit()
> > ```
> >
> > Saat tombol Back ditekan, SecondFragment akan di-pop dan FirstFragment kembali terlihat. Perbedaan penting dari Activity: Fragment di back stack tidak dihancurkan sepenuhnya — hanya view-nya yang dihancurkan (`onDestroyView()`), instance Fragment tetap ada.
> >
> > Contoh skenario back stack Fragment yang kompleks:
> >
> > | Posisi | Fragment |
> > |--------|----------|
> > | TOP | ResultFragment |
> > | 4 | Question3Fragment |
> > | 3 | Question2Fragment |
> > | 2 | Question1Fragment |
> > | BOTTOM | WelcomeFragment |
> >
> > ### Memodifikasi Perilaku Tombol Back
> >
> > Ada kasus di mana perilaku default Back tidak sesuai — misalnya, setelah menyelesaikan kuis (ResultFragment), menekan Back sebaiknya langsung kembali ke WelcomeFragment dan melewati semua pertanyaan.
> >
> > Navigation Component menyediakan mekanisme `popUpTo` dan `popUpToInclusive` untuk mengontrol berapa banyak destinasi yang di-pop:
> >
> > ```xml
> > <action
> >     android:id="@+id/action_result_to_welcome"
> >     app:destination="@id/welcomeFragment"
> >     app:popUpTo="@id/welcomeFragment"
> >     app:popUpToInclusive="false" />
> > ```
> >
> > Dengan konfigurasi di atas, saat aksi ini dieksekusi, semua Fragment di atas WelcomeFragment (Question1, Question2, Question3, Result) akan di-pop sekaligus, sehingga Back dari WelcomeFragment langsung keluar dari aplikasi.

> [!cornell] #### Summary
>
> **Task** adalah kumpulan Activity dalam struktur **back stack** berprinsip LIFO — Activity baru ditumpuk di atas, tombol Back menghapus yang paling atas. **Fragment back stack** dikelola oleh `FragmentManager` dan harus ditambahkan secara eksplisit via `addToBackStack()` dalam `FragmentTransaction`; berbeda dari Activity, instance Fragment tetap ada saat di-pop, hanya view-nya yang dihancurkan. Perilaku tombol Back dapat dimodifikasi menggunakan `popUpTo` di Navigation Component untuk melompat ke destinasi tertentu, berguna untuk alur seperti wizard atau kuis di mana pengguna tidak boleh kembali ke langkah sebelumnya setelah selesai.

> [!ad-libitum]- Additional Information
>
> #### Intent Flags untuk Modifikasi Back Stack Activity
>
> Selain Navigation Component, back stack Activity dapat dimodifikasi dengan Intent flags:
>
> - **`FLAG_ACTIVITY_CLEAR_TOP`**: Menghapus semua Activity di atas target Activity di stack
> - **`FLAG_ACTIVITY_SINGLE_TOP`**: Jika Activity sudah di paling atas, tidak membuat instance baru
> - **`FLAG_ACTIVITY_NEW_TASK`**: Memulai Activity di task baru
>
> ```kotlin
> val intent = Intent(this, HomeActivity::class.java).apply {
>     flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
> }
> startActivity(intent)
> ```
>
> #### OnBackPressedDispatcher — Cara Modern Handle Back
>
> Sejak AndroidX Activity 1.1.0, cara yang direkomendasikan untuk menangani tombol Back adalah via `OnBackPressedDispatcher`, bukan override `onBackPressed()` yang sudah deprecated:
>
> ```kotlin
> requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner) {
>     // Custom back behavior
>     if (canGoBack()) {
>         popBackStack()
>     } else {
>         isEnabled = false
>         requireActivity().onBackPressedDispatcher.onBackPressed()
>     }
> }
> ```
>
> #### Predictive Back Gesture (Android 13+)
>
> Android 13 memperkenalkan **Predictive Back Gesture** — pengguna dapat melihat preview destinasi sebelum benar-benar melepas gesture. Implementasi yang benar dengan `OnBackPressedDispatcher` secara otomatis mendukung fitur ini tanpa perubahan tambahan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi kuis 3 pertanyaan dengan Fragment; implementasikan `popUpTo` agar tombol Back dari layar hasil kembali ke welcome screen
> 2. Eksperimen dengan berbagai Intent flags dan amati perubahan perilaku back stack menggunakan `adb shell dumpsys activity activities`
> 3. Implementasikan `OnBackPressedDispatcher` untuk menampilkan dialog konfirmasi sebelum keluar dari form yang belum disimpan
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Tasks and the back stack"
> - Navigation Component Guide: "Navigate to a destination"
> - Codelab: "Advanced Navigation with the Navigation Component"
> - Android Developer Blog: "Multiple back stacks" (multi-navigation)
