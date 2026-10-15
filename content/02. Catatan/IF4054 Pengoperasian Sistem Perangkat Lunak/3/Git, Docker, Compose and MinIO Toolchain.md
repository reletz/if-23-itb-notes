---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Git, Docker, Compose and MinIO Toolchain
>
> > ## Questions/Cues
> >
> > - Mengapa Git memenuhi Faktor I 12-factor?
> > - Apa strategi branching yang dipakai di kuliah ini?
> > - Bagaimana Dockerfile dan Docker Compose bekerja?
> > - Mengapa MinIO dipakai sebagai pengganti cloud storage di development?
> > - Apa deliverable milestone minggu ini?
> >
> > ## Reference Points
> >
> > - IF4054 Foundations & Architecture (Slides 32-42)
>
> > ### Git: Fondasi Version Control Terdistribusi
> >
> > - Setiap clone adalah **salinan penuh riwayat** repositori; tidak ada single point of failure seperti VCS terpusat.
> > - Commit membentuk **directed graph**; branch hanyalah pointer ringan yang dapat dipindah.
> > - Memenuhi **Faktor I**: satu codebase di version control dengan banyak deploy.
> >
> > **Strategi branching kuliah**: `main` (selalu deployable) → `feature/*` (berumur pendek, satu milestone) → **Pull Request** (review + CI) → **Merge** (squash ke main).
> >
> > ### Docker: Image, Container, Dockerfile
> >
> > - **Dockerfile** adalah resep deklaratif: base image, dependency, kode aplikasi, dan perintah menjalankan; dibaca dari atas ke bawah.
> > - `docker build` mengubah Dockerfile menjadi image; `docker run` menjalankan container.
> > - Image diberi **tag** (`myapp:1.4.0`) dan dapat di-push/pull dari registry.
> > - **Multi-stage build** membuang tooling khusus build dari artefak akhir.
> >
> > Contoh Dockerfile minimal pada slide: `FROM python:3.12-slim` → `WORKDIR /app` → `COPY requirements.txt .` → `RUN pip install --no-cache-dir -r requirements.txt` → `COPY . .` → `EXPOSE 8000` → `CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`. Dependency di-install sebelum kode agar layer ter-cache; `EXPOSE` mendokumentasikan port (Faktor VII).
> >
> > ### Docker Compose
> >
> > Satu file `docker-compose.yml` menjalankan layanan **beserta backing service**-nya (api, `postgres:16`, `minio/minio`). Ini mencerminkan **Faktor IV** (backing service sebagai attached resource) dan memberi setiap anggota tim **lingkungan lokal yang identik**, yaitu wujud nyata "reproducible environment".
> >
> > ### MinIO: Object Storage Kompatibel S3
> >
> > MinIO adalah object store open-source yang mengimplementasikan **API S3**; kode yang ditulis untuk S3 berjalan tanpa perubahan. Ia dapat berjalan di laptop, CI runner, atau cluster Kubernetes lokal.
> >
> > | Cloud object storage | MinIO (lokal) |
> > |---|---|
> > | Butuh kredensial cloud dan jaringan | Berjalan offline dalam container |
> > | Biaya per developer per environment | Gratis dan disposable |
> > | Sulit di-reset ke kondisi bersih | Reset dengan satu perintah |
> > | Feedback loop lebih lambat | Cepat; API tetap kompatibel S3 |
> >
> > Di produksi, aplikasi yang sama diarahkan ke cloud storage hanya lewat **config** (Faktor III).
> >
> > ### Arsitektur dan Milestone
> >
> > ```mermaid
> > flowchart TD
> >     G["Git repo<br/>main + feature/*"] --> D["Dockerfile<br/>build reproducible"]
> >     D --> C["Compose stack<br/>service + MinIO"]
> >     C --> A["Container API<br/>12-factor, stateless"]
> > ```
> >
> > **Milestone: Scaffold and Containerize** — definisikan batas business capability pertama, scaffold repositori microservice dengan konvensi branching, dan containerize API sesuai 12-factor. **Deliverable**: `docker compose up` yang menjalankan layanan dan MinIO bersamaan, dengan seluruh config dibaca dari environment variable.

> [!cornell] #### Summary
>
> **Git** (terdistribusi, branch ringan, `main` → `feature/*` → PR → squash merge) memenuhi Faktor I. **Docker** membangun image reproducible dari Dockerfile (dependency sebelum kode untuk cache, multi-stage untuk ukuran kecil), dan **Docker Compose** menjalankan layanan beserta backing service secara identik bagi semua anggota tim. **MinIO** menyediakan object storage kompatibel S3 yang gratis, offline, dan disposable untuk development, dengan transisi ke cloud hanya lewat config. Milestone-nya: `docker compose up` yang menjalankan service dan MinIO dengan config dari environment variable.

> [!ad-libitum]- Additional Information
>
> #### Praktik Tambahan Dockerfile
>
> Gunakan `.dockerignore`, pin versi base image (hindari `latest`), jalankan sebagai user non-root, dan simpan `.env` di luar Git. Untuk Compose, gunakan **healthcheck** pada `depends_on` agar layanan menunggu dependency benar-benar siap.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat stack Compose berisi API FastAPI + MinIO, simpan dan baca satu file lewat SDK `boto3` yang diarahkan ke MinIO, lalu ganti endpoint hanya lewat env var.
>
> #### Bacaan Lanjutan
> - Docker Docs — *Compose file reference*.
> - MinIO Docs — *Python Client Quickstart*.
