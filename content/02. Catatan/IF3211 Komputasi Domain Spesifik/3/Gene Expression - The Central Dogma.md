---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Gene Expression - The Central Dogma
>
> > ## Questions/Cues
> >
> > - Apa dua tahap utama **protein synthesis** dan apa keluaran masing-masing?
> > - Bagaimana **transcription** mengubah DNA menjadi mRNA (initiation, elongation, termination)?
> > - Bagaimana **translation** membaca **codon** menjadi rangkaian asam amino?
> > - Apa peran **ribosome**, **tRNA**, dan **anticodon** dalam translasi?
> > - Mengapa **genetic code** dapat dipandang sebagai tabel pemetaan (lookup table)?
> >
> > ## Reference Points
> >
> > - IF3211 — Genetics (PPT 3 & 4, bagian Gene Expression: From Gene to Protein)
>
> > ### Dari Gen ke Protein: Gambaran Besar
> >
> > **Gene expression** adalah proses mengubah informasi dalam sebuah **gen** (sepotong DNA) menjadi sebuah **protein** yang berfungsi. Keseluruhan proses ini disebut **protein synthesis** dan terbagi dua tahap berurutan: **transcription** (transkripsi) di dalam nukleus, dan **translation** (translasi) di ribosom. Protein adalah "mesin kerja" sel, sehingga gen pada dasarnya adalah **instruksi** untuk membangun mesin tersebut.
> >
> > Alur informasi ini dikenal sebagai **Central Dogma**: DNA → (transkripsi) → mRNA → (translasi) → protein. Arahnya satu arah dalam kasus dasar ini, mirip sebuah **compiler pipeline** yang mengubah kode sumber menjadi program yang dapat dieksekusi.
> >
> > ```mermaid
> > flowchart LR
> >     DNA["DNA (gen)"] -->|"transcription<br/>RNA polymerase"| MRNA["mRNA (transcript)"]
> >     MRNA -->|"translation<br/>ribosome &amp; tRNA"| PROT["Protein (polipeptida)"]
> >     PROT --> FUNC["Fungsi biologis"]
> > ```
> >
> > ### Transcription: Menyalin Gen Menjadi mRNA
> >
> > Saat sel ingin membuat protein dari sebuah gen, DNA di nukleus **dibuka (unwound)** sehingga bagian gen terekspos. Enzim **RNA polymerase** lalu merangkai **nukleotida RNA** di atas untai template DNA untuk membentuk sepotong **mRNA (messenger RNA)** — sebuah "transcript" yang dapat keluar dari nukleus untuk mencari ribosom. Transkripsi berlangsung dalam tiga tahap:
> >
> > 1. **Initiation** — RNA polymerase menempel pada daerah awal gen (promoter) dan mulai membuka untai.
> > 2. **Elongation** — polymerase bergerak sepanjang template, menambah nukleotida RNA komplementer satu per satu.
> > 3. **Termination** — sintesis berhenti saat mencapai sinyal akhir, dan mRNA dilepaskan.
> >
> > Karena RNA memakai aturan komplementer (dengan **U/urasil** menggantikan T), mRNA adalah salinan informasi gen dalam "format" yang siap dibaca ribosom.
> >
> > ### Translation: Membaca Codon Menjadi Polipeptida
> >
> > Pada translasi, mRNA menemukan **ribosome** dan "diumpankan" melaluinya. mRNA dibaca per **tiga nukleotida** sekaligus — satu kelompok tiga disebut **codon**. Ribosom mengenali **start codon** untuk memulai pembangunan protein. Setiap codon mengkode **satu asam amino**; rangkaian asam amino disebut **polypeptide** (istilah lain untuk protein).
> >
> > Setiap asam amino dibawa oleh sebuah **tRNA (transfer RNA)** yang memiliki **anticodon** — tiga basa yang berpasangan komplementer dengan codon pada mRNA. Dengan begitu tRNA "mencocokkan" asam amino yang benar ke posisi yang benar di rantai yang sedang tumbuh di dalam ribosom. Proses berlanjut hingga ribosom mencapai sebuah **STOP codon**, lalu translasi berhenti dan polipeptida dilepas. Translasi adalah proses yang kompleks secara biokimia maupun mekanis.
> >
> > ### Sudut Pandang Komputasional: Pipeline Informasi dan Codon Table sebagai Lookup
> >
> > Central dogma adalah **pipeline aliran informasi** yang nyaris sempurna untuk dianalogikan ke komputasi. DNA adalah **source code** tersimpan; transkripsi adalah tahap menyalin ke buffer perantara (mRNA), mirip *intermediate representation*; translasi adalah **decoder/interpreter** yang mengeksekusi instruksi menjadi produk (protein).
> >
> > Kunci dekoder ini adalah **genetic code**: sebuah **lookup table** yang memetakan tiap codon (3 basa, 4³ = **64** kemungkinan) ke satu dari 20 asam amino atau sinyal stop. Karena 64 codon > 20 asam amino, kode bersifat **redundan/degenerate** — beberapa codon memetakan ke asam amino yang sama, mirip skema **encoding** yang toleran terhadap sebagian error (banyak substitusi basa ketiga tidak mengubah keluaran; lihat **silent mutation** di [[Mutations and Their Molecular Consequences]]). Codon dibaca dalam **reading frame** tetap mulai dari start codon — sehingga pergeseran satu basa (insertion/deletion) menggeser seluruh frame, sama seperti membaca byte stream dengan offset yang salah.

