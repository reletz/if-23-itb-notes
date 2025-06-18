---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2211 Strategi Algoritma]]
> [!cornell] Topic
> > ## Questions/Cues
> > -   Dari *Uninformed* ke *Informed*
> > -   Konsep Pencarian Heuristik `f(n)`
> > -   Greedy Best-First Search
> > -   Formula Greedy: `f(n) = h(n)`
> > -   Contoh Heuristik `h_SLD(n)`
> > -   Lacak Contoh Greedy Search
> > -   Hasil & Analisis Optimalitas
> > -   Kelemahan Greedy Search
>  
> > ### Transisi dari *Uninformed* ke *Informed Search*:
> > * Algoritma *Uninformed Search* (seperti UCS) memang optimal, namun bisa jadi tidak efisien karena ia menjelajahi semua arah yang "murah" tanpa mempertimbangkan arah tujuan.
> > * *Informed Search* (Pencarian Berinformasi) bertujuan untuk membuat pencarian lebih efisien dengan menggunakan "petunjuk" atau **heuristik** untuk mengestimasi seberapa menjanjikan sebuah simpul.
> > 
> > -   **Konsep Pencarian Heuristik:**
> >     * Ide utamanya adalah menggunakan sebuah **fungsi evaluasi `f(n)`** untuk setiap simpul `n`.
> >     * Fungsi ini memberikan estimasi "nilai" dari sebuah simpul, yang bisa berarti:
> >         * Seberapa menjanjikan simpul tersebut.
> >         * Tingkat kesulitan sub-masalah dari simpul tersebut.
> >         * Kualitas solusi yang direpresentasikan.
> > 
> > ### Greedy Best-First Search
> > - Ini adalah bentuk paling sederhana dari *Informed Search*.
> > - Ide Utama: Selalu mengekspansi simpul yang **tampaknya paling dekat dengan tujuan**.
> > - Keputusannya murni "rakus" (greedy) karena hanya melihat pada satu faktor: estimasi biaya ke tujuan, tanpa mempertimbangkan biaya yang sudah dikeluarkan untuk sampai ke simpul tersebut.
> > 
> > -   **Formula Evaluasi Greedy: `f(n) = h(n)`**
> >     * Fungsi evaluasi `f(n)` untuk Greedy Best-First Search hanya terdiri dari fungsi heuristik `h(n)`.
> >     * **`h(n)`:** Didefinisikan sebagai **estimasi biaya** dari simpul `n` ke simpul tujuan.
> > 
> > -   **Contoh Heuristik: `h_SLD(n)`**
> >     * Untuk masalah peta Romania, kita bisa menggunakan **Jarak Garis Lurus** (*Straight-Line Distance*) sebagai fungsi heuristik.
> >     * `h_SLD(n)` = Jarak garis lurus (seperti pandangan mata burung) dari kota `n` ke kota tujuan, Bucharest. Heuristik ini mudah dihitung dan intuitif.
> > 
> > -   **Lacak Contoh Greedy Search (Arad ke Bucharest)**
> >     1.  **Dari Arad (A):** Simpul anak yang tersedia adalah Sibiu (S), Timisoara (T), dan Zerind (Z).
> >         * `h_SLD(S) = 253`
> >         * `h_SLD(T) = 329`
> >         * `h_SLD(Z) = 374`
> >         * Algoritma memilih **Sibiu (S)** karena `h(n)`-nya paling kecil.
> >     2.  **Dari Sibiu (S):** Simpul anak yang tersedia adalah Arad, Fagaras, Oradea, Rimnicu Vilcea.
> >         * `h_SLD(Fagaras) = 176`
> >         * `h_SLD(Rimnicu Vilcea) = 193`
> >         * (Arad & Oradea memiliki `h(n)` lebih besar).
> >         * Algoritma memilih **Fagaras** karena `h(n)`-nya paling kecil.
> >     3.  **Dari Fagaras:** Simpul anak adalah Sibiu dan Bucharest.
> >         * `h_SLD(Bucharest) = 0`
> >         * Algoritma memilih **Bucharest**, yang merupakan tujuan. Pencarian berhenti.
> > 
> > -   **Hasil dan Analisis Optimalitas**
> >     * **Jalur Ditemukan:** `Arad → Sibiu → Fagaras → Bucharest`.
> >     * **Total Biaya (Jarak):** `140 + 99 + 211 = 450`.
> >     * **Analisis:** Jalur ini **TIDAK OPTIMAL**. Kita tahu dari UCS (di catatan sebelumnya) bahwa ada jalur yang lebih pendek, yaitu `A → S → R → P → B` dengan biaya 418. Greedy Search terjebak pada pilihan awal yang "terlihat bagus" (menuju Sibiu) dan tidak pernah mempertimbangkan jalur lain yang mungkin lebih panjang tapi total biayanya lebih murah.
> > 
> > -   **Kelemahan dan Masalah Greedy Best-First Search**
> >     1.  **Tidak Lengkap (Not Complete):** Bisa terjebak dalam *loop* tak berhingga. Contoh, jika `A → B` dan `B → A` adalah pilihan heuristik terbaik satu sama lain.
> >     2.  **Terjebak di Lokal Minima:** Sama seperti pendaki yang hanya melihat tanjakan terdekat, algoritma ini bisa terjebak pada solusi yang kelihatannya bagus secara lokal, namun bukan solusi terbaik secara global.
> >     3.  **Tidak dapat diubah (Irrevocable):** Sekali ia memilih sebuah jalur (misal, ke Sibiu), ia tidak akan pernah kembali untuk mencoba jalur lain yang pada awalnya terlihat kurang menarik (seperti ke Zerind atau Timisoara), meskipun jalur tersebut mungkin mengarah ke solusi yang lebih optimal.
> > 

