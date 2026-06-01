---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 2.3: Deteksi & Pemulihan Deadlock
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Deadlock Detection_?
> >     
> > - Apa itu _Wait-for Graph_ (WFG)?
> >     
> > - Kapan _deadlock_ terjadi di WFG?
> >     
> > - Kapan deteksi dijalankan?
> >     
> > - Apa itu _Deadlock Recovery_?
> >     
> > - Langkah 1: _Victim Selection_?
> >     
> > - Faktor pemilihan korban?
> >     
> > - Langkah 2: _Rollback_?
> >     
> > - Apa itu _Total Rollback_?
> >     
> > - Apa itu _Partial Rollback_?
> >     
> > - Apa itu _Starvation_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 23-24)
> >     
> 
> > ### Deadlock Detection (Deteksi)
> > 
> > Ini adalah pendekatan "paling optimis": biarkan _deadlock_ terjadi, lalu deteksi, dan terakhir pulihkan.
> > 
> > - **Keuntungan:** Tidak ada _overhead_ dari _prevention_ atau _avoidance_ pada setiap permintaan _lock_.
> >     
> > - **Kekurangan:** _Deadlock_ bisa terjadi dan "menggantung" sistem untuk sementara waktu sampai terdeteksi.
> >     
> > 
> > ### Metode: Wait-for Graph (WFG)
> > 
> > ![[Pasted image 20251028130819.png]]
> > 
> > Metode deteksi yang paling umum adalah dengan membangun **Wait-for Graph** (Graf Tunggu).
> > 
> > 1. **Node (Simpul):** Setiap node adalah satu transaksi yang sedang aktif.
> >     
> > 2. **Edge (Panah):** Sebuah panah `Ti -> Tj` dibuat jika transaksi Ti sedang **menunggu** _lock_ yang saat ini dipegang oleh transaksi Tj.
> >     
> > 
> > **Kondisi Deadlock:**
> > 
> > Sistem berada dalam kondisi deadlock jika dan hanya jika terdapat siklus (cycle) di dalam Wait-for Graph.
> > 
> > **Contoh:**
> > 
> > - T1 menunggu T2 (`T1 -> T2`)
> >     
> > - T2 menunggu T3 (`T2 -> T3`)
> >     
> > - T3 menunggu T1 (T3 -> T1)
> >     
> >     Ini adalah siklus, yang berarti T1, T2, dan T3 sedang deadlock.
> >     
> > 
> > ### Kapan Deteksi Dijalankan?
> > 
> > Algoritma pencarian siklus di WFG harus dijalankan:
> > 
> > 1. **Secara Periodik:** Misal, setiap 1 menit atau setiap 5 detik. Jika terlalu sering, _overhead_ tinggi. Jika terlalu jarang, _deadlock_ akan "menggantung" sistem terlalu lama.
> >     
> > 2. **Setiap Ada Tunggu:** Setiap kali sebuah transaksi terpaksa menunggu, cek WFG. Ini mendeteksi _deadlock_ secara instan, tetapi _overhead_-nya sangat tinggi.
> >     
> > 
> > ### Deadlock Recovery (Pemulihan)
> > 
> > Setelah siklus (deadlock) terdeteksi, sistem harus "memutus" siklus tersebut. Ini dilakukan dengan **me-**_**rollback**_ **(membatalkan)** satu atau lebih transaksi di dalam siklus.
> > 
> > #### Langkah 1: Victim Selection (Pemilihan Korban)
> > 
> > Transaksi mana di dalam siklus yang harus di-_rollback_?
> > 
> > **Faktor-faktor Penentu:**
> > 
> > - **Prioritas:** Apakah ada transaksi yang lebih penting? (JANGAN _rollback_ transaksi _batch_ penting).
> >     
> > - **Biaya** _**Rollback**_: Pilih yang paling "murah" untuk di-_rollback_.
> >     
> > - Berapa lama transaksi telah berjalan?
> >     
> > - Berapa banyak _lock_ yang dipegang?
> >     
> > - Berapa banyak data yang telah diubah?
> >     
> > - Berapa banyak transaksi lain yang harus ikut di-_rollback_ (jika tidak pakai _Strict 2PL_)?
> >     
> > 
> > #### Langkah 2: Rollback (Pembatalan)
> > 
> > - **Total Rollback:** _Abort_ seluruh transaksi korban dari awal dan mulai ulang. Ini adalah cara paling sederhana.
> >     
> > - **Partial Rollback:** _Rollback_ transaksi korban hanya sejauh yang diperlukan untuk membebaskan _lock_ yang menyebabkan siklus. Lebih efisien, tetapi jauh lebih kompleks untuk diimplementasikan (perlu _savepoint_).
> >     
> > 
> > #### Masalah: Starvation (Kelaparan)
> > 
> > - **Definisi:** Situasi di mana sebuah transaksi yang sama terus-menerus dipilih sebagai "korban" _rollback_ setiap kali ia mencoba berjalan.
> >     
> > - **Solusi:** Sistem harus melacak "jumlah _rollback_" dari setiap transaksi dan memasukkannya sebagai faktor dalam _Victim Selection_. Jangan pilih transaksi yang sudah terlalu sering jadi korban.
> >     

> [!cornell] #### Summary
> 
> _Deadlock Detection_ adalah strategi yang membiarkan _deadlock_ terjadi dan mendeteksinya menggunakan _Wait-for Graph_ (WFG), di mana _node_ adalah transaksi dan _panah_ adalah relasi tunggu. Sebuah siklus (cycle) di WFG menandakan adanya _deadlock_. Setelah terdeteksi (biasanya secara periodik), sistem melakukan _Recovery_ (Pemulihan) dengan memilih korban (_Victim Selection_) berdasarkan biaya _rollback_ atau prioritas. Korban tersebut kemudian di-**Rollback** (bisa _Total_ atau _Partial_) untuk memutus siklus. Sistem harus waspada terhadap _Starvation_, di mana transaksi yang sama selalu dipilih sebagai korban.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Deteksi Siklus vs Timestamp
> 
> Anda mungkin bertanya: mengapa WFG dibutuhkan jika kita sudah punya skema _Wait-Die_ dan _Wound-Wait_?
> 
> - _Wait-Die_ dan _Wound-Wait_ adalah skema **Penghindaran (Avoidance)**. Mereka _mencegah_ siklus terbentuk di WFG. Jika sebuah panah `Ti -> Tj` akan dibuat dan itu berpotensi menciptakan siklus (misal Ti lebih muda dari Tj di Wait-Die), skema ini langsung menolaknya (Ti _rollback_).
>     
> - _Deadlock Detection_ (menggunakan WFG) adalah skema yang berbeda. Ia mengizinkan panah `Ti -> Tj` dibuat kapan saja (sesuai permintaan _lock_). Ia tidak mengecek saat panah dibuat. Ia baru mengecek "apakah ada siklus?" secara periodik.
>     
> - DBMS modern (seperti PostgreSQL, SQL Server, Oracle) umumnya menggunakan **Deadlock Detection** (dengan WFG) daripada _Avoidance_. Alasannya, _deadlock_ sebenarnya adalah kejadian yang **sangat jarang** (rare event) dalam aplikasi yang dirancang dengan baik. Biaya (overhead) untuk _mencegah_ atau _menghindarinya_ pada _setiap_ permintaan _lock_ lebih mahal daripada biaya membiarkannya terjadi dan mendeteksinya sesekali.
>