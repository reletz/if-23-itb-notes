---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - 9 Komponen Esensial?
> >     
> > - Physical Data Center?
> >         
> > 	- Konsep AWS: Region?
> > 	    
> > 	- Konsep AWS: AZ?
> >     
> > - Virtualization?
> >         
> > 	- Hypervisor?
> > 	    
> > 	- Hypervisor Type 1?
> > 	    
> > 	- Hypervisor Type 2?
> >     
> > - Networking?
> >         
> > - Storage?
> >         
> > 	- Tipe Storage (Block, File, Object)?
> >     
> > - Security?
> >         
> > - Management & Orchestration?
> >         
> > - Monitoring & Analytics?
> >         
> > - Disaster Recovery (DR) & Backup?
> >         
> > - Compliance & Governance?
> >         
> >
> > ## Reference Points
> >
> > - Slides IF3110-11a-Cloud-Computing.pdf (Slide 15-25)
> >     
> 
> > ### Komponen Infrastruktur Cloud
> >
> > Infrastruktur _cloud_ yang kompleks dibangun di atas 9 komponen esensial berikut:
> >
> > 1. **Physical Data Centers:**
> >     
> > - Fondasi fisik dari *cloud*. Berupa gedung yang menampung *hardware* (server, *storage*, *networking*), listrik, pendingin, dan keamanan fisik.
> > - **Contoh AWS:**
> > 	- **Region:** Lokasi fisik di dunia (misal: Region Jakarta).
> > 	- **Availability Zone (AZ):** Sekelompok *data center* yang logis di dalam satu *Region*. Setiap AZ terisolasi penuh (lokasi, listrik, air) dari AZ lainnya untuk *fault tolerance*. Satu *Region* terdiri dari beberapa AZ.
> > 
> >
> > 2. **Virtualization & Hypervisors:**
> >     
> > 	- **Virtualization:** Teknologi yang memungkinkan satu server fisik menjalankan beberapa *Virtual Machine* (VM) secara bersamaan, memungkinkan *resource pooling* dan utilisasi yang efisien.
> > 	- **Hypervisor:** *Software* yang membuat, menjalankan, dan me-*manage* VM (Contoh: KVM, VMware ESXi).
> > 	![[Pasted image 20251113095723.png]]
> > 		- **Type 1 (Native/Bare Metal):** Hypervisor berjalan **langsung di atas *hardware***. Jauh lebih efisien. Ini yang digunakan oleh *provider* *cloud*.
> > 		- **Type 2 (Hosted):** Hypervisor berjalan **di atas Sistem Operasi *host*** (misal: VirtualBox di Windows/Mac).
> > 
> >
> > 3. **Networking:**
> >     
> > 	  - Komponen (*switch*, *router*, *load balancer*, *firewall*) yang menghubungkan semua komponen *cloud* dan memungkinkan transfer data. Termasuk teknologi seperti VPN (Virtual Private Network) dan SDN (Software-Defined Networking).
> > 	
> >
> > 4. **Storage:**
> >     
> > 	- Komponen fundamental untuk menyimpan dan mengelola data.
> > 	- **Tipe Storage:**
> > 		- **Block Storage:** Menyediakan blok *storage* mentah, mirip *hard drive* (SSD/HDD) tradisional. Digunakan untuk OS *virtual machine*.
> > 		- **File Storage:** Menawarkan *filesystem* hierarkis (struktur folder), seperti NAS (Network-Attached Storage).
> > 		- **Object Storage:** Menyediakan *storage* yang sangat skalabel dan durabel untuk data tidak terstruktur (gambar, video, *backup*). Ini **paling sering digunakan untuk aplikasi web**.
> > 
> >
> > 5. **Security:**
> >
> > 	- Memastikan perlindungan dan integritas infrastruktur dan data.
> > 	- Mencakup: Enkripsi data, *firewall*, *Authentication* & *Access Control* (IAM), *Vulnerability Management*, *logging*.
> > 	
> >
> > 6. **Management & Orchestration:**
> >     
> > 	- *Platform* manajemen terpusat untuk mengontrol infrastruktur *cloud*.
> > 	- Mencakup: *Provisioning* (alokasi sumber daya), otomatisasi, *orchestration* (*workflow* otomatisasi yang kompleks), *cost management* & *billing*.
> >
> > 7. **Monitoring & Analytics:**
> >     
> > 	- *Tools* untuk melacak *performance*, *availability*, dan *health* dari infrastruktur dan aplikasi.
> > 	- Memungkinkan identifikasi dan resolusi masalah secara proaktif, serta *capacity planning*.
> > 	
> >
> > 8. **Disaster Recovery (DR) & Backup:**
> >     
> > 	- Mekanisme untuk menjamin kelangsungan bisnis (*business continuity*).
> > 	- **Backup:** Menyalin data secara reguler untuk melindungi dari kehilangan/kerusakan data.
> > 	- **DR:** Mereplikasi data *dan* aplikasi ke lokasi alternatif (misal: AZ atau *Region* lain) untuk *failover* jika terjadi bencana.
> > 
> >
> > 9. **Compliance & Governance:** 
> > 	
> > 	- Memastikan infrastruktur *cloud* mematuhi persyaratan regulasi dan kebijakan industri (misal: GDPR untuk privasi data, HIPAA untuk data kesehatan).
> > 	- Mencakup: Audit, *risk management*, *policy management*.
> > 	

