---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Basis Data, Data, dan Informasi?
> > - Apa saja jenis-jenis data?
> > - Apa fungsi Metadata?
> > - Apa kelemahan utama dari _File Processing System_?
> > - Apa itu DBMS dan perannya?
> > - Apa saja kelebihan utama Pendekatan Basis Data?
> > - Apa saja biaya dan risiko dari Pendekatan Basis Data?
> 
> > ### Konsep-Konsep Inti
> > 
> > - **Basis Data:** Ini bukan sekadar kumpulan data biasa. Sebuah **basis data** adalah koleksi data yang terstruktur secara logis dan terpusat, yang dirancang untuk dapat diakses, dikelola, dan diperbarui dengan efisien. Tujuannya adalah untuk melayani berbagai aplikasi dan pengguna secara konsisten, serta menjadi fondasi untuk pengambilan keputusan yang akurat.
> >     
> > - **Data:** Ini adalah representasi mentah dari fakta, angka, atau peristiwa di dunia nyata yang disimpan dalam sistem komputer. Data sendiri belum tentu memberikan wawasan. Contohnya adalah angka "100" atau nama "Budi". Data dapat diklasifikasikan menjadi:
> >     
> >     - _Structured Data (Data Terstruktur):_ Data yang formatnya sangat terorganisir dan kaku, biasanya dalam bentuk tabel dengan baris dan kolom yang jelas. Pikirkan seperti spreadsheet Excel, di mana setiap kolom memiliki nama (misal: 'NIM', 'Nama Mahasiswa') dan setiap baris adalah satu entri data yang lengkap.
> >     - _Unstructured Data (Data Tidak Terstruktur):_ Data yang tidak memiliki format atau model yang telah ditentukan sebelumnya. Ini adalah mayoritas data di dunia. Contohnya termasuk isi dari sebuah email, file dokumen Word, gambar, file video, dan rekaman audio.
> >     - _Semi-Structured Data (Data Semi-Terstruktur):_ Merupakan campuran dari keduanya. Data ini tidak berada dalam struktur tabel yang kaku, tetapi memiliki tag atau penanda untuk memisahkan elemen-elemen data. Contoh paling umum adalah file XML atau JSON, di mana ada "kunci" dan "nilai" yang memberikan struktur, tetapi isinya bisa sangat fleksibel.
> > - **Informasi:** Ini adalah hasil dari pengolahan, pengorganisasian, dan interpretasi data sehingga menjadi bermakna dan berguna. Jika data adalah bahan mentah, informasi adalah produk jadi. Contoh: Data mentah berupa daftar transaksi harian diolah menjadi informasi berupa "Total pendapatan hari ini adalah Rp 5.000.000,-".
> >     
> > - **Metadata:** Sering disebut sebagai "data tentang data". **Metadata** adalah informasi deskriptif yang menjelaskan konteks, struktur, dan aturan dari data lain. Contohnya: Metadata untuk kolom 'NIM' bisa jadi adalah "Tipe data: Teks, Panjang: 10 karakter, Wajib diisi, Tidak boleh duplikat". Metadata inilah yang membuat basis data bisa mengelola dirinya sendiri.
> >     
> > 
> > ### File Processing System (Pendekatan Lama)
> > 
> > Sebelum era basis data modern, data dikelola dalam file-file terpisah yang dimiliki oleh masing-masing program aplikasi. Pendekatan ini sangat tidak efisien dan menimbulkan banyak masalah, terutama karena:
> > 
> > - **Ketergantungan Data (_Data Dependency_):** Struktur file data dan program yang mengaksesnya saling terkait erat. Jika Anda mengubah format file (misalnya, menambah satu kolom), maka semua program yang membaca file tersebut harus ditulis ulang. Ini menyebabkan biaya perawatan yang sangat tinggi dan sistem yang rapuh.
> >     
> > - **Redundansi Data (_Data Redundancy_):** Karena setiap aplikasi memiliki file datanya sendiri, data yang sama sering kali disalin di banyak tempat. Misalnya, data alamat pelanggan mungkin ada di sistem penjualan, sistem penagihan, dan sistem pengiriman. Hal ini menyebabkan:
> >     
> >     - _Pemborosan Ruang:_ Penyimpanan yang sama digunakan berulang kali.
> >     - _Inkonsistensi Data:_ Jika pelanggan pindah alamat dan hanya satu file yang diperbarui, maka sistem lain akan memiliki data yang salah, yang dapat menyebabkan kesalahan fatal seperti pengiriman barang ke alamat lama.
> >     - _Integritas Tersembunyi:_ Aturan bisnis (misalnya, "usia karyawan tidak boleh di bawah 18 tahun") ditulis di dalam kode masing-masing program, bukan sebagai aturan terpusat. Akibatnya, sulit untuk memastikan aturan ini diterapkan secara konsisten di semua bagian sistem.
> > 
> > ### The Database Approach (Pendekatan Modern)
> > 
> > Pendekatan ini memperkenalkan sebuah "penjaga gerbang" atau perantara tunggal antara data dan aplikasi, yang disebut **Database Management System (DBMS)**.
> > 
> > - **DBMS:** Sebuah sistem perangkat lunak kompleks yang bertindak sebagai antarmuka utama ke basis data. Aplikasi tidak lagi mengakses file data secara langsung. Sebaliknya, mereka mengirim permintaan (misalnya, "ambil data mahasiswa bernama Budi") ke DBMS, dan DBMS-lah yang akan mengambil data tersebut dan memberikannya ke aplikasi.
> >     
> > - **Kelebihan Utama Pendekatan Basis Data:**
> >     
> >     - _Peningkatan Berbagi Data & Kontrol:_ Data menjadi sumber daya terpusat yang bisa dibagikan, dengan DBMS yang memastikan hanya pengguna berwenang yang bisa mengakses data tertentu.
> >     - _Penegakan Standar & Peningkatan Kualitas Data:_ Semua aturan (metadata dan integritas) didefinisikan sekali di dalam DBMS dan ditegakkan secara universal untuk semua aplikasi, sehingga kualitas dan konsistensi data terjamin.
> >     - _Aksesibilitas yang Lebih Baik:_ Dengan bahasa query standar seperti SQL, pengguna (bahkan yang non-teknis) dapat mengambil informasi kompleks tanpa perlu membuat program baru.
> >     - _Keamanan, Pencadangan, dan Konkurensi Terkelola:_ DBMS menyediakan mekanisme canggih untuk keamanan data, pemulihan dari kegagalan, dan pengelolaan akses data oleh banyak pengguna secara bersamaan tanpa menimbulkan konflik.
> > - **Biaya dan Risiko:**
> >     
> >     - _Biaya Awal (Up-front costs)_: Implementasi memerlukan biaya yang signifikan untuk lisensi perangkat lunak, perangkat keras yang kuat, dan proses migrasi data dari sistem lama.
> >     - _Biaya Berkelanjutan (Ongoing Costs)_: Membutuhkan administrator basis data (DBA) yang terampil untuk pemeliharaan, serta sumber daya untuk proses pencadangan dan pemulihan rutin.
> >     - _Konflik Organisasi:_ Perubahan ke sistem terpusat dapat menimbulkan penolakan dari departemen yang terbiasa memiliki kontrol penuh atas "data mereka sendiri".

