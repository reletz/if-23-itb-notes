---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Layanan dan Interaksi Dasar OS
> 
> > ## Questions/Cues
> > 
> > - Apa saja layanan fungsional OS?
> >     
> > - Apa saja layanan efisiensi OS?
> >     
> > - Apa itu _System Call_?
> >     
> > - Apa peran API?
> >     
> > - Bagaimana cara melewatkan parameter ke _system call_?
> >     
> > - Apa saja tipe-tipe _system call_?
> >     
> > - Apa itu _System Programs_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 2-4, 16-33, IF2130-02-2025-OS-Structure.pdf
>      
> > 
> > ### Layanan Sistem Operasi untuk Pengguna & Program
> > 
> > OS menyediakan serangkaian layanan untuk memberikan fungsionalitas dan kemudahan. Layanan ini dibagi menjadi dua kategori utama.
> > 
> > **1. Layanan Fungsional (Untuk Pengguna):**
> > 
> > - **User Interface (UI)**: Menyediakan cara bagi pengguna untuk berinteraksi, baik melalui **GUI** (Graphical User Interface), **CLI** (Command-Line Interface), maupun _touch screen_.
> >     
> > - **Eksekusi Program**: Memuat, menjalankan, dan mengelola siklus hidup program.
> >     
> > - **Operasi I/O**: Mengabstraksi interaksi dengan perangkat keras seperti disk atau printer.
> >     
> > - **Manipulasi Sistem File**: Mengelola pembuatan, pembacaan, penulisan, dan penghapusan file/direktori.
> >     
> > - **Komunikasi**: Memfasilitasi pertukaran data antar proses (IPC) atau antar komputer dalam jaringan.
> >     
> > - **Deteksi Error**: Mendeteksi dan merespons error dari hardware, jaringan, atau program.
> >     
> > 
> > **2. Layanan Efisiensi Sistem:**
> > 
> > - **Alokasi Sumber Daya**: Mengalokasikan sumber daya (CPU, memori) kepada banyak pengguna atau proses secara adil.
> >     
> > - **Akuntansi (Accounting)**: Melacak penggunaan sumber daya oleh setiap pengguna.
> >     
> > - **Proteksi dan Keamanan**: Mengontrol akses ke sumber daya dan melindungi sistem dari ancaman internal maupun eksternal.
> >     
> > 
> > ### System Call: Jembatan ke Kernel
> > 
> > **System Call** adalah mekanisme terprogram yang disediakan oleh OS agar sebuah aplikasi (yang berjalan di _user mode_) dapat meminta layanan dari kernel (yang berjalan di _kernel mode_). Ini adalah satu-satunya "pintu" masuk yang sah bagi aplikasi untuk mengakses sumber daya yang dilindungi atau melakukan operasi-operasi khusus.
> > 
> > - **Application Program Interface (API)**: Programmer jarang sekali menulis _system call_ secara langsung. Mereka menggunakan **API** (seperti Win32 API, POSIX API, atau Java API) yang menyediakan fungsi-fungsi pustaka (library) yang lebih mudah digunakan. Fungsi API inilah yang kemudian akan "membungkus" dan memanggil _system call_ yang sesungguhnya di latar belakang. Contoh: fungsi `printf()` di C pada akhirnya akan memanggil _system call_ `write()` untuk menampilkan teks ke layar.
> >     
> > 
> > ### Parameter Passing untuk System Call
> > 
> > Seringkali, sebuah _system call_ butuh parameter (misalnya, nama file yang akan dibuka). Ada tiga cara umum untuk melewatkan parameter dari program ke kernel:
> > 
> > 1. **Melalui Register**: Cara tercepat, namun terbatas oleh jumlah register CPU yang tersedia.
> >     
> > 2. **Melalui Blok Memori**: Parameter disimpan dalam sebuah tabel/blok di memori, dan alamat blok tersebut yang dilewatkan melalui register. Digunakan oleh Linux & Solaris.
> >     
> > 3. **Melalui Stack**: Parameter di-_push_ ke dalam _stack_ oleh program, lalu di-_pop_ oleh kernel. Fleksibel dan tidak membatasi jumlah parameter.
> >     
> > 
> > ### Tipe-Tipe System Call
> > 
> > _System call_ dapat dikelompokkan berdasarkan fungsinya:
> > 
> > - **Kontrol Proses**: `create`, `terminate`, `load`, `execute`, `wait`.
> >     
> > - **Manajemen File**: `create`, `delete`, `open`, `close`, `read`, `write`.
> >     
> > - **Manajemen Perangkat**: `request device`, `release device`, `read`, `write`.
> >     
> > - **Pemeliharaan Informasi**: `get_time`, `set_time`, `get_system_data`.
> >     
> > - **Komunikasi**: `create_connection`, `send_message`, `shm_create` (shared memory).
> >     
> > - **Proteksi**: `chmod`, `set_permissions`.
> >     
> > 
> > ### System Programs
> > 
> > Sebagian besar pengguna tidak berinteraksi langsung dengan _system call_, melainkan dengan **System Programs**. Ini adalah program-program yang menyediakan lingkungan yang nyaman untuk pengembangan dan eksekusi. Contohnya termasuk: file manager, text editor, compiler, dan _background services_ (dikenal sebagai _daemons_ di UNIX atau _services_ di Windows).

