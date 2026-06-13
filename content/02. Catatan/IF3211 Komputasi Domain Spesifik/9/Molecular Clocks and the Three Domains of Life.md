---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Molecular Clocks and the Three Domains of Life
>
> > ## Questions/Cues
> >
> > - Apa itu **molecular clock**, dan asumsi apa yang mendasarinya?
> > - Bagaimana molecular clock **dikalibrasi** dengan catatan fosil?
> > - Mengapa kecepatan jam berbeda antar gen, dan apa **masalah** molecular clock?
> > - Bagaimana molecular clock menanggalkan **asal-usul HIV**?
> > - Bagaimana sistem klasifikasi berpindah dari **dua kingdom → lima kingdom → tiga domain**, dan apa peran **horizontal gene transfer**?
> >
> > ## Reference Points
> >
> > - IF3211 — Phylogeny (PPT 10, bagian Molecular Clocks)
> > - IF3211 — Phylogeny (PPT 10, bagian From Two Kingdoms to Three Domains & Horizontal Gene Transfer)
>
> > ### Molecular Clock dan Kalibrasi
> >
> > **Molecular clock** memanfaatkan **laju evolusi yang relatif konstan** pada sebagian gen untuk memperkirakan **waktu absolut** suatu peristiwa evolusi. Asumsi intinya: **jumlah substitusi nukleotida** pada gen yang berkerabat **sebanding** dengan waktu sejak keduanya terakhir berbagi nenek moyang. Jika kita tahu laju "tik" jam itu, jumlah perbedaan sekuens dapat diterjemahkan menjadi durasi waktu.
> >
> > **Kalibrasi** dilakukan dengan **memplot jumlah perubahan genetik terhadap tanggal branch point** yang diketahui dari catatan **fosil**. Garis yang terbentuk memberi laju (perubahan per satuan waktu); titik divergensi yang tidak punya fosil lalu diperkirakan dari garis kalibrasi itu.
> >
> > ### Perbedaan Kecepatan Jam dan Masalahnya
> >
> > Mengapa jam ini bisa bekerja? Sebagian mutasi bersifat **selectively neutral** — tidak berdampak pada fitness — sehingga terakumulasi **teratur seperti jam**. Laju "tik" berbeda antar gen tergantung **seberapa kritis** gen itu bagi kelangsungan hidup: gen vital lebih lambat berubah (perubahan cenderung merugikan dan tersaring).
> >
> > Namun molecular clock **tidak berjalan semulus** yang diharapkan jika semua mutasi netral:
> >
> > - **Natural selection** membuat sebagian perubahan DNA lebih disukai daripada yang lain, menimbulkan **iregularitas**.
> > - Estimasi divergensi yang **lebih tua dari catatan fosil** punya **ketidakpastian tinggi** (ekstrapolasi jauh di luar rentang kalibrasi).
> > - Solusi: gunakan **banyak gen** atau gen dari **banyak taxa** untuk memperbaiki estimasi (merata-ratakan derau).
> >
> > ### Studi Kasus: Menanggalkan Asal-Usul HIV
> >
> > Analisis filogenetik menunjukkan **HIV** turun dari virus yang menginfeksi simpanse dan primata lain, dan menyebar ke manusia **lebih dari sekali**. Perbandingan sampel HIV memperlihatkan virus ini berevolusi **sangat clocklike**. Penerapan molecular clock memperkirakan strain manusia paling umum, **HIV-1 M**, berasal sekitar **1930**; pendekatan jam yang lebih kompleks menanggalkannya ke sekitar **1910** — jauh sebelum HIV dikenali secara klinis.
> >
> > ### Dari Dua Kingdom ke Tiga Domain
> >
> > Klasifikasi tingkat tinggi pun berevolusi:
> >
> > - **Dua kingdom**: dulu semua spesies = tumbuhan atau hewan.
> > - **Lima kingdom**: Monera (prokariot), Protista, Plantae, Fungi, Animalia.
> > - **Tiga domain** (kini): **Bacteria**, **Archaea**, **Eukarya** — didukung data **banyak genom tersekuens**.
> >
> > Pohon kehidupan ini dibangun dari gen **rRNA** yang berevolusi lambat (mengode komponen RNA ribosom). Dalam pohon rRNA, **eukariot dan archaea lebih dekat** satu sama lain daripada ke bacteria.
> >
> > ```mermaid
> > graph LR
> >     LUCA(("LUCA"))
> >     LUCA --> BAC["Domain Bacteria"]
> >     LUCA --> N(("Ancestor<br/>Archaea + Eukarya"))
> >     N --> ARC["Domain Archaea"]
> >     N --> EUK["Domain Eukarya"]
> > ```
> >
> > ### Computational Framing: Clock sebagai Regresi dan HGT sebagai Graph
> >
> > Bagi mahasiswa informatika, molecular clock adalah **linear regression / estimasi**: variabel bebas = waktu (dari fosil), variabel terikat = jumlah substitusi; kalibrasi = **fit garis**, lalu memprediksi waktu divergensi tak-diketahui dengan invers garis itu. "Iregularitas jam" = **residual** dan **heteroskedastisitas** akibat seleksi; "pakai banyak gen" = memperbanyak sampel untuk mengecilkan **variance** estimasi. Pendekatan modern (**relaxed clock**, **BEAST**) memodelkan laju sebagai variabel acak per cabang, bukan konstanta tunggal.
> >
> > Sementara itu, **horizontal gene transfer (HGT)** — transfer gen antar spesies via plasmid, transposon, infeksi virus, atau fusi organisme — adalah alasan pohon kadang **bukan pohon**. Karena gen berbeda memberi pohon berbeda (rRNA mendekatkan eukariot–archaea; gen lain mendekatkan eukariot–bacteria), sejarah kehidupan lebih tepat sebagai **directed acyclic graph / jaringan filogenetik** dengan edge "lateral", bukan tree murni. Inilah "tangled web of life".

