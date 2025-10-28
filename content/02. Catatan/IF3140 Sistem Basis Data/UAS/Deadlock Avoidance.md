---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 2.2: Penghindaran Deadlock (Avoidance)
> 
> > ## Questions/Cues
> >
> > - Apa itu _Deadlock Avoidance_?
> >     
> > - Apa beda _Prevention_ vs _Avoidance_?
> >     
> > - Apa asumsi yang dipakai?
> >     
> > - Apa itu _Timestamp_ Transaksi?
> >     
> > - Apa itu skema _Wait-Die_?
> >     
> > - Apa itu skema _Wound-Wait_?
> >     
> > - Kapan transaksi MENUNGGU di _Wait-Die_?
> >     
> > - Kapan transaksi MATI di _Wait-Die_?
> >     
> > - Kapan transaksi MENUNGGU di _Wound-Wait_?
> >     
> > - Kapan transaksi MELUKAI di _Wound-Wait_?
> >     
> > - Mana yang _preemptive_?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 21-22)
> >     
> 
> > ### Definisi: Deadlock Avoidance
> >
> > **Deadlock Avoidance** (Penghindaran) adalah pendekatan **dinamis** untuk menangani _deadlock_.
> >
> > - Berbeda dengan _Prevention_ (Pencegahan) yang menerapkan aturan kaku di awal, _Avoidance_ mengecek setiap permintaan _lock_ saat _runtime_.
> >     
> > - Sistem akan memutuskan apakah "aman" untuk memberikan _lock_ tersebut. Jika permintaan _lock_ berpotensi menciptakan _deadlock_ di masa depan, sistem akan menundanya atau me-_rollback_ salah satu transaksi.
> >     
> >
> > ### Asumsi: Timestamp
> >
> > Metode _avoidance_ yang paling umum menggunakan **Timestamp (TS)**.
> >
> > 1. Setiap transaksi (Ti) diberi _timestamp_ unik saat ia dimulai.
> >     
> > 2. Sistem menggunakan urutan _timestamp_ ini untuk memutuskan siapa yang harus menunggu atau siapa yang harus _rollback_.
> >     
> > 3. Asumsi: **TS(Ti) < TS(Tj)** berarti **Ti lebih tua** dari Tj.
> >     
> >
> > ### Skema 1: Wait-Die (Tunggu-Mati)
> >
> > Ini adalah skema **non-preemptive** (tidak bisa mengambil paksa).
> >
> > **Aturan:** Asumsikan Ti meminta _lock_ yang sedang dipegang oleh Tj.
> >
> > 1. **Jika TS(Ti) < TS(Tj) — (Ti lebih TUA dari Tj):**
> >     
> > 	- **Ti MENUNGGU (WAIT).**
> > 	- Logika: Transaksi yang lebih tua diizinkan menunggu transaksi yang lebih muda.
> >
> >
> > 2. **Jika TS(Ti) > TS(Tj) — (Ti lebih MUDA dari Tj):**
> >     
> > 	- **Ti MATI (DIE) / Rollback.**
> > 	- Logika: Transaksi yang lebih muda tidak boleh menunggu transaksi yang lebih tua (karena ini bisa jadi awal dari siklus). Ti akan di-*rollback* dan dimulai ulang nanti (dengan *timestamp* yang sama).
> > 
> > ### Skema 2: Wound-Wait (Lukai-Tunggu)
> >
> > Ini adalah skema **preemptive** (bisa mengambil paksa).
> >
> > **Aturan:** Asumsikan Ti meminta _lock_ yang sedang dipegang oleh Tj.
> >
> > 1. **Jika TS(Ti) < TS(Tj) — (Ti lebih TUA dari Tj):**
> >     
> > 	- **Ti MELUKAI (WOUND) Tj.**
> > 	- Logika: Transaksi yang lebih tua "melukai" transaksi yang lebih muda. Tj dipaksa *rollback* (*preempted*) dan melepaskan *lock*-nya. *Lock* kemudian diberikan kepada Ti.
> > 	
> >
> > 2. **Jika TS(Ti) > TS(Tj) — (Ti lebih MUDA dari Tj):**
> >     
> > 	- **Ti MENUNGGU (WAIT).**
> > 	- Logika: Transaksi yang lebih muda diizinkan menunggu transaksi yang lebih tua.
> > 
> >
> > ### Perbandingan Wait-Die vs Wound-Wait
> >
> > |**Skenario (Ti minta lock Tj)**|**Wait-Die (Non-preemptive)**|**Wound-Wait (Preemptive)**|
> > |---|---|---|
> > |**Ti lebih TUA** (TS(Ti) < TS(Tj))|Ti **MENUNGGU**|Ti **MELUKAI** Tj (Tj _rollback_)|
> > |**Ti lebih MUDA** (TS(Ti) > TS(Tj))|Ti **MATI** (Ti _rollback_)|Ti **MENUNGGU**|
> >
> > - **Wait-Die:** Transaksi yang _rollback_ adalah transaksi yang _meminta lock_ (Ti yang lebih muda).
> >     
> > - **Wound-Wait:** Transaksi yang _rollback_ adalah transaksi yang _memegang lock_ (Tj yang lebih muda).
> >     
> >
> > Kedua skema ini **menjamin bebas** _**deadlock**_ karena mereka memutus potensi _circular wait_ menggunakan urutan _timestamp_.

