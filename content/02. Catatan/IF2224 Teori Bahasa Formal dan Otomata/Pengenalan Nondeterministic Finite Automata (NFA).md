---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> 
> > ## Questions/Cues
> > 
> > - Apa itu Nondeterminism?
> > - Apa beda utama NFA & DFA?
> > - Bagaimana fungsi transisi NFA (δ)?
> > - Bagaimana NFA memproses string?
> > - Kapan NFA menerima sebuah string?
> > - Apa itu Bahasa NFA (L(A))?
> > 
> > ## Reference Points
> > 
> > - 2022_DFA and NFA.pdf: 7-11
> > - 2019_NFA.pptx
> > - 2021_Bab-2-FSA.pdf: 64-68
> 
> > ### Konsep Kunci: Nondeterminism (Non-determinisme)
> > 
> > **Nondeterminism** adalah kemampuan sebuah mesin komputasi untuk memiliki **beberapa kemungkinan langkah berikutnya** pada satu titik waktu. Berbeda dengan DFA yang jalurnya sudah pasti, NFA bisa:
> > 
> > 1. **Memiliki beberapa pilihan transisi:** Dari satu state, dengan satu simbol input yang sama, NFA bisa berpindah ke beberapa state yang berbeda.
> > 2. **Tidak memiliki transisi sama sekali:** Untuk sebuah input, mungkin tidak ada panah keluar sama sekali dari state saat ini, yang menyebabkan jalur tersebut "mati" atau _stuck_.
> > 
> > Cara membayangkannya adalah seolah-olah NFA **mengeksplorasi semua kemungkinan jalur secara bersamaan (paralel)**. Setiap kali ada pilihan, ia "mencabang" menjadi beberapa salinan dirinya, masing-masing menelusuri satu jalur.
> > 
> > ### Definisi Formal NFA
> > 
> > Definisi formal NFA hampir sama persis dengan DFA, yaitu sebuah 5-tuple $A=(Q,Σ,δ,q_0​,F)$. Perbedaan fundamentalnya hanya terletak pada **fungsi transisi (δ)**.
> > 
> > - **Fungsi Transisi NFA (δ):**
> >     - **Format:** $δ(q,a)=\{p_1​,p_2​,...\}$
> >     - **Output:** Fungsi transisi NFA mengembalikan sebuah **HIMPUNAN state** (sebuah subset dari $Q$), bukan satu state tunggal seperti pada DFA. Himpunan ini bisa berisi nol, satu, atau lebih state.
> >     - **Notasi Formal:** $δ:Q×Σ→P(Q)$ (di mana P(Q) adalah _powerset_ atau himpunan kuasa dari Q).
> > 
> > ### Cara NFA Memproses dan Menerima String
> > 
> > Karena NFA bisa memiliki banyak jalur, cara ia menerima string pun berbeda.
> > 
> > **Kondisi Penerimaan:**
> > 
> > Sebuah string w diterima oleh NFA jika, setelah seluruh string dibaca, setidaknya salah satu dari semua kemungkinan jalur yang dieksplorasi berakhir di sebuah final state.
> > 
> > Tidak peduli jika 99 jalur lainnya "mati" atau berakhir di state non-final. Selama ada **minimal satu jalur yang sukses**, string tersebut diterima.
> > 
> > **Contoh Proses:** NFA untuk bahasa "semua string yang diakhiri `01`".
> > 
> > Misalkan kita punya NFA sederhana dengan state $\{q_0​,q_1​,q_2\}$ di mana $q_2​$ adalah final state.
> > 
> > - Dari $q_0$​ dengan input `0`, NFA bisa tetap di $q_0$​ DAN pindah ke $q_1​$.
> > 
> > Jika NFA membaca string "001":
> > 
> > 1. **Start:** State aktif adalah $\{ q_0 \}$.
> > 2. **Baca '0':**
> >     - Dari $q_0$​, transisi untuk '0' adalah ke $\{q_0​,q_1\}$. State aktif sekarang: $\{q_0​,q_1​\}$.
> > 1. **Baca '0':**
> >     - Dari $q_0​$, transisi untuk '0' adalah ke$\{q_0​,q_1\}$.
> >     - Dari $q_1$​, tidak ada transisi untuk '0' (jalur ini mati).
> >     - State aktif sekarang adalah gabungannya: $\{q_0​,q_1​\}$.
> > 1. **Baca '1':**
> >     - Dari $q_0​$, transisi untuk '1' adalah ke $\{q_0​\}$.
> >     - Dari $q_1$​, transisi untuk '1' adalah ke $\{q_2\}$.
> >     - State aktif sekarang adalah gabungannya: $\{q_0​,q_2​\}$.
> > 1. **String Habis:** Himpunan state akhir adalah $\{q_0​,q_2​\}$.
> > 2. **Cek Final State:** Apakah himpunan $\{q_0​,q_2​\}$ mengandung anggota dari $F=\{q_2​\}$? Ya, yaitu $q_2$​.
> > 3. **Kesimpulan:** String "001" **diterima**.
> > 
> > ### Bahasa dari Sebuah NFA (L(A))
> > 
> > Bahasa dari sebuah NFA adalah himpunan semua string w yang diterimanya.
> > 
> > - **Definisi Formal:** $L(A)=\{w| \hat \delta (q_0​,w) \cap F \neq \emptyset \}$
> > 
> > Ini dibaca: "Himpunan semua string w sedemikian sehingga irisan (intersection) antara himpunan state akhir NFA ($\hat \delta(q_0​,w)$) dengan himpunan final state (F) **tidak kosong**."

> [!cornell] #### Summary
> **Nondeterministic Finite Automata (NFA)** adalah varian dari finite automata yang memungkinkan **non-determinisme**, yaitu kemampuan untuk memiliki beberapa kemungkinan transisi (atau tidak ada sama sekali) untuk sebuah input dari satu state. Perbedaan utamanya dari DFA terletak pada fungsi transisi (δ) yang mengembalikan sebuah **himpunan state**, bukan state tunggal. Sebuah NFA menerima string jika, dari semua jalur komputasi yang mungkin, **setidaknya ada satu jalur** yang berakhir di _final state_.
 
> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Menggunakan NFA?
>  
>  Jika pada akhirnya NFA dan DFA memiliki kekuatan komputasi yang sama (keduanya hanya bisa mengenali Bahasa Regular), lalu mengapa repot-repot menggunakan NFA? Jawabannya adalah **kemudahan desain**. Untuk banyak bahasa, merancang NFA jauh lebih intuitif dan menghasilkan mesin yang jauh lebih sederhana (lebih sedikit state dan transisi) dibandingkan DFA padanannya. NFA seringkali menjadi "langkah antara" yang sangat baik: kita mendesain NFA yang sederhana, lalu mengubahnya secara mekanis menjadi DFA yang lebih kompleks jika diperlukan untuk implementasi.
> 
> #### Eksplorasi Mandiri
> 
> - **Pikirkan Desain NFA:** Coba bayangkan bagaimana Anda akan mendesain sebuah NFA untuk bahasa L={w∣w adalah string biner yang mengandung ’101’ sebagai substring}.
> - **Petunjuk:** Anda bisa membuat 4 state. Dari state awal, Anda bisa tetap di sana dengan input apa pun. Tapi jika Anda membaca '1', Anda punya _pilihan_ untuk pindah ke state berikutnya untuk mulai "berharap" menemukan pola "101". Ini adalah kekuatan dari non-determinisme.