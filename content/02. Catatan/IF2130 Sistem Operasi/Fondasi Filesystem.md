---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Sistem Berkas?
> > - Definisi dan Abstraksi Berkas
> > - Ragam Struktur Internal Berkas
> > - Atribut Kunci Sebuah Berkas
> > - Operasi Fundamental pada Berkas
> > - Proses `Open()` dan `Close()`
> > - Tujuan Penguncian Berkas (Locking)
> > - Tipe Penguncian: Mandatory vs. Advisory
> >
>
> > ### Pengenalan Sistem Berkas
> > Merupakan komponen sistem operasi yang paling terlihat oleh pengguna, berfungsi sebagai jembatan antara pengguna dan penyimpanan data
> > 
> > **Tujuan Utama:**
> > Menyediakan mekanisme untuk menyimpan dan mengakses data serta program secara terorganisir.
> > 
> > **Dua Bagian Utama:**
> > 1. **Kumpulan Berkas:** Wadah untuk menyimpan data-data yang saling terkait.
> > 2. **Struktur Direktori:** Kerangka kerja yang mengatur dan menyediakan informasi (metadata) tentang semua berkas.
> > 
> > Sebagian besar sistem berkas berada di **penyimpanan sekunder** (seperti HDD, SSD/NVM, optical disk) yang bersifat **non-volatile**, artinya data tetap ada meskipun komputer dimatikan.
> >
> > ### Berkas
> > **Konsep Berkas (File Concept)**
> > - **Definisi Teknis:** Berkas adalah unit penyimpanan logis terkecil pada penyimpanan sekunder.
> > - **Abstraksi bagi Pengguna:** Berkas adalah sebuah **abstraksi**. Pengguna tidak perlu tahu bagaimana data secara fisik disimpan di piringan disk (melalui _cylinder, track, sector_) atau di sel memori NVM. Mereka hanya berinteraksi dengan nama berkas, seperti `laporan.docx`. OS-lah yang menerjemahkan nama logis ini menjadi lokasi fisik.
> > - **Representasi:** Berkas dapat merepresentasikan hampir semua hal: program (kode sumber), data (numerik, teks), atau bahkan informasi sistem (seperti pada sistem `/proc` di Linux/UNIX yang menampilkan detail proses seolah-olah mereka adalah berkas).
> > - Pada dasarnya, berkas adalah urutan bit atau byte yang maknanya ditentukan oleh program yang membuat dan membacanya.
> >
> > **Struktur Berkas (File Structure):**
> > Mengacu pada bagaimana data diatur _di dalam_ sebuah berkas. Ada beberapa pendekatan:
> > 1. **Tanpa Struktur (Urutan Byte):** Pendekatan paling fleksibel. Berkas dilihat sebagai aliran byte tanpa format khusus. Sistem operasi tidak peduli dengan isinya. Contoh: UNIX dan Windows memperlakukan sebagian besar berkas seperti ini. Program aplikasi bertanggung jawab untuk menginterpretasikan aliran byte tersebut.
> > 2. **Struktur Record Sederhana:** Berkas diorganisir sebagai kumpulan _record_ atau baris. Record ini bisa memiliki panjang yang tetap (memudahkan akses acak) atau panjang variabel (lebih efisien dalam penggunaan ruang).
> > 3. **Struktur Kompleks:** Berkas memiliki format internal yang rumit, seperti dokumen terformat (misalnya, file `.docx`) atau berkas _executable_ yang dapat direlokasi.
> > 
> > **Siapa yang Menentukan?** Struktur bisa ditentukan oleh Sistem Operasi atau oleh program aplikasi yang menggunakan berkas tersebut. Kebanyakan OS modern memilih pendekatan minimal (urutan byte) untuk fleksibilitas maksimal.
> > 
> > **Atribut Berkas**
> > - Nama lain: **Metadata**. Atribut ini disimpan dalam struktur direktori.
> > - **Nama:** Satu-satunya atribut yang dapat dibaca manusia secara langsung.
> > - **Pengenal (Identifier):** Nomor unik (tag numerik) yang digunakan oleh sistem berkas untuk mengidentifikasi berkas. Ini adalah "nama" internal yang tidak terlihat oleh pengguna.
> > - **Tipe:** Menunjukkan jenis berkas, seringkali melalui ekstensi (misalnya, `.txt`, `.jpg`, `.exe`). Ini membantu OS dan aplikasi mengetahui cara menangani berkas.
> > - **Lokasi:** Penunjuk (pointer) ke lokasi fisik berkas di perangkat penyimpanan.
> > - **Ukuran:** Ukuran berkas saat ini dalam byte, kata, atau blok.
> > - **Proteksi:** Kontrol akses yang menentukan siapa (pengguna/grup) yang boleh membaca, menulis, mengeksekusi, atau menghapus berkas.
> > - **Waktu, Tanggal, dan ID Pengguna:** Melacak kapan berkas dibuat, terakhir dimodifikasi, dan terakhir diakses, serta siapa pemiliknya. Penting untuk keamanan dan audit.
> > 
> > ** Operasi Berkas**
> > Berkas adalah Tipe Data Abstrak (ADT), sehingga OS menyediakan panggilan sistem (_system calls_) untuk memanipulasinya.
> > - **Create:** Mencari ruang kosong di sistem berkas dan membuat entri baru di direktori.
> > - **Write:** Menulis data ke berkas. OS melacak **write pointer** untuk mengetahui di mana penulisan berikutnya harus dimulai.
> > - **Read:** Membaca data dari berkas. OS menggunakan **read pointer** untuk melacak posisi baca. Seringkali, `read` dan `write pointer` digabung menjadi satu **current-file-position pointer**.
> > - **Reposition (seek):** Memindahkan _current-file-position pointer_ ke lokasi tertentu di dalam berkas tanpa melakukan operasi baca/tulis.
> > - **Delete:** Menghapus entri berkas dari direktori dan membebaskan ruang disk yang digunakannya agar bisa dipakai lagi.
> > - **Truncate:** Menghapus seluruh konten berkas (ukuran menjadi nol) tetapi mempertahankan atributnya (seperti nama dan izin).
> > - **Mekanisme `Open()` dan `Close()`:**
> > 	- **Open (`open()`):** Sebelum berkas dapat dibaca atau ditulis, ia harus "dibuka". Proses ini melibatkan:
> > 		1. OS mencari berkas di struktur direktori pada disk.
> > 		2. Metadata (atribut) berkas disalin dari disk ke tabel khusus di memori yang disebut **open-file table**.
> > 		3. OS mengembalikan sebuah **file handle** (atau _file descriptor_), yaitu sebuah penunjuk sederhana (biasanya integer) yang digunakan oleh program untuk merujuk ke berkas tersebut dalam operasi selanjutnya (read/write). Ini lebih efisien daripada menggunakan nama berkas berulang kali.
> > 	- Untuk mengelola akses bersama, OS menggunakan dua tabel: **tabel per-proses** (melacak berkas yang dibuka oleh satu proses) dan **tabel seluruh sistem** (berisi entri unik untuk setiap berkas yang sedang dibuka di sistem, dengan _open count_ untuk melacak berapa banyak proses yang membukanya).
> > 	- **Close (`close()`):** Ketika sebuah proses selesai menggunakan berkas, ia harus "ditutup". Ini akan:
> > 		1. Memperbarui metadata di disk jika ada perubahan.
> > 		2. Melepaskan _file handle_ dari proses.
> > 		3. Mengurangi _open count_ di tabel seluruh sistem. Jika hitungan mencapai nol, entri akan dihapus dari tabel memori.
> >
> > ### File Locking
> > - **Tujuan:** Ketika beberapa proses perlu mengakses berkas yang sama secara bersamaan (misalnya, berkas log sistem), ada risiko data menjadi korup. Penguncian berkas (_file locking_) adalah mekanisme sinkronisasi untuk mencegah hal ini.
> > - **Cara Kerja:** Sebuah proses dapat mengunci berkas untuk sementara waktu, mencegah proses lain memodifikasinya sampai kunci dilepaskan.
> > - **Tipe Kunci Berkas:**
> > 	- **Mandatory Locking:** Kunci diberlakukan secara ketat oleh sistem operasi. Jika sebuah proses mencoba mengakses berkas yang terkunci, OS akan secara otomatis menolaknya. Ini lebih aman tetapi kurang fleksibel. (Contoh: Windows).
> > 	- **Advisory Locking:** Kunci bersifat kooperatif. Proses dapat memeriksa status kunci pada sebuah berkas, tetapi terserah pada program itu sendiri untuk mematuhi kunci tersebut. Jika program ditulis dengan buruk, ia bisa saja mengabaikan kunci. (Contoh: Sistem berbasis UNIX).

