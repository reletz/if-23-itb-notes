_Back to_ [[01. Matkul/Stima]]

> [!cornell] Algoritma Brute Force (The Brute Force Algorithm)
> 
> > ## Questions/Cues
> > 
> > - Definisi Algoritma Brute Force
> > - Proses Pencocokan Brute Force
> > - Contoh Brute Force
> > - Implementasi Brute Force (Java)
> > - Loop Utama Brute Force
> > - Loop Dalam Brute Force
> > - Kondisi Kecocokan Brute Force
> > - Analisis Kasus Terburuk Brute Force
> > - Analisis Kasus Terbaik Brute Force
> > - Analisis Kasus Rata-rata Brute Force
> > - Pengaruh Ukuran Alfabet pada Brute Force
> 
> > ### Algoritma Brute Force
> > Algoritma Brute Force adalah pendekatan paling sederhana dan langsung untuk masalah pencocokan string.
> > 
> > - **Definisi:** Algoritma ini bekerja dengan **memeriksa setiap posisi** yang memungkinkan di dalam teks T untuk melihat apakah _pattern_ P dimulai di posisi tersebut. Ini seperti mencoba-coba di setiap titik hingga menemukan kecocokan.
> > - **Proses:**
> >     - _Pattern_ P bergerak satu karakter per satu waktu melalui teks T.
> >     - Algoritma secara berurutan mencoba mencocokkan _pattern_ P di setiap posisi yang mungkin dalam teks T.
> >     - Jika terjadi **ketidakcocokan (mismatch)** pada posisi karakter tertentu, _pattern_ P **digeser satu posisi ke kanan** dalam teks T.
> >     - Setelah pergeseran, proses pencocokan dimulai kembali **dari awal _pattern_** (karakter pertama _pattern_ P dibandingkan dengan karakter teks di posisi yang baru).
> > - **Contoh:** Mari kita gunakan contoh Teks: "NOBODY NOTICED HIM" dan Pattern: "NOT".
> >     1. Pencocokan dimulai dari indeks 0 teks. Bandingkan "NOT" (Pattern) dengan "NOB" (bagian teks). Karakter 'B' di teks dan 'T' di _pattern_ tidak cocok. Ini adalah _mismatch_.
> >     2. Geser P satu posisi ke kanan. Sekarang "NOT" dibandingkan dengan "OBO". 'O' di teks dan 'N' di _pattern_ tidak cocok. _Mismatch_.
> >     3. Geser P satu posisi lagi. Bandingkan "NOT" dengan "BOD". _Mismatch_.
> >     4. Proses ini berlanjut. Hingga _pattern_ "NOT" berada tepat di bawah kata "NOTICED". Saat itu, bandingkan "NOT" dengan "NOT". Cocok! Lokasi ditemukan.
> > 
> > ### Implementasi Algoritma Brute Force (dalam Java)
> > 
> > Mari kita lihat bagaimana algoritma Brute Force ini bisa diimplementasikan dalam kode (menggunakan pseudocode mirip Java):
> > 
> > ```java
> > public int brute(String text, String pattern) {
> >     int n = text.length();    // Panjang teks
> >     int m = pattern.length(); // Panjang pattern
> > 
> >     // Loop utama: Mengiterasi melalui setiap posisi awal yang mungkin di teks T
> >     // di mana pattern P dapat dimulai.
> >     // (n - m) adalah posisi terakhir di teks di mana pattern masih bisa muat.
> >     for (int i = 0; i <= (n - m); i++) {
> >         int j = 0; // Indeks untuk pattern, selalu dimulai dari 0
> > 
> >         // Loop dalam: Membandingkan karakter pattern dengan karakter teks
> >         // dimulai dari posisi i di teks dan posisi 0 di pattern.
> >         while ((j < m) && (text.charAt(i + j) == pattern.charAt(j))) {
> >             j++; // Jika cocok, maju ke karakter berikutnya di pattern
> >         }
> > 
> >         // Jika loop dalam selesai dan j == m, berarti seluruh pattern cocok
> >         if (j == m) {
> >             return i; // Mengembalikan indeks awal pattern di teks
> >         }
> >     }
> >     return -1; // Jika loop utama selesai tanpa menemukan kecocokan
> > }
> > ```
> > 
> > - **Penggunaan:** Dalam sebuah metode `main` (atau fungsi utama), Anda akan mengambil teks dan _pattern_ (misalnya dari argumen _command line_), memanggil metode `brute` untuk mencari posisi, dan mencetak hasilnya.
> > 
> > ### Analisis Kompleksitas Algoritma Brute Force
> > 
> > Memahami kinerja algoritma adalah kunci. Kita menganalisis berdasarkan jumlah perbandingan karakter.
> > 
> > - **Kasus Terburuk (Worst Case):**
> >     
> >     - Kompleksitas waktu: O(mn). Ini berarti jumlah perbandingan karakter adalah sekitar m×(n–m+1).
> >     - Terjadi ketika ada **banyak kecocokan parsial** yang membutuhkan perbandingan hampir seluruh panjang _pattern_ di banyak posisi teks.
> >     - **Contoh:** Teks: "aaaaaaaaaaaaaaaaaaaaaaaaah", Pattern: "aaah". Algoritma akan terus-menerus menemukan kecocokan 'aaa' dan baru _mismatch_ di karakter terakhir, sehingga melakukan banyak perbandingan.
> > - **Kasus Terbaik (Best Case):**
> >     
> >     - Kompleksitas waktu: O(n).
> >     - Terjadi bila **karakter pertama _pattern_ P tidak pernah sama** dengan karakter di dalam teks T yang dicocokkan.
> >     - Algoritma hanya perlu memeriksa karakter pertama _pattern_ terhadap n karakter teks. Jumlah perbandingan maksimal n kali.
> >     - **Contoh:** Teks: "String ini berakhir dengan zzz", Pattern: "xyz". Karakter 'x' tidak akan cocok dengan 'S', 't', 'r', dst., sehingga hanya perlu satu perbandingan per posisi di teks.
> > - **Kasus Rata-rata (Average Case):**
> >     
> >     - Sebagian besar pencarian pada teks biasa (misalnya, teks dalam bahasa manusia) membutuhkan kompleksitas O(m+n), yang biasanya sangat cepat. Ini karena _mismatch_ cenderung terjadi di awal perbandingan, memungkinkan pergeseran cepat.
> >     - **Contoh:** Teks: "a string searching example is standard", Pattern: "store".
> > - **Catatan tentang Ukuran Alfabet:**
> >     
> >     - Algoritma Brute Force **cepat** ketika **alfabet teks besar** (misal: A-Z, a-z, 0-9, dll.). Ini karena probabilitas terjadinya _mismatch_ di awal perbandingan lebih tinggi.
> >     - Algoritma ini **lebih lambat** ketika **alfabet kecil** (misal: 0, 1, seperti pada berkas biner atau citra). Dalam kasus ini, ada lebih banyak peluang untuk kecocokan parsial, sehingga _mismatch_ cenderung terjadi lebih lambat.

> [!cornell] ### Summary
> **Algoritma Brute Force** adalah metode pencocokan string yang paling sederhana, memeriksa setiap posisi dalam teks dengan menggeser _pattern_ satu karakter setelah setiap _mismatch_ dan memulai perbandingan dari awal _pattern_. Implementasinya melibatkan dua loop bersarang, dengan kompleksitas **O(mn) pada kasus terburuk** (banyak kecocokan parsial) dan **O(n) pada kasus terbaik** (mismatch awal). Efisiensinya menurun dengan alfabet kecil.