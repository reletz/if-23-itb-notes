---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: WebAssembly (WASM)
> 
> > ## Questions/Cues
> >
> > - Definisi WebAssembly
> >     
> > - Keterbatasan JavaScript
> >     
> > - 4 Fitur Kunci WASM
> >     
> > - Arsitektur WASM
> >     
> > - Alur Kompilasi (C++ -> WASM)
> >     
> > - Linear Memory Model
> >     
> > - Kapan Menggunakan WASM?
> >     
> > - Integrasi JS dan WASM
> >     
> > - Fungsi `fetch` dan `instantiate`
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-15b-WebAssembly
> >     
> > - WebAssembly.org
> >     
> > - MDN Web Docs
> >     
> 
> > ### 1. Definisi & Latar Belakang
> >
> > **WebAssembly (WASM)** adalah format instruksi biner tingkat rendah (_low-level_) yang dirancang untuk menjalankan kode di web dengan kecepatan mendekati _native speed_ (kecepatan aplikasi desktop asli).
> >
> > **Mengapa WASM lahir?**
> >
> > - **Keterbatasan JavaScript:** JS adalah satu-satunya bahasa asli browser, tetapi kurang ideal untuk tugas berat (seperti video editing, 3D gaming, simulasi ilmiah).
> >     
> > - **Kebutuhan Performa:** Developer butuh cara menjalankan kode dari bahasa performa tinggi (C, C++, Rust) di browser.
> >     
> >
> > **Timeline Singkat:**
> >
> > - 2015: Diumumkan.
> >     
> > - 2017: Didukung oleh semua browser utama (Chrome, Firefox, Safari, Edge).
> >     
> > - 2019: Menjadi standar rekomendasi W3C ke-4 untuk web (setelah HTML, CSS, JS).
> >     
> >
> > ### 2. Empat Fitur Kunci (Key Features)
> >
> > 1. **Platform-Independent:** Kode WASM dikompilasi satu kali dan bisa jalan di browser mana saja, OS apa saja, dan arsitektur CPU apa saja (x86, ARM).
> >     
> > 2. **Web Compatibility:** Berjalan berdampingan dengan JavaScript. JS bisa panggil WASM, dan WASM bisa panggil JS.
> >     
> > 3. **Secure & Sandboxed:** Berjalan di lingkungan memori yang aman dan terisolasi, sama seperti JS, sehingga tidak bisa sembarangan akses file sistem user.
> >     
> > 4. **Performance-Critical:** Didesain khusus untuk aplikasi yang butuh perhitungan matematika berat dan cepat.
> >     
> >
> > ### 3. Arsitektur & Cara Kerja
> >
> > Bagaimana kode C++ bisa jalan di Chrome?
> >
> > 1. **Source Code:** Developer menulis kode di C, C++, Rust, atau Go.
> >     
> > 2. **Kompilasi:** Compiler khusus (seperti Emscripten) mengubah kode tersebut menjadi file `.wasm` (binary).
> >     
> > 3. **Distribusi:** File `.wasm` dikirim ke browser lewat internet.
> >     
> > 4. **Eksekusi:** Browser memiliki **WASM Virtual Machine** yang menerjemahkan binary `.wasm` menjadi _Machine Code_ spesifik perangkat user (x86/ARM) dengan sangat cepat.
> >     
> >
> > ### 4. Struktur Memori (Linear Memory Model)
> >
> > WASM tidak punya Garbage Collector otomatis seperti JS (di versi awal).
> >
> > - **Linear Memory:** Memori di WASM hanyalah satu array bytes (`ArrayBuffer`) yang kontinu dan bisa diubah ukurannya (_resizable_).
> >     
> > - **Sharing:** Memori ini bisa dibaca/tulis oleh JavaScript. Jadi JS dan WASM bisa bertukar data lewat "kolam memori" yang sama ini.
> >     
> > - Efisien dan sederhana untuk tugas tingkat rendah.
> >     
> >
> > ### 5. Integrasi dengan JavaScript (Kodingan)
> >
> > Slide menunjukkan cara memuat modul WASM di JavaScript modern:
> >
> > ```js
> > // 1. Ambil file wasm
> > fetch('module.wasm')
> >   // 2. Ubah jadi ArrayBuffer
> >   .then(response => response.arrayBuffer()) 
> >   // 3. Instansiasi modul
> >   .then(bytes => WebAssembly.instantiate(bytes)) 
> >   .then(results => {
> >      const instance = results.instance;
> >      // 4. Panggil fungsi yang diekspor WASM
> >      console.log(instance.exports.add(5, 10)); 
> >   });
> > ```
> >
> > ### 6. Studi Kasus Penggunaan (Use Cases)
> >
> > Kapan kita harus pakai WASM? Bukan untuk menggantikan JS total, tapi untuk bagian berat:
> >
> > - **Game Engines:** Unity & Unreal Engine di web.
> >     
> > - **Media Editing:** Adobe Photoshop Web, Video Editor (Figma menggunakan WASM untuk render engine).
> >     
> > - **Scientific Simulation:** Simulasi fisika, visualisasi data kompleks.
> >     
> > - **AI/ML:** TensorFlow.js menggunakan backend WASM untuk inferensi model yang cepat.
> >     

