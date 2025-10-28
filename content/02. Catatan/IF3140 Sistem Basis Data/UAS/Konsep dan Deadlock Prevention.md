---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 2.1: Konsep & Pencegahan Deadlock
> 
> > ## Questions/Cues
> >
> > - Apa itu _Deadlock_?
> >     
> > - Apa 4 kondisi perlu _Deadlock_?
> >     
> > - 1. _Mutual Exclusion_
> >         
> > - 2. _Hold and Wait_
> >         
> > - 3. _No Preemption_
> >         
> > - 4. _Circular Wait_
> >         
> > - Apa itu _Deadlock Prevention_?
> >     
> > - Bagaimana cara mencegah _Hold and Wait_?
> >     
> > - Apa itu _Pre-declaration_?
> >     
> > - Bagaimana cara mencegah _Circular Wait_?
> >     
> > - Apa itu _Total Order_?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 17-20)
>   
> >
> > ### Apa itu Deadlock?
> >
> > **Deadlock** (kebuntuan) adalah sebuah kondisi di mana dua atau lebih transaksi saling menunggu **selamanya** untuk melepaskan _lock_ yang mereka butuhkan.
> >
> > **Skenario Klasik:**
> >
> > 1. **T1:** `lock-X(A)`.
> >     
> > 2. **T2:** `lock-X(B)`.
> >     
> > 3. **T1:** `request-X(B)`. (T1 **Menunggu** T2).
> >     
> > 4. **T2:** `request-X(A)`. (T2 **Menunggu** T1).
> >     
> >
> > Hasil: T1 menunggu T2, dan T2 menunggu T1. Keduanya akan menunggu selamanya dan tidak ada yang bisa lanjut.
> >
> > ### Empat Kondisi Perlu (Necessary Conditions)
> >
> > Sebuah _deadlock_ bisa terjadi **jika dan hanya jika** keempat kondisi berikut terpenuhi secara bersamaan:
> >
> > 1. **Mutual Exclusion (Mutex):**
> >     
> > 	- Hanya satu transaksi yang boleh memegang *lock* pada suatu item data pada satu waktu (setidaknya untuk *lock* yang tidak kompatibel seperti *lock-X*).
> > 	- Ini adalah kondisi yang *inheren* dari mekanisme *locking* dan tidak bisa dihilangkan.
> >
> >
> > 2. **Hold and Wait (Tahan dan Tunggu):**
> >     
> >   - Sebuah transaksi yang *sudah memegang* setidaknya satu *lock* (misal T1 pegang A) diizinkan untuk *meminta dan menunggu* *lock* baru (misal T1 minta B).
> > 
> > 3. **No Preemption (Tidak Ada Paksaan):**
> >     
> >   - *Lock* yang sudah diberikan kepada sebuah transaksi tidak dapat diambil paksa (*preempted*) oleh sistem.
> >   - *Lock* hanya bisa dilepaskan secara sukarela oleh transaksi yang memegangnya.
> >
> > 4. **Circular Wait (Tunggu Melingkar):**
> > 	- Terdapat sebuah rantai (siklus) dari transaksi yang saling menunggu.
> > 	- Contoh: `T1 -> T2 -> ... -> Tn -> T1`, di mana `Ti -> Tj` berarti Ti sedang menunggu *lock* yang dipegang oleh Tj.
> > 
> >
> > ### Deadlock Prevention (Pencegahan)
> >
> > Strategi _prevention_ (pencegahan) adalah memastikan agar sistem **tidak akan pernah** masuk ke kondisi _deadlock_.
> > Caranya adalah dengan "menyerang" (menghilangkan) setidaknya salah satu dari empat kondisi perlu tersebut (biasanya Hold-and-Wait atau Circular-Wait).
> >
> > #### 1. Menyerang "Hold and Wait"
> >
> > - **Metode:** _**Pre-declaration**_ **(Deklarasi di Awal)**
> >     
> >     - **Aturan:** Setiap transaksi harus meminta **SEMUA** _lock_ yang ia butuhkan di awal eksekusinya. Jika semua _lock_ bisa didapat, transaksi boleh berjalan. Jika ada satu saja yang tidak bisa didapat, transaksi tidak boleh memegang _lock_ apapun dan harus menunggu.
> >         
> > - **Kelemahan:**
> >     
> >     - **Sulit:** Seringkali transaksi tidak tahu _lock_ apa saja yang ia butuhkan di masa depan (tergantung kondisi data).
> >         
> >     - **Boros:** Transaksi akan memegang _lock_ (misal di akhir operasi) jauh lebih lama dari yang diperlukan.
> >         
> >     - **Konkurensi Rendah:** Mengurangi tingkat konkurensi secara drastis.
> >         
> >
> > #### 2. Menyerang "Circular Wait"
> >
> > - **Metode:** _**Impose Total Order**_ **(Paksakan Urutan Total)**
> >     
> >     - **Aturan:** Berikan nomor unik (urutan) pada semua item data (misal A=1, B=2, C=3, ...).
> >         
> >     - Paksakan semua transaksi untuk meminta _lock_ **hanya dalam urutan yang menaik**.
> >         
> >     - **Contoh:** Jika T butuh _lock_ A dan B, ia harus minta `lock(A)` dulu, baru `lock(B)`. Ia **dilarang** minta `lock(B)` lalu `lock(A)`.
> >         
> >     - **Mengapa ini berhasil?** Situasi _Circular Wait_ T1(pegang A, minta B) dan T2(pegang B, minta A) menjadi tidak mungkin. T2 akan dipaksa minta A dulu sebelum B.
> >         
> > - **Kelemahan:**
> >     
> >     - **Tidak Fleksibel:** Urutan akses data tidak selalu sesuai dengan urutan yang dipaksakan.
> >         
> >     - _Graph-Based Protocol_ (Catatan 1.4) adalah salah satu implementasi dari metode ini (menggunakan pohon sebagai urutan).
> >         

