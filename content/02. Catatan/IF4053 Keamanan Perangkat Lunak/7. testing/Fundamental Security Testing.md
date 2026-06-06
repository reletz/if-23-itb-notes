---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Fundamental Security Testing
>
> > ## Questions/Cues
> >
> > - Apa yang membedakan security testing dari pengujian QA tradisional?
> > - Mengapa keandalan (reliability) perangkat lunak tidak lengkap tanpa keamanan?
> > - Mengapa security testing disebut bersifat relatif dalam analisis risiko?
> > - Apa makna dilema "Choose Any Two" dan pendekatan proaktif vs reaktif?
> > - Bagaimana Cyber Kill Chain memetakan tahapan serangan eksternal dan internal?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W09 Security Testing — bagian "Software Behaviors, Risk Analysis, dan Cyber Kill Chain")
>
> > ### Apa Bedanya Security Testing?
> >
> > Berbeda dengan pengujian fungsional biasa, **security testing memerlukan tindakan "menyerang" perangkat lunak**. QA tradisional berfokus pada memverifikasi bahwa fitur bekerja sesuai spesifikasi pada input yang diharapkan, sementara security testing justru harus menguji **yang tak terduga (the unexpected) dan yang tak dikenal (the unknown)**. Asumsi dasarnya adalah perangkat lunak tidak akan pernah ditempatkan pada lingkungan yang tepercaya atau dapat diprediksi; ia akan dijalankan di dunia nyata yang penuh masukan jahat. Karena itu, penguji harus berpikir layaknya penyerang, bukan sekadar pengguna normal.
> >
> > Inti perbedaannya terletak pada **kehadiran adversary yang cerdas (intelligent adversary)**. Mengutip prinsip yang dikemukakan dalam materi: "Software security is about making software behave correctly in the presence of a malicious attack." Perbedaan antara **software safety** dan **software security** adalah keberadaan penyerang berakal yang sengaja berusaha membongkar sistem. Pada software safety, kegagalan bersifat acak atau tidak disengaja (misalnya bug yang muncul karena kondisi langka); pada software security, ada pihak yang secara aktif mencari dan mengeksploitasi kelemahan. Contoh konkret: sebuah field input nomor telepon mungkin aman dari pengetikan keliru pengguna biasa, tetapi penyerang justru sengaja menyisipkan karakter khusus seperti `'`, `;`, atau `--` untuk memicu SQL injection.
> >
> > Herbert Thompson dalam "Why Security Testing is Hard" (IEEE Security and Privacy, 2003) menekankan pentingnya mewaspadai **side effects** dan **unreachable code**; kode yang tampaknya tidak dapat dijangkau pada pengujian normal justru sering menjadi jalur eksploitasi. Karena itu **code coverage** menjadi penting untuk mengungkap jalur-jalur tersembunyi yang luput dari pengujian fungsional.
> >
> > ### "Missing Leg" pada Reliability
> >
> > Keandalan perangkat lunak (**reliability**) secara tradisional dipahami melalui dua kaki: **functional** (apakah fitur berfungsi benar) dan **performance** (apakah cukup cepat dan stabil di bawah beban). Materi menyebut **security sebagai "kaki yang hilang" (the missing leg)** dari reliabilitas perangkat lunak. Metode pengujian QA tradisional tidak pernah benar-benar membahas keamanan, padahal sebuah sistem perangkat lunak **tidak dapat disebut andal kecuali ia juga aman**.
> >
> > Argumennya logis: aplikasi yang lulus semua uji fungsional dan performa tetap tidak andal jika sebuah serangan dapat membuatnya crash, membocorkan data, atau dikendalikan penyerang. Dengan demikian, ketiga aspek — **functional, performance, dan security** — harus dipandang sebagai satu kesatuan reliabilitas, bukan tambahan opsional. Mengabaikan kaki ketiga ini sama saja membangun kursi berkaki dua yang akan roboh begitu mendapat tekanan dari arah yang tak terduga.
> >
> > ### Risk Analysis — Semuanya Relatif
> >
> > Security testing bersifat **relatif**, bukan absolut. Tingkat assurance yang dibutuhkan ditentukan oleh keseimbangan tiga faktor: (1) **informasi dan layanan yang dilindungi** (semakin berharga, semakin tinggi taruhannya); (2) **skill dan sumber daya adversary** (apakah lawannya script kiddie atau APT yang didanai negara); dan (3) **biaya remediasi assurance** (seberapa mahal kontrol pengamanan yang akan diterapkan). Keamanan adalah titik temu ketiga faktor ini.
> >
> > Implikasinya, tidak ada tingkat keamanan "sempurna" yang berlaku universal; sistem yang menyimpan data publik tidak perlu pengamanan seketat sistem perbankan. Keputusan berapa banyak usaha pengujian yang layak harus selalu dikalibrasi terhadap nilai aset dan profil ancaman. Inilah yang membuat security testing berbeda dari pengujian fungsional yang memiliki kriteria pass/fail yang jelas.
> >
> > ### Reactive vs. Proactive dan Dilema Security Testing
> >
> > Sebagian besar mekanisme defensif yang dijual di pasar "menyediakan keamanan" namun sedikit menyentuh akar masalah, yaitu **bad security** pada perangkat lunak itu sendiri. Mekanisme tersebut bekerja dalam **mode reaktif** — menambal setelah serangan terjadi. Untuk meningkatkan assurance, organisasi perangkat lunak dan tim QA perlu bersikap **proaktif**, yaitu membangun keamanan sejak awal alih-alih menunggu insiden.
> >
> > Namun ada **dilema security testing**: QA biasanya berada di bawah tekanan untuk menyelesaikan "feature test sets" (pengujian fungsional) dengan sumber daya terbatas, ditambah kendala anggaran dan waktu. Security testing sangat bergantung pada **keahlian dan pengalaman** yang langka. Dilema ini sering diringkas sebagai **"Choose Any Two"** dari tiga atribut: **Usability, Security, dan Cost**. Anda boleh memilih dua, tetapi tidak ketiganya sekaligus — sistem yang sangat aman dan mudah dipakai akan mahal; yang aman dan murah akan sulit dipakai; yang murah dan mudah dipakai cenderung tidak aman.
> >
> > ### Prinsip OWASP WSTG 4.2 dan Take Control
> >
> > **OWASP Web Security Testing Guide (4.2)** merumuskan prinsip-prinsip pengujian yang menjadi fondasi. Di antaranya: **There is NO Silver Bullet** (tidak ada satu alat ajaib); **Think Strategically, Not Tactically**; **The SDLC is King** (keamanan harus menyatu dalam siklus pengembangan); **Test Early and Test Often**; **Test Automation**; **Understand the Scope of Security**; **Develop the Right Mindset** (berpikir seperti penyerang); **Understand the Subject**; **Use the Right Tools**; **The Devil is in the Details**; **Use Source Code when Available**; **Develop Metrics**; dan **Document the Test Results**. Prinsip-prinsip ini menegaskan bahwa pengujian keamanan adalah disiplin strategis, bukan langkah tambahan di akhir proyek.
> >
> > Selain itu, organisasi perlu **mengambil kendali atas masalah (take control)**: lakukan **test before you buy** (uji perangkat lunak sebelum membeli), lakukan **independent testing** dan **internal testing**, bekerja sama membangun **shared testing lab**, dan yang terpenting **menetapkan acceptance criteria** sebagai kriteria penerimaan keamanan yang jelas sebelum perangkat lunak diterima atau di-deploy.
> >
> > ### Vulnerability Life Cycle dan Cyber Kill Chain
> >
> > Setiap kerentanan memiliki **siklus hidup (vulnerability life cycle)** — mulai dari saat ia diperkenalkan ke dalam kode, ditemukan (oleh peneliti atau penyerang), diumumkan, dieksploitasi di liar, hingga akhirnya ditambal dan diverifikasi. Jendela waktu antara penemuan dan penambalan adalah periode paling berbahaya, terutama untuk **zero-day** di mana eksploit beredar sebelum patch tersedia.
> >
> > Untuk memetakan bagaimana serangan eksternal berlangsung, materi memakai **Cyber Kill Chain** dari Lockheed Martin yang terdiri dari **7 tahap**: (1) **Reconnaissance**, (2) **Weaponization**, (3) **Delivery**, (4) **Exploitation**, (5) **Installation**, (6) **Command & Control**, dan (7) **Actions on Objectives**. Memutus rantai pada salah satu tahap saja sudah cukup menggagalkan serangan.
> >
> > ```mermaid
> > flowchart LR
> >     R["1. Reconnaissance"] --> W["2. Weaponization"] --> D["3. Delivery"] --> E["4. Exploitation"] --> I["5. Installation"] --> C["6. Command &amp; Control"] --> A["7. Actions on Objectives"]
> > ```
> >
> > Selain versi eksternal, ada pula **"Internal" Cyber Kill Chain Model** yang memetakan perspektif insider atau pasca-kompromi dengan 7 tahap berbeda: (1) **Reconnaissance**, (2) **Access**, (3) **Aggregation**, (4) **Assembly**, (5) **Encryption**, (6) **Obfuscation**, dan (7) **Exfiltration**. Model internal ini menyoroti bagaimana data dikumpulkan, dirakit, dienkripsi, disamarkan, lalu diselundupkan keluar — fokus yang relevan untuk mendeteksi pencurian data dari dalam jaringan.

