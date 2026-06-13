---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Carbohydrates - Structure and Function
>
> > ## Questions/Cues
> >
> > - Apa itu **monosakarida** dan bagaimana ia diklasifikasikan?
> > - Bagaimana **disakarida** terbentuk dan apa itu **glycosidic linkage**?
> > - Apa perbedaan **polisakarida penyimpanan** (pati, glikogen) dan **struktural** (selulosa)?
> > - Mengapa selulosa sulit dicerna padahal sama-sama tersusun dari glukosa?
> > - Bagaimana posisi ikatan menentukan fungsi polisakarida?
> >
> > ## Reference Points
> >
> > - IF3211 — Macromolecules (PPT 2, bagian Karbohidrat: Sugars)
> > - IF3211 — Macromolecules (PPT 2, bagian Polysaccharides)
>
> > ### Monosakarida: Gula Sederhana
> >
> > **Karbohidrat (carbohydrates)** mencakup gula dan polimer gula. Unit paling sederhana adalah **monosakarida (monosaccharide)** atau gula sederhana, dengan rumus molekul yang umumnya merupakan kelipatan dari **CH₂O**. **Glukosa (C₆H₁₂O₆)** adalah monosakarida paling umum dan menjadi bahan bakar utama sel.
> >
> > Monosakarida diklasifikasikan berdasarkan **(1) jumlah karbon** pada kerangka (triosa = 3C, pentosa = 5C, heksosa = 6C) dan **(2) letak gugus karbonil (carbonyl group)** — apakah di ujung (aldosa) atau di tengah (ketosa). Meskipun sering digambar sebagai rantai linear, dalam larutan air banyak gula membentuk **struktur cincin (ring form)** yang lebih stabil. Selain sebagai nutrien, monosakarida juga menjadi bahan baku untuk membangun molekul lain.
> >
> > ### Disakarida dan Glycosidic Linkage
> >
> > Sebuah **disakarida (disaccharide)** terbentuk ketika **reaksi dehidrasi (dehydration reaction)** menyambung dua monosakarida. Ikatan kovalen yang terbentuk disebut **glycosidic linkage**. Contoh: glukosa + fruktosa → **sukrosa** (gula meja); glukosa + glukosa → **maltosa**; glukosa + galaktosa → **laktosa** (gula susu).
> >
> > Posisi dan orientasi glycosidic linkage sangat menentukan: dua polimer bisa tersusun dari monomer yang **identik** namun memiliki sifat fisik dan biologis yang sama sekali berbeda hanya karena perbedaan jenis ikatan (lihat pati vs selulosa di bawah).
> >
> > ### Polisakarida: Penyimpanan vs Struktural
> >
> > **Polisakarida (polysaccharides)** adalah polimer gula dengan dua peran besar: **penyimpanan (storage)** dan **struktural (structural)**. Struktur dan fungsi sebuah polisakarida ditentukan oleh **monomer gula penyusunnya** dan **posisi glycosidic linkage-nya**.
> >
> > - **Pati (starch)** — polisakarida penyimpanan pada **tumbuhan**, tersusun seluruhnya dari monomer glukosa dengan ikatan **α (alfa)**. Tumbuhan menyimpan kelebihan pati sebagai granula. Sebagian besar hewan punya enzim yang dapat menghidrolisis pati menjadi glukosa.
> > - **Glikogen (glycogen)** — polisakarida penyimpanan pada **hewan**, lebih bercabang daripada pati. Manusia dan vertebrata menyimpannya terutama di **sel hati dan otot**.
> > - **Selulosa (cellulose)** — polisakarida **struktural** penyusun dinding sel tumbuhan, juga dari glukosa tetapi dengan ikatan **β (beta)**. Orientasi β membuat rantai lurus dan kaku yang saling menempel; kebanyakan hewan **tidak punya enzim** untuk menghidrolisisnya, sehingga selulosa menjadi "serat" yang tidak tercerna.
> >
> > ### Computational Framing: Same Alphabet, Different Topology
> >
> > Kasus pati vs selulosa adalah pelajaran komputasi yang elegan: keduanya adalah **string atas alphabet satu simbol** (glukosa), namun **encoding ikatannya** (α vs β) yang berbeda menghasilkan dua molekul dengan perilaku berlawanan. Ini menegaskan bahwa **representasi (struktur ikatan)** sama pentingnya dengan **konten (monomer)** — mirip bagaimana dua program dengan instruksi sama tetapi *control flow* berbeda berperilaku berbeda.
> >
> > Percabangan glikogen vs pati linear menggambarkan **trade-off struktur data**: rantai linear (mirip *linked list*) lambat diakses dari tengah, sedangkan struktur **bercabang/tree** memungkinkan banyak "ujung" untuk hidrolisis paralel — sehingga glukosa dapat dilepas cepat saat hewan butuh energi mendadak. Ini analog dengan memilih **tree** ketimbang **list** demi akses paralel. Hidrolisis selulosa yang "mustahil" tanpa enzim khusus (selulase) menggambarkan masalah **format yang tidak kompatibel**: data ada, tapi tanpa *parser* (enzim) yang tepat, ia tak terbaca.

