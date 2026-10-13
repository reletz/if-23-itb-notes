---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Program Analysis SAST DAST dan Taint Tracking
>
> > ## Questions/Cues
> >
> > - Apa beda SAST, DAST, dan symbolic execution?
> > - Bagaimana taint tracking bekerja (source, sink, sanitizer)?
> > - Mengapa pipeline berlapis lebih baik daripada satu alat?
> > - Apa itu variant analysis dan bagaimana Log4Shell menggambarkannya?
> > - Bagaimana triase true positive vs false positive?
> >
> > ## Reference Points
> >
> > - IF5161 — W06 Bugs, Vulnerability, Program Analysis, and Testing, "Program Analysis, Verification & Code Review" (Recap OWASP s.d. "Open Challenges: Program Analysis")
>
> > ### Mengapa Program Analysis
> >
> > Alur sesi: **analyze → broaden → confirm**. Membaca kode dan menjalankan alat terhadapnya adalah keterampilan keamanan yang paling mudah dialihkan; setiap laporan kerentanan dimulai dari "bagaimana ini ditemukan?". **SAST, DAST, dan manual review** adalah tiga kaki kursi: tidak ada yang cukup sendiri.
> >
> > | Teknik | Yang dilihat | Kapan berjalan |
> > |---|---|---|
> > | **SAST** | Source/bytecode (AST, CFG, data-flow) | Sebelum eksekusi |
> > | **DAST** | Aplikasi berjalan, black-box | Saat runtime |
> > | **Symbolic execution** | Jalur program sebagai constraint logis | Offline, mengeksplorasi path |
> >
> > ### Taint Tracking
> >
> > - **Source**: tempat data tak tepercaya masuk (`request.getParameter()`).
> > - **Sink**: tempat data dipakai secara berbahaya (`Statement.execute()`).
> > - **Sanitizer**: fungsi yang menetralkan taint (parameterized query).
> >
> > Taint tracker menandai **setiap jalur source → sink tanpa sanitizer**.
> >
> > ```mermaid
> > flowchart LR
> >     S["Source<br/>request.getParameter()"] --> V["variabel / concat"]
> >     V -->|"tanpa sanitizer"| K["Sink<br/>Statement.execute()"]
> >     V --> SAN["Sanitizer<br/>parameterized query"] --> OK["Aman"]
> >     K --> F["Temuan SAST"]
> > ```
> >
> > ### Code Review dan Pipeline Berlapis
> >
> > **Manual review** berbasis checklist (trust boundary, validasi input, cek autentikasi, error handling) dan diinformasikan threat model: tinjau lebih keras di tempat attack surface terbesar. Reviewer harus bisa menjelaskan *mengapa* satu baris aman.
> >
> > **Pipeline berlapis**: Lint → SAST → manual review (modul berisiko tinggi) → DAST/fuzzing pra-rilis. Tiap lapisan menangkap yang terlewat lapisan sebelumnya; **ruleset yang disetel lebih penting daripada pilihan alat** karena SAST tanpa tuning menenggelamkan reviewer dalam noise.
> >
> > **Anti-pattern**: menganggap satu run bersih sebagai "selesai", menekan temuan tanpa triase, meninjau diff tanpa konteks data-flow, dan "LGTM" tanpa membaca.
> >
> > ### Kemajuan: LLM dan Variant Analysis
> >
> > - **LLM-assisted review**: cepat membaca kode asing dan menjelaskan data flow, tetapi **false positive tinggi** dan jawaban salah yang meyakinkan; belum menggantikan pipeline.
> > - **Variant analysis** (CodeQL, Meta Infer, Google Tricorder): setelah menemukan satu instans pola bug, temukan **semua instans** di codebase. Inilah cara organisasi besar menanggapi CVE di kode sendiri.
> >
> > **Log4Shell (CVE-2021-44228)**: satu sink JNDI lookup yang dapat dicapai dari pesan log; tantangan sebenarnya adalah menemukan **setiap call site yang terjangkau** di codebase raksasa, sehingga static analysis skala besar lebih penting daripada satu perbaikan.
> >
> > ### Triase dan Alat
> >
> > **True positive**: dapat dieksploitasi dan sanitizer benar-benar tidak ada. **False positive**: sanitizer ada tetapi tak dikenali model alat. Setiap temuan diberi catatan triase: *confirmed*, *false positive — sanitized upstream*, atau *needs manual trace*.
> >
> > | Alat | Jenis | Lisensi |
> > |---|---|---|
> > | Semgrep | SAST | Open source |
> > | CodeQL | SAST / variant analysis | Gratis untuk OSS/akademik |
> > | Bandit | SAST (Python) | Open source |
> > | Cppcheck / Clang Static Analyzer | SAST (C/C++) | Open source |
> >
> > Contoh: kode rentan `"SELECT * FROM users WHERE id = '" + user_id + "'"` vs perbaikan `cursor.execute("... id = %s", (user_id,))`; Semgrep dijalankan dengan `semgrep --config p/owasp-top-ten ./sample-repo`.

> [!cornell] #### Summary
>
> **SAST, DAST, dan manual review** saling melengkapi; **taint tracking** menandai jalur source → sink tanpa sanitizer. **Pipeline berlapis** dengan ruleset yang disetel mengalahkan alat tunggal. **Variant analysis** (CodeQL) meluaskan satu temuan menjadi semua instans, seperti pada Log4Shell. Setiap temuan wajib **ditriase** agar false positive tidak mengikis kepercayaan.

> [!ad-libitum]- Additional Information
>
> #### Tantangan Terbuka
> False-positive fatigue, blind spot SAST pada kode dinamis/reflektif dan framework modern, serta skala analisis seluruh program dalam batas waktu CI. Praktik pendukung: baseline temuan lama, gating hanya pada temuan baru, dan menulis aturan Semgrep khusus proyek.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan Semgrep dan CodeQL pada repositori OWASP Juice Shop; bandingkan temuan dan buat tabel triase.
> 2. Tulis satu aturan Semgrep custom yang mendeteksi pola sink internal organisasi Anda.
>
> #### Bacaan Lanjutan
> - Sadowski et al., *Tricorder* (ICSE 2015)
> - Pearce et al., *Asleep at the Keyboard?* (IEEE S&P 2022)
> - Dokumentasi Semgrep dan CodeQL
