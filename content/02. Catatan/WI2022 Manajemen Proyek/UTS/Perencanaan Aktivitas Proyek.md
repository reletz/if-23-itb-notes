---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[WI2022 Manajemen Proyek]]

> [!cornell] Perencanaan Aktivitas Proyek (Activity Definition & Sequencing)
> 
> > ## Questions/Cues
> >
> > - Apa itu Manajemen Waktu?
> >     
> > - Apa itu Activity Definition?
> >     
> > - Apa saja outputnya?
> >     
> > - Apa itu Activity Sequencing?
> >     
> > - Apa jenis-jenis dependensi?
> >     
> > - Apa itu Network Diagram?
> >     
> > - Apa beda AOA dan AON?
> >     
> >
> > ## Reference Points
> >
> > - ManPro-06-Project-Time-Management.pdf (Slides 1-11)
> >     
> 
> > ### Apa itu Manajemen Waktu Proyek?
> >
> > **Manajemen Waktu Proyek** adalah kumpulan proses yang diperlukan untuk memastikan penyelesaian proyek tepat waktu. Ini melibatkan pendefinisian aktivitas, pengurutan, estimasi sumber daya dan durasi, serta pengembangan dan pengendalian jadwal.
> >
> > - **6 Proses Utama:**
> >     
> >     1. **Activity Definition:** Mengidentifikasi pekerjaan spesifik.
> >         
> >     2. **Activity Sequencing:** Mengidentifikasi hubungan antar pekerjaan.
> >         
> >     3. **Activity Resource Estimating:** Memperkirakan sumber daya yang dibutuhkan.
> >         
> >     4. **Activity Duration Estimating:** Memperkirakan waktu yang dibutuhkan.
> >         
> >     5. **Schedule Development:** Menyusun jadwal proyek.
> >         
> >     6. **Schedule Control:** Mengendalikan perubahan pada jadwal.
> >         
> >
> > ### Proses 1: Activity Definition (Definisi Aktivitas)
> >
> > Ini adalah proses mengidentifikasi dan mendokumentasikan semua aktivitas atau tugas spesifik yang harus dilakukan untuk menghasilkan _deliverables_ proyek. Aktivitas adalah elemen pekerjaan yang diambil dari **Work Breakdown Structure (WBS)**.
> >
> > - **Output Utama:**
> >     
> >     - **Activity List:** Daftar komprehensif semua aktivitas terjadwal. Setiap aktivitas memiliki ID unik dan deskripsi pekerjaan.
> >         
> >     - **Activity Attributes:** Informasi tambahan untuk setiap aktivitas, seperti pendahulu (_predecessor_), penerus (_successor_), hubungan logis, kebutuhan sumber daya, dan asumsi.
> >         
> >     - **Milestone List:** Daftar _milestone_, yaitu peristiwa penting dalam proyek yang tidak memiliki durasi (misalnya: "Persetujuan Desain Selesai", "Kontrak Ditandatangani"). Milestone berfungsi sebagai titik pemeriksaan kemajuan.
> >         
> >
> > ### Proses 2: Activity Sequencing (Pengurutan Aktivitas)
> >
> > Ini adalah proses mengidentifikasi dan mendokumentasikan hubungan atau dependensi logis antar aktivitas. Ini menentukan urutan kerja yang paling efisien.
> >
> > ### Jenis-jenis Dependensi (Hubungan Ketergantungan)
> >
> > 1. **Mandatory Dependencies (Hard Logic):** Ketergantungan yang melekat pada sifat pekerjaan itu sendiri. Contoh: Tembok tidak bisa dicat sebelum selesai dibangun.
> >     
> > 2. **Discretionary Dependencies (Soft Logic):** Ketergantungan yang ditentukan oleh tim proyek berdasarkan praktik terbaik atau preferensi. Contoh: Tim memutuskan untuk menyelesaikan semua desain UI sebelum memulai pengembangan frontend, meskipun beberapa bisa berjalan paralel.
> >     
> > 3. **External Dependencies:** Ketergantungan pada pihak atau faktor di luar proyek. Contoh: Pengembangan tidak bisa dimulai sebelum mendapatkan izin dari pemerintah.
> >     
> >
> > ### Tipe Hubungan Antar Tugas
> >
> > - **Finish-to-Start (FS):** Paling umum. Aktivitas B tidak bisa dimulai sebelum Aktivitas A selesai.
> >     
> > - **Start-to-Start (SS):** Aktivitas B tidak bisa dimulai sebelum Aktivitas A dimulai.
> >     
> > - **Finish-to-Finish (FF):** Aktivitas B tidak bisa selesai sebelum Aktivitas A selesai.
> >     
> > - **Start-to-Finish (SF):** Paling jarang. Aktivitas B tidak bisa selesai sebelum Aktivitas A dimulai.
> >     
> >
> > ### Project Network Diagrams (Diagram Jaringan Proyek)
> >
> > Ini adalah representasi grafis dari alur kerja proyek yang menunjukkan urutan dan dependensi antar aktivitas. Ada dua metode utama:
> >
> > 1. **Activity-on-Arrow (AOA):**
> >     
> > 	- Aktivitas direpresentasikan oleh **panah (arrow)**.
> > 	- Node (lingkaran) merepresentasikan titik awal dan akhir (event).
> > 	- Merupakan metode yang lebih tua.
> > 
> >
> > 2. **Activity-on-Node (AON) / Precedence Diagramming Method (PDM):**
> >     
> > 	- Aktivitas direpresentasikan oleh **kotak (node)**.
> > 	- Panah menunjukkan hubungan atau dependensi antar aktivitas.
> > 	- Ini adalah metode yang paling banyak digunakan dalam perangkat lunak manajemen proyek modern.
> >

