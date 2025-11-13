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
> > - Apa itu jQuery?
> >     
> > - Fitur utama jQuery?
> >     
> > - Apa itu fungsi `$`?
> >     
> > - Bagaimana `$` memilih elemen?
> >     
> > - Manipulasi DOM dgn jQuery?
> >     
> > - Bagaimana jQuery menangani AJAX?
> >     
> > - Apa itu `$.get()` & `$.post()`?
> >     
> > - Apa itu `$.ajax()`?
> >     
> > - Beda jQuery vs Vanilla JS?
> >     
> > - Best practice jQuery?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10a-Client-Side-Framework.pdf (Slide 8-17)
> >     
> 
> > ### Definisi & Fitur jQuery
> > 
> > **jQuery** adalah sebuah _library_ JavaScript yang sangat populer (pada masanya). Website resminya adalah `jquery.com`.
> > 
> > - **Ukuran:** Sangat kecil (sekitar 28KB _minified_ dan _compressed_), sehingga cepat dimuat.
> >     
> > - **Fitur Utama:**
> >     
> >     1. **Manipulasi DOM:** Sangat mempermudah proses menemukan dan mengubah elemen HTML.
> >         
> >     2. **AJAX:** Menyederhanakan pengiriman dan penerimaan data dari server.
> >         
> >     3. **Event Handling:** Mempermudah penanganan _event_ seperti klik, _hover_, dll.
> >         
> > 
> > Untuk menggunakannya, kita cukup menyertakan file-nya di HTML:
> > 
> > ```html
> > <script type="text/javascript" src="jquery.js"></script>
> > ```
> > 
> > ### Fungsi Inti: `$` (Dolar)
> > 
> > Fungsi `$` adalah inti dari jQuery. Ini adalah _alias_ untuk fungsi `jQuery()`.
> > 
> > - **Tujuan:** Fungsi ini digunakan untuk **memilih elemen** di halaman web, dan mengembalikan satu atau sekumpulan elemen sebagai _jQuery object_.
> >     
> > - **Selector:** Menggunakan format _selector_ yang mirip dengan CSS:
> >     
> >     - `$('a')`: Memilih semua elemen dengan _tag_ `<a>`.
> >         
> >     - `$('#myid')`: Memilih elemen dengan ID `myid`.
> >         
> >     - `$('p.content')`: Memilih elemen `<p>` yang memiliki _class_ `content`.
> >         
> > 
> > Setelah elemen dipilih, kita bisa memanggil berbagai _method_ padanya, seperti `.text()`, `.html()`, `.hide()`, `.show()`, `.click()`, `.animate()`, dll.
> > 
> > ### Manipulasi DOM
> > 
> > jQuery menyediakan _method_ yang sangat intuitif untuk mengubah struktur DOM:
> > 
> > - `.append()`: Menambah konten di akhir elemen.
> >     
> > - `.prepend()`: Menambah konten di awal elemen.
> >     
> > - `.after()` / `.before()`: Menambah konten setelah/sebelum elemen.
> >     
> > - `.remove()`: Menghapus elemen.
> >     
> > - `.empty()`: Menghapus semua _child_ dari elemen.
> >     
> > - `.html()`: Mengambil atau mengatur konten HTML.
> >     
> > - `.text()`: Mengambil atau mengatur konten teks (aman dari XSS).
> >     
> > 
> > ### Penanganan AJAX dengan jQuery
> > 
> > jQuery "membungkus" kompleksitas AJAX menjadi fungsi-fungsi sederhana.
> > 
> > **Metode High-Level:**
> > 
> > - `$.get()`: Melakukan permintaan AJAX menggunakan metode GET.
> >     
> >     ```js
> >     $.get("data.php", { name: "value" }, function(data, status) { ... });
> >     ```
> >     
> > - `$.post()`: Serupa dengan $.get(), tetapi menggunakan metode POST.
> >     
> >     ```js
> >     $.post("data.php", { name: "value" }, function(data, status) { ... });
> >     ```
> >     
> > - **`$.getJSON()`:** Khusus untuk mengambil data berformat JSON.
> >     
> > - **`load()`:** Memuat HTML dari URL dan memasukkannya langsung ke elemen yang dipilih.
> >     
> > 
> > **Metode Low-Level:**
> > 
> > - `$.ajax()`: Metode level rendah yang sangat fleksibel. Menerima satu parameter object untuk konfigurasi lengkap:
> >     
> >     ```js
> >     $.ajax({
> > 	    type: "POST",
> > 	    url: "api/data",
> > 	    data: { ... },
> > 	    dataType: "json",
> > 	    success: function(result) { ... },
> > 	    error: function(err) { ... },
> > 	    complete: function() { ... }
> >     });
> >     ```
> > 
> > ### jQuery vs. Vanilla JavaScript
> > 
> > |**jQuery**|**Vanilla JavaScript (JS Murni)**|
> > |---|---|
> > |Sintaks lebih pendek.|Performa lebih baik (tidak ada _overhead_).|
> > |Dukungan _cross-browser_ (otomatis menangani perbedaan browser).|Tidak ada dependensi (file lebih kecil).|
> > |Animasi bawaan.|Dukungan API modern (sekarang sudah standar).|
> > |AJAX disederhanakan.|Menggunakan API browser langsung (`fetch`).|
> > |Ekosistem plugin yang besar.|Ukuran file total lebih kecil.|
> > 
> > ### Best Practices & Performa
> > 
> > - **Cache jQuery Selections:** Jangan memilih elemen yang sama berulang kali. Simpan dalam variabel.
> >     
> >     - (Buruk: `$('#my-el').show(); $('#my-el').css(...);`)
> >     
> >     - (Baik: `var $myEl = $('#my-el'); $myEl.show(); $myEl.css(...);`)
> >     
> > - **Gunakan Selector yang Tepat:** Selector ID (`#id`) adalah yang tercepat.
> >     
> > - **Gunakan Event Delegation:** Untuk daftar yang panjang, pasang _event listener_ di _parent_-nya, bukan di setiap _child_.
> >     
> > - **Minimalkan Manipulasi DOM:** Lakukan perubahan "secara berkelompok" jika memungkinkan.
> >     

