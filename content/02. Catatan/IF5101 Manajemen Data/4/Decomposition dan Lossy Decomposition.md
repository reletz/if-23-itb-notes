---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Decomposition dan Lossy Decomposition
>
> > ## Questions/Cues
> >
> > - Apa itu **dekomposisi** skema relasi dan kenapa dibutuhkan?
> > - Mengapa tidak semua dekomposisi itu baik?
> > - Apa yang dimaksud **lossy decomposition**?
> > - Bagaimana contoh `employee` menunjukkan hilangnya informasi?
> > - Apa syarat dekomposisi yang **lossless**?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 7-8)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.2 (Decomposition)
>
> > ### Dekomposisi: Memecah Skema
> >
> > **Dekomposisi** berarti mengganti satu skema relasi $R$ dengan beberapa skema $R_1, R_2, \dots, R_n$ yang gabungan atributnya sama dengan $R$. Pada `in_dep`, satu-satunya cara menghindari pengulangan informasi adalah memecahnya menjadi `instructor` dan `department`.
> >
> > Tetapi **tidak semua dekomposisi baik**.
> >
> > ### Contoh Dekomposisi yang Buruk
> >
> > Misalkan:
> >
> > ```
> > employee  = (ID, name, street, city, salary)
> > ```
> >
> > didekomposisi menjadi
> >
> > ```
> > employee1 = (ID, name)
> > employee2 = (name, street, city, salary)
> > ```
> >
> > Masalah muncul bila **dua karyawan memiliki nama yang sama**. Atribut yang dipakai untuk menggabungkan kembali kedua tabel (`name`) bukan kunci, sehingga *natural join* menghasilkan **tuple palsu (spurious tuples)**.
> >
> > | ID | name | street | city | salary |
> > | --- | --- | --- | --- | --- |
> > | 57766 | Kim | Main | Perryridge | 75000 |
> > | 98776 | Kim | North | Hampton | 67000 |
> >
> > Setelah dipecah lalu di-*join* lewat `name`, kita memperoleh **4 baris**: (57766, Kim, North, Hampton, 67000) dan (98776, Kim, Main, Perryridge, 75000) ikut muncul, padahal tidak ada di data asli.
> >
> > ### Lossy Decomposition
> >
> > Dekomposisi di atas **tidak dapat merekonstruksi relasi `employee` asli** — kita *kehilangan informasi* tentang siapa tinggal di mana. Karena itu disebut **lossy decomposition**.
> >
> > - **Lossy**: $r \subsetneq r_1 \bowtie r_2$ — join menghasilkan baris tambahan (informasi *hilang* karena tidak bisa membedakan yang asli dari yang palsu).
> > - **Lossless**: $r = r_1 \bowtie r_2$ — relasi asli dapat dibangun kembali tepat.
> >
> > ```mermaid
> > flowchart LR
> >     E["employee<br/>(ID, name, street, city, salary)"]
> >     E --> E1["employee1<br/>(ID, name)"]
> >     E --> E2["employee2<br/>(name, street, city, salary)"]
> >     E1 -->|"natural join pada name"| J["hasil join<br/>ada tuple palsu"]
> >     E2 --> J
> >     J -.->|"&ne; employee asli"| E
> > ```
> >
> > ### Kapan Dekomposisi Lossless?
> >
> > Dekomposisi $R$ menjadi $R_1$ dan $R_2$ adalah **lossless** bila minimal satu dependensi berikut berlaku di $F^+$:
> >
> > - $R_1 \cap R_2 \rightarrow R_1$
> > - $R_1 \cap R_2 \rightarrow R_2$
> >
> > Artinya atribut yang dipakai bersama harus menjadi **superkey** dari paling tidak salah satu hasil dekomposisi. Pada contoh, $R_1 \cap R_2 = \{name\}$ bukan superkey keduanya, sehingga lossy. Bila dipecah menjadi `(ID, name)` dan `(ID, street, city, salary)`, irisannya `ID` adalah kunci sehingga **lossless**.

> [!cornell] #### Summary
>
> **Dekomposisi** memecah skema $R$ menjadi $R_1,\dots,R_n$ untuk menghilangkan redundancy, tetapi tidak semua dekomposisi baik. Memecah `employee` menjadi `(ID, name)` dan `(name, street, city, salary)` **lossy**: bila ada dua karyawan bernama sama, *natural join* menghasilkan **tuple palsu** dan relasi asli tidak bisa direkonstruksi. Dekomposisi **lossless** bila $R_1 \cap R_2$ merupakan **superkey** bagi $R_1$ atau $R_2$.

> [!ad-libitum]- Additional Information
>
> #### Lossless-join vs. dependency preserving
>
> Dua properti ini independen. Lossless menjamin *data* tidak rusak saat di-join; dependency preserving menjamin *aturan* (FD) bisa ditegakkan tanpa join. Algoritma dekomposisi BCNF selalu lossless tetapi tidak selalu dependency preserving (lihat [[BCNF dan Dependency Preservation]]).
>
> #### Tes lossless untuk n relasi
>
> Untuk dekomposisi lebih dari dua relasi dipakai **tableau / chase algorithm**. Untuk dua relasi cukup tes irisan di atas.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel `employee` dengan dua "Kim", lakukan dekomposisi buruk di atas lalu `NATURAL JOIN`; hitung jumlah baris hasil vs aslinya.
> 2. Ulangi dengan dekomposisi `(ID, name)` + `(ID, street, city, salary)` dan buktikan hasil join identik dengan aslinya.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.2 (Atomic Domains / Lossless Decomposition).
> - Ullman, J. D. *Principles of Database and Knowledge-Base Systems* — bab dekomposisi dan chase algorithm.
