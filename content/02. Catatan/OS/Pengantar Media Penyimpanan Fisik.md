---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Mengapa perlu penyimpanan massal?
> > - Jenis-jenis perangkat penyimpanan
> > - Struktur Hard Disk Drive (HDD)
> > - Komponen kunci HDD
> > - Performa HDD (Kecepatan & Waktu Akses)
> > - Apa itu Head Crash?
> > - Pengertian Memori Non-Volatil (NVM)
> > - Kelebihan & Kekurangan NVM
> > - Tantangan & Solusi NVM
> > - Apa itu NVMe?
> > - Apa itu RAM Drive?
> > - Fungsi Kaset Magnetik
> >
>
> >
> > ### Kebutuhan Penyimpanan Massal
> > **Jenis Penyimpanan**
> > Komputer memerlukan tempat untuk menyimpan data dan program secara permanen, yang tidak akan hilang saat listrik dimatikan (non-volatil). Ini seperti lemari arsip digital. Penyimpanan ini umumnya dibagi menjadi:
> > - **Penyimpanan Sekunder:** Penyimpanan utama yang cepat dan selalu aktif di dalam sistem, seperti HDD dan SSD.
> > - **Penyimpanan Tersier:** Penyimpanan yang lebih lambat dan berkapasitas lebih besar untuk backup atau data yang jarang diakses, seperti kaset magnetik atau _cloud storage_.
> >
> > **Karakteristik Perangkat Penyimpanan**
> > Perangkat penyimpanan sangat beragam, dibedakan oleh:
> > - **Metode Transfer:** Per karakter atau per blok data.
> > - **Metode Akses:** **Sekuensial** (harus membaca berurutan, seperti kaset) atau **Acak/Random** (bisa langsung melompat ke data manapun, seperti HDD/SSD).
> > - **Sifat Koneksi:** **Sinkron** (bersamaan) atau **Asinkron** (tidak harus bersamaan).
> > - **Sifat Penggunaan:** **Dedicated** (hanya untuk satu pengguna) atau **Sharable** (bisa dipakai bersama).
> > - **Operasi:** _Read-only_ (hanya baca) atau _Read-write_ (baca dan tulis).
> >
>> Walaupun bervariasi, perangkat penyimpanan seringkali menjadi komponen paling lambat dalam sistem komputer.
> >
> > ### Hard Disk Drive (HDD)
> > HDD adalah perangkat penyimpanan **mekanis** yang menggunakan piringan magnetik yang berputar untuk menyimpan data.
> > 
> > **Cara Kerja**
> > Data direkam pada lapisan magnetik di permukaan piringan (platter) yang berputar dengan kecepatan sangat tinggi (berputar antara 60 hingga 250 kali per detik (3600 RPM – 15000 RPM)). Sebuah kepala baca-tulis (_read-write head_) yang terpasang di lengan (_disk arm_) "terbang" sangat tipis di atas permukaan piringan untuk membaca atau menulis data.
> > 
> > **Komponen Kunci HDD:**
> > ![[Pasted image 20250609155957.png]]
> > - **Platter (Piringan):** Piringan logam atau kaca yang dilapisi material magnetik.
> > - **Spindle (Poros):** Motor yang memutar semua piringan secara bersamaan.
> > - **Read-Write Head:** Komponen elektromagnetik yang membaca dan menulis data.
> > - **Disk Arm:** Lengan yang menggerakkan semua head secara bersamaan ke posisi yang diinginkan.
> > - **Track (Trek):** Lingkaran-lingkaran konsentris di permukaan piringan tempat data disimpan.
> > - **Sector (Sektor):** Potongan-potongan kecil dari sebuah trek. Sektor adalah unit transfer data terkecil (umumnya 512 byte atau 4KB).
> > - **Cylinder (Silinder):** Kumpulan trek yang berada pada posisi lengan yang sama di semua piringan (seperti tumpukan donat yang sejajar).
> > 
> > **Performa HDD:** Kinerja HDD ditentukan oleh dua faktor utama:
> > - **Transfer Rate:** Seberapa cepat data dapat mengalir antara drive dan komputer. Seringkali ada perbedaan antara kecepatan teoritis (yang tertera di kemasan) dan kecepatan efektif (kecepatan nyata).
> >   - **Positioning Time (Waktu Akses Acak):** Waktu total yang dibutuhkan untuk mulai membaca data. Ini terdiri dari:
> > 	  1. **Seek Time:** Waktu yang dibutuhkan lengan disk untuk bergerak ke silinder yang benar.
> > 	  2. **Rotational Latency:** Waktu tunggu hingga piringan berputar dan sektor yang dituju berada tepat di bawah read-write head.
> >
> > **Head Crash** 
> > Ini adalah kegagalan fatal yang terjadi ketika _read-write head_ secara fisik menyentuh permukaan _platter_. Hal ini menyebabkan kerusakan pada lapisan magnetik, yang biasanya mengakibatkan kerusakan permanen pada drive dan kehilangan data di area tersebut.
> >
> > ### Non-Volatile Memory (NVM)
> > Perangkat penyimpanan yang menggunakan sirkuit elektronik (bukan mekanis) untuk menyimpan data secara permanen. Contoh paling umum adalah **Solid-State Drive (SSD)**, yang menggunakan chip memori flash NAND.
> > 
> > **Kelebihan NVM**
> > - **Kecepatan:** Jauh lebih cepat daripada HDD karena tidak ada bagian yang bergerak (tidak ada _seek time_ atau _rotational latency_).
> > - **Keandalan:** Lebih tahan guncangan dan umumnya lebih awet secara fisik
> > 
> > **Kekurangan NVM**
> > - **Biaya:** Lebih mahal per Gigabyte dibandingkan HDD.
> > - **Umur Pakai:** Memiliki batasan jumlah siklus tulis/hapus.
> > - **Kapasitas:** Umumnya memiliki kapasitas total yang lebih kecil daripada HDD pada titik harga yang sama.
> >
> > **Tantangan dan Solusi Manajemen NVM**
> > - **Tantangan:** Data di NVM dibaca/ditulis per satuan **Page**, tetapi hanya bisa dihapus per satuan **Block** (yang terdiri dari banyak Page). Sebuah Page tidak bisa langsung ditimpa (_overwrite_); bloknya harus dihapus terlebih dahulu. Blok hanya dapat dihapus dalam jumlah terbatas sebelum aus (sekitar 100.000 kali).
> > - **Solusi (Dikelola oleh Kontroler NVM):**
> > 	- **Garbage Collection:** Proses internal untuk mengumpulkan data yang masih valid dari blok yang "kotor" (berisi banyak page yang tidak valid), menyalinnya ke blok baru, lalu menghapus blok lama agar bisa digunakan kembali.
> > 	- **Wear Leveling:** Algoritma yang memastikan semua blok memori digunakan secara merata, sehingga tidak ada satu blok pun yang aus lebih cepat dari yang lain.
> > 	- **Over-Provisioning:** Menyisihkan sebagian kecil dari kapasitas total SSD sebagai ruang cadangan untuk membantu proses _garbage collection_ dan _wear leveling_, menjaga kinerja tetap tinggi.
> > 	- **NVMe (Non-Volatile Memory Express):** Sebuah protokol atau antarmuka koneksi super cepat yang dirancang khusus untuk NVM (SSD). NVMe memungkinkan SSD terhubung langsung ke bus PCIe sistem, melewati hambatan antarmuka yang lebih lambat seperti SATA, sehingga memaksimalkan throughput dan meminimalkan latensi.
> > 
> > ### Volatile Memory (RAM Drives) 
> > Sebagian dari memori utama komputer (DRAM/RAM) yang oleh perangkat lunak (device driver) disulap agar berfungsi seolah-olah sebuah drive penyimpanan. Karena menggunakan RAM, kecepatannya sangat tinggi. Namun, sifatnya **volatil**, artinya semua data akan hilang jika komputer dimatikan. Ideal untuk pekerjaan sementara yang membutuhkan kecepatan I/O ekstrim.
> > 
> > ### Magnetic Tape
> > ![[Pasted image 20250609160622.png]]
> > Meskipun merupakan teknologi lama, kaset magnetik masih relevan hingga saat ini. Karena akses acaknya sangat lambat, ia tidak digunakan untuk penyimpanan primer/sekunder. Fungsi utamanya adalah:
> > - **Backup data skala besar.**
> > - **Arsip data jangka panjang** (menyimpan data yang sangat jarang diakses).
> > - Mentransfer data dalam jumlah sangat besar antar sistem. Keunggulannya adalah kapasitas yang sangat besar dan biaya per Gigabyte yang sangat murah.
> > 


