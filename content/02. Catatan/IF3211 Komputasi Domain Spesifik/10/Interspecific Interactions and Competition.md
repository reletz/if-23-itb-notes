---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Interspecific Interactions and Competition
>
> > ## Questions/Cues
> >
> > - Apa itu komunitas biologis dan bagaimana interaksi antarspesies diklasifikasikan?
> > - Mengapa dua spesies tidak bisa hidup berdampingan permanen pada relung yang identik?
> > - Bagaimana resource partitioning dan character displacement memungkinkan koeksistensi?
> > - Apa saja bentuk eksploitasi (predasi, herbivori, parasitisme)?
> > - Bagaimana mangsa mempertahankan diri (cryptic, aposematic, mimicry)?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecological Communities (PPT 11, bagian Interspecific Interactions)
> > - IF3211 — Ecological Communities (PPT 11, bagian Competition & Exploitation)
>
> > ### Komunitas dan Klasifikasi Interaksi Antarspesies
> >
> > Sebuah **komunitas biologis (biological community)** adalah kumpulan populasi dari spesies-spesies berbeda yang hidup cukup berdekatan sehingga dapat saling berinteraksi. Hubungan antarspesies inilah yang disebut **interspecific interactions**. Ekolog mengelompokkan interaksi ini berdasarkan efeknya terhadap kelangsungan hidup (*survival*) dan reproduksi tiap individu: positif (**+**), negatif (**−**), atau netral (**0**).
> >
> > Dengan notasi pasangan tanda, interaksi utama dapat dipetakan: **kompetisi** (−/−), **predasi/herbivori/parasitisme** (+/−), **mutualisme** (+/+), dan **komensalisme** (+/0). Analogi sederhana bagi mahasiswa informatika: ini seperti **payoff matrix** dalam game theory — setiap spesies adalah "pemain", dan tanda menunjukkan keuntungan atau kerugian fitness dari sebuah "permainan" ekologis.
> >
> > ### Kompetisi dan Competitive Exclusion
> >
> > **Kompetisi (competition)** terjadi ketika individu dari spesies berbeda memperebutkan suatu **sumber daya yang membatasi (limiting resource)** kelangsungan hidup dan reproduksi keduanya — misalnya gulma yang bersaing dengan tanaman kebun untuk nutrien dan air. Spesies tidak bersaing untuk sumber daya yang berlimpah; contohnya spesies terestrial tidak berkompetisi memperebutkan oksigen.
> >
> > Menurut **prinsip competitive exclusion (Gause)**, dua spesies yang anggotanya memperebutkan sumber daya pembatas yang sama **tidak dapat hidup berdampingan secara permanen** di satu tempat. Kompetisi kuat akan menyebabkan **competitive exclusion**, yaitu eliminasi lokal kompetitor yang inferior. Contoh klasik: dalam kultur bersama, *Paramecium aurelia* mendorong *Paramecium caudatum* menuju kepunahan karena bersaing memperebutkan makanan.
> >
> > ### Relung Ekologi, Resource Partitioning, dan Character Displacement
> >
> > **Relung ekologi (ecological niche)** adalah himpunan spesifik sumber daya biotik dan abiotik yang digunakan suatu organisme — sering dianalogikan sebagai "profesi" organisme, bukan sekadar "alamat" (habitatnya). Spesies yang ekologis mirip tetap bisa berkoeksistensi jika muncul satu atau lebih perbedaan signifikan dalam relung mereka seiring waktu. Diferensiasi relung yang memungkinkan koeksistensi ini disebut **resource partitioning** (mis. kadal *Anolis* di Republik Dominika yang menempati ketinggian dahan berbeda).
> >
> > Bukti tidak langsung adanya kompetisi di masa lalu adalah **character displacement**: ketika perbedaan karakter antara dua spesies lebih besar pada populasi **sympatric** (hidup bersama di wilayah sama) dibanding **allopatric** (hidup terpisah). Tekanan kompetisi mendorong divergensi morfologis sehingga relung tumpang-tindih berkurang.
> >
> > ### Eksploitasi dan Adaptasi Pertahanan
> >
> > **Eksploitasi (exploitation)** adalah interaksi di mana individu satu spesies memperoleh keuntungan dengan **memakan (dan dengan demikian merugikan)** individu spesies lain. Tiga bentuknya: **predasi** (predator membunuh dan memakan mangsa; predator punya indra tajam seperti organ pendeteksi panas pada *pit viper*), **herbivori** (herbivora memakan bagian tumbuhan/alga, merugikan tetapi biasanya tidak membunuh — dari mamalia besar seperti sapi hingga invertebrata kecil dan bulu babi laut), dan **parasitisme** (parasit mengambil nutrisi dari inang; **endoparasit** hidup di dalam tubuh, **ektoparasit** di permukaan luar).
> >
> > Mangsa mengembangkan adaptasi pertahanan: mekanis (duri), kimiawi (toksin), **cryptic coloration** (kamuflase agar membaur dengan latar), **aposematic coloration** (warna peringatan cerah pada hewan bertoksin), serta **mimicry** — pada **Batesian mimicry** spesies tak berbahaya/enak dimakan meniru model yang berbahaya/tak enak dimakan.
> >
> > ### Framing Komputasional: Model Lotka–Volterra dan Simulasi Agent-Based
> >
> > Kompetisi dan predasi dapat dimodelkan sebagai **dynamic system**. Persamaan **Lotka–Volterra** untuk predator–mangsa: `dN/dt = rN − aNP` dan `dP/dt = baNP − mP`, di mana `N` populasi mangsa, `P` populasi predator. Hasil simulasinya berupa **osilasi siklik** populasi — mirip *feedback loop* dalam control system. Untuk kompetisi, varian Lotka–Volterra kompetitif memakai **koefisien kompetisi** yang secara numerik mengonfirmasi competitive exclusion: jika tumpang-tindih relung terlalu besar, salah satu populasi konvergen ke nol.
> >
> > Pendekatan lain adalah **agent-based simulation (ABM)**: tiap organisme adalah *agent* dengan aturan lokal (cari makan, hindari predator, bereproduksi). Dari interaksi lokal ini muncul perilaku populasi yang **emergent**, dan resource partitioning dapat divisualisasikan sebagai pemisahan *agent* dalam ruang relung berdimensi-n (mirip clustering pada feature space).

