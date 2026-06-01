---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Model, Batasan, dan Masalah Fundamental ST
> 
> > ## Questions/Cues
> > 
> > - Apa batasan ST?
> >     
> > - Apa itu SLA?
> >     
> > - Apa peran Abstraksi & Model?
> >     
> > - Apa itu Two Generals Problem?
> >     
> > - Mengapa Two Generals tidak ada solusi?
> >     
> > - Solusi Two Generals?
> >     
> > - Apa itu Byzantine Generals Problem?
> >     
> > - Perbedaan dengan Two Generals?
> >     
> > - Solusi Byzantine Generals?
> >     
> > - Apa itu Byzantine Fault Tolerance?
> >     
> > - Apa saja model ST?
> >     
> > - Mengapa koordinasi sulit?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 13-22
> >     
> 
> > ### Batasan Sistem Terdistribusi
> > 
> > Kinerja dan keandalan sistem terdistribusi selalu dibatasi oleh dua faktor utama:
> > 
> > 1. **Jumlah Node:** Semakin banyak node (komputer) independen, semakin besar kemungkinan terjadi kegagalan pada salah satunya. Selain itu, semakin banyak node, semakin banyak kebutuhan komunikasi antar node.
> >     
> > 2. **Jarak Antar Node:** Semakin jauh jarak fisik/geografis antar node, semakin lama waktu komunikasi (semakin tinggi latensinya). Ini adalah batasan fisika (kecepatan cahaya) yang tidak bisa dihindari.
> >     
> > 
> > ### SLA, Abstraksi, dan Model
> > 
> > - **SLA (Service Level Agreement):** Sebuah jaminan layanan yang diberikan sistem. Contoh: "Jika data ditulis, seberapa cepat data itu bisa diakses di lokasi lain?" atau "Jika ada komponen fail, apa dampaknya?"
> >     
> > - **Abstraksi:** Cara untuk membuat sistem lebih mudah ditangani dengan menghilangkan detail-detail yang tidak penting. Contoh: kita memodelkan sistem hanya sebagai "node/proses" dan "link/komunikasi", tanpa memedulikan OS, hardware, keyboard, dll.
> >     
> > - **Model:** Penyederhanaan sistem yang hanya berisi properti penting. Ada trade-off:
> >     
> >     - Abstraksi/model yang terlalu sederhana: Mudah dipahami, tapi kinerja sistem nyata bisa jadi buruk.
> >         
> >     - Abstraksi/model dengan jaminan lemah: Sulit dipahami, tapi bisa memberikan kinerja yang lebih baik.
> >         
> > 
> > ### Masalah Fundamental: Two Generals Problem
> > 
> > Ini adalah masalah klasik yang menunjukkan sulitnya mencapai kesepakatan (konsensus) dalam jaringan yang tidak andal.
> > 
> > - **Skenario:** Dua jenderal (A dan B) mengepung kota. Mereka akan menang HANYA jika menyerang serentak. Mereka berkomunikasi via kurir. Kurir bisa ditangkap musuh (pesan tidak sampai).
> >     
> > - **Masalah:** Bagaimana A dan B bisa 100% yakin bahwa mereka akan menyerang pada waktu yang sama?
> >     
> > - **Contoh Percobaan Solusi:**
> >     
> >     1. A kirim pesan: "Serang jam 9". (A tidak tahu apakah pesan sampai)
> >         
> >     2. B menerima dan membalas: "OK, serang jam 9". (Sekarang B tidak tahu apakah balasannya sampai. A belum pasti B setuju)
> >         
> >     3. A membalas balasan: "OK, saya terima OK kamu". (Sekarang A tidak tahu apakah B menerima konfirmasi ini. B masih ragu)
> >         
> >     4. ...dan seterusnya. Ini berlanjut tanpa akhir.
> >         
> > - **Kesimpulan:** **Tidak ada solusi deterministik** (yang pasti berhasil 100%) untuk masalah ini jika media komunikasi tidak andal.
> >     
> > - **Solusi Probabilistik:** Mengirim _n_ kurir dengan pesan yang sama. Jika probabilitas 1 kurir tertangkap adalah _p_, probabilitas _semua_ kurir tertangkap adalah $p^n$. Ini memperkecil kemungkinan gagal, tapi menambah biaya dan _tidak pernah_ menjamin 100%.
> >     
> > 
> > ### Masalah Fundamental: Byzantine Generals Problem
> > 
> > Ini adalah masalah konsensus yang lebih rumit, di mana media komunikasi _andal_ (kurir pasti sampai), tetapi beberapa partisipan (jenderal) mungkin _berkhianat_ (malicious/Byzantine).
> > 
> > - **Skenario:** _n_ jenderal harus sepakat (misal: "serang" atau "bertahan"). Ada _t_ jenderal yang berkhianat. Jenderal pengkhianat bisa mengirim pesan berbeda ke jenderal yang berbeda (bilang "serang" ke A, tapi bilang "bertahan" ke B). Penerima dapat mendeteksi sumber pesan (tahu siapa yang mengirim).
> >     
> > - **Masalah:** Bagaimana para jenderal yang jujur (loyal) bisa mencapai satu keputusan yang sama, meskipun ada pengkhianat yang mencoba mengacaukan?
> >     
> > - **Contoh Kegagalan (Bukan Solusi):** 5 jenderal (n=5). 2 loyal kirim "serang", 2 loyal kirim "bertahan". 1 pengkhianat kirim "serang" ke 2 jenderal pertama, dan "bertahan" ke 2 jenderal lainnya. Hasilnya: 2 jenderal melihat (Serang, Serang, Serang, Bertahan, Bertahan) $\rightarrow$ Serang. 2 jenderal lain melihat (Serang, Serang, Bertahan, Bertahan, Bertahan) $\rightarrow$ Bertahan. Konsensus gagal.
> >     
> > - **Solusi (Lamport, Shostak, Pease):** Dikenal sebagai **Byzantine Fault Tolerance (BFT)**. Sebuah sistem dengan _n_ proses (jenderal) dapat mentoleransi _t_ pengkhianat (proses malicious) **jika dan hanya jika** $n \ge 3t + 1$.
> >     
> >     - Artinya, untuk mentoleransi 1 pengkhianat, Anda butuh minimal 4 proses ($n \ge 3(1)+1$).
> >         
> >     - Untuk mentoleransi 2 pengkhianat, Anda butuh minimal 7 proses ($n \ge 3(2)+1$).
> >         
> > 
> > ### Model Sistem Terdistribusi
> > 
> > Solusi untuk sebuah masalah sangat bergantung pada _model_ atau asumsi yang kita buat tentang sistem, seperti:
> > 
> > - **Komunikasi:** Apakah reliable (pasti sampai) atau unreliable (bisa hilang)?
> >     
> > - **Proses:** Apakah benign (jujur tapi bisa gagal/crash) atau malicious (berkhianat/Byzantine)?
> >     
> > - **Timing/Order:** Apakah ada batasan waktu respon? Apakah urutan pesan dijamin?
> >     

