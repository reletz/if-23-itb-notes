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
> > - Motivasi (Masalah Awal)?
> >     
> > - Risiko _Over-provisioning_?
> >     
> > - Risiko _Under-provisioning_?
> >     
> > - Solusi Cloud?
> >     
> > - Estimasi _real-world_?
> >     
> > - Definisi Cloud (NIST)?
> >     
> > - 5 Karakteristik Esensial?
> >     
> > - Rapid Elasticity?
> >         
> > - Measured Service?
> >         
> > - On-Demand Self-Service?
> >         
> > - Ubiquitous Network Access?
> >         
> > - Resource Pooling?
> >         
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-11a-Cloud-Computing.pdf (Slide 3-7)
> >     
> 
> > ### Motivasi: Masalah Pengembangan Tradisional
> > 
> > Jika kita punya ide inovatif, secara tradisional kita menghadapi masalah besar:
> > 
> > 1. Perlu **modal awal yang besar** untuk membeli _hardware_ (server, _storage_).
> >     
> > 2. Perlu **SDM (manusia) berbakat** untuk mengoperasikan dan memelihara sistem tersebut.
> >     
> > 
> > Ini mengarah ke dua risiko utama dalam perencanaan kapasitas:
> > 
> > 1. **Risiko Over-provisioning (Kapasitas Berlebih):**
> > 
> > 
> > 	- Kita menyediakan kapasitas (misal: beli 100 server) untuk mengantisipasi _peak load_ (beban puncak).
> > 	    
> > 	- Kenyataannya, _demand_ rata-rata jauh di bawah _peak_.
> > 	    
> > 	- Area yang diarsir (di bawah garis kapasitas, di atas _demand_) adalah **kapabilitas yang tidak terpakai** (biaya terbuang).
> > 	    
> > 	- Risiko: Sistem mungkin tidak sepopuler yang diharapkan.
> >     
> > 
> > 2. **Risiko Under-provisioning (Kapasitas Kurang):**
> > 
> > 
> > 	- Kita menyediakan kapasitas di bawah _peak load_ (misal: hanya 50 server).
> > 	    
> > 	- Saat _demand_ melonjak, kapasitas kita tidak cukup.
> > 	    
> > 	- Area yang diarsir (di atas garis kapasitas) adalah **permintaan yang tidak terlayani**.
> > 	    
> > 	- Risiko: Kehilangan potensi pengguna dan pendapatan.
> >     
> > 
> > **Solusi Cloud Computing:**
> > 
> > Cloud memungkinkan kita untuk "memulai dari yang kecil dan tumbuh sesuai kebutuhan" (start small and grow as needed). Kita tidak perlu menebak kapasitas di awal.
> > 
> > **Estimasi Real-world:**
> > 
> > - Rata-rata utilisasi (pemakaian) server di _data center_ tradisional hanya **5% - 20%**.
> >     
> > - _Peak load_ bisa 2 hingga 10 kali lipat dari _load_ rata-rata.
> >     
> > 
> > ### Definisi Cloud Computing (NIST)
> > 
> > Menurut **US NIST** (National Institute of Standards and Technology), _Cloud Computing_ adalah:
> > 
> > "Sebuah model untuk memungkinkan **akses jaringan yang nyaman dan** _**on-demand**_ ke **kumpulan bersama (**_**shared pool**_**)** dari **sumber daya komputasi yang dapat dikonfigurasi** (misal: jaringan, server, _storage_, aplikasi, dan layanan) yang dapat **dengan cepat disediakan (**_**provisioned**_**) dan dilepaskan** dengan **upaya manajemen atau interaksi** _**provider**_ **layanan yang minimal**."
> > 
> > ### 5 Karakteristik Esensial Cloud (NIST)
> > 
> > 
> > 1. **Rapid Elasticity (Elastisitas Cepat):**
> >     
> >     Kemampuan untuk menyesuaikan skala sumber daya (naik atau turun) secara cepat dan elastis sesuai kebutuhan demand. Jika traffic naik, server ditambah; jika turun, server dikurangi.
> >     
> > 2. **Measured Service (Layanan Terukur):**
> >     
> >     Aspek-aspek layanan cloud dikontrol dan dimonitor oleh provider. Ini memungkinkan billing model pay-as-you-go (bayar sesuai pemakaian), mirip meteran listrik atau air.
> >     
> > 3. **On-Demand Self-Service (Layanan Mandiri On-Demand):**
> >     
> >     Konsumen dapat secara mandiri menyediakan sumber daya komputasi (misal: membuat server baru) sesuai kebutuhan, tanpa memerlukan interaksi manusia dengan provider (misal: melalui web dashboard atau API).
> >     
> > 4. **Ubiquitous Network Access (Akses Jaringan Di Mana Saja):**
> >     
> >     Kapabilitas provider tersedia melalui jaringan (internet) dan dapat diakses melalui mekanisme standar oleh client apapun (misal: laptop, HP, tablet).
> >     
> > 5. **Resource Pooling (Pengumpulan Sumber Daya):**
> >     
> >     Provider melayani banyak konsumen (multi-tenant) menggunakan model pooling. Sumber daya fisik (seperti server, storage) dikumpulkan dan dibagikan secara dinamis kepada konsumen yang berbeda sesuai demand, tanpa konsumen tahu lokasi fisik pastinya.
> >     

