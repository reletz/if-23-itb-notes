---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Biologi Tumbuhan Lanjut]]

> [!cornell] Resource Acquisition and Transport in Vascular Plants
>
> > ## Questions/Cues
> >
> > - Mengapa tumbuhan vaskular memerlukan sistem transport khusus?
> > - Bagaimana mekanisme transpor air dari akar ke daun?
> > - Faktor apa yang memengaruhi potensial air sel?
> > - Peran apa yang dimiliki mikoriza dalam penyerapan nutrisi?
> > - Adaptasi apa saja yang dimiliki tumbuhan epifit?
> > - Bagaimana stomata mengatur laju transpirasi?
> >
> > ## Reference Points
> >
> > - Campbell Biology in Focus Chapter 29 (Slides 24-46)
> > - Plant Structure and Function ITB (Slides 1-23, 79-86)
> >
>
> > ### Sistem Transportasi Apoplast dan Symplast
> > Tumbuhan vaskular mengembangkan dua jalur transportasi utama untuk air dan nutrisi: apoplast dan symplast. **Apoplast** mencakup seluruh ruang ekstraseluler termasuk dinding sel dan xilem mati, berfungsi sebagai "jalan tol" untuk transportasi air cepat. **Symplast** meliputi jaringan sitoplasma hidup yang terhubung melalui plasmodesmata, memungkinkan kontrol selektif atas zat yang masuk.
> > Contoh praktis: Saat menyiram tanaman, air pertama kali bergerak melalui apoplast di tanah, kemudian masuk ke symplast ketika melewati membran sel endodermis akar. Endodermis bertindak sebagai pos pemeriksaan dengan pita Caspary yang mencegah pergerakan zat tak terkendali ke stele akar.
> > ### Potensial Air dan Mekanisme Transpor
> > **Potensial air (Ψ)** menentukan arah pergerakan air dalam tumbuhan, dihitung melalui persamaan Ψ = Ψs + Ψp. **Potensial osmotik (Ψs)** dipengaruhi konsentrasi zat terlarut, sedangkan **potensial tekanan (Ψp)** merepresentasikan tekanan fisik. Air selalu bergerak dari daerah berpotensial tinggi ke rendah.
> > Pada kondisi osmosis:
> > - Sel flaccid: Ψs = -0.6 MPa, Ψp = 0 MPa → Ψ = -0.6 MPa
> > - Sel turgid: Ψs = -0.8 MPa, Ψp = +0.6 MPa → Ψ = -0.2 MPa
> > Tekanan turgor inilah yang membuat jaringan muda tetap kokoh. Tanpanya, tanaman akan layu.
> > ### Akuisisi Nutrisi dari Tanah
> > Tanah yang ideal mengandung 45% mineral, 5% bahan organik, 25% air, dan 25% udara. Tumbuhan menyerap 17 unsur esensial melalui proses:
> > 1. **Pertukaran kation**: Ion H⁺ dari akar menggantikan kation (K⁺, Ca²⁺) yang terikat partikel tanah
> > 2. **Simbiosis mikoriza**: Jamur meningkatkan luas permukaan serapan 10-100x
> > 3. **Fiksasi nitrogen**: Bakteri rhizobium mengubah N₂ atmosfer menjadi NH₃
> > Contoh defisiensi nutrisi:
> > - Nitrogen: Daun tua menguning
> > - Fosfor: Pertumbuhan terhambat
> > - Kalium: Pinggiran daun nekrotik
> > ### Adaptasi Khusus untuk Akuisisi Sumber Daya
> > Beberapa tumbuhan mengembangkan strategi non-tradisional:
> > - **Epifit** (e.g., anggrek): Menyerap air melalui velamen radicum (jaringan spons di akar)
> > - **Tanaman karnivora** (e.g., kantong semar): Menghasilkan enzim protease untuk mencerna serangga
> > - **Parasit** (e.g., Cuscuta): Haustoria menembus floem inang
> > Mekanisme konservasi air:
> > - **Stomata tersembunyi** (crypts) pada tumbuhan gurun
> > - Lapisan lilin (kutikula) tebal
> > - Daun termodifikasi menjadi duri
> > ### Regulasi Transpirasi melalui Stomata
> > Stomata terdiri dari dua sel penjaga yang mengatur bukaan berdasarkan:
> > - Konsentrasi ion K⁺: Masuk K⁺ → sel menggembung → stomata terbuka
> > - Cahaya biru: Mengaktifkan fotoreseptor phototropin
> > - Konsentrasi CO₂ internal
> > Sel penjaga menggunakan pompa proton H⁺-ATPase untuk menciptakan gradien listrik yang menarik ion K⁺ masuk. Peningkatan tekanan turgor menyebabkan sel melengkung dan stomata membuka.

