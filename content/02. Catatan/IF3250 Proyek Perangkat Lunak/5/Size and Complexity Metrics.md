---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Size and Complexity Metrics
>
> > ## Questions/Cues
> >
> > - Apa itu size-oriented metrics (LOC/KLOC/SLOC)?
> > - Bagaimana Halstead's Software Science mengukur kompleksitas?
> > - Bagaimana menghitung McCabe Cyclomatic Complexity dari flow graph?
> > - Apa arti nilai V(G) dan batas amannya?
> > - Apa itu McClure's metric dan High-level Design Metrics (Card & Glass)?
> >
> > ## Reference Points
> >
> > - Software Quality and Metrics (Halaman 26-31)
> > - Software Quality and Metrics (Halaman 32-40)
>
> > ### Types of Measures & Size-Oriented Metrics
> >
> > - **Direct Measures (internal attributes)**: cost, effort, LOC, speed, memory.
> > - **Indirect Measures (external attributes)**: functionality, quality, complexity, efficiency, reliability, maintainability.
> >
> > **Size-Oriented Metrics** mengukur ukuran software yang diproduksi:
> >
> > - **LOC** — Lines Of Code.
> > - **KLOC** — 1000 Lines Of Code.
> > - **SLOC** — Statement Lines of Code (mengabaikan whitespace).
> > - Typical measures: **Errors/KLOC, Defects/KLOC, Cost/LOC, Documentation Pages/KLOC**.
> >
> > **LOC Metrics** mudah digunakan dan dihitung, **tetapi** bergantung pada **bahasa & programmer** — sehingga tidak adil untuk perbandingan lintas bahasa.
> >
> > ### Halstead's Complexity Measures (Software Science)
> >
> > LOC merepresentasikan fungsi kompleksitas tetapi language/programmer dependent — perlu lebih dari LOC. Halstead memakai **entropy measures** dari empat besaran dasar:
> >
> > - $\eta_1$ — jumlah **distinct operators**
> > - $\eta_2$ — jumlah **distinct operands**
> > - $N_1$ — total jumlah operators
> > - $N_2$ — total jumlah operands
> >
> > **Contoh** kode:
> >
> > ```c
> > if (k < 2)
> > {
> >   if (k > 3)
> >     x = x*k;
> > }
> > ```
> >
> > - Distinct operators: `if ( ) { } > < = * ;` → $\eta_1 = 10$
> > - Distinct operands: `k 2 3 x` → $\eta_2 = 4$
> > - $N_1 = 13$, $N_2 = 7$
> >
> > Ukuran turunan Halstead:
> >
> > | Ukuran | Rumus |
> > |---|---|
> > | Program vocabulary | $\eta = \eta_1 + \eta_2$ |
> > | Program length | $N = N_1 + N_2$ |
> > | Calculated estimated length | $\hat{N} = \eta_1 \log_2 \eta_1 + \eta_2 \log_2 \eta_2$ |
> > | Purity ratio | $PR = \hat{N}/N$ |
> > | Volume | $V = N \times \log_2 \eta$ |
> > | Difficulty | $D = \dfrac{\eta_1}{2} \times \dfrac{N_2}{\eta_2}$ |
> > | Effort | $E = D \times V$ |
> > | Time required to program | $T = \dfrac{E}{18}$ detik |
> > | Number of delivered bugs | $B = \dfrac{E^{2/3}}{3000}$ |
> >
> > **Difficulty** terkait sulitnya program ditulis atau dipahami (mis. saat code review).
> >
> > ### McCabe's Cyclomatic Complexity
> >
> > Metrik McCabe berbasis representasi **control flow** program. **Program graph** menggambarkan control flow: **node** = processing task (satu/lebih statement), **edge** = aliran kontrol antar node.
> >
> > **Flow Graph Notation** untuk struktur dasar: *Sequence*, *If-then-else*, *While*, *Until*.
> >
> > **Cyclomatic Complexity** = jumlah independent path melalui graph (*basis set*):
> >
> > $$V(G) = E - N + 2 \qquad\text{atau}\qquad V(G) = P + 1$$
> >
> > di mana **E** = jumlah edge, **N** = jumlah node, **P** = jumlah *predicate node* (node keputusan).
> >
> > **Contoh** algoritma:
> >
> > ```
> > i = 0;
> > while (i<n-1) do
> >   j = i + 1;
> >   while (j<n) do
> >     if A[i]<A[j] then
> >       swap(A[i], A[j]);
> >   end do;
> >   i=i+1;
> > end do;
> > ```
> >
> > Untuk flow graph dengan 7 node dan 9 edge:
> >
> > - $V(G) = 9 - 7 + 2 = 4$
> > - $V(G) = 3 + 1 = 4$ (ada 3 predicate node)
> > - **Basis Set**: `1,7` · `1,2,6,1,7` · `1,2,3,4,5,2,6,1,7` · `1,2,3,5,2,6,1,7`
> >
> > ```mermaid
> > flowchart TD
> >     1 --> 2
> >     1 --> 7
> >     2 --> 3
> >     3 --> 4
> >     3 --> 5
> >     4 --> 5
> >     5 --> 2
> >     2 --> 6
> >     6 --> 1
> > ```
> >
> > **Meaning of V(G)**: V(G) adalah jumlah **region tertutup** pada planar graph; bertambah seiring banyaknya decision path dan loop. Ia adalah ukuran kuantitatif **kesulitan testing** dan indikasi reliabilitas akhir. Data eksperimen menunjukkan **V(G) sebaiknya ≤ 10** — di atas itu testing menjadi sangat sulit.
> >
> > ### McClure's Complexity Metric
> >
> > $$\text{Complexity} = C + V$$
> >
> > - **C** = jumlah *comparisons* dalam sebuah module.
> > - **V** = jumlah *control variables* yang direferensikan dalam module.
> > - Disebut **decisional complexity**; mirip McCabe tetapi menyoroti **control variables**.
> >
> > ### High-level Design Metrics (Card & Glass)
> >
> > Mengukur kompleksitas arsitektur di level desain:
> >
> > - **Structural Complexity** modul $i$: $S(i) = f_{out}^2(i)$, di mana *fan-out* = jumlah modul yang langsung dipanggil (immediately subordinate).
> > - **Data Complexity**: $D(i) = \dfrac{v(i)}{f_{out}(i)+1}$, di mana $v(i)$ = jumlah input & output yang dilewatkan ke/dari $i$.
> > - **System Complexity**: $C(i) = S(i) + D(i)$. Semakin besar tiap komponen, semakin besar kompleksitas arsitektur keseluruhan.

