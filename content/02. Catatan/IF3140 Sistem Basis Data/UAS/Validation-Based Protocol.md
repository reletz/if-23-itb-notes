---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 3.2: Validation-Based Protocol (Optimistic)
> 
> > ## Questions/Cues
> >
> > - Apa ide dasar _Validation Protocol_?
> >     
> > - Mengapa disebut _Optimistic_?
> >     
> > - Apa bedanya dengan _Pessimistic_ (Locking)?
> >     
> > - Apa 3 fase eksekusi?
> >     
> > - Fase 1: _Read Phase_?
> >     
> > - Fase 2: _Validation Phase_?
> >     
> > - Fase 3: _Write Phase_?
> >     
> > - Apa itu _Read Set_ `RS(Ti)`?
> >     
> > - Apa itu _Write Set_ `WS(Ti)`?
> >     
> > - Apa 3 _timestamp_ yang digunakan?
> >     
> > - Apa itu `Start(Ti)`?
> >     
> > - Apa itu `Validation(Ti)`?
> >     
> > - Apa itu `Finish(Ti)`?
> >     
> > - Bagaimana aturan Tes Validasi?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 3.pdf" (Hal 3-7)
> >     
> 
> > ### Ide Dasar: Optimistic Concurrency Control
> >
> > _Validation-Based Protocol_ juga dikenal sebagai **Optimistic Concurrency Control (OCC)**.
> >
> > - **Asumsi Optimis:** Konflik antar transaksi adalah kejadian yang **jarang**.
> >     
> > - **Strategi:** Biarkan transaksi bekerja "bebas" (tanpa _lock_), dengan asumsi tidak akan ada konflik. Sebelum _commit_, lakukan "tes validasi" untuk memeriksa apakah ada konflik yang _benar-benar_ terjadi.
> >     
> > - **Kontras (Pessimistic):** _Lock-Based Protocol_ bersifat "pesimis". Asumsinya: konflik **sering** terjadi. Jadi, minta izin dulu (_lock_) sebelum bekerja.
> >     
> >
> > ### Tiga Fase Eksekusi Transaksi
> >
> > Setiap transaksi Ti dibagi menjadi tiga fase:
> >
> > 1. **Read Phase (Fase Baca & Eksekusi):**
> >     
> > 	- Transaksi Ti membaca nilai dari basis data.
> > 	- Ti melakukan semua perhitungan.
> > 	- Jika Ti melakukan `write(Q)`, nilai baru **hanya disimpan di *variabel lokal*** (temporer), BUKAN di basis data.
> > 	- Sistem mencatat *Read Set* `RS(Ti)` (item data apa saja yang dibaca) dan *Write Set* `WS(Ti)` (item data apa saja yang akan ditulis).
> >
> >
> > 2. **Validation Phase (Fase Validasi):**
> >     
> > 	- Dilakukan saat Ti siap untuk `commit`.
> > 	- Sistem menjalankan **Tes Validasi** untuk memeriksa apakah *write* Ti melanggar *serializability* terhadap transaksi lain yang sudah *commit*.
> > 	- Jika validasi **Gagal**, Ti di-*rollback* (Abort).
> > 	- Jika validasi **Sukses**, Ti lanjut ke fase 3.
> > 
> >
> > 3. **Write Phase (Fase Tulis):**
> >   - Nilai-nilai dari *variabel lokal* (di `WS(Ti)`) disalin secara permanen ke basis data.
> > 
> >
> > ### Timestamp untuk Validasi
> >
> > Untuk melakukan tes, sistem menggunakan 3 _timestamp_ (berbeda dari protokol sebelumnya):
> >
> > 1. `Start(Ti)`: Waktu ketika Ti memulai _Read Phase_.
> >     
> > 2. `Validation(Ti)`: Waktu ketika Ti memulai _Validation Phase_.
> >     
> > 3. `Finish(Ti)`: Waktu ketika Ti menyelesaikan _Write Phase_.
> >     
> >
> > Urutan _serializability_ ditentukan oleh urutan `Validation(Ti)`.
> >
> > ### Aturan Tes Validasi
> >
> > Saat Ti melakukan validasi (`Validation(Ti)`), sistem harus mengecek Ti terhadap **semua** transaksi Tj yang **sudah divalidasi lebih dulu** (yaitu, `Validation(Tj) < Validation(Ti)`).
> >
> > Validasi Ti **SUKSES** jika, untuk **setiap** Tj tersebut, **salah satu** dari kondisi berikut terpenuhi:
> >
> > 1. **Kondisi 1: `Finish(Tj) < Start(Ti)`**
> >     
> > 	- **Logika:** Tj sudah *selesai* (finish) *sebelum* Ti *mulai* (start).
> > 	- **Artinya:** Eksekusi mereka tidak *overlap* sama sekali. 100% Aman. Urutan serial: (Tj -\> Ti).
> >
> > 2. **Kondisi 2: `WS(Tj) ∩ RS(Ti) = ∅`**
> >  
> > 	- **Logika:** *Write Set* Tj **TIDAK beririsan** dengan *Read Set* Ti.
> > 	- **Artinya:** Ti **TIDAK** membaca data apapun yang ditulis oleh Tj.
> > 	- **Dan:** *Write Phase* Ti terjadi *setelah* *Write Phase* Tj (karena `Validation(Ti)` \> `Validation(Tj)`).
> > 	- **Kesimpulan:** Ini aman karena menjamin urutan serial (Tj -\> Ti). Ti tidak mungkin membaca data "kotor" dari Tj.
> >

