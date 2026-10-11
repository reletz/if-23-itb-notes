---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rootkit dan Bootkit
>
> > ## Questions/Cues
> >
> > - Apa itu rootkit dan apa yang disembunyikannya?
> > - Apa beda user-level dan kernel-level rootkit?
> > - Bagaimana teknik subversi kernel dilakukan?
> > - Apa itu bootkit dan hypervisor rootkit?
> > - Bagaimana mendeteksi dan bertahan terhadap rootkit?
> >
> > ## Reference Points
> >
> > - IF4033 Malware (Slides 48-65)
>
> > ### Definisi
> >
> > **Rootkit** adalah software yang memungkinkan **akses istimewa berkelanjutan** ke komputer sambil **aktif menyembunyikan keberadaannya** dari administrator dengan membelokkan fungsi OS standar atau aplikasi lain. Yang disembunyikan: proses, file, koneksi jaringan terbuka, dan lalu lintas. Contoh: **skandal rootkit Sony BMG (2005)**: Extended Copy Protection pada CD musik terpasang otomatis di Windows saat CD diputar.
> >
> > ### Jenis Rootkit
> >
> > | Level | Cara kerja | Deteksi/Pertahanan |
> > |---|---|---|
> > | **User-level (userland)** | Mengganti utilitas (`ps`, `ls`, `ifconfig`, `netstat`, `find`, `du`) dan library kunci; menyisipkan akses lewat `login`, `sshd`, `passwd` | Dapat dideteksi tool integritas seperti **Tripwire** |
> > | **Kernel-level** | Mengganti atau *hook* fungsi kernel lewat **loadable kernel module** atau akses langsung memori kernel (/dev/kmem), menyembunyikan proses, file, trafik | Bandingkan *view* enumerasi struktur data kernel vs API; **kernel-driver signing** (wajib pada Windows 64-bit) |
> > | **Bootkit** | Mengganti boot loader/**MBR**; dapat mencegat kunci enkripsi disk atau menonaktifkan driver signing | Secure Boot, TPM, verified boot |
> > | **Hypervisor-level** | OS target dijalankan sebagai guest di bawah VMM jahat | Sulit dideteksi dari dalam OS |
> > | **Hardware/firmware** | Berada di firmware/perangkat | Sangat sulit |
> >
> > **Prinsip**: *"siapa yang mencapai level lebih rendah memegang kendali."*
> >
> > ### Subversi Kernel
> >
> > Kernel menangani manajemen proses, akses file, manajemen memori, dan jaringan. Teknik: **kernel patch**, **loadable kernel module**, dan **kernel memory patching**. Pada Windows, driver dapat menimpa atau mengganti fungsi pada *system service dispatch table* (melalui `ntoskrnl.exe`), atau memasang *interrupt hook*.
> >
> > ### Bootkit dan Vboot
> >
> > Bootkit mampu menghindari semua proteksi OS karena OS menganggap sistem dalam keadaan tepercaya sejak boot loader mengambil alih. Urutan boot Windows 7: BIOS → MBR → boot sector → BOOTMGR → WINLOAD → kernel/HAL. **Vboot** (contoh): bekerja di Vista/7, hanya ±3 KB, melewati pemeriksaan dengan membiarkannya berjalan lalu *in-flight patching*, dan berkomunikasi lewat ping.
> >
> > ```mermaid
> > flowchart BT
> >     HW["Hardware / firmware"] --> HV["Hypervisor"] --> K["Kernel"] --> U["User space"]
> >     R1["Rootkit hardware"] -.-> HW
> >     R2["Hypervisor rootkit"] -.-> HV
> >     R3["Kernel rootkit / bootkit"] -.-> K
> >     R4["Userland rootkit"] -.-> U
> > ```

> [!cornell] #### Summary
>
> **Rootkit** mempertahankan akses istimewa sambil menyembunyikan proses, file, dan koneksi dengan membelokkan fungsi OS. Tingkatannya: **user-level** (mengganti utilitas), **kernel-level** (hook/LKM), **bootkit** (MBR/boot loader), **hypervisor**, dan **firmware**, dengan prinsip bahwa level lebih rendah mengendalikan level di atasnya. Pertahanan: integritas file (Tripwire), kernel-driver signing, serta Secure Boot/TPM untuk bootkit.

> [!ad-libitum]- Additional Information
>
> #### Alat Deteksi dan Pertahanan Modern
>
> **rkhunter**/**chkrootkit** (Linux), **GMER**, serta **memory forensics** dengan Volatility (`psxview`, `modscan`) membandingkan berbagai view untuk menemukan objek tersembunyi ([[Incident Response dan Memory Forensics]]). **UEFI Secure Boot** dan **measured boot (TPM)** menjadi kontrol utama terhadap bootkit; contoh nyata bootkit UEFI: **LoJax** (2018) dan **BlackLotus** (2023).
>
> #### Proyek Eksplorasi Mandiri
> 1. Pada VM Linux uji, jalankan `rkhunter --check` dan `chkrootkit`, lalu bandingkan hasilnya dengan keluaran `ps` vs `/proc` untuk mencari proses tersembunyi.
>
> #### Bacaan Lanjutan
> - Hoglund & Butler. *Rootkits: Subverting the Windows Kernel*.
> - Bulygin et al. *Rootkits and Bootkits*.
