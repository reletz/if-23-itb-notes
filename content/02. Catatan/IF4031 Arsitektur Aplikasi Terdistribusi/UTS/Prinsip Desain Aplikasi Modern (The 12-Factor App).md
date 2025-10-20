---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Prinsip Desain Aplikasi Modern (The 12-Factor App)
> 
> > ## Questions/Cues
> > 
> > - Apa itu 12-Factor App?
> >     
> > - Mengapa metodologi ini penting?
> >     
> > - Apa saja 12 faktor tersebut?
> >     
> > - Bagaimana faktor **Codebase** berlaku?
> >     
> > - Mengapa **Dependencies** harus eksplisit?
> >     
> > - Di mana **Config** seharusnya disimpan?
> >     
> > - Bagaimana memperlakukan **Backing Services**?
> >     
> > - Apa beda **Build, Release, Run**?
> >     
> > - Mengapa **Processes** harus stateless?
> >     
> > - Bagaimana **Port Binding** bekerja?
> >     
> > - Apa model **Concurrency** yang ideal?
> >     
> > - Apa arti **Disposability**?
> >     
> > - Mengapa **Dev/prod parity** penting?
> >     
> > - Bagaimana seharusnya **Logs** dikelola?
> >     
> > - Bagaimana **Admin processes** dijalankan?
> >     
> > 
> > ## Reference Points
> > 
> > - 06-IF4031-05e-2024-Microservice.pdf (hlm. 11-13)
> >     
> > - https://12factor.net/
> >     
> 
> > ### Metodologi The 12-Factor App
> > 
> > The 12-Factor App adalah sebuah metodologi untuk membangun aplikasi _Software-as-a-Service_ (SaaS) yang modern, portabel, dan dapat diskalakan. Prinsip-prinsip ini dirancang untuk:
> > 
> > - Meminimalkan waktu dan biaya bagi pengembang baru untuk bergabung.
> >     
> > - Memaksimalkan portabilitas antar lingkungan eksekusi (development, staging, production).
> >     
> > - Cocok untuk _deployment_ di platform cloud modern.
> >     
> > - Memungkinkan _continuous deployment_ untuk agilitas maksimum.
> >     
> > - Dapat diskalakan tanpa perubahan besar pada arsitektur atau _tooling_.
> >     
> > 
> > Metodologi ini menjadi fondasi penting dalam merancang microservices yang andal.
> > 
> > ### 12 Faktor Aplikasi
> > 
> > #### I. Codebase: Satu codebase, banyak deploy
> > 
> > **Sebuah aplikasi selalu dilacak dalam satu codebase di bawah sistem kontrol versi (misalnya, Git)**. Meskipun bisa ada banyak deployment (misalnya, di lingkungan staging dan beberapa instance production), semuanya berasal dari codebase yang sama. Untuk microservices, setiap service adalah satu aplikasi dengan codebase-nya sendiri.
> > 
> > #### II. Dependencies: Deklarasikan dan isolasi dependensi secara eksplisit
> > 
> > **Aplikasi tidak boleh bergantung pada paket atau library yang ada secara implisit di sistem.** Semua dependensi harus dideklarasikan secara eksplisit melalui manifest (misalnya, requirements.txt di Python, pom.xml di Maven). Ini memastikan lingkungan yang konsisten dan dapat direproduksi di mana saja.
> > 
> > #### III. Config: Simpan konfigurasi di environment
> > 
> > **Konfigurasi yang bervariasi antar deployment (misalnya, kredensial database, API keys) harus disimpan dalam variabel lingkungan (environment variables), bukan di dalam kode.** Ini memisahkan kode dari konfigurasi, meningkatkan keamanan, dan memungkinkan satu build yang sama untuk di-deploy ke berbagai lingkungan hanya dengan mengubah variabelnya.
> > 
> > #### IV. Backing Services: Perlakukan layanan pendukung sebagai resource terpasang
> > 
> > **Setiap layanan eksternal yang dibutuhkan aplikasi (seperti database, message queue, atau layanan email) harus diperlakukan sebagai resource yang dapat "dipasang" dan "dilepas".** Aplikasi harus bisa beralih dari database lokal ke database cloud hanya dengan mengubah URL di config, tanpa mengubah kode.
> > 
> > #### V. Build, Release, Run: Pisahkan tahapan build, release, dan run secara tegas
> > 
> > - **Build:** Mengubah kode menjadi artifak yang dapat dieksekusi (missem, sebuah _container image_).
> >     
> > - **Release:** Menggabungkan artifak _build_ dengan _config_ dari lingkungan target. _Release_ ini bersifat _immutable_.
> >     
> > - **Run:** Menjalankan release di lingkungan eksekusi.
> >     
> >  Pemisahan ini memastikan setiap release memiliki ID unik dan memungkinkan rollback yang mudah ke versi sebelumnya.
> >     
> > 
> > #### VI. Processes: Jalankan aplikasi sebagai satu atau lebih proses stateless
> > 
> > **Proses aplikasi harus stateless dan tidak berbagi apa pun (share-nothing).** Setiap data yang perlu disimpan (state) harus dialihkan ke backing service yang sesuai (misalnya, database atau cache). Ini membuat aplikasi mudah untuk diskalakan secara horizontal dengan menambahkan lebih banyak proses.
> > 
> > #### VII. Port Binding: Ekspor layanan melalui port binding
> > 
> > **Aplikasi harus sepenuhnya mandiri dan tidak bergantung pada web server eksternal untuk dieksekusi.** Aplikasi harus mengekspos layanannya melalui sebuah port jaringan. Ini membuat layanan dapat menjadi backing service bagi aplikasi lain.
> > 
> > #### VIII. Concurrency: Skalakan melalui model proses
> > 
> > **Daripada membuat satu proses monolitik yang besar dan kuat (scaling up), aplikasi 12-faktor dirancang untuk diskalakan dengan menjalankan banyak proses kecil (scaling out).** Setiap proses menangani satu jenis pekerjaan, membuat sistem lebih andal dan mudah dikelola.
> > 
> > #### IX. Disposability: Maksimalkan ketahanan dengan startup cepat dan shutdown yang anggun
> > 
> > **Proses aplikasi harus "sekali pakai" (disposable), artinya dapat dimulai atau dihentikan kapan saja.** Ini penting untuk skalabilitas elastis, deployment cepat, dan pemulihan dari kegagalan. Proses harus startup dengan cepat dan shutdown dengan anggun (menyelesaikan tugas saat ini sebelum berhenti).
> > 
> > #### X. Dev/prod parity: Jaga lingkungan development, staging, dan production semirip mungkin
> > 
> > **Perbedaan kecil antara lingkungan development dan production dapat menyebabkan bug yang sulit ditemukan.** Tujuannya adalah menjaga ketiga lingkungan ini semirip mungkin dalam hal teknologi, backing services, dan infrastruktur untuk meminimalkan kejutan saat deployment.
> > 
> > #### XI. Logs: Perlakukan log sebagai event stream
> > 
> > **Aplikasi tidak seharusnya peduli tentang penyimpanan atau perutean output stream-nya. Ia hanya perlu menulis log ke stdout.** Lingkungan eksekusi (platform) kemudian bertanggung jawab untuk mengumpulkan, memproses, dan mengirimkan stream ini ke tujuan akhir (misalnya, layanan analisis log seperti ELK Stack).
> > 
> > #### XII. Admin processes: Jalankan tugas admin/manajemen sebagai proses sekali jalan
> > 
> > **Tugas-tugas administratif seperti migrasi database atau menjalankan skrip maintenance harus dijalankan sebagai proses terpisah dari proses utama aplikasi.** Kode untuk tugas ini harus dikirim bersama codebase aplikasi untuk menghindari masalah sinkronisasi.

