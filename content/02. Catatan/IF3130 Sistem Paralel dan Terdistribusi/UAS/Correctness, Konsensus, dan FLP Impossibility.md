---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Correctness (Kebenaran) dan Masalah Konsensus
> 
> > ## Questions/Cues
> >
> > - Apa itu 'Correctness'?
> >     
> > - Dua jenis properties?
> >     
> > - (1) Safety Properties?
> >     
> > - (2) Liveness Properties?
> >     
> > - Contoh Safety?
> >     
> > - Contoh Liveness?
> >     
> > - Apa itu Consensus Problem?
> >     
> > - 4 Properti Konsensus?
> >     
> > - (1) Agreement?
> >     
> > - (2) Integrity?
> >     
> > - (3) Termination?
> >     
> > - (4) Validity?
> >     
> > - Apa itu 'FLP Impossibility'?
> >     
> > - Siapa penemu FLP?
> >     
> > - Apa asumsi model FLP?
> >     
> > - Apa implikasi FLP?
> >     
> >
> > ## Reference Points
> >
> > - Slides 15-19
> >     
> 
> > ### Correctness in Distributed Systems
> >
> > _Correctness_ (kebenaran) sebuah sistem dinyatakan sebagai _properties_ (pernyataan) yang mendeskripsikan perilaku sistem. Ada dua jenis utama:
> >
> > 1. **Safety Properties**
> >     
> >   - Menyatakan bahwa **"sesuatu yang buruk tidak akan pernah terjadi"**.
> >   - Jika sebuah *safety property* dilanggar satu kali saja (pada waktu *t*), ia akan dilanggar selamanya (tidak bisa diperbaiki).
> >   - Contoh: "Hanya satu proses yang boleh berada di *critical section* pada satu waktu" (Mutual Exclusion).
> >   - Cara termudah untuk menjamin *safety* adalah dengan "tidak melakukan apa-apa" (do nothing).
> > 
> >
> > 2. **Liveness Properties**
> >     
> >
> >   - Menyatakan bahwa **"sesuatu yang baik pada akhirnya akan terjadi"**.
> >   - Meskipun sistem sedang dalam masalah (pada waktu *t*), selalu ada harapan bahwa properti ini akan terpenuhi di masa depan.
> >   - Contoh: "Setiap permintaan pada akhirnya akan menerima respons".
> >
> > _Tantangan_ utama dalam sistem terdistribusi adalah menjamin _keduanya_ (Safety dan Liveness) secara bersamaan.
> >
> > ### Problem: Consensus (Konsensus)
> >
> > _Konsensus_ adalah masalah fundamental di mana sekumpulan proses (node) harus _setuju_ (sepakat) pada _satu nilai_ (keputusan) yang sama.
> >
> > - **Properti Konsensus yang Benar:**
> >     
> >     1. **Agreement (Persetujuan):** (Safety) Semua proses yang _correct_ (tidak crash) harus setuju pada nilai yang _sama_.
> >         
> >     2. **Integrity (Integritas):** (Safety) Nilai yang disepakati _harus_ merupakan nilai yang sebelumnya pernah diusulkan oleh salah satu proses. Sistem tidak boleh mengarang nilainya sendiri.
> >         
> >     3. **Termination (Terminasi):** (Liveness) Semua proses yang _correct_ pada akhirnya _harus_ mencapai keputusan. (Sistem tidak boleh _hang_ selamanya).
> >         
> >     4. **Validity (Validitas):-** Jika semua proses _correct_ mengusulkan nilai V yang sama, maka nilai V-lah yang harus disepakati.
> >         
> >
> > ### Hasil Teoretis: FLP Impossibility
> >
> > Ini adalah salah satu hasil teoretis paling penting dalam ilmu komputer.
> >
> > - **Penemu:-** Fischer, Lynch, dan Paterson (1985).
> >     
> > - **Teorema:-** Menyatakan bahwa **tidak ada algoritma deterministik-** yang dapat menjamin _konsensus_ dalam _waktu terbatas_ (menjamin _Termination_) pada sistem **asynchronous**, bahkan jika hanya ada **satu proses-** yang gagal (model _crash failure_).
> >     
> > - **Model Asumsi FLP:**
> >     
> >     1. Sistem Asynchronous (tidak ada batas waktu).
> >         
> >     2. Network Reliable (pesan pasti sampai, tapi bisa tertunda).
> >         
> >     3. Minimal satu node bisa _crash_.
> >         
> > - **Implikasi:-** Ini adalah "pukulan" besar. Artinya, di dunia nyata (yang _asynchronous_), kita _harus_ mengorbankan sesuatu. Algoritma konsensus praktis (seperti Paxos/Raft) harus "mengakali" teorema ini, biasanya dengan mengorbankan _liveness_ (termination) dalam skenario terburuk, atau dengan menggunakan model yang lebih kuat (seperti _partial synchrony_).
> >     

