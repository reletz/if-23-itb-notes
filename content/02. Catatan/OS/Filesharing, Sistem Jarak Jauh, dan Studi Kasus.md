---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Kontrol Akses Berkas Lokal
> > - Model Berbagi Berkas Jarak Jauh
> > - Apa itu Semantik Konsistensi?
> > - Studi Kasus: NFS
> > - Studi Kasus: WAFL
> > - Studi Kasus: APFS
>
> > 
> > ### Kontrol Akses pada Berbagi Berkas Lokal
> > Pada sistem multi-pengguna, OS harus dapat mengontrol siapa yang boleh mengakses berkas apa dan dengan cara apa (baca, tulis, eksekusi, dll.). Dua model utama:
> > 1. **Access-Control List (ACL):** Setiap berkas memiliki daftar (list) eksplisit yang berisi pasangan (pengguna/grup, izin).
> > 	- **Kelebihan:** Sangat fleksibel dan granular. Anda bisa memberikan izin spesifik ke pengguna `A`, izin lain ke pengguna `B`, dan izin berbeda lagi untuk grup `C`.
> > 	- **Kekurangan:** Bisa menjadi sangat panjang dan rumit untuk dikelola. Contoh utama: Windows.
> > 2. **Condensed ACL (Model UNIX):** Model yang lebih sederhana. Setiap berkas memiliki tiga set izin `rwx` (read, write, execute) untuk tiga kategori:
> > 	- **Owner:** Pemilik berkas.
> > 	- **Group:** Grup pengguna yang terkait dengan berkas.
> > 	- **Other/Public:** Semua pengguna lain di sistem.
> > 	- **Kelebihan:** Sederhana, efisien, dan mudah dipahami
> > 	- **Kekurangan:** Kurang fleksibel dibandingkan ACL penuh.
> > 
> >   ###  Berbagi Berkas Jarak Jauh (Remote File Sharing)
> >   Menggunakan jaringan untuk mengakses berkas yang berada di mesin lain.
> >   - Model Klien-Server:** Arsitektur yang paling umum.
> > 	  - **Server:** Mesin yang memiliki data fisik dan "mengekspor" (menyatakan tersedia) direktorinya ke jaringan.
> > 	  - **Client:** Mesin yang "memasang" (_mount_) direktori yang diekspor tersebut ke dalam struktur direktori lokalnya. Setelah di-_mount_, berkas jarak jauh tersebut terlihat dan terasa seperti berkas lokal bagi pengguna di klien.
> >  - **Mode Kegagalan:** Sistem jarak jauh memiliki lebih banyak titik kegagalan (jaringan putus, server _crash_). Protokol harus mendefinisikan semantik kegagalan: apakah klien menunggu tanpa batas, atau langsung gagal?
> >  - **Stateless vs. Stateful:**
> > 	 - **Stateless (Tanpa Status):** Server tidak menyimpan informasi tentang klien di antara permintaan (misal: NFSv3). Setiap permintaan harus berisi semua informasi yang diperlukan. Jika server _crash_, ia bisa langsung kembali online tanpa perlu memulihkan status klien.
> > 	 - **Stateful (Berstatus):** Server melacak status klien (misalnya, berkas apa yang sedang dibuka). Ini memungkinkan fitur canggih seperti penguncian berkas jaringan, tetapi pemulihan dari _crash_ server menjadi lebih rumit.
> > 
> >  ### Semantik Konsistensi (Consistency Semantics)
> >  - Menentukan **kapan** modifikasi pada sebuah berkas yang dilakukan oleh satu pengguna akan terlihat oleh pengguna lain yang mengakses berkas yang sama.
> >  - **UNIX Semantics:** Sangat ketat. Setiap operasi `write` langsung terlihat oleh proses lain yang telah membuka berkas tersebut. Memberikan ilusi satu citra berkas tunggal.
> >  - **Session Semantics (AFS):** Lebih longgar. Perubahan yang dilakukan pada berkas yang terbuka tidak terlihat oleh pengguna lain. Perubahan baru akan terlihat setelah berkas ditutup, dan hanya untuk sesi yang dibuka **setelahnya**. Baik untuk kinerja di jaringan yang lambat karena memungkinkan _caching_ yang agresif.
> >  - **Immutable-Shared-Files Semantics:** Paling sederhana. Berkas yang sudah dibagikan tidak dapat diubah sama sekali (bersifat _read-only_). Ini menghilangkan semua masalah konsistensi.
> >
> > ### Studi Kasus
> > **NFS (Network File System):**
> > - **Tujuan:** Menyediakan akses berkas jarak jauh yang transparan dalam lingkungan heterogen (berbagai OS dan mesin).
> > - **Mekanisme:** Menggunakan protokol **Mount** untuk koneksi awal dan **RPC (Remote Procedure Calls)** untuk operasi berkas seperti baca dan tulis.
> > - **Karakteristik Kunci (v3):** Desain **stateless**-nya membuatnya sangat tangguh terhadap kegagalan server, tetapi mengorbankan beberapa kinerja (karena server harus menulis data ke disk sebelum membalas) dan fungsionalitas (kontrol konkurensi/penguncian yang rumit).
> > 
> > **WAFL (Write-Anywhere File Layout):**
> > - **Konsep Inti:** Sebuah sistem berkas **Copy-on-Write (CoW)** yang dioptimalkan untuk server berkas jaringan. WAFL **tidak pernah menimpa blok data**.
> > - **Fitur Unggulan:** Desain CoW ini secara alami memungkinkan:
> > 	- **Snapshots:** Membuat "foto" instan dari sistem berkas pada suatu waktu. Proses ini sangat cepat dan efisien ruang karena tidak menyalin data, hanya mempertahankan penunjuk ke blok lama.
> > 	- **Clones:** Versi _snapshot_ yang dapat ditulisi (_writable_).
> > 	- **Replikasi:** Mengirim pembaruan ke sistem cadangan dengan hanya mengirimkan blok-blok yang berubah di antara dua _snapshot_.
> >
> > **APFS (Apple File System):**
> > - **Tujuan:** Sistem berkas modern dan terpadu untuk semua perangkat Apple (dari watchOS hingga macOS).
> > - **Fitur Unggulan:**
> > 	- **Space Sharing:** Beberapa volume logis (misalnya, 'macOS' dan 'Data') berada dalam satu "Container" dan berbagi kumpulan ruang kosong yang sama secara dinamis. Tidak ada lagi partisi berukuran tetap.
> > 	- **Copy-on-Write:** Seperti WAFL, ini menjadi dasar untuk fitur seperti _snapshots_ dan _clones_ yang efisien.
> > 	- **Enkripsi Kuat:** Enkripsi adalah fitur kelas satu, terintegrasi secara native.
> > 	- **Atomic Safe-Save:** Operasi seperti mengganti nama (rename) dijamin bersifat atomik, mencegah keadaan tidak konsisten jika terjadi _crash_.

