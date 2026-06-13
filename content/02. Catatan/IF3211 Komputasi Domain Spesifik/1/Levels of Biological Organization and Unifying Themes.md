---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Levels of Biological Organization and Unifying Themes
>
> > ## Questions/Cues
> >
> > - Apa saja level organisasi kehidupan dari molekul hingga biosfer?
> > - Apa lima tema pemersatu (unifying themes) dalam biologi?
> > - Apa itu emergent properties dan reductionism?
> > - Bagaimana DNA menyimpan dan mentransmisikan informasi genetik?
> > - Bagaimana hierarki kehidupan dapat dimodelkan sebagai struktur data bertingkat?
> >
> > ## Reference Points
> >
> > - IF3211 — Course Introduction (PPT 1, bagian Unifying Themes)
> > - IF3211 — Course Introduction (PPT 1, bagian Levels of Biological Organization)
> > - IF3211 — Course Introduction (PPT 1, bagian DNA, the Genetic Material)
>
> > ### Hierarki Organisasi Kehidupan
> >
> > Kehidupan dapat dipelajari pada **level-level organisasi biologis** yang bersarang, dari molekul terkecil hingga seluruh planet. Urutannya (Campbell, Fig. 1-4): **Molecules → Organelles → Cells → Tissues → Organs and organ systems → Organisms → Populations → Communities → Ecosystems → The biosphere**. Tiap level dibangun dari level di bawahnya. **Sel** menempati posisi istimewa: ia adalah **unit terkecil kehidupan** yang mampu menjalankan semua aktivitas hidup, selalu **diselubungi membran**, dan hadir dalam dua bentuk utama — **prokariotik** (tanpa nukleus/organel bermembran) dan **eukariotik** (memiliki nukleus berisi DNA dan organel bermembran seperti kloroplas).
> >
> > ### Lima Tema Pemersatu
> >
> > Untuk mengorganisasi lautan informasi biologi, Campbell menetapkan **lima unifying themes**:
> >
> > 1. **Organization** — struktur bertingkat, dengan korelasi **structure ↔ function** di setiap level.
> > 2. **Information** — ekspresi dan transmisi **informasi genetik** lewat DNA.
> > 3. **Energy and matter** — aliran energi dan siklus materi yang menggerakkan kehidupan.
> > 4. **Interactions** — komponen saling berinteraksi, dari molekul dalam sel hingga organisme dalam ekosistem.
> > 5. **Evolution** — proses pemersatu yang menjelaskan **unity** sekaligus **diversity** kehidupan.
> >
> > ### Emergent Properties dan Reductionism
> >
> > Tema **Organization** memunculkan ide kunci: **new properties emerge at successive levels** — sifat baru muncul di tiap level yang **tidak dimiliki** oleh komponen penyusunnya sendiri (**emergent properties**). Misalnya, sifat "hidup" muncul pada level sel, bukan pada molekul tunggal. Untuk mempelajari sistem kompleks, sains memakai **reductionism**: memecah sistem menjadi komponen lebih sederhana agar lebih *manageable*. Namun reductionism saja tak cukup — sifat emergen hanya tampak ketika komponen **dirakit dan berinteraksi**. Di setiap level juga berlaku korelasi **structure–function**: menganalisis struktur memberi petunjuk tentang fungsinya.
> >
> > ### Informasi: DNA sebagai Materi Genetik
> >
> > Tema **Information** terwujud dalam **DNA (deoxyribonucleic acid)**. **Kromosom** mengandung materi genetik berupa DNA; satu molekul DNA memuat ratusan hingga ribuan **gen**, masing-masing adalah segmen DNA di sepanjang kromosom. **Gen adalah unit pewarisan** yang mentransmisikan informasi dari induk ke keturunan. Saat sel tumbuh dan membelah, informasi yang **dikodekan** DNA **mengarahkan perkembangan** organisme — dari sel telur terbuahi (berisi DNA kedua induk) hingga organisme dewasa dengan sifat warisan.
> >
> > ### Computational Framing: Hierarki sebagai Struktur Data Bertingkat
> >
> > Bagi mahasiswa CS, hierarki kehidupan adalah **nested data structure** — sebuah pohon komposisi (*part-of* relationship) mirip **DOM tree** atau **scene graph**: biosfer mengandung ekosistem yang mengandung komunitas, dan seterusnya hingga molekul. **Emergent properties** adalah konsep inti **complex systems**: perilaku sistem **tidak dapat disimpulkan** hanya dari menjumlahkan perilaku komponen (analog dengan *cellular automata* seperti Game of Life, di mana pola global muncul dari aturan lokal sederhana). **DNA** memodelkan tema *Information* sebagai **kode digital kuartener** (alfabet `{A, C, G, T}`) — sebuah *string* yang **disalin** (replikasi), **dibaca** (transkripsi/translasi), dan **dieksekusi** sebagai program perkembangan. Inilah jembatan langsung ke **information theory** dan **state machines**.
> >
> > ```mermaid
> > flowchart TD
> >     BIO["Biosphere"] --> ECO["Ecosystems"]
> >     ECO --> COM["Communities"]
> >     COM --> POP["Populations"]
> >     POP --> ORG["Organisms"]
> >     ORG --> OS["Organs &amp;<br/>Organ Systems"]
> >     OS --> TIS["Tissues"]
> >     TIS --> CEL["Cells"]
> >     CEL --> ORL["Organelles"]
> >     ORL --> MOL["Molecules"]
> > ```

