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
> > - Apa itu transisi Epsilon (ε)?
> > - Apa perbedaan definisi formal ε-NFA?
> > - Apa itu Epsilon Closure (ECLOSE)?
> > - Bagaimana cara menghitung ECLOSE?
> > - Apa gunanya ECLOSE?
> > 
> > ## Reference Points
> > 
> > - 2022_E-NFA.pdf
> > - 2021_Bab-2-FSA.pdf: 82-90
> > - 2019_NFA.pptx: 16-20
> 
> > ### Pengenalan Transisi Epsilon (ε-Transition)
> > 
> > **Transisi Epsilon (ε)** adalah sebuah "gerakan bebas" di mana sebuah automaton dapat berpindah dari satu state ke state lain **tanpa membaca atau mengonsumsi simbol input apa pun**.
> > 
> > Anggap saja ini sebagai sebuah transisi spontan. Fitur ini tidak menambah kekuatan komputasi (masih hanya mengenali Bahasa Regular), tetapi merupakan sebuah **kemudahan desain** yang sangat besar, terutama saat ingin menggabungkan beberapa automaton.
> > 
> > ### Definisi Formal ε-NFA
> > 
> > Definisi formal dari ε-NFA sama seperti NFA, yaitu 5-tuple $A=(Q,Σ,δ,q_0​,F)$, dengan satu perbedaan kecil pada fungsi transisinya.
> > 
> > - **Fungsi Transisi ε-NFA (δ):**
> >     - Domain inputnya sekarang mencakup alphabet Σ DAN simbol epsilon ϵ.
> >     - **Notasi Formal:** $δ:Q×(Σ∪\{ϵ\})→P(Q)$.
> > 
> > Ini berarti kita bisa mendefinisikan transisi seperti $δ(q_0​,ϵ)=\{q_1​\}$, yang artinya dari $q_0$​ bisa langsung pindah ke $q_1​$ secara gratis.
> > 
> > ### Konsep Fundamental: Epsilon Closure (ECLOSE)
> > 
> > Untuk memahami ke mana saja sebuah ε-NFA bisa "melompat" secara spontan, kita menggunakan konsep **Epsilon Closure**.
> > 
> > > **ECLOSE(q)** adalah himpunan semua state (termasuk q itu sendiri) yang dapat dicapai dari state q dengan **hanya mengikuti jalur yang terdiri dari nol atau lebih transisi ϵ**.
> > 
> > **Cara Menghitung ECLOSE(q):**
> > 
> > Kita bisa menggunakan algoritma induktif:
> > 
> > 1. **Langkah Basis:** State q itu sendiri selalu ada di dalam `ECLOSE(q)`.
> > 2. **Langkah Induksi:** Jika sebuah state p ada di dalam `ECLOSE(q)`, dan ada transisi δ(p,ϵ)=r, maka state r juga harus dimasukkan ke dalam `ECLOSE(q)`. Ulangi langkah ini sampai tidak ada state baru yang bisa ditambahkan.
> > 
> > ECLOSE untuk Himpunan State:
> > 
> > Jika kita punya himpunan state S, maka ECLOSE(S) adalah gabungan dari ECLOSE untuk setiap state di dalam S.
> > 
> > - **Notasi Formal:** $ECLOSE(S)=\bigcup_{q∈S​}ECLOSE(q)$.
> > 
> > ### Fungsi Transisi Lanjutan ($\hat δ$) untuk ε-NFA
> > 
> > Fungsi transisi lanjutan untuk ε-NFA sedikit lebih kompleks karena kita harus memperhitungkan lompatan-lompatan epsilon.
> > 
> > - **Basis:** $\hat δ(q,ϵ)=ECLOSE(q)$. Membaca string kosong berarti kita berada di state awal ditambah semua state yang bisa dijangkau secara gratis.
> > - **Induksi:** Untuk menghitung $\hat δ(q,xa)$, prosesnya adalah:
> >     1. Cari tahu dulu semua state yang bisa dicapai setelah membaca string x: $S=\hat δ(q,x)$.
> >     2. Dari setiap state p di dalam himpunan S, cari tahu ke mana saja transisi dengan simbol a akan membawa kita. Gabungkan semua hasilnya. Sebut himpunan ini S′.
> >     3. Hasil akhirnya adalah $ECLOSE(S′)$. Kita mengambil E-closure dari hasil transisi "nyata" tersebut.
> > 
> > Konsep ECLOSE ini menjadi fondasi untuk mengubah ε-NFA menjadi DFA pada sub-bab selanjutnya.

> [!cornell] #### Summary
>  **ε-NFA** adalah sebuah NFA yang diperkaya dengan kemampuan **transisi epsilon (ϵ)**, yaitu perpindahan state yang terjadi secara spontan tanpa memerlukan simbol input. Untuk dapat menganalisis mesin ini, konsep fundamental bernama **Epsilon Closure (ECLOSE)** diperkenalkan. ECLOSE dari sebuah state adalah himpunan semua state lain yang dapat dijangkau hanya melalui jalur ε. Konsep ini krusial untuk memahami perilaku dan nantinya melakukan konversi ε-NFA ke automata lain yang ekuivalen.
 
> [!ad-libitum]- Additional Information (Optional)
> 
>  #### Kasus Penggunaan Utama: Menggabungkan Automata
>  Di mana ε-transition benar-benar bersinar? Saat kita ingin **menggabungkan beberapa automata**. Misalkan Anda memiliki DFA A1​ untuk bahasa L1​ dan DFA A2​ untuk bahasa L2​. Jika Anda ingin membuat mesin untuk bahasa L1​∪L2​ (union, atau "OR"), Anda bisa:
>  
> 1. Membuat satu _start state_ baru, sebut saja qbaru​.
> 2. Membuat ε-transition dari qbaru​ ke _start state_ dari A1​ dan ke _start state_ dari A2​.
>  
> Dengan sekejap, Anda telah membuat ε-NFA yang mengenali gabungan kedua bahasa tersebut. Ini adalah teknik yang sangat bersih dan modular. 
> #### Eksplorasi Mandiri
>  **Latihan ECLOSE:** Perhatikan contoh diagram ε-NFA yang ada di materi (`2021_Bab-2-FSA.pdf` halaman 89 atau `2019_NFA.pptx` slide 17). Coba hitung `ECLOSE` untuk setiap state satu per satu (A, B, C, D, E, F) secara manual di atas kertas. Memahami cara kerjanya secara langsung adalah cara terbaik untuk menginternalisasi konsep ini.