> [!cornell] #### Summary
> Berbagi berkas diatur melalui model kontrol akses—baik granular (ACL) maupun sederhana (UNIX)—dan diperluas ke jaringan melalui arsitektur klien-server seperti NFS, yang menimbulkan tantangan baru dalam mode kegagalan dan semantik konsistensi. Studi kasus sistem berkas modern menyoroti inovasi kunci: NFS untuk interoperabilitas jarak jauh, WAFL dengan desain copy-on-write yang revolusioner untuk snapshot dan kloning, serta APFS sebagai sistem berkas terpadu yang dioptimalkan untuk berbagai perangkat Apple dengan fitur canggih seperti space sharing dan enkripsi kuat.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
>  **NFSv3 (Stateless) vs. NFSv4 (Stateful): Sebuah Pergeseran Paradigma:** 
>  - **Stateless (NFSv3):** Untuk menjaga ketangguhan server, setiap permintaan RPC dari klien harus independen dan berisi semua informasi (misalnya, _file handle_, _offset_, _count_).
> 	 - **Idempotensi:** Operasi harus _idempotent_ (melakukannya N kali sama hasilnya dengan melakukannya 1 kali). `read` dan `write` bersifat idempotent. Operasi seperti `append` (tambah di akhir) tidak, karena jika klien mengirim ulang permintaan karena _timeout_, data yang sama akan ditambahkan dua kali. Inilah sebabnya protokol NFS dasar tidak memiliki operasi `append`.
> 	 - **Kinerja Cache:** Server harus melakukan _synchronous write_ (menulis ke disk sebelum membalas) untuk menjamin data tersimpan jika terjadi _crash_. Ini membatasi efektivitas _caching_ di sisi server.
>  - **Stateful (NFSv4):** Mengubah segalanya dengan membuat server melacak status klien.
>  - **File Locking:** Penguncian berkas menjadi bagian integral dari protokol, mengatasi kelemahan terbesar NFSv3.
>  - **Compound RPCs:** Menggabungkan beberapa operasi menjadi satu permintaan jaringan, mengurangi latensi.
>  - **Delegations:** Fitur paling signifikan. Server dapat "mendelegasikan" sebuah berkas ke klien, memberinya hak istimewa untuk mengelola _cache_ dan kunci secara lokal. Klien dapat melakukan banyak operasi baca/tulis secara lokal tanpa perlu berkomunikasi dengan server, meningkatkan kinerja secara dramatis. Delegasi akan dicabut jika klien lain meminta akses ke berkas yang sama.
> 
> **Mekanisme di Balik Efisiensi Snapshot WAFL/ZFS:**
> - Keajaiban _snapshot_ terletak pada arsitektur Copy-on-Write (CoW).
> - **Tanpa Salinan Data:** Saat _snapshot_ dibuat, sistem **tidak menyalin data apa pun**. Ia hanya membuat salinan dari blok akar (root block) sistem berkas dan menjadikannya permanen (read-only). _Snapshot_ pada dasarnya hanyalah sebuah penunjuk ke "keadaan" sistem berkas pada waktu tertentu.
> - **Penggunaan Ruang:** Sebuah _snapshot_ pada awalnya tidak memakan ruang ekstra. Ruang baru mulai digunakan ketika data **diubah atau dihapus** _setelah_ snapshot dibuat. Blok-blok lama yang merupakan bagian dari _snapshot_ tidak dikembalikan ke daftar ruang kosong, melainkan dipertahankan. Jadi, ruang yang digunakan oleh _snapshot_ hanyalah sebesar "delta" atau perubahan yang terjadi sejak ia dibuat. Ini sangat kontras dengan _backup_ tradisional yang harus menyalin seluruh berkas.
> - **Clone:** Sebuah _clone_ hanyalah _snapshot_ yang diizinkan untuk ditulisi. Saat Anda menulis ke _clone_, mekanisme CoW yang sama berlaku: blok yang diubah akan ditulis ke lokasi baru, meninggalkan blok asli dari _snapshot_ tidak tersentuh.
> 
> **Detail Implementasi APFS Space Sharing (Container):**
> - **Model Lama (HFS+):** Partisi bersifat kaku. Jika Anda membagi disk 1TB menjadi 500GB untuk OS dan 500GB untuk Data, ruang kosong di partisi OS tidak dapat digunakan oleh partisi Data, dan sebaliknya. Ini tidak efisien.
> - **Model Baru (APFS Container):**
> 	1. APFS memformat seluruh perangkat fisik sebagai satu **Container**. Container ini mengelola semua ruang yang tersedia.
> 	2. Di dalam Container, Anda membuat beberapa **Volume** logis (misalnya, `Macintosh HD - Data`, `Preboot`, `Recovery`).
> 	3. Semua Volume ini berbagi **satu kolam ruang kosong yang sama**. Jika Volume `Macintosh HD - Data` hanya menggunakan 50GB dari total 1TB, sisa ~950GB tersedia untuk Volume lain secara dinamis.
> 	4. Sistem berkas melaporkan ukuran total disk sebagai kapasitas setiap Volume, dan melaporkan ruang kosong yang sama (ruang kosong total di Container) untuk semuanya. Ini memberikan fleksibilitas maksimum dan efisiensi penggunaan ruang yang jauh lebih tinggi.
>
>#### Sumber & Referensi Lanjutan:
>
> - **RFC (Request for Comments):** Spesifikasi teknis untuk protokol NFS dapat ditemukan di situs IETF. Cari **RFC 7530** untuk NFSv4. Ini adalah bacaan yang sangat teknis tetapi definitif.
> - **Apple Developer Documentation:** Apple menyediakan dokumentasi mendalam tentang APFS, menjelaskan fitur-fitur seperti _space sharing_, _snapshots_, dan enkripsi dari sudut pandang pengembang.
> - **Blog NetApp:** NetApp, pencipta WAFL, sering kali memiliki postingan blog teknis yang menjelaskan desain dan manfaat sistem berkas mereka.
>
>#### Eksplorasi Mandiri:
>
> - **Periksa Volume APFS:** Di macOS, buka aplikasi **Disk Utility**. Pilih drive fisik Anda. Anda akan melihat skema **APFS Container** dengan beberapa Volume di dalamnya (beberapa mungkin tersembunyi). Perhatikan bagaimana mereka semua berbagi kapasitas disk yang sama.
> - **Buat Snapshot APFS:** Gunakan **Time Machine** di macOS. Time Machine modern menggunakan _snapshot_ APFS untuk membuat _backup_ lokal yang sangat cepat dan efisien ruang. Anda dapat melihat daftar _snapshot_ lokal melalui baris perintah: `tmutil listlocalsnapshots /`.