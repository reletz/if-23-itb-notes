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
> > - Apa saja jenis media penyimpanan?
> >     
> >
> > - Bagaimana hirarki penyimpanan diatur?
> >     
> >
> > - Apa saja komponen fisik dari hard disk?
> >     
> >
> > - Bagaimana kinerja disk diukur?
> >     
> 
> > ### Klasifikasi Media Penyimpanan Fisik
> >
> > Media penyimpanan secara umum diklasifikasikan menjadi dua jenis utama:
> >
> > - **Volatile Storage:** Media penyimpanan yang isinya akan hilang ketika daya listrik dimatikan. Contohnya adalah cache dan main memory (RAM).
> >     
> >
> > - **Non-Volatile Storage:** Media penyimpanan yang isinya tetap ada meskipun daya listrik mati. Ini mencakup secondary storage (seperti hard disk, flash memory) dan tertiary storage (seperti magnetic tape).
> >     
> >
> > Pemilihan media penyimpanan dipengaruhi oleh tiga faktor utama: **kecepatan akses**, **biaya per unit data**, dan **reliabilitas**.
> >
> > ### Hirarki Penyimpanan
> >
> > Media penyimpanan diatur dalam sebuah hirarki berdasarkan kecepatan dan biayanya. Semakin tinggi posisinya dalam hirarki, semakin cepat, semakin mahal, dan semakin kecil kapasitasnya. Hirarki dari yang tercepat hingga terlambat adalah:
> >
> > - Cache
> >     
> >
> > - Main Memory (Memori Utama)
> >     
> >
> > - Flash Memory
> >     
> >
> > - Magnetic Disk
> >     
> >
> > - Optical Disk
> >     
> >
> > - Magnetic Tapes
> >     
> >
> > ### Mekanisme Fisik Hard Disk
> >
> > Sebuah hard disk magnetik terdiri dari beberapa komponen fisik utama:
> >
> > - **Platter:** Piringan metalik tempat data disimpan secara magnetis.
> >     
> >
> > - **Track:** Lingkaran-lingkaran konsentris pada permukaan platter.
> >     
> >
> > - **Sector:** Pembagian dari sebuah track, merupakan unit terkecil data yang bisa dibaca atau ditulis.
> >     
> >
> > - **Read-Write Head:** Komponen yang membaca dan menulis data dari/ke permukaan platter.
> >     
> >
> > - **Disk Controller:** Sirkuit elektronik yang menjadi jembatan antara sistem komputer dan perangkat keras disk, menerima perintah level tinggi untuk membaca/menulis sebuah sector.
> >     
> >
> > ### Metrik Kinerja Disk
> >
> > Kinerja sebuah disk diukur melalui beberapa metrik penting:
> >
> > - **Access Time:** Total waktu dari permintaan baca/tulis dikirim hingga transfer data dimulai. Ini adalah penjumlahan dari _Seek Time_ dan _Rotational Latency_.
> >   - **Seek Time:** Waktu yang dibutuhkan lengan (arm) untuk memposisikan head di atas track yang benar.
> >   - **Rotational Latency:** Waktu yang dibutuhkan piringan untuk berputar hingga sector yang dituju berada tepat di bawah head.
> >
> > - **Data-Transfer Rate:** Laju di mana data dapat ditransfer dari disk ke memori setelah head diposisikan.
> >     
> >
> > - **Mean Time To Failure (MTTF):** Waktu rata-rata yang diharapkan sebuah disk dapat beroperasi secara kontinu sebelum mengalami kegagalan.
> >     

> [!cornell] #### Summary
> 
> Media penyimpanan diklasifikasikan sebagai **volatile** (hilang saat mati listrik) dan **non-volatile** (permanen), yang diatur dalam sebuah **hirarki** berdasarkan kecepatan dan biaya. Komponen utama dalam hirarki ini adalah **magnetic disk**, yang kinerjanya diukur oleh **access time** (penjumlahan dari _seek time_ dan _rotational latency_) dan **data-transfer rate**. Komponen fisik disk seperti **platter, track, dan sector** dikelola oleh sebuah **disk controller** untuk melakukan operasi baca/tulis.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Ada Hirarki?
> 
> Hirarki penyimpanan adalah solusi kompromi antara kecepatan, biaya, dan kapasitas. Idealnya, kita ingin semua data disimpan di media secepat RAM, tetapi biayanya akan sangat mahal. Dengan menempatkan data yang paling sering diakses di level tertinggi (cache/RAM) dan data yang jarang diakses (arsip) di level terendah (tape), sistem dapat mencapai performa yang baik dengan biaya yang wajar. Proses memindahkan data antar level hirarki ini (misalnya dari disk ke RAM) adalah inti dari manajemen memori dan buffer.
> 
> #### Seek Time vs. Rotational Latency
> 
> Dalam hard disk modern, kedua komponen _access time_ ini sama-sama signifikan. Namun, _seek time_ sering kali lebih bervariasi. Jika dua file yang perlu diakses berada di track yang berjauhan, _seek time_-nya akan besar. Sebaliknya, jika berada di track yang sama atau berdekatan, _seek time_-nya kecil. Inilah mengapa _defragmentasi_ disk (menyusun ulang blok-blok file agar berurutan secara fisik) dapat meningkatkan performa, karena ia secara efektif mengurangi rata-rata _seek time_.