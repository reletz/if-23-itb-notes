---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Cipher Transposisi - Columnar dan Rail Fence
>
> > ## Questions/Cues
> >
> > - Apa yang dilakukan cipher transposisi terhadap plainteks?
> > - Mengapa disebut juga cipher permutasi?
> > - Bagaimana enkripsi dan dekripsi Columnar Transposition Cipher?
> > - Bagaimana kata kunci mengatur urutan pembacaan kolom?
> > - Bagaimana cara kerja Rail Fence Cipher?
> > - Apa itu super-enkripsi (product cipher)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 1 (Slides 31-41)
>
> > ### Konsep Cipher Transposisi
> >
> > **Cipher transposisi** memperoleh cipherteks dengan **mengubah posisi huruf** di dalam plainteks — melakukan *transpose* terhadap rangkaian huruf. Disebut juga **cipher permutasi**, karena men-*transpose* karakter sama dengan mempermutasikannya. Huruf-hurufnya **tidak diganti**, hanya **diacak urutannya**.
> >
> > Contoh cipher transposisi: **Columnar Transposition** dan **Rail Fence**.
> >
> > ### Columnar Transposition Cipher
> >
> > **Enkripsi** — tulis plainteks (spasi dibuang) baris demi baris ke dalam matriks selebar **panjang kunci**, lalu baca **kolom per kolom secara vertikal**.
> >
> > Plainteks `sistem dan teknologi informasi itb`, panjang kunci = 6:
> >
> > ```
> > s i s t e m
> > d a n t e k
> > n o l o g i
> > i n f o r m
> > a s i i t b
> > ```
> >
> > Baca vertikal: `SDNIA IAONS NLFIT TOOI EEGR TMKI MB` → cipherteks `SDNIAIAONSSNLFITTOOIEEGRTMKIMB`.
> >
> > **Dekripsi** — bagi panjang cipherteks dengan panjang kunci ($30 / 6 = 5$ kolom). Tulis cipherteks **vertikal** sepanjang 5 kolom, lalu baca **horizontal** untuk memperoleh plainteks kembali.
> >
> > ```mermaid
> > flowchart LR
> >     P["Plainteks<br/>(buang spasi)"] --> G["Tulis baris demi baris<br/>ke matriks selebar |kunci|"]
> >     G --> R["Baca kolom per kolom<br/>(vertikal)"]
> >     R --> C["Cipherteks"]
> >     C --> G2["Tulis vertikal<br/>(panjang C / |kunci| baris)"]
> >     G2 --> R2["Baca horizontal"]
> >     R2 --> P2["Plainteks"]
> > ```
> >
> > ### Columnar dengan Kata Kunci
> >
> > Untuk enkripsi lebih kompleks, gunakan **kata kunci sepanjang $n$ dengan huruf berbeda**. **Urutan alfabetis huruf kunci** menentukan urutan pembacaan kolom.
> >
> > Kata kunci `TOMBAK` → urutan alfabetis huruf: `T O M B A K` = `6 5 4 2 1 3`. Kolom dibaca sesuai urutan angka tersebut (kolom ber-label `1` dulu, yaitu di bawah `A`, lalu `2` di bawah `B`, dst).
> >
> > Plainteks `sistem dan teknologi informasi itb` dengan kata kunci `TOMBAK` → cipherteks `EEGRTTTOOIMKIMBSNLFIIAONSSDNIA`.
> >
> > ### Rail Fence Transposition Cipher
> >
> > Plainteks ditulis **zig-zag** pada beberapa "rel" (baris), lalu dibaca baris demi baris.
> >
> > Plainteks `CRYPTOGRAPHY AND DATA SECURITY`, $k = 3$ baris:
> >
> > ```
> > C . . . T . . . A . . . A . . . A . . . E . . . I .
> > . R . P . O . R . P . Y . N . D . T . S . C . R . T . Y . G . H . D . A . U . Y
> > . . Y . . . G . . . H . . . D . . . A . . . U . . . Y
> > ```
> >
> > Cipherteks (baca baris per baris): `CTAAAEIRPORPYNDTSCRTYGHDAUY`. Kita juga bebas mendefinisikan aturan transposisi sendiri, mis. membagi plainteks jadi blok 8-huruf lalu mempermutasi tiap blok dengan pola tetap (tambahkan huruf *dummy* bila blok < 8).
> >
> > ### Super-Enkripsi (Product Cipher)
> >
> > **Super-enkripsi** menggabungkan **cipher substitusi + cipher transposisi**, disebut juga **product cipher**. Pesan mula-mula dienkripsi dengan cipher substitusi, hasilnya dienkripsi lagi dengan cipher transposisi (atau sebaliknya).
> >
> > Contoh: plainteks `hello world`
> >
> > 1. Caesar cipher ($k = 3$) → `KHOOR ZRUOG`.
> > 2. Cipher transposisi ($k = 4$):
> >    ```
> >    K H O O
> >    R Z R U
> >    O G Z Z
> >    ```
> >    baca vertikal → cipherteks akhir `KROHZGORZOUZ`.
> >
> > **Cipher modern (DES, AES) memakai konsep kombinasi substitusi + transposisi ini**, tetapi operasinya dibuat sekompleks mungkin dan diulang berkali-kali (*rounds*).

