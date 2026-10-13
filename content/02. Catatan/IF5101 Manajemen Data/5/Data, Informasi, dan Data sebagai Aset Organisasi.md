---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Data, Informasi, dan Data sebagai Aset Organisasi
>
> > ## Questions/Cues
> >
> > - Mengapa organisasi memandang data sebagai **aset enterprise**?
> > - Apa definisi **data management** menurut DAMA-DMBOK?
> > - Siapa itu **data management professional**?
> > - Apa saja **tujuan (goals)** data management?
> > - Bagaimana hubungan **data** dan **informasi**?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to Data Management (Slides 4-10)
> > - DAMA International — *DAMA-DMBOK: Data Management Body of Knowledge*, 2nd Ed. (2017), Chapter 1
>
> > ### Mengapa Data Penting
> >
> > Banyak organisasi menyadari bahwa data adalah **aset vital enterprise**:
> >
> > - Data dan informasi memberi wawasan tentang **pelanggan, produk, dan layanan**.
> > - Informasi dan pengetahuan adalah kunci **keunggulan kompetitif**.
> > - Organisasi dengan data **andal dan berkualitas tinggi** dapat mengambil keputusan lebih baik.
> > - **Kegagalan mengelola data** berujung pada pemborosan dan hilangnya peluang.
> >
> > ### Definisi Data Management
> >
> > **Data management** adalah pengembangan, eksekusi, dan supervisi *rencana, kebijakan, program, dan praktik* yang **menyampaikan, mengendalikan, melindungi, dan meningkatkan nilai** aset data dan informasi **sepanjang siklus hidupnya**.
> >
> > ### Data Management Professional
> >
> > Siapa pun yang bekerja di sisi mana pun dari data management untuk mencapai tujuan strategis organisasi — dari **pengelolaan teknis** data sepanjang siklus hidup hingga memastikan data **dimanfaatkan dengan benar**. Perannya beragam:
> >
> > - **Teknis**: database administrator, network administrator, programmer.
> > - **Strategis bisnis**: Data Steward, Data Strategist, Chief Data Officer (CDO).
> >
> > ### Data sebagai Aset Organisasi
> >
> > - Data diakui luas sebagai **aset enterprise**; organisasi bergantung padanya untuk keputusan yang efektif dan operasi yang efisien.
> > - **Business driver utama** data management: memungkinkan organisasi **mendapat nilai dari aset datanya**, sama seperti pengelolaan aset keuangan dan fisik yang efektif.
> >
> > ### Tujuan Data Management
> >
> > 1. Memahami dan mendukung **kebutuhan informasi** enterprise dan stakeholder (pelanggan, karyawan, mitra).
> > 2. **Menangkap, menyimpan, melindungi, dan menjaga integritas** aset data.
> > 3. Menjamin **kualitas** data dan informasi.
> > 4. Menjamin **privasi dan kerahasiaan** data stakeholder.
> > 5. Mencegah **akses, manipulasi, atau penggunaan** yang tidak sah/tidak pantas.
> > 6. Menjamin data dapat dipakai secara efektif untuk **menambah nilai** bagi enterprise.
> >
> > ### Definisi Data dan Hubungannya dengan Informasi
> >
> > | Sumber | Definisi |
> > | --- | --- |
> > | Merriam-Webster | informasi faktual (ukuran/statistik) sebagai dasar penalaran; informasi digital yang dapat ditransmisikan/diproses |
> > | New Oxford American Dictionary | fakta dan statistik yang dikumpulkan untuk dianalisis |
> > | ASQ | "himpunan fakta yang dikumpulkan" — numerik: terukur (variabel) dan terhitung (atribut) |
> > | ISO 11179 | "representasi informasi yang dapat diinterpretasi ulang dalam bentuk formal, cocok untuk komunikasi, interpretasi, atau pemrosesan" |
> >
> > Dalam kuliah ini istilah **data** dan **informasi** dipakai bergantian. Walau sering dibedakan, keduanya **saling terkait dan bergantung**: *data adalah bentuk informasi, dan informasi adalah bentuk data*.
> >
> > ```mermaid
> > flowchart LR
> >     D["Data<br/>fakta/representasi"] --> I["Informasi<br/>bermakna bagi konteks"]
> >     I --> K["Pengetahuan<br/>keputusan &amp; keunggulan kompetitif"]
> >     K --> V["Nilai bisnis"]
> >     I -.->|"disimpan sebagai"| D
> > ```

> [!cornell] #### Summary
>
> Data adalah **aset enterprise** yang memberi wawasan dan keunggulan kompetitif; gagal mengelolanya berarti pemborosan dan peluang hilang. **Data management** = pengembangan, eksekusi, supervisi rencana, kebijakan, program, dan praktik untuk **menyampaikan, mengendalikan, melindungi, dan meningkatkan nilai** data sepanjang **lifecycle**. Profesional data mencakup peran teknis (DBA, programmer) hingga strategis (Data Steward, CDO). Tujuan: memahami kebutuhan informasi, menjaga integritas dan kualitas, menjamin privasi, mencegah akses tidak sah, dan memastikan data memberi nilai. **Data** dan **informasi** dipakai bergantian karena saling bergantung.

> [!ad-libitum]- Additional Information
>
> #### Piramida DIKW
>
> Hierarki klasik **Data → Information → Knowledge → Wisdom**. DMBOK sengaja tidak mempersoalkan batas tegas data vs. informasi, tetapi DIKW berguna untuk menjelaskan mengapa data mentah saja belum bernilai: nilai muncul saat diberi konteks dan dipakai untuk keputusan.
>
> #### Mengapa data sulit dinilai
>
> Berbeda dari aset fisik, data **tidak habis saat dipakai**, mudah **disalin**, dan nilainya **kontekstual dan temporal** (sama dengan topik di catatan [[Prinsip dan Tantangan Data Management]]). Karena itu valuasi moneter data masih topik riset (infonomics, Doug Laney).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pilih sebuah organisasi (mis. ITB) dan petakan 5 aset data utamanya, siapa pemilik, dan keputusan apa yang bergantung padanya.
> 2. Tulis satu paragraf: bagaimana "kegagalan mengelola data" pernah merugikan sebuah organisasi (cari satu kasus nyata).
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 1 (Data Management).
> - Laney, D. (2017). *Infonomics*. Routledge.
