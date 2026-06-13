---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Energy Flow and Trophic Structure Fundamentals
>
> > ## Questions/Cues
> >
> > - Apa itu **ekosistem**, dan bagaimana komponen **biotik** dan **abiotik** saling berinteraksi?
> > - Bagaimana **hukum termodinamika** dan **konservasi massa** berlaku pada ekosistem?
> > - Apa bedanya **aliran energi** (mengalir) dan **siklus kimia** (berputar)?
> > - Bagaimana spesies dikelompokkan ke dalam **trophic level**?
> > - Apa peran **detritivor** dan **dekomposer** dalam menghubungkan semua trophic level?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Overview & Conservation)
> > - IF3211 — Ecosystems and Energy (PPT 12, bagian Trophic Levels)
>
> > ### Ekosistem: Komponen Biotik dan Abiotik
> >
> > Sebuah **ekosistem** terdiri atas semua organisme yang hidup dalam suatu komunitas (**komponen biotik**) bersama **faktor abiotik** yang berinteraksi dengannya — cahaya matahari, suhu, air, mineral, dan tanah. Properti penting ekosistem bersifat **emergent**: ia muncul dari interaksi, bukan dari satu komponen saja. Karena itu, perubahan pada satu komponen tunggal dapat mentransformasi seluruh ekosistem.
> >
> > Contoh klasik: introduksi **arctic fox** ke pulau-pulau di Alaska dan Rusia mengubah **grassland menjadi tundra**. Rubah memangsa burung laut, sehingga **guano** (kotoran burung) yang menyuburkan tanah berkurang drastis, dan vegetasi pun berubah. Ini menunjukkan ekosistem adalah jaringan kausal yang erat — sebuah perubahan di hulu (predasi) merambat ke hilir (kesuburan tanah, komposisi tumbuhan).
> >
> > Ekosistem dari ukuran apa pun memiliki dua properti emergent kunci: **aliran energi (energy flow)** dan **siklus kimia (chemical cycling)**. Keduanya ditransformasikan melalui **fotosintesis** dan **relasi makan (feeding relationships)**.
> >
> > ### Termodinamika dan Konservasi pada Ekosistem
> >
> > Hukum fisika dan kimia berlaku penuh pada ekosistem. **Hukum I termodinamika** menyatakan energi tidak dapat diciptakan atau dimusnahkan, hanya **ditransfer atau ditransformasi**. Energi masuk ke ekosistem sebagai **radiasi matahari**, diubah menjadi **energi kimia** oleh organisme fotosintetik, lalu akhirnya **terdisipasi sebagai panas**.
> >
> > **Hukum II termodinamika** menyatakan setiap pertukaran energi meningkatkan **entropi** alam semesta. Dalam ekosistem, konversi energi tidak pernah 100% efisien — sebagian energi **selalu hilang sebagai panas**. Akibatnya, dibutuhkan **input kontinu dari matahari** untuk mempertahankan aliran energi di ekosistem Bumi. Inilah alasan mendasar mengapa energi **mengalir** (sekali lewat) dan tidak berputar.
> >
> > Sebaliknya, **hukum konservasi massa** menyatakan materi tidak dapat diciptakan atau dimusnahkan. Tidak seperti energi, **unsur kimia dapat didaur ulang** terus-menerus di dalam ekosistem. Ekosistem adalah **sistem terbuka**: ia menyerap energi dan massa, lalu melepaskan panas dan produk limbah.
> >
> > ### Trophic Level: Dari Produsen hingga Konsumen
> >
> > Ekolog mengelompokkan spesies ke dalam **trophic level** berdasarkan relasi makan.
> >
> > - **Autotrof** = **produsen primer**: membangun molekul organik dari sumber anorganik. Sebagian besar bersifat **fotosintetik**, tetapi autotrof di ekosistem **deep-sea hydrothermal vent** bersifat **kemosintetik** (sumber energi kimia, bukan cahaya).
> > - **Heterotrof** bergantung pada output biosintetik organisme lain.
> >   - **Konsumen primer** = herbivor (memakan produsen).
> >   - **Konsumen sekunder** = karnivor pemakan herbivor.
> >   - **Konsumen tersier** = karnivor pemakan karnivor lain.
> > - **Detritivor / dekomposer**: konsumen yang memperoleh energi dari **detritus** (materi organik tak hidup). **Prokariot** dan **fungi** adalah dekomposer penting. Dekomposisi **menghubungkan semua trophic level**, dan detritivor sendiri dimangsa oleh konsumen sekunder/tersier.
> >
> > ### Framing Komputasional: Ekosistem sebagai Flow Network Berkendala Konservasi
> >
> > Bagi mahasiswa informatika, ekosistem paling alami dimodelkan sebagai **directed flow network** (graf berarah). **Node** = trophic level atau populasi; **edge** = aliran energi/materi; **bobot edge** = laju transfer (mis. kkal/m²/tahun). Matahari adalah **source** dengan kapasitas masuk tetap; panas yang terdisipasi adalah **sink**.
> >
> > Dua hukum fisika menjadi **constraint** pada network ini:
> >
> > - **Konservasi energi (Hukum I)** = analogi **flow conservation** Kirchhoff: untuk tiap node, `energi_masuk = energi_keluar + energi_tersimpan`. Tidak ada energi yang muncul dari ketiadaan.
> > - **Hukum II / inefisiensi** = setiap edge memiliki **faktor disipasi** (loss term) — sebagian flow "bocor" ke sink panas dan tidak pernah mencapai node berikutnya. Inilah yang membuat aliran energi **monoton menurun** ke arah hilir.
> > - **Konservasi massa** berbeda secara topologis: materi membentuk **cycle (siklus tertutup)** dalam graf, sedangkan energi membentuk **path terbuka** dari source ke sink. Membedakan keduanya = membedakan komponen yang **acyclic** (energi) dari yang **strongly connected / cyclic** (materi) dalam model.
> >
> > Dengan formulasi ini, pertanyaan ekologi berubah menjadi pertanyaan komputasi: berapa **throughput maksimum** ke trophic level puncak? Bagaimana **steady-state** distribusi energi? Semua dapat disimulasikan dengan **stock-and-flow** atau diselesaikan dengan teknik **max-flow**.
> >
> > ```mermaid
> > flowchart LR
> >     SUN(["Matahari<br/>(source)"]) -->|"radiasi"| P["Produsen<br/>(autotrof)"]
> >     P -->|"~10%"| C1["Konsumen<br/>primer"]
> >     C1 -->|"~10%"| C2["Konsumen<br/>sekunder"]
> >     C2 -->|"~10%"| C3["Konsumen<br/>tersier"]
> >     P -.->|"detritus"| D["Detritivor &amp;<br/>dekomposer"]
> >     C1 -.-> D
> >     C2 -.-> D
> >     P -->|"panas"| H(["Panas<br/>(sink)"])
> >     C1 --> H
> >     C2 --> H
> >     C3 --> H
> >     D -->|"nutrien daur ulang"| P
> > ```

