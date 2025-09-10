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
> > - Apa itu Hill Climbing?
> >     
> > - Bagaimana analoginya?
> >     
> > - Bagaimana cara kerja algoritma dasarnya?
> >     
> > - Apa saja kelemahan Hill Climbing?
> >     
> > - Seberapa efektif Hill Climbing standar?
> >     
> > - Apa itu 'Sideways Move'?
> >     
> > - Apa itu 'Random-Restart'?
> >     
> > - Apa itu 'Stochastic Hill Climbing'?
> >     
> >
> > ## Reference Points
> >
> > - IF3170-Materi3-Seg03-BeyondClassicalSearch-HillClimbing.pdf
> >     
> 
> > ### Konsep Dasar Hill Climbing
> >
> > **Hill Climbing** adalah algoritma Local Search yang sederhana dan bersifat "serakah" (_greedy_). Algoritma ini secara terus-menerus bergerak ke arah _state_ yang memiliki nilai lebih tinggi (menanjak) hingga mencapai sebuah "puncak" di mana tidak ada _neighbor_ yang memiliki nilai lebih tinggi.
> >
> > - **Analogi**: Prosesnya sering diibaratkan seperti **"mendaki Gunung Everest dalam kabut tebal dan amnesia"**. Anda tidak bisa melihat keseluruhan peta (lanskap), hanya bisa merasakan pijakan di sekitar Anda (_neighbors_). Untuk mencapai puncak, Anda akan selalu melangkah ke arah yang lebih tinggi dari posisi Anda saat ini. Anda tidak ingat jalur yang sudah dilewati (amnesia).
> >     
> >
> > ### Algoritma Hill Climbing (Steepest Ascent)
> >
> > Ini adalah varian paling dasar dari Hill Climbing.
> >
> > 1. **Inisialisasi**: Mulai dari sebuah _state_ acak.
> >     
> > 2. Loop:
> >     
> >     a. Evaluasi semua successor dari current state.
> >     
> >     b. Pilih neighbor yang merupakan successor dengan nilai tertinggi (highest-valued successor).
> >     
> >     c. Bandingkan: Jika nilai neighbor lebih baik dari current state, maka pindah ke neighbor tersebut (menjadi current state yang baru).
> >     
> > 3. **Terminasi**: Jika nilai _neighbor_ tidak lebih baik dari _current state_, maka pencarian berhenti. _Current state_ saat itu adalah solusinya (sebuah puncak).
> >     
> >
> > ### Kelemahan Hill Climbing
> >
> > Sifat _greedy_ dari Hill Climbing membuatnya sangat rentan terjebak dalam kondisi solusi yang tidak optimal.
> >
> > - **Local Maximum**: Puncak yang lebih tinggi dari semua tetangganya, tetapi bukan puncak tertinggi di seluruh lanskap. Algoritma akan berhenti di sini karena semua langkah lain akan "menurun".
> >     
> > - **Flat Local Maximum (Plateau)**: Area datar di mana semua _neighbor_ memiliki nilai yang sama. Algoritma akan berhenti karena tidak ada langkah "naik".
> >     
> > - **Shoulder**: Sebuah area datar yang mengarah ke atas, tetapi algoritma bisa berhenti karena tidak ada peningkatan nilai langsung.
> >     
> >
> > ### Efektivitas pada 8-Queens Problem
> >
> > Hill Climbing standar **tidak terlalu efektif**.
> >
> > - Ia berhasil menemukan solusi global (global maximum) hanya sekitar **14%** dari waktu.
> >     
> > - Sisanya, **86%** dari waktu, ia terjebak di _local maximum_.
> >     
> > - Rata-rata, pencarian hanya membutuhkan 3-4 langkah sebelum berhasil atau terjebak.
> >     
> >
> > ### Varian-Varian Hill Climbing
> >
> > Untuk mengatasi kelemahan di atas, beberapa varian dikembangkan:
> >
> > 1. **Hill Climbing with Sideways Moves**:
> > 	- **Ide**: Izinkan algoritma untuk bergerak ke *neighbor* yang memiliki nilai yang sama (bergerak "menyamping" di plateau).
> > 	- **Tujuan**: Untuk melintasi area datar seperti *plateau* dan *shoulder* dengan harapan menemukan tanjakan lagi.
> > 	- **Implementasi**: Biasanya diberi batasan jumlah langkah menyamping yang boleh dilakukan (misal, 100 langkah) untuk mencegah loop tak terbatas. Varian ini meningkatkan tingkat keberhasilan pada 8-Queens secara signifikan (dari 14% menjadi 94%).
> >
> > 2. **Random-Restart Hill Climbing**:
> > 	- **Ide**: Jika Anda gagal, coba lagi dari tempat lain. "If at first you don't succeed, try, try again."
> > 	- **Cara Kerja**: Menjalankan algoritma Hill Climbing standar berulang kali, setiap kali dimulai dari *initial state* yang diacak ulang. Jika satu proses pencarian terjebak di *local maximum*, proses baru akan dimulai.
> > 	- **Efektivitas**: Sangat efektif. Dengan cukup banyak restart, probabilitas menemukan global maximum mendekati 1.
> >
> > 3. **Stochastic Hill Climbing**:
> > 	- **Ide**: Jangan selalu serakah. Beri kesempatan pada langkah yang "tidak terlihat terbaik".
> > 	- **Cara Kerja**: Alih-alih memilih *neighbor* dengan nilai tertinggi dari *semua successor*, algoritma ini memilih **satu *successor* secara acak**. Jika *successor* acak ini lebih baik dari *current state*, maka algoritma akan pindah ke sana.
> > 	- **Karakteristik**: Cenderung lebih lambat (membutuhkan lebih banyak langkah), tetapi memiliki kemampuan eksplorasi yang lebih baik di lanskap pencarian.

