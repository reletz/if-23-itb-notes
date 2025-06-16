---
type: Note 
cssclasses:
- cornell-notes
---

_Back to_ [[01. Matkul/Stima]]

> [!cornell] Pengorganisasian Ruang Solusi
> 
> > ## Questions/Cues
> > 
> > - Ruang Solusi & Pohon
> > - Jenis Simpul Pohon Status
> > - Prinsip Pencarian Backtracking
> > - Simpul Hidup & Simpul-E
> > - Simpul Mati & Pruning
> > - Mekanisme Runut-balik
> > - Keunggulan Backtracking
> > - Skema Rekursif Backtracking
> > - Skema Iteratif Backtracking
> > - Kompleksitas Waktu Backtracking
> 
> > ### Pengorganisasian Ruang Solusi
> > 
> > Dalam algoritma backtracking, **ruang solusi (solution space)**, yaitu semua kemungkinan solusi dari sebuah persoalan, diorganisasikan secara khusus.
> > 
> > - **Struktur Pohon Berakar:** Ruang solusi ini biasanya diatur dalam bentuk **pohon berakar**. Ini memungkinkan kita untuk secara visual atau konseptual menelusuri setiap kemungkinan jalan menuju solusi.
> > - **Simpul sebagai Status:** Setiap **simpul (node)** dalam pohon ini menyatakan **status (state)** persoalan pada tahap tertentu. Ini seperti "titik" atau "konfigurasi" yang sedang dievaluasi.
> > - **Sisi sebagai Pilihan:** Setiap **sisi (cabang)** yang keluar dari sebuah simpul dilabeli dengan nilai-nilai yang mungkin untuk komponen solusi berikutnya (misalnya, nilai xi​). Misalnya, jika di satu titik ada tiga pilihan untuk komponen solusi xk​, maka akan ada tiga cabang yang keluar dari simpul tersebut.
> > - **Lintasan sebagai Solusi:** Sebuah lintasan dari **akar** (simpul awal) ke **simpul daun** (simpul akhir) dalam pohon ini menyatakan satu kemungkinan solusi lengkap. Seluruh lintasan dari akar ke daun membentuk ruang solusi.
> > - **Pohon Ruang Status:** Pohon yang mengorganisasikan ruang solusi ini secara khusus disebut **pohon ruang status (state space tree)**.
> > - **Macam-macam Simpul:** Ada tiga jenis simpul utama dalam pohon ini: **simpul akar** (titik awal pencarian), **simpul dalam** (simpul di tengah pohon yang masih bisa memiliki anak), dan **simpul daun** (simpul di ujung cabang yang tidak memiliki anak).
> > 
> > ### Prinsip Pencarian Solusi dengan Algoritma Runut-balik
> > 
> > Proses pencarian solusi dalam backtracking mengikuti serangkaian prinsip yang terstruktur:
> > 
> > - **Pencarian Berbasis DFS:** Solusi dicari dengan membangkitkan simpul-simpul status, membentuk lintasan dari akar menuju simpul solusi (yaitu, simpul daun yang valid). Aturan pembangkitan simpul yang dipakai adalah mengikuti aturan **depth-first order (DFS)**. Artinya, algoritma akan menjelajahi satu cabang (jalur keputusan) hingga ke kedalaman maksimum sebelum kembali dan mencoba cabang lain.
> > - **Simpul Hidup (Live Node):** Simpul-simpul yang sudah dibangkitkan selama proses pencarian (berada di jalur aktif atau pernah dikunjungi) disebut **simpul hidup**.
> > - **Simpul-E (Expand-node):** Simpul hidup yang saat ini sedang dieksplorasi atau diperluas (yaitu, algoritma sedang mencoba untuk menemukan anak-anaknya) disebut **simpul-E**. Setiap kali simpul-E diperluas, lintasan yang dibangun olehnya bertambah panjang (menambah komponen solusi xk​).
> > - **Simpul Mati (Dead Node) & Pruning:** Jika lintasan yang sedang dibentuk oleh simpul-E ternyata **tidak mengarah ke solusi** (berdasarkan evaluasi dari **fungsi pembatas**), maka simpul-E tersebut "dimatikan" dan menjadi **simpul mati**. Ketika sebuah simpul menjadi simpul mati, maka secara implisit (otomatis) **semua simpul-simpul anaknya dipangkas (pruning)** dan tidak akan dieksplorasi lebih lanjut. Ini adalah kunci efisiensi backtracking.
> > - **Mekanisme Runut-balik (Backtrack):** Jika pembentukan lintasan berakhir pada simpul mati (jalur buntu), maka proses pencarian akan **runut-balik (backtrack)** ke simpul pada aras (level) di atasnya yang masih merupakan simpul hidup. Kemudian, proses dilanjutkan dengan membangkitkan simpul anak lainnya dari simpul di aras atas tersebut (jika ada). Simpul anak yang baru ini kemudian menjadi simpul-E yang baru.
> > - **Kondisi Berhenti:** Pencarian dihentikan ketika kita telah sampai pada **goal node** (simpul solusi yang memenuhi semua kriteria).
> > - **Efisiensi vs Brute Force:** Berbeda dengan metode _brute force_ yang mengevaluasi semua lintasan dari akar ke daun, backtracking hanya mengeksplorasi lintasan yang **"menjanjikan" (promising)** berdasarkan fungsi pembatas. Ini membuat backtracking jauh lebih efisien untuk banyak persoalan.
> > 
> > ### Skema Umum Algoritma Runut-balik
> > 
> > Algoritma backtracking umumnya dapat diimplementasikan dalam dua skema utama: rekursif dan iteratif.
> > 
> > 1. **Skema Rekursif (RunutBalikR):**
> >     
> >     - Ini adalah pendekatan yang paling umum dan seringkali lebih mudah dipahami.
> >     - Sebuah prosedur rekursif dipanggil untuk menentukan nilai xk​, dengan asumsi komponen solusi x1​ hingga xk−1​ sudah ditentukan.
> >     - Algoritma akan mencoba setiap nilai yang mungkin untuk xk​ menggunakan **fungsi pembangkit T()**.
> >     - Untuk setiap nilai xk​ yang dibangkitkan, **fungsi pembatas B()** diperiksa.
> >     - Jika B() bernilai `true` (artinya lintasan parsial (x1​..xk​) valid dan menjanjikan), maka:
> >         - Diperiksa apakah lintasan sudah lengkap (k=n dan merupakan solusi). Jika ya, solusi dicetak.
> >         - Jika k<n (solusi belum lengkap), prosedur `RunutBalikR` akan dipanggil secara rekursif untuk menentukan xk+1​ (bergerak ke level berikutnya di pohon).
> >     - Proses ini (loop) berlanjut hingga semua nilai yang mungkin untuk xk​ telah dicoba.
> >     - Pemanggilan pertama untuk memulai proses adalah: `RunutBalikR(1)`.
> >     - Setiap simpul internal di pohon ruang status secara konseptual diasosiasikan dengan satu pemanggilan rekursif.
> > 2. **Skema Iteratif (RunutBalikI):**
> >     
> >     - Pendekatan ini menggunakan struktur loop `while` dan variabel k untuk melacak tingkat (kedalaman) pencarian di pohon ruang status, tanpa menggunakan rekursi eksplisit.
> >     - Pada setiap tingkat k, algoritma mencoba mencari nilai yang belum dicoba untuk xk​ yang memenuhi **fungsi pembangkit T()** dan **fungsi pembatas B()**.
> >     - Jika nilai yang memenuhi ditemukan:
> >         - Diperiksa apakah lintasan (x1​..xk​) merupakan simpul solusi. Jika ya, solusi dicetak.
> >         - Variabel tingkat k dinaikkan (k←k+1) untuk menentukan nilai xk+1​ selanjutnya (maju ke level berikutnya).
> >     - Jika tidak ada lagi nilai xk​ yang memenuhi fungsi pembatas di tingkat k saat ini, atau jika semua anak dari simpul saat ini sudah dieksplorasi, maka algoritma melakukan runut-balik dengan menurunkan nilai k (k←k−1) (kembali ke level sebelumnya).
> >     - Loop berlanjut selama k=0 (selama belum kembali ke titik sebelum akar).
> >     - Pemanggilan pertama untuk memulai proses adalah: `RunutBalikI(1)`.
> > 
> > **Kompleksitas Waktu (Kasus Terburuk):**
> > 
> > - Pada kasus terburuk, jika pohon ruang status memiliki 2n atau n! simpul (misalnya, untuk masalah yang sangat biner atau permutasi), waktu yang dibutuhkan bisa dalam orde O(p(n)⋅2n) atau O(q(n)⋅n!), di mana p(n) dan q(n) adalah fungsi polinom derajat n yang menyatakan waktu komputasi di setiap simpul.
> > - Meskipun backtracking mengurangi jumlah simpul yang dikunjungi dibandingkan _brute force_ karena adanya _pruning_, pada kasus terburuk di mana fungsi pembatas tidak banyak memangkas pohon (misalnya, semua cabang menjanjikan), kompleksitasnya bisa mendekati _brute force_.
 
> [!cornell] #### Summary
> **Ruang solusi** dalam backtracking diorganisasikan dalam **pohon ruang status** dengan simpul merepresentasikan status dan lintasan dari akar ke daun sebagai solusi. Pencarian menggunakan **Depth-First Search (DFS)**, secara cerdas memangkas **simpul mati** (cabang tidak menjanjikan) dengan **fungsi pembatas** dan melakukan **runut-balik** saat buntu. Implementasi dapat berupa **rekursif** atau **iteratif**, keduanya bertujuan untuk eksplorasi efisien. Meskipun efisien, kompleksitas kasus terburuknya dapat tetap eksponensial jika pemangkasan tidak optimal.