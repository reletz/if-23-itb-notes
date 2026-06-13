---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Carbon Chemistry, Macromolecular Classes, and ATP
>
> > ## Questions/Cues
> >
> > - Mengapa **karbon** menjadi tulang punggung molekul kehidupan?
> > - Apa empat kelas makromolekul utama dan apa kesamaannya?
> > - Bagaimana **monomer** disusun menjadi **polimer** (dehydration synthesis) dan dipecah kembali (hydrolysis)?
> > - Apa struktur **ATP** dan bagaimana hidrolisisnya memberi energi?
> > - Bagaimana **energy coupling** menggerakkan reaksi endergonik?
> >
> > ## Reference Points
> >
> > - IF3211 — Macromolecules (PPT 2, bagian Makromolekul: Carbon & Hydrocarbons)
> > - IF3211 — Macromolecules (PPT 2, bagian ATP & Energy Coupling)
> > - IF3211 — Macromolecules (PPT 2, bagian Polymers from Monomers)
>
> > ### Karbon: Kerangka Universal Kehidupan
> >
> > Hampir semua molekul makhluk hidup dibangun di atas unsur **karbon (C)**. Karbon istimewa karena memiliki **empat elektron valensi**, sehingga dapat membentuk **empat ikatan kovalen** sekaligus — termasuk dengan sesama karbon. Ini memungkinkan terbentuknya rantai panjang, cabang, dan cincin yang sangat bervariasi. Senyawa yang mengandung karbon disebut **senyawa organik (organic compound)**.
> >
> > Bentuk paling sederhana adalah **hidrokarbon (hydrocarbon)**, yaitu molekul yang hanya terdiri dari karbon dan hidrogen. Ikatan C–H bersifat **nonpolar** dan menyimpan banyak energi; itulah sebabnya lemak (yang berkomponen hidrokarbon) dan bahan bakar fosil melepaskan energi besar saat dibakar. Sifat dan reaktivitas molekul organik sering ditentukan oleh **gugus fungsi (functional groups)** seperti hidroksil, karbonil, karboksil, amino, dan fosfat yang menempel pada kerangka karbon.
> >
> > ### Empat Kelas Makromolekul
> >
> > Molekul penting kehidupan jatuh ke dalam **empat kelas utama**: **karbohidrat (carbohydrates)**, **lipid (lipids)**, **protein (proteins)**, dan **asam nukleat (nucleic acids)**. Tiga di antaranya — karbohidrat, protein, dan asam nukleat — dapat membentuk **makromolekul** raksasa, yaitu **polimer** yang terdiri dari ribuan unit penyusun. Lipid adalah pengecualian: ia *tidak* membentuk polimer sejati (lihat [[Lipids and Hydrophobic Molecules]]).
> >
> > Sebuah **polimer (polymer)** adalah molekul panjang yang terdiri dari banyak blok pembangun serupa yang disebut **monomer (monomer)**. Analoginya seperti kereta api yang dirangkai dari gerbong-gerbong identik. Menariknya, beberapa molekul yang berperan sebagai monomer juga punya fungsi sendiri (mis. glukosa sebagai bahan bakar sekaligus monomer pati).
> >
> > ### Dehydration Synthesis vs Hydrolysis
> >
> > Penyusunan dan pembongkaran polimer adalah dua reaksi yang saling berkebalikan dan keduanya melibatkan air:
> >
> > - **Dehydration synthesis (kondensasi)**: dua monomer disambung dengan **melepaskan satu molekul air (H₂O)**. Satu monomer menyumbang –OH, yang lain menyumbang –H. Reaksi ini *membangun* ikatan dan membutuhkan energi.
> > - **Hydrolysis (hidrolisis)**: ikatan antar monomer dipecah dengan **menambahkan air** — air "disisipkan" untuk memutus ikatan. Reaksi ini *membongkar* polimer (mis. pencernaan makanan).
> >
> >
> > ```mermaid
> > flowchart LR
> >     M["Monomer + Monomer"] -- "Dehydration<br/>(− H₂O)" --> P["Polimer<br/>(rantai panjang)"]
> >     P -- "Hydrolysis<br/>(+ H₂O)" --> M
> > ```
> >
> >
> > ### ATP: Mata Uang Energi Sel
> >
> > **ATP (adenosine triphosphate)** adalah molekul fosfat organik yang menjadi sumber energi utama untuk proses seluler. Strukturnya: sebuah molekul **adenosine** (adenin + ribosa) yang terhubung ke **rangkaian tiga gugus fosfat**. Ikatan antar fosfat ini menyimpan potensi untuk bereaksi dengan air.
> >
> > **Hidrolisis ATP** memutus fosfat terminal menjadi **ADP + Pᵢ (fosfat anorganik)** dan melepaskan energi — reaksi ini bersifat **exergonic** (melepas energi). Energi tersebut dipakai untuk menjalankan reaksi **endergonic** (yang butuh energi) lewat mekanisme **energy coupling**: ATP memindahkan gugus fosfat ke molekul lain (**phosphorylation**), menghasilkan **phosphorylated intermediate** yang lebih reaktif. Secara keseluruhan, pasangan reaksi terkopel menjadi eksergonik. Sel kemudian me-*recharge* ADP kembali menjadi ATP dalam **siklus ATP** — mirip baterai yang diisi ulang.
> >
> > ### Computational Framing: Makromolekul sebagai String atas Alphabet
> >
> > Bagi mahasiswa informatika, makromolekul polimer paling intuitif dipandang sebagai **string atas sebuah alphabet hingga (finite alphabet)**. Asam nukleat = string atas `{A, C, G, T}` (4 simbol); protein = string atas 20 asam amino. **Dehydration synthesis** adalah operasi `append`/konkatenasi yang menambah satu simbol ke string sambil "membayar" biaya (energi); **hydrolysis** adalah operasi pemotongan (`split`) yang mengembalikan biaya itu.
> >
> > ATP berperan seperti **token energi** dalam sistem ini. Bayangkan setiap operasi tulis (membangun ikatan) memerlukan satu "kredit" yang ditarik dari pool ATP; ketika kredit habis, sel harus me-*recharge*-nya. Ini analog dengan **rate limiting** atau **token bucket** dalam sistem terdistribusi: operasi mahal hanya berjalan jika token tersedia, dan token diisi ulang secara berkelanjutan. **Energy coupling** sendiri adalah pola desain: gabungkan operasi yang "menguntungkan secara energi" dengan yang "merugikan" agar total **net cost** menjadi feasible — persis seperti **amortized analysis** di mana operasi murah mensubsidi operasi mahal.

