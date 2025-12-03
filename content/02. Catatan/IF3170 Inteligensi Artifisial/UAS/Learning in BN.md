---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Learning BN from Data
> 
> > ## Questions/Cues
> >
> > - Mengapa perlu Learning?
> >     
> > - Masalah _Expert_
> >     
> > - Parameter Estimation
> >     
> > - Masalah Probabilitas 0
> >     
> > - Smoothing (Laplace)
> >     
> > - Structure Learning
> >     
> > - Causal vs Data-driven
> >     
> >
> > ## Reference Points
> >
> > - File: `29. IF3170_Materi12_Seg03_04...pdf`
> >     
> > - Halaman: 10-17
> >     
> 
> > ### 1. Mengapa "Learning from Data"?
> >
> > Membangun BN manual dari pakar (_human expert_) memiliki masalah:
> >
> > - **Knowledge Bottleneck:** Sulit mengekstrak pengetahuan dari pakar.
> >     
> > - **Subjective:** Estimasi probabilitas seringkali tidak akurat atau bias.
> >     
> > - **Solusi:** Gunakan data untuk mengisi angka (Numerical Parameters) dan bahkan menentukan struktur. "Manusia bagus di struktur, Data bagus di angka".
> >     
> >
> > ### 2. Parameter Estimation (Mengisi CPT)
> >
> > Jika struktur BN sudah diketahui, kita tinggal menghitung probabilitas dari dataset $D$.
> >
> > - Node tanpa parent ($V_i$):
> >     
> >     $$P(V_i=T) \approx \frac{\text{Jumlah kasus } V_i=T}{\text{Total data } k}$$
> > - Node dengan parent ($V_i$ punya parent $V_j$):
> >     
> >     $$P(V_i=T | V_j=T) \approx \frac{\text{Jumlah kasus } V_i=T \text{ DAN } V_j=T}{\text{Jumlah kasus } V_j=T}$$
> >
> > ### 3. Smoothing (Menangani Zero Probability)
> >
> > Jika dalam data latih sebuah kejadian tidak pernah muncul (count = 0), probabilitasnya menjadi 0. Ini berbahaya karena jika dikalikan dalam Chain Rule, akan menolkan seluruh prediksi.
> >
> > - Solusi: Laplace Smoothing (+1).
> >     
> >     Menambahkan angka 1 pada pembilang dan menyesuaikan penyebut.
> >     
> >     $$P(V_i=T) \approx \frac{\#(V_i=T) + 1}{k + 2}$$
> >     
> >     (Penyebut +2 karena variabel biner punya 2 kemungkinan: T/F).
> >     
> >
> > ### 4. Constructing BN Structure (Structure Learning)
> >
> > Bagaimana jika struktur graf belum ada?
> >
> > - **Langkah Umum:**
> >     
> > 	1. Tentukan himpunan variabel.
> > 			
> > 	2. Tentukan urutan variabel.
> > 			
> > 	3. Tambahkan node satu per satu, dan tentukan _parents_-nya.
> >         
> > - **Pendekatan:**
> >     
> > 	- **Causal Knowledge:** Menggunakan logika sebab-akibat (Misal: Hujan menyebabkan Basah, bukan sebaliknya).
> > 			
> > 	- Data-Driven: Menggunakan tes independensi statistik pada data.
> > 			
> > 		- Cek apakah $P(C|A) = P(C)$? Jika ya, A bukan parent C.
> > 			
> > 		- Cek apakah $P(C|A,B) = P(C|B)$? Jika ya, A ridak relevan jika B diketahui.
> >         
> > - **Pentingnya Urutan:** Urutan penambahan node yang berbeda dapat menghasilkan struktur jaringan yang berbeda (dan mungkin lebih kompleks/kurang efisien). Urutan terbaik adalah **Cause** $\rightarrow$ **Effect**.
> >     

> [!cornell] #### Summary
> 
> Learning pada BN mengatasi keterbatasan subjektivitas pakar. **Parameter Learning** dilakukan dengan menghitung frekuensi kejadian di data, dilengkapi dengan **Smoothing** untuk mencegah probabilitas nol. **Structure Learning** melibatkan penentuan topologi graf, yang idealnya didasarkan pada hubungan kausal (sebab-akibat) untuk menghasilkan jaringan yang paling sederhana dan representatif.

> [!ad-libitum]- Ad Libitum: Spaced Repetition Questions
> 
> <details>
> 
> <summary><strong>1. Mengapa probabilitas 0 berbahaya dalam Naive Bayes atau BN, dan bagaimana cara mengatasinya?</strong></summary>
> 
> Probabilitas 0 akan membuat hasil perkalian probabilitas akhir menjadi 0, mengabaikan bukti lainnya. Diatasi dengan <strong>Smoothing</strong> (misal: menambahkan 1 pada setiap hitungan frekuensi).
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Dalam membangun struktur BN, urutan penambahan node mana yang menghasilkan struktur paling efisien?</strong></summary>
> 
> Urutan dari <strong>Penyebab ke Akibat (Cause to Effect)</strong>. Urutan sebaliknya seringkali membutuhkan lebih banyak panah (arcs) untuk merepresentasikan dependensi yang sama.
> 
> </details>