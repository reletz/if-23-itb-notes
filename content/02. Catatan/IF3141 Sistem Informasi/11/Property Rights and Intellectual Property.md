---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Property Rights and Intellectual Property
>
> > ## Questions/Cues
> >
> > - Apa definisi kekayaan intelektual (intellectual property)?
> > - Apa perbedaan copyright, patent, trademark, dan trade secret?
> > - Apa kelemahan perlindungan copyright untuk software?
> > - Mengapa paten sulit diperoleh untuk software?
> > - Tantangan apa yang dihadapi hak kekayaan intelektual di era digital?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 19-22)
>
> > ### Pengertian Kekayaan Intelektual
> >
> > **Intellectual property (Kekayaan Intelektual)** didefinisikan sebagai **produk pikiran berwujud dan tidak berwujud** (tangible and intangible products of the mind) yang diciptakan oleh individu atau korporasi.
> >
> > Kekayaan intelektual mencakup karya kreatif, penemuan, merek, dan rahasia bisnis. Karena bersifat sebagian besar tidak berwujud, perlindungannya menghadapi tantangan unik di masyarakat digital — terutama kemudahan penyalinan tanpa kehilangan kualitas. Kekayaan intelektual dilindungi melalui empat instrumen hukum utama: copyright, patent, trademark, dan trade secret.
> >
> > ```mermaid
> > flowchart TD
> >     IP["Intellectual<br/>Property"]
> >     IP --> C["Copyright<br/>(lindungi manifestasi karya)"]
> >     IP --> P["Patent<br/>(monopoli atas ide penemuan)"]
> >     IP --> T["Trademark<br/>(tanda/simbol pembeda)"]
> >     IP --> S["Trade Secret<br/>(formula/data bisnis rahasia)"]
> > ```
> >
> > ### Copyright (Hak Cipta)
> >
> > **Copyright** adalah **pemberian hak secara statuter** (statutory grant) yang melindungi pencipta kekayaan intelektual dari penyalinan karyanya oleh pihak lain untuk tujuan apa pun, selama hidup pencipta **ditambah sejumlah tahun tertentu setelah kematiannya** (di banyak yurisdiksi 70 tahun).
> >
> > **Kelemahan copyright**: yang dilindungi hanyalah **manifestasi** karya, **bukan ide yang mendasarinya**. Seorang pesaing dapat menggunakan software Anda, memahami cara kerjanya, lalu membangun software baru yang mengikuti konsep yang sama **tanpa melanggar copyright**. Inilah sebabnya copyright saja sering tidak cukup melindungi inovasi perangkat lunak.
> >
> > ### Patent (Paten)
> >
> > **Patent** memberikan **monopoli eksklusif atas ide di balik suatu penemuan** untuk jangka waktu tertentu (umumnya 20 tahun). Tujuannya memastikan penemu mesin, perangkat, atau metode baru menerima imbalan finansial penuh atas kerja mereka, sekaligus memungkinkan penggunaan luas dengan menyediakan **diagram rinci** bagi pihak yang ingin menggunakan ide tersebut di bawah lisensi pemilik paten.
> >
> > Paten diberikan berdasarkan **originality, novelty, dan invention**.
> >
> > **Kekuatan paten**: memberikan monopoli atas **konsep dan ide yang mendasari** software (bukan hanya manifestasinya). **Kesulitannya**: harus melewati kriteria ketat — **nonobviousness** (karya harus mencerminkan pemahaman dan kontribusi khusus), originality, dan novelty — serta **bertahun-tahun menunggu** untuk memperoleh perlindungan.
> >
> > ### Trademark dan Trade Secret
> >
> > **Trademark (Merek Dagang)** adalah **tanda, simbol, dan gambar** yang digunakan untuk membedakan produk di pasar. Contoh: logo, nama merek, slogan. Trademark melindungi identitas merek dari peniruan yang membingungkan konsumen.
> >
> > **Trade Secret (Rahasia Dagang)**: setiap produk kerja intelektual — **formula, perangkat, pola, atau kompilasi data** — yang digunakan untuk tujuan bisnis dapat diklasifikasikan sebagai rahasia dagang, **asalkan tidak berdasarkan informasi yang berada di domain publik**. Contoh klasik: resep Coca-Cola atau algoritma pencarian Google.
> >
> > Hukum trade secret memberikan **monopoli atas ide di balik produk kerja**, tetapi monopoli ini bisa **sangat rapuh (tenuous)** — perlindungan hilang begitu rahasia bocor atau ditemukan secara independen (reverse engineering yang sah).
> >
> > ### Tantangan terhadap Hak Kekayaan Intelektual
> >
> > Era digital menciptakan tantangan serius terhadap perlindungan kekayaan intelektual:
> >
> > - **Digital media → kemudahan replikasi (ease of replication)**: Salinan digital identik dengan aslinya dan dapat dibuat tanpa biaya, tanpa degradasi kualitas.
> > - **Proliferasi jaringan digital, termasuk internet**: Distribusi karya bajakan menjadi instan dan global, melampaui batas yurisdiksi hukum.
> >
> > Akibatnya, penegakan hak cipta atas musik, film, software, dan ebook menjadi sangat sulit, memunculkan fenomena pembajakan masif dan mendorong model bisnis baru seperti streaming berbasis langganan dan DRM (Digital Rights Management).

