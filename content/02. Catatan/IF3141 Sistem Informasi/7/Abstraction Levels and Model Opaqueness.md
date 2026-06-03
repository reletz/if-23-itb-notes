---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Abstraction Levels and Model Opaqueness
>
> > ## Questions/Cues
> >
> > - Apa empat mekanisme abstraksi: classification, generalisation, composition, idealisation?
> > - Apa perbedaan contextual, conceptual, logical, dan physical model?
> > - Apa itu black-box vs white-box elements?
> > - Mengapa cross-referencing antar model diperlukan?
> > - Bagaimana traceability menjamin konsistensi sistem?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 14-16)
>
> > ### Mekanisme Abstraksi
> >
> > Abstraksi dalam pemodelan dapat dilakukan melalui empat mekanisme utama:
> >
> > **Classification (Klasifikasi)**: Mengelompokkan objek-objek individual menjadi sebuah kelas (*class*) berdasarkan karakteristik yang sama. Contoh: mahasiswa Andi, Budi, dan Citra diabstraksikan menjadi class "Mahasiswa".
> >
> > **Generalisation (Generalisasi)**: Mengabstraksikan kesamaan dari beberapa class menjadi sebuah superclass, membentuk hierarki pewarisan (*is-a*). Contoh: "Mahasiswa" dan "Dosen" digeneralisasi menjadi "Civitas Akademika".
> >
> > **Composition (Komposisi)**: Membangun keseluruhan dari bagian-bagiannya (*part-of*). Contoh: sebuah "Pesanan" tersusun atas beberapa "Item Pesanan".
> >
> > **Idealisation (Idealisasi)**: Menyederhanakan dengan mengabaikan ketidaksempurnaan dunia nyata untuk fokus pada bentuk ideal/esensial dari suatu elemen, sehingga model lebih mudah dianalisis.
> >
> > ### Tingkatan Model (Levelling)
> >
> > Model dapat dibedakan menurut tingkat abstraksinya, dari yang paling longgar hingga paling teknis:
> >
> > **Contextual model**: Representasi yang **tidak terstruktur** (*unstructured*) yang membantu menggambarkan **scope dan tujuan** sebuah elemen atau sistem. Model ini menyediakan latar belakang (*background*) bagi level-level lainnya. Contoh: rich picture atau context diagram awal.
> >
> > **Conceptual model**: Deskripsi yang **terstruktur** dan detail tingkat tinggi tentang elemen **tanpa memperhatikan implementasi**, misalnya sebuah proses bisnis atau struktur data konseptual. Conceptual model sering kali **tidak lengkap** atau belum robust secara struktural.
> >
> > **Logical model**: Lebih **lengkap dan robust secara struktural** namun masih **mengabaikan isu implementasi**. Contoh: logical data model (ERD ternormalisasi) yang belum terikat pada DBMS tertentu.
> >
> > **Physical model**: Mempertimbangkan **isu implementasi** seperti detail spesifik teknologi, lokasi fisik, dan sebagainya. Contoh: skema tabel fisik pada PostgreSQL lengkap dengan tipe data, indeks, dan partisi.
> >
> > Perpindahan dari contextual ke physical adalah perjalanan dari "apa dan mengapa" menuju "bagaimana secara teknis".
> >
> > ```mermaid
> > flowchart LR
> >     Ctx["Contextual<br/>(unstructured, scope &amp; tujuan)"] --> Con["Conceptual<br/>(terstruktur, tanpa implementasi)"]
> >     Con --> Log["Logical<br/>(lengkap &amp; robust, bebas implementasi)"]
> >     Log --> Phy["Physical<br/>(isu implementasi &amp; teknologi)"]
> > ```
> >
> > ### Opaqueness: Black-box vs White-box
> >
> > Elemen model dapat dipandang dengan tingkat **opaqueness** (keburaman) yang berbeda:
> >
> > **Black-box elements**: Elemen dimana kita **tidak peduli pada cara kerja internalnya**, melainkan hanya memandangnya sebagai satu kesatuan utuh beserta tautan dan ketergantungannya pada elemen lain. Contoh: **context diagram** dan **use case diagram**, dimana sistem hanya digambarkan sebagai kotak yang menerima input dan memberi output tanpa membuka isi dalamnya.
> >
> > **White-box views**: View dimana kita **tertarik pada cara kerja internal** suatu elemen — membuka kotaknya untuk melihat komponen dan proses di dalamnya. Contoh: activity diagram detail atau class diagram dengan metode lengkap.
> >
> > Analogi: Memandang mobil sebagai black-box berarti hanya peduli ia bisa berjalan saat pedal diinjak; memandangnya sebagai white-box berarti membuka kap mesin untuk memahami mekanisme internalnya.
> >
> > ### Cross-referencing Models
> >
> > Menghasilkan banyak model saja tidak cukup; agar efektif, model-model harus **konsisten satu sama lain**. Cross-referencing dilakukan untuk:
> >
> > - **Validasi traceability**: Memastikan elemen model dapat ditelusuri kembali (*traced back*) ke **business requirements** yang mendasarinya.
> > - **Cross-referencing antar view**: Menautkan elemen di satu view ke elemen terkait di model lain bila ada ketergantungan. Contoh: event tertentu dipetakan ke use case, yang pada gilirannya dipetakan ke data statis yang dimanipulasinya.
> > - **Konsistensi scope**: Memastikan view-view berbeda memodelkan **scope sistem yang konsisten**.
> > - **Konsistensi semantik**: Memastikan model dan view mematuhi semantik yang sama; misalnya kalkulasi dan kondisi dalam Physical model benar-benar mengimplementasikan business rule yang didefinisikan di Conceptual dan Logical model.
> >
> > Tanpa cross-referencing, kumpulan model bisa saling bertentangan dan menyesatkan, alih-alih melengkapi gambaran sistem.

