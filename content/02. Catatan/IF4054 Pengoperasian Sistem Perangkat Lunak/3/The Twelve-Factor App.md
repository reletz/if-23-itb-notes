---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] The Twelve-Factor App
>
> > ## Questions/Cues
> >
> > - Apa asal-usul dan tujuan metodologi 12-factor?
> > - Apa kedua belas faktornya?
> > - Mengapa 12-factor dan container cocok dipasangkan?
> > - Apa batas dari "build once, run everywhere"?
> > - Apa yang tidak bisa diselesaikan portabilitas?
> >
> > ## Reference Points
> >
> > - IF4054 Foundations & Architecture (Slides 10-20)
>
> > ### Asal dan Tujuan
> >
> > **The Twelve-Factor App** adalah metodologi dari insinyur **Heroku** untuk membangun aplikasi SaaS yang **portabel, resilient, dan siap continuous deployment**. Ia disusun setelah mengamati pola umum di ratusan aplikasi terdeploy, dan menarget satu kegagalan: aplikasi yang jalan di laptop developer tetapi rusak atau berperilaku beda di produksi. Ide intinya: **pisahkan apa yang berubah (kode) dari apa yang bervariasi (config, lingkungan)**.
> >
> > ### Dua Belas Faktor
> >
> > | # | Faktor | Inti |
> > |---|---|---|
> > | 1 | **Codebase** | Satu codebase di version control, banyak deploy; jangan fork per environment |
> > | 2 | **Dependencies** | Deklarasikan dan isolasi dependency secara eksplisit |
> > | 3 | **Config** | Simpan config (kredensial, endpoint, feature flag) di environment variable |
> > | 4 | **Backing Services** | Database, queue, cache sebagai *attached resources* yang dapat ditukar via config |
> > | 5 | **Build, Release, Run** | Pisahkan tegas tahap build, release (build + config), dan run |
> > | 6 | **Processes** | Proses stateless; yang persisten ke backing service |
> > | 7 | **Port Binding** | Ekspor layanan lewat port; aplikasi mandiri |
> > | 8 | **Concurrency** | Skala keluar dengan menambah instance proses |
> > | 9 | **Disposability** | Startup cepat dan graceful shutdown |
> > | 10 | **Dev/Prod Parity** | Samakan dev, staging, produksi |
> > | 11 | **Logs** | Log sebagai event stream ke stdout |
> > | 12 | **Admin Processes** | Tugas admin sebagai one-off process di lingkungan identik |
> >
> > ```mermaid
> > flowchart LR
> >     R["12-Factor App"]
> >     R --> A["Kode dan build<br/>1 Codebase, 2 Dependencies,<br/>5 Build-Release-Run"]
> >     R --> B["Config dan layanan<br/>3 Config, 4 Backing Services,<br/>10 Dev/Prod Parity"]
> >     R --> C["Runtime<br/>6 Processes, 7 Port Binding,<br/>8 Concurrency, 9 Disposability"]
> >     R --> D["Operasi<br/>11 Logs, 12 Admin Processes"]
> > ```
> >
> > ### Faktor III dalam Praktik: Config
> >
> > Config yang di-*hardcode* membocorkan secret ke version control dan membuat kode yang sama tak bisa dijalankan di dua lingkungan. Perbaikannya membaca nilai dari **environment variable** (`os.environ["DB_PASSWORD"]`), sehingga codebase identik di mana pun. Secara lokal ini yang dilakukan file `.env` (yang tidak masuk Git).
> >
> > ### 12-Factor dan Container
> >
> > - Container image hampir pasti merupakan **build artifact 12-factor**: satu codebase, dependency eksplisit, tanpa config tertanam.
> > - Environment variable (Faktor III) memetakan langsung ke `--env` Docker dan **ConfigMap/Secret** Kubernetes.
> > - **Disposability** (Faktor IX) memungkinkan orchestrator mematikan dan menjadwalkan ulang container tanpa seremonial.
> >
> > ### Batas "Build Once, Run Everywhere"
> >
> > 1. **Arsitektur dan platform** — image ARM tak jalan di x86; solusinya multi-arch image.
> > 2. **Workload bergantung hardware** — GPU, kernel module, driver host ada di luar container.
> > 3. **Backing service tetap berbeda** — "swappable" bukan berarti identik (versi Postgres lokal vs managed).
> > 4. **Skala, data, dan state** — trafik produksi dapat memunculkan race condition yang tak pernah muncul di laptop.
> >
> > ### Portabilitas Belum Cukup
> >
> > Pemisahan config mencegah *works on my machine*, menghilangkan secret dari kode, dan menjamin "yang diuji adalah yang dikirim". Namun ia **tidak mengurangi blast radius**. Menurut **Conway's Law**, sistem mencerminkan struktur komunikasi organisasi yang membangunnya; tim yang kusut menghasilkan layanan yang kusut (*distributed monolith*). Layanan sempit yang dimiliki satu business capability membatasi kegagalan secara teknis dan organisasional.

> [!cornell] #### Summary
>
> **Twelve-Factor App** adalah metodologi Heroku untuk aplikasi portabel dan siap continuous deployment, yang pada intinya **memisahkan kode dari config dan lingkungan**. Dua belas faktornya mencakup codebase, dependency, config, backing service, build-release-run, process stateless, port binding, concurrency, disposability, dev/prod parity, logs, dan admin process. Faktor-faktor ini selaras dengan **container** (image, env var, ConfigMap/Secret, disposability). Namun **portabilitas bukan segalanya**: arsitektur platform, hardware, dan perbedaan backing service tetap ada, dan **Conway's Law** mengingatkan bahwa desain organisasi menentukan blast radius.

> [!ad-libitum]- Additional Information
>
> #### Secret Management
>
> Environment variable cocok untuk config, tetapi secret sensitif lebih aman dikelola dengan **Kubernetes Secrets**, **HashiCorp Vault**, atau secret manager cloud, karena env var dapat bocor lewat log atau proses dump.
>
> #### Proyek Eksplorasi Mandiri
> 1. Audit satu aplikasi Anda terhadap 12 faktor; beri skor lulus atau gagal pada masing-masing dan perbaiki dua yang terlemah.
>
> #### Bacaan Lanjutan
> - Adam Wiggins — *The Twelve-Factor App* (12factor.net).
> - Kevin Hoffman — *Beyond the Twelve-Factor App*.