> [!cornell] #### Summary
>
> **Karbohidrat** berkisar dari **monosakarida** (gula sederhana seperti **glukosa**, diklasifikasikan oleh jumlah karbon dan letak gugus karbonil) hingga **polisakarida**. **Disakarida** terbentuk lewat **dehydration reaction** yang menciptakan **glycosidic linkage**. **Polisakarida** punya peran **penyimpanan** — **pati** (tumbuhan, ikatan α) dan **glikogen** (hewan, bercabang) — serta peran **struktural** — **selulosa** (ikatan β, tak tercerna sebagian besar hewan). Pelajaran kuncinya: monomer identik (glukosa) menghasilkan molekul yang sangat berbeda hanya karena **posisi dan orientasi ikatan**, persis seperti representasi/encoding yang menentukan fungsi pada [[Carbon Chemistry, Macromolecular Classes, and ATP]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: α vs β Glycosidic Linkage
>
> Glukosa dapat membentuk cincin dalam dua konfigurasi: **α-glukosa** (gugus OH pada C1 di bawah bidang cincin) dan **β-glukosa** (OH di atas). Pati menggunakan ikatan **α-1,4** yang membuat rantai melengkung membentuk heliks (mudah dipecah enzim amilase). Selulosa menggunakan **β-1,4** yang membuat rantai lurus dan setiap glukosa terbalik 180° terhadap tetangganya — rantai-rantai ini berikatan hidrogen membentuk **mikrofibril** yang sangat kuat. Hewan ruminansia (sapi) mencerna selulosa hanya dengan bantuan mikroba simbiotik yang punya **selulase**.
>
> #### CS Angle: Encoding, Parsing, dan Kompatibilitas Format
>
> Pikirkan monomer glukosa sebagai **byte** yang sama, dan α/β linkage sebagai **byte order / serialization format** yang berbeda. Sistem yang hanya punya parser untuk format α (amilase) tidak bisa membaca data ber-format β (selulosa) — sebuah masalah **interoperabilitas** klasik. Struktur bercabang glikogen vs linear pati juga menggambarkan pilihan antara **tree (akses paralel cepat)** dan **list (sederhana, sekuensial)** dalam desain struktur data.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan representasi polisakarida sebagai *tree* (glikogen) vs *list* (pati linear), lalu ukur kompleksitas waktu untuk "melepas N glukosa dari ujung" pada keduanya.
> 2. Tulis *parser* mainan yang menerima string monomer + anotasi ikatan (`α`/`β`) dan menolak memproses ikatan β — simulasi enzim yang spesifik.
> 3. Telusuri format file SMILES/InChI untuk merepresentasikan glukosa α dan β; bandingkan bagaimana stereokimia di-*encode*.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 3 — Concept 3.3 *Carbohydrates*.
> - Berg, Tymoczko & Stryer, *Biochemistry* — bab Carbohydrates untuk detail glycosidic linkage.
> - Spesifikasi **SMILES** (Daylight) untuk representasi tekstual struktur gula.
