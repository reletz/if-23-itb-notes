---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: SEO for Web Application
> 
> > ## Questions/Cues
> >
> > - Definisi SEO (Developer Perspective)
> >     
> > - Mengapa SEO Penting?
> >     
> > - 3 Tahap Google Search (Crawling, Rendering, Indexing)
> >     
> > - Bagaimana Googlebot Bekerja?
> >     
> > - Apa itu Rendering Queue?
> >     
> > - SSR vs CSR (Dampak SEO)
> >     
> > - Technical SEO Elements
> >     
> > - Robots.txt & Sitemap.xml
> >     
> > - Canonical Tags
> >     
> > - Structured Data (JSON-LD)
> >     
> > - Core Web Vitals
> >     
> > - Common SEO Mistakes
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-15c-SEO-for-WebApp
> >     
> > - Google Search Central Docs
> >     
> 
> > ### 1. Apa itu SEO? (Perspektif Developer)
> >
> > **Definisi:** Proses meningkatkan visibilitas website di mesin pencari untuk menarik trafik yang relevan.
> >
> > **Bagi Developer, SEO bukan sekadar marketing, tapi:**
> >
> > - Implementasi teknis level kode.
> >     
> > - Pertimbangan performa website.
> >     
> > - Implementasi data terstruktur (_Structured Data_).
> >     
> > - Memastikan aksesibilitas dan kemampuan situs untuk dirayapi (_Crawlability_).
> >     
> >
> > **Mengapa Penting?**
> >
> > - 68% pengalaman online dimulai dari mesin pencari.
> >     
> > - Halaman pertama Google menangkap 71% dari total trafik.
> >     
> > - **Technical SEO adalah tanggung jawab developer.**
> >     
> >
> > ### 2. Cara Kerja Google Search (3 Tahap)
> >
> > Proses Google menemukan dan menampilkan web Anda terdiri dari tiga langkah utama:
> >
> > 1. **Crawling (Perayapan):** Googlebot menemukan dan mengunduh halaman melalui tautan (links).
> >     
> > 2. **Rendering (Pemrosesan):** Mengeksekusi JavaScript dan memproses konten visual (menggunakan Chromium versi terbaru/evergreen).
> >     
> > 3. **Indexing (Pengindeksan):** Menganalisis dan menyimpan konten ke dalam database besar Google untuk ditampilkan di hasil pencarian.
> >     
> >
> > ### 3. Deep Dive: Crawling
> >
> > **Metode Penemuan:** Googlebot menemukan URL baru melalui link dari halaman lain, XML Sitemap, atau submisi manual via Search Console.
> >
> > **Proses Crawling:**
> >
> > 1. Cek file `robots.txt` (Apakah saya boleh masuk?).
> >     
> > 2. Kirim HTTP Request.
> >     
> > 3. Parse HTML untuk mencari link lain.
> >     
> > 4. Tambahkan URL baru ke antrean (_crawl queue_).
> >     
> > 5. Patuhi batas kecepatan perayapan (_crawl rate limits_).
> >     
> >
> > ### 4. Deep Dive: Rendering (Tantangan JavaScript)
> >
> > Slide menekankan bahwa rendering JavaScript itu "mahal" (berat secara komputasi).
> .
> > - **Processing Queue:** Setelah crawling HTML awal, halaman masuk antrean untuk dirender. Ini bisa memakan waktu (detik hingga minggu).
> >     
> > - **JavaScript Execution:** Googlebot menjalankan JS untuk melihat konten yang dimuat secara dinamis (AJAX/Fetch).
> >     
> > - **Indexing Content:** Baru setelah JS selesai, konten final disimpan.
> >     
> >
> > **SSR vs CSR untuk SEO:**
> >
> > - **Server-Side Rendering (SSR):** Konten HTML sudah jadi dari server. Sangat bagus untuk SEO karena Googlebot langsung melihat isinya.
> >     
> > - **Client-Side Rendering (CSR):** Browser (dan Googlebot) harus menjalankan JS dulu baru konten muncul. Berisiko jika Googlebot gagal merender JS.
> >     
> >
> > ### 5. Elemen Kunci Technical SEO
> >
> > 1. **Robots.txt:** File teks yang memberi tahu bot mana halaman yang boleh/tidak boleh diakses.
> >     
> >     - _Ingat:_ Jangan memblokir folder `/css/` atau `/js/`, Google butuh itu untuk rendering!
> >         
> > 2. **Sitemap.xml:** Peta situs yang berisi daftar semua URL penting agar Google tidak melewatkannya.
> >     
> > 3. **Canonical Tags:** Tag `<link rel="canonical" href="...">` untuk mencegah masalah konten duplikat (jika satu halaman bisa diakses dari banyak URL berbeda).
> >     
> > 4. **Meta Tags:**
> > 	
> > 	- Title Tag: Judul di hasil pencarian (Sangat penting).
> > 			
> > 	- Meta Description: Ringkasan di bawah judul.
> > 			
> > 	- Viewport: Untuk optimasi mobile.
> > 			
> >
> > ### 6. Structured Data (Schema.org)
> >
> > Format standar (biasanya JSON-LD) untuk memberi tahu Google arti konten Anda.
> >
> > - **Manfaat:** Memungkinkan **Rich Snippets** (Tampilan hasil pencarian yang lebih kaya: ada bintang review, harga produk, resep, dll).
> >     
> > - **Implementasi:** Kode JSON yang disisipkan di dalam `<head>`.
> >     
> >
> > ### 7. Core Web Vitals (Faktor Performa)
> >
> > Metrik performa yang menjadi faktor peringkat Google:
> >
> > 1. **LCP (Largest Contentful Paint):** Kecepatan loading elemen terbesar (Target: < 2.5 detik).
> >     
> > 2. **FID (First Input Delay):** Responsivitas interaksi pertama (Target: < 100 ms).
> >     
> > 3. **CLS (Cumulative Layout Shift):** Stabilitas visual (Target: < 0.1).
> >     
> >
> > ### 8. Kesalahan Umum (Common Mistakes)
> >
> > - **Memblokir Resource:** `Disallow: /css/` atau `/js/` di robots.txt. (Jangan lakukan ini!).
> >     
> > - **Hash URLs:** Menggunakan `href="#/products"` (Googlebot sering mengabaikan hash). Gunakan `href="/products"` (History API).
> >     
> > - **Duplicate Content:** Konten sama di banyak URL tanpa canonical tag.
> >     
> > - **Missing Alt Text:** Gambar tanpa deskripsi teks (`<img src="...">` saja).
> >     
> > - **Slow Speed:** Gambar belum dioptimasi atau caching mati.
> >     

