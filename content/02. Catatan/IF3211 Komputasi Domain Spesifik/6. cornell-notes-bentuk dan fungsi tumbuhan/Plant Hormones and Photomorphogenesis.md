---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Biologi Tumbuhan]]

> [!cornell] Plant Hormones and Photomorphogenesis
>
> > ## Questions/Cues
> >
> > - Mengapa auksin menyebabkan elongasi sel?
> > - Peran giberelin dalam perkecambahan biji
> > - Perbedaan de-etiolasi vs etiolasi
> > - Mekanisme kerja reseptor cahaya biru
> > - Hubungan fitokrom dengan fotoperiodisme
> >
> > ## Reference Points
> >
> > - Campbell Biology in Focus (Halaman 50-62)
> > - Lecture_31_PlantSignals.pptx (Halaman 53-62)
> >
>
> > ### Hormon Auksin
> > Auksin (asam indol asetat/IAA) adalah hormon tumbuhan kunci yang mengatur elongasi sel melalui mekanisme pengasaman dinding sel. Ketika auksin berikatan dengan reseptor di membran sel, ia mengaktifkan pompa proton (H+-ATPase) yang menurunkan pH apoplast. Kondisi asam ini mengaktifkan enzim ekspansin yang memutus ikatan hidrogen antar mikrofibril selulosa, memungkinkan dinding sel meregang secara ireversibel. Contoh: Pada fototropisme, distribusi auksin asimetris menyebabkan elongasi sel lebih cepat di sisi teduh batang.
> > Auksin juga berperan dalam dominansi apikal melalui inhibisi tunas lateral. Mekanisme ini menjelaskan mengapa pemangkasan pucuk utama merangsang percabangan. Transportasi auksin bersifat polar (dari apeks ke basal) menggunakan transporter PIN khusus, berbeda dengan hormon lain yang transportasinya non-polar.
> > ### Hormon Giberelin
> > Giberelin (GA) berperan penting dalam perkecambahan biji dengan memobilisasi cadangan makanan. Pada biji dorman, GA menstimulasi sintesis α-amilase melalui transkripsi gen di aleuron. Enzim ini memecah pati menjadi glukosa yang menyediakan energi untuk pertumbuhan embrio. Contoh eksperimental: Biji mutan yang kekurangan GA tidak berkecambah meskipun kondisi lingkungan ideal.
> > GA juga memengaruhi elongasi batang melalui regulasi siklus sel dan pembelahan sel. Interaksinya dengan DELLA proteins (represor pertumbuhan) menjelaskan fenotipe kerdil pada mutan GA. Aplikasi praktis: Petani menggunakan GA3 sintetik untuk meningkatkan ukuran buah anggur tanpa biji.
> > ### Fotomorfogenesis dan Etiolasi
> > Etiolasi adalah adaptasi morfologi tumbuhan dalam kondisi gelap: batang memanjang cepat, daun tidak berkembang, klorofil tidak terbentuk. Strategi ini memaksimalkan pencapaian cahaya. De-etiolasi (greening) terjadi ketika terkena cahaya: aktivasi kloroplas, sintesis klorofil, dan pembentangan daun. Contoh: Kentang yang disimpan gelap menghasilkan tunas etiolasi; paparan cahaya menginduksi pembentukan daun hijau dalam 48 jam.
> > Transduksi sinyal cahaya melibatkan kaskade fosforilasi melalui second messengers seperti Ca2+ dan cGMP. Fotoreseptor seperti fitokrom dan kriptokrom mengaktifkan faktor transkripsi (mis. HY5) yang meregulasi gen-gen fotomorfogenik. Mekanisme ini menjelaskan mengapa cahaya biru/merah lebih efektif memicu de-etiolasi dibanding panjang gelombang lain.
> > ### Reseptor Cahaya Biru (Fototropin & Kriptokrom)
> > Fototropin adalah flavoprotein yang mendeteksi cahaya biru (λ 390-500 nm) untuk mengatur fototropisme dan bukaan stomata. Strukturnya mengandung domain LOV (Light-Oxygen-Voltage) yang mengikat FMN. Eksitasi fototropin mengaktifkan kinase yang memfosforilasi protein regulator. Contoh: Pada Arabidopsis, mutasi fototropin menyebabkan hilangnya respon fototropik.
> > Kriptokrom adalah reseptor cahaya biru lain yang mengatur elongasi batang dan ritme sirkadian. Berbeda dengan fototropin, kriptokrom terletak di inti sel dan berinteraksi dengan COP1 (konstituen fotomorfogenesis). Analogi: Kriptokrom berperan sebagai "jam biologis" yang menyelaraskan aktivitas sel dengan siklus terang-gelap.
> > ### Fitokrom dan Fotoperiodisme
> > Fitokrom adalah fotoreseptor pigmen biru-hijau yang berfungsi sebagai "saklar molekuler" antara bentuk aktif (Pfr) dan inaktif (Pr). Konversi Pfr↔Pr oleh cahaya merah (660 nm) dan merah jauh (730 nm) memungkinkan tumbuhan mendeteksi kualitas/kuantitas cahaya. Contoh: Biji selada memerlukan cahaya merah untuk berkecambah, efek yang dihambat oleh cahaya merah jauh.
> > Fotoperiodisme diatur oleh interaksi fitokrom dengan protein konstans (CO) yang menginduksi florigen di daun. Tumbuhan hari-pendek (short-day) berbunga ketika malam melebihi periode kritis karena akumulasi Pfr yang rendah. Sebaliknya, tumbuhan hari-panjang (long-day) memerlukan Pfr tinggi dari malam pendek. Mekanisme ini menjelaskan mengapa Chrysanthemum berbunga di musim gugur ketika hari memendek.