> [!cornell] #### Summary
> 
> WebAssembly (WASM) adalah revolusi performa web yang memungkinkan bahasa pemrograman tingkat rendah seperti C++, Rust, dan Go berjalan di browser dengan kecepatan Near-Native. WASM tidak menggantikan JavaScript, melainkan melengkapinya untuk tugas-tugas berat (heavy computation). Dengan arsitektur Virtual Machine berbasis stack dan model Linear Memory, WASM menjadi solusi standar W3C untuk aplikasi web masa depan yang kompleks seperti Game 3D, Video Editing, dan AI.

> [!ad-libitum]- Additional Information (Deep Dive Teknis)
> 
> #### 1. Konsep Stack Machine
> 
> WASM bekerja sebagai "Stack Machine". Instruksinya beroperasi pada tumpukan nilai (stack), bukan register CPU langsung.
> 
> Contoh operasi 1 + 2:
> 
> 1. `i32.const 1` (Push angka 1 ke stack)
>     
> 2. `i32.const 2` (Push angka 2 ke stack)
>     
> 3. i32.add (Pop dua angka teratas, jumlahkan, push hasilnya ke stack)
>     
>     Desain ini membuat file binary .wasm sangat padat (kecil ukurannya) dan mudah divalidasi oleh browser.
>     
> 
> #### 2. Emscripten & Toolchain
> 
> Salah satu tool paling populer untuk WASM adalah Emscripten. Ia bertindak sebagai Drop-in Replacement untuk compiler C/C++ standar (seperti GCC/Clang).
> 
> Perintah compile sederhana:
> 
> ```bash
> emcc hello.c -o hello.html
> ```
> 
> Perintah ini akan menghasilkan file `.wasm`, file `.js` (sebagai perekat/glue code), dan file `.html` untuk demo langsung.
> 
> #### 3. Berbagi Memori (SharedArrayBuffer)
> 
> Untuk aplikasi multithreading, WASM bisa menggunakan `SharedArrayBuffer` dan `Atomics` untuk berbagi data antar Web Workers tanpa perlu menyalin data (zero-copy), yang sangat meningkatkan performa konkurensi.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apakah WebAssembly bertujuan untuk menggantikan JavaScript sepenuhnya?</strong></summary>
> 
> Tidak. WASM didesain untuk bekerja berdampingan (complementary) dengan JavaScript. JS menangani interaksi UI dan logika tingkat tinggi, sementara WASM menangani komputasi berat.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa WASM disebut "Platform-Independent"?</strong></summary>
> 
> Karena format biner WASM tidak terikat pada satu OS atau arsitektur prosesor tertentu. Browser memiliki Virtual Machine yang menerjemahkan kode WASM ke kode mesin perangkat pengguna secara real-time.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa itu Linear Memory dalam konteks WASM?</strong></summary>
> 
> Model memori di mana seluruh data aplikasi disimpan dalam satu array byte yang kontinu (contiguous). Ini bisa diakses oleh WASM (baca/tulis) dan juga oleh JavaScript (sebagai ArrayBuffer).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Bahasa pemrograman apa saja yang bisa dikompilasi ke WASM?</strong></summary>
> 
> Utamanya bahasa tingkat rendah seperti C, C++, Rust, dan Go. Namun sekarang bahasa seperti Python, C#, dan Kotlin juga memiliki dukungan eksperimental untuk target WASM.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Bagaimana cara browser menjalankan file .wasm?</strong></summary>
> 
> Browser melakukan: 1. Fetching (unduh), 2. Parsing & Validation (cek keamanan), 3. Compilation (ubah ke machine code), 4. Instantiation (siap dijalankan/eksekusi).
> 
> </details>