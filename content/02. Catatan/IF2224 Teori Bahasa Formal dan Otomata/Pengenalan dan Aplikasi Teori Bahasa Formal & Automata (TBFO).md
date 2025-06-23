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
> > - Bagaimana FA memodelkan Vending Machine?
> > - Apa itu FSM dan contohnya?
> > - Bagaimana PDA digunakan di game?
> > - Apa kaitan TBFO dengan NLP?
> >
> > ## Reference Points
> > 
> > - Slides: 1, 4-8
> > - Slides: 22, 28-31
> > - Slides: 32-35
> 
> > ### Tujuan dan Relevansi Mempelajari TBFO
> > 
> > **Tujuan Pembelajaran (IF2124)**
> >
> > Tujuan utama mata kuliah ini adalah agar mahasiswa dapat memahami konsep, notasi, dan aplikasi dari teori automata dan bahasa formal1. Ini mencakup kemampuan untuk merancang berbagai jenis automaton—seperti _finite automata_, _pushdown automata_, dan _mesin Turing_—untuk menyelesaikan masalah spesifik. Mahasiswa juga diharapkan mengerti hirarki automata dan batasan komputasi dari suatu masalah praktis.
> >
> > **Relevansi di Dunia Kerja**
> >
> > Meskipun ada mata kuliah dasar seperti pemrograman, sebuah survei di kalangan lulusan Stanford menunjukkan bahwa mata kuliah Teori Bahasa Formal dan Automata (TBFO) memiliki kegunaan yang sangat tinggi di dunia kerja, bahkan 3 kali lebih tinggi dibandingkan mata kuliah AI4444. Ini menunjukkan bahwa pemahaman fundamental tentang komputasi, batasan, dan struktur bahasa sangat dihargai di industri.
> >
> > ### Aplikasi Praktis Konsep TBFO
> >
> > - Regular Expression: Digunakan secara luas di berbagai tools seperti UNIX dan untuk validasi struktur dokumen (DTD).
> > - Finite Automata (FA): Bermanfaat untuk memodelkan sistem dengan keadaan terbatas, seperti protokol jaringan dan desain sirkuit elektronik.
> > - Context-Free Grammar (CFG): Menjadi tulang punggung dalam mendefinisikan sintaks atau tata bahasa dari bahasa pemrograman dan juga digunakan dalam pemrosesan bahasa alami manusia.
> > - Mesin Turing: Merupakan model matematis yang mendasari hampir semua komputasi modern dan membantu kita memahami batasan fundamental dari apa yang bisa dan tidak bisa diselesaikan oleh perangkat lunak.
> >
> > ### Studi Kasus dan Contoh Penerapan
> > 
> > **1. Finite Automata (FA) - Vending Machine**
> > Model Automata dapat digunakan sebagai _recognizer_ (pengenal). Bayangkan sebuah mesin penjual kopi seharga Rp. 15 yang hanya menerima koin Rp. 5 dan Rp. 10, tanpa bisa memberi kembalian.
> >
> > - **Model:** Kita bisa memodelkan mesin ini sebagai Finite Automata. Setiap "state" (keadaan) merepresentasikan jumlah uang yang sudah masuk (misal: state 0, state 5, state 10).
> > - **Transisi:** Memasukkan koin menyebabkan transisi dari satu state ke state lainnya (misal: dari state 5, jika dimasukkan koin 10, akan transisi ke state 15).
> > - **Final State:** State "Rp. 15" adalah _final state_ di mana pembeli bisa menekan tombol untuk mendapatkan kopi.
> > 
> > **2. Finite State Machine (FSM) - Perilaku Dasar**
> > 
> > FSM adalah implementasi dari Finite Automata. Contoh sederhana adalah model perilaku mangsa (prey) saat bertemu pemangsa (predator).
> > 
> > - **State:** Idle (diam), Flee (kabur), Dead (mati).
> > - **Event/Input:** "Melihat predator" mengubah state dari `Idle` menjadi `Flee`. "Tertangkap" mengubah state dari `Flee` menjadi `Dead`. "Ancaman hilang" mengembalikan state ke `Idle`.
> > 
> > **3. Pushdown Automata (PDA) - AI Game yang Lebih Cerdas**
> >
> > _Pushdown Automata_ adalah FSM yang dilengkapi dengan memori _stack_ (tumpukan). Ini memungkinkan AI untuk "mengingat" keadaan sebelumnya, menghasilkan perilaku yang lebih kompleks dan realistis tanpa memperumit desain FSM itu sendiri.
> >
> > - **Contoh di Game (Thief 3):** AI penjaga bisa berada dalam state `PATROL`. Saat mendengar suara (input), state-nya berubah menjadi `SEARCH` (mencari). State `PATROL` sebelumnya di-_push_ ke dalam stack. Setelah selesai mencari dan tidak menemukan apa-apa, AI bisa melakukan _pop_ dari stack untuk kembali ke state `PATROL`, seolah-olah "mengingat" apa yang sedang dilakukannya sebelumnya.
> >     
> > 
> > **4. Kaitan dengan Natural Language Processing (NLP)**
> >
> > NLP adalah cabang ilmu yang bertujuan memproses bahasa manusia secara otomatis. Teori bahasa formal menyediakan fondasi matematis untuk NLP melalui teori linguistik:
> >
> > - **Morphology (Struktur Kata):** Bisa dianalisis menggunakan Finite Automata.
> > - **Syntax (Tata Bahasa):** Sering dimodelkan menggunakan Context-Free Grammar (CFG).
> > - **Semantics & Pragmatics (Arti & Konteks):** Merupakan area yang lebih kompleks di mana teori-teori ini juga berperan.

> [!cornell] #### Summary
> 
> Teori Bahasa Formal dan Automata (TBFO) adalah bidang studi fundamental dengan relevansi tinggi di industri, karena menyediakan fondasi untuk teknologi penting seperti compiler, regular expression, dan pemodelan sistem. Konsep-konsepnya, seperti Finite Automata dan Pushdown Automata, dapat diaplikasikan secara praktis untuk memodelkan sistem sederhana seperti vending machine hingga menciptakan AI yang cerdas dalam video game dan menjadi dasar bagi Pemrosesan Bahasa Alami (NLP).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Hierarki Chomsky: Peta Kekuatan Bahasa
> 
> Konsep yang dibahas (Regular, Context-Free, dst.) adalah bagian dari sebuah kerangka yang lebih besar bernama **Hierarki Chomsky**. Hirarki ini mengklasifikasikan bahasa formal ke dalam tingkatan berdasarkan kompleksitas aturannya dan jenis automata yang diperlukan untuk mengenalinya. Memahaminya memberikan "peta" yang jelas tentang kekuatan dan batasan setiap model komputasi.
> 
> #### Eksplorasi Mandiri
> 
> - **Rancang FSM Sederhana:** Cobalah untuk merancang diagram state (seperti contoh predator-prey) untuk sistem sederhana di sekitarmu. Misalnya: lampu lalu lintas, pintu otomatis, atau bahkan siklus tidur-bangun harianmu.
> - **Coba Regex:** Gunakan situs seperti [regex101.com](https://regex101.com/) untuk bereksperimen. Cobalah membuat pola regex sederhana untuk memvalidasi format email atau nomor telepon. Ini adalah aplikasi langsung dari _Regular Language_.