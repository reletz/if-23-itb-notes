---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Disaster Recovery: Database Dumps & Remote Backup
> 
> > ## Questions/Cues
> > 
> > - Apa beda **System Crash** vs **Disk Failure**?
> >     
> > - Bagaimana recovery dari **Disk Failure** (nonvolatile loss)?
> >     
> > - Apa itu **Database Dump**?
> >     
> > - Bagaimana proses _restore_ dari _dump_?
> >     
> > - Apa tujuan **Remote Backup System**?
> >     
> > - Apa itu **High Availability (HA)**?
> >     
> > - Bagaimana arsitektur _remote backup_?
> >     
> > - Bagaimana **Transfer of Control** (failover) bekerja?
> >     
> > - Apa itu **Hot-Spare**?
> >     
> > - Apa itu **One-Safe**? (Risiko?)
> >     
> > - Apa itu **Two-Very-Safe**? (Risiko?)
> >     
> > - Apa itu **Two-Safe**? (Kompromi?)
> >     
> >
> > ## Reference Points
> > 
> > - Slides "12 - Recovery System - 2.pdf" (Slide 41-48)
> >     
> 
> > ### Failure with Loss of Nonvolatile Storage
> > 
> > Sejauh ini kita berasumsi system crash (RAM hilang) dan nonvolatile (disk) aman.
> > 
> > Disk Failure adalah bencana (disaster) di mana nonvolatile storage itu sendiri hilang atau rusak.
> > 
> > - **Solusi**: Kita harus memiliki _copy_ (salinan) database di media penyimpanan lain (misal: _tape_, disk terpisah, _cloud storage_).
> >     
> > - **Metode**: **Database Dump** (backup periodik).
> >     
> > 
> > Database Dump:
> > 
> > Prosedur di mana seluruh konten database disalin ke stable storage.
> > 
> > - **Proses Dump (Sederhana)**: Hentikan semua transaksi, lakukan _checkpoint_ (memastikan data di disk konsisten), lalu salin seluruh file database.
> >     
> > - **Prookses Recovery from Dump**:
> >     
> >     1. **Restore**: Salin database dari _dump_ (backup) terakhir.
> >         
> >     2. **Roll Forward**: Ambil arsip _log_ yang disimpan sejak _dump_ terakhir.
> >         
> >     3. Lakukan **REDO** untuk _semua_ transaksi yang telah _commit_ sejak _dump_ terakhir. (Tidak perlu `UNDO` karena _dump_ adalah _state_ yang sudah konsisten).
> >         
> > - **Fuzzy Dump / Online Dump**: Versi canggih di mana _dump_ dapat dilakukan tanpa menghentikan transaksi, mirip _fuzzy checkpoint_.
> >     
> > 
> > ### Remote Backup Systems
> > 
> > _Database Dump_ bagus untuk _disaster recovery_, tapi proses _restore_ bisa lama (disebut _low availability_).
> > 
> > - **Tujuan**: Menyediakan **High Availability (HA)**, yaitu kemampuan sistem untuk terus beroperasi (atau cepat pulih) bahkan jika seluruh _primary site_ (data center) hancur.
> >     
> > - **Arsitektur**:
> >     
> >     - **Primary Site**: Server database utama yang aktif melayani transaksi.
> >         
> >     - **Backup Site**: Server di lokasi geografis berbeda yang _pasif_ (standby).
> >         
> >     - **Network**: _Primary_ terus-menerus mengirimkan _log records_ (khususnya _redo log_) ke _backup site_ melalui jaringan.
> >         
> > 
> > ### Proses Failover (Transfer of Control)
> > 
> > 1. **Deteksi Kegagalan:**
> > 
> > 	Backup site harus tahu jika primary gagal. Ini biasanya menggunakan heart-beat message. Jika heart-beat dari primary berhenti, backup site mengasumsikan primary gagal.
> > 
> > 1. **Transfer of Control (Takeover):**
> > 
> > 	Backup site mengambil alih tugas primary.
> > 
> > 	1. _Backup site_ melakukan proses recovery menggunakan _copy_ database-nya dan semua _log_ yang telah diterimanya.
> > 	    
> > 	2. Ia melakukan `REDO` pada transaksi yang _commit_ dan `UNDO` pada yang _incomplete_.
> > 	    
> > 	3. _Backup site_ kini menjadi _primary_ baru dan siap menerima koneksi transaksi.
> >     
> > 
> > **Hot-Spare Configuration (Slide 46):**
> > 
> > Untuk takeover yang sangat cepat, backup site tidak hanya menerima log, tapi terus-menerus memproses/menerapkan REDO dari log tersebut begitu tiba.
> > 
> > Saat primary gagal, backup site (yang datanya sudah up-to-date) hanya perlu melakukan UNDO pada transaksi incomplete terakhir, membuatnya siap dalam hitungan detik.
> > 
> > ### Tingkat Durability vs. Ketersediaan (Slide 47)
> > 
> > Ini adalah _trade-off_ krusial: Kapan transaksi di _primary_ boleh dianggap `commit`?
> > 
> > 1. **One-Safe:** Commit dianggap selesai begitu log ditulis di primary site.
> > 
> > 	- **(+) Cepat / Ketersediaan Tinggi**: Transaksi tidak perlu menunggu jaringan ke _backup_.
> > 		
> > 	- **(-) Risiko Kehilangan Data**: Jika _primary_ _crash_ _setelah_ `commit` tapi _sebelum_ log-nya terkirim ke _backup_, transaksi itu akan **hilang selamanya** (_backup_ tidak pernah tahu).
> >     
> > 
> > 2. **Two-Very-Safe (Synchronous):** Commit dianggap selesai HANYA JIKA log ditulis di primary DAN backup site.
> > 
> > 	- **(+) Durabilitas Maksimum**: Dijamin tidak ada data hilang.
> > 		
> > 	- **(-) Lambat / Ketersediaan Rendah**: Jika jaringan lambat, `commit` jadi lambat. Jika _backup site_ atau jaringan _down_, _primary site_ **tidak bisa `commit`** (berhenti total).
> > 		
> > 
> > 3. **Two-Safe (Kompromi / Hybrid):**  Solusi terbaik untuk menyeimbangkan keduanya.
> > 
> > 	- Jika _primary_ dan _backup_ _up_, sistem berjalan di mode **Two-Very-Safe**.
> > 		
> > 	- Jika _primary_ _up_ tapi _backup_ (atau jaringan) _down_, _primary_ otomatis beralih ke mode **One-Safe** agar tetap bisa beroperasi.
> > 		
> > 	- Sistem akan _sync_ ulang saat _backup_ hidup kembali.
> >     

