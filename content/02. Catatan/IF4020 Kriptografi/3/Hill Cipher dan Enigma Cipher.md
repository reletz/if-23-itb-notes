---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Hill Cipher dan Enigma Cipher
>
> > ## Questions/Cues
> >
> > - Bagaimana Hill cipher memakai aljabar linier untuk enkripsi?
> > - Apa syarat matriks kunci $K$ agar bisa didekripsi?
> > - Mengapa Hill cipher mudah dipecahkan dengan known-plaintext attack?
> > - Bagaimana rotor Enigma menghasilkan cipher abjad-majemuk?
> > - Apa yang menjadi "kunci" pada mesin Enigma?
> > - Bagaimana sejarah pemecahan Enigma?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 2 (Slides 95-119)
>
> > ### Hill Cipher
> >
> > Dikembangkan **Lester Hill** (1929). **Polygram cipher berbasis aljabar linier**: mengenkripsi blok $m$ huruf sekaligus lewat $m$ persamaan linier. Untuk $m = 3$:
> >
> > $$C_1 = (k_{11}p_1 + k_{12}p_2 + k_{13}p_3) \bmod 26$$
> > $$C_2 = (k_{21}p_1 + k_{22}p_2 + k_{23}p_3) \bmod 26$$
> > $$C_3 = (k_{31}p_1 + k_{32}p_2 + k_{33}p_3) \bmod 26$$
> >
> > Dalam bentuk matriks: $\mathbf{C} = K\mathbf{P} \bmod 26$, dengan $K$ matriks kunci $m \times m$.
> >
> > Contoh $m = 3$, plainteks `paymoremoney`, tiga huruf pertama `pay` $= (15, 0, 24)$ → $\mathbf{C} = (11, 13, 18) = $ `LNS`. Selengkapnya: `LNSHDLEWMTRW`.
> >
> > ### Dekripsi Hill Cipher
> >
> > Perlu **invers matriks $K^{-1}$** modulo 26 sehingga $K K^{-1} \equiv I \pmod{26}$:
> >
> > $$\mathbf{P} = K^{-1}\mathbf{C} \bmod 26$$
> >
> > Untuk matriks $2 \times 2$ $K = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$:
> >
> > $$K^{-1} = (\det K)^{-1} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} \bmod 26$$
> >
> > dengan $\det K = (ad - bc) \bmod 26$, dan **$(\det K)^{-1} \bmod 26$ harus ada** — artinya $\gcd(\det K, 26) = 1$. Contoh: $K = \begin{bmatrix} 3 & 15 \\ 10 & 9 \end{bmatrix}$, $\det K = 27 - 150 = -123 \equiv 7 \pmod{26}$, dan $7^{-1} \equiv 15 \pmod{26}$. Untuk $3 \times 3$ pakai eliminasi Gauss-Jordan atau rumus adjoin/kofaktor.
> >
> > ### Kekuatan dan Kriptanalisis Hill
> >
> > **Kekuatan**: menyembunyikan frekuensi huruf tunggal — huruf plainteks sama belum tentu jadi cipherteks sama (tiap huruf output bergantung pada seluruh huruf blok).
> >
> > **Kelemahan**: **mudah dipecahkan dengan known-plaintext attack**. Bila kriptanalis punya cukup pasang $(\mathbf{P}, \mathbf{C})$ untuk menyusun matriks $P$ yang invertibel:
> >
> > $$K = C P^{-1} \bmod 26$$
> >
> > Contoh $m = 2$: $\mathbf{P} = (19, 7) \to \mathbf{C} = (0, 23)$ dan $\mathbf{P} = (4, 17) \to \mathbf{C} = (12, 6)$. Susun $P = \begin{bmatrix} 19 & 4 \\ 7 & 17 \end{bmatrix}$, hitung $P^{-1} \bmod 26$, lalu $K = C P^{-1} \bmod 26$.
> >
> > ### Enigma Cipher
> >
> > **Mesin enkripsi elektromekanik** — ditemukan & dipatenkan insinyur Jerman **Arthur Scherbius** untuk keperluan komersial, diplomatik, militer. Terkenal karena dipakai Nazi Jerman pada PD II. *Enigma* dari Latin *aenigma* = "teka-teki".
> >
> > Cara kerja: operator mengetik huruf plainteks di *keyboard*, huruf cipherteks menyala di *lampboard*, disalin dan dikirim.
> >
> > - Menggunakan sistem **rotor** (roda berputar). **Setiap rotor melakukan substitusi abjad-tunggal**.
> > - Output satu rotor menjadi input rotor berikutnya; output rotor terakhir = huruf cipherteks.
> > - Setiap kali sebuah huruf dienkripsi, **rotor berputar satu langkah** → tabel substitusi berubah. Setelah 26 putaran rotor kembali ke posisi awal → **cipher abjad-majemuk berperiode 26**.
> > - Rotor kedua bergeser satu langkah setiap rotor pertama menyelesaikan 26 langkah, dst (seperti odometer).
> >
> > ```mermaid
> > flowchart LR
> >     KB["Keyboard: huruf P"] --> PB["Plugboard"]
> >     PB --> R3["Rotor 3"] --> R2["Rotor 2"] --> R1["Rotor 1"]
> >     R1 --> RF["Reflector"]
> >     RF --> R1b["Rotor 1"] --> R2b["Rotor 2"] --> R3b["Rotor 3"]
> >     R3b --> PB2["Plugboard"] --> LB["Lampboard: huruf C"]
> > ```
> >
> > Model 3-rotor / 4-rotor. Untuk 4-rotor: $26^4 = 456.976$ kemungkinan sebelum urutan berulang. **Kunci Enigma = posisi awal keempat rotor** (yang bisa di-set), ditambah pengaturan *plugboard* dan pilihan/urutan rotor.
> >
> > ### Sejarah Pemecahan Enigma
> >
> > - Kriptanalisis Enigma **pertama** oleh kriptografer Polandia **Marian Rejewski, Jerzy Różycki, Henryk Zygalski** (1932).
> > - Jerman mendesain ulang Enigma (1939) dengan menambah **reflector** dan **plugboard** → metode lama tak berlaku.
> > - Dengan bantuan Polandia, Prancis & Inggris membuat mesin pemecah baru bernama **Bombe**, dirancang **Alan Turing** di Bletchley Park.
> > - Bombe berhasil memecahkan Enigma. Keberhasilan ini dianggap **memperpendek Perang Dunia II hingga sekitar dua tahun**.

