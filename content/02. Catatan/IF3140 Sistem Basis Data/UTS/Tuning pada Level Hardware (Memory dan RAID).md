---

type: Note

cssclasses:

- cornell-notes
    

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan utama tuning hardware?
> >     
> > - Apa itu "Five-Minute Rule"?
> >     
> > - Apa itu RAID dan apa dua konsep utamanya?
> >     
> > - Apa perbedaan utama antara RAID 0, 1, 5, dan 10?
> >     
> 
> > ### Tuning Hardware: Memori dan Disk
> > 
> > Karena disk I/O adalah bottleneck utama, tuning hardware fokus pada dua hal: **mengurangi jumlah akses disk** dengan menyimpan lebih banyak data di memori (RAM), atau **meningkatkan kecepatan I/O** dengan menggunakan banyak disk secara paralel. Keputusan untuk menyimpan data di memori didasarkan pada pertimbangan ekonomis, yaitu membandingkan biaya akses disk dengan biaya penyimpanan di memori.
> >
> > ### "Five-Minute Rule"
> > 
> > Ini adalah sebuah kaidah historis dari tahun 1987 yang menyatakan bahwa blok data yang diakses setidaknya sekali setiap **lima menit** layak untuk disimpan di dalam memori. Kaidah ini berevolusi seiring dengan perubahan harga hardware, namun prinsip dasarnya tetap sama: ada titik impas (_break-even point_) di mana biaya menyimpan data di memori lebih murah daripada biaya mengaksesnya berulang kali dari disk yang lambat.
> > 
> > **Turun darimana aturannya?**
> > Diketahui misal $dsc$ adalah *Disk Access Cost* dari pengaksesan sebuah blok di disk dalam $m$ detik, maka:
> > 
> > ![[Pasted image 20250905091843.png]]
> > 
> > Pada tahun 1987, harga per disk adalah **$30.000** dengan 15 _random access/s_, sementara harga per 1MB memori adalah **$5.000** dengan ukuran blok 1KB. Anggap kita memiliki blok data yang diakses **sekali per 2 detik**, maka:
> > - **Biaya akses disk** = $\frac{harga \; per \; disk}{jumlah \; akses \; per \; detik\times m}​ = \frac{30000}{15 \times 2} = 1000$ per akses blok  
> > - **Biaya memori** =$\frac{harga \; per \; MB \; memori}{​jumlah \; blok \; per \; MB}=\frac{5.000}{1000}​=\$5$ per blok  
> > Buffering data ini ,embutuhkan biaya memori $5, mengurangi biaya akses disk $1.000 -> **MENGUNTUNGKAN!**
> > - Untuk menemukan titik impas (_break even point_) dari $m$, maka:
> > - $m=\frac{harga \; per \; disk}{harga \; per \; MB \; memori}​×\frac{jumlah \; blok \; per \; MB}{jumlah \; akses \; disk}​ = \frac{30000}{5000} \times \frac{1000}{15} = 400 s \approx 5$ menit
> > 
> > Jadi, pada waktu itu, data yang diakses setiap **400 detik atau kurang** lebih menguntungkan untuk di-buffer di dalam memori → **beli lebih banyak memori!**
> > 
> > ### "One-Minute Rule"
> > Harga disk dan memori telah banyak berubah selama bertahun-tahun, tetapi rasionya tidak banyak berubah dari tahun 1987 hingga 1997, sehingga selama periode ini:
> > - Aturan tetap menjadi **5 menit**, bukan 1 jam atau 1 detik (untuk akses acak/random).
> > - Aturan berubah setelah periode waktu tersebut, contohnya pada tahun 2007 dan 2017 aturannya menjadi **1.5 jam** dan **4 jam**
> > 
> > Untuk **data yang diakses secara sekuensial (berurutan)**, lebih banyak blok dapat dibaca per detik. Dengan asumsi pembacaan sekuensial sebesar 1MB data pada satu waktu:
> > - **Aturan 1 menit (1-minute rule):** Data yang diakses secara sekuensial, yang diakses **satu kali atau lebih dalam satu menit**, sebaiknya disimpan di dalam memori.
> > 
> > ### RAID: Mengelola Banyak Disk
> > 
> > **RAID (Redundant Array of Independent Disks)** adalah sekumpulan teknik organisasi disk untuk mengelola banyak disk fisik seolah-olah menjadi satu disk logis tunggal. Tujuannya adalah untuk mendapatkan **kecepatan tinggi** melalui paralelisme dan **reliabilitas tinggi** melalui redundansi data. Dua konsep utamanya adalah:
> > 
> > - **Stripping:** Memecah data dan menyebarkannya ke beberapa disk, sehingga operasi baca/tulis bisa dilakukan secara paralel dan lebih cepat.
> >     
> > - **Redundancy:** Menyimpan informasi ekstra (baik berupa salinan penuh atau data paritas) yang dapat digunakan untuk membangun kembali data jika salah satu disk mengalami kegagalan.
> >     
> >
> > ### Level-Level RAID Populer
> > 
> > - **RAID 0 (Stripping):** Hanya _stripping_ tanpa redundansi. Sangat cepat, tetapi jika satu disk gagal, semua data hilang.
> > ![[Pasted image 20250905093327.png]]
> >     
> > - **RAID 1 (Mirroring):** Hanya redundansi tanpa _stripping_. Data disalin sepenuhnya ke disk lain. Sangat reliabel, tetapi biaya disk menjadi dua kali lipat.
> >  ![[Pasted image 20250905093347.png]]
> >  
> > - **RAID 5 (Stripping with Parity):** Kombinasi _stripping_ dengan blok paritas yang disebar. Memberikan keseimbangan antara efisiensi ruang dan toleransi kegagalan (tahan 1 disk gagal), namun operasi tulis lebih lambat.
> >  ![[Pasted image 20250905093415.png]]
> >  
> > - **RAID 10 (RAID 1+0):** Kombinasi _mirroring_ dan _stripping_. Sangat cepat dan sangat reliabel, tetapi biayanya paling mahal.
> >  ![[Pasted image 20250905093501.png]]
> >  
> > ### Pakai RAID Yang Mana?
> > - **Menggunakan RAID 1 atau RAID 5?**
> > 	- Bergantung pada rasio operasi _reads_ (baca) dan _writes_ (tulis).
> > 	- RAID 5 memerlukan 2 _block reads_ dan 2 _block writes_ untuk menulis satu blok data, sedangkan RAID 1 hanya membutuhkan 2 _block writes_.
> > - **Jika sebuah aplikasi memerlukan `r`** _**reads**_ **dan `w`** _**writes**_ **per detik:**
> > 	- RAID 1 memerlukan **`r + 2w`** operasi I/O per detik.
> > 	- RAID 5 memerlukan **`r + 4w`** operasi I/O per detik.
> > - **Untuk nilai `r` dan `w` yang cukup besar, jumlah operasi I/O-nya memerlukan banyak disk untuk menangani beban kerja (workload):**
> > 	- RAID 5 kemungkinan memerlukan lebih banyak disk daripada RAID 1 untuk menangani beban yang sama.
> > 	- Penghematan jumlah disk yang terlihat pada RAID 5 (karena menggunakan paritas, bukan _mirroring_ seperti RAID 1) bisa jadi ilusi.
> > - _**Rule of Thumb**_ **(Aturan Praktis):** RAID 5 baik digunakan ketika operasi _writes_ **jarang terjadi** dan datanya **sangat besar**, tetapi RAID 1 lebih baik untuk kondisi sebaliknya
> > 

