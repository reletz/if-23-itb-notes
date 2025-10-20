---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Namespace, Label, dan Metadata Objek
> 
> > ## Questions/Cues
> >
> > - Bagaimana cara mengorganisir objek di K8s?
> >     
> > - Apa itu **Namespace**?
> >     
> > - Untuk apa Namespace digunakan?
> >     
> > - Bagaimana DNS bekerja dengan Namespace?
> >     
> > - Apa itu **Label**?
> >     
> > - Apa itu **Selector**?
> >     
> > - Bagaimana Label dan Selector bekerja sama?
> >     
> > - Apa itu **Annotation**?
> >     
> > - Apa beda Label dan Annotation?
> >     
> > - Apa itu **Finalizer**?
> >     
> >
> > ## Reference Points
> >
> > - 25-extra-IF4031-24-2024-Kubernetes.pdf (hlm. 32-38)
> >     
> 
> > ### Namespace: Isolasi Virtual
> >
> > **Namespace** menyediakan mekanisme untuk mengisolasi grup sumber daya di dalam satu _cluster_ fisik. Bayangkan ini seperti "sub-cluster" virtual.
> >
> > **Tujuan Utama Namespace:**
> >
> > - **Scope untuk Nama:** Nama dari sebuah objek (misalnya, nama `Pod`) hanya perlu unik di dalam satu _namespace_, bukan di seluruh _cluster_.
> >     
> > - **Organisasi Multi-tenancy:** Memungkinkan beberapa tim atau proyek untuk berbagi satu _cluster_ tanpa saling mengganggu. Tim A bisa bekerja di `namespace-a` dan Tim B di `namespace-b`.
> >     
> > - **Kontrol Akses:** Kebijakan keamanan (RBAC - Role-Based Access Control) dapat diterapkan per _namespace_.
> >     
> > - **Manajemen Sumber Daya:** Kuota sumber daya (CPU, memori) dapat ditetapkan per _namespace_.
> >     
> >
> > **Penting:** Tidak semua objek berada dalam _namespace_. Objek lingkup _cluster_ seperti `Node` dan `PersistentVolume` tidak termasuk dalam _namespace_ manapun.
> >
> > ### Namespaces dan DNS:
> > 
> > Ketika sebuah Service dibuat, Kubernetes secara otomatis membuat entri DNS. Formatnya adalah: `<service-name>.<namespace-name>.svc.cluster.local`.
> >
> > - Dari dalam _namespace_ yang sama, sebuah Pod dapat memanggil layanan lain hanya dengan namanya (`<service-name>`).
> >     
> > - Untuk memanggil layanan di _namespace_ yang berbeda, Pod harus menggunakan alamat lengkapnya (`<service-name>.<namespace-name>`).
> >     
> >
> > ### Label dan Selector: Mengelompokkan dan Memilih
> >
> > **Label** adalah pasangan kunci-nilai (_key-value pairs_) yang ditempelkan pada objek, seperti `Pod` dan `Service`. Label bersifat bebas dan dirancang untuk digunakan dalam proses identifikasi.
> >
> > - **Contoh Label:** `app: webserver`, `tier: frontend`, `environment: production`.
> >     
> >
> > **Selector** adalah mekanisme untuk memilih objek berdasarkan labelnya.
> >
> > - **Contoh Selector:** Sebuah `Service` mungkin memiliki _selector_ `app: webserver`. Artinya, layanan ini akan mencari dan mengarahkan lalu lintas ke semua `Pod` yang memiliki label `app: webserver`.
> >     
> >
> > Kombinasi **Label dan Selector** adalah mekanisme penghubung inti di Kubernetes. Inilah cara `Deployment` mengetahui `Pod` mana yang harus dikelolanya, dan cara `Service` mengetahui `Pod` mana yang harus menerima lalu lintas. Ini adalah hubungan yang _loosely coupled_.
> >
> > ### Annotation: Metadata Tambahan
> >
> > **Annotation** juga merupakan pasangan kunci-nilai yang ditempelkan pada objek. Perbedaan utamanya dengan Label adalah:
> >
> > - **Tujuan:** Annotation tidak digunakan untuk identifikasi atau pemilihan objek. Mereka digunakan untuk melampirkan metadata arbitrer yang bersifat non-identifikasi, yang sering kali digunakan oleh _tools_ atau _library_ lain.
> >     
> > - **Contoh:**
> >     
> >     - Deskripsi panjang tentang objek.
> >         
> >     - Informasi kontak orang yang bertanggung jawab.
> >         
> >     - Konfigurasi spesifik untuk _tool_ eksternal (misalnya, `nginx.ingress.kubernetes.io/rewrite-target: /` untuk sebuah Ingress Controller).
> >         
> >
> > **Singkatnya:** Gunakan **Label** untuk pengelompokan dan pemilihan. Gunakan **Annotation** untuk semua hal lain yang ingin Anda "catat" pada sebuah objek.
> >
> > ### Finalizer: Mengontrol Penghapusan Objek
> >
> > **Finalizer** adalah sebuah mekanisme yang memberitahu Kubernetes untuk menunggu sampai kondisi tertentu terpenuhi sebelum ia benar-benar menghapus sebuah objek yang telah diminta untuk dihapus.
> >
> > **Cara Kerja:** Ketika Anda meminta untuk menghapus objek yang memiliki _finalizer_, Kubernetes hanya menandai objek tersebut untuk dihapus (_deletion timestamp_) tetapi tidak langsung menghapusnya. _Controller_ yang bertanggung jawab untuk _finalizer_ tersebut akan melakukan tugas pembersihan (_cleanup_). Setelah tugas selesai, _controller_ akan menghapus nama _finalizer_ dari daftar di objek tersebut. Barulah setelah itu Kubernetes akan benar-benar menghapus objeknya.
> >
> > **Contoh Penggunaan:** Memastikan bahwa _storage volume_ eksternal atau _load balancer_ di _cloud_ telah dihapus dengan benar sebelum objek `PersistentVolume` atau `Service` di Kubernetes dihapus.

