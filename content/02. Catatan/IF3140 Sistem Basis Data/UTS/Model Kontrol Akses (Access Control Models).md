---


type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic: Model Kontrol Akses (DAC, MAC, RBAC)
> 
> > ## Questions/Cues
> > 
> > - Apa itu Discretionary Access Control (DAC)?
> >     
> > - Bagaimana model Access Matrix bekerja?
> >     
> > - Apa itu Mandatory Access Control (MAC)?
> >     
> > - Jelaskan Bell-LaPadula Model (Simple & Star Property).
> >     
> > - Apa perbedaan utama DAC dan MAC?
> >     
> > - Apa itu Role-Based Access Control (RBAC)?
> >     
> > - Mengapa RBAC sering digunakan?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 13-25: Database Security.pdf
> >     
> 
> > ### Discretionary Access Control (DAC)
> > 
> > **Discretionary Access Control (DAC)** adalah model keamanan di mana pemilik sebuah objek (misalnya, tabel) memiliki keleluasaan (_discretion_) untuk memberikan atau mencabut hak akses (privileges) atas objek tersebut kepada subjek lain (pengguna).
> > 
> > - **Berbasis Privileges:** Kontrol akses ditegakkan melalui pemberian hak seperti `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, dan `DROP`.
> >     
> > - **Level Privileges:** Hak akses dapat diberikan pada dua level utama:
> >     
> >     1. **Account Level:** Hak istimewa yang berlaku untuk akun secara umum, seperti `CREATE TABLE` atau `CREATE VIEW`.
> >         
> >     2. **Relation Level:** Hak istimewa yang berlaku spesifik untuk tabel atau view tertentu, seperti izin `SELECT` hanya pada tabel `MAHASISWA`.
> >         
> > - **Access Matrix Model:** Konsep ini secara logis merepresentasikan DAC. Matriks ini memiliki baris untuk **subjek** (pengguna, program) dan kolom untuk **objek** (tabel, view). Sel `M(i, j)` berisi daftar hak akses yang dimiliki subjek `i` terhadap objek `j`. Contoh:
> > 	
> > |Subject / Object|Relasi Pegawai|Relasi Departemen|Relasi Lokasi|Relasi Jabatan|View PEGAWAI_DEVAN|View PEGAWAI_JABAR|View INFORMASI_SIP|
> > |---|---|---|---|---|---|---|---|
> > |**User Devan**|-|-|-|-|Read, Update (`SELECT`, `UPDATE`)|-|-|
> > |**User Jimmy**|-|-|-|-|-|Read, Insert, Update (`SELECT`, `INSERT`, `UPDATE`)|-|
> > |**User Karin**|Read (`SELECT`)|Read (`SELECT`)|Read (`SELECT`)|Read (`SELECT`)|-|-|Read (`SELECT`)|
> > |**Program SIP**|-|-|-|-|-|-|Read (`SELECT`)|
> > 
> > ### Mandatory Access Control (MAC)
> > 
> > **Mandatory Access Control (MAC)** adalah model keamanan yang lebih ketat di mana hak akses tidak ditentukan oleh pemilik data, melainkan oleh kebijakan (_policy_) keamanan yang berlaku di seluruh sistem. Model ini biasa digunakan di lingkungan yang membutuhkan keamanan multilevel (misalnya, militer).
> > 
> > - **Klasifikasi Keamanan:** Setiap subjek (pengguna) dan objek (data) diberi label klasifikasi keamanan, seperti `Top Secret (TS)`, `Secret (S)`, `Confidential (C)`, dan `Unclassified (U)`.  Bentuk umum hirarkinya adalah `TS >= S >= C >= U`
> >     
> > - **Bell-LaPadula Model:** Model formal yang paling umum untuk MAC, dengan dua aturan utama:
> >     
> >     1. **Simple Security Property (No Read Up):** Seorang subjek hanya boleh membaca data dari level keamanan yang sama atau lebih rendah (`class(Subjek) ≥ class(Objek)`). Ini mencegah pengguna melihat data yang lebih rahasia dari levelnya.
> >         
> >     2. **Star Property (\*-property / No Write Down):** Seorang subjek hanya boleh menulis data ke level keamanan yang sama atau lebih tinggi (`class(Subjek) ≤ class(Objek)`). Ini mencegah informasi rahasia bocor ke level yang kurang aman.
> >         
> > 
> > ### Role-Based Access Control (RBAC)
> > 
> > **Role-Based Access Control (RBAC)** adalah model keamanan yang menjadi standar di banyak organisasi modern. Dalam model ini, hak akses tidak diberikan langsung ke pengguna, melainkan ke "peran" (_roles_). Pengguna kemudian ditugaskan ke peran yang sesuai.
> > 
> > - **Konsep Inti:** Permissions → Roles → Users.
> >     
> > - **Manajemen Terpusat:** Admin hanya perlu mengelola hak akses untuk setiap peran. Ketika pengguna berganti tugas, admin cukup mengubah peran pengguna tersebut, tanpa perlu mengubah satu per satu hak aksesnya.
> > 
> > - **Pembuatan:** Role bisa dibuat dengan _keyword_ `GRANT` dan `REVOKE`. 
> > 	```sql
> > 	CREATE ROLE full_time;
> > 	GRANT ROLE full_time TO employee1;
> > 	REVOKE ROLE full_time FROM employee1;
> > 	```
> > 
> > - **Hierarki Peran:** Peran dapat diorganisir secara hierarkis. Misalnya, peran `Manager` bisa mewarisi semua hak akses dari peran `Supervisor`, ditambah hak akses lainnya.
> >     
> > - **Keunggulan:** RBAC merupakan alternatif yang sangat baik karena lebih fleksibel daripada MAC dan lebih mudah dikelola dalam skala besar daripada DAC, terutama untuk aplikasi enterprise dan web.
> >     

> [!cornell] #### Summary
> Terdapat tiga model utama kontrol akses: Discretionary (DAC) yang memberikan keleluasaan bagi pemilik data untuk mengatur hak akses; Mandatory (MAC) yang menerapkan kebijakan keamanan multilevel secara ketat untuk mencegah kebocoran informasi; dan Role-Based (RBAC) yang menyederhanakan manajemen dengan mengelompokkan hak akses ke dalam peran yang ditugaskan kepada pengguna, menjadikannya solusi yang efisien dan populer.

> [!ad-libitum]- Additional Information
>  #### Pendalaman Teknis: Tantangan "No Write Down" di MAC 
> Aturan _Star Property_ (No Write Down) pada MAC sangat efektif mencegah kebocoran data, namun bisa menjadi tidak praktis. Bayangkan seorang analis dengan level `Secret` perlu membuat ringkasan laporan untuk manajer di level `Confidential`. Secara teknis, MAC akan melarangnya karena ini adalah "menulis ke bawah". Dalam sistem nyata, biasanya ada mekanisme untuk "subjek tepercaya" (_trusted subjects_) yang diizinkan untuk melanggar aturan ini secara terkendali.
> 
> #### Eksplorasi Mandiri
> 
> Cobalah membuat beberapa peran sederhana di database yang Anda gunakan (misalnya PostgreSQL atau MySQL). Buat peran `junior_dev` dan `senior_dev`. Berikan hak `SELECT` ke `junior_dev` pada semua tabel. Berikan semua hak ke `senior_dev` dan jadikan `junior_dev` sebagai anggota dari `senior_dev`. Ini akan memberikan pemahaman praktis tentang konsep hierarki peran di RBAC.
>  
> #### Sumber & Referensi Lanjutan:
> 
> - Ramez Elmasri, Shamkant B. Navathe: "Fundamentals of Database Systems", 6th Edition (Chapter 24)
>     
> - David F. Ferraiolo, D. Richard Kuhn: "Role-Based Access Control" - Artikel klasik yang memperkenalkan konsep RBAC.
>