---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Container Best Practices - Security, Performance and Observability
>
> > ## Questions/Cues
> >
> > - Apa praktik terbaik keamanan container?
> > - Bagaimana mengoptimalkan performa container?
> > - Apa tujuan dan tantangan monitoring?
> > - Bagaimana logging dan monitoring container sebaiknya dilakukan?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps (Slides 19-28)
>
> > ### Ringkasan Praktik Umum
> >
> > Pecah aplikasi menjadi microservice, buat Dockerfile per layanan, optimalkan ukuran image, gunakan **build automation tool**, kelola siklus hidup container, terapkan praktik keamanan, **monitor dan log** container, dan pertimbangkan teknologi cloud-native.
> >
> > ### Keamanan
> >
> > | Praktik | Alasan |
> > |---|---|
> > | **Minimal base image** | Mengurangi attack surface |
> > | **Scan image berkala** | Mendeteksi vulnerability yang diketahui |
> > | **Least privilege** | Jangan jalankan sebagai root; batasi akses sumber daya sensitif |
> > | **Immutable infrastructure** | Image tidak diubah setelah deploy; ubahan = image baru |
> > | **TLS antar-container** | Enkripsi komunikasi |
> > | **Update dan patch rutin** | Menutup celah keamanan |
> > | **Network segmentation** | Membatasi dampak container yang terkompromi |
> > | **Monitor dan log aktivitas** | Deteksi aktivitas mencurigakan secara real-time |
> > | **Digital signature** | Verifikasi keaslian dan integritas image |
> > | **Amankan registry** | Access control dan scan image di registry |
> >
> > ### Performa
> >
> > - **Pilih base image yang tepat** dan jaga container tetap ringan (**multi-stage build** memisahkan lingkungan build dari runtime).
> > - **Optimalkan alokasi sumber daya**: resource *requests* dan *limits* CPU/memori (mis. di Kubernetes).
> > - Gunakan **storage efisien** (lokal untuk data sementara, persisten untuk data kritis) dan **caching** (Redis/Memcached).
> > - **Monitor dan analisis** dengan Prometheus, Grafana, atau Datadog; optimalkan jaringan; pakai **orchestration** (Kubernetes, Docker Swarm); terapkan **health checks**.
> >
> > ### Tujuan dan Tantangan Monitoring
> >
> > Tujuan utama monitoring performa:
> >
> > 1. Mengidentifikasi kegagalan dan faultnya saat runtime dan pada postmortem.
> > 2. Mengidentifikasi masalah performa sistem individual maupun kumpulan sistem yang berinteraksi.
> > 3. Mengkarakterisasi workload untuk **capacity planning** dan penagihan.
> > 4. Mengukur reaksi pengguna terhadap antarmuka atau penawaran bisnis.
> > 5. Mendeteksi penyusup.
> >
> > Tantangannya: monitoring di tengah **perubahan kontinu**, pendekatan bottom-up vs top-down di cloud, monitoring arsitektur microservice, dan volume besar **log terdistribusi**.
> >
> > ### Logging dan Monitoring
> >
> > ```mermaid
> > flowchart TD
> >     C["Container<br/>stdout, structured JSON"] --> L["Log aggregator<br/>ELK atau Fluentd"]
> >     C --> M["Metrics<br/>Prometheus"]
> >     M --> G["Grafana<br/>dashboard"]
> >     M --> A["Alert<br/>threshold breach"]
> >     L --> G
> > ```
> >
> > - **Logging**: centralize log (ELK, Fluentd), **structured logging** (JSON), level log yang tepat (INFO/WARN/ERROR), amankan log (akses, signing, enkripsi), pantau volume (rotation, retention), integrasikan dengan tools monitoring.
> > - **Monitoring**: tools komprehensif, **key metrics** (CPU, memori, throughput jaringan, latensi), **alert dan notifikasi**, **health checks** (liveness dan readiness probe di Kubernetes), dan **otomasi** monitoring.

> [!cornell] #### Summary
>
> Praktik terbaik container mencakup **keamanan** (minimal image, scan, least privilege, immutable, TLS, segmentasi, signature, registry aman), **performa** (image ringan, multi-stage build, resource limits, caching, orchestration, health check), serta **observability** (centralized dan structured logging, metrik kunci, alert, liveness/readiness probe). Tujuan monitoring meliputi deteksi kegagalan, masalah performa, capacity planning, reaksi pengguna, dan penyusup, dengan tantangan perubahan kontinu, microservice, dan volume log terdistribusi.

> [!ad-libitum]- Additional Information
>
> #### Tiga Pilar Observability
>
> **Logs, metrics, dan traces** (mis. OpenTelemetry, Jaeger) adalah tiga sinyal observability. Slide membahas dua yang pertama; *distributed tracing* penting ketika permintaan melintasi banyak microservice.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun image multi-stage untuk aplikasi Anda, jalankan sebagai non-root, scan dengan Trivy, dan tambahkan HEALTHCHECK.
>
> #### Bacaan Lanjutan
> - CIS Docker Benchmark.
> - Google SRE Book — Bab *Monitoring Distributed Systems*.
