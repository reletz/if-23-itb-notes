---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Incident Response dan Memory Forensics
>
> > ## Questions/Cues
> >
> > - Pertanyaan apa yang harus dijawab saat ada indikasi kompromi?
> > - Sumber bukti apa yang paling bernilai pada sebuah host?
> > - Apa saja terminologi memori (virtual, stack, heap, paging, VAD)?
> > - Mengapa memori sangat kaya akan bukti dan tool apa yang dipakai?
> >
> > ## Reference Points
> >
> > - IF4033 Computer Forensics (Slides 38-45)
>
> > ### Skenario: Alert di Tengah Malam
> >
> > Analis SOC yang kelelahan dibangunkan oleh alert IDS baru yang ternyata **bukan false positive**: ada penyusup yang mencoba **lateral movement** di jaringan. Dari sini muncul serangkaian pertanyaan triase.
> >
> > ### Pertanyaan Kunci
> >
> > - Apakah ada kompromi? **Bagaimana** akses diperoleh?
> > - **Kapan** harus *containment*?
> > - Berapa banyak titik akses (tambah, ubah, hapus)?
> > - Apa **scope** insiden (host, akun)?
> > - Apakah ada **eksfiltrasi data**?
> > - Apakah ada lateral movement dan bagaimana dilakukan? Perlu menyelidiki host lain?
> >
> > ### Sumber Bukti Potensial
> >
> > Mengetahui data mana yang memberi informasi terbanyak dan mengumpulkannya cepat adalah kunci: **jaringan** (PCAP/NetFlow), **log OS**, log AV dan HIPS/HIDS, **MFT**, **memori**, *pagefile*, *prefetch*, dan *registry hives* pada host. Pertanyaan pada host: apa yang ditempatkan, apakah ada lateral movement, eksfiltrasi, dan host lain yang terkompromi.
> >
> > ### Terminologi Memori
> >
> > | Istilah | Arti |
> > |---|---|
> > | **Virtual memory** | Tiap proses punya ruang memori sendiri tanpa "bocor" ke proses lain |
> > | **Stack** | State runtime proses: variabel lokal dan fungsi |
> > | **Heap** | Alokasi dinamis: isi file dan input pengguna |
> > | **Paging/swapping** | Halaman memori ditulis ke disk saat memori fisik habis |
> > | **VAD** (Virtual Address Descriptors) | Struktur pohon pencatat pemakaian alamat virtual; proses dapat direkonstruksi dengan menelusurinya |
> > | **Shared memory** | Berbagi bagian memori antar-proses, mis. DLL |
> >
> > ### Memory Forensics
> >
> > Memori adalah salah satu data terkaya: **state sistem lengkap**, artefak kompromi, dan eksekusi perintah. Snapshot RAM (full physical dump, crash dump, hibernation file) memuat: proses berjalan, URL, **password**, **kunci enkripsi**, kernel module, shared library, socket terbuka, koneksi aktif, dan registry key terbuka.
> >
> > - **Akuisisi**: DumpIt, Fastdump Pro, Memoryze, FTK Imager.
> > - **Analisis**: **Volatility**, Rekall, Redline, Responder, strings, grep.
> >
> > ```mermaid
> > flowchart LR
> >     A["Alert IDS"] --> T["Triase:<br/>kompromi?"] --> C["Collect:<br/>RAM, PCAP, log, MFT"] --> AN["Analisis<br/>(Volatility)"] --> SC["Scope & containment"]
> > ```

> [!cornell] #### Summary
>
> Pada respons insiden, analis harus segera menjawab apakah ada kompromi, bagaimana akses diperoleh, scope, eksfiltrasi, dan lateral movement, dengan mengumpulkan bukti dari **jaringan, log, MFT, registry, dan memori**. **Memory forensics** menganalisis snapshot RAM untuk menemukan proses, koneksi, password, dan kunci enkripsi memakai Volatility dan kawan-kawan, karena memori menyimpan state sistem lengkap.

> [!ad-libitum]- Additional Information
>
> #### Plugin Volatility Dasar
>
> `pslist`/`psscan` (proses, termasuk yang disembunyikan), `netscan` (koneksi), `malfind` (injeksi kode), `cmdline` (argumen perintah). Konsep ini diterapkan pada kontainer di [[Anatomi Breach Cloud-Native dan Respons Insiden]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Unduh memory image sampel (mis. dari MemLabs) dan jawab: proses mana yang mencurigakan, ke IP mana ia terhubung?
>
> #### Bacaan Lanjutan
> - Ligh, Case, Levy, Walters. *The Art of Memory Forensics*.
> - Volatility Foundation documentation.