> [!cornell] #### Summary
> 
> Manajemen Waktu Proyek dimulai dengan memecah WBS menjadi daftar pekerjaan spesifik (Activity Definition) yang dilengkapi dengan atribut detail dan milestone. Selanjutnya, setiap pekerjaan diurutkan berdasarkan hubungan logisnya (Activity Sequencing) menggunakan berbagai jenis dependensi (mandatory, discretionary, external) dan divisualisasikan dalam sebuah Diagram Jaringan Proyek (seperti AON atau AOA) untuk memetakan alur kerja proyek secara keseluruhan.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Menggunakan Tipe Dependensi yang Berbeda?
> 
> - **FS (Finish-to-Start):** Gunakan untuk sebagian besar tugas berurutan. Contoh: `Uji Coba Aplikasi` (B) baru bisa dimulai setelah `Pengembangan Aplikasi` (A) selesai.
>     
> - **SS (Start-to-Start):** Berguna untuk aktivitas yang bisa tumpang tindih. Contoh: `Penulisan Dokumentasi` (B) bisa dimulai bersamaan dengan `Pengujian Fitur` (A). Mungkin ada jeda waktu (lag), misal dokumentasi dimulai 2 hari setelah pengujian.
>     
> - **FF (Finish-to-Finish):** Berguna saat penyelesaian satu tugas bergantung pada penyelesaian tugas lain. Contoh: `Instalasi Sistem di Lokasi` (B) tidak bisa dianggap selesai sampai `Pengiriman Perangkat Keras` (A) selesai.
>     
> 
> #### Leads and Lags
> 
> - **Lag (Jeda):** Waktu tunggu antara dua aktivitas. Contoh: Setelah mengecat tembok (A), perlu ada jeda (lag) 24 jam sebelum memasang furnitur (B). Ini direpresentasikan sebagai `FS + 24 jam`.
>     
> - **Lead (Percepatan):** Tumpang tindih antara dua aktivitas. Contoh: Tim bisa mulai mengedit bab 1-5 sebuah buku (B) saat penulisan bab 6 (A) baru dimulai. Ini direpresentasikan sebagai `FS - 5 hari`.
>