> [!cornell] #### Summary
>
> **Cipher transposisi** (= cipher permutasi) tidak mengganti huruf, hanya **mengacak posisinya**. **Columnar Transposition** menulis plainteks baris demi baris ke matriks selebar panjang kunci lalu membacanya **kolom per kolom**; dekripsi membalik prosesnya setelah menghitung jumlah baris = $|C| / |kunci|$. Dengan **kata kunci**, urutan alfabetis hurufnya menentukan urutan pembacaan kolom. **Rail Fence** menulis plainteks zig-zag pada $k$ rel lalu membaca baris demi baris. Menggabungkan cipher substitusi dan transposisi menghasilkan **product cipher / super-enkripsi** — prinsip yang diwarisi cipher blok modern lewat jaringan substitusi–permutasi berlapis. Analisis kelemahan cipher substitusi tunggal ada di [[Cipher Abjad-Tunggal dan Analisis Frekuensi]].

> [!ad-libitum]- Additional Information
>
> #### Implementasi Columnar dalam Python
>
> Enkripsi tanpa kata kunci sederhana: buat `ciphertext = [''] * k`; untuk tiap `kolom` di `range(k)`, ambil karakter `plaintext[kolom], plaintext[kolom+k], plaintext[kolom+2k], ...` lalu gabungkan. Dekripsi lebih rumit karena kolom terakhir bisa lebih pendek — hitung `jumlah_baris = ceil(len(ciphertext)/k)` dan `jumlah_sel_kosong = jumlah_baris*k - len(ciphertext)`, lalu isi baris demi baris dengan memperhatikan sel kosong di baris terakhir.
>
> #### Kriptanalisis Cipher Transposisi
>
> Cipher transposisi **tidak mengubah frekuensi huruf** — histogram cipherteks identik dengan plainteks, sehingga analisis frekuensi huruf tunggal langsung menunjukkan "ini transposisi, bukan substitusi". Serangannya: coba semua panjang kunci yang wajar, lalu untuk tiap kandidat susun ulang dan uji dengan **frekuensi bigram/trigram** (anagram) — kolom yang berdampingan menghasilkan pasangan huruf yang lazim dalam bahasa target.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan columnar transposition dengan kata kunci, lalu tunjukkan bahwa scytale (dari [[Sejarah Kriptografi]]) adalah kasus khusus columnar tanpa permutasi kolom.
> 2. Bangun pemecah rail-fence otomatis: coba $k = 2 \dots 10$, skor tiap hasil dengan frekuensi trigram bahasa Indonesia.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 3.3 (Transposition Techniques).
> - Demo online: `dcode.fr/columnar-transposition-cipher`.
