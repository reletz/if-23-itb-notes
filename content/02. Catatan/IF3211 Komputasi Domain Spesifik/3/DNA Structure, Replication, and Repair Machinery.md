---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] DNA Structure, Replication, and Repair Machinery
>
> > ## Questions/Cues
> >
> > - Mengapa model heliks ganda Watson-Crick begitu penting bagi pewarisan sifat?
> > - Apa itu **complementary base pairing** dan mengapa ia memungkinkan penyalinan?
> > - Apa arti replikasi bersifat **semikonservatif** dan enzim apa yang terlibat?
> > - Bagaimana **proofreading** dan **mismatch repair** menjaga akurasi salinan?
> > - Mengapa laju kesalahan akhir DNA bisa serendah satu per 10 miliar nukleotida?
> >
> > ## Reference Points
> >
> > - IF3211 — Genetics (PPT 3 & 4, bagian The Molecular Basis of Inheritance)
>
> > ### Heliks Ganda dan Pasangan Basa Komplementer
> >
> > Pada tahun 1953 **James Watson** dan **Francis Crick** memperkenalkan model **double helix** (heliks ganda) untuk struktur **DNA (deoxyribonucleic acid)**, dengan bantuan data **X-ray crystallography** dari **Rosalind Franklin** dan **Maurice Wilkins**. DNA tersusun dari dua untai (strand) yang saling melilit, dengan "tulang punggung" gula-fosfat di luar dan **basa nitrogen** di dalam.
> >
> > Inti dari model ini adalah **complementary base pairing**: basa **A (adenin)** selalu berpasangan dengan **T (timin)**, dan **G (guanin)** selalu berpasangan dengan **C (sitosin)**. Aturan ini bersifat deterministik — jika kita tahu satu untai, kita otomatis tahu untai pasangannya. Watson dan Crick sendiri mencatat bahwa pasangan basa spesifik ini "menyiratkan mekanisme penyalinan" yang memungkinkan informasi genetik direproduksi di setiap sel tubuh saat **DNA replication**.
> >
> > Analogikan dua untai sebagai dua salinan cermin dari berkas data yang sama: satu untai adalah cetakan (template), untai lainnya adalah turunan yang dapat direkonstruksi penuh dari template karena aturan pasangannya tetap.
> >
> > ### Replikasi Semikonservatif dan Mesin Enzim
> >
> > Replikasi DNA bersifat **semikonservatif**: setiap molekul anak terdiri dari satu untai lama (template) dan satu untai baru yang baru disintesis. Penyalinan ini luar biasa dalam **kecepatan** dan **akurasi**, dan melibatkan **lebih dari selusin enzim dan protein** yang bekerja bersama sebagai sebuah "replication machine".
> >
> > Proses inisiasi dimulai di titik tertentu, untai dibuka oleh **helikase**, lalu **DNA polymerase** menambahkan nukleotida baru satu per satu mengikuti aturan komplementer pada template. Mekanisme ini jauh lebih dipahami pada **bakteri (prokariot)** dibanding **eukariot**, namun sebagian besar tahapannya serupa di kedua kelompok. Karena setiap nukleotida baru ditentukan oleh template, proses ini pada hakikatnya adalah penyalinan informasi dengan redundansi bawaan.
> >
> > ### Proofreading, Mismatch, dan Nucleotide-Excision Repair
> >
> > Akurasi tidak datang gratis — ia ditegakkan oleh beberapa lapis koreksi kesalahan. Pertama, **DNA polymerase** melakukan **proofreading**: ia memeriksa nukleotida yang baru ditambahkan dan **mengganti** yang salah saat itu juga. Kedua, **mismatch repair** menggunakan enzim lain untuk mengoreksi pasangan basa yang keliru setelah sintesis selesai. Sebuah **cacat herediter** pada salah satu enzim mismatch repair dikaitkan dengan satu bentuk **kanker kolon**, karena kesalahan penyebab kanker menumpuk lebih cepat dari normal.
> >
> > Selain kesalahan penyalinan, DNA juga bisa **rusak** oleh agen kimia/fisik (mis. **sinar-X**, sinar ultraviolet) atau berubah spontan. Di sini bekerja **nucleotide-excision repair**: sebuah **nuclease** memotong segmen DNA yang rusak, lalu segmen tersebut disintesis ulang menggunakan untai komplementer sebagai cetakan. Enzim perbaikan di kulit kita, misalnya, memperbaiki kerusakan akibat sinar UV matahari.
> >
> > ### Sudut Pandang Komputasional: Replikasi sebagai Error-Correcting Code
> >
> > Bagi mahasiswa informatika, mesin replikasi DNA paling mudah dipahami sebagai sistem **penyalinan data dengan koreksi kesalahan (error-correcting code)**. Untai komplementer berperan seperti **redundansi/parity**: karena A↔T dan G↔C bersifat saling menentukan, satu untai berfungsi sebagai **checksum** untuk untai lawannya — kerusakan pada satu sisi dapat dipulihkan dari sisi lain (persis seperti yang dilakukan nucleotide-excision repair).
> >
> > Bayangkan pipeline berlapis: (1) DNA polymerase = penulisan data; (2) **proofreading** = pemeriksaan inline mirip *write-verify* pada disk; (3) **mismatch repair** = pemindaian pasca-tulis untuk membandingkan dengan paritas; (4) **excision repair** = pemulihan blok rusak dari salinan redundan. Efek gabungannya: laju kesalahan turun dari ~1 per 100.000 (polymerase saja) menjadi sekitar **1 per 10 miliar (~1e-10)** nukleotida — angka **Bit Error Rate** yang jauh lebih baik daripada banyak medium penyimpanan buatan manusia. Sisa kesalahan yang lolos itulah yang menjadi **mutasi**, bahan baku variasi genetik bagi seleksi alam (lihat [[Mutations and Their Molecular Consequences]]).

