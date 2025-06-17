---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2211 Strategi Algoritma]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > -   Definisi Masalah & Peta
> > -   Strategi *Uninformed Search*
> > -   BFS: Mekanisme & Contoh
> > -   BFS: Lacak Simulasi Lengkap
> > -   DFS: Mekanisme & Contoh
> > -   DFS: Lacak Simulasi Lengkap
> > -   IDS: Mekanisme & Contoh
> > -   IDS: Lacak Iterasi Lengkap
> > -   Motivasi untuk UCS
> > -   UCS: Mekanisme & Fungsi `g(n)`
> > -   UCS: Lacak Simulasi Lengkap
> > -   Hasil Optimal UCS
> 
> > ### Definisi Masalah Penentuan Rute
> > ![[Pasted image 20250612003822 1.png]]
> > - **Persoalan:** Diberikan sebuah graf yang merepresentasikan kota-kota dan jaraknya, carilah lintasan terpendek dari kota awal ke kota tujuan.
> > - **Contoh Konkret (Peta Romania):**
> > 	- **Himpunan Status (S):** Semua kota di peta (Arad, Timisoara, Sibiu, Bucharest, dll.).
> > 	- **Status Awal (i.s):** Kota **Arad (A)**.
> > 	- **Status Tujuan (g.s):** Kota **Bucharest (B)**.
> > 	- **Tes Tujuan:** `Apakah simpul saat ini == Bucharest?`
> > 	- **Biaya Lintasan (Path Cost):** Jarak (km) antar kota.
> > 
> > ### Strategi Pencarian Tak Berinformasi (*Uninformed / Blind Search*)
> > Sekelompok algoritma yang menjelajahi ruang status tanpa informasi tambahan tentang lokasi atau kedekatan tujuan. Penjelajahan bersifat sistematis berdasarkan struktur graf saja.
> > Algoritma dalam kategori ini meliputi: BFS, DFS, DLS, IDS, dan UCS.
> > 
> > **Breadth-First Search (BFS):**
> > * **Mekanisme:** Mengeksplorasi simpul secara lapis demi lapis (level by level). Menggunakan struktur data *queue* (**FIFO**: First-In, First-Out).
> > * **Hasil pada Contoh:** Menemukan jalur `A → S → F → B` dengan total biaya **450**. Jalur ini memiliki jumlah langkah (edges) tersedikit, namun bukan jarak terpendek.
> > 
> > -   **BFS: Lacak Simulasi Lengkap:**
> >     * "Agenda" diperlakukan sebagai *queue*. *Simpul-E* adalah simpul yang diekspansi. *Simpul Hidup* adalah isi dari *queue*.
> > 
> > | Simpul-E | Simpul Hidup (Isi Queue)                               |
> > | :------- | :----------------------------------------------------- |
> > | A        | `[ZA, SA, TA]`                                         |
> > | ZA       | `[SA, TA, OAZ]`                                        |
> > | SA       | `[TA, OAZ, OAS, FAS, RAS]`                             |
> > | TA       | `[OAZ, OAS, FAS, RAS, LAT]`                            |
> > | OAZ      | `[OAS, FAS, RAS, LAT]`                                 |
> > | OAS      | `[FAS, RAS, LAT]`                                      |
> > | FAS      | `[RAS, LAT, BASF]`                                     |
> > | RAS      | `[LAT, BASF, DASR, CASR, PASR]`                        |
> > | LAT      | `[BASF, DASR, CASR, PASR, MATL]`                       |
> > | ...      | (Pencarian berlanjut hingga Bucharest ditemukan)       |
> > 
> >  **Depth-First Search (DFS):**
> > - **Mekanisme:** Mengeksplorasi satu cabang sedalam mungkin sebelum melakukan *backtrack*. Menggunakan struktur data *stack* (**LIFO**: Last-In, First-Out).
> > - **Hasil pada Contoh:** Dapat menemukan jalur yang sangat panjang dan tidak optimal, seperti `A → Z → O → S → F → B` dengan total biaya **607**.
> > -   **DFS: Lacak Simulasi Lengkap:**
> >     * "Agenda" diperlakukan sebagai *stack*.
> > 
> > | Simpul-E | Simpul Hidup (Isi Stack)                                 |
> > | :------- | :------------------------------------------------------- |
> > | A        | `[ZA, SA, TA]`                                           |
> > | ZA       | `[OAZ, SA, TA]`                                          |
> > | OAZ      | `[SAZO, SA, TA]`                                         |
> > | SAZO     | `[FAZOS, RAZOS, SA, TA]`                                 |
> > | FAZOS    | `[BAZOSF, RAZOS, SA, TA]`                                |
> > | ...      | (Pencarian berlanjut hingga menemukan solusi atau jalan buntu) |
> > 
> > **Iterative Deepening Search (IDS):**
> > - **Mekanisme:** Menggabungkan keunggulan BFS (optimalitas pada biaya seragam) dan DFS (efisiensi memori). IDS melakukan serangkaian DFS dengan batas kedalaman yang terus meningkat.
> > - **Hasil pada Contoh:** Akan menemukan solusi yang sama dengan BFS, yaitu `A → S → F → B`.
> > -   **IDS: Lacak Iterasi Lengkap:**
> > 
> >     * **Depth = 0:** `A` → `cutoff` (batas kedalaman tercapai).
> >     * **Depth = 1:** `A` → `[ZA, SA, TA]`
> >         * Ekspansi `ZA` → `cutoff`.
> >         * Ekspansi `SA` → `cutoff`.
> >         * Ekspansi `TA` → `cutoff`.
> >     * **Depth = 2:** `A` → `[ZA, SA, TA]`
> >         * Ekspansi `ZA` → `[OAZ]` → `cutoff`.
> >         * Ekspansi `SA` → `[OAS, FAS, RAS]` → `OAS`: `cutoff`, `FAS`: `cutoff`, `RAS`: `cutoff`.
> >         * Ekspansi `TA` → `[LAT]` → `cutoff`.
> >     * **Depth = 3:** `A` → `ZA` → `OAZ` → `SAZO` → `cutoff`. ... (dan seterusnya hingga) `A` → `SA` → `FAS` → `BASF` (Solusi ditemukan).
> > 
> > **Motivasi untuk Uniform Cost Search (UCS):**
> > * Algoritma BFS, DFS, dan IDS tidak mempertimbangkan **biaya (jarak)** dari setiap langkah. Mereka mengasumsikan semua langkah sama.
> > * Dalam masalah penentuan rute, tujuan kita adalah mencari **path terpendek berdasarkan total jarak**, bukan jumlah langkah. Di sinilah UCS diperlukan.
> > 
> >  ### Uniform Cost Search (UCS): Mekanisme & Fungsi `g(n)`
> > * **`g(n)`:** Didefinisikan sebagai **biaya lintasan aktual** dari simpul awal (root) ke simpul `n`.
> > * **Mekanisme:** UCS adalah varian dari BFS yang memprioritaskan simpul untuk dieksplorasi berdasarkan nilai `g(n)` terendah. Ia selalu memilih jalur termurah dari titik awal. Menggunakan *priority queue*.
> > * **Hasil pada Contoh:** Menemukan jalur yang benar-benar optimal berdasarkan jarak.
> > -   **UCS: Lacak Simulasi Lengkap:**
> >     * "Agenda" diperlakukan sebagai *priority queue* yang diurutkan berdasarkan `g(n)`.
> > 
> > | Simpul-E | Simpul Hidup (Isi Priority Queue)                                                                   |
> > | :------- | :-------------------------------------------------------------------------------------------------- |
> > | `A`      | `[ZA-75, TA-118, SA-140]`                                                                           |
> > | `ZA-75`  | `[TA-118, SA-140, OAZ-146]`                                                                         |
> > | `TA-118` | `[SA-140, OAZ-146, LAT-229]`                                                                        |
> > | `SA-140` | `[OAZ-146, RAS-220, LAT-229, FAS-239, OAS-291]`                                                      |
> > | `OAZ-146`| `[RAS-220, LAT-229, FAS-239, OAS-291]`                                                              |
> > | `RAS-220`| `[LAT-229, FAS-239, OAS-291, PASR-317, DASR-340, CASR-366]`                                           |
> > | `LAT-229`| `[FAS-239, OAS-291, MATL-299, PASR-317, DASR-340, CASR-366]`                                          |
> > | `FAS-239`| `[OAS-291, MATL-299, PASR-317, DASR-340, CASR-366, BASF-450]`                                         |
> > | `OAS-291`| `[MATL-299, PASR-317, DASR-340, CASR-366, BASF-450]`                                                  |
> > | `MATL-299`|`[PASR-317, DASR-340, DATLM-364, CASR-366, BASF-450]`                                                  |
> > | `PASR-317`|`[DASR-340, DATLM-364, CASR-366, BASRP-418, CASRP-455, BASF-450]`                                      |
> > | `DASR-340`|`[DATLM-364, CASR-366, BASRP-418, CASRP-455, BASF-450]`                                               |
> > | `DATLM-364`|`[CASR-366, BASRP-418, CASRP-455, BASF-450]`                                                          |
> > | `CASR-366`|`[BASRP-418, CASRP-455, BASF-450]`                                                                   |
> > 
> > -   **Hasil Optimal UCS:**
> >     * Dari jejak simulasi di atas, simpul berikutnya yang akan diekspansi adalah `BASRP-418`. Ini adalah jalur solusi.
> >     * Jalur Optimal: **`A → S → R → P → B`**
> >     * Total Biaya (Jarak): **418**
> > 
> > ***
> > 
> > ### **Ringkasan:**
> > 
> > ****
> > 
> > ***
> > 
> > ### **Ad Libitum: Pendalaman Teknis**
> > 
> > #### **

