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
> > - Apa itu Backtracking Search?
> >     
> > - Bagaimana cara kerjanya?
> >     
> > - Apa saja pertanyaan kunci untuk efisiensi?
> >     
> > - Apa itu _Variable Ordering_?
> >     
> > - Apa itu heuristik MRV?
> >     
> > - Apa itu _Degree Heuristic_?
> >     
> > - Apa itu _Value Ordering_?
> >     
> > - Apa itu heuristik LCV?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170_Materi04_AI-CSP.pdf (Slide 13-20)
> >     
> 
> > ### Konsep Dasar Backtracking Search
> > 
> > _Backtracking Search_ adalah algoritma dasar _uninformed_ untuk menyelesaikan CSP. Algoritma ini pada dasarnya adalah **Depth-First Search (DFS)** yang dimodifikasi untuk CSP.
> > 
> > Beberapa properti pentingnya:
> > 
> > - **Satu Variabel per Langkah**: Di setiap level pohon pencarian, kita hanya mempertimbangkan _assignment_ untuk satu variabel tunggal.
> >     
> > - **Komutatif**: Urutan pemberian nilai tidak penting untuk hasil akhir (misal, `WA=merah, NT=hijau` sama saja dengan `NT=hijau, WA=merah`). Ini memungkinkan kita hanya mempertimbangkan satu variabel pada satu waktu.
> >     
> > - **Solusi di Kedalaman n**: Untuk CSP dengan _n_ variabel, solusi ditemukan pada kedalaman _n_ di pohon pencarian.
> >     
> > 
> > Cara kerjanya adalah dengan mencoba memberikan nilai pada satu variabel, lalu secara rekursif melanjutkan ke variabel berikutnya. Jika ditemukan sebuah nilai yang melanggar _constraint_, maka algoritma akan "mundur" (backtrack) ke langkah sebelumnya dan mencoba nilai lain.
> > 
> > ### Meningkatkan Efisiensi Backtracking
> > 
> > Algoritma _backtracking_ standar bisa sangat lambat. Efisiensinya dapat ditingkatkan secara drastis dengan menjawab tiga pertanyaan kunci (tanpa memerlukan pengetahuan spesifik domain):
> > 
> > 1. Variabel mana yang harus dipilih selanjutnya? (**Variable Ordering**)
> >     
> > 2. Dalam urutan apa nilai-nilainya harus dicoba? (**Value Ordering**)
> >     
> > 3. Bisakah kita mendeteksi kegagalan lebih awal? (_Inference_, akan dibahas di catatan berikutnya).
> >     
> > 
> > ### 1. Variable Ordering: Gagal Lebih Cepat
> > 
> > Tujuannya adalah memilih variabel yang paling mungkin menyebabkan kegagalan, sehingga kita bisa memangkas cabang pencarian sedini mungkin.
> > 
> > - **Minimum Remaining Values (MRV) Heuristic:**
> >     
> >     - Pilih variabel yang memiliki jumlah nilai legal (valid) paling sedikit di domainnya. Heuristik ini juga dikenal sebagai "_most constrained variable_".
> >     
> >     - **Contoh:** Setelah WA=merah dan NT=hijau, domain untuk SA tinggal `{biru}` (1 nilai) sementara domain Q adalah `{merah, biru}` (2 nilai). Maka, kita harus memilih SA selanjutnya.
> >     
> > - **Degree Heuristic:**
> >     
> >     - Digunakan sebagai pemecah seri (_tie-breaker_) jika ada beberapa variabel dengan MRV yang sama. **Pilih variabel yang memiliki jumlah constraint paling banyak** dengan variabel lain yang **belum diberi nilai.**
> >     - Heuristik ini mencoba mengurangi domain variabel lain secepat mungkin.
> >     
> >     - **Contoh:** Pada awal pewarnaan peta, SA adalah pilihan terbaik karena berbatasan dengan 5 wilayah lain.
> >     
> > 
> > ### 2. Value Ordering: Sukses Lebih Cepat
> > 
> > Berbeda dengan _variable ordering_, tujuan di sini adalah memilih nilai yang paling mungkin membawa kita ke solusi.
> > 
> > - **Least Constraining Value (LCV) Heuristic:**
> >     
> >     Pilih nilai yang paling sedikit menghilangkan pilihan untuk variabel-variabel tetangga yang belum diberi nilai.
> >     - **Contoh:** Setelah WA=merah dan NT=hijau, kita perlu memilih warna untuk Q.
> >     
> > 	    - Jika `Q=biru`, maka domain SA menjadi `{}` (kosong). Ini sangat membatasi.
> > 	        
> > 	    - Jika `Q=merah`, maka domain SA menjadi `{biru}`. Ini menyisakan satu pilihan.
> > 	        
> > 	 - Maka, kita harus memilih `Q=merah` terlebih dahulu.
> >         

> [!cornell] #### Summary
> 
> Backtracking Search adalah algoritma fundamental berbasis DFS untuk menyelesaikan CSP dengan mencoba nilai secara rekursif dan mundur saat terjadi konflik. Performanya yang naif dapat ditingkatkan secara dramatis menggunakan heuristik cerdas. Heuristik Variable Ordering (MRV, Degree) bertujuan untuk "gagal lebih cepat" dengan memilih variabel yang paling terbatas, sementara heuristik Value Ordering (LCV) bertujuan untuk "sukses lebih cepat" dengan memilih nilai yang paling tidak membatasi sisa masalah.

> [!ad-libitum]- Additional Information
> 
> #### Dampak Heuristik yang Berbeda
> 
> - **Variable Ordering (MRV & Degree)** adalah heuristik yang sangat kuat dan hampir selalu meningkatkan performa secara signifikan. Memilih variabel yang tepat untuk dieksplorasi selanjutnya dapat memangkas sebagian besar pohon pencarian. Tujuannya adalah menemukan jalan buntu secepat mungkin.
>     
> - **Value Ordering (LCV)** sangat berguna jika kita hanya butuh satu solusi. Dengan mencoba nilai yang paling mungkin berhasil, kita bisa menemukan solusi pertama lebih cepat. Namun, jika tidak ada solusi atau kita butuh semua solusi, urutan nilai tidak akan membuat perbedaan pada total waktu pencarian (karena semua cabang tetap harus dieksplorasi).
>     
> 
> #### Pseudocode Inti
> 
> Algoritma backtracking dapat diringkas sebagai berikut:
> 
> 1. Jika semua variabel sudah diberi nilai, kembalikan solusi.
>     
> 2. Pilih satu variabel yang belum diberi nilai (menggunakan MRV/Degree).
>     
> 3. Untuk setiap nilai dalam domain variabel tersebut (diurutkan oleh LCV):
>     
>     a. Jika nilai tersebut konsisten dengan assignment saat ini:
>     
>     i. Tambahkan {variabel = nilai} ke assignment.
>     
>     ii. Panggil backtrack() secara rekursif.
>     
>     iii. Jika rekursi berhasil, kembalikan hasilnya.
>     
>     iv. Jika tidak, hapus {variabel = nilai} dari assignment (ini adalah langkah "backtrack").
>     
> 4. Jika semua nilai sudah dicoba dan tidak ada yang berhasil, kembalikan kegagalan.
>