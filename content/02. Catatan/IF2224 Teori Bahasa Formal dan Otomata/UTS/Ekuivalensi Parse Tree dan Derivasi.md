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
> > - Apa saja cara untuk membuktikan string?
> >     
> > - Apa artinya representasi-representasi ini "ekuivalen"?
> >     
> > - Bagaimana mengubah Parse Tree menjadi Derivasi?
> >     
> > - Bagaimana membuktikan string dari Derivasi?
> >     
> > - Bagaimana membuktikan string dari Inferensi?
> >     
> > - Mengapa ekuivalensi ini fundamental?
> >     
> >
> > ## Reference Points
> > 
> > - `slide-08.pdf` (hlm. 8, 11-20)
> >     
> 
> > ### Empat Sisi dari Koin yang Sama
> > 
> > Sejauh ini, kita telah melihat empat cara berbeda untuk menunjukkan bahwa sebuah string `w` adalah anggota dari bahasa yang didefinisikan oleh sebuah CFG:
> > 
> > 1. **Inferensi Rekursif:** Membangun bukti dari terminal ke atas.
> >     
> > 2. **Derivasi:** Menurunkan string dari Simbol Awal (`S ⇒* w`).
> >     
> > 3. **Derivasi Leftmost/Rightmost:** Versi sistematis dari derivasi.
> >     
> > 4. **Parse Tree:** Representasi visual dari derivasi.
> >     
> > 
> > Pertanyaan kuncinya adalah: apakah ini semua konsep yang terpisah? Jawabannya adalah **tidak**. Keempatnya **ekuivalen** secara fundamental. Artinya, jika Anda bisa membuktikan keanggotaan string dengan salah satu metode, Anda dijamin bisa membuktikannya dengan ketiga metode lainnya. Konsep utama dari bagian ini adalah bahwa empat cara untuk mendeskripsikan keanggotaan sebuah string `w` dalam bahasa dari sebuah variabel `A` adalah **ekuivalen** (setara). Artinya, jika salah satu kondisi terpenuhi, maka semua kondisi lainnya juga pasti terpenuhi.
> > 
> > ### Teorema Ekuivalensi
> > 
> > Keempat kondisi tersebut adalah:
> > 
> > 1. String `w` dapat dibuktikan berada dalam bahasa dari `A` melalui **Inferensi Rekursif**.
> >     
> > 2. Ada sebuah **Parse Tree** dengan akar `A` dan yield `w`.
> >     
> > 3. Terdapat sebuah **Leftmost Derivation** `A ⇒*lm w`.
> >     
> > 4. Terdapat sebuah **Rightmost Derivation** `A ⇒*rm w`.
> >     
> > 
> > Pembuktian ekuivalensi ini dilakukan dengan menunjukkan bahwa kita bisa mengubah satu bentuk representasi ke bentuk lainnya secara sistematis.
> > 
> > ### Dari Inferensi ke Parse Tree (Theorem 5.12)
> > 
> > **Jika kita bisa membuktikan `w` ada dalam bahasa dari `A` melalui inferensi, maka pasti ada Parse Tree dengan akar `A` dan yield `w`.**
> > 
> > Pembuktian ini menggunakan **induksi pada jumlah langkah inferensi**:
> > 
> > - **Basis (1 langkah):** Jika inferensi hanya butuh satu langkah, itu berarti kita menggunakan aturan produksi `A → w`. Kita bisa langsung membuat Parse Tree sederhana: akar `A` dengan satu anak `w`.
> >     
> > - **Induksi (n+1 langkah):** Anggap langkah terakhir inferensi menggunakan aturan `A → X1X2...Xk`, di mana string `w` dipecah menjadi `w1w2...wk`. Setiap `wi` adalah hasil inferensi dari `Xi` yang membutuhkan `n` langkah atau kurang. Berdasarkan hipotesis induksi, setiap `(Xi, wi)` ini sudah memiliki Parse Tree-nya sendiri. Kita tinggal menggabungkannya: buat akar baru `A`, dan jadikan akar-akar dari Parse Tree `(Xi, wi)` sebagai anak-anaknya. Hasilnya adalah Parse Tree yang valid untuk `(A, w)`.
> >     
> > 
> > ### Dari Parse Tree ke Leftmost Derivation (Theorem 5.14)
> > 
> > **Jika ada Parse Tree dengan akar `A` dan yield `w`, maka pasti ada Leftmost Derivation `A ⇒*lm w`.**
> > 
> > Pembuktian ini menggunakan **induksi pada tinggi (height) dari Parse Tree**:
> > 
> > - **Basis (Tinggi 1):** Pohon ini pasti terdiri dari akar `A` dan anak `w`, yang berarti ada aturan `A → w`. Ini adalah derivasi satu langkah: `A ⇒ w`, yang secara trivial adalah leftmost.
> >     
> > - **Induksi (Tinggi n+1):** Sebuah pohon dengan tinggi `n+1` memiliki akar `A` dan anak-anak `X1, X2, ..., Xk`. Setiap `Xi` adalah akar dari sub-pohon yang tingginya `n` atau kurang. Berdasarkan hipotesis induksi, untuk setiap sub-pohon `(Xi, wi)`, sudah ada leftmost derivation `Xi ⇒*lm wi`. Kita bisa membangun derivasi total dengan cara:
> >     
> >     1. Mulai dengan `A ⇒ X1X2...Xk`.
> >         
> >     2. Secara berurutan dari kiri ke kanan (untuk `i` dari 1 sampai `k`), ganti `Xi` dengan `wi` menggunakan leftmost derivation yang sudah ada dari hipotesis induksi. Karena kita selalu memproses variabel paling kiri (`X1`, lalu `X2`, dst.), keseluruhan proses ini menghasilkan sebuah Leftmost Derivation yang valid dari `A` ke `w`.
> >         
> > 
> > ### Dari Derivasi ke Inferensi (Theorem 5.18)
> > 
> > **Jika ada derivasi `A ⇒* w` di mana `w` adalah string terminal, maka kita dapat membuktikan `w` ada di dalam bahasa dari `A` melalui inferensi.**
> > 
> > Pembuktian ini menggunakan **induksi pada panjang derivasi**:
> > 
> > - **Basis (1 langkah):** Derivasi `A ⇒ w` berarti ada aturan `A → w`. Ini adalah langkah inferensi dasar yang membuktikan `w` ada dalam bahasa dari `A`.
> >     
> > - **Induksi (n+1 langkah):** Tulis derivasi sebagai `A ⇒ X1X2...Xk ⇒* w`. String `w` dapat dipecah menjadi `w1w2...wk` di mana setiap `wi` adalah hasil derivasi dari `Xi` dalam `n` langkah atau kurang. Berdasarkan hipotesis induksi, kita bisa menginferensikan bahwa setiap `wi` ada dalam bahasa dari `Xi`. Karena kita memiliki aturan `A → X1X2...Xk` dan kita sudah membuktikan keanggotaan `w1`..`wk`, kita bisa melakukan satu langkah inferensi terakhir untuk membuktikan `w` ada dalam bahasa dari `A`.
> >     
> > 
> > ### Sifat "Context-Free"
> > 
> > Ekuivalensi ini juga menyoroti mengapa grammar ini disebut "bebas konteks". Ketika kita melakukan derivasi pada sebuah variabel (misal `B` dalam `αBβ`), aturan yang diterapkan pada `B` tidak bergantung sama sekali pada simbol-simbol di sekitarnya (`α` dan `β`). Sub-pohon untuk `B` dapat dibangun secara independen dan kemudian "ditempelkan" ke pohon yang lebih besar, sama seperti sub-derivasi yang bisa disubstitusikan ke dalam derivasi yang lebih panjang.

