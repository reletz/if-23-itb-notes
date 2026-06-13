---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Oxidative Phosphorylation and Chemiosmosis
>
> > ## Questions/Cues
> >
> > - Apa itu **electron transport chain (ETC)** dan bagaimana NADH/FADH2 memberi makan elektron ke dalamnya?
> > - Bagaimana **proton-motive force** terbentuk dan apa analoginya?
> > - Bagaimana **ATP synthase** memanfaatkan gradien proton lewat **chemiosmosis**?
> > - Berapa total ATP per glukosa (~30-32) dan mengapa angkanya tidak pasti?
> > - Berapa efisiensi konversi energi glukosa ke ATP (~34%) dan ke mana sisanya?
> >
> > ## Reference Points
> >
> > - IF3211 — Cellular Respiration (PPT 7, bagian Concept 7.4: Oxidative Phosphorylation & Chemiosmosis)
> > - IF3211 — Cellular Respiration (PPT 7, bagian An Accounting of ATP Production)
>
> > ### Electron Transport Chain
> >
> > Glikolisis dan citric acid cycle hanya menghasilkan **empat ATP** secara langsung (substrate-level phosphorylation). Mayoritas energi glukosa justru tersimpan dalam pembawa elektron **NADH** dan **FADH2**. Pada tahap **oxidative phosphorylation**, pembawa ini "menyumbangkan" elektronnya ke **electron transport chain (ETC)** — rangkaian kompleks protein yang tertanam di **inner mitochondrial membrane**.
> >
> > Di dalam ETC, elektron diturunkan **bertahap** dari satu kompleks ke kompleks berikutnya, masing-masing memiliki afinitas elektron (redox potential) yang makin tinggi, hingga akhirnya diserahkan ke **O2** (acceptor terakhir) yang bergabung dengan proton membentuk **H2O**. NADH masuk di awal rantai (energi lebih tinggi → lebih banyak ATP), sedangkan FADH2 masuk lebih ke hilir (energi lebih rendah → lebih sedikit ATP). Penting: ETC sendiri **tidak membuat ATP**; ia hanya melepas energi secara bertahap untuk **memompa proton (H+)** dari matrix ke ruang antar-membran.
> >
> > ### Proton-Motive Force
> >
> > Saat elektron menuruni ETC, energi yang dilepas dipakai untuk **memompa H+** melintasi inner membrane, dari matrix ke intermembrane space. Akibatnya terjadi penumpukan H+ di satu sisi — menciptakan **gradien konsentrasi** sekaligus **gradien muatan listrik** (sisi luar lebih positif). Gabungan kedua gradien ini disebut **proton-motive force (PMF)**: energi potensial tersimpan dalam bentuk gradien proton, persis seperti air yang dibendung di atas bendungan, siap mengalir turun.
> >
> > PMF inilah jembatan yang **memisahkan (coupling)** dua proses: aliran elektron (redoks) di satu sisi, dan sintesis ATP di sisi lain. Energi redoks tidak langsung membuat ATP — ia "dititipkan" dulu sebagai gradien proton.
> >
> > ### Chemiosmosis dan ATP Synthase
> >
> > **Chemiosmosis** adalah mekanisme di mana energi yang tersimpan dalam gradien proton dipakai untuk mengerjakan kerja seluler. Proton mengalir **kembali** ke matrix menuruni gradiennya, tetapi tidak sembarang lewat — mereka harus melalui **ATP synthase**, sebuah enzim luar biasa yang berperilaku seperti **turbin/kincir molekuler**. Aliran proton memutar rotor ATP synthase, dan energi mekanik rotasi ini dipakai untuk menggabungkan ADP + Pi menjadi **ATP**. Proses ini disebut **oxidative phosphorylation** karena fosforilasi ADP digerakkan oleh energi dari reaksi oksidasi (redoks ETC).
> >
> > Inilah ide besar **chemiosmotic theory** (Peter Mitchell): aliran elektron dan sintesis ATP tidak terhubung langsung secara kimia, melainkan **dikopling oleh gradien proton** sebagai perantara energi.
> >
> > ### Computational Framing: Gradien Proton sebagai Kapasitor/Baterai dan Metrik Efisiensi
> >
> > Bagi mahasiswa informatika, **proton-motive force** paling intuitif dipahami sebagai **kapasitor bermuatan** atau **baterai**: ETC adalah "charger" yang memompa muatan (H+) untuk membangun beda potensial, dan **ATP synthase** adalah "motor" yang mengubah pelepasan muatan menjadi kerja. Mitokondria pada dasarnya adalah **rangkaian elektrokimia**: ETC mengisi kapasitor, PMF menyimpan energi, ATP synthase mendischarge-nya menjadi ATP. Decoupling charge-store-discharge ini identik dengan **buffering**: produksi (pumping) dan konsumsi (sintesis ATP) dapat berjalan dengan laju berbeda karena ada "tangki" PMF di antaranya.
> >
> > **ATP accounting** sebagai metrik throughput: total per glukosa kira-kira **30-32 ATP** (~32 dalam estimasi deck). Rinciannya: 4 ATP substrate-level + sisanya dari oxidative phosphorylation. Sebagai **metrik efisiensi**, sekitar **34%** energi dalam molekul glukosa berhasil ditransfer ke ATP; **66% sisanya hilang sebagai panas**. Efisiensi 34% ini sebenarnya tinggi dibanding mesin buatan manusia (mesin mobil ~25%). Angka ATP **tidak pasti** karena tiga sebab: (1) fosforilasi **tidak terkopel langsung** ke reaksi redoks (couplingnya via PMF, bukan stoikiometrik); (2) yield bervariasi tergantung elektron dibawa oleh **NADH atau FADH2** (entry point berbeda); (3) PMF juga **dipakai untuk kerja lain** (mis. transport molekul), bukan hanya ATP — sebuah "shared resource" dengan multiple consumer, sehingga hasil akhirnya tidak deterministik.

