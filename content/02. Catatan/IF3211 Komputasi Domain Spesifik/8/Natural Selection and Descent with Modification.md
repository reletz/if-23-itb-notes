---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Natural Selection and Descent with Modification
>
> > ## Questions/Cues
> >
> > - Apa **tiga bahan** yang dibutuhkan agar seleksi alam terjadi?
> > - Apa perbedaan **seleksi buatan (artificial)** dan **seleksi alam (natural)**?
> > - Mengapa **populasi** yang berevolusi, bukan individu?
> > - Apa makna metafora **pohon kehidupan (tree of life)** dalam *descent with modification*?
> > - Bagaimana seleksi alam dipetakan ke **genetic algorithm**?
> >
> > ## Reference Points
> >
> > - IF3211 — Evolution (PPT 9, bagian *Descent with Modification*)
> > - IF3211 — Evolution (PPT 9, bagian *Artificial Selection, Natural Selection, and Adaptation*)
> > - IF3211 — Evolution (PPT 9, bagian *Key Features of Natural Selection*)
>
> > ### Mekanisme Seleksi Alam
> >
> > **Seleksi alam (natural selection)** adalah proses di mana **individu dengan sifat terwariskan (heritable) yang menguntungkan lebih mungkin bertahan hidup dan bereproduksi**. Mekanisme ini membutuhkan tiga bahan yang harus hadir bersamaan: (1) **Variasi** — individu dalam populasi berbeda-beda sifatnya; (2) **Pewarisan (heritability)** — sebagian variasi itu diturunkan ke keturunan; dan (3) **Reproduksi diferensial** — individu dengan sifat tertentu meninggalkan lebih banyak keturunan.
> >
> > Jika ketiganya ada, maka **secara otomatis** frekuensi sifat yang menguntungkan akan meningkat di generasi berikutnya. Seleksi alam tidak butuh "tujuan" atau "perancang"; ia adalah konsekuensi logis dari variasi yang diwariskan dan disaring oleh lingkungan.
> >
> > ### Seleksi Buatan vs Seleksi Alam
> >
> > Manusia telah lama memodifikasi spesies lain lintas generasi lewat **selective breeding** individu dengan sifat yang diinginkan — proses ini disebut **seleksi buatan (artificial selection)**. Semua varietas anjing, jagung, dan kubis-brokoli-kembang kol (semua dari spesies *Brassica oleracea*) adalah hasilnya. Di sini **manusia** yang berperan sebagai "penyeleksi".
> >
> > Darwin berargumen bahwa **proses serupa terjadi di alam**, hanya saja yang menyeleksi adalah **lingkungan**: predator, iklim, ketersediaan makanan, kompetisi. **Kamuflase** adalah contoh klasik — individu yang warnanya menyatu dengan latar lebih jarang dimangsa, sehingga lebih sering mewariskan sifat itu. Inti keduanya identik: **diferensial keberhasilan reproduksi yang bergantung pada sifat**.
> >
> > ### Ciri Penting: Populasi yang Berevolusi
> >
> > Ada beberapa poin halus namun krusial. Pertama, **populasi yang berevolusi, bukan individu** — seekor individu tidak berubah sifat genetiknya semasa hidup; yang berubah adalah **komposisi sifat dalam populasi** antar generasi. Kedua, seleksi alam **hanya dapat menambah atau mengurangi sifat terwariskan yang sudah bervariasi** di populasi — ia bekerja pada bahan yang ada. Ketiga, **sifat mana yang adaptif berbeda menurut tempat dan waktu**: tidak ada "sifat terbaik" universal, hanya yang terbaik untuk **lingkungan tertentu saat ini**.
> >
> > ### Descent with Modification dan Pohon Kehidupan
> >
> > Darwin merangkum pandangannya dengan frasa **descent with modification**: **descent** (keturunan/leluhur bersama yang menghasilkan kesamaan ciri) dan **modification** (akumulasi perbedaan). Ia menggambarkan sejarah kehidupan seperti sebuah **pohon (tree)**: **batang bersama** melambangkan leluhur bersama, **cabang-cabang** melambangkan keanekaragaman spesies, **ujung cabang** adalah organisme masa kini, dan **cabang tak berlabel** adalah kelompok yang telah punah. Setiap **percabangan (fork)** menandai **most recent common ancestor** dari garis keturunan yang bercabang dari titik itu. **Fosil** spesies punah membantu "mengisi" celah morfologi antar kelompok modern.
> >
> > ### Sudut Pandang Komputasi: Seleksi Alam sebagai Genetic Algorithm
> >
> > Seleksi alam adalah **prototipe biologis dari Evolutionary/Genetic Algorithm (GA)**. Pemetaannya nyaris satu-ke-satu: **populasi** = kumpulan kandidat solusi; **individu/kromosom** = satu solusi terkode; **variasi** = operator **mutasi** dan **crossover**; **lingkungan** = **fungsi fitness**; **reproduksi diferensial** = operator **selection** (mis. roulette/tournament) yang memberi peluang lebih besar pada fitness tinggi untuk masuk generasi berikut. Iterasi antar generasi adalah loop utama GA.
> >
> > Adaptasi terhadap lingkungan setara dengan **optimasi** menuju **puncak fitness (fitness peak)** pada sebuah **fitness landscape**. Karena seleksi alam hanya menaiki gradien lokal (sifat yang sedikit lebih baik dari yang ada), ia berperilaku seperti **hill-climbing** dan **dapat terjebak di local optimum** — paralel langsung dengan tantangan utama dalam algoritma optimasi. Karena seleksi alam **tidak menciptakan sifat baru** melainkan menyaring variasi yang ada, mutasi-lah satu-satunya sumber "eksplorasi" baru — tepat seperti peran operator mutasi menjaga GA tidak macet.
> >
> > ```mermaid
> > flowchart TD
> >     V["Variasi<br/>(mutasi &amp; crossover)"] --> S["Seleksi<br/>(fitness function)"]
> >     S --> R["Reproduksi<br/>diferensial"]
> >     R --> G["Generasi<br/>berikutnya"]
> >     G --> V
> > ```
> >
> > ```mermaid
> > flowchart TD
> >     A["Leluhur bersama<br/>(common ancestor)"] --> B["Garis keturunan 1"]
> >     A --> C["Garis keturunan 2"]
> >     B --> D["Spesies modern X"]
> >     B --> E["Kelompok punah"]
> >     C --> F["Spesies modern Y"]
> >     C --> G["Spesies modern Z"]
> > ```

