---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Pola Algoritma Paralel: Histogram dan Solusi Konflik dengan Operasi Atomik
> 
> > ## Questions/Cues
> > 
> > - Apa itu komputasi histogram?
> >     
> > - Bagaimana partisi input yang efisien?
> >     
> > - Apa itu _Data Race_?
> >     
> > - Mengapa _Read-Modify-Write_ berbahaya?
> >     
> > - Apa solusi untuk _Data Race_?
> >     
> > - Bagaimana cara kerja Operasi Atomik?
> >     
> > - Apa kelemahan performa atomics?
> >     
> > - Apa itu teknik _Privatization_?
> >     
> > - Bagaimana cara kerja Histogram Terprivatisasi?
> >     
> > 
> > ## Reference Points
> > 
> > - `7 - IF-3230-07-GPU-05-2023.pdf`
> >     
> 
> > ### Apa itu Komputasi Histogram?
> > 
> > **Histogram** adalah sebuah metode untuk menghitung frekuensi kemunculan setiap nilai dalam sebuah kumpulan data. Prosesnya melibatkan pendefinisian beberapa "keranjang" (_bin_), dan untuk setiap elemen data input, nilai keranjang yang sesuai akan diinkremen (ditambah satu).
> > 
> > - **Aplikasi**: Sangat umum digunakan untuk ekstraksi fitur dan analisis data, seperti menghitung distribusi warna dalam gambar, mendeteksi anomali dalam transaksi keuangan, atau menganalisis frekuensi kata dalam teks.
> >     
> > 
> > ### Partisi Input yang Efisien
> > 
> > Saat memparalelkan pembuatan histogram, cara _thread_ membaca data input sangat mempengaruhi efisiensi akses memori.
> > 
> > 1. **Sectioned Partitioning**: Setiap _thread_ memproses satu blok data yang bersebelahan. Ini **buruk** karena _thread_ yang bersebelahan akan mengakses lokasi memori yang jauh, menghancurkan _memory coalescing_.
> >     
> > 2. **Interleaved Partitioning**: _Thread_ yang bersebelahan memproses elemen input yang bersebelahan, lalu melompat bersama ke bagian berikutnya. Ini **baik** karena memastikan semua akses ke Global Memory bersifat _coalesced_, memaksimalkan penggunaan bandwidth.
> >     
> > 
> > ### Masalah Inti: Data Race
> > 
> > Masalah fundamental dalam histogram paralel muncul ketika beberapa _thread_ mencoba memperbarui _bin_ yang sama **pada saat yang bersamaan**.
> > 
> > - **Definisi**: **Data Race** terjadi ketika beberapa _thread_ mengakses lokasi memori yang sama secara bersamaan, dan setidaknya salah satu dari akses tersebut adalah operasi tulis. Hasil akhir dari operasi menjadi tidak dapat diprediksi dan bergantung pada urutan eksekusi _thread_ yang kebetulan.
> >     
> > 
> > ### Bahaya Operasi Read-Modify-Write
> > 
> > Inkrementasi sebuah _bin_ (`histo[bin]++`) bukanlah satu operasi tunggal. Di tingkat perangkat keras, ini adalah urutan dari tiga instruksi:
> > 
> > 1. **Read**: Baca nilai lama dari `histo[bin]` ke dalam register _thread_.
> >     
> > 2. **Modify**: Tambahkan 1 ke nilai di register.
> >     
> > 3. **Write**: Tulis nilai baru dari register kembali ke `histo[bin]`.
> >     
> > 
> > **Skenario Bencana**:
> > 
> > - Thread A membaca nilai `histo[5]` (misalnya, 10).
> >     
> > - _Sebelum Thread A menulis kembali_, Thread B juga membaca nilai `histo[5]` (masih 10).
> >     
> > - Thread A menghitung 10+1=11, lalu menulis 11 ke `histo[5]`.
> >     
> > - Thread B menghitung 10+1=11, lalu menulis 11 ke `histo[5]`.
> >     
> > 
> > **Hasil**: `histo[5]` bernilai 11, padahal seharusnya 12. Satu pembaruan telah hilang. Ini adalah _bug_ yang sangat sulit dilacak karena hanya terjadi pada timing tertentu.
> > 
> > ### Solusi Perangkat Keras: Operasi Atomik
> > 
> > **Operasi Atomik** adalah instruksi perangkat keras khusus yang mengeksekusi urutan _Read-Modify-Write_ secara **tak terpisahkan (indivisible)**.
> > 
> > - **Jaminan**: Ketika satu _thread_ memulai operasi atomik pada sebuah alamat memori, perangkat keras akan "mengunci" alamat tersebut dan memastikan tidak ada _thread_ lain yang dapat mengaksesnya sampai operasi atomik tersebut selesai sepenuhnya.
> >     
> > - **Serialisasi**: Ini secara efektif memaksa semua _thread_ yang ingin mengakses alamat yang sama untuk melakukannya secara berurutan (serial), sehingga menghilangkan _data race_ dan menjamin kebenaran hasil.
> >     
> > - Di CUDA: Disediakan melalui fungsi intrinsik seperti atomicAdd().
> >     
> >     atomicAdd(&address, value);
> >     
> > 
> > ### Kelemahan Performa Operasi Atomik
> > 
> > Meskipun menjamin kebenaran, operasi atomik bisa menjadi _bottleneck_ performa yang serius, terutama jika dilakukan pada **Global Memory**.
> > 
> > - **Latensi Tinggi**: Setiap operasi atomik global melibatkan siklus baca dan tulis penuh ke DRAM yang lambat.
> >     
> > - **Kontensi Tinggi**: Jika banyak _thread_ dari seluruh GPU (dari berbagai _block_) mencoba melakukan operasi atomik pada _bin_ yang sama, mereka semua akan diserialisasi, secara efektif mengubah eksekusi paralel menjadi sekuensial pada titik tersebut dan menghancurkan throughput.
> >     
> > 
> > Operasi atomik pada **Shared Memory** jauh lebih cepat (sekitar 100x) karena latensinya yang sangat rendah.
> > 
> > ### Kinerja Tinggi: Teknik Privatization
> > 
> > Untuk menghindari biaya tinggi dari atomik global, kita menggunakan teknik **Privatization** yang cerdas. Idenya adalah membatasi konflik hanya di dalam lingkup yang cepat.
> > 
> > **Alur Kerja**:
> > 
> > 1. Setiap _thread block_ mendeklarasikan **histogram privat** miliknya sendiri di **Shared Memory**.
> >     
> > 2. _Thread-thread_ di dalam block memproses bagian input mereka dan memperbarui histogram privat di Shared Memory menggunakan `atomicAdd()` yang **sangat cepat**. Karena lingkupnya per-block, tidak ada konflik antar block.
> >     
> > 3. `__syncthreads()`: Menunggu semua _thread_ dalam block selesai.
> >     
> > 4. **Hanya beberapa thread** (misalnya, _thread_ pertama dari setiap _bin_) yang kemudian bertanggung jawab untuk menambahkan hasil dari histogram privat di Shared Memory ke histogram utama di Global Memory, menggunakan `atomicAdd()` yang lambat.
> >     
> > 
> > **Keuntungan**: Jumlah operasi atomik global yang lambat dan berpotensi konflik tinggi berkurang dari _jutaan_ (satu per elemen input) menjadi hanya _ribuan_ (satu per _bin_ per _block_). Ini secara dramatis meningkatkan performa.

