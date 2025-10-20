---


type: Note

cssclasses:

- cornell-notes
---
_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Optimisasi Kueri?
> >     
> > - Mengapa Optimisasi Penting?
> >     
> > - Apa itu Rencana Evaluasi (Evaluation Plan)?
> >     
> > - Apa itu Aturan Ekuivalensi (Equivalence Rules)?
> >     
> > - Tujuan Mendorong Seleksi (Pushing Selections)?
> >     
> > - Tujuan Mendorong Proyeksi (Pushing Projections)?
> >     
> > - Pentingnya Urutan Join (Join Ordering)?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides: 7 - Query Optimization.pdf (Hal. 4-25)
> >     
> 
> > ### Pengantar Optimisasi Kueri
> > ![[Pasted image 20250925093725.png]]
> > Optimisasi Kueri adalah proses yang dilakukan oleh sistem manajemen basis data (DBMS) untuk menemukan **rencana evaluasi (evaluation plan)** yang paling efisien dari berbagai alternatif yang ada untuk sebuah kueri SQL. Tujuannya adalah untuk mendapatkan hasil kueri dengan biaya (cost) terendah, yang biasanya diukur dari segi waktu eksekusi, penggunaan CPU, dan I/O disk.
> > 
> > **Pentingnya Optimisasi:** Perbedaan biaya antara rencana evaluasi yang buruk dan yang baik bisa sangat besar, misalnya antara beberapa detik melawan beberapa hari. Sebuah kueri tunggal dapat diekspresikan dalam banyak cara yang ekuivalen secara logika menggunakan aljabar relasional. Optimizer bertugas memilih representasi dan algoritma yang paling murah.
> > 
> > ### Rencana Evaluasi (Evaluation Plan)
> > 
> > Rencana evaluasi adalah "resep" detail yang memberitahu sistem bagaimana cara mengeksekusi sebuah kueri. Rencana ini mendefinisikan:
> > 
> > 1. **Urutan Operasi:** Misalnya, join mana yang dilakukan terlebih dahulu.
> >     
> > 2. **Algoritma Spesifik:** Algoritma apa yang digunakan untuk setiap operasi (misalnya, _hash join_ vs. _merge join_).
> >     
> > 3. **Cara Akses Data:** Apakah menggunakan _linear scan_ (membaca seluruh tabel) atau memanfaatkan _index_.
> >     
> > 4. **Penanganan Data Antara:** Apakah hasil sementara (intermediate) disimpan ke disk atau di-_pipeline_ (langsung diberikan sebagai input ke operasi berikutnya).
> >     
> > 
> > ### Aturan Ekuivalensi (Equivalence Rules)
> > 
> > Aturan ekuivalensi adalah fondasi dari optimisasi berbasis transformasi. Aturan ini menyatakan bahwa dua ekspresi aljabar relasional adalah ekuivalen jika keduanya menghasilkan set tupel yang sama untuk setiap instans basis data yang valid. Optimizer menggunakan aturan ini untuk mengubah satu pohon ekspresi (expression tree) menjadi pohon lain yang ekuivalen, dengan harapan menemukan bentuk yang lebih murah untuk dieksekusi.
> > 
> > Beberapa aturan kunci meliputi:
> > 
> > 1. Operasi seleksi konjungtif dapat diuraikan menjadi urutan seleksi individual: 
> > $$σ_{θ_1​∧θ_2}​​(E)=σ_{θ_1}​​(σ_{θ_2}​​(E))$$ 
> >     
> > 2. Operasi seleksi bersifat komutatif: 
> > $$σ_{θ_1}​​(σ_{θ_2}​​(E))=σ_{θ_2}​​(σ_{θ_1}​​(E))$$
> >     
> > 3. Hanya operasi proyeksi terakhir dalam urutan yang diperlukan, yang lain dapat dihilangkan: 
> > $$Π_{L_1}​​(Π_{L_2}​​(...(Π_{L_n}​​(E))...))=Π_{L_1}​​(E)$$
> >     
> > 4. Seleksi dapat digabungkan dengan produk Kartesius dan theta join:
> >     
> >     a. $σ_θ​(E_1​×E_2​)=E_1​ \bowtie _\theta E_2$​
> >     
> >     b. $σ_{θ_1}​​(E_1​⋈_{θ_2}​​E_2​)=E_1​⋈_{θ_1​∧θ_2}E_2​$
> >     
> > 5. Operasi theta-join (dan natural join) bersifat komutatif: 
> > $$E_1​⋈_θ​E_2​=E_2​⋈_θ​E_1​$$
> >     
> > 6. a. Operasi natural join bersifat asosiatif: $(E_1​⋈E_2​)⋈E_3​=E_1​⋈(E_2​⋈E_3​)$
> >     
> >     b. Theta join bersifat asosiatif dengan cara berikut: $(E_1​⋈_{θ_1}​​E_2​)⋈_{θ_2​∧θ_3}​​E_3​=E_1​⋈_{θ_1​∧θ_3}​​(E_2​⋈_{θ_2}​​E_3​)$ di mana $θ_2$​ hanya melibatkan atribut dari $E_2$​ dan $E_3$​.
> >     
> > 7. Operasi seleksi distributif terhadap operasi theta join dalam dua kondisi berikut:
> >     
> >     a. Ketika semua atribut dalam $θ_0$​ hanya melibatkan atribut dari salah satu ekspresi (E1​) yang digabungkan: $σ_{θ_0}​​(E_1​⋈_θ​E_2​)=(σ_{θ_0}​​(E_1​))⋈_θ​E_2​$
> >     
> >     b. Ketika θ1​ hanya melibatkan atribut dari E1​ dan θ2​ hanya melibatkan atribut dari E2​: $σ_{θ_1​∧θ_2}​​(E_1​⋈_θ​E_2​)=(σ_{θ_1}​​(E_1​))⋈_θ​(σ_{θ_2}​​(E_2​))$
> >     
> > 8. Operasi proyeksi distributif terhadap operasi theta join sebagai berikut:
> >     
> >     a. jika θ hanya melibatkan atribut dari $L_1​∪L_2$​: $Π_{L_1​∪L_2}​​(E_1​⋈_θ​E_2​)=(Π_{L_1}​​(E_1​))⋈_θ​(Π_{L_2}​​(E_2​))$
> >     
> >     b. Pertimbangkan join $E_1​⋈_θ​E_2$​. Misalkan L1​ dan L2​ adalah himpunan atribut dari E1​ dan E2​. Misalkan L3​ adalah atribut dari E1​ yang terlibat dalam kondisi join θ tetapi tidak ada di $L_1​∪L_2$​, dan L4​ adalah atribut dari E2​ yang terlibat dalam kondisi join θ tetapi tidak ada di $L_1​∪L_2$​: $Π_{L_1​∪L_2}​​(E_1​⋈_θ​E_2​)=(Π_{L_1​∪L_2}​​((Π_{L_1​∪L_3}​​(E_1​))⋈_θ​(Π_{L_2∪L_4}​​(E_2​)))$
> >     
> > 9. Operasi himpunan union dan intersection bersifat komutatif: $E_1​∪E_2$​=$E_2​∪_E1​$, $E_1​∩E_2​=E_2​∩E_1$​. Set difference tidak komutatif.
> >     
> > 10. Set union dan intersection bersifat asosiatif: $(E_1​∪E_2​)∪E_3​=E_1​∪(E_2​∪E_3​)$, $(E_1​∩E_2​)∩E_3​=E_1​∩(E_2​∩E_3​)$  
> >     
> > 11. Operasi seleksi distributif terhadap $∪$, $∩$, dan $-$: $σ_θ​(E_1​−E_2​)=σ_θ​(E_1​)−σ_θ​(E_2​)$ dan serupa untuk ∪ dan ∩. Juga: $σ_θ​(E_1​−E_2​)=σ_θ​(E_1​)−E_2​$ dan serupa untuk ∩, tetapi tidak untuk ∪.
> >     
> > 12. Operasi proyeksi distributif terhadap union: $Π_L​(E_1​∪E_2​)=(Π_L​(E_1​))∪(Π_L​(E_2​))$
> >
> > 
> > ### Mendorong Seleksi (Pushing Selections)
> > 
> > Ini adalah strategi untuk melakukan operasi seleksi (σ) **sedini mungkin** dalam pohon evaluasi.
> > 
> > - **Tujuan:** Untuk mengurangi jumlah tupel (baris) dalam relasi perantara secepat mungkin.
> >     
> > - **Contoh:** Daripada menggabungkan (join) seluruh tabel `instructor` dan `teaches` lalu memfilternya, lebih baik filter dulu tabel `instructor` untuk departemen 'Music' ($\sigma_{dept\_name=Music}(instructor)$), baru kemudian hasilnya di-join dengan `teaches`.
> >     
> > - **Manfaat:** Join adalah operasi yang mahal. Dengan mengurangi ukuran salah satu (atau kedua) inputnya, biaya join dapat diturunkan secara drastis.
> >     
> > 
> > ### Mendorong Proyeksi (Pushing Projections)
> > 
> > Mirip dengan seleksi, ini adalah strategi untuk melakukan operasi proyeksi (Π) **sedini mungkin**.
> > 
> > - **Tujuan:** Untuk mengurangi jumlah atribut (kolom) dalam relasi perantara.
> >     
> > - **Manfaat:** Tupel yang lebih "ramping" (sedikit kolom) membutuhkan lebih sedikit ruang di memori atau disk, mengurangi biaya I/O saat menulis dan membaca hasil perantara. Ini sangat berguna sebelum operasi join yang mungkin melibatkan banyak atribut yang sebenarnya tidak diperlukan di hasil akhir.
> >     
> > 
> > ### Pentingnya Urutan Join (Join Ordering)
> > 
> > Berdasarkan sifat asosiatif dari join, urutan eksekusi join dapat diubah.
> > 
> > - **Tujuan:** Selalu lakukan join yang menghasilkan relasi perantara **terkecil** terlebih dahulu.
> >     
> > - **Contoh:** Jika kita harus join tiga tabel A, B, dan C, dan kita tahu bahwa hasil dari (A ⋈ B) akan sangat kecil, sementara (B ⋈ C) sangat besar, maka memilih urutan (A $\bowtie$ B) $\bowtie$ C jauh lebih baik daripada A $\bowtie$ (B $\bowtie$ C).
> >     
> > - **Tantangan:** Menemukan urutan join optimal adalah masalah yang sangat kompleks (NP-hard), karena jumlah kemungkinan urutan tumbuh secara faktorial dengan jumlah tabel.
> >     

> [!cornell] #### Summary
> 
> **Optimisasi kueri adalah proses vital untuk menemukan rencana evaluasi (execution plan) dengan biaya terendah di antara banyak alternatif yang logis ekuivalen. Hal ini dicapai dengan menerapkan serangkaian aturan ekuivalensi untuk mentransformasi ekspresi aljabar relasional awal. Strategi utamanya adalah "mendorong" operasi seleksi (mengurangi baris) dan proyeksi (mengurangi kolom) sedini mungkin untuk secara drastis mengurangi ukuran data perantara sebelum melakukan operasi join yang mahal. Selain itu, memilih urutan join yang tepat dengan menggabungkan relasi yang lebih kecil terlebih dahulu memainkan peran krusial dalam meminimalkan biaya komputasi secara keseluruhan.**