> [!cornell] #### Summary
>
> **Security testing** berbeda fundamental dari QA tradisional karena menuntut tindakan menyerang perangkat lunak, menguji yang tak terduga, dan mengasumsikan kehadiran **intelligent adversary** — pembeda utama antara software safety dan software security. Keamanan adalah **"missing leg"** reliabilitas di samping functional dan performance; tanpanya, sistem tak bisa disebut andal. Analisis risiko bersifat **relatif** terhadap nilai aset, skill adversary, dan biaya remediasi, sehingga muncul dilema **"Choose Any Two"** antara Usability, Security, dan Cost. Pendekatan harus **proaktif**, mengikuti prinsip OWASP WSTG 4.2 (no silver bullet, SDLC is king, test early & often, develop metrics), dan organisasi perlu **take control** lewat acceptance criteria. **Cyber Kill Chain** (7 tahap eksternal dan versi internal) memetakan rantai serangan agar pengujian mencakup seluruh tahapan, bukan sekadar titik lemah tunggal.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Defect Density vs. Adversarial Cost (DI LUAR sumber)
> Dalam praktik industri, keputusan "Choose Any Two" sering dikuantifikasi memakai model ekonomi keamanan seperti **Gordon-Loeb**, yang menyatakan bahwa investasi keamanan optimal umumnya tidak melebihi sekitar 37% dari ekspektasi kerugian (expected loss). Ini memberi dasar kuantitatif untuk "risk analysis is all relative": alih-alih mengejar keamanan absolut, organisasi mengejar titik di mana **marginal cost** kontrol menyamai **marginal reduction** dalam ekspektasi kerugian. Konsep **Return on Security Investment (ROSI)** melengkapi kerangka ini untuk membenarkan anggaran pengujian.
>
> #### Lebih dalam — Kill Chain vs. MITRE ATT&CK
> Cyber Kill Chain bersifat linear dan tingkat-tinggi, sementara **MITRE ATT&CK** memberikan matriks taktik dan teknik (TTP) yang jauh lebih granular dan non-linear, mencerminkan bahwa penyerang nyata sering melompat antar tahap. Banyak tim SOC modern memetakan kedua kerangka: kill chain untuk narasi strategis, ATT&CK untuk deteksi taktis per teknik (misalnya T1059 Command and Scripting Interpreter). Memahami keduanya membantu merancang skenario pengujian yang realistis.
>
> #### Proyek Eksplorasi Mandiri
> 1. Petakan satu insiden APT publik (misalnya laporan dari vendor threat intel) ke 7 tahap Cyber Kill Chain eksternal, lalu identifikasi pada tahap mana kontrol detektif Anda dapat memutus rantai.
> 2. Bangun spreadsheet ROSI sederhana untuk sebuah aplikasi fiktif: estimasi nilai aset, probabilitas eksploitasi, dan biaya tiga kontrol berbeda; tunjukkan trade-off "Choose Any Two".
> 3. Ambil satu CVE terkenal dan rekonstruksi **vulnerability life cycle**-nya dari tanggal introduksi, disclosure, patch, hingga eksploitasi massal; hitung lebar jendela zero-day.
>
> #### Bacaan Lanjutan
> - OWASP Web Security Testing Guide v4.2 (bagian Principles of Testing)
> - Lockheed Martin, "Intel-Driven Defense" white paper (Cyber Kill Chain)
> - Herbert Thompson, "Why Security Testing is Hard", IEEE Security & Privacy, 2003
> - MITRE ATT&CK Framework (attack.mitre.org)