> [!cornell] #### Summary
>
> **Komunitas biologis** adalah kumpulan populasi yang saling berinteraksi, dan **interspecific interactions** diklasifikasikan menurut efek +/−/0 (analog payoff matrix game theory). **Kompetisi** (−/−) memperebutkan **limiting resource**, dan **prinsip competitive exclusion** menyatakan dua spesies dengan relung identik tak bisa koeksistensi permanen. **Resource partitioning** dan **character displacement** memungkinkan koeksistensi dengan mendiferensiasi **relung ekologi**. **Eksploitasi** (+/−) mencakup **predasi**, **herbivori**, dan **parasitisme**, yang memicu adaptasi pertahanan seperti **cryptic** dan **aposematic coloration** serta **Batesian mimicry**. Dinamika ini dimodelkan secara komputasional lewat **Lotka–Volterra** dan **agent-based simulation**. Lihat juga [[Mutualism, Commensalism, and Species Diversity]] dan [[Trophic Structure and Community Organization]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Tipe Mimikri dan Niche n-Dimensi
>
> Selain **Batesian mimicry** (peniru tak berbahaya meniru model berbahaya), terdapat **Müllerian mimicry**, di mana dua atau lebih spesies yang sama-sama berbahaya saling menyerupai sehingga predator hanya perlu belajar satu pola peringatan — efeknya menurunkan biaya pembelajaran predator secara kolektif. Konsep relung diformalkan oleh **G.E. Hutchinson** sebagai **hypervolume n-dimensi**: setiap sumbu adalah satu variabel lingkungan (suhu, ukuran mangsa, kelembapan). Tumpang-tindih hypervolume inilah yang menentukan intensitas kompetisi.
>
> #### CS / Computational Angle
>
> Niche overlap dapat dihitung sebagai **kemiripan vektor pemanfaatan sumber daya** menggunakan **cosine similarity** atau **Pianka's overlap index** `O = Σ(p_i q_i) / sqrt(Σp_i² · Σq_i²)`, yang formulanya identik dengan cosine similarity pada information retrieval. Competitive exclusion lalu setara dengan pernyataan: jika dua vektor terlalu kolinear (overlap → 1), sistem tidak stabil. Predator–prey juga dapat diimplementasikan sebagai **cellular automata** (mis. model Wa-Tor) di grid 2D — latihan klasik untuk memahami emergent dynamics.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan simulator Lotka–Volterra predator–mangsa di Python (`scipy.integrate.odeint`), lalu plot *phase portrait* (N vs P) dan amati siklus limit.
> 2. Bangun model agent-based sederhana (mis. dengan Mesa atau NetLogo) untuk dua spesies kompetitor; variasikan koefisien overlap dan catat kapan terjadi competitive exclusion.
> 3. Ambil data kebiasaan makan dua spesies burung, hitung Pianka's overlap index, dan diskusikan apakah resource partitioning teramati.
>
> #### Bacaan Lanjutan
>
> - Campbell Biology in Focus, 3rd ed., Chapter 41 — Ecological Communities.
> - Gause, G.F. (1934). *The Struggle for Existence*.
> - Hutchinson, G.E. (1957). "Concluding Remarks", *Cold Spring Harbor Symposia*.
