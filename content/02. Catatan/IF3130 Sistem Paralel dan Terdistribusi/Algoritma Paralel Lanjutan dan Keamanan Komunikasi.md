---
type: Note

cssclasses:
- cornell-notes
---
_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana cara kerja Parallel Odd-Even Sort?
> >     
> > - Apa itu 'partner' dalam komunikasi?
> >     
> > - Mengapa sebuah program MPI bisa 'unsafe'?
> >     
> > - Apa itu Deadlock dalam MPI?
> >     
> > - Apa saja cara untuk membuat komunikasi menjadi aman?
> >     
> > - Kapan `MPI_Sendrecv` sangat berguna?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 101-125
> >     
> 
> > ### Algoritma Paralel: Odd-Even Transposition Sort
> > 
> > Ini adalah algoritma sorting yang diadaptasi untuk lingkungan paralel. Tujuannya adalah untuk mengurutkan sebuah list yang terdistribusi di semua proses.
> > 
> > **Prosesnya:**
> > 
> > 1. **Sort Lokal:** Setiap proses terlebih dahulu mengurutkan bagian data (keys) yang dimilikinya menggunakan algoritma serial (misalnya, qsort).
> >     
> > 2. **Fase Iteratif:** Program masuk ke dalam loop yang berjalan sebanyak _p_ (jumlah proses) fase.
> >     
> >     - **Fase Genap (Even Phase):** Proses dengan rank genap `r` berkomunikasi dengan `r+1`. Proses `r` akan menyimpan semua nilai yang lebih kecil dari gabungan data mereka, dan proses `r+1` menyimpan yang lebih besar.
> >         
> >     - **Fase Ganjil (Odd Phase):** Proses dengan rank ganjil `r` berkomunikasi dengan `r+1`. Aturan pembagian datanya sama.
> >         
> > 
> > Setiap proses berkomunikasi dengan "partner"-nya. Dalam fase genap, partner dari `r` adalah `r+1` (jika `r` genap). Dalam fase ganjil, partner dari `r` adalah `r+1` (jika `r` ganjil). Proses di ujung (misal, proses 0 pada fase ganjil) tidak memiliki partner dan diam.
> > 
> > ### Keamanan Komunikasi (Safety)
> > 
> > Masalah serius bisa muncul dari perilaku `MPI_Send`. Seperti dibahas sebelumnya, `MPI_Send` bisa bersifat _buffering_ (non-blocking) untuk pesan kecil, atau _blocking_ untuk pesan besar.
> > 
> > **Program yang Tidak Aman (Unsafe):** Sebuah program MPI dianggap _unsafe_ jika kelancarannya bergantung pada perilaku _buffering_ dari `MPI_Send`. Program ini mungkin berjalan lancar untuk data kecil, tetapi bisa tiba-tiba berhenti total (_hang_) saat ukuran pesan melampaui kapasitas buffer MPI.
> > 
> > ### Deadlock
> > 
> > Deadlock terjadi ketika semua proses saling menunggu untuk sebuah event yang tidak akan pernah terjadi. Dalam konteks Parallel Odd-Even Sort, bayangkan semua proses mencoba mengirim data ke partner mereka pada saat yang bersamaan:
> > 
> > Send my keys to partner;
> > 
> > Receive keys from partner;
> > 
> > Jika `MPI_Send` bersifat _blocking_, maka semua proses akan berhenti di baris `Send`, menunggu partner mereka memanggil `Receive`. Karena tidak ada proses yang bisa mencapai baris `Receive`, terjadilah deadlock.
> > 
> > ### Solusi untuk Komunikasi yang Aman
> > 
> > 1. **Restrukturisasi Komunikasi:** Mengatur ulang urutan `Send` dan `Receive` berdasarkan rank. Misalnya, proses ber-rank genap melakukan `Send` dulu baru `Receive`, sementara proses ber-rank ganjil melakukan `Receive` dulu baru `Send`. Ini memecah siklus tunggu dan mencegah deadlock.
> >     
> > 2. **Synchronous Send `MPI_Ssend`:** Fungsi ini **dijamin** akan me-return (selesai) hanya setelah proses partner memulai panggilan `Receive` yang cocok. Mengganti `MPI_Send` dengan `MPI_Ssend` akan membuat perilaku program lebih prediktabel, tetapi tidak secara otomatis menyelesaikan deadlock jika logikanya salah.
> >     
> > 3. **`MPI_Sendrecv`:** Ini adalah solusi yang paling elegan dan aman untuk pola komunikasi tukar data. Fungsi ini melakukan operasi `Send` dan `Receive` dalam satu panggilan atomik. MPI akan mengatur jadwal komunikasi secara internal untuk memastikan tidak terjadi deadlock. Ini sangat ideal untuk algoritma seperti Odd-Even Sort di mana setiap proses perlu mengirim dan menerima dari partnernya secara bersamaan.
> >     
> >  ### Rangkuman: Tabel Fungsi-Fungsi Penting MPI
> >  
>  > |**Fungsi**|**Keterangan**|**Kapan Digunakan**|**Parameter Penting**|
>  > |---|---|---|---|
>  > |**Manajemen Lingkungan**||||
>  > |`MPI_Init`|Menginisialisasi lingkungan MPI.|**Wajib** dipanggil sekali di awal setiap program MPI.|`(NULL, NULL)`: Biasanya cukup diisi NULL.|
>  > |`MPI_Finalize`|Membersihkan dan mematikan lingkungan MPI.|**Wajib** dipanggil sekali di akhir program, setelah semua fungsi MPI selesai.|-|
>  > |**Identifikasi Proses**||||
>  > |`MPI_Comm_size`|Mendapatkan total jumlah proses yang berjalan dalam sebuah komunikator.|Untuk mengetahui berapa banyak "pekerja" yang ada, biasanya untuk membagi tugas.|comm: Komunikator (hampir selalu MPI_COMM_WORLD).<br><br>&size: Pointer ke integer untuk menyimpan jumlah proses.|
>  > |`MPI_Comm_rank`|Mendapatkan ID unik (rank) dari proses yang sedang menjalankan kode.|Kunci dari model SPMD. Digunakan dalam `if-else` untuk membedakan tugas proses master (rank 0) dan worker.|comm: Komunikator (MPI_COMM_WORLD).<br><br>&rank: Pointer ke integer untuk menyimpan rank proses ini.|
>  > |**Komunikasi Point-to-Point**||||
>  > |`MPI_Send`|Mengirim pesan dari satu proses ke satu proses lain (blocking).|Untuk mengirim data secara spesifik, misal worker mengirim hasil parsial ke master.|&data: Pointer ke variabel yang akan dikirim.<br><br>count: Jumlah elemen yang dikirim.<br><br>datatype: Tipe data (misal, MPI_INT, MPI_DOUBLE).<br><br>dest: Rank proses tujuan.<br><br>tag: "Label" pesan (integer) untuk membedakan jenis komunikasi.<br><br>comm: Komunikator.|
>  > |`MPI_Recv`|Menerima pesan dari satu proses lain (selalu blocking).|Untuk menerima data spesifik, misal master menerima hasil dari worker.|&buffer: Pointer ke variabel untuk menyimpan data yang diterima.<br><br>count: Ukuran maksimal buffer.<br><br>datatype: Tipe data yang diharapkan.<br><br>source: Rank proses pengirim (bisa MPI_ANY_SOURCE).<br><br>tag: Tag yang diharapkan (bisa MPI_ANY_TAG).<br><br>comm: Komunikator.<br><br>&status: Informasi tentang pesan yang diterima (bisa MPI_STATUS_IGNORE).|
>  > |**Komunikasi Kolektif**||||
>  > |`MPI_Bcast`|(_Broadcast_) Mengirim satu pesan dari satu proses (root) ke semua proses lain.|Untuk distribusi data awal, seperti parameter input (`a`, `b`, `n`) dari master ke semua worker.|&data: Pointer ke data.<br><br>count: Jumlah elemen.<br><br>datatype: Tipe data.<br><br>root: Rank proses yang menjadi sumber data.<br><br>comm: Komunikator.|
>  > |`MPI_Reduce`|Mengumpulkan data dari semua proses, melakukan operasi (misal, SUM), dan menyimpan hasil akhir di satu proses (root).|Untuk agregasi hasil akhir. Jauh lebih efisien daripada `Send/Recv` dalam loop.|&send_data: Data lokal dari setiap proses.<br><br>&recv_data: Variabel di proses root untuk menyimpan hasil.<br><br>count: Jumlah elemen.<br><br>datatype: Tipe data.<br><br>op: Operasi reduksi (MPI_SUM, MPI_MAX, MPI_MIN).<br><br>root: Rank proses tujuan.<br><br>comm: Komunikator.|
>  > |`MPI_Scatter`|(_Sebar_) Memecah sebuah array di proses root dan mengirim setiap potongan ke setiap proses.|Untuk mempartisi data input (misal, sebuah vektor besar) agar setiap proses bisa mengerjakan bagiannya masing-masing.|&send_buf: Array lengkap di proses root.<br><br>send_count: Jumlah elemen yang dikirim ke setiap proses.<br><br>&recv_buf: Buffer di setiap proses untuk menerima potongan data.<br><br>recv_count: Jumlah elemen yang diterima.<br><br>root: Rank proses sumber.<br><br>comm: Komunikator.|
>  > |`MPI_Gather`|(_Kumpul_) Kebalikan dari Scatter. Mengumpulkan potongan data dari setiap proses dan menyatukannya di proses root.|Untuk mengumpulkan hasil parsial dari setiap proses menjadi satu array utuh di proses master.|&send_data: Data lokal yang akan dikirim setiap proses.<br><br>send_count: Jumlah elemen yang dikirim.<br><br>&recv_buf: Array di root untuk menampung semua data.<br><br>recv_count: Jumlah elemen yang diterima dari setiap proses.<br><br>root: Rank proses tujuan.<br><br>comm: Komunikator.|
>  > |`MPI_Allgather`|(_Kumpul Semua_) Seperti `MPI_Gather`, tetapi semua proses menerima salinan lengkap dari data yang terkumpul.|Ketika **semua proses** (bukan hanya master) butuh data lengkap untuk komputasi selanjutnya, contoh: perkalian matriks-vektor.|`&send_data`: Data lokal setiap proses. `send_count`: Jumlah elemen dikirim. `&recv_buf`: Buffer di **setiap** proses untuk menampung semua data. `recv_count`: Jumlah elemen diterima dari setiap proses. `comm`: Komunikator.|
>  > |**Sinkronisasi & Keamanan**||||
>  > |`MPI_Barrier`|Memblokir eksekusi. Tidak ada proses yang bisa lanjut sebelum semua proses dalam komunikator mencapai barrier ini.|Sangat penting saat mengukur waktu eksekusi untuk memastikan semua proses memulai "timer" secara bersamaan.|`comm`: Komunikator yang akan disinkronkan.|
>  > |`MPI_Sendrecv`|Melakukan operasi `Send` dan `Recv` secara bersamaan dalam satu panggilan.|Solusi paling aman untuk menghindari **deadlock** pada pola komunikasi tukar data, seperti pada algoritma _Odd-Even Sort_.|Menggabungkan parameter dari `Send` dan `Recv` dalam satu fungsi.|
>  > |**Lain-lain**||||
>  > |`MPI_Wtime`|Mengembalikan waktu saat ini dalam detik (tipe `double`).|Untuk mengukur performa. Panggil sebelum dan sesudah kode yang ingin diukur, lalu hitung selisihnya.|-|

