---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Energy Forms and the Laws of Thermodynamics
>
> > ## Questions/Cues
> >
> > - Apa itu **metabolisme** dan bagaimana **metabolic pathway** disusun dari reaksi katabolik vs anabolik?
> > - Bentuk-bentuk energi apa saja yang relevan dalam sistem biologis (kinetik, potensial, kimia, termal)?
> > - Apa bunyi **Hukum Pertama** dan **Hukum Kedua Termodinamika**?
> > - Apa itu **entropi** dan mengapa setiap transformasi energi menambahnya?
> > - Bagaimana **entropi termodinamika** berhubungan dengan **entropi informasi (Shannon)**?
> >
> > ## Reference Points
> >
> > - IF3211 — Metabolism (PPT 6, bagian Metabolism & Metabolic Pathways)
> > - IF3211 — Metabolism (PPT 6, bagian Forms of Energy)
> > - IF3211 — Metabolism (PPT 6, bagian The Laws of Energy Transformation)
>
> > ### Metabolisme dan Metabolic Pathway
> >
> > **Metabolisme** adalah totalitas seluruh reaksi kimia dalam organisme — sel diibaratkan sebagai *pabrik kimia mini* tempat ribuan reaksi berlangsung. Metabolisme merupakan **emergent property**: ia muncul dari interaksi *teratur* antar molekul, bukan dari satu molekul tunggal. Studi tentang bagaimana energi mengalir melalui makhluk hidup disebut **bioenergetics**.
> >
> > Sebuah **metabolic pathway** dimulai dari molekul awal tertentu dan berakhir pada sebuah produk, melewati serangkaian langkah. **Setiap langkah dikatalisis oleh enzim spesifik** — ini adalah ide kunci: jalur metabolik adalah *pipeline* terurut, bukan satu lompatan besar. Dua arah utama:
> >
> > - **Catabolic pathway** (katabolik): memecah molekul kompleks menjadi sederhana dan **melepaskan** energi (mis. respirasi seluler memecah glukosa).
> > - **Anabolic pathway** (anabolik): membangun molekul kompleks dari sederhana dan **membutuhkan** energi (mis. sintesis protein dari asam amino).
> >
> > Energi yang dilepaskan jalur katabolik menjadi "bahan bakar" yang menggerakkan jalur anabolik — sebuah neraca energi internal sel.
> >
> > ### Bentuk-Bentuk Energi
> >
> > **Energi** adalah *kapasitas untuk menyebabkan perubahan*. **Work (kerja)** adalah perpindahan materi melawan gaya penghambat seperti gravitasi dan gesekan. Energi hadir dalam beberapa bentuk:
> >
> > - **Kinetic energy** — energi yang terkait dengan **gerak**.
> > - **Thermal energy (energi termal)** — energi kinetik dari gerak acak atom/molekul; **heat (kalor)** adalah energi termal yang sedang *berpindah* dari satu objek ke objek lain.
> > - **Potential energy** — energi yang dimiliki materi karena **lokasi atau strukturnya**.
> > - **Chemical energy** — energi potensial yang tersimpan dalam ikatan dan *tersedia untuk dilepaskan* dalam reaksi kimia.
> > - **Light (cahaya)** — bentuk energi lain yang dapat dipanen untuk kerja (mis. fotosintesis).
> >
> > Poin penting: **energi dapat dikonversi dari satu bentuk ke bentuk lain** — bola di puncak bukit menyimpan energi potensial yang berubah menjadi kinetik saat menggelinding turun. Dalam sel, energi kimia ikatan glukosa dikonversi menjadi kerja seluler.
> >
> > ### Hukum-Hukum Termodinamika
> >
> > **Termodinamika** adalah studi tentang transformasi energi. Sistem dibedakan menjadi **open system** (energi dan materi dapat dipertukarkan dengan lingkungan) dan **isolated system** (tidak ada pertukaran). **Organisme adalah open system** — mereka terus menukar energi dan materi dengan lingkungannya.
> >
> > **Hukum Pertama Termodinamika** (prinsip **konservasi energi**): energi alam semesta bersifat **konstan** — energi dapat ditransfer dan diubah bentuk, tetapi **tidak dapat diciptakan atau dimusnahkan**.
> >
> > **Hukum Kedua Termodinamika**: setiap transfer atau transformasi energi **menambah entropi alam semesta**. **Entropi** adalah ukuran *ketidakteraturan molekul* — seberapa tersebar energi dalam sistem dan berapa banyak tingkat energi yang ada. Mengapa entropi selalu naik? Karena pada setiap transformasi, **sebagian energi hilang ke lingkungan sebagai kalor**, dan kalor menambah ketidakteraturan lingkungan. Konsekuensinya: **proses spontan** (terjadi tanpa input energi) hanya berlangsung jika ia *menambah* entropi alam semesta; **proses nonspontan** menurunkan entropi dan menuntut pasokan energi.
> >
> > **Catatan penting — hidup tidak melanggar Hukum Kedua:** organisme menciptakan keteraturan internal (entropi lokal turun), tetapi dengan *membuang* lebih banyak ketidakteraturan ke lingkungan (panas, limbah). Entropi *total* alam semesta tetap naik.
> >
> > ### Sudut Pandang Komputasi: Entropi Termodinamika ↔ Entropi Informasi
> >
> > Bagi mahasiswa informatika, **entropi** adalah jembatan paling tajam ke dunia komputasi. Boltzmann mendefinisikan entropi termodinamika sebagai $S = k_B \ln W$, dengan $W$ jumlah **mikrostate** yang konsisten dengan satu makrostate. Shannon — terinspirasi langsung dari sini — mendefinisikan **entropi informasi** $H = -\sum p_i \log_2 p_i$ sebagai ukuran *ketidakpastian* atau *jumlah bit* yang dibutuhkan untuk mengkodekan sebuah pesan. Keduanya mengukur hal yang sama secara struktural: **banyaknya kemungkinan / ketersebaran**.
> >
> > Analogi konkret: sistem yang "teratur" (semua molekul di satu sudut) punya sedikit mikrostate → entropi rendah → seperti pesan yang dapat dikompresi sangat padat. Sistem "kacau" punya banyak mikrostate → entropi tinggi → seperti data acak yang *tidak dapat dikompresi*. **Hukum Kedua** menyatakan alam semesta cenderung ke entropi maksimum — analog dengan fakta bahwa string acak adalah keadaan paling "umum" dan paling sulit dikompresi.
> >
> > Sel hidup, dari kacamata ini, adalah **mesin yang menjaga keadaan ber-entropi-rendah (terorganisir)** dengan terus-menerus "membayar" menggunakan aliran energi bebas — mirip dengan algoritma yang mempertahankan struktur data terurut dengan kerja komputasi berkelanjutan.
> >
> > ```mermaid
> > flowchart TB
> >     S["Molekul awal"] --> A["Catabolic pathway<br/>(pecah, lepas energi)"]
> >     A --> E["Energi + entropi naik"]
> >     E --> B["Anabolic pathway<br/>(bangun, butuh energi)"]
> >     B --> P["Produk kompleks"]
> >     E -. "panas ke lingkungan" .-> U["Entropi alam semesta naik<br/>(Hukum Kedua)"]
> > ```

