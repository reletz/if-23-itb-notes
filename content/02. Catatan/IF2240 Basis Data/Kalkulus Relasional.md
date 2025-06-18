---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Kalkulus Relasional?
> > - Apa itu *Tuple Relational Calculus (TRC)*?
> > - Sintaks umum TRC?
> > - Apa itu variabel *tuple*?
> > - Bagaimana formula kalkulus predikat di TRC?
> > - Apa itu *quantifiers*?
> > - Contoh TRC: Gaji > 80000?
> > - Contoh TRC: Hanya ID?
> > - Contoh TRC: Departemen Watson?
> > - Contoh TRC: Kursus Fall 2017 OR Spring 2018?
> > - Contoh TRC: Kursus Fall 2017 AND Spring 2018?
> > - Contoh TRC: Kursus Fall 2017 BUT NOT Spring 2018?
> > - Apa itu *Safety of Expressions* di TRC?
> > - Contoh ekspresi tidak aman di TRC?
> > - Contoh TRC dengan Kuantifikasi Universal?
> > - Apa itu *Domain Relational Calculus (DRC)*?
> > - Sintaks umum DRC?
> > - Apa itu variabel *domain*?
> > - Contoh DRC: Gaji > 80000?
> > - Contoh DRC: Hanya ID?
> > - Contoh DRC: Departemen Watson?
> > - Contoh DRC: Kursus Fall 2017 OR Spring 2018?
> > - Contoh DRC: Kursus Fall 2017 AND Spring 2018?
> > - Apa itu *Safety of Expressions* di DRC?
> > - Contoh DRC dengan Kuantifikasi Universal?
> >
> > ## Reference Points
> > - Slide 6-18 dari "7. IF2240-SemII2425-m03-2-Relational-Calculus.pdf"
>
> > ### Pengantar Kalkulus Relasional
> > - **Kalkulus Relasional** adalah **bahasa *query* non-prosedural**. Ini berarti pengguna menentukan *data apa* yang ingin didapatkan, bukan *bagaimana* cara mendapatkannya.
> > - Ada dua bentuk utama Kalkulus Relasional:
> >   1.  **Tuple Relational Calculus (TRC)**.
> >   2.  **Domain Relational Calculus (DRC)**.
> >
> > ### Tuple Relational Calculus (TRC)
> > - TRC adalah bahasa *query* non-prosedural di mana setiap *query* berbentuk: $\{t \mid P(t)\}$.
> >   - Ini adalah himpunan semua *tuple* `t` sedemikian rupa sehingga predikat `P` benar untuk `t`.
> > - **Variabel *Tuple***:
> >   - `t` adalah variabel *tuple*.
> >   - `t[A]` menunjukkan nilai *tuple* `t` pada atribut `A`.
> >   - `t ∈ r` menunjukkan bahwa *tuple* `t` ada dalam relasi `r`.
> > - **Formula Kalkulus Predikat**: `P` adalah formula yang mirip dengan kalkulus predikat.
> >   - **Set atribut dan konstanta**.
> >   - **Set operator perbandingan**: (misalnya, `<`, `≤`, `=`, `≠`, `> `, `≥`).
> >   - **Set konektor**: `and` ($\wedge$), `or` ($\vee$), `not` ($\neg$).
> >   - **Implikasi** ($\Rightarrow$): $x \Rightarrow y$ berarti "jika $x$ benar, maka $y$ benar". Ini ekuivalen dengan $\neg x \vee y$.
> >   - **Set *quantifiers*** (penentu kuantitas):
> >     - **Existential Quantifier** ($\exists$): $\exists t \in r (Q(t))$ berarti "ada (exists) sebuah *tuple* `t` dalam relasi `r` sedemikian rupa sehingga predikat `Q(t)` benar".
> >     - **Universal Quantifier** ($\forall$): $\forall t \in r (Q(t))$ berarti "Q benar `untuk semua` (for all) *tuple* `t` dalam relasi `r`".
> >
> > - **Contoh *Query* TRC**:
> >   - **Mencari ID, nama, dept_name, salary untuk instruktur yang gajinya lebih besar dari $80,000**:
> >     $\{t \mid t \in \text{instructor} \wedge t[\text{salary}] > 80000\}$ 
> >   - **Seperti *query* sebelumnya, tapi hanya menghasilkan atribut ID**:
> >     $\{t \mid \exists s \in \text{instructor} (t[\text{ID}] = s[\text{ID}] \wedge s[\text{salary}] > 80000)\}$ 
> >     (Catatan: sebuah relasi pada skema (ID) secara implisit didefinisikan oleh *query* ini ).
> >   - **Mencari nama semua instruktur yang departemennya di gedung "Watson"**:
> >     $\{t \mid \exists s \in \text{instructor} (t[\text{name}] = s[\text{name}] \wedge \exists u \in \text{department} (u[\text{dept\_name}] = s[\text{dept\_name}] \wedge u[\text{building}] = \text{"Watson"}))\}$ 
> >   - **Mencari set semua mata kuliah yang diajarkan di semester Fall 2017, atau di Spring 2018, atau keduanya**:
> >     $\{t \mid \exists s \in \text{section} (t[\text{course\_id}] = s[\text{course\_id}] \wedge s[\text{semester}] = \text{"Fall"} \wedge s[\text{year}] = 2017) \vee \exists u \in \text{section} (t[\text{course\_id}] = u[\text{course\_id}] \wedge u[\text{semester}] = \text{"Spring"} \wedge u[\text{year}] = 2018)\}$ 
> >   - **Mencari set semua mata kuliah yang diajarkan di semester Fall 2017, DAN di Spring 2018**:
> >     $\{t \mid \exists s \in \text{section} (t[\text{course\_id}] = s[\text{course\_id}] \wedge s[\text{semester}] = \text{"Fall"} \wedge s[\text{year}] = 2017) \wedge \exists u \in \text{section} (t[\text{course\_id}] = u[\text{course\_id}] \wedge u[\text{semester}] = \text{"Spring"} \wedge u[\text{year}] = 2018)\}$ 
> >   - **Mencari set semua mata kuliah yang diajarkan di semester Fall 2017, TAPI TIDAK di Spring 2018**:
> >     $\{t \mid \exists s \in \text{section} (t[\text{course\_id}] = s[\text{course\_id}] \wedge s[\text{semester}] = \text{"Fall"} \wedge s[\text{year}] = 2017) \wedge \neg \exists u \in \text{section} (t[\text{course\_id}] = u[\text{course\_id}] \wedge u[\text{semester}] = \text{"Spring"} \wedge u[\text{year}] = 2018)\}$ 
> >
> > - **Keselamatan Ekspresi (*Safety of Expressions*) di TRC**:
> >   - Dimungkinkan untuk menulis ekspresi kalkulus *tuple* yang menghasilkan relasi tak hingga.
> >   - Contoh: $\{t \mid \neg t \in r\}$ akan menghasilkan relasi tak hingga jika domain atribut `r` tak hingga.
> >   - Untuk mencegah masalah ini, kita membatasi set ekspresi yang diizinkan menjadi **ekspresi aman (safe expressions)**.
> >   - Sebuah ekspresi $\{t \mid P(t)\}$ dalam kalkulus relasional *tuple* aman jika **setiap komponen `t` muncul di salah satu relasi, *tuple*, atau konstanta yang muncul di `P`**.
> >   - **Catatan**: ini lebih dari sekadar kondisi sintaks. Contoh: $\{t \mid t[A]=5 \vee \text{true}\}$ tidak aman karena mendefinisikan set tak hingga dengan nilai atribut yang tidak muncul di relasi, *tuple*, atau konstanta di `P`.
> > - **Kuantifikasi Universal di TRC**:
> >   - **Contoh Query**: "Temukan semua mahasiswa yang telah mengambil semua mata kuliah yang ditawarkan di departemen Biologi".
> >     $\{t \mid \exists r \in \text{student} (t[\text{ID}] = r[\text{ID}]) \wedge (\forall u \in \text{course} (u[\text{dept\_name}] = \text{"Biology"} \Rightarrow \exists s \in \text{takes} (t[\text{ID}] = s[\text{ID}] \wedge s[\text{course\_id}] = u[\text{course\_id}])))\}$ 
> >   - **Catatan**: Tanpa kuantifikasi eksistensial pada `student`, *query* di atas tidak akan aman jika departemen Biologi belum menawarkan mata kuliah apa pun.
> >
> > ### Domain Relational Calculus (DRC)
> > - DRC adalah bahasa *query* non-prosedural yang setara kekuatannya dengan kalkulus relasional *tuple*.
> > - Setiap *query* adalah ekspresi berbentuk: $\{<x_1, x_2, ..., x_n> \mid P(x_1, x_2, ..., x_n)\}$.
> >   - `$x_1, x_2, ..., x_n$` merepresentasikan **variabel *domain***.
> >   - `P` merepresentasikan formula yang mirip dengan kalkulus predikat.
> >
> > - **Contoh *Query* DRC**:
> >   - **Mencari ID, nama, dept_name, salary untuk instruktur yang gajinya lebih besar dari $80,000**:
> >     $\{<i, n, d, s> \mid <i, n, d, s> \in \text{instructor} \wedge s > 80000\}$ 
> >   - **Seperti *query* sebelumnya, tapi hanya menghasilkan atribut ID**:
> >     $\{<i> \mid \exists n, d, s (<i, n, d, s> \in \text{instructor} \wedge s > 80000)\}$ 
> >   - **Mencari nama semua instruktur yang departemennya di gedung "Watson"**:
> >     $\{<n> \mid \exists i, d, s (<i, n, d, s> \in \text{instructor} \wedge \exists b, a (<d, b, a> \in \text{department} \wedge b = \text{"Watson"}))\}$ 
> >   - **Mencari set semua mata kuliah yang diajarkan di semester Fall 2017, atau di Spring 2018, atau keduanya**:
> >     $\{<c> \mid \exists a, s, y, b, r, t (<c, a, s, y, b, r, t> \in \text{section} \wedge s = \text{"Fall"} \wedge y = 2017) \vee \exists a_1, s_1, y_1, b_1, r_1, t_1 (<c, a_1, s_1, y_1, b_1, r_1, t_1> \in \text{section} \wedge s_1 = \text{"Spring"} \wedge y_1 = 2018)\}$ 
> >     (Kasus ini juga bisa ditulis lebih ringkas dengan menggabungkan kondisi `OR` dalam satu klausa `section` ).
> >   - **Mencari set semua mata kuliah yang diajarkan di semester Fall 2017, DAN di Spring 2018**:
> >     $\{<c> \mid \exists a, s, y, b, r, t (<c, a, s, y, b, r, t> \in \text{section} \wedge s = \text{"Fall"} \wedge y = 2017) \wedge \exists a_1, s_1, y_1, b_1, r_1, t_1 (<c, a_1, s_1, y_1, b_1, r_1, t_1> \in \text{section} \wedge s_1 = \text{"Spring"} \wedge y_1 = 2018)\}$ 
> >
> > - **Keselamatan Ekspresi (*Safety of Expressions*) di DRC**:
> >   - Ekspresi $\{<x_1, x_2, ..., x_n> \mid P(x_1, x_2, ..., x_n)\}$ aman jika semua hal berikut berlaku:
> >     1.  Semua nilai yang muncul dalam *tuple* ekspresi adalah nilai dari `dom(P)` (yaitu, nilai-nilai muncul baik di `P` atau di *tuple* relasi yang disebutkan di `P`).
> >     2.  Untuk setiap subformula "ada" (`there exists`) dalam bentuk $\exists x (P_1(x))$, subformula tersebut benar jika dan hanya jika ada nilai `x` di `dom(P1)` sedemikian rupa sehingga `P1(x)` benar.
> >     3.  Untuk setiap subformula "untuk semua" (`for all`) dalam bentuk $\forall x (P_1(x))$, subformula tersebut benar jika dan hanya jika `P1(x)` benar untuk semua nilai `x` dari `dom(P1)`.
> > - **Kuantifikasi Universal di DRC**:
> >   - **Contoh Query**: "Temukan semua mahasiswa yang telah mengambil semua mata kuliah yang ditawarkan di departemen Biologi".
> >     $\{<i> \mid \exists n, d, tc (<i, n, d, tc> \in \text{student} \wedge (\forall ci, ti, dn, cr (<ci, ti, dn, cr> \in \text{course} \wedge dn = \text{"Biology"} \Rightarrow \exists si, se, y, g (<i, ci, si, se, y, g> \in \text{takes}))))\}$ 
> >   - **Catatan**: Tanpa kuantifikasi eksistensial pada `student`, *query* di atas tidak akan aman jika departemen Biologi belum menawarkan mata kuliah apa pun.

