---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Biogeography, Disturbance, and Disease Ecology
>
> > ## Questions/Cues
> >
> > - Apa itu disturbance dan bunyi intermediate disturbance hypothesis?
> > - Apa beda suksesi primer dan sekunder?
> > - Mengapa diversitas spesies tertinggi di tropis (latitudinal gradient)?
> > - Bagaimana species-area curve dan island equilibrium model bekerja?
> > - Bagaimana patogen dan penyakit zoonosis memengaruhi komunitas?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecological Communities (PPT 11, bagian Disturbance & Succession)
> > - IF3211 — Ecological Communities (PPT 11, bagian Biogeography & Zoonotic Diseases)
>
> > ### Disturbance dan Intermediate Disturbance Hypothesis
> >
> > **Disturbance (gangguan)** — seperti badai, kebakaran, atau aktivitas manusia — adalah peristiwa yang mengubah komunitas dengan menyingkirkan organisme atau mengubah ketersediaan sumber daya. Gangguan membuat banyak komunitas **tidak pernah mencapai ekuilibrium** dalam diversitas maupun komposisi; inilah **nonequilibrium model** yang memandang komunitas terus berubah pasca-gangguan.
> >
> > Tingkat gangguan tinggi biasanya akibat **intensitas dan frekuensi tinggi**, sedangkan tingkat rendah akibat frekuensi atau intensitas rendah. **Intermediate disturbance hypothesis** menyatakan bahwa **tingkat gangguan moderat** mendorong diversitas lebih tinggi daripada gangguan tinggi atau rendah. Gangguan tinggi menyingkirkan spesies yang tumbuh/berkoloni lambat; gangguan rendah membiarkan spesies kompetitor dominan mengeksklusi yang kurang kompetitif. Gangguan moderat menyeimbangkan keduanya.
> >
> > ### Suksesi Ekologi
> >
> > **Suksesi ekologi (ecological succession)** adalah perubahan komposisi komunitas secara berurutan selama kolonisasi pasca-gangguan besar. **Suksesi primer (primary succession)** terjadi di area nyaris tanpa kehidupan — seperti pulau vulkanik baru atau puing yang ditinggalkan gletser yang surut — di mana belum ada tanah dan organisme perintis (mis. lichen) harus memulai dari nol. **Suksesi sekunder (secondary succession)** dimulai di area yang gangguan besarnya telah menyingkirkan sebagian besar—tetapi tidak semua—organisme, sehingga tanah dan benih masih tersisa (mis. lahan pasca-kebakaran hutan). Aktivitas manusia (pertanian, *clear-cutting*, *overgrazing*, *trawling* dasar laut) adalah gangguan terkuat dan umumnya **menurunkan** diversitas.
> >
> > ### Pola Biogeografi: Latitudinal Gradient dan Area Effects
> >
> > **Species richness tertinggi di tropis** dan umumnya menurun ke arah kutub — **latitudinal diversity gradient**. Dua faktor kunci: **sejarah evolusi** (komunitas tropis lebih tua, lebih lama berakumulasi spesies) dan **iklim**, khususnya **evapotranspirasi** (penguapan air dari tanah + transpirasi tumbuhan), proxy energi dan air yang berkorelasi dengan richness.
> >
> > **Species-area curve** mengkuantifikasi gagasan bahwa, dengan faktor lain setara, area geografis lebih luas memiliki lebih banyak spesies — karena menawarkan keragaman habitat lebih besar. **Pulau** ideal untuk mempelajari faktor biogeografi. **Island equilibrium model (MacArthur–Wilson)** menyatakan jumlah spesies di pulau adalah ekuilibrium dinamis antara **laju kolonisasi** (lebih tinggi untuk pulau dekat daratan) dan **laju kepunahan** (lebih tinggi untuk pulau kecil).
> >
> > ### Patogen dan Penyakit Zoonosis
> >
> > Komunitas ekologi secara universal dipengaruhi **patogen** — mikroorganisme dan virus penyebab penyakit. Patogen dapat berdampak dramatis saat **diintroduksi ke habitat baru**: terumbu karang dihancurkan **white-band disease**, dan **sudden oak death** membunuh lebih dari sejuta pohon ek sehingga menurunkan kelimpahan burung yang bergantung padanya.
> >
> > Tiga perempat penyakit manusia yang muncul disebabkan **patogen zoonosis (zoonotic pathogen)** — yang berpindah dari hewan lain ke manusia. Transfer bisa langsung atau melalui spesies perantara yang disebut **vektor** (sering parasit: caplak, kutu, nyamuk). Aktivitas manusia mengangkut patogen ke seluruh dunia dengan laju tak terkira — contohnya **SARS-CoV-2** (COVID-19) yang menyebar global lewat perjalanan manusia, dengan korban tewas global terkonfirmasi lebih dari 5 juta hingga akhir 2021.
> >
> > ### Framing Komputasional: Model Dinamis Kolonisasi-Kepunahan dan Penyebaran Penyakit
> >
> > **Island equilibrium** adalah **dynamic model** par excellence: titik temu dua kurva laju, di mana `dS/dt = (laju kolonisasi) − (laju kepunahan) = 0` menentukan jumlah spesies ekuilibrium `S*` — analog *steady state* pada sistem dinamik atau *birth–death process*. **Species-area relationship** sering berbentuk hukum pangkat `S = c·A^z` (linear pada skala log-log), sehingga `z` dapat diestimasi via **regresi linear**. Penyebaran penyakit zoonosis dimodelkan dengan **compartmental model SIR/SEIR** (`dS/dt = −βSI`, `dI/dt = βSI − γI`, `dR/dt = γI`), di mana **basic reproduction number** `R₀ = β/γ` menentukan apakah wabah meledak. Karena penularan mengalir melalui kontak inang-vektor, ia juga merupakan **proses penyebaran pada graf (network epidemiology)** — persis seperti *information cascade* pada jejaring sosial.

