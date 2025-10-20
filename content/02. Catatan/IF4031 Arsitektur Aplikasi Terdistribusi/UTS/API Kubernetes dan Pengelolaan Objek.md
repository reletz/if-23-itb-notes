---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] API Kubernetes dan Pengelolaan Objek
> 
> > ## Questions/Cues
> > 
> > - Apa itu Kubernetes API?
> >     
> > - Bagaimana cara mengakses API?
> >     
> > - Apa itu **API Groups**?
> >     
> > - Apa saja kategori sumber daya API?
> >     
> > - Apa itu **Workloads**?
> >     
> > - Apa itu **Discovery & LB**?
> >     
> > - Apa itu **Config & Storage**?
> >     
> > - Di mana _state_ disimpan?
> >     
> > - Bagaimana cara mengelola objek?
> >     
> > - Apa beda 3 cara manajemen objek?
> >     
> > 
> > ## Reference Points
> > 
> > - 25-extra-IF4031-24-2024-Kubernetes.pdf (hlm. 19-31)
> >     
> 
> > ### Kubernetes API
> > 
> > Kubernetes API adalah antarmuka utama yang disediakan oleh sistem. Ini adalah API berbasis **RESTful** yang memungkinkan pengguna dan komponen lain untuk berinteraksi dengan _Control Plane_, terutama untuk melakukan query dan memanipulasi _state_ dari objek-objek di dalam _cluster_. Semua operasi pada dasarnya adalah CRUD (_Create, Read, Update, Delete_) terhadap objek-objek ini.
> > 
> > **Cara Mengakses API:**
> > 
> > - **CLI:** Melalui `kubectl` yang merupakan _command-line tool_ utama. `kubectl` akan menerjemahkan perintah menjadi panggilan REST API ke `kube-apiserver`.
> >     
> > - **Client Libraries:** Menggunakan pustaka klien resmi untuk berbagai bahasa pemrograman (Go, Python, Java, dll.) untuk berinteraksi dengan API secara terprogram.
> >     
> > - **REST API Langsung:** Melakukan panggilan HTTP langsung ke _endpoint_ API.
> >     
> > 
> > ### API Groups dan Versioning
> > 
> > Untuk mempermudah evolusi dan pengelolaan, API Kubernetes dipecah menjadi beberapa **API Groups**. Setiap grup memiliki versinya sendiri. Contohnya:
> > 
> > - Grup inti (`core`) di `api/v1` berisi objek fundamental seperti Pods, Services, dan Namespaces.
> >     
> > - Grup `apps/v1` berisi objek untuk beban kerja seperti Deployments dan ReplicaSets.
> >     
> > - Grup `batch/v1` berisi objek untuk tugas seperti Jobs dan CronJobs.
> >     
> > 
> > ### Kategori Sumber Daya (Resource Categories)
> > 
> > Objek-objek API dapat dikelompokkan ke dalam kategori berdasarkan fungsinya:
> > 
> > #### 1. Workloads
> > 
> > Objek yang digunakan untuk mengelola dan menjalankan kontainer di cluster. Ini adalah objek yang paling sering berinteraksi dengan pengembang.
> > 
> > - **Contoh:** `Pod`, `Deployment`, `StatefulSet`, `DaemonSet`, `Job`, `CronJob`.
> >     
> > 
> > #### 2. Discovery & Load Balancing
> > 
> > Objek yang digunakan untuk mengekspos workload agar dapat diakses oleh layanan lain atau dari luar cluster, serta untuk menyeimbangkan beban.
> > 
> > - **Contoh:** `Service`, `Ingress`.
> >     
> > 
> > #### 3. Config and Storage
> > 
> > Objek untuk inisialisasi, konfigurasi, dan persistensi data untuk aplikasi.
> > 
> > - **Contoh:** `ConfigMap`, `Secret`, `Volume`, `PersistentVolumeClaim`.
> >     
> > 
> > #### 4. Cluster
> > 
> > Objek yang mendefinisikan konfigurasi dari cluster itu sendiri.
> > 
> > - **Contoh:** `Namespace`, `Node`, `Role`, `ClusterRole`.
> >     
> > 
> > #### 5. Metadata
> > 
> > Objek untuk mengkonfigurasi perilaku sumber daya lain di dalam cluster.
> > 
> > ### Penyimpanan State
> > 
> > _State_ dari semua objek-objek ini disimpan secara persisten di **etcd**. API server adalah satu-satunya komponen yang berkomunikasi langsung dengan `etcd`.
> > 
> > ### Manajemen Objek Kubernetes
> > 
> > Ada tiga pendekatan utama untuk mengelola objek di Kubernetes:
> > 
> > #### 1. Imperative Commands (Perintah Imperatif)
> > 
> > Memberi perintah langsung ke kubectl untuk melakukan aksi. Sangat baik untuk tugas-tugas cepat atau saat belajar.
> > 
> > - **Contoh:** `kubectl create deployment nginx --image=nginx` atau `kubectl scale deployment nginx --replicas=3`.
> >     
> > - **Kelemahan:** Tidak ada jejak perubahan, sulit direproduksi, tidak cocok untuk manajemen infrastruktur sebagai kode (_Infrastructure as Code_).
> >     
> > 
> > #### 2. Imperative Object Configuration (Konfigurasi Objek Imperatif)
> > 
> > Menggunakan file YAML/JSON untuk mendefinisikan objek, lalu menggunakan perintah seperti create atau delete untuk mengelolanya.
> > 
> > - **Contoh:** `kubectl create -f nginx.yaml`.
> >     
> > - **Kelemahan:** Perintah `create` akan gagal jika objek sudah ada. Untuk pembaruan, harus menggunakan `replace` atau `patch`, yang bisa rumit.
> >     
> > 
> > #### 3. Declarative Object Configuration (Konfigurasi Objek Deklaratif)
> > 
> > Ini adalah pendekatan yang direkomendasikan dan paling umum digunakan. Anda mendefinisikan desired state dalam satu atau lebih file YAML, dan menggunakan perintah kubectl apply -f <directory>.
> > 
> > - **Cara Kerja:** `kubectl apply` akan membandingkan definisi di file YAML dengan _state_ objek yang ada di _cluster_. Kubernetes akan secara cerdas menghitung dan menerapkan hanya perubahan yang diperlukan. Jika objek belum ada, ia akan dibuat. Jika sudah ada, ia akan diperbarui.
> >     
> > - **Keuntungan:** Mendukung penuh _Infrastructure as Code_, mudah dilacak dalam sistem kontrol versi (Git), dan merupakan inti dari alur kerja GitOps.
> >     