> [!cornell] #### Summary
> Hill Climbing adalah algoritma local search yang _**greedy**_ dengan cara selalu bergerak ke _**state**_ tetangga yang lebih baik, membuatnya cepat namun sangat rentan terjebak dalam _**local maximum**_. Kelemahan ini dapat diatasi secara efektif oleh varian-variannya; terutama Random-Restart Hill Climbing, yang menjalankan pencarian berulang kali dari titik awal yang berbeda hingga solusi ditemukan, secara dramatis meningkatkan peluang untuk mencapai _**global maximum**_.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Menggunakan Hill Climbing?
> 
> Hill Climbing paling cocok untuk masalah optimisasi di mana ruang pencarian tidak terlalu "kasar" (memiliki banyak _local maxima_ yang menipu) dan pendekatan _greedy_ cukup mungkin untuk menemukan solusi yang "cukup baik" dengan cepat. Varian Random-Restart membuatnya menjadi pilihan yang kuat dan seringkali sulit dikalahkan untuk banyak masalah praktis.
> 
> #### Trade-Off Antar Varian
> 
> - **Steepest Ascent**: Paling _greedy_, paling cepat mendaki, tetapi paling mudah terjebak.
>     
> - **Stochastic HC**: Kurang _greedy_, lebih banyak eksplorasi, tetapi bisa lebih lambat dalam menemukan tanjakan.
>     
> - **Random-Restart**: Tidak mencoba "memperbaiki" satu pendakian yang gagal. Sebaliknya, ia bertaruh pada keberuntungan dari titik awal yang baru. Ini adalah pendekatan berbasis probabilitas yang mengandalkan kuantitas percobaan.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba bayangkan lanskap pencarian untuk masalah Traveling Salesperson Problem (TSP). Apakah lanskapnya akan mulus atau sangat kasar dengan banyak _local maxima_? Varian Hill Climbing mana yang menurut Anda akan paling efektif untuk TSP? Mengapa?
>     
> - Bandingkan pseudocode untuk Steepest-Ascent dan Stochastic Hill Climbing. Apa satu-satunya baris kode yang membedakan keduanya secara fundamental?
>