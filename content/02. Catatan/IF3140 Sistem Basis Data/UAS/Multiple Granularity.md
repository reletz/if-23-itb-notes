---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 1.3: Multiple Granularity
> 
> > ## Questions/Cues
> >
> > - Apa itu _Granularity_?
> >     
> > - Apa _trade-off_ granularitas?
> >     
> > - Apa solusi _trade-off_ ini?
> >     
> > - Apa itu _Intention Lock_?
> >     
> > - Apa saja jenis _Intention Lock_?
> >     
> > - Apa itu _Intention Shared (IS)_?
> >     
> > - Apa itu _Intention Exclusive (IX)_?
> >     
> > - Apa itu _Shared Intention Exclusive (SIX)_?
> >     
> > - Bagaimana Matriks Kompatibilitas MG?
> >     
> > - Apa aturan Protokol Hirarki?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 10-16)
> >     
> 
> > ### Apa itu Granularity (Granularitas)?
> >
> > **Granularitas** mengacu pada "ukuran" dari item data yang dapat kita kunci. Dalam basis data, data diorganisir dalam sebuah hirarki.
> >
> > **Hirarki Granularitas (dari kasar ke halus):**
> >
> > 1. Basis Data (Keseluruhan)
> >     
> > 2. Tabel
> >     
> > 3. Halaman (Page) atau Blok Fisik
> >     
> > 4. Baris (Row) atau Tupel
> >     
> > 5. Atribut (Field)
> >     
> >
> > ### Trade-off Granularitas
> >
> > Memilih tingkat granularitas yang "tepat" adalah sebuah _trade-off_ antara biaya _overhead_ dan tingkat _konkurensi_.
> >
> > 1. **Granularitas Kasar (Coarse)**
> >     
> > 	- **Contoh:** Mengunci seluruh **Tabel**.
> > 	- **Overhead:** Rendah. Jika transaksi T butuh 1000 baris, ia hanya butuh 1 *lock* (di level tabel).
> > 	- **Konkurensi:** Rendah. Selama T mengunci tabel, tidak ada transaksi lain yang bisa mengakses baris *apapun* di tabel itu, meskipun barisnya berbeda.
> > 	- **Cocok untuk:** Transaksi *batch* yang mengakses \>50% data tabel.
> >
> > 2. **Granularitas Halus (Fine)**
> >     
> > 	- **Contoh:** Mengunci per **Baris**.
> > 	- **Overhead:** Tinggi. Jika T butuh 1000 baris, ia butuh 1000 *lock* terpisah, yang memakan memori dan waktu *Lock Manager*.
> > 	- **Konkurensi:** Tinggi. T1 dan T2 bisa bekerja pada baris yang berbeda di dalam tabel yang sama secara bersamaan.
> > 	- **Cocok untuk:** Transaksi OLTP singkat (misal, transfer uang, update 1 data).
> >
> > ### Solusi: Multiple Granularity (MG)
> >
> > Ide-nya adalah mengizinkan sistem untuk **mengunci pada level manapun** yang paling efisien, tergantung kebutuhan transaksi.
> >
> > - **Masalah:** Bagaimana jika T1 mengunci seluruh **Tabel** (lock-X), lalu T2 mencoba mengunci **Baris 5** di tabel itu? _Lock Manager_ harusnya tahu bahwa Baris 5 sudah terkunci (secara implisit) oleh T1. Mengecek seluruh hirarki ke atas setiap kali ada permintaan _lock_ sangatlah lambat.
> >     
> > - **Solusi:** Kita butuh _lock_ jenis baru.
> >     
> >
> > ### Intention Locks (Kunci Niat)
> >
> > **Intention Lock** adalah _lock_ penanda yang ditempatkan pada node _atas_ (kasar) untuk menandakan bahwa ada _lock_ eksplisit (S atau X) yang sedang atau akan dipasang pada node _bawah_ (halus).
> >
> > - Tujuannya: Efisiensi. Jika T2 mau `lock-X` di Tabel, ia cukup cek _lock_ di level Tabel. Jika ada `IS` atau `IX` di sana, ia tahu ada _lock_ di bawah dan harus tunggu. Ia tidak perlu _scan_ jutaan baris.
> >     
> >
> > **Jenis-Jenis Kunci dalam Protokol MG:**
> >
> > 1. **Shared (S):** Kunci baca (seperti biasa).
> >     
> > 2. **Exclusive (X):** Kunci tulis (seperti biasa).
> >     
> > 3. **Intention Shared (IS):** Niat untuk memasang _lock-S_ di level yang lebih rendah. (Contoh: Pasang `IS` di Tabel, lalu pasang `S` di beberapa Baris).
> >     
> > 4. **Intention Exclusive (IX):** Niat untuk memasang _lock-X_ di level yang lebih rendah. (Contoh: Pasang `IX` di Tabel, lalu pasang `X` di beberapa Baris).
> >     
> > 5. **Shared Intention Exclusive (SIX):**
> >     
> >     - Ini adalah _lock_ hibrida yang kuat.
> >         
> >     - Artinya: Transaksi ini **membaca seluruh sub-hirarki** (setara `S` di level ini) DAN **berniat meng-update beberapa item di bawah** (setara `IX`).
> >         
> >     - **Contoh Skenario:** "Scan seluruh tabel Gaji (`S` di tabel) dan beri kenaikan gaji (`X` di baris) untuk 10 orang".
> >         
> >
> > ### Matriks Kompatibilitas Multiple Granularity
> >
> > Matriks ini jauh lebih kompleks.
> >
> > |**(T1 holds)**|**IS**|**IX**|**S**|**SIX**|**X**|
> > |---|---|---|---|---|---|
> > |**IS**|**Boleh**|**Boleh**|**Boleh**|**Boleh**|Tunggu|
> > |**IX**|**Boleh**|**Boleh**|Tunggu|Tunggu|Tunggu|
> > |**S**|**Boleh**|Tunggu|**Boleh**|Tunggu|Tunggu|
> > |**SIX**|**Boleh**|Tunggu|Tunggu|Tunggu|Tunggu|
> > |**X**|Tunggu|Tunggu|Tunggu|Tunggu|Tunggu|
> >
> > **Logika Penting:**
> >
> > - `IS` vs `IX` (Boleh): Niatnya tidak konflik. Konflik sesungguhnya (jika ada) akan ditangani di level baris.
> >     
> > - `IX` vs `S` (Tunggu): `S` sedang membaca seluruh tabel, sementara `IX` berniat menulis di salah satu baris. Ini konflik.
> > 
> > 1. **X (Exclusive)** selalu konflik dengan apapun (kecuali tidak ada lock).
> > 2. **S (Shared)** hanya boleh barengan sama yang punya unsur "Baca" (**IS** dan **S** lainnya).
> > 3. **IX (Intention Exclusive)** hanya boleh barengan sama sesama "Intention" (**IS** dan **IX** lainnya).
> > 4. **SIX** itu egois karena dia gabungan **S** dan **IX**. Dia cuma kasih izin buat orang yang mau baca sedikit (**IS**).
> >     
> >
> > ### Protokol Locking Hirarki MG
> >
> > 1. Semua transaksi harus mematuhi **Matriks Kompatibilitas**.
> >     
> > 2. Permintaan _lock_ harus dilakukan secara **Top-Down** (dari akar/database ke daun/baris).
> >     
> > 3. Pelepasan _lock_ harus dilakukan secara **Bottom-Up** (dari daun/baris ke akar/database).
> >     
> >
> > **Aturan Request (Top-Down):**
> >
> > - Untuk mendapat `lock-S` atau `IS` pada node N, transaksi harus _sudah memegang_ `IS` atau `IX` pada `parent(N)`.
> >     
> > - Untuk mendapat `lock-X`, `IX`, atau `SIX` pada node N, transaksi harus _sudah memegang_ `IX` atau `SIX` pada `parent(N)`.
> >     
> >
> > Contoh Alur:
> > 
> > Transaksi T mau lock-X pada Baris R di dalam Tabel Tbl.
> >
> > 1. T minta `lock-IX` di **Database**. (Diberikan).
> >     
> > 2. T minta `lock-IX` di **Tabel Tbl**. (Harus cek kompatibilitas di Tbl. Diberikan).
> >     
> > 3. T minta `lock-X` di **Baris R**. (Harus cek kompatibilitas di R. Diberikan).
> >     

