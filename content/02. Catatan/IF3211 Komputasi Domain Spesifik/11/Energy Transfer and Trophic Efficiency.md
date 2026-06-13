---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Energy Transfer and Trophic Efficiency
>
> > ## Questions/Cues
> >
> > - Apa itu **secondary production** dan **production efficiency**?
> > - Bagaimana rumus production efficiency dihitung dari **assimilation**?
> > - Apa itu **trophic efficiency** dan mengapa rata-ratanya **~10%**?
> > - Apa beda **pyramid of energy** dan **pyramid of biomass**?
> > - Mengapa **rantai makanan pendek** (jarang lebih dari 4–5 level)?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Energy Transfer Between Trophic Levels)
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Ecological Pyramids)
>
> > ### Secondary Production dan Production Efficiency
> >
> > **Secondary production** sebuah ekosistem adalah jumlah energi kimia dalam makanan yang dikonversi menjadi **biomassa baru** oleh konsumen selama periode tertentu. Tidak semua energi yang dimakan menjadi tubuh: sebagian tak tercerna (feses), sebagian habis untuk respirasi.
> >
> > **Production efficiency** suatu organisme adalah fraksi energi tersimpan dalam makanan yang benar-benar dipakai untuk secondary production:
> >
> > $$\text{Production efficiency} = \frac{\text{Net secondary production}}{\text{Assimilation of primary production}} \times 100\%$$
> >
> > - **Net secondary production** = energi yang dipakai untuk **pertumbuhan dan reproduksi**.
> > - **Assimilation** = total energi yang dikonsumsi dan dipakai untuk pertumbuhan, reproduksi, **dan respirasi**.
> >
> > Endoterm (mamalia, burung) punya production efficiency rendah (1–3%) karena banyak energi habis untuk menjaga suhu tubuh; ektoterm dan invertebrata jauh lebih efisien (sering >40%).
> >
> > ### Trophic Efficiency dan Aturan ~10%
> >
> > **Trophic efficiency** adalah persentase produksi yang ditransfer dari satu trophic level ke level berikutnya — rata-rata **sekitar 10%**. Efisiensi ini memperhitungkan energi yang tersimpan dalam **biomassa tak termakan** di level bawah, serta energi yang hilang ke **feses** dan **respirasi**.
> >
> > Konsekuensinya bersifat **eksponensial**: jika produsen menyimpan 100% energi awal, konsumen primer hanya mendapat ~10%, sekunder ~1%, tersier ~0,1%. Dari setiap **1.000.000 J** di produsen, hanya sekitar **1.000 J** mencapai konsumen tersier. Energi "menyusut" secara multiplikatif di tiap langkah.
> >
> > ### Pyramid Ekologis dan Mengapa Rantai Makanan Pendek
> >
> > **Pyramid of energy** memvisualisasikan penyusutan ini: tiap balok mewakili produksi (energi/satuan luas/waktu) sebuah trophic level, menyempit drastis ke atas. Karena efisiensi ~10%, hanya energi sangat kecil tersisa di puncak — inilah **alasan utama rantai makanan pendek**: setelah 4–5 level, energi yang tersisa tak cukup menopang populasi predator puncak yang viable.
> >
> > **Pyramid of biomass** menggambarkan total massa kering organisme tiap level; umumnya juga menyempit ke atas. Namun di sebagian ekosistem akuatik bisa **terbalik (inverted)**: biomassa fitoplankton (produsen) lebih kecil daripada zooplankton yang memakannya, karena fitoplankton **turnover** sangat cepat — laju produksinya tinggi meski biomassa berdiri (standing crop) rendah. Ini menegaskan bahwa **pyramid of energy tidak pernah terbalik** (dijamin Hukum II termodinamika), sedangkan pyramid of biomass bisa.
> >
> > ### Framing Komputasional: Aturan 10% sebagai Formula Decay/Throughput
> >
> > Aturan 10% adalah **decay geometrik** yang langsung dikenali mahasiswa informatika. Energi pada level ke-`n` adalah:
> >
> > `E(n) = E₀ · (0.10)ⁿ`  atau umumnya  `E(n) = E₀ · Πᵢ εᵢ`
> >
> > dengan `εᵢ` efisiensi transfer tiap edge. Ini identik dengan **signal attenuation** sepanjang lossy channel, atau **packet survival** melewati hop yang masing-masing meneruskan 10% throughput. Dalam terminologi **flow network**, tiap edge memiliki **gain factor < 1**, dan throughput ke sink (predator puncak) adalah hasil **kali bobot di sepanjang path** — sebuah masalah **bottleneck/longest-attenuated-path**.
> >
> > Pertanyaan "berapa panjang maksimum rantai makanan?" menjadi pertanyaan ambang: cari `n` terbesar sehingga `E₀ · (0.10)ⁿ ≥ E_min` (energi minimum untuk menopang populasi viable). Menyelesaikannya: `n ≤ log₁₀(E₀ / E_min)`. Dengan basis 0,1, **logaritma** memberi jawaban kecil — secara matematis menjelaskan mengapa alam membatasi rantai pada segelintir level. Inverted biomass pyramid memetakan ke konsep **throughput tinggi pada stock rendah** (turnover cepat) — analog buffer kecil berlatensi rendah dengan bandwidth besar.
> >
> > ```mermaid
> > flowchart TB
> >     T4["Konsumen tersier — 10 J<br/>(0.001 × awal)"]
> >     T3["Konsumen sekunder — 100 J<br/>(0.01 × awal)"]
> >     T2["Konsumen primer — 1.000 J<br/>(0.1 × awal)"]
> >     T1["Produsen — 10.000 J<br/>(NPP tersedia)"]
> >     T1 -->|"× 0.10"| T2
> >     T2 -->|"× 0.10"| T3
> >     T3 -->|"× 0.10"| T4
> >     LOSS["Hilang tiap level:<br/>respirasi + feses +<br/>biomassa tak termakan"] -.-> T2
> >     LOSS -.-> T3
> >     LOSS -.-> T4
> > ```

