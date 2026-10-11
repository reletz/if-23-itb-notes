---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Penilaian Severity - CVE, CWE, NVD, CVSS, dan Tools
>
> > ## Questions/Cues
> >
> > - Apa beda CVE, CWE, dan NVD?
> > - Bagaimana CVSS menilai tingkat keparahan?
> > - Tool apa yang dipakai untuk vulnerability testing?
> > - Apa itu Breach & Attack Simulation (BAS)?
> > - Bagaimana pelaporan temuan diorganisasi?
> >
> > ## Reference Points
> >
> > - IF4033 Vulnerability Assessment (Slides 25-36)
>
> > ### Vulnerability Testing dan Exploitation
> >
> > Tujuan: memeriksa host terhadap kerentanan yang diketahui, memastikan apakah dapat dieksploitasi, dan menilai potensi keparahannya. Metodenya: *remote vulnerability scanning* (**Nessus, OpenVAS**), *active exploitation testing*, *login checking dan brute forcing*, eksploitasi (**Metasploit, Core Impact**), penemuan 0-day dengan **fuzzing** dan program analysis, serta *post-exploitation* untuk menilai dampak (level izin, backdoor, rootkit).
> >
> > ### CVE, CWE, NVD
> >
> > | Singkatan | Arti | Peran |
> > |---|---|---|
> > | **CVE** | Common Vulnerabilities & Exposures | ID unik untuk kerentanan yang diungkap publik (mis. CVE-2021-44228) |
> > | **CWE** | Common Weakness Enumeration | Kategori kelemahan perangkat lunak/keras (mis. injection, hard-coded credentials) |
> > | **NVD** | National Vulnerability Database | Repositori publik yang memperkaya CVE dengan skor dan metadata |
> >
> > Hubungannya: CWE menjelaskan **jenis** kelemahan, CVE mengidentifikasi **instans** nyata, NVD menambahkan **skor dan konteks**.
> >
> > ### CVSS
> >
> > **Common Vulnerability Scoring System** adalah kerangka terbuka untuk mengomunikasikan karakteristik dan keparahan kerentanan. Ia memberi skor numerik **0.0 sampai 10.0** dan mencatat alasannya dalam **vector string**. Rating umum: 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical. Contoh Log4Shell mendapat skor 10.
> >
> > ### Tool Pemindai
> >
> > **Nikto** (web server scanner), **Nuclei** (scanner berbasis template), **OpenVAS** dan **Nessus** (scanner kerentanan komprehensif).
> >
> > ### Breach & Attack Simulation (BAS)
> >
> > Pendekatan keamanan ofensif **otomatis dan berkelanjutan** berbasis software, biasa dipakai dalam operasi **purple team**. Contoh open source: **MITRE Caldera** dan **OpenAEV**.
> >
> > ### Reporting
> >
> > Mengorganisasi temuan recon, scanning, dan testing: per **host, service, bahaya dan risiko**, serta **rekomendasi perbaikan**. Tool dokumentasi: Dradis, Obsidian, Notion.
> >
> > ```mermaid
> > flowchart TD
> >     S["Scan<br/>(Nessus/OpenVAS)"] --> M["Mapping ke CVE/CWE"] --> V["Skor CVSS"] --> P["Prioritisasi"] --> R["Laporan & remediasi"]
> > ```

> [!cornell] #### Summary
>
> Vulnerability testing memakai scanner (**Nessus, OpenVAS, Nikto, Nuclei**) dan framework eksploitasi (**Metasploit**). **CWE** mengkategorikan kelemahan, **CVE** mengidentifikasi kerentanan spesifik, **NVD** memperkaya dengan skor dan metadata, dan **CVSS** (0.0-10.0 + vector string) menilai severity untuk prioritisasi. **BAS** mengotomatiskan simulasi serangan berkelanjutan (purple team), dan **reporting** menyusun temuan per host/service dengan rekomendasi.

> [!ad-libitum]- Additional Information
>
> #### Komponen CVSS v3.1
>
> Base score dihitung dari metrik **Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope**, serta dampak **C/I/A**. Selain base, ada **Temporal** dan **Environmental**. CVSS menilai *severity teknis*, bukan *risiko*; pelengkapnya seperti **EPSS** (probabilitas dieksploitasi) dan katalog **CISA KEV** membantu prioritisasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Latihan slide: pindai lingkungan lab, identifikasi service/stack, cari CVE-nya, lalu hitung skor CVSS dengan kalkulator FIRST.
>
> #### Bacaan Lanjutan
> - FIRST CVSS v3.1/v4.0 Specification.
> - MITRE CWE Top 25.
