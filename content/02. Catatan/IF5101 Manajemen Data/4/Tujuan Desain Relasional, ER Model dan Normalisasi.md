---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Tujuan Desain Relasional, ER Model dan Normalisasi
>
> > ## Questions/Cues
> >
> > - Apa tiga tujuan desain relasional?
> > - Apa yang harus dipilih bila ketiganya tidak dapat dipenuhi bersamaan?
> > - Mengapa ER diagram yang baik biasanya tidak memerlukan normalisasi lagi?
> > - Dalam kondisi apa FD tetap muncul walau sudah mulai dari ER?
> > - Apa kaitan contoh `employee` dengan `department_name → building`?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 27-28)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7.6 (Normalization and ER)
>
> > ### Tujuan Desain Relasional
> >
> > Setiap relasi perlu berada dalam **good form: BCNF**. Bila relasi tidak good form, dekomposisi menjadi kumpulan relasi dengan syarat:
> >
> > 1. Setiap skema hasil dalam **BCNF**.
> > 2. Dekomposisi **lossless**.
> > 3. Dekomposisi **sebaiknya dependency preserving**.
> >
> > Bila ketiganya tidak dapat dipenuhi bersamaan, kita **terpaksa memilih** antara:
> >
> > - **BCNF**, tetapi tidak semua dependency terjaga, atau
> > - **3NF**, tetapi dengan sedikit redundancy.
> >
> > ```mermaid
> > flowchart TD
> >     S["Skema R"] --> Q{"R sudah BCNF?"}
> >     Q -->|"ya"| OK["selesai"]
> >     Q -->|"tidak"| DEC["dekomposisi (wajib lossless)"]
> >     DEC --> P{"semua FD terjaga<br/>tanpa join?"}
> >     P -->|"ya"| OK
> >     P -->|"tidak"| CH["pilih:<br/>BCNF tanpa preservation<br/>atau 3NF dengan sedikit redundancy"]
> > ```
> >
> > ### ER Model dan Normalisasi
> >
> > Bila **ER diagram dirancang dengan cermat** dan semua entitas teridentifikasi benar, tabel hasil konversinya **seharusnya tidak perlu dinormalisasi lagi**.
> >
> > Namun pada desain nyata yang tidak sempurna, bisa ada **FD dari atribut non-key ke atribut lain dalam entitas yang sama**:
> >
> > - Contoh: entity set `employee` memiliki atribut `department_name` dan `building`.
> > - FD: `department_name → building`.
> > - Desain yang baik seharusnya menjadikan **`department` sebagai entity** tersendiri (dan `employee` berelasi ke dalamnya).
> >
> > FD dari atribut non-key pada **relationship set** mungkin ada tetapi **jarang**, karena sebagian besar relationship bersifat **biner**.
> >
> > ### Alur Kerja yang Dianjurkan
> >
> > 1. Rancang ER diagram dengan teliti → konversi ke skema relasional (lihat [[Reduksi Entity Set ke Skema Relasional]]).
> > 2. Tuliskan FD yang berlaku di domain.
> > 3. Periksa tiap skema terhadap BCNF/3NF; dekomposisi bila perlu.
> > 4. Putuskan trade-off BCNF vs 3NF dan dokumentasikan.

> [!cornell] #### Summary
>
> Tujuan desain: tiap relasi **BCNF**, dekomposisi **lossless**, dan sebaiknya **dependency preserving**; bila tak bisa semuanya, pilih **BCNF tanpa preservation** atau **3NF dengan redundancy**. ER diagram yang cermat umumnya menghasilkan tabel yang sudah ternormalisasi, tetapi desain tak sempurna dapat memunculkan **FD non-key** (mis. `department_name → building` pada `employee`); solusinya menjadikan `department` sebuah **entity**. FD di relationship set jarang karena kebanyakan relasi biner.

> [!ad-libitum]- Additional Information
>
> #### Normalisasi sebagai verifikasi ER
>
> Anggap normalisasi sebagai *unit test* untuk model ER: FD yang "bocor" menandakan entitas yang belum dipisah. Jauh lebih murah diperbaiki di diagram daripada setelah data masuk produksi.
>
> #### Di luar BCNF
>
> Ada **4NF** (menangani multivalued dependency) dan **5NF** (join dependency). Pada kuliah ini fokus sampai BCNF/3NF, tetapi MVD disebut sebagai landasan teori di awal bab.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil ERD tugas besar Anda; tuliskan FD tiap tabel dan periksa BCNF.
> 2. Rancang sengaja `employee(ID, name, department_name, building)`, lalu normalisasi dan tunjukkan kembali menjadi dua entity.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.6-7.8.
> - Fagin, R. (1977). "Multivalued Dependencies and a New Normal Form for Relational Databases".
