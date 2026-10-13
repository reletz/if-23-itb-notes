---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Prinsip dan Tantangan Data Management
>
> > ## Questions/Cues
> >
> > - Apa lima kelompok **prinsip data management** menurut DMBOK?
> > - Mengapa data sebagai aset punya **tantangan valuasi**?
> > - Mengapa **metadata** dibutuhkan, dan apa tantangannya?
> > - Mengapa data management bersifat **cross-functional** dan butuh perspektif enterprise?
> > - Apa arti "data management is **lifecycle management**"?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to Data Management (Slides 11-17)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 1.3
>
> > ### Prinsip dan Tantangan
> >
> > Data management harus menyeimbangkan kebutuhan **strategis dan operasional**. Seperangkat prinsip membantu keseimbangan itu, dan karakteristik khas data menimbulkan **tantangan** dalam menerapkannya.
> >
> > ```mermaid
> > flowchart TD
> >     P["Prinsip Data Management"]
> >     P --> L["Butuh komitmen<br/>kepemimpinan"]
> >     P --> V["Data berharga"]
> >     P --> R["Kebutuhan data =<br/>kebutuhan bisnis"]
> >     P --> S["Butuh beragam skill"]
> >     P --> C["Manajemen lifecycle"]
> > ```
> >
> > ### 1. Data Berharga (*Data is valuable*)
> >
> > - Data adalah aset dengan **properti unik**; nilainya **dapat dan seharusnya dinyatakan dalam istilah ekonomi**.
> > - **Tantangan:** karena berbeda dari aset lain, sulit memberi nilai moneter pada data sehingga sulit mengukur kontribusinya terhadap kesuksesan organisasi. Juga memunculkan isu *data ownership* dan *data inventorying*.
> > - Nilai data bersifat **kontekstual** dan sering **temporal** — berubah menurut kapan dan untuk siapa.
> >
> > ### 2. Kebutuhan Data Management = Kebutuhan Bisnis
> >
> > | Prinsip | Tantangan |
> > | --- | --- |
> > | **Mengelola data = mengelola kualitas data** — definisikan kebutuhan bersama konsumen data | Kualitas tinggi butuh perencanaan, komitmen, dan *mindset* yang menanamkan kualitas ke proses dan sistem |
> > | **Butuh metadata untuk mengelola data** — data yang menjelaskan data | Metadata juga data sehingga **harus dikelola** |
> > | **Butuh perencanaan** — nilai tidak datang kebetulan | Tekanan waktu dan biaya mengganggu perencanaan |
> > | **Kebutuhan data mendorong keputusan TI** | Jangan biarkan "godaan teknologi" yang memimpin keputusan data |
> >
> > ### 3. Data Management Bergantung pada Beragam Skill
> >
> > - **Cross-functional** — prosesnya kompleks; tantangannya membuat orang dengan keahlian berbeda memahami keterkaitan dan berkolaborasi.
> > - Butuh **perspektif enterprise** — memahami lingkup dan ragam data organisasi.
> > - Harus memperhitungkan **beragam perspektif** — punya aplikasi lokal tetapi harus diterapkan lintas enterprise agar efektif.
> >
> > ### 4. Data Management = Lifecycle Management
> >
> > - Tipe data berbeda punya **karakteristik lifecycle** berbeda; praktik harus fleksibel.
> > - Mengelola data termasuk mengelola **risiko**: data bisa **hilang, dicuri, atau disalahgunakan**, dan implikasi etis penggunaannya harus dipertimbangkan.
> >
> > ### 5. Kepemimpinan dan Komitmen
> >
> > Data management adalah rangkaian proses kompleks yang butuh **koordinasi, kolaborasi, dan komitmen**; tidak hanya keterampilan manajerial, tetapi juga **visi dan tujuan** dari kepemimpinan yang berkomitmen.

> [!cornell] #### Summary
>
> DMBOK merumuskan prinsip: (1) **data berharga** dan nilainya perlu dinyatakan secara ekonomi walau valuasinya sulit karena kontekstual dan temporal; (2) **kebutuhan data adalah kebutuhan bisnis** — kualitas, **metadata**, perencanaan, dan kebutuhan data yang mendorong keputusan TI; (3) butuh **beragam skill**, perspektif enterprise, dan kerja lintas fungsi; (4) data management adalah **lifecycle management** termasuk risiko dan etika; (5) butuh **komitmen kepemimpinan**.

> [!ad-libitum]- Additional Information
>
> #### Metadata: contoh konkret
>
> Metadata teknis (nama kolom, tipe), bisnis (definisi, pemilik), dan operasional (jadwal ETL, log akses). Katalog data (DataHub, Amundsen, Collibra) dipakai untuk mengelolanya — itu sendiri sistem yang perlu dikelola.
>
> #### Lifecycle data
>
> Aktivitas utama: **plan → design & enable → create/obtain → store & maintain → use → enhance → dispose**. Tiap tahap punya risiko berbeda; disposal yang buruk (retensi tak jelas) sering menjadi sumber pelanggaran privasi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pilih satu dataset (mis. KRS mahasiswa) dan gambarkan lifecycle-nya dari create sampai dispose.
> 2. Tuliskan metadata bisnis dan teknis untuk lima kolom penting dataset itu.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 1.2-1.3 dan Chapter 12 (Metadata Management).
> - Redman, T. C. (2016). *Getting in Front on Data*. Technics Publications.
