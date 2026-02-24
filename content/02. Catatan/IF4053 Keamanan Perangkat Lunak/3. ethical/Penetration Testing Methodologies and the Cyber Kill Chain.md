---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Siber]]

> [!cornell] Penetration Testing Methodologies and the Cyber Kill Chain
>
> > ## Questions/Cues
> >
> > - Bagaimana cara membedakan pengujian penetrasi eksternal vs internal?
> > - Mengapa penting mengklasifikasikan pengujian sebagai overt atau covert?
> > - Apa tujuan utama dari model Cyber Kill Chain dalam konteks PT?
> > - Bagaimana fase‑fase umum metodologi PT saling berhubungan?
> > - Apa saja metrik yang dapat menilai keberhasilan sebuah engagement PT?
> >
> > ## Reference Points
> >
> > - Lecture_Materials.pptx (Slides 8‑9, 11) – tipe‑tipe PT & fase‑fase umum
> > - CEH_Phases.pdf (Slides 10) – contoh fase CEH (referensi singkat)
> > - Lockheed_Martin_KillChain.pdf (Slide 11) – definisi Cyber Kill Chain
>
> > ### Penjelasan Umum Metodologi Penetration Testing
> >
> > Penetration Testing (PT) adalah proses terstruktur yang bertujuan menilai keamanan suatu sistem dengan cara mensimulasikan serangan yang realistis. Metodologi PT biasanya dibagi menjadi tiga lapisan utama: **perencanaan**, **pelaksanaan**, dan **pelaporan**. Pada tahap perencanaan, tim PT berkoordinasi dengan pemilik aset untuk menetapkan ruang lingkup, tujuan, serta batasan legal dan teknis. Ini mencakup penentuan apakah pengujian akan dilakukan dari perspektif **eksternal** (seperti penyerang di luar jaringan organisasi) atau **internal** (seperti karyawan yang memiliki akses jaringan). Keputusan ini memengaruhi jenis vektor yang akan dievaluasi dan tingkat risiko yang dihadapi.
> >
> > Pada fase pelaksanaan, tim PT menerapkan teknik‑teknik yang telah dipilih untuk menguji kontrol keamanan. Teknik‑teknik tersebut dapat dilakukan secara **overt** (dengan sepengetahuan tim TI) atau **covert** (tanpa sepengetahuan). Pendekatan overt biasanya dipilih ketika organisasi menginginkan kolaborasi langsung dan umpan balik real‑time, sedangkan covert memberikan gambaran yang lebih realistis tentang bagaimana serangan yang tidak terdeteksi dapat berkembang. Selama pelaksanaan, setiap temuan dicatat secara sistematis, termasuk bukti‑bukti yang mendukung, sehingga memudahkan analisis selanjutnya.
> >
> > Tahap akhir, **pelaporan**, menyajikan hasil temuan dalam format yang terstruktur. Laporan mencakup deskripsi setiap kerentanan yang teridentifikasi, tingkat keparahan (biasanya menggunakan skala CVSS atau skala internal), serta rekomendasi mitigasi yang spesifik. Selain itu, laporan biasanya menyertakan **executive summary** untuk manajemen tingkat atas dan **technical appendix** untuk tim teknis. Penyampaian laporan yang jelas memungkinkan organisasi mengambil tindakan perbaikan yang tepat waktu dan terukur.
> >
> > Secara keseluruhan, metodologi PT menekankan pentingnya **komunikasi** antara pen tester dan pemilik aset, serta **dokumentasi** yang lengkap untuk memastikan bahwa temuan dapat ditindaklanjuti secara efektif. Pendekatan yang sistematis ini membantu organisasi mengidentifikasi celah keamanan sebelum penyerang sebenarnya dapat memanfaatkannya.
> >
> > ### Klasifikasi Pengujian Penetrasi: Eksternal vs Internal, Overt vs Covert
> >
> > **Pengujian eksternal** meniru serangan yang berasal dari luar perimeter organisasi, misalnya melalui internet publik. Fokus utama adalah menguji kontrol perimeter seperti firewall, sistem deteksi intrusi, dan layanan yang terekspos ke publik. Sebaliknya, **pengujian internal** mensimulasikan ancaman yang sudah berada di dalam jaringan, seperti karyawan atau kontraktor. Pada skenario internal, pen tester dapat mengevaluasi kontrol segmentasi jaringan, hak akses internal, serta kebijakan keamanan endpoint.
> >
> > **Pengujian overt** dilakukan dengan sepengetahuan tim keamanan internal. Hal ini memungkinkan kolaborasi langsung, misalnya untuk menguji respons tim keamanan (security operations center) terhadap serangan yang sedang berlangsung. **Pengujian covert**, di sisi lain, dilakukan tanpa sepengetahuan tim TI, sehingga meniru kondisi serangan yang tidak terdeteksi. Pendekatan covert dapat mengungkap kelemahan dalam proses deteksi dan respons yang tidak terlihat pada pengujian overt.
> >
> > Memilih kombinasi yang tepat antara eksternal/internal dan overt/covert tergantung pada tujuan organisasi. Misalnya, perusahaan yang ingin menilai kesiapan respons insiden mungkin memilih skenario covert internal, sementara organisasi yang fokus pada perlindungan perimeter dapat memilih eksternal overt untuk menguji kontrol firewall secara detail.
> >
> > ### Hubungan Metodologi PT dengan Cyber Kill Chain
> >
> > **Cyber Kill Chain** adalah kerangka kerja yang dikembangkan oleh Lockheed Martin untuk memetakan tahapan serangan siber secara berurutan, mulai dari pengenalan target hingga pencapaian tujuan akhir. Meskipun model ini awalnya dirancang untuk analisis serangan, ia juga dapat diadaptasi sebagai panduan bagi tim PT dalam merancang skenario serangan yang realistis. Pada dasarnya, setiap fase dalam kill chain dapat dipetakan ke dalam fase‑fase umum PT: perencanaan (identifikasi target), pelaksanaan (simulasi serangan), dan pelaporan (analisis hasil).
> >
> > Dengan mengacu pada kill chain, tim PT dapat memastikan bahwa mereka tidak hanya menguji satu atau dua titik lemah, melainkan menelusuri **rantai lengkap** yang mungkin dilalui penyerang. Misalnya, meskipun detail teknis fase-fase awal (seperti pengumpulan informasi) tidak dibahas secara mendalam di sini, pemahaman bahwa fase‑fase tersebut ada membantu pen tester merancang skenario yang lebih holistik. Pada akhirnya, integrasi kill chain ke dalam metodologi PT meningkatkan **kedalaman** dan **keterpaduan** pengujian, sehingga hasilnya lebih representatif terhadap ancaman dunia nyata.
> >
> > ### Metrik Evaluasi Keberhasilan Penetration Testing
> >
> > Untuk menilai efektivitas sebuah engagement PT, organisasi dapat menggunakan beberapa metrik kunci:
> >
> > 1. **Jumlah temuan per tingkat keparahan** – Menghitung berapa banyak kerentanan yang ditemukan pada masing‑masing kategori (tinggi, sedang, rendah). Distribusi ini memberi gambaran tentang profil risiko keseluruhan.
> > 2. **Waktu rata‑rata remediasi** – Mengukur berapa lama tim IT membutuhkan waktu untuk memperbaiki temuan setelah laporan diterima. Waktu yang lebih singkat menunjukkan proses respons yang efisien.
> > 3. **Coverage persentase aset** – Persentase total aset yang termasuk dalam ruang lingkup PT dibandingkan dengan total aset organisasi. Coverage yang tinggi meningkatkan keyakinan bahwa tidak ada “blind spot” signifikan.
> > 4. **Tingkat deteksi internal** – Jika pengujian dilakukan secara covert, berapa banyak aktivitas pen tester yang berhasil dideteksi oleh sistem keamanan internal? Angka ini membantu menilai efektivitas kontrol deteksi.
> > 5. **Return on Security Investment (ROSI)** – Analisis biaya‑manfaat yang membandingkan biaya PT dengan potensi kerugian yang dapat dihindari melalui perbaikan keamanan.
> >
> > Menggunakan metrik‑metrik ini secara konsisten memungkinkan organisasi melacak perbaikan keamanan dari waktu ke waktu dan mengkomunikasikan nilai PT kepada pemangku kepentingan non‑teknis.
> >
> > ### Ringkasan Praktis untuk Implementasi
> >
> > - Tentukan **ruang lingkup** yang jelas (eksternal/internal, overt/covert) sebelum memulai.
> > - Gunakan **kerangka kill chain** sebagai panduan untuk memastikan cakupan serangan yang lengkap.
> > - Dokumentasikan setiap temuan dengan bukti yang dapat diverifikasi dan rekomendasi yang dapat diimplementasikan.
> > - Evaluasi hasil menggunakan metrik yang terstandardisasi untuk mengukur dampak dan perbaikan.
> > - Lakukan **review pasca‑engagement** untuk memperbaiki proses PT berikutnya.

