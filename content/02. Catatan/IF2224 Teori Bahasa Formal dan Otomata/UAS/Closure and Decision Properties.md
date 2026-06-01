---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Properti CFL (Bagian 3: Closure & Decision Properties)
> 
> > ## Questions/Cues
> >
> > - Closure: Union
> >     
> > - Closure: Concatenation
> >     
> > - Closure: Kleene Star
> >     
> > - Intersection Failure
> >     
> > - Complementation Failure
> >     
> > - Decidable Properties
> >     
> > - Undecidable Properties
> >     
> >
> > ## Reference Points
> >
> > - Slide 13_2025: Hal 24 - 25
> >     
> 
> > ### 1. Sifat Tertutup (Closure Properties)
> >
> > Sifat tertutup menentukan apakah hasil operasi antara dua bahasa bebas konteks (CFL) akan menghasilkan CFL baru.
> >
> > **Operasi yang Tertutup (Closed):**
> >
> > 1. **Union (**$L_1 \cup L_2$**):** Jika $L_1$ dan $L_2$ adalah CFL, maka gabungannya adalah CFL.
> >     
> > 2. **Concatenation (**$L_1 L_2$**):** Hasil penyambungan string dari dua CFL adalah CFL.
> >     
> > 3. **Kleene Star (**$L^*$**):** Iterasi nol atau lebih dari sebuah CFL tetap menghasilkan CFL.
> >     
> > 4. **Reversal (**$L^R$**):** Membalik semua string dalam CFL tetap menghasilkan CFL.
> >     
> >
> > **Operasi yang TIDAK Tertutup (Not Closed):**
> >
> > 1. **Irisan (Intersection -** $L_1 \cap L_2$**):** Irisan dua CFL belum tentu menghasilkan CFL.
> >     
> > 2. **Komplemen (Complementation -** $\bar{L}$**):** Komplemen dari sebuah CFL belum tentu merupakan CFL.
> >     
> >
> > ### 2. Analisis Kegagalan Irisan (Intersection)
> >
> > Alasan mengapa CFL tidak tertutup terhadap irisan dapat dibuktikan melalui contoh:
> >
> > - $L_1 = \{a^n b^n c^m : n, m \ge 0\}$ (CFL)
> >     
> > - $L_2 = \{a^m b^n c^n : n, m \ge 0\}$ (CFL)
> >     
> > - $L_1 \cap L_2 = \{a^n b^n c^n\}$
> >     
> >     Himpunan $\{a^n b^n c^n\}$ terbukti secara matematis bukan merupakan CFL melalui Pumping Lemma for CFL. Karena irisan menghasilkan bahasa yang bukan CFL, maka CFL tidak tertutup terhadap operasi irisan.
> >     
> >
> > ### 3. Properti Keputusan (Decision Properties)
> >
> > Properti keputusan adalah pertanyaan tentang bahasa yang dapat dijawab melalui algoritma (komputer).
> >
> > **Masalah yang Dapat Diputuskan (Decidable):**
> >
> > 1. **Membership:** Apakah string $w$ ada dalam bahasa $L(G)$? (Dijawab dengan algoritma CYK).
> >     
> > 2. **Emptiness:** Apakah bahasa $L(G)$ kosong? (Dijawab dengan memeriksa apakah simbol start bersifat _generating_).
> >     
> > 3. **Finiteness:** Apakah bahasa $L(G)$ memiliki jumlah string yang terbatas?
> >     
> >
> > **Masalah yang TIDAK Dapat Diputuskan (Undecidable):**
> >
> > 1. **Equivalence:** Apakah $L(G_1) = L(G_2)$? (Tidak ada algoritma umum untuk menjawab ini).
> >     
> > 2. **Disjointness:** Apakah $L(G_1) \cap L(G_2) = \emptyset$?
> >     
> > 3. **Universality:** Apakah $L(G) = \Sigma^*$ (semua kemungkinan string)?
> >     

> [!cornell] #### Summary
> 
> Bahasa Bebas Konteks (CFL) memiliki sifat tertutup terhadap **Union, Concatenation, Kleene Star, dan Reversal**. Namun, CFL **tidak tertutup terhadap Irisan dan Komplemen**. Dalam hal komputasi, kita dapat memutuskan masalah **keanggotaan (membership) dan kekosongan (emptiness)**, tetapi masalah seperti **ekuivalensi antar dua CFL bersifat undecidable** (tidak dapat diselesaikan dengan algoritma umum).

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Hubungan Irisan dan Komplemen
> 
> Secara matematis, kegagalan irisan berkaitan dengan kegagalan komplemen melalui Hukum De Morgan: $L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}$. Jika CFL tertutup terhadap komplemen, maka karena ia tertutup terhadap union, ia seharusnya juga tertutup terhadap irisan. Karena irisan terbukti gagal, maka komplemen juga harus gagal.
> 
> #### Pembuktian Emptiness
> 
> Sebuah CFL kosong jika dan hanya jika simbol start ($S$) tidak dapat menghasilkan string terminal apa pun. Algoritma eliminasi simbol _useless_ (tahap pengecekan _generating_) digunakan untuk memutuskan hal ini. Jika setelah algoritma selesai $S$ tidak termasuk dalam set _generating_, maka $L(G) = \emptyset$.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 13_2025 IF 2124 ITB (Hal 24-25).
>     
> - Pumping Lemma for Context-Free Languages (untuk bukti non-CFL).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa CFL tidak tertutup terhadap operasi irisan?</strong></summary>
> 
> Karena irisan dari dua CFL dapat menghasilkan bahasa yang membutuhkan koordinasi tiga elemen (seperti $a^n b^n c^n$), yang mana stack pada PDA tidak mampu menangani lebih dari dua elemen yang saling bergantung secara bersamaan.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Sebutkan tiga masalah keputusan yang bersifat decidable pada CFL!</strong></summary>
> 
> Membership (keanggotaan), Emptiness (kekosongan), dan Finiteness (keberhinggaan).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apakah kita bisa membuat algoritma yang pasti bisa menentukan apakah dua CFG menghasilkan bahasa yang sama?</strong></summary>
> 
> Tidak. Masalah ekuivalensi ($L(G_1) = L(G_2)$) untuk CFL bersifat undecidable.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Operasi apa yang tetap menghasilkan CFL jika kita melakukan penggabungan dua bahasa bebas konteks?</strong></summary>
> 
> Union ($L_1 \cup L_2$) dan Concatenation ($L_1 L_2$).
> 
> </details>