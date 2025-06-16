_Back to_ [[01. Matkul/Stima]]

> [!cornell] Algoritma Knuth-Morris-Pratt (KMP)
> 
> > ## Questions/Cues
> > 
> > - Definisi KMP
> > - Tokoh Pengembang KMP
> > - Ide Cerdas KMP (Pergeseran)
> > - Fungsi Pinggiran KMP / Failure Function
> > - Definisi Fungsi Pinggiran b(k)
> > - Contoh Perhitungan Fungsi Pinggiran
> > - Cara Menggunakan Fungsi Pinggiran
> > - Implementasi KMP (Java)
> > - `kmpMatch` (Logika Cocok)
> > - `kmpMatch` (Logika Mismatch)
> > - `computeBorder` (Logika)
> > - Kompleksitas Waktu KMP
> > - Keunggulan KMP
> > - Kelemahan KMP
> > - Ekstensi KMP
> 
> > ### Algoritma Knuth-Morris-Pratt (KMP)
> > Algoritma KMP adalah salah satu algoritma pencocokan string yang lebih efisien dibandingkan Brute Force.
> > 
> > - **Definisi:** Algoritma KMP mencari _pattern_ di dalam teks secara kiri-ke-kanan (mirip dengan Brute Force dalam arah perbandingan), tetapi ia **menggeser _pattern_ dengan lebih cerdas** daripada Brute Force. KMP menghindari perbandingan yang tidak perlu dengan memanfaatkan informasi tentang _pattern_ itu sendiri.
> > - **Tokoh:** Algoritma ini dikembangkan oleh tiga ilmuwan komputer terkemuka: **Donald E. Knuth, James H. Morris, dan Vaughan R. Pratt**. Donald E. Knuth dikenal luas sebagai "bapak" analisis algoritma modern.
> > 
> > ### Ide Cerdas Pergeseran KMP
> > 
> > Kunci efisiensi KMP terletak pada bagaimana ia menangani ketidakcocokan (mismatch).
> > 
> > - **Pertanyaan Kunci:** Jika terjadi ketidakcocokan antara teks T dan _pattern_ P pada posisi P[j] (yaitu, T[i]=P[j]), seberapa jauh _pattern_ dapat digeser ke kanan untuk menghindari perbandingan yang tidak perlu?
> > - **Jawabannya:** Geser _pattern_ sejauh mungkin sehingga **bagian _pattern_ yang sudah cocok sebelumnya (yaitu, _prefix_ dari _pattern_ hingga sebelum _mismatch_) masih bisa selaras dengan teks yang sudah cocok**, tanpa harus "mundur" di teks T. Ini dilakukan dengan mencari _prefix_ **terbesar** dari _pattern_ P[0…j−1] yang juga merupakan _suffix_ dari _pattern_ P[1…j−1]. Posisi _pattern_ yang baru untuk memulai perbandingan setelah pergeseran adalah panjang dari _prefix_/_suffix_ terbesar ini.
> > 
> > ### Fungsi Pinggiran KMP (KMP Border Function) / Fungsi Kegagalan (Failure Function)
> > 
> > Untuk mengimplementasikan ide pergeseran cerdas ini, KMP melakukan _preprocessing_ pada _pattern_ itu sendiri.
> > 
> > - **Proses Preprocessing:** KMP melakukan _preprocessing_ pada _pattern_ untuk mencari kecocokan _prefix_ dari _pattern_ dengan _pattern_ itu sendiri. Hasil _preprocessing_ ini disimpan dalam sebuah tabel atau array yang disebut **fungsi pinggiran** atau **fungsi kegagalan**.
> >     
> > - **Definisi b(k):** Misalkan j adalah posisi _mismatch_ di _pattern_ P[], dan k adalah posisi sebelum _mismatch_ (jadi k=j–1). Fungsi pinggiran b(k) (atau sering disebut `fail[k]`) didefinisikan sebagai **ukuran (size) _prefix_ terbesar dari P[0…k] yang juga merupakan _suffix_ dari P[1…k]**. b(k) ini adalah ukuran dari _border_ terbesar.
> >     
> > - Dalam kode, b() direpresentasikan oleh sebuah _array_, di mana b[k] menyimpan panjang _border_ untuk _prefix_ _pattern_ hingga indeks k.
> >     
> > - **Contoh Fungsi Pinggiran (Border Function)**
> >     Mari kita ambil _pattern_ `P="abaaba"`. 
> >     
> >|j (Indeks Pola)|P[j]|k (Indeks Akhir Sufiks)|Prefiks P[0..k]|Sufiks P[1..k]|Prefiks Terpanjang dari P[0..k] yang Juga Sufiks dari P[1..k]|b[k] (Panjang)|
> >|---|---|---|---|---|---|---|
> >|0|a|0|"a"|""|""|0|
> >|1|b|1|"ab"|"b"|""|0|
> >|2|a|2|"aba"|"ba"|"a"|1|
> >|3|a|3|"abaa"|"baa"|"a"|1|
> >|4|b|4|"abaab"|"baab"|"ab"|2|
> >|5|a|5|"abaaba"|"baaba"|"aba"|3|
> >
> > Sehingga tabel `b` (atau `fail`) untuk "abaaba" adalah:
> > > - **j (Indeks Pola):** `0 1 2 3 4 5`
> > > 
> > > - **P[j]:** `a b a a b a`
> > > 
> > > - **b[k]:** `0 0 1 1 2 1`
> > > 
> > > - _(Catatan: `b[k]` adalah nilai fungsi prefiks untuk `P[0..k]`. Dalam implementasi algoritma KMP, seringkali nilai `b[j-1]` yang digunakan untuk menentukan pergeseran saat terjadi ketidakcocatan pada `P[j]`.)_
> >     
> > - **Menggunakan Fungsi Pinggiran:** Jika terjadi _mismatch_ pada P[j] (yaitu P[j]=T[i]), maka:
> >     
> >     - Kita memiliki informasi tentang seberapa banyak karakter dari _pattern_ yang sudah cocok sebelum _mismatch_ tersebut.
> >     - Jika j>0 (artinya _mismatch_ bukan pada karakter pertama _pattern_), _pattern_ digeser berdasarkan nilai dari fungsi pinggiran: `j = b[j-1]`. Ini berarti kita melanjutkan perbandingan dari posisi b[j−1] di _pattern_, tanpa harus memundurkan indeks teks i.
> >     - Jika j == 0 (artinya karakter pertama _pattern_ tidak cocok), maka kita harus menggeser teks satu posisi ke kanan (`i++`), dan indeks _pattern_ j tetap 0.
> > 
> > ### Implementasi Algoritma KMP (dalam Java)
> > 
> > Algoritma KMP biasanya melibatkan dua bagian utama: membangun fungsi pinggiran dan melakukan pencocokan.
> > 
> > ```java
> > public class KMP {
> >     // Metode utama untuk pencocokan KMP
> >     public int kmpMatch(String text, String pattern) {
> >         int n = text.length();
> >         int m = pattern.length();
> >         int[] b = computeBorder(pattern); // Membangun fungsi pinggiran
> > 
> >         int i = 0; // Indeks untuk teks (T)
> >         int j = 0; // Indeks untuk pattern (P)
> > 
> >         while (i < n) { // Loop berlanjut hingga teks habis
> >             if (pattern.charAt(j) == text.charAt(i)) { // Karakter cocok
> >                 if (j == m - 1) { // Seluruh pattern cocok
> >                     return i - m + 1; // Kembalikan posisi awal pattern di teks
> >                 }
> >                 i++; // Maju di teks
> >                 j++; // Maju di pattern
> >             } else { // Karakter tidak cocok (mismatch)
> >                 if (j > 0) { // Jika mismatch bukan pada karakter pertama pattern
> >                     j = b[j - 1]; // Geser pattern berdasarkan fungsi pinggiran
> >                                 // (tidak memajukan indeks teks i)
> >                 } else { // Mismatch pada karakter pertama pattern
> >                     i++; // Maju di teks
> >                          // j tetap 0
> >                 }
> >             }
> >         }
> >         return -1; // Pattern tidak ditemukan
> >     }
> > 
> >     // Metode untuk menghitung array fungsi pinggiran b[]
> >     private int[] computeBorder(String pattern) {
> >         int m = pattern.length();
> >         int[] b = new int[m];
> >         b[0] = 0; // Fungsi pinggiran untuk karakter pertama selalu 0
> > 
> >         int j = 0; // Panjang border sebelumnya
> >         for (int i = 1; i < m; i++) { // Iterasi melalui pattern untuk mengisi b[]
> >             while (j > 0 && pattern.charAt(j) != pattern.charAt(i)) {
> >                 j = b[j - 1]; // Mundur ke border yang lebih kecil
> >             }
> >             if (pattern.charAt(j) == pattern.charAt(i)) {
> >                 j++; // Perpanjang border
> >             }
> >             b[i] = j; // Simpan panjang border untuk prefix P[0..i]
> >         }
> >         return b;
> >     }
> > }
> > ```
> > 
> > - **Penggunaan:** Mirip dengan Brute Force, Anda akan memanggil `kmpMatch` dan mencetak hasilnya.
> > 
> > ### Analisis Kompleksitas KMP
> > 
> > - **Menghitung fungsi pinggiran (`computeBorder`):** Kompleksitas waktu O(m). Ini karena setiap karakter _pattern_ diiterasi paling banyak dua kali (sekali dengan `i++` dan mungkin beberapa kali dengan `j = b[j-1]`).
> > - **Pencarian string (`kmpMatch`):** Kompleksitas waktu O(n). Mirip dengan `computeBorder`, setiap karakter teks T diiterasi paling banyak dua kali.
> > - **Kompleksitas waktu total algoritma KMP adalah O(m+n)**. Ini jauh lebih cepat dan efisien dibandingkan Brute Force, terutama untuk teks yang sangat panjang.
> > 
> > ### Keunggulan dan Kelemahan KMP
> > 
> > - **Keunggulan KMP (KMP Advantages):**
> >     
> >     - Algoritma **tidak pernah perlu bergerak mundur** di dalam teks input T. Ini sangat penting untuk efisiensi.
> >     - Fitur ini membuat algoritma ini **sangat baik** untuk memproses berkas yang sangat besar yang dibaca dari perangkat eksternal (misalnya, hard drive) atau melalui _network stream_, karena kita tidak perlu menyimpan seluruh teks di memori atau membaca ulang bagian yang sudah diproses.
> > - **Kelemahan KMP (KMP Disadvantages):**
> >     
> >     - KMP **tidak bekerja sebaik ketika ukuran alfabet meningkat**. Ketika alfabet sangat besar (misalnya, Unicode yang luas), peluang terjadinya _mismatch_ meningkat, dan fungsi pinggiran mungkin tidak memberikan pergeseran yang optimal.
> >     - Lebih banyak peluang terjadinya _mismatch_ di awal _pattern_.
> >     - KMP lebih cepat ketika _mismatch_ terjadi belakangan dalam _pattern_, karena itu berarti ada _prefix_ yang lebih panjang untuk dimanfaatkan oleh fungsi pinggiran.
> > - **Ekstensi KMP:** Algoritma dasar KMP tidak mempertimbangkan karakter dalam teks yang menyebabkan _mismatch_ (ia hanya melihat _pattern_). Beberapa varian KMP mungkin mempertimbangkan informasi ini untuk potensi optimasi lebih lanjut.
> >     

> [!cornell] ### Summary
> **KMP** adalah algoritma pencocokan string efisien yang **menggeser _pattern_ secara cerdas** tanpa memundurkan teks. Ini dicapai melalui **fungsi pinggiran (b(k))** yang dihitung saat _preprocessing pattern_ (O(m)), mengidentifikasi _prefix_ terpanjang yang juga _suffix_. Saat _mismatch_, _pattern_ digeser berdasarkan b[j−1] (jika j>0) atau teks dimajukan (jika j=0), menghasilkan kompleksitas total **O(m+n)**. KMP unggul untuk _stream_ data besar karena tidak memundurkan teks, tetapi kurang optimal dengan alfabet besar.