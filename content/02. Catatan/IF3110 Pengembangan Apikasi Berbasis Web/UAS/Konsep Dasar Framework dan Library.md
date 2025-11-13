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
> > - Apa motivasi di balik framework?
> >     
> > - Apa beda Framework vs Library?
> >     
> > - Apa itu Framework?
> >     
> > - Apa itu Library?
> >     
> > - Apa alasan (rasional) kita menggunakannya?
> >     
> > - Apa sisi baik & buruk framework?
> >     
> > - Apa saja contoh populer?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10a-Client-Side-Framework.pdf (Slide 1-7)
> >     
> 
> > ### Motivasi Penggunaan
> > 
> > JavaScript telah menjadi teknologi utama dalam membangun aplikasi web modern, tetapi JavaScript sendiri adalah bahasa yang sangat "aneh" dan fleksibel. Fleksibilitas ini sering menimbulkan masalah dalam:
> > 
> > - **Tipe Data:** JavaScript adalah _loosely typed_, mudah terjadi kesalahan tipe.
> >     
> > - **Gaya Kode:** Tanpa panduan, gaya kode antar pengembang bisa sangat berbeda.
> >     
> > - **Arsitektur:** Sulit untuk membangun aplikasi skala besar yang terstruktur dan mudah dirawat (maintenance) hanya dengan JavaScript murni (_vanilla JS_).
> >     
> > 
> > ### Perbedaan Fundamental: Framework vs. Library
> > 
> > **Library (Pustaka):**
> > 
> > - **Definisi:** Sekumpulan fungsi/kode yang bisa kita **panggil** kapanpun kita membutuhkannya.
> >     
> > - **Analogi:** Sebuah toko perkakas (misalnya, IKEA). Anda memiliki masalah (misalnya, perlu merakit lemari), Anda pergi ke toko, memilih alat yang tepat (obeng, kunci L), dan menggunakannya sesuai kebutuhan Anda.
> >     
> > - **Alur Kontrol:** **Anda yang memegang kendali.** Kode Anda memanggil fungsi _library_.
> >     
> > - **Contoh:** **jQuery**, MooTools, YUI. (Anda memutuskan kapan harus memanggil `$` untuk memilih elemen).
> >     
> > 
> > **Framework (Kerangka Kerja):**
> > 
> > - **Definisi:** Sebuah kerangka atau struktur yang **menentukan "bagaimana"** Anda harus menyajikan atau menulis kode Anda. Ia menyediakan _template_, _helpers_, dan aturan arsitektur.
> >     
> > - **Analogi:** Sebuah cetakan rumah atau _blueprint_ rumah. Anda tidak memulai dari nol; Anda harus membangun di dalam fondasi dan struktur yang telah disediakan oleh kerangka tersebut.
> >     
> > - **Alur Kontrol:** **Dia (framework) yang memegang kendali.** _Framework_ memanggil kode Anda pada waktu yang tepat (misal: memanggil fungsi `render` Anda). Ini sering disebut _Inversion of Control_ (IoC).
> >     
> > - **Contoh:** **ReactJS**, **AngularJS**, **VueJS**. (React memberi tahu Anda cara membuat Komponen dan React-lah yang memutuskan kapan harus memanggil fungsi `render` komponen Anda).
> >     
> > 
> > ### Rasional (Alasan) Menggunakan Framework/Library
> > 
> > 1. **Don't Reinvent the Wheel:** Jangan membuat ulang sesuatu yang sudah ada. Mengapa membuat fungsi AJAX sendiri jika jQuery atau React sudah menyediakannya dengan lebih baik dan teruji?
> >     
> > 2. **Do More with Less Code:** Mencapai hasil yang lebih kompleks dengan penulisan kode yang lebih sedikit dan sederhana.
> >     
> > 3. **Save Time:** Mempercepat proses pengembangan secara drastis.
> >     
> > 4. **We are not THE EXPERT:** Kemungkinan besar, para ahli di komunitas (misal: tim React di Facebook) telah memikirkan _edge cases_ dan optimasi performa yang mungkin tidak kita pikirkan.
> >     
> > 5. **Community & Sustainability:** Menggunakan alat populer berarti ada komunitas besar untuk dukungan, tutorial, dan keberlanjutan kode (mudah mencari pengembang baru).
> >     
> > 6. **Enforce Norms:** Memaksa tim untuk mengikuti struktur, arsitektur, dan konvensi yang sama, membuat kode lebih rapi dan konsisten.
> >     
> > 
> > ### Sisi Baik vs. Sisi Buruk Framework
> > 
> > Ini adalah sebuah paradoks:
> > 
> > - **Hal Baik:** _Framework_ melakukan banyak hal untuk pengembang (mengurus _routing_, _state management_, optimasi DOM).
> >     
> > - **Hal Buruk:** _Framework_ melakukan banyak hal untuk pengembang (kita jadi "terkunci" pada cara kerja _framework_ tersebut, dan ada _learning curve_ untuk memahami semua yang dilakukannya di balik layar).
> >     
> > 
> > ### Popularitas (Berdasarkan Stack Overflow Survey 2024)
> > 
> > Statistik menunjukkan teknologi mana yang banyak digunakan secara profesional dan mana yang disukai/diinginkan oleh pengembang.
> > 
> > - **Populer (Banyak Digunakan):** Node.js (40.8%), React (39.5%), jQuery (21.4%), Next.js (17.9%), Angular (17.1%), Vue.js (15.4%).
> >     
> > - **Admired/Desired (Disukai/Diinginkan):** Banyak pengembang ingin belajar atau menyukai Svelte, Htmx, Astro, dan Solid.js, yang menunjukkan tren teknologi baru yang sedang naik daun.
> >     

