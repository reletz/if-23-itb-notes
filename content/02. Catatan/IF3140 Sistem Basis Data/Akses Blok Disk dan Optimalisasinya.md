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
> > - Apa itu blok dan mengapa penting?
> >     
> > - Bagaimana cara kerja buffer manager?
> >     
> > - Apa itu fragmentasi file?
> >     
> > - Apa saja teknik optimasi akses disk?
> >     
> 
> > ### Konsep Akses Blok Disk
> > 
> > Database file dipartisi menjadi unit-unit penyimpanan berukuran tetap yang disebut **blok**. Blok adalah unit fundamental untuk alokasi penyimpanan sekaligus unit transfer data antara disk dan memori utama. Karena akses ke disk ribuan kali lebih lambat daripada akses ke memori, tujuan utama sistem basis data adalah **meminimalkan jumlah transfer blok** ini.
> >
> > ### Optimalisasi 1: Buffering
> > 
> > Teknik optimasi yang paling krusial adalah **buffering**. Sistem mengalokasikan sebagian dari memori utama sebagai **buffer** untuk menyimpan salinan blok-blok dari disk. **Buffer Manager** adalah subsistem yang mengelolanya. Ketika sebuah program membutuhkan blok, Buffer Manager akan memeriksa apakah blok tersebut sudah ada di buffer. Jika ya (_buffer hit_), alamatnya di memori langsung diberikan. Jika tidak (_buffer miss_), Buffer Manager akan mencari ruang kosong, membaca blok dari disk ke buffer, lalu memberikan alamatnya.
> >
> > ### Optimalisasi 2: Organisasi File
> > 
> > **Organisasi file** bertujuan untuk menyusun blok-blok di disk agar sesuai dengan pola akses data. Contohnya adalah menyimpan informasi yang saling terkait di silinder yang sama atau berdekatan untuk mengurangi pergerakan lengan disk. Seiring waktu, file bisa mengalami **fragmentasi**, di mana blok-bloknya tersebar di lokasi yang berjauhan di disk. Akses sekuensial pada file yang terfragmentasi menjadi lambat karena meningkatkan pergerakan lengan disk.
> >
> > ### Teknik Optimalisasi Lainnya
> > 
> > Selain buffering dan organisasi file, ada beberapa teknik lain untuk optimasi akses disk:
> > 
> > - **Disk-arm scheduling:** Mengatur urutan antrian akses ke track untuk meminimalkan pergerakan lengan disk.
> >     
> > - **Nonvolatile write buffers:** Menggunakan RAM yang memiliki baterai (NV-RAM) untuk mempercepat operasi tulis, karena sistem bisa langsung lanjut tanpa menunggu data benar-benar tertulis ke disk.
> >     
> > - **Log disk:** Menggunakan satu disk khusus untuk menulis log update secara sekuensial, yang sangat cepat karena tidak memerlukan _seek_.
> >     

> [!cornell] #### Summary
> 
> Transfer data antara disk dan memori terjadi dalam unit **blok**, dan tujuan utama optimasi adalah **meminimalkan jumlah transfer blok** ini. Strategi utama untuk mencapai ini adalah **buffering**, di mana **Buffer Manager** menyimpan blok yang sering diakses di dalam memori utama. Selain itu, **organisasi file** yang baik dapat mengurangi pergerakan lengan disk dengan menempatkan data terkait secara berdekatan dan menghindari **fragmentasi**. Teknik lain seperti _disk scheduling_ dan _write buffer_ juga turut membantu meningkatkan efisiensi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Kebijakan Penggantian Buffer (Buffer Replacement Policy)
> 
> Ketika buffer penuh dan Buffer Manager perlu memasukkan blok baru, ia harus memutuskan blok mana yang akan "dikorbankan" atau diganti. Kebijakan untuk memilih blok ini sangat penting. Salah satu yang paling umum adalah **LRU (Least Recently Used)**, di mana blok yang paling lama tidak diakses akan diganti. Ada juga varian lain seperti MRU (Most Recently Used) atau LFU (Least Frequently Used), masing-masing dengan kelebihan dan kekurangan tergantung pada pola akses data.
> 
> #### Read-Ahead
> 
> Saat sistem mendeteksi adanya akses sekuensial (misalnya, aplikasi sedang membaca file dari awal hingga akhir), Buffer Manager dapat secara proaktif melakukan **read-ahead**. Artinya, ia akan membaca beberapa blok berikutnya ke dalam buffer sebelum blok tersebut benar-benar diminta oleh aplikasi. Ini secara efektif menghilangkan waktu tunggu (_latency_) untuk permintaan-permintaan berikutnya, karena datanya sudah siap di memori.