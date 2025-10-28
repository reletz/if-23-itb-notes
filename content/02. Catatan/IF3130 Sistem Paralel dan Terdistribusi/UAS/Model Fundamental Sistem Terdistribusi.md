---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Model Fundamental Sistem Terdistribusi (Asumsi)
> 
> > ## Questions/Cues
> >
> > - Apa itu Model Sistem?
> >     
> > - Apa implikasi ST? (No shared memory, dll)
> >     
> > - Apa itu Model Node?
> >     
> > - 3 Model Kegagalan Node?
> >     
> > - (1) Crash failure?
> >     
> > - (2) Crash-recovery?
> >     
> > - (3) Byzantine?
> >     
> > - Model Komunikasi?
> >     
> > - Reliable vs Unreliable?
> >     
> > - Apa itu Network Partition?
> >     
> > - Model Waktu (Timing)?
> >     
> > - (1) Synchronous?
> >     
> > - (2) Asynchronous?
> >     
> > - Mengapa Async sulit? (Failure detection)
> >     
> > - False Positive vs False Negative?
> >     
> > - Apa itu Logical Clock?
> >     
> > - Aturan Lamport Timestamps?
> >     
> > - Apa itu 'happened-before'?
> >     
> >
> > ## Reference Points
> >
> > - Slides 2-12, 14
> >     
> 
> > ### Model Sistem Terdistribusi
> >
> > **Model Sistem** adalah sekumpulan asumsi yang kita gunakan terhadap bagaimana perilaku _node_ (komputer) dan _jaringan_ (komunikasi). Ini adalah fondasi untuk merancang algoritma.
> >
> > ### Implikasi Sistem Terdistribusi
> >
> > - **Tidak ada Shared Memory & Shared Clock:** Program di node berbeda tidak bisa berbagi variabel secara langsung dan tidak memiliki jam yang sama.
> >     
> > - **Knowledge Bersifat Lokal:** Informasi yang dimiliki sebuah node tentang node lain (status global) mungkin sudah kedaluwarsa.
> >     
> > - **Failure Independen:** Node bisa gagal dan pulih secara independen.
> >     
> > - **Pesan Bisa Hilang/Tertunda:** Jaringan bersifat _non-deterministik_.
> >     
> >
> > ### Model Kegagalan Node (Node Failure Model)
> >
> > Asumsi tentang bagaimana sebuah node bisa gagal:
> >
> > 1. **Crash Failure:** Model paling sederhana. Node hanya bisa gagal dengan _crashing_ (berhenti bekerja) dan mati selamanya.
> >     
> > 2. **Crash-Recovery:** Node bisa _crash_ (berhenti bekerja), namun dapat _recover_ (hidup kembali). Saat hidup, ia mungkin kehilangan _volatile memory_ tapi data di _stable state_ (disk) tetap ada.
> >     
> > 3. **Byzantine Failure:** Model paling rumit dan berbahaya. Node bisa gagal dengan memberikan perilaku _apapun_, termasuk mengirim data yang salah, berbohong, atau berkolusi dengan node jahat lainnya.
> >     
> >
> > ### Model Komunikasi (Network Model)
> >
> > - **Reliable Network:** Asumsi kuat. Pesan tidak pernah hilang dan tidak tertunda tanpa batas waktu.
> >     
> > - **Unreliable Network:** Asumsi lemah (realistis). Pesan dapat hilang, diduplikasi, atau tertunda.
> >     
> > - **Network Partition:** Sebuah skenario di mana jaringan terputus (misal, kabel switch putus), sehingga membagi node menjadi beberapa grup yang tidak bisa saling berkomunikasi. Namun, _node-node di dalam grup itu sendiri masih hidup dan operasional_.
> >     
> >
> > ### Model Waktu (Timing Model)
> >
> > 1. **Synchronous System:** Asumsi kuat (tidak realistis di internet).
> >     
> > 	  * Ada batas waktu maksimum (bounded) untuk pengiriman pesan.
> > 	  * Proses berjalan sinkron dan clock lokal akurat.
> > 	  * **Implikasi:** Kita bisa melakukan deteksi kegagalan dengan *timeout*. Jika pesan tidak tiba dalam X detik, kita *yakin* pengirimnya *crash*.
> >  
> >
> > 2. **Asynchronous System:** Asumsi lemah (realistis).
> >   
> > 	  * Tidak ada asumsi batas waktu pengiriman pesan.
> > 	  * Proses berjalan dengan kecepatan independen, clock tidak akurat.
> > 	  * **Implikasi:** Kita **tidak bisa membedakan** antara "node yang crash", "pesan yang hilang", atau "jaringan/node yang lambat".
> >
> > ### Masalah Deteksi Kegagalan (di Model Asynchronous)
> > 
> > ![[Pasted image 20251028113356.png]]
> >
> > - **False Positive:** Node A mengira Node B _mati_ (karena timeout), padahal Node B hanya lambat. Node A salah mengambil kesimpulan.
> >     
> > - **False Negative:** Node A mengira Node B _hidup_ (karena balasan terakhirnya masih dalam _timeout window_), padahal Node B baru saja _crash_ setelah mengirim balasan itu.
> >     
> >
> > ### Solusi Waktu: Logical Clock (Lamport Timestamps)
> >
> > - Karena _real-time clock_ tidak bisa diandalkan, kita gunakan _logical clock_ untuk menentukan _urutan kejadian_ (bukan waktu pastinya).
> >     
> > - **Relasi Happened-Before (**$\rightarrow$**):** Jika $e_1 \rightarrow e_2$, artinya $e_1$ "pasti" terjadi sebelum $e_2$ (misal: $e_1$ adalah pengiriman pesan, $e_2$ adalah penerimaan pesan itu).
> >     
> > - **Aturan Lamport Timestamp (Clock** $I_p$ **di proses** $p$**):**
> >     
> >     1. Setiap ada event lokal di $p$, $I_p = I_p + 1$.
> >         
> >     2. Saat $p$ mengirim pesan $m$, sertakan timestamp $I_p$.
> >         
> >     3. Saat proses $q$ menerima pesan $m$ dengan timestamp $I_m$, $q$ harus mengupdate clock-nya: $I_q = \max(I_q, I_m) + 1$.
> >         
> > - **Jaminan:** Jika $e_1 \rightarrow e_2$, maka $Timestamp(e_1) < Timestamp(e_2)$.
> >     