> [!cornell] #### Summary
>
> **Molecular clock** memperkirakan **waktu absolut** evolusi dari asumsi bahwa **substitusi nukleotida sebanding dengan waktu**, dikalibrasi dengan memplot perubahan genetik terhadap **tanggal fosil**. Jam bekerja karena banyak mutasi bersifat **netral**, tetapi **natural selection** dan **ekstrapolasi di luar rentang fosil** menimbulkan ketidakpastian — diperbaiki dengan **banyak gen/taxa**. Penerapan terkenal: menanggalkan asal **HIV-1 M** ke ~1910–1930. Klasifikasi tingkat tinggi berpindah **dua → lima kingdom → tiga domain** (**Bacteria, Archaea, Eukarya**) berdasarkan pohon **rRNA**, tetapi **horizontal gene transfer** membuat pohon kehidupan sebenarnya menyerupai **jaringan/graph**. Secara komputasi, clock adalah **regresi/estimasi** dan HGT adalah alasan tree menjadi **network** — melengkapi metode di [[Maximum Parsimony and Tree Reconstruction]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Carl Woese dan Revolusi rRNA
>
> Sistem tiga domain lahir dari kerja **Carl Woese** (1977) yang membandingkan **16S/18S rRNA** — molekul yang ada di semua sel hidup dan berevolusi sangat lambat, sehingga jadi "penanda universal" ideal untuk kekerabatan paling dalam. Penemuan bahwa **Archaea** berbeda fundamental dari Bacteria meruntuhkan dikotomi prokariot–eukariot lama dan menempatkan Archaea sebagai kerabat terdekat kita (Eukarya). Pendekatan ini juga melahirkan **metagenomics**: mensurvei mikroba lingkungan langsung dari sekuens rRNA tanpa mengkulturnya.
>
> #### CS Angle: Phylogenetic Networks dan Konflik Sinyal
>
> Ketika gen berbeda menghasilkan pohon berbeda (**gene tree vs species tree discordance**), kita beralih dari tree ke **phylogenetic network** — DAG yang mengizinkan **reticulation node** (HGT, hibridisasi, rekombinasi). Tool seperti **SplitsTree** menampilkan konflik sinyal sebagai **split network**, dan rekonsiliasi gene-tree/species-tree adalah persoalan optimisasi pada graf. Ini contoh konkret bagaimana asumsi "data berstruktur pohon" gagal dan kita butuh model **graph** yang lebih kaya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat dataset sintetik (jumlah substitusi vs waktu fosil), lakukan **regresi linier**, dan gunakan garisnya untuk memperkirakan satu titik divergensi tak-diketahui — lalu diskusikan ketidakpastian ekstrapolasi.
> 2. Bandingkan pohon dari dua gen berbeda pada beberapa spesies bakteri; cari ketidaksesuaian yang bisa dijelaskan **HGT**.
> 3. Pelajari pohon tiga domain dari database SILVA/Greengenes (rRNA) dan gambar ulang sebagai mermaid dengan posisi Archaea–Eukarya sebagai sister.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 20 — *Molecular Clocks; The Three Domains of Life*.
> - Woese, Kandler, Wheelis (1990) — *Towards a Natural System of Organisms: Bacteria, Archaea, Eucarya*.
> - Worobey et al. (2008) — penanggalan molecular clock asal-usul HIV-1 M.
