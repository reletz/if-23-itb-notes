---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Idempotency, Immutable Infrastructure and the Terraform Workflow
>
> > ## Questions/Cues
> >
> > - Apa itu idempotency dan mengapa penting untuk IaC?
> > - Apa arti immutable infrastructure?
> > - Bagaimana alur write, plan, apply di Terraform?
> > - Apa fungsi state file dan risikonya?
> >
> > ## Reference Points
> >
> > - IF4054 IaC & Cluster Security (Slides 13-17)
>
> > ### Idempotency
> >
> > Menjalankan konfigurasi IaC yang sama dua kali **menghasilkan hasil yang sama** seperti sekali: tidak ada resource duplikat, tidak ada error pada run kedua. Inilah yang membuat kode infrastruktur **aman dijalankan ulang di CI pada setiap merge**, seperti test suite. Kontrasnya: `create_server.sh` yang dijalankan dua kali biasanya mencoba membuat server dua kali. Idempotency adalah properti **logika rekonsiliasi tool**, bukan sesuatu yang ditulis tangan.
> >
> > ### Immutable Infrastructure
> >
> > - Alih-alih menambal server yang berjalan, Anda **menggantinya seluruhnya** dengan server baru dari definisi yang diperbarui.
> > - Menghilangkan **configuration drift**: state server perlahan menyimpang dari apa yang diyakini orang.
> > - Berpasangan dengan **immutable container image**: ide "build once, replace rather than mutate" satu lapis di bawah.
> > - **Rollback menjadi sepele**: deploy ulang definisi known-good sebelumnya.
> >
> > ### Alur Terraform: Write, Plan, Apply
> >
> > ```mermaid
> > flowchart TD
> >     W["Write<br/>HCL"] --> P["terraform plan<br/>diff: create, change, destroy"]
> >     P --> R["Review<br/>di PR"]
> >     R --> A["terraform apply<br/>jalankan plan yang direview"]
> >     A --> S["State file<br/>diperbarui"]
> > ```
> >
> > - `terraform plan` menghitung dan menampilkan **diff** (apa yang dibuat, diubah, dihancurkan) sebelum menyentuh apa pun.
> > - Tidak ada yang diterapkan tanpa langkah eksplisit yang dapat direview, setara **CI gate** untuk infrastruktur.
> > - `terraform apply` menjalankan **persis plan yang direview**, tanpa kejutan.
> >
> > ### State: Sumber Kebenaran Terraform
> >
> > **State file** mencatat apa yang diyakini ada: ID resource, nilai atribut, dan graf dependency. Setiap plan membandingkan tiga hal: **state file, infrastruktur aktual, dan konfigurasi yang diinginkan**. State sebaiknya disimpan di **remote storage bersama yang terkunci** (bukan laptop) agar tim tidak menerapkan perubahan bentrok. Kehilangan atau korupsi state adalah salah satu insiden Terraform paling umum, sehingga ia harus diperlakukan seperti database produksi.

> [!cornell] #### Summary
>
> **Idempotency** membuat IaC aman dijalankan berulang di CI; **immutable infrastructure** mengganti server alih-alih menambalnya sehingga drift hilang dan rollback sepele. Terraform bekerja lewat **write → plan → apply**, di mana `plan` memberi diff yang dapat direview sebelum `apply`. **State file** adalah sumber kebenaran yang dibandingkan dengan konfigurasi dan infrastruktur nyata, dan harus disimpan di **remote storage terkunci** karena kehilangannya adalah insiden serius.

> [!ad-libitum]- Additional Information
>
> #### Remote Backend dan State Locking
>
> Backend umum: S3 + DynamoDB lock, GCS, Terraform Cloud. Gunakan juga **drift detection** terjadwal (`terraform plan` di CI) untuk menangkap perubahan manual di luar IaC.
>
> #### Proyek Eksplorasi Mandiri
> 1. Provision resource sederhana dengan Terraform, ubah satu atribut, baca output `plan`, lalu ubah resource secara manual di luar Terraform dan amati bagaimana plan mendeteksi drift.
>
> #### Bacaan Lanjutan
> - Terraform Docs — *State* dan *Backends*.
> - Google — *Building Secure & Reliable Systems*, Bab 9 dan 13.
