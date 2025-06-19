---
cssclasses:
  - dashboard
---
__Back to__ [[Latihan Prak 6 OOP]]

- ### Soal 1: Gudang Cerdas
	- Deskripsi Masalah:  
		- Sebuah gudang cerdas memiliki beberapa robot Producer yang memasok barang dan beberapa robot Consumer yang mengambil barang. Barang-barang ini disimpan di beberapa rak (Shelf) yang berbeda, di mana setiap rak hanya boleh berisi satu jenis barang (ItemType) dan memiliki kapasitas terbatas.  
		- Sistem ini dikelola oleh WarehouseManager. Tantangannya adalah menghindari penggunaan satu lock global untuk seluruh gudang. Sebaliknya, setiap Shelf harus memiliki mekanisme lock-nya sendiri untuk memungkinkan robot bekerja pada rak yang berbeda secara bersamaan (konkurensi granular). Robot Producer harus menunggu jika rak yang dituju penuh, dan robot Consumer harus menunggu jika rak yang dituju kosong.
	- Tugas Anda:
		1. Implementasikan logika wait() dan notifyAll() di dalam kelas Shelf untuk menangani kondisi penuh dan kosong secara thread-safe.
		2. Lengkapi kelas ProducerBot dan ConsumerBot untuk berinteraksi dengan Shelf yang benar.
		3. Lengkapi WarehouseManager untuk memulai semua robot dan menghentikannya secara gracefully ketika tugas selesai.
	- File Pendukung:
		- [[Item.java]]
		- [[Shelf.java]]
		- [[ProducerBot.java]]
		- [[ConsumerBot.java]]
		- [[WarehouseManager.java]]
	- Black-box Checker: [[SmartWarehouseChecker.java]]
    

- ### Soal 2: Simulasi Balapan
	- Deskripsi Masalah:  
	    Anda perlu menyimulasikan sebuah balapan mobil. Setiap mobil adalah sebuah Thread. Balapan berlangsung selama durasi waktu tertentu yang ditentukan oleh RaceControl. Ketika waktu habis, RaceControl (thread utama) akan mengibarkan bendera finis dengan cara menginterupsi semua thread mobil. Semua mobil harus berhenti di posisinya saat itu juga. Setelah dipastikan semua mobil berhenti, program harus melaporkan jarak akhir yang ditempuh setiap mobil. 
	- Tugas Anda:
		1. Di dalam kelas Car, implementasikan logika run() agar mobil terus menambah jaraknya dalam sebuah loop. Loop ini harus berhenti secara gracefully ketika InterruptedException diterima.
		2. Di dalam kelas RaceControl, implementasikan metode startRace() untuk memulai semua Thread mobil, menunggu selama durasi balapan, menginterupsi semua mobil, dan akhirnya menunggu (menggunakan join()) semua mobil benar-benar berhenti sebelum mencetak hasilnya.
		3. Gunakan volatile untuk variabel distanceCovered di kelas Car untuk memastikan visibilitasnya antar thread.
	- File Pendukung:
		- [[Car.java]]
		- [[RaceControl.java]]
	- Black-box Checker: [[RaceSimulatorChecker.java]]
    
- ### Soal 3: Deadlock Detektif
	- Deskripsi Masalah:  
	  Disediakan dua sumber daya bersama, ForkA dan ForkB (seperti garpu di masalah Dining Philosophers). Terdapat dua proses (Process) yang masing-masing membutuhkan kedua sumber daya tersebut untuk "makan". Process1 mencoba mengunci ForkA lalu ForkB. Sebaliknya, Process2 mencoba mengunci ForkB lalu ForkA. Desain ini sengaja dibuat untuk menyebabkan deadlock.
	- Tugas Anda:
	  Modifikasi kelas DeadlockingProcess untuk menghilangkan deadlock. Cara paling umum adalah dengan memastikan semua thread mengunci sumber daya dalam urutan yang sama (misalnya, selalu kunci A lalu kunci B, berdasarkan ID unik atau hash code objek).
	- File Pendukung:
		- [[Resource.java]]
		- [[DeadlockingProcess.java]]
		- [[DeadlockInducer.java]]
	- Black-box Checker: [[DeadlockResolverChecker.java]]