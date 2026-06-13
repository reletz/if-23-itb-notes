---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Mitosis and the Mitotic Spindle
>
> > ## Questions/Cues
> >
> > - Apa yang terjadi di tiap tahap mitosis (prophase → telophase)?
> > - Apa itu **mitotic spindle** dan dari mana ia dirakit?
> > - Apa peran **centrosome**, **aster**, dan **kinetochore**?
> > - Bagaimana sister chromatids dipisahkan saat **anaphase**?
> > - Apa peran **microtubule dynamics** (polimerisasi/depolimerisasi) dalam gerak kromosom?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Cycle (PPT 8, bagian Exploring Mitosis in an Animal Cell)
> > - IF3211 — Cell Cycle (PPT 8, bagian The Mitotic Spindle: A Closer Look)
>
> > ### Tahapan Mitosis: Prophase hingga Telophase
> >
> > Mitosis berlangsung dalam lima tahap berurutan. Pada **prophase**, chromatin mengondensasi menjadi kromosom yang terlihat (masing-masing dengan dua sister chromatids), dan **mitotic spindle** mulai terbentuk. Pada **prometaphase**, selubung nukleus terurai sehingga mikrotubulus dapat menjangkau kromosom; sebagian mikrotubulus menempel pada **kinetochore**. Pada **metaphase**, semua kromosom berjajar dengan centromere berada di **metaphase plate** — bidang khayal di tengah, tepat di antara dua kutub spindle. Pada **anaphase**, sister chromatids **dipisahkan** dan ditarik ke kutub berlawanan. Pada **telophase**, dua set kromosom tiba di ujung sel, selubung nukleus baru terbentuk, dan kromosom mulai melonggar kembali. **Cytokinesis** mulai pada anaphase/telophase.
> >
> > ### Mitotic Spindle: Centrosome dan Aster
> >
> > **Mitotic spindle** adalah struktur dari **microtubules** dan protein terkait yang **mengontrol gerakan kromosom** selama mitosis. Pada sel hewan, perakitan mikrotubulus spindle dimulai di **centrosome**, sebuah *microtubule organizing center* (MTOC). Centrosome **diduplikasi selama interphase**, menghasilkan dua centrosome yang **bermigrasi ke ujung-ujung berlawanan** sel selama prophase dan prometaphase. Mikrotubulus tumbuh keluar dari centrosome saat bermigrasi, dan sebuah **aster** (jajaran radial mikrotubulus pendek) memanjang dari tiap centrosome. Spindle mencakup **centrosome + spindle microtubules + aster**.
> >
> > ### Kinetochore dan Metaphase Plate
> >
> > **Kinetochores** adalah kompleks protein yang terakit pada bagian DNA di **centromere**. Selama prometaphase, sebagian mikrotubulus spindle — disebut **kinetochore microtubules** — menempel pada kinetochore dan mulai menggerakkan kromosom. Pada **metaphase**, centromere semua kromosom berbaris rapi di **metaphase plate**, posisi setimbang di tengah antara dua kutub. Penjajaran ini adalah prasyarat agar pemisahan berikutnya **adil dan simetris** ke dua sel anak.
> >
> > ### Anaphase: Pemisahan via Microtubule Dynamics
> >
> > Pada **anaphase**, sister chromatids berpisah dan bergerak sepanjang kinetochore microtubules menuju ujung berlawanan. Mikrotubulus **memendek dengan depolimerisasi** di ujung kinetochore-nya, dan kromosom juga "**ditarik (reeled in)**" oleh **motor proteins** di kutub spindle. Sementara itu, **nonkinetochore microtubules** dari kutub berlawanan saling tumpang-tindih dan **mendorong** satu sama lain, **memanjangkan sel**. Di akhir anaphase, dua kelompok kromosom duplikat sudah tiba di ujung-ujung sel yang memanjang, dan spindle akhirnya **dibongkar (disassemble)**.
> >
> > ### Framing Komputasional: Spindle sebagai Penjadwal Distribusi Paralel
> >
> > Bagi mahasiswa informatika, mitosis adalah persoalan **distribusi beban paralel ke dua node** dengan jaminan **konsistensi**. Dua **centrosome** di kutub berlawanan berperan seperti dua **endpoint/worker** tujuan. **Kinetochore microtubules** adalah **channel/koneksi** yang harus terbentuk antara tiap kromosom dan kutubnya; **metaphase plate** adalah **barrier synchronization** — semua kromosom harus "terdaftar dan berjajar" sebelum pemisahan dimulai (lihat M checkpoint di [[Cell Cycle Control, Checkpoints, and Cancer]]). **Anaphase** adalah operasi *partition-and-route* simultan: tiap sister chromatid dikirim ke node tujuannya, dengan **depolimerisasi mikrotubulus** berfungsi seperti *back-pressure* yang menarik payload masuk. Tujuannya: kedua node menerima **salinan identik** — sebuah invariant **load balancing yang sempurna**, bukan sekadar seimbang melainkan duplikat persis.

