---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Evidence for Evolution and the MRSA Case Study
>
> > ## Questions/Cues
> >
> > - Apa empat jenis data yang mendokumentasikan pola evolusi?
> > - Bagaimana **bakteri resisten obat (MRSA)** menjadi bukti seleksi alam *real-time*?
> > - Mengapa seleksi alam **tidak menciptakan** sifat baru, hanya **menggeser frekuensi**?
> > - Apa itu **tekanan seleksi (selective pressure)** dan mengapa **generation time** penting?
> > - Bagaimana MRSA dipandang sebagai **search space** yang dibentuk oleh tekanan seleksi?
> >
> > ## Reference Points
> >
> > - IF3211 — Evolution (PPT 9, bagian *Concept 19.3 — Evidence*)
> > - IF3211 — Evolution (PPT 9, bagian *The Evolution of Drug-Resistant Bacteria*)
>
> > ### Empat Jenis Bukti Evolusi
> >
> > Teori evolusi didukung oleh bukti ilmiah yang melimpah. Terdapat **empat jenis data** yang mendokumentasikan **pola** evolusi dan menerangi **bagaimana** ia terjadi: (1) **Direct observations** (pengamatan langsung perubahan, mis. resistensi obat); (2) **Homology** (kemiripan akibat leluhur bersama); (3) **The fossil record** (rekaman fosil dalam strata); dan (4) **Biogeography** (distribusi geografis spesies). Catatan ini fokus pada **pengamatan langsung**, yang paling kuat karena memperlihatkan evolusi **sedang terjadi sekarang**; tiga jenis lainnya dibahas pada [[Homology, Convergence, and Biogeography]].
> >
> > ### MRSA: Seleksi Alam Real-Time
> >
> > Bakteri **Staphylococcus aureus** umum ditemukan di kulit atau saluran hidung manusia. Varian genetiknya yang **resisten metisilin** — **MRSA (Methicillin-Resistant S. aureus)** — adalah patogen berbahaya; misalnya **klon USA300** dapat menyebabkan "flesh-eating disease" dan infeksi yang berpotensi fatal.
> >
> > Sejarahnya memperlihatkan seleksi alam yang cepat: **penicillin** menyelamatkan jutaan jiwa, tetapi **S. aureus menjadi resisten penicillin pada 1945 — hanya dua tahun** setelah penggunaan luasnya. Pola yang sama terulang: resistensi terhadap **metisilin** juga berevolusi **dalam dua tahun** sejak penggunaan luasnya. Metisilin bekerja dengan **menghambat protein** yang dipakai kebanyakan bakteri untuk menyintesis dinding sel; bakteri **MRSA memakai protein berbeda** untuk tugas itu, sehingga **bertahan dan bereproduksi lebih tinggi** saat terpapar metisilin. Strain MRSA kini resisten terhadap banyak antibiotik.
> >
> > ### Seleksi Menggeser Frekuensi, Bukan Menciptakan Sifat
> >
> > Poin konseptual paling penting dari kasus MRSA: **seleksi alam tidak menciptakan sifat baru — ia menyeleksi sifat yang sudah ada di populasi**. Sebelum antibiotik diberikan, sebagian kecil bakteri **sudah** kebetulan memiliki varian protein dinding sel yang resisten (lewat mutasi acak sebelumnya). Antibiotik tidak "mengajari" bakteri menjadi resisten; ia **membunuh yang rentan** sehingga yang resisten mendominasi.
> >
> > Dua faktor membuat ini cepat. Pertama, **antibiotik adalah tekanan seleksi (selective pressure)** yang sangat kuat: hanya yang resisten lolos. Kedua, **evolusi berlangsung cepat pada spesies dengan generation time pendek** — bakteri membelah dalam hitungan menit, jadi ribuan generasi berlalu dalam sehari. **Lingkungan lokal saat ini** yang menentukan sifat mana yang diseleksi untuk atau melawan — buang antibiotik, dan strain resisten bisa kehilangan keunggulannya bila resistensi itu mahal secara metabolik.
> >
> > ### Sudut Pandang Komputasi: MRSA sebagai Tekanan Seleksi pada Search Space
> >
> > Kasus MRSA adalah demonstrasi murni **seleksi sebagai filter pada fitness landscape**. Populasi bakteri = kumpulan kandidat di **search space** genotipe. Tanpa antibiotik, **fungsi fitness** relatif datar dan beragam genotipe bertahan. Pemberian antibiotik **mengubah fungsi fitness secara drastis**: genotipe rentan mendapat fitness ≈ 0, genotipe resisten mendapat fitness tinggi. Inilah **dynamic/non-stationary fitness landscape** — persis tantangan yang dipelajari dalam optimasi: solusi optimal bergeser saat objektif berubah.
> >
> > Pemetaan komponen GA-nya jelas: **mutasi acak** menyediakan diversitas genotipe **sebelum** tekanan datang (eksplorasi yang sudah terjadi), lalu **selection** mengeksploitasi diversitas itu begitu tekanan muncul. Karena seleksi "hanya bisa memilih dari yang ada", **diversitas populasi adalah modal** — populasi tanpa varian resisten akan punah, sama seperti GA yang kehilangan diversitas akan macet dan gagal beradaptasi saat objektif berubah. **Generation time pendek** = banyak iterasi per satuan waktu = konvergensi cepat menuju puncak fitness baru. Strategi medis "rotasi/kombinasi antibiotik" pun setara dengan **mengubah-ubah fungsi fitness** agar tak ada satu genotipe yang sempat mendaki ke puncak dominan.

