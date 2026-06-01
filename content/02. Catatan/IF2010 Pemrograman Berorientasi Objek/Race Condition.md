---
cssclasses: 
- dashboard
---
_Back to_ [[Latihan Prak 6 OOP]]
- ### Soal 1: Flash Sale Toko Online
	- **Deskripsi Masalah:**
	  Sebuah toko online mengadakan _flash sale_ untuk produk yang sangat populer dengan stok terbatas. Banyak pelanggan (diwakili oleh _threads_) akan mencoba membeli produk tersebut secara bersamaan. Metode `purchaseItem` saat ini tidak _thread-safe_ dan dapat menyebabkan _race condition_, di mana toko bisa menjual lebih banyak barang daripada stok yang tersedia.

	  Tugas Anda adalah memodifikasi metode `purchaseItem` di kelas `FlashSale` agar menjadi _thread-safe_. Gunakan _keyword_ `synchronized` untuk memastikan bahwa hanya satu pelanggan yang dapat memproses pembelian pada satu waktu, sehingga data stok tetap akurat.
	- **File Pendukung**
		- [[Customer.java]] (Tidak perlu diubah)
		- [[Flashsale.java]] 
	- **Black-box Checker:** [[FlashsaleChecker.java]]