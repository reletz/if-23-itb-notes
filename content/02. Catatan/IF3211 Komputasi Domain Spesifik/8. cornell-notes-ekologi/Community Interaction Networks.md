---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Ekologi Komputasional]]

> [!cornell] Community Interaction Networks
>
> > ## Questions/Cues
> >
> > - Bagaimana interseksi sumber daya memengaruhi kompetisi?
> > - Mengapa mutualisme stabil dalam jaringan ekologi?
> > - Peran kunci spesies dalam struktur komunitas
> > - Dampak gangguan manusia terhadap interaksi
> > - Aplikasi teori graf dalam analisis habitat
> >
> > ## Reference Points
> >
> > - Campbell Biology in Focus (Slides 28-48)
> > - Rempel et al. 2021 (Pages 57-59)
> > - Urban & Keitt 2001 (Pages 60-62)
> > - Memmott et al. 2004 (Pages 66-68)
> >
>
> > ### Interaksi Antara Spesies dalam Komunitas
> > Interaksi antarspesies dalam ekologi komunitas diklasifikasikan berdasarkan efeknya pada kelangsungan hidup dan reproduksi organisme yang terlibat. Terdapat enam kategori utama: kompetisi (-/-), predasi (+/-), herbivora (+/-), parasitisme (+/-), mutualisme (+/+), dan komensalisme (+/0).
> > Contoh konkret mutualisme adalah hubungan antara pohon akasia dan semut Pseudomyrmex di Amerika Tengah. Pohon menyediakan nektar dan tempat tinggal (domatia), sementara semut melindungi pohon dari herbivora dan tanaman kompetitor. Jika semut dihilangkan, pohon akasia menunjukkan penurunan kelangsungan hidup sebesar 50% dalam 6 bulan.
> > ### Analisis Jaringan Interaksi Ekologi
> > Jaringan interaksi ekologi memodelkan hubungan kompleks antar organisme menggunakan pendekatan matematis. Dalam analisis penyerbukan, tumbuhan sebagai node dihubungkan dengan garis (edges) ke polinatornya. Konektivitas jaringan diukur dengan metrik seperti kekayaan spesies, kekuatan interaksi, dan nestedness (pola interaksi hierarkis).
> > Studi Memmott et al. (2004) menunjukkan bahwa jaringan penyerbukan memiliki ketahanan berbeda terhadap kepunahan spesies. Jika spesies yang punah dipilih secara acak, jaringan mempertahankan 80% fungsionalitas hingga 40% spesies hilang. Namun, penghilangan spesies kunci (highly connected) menyebabkan keruntuhan 50% jaringan hanya dengan 15% kepunahan.
> > ### Pemodelan Komputasional dalam Ekologi Komunitas
> > Model dinamik populasi mengintegrasikan variabel lingkungan (suhu, curah hujan) dan antropogenik (kepadatan jalan) untuk memprediksi dinamika komunitas. Studi Rempel et al. (2021) menggunakan sistem persamaan diferensial berikut untuk memodelkan interaksi rusa, serigala, dan karibu:
> > dM/dt = rM(1 - M/K) - aMW
> > dW/dt = c(aMW) - dW
> > dC/dt = rC - bWC - h(M)C
> > Di mana M,W,C = populasi moose, wolf, caribou; r = laju pertumbuhan; K = kapasitas tampung; a,b,c,d = koefisien interaksi. Model ini mengungkap efek sinergis perubahan iklim dan pembangunan jalan terhadap penurunan karibu melalui peningkatan populasi rusa dan serigala.

> [!cornell] #### Summary
>
> **Jaringan interaksi komunitas** merupakan sistem kompleks yang mencakup hubungan timbal-balik antarspesies, dengan **spesies kunci** seperti semut akasia yang berdampak tidak proporsional terhadap stabilitas ekosistem. **Analisis jaringan graf** (node = spesies, edge = interaksi) mengungkap pola konektivitas kritis untuk konservasi, sementara **model komputasional** mensimulasikan dampak kumulatif gangguan manusia dan perubahan iklim. **Ketahanan jaringan** bergantung pada distribusi konektivitas, di mana hilangnya spesies paling terkoneksi menyebabkan efek domino terbesar.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Sensitivitas Model Populasi
> Analisis sensitivitas dalam model Rempel et al. mengungkap bahwa parameter yang paling berpengaruh adalah:
> - Elastisitas suhu terhadap kesuksesan kalving karibu (β = 0.78)
> - Koefisien mortalitas jalan untuk serigala (γ = 0.65)
> - Efisiensi konversi makanan serigala (c = 0.59)
>
> Simulasi Monte Carlo dengan 10.000 iterasi menunjukkan probabilitas kepunahan karibu meningkat dari 12% ke 67% ketika densitas jalan melebihi 0.6 km/km² dan suhu musim dingin naik >3°C.
>
> #### Algoritma Graf untuk Konservasi
> Metrik konektivitas habitat menggunakan teori graf:
> - **Betweenness centrality**: Mengidentifikasi koridor penting
> - **Algebraic connectivity**: Mengukur robustnes jaringan terhadap fragmentasi
> - **Diameter graf**: Jarak maksimum antar node (populasi terisolasi)
>
> Implementasi praktis menggunakan Python NetworkX dengan algoritma Dijkstra untuk menemukan jalur dispersi optimal antar fragmen habitat.
>
> #### Manajemen Adaptif Invasif Spesies
> Kerangka kerja Baxter & Possingham (2011) menggunakan Pemrograman Dinamis Stokastik:
> ```python
> def optimal_policy(state, t):
> actions = [low, medium, high]
> Q_values = {a: expected_reward(state, a) +
> discount * E[V(next_state, t+1)]
> for a in actions}
> return argmax(Q_values)
> ```
> Dengan update Bayesian pengetahuan parameter invasif setelah setiap tindakan manajemen.
>
> #### Proyek Eksplorasi Mandiri
> 1. **Simulasi Jaringan Mutualisme**: Gunakan paket R 'bipartite' untuk menganalisis dataset penyerbukan. Variasikan penghilangan spesies secara acak vs targeted, ukuran efek pada secondary extinctions.
> 2. **Optimisasi Koridor Habitat**: Implementasikan algoritma A* pada peta raster GIS untuk merancang koridor konservasi dengan biaya konstruksi minimal dan konektivitas maksimal.
>
> #### Alat Komputasi
> - **NetworkX 3.0**: Analisis graf ekologi (https://networkx.org/)
> - **Circuitscape 5.0**: Pemodelan konektivitas lanskap (https://circuitscape.org/)
> - **NetLogo 6.3**: Simulasi berbasis agen interaksi komunitas (https://ccl.northwestern.edu/netlogo/)
>
> #### Bacaan Lanjutan
> - Bascompte, J. (2007). Networks in Ecology. *Science* 317(5834):583-587
> - Dunne, J.A. (2006). The Network Structure of Food Webs. *Princeton University Press*
> - MOOC: Ecological Network Analysis (EdX) - https://www.edx.org/ecosystems