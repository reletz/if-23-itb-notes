---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Penghindaran Kemacetan & Disiplin Antrian
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Penghindaran Kemacetan (Congestion Avoidance)**?
> > - Bedanya dengan Congestion Control?
> > - Bagaimana cara kerja **DECbit**?
> > - Apa itu _congestion bit_?
> > - Apa itu **Random Early Detection (RED)**?
> > - Bagaimana RED memberitahu sumber tentang kemacetan?
> > - Apa itu `MinThreshold` dan `MaxThreshold`?
> > - Apa itu **Disiplin Antrian (Queuing Discipline)**?
> > - Jelaskan **FIFO** dan _tail drop_.
> > - Apa kelemahan FIFO?
> > - Bagaimana **Fair Queuing (FQ)** bekerja?
> > - Bagaimana FQ menangani paket dengan panjang berbeda?
> > 
> > ## Reference Points
> > 
> > - Lecture 8, Slides: 132, 179-182, 184, 191-206, 288-330
> 
> > ### Penghindaran Kemacetan (Congestion Avoidance)
> > 
> > **Penghindaran Kemacetan** adalah sekumpulan strategi **proaktif** di mana jaringan mencoba untuk **memprediksi** kemacetan yang akan terjadi dan memberi tahu sumber untuk mengurangi laju pengiriman _sebelum_ paket mulai dibuang (_dropped_).
> > 
> > Ini berbeda secara fundamental dari **Kontrol Kemacetan** TCP (AIMD), yang bersifat **reaktif**. Kontrol Kemacetan TCP sengaja meningkatkan beban pada jaringan hingga terjadi _packet loss_, lalu baru bereaksi dengan mengurangi laju pengiriman. Penghindaran kemacetan mencoba untuk mencegah _loss_ itu terjadi sama sekali.
> > 
> > ### Mekanisme Berbasis Router
> > 
> > Mekanisme ini membutuhkan kerja sama dari router di dalam jaringan untuk memonitor bebannya sendiri dan memberikan sinyal kepada pengirim.
> > 
> > - **DECbit:**
> >     
> >     - **Ide:** Router memonitor rata-rata panjang antriannya. Jika rata-rata panjang antrian melebihi ambang batas tertentu (misalnya, 1), router akan menyetel sebuah **`congestion bit`** pada header paket yang melewatinya.
> >     - **Alur Sinyal:** Bit ini dibawa oleh paket sampai ke tujuan, lalu disalin oleh penerima ke dalam segmen ACK yang dikirim kembali ke pengirim.
> >     - **Aksi Pengirim:** Pengirim mengamati persentase paket yang kembali dengan `congestion bit` aktif. Jika persentasenya rendah (misal, < 50%), ia akan menambahkan `cwnd`-nya dengan ukuran 1 paket. Jika tinggi, ia akan menurunkannya, sebesar 0.875 kali dari ukuran sebelumnya.
> > 	    - 50% dipilih karena berdasarkan analisis, ia berkoresnponden dengan power curve.
> > 	      ![[Pasted image 20250618194802.png]]
> > 	    - "increase by 1, decrease by 0.875" dipilih karena AIMD memastikan mekanisme ini tetap stabil.
> > 	  
> > 
> > - **Random Early Detection (RED):**
> >     
> >     - **Ide:** Mirip dengan DECbit, router memonitor rata-rata panjang antriannya. Namun, notifikasi kemacetannya bersifat **implisit** melalui _packet drop_.
> >     - **Cara Kerja:** Daripada menunggu antrian penuh lalu membuang semua paket (disebut _tail drop_), RED akan mulai **membuang paket secara acak dan lebih awal (early)** ketika panjang antrian rata-rata (`AvgLen`) melewati ambang batas tertentu.
> >     - **Ambang Batas (`MinThreshold` & `MaxThreshold`):**
> >         - Jika `AvgLen` < `MinThreshold`: Paket aman dan akan diantrikan.
> >         - Jika `AvgLen` > `MaxThreshold`: Antrian dianggap terlalu penuh, paket pasti dibuang.
> >         - Jika `MinThreshold` < `AvgLen` < `MaxThreshold`: Paket akan dibuang dengan **probabilitas `P`**. Probabilitas ini meningkat secara linear seiring dengan meningkatnya `AvgLen` dari `MinThreshold` ke `MaxThreshold`.
> >         ![[Pasted image 20250618194939.png]]
> >     - Tujuannya adalah untuk memberi sinyal kepada beberapa koneksi TCP untuk memperlambat laju pengiriman mereka secara bertahap, sebelum kemacetan parah terjadi.
> >
> > ### Mekanisme Berbasis Sumber
> > Teknik ini memantau sinyal dari jaringan yang menunjukkan bahwa antrian router mulai menumpuk dan kemacetan akan segera terjadi jika tidak ada tindakan yang diambil.
> > 
> > Sumber dapat mendeteksi peningkatan RTT (Round-Trip Time) yang terukur seiring dengan menumpuknya antrian paket di router jaringan.
> >
> > - **Algoritma Pertama**
> > 	- *Cara kerja*: Jendela kemacetan bertambah seperti pada TCP normal, tetapi setiap dua kali round-trip delay, algoritma memeriksa apakah RTT saat ini lebih besar dari rata-rata RTT minimum dan maksimum yang pernah diamati
> > 	- *Tindakan*: Jika ya, maka algoritma mengurangi jendela kemacetan sebesar seperdelapan (1/8)
> >  - **Algoritma Kedua**
> > 	 - *Prinsip*: Keputusan untuk mengubah ukuran jendela didasarkan pada perubahan RTT dan ukuran jendela
> > 	 - *Perhitungan*: Jendela disesuaikan setiap dua round-trip delay berdasarkan rumus: `(JendelaSaatIni - JendelaLama) × (RTTSaatIni - RTTLama)`
> > 	 - *Aturan penyesuaian*:
> > 		 - Jika hasilnya positif → kurangi ukuran jendela sebesar seperdelapan
> > 		 - Jika hasilnya negatif atau 0 → tambah jendela sebesar satu ukuran paket maksimum
> > 		 - **Catatan**: Jendela berubah pada setiap penyesuaian, artinya berosilasi di sekitar titik optimalnya
> >
> > ### Disiplin Antrian (Queuing Disciplines)
> > 
> > **Disiplin Antrian** adalah algoritma yang digunakan oleh router untuk menentukan **urutan transmisi paket** dan **paket mana yang harus dibuang** ketika buffer antrian penuh.
> > 
> > - **First-In, First-Out (FIFO):**
> >     
> >     - **Konsep:** Paling sederhana; paket yang pertama tiba akan pertama kali dilayani.
> >     - **Kebijakan Drop:** Biasanya menggunakan **`tail drop`**, di mana jika antrian penuh, paket yang baru tiba akan langsung dibuang.
> >     - **Kelemahan Utama:** Tidak adil. Satu aliran data (misalnya, unduhan file besar) dapat dengan mudah memonopoli seluruh ruang antrian, menyebabkan paket dari aliran lain (misalnya, dari sesi Telnet interaktif) mengalami kelaparan (_starvation_) dan penundaan yang lama.
> >       ![[Pasted image 20250618190315.png]]
> >     
> > - **Fair Queuing (FQ):**
> >     
> >     - **Tujuan:** Memberikan alokasi bandwidth link yang adil bagi setiap aliran data (_flow_) yang melewatinya.
> >     - **Cara Kerja:**
> >         1. Router memelihara **antrian terpisah** untuk setiap _flow_ yang aktif.
> >         2. Router kemudian melayani antrian-antrian ini secara **round-robin**, mengambil satu paket dari setiap antrian secara bergantian.
> >     - **Menangani Paket Berukuran Beda:** Untuk mencapai keadilan sejati, FQ tidak sekadar melakukan round-robin per paket (yang akan menguntungkan _flow_ dengan paket besar). Sebaliknya, FQ mensimulasikan layanan **bit-by-bit round-robin**. Ia menghitung "waktu selesai transmisi" (_finishing time_) teoretis untuk setiap paket, lalu selalu mengirimkan paket dengan _finishing time_ terkecil terlebih dahulu. Ini memastikan setiap _flow_ mendapatkan porsi bandwidth yang sama, terlepas dari ukuran paketnya.
> >     ![[Pasted image 20250618191135.png]]
> > 
> > 	- **Ambil Contoh Sebuah Flow**
> > 		- Misalkan $P_i$ adalah panjang paket $i$, $S_i$ adalah waktu router memulai transmisi paket $i$, dan $F_i$ adalah waktu router selesai mentransmisikan paket $i$.
> > 		- Jelas bahwa $F_i = P_i + S_i$
> > 		- Paket $i$ sendiri mulai ditransmisikan bergantung pada waktu selesai transmisi paket $i-1$.
> > 		- Misalkan $A_i$ adalah waktu sampai paket $i$ ke router.
> > 		- Maka, $S_i = max(F_{i-1}, A_i)$
> > 		- Jadi, $F_i = max(F_{i-1}, A_i) + P_i$
> > 	- Untuk setiap flow, kita bisa terapkan perhitungan $F_i$.
> > 	- Anggap $F_i$ itu sebagai timestamp. Paket yang ditransmisikan selanjutnya _selalu_ paket dengan timestamp terkecil.
> > 	![[Pasted image 20250618192255.png]]

