---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Whole-Genome Shotgun Sequencing and Assembly
>
> > ## Questions/Cues
> >
> > - Apa tujuan dan tonggak penting **Human Genome Project**?
> > - Apa arti **high-throughput sequencing** dan mengapa ia diperlukan?
> > - Bagaimana **whole-genome shotgun** menghasilkan fragmen DNA acak?
> > - Mengapa **assembly** (penyusunan ulang) merupakan masalah komputasi?
> > - Apa peran **bioinformatics** dan basis data dalam mengelola data genom?
> >
> > ## Reference Points
> >
> > - IF3211 — Genetics (PPT 3 & 4, bagian Genomes and Their Evolution / Human Genome Project)
>
> > ### Human Genome Project dan Era High-Throughput
> >
> > **Human Genome Project (HGP)** resmi dimulai tahun **1990** dan sebagian besar sekuensingnya selesai pada **2003**. Salah satu pendorong utamanya adalah pengembangan **mesin sekuensing otomatis** untuk mempercepat pembacaan DNA. Metode yang dapat menganalisis materi biologis secara cepat dan menghasilkan **data dalam jumlah sangat besar** disebut **high-throughput**.
> >
> > HGP bukan sekadar membaca satu genom; ia mendorong lahirnya teknologi yang lebih cepat dan murah, serta membangun **basis data** dan perangkat lunak analitis yang membuat data tersedia di Internet. Dengan kata lain, HGP mengubah biologi menjadi disiplin yang **data-intensive**.
> >
> > ### Pendekatan Whole-Genome Shotgun
> >
> > Pendekatan **whole-genome shotgun** dikembangkan oleh **J. Craig Venter** dan rekan-rekannya. Idenya: alih-alih membaca genom secara berurutan dari awal hingga akhir (yang sulit untuk molekul sepanjang 3 miliar basa), genom dipecah menjadi **fragmen DNA acak** yang banyak, masing-masing **diklon dan disekuens**.
> >
> > Hasilnya adalah tumpukan besar potongan sekuens pendek yang **saling tumpang tindih (overlapping)**. Karena fragmen diambil acak dan dalam jumlah berlebih (redundansi/coverage tinggi), setiap bagian genom kemungkinan besar terbaca oleh beberapa fragmen berbeda — dan tumpang tindih inilah kunci untuk menyusunnya kembali.
> >
> > ### Masalah Assembly: Menyusun Ulang Fragmen
> >
> > Setelah ribuan hingga jutaan fragmen pendek tersedia, muncul **assembly problem**: bagaimana menyusunnya kembali menjadi satu **sekuens kontinu** yang utuh? Pekerjaan ini tidak dilakukan manual — **program komputer yang powerful** digunakan untuk merangkai potongan-potongan pendek yang tumpang tindih menjadi sekuens panjang.
> >
> > Prinsip dasarnya adalah **overlap**: jika ujung satu fragmen identik dengan awal fragmen lain, keduanya kemungkinan berasal dari lokasi genom yang sama dan dapat disambung. Dengan cukup banyak fragmen yang saling tumpang tindih, komputer dapat merekonstruksi urutan asli — mirip menyusun ulang dokumen yang disobek menjadi banyak serpihan dari banyak salinan.
> >
> > ```mermaid
> > flowchart TB
> >     G["Genom utuh"] -->|"acak + fragmentasi"| F["Banyak fragmen pendek<br/>(overlapping reads)"]
> >     F --> R1["read: ...ACGTTGA..."]
> >     F --> R2["read: ...GTTGACCA..."]
> >     F --> R3["read: ...GACCATGG..."]
> >     R1 --> O["Deteksi overlap<br/>(suffix = prefix)"]
> >     R2 --> O
> >     R3 --> O
> >     O -->|"assembly program"| C["Contig / sekuens kontinu"]
> > ```
> >
> > ### Sudut Pandang Komputasional: De-Novo Assembly dan de Bruijn Graph
> >
> > Bagi informatika, shotgun assembly adalah masalah **string reconstruction** klasik. Dua formulasi utama: (1) **Overlap-Layout-Consensus (OLC)** — bangun graf di mana node = read dan edge = overlap signifikan, lalu cari jalur yang melewati semua read (mirip **Hamiltonian path**); (2) **de Bruijn graph** — pecah read menjadi **k-mer**, jadikan k-mer sebagai node dan tumpang tindih (k-1) sebagai edge, lalu cari jalur **Eulerian** yang melintasi setiap edge. Pendekatan de Bruijn menjadi standar untuk read pendek karena lebih skalabel.
> >
> > Tantangan intinya mirip masalah komputasi nyata: **repeat** (sekuens berulang) menciptakan jalur ambigu pada graf, **error sequencing** menambah node/edge palsu, dan ukuran data raksasa menuntut struktur data efisien (hash k-mer, FM-index). Inilah mengapa **bioinformatics** — penerapan **metode komputasional** untuk penyimpanan dan analisis data biologis — menjadi tak terpisahkan dari genomika modern, lengkap dengan basis data publik untuk menyimpan dan mencari sekuens.

