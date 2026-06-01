---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 5.1: Snapshot Isolation (SI)
> 
> > ## Questions/Cues
> >
> > - Apa motivasi _Snapshot Isolation_?
> >     
> > - Apa ide dasar SI?
> >     
> > - Bagaimana aturan _Read_ SI?
> >     
> > - Bagaimana aturan _Write_ SI?
> >     
> > - Bagaimana aturan _Commit_ SI?
> >     
> > - Apa itu _First-Committer Wins_?
> >     
> > - Apakah SI menjamin _serializability_?
> >     
> > - Apa anomali di SI?
> >     
> > - Apa itu _Write Skew_?
> >     
> > - Apa level isolasi SI di SQL?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 4.pdf" (Hal 8-15)
> >     
> 
> > ### Motivasi: Kebutuhan Level Isolasi Baru
> >
> > _Serializability_ (dijamin oleh 2PL, MVCC, dll) adalah jaminan terkuat, tetapi seringkali terlalu ketat dan "mahal" (lambat) untuk banyak aplikasi.
> >
> > _Snapshot Isolation_ (SI) muncul sebagai level isolasi yang populer:
> >
> > - Lebih lemah dari _serializability_ (membolehkan beberapa anomali).
> >     
> > - Lebih kuat dari _Read Committed_ (level default di banyak DB).
> >     
> > - Memberikan performa tinggi (terutama untuk _read_).
> >     
> >
> > ### Ide Dasar Snapshot Isolation
> >
> > Setiap transaksi Ti seolah-olah "mengambil foto" (snapshot) dari basis data pada saat ia dimulai (`Start(Ti)`).
> >
> > ### Aturan Eksekusi SI
> >
> > 1. **Aturan Read:**
> >     
> > 	- Saat Ti `read(Q)`, ia akan membaca versi Q yang ada di dalam *snapshot*-nya.
> > 	- Yaitu, versi Q **terbaru yang sudah di-commit** pada saat `Start(Ti)`.
> > 	- Operasi `read` **tidak pernah di-block**.
> > 
> >
> > 2. **Aturan Write:**
> >     
> > 	- Saat Ti `write(Q)`, ia menulis ke **versi privat** miliknya (tidak terlihat transaksi lain).
> > 	
> >
> > 3. **Aturan Commit (Validasi):**
> >     
> > 	- Saat Ti ingin *commit*, ia harus lolos tes validasi yang disebut **First-Committer Wins**.
> > 
> >
> > ### Validasi: First-Committer Wins
> >
> > Validasi Ti akan **GAGAL** (dan Ti di-**rollback**) jika ada transaksi lain (Tj) yang memenuhi **SEMUA** kondisi berikut:
> >
> > 1. Tj berjalan **konkuren** dengan Ti (waktu hidup mereka _overlap_).
> >     
> > 2. Tj **sudah** _**commit**_ lebih dulu daripada Ti.
> >     
> > 3. Tj **menulis** (`WS(Tj)`) setidaknya satu item data yang **juga ditulis** oleh Ti (`WS(Ti)`).
> >     
> >
> > **Dengan kata lain:** Jika ada "konflik tulis-tulis" (Write-Write Conflict) yang tumpang tindih, siapa yang _commit_ pertama, dia yang menang. Yang _commit_ belakangan akan _rollback_.
> >
> > ### Anomali: SI Tidak Serializable
> >
> > _Snapshot Isolation_ **TIDAK** menjamin _serializability_. Anomali utamanya adalah **Write Skew**.
> >
> > **Contoh Write Skew (Slide 12):**
> >
> > - Batasan: `A + B` tidak boleh negatif. Awal: A=100, B=100.
> >     
> >	
> > 	1. **T1 (Start):** Ambil _snapshot_ (A=100, B=100).
> > 	    
> > 	2. **T2 (Start):** Ambil _snapshot_ (A=100, B=100).
> > 	    
> > 	3. **T1:** `read(A)` (A=100).
> > 	    
> > 	4. **T2:** `read(B)` (B=100).
> > 	    
> > 	5. **T1:** Cek `(100 + B) >= 150`? (T1 anggap B=100, jadi 200 >= 150 -> OK).
> > 	    
> > 	6. **T1:** `write(A = A - 150)` (A = -50 di versi privat T1).
> > 	    
> > 	7. **T2:** Cek `(A + 100) >= 150`? (T2 anggap A=100, jadi 200 >= 150 -> OK).
> > 	    
> > 	8. **T2:** `write(B = B - 150)` (B = -50 di versi privat T2).
> > 	    
> > 	9. **T1 (Commit):** Validasi sukses (T1 dan T2 tidak ada _write-write conflict_, karena T1 tulis A, T2 tulis B). **Commit A = -50.**
> > 	    
> > 	10. **T2 (Commit):** Validasi sukses. **Commit B = -50.**
> >     
> >
> > **Hasil Akhir:** A = -50, B = -50. Total `A + B = -100`. **Batasan dilanggar!** Ini bukan _serializable_.

> [!cornell] #### Summary
> 
> _**Snapshot Isolation (SI)**_ **adalah level isolasi populer di mana transaksi membaca dari "foto" (snapshot) database pada saat ia dimulai (`Start(Ti)`), sehingga `read` tidak pernah** _**block**_**. Saat** _**commit**_**, ia menggunakan validasi** _**First-Committer Wins**_**, yang akan me-**_**rollback**_ **transaksi jika ada** _**write-write conflict**_ **(tumpang tindih penulisan) dengan transaksi lain yang** _**commit**_ **lebih dulu. SI tidak** _**serializable**_ **dan rentan terhadap anomali** _**Write Skew**_**, di mana dua transaksi konkuren membuat keputusan berdasarkan data usang yang mereka baca, yang menyebabkan inkonsistensi.**