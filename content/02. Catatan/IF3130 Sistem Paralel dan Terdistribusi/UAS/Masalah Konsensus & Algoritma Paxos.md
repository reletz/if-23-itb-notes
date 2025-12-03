---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Masalah Konsensus & Algoritma Paxos
> 
> > ## Questions/Cues
> >
> > - **Definisi Konsensus**
> >     
> > - **Syarat Konsensus (C.I.V.T)**
> >     
> > - **2-Phase Commit (Masalah)**
> >     
> > - **Filosofi Paxos (Majority)**
> >     
> > - **Peran Paxos (Proposer, Acceptor, Learner)**
> >     
> > - **Proposal Number (N)**
> >     
> > - **Phase 1 (Prepare-Promise)**
> >     
> > - **Phase 2 (Accept-Accepted)**
> >     
> > - **Liveness vs Safety**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-18-Consensus-2022.pdf (Halaman 13-41)
> >     
> > - Fokus: Mekanisme Agreement Terdistribusi
> >     
> 
> > ### 1. Masalah Konsensus
> >
> > Bagaimana sekumpulan proses yang terpisah jaringan sepakat pada **satu nilai** (agreement), meskipun beberapa proses mungkin _crash_ atau pesan hilang?
> >
> > - **Contoh:** Siapa yang jadi leader? Transaksi database commit atau abort? Urutan pesan chat?
> >     
> >
> > **Syarat Konsensus:**
> >
> > 1. **Validity:** Nilai yang disepakati harus berasal dari usulan salah satu node (tidak boleh nilai acak/sampah).
> >     
> > 2. **Uniform Agreement:** Tidak boleh ada dua node yang memutuskan nilai berbeda (semua harus sepakat satu nilai).
> >     
> > 3. **Integrity:** Sebuah node hanya boleh memilih satu nilai.
> >     
> > 4. **Termination (Liveness):** Setiap node yang hidup pada akhirnya harus bisa mengambil keputusan (tidak hang selamanya).
> >     
> >
> > ### 2. Two-Phase Commit (2PC) - Solusi Database
> >
> > Algoritma klasik untuk transaksi terdistribusi.
> >
> > - **Phase 1 (Voting):** Koordinator tanya "Siap Commit?". Partisipan jawab "Vote Commit" atau "Vote Abort".
> >     
> > - **Phase 2 (Decision):** Jika semua "Yes" $\rightarrow$ Koordinator kirim "Global Commit". Jika ada satu "No" $\rightarrow$ "Global Abort".
> >     
> > - **Kelemahan Fatal:** **Blocking.** Jika Koordinator mati tepat setelah mengirim pesan Phase 1, semua partisipan _hang_ (terkunci) menunggu keputusan yang tidak kunjung datang. Tidak Fault Tolerant.
> >     
> >
> > ### 3. Paxos: Algoritma Konsensus Fault-Tolerant
> >
> > Ditemukan oleh Leslie Lamport. Algoritma ini **Non-Blocking** selama mayoritas ($2k+1$) server hidup.
> >
> > **Peran (Roles):**
> >
> > - **Proposer:** Mewakili klien, mengusulkan nilai (value).
> >     
> > - **Acceptor:** "Voters". Menyimpan state protokol, membentuk Quorum (mayoritas).
> >     
> > - Learner: Mengambil hasil keputusan yang sudah disepakati. 
> >  
> > (Satu server bisa merangkap semua peran ini).
> >     
> >
> > Konsep Kunci: Proposal Number (N)
> > 
> > Setiap proposal diberi nomor urut unik ($N$). Aturan emas: Proposal dengan $N$ lebih tinggi mengalahkan $N$ lebih rendah.
> >
> > ### 4. Mekanisme Kerja Paxos (The Phases)
> >
> > **Phase 1: Prepare (Lamar/Cek Ombak)**
> >
> > - **1a (Proposer):** Pilih nomor proposal $N$. Kirim `Prepare(N)` ke mayoritas Acceptor. Tujuannya: "Saya mau usul nomor N, boleh gak?"
> >     
> > - **1b (Acceptor - Promise):**
> >     
> >     - Jika $N >$ semua proposal yang pernah dilihat: Janji (**Promise**) untuk menolak proposal dengan nomor $< N$ di masa depan.
> >         
> >     - Jika sudah pernah menerima nilai lain sebelumnya, kembalikan nilai tersebut `{N_lama, Value_lama}` ke Proposer.
> >         
> >
> > **Phase 2: Accept (Usul/Kunci Nilai)**
> >
> > - **2a (Proposer):**
> >     
> > 	- Jika dapat janji (Promise) dari mayoritas:
> > 			
> > 		- Pilih nilai $V$. (Jika Acceptor mengembalikan `Value_lama` di fase 1b, Proposer WAJIB memakai nilai itu. Jika kosong, baru boleh pakai nilai sendiri).
> > 				
> > 		- Kirim `Accept(N, V)` ke Acceptor.
> > 					
> > - **2b (Acceptor - Accepted):**
> >     
> > 	- Jika $N$ masih yang tertinggi (belum ada janji baru ke orang lain): Terima proposal. Simpan nilai $V$. Kirim notifikasi `Accepted(N, V)` ke Learner/Proposer.
> > 			
> >
> > **Phase 3: Learn**
> >
> > - Learner melihat jika mayoritas Acceptor sudah menerima nilai $V$ yang sama, maka konsensus tercapai (Chosen).
> >     
> >
> > ### 5. Kondisi Kegagalan & Liveness
> >
> > - **Duelling Proposers (Livelock):** Dua Proposer saling balapan menaikkan nomor $N$ terus menerus tanpa pernah sampai ke tahap Accept (Saling menimpa fase Prepare).
> >     
> > 	- _Solusi:_ Random timeout atau Leader Election (hanya 1 Proposer aktif).
> > 			
> > - **Minority Failure:** Jika < 50% node mati, Paxos tetap jalan.
> >     