> [!cornell] #### Summary
>
> **Human Genome Project** (1990-2003) mendorong **high-throughput sequencing** dan pendekatan **whole-genome shotgun** (Venter): genom dipecah menjadi **fragmen acak** yang diklon, disekuens, lalu disusun ulang. **Assembly problem** — merangkai banyak **read pendek yang overlap** menjadi sekuens kontinu — diselesaikan oleh **program komputer**, secara komputasional dimodelkan sebagai **de-novo assembly** via **Overlap-Layout-Consensus** (Hamiltonian-like) atau **de Bruijn graph** (k-mer, Eulerian path), dengan tantangan **repeat** dan **error**. **Bioinformatics** dan basis data menyimpan serta menganalisis data raksasa ini — fondasi bagi [[Comparative Genomics and Evolutionary Analysis]] dan terkait [[DNA Structure, Replication, and Repair Machinery]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Coverage, Contig, dan Scaffold
>
> "Coverage" (mis. 30x) berarti rata-rata setiap basa terbaca oleh 30 read — redundansi ini sekaligus menutup error acak dan menyediakan overlap untuk assembly. Hasil rangkaian read disebut **contig**; contig yang diurutkan dan diberi jarak (lewat paired-end reads) membentuk **scaffold**. Genom referensi modern adalah hasil iteratif dari proses ini, terus diperbaiki seiring teknologi long-read (PacBio, Nanopore) mengurangi ambiguitas akibat repeat.
>
> #### CS Angle: Mengapa de Bruijn Menang untuk Short Reads
>
> OLC butuh menghitung overlap antar setiap pasang read — mahal saat read berjumlah ratusan juta. de Bruijn graph mengubah masalah menjadi pencarian **Eulerian path** (yang bisa diselesaikan dalam waktu linear terhadap jumlah edge), dengan harga memecah read menjadi k-mer dan kepekaan terhadap pemilihan **k**. Trade-off ini — Hamiltonian (NP-hard, intuitif) vs Eulerian (efisien, butuh transformasi) — adalah studi kasus bagus tentang memilih representasi graf yang tepat.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan greedy assembler: dari daftar string pendek, gabung berulang pasangan dengan overlap terpanjang menjadi superstring.
> 2. Bangun de Bruijn graph dari k-mer sebuah string pendek dan telusuri Eulerian path untuk merekonstruksi string asli; amati efek menambah sekuens berulang.
> 3. Pakai data publik kecil (mis. genom virus) lalu jalankan assembler seperti SPAdes/Velvet dan bandingkan jumlah contig pada k berbeda.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Bab 18 — Concept 18.1 & 18.2 (Human Genome Project, Bioinformatics).
> - Compeau, Pevzner & Tesler (2011). *How to apply de Bruijn graphs to genome assembly*. Nature Biotechnology.
> - Venter, J.C. et al. (2001). *The Sequence of the Human Genome*. Science.
