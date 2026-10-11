---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Attribute-Based Access Control dan XACML
>
> > ## Questions/Cues
> >
> > - Apa itu ABAC dan atribut apa yang dipakai?
> > - Bagaimana aturan kebijakan ABAC dirumuskan?
> > - Apa saja komponen arsitektur XACML (PEP, PDP, PAP)?
> > - Bagaimana ABAC memodelkan RBAC dan MAC?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 58-71)
>
> > ### Atribut dalam ABAC
> >
> > ABAC memutuskan akses berdasarkan **atribut**, bukan identitas semata:
> >
> > - **Subject attributes**: melekat pada subjek (user, aplikasi, proses): identifier, nama, jabatan, role.
> > - **Resource attributes**: melekat pada resource (web service, fungsi sistem, data): mis. metadata Dublin Core.
> > - **Environment attributes**: konteks operasional/situasional: waktu saat ini, level ancaman, klasifikasi keamanan jaringan.
> >
> > ### Rumusan Kebijakan
> >
> > S, R, E adalah himpunan subject, resource, environment dengan atribut SAₖ, RAₘ, EAₙ. Nilai atribut dinyatakan sebagai fungsi, misalnya `Role(s) = "Service Consumer"`, `ServiceOwner(r) = "XYZ, Inc."`, `CurrentDate(e) = ...`. **Policy rule** adalah fungsi Boolean atas atribut s, r, dan e yang menentukan apakah s boleh mengakses r pada lingkungan e. Proses keputusan = mengevaluasi aturan yang berlaku pada *policy store*.
> >
> > ### Fleksibilitas Pemodelan
> >
> > - **RBAC**: "User dengan role Manager boleh mengakses web service ApprovePurchase".
> > - **Semantik kaya**: "Sebuah resource hanya boleh diakses oleh pemiliknya".
> > - **MAC**: "File terklasifikasi dapat diakses pengguna dengan clearance setara atau lebih tinggi".
> >
> > Evaluasi aturan dapat direduksi menjadi ekspresi *First Order Logic* atau subset yang lebih efisien (Description Logic, Horn Logic), sehingga cocok dengan teknologi Semantic Web (atribut sebagai OWL axioms).
> >
> > ### Arsitektur XACML
> >
> > ```mermaid
> > flowchart LR
> >     S["Subject"] -->|"Request"| PEP["PEP<br/>Policy Enforcement Point"]
> >     PEP -->|"query"| PDP["PDP<br/>Policy Decision Point"]
> >     PDP --> PAP["PAP<br/>Policy Administration Point<br/>(Policy store)"]
> >     PDP --> AA["Attribute Authority"]
> >     PDP -->|"Permit / Deny"| PEP
> >     PEP --> R["Resource"]
> > ```
> >
> > **XACML** (OASIS) adalah bahasa kebijakan dan arsitektur berbasis XML: request memuat Subject, Resource, Action, (Environment) dengan atribut; policy set berisi Policy → Rule (Target, Condition); PDP membandingkan request dengan semua kebijakan/aturan yang berlaku, menggabungkan hasil, lalu mengembalikan **Decision** (Permit, Deny, dll.). Contoh: *"user ana@xacml.org boleh login ke Video Server antara 08:00 dan 17:00"*.
> >
> > ### Contoh Skenario Kampus
> >
> > - Mahasiswa terdaftar boleh mengakses layanan "TutorialVideoStreaming" di server kampus tanpa batas waktu; dari dalam kampus mendapat level **GOLD/SILVER**, dari luar **BRONZE**.
> > - Mahasiswa tidak terdaftar hanya dari jaringan internal dan di luar jam kerja, dengan level **BRONZE**.

> [!cornell] #### Summary
>
> **ABAC** memutuskan akses dari atribut **subject, resource, dan environment** melalui policy rule berupa fungsi Boolean. Ia dapat memodelkan RBAC dan MAC dan mendukung kebijakan kontekstual (waktu, lokasi). **XACML** menyediakan bahasa dan arsitektur **PEP-PDP-PAP** dengan attribute authority untuk menegakkan dan memutuskan kebijakan.

> [!ad-libitum]- Additional Information
>
> #### Policy-as-Code Modern
>
> Konsep PDP/PEP kini hadir sebagai **Open Policy Agent (OPA/Rego)**, AWS **Cedar**, dan Kyverno; lihat penerapannya pada [[Prinsip Cloud-Native - Lima Pilar Arsitektur Aman]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis policy Rego yang mengizinkan akses hanya jika `user.department == resource.department` dan jam kerja, lalu uji dengan `opa eval`.
>
> #### Bacaan Lanjutan
> - NIST SP 800-162 *Guide to ABAC Definition and Considerations*.
> - OASIS XACML 3.0 Specification.
