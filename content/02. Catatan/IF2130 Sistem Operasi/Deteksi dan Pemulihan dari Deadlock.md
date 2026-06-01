---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_: [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Prinsip deteksi (detection)?
> > - Deteksi dengan graf Wait-For (1 instance)?
> > - Deteksi untuk multi-instance?
> > - Kapan deteksi dijalankan?
> > - Dua metode pemulihan (recovery)?
> > - Opsi terminasi proses/thread?
> > - Isu dalam pemilihan korban?
> > - Opsi preemption sumber daya?
> > - Tiga masalah dalam preemption?
> >
> > ## Reference Points
> > Apa ya
> 
> >
> > ### Prinsip Deadlock Detection
> > - Ini adalah pendekatan reaktif. Sistem **tidak** mencoba mencegah atau menghindari _deadlock_. Sebaliknya, sistem membiarkan _deadlock_ terjadi.
> > - Sistem menyediakan dua komponen:
> >	1. Sebuah **algoritma untuk memeriksa** apakah keadaan _deadlock_ sedang terjadi.
> >	2. Sebuah **algoritma untuk memulihkan** sistem dari _deadlock_ tersebut.
> > 
> > ### Algoritma Deteksi (Single Instance per Resource Type)
> > - Menggunakan varian dari RAG yang disebut **Wait-For Graph**.
> > - Graf ini hanya berisi node untuk _thread_ (proses) dan menghilangkan node sumber daya.
> > - Sebuah panah dari Ti​→Tj​ ada di graf ini jika _thread_ Ti​ sedang menunggu _thread_ Tj​ untuk melepaskan sumber daya yang dibutuhkan Ti​.
> > - Aturan: **Deadlock ada jika dan hanya jika terdapat siklus** dalam _wait-for graph_.
> > - Sistem perlu memelihara graf ini dan secara berkala menjalankan algoritma pencari siklus (kompleksitas O(n²), dengan n adalah jumlah _thread_).
> >
> > ### Algoritma Deteksi (Multiple Instances per Resource Type)
> > - _Wait-for graph_ tidak berlaku di sini. Algoritma yang digunakan mirip dengan _Safety Algorithm_ pada Algoritma Banker, tetapi dengan beberapa perbedaan.
> > - **Struktur Data:** `Available`, `Allocation`, dan `Request` (matriks permintaan saat ini, bukan `Need`).
> > - **Cara Kerja:** Algoritma ini secara optimis mencoba mencari urutan penyelesaian _thread_. Ia memeriksa apakah ada _thread_ yang permintaannya (`Request`) bisa dipenuhi oleh sumber daya yang ada (`Available`). Jika ya, _thread_ itu diasumsikan selesai dan sumber dayanya (`Allocation`) ditambahkan ke `Available`. Proses ini diulang.
> > - **Hasil:** Jika setelah algoritma selesai ada _thread_ yang tidak bisa "menyelesaikan" (ditandai `Finish[i] == false`), maka _thread_ tersebut dipastikan mengalami _deadlock_.
> >
> > ### Penggunaan Algoritma Deteksi
> > - **Kapan dijalankan?** Ini adalah sebuah trade-off.
> >    - **Opsi 1: Setiap ada permintaan yang gagal.** Keuntungan: langsung mengetahui _thread_ mana yang "menyebabkan" _deadlock_. Kerugian: _overhead_ komputasi yang sangat tinggi.
> >	- **Opsi 2: Secara periodik** (misal, setiap jam) atau saat utilisasi CPU turun drastis (gejala _deadlock_). Keuntungan: _overhead_ lebih rendah. Kerugian: saat terdeteksi, mungkin sudah banyak _thread_ yang terlibat dalam siklus
> > ### Metode Pemulihan dari Deadlock
> > - Setelah _deadlock_ terdeteksi, sistem harus **memutus siklus tunggu**. Ada dua cara utama:
> >    - **Process/Thread Termination (Menghentikan Proses):** Membatalkan satu atau lebih proses/thread yang terlibat.
> >	- **Resource Preemption (Mengambil Paksa Sumber Daya):** Mengambil sumber daya dari satu atau lebih proses dan memberikannya ke proses lain.
> >	
> > ### Opsi Process Termination:
> > - **Batalkan Semua Thread yang Deadlock:** Cara paling brutal namun efektif untuk memutus siklus. Kerugiannya sangat besar karena semua hasil komputasi parsial dari _thread-thread_ tersebut hilang.
> > - **Batalkan Satu per Satu:** Lebih ringan, tetapi butuh _overhead_ tambahan karena algoritma deteksi harus dijalankan lagi setelah setiap pembatalan untuk memeriksa apakah siklus sudah putus.
> > - **Isu Pemilihan Korban (Victim Selection):** Memilih _thread_ mana yang akan dibatalkan adalah keputusan kebijakan yang sulit. Faktor yang dipertimbangkan antara lain:
> >	 - Prioritas _thread_.
> >	 - Berapa lama _thread_ sudah berjalan.
> >	 - Sumber daya apa dan berapa banyak yang telah digunakan.
> >	 - Apakah _thread_ bersifat interaktif atau _batch_.
> >	
> > ### Opsi Resource Preemption:
> > - Sistem secara bertahap mengambil sumber daya dari _thread_ korban dan memberikannya ke _thread_ lain dalam siklus sampai siklus terputus.
> > - **Tiga Masalah yang Harus Diatasi:**
> >	1. **Selecting a Victim:** Memilih sumber daya dan _thread_ mana yang akan menjadi korban untuk meminimalkan "kerugian".
> >	2. **Rollback:** _Thread_ yang sumber dayanya diambil paksa tidak dapat melanjutkan eksekusi begitu saja. Ia harus **dikembalikan (rollback)** ke suatu keadaan aman (_safe state_) sebelum sumber daya tersebut dialokasikan. Solusi paling umum adalah _total rollback_, yaitu membatalkan dan memulai ulang _thread_ tersebut sepenuhnya.
> >	3. **Starvation:** Perlu ada jaminan bahwa _thread_ yang sama tidak selalu dipilih menjadi korban berulang kali. Solusinya adalah dengan memasukkan "jumlah _rollback_ yang sudah dialami" sebagai salah satu faktor biaya dalam pemilihan korban.

> [!cornell] #### Summary
> Deteksi dan Pemulihan adalah strategi reaktif di mana sistem membiarkan deadlock terjadi, lalu secara periodik mendeteksinya dengan mencari siklus pada _wait-for graph_ atau menggunakan algoritma deteksi. Setelah terdeteksi, sistem harus memutus siklus tersebut melalui dua cara utama: terminasi proses atau preemption sumber daya, di mana keduanya memerlukan keputusan sulit dalam memilih "korban" untuk meminimalkan dampak negatif dan risiko _starvation_.

> [!ad-libitum]- Additional Information (Optional)
> #### **Aspek Teknis Lanjutan:**
> - **Ekonomi Penanganan Deadlock:** Pilihan antara mengabaikan, mencegah, menghindari, atau mendeteksi _deadlock_ pada dasarnya adalah masalah ekonomi. 
> 	- **Mengabaikan:** Paling murah jika _deadlock_ sangat jarang terjadi (kasus di OS umum).
> 	- **Pencegahan/Penghindaran:** Memiliki _overhead_ berkelanjutan (kinerja lebih lambat, utilisasi sumber daya rendah). Biayanya tinggi jika _deadlock_ sebenarnya jarang.
> 	- **Deteksi/Pemulihan:** _Overhead_ hanya muncul saat algoritma dijalankan dan saat pemulihan. Ini menjadi pilihan yang masuk akal untuk sistem di mana _deadlock_ tidak dapat diabaikan (karena konsekuensi fatal) tetapi juga tidak cukup sering untuk membenarkan biaya pencegahan/penghindaran yang konstan. Ini adalah kasus tipikal untuk **sistem database**
> 	- **Rollback Transaksi di Database:** Alasan utama mengapa deteksi dan pemulihan sangat cocok untuk sistem _database_ adalah konsep **transaksi ACID** (Atomicity, Consistency, Isolation, Durability). Sifat _Atomicity_ menjamin bahwa sebuah transaksi adalah unit "semua atau tidak sama sekali". Jika transaksi gagal atau dibatalkan (menjadi korban _deadlock_), sistem _database_ secara inheren sudah memiliki mekanisme untuk melakukan **rollback**, yaitu mengembalikan semua perubahan yang dibuat oleh transaksi tersebut seolah-olah tidak pernah terjadi. Ini membuat proses pemulihan menjadi bersih dan aman bagi integritas data.
> #### **Tools & Software untuk Analisis Deadlock:**
> - **Java `jstack`:** Saat JVM mendeteksi _deadlock_, output dari `jstack` akan secara eksplisit menyatakan: `Found one Java-level deadlock`, lalu menampilkan detail _thread_ yang terlibat, kunci mana yang dipegang, dan kunci mana yang ditunggu, sehingga sangat mudah untuk dianalisis.
> - **MySQL `SHOW ENGINE INNODB STATUS`:** Perintah ini menghasilkan laporan teks yang panjang. Di dalamnya, jika ada _deadlock_ yang baru saja terjadi, akan ada bagian `LATEST DETECTED DEADLOCK` yang secara detail memaparkan transaksi-transaksi yang terlibat, pernyataan SQL yang mereka jalankan, dan transaksi mana yang dipilih sebagai korban dan di-_rollback_.
> #### **Eksplorasi Mandiri:**
> - **Simulasi Deadlock di Database (Praktis):**
> 1. Buka dua koneksi ke server database (misalnya, dua jendela terminal yang terhubung ke MySQL atau PostgreSQL).
> 2. **Jendela 1:** `START TRANSACTION; UPDATE produk SET stok = stok - 1 WHERE id = 101;`
> 3. **Jendela 2:** `START TRANSACTION; UPDATE produk SET stok = stok - 1 WHERE id = 102;`
> 4. **Jendela 1:** `UPDATE produk SET stok = stok - 1 WHERE id = 102;` (Akan menunggu karena baris ini dikunci oleh Jendela 2).
> 5. **Jendela 2:** `UPDATE produk SET stok = stok - 1 WHERE id = 101;` (Ini akan menciptakan _deadlock_).
> 6. Amati hasilnya. Salah satu jendela akan segera melaporkan kesalahan (_deadlock found... try restarting transaction_), karena _engine database_ mendeteksi siklus dan langsung memilih satu transaksi sebagai korban untuk di-_rollback_. Analisis log atau status _engine_ setelahnya untuk melihat laporan _deadlock_ tersebut.