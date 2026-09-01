---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Teori Informasi dan Entropi
>
> > ## Questions/Cues
> >
> > - Apa yang dipelajari teori informasi?
> > - Apa itu entropi dan apa satuannya?
> > - Bagaimana rumus entropi Shannon $H(X)$?
> > - Berapa nilai entropi minimum dan maksimum?
> > - Berapa entropi maksimum teks 26 huruf alfabet dan 256 karakter ASCII?
> > - Mengapa cipherteks memiliki entropi tinggi?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Landasan Matematika untuk Kriptografi (Slides 4-9)
>
> > ### Teori Informasi
> >
> > **Information theory** adalah cabang ilmu yang mempelajari **kuantisasi, penyimpanan, transmisi, dan pengolahan informasi**. Contoh kuantisasi:
> >
> > - 1 bit untuk mengkodekan jenis kelamin (M/F).
> > - 3 bit untuk mengkodekan nama hari (ada 7 hari).
> > - 4 bit untuk mengkodekan angka 0–9.
> >
> > Contoh penyimpanan: **pemampatan data** untuk mengurangi ukuran ruang *storage*.
> >
> > ### Entropi
> >
> > Salah satu metrik terpenting dalam teori informasi adalah **entropi**. Entropi mengukur **ketidakpastian** atau **jumlah rata-rata informasi** di dalam pesan.
> >
> > - Semakin **acak** suatu data, semakin **tinggi** entropinya.
> > - **Cipherteks adalah pesan dengan entropi tinggi** — idealnya tak terbedakan dari data acak.
> > - Entropi dinyatakan dalam satuan **bit**.
> >
> > Rumus entropi Shannon untuk pesan $X$:
> >
> > $$H(X) = -\sum_{i=1}^{n} p(x_i) \, \log_2 p(x_i)$$
> >
> > dengan $X$ = variabel acak yang menyatakan pesan, $x_i$ = simbol ke-$i$, $n$ = banyak simbol berbeda, dan $p(x_i)$ = peluang kemunculan $x_i$.
> >
> > ### Contoh Perhitungan
> >
> > Misalkan pesan $X = \text{`AABBCBDB'}$ (panjang 8). Maka $n = 4$ (huruf A, B, C, D) dengan $p(A) = 2/8$, $p(B) = 4/8$, $p(C) = 1/8$, $p(D) = 1/8$.
> >
> > $$H(X) = -\left\{ \tfrac{1}{4}\log_2\tfrac{1}{4} + \tfrac{1}{2}\log_2\tfrac{1}{2} + \tfrac{1}{8}\log_2\tfrac{1}{8} + \tfrac{1}{8}\log_2\tfrac{1}{8} \right\}$$
> > $$= -\left\{ \tfrac{1}{4}(-2) + \tfrac{1}{2}(-1) + \tfrac{1}{8}(-3) + \tfrac{1}{8}(-3) \right\} = -(-1{,}75) = 1{,}75$$
> >
> > **Entropi = 1,75 bit per simbol.**
> >
> > ### Rentang Nilai Entropi
> >
> > - **Entropi minimum = 0 bit** — tidak ada ketidakpastian. Terjadi bila hanya ada satu simbol dengan peluang 1 (pasti): $H(X) = -1 \cdot \log_2 1 = 0$.
> > - **Entropi maksimum = $\log_2 n$ bit** — terjadi bila semua simbol muncul dengan peluang sama $1/n$. Ini kondisi ketidakpastian tertinggi; setiap simbol membawa informasi maksimal.
> >
> > ```mermaid
> > flowchart LR
> >     A["H = 0 bit<br/>1 simbol, p = 1<br/>(pasti / tidak acak)"] --> B["0 &lt; H &lt; log2(n)<br/>distribusi tak seragam<br/>(bahasa natural)"]
> >     B --> C["H = log2(n) bit<br/>semua simbol equiprobable<br/>(acak / ideal cipherteks)"]
> > ```
> >
> > ### Entropi Bahasa dan Cipherteks
> >
> > - Teks yang hanya memakai **26 huruf alfabet** (A–Z) mencapai entropi maksimum bila $p_i = 1/26$ untuk semua huruf:
> >   $$H_{max} = \log_2 26 \approx 4{,}7004 \text{ bit/karakter}$$
> > - Pesan **256 karakter ASCII**: $H_{max} = \log_2 256 = 8$ bit/karakter.
> > - **Makin besar entropi, makin sulit memecahkan cipherteks.**
> >
> > Contoh nyata (plainteks berbahasa Indonesia dienkripsi):
> >
> > | Pesan | Entropi |
> > |---|---|
> > | Plainteks $P$ | $H(P) = 3{,}8988$ bit/karakter |
> > | Cipherteks $C$ | $H(C) = 4{,}3035$ bit/karakter |
> >
> > Entropi cipherteks **meningkat** dan mencapai $\tfrac{4{,}3035}{4{,}7004} \times 100\% \approx 91{,}55\%$ dari entropi maksimum pesan 26 huruf alfabet. Cipher yang baik mendorong entropi cipherteks sedekat mungkin ke 100%.

> [!cornell] #### Summary
>
> **Teori informasi** mempelajari kuantisasi, penyimpanan, transmisi, dan pengolahan informasi. Metrik utamanya adalah **entropi** $H(X) = -\sum p(x_i)\log_2 p(x_i)$ (satuan **bit**), yang mengukur ketidakpastian/informasi rata-rata: makin acak, makin tinggi. Entropi berkisar dari **0** (satu simbol pasti) hingga **$\log_2 n$** (semua simbol equiprobable). Untuk 26 huruf alfabet $H_{max} = \log_2 26 \approx 4{,}7$ bit/karakter; untuk 256 ASCII $H_{max} = 8$. **Cipherteks yang baik berentropi tinggi**, mendekati maksimum — pada contoh, enkripsi menaikkan entropi dari $3{,}90$ ke $4{,}30$ bit/karakter ($\approx 91{,}55\%$ dari maksimum). Konsep entropi menjelaskan mengapa **analisis frekuensi** ([[Cipher Abjad-Tunggal dan Analisis Frekuensi]]) berhasil pada cipher berentropi rendah dan gagal pada [[Vigenère Cipher dan Kriptanalisis Kasiski]] yang histogramnya lebih datar.

> [!ad-libitum]- Additional Information
>
> #### Redundansi Bahasa dan Unicity Distance
>
> Bahasa Inggris nyata hanya berentropi $\approx 1{,}0$–$1{,}5$ bit/huruf (jauh di bawah $4{,}7$) karena **redundansi**. Shannon mendefinisikan **unicity distance** $U = H(K) / D$, yaitu panjang cipherteks minimum agar kunci dapat ditentukan secara unik, dengan $D$ = redundansi bahasa. Untuk substitusi monoalfabetik ($H(K) = \log_2 26! \approx 88{,}4$ bit), $U \approx 28$ huruf — itu sebabnya cipherteks pendek pun sudah bisa dipecahkan.
>
> #### Perfect Secrecy dan One-Time Pad
>
> Shannon membuktikan **one-time pad** (Vigenère dengan kunci acak sepanjang pesan, dipakai sekali) memberi **perfect secrecy**: $H(P \mid C) = H(P)$, cipherteks sama sekali tidak membocorkan informasi plainteks. Syaratnya berat: kunci sejati-acak, sepanjang pesan, tak pernah dipakai ulang.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program penghitung entropi Shannon; bandingkan $H$ untuk teks bahasa Indonesia, hasil Caesar cipher, hasil Vigenère, dan output `/dev/urandom`.
> 2. Estimasi unicity distance untuk Vigenère cipher dengan panjang kunci 5 dan bandingkan dengan panjang cipherteks yang biasanya dibutuhkan metode Kasiski.
>
> #### Bacaan Lanjutan
>
> - C. E. Shannon, *"A Mathematical Theory of Communication"*, 1948.
> - C. E. Shannon, *"Communication Theory of Secrecy Systems"*, 1949.
> - *Handbook of Applied Cryptography*, Bab 1.13 (Information-theoretic security).
