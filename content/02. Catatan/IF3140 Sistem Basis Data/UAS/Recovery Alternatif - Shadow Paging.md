---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell]  Metode Alternatif Recovery: Shadow Paging
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Shadow Paging**?
> >     
> > - Apa perbedaan **Current Page Table** vs **Shadow Page Table**?
> >     
> > - Mana yang disimpan di _nonvolatile_?
> >     
> > - Bagaimana proses **update data** di Shadow Paging?
> >     
> > - Apa itu **Copy-on-Write**?
> >     
> > - Bagaimana proses **Commit** transaksi?
> >     
> > - Bagaimana proses **Recovery** dari crash?
> >     
> > - Apa **Keuntungan (Advantages)** Shadow Paging?
> >     
> > - Apa **Kerugian (Disadvantages)** Shadow Paging?
> >     
> > - Mengapa **concurrency** sulit diimplementasikan?
> >     
> >
> > ## Reference Points
> > 
> > - Slides "12 - Recovery System - 2.pdf" (Slide 36-40)
> >     
> 
> > ### Apa itu Shadow Paging?
> > 
> > **Shadow Paging** adalah sebuah teknik recovery alternatif yang **tidak menggunakan log**. Ide utamanya adalah tidak pernah menimpa (_overwrite_) data yang konsisten di disk, melainkan menulis versi baru dari data di lokasi lain.
> > 
> > Teknik ini bergantung pada **Page Table** (seperti di OS) yang memetakan alamat _virtual_ database ke alamat _fisik_ di disk.
> > 
> > Shadow Paging memelihara **dua** page table selama transaksi berjalan:
> > 
> > 1. **Shadow Page Table**: Ini adalah salinan page table yang "valid" dan konsisten. Isinya menunjuk ke blok-blok data di disk dari _commit_ terakhir. Page table ini **tidak pernah dimodifikasi** dan disimpan di _nonvolatile storage_.
> >     
> > 2. **Current Page Table**: Ini adalah salinan dari _shadow page table_ yang digunakan oleh transaksi saat ini. Page table inilah yang **dimodifikasi** saat transaksi berjalan.
> >     
> > 
> > ### Proses Update Data (Copy-on-Write)
> > 
> > Saat sebuah transaksi `Ti` ingin menulis/mengubah _page_ (blok) `X` _untuk pertama kalinya_:
> > 
> > 1. Sistem **tidak** langsung mengubah _page_ `X` yang asli.
> >     
> > 2. Sistem menemukan _page_ kosong di disk, lalu **menyalin** (copy) isi _page_ `X` ke _page_ baru tersebut (ini disebut **Copy-on-Write**).
> >     
> > 3. **Current Page Table** diperbarui: _entry_ untuk _page_ `X` sekarang menunjuk ke _copy_ yang baru.
> >     
> > 4. _Shadow Page Table_ **tetap** tidak berubah (masih menunjuk ke _page_ `X` yang lama/asli).
> >     
> > 5. Transaksi melakukan operasi _write_ pada _copy_ yang baru tersebut.
> >     
> > 
> > (Lihat slide 38: Page 4 akan di-update. _Shadow_ tetap menunjuk ke page 4 lama, _Current_ menunjuk ke page 4 baru yang disalin di lokasi lain di disk).
> > 
> > ### Proses Commit Transaksi
> > 
> > Proses _commit_ adalah operasi "ajaib" yang membuat semua perubahan transaksi menjadi permanen secara atomik.
> > 
> > 6. Ada satu _pointer_ khusus di _nonvolatile storage_ yang selalu menunjuk ke _shadow page table_ yang aktif.
> >     
> > 7. Saat transaksi Ti ingin commit:
> >     
> >     a. Sistem menulis semua page yang dimodifikasi (yang ditunjuk current) ke disk.
> >     
> >     b. Sistem menulis current page table ke disk.
> >     
> >     c. Sistem secara atomik (satu operasi tak terpisahkan) memindahkan pointer khusus tadi agar menunjuk ke current page table.
> >     
> > 8. Pada titik ini, _current page table_ telah resmi menjadi _shadow page table_ yang baru. Transaksi telah _commit_. _Page_ lama yang ditunjuk oleh _shadow page table_ sebelumnya kini menjadi _garbage_ (sampah).
> >     
> > 
> > ### Proses Recovery dari Crash
> > 
> > Recovery di shadow paging sangat sederhana dan cepat:
> > 
> > - **Skenario Crash**: Sistem _crash_ di tengah transaksi (sebelum _pointer_ dipindah).
> >     
> > - **Proses Recovery**:
> >     
> >     1. Semua yang ada di _memory_ (termasuk _current page table_) hilang.
> >         
> >     2. Sistem _restart_ dan melihat _pointer_ khusus di disk.
> >         
> >     3. _Pointer_ tersebut **masih menunjuk** ke _shadow page table_ yang lama (karena _commit_ belum terjadi).
> >         
> >     4. Sistem menggunakan _shadow page table_ tersebut. Semua _copy_ page baru yang dibuat transaksi (namun tidak pernah di-commit) otomatis terabaikan.
> >         
> > - **Hasil**: Database kembali ke _state_ konsisten terakhir. **Tidak perlu UNDO atau REDO**.
> >     
> > 
> > ### Keuntungan dan Kerugian
> > 
> > **Keuntungan (Advantages):**
> > 
> > 1. **Tidak ada overhead** penulisan log.
> >     
> > 2. **Recovery trivial** dan sangat cepat (hampir instan), karena tidak perlu memindai log.
> >     
> > 
> > **Kerugian (Disadvantages):**
> > 
> > 1. **Commit Overhead Tinggi**: Saat _commit_, _semua_ _page_ yang diubah dan _page table_ itu sendiri harus di-flush ke disk.
> >     
> > 2. **Fragmentasi Data**: _Page_ yang secara logis berurutan (misal: page 4 dan 5) bisa jadi terletak berjauhan secara fisik di disk, memperlambat _scan_ data.
> >     
> > 3. **Garbage Collection**: Sistem memerlukan proses latar belakang untuk mengumpulkan _page-page_ lama yang sudah tidak terpakai (setelah _commit_).
> >     
> > 4. **Sulit untuk Concurrency**: Sangat sulit untuk mengizinkan banyak transaksi berjalan bersamaan. Jika Transaksi A dan B berjalan, lalu A _commit_, B akan "dipaksa" ikut _commit_ padahal belum selesai.
> >     

