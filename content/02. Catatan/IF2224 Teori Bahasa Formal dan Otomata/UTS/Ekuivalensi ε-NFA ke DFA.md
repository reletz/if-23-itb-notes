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
> > - Apakah ε-NFA ekuivalen dengan DFA?
> > - Bagaimana cara mengubah ε-NFA ke DFA?
> > - Bagaimana menentukan start state DFA baru?
> > - Bagaimana menentukan fungsi transisi (delta_D) baru?
> > - Apa peran ECLOSE dalam konversi ini?
> >
> > ## Reference Points
> >
> > - 2022_E-NFA.pdf: 8-11
> > - 2021_Bab-2-FSA.pdf: 91-97
> 
> > ### Prinsip Ekuivalensi
> >
> > Sama seperti NFA, **setiap ε-NFA juga terbukti ekuivalen dengan sebuah DFA**. Ini berarti untuk setiap ε-NFA E, pasti ada sebuah DFA D yang menerima bahasa yang sama persis (L(E)=L(D)).
> >
> > Ini melengkapi "rantai ekuivalensi": DFA, NFA, dan ε-NFA semuanya memiliki kekuatan komputasi yang sama dan hanya bisa mengenali kelas bahasa yang sama, yaitu **Bahasa Regular**.
> >
> > Proses konversinya menggunakan algoritma yang merupakan modifikasi dari _Subset Construction_, dengan mengintegrasikan operasi **ECLOSE** secara ekstensif.
> >
> > ### Algoritma Konversi ε-NFA ke DFA
> >
> > Diberikan sebuah ε-NFA E=(Q_E,Sigma,delta_E,q_E0,F_E), kita akan membangun sebuah DFA D=(Q_D,Sigma,delta_D,q_D0,F_D) dengan aturan yang telah dimodifikasi:
> >
> > 1. **Himpunan State DFA (Q_D)**
> > 
> > > Sama seperti sebelumnya, setiap state di DFA baru adalah sebuah himpunan (subset) dari state-state di ε-NFA lama.
> >
> > 2. **Start State DFA (q_D0)**
> > 	- Ini adalah modifikasi pertama yang penting. Start state DFA baru **bukan** hanya ${q\_{E0}}$, melainkan **ECLOSE dari start state ε-NFA**.
> > 	- $q_{D_0} = \text{ECLOSE}(q_{E_0})$
> > 	- **Alasan:** Kita harus langsung memperhitungkan semua state yang bisa dicapai secara "gratis" dari titik awal sebelum membaca input apa pun.
> >
> > 3. **Himpunan Final State DFA (F_D)**
> > 	- Aturannya tetap sama. Sebuah state $S$ di DFA baru adalah final state jika himpunan $S$ tersebut mengandung **setidaknya satu** final state dari ε-NFA asli.
> > 	- $F_D = {S \mid S \in Q_D \text{ dan } S \cap F_E \neq \emptyset}$.
> >
> > 4. **Fungsi Transisi DFA (delta_D)**
> > 	- Ini adalah modifikasi kedua yang paling krusial. Untuk menghitung $\\delta\_D(S, a)$, di mana $S$ adalah state DFA saat ini dan $a$ adalah simbol input, kita melalui dua langkah:
> > 		1.  **Hitung Tujuan Transisi:** Pertama, cari tahu semua state yang bisa dicapai dari *setiap* state di dalam $S$ dengan membaca input $a$. Kita sebut himpunan perantara ini `move(S, a)`.
> > 		> $\text{move}(S, a) = \bigcup_{p \in S} \delta_E(p, a)$
> > 		2.  **Ambil E-Closure dari Hasil:** State tujuan DFA yang sebenarnya adalah **ECLOSE** dari himpunan perantara yang baru saja kita dapatkan.
> > 		> $\delta_D(S, a) = \text{ECLOSE}(\text{move}(S, a))$ 
> > 	  - **Intuisi:** Setelah berpindah state dengan membaca input `a`, mesin juga bisa langsung melakukan "lompatan-lompatan gratis" lagi dari state-state tujuannya. Langkah kedua ini memperhitungkan semua lompatan gratis tersebut.
> >
> > Proses ini juga paling baik dilakukan dengan metode **Lazy Construction** untuk hanya membangun state-state yang bisa dijangkau.

> [!cornell] #### Summary
>  Konversi dari **ε-NFA ke DFA** yang ekuivalen dilakukan dengan **algoritma Subset Construction yang dimodifikasi** untuk menangani transisi epsilon. Peran krusial dari operasi **ECLOSE** terlihat pada dua langkah utama: pertama, **start state** dari DFA baru didefinisikan sebagai ECLOSE dari start state ε-NFA; kedua, setiap **fungsi transisi** di DFA baru dihitung dengan terlebih dahulu menemukan semua state tujuan dari transisi input, lalu mengambil ECLOSE dari himpunan hasil tersebut.

> [!ad-libitum]- Additional Information (Optional)
>  #### Rantai Ekuivalensi yang Lengkap
>  Hasil ini melengkapi salah satu teorema paling elegan dalam teori automata:
>  - **DFA equiv NFA equiv ε-NFA**
>   Ketiga model mesin ini, meskipun memiliki aturan dan fleksibilitas desain yang berbeda, pada akhirnya **memiliki kekuatan komputasi yang sama**. Mereka semua secara kolektif mendefinisikan keluarga bahasa yang sama, yang kita kenal sebagai **Bahasa Regular**. Ini menunjukkan bahwa penambahan fitur seperti non-determinisme atau transisi epsilon tidak menambah "kekuatan" fundamental dari finite automata, melainkan hanya berfungsi sebagai alat bantu desain yang lebih nyaman.
> 
> #### Eksplorasi Mandiri
> 
> - **Pikirkan Alurnya:** Bayangkan sebuah ε-NFA yang menerima "a" atau "b".
>     - $q_0\xrightarrow{\epsilon}q_1\xrightarrow{a}q_2$ (final)
>     - $q_0\xrightarrow{\epsilon}q_3\xrightarrow{b}q_4$ (final)
> - Coba terapkan algoritma konversi di atas.
>     - Apa start state dari DFA barunya? (Petunjuk: hitung $\text{ECLOSE}(q_0)$).
>     - Dari start state baru tersebut, apa hasil transisi untuk input 'a'? (Petunjuk: hitung `move`-nya, lalu `ECLOSE`-nya).
>     - Anda akan melihat bagaimana DFA secara efektif mensimulasikan semua jalur ε-NFA.