> [!cornell] #### Summary
> 
> **Cloud Computing** adalah sebuah model penyediaan sumber daya IT (_on-demand_ via jaringan) yang memecahkan masalah klasik **over-provisioning** (biaya terbuang) dan **under-provisioning** (kehilangan pengguna) pada infrastruktur tradisional. Menurut NIST, model ini wajib memiliki **5 karakteristik esensial**: **Rapid Elasticity** (skala naik/turun otomatis), **Measured Service** (bayar sesuai pakai), **On-Demand Self-Service** (menyediakan layanan sendiri via _dashboard_), **Ubiquitous Network Access** (diakses dari mana saja), dan **Resource Pooling** (_multi-tenant_, sumber daya dipakai bersama).

> [!ad-libitum]- Additional Information
> 
> #### Analogi: Cloud vs. Listrik PLN (vs. Genset Pribadi)
> 
> - **Infrastruktur Tradisional (On-Premises):** Ibarat Anda **memasang genset pribadi** di rumah.
>     
>     - **Masalah:** Anda harus beli genset (modal besar), merekrut teknisi untuk merawatnya (SDM), dan membeli bahan bakarnya. Jika genset terlalu besar (_over-provisioning_), Anda rugi bahan bakar. Jika terlalu kecil (_under-provisioning_), listrik di rumah Anda mati saat beban puncak.
>         
> - **Cloud Computing:** Ibarat Anda **berlangganan listrik dari PLN**.
>     
>     - **On-Demand Self-Service:** Anda tinggal menyalakan saklar (Self-Service) kapanpun Anda butuh (On-Demand).
>         
>     - **Ubiquitous Network Access:** Listrik tersedia di semua stop kontak (Jaringan).
>         
>     - **Measured Service:** Anda hanya bayar sesuai yang tertera di meteran (Terukur).
>         
>     - **Rapid Elasticity:** Jika Anda menyalakan AC (beban naik), PLN langsung sanggup memasok daya lebih besar. Anda tidak perlu pusing.
>         
>     - **Resource Pooling:** PLN memiliki satu pembangkit listrik raksasa (_resource pool_) yang dipakai bersama-sama oleh jutaan rumah (_multi-tenant_).
>         
> 
> #### Topik Teknis: Multi-tenancy
> 
> _Resource Pooling_ adalah inti dari model bisnis cloud. _Provider_ bisa efisien karena satu server fisik yang sama dapat digunakan untuk menjalankan _Virtual Machine_ (VM) dari puluhan atau ratusan konsumen yang berbeda. Selama isolasi antar-VM aman, ini adalah skenario _win-win_: _provider_ hemat biaya _hardware_, konsumen bayar murah.