---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Comparative Genomics and Evolutionary Analysis
>
> > ## Questions/Cues
> >
> > - Apa itu **genomics** dan **comparative genomics**?
> > - Mengapa ukuran genom tidak berkorelasi sederhana dengan kompleksitas organisme?
> > - Apa makna perbedaan **1.2%** antara genom manusia dan simpanse?
> > - Apa beda **conserved genes** dan gen yang berevolusi cepat?
> > - Bagaimana **sequence alignment** dipakai untuk merekonstruksi sejarah evolusi?
> >
> > ## Reference Points
> >
> > - IF3211 — Genetics (PPT 3 & 4, bagian Genomes and Their Evolution / Comparing Species)
>
> > ### Genomics dan Variasi Ukuran Genom
> >
> > **Genomics** adalah studi tentang keseluruhan set gen dan interaksinya, sementara **comparative genomics** membandingkan genom antar-spesies untuk menyingkap evolusi. Ribuan genom telah disekuens, dan puluhan ribu lagi sedang dikerjakan, ditambah puluhan ribu **metagenome**.
> >
> > **Ukuran genom** sangat bervariasi: genom bakteri dan archaea berkisar **1-6 juta pasang basa (Mb)**, sedangkan eukariot biasanya lebih besar — kebanyakan tumbuhan dan hewan >100 Mb, dan manusia sekitar **3.000 Mb**. Yang menarik, **tidak ada hubungan sistematis** antara ukuran genom dan fenotipe/kompleksitas dalam satu domain. Manusia (~21.000 gen) tidak punya jauh lebih banyak gen daripada beberapa organisme yang tampak lebih sederhana — sebuah kejutan yang dikenal sebagai "C-value paradox".
> >
> > ### Membandingkan Spesies yang Berkerabat Jauh vs Dekat
> >
> > Untuk spesies **berkerabat jauh**, **highly conserved genes** — gen yang tetap mirip selama miliaran tahun — menjadi penanda untuk memperjelas hubungan. Bakteri, archaea, dan eukariot diperkirakan menyimpang **2-4 miliar tahun lalu**, dan gen lestari membantu merekonstruksi pohon kehidupan tersebut serta menegaskan relevansi **organisme model** bagi biologi manusia.
> >
> > Untuk spesies **berkerabat dekat**, genom umumnya tersusun serupa sehingga perbedaan genetik dapat dengan mudah **dikorelasikan dengan perbedaan fenotipe**. Manusia dan **simpanse** berbeda hanya **1.2%** pada single base pairs, dan **2.7%** jika menghitung **insertion/deletion**. **Bonobo** adalah kerabat dekat lain; pada sebagian region sekuens manusia lebih mirip simpanse, di region lain lebih mirip bonobo — perbandingan ini memungkinkan **sejarah evolusi terperinci** direkonstruksi.
> >
> > ### Gen yang Berevolusi Cepat dan Makna Fungsionalnya
> >
> > Tidak semua gen berubah dengan laju sama. Beberapa gen **berevolusi lebih cepat pada manusia** dibanding simpanse, termasuk gen yang terlibat dalam **pertahanan terhadap malaria dan tuberkulosis** serta **regulasi ukuran otak**. Gen yang tampaknya berevolusi paling cepat adalah yang mengkode **transcription factor** — protein pengatur yang mengendalikan ekspresi gen lain. Ini menyiratkan bahwa perubahan **regulasi** (kapan/seberapa banyak gen dinyalakan) sering lebih menentukan perbedaan antar-spesies daripada perubahan gen struktural itu sendiri.
> >
> > ### Sudut Pandang Komputasional: Sequence Alignment dan Edit Distance
> >
> > Inti comparative genomics secara komputasi adalah **sequence alignment**: menyejajarkan dua atau lebih sekuens untuk mengukur kemiripan dan menemukan region yang berkorespondensi. Angka seperti "berbeda 1.2%" lahir dari proses ini. Karena evolusi melibatkan **substitution**, **insertion**, dan **deletion** (lihat [[Mutations and Their Molecular Consequences]]), perbandingan bukan sekadar mencocokkan posisi-per-posisi melainkan menghitung **edit distance** — dan ini diselesaikan dengan **dynamic programming** (algoritma **Needleman-Wunsch** untuk global, **Smith-Waterman** untuk lokal).
> >
> > Untuk pencarian cepat dalam basis data raksasa, dipakai heuristik seperti **BLAST**, yang menemukan kecocokan lokal tanpa menyejajarkan setiap pasangan secara penuh. **Conserved genes** muncul sebagai region dengan alignment skor tinggi lintas spesies — bukti seleksi yang menjaga sekuens penting. Dari matriks jarak antar-sekuens, kita dapat membangun **phylogenetic tree** (mis. neighbor-joining), persis seperti **hierarchical clustering**: jarak edit menjadi metrik, dan topologi pohon merekonstruksi urutan percabangan evolusi. Dengan demikian, pertanyaan biologis "siapa berkerabat dengan siapa" diterjemahkan menjadi masalah **string distance** dan **graph/tree inference**.