> [!cornell] #### Summary
>
> Model **double helix** Watson-Crick menjelaskan pewarisan melalui **complementary base pairing** (A-T, G-C) yang bersifat deterministik, sehingga satu untai cukup untuk merekonstruksi untai lawannya. Replikasi bersifat **semikonservatif** dan dijalankan oleh "replication machine" berisi belasan enzim (helikase, **DNA polymerase**). Akurasi ekstrem (~**1 per 10 miliar**) dicapai oleh lapisan koreksi kesalahan: **proofreading** oleh polymerase, **mismatch repair**, dan **nucleotide-excision repair**. Secara komputasional, untai komplementer berperan sebagai **redundansi/checksum** dan repair sebagai algoritma **error-correcting**; kesalahan sisa menjadi **mutasi** (lihat [[Mutations and Their Molecular Consequences]]) dan menjadi dasar [[Comparative Genomics and Evolutionary Analysis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Leading vs Lagging Strand dan Fidelity Berlapis
>
> DNA polymerase hanya bisa menambah nukleotida pada arah 5'→3', sehingga satu untai disalin kontinu (**leading strand**) dan untai lain disalin terputus-putus sebagai **fragmen Okazaki** yang lalu disambung **DNA ligase**. Fidelity total adalah hasil perkalian beberapa tahap: seleksi basa oleh polymerase (~1e-5), proofreading eksonuklease 3'→5' (memperbaiki ~100x), lalu mismatch repair (~100-1000x), menghasilkan ~1e-10. Ini contoh nyata bagaimana beberapa filter sederhana dirangkai menjadi sistem berakurasi sangat tinggi.
>
> #### CS Angle: Hamming Code dan Hibridisasi sebagai Pencarian
>
> Redundansi A-T/G-C mirip **parity bit** tunggal: ia mendeteksi mismatch tetapi tidak selalu tahu sisi mana yang salah — itulah mengapa sel memakai penanda untai "lama vs baru" (metilasi) agar repair mengoreksi untai yang benar, analog dengan menentukan posisi error pada **Hamming code**. **Nucleic acid hybridization** (pasangan basa antar dua sekuens komplementer) adalah dasar genetic engineering dan setara dengan operasi **string matching**: mencari subsekuens komplementer = mencari pola yang "cocok" dalam basis data sekuens.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis fungsi `reverse_complement(seq)` lalu verifikasi bahwa `reverse_complement(reverse_complement(s)) == s` untuk string DNA acak.
> 2. Simulasikan replikasi dengan probabilitas error 1e-5 per basa pada genom 1 juta basa, lalu tambahkan tahap "proofreading" yang menangkap 99% error; bandingkan jumlah mutasi sebelum dan sesudah.
> 3. Implementasikan parity check sederhana atas blok bit dan diskusikan analoginya dengan mismatch repair.
>
> #### Bacaan Lanjutan
> - Watson, J. & Crick, F. (1953). *Molecular Structure of Nucleic Acids*. Nature 171.
> - Campbell Biology in Focus, 3rd ed., Bab 13 — The Molecular Basis of Inheritance.
> - Alberts et al., *Molecular Biology of the Cell* — bab DNA Replication, Repair, and Recombination.
