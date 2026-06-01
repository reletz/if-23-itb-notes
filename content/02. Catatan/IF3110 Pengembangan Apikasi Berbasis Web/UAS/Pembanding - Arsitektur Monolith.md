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
> > - Apa itu Monolith?
> >     
> > - Single-Process Monolith?
> >     
> > - Modular Monolith?
> >     
> > - Distributed Monolith?
> >     
> > - Masalah Monolith: Delivery Contention?
> >     
> > - Masalah: Arsitektur vs Organisasi?
> >     
> > - (Conway's Law)
> >     
> > - Kelebihan Monolith?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-11b-Intro-to-Microservices-Arch.pdf (Slide 12-19)
> >     
> 
> > ### Definisi Monolith
> >
> > _Microservices_ sering didiskusikan sebagai alternatif dari arsitektur _monolithic_.
> >
> > **Monolith** adalah sebuah sistem di mana **semua fungsionalitas harus di-deploy bersama-sama** sebagai satu **unit** _**deployment**_ **tunggal**.
> >
> > ### Jenis-Jenis Monolith
> >
> > 1. **Single-Process Monolith:**
> >     
> > 	- Contoh paling umum. Semua kode (UI, *business logic*, *database access*) digabung dan dijalankan sebagai **satu proses tunggal**.
> > 	- Biasanya terhubung ke satu *database* besar.
> > 
> >
> > 2. **Modular Monolith:**
> >     
> > 	- Varian dari *single-process monolith* di mana kode di dalamnya dibagi menjadi **modul-modul terpisah** (misal: modul *Shipping*, modul *Inventory*).
> > 	- Setiap modul bisa dikerjakan secara independen, TAPI **semuanya tetap harus digabung** untuk di-*deploy* sebagai satu proses.
> > 	- Ini adalah arsitektur yang sangat baik, bisa memiliki *database* terpisah per modul atau *database* bersama.
> > 
> >
> > 3. **Distributed Monolith:**
> >     
> > 	- Sistem yang terdiri dari beberapa layanan terdistribusi (terlihat seperti *microservices*), TAPI karena satu dan lain hal (misal: *shared database*, komunikasi yang *tightly coupled*), **seluruh sistem harus di-deploy bersama-sama**.
> > 	- Gagal memberikan kelebihan SOA/Microservices (seperti *independent deployability*) namun memiliki semua kekurangan sistem terdistribusi (kompleksitas, latensi).
> > 	
> >
> > ### Masalah Utama Monolith
> >
> > **Delivery Contention (Perselisihan Pengiriman):**
> >
> > 	- Ini adalah masalah **organisasi**.
> > 		
> > 	- Semakin banyak orang bekerja di _codebase_ yang sama, mereka akan **saling menghalangi** satu sama lain.
> > 		
> > 	- Contoh: Tim A ingin _merilis_ fitur baru, tapi Tim B menemukan _bug_ kritis yang memaksa _deployment_ ditunda. Tim A jadi terhambat.
> > 		
> > 	- _Microservices_ memberikan **batasan yang konkret** (layanan) di mana garis kepemilikan tim dapat ditarik, mengurangi masalah ini.
> > 		
> >
> > **Alignment of Architecture and Organization (Hukum Conway):**
> >
> > - **Model Tradisional (Monolith):** Organisasi dibagi berdasarkan **lapisan teknis**.
> >     
> > 	- Tim Frontend (mengurus UI)
> > 	- Tim Backend (mengurus *Business Logic*)
> > 	- Tim DBA (mengurus *Database*)
> > 	- **Masalah:** Perubahan sederhana (misal: "tambah tombol genre") memerlukan koordinasi dan tiket antar **tiga tim**. Ini sangat lambat.
> > 
> >
> > - **Model Microservice:** Organisasi dibagi berdasarkan **domain bisnis**.
> >     
> > 	- Tim Stock (mengurus UI, *logic*, & DB untuk *Stock*)
> > 	- Tim Purchase (mengurus UI, *logic*, & DB untuk *Purchase*)
> > 	- Tim Profile (mengurus UI, *logic*, & DB untuk *Profile*)
> > 	- **Hasil:** Tim "Profile" dapat mengimplementasikan fitur "tambah tombol genre" **secara independen** tanpa perlu bicara dengan tim lain. Ini sangat cepat.
> > 
> >
> > ### Kelebihan Monolith
> >
> > Monolith bukanlah arsitektur yang buruk. Ia memiliki beberapa kelebihan signifikan:
> >
> > 1. **Topologi Deployment Sederhana:** Jauh lebih mudah dioperasikan. Tidak ada masalah _latency_ jaringan, _service discovery_, dll.
> >     
> > 2. **Alur Kerja Developer Sederhana:** Developer hanya perlu menjalankan satu proses di mesin lokal.
> >     
> > 3. **Monitoring & Testing Sederhana:** _Troubleshooting_ dan _end-to-end testing_ jauh lebih mudah karena semua terjadi dalam satu proses.
> >     
> > 4. **Code Reuse Sederhana:** Jika Anda butuh fungsi dari modul lain, Anda tinggal memanggilnya. Tidak perlu membuat API, _library_, atau menyalin kode.
> >     

> [!cornell] #### Summary
> 
> **Monolith** adalah arsitektur di mana semua fungsionalitas digabung menjadi **satu unit** _**deployment**_ **tunggal**. Variannya termasuk _Single-Process_ (satu proses), _Modular_ (kode terstruktur, tapi _deploy_ tunggal), dan _Distributed Monolith_ (sistem terdistribusi yang gagal _deploy_ mandiri). Masalah utama _monolith_ bersifat **organisasi**, yaitu _**delivery contention**_ (tim saling menghalangi) yang disebabkan oleh struktur tim yang selaras dengan **lapisan teknis** (Frontend, Backend, DBA) bukannya **domain bisnis**. Namun, _monolith_ memiliki **kelebihan besar** dalam hal **kesederhanaan** _deployment_, _monitoring_, _testing_, dan _code reuse_.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Hukum Conway (Conway's Law)
> 
> Diagram di _slide_ 12 adalah ilustrasi sempurna dari "Hukum Conway", yang menyatakan:
> 
> _"Setiap organisasi yang merancang sistem... akan menghasilkan desain yang strukturnya adalah salinan dari struktur komunikasi organisasi tersebut."_
> 
> - Jika Anda memiliki 3 tim (Frontend, Backend, DBA), Anda **pasti** akan menghasilkan arsitektur 3-lapis (_3-tier_) _monolith_, karena begitulah cara tim tersebut harus berkomunikasi.
>     
> - Jika Anda ingin membangun _microservices_, Anda **harus** terlebih dahulu mengubah struktur organisasi Anda menjadi tim-tim kecil yang otonom dan _cross-functional_ (misal: "Tim Shipping" yang berisi _engineer_ frontend, backend, dan DB).
>     
> 
> Inilah mengapa _slide_ 30 menyebut _microservices_ adalah solusi untuk **masalah organisasi**, bukan hanya masalah teknis.