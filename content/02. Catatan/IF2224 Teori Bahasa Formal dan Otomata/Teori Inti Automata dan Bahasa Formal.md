---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana model komputasi dasar?
> > - Apa itu Automaton?
> > - Apa perbedaan 3 jenis Automata?
> > - Apa itu Finite Automata (FA)?
> > - Apa itu Pushdown Automata (PDA)?
> > - Apa itu Turing Machine?
> > - Apa hubungan Automata & Bahasa?
> >
> > ## Reference Points
> > 
> > - Slides: 9-15
> > - Slides: 16-21
> > - Slides: 25-27
> 
> > ### Model Dasar Komputasi
> > 
> > Sebuah komputasi dapat dibayangkan sebagai sistem yang terdiri dari beberapa komponen utama:
> > 
> > - **Input Memory:** Tempat data awal dimasukkan.
> > - **CPU (Central Processing Unit):** Otak yang melakukan pemrosesan.
> > - **Program Memory:** Menyimpan instruksi atau langkah-langkah yang harus dijalankan oleh CPU.
> > - **Temporary Memory:** Memori sementara untuk menyimpan hasil perhitungan antara.
> > - **Output Memory:** Tempat hasil akhir dari komputasi disimpan.
> > 
> > Sebagai contoh, untuk menghitung f(x)=x3 dengan input x=2:
> > 
> > 1. **Input:** x=2 masuk ke _input memory_.
> > 2. **Proses 1:** CPU mengikuti instruksi dari _program memory_ untuk menghitung x∗x. Hasilnya (z=4) disimpan di _temporary memory_.
> > 3. **Proses 2:** CPU mengambil nilai z dari _temporary memory_ dan menghitung z∗x. Hasilnya (f(x)=8) disimpan lagi di _temporary memory_.
> > 4. **Output:** Hasil akhir f(x)=8 dipindahkan ke _output memory_.
> > 
> > ### Automaton: Inti dari Mesin Komputasi
> > 
> > Dalam model di atas, **Automaton** adalah abstraksi dari unit pemrosesan intinya, yang mencakup **CPU** dan **Program Memory**. Automaton inilah yang membaca input, mengikuti serangkaian aturan, dan menghasilkan output.
> > 
> > Perbedaan utama antara jenis-jenis automaton terletak pada **jenis memori temporer** yang mereka miliki.
> > 
> > ### Tiga Jenis Utama Automata (Hirarki Kekuatan)
> > 
> > Automata diklasifikasikan berdasarkan kemampuan komputasinya, yang ditentukan oleh memori temporernya. Semakin kuat memorinya, semakin kompleks masalah yang bisa diselesaikan.
> > 
> > **1. Finite Automata (FA)**
> > 
> > - **Memori Temporer:** Tidak ada. Ini adalah jenis automaton yang paling sederhana.
> > - **Kemampuan:** Hanya bisa "mengingat" state (keadaan) di mana ia berada saat ini. Tidak bisa menyimpan data tambahan.
> > - **Kekuatan Komputasi:** Paling rendah.
> > - **Contoh Aplikasi:** Mengenali pola sederhana, memvalidasi input, _vending machine_, _traffic light_.
> > 
> > **2. Pushdown Automata (PDA)**
> > 
> > - **Memori Temporer:** **Stack (Tumpukan)**. Data hanya bisa diakses dengan mekanisme LIFO (_Last-In, First-Out_). Operasi dasarnya adalah `push` (menambah ke atas tumpukan) dan `pop` (mengambil dari atas tumpukan).
> > - **Kemampuan:** Bisa mengingat urutan data secara terbalik. Penting untuk menangani struktur bersarang, seperti kurung buka-tutup.
> > - **Kekuatan Komputasi:** Menengah.
> > - **Contoh Aplikasi:** _Compiler_ untuk memeriksa sintaks bahasa pemrograman (misalnya, memastikan setiap `begin` punya `end`).
> > 
> > **3. Turing Machine**
> > 
> > - **Memori Temporer:** **Random Access Memory (RAM)**. Direpresentasikan sebagai pita tak terbatas yang bisa dibaca dan ditulis di posisi mana pun.
> > - **Kemampuan:** Dapat mensimulasikan logika algoritma apa pun. Merupakan model teoretis untuk komputer modern.
> > - **Kekuatan Komputasi:** Paling tinggi.
> > - **Contoh Aplikasi:** Model untuk algoritma apa pun yang bisa dijalankan di komputer.
> > 
> > **Hirarki Kekuatan:** `Finite Automata` < `Pushdown Automata` < `Turing Machine`.
> > 
> > ### Hubungan Automata dan Bahasa Formal
> > 
> > Setiap jenis automaton memiliki padanannya dalam kelas **bahasa formal**. Sebuah automaton bertindak sebagai **mesin pengenal (recognizer)** untuk bahasanya. Artinya, jika sebuah untaian (string) sesuai dengan aturan bahasa tersebut, automaton akan menerimanya.
> > 
> > Berikut adalah pemetaan langsungnya:
> > 
> > | Automata (Mesin) | Bahasa yang Dikenali |
> > | :--- | :--- |
> > | Finite Automata | Regular Language |
> > | Pushdown Automata | Context-Free Language |
> > | Turing Machine | Unrestricted Language |

> [!cornell] #### Summary
> Automata adalah model komputasi abstrak yang dibedakan berdasarkan jenis memori temporer yang digunakannya, yang secara langsung menentukan kekuatan komputasinya. Terdapat hirarki kekuatan yang jelas: Finite Automata (tanpa memori) adalah yang terlemah, diikuti oleh Pushdown Automata (memori stack), dan Turing Machine (memori akses acak) sebagai yang terkuat. Setiap jenis automaton ini secara spesifik bertindak sebagai mesin pengenal untuk kelas bahasa formal yang setara: Regular, Context-Free, dan Unrestricted.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Apa Batasan Komputasi? Konsep "Computability"
> 
> Keberadaan _Turing Machine_ sebagai model komputasi terkuat memunculkan pertanyaan: "Apakah semua masalah bisa diselesaikan oleh Turing Machine?". Jawabannya adalah **tidak**. Ada masalah yang terbukti secara matematis tidak dapat dipecahkan oleh algoritma apa pun, tidak peduli seberapa kuat komputernya. Masalah ini disebut _unsolvable_ atau _undecidable_. Contoh paling terkenal adalah **Halting Problem**: menentukan apakah sebuah program akan berhenti atau berjalan selamanya untuk input tertentu. Ini adalah batasan fundamental dari komputasi itu sendiri.
> 
> #### Eksplorasi Mandiri
> 
> - **Identifikasi Kebutuhan Memori:** Coba pikirkan tentang tugas-tugas berikut dan tentukan jenis automata (dan memorinya) yang mungkin diperlukan:
>     1. Memeriksa apakah sebuah alamat email mengandung simbol '@'. (Petunjuk: Hanya perlu memindai, tidak perlu menyimpan banyak hal).
>     2. Memeriksa apakah dalam sebuah teks, jumlah kurung buka `(` sama dengan jumlah kurung tutup `)`. (Petunjuk: Apa yang terjadi jika ada struktur seperti `((()))`?).
>     3. Menjalankan program kalkulator yang bisa melakukan operasi kompleks. (Petunjuk: Perlu menyimpan variabel dan menjalankan instruksi).