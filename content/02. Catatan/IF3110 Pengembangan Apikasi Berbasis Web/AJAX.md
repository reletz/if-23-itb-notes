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
> > - Apa itu AJAX?
> >     
> > - Bagaimana cara kerja AJAX?
> >     
> > - Apa itu `XMLHttpRequest`?
> >     
> > - Apa itu Same-Origin Policy?
> >     
> > - Perbedaan GET vs POST?
> >     
> > - Apa itu Fetch API?
> >     
> > - Pola penggunaan AJAX?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-05a-AJAX.pdf
> >     
> 
> > ### Definisi dan Manfaat AJAX
> >
> > **AJAX** adalah singkatan dari **Asynchronous** JavaScript And **XML**. Ini bukanlah bahasa pemrograman, melainkan sebuah teknik atau pendekatan untuk membangun aplikasi web yang lebih cepat dan interaktif.
> >
> > **Teknologi yang Digunakan:**
> >
> > - **HTML/CSS:** Untuk presentasi data.
> >     
> > - **DOM (Document Object Model):** Untuk menampilkan dan memanipulasi data secara dinamis.
> >     
> > - **JavaScript:** Sebagai "lem" yang mengikat semuanya.
> >     
> > - **`XMLHttpRequest` (XHR) Object** atau **Fetch API:** Untuk bertukar data dengan server secara asynchronous.
> >     
> > - **XML/JSON:** Format untuk data yang ditransfer (meskipun JSON jauh lebih umum saat ini).
> >     
> >
> > Manfaat Utama:
> > 
> > Kemampuan untuk memperbarui sebagian kecil dari halaman web tanpa perlu me-reload seluruh halaman. Ini membuat aplikasi terasa lebih responsif dan cepat, mirip seperti aplikasi desktop.
> >
> > ### Cara Kerja AJAX
> >
> > Alur kerja AJAX pada dasarnya adalah sebagai berikut:
> >
> > 1. Sebuah _event_ terjadi di halaman (misalnya, pengguna mengklik tombol).
> >     
> > 2. JavaScript membuat objek `XMLHttpRequest` atau menggunakan `Fetch API` untuk mengirim _request_ ke server di latar belakang.
> >     
> > 3. Server memproses _request_ dan mengirimkan kembali data (biasanya dalam format JSON atau XML).
> >     
> > 4. JavaScript menerima data tersebut.
> >     
> > 5. JavaScript menggunakan DOM untuk memperbarui konten halaman dengan data baru yang diterima.
> >     
> > 
> > ### `XMLHttpRequest` (XHR) Object
> >
> > Ini adalah API bawaan browser yang menjadi fondasi AJAX. Meskipun sekarang ada Fetch API yang lebih modern, memahami XHR tetap penting.
> >
> > **Langkah-langkah Penggunaan XHR:**
> >
> > 1. **Buat objek XHR baru:** `var` xhttp = new XMLHttpRequest();
> >     
> > 2. **Tentukan callback function:** Fungsi ini akan dieksekusi setiap kali `readyState` berubah.
> >     
> >     - `xhttp.onreadystatechange = function() { ... };`
> >         
> > 3. **Periksa status:** Di dalam callback, kita periksa apakah request sudah selesai dan berhasil.
> >     
> >     - `this.readyState == 4` (request selesai)
> >         
> >     - `this.status == 200` (respons "OK" dari server)
> >         
> > 4. **Buka koneksi:** Tentukan metode HTTP dan URL tujuan.
> >     
> >     - `xhttp.open("GET", "data.txt", true);` (parameter ketiga `true` menandakan asynchronous).
> >         
> > 5. **Kirim request:** `xhttp.send();`
> >     
> >
> > ### Same-Origin Policy dan CORS
> >
> > - **Same-Origin Policy:** Sebuah kebijakan keamanan penting di browser yang mencegah skrip dari satu _origin_ (domain, protokol, port) untuk meminta data dari _origin_ yang berbeda. Ini melindungi pengguna dari serangan seperti XSS.
> >     
> > - **CORS (Cross-Origin Resource Sharing):** Mekanisme yang memungkinkan server di origin lain untuk secara eksplisit memberikan izin kepada origin tertentu untuk mengakses resourcenya. Server melakukan ini dengan mengirimkan header HTTP khusus, seperti `Access-Control-Allow-Origin: https://situs-anda.com`.
> >     
> >
> > ### Metode Request: GET vs POST
> >
> > - **GET:**
> >     
> >     - Lebih sederhana dan cepat.
> >         
> >     - Data dikirim melalui URL (query string).
> >         
> >     - Cocok untuk meminta data yang tidak sensitif.
> >         
> >     - Hasilnya bisa di-cache oleh browser.
> >         
> >     - Memiliki batasan ukuran data.
> >         
> > - **POST:**
> >     
> >     - Data dikirim di dalam _body_ dari HTTP request.
> >         
> >     - Tidak ada batasan ukuran data.
> >         
> >     - Lebih aman untuk mengirim data sensitif (seperti password atau data form).
> >         
> >     - Tidak di-cache oleh browser.
> >         
> >     - Digunakan saat kita ingin mengubah data di server (misalnya, membuat entri baru di database).
> >         
> >
> > ### Fetch API: Alternatif Modern untuk XHR
> >
> > **Fetch API** adalah antarmuka modern untuk melakukan request network. Ini lebih kuat, fleksibel, dan menggunakan **Promise**, yang membuatnya lebih mudah diintegrasikan dengan sintaks `async/await`.
> >
> > **Contoh Penggunaan Fetch dengan `async/await`:**
> >
> > ```js
> > async function getData() {
> > 	try {
> > 		const response = await fetch('[https://api.example.com/data.json](https://api.example.com/data.json)');
> >     
> > 		if (!response.ok) {
> > 			throw new Error(`HTTP error! status: ${response.status}`);
> > 		}
> > 		 
> > 		const data = await response.json();
> > 	    return data;
> > 	} catch (e) {
> > 		console.error('There was a problem with the fetch operation:', e); 
> > 		return null;
> > 	} 
> > }
> > ```
> > 
> > ### Pola dan Kasus Penggunaan AJAX
> > 
> > **Kasus Penggunaan Umum:**
> > 
> > - **Autocomplete:** Saran pencarian saat pengguna mengetik.
> >     
> > - **Validasi Form:** Memeriksa ketersediaan username secara _real-time_ tanpa mengirim seluruh form.
> >     
> > - **Voting & Rating:** Mengirim suara atau rating tanpa me-reload halaman.
> >     
> > - **Infinite Scroll:** Memuat konten baru saat pengguna scroll ke bawah.
> >     
> > - **Aplikasi Chat:** Mengirim dan menerima pesan secara dinamis.
> >     
> > 
> > **Pola Desain AJAX:**
> > 
> > - **Periodic Refresh (Polling):** Klien secara berkala meminta data baru dari server.
> >     
> > - **Predictive Fetch:** Aplikasi mencoba menebak aksi pengguna berikutnya dan memuat data yang relevan terlebih dahulu.
> >     
> > - **Fallback Pattern:** Menangani error jika respons dari server tidak berhasil (misalnya status bukan 200 OK).
> >     

