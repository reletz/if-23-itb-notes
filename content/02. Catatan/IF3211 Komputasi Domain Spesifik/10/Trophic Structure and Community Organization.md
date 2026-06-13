---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Trophic Structure and Community Organization
>
> > ## Questions/Cues
> >
> > - Apa itu trophic structure, food chain, food web, dan trophic level?
> > - Apa beda foundation species, keystone species, dan ecosystem engineer?
> > - Bagaimana bottom-up vs top-down control mengorganisasi komunitas?
> > - Apa itu biomanipulasi dan bagaimana penerapannya?
> > - Bagaimana food web direpresentasikan sebagai directed graph?
> >
> > ## Reference Points
> >
> > - IF3211 — Ecological Communities (PPT 11, bagian Trophic Structure)
> > - IF3211 — Ecological Communities (PPT 11, bagian Bottom-Up & Top-Down Controls)
>
> > ### Trophic Structure: Food Chain, Food Web, dan Trophic Level
> >
> > **Trophic structure** adalah pola hubungan makan-memakan antar organisme dalam komunitas, dan merupakan faktor kunci yang memengaruhi struktur serta dinamika komunitas. **Food chain (rantai makanan)** menghubungkan **trophic level** dari produsen hingga karnivora puncak; **trophic level** adalah posisi yang ditempati suatu organisme dalam rantai makanan (produsen → herbivora → karnivora primer → karnivora sekunder).
> >
> > **Food web (jaring-jaring makanan)** adalah sekumpulan food chain yang saling terhubung melalui interaksi trofik yang kompleks. Karena satu spesies dapat memangsa banyak mangsa dan dimangsa banyak predator, struktur nyata jarang berupa rantai linear, melainkan jaringan — seperti **Antarctic marine food web** yang menautkan fitoplankton, krill, ikan, penguin, anjing laut, hingga paus.
> >
> > ### Spesies dengan Dampak Besar
> >
> > Beberapa spesies punya dampak luar biasa besar pada struktur komunitas, baik karena sangat melimpah maupun memegang peran pivotal. **Foundation species** memberi efek kuat karena **ukurannya besar atau kelimpahannya tinggi** (mis. pohon yang membentuk kanopi hutan). **Keystone species** mengendalikan komunitas lewat **peran ekologis pivotal**, bukan kelimpahan relatifnya — contoh klasik bintang laut *Pisaster* yang, bila dihilangkan, menyebabkan satu spesies kerang mendominasi dan diversitas anjlok. **Ecosystem engineer** menyebabkan **perubahan fisik lingkungan** yang memengaruhi struktur komunitas — contohnya **berang-berang (beaver)** yang membendung sungai dan menciptakan lahan basah baru.
> >
> > ### Bottom-Up vs Top-Down Control dan Biomanipulasi
> >
> > **Model bottom-up** mengusulkan pengaruh **searah dari level trofik bawah ke atas**: ketersediaan nutrien dan produsen menentukan jumlah herbivora, yang menentukan jumlah predator (notasi `N → V → H → P`). **Model top-down** (disebut juga *trophic cascade*) mengusulkan bahwa **predasi mengendalikan** organisasi komunitas: predator mengontrol kelimpahan herbivora, yang pada gilirannya mengontrol produsen primer, dengan efek **berseling (alternating)** menurun di sepanjang rantai.
> >
> > **Biomanipulasi (biomanipulation)** adalah penerapan model top-down untuk **memperbaiki kualitas air** danau tercemar: dengan menambah predator ikan, populasi ikan pemakan zooplankton ditekan, zooplankton meningkat, dan alga (penyebab air keruh) berkurang. Ini contoh rekayasa rantai trofik untuk hasil yang diinginkan.
> >
> > ### Framing Komputasional: Food Web sebagai Directed Graph
> >
> > Food web secara alami adalah **directed graph** `G = (V, E)`: simpul (`V`) = spesies, sisi berarah (`E`) = aliran energi dari mangsa ke predator. Representasi ini membuka analisis **graph/network**: **in-degree** = jumlah jenis mangsa, **out-degree** = jumlah predator; **trophic level** dapat dihitung sebagai panjang jalur rata-rata dari produsen (sumber, *source node* dengan in-degree 0). **Keystone species** muncul sebagai **node dengan centrality tinggi** (mis. *betweenness centrality*) — penghapusannya memutus banyak jalur energi, persis seperti *cut vertex/articulation point* pada teori graf. **Bottom-up vs top-down** adalah arah propagasi gangguan pada graf (dari source vs dari sink), dan *trophic cascade* setara dengan **propagasi efek berseling** menyusuri jalur terarah.
> >
> > Diagram berikut menyajikan food web sederhana sebagai directed graph aliran energi:
> >
> > ```mermaid
> > flowchart TD
> >     P["Fitoplankton<br/>(Produsen)"]
> >     Z["Zooplankton &amp; Krill<br/>(Herbivora)"]
> >     F["Ikan Kecil<br/>(Karnivora I)"]
> >     S["Anjing Laut<br/>(Karnivora II)"]
> >     B["Burung Laut<br/>(Karnivora II)"]
> >     O["Paus Pembunuh<br/>(Predator Puncak)"]
> >     P --> Z
> >     Z --> F
> >     Z --> B
> >     F --> S
> >     F --> B
> >     S --> O
> >     B --> O
> > ```

