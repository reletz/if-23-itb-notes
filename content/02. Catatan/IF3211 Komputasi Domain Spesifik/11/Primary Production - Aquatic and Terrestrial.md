---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Primary Production - Aquatic and Terrestrial
>
> > ## Questions/Cues
> >
> > - Apa bedanya **GPP**, **NPP**, dan **NEP**?
> > - Mengapa di ekosistem akuatik **nutrien** (N, P) lebih membatasi daripada cahaya?
> > - Apa itu **eutrofikasi** dan bagaimana mekanismenya?
> > - Faktor apa yang mengontrol produksi primer **terestrial**?
> > - Bagaimana **perubahan iklim** mengubah NPP dan status **carbon sink/source**?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Primary Production)
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Climate Change Effects)
>
> > ### Anggaran Energi: GPP, NPP, dan NEP
> >
> > **Produksi primer (primary production)** adalah jumlah energi cahaya yang diubah menjadi energi kimia oleh autotrof per satuan waktu. Total fotosintesis menetapkan **"spending limit"** anggaran energi seluruh ekosistem. Output fotosintetik dibatasi oleh jumlah radiasi matahari yang mengenai permukaan Bumi — hanya sebagian kecil mengenai organisme fotosintetik, dan hanya **sekitar 1%** cahaya tampak yang mengenai mereka yang benar-benar dikonversi menjadi energi kimia.
> >
> > Tiga metrik kunci:
> >
> > - **GPP (Gross Primary Production)**: total produksi primer — jumlah energi cahaya (atau kimia pada kemoautotrof) yang dikonversi menjadi energi kimia per satuan waktu.
> > - **NPP (Net Primary Production)** = `GPP − respirasi autotrof`. Inilah **biomassa baru** yang ditambahkan dalam periode tertentu; energi yang benar-benar tersedia bagi konsumen.
> > - **NEP (Net Ecosystem Production)**: akumulasi biomassa total ekosistem selama periode waktu (memperhitungkan juga respirasi heterotrof/dekomposer). NEP menentukan apakah ekosistem menyimpan atau melepas karbon.
> >
> > ### Produksi Primer Akuatik: Cahaya vs Nutrien
> >
> > Di ekosistem laut dan air tawar, **cahaya dan nutrien** sama-sama mengontrol produksi primer. Penetrasi cahaya membatasi produksi di **photic zone**: sekitar separuh radiasi matahari diserap dalam **15 m pertama** air, dan hanya **5–10%** mencapai kedalaman 75 m. Jika cahaya adalah faktor pembatas utama, produksi primer semestinya meningkat dari kutub ke khatulistiwa — tetapi kenyataannya tidak.
> >
> > Lebih dari cahaya, **nutrien** membatasi produksi di lautan dan danau. Sebuah **limiting nutrient** adalah unsur yang harus ditambahkan agar produksi meningkat. **Nitrogen (N)** dan **fosfor (P)** paling sering membatasi produksi laut; misalnya N membatasi pertumbuhan fitoplankton di lepas pantai selatan Long Island. Eksperimen pengayaan **Sargasso Sea** menunjukkan penambahan **N + P + Fe (besi)** melonjakkan uptake ¹⁴C hingga ~13× kontrol — membuktikan **besi** dapat menjadi limiting nutrient tersembunyi.
> >
> > **Eutrofikasi** adalah peningkatan dramatis produksi primer akibat masuknya nutrien berlebih (mis. limpasan pupuk) ke ekosistem akuatik — memicu blooming alga, lalu deplesi oksigen saat alga membusuk.
> >
> > ### Produksi Primer Terestrial dan Efek Iklim
> >
> > Pada skala regional dan global, **suhu dan kelembapan** adalah faktor utama pengontrol produksi primer terestrial. **NPP meningkat seiring presipitasi tahunan, suhu, dan radiasi matahari** — ada relasi global yang kuat antara NPP dan **mean annual precipitation**.
> >
> > Nutrien tanah juga membatasi: secara global **nitrogen** paling membatasi pertumbuhan tanaman; **fosfor** membatasi terutama pada tanah tua yang fosfornya telah ter-leaching air. Menambahkan satu limiting nutrient hanya meningkatkan produksi sampai **nutrien lain menjadi pembatas** (hukum minimum Liebig).
> >
> > **Perubahan iklim** menggeser suhu dan presipitasi, lalu mengubah NPP terestrial. Pemanasan dan perubahan pola hujan menyebabkan **"hotter droughts"** yang memicu kebakaran hutan dan ledakan hama — mis. wabah **mountain pine beetle** (*Dendroctonus ponderosae*) yang membunuh pohon secara luas. Implikasinya pada **NEP**: ekosistem dengan **NEP > 0** menyerap lebih banyak karbon daripada yang dilepas (**carbon sink**); dengan **NEP < 0** melepas lebih banyak (**carbon source**). Perubahan iklim dapat **membalik** ekosistem dari sink menjadi source — sebuah feedback positif yang berbahaya.
> >
> > ### Framing Komputasional: NPP–Iklim sebagai Model Regresi/Prediktif
> >
> > Relasi NPP terhadap presipitasi dan suhu adalah contoh sempurna **supervised regression**. Variabel respons `NPP` (g C/m²/tahun) diprediksi dari fitur iklim: `NPP = f(presipitasi, suhu, radiasi, nutrien)`. Model **Miami** klasik bahkan menulisnya eksplisit sebagai fungsi saturasi:
> >
> > - `NPP_temp = NPP_max / (1 + e^(a − b·T))`
> > - `NPP_precip = NPP_max · (1 − e^(−c·P))`
> > - `NPP = min(NPP_temp, NPP_precip)` — mengkodekan **hukum Liebig** sebagai operasi `min` (faktor paling membatasi yang menentukan).
> >
> > Bagi mahasiswa informatika ini berarti: latih **linear/nonlinear regression** atau **random forest** pada data stasiun, validasi dengan **cross-validation**, dan ukur error dengan **R²/RMSE**. Konsep **limiting factor** memetakan langsung ke **bottleneck** dalam sistem — output dibatasi oleh resource paling langka, bukan rata-rata. Sementara dinamika **eutrofikasi** dan **sink↔source flip** adalah **tipping point** non-linear: cocok dimodelkan sebagai sistem dengan **bistability** dan dianalisis lewat bifurcation, bukan ekstrapolasi linear.
> >
> > ```mermaid
> > flowchart TD
> >     SUN["Radiasi matahari"] --> GPP["GPP<br/>(total fotosintesis)"]
> >     GPP -->|"− respirasi<br/>autotrof"| NPP["NPP<br/>(biomassa baru)"]
> >     NPP -->|"− respirasi<br/>heterotrof"| NEP["NEP<br/>(akumulasi<br/>karbon)"]
> >     LIM["Limiting factors:<br/>cahaya, N, P, Fe,<br/>suhu, air"] -.->|"membatasi"| GPP
> >     NEP -->|"NEP &gt; 0"| SINK["Carbon sink"]
> >     NEP -->|"NEP &lt; 0"| SRC["Carbon source"]
> > ```

