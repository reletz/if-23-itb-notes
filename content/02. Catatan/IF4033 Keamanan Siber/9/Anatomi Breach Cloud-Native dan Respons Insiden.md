---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Anatomi Breach Cloud-Native dan Respons Insiden
>
> > ## Questions/Cues
> >
> > - Bagaimana alur kasus "The cluster that worked for someone else"?
> > - Apa yang membuat cloud-native berbeda dan apa itu model 4C?
> > - Kelemahan apa pada weak pod dan bagaimana hardened pod memperbaikinya?
> > - Bagaimana RBAC, NetworkPolicy, dan supply chain menutup celah?
> > - Apa isi defence checklist?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud Malware Forensics Practices (Slides 2-13)
> > - IF4033 Cloud Malware Forensics Practices (Slides 31-35)
>
> > ### Kasus
> >
> > Aplikasi internet-facing berjalan di **Kubernetes**. Beberapa minggu kemudian biaya cloud melonjak dan sebuah node melambat. Tim keamanan dipanggil. Kasus diikuti dari awal sampai akhir dalam tiga bagian: **Part 1 bagaimana mereka masuk**, **Part 2 apa yang mereka jalankan** ([[Analisis Malware Aman, Perilaku, dan Deteksi]]), **Part 3 apa yang dapat dibuktikan** ([[Forensik Cloud-Native - Contain, Preserve, dan Timeline]]), lalu *closing the loop*.
> >
> > ### Apa yang Berbeda pada Cloud-Native
> >
> > | Tradisional | Cloud-native |
> > |---|---|
> > | Server berumur panjang | Container efemeral |
> > | Firewall perimeter | Kontrol identitas dan level workload |
> > | Patch manual | Rebuild dan redeploy image |
> > | Log di host | Log tersebar di pod dan node |
> >
> > Lebih banyak bagian bergerak berarti *attack surface* lebih besar, dan kesalahan **tersalin pada skala besar**.
> >
> > ### Model 4C
> >
> > Kelemahan pada lapisan luar merusak semua yang di dalam:
> >
> > ```mermaid
> > flowchart TB
> >     CL["Cloud"] --> CLU["Cluster"] --> CON["Container"] --> CODE["Code"]
> > ```
> >
> > ### Weak Pod vs Hardened Pod
> >
> > Weak pod: `hostNetwork: true`, `privileged: true`, image `myapp:latest`, password hardcoded (`DB_PASSWORD: "P@ssw0rd123"`), tanpa resource limit.
> >
> > Hardened pod:
> >
> > | Kontrol | Nilai |
> > |---|---|
> > | Service account token | `automountServiceAccountToken: false` |
> > | Image | Dipin dengan digest `@sha256:<digest>` |
> > | Security context | `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `readOnlyRootFilesystem: true`, `capabilities.drop: ["ALL"]` |
> > | Resource | `limits: cpu 500m, memory 256Mi` |
> > | Secrets | `envFrom: secretRef` (bukan hardcode) |
> >
> > ### Least Privilege: RBAC dan Network
> >
> > **RBAC**: hindari `cluster-admin` dan wildcard; pakai role ber-namespace dengan verb seperlunya. **Network**: secara default setiap pod dapat menjangkau semua pod, maka mulai dari **default-deny** NetworkPolicy (Ingress dan Egress). *Default-deny egress* akan memblokir miner menjangkau pool-nya.
> >
> > ### Supply Chain dan Pipeline
> >
> > Dependensi rentan pada kasus ini seharusnya tertangkap di langkah **scan** pipeline (lihat [[State, Provisioning, dan Supply Chain pada Cloud-Native]]).
> >
> > ### Closing the Loop dan Defence Checklist
> >
> > Pelajaran dari insiden dimasukkan kembali ke pertahanan:
> >
> > - Image scanning dan **signed images** di pipeline.
> > - Pod **non-root** tanpa privilege; **RBAC least-privilege**.
> > - **Default-deny** network policy termasuk egress.
> > - **Audit logging** dikirim ke luar cluster.
> > - **Runtime detection** (mis. Falco) dan playbook *contain, then preserve*.
> > - **IR dan forensic readiness** yang diuji.

> [!cornell] #### Summary
>
> Kasus breach cloud-native menunjukkan bagaimana pod lemah (privileged, hostNetwork, tag `:latest`, secret hardcode, tanpa limit), RBAC longgar, jaringan datar, dan dependensi rentan membuka jalan penyerang. Model **4C** (Cloud, Cluster, Container, Code) menegaskan bahwa kelemahan lapisan luar merusak lapisan dalam. Perbaikan: **hardened pod**, **RBAC least privilege**, **default-deny NetworkPolicy** (termasuk egress), **supply chain scanning/signing**, audit log off-cluster, runtime detection, dan IR yang teruji.

> [!ad-libitum]- Additional Information
>
> #### Rujukan Praktik
>
> **Pod Security Standards (restricted)**, **CIS Kubernetes Benchmark**, dan **OWASP Kubernetes Top 10** menyediakan daftar periksa konfigurasi; **Kubernetes Goat** dan **kube-hunter/kubescape** untuk latihan dan audit. Padanan konsep di sisi desain: [[Prinsip Cloud-Native - Lima Pilar Arsitektur Aman]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Deploy weak pod pada kind/minikube, jalankan `trivy config` dan `kubescape scan`, lalu perbaiki hingga lolos profil *restricted*.
>
> #### Bacaan Lanjutan
> - NIST SP 800-190, CIS Kubernetes Benchmark.
> - OWASP Kubernetes Top 10.