> [!cornell] #### Summary
>
> Kehidupan berbasis **karbon** karena empat ikatan kovalennya memungkinkan keragaman molekul tak tertandingi; bentuk paling sederhananya adalah **hidrokarbon** yang kaya energi. Molekul penting dikelompokkan ke **empat kelas**: **karbohidrat**, **lipid**, **protein**, dan **asam nukleat**. Tiga kelas pertama (kecuali lipid) membentuk **polimer** dari **monomer** melalui **dehydration synthesis** (melepas H₂O untuk membangun ikatan) dan dibongkar lewat **hydrolysis** (menambah H₂O). **ATP** — adenosine + tiga fosfat — adalah mata uang energi sel; **hidrolisis ATP** yang eksergonik menggerakkan reaksi endergonik melalui **energy coupling** dan **phosphorylation**, lalu di-*recharge* dalam siklus ATP. Secara komputasi, polimer adalah **string atas alphabet** dan ATP adalah **token energi** yang membatasi operasi tulis. Lihat juga [[Carbohydrates - Structure and Function]] dan [[Proteins - From Sequence to Three-Dimensional Structure]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Gugus Fungsi dan Reaktivitas
>
> Sifat kimia molekul organik sering ditentukan bukan oleh kerangka karbon, melainkan oleh **gugus fungsi** yang menempel. Tujuh gugus penting biologis: **hydroxyl (–OH)**, **carbonyl (C=O)**, **carboxyl (–COOH)**, **amino (–NH₂)**, **sulfhydryl (–SH)**, **phosphate (–OPO₃²⁻)**, dan **methyl (–CH₃)**. Gugus karboksil dan amino menjelaskan mengapa asam amino bisa berperan sebagai asam *dan* basa (amfoter). Gugus fosfat menjadikan ATP "bermuatan tinggi" sehingga hidrolisisnya melepas energi.
>
> #### CS Angle: Polimer sebagai Abstract Data Type
>
> Polimer biologis dapat dimodelkan sebagai **linked list** atau **string**: setiap monomer adalah node, ikatan kovalen adalah pointer. Operasi `dehydration` ≈ `insert at tail`, `hydrolysis` ≈ `delete`/`split`. Karena rantai punya orientasi (mis. protein N-terminus → C-terminus, DNA 5'→3'), strukturnya adalah **directed sequence**, bukan set. Hal ini penting: membalik string mengubah maknanya, sama seperti membalik urutan instruksi mengubah program. Energi (ATP) memodelkan **cost model** komputasi — tiap operasi punya biaya yang harus dianggarkan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis program Python yang merepresentasikan polimer sebagai string, lalu implementasikan fungsi `dehydration(a, b)` (konkatenasi dengan penghitung "molekul air yang dilepas") dan `hydrolysis(poly, i)` (memotong di indeks `i`).
> 2. Modelkan **token bucket** sederhana yang merepresentasikan pool ATP: tiap "operasi sintesis" mengurangi 1 token, dan token di-*refill* tiap tick. Amati kapan sistem ter-*throttle*.
> 3. Bandingkan kepadatan informasi (bit/simbol) antara DNA (alphabet 4) dan protein (alphabet 20) menggunakan teori informasi (log₂ alphabet).
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 3 — *Carbon and the Molecular Diversity of Life*.
> - Campbell Biology in Focus, 3rd ed., Chapter 6 — *An Introduction to Metabolism* (ATP & energy coupling).
> - Cover & Thomas, *Elements of Information Theory* — untuk perspektif alphabet & entropi pada biopolimer.