> [!cornell] #### Summary
>
> Evolusi didukung **empat jenis bukti**: **pengamatan langsung**, **homologi**, **rekaman fosil**, dan **biogeografi**. Pengamatan langsung paling dramatis pada **bakteri resisten obat**: **MRSA** berevolusi resisten terhadap penicillin lalu metisilin **dalam dua tahun** masing-masing, dengan memakai protein dinding sel alternatif. Kuncinya, **seleksi alam tidak menciptakan sifat baru** melainkan **menggeser frekuensi** sifat yang sudah ada — antibiotik membunuh yang rentan dan menyisakan yang resisten. Faktor pemercepatnya adalah **tekanan seleksi kuat** dan **generation time pendek**. Secara komputasional, MRSA adalah **search space** dengan **fitness landscape non-stasioner** yang dibentuk tekanan seleksi, menegaskan mekanisme di [[Natural Selection and Descent with Modification]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Cost of Resistance dan Antibiotic Stewardship
>
> Resistensi sering membawa **biaya kebugaran (fitness cost)**: protein alternatif bisa kurang efisien, sehingga di lingkungan tanpa antibiotik strain resisten kalah bersaing dari yang sensitif. Ini dasar **antibiotic stewardship** — membatasi pemakaian antibiotik agar tekanan seleksi turun dan frekuensi resistensi bisa menurun kembali. Penyalahgunaan antibiotik (mis. tidak menghabiskan dosis) justru memberi tekanan parsial yang ideal untuk menyeleksi resistensi.
>
> #### CS Angle: Non-Stationary Optimization dan Diversity Maintenance
>
> MRSA memetakan langsung ke **optimization in dynamic environments**. Saat fungsi objektif berubah seiring waktu, algoritma yang sudah konvergen ke satu optimum akan tertinggal. Solusi algoritmiknya — **hypermutation saat perubahan terdeteksi**, **niching/island models** untuk menjaga diversitas, dan **memory-based approaches** — semuanya memiliki padanan biologis: diversitas genetik sebagai asuransi terhadap perubahan lingkungan. Pelajaran intinya: **jangan biarkan populasi (atau GA) kehilangan diversitas** bila lingkungan bisa berubah.
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasikan populasi bakteri (agent-based) dengan sebagian kecil agen resisten; nyalakan "antibiotik" pada generasi tertentu dan plot pergeseran frekuensi resistensi sebelum/sesudah.
> 2. Bandingkan dua kebijakan: antibiotik tunggal terus-menerus vs rotasi dua antibiotik; ukur kecepatan munculnya resistensi total pada masing-masing skenario.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 19 — *Drug-Resistant Bacteria*.
> - WHO — *Global Action Plan on Antimicrobial Resistance*.
> - Branke, J. *Evolutionary Optimization in Dynamic Environments*.
