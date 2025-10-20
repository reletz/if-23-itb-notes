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
> > - Apa tujuan Pumping Lemma?
> > - Apa pernyataan formal dari Pumping Lemma?
> > - Apa itu panjang pemompaan (n)?
> > - Bagaimana string w dipecah?
> > - Apa tiga kondisi x, y, z?
> > - Apa inti dari pemompaan?
> > - Bagaimana struktur bukti menggunakan PL?
> > - Mengapa PL tidak bisa digunakan untuk membuktikan bahasa itu regular?
> >     
> > 
> > ## Reference Points
> > 
> > - 2023_Properties of Regular Languages.pdf: 4-13
> > - 2021_Bab-4-Sifat-Sifat-Bahasa-Regular.pdf: 4-14
> >     
> 
> > ### Tujuan Utama Pumping Lemma
> > 
> > **Pumping Lemma (PL)** adalah sebuah alat formal yang digunakan untuk membuktikan bahwa suatu bahasa **BUKAN** merupakan Bahasa Regular. Ini adalah metode pembuktian dengan **kontradiksi**.
> > 
> > PL bekerja dengan menunjukkan bahwa jika sebuah bahasa itu regular, maka semua string yang "cukup panjang" di dalam bahasa tersebut harus memiliki sebuah properti pengulangan (bisa "dipompa"). Jika kita bisa menemukan satu saja string panjang yang tidak memiliki properti ini, maka kita bisa menyimpulkan bahwa bahasa tersebut tidak mungkin regular.
> > 
> > > **Penting:** Pumping Lemma **tidak bisa** digunakan untuk membuktikan bahwa sebuah bahasa **adalah** regular.
> > 
> > ### Pernyataan Formal Pumping Lemma
> > 
> > > Jika L adalah sebuah bahasa regular, maka **pasti ada** sebuah angka n (disebut **panjang pemompaan** atau _pumping length_) sedemikian sehingga untuk **setiap** string w dalam L dengan panjang ∣w∣≥n, string w dapat dipecah menjadi tiga bagian, w=xyz, yang memenuhi tiga kondisi berikut:
> > > 
> > > 1. $∣xy∣≤n$
> > > 2. $∣y∣>0$ (atau $y \neq ϵ$)
> > > 3. Untuk setiap $i≥0$, string $xy^iz$ juga harus ada di dalam $L$.
> > >     
> > 
> > **Intuisi di Balik Lemma:**
> > 
> > - $n$: Panjang pemompaan ini setara dengan jumlah state pada DFA yang mengenali bahasa L.
> > - $w=xyz$: Jika sebuah string w lebih panjang dari jumlah state (∣w∣≥n), maka menurut _Pigeonhole Principle_, pasti ada setidaknya satu state yang dikunjungi lebih dari sekali saat memproses n simbol pertama.
> >     
> > - $y$: Bagian y adalah substring yang membawa mesin dari state yang berulang kembali ke state itu sendiri.
> >     
> > - **Kondisi 1 ($∣xy∣≤n$):** Pengulangan state ini pasti terjadi dalam n simbol pertama.
> >     
> > - **Kondisi 2 ($∣y∣>0$):** Loop ini harus terdiri dari setidaknya satu simbol.
> >     
> > - **Kondisi 3 (Pemompaan):** Karena y adalah sebuah loop, kita bisa melewati loop ini berkali-kali (i>1) atau tidak melewatinya sama sekali (i=0), dan mesin akan tetap berakhir di final state yang sama.
> >     
> > 
> > ### Struktur Pembuktian Menggunakan Pumping Lemma
> > 
> > Pembuktian ini memiliki struktur seperti sebuah permainan antara kita dan "lawan" (yang mengklaim bahasa itu regular).
> > 
> > 1. **Lawan memilih n**: Lawan memberikan kita sebuah panjang pemompaan n. Kita tidak tahu nilainya, kita hanya tahu ia ada.
> >     
> > 2. **Kita memilih string w**: Tugas kita adalah memilih sebuah string w yang "cerdas" dari bahasa L. String ini harus memiliki panjang ∣w∣≥n dan biasanya dipilih untuk menonjolkan "kelemahan" atau pola inti dari bahasa tersebut.
> >     
> > 3. **Lawan memecah w=xyz**: Lawan sekarang memecah string w kita menjadi xyz dengan cara apa pun, selama memenuhi kondisi (1) ∣xy∣≤n dan (2) ∣y∣>0.
> >     
> > 4. **Kita menunjukkan kontradiksi**: Tugas kita adalah menunjukkan bahwa **untuk semua kemungkinan cara lawan memecah string**, kita bisa menemukan sebuah nilai i (biasanya i=0 atau i=2) di mana string hasil pompaan $xy^iz$ **tidak lagi menjadi anggota** bahasa L.
> >     
> > 
> > Jika kita berhasil melakukan langkah ke-4, kita telah menemukan sebuah kontradiksi, dan dengan demikian membuktikan bahwa asumsi awal (bahasa itu regular) adalah salah.
> > 
> > **Studi Kasus: Membuktikan $L=\{0^k1^k∣k≥0\}$ bukan regular.**
> > 
> > - Lawan memberikan sebuah n.
> >     
> > - Kita memilih string $w=0^n1^n$. String ini ada di L dan $∣w∣=2n≥n$.
> >     
> > - Lawan memecah $w=xyz$. Karena kondisi $∣xy∣≤n$, maka bagian x dan y harus seluruhnya terdiri dari simbol '0'. Jadi, $x=0^a$, $y=0^b$, $z=0^{n−a−b}1^n$, dengan b≥1 (dari kondisi ∣y∣>0).
> >     
> > - Kita memilih untuk memompa ke bawah dengan i=0. String baru adalah $xy^0z=xz$.
> >     
> >     - $xz=0^a0^{n−a−b}1^n=0^{n−b}1^n$.
> >         
> >     - Karena b≥1, maka jumlah '0' tidak lagi sama dengan jumlah '1'. String $0^{n−b}1^n$ ini **tidak ada** di dalam L.
> >         
> > - **Kesimpulan:** Kita menemukan kontradiksi. Maka, L bukan bahasa regular.
> >     

