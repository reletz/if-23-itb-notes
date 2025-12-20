---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Properti CFL (Bagian 2: Chomsky Normal Form - CNF)
> 
> > ## Questions/Cues
> >
> > - Definisi CNF
> >     
> > - Kegunaan CNF
> >     
> > - Prasyarat Konversi
> >     
> > - Penanganan Terminal
> >     
> > - Pemecahan Variabel
> >     
> > - Kompleksitas Derivasi
> >     
> >
> > ## Reference Points
> >
> > - Slide 13_2025: Hal 5, 22, 23
> >     
> 
> > ### 1. Definisi Chomsky Normal Form (CNF)
> >
> > Sebuah Tata Bahasa Bebas Konteks (CFG) dikatakan berada dalam Bentuk Normal Chomsky (CNF) jika setiap aturan produksinya hanya memiliki salah satu dari dua format berikut:
> >
> > 1. $A \rightarrow BC$: Sebuah variabel menurunkan tepat dua variabel.
> >     
> > 2. $A \rightarrow a$: Sebuah variabel menurunkan tepat satu terminal.
> >     
> >     Di mana $A, B, C \in V$ (himpunan variabel) dan $a \in T$ (himpunan terminal). Tidak diperbolehkan adanya simbol $\epsilon$ (string kosong) dalam CNF, kecuali jika bahasa tersebut memang mendukung $\epsilon$ pada simbol start.
> >     
> >
> > ### 2. Kegunaan dan Signifikansi
> >
> > CNF digunakan sebagai standar standarisasi untuk:
> >
> > - **Algoritma Parsing**: Menjadi dasar bagi algoritma efisien seperti algoritma CYK (_Cocke-Younger-Kasami_) yang memiliki kompleksitas waktu $O(n^3)$.
> >     
> > - **Pembuktian Teoretis**: Mempermudah pembuktian properti bahasa bebas konteks karena struktur pohon penurunannya selalu berupa pohon biner.
> >     
> > - **Analisis Panjang Derivasi**: Jika string memiliki panjang $n$, maka dalam CNF, string tersebut akan diturunkan dalam tepat $2n-1$ langkah.
> >     
> >
> > ### 3. Prosedur Konversi Lengkap
> >
> > Untuk mengubah CFG sembarang menjadi CNF, urutan langkah berikut harus dipatuhi secara ketat:
> >
> > **Langkah 1:** Penyederhanaan (Prasyarat)
> > 
> > Hilangkan produksi-$\epsilon$, hilangkan produksi unit, dan hilangkan simbol-simbol useless (generating lalu reachable). Langkah ini memastikan tata bahasa bersih dari redundansi.
> >
> > **Langkah 2:** Penanganan Simbol Terminal
> > 
> > Pada setiap produksi yang memiliki panjang sisi kanan $\ge 2$, ganti setiap terminal $a$ dengan variabel baru $U_a$, kemudian tambahkan produksi baru $U_a \rightarrow a$.
> > 
> > Contoh: $A \rightarrow bCD$ menjadi $A \rightarrow U_b CD$ dan $U_b \rightarrow b$.
> >
> > **Langkah 3:** Pemecahan Produksi Variabel Panjang
> > 
> > Jika terdapat produksi dengan jumlah variabel di sisi kanan $> 2$, pecah menjadi rangkaian produksi biner menggunakan variabel baru.
> > 
> > Contoh: $A \rightarrow BCD$ menjadi:
> >
> > 1. $A \rightarrow B D_1$  
> >     
> > 2. $D_1 \rightarrow CD$
> >     
> >     Di mana $D_1$ adalah variabel baru yang membantu membatasi jumlah variabel di sisi kanan menjadi tepat dua.
> >     

> [!cornell] #### Summary
> 
> **Chomsky Normal Form (CNF)** mensyaratkan setiap produksi hanya berbentuk **dua variabel (**$A \rightarrow BC$**)** atau **satu terminal (**$A \rightarrow a$**)**. Proses konversi melibatkan penyederhanaan tata bahasa terlebih dahulu, diikuti dengan penggantian terminal dalam produksi panjang menggunakan variabel pembantu, dan pemecahan produksi yang memiliki lebih dari dua variabel menjadi struktur biner. CNF krusial untuk efisiensi algoritma parsing dan standarisasi teori bahasa.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Contoh Konversi (Slide 23)
> 
> **Original:** $S \rightarrow ASA | aB$, $A \rightarrow B | S$, $B \rightarrow b | \epsilon$.
> 
> 1. **Eliminasi** $\epsilon$**:** $B$ nullable, maka $S \rightarrow ASA | aB | a | AS | SA$, $A \rightarrow B | S$, $B \rightarrow b$.
>     
> 2. **Eliminasi Unit:** Menghasilkan aturan baru di mana $A$ bisa menurunkan apa yang diturunkan $B$ dan $S$ secara langsung.
>     
> 3. **Konversi ke CNF:**
>     
>     - Produksi $S \rightarrow ASA$ dipecah menjadi $S \rightarrow A D_1$ dan $D_1 \rightarrow SA$.
>         
>     - Produksi $S \rightarrow aB$ diubah menjadi $S \rightarrow U_a B$ dan $U_a \rightarrow a$.
>         
> 
> #### Struktur Pohon Penurunan
> 
> Karena setiap produksi variabel dalam CNF selalu menghasilkan dua variabel baru, maka setiap pohon penurunan (parse tree) untuk string terminal dalam CNF akan selalu berbentuk **pohon biner murni**. Hal ini memungkinkan manipulasi data struktur yang lebih terprediksi dalam ilmu komputer.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 13_2025 IF 2124 ITB (Hal 5, 22-23).
>     
> - Algoritma CYK untuk Parsing CNF.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Sebutkan dua format produksi yang legal dalam CNF!</strong></summary>
> 
> 1. Variabel ke dua variabel ($A \rightarrow BC$). 2) Variabel ke satu terminal ($A \rightarrow a$).
>     
>     </details>
>     
>
> <details>
> 
> <summary><strong>2. Berapa jumlah variabel di sisi kanan produksi jika terminal juga muncul di sana pada CNF?</strong></summary>
> 
> Nol. Sesuai aturan, terminal hanya boleh muncul sendirian di sisi kanan produksi ($A \rightarrow a$). Jika ada terminal dalam produksi yang panjang, terminal tersebut harus diganti variabel.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Mengapa urutan penyederhanaan harus dilakukan sebelum konversi ke CNF?</strong></summary>
> 
> Karena keberadaan produksi-$\epsilon$, unit, dan simbol useless akan merusak struktur biner yang menjadi tujuan utama dari bentuk normal ini.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Bagaimana cara memecah produksi $A \rightarrow B_1 B_2 B_3 B_4$ menjadi bentuk CNF?</strong></summary>
> 
> $A \rightarrow B_1 C_1$, $C_1 \rightarrow B_2 C_2$, $C_2 \rightarrow B_3 B_4$. (Di mana $C_1, C_2$ adalah variabel baru).
> 
> </details>