> [!cornell] #### Summary
> Sistem penyimpanan massal menyediakan penyimpanan data permanen (non-volatil) yang fundamental bagi komputer, dengan pilihan media utama berupa HDD mekanis yang berbiaya rendah dan berkapasitas besar, serta NVM (SSD) elektronik yang jauh lebih cepat namun lebih mahal. Perbedaan cara kerja fundamental ini—piringan berputar pada HDD vs. sel memori pada NVM—menciptakan serangkaian trade-off dalam hal kecepatan, biaya, dan daya tahan, sementara teknologi yang lebih tua seperti kaset magnetik tetap berguna untuk kebutuhan arsip dan backup skala besar.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Flash Translation Layer (FTL) pada NVM:** Ini adalah lapisan perangkat lunak di dalam kontroler SSD yang bertugas melakukan "sihir". FTL inilah yang membuat SSD terlihat seperti HDD biasa bagi sistem operasi. Ia mengelola pemetaan dari _Logical Block Addresses_ (LBA) yang diminta OS ke alamat fisik _page_ dan _block_ di dalam chip flash. FTL juga yang menjalankan algoritma _wear leveling_ dan _garbage collection_ secara transparan.
> - **Constant Angular Velocity (CAV) vs. Constant Linear Velocity (CLV):**
> 	- **CAV (digunakan di HDD):** Kecepatan putaran piringan (RPM) konstan. Akibatnya, trek bagian luar yang lebih panjang bergerak melewati head lebih cepat daripada trek bagian dalam. Untuk menjaga aliran data tetap, kepadatan data (bit per inci) di trek luar lebih rendah daripada di trek dalam.
> 	- **CLV (digunakan di CD/DVD):** Kecepatan piringan berubah-ubah. Piringan berputar lebih lambat saat head membaca trek luar dan lebih cepat saat membaca trek dalam. Tujuannya adalah untuk menjaga agar kecepatan linear (panjang trek yang melewati head per detik) tetap konstan, sehingga kepadatan data seragam di seluruh piringan
> - **Write Amplification pada NVM:** Fenomena di mana jumlah data yang sebenarnya ditulis ke chip flash lebih besar dari jumlah data yang ingin ditulis oleh pengguna. Ini terjadi karena proses _read-modify-write_ selama _garbage collection_. Misalnya, untuk memperbarui 4KB data (satu page), kontroler mungkin perlu membaca seluruh blok (misalnya 2MB) yang berisi page tersebut, menulis ulang data yang masih valid ke blok baru, menambahkan data 4KB yang baru, lalu menghapus blok lama. Ini dapat meningkatkan keausan dan mengurangi masa pakai SSD. Rasio _Write Amplification_ (WA) yang ideal adalah 1.
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks:** "Operating System Concepts" oleh Silberschatz, Galvin, dan Gagne (kemungkinan besar sumber materi ini).
> - **Situs Teknis:** AnandTech, StorageReview.com sering memiliki ulasan mendalam tentang arsitektur HDD dan SSD.
> - **Dokumentasi Produsen:** Lembar data (datasheet) dari produsen seperti Samsung, Micron (untuk NVM) atau Seagate, Western Digital (untuk HDD) memberikan detail teknis yang sangat spesifik.
> #### Eksplorasi Mandiri:
> - Bandingkan spesifikasi teknis antara SSD yang menggunakan antarmuka SATA dan yang menggunakan NVMe dari satu produsen yang sama. Perhatikan perbedaan pada IOPS (Input/Output Operations Per Second) dan throughput sekuensial.
> - Cari tahu tentang teknologi perekaman pada HDD modern, seperti **SMR (Shingled Magnetic Recording)**, dan pahami bagaimana teknologi ini meningkatkan kapasitas tetapi dapat memengaruhi kinerja tulis.