> [!cornell] #### Summary
> 
> **Shadow Paging adalah teknik recovery** _**non-log**_ **yang menjaga dua** _**page table**_**: Shadow (state konsisten terakhir di disk) dan Current (yang dimodifikasi transaksi). Perubahan data dilakukan dengan Copy-on-Write, di mana** _**page**_ **baru disalin dan** _**current table**_ **diubah untuk menunjuk ke salinan. Commit adalah operasi atomik memindahkan** _**pointer**_ **disk agar menunjuk ke** _**current table**_**, menjadikannya** _**shadow table**_ **baru. Recovery-nya instan (cukup gunakan** _**shadow table**_ **lama) sehingga tidak perlu `undo/redo`, namun teknik ini memiliki** _**commit overhead**_ **tinggi, menyebabkan fragmentasi, dan sangat sulit mendukung** _**concurrency**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Shadow Paging dan File System Modern
> 
> Meskipun Shadow Paging (dalam bentuk murninya) jarang digunakan di database relasional modern karena masalah _concurrency_ dan _fragmentasi_, ide intinya (yaitu **Copy-on-Write / CoW**) sangat sukses dan menjadi dasar dari banyak teknologi lain:
> 
> 1. **File Systems**: ZFS (Zettabyte File System) dan Btrfs (B-tree File System) menggunakan CoW secara ekstensif. Mereka tidak pernah menimpa data. Saat Anda mengubah file, mereka menulis blok baru di lokasi lain dan memperbarui metadata (setara _page table_) untuk menunjuk ke sana. Ini membuat fitur seperti _snapshot_ (yang pada dasarnya adalah "membekukan" _shadow page table_) menjadi sangat murah dan instan.
>     
> 2. **Virtual Machine (VM) Snapshots**: Saat Anda mengambil _snapshot_ dari VM, _hypervisor_ berhenti menulis ke disk virtual utama (file VDI/VMDK) dan mulai menulis semua perubahan ke _file disk diferensial_ baru. Disk utama bertindak sebagai _shadow_, dan disk diferensial bertindak sebagai _current_.
>     
> 3. **Git (Version Control)**: Meskipun tidak di level blok disk, Git bekerja dengan konsep serupa. _Commit_ adalah _snapshot_ (mirip _shadow_) yang tidak bisa diubah. Perubahan Anda terjadi di _working directory_ (mirip _current_).
>     
> 
> #### Pendalaman Teknis: Mengapa Concurrency Sangat Sulit?
> 
> Bayangkan Transaksi `T1` mengubah page A dan Transaksi `T2` mengubah page B, keduanya berjalan bersamaan.
> 
> 4. `T1` membuat `A_copy` dan `Current_Table` menunjuk ke `A_copy`.
>     
> 5. `T2` membuat `B_copy` dan `Current_Table` menunjuk ke `B_copy`.
>     
> 6. Sekarang, `T1` ingin `commit`.
>     
> 7. `T1` akan memaksa _pointer_ disk menunjuk ke `Current_Table`.
>     
> 8. Masalah: `Current_Table` ini **juga** berisi perubahan dari `T2` (yaitu pointer ke `B_copy`) yang padahal _belum_ selesai!
>     
> 9. `Commit` dari `T1` secara tidak sengaja ikut meng-`commit` perubahan `T2` yang belum selesai. Ini adalah pelanggaran berat **Isolation** (huruf 'I' dalam ACID).
>     
> 
> Log-based recovery jauh lebih unggul dalam menangani _concurrency_ karena setiap transaksi memiliki _record_-nya sendiri di log.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 19.8.
>     
> - **Konsep**: "Copy-on-Write (CoW)"
>