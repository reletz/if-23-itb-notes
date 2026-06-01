---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Prinsip & Tantangan Data Management
> 
> > ## Questions/Cues
> > 
> > - Apa **prinsip inti #1**? (Value)
> >     
> > - Mengapa properti data itu unik?
> >     
> > - Apa **prinsip inti #2**? (Business Reqs)
> >     
> > - Apa itu **Metadata**?
> >     
> > - Mengapa DM harus mendorong keputusan IT?
> >     
> > - Apa **prinsip inti #3**? (Skills)
> >     
> > - Mengapa DM butuh perspektif _enterprise_?
> >     
> > - Apa **prinsip inti #4**? (Lifecycle)
> >     
> > - Apa itu **Data Lifecycle**?
> >     
> > - Apa **prinsip inti #5**? (Leadership)
> >     
> > 
> > ## Reference Points
> > 
> > - Slides "14 - Data Management.pdf" (Slide 9-15)
> >     
> > - DAMA DMBOK, Chapter 1
> >     
> 
> > ### Prinsip & Tantangan Data Management
> > 
> > Data management harus menyeimbangkan kebutuhan strategis dan operasional. Ini didasarkan pada beberapa prinsip kunci.
> > 
> > ### 1. Data itu Berharga (Data is Valuable)
> > 
> > - **Prinsip**: Data adalah aset dengan properti unik. Nilainya bisa dan harus dinyatakan dalam istilah ekonomi.
> >     
> > - **Tantangan**:
> >     
> >     - **Properti Unik**: Data tidak seperti aset fisik. Data bisa disalin tanpa batas, tidak habis dipakai, dan nilainya _kontekstual_ (data yang sama bisa sangat berharga bagi tim marketing, tapi tidak berharga bagi tim HR).
> >         
> >     - **Valuasi**: Sulit memberi nilai moneter pasti pada data, karena nilainya seringkali _temporal_ (bergantung waktu). Ini menyulitkan pengukuran kontribusi data terhadap kesuksesan.
> >         
> > 
> > ### 2. Kebutuhan DM adalah Kebutuhan Bisnis
> > 
> > - **Prinsip**: Kebutuhan Data Management (DM) berasal dari kebutuhan bisnis.
> >     
> > - **Rincian**:
> >     
> >     1. **Mengelola Data = Mengelola Kualitas**: Untuk memastikan data memenuhi kebutuhan bisnis, karakteristik _kualitas tinggi_ harus didefinisikan bersama _konsumen data_ (pengguna bisnis).
> >         
> >     2. **Butuh Metadata untuk Mengelola Data**: Untuk mengelola aset apapun, kita butuh data _tentang_ aset itu. Data _tentang_ data inilah yang disebut **Metadata**. _Tantangannya_: Metadata itu sendiri adalah data, dan juga perlu dikelola.
> >         
> >     3. **Butuh Perencanaan untuk Mengelola Data**: Nilai dari data tidak muncul secara kebetulan. Butuh perencanaan strategis.
> >         
> >     4. **Kebutuhan DM Harus Mendorong Keputusan IT**: Kebutuhan _data_ harus menjadi pendorong keputusan _teknologi_, bukan sebaliknya. _Tantangannya_: Godaan teknologi baru seringkali "membutakan" organisasi dari kebutuhan data yang sebenarnya.
> >         
> > 
> > ### 3. DM Bergantung pada Keterampilan Beragam
> > 
> > - **Prinsip**: DM adalah aktivitas lintas-fungsional, membutuhkan perspektif _enterprise_, dan harus memperhitungkan berbagai sudut pandang.
> >     
> > - **Rincian**:
> >     
> >     1. **Lintas-Fungsional**: DM butuh kolaborasi antara orang bisnis, orang IT, analis, legal, dll. _Tantangannya_: Membuat orang dengan bahasa dan skill berbeda ini bekerja sama menuju tujuan yang sama.
> >         
> >     2. **Perspektif Enterprise**: Data harus dilihat sebagai aset _seluruh perusahaan_, bukan milik satu departemen.
> >         
> > 
> > ### 4. DM adalah Manajemen Siklus Hidup (Lifecycle)
> > 
> > - **Prinsip**: Jenis data yang berbeda memiliki siklus hidup yang berbeda. Mengelola data juga berarti mengelola _risiko_ terkait data.
> >     
> > - Data Lifecycle: Data memiliki siklus hidup dari:
> >     
> >     Plan -> Design -> Create/Obtain -> Store -> Use -> Enhance -> Dispose of (Hapus).
> >     
> > - **Tantangan**:
> >     
> >     - Satu kebijakan tidak cocok untuk semua. Data transaksi mungkin perlu disimpan 7 tahun (hukum), sementara data log server mungkin cukup 30 hari.
> >         
> >     - Risiko (data hilang, dicuri, disalahgunakan) harus dikelola di _setiap_ tahap siklus hidup.
> >         
> > 
> > ### 5. DM Efektif Butuh Komitmen Pimpinan
> > 
> > - **Prinsip**: DM adalah proses yang kompleks dan membutuhkan koordinasi, kolaborasi, dan komitmen.
> >     
> > - **Tantangan**: Tanpa _visi_ dan _tujuan_ yang jelas dari pimpinan (level C/Direksi), inisiatif data management seringkali gagal karena terbentur politik departemen atau kekurangan sumber daya.
> >     

