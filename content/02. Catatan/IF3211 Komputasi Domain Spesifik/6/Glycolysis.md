---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Glycolysis
>
> > ## Questions/Cues
> >
> > - Apa arti harfiah **glycolysis** dan apa input/output utamanya?
> > - Apa dua fase glikolisis (**energy investment** vs **energy payoff**) dan apa yang terjadi di masing-masing?
> > - Berapa **net yield** energi per molekul glukosa?
> > - Di mana glikolisis berlangsung dan mengapa lokasi ini penting secara evolusioner?
> > - Mengapa glikolisis disebut jalur metabolik paling tua dan universal?
> >
> > ## Reference Points
> >
> > - IF3211 — Cellular Respiration (PPT 7, bagian Concept 7.2: Glycolysis)
> > - IF3211 — Cellular Respiration (PPT 7, bagian The Evolutionary Significance of Glycolysis)
>
> > ### Apa Itu Glikolisis
> >
> > **Glycolysis** secara harfiah berarti **"sugar splitting"** (pemecahan gula). Jalur ini memecah satu molekul **glukosa** (6 atom karbon) menjadi **dua molekul pyruvate** (masing-masing 3 atom karbon). Sebagai produk sampingan, dihasilkan dua molekul air. Glikolisis adalah tahap pertama dalam pipeline respirasi seluler, sekaligus titik masuk universal bagi pemecahan karbohidrat.
> >
> > Hal penting: glikolisis **memanen energi kimia dengan mengoksidasi glukosa menjadi pyruvate**. Sebagian elektron berenergi tinggi dari glukosa dipindahkan ke NAD+ membentuk **NADH**, dan sebagian energi langsung disimpan dalam ikatan fosfat ATP. Jalur ini terdiri dari rangkaian sekitar sepuluh reaksi yang masing-masing dikatalisis enzim spesifik, mengubah glukosa melalui beberapa intermediate menjadi pyruvate.
> >
> > ### Dua Fase: Investment dan Payoff
> >
> > Glikolisis terbagi menjadi dua fase yang secara konsep mirip "investasi modal lalu panen keuntungan":
> >
> > - **Energy investment phase**: sel justru **menghabiskan** 2 ATP untuk "mengaktifkan" glukosa. ATP digunakan untuk menambahkan gugus fosfat (fosforilasi) pada gula, membuatnya lebih reaktif dan tidak bisa keluar sel. Ini adalah pengeluaran awal yang diperlukan agar molekul cukup tidak stabil untuk dipecah.
> > - **Energy payoff phase**: gula berfosfat dipecah menjadi dua molekul tiga-karbon, lalu dioksidasi. Pada fase ini dihasilkan **4 ATP** (lewat **substrate-level phosphorylation** — transfer langsung fosfat dari substrat ke ADP) dan **2 NADH**.
> >
> > Karena dua molekul tiga-karbon diproses paralel pada fase payoff, output bruto adalah 4 ATP, tetapi 2 ATP sudah dipakai di fase investment.
> >
> > ### Net Yield Energi
> >
> > Neraca akhir per molekul glukosa: **2 ATP (net) + 2 NADH**. Perhitungannya: 4 ATP (kotor, payoff) − 2 ATP (investasi) = **2 ATP net**, ditambah **2 NADH** sebagai pembawa elektron. Penting dicatat bahwa O2 **tidak** terlibat sama sekali dalam glikolisis — tidak ada elektron yang diserahkan ke oksigen di sini.
> >
> > Jika O2 **tersedia**, energi yang masih tersimpan dalam pyruvate dan NADH dapat diekstraksi lebih lanjut oleh **pyruvate oxidation**, **citric acid cycle**, dan **oxidative phosphorylation**. Jika O2 **tidak tersedia**, pyruvate dialihkan ke jalur fermentasi. Jadi pyruvate dan NADH adalah "intermediate state" yang menentukan percabangan berikutnya.
> >
> > ### Lokasi dan Signifikansi Evolusioner
> >
> > Glikolisis berlangsung di **cytosol** (sitoplasma), **bukan** di dalam mitokondria. Fakta lokasi ini punya implikasi evolusioner besar: karena glikolisis tidak memerlukan organel khusus, ia kemungkinan **berevolusi sangat awal** dalam sejarah kehidupan — sebelum mitokondria muncul.
> >
> > Argumen pendukungnya: (1) glikolisis adalah jalur metabolik **paling umum dan universal**, dimiliki hampir semua organisme; (2) pada Bumi purba kadar O2 sangat rendah, sehingga prokariot awal kemungkinan **bergantung sepenuhnya** pada glikolisis untuk energi; (3) lokasinya di sitosol (bukan mitokondria) menunjukkan ia muncul sebelum endosimbiosis mitokondria. Glikolisis adalah "kode warisan" (legacy code) yang masih berjalan di setiap sel hingga kini.
> >
> > ### Computational Framing: Stage Pertama dengan Negative Startup Cost
> >
> > Bagi mahasiswa informatika, glikolisis adalah **stage pertama** dalam pipeline respirasi dengan karakteristik menarik: ia punya **negative startup cost**. Seperti banyak algoritma yang butuh fase preprocessing/inisialisasi yang mahal sebelum bisa menghasilkan output (mis. membangun index sebelum query cepat), glikolisis "membayar di muka" 2 ATP (investment phase) untuk kemudian memanen 4 ATP (payoff phase) — net profit 2 ATP.
> >
> > Lokasi di sitosol membuat glikolisis seperti **modul standalone** tanpa dependency pada infrastruktur khusus (mitokondria) — ia portabel dan dapat berjalan sendiri, persis fungsi murni yang tidak butuh external service. Inilah mengapa glikolisis menjadi **conditional gateway**: outputnya (pyruvate + NADH) di-route berbeda tergantung ketersediaan O2 (`if O2: lanjut ke mitochondria; else: fermentasi`). Sifatnya yang universal dan kuno menjadikannya analog dengan **legacy library** yang sudah teruji selama miliaran tahun dan diwarisi semua "subclass" makhluk hidup.

