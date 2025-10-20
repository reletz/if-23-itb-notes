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
> > - Bagaimana membuktikan closure untuk Irisan (Intersection)?
> >     
> > - Apa itu Product Automaton?
> >     
> > - Bagaimana membuktikan closure untuk Pembalikan (Reversal)?
> >     
> > - Apa itu Homomorfisma?
> >     
> > - Bagaimana membuktikan closure untuk Homomorfisma?
> >     
> > - Apa itu Inverse Homomorphism?
> >     
> > 
> > ## Reference Points
> > 
> > - 2021_Bab-4-Sifat-Sifat-Bahasa-Regular.pdf: 60-78
> >     
> > - 2023_Properties of Regular Languages.pdf: 13-21
> >     
> 
> > ### Closure di Bawah Operasi Irisan (L∩M)
> > 
> > **Irisan (Intersection)** dari dua bahasa L dan M adalah himpunan string yang ada di **kedua** bahasa tersebut.
> > 
> > - **Strategi Bukti:** Bukti ini paling mudah dilakukan dengan membangun sebuah DFA baru yang disebut **Product Automaton**. Idenya adalah mensimulasikan kedua DFA (satu untuk L, satu untuk M) secara bersamaan (paralel).
> >     
> > 
> > **Metode Konstruksi (Product Automaton):**
> > 
> > 1. Ambil DFA $AL​=(QL​,Σ,δ_L​,q_L​,FL​)$ untuk bahasa L dan DFA $AM​=(QM​,Σ,δ_M​,q_M​,FM​)$ untuk bahasa M.
> >     
> > 2. Kita bangun DFA baru, $A_{product}​=(Q,Σ,δ,q_0​,F)$.
> >     
> >     - **State (Q):** Himpunan state baru adalah **produk Kartesian** dari state-state lama: $Q=Q_L​×Q_M​$. Setiap state baru adalah pasangan (p,r) di mana $p∈QL$​ dan $r∈QM​$.
> >         
> >     - **Start State ($q_0$​):** Pasangan dari kedua start state lama: $q_0​=(q_L​,q_M​)$.
> >         
> >     - **Fungsi Transisi (δ):** Untuk setiap state pasangan (p,r) dan input a, transisi barunya adalah pasangan dari hasil transisi masing-masing DFA: $δ((p,r),a)=(δ_L​(p,a),δ_M​(r,a))$.
> >         
> >     - **Final State (F):** Sebuah state pasangan (p,r) adalah final state jika **kedua** komponennya adalah final state di DFA masing-masing: $F=F_L​×F_M$​.
> >         
> > 
> > Karena kita berhasil membangun sebuah DFA untuk $L∩M$, maka $L∩M$ terbukti regular.
> > 
> > ### Closure di Bawah Operasi Pembalikan ($L^R$)
> > 
> > **Pembalikan (Reversal)** dari sebuah string w adalah string yang sama namun dibaca dari belakang, ditulis $w^R$. Bahasa $L^R$ adalah himpunan semua string yang pembalikannya ada di L.
> > 
> > - **Strategi Bukti:** Ambil sebuah DFA (atau NFA) untuk $L$, lalu modifikasi untuk menerima $L^R$.
> > 
> > **Metode Konstruksi:**
> > 
> > 1. Ambil sebuah FA untuk $L$.
> >     
> > 2. **Balikkan semua panah transisi.**
> >     
> > 3. **Tukar Peran State:** Jadikan _start state_ yang lama sebagai satu-satunya _final state_ yang baru.
> >     
> > 4. **Buat Start State Baru:** Jadikan _semua final state_ yang lama sebagai _start state_. Cara terbaik untuk melakukan ini adalah dengan membuat satu _start state_ baru lalu membuat ϵ-transition darinya ke semua final state yang lama.
> >     
> > 
> > Hasil dari konstruksi ini adalah sebuah **ϵ-NFA**. Karena setiap ϵ-NFA ekuivalen dengan sebuah DFA, maka terbukti bahwa LR adalah regular.
> > 
> > ### Closure di Bawah Homomorfisma
> > 
> > **Homomorfisma** adalah sebuah fungsi substitusi, h, yang mengganti setiap simbol dalam sebuah alfabet dengan sebuah string. Contoh: jika $h(0)=ab$ dan $h(1)=ϵ$, maka $h(010)=abϵab=abab$.
> > 
> > - **Strategi Bukti:** Paling mudah dibuktikan menggunakan Ekspresi Reguler.
> >     
> > 
> > **Metode Konstruksi:**
> > 
> > 1. Ambil bahasa regular $L$. Pasti ada sebuah RE, $R$ , yang mendefinisikan $L$.
> >     
> > 2. Untuk mendapatkan RE baru untuk bahasa $h(L)$, kita cukup **terapkan fungsi homomorfisma h pada setiap simbol** di dalam RE $R$.
> >     
> > 
> > Hasilnya adalah sebuah RE yang valid, sehingga $h(L)$ terbukti regular.
> > 
> > ### Closure di Bawah Inverse Homomorphism
> > 
> > **Inverse Homomorphism** dari sebuah bahasa L, ditulis $h^{−1}(L)$, adalah himpunan semua string $w$ sedemikian sehingga hasil homomorfismanya, $h(w)$, ada di dalam $L$.
> > 
> > - **Strategi Bukti:** Ambil sebuah DFA untuk L, lalu modifikasi untuk menerima $h^{−1}(L)$.
> >     
> > 
> > **Metode Konstruksi:**
> > 
> > 1. Ambil DFA $A$ untuk bahasa $L$.
> >     
> > 2. Bangun DFA baru B yang komponennya sama dengan A, kecuali fungsi transisinya.
> >     
> > 3. **Fungsi Transisi Baru ($δ_B$​):** Untuk menghitung $δ_B​(q,a)$, kita lihat apa yang terjadi pada DFA $A$ jika ia memproses string $h(a)$.
> >  $$δ_B​(q,a)=\hat{δ}_A(q,h(a))$$
> >         
> > 
> > Karena kita berhasil membangun DFA untuk $h^{−1}(L)$, maka $h^{−1}(L)$ terbukti regular.

