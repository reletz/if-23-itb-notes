---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Filogeni Hewan dan Evolusi Vertebrata
>
> > ### Pertanyaan/Petunjuk
> > 
> > - Mengapa simetri bilateral penting dalam evolusi hewan?
> > - Bagaimana karakteristik chordata mendukung kehidupan vertebrata?
> > - Tahapan evolusi dari ikan ke tetrapoda darat
> > - Adaptasi kunci mamalia untuk kehidupan terestrial
> > - Dampak aktivitas manusia terhadap keanekaragaman hayati
> > 
> > ### Referensi
> > 
> > - Biological Diversity Part 2 (Halaman 15-55)
> > - Campbell Biology in Focus Chapter 27 (Halaman 14-55)
> > - Computing Tools Section (Halaman 58-64)
> 
> > ### Konsep 1: Asal Usul dan Klasifikasi Hewan
> > Hewan diperkirakan berevolusi dari eukariota uniseluler yang menyerupai choanoflagellata modern sekitar 700 juta tahun lalu. Fosil tertua hewan multiseluler berasal dari masa Ediacaran (635-541 juta tahun lalu). Klasifikasi hewan didasarkan pada:
> > - **Keberadaan jaringan sejati**: Porifera (spons) tidak memiliki jaringan sejati, sementara Cnidaria (ubur-ubur) dan kelompok lain termasuk Eumetazoa memiliki jaringan terdiferensiasi.
> > - **Tipe simetri tubuh**: Simetri radial (Cnidaria) vs bilateral (Bilateria). Simetri bilateral memungkinkan evolusi sistem saraf terpusat dan gerakan terarah.
> > 
> > Contoh: Spons (Porifera) menyaring makanan melalui pori-pori tubuh tanpa sistem organ, sementara ubur-ubur (Cnidaria) memiliki rongga gastrovaskular dan tentakel untuk menangkap mangsa.
> > 
> > ### Konsep 2: Diversifikasi Bilateria
> > Bilateria terbagi menjadi tiga klad utama:
> > 1. **Lophotrochozoa**: Cacing annelida, moluska
> > 2. **Ecdysozoa**: Artropoda, nematoda
> > 3. **Deuterostomia**: Echinodermata, chordata
> > 
> > Chordata memiliki empat karakteristik utama:
> > - Notokorda (batang penyangga fleksibel)
> > - Saraf dorsal berlubang
> > - Celah faring
> > - Ekor muskular
> > Vertebrata merupakan subfilum Chordata yang memiliki tulang belakang menggantikan notokorda pada fase dewasa.
> > 
> > ### Konsep 3: Transisi ke Darat
> > Evolusi vertebrata darat melibatkan adaptasi:
> > - **Anggota badan berdigit**: Fosil transisi seperti Tiktaalik menunjukkan perubahan sirip menjadi tungkai.
> > - **Sistem respirasi**: Insang → paru-paru
> > - **Reproduksi**: Telur bercangkang pada amniota
> >  Amfibi menjadi kelompok tetrapoda pertama yang menghubungkan kehidupan akuatik dan terestrial, namun tetap bergantung pada air untuk reproduksi.
> > 
> > ### Konsep 4: Radiasi Mamalia
> > Mamalia berevolusi dari sinapsid selama era Mesozoik. Adaptasi kunci:
> > - Rambut dan lapisan lemak untuk insulasi
> > - Kelenjar susu untuk nutrisi anak
> > - Otak besar dengan neokorteks
> > - Gigi terspesialisasi untuk mengunyah
> > Primata mengembangkan penglihatan binokuler dan tangan prehensil yang mendukung kehidupan arboreal.
> > 
> > ### Konsep 5: Dampak Manusia pada Evolusi
> > Aktivitas manusia menyebabkan:
> > - **Seleksi buatan**: Perubahan ukuran dan kematangan seksual pada ikan akibat penangkapan selektif
> > - **Kepunahan massal keenam**: Hilangnya keanekaragaman terutama pada moluska
> > - Perubahan lingkungan yang lebih cepat dari kemampuan adaptasi alami banyak spesies

> [!cornell] #### Ringkasan
> **Filogeni hewan** menunjukkan hubungan evolusioner dari Porifera sederhana hingga mamalia kompleks, dengan **simetri bilateral** sebagai inovasi kunci yang memungkinkan diversifikasi. Vertebrata berevolusi melalui adaptasi seperti **tulang belakang** dan **anggota badan berdigit**, memfasilitasi kolonisasi darat. Mamalia mengembangkan **endotermi** dan **otak besar**, sementara aktivitas manusia kini menjadi pendorong utama **perubahan evolusioner** melalui alterasi habitat dan seleksi buatan. Pemahaman sejarah evolusi ini penting untuk konservasi keanekaragaman hayati.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Algoritma Klastering untuk Identifikasi Suara
> Metode unsupervised learning seperti DBSCAN dapat mengelompokkan rekaman suara lingkungan berdasarkan fitur akustik (frekuensi dominan, durasi pulsa). Kompleksitas algoritma O(n²) membatasi aplikasi pada dataset besar, sehingga diperlukan optimasi dengan teknik downsampling.
>
> #### Pemodelan Morfologi 3D
> Rekonstruksi tulang panggul mamalia menggunakan CT-scan memungkinkan analisis biomekanik gaya berjalan. Parameter utama mencakup:
> - Rasio panjang-lebar asetabulum
> - Sudut inklinasi femur
> - Luas permukaan artikular
>
> #### Studi Kasus: Evolusi Tungkai Belakang Karnivora
> Analisis komparatif 120 spesies menunjukkan korelasi antara morfologi tulang dan mode lokomosia:
> - Karnivora arboreal memiliki femur lebih pendek
> - Spesies kursorial mengembangkan metatarsal memanjang
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun dataset morfometrik tengkorak vertebrata dari sumber museum digital
> 2. Implementasikan algoritma neighbor-joining untuk rekonstruksi pohon filogenetik
> 3. Analisis dampak perubahan iklim historis terhadap diversifikasi mamalia
>
> #### Sumber Lanjutan
> - Futuyma, D.J. (2017). _Evolutionary Biology_
> - Paleobiology Database: https://paleobiodb.org
> - MorphoSource repository: https://www.morphosource.org
> - Kursus Coursera: "Evolution Today" (Universitas Alberta)