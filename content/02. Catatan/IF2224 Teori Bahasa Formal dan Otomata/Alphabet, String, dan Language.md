---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> 
> > ## Questions/Cues
> > 
> > - Apa itu Alphabet (Σ)?
> > - Apa itu String (w)?
> > - Apa beda String & Simbol?
> > - Apa itu String Kosong (ε)?
> > - Apa itu Panjang String (|w|)?
> > - Apa itu Pangkat Alphabet (Σk)?
> > - Apa itu Kleene Closure (Σ∗)?
> > - Apa itu Bahasa (Language)?
> > - Beda antara ∅ dan {ϵ}?
> > - Apa itu Set-Former?
> >
> > ## Reference Points
> > 
> > - 2022_Finite Automata.pdf: 10-14
> > - 2021_Bab-2-FSA.pdf: 6-15
> 
> > ### Alphabet (Alfabet)
> > 
> > **Alphabet** (dilambangkan dengan Σ) adalah sebuah **himpunan tak-kosong dan terbatas** yang berisi simbol-simbol. Anggap saja ini sebagai "kumpulan karakter" yang diizinkan untuk membentuk "kata".
> > 
> > - **Contoh:**
> >     - Alfabet Biner: Σ={0,1}
> >     - Alfabet Huruf Kecil: Σ={a,b,c,...,z}
> >     - Alfabet untuk Vending Machine: Σ={Koin Rp 5,Koin Rp 10,Tombol Kopi}
> > 
> > ### String (Untai)
> > 
> > **String** (dilambangkan dengan w) adalah **urutan terbatas** dari simbol-simbol yang diambil dari sebuah alphabet. Dalam konteks yang lebih santai, ini adalah "kata" yang kita bentuk dari "huruf-huruf" di alphabet.
> > 
> > - **Contoh (dari Σ={0,1}):** `0011001`, `101`, `0`.
> > - **Konteks itu Penting:** `0` bisa berarti simbol '0' atau string '0'. Penggunaannya tergantung pada konteks kalimat.
> > 
> > ### String Kosong (Empty String)
> > 
> > **String Kosong** (dilambangkan dengan ϵ atau terkadang λ) adalah string spesial yang **tidak memiliki simbol sama sekali**. Panjangnya adalah nol. Ini adalah konsep penting yang berfungsi sebagai identitas dalam operasi string.
> > 
> > ### Panjang String
> > 
> > **Panjang String** (dilambangkan dengan ∣w∣) adalah jumlah posisi atau simbol dalam string tersebut.
> > 
> > - **Contoh:**
> >     - Jika w=0110, maka $∣w∣=4$.
> >     - Untuk string kosong, $∣ϵ∣=0.$
> > 
> > ### Powers of an Alphabet (Pangkat Alfabet)
> > 
> > **Pangkat Alfabet** (dilambangkan dengan Σk) adalah himpunan semua string yang memiliki **panjang tepat k**.
> > 
> > - **Contoh (dari Σ={0,1}):**
> >     - Σ0={ϵ} (Himpunan string dengan panjang 0 hanya berisi string kosong).
> >     - Σ1={0,1} (Himpunan semua string dengan panjang 1).
> >     - Σ2={00,01,10,11} (Himpunan semua string dengan panjang 2).
> >     - Σ3={000,001,010,011,100,101,110,111}.
> > 
> > ### Kleene Closure dan Positive Closure
> > 
> > - **Kleene Closure (Σ∗):** Adalah himpunan **semua kemungkinan string** yang bisa dibentuk dari alphabet Σ dengan panjang berapa pun, **termasuk string kosong**. Secara formal, Σ∗=Σ0∪Σ1∪Σ2∪....
> > - **Positive Closure (Σ+):** Sama seperti Kleene Closure, tetapi **tidak termasuk string kosong**. Secara formal, Σ+=Σ1∪Σ2∪Σ3∪....
> > - **Hubungan:** Σ∗=Σ+∪{ϵ}.
> > 
> > ### Concatenation (Konkatenasi)
> > 
> > **Concatenation** adalah operasi menggabungkan dua string (x dan y) menjadi satu string baru (xy) dengan meletakkan string kedua persis setelah string pertama.
> > 
> > - **Contoh:** Jika x=01101 dan y=110, maka xy=01101110.
> > - **Sifat String Kosong:** Untuk string x apa pun, berlaku xϵ=ϵx=x.
> > 
> > ### Language (Bahasa)
> > 
> > **Bahasa** (dilambangkan dengan L) adalah sebuah **himpunan bagian dari Σ∗**. Artinya, dari semua kemungkinan string yang ada (Σ∗), kita memilih beberapa string tertentu berdasarkan suatu aturan atau properti, dan kumpulan string pilihan itulah yang disebut "bahasa".
> > 
> > - **Contoh Bahasa:**
> >     1. Himpunan semua kata dalam Bahasa Inggris yang valid.
> >     2. L={w∣w adalah program C yang valid secara sintaksis}.
> >     3. L={0n1n∣n≥0}={ϵ,01,0011,000111,...} (bahasa dengan jumlah 0 sama dengan jumlah 1, dan semua 0 di depan).
> > 
> > ### Perbedaan Kunci: ∅ vs. {ϵ}
> > 
> > Ini adalah konsep yang sering membingungkan namun sangat penting:
> > 
> > - **Bahasa Kosong (∅):** Ini adalah bahasa yang **tidak memiliki string sama sekali**. Himpunannya benar-benar kosong.
> > - **Bahasa dari String Kosong ({ϵ}):** Ini adalah bahasa yang **memiliki satu anggota**, yaitu string kosong itu sendiri.
> > 
> > Analogi: Bahasa kosong itu seperti sebuah rak buku yang benar-benar kosong. Bahasa dari string kosong itu seperti rak buku yang berisi satu lembar kertas kosong. Keduanya tidak sama.
> > 
> > ### Set-Formers
> > 
> > **Set-former** adalah notasi standar untuk mendefinisikan bahasa secara formal dengan menyatakan properti yang harus dimiliki oleh anggotanya.
> > 
> > - **Format Umum:** {w∣sebuah properti tentang w}. Dibaca: "Himpunan semua string w sedemikian sehingga w memiliki properti ...".
> > - **Format Parameter:** {0i1j∣0≤i≤j}. Dibaca: "Himpunan string yang terdiri dari i buah '0' diikuti j buah '1', sedemikian sehingga jumlah '0' lebih sedikit atau sama dengan jumlah '1'".

