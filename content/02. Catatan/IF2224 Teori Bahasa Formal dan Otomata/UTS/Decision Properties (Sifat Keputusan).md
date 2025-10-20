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
> > - Apa itu Sifat Keputusan?
> >     
> > - Bagaimana menguji Kekosongan (Emptiness)?
> >     
> > - Bagaimana menguji Keanggotaan (Membership)?
> >     
> > - Bagaimana menguji Kesetaraan (Equivalence)?
> >     
> > - Bagaimana menguji Ketercakupan (Containment)?
> >     
> > - Apa peran Product Automaton?
> >     
> > 
> > ## Reference Points
> > 
> > - 2021_Bab-4-Sifat-Sifat-Bahasa-Regular.pdf: 17-32
> >     
> > - 2023_Properties of Regular Languages.pdf: 26-37
> >     
> 
> > ### Apa itu Sifat Keputusan (Decision Property)?
> > 
> > **Sifat Keputusan** adalah sebuah **algoritma** yang dapat menjawab pertanyaan "YA/TIDAK" tentang suatu bahasa atau automata. Untuk kelas Bahasa Regular, kita beruntung karena semua pertanyaan fundamentalnya dapat diputuskan (bersifat _decidable_), artinya selalu ada algoritma yang bisa memberikan jawaban pasti.
> > 
> > ### Masalah Kekosongan (The Emptiness Problem)
> > 
> > - **Pertanyaan:** Diberikan sebuah bahasa regular $L$, apakah $L=∅$? (Apakah bahasa tersebut tidak mengandung string sama sekali?)
> >     
> > - **Algoritma (menggunakan FA):**
> >     
> >     1. Ambil sebuah FA (DFA atau NFA) yang menerima bahasa $L$.
> >         
> >     2. Gunakan algoritma penelusuran graf (seperti BFS atau DFS) untuk mencari semua state yang **dapat dijangkau (reachable)** dari _start state_.
> >         
> >     3. Periksa apakah ada **setidaknya satu** _final state_ di antara state-state yang dapat dijangkau tersebut.
> >         
> >     4. Jika ada, maka $L \neq ∅$. Jika tidak ada, maka $L=∅$.
> >         
> > 
> > ### Masalah Keanggotaan (The Membership Problem)
> > 
> > - **Pertanyaan:** Diberikan sebuah bahasa regular $L$ dan sebuah string $w$, apakah $w∈L$?
> >     
> > - **Algoritma (menggunakan DFA):**
> >     
> >     1. Ambil DFA yang menerima $L$.
> >         
> >     2. Lakukan simulasi dengan menjalankan DFA tersebut menggunakan string w sebagai input, simbol per simbol.
> >         
> >     3. Setelah semua simbol $w$ habis dibaca, periksa di state mana DFA tersebut berhenti.
> >         
> >     4. Jika DFA berhenti di sebuah _final state_, maka $w∈L$. Jika tidak, maka $w\notin L$.
> >         
> > 
> > ### Masalah Kesetaraan (The Equivalence Problem)
> > 
> > - **Pertanyaan:** Diberikan dua bahasa regular $L$ dan $M$, apakah $L=M$?
> >     
> > - **Algoritma (menggunakan Product Automaton):**
> >     
> >     1. Ide utamanya adalah memeriksa apakah **perbedaan simetris** antara kedua bahasa tersebut kosong: $(L−M)\cup(M−L)=∅$?
> >         
> >     2. Ambil DFA $A_L$​ untuk $L$ dan $A_M$​ untuk $M$.
> >         
> >     3. Bangun _{product} automaton_ $A_{product}​$ dari $A_L$​ dan $A_M$​.
> >         
> >     4. Tentukan himpunan final state baru Fproduct​ sebagai berikut: sebuah state pasangan $(p,q)$ adalah final jika **salah satunya final, tapi tidak keduanya**. ($p∈F_L$​ dan $q \notin F_M$​, ATAU $p \notin F_L$​ dan $q∈FM$​).
> >         
> >     5. Jalankan algoritma **pengecekan kekosongan** pada Aproduct​ ini.
> >         
> >     6. Jika bahasa dari $A_{product}$​ adalah kosong, maka $L=M$. Jika tidak, maka $L\neq M$.
> >         
> > 
> > ### Masalah Ketercakupan (The Containment Problem)
> > 
> > - **Pertanyaan:** Diberikan dua bahasa regular $L$ dan $M$, apakah $L⊆M$? (Apakah semua string di $L$ juga ada di $M$?)
> >     
> > - **Algoritma (menggunakan Product Automaton):**
> >     
> >     1. Ide utamanya adalah memeriksa apakah $L−M=∅$?
> >         
> >     2. Ambil DFA $A_L$​ untuk $L$ dan $A_M$​ untuk $M$.
> >         
> >     3. Bangun _{product} automaton_ $A_{product}$​.
> >         
> >     4. Tentukan himpunan final state baru $F_{product}$​ sebagai berikut: sebuah state pasangan $(p,q)$ adalah final jika $p$ adalah final state di $A_L$​ **DAN** $q$ adalah state **non-final** di $A_M$​.
> >         
> >     5. Jalankan algoritma **pengecekan kekosongan** pada $A_{product}$​ ini.
> >         
> >     6. Jika bahasa dari $A_{product}$​ adalah kosong, maka tidak ada string di $L$ yang tidak ada di $M$, sehingga terbukti $L⊆M$.$
> >         

> [!cornell] #### Summary
>  Kelas Bahasa Regular memiliki **sifat-sifat keputusan** yang kuat, artinya terdapat algoritma yang pasti untuk menjawab pertanyaan fundamental tentangnya. **Kekosongan** bahasa dapat diuji dengan memeriksa keterjangkauan _final state_ dari _start state_. **Keanggotaan** sebuah string dapat diuji dengan simulasi DFA. Sementara itu, masalah yang lebih kompleks seperti **Kesetaraan** (L=M) dan **Ketercakupan** (L⊆M) dapat diselesaikan secara efektif dengan membangun sebuah **Product Automaton** yang merepresentasikan perbedaan antar bahasa, lalu mengujinya untuk kekosongan.
 
> [!ad-libitum]- Additional Information (Optional)
> 
> #### Decidability adalah Sebuah Kemewahan 
> Kemampuan untuk menjawab semua pertanyaan ini secara algoritmik (bersifat _decidable_) adalah sebuah "kemewahan" yang dimiliki oleh Bahasa Regular. Saat kita mempelajari kelas bahasa yang lebih kuat nanti (seperti Bahasa Bebas Konteks/Context-Free Languages), beberapa pertanyaan ini, terutama masalah kesetaraan, menjadi **tidak dapat diputuskan (_undecidable_)**. Artinya, tidak akan pernah ada algoritma komputer yang bisa menjawabnya dengan benar untuk semua kemungkinan kasus. Hal ini menunjukkan betapa "jinak" dan terstrukturnya dunia Bahasa Regular.
>
> #### Eksplorasi Mandiri
> - **Hubungan Ketercakupan dan Kesetaraan:** Pikirkan sejenak, bagaimana Anda bisa menggunakan algoritma untuk masalah **ketercakupan** untuk menyelesaikan masalah **kesetaraan**? (Petunjuk: Dua himpunan L dan M adalah sama jika dan hanya jika L⊆M DAN M⊆L).