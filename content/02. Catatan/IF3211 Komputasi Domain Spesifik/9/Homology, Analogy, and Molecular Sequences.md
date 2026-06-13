---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Homology, Analogy, and Molecular Sequences
>
> > ## Questions/Cues
> >
> > - Apa itu **homology** dan mengapa hanya homology yang boleh dipakai untuk menyimpulkan filogeni?
> > - Bagaimana membedakan **homology** dari **analogy** (convergent evolution)?
> > - Bagaimana sekuens **DNA/protein** dipakai sebagai bukti molekuler?
> > - Mengapa **insertion/deletion** menyulitkan perbandingan sekuens, dan bagaimana **alignment** mengatasinya?
> > - Bagaimana filogeni dipakai untuk **identifikasi spesies** dari sampel DNA?
> >
> > ## Reference Points
> >
> > - IF3211 — Phylogeny (PPT 10, bagian Morphological and Molecular Homologies)
> > - IF3211 — Phylogeny (PPT 10, bagian Evaluating Molecular Homologies & Applying Phylogenies)
>
> > ### Homology versus Analogy
> >
> > Kemiripan fenotipik maupun genetik akibat **shared ancestry** disebut **homology**. Organisme dengan morfologi atau sekuens DNA yang sangat mirip cenderung berkerabat lebih dekat. Namun systematist harus berhati-hati: tidak semua kemiripan berasal dari nenek moyang bersama.
> >
> > **Analogy** adalah kemiripan akibat **convergent evolution** — kelompok yang tidak berkerabat beradaptasi terhadap tekanan lingkungan serupa sehingga berkembang ciri mirip secara independen. Contoh dari materi: **legless lizard** dan ular tampak serupa tetapi berevolusi dari lineage kadal berkaki yang berbeda; bentuk tubuh tak-berkaki muncul berkali-kali secara mandiri. Kaidah kunci: **hanya homology** yang boleh dipakai untuk menyimpulkan filogeni; analogy adalah "sinyal palsu" yang harus disaring.
> >
> > Aturan praktis pembeda: semakin **kompleks** dua struktur yang cocok hingga ke detail, semakin kecil kemungkinan kecocokan itu kebetulan — sehingga semakin mungkin itu homology, bukan analogy.
> >
> > ### Bukti Molekuler: Sekuens DNA dan Protein
> >
> > **Molecular homology** dinilai dari **derajat kemiripan sekuens nukleotida** antar taxa. Karena DNA dan protein adalah deretan simbol diskret (A/C/G/T atau 20 asam amino), perbandingannya jauh lebih objektif dan dapat dihitung dibanding morfologi. Sekuens yang lambat berevolusi (mis. gen rRNA) cocok untuk kekerabatan jauh; sekuens cepat berubah cocok untuk kekerabatan dekat.
> >
> > ### Tantangan Insertion/Deletion dan Sequence Alignment
> >
> > Masalah besar: **satu insersi atau delesi nukleotida menggeser seluruh sekuens** (frame shift posisi), membuat dua sekuens yang sebetulnya sangat mirip tampak penuh **mismatch**. Solusinya adalah **sequence alignment** — menyisipkan **gap** ("—") sehingga posisi yang homolog kembali sejajar kolom demi kolom. Materi menegaskan bahwa **program komputer** dipakai untuk mencari kecocokan genetik dengan membandingkan potongan DNA berbagai panjang. Materi juga memperingatkan **coincidental match**: kecocokan pendek bisa muncul secara kebetulan, sehingga panjang dan signifikansi statistik kecocokan harus dievaluasi.
> >
> > ### Computational Framing: Alignment sebagai Edit Distance / Dynamic Programming
> >
> > Bagi mahasiswa informatika, alignment dua sekuens adalah persoalan **edit distance** klasik. Menyisipkan gap = operasi *insertion/deletion*; mismatch = *substitution*. Mencari alignment terbaik = memaksimalkan skor (atau meminimalkan cost) atas semua kemungkinan penyelarasan — diselesaikan dengan **dynamic programming**:
> >
> > - **Needleman–Wunsch** — *global alignment*, mengisi matriks DP berukuran *(m+1)×(n+1)* dengan rekurensi `F[i][j] = max(match/mismatch diagonal, gap atas, gap kiri)`, kompleksitas **O(mn)**, lalu traceback.
> > - **Smith–Waterman** — varian *local alignment* (klamp ke 0) untuk menemukan region mirip.
> > - **BLAST** — heuristik *seed-and-extend* yang menukar optimalitas DP dengan kecepatan untuk pencarian database besar; inilah "program komputer" yang dimaksud materi.
> >
> > "Coincidental match" pada slide adalah persis alasan BLAST melaporkan **E-value**: probabilitas kecocokan sebaik itu muncul secara kebetulan di database, sebuah uji signifikansi statistik.