> [!cornell] #### Summary
> Perkembangan dari _File Processing System_ ke _Database Approach_ adalah pergeseran fundamental dari pengelolaan data yang terisolasi dan rentan kesalahan menuju sistem yang terpusat, konsisten, dan terkontrol. Dengan menggunakan **DBMS** sebagai perantara, pendekatan modern mengatasi masalah ketergantungan dan redundansi data, sehingga menghasilkan data yang lebih berkualitas dan mudah diakses. Walaupun implementasinya memerlukan investasi dan keahlian yang lebih tinggi, manfaat dalam hal integritas, keamanan, dan efisiensi data jauh melampaui biayanya.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Skala Aplikasi Basis Data
> 
> Fleksibilitas pendekatan basis data membuatnya dapat diterapkan di berbagai skala untuk kebutuhan yang berbeda:
> 
> - **Personal:** Sederhana, seperti aplikasi untuk mengelola koleksi buku atau kontak pribadi.
> - **Workgroup:** Digunakan oleh tim kecil (misalnya, 5-10 orang) untuk berkolaborasi dalam proyek, dengan server basis data lokal.
> - **Enterprise:** Skala sangat besar yang menjadi tulang punggung operasi perusahaan. Contohnya adalah sistem basis data yang mengelola inventaris, penjualan, dan data pelanggan untuk _e-commerce_ besar seperti Tokopedia atau Amazon. Sistem ini menangani jutaan transaksi per hari.