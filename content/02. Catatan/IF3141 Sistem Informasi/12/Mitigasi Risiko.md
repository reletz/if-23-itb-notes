---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Mitigasi Risiko
>
> > ## Questions/Cues
> >
> > - Apa definisi mitigasi risiko?
> > - Bagaimana cara menentukan mitigasi suatu risiko?
> > - Apa perbedaan mitigasi struktural dan non-struktural?
> > - Apa saja contoh masing-masing jenis mitigasi?
> > - Bagaimana penerapannya pada contoh Simpelputer?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 23-27)
>
> > ### Definisi Mitigasi Risiko
> >
> > **Mitigasi risiko** adalah suatu upaya yang dilakukan untuk **mengurangi atau menghapus kerugian** yang mungkin terjadi akibat risiko (bencana) yang terwujud, yaitu dengan cara membuat **persiapan sebelum** terjadinya bencana. Penekanannya pada tindakan **proaktif** (sebelum kejadian), bukan reaktif setelah kerugian terjadi.
> >
> > Mitigasi merupakan tahap ketiga dari manajemen risiko (setelah identifikasi dan analisis) dan diprioritaskan untuk risiko dengan tingkat yang tidak dapat diterima.
> >
> > ### Penentuan Mitigasi Risiko
> >
> > Mitigasi ditentukan dengan memetakan setiap risiko yang sudah diidentifikasi dan dianalisis ke bentuk tindakan penanganannya — dapat berupa upaya **struktural** maupun **non-struktural**, dan satu risiko bisa memiliki lebih dari satu mitigasi. Contoh penentuan mitigasi pada program **Simpelputer – Kab. Situbondo**:
> >
> > | ID | Risiko | Mitigasi (Struktural dan Non-Struktural) |
> > |------|--------------|-------------------------------------------|
> > | R-4 | Mobil Rusak | Menyediakan mobil cadangan; melakukan servis berkala |
> > | R-2 | Longsor | Menyusun rute alternatif; memberikan layanan di satu tempat; menggunakan layanan alternatif berbasis elektronik |
> > | R-1 | Banjir | Menyusun SOP penanganan banjir; menggunakan layanan alternatif berbasis elektronik |
> > | R-3 | Supir Sakit | Menyediakan supir cadangan; menyediakan fasilitas kesehatan untuk supir |
> >
> > ### Mitigasi Struktural vs Non-Struktural
> >
> > **Mitigasi Struktural** adalah upaya untuk meminimalkan bencana yang dilaksanakan melalui **pembangunan prasarana fisik** dan memakai **pendekatan teknologi**. Sifatnya berwujud (bangunan, alat, infrastruktur).
> >
> > Contoh mitigasi struktural:
> > - Pembangunan kanal khusus untuk mencegah banjir.
> > - Penggunaan alat deteksi aktivitas gunung berapi.
> > - Membuat struktur bangunan yang tahan gempa.
> > - Penggunaan sistem peringatan dini (*early warning system*) untuk memperkirakan kemungkinan adanya gelombang tsunami.
> >
> > **Mitigasi Non-Struktural** adalah upaya mengurangi akibat bencana melalui **pembuatan kebijakan**, seperti suatu peraturan. Sifatnya non-fisik (regulasi, prosedur, edukasi, penataan).
> >
> > Contoh mitigasi non-struktural:
> > - Larangan membuang sampah ke selokan atau sungai.
> > - Mengatur tata ruang kota.
> > - Mengatur kapasitas pembangunan masyarakat.
> >
> > ```mermaid
> > flowchart LR
> >     I["Identifikasi"] --> A["Analisis"]
> >     A --> M["Mitigasi"]
> >     M --> St["Struktural<br/>(prasarana fisik & teknologi)"]
> >     M --> NS["Non-Struktural<br/>(kebijakan & peraturan)"]
> >     St --> St1["Tanggul, kanal,<br/>bangunan tahan gempa,<br/>early warning system"]
> >     NS --> NS1["SOP, pelatihan,<br/>tata ruang,<br/>larangan/regulasi"]
> > ```
> >
> > ### Contoh Tabel Mitigasi — Simpelputer Kab. Situbondo
> >
> > Untuk risiko **R-1 (Banjir)** pada dimensi **Smart Environment**, program kerja **Simpelputer – Kab. Situbondo**, mitigasi dipisah secara eksplisit menjadi struktural dan non-struktural:
> >
> > | ID | Risiko | Mitigasi Struktural | Mitigasi Non-Struktural |
> > |------|--------|---------------------|--------------------------|
> > | R-1 | Banjir | Membangun layanan berbasis elektronik; membangun tanggul sungai; membersihkan sungai dan pembuatan sudetan | Melakukan pelatihan dan penyuluhan; membentuk Kelompok Kerja (POKJA); membuat Prosedur Operasi Standar Bencana Banjir |
> >
> > Terlihat bahwa satu risiko (Banjir) ditangani dengan kombinasi tindakan fisik/teknologi (tanggul, sudetan, layanan elektronik) dan tindakan kebijakan/SDM (pelatihan, POKJA, SOP), sehingga penanganan menjadi lebih menyeluruh.

