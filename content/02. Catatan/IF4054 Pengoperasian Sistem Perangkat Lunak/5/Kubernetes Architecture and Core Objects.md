---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Kubernetes Architecture and Core Objects
>
> > ## Questions/Cues
> >
> > - Apa komponen control plane dan worker node?
> > - Apa fungsi Pod, Deployment, dan Service?
> > - Apa beda Kind dan Minikube untuk development?
> >
> > ## Reference Points
> >
> > - IF4054 IaC & Cluster Security (Slides 20-22)
>
> > ### Arsitektur Kubernetes
> >
> > ```mermaid
> > flowchart TB
> >     U["kubectl<br/>HTTP request"] --> API
> >     subgraph CP["Control plane"]
> >         API["API server<br/>front door"]
> >         SCH["Scheduler<br/>placement"]
> >         ETCD["etcd<br/>source of truth"]
> >         API --- SCH
> >         API --- ETCD
> >     end
> >     subgraph W["Worker nodes"]
> >         K1["kubelet + container"]
> >         K2["kubelet + container"]
> >     end
> >     API --- K1
> >     API --- K2
> > ```
> >
> > - **Control plane** adalah otak cluster: **API server** (pintu depan), **scheduler** (menentukan penempatan), dan **etcd** (sumber kebenaran).
> > - **Worker node** menjalankan workload; **kubelet** pada tiap node berbicara dengan control plane dan mengelola container secara lokal.
> > - Setiap perintah `kubectl` hanyalah **HTTP request ke API server**, satu-satunya komponen yang dipercaya semua bagian lain. Seluruh materi RBAC, admission control, dan scheduling terhubung ke arsitektur ini.
> >
> > ### Objek Inti
> >
> > | Objek | Fungsi |
> > |---|---|
> > | **Pod** | Unit deploy terkecil; biasanya satu container dengan identitas jaringan stabil |
> > | **Deployment** | Mendeklarasikan "saya ingin N replika pod" dan merekonsiliasi realita agar sesuai |
> > | **Service** | Alamat jaringan stabil di depan sekumpulan pod yang berubah; pemanggil tak perlu melacak IP pod |
> >
> > Ketiganya menyatakan ide deklaratif yang sama seperti Terraform satu lapis di atas: **deskripsikan desired state, biarkan controller konvergen**.
> >
> > ### Kind vs Minikube
> >
> > | | Kind (Kubernetes in Docker) | Minikube |
> > |---|---|---|
> > | Cara kerja | Node cluster sebagai container Docker | VM (atau container) sebagai cluster single-node |
> > | Kekuatan | Cepat dan ringan; cocok di **CI** (cluster sekali pakai); multi-node mudah | Driver luas (VirtualBox, Hyper-V, Docker); **addon** kaya (dashboard, ingress, metrics) |

> [!cornell] #### Summary
>
> Kubernetes terdiri atas **control plane** (API server, scheduler, etcd) dan **worker node** (kubelet) di mana semua interaksi `kubectl` melewati **API server**. Tiga objek inti — **Pod, Deployment, Service** — mengekspresikan desired state yang direkonsiliasi controller. Untuk development lokal, **Kind** unggul di CI dan topologi multi-node, sedangkan **Minikube** unggul pada dukungan driver dan addon bawaan.

> [!ad-libitum]- Additional Information
>
> #### Objek Lain yang Perlu Dikenal
>
> **Namespace** (isolasi logis), **ConfigMap/Secret** (konfigurasi), **Ingress** (routing HTTP eksternal), **StatefulSet** (workload stateful), dan **HorizontalPodAutoscaler** (skala otomatis). Semuanya mengikuti pola deklaratif yang sama.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat cluster dengan `kind create cluster`, deploy 3 replika sebuah image, hapus satu pod secara manual, dan amati Deployment membuat penggantinya.
>
> #### Bacaan Lanjutan
> - Kubernetes Docs — *Concepts: Cluster Architecture*.
> - Burns, Beda, Hightower — *Kubernetes: Up and Running*.
