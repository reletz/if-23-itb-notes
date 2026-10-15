---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Infrastructure as Code Fundamentals
>
> > ## Questions/Cues
> >
> > - Apa itu Infrastructure as Code dan mengapa dipakai?
> > - Apa beda provisioning imperative dan declarative?
> > - Apa pola umum dalam cloud provisioning?
> > - Mengapa container orchestration dibutuhkan?
> >
> > ## Reference Points
> >
> > - IF4054 IaC & Cluster Security (Slides 8-11)
>
> > ### Apa Itu IaC?
> >
> > **Infrastructure as Code** mendefinisikan infrastruktur (server, jaringan, load balancer, cluster) dalam **file teks yang dilacak di version control**, persis seperti kode aplikasi.
> >
> > - File yang mendeskripsikan "satu instance Postgres di us-east-1" dapat **direview lewat pull request** sebelum menyentuh infrastruktur nyata.
> > - Menggantikan klik manual di console dan shell script tak terlacak dengan **satu sumber kebenaran yang reproducible**.
> > - Memperluas **Faktor I** (codebase) ke lapisan infrastruktur itu sendiri.
> >
> > ### Imperative vs Declarative
> >
> > | | Imperative (How) | Declarative (What) |
> > |---|---|---|
> > | Bentuk | Skrip langkah berurutan: buat ini, lalu itu | Deskripsi **keadaan akhir**: "harus ada tepat 3 web server" |
> > | Edge case | Harus ditangani manual (server sudah ada?) | Tool menghitung langkah yang aman |
> > | Re-run | Sering gagal atau menduplikasi resource | **Aman**; tidak ada perubahan bila realita sudah cocok |
> > | State saat ini | Sulit diketahui tanpa membaca seluruh skrip | File selalu menggambarkan infrastruktur yang dimaksud |
> >
> > ### Pola Cloud Provisioning
> >
> > - **Resource graph** — infrastruktur dimodelkan sebagai graf resource dengan dependency (database harus ada sebelum aplikasi yang terhubung).
> > - **Modules** — blok infrastruktur reusable dan berparameter (mis. "VPC standar").
> > - **Environments as data** — dev, staging, prod memakai kode modul sama dengan file variabel berbeda, bukan salinan konfigurasi.
> > - **State** — tool mencatat apa yang diyakini ada, lalu merekonsiliasinya dengan realita di setiap run.
> >
> > ### Mengapa Orchestration?
> >
> > Begitu container lebih dari segelintir, harus ada yang memutuskan **di mana tiap container berjalan** dan **apa yang terjadi saat ada yang mati**. Orchestrator menangani **scheduling, scaling, networking, dan self-healing**. **Kubernetes** adalah orchestrator dominan: sistem deklaratif yang terus-menerus merekonsiliasi "apa yang berjalan" dengan "apa yang diminta", analog lapisan infrastruktur dari prinsip disposability 12-factor.
> >
> > ```mermaid
> > flowchart TD
> >     F["File deklaratif<br/>di Git"] --> R["Review via PR"]
> >     R --> T["Tool IaC / orchestrator<br/>hitung perbedaan"]
> >     T --> I["Infrastruktur nyata"]
> >     I -->|"rekonsiliasi"| T
> > ```

> [!cornell] #### Summary
>
> **IaC** mendefinisikan infrastruktur dalam file teks berversi yang dapat direview seperti kode, menggantikan klik manual dan skrip tak terlacak. Pendekatan **declarative** (deskripsi keadaan akhir; tool menghitung langkah, re-run aman) lebih unggul daripada **imperative** (skrip langkah rentan duplikasi). Pola umum: **resource graph, modules, environments as data, dan state**. Begitu container banyak, **orchestrator** seperti Kubernetes menangani scheduling, scaling, networking, dan self-healing secara deklaratif.

> [!ad-libitum]- Additional Information
>
> #### Landscape Tool IaC
>
> **Terraform/OpenTofu** (multi-cloud, deklaratif), **Pulumi** (bahasa pemrograman umum), **AWS CloudFormation / CDK**, serta **Ansible** (configuration management, cenderung prosedural). Terraform berfokus pada *provisioning*; Ansible pada *konfigurasi* di dalam server.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis skrip bash yang membuat sebuah direktori dan file, jalankan dua kali, lalu padankan perilakunya dengan pendekatan deklaratif (mis. satu resource Terraform `local_file`).
>
> #### Bacaan Lanjutan
> - Kief Morris — *Infrastructure as Code*.
> - Terraform Docs — *Introduction*.
