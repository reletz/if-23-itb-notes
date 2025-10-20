---

type: Note

cssclasses:

- cornell-notes
    

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana cara menangani record berukuran tetap?
> >     
> > - Apa itu "free list"?
> >     
> > - Bagaimana cara menangani record berukuran variabel?
> >     
> > - Apa itu Slotted Page Structure?
>     
> >
> > ### Organisasi File: Record Berukuran Tetap
> > 
> > Untuk record berukuran tetap (_fixed-length_), pendekatan paling sederhana adalah menyimpan record ke-i mulai dari byte ke `n * i`, di mana `n` adalah ukuran setiap record. Namun, ini bisa menyebabkan record terpotong di antara blok. Modifikasi yang umum adalah tidak mengizinkan record melintasi batas blok.
> > 
> > Saat menghapus record, ada beberapa alternatif:
> > 
> > - **Menggeser Record:** Memindahkan semua record setelahnya untuk menutupi celah.
> >     
> > - **Menimpa Record:** Memindahkan record terakhir untuk mengisi posisi yang dihapus.
> >     
> > - **Menggunakan Free List:** Tidak memindahkan record sama sekali, tetapi menandai ruang kosong dan menghubungkannya dalam sebuah _linked list_ yang disebut **free list**. Header file akan menyimpan penunjuk ke record kosong pertama.
> >     
> >
> > ### Organisasi File: Record Berukuran Variabel
> > 
> > Record berukuran variabel (_variable-length_) muncul karena beberapa alasan, seperti penggunaan tipe data `varchar` atau adanya beberapa tipe record dalam satu file. Salah satu metode untuk menanganinya adalah dengan menyimpan atribut berukuran variabel di akhir record, dengan penunjuk (offset, length) di bagian depan. Nilai NULL sering kali direpresentasikan menggunakan **null bitmap**.
> >
> > ### Slotted Page Structure
> > 
> > **Slotted Page Structure** adalah metode yang sangat efisien untuk mengelola record berukuran variabel di dalam sebuah blok. Setiap blok memiliki **header** yang berisi:
> > 
> > - Jumlah entri record.
> >     
> > - Penunjuk ke akhir ruang kosong di dalam blok.
> >     
> > - Sebuah "direktori" entri yang masing-masing berisi lokasi dan ukuran dari setiap record.
> >     
> > Dengan struktur ini, record dapat dipindahkan di dalam blok (misalnya untuk menjaga agar tidak ada ruang kosong di tengah) tanpa merusak pointer dari luar, karena pointer eksternal akan menunjuk ke entri di header, bukan ke lokasi fisik record.
> >
> > ### Metode Organisasi File Lainnya
> > 
> > Selain penanganan record, ada beberapa metode organisasi file secara keseluruhan:
> > 
> > - **Heap File:** Record ditempatkan di mana saja ada ruang kosong, tanpa urutan tertentu. Efisien untuk memuat data dalam jumlah besar, tetapi lambat untuk pencarian selektif.
> >     
> > - **Sequential File:** Record diurutkan berdasarkan nilai dari sebuah _search key_. Sangat baik untuk pemrosesan sekuensial, tetapi sulit untuk menangani penyisipan data.
> >     
> > - **Multitable Clustering:** Menyimpan beberapa tabel yang saling terkait (misal, `department` dan `instructor`-nya) dalam satu file yang sama untuk meminimalkan I/O saat melakukan `JOIN`.
> >     

> [!cornell] #### Summary
> 
> Organisasi file membahas cara menyusun record di dalam blok. Untuk **record berukuran tetap**, penghapusan dapat ditangani dengan menggeser record atau menggunakan **free list**. Untuk **record berukuran variabel**, metode **Slotted Page Structure** menjadi solusi efisien dengan menggunakan header di setiap blok untuk mengelola lokasi record. Secara keseluruhan, file dapat diorganisir sebagai **Heap** (tidak terurut), **Sequential** (terurut), atau bahkan **Multitable Clustering** untuk menyimpan beberapa tabel terkait secara fisik berdekatan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Spanned vs. Unspanned
> 
> - **Unspanned:** Ini adalah pendekatan di mana satu record tidak boleh melintasi batas blok. Jika sebuah record tidak muat di sisa ruang blok saat ini, ia akan ditempatkan di blok berikutnya, dan sisa ruang di blok sebelumnya akan terbuang. Ini lebih sederhana untuk dikelola.
>     
> - **Spanned:** Dalam pendekatan ini, jika sebuah record tidak muat di sisa ruang blok, sebagian record akan disimpan di blok saat ini, dan sisanya akan disimpan di blok berikutnya. Ini lebih efisien dalam penggunaan ruang tetapi lebih kompleks untuk diimplementasikan karena memerlukan pointer untuk menghubungkan bagian-bagian record yang terpisah.
>     
> 
> #### Tombstone
> 
> Saat melakukan update pada record berukuran variabel yang membuatnya menjadi lebih besar, record tersebut mungkin tidak muat lagi di lokasi lamanya. Salah satu solusi adalah dengan memindahkannya ke lokasi baru dan meninggalkan "batu nisan" (_tombstone_) di lokasi lama. Tombstone ini hanyalah sebuah pointer yang menunjuk ke lokasi baru dari record tersebut. Ini memastikan pointer-pointer lain yang masih menunjuk ke lokasi lama tidak menjadi rusak. Namun, ini menambah satu level indireksi dan memerlukan pembersihan (reorganisasi) secara berkala.