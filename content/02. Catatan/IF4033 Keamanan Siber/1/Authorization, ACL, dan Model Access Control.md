---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Authorization, ACL, dan Model Access Control
>
> > ## Questions/Cues
> >
> > - Apa beda authentication dan authorization (identity vs authority)?
> > - Apa itu Access Control List dan bagaimana strukturnya?
> > - Apa beda model Mandatory, Discretionary, dan Role-Based?
> > - Apa tiga properti pada model Bell-LaPadula?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 18-21)
> > - IF4033 Security Concepts (Slides 9-12)
>
> > ### Identity vs Authority
> >
> > **Authorization** memeriksa apakah seorang pengguna *berhak* melakukan suatu aksi. Authentication menjawab "siapa kamu?", authorization menjawab "boleh melakukan apa?". Secara formal: apakah **subject** (mis. Alice) boleh mengakses **object** (mis. membuka sebuah file)?
> >
> > ### Access Control List (ACL)
> >
> > ACL adalah mekanisme yang banyak dipakai sistem operasi untuk memutuskan apakah suatu aksi diizinkan. Strukturnya berupa himpunan **tiga-tuple** `<User, Resource, Privilege>`:
> >
> > | User | Resource | Privilege |
> > |---|---|---|
> > | Alice | /home/Alice/* | read, write, execute |
> > | Bob | /home/Bob/* | read, write, execute |
> >
> > Privilege dapat diberikan berdasarkan **role** (mis. admin), bukan hanya per individu.
> >
> > ### Tiga Model Access Control
> >
> > ACL dipakai untuk mengimplementasikan beberapa model:
> >
> > - **Mandatory (MAC)**: sistem yang memutuskan secara tegas siapa mengakses apa; pemilik data tidak bisa mengubahnya.
> > - **Discretionary (DAC)**, contoh UNIX: pengguna menentukan sendiri siapa yang boleh mengakses file yang ia buat atau miliki.
> > - **Role-Based (RBAC / non-discretionary)**: hak akses ditentukan oleh peran pengguna di organisasi.
> >
> > ### Model Bell-LaPadula
> >
> > Model MAC klasik untuk **confidentiality** dengan tingkat klasifikasi *Top Secret > Secret > Confidential > Unclassified*. Tiga aturannya:
> >
> > - **Simple property** ("no read up"): subjek tidak boleh membaca objek pada level lebih tinggi.
> > - **\*-property / confinement** ("no write down"): subjek tidak boleh menulis ke level lebih rendah agar informasi rahasia tidak bocor.
> > - **Tranquility property**: label klasifikasi tidak berubah selama dipakai.
> >
> > ```mermaid
> > flowchart TB
> >     TS["Top Secret"] --> S["Secret"] --> C["Confidential"] --> U["Unclassified"]
> > ```

> [!cornell] #### Summary
>
> **Authorization** menentukan apakah subject berhak melakukan aksi pada object, dan dibedakan dari authentication (identity vs authority). Mekanisme umumnya adalah **ACL** berisi tuple `<User, Resource, Privilege>`. Ia mengimplementasikan model **Mandatory** (sistem memutuskan), **Discretionary** (pemilik memutuskan, contoh UNIX), dan **Role-Based** (berdasarkan peran). Model **Bell-LaPadula** menjaga confidentiality dengan *no read up*, *no write down* (\*-property), dan *tranquility*.

> [!ad-libitum]- Additional Information
>
> #### Pasangan Integritas: Biba
>
> **Biba** adalah kebalikan Bell-LaPadula yang menjaga *integrity*: *no read down, no write up*. Pembahasan mendalam model akses ada di [[Konsep Dasar Access Control]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Eksplorasi `getfacl`/`setfacl` di Linux untuk membuat ACL pada direktori uji.
> 2. Rancang skema RBAC untuk aplikasi akademik (mahasiswa, dosen, admin).
>
> #### Bacaan Lanjutan
> - Bell, D. & LaPadula, L. (1973). *Secure Computer Systems*.
> - NIST RBAC model (Ferraiolo & Kuhn).
