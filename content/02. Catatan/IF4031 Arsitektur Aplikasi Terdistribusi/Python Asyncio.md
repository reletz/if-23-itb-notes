---

type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Concurrent Programming dengan Python Asyncio
> 
> > ## Questions/Cues
> >
> > - Masalah Threading?
> >     
> > - Konsumsi Memori?
> >     
> > - Apa itu Asyncio?
> >     
> > - Sintaks `async/await`?
> >     
> > - Struktur dasar `asyncio`?
> >     
> > - Cara menjalankan program?
> >     
> > - Apa itu Coroutine?
> >     
> > - Bagaimana Coroutine dieksekusi?
> >     
> > - Menangani Blocking Code?
> >     
> > - Peran Executor?
> >     
> > - `run_in_executor`?
> >     
> >
> > ## Reference Points
> >
> > - IF4031-04-2022-Async-Library.pdf
> >     
> 
> > ### Masalah pada Model Threading Tradisional
> >
> > Meskipun _threading_ adalah cara yang umum untuk mencapai konkurensi (menjalankan banyak tugas seolah-olah bersamaan), model ini memiliki kelemahan signifikan, terutama dalam hal penggunaan sumber daya.
> >
> > #### Contoh Konsumsi Memori
> >
> > Seperti yang ditunjukkan pada slide, membuat sejumlah besar thread (misalnya 10.000) dapat mengonsumsi memori dalam jumlah yang sangat besar (contoh menunjukkan 82 GB). Hal ini terjadi karena setiap thread memerlukan alokasi _stack_ memori sendiri dari sistem operasi, terlepas dari apakah thread tersebut aktif bekerja atau hanya menunggu (misalnya, `sleep`). Untuk aplikasi yang perlu menangani ribuan koneksi jaringan secara bersamaan (C10k problem), pendekatan satu-thread-per-koneksi menjadi tidak praktis karena boros memori.
> >
> > ### Pengenalan Python Asyncio
> >
> > `Asyncio` adalah _library_ di Python yang menyediakan infrastruktur untuk menulis kode **konkuren single-threaded** menggunakan sintaks `async/await`. Ini adalah implementasi tingkat tinggi dari konsep _event loop_ yang telah kita bahas sebelumnya.
> >
> > **Prinsip Utama `asyncio`:**
> >
> > 1. **Menjalankan Event Loop**: `asyncio` mengelola _event loop_ yang memantau tugas-tugas dan menjalankan callback ketika event (seperti selesainya operasi I/O) terjadi.
> >     
> > 2. **Eksekusi Berdasarkan Event**: Tugas-tugas (coroutines) dieksekusi oleh _event loop_.
> >     
> > 3. **Yield Voluntarily**: Sebuah tugas `asyncio` akan berjalan sampai ia secara eksplisit "memberikan kembali" kontrol ke _event loop_. Ini biasanya terjadi saat ia menemui kata kunci `await` pada operasi yang butuh waktu (misalnya, `asyncio.sleep()` atau operasi jaringan). Saat menunggu, _event loop_ bebas untuk menjalankan tugas lain yang sudah siap.
> >     
> >
> > #### Sintaks `async` dan `await`
> >
> > - **`async def`**: Digunakan untuk mendeklarasikan sebuah fungsi sebagai **coroutine**. Ini adalah unit dasar yang dapat dijalankan oleh `asyncio`.
> >     
> > - **`await`**: Digunakan di dalam sebuah coroutine untuk memanggil coroutine lain. Saat `await` dipanggil, fungsi yang sedang berjalan akan "berhenti sejenak" (_pause_), memberikan kontrol kembali ke _event loop_ untuk menjalankan tugas lain. Ketika coroutine yang di-`await` selesai, eksekusi akan dilanjutkan dari titik di mana ia berhenti.
> >     
> >
> > #### Struktur Dasar dan Eksekusi
> >
> > Cara termudah untuk menjalankan sebuah program `asyncio` (di Python 3.7+) adalah dengan menggunakan `asyncio.run()`.
> >
> > ```Python
> > import asyncio
> > 
> > async def main():
> > 
> > 	print('Hello ...')
> > 	
> > 	# Berhenti sejenak di sini selama 1 detik,
> > 	# event loop bisa menjalankan tugas lain jika ada.
> > 	await asyncio.sleep(1)
> > 	print('... World!')
> > 	
> > 	# asyncio.run() akan membuat event loop baru,
> > 	# menjalankan coroutine main() hingga selesai
> > 	# lalu menutup loop secara otomatis.
> >	
> > 	asyncio.run(main())
> > ```
> >
> > ### Coroutines
> >
> > Secara formal, _coroutine_ adalah sebuah objek yang merangkum kemampuan untuk melanjutkan sebuah fungsi yang telah ditangguhkan (_suspended_) sebelum selesai. Sederhananya, ini adalah sebuah fungsi yang eksekusinya bisa dijeda dan dilanjutkan. Di Python, fungsi yang didefinisikan dengan `async def` akan mengembalikan objek _coroutine_ saat dipanggil.
> >
> > **Cara mengeksekusi sebuah _coroutine_:**
> >
> > 1. `await coro`: Cara paling umum, digunakan di dalam _coroutine_ lain.
> >     
> > 2. `loop.create_task(coro)`: Menjadwalkan _coroutine_ untuk segera dijalankan di _event loop_ tanpa harus menunggunya selesai. Ini akan membungkus _coroutine_ dalam sebuah objek `Task`.
> >     
> > 3. `asyncio.run(coro)`: Titik masuk utama untuk memulai eksekusi program `asyncio`.
> >     
> >
> > ### Menangani Kode Blocking dengan Executor
> >
> > Salah satu tantangan terbesar dalam pemrograman asinkron adalah bagaimana menangani kode yang bersifat _blocking_ (misalnya, fungsi dari _library_ pihak ketiga yang tidak mendukung `asyncio`, atau operasi CPU-bound yang intensif). Jika kita memanggil fungsi _blocking_ (seperti `time.sleep()`) langsung di dalam _coroutine_, seluruh _event loop_ akan terhenti dan membeku.
> >
> > #### Peran Executor
> >
> > Solusinya adalah dengan menggunakan **Executor**. `asyncio` dapat berintegrasi dengan _executor_ (seperti `ThreadPoolExecutor`) untuk menjalankan kode _blocking_ di _thread_ terpisah.
> >
> > ```python
> > loop.run_in_executor(executor, func, *args)
> > ```
> >
> > Fungsi ini menjadwalkan `func` untuk dijalankan di _executor_ yang ditentukan.
> > - `executor`: Bisa berupa `ThreadPoolExecutor` atau `ProcessPoolExecutor`. Jika `None`, `ThreadPoolExecutor` default akan digunakan.
> > 		
> > - `func`: Fungsi _blocking_ yang ingin dijalankan.
> > 		
> > - `*args`: Argumen untuk fungsi tersebut.
> >     
> >
> > `run_in_executor` akan mengembalikan objek `Future` yang bisa di-`await`. Ini memungkinkan kode asinkron kita untuk menunggu hasil dari kode _blocking_ tanpa membekukan _event loop_.
> > 
> > ```python
> > import time
> > import asyncio
> > 
> >
> > def blocking_io():
> > 	print("Start blocking operation")
> > 
> > 	# Simulasi operasi I/O yang blocking
> > 	time.sleep(2)
> > 	
> > 	print("Blocking operation finished")
> > 	return "Blocking result"
> >
> > async def main():
> > 	loop = asyncio.get_running_loop()
> > 	print("Running blocking code in executor")
> >
> > 
> > 	# Jalankan fungsi blocking di thread pool default
> > 	result = await loop.run_in_executor(
> > 	    None, blocking_io
> > 	)
> > 	print(f"Result from blocking code: {result}")
> > 
> > asyncio.run(main())
> > ```
> > 
> > Saat `await loop.run_in_executor()` dieksekusi, _event loop_ akan mendelegasikan `blocking_io()` ke thread lain dan bebas menjalankan tugas lain. Ketika `blocking_io()` selesai, _event loop_ akan melanjutkan eksekusi `main()` setelah `await`.

