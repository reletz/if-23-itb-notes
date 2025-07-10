---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Sifat Penutupan?
> >     
> > - Apa strategi pembuktiannya?
> >     
> > - Bagaimana membuktikan closure untuk Union?
> >     
> > - Bagaimana membuktikan closure untuk Konkatenasi & Star?
> >     
> > - Bagaimana membuktikan closure untuk Komplemen?
> >     
> > - Bagaimana cara membuat DFA untuk $\overline{L}$?
> >     
> >
> > ## Reference Points
> >
> > - 2021_Bab-4-Sifat-Sifat-Bahasa-Regular.pdf: 49-59
> >     
> > - 2023_Properties of Regular Languages.pdf: 10-12
> >     
> 
> > ### Apa itu Sifat Penutupan (Closure Property)?
> >
> > **Sifat Penutupan** adalah sebuah pernyataan bahwa jika kita melakukan suatu operasi pada anggota-anggota dari sebuah kelas bahasa, hasilnya akan tetap berada di dalam kelas bahasa tersebut.
> >
> > Dalam konteks kita: Jika kita mengambil satu atau lebih Bahasa Regular dan menerapkan sebuah operasi (misalnya, Union), apakah hasilnya dijamin akan selalu menjadi Bahasa Regular juga? Jika ya, maka kelas Bahasa Regular dikatakan "tertutup" (closed) di bawah operasi tersebut.
> >
> > **Strategi Pembuktian:** Untuk membuktikan sebuah sifat penutupan, kita bisa menggunakan representasi mana pun dari Bahasa Regular (DFA, NFA, atau RE). Kita pilih representasi yang membuat buktinya paling mudah.
> >
> > ### Closure Menggunakan Ekspresi Reguler (Bukti Sederhana)
> >
> > Metode ini sangat elegan untuk membuktikan beberapa sifat penutupan. Idenya adalah jika kita bisa membangun sebuah Ekspresi Reguler baru dari operasi tersebut, maka hasilnya pasti regular.
> >
> > - **Union ($L\cup M$)**
> > > **Bukti:** Jika $L = L(R)$ dan $M = L(S)$ untuk suatu RE $R$ dan $S$, maka $R+S$ adalah sebuah RE yang bahasanya adalah $L \cup M$. Karena ada RE untuk hasilnya, maka $L \cup M$ adalah regular.
> >
> > - **Konkatenasi ($LM$)** 
> > > **Bukti:** Jika $L = L(R)$ dan $M = L(S)$, maka $RS$ adalah sebuah RE yang bahasanya adalah $LM$. Maka, $LM$ adalah regular.
> >
> > - **Kleene Star ($L^*$)**
> > > **Bukti:** Jika $L = L(R)$, maka $R^*$ adalah sebuah RE yang bahasanya adalah $L^*$. Maka, $L^*$ adalah regular.
> >
> > ### Closure di Bawah Operasi Komplemen (overlineL)
> >
> > **Komplemen** dari sebuah bahasa L (terhadap alphabet Sigma) adalah himpunan semua string di Sigma∗ yang **tidak** ada di L. Ditulis $\overline{L}=\Sigma^∗−L$.
> >
> > - **Strategi Bukti:** Bukti ini paling mudah dilakukan dengan menggunakan **DFA**.
> >     
> >
> > **Metode Konstruksi:**
> >
> > 1. Ambil sebuah bahasa regular L. Pasti ada sebuah DFA, sebut saja $A=(Q,\Sigma,\delta,q_0,F)$, yang menerima L.
> >     
> > 2. Kita bangun sebuah DFA baru, B, untuk menerima $\overline{L}$. DFA B ini memiliki komponen yang hampir sama persis dengan A.
> >     
> > 3. Satu-satunya perbedaan adalah pada himpunan final state-nya. Himpunan final state dari B adalah semua state di A yang **bukan** final state.
> >     
> >
> > > **Konstruksi Formal:** $B=(Q,\Sigma,\delta,q_0,Q−F)$
> >
> > Dengan "membalik" state final dan non-final ini, setiap string yang tadinya diterima oleh A (berakhir di F) sekarang akan ditolak oleh B (berakhir di Q-F), dan sebaliknya. Karena kita berhasil membangun sebuah DFA untuk $\overline{L}$, maka $\overline{L}$ terbukti regular.

> [!cornell] #### Summary
> Kelas Bahasa Regular dikatakan **tertutup (closed)** di bawah suatu operasi jika hasil operasi tersebut pada bahasa regular juga menghasilkan bahasa regular. Sifat penutupan untuk **Union, Konkatenasi, dan Kleene Star** dapat dibuktikan dengan mudah dengan cara membangun Ekspresi Reguler baru. Sementara itu, sifat penutupan untuk **Komplemen** dibuktikan dengan mengambil sebuah DFA untuk bahasa aslinya, lalu membangun DFA baru dengan cara **membalik semua state finalnya menjadi non-final dan sebaliknya**.
 
> [!ad-libitum]- Additional Information (Optional) 
> #### Penting: Kebutuhan DFA Lengkap untuk Komplemen
>  Trik "membalik final state" untuk komplemen hanya berfungsi dengan benar jika DFA awalnya adalah **DFA lengkap** (_complete_), yaitu setiap state memiliki transisi keluar untuk setiap simbol dalam alfabet. Jika ada transisi yang "hilang", DFA tersebut harus dilengkapi terlebih dahulu dengan menambahkan _trap state_ (sebuah state non-final yang semua transisinya kembali ke dirinya sendiri). Tanpa ini, string yang seharusnya "mati" di tengah jalan pada DFA asli (dan ditolak) bisa salah diterima oleh DFA komplemennya karena tidak ada path yang jelas ke state non-final (yang kini menjadi final).
> 
> #### Eksplorasi Mandiri
>  - **Mencari Komplemen:** Ambil DFA untuk bahasa "string biner tanpa '11' berurutan" dari sub-bab sebelumnya. DFA tersebut sudah lengkap. Coba gambarkan DFA untuk bahasa komplemennya, yaitu "string biner yang **mengandung** substring '11'". Apa yang berubah pada diagramnya? Anda akan melihat bahwa state `C` (trap state) menjadi satu-satunya final state.
>