---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] PASTA dan LINDDUN
>
> > ## Questions/Cues
> >
> > - Apa fokus PASTA dibanding STRIDE?
> > - Apa tujuh tahap PASTA?
> > - Apa itu LINDDUN dan tujuh ancaman privasinya?
> > - Kapan memakai STRIDE, PASTA, atau LINDDUN?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "PASTA", "LINDDUN", dan "Framework Synthesis: The Three Lenses"
>
> > ### PASTA: Metodologi Berbasis Risiko Bisnis
> >
> > **PASTA** (Process for Attack Simulation and Threat Analysis) berasal dari **VerSprite (2012)** dan berfokus pada **risiko bisnis serta sudut pandang penyerang (attacker-centric)**. Cocok untuk sistem enterprise, lingkungan teregulasi, dan **membenarkan ROI keamanan kepada eksekutif**.
> >
> > ```mermaid
> > flowchart LR
> >     P1["1. Define<br/>Objectives"] --> P2["2. Define<br/>Scope"]
> >     P2 --> P3["3. Decompose<br/>Application"]
> >     P3 --> P4["4. Threat<br/>Analysis"]
> >     P4 --> P5["5. Vulnerability<br/>Analysis"]
> >     P5 --> P6["6. Attack<br/>Modeling"]
> >     P6 --> P7["7. Risk &amp; Impact<br/>Analysis"]
> > ```
> >
> > Tujuh tahap bergerak dari **tujuan bisnis** (1-2), **dekomposisi aplikasi** (3), **analisis ancaman dan kerentanan** (4-5), **simulasi serangan** (6), hingga **kuantifikasi risiko dan dampak** (7) yang menghasilkan keputusan prioritas.
> >
> > ### LINDDUN: Lensa Privasi
> >
> > **LINDDUN** berasal dari **KU Leuven COSIC (2015)** dan berfokus pada **ancaman privasi terhadap data subject**, selaras dengan GDPR/CCPA. Taksonomi:
> >
> > | Huruf | Ancaman | Makna singkat |
> > |---|---|---|
> > | **L** | Linkability | Data/aksi dapat dikaitkan satu sama lain |
> > | **I** | Identifiability | Subjek dapat diidentifikasi |
> > | **N** | Non-repudiation | Subjek tak bisa menyangkal (merugikan privasi) |
> > | **D** | Detectability | Keberadaan item/aktivitas dapat dideteksi |
> > | **D** | Disclosure of information | Informasi terungkap |
> > | **U** | Unawareness | Subjek tidak sadar data diproses |
> > | **N** | Non-compliance | Pelanggaran kebijakan/regulasi |
> >
> > Cocok untuk sistem pemroses data pribadi, **Privacy Impact Assessment (PIA)**, dan **privacy-by-design**. Perhatikan bahwa *non-repudiation* di STRIDE adalah properti yang **diinginkan**, tetapi di LINDDUN justru dapat menjadi **ancaman** terhadap privasi.
> >
> > ### Sintesis: Tiga Lensa
> >
> > | Framework | Pertanyaan yang dijawab |
> > |---|---|
> > | **STRIDE** | "Apa yang bisa salah pada tiap komponen teknis?" |
> > | **PASTA** | "Apa risiko bisnisnya, dan siapa yang akan menyerang kita?" |
> > | **LINDDUN** | "Bagaimana kita melanggar privasi pengguna atau kepercayaan regulator?" |
> >
> > Ketiganya saling melengkapi; sistem yang memproses data pribadi di lingkungan teregulasi sering memakai kombinasi.

> [!cornell] #### Summary
>
> **PASTA** adalah proses tujuh tahap berbasis risiko bisnis dan perspektif penyerang, cocok untuk enterprise dan justifikasi investasi keamanan. **LINDDUN** adalah taksonomi tujuh ancaman privasi (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance). Bersama **STRIDE**, ketiganya membentuk tiga lensa: **komponen teknis, risiko bisnis, dan privasi**.

> [!ad-libitum]- Additional Information
>
> #### Hubungan dengan UU PDP
> Untuk konteks Indonesia, LINDDUN relevan dengan **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi**: *unawareness* berkaitan dengan hak subjek atas informasi pemrosesan, dan *non-compliance* dengan kewajiban pengendali data.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat PIA singkat untuk aplikasi yang menyimpan data lokasi: telusuri tujuh ancaman LINDDUN satu per satu.
> 2. Pilih satu kasus insiden dan tentukan lensa mana (STRIDE/PASTA/LINDDUN) yang paling cepat menemukan akar masalahnya.
>
> #### Bacaan Lanjutan
> - Wuyts, Scandariato & Joosen, *LINDDUN privacy threat modeling*
> - UcedaVelez & Morana, *Risk Centric Threat Modeling (PASTA)*