> [!cornell] #### Summary
>
> **Penetration Testing** menggabungkan perencanaan terstruktur, pelaksanaan yang dapat bersifat overt atau covert, serta pelaporan yang detail untuk memberikan gambaran menyeluruh tentang keamanan suatu sistem. Dengan mengklasifikasikan pengujian menjadi **eksternal vs internal** serta **overt vs covert**, organisasi dapat menyesuaikan skenario dengan tujuan risiko mereka. Integrasi **Cyber Kill Chain** membantu menelusuri seluruh rangkaian serangan potensial, memastikan bahwa setiap tahapan—dari identifikasi target hingga pencapaian tujuan—termasuk dalam skenario pengujian. Penggunaan metrik‑metrik seperti jumlah temuan per tingkat keparahan, waktu remediasi, dan coverage aset memungkinkan penilaian objektif atas efektivitas PT dan mendukung perbaikan berkelanjutan.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1 – Automasi Workflow Penetration Testing
>
> Automasi dalam PT bertujuan mengurangi waktu siklus serta meningkatkan konsistensi hasil. Platform seperti **Cobalt Strike**, **BloodHound**, dan **PwnKit** menyediakan kerangka kerja yang memungkinkan pen tester mengorchestrasi serangkaian modul (misalnya, credential dumping, lateral movement) melalui skrip yang dapat diparameterisasi. Automasi tidak hanya mempercepat fase eksekusi, tetapi juga memungkinkan **reproducibility**—setiap run dapat diulang dengan konfigurasi yang sama, memudahkan audit dan validasi. Penting untuk mengintegrasikan automasi dengan **CI/CD pipeline** sehingga pengujian keamanan dapat dijalankan secara periodik pada setiap rilis perangkat lunak.
>
> #### Advanced Topic 2 – Integrasi Threat Intelligence dengan Kill Chain
>
> Threat Intelligence (TI) menyediakan data tentang taktik, teknik, dan prosedur (TTP) yang digunakan oleh aktor ancaman terkini. Dengan memetakan TTP tersebut ke dalam fase-fase **Cyber Kill Chain**, tim PT dapat menyesuaikan skenario serangan yang lebih relevan dengan ancaman yang sedang berkembang. Misalnya, jika intel menunjukkan peningkatan penggunaan **fileless malware**, tim dapat menekankan fase **Installation** dan **Command & Control** dalam simulasi mereka. Integrasi ini biasanya dilakukan melalui **STIX/TAXII** feeds yang secara otomatis memperbarui basis data teknik serangan dalam alat PT.
>
> #### Advanced Topic 3 – Pengukuran Maturity Model untuk Penetration Testing
>
> Model kematangan (maturity model) membantu organisasi menilai sejauh mana proses PT mereka telah terstandardisasi. Salah satu kerangka yang populer adalah **NIST SP 800-115** yang mencakup lima domain: perencanaan, pelaksanaan, pelaporan, tindak lanjut, dan perbaikan berkelanjutan. Setiap domain dapat dinilai pada skala **Level 1 (Ad‑hoc)** hingga **Level 5 (Optimized)**. Dengan melakukan penilaian periodik, organisasi dapat mengidentifikasi area yang membutuhkan investasi, seperti peningkatan kemampuan **red‑team** atau adopsi **continuous testing**.
>
> #### Advanced Topic 4 – Edge Cases dan Nuansa dalam Penetration Testing
>
> Beberapa skenario khusus dapat menantang metodologi standar PT. Contohnya, **pengujian pada lingkungan cloud‑native** yang menggunakan layanan serverless memerlukan pendekatan berbeda karena tidak ada server tradisional yang dapat di‑exploit. Selain itu, **pengujian pada sistem OT (Operational Technology)** memerlukan pertimbangan keselamatan fisik dan dampak operasional, sehingga teknik yang biasa dipakai pada IT tidak selalu dapat diterapkan. Memahami batasan‑batasan ini penting untuk menghindari **false positives** atau, lebih buruk, menyebabkan gangguan layanan kritis.
>
> #### Self‑Exploration Projects
>
> 1. **Membangun Pipeline CI/CD dengan Integrasi PT Otomatis** – Buat repositori Git yang mengimplementasikan pipeline Jenkins atau GitHub Actions, kemudian integrasikan alat PT otomatis (misalnya, OWASP ZAP untuk scanning aplikasi web) yang dijalankan pada setiap pull request. Dokumentasikan metrik waktu eksekusi dan tingkat temuan.
> 2. **Simulasi Kill Chain Berbasis Threat Intelligence** – Pilih satu grup ancaman (APT) yang memiliki laporan publik, ekstrak TTP‑nya, dan rancang skenario PT yang memetakan setiap TTP ke fase kill chain. Jalankan simulasi pada lingkungan lab dan evaluasi efektivitas deteksi oleh sistem SIEM.
> 3. **Evaluasi Maturity Model PT pada Organisasi Simulasi** – Gunakan checklist NIST SP 800‑115 untuk menilai lima domain pada sebuah organisasi fiktif. Buat rencana perbaikan yang mencakup adopsi automasi, pelatihan red‑team, dan integrasi TI.
>
> #### Tools and Resources
>
> - **Cobalt Strike** – Platform kolaboratif untuk simulasi serangan tingkat lanjut.
> - **OWASP ZAP** – Scanner aplikasi web open‑source yang dapat diintegrasikan ke pipeline CI/CD.
> - **MITRE ATT&CK Navigator** – Visualisasi TTP yang dapat dipetakan ke kill chain.
> - **STIX/TAXII** – Stand