---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Istilah Arsitektur, Praktik, dan Komponen Data Architecture
>
> > ## Questions/Cues
> >
> > - Apa arti istilah **"architecture"** secara umum dan dalam sistem informasi?
> > - Apa saja makna lain "architecture" tergantung konteks?
> > - Apa itu **architecture practice** dan kaitannya dengan enterprise architecture?
> > - Apa tiga **komponen esensial** data architecture?
> > - Mengapa data architecture fundamental bagi data management?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 4-8)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4 (Data Architecture)
>
> > ### Istilah "Architecture"
> >
> > **Secara umum:**
> >
> > - Seni dan ilmu membangun sesuatu (terutama struktur hunian) beserta hasilnya.
> > - **Susunan terorganisasi** elemen komponen untuk mengoptimalkan fungsi, kinerja, kelayakan, biaya, dan estetika keseluruhan struktur atau sistem.
> >
> > **Dalam desain sistem informasi** (ISO/IEC 42010:2007): *organisasi fundamental sebuah sistem, yang diwujudkan dalam komponennya, hubungan antar komponen dan dengan lingkungan, serta prinsip yang memandu desain dan evolusinya.*
> >
> > ### Makna Lain Menurut Konteks
> >
> > "Architecture" dapat berarti:
> >
> > 1. **Deskripsi kondisi sistem saat ini** (*current state*).
> > 2. **Komponen** dari sekumpulan sistem.
> > 3. **Disiplin** merancang sistem (*architecture practice*).
> > 4. **Rancangan yang disengaja** untuk masa depan (*future/proposed state*).
> > 5. **Artefak** yang menjelaskan sistem (*architecture documentation*).
> > 6. **Tim** yang melakukan desain (*the Architects*).
> >
> > ### Architecture Practice
> >
> > - Dijalankan di **berbagai tingkat** organisasi (enterprise, domain, proyek) dengan **fokus berbeda** (infrastruktur, data, aplikasi).
> > - **Enterprise architecture** mencakup arsitektur domain: **bisnis, data, aplikasi, teknologi**.
> > - Praktik EA yang baik membantu organisasi **memahami kondisi sistem saat ini**, **mendorong perubahan** menuju target, **mendukung kepatuhan regulasi**, dan **meningkatkan efektivitas**.
> >
> > ### Tiga Komponen Data Architecture
> >
> > ```mermaid
> > flowchart LR
> >     DA["Data Architecture"]
> >     DA --> O["Outcomes (artifacts)<br/>model, definisi, data flow"]
> >     DA --> A["Activities<br/>membentuk, menyebarkan,<br/>memenuhi intensi"]
> >     DA --> B["Behavior<br/>kolaborasi, mindset, skill"]
> > ```
> >
> > ### Data Architecture dan Data Management
> >
> > Data architecture **fundamental bagi data management**: merepresentasikan data organisasi pada **berbagai tingkat abstraksi** sehingga dapat dipahami dan manajemen dapat mengambil keputusan. Ia paling bernilai ketika mendukung kebutuhan **seluruh enterprise**.

> [!cornell] #### Summary
>
> **Architecture** adalah organisasi fundamental sebuah sistem — komponen, hubungannya, dan prinsip desain/evolusinya (ISO/IEC 42010). Istilah ini dapat berarti deskripsi kondisi sekarang, komponen, disiplin, rancangan masa depan, artefak dokumentasi, atau tim arsitek. **Architecture practice** berjalan di tingkat enterprise/domain/proyek; EA mencakup arsitektur **bisnis, data, aplikasi, teknologi**. **Data architecture** memiliki tiga komponen: **outcomes (artefak), activities, behavior**, dan fundamental bagi data management karena merepresentasikan data pada berbagai tingkat abstraksi.

> [!ad-libitum]- Additional Information
>
> #### Analogi bangunan
>
> Denah rumah (arsitektur) berbeda dengan bangunan jadi. Data architecture adalah "denah kota data": ia tidak menggambar tiap tabel aplikasi, tetapi menetapkan zona, jalan (data flow), dan aturan bangunan (standar).
>
> #### Arsitektur ≠ desain basis data
>
> Pemodelan ER/relasional (folder 1-4) bekerja di tingkat satu aplikasi/proyek; data architecture menjaga konsistensi **lintas** proyek (lihat [[Enterprise Data Architecture dan Enterprise Data Model]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil sebuah sistem akademik dan tulis ulang enam makna "architecture" di atas khusus untuk sistem itu.
> 2. Cari satu dokumen arsitektur publik (mis. ADR, C4 diagram) dan identifikasi komponen outcomes/activities/behavior.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.
> - ISO/IEC/IEEE 42010:2011. *Systems and software engineering — Architecture description*.