> [!cornell] #### Summary
>
> **Trophic structure** memetakan hubungan makan-memakan; **food chain** menghubungkan **trophic level** dari produsen ke predator puncak, dan **food web** adalah jaringan food chain yang saling terkait. **Foundation species** berdampak karena ukuran/kelimpahan, **keystone species** karena peran pivotal, dan **ecosystem engineer** (mis. berang-berang) karena mengubah lingkungan fisik. **Bottom-up control** mengalir dari nutrien ke atas, sedangkan **top-down control** (trophic cascade) didorong predasi — dasar **biomanipulasi** untuk memperbaiki kualitas air. Secara komputasional, food web adalah **directed graph** dengan keystone species sebagai **node ber-centrality tinggi**. Lihat juga [[Interspecific Interactions and Competition]] dan [[Biogeography, Disturbance, and Disease Ecology]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Trophic Cascade Klasik
>
> Studi keystone oleh **Robert Paine** pada bintang laut *Pisaster* di zona intertidal melahirkan istilah *keystone species*. Contoh trophic cascade terkenal lain: **berang-berang laut (sea otter) → bulu babi → kelp** — hilangnya berang-berang membuat bulu babi meledak dan menghabisi hutan kelp. Reintroduksi **serigala di Yellowstone** memicu kaskade yang mengubah perilaku rusa, memulihkan vegetasi riparian, bahkan memengaruhi aliran sungai — ilustrasi dramatis kontrol top-down.
>
> #### CS / Computational Angle
>
> Stabilitas food web dapat dianalisis lewat **eigenvalue dari community/Jacobian matrix** (kriteria stabilitas May): jaringan dengan konektansi dan kekuatan interaksi tertentu cenderung tidak stabil. Metrik graf penting: **connectance** `C = L / S²` (rasio jumlah link aktual terhadap maksimum), **degree distribution**, dan **modularity** (deteksi komunitas/kompartemen). Ketahanan terhadap kepunahan diuji lewat **node removal simulation** — menghapus node ber-degree atau ber-betweenness tertinggi dan mengukur fragmentasi graf (analog uji robustness jaringan komputer terhadap serangan tertarget vs acak).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun food web sebagai graf berarah di NetworkX; hitung trophic level tiap node, betweenness centrality, dan identifikasi kandidat keystone species.
> 2. Simulasikan *node removal* (acak vs tertarget pada centrality tertinggi) dan plot ukuran komponen terhubung terbesar sebagai fungsi fraksi node yang dihapus.
> 3. Model trophic cascade sederhana dengan tiga level (produsen–herbivora–predator) menggunakan ODE, lalu tunjukkan efek berseling saat predator ditambah.
>
> #### Bacaan Lanjutan
>
> - Campbell Biology in Focus, 3rd ed., Chapter 41 — Ecological Communities.
> - Paine, R.T. (1966). "Food Web Complexity and Species Diversity", *American Naturalist*.
> - May, R.M. (1972). "Will a Large Complex System be Stable?", *Nature*.
