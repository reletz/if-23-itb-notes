---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_: [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Definisi & contoh deadlock?
> > - Apa itu model sistem?
> > - Siklus penggunaan sumber daya?
> > - Perbedaan deadlock & livelock?
> > - Empat syarat mutlak deadlock?
> > - Struktur Resource-Allocation Graph?
> > - Kapan siklus di RAG berarti deadlock?
> >
> > ## Reference Points
> > - Apa hayo
>
> > ### Definisi dan Masalah Deadlock
> > 
> > **Definisi:** Sebuah situasi di lingkungan _multiprogramming_ di mana satu set _thread_ (atau proses) saling menunggu tanpa batas waktu. Setiap _thread_ dalam set tersebut menunggu sebuah sumber daya yang hanya dapat dilepaskan oleh _thread_ lain dalam set yang sama. Akibatnya, tidak ada _thread_ yang dapat melanjutkan eksekusinya. Ini adalah bentuk kegagalan kelangsungan hidup (_liveness failure_).
> >
> >**Contoh Sederhana:**
> >   1. **Hukum Lalu Lintas Kansas:** Analogi di mana dua kereta tiba di persimpangan rel pada saat yang sama. Hukum mengharuskan keduanya berhenti dan tidak ada yang boleh jalan sampai yang lain lewat. Keduanya akan menunggu selamanya.
> >   2. **Dining Philosophers:** Beberapa filsuf duduk di meja bundar dengan satu sumpit di antara masing-masing dari mereka. Jika setiap filsuf mengambil sumpit di sebelah kirinya secara bersamaan, maka semua akan menunggu sumpit di sebelah kanan mereka, yang saat ini dipegang oleh tetangga mereka.
> >   3. **Dua Tape Drive:** Proses P1 memegang Tape Drive 1 dan meminta Tape Drive 2. Pada saat yang sama, Proses P2 memegang Tape Drive 2 dan meminta Tape Drive 1. Keduanya terjebak dalam _deadlock_.
> >  
> > **Model Sistem:**
> > - Sistem diasumsikan memiliki **sejumlah sumber daya yang terbatas** (_finite number of resources_).
> > - Sumber daya ini dibagi ke dalam beberapa **tipe** (atau kelas), misalnya tipe `CPU`, tipe `mutex lock`, tipe `file`.
> > - Setiap tipe sumber daya memiliki satu atau lebih _**instance**_ yang identik. Contoh: tipe `CPU` mungkin punya 4 _instance_ (pada prosesor quad-core). Sebuah _thread_ yang meminta _instance_ dari suatu tipe dapat dipuaskan oleh _instance_ mana pun dari tipe tersebut.
> >
> >**Siklus Penggunaan Sumber Daya:**
> > Sebuah _thread_ harus menggunakan sumber daya dalam urutan yang jelas:
> > 1. **Request (Minta):** _Thread_ meminta sumber daya. Jika sumber daya tidak tersedia, _thread_ memasuki keadaan menunggu (_waiting state_).
> > 2. **Use (Gunakan):** _Thread_ dapat mengoperasikan atau menggunakan sumber daya tersebut (misalnya, menulis ke file atau mengakses _critical section_).
> > 3. **Release (Lepas):** _Thread_ melepaskan sumber daya, membuatnya tersedia untuk _thread_ lain.
> >
> > **Empat Karakteristik (Syarat) Deadlock:**
> > _Deadlock_ hanya dapat terjadi jika **keempat kondisi berikut terpenuhi secara bersamaan** dalam sistem.
> >- **Mutual Exclusion (Eksklusi Bersama):** Setidaknya ada satu sumber daya yang dipegang dalam mode _non-sharable_ (tidak dapat dibagi). Artinya, hanya satu _thread_ yang dapat menggunakan sumber daya tersebut pada satu waktu.
>> - **Hold and Wait (Memegang dan Menunggu):** Sebuah _thread_ sedang memegang setidaknya satu sumber daya dan pada saat yang sama sedang menunggu untuk mendapatkan sumber daya tambahan yang saat ini dipegang oleh _thread_ lain.
>> - **No Preemption (Tanpa Paksaan):** Sumber daya tidak dapat diambil secara paksa dari _thread_ yang memegangnya. Sumber daya hanya dapat dilepaskan secara sukarela oleh _thread_ tersebut setelah menyelesaikan tugasnya.
>> - **Circular Wait (Menunggu Siklik):** Terdapat sebuah set _thread_ yang menunggu {T₀, T₁, ..., Tₙ} di mana T₀ menunggu sumber daya yang dipegang T₁, T₁ menunggu sumber daya yang dipegang T₂, ..., dan Tₙ menunggu sumber daya yang dipegang oleh T₀, membentuk sebuah rantai siklik.
>>
>> **Livelock:**
>> - Bentuk kegagalan kelangsungan hidup lain yang mirip dengan _deadlock_.
>> - Perbedaannya adalah, dalam _livelock_, _thread-thread_ **tidak terblokir**. Mereka terus-menerus mencoba melakukan suatu tindakan, tetapi tindakan itu selalu gagal karena saling mengganggu, sehingga tidak ada kemajuan yang dibuat.
>> - **Analogi:** Dua orang mencoba berpapasan di lorong sempit. Keduanya bergerak ke sisi yang sama untuk memberi jalan, lalu ke sisi lain secara bersamaan, dan terus begitu tanpa ada yang berhasil lewat.
>>
>> **Resource-Allocation Graph (RAG):**
>> - Graf berarah yang digunakan untuk menggambarkan keadaan alokasi sumber daya secara visual.
>> - **Komponen Graf:**
>> ![[Pasted image 20250609101412.png]]
>> - **Vertices (Node):** Terdiri dari dua jenis.
>>   - **Threads (T):** Digambarkan sebagai **lingkaran**.
>>    - **Tipe Sumber Daya (R):** Digambarkan sebagai **persegi panjang**. Titik di dalam persegi panjang merepresentasikan _instance_ dari sumber daya tersebut.
>>- **Edges (Panah):**
>>   - _**Request Edge**_ **(T → R):** Panah dari _thread_ ke persegi sumber daya. Artinya, _thread_ T sedang meminta sebuah _instance_ dari tipe sumber daya R.
>>   - _**Assignment Edge**_ **(R → T):** Panah dari titik (instance) di dalam persegi sumber daya ke _thread_. Artinya, _instance_ tersebut telah dialokasikan ke _thread_ T.
>>   
>> **Hubungan Siklus RAG dengan Deadlock:**
>> - Aturan ini adalah kunci untuk mendeteksi _deadlock_ secara visual.
>> - **Jika RAG tidak mengandung siklus:** Dapat dipastikan **TIDAK ADA** _deadlock_ dalam sistem.
>> - **Jika RAG mengandung siklus:**
>> 	- **Kasus Khusus (1 Instance per Tipe):** Jika setiap tipe sumber daya hanya memiliki satu _instance_, maka adanya siklus **PASTI BERARTI** telah terjadi _deadlock_.
>> 	- **Kasus Umum (Beberapa Instance per Tipe):** Jika ada tipe sumber daya yang memiliki beberapa _instance_, maka siklus hanyalah **INDIKASI KEMUNGKINAN** _deadlock_. _Deadlock_ belum tentu terjadi jika ada _thread_ dalam siklus yang permintaannya masih bisa dipenuhi oleh _instance_ lain yang bebas.

> [!cornell] #### Summary
> Deadlock adalah kondisi kritis di mana sekelompok proses atau _thread_ saling menunggu sumber daya dalam sebuah siklus tertutup, yang hanya bisa terjadi jika empat kondisi—_mutual exclusion, hold and wait, no preemption,_ dan _circular wait_—terpenuhi secara bersamaan. Keadaan ini dapat divisualisasikan menggunakan Resource-Allocation Graph (RAG), di mana adanya siklus merupakan indikator kuat (dan syarat pasti jika sumber daya hanya memiliki satu _instance_) terjadinya deadlock.

| Fitur | Deadlock | Livelock | Starvation |
| :--- | :--- | :--- | :--- |
| **Keadaan Proses** | *Blocked* (Menunggu) | *Running* (Aktif) | *Running* / *Ready* |
| **Kemajuan** | Tidak ada kemajuan | Tidak ada kemajuan | Mungkin ada kemajuan, tapi satu proses diabaikan |
| **Penyebab** | Menunggu siklik | Upaya pemulihan yang terus-menerus gagal & sinkron | Algoritma penjadwalan yang tidak adil (mis. prioritas rendah) |
| **Analogi** | Mobil di persimpangan 4 arah yang macet total | Dua orang di lorong yang terus bergerak ke arah yang sama | Orang yang antre tapi selalu diserobot |

> [!ad-libitum]- Additional Information (Optional)
> - **Formalisasi Kondisi _Circular Wait_**: Secara matematis, kondisi _circular wait_ berarti ada sebuah himpunan proses P0​,P1​,...,Pn​ sedemikian rupa sehingga P0​ menunggu sumber daya yang dipegang oleh P1​, P1​ menunggu sumber daya yang dipegang oleh P2​, dan seterusnya, hingga Pn​ menunggu sumber daya yang dipegang oleh P0​. Ini adalah permutasi siklik dalam ketergantungan sumber daya.
> - **RAG dalam Konteks Teori Graf**: Deteksi siklus dalam sebuah Resource-Allocation Graph adalah masalah klasik dalam teori graf. Algoritma yang paling umum digunakan adalah **Depth-First Search (DFS)**. Algoritma ini menjelajahi graf sedalam mungkin di setiap cabang sebelum mundur. Jika selama penjelajahan ia menemukan sebuah node yang sudah pernah dikunjungi dalam jalur rekursi saat ini, maka sebuah siklus telah terdeteksi. Kompleksitas algoritma ini adalah O(V+E), di mana V adalah jumlah _vertex_ (_threads_ + tipe sumber daya) dan E adalah jumlah _edge_ (_requests_ + _assignments_).
> #### **Eksplorasi Mandiri:**
>- **Latihan Menggambar RAG**:
 >   1. Gambarkan RAG untuk skenario _deadlock_ **Dining Philosophers** dengan 3 filsuf (F1, F2, F3) dan 3 sumpit (S1, S2, S3). Asumsikan F1 memegang S1 dan menunggu S2, F2 memegang S2 dan menunggu S3, dan F3 memegang S3 dan menunggu S1. Anda akan melihat siklus dengan jelas.
 >   2. Gambarkan RAG untuk skenario **tanpa deadlock** berikut: Tipe sumber daya R1 memiliki 2 _instance_ dan R2 memiliki 1 _instance_.
 > 	  - T1 memegang satu _instance_ R1 dan menunggu R2.
 > 	  - T2 memegang satu _instance_ R1 dan satu _instance_ R2, lalu menunggu _instance_ R1 yang lain.
 > 	  - T3 memegang _instance_ R1 yang diminta oleh T2. Identifikasi siklus yang ada, dan jelaskan mengapa skenario ini belum tentu _deadlock_. (Petunjuk: Pikirkan urutan pelepasan sumber daya yang mungkin).