> [!cornell] #### Summary
> **Pumping Lemma** adalah sebuah teorema fundamental yang menyatakan bahwa semua string yang cukup panjang dalam sebuah bahasa regular pasti memiliki sebuah substring di bagian awal yang dapat diulang-ulang (atau dihilangkan) dan hasilnya akan tetap menjadi bagian dari bahasa tersebut. Lemma ini berfungsi sebagai alat utama untuk membuktikan sebuah bahasa **bukan regular** melalui metode **pembuktian dengan kontradiksi**, di mana kita menunjukkan adanya string panjang dalam bahasa tersebut yang melanggar properti pengulangan ini.

> [!ad-libitum]- Additional Information (Optional)
>  #### Analogi Permainan Catur
> 
> Menggunakan Pumping Lemma itu seperti bermain catur. Anda tidak tahu langkah persis yang akan diambil lawan Anda, tetapi Anda tahu aturan mainnya. Anda harus membuat langkah (memilih string w) yang begitu kuat sehingga, tidak peduli apa pun langkah balasan lawan (cara memecah xyz), Anda selalu memiliki jalan untuk menuju "skakmat" (menemukan nilai i yang menghasilkan kontradiksi). Jika Anda salah memilih string w, lawan mungkin bisa menemukan cara pemecahan yang tidak bisa Anda patahkan.
> 
> #### Eksplorasi Mandiri
> 
> - **Pikirkan String yang Tepat:** Coba pikirkan bagaimana Anda akan menggunakan Pumping Lemma untuk membuktikan bahasa L={w∣w adalah string biner dengan jumlah 0 sama dengan jumlah 1} bukan regular.
>   
> - String apa yang akan Anda pilih? Mengapa w=0n1n adalah pilihan yang baik? Mengapa w=(01)n mungkin merupakan pilihan yang buruk (karena lawan bisa memecahnya dengan cara yang sulit Anda lawan)?
>