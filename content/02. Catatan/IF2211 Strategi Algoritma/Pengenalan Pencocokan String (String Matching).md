_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Pengenalan Pencocokan String (String/Pattern Matching)
> 
> > ## Questions/Cues
> > 
> > - Definisi Pencocokan String
> > - Komponen Teks & Pattern
> > - Tugas Utama String Matching
> > - Contoh Aplikasi String Matching
> > - Konsep String: Prefix
> > - Konsep String: Suffix
> 
> > 
> > ### Gambaran Umum (Overview)
> >  Bab ini akan membahas secara mendalam tentang pencocokan string, termasuk definisi, algoritma-algoritma kunci seperti Brute Force, Knuth-Morris-Pratt (KMP), dan Boyer-Moore, serta konsep pencocokan string menggunakan Regular Expression (Regex).
> > 
> > **1. Apa itu Pencocokan String? (What is Pattern Matching?)**
> > 
> > - **Definisi:** Pencocokan string adalah masalah komputasi di mana kita diberikan dua buah string:
> >     1. **T: teks (text)**, yaitu string yang sangat panjang (_long string_) dengan panjang n karakter. Ini adalah "data" tempat kita akan mencari.
> >     2. **P: pattern**, yaitu string yang lebih pendek dengan panjang m karakter yang akan dicari di dalam teks T. Asumsi penting di sini adalah m≪n (panjang _pattern_ jauh lebih kecil dari panjang teks), yang berarti _pattern_ relatif singkat dibandingkan dengan teks yang besar.
> > - **Tugasnya:** Tujuan utama pencocokan string adalah **mencari (find atau locate)** lokasi pertama di dalam teks T yang bersesuaian atau cocok dengan _pattern_ P. Terkadang, tujuannya bisa juga mencari semua lokasi di mana _pattern_ P muncul dalam teks T.
> > - **Contoh:** Bayangkan Anda memiliki Teks (T): "the rain in spain stays mainly on the plain". Dan Anda mencari Pattern (P): "main". Tugas Anda adalah menemukan di mana "main" pertama kali muncul dalam teks tersebut. Dalam kasus ini, akan ditemukan pada indeks tertentu di bagian "mainly".
> > - **Aplikasi:** Pencocokan String memiliki berbagai aplikasi praktis yang sering kita temui dalam kehidupan sehari-hari maupun bidang teknis:
> >     1. **Pencarian di dalam Editor Teks:** Ketika Anda menggunakan fungsi "Find" (Ctrl+F) di editor teks atau pengolah kata, itu adalah aplikasi pencocokan string.
> >     2. **Web Search Engine:** Mesin pencari seperti Google menggunakan teknik pencocokan string yang canggih untuk menemukan halaman web yang relevan dengan kata kunci yang Anda masukkan.
> >     3. **Analisis Citra:** Dalam beberapa konteks, pencocokan string dapat digunakan untuk mengidentifikasi pola atau fitur tertentu dalam data citra yang telah diubah menjadi representasi string.
> >     4. **Bioinformatika:** Ini adalah bidang yang sangat bergantung pada pencocokan string, misalnya dalam **pencocokan rantai asam amino pada rantai DNA** atau protein, untuk mengidentifikasi gen atau sekuens fungsional.
> > 
> > ### Konsep String (String Concepts)
> > 
> > Sebelum masuk ke algoritma, ada beberapa konsep dasar tentang string yang perlu dipahami:
> > 
> > - Diasumsikan S adalah sebuah string dengan ukuran m. String S dapat direpresentasikan sebagai urutan karakter: S=x0​x1​…xm−1​.
> > - **Prefix:** Sebuah _prefix_ dari string S adalah _substring_ yang dimulai dari awal string S hingga karakter ke-k. Ini ditulis sebagai S[0…k].
> > - **Suffix:** Sebuah _suffix_ dari string S adalah _substring_ yang dimulai dari karakter ke-k hingga akhir string S. Ini ditulis sebagai S[k…m−1].
> > - Nilai k bisa menjadi indeks apa pun antara 0 dan m−1.
> > - **Contoh:** Untuk string S="andrew", dengan panjang m=6:
> >     - Semua _prefix_ yang mungkin dari S: "a", "an", "and", "andr", "andre", "andrew". Perhatikan bahwa "andrew" itu sendiri juga merupakan _prefix_ (ketika k=m−1).
> >     - Semua _suffix_ yang mungkin dari S: "w", "ew", "rew", "drew", "ndrew", "andrew". Perhatikan bahwa "andrew" itu sendiri juga merupakan _suffix_ (ketika k=0).

> [!cornell] ### Summary
> **Pencocokan String** adalah proses menemukan _pattern_ P (panjang m) dalam teks T (panjang n, dengan m≪n), seringkali untuk menemukan kemunculan pertama. Aplikasi luasnya mencakup pencarian teks, _web search engine_, analisis citra, dan bioinformatika. Konsep dasar string meliputi **prefix** (substring dari awal) dan **suffix** (substring dari akhir) dari sebuah string.