> [!cornell] #### Summary
>
> Kemiripan akibat nenek moyang bersama adalah **homology**; kemiripan akibat **convergent evolution** adalah **analogy** — dan hanya **homology** yang sah untuk merekonstruksi filogeni. Bukti molekuler menilai **kemiripan sekuens** DNA/protein, tetapi **insertion/deletion** menggeser sekuens sehingga diperlukan **sequence alignment** (penyisipan **gap**) agar posisi homolog sejajar, dengan kewaspadaan terhadap **coincidental match**. Secara komputasi, alignment adalah persoalan **edit distance** yang diselesaikan **dynamic programming** (**Needleman–Wunsch**, **Smith–Waterman**) atau heuristik **BLAST** dengan **E-value**. Filogeni berbasis sekuens bahkan dipakai untuk **identifikasi spesies** (kasus "whale meat"). Sekuens hasil alignment inilah input untuk metode di [[Cladistics and Character-Based Methods]] dan [[Maximum Parsimony and Tree Reconstruction]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: DNA Barcoding dan Identifikasi Spesies
>
> Materi memuat *inquiry* terkenal: sampel yang dijual sebagai "whale meat" diidentifikasi spesiesnya lewat filogeni berbasis DNA. Praktik ini diformalkan sebagai **DNA barcoding** — menggunakan penanda standar (mis. gen **COI/CO1** pada hewan) yang disimpan di database **BOLD**. Identifikasi = align sampel terhadap referensi, lalu tempatkan pada pohon untuk melihat dengan taxon mana ia paling dekat. Aplikasi nyata: forensik satwa liar, deteksi pemalsuan makanan, dan **metabarcoding** lingkungan.
>
> #### CS Angle: Multiple Sequence Alignment itu NP-hard
>
> Menyelaraskan **dua** sekuens itu polinomial (O(mn)), tetapi **multiple sequence alignment (MSA)** untuk banyak sekuens sekaligus dengan skor sum-of-pairs adalah **NP-hard** — ruang kemungkinan meledak. Karena itu tool praktis (**Clustal**, **MUSCLE**, **MAFFT**) memakai pendekatan **progressive alignment**: bangun *guide tree* dari kemiripan berpasangan lalu gabungkan bertahap. Substitusi tidak diberi bobot seragam: matriks seperti **BLOSUM/PAM** memberi skor berbeda per pasangan asam amino, mencerminkan probabilitas evolusi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan **Needleman–Wunsch** untuk dua string DNA, cetak matriks DP dan alignment hasil traceback.
> 2. Gunakan **BLAST** (NCBI web) pada sekuens pendek dan amati bagaimana **E-value** berubah ketika sekuens diperpanjang/dipotong — kaitkan dengan "coincidental match".
> 3. Buat contoh dua sekuens yang sangat mirip lalu sisipkan 1 nukleotida di awal; tunjukkan bagaimana tanpa gap penyelarasan menjadi penuh mismatch.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 20 — *Sorting Homology from Analogy*.
> - Durbin, Eddy, Krogh, Mitchison — *Biological Sequence Analysis* (Cambridge, 1998).
> - Altschul et al. (1990) — *Basic Local Alignment Search Tool (BLAST)*.