> [!cornell] #### Summary
> 
> Metodologi 12-Factor App menyediakan serangkaian prinsip desain fundamental untuk membangun aplikasi cloud-native yang andal, portabel, dan dapat diskalakan. Dengan memisahkan secara tegas antara codebase, dependensi, dan konfigurasi; memperlakukan layanan pendukung sebagai sumber daya yang dapat ditukar; serta merancang proses yang stateless dan disposable, metodologi ini secara langsung mendukung arsitektur microservices dengan memungkinkan setiap service untuk dikembangkan, di-deploy, dan diskalakan secara independen dan konsisten di berbagai lingkungan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Faktor III: Manajemen Konfigurasi
> 
> Menyimpan konfigurasi di _environment variables_ (env vars) adalah praktik dasar. Namun, pada skala besar, mengelola env vars bisa menjadi rumit. Solusi tingkat lanjut meliputi:
> 
> - **Configuration Server:** Sebuah layanan terpusat (seperti Spring Cloud Config, Consul, atau etcd) yang menyediakan konfigurasi untuk semua microservice. Aplikasi akan mengambil konfigurasinya dari server ini saat startup. Keuntungannya adalah manajemen terpusat dan kemampuan untuk mengubah konfigurasi tanpa me-restart aplikasi.
>     
> - **Secret Management:** Untuk data sensitif seperti API keys dan password, menyimpannya di env vars biasa tidak aman. Tools seperti **HashiCorp Vault** atau **AWS Secrets Manager** menyediakan penyimpanan terenkripsi, kontrol akses yang ketat, dan kemampuan untuk merotasi kredensial secara otomatis.
>     
> 
> #### Pendalaman Faktor VI: Statelessness dan Implikasinya
> 
> Konsep _stateless_ sangat krusial. Jika sebuah microservice menyimpan data di memori lokal (misalnya, data sesi pengguna), maka permintaan berikutnya dari pengguna yang sama harus diarahkan ke _instance_ yang sama persis. Ini menciptakan "sticky sessions" dan merusak kemampuan untuk menyeimbangkan beban (_load balancing_) dan melakukan _auto-scaling_ secara efektif. Dengan memindahkan _state_ ke _backing service_ eksternal (seperti Redis untuk cache sesi atau database untuk data persisten), setiap _instance_ microservice menjadi identik dan dapat dipertukarkan. Setiap permintaan dapat dilayani oleh _instance_ mana pun, memberikan elastisitas dan ketahanan yang sejati.