> [!cornell] #### Summary
> AJAX adalah teknik fundamental dalam pengembangan web modern yang memungkinkan halaman untuk berkomunikasi dengan server secara asynchronous di latar belakang, sehingga konten dapat diperbarui secara dinamis tanpa reload. Ini dicapai menggunakan API browser seperti `XMLHttpRequest`. Penggunaan AJAX menghasilkan pengalaman pengguna yang lebih mulus, cepat, dan interaktif, yang merupakan ciri khas dari aplikasi web canggih saat ini.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: JSON (JavaScript Object Notation)
> 
> Meskipun AJAX memiliki "XML" dalam namanya, format data yang paling dominan digunakan saat ini adalah **JSON**. JSON adalah format pertukaran data yang ringan dan mudah dibaca oleh manusia maupun mesin. Sintaksnya berasal dari notasi objek JavaScript, membuatnya sangat mudah untuk diolah di dalam JavaScript menggunakan `JSON.parse()` (mengubah string JSON menjadi objek JS) dan `JSON.stringify()` (mengubah objek JS menjadi string JSON).
> 
> #### Eksplorasi Mandiri: WebSocket
> 
> Untuk aplikasi yang membutuhkan komunikasi _real-time_ dua arah (seperti game online atau aplikasi kolaborasi live), AJAX dengan pola polling bisa menjadi tidak efisien. **WebSocket** adalah teknologi yang menyediakan koneksi persisten antara klien dan server, memungkinkan server untuk "mendorong" (push) data ke klien kapan saja tanpa klien harus memintanya terlebih dahulu. Ini adalah langkah selanjutnya setelah AJAX untuk aplikasi yang sangat interaktif.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **MDN Web Docs - AJAX:** [developer.mozilla.org/en-US/docs/Web/Guide/AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX "null")
>     
> - **MDN Web Docs - XMLHttpRequest:** [developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest "null")
>     
> - **JSON.org:** [www.json.org/json-en.html](https://www.json.org/json-en.html "null") - Pengenalan resmi tentang format JSON.
>