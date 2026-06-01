---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Physical Clock, Drift, & Algoritma Sinkronisasi
> 
> > ## Questions/Cues
> >
> > - **Mengapa butuh sinkronisasi?**
> >     
> > - **Quartz vs Atomic Clock**
> >     
> > - **UTC & Leap Second**
> >     
> > - **Drift vs Skew**
> >     
> > - **Monotonicity (Jangan Mundur!)**
> >     
> > - **Gradual Correction**
> >     
> > - **Algoritma Cristian**
> >     
> > - **Algoritma Berkeley**
> >     
> > - **NTP (Stratum & Modes)**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 1-28
> >     
> > - Fokus: Sinkronisasi Waktu Nyata
> >     
> 
> > ### 1. Urgensi & Limitasi Hardware Fisik
> >
> > Dalam sistem terdistribusi, kita memerlukan urutan (ordering) event untuk menjaga konsistensi data (misal: "Last Write Wins"). Namun, komputer menggunakan **Quartz Crystal Clock** yang tidak sempurna.
> >
> > - **Akurasi:** Standar quartz memiliki error sekitar **6 ppm** (parts per million), setara dengan pergeseran $\approx 0.5$ detik/hari.
> >     
> > - **Faktor Eksternal:** Frekuensi osilator dipengaruhi oleh perubahan suhu (lihat grafik hal 8) dan usia kristal.
> >     
> > - **Atomic Clock:** Standar emas (Cesium-133). Sangat akurat (1 detik per 6 juta tahun), mendasari standar **UTC (Coordinated Universal Time)**.
> >     
> >
> > Masalah Leap Second:
> > 
> > Rotasi bumi melambat, sehingga UTC (atom) dan GMT (solar) tidak sinkron.
> >
> > - **Solusi:** Penyisipan "Leap Second" (detik kabisat) pada 30 Juni atau 31 Des.
> >     
> > - **Bahaya:** Software sering berasumsi waktu selalu maju monoton. Leap second bisa menyebabkan _livelock_ atau crash pada sistem yang tidak siap (kasus Linux 2012).
> >     
> >
> > ### 2. Fenomena Drift & Skew
> >
> > Karena tidak ada dua kristal yang identik, dua komputer pasti akan memiliki waktu yang berbeda seiring berjalannya waktu.
> >
> > - **Clock Drift:** _Laju_ penyimpangan frekuensi jam terhadap waktu referensi sempurna ($dC/dt \neq 1$).
> >     
> > - **Clock Skew:** _Selisih/gap_ waktu instan antara dua jam pada satu titik waktu tertentu.
> >     
> > ![[Pasted image 20251216132023.png]]
> >
> > Penanganan Drift (PENTING):
> > 
> > Jika jam komputer terlalu cepat, kita TIDAK BOLEH memundurkan jam secara tiba-tiba (step back).
> >
> > - **Alasan:** Memundurkan waktu bisa mengacaukan urutan log file, _build system_ (make), dan urutan pesan database.
> >     
> > - **Solusi: Gradual Correction (Linear Compensating).** Jika terlalu cepat, perlambat laju detak jam (lewat OS interrupt) sampai sinkron. Jika terlalu lambat, percepat lajunya. Fungsi di Linux/Unix: `adjtime()`.
> >     
> >
> > ### 3. Algoritma Sinkronisasi (Mengatasi Network Delay)
> >
> > Tantangan utama sinkronisasi via jaringan adalah kita tidak tahu berapa lama pesan berjalan di kabel (_network latency_).
> >
> > **A. Algoritma Cristian (Pasif Server)**
> >
> > - **Skenario:** Klien meminta waktu ke Time Server yang akurat.
> >     
> > - **Masalah:** Waktu yang diterima klien sudah "basi" karena delay perjalanan pulang-pergi (Round Trip Time/RTT).
> >     
> > - Rumus Koreksi:
> >     
> >     $$T_{new} = T_{server} + \frac{(T_1 - T_0)}{2}$$
> >     
> >     Dimana $T_1 - T_0$ adalah RTT. Asumsinya delay request dan reply simetris.
> >     
> > - **Akurasi:** Kesalahan maksimal adalah $\pm (RTT/2 - T_{min})$.
> >     
> >
> > **B. Algoritma Berkeley (Aktif Master)**
> >
> > - **Skenario:** Tidak ada mesin yang punya sumber waktu atomik/GPS. Tujuannya hanya agar semua mesin di LAN **sepakat** (internal synchronization), tidak harus akurat terhadap UTC.
> >     
> > - **Mekanisme:**
> >     
> >     1. **Master** (daemon) melakukan _polling_ ke semua _slave_.
> >         
> >     2. Master menghitung rata-rata waktu (membuang outlier yang drift-nya terlalu jauh).
> >         
> >     3. Master mengirimkan **Offset** (koreksi delta +/-) ke masing-masing slave, bukan mengirim waktu absolut.
> >         
> >     
> >     - _Kenapa Offset?_ Agar slave bisa melakukan koreksi gradual (mempercepat/memperlambat jam) tanpa melompat.
> >         
> >
> > ### 4. Network Time Protocol (NTP)
> >
> > Protokol standar Internet (RFC 5905) untuk sinkronisasi global yang skalabel dan robust.
> >
> > - **Hierarki Stratum:**
> >     
> > 	- **Stratum 0:** Perangkat presisi tinggi (Atomic clock, GPS). Tidak terhubung ke jaringan langsung.
> > 			
> > 	- **Stratum 1:** Server yang terhubung langsung ke Stratum 0.
> > 			
> > 	- **Stratum 2:** Sinkronisasi ke Stratum 1, dan seterusnya.
> >         
> > - **Mode Operasi:**
> >     
> > 	- **Multicast:** Untuk LAN kecepatan tinggi (efisien tapi kurang akurat).
> > 			
> > 	- **Procedure Call:** Mirip algoritma Cristian (klien-server biasa).
> > 			
> > 	- **Symmetric:** Antar peer server (misal Stratum 1 ke Stratum 1) untuk saling mem-backup dan menjaga akurasi tertinggi.
> > 			

