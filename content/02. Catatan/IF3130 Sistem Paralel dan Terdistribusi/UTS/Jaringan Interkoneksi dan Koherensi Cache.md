---
type: Note

cssclasses:
- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa peran jaringan interkoneksi?
> >     
> > - Apa jenis interkoneksi untuk _shared memory_?
> >     
> > - Apa itu _bus_ vs _switched interconnect_?
> >     
> > - Apa jenis interkoneksi untuk _distributed memory_?
> >     
> > - Apa metrik performa jaringan?
> >     
> > - Apa masalah _Cache Coherence_?
> >     
> > - Bagaimana contoh inkonsistensi data?
> >     
> > - Apa solusi untuk _Cache Coherence_?
> >     
> > - Apa itu _Snooping_?
> >     
> > - Apa itu _Directory-Based Coherence_?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3230-02-ParallelHardware-Software-2022.pdf
> >     
> 
> > ### Jaringan Interkoneksi (_Interconnection Networks_)
> >
> > Jaringan interkoneksi adalah "sistem peredaran darah" dari sebuah komputer paralel. Kinerjanya sangat memengaruhi performa sistem secara keseluruhan, baik pada sistem _shared memory_ maupun _distributed memory_. Jaringan ini dapat dikategorikan berdasarkan arsitektur memori yang didukungnya.
> >
> > #### 1. Interkoneksi untuk Memori Bersama (_Shared Memory_)
> >
> > Menghubungkan _cores_ ke satu _pool_ memori utama yang dapat diakses bersama.
> >
> > - **Bus Interconnect:**
> >   - **Konsep:** Sekumpulan kabel komunikasi paralel yang dipakai bersama oleh semua perangkat (*cores*, memori) yang terhubung.
> >   - **Kelemahan:** Kinerja menurun drastis seiring bertambahnya jumlah perangkat karena terjadi **kontensi** (perebutan) untuk menggunakan bus. Hanya satu komunikasi yang bisa terjadi pada satu waktu.
> >
> > - **Switched Interconnect:**
> >   - **Konsep:** Menggunakan *switch* untuk mengatur rute data antar perangkat, memungkinkan beberapa komunikasi terjadi secara simultan.
> >   - **Contoh (Crossbar):** Sebuah *switch* crossbar menghubungkan setiap *core* ke setiap modul memori dengan jalur langsung. Ini sangat cepat dan menghindari kontensi, tetapi biaya implementasinya sangat mahal karena jumlah koneksi yang dibutuhkan sangat banyak.
> >
> > #### 2. Interkoneksi untuk Memori Terdistribusi (_Distributed Memory_)
> > 
> > Menghubungkan node-node komputasi (yang masing-masing memiliki prosesor dan memori privat).
> >
> > - **Direct Interconnect:** Setiap _switch_ terhubung langsung ke satu pasang prosesor-memori, dan _switch-switch_ ini saling terhubung satu sama lain membentuk topologi tertentu (misalnya, ring, mesh, atau torus).
> >     
> > - **Indirect Interconnect:** _Switch_ tidak harus terhubung langsung ke prosesor; mereka bisa membentuk jaringan _switching_ tersendiri yang lebih kompleks.
> >     
> >
> > #### Metrik Performa Jaringan
> > 
> > - **Latency:** Waktu yang dibutuhkan dari saat sumber mulai mengirim data hingga bit pertama data tersebut tiba di tujuan.
> >     
> > - **Bandwidth:** Laju transfer data (misalnya dalam MB/s atau GB/s) setelah koneksi terjalin.
> >     
> > - **Bisection Width:** Ukuran "konektivitas" jaringan. Dihitung dengan membelah jaringan menjadi dua bagian yang sama besar dan menghitung jumlah link (atau total bandwidth dari link tersebut, yang disebut **bisection bandwidth**) yang terpotong. Semakin besar nilainya, semakin baik kemampuan jaringan untuk menangani komunikasi simultan.
> > 
> >     ![[Pasted image 20250902090612.png]]
> >
> > ### Koherensi Cache (_Cache Coherence_)
> >
> > Ini adalah masalah fundamental dan kritis yang **hanya terjadi pada sistem** _**shared-memory**_.
> >
> > - **Masalah:** Setiap _core_ memiliki _cache_ privat berkecepatan tinggi. Ketika beberapa _core_ menyimpan salinan dari data yang sama dari memori utama di _cache_ mereka, masalah muncul saat salah satu _core_ mengubah data tersebut. Salinan di _cache core_ lain menjadi usang (_stale_), menyebabkan inkonsistensi data.
> >     
> >
> > - **Contoh Ilustratif:**
> >   - Variabel `x` di memori utama bernilai 2.
> >   - **Waktu 0:**
> >       - *Core 0* membaca `x` (nilai 2) dan menyimpannya di *cache*-nya.
> >       - *Core 1* membaca `x` (nilai 2) dan menyimpannya di *cache*-nya.
> >   - **Waktu 1:**
> >       - *Core 0* mengubah nilai `x` menjadi 7 di *cache*-nya. Sekarang, *cache Core 0* punya `x=7`, tapi *cache Core 1* dan memori utama masih punya `x=2`.
> >   - **Waktu 2:**
> >       - *Core 1* melakukan operasi `z = 4 * x`. Karena *Core 1* menggunakan nilai `x` dari *cache*-nya yang sudah usang, ia akan menghitung `z = 4 * 2 = 8`, padahal seharusnya `z = 4 * 7 = 28`. **Hasilnya salah.**
> >
> >
> > #### Solusi untuk Koherensi Cache
> >
> > Diperlukan sebuah protokol untuk memastikan semua _core_ melihat data yang konsisten.
> >
> > 1. **Snooping Cache Coherence:**
> >     
> > 	  - **Cara Kerja:** Digunakan pada sistem yang terhubung melalui bus bersama. Setiap *cache controller* "menguping" (*snoops*) semua transaksi di bus. Ketika *Core 0* memperbarui `x`, ia akan menyiarkan perubahan ini ke bus. *Cache controller Core 1* yang mendengar siaran ini akan segera menandai salinan `x` di *cache*-nya sebagai tidak valid (*invalid*). Saat *Core 1* butuh `x` lagi, ia akan mengambil versi terbaru dari memori (atau dari *cache Core 0*).
> >   
> > 2. **Directory-Based Cache Coherence:**
> >     
> > 	  - **Cara Kerja:** Tidak memerlukan bus bersama, lebih cocok untuk sistem NUMA yang besar. Sistem memelihara sebuah struktur data terpusat yang disebut **direktori**. Direktori ini melacak status setiap baris *cache* (misalnya, di-*cache* oleh *core* mana saja). Ketika sebuah variabel diubah, sistem akan memeriksa direktori dan mengirim pesan invalidasi hanya ke *core* yang relevan.

