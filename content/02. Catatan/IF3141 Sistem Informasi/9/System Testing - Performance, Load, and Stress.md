---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] System Testing - Performance, Load, and Stress
>
> > ## Questions/Cues
> >
> > - Apa itu system testing dan terhadap apa kepatuhannya dievaluasi?
> > - Mengapa system testing termasuk black-box dan apa "destructive attitude"?
> > - Apa saja jenis-jenis system testing?
> > - Apa tujuan performance testing dan di mana bottleneck muncul?
> > - Apa siklus baseline, prinsip one-variable-at-a-time, dan benchmark?
> > - Apa itu load/volume/longevity testing dan bedanya dengan performance testing?
> > - Apa itu stress testing, negative testing, dan recoverability?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — System Testing (Slides 2-27)
>
> > ### Definisi dan Posisi System Testing
> >
> > **System testing** dilakukan pada **sistem yang lengkap dan terintegrasi** (software + hardware) untuk mengevaluasi **kepatuhan terhadap requirements yang dispesifikasikan**. Termasuk **black box testing** sehingga **tidak memerlukan pengetahuan desain internal kode/logika** — tester memandang dari perspektif pengguna. Input-nya adalah semua komponen yang telah **lulus integration testing**, dan posisinya adalah **fase terakhir sebelum user acceptance testing (UAT)**.
> >
> > System testing memiliki **sikap hampir destruktif (destructive attitude)**: menguji bukan hanya desain, tetapi juga **behavior** dan **ekspektasi customer**, dengan sengaja berusaha membuat sistem gagal. Pengujian dimaksudkan menguji **sampai pada dan melampaui batas (up to and beyond the bounds)** spesifikasi untuk mengungkap perilaku pada kondisi ekstrem.
> >
> > ### Jenis-Jenis System Testing
> >
> > ```mermaid
> > flowchart TD
> >     SYS["System Testing<br/>(non-functional)"]
> >     SYS --> P["Performance Testing<br/>hilangkan bottleneck, set baseline"]
> >     SYS --> L["Load Testing<br/>beban/volume terbesar"]
> >     SYS --> ST["Stress Testing<br/>break & recover gracefully"]
> >     SYS --> U["Usability Testing<br/>user-friendliness"]
> >     SYS --> SEC["Security Testing<br/>proteksi data"]
> > ```
> >
> > Lima jenis system testing pada deck ini seluruhnya menargetkan aspek **non-fungsional**.
> >
> > ### Performance Testing
> >
> > Tujuan **performance testing** **bukan menemukan bug**, melainkan **menghilangkan bottleneck** dan **menetapkan baseline** untuk regression testing — sebuah proses **measurement & analysis** terkontrol pada software yang sudah **cukup stabil**. **Set of Expectations** esensial: untuk aplikasi Web minimal perlu **expected load** (concurrent users/koneksi HTTP) dan **acceptable response time**.
> >
> > Setelah tahu target, **terus tingkatkan beban** sambil mencari bottleneck di berbagai level: **application** (profiler), **database** (query optimizer/profiler), **OS** (top, vmstat, iostat, PerfMon), dan **network** (tcpdump, protocol analyzer, netstat/ntop).
> >
> > ### Performance Tuning, Baseline, dan Benchmark
> >
> > Ketika kinerja tidak memenuhi target, dilakukan **tuning** mulai dari aplikasi dan database, lalu level lain: **Web cache** (Squid), publikasi halaman statis, **scale horizontal** via load balancing (Web farm & read-only DB), **scale vertikal** (tambah CPU/RAM/disk), dan menambah **network bandwidth**. Disiplin **one variable at a time** wajib agar perubahan tidak berinteraksi secara halus dan tetap dapat diulang. Bila lab tak dapat mereplikasi produksi, dipakai **staging environment** dengan ekspektasi **diskalakan turun**.
> >
> > ```mermaid
> > flowchart LR
> >     RUN["Run Load Test"] --> MEAS["Measure Performance"]
> >     MEAS --> TUNE["Tune System"]
> >     TUNE --> RUN
> >     MEAS --> BASE["Baseline<br/>(target tercapai)"]
> > ```
> >
> > Siklus diulang sampai target tercapai; titik itu menjadi **baseline** untuk regression test versi berikutnya. Tujuan lain adalah menetapkan **benchmark numbers** (mis. **TPC**).
> >
> > ### Load Testing (Volume & Longevity)
> >
> > **Load testing** melatih sistem dengan **tugas terbesar** yang dapat dioperasikannya — disebut juga **volume testing** (dokumen besar, job printer besar, ribuan mailbox; kasus khusus **zero-volume testing**) atau **longevity/endurance testing** (client loop terhadap server dalam waktu panjang). **Goals**: (1) mengungkap bug yang tak muncul sepintas seperti **memory leak** dan **buffer overflow**; (2) memverifikasi **performance baseline** pada beban maksimum. Beroperasi pada **predefined load level** (beban tertinggi yang masih dapat diterima) dan **tidak bertujuan merusak** sistem. Menuntut **dataset besar** agar bug skala besar tersingkap.
> >
> > **Performance vs Load** — performance testing menggunakan teknik/tools load testing untuk pengukuran/benchmark pada **berbagai level beban**, sedangkan load testing beroperasi pada **level beban tetap** sambil menjaga sistem berjalan mulus.
> >
> > ### Stress Testing
> >
> > **Stress testing** mencoba **merusak (break) sistem** dengan **membanjiri sumber dayanya** atau **mengambil sumber daya darinya** (kasus terakhir disebut **negative testing**). Tujuan utamanya memastikan sistem **gagal dan pulih secara anggun (fails and recovers gracefully)** — kualitas **recoverability**. Berbeda dari performance testing yang terkontrol dan repeatable, stress testing sengaja menimbulkan **chaos dan unpredictability**.
> >
> > Contoh teknik: **menggandakan** baseline concurrent users; mematikan/menyalakan port jaringan acak via **SNMP**; mengambil database **offline lalu restart**; **rebuild RAID** saat berjalan; menjalankan **proses pelahap sumber daya** (CPU/memory/disk/network). Yang diamati saat sistem gagal: apakah **menyimpan state** atau crash; **hang/freeze** atau fail gracefully; mampu **pulih dari last good state**; memberi **pesan error bermakna**; dan apakah **keamanan tetap terjaga** saat kegagalan tak terduga.