> [!cornell] #### Summary
>
> **Produksi primer** mengukur konversi energi cahaya menjadi energi kimia oleh autotrof dan menetapkan **anggaran energi** ekosistem (hanya ~1% cahaya yang dikonversi). **GPP** adalah total fotosintesis; **NPP = GPP − respirasi autotrof** (biomassa baru bagi konsumen); **NEP** adalah akumulasi karbon bersih yang menentukan status **carbon sink (NEP > 0)** atau **source (NEP < 0)**. Di ekosistem **akuatik**, **nutrien (N, P, dan kadang Fe)** lebih membatasi daripada cahaya, dan kelebihan nutrien memicu **eutrofikasi**. Di ekosistem **terestrial**, **suhu, presipitasi, dan radiasi** mengontrol NPP, dengan **N/P** sebagai pembatas tanah; **perubahan iklim** dapat membalik ekosistem dari sink menjadi source. Secara komputasi, kopling NPP–iklim adalah **model regresi/prediktif** dengan **limiting factor = operasi min (bottleneck)**. Lihat lanjutannya di [[Energy Transfer and Trophic Efficiency]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengukur NPP dengan Satelit
>
> NPP global modern diestimasi dari satelit (mis. produk **MODIS NPP**) lewat model **Light-Use Efficiency**: `NPP ≈ ε · APAR`, di mana **APAR** = radiasi aktif-fotosintesis yang diserap (dihitung dari indeks vegetasi **NDVI**) dan **ε** = efisiensi penggunaan cahaya yang dimodulasi suhu dan kelembapan. Ini mengubah ekologi menjadi pipeline pemrosesan citra raster skala planet.
>
> #### CS Angle: Eutrofikasi sebagai Sistem Bistable
>
> Danau dapat memiliki **dua attractor stabil**: jernih (oligotrofik) dan keruh (eutrofik). Dimodelkan dengan ODE beban fosfor `dP/dt = load − sedimentation(P) + recycling(P)`, term recycling non-linear menghasilkan **histeresis**: setelah melewati tipping point, mengurangi beban tidak otomatis memulihkan danau. Ini contoh nyata **hysteresis loop** yang familiar bagi mahasiswa sistem kontrol/state machine.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil dataset NPP vs iklim (mis. NPP global + WorldClim), latih regresi linear & random forest, bandingkan R²/RMSE, dan identifikasi fitur paling prediktif.
> 2. Simulasikan model fosfor danau bistable di Python; cari nilai beban kritis (tipping point) dan demonstrasikan histeresis dengan menaikkan lalu menurunkan beban.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 42 — *Concept 42.2*.
> - Lieth, H. (1975) "Modeling the Primary Productivity of the World" (Miami model).
> - Scheffer, M. *Critical Transitions in Nature and Society* — tipping points & eutrofikasi.
> - Running, S.W. et al. — dokumentasi algoritma MODIS NPP/GPP (MOD17).
