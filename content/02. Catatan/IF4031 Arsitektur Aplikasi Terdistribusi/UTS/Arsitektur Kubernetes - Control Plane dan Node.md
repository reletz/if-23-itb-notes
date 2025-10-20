---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Arsitektur Kubernetes: Control Plane dan Node
> 
> > ## Questions/Cues
> > 
> > - Apa arsitektur umum K8s?
> >     
> > - Apa itu **Control Plane**?
> >     
> > - Apa fungsi `kube-apiserver`?
> >     
> > - Apa fungsi `etcd`?
> >     
> > - Apa tugas `kube-scheduler`?
> >     
> > - Apa itu `kube-controller-manager`?
> >     
> > - Apa itu **Node**?
> >     
> > - Apa tugas `kubelet`?
> >     
> > - Apa fungsi `kube-proxy`?
> >     
> > - Apa itu `container runtime`?
> >     
> > - Apa saja _Addons_ umum?
> >     
> > 
> > ## Reference Points
> > 
> > - 25-extra-IF4031-24-2024-Kubernetes.pdf (hlm. 10-18)
> >     
> 
> > ### Arsitektur Umum Kubernetes
> > 
> > Sebuah _cluster_ Kubernetes terdiri dari dua jenis komponen utama: **Control Plane** dan **Node**.
> > 
> > - **Control Plane:** Bertindak sebagai "otak" dari _cluster_. Ia membuat keputusan global tentang _cluster_ (misalnya, penjadwalan) serta mendeteksi dan merespons peristiwa di _cluster_.
> >     
> > - **Node:** Mesin pekerja (VM atau fisik) di mana kontainer aplikasi sebenarnya dijalankan. Setiap _node_ dikelola oleh _Control Plane_.
> >     
> > 
> > ### Komponen Control Plane
> > 
> > Komponen-komponen ini bisa berjalan di satu mesin (_master node_) atau direplikasi untuk ketersediaan tinggi (_high availability_).
> > 
> > #### 1. `kube-apiserver`
> > 
> > Ini adalah "pintu gerbang" ke Control Plane. Semua komunikasi, baik dari pengguna (melalui kubectl), komponen cluster lain, atau aplikasi eksternal, harus melewati API server. Ia mengekspos Kubernetes API dan bertanggung jawab untuk memvalidasi dan memproses permintaan.
> > 
> > #### 2. `etcd`
> > 
> > Sebuah key-value store terdistribusi yang konsisten dan memiliki ketersediaan tinggi. etcd digunakan sebagai "sumber kebenaran" tunggal untuk menyimpan semua data dan konfigurasi cluster Kubernetes, termasuk state dari setiap objek.
> > 
> > #### 3. `kube-scheduler`
> > 
> > Komponen ini bertugas untuk menjadwalkan Pod. Ia memonitor Pod yang baru dibuat dan belum dialokasikan ke node manapun. Berdasarkan kebutuhan sumber daya Pod (CPU, memori), constraints, dan kebijakan lainnya, scheduler akan memilih node terbaik bagi Pod tersebut untuk dijalankan.
> > 
> > #### 4. `kube-controller-manager`
> > 
> > Ini adalah komponen yang menjalankan berbagai proses controller. Secara logis, setiap controller adalah proses terpisah, tetapi untuk mengurangi kompleksitas, mereka semua dikompilasi menjadi satu biner dan berjalan sebagai satu proses. Beberapa controller penting:
> > 
> > - **Node Controller:** Memonitor kesehatan _node_ dan bereaksi jika _node_ mati.
> >     
> > - **Job Controller:** Menjalankan tugas-tugas sekali jalan (_one-off tasks_) dengan membuat Pod.
> >     
> > - **Endpoints Controller:** Menghubungkan objek Service dengan Pod.
> >     
> > - **Service Account & Token Controllers:** Membuat akun _default_ dan token API untuk _namespace_ baru.
> >     
> > 
> > 1. `cloud-controller-manager` (Opsional)
> > 
> > Komponen ini menjalankan controller yang spesifik untuk penyedia layanan cloud tertentu (AWS, GCP, Azure). Ini memungkinkan cluster Kubernetes untuk berinteraksi dengan API cloud untuk mengelola load balancer, storage volumes, dll.
> > 
> > ### Komponen Node
> > 
> > Setiap _node_ pekerja menjalankan komponen-komponen berikut:
> > 
> > #### 1. `kubelet`
> > 
> > Ini adalah agent utama yang berjalan di setiap node. kubelet berkomunikasi dengan Control Plane dan memastikan bahwa kontainer yang didefinisikan dalam Pod berjalan dan sehat di node-nya.
> > 
> > #### 2. `kube-proxy`
> > 
> > Sebuah proxy jaringan yang berjalan di setiap node. kube-proxy bertanggung jawab untuk mengelola aturan jaringan pada node, memungkinkan komunikasi jaringan ke Pod Anda dari dalam atau luar cluster. Ia mengimplementasikan sebagian dari objek Service Kubernetes.
> > 
> > #### 3. Container Runtime
> > 
> > Ini adalah perangkat lunak yang bertanggung jawab untuk menjalankan kontainer. Kubernetes mendukung berbagai runtime yang sesuai dengan Container Runtime Interface (CRI), seperti containerd atau CRI-O.
> > 
> > ### Addons
> > 
> > Addons adalah Pod dan Service yang mengimplementasikan fitur-fitur _cluster_.
> > 
> > - **Cluster DNS:** Layanan DNS internal untuk _cluster_ (misalnya, CoreDNS).
> >     
> > - **Dashboard:** Antarmuka pengguna berbasis web untuk mengelola _cluster_.
> >     
> > - **Container Resource Monitoring:** Mengumpulkan dan menyimpan metrik tentang kontainer.
> >     
> > - **Cluster-level Logging:** Mekanisme untuk menyimpan log kontainer ke penyimpanan pusat.
> >     

