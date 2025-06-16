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
> > - Kenapa desain relasi yang baik itu penting?
> > - Apa itu Ketergantungan Fungsional (FD)?
> > - Bagaimana FD berhubungan dengan _superkey_?
> > - Apa itu _trivial FD_?
> > - Apa itu _closure_ dari himpunan atribut (α+)?
> > - Bagaimana cara menghitung α+?
> > - Apa kegunaan dari _attribute closure_?
> 
> > ### Ciri-Ciri Desain Relasional yang Baik
> > 
> > - Sebuah desain relasi yang buruk seringkali memiliki masalah **redundansi**, di mana informasi yang sama diulang di banyak baris. Hal ini dapat menyebabkan anomali saat pembaruan data dan pemborosan ruang penyimpanan.
> > - Solusi untuk desain yang buruk adalah **dekomposisi**, yaitu memecah satu skema relasi besar menjadi beberapa skema yang lebih kecil.
> > - Dekomposisi yang baik harus bersifat **lossless** (tanpa kehilangan). Artinya, ketika relasi-relasi hasil dekomposisi digabungkan kembali menggunakan _natural join_, hasilnya harus sama persis dengan relasi aslinya, tanpa kehilangan informasi atau menciptakan baris palsu.
> > 
> > ### Ketergantungan Fungsional (Functional Dependency - FD)
> > 
> > - FD adalah sebuah batasan (constraint) pada himpunan relasi yang legal.
> > - **Definisi Formal:** Misalkan R adalah skema relasi, dengan α⊆R dan β⊆R. Ketergantungan fungsional α→β berlaku pada R jika dan hanya jika untuk setiap dua baris (t1​ dan t2​) dalam relasi, apabila nilai atribut α pada kedua baris tersebut sama (t1​[α]=t2​[α]), maka nilai atribut β pada kedua baris tersebut juga **pasti** sama (t1​[β]=t2​[β]).
> > - Secara sederhana, ini berarti **"nilai α secara fungsional menentukan nilai β"**.
> > - **Contoh:** Dalam sebuah relasi universitas:
> >     - `ID` → `name` (ID mahasiswa secara unik menentukan nama mahasiswa).
> >     - `dept_name` → `building`, `budget` (Nama departemen menentukan gedung dan anggarannya).
> > - FD adalah generalisasi dari konsep sebuah kunci (key).
> > 
> > ### FD dan Kunci (Keys)
> > 
> > - **Superkey:** Sebuah himpunan atribut K adalah **superkey** untuk skema relasi R jika dan hanya jika K secara fungsional menentukan semua atribut di R (K→R).
> > - **Candidate Key:** K adalah **candidate key** jika K→R berlaku (ia adalah superkey), dan tidak ada himpunan bagian sejati α⊂K yang juga memenuhi α→R (ia adalah superkey yang minimal).
> > - **FD Trivial:** Sebuah FD α→β disebut **trivial** jika β adalah himpunan bagian dari (subset) α (β⊆α). FD ini selalu benar dan tidak memberikan informasi baru. Contoh: `{ID, Nama}` → `ID`.
> > 
> > ### Closure Himpunan Atribut (α+)
> > 
> > - **Definisi:** _Closure_ dari sebuah himpunan atribut α di bawah himpunan FD F (ditulis sebagai α+) adalah himpunan semua atribut yang dapat ditentukan secara fungsional oleh α.
> > - **Algoritma Menghitung α+**:
> >     1. Inisialisasi `result` := α.
> >     2. Ulangi proses berikut sampai `result` tidak berubah lagi: 
> > 	    -> cari sebuah FD β→γ di F di mana β⊆ `result`. Jika ditemukan, gabungkan γ ke dalam `result` (`result` := `result` ∪γ).
> > - **Kegunaan Attribute Closure:**
> >     1. **Menguji Superkey:** Untuk memeriksa apakah α adalah superkey, hitung α+ dan periksa apakah α+ berisi semua atribut dari relasi R.
> >     2. **Menguji FD:** Untuk memeriksa apakah FD α→β berlaku di bawah himpunan F, hitung α+ dan periksa apakah β⊆α+.
> > 
> > ### Studi Kasus: Menghitung Closure
> > 
> > Permasalahan:
> > 
> > Diberikan relasi R(A,B,C,G,H,I) dan himpunan FD F={A→B,A→C,CG→H,CG→I,B→H}. Apa closure dari {AG} atau (AG)+? Apakah {AG} sebuah candidate key?
> > 
> > **Solusi:**
> > 
> > 3. Inisialisasi: `result` = `{A, G}`.
> > 4. Karena A⊆result, gunakan A→B dan A→C. `result` menjadi `{A, B, C, G}`.
> > 5. Karena B⊆result, gunakan B→H. `result` menjadi `{A, B, C, G, H}`.
> > 6. Karena CG⊆result, gunakan CG→H dan CG→I. `result` menjadi `{A, B, C, G, H, I}`.
> > 7. Proses berhenti. Jadi, **(AG)+={A,B,C,G,H,I}**.
> > 
> > **Analisis Kunci:**
> > 
> > - Karena (AG)+ berisi semua atribut di R, maka **`{AG}` adalah sebuah superkey**.
> > - Untuk mengecek apakah ini _candidate key_, kita uji subsetnya: (A)+ tidak berisi semua atribut R; (G)+ juga tidak. Maka, tidak ada subset dari `{AG}` yang merupakan superkey.
> > - Kesimpulan: **`{AG}` adalah sebuah _candidate key_**.

> [!cornell] #### Summary
> 
> Desain basis data yang baik menghindari redundansi melalui dekomposisi yang bersifat lossless. Proses ini dipandu oleh teori Ketergantungan Fungsional (FD), yaitu aturan di mana satu set atribut (α) menentukan set atribut lain (β). Konsep closure atribut (α+) adalah alat fundamental untuk menghitung semua atribut yang dapat ditentukan dari α, yang kemudian digunakan untuk memvalidasi FD lain dan untuk mengidentifikasi superkey dan candidate key dalam sebuah relasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Teori di Balik Closure FD (F+)
> 
> Selain _closure_ atribut, ada juga konsep _closure_ dari himpunan FD, yang dinotasikan sebagai F+. F+ adalah himpunan semua FD yang secara logis dapat diturunkan dari himpunan F yang diberikan. Himpunan ini dapat dihitung dengan menerapkan **Aksioma Armstrong** secara berulang:
> 
> 1. **Reflexive rule:** Jika β⊆α, maka α→β.
> 2. **Augmentation rule:** Jika α→β, maka γα→γβ.
> 3. **Transitivity rule:** Jika α→β dan β→γ, maka α→γ.
> 
> Aksioma ini bersifat _sound_ (tidak menghasilkan FD yang salah) dan _complete_ (dapat menghasilkan semua FD yang benar).