> [!cornell] #### Summary
> 
> _**Deadlock**_ **adalah kondisi di mana dua atau lebih transaksi saling menunggu** _**lock**_ **dalam sebuah siklus, sehingga berhenti selamanya. Ini bisa terjadi jika empat kondisi terpenuhi:** _**Mutual Exclusion**_**,** _**Hold and Wait**_ **(pegang 1, tunggu 1),** _**No Preemption**_ **(tidak bisa diambil paksa), dan** _**Circular Wait**_ **(siklus tunggu).** _**Deadlock Prevention**_ **(Pencegahan) bertujuan menghilangkan salah satu kondisi ini. Cara utamanya adalah menyerang** _**Hold and Wait**_ **dengan** _**Pre-declaration**_ **(minta semua** _**lock**_ **di awal) atau menyerang** _**Circular Wait**_ **dengan** _**Total Order**_ **(memaksa urutan permintaan** _**lock**_**), meskipun keduanya memiliki kelemahan pada fleksibilitas dan konkurensi.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Pencegahan vs Penghindaran vs Deteksi
> 
> Sangat penting untuk membedakan tiga strategi _deadlock handling_ ini:
> 
> 1. **Prevention (Pencegahan):** Paling ketat. Merancang sistem dengan aturan yang kaku (seperti _Total Order_) sehingga _deadlock_ **secara struktural tidak mungkin terjadi**. Ini seperti membangun jalan layang di perempatan agar tidak mungkin terjadi tabrakan.
>     
> 2. **Avoidance (Penghindaran):** (Akan dibahas di 2.2) Lebih dinamis. Sistem mengizinkan potensi _deadlock_, tetapi setiap kali ada permintaan _lock_, sistem akan mengecek apakah "aman" untuk memberikannya. Jika tidak aman (bisa menyebabkan _deadlock_), permintaan ditolak/ditunda. Ini seperti lampu merah yang mengatur lalu lintas.
>     
> 3. **Detection & Recovery (Deteksi & Pemulihan):** (Akan dibahas di 2.3) Paling longgar. Sistem membiarkan _deadlock_ terjadi. Secara periodik, sistem menjalankan algoritma untuk "mencari" apakah ada _deadlock_. Jika ditemukan, sistem akan memulihkannya (misal dengan me-_rollback_ satu transaksi). Ini seperti membiarkan tabrakan terjadi, lalu memanggil polisi dan truk derek.
>