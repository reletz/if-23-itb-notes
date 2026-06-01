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
> > - Apa itu _Interleaving_?
> >     
> > - Mengapa ini penting?
> >     
> > - Apa itu _Forward Checking_?
> >     
> > - Bagaimana cara kerjanya?
> >     
> > - Apa itu _Maintaining Arc Consistency_ (MAC)?
> >     
> > - Apa perbedaan FC dan MAC?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170_Materi04_AI-CSP.pdf (Slide 21-24)
> >     
> 
> > ### Konsep Dasar Interleaving Search and Inference
> > 
> > Daripada melakukan _inference_ hanya sekali di awal, kita bisa menggabungkannya dengan proses pencarian _backtracking_. Setiap kali kita memberikan sebuah nilai ke sebuah variabel, kita langsung melakukan _inference_ untuk melihat dampaknya pada variabel-variabel lain.
> > 
> > **Tujuan Utama**: Mendeteksi kegagalan (failure) sedini mungkin untuk memangkas cabang pencarian yang tidak akan pernah menuju solusi.
> > 
> > ### 1. Forward Checking (FC)
> > 
> > Ini adalah salah satu cara paling sederhana untuk menggabungkan _inference_ dengan pencarian.
> > 
> > **Cara Kerja**:
> > 
> > 1. Ketika sebuah variabel `X` diberi nilai `v`, algoritma akan melihat setiap variabel `Y` yang belum diberi nilai dan terhubung dengan `X` oleh sebuah _constraint_.
> >     
> > 2. Untuk setiap `Y` tersebut, semua nilai di domain `Y` yang tidak konsisten dengan `X=v` akan dihapus.
> >     
> > 3. Jika proses ini menyebabkan domain salah satu variabel `Y` menjadi kosong, maka _assignment_ `X=v` langsung dianggap gagal, dan algoritma akan _backtrack_ saat itu juga, tanpa perlu mencoba variabel lain.
> >     
> > 
> > **Contoh**:
> > 
> > - `WA` diberi warna `merah`.
> >     
> > - _Forward Checking_ akan menghapus `merah` dari domain tetangganya, yaitu `NT` dan `SA`.
> >     
> > - Proses ini terus berlanjut setiap kali sebuah variabel diberi nilai.
> >     
> > 
> > ### 2. Maintaining Arc Consistency (MAC)
> > 
> > MAC adalah strategi yang lebih kuat dan lebih proaktif daripada _Forward Checking_.
> > 
> > **Cara Kerja**:
> > 
> > 1. Sama seperti FC, ketika variabel `X` diberi nilai `v`, proses dimulai.
> >     
> > 2. Namun, alih-alih hanya memeriksa tetangga `X`, algoritma MAC akan menjalankan **algoritma** _**arc consistency**_ **penuh (seperti AC-3)** untuk seluruh CSP.
> >     
> > 3. Ini berarti efek dari sebuah _assignment_ akan **dirambatkan (propagated)** ke seluruh jaringan. Jika penghapusan nilai dari domain `Y` (tetangga `X`) menyebabkan nilai lain harus dihapus dari domain `Z` (tetangga `Y`), MAC akan mendeteksinya, bahkan jika `Z` bukan tetangga langsung dari `X`.
> >     
> > 
> > **Contoh Ilustrasi**:
> > ![[Pasted image 20250921233518.png]]
> > ![[Pasted image 20250921233808.png]]
> > - Dalam gambar di slide 23, setelah beberapa _assignment_, MAC bisa menyimpulkan bahwa `NT` dan `SA` tidak bisa sama-sama biru. Kesimpulan ini mungkin tidak bisa didapat oleh _Forward Checking_ biasa pada tahap yang sama. Jika proses ini menyebabkan domain manapun kosong, algoritma langsung _backtrack_.
> >     

> [!cornell] #### Summary
> 
> Interleaving search and inference adalah strategi untuk mendeteksi kegagalan lebih awal dengan menjalankan inference setiap kali sebuah nilai ditetapkan selama pencarian. Forward Checking (FC) melakukan ini dengan memeriksa dan menyaring domain dari tetangga langsung variabel yang baru ditetapkan. Sementara itu, Maintaining Arc Consistency (MAC) mengambil langkah lebih jauh dengan menjalankan algoritma arc consistency penuh untuk merambatkan (propagate) constraint ke seluruh masalah, membuatnya lebih kuat dalam mendeteksi ketidakkonsistenan.

> [!ad-libitum]- Additional Information
> 
> #### FC vs. MAC: Mana yang Lebih Baik?
> 
> - **Forward Checking**: Lebih ringan secara komputasi pada setiap langkahnya. Ia hanya memeriksa "satu lapis" keluar dari variabel yang baru di-assign.
>     
> - **Maintaining Arc Consistency**: Jauh lebih mahal pada setiap langkah karena bisa jadi ia memeriksa banyak sekali _arcs_ di seluruh graf.
>     
> 
> Namun, **biaya tambahan MAC seringkali terbayarkan**. Dengan mendeteksi lebih banyak kegagalan lebih awal, MAC dapat memangkas cabang-cabang pohon pencarian yang jauh lebih besar. Untuk banyak masalah sulit, pengurangan drastis dalam jumlah _backtrack_ membuat MAC secara keseluruhan lebih cepat daripada _Forward Checking_, meskipun setiap langkahnya lebih lambat.
> 
> #### Kapan Inference Diaktifkan?
> 
> Dalam implementasi pseudocode backtracking (dari catatan sebelumnya), langkah _inference_ (baik FC maupun MAC) akan ditambahkan setelah sebuah nilai di-assign ke variabel, dan sebelum pemanggilan rekursif `BACKTRACK`. Jika _inference_ mengembalikan kegagalan (misalnya, domain kosong), maka pemanggilan rekursif tersebut dilewati dan algoritma langsung mencoba nilai berikutnya.