> [!cornell] #### Summary
>
> **Ekosistem** memadukan komponen **biotik** (komunitas organisme) dan **abiotik** (cahaya, suhu, air, mineral) yang berinteraksi sebagai sistem terbuka dengan dua properti emergent: **aliran energi** dan **siklus kimia**. Menurut **Hukum I termodinamika**, energi hanya ditransfer/ditransformasi — masuk sebagai radiasi matahari, jadi energi kimia lewat fotosintesis, lalu terdisipasi sebagai panas; **Hukum II** menjamin konversi tak pernah sempurna sehingga butuh **input matahari kontinu**. **Konservasi massa** membuat materi **berputar (cycle)** sementara energi **mengalir (flow)** sekali lewat. Spesies dikelompokkan ke **trophic level**: **autotrof/produsen**, **konsumen primer/sekunder/tersier**, serta **detritivor/dekomposer** yang menghubungkan semua level dan mendaur ulang nutrien. Secara komputasi, ekosistem adalah **flow network** dengan **constraint konservasi**, dilanjutkan di [[Energy Transfer and Trophic Efficiency]] dan [[Biogeochemical Cycles and Restoration Ecology]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Kemosintesis dan Ekosistem Tanpa Cahaya
>
> Tidak semua ekosistem bergantung matahari. Di **hydrothermal vent** laut dalam, bakteri **kemoautotrof** mengoksidasi H₂S untuk memfiksasi karbon, menjadi basis rantai makanan tanpa cahaya sama sekali. Ini membuktikan bahwa yang fundamental bukan "cahaya" melainkan **gradien energi yang dapat dieksploitasi** — relevan untuk astrobiologi dan pencarian kehidupan di lautan bawah-es Europa/Enceladus.
>
> #### CS Angle: Mass-Balance ODE dan Steady-State Solver
>
> Model **compartmental** menulis tiap stock `Xᵢ` sebagai persamaan diferensial: `dXᵢ/dt = Σ inflow − Σ outflow`. Untuk N kompartemen, sistem menjadi vektor `dX/dt = A·X + b`. **Steady-state** dicari dengan menyelesaikan `A·X + b = 0` (sistem linear) atau integrasi numerik (Euler/Runge-Kutta) hingga konvergen. Konservasi energi muncul sebagai **invariant** yang dapat di-assert tiap timestep (`Σ flux ≈ 0` dalam toleransi) untuk memvalidasi simulasi — sama seperti unit test pada sistem dinamis.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan flow network ekosistem sederhana (4 node) di Python/NetworkX; beri bobot transfer dan verifikasi flow conservation pada tiap node.
> 2. Simulasikan skenario "arctic fox": kurangi inflow guano sebesar X% dan amati pergeseran biomassa vegetasi pada steady-state. Plot sensitivitasnya.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 42 — *Ecosystems and Energy*.
> - Odum, H.T. *Systems Ecology: An Introduction* — pendekatan energy-flow diagram (Energy Systems Language).
> - Lindeman, R.L. (1942) "The Trophic-Dynamic Aspect of Ecology", *Ecology* 23:399–417.
