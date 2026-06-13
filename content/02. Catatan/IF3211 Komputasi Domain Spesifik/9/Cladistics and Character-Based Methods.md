---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Cladistics and Character-Based Methods
>
> > ## Questions/Cues
> >
> > - Apa itu **clade**, dan kapan sebuah taxon setara dengan clade?
> > - Apa perbedaan kelompok **monophyletic**, **paraphyletic**, dan **polyphyletic**?
> > - Apa beda **shared ancestral character** dan **shared derived character** (synapomorphy)?
> > - Bagaimana **ingroup** dan **outgroup** dipakai untuk menyimpulkan polaritas karakter?
> > - Apa makna **branch length** pada pohon, dan bagaimana karakter dipetakan sebagai matriks?
> >
> > ## Reference Points
> >
> > - IF3211 — Phylogeny (PPT 10, bagian Cladistics)
> > - IF3211 — Phylogeny (PPT 10, bagian Shared Ancestral and Shared Derived Characters)
>
> > ### Clade dan Tiga Jenis Pengelompokan
> >
> > **Cladistics** mengklasifikasikan organisme berdasarkan **common descent**. Sebuah **clade** adalah kelompok yang mencakup **satu spesies leluhur DAN semua keturunannya**. Clade dapat bersarang di dalam clade lebih besar, tetapi **tidak semua pengelompokan adalah clade**. Sebuah taxon setara dengan clade hanya jika ia **monophyletic**:
> >
> > - **Monophyletic** (clade sejati): leluhur + **semua** keturunannya. Valid.
> > - **Paraphyletic**: leluhur + **sebagian** keturunannya (ada yang dikeluarkan). Tidak valid sebagai clade — mis. "reptil" tanpa burung.
> > - **Polyphyletic**: kumpulan spesies yang **tidak** menyertakan most recent common ancestor-nya — dikelompokkan karena ciri analog. Tidak valid.
> >
> > ### Shared Ancestral vs Shared Derived Characters
> >
> > Organisme punya sebagian ciri yang **diwarisi** dari leluhur dan sebagian yang **berubah/baru**.
> >
> > - **Shared ancestral character** (plesiomorphy): ciri yang sudah ada pada leluhur taxon — tidak informatif untuk membedakan sub-kelompok di dalamnya.
> > - **Shared derived character** (**synapomorphy**): **kebaruan evolusi** yang unik pada satu clade — inilah penanda yang memberi tahu kita siapa berkerabat dengan siapa.
> >
> > Menentukan di clade mana sebuah shared derived character pertama kali muncul membantu menyimpulkan hubungan evolusi. Satu derived character diasumsikan **muncul hanya sekali** dalam ingroup (asumsi parsimoni — lihat [[Maximum Parsimony and Tree Reconstruction]]).
> >
> > ### Ingroup, Outgroup, dan Polaritas Karakter
> >
> > Untuk membedakan ancestral dari derived, kita perlu titik acuan:
> >
> > - **Ingroup**: kelompok spesies yang sedang dipelajari.
> > - **Outgroup**: spesies/kelompok yang berkerabat dekat tetapi **bukan** bagian ingroup, divergen lebih awal.
> >
> > Logikanya: ciri yang ditemukan **pada outgroup maupun ingroup** diasumsikan **ancestral**; ciri yang **hanya** muncul di dalam ingroup diasumsikan **derived**. Outgroup berfungsi sebagai "kalibrator polaritas" — memberi tahu arah perubahan (state lama → state baru).
> >
> > ### Branch Lengths dan Pohon Berproporsi
> >
> > Pada sebagian pohon, **branch length** bermakna kuantitatif:
> >
> > - **Proporsional terhadap perubahan genetik**: panjang cabang = jumlah perubahan basa DNA pada lineage itu (phylogram).
> > - **Proporsional terhadap waktu**: panjang cabang = waktu kronologis dari catatan fosil (lihat [[Molecular Clocks and the Three Domains of Life]]).
> >
> > ### Computational Framing: Karakter sebagai Matriks dan Pohon sebagai Klasifikasi
> >
> > Bagi mahasiswa informatika, data cladistic adalah **matriks karakter**: baris = taxa, kolom = karakter (fitur), sel = **state** (0/1 atau diskret). Ini identik dengan **feature matrix** pada machine learning. Sebuah **synapomorphy** = fitur yang nilainya "1" tepat pada himpunan taxa yang membentuk satu **subtree** — yakni fitur yang **kompatibel** dengan struktur pohon. Mendeteksi monophyly = menanyakan apakah suatu himpunan daun membentuk **subtree lengkap** (semua keturunan dari satu node, tanpa kebocoran) — sebuah query pada tree, mirip uji "apakah node X adalah lowest common ancestor dari tepat himpunan ini".
> >
> > Outgroup berperan sebagai **root**: menambahkan outgroup ke pohon tak-berakar (*unrooted*) menentukan arah waktu, persis seperti memilih root mengubah parent–child pada tree. Konflik antar karakter (karakter yang tak bisa sama-sama benar pada satu pohon) = **homoplasy**, yang diukur dengan **consistency/retention index** dan diminimalkan oleh pencarian parsimoni.