> [!cornell] #### Summary
> Sistem berkas merupakan sebuah abstraksi fundamental yang disediakan oleh sistem operasi untuk mengelola data secara terstruktur pada penyimpanan non-volatile; ia merepresentasikan data sebagai unit logis bernama 'berkas', yang masing-masing didefinisikan oleh atribut (metadata), dioperasikan melalui serangkaian panggilan sistem standar (seperti create, read, write, open, dan close), dan dilengkapi mekanisme penguncian untuk memastikan integritas data saat diakses secara bersamaan.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> **Anatomi Inode pada Sistem Berkas UNIX/Linux:**
> - Konsep "Pengenal" (Identifier) yang disebutkan dalam catatan utama diimplementasikan sebagai **inode** (index node) pada sistem UNIX-like (termasuk Linux dan macOS).
> - **Apa itu Inode?** Sebuah struktur data di disk yang menyimpan semua metadata tentang sebuah berkas _kecuali_ namanya. Direktori pada dasarnya hanyalah sebuah tabel yang memetakan nama berkas yang dapat dibaca manusia ke nomor inode.
> - **Isi Sebuah Inode:**
> 	- **Mode/Permissions:** Izin baca, tulis, eksekusi (rwx) untuk pemilik, grup, dan lainnya.
> 	- **Owner & Group ID (UID/GID):** Identitas pemilik dan grup berkas.
> 	- **File Size:** Ukuran berkas dalam byte.
> 	- **Timestamps:** Waktu pembuatan (`ctime` - inode change time), modifikasi terakhir (`mtime`), dan akses terakhir (`atime`).
> 	- **Link Count:** Jumlah _hard link_ (nama direktori) yang menunjuk ke inode ini. Berkas baru akan benar-benar dihapus ketika _link count_ ini menjadi 0.
> 	- **Pointers to Data Blocks:** Ini adalah bagian paling krusial. Inode berisi serangkaian alamat blok di disk tempat data sebenarnya dari berkas itu disimpan. Ini bisa berupa penunjuk langsung, atau penunjuk ke blok lain yang berisi lebih banyak penunjuk (indirect pointers) untuk berkas yang sangat besar.
> - **Implikasi:** Pemisahan nama dari sisa metadata ini memungkinkan adanya _hard link_, di mana beberapa nama berkas yang berbeda di lokasi direktori yang berbeda dapat menunjuk ke data fisik yang sama persis (inode yang sama).
> 
> **File Descriptor, Tabel Berkas Terbuka, dan System Call `open()`:** 
> - **File Descriptor (fd):** "File handle" yang dikembalikan oleh panggilan `open()` pada sistem UNIX/Linux adalah sebuah integer non-negatif yang disebut _file descriptor_.
> - **Tiga `fd` Standar:** Setiap proses secara otomatis dimulai dengan tiga file descriptor yang sudah terbuka:
> 	- `0`: Standard Input (stdin) - biasanya keyboard.
> 	- `1`: Standard Output (stdout) - biasanya layar terminal.
> 	- `2`: Standard Error (stderr) - biasanya layar terminal.
> - **Detail Arsitektur Tabel:**
> 	1. **Per-Process File Descriptor Table:** Setiap proses memiliki tabel (array) sendiri. Indeks array ini adalah _file descriptor_ (`0, 1, 2, 3, ...`). Setiap entri di tabel ini menunjuk ke entri di tabel berikutnya.
> 	2. **System-Wide Open File Table:** Satu tabel untuk seluruh sistem operasi. Setiap entri di sini berisi informasi status tentang berkas yang sedang terbuka, seperti _current-file-position pointer_ dan _open count_ (berapa banyak `fd` di seluruh sistem yang menunjuk ke entri ini).
> 	3. **In-Memory Inode Table:** Tabel ini menyimpan salinan inode dari disk untuk berkas yang sedang diakses, berisi metadata statis seperti ukuran dan lokasi blok data.
> - Alur ini menjelaskan bagaimana OS dapat secara efisien mengelola banyak proses yang mungkin membuka berkas yang sama, bahkan memungkinkan mereka untuk berbagi _file-position pointer_ jika diinginkan.
>
> **Implementasi Penguncian Berkas: `flock()` vs. `fcntl()`:**
>  - Konsep kunci _Advisory_ dan _Mandatory_ diimplementasikan melalui panggilan sistem yang berbeda di lingkungan UNIX/Linux.
>  - **`flock(2)`:** Ini adalah mekanisme penguncian yang lebih sederhana. Biasanya bersifat _advisory_ dan mengunci **seluruh berkas**. Sebuah proses bisa meminta kunci bersama (_shared lock_, untuk membaca) atau kunci eksklusif (_exclusive lock_, untuk menulis). Beberapa proses bisa memegang _shared lock_ secara bersamaan, tetapi hanya satu yang bisa memegang _exclusive lock_.
>  - **`fcntl(2)`:** Ini adalah mekanisme yang lebih kuat dan merupakan standar POSIX. `fcntl()` jauh lebih fleksibel:
>  - Mendukung kunci _advisory_ dan _mandatory_ (tergantung pada izin berkas dan opsi saat me-_mount_ sistem berkas).
>  - Keunggulan utamanya adalah kemampuan untuk melakukan **byte-range locking**. Ini berarti sebuah proses dapat mengunci hanya sebagian dari berkas (misalnya, dari byte 1024 hingga 2048), membiarkan bagian lain dari berkas bebas untuk diakses oleh proses lain. Fitur ini sangat penting untuk aplikasi kompleks seperti sistem manajemen basis data (DBMS) yang berjalan di atas sistem berkas standar.
>  - 
>  **Abstraksi Berkas pada `/proc`:**
>  - Untuk melihat betapa kuatnya abstraksi berkas, `/proc` adalah contoh sempurna. Ini adalah sistem berkas virtual (pseudo-filesystem) yang tidak ada di disk. Kernel membuat entri-entri ini secara dinamis.
>  - Ketika Anda membaca "berkas" seperti `/proc/meminfo` atau `/proc/cpuinfo`, Anda tidak sedang membaca data dari disk. Panggilan `read()` Anda dicegat oleh kernel, yang kemudian menjalankan fungsi internal untuk mengumpulkan informasi real-time tentang memori atau CPU, memformatnya sebagai teks, dan mengembalikannya kepada Anda seolah-olah itu adalah isi berkas. Ini memungkinkan administrator sistem menggunakan alat berbasis teks standar (`cat`, `grep`, `awk`) untuk memonitor dan mendiagnosis sistem secara langsung.
>
>#### Sumber & Referensi Lanjutan:
> - **Buku Teks:** "Operating System Concepts" oleh Abraham Silberschatz, Peter B. Galvin, dan Greg Gagne. Bab tentang "File-System Interface" dan "File-System Implementation" membahas topik-topik ini dengan sangat mendalam.
> - **Halaman Manual (man pages):** Untuk pemahaman tingkat implementasi, membaca halaman manual di sistem Linux/UNIX sangat dianjurkan.
> 	- `man 2 open`
> 	- `man 2 fcntl`
> 	- `man inode`
>
> #### Eksplorasi Mandiri:
> **Lihat Nomor Inode:** Buka terminal di Linux atau macOS dan jalankan perintah `ls -i`. Angka yang muncul di kolom pertama adalah nomor inode untuk setiap berkas.
> **Eksplorasi `/proc`:** Coba jalankan perintah `cat /proc/meminfo` atau `less /proc/cpuinfo` (di Linux) untuk melihat bagaimana informasi sistem disajikan sebagai berkas.
> **Periksa File Descriptor:** Jalankan `ls -l /proc/$$/fd` (di Linux). Ini akan menunjukkan file descriptor yang sedang dibuka oleh proses shell Anda saat ini (`$$` adalah variabel untuk ID proses saat ini). Anda akan melihat `0`, `1`, dan `2` menunjuk ke terminal Anda.s