> [!cornell] #### Summary
>
> **Metabolisme** adalah totalitas reaksi kimia sel, tersusun sebagai **metabolic pathways** terurut di mana tiap langkah dikatalisis enzim spesifik; jalur **katabolik** memecah molekul dan melepas energi, jalur **anabolik** membangun molekul dan menyerap energi. Energi hadir sebagai **kinetik**, **potensial**, **kimia**, dan **termal**, dan dapat dikonversi antar bentuk. **Hukum Pertama Termodinamika** menyatakan energi kekal (tidak tercipta/musnah), sementara **Hukum Kedua** menyatakan setiap transformasi menambah **entropi** alam semesta karena sebagian energi hilang sebagai kalor — sehingga hanya **proses spontan** yang menaikkan entropi total yang dapat berlangsung tanpa input energi. Konsep entropi ini menjadi jembatan ke **entropi informasi Shannon** dan ke konsep [[Free Energy, Stability, and Spontaneity]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengukur Entropi dan Energi Bebas Gibbs
>
> Hukum Kedua secara kuantitatif terkait energi bebas Gibbs lewat $\Delta G = \Delta H - T\Delta S$, di mana $\Delta S$ adalah perubahan entropi sistem dan $T$ suhu absolut. Suku $T\Delta S$ menjelaskan mengapa banyak reaksi *digerakkan oleh entropi* (mis. pelarutan, pelipatan/pembukaan protein) meski tidak melepas kalor. Reaksi yang menaikkan jumlah partikel atau derajat kebebasan (mis. ATP → ADP + Pi) memperoleh dorongan entropik besar.
>
> #### CS / Computational Angle: Landauer's Principle
>
> **Prinsip Landauer** (1961) menghubungkan komputasi dengan termodinamika secara langsung: **menghapus satu bit informasi** menuntut pelepasan energi minimal $k_B T \ln 2$ sebagai kalor. Artinya, komputasi *logically irreversible* (mis. operasi AND yang membuang masukan) punya batas bawah energi fisik. Ini menjadi dasar riset **reversible computing** dan menjelaskan mengapa entropi informasi dan entropi termodinamika bukan sekadar analogi, melainkan terikat secara fisik. Mahasiswa informatika dapat melihat sel sebagai "komputer molekuler" yang beroperasi mendekati batas efisiensi termodinamika ini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan simulasi gas ideal sederhana (partikel dalam kotak) dan plot bagaimana jumlah mikrostate yang dapat diakses (estimasi entropi Boltzmann) berubah saat partikel menyebar dari satu sudut.
> 2. Hitung **entropi Shannon** dari beberapa berkas (teks vs gambar terkompresi vs data acak) dan bandingkan dengan rasio kompresi `gzip`-nya. Diskusikan kaitannya dengan "ketidakteraturan".
> 3. Modelkan sebuah metabolic pathway 3-langkah sebagai pipeline dan lacak neraca energi katabolik→anabolik.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 6 — *An Introduction to Metabolism*.
> - Shannon, C. (1948). *A Mathematical Theory of Communication*.
> - Landauer, R. (1961). *Irreversibility and Heat Generation in the Computing Process*.
