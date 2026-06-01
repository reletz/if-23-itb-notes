---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Fault Tolerance (Toleransi Kesalahan) & Replikasi
> 
> > ## Questions/Cues
> >
> > - **Partial Failure**
> >     
> > - **Definisi Dependable System (4 Sifat)**
> >     
> > - **Failure Models (Crash vs Byzantine)**
> >     
> > - **Failure Detection (Timeout)**
> >     
> > - **Redundancy (Time vs Physical)**
> >     
> > - **k-Fault Tolerance**
> >     
> > - **Synchronous Replication**
> >     
> > - **Asynchronous Replication**
> >     
> > - **Split-Brain Problem**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-18-Consensus-2022.pdf (Halaman 1-12)
> >     
> > - Fokus: Konsep Dasar Ketahanan Sistem
> >     
> 
> > ### 1. Konsep Dasar Fault Tolerance
> >
> > Partial Failure (Kegagalan Parsial): Ciri khas sistem terdistribusi yang membedakannya dari sistem mesin tunggal. Dalam sistem terdistribusi, satu komponen bisa gagal (misal: satu server mati atau kabel putus) sementara komponen lain tetap berjalan.
> >
> > - **Tujuan Desain:** Membangun sistem yang bisa pulih otomatis dari kegagalan parsial tanpa mengganggu performa keseluruhan secara signifikan.
> >     
> >
> > **Terminologi Kegagalan:**
> >
> > - **Fault (Cacat):** Penyebab dasar kesalahan (misal: bad sector di disk, bug kode).
> >     
> > - **Error:** Bagian dari state sistem yang rusak akibat fault (misal: nilai variabel salah).
> >     
> > - **Failure (Kegagalan):** Saat sistem tidak lagi bisa memenuhi layanan yang dijanjikan (output salah atau mati total).
> >     
> > - **Jenis Fault:**
> >     
> > 	- _Transient:_ Muncul sekali lalu hilang (glitch).
> > 			
> > 	- _Intermittent:_ Muncul, hilang, lalu muncul lagi (kabel longgar).
> > 			
> > 	- _Permanent:_ Rusak selamanya sampai diganti (hard disk terbakar).
> > 			
> >
> > ### 2. Dependable Systems (Sistem Terpercaya)
> >
> > Sistem yang fault-tolerant disebut _Dependable_. Ada 4 syarat utama (Kopetz & Verissimo):
> >
> > 1. **Availability (Ketersediaan):** Sistem siap digunakan kapan saja (uptime tinggi).
> >     
> > 2. **Reliability (Keandalan):** Sistem berjalan terus menerus tanpa gagal dalam durasi tertentu.
> >     
> > 3. **Safety (Keselamatan):** Jika sistem gagal, tidak boleh terjadi bencana katastropik (misal: kendali reaktor nuklir gagal $\rightarrow$ shutdown aman, bukan meledak).
> >     
> > 4. **Maintainability:** Kemudahan perbaikan saat terjadi kerusakan.
> >     
> >
> > ### 3. Model Kegagalan (Failure Models)
> >
> > Mengklasifikasikan bagaimana sebuah server bisa gagal (Slide 5):
> >
> > - **Crash Failure:** Server berhenti total, tapi sebelum berhenti ia bekerja benar. (Paling mudah ditangani).
> >     
> > - **Omission Failure:** Server gagal merespon request (Receive omission atau Send omission).
> >     
> > - **Timing Failure:** Respon server keluar dari batas waktu (terlalu cepat/lambat).
> >     
> > - **Byzantine / Arbitrary Failure:** Server "menggila". Ia bisa mengirim respon acak, bohong, atau bertindak jahat. Ini jenis kegagalan paling sulit ditangani.
> >     
> >
> > ### 4. Failure Masking (Menyembunyikan Kegagalan)
> >
> > Agar user tidak sadar ada kerusakan, sistem menggunakan **Redundansi**:
> >
> > - **Information Redundancy:** Menambah bit ekstra (misal: Hamming Code untuk deteksi error memori).
> >     
> > - **Time Redundancy:** Mengulang aksi (Retry). Efektif untuk _transient fault_.
> >     
> > - **Physical Redundancy:** Menambah hardware/proses ekstra (Replikasi server).
> >     
> >
> > **Aturan Redundansi:**
> >
> > - Untuk menangani **k** kegagalan (Crash Failure), butuh **k+1** server.
> >     
> > - Untuk menangani **k** kegagalan (Byzantine Failure), butuh **2k+1** server (karena butuh voting mayoritas untuk mengalahkan yang "bohong").
> >     
> >
> > ### 5. Strategi Replikasi (Replication)
> >
> > Cara utama masking failure adalah menjalankan grup proses identik.
> >
> > **A. Synchronous Replication (Eager/Active):**
> >
> > - Klien kirim request $\rightarrow$ Server 1 terima $\rightarrow$ Server 1 forward ke Server 2 & 3 $\rightarrow$ Tunggu SEMUA konfirmasi $\rightarrow$ Baru balas ke Klien.
> >     
> > - **Plus:** Konsistensi data terjamin (semua replika 100% sama).
> >     
> > - **Minus:** Lambat (latency setinggi link terlambat). Jika satu backup mati, sistem bisa macet (blocking).
> >     
> >
> > **B. Asynchronous Replication (Lazy/Passive):**
> >
> > - Klien kirim request $\rightarrow$ Server 1 terima & proses $\rightarrow$ Balas "OK" ke Klien $\rightarrow$ Baru kirim update ke Server 2 & 3 di background.
> >     
> > - **Plus:** Cepat (respon instan ke klien).
> >     
> > - **Minus:** Risiko kehilangan data. Jika Server 1 mati sebelum sempat kirim backup ke Server 2, data update hilang padahal klien sudah dibilang "OK".
> >     
> >
> > **Masalah Primary-Backup:**
> >
> > - **Split-Brain:** Jika koneksi antara Primary dan Backup putus, Backup mengira Primary mati lalu mengangkat diri jadi Primary baru. Sekarang ada 2 Primary yang menerima write berbeda $\rightarrow$ Inkonsistensi data parah.
> >     

