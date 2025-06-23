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
> > - Apa itu DFA secara informal?
> > - Apa 5 komponen formal DFA?
> > - Apa itu Fungsi Transisi (δ)?
> > - Apa arti "Deterministik"?
> > - Bagaimana cara merepresentasikan DFA?
> > - Apa itu Fungsi Transisi Lanjutan (hatdelta)?
> > - Bagaimana DFA "menerima" string?
> > - Apa itu Bahasa DFA (L(A))?
> >
> > ## Reference Points
> >
> > - 2021_Bab-2-FSA.pdf: 25-38
> > - 2022_DFA and NFA.pdf: 2-5
> > - 2022_Finite Automata.pdf: 7
> 
> > ### Apa itu Deterministic Finite Automata (DFA)?
> >
> > **DFA** adalah sebuah model komputasi matematis yang abstrak. Anggap saja ini sebagai sebuah mesin sangat sederhana yang memiliki sejumlah **state (keadaan)** terbatas. Mesin ini membaca sebuah **string input** simbol per simbol dan berpindah dari satu state ke state lain berdasarkan aturan yang telah ditetapkan. Pada akhirnya, mesin ini akan memutuskan apakah string tersebut "diterima" atau "ditolak".
> >
> > ### Definisi Formal (5-Tuple)
> >
> > Sebuah DFA secara formal didefinisikan sebagai sebuah 5-serangkai atau _quintuple_: $A=(Q,\Sigma,\delta,q_0,F)$.
> >
> > 1. $Q$: Himpunan **state** yang terbatas (finite). Contoh: $q_0,q_1,q_2$.
> > 2. $\Sigma$: **Alphabet** input, yaitu himpunan simbol-simbol yang dikenali oleh mesin. Contoh: 0,1.
> > 3. $\delta$: **Fungsi Transisi**, yang merupakan "otak" dari DFA. Fungsi ini menentukan ke state mana mesin akan pergi selanjutnya.
> >     - **Format:** $\delta(q,a)=p$, di mana $q$ adalah state saat ini, $a$ adalah simbol input yang dibaca, dan $p$ adalah state berikutnya.
> >     - **Sifat Kunci "Deterministik":** Untuk setiap pasangan (state, input), hanya ada **tepat satu** state tujuan. Mesin tidak pernah bingung atau punya pilihan.
> > 1. $q_0$: **Start State** (state awal), di mana mesin selalu memulai. $q_0$ harus merupakan anggota dari Q.
> > 2. $F$: Himpunan **Final State** atau _Accepting State_ (state penerima). F adalah himpunan bagian dari Q ($F \subseteq Q$). Sebuah string dianggap "diterima" jika mesin berhenti di salah satu state ini.
> >
> > ### Cara Merepresentasikan DFA
> >
> > Ada dua cara umum untuk menggambarkan DFA:
> >
> > **1. Diagram Transisi (Graf)**
> >
> > - **State** direpresentasikan sebagai **lingkaran (node)**.
> > - **Transisi** direpresentasikan sebagai **panah (arc)** dari satu state ke state lain.
> > - **Simbol input** ditulis sebagai **label** pada panah.
> > - **Start State** ditandai dengan panah masuk yang tidak berasal dari state mana pun.
> > - **Final State** ditandai dengan **lingkaran ganda**.
> >
> > _Contoh DFA yang menerima string tanpa "11" berurutan:_
> > ![[Pasted image 20250623013211.png]]
> >
> > **2. Tabel Transisi**
> >Representasi dalam bentuk tabel yang lebih formal.
> > - **Baris** merepresentasikan state.
> > - **Kolom** merepresentasikan simbol input dari alphabet.
> > - **Isi sel** adalah state tujuan dari fungsi transisi delta.
> > - **Start state** ditandai dengan panah (`→`).
> > - **Final state** ditandai dengan bintang (`*`).
> >
> > _Tabel transisi untuk DFA di atas:_
> > 
> > |  | 0 | 1 |
> > |:---:|:---:|:---:|
> > | →*A | A | B |
> > | *B | A | C |
> > | C | C | C |
> >
> > ### Fungsi Transisi Lanjutan ($\hat{\delta}$)
> >
> > Fungsi transisi standar (delta) hanya bekerja untuk satu simbol. Untuk memproses seluruh **string**, kita menggunakan _extended transition function_ ($\hat\delta$).
> >
> > - **Intuisi:** $\hat\delta(q,w)$ adalah state di mana DFA akan berakhir jika dimulai dari state $q$ dan membaca seluruh string $w$.
> > - **Definisi Formal (Induktif):**
> >     - **Basis:** $\hat\delta(q,\epsilon)=q$ (Membaca string kosong tidak mengubah state).
> >     - **Induksi:** $\hat\delta(q,xa)=\delta(\hat\delta(q,x),a)$ (Untuk memproses string `xa`, proses dulu string `x` untuk sampai ke suatu state, lalu dari state tersebut lakukan satu transisi dengan simbol `a`).
> >
> > ### Bahasa dari Sebuah DFA ($L(A)$)
> >
> > **Bahasa dari DFA A**, yang ditulis $L(A)$, adalah himpunan semua string yang diterima oleh DFA tersebut.
> >
> > - **Definisi Formal:** Sebuah string w diterima jika proses pembacaan string tersebut, yang dimulai dari _start state_ $q_0$, berakhir di salah satu _final state_. $$L(A)=w\mid\hat\delta(q_0,w)\in F$$
> >
> > ![[Pasted image 20250623013757.png]]
> > **Contoh Proses:** Apakah string "101" diterima oleh DFA di atas?
> >
> > 1. Mulai di $q_0=A$.
> > 2. Baca '1': $\delta(A,1)=B$. State sekarang: B.
> > 3. Baca '0': $\delta(B,0)=A$. State sekarang: A.
> > 4. Baca '1': $\delta(A,1)=B$. State sekarang: B.
> > 5. String habis. State akhir adalah B.
> > 6. Apakah B anggota dari himpunan Final State $F=A,B$? Ya.
> > 7. **Kesimpulan:** String "101" **diterima** oleh DFA ini.