> [!cornell] #### Summary
> 
> **Recovery dari** _**disaster**_ **(kehilangan disk) memerlukan **Database Dump** (backup), yang di-**_**restore**_ **dan di-**_**roll forward**_ **(REDO) dengan arsip log. Untuk** _**High Availability**_**, **Remote Backup System** digunakan, di mana** _**primary site**_ **mengirim log ke** _**backup site**_**. Konfigurasi **Hot-Spare** (menerapkan log terus-menerus) memungkinkan** _**failover**_ **cepat. Terdapat** _**trade-off**_ **durabilitas: **One-Safe** cepat tapi berisiko kehilangan data, **Two-Very-Safe** aman tapi lambat dan rentan** _**down**_**, sedangkan **Two-Safe** menawarkan kompromi terbaik antara keduanya.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: RPO dan RTO
> 
> Pilihan strategi backup dan recovery sangat bergantung pada dua metrik bisnis:
> 
> 1. **RPO (Recovery Point Objective)**: _Berapa banyak data yang boleh hilang?_
>     
>     - Jika RPO = 0 (nol kehilangan data), Anda **wajib** menggunakan **Two-Very-Safe** (Replikasi Sinkron).
>         
>     - Jika RPO = 5 menit, Anda bisa menggunakan **One-Safe** (Replikasi Asinkron) selama _lag_ (jeda) replikasi dijamin di bawah 5 menit.
>         
> 2. **RTO (Recovery Time Objective)**: _Berapa lama sistem boleh mati (down) saat terjadi bencana?_
>     
>     - Jika RTO = 5 detik, Anda **wajib** menggunakan **Hot-Spare** dengan _failover_ otomatis.
>         
>     - Jika RTO = 4 jam, Anda mungkin masih bisa menggunakan _restore_ manual dari _database dump_ (tergantung ukuran database).
>         
> 
> #### Pendalaman Teknis: Replikasi Sinkron vs. Asinkron
> 
> Konsep _durability_ di slide 47 adalah nama lain untuk mode replikasi:
> 
> - **Synchronous Replication (Two-Very-Safe)**: `COMMIT` di _primary_ akan _menunggu_ (wait) konfirmasi `WRITE` dari _backup_ sebelum mengirim balasan sukses ke klien. Ini menjamin data RPO=0, tapi menambah latensi pada setiap transaksi `COMMIT`.
>     
> - **Asynchronous Replication (One-Safe)**: `COMMIT` di _primary_ _tidak menunggu_ _backup_. _Primary_ mengirim log ke _backup_ "sebisanya". Selalu ada _replication lag_ (jeda waktu). Jika _primary_ gagal, data dalam _lag_ itu akan hilang.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 19.9.
>     
> - **Konsep**: "High Availability (HA) vs. Disaster Recovery (DR)", "RPO vs RTO", "Synchronous vs. Asynchronous Replication".
>