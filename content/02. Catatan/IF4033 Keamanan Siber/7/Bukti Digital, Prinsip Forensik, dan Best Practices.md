---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Bukti Digital, Prinsip Forensik, dan Best Practices
>
> > ## Questions/Cues
> >
> > - Apa jenis bukti dan lima aturan bukti?
> > - Apa itu digital crime scene?
> > - Mengapa bukti digital sangat volatile?
> > - Apa yang harus dihindari dan apa best practice AusCERT?
> > - Apa itu write blocker dan imaging?
> >
> > ## Reference Points
> >
> > - IF4033 Computer Forensics (Slides 9-11)
> > - IF4033 Computer Forensics (Slides 25-33)
>
> > ### Bukti (Evidence)
> >
> > Bukti harus **relevan**: berkaitan dengan kejahatan, menjelaskan kejahatan, motif pelaku, memverifikasi apa yang terjadi, dan menentukan waktu kejadian. Empat jenis umum:
> >
> > - **Real**: benda nyata (mis. senjata).
> > - **Demonstrative**: model/peragaan kemungkinan kejadian.
> > - **Documentary**: surat, tulisan blog, dokumen.
> > - **Testimonial**: kesaksian saksi.
> >
> > **Lima aturan bukti**: *authentic, accurate, complete, convincing, admissible*. Bukti digital adalah data yang membuktikan kejahatan terjadi dan dapat menghubungkan kejahatan dengan korban atau pelaku (Carrier & Spafford, 2003). **Digital crime scene** adalah lingkungan elektronik tempat bukti digital mungkin ada (primer dan sekunder).
> >
> > ### Prinsip Forensik
> >
> > - Bukti digital **sangat volatile**.
> > - Bukti yang **terkontaminasi tidak dapat didekontaminasi**.
> > - Pengadilan memakai prinsip **best evidence**: cetakan atau salinan *bit stream* memenuhinya.
> > - **Chain of custody** krusial.
> >
> > ### Faktor Penting
> >
> > Prosedur hukum, tidak mengkompromikan bukti, perlakukan setiap bukti seolah akan dipakai di pengadilan, **dokumentasi**, chain of custody, **write blocker**, dan **imaging** (salinan bit-by-bit media seperti hard drive, diverifikasi dengan **hash**).
> >
> > ### Yang Harus Dihindari
> >
> > Mengubah data, mengubah timestamp, mengubah file, dan **menimpa unallocated space** (dapat terjadi saat reboot). Selalu verifikasi nilai hash image.
> >
> > ### Best Practice (AusCERT)
> >
> > - Minimalkan penanganan dan kerusakan data asli; catat setiap perubahan dan simpan log tindakan.
> > - Patuhi lima aturan bukti; jangan melebihi pengetahuan; ikuti kebijakan keamanan lokal dan dapatkan kebijakan tertulis.
> > - Ambil image sistem seakurat mungkin; siap bersaksi; pastikan tindakan **dapat diulang**.
> > - Bekerja cepat dengan urutan dari bukti **volatil ke persisten**; jangan menjalankan program pada sistem terdampak.
> >
> > ### Preservasi Bukti Digital
> >
> > Pencatatan, tool andal, penyimpanan aman, bekerja dalam isolasi, preservasi dan dokumentasi bukti, dokumentasi semua perubahan, checklist investigasi, dan rinci.
> >
> > ```mermaid
> > flowchart TB
> >     V["Urutan koleksi: volatil → persisten"] --> M["RAM, proses, koneksi"] --> D["Swap, cache, log"] --> S["Disk (imaging)"] --> A["Media arsip, backup"]
> > ```

> [!cornell] #### Summary
>
> Bukti digital harus memenuhi **authentic, accurate, complete, convincing, admissible**. Ia **sangat volatile** dan tidak dapat didekontaminasi, sehingga digunakan **write blocker**, **imaging bit-by-bit**, verifikasi **hash**, dan **chain of custody**. Hindari mengubah data/timestamp atau menimpa unallocated space; ikuti best practice AusCERT: catat semua tindakan, bekerja dari **volatil ke persisten**, dan pastikan tindakan dapat diulang.

> [!ad-libitum]- Additional Information
>
> #### Order of Volatility (RFC 3227)
>
> Urutan: register/cache → memori (tabel routing, ARP, proses) → file sementara/swap → disk → log jarak jauh → konfigurasi fisik/topologi → media arsip. Prinsip ini dipakai langsung pada [[Incident Response dan Memory Forensics]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat image `dd` dari flash drive, hitung SHA-256 sebelum dan sesudah, dan dokumentasikan langkahnya sebagai laporan akuisisi.
>
> #### Bacaan Lanjutan
> - RFC 3227 *Guidelines for Evidence Collection and Archiving*.
> - ISO/IEC 27037:2012.
