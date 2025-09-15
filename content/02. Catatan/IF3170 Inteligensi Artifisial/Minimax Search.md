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
> > - Apa tujuan Algoritma Minimax?
> >     
> > - Bagaimana cara kerja Minimax?
> >     
> > - Apa itu nilai "propagasi"?
> >     
> > - Bagaimana pseudocode-nya?
> >     
> > - Apa saja properti Minimax?
> >     
> > - Apa kelemahan utamanya?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170_Materi04-AdversarialSearch.pdf (Slide 5-9)
> >     
> 
> > ### Tujuan dan Ide Inti Minimax
> > 
> > Minimax adalah algoritma rekursif yang digunakan untuk memilih langkah optimal bagi seorang pemain (kita sebut **MAX**) dengan asumsi bahwa lawan (**MIN**) juga akan selalu bermain secara optimal.
> > 
> > Ide utamanya adalah untuk menjelajahi seluruh _game tree_ hingga ke _terminal states_ (daun), lalu "mempropagasi" atau menaikkan nilai utilitas dari bawah ke atas.
> > 
> > - Di level **MAX**, algoritma akan memilih langkah yang menghasilkan nilai **maksimum**.
> >     
> > - Di level **MIN**, algoritma akan memilih langkah yang menghasilkan nilai **minimum**.
> >     
> > 
> > Dengan cara ini, MAX dapat membuat keputusan terbaik di _root_ dengan mempertimbangkan skenario terburuk yang mungkin dilakukan oleh MIN di setiap gilirannya.
> > 
> > ### Cara Kerja Algoritma Minimax
> > 
> > Prosesnya berjalan dari bawah ke atas (depth-first search):
> > 
> > 1. **Generate Game Tree**: Bangun seluruh pohon permainan hingga kedalaman tertentu atau sampai bertemu _terminal states_.
> >     
> > 2. **Hitung Utilitas**: Terapkan fungsi utilitas pada setiap _terminal state_.
> >     
> > 3. **Propagasi Nilai ke Atas**:
> >     
> >     - Dari _terminal states_, naik satu level.
> >         
> >     - Jika level tersebut adalah giliran **MIN**, simpul induknya akan mengambil nilai **terkecil** dari anak-anaknya.
> >         
> >     - Jika level tersebut adalah giliran **MAX**, simpul induknya akan mengambil nilai **terbesar** dari anak-anaknya.
> >         
> >     - Proses ini diulang terus hingga mencapai simpul akar (_root_).
> >         
> > 4. **Pilih Langkah**: Di simpul akar, MAX akan memilih langkah (edge) yang menuju ke simpul anak dengan nilai tertinggi. Nilai ini adalah _nilai Minimax_ dari state awal.
> >     
> > ![[Pasted image 20250915102844.png]]
> > _Contoh_: Pada gambar di atas, di level MIN, simpul B memilih nilai `min(3, 12, 8) = 3`. Simpul C memilih `min(2, 4, 6) = 2`, dan D memilih `min(14, 5, 2) = 2`. Kemudian di level MAX, simpul A akan memilih `max(3, 2, 2) = 3`. Jadi, langkah optimal untuk MAX adalah menuju simpul B.
> > 
> > ### Properti Algoritma Minimax
> > 
> > - **Completeness**: **Ya**, Minimax akan selalu menemukan solusi jika pohon permainan terbatas (finite).
> >     
> > - **Optimality**: **Ya**, Minimax akan menemukan langkah optimal jika lawan juga bermain secara optimal.
> >     
> > - **Time Complexity**: $O(b^m$), di mana `b` adalah _branching factor_ dan `m` adalah kedalaman maksimum. Algoritma harus mengunjungi setiap simpul di pohon.
> >     
> > - **Space Complexity**: O(bm), karena menggunakan _depth-first search_ untuk menelusuri pohon.
> >     

> [!cornell] #### Summary
> 
> Algoritma Minimax menentukan langkah optimal dengan melakukan eksplorasi depth-first search pada game tree, lalu mempropagasi nilai utilitas dari bawah ke atas. Pada setiap level, pemain MAX akan memilih langkah yang memaksimalkan nilai, sementara pemain MIN akan memilih langkah yang meminimalkan nilai, sehingga memungkinkan pemain untuk membuat keputusan terbaik dengan mengasumsikan permainan sempurna dari lawan.

> [!ad-libitum]- Additional Information
> 
> #### Kelemahan Utama: Kompleksitas
> 
> Kelemahan terbesar Minimax adalah kompleksitas waktunya (O(bm)). Untuk game yang kompleks seperti Catur, di mana _branching factor_ (b) sekitar 35 dan kedalaman permainan (m) bisa mencapai 100, mustahil untuk mengeksplorasi seluruh pohon.
> 
> Akibatnya, dalam implementasi nyata, Minimax seringkali dibatasi pada kedalaman tertentu (disebut _depth limit_). Namun, ini menimbulkan masalah baru: bagaimana cara mengevaluasi posisi jika kita tidak mencapai _terminal state_? Untuk itu, kita memerlukan **fungsi evaluasi heuristik** yang dapat memberikan perkiraan skor untuk state non-terminal.
> 
> #### Minimax untuk Game Multiplayer
> 
> Algoritma ini dapat diperluas untuk game dengan lebih dari dua pemain. Alih-alih satu nilai utilitas, setiap simpul akan memiliki sebuah vektor nilai `(v1, v2, v3, ...)` yang merepresentasikan utilitas untuk setiap pemain. Setiap pemain kemudian akan memilih langkah yang memaksimalkan utilitas pribadinya.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Pseudocode detail dapat dilihat pada slide 5 materi.
>     
> - Video Visualisasi Minimax: Cari "Minimax Algorithm Explained" di YouTube untuk melihat animasi cara kerjanya.
>