> [!cornell] #### Summary
> 
> Sinkronisasi waktu fisik terkendala oleh ketidaksempurnaan hardware (Quartz drift) dan variabilitas latensi jaringan. Prinsip utamanya adalah koreksi harus dilakukan secara gradual (monotonic), jangan pernah memundurkan jam. Algoritma Cristian cocok untuk klien yang mengontak server waktu, Algoritma Berkeley cocok untuk kesepakatan internal tanpa sumber eksternal, sedangkan NTP menyediakan arsitektur hierarkis (Stratum) yang toleran kesalahan untuk skala internet.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Matematika Sederhana NTP Offset
> 
> NTP menggunakan 4 timestamp untuk menghitung offset $\theta$ dan delay $\delta$:
> 
> - $T_1$: Request dikirim Client.
>     
> - $T_2$: Request diterima Server.
>     
> - $T_3$: Reply dikirim Server.
>     
> - $T_4$: Reply diterima Client.
>     
> - **Offset** $\theta$**:** $\frac{(T_2 - T_1) + (T_3 - T_4)}{2}$  
>     
> - **Delay** $\delta$**:** $(T_4 - T_1) - (T_3 - T_2)$  
>     
> 
> #### Outlier pada Algoritma Berkeley
> 
> Algoritma Berkeley sangat rentan terhadap jam yang rusak (byzantine failure). Oleh karena itu, langkah rata-rata (averaging) biasanya membuang nilai ekstrim (misal: jam yang berbeda > 10 menit dari yang lain) sebelum menghitung mean. Ini disebut _Fault Tolerant Average_.
> 
> #### Sumber & Referensi:
> 
> - **NTP Pool Project:** Proyek komunitas server NTP global (id.pool.ntp.org).
>     
> - **Man Page:** `man adjtimex` (Linux system call untuk tuning clock).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa kita tidak boleh memundurkan jam sistem (setting backward) saat melakukan koreksi waktu?</strong></summary>
> 
> Karena banyak aplikasi (make, database log, scheduler) bergantung pada asumsi bahwa waktu selalu bergerak maju (monotonik). Memundurkan waktu bisa menyebabkan event baru dianggap terjadi "sebelum" event lama, atau perulangan eksekusi tugas terjadwal.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa perbedaan mendasar tujuan antara Algoritma Cristian dan Algoritma Berkeley?</strong></summary>
> 
> Algoritma Cristian bertujuan mensinkronkan klien dengan server waktu eksternal yang dianggap "benar" (UTC). Algoritma Berkeley bertujuan mensinkronkan sekumpulan komputer satu sama lain (internal synchronization) agar memiliki waktu rata-rata yang sama, meskipun waktu rata-rata tersebut mungkin berbeda dari waktu UTC yang sebenarnya.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Dalam Algoritma Cristian, mengapa kita membagi Round Trip Time (RTT) dengan 2?</strong></summary>
> 
> Karena kita berasumsi bahwa delay jaringan bersifat simetris (waktu kirim request $\approx$ waktu terima reply). Jadi, waktu tempuh satu arah diperkirakan adalah setengah dari total waktu pulang-pergi.
> 
> </details>