> [!cornell] #### Summary
> 
> **Prinsip Data Management (DM) yang sukses didasarkan pada 5 pilar: 1) Memperlakukan **data sebagai aset berharga** yang nilainya harus diukur; 2) Menyadari bahwa **kebutuhan DM adalah kebutuhan bisnis** (memerlukan Metadata & Kualitas); 3) DM adalah **lintas-fungsional** yang butuh beragam skill dan perspektif** _**enterprise**_**; 4) DM adalah **manajemen siklus hidup** data (dari dibuat hingga dihapus) dan risikonya; 5) Semua ini tidak mungkin berhasil tanpa **komitmen dan visi dari Pimpinan**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Metadata, Jantungnya Data Management
> 
> Metadata adalah "data tentang data". Ada tiga jenis utama:
> 
> 1. **Business Metadata**: Memberi konteks bisnis.
>     
>     - Contoh: Definisi ("Apa itu 'Pelanggan Aktif'?"), Aturan Bisnis ("Batas kredit tidak boleh > Rp 10 Juta"), Pemilik Data ("Data Steward: Tim Marketing").
>         
> 2. **Technical Metadata**: Menjelaskan bagaimana data disimpan dan diproses.
>     
>     - Contoh: Nama tabel, nama kolom, tipe data (`VARCHAR(255)`), _constraint_ (`NOT NULL`), skema _database_, _script_ ETL.
>         
> 3. **Operational Metadata**: Data tentang kapan dan bagaimana data digunakan.
>     
>     - Contoh: Kapan data terakhir di-_refresh_, siapa yang mengakses data, jumlah baris yang dimuat, log _error_.
>         
> 
> Tanpa metadata, data hanyalah angka dan teks yang tidak berarti. Metadata adalah kamus dan peta untuk aset data Anda.
> 
> #### Pendalaman Teknis: Data Lifecycle vs. System Development Lifecycle (SDLC)
> 
> - **SDLC (Software Development Lifecycle)**: Fokus pada _aplikasi/sistem_. Berakhir saat sistem di-_deploy_ atau di-_retire_. (Misal: Waterfall, Agile).
>     
> - **Data Lifecycle**: Fokus pada _datanya sendiri_. Siklus hidup data _jauh lebih panjang_ daripada siklus hidup aplikasi yang membuatnya.
>     
> 
> Sebuah aplikasi (SDLC) mungkin dibuat, dipakai 5 tahun, lalu diganti. Tapi _data_ yang dihasilkannya (misal: data transaksi pelanggan) harus _dipindahkan_ (migrasi) ke sistem baru dan terus dikelola, mungkin hingga puluhan tahun. Inilah mengapa "Kebutuhan DM harus mendorong keputusan IT".
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: DAMA DMBOK: Data Management Body of Knowledge, 2nd Edition, Chapter 1.
>     
> - **Konsep**: "Data Lifecycle Management (DLM)", "Metadata Management".
>