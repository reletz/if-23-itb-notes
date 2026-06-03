---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Konsep dan Jenis Risiko
>
> > ## Questions/Cues
> >
> > - Apa definisi risiko dalam konteks sistem informasi?
> > - Apa perbedaan risiko negatif dan risiko positif (peluang)?
> > - Apa beda antara risiko dan konsekuensi?
> > - Jenis-jenis risiko apa saja yang relevan pada proyek SI?
> > - Bagaimana mengidentifikasi risiko pada tiap tahapan SDLC?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 4-6)
>
> > ### Definisi Risiko
> >
> > **Risiko** adalah efek dari **ketidakpastian** terhadap suatu keadaan yang akan terjadi di masa depan (*future*). Apabila keadaan tersebut benar-benar terjadi, ia dapat menimbulkan suatu **kerugian** (disebut **risiko negatif**) atau justru membuka **peluang** (disebut **risiko positif**). Inti dari konsep ini adalah ketidakpastian: kita tidak tahu pasti apakah kejadian itu akan muncul, kapan munculnya, dan seberapa besar pengaruhnya.
> >
> > Karena risiko membawa potensi kerugian, maka risiko **perlu ditangani** agar dampak kerugian yang muncul dapat ditekan menjadi seminimal mungkin. Penanganan tidak berarti menghilangkan seluruh risiko (yang umumnya mustahil), tetapi mengelolanya hingga berada pada tingkat yang dapat diterima organisasi.
> >
> > Contoh: Rencana migrasi data ke sistem baru memiliki ketidakpastian apakah seluruh data akan tersalin sempurna. Jika gagal, terjadi kerugian (data hilang); jika justru memicu organisasi merapikan struktur data lama, itu menjadi peluang perbaikan.
> >
> > ### Risiko Negatif vs Risiko Positif
> >
> > **Risiko negatif** (*threat*) adalah ketidakpastian yang jika terwujud menimbulkan dampak merugikan, seperti kehilangan data, pembengkakan biaya, atau terhentinya layanan. Fokus penanganannya adalah menghindari, mengurangi, atau mentransfer dampak.
> >
> > **Risiko positif** (*opportunity*) adalah ketidakpastian yang jika terwujud justru menguntungkan, misalnya teknologi baru ternyata mempercepat proses melebihi ekspektasi. Fokus penanganannya adalah mengeksploitasi atau meningkatkan peluang tersebut. Manajemen risiko modern tidak hanya bertahan dari ancaman, tetapi juga memanfaatkan peluang.
> >
> > ### Risiko vs Konsekuensi
> >
> > **Risiko** adalah kemungkinan suatu kejadian terjadi beserta ketidakpastiannya — ia bersifat *probabilistik* dan berorientasi ke masa depan (belum tentu terjadi). **Konsekuensi** adalah akibat atau dampak nyata yang muncul *setelah* kejadian itu benar-benar terjadi — ia bersifat aktual.
> >
> > Contoh: "Server mungkin down saat beban tinggi" adalah **risiko** (masih kemungkinan). Ketika server benar-benar down dan transaksi pelanggan gagal selama dua jam, kerugian pendapatan yang muncul adalah **konsekuensi**. Dengan kata lain, risiko dianalisis dari dua komponen: kemungkinan (likelihood) terjadinya dan besar konsekuensi (dampak) bila terjadi.
> >
> > ### Jenis-Jenis Risiko
> >
> > **Risiko Teknis**: berkaitan dengan teknologi dan implementasi, contohnya *bug* pada perangkat lunak, kegagalan integrasi antar modul, dan teknologi yang sudah usang (*obsolete*).
> >
> > **Risiko Organisasi**: muncul dari sisi manusia dan kelembagaan, seperti sistem yang tidak sesuai kebutuhan pengguna dan resistensi pengguna terhadap perubahan.
> >
> > **Risiko Keamanan**: berkaitan dengan ancaman terhadap aset informasi, seperti serangan siber dan kebocoran data.
> >
> > **Risiko Proyek**: berkaitan dengan manajemen pelaksanaan proyek, seperti keterlambatan jadwal, pembengkakan biaya (*cost overrun*), dan *scope creep* (perluasan ruang lingkup yang tak terkendali).
> >
> > **Risiko Legal dan Regulasi**: berkaitan dengan kepatuhan hukum, seperti pelanggaran UU Perlindungan Data Pribadi dan ketidaksesuaian dengan regulasi yang berlaku.
> >
> > ```mermaid
> > mindmap
> >     root(("Jenis Risiko<br/>Proyek SI"))
> >         Teknis["Risiko Teknis"]
> >             T1["Bug perangkat lunak"]
> >             T2["Kegagalan integrasi"]
> >             T3["Teknologi usang"]
> >         Organisasi["Risiko Organisasi"]
> >             O1["Tidak sesuai kebutuhan"]
> >             O2["Resistensi pengguna"]
> >         Keamanan["Risiko Keamanan"]
> >             K1["Serangan siber"]
> >             K2["Kebocoran data"]
> >         Proyek["Risiko Proyek"]
> >             P1["Keterlambatan jadwal"]
> >             P2["Pembengkakan biaya"]
> >             P3["Scope creep"]
> >         Legal["Risiko Legal & Regulasi"]
> >             L1["Pelanggaran UU PDP"]
> >             L2["Tidak sesuai regulasi"]
> > ```
> >
> > ### Identifikasi Risiko pada Tiap Tahapan SDLC
> >
> > Risiko tidak hanya muncul di satu titik, melainkan menyebar di sepanjang siklus pengembangan sistem (SDLC). Setiap tahapan punya profil risiko khasnya sendiri, sehingga identifikasi harus dilakukan **pada tiap tahapan SDLC**:
> >
> > - **Perencanaan/Analisis**: kebutuhan tidak lengkap atau keliru, ekspektasi pemangku kepentingan tidak selaras.
> > - **Perancangan**: arsitektur tidak skalabel, keputusan desain mengunci teknologi yang keliru.
> > - **Pengembangan**: bug, kualitas kode rendah, keterlambatan pengkodean.
> > - **Pengujian**: cakupan uji kurang, cacat lolos ke produksi.
> > - **Implementasi/Deployment**: kegagalan sistem baru, gangguan operasi bisnis saat peralihan.
> > - **Pemeliharaan**: teknologi usang, kerentanan keamanan baru.

