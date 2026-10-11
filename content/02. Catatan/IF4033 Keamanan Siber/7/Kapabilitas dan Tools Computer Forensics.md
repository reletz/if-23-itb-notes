---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kapabilitas dan Tools Computer Forensics
>
> > ## Questions/Cues
> >
> > - Media apa saja yang dapat menyimpan data forensik?
> > - Apa saja yang dapat ditemukan lewat computer forensics?
> > - Apa yang terjadi saat file dihapus?
> > - Tool dan fitur apa yang umum dipakai?
> > - Apa beda raw search dan indexed search?
> >
> > ## Reference Points
> >
> > - IF4033 Computer Forensics (Slides 12-13)
> > - IF4033 Computer Forensics (Slides 34-37)
>
> > ### Tipe Forensik dan Media
> >
> > Tipe: **network forensics**, perangkat digital kecil, **storage media** (computer forensics), dan **code analysis**. Media yang berpotensi menyimpan data: komputer/laptop, iPad, iPod, smartphone, pemutar MP3, hard drive, kamera digital, USB, PDA, backup tape, CD/DVD.
> >
> > ### Kemampuan
> >
> > Dapat mengetahui perangkat eksternal yang pernah terpasang dan siapa pengaksesnya; memulihkan file terhapus; menentukan program yang berjalan; memulihkan halaman web, email (dan siapa yang membacanya), chat log; mengetahui file server yang dipakai; menemukan *hidden history* dokumen; memulihkan catatan telepon dan SMS; menemukan malware dan data yang dikumpulkannya.
> >
> > ### Apa yang Terjadi Saat File Dihapus?
> >
> > Pada Windows, **FAT/MFT** menyimpan awal dan akhir file. Saat dihapus, hanya **pointer** dihapus dan ruang pada FAT/MFT ditandai tersedia. **Data aktual tidak dihapus**: ia berada di **unallocated space** sampai ditimpa data baru, sehingga dapat dipulihkan.
> >
> > ```mermaid
> > flowchart LR
> >     F["File ada:<br/>MFT → data"] -->|"delete"| D["MFT: ditandai bebas<br/>data tetap di disk"]
> >     D -->|"ditimpa file baru"| G["Data hilang"]
> >     D -->|"forensic recovery"| R["Data dipulihkan"]
> > ```
> >
> > ### Fitur Tool Forensik
> >
> > Akuisisi, pelaporan, koleksi dan analisis data (file terhapus, unallocated space, **file slack**), pemindaian virus/logic bomb, pencarian bukti memberatkan, **imaging** (duplikat data asli), dan verifikasi akurasi dengan **hash** dan **CRC**.
> >
> > ### Software Umum
> >
> > ArcSight Logger, NetWitness Investigator, Quest Change Auditor, Cellebrite, Physical Analyzer, Lantern, **FTK (AccessData)**, **EnCase**, **dd**, **Autopsy**, serta kategori tool pada **Kali Linux** (forensic hashing, imaging, suites, network/password/PDF/RAM forensics).
> >
> > ### Strategi Pencarian
> >
> > | Jenis | Cara | Kecepatan |
> > |---|---|---|
> > | **Raw search** | Mencari kata kunci di seluruh drive | Lambat pada drive besar |
> > | **Indexed search** | Drive diindeks dulu | Indexing lama, pencarian instan |

> [!cornell] #### Summary
>
> Computer forensics dapat memulihkan file terhapus, riwayat perangkat/aplikasi, email, chat, dan jejak malware dari berbagai media. Saat file dihapus, hanya pointer di **FAT/MFT** yang dibuang sehingga data tetap di **unallocated space** hingga tertimpa. Tool seperti **FTK, EnCase, Autopsy, dd** menyediakan akuisisi, imaging terverifikasi hash, analisis file slack, serta pencarian **raw** atau **indexed**.

> [!ad-libitum]- Additional Information
>
> #### Catatan Modern
>
> Pada SSD, perintah **TRIM** dan *wear leveling* membuat data terhapus jauh lebih sulit dipulihkan dibanding HDD; enkripsi disk penuh (BitLocker, FileVault) membuat akuisisi mati (*dead-box*) berguna hanya jika kunci tersedia, sehingga **live acquisition** makin penting.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pada image disk uji (mis. dari NIST CFReDS), pakai Autopsy untuk memulihkan file terhapus dan menyusun timeline aktivitas.
>
> #### Bacaan Lanjutan
> - NIST CFReDS (Computer Forensic Reference Data Sets).
> - Altheide & Carvey. *Digital Forensics with Open Source Tools*.