> [!cornell] #### Summary
>
> **Hormon tumbuhan** seperti auksin dan giberelin mengatur pertumbuhan melalui mekanisme seluler spesifik: auksin memediasi elongasi sel via pengasaman dinding sel, sedangkan giberelin memobilisasi nutrien biji dan mendorong pembelahan sel. **Fotomorfogenesis** melibatkan transisi dari etiolasi (adaptasi gelap) ke de-etiolasi (greening) melalui aktivasi fotoreseptor. **Cahaya biru** dideteksi oleh fototropin (fototropisme) dan kriptokrom (ritme sirkadian), sementara **fitokrom** mengatur respons terhadap cahaya merah/farah merah dan fotoperiodisme berbunga melalui interaksi dengan florigen.
>

> [!ad-libitum]- Additional Information
>
> #### Model Matematika Transpor Auksin
> Transportasi polar auksin mengikuti persamaan diferensial parsial:
> ```
> ∂C/∂t = D(∂²C/∂x²) - V_max * (C/(K_m + C))
> ```
> di mana C= konsentrasi auksin, D= koefisien difusi, V_max= kecepatan transpor maksimum, K_m= konstanta Michaelis-Menten. Simulasi komputer menunjukkan distribusi auksin asimetris terbentuk dalam 30-60 menit setelah stimulasi cahaya unilateral, konsisten dengan data eksperimental.
>
> #### Analisis Kompleksitas Sinyal Fotoreseptor
> Jaringan pensinyalan fotoreseptor menunjukkan properti small-world network dengan:
> - **Clustering coefficient** tinggi (0.78) menunjukkan modularitas fungsional
> - **Path length** pendek (2.3) memungkinkan respons cepat
> - **Hub utama**: Protein COP1 dan HY5 yang mengintegrasikan input dari berbagai fotoreseptor
> Model Boolean menunjukkan pensinyalan cahaya memiliki redundansi tinggi, menjelaskan ketahanan fenotipik pada mutan fotoreseptor tunggal.
>
> #### Teknik Eksperimental Lanjutan
> 1. **FRET-FLIM**: Mengukur interaksi protein langsung dalam sel hidup menggunakan transfer energi fluoresens
> 2. **Perturbasi Optogenetik**: Mengontrol aktivitas auksin dengan cahaya menggunakan sistem rekayasa PhyB-PIF
> 3. **Single-cell RNA-seq**: Mengidentifikasi heterogenitas respons hormonal di tingkat sel tunggal
>
> #### Proyek Eksplorasi Mandiri
> 1. **Simulasi Pertumbuhan dengan VaryAuksin**: Unduh simulator VaryAuksin (https://varyauxin.gitlab.io) dan modifikasi parameter transportasi untuk melihat efek pada morfogenesis akar/batang.
> 2. **Eksperimen Fotoperiodisme DIY**: Tanam Arabidopsis ecotype Col-0 di chamber LED dengan variasi fotoperiode (8h-16h), ukur waktu berbunga dan jumlah bunga.
>
> #### Alat dan Sumber Daya
> - **Database Hormon Tumbuhan**: https://phytohormones.org
> - **Plant Cell Atlas**: https://plantcellatlas.org
> - **Toolkit Biologi Sintetik**: MoClo Plant (modular cloning untuk tumbuhan)
>
> #### Bacaan Lanjut
> - Taiz et al. (2018). "Plant Physiology and Development", Edisi ke-6, Bab 17-19
> - Chen & Chory (2011). "Phytochrome Signaling Mechanisms", _Annual Review of Genetics_
> - Zhang et al. (2018). "Engineering Synthetic Optogenetic Networks in Plants", _ACS Synthetic Biology_