> [!cornell] #### Summary
> 
> _**Deadlock Avoidance**_ **adalah pendekatan dinamis yang memeriksa setiap permintaan** _**lock**_ **saat** _**runtime**_ **untuk mencegah** _**deadlock**_**. Ini sering menggunakan** _**Timestamp**_ **(TS) untuk menentukan prioritas. Ada dua skema utama: (1)** _**Wait-Die**_ **(Non-preemptive), di mana jika Ti lebih TUA dari Tj, Ti MENUNGGU, tetapi jika Ti lebih MUDA, Ti MATI (rollback). (2)** _**Wound-Wait**_ **(Preemptive), di mana jika Ti lebih TUA dari Tj, Ti MELUKAI Tj (Tj** _**rollback**_**), tetapi jika Ti lebih MUDA, Ti MENUNGGU. Kedua skema ini efektif mencegah** _**deadlock**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Masalah Starvation
> 
> Kedua skema ini bisa menyebabkan _starvation_ (kelaparan), di mana sebuah transaksi tidak pernah selesai karena terus-menerus di-_rollback_.
> 
> - **Wait-Die:** Transaksi yang "muda" (TS besar) bisa berulang kali "mati" (rollback) setiap kali ia mencoba mengakses _lock_ yang dipegang oleh transaksi yang lebih "tua". Jika ini terjadi terus-menerus, ia bisa mengalami _starvation_.
>     
> - **Wound-Wait:** Transaksi yang "muda" (TS besar) bisa berulang kali "dilukai" (rollback) oleh transaksi "tua" yang datang belakangan dan membutuhkan _lock_ yang sama.
>     
> 
> **Solusi:** Saat sebuah transaksi di-_rollback_ dan dimulai ulang, sistem harus **tetap menggunakan** _**timestamp**_ **aslinya (yang lama)**. Ini memastikan bahwa seiring berjalannya waktu, transaksi tersebut akan menjadi transaksi "paling tua" di sistem dan akhirnya akan mendapatkan semua _lock_ yang dibutuhkannya tanpa "mati" atau "dilukai".
> 
> #### Pro & Kontra
> 
> - **Wait-Die:** Cenderung menghasilkan lebih banyak _rollback_ karena transaksi yang lebih muda yang _meminta_ langsung di-_rollback_.
>     
> - **Wound-Wait:** Cenderung menghasilkan lebih sedikit _rollback_ karena _rollback_ hanya terjadi jika transaksi yang lebih tua datang dan _membutuhkan_ _lock_ yang dipegang oleh yang lebih muda (sebuah _preemption_).
>