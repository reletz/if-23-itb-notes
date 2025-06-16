_Back to_ [[01. Matkul/Stima]]

> [!cornell] Algoritma Non-deterministik dan Kelas P & NP
> 
> > ## Questions/Cues
> > 
> > - Algoritma Non-deterministik untuk Keputusan
> > - Tahap Menerka (Keputusan)
> > - Tahap Verifikasi (Keputusan)
> > - Kriteria "Menyelesaikan" Persoalan Keputusan
> > - Contoh TSDP dengan Non-deterministik
> > - Kompleksitas Verifikasi TSDP
> > - Contoh Terkaan TSDP
> > - Contoh Sirkuit Hamilton dengan Non-deterministik
> > - Definisi P Problems
> > - Contoh P Problems
> > - Status TSDP di P Problems
> > - Definisi NP Problems
> > - Non-deterministic Polynomial-time Algorithm
> > - Verifikasi dalam Waktu Polinom
> > - Contoh Verifikasi NP (Graph Coloring, SAT)
> > - Contoh Persoalan NP
> 
> > ### Algoritma Non-deterministik dan Kelas P & NP
> > 
> > **8. Algoritma Non-deterministik untuk Persoalan Keputusan** Untuk persoalan keputusan, dua tahap algoritma non-deterministik dijelaskan sebagai berikut:
> > 
> > 1. **Tahap menerka (non-deterministik):** Menghasilkan sebuah string S yang dapat dianggap sebagai terkaan solusi. String ini bisa saja tidak bermakna (acak) pada awalnya.
> > 2. **Tahap verifikasi (deterministik):** Memeriksa apakah S menyatakan solusi persoalan. Luarannya adalah "true" jika S solusi, dan "false" jika bukan. Tahap ini harus deterministik dan efisien.
> > 
> > - Algoritma non-deterministik dikatakan "**menyelesaikan**" (_completion_) persoalan keputusan apabila:
> >     
> >     1. Untuk suatu _instance_ persoalan yang jawabannya "yes", **terdapat beberapa string S** yang pada tahap verifikasi menghasilkan "true". Ini berarti jika ada solusi, algoritma non-deterministik akan "menebak"nya dan memverifikasinya.
> >     2. Untuk suatu _instance_ persoalan yang jawabannya "no", **tidak terdapat string S** yang pada tahap verifikasi menghasilkan "true". Ini berarti jika tidak ada solusi, tidak ada tebakan yang akan berhasil.
> > - **Contoh untuk TSDP (Travelling Salesperson Decision Problem):** Apakah terdapat tur dengan total bobot ≤d?
> >     
> >     - **Tahap menerka:** S←Terka(string) (menebak sebuah urutan simpul sebagai calon tur).
> >     - **Tahap verifikasi:** String S diverifikasi apakah merupakan tur lengkap (mengunjungi semua simpul dan kembali ke asal), lalu periksa total bobotnya ≤d. Jika ya, `return true`, jika tidak, `return false`.
> >     - Kompleksitas waktu untuk verifikasi ini adalah O(n) (misal untuk graf dengan n simpul), karena kita hanya perlu menjumlahkan bobot sisi dan memverifikasi keunikan simpul.
> >     - **Contoh terkaan dan hasil verifikasinya untuk TSDP dengan d=15 pada graf tertentu:**
> >         - S=[v1​,v2​,v3​,v4​,v1​]: False (Total bobot > 15)
> >         - S=[v1​,v4​,v2​,v3​,v1​]: False (S bukan sebuah tur yang valid)
> >         - S=%@12*&a%: False (S bukan sebuah tur yang valid)
> >         - S=[v1​,v3​,v2​,v4​,v1​]: True (S sebuah tur, total bobot ≤15)
> >     - Dengan algoritma non-deterministik, TSDP dapat "diselesaikan" dalam dua tahap tersebut.
> > - **Contoh untuk Sirkuit Hamilton Problem:** Diberikan graf G, apakah G mengandung sirkuit Hamilton? (Sirkuit yang melalui setiap simpul tepat satu kali dan kembali ke simpul asal).
> >     
> >     - **Algoritma non-deterministik:**
> >         1. **Terkalah permutasi semua simpul** (misalnya, urutan v1​,vk​,…,vj​).
> >         2. **Verifikasi:** Periksa apakah permutasi tersebut membentuk sirkuit Hamilton (apakah setiap simpul terhubung ke simpul berikutnya dalam permutasi, dan simpul terakhir terhubung kembali ke simpul awal). Jika benar, jawabannya "true", jika tidak, "false".
> > 
> > **9. Kelas Persoalan P Problems**
> > 
> > - **P Problems** adalah **himpunan semua persoalan keputusan yang dapat dipecahkan oleh algoritma dengan kebutuhan waktu polinomial**. Ini berarti ada algoritma deterministik efisien yang selalu menemukan solusi untuk masalah ini.
> > - Semua persoalan keputusan yang dapat diselesaikan dalam waktu polinomial adalah anggota himpunan P.
> > - **Contoh:** Persoalan _searching_ (pencarian), persoalan tes bilangan prima (menentukan apakah bilangan adalah prima), persoalan uji kesamaan dua buah matriks.
> > - **Apakah Travelling Salesperson Decision Problem (TSDP) termasuk P Problems?** Meskipun belum ada yang menemukan algoritma TSDP dalam waktu polinomial, tidak ada pula yang membuktikan bahwa TSDP tidak dapat dipecahkan dalam waktu polinomial. Ini menyiratkan TSDP **mungkin** dapat dimasukkan ke dalam P Problems, tetapi status pastinya masih terbuka.
> > 
> > **10. Kelas Persoalan NP Problems**
> > 
> > - **NP** adalah singkatan dari **non-deterministic polynomial**.
> > - **Non-deterministic polynomial-time algorithm** adalah **algoritma non-deterministik yang tahap verifikasinya dapat dilakukan dalam waktu polinomial**.
> > - **Verifikasi dalam waktu polinomial** artinya: Jika diberikan sebuah **kandidat jawaban**, kita dapat memeriksa apakah jawaban itu benar atau salah **dalam waktu polinomial**. **Ini berbeda dengan menemukan solusi persoalan dalam waktu polinomial.** Persoalan NP tidak mengharuskan solusi dapat _ditemukan_ dengan cepat, hanya _diverifikasi_ dengan cepat.
> > - **NP Problems** adalah **himpunan persoalan keputusan yang dapat diselesaikan oleh non-deterministic polynomial-time algorithm**. Dengan kata lain, persoalan NP adalah persoalan keputusan yang solusinya (jika ada) dapat **diverifikasi dengan cepat (dalam waktu polinomial)**.
> > - **Contoh verifikasi dalam waktu polinomial:**
> >     - **Pewarnaan graf:** Memeriksa apakah sebuah graf dapat diwarnai dengan k warna. Jika diberikan _assignment_ warna untuk setiap simpul, memverifikasi apakah tidak ada dua simpul bertetangga berwarna sama memiliki kompleksitas O(∣E∣) (jumlah sisi), yang bersifat polinomial.
> >     - **Satisfiable Problem (SAT):** Memverifikasi _assignment_ nilai kebenaran untuk peubah Boolean dalam klausa C. Memeriksa apakah C bernilai _true_ dengan _assignment_ tersebut memiliki kompleksitas O(1) (setelah klausa dihitung, per klausa), yang bersifat polinomial terhadap ukuran _instance_.
> > - **Contoh-contoh persoalan NP:** TSDP (memverifikasi tur membutuhkan O(n)), Integer Knapsack Decision Problem.
 
> [!cornell] Summary
> **Algoritma non-deterministik** untuk persoalan keputusan terdiri dari tahap 'menerka' calon solusi dan 'verifikasi' deterministik yang efisien. Sebuah persoalan diselesaikan jika tebakan dapat mengarah ke solusi jika ada, dan tidak pernah berhasil jika tidak ada. **P Problems** adalah set persoalan keputusan yang dapat diselesaikan secara deterministik dalam waktu polinomial. **NP Problems** (Non-deterministic Polynomial) adalah set persoalan keputusan yang solusinya (jika ada) dapat **diverifikasi** secara deterministik dalam waktu polinomial, yang tidak sama dengan menemukan solusinya. Contoh NP meliputi TSDP dan SAT.