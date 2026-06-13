---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Mutualism, Commensalism, and Species Diversity
>
> > ## Questions/Cues
> >
> > - Apa perbedaan mutualisme obligat dan fakultatif?
> > - Bagaimana komensalisme berbeda dari mutualisme (+/+ vs +/0)?
> > - Apa dua komponen keanekaragaman spesies?
> > - Bagaimana Shannon diversity index dihitung dan dimaknai?
> > - Apa hubungan diversitas dengan stabilitas dan produktivitas komunitas?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecological Communities (PPT 11, bagian Positive Interactions)
> > - IF3211 — Ecological Communities (PPT 11, bagian Species Diversity)
>
> > ### Interaksi Positif: Mutualisme dan Komensalisme
> >
> > **Interaksi positif (positive interactions)** adalah interaksi antara individu dua spesies di mana setidaknya satu pihak diuntungkan dan tidak ada yang dirugikan. Dua bentuknya adalah mutualisme dan komensalisme.
> >
> > **Mutualisme (mutualism)** (+/+) menguntungkan anggota kedua spesies. Pada **mutualisme obligat**, anggota salah satu atau kedua spesies **tidak dapat bertahan hidup tanpa** pasangannya — contohnya pohon **akasia dan semut** yang saling bergantung untuk kelangsungan hidup dan reproduksi (semut melindungi pohon dari herbivora, pohon memberi tempat tinggal dan nektar). Pada **mutualisme fakultatif**, kedua spesies masih dapat bertahan hidup sendiri-sendiri.
> >
> > **Komensalisme (commensalism)** (+/0) menguntungkan individu satu spesies **tanpa merugikan maupun menguntungkan** spesies lain. Contoh: bunga liar yang tumbuh optimal pada cahaya rendah memperoleh manfaat dari naungan pohon hutan, tetapi tidak memengaruhi kelangsungan hidup maupun reproduksi pohon. Contoh lain adalah burung **cattle egret** yang menangkap serangga yang terusik oleh kerbau Afrika.
> >
> > ### Keanekaragaman Spesies: Richness dan Relative Abundance
> >
> > **Keanekaragaman spesies (species diversity)** memiliki dua komponen. **Species richness** adalah **jumlah spesies berbeda** dalam komunitas. **Relative abundance** adalah **proporsi tiap spesies** terhadap seluruh individu di komunitas.
> >
> > Dua komunitas dapat memiliki *richness* yang sama tetapi *relative abundance* berbeda — dan komunitas dengan distribusi lebih merata terasa "lebih beragam". Misal komunitas A dengan empat spesies berproporsi 25%–25%–25%–25% lebih beragam daripada komunitas B berproporsi 80%–10%–5%–5%, meski keduanya punya richness = 4. Inilah sebabnya kita butuh **diversity index** untuk membandingkan secara kuantitatif.
> >
> > ### Shannon Diversity Index
> >
> > Indeks yang paling banyak dipakai adalah **Shannon diversity index (H)**:
> >
> > `H = −(p_A ln p_A + p_B ln p_B + p_C ln p_C + …) = −Σ p_i ln(p_i)`
> >
> > di mana A, B, C … adalah spesies, `p_i` adalah relative abundance tiap spesies, dan `ln` adalah logaritma natural. Nilai **H** makin besar ketika spesies makin banyak **dan** distribusinya makin merata. Tantangan praktis: menentukan jumlah dan kelimpahan relatif spesies sulit karena **sebagian besar spesies bersifat langka (rare)** sehingga rentan luput dari sampling.
> >
> > ### Diversitas, Stabilitas, dan Produktivitas
> >
> > Ekolog memanipulasi diversitas pada komunitas eksperimental untuk mempelajari efeknya terhadap produktivitas dan stabilitas. Hasil eksperimen di **Cedar Creek** menunjukkan bahwa komunitas dengan diversitas lebih tinggi: lebih **produktif** dan lebih **stabil** produktivitasnya; lebih mampu **bertahan dan pulih** dari tekanan lingkungan; menghasilkan **biomassa** (total massa seluruh organisme di habitat) lebih banyak daripada petak satu-spesies; serta lebih **resisten terhadap spesies invasif** (organisme yang mapan di luar wilayah asalnya).
> >
> > ### Framing Komputasional: H sebagai Information Entropy
> >
> > Formula Shannon index **identik secara matematis** dengan **Shannon entropy** `H = −Σ p_i log p_i` dari teori informasi. Dalam komunikasi, entropy mengukur **ketidakpastian/rata-rata informasi** suatu sumber simbol; dalam ekologi, ia mengukur ketidakpastian menebak spesies dari satu individu yang diambil acak. Komunitas monokultur (`p = 1` untuk satu spesies) memberi `H = 0` — nol informasi, sepenuhnya dapat diprediksi. Dengan menggunakan log basis-2, H langsung berarti **bit**. Konsep turunan: **Pielou's evenness** `J = H / ln(S)` menormalkan H terhadap richness `S` (analog *normalized entropy*), dan **Simpson index** `D = Σ p_i²` setara dengan probabilitas tumbukan / *Rényi entropy* orde-2. Diversitas, dengan demikian, adalah masalah **encoding**: komunitas beragam butuh "kode" lebih panjang untuk dideskripsikan.

