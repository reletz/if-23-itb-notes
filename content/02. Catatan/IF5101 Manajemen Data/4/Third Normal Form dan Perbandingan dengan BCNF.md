---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Third Normal Form dan Perbandingan dengan BCNF
>
> > ## Questions/Cues
> >
> > - Apa definisi **3NF** dan apa bedanya dengan BCNF?
> > - Apa kondisi ketiga 3NF, dan mengapa ia disebut "relaksasi minimal" BCNF?
> > - Mengapa `dept_advisor` berada di 3NF tetapi tidak di BCNF?
> > - Mengapa `in_dep` tidak di 3NF?
> > - Apa kelebihan dan kekurangan 3NF dibanding BCNF?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 23-26)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.3.3-7.3.4
>
> > ### Definisi 3NF
> >
> > Skema $R$ berada di **3NF** bila untuk **setiap** FD $\alpha \rightarrow \beta$ di $F^+$, **minimal satu** benar:
> >
> > 1. $\alpha \rightarrow \beta$ **trivial** ($\beta \subseteq \alpha$);
> > 2. $\alpha$ adalah **superkey** dari $R$;
> > 3. **Setiap atribut** $A$ di $\beta - \alpha$ **terkandung di suatu candidate key** dari $R$.
> >
> > Catatan: tiap atribut boleh berada di candidate key yang **berbeda**.
> >
> > - Bila relasi di **BCNF**, ia pasti di **3NF** (BCNF hanya mengizinkan kondisi 1 atau 2).
> > - Kondisi ketiga adalah **relaksasi minimal** dari BCNF agar **dependency preservation** tetap tercapai.
> >
> > ### Contoh 1: `dept_advisor` di 3NF
> >
> > ```
> > dept_advisor = (s_ID, i_ID, dept_name)
> > F = { i_ID → dept_name,  s_ID, dept_name → i_ID }
> > ```
> >
> > - Dua candidate key: `{s_ID, dept_name}` dan `{s_ID, i_ID}`.
> > - **Tidak BCNF**: `i_ID → dept_name` dengan `i_ID` bukan superkey.
> > - **Tetapi 3NF**: `{dept_name} − {i_ID} = {dept_name}`, dan `dept_name` **terkandung dalam candidate key** `{s_ID, dept_name}`.
> >
> > ### Contoh 2: `in_dep` Tidak 3NF
> >
> > ```
> > in_dep = (ID, name, salary, dept_name, building, budget)
> > F = { ID → name salary dept_name,  dept_name → building budget }
> > ```
> >
> > - Candidate key: `ID`.
> > - `dept_name → building budget`: `dept_name` bukan superkey, dan `building`, `budget` **tidak** bagian dari candidate key → **tidak 3NF** (dan tidak BCNF).
> > - Dekomposisi: `instructor(ID, name, salary, dept_name)` dengan $\{ID \rightarrow name, salary, dept\_name\}$ dan `department(dept_name, building, budget)` dengan $\{dept\_name \rightarrow building, budget\}$ — keduanya **3NF bahkan BCNF**.
> >
> > ### Perbandingan BCNF vs 3NF
> >
> > | Aspek | 3NF | BCNF |
> > | --- | --- | --- |
> > | Lossless | Selalu bisa | Selalu bisa |
> > | Dependency preserving | **Selalu bisa** | Tidak selalu |
> > | Redundancy | Mungkin masih ada | Minimal |
> > | `null` untuk relasi bermakna | Mungkin perlu | Tidak |
> >
> > **Kelebihan 3NF:** selalu mungkin memperoleh desain 3NF **tanpa mengorbankan lossless maupun dependency preservation**.
> > **Kekurangan 3NF:** mungkin perlu **nilai null** untuk merepresentasikan sebagian hubungan bermakna, dan masih ada masalah **pengulangan informasi**.
> >
> > ```mermaid
> > flowchart LR
> >     NF1["1NF<br/>domain atomik"] --> NF2["2NF<br/>tanpa partial dependency"]
> >     NF2 --> NF3["3NF<br/>+ kondisi key-prime"]
> >     NF3 --> BC["BCNF<br/>setiap determinan = superkey"]
> > ```

> [!cornell] #### Summary
>
> **3NF**: untuk setiap FD $\alpha \rightarrow \beta$ di $F^+$ — trivial, **atau** $\alpha$ superkey, **atau** setiap atribut di $\beta - \alpha$ terkandung dalam **candidate key**. BCNF ⊂ 3NF; kondisi ketiga adalah relaksasi minimal BCNF demi **dependency preservation**. `dept_advisor` 3NF namun tidak BCNF; `in_dep` tidak 3NF sehingga dipecah menjadi `instructor` + `department`. **3NF** selalu bisa dicapai lossless & dependency preserving tetapi mungkin masih redundan/memerlukan `null`; **BCNF** lebih bersih namun bisa kehilangan dependency preservation.

> [!ad-libitum]- Additional Information
>
> #### Algoritma sintesis 3NF
>
> Hitung **canonical cover** $F_c$ → buat satu skema $(\alpha, \beta)$ per FD → tambahkan skema berisi candidate key bila belum ada → buang skema yang termuat di skema lain. Hasilnya dijamin lossless dan dependency preserving.
>
> #### Mnemonik
>
> "*Every non-key attribute must provide a fact about the key (1NF), the whole key (2NF), and nothing but the key (3NF/BCNF), so help me Codd.*"
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil tiga skema lain dari soal latihan (atau dari proyek) dan klasifikasikan masing-masing: 1NF/2NF/3NF/BCNF, lengkap dengan alasan FD-nya.
> 2. Jalankan algoritma sintesis 3NF pada `dept_advisor` dan bandingkan hasilnya dengan skema asal.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.3.3-7.3.4, 7.5.
> - Kent, W. (1983). "A Simple Guide to Five Normal Forms".