> [!cornell] #### Summary
> 
> Fault Tolerance bertujuan menangani Partial Failure agar sistem tetap Dependable (Available, Reliable, Safe). Kegagalan dikategorikan dari yang jinak (Crash Failure) hingga yang ganas (Byzantine Failure). Solusi utamanya adalah Redundansi Fisik (Replikasi). Replikasi Synchronous menjamin konsistensi kuat tapi lambat dan rentan blocking, sedangkan Asynchronous cepat namun berisiko kehilangan data (data loss) jika master mati mendadak. Masalah Split-Brain adalah ancaman utama dalam arsitektur Primary-Backup.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Teorema CAP (Consistency, Availability, Partition Tolerance)
> 
> Materi replikasi ini sangat erat kaitannya dengan Teorema CAP.
> 
> - **Synchronous Replication** memilih **CP** (Consistency & Partition Tolerance). Jika jaringan putus, sistem memilih berhenti (tidak Available) daripada data beda.
>     
> - **Asynchronous Replication** memilih **AP** (Availability & Partition Tolerance). Jika jaringan putus, sistem tetap jalan (Available) meski data antar server mungkin beda (tidak Consistent).
>     
> 
> #### Hamming Code (Information Redundancy)
> 
> Disebutkan di slide. Ini adalah teknik Error Correcting Code (ECC). Dengan menambah bit paritas pada posisi $2^n$, kita bisa mendeteksi _dan_ memperbaiki _single bit flip_ pada memori atau transmisi data.
> 
> #### Sumber & Referensi:
> 
> - **Book:** "Distributed Systems: Principles and Paradigms" oleh Tanenbaum & Van Steen.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan antara "Fault", "Error", dan "Failure"?</strong></summary>
> 
> <strong>Fault</strong> adalah penyebab cacat (bug/kerusakan fisik). <strong>Error</strong> adalah status sistem yang salah akibat fault (variabel null). <strong>Failure</strong> adalah perilaku sistem yang menyimpang dari spesifikasi (layanan mati). Fault menyebabkan Error, Error menyebabkan Failure.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa untuk menangani k kegagalan Byzantine diperlukan 2k+1 server, sedangkan untuk Crash failure cukup k+1?</strong></summary>
> 
> Pada Crash failure, server yang mati tidak mengirim respon (diam), jadi server yang hidup bisa langsung dipercaya. Pada Byzantine, server yang rusak bisa mengirim informasi bohong/jahat. Kita butuh mayoritas suara jujur ($k+1$ jujur) untuk mengalahkan suara bohong ($k$ jahat). Total server = $(k+1) + k = 2k+1$.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa risiko utama dari replikasi Asynchronous (Primary-Backup)?</strong></summary>
> 
> Risiko kehilangan data (Data Loss). Jika Primary menerima write dari klien, mengirim ACK sukses, lalu crash <em>sebelum</em> sempat mem-forward data tersebut ke Backup, maka data tersebut hilang permanen, namun klien mengira data sudah tersimpan aman.
> 
> </details>