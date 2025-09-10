---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Adversarial Search?
> >     
> > - Apa karakteristik lingkungannya?
> >     
> > - Apa itu Game Tree?
> >     
> > - Siapa pemain MAX dan MIN?
> >     
> > - Bagaimana algoritma Minimax bekerja?
> >     
> > - Apa saja properti Minimax?
> >     
> > - Mengapa Minimax tidak praktis?
> >     
> > - Apa itu Alpha-Beta Pruning?
> >     
> > - Bagaimana Alpha-Beta Pruning bekerja?
> >     
> >
> > ## Reference Points
> >
> > - IF3170-Materi04-AdversarialSearch.pdf
> >     
> 
> > ### Konsep Adversarial Search
> >
> > **Adversarial Search** adalah metode pencarian yang dirancang untuk lingkungan kompetitif (multi-agen) di mana tujuan setiap agen saling bertentangan. Fokus utamanya adalah menemukan **strategi** atau kebijakan optimal untuk menang dalam sebuah permainan.
> >
> > - **Karakteristik Lingkungan**:
> >     
> >     - **Deterministik & Fully Observable**: Aturan mainnya jelas dan seluruh keadaan permainan diketahui oleh semua pemain.
> >         
> >     - **Turn-taking**: Pemain bermain secara bergiliran.
> >         
> >     - **Zero-sum**: Keuntungan satu pemain adalah kerugian bagi pemain lain.
> >         
> >
> > ### Representasi Permainan: Game Tree
> >
> > Permainan direpresentasikan sebagai sebuah **Game Tree**, di mana:
> >
> > - **Node**: Merepresentasikan sebuah _state_ (konfigurasi) permainan.
> >     
> > - **Edge**: Merepresentasikan sebuah _move_ (langkah) yang valid.
> >     
> > - **Root**: _State_ awal permainan.
> >     
> > - **Leaf Nodes (Terminal States)**: _State_ akhir permainan (menang, kalah, atau seri), di mana setiap _state_ ini memiliki nilai _utility_.
> >     
> >
> > ### Algoritma Minimax
> >
> > **Minimax** adalah algoritma fundamental untuk menentukan langkah optimal. Algoritma ini bekerja dengan asumsi bahwa lawan akan selalu bermain secara optimal.
> >
> > - **Pemain MAX**: Pemain (kita) yang tujuannya **memaksimalkan** skor.
> >     
> > - **Pemain MIN**: Lawan yang tujuannya **meminimalkan** skor MAX.
> >     
> > - **Utility Function**: Fungsi yang menetapkan nilai numerik pada _terminal state_ (misal: +1 untuk menang, -1 untuk kalah, 0 untuk seri).
> >     
> >
> > **Cara Kerja (Proses Backup Nilai)**:
> >
> > 1. Bangun _game tree_ hingga ke _terminal states_.
> >     
> > 2. Terapkan _utility function_ pada setiap _terminal state_.
> >     
> > 3. "Naikkan" nilai dari daun ke akar:
> >     
> >     - Pada level **MAX**, sebuah node akan mengambil nilai **maksimum** dari anak-anaknya.
> >         
> >     - Pada level **MIN**, sebuah node akan mengambil nilai **minimum** dari anak-anaknya.
> >         
> > 4. Langkah yang dipilih MAX di awal adalah langkah yang mengarah ke anak dengan nilai tertinggi setelah proses _backup_.
> >     
> >
> > ### Properti dan Keterbatasan Minimax
> >
> > - **Completeness**: Ya, jika pohonnya terbatas.
> >     
> > - **Optimality**: Ya, jika lawan bermain secara optimal.
> >     
> > - **Time Complexity**: O(bm) (b = _branching factor_, m = kedalaman).
> >     
> > - **Space Complexity**: O(bm) (dengan DFS).
> >     
> >
> > Keterbatasan utamanya adalah **kompleksitas waktu yang eksponensial**, membuatnya tidak praktis untuk game kompleks seperti catur (bapprox35,mapprox100).
> >
> > ### Optimisasi: Alpha-Beta Pruning
> >
> > **Alpha-Beta Pruning** adalah optimisasi cerdas dari Minimax yang dapat memangkas (_prune_) cabang-cabang besar dari _game tree_ yang tidak akan memengaruhi keputusan akhir.
> >
> > - **Ide Utama**: Berhenti mengevaluasi sebuah cabang segera setelah terbukti bahwa cabang tersebut tidak akan lebih baik dari opsi lain yang sudah ditemukan.
> >     
> >
> > - **Cara Kerja**: Algoritma melacak dua nilai:
> > 	* **Alpha ($\\alpha$)**: Nilai **terbaik** (tertinggi) yang sudah dijamin untuk **MAX** di sepanjang path saat ini.
> > 	* **Beta ($\\beta$)**: Nilai **terbaik** (terendah) yang sudah dijamin untuk **MIN** di sepanjang path saat ini.
> >
> > - **Kondisi Pruning**: Sebuah cabang di level MIN akan di-prune jika nilainya lebih rendah dari atau sama dengan alpha (lealpha), dan cabang di level MAX akan di-prune jika nilainya lebih tinggi dari atau sama dengan beta (gebeta). Dengan kata lain, pemangkasan terjadi ketika alphagebeta.
> >     