> [!cornell] #### Summary
> 
> **Kubernetes API adalah antarmuka RESTful terpusat yang berfungsi sebagai pintu gerbang untuk semua interaksi dengan state cluster, yang disimpan secara persisten di `etcd`. Objek-objek dalam API ini dikelompokkan berdasarkan fungsionalitas (seperti Workloads, Discovery, Config) dan versi. Pengelolaan objek-objek ini idealnya dilakukan secara deklaratif menggunakan `kubectl apply`, yang memungkinkan manajemen infrastruktur sebagai kode (**_**Infrastructure as Code**_**) dengan mendefinisikan "keadaan yang diinginkan" dalam file konfigurasi.**

> [!ad-libitum]- Additional Information
> 
> #### Perpanjangan API: Custom Resources (CRDs)
> 
> Salah satu fitur paling kuat dari Kubernetes adalah kemampuannya untuk diperluas. Jika objek-objek bawaan tidak cukup untuk merepresentasikan sistem Anda, Anda dapat membuat tipe objek Anda sendiri dengan mendefinisikan sebuah **Custom Resource Definition (CRD)**.
> 
> Setelah Anda membuat CRD, Anda dapat membuat objek dari tipe baru tersebut, seolah-olah itu adalah objek bawaan Kubernetes seperti `Pod` atau `Deployment`. Ini membuka jalan untuk **pola Operator**, di mana Anda menulis _controller_ kustom yang "mengawasi" CRD Anda dan melakukan tindakan otomatisasi yang kompleks. Contohnya, _operator database_ bisa mengelola siklus hidup _database cluster_ (pembuatan, _backup_, _failover_) hanya dengan Anda mendefinisikan objek kustom seperti `kind: PostgresCluster`.
> 
> #### Trade-off Manajemen Objek
> 
> - **Imperative Commands:** Cepat untuk prototipe, buruk untuk produksi.
>     
> - **Imperative Object Config:** Lebih baik karena konfigurasi tersimpan di file, tetapi manajemen pembaruan masih manual dan rawan kesalahan.
>     
> - **Declarative Object Config:** Sedikit lebih lambat untuk tugas-tugas tunggal, tetapi jauh lebih unggul untuk manajemen siklus hidup aplikasi yang kompleks di lingkungan produksi. Ini adalah fondasi dari CI/CD dan GitOps modern.
>