> [!cornell] #### Summary
> 
> **Sistem terdistribusi dibatasi oleh** _**jumlah node**_ **dan** _**jarak**_**, yang memengaruhi keandalan dan latensi. Untuk mengelolanya, kita menggunakan** _**abstraksi**_ **dan** _**model**_**. Namun, mencapai konsensus sangat sulit, seperti ditunjukkan oleh** _**Two Generals Problem**_ **(mustahil di jaringan tidak andal) dan** _**Byzantine Generals Problem**_ **(membutuhkan** $n \ge 3t+1$ **proses untuk mengatasi** _**t**_ **pengkhianat). Solusi yang kita rancang sangat bergantung pada model asumsi kita (misalnya, apakah jaringan andal atau proses bisa berkhianat).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Model Sistem Sinkron vs. Asinkron
> 
> Catatan utama menyebutkan model "Timing/Order". Ini bisa dipecah menjadi dua model utama:
> 
> 1. **Synchronous System (Sistem Sinkron):** Asumsi yang _kuat_. Mengasumsikan ada batasan waktu yang pasti (bounded) untuk pengiriman pesan dan eksekusi proses. Jika sebuah node tidak merespons dalam X milidetik, kita bisa _yakin_ node itu _fail_ (crash). Ini sangat menyederhanakan desain, tetapi tidak realistis di dunia nyata (internet).
>     
> 2. **Asynchronous System (Sistem Asinkron):** Asumsi yang _lemah_ (dan lebih realistis). Tidak ada batasan waktu. Pesan bisa tertunda tanpa batas (arbitrarily long time), dan proses bisa berjalan lambat. Kita _tidak pernah_ bisa membedakan antara node yang lambat dan node yang _fail_.
>     
> 
> - **Hasil Teoretis Penting (FLP Impossibility):** Sebuah paper terkenal oleh Fischer, Lynch, dan Paterson (FLP) membuktikan bahwa **konsensus deterministik** _**tidak mungkin**_ **dicapai dalam sistem asinkron jika ada** _**minimal satu**_ **proses yang gagal (crash failure).**
>     
> - **Implikasi:** Karena dunia nyata bersifat asinkron, algoritma konsensus praktis (seperti Paxos atau Raft) harus menggunakan _randomization_ atau _timeout_ (yang melanggar model asinkron murni) untuk _bisa_ mencapai konsensus.
>     
> 
> #### Pendalaman: Implementasi BFT (PBFT)
> 
> Rumus $n \ge 3t+1$ adalah syarat _teoretis_. Bagaimana implementasi praktisnya?
> 
> - **Practical Byzantine Fault Tolerance (PBFT):** Sebuah algoritma terkenal oleh Castro dan Liskov.
>     
> - **Ide Utama:** Menggunakan protokol multi-tahap untuk memastikan semua node jujur setuju pada urutan operasi, bahkan jika _leader_ (pemimpin) berkhianat.
>     
> - **Fase-fase (Sangat Disederhanakan):**
>     
>     1. Client mengirim request ke node Leader.
>         
>     2. Leader menyebarkan request ke semua node lain (fase **pre-prepare**).
>         
>     3. Semua node saling menyebarkan pesan "saya setuju" (fase **prepare**). Sebuah node baru akan "commit" jika menerima $2t+1$ pesan "prepare" (ini membuktikan cukup banyak node jujur yang setuju).
>         
>     4. Semua node saling menyebarkan pesan "saya commit" (fase **commit**).
>         
>     5. Node mengeksekusi request dan membalas ke client. Client akan menunggu $t+1$ balasan yang identik sebagai bukti konsensus.
>         
> - **Relevansi:** Algoritma ini (dan variasinya) adalah dasar dari banyak sistem _blockchain_ modern (terutama _permissioned blockchains_ seperti Hyperledger Fabric).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Paper FLP:** "Impossibility of Distributed Consensus with One Faulty Process" oleh Fischer, Lynch, Paterson.
>     
> - **Paper PBFT:** "Practical Byzantine Fault Tolerance" oleh Miguel Castro dan Barbara Liskov.
>