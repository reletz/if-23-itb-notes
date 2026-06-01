---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 4.1: Konsep & Multiversion Timestamp Ordering
> 
> > ## Questions/Cues
> > 
> > - Apa ide dasar _Multiversion_ (MV)?
> >     
> > - Apa keuntungan utama MV?
> >     
> > - Bagaimana MV bekerja?
> >     
> > - Apa itu _Multiversion Timestamp Ordering_?
> >     
> > - Timestamp apa saja yang disimpan?
> >     
> > - Bagaimana Aturan _Read_ (MVTO)?
> >     
> > - Bagaimana Aturan _Write_ (MVTO)?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "11 - Concurrency Control - 4.pdf" (Hal 3-5)
> >     
> 
> > ### Ide Dasar: Multiversion Schemes
> > 
> > _Multiversion Concurrency Control_ (MVCC) adalah pendekatan di mana sistem **menyimpan beberapa versi lama** dari sebuah item data, alih-alih hanya menyimpan satu nilai terbaru.
> > 
> > **Ide Kunci:**
> > 
> > 1. Setiap operasi `write(Q)` yang sukses akan membuat **versi baru** dari Q. Versi lama tidak dihapus (untuk sementara).
> >     
> > 2. Setiap versi diberi "label" (biasanya _timestamp_) yang menandakan kapan ia dibuat.
> >     
> > 
> > ### Keuntungan Utama Multiversion
> > 
> > Keuntungan terbesarnya adalah: **Operasi `read` tidak pernah perlu menunggu (block) operasi `write`**.
> > 
> > - Jika T1 (read) ingin membaca Q sementara T2 (write) sedang mengunci Q, T1 tidak perlu menunggu.
> >     
> > - Sistem akan mencarikan "versi" Q yang tepat (misal, versi lama sebelum T2 mulai) dan memberikannya kepada T1.
> >     
> > - Ini meningkatkan konkurensi secara drastis, terutama pada beban kerja _read-heavy_.
> >     
> > 
> > ### Multiversion Timestamp Ordering (MVTO)
> > 
> > Ini adalah salah satu implementasi MVCC yang menggunakan _timestamp ordering_ (mirip Catatan 3.1, tapi sekarang dengan versi).
> > 
> > **Timestamp yang Disimpan:**
> > 
> > - `TS(Ti)`: _Timestamp_ unik yang diberikan saat transaksi Ti dimulai.
> >     
> > - Untuk setiap **versi `Qk`** dari item data Q, disimpan 2 _timestamp_:
> >     
> >     - `W-TS(Qk)`: _Timestamp_ dari transaksi yang _membuat_ (menulis) versi `Qk` ini.
> >         
> >     - `R-TS(Qk)`: _Timestamp_ **terbesar** dari transaksi yang _pernah membaca_ versi `Qk` ini.
> >         
> > 
> > ### Aturan Read (MVTO)
> > 
> > Saat transaksi Ti ingin `read(Q)`:
> > 
> > 1. Sistem mencari versi `Qk` dari Q yang memiliki `W-TS(Qk)` **terbesar** yang **masih lebih kecil atau sama dengan `TS(Ti)`** (`W-TS(Qk) <= TS(Ti)`).
> >     
> > 2. Nilai dari versi `Qk` inilah yang dikembalikan ke Ti.
> >     
> > 3. Sistem kemudian meng-update _timestamp_ baca: `R-TS(Qk) = max(R-TS(Qk), TS(Ti))`.
> >     
> > 
> > ### Aturan Write (MVTO)
> > 
> > Saat transaksi Ti ingin `write(Q)`:
> > 
> > 1. Ti pertama-tama harus `read(Q)` (mengikuti aturan di atas) untuk menemukan versi `Qk` yang "valid" untuknya.
> >     
> > 2. **Tes Validasi 1:** Jika `TS(Ti) < R-TS(Qk)`:
> >     
> >     - **Logika:** Ti (lebih tua) ingin menulis, TAPI versi `Qk` yang ia baca _sudah_ dibaca oleh transaksi lain (Tj) yang _lebih muda_.
> >         
> >     - **Tindakan:** Ini melanggar _serializability_. Transaksi **Ti di-ABORT** (rollback).
> >         
> > 3. **Tes Validasi 2:** (Kasus khusus, TS sama) Jika `TS(Ti) == W-TS(Qk)`... (rollback).
> >     
> > 4. **Jika Lolos Validasi:**
> >     
> >     - **Tindakan:** Ti **membuat versi baru `Q_new`** dari data Q.
> >         
> >     - _Timestamp_ versi baru diatur: `W-TS(Q_new) = TS(Ti)` dan `R-TS(Q_new) = TS(Ti)`.
> >         

> [!cornell] #### Summary
> 
> _**Multiversion Schemes**_ **(MVCC) meningkatkan konkurensi dengan menyimpan beberapa versi lama dari data, sehingga operasi `read` tidak perlu menunggu `write`.** _**Multiversion Timestamp Ordering**_ **(MVTO) mengimplementasikan ini dengan** _**timestamp**_**. Saat `read(Q)`, transaksi Ti (`TS(Ti)`) akan membaca versi `Qk` dengan `W-TS` terbesar yang lebih kecil dari `TS(Ti)`. Saat `write(Q)`, Ti akan membuat versi baru, namun akan di-**_**rollback**_ **jika versi yang ia baca (`Qk`) ternyata sudah dibaca oleh transaksi lain yang lebih muda (`TS(Ti) < R-TS(Qk)`).**