> [!cornell] #### Summary
> 
> **Arsitektur Kubernetes terdiri dari Control Plane sebagai "otak" yang mengelola state cluster melalui komponen seperti `kube-apiserver`, `etcd`, `scheduler`, dan `controller-manager`, serta sekumpulan Node pekerja yang menjalankan aplikasi pengguna. Setiap Node dikoordinasikan oleh agent `kubelet` dan `kube-proxy` untuk memastikan Pod berjalan sesuai spesifikasi yang ditetapkan oleh Control Plane, menciptakan sebuah sistem terdistribusi yang andal dan dapat melakukan self-healing.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Kubelet, CRI, dan CNI
> 
> `kubelet` adalah komponen yang sangat penting. Ia tidak hanya memulai dan menghentikan kontainer, tetapi juga bertindak sebagai jembatan ke dua abstraksi krusial lainnya:
> 
> - **Container Runtime Interface (CRI):** Ini adalah API plugin yang memungkinkan `kubelet` untuk menggunakan berbagai jenis _container runtime_ tanpa harus meng-kompilasi ulang. Selama _runtime_ (seperti `containerd`) mengimplementasikan CRI, `kubelet` dapat berkomunikasi dengannya untuk mengelola siklus hidup kontainer. Ini yang membuat Kubernetes bisa lepas dari ketergantungan historisnya pada Docker.
>     
> - **Container Network Interface (CNI):** Ini adalah spesifikasi plugin untuk mengkonfigurasi jaringan kontainer. Ketika `kubelet` membuat sebuah Pod, ia akan memanggil plugin CNI yang terpasang (seperti Calico, Flannel, atau Weave Net) untuk menyiapkan _network namespace_ Pod, memberikannya alamat IP, dan mengatur _routing_ yang diperlukan agar Pod tersebut bisa berkomunikasi di dalam _cluster_.
>     
> 
> #### Pendalaman: Etcd dan Konsistensi
> 
> `etcd` menggunakan algoritma konsensus **Raft** untuk memastikan bahwa setiap penulisan data direplikasi secara konsisten di beberapa _node_. Ini sangat penting karena `etcd` menyimpan seluruh _state_ dari _cluster_. Kehilangan data `etcd` berarti kehilangan seluruh _state_ dan konfigurasi _cluster_. Oleh karena itu, mem-backup `etcd` secara teratur adalah tugas operasional yang sangat krusial dalam mengelola _cluster_ Kubernetes.