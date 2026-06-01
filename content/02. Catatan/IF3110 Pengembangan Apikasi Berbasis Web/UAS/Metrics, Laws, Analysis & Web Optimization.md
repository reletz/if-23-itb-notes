---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Metrics, Laws, Analysis & Web Optimization
> 
> > ## Questions/Cues
> >
> > - Utilization Law ($U=T \times S$)
> >     
> > - Little's Law ($q=T \times R$)
> >     
> > - 5 Karakteristik Metrik
> >     
> > - Analisis "Lumpy" Workload
> >     
> > - Optimasi Database (DB)
> >     
> > - Optimasi Web App
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3110-12-Performance-Engineering (Pages 13-35)
> >     
> 
> > ### 1. Hukum Dasar Performa (Performance Laws)
> >
> > Dua hukum fisika komputasi yang wajib dipahami untuk memprediksi perilaku sistem:
> >
> > #### a. Utilization Law
> >
> > Menghitung seberapa sibuk sebuah resource (CPU/Disk).
> > 
> > $$U = T \times S$$
> >
> > - $U$ **(Utilization):** Persentase kesibukan alat (0% - 100%).
> >     
> > - $T$ **(Throughput):** Jumlah request per detik.
> >     
> > - $S$ **(Service Time):** Waktu yang dibutuhkan untuk memproses satu request.
> >     
> > - **Penting:** Jika $U$ mendekati 100%, antrean akan naik drastis (eksponensial).
> >     
> >
> > #### b. Little's Law
> >
> > Menghitung hubungan antara antrean, traffic, dan waktu tunggu.
> > 
> > $$q = T \times R$$
> >
> > - $q$ **(Queue/WIP):** Rata-rata jumlah item/user di dalam sistem.
> >     
> > - $T$ **(Throughput):** Laju kedatangan user.
> >     
> > - $R$ **(Response Time):** Lama waktu user berada di sistem.
> >     
> > - **Implikasi:** Jika sistem lambat ($R$ naik) sementara traffic ($T$) tetap, antrean ($q$) pasti memanjang.
> >     
> >
> > ### 2. Metrik Performa
> >
> > Metrik adalah standar ukuran objektif. Metrik yang baik harus memenuhi 5 sifat:
> >
> > 1. **Linearity:** Perubahan nilai metrik sebanding dengan perubahan beban.
> >     
> > 2. **Reliability:** Konsisten dan dapat dipercaya (bukan noise).
> >     
> > 3. **Repeatability:** Tes ulang dengan kondisi sama menghasilkan angka sama.
> >     
> > 4. **Ease of Measurement:** Mudah diukur/didapatkan datanya.
> >     
> > 5. **Consistency:** Definisi satuan tidak berubah-ubah.
> >     
> >
> > ### 3. Studi Kasus: Analisis "Budgeting" CPU
> >
> > Bagaimana merancang kapasitas CPU untuk sistem dengan beban 60.000 transaksi/jam?
> >
> > - **Masalah "Lumps" (Gumpalan Beban):** Beban sistem jarang rata. Sering ada _background task_ berat yang berjalan periodik (misal: Backup DB tiap 10 menit, Update Statistik tiap 10 detik).
> >     
> > - **Kesalahan Umum:** Menghitung kapasitas berdasarkan rata-rata saja.
> >     
> > - **Solusi:**
> >     
> > 	1. Identifikasi _background process_ yang berat.
> > 			
> > 	2. Hitung sisa "budget" CPU saat proses berat itu berjalan.
> > 			
> > 	3. Jika saat backup DB memakan 5 detik CPU, maka sisa aplikasi harus "puasa" resource atau berbagi resource yang sangat kecil di detik-detik tersebut.
> > 			
> > - **Pelajaran:** Desain sistem untuk kondisi terburuk (saat _lumps_ terjadi), bukan kondisi rata-rata.
> >     
> >
> > ### 4. Strategi Optimasi (Noteworthy)
> >
> > Tips praktis untuk meningkatkan performa:
> >
> > #### Database Optimization
> >
> > - **Hindari `SELECT *`:** Boros I/O dan memori. Ambil kolom spesifik saja.
> >     
> > - **Hati-hati `SORT BY` / `GROUP BY`:** Operasi CPU-bound yang berat pada data besar.
> >     
> > - **Purge vs Archive:** Pindahkan data lama (histori tahun lalu) ke tabel arsip agar tabel utama tetap kecil dan cepat.
> >     
> > - **Locking:** Gunakan mekanisme _locking_ seminimal mungkin untuk menghindari kemacetan (_deadlock_).
> >     
> >
> > #### Web App Design
> >
> > - **Stateless:** Jangan simpan state user di memori server agar mudah di-_scale_ (tambah server baru tanpa pusing memindahkan data sesi).
> >     
> > - **Asynchronous:** Gunakan proses _background_ untuk tugas berat (kirim email, generate PDF) agar user tidak menunggu loading.
> >     
> > - **Caching:** Simpan data yang sering diakses di memori (Redis/Memcached) untuk mengurangi beban Database.
> >     

> [!cornell] #### Summary
> 
> Performa sistem ditentukan oleh hukum dasar seperti Utilization Law dan Little's Law. Tantangan terbesar dalam desain kapasitas bukanlah beban rata-rata, melainkan variabilitas beban ("lumps") akibat proses periodik. Optimasi efektif melibatkan desain aplikasi yang Stateless, penggunaan Cache, serta efisiensi Query database (hindari SELECT * dan locking berlebihan).

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Deep Dive: Little's Law Intuition
> 
> Little's Law ($q=T \times R$) menjelaskan fenomena "kemacetan".
> 
> - Bayangkan jalan tol. $q$ adalah jumlah mobil di jalan.
>     
> - Jika ada kecelakaan, mobil melambat (Response Time $R$ naik).
>     
> - Karena mobil baru terus masuk (Throughput $T$ tetap), maka jumlah mobil di jalan ($q$) akan menumpuk.
>     
> - **Solusi:** Untuk mengurangi kemacetan ($q$), Anda harus melarang mobil masuk (turunkan $T$) ATAU membersihkan kecelakaan (turunkan $R$). Tidak ada cara lain.
>     
> 
> #### OLTP vs OLAP (Database Strategy)
> 
> - **OLTP (Transactional):** Untuk operasional sehari-hari. Fokus: Insert/Update cepat. Struktur data: Normalisasi (agar tidak duplikat).
>     
> - **OLAP (Analytical):** Untuk reporting/analisis. Fokus: Read cepat. Struktur data: Denormalisasi (data digabung agar mudah dibaca tanpa JOIN berat).
>     
> - **Tips:** Jangan lakukan query report berat di database OLTP saat jam kerja!
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa yang terjadi pada antrean jika Utilization (U) mendekati 100%?</strong></summary>
> 
> Antrean akan meningkat secara eksponensial (meledak), membuat sistem seolah-olah hang.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan rumus Utilization Law!</strong></summary>
> 
> $U = T \times S$. Kesibukan alat ($U$) adalah hasil kali antara jumlah request ($T$) dengan lama waktu memproses satu request ($S$).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa itu masalah "Lumps" dalam performa?</strong></summary>
> 
> Kondisi di mana beban sistem melonjak tajam dalam waktu singkat akibat proses periodik (seperti backup atau update statistik), yang sering luput jika kita hanya menghitung rata-rata.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Mengapa aplikasi web sebaiknya didesain "Stateless"?</strong></summary>
> 
> Agar mudah di-scale out (menambah jumlah server). Jika server tidak menyimpan data sesi lokal, request user bisa dilayani oleh server mana saja secara acak.
> 
> </details>