> [!cornell] #### Summary
> 
> **jQuery** adalah _library_ JavaScript yang ringkas dan kuat, yang tujuan utamanya adalah **menyederhanakan skrip** _**client-side**_. Ia menjadi sangat populer karena mempermudah tugas-tugas kompleks seperti **manipulasi dan** _**traversal**_ **DOM** (menggunakan _selector_ `$` yang intuitif) dan **permintaan AJAX** (dengan fungsi `$.get`, `$.post`, dan `$.ajax`). Meskipun _library_ modern dan JavaScript murni (Vanilla JS) kini telah mengadopsi banyak fiturnya, jQuery tetap relevan dalam banyak proyek dan merupakan alat fundamental dalam sejarah pengembangan web.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Mengapa jQuery Kehilangan Popularitas?
> 
> Dulu, jQuery sangat penting karena browser (IE, Firefox, Chrome) memiliki implementasi JavaScript yang sangat berbeda (_cross-browser incompatibility_). jQuery menyediakan satu API yang konsisten.
> 
> Saat ini, sebagian besar popularitas jQuery telah menurun karena dua alasan:
> 
> 1. **Browser Modern Sudah Seragam:** Browser modern (Chrome, Firefox, Edge, Safari) sekarang sebagian besar mengikuti standar web yang sama.
>     
> 2. **API Bawaan (Vanilla JS) Menjadi Lebih Baik:**
>     
>     - **Seleksi DOM:** `document.querySelector()` dan `document.querySelectorAll()` sekarang berfungsi seperti `$` milik jQuery.
>         
>     - **AJAX:** `Fetch API` bawaan browser sekarang menjadi standar untuk permintaan asinkron, dan lebih kuat daripada `$.ajax`.
>         
>     - **Manipulasi Class:** `element.classList.add()` dan `.toggle()` menggantikan `.addClass()` jQuery.
>         
> 
> Seringkali, pengembang sekarang lebih memilih menggunakan Vanilla JS karena lebih cepat (tanpa perlu memuat _library_ eksternal) dan sudah cukup mumpuni.
> 
> #### Topik Teknis: Event Delegation
> 
> Ini adalah salah satu _best practice_ terpenting. Jika Anda memiliki daftar `<ul>` dengan 1000 item `<li>`, alih-alih menambahkan 1000 _event listener_ `click` (satu di setiap `<li>`), Anda cukup menambahkan **satu** _listener_ di `<ul>`.
> 
> // Cara buruk: 1000 listeners
> 
> $('ul li').click(function() { ... });
> 
> // Cara baik (Event Delegation): 1 listener
> 
> $('ul').on('click', 'li', function() { ... });
> 
> Ini jauh lebih efisien dalam hal memori dan juga akan berfungsi untuk `<li>` baru yang ditambahkan ke daftar secara dinamis.