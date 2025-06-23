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
> > - Apa arti NFA ekuivalen dengan DFA?
> > - Apa ide utama Subset Construction?
> > - Bagaimana menentukan state di DFA baru (Q_D)?
> > - Bagaimana menentukan start state baru?
> > - Bagaimana menentukan final state baru (F_D)?
> > - Bagaimana menghitung fungsi transisi baru (delta_D)?
> > - Apa itu "Lazy Construction"?
> >
> > ## Reference Points
> >
> > - 2022_DFA and NFA.pdf: 12-16
> > - 2021_Bab-2-FSA.pdf: 72-79
> > - 2019_NFA.pptx
> 
> > ### Prinsip Ekuivalensi
> >
> > Sebuah fakta fundamental dalam teori automata adalah NFA dan DFA memiliki kekuatan komputasi yang **setara (ekuivalen)**. Ini berarti:
> >
> > > Untuk setiap NFA N, pasti ada sebuah DFA D yang menerima bahasa yang sama persis $(L(N)=L(D))$.
> >
> > Meskipun NFA terlihat lebih fleksibel, ia tidak bisa mengenali bahasa apa pun yang tidak bisa dikenali oleh DFA. NFA hanya merupakan sebuah kemudahan dalam desain. Metode untuk membuktikan ekuivalensi ini adalah dengan sebuah algoritma konstruksi yang disebut **Subset Construction**.
> >
> > ### Ide Utama Subset Construction
> >
> > Inti dari metode ini adalah mengatasi non-determinisme dengan melacak _semua kemungkinan state_ di mana sebuah NFA bisa berada pada satu waktu.
> >
> > > **Satu state di DFA baru = Sebuah himpunan (subset) dari state-state di NFA lama.**
> >
> > Jadi, jika NFA setelah membaca string "00" bisa berada di state $q_0,q_1$, maka kita akan membuat satu state di DFA yang kita beri nama $\{q_0, q_1\}$ untuk merepresentasikan kondisi tersebut.
> >
> > ### Algoritma Subset Construction
> >
> > Diberikan sebuah NFA N=(Q_N,Sigma,delta_N,q_N0,F_N), kita akan membangun sebuah DFA D=(Q_D,Sigma,delta_D,q_D0,F_D) sebagai berikut:
> >
> > 1. **Himpunan State DFA ($Q_D$)**
> > 	- $Q_D$ adalah himpunan kuasa (powerset) dari $Q_N$, yaitu himpunan dari semua kemungkinan subset dari $Q_N$.
> > 	- Jika NFA memiliki $|Q_N| = n$ state, maka DFA bisa memiliki hingga $2^n$ state (meskipun dalam praktiknya seringkali jauh lebih sedikit).
> >
> > 1. **Start State DFA ($q_{D_0}$)**
> > 	- Start state dari DFA adalah sebuah himpunan yang hanya berisi start state dari NFA.
> > 	- $q_{D0} = \{q_{N_0}\}$.
> >
> > 3. **Himpunan Final State DFA (F_D)**
> > 	- Sebuah state di DFA (yang merupakan sebuah himpunan) dianggap sebagai final state jika ia mengandung **setidaknya satu** final state dari NFA.
> > 	> $F_D = {S \mid S \in Q_D \text{ dan } S \cap F_N \neq \emptyset}$.
> >
> > 4. **Fungsi Transisi DFA (delta_D)**
> > 	- Ini adalah langkah paling inti. Untuk menentukan transisi dari sebuah state DFA $S$ (yang merupakan himpunan state NFA) dengan input $a$, kita lakukan:
> > 	- Ambil **gabungan (union)** dari semua hasil transisi NFA ($\\delta\_N$) untuk setiap state $p$ yang ada di dalam himpunan $S$.
> > 	> $\delta_D(S, a) = \bigcup_{p \in S} \delta_N(p, a)$.
> >
> > ### Metode Praktis: Lazy Construction
> >
> > Menghitung semua 2n kemungkinan state di awal sangat tidak efisien. Pendekatan praktis yang digunakan adalah **Lazy Construction**:
> >
> > 1. **Mulai** dari start state DFA, yaitu $q_{N_0}$. Masukkan ke dalam daftar "yang akan diproses".
> > 2. **Ambil** satu state himpunan S dari daftar.
> > 3. **Hitung** transisinya untuk setiap simbol input a menggunakan rumus $\delta_D(S,a)$.
> > 4. **Hasilnya** adalah state himpunan baru, S′. Jika S′ belum pernah kita temui sebelumnya, tambahkan ke dalam daftar "yang akan diproses".
> > 5. **Ulangi** sampai tidak ada lagi state baru yang bisa ditambahkan ke dalam daftar.
> >
> > Dengan cara ini, kita hanya membuat state-state DFA yang benar-benar bisa dijangkau dari start state.

> [!cornell] #### Summary
>  **Subset Construction** adalah algoritma fundamental yang membuktikan bahwa NFA dan DFA ekuivalen dengan cara menyediakan metode untuk mengubah NFA apa pun menjadi DFA yang menerima bahasa yang sama. Ide utamanya adalah setiap **state pada DFA baru merepresentasikan sebuah himpunan (subset) dari state-state NFA**. Transisi pada DFA dihitung dengan menggabungkan semua kemungkinan transisi dari state-state NFA dalam himpunan tersebut, sehingga secara efektif menghilangkan non-determinisme.
 
> [!ad-libitum]- Additional Information (Optional)
> #### Trade-off: Ledakan Jumlah State (Exponential Blow-up)
>  Meskipun konversi dari NFA ke DFA selalu mungkin, ada harga yang harus dibayar. Dalam skenario terburuk, jumlah state pada DFA yang dihasilkan bisa menjadi **eksponensial** $(2^n)$ terhadap jumlah state NFA (n). Ini dikenal sebagai _state explosion_ atau _exponential blow-up_. Inilah trade-off utama dalam teori automata: NFA seringkali lebih mudah dan intuitif untuk didesain (dengan state yang sedikit), namun implementasi praktisnya (sebagai DFA) bisa menjadi sangat besar dan memakan banyak memori.
> 
> #### Eksplorasi Mandiri
>  - **Coba Konversi Manual:** Ambil NFA sederhana dari contoh Sub-bab 5 yang menerima string yang diakhiri `"01"`. NFA ini memiliki 3 state: q_0,q_1,q_2. Coba terapkan algoritma _Lazy Construction_.
>     - Mulai dengan state DFA q_0.
>     - Hitung transisinya untuk input '0' dan '1'. Anda akan mendapatkan state-state baru seperti q_0,q_1 dan q_0.
>     - Lanjutkan prosesnya sampai tidak ada state himpunan baru yang terbentuk.