> [!cornell] #### Summary
>
> **Disturbance** menjaga komunitas tetap dinamis (**nonequilibrium model**), dan **intermediate disturbance hypothesis** memprediksi diversitas maksimum pada gangguan moderat. **Suksesi primer** mulai dari area tanpa kehidupan, **suksesi sekunder** dari sisa-sisa pasca-gangguan. **Latitudinal gradient** menempatkan richness tertinggi di tropis (dipengaruhi sejarah evolusi dan **evapotranspirasi**), sementara **species-area curve** dan **island equilibrium model (MacArthur–Wilson)** menjelaskan diversitas sebagai ekuilibrium **kolonisasi vs kepunahan**. **Patogen** dan **penyakit zoonosis** (lewat **vektor**, mis. SARS-CoV-2) membentuk struktur komunitas dan dimodelkan lewat **SIR/SEIR** serta **network epidemiology**. Lihat juga [[Mutualism, Commensalism, and Species Diversity]] dan [[Trophic Structure and Community Organization]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Glacier Bay dan Teori MacArthur–Wilson
>
> Suksesi primer terdokumentasi rapi di **Glacier Bay, Alaska**: setelah gletser surut, urutan kolonisasi berjalan dari lichen/lumut → semak *Dryas* pengikat nitrogen → alder → pohon spruce yang akhirnya mendominasi. Teori biogeografi pulau **MacArthur & Wilson (1967)** memprediksi: pulau besar-dekat punya `S*` tertinggi, pulau kecil-jauh terendah — diuji empiris lewat pengamatan rekolonisasi mangrove dan eksperimen defaunasi. Implikasinya penting untuk **desain kawasan konservasi** (SLOSS debate: *Single Large or Several Small*).
>
> #### CS / Computational Angle
>
> Penyebaran penyakit pada populasi terstruktur paling baik dimodelkan sebagai **epidemic on networks**: setiap individu adalah node, kontak adalah edge, dan ambang epidemi bergantung pada **eigenvalue terbesar matriks adjacency** serta heterogenitas degree (jaringan *scale-free* dengan hub menurunkan ambang wabah drastis). Hal ini menjelaskan strategi vaksinasi tertarget pada *super-spreader*. Species-area `S = c·A^z` adalah *power law* — sama keluarga dengan distribusi degree scale-free — dan estimasi `z` via regresi log-log adalah latihan dasar *curve fitting*. Model kolonisasi-kepunahan pulau pun dapat diimplementasikan sebagai **Markov birth–death chain**.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan model SIR dengan `scipy.integrate.odeint`; variasikan `β` dan `γ`, hitung `R₀`, dan amati kapan kurva infeksi meledak vs padam.
> 2. Ambil data jumlah spesies vs luas dari beberapa pulau/petak, lakukan regresi log-log untuk mengestimasi eksponen `z` pada `S = c·A^z`.
> 3. Bangun simulasi SIR di atas graf (NetworkX) — bandingkan dinamika wabah pada jaringan acak (Erdős–Rényi) vs scale-free (Barabási–Albert).
>
> #### Bacaan Lanjutan
>
> - Campbell Biology in Focus, 3rd ed., Chapter 41 — Ecological Communities.
> - MacArthur, R.H. & Wilson, E.O. (1967). *The Theory of Island Biogeography*.
> - Connell, J.H. (1978). "Diversity in tropical rain forests and coral reefs", *Science*.
