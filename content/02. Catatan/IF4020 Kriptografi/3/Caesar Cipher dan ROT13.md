---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Caesar Cipher dan ROT13
>
> > ## Questions/Cues
> >
> > - Apa ciri kriptografi klasik dan mengapa masih dipelajari?
> > - Apa dua teknik dasar penyusun cipher klasik?
> > - Bagaimana rumus enkripsi dan dekripsi Caesar cipher?
> > - Bagaimana menggeneralisasi Caesar cipher untuk pergeseran $k$ dan 256 ASCII?
> > - Mengapa Caesar cipher mudah dipecahkan dengan *exhaustive key search*?
> > - Apa itu ROT13 dan sifat uniknya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 1 (Slides 2-30, 41)
>
> > ### Pendahuluan: Kriptografi Klasik
> >
> > **Kriptografi klasik** (*classical cryptography*) sudah ada sejak ribuan tahun lalu hingga ditemukannya komputer digital. Ciri **cipher klasik**:
> >
> > - Hanya memproses pesan dari **huruf-huruf alfabet**.
> > - Menggunakan **pena dan kertas** — belum ada komputer.
> > - Termasuk jenis **kriptografi kunci-simetri**.
> >
> > **Tiga alasan mempelajari kriptografi klasik:** (1) memahami konsep dasar kriptografi; (2) sebagai dasar algoritma kriptografi modern; (3) untuk memahami kelemahan sistem cipher.
> >
> > ### Dua Teknik Dasar
> >
> > Cipher klasik disusun oleh dua teknik dasar:
> >
> > 1. **Substitusi** — mengganti huruf plainteks dengan huruf cipherteks. Contoh: `MENGANTUK` → `CQBSIBONW`.
> > 2. **Transposisi** — mengubah susunan/posisi huruf plainteks (disebut juga *scrambling*, permutasi, pengacakan). Contoh: `MENGANTUK` → `TNEAKMNGU`. Dibahas di [[Cipher Transposisi - Columnar dan Rail Fence]].
> >
> > Maka dikenal dua macam cipher: **cipher substitusi** dan **cipher transposisi**. Kombinasi keduanya membentuk **product cipher** / **super-enkripsi**.
> >
> > ```mermaid
> > flowchart TD
> >     C["Cipher Klasik<br/>(kunci-simetri)"]
> >     C --> S["Cipher Substitusi<br/>ganti huruf"]
> >     C --> T["Cipher Transposisi<br/>acak posisi huruf"]
> >     S --> PC["Product Cipher<br/>(super-enkripsi)"]
> >     T --> PC
> >     S --> S1["Caesar, ROT13, Affine<br/>Vigenere, Playfair, Hill, Enigma"]
> >     T --> T1["Columnar, Rail Fence"]
> > ```
> >
> > ### Caesar Cipher
> >
> > Cipher substitusi paling terkenal. **Tiap huruf digeser 3 posisi ke kanan**:
> >
> > ```
> > Plainteks  : A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
> > Cipherteks : D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
> > ```
> >
> > Contoh: `temui saya di jembatan merah nanti malam` → `WHPXL VDBD GL MHPEDWDQ PHUDK QDQWL PDODP`.
> >
> > Agar kriptanalisis lebih sulit, cipherteks dikelompokkan ke dalam blok $n$-huruf (mis. 4-huruf: `WHPX LVDB DGLM ...`) atau semua spasi dibuang.
> >
> > ### Rumus Matematis
> >
> > Setiap huruf dikodekan ke integer $0$–$25$ ($A = 0, \dots, Z = 25$). Caesar cipher:
> >
> > $$\text{Enkripsi: } c = E(p) = (p + 3) \bmod 26$$
> > $$\text{Dekripsi: } p = D(c) = (c - 3) \bmod 26$$
> >
> > Contoh enkripsi: $p_1 = \text{`t'} = 19 \rightarrow c_1 = (19 + 3) \bmod 26 = 22 = \text{`W'}$; $p_2 = \text{`e'} = 4 \rightarrow c_2 = 7 = \text{`H'}$.
> > Contoh dekripsi: $c_1 = \text{`W'} = 22 \rightarrow p_1 = (22 - 3) \bmod 26 = 19 = \text{`t'}$.
> >
> > ### Generalisasi
> >
> > Dengan pergeseran sejauh $k$ (kunci rahasia):
> >
> > $$c = E(p) = (p + k) \bmod 26 \qquad p = D(c) = (c - k) \bmod 26$$
> >
> > Untuk alfabet 256 karakter ASCII, ganti modulus menjadi 256: $c = (p + k) \bmod 256$. Alat bantu klasik: **Caesar wheel** (roda dua cakram) untuk membentuk tabel substitusi.
> >
> > ### Kriptanalisis: Exhaustive Key Search
> >
> > Caesar cipher mudah dipecahkan dengan **exhaustive key search** (*brute force*) karena **hanya ada 26 kemungkinan kunci**. Langkah:
> >
> > 1. Dekripsi cipherteks dengan setiap $k = 0, 1, \dots, 25$.
> > 2. Periksa hasil mana yang berupa kata/kalimat bermakna → itu dugaan kuncinya.
> > 3. Verifikasi dengan mencoba $k$ tersebut pada potongan kriptogram lain.
> >
> > Contoh: kriptogram `XMZVH` menghasilkan `CREAM` pada $k = 21$. Bila **dua atau lebih $k$** menghasilkan pesan bermakna (mis. `HSPPW` → `dolls` pada $k=4$, `wheel` pada $k=11$), uji kedua kandidat pada potongan cipherteks lain untuk memastikan.
> >
> > ### ROT13
> >
> > Di Unix, **ROT13** adalah Caesar cipher dengan $k = 13$. Namanya berasal dari *net.jokes* (1980) dan lazim dipakai di forum online untuk menyembunyikan jawaban teka-teki atau *spoiler*.
> >
> > Sifat unik: **enkripsi dua kali mengembalikan pesan semula** —
> > $$P = \text{ROT13}(\text{ROT13}(P))$$
> > sebab $\text{ROT13}(\text{ROT13}(x)) = \text{ROT26}(x) = x$. Jadi dekripsi cukup dengan mengenkripsi ulang. Contoh: `ROT13(ROTATE) = EBGNGR`.