> [!cornell] #### Summary
> 
> **Kubernetes menyediakan mekanisme metadata yang kuat untuk mengorganisir dan mengelola sumber daya. Namespace digunakan untuk menciptakan isolasi virtual antar tim atau aplikasi, sementara Label dan Selector membentuk sistem penghubung inti yang longgar untuk mengelompokkan dan memilih objek. Annotation digunakan untuk melampirkan data non-identifikasi yang sering kali dibaca oleh tools lain, dan Finalizer memastikan proses pembersihan yang aman sebelum sebuah objek benar-benar dihapus dari cluster.**

> [!ad-libitum]- Additional Information
> 
> #### Kasus Penggunaan Lanjutan untuk Label
> 
> Kekuatan label terletak pada kemampuannya untuk mendeskripsikan objek dari berbagai dimensi. Sebuah Pod bisa memiliki beberapa label sekaligus, misalnya:
> 
> ```yaml
> labels:
>   app: my-app
>   tier: backend
>   release: canary
>   customer: a
> ```
> 
> Ini memungkinkan operasi yang sangat fleksibel. Anda bisa memilih:
> 
> - Semua Pod dari aplikasi ini: `app=my-app`
>     
> - Hanya Pod _backend_ di rilis _canary_: `tier=backend,release=canary`
>     
> - Semua Pod milik pelanggan A: `customer=a`
>     
> 
> Kemampuan ini sangat penting untuk strategi _deployment_ yang canggih (seperti _Canary Release_ atau A/B Testing) dan untuk pemantauan yang terperinci.
> 
> #### Contoh Praktis Annotation
> 
> Bayangkan Anda menggunakan **Prometheus** (sebuah _tool monitoring_) yang secara otomatis mencari target untuk di-_scrape_ metriknya. Anda bisa memberitahu Prometheus untuk men-_scrape_ sebuah Pod dengan menambahkan _annotation_ berikut ke Pod tersebut:
> 
> ```yaml
> annotations:
>   prometheus.io/scrape: "true"
>   prometheus.io/port: "9102"
> ```
> 
> Kubernetes sendiri tidak peduli dengan _annotation_ ini. Namun, _controller_ Prometheus akan memindai _cluster_, menemukan Pod dengan _annotation_ ini, dan secara otomatis menambahkannya sebagai target _monitoring_. Ini menunjukkan bagaimana _annotation_ berfungsi sebagai jembatan antara Kubernetes dan _tools_ lain dalam ekosistemnya.