> [!cornell] #### Summary
>
> Pada **oxidative phosphorylation**, pembawa elektron **NADH** dan **FADH2** menyerahkan elektron ke **electron transport chain** di **inner mitochondrial membrane**; elektron diturunkan bertahap hingga ke **O2** (membentuk H2O), dan energi yang dilepas dipakai **memompa H+** sehingga terbentuk **proton-motive force** — sebuah gradien proton ibarat kapasitor/baterai bermuatan. Melalui **chemiosmosis**, proton mengalir balik lewat **ATP synthase** (turbin molekuler) yang mensintesis **ATP**. Total per glukosa sekitar **30-32 ATP** dengan **efisiensi ~34%** (sisanya panas); angka tepatnya tidak pasti karena coupling tidak langsung, perbedaan NADH vs FADH2, dan PMF yang dipakai untuk kerja lain. Tahap ini mengonsumsi output dari [[Pyruvate Oxidation and the Citric Acid Cycle]]; tanpa O2, jalur ini mati dan sel beralih ke [[Fermentation and Anaerobic Pathways]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa O2 Wajib di Ujung Rantai
> O2 adalah acceptor elektron **terakhir** yang sangat elektronegatif — ia "menarik" seluruh aliran elektron sepanjang ETC. Tanpa O2, elektron menumpuk dan ETC **macet**: NADH tidak bisa dioksidasi kembali menjadi NAD+, sehingga citric acid cycle dan akhirnya glikolisis pun terhenti. Inilah alasan kekurangan oksigen (mis. sianida yang memblokir ETC) cepat mematikan: bukan karena kehabisan glukosa, melainkan karena pipeline elektron tersumbat di ujung.
>
> #### CS Angle: PMF sebagai Energy Buffer dan Resource Contention
> Gradien proton adalah **intermediate energy buffer** yang memungkinkan **rate decoupling** antara produksi (ETC pumping) dan konsumsi (ATP synthesis) — pola produser-konsumer dengan buffer. Ketidakpastian yield ATP mencerminkan **resource contention**: PMF adalah shared resource yang dikonsumsi banyak proses (ATP synthase, transporter), jadi "alokasi" ke ATP tidak tetap — analog dengan CPU yang dibagi banyak proses sehingga throughput per-proses bervariasi. Efisiensi 34% adalah **metrik konversi energi**, mirip PUE (Power Usage Effectiveness) di data center: berapa banyak energi input yang benar-benar menjadi kerja berguna versus terbuang jadi panas.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat akuntansi ATP lengkap per glukosa (glikolisis + pyruvate oxidation + siklus + oxidative phosphorylation) dengan dua skenario shuttle NADH, dan tunjukkan mengapa hasilnya bisa 30 vs 32.
> 2. Modelkan PMF sebagai kapasitor: simulasikan pengisian (pumping) dan pengosongan (ATP synthase) dengan persamaan charge/discharge sederhana.
> 3. Hitung efisiensi ~34% dari energi bebas glukosa (-2870 kJ/mol) dibanding energi yang disimpan dalam ~32 ATP (~30.5 kJ/mol per ATP), dan bandingkan dengan efisiensi mesin termal.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 7, Concept 7.4.
> - Mitchell, P. (1961), "Coupling of Phosphorylation to Electron and Hydrogen Transfer by a Chemi-Osmotic type of Mechanism," *Nature*.
> - Nicholls & Ferguson, *Bioenergetics 4* — bab ATP synthase dan chemiosmosis.