> [!cornell] #### Summary
> 
> **Model sistem adalah sekumpulan asumsi fundamental tentang perilaku** _**node**_**,** _**jaringan**_**, dan** _**waktu**_**. Model kegagalan node berkisar dari** _**Crash**_ **(sederhana) hingga** _**Byzantine**_ **(berbahaya). Model waktu realistis adalah** _**Asynchronous**_**, di mana kita tidak bisa membedakan kegagalan dari kelambatan. Karena itu, kita tidak menggunakan jam fisik, melainkan** _**Logical Clock (Lamport Timestamps)**_ **untuk menentukan urutan kejadian berdasarkan relasi** _**happened-before**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Partial Synchrony (Model "Dunia Nyata")
> 
> - Slide 14 menyebutkan **Partial Synchrony**. Ini adalah model kompromi yang paling banyak digunakan di sistem praktis (seperti Raft dan Paxos).
>     
> - Model ini berasumsi: "Sistem _biasanya_ bersifat sinkron (ada batas waktu), tapi _kadang-kadang_ bisa menjadi asinkron (misal saat jaringan sibuk). Namun, ia akan _eventually_ (pada akhirnya) kembali stabil dan sinkron."
>     
> - **Implikasi:** Ini mengizinkan kita menggunakan _timeout_ untuk deteksi kegagalan, namun algoritma kita harus siap menangani _false positive_ (timeout palsu) saat jaringan sedang asinkron.
>     
> 
> #### Pendalaman: Lamport Timestamps vs. Vector Clocks
> 
> - Kelemahan Lamport Timestamps: Jika $Timestamp(e_1) < Timestamp(e_2)$, itu **TIDAK** berarti $e_1 \rightarrow e_2$. Bisa jadi $e_1$ dan $e_2$ adalah kejadian _concurrent_ (independen) yang kebetulan urutan timestamp-nya begitu.
>     
> - **Vector Clocks** adalah jam logis yang lebih canggih. Setiap node $p$ tidak hanya menyimpan satu angka, tapi satu _vektor_ (array) dari clock, [ $I_{p1}, I_{p2}, ..., I_{pn}$ ], di mana $I_{pn}$ adalah "pengetahuan" node $p$ tentang clock di node $n$.
>     
> - **Kelebihan:** Vector Clocks dapat secara pasti membedakan antara kejadian yang _causally related_ (sebab-akibat) dan yang _concurrent_ (bersamaan).
>     
> - **Kekurangan:** Jauh lebih rumit dan _overhead_ pesan lebih besar (harus mengirim seluruh vektor).
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Alat:** Coba cari simulator "Lamport Timestamps" atau "Vector Clocks" online. Melihat visualisasi bagaimana nilai clock berubah saat pesan dikirim dan diterima sangat membantu pemahaman.
>     
> - **Paper:** "Time, Clocks, and the Ordering of Events in a Distributed System" oleh Leslie Lamport. (Ini adalah paper legendaris yang mendefinisikan Lamport Timestamps dan relasi _happened-before_).
>