> [!cornell] #### Summary
>
> **Intellectual property** adalah produk pikiran berwujud dan tidak berwujud yang dilindungi melalui empat instrumen. **Copyright** melindungi manifestasi karya selama hidup pencipta plus tahun tertentu, tetapi tidak melindungi ide yang mendasarinya. **Patent** memberi monopoli atas ide penemuan (originality, novelty, invention) namun sulit diperoleh karena syarat nonobviousness dan waktu tunggu panjang. **Trademark** melindungi tanda/simbol pembeda produk, sedangkan **trade secret** melindungi formula/data bisnis selama tidak menjadi domain publik—monopoli yang rapuh. Era digital menantang semua perlindungan ini melalui **kemudahan replikasi media digital** dan **proliferasi jaringan internet** yang membuat pembajakan instan dan global.

> [!ad-libitum]- Additional Information
>
> #### Digital Millennium Copyright Act (DMCA)
>
> **DMCA (1998)** di AS mengkriminalisasi produksi dan distribusi teknologi yang menghindari proteksi hak cipta (anti-circumvention), serta memberikan "safe harbor" bagi penyedia layanan internet yang menghapus konten melanggar atas pemberitahuan (takedown notice).
>
> #### Studi Kasus: Oracle v. Google (Java API)
>
> Sengketa hukum bertahun-tahun mengenai apakah penggunaan Java API oleh Google di Android melanggar copyright. Mahkamah Agung AS (2021) memutuskan penggunaan tersebut termasuk **fair use** — menyoroti betapa kaburnya garis copyright pada software.
>
> #### Software Licensing Models
>
> - **Proprietary**: kode tertutup, lisensi berbayar (mis. Microsoft).
> - **Open source (GPL, MIT, Apache)**: kode terbuka dengan syarat lisensi berbeda; GPL bersifat copyleft (turunan harus tetap open source).
> - **Creative Commons**: lisensi untuk karya kreatif dengan berbagai tingkat kebebasan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan strategi perlindungan IP untuk startup software: kapan memilih paten vs trade secret?
> 2. Analisis dampak DRM terhadap pengalaman pengguna pada platform streaming musik.
>
> #### Bacaan Lanjutan
>
> - Laudon, K.C. & Laudon, J.P. (2021). *Essentials of Management Information Systems, 14th Ed.* Pearson.
> - WIPO (World Intellectual Property Organization) — wipo.int.
> - UU No. 28/2014 tentang Hak Cipta (Indonesia).
