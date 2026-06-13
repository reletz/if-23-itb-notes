---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Phylogeny Fundamentals and Classification
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara **phylogeny**, **systematics**, dan **taxonomy**?
> > - Bagaimana sistem **binomial nomenclature** dan hierarki taksonomi Linnaeus bekerja?
> > - Bagaimana cara membaca sebuah **phylogenetic tree** (node, branch, sister taxa)?
> > - Apa yang **bisa** dan **tidak bisa** kita simpulkan dari sebuah pohon filogenetik?
> > - Mengapa pohon filogenetik dapat dipandang sebagai struktur data **tree**?
> >
> > ## Reference Points
> >
> > - IF3211 — Phylogeny (PPT 10, bagian Phylogenies Show Evolutionary Relationships)
> > - IF3211 — Phylogeny (PPT 10, bagian Binomial Nomenclature & Hierarchical Classification)
>
> > ### Phylogeny, Systematics, dan Taxonomy
> >
> > **Phylogeny** adalah **sejarah evolusi** suatu spesies atau kelompok spesies yang berkerabat. Disiplin yang mempelajarinya, **systematics**, bertugas mengklasifikasikan organisme **dan** menentukan hubungan evolusionernya. Di dalamnya, **taxonomy** adalah cabang yang khusus menangani **penamaan** dan **pengelompokan** organisme secara teratur.
> >
> > Premis dasarnya: organisme berbagi banyak ciri karena **common ancestry** (nenek moyang bersama). Organisme yang berkerabat dekat berbagi banyak **gen**, **jalur metabolik**, dan **protein struktural**. Inilah sinyal yang dieksploitasi systematics untuk merekonstruksi pohon kehidupan: semakin mirip dua organisme (secara morfologi maupun sekuens), semakin besar peluang mereka berkerabat dekat.
> >
> > ### Binomial Nomenclature dan Hierarki Taksonomi
> >
> > Pada abad ke-18, **Carolus Linnaeus** memublikasikan sistem taksonomi berbasis kemiripan. Dua fiturnya masih dipakai: **nama dua-bagian** dan **klasifikasi hierarkis**.
> >
> > - **Binomial**: nama spesies terdiri dari **genus** (huruf pertama kapital) + **specific epithet** (unik per spesies). Seluruh nama dimiringkan, mis. *Homo sapiens*. Kedua bagian bersama-sama menamai spesies — epithet saja tidak cukup.
> > - **Hierarki**: dari paling spesifik ke paling inklusif — **species → genus → family → order → class → phylum → kingdom → domain**. Satu unit bernama pada level mana pun disebut **taxon** (jamak: *taxa*).
> >
> > Mnemonic klasik untuk urutan ini: *"Dear King Philip Came Over For Good Soup"* (Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species).
> >
> > ### Membaca Phylogenetic Tree
> >
> > Hubungan evolusi digambarkan sebagai diagram bercabang, yaitu **phylogenetic tree**. Setiap **branch point** (node internal) merepresentasikan **divergensi** dua lineage dari satu **common ancestor**. **Sister taxa** adalah dua kelompok yang berbagi nenek moyang langsung yang **tidak** dibagi kelompok lain.
> >
> > Hal penting yang sering disalahpahami:
> >
> > - Pohon bisa digambar **horizontal, vertikal, atau diagonal** tanpa mengubah makna.
> > - **Urutan taxa di ujung cabang (tips) BUKAN urutan waktu evolusi.**
> > - **Cabang dapat dirotasi** di sekitar branch point tanpa mengubah hubungan yang digambarkan — sama seperti subtree pada binary tree bisa ditukar kiri-kanan.
> >
> > Yang **bisa** dipelajari: pola percabangan/kekerabatan. Yang **tidak bisa**: pohon adalah **hipotesis**, bukan fakta absolut; tidak menyatakan bahwa satu spesies "berevolusi dari" spesies hidup lain di ujung pohon.
> >
> > ```mermaid
> > graph LR
> >     A(("Common<br/>Ancestor"))
> >     A --> B(("Node 1"))
> >     A --> O["Outgroup"]
> >     B --> C(("Node 2"))
> >     B --> T3["Taxon C"]
> >     C --> T1["Taxon A"]
> >     C --> T2["Taxon B"]
> > ```
> >
> > Pada diagram di atas, **Taxon A** dan **Taxon B** adalah **sister taxa** (berbagi Node 2), sedangkan **Outgroup** divergen paling awal dari **Common Ancestor**.
> >
> > ### Computational Framing: Pohon sebagai Struktur Data Tree
> >
> > Bagi mahasiswa informatika, phylogenetic tree adalah **rooted tree** klasik: **leaf nodes** = taxa yang diamati (spesies/sekuens), **internal nodes** = hypothetical common ancestors, **edges** = lineage evolusi. Rotasi cabang yang tidak mengubah makna setara dengan fakta bahwa pohon ini **unordered** terhadap anak-anaknya — hanya **topologi** (siapa berbagi parent dengan siapa) yang bermakna, persis seperti membandingkan dua tree dengan mengabaikan urutan child.
> >
> > Konsekuensinya: dua representasi pohon "sama" bila isomorfik secara topologi. Format penyimpanan standar di bioinformatika adalah **Newick** (mis. `((A,B),C);`) — sebuah serialisasi rekursif pohon, mirip representasi nested parenthesis untuk tree. Operasi membaca/menulis Newick adalah traversal pohon biasa (DFS), dan menghitung jumlah pohon tak-berakar untuk *n* taxa memberi angka super-eksponensial — fondasi mengapa pencarian pohon (lihat [[Maximum Parsimony and Tree Reconstruction]]) mahal.

