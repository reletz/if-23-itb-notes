---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Heartbleed dan Alat Analisis Memori
>
> > ## Questions/Cues
> >
> > - Apa yang terjadi pada Heartbleed (CVE-2014-0160)?
> > - Mengapa satu bounds check yang hilang menjadi insiden global?
> > - Bagaimana AddressSanitizer mendeteksi overflow?
> > - Alat apa untuk analisis dan eksploitasi memori?
> > - Apa tantangan terbuka dalam vulnerability management?
> >
> > ## Reference Points
> >
> > - IF5161 — W06 Bugs, Vulnerability, Program Analysis, and Testing, "Case Study: Heartbleed" s.d. "Open Challenges: Vulnerability Management"
>
> > ### Studi Kasus Heartbleed (CVE-2014-0160)
> >
> > Kerentanan pada ekstensi **heartbeat TLS di OpenSSL (2014)**. Klien mengirim payload beserta **panjang yang diklaim**; server **tidak memeriksa** bahwa panjang itu sesuai payload sebenarnya, lalu `memcpy` menyalin sebanyak klaim. Akibatnya server membalas dengan **memori heap di sekitarnya**, membocorkan kunci privat, password, dan data sesi.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Attacker
> >     participant S as Server OpenSSL
> >     A->>S: Heartbeat: payload "hat" (3 byte), klaim panjang 64 KB
> >     S->>S: memcpy(bp, pl, payload) tanpa cek
> >     S-->>A: "hat" + 64 KB memori heap tetangga
> >     Note over A,S: Kunci, password, session data bocor
> > ```
> >
> > **Perbaikan**: tambahkan pemeriksaan batas — jika `1 + 2 + payload + padding > s->s3->rrec.length`, buang paket secara diam-diam (`return 0`) sebelum `memcpy`. Satu baris validasi, tetapi dampaknya global.
> >
> > ### Mendeteksi dengan AddressSanitizer
> >
> > Program mainan `toy_overflow.c` menyalin input ke `char buf[64]` dengan `strcpy` tanpa batas. Dikompilasi dengan `gcc -fsanitize=address -g`, ASan melaporkan **lokasi overflow, ukuran buffer, dan call stack**; tanpa ASan hasilnya hanya **korupsi diam-diam**. Tanpa proteksi program ini dapat dieksploitasi; dengan ASLR+DEP+canary eksploitasi jauh lebih sulit, tetapi tidak mustahil.
> >
> > ### Alat Analisis Memori
> >
> > | Alat | Tujuan | Lisensi |
> > |---|---|---|
> > | **AddressSanitizer** | Deteksi error memori saat runtime | Open source (built-in kompiler) |
> > | **Valgrind** | Deteksi error/leak memori | Open source |
> > | **gdb** | Debugging / analisis eksploit | Open source |
> > | **pwntools** | Pengembangan eksploit | Open source |
> >
> > ### Tantangan Terbuka
> >
> > - Codebase C/C++ legacy terlalu besar untuk ditulis ulang ke bahasa memory-safe.
> > - **Business-logic flaw** tidak tertangkap alat otomatis.
> > - Kerentanan **transitif** pada rantai pasok yang bersarang ([[Software Supply Chain Security dan SBOM]]).
> >
> > **Pesan**: mitigasi menaikkan bar tetapi tidak menghapus kelas bug; satu bounds check yang hilang dapat menjadi insiden global.

> [!cornell] #### Summary
>
> **Heartbleed** adalah buffer over-read pada heartbeat OpenSSL akibat panjang yang tidak divalidasi, membocorkan memori heap berisi kunci dan password. **AddressSanitizer** mengubah korupsi diam-diam menjadi laporan jelas. Alat seperti **Valgrind, gdb, pwntools** melengkapi analisis dan eksploitasi, sementara legacy code dan business-logic flaw tetap menjadi tantangan.

> [!ad-libitum]- Additional Information
>
> #### Pelajaran Desain Protokol
> Heartbleed juga pelajaran tentang **parsing field panjang**: jangan percaya panjang yang diumumkan pihak lain, validasi terhadap data aktual, dan pisahkan buffer rahasia dari buffer yang dikirim. Fuzzing dengan ASan (libFuzzer/AFL++) menemukan bug serupa jauh sebelum rilis.
>
> #### Proyek Eksplorasi Mandiri
> 1. Fuzz fungsi parser mini Anda dengan libFuzzer + ASan; tanam bug mirip Heartbleed dan lihat berapa lama ditemukan.
> 2. Ikuti walkthrough eksploit: `python3 -c "print('A'*76 + 'BBBB')"` lalu periksa register `eip` di gdb pada binary lab (hanya di lingkungan lab sendiri).
>
> #### Bacaan Lanjutan
> - CISA Alert dan OpenSSL Advisory CVE-2014-0160
> - Dokumentasi AddressSanitizer dan pwntools