> [!cornell] #### Summary
>
> **Gene expression** mengubah gen menjadi protein lewat **Central Dogma**: DNA → **transcription** → **mRNA** → **translation** → **protein**. Transkripsi oleh **RNA polymerase** (initiation, elongation, termination) menghasilkan transcript mRNA; translasi di **ribosome** membaca mRNA per **codon** (3 basa), dengan **tRNA**/anticodon mengantar asam amino yang sesuai, dimulai dari **start codon** hingga **STOP codon**, menghasilkan **polypeptide**. Secara komputasional, ini adalah **pipeline aliran informasi** dan **genetic code** adalah **lookup table** 64-codon yang **redundan** — fondasi untuk memahami efek [[Mutations and Their Molecular Consequences]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Reading Frame, Start/Stop, dan Degenerasi
>
> Start codon umumnya **AUG** (mengkode metionin) dan tiga stop codon (**UAA, UAG, UGA**) tidak mengkode asam amino apa pun. Posisi basa ketiga dalam codon paling sering "boleh berubah" tanpa mengganti asam amino — fenomena **wobble**. Inilah mengapa kode genetik dianggap tangguh: banyak kesalahan kecil tidak berpengaruh pada produk akhir, sebuah bentuk redundansi yang dirancang alam.
>
> #### CS Angle: Codon Table sebagai Hash/Dictionary dan Frame-Shift Bug
>
> Implementasikan kode genetik sebagai `dict[str, str]` di mana key adalah 3-mer dan value adalah simbol asam amino — translasi menjadi loop yang membaca window berukuran 3. "Frame-shift" persis seperti bug off-by-one pada parsing byte stream: menyisipkan/menghapus satu elemen mengubah interpretasi semua token berikutnya. Karena 64→21 simbol, kode genetik bukan injektif, sehingga tak bisa di-*decode* balik secara unik (banyak DNA berbeda → protein sama).
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat fungsi `translate(mrna)` memakai codon table, berhenti di stop codon; uji dengan beberapa sekuens dan perhatikan efek menghapus satu basa di awal (frameshift).
> 2. Hitung berapa banyak codon yang memetakan ke tiap asam amino, lalu visualisasikan tingkat redundansi kode genetik.
> 3. Bandingkan pipeline DNA→mRNA→protein dengan tahap *lexing → parsing → codegen* pada compiler, dan tuliskan padanannya.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Bab 14 — Gene Expression: From Gene to Protein.
> - Crick, F. (1970). *Central Dogma of Molecular Biology*. Nature 227.
> - NCBI — *The Genetic Codes* (tabel translasi standar dan variannya).
