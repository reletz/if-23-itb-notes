---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Biogeochemical Cycles and Restoration Ecology
>
> > ## Questions/Cues
> >
> > - Faktor apa yang mengontrol **laju dekomposisi**?
> > - Mengapa disebut **biogeochemical cycle**, dan apa itu **reservoir**?
> > - Apa temuan utama studi **Hubbard Brook**?
> > - Apa tujuan **restoration ecology** dan kapan struktur fisik harus dipulihkan dulu?
> > - Apa beda **bioremediation** dan **biological augmentation**?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Decomposition & Biogeochemical Cycles)
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Hubbard Brook & Restoration)
>
> > ### Dekomposisi dan Laju Siklus Nutrien
> >
> > Pertumbuhan dekomposer dan **laju dekomposisi** dikontrol oleh **suhu, kelembapan, dan ketersediaan nutrien**. Dekomposisi berlangsung **lebih cepat di ekosistem hangat**: eksperimen serasah (litter) menunjukkan dekomposisi di hutan tropis basah jauh lebih cepat daripada di tundra/boreal dingin. Laju dekomposisi menentukan **seberapa cepat nutrien dikembalikan** dari materi mati ke bentuk anorganik yang dapat diserap produsen — menjadi penghubung antara aliran energi (sekali lewat) dan siklus materi (berputar).
> >
> > ### Biogeochemical Cycle: Reservoir dan Aliran
> >
> > Siklus nutrien disebut **biogeochemical cycle** karena melibatkan komponen **biotik dan abiotik** sekaligus. Siklus dapat bersifat **global** (mis. karbon dan nitrogen yang punya fase gas atmosferik) atau **lokal** (mis. fosfor yang tidak punya fase gas signifikan dan berputar di tanah/air setempat). Diagram biogeochemical cycle menelusuri transfer unsur kimia antar **reservoir** (tempat unsur tersimpan), dengan transfer didorong oleh proses **biologis maupun fisik**.
> >
> > Empat siklus utama:
> >
> > - **Karbon (C)**: reservoir = atmosfer (CO₂), biomassa, fosil, lautan; aliran = fotosintesis, respirasi, pembakaran, pelarutan ke laut.
> > - **Nitrogen (N)**: reservoir terbesar = N₂ atmosfer (inert); aliran lewat **fiksasi nitrogen** (oleh bakteri), nitrifikasi, denitrifikasi, amonifikasi.
> > - **Fosfor (P)**: tidak ada fase gas; reservoir = batuan/sedimen; aliran lambat lewat **pelapukan** dan biotik.
> > - **Air (H₂O)**: reservoir = lautan, es, atmosfer, air tanah; aliran lewat evaporasi, presipitasi, transpirasi.
> >
> > ### Studi Kasus Hubbard Brook
> >
> > Di **Hubbard Brook Experimental Forest**, anggaran mineral enam lembah ditentukan dengan mengukur **input dan output** nutrien kunci. Air hujan dikumpulkan untuk mengukur input air dan mineral terlarut; sebuah **bendungan** dibangun untuk memonitor output. Hasil: **kehilangan air dan nutrien jauh lebih besar di lokasi yang ditebang habis (deforested)** dibanding lokasi kontrol yang tak terganggu. Kesimpulannya: **jumlah nutrien yang keluar dari ekosistem hutan utuh terutama dikendalikan oleh tumbuhan** — vegetasi menahan nutrien; menghilangkannya membuat sistem "bocor". Ini bukti empiris klasik bahwa biota mengontrol siklus geokimia.
> >
> > ### Restoration Ecology, Bioremediation, dan Biological Augmentation
> >
> > Diberi waktu cukup, komunitas biologis dapat pulih dari banyak gangguan. **Restoration ecology** berupaya **memulai atau mempercepat** pemulihan ekosistem terdegradasi. Dalam kasus ekstrem, **struktur fisik** ekosistem harus dipulihkan dulu sebelum restorasi biologis dapat berlangsung (mis. lokasi bekas tambang gravel/clay di New Jersey).
> >
> > Dua strategi kunci:
> >
> > - **Bioremediation**: penggunaan organisme — biasanya prokariot, fungi, atau tumbuhan — untuk **mendetoksifikasi** ekosistem. Organisme menyerap dan kadang memetabolisme molekul toksik. Contoh: bakteri **Shewanella oneidensis** memetabolisme **uranium** menjadi bentuk tak larut yang lebih kecil kemungkinannya mencemari air tanah (diuji di Oak Ridge National Laboratory).
> > - **Biological augmentation**: penggunaan organisme untuk **menambah material esensial** ke ekosistem terdegradasi. Contoh: tumbuhan **pemfiksasi nitrogen** seperti **lupin** menaikkan N tersedia di tanah; penambahan **mikoriza** membantu tumbuhan mengakses nutrien tanah.
> >
> > ### Framing Komputasional: Siklus sebagai Stock-and-Flow & Remediasi sebagai Kontrol
> >
> > Biogeochemical cycle adalah **stock-and-flow / reservoir model** murni — fondasi **system dynamics**. Tiap reservoir adalah **stock (stok)** `Sᵢ`; tiap proses adalah **flow** `Fᵢⱼ`. Dinamikanya: `dSᵢ/dt = Σⱼ Fⱼᵢ − Σⱼ Fᵢⱼ`. Karena materi kekal, sistem mematuhi **invariant** `Σᵢ Sᵢ = konstan` (untuk siklus tertutup) — assert ini memvalidasi simulasi. **Residence time** suatu unsur = `stock / total outflow`, analog langsung dengan **buffer occupancy / latency** dalam sistem antrian (Little's Law). Hubbard Brook dapat dimodelkan sebagai **mass-balance**: `input (hujan) − output (sungai) = perubahan stok`; deforestasi = menghapus node "vegetasi" sehingga outflow melonjak.
> >
> > **Bioremediation** dan **augmentation** adalah **masalah kontrol/optimisasi**: kita ingin menggerakkan sistem dari state terdegradasi ke state sehat dengan menambahkan "aktuator" biologis. Variabel keputusan = spesies, dosis, penempatan; fungsi objektif = minimalkan konsentrasi toksin atau waktu pemulihan dengan kendala biaya/ekologis. Ini cocok untuk **optimal control**, **reinforcement learning**, atau **linear programming** atas model stock-flow.
> >
> > ```mermaid
> > flowchart LR
> >     ATM["Atmosfer<br/>(CO2, N2)"] -->|"fotosintesis<br/>/ fiksasi N"| BIO["Biomassa<br/>(produsen)"]
> >     BIO -->|"respirasi"| ATM
> >     BIO -->|"kematian"| DET["Detritus<br/>&amp; tanah"]
> >     DET -->|"dekomposisi<br/>(suhu, lembap)"| SOIL["Nutrien anorganik<br/>tanah / air"]
> >     SOIL -->|"serapan akar"| BIO
> >     DET -->|"denitrifikasi"| ATM
> >     ROCK["Batuan / sedimen<br/>(reservoir P)"] -->|"pelapukan"| SOIL
> >     SOIL -.->|"leaching<br/>(naik saat deforestasi)"| OUT(["Sungai<br/>(output)"])
> > ```

> [!cornell] #### Summary
>
> **Laju dekomposisi** dikontrol **suhu, kelembapan, dan nutrien** (lebih cepat di iklim hangat) dan menentukan kecepatan daur ulang nutrien. **Biogeochemical cycle** (karbon, nitrogen, fosfor, air) melibatkan komponen **biotik + abiotik**, menelusuri transfer unsur antar **reservoir** lewat proses biologis dan fisik — global (C, N) atau lokal (P). Studi **Hubbard Brook** membuktikan secara empiris bahwa **tumbuhan mengontrol retensi nutrien**: lokasi deforestasi kehilangan air dan mineral jauh lebih besar. **Restoration ecology** mempercepat pemulihan (kadang memulihkan struktur fisik dulu), via **bioremediation** (organisme mendetoksifikasi, mis. *Shewanella* pada uranium) dan **biological augmentation** (menambah material esensial, mis. lupin pemfiksasi N, mikoriza). Secara komputasi, siklus = **stock-and-flow / reservoir model** dengan invariant konservasi massa dan **residence time** (Little's Law), sedangkan remediasi = **masalah kontrol/optimisasi**. Menutup rangkaian [[Energy Flow and Trophic Structure Fundamentals]], [[Primary Production - Aquatic and Terrestrial]], dan [[Energy Transfer and Trophic Efficiency]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa Fosfor Berbeda
>
> Tidak seperti C dan N, **fosfor tidak punya fase gas atmosferik** yang signifikan, sehingga siklusnya **lambat dan sedimenter** — bergantung pelapukan batuan dan pengangkatan geologis. Ini membuat P sering menjadi **limiting nutrient jangka panjang** pada tanah tua, dan menjelaskan kekhawatiran "peak phosphorus" untuk pertanian global: tambang fosfat tidak terbarukan pada skala waktu manusia.
>
> #### CS Angle: Sensitivity Analysis & Digital Twin Ekosistem
>
> Model stock-flow memungkinkan **sensitivity analysis**: variasikan tiap parameter flow ±10% dan ukur dampaknya pada stok target — mengidentifikasi **leverage point** (titik intervensi paling efektif), persis seperti profiling bottleneck dalam sistem. Versi lanjutnya adalah **digital twin** ekosistem yang dikalibrasi data sensor real-time, dipakai untuk menguji skenario restorasi sebelum diterapkan di lapangan — sama seperti staging environment sebelum deploy ke produksi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model stock-and-flow siklus nitrogen 4-reservoir (atmosfer, biomassa, tanah, air) di Python/SimPy atau spreadsheet; verifikasi konservasi massa dan hitung residence time tiap reservoir.
> 2. Replikasi eksperimen Hubbard Brook secara komputasional: jalankan model dengan dan tanpa node "vegetasi", bandingkan output leaching, dan kuantifikasi peran tumbuhan dalam retensi nutrien.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 42 — *Concepts 42.4 & 42.5*.
> - Bormann, F.H. & Likens, G.E. — publikasi Hubbard Brook Ecosystem Study.
> - Meadows, D.H. *Thinking in Systems: A Primer* — stock, flow, dan leverage point.
> - Lovley, D.R. — bioremediasi logam/uranium via *Shewanella*/*Geobacter*.
