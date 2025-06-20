---
cssclasses: 
- dashboard
---
_Back to_ [[Latihan Prak 6 OOP]]
- ### Soal 1: Lini Perakitan Pabrik
	- **Deskripsi Masalah:**
	  Sebuah pabrik modern menggunakan lini perakitan otomatis untuk membuat sebuah _gadget_. _Gadget_ tersebut harus melewati 5 stasiun kerja secara berurutan, dari Stasiun 1 hingga Stasiun 5. Setiap stasiun kerja direpresentasikan sebagai _thread_ yang terpisah.
	
	- Tugas Anda adalah memodifikasi kelas `AssemblyLine` dan mengimplementasikan kelas `Workstation`. Gunakan mekanisme `wait()` dan `notify()` untuk memastikan _gadget_ diproses sesuai urutan yang benar (Stasiun 1, lalu 2, lalu 3, dst.). Stasiun kerja tidak boleh bekerja di luar giliran. Seluruh akses dan modifikasi terhadap kondisi _gadget_ (tahap perakitan) harus bersifat _thread-safe_ menggunakan `synchronized`.
	- **File Pendukung**
		- [[Gadget.java]] (Tidak perlu diubah)
		- [[AssemblyLine.java]] 
		- [[Workstation.java]]
	- **Black-box Checker:** [[AssemblyLineChecker.java]]
	
- ### Soal 2: Pipa Pemrosesan Data
	- **Deskripsi Masalah:**
	   Anda sedang membangun sebuah sistem pemrosesan data. Terdapat _thread_ `Producer` yang menghasilkan paket data dan meletakkannya ke dalam `DataBuffer` bersama. Terdapat juga _thread_ `Consumer` yang mengambil paket dari `DataBuffer` untuk diproses. `DataBuffer` memiliki kapasitas yang terbatas.
	   
	 - Tugas Anda adalah mengimplementasikan metode `put` dan `get` di kelas `DataBuffer` menggunakan `wait()` dan `notify()` untuk memastikan:
	   1. `Producer` akan menunggu jika _buffer_ penuh.
	   2. `Consumer` akan menunggu jika _buffer_ kosong.
	   3. _Thread_ yang menunggu akan dibangunkan dengan benar ketika keadaan _buffer_ berubah.
	- **File Pendukung**
		- [[Consumer.java]]
		- [[Producer.java]] 
		- [[DataBuffer.java]]
	- **Black-box Checker:** [[PipelineChecker.java]]

- ### Soal 3: Koordinator Tugas Paralel
	- **Deskripsi Masalah:**
	   Anda sedang membangun sebuah sistem yang perlu menjalankan beberapa tugas (misalnya, mengunduh beberapa berkas) secara paralel. Anda memerlukan sebuah `TaskCoordinator` yang memulai semua tugas dalam _thread_ terpisah, lalu menunggu hingga **semua** tugas tersebut selesai sebelum melanjutkan eksekusi program utama.
	- 
	   Tugas Anda adalah mengimplementasikan logika di dalam kelas `TaskCoordinator`. _Thread_ utama yang memanggil `startAndAwaitCompletion()` harus berhenti dan menunggu. Anda dapat menggunakan `Thread.join()` pada semua _thread worker_ atau menggunakan mekanisme `wait/notify` dengan sebuah _counter_ untuk melacak tugas yang sudah selesai.
	- **File Pendukung**
		- [[TaskCoordinator.java]]
		- [[Worker.java]] (Tidak perlu diubah)
	- **Black-box Checker:** [[CoordinatorChecker.java]]