> [!cornell] #### Summary
>
> **Mitigasi risiko** adalah upaya proaktif untuk mengurangi atau menghapus kerugian akibat risiko dengan membuat persiapan sebelum bencana terjadi. Mitigasi ditentukan dengan memetakan tiap risiko hasil analisis ke tindakan penanganannya. Mitigasi dibedakan menjadi **struktural** — meminimalkan bencana lewat **pembangunan prasarana fisik dan pendekatan teknologi** (mis. tanggul, kanal, bangunan tahan gempa, early warning system) — dan **non-struktural** — mengurangi akibat lewat **kebijakan/peraturan** (mis. larangan membuang sampah ke sungai, penataan tata ruang, SOP, pelatihan). Pada contoh **Simpelputer Kab. Situbondo**, risiko seperti Banjir, Longsor, Mobil Rusak, dan Supir Sakit dimitigasi dengan kombinasi tindakan struktural dan non-struktural agar penanganannya komprehensif.

> [!ad-libitum]- Additional Information
>
> #### Strategi Respons Risiko (PMBOK)
>
> Mitigasi (mengurangi) hanyalah satu dari empat respons risiko negatif: **Avoid** (menghindari, mengubah rencana agar risiko hilang), **Mitigate** (mengurangi probabilitas/dampak), **Transfer** (mengalihkan, mis. asuransi/outsourcing), dan **Accept** (menerima dengan dana cadangan/*contingency*).
>
> #### Rencana Kontingensi vs Mitigasi
>
> **Mitigasi** menurunkan kemungkinan/dampak sebelum kejadian; **rencana kontingensi** disiapkan untuk dijalankan *jika* risiko tetap terjadi (mis. sistem lama sebagai backup). Keduanya saling melengkapi.
>
> #### Pemantauan Efektivitas Mitigasi
>
> Setelah mitigasi diterapkan, lakukan penilaian ulang Tingkat Risiko (**residual risk**). Jika risiko sisa masih di atas ambang toleransi, tambahkan mitigasi lain. Risk register diperbarui berkala.
>
> #### Studi Kasus
>
> **Kasus 1:** Risiko Kegagalan Sistem Baru saat deployment dimitigasi non-struktural lewat rollback plan dan pelatihan pengguna, serta struktural lewat environment staging dan menjalankan sistem lama paralel sebagai backup.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Untuk dua risiko terpenting di tugas besar kalian, rancang masing-masing satu mitigasi struktural dan satu non-struktural.
> 2. Hitung residual risk setelah mitigasi dan bandingkan dengan tingkat risiko awal.
>
> #### Bacaan Lanjutan
>
> - UU No. 24 Tahun 2007 tentang Penanggulangan Bencana (konsep mitigasi struktural & non-struktural).
> - PMI (2017). *PMBOK Guide* — Plan Risk Responses.
> - ISO 31000:2018 — *Risk Management — Guidelines*.