> [!cornell] #### Summary
> 
> Teori automata dibangun di atas kosakata dasar yang presisi: Alphabet (Σ) adalah kumpulan simbol terbatas, String (w) adalah urutan simbol dari alphabet tersebut, dan Language (L) adalah himpunan bagian dari semua kemungkinan string (Σ∗) yang dipilih berdasarkan aturan tertentu. Konsep-konsep seperti string kosong (ϵ), panjang string (∣w∣), dan operasi seperti konkatenasi menjadi blok bangunan fundamental untuk mendefinisikan dan menganalisis bahasa secara formal.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Dari Abstrak ke Konkret: DNA Data
> 
> Meskipun terdengar sangat teoretis, konsep-konsep ini adalah "DNA" dari hampir semua data digital. Sebuah file `.txt` adalah sebuah string dari alphabet ASCII. Sebuah gambar JPEG adalah string dari alphabet biner ({0,1}). Sebuah permintaan jaringan (network packet) adalah string dari alphabet bita. Memahami struktur ini adalah langkah pertama untuk bisa memproses, memvalidasi, atau mengubah data apapun secara terprogram.
> 
> #### Eksplorasi Mandiri
> 
> - **Definisikan Sebuah Bahasa Sederhana:**
>     1. Tentukan sebuah alphabet, misalnya untuk "emoji sederhana": $\Sigma = { `:)`, `:(` }$.
>     2. Tuliskan beberapa anggota dari Σ2 dan Σ3.
>     3. Coba definisikan sebuah bahasa L menggunakan set-former, misalnya: $L = {w \mid w \text{ selalu diawali dengan } `:)` \text{ dan memiliki panjang 3}}$. Tuliskan semua anggota dari bahasa L tersebut.