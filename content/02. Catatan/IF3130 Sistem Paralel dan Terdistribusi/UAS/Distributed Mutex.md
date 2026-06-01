---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Distributed Mutual Exclusion (Mutex)
> 
> > ## Questions/Cues
> >
> > - **Tujuan Mutual Exclusion**
> >     
> > - **Centralized Algorithm (Cara Kerja & Kelemahan)**
> >     
> > - **Token Ring Algorithm**
> >     
> > - **Lamport Mutex (Logic & Overhead)**
> >     
> > - **Ricart & Agrawala (Optimasi)**
> >     
> > - **Perbandingan Algoritma**
> >     
> > - **Starvation & Deadlock**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-20-Mutex-2022.pdf (Halaman 1-22)
> >     
> > - Fokus: Koordinasi Akses Resource
> >     
> 
> > ### 1. Konsep Dasar & Tantangan
> >
> > **Mutual Exclusion (Mutex)** adalah mekanisme untuk memastikan bahwa pada satu waktu, hanya satu proses yang boleh mengakses _Critical Section_ (resource bersama seperti file, printer, atau variabel global).
> >
> > - **Pada Sistem Lokal:** Menggunakan semaphore, monitor, atau instruksi hardware `Test and Set`.
> >     
> > - **Pada Sistem Terdistribusi:** Jauh lebih sulit karena tidak ada _shared memory_ atau _global clock_. Kita hanya bisa mengandalkan **Message Passing**.
> >     
> > - **Asumsi:** Setiap resource punya ID unik. Proses meminta akses dengan mengirimkan ID tersebut.
> >     
> >
> > ### 2. Kategori Algoritma
> >
> > Ada tiga pendekatan utama untuk menyelesaikan masalah ini:
> >
> > 1. **Centralized:** Bergantung pada satu koordinator pusat.
> >     
> > 2. **Token Based:** Hak akses digilir menggunakan "koin" atau token elektronik.
> >     
> > 3. **Contention Based:** Kesepakatan terdistribusi (distributed agreement) berdasarkan timestamp.
> >     
> >
> > ### 3. Centralized Algorithm
> >
> > Pendekatan paling sederhana, meniru sistem _single-processor_.
> >
> > - **Cara Kerja:**
> >     
> > 	1. Satu proses dipilih jadi **Koordinator (C)**.
> > 			
> > 	2. Proses P minta akses $\rightarrow$ kirim `Request(R)` ke C.
> > 			
> > 	3. Jika resource bebas $\rightarrow$ C kirim `Grant(R)`.
> > 			
> > 	4. Jika resource sibuk $\rightarrow$ C tidak membalas (atau antrikan request). P menunggu.
> > 			
> > 	5. Setelah selesai, P kirim `Release(R)` ke C. C lalu memberi akses ke antrean berikutnya.
> > 			
> > - **Keuntungan:** Adil (FIFO), mudah implementasi, pesan sedikit (3 pesan: Request, Grant, Release).
> >     
> > - **Kelemahan:**
> >     
> >     - **Single Point of Failure:** Koordinator mati = sistem macet.
> >         
> >     - **Bottleneck:** Koordinator kebanjiran request pada sistem besar.
> >         
> >     - **Ketidakpastian:** P tidak bisa membedakan antara "Koordinator mati" atau "Resource sedang sibuk" (karena sama-sama tidak ada balasan).
> >         
> >
> > ### 4. Token Ring Algorithm
> >
> > Mengorganisir proses dalam topologi cincin logis (_logical ring_).
> >
> > - **Cara Kerja:**
> >     
> > 	1. Sebuah **Token** (hak akses) berputar dari $P_i$ ke $P_{i+1}$.
> > 			
> > 	2. Saat proses menerima token:
> > 			
> > 		- Jika butuh resource $\rightarrow$ Tahan token, masuk Critical Section. Setelah selesai, oper token.
> > 				
> > 		- Jika tidak butuh $\rightarrow$ Langsung oper token ke tetangga.
> > 					
> > - **Karakteristik:**
> >     
> > 	- **Fairness:** Dijamin tidak ada _starvation_ (semua pasti kebagian jatah token).
> > 			
> > 	- **Order:** Urutan akses ditentukan arah putaran cincin, bukan siapa cepat dia dapat (FCFS).
> > 			
> > - **Masalah:** Jika token hilang (node pemegang token crash), token harus dibuat ulang (regenerasi), yang sulit dideteksi (apakah hilang atau sedang dipakai proses yang lambat?).
> >     
> >
> > ### 5. Lamport Mutual Exclusion (Timestamp Based)
> >
> > Algoritma terdistribusi penuh tanpa koordinator, menggunakan **Logical Clock**.
> >
> > - **Prinsip:** Setiap request diberi timestamp unik. Prioritas diberikan pada timestamp terkecil (terlama).
> >     
> > - **Mekanisme:**
> >     
> > 	1. P ingin akses $\rightarrow$ Kirim `Request(timestamp)` ke **SEMUA** node lain. Masukkan request ke antrean lokal sendiri.
> > 			
> > 	2. Penerima menaruh request di antrean lokal (diurutkan timestamp), lalu kirim balasan `ACK`.
> > 			
> > 	3. **Syarat Masuk Critical Section:**
> > 		
> > 		- Request P ada di paling depan antrean lokalnya sendiri.
> > 				
> > 		- P sudah menerima pesan (ACK/lainnya) dari **SEMUA** node dengan timestamp > timestamp requestnya.
> > 				
> > 	4. Setelah selesai $\rightarrow$ P hapus request dari antrean, kirim `Release` ke semua orang.
> > 			
> > - **Overhead:** Sangat tinggi. Butuh $3(N-1)$ pesan per akses (Request, ACK, Release ke semua orang).
> >     
> >
> > ### 6. Ricart & Agrawala Algorithm (Optimasi Lamport)
> >
> > Memperbaiki algoritma Lamport dengan menghilangkan pesan `Release` eksplisit dan menunda `ACK`.
> >
> > - **Cara Kerja:**
> >     
> > 	1. P kirim `Request` ke semua node.
> > 			
> > 	2. Penerima Q memproses request P:
> > 			
> > 		- Jika Q tidak butuh resource $\rightarrow$ Kirim `OK` ke P.
> > 				
> > 		- Jika Q sedang pakai resource $\rightarrow$ **JANGAN BALAS**, simpan request P dalam antrean (pending).
> > 				
> > 		- Jika Q juga ingin resource $\rightarrow$ Bandingkan timestamp. Jika P lebih lama (kecil), kirim `OK`. Jika Q lebih lama, tahan (pending).
> > 				
> > 	1. P masuk Critical Section setelah menerima `OK` dari **SEMUA** node.
> > 			
> > 	2. Setelah selesai, P mengirim `OK` tertunda ke semua request di antreannya.
> > 			
> > - **Overhead:** Lebih efisien, $2(N-1)$ pesan.
> >     
> > - **Kelemahan:** Masih ada $N$ point of failure. Jika satu node diam (crash), pengirim akan menunggu selamanya (perlu timeout/algoritma deteksi kegagalan).
> >     

