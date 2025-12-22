---
type: Note
tags:
  - CFG
  - Decidability
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Decision Properties & CYK Algorithm
> 
> > ## Questions/Cues
> >
> > - **Decidable vs Undecidable**
> >     
> > - **Masalah Emptiness**
> >     
> > - **Masalah Membership**
> >     
> > - **Masalah Equivalence**
> >     
> > - **Apa itu CYK?**
> >     
> > - **Kompleksitas CYK**
> >     
> > - **Syarat Utama CYK**
> >     
> > - **Struktur Tabel CYK**
> >     
> > - **Langkah Basis**
> >     
> > - **Langkah Induksi**
> >     
> > - **Syarat Diterima**
> >     
> >
> > ## Reference Points
> >
> > - **Slide-15_2025_CNF.pdf** (Hal 28-42) - _Penjelasan CYK Visual_
> >     
> > - **Bab 7 Sifat2 CFG.pdf** (Hal 40-58) - _Contoh Detail_
> >     
> > - **Slide-13_2025_Properti CFL.pdf** (Hal 25)
> >     
> 
> > ### 1. Decision Properties (Apa yang Bisa Dijawab?)
> >
> > Dalam teori komputasi, kita membedakan masalah menjadi dua kelas:
> >
> > #### A. Decidable (Bisa Dipecahkan)
> >
> > Ada algoritma pasti yang berhenti dalam waktu berhingga untuk menjawab "Ya/Tidak".
> >
> > 1. **Emptiness (**$L(G) = \emptyset$**?):** Apakah grammar ini "mandul" atau bisa menghasilkan setidaknya satu string?
> >     
> > 	- _Algoritma:_ Gunakan algoritma pencarian **Generating Symbols**. Jika Start Symbol $S$ tidak masuk himpunan generating, maka bahasanya kosong.
> > 			
> > 	- _Kompleksitas:_ $O(n)$ (sangat cepat).
> >         
> > 2. **Membership (**$w \in L(G)$**?):** Apakah string $w$ valid menurut tata bahasa $G$?
> >     
> > 	- _Algoritma:_ **CYK Algorithm** (Cocke-Younger-Kasami).
> > 			
> > 	- _Kompleksitas:_ $O(n^3 \cdot |G|)$ (Polynomial).
> >         
> > 3. **Finiteness:** Apakah bahasa ini berhingga atau tak hingga?
> >     
> > 	- _Algoritma:_ Cek graf ketergantungan variabel. Jika ada _cycle_ (perulangan) yang melibatkan simbol generating & reachable, maka bahasanya tak hingga.
> > 			
> >
> > #### B. Undecidable (Mustahil Dipecahkan)
> >
> > Tidak ada (dan tidak akan pernah ada) algoritma umum yang bisa menjawab ini untuk SEMBARANG CFL.
> >
> > 1. **Equivalence (**$L(G_1) = L(G_2)$**?):** Apakah dua grammar berbeda menghasilkan bahasa yang persis sama? (Ini _decidable_ untuk Regular Language, tapi _undecidable_ untuk CFL).
> >     
> > 2. **Subset (**$L(G_1) \subseteq L(G_2)$**?):** Apakah bahasa satu merupakan himpunan bagian dari bahasa lain?
> >     
> > 3. **Disjointness:** Apakah irisan dua bahasa kosong?
> >     
> > 4. **Universality:** Apakah grammar menghasilkan semua string yang mungkin ($L(G) = \Sigma^*$)?
> >     
> >
> > ### 2. Algoritma CYK (Cocke-Younger-Kasami)
> >
> > Ini adalah algoritma _parsing_ standar emas untuk CFG. Algoritma ini menggunakan pendekatan **Dynamic Programming** (memecah masalah besar menjadi sub-masalah kecil yang disimpan di tabel).
> >
> > **Prasyarat Mutlak:** Grammar **HARUS** sudah dalam bentuk **Chomsky Normal Form (CNF)** ($A \to BC$ atau $A \to a$).
> >
> > #### Struktur Tabel
> >
> > Tabel berbentuk segitiga (atau matriks persegi yang diisi separuh atas).
> >
> > - Input: String $w = a_1 a_2 ... a_n$.
> >     
> > - Sel $X_{ij}$: Berisi himpunan variabel yang bisa menurunkan substring dari indeks $i$ sampai $j$ ($a_i ... a_j$).
> >     
> > - Target: Cek apakah Start Symbol $S$ ada di sel puncak $X_{1n}$ (seluruh string).
> >     
> >
> > #### Langkah Pengerjaan
> >
> > **Langkah 1: Basis (Baris Terbawah/Diagonal Utama)**
> > 
> > Isi sel $X_{ii}$ (substring panjang 1).
> >
> > - Untuk setiap huruf input $a_i$, cari aturan produksi $A \to a_i$.
> >     
> > - Masukkan $A$ ke dalam sel $X_{ii}$.
> >     
> >
> > **Langkah 2: Induksi (Naik ke Atas)**
> > 
> > Isi sel $X_{ij}$ untuk substring panjang $\ge 2$.
> >
> > - Substring $w_{i...j}$ dipecah menjadi dua bagian di titik $k$ (split point).
> >     
> > - Bagian kiri: $w_{i...k}$ (diwakili sel $X_{ik}$).
> >     
> > - Bagian kanan: $w_{k+1...j}$ (diwakili sel $X_{k+1,j}$).
> >     
> > - Cari aturan produksi $A \to BC$ dimana $B \in X_{ik}$ dan $C \in X_{k+1,j}$.
> >     
> > - Lakukan untuk semua kemungkinan titik potong $k$ (dari $i$ sampai $j-1$).
> >     
> >
> > ### 3. Studi Kasus: Simulasi CYK
> >
> > Grammar (CNF):
> > 
> > $S \to AB \mid BC$
> > 
> > $A \to BA \mid a$
> > 
> > $B \to CC \mid b$
> > 
> > $C \to AB \mid a$
> >
> > **Input:** $w = \text{baaba}$ ($n=5$).
> >
> > **Tahap 1: Basis (Panjang 1)**
> >
> > - $w[1]=b$: $B \to b$. Isi $X_{11}=\{B\}$.
> >     
> > - $w[2]=a$: $A \to a, C \to a$. Isi $X_{22}=\{A, C\}$.
> >     
> > - $w[3]=a$: $A \to a, C \to a$. Isi $X_{33}=\{A, C\}$.
> >     
> > - $w[4]=b$: $B \to b$. Isi $X_{44}=\{B\}$.
> >     
> > - $w[5]=a$: $A \to a, C \to a$. Isi $X_{55}=\{A, C\}$.
> >     
> >
> > **Tahap 2: Panjang 2 (Contoh** $X_{12}$ **substring "ba")**
> >
> > - Split hanya bisa di tengah: $b \mid a$.
> >     
> > - Cari kombinasi $X_{11} \times X_{22} = \{B\} \times \{A, C\}$.
> >     
> > - Pasangan: $(B, A)$ dan $(B, C)$.
> >     
> > - Cek Grammar:
> >     
> > 	- $A \to BA$? Ada! (Simpan A).
> > 			
> > 	- Ada aturan $\to BC$? Ada $S \to BC$! (Simpan S).
> >         
> > - Hasil $X_{12} = \{A, S\}$.
> >     
> >
> > **Tahap 3: Panjang 3 (Contoh** $X_{24}$ **substring "aab")**
> >
> > - Split 1: $a \mid ab$ ($X_{22} \times X_{34}$).
> >     
> > - Split 2: $aa \mid b$ ($X_{23} \times X_{44}$).
> >     
> > - Gabungkan semua hasil temuan variabel.
> >     
> >
> > **Tahap Akhir:**
> > 
> > Cek sel $X_{15}$ (seluruh string "baaba").
> > 
> > Jika himpunan di $X_{15}$ memuat $S$, maka string DITERIMA.

