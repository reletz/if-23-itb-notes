---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> 
> > ## Questions/Cues
> >
> > - Apa tujuan pembuktian?
> > - Apa strategi pembuktian dua bagian?
> > - Bagaimana cara membuktikan L(A)subseteqT?
> > - Apa itu Hipotesis Induktif?
> > - Mengapa hipotesis harus diperkuat?
> > - Bagaimana cara membuktikan TsubseteqL(A)?
> > - Apa itu bukti Kontrapositif?
> >
> > ## Reference Points
> >
> > - 2021_Bab-2-FSA.pdf: 42-51
> 
> > ### Tujuan Pembuktian Kesetaraan
> >
> > Setelah mendesain sebuah DFA, kita perlu **membuktikan secara formal** bahwa mesin tersebut benar-benar bekerja sesuai keinginan. Tujuannya adalah untuk membuktikan bahwa dua himpunan string ini adalah sama:
> >
> > 1. $L(A)$: Bahasa yang diterima oleh DFA kita (semua string yang berakhir di final state).
> > 2. $T$: Bahasa yang kita inginkan sesuai deskripsi (misalnya, "himpunan semua string tanpa '11' berurutan").
> >
> > Kita harus **membuktikan bahwa $L(A)=T$**.
> >
> > ### Strategi Pembuktian Dua Bagian
> >
> > Untuk membuktikan bahwa dua himpunan (S dan T) adalah sama, kita harus membuktikan dua hal secara terpisah:
> >
> > - $S\subseteq T$: Jika sebuah string w ada di himpunan S, maka w juga pasti ada di himpunan T.
> > - $T\subseteq S$: Jika sebuah string w ada di himpunan T, maka w juga pasti ada di himpunan S.
> >
> > Dalam konteks kita:
> >
> > 1. Jika sebuah string **diterima oleh DFA**, maka string tersebut **memenuhi deskripsi bahasa**.
> > 2. Jika sebuah string **memenuhi deskripsi bahasa**, maka string tersebut **diterima oleh DFA**.
> > 
> >  **Ambil contoh: ** 
> >  - S = the language of our running DFA, and 
> >  - T = “no consecutive 1’s.”
> >
> > ### Bagian 1: Membuktikan $L(A)\subseteq T$ (Metode Induksi)
> >
> > **Pernyataan:** Jika string w diterima oleh DFA, maka w tidak memiliki "11" berurutan.
> >
> > Metode yang paling umum digunakan adalah **induksi matematika berdasarkan panjang string ∣w∣**. Namun, ada sebuah trik penting: kita perlu memperkuat hipotesis kita. Daripada hanya membuat pernyataan tentang state akhir, kita membuat pernyataan tentang arti dari setiap state.
> >
> > **Hipotesis Induktif yang Diperkuat (untuk contoh DFA 'no 11'):**
> >
> > - Jika $\hat\delta(A,w)=A$, maka w tidak memiliki "11" DAN tidak diakhiri dengan '1'.
> > - Jika $\hat\delta(A,w)=B$, maka w tidak memiliki "11" DAN diakhiri dengan satu buah '1'.
> > - Jika $\hat\delta(A,w)=C$, maka w **pasti** memiliki "11".
> >
> > **Langkah Pembuktian Induksi:**
> >
> > - **Langkah Basis:** Buktikan hipotesis di atas benar untuk string dengan panjang 0, yaitu w=epsilon.
> >
> >   - $\hat{\delta}(A, \epsilon) = A$. String $\epsilon$ tidak punya "11" dan tidak diakhiri '1'. **(Hipotesis 1 terbukti)**.
> >   - Hipotesis 2 dan 3 benar secara hampa (*vacuously true*) karena $\hat{\delta}(A, \epsilon)$ tidak menghasilkan B atau C.
> >
> > - **Langkah Induksi:** Asumsikan hipotesis benar untuk semua string x dengan panjang $|x| < |w|$. Kita harus buktikan hipotesis juga benar untuk w. Kita bisa tulis $w=xa$ (dimana a adalah simbol terakhir).
> >
> >   - **Kasus 1: Buktikan Hipotesis 1 untuk $w$.**
> >     Jika $\hat{\delta}(A, w) = A$, maka dari diagram kita tahu bahwa $a$ harus '0' dan $\hat{\delta}(A, x)$ bisa A atau B. Berdasarkan asumsi induksi untuk $x$, string $x$ tidak punya "11". Karena kita hanya menambahkan '0' di akhir, maka $w$ juga tidak punya "11" dan tidak diakhiri '1'. **(Terbukti)**.
> >   - **Kasus 2: Buktikan Hipotesis 2 untuk $w$.**
> >     Jika $\hat{\delta}(A, w) = B$, maka dari diagram kita tahu $a$ harus '1' dan $\hat{\delta}(A, x)$ harus A. Berdasarkan asumsi, $x$ tidak punya "11" dan tidak diakhiri '1'. Karena kita menambahkan '1', maka $w$ tetap tidak punya "11" dan sekarang diakhiri '1'. **(Terbukti)**.
> >
> > ### Bagian 2: Membuktikan $T\subseteq L(A)$ (Metode Kontrapositif)
> >
> > **Pernyataan:** Jika string w tidak memiliki "11" berurutan, maka w diterima oleh DFA.
> >
> > Membuktikan ini secara langsung bisa jadi sulit. Seringkali lebih mudah untuk membuktikan **kontrapositif**-nya.
> >
> > - **Kontrapositif:** Jika sebuah pernyataan "Jika X maka Y" benar, maka "Jika bukan Y maka bukan X" juga pasti benar.
> > - **Pernyataan Kontrapositif kita:** **Jika w TIDAK diterima oleh DFA, maka w PASTI memiliki "11" berurutan.**
> >
> > **Langkah Pembuktian Kontrapositif:**
> >
> > 1. "Tidak diterima oleh DFA" berarti proses pembacaan string w harus berakhir di state non-final. Dalam contoh kita, satu-satunya state non-final adalah **C**.
> > 2. Jadi, pernyataan kita menjadi: Jika $\hat\delta(A,w)=C$, maka w pasti memiliki "11".
> > 3. Sekarang kita lihat diagram. Bagaimana cara mencapai state C? Satu-satunya cara untuk sampai ke state C adalah dari state B dengan input '1'.
> > 4. Bagaimana cara mencapai state B? Salah satu caranya adalah dari state A dengan input '1'.
> > 5. Ini berarti, untuk mencapai C, string w harus memiliki potongan (substring) yang menyebabkan transisi $A\xrightarrow1 B\xrightarrow1C$. Potongan ini adalah "11".
> > 6. Jadi, terbukti bahwa jika sebuah string berakhir di state C, ia pasti mengandung "11". **(Terbukti)**.
> >
> > Karena kedua bagian ($S\subseteq T \text{ dan } T \subseteq S$) telah terbukti, maka DFA kita dinyatakan benar.

