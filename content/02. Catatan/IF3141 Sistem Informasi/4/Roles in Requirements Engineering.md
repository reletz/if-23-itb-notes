---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Kebutuhan]]

> [!cornell] Roles in Requirements Engineering
>
> > ## Questions/Cues
> >
> > - Mengapa Project Sponsor penting dalam RE?
> > - Perbedaan tanggung jawab Business Analyst vs Developer
> > - Peran pengguna dalam validasi kebutuhan
> > - Tantangan koordinasi multi-peran
> > - Dampak ketiadaan Domain Expert
> >
> > ## Reference Points
> >
> > - IF3141_SISTEM_INFORMASI (Halaman 11-12)
> > - IF3141_SISTEM_INFORMASI (Halaman 43)
>
> > ### Pemangku Kepentingan Kunci
> >
> > **Project Sponsor** merupakan pemilik proyek yang bertanggung jawab atas pencapaian manfaat bisnis. Mereka memiliki wewenang akhir dalam pengambilan keputusan strategis seperti persetujuan anggaran dan ruang lingkup. Contoh: Direktur Operasi yang mendanai pengembangan sistem CRM baru akan bertindak sebagai sponsor.
> >
> > **Manajer** berperan sebagai "pemilik" kebutuhan operasional di unit kerjanya. Mereka menyediakan perspektif strategis departemen namun mungkin tidak memahami detail teknis. Contoh: Manajer Logistik mengajukan kebutuhan pelacakan real-time untuk armada distribusi.
> >
> > **Pengguna (Process Worker)** adalah operator sistem sehari-hari yang memahami workflow aktual. Mereka memberikan masukan tentang pain points dan kebutuhan fungsional harian. Contoh: Kasir supermarket yang menggunakan sistem POS memberikan masukan tentang kemudahan input transaksi.
> >
> > **Domain Expert** menyediakan pengetahuan khusus tentang industri atau proses bisnis. Mereka membantu mengidentifikasi kebutuhan tersirat (implicit requirements) yang tidak disadari pengguna biasa. Contoh: Konsultan perbankan yang memahami regulasi AML (Anti Money Laundering) untuk sistem transaksi finansial.
> >
> > ### Tim Proyek Inti
> >
> > **Project Manager** mengendalikan ruang lingkup proyek dan memastikan penyelesaian tepat waktu. Mereka bertindak sebagai penghubung antara sponsor, tim teknis, dan pemangku kepentingan. Tantangan utamanya adalah menyeimbangkan triangle constraint (scope-time-cost). Contoh: Memutuskan menunda fitur laporan custom untuk memenuhi deadline go-live.
> >
> > **Business Analyst (BA)** merupakan ahli yang melakukan elicitation, dokumentasi, dan analisis kebutuhan. Mereka menerjemahkan bahasa bisnis ke spesifikasi teknis melalui teknik seperti wawancara dan observasi. BA yang kompeten harus menguasai teknik fasilitasi dan pemodelan proses bisnis. Contoh: BA menggunakan teknik scenario analysis untuk mengungkap kebutuhan tersembunyi dalam alur persetujuan kredit.
> >
> > ### Tim Pengembangan & Pengujian
> >
> > **Tester** berperan dalam memastikan kebutuhan dapat diverifikasi secara objektif. Mereka mengevaluasi kriteria penerimaan (acceptance criteria) dan menyarankan metrik pengujian yang terukur. Contoh: Tester menyarankan perubahan requirement dari "sistem harus cepat" menjadi "response time <2 detik untuk 95% transaksi".
> >
> > **Developer** membutuhkan kebutuhan yang jelas dan tidak ambigu untuk implementasi teknis. Dalam pendekatan Agile, developer berpartisipasi aktif dalam penyempurnaan kebutuhan melalui sprint planning. Contoh: Developer mengklarifikasi kebutuhan integrasi API dengan sistem legacy melalui sesi spesifikasi teknis.

> [!cornell] #### Summary
>
> **Roles in Requirements Engineering** melibatkan **multi-pemangku kepentingan** dengan tanggung jawab berbeda: **Project Sponsor** sebagai pengambil keputusan strategis, **Business Analyst** sebagai penerjemah kebutuhan bisnis-teknis, dan **End-User** sebagai sumber kebutuhan operasional. **Koordinasi efektif** antar peran diperlukan untuk menghindari miskomunikasi yang berpotensi menyebabkan **kesalahan implementasi**. **Dokumentasi terstruktur** dan **mekanisme validasi berlapis** menjadi kunci penyeimbang kepentingan berbagai pihak.

> [!ad-libitum]- Additional Information
>
> #### Dinamika Konflik Kepentingan
>
> Konflik sering muncul antara kebutuhan fungsional (developer) vs keterujian (tester) vs batasan anggaran (sponsor). Studi kasus menunjukkan 40% kegagalan proyek IT berasal dari misalignment persepsi antar peran. Teknik resolusi konflik seperti Win-Win Negotiation atau Requirements Tradeshow dapat diterapkan.
>
> #### Matriks Tanggung Jawab (RACI)
>
> | Peran               | Elicitation | Analisis | Validasi | Persetujuan |
>
> |---------------------|-------------|----------|----------|-------------|
>
> | Project Sponsor     | C           | R        | A        | A           |
>
> | Business Analyst    | R           | A        | C        | R           |
>
> | Developer           | I           | C        | I        | I           |
>
> | Tester              | I           | I        | R        | C           |
>
> *(R: Responsible, A: Accountable, C: Consulted, I: Informed)*
>
> #### Tools Kolaborasi Multi-Role
>
> 1. **JIRA Requirements Management** - Melacak perubahan kebutuhan antar stakeholder
> 2. **Confluence Glossary** - Memastikan konsistensi terminologi
> 3. **Balsamiq Mockups** - Prototyping cepat untuk validasi bersama
> 4. **Decision Matrix** - Algoritma prioritisasi kebutuhan berbobot kepentingan peran
>
> #### Studi Kasus Kompleks
>
> Pada proyek core banking system di Bank X, ketiadaan Domain Expert menyebabkan kesalahan interpretasi kebutuhan "real-time settlement" sebagai "end-of-day batch processing". Kesalahan ini baru terdeteksi saat UAT karena tester tidak memahami nuansa perbankan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis peran dalam studi kasus Chaos Report 2003: Identifikasi pola kegagalan berdasarkan distribusi tanggung jawab
> 2. Bangun matriks RACI untuk skenario proyek open-source sederhana
> 3. Simulasikan konflik kebutuhan antara developer dan product owner menggunakan teknik role-playing
>
> #### Bacaan Lanjutan
>
> - Wiegers, K. (2013). *Software Requirements*. Microsoft Press. (Bab 5: Stakeholder Roles)
> - Robertson, S. (2012). *Mastering the Requirements Process*. Addison-Wesley. (Bagian III: Stakeholder Collaboration)
> - International Institute of Business Analysis (IIBA). (2021). *Guide to Business Analysis Body of Knowledge* (BABOK)