---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Build vs Buy Decision
>
> > ## Questions/Cues
> >
> > - Mengapa hanya sedikit sistem yang dibangun dari nol?
> > - Apa keputusan paling fundamental di awal proyek pengembangan?
> > - Faktor apa yang memengaruhi keputusan build vs buy?
> > - Kapan keputusan build atau buy sebaiknya diambil?
> > - Apa itu pendekatan kombinasi/hybrid?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 2-3)
>
> > ### Pendekatan Pengembangan Modern
> >
> > Realitas pengembangan sistem informasi modern menunjukkan bahwa **sangat sedikit sistem yang benar-benar dibangun dari nol (from the ground up)**. Pada praktiknya, tim pengembangan lebih sering berperan sebagai **perakit (assembler)** yang menggabungkan serangkaian **komponen siap pakai (ready-made components)** untuk membentuk solusi yang memenuhi sekumpulan kebutuhan tertentu.
> >
> > Analogi yang tepat: membangun sistem informasi saat ini lebih mirip merakit komputer dari komponen-komponen standar (motherboard, RAM, GPU) yang sudah teruji, dibandingkan menempa setiap transistor sendiri. Pendekatan ini menghemat waktu, biaya, dan risiko karena memanfaatkan komponen yang sudah matang dan teruji di pasar.
> >
> > ### Keputusan Fundamental: Build or Buy?
> >
> > Untuk banyak proyek pengembangan sistem, **keputusan paling fundamental** yang harus diambil di awal proyek adalah apakah akan **mengadakan (procure) solusi siap pakai** atau **membangun (build) solusi bespoke (tailor-made)**. Keputusan ini sangat menentukan arah, biaya, jadwal, dan risiko keseluruhan proyek.
> >
> > **Build (bespoke)**: solusi dirancang dan dikembangkan secara presisi untuk memenuhi kebutuhan spesifik yang telah disepakati. Cocok untuk kebutuhan unik yang menjadi keunggulan kompetitif organisasi.
> >
> > **Buy (ready-made)**: solusi diperoleh dari produk yang sudah ada di pasar, baik melalui pembelian COTS maupun adopsi open source. Cocok untuk kebutuhan yang bersifat umum (commodity) seperti payroll atau akuntansi.
> >
> > ### Faktor Penentu dan Waktu Pengambilan Keputusan
> >
> > Secara realistis, keputusan build atau buy **bergantung pada sifat proyek** yang sedang dijalankan dan, karenanya, **jenis sistem yang dicari**. Tidak ada jawaban universal: sistem yang sangat khas dengan proses bisnis unik cenderung mengarah ke build, sedangkan kebutuhan generik mengarah ke buy.
> >
> > Konsekuensinya, keputusan mengenai pendekatan mana yang dipilih **sering kali baru dapat diambil setelah kebutuhan sistem (system requirements) didefinisikan dan disepakati**. Mengambil keputusan terlalu dini, sebelum kebutuhan jelas, berisiko memilih jalur yang ternyata tidak sesuai dan menimbulkan pemborosan.
> >
> > ### Pendekatan Kombinasi (Hybrid)
> >
> > Build vs buy bukanlah pilihan biner yang mutlak. Suatu solusi terhadap kebutuhan bisnis sering kali **dihadirkan melalui kombinasi komponen bespoke yang dikembangkan sendiri dengan komponen ready-made**. Inilah esensi pendekatan **hybrid**.
> >
> > Contoh praktis: sebuah platform e-commerce mungkin membeli modul payment gateway COTS, mengadopsi sistem manajemen konten open source, namun membangun secara bespoke mesin rekomendasi produk yang menjadi pembeda kompetitif perusahaan. Dengan demikian, organisasi memperoleh keseimbangan antara kecepatan, biaya, dan diferensiasi.
> >
> > ```mermaid
> > flowchart TD
> >     R["Requirements<br/>didefinisikan & disepakati"]
> >     R --> E{"Evaluasi sifat proyek<br/>& jenis sistem"}
> >     E -->|"Kebutuhan unik<br/>(keunggulan kompetitif)"| B["Build<br/>(Bespoke / tailor-made)"]
> >     E -->|"Kebutuhan generik<br/>(commodity)"| Buy["Buy<br/>(Ready-made)"]
> >     E -->|"Sebagian unik,<br/>sebagian generik"| H["Hybrid"]
> >     Buy --> COTS["COTS"]
> >     Buy --> OS["Open Source"]
> >     H --> B
> >     H --> Buy
> > ```
>
> [!cornell] #### Summary
>
> **Build vs buy** adalah keputusan paling fundamental di awal proyek pengembangan sistem, karena sangat sedikit sistem yang dibangun **from the ground up** — tim lebih sering merakit **ready-made components**. Pilihan **build (bespoke)** menghasilkan solusi tailor-made yang presisi, sedangkan **buy (ready-made)** memanfaatkan COTS atau open source. Keputusan bergantung pada **sifat proyek dan jenis sistem**, sehingga umumnya baru diambil **setelah requirements disepakati**. Pada praktiknya solusi sering bersifat **hybrid**, mengkombinasikan komponen bespoke dengan komponen siap pakai untuk menyeimbangkan biaya, kecepatan, dan diferensiasi.

> [!ad-libitum]- Additional Information
>
> #### Kerangka Analisis Keputusan Build vs Buy
>
> Pengambilan keputusan dapat distrukturkan dengan kriteria:
>
> - **Strategic fit**: Apakah kapabilitas ini sumber keunggulan kompetitif (lean build) atau commodity (lean buy)?
> - **Total Cost of Ownership**: Biaya lisensi, kustomisasi, integrasi, pemeliharaan jangka panjang.
> - **Time-to-market**: Buy umumnya lebih cepat; build memerlukan siklus pengembangan penuh.
> - **Kesesuaian fungsional (fit-gap analysis)**: Persentase kebutuhan yang dipenuhi paket vs gap yang perlu kustomisasi.
> - **Risiko vendor lock-in** dan ketergantungan pada roadmap pihak ketiga.
>
> #### Pendekatan Konfigurasi vs Kustomisasi
>
> Pada solusi buy, perlu dibedakan antara **konfigurasi** (menyesuaikan parameter tanpa mengubah kode, aman terhadap upgrade) dan **kustomisasi** (mengubah/menambah kode, berisiko menyulitkan upgrade). Best practice: maksimalkan konfigurasi, minimalkan kustomisasi.
>
> #### Self-Exploration Projects
>
> 1. Lakukan fit-gap analysis untuk kebutuhan CRM sebuah UMKM antara membeli Salesforce vs membangun CRM kustom.
> 2. Susun matriks keputusan build/buy/hybrid berbobot untuk sistem akademik kampus.
> 3. Hitung TCO 5 tahun untuk dua skenario: ERP COTS vs ERP open source yang dikustomisasi.
>
> #### Tools dan Resources
>
> - **Gartner Magic Quadrant** dan **Forrester Wave** untuk evaluasi vendor.
> - **Weighted Scoring Model** (spreadsheet) untuk membandingkan opsi.
> - **RFP/RFI** (Request for Proposal/Information) sebagai instrumen procurement.
>
> #### Further Reading
>
> - Avison, D. & Fitzgerald, G. *Information Systems Development: Methodologies, Techniques and Tools*. McGraw-Hill.
> - Bocij, P. et al. *Business Information Systems*. Pearson.
> - ISO/IEC/IEEE 12207 — Software life cycle processes.
