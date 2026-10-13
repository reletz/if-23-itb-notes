---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Kerentanan Memory Safety dan Mitigasi
>
> > ## Questions/Cues
> >
> > - Apa beda stack dan heap, dan bug klasik apa pada keduanya?
> > - Apa saja kelas pelanggaran memory safety (spatial, temporal, type, pointer, integer)?
> > - Mitigasi kompiler/OS apa yang ada (ASLR, DEP/NX, canary, CFI)?
> > - Mengapa bahasa memory-safe dan memory tagging dianggap kemajuan?
> > - Apa anti-pattern manajemen memori?
> >
> > ## Reference Points
> >
> > - IF5161 — W06 Bugs, Vulnerability, Program Analysis, and Testing, "Stack vs. Heap Fundamentals" s.d. "Advances: Hardware Memory Tagging"
>
> > ### Stack vs Heap
> >
> > - **Stack**: frame berukuran tetap, berisi return address dan variabel lokal; cepat (LIFO).
> > - **Heap**: dialokasikan dinamis, dikelola manual atau GC; fleksibel tetapi **rawan salah**.
> >
> > Eksploit klasik menyerang stack (overflow) atau heap (use-after-free).
> >
> > ```mermaid
> > flowchart TB
> >     subgraph F["Stack frame"]
> >         B["buf[64]"] --> SB["saved EBP"] --> RA["return address"]
> >     end
> >     IN["Input &gt; 64 byte (strcpy)"] -.menimpa.-> B
> >     IN -.menimpa.-> RA
> >     RA --> H["Control-flow hijacking"]
> > ```
> >
> > ### Kelas Pelanggaran Memory Safety
> >
> > | Kelas | Contoh (CWE) | Inti |
> > |---|---|---|
> > | **Spatial** | Stack overflow (121), heap overflow (122), OOB read (125), **OOB write (787, #1 CWE Top 25)**, off-by-one (193) | Akses di luar batas objek |
> > | **Temporal** | **Use-after-free (416)**, double free (415), uninitialized memory (457/908) | Akses di luar masa hidup objek |
> > | **Type** | Type confusion (843); umum di interpreter/JIT | Memori diperlakukan sebagai tipe lain |
> > | **Pointer** | NULL deref (476), dangling pointer (825), untrusted pointer (822) | Pointer itu sendiri tidak valid |
> > | **Integer-related** | Integer overflow (190), signedness (195/196) | Aritmetika memicu alokasi terlalu kecil/bypass bounds check |
> > | **Resource** | Memory leak (401), improper release (772) | Dampak availability |
> >
> > ### Mitigasi Kompiler dan OS
> >
> > | Mitigasi | Fungsi |
> > |---|---|
> > | **ASLR** | Mengacak tata letak memori |
> > | **DEP/NX** | Menandai stack/heap non-executable |
> > | **Stack canary** | Mendeteksi overflow sebelum return |
> > | **CFI** | Membatasi target control-flow yang valid |
> >
> > Masing-masing menaikkan bar eksploitasi, **tidak ada yang peluru perak**.
> >
> > ### Praktik, Anti-Pattern, dan Kemajuan
> >
> > - **Best practice**: bahasa memory-safe atau subset aman; seluruh mitigasi aktif secara default (tak dimatikan demi performa); fuzzing di CI dan pelacakan dependensi berbasis feed CVE.
> > - **Anti-pattern**: `strcpy`/`gets`/`sprintf` tanpa cek; manajemen memori manual tanpa disiplin kepemilikan; peringatan kompiler diabaikan (`-Wall -Wextra` dimatikan); mitigasi dimatikan untuk benchmark lalu lupa dinyalakan.
> > - **Bahasa memory-safe**: **Rust** di kernel Linux, Android, Chromium, dimotivasi data bahwa mayoritas kerentanan parah adalah masalah memory safety (Microsoft, Google, CISA); menulis ulang C/C++ lama lambat dan mahal.
> > - **Hardware memory tagging**: **ARM MTE** menandai pointer dan region memori, mendeteksi banyak UAF/OOB di level hardware; baru dipakai selektif (mis. Android).

> [!cornell] #### Summary
>
> Bug **memory safety** (spatial, temporal, type, pointer, integer) membutuhkan perangkat berbeda dari bug lapis web. **ASLR, DEP/NX, canary, CFI** menaikkan biaya eksploitasi tetapi tidak menghapus kelasnya. Solusi struktural: **bahasa memory-safe (Rust)** dan **memory tagging (ARM MTE)**, ditambah disiplin menghindari fungsi tak aman dan fuzzing berkelanjutan.

> [!ad-libitum]- Additional Information
>
> #### Data Pendorong
> Laporan Microsoft (2019) dan Google menyatakan sekitar **70%** kerentanan serius pada kode C/C++ mereka adalah masalah memory safety. NSA (2022) dan CISA mendorong migrasi ke bahasa memory-safe. Pendekatan transisi: tulis komponen *baru* dan parser tak tepercaya dalam Rust, bungkus legacy dengan sandbox.
>
> #### Proyek Eksplorasi Mandiri
> 1. Kompilasi `toy_overflow.c` dengan dan tanpa `-fstack-protector`, ASLR, dan NX; catat perbedaan perilaku (lihat [[Heartbleed dan Alat Analisis Memori]]).
> 2. Tulis ulang parser sederhana dalam Rust dan buktikan overflow tidak bisa dibuat dalam safe Rust.
>
> #### Bacaan Lanjutan
> - NSA, *Software Memory Safety* (2022)
> - Serebryany et al., *Memory Tagging* (LLVM Dev Mtg 2018)