> [!cornell] #### Summary
> 
> **Decision Properties** memetakan batas kemampuan komputasi pada CFL. Masalah dasar seperti **Emptiness** ($O(n)$) dan **Membership** ($O(n^3)$) bersifat _decidable_, sedangkan masalah perbandingan antar bahasa seperti **Equivalence** dan **Subset** bersifat _undecidable_. Algoritma **CYK** adalah metode standar untuk uji _membership_ dengan pendekatan _dynamic programming_ pada grammar bentuk **CNF**. CYK bekerja secara _bottom-up_, mengisi tabel dari substring terpendek (panjang 1) hingga terpanjang, dengan kompleksitas waktu kubik yang efisien dibandingkan pencarian _brute-force_.

> [!ad-libitum]- Ad Libitum: Analisis Kompleksitas & Tips CYK
> 
> #### Mengapa $O(n^3)$?
> 
> Mari bedah loop algoritma CYK:
> 
> 1. Loop Panjang Substring ($len$): dari 2 sampai $n$. ($O(n)$)
>     
> 2. Loop Posisi Awal ($i$): dari 1 sampai $n-len+1$. ($O(n)$)
>     
> 3. Loop Titik Potong ($k$): dari $i$ sampai $j-1$. ($O(n)$)
>     
> 
> Total = $n \times n \times n = n^3$.
> 
> Ini jauh lebih baik dari parsing top-down naif yang bisa eksponensial ($O(2^n)$) karena backtracking.
> 
> #### Tips Mengerjakan Tabel CYK Manual
> 
> Saat ujian, jangan acak mengisi tabel.
> 
> 4. Buat pola segitiga terbalik atau tangga.
>     
> 5. Isi baris paling bawah dulu (Basis).
>     
> 6. Saat mengisi sel $X_{ij}$ (misal baris 2), letakkan jari kiri di baris bawah kolom $i$, dan jari kanan di diagonal kolom $j$.
>     
> 7. Gerakkan jari: jari kiri naik, jari kanan turun-kiri. Itu adalah pasangan sel yang harus dikalikan (Cartesian Product).
>     
> 
> #### Undecidability: Mengapa Equivalence Sulit?
> 
> Masalah ekuivalensi CFG ($L(G_1) = L(G_2)$) terbukti _undecidable_ karena bisa direduksi dari **Post Correspondence Problem (PCP)**. Sederhananya, struktur pohon parse CFG terlalu fleksibel dan kompleks sehingga tidak ada cara sistematis untuk membandingkan dua himpunan string tak hingga yang dihasilkan oleh dua grammar berbeda.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa syarat wajib grammar sebelum bisa diproses dengan algoritma CYK?</strong></summary>
> 
> Grammar harus dikonversi terlebih dahulu ke bentuk <strong>Chomsky Normal Form (CNF)</strong>.
> 
> </details>
> <details>
> 
> <summary><strong>2. Berapa kompleksitas waktu algoritma CYK untuk string dengan panjang $n$?</strong></summary>
> 
> $O(n^3)$ atau kubik.
> 
> </details>
> <details>
> 
> <summary><strong>3. Sebutkan dua masalah keputusan (decision problem) yang Undecidable untuk CFL!</strong></summary>
> 
> Equivalence ($L(G_1) = L(G_2)$), Subset ($L(G_1) \subseteq L(G_2)$), Disjointness, Universality.
> 
> </details>
> <details>
> 
> <summary><strong>4. Dalam tabel CYK, sel $X_{ij}$ menyimpan informasi apa?</strong></summary>
> 
> Himpunan variabel (non-terminal) yang dapat menurunkan substring input dari indeks $i$ sampai $j$.
> 
> </details>
> <details>
> 
> <summary><strong>5. Bagaimana cara mengecek Emptiness ($L(G) = \emptyset$) pada CFG?</strong></summary>
> 
> Cek apakah Start Symbol ($S$) termasuk dalam himpunan "Generating Symbols" (simbol yang bisa mencapai terminal). Jika tidak, maka bahasanya kosong.
> 
> </details>