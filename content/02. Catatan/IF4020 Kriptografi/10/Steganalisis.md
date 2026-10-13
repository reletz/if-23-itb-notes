---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Steganalisis
>
> > ## Questions/Cues
> >
> > - Apa tujuan steganalisis dan kapan ia dianggap berhasil?
> > - Mengapa steganalisis penting (forensik citra, malware dalam gambar)?
> > - Apa beda targeted steganalysis dan blind steganalysis?
> > - Bagaimana visual attack (enhanced LSB) bekerja?
> > - Apa saja serangan statistik?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganalisis (Slides 2-21)
>
> > ### Definisi dan Tujuan
> >
> > **Steganalisis** adalah kebalikan steganografi: menentukan apakah sebuah media yang dicurigai (*suspected stego object*) **mengandung pesan tersembunyi**. Keluarannya keputusan biner: **1** (ada pesan) atau **0** (tidak ada). Steganalisis dianggap **berhasil** bila menentukan keberadaan pesan dengan **peluang lebih tinggi daripada menerka acak**.
> >
> > **Tujuan minor**: menentukan **panjang pesan**, **tipe algoritma penyisipan**, dan **kunci** yang dipakai.
> >
> > ### Mengapa Penting
> >
> > Gambar bertebaran di internet (web, media sosial, email) dan di baliknya bisa tersembunyi **pesan biasa, pesan kejahatan, program jahat, bahkan virus**. Contoh **Stegosploit** (2015): "*just look at the image and you are hacked*". Steganalisis dibutuhkan pada **forensic image analysis**, penerapan ilmu citra untuk menafsirkan isi gambar dalam perkara hukum, dengan subdisiplin **photogrammetry, photographic comparison, content analysis, image authentication**. Salah satu pekerjaan *content analysis* adalah mendeteksi pesan tersembunyi; skenario: investigator forensik diminta Lab Forensik Polri menganalisis foto kasus cybercrime memakai kakas steganalisis.
> >
> > ### Jenis Steganalisis
> >
> > | | Targeted | Blind |
> > |---|---|---|
> > | Sasaran | **algoritma steganografi spesifik** (kadang format tertentu) | **sembarang** algoritma dan format |
> > | Cara | pelajari algoritma penyisipan, cari **statistik yang berubah** setelah penyisipan | pelajari **perbedaan statistik** cover vs stego dengan **machine learning** (mis. jaringan syaraf tiruan) yang dilatih pada database media |
> > | Akurasi | **sangat akurat** | kurang akurat |
> > | Fleksibilitas | **tidak fleksibel** | dapat diperluas ke algoritma lain |
> >
> > ### Metode Steganalisis
> >
> > **1. Visual attack** (khusus citra, **subjektif**, dipakai pada masa awal riset): pengamatan kasatmata terhadap artefak mencurigakan lalu dibandingkan dengan cover asli. Contoh: **LSB plane attack** dan **filtered visual attack (enhanced LSB)**.
> >
> > **2. Statistical attack**: analisis matematis atas perbedaan cover dan stego, berdasarkan fakta bahwa penyisipan menimbulkan **artefak yang terdeteksi secara statistik**. Contoh: **histogram analysis**, **chi-square analysis**, **regular-singular (RS) analysis**, **sample pair (SP) analysis**.
> >
> > ### Enhanced LSB (Visual Attack)
> >
> > Ide: **ekstraksi bit LSB** semua pixel lalu **tampilkan sebagai gambar** pada posisi pixel sumbernya. Tiap byte warna dipetakan: bila LSB = 1 menjadi `11111111` (255), bila LSB = 0 menjadi `00000000` (0) untuk tiap kanal. Pada citra asli, bidang LSB menunjukkan struktur gambar; pada stego, bagian berisi pesan tampak sebagai **noise acak**, sehingga terlihat "ada pesan".
> >
> > ```mermaid
> > flowchart LR
> >     I["citra suspect"] --> L["ambil bit LSB<br/>tiap byte"]
> >     L --> M["map: 1 → 255, 0 → 0<br/>(per kanal R, G, B)"]
> >     M --> V["tampilkan sebagai<br/>citra hitam-putih"]
> >     V --> D{"ada area<br/>noise acak?"}
> >     D -->|ya| Y["terdeteksi ada pesan"]
> >     D -->|tidak| N["tidak terdeteksi"]
> > ```
> >
> > **Keterbatasan**: bagus untuk citra **kontras tinggi** (latar jelas); untuk citra **kontras rendah** seperti foto, bidang LSB asli sendiri sudah tampak acak sehingga steganalis kesulitan membedakan gambar yang seharusnya muncul dari pesan rahasia.

