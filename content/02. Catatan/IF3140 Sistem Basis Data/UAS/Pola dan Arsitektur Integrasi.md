---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Interaction Models?
> >     
> > - Model 1: Point-to-Point?
> >     
> > - Kekurangan Point-to-Point? (s^2 interfaces)
> >     
> > - Model 2: Hub-and-Spoke?
> >     
> > - Kelebihan Hub-and-Spoke?
> >     
> > - Model 3: Publish-and-Subscribe (Pub/Sub)?
> >     
> > - Konsep Arsitektur: Application Coupling?
> >     
> > - Tight vs Loose Coupling?
> >     
> > - Orchestration & Process Control?
> >     
> > - Apa itu EAI?
> >     
> > - Apa itu Enterprise Service Bus (ESB)?
> >     
> > - Apa itu Service-Oriented Architecture (SOA)?
> >     
> > - Tujuan SOA? (Black box, independence)
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 25-34
> >     
> 
> > ### Interaction Models
> > 
> > Ini adalah pola (pattern) arsitektur _high-level_ yang menjelaskan cara membuat koneksi antar sistem untuk mentransfer data.
> > 
> > ### Model 1: Point-to-Point
> > 
> > ![[Pasted image 20251219025213.png]]
> > 
> > - Sistem-sistem individu terhubung **secara langsung** satu sama lain.
> >     
> > - **Kekurangan:** Menjadi sangat kacau (sering disebut "Spaghetti Architecture") ketika jumlah sistem bertambah banyak.
> >     
> > - **Masalah Utama:**
> >     
> >     1. **Jumlah Interface:** Jumlah koneksi yang harus dikelola mendekati **`s^2`** (jumlah sistem kuadrat). Jika ada 6 sistem, perlu `6*5 = 30` interface.
> >         
> >     2. **Inkonsistensi:** Data yang sama bisa memiliki format berbeda di setiap koneksi.
> >         
> >     3. **Beban Tinggi:** Beban untuk mengelola interface ini bisa lebih besar daripada mengelola sistemnya itu sendiri.
> >         
> > 
> > ### Model 2: Hub-and-Spoke 
> > 
> > ![[Pasted image 20251219025230.png]]
> > 
> > - Model ini mengonsolidasikan data bersama (secara fisik atau virtual) dalam sebuah **Hub data pusat**.
> >     
> > - Sistem lain (Spokes) terhubung ke Hub ini, bukan ke satu sama lain.
> >     
> > - **Kelebihan:**
> >     
> >     - Jauh mengurangi jumlah interface (Sistem `s` = `s` interface).
> >         
> >     - Menyediakan pandangan data yang konsisten.
> >         
> >     - Meminimalkan dampak ke sistem sumber (karena hanya Hub yang mengakses sumber).
> >         
> > - **Kekurangan:** Hub itu sendiri bisa menjadi _bottleneck_ (titik kemacetan) dan _single point of failure_ (jika Hub mati, semua koneksi mati).
> >     
> > 
> > ### Model 3: Publish-and-Subscribe (Pub/Sub) 
> > 
> > ![[Pasted image 20251219025242.png]]
> > 
> > - Sebuah model di mana sistem **menerbitkan (publish)** data ke "Topik" (seperti papan buletin), tanpa tahu siapa yang akan membacanya.
> >     
> > - Sistem lain **berlangganan (subscribe)** ke topik tersebut dan akan menerima data secara otomatis ketika data baru dipublikasikan.
> >     
> > - **Kelebihan:** Sangat _decoupled_ (terpisah). Publisher dan Subscriber tidak perlu tahu keberadaan satu sama lain.
> >     
> > 
> > ### Konsep Arsitektur: Application Coupling
> > 
> > ![[Pasted image 20251219025304.png]]
> > 
> > **Coupling** (Keterkaitan) adalah istilah yang menggambarkan sejauh mana dua sistem saling terkait atau bergantung.
> > 
> > - **Tight Coupling (Keterkaitan Erat):**
> >     
> >     - Biasanya menggunakan interface **Synchronous** (Sinkron).
> >         
> >     - Satu sistem _menunggu_ respons dari sistem lain.
> >         
> >     - **Resiko:** Jika satu sistem _down_, sistem yang bergantung padanya ikut _down_. Rencana pemulihan bencana (BCP) harus sama.
> >         
> > - **Loose Coupling (Keterkaitan Longgar):**
> >     
> >     - Biasanya menggunakan interface **Asynchronous** (Asinkron).
> >         
> >     - Data dikirim tanpa menunggu respons.
> >         
> >     - **Keuntungan:** Satu sistem bisa _down_ tanpa menyebabkan sistem lain ikut _down_.
> >         
> > 
> > ### Orchestration & Process Control (Slide 30)
> > 
> > - **Orchestration:** Istilah untuk menggambarkan bagaimana _beberapa_ proses diorganisasi dan dieksekusi secara berurutan dalam sebuah sistem (seperti konduktor orkestra yang memandu musisi).
> >     
> > - **Process Controls:** Komponen (seperti logs, alerts, job charts) yang memastikan pengiriman, ekstraksi, dan pemuatan data berjalan akurat dan lengkap.
> >     
> > 
> > ### Enterprise Application Integration (EAI) (Slide 31)
> > 
> > Sebuah model di mana modul-modul software berinteraksi satu sama lain **hanya** melalui _interface_ yang terdefinisi dengan baik, yaitu **API (Application Programming Interface)**.
> > 
> > Dalam EAI, aplikasi lain _dilarang_ "mencolek" atau mengakses database aplikasi lain secara langsung. Mereka harus "meminta" data melalui API yang sudah disediakan.
> > 
> > ### Enterprise Service Bus (ESB) (Slide 32)
> > 
> > **ESB** adalah sebuah **sistem (middleware)** yang bertindak sebagai **perantara (bus)** di antara sistem-sistem lain.
> > 
> > Aplikasi mengirim pesan ke ESB, dan ESB bertanggung jawab untuk _routing_ (mengarahkan), _transformasi_ (jika perlu), dan mengirimkan pesan itu ke aplikasi tujuan. Ini adalah implementasi teknis dari arsitektur _Hub-and-Spoke_ yang canggih.
> > 
> > ### Service-Oriented Architecture (SOA) (Slide 33-34)
> > 
> > **SOA** adalah sebuah **filosofi atau gaya arsitektur** di mana fungsionalitas (seperti mengambil data, update data) disediakan melalui **layanan (services)** yang independen dan _self-contained_.
> > 
> > - **Tujuan Utama:** Independensi aplikasi.
> >     
> > - **Konsep Kunci:** Layanan adalah "kotak hitam" (_black box_). Aplikasi pemanggil tidak perlu tahu bagaimana layanan itu diimplementasikan; ia hanya perlu tahu cara memanggilnya.
> >     
> > - SOA dapat diimplementasikan menggunakan berbagai teknologi, termasuk Web Services, RESTful APIs, atau ESB.
> >     