> [!cornell] #### Summary
> 
> Infrastruktur _cloud_ dibangun di atas **Physical Data Centers** yang tersebar di **Region** dan **Availability Zone (AZ)** untuk _high availability_. Teknologi intinya adalah **Virtualization** (menggunakan **Hypervisor Type 1**) yang membagi _hardware_ fisik menjadi VM. Ini semua didukung oleh 7 pilar lainnya: **Networking** (konektivitas), **Storage** (terutama _Object Storage_ untuk web), **Security** (perlindungan data), **Management & Orchestration** (kontrol & otomatisasi), **Monitoring & Analytics** (pelacakan _health_), **Disaster Recovery** (kelangsungan bisnis), dan **Compliance** (kepatuhan regulasi).

> [!ad-libitum]- Additional Information
> 
> #### Deep Dive: Ketersediaan Tinggi (High Availability) dengan Region & AZ
> 
> Konsep _Region_ dan _AZ_ adalah kunci mengapa _cloud_ sangat _reliable_.
> 
> - Skenario 1: Server Anda Mati.
>     
>     Jika Anda hanya punya 1 VM (server), dan hardware fisiknya rusak, aplikasi Anda mati.
>     
> - Skenario 2: Data Center (AZ) Mati.
>     
>     Jika Anda menyebar aplikasi Anda di 3 VM yang berbeda di 3 AZ yang berbeda (AZ-A, AZ-B, AZ-C) dalam satu Region (Jakarta), lalu Anda letakkan Load Balancer di depannya.
>     
>     Jika AZ-A mati total (misal: banjir atau mati listrik), Load Balancer akan otomatis berhenti mengirim traffic ke sana dan mengalihkannya ke AZ-B dan AZ-C. Aplikasi Anda tetap hidup.
>     
> - Skenario 3: Region Mati.
>     
>     Jika seluruh Region Jakarta mati (misal: bencana alam besar), aplikasi Anda akan mati.
>     
>     Untuk Disaster Recovery penuh, Anda harus mereplikasi data dan aplikasi Anda ke Region lain (misal: Singapura).
>     
> 
> #### Deep Dive: Object Storage (Contoh: Amazon S3)
> 
> _Object Storage_ berbeda fundamental dari _File Storage_ (seperti di laptop Anda).
> 
> - **File Storage:** `C:\Users\Budi\Pictures\cat.jpg` (Path bersifat hierarkis).
>     
> - **Object Storage:** Tidak ada folder. Data Anda (`cat.jpg`) disimpan sebagai "Objek". Anda mendapat ID unik, dan _file_ itu disimpan secara redundan di banyak server.
>     
> 
> Mengapa ini penting untuk web?
> 
> 1. **Sangat Skalabel:** Bisa menyimpan triliunan _file_.
>     
> 2. **Sangat Durabel:** Data Anda otomatis di-copy ke beberapa AZ, sehingga hampir tidak mungkin hilang.
>     
> 3. **Murah:** Jauh lebih murah daripada _Block Storage_ (SSD).
>     
> 
> Aplikasi web modern **tidak pernah** menyimpan _file upload_ pengguna (gambar profil, dll) di _filesystem_ server yang sama dengan kode aplikasi. Mereka menyimpannya di _Object Storage_.