> [!cornell] #### Summary
> 
> Deterministic Finite Automata (DFA) adalah model komputasi formal yang didefinisikan oleh 5 komponen: himpunan state (Q), alphabet input (Sigma), fungsi transisi (delta), sebuah start state (q_0), dan himpunan final state (F). Sifatnya yang "deterministik" berarti setiap transisi bersifat pasti dan unik. DFA menerima sebuah string input jika, setelah memprosesnya dari awal hingga akhir, mesin berhenti di salah satu final state. Kumpulan dari semua string yang diterima inilah yang disebut Bahasa dari DFA tersebut.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Kunci dari "Deterministik"
> 
> Kata "deterministik" adalah properti paling penting di sini. Ini berarti DFA tidak pernah memiliki keraguan. Di state manapun, saat diberi satu simbol input, tujuannya sudah pasti hanya satu. Tidak ada pilihan, tidak ada tebakan. Hal ini membuat DFA sangat dapat diprediksi, mudah dianalisis, dan efisien untuk diimplementasikan dalam perangkat lunak, meskipun kemampuannya terbatas. Ini kontras dengan "Nondeterministic Finite Automata (NFA)" yang akan kita bahas nanti.
> 
> #### Eksplorasi Mandiri
> 
> - **Latihan Penelusuran (Tracing):** Ambil DFA dari contoh di atas. Coba telusuri (trace) string-string berikut secara manual, langkah demi langkah, seperti pada contoh proses:
>     - `"010"`
>     - `"1010"`
>     - `"1101"`
> - Tentukan state akhir untuk masing-masing string dan putuskan apakah string tersebut diterima atau ditolak. Ini akan membantu Anda membiasakan diri dengan alur kerja mekanis sebuah DFA.