> [!cornell] #### Summary
> 
> Tuning pada level hardware berfokus pada **mitigasi lambatnya disk I/O**, baik dengan menyimpan data yang sering diakses di **memori** (didasarkan pada perhitungan biaya seperti "Five-Minute Rule") maupun dengan menggunakan **RAID**. RAID adalah teknik untuk menggabungkan banyak disk untuk mendapatkan **kecepatan (melalui _stripping_)** dan **reliabilitas (melalui _redundancy_)**. Pemilihan level RAID (seperti **0, 1, 5, atau 10**) merupakan _trade-off_ antara kecepatan, tingkat toleransi kegagalan, dan biaya.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Paritas (Parity) itu Apa?
> 
> Paritas adalah bentuk redundansi yang lebih cerdas daripada sekadar menyalin data. Bayangkan Anda punya 3 bit data: `1`, `0`, `1`. Bit paritasnya (menggunakan _even parity_) adalah `0`, karena jumlah angka `1` harus genap (`1+0+1+0 = 2`). Jika salah satu disk (misalnya yang berisi bit ke-3) gagal, Anda punya: `1`, `0`, `?`, dan paritas `0`. Anda bisa menghitung ulang bit yang hilang: `1+0+?` harus menghasilkan jumlah `1` yang genap. Jawabannya pasti `1`. RAID 5 menggunakan prinsip matematika yang sama (operasi XOR) pada level blok data.
> 
> #### Praktik Umum di Industri
> 
> - **RAID 1:** Sering digunakan untuk disk sistem operasi, di mana reliabilitas adalah segalanya dan kapasitas tidak terlalu besar.
>     
> - **RAID 5/6:** Dulu sangat populer untuk penyimpanan data file server dalam jumlah besar di mana efisiensi biaya penting. RAID 6 (dengan dua paritas) menjadi lebih umum seiring meningkatnya ukuran disk.
>     
> - **RAID 10:** Dianggap sebagai "standar emas" untuk database OLTP (_Online Transaction Processing_) yang sibuk. Ini memberikan performa tulis yang sangat baik (karena tidak ada kalkulasi paritas yang rumit) dan reliabilitas tinggi.
>