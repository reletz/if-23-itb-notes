---

type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Kelas Bahasa dan Varian Mesin Turing (Bagian 3)
> 
> > ## Questions/Cues
> >
> > - Definisi Bahasa R.E.
> >     
> > - Decidable vs R.E.
> >     
> > - Hierarki Chomsky
> >     
> > - MT sebagai Enumerator
> >     
> > - Varian MT (Multi-tape)
> >     
> > - Ekuivalensi Varian
> >     
> > - Church-Turing Thesis
> >     
> >
> > ## Reference Points
> >
> > - Slide 14_2025: Hal 16 - 27
> >     
> 
> > ### 1. Bahasa Recursively Enumerable (R.E.)
> >
> > Sebuah bahasa disebut **Recursively Enumerable** jika terdapat Mesin Turing yang menerima (accept) semua string dalam bahasa tersebut.
> >
> > - Jika string berada dalam bahasa: MT akan masuk ke final state dan berhenti.
> >     
> > - Jika string TIDAK berada dalam bahasa: MT bisa berhenti (halt) di state bukan final atau terjebak dalam _infinite loop_.
> >     
> >
> > **Bahasa Recursive (Decidable):** Subkelas dari R.E. di mana MT dijamin akan selalu berhenti (_halts_) baik untuk input yang diterima maupun ditolak.
> >
> > ### 2. Hierarki Kelas Bahasa
> >
> > Urutan inklusi kelas bahasa (dari yang paling spesifik ke paling umum):
> > 
> > Regular $\subset$ CFL $\subset$ Context-Sensitive $\subset$ Decidable $\subset$ Recursively Enumerable.
> >
> > ### 3. Mesin Turing sebagai Enumerator
> >
> > Selain sebagai pengenal bahasa, MT dapat berfungsi sebagai **Enumerator**, yaitu mesin yang secara sistematis mencetak semua string yang termasuk dalam suatu bahasa ke atas tape.
> >
> > - **Teorema:** Sebuah bahasa adalah R.E. jika dan hanya jika terdapat Mesin Turing yang dapat mengenumerasi string-string dalam bahasa tersebut.
> >     
> >
> > ### 4. Varian-Varian Mesin Turing
> >
> > Meskipun memiliki mekanisme berbeda, varian berikut memiliki kekuatan komputasi yang **setara** dengan MT standar:
> >
> > - **Tape Tak Terbatas Dua Arah:** Head bisa bergerak ke kiri melewati posisi awal tanpa batas.
> >     
> > - **Multi-tape MT:** Memiliki $k$ buah tape dengan head independen. Transisi dilakukan berdasarkan kombinasi simbol di semua head.
> >     
> > - **Non-Deterministic MT (NMT):** Memiliki lebih dari satu pilihan transisi untuk setiap state dan simbol. NMT menerima input jika minimal ada satu jalur yang mencapai final state.
> >     
> > - **Multi-dimensional MT:** Tape berbentuk grid (misal 2D).
> >     
> >
> > ### 5. Teorema Ekuivalensi
> >
> > Semua variasi modifikasi pada MT (seperti menambah jumlah tape atau membuat mesin menjadi non-deterministik) tidak menambah kemampuan komputasi mesin. Artinya, bahasa apa pun yang diterima oleh MT variasi tersebut juga dapat diterima oleh MT standar (Single-tape, Deterministik).
> >
> > ### 6. Church-Turing Thesis
> >
> > Hipotesis ini menyatakan bahwa konsep intuitif mengenai "algoritma" atau "prosedur efektif" setara dengan kemampuan komputasi Mesin Turing. Jika suatu masalah tidak dapat diselesaikan oleh Mesin Turing, maka masalah tersebut tidak dapat diselesaikan oleh algoritma komputer apa pun.

> [!cornell] #### Summary
> 
> Bahasa yang dapat diterima oleh MT diklasifikasikan sebagai **Recursively Enumerable (R.E.)**. Dalam hierarki bahasa, R.E. merupakan kelas yang paling luas. Berbagai varian MT seperti **Multi-tape** atau **Non-deterministik** terbukti memiliki kekuatan yang **ekuivalen** dengan MT standar. Hal ini memperkuat **Church-Turing Thesis** yang menyatakan bahwa Mesin Turing adalah representasi formal yang lengkap untuk semua bentuk komputasi atau algoritma.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Simulasi Multi-tape ke Single-tape
> 
> Untuk mensimulasikan $k$ tape ke dalam 1 tape, kita menggunakan simbol penanda khusus (seperti titik di atas simbol) untuk melacak posisi head setiap tape virtual di dalam satu tape fisik yang panjang.
> 
> #### Simulasi NMT ke Deterministik
> 
> Mesin Turing deterministik mensimulasikan NMT dengan cara melakukan penelusuran secara _Breadth-First Search_ (BFS) pada pohon konfigurasi NMT. Ini menjamin bahwa jika ada satu jalur sukses, mesin deterministik akan menemukannya, meskipun membutuhkan waktu yang jauh lebih lama.
> 
> #### Church-Turing Thesis (Filosofi)
> 
> Tesis ini bukan merupakan teorema matematis yang bisa dibuktikan secara kaku karena "konsep intuitif algoritma" bukan istilah formal. Namun, hingga saat ini belum ditemukan model komputasi fisik yang melampaui kemampuan Mesin Turing.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 14_2025 IF 2124 ITB (Hal 16-27).
>     
> - Sipser, M. _Introduction to the Theory of Computation_ (Bab 3: The Church-Turing Thesis).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara bahasa Recursive dan bahasa Recursively Enumerable?</strong></summary>
> 
> Pada bahasa Recursive (Decidable), mesin dijamin selalu berhenti untuk semua input. Pada R.E., mesin hanya dijamin berhenti jika input diterima; jika input ditolak, mesin bisa loop selamanya.
>
> </details>
>
>
> <details>
>
> <summary><strong>2. Apakah menambah jumlah tape pada Mesin Turing akan membuatnya bisa menyelesaikan masalah yang tidak bisa diselesaikan Single-tape?</strong></summary>
>
> Tidak. Multi-tape MT hanya meningkatkan efisiensi waktu (kecepatan), tetapi kekuatan komputasinya (apa yang bisa diselesaikan) tetap sama dengan Single-tape MT.
>
> </details>
>
> <details>
> <summary><strong>3. Apa yang dimaksud dengan "Canonical Order" dalam konteks Enumerator?</strong></summary>
> Urutan pengenalan string berdasarkan panjangnya terlebih dahulu, kemudian berdasarkan urutan leksikografis untuk string dengan panjang yang sama (misal: $\epsilon, 0, 1, 00, 01, \dots$).
> </details>
>
> <details>
> <summary><strong>4. Mengapa Non-deterministic MT (NMT) ekuivalen dengan MT Deterministik?</strong></summary>
> Karena kita dapat membangun mesin deterministik yang mensimulasikan semua kemungkinan jalur NMT secara sistematis menggunakan struktur data antrean atau BFS.
> </details>