> [!cornell] #### Summary
>
> **Steganalisis** memutuskan apakah suatu media mengandung pesan tersembunyi (1/0), dianggap berhasil bila peluangnya lebih baik daripada tebakan acak; tujuan minornya menaksir panjang pesan, algoritma, dan kunci. Ia dibutuhkan pada **forensik citra** dan deteksi malware dalam gambar (Stegosploit). **Targeted steganalysis** sangat akurat tetapi spesifik pada satu algoritma/format, sedangkan **blind steganalysis** memakai machine learning, lebih umum tetapi kurang akurat. Metodenya **visual attack** (LSB plane, enhanced LSB; subjektif, efektif untuk citra kontras tinggi) dan **statistical attack** (histogram, chi-square, RS, SP).

> [!ad-libitum]- Additional Information
>
> #### Cara Kerja Chi-Square Attack
>
> LSB replacement menyamakan frekuensi pasangan nilai $(2k, 2k+1)$ pada histogram (pairs of values, PoV) karena bit pesan acak membagi pasangan secara merata. Westfeld & Pfitzmann (1999) menguji kesamaan frekuensi tiap pasangan: $\chi^2 = \sum_k \frac{(n_{2k} - \bar{n}_k)^2}{\bar{n}_k}$ dengan $\bar{n}_k = (n_{2k} + n_{2k+1})/2$. Probabilitas $p$ yang tinggi menandakan **kemungkinan besar stego**. Ia sangat efektif pada LSB sequential tetapi kurang pada penyisipan yang tersebar acak dengan rasio rendah (RS/SP lebih sensitif).
>
> #### Peran Machine Learning Modern
>
> Blind steganalysis modern memakai fitur **SPAM**, **rich models (SRM)** dan **CNN** (SRNet, Yedroudj-Net) yang dilatih pada pasangan cover/stego (BOSSbase). Peneliti steganografi merespons dengan **adaptive steganography** (HUGO, WOW, S-UNIWARD) yang menempatkan bit pada area bertekstur sehingga sulit dideteksi.
>
> #### Pertahanan: Sanitasi
>
> Selain mendeteksi, organisasi dapat **menghancurkan** pesan tanpa mendeteksi: **kompresi ulang, resize, atau noise** ringan pada gambar masuk (*content disarm and reconstruction*, CDR). Teknik ini efektif karena steganografi tidak mementingkan robustness ([[Steganografi Digital dan Terminologi]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan **LSB plane visualization** dengan PIL: keluarkan citra bidang LSB dan bandingkan cover vs stego pada citra kontras tinggi dan foto.
> 2. Terapkan chi-square test (`scipy.stats.chisquare`) pada program LSB dari [[Implementasi LSB pada Citra dan Audio]].
>
> #### Bacaan Lanjutan
>
> - Westfeld & Pfitzmann (1999), *Attacks on Steganographic Systems*.
> - Fridrich, Goljan, Du (2001), *Detecting LSB Steganography in Color and Gray-Scale Images* (RS analysis).
> - Dumitrescu, Wu, Wang (2003), *Detection of LSB Steganography via Sample Pair Analysis*.