> [!cornell] #### Summary
>
> **Phylogeny** adalah sejarah evolusi yang dipelajari **systematics** (klasifikasi + hubungan evolusi), dengan **taxonomy** sebagai cabang penamaan. Sistem **Linnaeus** menyumbang **binomial nomenclature** (*Genus species*, dimiringkan) dan **hierarki** species→genus→...→domain, di mana tiap unit bernama disebut **taxon**. Hubungan digambar sebagai **phylogenetic tree**: **branch point** = divergensi, **sister taxa** = berbagi nenek moyang langsung; pohon dapat dirotasi/diorientasikan ulang tanpa mengubah makna, dan urutan tips bukan urutan waktu. Pohon ini hanyalah **hipotesis**. Secara komputasi, ia adalah **rooted unordered tree** yang diserialisasi dalam format **Newick** — landasan untuk metode di [[Cladistics and Character-Based Methods]] dan [[Maximum Parsimony and Tree Reconstruction]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Cladogram vs Phylogram
>
> Tidak semua pohon sama. Sebuah **cladogram** hanya menunjukkan **topologi** (pola percabangan) tanpa makna pada panjang cabang. Sebuah **phylogram** memberi arti pada **branch length** (jumlah perubahan genetik), dan **ultrametric tree** menyetel panjang cabang sesuai **waktu** (lihat molecular clock di [[Molecular Clocks and the Three Domains of Life]]). Membedakan ketiganya penting agar tidak salah membaca "jarak" visual sebagai kekerabatan.
>
> #### CS Angle: Newick, Traversal, dan Isomorfisme Pohon
>
> Format **Newick** memetakan pohon ke string ber-tanda-kurung; parsing-nya = membangun tree via stack atau rekursi. Membandingkan dua hipotesis pohon = uji **tree isomorphism** pada unordered tree, yang dapat diselesaikan dalam waktu linier dengan **AHU algorithm** (canonical labeling melalui hashing subtree bottom-up). Menghitung statistik seperti kedalaman, jumlah daun, atau **Robinson–Foulds distance** antar pohon semuanya adalah traversal/​set-operasi standar.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis parser **Newick** sederhana yang membaca `((A,B),(C,D));` menjadi struktur tree, lalu cetak hasil **pre-order** dan **post-order** traversal.
> 2. Ambil 5 spesies favorit, cari klasifikasi Linnaeus-nya di GBIF/NCBI Taxonomy, dan gambar hierarki taksonomi bersamanya sebagai mermaid.
> 3. Implementasikan pengecekan **isomorfisme** dua pohon unordered untuk membuktikan bahwa rotasi cabang tidak mengubah pohon.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 20 — *Phylogeny*.
> - NCBI Taxonomy Browser: https://www.ncbi.nlm.nih.gov/taxonomy
> - Felsenstein, J. *Inferring Phylogenies* (2004) — bab pengantar representasi pohon.