> [!cornell] #### Summary
> 
> Implementasi algoritma paralel seperti Odd-Even Sort, yang mengandalkan komunikasi berpasangan (partner communication) dalam fase-fase terstruktur, harus memperhatikan keamanan komunikasi untuk menghindari deadlock. Deadlock terjadi ketika semua proses melakukan panggilan `Send` blocking secara bersamaan. Solusi paling efektif adalah dengan menggunakan `MPI_Sendrecv`, sebuah fungsi yang dirancang khusus untuk melakukan operasi kirim dan terima secara simultan dengan aman, yang menjamin program berjalan dengan benar terlepas dari ukuran data dan implementasi MPI.

> [!ad-libitum]- Additional Information
> 
> #### Alternatif Algoritma Sorting Paralel
> 
> Odd-Even Sort relatif mudah dipahami, tetapi bukan yang tercepat. Algoritma lain seperti **Parallel Bucket Sort** atau **Sample Sort** seringkali lebih efisien dalam praktiknya. Algoritma-algoritma ini biasanya memiliki pola komunikasi yang lebih kompleks (seringkali all-to-all), tetapi dapat mengurangi jumlah total data yang perlu dipindahkan antar proses.
> 
> #### Kondisi Terjadinya Deadlock (Kondisi Coffman)
> 
> Dalam ilmu komputer, deadlock dapat terjadi jika empat kondisi berikut terpenuhi secara bersamaan:
> 
> 1. **Mutual Exclusion:** Sumber daya (dalam kasus ini, buffer penerima) tidak dapat digunakan bersama.
>     
> 2. **Hold and Wait:** Sebuah proses menahan sumber daya (buffer pengirim yang penuh) sambil menunggu sumber daya lain (buffer penerima partner).
>     
> 3. **No Preemption:** Sumber daya tidak dapat diambil paksa dari proses yang menahannya.
>     
> 4. **Circular Wait:** Ada rantai proses yang saling menunggu (Proses A menunggu B, B menunggu A).
>     
> 
> Restrukturisasi komunikasi dan `MPI_Sendrecv` pada dasarnya bekerja dengan memutus kondisi _Circular Wait_.
> 
> #### Eksplorasi Mandiri
> 
> - **Uji Deadlock:** Implementasikan Parallel Odd-Even Sort menggunakan `MPI_Send` biasa. Jalankan dengan ukuran data per proses yang kecil, lalu tingkatkan secara drastis (misalnya, jutaan angka). Amati apakah program Anda mengalami _hang_.
>     
> - **Implementasi Aman:** Modifikasi program Anda untuk menggunakan `MPI_Sendrecv` dan ulangi eksperimen di atas. Program seharusnya berjalan dengan lancar tanpa terpengaruh ukuran data.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Topik Pencarian:** "MPI deadlock avoidance", "MPI_Sendrecv vs MPI_Send MPI_Recv", "Parallel sorting algorithms MPI", "Coffman conditions for deadlock".
>