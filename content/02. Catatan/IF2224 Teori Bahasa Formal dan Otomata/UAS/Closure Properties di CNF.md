---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Sifat Tertutup (Closure Properties) CFL
> 
> > ## Questions/Cues
> >
> > - Definisi Closure
> >     
> > - Operasi Tertutup (Yes)
> >     
> > - Operasi Tidak Tertutup
> >     
> > - Mekanisme Substitution
> >     
> > - Homomorphism
> >     
> > - Bukti Irisan Gagal
> >     
> > - Bukti Komplemen Gagal
> >     
> >
> > ## Reference Points
> >
> > - Slide 15_2025: Hal 16 - 27
> >     
> 
> > ### 1. Sifat Tertutup (Closure Properties)
> >
> > Sebuah kelas bahasa dikatakan **tertutup (closed)** terhadap suatu operasi jika hasil operasi terhadap bahasa-bahasa di kelas tersebut menghasilkan bahasa yang tetap berada di kelas yang sama.
> >
> > ### 2. Operasi yang Tertutup pada CFL
> >
> > CFL bersifat tertutup terhadap operasi-operasi berikut:
> >
> > 1. **Union (**$L_1 \cup L_2$**)**: Jika $L_1$ dan $L_2$ adalah CFL, gabungannya tetap CFL.
> >     
> > 2. **Concatenation (**$L_1 \cdot L_2$**)**: Penyambungan string dari dua CFL tetap CFL.
> >     
> > 3. **Kleene Star (**$L^*$**)**: Iterasi string dari CFL tetap CFL.
> >     
> > 4. **Substitution**: Mengganti setiap terminal $a$ dengan sebuah bahasa $s(a)$ yang juga merupakan CFL.
> >     
> > 5. **Homomorphism**: Pemetaan setiap simbol ke sebuah string tetap.
> >     
> > 6. **Inverse Homomorphism**: Himpunan string $w$ sedemikian sehingga $h(w) \in L$.
> >     
> >
> > ### 3. Operasi yang TIDAK Tertutup pada CFL
> >
> > CFL tidak memiliki sifat tertutup pada dua operasi krusial:
> >
> > **A. Irisan (Intersection -** $L_1 \cap L_2$**)**
> >
> > - **Bukti Kontra**: $L_1 = \{a^n b^n c^m\}$ adalah CFL. $L_2 = \{a^m b^n c^n\}$ adalah CFL. Namun, $L_1 \cap L_2 = \{a^n b^n c^n\}$, yang secara matematis terbukti bukan CFL (berdasarkan Pumping Lemma).
> >     
> >
> > **B. Komplemen (**$\bar{L}$**)**
> >
> > - **Bukti Kontradiksi**: Menggunakan Hukum De Morgan $L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}$. Jika CFL tertutup terhadap komplemen, maka karena CFL tertutup terhadap union, ia seharusnya tertutup terhadap irisan. Karena irisan terbukti gagal, maka komplemen juga harus gagal.
> >     
> >
> > ### 4. Mekanisme Substitusi (Teorema 7.23)
> >
> > Jika terdapat grammar $G$ untuk bahasa $L$, dan untuk setiap terminal $a$ terdapat grammar $G_a$, maka $s(L)$ dikonstruksi dengan:
> >
> > 1. Mengambil semua produksi dari $G$ dan semua $G_a$.
> >     
> > 2. Mengganti setiap terminal $a$ dalam produksi $G$ dengan simbol start dari $G_a$.
> >     
> >     Hasilnya adalah sebuah grammar tunggal yang menghasilkan bahasa hasil substitusi.
> >     

> [!cornell] #### Summary
> 
> Bahasa Bebas Konteks (CFL) memiliki sifat **tertutup terhadap Union, Concatenation, Kleene Star, Substitusi, dan Homomorphism**. Hal ini memungkinkan manipulasi bahasa melalui penggabungan atau penggantian simbol tanpa keluar dari kelas CFL. Namun, CFL **tidak tertutup terhadap Irisan dan Komplemen**, yang membedakannya secara signifikan dari Bahasa Reguler yang tertutup terhadap semua operasi tersebut.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Perbandingan dengan Bahasa Reguler
> 
> Bahasa Reguler jauh lebih "stabil" karena tertutup terhadap irisan dan komplemen. Ketidaktertutupan CFL terhadap irisan terjadi karena mekanisme penyimpanan (stack pada PDA) hanya bisa melacak satu ketergantungan urutan pada satu waktu. Saat melakukan irisan antara dua pola (misal kecocokan $a$ dengan $b$ DAN $b$ dengan $c$), mesin membutuhkan koordinasi dua stack atau mekanisme memori yang lebih kompleks daripada PDA standar.
> 
> #### Implikasi pada Verifikasi Program
> 
> Sifat ketidaktertutupan terhadap komplemen memiliki implikasi besar dalam ilmu komputer, terutama dalam verifikasi otomatis. Sulit untuk secara otomatis membuktikan bahwa sebuah program "tidak pernah" masuk ke dalam state tertentu jika bahasa yang mendefinisikan perilaku program tersebut adalah CFL.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 15_2025 CNF & CFL Properties (Hal 16-27).
>     
> - Hukum De Morgan untuk Teori Himpunan.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Operasi apa saja yang TIDAK tertutup pada CFL?</strong></summary>
> 
> Operasi Irisan (Intersection) dan Komplemen (Complement).
> 
> </details>
> <details>
> 
> <summary><strong>2. Sebutkan contoh bahasa hasil irisan dua CFL yang bukan merupakan CFL!</strong></summary>
> 
> Bahasa $L = \{a^n b^n c^n : n \ge 0\}$.
> 
> </details>
> <details>
> 
> <summary><strong>3. Apa perbedaan antara Homomorphism dan Substitution?</strong></summary>
> 
> Substitution memetakan simbol ke sebuah bahasa (himpunan string), sedangkan Homomorphism memetakan simbol ke tepat satu string tertentu.
> 
> </details>
> <details>
> 
> <summary><strong>4. Bagaimana cara membuktikan ketidaktertutupan CFL terhadap komplemen?</strong></summary>
> 
> Menggunakan Hukum De Morgan untuk menunjukkan bahwa jika komplemen tertutup, maka irisan seharusnya juga tertutup, yang mana merupakan kontradiksi.
> 
> </details>
> <details>
> 
> <summary><strong>5. Apakah CFL tertutup terhadap operasi Inverse Homomorphism?</strong></summary>
> 
> Ya, CFL bersifat tertutup terhadap Inverse Homomorphism.
> 
> </details>