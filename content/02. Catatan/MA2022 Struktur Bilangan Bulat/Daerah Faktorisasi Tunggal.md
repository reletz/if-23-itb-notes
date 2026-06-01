---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Daerah Faktorisasi Tunggal (DFT/UFD)
> 
> > ## Questions/Cues
> > 
> > - Definisi DFT/UFD
> > - Dua Syarat Kunci
> > - Makna "Unik"
> > - Hubungan dengan DIU & DE
> > - Contoh & Non-Contoh
> 
> > ### Definisi Daerah Faktorisasi Tunggal (DFT/UFD)
> > 
> > Sebuah **Daerah Faktorisasi Tunggal** adalah generalisasi dari **Teorema Fundamental Aritmetika** (yang menyatakan bahwa setiap bilangan bulat dapat difaktorkan menjadi bilangan prima secara unik) ke dalam konteks gelanggang abstrak.
> > 
> > Secara formal, sebuah daerah integral `D` disebut DFT jika setiap elemen tak-nol dan bukan unit di dalamnya dapat difaktorkan menjadi produk elemen-elemen prima secara unik.
> > 
> > ### Dua Syarat Kunci
> > 
> > Sebuah daerah integral `D` adalah DFT jika memenuhi dua kondisi berikut untuk setiap elemen `a ∈ D` yang bukan nol dan bukan unit:
> > 
> > 1. **Eksistensi Faktorisasi:** Elemen `a` dapat ditulis sebagai produk berhingga dari elemen-elemen irreducible (elemen yang tidak bisa difaktorkan lagi).
> > 2. **Ketunggalan Faktorisasi:** Faktorisasi tersebut bersifat **unik**.
> > 
> > ### Makna "Unik"
> > 
> > Keunikan di sini memiliki arti yang spesifik: "unik hingga urutan dan sekawan (associates)".
> > 
> > - **Urutan:** Faktorisasi `2 ⋅ 3 ⋅ 5` dianggap sama dengan `5 ⋅ 2 ⋅ 3`.
> > - **Sekawan (Associates):** Elemen yang berbeda hanya karena dikalikan unit. Di `ℤ`, unitnya adalah `1` dan `-1`. Jadi, faktorisasi `30 = 2 ⋅ 3 ⋅ 5` dianggap sama dengan `(-2) ⋅ (-3) ⋅ 5`.
> > 
> > ### Hubungan dengan DIU & DE
> > 
> > Ini adalah bagian terpenting dalam memposisikan DFT dalam hierarki gelanggang.
> > 
> > - **Teorema Utama:** Setiap **Daerah Ideal Utama (DIU) adalah Daerah Faktorisasi Tunggal (DFT)**. Ini karena sifat DIU menjamin bahwa faktorisasi pasti ada dan unik.
> > - **Konsekuensi:** Karena setiap Daerah Euclid (DE) adalah DIU, maka secara otomatis **setiap Daerah Euclid juga merupakan DFT**.
> > - **Hierarki Sejauh Ini:** `Daerah Euclid ⊂ Daerah Ideal Utama ⊂ Daerah Faktorisasi Tunggal ⊂ Daerah Integral`.
> > 
> > ### Contoh & Non-Contoh
> > 
> > - **Contoh DFT:**
> >     - `ℤ` (Bilangan Bulat) adalah contoh prototipe.
> >     - Setiap DIU dan DE, seperti `ℤ[i]` (Bilangan Bulat Gaussian).
> >     - `ℤ[x]` (gelanggang polinomial dengan koefisien bulat) adalah contoh klasik dari sebuah DFT yang **bukan** DIU.
> > - **Non-Contoh DFT:**
> >     - `ℤ[√-5]` adalah contoh terkenal dari daerah integral yang **bukan** DFT. Di dalamnya, faktorisasi tidak unik. Contoh: `6` dapat difaktorkan menjadi `2 ⋅ 3` dan juga `(1 + √-5)(1 - √-5)`. Kedua faktorisasi ini fundamental berbeda.

> [!cornell] #### Summary
> Sebuah Daerah Faktorisasi Tunggal (DFT/UFD) adalah daerah integral di mana setiap elemennya dapat difaktorkan menjadi produk elemen-elemen irreducible secara unik (hingga urutan dan sekawan), yang merupakan perluasan dari Teorema Fundamental Aritmetika. Hirarki penting dalam teori gelanggang menunjukkan bahwa semua Daerah Euclid dan Daerah Ideal Utama juga merupakan Daerah Faktorisasi Tunggal.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **FPB/GCD di DFT:** Di dalam sebuah DFT, Pembagi Bersama Terbesar (FPB/GCD) dari dua elemen atau lebih selalu ada. Ini bisa ditemukan dengan mengambil pangkat minimum dari setiap faktor prima yang sama dalam faktorisasi masing-masing elemen.
> - **DFT vs DIU:** Perbedaan kunci antara DFT dan DIU adalah bahwa di DFT, FPB dari `a` dan `b` ada, tetapi belum tentu dapat ditulis sebagai kombinasi linear `sa + tb`. Kemampuan menulis sebagai kombinasi linear adalah ciri khas dari DIU.
> 
> #### Contoh Soal
> 
> 1. **Soal Faktorisasi:** Faktorkan elemen `4 + 2i` menjadi elemen-elemen irreducible di gelanggang `ℤ[i]` (sebuah DFT).
>     - **Jawaban:** `4 + 2i = 2(2 + i)`. Di `ℤ[i]`, `2` tidak irreducible karena `2 = (1+i)(1-i)`. Elemen `(1+i)`, `(1-i)`, dan `(2+i)` adalah irreducible (prima) di `ℤ[i]`.
>     - Jadi, faktorisasi primanya adalah `(1+i)(1-i)(2+i)`.
> 2. **Soal Konseptual:** Mengapa `ℤ₁₀` bukan Daerah Faktorisasi Tunggal?
>     - **Jawaban:** Syarat pertama untuk menjadi DFT adalah ia harus merupakan **daerah integral**. `ℤ₁₀` bukan daerah integral karena memiliki pembagi nol (contoh: `[2] ⋅ [5] = [0]`). Oleh karena itu, ia tidak bisa menjadi DFT.
> 3. **Soal Keunikan:** Di `ℤ`, faktorisasi dari `-60` adalah `(-1) ⋅ 2² ⋅ 3 ⋅ 5`. Apakah `(-1) ⋅ (-2) ⋅ (-3) ⋅ (-5) ⋅ (-1)` merupakan faktorisasi yang berbeda secara fundamental?
>     - **Jawaban:** Tidak. `(-1) ⋅ (-2) ⋅ (-3) ⋅ (-5) ⋅ (-1)` dapat disederhanakan menjadi `(-1) ⋅ (2) ⋅ (3) ⋅ (5)`. Ini hanya berbeda urutan dan penggunaan unit (`-1`) pada faktor-faktornya. Dalam kerangka DFT, ini dianggap faktorisasi yang **sama**.