> [!cornell] #### Summary
>
> **Hill cipher** (Lester Hill, 1929) mengenkripsi blok huruf dengan perkalian matriks: $\mathbf{C} = K\mathbf{P} \bmod 26$; dekripsi $\mathbf{P} = K^{-1}\mathbf{C} \bmod 26$ menuntut $K^{-1}$ ada, yaitu $\gcd(\det K, 26) = 1$. Ia menyembunyikan frekuensi huruf tunggal tetapi **runtuh oleh known-plaintext attack**: cukup pasangan $(\mathbf{P}, \mathbf{C})$ untuk menghitung $K = CP^{-1} \bmod 26$. **Enigma** adalah mesin rotor elektromekanik: tiap **rotor = substitusi abjad-tunggal**, dan rotor berputar tiap huruf sehingga keseluruhannya menjadi **cipher abjad-majemuk berperiode besar**. **Kunci = posisi awal rotor** + plugboard + urutan rotor. Dipecahkan Polandia (1932), lalu — setelah Jerman menambah reflector & plugboard (1939) — oleh **Bombe** rancangan **Alan Turing**, yang memperpendek PD II. Cipher modern (lihat [[Algoritma Kriptografi]]) mewarisi ide substitusi–permutasi berlapis ini dengan operasi jauh lebih kompleks.

> [!ad-libitum]- Additional Information
>
> #### Cacat Desain Enigma yang Fatal
>
> **Reflector** membuat enkripsi Enigma *involutif* (menekan huruf yang sama mendekripsi), memudahkan operasi — tetapi menjamin **sebuah huruf tak pernah dienkripsi menjadi dirinya sendiri**. Cacat ini plus *cribs* (potongan plainteks yang bisa ditebak, mis. laporan cuaca `WETTERBERICHT`) memberi Bombe titik masuk untuk mengeliminasi jutaan pengaturan rotor secara mekanis. Kesalahan prosedural operator Jerman (indikator pesan yang dapat ditebak) memperparahnya.
>
> #### Hill Cipher dan Kriptografi Modern
>
> Meski usang, Hill cipher memperkenalkan **difusi**: satu huruf plainteks memengaruhi banyak huruf cipherteks. Konsep ini formal dalam kriteria Shannon **confusion & diffusion** yang memandu desain AES (lapisan `MixColumns` pada dasarnya perkalian matriks atas $GF(2^8)$).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan Hill cipher $2 \times 2$ dan $3 \times 3$ dengan invers matriks modular; tambahkan known-plaintext solver yang memulihkan $K$.
> 2. Bangun simulator Enigma 3-rotor (rotor I–III historis + reflector B) dan verifikasi sifat involutif serta "no letter maps to itself".
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 3.2 (Hill Cipher).
> - Simon Singh, *The Code Book*, Bab 4 (Enigma & Bletchley Park).
> - Simulator: `101computing.net/enigma/enigma-instructions.html`.