> [!cornell] #### Summary
> Strategi *Uninformed Search* menjelajahi graf secara sistematis. BFS dan DFS, yang beroperasi berdasarkan struktur antrian dan tumpukan, tidak cocok untuk mencari jarak terpendek pada graf dengan biaya bervariasi. Iterative Deepening Search (IDS) mengoptimalkan penggunaan memori, namun masih berorientasi pada jumlah langkah. Untuk menemukan rute dengan total biaya riil terendah, *Uniform Cost Search* (UCS) adalah metode yang tepat dan dijamin optimal, karena ia secara cerdas memprioritaskan eksplorasi pada jalur dengan total biaya kumulatif `g(n)` terendah dari titik awal, seperti yang ditunjukkan oleh penemuan jalur A→S→R→P→B (biaya 418) yang lebih murah daripada jalur BFS A→S→F→B (biaya 450).

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
>  
>  -   **Kompleksitas UCS:** Kompleksitas waktu dan ruang UCS dapat dinyatakan sebagai O(b¹⁺ᶜ\*/ᵉ\*), di mana C\* adalah biaya dari solusi optimal dan ε adalah biaya langkah minimum. Ini berarti jumlah simpul yang dieksplorasi sangat sensitif terhadap biaya, bukan hanya kedalaman. Jika biaya sangat bervariasi, UCS bisa jauh lebih efisien daripada BFS.
>  -   **Loop & Jalur Redundan:** Dalam implementasi praktis, semua algoritma ini perlu menangani siklus (loop) dalam graf. Ini biasanya dilakukan dengan menyimpan set `explored` (atau `closed set`) yang berisi semua simpul yang sudah pernah diekspansi. Sebuah simpul tidak akan pernah ditambahkan ke agenda jika sudah ada di `explored set`. Untuk UCS, ada detail tambahan: jika kita menemukan jalur baru ke sebuah simpul yang sudah ada di agenda (frontier) dengan biaya `g(n)` yang lebih rendah, kita harus memperbarui biayanya di *priority queue*.
>  -   **Kapan Menggunakan Masing-masing:**
>      -   **BFS:** Gunakan jika biaya setiap langkah sama dan Anda memerlukan jaminan solusi dengan langkah paling sedikit (misal: mencari jumlah klik terpendek antar halaman web).
>      -   **DFS:** Gunakan jika memori adalah batasan utama, solusi mungkin sangat dalam, dan ada banyak solusi (tidak perlu yang optimal). Contoh: generator labirin.
>      -   **IDS:** Pilihan yang baik sebagai pengganti BFS jika memori menjadi masalah.
>      -   **UCS:** Pilihan utama untuk masalah pencarian rute di mana biaya langkah bervariasi dan optimalitas berdasarkan biaya total adalah suatu keharusan (misal: GPS, perencanaan jaringan).
>  
>  #### **Sumber & Referensi Lanjutan:**
>  
>  -   **Situs Web:** [AIMA textbook site](http://aima.cs.berkeley.edu/), [MIT OpenCourseWare](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/). Kedua sumber ini menyediakan materi, slide, dan terkadang kode yang sangat baik untuk mendalami topik ini.
>  -   **Kutipan Sumber:** Materi kuliah ini secara eksplisit mengutip Stuart Russell & Peter Norvig, *Artificial Intelligence: A Modern Approach, 3rd Edition*, yang merupakan bacaan wajib untuk pemahaman mendalam.
>  
>  #### **Eksplorasi Mandiri:**
>  
>  -   **Studi Kasus:** Ambil peta Google Maps antara dua titik di kota Anda yang memiliki beberapa pilihan rute. Coba lacak secara manual bagaimana BFS akan menjelajahi persimpangan demi persimpangan (mungkin menyebar ke semua arah secara merata) versus bagaimana UCS akan cenderung mengikuti jalan raya utama yang lebih panjang namun lebih cepat (biaya lebih rendah).
>  -   **Tantangan Kode:** Modifikasi implementasi UCS Anda untuk mencetak tidak hanya jalur akhir, tetapi juga urutan simpul yang diekspansi (`Simpul-E` dari tabel). Verifikasi apakah output program Anda cocok dengan tabel simulasi untuk contoh peta Romania.