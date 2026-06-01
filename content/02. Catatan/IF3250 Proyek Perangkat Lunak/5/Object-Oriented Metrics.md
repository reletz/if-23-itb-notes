---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Object-Oriented Metrics
>
> > ## Questions/Cues
> >
> > - Metrik OO apa saja yang umum dipakai?
> > - Apa itu WMC, dan apa viewpoint Chidamber & Kemerer?
> > - Bagaimana DIT, NOC, NOO, NOA mengukur hierarki inheritance?
> > - Apa rumus PF dan MIF?
> > - Bagaimana coupling diukur (RFC, CF, CBO, MPC)?
> > - Bagaimana cara menghitung LCOM?
> >
> > ## Reference Points
> >
> > - Software Quality and Metrics (Halaman 41-50)
> > - Software Quality and Metrics (Halaman 51-56)
>
> > ### Daftar Metrik untuk Software Berorientasi Objek
> >
> > - **WMC** (Weighted Methods per Class)
> > - **CS** (Class Size)
> > - **NoC** (Number of Children)
> > - **PF** (Polymorphism Factor)
> > - **DIT** (Depth of Inheritance Tree)
> > - **NOO** (Number of Operations Overridden)
> > - **NOA** (Number of Operations Added)
> > - **MIF** (Method Inheritance Factor)
> > - **Coupling Metrics**: RFC (Response For a Class), CF (Coupling Factor), MPC (Message Passing Coupling), CBO (Coupling Between Objects)
> > - **LCOM** (Lack of Cohesion of Methods)
> >
> > ### Weighted Methods per Class (WMC)
> >
> > $$WMC = \sum_{i=1}^{n} c_i$$
> >
> > di mana $c_i$ = kompleksitas (mis. volume, cyclomatic complexity, dll.) tiap method. **Viewpoint (Chidamber & Kemerer)**:
> >
> > - Jumlah & kompleksitas method = indikator **berapa banyak waktu & effort** untuk mengembangkan dan memelihara objek.
> > - Semakin banyak method dalam objek, **semakin besar dampak potensial ke children**.
> > - Objek dengan banyak method cenderung lebih **application specific**, sehingga **membatasi reuse**.
> >
> > ### Class Size (CS)
> >
> > **CS** = total jumlah operations (inherited, private, public) + jumlah attributes (inherited, private, public). Bisa menjadi indikasi **terlalu banyak tanggung jawab** pada satu class.
> >
> > ### Number of Children (NOC)
> >
> > **NOC** = jumlah subclass yang langsung subordinate ke sebuah class. **Viewpoint**:
> >
> > - Saat NOC bertambah, **reuse meningkat** — tetapi abstraksi bisa **terdilusi**.
> > - **Depth umumnya lebih baik dari breadth** dalam hierarki class karena mendorong reuse method via inheritance.
> > - Class lebih tinggi di hierarki seharusnya punya lebih banyak subclass daripada yang lebih bawah.
> > - NOC memberi gambaran potensi pengaruh sebuah class pada desain: class dengan banyak children mungkin **butuh lebih banyak testing**.
> >
> > ### Polymorphism Factor (PF)
> >
> > $$PF = \frac{\sum_i M_o(C_i)}{\sum_i [M_n(C_i) \times DC(C_i)]}$$
> >
> > - $M_n()$ = jumlah method baru (new methods).
> > - $M_o()$ = jumlah method overriding.
> > - $DC()$ = jumlah descendant class dari sebuah base class.
> > - Yaitu jumlah method yang me-redefine method warisan, dibagi jumlah maksimum situasi polimorfik distinct yang mungkin.
> >
> > ### Depth of Inheritance Tree (DIT)
> >
> > **DIT** = panjang maksimum dari sebuah node ke root (base class). **Viewpoint**:
> >
> > - Subclass level rendah mewarisi banyak method → perilaku **lebih sulit diprediksi**.
> > - **Tree lebih dalam → kompleksitas desain lebih besar**.
> >
> > ### NOO dan NOA
> >
> > - **Number of Operations Overridden (NOO)** — NOO besar mengindikasikan kemungkinan **masalah desain** dan **abstraksi buruk** pada hierarki inheritance.
> > - **Number of Operations Added (NOA)** — jumlah operation yang ditambahkan sebuah subclass. Saat operation ditambah, ia makin jauh dari super class. **Seiring depth bertambah, NOA seharusnya berkurang**.
> >
> > ### Method Inheritance Factor (MIF)
> >
> > $$MIF = \frac{\sum_{i=1}^{n} M_i(C_i)}{\sum_{i=1}^{n} M_a(C_i)}$$
> >
> > - $M_i(C_i)$ = jumlah method yang diwarisi dan **tidak** di-override pada $C_i$.
> > - $M_a(C_i)$ = jumlah method yang dapat dipanggil dengan $C_i$.
> > - $M_d(C_i)$ = jumlah method yang dideklarasikan di $C_i$.
> >
> > Relasi: $M_a(C_i) = M_d(C_i) + M_i(C_i)$ ("semua yang bisa dipanggil = yang baru/overloaded + yang diwarisi"). **MIF ∈ [0,1]**: dekat **1** berarti sedikit spesialisasi; dekat **0** berarti perubahan besar.
> >
> > ### Coupling Metrics
> >
> > **Response for a Class (RFC)** = jumlah method yang bisa dipanggil sebagai respons terhadap pesan ke sebuah class (local + remote). Saat RFC naik: testing effort naik, kompleksitas objek naik, lebih sulit dipahami.
> >
> > **Coupling Factor (CF)**:
> >
> > $$CF = \frac{\sum_i \sum_j is\_client(C_i, C_j)}{TC^2 - TC}$$
> >
> > - $is\_client(x,y) = 1$ jika ada relasi antara client class dan server class; 0 jika tidak.
> > - $(TC^2 - TC)$ = total jumlah relasi yang mungkin.
> > - **CF ∈ [0,1]** dengan 1 = coupling tinggi.
> >
> > **Coupling Between Objects (CBO)** = jumlah kolaborasi antara dua class (fan-out sebuah class C) = jumlah class lain yang direferensikan di C. **Viewpoint**: saat kolaborasi naik, reuse turun; **high fan-out** = coupling tinggi (tidak diinginkan); **high fan-in** = desain objek baik & reuse tinggi; tidak mungkin mempertahankan high fan-in dan low fan-out di seluruh sistem.
> >
> > ### Lack of Cohesion in Methods (LCOM)
> >
> > Untuk class $C_k$ dengan $n$ method $M_1,...,M_n$, dan $I_j$ = himpunan instance variable yang dipakai $M_j$ (ada $n$ himpunan $I_1,...,I_n$):
> >
> > $$P = \{(I_i, I_j) \mid I_i \cap I_j = \varnothing\}, \qquad Q = \{(I_i, I_j) \mid I_i \cap I_j \neq \varnothing\}$$
> >
> > - Jika semua $I_i$ kosong → $P = \varnothing$.
> > - $LCOM = |P| - |Q|$ **jika** $|P| > |Q|$; selain itu $LCOM = 0$.
> >
> > **Contoh**: class $C$ dengan $M_1, M_2, M_3$, $I_1 = \{a,b,c,d,e\}$, $I_2 = \{a,b,e\}$, $I_3 = \{x,y,z\}$.
> > $P = \{(I_1,I_3), (I_2,I_3)\}$, $Q = \{(I_1,I_2)\}$ → $LCOM = |P|-|Q| = 2-1 = 1$.
> >
> > **Penjelasan**: LCOM = jumlah intersection kosong dikurangi jumlah intersection tak-kosong — sebuah notion derajat **kemiripan method**. Jika dua method memakai instance variable yang sama, mereka "mirip". **LCOM = 0 belum tentu maximally cohesive** (terjadi saat $|P| = |Q|$ atau $|P| < |Q|$).

