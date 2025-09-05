---


type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic: Implementasi Kontrol Akses dengan SQL
> 
> > ## Questions/Cues
> > 
> > - Apa saja bentuk otorisasi di SQL?
> >     
> > - Bagaimana sintaks perintah `GRANT`?
> >     
> > - Bagaimana sintaks perintah `REVOKE`?
> >     
> > - Apa fungsi `ROLES` dalam SQL?
> >     
> > - Bagaimana cara memberikan hak akses pada `VIEW`?
> >     
> > - Apa itu `WITH GRANT OPTION`?
> >     
> > - Apa fungsi `CASCADE` pada `REVOKE`?
> >     
> > - Apa itu Authorization-Grant Graph?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 26-36: Database Security.pdf
> >     
> 
> > ### Otorisasi dan Hak Akses (Privileges) di SQL
> > 
> > Otorisasi di SQL adalah proses memberikan hak kepada pengguna untuk mengakses atau memanipulasi objek database. Hak akses (privileges) ini dapat dibagi menjadi dua kategori utama:
> > 
> > 1. **Hak Akses Data:**
> >     
> >     - `SELECT` (Read): Membaca data.
> >         
> >     - `INSERT`: Menambahkan data baru.
> >         
> >     - `UPDATE`: Mengubah data yang sudah ada.
> >         
> >     - `DELETE`: Menghapus data.
> >         
> > 2. **Hak Akses Skema:**
> >     
> >     - `INDEX`: Membuat atau menghapus indeks.
> >         
> >     - `RESOURCES`: Membuat relasi/tabel baru.
> >         
> >     - `ALTERATION`: Mengubah struktur tabel (menambah/menghapus kolom).
> >         
> >     - `DROP`: Menghapus tabel.
> >         
> >     - `REFERENCES`: Membuat foreign key yang mereferensikan tabel lain.
> >         
> > 
> > ### Perintah GRANT: Memberikan Hak Akses
> > 
> > Perintah `GRANT` digunakan untuk memberikan satu atau lebih hak akses kepada pengguna atau peran.
> > 
> > Sintaks Dasar:
> > 
> > GRANT <privilege_list> ON <object_name> TO <user_list>;
> > 
> > - `<user_list>` bisa berupa ID pengguna, `PUBLIC` (semua pengguna), atau sebuah `ROLE`.
> >     
> > - **`WITH GRANT OPTION`**: Jika ditambahkan di akhir, penerima hak akses juga diizinkan untuk memberikan hak akses yang sama kepada pengguna lain.
> >     
> > 
> > ### Perintah REVOKE: Mencabut Hak Akses
> > 
> > Perintah `REVOKE` digunakan untuk mencabut hak akses yang sebelumnya telah diberikan.
> > 
> > Sintaks Dasar:
> > 
> > REVOKE <privilege_list> ON <object_name> FROM <user_list>;
> > 
> > - **Efek Berantai (Cascading):** Jika pengguna U1 memberikan hak ke U2, dan kemudian hak U1 dicabut, maka hak U2 juga akan otomatis tercabut.
> >     
> > - **`CASCADE` vs `RESTRICT`**:
> >     
> >     - `CASCADE`: Saat hak dicabut, semua hak lain yang bergantung padanya (yang diberikan oleh pengguna tersebut) juga akan ikut dicabut.
> >         
> >     - `RESTRICT`: Pencabutan akan gagal jika ada hak lain yang bergantung padanya.
> >         
> > 
> > ### Menggunakan ROLES
> > 
> > `ROLE` adalah sebuah entitas yang berisi kumpulan hak akses. Ini menyederhanakan manajemen hak akses, sejalan dengan konsep RBAC.
> > 
> > 1. **Buat Role:** `CREATE ROLE nama_role;`
> >     
> > 2. **Berikan Hak ke Role:** `GRANT SELECT ON mahasiswa TO nama_role;`
> >     
> > 3. **Berikan Role ke Pengguna:** `GRANT nama_role TO user_A;`
> >     
> > 
> > Role juga bisa diberikan ke role lain untuk menciptakan hierarki.
> > 
> > ### Otorisasi pada Views dan Authorization-Grant Graph
> > 
> > - **Views:** Memberikan hak akses pada sebuah `VIEW` tidak secara otomatis memberikan hak akses pada tabel dasarnya. Keamanan `VIEW` bergantung pada hak akses yang dimiliki oleh _pembuat_ `VIEW` saat `VIEW` itu dibuat.
> >     
> > - **Authorization-Grant Graph:** Adalah sebuah graf berarah yang memvisualisasikan alur pemberian hak akses. Node merepresentasikan pengguna (atau DBA), dan panah dari U1 ke U2 berarti U1 memberikan hak akses kepada U2. Ini membantu melacak dependensi saat melakukan `REVOKE`.
> >     

> [!cornell] #### Summary
> SQL menyediakan mekanisme kontrol akses yang kuat melalui perintah `GRANT` untuk memberi hak dan `REVOKE` untuk mencabutnya. Penggunaan `ROLES` menyederhanakan manajemen hak dengan mengelompokkannya, sejalan dengan prinsip RBAC. Fitur seperti `WITH GRANT OPTION` memungkinkan delegasi wewenang, sementara `Authorization-Grant Graph` membantu memvisualisasikan dependensi hak akses untuk mengelola pencabutan secara efektif.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Masalah Otorisasi pada View
> 
> Hak akses pada `VIEW` bisa menjadi rumit. Misalkan Anda membuat `VIEW` `v_gaji_staf` dari tabel `pegawai`. Anda memiliki hak `SELECT` pada `pegawai`, jadi Anda bisa membuat `VIEW` tersebut. Kemudian Anda memberikan hak `SELECT` pada `v_gaji_staf` kepada pengguna B. Jika suatu saat hak `SELECT` Anda pada tabel `pegawai` dicabut, maka pengguna B juga akan kehilangan akses ke `VIEW` tersebut, karena `VIEW` itu kini menjadi tidak valid.
>  
>  #### Eksplorasi Mandiri
>  
>  Buat dua pengguna baru di database Anda, `user1` dan `user2`. Login sebagai DBA, buat tabel `proyek`, lalu berikan hak `SELECT` pada tabel `proyek` kepada `user1` dengan `WITH GRANT OPTION`. Setelah itu, login sebagai `user1` dan berikan hak `SELECT` pada tabel `proyek` kepada `user2`. Terakhir, login kembali sebagai DBA dan cabut hak `SELECT` dari `user1` dengan `CASCADE`. Verifikasi apakah `user2` masih bisa mengakses tabel `proyek`. Eksperimen ini akan memberikan pemahaman praktis tentang efek cascading pada `REVOKE`.
>  
>  #### Sumber & Referensi Lanjutan:
>  
>  - Abraham Silberschatz, Henry F. Korth, S. Sudarshan: "Database System Concepts", 7th Edition (Chapter 4.7)
>      
>  - Dokumentasi resmi sistem database yang Anda gunakan (misal: PostgreSQL, MySQL) pada bagian "Managing Privileges" atau "Access Control".
> 