> [!cornell] #### Summary
>
> Kehidupan tersusun dalam **hierarki bersarang** dari **molekul → organel → sel → jaringan → organ → organisme → populasi → komunitas → ekosistem → biosfer**, dengan **sel** sebagai unit terkecil kehidupan (prokariotik vs eukariotik). Lima **unifying themes** — **Organization, Information, Energy & matter, Interactions, Evolution** — mengorganisasi semua biologi. Tema Organization memunculkan **emergent properties** (sifat baru di tiap level yang tak dimiliki komponennya) dan korelasi **structure–function**, dipelajari lewat **reductionism**. Tema Information terwujud dalam **DNA**: kromosom membawa **gen** sebagai unit pewarisan yang **mengarahkan perkembangan**. Secara komputasional, hierarki ini adalah **nested data structure**, emergent properties adalah inti **complex systems**, dan DNA adalah **kode digital kuartener**. Tema **Evolution** dibahas lebih lanjut di [[Scientific Method in Biology]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Tiga Domain Kehidupan
>
> Keragaman hayati diklasifikasikan ke **tiga domain**: **Bacteria** dan **Archaea** (keduanya prokariotik) serta **Eukarya** (eukariotik). Domain Eukarya mencakup tiga kingdom multiseluler — **Plantae** (fotosintesis), **Fungi** (menyerap nutrien), dan **Animalia** (memakan & mencerna organisme lain). Klasifikasi modern kini banyak memakai **perbandingan sekuens DNA**, bukan hanya morfologi.
>
> #### CS / Computational Angle
>
> Hierarki biologis memetakan rapi ke **abstraction layers** dalam rekayasa sistem (transistor → gate → ALU → CPU → OS → aplikasi). Sama seperti seorang programmer tak perlu memikirkan elektron saat menulis Python, biolog memilih level abstraksi yang tepat untuk pertanyaannya — sebuah penerapan **separation of concerns**.
>
> #### Proyek Eksplorasi Mandiri
> 1. Modelkan hierarki kehidupan sebagai struktur pohon dalam kode (mis. class bersarang atau JSON), lalu tulis fungsi traversal yang menghitung "kedalaman" tiap level.
> 2. Jalankan simulasi Conway's Game of Life dan tuliskan contoh konkret emergent property (mis. glider) yang tak terlihat dari satu sel.
>
> #### Bacaan Lanjutan
> - Campbell, N. A., et al. *Biology in Focus*. 3rd ed., Bab 1 (Concept 1.1–1.2).
> - Mitchell, M. *Complexity: A Guided Tour*. Oxford University Press, 2009.
> - Woese, C. R. "Towards a Natural System of Organisms." *PNAS*, 1990 (tiga domain).
