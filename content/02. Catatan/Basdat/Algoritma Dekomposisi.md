---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana cara menguji BCNF pada relasi hasil dekomposisi?
> > - Bagaimana algoritma dekomposisi ke BCNF?
> > - Apa jaminan dari algoritma dekomposisi BCNF?
> > - Bagaimana algoritma dekomposisi ke 3NF?
> > - Apa jaminan dari algoritma dekomposisi 3NF?
> > - Apa itu Denormalisasi?
> > - Apa tujuan akhir dari desain relasional?
> 
> > ### Algoritma Dekomposisi ke BCNF
> > 
> > - **Tujuan:** Untuk memecah sebuah relasi yang tidak memenuhi BCNF menjadi sekumpulan relasi yang semuanya memenuhi BCNF.
> > - **Pengujian BCNF:** Untuk menguji apakah sebuah relasi hasil dekomposisi (Ri​) berada dalam BCNF, tidak cukup hanya memeriksa FD dari himpunan F awal. Kita harus memeriksa FD terhadap batasan F+ pada Ri​.
> > - **Algoritma:**
> >     1. Inisialisasi `result` dengan skema awal, misal `result` = `{R}`.
> >     2. **Ulangi**: Selama masih ada skema Ri​ dalam `result` yang belum BCNF:
> >         3. Cari sebuah FD non-trivial α→β yang melanggar BCNF pada Ri​ (yaitu, α bukan superkey untuk Ri​).
> >         4. Ganti Ri​ di dalam `result` dengan dua skema baru: (Ri​−β) dan (α∪β).
> > - **Properti:** Algoritma ini menjamin dekomposisi yang **lossless-join**. Namun, ia **tidak menjamin _dependency preservation_**.
> > 
> > ### Algoritma Dekomposisi ke 3NF
> > 
> > - **Tujuan:** Untuk memecah sebuah relasi menjadi sekumpulan relasi yang semuanya memenuhi 3NF, sambil menjamin _lossless-join_ dan _dependency preservation_.
> > - **Algoritma:**
> >     1. Cari sebuah **canonical cover** (Fc​) untuk himpunan FD F.
> >     2. **Untuk setiap** FD α→β dalam Fc​, buat sebuah skema relasi Ri​=(α∪β).
> >     3. **Cek Kunci**: Jika tidak ada skema Ri​ yang sudah dibuat yang mengandung sebuah _candidate key_ untuk skema asli R, maka tambahkan satu skema lagi yang hanya berisi atribut dari sebuah _candidate key_ tersebut.
> >     4. (Opsional) Hapus skema yang merupakan himpunan bagian (subset) dari skema lain untuk menghilangkan redundansi.
> > - **Properti:** Algoritma ini menjamin dekomposisi yang **lossless-join DAN dependency preserving**.
> > 
> > ### Tujuan Desain dan Pertimbangan Praktis
> > 
> > - **Tujuan Ideal:** Desain basis data relasional yang ideal adalah yang memenuhi **BCNF**, **lossless-join**, dan **dependency preservation**.
> > - **Kompromi:** Karena tujuan ideal tidak selalu bisa tercapai (BCNF bisa konflik dengan dependency preservation), desainer harus memilih kompromi:
> >     - Menerima skema **3NF** untuk menjaga semua FD, meskipun ada sedikit redundansi.
> >     - Menerima skema **BCNF** yang menghilangkan lebih banyak redundansi, tetapi dengan risiko beberapa FD harus dicek secara manual oleh aplikasi.
> > - **Denormalisasi:** Terkadang, desainer secara sengaja melanggar bentuk normal (misalnya, menggabungkan tabel yang sudah ternormalisasi) untuk meningkatkan performa query. Proses ini disebut **denormalisasi**. Tujuannya adalah untuk mengurangi jumlah join yang dibutuhkan, meskipun ini akan mengorbankan konsistensi data dan menambah redundansi.
> > 
> > ### Studi Kasus: Dekomposisi ke 3NF
> > 
> > - **Permasalahan**: Diberikan relasi `cust_banker_branch` dan canonical cover Fc​={customer_id, employee_id→type;employee_id→branch_name;customer_id, branch_name→employee_id}. Lakukan dekomposisi 3NF.
> > - **Langkah-langkah**:
> >     1. **Buat relasi dari setiap FD di Fc​**:
> >         - R1​=(customer_id, employee_id, type)
> >         - R2​=(employee_id, branch_name)
> >         - R3​=(customer_id, branch_name, employee_id)
> >     2. **Cek Kunci**: Apakah ada dari R1, R2, atau R3 yang mengandung _candidate key_ dari skema asli? Ya, R3 (`{customer_id, branch_name, employee_id}`) mengandung candidate key. Jadi, tidak perlu menambah skema baru.
> >     3. **Hapus Redundansi**: Perhatikan bahwa R2 (`{employee_id, branch_name}`) merupakan himpunan bagian dari R3. Maka, R2 dapat dihapus.
> > - **Hasil Akhir**: Hasil dekomposisi 3NF adalah dua relasi:
> >     - `R1 = (customer_id, employee_id, type)`
> >     - `R3 = (customer_id, branch_name, employee_id)`

> [!cornell] #### Summary
> 
> Terdapat algoritma formal untuk melakukan dekomposisi skema relasi ke dalam bentuk normal yang lebih tinggi. Algoritma dekomposisi BCNF menjamin hasil yang lossless tetapi tidak selalu dependency preserving. Di sisi lain, algoritma dekomposisi 3NF, yang menggunakan canonical cover sebagai dasarnya, dapat menjamin hasil yang lossless sekaligus dependency preserving. Pada praktiknya, desainer seringkali harus memilih antara BCNF yang lebih bebas redundansi atau 3NF yang menjaga semua ketergantungan fungsional.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Hubungan ER Model dan Normalisasi
> 
> Ketika sebuah diagram ER dirancang dengan hati-hati, tabel-tabel yang dihasilkan dari proses reduksi (seperti yang dibahas di Catatan 8.3) seharusnya sudah berada dalam bentuk normal yang baik (BCNF atau 3NF) dan tidak memerlukan normalisasi lebih lanjut. Namun, pelanggaran bentuk normal masih bisa terjadi jika ada ketergantungan fungsional antar atribut non-kunci dalam sebuah entitas. Contoh: entitas `employee` memiliki atribut `department_name` dan `building`, di mana ada FD `department_name` → `building`. Hal ini akan menyebabkan tabel `employee` tidak berada dalam BCNF.