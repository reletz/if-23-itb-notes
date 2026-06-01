---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Pengenalan dan Arsitektur KBA
> 
> > ## Questions/Cues
> > 
> > - Apa itu KBA with Learning?
> >     
> > - Mengapa agen perlu belajar?
> >     
> > - Apa saja 4 komponen utama agen pembelajar?
> >     
> > - Bagaimana interaksi antar komponen?
> >     
> > - Apa itu Performance Element?
> >     
> > - Apa peran Critic?
> >     
> > - Apa fungsi Learning Element?
> >     
> > - Mengapa perlu Problem Generator?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170 - Materi 08 - Seg 01, Slide 3-6
> >     
> > - Russell, S. J., & Norvig, P. (2010). Artificial Intelligence- A Modern Approach.
> >     
> 
> > ### Apa itu Knowledge-Based Agent (KBA) with Learning?
> > 
> > **Knowledge-Based Agent (KBA) with Learning** adalah sebuah agen cerdas yang tidak hanya beroperasi berdasarkan basis pengetahuan (knowledge-base) yang sudah ada, tetapi juga mampu **memperbarui dan meningkatkan pengetahuannya secara mandiri** melalui observasi dan pengalaman.
> > 
> > Berbeda dengan KBA standar di mana perancang harus memasukkan semua pengetahuan secara manual (melalui perintah `TELL`), agen pembelajar dapat:
> > 
> > 1. **Memulai dari Awal**: Umumnya memulai dengan basis pengetahuan yang kosong atau sangat minim.
> >     
> > 2. **Beradaptasi di Lingkungan Asing**: Mampu beroperasi di lingkungan yang awalnya tidak diketahui sama sekali, karena ia dapat belajar tentang dinamika lingkungan tersebut seiring waktu.
> >     
> > 3. **Meningkatkan Kinerja**: Secara aktif menggunakan observasi dari dunia untuk memperbaiki performanya dalam menyelesaikan tugas-tugas di masa depan.
> >     
> > 
> > **Analogi**: Bayangkan perbedaan antara robot pabrik yang diprogram untuk satu tugas spesifik (KBA standar) dengan robot penjelajah Mars (KBA with Learning). Robot pabrik akan gagal jika ada sedikit perubahan, sementara robot penjelajah harus bisa belajar dari medan baru, cuaca tak terduga, dan membuat keputusan untuk bertahan hidup dan menyelesaikan misinya.
> > 
> > ### Mengapa Kemampuan Belajar Diperlukan?
> > 
> > Kemampuan belajar sangat krusial bagi agen karena tiga alasan utama:
> > 
> > 1. **Untuk Menghadapi Lingkungan yang Tidak Diketahui (Unknown Environments)**: Perancang sistem tidak mungkin mengetahui semua kemungkinan situasi yang akan dihadapi agen (_designer lacks omniscience_). Kemampuan belajar memungkinkan agen untuk memahami dinamika dunianya sendiri tanpa harus diberi tahu semuanya dari awal.
> >     
> > 2. **Sebagai Metode Konstruksi Sistem yang Efisien (System Construction Method)**: Jauh lebih praktis untuk "melatih" agen dengan menghadapkannya pada data atau contoh dari dunia nyata daripada mencoba menuliskan semua aturan secara manual.
> >     
> >     - **Contoh**: Untuk mengajari agen mengenali gambar kucing, lebih mudah memberikan ribuan gambar kucing dan membiarkannya belajar, daripada mencoba menulis kode yang mendefinisikan "kucing" secara sempurna dalam segala bentuk, warna, dan ras.
> >         
> > 6. **Untuk Meningkatkan Kinerja (Improve Performance)**: Agen secara aktif memodifikasi mekanisme pengambilan keputusannya berdasarkan observasi dan umpan balik (_feedback_). Hal ini memungkinkannya menjadi lebih baik dan lebih efisien dalam bertindak di masa depan.
> >     
> > 
> > ### Arsitektur dan Komponen Agen Pembelajar
> > 
> > Agen pembelajar (learning agent) memiliki empat komponen utama yang saling berinteraksi:
> > 
> > ![[Pasted image 20251010162834.png]]
> > 
> > 1. **Performance Element**:
> >     
> >     - Ini adalah "agen" itu sendiri dalam bentuk dasarnya. Komponen inilah yang bertanggung jawab untuk menerima input dari sensor (persepsi) dan memilih tindakan eksternal (_actions_) untuk dieksekusi melalui efektor.
> >         
> >     - Ia beroperasi menggunakan **pengetahuan yang ada saat ini**. Jadi, kualitas tindakannya sangat bergantung pada kualitas pengetahuannya.
> >         
> > 2. **Critic**:
> >     
> >     - Komponen ini bertugas **mengevaluasi kinerja agen**. Ia membandingkan seberapa baik agen bertindak terhadap sebuah **standar performa** yang telah ditentukan.
> >         
> >     - Hasil evaluasinya berupa **umpan balik (feedback)** yang kemudian dikirimkan ke _Learning Element_.
> >         
> >     - **Contoh**: Dalam permainan catur, standar performanya adalah "menang". _Critic_ akan memberi tahu _Learning Element_ apakah langkah-langkah yang diambil sebelumnya mengarah pada kemenangan atau kekalahan.
> >         
> > 3. **Learning Element**:
> >     
> >     - Ini adalah "otak" dari proses belajar. Komponen ini bertanggung jawab untuk **melakukan perbaikan** pada basis pengetahuan.
> >         
> >     - Ia menerima _feedback_ dari _Critic_ dan menggunakannya untuk membuat **perubahan (changes)** pada pengetahuan yang dimiliki _Performance Element_. Tujuannya adalah agar di masa depan, _Performance Element_ dapat membuat keputusan yang lebih baik.
> >         
> > 4. **Problem Generator**:
> >     
> >     - Komponen ini bertugas untuk menyarankan **tindakan-tindakan eksploratif (exploratory actions)** atau **eksperimen**.
> >         
> >     - Tujuannya adalah agar agen tidak hanya melakukan apa yang sudah diketahuinya "aman" atau "baik", tetapi juga berani mencoba hal-hal baru yang berpotensi menghasilkan pengetahuan dan strategi yang lebih unggul.
> >         
> >     - Tanpa _Problem Generator_, agen bisa terjebak dalam kebiasaan (sub-optimal) dan tidak pernah menemukan cara yang lebih baik untuk melakukan sesuatu.
> >         

