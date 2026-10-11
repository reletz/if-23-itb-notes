---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Forensik Cloud-Native - Contain, Preserve, dan Timeline
>
> > ## Questions/Cues
> >
> > - Apa prinsip proses forensik yang harus dijaga?
> > - Mengapa bukti pada container mudah hilang dan apa urutannya?
> > - Bagaimana cara mengisolasi pod tanpa menghancurkan bukti?
> > - Di mana saja bukti cloud-native berada?
> > - Apa isi laporan forensik yang baik?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud Malware Forensics Practices (Slides 22-30)
>
> > ### Proses dan Prinsip
> >
> > - **Jangan ubah bukti asli**; bekerja pada salinan.
> > - **Dokumentasikan setiap tindakan** dan **hash** semuanya.
> > - Jaga **chain of custody**: siapa, apa, kapan, mengapa (lihat [[Bukti Digital, Prinsip Forensik, dan Best Practices]]).
> >
> > ### Twist Cloud-Native: Bukti Menghilang
> >
> > Container bersifat **efemeral**: jika pod restart, bukti dapat lenyap. Maka **kumpulkan yang paling volatil lebih dulu** dan **lakukan containment tanpa menghancurkan** bukti.
> >
> > ### Contain, lalu Preserve
> >
> > ```bash
> > # Keluarkan pod dari layanan tetapi biarkan hidup
> > kubectl label pod bad-pod quarantine=true --overwrite
> > kubectl cordon <node>        # cegah pod baru mendarat di node ini
> >
> > # Simpan state dan log
> > kubectl get pod bad-pod -o yaml > pod.yaml
> > kubectl logs bad-pod --all-containers > pod.log
> > kubectl cp bad-pod:/tmp ./evidence-tmp
> >
> > # Hash dan catat
> > sha256sum pod.yaml pod.log
> > ```
> >
> > Pasangkan dengan NetworkPolicy **deny-all** pada label karantina.
> >
> > ### Lokasi Bukti
> >
> > | Sumber | Informasi |
> > |---|---|
> > | **Kubernetes audit log** | Siapa memanggil API: pembuatan pod, pembacaan secret, perubahan RBAC |
> > | **Container runtime logs** | Proses start, image pull |
> > | **Disk node** (`/var/lib/containerd`, `/var/log`) | Layer container, file yang dijatuhkan |
> > | **auth.log, shell history** | Login dan perintah di node |
> > | **Cloud audit logs** | Pemakaian IAM, panggilan API, akses storage |
> > | **Network/flow logs** | Koneksi ke mining pool atau C2 |
> > | **Memory image** | Proses berjalan, kode terinjeksi, koneksi hidup |
> >
> > ### Membangun Timeline
> >
> > Korelasikan semua sumber menjadi satu cerita memakai **Plaso/Timesketch**, **Autopsy**, atau spreadsheet.
> >
> > ```mermaid
> > flowchart LR
> >     A["Audit log:<br/>pod dibuat"] --> B["Runtime log:<br/>image pull"] --> C["Node disk:<br/>file dijatuhkan"] --> D["Flow log:<br/>koneksi pool"] --> E["Cloud audit:<br/>biaya naik"]
> > ```
> >
> > ### Pelaporan
> >
> > Pertanyaan dan kesimpulan dalam bahasa sederhana; **daftar bukti** dengan hash dan log custody; **metode dan versi tool** (dapat diulang pemeriksa lain); temuan terkait artefak dan timestamp spesifik; **keterbatasan** (apa yang tidak dapat ditentukan). **Pisahkan fakta dari opini.**
> >
> > ### Latihan Mandiri: Replay the Case
> >
> > Di lab terisolasi (kind/minikube, FLARE-VM/REMnux, snapshot aktif): (A) deploy weak pod, daftar kelemahan, pindai dengan Trivy, perbaiki tiga teratas, tambahkan default-deny dan verifikasi dengan curl; (B) analisis sampel pelatihan, ekstrak 5 IOC, tulis aturan YARA/Sigma; (C) latihan dengan image publik (NIST CFReDS), verifikasi hash, buat timeline 10 peristiwa; *stretch*: Kubernetes Goat. **Deliverable**: laporan insiden singkat (root cause, perilaku malware, timeline, rekomendasi).

> [!cornell] #### Summary
>
> Forensik cloud-native mempertahankan prinsip klasik (jangan ubah bukti, dokumentasikan dan hash, chain of custody) tetapi harus mengakomodasi **sifat efemeral container**: kumpulkan yang paling volatil dulu dan **contain tanpa menghancurkan** (label karantina, cordon, simpan YAML/log/file, hash, deny-all NetworkPolicy). Bukti tersebar di audit log Kubernetes, log runtime, disk node, cloud audit, flow log, dan memori; dikorelasikan menjadi **timeline** dan dilaporkan dengan metode yang dapat diulang serta memisahkan fakta dari opini.

> [!ad-libitum]- Additional Information
>
> #### Teknik Lanjutan
>
> **Checkpoint container** (CRIU, `kubectl debug` dengan *ephemeral container*) dapat menangkap proses hidup; **Falco** dan **Tetragon** merekam event runtime untuk forensik setelah pod hilang. Akuisisi memori mengikuti [[Incident Response dan Memory Forensics]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Sebarkan Kubernetes Goat, lakukan satu serangan, lalu susun timeline dari audit log dan log runtime beserta hash bukti.
>
> #### Bacaan Lanjutan
> - NIST SP 800-86, ISO/IEC 27037.
> - Plaso (log2timeline) dan Timesketch documentation.