> [!cornell] #### Summary
> 
> Mutual Exclusion Terdistribusi bertujuan mengatur akses resource tanpa memori bersama. Algoritma Centralized efisien namun rentan bottleneck/failure tunggal. Token Ring menjamin keadilan (fairness) dan mencegah starvation, namun lambat jika ring besar dan token hilang. Algoritma berbasis waktu seperti Lamport dan Ricart & Agrawala memungkinkan keputusan desentralisasi penuh menggunakan timestamp logis, namun memiliki overhead komunikasi tinggi ($O(N)$) dan rentan terhadap kegagalan satu node saja (karena butuh persetujuan semua orang).

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Perbandingan Pesan (Message Complexity)
> 
> Misalkan ada $N$ node dalam sistem.
> 
> - **Centralized:** 3 pesan (Request, Grant, Release). Konstan, tidak peduli jumlah N.
>     
> - **Token Ring:** Bervariasi. 1 hingga $\infty$ (token terus berputar meski idle). Waktu tunggu maksimal sebanding dengan $N$.
>     
> - **Lamport:** $3(N-1)$. Sangat boros bandwidth.
>     
> - **Ricart & Agrawala:** $2(N-1)$. Lebih hemat karena menggabungkan ACK dan Release (ACK tertunda berfungsi sebagai izin giliran).
>     
> 
> #### Race Condition pada Ricart & Agrawala
> 
> Apa yang terjadi jika P1 dan P2 mengirim request bersamaan dengan timestamp persis sama?
> 
> Algoritma ini menggunakan Total Ordering. Jika timestamp sama, ID proses digunakan sebagai tie-breaker. Misal $ID(P1) < ID(P2)$, maka P1 menang.
> 
> #### Sumber & Referensi:
> 
> - **Paper:** G. Ricart & A. Agrawala, "An Optimal Algorithm for Mutual Exclusion in Computer Networks" (CACM 1981).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa algoritma "Centralized" memiliki masalah "Single Point of Failure" dan bagaimana dampaknya?</strong></summary>
> 
> Karena seluruh keputusan akses bergantung pada satu proses koordinator. Jika koordinator crash, tidak ada proses lain yang bisa mendapatkan akses resource. Selain itu, proses klien sulit membedakan apakah koordinator mati atau hanya lambat merespon (resource sibuk), yang bisa menyebabkan sistem hang.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa perbedaan utama strategi "Balasan (Reply)" antara algoritma Lamport dengan Ricart & Agrawala?</strong></summary>
> 
> Pada algoritma Lamport, setiap penerima pesan request SELALU membalas dengan ACK segera. Pada Ricart & Agrawala, penerima menunda balasan (Deferred Reply) jika ia sendiri sedang menggunakan resource atau memiliki prioritas lebih tinggi. Balasan baru dikirim setelah ia selesai menggunakan resource.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Dalam algoritma Token Ring, apa yang terjadi jika sebuah proses tidak membutuhkan resource saat menerima token?</strong></summary>
> 
> Proses tersebut akan segera meneruskan token ke proses tetangganya (next node in ring). Ini memastikan token terus berputar mencari proses yang membutuhkan akses.
> 
> </details>