> [!cornell] #### Summary
> 
> Sistem Operasi menyediakan serangkaian layanan untuk fungsionalitas pengguna (UI, eksekusi program) dan efisiensi sistem (alokasi sumber daya, keamanan). Aplikasi mengakses layanan ini melalui System Call, sebuah antarmuka terprogram yang menjadi jembatan antara user mode dan kernel mode. Programmer biasanya berinteraksi dengan System Call secara tidak langsung melalui API yang lebih sederhana, sementara pengguna akhir berinteraksi dengan OS melalui System Programs yang menyediakan lingkungan kerja yang utuh.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Contoh Alur System Call `open()`
> 
> 1. **User Space**: Sebuah program memanggil fungsi `open("file.txt", O_RDONLY)`. Ini adalah panggilan ke fungsi library (misalnya, `libc`).
>     
> 2. **Library**: Fungsi `open()` di library menyiapkan parameter. Ia menempatkan nomor _system call_ untuk `open` (misalnya, nomor 2 di Linux) ke dalam register `%eax` dan pointer ke string "file.txt" dan flag `O_RDONLY` ke register lain.
>     
> 3. **Trap**: Library kemudian mengeksekusi instruksi khusus (misalnya, `int 0x80` atau `syscall`) yang menyebabkan _trap_ atau software interrupt.
>     
> 4. **Mode Switch**: CPU beralih dari _user mode_ ke _kernel mode_ dan menyimpan konteks program.
>     
> 5. **Kernel Space**: CPU mencari nomor _system call_ (nomor 2) di _system call table_ dan melompat ke fungsi kernel yang mengimplementasikan `sys_open()`.
>     
> 6. **Eksekusi Kernel**: Kernel melakukan tugasnya: memeriksa izin, mencari file di sistem file, menyiapkan struktur data internal (_file descriptor_), dll.
>     
> 7. **Return**: Setelah selesai, kernel menempatkan hasil (misalnya, _file descriptor_ nomor 3) di register `%eax` dan mengeksekusi instruksi untuk kembali ke _user mode_.
>     
> 8. **User Space**: Kontrol kembali ke fungsi library, yang kemudian mengembalikan hasil (`3`) ke program aplikasi.
>     
> 
> #### Pendalaman Teknis 2: MS-DOS vs. UNIX Program Execution
> 
> - **MS-DOS (Single-tasking)**: Ketika Anda menjalankan program, _shell_ (command.com) akan memuat program tersebut ke memori, menimpa sebagian besar dari dirinya sendiri. Hanya kernel yang tersisa. Ketika program selesai, _shell_ harus dimuat ulang dari disk. Tidak ada konsep penciptaan proses yang sesungguhnya.
>     
> - **UNIX/Linux (Multi-tasking)**: _Shell_ menggunakan _system call_ `fork()` untuk membuat proses anak yang identik dengan dirinya. Proses anak ini kemudian menggunakan _system call_ `exec()` untuk mengganti program di dalam memorinya dengan program baru yang ingin dijalankan. _Shell_ (proses induk) bisa menunggu (`wait()`) proses anak selesai atau terus berjalan. Ini adalah model yang jauh lebih kuat dan fleksibel.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Gunakan `strace` (Linux) atau `dtruss` (macOS)**: Ini adalah _tools_ command-line yang sangat kuat untuk melacak _system call_ yang dibuat oleh sebuah program. Coba jalankan `strace ls` di terminal Linux. Anda akan melihat daftar semua _system call_ (`open`, `read`, `write`, `mmap`, `close`, dll.) yang dipanggil oleh program `ls` yang tampaknya sederhana.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi**: `man 2 intro` di terminal Linux/macOS akan memberikan pengantar ke _system call_. `man 2 open` akan memberikan detail spesifik tentang _system call_ `open`.
>     
> - **Buku**: _The C Programming Language_ (K&R) Bab 8, "The UNIX System Interface," memberikan contoh klasik bagaimana API C berinteraksi dengan _system call_ UNIX.
>