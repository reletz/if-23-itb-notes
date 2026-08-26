---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Sejarah Kriptografi
>
> > ## Questions/Cues
> >
> > - Siapa tiga pihak yang berkontribusi pada kriptografi zaman dahulu?
> > - Apa beda kriptografi klasik (old) dan modern?
> > - Alat apa yang dipakai di Mesir, Yunani, dan Romawi kuno?
> > - Apa kontribusi bangsa Arab (ad-Durayhim) terhadap klasifikasi cipher?
> > - Cipher terkenal apa yang muncul dari Renaisans sampai abad 19?
> > - Apa peran Enigma di Perang Dunia II?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 48-57)
>
> > ### Garis Besar Sejarah
> >
> > Kriptografi sudah berusia sangat tua — ada sejak peradaban manusia. Secara historis ia diasosiasikan dengan **mata-mata, pemerintahan, dan militer**, dan telah dipakai dalam perang selama ribuan tahun. Tiga pihak berkontribusi penting pada kriptografi zaman dahulu: **kalangan militer, diplomat, dan diarist** (penulis catatan harian).
> >
> > Sejak lebih dari 50 tahun lalu kriptografi mendapatkan **landasan matematika** dan bergeser dari aplikasi militer ke **aplikasi komersial**. Secara garis besar kriptografi dibagi menjadi dua era: **klasik** dan **modern**.
> >
> > ### Kriptografi Klasik (Old Cryptography)
> >
> > Disebut juga *ancient* atau *classical cryptography* — kriptografi sebelum ada komputer digital.
> >
> > - Hanya mengenkripsi **huruf dan angka**, menggunakan **kertas dan pena** saja.
> > - Semua ciphernya sudah **kadaluarsa** (tidak aman lagi karena berhasil dikriptanalisis).
> > - Contoh: **Caesar, Vigenere, Playfair, Hill, Beauford, Enigma**.
> >
> > ### Kriptografi Modern
> >
> > Enkripsi dan dekripsi pesan dalam bentuk **digital dengan komputer digital**, mencakup teks, audio, gambar, dan video.
> >
> > - Simetri: **DES, 3DES, AES, Serpent**.
> > - Kunci publik: **RSA, ElGamal, ECC, Diffie-Hellman, DSA**.
> > - Fungsi hash: **MD5, SHA-3**.
> > - Protokol: **TLS**.
> >
> > ### Mesir, Yunani, dan Romawi Kuno
> >
> > - **Mesir Kuno (~4000 tahun lalu):** menggunakan **hieroglyph tidak standar** untuk menulis pesan di dinding piramid.
> > - **Yunani (~400 SM):** memakai alat **scytale** — pita yang dililitkan pada tongkat berdiameter tertentu; huruf hanya terbaca bila diameter tongkatnya benar. Contoh: plainteks `KILLKINGTOMORROWMIDNIGHT` → cipherteks `KIMWIINOMGLGRIHLTRDTKOON`. Ini bentuk awal **transposition cipher**.
> >
> > ### Bangsa Arab: ad-Durayhim
> >
> > Sejarah kriptologi bangsa Arab terdokumentasi dalam seri **Arabic Origins of Cryptology** (King Faisal Center for Research and Islamic Studies). **Ibn ad-Durayhim** (Ali ibn Muhammad ibn Abd al-Aziz, Taj ad-Din; lahir di Mosul 1312 M) mengelompokkan cipher ke dalam **delapan tipe**:
> >
> > 1. Transposisi
> > 2. Substitusi
> > 3. Penambahan atau reduksi jumlah huruf
> > 4. Penggunaan piranti sandi
> > 5. Penggantian huruf dengan angka yang diboboti secara desimal
> > 6. Penyandian huruf dengan kata-kata
> > 7. Penggantian huruf dengan nama generik
> > 8. Penggunaan simbol/tanda untuk menyatakan huruf
> >
> > Kata David Kahn: *"Cryptology was born among Arabs. They were the first to discover and write down the methods of cryptanalysis."*
> >
> > ### Eropa: Renaisans sampai Abad 19
> >
> > - **Vigenere Cipher** — dipublikasikan oleh diplomat Perancis **Blaise de Vigenere** pada **1586**; cipher substitusi polialfabetik.
> > - **Playfair Cipher** — dipromosikan diplomat Inggris **Lord Playfair**, meskipun penemu aslinya **Charles Wheatstone** (**1854**); cipher digraf.
> > - **Abad ke-17, Inggris:** **Queen Mary of Scotland** dipancung setelah cipherteks rahasianya dari balik penjara — berisi rencana membunuh Ratu Elizabeth I — berhasil dipecahkan oleh codebreaker **Thomas Phelippes**.
> >
> > ### Perang Dunia II: Enigma
> >
> > Pemerintah Nazi Jerman membuat mesin enkripsi bernama **Enigma**. **Enigma cipher berhasil dipecahkan oleh pihak Sekutu**, dan keberhasilan itu sering disebut sebagai faktor yang **memperpendek Perang Dunia II**.
> >
> > ```mermaid
> > flowchart TD
> >     A["~2000 SM<br/>Hieroglyph (Mesir)"] --> B["~400 SM<br/>Scytale (Yunani)"]
> >     B --> C["Abad IX<br/>Analisis frekuensi (Al-Kindi)"]
> >     C --> D["Abad XIV<br/>8 tipe cipher (ad-Durayhim)"]
> >     D --> E["1586<br/>Vigenere Cipher"]
> >     E --> F["1854<br/>Playfair Cipher"]
> >     F --> G["PD II<br/>Enigma dipecahkan Sekutu"]
> >     G --> H["1976<br/>Kriptografi kunci publik"]
> > ```

