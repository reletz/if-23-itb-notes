---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Cytokinesis and Prokaryotic Binary Fission
>
> > ## Questions/Cues
> >
> > - Apa itu **cytokinesis** dan kapan ia dimulai?
> > - Bagaimana cytokinesis berbeda antara sel **hewan** (cleavage furrow) dan **tumbuhan** (cell plate)?
> > - Bagaimana prokariota membelah lewat **binary fission**?
> > - Apa peran **origin of replication** pada pembelahan bakteri?
> > - Bagaimana **mitosis diduga berevolusi** dari binary fission?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Cycle (PPT 8, bagian Cytokinesis: A Closer Look)
> > - IF3211 — Cell Cycle (PPT 8, bagian Binary Fission in Bacteria / The Evolution of Mitosis)
>
> > ### Cytokinesis: Pembagian Sitoplasma
> >
> > Sementara **mitosis** membagi materi genetik di inti, **cytokinesis** membagi **sitoplasma** sehingga benar-benar terbentuk dua sel anak. Cytokinesis biasanya **dimulai pada anaphase atau telophase**, menumpang tahap-tahap akhir mitosis. Tanpa cytokinesis, hasilnya hanyalah satu sel dengan dua inti, bukan dua sel utuh.
> >
> > ### Cleavage Furrow (Hewan) vs Cell Plate (Tumbuhan)
> >
> > Cara cytokinesis berbeda menurut jenis sel:
> >
> > - **Sel hewan** membelah lewat proses **cleavage**, membentuk **cleavage furrow** — alur dangkal di permukaan sel. Cincin protein **aktin-miosin** di bawah membran berkontraksi seperti "tali pengikat (drawstring)", mencubit sel menjadi dua dari luar ke dalam.
> > - **Sel tumbuhan** tidak bisa mencubit karena memiliki **dinding sel** kaku. Sebagai gantinya, vesikel dari aparatus Golgi berkumpul di tengah membentuk **cell plate**, yang tumbuh ke luar hingga menyatu dengan membran lama, membangun dinding sel baru di antara dua sel anak — dari dalam ke luar.
> >
> > ### Binary Fission pada Prokariota
> >
> > **Prokariota** (bakteri dan archaea) bereproduksi lewat **binary fission**. Pada bakteri, **kromosom tunggal** (biasanya sirkular) **direplikasi**, dimulai dari satu titik bernama **origin of replication**. Kedua kromosom anak **bergerak menjauh secara aktif** seraya sel **memanjang**, lalu **membran plasma mencubit ke dalam** dan membelah sel menjadi dua. Karena hanya ada satu kromosom dan tidak ada nukleus, prosesnya jauh lebih sederhana daripada mitosis eukariota — tanpa spindle yang rumit, tanpa kondensasi kromosom berlapis.
> >
> > ### Evolusi Mitosis
> >
> > Karena prokariota berevolusi **sebelum** eukariota, **mitosis kemungkinan berevolusi dari binary fission**. Beberapa **protista** (dinoflagellata, diatom, dan sejumlah yeast) memperlihatkan tipe pembelahan yang tampak **intermediate** — peralihan antara binary fission dan mitosis penuh — menjadi petunjuk evolusioner bagaimana mekanisme kompleks dapat berkembang bertahap dari yang sederhana.
> >
> > ### Framing Komputasional: Strategi Commit yang Berbeda untuk Arsitektur yang Berbeda
> >
> > Bagi mahasiswa informatika, cytokinesis adalah **langkah commit final** yang menyelesaikan "fork" sebuah proses: setelah state disalin (mitosis), barulah dua node benar-benar dipisahkan. Menariknya, **strategi commit menyesuaikan constraint arsitektur**: sel hewan (tanpa dinding kaku) memakai pendekatan **kontraksi dari luar** (cleavage furrow ≈ menutup boundary dari tepi), sedangkan sel tumbuhan (dengan dinding kaku) **membangun partisi baru dari tengah** (cell plate ≈ menyisipkan boundary baru). Ini analog dengan dua strategi *partitioning* yang dipilih berdasarkan *constraint* sistem. Sementara **binary fission** adalah versi **single-record commit** yang ringan — satu kromosom, satu **origin of replication** (≈ satu *entry point* operasi), tanpa overhead koordinasi spindle — sebagaimana operasi *fork* pada sistem sederhana versus orkestrasi terdistribusi pada sistem kompleks. Lintasan evolusi binary fission → mitosis adalah kisah bagaimana protokol koordinasi makin canggih saat jumlah "record" (kromosom) yang harus didistribusikan bertambah banyak.

> [!cornell] #### Summary
>
> **Cytokinesis** membagi **sitoplasma** (melengkapi mitosis yang membagi inti) dan dimulai pada **anaphase/telophase**. Pada **sel hewan** terbentuk **cleavage furrow** lewat kontraksi cincin aktin-miosin (mencubit dari luar); pada **sel tumbuhan** terbentuk **cell plate** dari vesikel Golgi yang membangun dinding sel baru di tengah (dari dalam ke luar) — perbedaan yang ditentukan oleh ada/tidaknya **dinding sel**. **Prokariota** membelah via **binary fission**: kromosom tunggal direplikasi dari **origin of replication**, kromosom anak menjauh, sel memanjang, lalu membran mencubit menjadi dua. Karena prokariota lebih dulu ada, **mitosis** (lihat [[Mitosis and the Mitotic Spindle]]) diduga **berevolusi dari binary fission**, dengan protista tertentu sebagai bentuk peralihan.

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mesin Molekuler Pembelahan
>
> Pada bakteri, protein **FtsZ** (homolog tubulin) membentuk cincin **Z-ring** di tengah sel yang mengarahkan pembelahan — petunjuk bahwa mesin pembelahan eukariota dan prokariota berbagi akar evolusi yang dalam. Pada sel hewan, cincin kontraktil digerakkan **aktin + miosin II**; pada tumbuhan, lalu lintas vesikel Golgi yang dipandu **phragmoplast** membangun cell plate.
>
> #### CS Angle: Single-Node Fork vs Distributed Coordination
>
> Binary fission ≈ `fork()` pada satu mesin: cepat, sedikit metadata, satu *address space* yang disalin. Mitosis eukariota ≈ **orkestrasi terdistribusi** dengan banyak *shard* (kromosom), *barrier* (metaphase), dan *router* (spindle). Evolusi dari yang pertama ke yang kedua menggambarkan bagaimana **overhead koordinasi tumbuh** seiring bertambahnya unit data yang harus dijamin konsisten — pelajaran yang sama berlaku saat sistem berpindah dari proses tunggal ke arsitektur sharded.
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasikan binary fission vs mitosis sebagai dua skema "partisi state": ukur jumlah langkah/koordinasi yang diperlukan saat jumlah kromosom dinaikkan dari 1 → N, dan plot pertumbuhan overhead-nya.
> 2. Riset peran FtsZ dan buat catatan singkat tentang bukti homologi tubulin–FtsZ sebagai dukungan hipotesis evolusi mitosis.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 9 — *Cytokinesis* & *Binary Fission*.
> - Erickson, H. P., *FtsZ, a prokaryotic homolog of tubulin?*, Cell.