> [!cornell] #### Summary
> 
> - **Penghindaran Kemacetan** adalah pendekatan proaktif (seperti **RED** & **DECbit**) yang mencoba mencegah _packet loss_ dengan cara router memberi sinyal lebih awal kepada pengirim, berbeda dengan Kontrol Kemacetan TCP yang bersifat reaktif.
> - **Disiplin Antrian** adalah aturan yang digunakan router untuk mengelola paket. **FIFO** adalah yang paling sederhana namun tidak adil, sedangkan **Fair Queuing (FQ)** dirancang untuk memberikan alokasi bandwidth yang merata untuk setiap aliran data.
> - **FQ** mencapai keadilan dengan memelihara antrian terpisah untuk setiap _flow_ dan mensimulasikan layanan _bit-by-bit round-robin_ untuk memastikan pembagian sumber daya yang adil terlepas dari ukuran paket.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Variasi Fair Queuing: Weighted Fair Queuing (WFQ)
> 
> - Fair Queuing dapat diperluas menjadi **Weighted Fair Queuing (WFQ)**. Dalam WFQ, setiap antrian dapat diberi "bobot" (_weight_) yang berbeda oleh administrator jaringan. Antrian dengan bobot lebih tinggi akan menerima porsi bandwidth yang lebih besar daripada antrian dengan bobot lebih rendah. Ini sangat berguna untuk menerapkan kebijakan Kualitas Layanan (QoS), misalnya dengan memberikan prioritas (bobot lebih tinggi) pada lalu lintas VoIP yang sensitif terhadap penundaan dibandingkan lalu lintas transfer file.
> 
> #### Implementasi RED di Dunia Nyata
> 
> - Meskipun secara teori RED sangat bagus untuk mencegah kemacetan dan menjaga latensi tetap rendah, konfigurasinya di dunia nyata (menentukan nilai `MinThreshold`, `MaxThreshold`, `MaxP`, dll.) ternyata sangat sulit. Konfigurasi yang buruk justru dapat menurunkan performa jaringan. Hal ini menjadi salah satu alasan mengapa adopsinya tidak seluas yang diharapkan pada awalnya.
> 
> #### Fenomena "Bufferbloat"
> 
> - Ini adalah fenomena modern di mana router dan perangkat jaringan memiliki buffer yang sangat besar. Ketika menggunakan antrian FIFO sederhana, buffer yang besar ini dapat terisi penuh selama periode kemacetan, yang menyebabkan **latensi (delay) yang sangat tinggi** untuk semua paket, meskipun _throughput_ tetap tinggi. Disiplin antrian yang lebih cerdas seperti FQ atau CoDel (turunan dari RED) dirancang untuk mengatasi masalah _bufferbloat_ ini dengan menjaga agar antrian tetap pendek.