---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Definisi PWA?
> >     
> > - Tujuan utama PWA?
> >     
> > - Karakteristik kunci PWA?
> >     
> > - Apa itu Service Worker?
> >     
> > - Siklus hidup Service Worker?
> >     
> > - Apa itu Web App Manifest?
> >     
> > - Fungsi Push Notifications?
> >     
> >
> > ## Reference Points
> >
> > - Slides 19-33
> >     
> 
> > ### Definisi Progressive Web App (PWA)
> > 
> > **Progressive Web App (PWA)** adalah aplikasi web yang menggunakan teknologi web modern untuk memberikan pengalaman pengguna yang mirip dengan aplikasi _native_ (aplikasi yang diinstal langsung di perangkat). PWA menggabungkan keunggulan terbaik dari web (aksesibilitas, jangkauan luas) dengan keunggulan terbaik dari aplikasi _native_ (kinerja, fitur offline, ikon di home screen).
> > 
> > - **Analogi:** PWA bisa dianggap sebagai "bunglon" di dunia digital. Ia tampak dan terasa seperti situs web biasa saat pertama kali diakses melalui browser, namun seiring waktu, ia dapat "berubah" dan menawarkan fitur-fitur canggih layaknya aplikasi _native_, seperti bekerja tanpa koneksi internet dan mengirim notifikasi.
> >     
> > 
> > ### Tujuan dan Karakteristik Utama PWA
> > 
> > PWA dirancang untuk mencapai tiga tujuan utama: **Reliable (Andal)**, **Fast (Cepat)**, dan **Engaging (Menarik)**. Tujuan ini dicapai melalui serangkaian karakteristik kunci:
> > 
> > 1. **Progressive:** Bekerja untuk semua pengguna, terlepas dari browser yang mereka gunakan, karena dibangun dengan _progressive enhancement_ sebagai prinsip inti.
> >     
> > 2. **Responsive:** Tampilannya dapat menyesuaikan diri dengan berbagai ukuran layar, baik itu desktop, tablet, maupun mobile.
> >     
> > 3. **Connectivity Independent:** Dapat berfungsi secara offline atau pada jaringan yang sangat lambat berkat teknologi **Service Worker** yang melakukan _caching_.
> >     
> > 4. **App-Like:** Memberikan interaksi dan navigasi yang terasa seperti aplikasi _native_.
> >     
> > 5. **Installable:** Pengguna dapat "menginstal" atau menambahkan ikon aplikasi ke _home screen_ mereka tanpa perlu melalui _app store_.
> >     
> > 6. **Re-engageable:** Dapat mengirimkan notifikasi (_push notifications_) untuk menarik kembali pengguna, bahkan saat browser tidak aktif.
> >     
> > 7. **Safe:** Wajib disajikan melalui **HTTPS** untuk menjamin keamanan dan integritas data.
> >     
> > 
> > ### Teknologi Inti 1: Service Worker
> > 
> > **Service Worker** adalah sebuah skrip JavaScript yang dijalankan oleh browser di _background_, terpisah dari halaman web utama. Ia bertindak sebagai _proxy_ jaringan yang dapat mengintersep dan mengelola permintaan jaringan, serta mengelola _cache_ aset.
> > 
> > - **Fungsi Utama:** Kemampuan utamanya adalah memungkinkan aplikasi bekerja secara offline. Ketika halaman web meminta sebuah sumber daya (misalnya gambar atau data), Service Worker dapat "mencegat" permintaan tersebut dan menyajikannya dari _cache_ jika perangkat sedang offline.
> >     
> > - **Batasan:** Service Worker tidak dapat mengakses DOM secara langsung. Komunikasi antara Service Worker dan halaman web dilakukan melalui `postMessage` API.
> >     
> > - **Siklus Hidup (Lifecycle):** Service Worker memiliki siklus hidup yang jelas: `Installing` (saat pertama kali didaftarkan), `Activated` (saat sudah aktif dan mengontrol halaman), dan `Idle` (akan dihentikan sementara jika tidak digunakan untuk menghemat baterai, dan diaktifkan kembali saat dibutuhkan).
> >     ![[Pasted image 20251019234825.png]]
> > 
> > ### Teknologi Inti 2: Web App Manifest
> > 
> > **Web App Manifest** adalah sebuah file JSON sederhana (biasanya bernama `manifest.json`) yang memberikan informasi metadata tentang aplikasi web. File ini adalah kunci yang membuat PWA menjadi _installable_.
> > 
> > - **Fungsi Utama:** Manifest memungkinkan developer untuk mengontrol bagaimana aplikasi web akan tampil ketika "diinstal" dan diluncurkan dari _home screen_ pengguna.
> >     
> > - **Kontrol Metadata:** Informasi yang bisa diatur di dalamnya antara lain:
> >     
> >     - Nama lengkap dan nama pendek aplikasi.
> >         
> >     - Ikon aplikasi untuk berbagai resolusi.
> >         
> >     - URL awal saat aplikasi dibuka.
> >         
> >     - Warna tema dan warna latar belakang untuk _splash screen_.
> >         
> >     - Orientasi layar default (misalnya potret atau lanskap).
> >         
> > 
> > ### Fitur Kunci: Web Push Notifications
> > 
> > **Push Notifications** adalah pesan yang dapat dikirimkan oleh server aplikasi ke perangkat pengguna, bahkan ketika aplikasi atau browser sedang tidak aktif. Fitur ini sangat efektif untuk _re-engagement_.
> > 
> > - **Mekanisme:** Fitur ini sangat bergantung pada Service Worker. Ketika server mengirimkan pesan _push_, Service Worker di perangkat pengguna akan "bangun" untuk menerima pesan tersebut dan kemudian menampilkannya sebagai notifikasi sistem.
> >     
> > - **Teknologi:** Menggunakan dua API yang saling melengkapi: **Push API** (untuk menangani pesan dari server) dan **Notification API** (untuk menampilkan notifikasi kepada pengguna).
> >     