> [!cornell] #### Summary
> 
> Histogram paralel menghadapi masalah kritis data race ketika banyak thread mencoba menginkremen bin yang sama melalui operasi read-modify-write. Solusi untuk menjamin kebenaran adalah Operasi Atomik, instruksi perangkat keras yang tak terpisahkan, namun bisa sangat lambat jika terjadi kontensi tinggi pada Global Memory. Teknik berkinerja tinggi yang disebut Privatization mengatasi ini dengan membuat setiap thread block membangun histogram privatnya di Shared Memory yang cepat, dan hanya pada akhirnya menggabungkan hasil-hasil privat ini ke histogram global, sehingga secara drastis mengurangi bottleneck dari operasi atomik global.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Privatization Tidak Cukup?
> 
> Teknik privatisasi Shared Memory bekerja dengan baik ketika jumlah _bin_ histogram cukup kecil untuk muat di dalam Shared Memory yang terbatas (misalnya, 256 _bin_ untuk karakter ASCII). Jika histogram memiliki ribuan atau jutaan _bin_, maka pendekatan ini tidak dapat digunakan secara langsung. Dalam kasus seperti itu, strategi yang mungkin adalah:
> 
> 1. **Partial Privatization**: Hanya _bin-bin_ yang paling sering diakses ("hot bins") yang diprivatisasi di Shared Memory. Akses ke _bin_ lain langsung menggunakan atomik global. Ini membutuhkan analisis data terlebih dahulu.
>     
> 2. **Sorting**: Alternatif lain yang sama sekali berbeda adalah dengan mengurutkan (_sorting_) data input terlebih dahulu berdasarkan nilainya. Setelah diurutkan, semua elemen yang sama akan berada dalam blok-blok yang berdekatan. Kemudian, setiap _thread_ dapat dengan mudah menghitung jumlah elemen dalam satu blok tanpa ada konflik sama sekali. Meskipun _sorting_ adalah operasi yang mahal, untuk distribusi data tertentu, ini bisa lebih cepat daripada pendekatan atomik.
>     
> 
> #### Hierarki Kinerja Atomik
> 
> - **Global Atomics (DRAM)**: Paling lambat. Latensi ratusan siklus. Terkena dampak kontensi dari seluruh grid.
>     
> - **L2 Cache Atomics**: Sejak arsitektur Fermi, GPU memiliki L2 Cache yang dapat melayani operasi atomik. Ini lebih cepat daripada DRAM (sekitar 10x), tetapi L2 Cache ini dibagi oleh semua SM, jadi kontensi antar-block masih bisa terjadi.
>     
> - **Shared Memory Atomics**: Paling cepat. Latensi sangat rendah (sebanding register). Kontensi hanya bisa terjadi dari _thread_ di dalam block yang sama. Ini adalah pilihan terbaik jika memungkinkan.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan bagaimana Anda akan mengimplementasikan histogram jika data input Anda adalah `float`. Masalah apa yang muncul? (Petunjuk: Bagaimana Anda memetakan nilai `float` yang kontinu ke _bin_ yang diskrit?).
>