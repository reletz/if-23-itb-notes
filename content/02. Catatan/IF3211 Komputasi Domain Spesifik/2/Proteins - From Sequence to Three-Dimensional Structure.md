---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Proteins - From Sequence to Three-Dimensional Structure
>
> > ## Questions/Cues
> >
> > - Apa struktur **asam amino** dan apa peran **R group**?
> > - Bagaimana **peptide bond** membentuk **polypeptide**?
> > - Apa **empat tingkat struktur protein** (primer→kuartener)?
> > - Bagaimana struktur menentukan fungsi protein?
> > - Bagaimana **penyakit sickle-cell** muncul dari substitusi satu asam amino?
> >
> > ## Reference Points
> >
> > - IF3211 — Macromolecules (PPT 2, bagian Protein: Amino Acids & Polypeptides)
> > - IF3211 — Macromolecules (PPT 2, bagian Four Levels of Protein Structure)
> > - IF3211 — Macromolecules (PPT 2, bagian Sickle-Cell Disease)
>
> > ### Asam Amino dan Peptide Bond
> >
> > **Protein** menyusun lebih dari 50% massa kering kebanyakan sel dan menjalankan fungsi paling beragam: pertahanan, penyimpanan, transport, komunikasi seluler, gerakan, dan dukungan struktural. Semua protein dibangun dari **20 asam amino (amino acids)** yang sama.
> >
> > Setiap **asam amino** adalah molekul organik dengan **gugus karboksil (–COOH)** dan **gugus amino (–NH₂)** yang menempel pada karbon pusat. Yang membedakan kedua puluh asam amino adalah **rantai samping (side chain)** atau **R group** — yang menentukan sifat (hidrofobik, hidrofilik, bermuatan, dsb).
> >
> > Asam amino dihubungkan oleh **ikatan peptida (peptide bond)** melalui dehydration reaction. Rantai asam amino disebut **polipeptida (polypeptide)** — polimer tak bercabang yang panjangnya dari beberapa hingga lebih dari seribu monomer. Tiap polipeptida punya **urutan linear unik** dengan dua ujung berbeda: **N-terminus (ujung amino)** dan **C-terminus (ujung karboksil)**. Sebuah **protein** adalah satu atau lebih polipeptida yang sudah terlipat menjadi bentuk fungsional.
> >
> > ### Empat Tingkat Struktur Protein
> >
> > Protein memiliki hingga **empat tingkat struktur** yang saling bertumpuk:
> >
> > 1. **Struktur primer (primary)** — **urutan linear asam amino**. Ini adalah "kode" dasar yang menentukan semua tingkat di atasnya.
> > 2. **Struktur sekunder (secondary)** — lipatan dan gulungan lokal: **α-helix** dan **β-pleated sheet**, distabilkan oleh **ikatan hidrogen** antar atom pada *backbone* polipeptida.
> > 3. **Struktur tersier (tertiary)** — bentuk keseluruhan 3D satu polipeptida, ditentukan oleh interaksi antar **R group**: **interaksi hidrofobik** (rantai nonpolar berkumpul di inti protein), **jembatan disulfida (disulphide bridge)** antar sistein, ikatan ionik, dan ikatan hidrogen.
> > 4. **Struktur kuartener (quaternary)** — muncul ketika protein terdiri dari **dua atau lebih rantai polipeptida** yang bergabung (mis. hemoglobin dengan 4 subunit).
> >
> >
> > ```mermaid
> > flowchart TD
> >     P1["Primary<br/>(urutan asam amino)"] --> P2["Secondary<br/>(α-helix &amp; β-sheet)"]
> >     P2 --> P3["Tertiary<br/>(bentuk 3D, interaksi R group)"]
> >     P3 --> P4["Quaternary<br/>(≥ 2 rantai bergabung)"]
> > ```
> >
> >
> > ### Struktur Menentukan Fungsi
> >
> > Prinsip sentral biologi protein: **structure determines function**. Bentuk 3D yang presisi memungkinkan protein mengenali molekul target secara spesifik (mis. enzim ke substrat, antibodi ke antigen). Karena seluruh struktur 3D ditentukan oleh struktur primer, **perubahan sekecil apa pun pada urutan asam amino** berpotensi mengubah lipatan, dan dengan demikian fungsi — bahkan menghancurkannya.
> >
> > ### Sickle-Cell: Satu Substitusi Mengubah Segalanya
> >
> > **Penyakit sickle-cell (sickle-cell disease)** adalah kelainan darah turunan yang muncul dari **substitusi satu asam amino** pada protein **hemoglobin** — asam glutamat digantikan oleh valin pada posisi tertentu. Perubahan satu residu ini membuat molekul hemoglobin saling menempel (agregasi), mengubah bentuk sel darah merah menjadi sabit. Sel sabit dapat menyumbat pembuluh darah kecil, memicu "krisis sickle-cell" yang menyakitkan. Inilah bukti dramatis bahwa **perubahan pada struktur primer** dapat merembet ke seluruh struktur dan fungsi.
> >
> > ### Computational Framing: Sequence→Structure→Function sebagai Encoding & Search
> >
> > Bagi informatika, protein adalah ilustrasi sempurna **pipeline encoding**: **string** (struktur primer, urutan atas alphabet 20 simbol) → **struktur 3D** (hasil "kompilasi/eksekusi") → **fungsi** (perilaku program). Struktur primer ibarat **source code**; lipatan adalah hasil *runtime*-nya. Sickle-cell adalah **single-character mutation** dalam source code yang menyebabkan program ter-*compile* menjadi artefak yang rusak — sebuah *bug* yang merembet dari satu karakter ke kegagalan sistemik.
> >
> > **Protein folding** sendiri adalah **problem pencarian/optimisasi**: dari ruang konformasi yang astronomis besar, protein menemukan struktur ber-energi terendah (paradoks Levinthal). Memprediksinya secara komputasi adalah salah satu tantangan terbesar biologi komputasi, yang sebagian besar dipecahkan oleh **AlphaFold** (DeepMind) — model *deep learning* yang memetakan urutan langsung ke struktur 3D dengan akurasi mendekati eksperimen, mengubah pencarian fisik yang mahal menjadi *inference* yang cepat.

