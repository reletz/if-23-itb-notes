---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Maximum Parsimony and Tree Reconstruction
>
> > ## Questions/Cues
> >
> > - Apa **prinsip maximum parsimony**, dan apa yang diminimalkannya?
> > - Bagaimana program **mencari** pohon paling parsimonious di antara banyak pohon?
> > - Mengapa pohon filogenetik selalu berstatus **hipotesis**?
> > - Apa itu **maximum likelihood**, dan kapan dipakai sebagai alternatif?
> > - Mengapa rekonstruksi pohon secara komputasi **mahal** (NP-hard)?
> >
> > ## Reference Points
> >
> > - IF3211 — Phylogeny (PPT 10, bagian Maximum Parsimony)
> > - IF3211 — Phylogeny (PPT 10, bagian Phylogenetic Trees as Hypotheses)
>
> > ### Prinsip Maximum Parsimony
> >
> > **Maximum parsimony** mengasumsikan bahwa pohon yang **paling mungkin** adalah pohon yang membutuhkan **paling sedikit kejadian evolusi** — yakni kemunculan minimum dari shared derived characters. Ini penerapan **Occam's razor** pada biologi: di antara hipotesis yang menjelaskan data, pilih yang paling sederhana.
> >
> > Pada filogeni berbasis DNA, **most parsimonious tree** adalah pohon dengan **jumlah perubahan basa paling sedikit** yang konsisten dengan sekuens yang diamati. Setiap kandidat pohon diberi skor = total perubahan karakter yang harus diasumsikan; pohon dengan skor terendah menang.
> >
> > ### Mencari Pohon: Tree Search
> >
> > Materi menegaskan bahwa **program komputer** dipakai untuk mencari pohon parsimonious. Prosesnya dua tahap:
> >
> > 1. **Skoring** sebuah topologi tertentu — berapa minimal perubahan yang diperlukan agar sekuens cocok dengan pohon itu.
> > 2. **Pencarian** menjelajahi kemungkinan topologi untuk menemukan skor minimum.
> >
> > Masalahnya: jumlah topologi pohon tumbuh **super-eksponensial** terhadap jumlah taxa, sehingga pemeriksaan **exhaustive** hanya layak untuk segelintir taxa. Untuk taxa banyak, dipakai **heuristic search** (mis. *nearest-neighbor interchange*, *subtree pruning and regrafting*) yang memperbaiki pohon secara bertahap tanpa menjamin optimum global.
> >
> > ### Pohon sebagai Hipotesis
> >
> > Semua phylogenetic tree adalah **hipotesis** tentang hubungan organisme. Hipotesis **terbaik** adalah yang paling cocok dengan **seluruh** data morfologi, molekuler, dan fosil yang tersedia. Materi memberi contoh prediksi: pohon burung + kerabat dekatnya memprediksi bahwa dinosaurus membangun sarang dan mengerami telur — kemudian **didukung temuan fosil**. Ketika bukti baru muncul, hipotesis pohon **direvisi**. Inilah sains yang dapat difalsifikasi.
> >
> > ### Computational Framing: Search atas Tree Space yang NP-hard
> >
> > Bagi mahasiswa informatika, parsimony adalah **kombinatorial optimization**: minimalkan fungsi cost (jumlah perubahan) atas ruang diskret semua **topologi pohon**. Dua sub-masalah:
> >
> > - **Small parsimony** (topologi diketahui, hitung skor minimum): diselesaikan **efisien** dengan **Fitch algorithm** atau **Sankoff algorithm** — keduanya **dynamic programming** bottom-up pada pohon, O(n) per situs.
> > - **Large/Big parsimony** (cari topologi terbaik): **NP-hard**. Ruang pencarian = semua unrooted binary tree, berjumlah (2n−5)!! untuk *n* daun — meledak (mis. 10 taxa → > 2 juta pohon; 50 taxa → angka astronomis).
> >
> > Karena NP-hard, tool nyata (PAUP*, TNT) memakai **heuristik** dan **metaheuristik**: hill-climbing dengan operator **NNI/SPR/TBR**, simulated annealing, atau **branch-and-bound** (untuk taxa sedang). **Maximum likelihood** dan **Bayesian (MCMC)** adalah alternatif berbasis model probabilistik substitusi (mis. **Jukes-Cantor**, **GTR**): alih-alih menghitung perubahan, mereka memaksimalkan *likelihood* data terhadap pohon + panjang cabang — lebih akurat namun jauh lebih mahal komputasinya.

> [!cornell] #### Summary
>
> **Maximum parsimony** (Occam's razor) memilih pohon dengan **paling sedikit kejadian evolusi** / perubahan basa, melalui **tree search** yang diprogram komputer. Karena jumlah topologi tumbuh **super-eksponensial**, pencarian exhaustive hanya layak untuk sedikit taxa; selebihnya memakai **heuristik** (NNI/SPR/TBR). Setiap pohon hanyalah **hipotesis** yang cocok dengan data morfologi+molekuler+fosil dan **direvisi** saat bukti baru datang. Secara komputasi, **small parsimony** (skoring topologi) efisien lewat **Fitch/Sankoff DP**, tetapi **big parsimony** (mencari topologi optimal) bersifat **NP-hard**; alternatif **maximum likelihood**/**Bayesian** berbasis model substitusi lebih akurat tapi lebih mahal. Lihat input karakter di [[Cladistics and Character-Based Methods]] dan penanggalan waktu di [[Molecular Clocks and the Three Domains of Life]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Fitch Algorithm Secara Intuitif
>
> **Fitch** menghitung skor parsimoni satu situs pada topologi tetap: traversal **post-order**, di tiap node internal ambil **irisan** himpunan state anak-anaknya; jika irisan kosong, ambil **gabungan** dan tambahkan **+1** ke skor (sebuah perubahan harus terjadi di sana). Total perubahan = skor parsimoni situs itu; jumlahkan atas semua situs. Ini contoh elegan **DP pada pohon** yang sering muncul di soal algoritma.
>
> #### CS Angle: Kenapa Heuristik Tak Terhindarkan
>
> Karena big parsimony **NP-hard**, tidak ada algoritma polinomial yang diketahui menjamin pohon optimal global. Strategi praktis: **branch-and-bound** memangkas cabang ruang pencarian yang skornya sudah melebihi pohon terbaik sejauh ini (eksak tapi tetap eksponensial worst-case); **stochastic search** (NNI/SPR/TBR + restart, ratchet, genetic algorithm) menukar jaminan optimalitas demi skalabilitas. Validasi kepercayaan cabang biasanya via **bootstrap resampling** — resampling kolom alignment ribuan kali dan menghitung seberapa sering tiap clade muncul.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan **Fitch algorithm** untuk menghitung skor parsimoni satu kolom DNA pada pohon ber-4 daun yang Anda tentukan.
> 2. Untuk 4–5 taxa, enumerasi **semua** topologi unrooted, skor masing-masing, dan tunjukkan mana yang paling parsimonious (lihat berapa cepat jumlah pohon membengkak saat n bertambah).
> 3. Jalankan dataset kecil di tool seperti **IQ-TREE** atau **RAxML** dengan parsimony vs maximum likelihood, lalu bandingkan pohon + waktu komputasi.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 20 — *Maximum Parsimony*.
> - Fitch, W.M. (1971) — *Toward Defining the Course of Evolution: Minimum Change for a Specific Tree Topology*.
> - Felsenstein, J. *Inferring Phylogenies* (2004) — bab parsimony & likelihood.