> [!cornell] #### Summary
>
> **Comparative genomics** membandingkan genom untuk menyingkap evolusi. **Ukuran genom** (bakteri 1-6 Mb, manusia ~3.000 Mb) tidak berkorelasi sederhana dengan kompleksitas. **Conserved genes** menghubungkan spesies berkerabat jauh; untuk yang dekat, manusia-simpanse berbeda **1.2%** (basa tunggal) / **2.7%** (dengan indel), dan perbandingan dengan **bonobo** memungkinkan rekonstruksi sejarah. Gen yang berevolusi tercepat adalah **transcription factor** (regulasi). Secara komputasional ini adalah **sequence alignment** — **edit distance** via **dynamic programming** (Needleman-Wunsch/Smith-Waterman), pencarian cepat dengan **BLAST**, dan rekonstruksi **phylogenetic tree** sebagai clustering atas jarak. Terkait [[Mutations and Their Molecular Consequences]] dan [[Whole-Genome Shotgun Sequencing and Assembly]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa Perbedaan Regulasi Penting
>
> Perbedaan 1.2% terdengar kecil, tetapi atas genom 3 miliar basa itu berarti puluhan juta perbedaan. Yang lebih menentukan bukan hanya jumlah, melainkan **di mana** perbedaan jatuh: perubahan pada **transcription factor** dan elemen regulasi dapat mengubah pola ekspresi banyak gen sekaligus, menjelaskan mengapa manusia dan simpanse begitu berbeda meski sebagian besar protein hampir identik. Inilah inti gagasan "evolution by regulatory change".
>
> #### CS Angle: Dynamic Programming, Scoring Matrix, dan Heuristik
>
> Needleman-Wunsch mengisi matriks (m+1)×(n+1) dengan kompleksitas O(mn) — terlalu lambat untuk membandingkan satu query terhadap miliaran basa, sehingga **BLAST** memakai strategi **seed-and-extend** (cari k-mer cocok dulu, baru perluas). Penilaian memakai **scoring matrix** dan **gap penalty** yang memodelkan biaya substitusi vs indel — analog langsung dengan bobot operasi pada edit distance. Membangun pohon filogenetik dari matriks jarak setara dengan **agglomerative clustering**, menghubungkan biologi evolusi dengan algoritma machine learning klasik.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan Needleman-Wunsch dan sejajarkan dua sekuens pendek; ubah gap penalty dan amati perubahan alignment optimal.
> 2. Ambil gen homolog yang sama dari manusia, simpanse, dan tikus via NCBI, hitung persentase identitas, lalu prediksi urutan percabangan dan bandingkan dengan pohon yang diterima.
> 3. Bangun matriks jarak dari beberapa sekuens dan jalankan neighbor-joining/hierarchical clustering untuk merekonstruksi pohon evolusi.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Bab 18 — Concept 18.6 (Comparing Genome Sequences).
> - Altschul et al. (1990). *Basic Local Alignment Search Tool (BLAST)*. J. Mol. Biol.
> - Durbin et al., *Biological Sequence Analysis* — alignment, HMM, dan phylogeny.
