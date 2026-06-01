---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Domain Proteksi & Switching
> > - UNIX setuid & Android App ID
> > - Model Matriks Akses
> > - Implementasi: Access Control List (ACL)
> > - Implementasi: Capability List
> > - Pencabutan Hak Akses
> > - DAC vs. MAC
> > - Role-Based Access Control (RBAC)
> > - Implementasi Modern: Sandboxing & Code Signing
>
> > ### Domains of Protection (Domain Proteksi)
> > Sebuah **domain** mendefinisikan seperangkat sumber daya (_objek_) yang dapat diakses oleh sebuah proses dan operasi apa saja yang diizinkan. Pada dasarnya, domain adalah kumpulan hak akses `<objek, {hak-hak}>`.
> > - **Domain Switching:** Proses dapat berpindah dari satu domain ke domain lain. Ini adalah mekanisme untuk menerapkan _Principle of Least Privilege_ secara dinamis.
> > - **Contoh Implementasi Domain:**
> > 	- **UNIX `setuid` bit:** Sebuah file program yang memiliki bit `setuid` akan berjalan dengan hak akses **pemilik file** (seringkali _root_), bukan pengguna yang menjalankannya. Ini adalah bentuk _domain switching_ sementara untuk melakukan tugas yang memerlukan hak istimewa (misalnya, mengubah password). Ini sangat kuat namun juga berisiko jika programnya memiliki celah keamanan.
> > 	- **Android Application ID:** Setiap aplikasi Android diinstal dengan User ID (UID) yang unik. Secara default, aplikasi ini berjalan di domainnya sendiri, dan datanya terisolasi dari aplikasi lain. Ini adalah contoh kompartementalisasi yang kuat.
> >
> > ### Access Matrix (Matriks Akses)
> > Sebuah model abstrak untuk merepresentasikan aturan proteksi dalam sebuah sistem.
> > **Struktur**
> > - Bayangkan sebuah tabel di mana **baris** merepresentasikan **Domain** dan **kolom** merepresentasikan **Objek** (file, perangkat, dll.).
> > - Sel `access[i, j]` berisi daftar operasi yang diizinkan untuk Domain `i` pada Objek `j`.
> > - ![[Pasted image 20250610112115.png]]
> > 
> > **Implementasi Praktis dari Matriks Akses**
> >  Menyimpan matriks akses secara utuh sangat tidak efisien karena sebagian besar sel akan kosong (_sparse matrix_). Oleh karena itu, digunakan dua pendekatan utama:
> >  - **Access Control Lists (ACLs):**
> > 	 - Disimpan **bersama objeknya**. Setiap file atau objek memiliki daftar yang berisi `<domain, {hak-hak}>`.
> > 	 - **Analogi:** Sebuah daftar tamu (_guest list_) yang ditempel di pintu sebuah ruangan VIP. Staf keamanan memeriksa daftar ini untuk memutuskan siapa yang boleh masuk.
> > 	 - **Kelebihan:** Mudah untuk melihat siapa saja yang bisa mengakses suatu objek. Mudah untuk mencabut hak akses (tinggal hapus nama dari daftar)
> >  - **Capability Lists:**
> > 	 - Disimpan **bersama domainnya (proses)**. Setiap proses memiliki daftar "tiket" atau _capabilities_ yang dimilikinya. Sebuah _capability_ adalah token yang tidak dapat dipalsukan yang menunjuk ke sebuah objek dan hak akses yang diizinkan.
> > 	 - **Analogi:** Sebuah tiket konser atau gelang VIP. Pengguna menunjukkannya untuk mendapatkan akses. Kepemilikan tiket itu sendiri sudah menjadi bukti hak akses.
> > 	 - **Kelebihan:** Verifikasi akses sangat cepat.
> > 	 - **Kelemahan:** Sulit untuk mencabut hak akses (bagaimana cara Anda menemukan dan mengambil kembali semua tiket yang sudah Anda bagikan?).
> > 
> > ### Model Kontrol Akses Lanjutan
> > - **DAC (Discretionary Access Control):** Kontrol akses yang "leluasa". Pemilik sebuah objek dapat menentukan siapa saja yang boleh mengakses objek tersebut. Standar izin file di UNIX dan Windows adalah contoh DAC.
> > - **MAC (Mandatory Access Control):** Kontrol akses yang "wajib" atau "mandatoris". Sistem operasi memberlakukan kebijakan keamanan global yang tidak dapat diubah bahkan oleh pemilik objek atau _root_.
> > 	- **Analogi:** DAC adalah Anda yang memutuskan siapa boleh masuk ke rumah Anda. MAC adalah aturan karantina wilayah dari pemerintah yang berlaku untuk semua orang, termasuk di rumah Anda sendiri.
> > 	- Contoh paling terkenal adalah **SELinux** di Linux.
> > - **Role-Based Access Control (RBAC):** Hak akses tidak diberikan ke pengguna individu, melainkan ke **peran** (misalnya, "administrator", "editor", "auditor"). Pengguna kemudian dimasukkan ke dalam peran-peran tersebut. Ini sangat menyederhanakan manajemen hak akses di organisasi besar.
> > 
> > ### Mekanisme Proteksi Modern Lainnya
> >  **Sandboxing**
> >  Menjalankan sebuah proses dalam lingkungan yang sangat terbatas dan terisolasi. _Sandbox_ membatasi sumber daya (file, jaringan, proses lain) yang dapat diakses oleh program. Browser web modern adalah contoh _sandbox_ yang paling umum; kode dari situs web dijalankan di dalamnya agar tidak bisa mengakses file di komputer Anda.
> >  
> > **Code Signing:** Menggunakan tanda tangan digital untuk memverifikasi bahwa sebuah program berasal dari pengembang yang sah dan belum diubah sejak ditandatangani. Sistem operasi seperti macOS dan Windows semakin ketat memberlakukan ini, menolak menjalankan kode yang tidak ditandatangani.

> [!cornell] #### Summary
> Model proteksi formal direpresentasikan oleh Matriks Akses, yang mendefinisikan hak akses Domain terhadap Objek. Model ini diimplementasikan secara praktis melalui Access Control Lists (ACL) yang melekat pada objek dan Capability Lists yang dimiliki oleh domain. Sistem modern memperluas ini dengan kontrol yang lebih ketat seperti Role-Based (RBAC) dan Mandatory Access Control (MAC), serta menerapkan teknik kompartementalisasi canggih seperti Sandboxing dan verifikasi integritas melalui Code Signing untuk menegakkan prinsip _least privilege_ secara komprehensif.

> [!ad-libitum]- Additional Information (Optional)