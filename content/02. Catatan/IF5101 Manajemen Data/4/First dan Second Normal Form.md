---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] First dan Second Normal Form
>
> > ## Questions/Cues
> >
> > - Apa tujuan umum **normal form** dalam desain relasional?
> > - Apa arti **domain atomik** dan kapan relasi berada di **1NF**?
> > - Apa syarat sebuah relasi berada di **2NF**?
> > - Apa itu **partial dependency**?
> > - Mengapa `in_dep` ada di 2NF, tetapi `StudentCourse` tidak?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 14-17)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.2-7.3
>
> > ### Mengapa Normal Form?
> >
> > Tujuan desain relasional: menghasilkan sekumpulan skema yang menyimpan informasi **tanpa redundancy yang tidak perlu**, namun tetap **mudah di-query**. Dicapai dengan merancang skema dalam **normal form** yang sesuai: **1NF, 2NF, 3NF, dan BCNF**.
> >
> > ### First Normal Form (1NF)
> >
> > Sebuah domain **atomik** jika elemennya dianggap sebagai **unit yang tak terbagi**.
> >
> > - Contoh domain **non-atomik**: himpunan nama, atribut komposit, atau ID seperti `CS101` yang bisa dipecah (kode departemen + nomor).
> > - Skema $R$ berada di **1NF** bila **semua atribut** $R$ berdomain atomik.
> >
> > Nilai non-atomik mempersulit penyimpanan dan mendorong penyimpanan data **berulang**. Contoh: menyimpan *himpunan akun* di dalam tiap customer, atau *himpunan pemilik* di tiap akun.
> >
> > Dalam kuliah ini kita **mengasumsikan semua relasi sudah 1NF**.
> >
> > ### Second Normal Form (2NF)
> >
> > Skema $R$ berada di **2NF** bila **setiap atribut $A$** di $R$ memenuhi salah satu:
> >
> > 1. $A$ **muncul di suatu candidate key**, atau
> > 2. $A$ **tidak bergantung parsial** pada candidate key (bergantung pada *seluruh* key, bukan sebagian).
> >
> > **Partial dependency** = atribut non-key yang ditentukan oleh *sebagian* dari candidate key komposit.
> >
> > #### Contoh 1: `in_dep` lolos 2NF
> >
> > ```
> > in_dep = (ID, name, salary, dept_name, building, budget)
> > F = { ID → name salary dept_name,  dept_name → building budget }
> > ```
> >
> > - Candidate key: `ID` (tunggal).
> > - Karena key tunggal, **tidak mungkin ada partial dependency**. `building` dan `budget` pun bergantung pada seluruh key: $ID \rightarrow dept\_name \rightarrow building, budget$.
> > - Maka `in_dep` berada di **2NF** (walaupun masih redundan — itulah alasan perlu 3NF/BCNF).
> >
> > #### Contoh 2: `StudentCourse` gagal 2NF
> >
> > ```
> > StudentCourse = (sID, sName, cID, cName, Grade)
> > F = { sID → sName,  cID → cName,  sID cID → Grade }
> > ```
> >
> > | sID | sName | cID | cName | Grade |
> > | --- | --- | --- | --- | --- |
> > | 18219500 | Clark | IF2140 | Database Modeling | A |
> > | 18219500 | Clark | IF2240 | Database | B |
> > | 13519300 | Bruce | IF3140 | Database Technologies | B |
> > | 13519300 | Bruce | II2250 | Database Systems | A |
> > | 13518550 | Diana | IF2240 | Database | B |
> >
> > - Candidate key: `{sID, cID}`.
> > - `sName` hanya bergantung pada `sID`, `cName` hanya pada `cID` → **partial dependency**.
> > - Maka `StudentCourse` hanya di **1NF**, bukan 2NF. Terlihat dari redundancy: "Clark" dan "Database" berulang.
> >
> > ```mermaid
> > flowchart LR
> >     K["candidate key<br/>{sID, cID}"] --> G["Grade<br/>(full dependency)"]
> >     S["sID"] -->|"partial"| SN["sName"]
> >     C["cID"] -->|"partial"| CN["cName"]
> > ```
> >
> > Perbaikan: dekomposisi menjadi `Student(sID, sName)`, `Course(cID, cName)`, `Enroll(sID, cID, Grade)`.

> [!cornell] #### Summary
>
> **Normal form** menjaga skema bebas redundancy tetapi tetap mudah di-query. **1NF**: semua atribut berdomain **atomik**. **2NF**: tiap atribut **muncul di candidate key** atau **tidak bergantung parsial** pada candidate key. `in_dep` (key `ID`) lolos 2NF karena key tunggal; `StudentCourse` (key `{sID, cID}`) gagal karena `sName` bergantung pada `sID` saja dan `cName` pada `cID` saja, sehingga hanya 1NF dan perlu dipecah menjadi `Student`, `Course`, dan `Enroll`.

> [!ad-libitum]- Additional Information
>
> #### 1NF di praktik modern
>
> Banyak DBMS modern menyimpan array/JSON di kolom (PostgreSQL `jsonb`, `text[]`). Itu secara teori melanggar 1NF, tapi dipakai sadar untuk data semi-terstruktur. Konsekuensinya: constraint dan join pada isi kolom tersebut lebih sulit ditegakkan.
>
> #### Mengapa 2NF jarang disebut sendirian
>
> Bila semua candidate key tunggal, 2NF otomatis terpenuhi. Praktisi biasanya langsung menargetkan 3NF/BCNF yang sudah *mencakup* 2NF.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Dekomposisikan `StudentCourse` menjadi tiga tabel, isi data yang sama, lalu buktikan `JOIN` ketiganya mereproduksi tabel asli.
> 2. Cari tabel di proyek Anda yang punya key komposit dan periksa partial dependency-nya.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.2-7.3.
> - Kent, W. (1983). "A Simple Guide to Five Normal Forms in Relational Database Theory".
