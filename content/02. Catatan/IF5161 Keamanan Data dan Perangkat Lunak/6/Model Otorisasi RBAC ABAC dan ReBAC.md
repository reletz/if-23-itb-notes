---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Model Otorisasi RBAC ABAC dan ReBAC
>
> > ## Questions/Cues
> >
> > - Apa perbedaan RBAC, ABAC, dan ReBAC?
> > - Apa itu role explosion?
> > - Bagaimana ABAC mengekspresikan kebijakan berbasis atribut dan konteks?
> > - Apa itu Google Zanzibar dan bagaimana ia memeriksa izin?
> > - Apa fungsi policy language seperti OPA/Rego dan AWS Cedar?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Authorization Models" s.d. "Policy Languages"
>
> > ### Perbandingan Model
> >
> > Standar industri: **RBAC untuk kesederhanaan, ABAC untuk granularitas**.
> >
> > | Model | Dasar keputusan | Kekuatan | Kelemahan |
> > |---|---|---|---|
> > | **RBAC** (Role-Based) | Peran pengguna | Sederhana, mudah diaudit | **Role explosion** bila peran terlalu granular |
> > | **ABAC** (Attribute-Based) | Atribut subjek, resource, aksi, konteks | Sangat granular dan dinamis | Kebijakan kompleks, sulit diuji |
> > | **ReBAC** (Relationship-Based) | Relasi antar-entitas (owner, editor, viewer, member) | Cocok untuk berbagi dokumen/sosial | Butuh penyimpanan graf relasi yang konsisten |
> >
> > ```mermaid
> > flowchart LR
> >     U["User"] --> R["Role"] --> P["Permission"] --> O["Resource"]
> >     subgraph RBAC
> >         U
> >         R
> >         P
> >     end
> > ```
> >
> > ### ABAC: Kebijakan Berbasis Atribut
> >
> > Contoh kebijakan (gaya Cedar): izinkan `read` bila **departemen principal = departemen resource**, **clearance principal >= sensitivitas resource**, waktu antara **jam 9–17**, dan lokasi negara tertentu. Atribut konteks (waktu, lokasi) memungkinkan keputusan yang tidak dapat diekspresikan oleh peran statis.
> >
> > ### ReBAC dan Google Zanzibar
> >
> > Zanzibar menyimpan **tuple relasi**: `document:doc1#owner@user:alice`, `document:doc1#editor@user:bob`, `document:doc1#viewer@group:company`. Pemeriksaan "bolehkah Bob mengedit doc1?" menjadi: *apakah Bob berada dalam relasi editor (atau relasi turunan yang memberi hak edit)?* Jika ya, **permit**. Makalah: *"Google's Zanzibar: Consistent, Global Authorization System"* (2019).
> >
> > ### Policy Languages
> >
> > Bahasa kebijakan memisahkan **keputusan** dari kode aplikasi (policy-as-code):
> >
> > - **OPA/Rego**: `default allow = false` lalu aturan `allow { input.user.role == "admin" }` dan `allow { input.user.department == input.resource.department; input.action == "read" }`.
> > - **AWS Cedar**: `permit (principal == User::"alice", action == Action::"read", resource == Document::"doc1");`
> >
> > Perhatikan pola **default deny** pada Rego, sesuai prinsip fail-safe defaults ([[Prinsip Desain Saltzer dan Schroeder]]).

> [!cornell] #### Summary
>
> **RBAC** sederhana tetapi berisiko **role explosion**, **ABAC** granular berbasis atribut dan konteks, **ReBAC** (Google Zanzibar) memutuskan akses dari relasi antar-entitas. Kebijakan modern ditulis sebagai kode di **OPA/Rego** atau **Cedar** dengan **default deny**, memisahkan logika otorisasi dari aplikasi.

> [!ad-libitum]- Additional Information
>
> #### Memilih Model
> Mulai dari RBAC; tambahkan atribut (ABAC) bila peran tak cukup; gunakan ReBAC untuk produk dengan berbagi sumber daya berbasis pengguna/grup. Implementasi open-source ReBAC: **SpiceDB, OpenFGA**. Pola arsitektur: PDP (Policy Decision Point) terpusat dengan PEP di tiap service, selaras dengan [[Zero Trust dan Defense in Depth]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Modelkan aplikasi dokumen kolaboratif dalam OpenFGA (owner/editor/viewer, folder → dokumen) dan uji pemeriksaan izin turunan.
> 2. Tulis tiga aturan Rego untuk aplikasi Anda dan uji dengan `opa test`.
>
> #### Bacaan Lanjutan
> - NIST SP 800-162 (ABAC)
> - Pang et al., *Zanzibar: Google's Consistent, Global Authorization System*
> - Dokumentasi AWS Cedar dan OPA