> [!cornell] #### Summary
> Jaringan interkoneksi berfungsi sebagai fondasi komunikasi dalam sistem paralel, dengan desain yang berbeda untuk arsitektur _**shared-memory**_ (bus atau _**switched**_) dan _**distributed-memory**_ (direct atau indirect), yang kinerjanya diukur dengan _**latency**_ **dan** _**bandwidth**_. Pada sistem _**shared-memory**_, penggunaan _**cache**_ privat oleh setiap _**core**_ menimbulkan masalah kritis yaitu _**Cache Coherence**_, di mana data bisa menjadi tidak konsisten. Masalah ini diselesaikan melalui protokol seperti _**Snooping**_ (untuk sistem berbasis bus) atau _**Directory-Based**_ (untuk sistem yang lebih besar) untuk memastikan integritas data di seluruh sistem.

> [!ad-libitum]- Additional Information
>  #### Analogi Sederhana: Snooping vs. Directory
> 
>  - **Snooping (Rapat Meja Bundar):** Bayangkan sebuah rapat di mana semua orang duduk di satu meja bundar (bus bersama). Jika seseorang ingin mengubah sebuah fakta di dokumen bersama, ia akan mengumumkannya dengan lantang ke seluruh meja. Semua orang yang mendengar akan langsung mencoret fakta lama di catatan mereka. Efektif untuk grup kecil, tetapi akan sangat berisik dan kacau jika pesertanya ratusan.
>      
>  - **Directory-Based (Sekretaris Proyek):** Bayangkan sebuah proyek besar dengan banyak tim yang bekerja di ruangan terpisah. Ada seorang sekretaris (direktori) yang memegang daftar siapa saja yang sedang memegang salinan dari setiap dokumen. Jika tim A mengubah dokumen X, mereka melapor ke sekretaris. Sekretaris kemudian akan mengirim memo (pesan invalidasi) hanya kepada tim C dan F yang juga memegang salinan dokumen X. Lebih efisien dan terukur untuk sistem yang besar.
>      
> 
>  #### Eksplorasi Mandiri
>  - **Topologi Direct Interconnect:** Cari gambar untuk topologi jaringan "2D Torus" dan "Hypercube". Ini adalah contoh topologi populer untuk _direct interconnect_ di superkomputer. Coba pahami bagaimana data bisa berjalan dari satu node ke node lain dan hitung _bisection width_-nya.
> 