---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Functional Dependency dan Keys
>
> > ## Questions/Cues
> >
> > - Apa tujuan **teori normalisasi** dan apa tiga syarat dekomposisi yang baik?
> > - Apa itu **functional dependency (FD)** dan bagaimana definisi formalnya?
> > - Apa itu **legal instance** dari sebuah relasi?
> > - Bagaimana FD berhubungan dengan **superkey** dan **candidate key**?
> > - FD apa yang kita harapkan (dan tidak harapkan) berlaku pada `in_dep`?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 9-13)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.4 (Functional Dependency Theory)
>
> > ### Tujuan Teori Normalisasi
> >
> > Teori normalisasi bertugas:
> >
> > 1. Memutuskan apakah suatu relasi $R$ berada dalam **bentuk yang baik (good form)**.
> > 2. Bila tidak, **mendekomposisi** $R$ menjadi $\{R_1, R_2, \dots, R_n\}$ sehingga:
> >    - setiap relasi berada dalam good form,
> >    - dekomposisi **lossless**,
> >    - sebaiknya **dependency preserving**.
> >
> > Landasan teorinya: **functional dependencies** dan **multivalued dependencies**.
> >
> > ### Constraint di Dunia Nyata
> >
> > Di basis data universitas, kita mengharapkan aturan seperti:
> >
> > - Mahasiswa dan dosen dikenali secara unik oleh **ID**.
> > - Setiap mahasiswa/dosen hanya punya **satu nama**.
> > - Setiap mahasiswa/dosen (utamanya) terkait dengan **satu departemen**.
> > - Setiap departemen punya **satu budget** dan **satu gedung**.
> >
> > Sebuah **instance** relasi yang memenuhi semua aturan ini disebut **legal instance**; basis data legal bila semua relasinya legal. Constraint semacam ini menyatakan bahwa nilai sekumpulan atribut **menentukan secara unik** nilai himpunan atribut lain. **FD adalah generalisasi dari konsep key.**
> >
> > ### Definisi Formal
> >
> > Misalkan $R$ skema relasi, $\alpha \subseteq R$ dan $\beta \subseteq R$. FD
> >
> > $$\alpha \rightarrow \beta$$
> >
> > berlaku pada $R$ **jika dan hanya jika** untuk setiap relasi legal $r(R)$, bila dua tuple $t_1$ dan $t_2$ sama pada $\alpha$, maka keduanya juga sama pada $\beta$:
> >
> > $$t_1[\alpha] = t_2[\alpha] \Rightarrow t_1[\beta] = t_2[\beta]$$
> >
> > **Contoh** $r(A,B)$ dengan tuple $(1,4), (1,5), (3,7)$:
> >
> > - $B \rightarrow A$ **berlaku** (tiap nilai B hanya muncul sekali).
> > - $A \rightarrow B$ **tidak berlaku** (A = 1 punya B = 4 dan 5).
> >
> > ### FD dan Keys
> >
> > - $K$ adalah **superkey** dari $R$ jika dan hanya jika $K \rightarrow R$.
> > - $K$ adalah **candidate key** dari $R$ jika dan hanya jika $K \rightarrow R$ dan **tidak ada** $\alpha \subset K$ dengan $\alpha \rightarrow R$ (minimal).
> >
> > FD mampu menyatakan constraint yang **tidak bisa dinyatakan dengan superkey** saja. Untuk
> >
> > ```
> > in_dep = (ID, name, salary, dept_name, building, budget)
> > ```
> >
> > kita mengharapkan: `dept_name → building`, `ID → building`; tetapi **tidak** `dept_name → salary` (banyak dosen berbeda gaji di departemen yang sama).
> >
> > ```mermaid
> > flowchart LR
> >     ID["ID"] --> N["name"]
> >     ID --> S["salary"]
> >     ID --> D["dept_name"]
> >     D --> B["building"]
> >     D --> BU["budget"]
> > ```
> >
> > Diagram menunjukkan $ID \rightarrow dept\_name$ dan $dept\_name \rightarrow building, budget$ — sehingga $ID \rightarrow building$ secara **transitif**. `dept_name` bukan superkey `in_dep`, itulah sumber redundancy.

> [!cornell] #### Summary
>
> Normalisasi memeriksa apakah relasi $R$ dalam **good form**; bila tidak, dekomposisi harus **lossless** dan sebaiknya **dependency preserving**. **FD** $\alpha \rightarrow \beta$ berlaku bila dua tuple yang sama di $\alpha$ pasti sama di $\beta$ — generalisasi dari key. $K$ adalah **superkey** iff $K \rightarrow R$, dan **candidate key** bila minimal. Pada `in_dep`, `dept_name → building` berlaku tetapi `dept_name` bukan superkey, sehingga muncul redundancy.

> [!ad-libitum]- Additional Information
>
> #### Armstrong's axioms
>
> $F^+$ (closure) diturunkan dengan aksioma **reflexivity** ($\beta \subseteq \alpha \Rightarrow \alpha \rightarrow \beta$), **augmentation** ($\alpha \rightarrow \beta \Rightarrow \gamma\alpha \rightarrow \gamma\beta$), dan **transitivity**. Aturan turunan: union, decomposition, pseudotransitivity.
>
> #### Attribute closure
>
> Untuk mengecek apakah $\alpha$ superkey, hitung $\alpha^+$: mulai dari $\alpha$, tambahkan sisi kanan FD yang sisi kirinya sudah termuat, ulangi hingga stabil. $\alpha$ superkey bila $\alpha^+ = R$. Ini cara tercepat menemukan candidate key di soal ujian.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis fungsi Python `closure(attrs, fds)` dan pakai untuk mencari seluruh candidate key dari `in_dep`.
> 2. Cek dengan data nyata: tulis query `GROUP BY dept_name HAVING count(DISTINCT building) > 1` untuk membuktikan FD `dept_name → building` berlaku di instance Anda.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.4.
> - Armstrong, W. W. (1974). "Dependency Structures of Data Base Relationships".