> [!cornell] #### Summary
>
> **Cipher klasik** hanya mengolah huruf alfabet dengan pena-kertas dan bersifat simetri; dipelajari untuk memahami konsep dasar, fondasi cipher modern, dan pola kelemahan. Ia disusun dari dua teknik: **substitusi** (ganti huruf) dan **transposisi** (acak posisi), yang bila digabung menjadi **product cipher**. **Caesar cipher** menggeser tiap huruf 3 posisi: $c = (p + 3) \bmod 26$; digeneralisasi menjadi $c = (p + k) \bmod 26$ dengan $k$ sebagai kunci (atau $\bmod 256$ untuk ASCII). Karena ruang kuncinya hanya **26**, ia jatuh seketika oleh **exhaustive key search** — coba semua $k$, ambil yang bermakna, verifikasi pada potongan lain. **ROT13** ($k=13$) bersifat *involutif*: $\text{ROT13}(\text{ROT13}(P)) = P$. Kelemahan struktural yang lebih dalam (statistik bahasa) dibahas di [[Cipher Abjad-Tunggal dan Analisis Frekuensi]].

> [!ad-libitum]- Additional Information
>
> #### Caesar Cipher dalam Kode
>
> Inti implementasi (C++): untuk tiap karakter, jika `isalpha`, ubah ke kapital, kodekan `c = c - 65`, geser `c = (c + k) % 26`, kembalikan `c = c + 65`. Untuk dekripsi tangani modulo negatif: `if (c - k < 0) c = 26 + (c - k); else c = (c - k) % 26;`. Versi Python biasanya memisahkan fungsi `encrypt(text, k)` dan `decrypt(text, k)` yang memanggil `(ord(ch) - base + k) % 26 + base`.
>
> #### Mengapa Pergeseran 3?
>
> Julius Caesar secara historis memakai $k = 3$ (Suetonius, *Vita Divi Julii*). Keponakannya Augustus memakai $k = 1$ tanpa *wrap-around* ($X \rightarrow AB$). Nilai $k$ spesifik tidak menambah keamanan — Kerckhoffs: yang rahasia hanya kunci, dan di sini kunci hanya 1 dari 26.
>
> #### Additive Cipher dalam Kriptografi Modern
>
> Operasi "tambah kunci modulo" tetap hidup: **stream cipher** (RC4, ChaCha20) meng-XOR plainteks dengan *keystream* — itu penjumlahan mod 2 per bit. Bedanya, keystream modern panjang, pseudo-acak, dan tak pernah diulang, sehingga *exhaustive search* atas ruang kunci $2^{128}$ menjadi mustahil.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis pemecah Caesar otomatis: skor tiap hasil dekripsi dengan frekuensi huruf bahasa Indonesia, kembalikan $k$ dengan skor terbaik.
> 2. Buktikan secara aljabar bahwa $\text{ROT}k$ bersifat involutif jika dan hanya jika $2k \equiv 0 \pmod{26}$, lalu cari semua $k$ yang memenuhi.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 3 (Classical Encryption Techniques).
> - Demo online: `cryptii.com/pipes/caesar-cipher`, `101computing.net/cipher-wheel`.