> [!cornell] #### Summary
>
> Metrik OO mengukur dimensi yang tak tertangkap LOC. **WMC** = jumlah kompleksitas method (effort & dampak ke children). **Hierarki inheritance** diukur oleh **DIT** (kedalaman), **NOC** (jumlah anak), **NOO/NOA** (override/added), serta **MIF** dan **PF**. **Coupling** diukur oleh **RFC, CF, CBO** (high fan-out buruk, high fan-in baik). **Kohesi** diukur oleh **LCOM** = $|P|-|Q|$ jika $|P|>|Q|$ (jumlah pasangan method tanpa instance variable bersama dikurangi yang berbagi). Metrik-metrik ini diturunkan dari tradisi **Chidamber & Kemerer** dan dapat dihitung otomatis — lihat [[Software Measurement Tools]].

> [!ad-libitum]- Additional Information
>
> #### Chidamber & Kemerer (CK) Suite
>
> Subset paling terkenal — **CBO, DIT, LCOM, NOC, RFC, WMC** — dikenal sebagai *CK metrics suite* dan paling banyak didukung tools (mis. MetricsReloaded). Mereka menargetkan tiga pilar desain OO: **inheritance (DIT, NOC), coupling (CBO, RFC), dan cohesion (LCOM)**.
>
> #### High Fan-in vs High Fan-out
>
> *Fan-in* tinggi (banyak yang memanggil class ini) menandakan class tersebut adalah komponen reusable yang berharga. *Fan-out* tinggi (class ini memanggil banyak class lain) menandakan ketergantungan besar → rapuh terhadap perubahan. Desain baik mengejar **low coupling, high cohesion**.
>
> #### Further Reading
>
> - Chidamber & Kemerer, "A Metrics Suite for Object Oriented Design", *IEEE TSE*, 1994.