> [!cornell] #### Summary
>
> **Mitosis** berlangsung dalam lima tahap: **prophase** (kondensasi kromosom, spindle mulai terbentuk), **prometaphase** (selubung nukleus terurai, mikrotubulus menempel ke **kinetochore**), **metaphase** (kromosom berjajar di **metaphase plate**), **anaphase** (**sister chromatids** dipisahkan ke kutub berlawanan), dan **telophase** (nukleus baru terbentuk). **Mitotic spindle** — terdiri dari **centrosome**, **spindle microtubules**, dan **aster** — mengendalikan gerak kromosom. Pemisahan didorong oleh **microtubule dynamics**: depolimerisasi kinetochore microtubules dan tarikan **motor proteins**, sementara nonkinetochore microtubules memanjangkan sel. Secara komputasional ini adalah **distribusi paralel duplikat-identik ke dua node** dengan barrier sinkronisasi. Pembagian sitoplasma yang menyusulnya dibahas di [[Cytokinesis and Prokaryotic Binary Fission]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Dynamic Instability Mikrotubulus
>
> Mikrotubulus menunjukkan **dynamic instability** — terus-menerus tumbuh (polimerisasi tubulin) dan menyusut (depolimerisasi) secara stokastik. Spindle memanfaatkan ini sebagai mekanisme "**search-and-capture**": mikrotubulus menjulur acak hingga "menangkap" kinetochore, lalu distabilkan. Inilah cara sel menemukan dan menambatkan semua kromosom tanpa peta posisi awal.
>
> #### CS Angle: Search-and-Capture sebagai Algoritma Probabilistik
>
> Mekanisme search-and-capture mirip **randomized algorithm**: alih-alih menghitung rute deterministik ke tiap kromosom, sel "menembakkan" probe secara acak dan mempertahankan yang berhasil (*Las Vegas style* — hasil selalu benar, waktu yang bervariasi). Motor proteins yang menarik kromosom adalah **active transport** sepanjang "rel" mikrotubulus, analog dengan *DMA transfer* yang memindahkan payload tanpa membebani jalur utama.
>
> #### Proyek Eksplorasi Mandiri
> 1. Modelkan search-and-capture: dalam grid 2D, sebuah kutub menembakkan "mikrotubulus" ke arah acak; ukur rata-rata langkah hingga semua kinetochore tertangkap, dan bandingkan dengan strategi deterministik.
> 2. Buat animasi sederhana lima tahap mitosis (mis. dengan canvas/Processing) yang menampilkan migrasi centrosome, penjajaran metaphase, dan pemisahan anaphase.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 9 — *The Mitotic Spindle: A Closer Look*.
> - Mitchison & Kirschner (1984), *Dynamic instability of microtubule growth*, Nature.
