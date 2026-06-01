---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Struktur Internal dan Mode Operasi
> 
> > ## Questions/Cues
> >
> > - Apa itu Kernel?
> >     
> > - Bagaimana proses _booting_?
> >     
> > - Apa itu _Dual-Mode Operation_?
> >     
> > - Apa beda _User Mode_ & _Kernel Mode_?
> >     
> > - Apa itu _privileged instructions_?
> >     
> > - Apa peran hardware timer?
> >     
> >
> > ## Reference Points
> >
> > - Slides 7-15, IF2130-02-2025-OS-Structure.pdf
> >     
> 
> > ### Kernel
> >
> > **Kernel** adalah program inti dari sebuah sistem operasi. Ini adalah satu-satunya program yang berjalan setiap saat (dari boot hingga shutdown). Kernel memiliki kendali penuh atas segala sesuatu di dalam sistem dan berfungsi sebagai manajer utama yang menyediakan semua layanan dasar.
> >
> > ### Proses Booting: Menghidupkan Kernel
> >
> > _Booting_ adalah urutan proses yang terjadi saat komputer pertama kali dinyalakan untuk memuat kernel ke dalam memori dan memulai eksekusinya.
> >
> > 1. **Power On**: Saat komputer dinyalakan, sebuah program kecil yang tersimpan di ROM (Read-Only Memory) bernama **BIOS** (Basic Input/Output System) atau **UEFI** dijalankan.
> >     
> > 2. **Inisialisasi**: BIOS/UEFI melakukan inisialisasi dan pengecekan perangkat keras dasar (_Power-On Self-Test_ atau POST).
> >     
> > 3. **Load Bootloader**: BIOS/UEFI mencari **bootloader** di perangkat penyimpanan (misalnya, hard disk) dan memuatnya ke memori.
> >     
> > 4. **Load Kernel**: **Bootloader** adalah program kecil yang tugas utamanya adalah menemukan file **kernel** di disk, memuatnya ke memori, dan kemudian mentransfer kontrol eksekusi ke kernel.
> >     
> > 5. **Kernel Running**: Kernel mulai berjalan, menginisialisasi sisa sistem (driver, services), dan akhirnya menjalankan program pertama untuk pengguna (misalnya, proses login).
> >     
> >
> > ### Dual-Mode Operation: Mekanisme Proteksi Inti
> >
> > Untuk melindungi kernel dan komponen sistem penting dari program pengguna yang mungkin error atau jahat, perangkat keras CPU modern menyediakan **Dual-Mode Operation**. CPU dapat beroperasi dalam salah satu dari dua mode:
> >
> > 1. **Kernel Mode (juga disebut Supervisor, System, atau Privileged Mode)**
> > 	- **Akses Penuh**: Kode yang berjalan dalam mode ini memiliki akses tak terbatas ke semua instruksi CPU dan perangkat keras.
> > 	- **Untuk Siapa**: Hanya kernel OS yang diizinkan berjalan dalam mode ini.
> >
> > 2. **User Mode**
> > 	- Akses Terbatas**: Kode yang berjalan dalam mode ini tidak dapat mengakses perangkat keras secara langsung atau menjalankan instruksi-instruksi kritis.
> > 	- **Untuk Siapa**: Semua aplikasi pengguna dan program sistem non-inti berjalan dalam mode ini.
> >
> > Sebuah bit di dalam register CPU, yang disebut **mode bit**, digunakan untuk melacak mode saat ini (misalnya, `0` untuk kernel, `1` untuk user).
> >
> > ### Transisi Antar Mode
> >
> > - **User ke Kernel**: Transisi ini hanya dapat terjadi melalui mekanisme yang terkontrol, yaitu **interupsi**, yang bisa berupa:
> > 	- **System Call**: Program secara sukarela meminta layanan kernel.
> > 	- **Hardware Interrupt**: Perangkat keras meminta perhatian.
> > 	- **Exception/Fault**: Terjadi error dalam program (misal, pembagian dengan nol).
> >  Saat ini terjadi, CPU secara otomatis beralih ke *kernel mode* dan menjalankan kode penangan (*handler*) yang sesuai.
> >
> > - **Kernel ke User**: Setelah selesai menangani interupsi, kernel akan mengganti _mode bit_ kembali ke _user mode_ sebelum mengembalikan kontrol ke program pengguna.
> >     
> >
> > ### Privileged Instructions
> >
> > Ini adalah instruksi-instruksi CPU yang dianggap berbahaya jika dijalankan oleh aplikasi biasa. Instruksi ini **hanya dapat dieksekusi saat CPU berada di** _**kernel mode**_. Contohnya termasuk:
> >
> > - Mengubah pemetaan memori.
> >     
> > - Mengakses perangkat I/O secara langsung.
> >     
> > - Memanipulasi _mode bit_.
> >     
> > - Menghentikan sistem (`halt`).
> >     
> >
> > Jika program di _user mode_ mencoba menjalankan instruksi ini, CPU akan menghasilkan _trap_ (exception) dan memberikan kontrol ke kernel, yang kemungkinan besar akan menghentikan program tersebut.
> >
> > ### Peran Hardware Timer
> >
> > Untuk memastikan OS tidak kehilangan kontrol atas sistem (misalnya, karena program pengguna masuk ke dalam _infinite loop_), perangkat keras menyediakan **timer**. Sebelum memberikan kontrol ke program pengguna, kernel akan mengatur timer untuk menghasilkan interupsi setelah periode waktu tertentu. Jika program tidak mengembalikan kontrol secara sukarela (misalnya melalui _system call_), interupsi dari timer pada akhirnya akan terjadi, memaksa CPU kembali ke _kernel mode_ dan mengembalikan kontrol ke OS.