> [!cornell] #### Summary
>
> **Cladistics** mengelompokkan berdasarkan **common descent**: sebuah **clade** = leluhur + **semua** keturunan, dan hanya kelompok **monophyletic** yang setara clade — berbeda dari **paraphyletic** (sebagian keturunan) dan **polyphyletic** (tanpa MRCA). Yang membangun pohon adalah **shared derived character (synapomorphy)**, bukan **shared ancestral character**; polaritasnya ditentukan dengan membandingkan **ingroup** vs **outgroup** (ciri yang ada di keduanya = ancestral). **Branch length** dapat mewakili jumlah perubahan genetik atau waktu. Secara komputasi, data ini adalah **character/feature matrix**, monophyly adalah query subtree, dan synapomorphy adalah fitur yang kompatibel dengan topologi — fondasi untuk pencarian pohon di [[Maximum Parsimony and Tree Reconstruction]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Kenapa "Reptil" dan "Ikan" Bermasalah
>
> "Reptilia" tradisional adalah kelompok **paraphyletic** karena mengeluarkan **burung**, padahal burung adalah keturunan dari nenek moyang reptil (lebih dekat ke buaya daripada buaya ke kadal). Cladistic murni menolak nama paraphyletic dan memperkenalkan clade seperti **Archosauria** (buaya + dinosaurus + burung) dan **Sauropsida**. Demikian pula "ikan" dan "invertebrata" adalah pengelompokan parafiletik/polifiletik yang tidak mencerminkan satu cabang evolusi tunggal.
>
> #### CS Angle: Character Compatibility dan Perfect Phylogeny
>
> Pertanyaan "apakah ada satu pohon yang menjelaskan semua karakter tanpa konflik" adalah **Perfect Phylogeny Problem**. Untuk karakter biner, ini dapat diuji dalam waktu polinomial dengan **four-gamete test** (dua karakter kompatibel jika tidak ketiga/empat kombinasi 00/01/10/11 muncul bersama). Bila kompatibel, pohon dapat dibangun langsung; bila tidak, ada **homoplasy** dan kita jatuh ke optimisasi (parsimony/likelihood). Ini menghubungkan cladistics langsung ke teori graf dan set theory.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat character matrix biner untuk 5 hewan (mis. punya tulang belakang, punya bulu, dll), lalu rekonstruksi pohon manual dengan outgroup sebagai acuan.
> 2. Implementasikan **four-gamete test** untuk memeriksa kompatibilitas pasangan karakter pada matriks itu.
> 3. Tunjukkan dengan contoh konkret bagaimana mengeluarkan satu taxon mengubah kelompok dari monophyletic menjadi paraphyletic.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 20 — *Cladistics*.
> - Hennig, W. *Phylogenetic Systematics* (1966) — karya pendiri cladistics.
> - Gusfield, D. *Algorithms on Strings, Trees, and Sequences* — bab Perfect Phylogeny.