> [!cornell] #### Summary
> 
> Keempat metode untuk memvalidasi sebuah string dalam CFG—yaitu Inferensi Rekursif, Derivasi (termasuk Leftmost dan Rightmost), dan Parse Tree—adalah representasi yang ekuivalen secara matematis, artinya keberadaan salah satu bentuk representasi secara otomatis menjamin keberadaan bentuk lainnya. Ekuivalensi ini terbukti melalui kemampuan untuk mengonversi satu bentuk ke bentuk lainnya (misalnya, Parse Tree dapat diubah menjadi Derivasi Leftmost), yang menegaskan bahwa mereka semua adalah "sudut pandang" yang berbeda untuk melihat struktur sintaksis fundamental yang sama dari sebuah string.

> [!ad-libitum]- Additional Information
> 
> #### Implikasi Praktis: Cara Kerja Parser
> 
> Teorema ekuivalensi ini bukan hanya teori abstrak; ini adalah dasar dari cara kerja _parser_. Tugas sebuah parser adalah, diberikan sebuah string input (misalnya, kode sumber), untuk menentukan apakah string tersebut valid sesuai grammar. Secara efektif, parser mencoba untuk **membangun salah satu dari representasi ini**.
> 
> - **Parser Top-Down (seperti Recursive Descent):** Secara implisit mencoba membangun **derivasi terkiri**.
>     
> - **Parser Bottom-Up (seperti LR):** Secara implisit mencoba membangun **derivasi terkanan secara terbalik**.
>     
> 
> Jika parser berhasil membangun derivasi (dan secara ekuivalen, sebuah Parse Tree), maka string tersebut diterima sebagai sintaksis yang valid. Jika gagal, maka terjadi _syntax error_.
> 
> #### Konteks-Free
> 
> Sifat "konteks-bebas" dari grammar inilah yang memungkinkan ekuivalensi ini. Aturan `A → α` dapat diterapkan pada variabel `A` di mana pun ia muncul, tanpa peduli apa yang ada di sekelilingnya (konteksnya). Hal ini memungkinkan kita untuk secara independen membangun sub-pohon (sub-tree) atau melakukan sub-derivasi untuk setiap variabel dalam sebuah aturan produksi dan kemudian menggabungkannya, yang merupakan inti dari semua bukti induktif di atas.