> [!cornell] #### Summary
> 
> **Framework** dan **Library** adalah alat penting untuk mengatasi kompleksitas JavaScript modern, namun keduanya berbeda secara fundamental. **Library (seperti jQuery)** adalah **kumpulan alat yang kita panggil** saat dibutuhkan, di mana kita memegang kendali penuh. Sebaliknya, **Framework (seperti React atau Angular)** adalah **kerangka kerja yang menentukan arsitektur** dan **memanggil kode kita** (_Inversion of Control_). Alasan utama menggunakannya adalah untuk **menghemat waktu, memanfaatkan keahlian komunitas, dan menerapkan standar kode** yang konsisten dalam sebuah tim, meskipun ada trade-off antara kemudahan yang ditawarkan dan keterikatan pada aturan _framework_ tersebut.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Inversion of Control (IoC)
> 
> Ini adalah konsep inti yang membedakan _framework_ dari _library_.
> 
> - **Alur Library:**
>     
>     1. Program Anda dimulai.
>         
>     2. Anda membuat keputusan (misal: "Sekarang saya perlu menyembunyikan elemen `#box`").
>         
>     3. Anda memanggil _library_: `$('#box').hide();`
>         
>     4. _Library_ mengeksekusi perintah Anda, lalu mengembalikan kontrol kepada Anda.
>         
> - **Alur Framework (IoC):**
>     
>     1. _Framework_ (misal: React) memulai.
>         
>     2. _Framework_ memuat kode Anda (misal: Komponen `App` Anda).
>         
>     3. _Framework_ membuat keputusan (misal: "Data berubah, saya perlu me-_render_ ulang UI").
>         
>     4. _Framework_ memanggil kode Anda: `App.render()` (secara konseptual).
>         
>     5. Kode Anda dieksekusi di dalam _framework_, lalu mengembalikan HTML virtual, dan _framework_ mengambil alih lagi untuk memperbarui DOM.
>         
> 
> Anda menyerahkan kontrol alur program utama kepada _framework_, dan hanya menyediakan "potongan-potongan" logika yang akan digunakan oleh _framework_ tersebut.
> 
> #### Eksplorasi Mandiri
> 
> - Coba bandingkan kode "Vanilla JS" untuk melakukan tugas umum (misal: mengambil data dari API dan menampilkannya sebagai daftar) dengan cara melakukannya di jQuery dan di React. Anda akan melihat perbedaan drastis dalam pendekatan:
>     
>     - **Vanilla JS:** Manipulasi DOM manual (membuat elemen, mengatur atribut, menambahkannya ke _body_).
>         
>     - **jQuery:** Manipulasi DOM yang disederhanakan (menggunakan `$.ajax` lalu `$.append`).
>         
>     - **React:** Pendekatan deklaratif (mengatur _state_ dengan data, dan UI "bereaksi" secara otomatis).
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Stack Overflow Survey 2024 (Sumber Data):**
>     
>     - [https://survey.stackoverflow.co/2024/technology](https://survey.stackoverflow.co/2024/technology "null")
>         
> - **Artikel Tambahan:**
>     
>     - "Framework vs. Library" (Banyak artikel di Martin Fowler atau freeCodeCamp yang membahas ini).
>