> [!cornell] #### Summary
> 
> _**Validation-Based Protocol**_ **(atau** _**Optimistic**_**) berasumsi konflik jarang terjadi, sehingga transaksi dieksekusi tanpa** _**lock**_**. Eksekusi dibagi 3 fase: (1)** _**Read Phase**_ **(baca dari DB, tulis ke** _**variabel lokal**_**), (2)** _**Validation Phase**_ **(saat** _**commit**_**, lakukan tes validasi), dan (3)** _**Write Phase**_ **(salin** _**local write**_ **ke DB jika valid). Validasi Ti sukses jika, untuk setiap transaksi Tj yang sudah divalidasi lebih dulu, terbukti mereka tidak** _**overlap**_ **(`Finish(Tj) < Start(Ti)`) ATAU Ti tidak membaca apa yang Tj tulis (`WS(Tj) ∩ RS(Ti) = ∅`). Jika validasi gagal, Ti di-**_**rollback**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Kelebihan dan Kekurangan Protokol Optimistic
> 
> **Kelebihan:**
> 
> 1. **Konkurensi Tinggi:** Jika konflik memang jarang terjadi (misal, sistem _read-heavy_), protokol ini sangat efisien. Banyak transaksi bisa berjalan bersamaan tanpa _blocking_ (menunggu _lock_).
>     
> 2. **Bebas Deadlock:** Sama seperti _Timestamp-Based_, protokol ini tidak memiliki mekanisme _wait_, sehingga dijamin bebas _deadlock_.
>     
> 
> **Kekurangan:**
> 
> 1. **Biaya Rollback Mahal:** Jika transaksi Ti gagal validasi, ia di-_rollback_ setelah melakukan _semua_ pekerjaannya (seluruh _Read Phase_). Ini membuang-buang sumber daya.
>     
> 2. **Potensi Starvation:** Sebuah transaksi (misal Ti, transaksi yang berjalan lama) bisa saja berulang kali gagal validasi karena selalu konflik dengan transaksi-transaksi pendek yang _commit_ lebih dulu.
>     
> 3. **Overhead Validasi:** _Validation Phase_ itu sendiri bisa menjadi _bottleneck_. Sistem harus mengecek `RS(Ti)` dan `WS(Ti)` terhadap banyak transaksi lain, yang bisa jadi mahal dan butuh _latch_ (lock internal).
>