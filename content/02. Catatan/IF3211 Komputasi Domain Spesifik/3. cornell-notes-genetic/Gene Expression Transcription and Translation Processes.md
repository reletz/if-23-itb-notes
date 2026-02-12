---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Ekspresi Gen: Proses Transkripsi dan Translasi
>
> > ### Pertanyaan/Petunjuk
> > 
> > - Bagaimana alur informasi genetik dari DNA ke protein?
> > - Apa perbedaan antara transkripsi dan translasi?
> > - Mengapa kode genetik bersifat hampir universal?
> > - Bagaimana struktur tRNA memungkinkan fungsi penerjemahan?
> > - Apa dampak mutasi titik pada produksi protein?
> > 
> > ### Poin Referensi
> > 
> > - Lecture_01_DFS.pptx (Halaman 28-31, 31-34)
> > - Campbell Biology in Focus (Halaman 31-35, 42-47)
> > - Genetics Tools (Halaman 82-94)
>
> > ### Alur Informasi Genetik
> Ekspresi gen merupakan proses pengubahan informasi genetik dalam DNA menjadi produk fungsional (protein). Proses ini terdiri dari dua tahap utama: **transkripsi** (di nukleus) dan **translasi** (di sitoplasma). DNA berfungsi sebagai cetakan untuk sintesis RNA messenger (mRNA) dalam transkripsi. mRNA kemudian dibawa ke ribosom untuk diterjemahkan menjadi urutan asam amino.
> > 
> > Contoh analogi: DNA seperti buku resep masakan di perpustakaan (nukleus), mRNA seperti fotokopi resep yang dibawa ke dapur (sitoplasma), dan protein seperti hidangan jadi yang dimasak sesuai resep.
> > 
> > ### Mekanisme Transkripsi
> > Transkripsi dimulai dengan pembukaan pilinan DNA oleh enzim **RNA polimerase**. Proses ini melibatkan tiga tahap:
> > 1. **Inisiasi**: RNA polimerase menempel pada promotor (daerah spesifik DNA)
> > 2. **Elongasi**: Penambahan nukleotida RNA secara berurutan sepanjang cetakan DNA
> > 3. **Terminasi**: Pelepasan RNA polimerase setelah mencapai sinyal terminasi
> > 
> > Contoh pada gen hemoglobin: DNA mengandung urutan CTG-CTC, mRNA hasil transkripsinya adalah GAC-GAG yang mengkode asam amino glutamat.
> > 
> > ### Proses Translasi
> > Translasi mengubah kode mRNA menjadi rantai polipeptida dengan bantuan **transfer RNA (tRNA)** dan ribosom. Setiap tRNA memiliki:
> > - **Antikodon** yang berpasangan dengan kodon mRNA
> > - Situs pengikatan asam amino spesifik
> > 
> > Tahapan translasi:
> > 1. **Inisiasi**: Subunit ribosom kecil mengikat mRNA dan tRNA inisiator
> > 2. **Elongasi**: Penambahan asam amino sesuai urutan kodon
> > 3. **Terminasi**: Penghentian saat mencapai kodon stop (UAA, UAG, UGA)
> > 
> > Contoh penyakit: Mutasi pada gen hemoglobin menyebabkan substitusi asam amino glutamat menjadi valin, menghasilkan hemoglobin abnormal penyebab anemia sel sabit.
> > 
> > ### Universalitas Kode Genetik
> Kode genetik bersifat hampir universal di semua organisme, dengan 64 kodon yang mengkode 20 asam amino. Ini menunjukkan nenek moyang evolusioner yang sama. Contoh: kodon AUG mengkode metionin pada manusia dan bakteri. Pengecualian terdapat pada beberapa protozoa dan mitokondria.
>

> [!cornell] #### Ringkasan
>
> **Ekspresi gen** melibatkan **transkripsi** DNA menjadi mRNA di nukleus dan **translasi** mRNA menjadi protein di ribosom. Transkripsi bergantung pada RNA polimerase yang membuka pilinan DNA, sedangkan translasi menggunakan tRNA sebagai adaptor pengkode asam amino. **Kode genetik** yang hampir universal memungkinkan transfer gen antar spesies. **Mutasi titik** dapat mengubah urutan asam amino dan menyebabkan penyakit genetik seperti anemia sel sabit. Pemahaman proses ini menjadi dasar rekayasa genetika dan terapi gen.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Analisis Kompleksitas Translasi
> Translasi melibatkan >100 protein dan RNA berbeda. Faktor inisiasi eIF4E mengikat tutup 5' mRNA, sementara kompleks eIF3 merekrut subunit ribosom 40S. Energi yang dibutuhkan: 1 GTP untuk pengikatan setiap tRNA, dan 1 GTP lain untuk translokasi ribosom. Pada eukariota, rata-rata kecepatan translasi 5-6 asam amino/detik.
>
> #### Mekanisme Proofreading tRNA
> Enzim aminoasil-tRNA sintetase melakukan proofreading dua tahap:
> 2. Pemeriksaan sterik (kesesuaian bentuk asam amino dengan situs aktif)
> 3. Pemeriksaan hidrolitik (pemutusan ikatan jika terjadi kesalahan)
> Tingkat kesalahan hanya 1 per 10^4-10^5 reaksi, menjaga akurasi translasi.
>
> #### Teknik Visualisasi Ekspresi Gen
> 4. **Northern blot**: Deteksi mRNA spesifik menggunakan probe DNA
> 5. **RT-PCR**: Amplifikasi cDNA dari mRNA
> 6. **Microarray**: Analisis ekspresi ribuan gen sekaligus
> 7. **RNA-Seq**: Sekuensing seluruh transkriptom menggunakan NGS
>
> #### Proyek Eksperimen Mandiri
> 8. **Simulasi mutasi genetik**: Ubah satu basa pada urutan DNA virtual (misal: ATG CTT → ATG CAT), lalu prediksi dampaknya pada protein
> 9. **Analisis sekuens gen NCBI**: Unduh sekuens gen hemoglobin manusia (HBB) dari GenBank dan identifikasi lokasi ekson-intron
> 10. **Desain primer PCR**: Gunakan tools online (misal Primer3) untuk mendesain primer amplifikasi gen target
>
> #### Alat dan Sumber Belajar
> - **Visualisasi proses**: Protein Data Bank (PDB), Jmol software
> - **Database gen**: NCBI GenBank, Ensembl Genome Browser
> - **Alat analisis**: BLAST untuk alignment sequence, ExPASy untuk analisis protein
>
> #### Bacaan Lanjutan
> - "Molecular Biology of the Gene" oleh Watson et al. (Bab 12-15)
> - "RNA Processing and Human Disease" (Jurnal Cell, Edisi Khusus 2023)
> - MOOC: Coursera "Introduction to Genetics and Evolution"