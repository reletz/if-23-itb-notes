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
> > - 3 Model Layanan Cloud?
> >     
> > - Definisi SaaS?
> >     
> > - Definisi PaaS?
> >     
> > - Definisi IaaS?
> >     
> > - Perbandingan Tanggung Jawab?
> >     
> > - On-Premises?
> >     
> > - Tanggung Jawab IaaS?
> >     
> > - Tanggung Jawab PaaS?
> >     
> > - Tanggung Jawab SaaS?
> >     
> > - Contoh SaaS?
> >     
> > - Contoh PaaS?
> >     
> > - Contoh IaaS?
> >     
> > - 3 Model Deployment?
> >     
> > - Public Cloud?
> >     
> > - Private Cloud?
> >     
> > - Hybrid Cloud?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-11a-Cloud-Computing.pdf (Slide 8-12, 14)
> >     
> 
> > ### 3 Model Layanan Cloud
> >
> > Layanan cloud dapat dikategorikan menjadi tiga model utama, sering digambarkan sebagai piramida:
> > 
> > ![[Pasted image 20251113095333.png]]
> >
> > 1. **SaaS (Software as a Service):**
> >     
> > 	- **Definisi:** Model paling abstrak. Konsumen diizinkan untuk **menggunakan aplikasi** milik *provider* yang berjalan di atas infrastruktur *cloud*.
> > 	- **Fokus:** Konsumen hanya perlu memakai *software*. Tidak pusing soal *update*, *server*, atau apapun.
> > 	- **Analogi:** Menyewa kantor *full-service* (sudah ada meja, kursi, internet, resepsionis).
> > 	- **Contoh:** **Dropbox, Salesforce, Gmail**, Google Docs, Office 365.
> >
> > 2. **PaaS (Platform as a Service):**
> > 		
> > 	- **Definisi:** Konsumen diizinkan untuk **men-deploy aplikasi** buatan mereka sendiri ke infrastruktur *cloud*.
> > 	- **Fokus:** *Provider* menyediakan "Platform" (seperti *database*, *runtime* bahasa pemrograman, OS, *web server*). Konsumen fokus pada **kode aplikasi** dan **data** mereka.
> > 	- **Analogi:** Menyewa ruko kosong (sudah ada listrik, air, pondasi). Anda bebas mendesain interior (aplikasi) Anda.
> > 	- **Contoh:** **Google App Engine, Microsoft Azure (App Services)**, Heroku, Vercel.
> > 
> > 3. **IaaS (Infrastructure as a Service):**
> >     
> > 	- **Definisi:** Model paling dasar. Konsumen diizinkan untuk **menyewa sumber daya komputasi mentah** (CPU, *storage*, *network*).
> > 	- **Fokus:** Konsumen memiliki kendali penuh untuk menginstal dan menjalankan *software* apapun, termasuk **Sistem Operasi (OS)**.
> > 	- **Analogi:** Menyewa lahan tanah kosong. Anda harus membangun pondasi, ruko, dan interior sendiri.
> > 	- **Contoh:** **Amazon EC2, Google Compute Engine**, Azure Virtual Machines.
> > 
> >
> > ### Perbandingan Tanggung Jawab (Managed by You vs. Provider)
> >
> > ![[Pasted image 20251113095419.png]]
> >
> > - **On-Premises (Tradisional):**
> >     
> > 	- **Anda *Manage* (Semua):** Networking, Storage, Servers, Virtualization, O/S, Middleware, Runtime, Data, Applications.
> > 
> >
> > - **IaaS:**
> >     
> > 	- **Anda *Manage*:** O/S, Middleware, Runtime, Data, Applications.
> > 	- **Provider *Manage*:** Networking, Storage, Servers, Virtualization.
> > 	
> > - **PaaS:**
> >     
> > 	- **Anda *Manage*:** Applications, Data.
> > 	- **Provider *Manage*:** Runtime, Middleware, O/S, Virtualization, Servers, Storage, Networking.
> >
> >
> > - **SaaS:**
> >     
> > 	- **Anda *Manage*:** (Tidak ada).
> > 	- **Provider *Manage* (Semua):** Networking, Storage, Servers, Virtualization, O/S, Middleware, Runtime, Data, Applications.
> > 
> >
> > ### 3 Model Deployment Cloud
> >
> > 1. **Public Cloud:**
> > 
> >   - Infrastruktur *cloud* tersedia untuk **publik umum**.
> >   - Dimiliki dan dioperasikan oleh *provider* (misal: AWS, GCP, Azure).
> > 
> >
> > 2. **Private Cloud:**
> >     
> > 	- Infrastruktur *cloud* dioperasikan **hanya untuk satu organisasi**.
> > 	- Bisa dikelola internal atau oleh pihak ketiga, dan bisa berlokasi *on-premises* atau *off-premises*.
> > 
> > 3. **Hybrid Cloud:**
> >
> > 	- Komposisi dari dua atau lebih model *cloud* (private, public) yang saling terhubung.
> > 	- Contoh: Organisasi menyimpan data sensitif di *private cloud* (karena regulasi), tetapi menggunakan *public cloud* untuk *web server* yang butuh *elasticity* tinggi.
> > 

> [!cornell] #### Summary
> 
> Layanan cloud ditawarkan dalam 3 model utama: **IaaS** (menyewa infrastruktur dasar seperti VM, Anda _manage_ OS ke atas), **PaaS** (menyewa _platform_ seperti _database_/_runtime_, Anda _manage_ aplikasi & data), dan **SaaS** (menyewa _software_ jadi seperti Gmail, Anda tidak _manage_ infrastruktur apapun). Model-model ini kemudian dapat diterapkan dalam 3 cara: **Public Cloud** (milik umum, seperti AWS/GCP), **Private Cloud** (eksklusif untuk satu organisasi), atau **Hybrid Cloud** (gabungan keduanya).

> [!ad-libitum]- Additional Information
> 
> #### Analogi Pizza as a Service (PaaS)
> 
> Analogi populer untuk membedakan IaaS, PaaS, dan SaaS adalah "Pizza as a Service":
> 
> - On-Premises (Tradisional):
>     
>     Buat pizza dari awal. Anda harus punya dapur, oven, adonan, saus, topping, meja makan, dan minuman. Anda kerjakan semuanya sendiri.
>     
> - IaaS (Infrastructure as a Service):
>     
>     Pizza "Take and Bake". Anda beli pizza beku dari toko (infrastruktur: oven, listrik, meja makan disediakan toko). Anda bawa pulang, Anda yang manage proses memasak (O/S, Runtime) dan penyajiannya (Data, Aplikasi).
>     
> - PaaS (Platform as a Service):
>     
>     Pesan antar pizza. Anda memesan pizza (Aplikasi). Provider mengurus pembuatan dan pengantaran (Platform: runtime, OS, server, dll). Anda hanya perlu manage meja makan dan minuman (Data).
>     
> - SaaS (Software as a Service):
>     
>     Makan malam di restoran pizza. Anda tidak manage apapun. Anda hanya datang dan menggunakan layanan (Aplikasi) yang sudah disediakan lengkap (Infrastruktur, Platform, Data).
>