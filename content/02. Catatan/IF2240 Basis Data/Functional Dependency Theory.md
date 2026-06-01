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
> > - Apa itu _Canonical Cover_ (Fc​)?
> > - Apa itu _Extraneous Attribute_?
> > - Bagaimana cara menguji atribut berlebih di sisi kiri (LHS) FD?
> > - Bagaimana cara menguji atribut berlebih di sisi kanan (RHS) FD?
> > - Bagaimana algoritma untuk menghitung _Canonical Cover_?
> > - Apa itu _Dependency Preservation_?
> > - Bagaimana algoritma untuk menguji _Dependency Preservation_?
> 
> > ### Canonical Cover (Fc​)
> > 
> > - **Definisi:** Sebuah **Canonical Cover** (Fc​) adalah sebuah himpunan Ketergantungan Fungsional (FD) yang disederhanakan yang memiliki _closure_ yang sama persis dengan himpunan FD aslinya (Fc+​=F+). Tujuannya adalah untuk mendapatkan himpunan FD yang paling minimalis dan tidak redundan, yang akan digunakan dalam algoritma dekomposisi.
> > 
> > ### Extraneous Attributes (Atribut Berlebih)
> > 
> > - **Definisi:** Sebuah atribut dalam sebuah FD yang dapat dihilangkan tanpa mengubah _closure_ dari keseluruhan himpunan FD (F+). Ada dua jenis atribut berlebih:
> >     
> > - **Atribut Berlebih di Sisi Kiri (LHS):**
> >     
> >     - Misalkan ada FD α→β dan atribut A∈α. Atribut A disebut berlebih jika himpunan FD yang ada secara logis sudah menyiratkan (α−A)→β.
> >     - **Cara Menguji:** Untuk menguji apakah A berlebih di α, kita hitung _closure_ dari sisa atributnya, yaitu (α−{A})+, menggunakan himpunan FD asli (F). Jika hasilnya mengandung semua atribut β, maka A adalah atribut berlebih dan dapat dihapus.
> > - **Atribut Berlebih di Sisi Kanan (RHS):**
> >     
> >     - Misalkan ada FD α→β dan atribut A∈β. Atribut A disebut berlebih jika himpunan FD tanpa A di sisi kanan, yaitu (F−{α→β})∪{α→(β−A)}, secara logis sudah menyiratkan FD aslinya.
> >     - **Cara Menguji:** Buat himpunan FD baru, F′, di mana FD α→β diganti dengan α→(β−{A}). Lalu, hitung α+ menggunakan F′. Jika hasilnya mengandung A, maka A adalah atribut berlebih dan dapat dihapus dari sisi kanan.
> > 
> > ### Algoritma Menghitung Canonical Cover (Fc​)
> > 
> > Sebuah himpunan FD Fc​ adalah _canonical cover_ jika memenuhi tiga syarat:
> > 
> > 1. Fc​ ekuivalen secara logis dengan F (Fc+​=F+).
> > 2. Tidak ada FD di Fc​ yang memiliki atribut berlebih.
> > 3. Setiap sisi kiri (LHS) dari FD di Fc​ adalah unik.
> > 
> > **Algoritma:**
> > 
> > 4. Inisialisasi Fc​=F.
> > 5. **Gabungkan FD:** Gunakan _union rule_ untuk menggabungkan FD dengan LHS yang sama. Contoh: A→B dan A→C menjadi A→BC.
> > 6. **Hilangkan Atribut Berlebih:** Ulangi proses pengecekan atribut berlebih (baik di LHS maupun RHS) untuk setiap FD di Fc​ dan hapus jika ditemukan. Lakukan ini sampai tidak ada perubahan lagi di Fc​.
> > 
> > ### Dependency Preservation (Pemeliharaan Ketergantungan)
> > 
> > - **Definisi:** Sebuah dekomposisi dikatakan _dependency preserving_ jika gabungan dari semua FD yang bisa dicek pada masing-masing tabel hasil dekomposisi secara logis ekuivalen dengan himpunan FD aslinya. Artinya, tidak ada FD yang "hilang" atau memerlukan join antar tabel untuk bisa divalidasi.
> > - **Algoritma Pengujian:** Untuk menguji apakah sebuah FD α→β terpelihara dalam dekomposisi R1​,R2​,...,Rn​:
> >     1. Inisialisasi `result` = α.
> >     2. Ulangi proses berikut sampai `result` tidak berubah:
> >         - Untuk setiap tabel hasil dekomposisi Ri​:
> >         - Hitung `t` = ( `result` ∩Ri​ )+ menggunakan himpunan FD awal (F).
> >         - Gabungkan `t` ke dalam `result` (`result` = `result` ∪ `t`).
> >     3. Jika `result` akhir mengandung semua atribut β, maka FD α→β terpelihara.
> > 
> > ### Studi Kasus: Menghitung Canonical Cover
> > 
> > Permasalahan:
> > 
> > Cari canonical cover untuk F={A→BC,B→C,A→B,AB→C} pada relasi R(A,B,C).
> > 
> > **Solusi:**
> > 
> > 4. **Inisialisasi:** Fc​={A→BC,B→C,A→B,AB→C}.
> > 5. **Gabungkan (Union Rule):** Gabungkan A→BC dan A→B menjadi A→BC. Himpunan menjadi Fc​={A→BC,B→C,AB→C}.
> > 6. **Cek Atribut Berlebih di AB→C**:
> >     - Apakah A berlebih? Cek (B)+ menggunakan Fc​. (B)+={B,C}, yang mengandung `C`. Jadi, **A berlebih**. Hapus A. FD menjadi B→C. Himpunan kini menjadi Fc​={A→BC,B→C}. (FD B→C yang baru sama dengan yang sudah ada, jadi tidak ada penambahan).
> > 4. **Cek Atribut Berlebih di A→BC**:
> >     - Apakah C berlebih? Cek (A)+ menggunakan himpunan F′={A→B,B→C}. (A)+={A,B,C}. Karena hasilnya mengandung `C`, maka **C berlebih**. Hapus C dari sisi kanan. FD menjadi A→B. Himpunan kini menjadi Fc​={A→B,B→C}.
> > 5. Tidak ada lagi atribut berlebih yang bisa dihapus.
> > 
> > **Hasil Akhir:** _Canonical cover_ untuk F adalah **{A→B,B→C}**.

> [!cornell] #### Summary
> 
> Teori Ketergantungan Fungsional menyediakan alat untuk menyederhanakan dan menganalisis himpunan FD. Canonical Cover adalah representasi FD yang paling minimal dan tidak redundan, yang didapatkan dengan menghilangkan atribut berlebih (baik di sisi kiri maupun kanan FD). Selain itu, untuk memastikan dekomposisi berkualitas baik, kita perlu menguji apakah ia bersifat dependency preserving, yang berarti semua FD asli masih dapat divalidasi secara efisien tanpa perlu melakukan operasi join yang mahal.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Canonical Cover Penting?
> 
> Algoritma dekomposisi, terutama untuk 3NF, secara spesifik membutuhkan _canonical cover_ sebagai inputnya. Menggunakan himpunan FD asli yang mungkin memiliki banyak redundansi dapat menyebabkan proses dekomposisi menghasilkan tabel-tabel yang tidak perlu atau tidak optimal. Dengan terlebih dahulu menyederhanakan himpunan FD ke dalam bentuk _canonical cover_, kita memastikan bahwa algoritma dekomposisi akan bekerja pada himpunan aturan yang paling esensial, sehingga menghasilkan desain yang lebih bersih dan efisien.