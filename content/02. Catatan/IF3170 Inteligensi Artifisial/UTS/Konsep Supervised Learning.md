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
> > - Apa definisi Supervised Learning?
> >     
> > - Apa itu Inductive Learning?
> >     
> > - Apa itu Training Set?
> >     
> > - Apa tujuan utama dari proses belajar ini?
> >     
> > - Apa itu hipotesis `h`?
> >     
> > - Apa hubungan antara `h` dan `f`?
> >     
> > - Apa beda Klasifikasi dan Regresi?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Materi-08-Seg-02 - Learning - Supervised.pdf (Slide 3-4)
> >     
> > - Tom Mitchell, "Machine Learning", 1997.
> >     
> 
> > ### Supervised Learning: Belajar dari Contoh Berlabel
> > 
> > **Supervised Learning** adalah paradigma pembelajaran mesin di mana agen belajar dari sekumpulan data yang sudah diberi label dengan benar. Setiap data poin dalam set pelatihan terdiri dari pasangan input-output.
> > 
> > - **Input**: Disebut juga fitur, atribut, atau variabel independen (disimbolkan dengan **X**).
> >     
> > - **Output**: Disebut juga label, target, atau variabel dependen (disimbolkan dengan **y** atau **f(x)**).
> >     
> > 
> > **Training Set** adalah koleksi dari pasangan `<data, label>` ini. Analogi sederhananya adalah belajar dengan seorang "guru" yang memberikan soal (input) beserta kunci jawabannya (output).
> > 
> > ### Inductive Learning: Dari Spesifik ke Umum
> > 
> > Proses belajar dalam Supervised Learning disebut **Inductive Learning**. Ini adalah proses untuk menyimpulkan sebuah **fungsi umum** dari **contoh-contoh spesifik**.
> > 
> > - **Fungsi Target (f)**: Ini adalah fungsi "ideal" atau "sebenarnya" yang memetakan input ke output. Dalam dunia nyata, kita **tidak pernah tahu** bentuk pasti dari fungsi ini.
> >     
> > - **Hipotesis (h)**: Ini adalah fungsi yang **dipelajari** oleh algoritma dari data latih. Tujuannya adalah agar `h` bisa **mengaproksimasi** atau mendekati `f` (`h ≈ f`) sebaik mungkin.
> >     
> > 
> > Alur prosesnya adalah:
> > 
> > 1. Algoritma menerima **Training Set**.
> >     
> > 2. Melalui proses _Inductive Learning_, algoritma menghasilkan sebuah **Hipotesis `h`**.
> >     
> > 3. Hipotesis `h` ini kemudian digunakan untuk membuat prediksi pada **data baru yang belum pernah dilihat (unseen data)**.
> >     
> > 
> > ### Klasifikasi vs. Regresi
> > 
> > Supervised Learning umumnya dibagi menjadi dua jenis tugas utama, tergantung pada domain dari label/outputnya:
> > 
> > 1. **Klasifikasi (Classification)**:
> >     
> >     - Tujuannya adalah memprediksi **label kategori/diskrit**.
> >         
> >     - Domain dari labelnya adalah sebuah himpunan nilai yang terbatas.
> >         
> >     - **Contoh**: Memprediksi apakah sebuah email adalah 'spam' atau 'bukan spam'; mengklasifikasikan spesies bunga ('setosa', 'versicolor', 'virginica').
> >         
> > 2. **Regresi (Regression)**:
> >     
> >     - Tujuannya adalah memprediksi **nilai numerik/kontinu**.
> >         
> >     - Domain dari labelnya bisa berupa nilai riil apa pun.
> >         
> >     - **Contoh**: Memprediksi harga rumah berdasarkan luasnya; memprediksi suhu besok hari.
> >         

> [!cornell] #### Summary
> 
> **Supervised Learning adalah proses** _**Inductive Learning**_ **di mana sebuah model belajar dari** _**training set**_ **yang berisi pasangan input-output berlabel. Tujuannya adalah untuk menemukan sebuah fungsi hipotesis (`h`) yang dapat mengaproksimasi fungsi target (`f`) yang tidak diketahui, sehingga model dapat melakukan generalisasi untuk memprediksi output pada data baru, baik dalam bentuk kategori (Klasifikasi) maupun nilai kontinu (Regresi).**

> [!ad-libitum]- Additional Information
> 
> #### Ruang Hipotesis (Hypothesis Space)
> 
> Setiap algoritma machine learning memiliki **Ruang Hipotesis (H)**, yaitu himpunan semua kemungkinan fungsi `h` yang dapat dipertimbangkan oleh algoritma tersebut. Misalnya, ruang hipotesis untuk regresi linear adalah himpunan semua kemungkinan garis lurus. Proses _training_ pada dasarnya adalah sebuah proses **pencarian** di dalam ruang hipotesis ini untuk menemukan `h` yang paling cocok dengan data latih.
> 
> #### Bias Induktif (Inductive Bias)
> 
> Karena kita tidak pernah melihat semua data yang mungkin ada, bagaimana sebuah model bisa melakukan generalisasi dari data latih yang terbatas ke data baru? Jawabannya adalah karena setiap algoritma memiliki **bias induktif**, yaitu seperangkat asumsi yang dibuat oleh algoritma untuk dapat melakukan prediksi pada data yang belum pernah dilihat.
> 
> - **Contoh**: Bias dari regresi linear adalah asumsi bahwa hubungan antara input dan output adalah linear. Bias dari algoritma Decision Tree adalah preferensi untuk pohon yang lebih sederhana (prinsip _Occam's Razor_).
>     
> - Tanpa bias induktif, pembelajaran murni dari data tidak akan mungkin terjadi. Memilih algoritma yang tepat berarti memilih algoritma dengan bias induktif yang paling sesuai dengan masalah yang dihadapi.
>     
> 
> #### Eksplorasi Mandiri
> 
> Pikirkan tentang bagaimana Anda belajar membedakan antara apel dan jeruk saat kecil. Anda diberi contoh spesifik ("Ini apel", "Ini jeruk"). Otak Anda kemudian melakukan _inductive learning_ untuk membangun model internal (hipotesis `h`) berdasarkan fitur-fitur seperti warna, bentuk, dan tekstur. Model ini yang kemudian Anda gunakan untuk mengklasifikasikan buah baru yang Anda lihat.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Tom Mitchell, "Machine Learning" (1997) - Buku klasik yang memberikan dasar-dasar teori pembelajaran mesin, termasuk Inductive Learning.
>     
> - **Video**: Andrew Ng - "Machine Learning" on Coursera/YouTube. Penjelasan yang sangat intuitif tentang konsep-konsep dasar ini.
>