> [!cornell] #### Summary
>
> **Seleksi alam** terjadi bila ada **variasi**, **pewarisan**, dan **reproduksi diferensial**: individu dengan sifat terwariskan yang menguntungkan lebih sering bertahan dan bereproduksi, sehingga frekuensi sifat itu naik antar generasi. Mekanisme ini identik dengan **seleksi buatan**, hanya saja **lingkungan** yang menyeleksi, bukan manusia. Yang berevolusi adalah **populasi**, bukan individu, dan sifat adaptif **bergantung tempat dan waktu**. Darwin merangkum semuanya sebagai **descent with modification**, divisualkan sebagai **pohon kehidupan** dengan leluhur bersama di batang dan keanekaragaman di cabang. Secara komputasional ini adalah cetak biru **Genetic Algorithm** yang mengoptimasi menuju **puncak fitness** — lihat penerapan nyatanya pada [[Evidence for Evolution and the MRSA Case Study]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa "Populasi", Bukan "Individu", yang Berevolusi
>
> Kerangka **population thinking** ini adalah lompatan konseptual Darwin. Individu adalah sampel tetap dari distribusi genetik; ia lahir, bereproduksi, mati tanpa mengubah genomnya. Yang bergeser sepanjang generasi adalah **distribusi frekuensi alel** dalam populasi — definisi formal evolusi dalam **genetika populasi** (perubahan frekuensi alel sepanjang waktu). Ini menjelaskan mengapa "evolusi satu individu" tidak bermakna.
>
> #### CS Angle: Pseudocode Loop Evolusioner
>
> ```
> init populasi P acak
> evaluasi fitness tiap individu di P
> ulangi hingga konvergen:
>     pilih induk  ~ proporsional fitness (selection)
>     hasilkan anak via crossover + mutasi (variation)
>     evaluasi fitness anak
>     P <- survivor selection(P, anak)   # generasi baru
> ```
> Perhatikan tegangan **exploration vs exploitation**: selection terlalu agresif → konvergensi dini ke **local optimum** (analog populasi kehilangan diversitas genetik); mutasi terlalu tinggi → pencarian acak tanpa arah. Alam menyeimbangkan keduanya lewat laju mutasi dan ukuran populasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis GA untuk masalah Knapsack atau TSP kecil; plot fitness terbaik per generasi dan amati plateau (local optimum). Eksperimen dengan laju mutasi berbeda.
> 2. Modelkan seleksi buatan: mulai dari "populasi bunga" dengan sifat acak, tiap generasi pilih manual individu paling sesuai target, lihat berapa generasi untuk mencapai target.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 19.
> - Goldberg, D. *Genetic Algorithms in Search, Optimization, and Machine Learning*.
> - Dawkins, R. *The Blind Watchmaker* (akumulasi seleksi kumulatif).
