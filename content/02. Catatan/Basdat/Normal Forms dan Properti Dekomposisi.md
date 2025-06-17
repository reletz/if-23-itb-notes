---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Basdat]]

> [!cornell] Topic
> 
> 
> > ## Questions/Cues
> > 
> > - Apa dua properti penting dekomposisi?
> > - Apa itu _Lossless Decomposition_?
> > - Apa itu _Dependency Preservation_?
> > - Apa itu Bentuk Normal (Normal Form)?
> > - Apa definisi 1NF dan 2NF?
> > - Apa definisi BCNF?
> > - Bagaimana cara dekomposisi ke BCNF?
> > - Apa definisi 3NF?
> > - Apa perbedaan utama BCNF dan 3NF?
> 
> > ### Properti Dekomposisi yang Baik
> > 
> > Saat memecah tabel, ada dua properti utama yang harus dijaga agar dekomposisi dianggap baik:
> > 
> > - **Lossless-Join Decomposition**: Ini adalah properti yang paling penting. Dekomposisi harus bersifat _lossless_, artinya tidak ada informasi yang hilang atau data palsu yang tercipta saat tabel-tabel hasil dekomposisi digabungkan kembali. Sebuah dekomposisi R menjadi R1 dan R2 bersifat _lossless_ jika irisan atributnya (R1​∩R2​) secara fungsional menentukan semua atribut di R1 atau semua atribut di R2.
> > - **Dependency Preservation**: Sebuah dekomposisi bersifat _dependency preserving_ jika semua Ketergantungan Fungsional (FD) awal dapat diperiksa hanya dengan melihat satu tabel hasil dekomposisi, tanpa perlu menggabungkan (join) beberapa tabel. Ini penting untuk menjaga efisiensi saat menerapkan _constraints_.
> > 
> > ### Bentuk Normal (Normal Forms - NF)
> > 
> > **Bentuk Normal** adalah serangkaian kriteria untuk mengukur "kualitas" sebuah skema relasi, terutama terkait dengan tingkat redundansinya. Terdapat tingkatan bentuk normal, di mana tingkatan yang lebih tinggi memiliki aturan yang lebih ketat.
> > 
> > - **First Normal Form (1NF):** Ini adalah syarat paling dasar. Sebuah relasi berada dalam 1NF jika domain dari semua atributnya bersifat **atomik**, artinya setiap sel dalam tabel hanya berisi satu nilai tunggal, bukan daftar atau himpunan nilai.
> >     
> > - **Second Normal Form (2NF):** Bentuk ini relevan untuk relasi yang memiliki _composite primary key_. Sebuah relasi berada dalam 2NF jika sudah 1NF dan setiap atribut non-kunci tidak memiliki ketergantungan parsial (hanya bergantung pada sebagian dari _composite primary key_).
> >     
> > - **Hirarki Bentuk Normal**:
> >     
> >     ```
> >     +---------------------------------+
> >     | 1NF (Paling tidak ketat)        |
> >     |  +---------------------------+  |
> >     |  | 2NF                       |  |
> >     |  |  +---------------------+  |  |
> >     |  |  | 3NF                 |  |  |
> >     |  |  |  +---------------+  |  |  |
> >     |  |  |  | BCNF (Paling  |  |  |  |
> >     |  |  |  |      ketat)   |  |  |  |
> >     |  |  |  +---------------+  |  |  |
> >     |  |  +---------------------+  |  |
> >     |  +---------------------------+  |
> >     +---------------------------------+
> >     ```
> >     
> > 
> > ### Boyce-Codd Normal Form (BCNF)
> > 
> > - **Definisi**: Sebuah skema relasi R berada dalam **BCNF** jika untuk setiap Ketergantungan Fungsional (FD) non-trivial α→β yang berlaku pada R, **α haruslah sebuah superkey** untuk R.
> > - Ini adalah bentuk normal yang sangat ketat dan diinginkan karena menghilangkan sebagian besar anomali redundansi.
> > - **Dekomposisi ke BCNF**: Jika sebuah relasi R tidak dalam BCNF karena ada FD α→β di mana α bukan superkey, maka R didekomposisi menjadi dua relasi:
> >     1. R1​=(α∪β)
> >     2. R2​=(R−(β−α))
> > 
> > ### Third Normal Form (3NF)
> > 
> > - **Definisi**: 3NF adalah relaksasi dari BCNF. Sebuah skema relasi R berada dalam **3NF** jika untuk setiap FD non-trivial α→β, setidaknya salah satu dari kondisi berikut terpenuhi:
> >     1. FD tersebut trivial (β⊆α).
> >     2. α adalah sebuah **superkey** untuk R.
> >     3. Setiap atribut A dalam β−α (yaitu, setiap atribut di sisi kanan yang tidak ada di sisi kiri) adalah bagian dari sebuah **candidate key**.
> > 
> > ### Perbandingan BCNF dan 3NF
> > 
> > - **BCNF**: Selalu menghasilkan dekomposisi yang **lossless**, tetapi **tidak selalu dependency preserving**.
> > - **3NF**: Selalu dapat menghasilkan dekomposisi yang **lossless DAN dependency preserving**.
> > - **Trade-off**: 3NF menjamin _dependency preservation_ tetapi mungkin masih menyisakan sedikit redundansi. BCNF menghilangkan lebih banyak redundansi tetapi dengan risiko kehilangan _dependency preservation_, yang bisa membuat pengecekan constraint menjadi mahal.
> > 
> > ### Studi Kasus: BCNF vs 3NF
> > 
> > - **Permasalahan**: Diberikan skema `dept_advisor(s_ID, i_ID, dept_name)` dengan FD: `i_ID` → `dept_name` dan `s_ID, dept_name` → `i_ID`. Analisis bentuk normalnya.
> > - **Analisis**:
> >     1. _Candidate keys_ untuk skema ini adalah `{s_ID, dept_name}` dan `{s_ID, i_ID}`.
> >     2. Mari kita periksa FD `i_ID` → `dept_name`. Sisi kiri, `i_ID`, **bukanlah sebuah superkey**.
> >     3. **Pengecekan BCNF**: Karena `i_ID` bukan superkey, skema ini **melanggar BCNF**.
> >     4. **Pengecekan 3NF**:
> >         - Apakah `i_ID` superkey? Tidak.
> >         - Kita periksa kondisi ketiga: Apakah setiap atribut di sisi kanan (`dept_name`) adalah bagian dari sebuah _candidate key_? **Ya**, `dept_name` adalah bagian dari _candidate key_ `{s_ID, dept_name}`.
> >     5. **Kesimpulan**: Karena kondisi ketiga 3NF terpenuhi, skema ini **berada dalam 3NF**. Ini adalah contoh klasik di mana 3NF dan BCNF berbeda.


> [!cornell] #### Summary
> 
> Dekomposisi relasi yang baik harus memenuhi dua properti utama: lossless-join dan dependency preservation. Bentuk Normal (1NF, 2NF, 3NF, BCNF) digunakan untuk mengukur kualitas desain relasi terhadap redundansi. BCNF adalah bentuk paling ketat, yang mengharuskan setiap determinan FD non-trivial menjadi superkey. 3NF adalah relaksasi dari BCNF yang mengizinkan determinan non-superkey jika atribut yang ditentukan adalah bagian dari candidate key, sebuah kompromi untuk selalu dapat mempertahankan semua FD.