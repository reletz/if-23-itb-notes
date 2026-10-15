---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Containerization - Containers, VMs and Migration
>
> > ## Questions/Cues
> >
> > - Apa itu container dan mengapa dinamai demikian?
> > - Apa beda container dan virtual machine?
> > - Bagaimana image layer dan build cache bekerja?
> > - Bagaimana alur build dan deploy container?
> > - Aplikasi seperti apa yang layak di-containerize dan bagaimana migrasinya?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps (Slides 8-18)
> > - IF4054 Foundations & Architecture (Slides 28-31)
>
> > ### Apa Itu Container?
> >
> > Container dirancang menyelesaikan masalah arsitektur komputer yang paling kritis: menjalankan **perangkat lunak terdistribusi yang andal dengan skalabilitas hampir tak terbatas di lingkungan komputasi apa pun**. Slogannya **package once, deploy anywhere**.
> >
> > Namanya berasal dari **shipping container**: barang berpindah antar geografi dengan beragam moda transportasi, bongkar-muat berulang, yang menaikkan biaya dan merepotkan penanganan; kontainer standar menyelesaikannya. Secara teknis, container membungkus aplikasi beserta kode, runtime, library, dan system tools ke satu artefak, memakai **isolasi tingkat OS** (namespaces dan cgroups di Linux) alih-alih memvirtualisasi hardware.
> >
> > ### Container vs Virtual Machine
> >
> > | Aspek | Container | Virtual Machine |
> > |---|---|---|
> > | Isolasi | Berbagi kernel host, isolasi tingkat proses | Memvirtualisasi hardware, guest OS penuh |
> > | Ukuran | Megabyte | Gigabyte |
> > | Waktu start | Milidetik hingga beberapa detik | Puluhan detik hingga menit |
> > | Cocok untuk | Microservice kecil dan disposable | Saat butuh kernel/OS yang benar-benar berbeda |
> >
> > ### Image Layers dan Build Cache
> >
> > Image bersifat **immutable** dan dibangun berlapis; container adalah instance yang berjalan dengan lapisan tulis tipis di atasnya.
> >
> > ```mermaid
> > flowchart TB
> >     L1["Base image<br/>FROM python:3.12-slim"] --> L2["Dependencies<br/>COPY requirements.txt + install"]
> >     L2 --> L3["App code<br/>COPY . ."]
> >     L3 --> L4["Entrypoint<br/>CMD"]
> > ```
> >
> > Dependency disalin dan di-install **sebelum** kode aplikasi agar lapisan dependency tetap ter-*cache* saat kode berubah.
> >
> > ### Mengatasi "Works on My Machine"
> >
> > Tanpa container, aplikasi jalan lokal tetapi gagal di CI karena versi paket OS berbeda. Dengan Dockerfile, lingkungan yang sama didefinisikan sekali di version control; lokal, CI, dan produksi menjalankan **image reproducible yang identik**.
> >
> > ### Container dan DevOps
> >
> > Keduanya **saling melengkapi**: container memberi enkapsulasi infrastruktur, portabilitas, skalabilitas, dan agility untuk delivery yang cepat dan efisien. Alur build-deploy:
> >
> > 1. Tulis aplikasi dalam bahasa apa pun.
> > 2. Buat **Dockerfile** (instalasi dependency dan konfigurasi lingkungan).
> > 3. Build image, jalankan, dan **unit test** aplikasi di dalam container.
> > 4. **Push** image ke registry (mis. DockerHub).
> > 5. Buat container dari image dan jalankan di **cluster**.
> >
> > ### Migrasi VM ke Container
> >
> > Tahapan: **Discovery** (bagian-bagian aplikasi) → **assessment** kelayakan containerize → definisikan scope dan tujuan → desain infrastruktur container → containerize → testing → deploy dan rollout. Pertanyaan asesmen: apakah lebih baik memecah aplikasi? aspek mana yang bisa diselesaikan? apa risikonya dan prinsip migrasinya?
> >
> > **Kriteria aplikasi yang baik untuk di-containerize**: *stateless*, kohesi tinggi, microservice, gaya *API-first*, sering diperbarui, kompatibel dengan teknologi container, dependency dan konfigurasi yang terdefinisi jelas (eksternal), serta direncanakan berjalan di lingkungan homogen. Sebaliknya, aplikasi sebaiknya **tidak** dikelola tim khusus atau oleh banyak tim sekaligus.

> [!cornell] #### Summary
>
> **Container** membungkus aplikasi dan seluruh dependency-nya ke satu image **immutable berlapis** dengan isolasi tingkat OS, sehingga lebih ringan dan cepat daripada **VM** yang memvirtualisasi hardware. Image dibangun lewat **Dockerfile**, di-push ke registry, dan dijalankan di cluster, sehingga menyelesaikan *works on my machine*. Container dan DevOps saling melengkapi; migrasi VM ke container perlu **asesmen kelayakan** (stateless, kohesi tinggi, dependency eksplisit, API-first).

> [!ad-libitum]- Additional Information
>
> #### Kapan Tetap Memakai VM
>
> VM tetap relevan untuk workload yang butuh kernel berbeda, isolasi kuat antar-tenant (multi-tenancy tak tepercaya), atau sistem legacy. Teknologi seperti **Kata Containers** dan **Firecracker** menggabungkan kecepatan container dengan isolasi ala VM.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bandingkan ukuran image dan waktu start untuk `python:3.12` vs `python:3.12-slim` vs multi-stage build pada aplikasi yang sama.
>
> #### Bacaan Lanjutan
> - Docker Docs — *Best practices for writing Dockerfiles*.
> - Liz Rice — *Container Security*.