> [!cornell] #### Summary
>
> **Sistem vaskular** memungkinkan transportasi air dan nutrisi melalui **xilem** (air + mineral) dan **floem** (gula + organik) dengan memanfaatkan perbedaan **potensial air**. **Akuisisi nutrisi** diperkuat oleh simbiosis mikoriza dan adaptasi khusus seperti tanaman karnivora. **Stomata** berperan kritis dalam menyeimbangkan pertukaran gas dan konservasi air melalui regulasi bukaan berbasis cahaya, CO₂, dan sinyal hormonal. **Teknik komputasi** seperti algoritma genetika membantu optimasi strategi akuisisi sumber daya.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Lanjut Tekanan Lingkungan
> **Tekanan osmosis tanah saline**:
> Ψ tanah = -2.5 MPa → tanaman halofit menghasilkan kompatibel solut (prolin, glisin betain) untuk menurunkan Ψ sel hingga -3.0 MPa. Contoh: _Avicennia marina_ di mangrove mengsekresikan garam melalui kelenjar daun.
>
> **Model aliran tekanan (Pressure Flow Hypothesis)**:
> Pada floem, sukrosa dipompa ke pembuluh tapis (sieve tube) di sumber (daun), menurunkan Ψ → air masuk secara osmosis → menciptakan tekanan yang mendorong cairan floem ke sink (akar/buah). Persamaan kontinuitas: Q = πr⁴ΔP / 8ηL.
>
> #### Teknik Komputasi dalam Studi Transport
> 1. **Pemodelan L-systems**: Mensimulasikan pola percabangan akar menggunakan aturan produksi "F → F[+F]F[-F]F" dengan sudut 25°
> 2. **Algoritma Genetika**: Mengoptimasi seleksi parental tanaman dengan fungsi fitness berdasarkan GEBV (Genomic Estimated Breeding Values)
> 3. **CNN untuk analisis stomata**: Mendeteksi kepadatan stomata dari citra mikroskopis menggunakan arsitektur U-Net
>
> #### Proyek Eksperimen Mandiri
> 1. Ukur laju transpirasi dengan potometer menggunakan variabel: intensitas cahaya, kelembapan, spesies tanaman
> 2. Kultur hidroponik dengan variasi konsentrasi NPK, amati gejala defisiensi dan ukur pertumbuhan biomassa
> 3. Simulasi model transport apoplast-symplast menggunakan jaringan spons (apoplast) dan pipa kapiler (symplast)
>
> #### Alat dan Dataset
> - **Software**: PhytoSim (model transport ion), RootNav (analisis arsitektur akar)
> - **Database**: TRY Plant Trait Database, SPUN (Soil Profile of Underground Networks)
> - **Protokol**: ICP-MS untuk analisis mineral jaringan, Pressure Chamber untuk mengukur Ψ daun
>
> #### Bacaan Lanjut
> - Taiz, L., Zeiger, E. _Plant Physiology_ Ed.6, Bab 4 (Water Transport)
> - Nobel, P.S. _Physicochemical and Environmental Plant Physiology_
> - Jurnal: _Plant, Cell & Environment_ (Impact Factor 7.947)
> - Kursus online: edX "Plant Transport Systems" (Universitas Tel Aviv)