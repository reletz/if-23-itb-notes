---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Pengenalan dan Konsep Dasar Kubernetes
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan utama Kubernetes?
> >     
> > - Apa saja peran K8s?
> >     
> > - Apa prinsip dasar Kubernetes?
> >     
> > - Apa itu Objek Kubernetes?
> >     
> > - Apa beda `spec` dan `status`?
> >     
> > - Apa saja konsep-konsep fundamental?
> >     
> > - Apa itu **Pod**?
> >     
> > - Mengapa Pod penting?
> >     
> > 
> > ## Reference Points
> > 
> > - 25-extra-IF4031-24-2024-Kubernetes.pdf (hlm. 2-9)
> >     
> 
> > ### Tujuan Utama Kubernetes (K8s)
> > 
> > Kubernetes adalah sebuah platform _open-source_ untuk otomatisasi _deployment_, penskalaan, dan manajemen aplikasi dalam kontainer (_container orchestration_). Tujuannya adalah untuk menyediakan platform yang solid untuk menjalankan sistem terdistribusi secara andal.
> > 
> > - **Velocity:** Mempercepat siklus rilis perangkat lunak ke produksi melalui _immutability_, konfigurasi deklaratif, dan _self-healing_.
> >     
> > - **Scaling:** Memudahkan penskalaan aplikasi secara horizontal dan efisien.
> >     
> > - **Abstracting Infrastructure:** Menyembunyikan kompleksitas infrastruktur di bawahnya (fisik, virtual, atau cloud) sehingga pengembang bisa fokus pada aplikasi.
> >     
> > - **Efficiency:** Mengoptimalkan penggunaan sumber daya (_resource_) infrastruktur.
> >     
> > 
> > ### Peran Kubernetes
> > 
> > Kubernetes bertindak sebagai "sistem operasi" untuk sebuah _cluster_, menyediakan fungsi-fungsi inti berikut:
> > 
> > - **Orkestrasi:** Pengaturan alokasi _storage_ dan konektivitas antar kontainer.
> >     
> > - **Service Discovery & Load Balancing:** Memberikan nama DNS yang stabil untuk layanan dan menyeimbangkan beban lalu lintas ke beberapa kontainer.
> >     
> > - **Automated Rollout & Rollback:** Mengelola pembaruan aplikasi secara bertahap dan dapat kembali ke versi sebelumnya jika terjadi masalah.
> >     
> > - **Configuration & Secret Management:** Mengelola konfigurasi aplikasi dan data sensitif (seperti _password_ atau _API keys_) secara terpisah dari _container image_.
> >     
> > - **Self-healing:** Secara otomatis me-restart kontainer yang gagal, mengganti _node_ yang mati, dan mematikan kontainer yang tidak lolos _health check_.
> >     
> > - **Resource Scheduling:** Secara cerdas menempatkan kontainer pada _node_ yang tersedia berdasarkan kebutuhan sumber daya.
> >     
> > 
> > ### Prinsip Dasar: Deklaratif
> > 
> > Kubernetes bekerja dengan model **deklaratif**. Artinya, pengguna tidak memberi tahu Kubernetes _bagaimana_ melakukan sesuatu (model imperatif), melainkan _apa_ keadaan akhir yang diinginkan (_desired state_).
> > 
> > - **Pengguna:** Mendefinisikan _desired state_ dalam sebuah file konfigurasi (biasanya YAML). Contoh: "Saya ingin 5 replika dari aplikasi web saya berjalan menggunakan _image_ versi 1.2."
> >     
> > - **Kubernetes Controller:** Terus-menerus memantau keadaan saat ini (_current state_) dari _cluster_. Jika _current state_ tidak cocok dengan _desired state_, _controller_ akan secara otomatis melakukan tindakan yang diperlukan untuk mencapai _desired state_ tersebut.
> >     
> > 
> > ### Objek Kubernetes
> > 
> > Objek adalah entitas persisten yang merepresentasikan _state_ dari sebuah _cluster_. Ketika Anda membuat sebuah objek, Anda memberi tahu Kubernetes _desired state_ yang Anda inginkan. Hampir setiap objek memiliki dua _field_ utama:
> > 
> > - **`spec` (Spesifikasi):** Disediakan oleh pengguna, mendeskripsikan _desired state_ dari objek (misalnya, jumlah replika, _image_ yang digunakan).
> >     
> > - **`status`:** Dikelola oleh Kubernetes, berisi informasi tentang _current state_ dari objek (misalnya, berapa replika yang saat ini berjalan, alamat IP Pod).
> >     
> > 
> > ### Konsep Dasar Arsitektur
> > 
> > - **Cluster:** Sekumpulan mesin (_node_) yang sumber dayanya (CPU, memori, _storage_) digabungkan dan dikelola oleh Kubernetes.
> >     
> > - **Node:** Sebuah mesin pekerja, bisa berupa mesin fisik atau virtual. Setiap _node_ menjalankan komponen yang diperlukan untuk menjalankan kontainer.
> >     
> > - **Pod:** **Unit kerja terkecil dan paling dasar di Kubernetes.** Sebuah Pod merepresentasikan satu _instance_ dari sebuah proses yang berjalan di _cluster_.
> >     
> > - **ReplicaSet:** Memastikan bahwa sejumlah replika Pod yang ditentukan selalu berjalan.
> >     
> > - **Deployment:** Menyediakan cara deklaratif untuk mengelola pembaruan pada Pod dan ReplicaSet. Ini adalah objek yang paling umum digunakan untuk men-_deploy_ aplikasi _stateless_.
> >     
> > 
> > ### Mendalami Konsep Pod
> > 
> > Pod adalah abstraksi di atas kontainer. Sebuah Pod dapat berisi satu atau lebih kontainer yang selalu dijadwalkan bersama di node yang sama dan berbagi konteks eksekusi yang sama.
> > 
> > Karakteristik Pod:
> > 
> > - **Shared Network:** Semua kontainer di dalam satu Pod berbagi _namespace_ jaringan yang sama, termasuk alamat IP. Mereka dapat berkomunikasi satu sama lain melalui `localhost`.
> >     
> > - **Shared Storage:** Kontainer di dalam satu Pod dapat berbagi volume penyimpanan data.
> >     
> > - **Co-location:** Mereka dijamin selalu berjalan di _node_ yang sama.
> >     
> > 
> > Pola yang umum adalah satu Pod berisi satu kontainer utama. Namun, pola multi-kontainer berguna untuk tugas-tugas pendukung seperti _sidecar_ untuk _logging_, _proxy_, atau sinkronisasi file.