> [!cornell] #### Summary
>
> **Interaksi positif** mencakup **mutualisme** (+/+, bisa **obligat** seperti akasia–semut atau **fakultatif**) dan **komensalisme** (+/0). **Keanekaragaman spesies** terdiri atas **species richness** (jumlah spesies) dan **relative abundance** (proporsi tiap spesies); keduanya dirangkum oleh **Shannon diversity index** `H = −Σ p_i ln p_i`, yang secara matematis **identik dengan Shannon entropy** dari teori informasi. Eksperimen **Cedar Creek** menunjukkan diversitas tinggi meningkatkan **produktivitas**, **stabilitas**, **biomassa**, dan **resistensi** terhadap spesies invasif. Lihat juga [[Interspecific Interactions and Competition]] dan [[Trophic Structure and Community Organization]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Hipotesis Diversitas–Stabilitas
>
> Hubungan diversitas–stabilitas punya beberapa mekanisme. **Portfolio effect**: seperti diversifikasi investasi, banyak spesies merata-ratakan fluktuasi sehingga produktivitas total lebih stabil. **Insurance hypothesis**: redundansi fungsional berarti jika satu spesies tumbang akibat stres, spesies lain mengambil alih perannya. **Complementarity**: spesies dengan relung berbeda memanfaatkan sumber daya lebih lengkap sehingga produktivitas total naik. Inilah landasan teoretis temuan Cedar Creek (David Tilman dkk.).
>
> #### CS / Computational Angle
>
> Hill numbers menyatukan banyak indeks dalam satu kerangka: `^qD = (Σ p_i^q)^(1/(1−q))` — `q=0` memberi richness, `q→1` memberi exp(Shannon entropy), `q=2` memberi inverse Simpson. Ini setara dengan **Rényi entropy** berparameter orde `q`, sehingga "diversity profile" adalah kurva entropy terhadap q. Secara implementasi, menghitung H atas sampel besar sama persis dengan menghitung entropy distribusi label pada **decision tree** (kriteria *information gain*). Estimator seperti **Chao1** mengoreksi bias akibat spesies langka yang tak tertangkap — analog *missing-mass estimation* (Good–Turing).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis fungsi Python `shannon(counts)` dan `simpson(counts)`; uji pada data kelimpahan dua komunitas dengan richness sama tetapi evenness berbeda, lalu bandingkan hasilnya.
> 2. Plot "diversity profile" (Hill numbers vs q dari 0 sampai 3) untuk sebuah dataset ekologi nyata.
> 3. Demonstrasikan kesetaraan H dengan information gain: hitung entropy label pada dataset klasifikasi dan kaitkan interpretasinya.
>
> #### Bacaan Lanjutan
>
> - Campbell Biology in Focus, 3rd ed., Chapter 41 — Ecological Communities.
> - Tilman, D. et al. (2006). "Biodiversity and ecosystem stability", *Nature*.
> - Jost, L. (2006). "Entropy and diversity", *Oikos*.