> [!cornell] #### Summary
> **Kalkulus Relasional** adalah **bahasa *query* non-prosedural** yang memungkinkan pengguna menyatakan *apa* yang diinginkan tanpa menentukan *bagaimana* cara mendapatkannya, berbeda dengan Aljabar Relasional yang prosedural. Terdapat dua bentuk utama: **`Tuple Relational Calculus (TRC)`**, yang berfokus pada variabel *tuple* (`t`) dan predikat, serta **`Domain Relational Calculus (DRC)`**, yang berfokus pada variabel *domain* (`x`). Keduanya menggunakan formula kalkulus predikat dengan operator perbandingan, konektor (`AND`, `OR`, `NOT`), dan *quantifiers* (`∃` untuk "ada" dan `∀` untuk "untuk semua"). Konsep **`Safety of Expressions`** sangat penting untuk memastikan bahwa *query* tidak menghasilkan relasi tak hingga, dengan syarat semua komponen *tuple* atau variabel *domain* yang dihasilkan harus muncul dalam relasi atau konstanta yang disebutkan dalam predikat *query*.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Equivalensi Aljabar dan Kalkulus Relasional**: Aljabar Relasional dan Kalkulus Relasional (baik *tuple* maupun *domain*) memiliki kekuatan ekspresif yang **ekuivalen**. Artinya, setiap *query* yang dapat dinyatakan dalam salah satu bahasa ini dapat juga dinyatakan dalam bahasa lainnya. Hal ini merupakan dasar teoretis mengapa SQL, yang merupakan bahasa hibrida (campuran prosedural dan non-prosedural), sangat kuat.
> - **Kalkulus Predikat dalam Logika**: Kalkulus relasional berakar kuat pada logika predikat orde pertama, yang merupakan cabang dari logika matematika. Ini memberikan dasar formal yang ketat untuk pemrosesan *query* *database*.
> - **SQL sebagai Bahasa Hibrida**: SQL tidak murni kalkulus atau aljabar. Klausa `FROM` dan `JOIN` SQL memiliki sifat aljabar, sedangkan klausa `WHERE` memiliki sifat kalkulus. Ini membuatnya sangat fleksibel dan kuat dalam praktiknya.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", 7th Edition, Chapter 27: Formal-Relational Query Languages (online chapter), Bagian 27.1: The Tuple Relational Calculus dan Bagian 27.2: The Domain Relational Calculus.
> - **Teori Database**: Pelajari lebih dalam tentang teori bahasa *query* formal dan bagaimana mereka diimplementasikan dalam sistem *database* modern.
>
> #### Eksplorasi Mandiri:
> - **Konversi Query**: Pilih beberapa *query* SQL sederhana atau menengah dan coba ekspresikan dalam Aljabar Relasional, Tuple Relational Calculus, dan Domain Relational Calculus. Perhatikan perbedaan dalam cara berpikir yang diperlukan untuk setiap paradigma.
> - **Peran Safety**: Coba tulis *query* TRC atau DRC yang tidak aman dan pahami mengapa itu tidak aman berdasarkan definisi *safety*.