> [!cornell] #### Summary
>  Kelas Bahasa Regular juga tertutup di bawah operasi yang lebih kompleks. Penutupan untuk **Irisan (Intersection)** dibuktikan dengan membangun _{product} Automaton_ yang mensimulasikan dua DFA secara paralel. Penutupan untuk **Pembalikan (Reversal)** dibuktikan dengan membalik semua transisi pada sebuah FA. Terakhir, penutupan untuk **Homomorfisma** (substitusi simbol) dan **Inverse Homomorphism** dibuktikan dengan memodifikasi Ekspresi Reguler atau DFA dari bahasa aslinya.
 
> [!ad-libitum]- Additional Information (Optional)
> 
> #### Bukti Alternatif untuk Irisan
> 
> Selain dengan _{product} automaton_, irisan juga bisa dibuktikan menggunakan hukum De Morgan dan sifat penutupan lain yang sudah kita ketahui:
> 
> $$L∩M=\overline{\overline{L}∪\overline{M}}$$ 
> - Jika L dan M regular, maka $\overline{L}$ dan $\overline{M}$ juga regular (karena closure di bawah komplemen).
>     
> - Maka, $\overline{L}∪\overline{M}$ juga regular (karena closure di bawah union).
>     
> - Maka, komplemen dari hasil tersebut, $\overline{\overline{L}∪\overline{M}}$, juga regular.
>     
> Bukti ini menunjukkan bagaimana sifat-sifat penutupan bisa saling membangun satu sama lain.
> 
> #### Eksplorasi Mandiri
>  - **Product Automaton:** Coba bayangkan dua DFA sederhana: $A_1$​ yang menerima string dengan jumlah 'a' ganjil, dan $A_2$​ yang menerima string dengan jumlah 'b' ganjil. Coba buat _{product} automaton_ untuk menerima bahasa $L(A_1​)∩L(A_2​$), yaitu "string dengan jumlah 'a' ganjil DAN jumlah 'b' ganjil". Berapa state yang akan dimiliki oleh automaton baru ini? Apa yang menjadi final state-nya?