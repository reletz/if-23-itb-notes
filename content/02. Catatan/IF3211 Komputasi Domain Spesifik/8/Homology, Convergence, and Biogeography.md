---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Homology, Convergence, and Biogeography
>
> > ## Questions/Cues
> >
> > - Apa beda **struktur homolog** dan **struktur analog**?
> > - Apa itu **evolusi konvergen**, dan mengapa ia tidak memberi info leluhur?
> > - Apa itu **struktur vestigial** dan **homologi molekuler**?
> > - Bagaimana **biogeografi** dan **continental drift** menjadi bukti evolusi?
> > - Mengapa evolusi disebut **teori ilmiah**, bukan sekadar "dugaan"?
> >
> > ## Reference Points
> >
> > - IF3211 — Evolution (PPT 9, bagian *Homology* &amp; *Convergent Evolution*)
> > - IF3211 — Evolution (PPT 9, bagian *Biogeography*)
> > - IF3211 — Evolution (PPT 9, bagian *What Is Theoretical About Darwin's View of Life?*)
>
> > ### Homologi: Kemiripan dari Leluhur Bersama
> >
> > Evolusi adalah proses **descent with modification**, sehingga **spesies berkerabat dapat memiliki ciri dengan kemiripan mendasar yang berfungsi berbeda**. **Homologi (homology)** adalah **kemiripan yang berasal dari leluhur bersama**. Contoh kanonik: **anggota gerak depan vertebrata** — lengan manusia, sirip paus, sayap kelelawar, kaki depan kucing — semuanya tersusun dari **set tulang yang sama** (humerus, radius-ulna, dst.), meski fungsinya sangat berbeda (memegang, berenang, terbang). Pola tulang bersama ini hanya masuk akal bila mereka **mewarisi cetak biru yang sama** dari leluhur bersama, lalu memodifikasinya.
> >
> > ### Konvergensi: Kemiripan Tanpa Kekerabatan
> >
> > Berlawanan dengan homologi, **evolusi konvergen (convergent evolution)** adalah munculnya **ciri serupa (analog)** pada kelompok yang **berkerabat jauh**. **Sifat analog (analogous traits)** muncul ketika kelompok-kelompok **secara independen beradaptasi terhadap lingkungan serupa dengan cara serupa**. Contoh: **sugar glider** (marsupial Australia) dan **flying squirrel** (eutheria Amerika Utara) tampak sangat mirip — keduanya punya membran untuk meluncur — **tetapi tidak berkerabat dekat**. Poin kritis: **evolusi konvergen tidak memberikan informasi tentang leluhur**. Kemiripan analog adalah jebakan jika dipakai untuk menyimpulkan kekerabatan; hanya **homologi** yang menandakan leluhur bersama. Contoh dramatis adalah **transisi ke kehidupan di laut** (mis. nenek moyang paus berkaki yang berangsur kembali ke air).
> >
> > ### Struktur Vestigial dan Homologi Molekuler
> >
> > **Struktur vestigial** adalah sisa anatomi yang dulu berfungsi pada leluhur namun kini tereduksi (mis. tulang panggul sisa pada paus, tulang ekor pada manusia) — bukti modifikasi dari bentuk leluhur. Homologi juga terlihat pada level molekul: **homologi molekuler** berupa kesamaan urutan **DNA dan protein** antar spesies. Misalnya **kode genetik universal** dan gen-gen yang sangat lestari (mis. gen *Hox*, sitokrom c) hadir lintas makhluk yang sangat berbeda — bukti kuat leluhur bersama tunggal, sekaligus bahan mentah untuk merekonstruksi pohon kekerabatan secara kuantitatif.
> >
> > ### Biogeografi dan Continental Drift
> >
> > **Biogeografi** — studi ilmiah tentang **distribusi geografis spesies** — juga menyediakan bukti evolusi. Dahulu benua-benua Bumi bersatu sebagai satu daratan besar, **Pangaea**, lalu terpisah lewat **continental drift (pergeseran benua)**. Dengan memahami pergerakan benua dan distribusi spesies modern, kita dapat **memprediksi kapan dan di mana** kelompok tertentu berevolusi. Selain itu, **pulau-pulau umumnya memiliki banyak spesies endemik** (tak ditemukan di tempat lain); endemik pulau ini sering **berkerabat dekat dengan spesies di daratan terdekat** atau pulau tetangga. Darwin menyimpulkan spesies ini muncul dari **kolonis yang beradaptasi** ke lingkungan baru — pola yang ia amati di [[Darwin, the Beagle, and Galapagos Observations]].
> >
> > ### Sudut Pandang Komputasi: Homologi sebagai Inferensi Pohon dan Sequence Alignment
> >
> > Bagi informatika, homologi vs konvergensi adalah masalah **inferensi struktur tree dari fitur**. Tujuannya merekonstruksi **pohon filogenetik** — sebuah **tree data structure** di mana leaf = spesies modern dan internal node = leluhur bersama. **Homologi = sinyal sejati** untuk topologi pohon; **analogi/konvergensi = noise** yang menyesatkan (dalam istilah filogenetika: **homoplasy**). Algoritma harus memisahkan keduanya — persis seperti membedakan kesamaan kausal dari kebetulan.
> >
> > **Homologi molekuler** mengubah ini menjadi komputasi konkret: **sequence alignment** (mis. Needleman–Wunsch dengan *dynamic programming*) mengukur kemiripan DNA/protein, lalu jarak itu memberi makan algoritma pembangun pohon (UPGMA, Neighbor-Joining, Maximum Likelihood). **Biogeografi + continental drift** menambahkan **kendala spasial-temporal**: distribusi geografis menjadi *prior* tentang kapan percabangan terjadi, mirip menambah constraint pada pencarian topologi pohon yang paling parsimoni. Ini foreshadowing langsung dari **phylogenetics** sebagai problem optimasi pada ruang pohon.

> [!cornell] #### Summary
>
> **Homologi** adalah kemiripan akibat **leluhur bersama** (mis. tulang anggota gerak vertebrata yang sama meski fungsi berbeda), sedangkan **evolusi konvergen** menghasilkan **sifat analog** pada kelompok berkerabat jauh yang beradaptasi serupa (sugar glider vs flying squirrel) — dan **tidak memberi info leluhur**. **Struktur vestigial** dan **homologi molekuler** (kesamaan DNA/protein, kode genetik universal) memperkuat bukti leluhur bersama. **Biogeografi** dengan **continental drift** (Pangaea) serta dominasi **spesies endemik pulau** yang berkerabat dengan daratan terdekat melengkapi bukti. Evolusi adalah **teori ilmiah** yang mengintegrasikan banyak fenomena dan didukung observasi terus-menerus. Secara komputasional, memisahkan **homologi (sinyal)** dari **konvergensi (homoplasy/noise)** adalah inti **inferensi pohon filogenetik** lewat **sequence alignment** — kelanjutan dari [[Natural Selection and Descent with Modification]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Evolusi sebagai Teori Ilmiah
>
> Dalam sains, **teori** adalah penjelasan yang **mencakup banyak observasi**, mengintegrasikan beragam fenomena, dan **prediksinya didukung observasi serta eksperimen berkelanjutan**. Ini berbeda dari penggunaan sehari-hari kata "teori" yang sebenarnya lebih dekat ke **hipotesis** (dugaan). Teori evolusi lewat seleksi alam didukung **dokumentasi langsung dan bukti**, **mengintegrasikan** bidang biologi yang beragam (genetika, anatomi, paleontologi, geografi), dan terus **memicu pertanyaan riset baru** — ciri teori yang kuat dan produktif.
>
> #### CS Angle: Filogenetik sebagai Optimasi pada Ruang Pohon
>
> Membangun pohon filogenetik adalah **search problem** yang besar: jumlah topologi pohon tumbuh super-eksponensial terhadap jumlah taksa, sehingga pencarian pohon optimal (mis. **Maximum Parsimony** atau **Maximum Likelihood**) bersifat **NP-hard**. Pendekatan praktis memakai **heuristik dan metaheuristik** — termasuk **genetic algorithm** dan **MCMC** (Bayesian, mis. MrBayes) — untuk menjelajahi ruang pohon. Menariknya, **evolusi sendiri dipakai sebagai algoritma** untuk merekonstruksi sejarah evolusi: lingkaran yang rapi antara biologi dan komputasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil beberapa urutan protein homolog (mis. hemoglobin lintas spesies dari NCBI), lakukan alignment, hitung matriks jarak, dan bangun pohon dengan Neighbor-Joining; bandingkan dengan klasifikasi yang diketahui.
> 2. Buat dataset sifat yang sengaja memuat satu sifat konvergen (homoplasy), lalu amati bagaimana metode parsimoni keliru menempatkan taksa — diskusikan cara mendeteksi homoplasy.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 19 — *Homology &amp; Biogeography*.
> - Felsenstein, J. *Inferring Phylogenies*.
> - Durbin, R. et al. *Biological Sequence Analysis* (alignment &amp; HMM).
