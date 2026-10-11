---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Konsep Dasar Access Control
>
> > ## Questions/Cues
> >
> > - Apa itu access control di dunia fisik dan di sistem komputer?
> > - Apa itu principal, resource, dan privilege?
> > - Apa hubungan identification, authentication, authorization, dan audit?
> > - Mengapa authorization berlaku pada principal, bukan user?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 2-8)
>
> > ### Access Control di Dunia Fisik dan Komputer
> >
> > Di dunia fisik: pagar, tembok, pintu berkunci, anjing penjaga, dan petugas keamanan memastikan hanya orang yang diizinkan yang masuk. Di sistem komputer: **sekumpulan mekanisme keamanan yang memastikan principal mengakses resource dengan cara yang dikehendaki**.
> >
> > ### Notasi Dasar
> >
> > | Notasi | Arti | Contoh |
> > |---|---|---|
> > | **Principal (Subject)** | Entitas yang dapat melakukan aksi | User (manusia), program, blok kode (method) |
> > | **Resource (Object)** | Hal yang diakses | Informasi (file), fungsionalitas (koneksi jaringan) |
> > | **Privilege (Action/Right)** | Yang boleh/tidak boleh dilakukan principal pada resource | read, write, execute, atau aksi lebih canggih pada model lanjut |
> >
> > ### Tiga Pilar Access Control
> >
> > **Access Control = Identification & Authentication + Authorization + Audit**
> >
> > ```mermaid
> > flowchart LR
> >     IA["Identification &<br/>Authentication<br/>Siapa dia?"] --> AZ["Authorization<br/>Boleh apa?"] --> AU["Audit<br/>Apa yang dilakukannya?"]
> > ```
> >
> > - **Identification**: menyediakan identifier unik.
> > - **Authentication**: menyediakan *authenticator* yang membuktikan hak akses: *something you know* (password, PIN), *have* (smart card, token), *are* (sidik jari, suara, iris), dan *where you are* (di dalam firewall perusahaan).
> > - **Authorization**: mengasumsikan I&A sudah selesai; berlaku pada **principal, bukan user**; memutuskan apakah principal boleh menjalankan privilege atas resource.
> > - **Audit**: apa yang telah dilakukan, dasar akuntabilitas.

> [!cornell] #### Summary
>
> **Access control** adalah mekanisme yang memastikan **principal** mengakses **resource** sesuai **privilege** yang diizinkan, dibangun dari **identification & authentication** (siapa), **authorization** (boleh apa; berlaku pada principal), dan **audit** (melakukan apa). Faktor autentikasi mencakup know, have, are, dan where you are.

> [!ad-libitum]- Additional Information
>
> #### Istilah AAA
>
> Dalam jaringan, kerangka ini dikenal sebagai **AAA** (Authentication, Authorization, Accounting) dengan protokol RADIUS/TACACS+. Dasar yang lebih ringkas ada di [[Authorization, ACL, dan Model Access Control]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Petakan fitur izin file Linux (owner/group/other, rwx) ke notasi principal, resource, privilege.
>
> #### Bacaan Lanjutan
> - Anderson, R. *Security Engineering*, bab Access Control.