> [!cornell] #### Summary
>
> Kriptografi setua peradaban, awalnya milik **militer, diplomat, dan diarist**, lalu mendapat **landasan matematika** dan bergeser ke ranah komersial. Era **klasik** hanya menyandikan huruf dengan kertas-pena dan seluruh ciphernya kini kadaluarsa (Caesar, Vigenere, Playfair, Hill, Enigma); era **modern** menyandikan data digital dengan komputer (DES, AES, RSA, SHA, TLS). Jejaknya: **hieroglyph** Mesir, **scytale** Yunani (transposisi), delapan tipe cipher **ad-Durayhim** dari dunia Arab, **Vigenere** (1586) dan **Playfair** (1854) dari Eropa, tragedi **Queen Mary of Scotland**, hingga pemecahan **Enigma** yang memperpendek Perang Dunia II. Klasifikasi algoritma yang lahir dari era modern dibahas di [[Algoritma Kriptografi]].

> [!ad-libitum]- Additional Information
>
> #### Enigma dan Kelahiran Komputasi
>
> Upaya memecahkan Enigma di **Bletchley Park** melahirkan **Bombe** (Alan Turing & Gordon Welchman) dan kemudian **Colossus**, komputer elektronik programmable pertama, untuk menyerang cipher Lorenz Jerman. Kelemahan Enigma yang dieksploitasi: sebuah huruf tidak pernah dienkripsi menjadi dirinya sendiri, plus *cribs* (potongan plainteks yang dapat ditebak seperti "WETTER").
>
> #### Mengapa Cipher Klasik Jatuh
>
> Substitusi monoalfabetik jatuh oleh **analisis frekuensi**; Vigenere jatuh oleh **uji Kasiski** dan **indeks kebetulan** (Friedman) yang menemukan panjang kunci; scytale jatuh karena hanya perlu mencoba beberapa diameter. Pelajarannya: ruang kunci kecil + struktur statistik bahasa yang bocor = tidak aman.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan scytale dan tunjukkan bahwa ia identik dengan *columnar transposition*; bandingkan cipherteks contoh di slide.
> 2. Serang Vigenere cipher: implementasikan uji Kasiski untuk menebak panjang kunci lalu pecahkan tiap kolom dengan analisis frekuensi.
>
> #### Bacaan Lanjutan
>
> - David Kahn, *The Codebreakers: The Comprehensive History of Secret Communication*, Scribner, 1996.
> - Simon Singh, *The Code Book*, 1999 — bab Enigma dan Bletchley Park.
> - *Arabic Origins of Cryptology* (King Faisal Center for Research and Islamic Studies).
