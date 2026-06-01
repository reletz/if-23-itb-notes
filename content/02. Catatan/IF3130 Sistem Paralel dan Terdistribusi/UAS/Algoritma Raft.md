---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Algoritma Raft (Understandable Consensus)
> 
> > ## Questions/Cues
> >
> > - **Filosofi Raft vs Paxos**
> >     
> > - **Replicated State Machine**
> >     
> > - **3 Status Server (Leader, Follower, Candidate)**
> >     
> > - **Konsep Term & Waktu Logis**
> >     
> > - **Algoritma Leader Election (Detail)**
> >     
> > - **Randomized Timeout**
> >     
> > - **Log Replication (AppendEntries RPC)**
> >     
> > - **Log Consistency Property**
> >     
> > - **Safety: Leader Completeness**
> >     
> > - **Penanganan Log Inkonsisten**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-19-Raft-2022.pdf
> >     
> > - Fokus: Konsensus yang Mudah Dipahami & Diimplementasikan
> >     
> 
> > ### 1. Latar Belakang & Filosofi Raft
> >
> > Raft diciptakan oleh Diego Ongaro dan John Ousterhout (Stanford) sebagai alternatif dari Paxos.
> >
> > - **Masalah Paxos:** Paxos dianggap sangat sulit dipahami (_difficult to understand_) dan sulit diimplementasikan dengan benar dalam sistem nyata.
> >     
> > - **Tujuan Raft:** Menyediakan algoritma konsensus yang setara dengan Paxos dalam hal efisiensi dan keamanan, namun jauh lebih **mudah dipahami (Understandable)**.
> >     
> > - **Pendekatan Desain:** Raft memecah masalah konsensus yang kompleks menjadi beberapa sub-masalah independen yang lebih kecil:
> >     
> > 	1. **Leader Election:** Memilih pemimpin yang kuat.
> > 			
> > 	2. **Log Replication:** Leader menerima perintah dan menyebarkannya.
> > 			
> > 	3. **Safety:** Menjamin keamanan data (konsistensi).
> >         
> >
> > ### 2. Konsep Dasar: Replicated State Machine
> >
> > Raft digunakan untuk membangun **Replicated State Machine**.
> >
> > - **Prinsip:** Jika sekumpulan mesin mengeksekusi urutan perintah (_log_) yang identik dalam urutan yang sama, maka _State Machine_ mereka akan berakhir pada status yang sama.
> >     
> > - **Peran Raft:** Menjamin bahwa **Log** (catatan perintah) ter-replikasi secara konsisten di semua server, meskipun ada kegagalan server.
> >     
> > - **Alur Data:** Client $\rightarrow$ Leader $\rightarrow$ Log $\rightarrow$ State Machine.
> >     
> >
> > ### 3. Status Server (Server States)
> >
> > Dalam setiap waktu, setiap server dalam klaster Raft hanya bisa berada dalam satu dari tiga status:
> >
> > 1. **Follower:**
> > 	
> > 	- Bersifat pasif. Tidak pernah memulai komunikasi sendiri.
> > 			
> > 	- Hanya merespon _RequestVote_ dari Candidate atau _AppendEntries_ dari Leader.
> > 			
> > 	- Jika tidak mendengar kabar (_heartbeat_) dari Leader dalam waktu tertentu, ia berasumsi Leader mati dan berubah menjadi Candidate.
> > 			
> > 2. **Candidate:**
> >     
> > 	- Status transisi saat pemilihan pemimpin (_election_).
> > 			
> > 	- Meminta suara (_vote_) dari server lain.
> > 			
> > 	- Bisa menang (jadi Leader), kalah (jadi Follower), atau seri (_split vote_).
> > 			
> > 3. **Leader:**
> >     
> > 	- Menangani semua request dari klien.
> > 			
> > 	- Mereplikasi log ke semua follower.
> > 			
> > 	- Mengirim _Heartbeat_ berkala untuk mempertahankan kekuasaan.
> > 			
> > 	- _Strong Leader:_ Log hanya mengalir dari Leader ke Follower, tidak pernah sebaliknya.
> > 			
> >
> > ### 4. Konsep Waktu: Term
> >
> > Waktu di Raft dibagi menjadi interval logis yang disebut **Term**.
> >
> > - Term adalah angka integer yang terus naik (monotonik).
> >     
> > - Setiap Term dimulai dengan **Election**.
> >     
> > - Jika Election berhasil, sisa Term tersebut dipimpin oleh Leader tunggal tersebut.
> >     
> > - Jika Election gagal (_split vote_), Term berakhir tanpa Leader, dan Term baru dimulai segera.
> >     
> > - **Fungsi Term:** Bertindak sebagai waktu logis (_logical clock_) untuk mendeteksi informasi usang. Jika server menerima pesan dengan Term < CurrentTerm, pesan itu ditolak.
> >     
> >
> > ### 5. Mekanisme Leader Election
> >
> > Leader dipilih agar sistem punya satu koordinator otoritatif.
> > 
> > Pemicu: Follower tidak menerima Heartbeat selama periode Election Timeout.
> > 
> > **Algoritma Pemilihan:**
> >
> > 1. Follower menaikkan `currentTerm`.
> >     
> > 2. Berubah status jadi **Candidate**.
> >     
> > 3. Memberikan suara (vote) ke diri sendiri.
> >     
> > 4. Mengirim `RequestVote RPC` ke semua server lain secara paralel.
> >     
> >
> > **Tiga Kemungkinan Hasil:**
> >
> > - **Menang:** Menerima vote dari mayoritas server ($N/2 + 1$). Langsung kirim Heartbeat ke semua untuk deklarasi kemenangan.
> >     
> > - **Kalah:** Menerima RPC dari Leader lain yang valid (Term $\ge$ Term sendiri). Kembali jadi Follower.
> >     
> > - **Timeout (Split Vote):** Tidak ada yang mayoritas (misal 5 server, suara 2-2-1). Candidate menunggu timeout habis, lalu mulai election baru dengan Term baru.
> >     
> >
> > **Solusi Split Vote: Randomized Timeout**
> > 
> > Raft menggunakan rentang waktu acak untuk timeout (misal 150ms - 300ms). Ini memastikan jarang ada dua server yang bangun dan jadi kandidat secara bersamaan.
> >
> > ### 6. Log Replication (Operasi Normal)
> >
> > Setelah Leader terpilih, ia melayani request klien.
> > 
> > Langkah-langkah Replikasi:
> >
> > 1. **Client Request:** Klien mengirim perintah (misal `x <- 3`) ke Leader.
> >     
> > 2. **Append Local:** Leader menulis perintah ke Log lokalnya (belum di-commit).
> >     
> > 3. **Replicate:** Leader mengirim `AppendEntries RPC` ke semua Follower secara paralel.
> >     
> > 4. **Ack:** Follower menulis ke log mereka dan membalas "Sukses".
> >     
> > 5. **Commit:** Setelah mayoritas follower membalas sukses, Leader menganggap entri tersebut **Committed**.
> >     
> > 6. **Apply:** Leader mengeksekusi perintah ke State Machine dan membalas hasil ke Klien.
> >     
> > 7. **Notify:** Leader memberitahu Follower (via _AppendEntries_ berikutnya) bahwa entri sudah commit, sehingga Follower juga mengeksekusinya.
> >     
> >
> > ### 7. Menjaga Konsistensi Log (Log Matching Property)
> >
> > Raft sangat ketat menjaga struktur log agar identik.
> > 
> > **Properti Log:**
> >
> > 1. Jika dua entri di server berbeda memiliki **Index** dan **Term** yang sama, maka perintahnya PASTI sama.
> >     
> > 2. Jika dua entri identik, maka **semua entri sebelumnya** di log tersebut juga PASTI identik.
> >     
> >
> > **Consistency Check:**
> > 
> > Saat Leader mengirim log baru (Index N), ia menyertakan info log sebelumnya (Index N-1, Term N-1).
> >
> > - Follower mengecek: "Apakah saya punya log di Index `N-1` dengan Term itu?"
> >     
> > - Jika **TIDAK** (Log follower tertinggal atau beda sejarah): Follower menolak request (`return false`).
> >     
> > - **Perbaikan (Repair):** Leader mundur (_decrement_) `nextIndex` untuk follower tersebut dan mencoba mengirim log yang lebih lama, terus mundur sampai ketemu titik kesamaan log. Setelah ketemu, log follower yang konflik akan **ditimpa** oleh log Leader.
> >     
> >
> > ### 8. Safety: Leader Completeness
> >
> > Tidak sembarang server boleh jadi Leader.
> >
> > - **Aturan:** Candidate hanya boleh menang jika log-nya **setidaknya se-update log mayoritas**.
> >     
> > - Saat `RequestVote`, Candidate menyertakan info log terakhirnya (`lastLogIndex`, `lastLogTerm`).
> >     
> > - Voter menolak memberi suara jika log Candidate lebih "tua" dari log Voter.
> >     
> > - Ini menjamin Leader yang terpilih pasti memiliki semua entri yang sudah _committed_ (karena entri committed pasti ada di mayoritas).
> >     