> [!cornell] #### Summary
>  Pembuktian kebenaran DFA adalah proses formal untuk memvalidasi bahwa bahasa yang diterima oleh mesin (L(A)) identik dengan bahasa target (T). Ini dilakukan melalui **strategi pembuktian dua bagian**: pertama, menggunakan **induksi matematika** untuk menunjukkan bahwa semua string yang diterima DFA sesuai dengan aturan bahasa ($L(A) \subseteq T$); dan kedua, seringkali menggunakan **bukti kontrapositif** untuk menunjukkan bahwa semua string yang sesuai aturan bahasa pasti diterima oleh DFA ($T \subseteq L(A)$).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Pembuktian Formal Sangat Penting?
> 
> Menguji DFA dengan beberapa contoh string (test set) itu baik, tetapi tidak akan pernah bisa mencakup semua kemungkinan string yang tak terhingga jumlahnya. Dalam aplikasi kritis—seperti verifikasi protokol komunikasi, desain sirkuit digital, atau _lexer_ pada sebuah compiler—kesalahan kecil bisa berakibat fatal. Pembuktian formal memberikan **jaminan matematis** bahwa DFA akan berfungsi dengan benar untuk **semua kemungkinan input**, sesuatu yang tidak akan pernah bisa dicapai hanya dengan pengujian.
> 
> #### Eksplorasi Mandiri
> 
> - **Pikirkan Hipotesisnya:** Coba pikirkan DFA sederhana yang menerima bahasa $L=w \mid w\text{ adalah string biner yang diakhiri dengan '0'}$. DFA ini mungkin memiliki dua state: $q_0$ (state awal, non-final) dan $q_1$ (final).
> - Apa kira-kira hipotesis induktif yang kuat yang akan Anda buat untuk $q_0$ dan $q_1$? (Petunjuk: Pikirkan tentang simbol terakhir yang dibaca).