> [!cornell] #### Summary
>
> Abstraksi diwujudkan melalui empat mekanisme: **classification, generalisation, composition, dan idealisation**. Model dapat dilevelkan menjadi **contextual** (tidak terstruktur, mendefinisikan scope), **conceptual** (terstruktur tetapi tanpa implementasi, sering tak lengkap), **logical** (lengkap dan robust tetapi masih bebas implementasi), dan **physical** (mempertimbangkan teknologi dan detail fisik). Dari sisi opaqueness, **black-box elements** (context dan use case diagram) menyembunyikan cara kerja internal sedangkan **white-box views** membukanya. Agar bermanfaat, model-model harus di-**cross-reference** untuk menjamin **traceability** ke requirements, konsistensi scope, dan konsistensi semantik antar level.

> [!ad-libitum]- Additional Information
>
> #### CRUD Matrix dan Impact Analysis
>
> Salah satu alat cross-referencing terkenal adalah **CRUD matrix** (Create, Read, Update, Delete) yang memetakan elemen fungsional terhadap elemen data — mengungkap data mana yang dimanipulasi fungsi mana. Traceability juga mendukung **impact analysis**: saat ada change request, kita bisa melacak deliverable dan model mana yang terpengaruh.
>
> #### Hubungan dengan Zachman Framework
>
> Tingkatan contextual-conceptual-logical-physical sejalan dengan baris-baris pada **Zachman Framework** for Enterprise Architecture, yang juga membedakan perspektif dari scope kontekstual hingga representasi fisik dan detail.
>
> #### Self-Exploration Projects
>
> 1. Buat empat versi model data untuk sistem perpustakaan: contextual, conceptual, logical, physical.
> 2. Identifikasi elemen black-box dan white-box dalam dokumentasi sebuah API publik.
> 3. Susun CRUD matrix untuk modul manajemen pengguna dan validasi konsistensinya dengan use case.
>
> #### Bacaan Lanjutan
>
> - Zachman, J.A. (1987). *A Framework for Information Systems Architecture*. IBM Systems Journal.
> - Booch, G. et al. (2005). *The Unified Modeling Language User Guide*. Addison-Wesley.
> - BCS, *Business Analysis*, Bab tentang Modelling and Traceability.