> [!cornell] #### Summary
> 
> Raft didesain untuk understandability dengan memisahkan konsensus menjadi Leader Election, Log Replication, dan Safety. Raft menggunakan model Strong Leader di mana Leader memegang kendali penuh atas log. Election menggunakan timeout acak untuk menghindari deadlock. Log Replication menjamin konsistensi melalui Log Matching Property dan mekanisme perbaikan otomatis di mana Leader memaksa log Follower untuk sama dengannya. Fitur keamanan (Safety) menjamin bahwa Leader yang terpilih selalu memiliki semua data yang sudah dikonfirmasi (committed), mencegah data hilang.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### RPC (Remote Procedure Call) di Raft
> 
> Protokol Raft sangat sederhana, hanya membutuhkan 2 jenis RPC utama untuk konsensus dasar:
> 
> 1. **RequestVote RPC:**
>     
> 	- Dipanggil oleh Candidate untuk mengumpulkan suara.
> 			
> 	- Parameter: `term`, `candidateId`, `lastLogIndex`, `lastLogTerm`.
> 			
> 2. **AppendEntries RPC:**
>     
> 	- Dipanggil oleh Leader untuk mereplikasi log dan sebagai _Heartbeat_.
> 			
> 	- Parameter: `term`, `leaderId`, `prevLogIndex`, `prevLogTerm`, `entries[]`, `leaderCommit`.
> 			
> 	- Jika `entries[]` kosong, ini berfungsi sebagai Heartbeat.
> 			
> 
> #### 5 Properti Safety Raft (Formal)
> 
> 1. **Election Safety:** Maksimal 1 leader per term.
>     
> 2. **Leader Append-Only:** Leader tidak pernah menghapus/menimpa log-nya sendiri (hanya _append_).
>     
> 3. **Log Matching:** Jika entri cocok, semua sebelumnya juga cocok.
>     
> 4. **Leader Completeness:** Entri committed pasti ada di leader masa depan.
>     
> 5. **State Machine Safety:** Jika satu server apply log `X` ke state machine, server lain tidak akan apply perintah berbeda di index `X`.
>     
> 
> #### Sumber & Referensi:
> 
> - **Visualisasi Interaktif:** The Secret Lives of Data (Raft) - _Sangat disarankan untuk memahami visualisasi timeout & election._
>     
> - **Disertasi:** Diego Ongaro, "Consensus: Bridging Theory and Practice" (2014).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa Raft disebut menggunakan pendekatan "Strong Leader" dan apa implikasinya terhadap aliran data?</strong></summary>
> 
> Disebut Strong Leader karena log hanya mengalir satu arah: dari Leader ke Follower. Leader tidak pernah menimpa log-nya sendiri dengan data dari Follower. Implikasinya, manajemen log menjadi lebih sederhana karena hanya Leader yang berhak menentukan urutan log, dan Follower hanya perlu menyinkronkan diri dengan Leader.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan bagaimana "Randomized Election Timeout" mencegah terjadinya "Split Vote" yang berkepanjangan!</strong></summary>
> 
> Tanpa pengacakan, jika Leader mati, semua Follower bisa timeout bersamaan, menjadi Candidate bersamaan, dan memecah suara sehingga tidak ada yang mencapai mayoritas (Split Vote). Dengan waktu timeout yang diacak (misal range 150-300ms), satu server secara statistik akan timeout lebih dulu dari yang lain, meminta suara, dan memenangkan pemilihan sebelum server lain sempat menjadi kandidat.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang terjadi jika Follower menolak "AppendEntries RPC" dari Leader karena ketidakcocokan log (Log Inconsistency)?</strong></summary>
> 
> Jika Follower menolak (return false), Leader tahu bahwa log Follower tersebut tidak konsisten dengan miliknya. Leader akan memundurkan pointer nextIndex untuk Follower tersebut (backtracking) dan mencoba mengirim ulang AppendEntries dengan index log yang lebih lama (sebelumnya). Proses ini berulang sampai ditemukan titik kesamaan log, lalu Leader akan menimpa log Follower yang salah dengan log miliknya mulai dari titik tersebut.
> 
> </details>