> [!cornell] #### Summary
> 
> **Granularitas adalah ukuran data yang dikunci (misal, Tabel vs Baris), yang memiliki** _**trade-off**_ **antara** _**overhead**_ **dan** _**konkurensi**_ **(Kasar: overhead rendah, konkurensi rendah; Halus: sebaliknya). Solusinya adalah** _**Multiple Granularity (MG)**_**, yang mengizinkan** _**lock**_ **di berbagai level. Agar efisien, MG menggunakan** _**Intention Lock**_ **(kunci niat) di level atas sebagai penanda (seperti `IS` - niat baca, `IX` - niat tulis, `SIX` - baca semua & tulis sebagian). Protokol ini mengharuskan** _**lock**_ **diminta secara** _**Top-Down**_ **(dari Database ke Baris) dan dilepas secara** _**Bottom-Up**_**, sambil mematuhi Matriks Kompatibilitas yang baru.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Kapan Menggunakan SIX?
> 
> Kunci `SIX` (Shared Intention Exclusive) adalah kunci yang sangat spesifik namun kuat. Bayangkan skenario berikut:
> 
> **Perintah SQL:** `UPDATE Gaji SET total = total * 1.05 WHERE departemen = 'Riset';`
> 
> **Analisis:**
> 
> 1. Basis data perlu **membaca** setiap baris di tabel `Gaji` untuk mengecek kolom `departemen`. Ini adalah operasi _Shared_ (S) di seluruh tabel.
>     
> 2. Untuk baris yang `departemen = 'Riset'`, basis data perlu **menulis** nilai baru. Ini adalah operasi _Exclusive_ (X) di _beberapa_ baris.
>     
> 
> **Strategi Locking:**
> 
> - **Opsi 1 (Lock X di Tabel):** Terlalu ketat. Tidak ada transaksi lain yang bisa _membaca_ gaji departemen 'Sales' selagi operasi ini berjalan. Konkurensi buruk.
>     
> - **Opsi 2 (Lock IX di Tabel, lalu X di Baris):** Bisa, tapi kurang efisien. Ini tidak memberitahu transaksi lain bahwa kita sedang _membaca_ seluruh tabel. Transaksi lain (misal T2) bisa saja mendapat `lock-IS` di tabel, lalu `lock-S` di baris departemen 'Sales'.
>     
> - **Opsi 3 (Lock S di Tabel):** Tidak bisa. Ini akan gagal saat kita mencoba `upgrade` ke `lock-X` di baris 'Riset' (karena butuh `IX` di tabel).
>     
> - **Opsi 4 (Lock SIX di Tabel):** Paling efisien.
>     
>     - `S` di `SIX` mengunci seluruh tabel untuk dibaca, mencegah transaksi lain (T2) mendapatkan `lock-X` di tabel.
>         
>     - `IX` di `SIX` memberi "niat" untuk menulis, mengizinkan transaksi ini mendapatkan `lock-X` di level baris.
>         
>     - Ini mengizinkan transaksi lain (T3) untuk mendapatkan `lock-IS` di tabel dan `lock-S` di baris lain (misal departemen 'Sales') secara bersamaan.
>