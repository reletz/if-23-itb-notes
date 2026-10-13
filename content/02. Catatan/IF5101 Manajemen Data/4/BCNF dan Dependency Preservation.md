---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] BCNF dan Dependency Preservation
>
> > ## Questions/Cues
> >
> > - Apa definisi **Boyce-Codd Normal Form (BCNF)**?
> > - Apa itu FD **trivial**?
> > - Mengapa `in_dep` tidak berada di BCNF?
> > - Apa itu **dependency preservation**?
> > - Mengapa tidak selalu mungkin mencapai BCNF *sekaligus* dependency preserving?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 18-22)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.3.1-7.3.2
>
> > ### Definisi BCNF
> >
> > Skema $R$ berada di **BCNF** terhadap himpunan FD $F$ jika untuk **setiap** FD $\alpha \rightarrow \beta$ di $F^+$ dengan $\alpha \subseteq R$ dan $\beta \subseteq R$, **minimal satu** berikut benar:
> >
> > 1. $\alpha \rightarrow \beta$ **trivial** (yaitu $\beta \subseteq \alpha$), atau
> > 2. $\alpha$ adalah **superkey** dari $R$.
> >
> > FD **trivial** adalah FD yang selalu dipenuhi oleh semua instance relasi; secara umum $\alpha \rightarrow \beta$ trivial bila $\beta \subseteq \alpha$ (mis. $\{ID, name\} \rightarrow name$).
> >
> > Intuisi: *setiap determinan harus berupa key* — tidak ada fakta yang "ditentukan" oleh sesuatu yang bukan key.
> >
> > ### Contoh: `in_dep` Tidak BCNF
> >
> > ```
> > in_dep = (ID, name, salary, dept_name, building, budget)
> > F = { ID → name salary dept_name,  dept_name → building budget }
> > ```
> >
> > `dept_name → building budget` berlaku, tetapi `dept_name` **bukan superkey** `in_dep`. Jadi `in_dep` **tidak** di BCNF. Dekomposisi menjadi `instructor(ID, name, salary, dept_name)` dan `department(dept_name, building, budget)` menghasilkan dua skema BCNF.
> >
> > ### Dependency Preservation
> >
> > **Dependency preserving**: FD dapat **ditegakkan di dalam satu relasi** tanpa harus *join* dua relasi atau lebih. Tidak selalu mungkin mencapai BCNF *dan* dependency preservation sekaligus.
> >
> > #### Contoh: `dept_advisor`
> >
> > ```
> > dept_advisor = (s_ID, i_ID, dept_name)
> > F = { i_ID → dept_name,   s_ID, dept_name → i_ID }
> > ```
> >
> > - `i_ID → dept_name` ada, tetapi `i_ID` bukan superkey → **tidak BCNF**.
> > - Dekomposisi menurut BCNF: `A = (i_ID, dept_name)` dengan $F_A = \{i\_ID \rightarrow dept\_name\}$ dan `B = (s_ID, i_ID)` dengan $F_B = \{\}$.
> > - FD `s_ID, dept_name → i_ID` memakai atribut dari **A dan B sekaligus**, sehingga baru bisa dicek dengan **join**.
> > - Maka dekomposisi ini **bukan dependency preserving**.
> >
> > ```mermaid
> > flowchart TD
> >     D["dept_advisor<br/>(s_ID, i_ID, dept_name)"]
> >     D -->|"dekomposisi BCNF"| A["A (i_ID, dept_name)<br/>i_ID &rarr; dept_name"]
> >     D --> B["B (s_ID, i_ID)<br/>tanpa FD"]
> >     A -.->|"s_ID, dept_name &rarr; i_ID<br/>perlu JOIN A dan B"| B
> > ```
> >
> > Konsekuensi praktis: bila FD tidak bisa ditegakkan lokal, DBMS harus menjalankan join setiap kali insert/update untuk memverifikasi — mahal, atau constraint dibiarkan tidak ditegakkan.

> [!cornell] #### Summary
>
> **BCNF**: untuk setiap FD $\alpha \rightarrow \beta$ di $F^+$, FD itu **trivial** atau $\alpha$ adalah **superkey**. `in_dep` tidak BCNF karena `dept_name → building budget` dengan `dept_name` bukan superkey. **Dependency preservation** berarti FD bisa ditegakkan tanpa join; **tidak selalu** kompatibel dengan BCNF — contoh `dept_advisor`, di mana dekomposisi BCNF `A(i_ID, dept_name)` + `B(s_ID, i_ID)` membuat `s_ID, dept_name → i_ID` hanya bisa dicek lewat join.

> [!ad-libitum]- Additional Information
>
> #### Algoritma dekomposisi BCNF
>
> Selama ada FD $\alpha \rightarrow \beta$ yang melanggar BCNF di $R_i$: ganti $R_i$ dengan $(R_i - \beta)$ dan $(\alpha, \beta)$. Hasilnya selalu **lossless**, tetapi dependency preservation tidak dijamin. Algoritma ini bisa bernilai eksponensial untuk mengecek, namun biasanya skema praktis kecil.
>
> #### Kenapa BCNF dan 3NF sama-sama dipakai
>
> Bila dependency preservation dianggap penting (FD sulit ditegakkan lewat join), pilih 3NF. Lihat [[Third Normal Form dan Perbandingan dengan BCNF]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel `dept_advisor` + dua tabel hasil dekomposisi BCNF. Coba masukkan data yang melanggar `s_ID, dept_name → i_ID` dan lihat bahwa DBMS tidak menolaknya tanpa trigger/join.
> 2. Tulis `ASSERTION`/trigger yang menegakkan FD tersebut dan ukur biayanya.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.3 dan 7.5 (BCNF decomposition algorithm).
> - Codd, E. F. (1974). "Recent Investigations into Relational Data Base Systems" (asal BCNF).