> [!cornell] #### Summary
> Pencarian Berinformasi menggunakan fungsi heuristik `h(n)` untuk memperkirakan jarak ke tujuan dan memandu pencarian. *Greedy Best-First Search* adalah implementasi paling dasar, yang secara "rakus" hanya mengikuti nilai `h(n)` terendah. Meskipun strategi ini seringkali lebih cepat, ia memiliki kelemahan fundamental: ia tidak menjamin solusi optimal dan bisa terjebak, seperti yang ditunjukkan pada contoh peta Romania di mana ia menemukan jalur dengan biaya 450, bukan jalur optimal berbiaya 418.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
>  
>  -   **Analogi Pendaki Gunung:** Bayangkan seorang pendaki gunung yang buta arah dan hanya memiliki altimeter. Untuk mencapai puncak tertinggi (tujuan), ia memutuskan untuk selalu melangkah ke arah yang paling curam menanjak (heuristik terbaik). Sangat mungkin ia akan mencapai puncak sebuah bukit kecil (*local maximum*) dan terjebak di sana, tidak menyadari ada gunung yang jauh lebih tinggi di sebelahnya (*global maximum*). Inilah masalah "lokal minima" (atau maksima) pada Greedy Search.
>  -   **Kapan Greedy Berguna?:** Meskipun memiliki banyak kekurangan, algoritma ini sangat berguna dalam skenario di mana "kecepatan" lebih penting daripada "optimalitas". Jika Anda membutuhkan solusi yang "cukup baik" dengan sangat cepat, Greedy Search bisa menjadi pilihan yang tepat, terutama jika heuristik yang digunakan sangat akurat. Contohnya adalah dalam *pathfinding* di video game untuk karakter non-utama.
>  -   **Kualitas Heuristik:** Efektivitas semua algoritma *Informed Search* sangat bergantung pada kualitas fungsi heuristiknya. Heuristik yang ideal harus:
>      1.  **Mudah & Cepat Dihitung:** Jika menghitung heuristik lebih lama daripada menjelajahi beberapa simpul, maka manfaatnya hilang.
>      2.  **Cukup Akurat:** Semakin dekat estimasi `h(n)` dengan biaya sebenarnya, semakin efisien pencariannya.
>  
>  #### Eksplorasi Mandiri
>  
>  -   **Studi Kasus Kegagalan:** Ciptakan sebuah graf sederhana di atas kertas di mana Greedy Best-First Search gagal total. Contoh: buat sebuah jalur pendek yang heuristiknya terlihat buruk di awal, dan sebuah jalur panjang yang heuristiknya terlihat sangat bagus di awal. Tunjukkan bagaimana Greedy akan memilih jalur yang salah.
>  -   **Heuristik Berbeda:** Untuk masalah 8-puzzle (yang akan dibahas di catatan berikutnya), ada dua heuristik umum: (1) Jumlah ubin yang salah posisi, dan (2) Total jarak Manhattan. Pikirkan, manakah dari kedua heuristik tersebut yang akan memberikan panduan lebih baik untuk Greedy Search? Mengapa? (Petunjuk: Jarak Manhattan memberikan lebih banyak informasi).