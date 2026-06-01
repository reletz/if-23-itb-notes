---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Teorema CAP dan Spektrum Model Konsistensi
> 
> > ## Questions/Cues
> >
> > - Apa itu Teorema CAP?
> >     
> > - Siapa yang mengajukan?
> >     
> > - 3 Properti CAP?
> >     
> > - (1) Consistency?
> >     
> > - (2) Availability?
> >     
> > - (3) Partition Tolerance?
> >     
> > - Aturan CAP?
> >     
> > - Mengapa P wajib?
> >     
> > - Pilihan di dunia nyata? (CP vs AP)
> >     
> > - Contoh sistem CA?
> >     
> > - Contoh sistem CP?
> >     
> > - Contoh sistem AP?
> >     
> > - Apa itu 'Consistency Model'?
> >     
> > - Apa itu 'Strong' vs 'Weak'?
> >     
> > - Model Kuat: Linearizable?
> >     
> > - Model Kuat: Sequential?
> >     
> > - Perbedaan Linearizable vs Sequential?
> >     
> > - Model Lemah: Causal?
> >     
> > - Model Lemah: Eventual?
> >     
> >
> > ## Reference Points
> >
> > - Slides 20-31
>  
> >
> > ### Teorema CAP
> >
> > - Diajukan oleh **Eric Brewer** (1999). Ini adalah "hukum" fundamental dalam desain sistem terdistribusi.
> >     
> >
> > - Teorema ini menyatakan bahwa sistem terdistribusi untuk penyimpanan data hanya dapat **memilih 2 dari 3** properti berikut:
> >     
> > 	1.  **C (Consistency / Konsistensi):** *Strong Consistency*. Setiap *read request* akan menerima data *write* terakhir yang paling *up-to-date*. Semua node melihat data yang sama pada saat yang sama.
> > 	2.  **A (Availability / Ketersediaan):** Sistem selalu merespons setiap permintaan (yang tidak gagal). Respons dijamin *non-error*, meskipun datanya mungkin bukan yang terbaru (*stale*).
> > 	3.  **P (Partition Tolerance / Toleransi Partisi):** Sistem tetap dapat beroperasi (merespons) meskipun terjadi *network partition* (jaringan terputus antar node).
> > 	
> > ![[Pasted image 20251028113503.png]]
> > 
> > ### Pilihan di Dunia Nyata: CP vs. AP
> >
> > - Di jaringan nyata seperti WAN/Internet, _network partition_ (P) **tidak bisa dihindari** (lihat Fallacy #1). "P" adalah _kenyataan_, bukan _pilihan_.
> >     
> >
> > - Oleh karena itu, pilihan desainer sistem di dunia nyata adalah antara **CP** atau **AP**:
> >     
> >
> > 	- **Sistem CA (Consistency + Availability):** Mengorbankan Toleransi Partisi.
> > 	    
> > 	  * Contoh: Database relasional tunggal (non-terdistribusi) atau protokol 2PC (Two-Phase Commit) di jaringan yang sangat andal (misal: LAN). *Tidak cocok untuk internet*.
> > 	
> > 	- **Sistem CP (Consistency + Partition Tolerance):** Mengorbankan Ketersediaan.
> > 	    
> > 	  * **Strategi:** Saat terjadi partisi, sistem akan **berhenti merespons** (menjadi *unavailable*) untuk menghindari data yang tidak konsisten.
> > 	  * Contoh: Algoritma konsensus (Paxos, Raft), sistem perbankan.
> > 	
> >	
> > 	- **Sistem AP (Availability + Partition Tolerance):** Mengorbankan Konsistensi (kuat).
> > 	    
> > 	  * **Strategi:** Saat terjadi partisi, sistem **tetap merespons** (tetap *available*), meskipun data yang dikembalikan mungkin *stale* (kedaluwarsa). Sistem akan menggunakan *eventual consistency*.
> > 	  * Contoh: Amazon DynamoDB, Cassandra, Gossip protocols, DNS.
> > 
> > ### Consistency Model (Spektrum Konsistensi)
> >
> > "Consistency" bukanlah biner (ya/tidak), melainkan sebuah **spektrum** dari yang terkuat hingga terlemah.
> > 
> > ![[Pasted image 20251028113700.png]]
> >
> > 1. **Strong Consistency Models (Model Kuat):**
> >     
> > 	  * **Linearizable Consistency:** Paling kuat. Setiap operasi terlihat dieksekusi **atomic** dan **instantaneous** (seketika). Urutannya harus sesuai dengan *real-time ordering* (jika A selesai sebelum B mulai, efek A harus terlihat oleh B).
> > 	
> > 	  * **Sequential Consistency:** Sedikit lebih lemah dari Linearizable. Operasi terlihat *atomic*, dan semua node setuju pada *satu urutan* global, TAPI urutan itu tidak harus sesuai *real-time*.
> > 	 
> > 2. **Weak Consistency Models (Model Lemah):**
> > 	  * **Causal Consistency:** Hanya menjamin urutan *happened-before* (sebab-akibat). Jika A $\rightarrow$ B, maka B pasti melihat efek A. Operasi yang *concurrent* (tidak ada hubungan sebab-akibat) boleh terlihat dalam urutan berbeda oleh node berbeda.
> > 	
> > 	  * **Eventual Consistency:** Paling lemah. Jaminan bahwa *jika tidak ada update baru* untuk sementara waktu, semua node *pada akhirnya* (eventually) akan memiliki nilai yang sama (konvergen).
> > 

> [!cornell] #### Summary
> 
> **Teorema CAP (Brewer) menyatakan sistem terdistribusi hanya bisa memilih dua dari tiga properti:** _**Consistency (C)**_**,** _**Availability (A)**_**, atau** _**Partition Tolerance (P)**_**. Karena (P) adalah keharusan di dunia nyata, desainer harus memilih antara sistem** _**CP**_ **(mengutamakan konsistensi, mengorbankan ketersediaan) atau** _**AP**_ **(mengutamakan ketersediaan, mengorbankan konsistensi). "Konsistensi" sendiri adalah sebuah spektrum, mulai dari** _**Linearizable**_ **(paling kuat dan mahal) hingga** _**Eventual Consistency**_ **(paling lemah dan cepat).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Linearizable vs. Sequential (Slide 29)
> 
> - Diagram di slide 29 adalah contoh sempurna.
>     
> - **Mengapa Tidak Linearizable?**
>     
>     1. Client 1 melakukan `WRITE(X:10)` ke Node A (T1).
>         
>     2. Node A selesai menulis dan membalas ke Client 1 (T3).
>         
>     3. _Setelah itu_, Client 2 melakukan `READ(X)` ke Node C (T4).
>         
>     4. Node C (yang belum menerima update dari A) mengembalikan nilai lama (misal, X=5) ke Client 2 (T6).
>         
>     
>     - Ini **melanggar Linearizability** karena operasi `READ(X)` (T4-T6) secara _real-time_ terjadi _setelah_ operasi `WRITE(X:10)` (T1-T3) selesai. Read seharusnya melihat nilai baru.
>         
> - **Mengapa (Mungkin) Sequential?**
>     
>     - Sistem ini _bisa_ jadi _Sequential Consistent_ jika semua node _setuju_ pada satu _urutan sejarah_ (history) global, misalnya: `READ(X) $\rightarrow$ WRITE(X:10)`.
>         
>     - Meskipun urutan ini tidak sesuai _real-time_, ini adalah urutan yang valid secara sekuensial dan bisa dilihat oleh semua node.
>         
> 
> #### Pendalaman: Client-Centric Consistency (Slide 28)
> 
> - Banyak model lemah yang bersifat "Client-Centric", artinya jaminan konsistensi hanya berlaku untuk _satu sesi client_. Ini jauh lebih mudah diimplementasikan.
>     
> - Contoh (dari slide 30):
>     
>     - **Monotonic Reads:** Jika Anda membaca nilai X, lalu membaca X lagi, Anda dijamin tidak akan pernah melihat nilai X yang _lebih lama_ dari yang pertama. (Anda hanya melihat nilai yang sama atau lebih baru).
>         
>     - **Read Your Writes:** Jika Anda _menulis_ nilai X=10, lalu Anda _membaca_ X, Anda dijamin akan melihat X=10 (atau yang lebih baru), bukan nilai lama. (Sangat intuitif untuk pengguna).
>         
>     - **Writes Follow Reads:** Jika Anda _membaca_ X=5, lalu Anda _menulis_ X=10, operasi tulis Anda dijamin terjadi _setelah_ operasi baca X=5.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Artikel:** "CAP Twelve Years Later: How the 'Rules' Have Changed" oleh Eric Brewer. (Penjelasan modern dari si penemu tentang bagaimana CAP sering disalahpahami).
>     
> - **Jepsen.io:** [https://jepsen.io/consistency](https://jepsen.io/consistency "null") (Situs oleh Kyle Kingsbury yang menguji database terdistribusi untuk melihat apakah mereka _benar-benar_ memenuhi jaminan konsistensi yang mereka iklankan).
>