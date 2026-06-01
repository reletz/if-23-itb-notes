---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> > ## Questions/Cues
> > 
> > - Apa saja hukum untuk operasi Union?
> > - Apa saja hukum untuk operasi Konkatenasi?
> > - Apa peran himpunan kosong (∅)?
> > - Apa peran himpunan epsilon ({ϵ})?
> > - Apa hukum distributifnya?
> > - Apa saja hukum untuk operasi Closure (*)?
> > - Bagaimana cara membuktikan identitas umum regex?
> > - Apa itu metode 'freezing'?
> >     
> > 
> > ## Reference Points
> > 
> > - 2023_Algebraic Law of Language.pdf
> >     
> 
> > ### Hukum-Hukum Aljabar untuk Bahasa
> > 
> > Operasi-operasi pada bahasa (seperti Union, Konkatenasi, dan Closure) memiliki sifat-sifat aljabar yang mirip dengan operasi aritmetika. Sifat-sifat ini memungkinkan kita untuk memanipulasi dan menyederhanakan ekspresi bahasa.
> > 
> > **1. Hukum untuk Union (∪)**
> > 
> > - **Komutatif:** $L\cup M=M\cup L$
> >     
> > - **Asosiatif:** $(L\cup M)\cup N=L\cup (M\cup N)$
> >     
> > - **Idempoten:** $L\cup L=L$
> >     
> > 
> > **2. Hukum untuk Konkatenasi (Concatenation)**
> > 
> > - **Asosiatif:** $(LM)N=L(MN)$
> > - **TIDAK Komutatif:** Konkatenasi secara umum tidak komutatif. Artinya, ada bahasa L dan M di mana $LM \neq ML$.
> >     
> > 
> > **3. Hukum Identitas dan Anihilator**
> > 
> > - **Identitas untuk Union:** Himpunan kosong (∅) adalah elemen identitas untuk operasi union.
> >     
> >     > $∅\cup L=L\cup ∅=L$
> >         
> > - **Identitas untuk Konkatenasi:** Himpunan yang hanya berisi string kosong ({ϵ}) adalah elemen identitas untuk operasi konkatenasi.
> >     
> >     > ${ϵ}L=L{ϵ}=L$
> >         
> > - **Anihilator untuk Konkatenasi:** Himpunan kosong (∅) adalah elemen anihilator (pembuat nol) untuk operasi konkatenasi.
> >     
> >     > $∅L=L∅=∅$
> >         
> > 
> > **4. Hukum Distributif**
> > 
> > - Konkatenasi bersifat distributif terhadap union, baik dari kiri maupun kanan.
> >     
> >     - **Distributif Kiri:** $L(M\cup N)=LM\cup LN$
> >     - **Distributif Kanan:** $(M\cup N)L=ML\cup NL$
> >         
> > 
> > **5. Hukum untuk Closure (*)**
> > 
> > - $∅^∗={ϵ}$
> >     
> > - ${ϵ}^∗={ϵ}$
> >     
> > - **Idempoten:** $(L^∗)^∗=L^∗$
> > ![[Pasted image 20250705204835.png]]
> >     
> > - **Hubungan dengan Positive Closure (+):**
> >     
> >     - $L^+=LL^∗=L^∗L$
> >         
> >     - $L^∗=L^+\cup {ϵ}$
> >         
> > 
> > ### Verifikasi Identitas untuk Ekspresi Reguler
> > 
> > Seringkali kita ingin membuktikan sebuah identitas umum berlaku untuk _semua_ ekspresi reguler, bukan hanya untuk contoh spesifik. Misalnya, membuktikan (L+M)∗=(L∗M∗)∗ berlaku untuk L dan M apa pun.
> > 
> > **Metode Pembekuan (Freezing Substitution)**
> > 
> > Metode ini adalah cara untuk menguji identitas umum tersebut:
> > 
> > 1. **"Bekukan" Variabel:** Ganti setiap variabel ekspresi reguler umum (seperti L dan M) dengan simbol-simbol alfabet baru yang berbeda (misalnya, a1​ dan a2​).
> >     
> > 2. **Uji Identitas Konkret:** Uji apakah bahasa yang dihasilkan oleh kedua sisi ekspresi yang sudah "dibekukan" itu ekuivalen.
> >     
> > 
> > **Contoh:** Untuk membuktikan $(L+M)^∗=(L^∗M^∗)^∗$:
> > 
> > - Ganti L dengan $a_1$​ dan M dengan $a_2$​.
> >     
> > - Kita cukup menguji apakah $L((a_1​+a_2​)∗)=L((a_1∗​a_2∗​)∗)$.
> >     
> > 
> > **Teorema Kunci:** Jika identitas tersebut terbukti benar untuk versi "beku"-nya, maka identitas tersebut juga pasti benar untuk versi umumnya. Metode ini berfungsi untuk semua identitas yang hanya menggunakan operasi union (+), konkatenasi (.), dan star (*).

> [!cornell] #### Summary
> Operasi pada bahasa, seperti Union, Konkatenasi, dan Closure, mengikuti serangkaian **hukum aljabar** yang formal (misalnya, komutatif, asosiatif, distributif) yang memungkinkan manipulasi ekspresi. Untuk membuktikan sebuah identitas umum pada ekspresi reguler (yang berlaku untuk bahasa apa pun), dapat digunakan sebuah teknik ampuh yang disebut **Metode Pembekuan (Freezing)**, di mana variabel bahasa diganti dengan simbol unik dan identitasnya diuji pada level konkret tersebut.

> [!ad-libitum]- Additional Information (Optional)
> #### Analogi dengan Aljabar Aritmetika
> 
> Banyak dari hukum ini memiliki paralel langsung dengan aljabar yang kita kenal di aritmetika, yang bisa membantu intuisi:
> - Union (∪) sangat mirip dengan Penjumlahan (+).
> - Konkatenasi (dinyatakan dengan juxtaposition, misal LM) sangat mirip dengan Perkalian (×).   
> - Himpunan kosong (∅) berperilaku seperti angka 0 pada penjumlahan.
> - Himpunan {ϵ} berperilaku seperti angka 1 pada perkalian.
>  Dengan analogi ini, hukum distributif L(M∪N)=LM∪LN terlihat persis seperti a×(b+c)=(a×b)+(a×c). Namun, penting untuk diingat perbedaannya, terutama bahwa konkatenasi **tidak komutatif** (LM=ML), tidak seperti perkalian bilangan.
>
> #### Eksplorasi Mandiri
> 
> - **Uji Sebuah Identitas:** Salah satu slide menanyakan: Apakah L+ML=(L+M)L berlaku secara umum?
>     
> - Coba gunakan metode "freezing" untuk mengujinya. Misalkan L=a dan M=b.
>     
>     - Sisi kiri menjadi: a+ba. Bahasa yang dihasilkan adalah {a,ba}.
>         
>     - Sisi kanan menjadi: (a+b)a. Bahasa yang dihasilkan adalah {aa,ba}.
>         
> - Apakah kedua bahasa tersebut sama? Karena tidak sama, maka identitas umum tersebut **tidak berlaku**.
>