> [!cornell] #### Summary
>
> **Glycolysis** ("sugar splitting") memecah satu **glukosa** (6C) menjadi **dua pyruvate** (3C) di dalam **cytosol** melalui dua fase: **energy investment** (menghabiskan 2 ATP untuk mengaktifkan gula) dan **energy payoff** (menghasilkan 4 ATP via **substrate-level phosphorylation** + 2 NADH). **Net yield**-nya adalah **2 ATP + 2 NADH** per glukosa, tanpa keterlibatan O2. Karena tidak butuh mitokondria dan bersifat universal, glikolisis dianggap **berevolusi paling awal** dan menjadi gateway yang menentukan percabangan berikutnya: jika O2 ada, pyruvate dilanjut ke [[Pyruvate Oxidation and the Citric Acid Cycle]]; jika tidak, ke [[Fermentation and Anaerobic Pathways]]. Lihat juga konteks redoks di [[Catabolic Pathways and Redox Chemistry]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Substrate-Level vs Oxidative Phosphorylation
> ATP dari glikolisis dibuat lewat **substrate-level phosphorylation**: enzim langsung memindahkan gugus fosfat dari substrat berenergi tinggi (mis. 1,3-bisphosphoglycerate, phosphoenolpyruvate) ke ADP. Ini berbeda dari **oxidative phosphorylation** yang melibatkan rantai transport elektron dan gradien proton. Substrate-level lebih cepat tapi hasilnya jauh lebih kecil — itulah mengapa fermentasi (yang hanya mengandalkan substrate-level) hanya menghasilkan 2 ATP net per glukosa.
>
> #### CS Angle: Glikolisis sebagai Pure Function dengan Memoized Bootstrap
> Glikolisis dapat dipandang sebagai fungsi `glycolysis(glucose) -> (2 pyruvate, 2 ATP, 2 NADH)` yang **deterministik dan tidak butuh I/O eksternal** (tidak butuh O2). Fase investasi mirip **amortized cost**: biaya awal yang mahal terbayar oleh keuntungan berikutnya, persis konsep amortized analysis pada struktur data dinamis. Karena universal dan kuno, glikolisis adalah contoh **konvergensi pada solusi optimal**: sekali ditemukan jalur efisien, evolusi tidak menggantinya — analog dengan algoritma fundamental (mis. quicksort) yang bertahan lama karena sudah cukup baik.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan glikolisis sebagai daftar 10 reaksi (state machine), lacak jumlah ATP & NADH pada tiap langkah, dan verifikasi net yield = 2 ATP + 2 NADH.
> 2. Bandingkan "amortized cost" investasi-payoff glikolisis dengan amortized analysis dynamic array (doubling) — tuliskan paralelnya.
> 3. Telusuri mengapa sel kanker sering mengandalkan glikolisis meski ada O2 (**Warburg effect**) dan modelkan trade-off kecepatan vs efisiensi.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 7, Concept 7.2.
> - Nelson & Cox, *Lehninger Principles of Biochemistry* — bab Glycolysis.
> - Vander Heiden et al. (2009), "Understanding the Warburg Effect," *Science*.