> [!cornell] #### Summary
> 
> Kubernetes adalah sebuah platform orkestrasi kontainer yang bekerja dengan prinsip deklaratif, di mana pengguna mendefinisikan "keadaan yang diinginkan" (_**desired state**_) dari aplikasi melalui objek-objek API. Kubernetes kemudian secara otomatis bekerja untuk menyamakan keadaan aktual sistem dengan keadaan yang diinginkan tersebut. Unit fundamental dan terkecil yang dikelolanya adalah Pod, sebuah abstraksi yang dapat menampung satu atau lebih kontainer yang berbagi sumber daya jaringan dan penyimpanan, yang kemudian dikelola siklus hidupnya oleh objek tingkat tinggi seperti Deployment untuk memastikan skalabilitas dan ketahanan (_**self-healing**_).

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Deklaratif vs. Imperatif
> 
> Bayangkan Anda ingin pergi ke sebuah alamat.
> 
> - **Cara Imperatif:** "Jalan lurus 200 meter, belok kiri di perempatan, lalu belok kanan di lampu merah kedua." Anda memberikan serangkaian perintah langkah demi langkah. Jika ada jalan yang ditutup, Anda gagal.
>     
> - **Cara Deklaratif:** "Saya ingin berada di alamat X." Anda hanya menyatakan tujuan akhir. Aplikasi GPS (seperti Kubernetes Controller) yang akan mencari rute terbaik, bahkan jika harus berputar karena ada jalan ditutup.
>     
> 
> Model deklaratif ini yang membuat Kubernetes sangat kuat. Anda tidak perlu peduli jika sebuah _node_ mati. Anda hanya menyatakan "saya butuh 5 replika", dan Kubernetes akan memastikan selalu ada 5 replika yang berjalan, bahkan jika ia harus membuatnya di _node_ yang baru.
> 
> #### Pendalaman: "Pause" Container di dalam Pod
> 
> Bagaimana cara Kubernetes membuat beberapa kontainer berbagi satu alamat IP? Di belakang layar, ketika sebuah Pod dibuat, komponen `kubelet` di sebuah _node_ pertama kali membuat sebuah kontainer infrastruktur yang sangat kecil yang disebut **"pause" container**. Tugas utama _pause container_ ini adalah untuk membuat dan memegang _network namespace_. Setelah itu, semua kontainer aplikasi yang Anda definisikan di dalam Pod akan dibuat untuk **bergabung** dengan _network namespace_ milik _pause container_ tersebut. Inilah yang memungkinkan mereka semua melihat antarmuka jaringan yang sama dan berkomunikasi melalui `localhost`. _Pause container_ tidak melakukan apa-apa selain "tidur", tetapi ia adalah fondasi dari model jaringan Pod.