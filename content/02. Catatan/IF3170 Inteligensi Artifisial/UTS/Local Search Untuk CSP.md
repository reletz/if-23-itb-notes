---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Local Search untuk CSP?
> >     
> > - Bagaimana pendekatannya berbeda?
> >     
> > - Apa itu _complete-state formulation_?
> >     
> > - Apa itu heuristik _Min-Conflicts_?
> >     
> > - Bagaimana cara kerjanya?
> >     
> > - Apa contoh aplikasi Min-Conflicts?
> >     
> > - Apa kelebihan metode ini?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170_Materi04_AI-CSP.pdf (Slide 25-29)
> >     
> 
> > ### Konsep Dasar Local Search
> > 
> > _Local Search_ adalah keluarga algoritma yang menggunakan pendekatan yang berbeda secara fundamental dari _Backtracking_. Alih-alih membangun solusi sepotong demi sepotong dari awal, _local search_ bekerja pada **formulasi keadaan-lengkap (complete-state formulation)**.
> > 
> > **Cara Kerja Umum**:
> > 
> > 1. Mulai dengan sebuah _assignment_ yang **lengkap**, di mana setiap variabel sudah memiliki nilai (meskipun _assignment_ ini kemungkinan besar melanggar beberapa _constraint_).
> >     
> > 2. Secara iteratif, coba perbaiki _assignment_ ini dengan mengubah nilai dari satu variabel pada satu waktu.
> >     
> > 3. Tujuan dari setiap perubahan adalah untuk mengurangi jumlah total _constraint_ yang dilanggar.
> >     
> > 
> > Pendekatan ini sangat efektif untuk masalah-masalah tertentu dan seringkali dapat menemukan solusi dengan sangat cepat.
> > 
> > ### Heuristik Min-Conflicts
> > 
> > _Min-Conflicts_ adalah heuristik (dan algoritma) yang sangat efektif dan sederhana untuk _local search_ dalam konteks CSP.
> > 
> > **Algoritma**:
> > 
> > 1. Buat sebuah _assignment_ awal yang lengkap secara acak.
> >     
> > 2. Ulangi langkah berikut hingga solusi ditemukan (atau max_steps tercapai):
> >     
> >     a. Jika assignment saat ini sudah menjadi solusi (tidak ada constraint yang dilanggar), kembalikan hasilnya.
> >     
> >     b. Pilih Variabel: Pilih sebuah variabel (var) secara acak dari antara variabel-variabel yang saat ini sedang berkonflik (terlibat dalam pelanggaran constraint).
> >     
> >     c. Pilih Nilai: Pilih sebuah nilai baru (value) untuk var yang meminimalkan jumlah konflik dengan variabel-variabel lainnya.
> >     
> >     d. Tetapkan var = value dalam assignment saat ini.
> >     
> > 3. Jika loop selesai tanpa solusi, kembalikan kegagalan.
> >     
> > 
> > ### Contoh: n-Queens Problem
> > 
> > _Min-Conflicts_ sangat terkenal karena kemampuannya menyelesaikan masalah n-Queens dengan sangat efisien.
> > 
> > - **Langkah 1**: Papan diisi dengan 8 ratu, satu per kolom, pada baris acak. Ratu di pojok kanan bawah dipilih karena berkonflik.
> >     
> > - **Langkah 2**: Angka-angka di kolomnya menunjukkan jumlah konflik yang akan terjadi jika ratu dipindahkan ke baris tersebut. Nilai `0` dipilih.
> >     
> > - **Langkah 3**: Papan sekarang memiliki lebih sedikit konflik. Proses ini diulangi hingga tidak ada konflik sama sekali (solusi ditemukan).
> >     
> > 
> > ### Aplikasi dan Kelebihan
> > 
> > - **Sangat Cepat**: Untuk masalah seperti n-Queens, _Min-Conflicts_ bisa menemukan solusi untuk jutaan ratu dalam waktu yang hampir konstan.
> >     
> > - **Aplikasi Online**: Sangat cocok untuk masalah penjadwalan di mana masalah terus berubah dan perlu diperbaiki dengan cepat.
> >     

> [!cornell] #### Summary
> 
> Berbeda dengan backtracking yang membangun solusi dari nol, Local Search memulai dengan solusi lengkap yang mungkin salah dan secara iteratif memperbaikinya. Heuristik Min-Conflicts adalah metode yang sangat efisien untuk ini, di mana pada setiap langkah, ia memilih variabel yang berkonflik secara acak dan memberinya nilai baru yang paling sedikit menimbulkan konflik lain, memungkinkannya menyelesaikan masalah besar seperti n-Queens dengan sangat cepat.

> [!ad-libitum]- Additional Information
> 
> #### Kelemahan Local Search
> 
> _Local Search_ tidak _complete_. Artinya, ia tidak dijamin akan menemukan solusi meskipun ada. Algoritma ini bisa terjebak dalam **minimum lokal (local minimum)**, yaitu sebuah keadaan di mana setiap perubahan nilai akan meningkatkan jumlah konflik, meskipun keadaan itu sendiri bukanlah solusi (bukan minimum global, yaitu 0 konflik).
> 
> #### Mengatasi Minimum Lokal
> 
> Ada beberapa strategi untuk "melarikan diri" dari minimum lokal:
> 
> - **Random Restarts**: Jika tidak ada kemajuan setelah beberapa saat, buang _assignment_ saat ini dan mulai lagi dari awal dengan _assignment_ acak yang baru.
>     
> - **Sideways Moves**: Izinkan algoritma untuk pindah ke keadaan tetangga yang memiliki jumlah konflik yang sama, dengan harapan ini akan membawanya keluar dari "dataran tinggi" (plateau).
>     
> - **Random Walk**: Kadang-kadang, dengan probabilitas kecil, pilih nilai acak alih-alih nilai terbaik (Min-Conflicts). Ini membantu keluar dari lembah minimum lokal.
>