> [!cornell] #### Summary
>
> **System testing** dijalankan pada **sistem lengkap-terintegrasi** (software + hardware), termasuk **black-box**, dengan input dari komponen yang **lulus integration testing** dan posisi **tepat sebelum UAT**; pendekatannya **destruktif** dan menguji **sampai/melampaui batas**. Jenis non-fungsionalnya mencakup performance, load, stress, usability, dan security. **Performance testing** menghilangkan **bottleneck** dan menetapkan **baseline** lewat measurement/analysis terkontrol berbasis **set of expectations**, mencari bottleneck di level application/database/OS/network, lalu **tuning** dengan disiplin **one-variable-at-a-time** sering pada **staging** dan dibandingkan **benchmark (TPC)**. **Load testing** (alias **volume/longevity**) memberi sistem **tugas terbesar** pada **predefined load level** untuk mengungkap **memory leak/buffer overflow** dan memverifikasi baseline tanpa merusak, menuntut **dataset besar**. **Stress testing** sengaja **merusak** sistem (overwhelm/take away resources = **negative testing**) untuk memverifikasi **recoverability** — gagal & pulih anggun — dengan mengamati reaksi sistem terhadap kegagalan.

> [!ad-libitum]- Additional Information
>
> #### Black-box & Functional vs Non-Functional
>
> Teknik desain test case system testing: **equivalence partitioning**, **boundary value analysis** (cocok untuk "beyond the bounds"), **decision table**, dan **state transition** — berbasis spesifikasi tanpa melihat kode. System testing mencakup **functional** (fitur end-to-end) dan **non-functional** (lima jenis pada deck ini).
>
> #### Spektrum Pengujian Kinerja
>
> **Load** (beban normal-tinggi), **Stress** (melampaui kapasitas hingga titik patah), **Spike** (lonjakan mendadak), **Soak/Endurance** (beban berkelanjutan lama — deteksi memory leak), **Scalability** (kemampuan scale-up/out). Metrik kunci: response time (avg, p95, p99), throughput (TPS), concurrency, error rate, resource utilization.
>
> #### Tools & Pola Resiliensi
>
> - **Apache JMeter, Gatling, k6, Locust** — pembangkit beban; **New Relic, Dynatrace, AppDynamics** — APM/profiling
> - **Chaos Monkey/Simian Army, Gremlin, Litmus** — fault injection (Chaos Engineering memperluas stress testing ke produksi)
> - Pola recoverability: **graceful degradation, circuit breaker, retry with backoff, bulkhead, checkpoint/restart**
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat skrip JMeter untuk menentukan beban maksimum sebuah REST API dan tetapkan baseline-nya.
> 2. Lakukan soak test 12 jam dan amati tren memory untuk mendeteksi leak.
> 3. Lakukan fault injection mematikan database saat aplikasi berjalan dan amati apakah pemulihan anggun.
>
> #### Bacaan Lanjutan
>
> - Molyneaux, I. *The Art of Application Performance Testing*. O'Reilly.
> - Nygard, M. *Release It!: Design and Deploy Production-Ready Software*. Pragmatic Bookshelf.
> - Basiri, A. et al. *Chaos Engineering*. O'Reilly.
> - ISTQB Foundation — Test Levels: System Testing; Transaction Processing Performance Council (TPC) — tpc.org