> [!cornell] #### Summary
> 
> Struktur internal OS berpusat pada Kernel, program inti yang dimuat saat proses booting. Untuk melindungi dirinya sendiri, OS mengandalkan mekanisme perangkat keras yang disebut Dual-Mode Operation, yang memisahkan eksekusi menjadi Kernel Mode yang memiliki hak akses penuh dan User Mode yang terbatas. Transisi dari User ke Kernel Mode hanya terjadi melalui interupsi, dan instruksi-instruksi kritis (privileged instructions) hanya bisa dijalankan di Kernel Mode. Mekanisme ini, ditambah dengan adanya hardware timer untuk merebut kembali kontrol, memastikan bahwa kernel selalu memegang kendali tertinggi atas sistem.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Arsitektur Von Neumann
> 
> Komputer modern umumnya mengikuti arsitektur Von Neumann, di mana **instruksi (kode program) dan data disimpan dalam memori yang sama**. CPU mengambil instruksi dari memori, mengeksekusinya, dan mungkin membaca atau menulis data kembali ke memori. Arsitektur ini adalah dasar dari bagaimana sebuah _thread of execution_ berjalan. Perangkat I/O biasanya tidak berkomunikasi langsung dengan CPU untuk transfer data besar; mereka menggunakan **DMA (Direct Memory Access)** untuk mentransfer data langsung ke/dari memori utama, lalu mengirimkan interupsi ke CPU setelah selesai. Ini membebaskan CPU dari tugas transfer data yang lambat.
> 
> #### Pendalaman Teknis 2: Bagaimana System Call Sebenarnya Mengubah Mode?
> 
> Ketika instruksi `syscall` atau `int` dieksekusi, CPU tidak hanya mengubah _mode bit_. Ia melakukan beberapa hal secara atomik (tidak dapat diinterupsi) oleh perangkat keras:
> 
> 1. Menyimpan beberapa register penting (seperti _program counter_ dan _stack pointer_ dari user mode) ke lokasi khusus di memori kernel.
>     
> 2. Mengubah _mode bit_ ke _kernel mode_.
>     
> 3. Memuat program counter dari Interrupt Descriptor Table (IDT) atau vector table, yang berisi alamat dari handler kernel yang sesuai.
>     
>     Proses ini memastikan bahwa program pengguna tidak dapat "membajak" transisi dan melompat ke kode sembarangan di dalam kernel. Ia hanya bisa masuk melalui titik masuk yang telah ditentukan oleh OS di IDT.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Masuk ke BIOS/UEFI Setup**: Saat komputer Anda _booting_, tekan tombol yang sesuai (seringkali Del, F2, F10, atau Esc). Layar yang Anda lihat adalah antarmuka untuk firmware BIOS/UEFI. Di sinilah Anda dapat mengonfigurasi urutan perangkat boot, yang memberitahu BIOS di mana harus mencari _bootloader_.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Situs Web**: osdev.org adalah wiki komunitas yang luar biasa bagi siapa saja yang tertarik untuk belajar membangun sistem operasi dari nol. Di sana Anda akan menemukan penjelasan yang sangat detail tentang proses booting, A20 line, GDT, IDT, dan konsep-konsep tingkat rendah lainnya.
>