> [!cornell] #### Summary
> 
> Sebuah Knowledge-Based Agent (KBA) with Learning adalah agen cerdas yang dapat beradaptasi dan meningkatkan kinerjanya di lingkungan yang tidak diketahui dengan cara membangun pengetahuannya sendiri. Hal ini dimungkinkan oleh arsitektur yang terdiri dari empat komponen utama: _Performance Element_ yang bertindak, _Critic_ yang memberikan umpan balik berdasarkan standar performa, _Learning Element_ yang memperbarui pengetahuan berdasarkan umpan balik, dan _Problem Generator_ yang mendorong eksplorasi untuk menemukan strategi baru dan lebih baik.

> [!ad-libitum]- Additional Information
> 
> #### Konsep Fundamental: Exploration vs. Exploitation
> 
> Peran _Problem Generator_ sangat terkait dengan dilema klasik dalam kecerdasan buatan, yaitu **Exploration vs. Exploitation**.
> 
> - **Exploitation (Eksploitasi)**: Agen menggunakan pengetahuan yang sudah dimilikinya untuk mengambil tindakan yang diyakini akan memberikan hasil terbaik. Ini adalah apa yang dilakukan oleh _Performance Element_ berdasarkan pengetahuannya saat ini.
>     
> - **Exploration (Eksplorasi)**: Agen mengambil tindakan yang belum pernah atau jarang dicoba untuk mempelajari lebih lanjut tentang lingkungannya. Ada risiko tindakan ini tidak optimal, tetapi ini adalah satu-satunya cara untuk menemukan strategi baru yang mungkin jauh lebih baik.
>     
> 
> _Problem Generator_ secara eksplisit mendorong fase _exploration_. Agen yang sukses harus menyeimbangkan keduanya: cukup mengeksploitasi untuk mencapai kinerja yang baik, tetapi juga cukup mengeksplorasi untuk terus belajar dan menjadi lebih baik lagi.
> 
> #### Representasi Pengetahuan
> 
> Perubahan (`changes`) yang dilakukan oleh _Learning Element_ pada _Performance Element_ bisa terjadi dalam berbagai bentuk, tergantung pada bagaimana pengetahuan direpresentasikan. Perubahan ini bisa berupa:
> 
> - Menambah, menghapus, atau memodifikasi aturan logika (misal dalam _Propositional_ atau _First-Order Logic_).
>     
> - Menyesuaikan bobot dalam jaringan saraf tiruan (_neural network_).
>     
> - Memperbarui probabilitas dalam model probabilistik (seperti _Bayesian Network_).
>     
> 
> Pilihan representasi ini adalah salah satu keputusan kunci dalam merancang sebuah agen pembelajar.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**: Russell, S. J., & Norvig, P. (2010). _Artificial Intelligence: A Modern Approach_ (3rd ed.). Chapter 18: Learning from Examples.
>