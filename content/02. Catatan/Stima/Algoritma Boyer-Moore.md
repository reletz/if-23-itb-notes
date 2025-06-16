_Back to_ [[01. Matkul/Stima]]

> [!cornell] Algoritma Boyer-Moore
> 
> > ## Questions/Cues
> > 
> > - Definisi Boyer-Moore
> > - Teknik Kaca Pembesar (Looking-Glass)
> > - Teknik Lompatan Karakter (Character-Jump)
> > - 3 Kasus Lompatan Karakter
> > - Fungsi Kemunculan Terakhir L()
> > - Definisi L(x)
> > - Contoh Fungsi L()
> > - Implementasi Boyer-Moore (Java)
> > - `buildLast` (Logika)
> > - `bmMatch` (Logika Cocok)
> > - `bmMatch` (Logika Mismatch)
> > - Kompleksitas Waktu Boyer-Moore
> > - Keunggulan Boyer-Moore
> > - Kelemahan Boyer-Moore
> 
> > ### Algoritma Boyer-Moore
> > Algoritma Boyer-Moore adalah algoritma pencocokan _pattern_ yang dikenal sangat efisien dalam praktiknya, terutama untuk alfabet besar.
> > 
> > - **Definisi:** Algoritma ini didasarkan pada dua teknik utama yang memungkinkannya membuat pergeseran _pattern_ yang jauh lebih besar daripada algoritma lain seperti Brute Force atau KMP.
> > - **Teknik 1: Teknik Kaca Pembesar (The Looking-Glass Technique):**
> >     - Tidak seperti Brute Force atau KMP yang membandingkan dari kiri ke kanan, Boyer-Moore mencari _pattern_ P di dalam teks T dengan **bergerak mundur (dari kanan ke kiri)** melalui _pattern_, dimulai dari karakter terakhirnya. Artinya, perbandingan karakter dimulai dari akhir _pattern_ dan karakter teks yang selaras, kemudian bergerak ke kiri.
> > - **Teknik 2: Teknik Lompatan Karakter (The Character-Jump Technique):**
> >     - Ketika terjadi ketidakcocokan (_mismatch_) pada karakter teks T[i] (misalnya, T[i]=’x’) dan karakter _pattern_ P[j] di posisi yang sama tidak cocok dengan T[i] (yaitu, P[j]=T[i]), algoritma menggunakan karakter 'x' ini (**karakter teks yang menyebabkan _mismatch_**) untuk menentukan seberapa jauh _pattern_ harus digeser ke kanan. Ini adalah perbedaan kunci dari KMP yang hanya menggunakan informasi dari _pattern_ itu sendiri.
> > 
> > ### 3 Kasus Kemungkinan dalam Lompatan Karakter (Bad Character Rule)
> > 
> > Ketika terjadi _mismatch_ pada T[i] dengan karakter P[j]:
> > 
> > 1. **Kasus 1:** Jika _pattern_ P **mengandung karakter 'x'** (karakter teks di T[i]) di suatu tempat, maka coba geser _pattern_ P ke kanan untuk **menyelaraskan kemunculan terakhir (_last occurrence_) dari 'x' di P dengan T[i]**. Setelah pergeseran ini, perbandingan kemudian dilanjutkan dari akhir _pattern_ pada posisi yang baru. Ini adalah pergeseran yang optimal jika 'x' ada di _pattern_.
> > 2. **Kasus 2:** Jika _pattern_ P **mengandung karakter 'x' di suatu tempat**, tetapi pergeseran ke kanan untuk menyelaraskan dengan kemunculan terakhir tidak memungkinkan (misalnya, kemunculan terakhir 'x' ada di sebelah kanan posisi _mismatch_ di _pattern_, yang secara fisik akan menggeser _pattern_ ke kiri atau terlalu jauh ke kanan), maka geser P ke kanan **hanya 1 karakter ke T[i+1]**. Ini adalah kasus "fallback" jika Kasus 1 tidak memungkinkan pergeseran yang masuk akal.
> > 3. **Kasus 3:** Jika Kasus 1 dan Kasus 2 tidak berlaku (artinya, karakter 'x' yang menyebabkan _mismatch_ di T[i] **tidak ada di dalam _pattern_ P sama sekali**), maka kita bisa menggeser _pattern_ P ke kanan sejauh mungkin. Kita menggeser P agar karakter pertama P selaras dengan T[i+1] (atau lebih tepatnya, geser seluruh _pattern_ melewati T[i]). Ini adalah pergeseran paling besar yang mungkin, karena karakter yang menyebabkan _mismatch_ tidak akan pernah cocok dengan _pattern_.
> > 
> > ### Fungsi Kemunculan Terakhir (Last Occurrence Function) L()
> > 
> > Untuk menerapkan teknik lompatan karakter secara efisien, Boyer-Moore melakukan _preprocessing_ pada _pattern_ P dan seluruh alfabet yang mungkin A untuk membangun **fungsi kemunculan terakhir L()**.
> > 
> > - L() memetakan semua huruf dalam alfabet A ke bilangan bulat (indeks).
> > - **Definisi L(x):**
> >     - L(x) adalah **indeks terbesar i** sedemikian sehingga P[i]=x (artinya, indeks kemunculan terakhir karakter 'x' di dalam _pattern_ P).
> >     - Jika tidak ada indeks i di P sedemikian sehingga P[i]=x (karakter 'x' tidak ada di _pattern_), maka L(x) didefinisikan sebagai **-1**.
> > - **Contoh L():**
> >     - Alfabet A={a, b, c, d}.
> >     - Pattern P: "abacab".
> >     - Indeks P: `0 1 2 3 4 5`
> >     - Karakter P: `a b a c a b`
> >     - Fungsi L() akan menyimpan indeks terakhir dari setiap karakter:
> >         - L(’a’)=4 (indeks terbesar 'a' di P).
> >         - L(’b’)=5 (indeks terbesar 'b' di P).
> >         - L(’c’)=3 (indeks terbesar 'c' di P).
> >         - L(’d’)=−1 ('d' tidak ada di P).
> >     - Representasi tabel L(x): `x : d c b a` `L(x) : -1 3 5 4`
> > - **Catatan:** Dalam kode Boyer-Moore, L() dihitung saat _pattern_ P dibaca. Biasanya L() disimpan sebagai sebuah _array_ (misalnya, `last[]` dengan ukuran 128 untuk ASCII) yang diinisialisasi dengan -1, lalu diisi dengan indeks terakhir dari setiap karakter yang muncul di _pattern_.
> > 
> > ### Implementasi Algoritma Boyer-Moore (dalam Java)
> > 
> > Implementasi Boyer-Moore juga terbagi dua: membangun tabel _last occurrence_ dan melakukan pencocokan.
> > 
> > ```java
> > public class BoyerMoore {
> >     // Metode utama untuk pencocokan Boyer-Moore
> >     public int bmMatch(String text, String pattern) {
> >         int n = text.length();
> >         int m = pattern.length();
> >         int[] last = buildLast(pattern); // Membangun fungsi kemunculan terakhir
> > 
> >         // i adalah indeks di teks (mulai dari posisi yang selaras dengan akhir pattern)
> >         // j adalah indeks di pattern (mulai dari akhir pattern)
> >         int i = m - 1; 
> >         int j = m - 1;
> > 
> >         do {
> >             if (pattern.charAt(j) == text.charAt(i)) { // Karakter cocok (dari kanan ke kiri)
> >                 if (j == 0) { // Jika sudah mencapai awal pattern dan cocok
> >                     return i; // Seluruh pattern cocok, kembalikan posisi awal di teks
> >                 }
> >                 i--; // Maju ke kiri di teks
> >                 j--; // Maju ke kiri di pattern (teknik kaca pembesar)
> >             } else { // Karakter tidak cocok (mismatch)
> >                 // Teknik lompatan karakter (character jump)
> >                 // Dapatkan indeks kemunculan terakhir karakter teks yang mismatch
> >                 int lo = last[text.charAt(i)];
> > 
> >                 // Hitung jumlah pergeseran.
> >                 // Ini menggabungkan logika 3 kasus pergeseran:
> >                 // (m-1 - lo) adalah pergeseran standar bad-character
> >                 // (j - 1) adalah berapa banyak karakter yang sudah cocok sebelumnya (untuk meminimalkan)
> >                 // Math.max digunakan untuk memastikan pergeseran minimal 1 atau lebih besar
> >                 i += m - Math.min(j, 1 + lo); 
> >                 j = m - 1; // Reset indeks pattern kembali ke akhir pattern
> >             }
> >         } while (i <= n - 1); // Loop berlanjut hingga pattern tidak mungkin cocok lagi
> > 
> >         return -1; // Pattern tidak ditemukan
> >     }
> > 
> >     // Metode untuk membangun array fungsi kemunculan terakhir last[]
> >     private int[] buildLast(String pattern) {
> >         int[] last = new int[128]; // Asumsi alfabet ASCII (128 karakter)
> >         // Inisialisasi semua dengan -1 (karakter tidak ada di pattern)
> >         for (int i = 0; i < 128; i++) {
> >             last[i] = -1;
> >         }
> > 
> >         // Isi array last dengan indeks kemunculan terakhir
> >         for (int i = 0; i < pattern.length(); i++) {
> >             last[pattern.charAt(i)] = i; // Karakter P[i] terakhir kali muncul di indeks i
> >         }
> >         return last;
> >     }
> > }
> > ```
> > 
> > - **Penggunaan:** Mirip dengan algoritma lainnya, Anda akan memanggil `bmMatch` dan mencetak hasilnya.
> > 
> > ### Analisis Kompleksitas Boyer-Moore
> > 
> > - **Kompleksitas waktu kasus terburuk** Boyer-Moore adalah O(nm+∣Σ∣), di mana ∣Σ∣ adalah ukuran alfabet (misalnya, 128 untuk ASCII). Meskipun secara teori bisa seburuk Brute Force, dalam praktiknya jarang terjadi.
> > - Namun, Boyer-Moore **cepat** ketika **alfabet (∣Σ∣) besar**, dan **lambat** ketika **alfabet kecil**.
> >     - **Contoh:** Sangat baik untuk teks berbahasa Inggris (alfabet besar dengan banyak karakter unik), tetapi kurang optimal untuk data biner (alfabet kecil seperti 0, 1).
> > - Boyer-Moore secara signifikan **lebih cepat** daripada Brute Force untuk pencarian teks berbahasa Inggris rata-rata.
> > - **Contoh Kasus Terburuk:** Teks: "aaaaa...a", Pattern: "baaaaa". Dalam kasus ini, perbandingan mundur akan sering cocok sampai karakter 'b' di awal _pattern_, baru terjadi _mismatch_, menyebabkan pergeseran yang sangat kecil.
 
> [!cornell] ### Summary
> **Boyer-Moore** adalah algoritma pencocokan string yang efisien, membandingkan _pattern_ dari kanan ke kiri (**looking-glass technique**) dan melakukan **lompatan besar (character-jump technique)** saat _mismatch_ dengan memanfaatkan **fungsi kemunculan terakhir (L())** dari karakter yang menyebabkan _mismatch_ di teks. Ia unggul dengan **alfabet besar**, memberikan pergeseran yang signifikan, dengan kompleksitas kasus terburuk O(nm+∣Σ∣), namun dalam praktiknya sering kali jauh lebih cepat dari Brute Force.