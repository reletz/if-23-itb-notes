---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Arsitektur Keamanan Holistik - People, Software, dan Infrastructure
>
> > ## Questions/Cues
> >
> > - Lapisan apa saja dalam enterprise architecture yang harus diamankan?
> > - Apa peran people, policy, dan procedure?
> > - Apa yang harus dijaga pada software system dan infrastructure?
> > - Mengapa keamanan dikatakan 80% tentang manusia dan proses?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 59-69)
> > - IF4033 Security Concepts (Slides 38-47)
>
> > ### Enterprise Architecture sebagai Lapisan Keamanan
> >
> > Keamanan harus menyentuh seluruh lapisan organisasi, bukan satu komponen saja:
> >
> > ```mermaid
> > flowchart TB
> >     O["Organization:<br/>People, Policy, Procedure"] --> S["Software System:<br/>Application, Data, Platform"]
> >     S --> I["Infrastructure:<br/>Computer, Network"]
> > ```
> >
> > ### People, Policy, Procedure
> >
> > Orang harus **sadar apa yang bernilai**, bertindak sesuai **policy**, dan waspada terhadap kondisi lingkungan. Organisasi mendefinisikan policy, prosedur, serta peran dalam inisiatif keamanan informasi: *right people doing the right things right*.
> >
> > ### Software System
> >
> > - **Application**: punya security requirement dan terverifikasi pemenuhannya.
> > - **Data**: backup, *disaster recovery*, enkripsi bila perlu, tanda tangan digital, dan access management.
> > - **Software platform**: dimonitor terus, di-*patch*, dan **tidak menjalankan layanan yang tidak perlu**.
> >
> > ### Infrastructure
> >
> > - **Computer**: andal, redundan bila perlu, aman secara fisik.
> > - **Network**: firewall, **DMZ (De-Militarized Zone)**, SSL/TLS. Daftar lengkap control ada di ISO 27001.
> >
> > ### Keamanan adalah Soal Sistem, Bukan Hanya Teknologi
> >
> > Keamanan adalah rekayasa **properti non-fungsional** sistem kompleks yang butuh koordinasi komponen khusus, ibarat *interlocking articulated armour*. **Manusia adalah bagian dari sistem.** Kutipan Paul Simmonds: *80% keamanan tentang orang, proses, dan prosedur; hanya 20% tentang teknologi.*
> >
> > ### Soal Persepsi
> >
> > Keamanan tidak terlihat ketika bekerja, hanya terasa saat gagal. Persepsi risiko sering keliru: orang merasa naik mobil lebih aman daripada pesawat, padahal korban kecelakaan mobil per tahun di AS setara 225 kecelakaan Boeing 727.

> [!cornell] #### Summary
>
> Keamanan efektif bila melihat seluruh **enterprise architecture**: **organisasi** (people, policy, procedure), **software system** (application, data, platform yang di-patch dan minim layanan), dan **infrastructure** (komputer dan jaringan dengan firewall, DMZ, SSL/TLS). Karena merupakan rekayasa properti non-fungsional, **manusia adalah bagian dari sistem** ("80% orang/proses, 20% teknologi"), dan persepsi risiko sering menyesatkan.

> [!ad-libitum]- Additional Information
>
> #### Defense in Depth
>
> Prinsip lapisan ganda ini dikenal sebagai **defense in depth**: kegagalan satu control tidak langsung menembus sistem. Ia juga selaras dengan prinsip **least privilege** dan **secure by default**.
>
> #### Proyek Eksplorasi Mandiri
> 1. Gambar arsitektur sebuah layanan (mis. situs kampus) lalu tandai control untuk tiap lapisan.
>
> #### Bacaan Lanjutan
> - ISO/IEC 27001:2022 Annex A.
> - NIST Cybersecurity Framework.