> [!cornell] #### Summary
>
> **Secondary production** adalah biomassa baru yang dibentuk konsumen, dan **production efficiency** = `net secondary production / assimilation × 100%` — rendah pada endoterm (banyak energi untuk panas tubuh), tinggi pada ektoterm. **Trophic efficiency** rata-rata **~10%**: hanya sepersepuluh produksi tiap level diteruskan ke atas, karena energi hilang lewat **respirasi, feses, dan biomassa tak termakan**. Penyusutan **eksponensial** ini divisualkan **pyramid of energy** (tak pernah terbalik) dan **pyramid of biomass** (bisa terbalik di akuatik karena turnover cepat), serta menjelaskan mengapa **rantai makanan pendek** — setelah 4–5 level energi habis. Secara komputasi, aturan 10% adalah **decay geometrik / atenuasi throughput** `E(n) = E₀·(0.1)ⁿ`, dan panjang rantai maksimum dibatasi `n ≤ log₁₀(E₀/E_min)`. Bertumpu pada [[Energy Flow and Trophic Structure Fundamentals]] dan [[Primary Production - Aquatic and Terrestrial]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Implikasi 10% untuk Diet Manusia
>
> Aturan 10% menjelaskan mengapa diet **berbasis tumbuhan** menopang lebih banyak orang per hektar daripada diet daging: tiap naik satu trophic level membuang ~90% energi. Memberi makan manusia sebagai konsumen primer (memakan biji-bijian langsung) jauh lebih hemat energi daripada lewat ternak (konsumen primer → manusia sebagai sekunder). Ini argumen kuantitatif untuk ketahanan pangan dan jejak karbon.
>
> #### CS Angle: Ekspektasi Path-Product & Monte Carlo
>
> Jika tiap transfer εᵢ adalah variabel acak (bervariasi 5–20%), throughput ke puncak adalah **produk variabel acak** sepanjang path. Distribusinya cenderung **log-normal** (jumlah log = teorema limit pusat pada skala log). Simulasi **Monte Carlo** dapat mengestimasi probabilitas energi cukup untuk menopang level ke-n, mengubah pertanyaan ekologi menjadi inferensi probabilistik — pola yang sama muncul di analisis reliabilitas jaringan dan estimasi latensi end-to-end.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis fungsi `max_chain_length(E0, E_min, eff)` dan plot panjang rantai maksimum terhadap efisiensi 5%–20%. Bandingkan dengan data rantai makanan nyata.
> 2. Bangun simulasi Monte Carlo dengan εᵢ acak; estimasi distribusi energi di tiap level dan probabilitas keberadaan predator puncak.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 42 — *Concept 42.3*.
> - Lindeman, R.L. (1942) — asal-usul konsep efisiensi trofik.
> - Pauly, D. & Christensen, V. (1995) "Primary production required to sustain global fisheries", *Nature* 374:255–257.