> [!cornell] #### Summary
> Adversarial Search digunakan untuk menemukan strategi optimal dalam permainan kompetitif dengan memodelkannya sebagai _**game tree**_. Algoritma Minimax menjadi dasarnya, dengan cara melakukan _**backup**_ nilai dari akhir permainan untuk memilih langkah yang memaksimalkan keuntungan (MAX) sambil mengasumsikan lawan akan meminimalkan keuntungan tersebut (MIN). Karena Minimax memiliki kompleksitas eksponensial, optimisasi krusial seperti Alpha-Beta Pruning sangat penting untuk memangkas cabang pohon yang tidak relevan, membuat pencarian menjadi jauh lebih efisien tanpa mengubah kualitas keputusan.

> [!ad-libitum]- Additional Information
> 
> #### Pencarian dengan Kedalaman Terbatas (Resource Limits)
> 
> Untuk game yang terlalu kompleks untuk dijelajahi sepenuhnya, pendekatan praktis yang digunakan adalah:
> 
> 1. **Cutoff Test**: Menghentikan pencarian setelah kedalaman tertentu (misalnya, 10 langkah ke depan).
>     
> 2. **Evaluation Function**: Karena pencarian tidak mencapai akhir permainan, diperlukan sebuah fungsi evaluasi heuristik untuk _memperkirakan_ seberapa bagus sebuah posisi non-terminal. Fungsi ini biasanya merupakan kombinasi dari berbagai fitur permainan (misalnya dalam catur: material, posisi, keamanan raja).
>     
> 
> #### Game dengan Elemen Acak (Stochastic Games)
> 
> Untuk permainan yang melibatkan elemen acak seperti lemparan dadu (contoh: Backgammon), _game tree_ dimodifikasi dengan menambahkan **chance nodes**. Nilai yang dihitung bukanlah nilai minimax pasti, melainkan **nilai harapan (expected value)** dari semua kemungkinan hasil acak.
> 
> #### Eksplorasi Mandiri
> 
> - Coba visualisasikan proses Alpha-Beta Pruning pada pohon di slide. Lacak nilai alpha dan beta di setiap node untuk memahami mengapa cabang `X` di bawah node `C` bisa dipangkas.
>     
> - Rancang sebuah _evaluation function_ sederhana untuk Tic-Tac-Toe. Misalnya, E(s)=(textjumlahbarisXbisamenang)−(textjumlahbarisObisamenang). Bagaimana fungsi ini bisa membantu Minimax membuat keputusan bahkan sebelum mencapai akhir permainan?
>
