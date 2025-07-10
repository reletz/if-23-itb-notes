---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa tujuan minimisasi DFA?
> >     
> > - Apa itu state Indistinguishable (pequivq)?
> >     
> > - Apa itu state Distinguishable (pnotequivq)?
> >     
> > - Bagaimana cara kerja Table-Filling Algorithm?
> >     
> > - Bagaimana langkah basisnya?
> >     
> > - Bagaimana langkah induksinya?
> >     
> > - Bagaimana membangun DFA minimal dari hasil tabel?
> >     
> >
> > ## Reference Points
> >
> > - 2021_Bab-4-Sifat-Sifat-Bahasa-Regular.pdf: 33-45
> >     
> > - 2023_Properties of Regular Languages.pdf: 31-45
> >     
> 
> > ### Tujuan dan Konsep Dasar Minimisasi
> >
> > **Minimisasi DFA** adalah sebuah proses untuk mengurangi jumlah state pada sebuah DFA tanpa mengubah bahasa yang diterimanya. Tujuannya adalah untuk mendapatkan DFA yang paling **efisien** dan merupakan representasi **kanonikal (standar)** untuk suatu bahasa regular.
> >
> > Ide utamanya adalah dengan menemukan semua state yang "berperilaku" sama, lalu **menggabungkannya menjadi satu state**. State-state yang bisa digabung ini disebut _indistinguishable_.
> >
> > ### State yang Dapat dan Tidak Dapat Dibedakan
> >
> > - Distinguishable (Dapat Dibedakan / $p \not\equiv q$)
> >     
> >     > Dua state p dan q disebut dapat dibedakan jika ada setidaknya satu string w yang bisa memisahkan mereka. Artinya, jika dimulai dari p dengan input w, mesin berakhir di final state, sedangkan jika dimulai dari q dengan input w, mesin berakhir di non-final state (atau sebaliknya).
> >     
> >
> > - Indistinguishable (Tidak Dapat Dibedakan / $p \equiv q$)
> >     
> >     >Dua state p dan q disebut tidak dapat dibedakan jika untuk semua kemungkinan string w, keduanya akan selalu berakhir di jenis state yang sama (keduanya di final state, atau keduanya di non-final state). Perilaku mereka identik untuk masa depan.
> >     
> >
> > ### The Table-Filling Algorithm
> >
> > Ini adalah algoritma sistematis untuk menemukan semua pasangan state yang **dapat dibedakan (distinguishable)**. Pasangan yang tersisa (tidak ditandai) adalah pasangan yang tidak dapat dibedakan.
> >
> > 1. **Langkah 1: Inisialisasi Tabel**
> >  Buat sebuah tabel untuk semua pasangan state unik ${p, q}$ di DFA.
> > 
> > 2. **Langkah 2: Basis**
> > Tandai (misalnya dengan 'X') semua pasangan ${p, q}$ di mana **salah satunya adalah final state dan yang lainnya bukan**. Pasangan ini jelas dapat dibedakan oleh string kosong $\\epsilon$.
> >
> >
> > 3. **Langkah 3: Induksi**
> >   - Ulangi proses berikut sampai tidak ada lagi tanda 'X' baru yang bisa ditambahkan dalam satu putaran penuh:
> >       - Untuk setiap pasangan ${p, q}$ yang **belum ditandai**:
> >           - Untuk setiap simbol input $a \\in \\Sigma$:
> >               - Cari tahu state tujuan: $r = \\delta(p, a)$ dan $s = \\delta(q, a)$.
> >               - Jika pasangan ${r, s}$ **sudah ditandai** 'X' di tabel, maka tandai juga pasangan ${p, q}$ dengan 'X'.
> > 
> > ### Membangun DFA Minimal
> >
> > Setelah algoritma selesai, semua pasangan yang tidak ditandai 'X' adalah pasangan state yang _indistinguishable_.
> >
> > 1. **Bentuk Kelas Ekuivalensi:** Kelompokkan semua state yang tidak dapat dibedakan satu sama lain. Setiap kelompok ini akan menjadi **satu state baru** di DFA minimal.
> >     
> > 2. **Tentukan State Baru:**
> >     
> >     - **Start State:** State baru yang mengandung _start state_ lama.
> >         
> >     - **Final State:** Semua state baru yang mengandung setidaknya satu _final state_ lama.
> >         
> >     - **Transisi:** Transisi dari sebuah state kelompok baru (misal, dari A,E dengan input '0') ditentukan dengan melihat transisi dari salah satu anggota aslinya (misal, dari A dengan input '0') dan menunjuk ke state kelompok baru yang menampung tujuannya.
> >         

> [!cornell] #### Summary
>  **Minimisasi DFA** adalah proses algoritmik untuk menemukan DFA dengan jumlah state paling sedikit yang menerima bahasa yang sama. Proses ini dicapai dengan menggunakan **Table-Filling Algorithm** untuk mengidentifikasi semua pasangan state yang **tidak dapat dibedakan (indistinguishable)**—yaitu state-state yang memiliki perilaku identik untuk semua kemungkinan input di masa depan. State-state yang tidak dapat dibedakan ini kemudian digabungkan menjadi satu state baru, menghasilkan sebuah DFA minimal yang unik untuk bahasa regular tersebut.

> [!ad-libitum]- Additional Information (Optional)
>  #### Keunikan DFA Minimal
>  Salah satu hasil paling kuat dari teori ini adalah bahwa untuk setiap Bahasa Regular, DFA minimal yang menerimanya adalah **unik** (hingga pada penamaan state-nya, sebuah konsep yang disebut isomorfisma). Ini berarti, tidak peduli seberapa rumit atau tidak efisiennya DFA awal yang Anda buat, jika Anda menerapkan algoritma minimisasi dengan benar, Anda akan selalu tiba di struktur mesin yang sama persis. Hal ini menjadikan DFA minimal sebagai sebuah **representasi kanonikal atau standar** untuk sebuah Bahasa Regular.
> 
> #### Eksplorasi Mandiri
> 
> - **Minimalkan DFA Sederhana:** Terapkan _Table-Filling Algorithm_ pada DFA dari contoh sebelumnya yang menerima string dengan jumlah '0' genap dan '1' genap. Apakah ada state yang bisa digabungkan? (Petunjuk: Seharusnya tidak ada, DFA tersebut sudah minimal). Sekarang, coba pada DFA yang menerima string yang diakhiri `01`. Apakah DFA tersebut sudah minimal?
>