> [!cornell] #### Summary
> 
> Konsensus adalah masalah fundamental agar sistem terdistribusi bisa menyepakati satu nilai. 2-Phase Commit rawan blocking jika koordinator mati. Paxos memecahkan masalah ini dengan sistem berbasis Mayoritas (Quorum). Paxos bekerja dalam dua fase utama: Prepare (mengamankan hak usul dengan nomor proposal unik) dan Accept (mengunci nilai). Kuncinya adalah Proposal Number yang monoton naik untuk mengurutkan kejadian dan aturan bahwa jika mayoritas sudah menerima janji, mereka tidak boleh menerima janji masa lalu.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Analogi "Melamar" (Paxos)
> 
> Bayangkan Proposer ingin melamar Acceptor.
> 
> 1. **Prepare:** "Boleh gak saya melamar kamu di tanggal N?". Acceptor: "Boleh, saya janji gak terima lamaran tanggal < N".
>     
> 2. **Accept:** "Oke, ini cincinnya (Value)". Acceptor: "Oke saya terima cincinnya".
>     
>
> - Jika ada pelamar baru datang dengan Tanggal N+1 saat fase 1, Acceptor akan menolak pelamar lama.
>     
> - Jika Acceptor sudah pegang cincin dari pelamar lama, dia akan bilang ke pelamar baru: "Saya sudah punya cincin X, kalau mau melamar, cincinnya harus X juga ya" (Safety property).
>     
> 
> #### Paxos di Dunia Nyata
> 
> Paxos sangat sulit diimplementasikan dengan benar ("Paxos is hard").
> 
> - Digunakan di: **Google Chubby** (Lock service), **Apache ZooKeeper** (ZAB - varian Paxos), **Cassandra** (Lightweight Transaction).
>     
> 
> #### Sumber & Referensi:
> 
> - **Paper:** Leslie Lamport, "The Part-Time Parliament" (Paxos dijelaskan dengan analogi parlemen Yunani kuno).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa Paxos membutuhkan "Proposal Number" yang unik dan selalu meningkat?</strong></summary>
> 
> Untuk membedakan urutan proposal dan menangani konflik. Acceptor menggunakan nomor ini untuk menentukan proposal mana yang "terbaru" dan berhak diproses. Proposal dengan nomor lebih rendah dari yang sudah dijanjikan (Promised) akan otomatis ditolak untuk menjamin konsistensi.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa yang harus dilakukan Proposer di Fase 2a jika pada Fase 1b ia menerima informasi bahwa Acceptor sudah memiliki nilai (Value) yang diterima sebelumnya?</strong></summary>
> 
> Proposer <strong>WAJIB</strong> membuang nilai usulannya sendiri dan mengadopsi nilai yang dikembalikan oleh Acceptor tersebut. Ini adalah kunci "Safety" Paxos: jika sebuah nilai mungkin sudah disepakati (chosen), kita harus melanjutkannya, tidak boleh menggantinya.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa itu kondisi "Livelock" atau "Duelling Proposers" dalam Paxos?</strong></summary>
> 
> Kondisi di mana dua atau lebih Proposer saling bergantian mengirim pesan <code>Prepare</code> dengan nomor yang terus meningkat. Proposer A kirim N=1, Proposer B kirim N=2 (menggagalkan A), Proposer A kirim N=3 (menggagalkan B), dst. Sistem sibuk tapi tidak pernah mencapai fase Accept (tidak ada kemajuan).
> 
> </details>