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
> > - Apa itu Classical Search?
> >     
> > - Apa fokus utama Classical Search?
> >     
> > - Kapan path menjadi tidak relevan?
> >     
> > - Apa itu Local Search?
> >     
> > - Apa perbedaan fundamentalnya?
> >     
> > - Bagaimana analogi State-Space Landscape?
> >     
> > - Apa tantangan utama Local Search?
> >     
> >
> > ## Reference Points
> > 
> > - IF3170_PPTLocalSearch.pdf
> >     
> 
> > ### Karakteristik Classical Search
> > 
> > **Classical Search** adalah metode pencarian yang bekerja di lingkungan yang diketahui (deterministik dan dapat diobservasi). Algoritma dalam kategori ini secara sistematis menjelajahi ruang pencarian (_search space_) untuk menemukan solusi.
> > 
> > - **Fokus Utama**: Fokus utama dari Classical Search adalah menemukan **urutan langkah atau path (jalur)** dari _initial state_ (keadaan awal) menuju _goal state_ (keadaan tujuan).
> >     
> > - **Solusi**: Solusi yang dihasilkan adalah sebuah **urutan aksi** (misalnya: "turun, kanan, turun") yang memandu agen dari awal hingga akhir.
> >     
> > - **Contoh Praktis**: Bayangkan menggunakan GPS untuk mencari rute dari rumah ke kantor. Anda tidak hanya ingin tahu lokasi kantor (tujuan), tetapi Anda membutuhkan petunjuk belokan demi belokan (path) untuk sampai ke sana. Contoh lainnya adalah penyelesaian N-Puzzle, di mana setiap geseran ubin adalah bagian penting dari solusi.
> >     
> > 
> > ### Keterbatasan Classical Search: Ketika Path Tidak Relevan
> > 
> > Dalam banyak masalah optimisasi, **path untuk mencapai tujuan tidaklah penting**. Yang terpenting adalah **konfigurasi akhir** dari solusi itu sendiri.
> > 
> > - **Analogi**: Jika Anda merakit sebuah furnitur, urutan pemasangan beberapa sekrup mungkin tidak penting, selama hasil akhirnya adalah sebuah kursi yang kokoh.
> >     
> > - **Contoh Teknis (N-Queen Problem)**: Dalam masalah N-Queen, tujuannya adalah menempatkan N ratu di papan catur sehingga tidak ada yang saling menyerang. Tidak peduli ratu mana yang Anda letakkan lebih dulu atau di kolom mana Anda memulai. Solusi yang valid adalah **konfigurasi akhir penempatan ratu**, bukan urutan Anda meletakkannya. Mencari solusi N-Queen dengan Classical Search (seperti BFS) bisa sangat tidak efisien karena ia akan menjelajahi banyak path yang pada akhirnya menuju ke konfigurasi yang sama atau tidak valid.
> >     
> > 
> > ### Konsep Local Search
> > 
> > Untuk masalah di mana path tidak relevan, kita menggunakan kelas algoritma yang disebut **Local Search**. Algoritma ini bekerja pada formulasi _complete state_, artinya setiap _state_ sudah merupakan konfigurasi solusi yang lengkap.
> > 
> > - **Cara Kerja**: Alih-alih melacak path, Local Search hanya menyimpan **satu** _**current state**_ (keadaan saat ini) dan mencoba memperbaikinya dengan melakukan perpindahan ke _**neighbor state**_ (keadaan tetangga).
> >     
> > - **Evaluasi State**: Tidak ada _path cost_. Kualitas sebuah _state_ diukur oleh **objective function** atau **heuristic cost function** yang memberikan sebuah nilai (_value_). Tujuannya adalah menemukan _state_ dengan nilai maksimum (atau minimum, tergantung masalahnya).
> >     
> > - **Solusi**: Solusi dalam Local Search adalah **final state** itu sendiri, yaitu _state_ di mana pencarian berhenti, yang diharapkan merupakan solusi terbaik.
> >     
> > 
> > ### Perbandingan Langsung: Classical vs. Local Search (Studi Kasus: N-Queen)
> > 
> > |**Aspek**|**Classical Search**|**Local Search**|
> > |---|---|---|
> > |**Definisi State**|Pengaturan dari 0 hingga N ratu di papan (bersifat inkremental/bertahap).|Pengaturan dari N ratu di papan (selalu _complete_/lengkap).|
> > |**Initial State**|Papan catur kosong.|Sebuah konfigurasi acak dari N ratu di papan.|
> > |**Aksi (Action)**|Menambahkan satu ratu ke kotak kosong.|Memindahkan satu ratu ke kotak lain di kolom yang sama (pindah ke _neighbor_).|
> > |**Goal Test**|Terdapat N ratu di papan, dan tidak ada yang saling menyerang.|Nilai dari _state_ mencapai **global maximum** (misalnya, nilai heuristik = 0).|
> > |**Bentuk Solusi**|**Path** (urutan penambahan ratu).|**Final State** (konfigurasi akhir dari ratu).|
> > 
> > ### Analogi State-Space Landscape
> > 
> > Ruang pencarian pada Local Search dapat divisualisasikan sebagai sebuah lanskap atau permukaan geografis.
> > 
> > - **Lokasi**: Setiap titik di lanskap merepresentasikan sebuah **state**.
> >     
> > - **Ketinggian**: Ketinggian setiap titik ditentukan oleh nilai dari **objective function**.
> >     
> > - **Tujuan**: Tujuan Local Search adalah menemukan titik tertinggi di seluruh lanskap, yang disebut **global maximum**.
> >     
> > 
> > Bayangkan Anda adalah seorang pendaki yang berada di tengah kabut tebal. Anda hanya bisa melihat area di sekitar Anda (_neighbor state_). Untuk mencapai puncak, Anda akan selalu melangkah ke arah yang lebih tinggi.
> > 
> > ### Tantangan Utama: Terjebak di Local Maximum
> > 
> > Masalah utama dari pendekatan ini adalah risiko terjebak di **local maximum**.
> > 
> > - **Definisi**: _Local maximum_ adalah sebuah "puncak" yang lebih tinggi dari semua tetangganya, tetapi bukan puncak tertinggi di seluruh lanskap.
> >     
> > - **Analogi Pendaki**: Anda sampai di puncak sebuah bukit kecil. Karena setiap langkah di sekitar Anda akan membawa Anda ke tempat yang lebih rendah, Anda berhenti dan mengira telah mencapai puncak tertinggi, padahal gunung Everest (_global maximum_) berada di tempat lain.
> >     