> [!cornell] #### Summary
> 
> **Progressive Web App (PWA) merupakan evolusi dari aplikasi web standar yang dirancang untuk menjadi Andal, Cepat, dan Menarik, sehingga memberikan pengalaman layaknya aplikasi** _**native**_**. Hal ini dicapai dengan memanfaatkan dua teknologi inti: pertama,** _**Service Worker**_**, sebuah skrip proksi di latar belakang yang memungkinkan fungsionalitas offline melalui strategi** _**caching**_ **yang canggih dan menjadi dasar untuk fitur** _**re-engagement**_ **seperti** _**Push Notifications**_**. Kedua,** _**Web App Manifest**_**, sebuah file konfigurasi JSON yang membuat aplikasi menjadi "installable", memungkinkan pengguna untuk menambahkannya ke** _**home screen**_ **mereka dengan ikon, nama, dan tampilan peluncuran yang terkustomisasi. Kombinasi ini menghasilkan aplikasi yang aman (via HTTPS), responsif, dan dapat diakses secara universal tanpa memerlukan** _**app store**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Strategi Caching pada Service Worker
> 
> Service Worker dapat menerapkan berbagai strategi untuk merespons permintaan jaringan. Memilih strategi yang tepat sangat bergantung pada jenis sumber daya yang diminta. Beberapa strategi populer antara lain:
> 
> - **Cache First:** Sangat cocok untuk aset statis seperti CSS, JavaScript, dan gambar ikon. Service Worker akan selalu mencoba mengambil dari _cache_ terlebih dahulu. Jika tidak ada, baru ia akan meminta ke jaringan dan menyimpannya di _cache_ untuk permintaan berikutnya.
>     
> - **Network First:** Ideal untuk data yang sering berubah, seperti artikel berita atau saldo akun. Service Worker akan mencoba mengambil dari jaringan terlebih dahulu. Jika gagal (misalnya, offline), ia akan menyajikan versi terakhir yang ada di _cache_ sebagai _fallback_.
>     
> - **Stale-While-Revalidate:** Strategi hibrida yang sangat cepat. Service Worker akan langsung menyajikan aset dari _cache_ (stale/basi) agar pengguna dapat melihat konten secepat mungkin. Sementara itu, di latar belakang, ia tetap mengirim permintaan ke jaringan untuk mendapatkan versi terbaru dan memperbarui _cache_ untuk kunjungan berikutnya. Ini memberikan kecepatan _cache-first_ dengan kesegaran data dari _network-first_.
>     
> 
> #### Pendalaman Teknis: Anatomi File `manifest.json`
> 
> Berikut adalah penjelasan beberapa properti kunci dalam file manifest:
> 
> ```json
> {
>   "short_name": "MyPWA",
>   "name": "My Awesome Progressive Web App",
>   "icons": [
>     {
>       "src": "/images/icons-192.png",
>       "type": "image/png",
>       "sizes": "192x192"
>     }
>   ],
>   "start_url": "/?source=pwa",
>   "background_color": "#3367D6",
>   "display": "standalone",
>   "theme_color": "#3367D6"
> }
> ```
> 
> - **`short_name` & `name`**: Nama yang ditampilkan di bawah ikon di _home screen_ dan saat proses instalasi.
>     
> - **`icons`**: Array objek yang mendefinisikan ikon aplikasi untuk berbagai ukuran layar.
>     
> - **`start_url`**: Halaman yang akan dimuat pertama kali saat PWA dibuka dari _home screen_.
>     
> - **`display`**: Menentukan bagaimana UI browser ditampilkan. `standalone` akan menyembunyikan UI browser (address bar, dll.) agar terasa seperti aplikasi _native_.
>     
> - **`theme_color` & `background_color`**: Mengatur warna untuk _toolbar_ dan _splash screen_ saat aplikasi dimuat.
>     
> 
> #### Eksplorasi Mandiri
> 
> Buat sebuah aplikasi "Catatan Sederhana" dan ubah menjadi PWA:
> 
> 1. **Buat Aplikasi:** Bangun fungsionalitas dasar untuk menambah dan menampilkan catatan menggunakan HTML, CSS, dan JavaScript.
>     
> 2. **Tambahkan Manifest:** Buat file `manifest.json` dan tautkan di file HTML Anda.
>     
> 3. **Buat Service Worker:** Buat file `sw.js`. Daftarkan Service Worker ini dari file JavaScript utama Anda.
>     
> 4. **Implementasi Caching:** Di dalam `sw.js`, tambahkan _event listener_ `install` untuk menyimpan aset-aset inti (HTML, CSS, JS) ke dalam _cache_.
>     
> 5. **Sajikan dari Cache:** Tambahkan _event listener_ `fetch` untuk mengintersep permintaan dan menyajikan aset dari _cache_ terlebih dahulu (strategi _Cache First_).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **web.dev by Google - Progressive Web Apps:** [https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/ "null")
>     
> - **MDN Web Docs - Service Worker API:** [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API "null")
>     
> - **The Offline Cookbook by Jake Archibald:** [https://jakearchibald.com/2014/offline-cookbook/](https://jakearchibald.com/2014/offline-cookbook/ "null")
>