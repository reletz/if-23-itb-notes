---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Role-Based dan Relationship-Based Access Control
>
> > ## Questions/Cues
> >
> > - Bagaimana RBAC mengelompokkan hak dalam role?
> > - Apa itu role hierarchy dan apa tantangannya?
> > - Mengapa online social network butuh model akses khusus (ReBAC)?
> > - Siapa saja pelaku dan kebijakan pada ReBAC?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 39-46)
>
> > ### Role-Based Access Control (Ravi Sandhu)
> >
> > Subjek **ditugaskan ke role**, hak (⟨action, object⟩) **dikelompokkan ke role**. Lingkungan: aplikasi bersama (*shared application*). Tantangan: role dapat **hierarkis**; hak bisa berbeda atau **bertentangan**; menjaga **least privilege**; dan *amplification of privilege*.
> >
> > ```mermaid
> > flowchart LR
> >     U["USERS"] -->|"user-role<br/>assignment"| R["ROLES"]
> >     R -->|"permission-role<br/>assignment"| P["PERMISSIONS"]
> >     U --> S["SESSIONS"]
> >     S --> R
> >     R -.-> H["Role hierarchy"]
> > ```
> >
> > Pada **RBAC dengan hierarki**, role senior mewarisi permission role di bawahnya sehingga administrasi lebih ringkas.
> >
> > ### Access Control pada Online Social Network (OSN)
> >
> > Graf sosial dimodelkan sebagai **directed labeled simple graph G = ⟨U, E, Σ⟩**: node U = pengguna, edge E = relasi, Σ = tipe relasi (beserta inversnya). Kontrol akses berbasis **relasi** disebut **ReBAC**.
> >
> > Karakteristik:
> >
> > - **Policy individualization**: pengguna menentukan sendiri preferensi privasi dan aktivitas; pengguna terkait juga dapat mengonfigurasi kebijakan, digabungkan sistem.
> > - **User dan resource sebagai target** (mis. poke, pesan, undangan pertemanan).
> > - **Kebijakan terpisah untuk aksi keluar (outgoing) dan masuk (incoming)**: pengguna bisa menjadi requester atau target (mis. memblokir notifikasi aktivitas teman).
> > - **Pola jalur berbasis regular expression** dengan batas hop (contoh ⟨ua, (f\*c, 3)⟩).
> >
> > ### Aktor dan Kebijakan ReBAC
> >
> > UA (accessing user), UT (target user), UC (controlling user), RT (target resource); kebijakan: **AUP** (accessing user policy), **TUP** (target user policy), **TRP** (target resource policy), **SP** (system policy).
> >
> > Permintaan akses ⟨ua, action, target⟩ dievaluasi dengan:
> >
> > - Target **pengguna ut**: AUP milik ua, TUP milik ut, SP, dan relasi U2U antara ua dan ut.
> > - Target **resource rt**: AUP milik ua, TRP milik rt, SP, dan relasi U2U antara ua dan pengendali uc.

> [!cornell] #### Summary
>
> **RBAC** memberi hak lewat role (user-role dan permission-role assignment, sessions, hierarki) sehingga administrasi mudah dan least privilege terjaga. Pada jaringan sosial, **ReBAC** memodelkan graf relasi pengguna dan mengevaluasi permintaan ⟨ua, action, target⟩ dengan kebijakan individual (**AUP, TUP, TRP**) serta kebijakan sistem (**SP**) berbasis pola relasi.

> [!ad-libitum]- Additional Information
>
> #### RBAC di Cloud dan Google Zanzibar
>
> IAM cloud (AWS IAM, Kubernetes RBAC) menerapkan RBAC; **Google Zanzibar** (basis Google Drive/YouTube) dan OpenFGA/SpiceDB menerapkan ReBAC skala besar dengan *relationship tuples*.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat `Role` dan `RoleBinding` Kubernetes yang hanya mengizinkan membaca Pod pada satu namespace, lalu uji dengan `kubectl auth can-i`.
>
> #### Bacaan Lanjutan
> - Sandhu et al. (1996). *Role-Based Access Control Models*.
> - Pang et al. (2019). *Zanzibar: Google's Consistent, Global Authorization System*.