> [!cornell] #### Summary
> Classical Search berfokus pada penemuan _**path**_ atau urutan langkah dari titik awal ke tujuan, sehingga sangat cocok untuk masalah di mana proses atau rute adalah solusinya (seperti navigasi atau puzzle). Sebaliknya, Local Search digunakan untuk masalah optimisasi di mana _**path**_ tidak relevan dan yang terpenting adalah _**konfigurasi akhir**_ dari solusi; ia bekerja dengan cara memperbaiki satu solusi lengkap secara iteratif, namun memiliki tantangan utama yaitu risiko terjebak dalam solusi suboptimal yang dikenal sebagai _**local maximum**_.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Jenis-Jenis "Puncak" dalam State-Space Landscape
> 
> Selain _local maximum_, ada beberapa kondisi lain dalam lanskap yang bisa menghambat pencarian:
> 
> - **Flat Local Maximum**: Ini adalah sebuah area datar di mana semua _neighbor_ memiliki nilai yang sama. Algoritma seperti Hill Climbing standar akan berhenti di sini karena tidak ada langkah "naik" yang bisa diambil.
>     
> - **Shoulder**: Ini adalah area datar yang bukan merupakan puncak, tetapi memiliki kemiringan nol untuk sementara sebelum kembali menanjak. Jika algoritma tidak diizinkan untuk bergerak "menyamping" (ke state dengan nilai yang sama), ia bisa berhenti di sini.
>     
> 
> #### Kapan Menggunakan Masing-Masing Pendekatan?
> 
> - **Gunakan Classical Search ketika:**
>     
>     - Urutan aksi adalah bagian krusial dari solusi.
>         
>     - Contoh: Mencari rute terpendek di peta (algoritma A*), menyelesaikan Rubik's Cube, memenangkan permainan Tic-Tac-Toe.
>         
> - **Gunakan Local Search ketika:**
>     
>     - Anda mencari konfigurasi "terbaik" dari suatu set variabel.
>         
>     - Contoh: Penjadwalan (misalnya, jadwal penerbangan atau jadwal kuliah), desain layout sirkuit VLSI, penentuan pelipatan protein (_protein folding_), dan masalah N-Queen.
>         
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan masalah sehari-hari dan kategorikan apakah penyelesaiannya lebih cocok menggunakan Classical atau Local Search. Misalnya, bagaimana dengan merencanakan liburan? Menyusun portofolio investasi? Atau merapikan kamar?
>     
> - Telusuri istilah "NP-hard problems". Banyak dari masalah ini yang seringkali didekati menggunakan algoritma Local Search karena pencarian solusi optimal secara sistematis (seperti Classical Search) memakan waktu yang tidak realistis (eksponensial).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**: _Artificial Intelligence: A Modern Approach_ oleh Stuart Russell dan Peter Norvig, khususnya bab mengenai "Local Search Algorithms".
>     
> - **Topik Terkait**: Pelajari lebih lanjut tentang **Heuristic Function**, **Optimization Problems**, dan algoritma spesifik yang merupakan pengembangan dari Local Search seperti **Hill Climbing**, **Simulated Annealing**, dan **Genetic Algorithms**.
>