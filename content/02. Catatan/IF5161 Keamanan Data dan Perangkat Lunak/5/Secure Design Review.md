---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Secure Design Review
>
> > ## Questions/Cues
> >
> > - Apa lima tahap proses secure design review?
> > - Artefak apa yang dikumpulkan untuk review?
> > - Siapa saja yang berperan dan apa kontribusinya?
> > - Bagaimana threat model dijembatani ke design review?
> >
> > ## Reference Points
> >
> > - IF5161 — W04 Secure Architecture and Design Review, bagian "The Secure Design Review Process", "Roles in a Secure Design Review", "Bridging Threat Modeling and Design Review"
>
> > ### Proses Lima Tahap
> >
> > ```mermaid
> > flowchart LR
> >     P1["1. Preparation<br/>requirement + threat model"] --> P2["2. Artifact Collection<br/>DFD, sequence, C4"]
> >     P2 --> P3["3. Review Execution<br/>walkthrough + checklist<br/>(OWASP ASVS)"]
> >     P3 --> P4["4. Risk Assessment<br/>residual risk"]
> >     P4 --> P5["5. Remediation<br/>dokumentasi &amp; tracking"]
> > ```
> >
> > 1. **Preparation**: kumpulkan requirement dan threat model.
> > 2. **Artifact collection**: DFD, sequence diagram, **C4 model**.
> > 3. **Review execution**: walkthrough memakai checklist, mis. **OWASP ASVS**.
> > 4. **Risk assessment**: evaluasi **residual risk**.
> > 5. **Remediation**: dokumentasikan keputusan dan lacak mitigasi.
> >
> > ### Peran dalam Review
> >
> > | Peran | Kontribusi |
> > |---|---|
> > | **System Architect** | Mempresentasikan desain dan menjelaskan trade-off |
> > | **Security Architect / AppSec Engineer** | Menantang asumsi, mengidentifikasi celah kontrol |
> > | **Data Protection Officer (DPO)** | Memastikan privasi dan keselarasan regulasi |
> > | **Development Lead** | Menilai kelayakan dan dampak performa |
> > | **Security Champion** | Menjembatani tim developer dan keamanan |
> >
> > ### Menjembatani Threat Modeling dan Design Review
> >
> > Keluaran threat modeling ([[STRIDE dan Pemetaan Kontrol]]) menjadi masukan review dan hasilnya dilacak sampai residual risk. Contoh rantai pemetaan: **Threat (Spoofing) → Control (mTLS + JWT) → Residual risk (kompromi kunci) → Mitigation (HSM)**. Dengan demikian review tidak berhenti pada "kontrol ada", melainkan bertanya *apa risiko yang tersisa setelah kontrol itu*.
> >
> > ```mermaid
> > flowchart LR
> >     T["Threat:<br/>Spoofing"] --> C["Control:<br/>mTLS + JWT"]
> >     C --> R["Residual risk:<br/>key compromise"]
> >     R --> M["Mitigation:<br/>HSM"]
> > ```

> [!cornell] #### Summary
>
> **Secure design review** berlangsung dalam lima tahap: **preparation, artifact collection, review execution, risk assessment, remediation**, melibatkan arsitek sistem, arsitek keamanan, DPO, development lead, dan security champion. Hasil threat modeling dipetakan ke kontrol dan **residual risk** yang kemudian dimitigasi, sehingga review menghasilkan keputusan terdokumentasi.

> [!ad-libitum]- Additional Information
>
> #### OWASP ASVS dan C4
> **ASVS** memiliki tiga level verifikasi (L1 dasar, L2 standar, L3 tinggi) dengan butir terstruktur: arsitektur, autentikasi, session, access control, kriptografi, dll. **C4 model** (Context, Container, Component, Code) membantu menyajikan arsitektur pada tingkat abstraksi yang tepat bagi reviewer.
>
> #### Proyek Eksplorasi Mandiri
> 1. Lakukan design review mini terhadap arsitektur proyek kuliah Anda memakai 10 butir ASVS Level 1.
> 2. Catat residual risk dan siapa pemilik keputusan penerimaannya.
>
> #### Bacaan Lanjutan
> - OWASP ASVS 4.0
> - Simon Brown, *The C4 model for visualising software architecture*