> [!cornell] #### Summary
> 
> **Kebenaran (Correctness) sistem terdistribusi didefinisikan oleh-** _**Safety**_ **(hal buruk tidak pernah terjadi) dan-** _**Liveness**_ **(hal baik akhirnya terjadi). Masalah-** _**Konsensus**_**—di mana semua node harus setuju pada satu nilai—adalah inti dari banyak sistem. Namun, Teorema-** _**FLP Impossibility**_ **membuktikan bahwa konsensus yang-** _**dijamin berhenti**_ **(Termination/Liveness) adalah-** _**mustahil**_ **dicapai dalam sistem-** _**asynchronous**_ **jika ada risiko satu node-** _**crash**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Bagaimana Paxos dan Raft "Mengakali" FLP?
> 
> FLP berkata konsensus _mustahil_ di model _asynchronous_ murni. Algoritma praktis seperti **Paxos-** (Lamport) dan **Raft-** (Ongaro & Ousterhout) berhasil mencapai konsensus di dunia nyata. Bagaimana?
> 
> - **Mereka tidak menggunakan model asynchronous murni.**
>     
> - Raft dan Paxos menggunakan **timeout-** untuk mendeteksi kegagalan _leader_. Penggunaan _timeout_ ini secara implisit mengasumsikan model **Partial Synchrony-** (lihat Ad Libitum Catatan 5).
>     
> - **Mengorbankan Liveness (Termination):-** Dalam skenario terburuk (misal, _network partition_ yang membagi sistem 50/50, atau _leader_ terus-menerus _crash_ dan dipilih ulang), algoritma ini tidak bisa _termination_ (gagal mencapai konsensus). Mereka mengorbankan _liveness_ sementara demi menjamin _safety_ (tidak pernah setuju pada nilai yang salah).
>     
> 
> #### Pendalaman: Paxos vs. Raft
> 
> Keduanya adalah algoritma konsensus untuk model _crash-recovery_.
> 
> - **Paxos (oleh Leslie Lamport):**
>     
>     - Sangat penting secara teoretis, terbukti _aman_.
>         
>     - Terdiri dari dua fase: _Phase 1 (Prepare/Promise)_ dan _Phase 2 (Accept/Accepted)_.
>         
>     - Terkenal sangat sulit dipahami dan diimplementasikan dengan benar.
>         
> - **Raft (dari Stanford):**
>     
>     - Dibuat sebagai alternatif Paxos yang _mudah dipahami_ (_Understandable Consensus_).
>         
>     - Memecah masalah konsensus menjadi 3 bagian:
>         
>         1. **Leader Election:-** Memilih satu node sebagai _leader_.
>             
>         2. **Log Replication:-** _Leader_ menerima perintah, menuliskannya ke _log_ miliknya, dan memaksa _follower_ untuk menyalin _log_ tersebut.
>             
>         3. **Safety:-** Menjamin jika sebuah entri _log_ sudah di-_commit_, tidak ada _leader_ lain yang bisa menimpanya.
>             
>     - Raft saat ini jauh lebih populer untuk implementasi baru (misal: di etcd Kubernetes, Consul).
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Paper FLP:-** "Impossibility of Distributed Consensus with One Faulty Process" oleh Fischer, Lynch, Paterson.
>     
> - **Raft:-** [https://raft.github.io/](https://raft.github.io/ "null") (Situs ini memiliki visualisasi yang sangat bagus untuk memahami cara kerja Raft).
>     
> - **Paxos:-** "Paxos Made Simple" oleh Leslie Lamport (Judulnya "Simple", tapi isinya terkenal rumit).
>