> [!cornell] #### Summary
>
> **Risiko** adalah efek **ketidakpastian** terhadap kejadian masa depan yang dapat menimbulkan **kerugian (risiko negatif)** atau **peluang (risiko positif)**, sehingga perlu ditangani agar kerugian minimal. **Risiko** berbeda dari **konsekuensi**: risiko bersifat probabilistik dan belum terjadi, sedangkan konsekuensi adalah dampak aktual setelah kejadian terjadi. Risiko pada proyek SI dikelompokkan menjadi lima jenis utama: **teknis, organisasi, keamanan, proyek, serta legal dan regulasi**. Karena risiko tersebar di seluruh siklus hidup sistem, **identifikasi risiko wajib dilakukan pada tiap tahapan SDLC** sesuai profil risiko masing-masing fase.

> [!ad-libitum]- Additional Information
>
> #### Komponen Penyusun Risiko
>
> Standar **ISO 31000** mendefinisikan risiko sebagai "effect of uncertainty on objectives". Secara kuantitatif risiko sering dimodelkan sebagai:
>
> ```
>
> Risiko = Kemungkinan (Likelihood) × Dampak (Impact)
>
> ```
>
> Pemisahan dua komponen ini memudahkan prioritisasi: risiko berdampak besar namun jarang dapat diperlakukan berbeda dari risiko kecil tapi sering.
>
> #### Risiko Positif dan Strategi Respons
>
> Untuk peluang (risiko positif), PMBOK mengenal strategi: **Exploit** (memastikan peluang terjadi), **Enhance** (meningkatkan probabilitas/dampak positif), **Share** (berbagi peluang dengan mitra), dan **Accept**. Ini melengkapi strategi risiko negatif: Avoid, Mitigate, Transfer, Accept.
>
> #### Studi Kasus
>
> **Kasus 1:** Proyek e-government mengidentifikasi risiko teknis "integrasi gagal" antara sistem kependudukan dan sistem pajak; karena dampaknya besar pada layanan publik, risiko ini diprioritaskan sejak fase perancangan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Petakan minimal tiga risiko untuk tiap tahapan SDLC pada proyek aplikasi mobile banking.
> 2. Identifikasi satu risiko positif (peluang) pada adopsi cloud dan rancang strategi Exploit-nya.
>
> #### Bacaan Lanjutan
>
> - ISO 31000:2018 — *Risk Management — Guidelines*.
> - PMI (2017). *PMBOK Guide* — Bab Project Risk Management.
> - Hopkin, P. (2018). *Fundamentals of Risk Management*. Kogan Page.
