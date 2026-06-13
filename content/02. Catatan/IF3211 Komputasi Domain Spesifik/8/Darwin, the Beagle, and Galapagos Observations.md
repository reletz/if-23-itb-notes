---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Darwin, the Beagle, and Galapagos Observations
>
> > ## Questions/Cues
> >
> > - Apa yang diamati Darwin selama **pelayaran HMS Beagle**?
> > - Bagaimana bacaan **Lyell** dan bukti pengangkatan kerak mengubah pandangan Darwin tentang umur Bumi?
> > - Apa yang istimewa dari pengamatan di **Kepulauan Galápagos**?
> > - Bagaimana **variasi paruh burung finch** menjadi petunjuk adaptasi?
> > - Bagaimana pola **biogeografi** dapat dilihat sebagai data spasial untuk inferensi?
> >
> > ## Reference Points
> >
> > - IF3211 — Evolution (PPT 9, bagian *The Voyage of the Beagle*)
> > - IF3211 — Evolution (PPT 9, bagian *Darwin's Focus on Adaptation*)
>
> > ### Pelayaran HMS Beagle
> >
> > Antara Desember 1831 dan Oktober 1836, **Charles Darwin** ikut pelayaran **HMS Beagle** mengelilingi dunia, terutama menyusuri pesisir Amerika Selatan. Selama perjalanan ia **mengamati dan mengumpulkan ribuan tumbuhan dan hewan**, lalu mencatat dengan teliti bagaimana ciri-ciri tiap organisme **cocok (suited) dengan lingkungannya**.
> >
> > Dua pola spasial menarik perhatiannya: (1) **fosil menyerupai spesies hidup dari wilayah yang sama**, dan (2) **spesies hidup menyerupai spesies lain dari wilayah tetangga**. Pola "kemiripan yang menurun seiring jarak/waktu" ini sulit dijelaskan oleh penciptaan terpisah tiap spesies, tetapi sangat masuk akal bila spesies **berbagi nenek moyang** dan **menyimpang** seiring ruang dan waktu.
> >
> > ### Pengaruh Lyell dan Umur Bumi
> >
> > Di kapal, Darwin membaca *Principles of Geology* karya **Charles Lyell**. Saat singgah, ia **menyaksikan pengangkatan kerak (uplift) setelah gempa bumi**, lalu menyimpulkan bahwa **proses lambat serupa**-lah yang menjelaskan mengapa **fosil organisme laut bisa ditemukan di pegunungan**. Dari sini Darwin menarik kesimpulan kunci: **Bumi pasti jauh lebih tua** daripada beberapa ribu tahun yang diyakini secara tradisional. Skala waktu raksasa inilah yang memberi ruang bagi akumulasi perubahan biologis kecil menjadi keanekaragaman besar.
> >
> > ### Kepulauan Galápagos dan Kolonisasi
> >
> > Ketertarikan Darwin pada **distribusi spesies** benar-benar menyala saat singgah di **Kepulauan Galápagos** — gugusan pulau vulkanik muda di lepas pantai Amerika Selatan. Ia berhipotesis bahwa spesies dari **daratan utama Amerika Selatan telah mengkolonisasi Galápagos**, lalu **menyimpang (diverge)** di tiap pulau seiring beradaptasi dengan kondisi lokal yang berbeda. Karena pulau-pulau itu muda dan terisolasi, mereka menjadi semacam "laboratorium alami" yang memperlihatkan tahap-tahap awal pembentukan spesies baru.
> >
> > ### Finch Galápagos dan Fokus pada Adaptasi
> >
> > Darwin memandang **adaptasi terhadap lingkungan** dan **asal-usul spesies baru** sebagai proses yang erat terkait. Contoh ikoniknya adalah **burung finch Galápagos**: para biolog kemudian menyimpulkan bahwa kelompok finch yang beragam ini muncul dari **satu bentuk leluhur** melalui **akumulasi adaptasi secara bertahap** terhadap lingkungan berbeda. Yang paling kentara adalah **variasi bentuk paruh** — paruh tebal-kuat untuk memecah biji keras, paruh ramping untuk menangkap serangga, dst. Bentuk paruh adalah **sifat yang sesuai dengan sumber makanan** di tiap pulau; lingkungan yang berbeda "memilih" bentuk paruh yang berbeda.
> >
> > ### Sudut Pandang Komputasi: Biogeografi sebagai Data Spasial untuk Inferensi
> >
> > Observasi Darwin pada hakikatnya adalah **pengumpulan data berlabel spasial**: tiap sampel organisme adalah titik data dengan fitur morfologi **plus koordinat geografis**. Pola yang ia temukan — kemiripan meluruh seiring jarak — adalah bentuk **spatial autocorrelation**: titik yang berdekatan cenderung mirip. Inilah sinyal yang sama yang dieksploitasi algoritma **nearest-neighbor** atau **clustering geografis**.
> >
> > Divergensi finch dari satu leluhur juga merupakan **adaptive radiation**: satu populasi awal menyebar ke banyak **niche** (relung) berbeda, dan tiap sub-populasi melakukan **optimasi lokal** terhadap fungsi fitness yang berbeda (bentuk paruh vs jenis makanan). Dalam istilah optimasi, satu titik awal yang sama "mendaki" menuju **puncak fitness yang berbeda-beda** karena **landscape fitness berubah dari pulau ke pulau** — pendahuluan langsung bagi gagasan seleksi alam pada [[Natural Selection and Descent with Modification]].

> [!cornell] #### Summary
>
> Selama **pelayaran HMS Beagle (1831–1836)**, **Darwin** mengumpulkan ribuan spesimen dan mencatat bahwa organisme **cocok dengan lingkungannya** serta bahwa **kemiripan menurun seiring jarak dan waktu**. Bacaan **Lyell** dan bukti **uplift pasca-gempa** meyakinkannya bahwa **Bumi sangat tua**, memberi ruang bagi perubahan bertahap. Di **Galápagos**, ia berhipotesis bahwa spesies daratan **mengkolonisasi** lalu **menyimpang** di tiap pulau; **variasi paruh finch** menjadi contoh **adaptasi** terhadap lingkungan berbeda. Secara komputasional, pengamatan ini adalah **data spasial** yang memperlihatkan **autokorelasi geografis** dan **adaptive radiation** — satu leluhur mendaki banyak **puncak fitness** berbeda.

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Wallace dan Penemuan Paralel
>
> Darwin bukan satu-satunya yang sampai pada gagasan seleksi alam. Pada Juni 1858 ia menerima manuskrip dari **Alfred Russel Wallace** yang mengembangkan teori seleksi alam sangat mirip, sebagian dari pengamatannya di Kepulauan Melayu (termasuk Nusantara — *Wallace Line* membelah fauna Asia dan Australia). Pada 1 Juli 1858, **Lyell** mempresentasikan karya Wallace dan Darwin bersama-sama di **Linnean Society of London**. Darwin lalu merampungkan dan menerbitkan *On the Origin of Species* tahun berikutnya.
>
> #### CS Angle: Data Collection sebagai Sampling dari Distribusi
>
> Pekerjaan Darwin di Beagle adalah **field sampling**: ia menarik sampel dari distribusi spesies di ruang geografis. Pola finch menggambarkan masalah **inferensi dari sampel terbatas** — dari segelintir pulau ia menyimpulkan proses divergensi global. Ini analog dengan tantangan **sampling bias** dan **generalisasi** dalam machine learning: kesimpulan kuat hanya valid bila sampel cukup representatif. Galápagos "beruntung" karena isolasinya memperbesar **sinyal** divergensi relatif terhadap noise.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil dataset morfologi finch Galápagos (mis. paket `Sleuth3::case0201`/data Grant), lalu lakukan clustering bentuk paruh dan korelasikan dengan jenis makanan/pulau.
> 2. Buat simulasi "kolonisasi pulau": satu populasi awal disebar ke beberapa landscape fitness berbeda, jalankan hill-climbing terpisah, dan amati munculnya morfologi yang berbeda dari leluhur sama.
>
> #### Bacaan Lanjutan
> - Darwin, C. *On the Origin of Species* (1859).
> - Weiner, J. *The Beak of the Finch* (studi Grant di Daphne Major).
> - Quammen, D. *The Song of the Dodo* (biogeografi pulau).