> [!cornell] #### Summary
>
> **Size-oriented metrics** (LOC/KLOC/SLOC) mudah dihitung tetapi *language/programmer dependent*. **Halstead's Software Science** menurunkan vocabulary, length, volume, **difficulty, effort, time, dan bugs** dari $\eta_1, \eta_2, N_1, N_2$. **McCabe Cyclomatic Complexity** $V(G) = E - N + 2 = P + 1$ mengukur jumlah independent path / region — proksi kesulitan testing, dengan **batas aman ≤ 10**. **McClure** menambahkan dimensi *comparisons + control variables*. **Card & Glass** mengukur kompleksitas desain via *structural + data complexity*. Metrik ini melengkapi pengukuran berorientasi objek di [[Object-Oriented Metrics]] dan dapat dikomputasi otomatis oleh [[Software Measurement Tools]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa V(G) = jumlah basis path
>
> Cyclomatic complexity berasal dari teori graf: untuk graf terhubung, jumlah *independent cycle* menentukan banyaknya jalur dasar yang, jika dikombinasikan, dapat menyusun semua jalur lain. Karena itu V(G) juga = **jumlah minimal test case** untuk menutupi setiap edge keputusan minimal sekali (basis path testing).
>
> #### LOC Itu Berbahaya sebagai Target
>
> Karena LOC bergantung bahasa & gaya, menjadikannya **target** (mis. "produktivitas = LOC/hari") mendorong perilaku buruk: kode bertele-tele justru "lebih produktif". Ini contoh metrik yang bisa *reliable tapi tidak valid* — bandingkan diskusi di [[Software Measurement Fundamentals]].
>
> #### Further Reading
>
> - https://en.wikipedia.org/wiki/Halstead_complexity_measures
> - McCabe, T.J., "A Complexity Measure", *IEEE TSE*, 1976.
