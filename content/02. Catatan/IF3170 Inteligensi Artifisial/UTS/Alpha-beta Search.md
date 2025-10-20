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
> > - Apa itu Alpha-Beta Pruning?
> >     
> > - Apa tujuan utamanya?
> >     
> > - Apa itu nilai Alpha (α)?
> >     
> > - Apa itu nilai Beta (β)?
> >     
> > - Kapan sebuah cabang dipangkas?
> >     
> > - Seberapa efektif optimisasi ini?
> >     
> >
> > ## Reference Points
> >
> > - IF3170_Materi04-AdversarialSearch.pdf (Slide 10-17)
> >     
> 
> > ### Tujuan dan Ide Inti Alpha-Beta Search
> >
> > Alpha-Beta Search (atau Alpha-Beta Pruning) bukanlah algoritma baru, melainkan sebuah **optimisasi** untuk algoritma Minimax. Tujuannya adalah untuk mengurangi jumlah simpul (nodes) yang perlu dievaluasi dalam _game tree_ secara drastis.
> >
> > Ide utamanya adalah: "Jika kita sudah menemukan sebuah langkah yang bagus, kita tidak perlu membuang waktu mengevaluasi langkah lain yang kita tahu pasti akan lebih buruk." Algoritma ini "memangkas" (prunes) cabang-cabang dari game tree yang tidak akan mungkin mempengaruhi keputusan akhir. Hebatnya, **hasil keputusan akhir akan selalu sama persis dengan Minimax standar.**
> >
> > ### Cara Kerja: Nilai Alpha (α) dan Beta (β)
> >
> > Algoritma ini bekerja dengan melacak dua nilai selama proses penelusuran (depth-first search):
> >
> > 1. **Alpha (α)**:
> > 	- Mewakili nilai **terbaik** (tertinggi) yang bisa dijamin oleh **MAX** sejauh ini, di sepanjang path dari akar.
> > 	- Dimulai dari $-\infty$.
> > 	- Nilai α hanya bisa diperbarui di level MAX.
> >
> > 2. **Beta (β)**:
> > 	- Mewakili nilai **terbaik** (terendah) yang bisa dijamin oleh **MIN** sejauh ini, di sepanjang path dari akar.
> > 	- Dimulai dari $+\infty$.
> > 	- Nilai β hanya bisa diperbarui di level MIN.
> > 
> > ### Kondisi Pruning
> > 
> > Pemangkasan (pruning) terjadi pada sebuah simpul ketika **`α ≥ β`**.
> >
> > - **Logikanya**: Misalkan kita berada di sebuah simpul MIN. Jika nilai Beta (pilihan terbaik MIN saat ini, yaitu nilai terendah) sudah lebih kecil dari atau sama dengan nilai Alpha (jaminan nilai terbaik MAX di cabang lain), maka tidak ada gunanya melanjutkan penelusuran di cabang ini. Mengapa? Karena MAX sudah memiliki opsi lain (yang menghasilkan nilai α) yang lebih baik daripada apa pun yang bisa ditawarkan oleh cabang saat ini (yang terbaiknya saja hanya β). MAX tidak akan pernah memilih jalur ini.
> >     
> > ![[Pasted image 20250915103326.png]]
> > 
> > _Contoh dari slide_: Setelah mengevaluasi cabang B, MAX tahu ia bisa mendapatkan skor minimal 3 (α = 3). Kemudian saat mengevaluasi cabang C, MIN menemukan langkah dengan nilai 2. Pada titik ini, nilai pada simpul C dijamin akan ≤ 2 (β = 2). Karena α (3) ≥ β (2), sisa anak dari C tidak perlu dievaluasi. MAX tidak akan pernah memilih cabang C karena sudah ada cabang B yang lebih baik.
> >
> > ### Efektivitas Alpha-Beta Pruning
> >
> > Efektivitas pruning sangat bergantung pada **urutan evaluasi langkah (move ordering)**.
> >
> > - **Kasus Terbaik**: Jika langkah-langkah terbaik selalu dievaluasi terlebih dahulu, kompleksitas waktu dapat berkurang dari O(bm) menjadi O(bm/2). Ini adalah peningkatan eksponensial, yang berarti kita bisa mencari dua kali lebih dalam dengan jumlah waktu yang sama.
> >     
> > - **Kasus Terburuk**: Jika langkah dievaluasi dalam urutan terburuk, tidak ada cabang yang akan dipangkas sama sekali, dan performanya akan sama dengan Minimax standar.
> >     

> [!cornell] #### Summary
> 
> Alpha-Beta Search adalah sebuah optimisasi cerdas untuk Minimax yang secara signifikan mengurangi kompleksitas komputasi tanpa mengubah hasil akhir. Ini dicapai dengan melacak dua nilai, Alpha (jaminan skor terbaik untuk MAX) dan Beta (jaminan skor terbaik untuk MIN), dan memangkas (pruning) cabang-cabang dalam game tree ketika kondisi α ≥ β terpenuhi, karena cabang tersebut terbukti tidak akan mempengaruhi keputusan optimal.

> [!ad-libitum]- Additional Information
> 
> #### Pentingnya Move Ordering
> 
> Karena efektivitasnya sangat bergantung pada urutan, banyak implementasi game AI menggunakan heuristik untuk mencoba mengevaluasi langkah-langkah yang "menjanjikan" terlebih dahulu. Beberapa contoh heuristik sederhana:
> 
> - Dalam catur, prioritaskan langkah yang melakukan skak atau menangkap bidak lawan.
>     
> - Simpan hasil dari pencarian sebelumnya (misalnya, menggunakan _iterative deepening_) untuk mengurutkan langkah pada pencarian yang lebih dalam.
>     
> 
> #### Beyond Alpha-Beta
> 
> Meskipun sangat kuat, Alpha-Beta masih merupakan pencarian _brute-force_ yang terbatas oleh kedalaman. Teknik modern untuk game AI yang lebih kompleks seperti Go atau catur tingkat atas sering menggunakan metode lain seperti **Monte Carlo Tree Search (MCTS)**, yang digunakan oleh AlphaGo, yang menyeimbangkan antara eksplorasi dan eksploitasi untuk mencari di pohon permainan yang sangat besar.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Visualisasi langkah demi langkah yang sangat baik dapat dilihat pada slide 11 hingga 17.
>     
> - Cari "Alpha-Beta Pruning Visualization" di YouTube untuk melihat animasi interaktif yang menjelaskan prosesnya secara detail.
>
