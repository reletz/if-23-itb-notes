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
> > - Bagaimana sistem basis data dipartisi?
> >     
> > - Apa tiga komponen fungsional utama Database Engine?
> >     
> > - Apa peran dan tanggung jawab Storage Manager?
> >     
> > - Apa saja komponen dari Storage Manager?
> >     
> > - Struktur data apa yang dikelola Storage Manager?
> >     
> 
> > ### Partisi Fungsional Database Engine
> > ![[Pasted image 20250902114536.png]]
> > Sebuah sistem basis data modern dipartisi menjadi beberapa modul fungsional yang masing-masing memiliki tanggung jawab spesifik. Secara garis besar, komponen fungsional ini dapat dibagi menjadi tiga pilar utama yang membentuk **Database Engine**:
> > 
> > - **The Storage Manager**
> >     
> > - **The Query Processor Component**
> >     
> > - **The Transaction Management Component**
> >     
> >
> > ### Storage Manager: Jembatan ke Data Fisik
> > 
> > ![[Pasted image 20250902114659.png]]
> > **Storage Manager** adalah sebuah modul program yang menyediakan antarmuka (interface) antara data level rendah yang tersimpan di disk dengan program aplikasi dan query yang dikirimkan ke sistem. Tanggung jawab utamanya adalah memastikan interaksi dengan file manager sistem operasi berjalan lancar serta proses **penyimpanan, pengambilan, dan pembaruan data** berlangsung secara efisien.
> >
> > ### Komponen Internal Storage Manager
> > 
> > Untuk menjalankan tugasnya, Storage Manager terdiri dari beberapa sub-komponen penting:
> > 
> > - **Authorization and Integrity Manager:** Memeriksa apakah pengguna memiliki izin untuk mengakses data dan memastikan data yang masuk memenuhi semua aturan integritas yang ditentukan.
> >     
> > - **Transaction Manager:** Memastikan bahwa database tetap dalam keadaan konsisten meskipun terjadi kegagalan sistem dan mengelola transaksi yang berjalan bersamaan.
> >     
> > - **File Manager:** Mengelola alokasi ruang pada penyimpanan disk dan struktur data yang digunakan untuk merepresentasikan informasi yang tersimpan.
> >     
> > - **Buffer Manager:** Bertanggung jawab untuk mengambil data dari disk dan menyimpannya sementara di memori utama (RAM). Komponen ini juga yang memutuskan data apa yang akan disimpan di cache untuk akses yang lebih cepat.
> >     
> >
> > ### Struktur Data yang Dikelola
> > 
> > Storage Manager mengimplementasikan dan mengelola beberapa struktur data krusial sebagai bagian dari sistem fisik:
> > 
> > - **Data files:** Berkas-berkas yang menyimpan isi dari basis data itu sendiri.
> >     
> > - **Data dictionary:** Menyimpan **metadata**, yaitu "data tentang data". Ini mencakup informasi struktur basis data, terutama skema.
> >     
> > - **Indices:** Struktur data khusus (seperti B-tree) yang menyediakan "jalan pintas" untuk akses cepat ke item data. Sebuah indeks berisi penunjuk (pointers) ke item data yang memiliki nilai tertentu, mempercepat pencarian secara dramatis.
> >     

> [!cornell] #### Summary
> 
> **Database Engine** merupakan inti dari sistem basis data yang terpartisi menjadi tiga komponen utama: **Storage Manager, Query Processor, dan Transaction Management**. **Storage Manager** bertindak sebagai jembatan fundamental antara aplikasi dan data fisik di disk, yang bertanggung jawab atas efisiensi penyimpanan dan pengambilan data. Untuk melakukannya, ia terdiri dari sub-komponen untuk **otorisasi, transaksi, manajemen file, dan buffer**, serta mengelola tiga struktur data penting: **data files, data dictionary (metadata), dan indices** untuk akses cepat.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Analogi: Perpustakaan Modern
> 
> Pikirkan **Storage Manager** sebagai sistem manajemen perpustakaan yang canggih, bukan hanya seorang pustakawan.
> 
> - **File Manager** adalah denah dan sistem penomoran rak yang mengatur di mana setiap buku (data) berada.
>     
> - **Buffer Manager** adalah meja "Paling Sering Dipinjam" di dekat pintu masuk, menyimpan buku-buku populer (data yang sering diakses) agar tidak perlu jauh-jauh ke rak setiap kali ada yang mencari.
>     
> - **Data Dictionary** adalah katalog lengkap perpustakaan yang berisi judul, pengarang, genre, dan lokasi (metadata).
>     
> - **Indices** adalah kartu indeks di katalog tersebut, yang memungkinkan Anda mencari buku berdasarkan judul atau pengarang dengan cepat tanpa harus memeriksa setiap buku di rak.
>     
> - **Authorization Manager** adalah sistem kartu anggota yang memastikan hanya anggota terdaftar yang bisa meminjam.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Pentingnya Buffer/Cache:** Cari tahu mengapa memindahkan data dari disk ke memori (RAM) adalah salah satu optimasi paling penting dalam sistem basis data. Apa perbedaan kecepatan akses antara SSD dan RAM modern? Jawabannya akan menunjukkan mengapa **Buffer Manager** sangat krusial.
>