> [!cornell] #### Summary
>
> **Protein** dibangun dari **20 asam amino** (masing-masing dengan **gugus karboksil**, **amino**, dan **R group** pembeda) yang dirangkai oleh **ikatan peptida** menjadi **polipeptida** berarah (N-terminus → C-terminus). Protein punya **empat tingkat struktur**: **primer** (urutan), **sekunder** (α-helix & β-sheet via ikatan hidrogen backbone), **tersier** (bentuk 3D dari interaksi R group termasuk hidrofobik & jembatan disulfida), dan **kuartener** (gabungan ≥2 rantai). Prinsip **structure determines function** berarti perubahan urutan dapat menghancurkan fungsi — dibuktikan oleh **sickle-cell** (substitusi satu asam amino pada hemoglobin). Secara komputasi, ini adalah pipeline **sequence → structure → function** (encoding), dengan **folding** sebagai problem **search/optimisasi** yang kini diselesaikan **AlphaFold**. Lihat dasar polimernya di [[Carbon Chemistry, Macromolecular Classes, and ATP]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Denaturasi dan Chaperone
>
> Lipatan protein dapat rusak oleh panas, pH ekstrem, atau pelarut — proses **denaturasi** yang membuat protein kehilangan struktur 3D dan fungsinya (mirip telur yang matang). Beberapa protein dapat melipat ulang spontan, membuktikan bahwa informasi lipatan sepenuhnya ada pada struktur primer (eksperimen Anfinsen). Di sel, protein **chaperone** membantu lipatan berjalan benar dan mencegah agregasi — analog dengan *runtime supervisor* yang memandu eksekusi agar tidak crash.
>
> #### CS Angle: AlphaFold & Folding sebagai Search
>
> Ruang konformasi protein sangat besar sehingga pencarian acak (paradoks **Levinthal**) mustahil — protein nyata melipat dalam mikrodetik karena *energy landscape* berbentuk corong. Pendekatan klasik (Rosetta, molecular dynamics) memodelkan ini sebagai **optimisasi energi**. **AlphaFold 2** menggantinya dengan **transformer + attention** yang belajar dari database struktur (PDB) + *multiple sequence alignment*, memetakan urutan → koordinat atom. Ini contoh nyata pergeseran dari **pencarian eksplisit** ke **learned inference** — sebuah masalah *search* diubah menjadi *pattern recognition*.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan **model HP** protein folding di grid 2D: representasikan urutan sebagai string `H`/`P`, lalu cari lipatan dengan energi minimum (maksimalkan kontak H–H) menggunakan brute-force lalu *simulated annealing*.
> 2. Ambil urutan hemoglobin normal vs sickle-cell, lakukan *diff* string, dan identifikasi posisi substitusi tunggal secara terprogram (Glu→Val).
> 3. Gunakan **AlphaFold DB** atau ColabFold untuk memprediksi struktur sebuah protein pendek, lalu bandingkan dengan struktur eksperimen di PDB.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 3 — Concept 3.5 *Proteins*.
> - Jumper et al. (2021), *Highly accurate protein structure prediction with AlphaFold*, Nature.
> - Anfinsen (1973), *Principles that Govern the Folding of Protein Chains*, Science.
> - Dill & MacCallum (2012), *The Protein-Folding Problem, 50 Years On*, Science.
