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