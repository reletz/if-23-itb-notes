---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Molecular Basis of Inheritance: DNA Structure and Replication
>
> > ## Questions/Cues
> >
> > - Mengapa eksperimen Griffith penting dalam genetika?
> > - Bagaimana struktur heliks ganda DNA ditemukan?
> > - Apa perbedaan replikasi DNA prokariotik dan eukariotik?
> > - Bagaimana enzim DNA polimerase memperbaiki kesalahan replikasi?
> > - Apa aplikasi praktis sistem CRISPR-Cas9?
> >
> > ## Reference Points
> >
> > - Genetics [part 2] (Halaman 5-24)
> > - Campbell Biology in Focus Chapter 13 (Halaman 5-24)
> >
>
> > ### Penemuan DNA sebagai Materi Genetik
> > Frederick Griffith (1928) menemukan fenomena transformasi bakteri melalui eksperimen dengan strain pneumokokus patogen (S) dan non-patogen (R). Saat DNA strain S yang dimatikan dicampur dengan strain R hidup, beberapa bakteri R berubah menjadi patogen. Ini menunjukkan adanya "prinsip transformasi" yang kemudian diidentifikasi sebagai DNA. Eksperimen ini menjadi dasar pemahaman bahwa DNA membawa informasi genetik.
> > Bukti tambahan berasal dari penelitian Alfred Hershey dan Martha Chase (1952) menggunakan bakteriofag. Mereka membuktikan bahwa DNA virus, bukan protein, yang masuk ke sel bakteri dan mengarahkan replikasi virus. Partikel virus diberi label radioaktif: DNA dengan fosfor-32 dan protein dengan sulfur-35. Setelah infeksi, hanya DNA yang ditemukan dalam sel bakteri.
> > ### Struktur Heliks Ganda DNA
> > James Watson dan Francis Crick (1953) mengusulkan model heliks ganda DNA berdasarkan data difraksi sinar-X Rosalind Franklin dan penelitian Chargaff tentang pasangan basa. Struktur DNA terdiri dari:
> > 1. Dua untai polinukleotida antiparalel
> > 2. Rangkaian gula-fosfat sebagai tulang punggung
> > 3. Basa nitrogen (Adenin-Timin, Guanin-Sitosin) berikatan hidrogen di tengah
> > Model ini menjelaskan mekanisme replikasi melalui pembukaan heliks dan penyusunan untai komplementer. Analoginya seperti ritsleting yang terbuka dan masing-masing sisi digunakan sebagai cetakan untuk membuat pasangan baru.
> > ### Replikasi DNA secara Semikonservatif
> > Replikasi DNA mengikuti model semikonservatif dimana setiap molekul DNA baru terdiri dari satu untai induk dan satu untai baru. Proses ini melibatkan:
> > 1. **Inisiasi**: Helicase membuka heliks di origin of replication, membentuk garpu replikasi
> > 2. **Elongasi**: DNA polimerase III mensintesis untai baru (5'→3') dengan bantuan primer RNA
> > 3. **Terminasi**: Terjadi saat dua garpu replikasi bertemu
> > Pada prokariot, replikasi dimulai dari satu titik (OriC), sedangkan eukariot memiliki banyak titik awal. Contoh: Replikasi kromosom E. coli membutuhkan ~40 menit dengan kecepatan 1000 nukleotida/detik.
> > ### Mekanisme Perbaikan DNA
> > Sistem perbaikan menjaga integritas genom:
> > 1. **Proofreading**: DNA polimerase mendeteksi dan mengganti basa salah selama replikasi (kesalahan 1:10^5 menjadi 1:10^7)
> > 2. **Perbaikan Mismatch**: Enzim MutS/L memperbaiki kesalahan yang terlewat
> > 3. **Nucleotide Excision Repair (NER)**: Memperbaiki kerusakan akibat UV dengan memotong dan mengganti segmen rusak
> > Contoh klinis: Mutasi pada gen MLH1 (sistem mismatch repair) meningkatkan risiko kanker kolon karena akumulasi kesalahan genetik.
> > ### Aplikasi Teknologi DNA: CRISPR-Cas9
> > Sistem CRISPR-Cas9 merupakan alat editing gen yang diadaptasi dari pertahanan bakteri. Komponen utama:
> > 1. Cas9: Endonuklease yang memotong DNA
> > 2. guide RNA: Mengarahkan Cas9 ke lokasi target spesifik
> > Aplikasi medis termasuk terapi gen untuk penyakit keturunan dan pengendalian nyamuk malaria dengan "gene drive" yang menyebarkan gen modifikasi ke populasi liar. Tantangan etis muncul terkait potensi penyalahgunaan teknologi.

> [!cornell] #### Ringkasan
>
> **DNA** merupakan materi genetik yang strukturnya berupa **heliks ganda antiparalel** dengan pasangan basa komplementer (A-T, G-C). Replikasi DNA terjadi secara **semikonservatif** melalui tiga tahap utama (inisiasi, elongasi, terminasi) dengan bantuan enzim seperti helicase dan DNA polimerase. **Mekanisme perbaikan** seperti proofreading dan NER menjaga akurasi replikasi dengan tingkat kesalahan sangat rendah (1:10^10). Teknologi berbasis DNA seperti **CRISPR-Cas9** memungkinkan manipulasi genetik presisi tinggi, meskipun memunculkan pertimbangan etis penting.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Analisis Kompleksitas Enzim Replikasi
> DNA polimerase prokaryotik (seperti Pol III pada E. coli) memiliki aktivitas eksonuklease 3'→5' untuk proofreading. Struktur cincin sliding clamp (protein β) meningkatkan prosesivitas enzim hingga >50.000 nukleotida. Pada eukariot, kompleks replisom melibatkan Pol δ (untai leading) dan Pol ε (untai lagging) dengan koordinasi melalui PCNA (Proliferating Cell Nuclear Antigen).
>
> #### Teknik Deteksi Kerusakan DNA
> 1. **Comet Assay**: Mengukur kerusakan DNA sel tunggal dengan elektroforesis
> 2. **γH2AX Foci**: Mendeteksi double-strand breaks menggunakan antibodi fluoresen
> 3. **Mass Spectrometry**: Mengidentifikasi modifikasi basa seperti 8-oxoguanin
>
> #### CRISPR-Cas9 Lanjutan
> Variasi Cas9 seperti "nickase" (Cas9D10A) hanya memotong satu untai DNA untuk mengurangi efek off-target. Sistem turunan seperti Cas12/Cas13 menargetkan RNA. Aplikasi terbaru meliputi base editing tanpa memutus untai ganda dan epigenome editing dengan Cas9 fusi ke domain metiltransferase.
>
> #### Proyek Eksplorasi Mandiri
> 1. **Visualisasi Replikasi DNA**: Gunakan software Pymol untuk memodelkan interaksi antara DNA polimerase dan DNA pada berbagai tahap replikasi
> 2. **Simulasi Sistem CRISPR**: Eksplorasi platform Benchling untuk mendesain guide RNA target gen HBB (penyebab thalassemia)
>
> #### Bacaan Lanjut
> - Watson, J.D. *The Double Helix: A Personal Account of the Discovery of the Structure of DNA*
> - Doudna, J.A. & Charpentier, E. (2014) *The New Frontier of Genome Engineering with CRISPR-Cas9*
> - Database PDB: Struktur 3D kompleks replikosom (ID: 5V0C)
> - Tutorial CRISPR Design: https://www.addgene.org/crispr/guide/