> [!cornell] #### Summary
> 
> Python `asyncio` memungkinkan konkurensi yang efisien secara memori pada satu thread dengan menggunakan event loop dan sintaks async/await untuk mengelola coroutines. Coroutines adalah fungsi yang dapat dijeda (await) untuk memberikan kontrol kembali ke event loop, yang kemudian dapat menjalankan tugas lain. Untuk mengintegrasikan kode blocking tanpa menghentikan event loop, asyncio menggunakan Executor untuk menjalankan operasi tersebut di thread terpisah, memungkinkan kode asinkron untuk menunggu hasilnya secara non-blocking.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Task vs. Future
> 
> Di `asyncio`, Anda akan sering bertemu dengan istilah `Task` dan `Future`.
> 
> - **`Future`**: Objek tingkat rendah yang merepresentasikan hasil akhir dari sebuah operasi asinkron. Awalnya, statusnya adalah _pending_. Ketika operasi selesai, statusnya menjadi _finished_ dan ia memiliki hasil atau _exception_. `await` pada dasarnya menunggu sebuah objek _awaitable_ (seperti `Future`) untuk selesai.
>     
> - **`Task`**: Subkelas dari `Future` yang secara spesifik membungkus dan mengelola eksekusi sebuah _coroutine_. Ketika Anda melakukan `asyncio.create_task(coro)`, Anda secara eksplisit memberitahu _event loop_: "Saya ingin _coroutine_ ini berjalan di latar belakang, tolong kelola eksekusinya." Anda kemudian bisa menunggu `Task` ini selesai di lain waktu jika perlu.
>     
> 
> #### Pendalaman: `asyncio.gather`
> 
> Ketika Anda memiliki beberapa _coroutines_ atau _tasks_ dan ingin menjalankannya secara konkuren dan menunggu semuanya selesai, `asyncio.gather()` adalah alat yang sangat berguna.
> 
> 
> ```python
> import asyncio
> 
>
> async def fetch_data(delay):
> 	await asyncio.sleep(delay)
> 	return f"Data fetched after {delay}s"
>
> async def main():
> 
> 	# Menjadwalkan kedua coroutine untuk berjalan secara konkuren
> 	results = await asyncio.gather(
> 		fetch_data(1),
> 		fetch_data(2)
> 	)
> 
> 	print(results) # -> ['Data fetched after 1s', 'Data fetched after 2s']
>
> # Total waktu eksekusi akan sekitar 2 detik, bukan 3 detik.
> asyncio.run(main())
> 
> ```
> 
> `gather` mengumpulkan semua *awaitables* yang diberikan, menjalankannya, dan mengembalikan daftar hasil ketika semuanya telah selesai.
>
> #### Eksplorasi Mandiri
>
> - Ubah kode pada halaman 20 di slide untuk memasukkan beberapa panggilan ke `blocking()` dan beberapa _tasks_ `main()` yang berbeda. Gunakan `asyncio.gather()` untuk menjalankan semuanya secara bersamaan dan amati urutan outputnya. Perhatikan bagaimana _event loop_ berpindah antara tugas `async` dan tugas dari _executor_.
>     
> - Cari _library_ Python populer yang berbasis `asyncio`, seperti `aiohttp` (untuk klien/server HTTP) atau `httpx`. Coba buat program sederhana untuk mengambil data dari beberapa URL secara bersamaan menggunakan _library_ tersebut.
>     
>
> #### Sumber & Referensi Lanjutan:
>
> - **Dokumentasi Resmi Python Asyncio**: [https://docs.python.org/3/library/asyncio.html](https://docs.python.org/3/library/asyncio.html)
>     
> - **Tutorial Real Python tentang Async IO**: [https://realpython.com/async-io-python/](https://realpython.com/async-io-python/) (Sumber belajar yang sangat baik dengan contoh-contoh praktis).