> [!cornell] #### Summary
> 
> SEO for Web App menuntut developer untuk memahami cara kerja Googlebot (Crawling, Rendering, Indexing). Tantangan terbesar pada aplikasi web modern (SPA) adalah memastikan Rendering JavaScript berjalan mulus atau menggunakan SSR agar konten terbaca. Implementasi teknis seperti Robots.txt, Sitemap, Canonical Tags, dan Structured Data (JSON-LD) adalah fondasi agar website "bersahabat" dengan mesin pencari. Selain itu, performa situs yang diukur lewat Core Web Vitals kini menjadi faktor penentu peringkat yang krusial.

> [!ad-libitum]- Additional Information (Deep Dive Teknis)
> 
> #### 1. Implementasi JSON-LD (Structured Data)
> 
> Berikut contoh kode JSON-LD untuk memberitahu Google bahwa halaman ini adalah sebuah **Produk**:
> 
> ```json
> <script type="application/ld+json">
> {
>   "@context": "[https://schema.org/](https://schema.org/)",
>   "@type": "Product",
>   "name": "Gaming Laptop X1",
>   "image": "[https://example.com/photos/1x1/photo.jpg](https://example.com/photos/1x1/photo.jpg)",
>   "description": "Laptop gaming terbaik 2025 dengan RTX 5090.",
>   "brand": {
>     "@type": "Brand",
>     "name": "Asus ROG"
>   },
>   "offers": {
>     "@type": "Offer",
>     "url": "[https://example.com/laptop-x1](https://example.com/laptop-x1)",
>     "priceCurrency": "IDR",
>     "price": "25000000",
>     "availability": "[https://schema.org/InStock](https://schema.org/InStock)"
>   }
> }
> </script>
> ```
> 
> Kode ini tidak terlihat user, tapi dibaca Google untuk menampilkan harga dan status stok langsung di hasil pencarian.
> 
> #### 2. Dynamic Rendering (Solusi Hibrida)
> 
> Jika aplikasi Anda berat di Client-Side (CSR) dan sulit diubah ke SSR, Anda bisa gunakan teknik **Dynamic Rendering**.
> 
> - **Cara Kerja:** Server mendeteksi User-Agent.
>     
> - Jika User-Agent = Browser Manusia -> Kirim file JS biasa (CSR).
>     
> - Jika User-Agent = Googlebot -> Kirim versi HTML statis yang sudah dirender (Pre-rendered) menggunakan tool seperti Puppeteer atau Rendertron.
>     
> 
> #### 3. Mengapa Hash URL (`/#/`) Buruk untuk SEO?
> 
> Googlebot secara historis menganggap apa pun setelah tanda pagar (`#`) sebagai fragmen di dalam halaman yang sama, bukan halaman baru. Meskipun Googlebot modern semakin pintar, praktik terbaik tetap menggunakan **History API** (`pushState`) untuk membuat URL bersih (`/products/123`) agar setiap halaman dianggap unik dan diindeks terpisah.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara Crawling dan Indexing?</strong></summary>
> 
> Crawling adalah proses menemukan dan mengunduh halaman web, sedangkan Indexing adalah proses menganalisis isi halaman tersebut dan menyimpannya ke database mesin pencari agar bisa dicari user.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa kita tidak boleh memblokir folder CSS atau JS di robots.txt?</strong></summary>
> 
> Karena Googlebot melakukan "Rendering" untuk melihat halaman seperti manusia. Jika CSS/JS diblokir, Googlebot melihat halaman yang "rusak" atau kosong, yang bisa menurunkan peringkat SEO.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa fungsi Canonical Tag?</strong></summary>
> 
> Untuk memberi tahu Google URL mana yang merupakan versi "asli" atau "utama" jika ada beberapa URL yang menampilkan konten yang sama (duplikat), sehingga otoritas ranking tidak terpecah.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Jelaskan metrik LCP (Largest Contentful Paint)!</strong></summary>
> 
> Metrik Core Web Vitals yang mengukur waktu loading elemen konten terbesar (gambar utama atau blok teks) di viewport. Target yang baik adalah di bawah 2.5 detik.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa itu JSON-LD?</strong></summary>
> 
> JSON for Linking Data: Format data terstruktur berbasis JavaScript yang disisipkan di halaman web untuk memberikan konteks semantik (arti) kepada mesin pencari tentang konten halaman (misal: ini adalah Resep, Produk, atau Event).
> 
> </details>