> [!cornell] #### Summary
> 
> **Arsitektur integrasi berevolusi dari `Point-to-Point` (kacau, s^2 interface) ke model `Hub-and-Spoke` (terpusat) atau `Pub/Sub` (decoupled via topik). Prinsip desain modern mengutamakan `Loose Coupling` (asinkron) di atas `Tight Coupling` (sinkron) untuk mengurangi risiko. Ini sering diimplementasikan menggunakan filosofi `SOA` (Service-Oriented Architecture), di mana fungsionalitas disediakan sebagai layanan "black box", yang seringkali dihubungkan oleh `ESB` (Enterprise Service Bus) sebagai perantara lalu lintas data, dan diakses melalui `EAI` (menggunakan API).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: ESB vs. Pub/Sub
> 
> - **Pub/Sub** adalah _Pola Arsitektur_ (Pattern). Ini adalah ide/konsep: satu publisher, banyak subscriber, dipisahkan oleh sebuah "topik".
>     
> - **ESB** adalah _Teknologi_ (Middleware). Ini adalah perangkat lunak (seringkali besar dan kompleks) yang Anda beli dan install.
>     
> 
> Sebuah ESB (seperti MuleSoft, TIBCO) _seringkali_ menggunakan pola Pub/Sub di dalamnya, tetapi ESB melakukan lebih banyak hal. ESB adalah "Hub" yang sangat cerdas. Ia bisa melakukan:
> 
> 1. **Routing:** Mengarahkan pesan ke tujuan yang benar.
>     
> 2. **Transformasi:** Mengubah format data (misal: XML ke JSON) di tengah jalan.
>     
> 3. **Orchestration:** Mengelola alur proses yang kompleks (misal: panggil servis A, lalu jika A berhasil, panggil B dan C).
>     
> 
> Dalam arsitektur modern (terutama Microservices), ESB yang "gemuk" dan "cerdas" mulai ditinggalkan, digantikan oleh _message broker_ (seperti RabbitMQ atau Kafka) yang "bodoh" (hanya mengantar pesan) yang murni menerapkan pola Pub/Sub, dan membiarkan _logic_ transformasi/orchestration ditangani oleh aplikasi itu sendiri.
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan Sistem Informasi Akademik (SIAK) di kampus. Anggap ada 4 sistem: Keuangan (cek tagihan), Akademik (cek SKS), Dosen (validasi KRS), dan Mahasiswa (isi KRS).
>     
>     - Bagaimana jika ini diimplementasikan _Point-to-Point_? (Aplikasi Mhs harus terhubung ke Keuangan, Akademik, Dosen).
>         
>     - Bagaimana jika diimplementasikan _Hub-and-Spoke_ atau _ESB_? (Aplikasi Mhs hanya kirim 1 request "validasi" ke Hub/ESB, lalu Hub/ESB yang akan mengecek ke 3 sistem lainnya).
>