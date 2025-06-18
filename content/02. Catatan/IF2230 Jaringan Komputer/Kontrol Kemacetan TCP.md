---
type: Note
cssclasses:
- cornell-notes
---
_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Kontrol Kemacetan TCP
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Kontrol Kemacetan (Congestion Control)**?
> > - Bedakan dengan Flow Control.
> > - Apa itu _Congestion Window_ (`cwnd`)?
> > - Bagaimana `cwnd` mempengaruhi pengiriman?
> > - Jelaskan prinsip **AIMD**.
> > - Apa pemicu _Multiplicative Decrease_?
> > - Apa pemicu _Additive Increase_?
> > - Apa tujuan **Slow Start**?
> > - Bagaimana cara kerja Slow Start?
> > - Kapan Slow Start digunakan?
> > - Apa itu _Congestion Threshold_ (`ssthresh`)?
> > - Apa itu **Fast Retransmit**?
> > - Apa itu _duplicate ACK_?
> > - Bagaimana **Fast Recovery** bekerja?
> > 
> > ## Reference Points
> > 
> > - Lecture 8, Slides: 129-132, 207-287
> 
> > ### Konsep Dasar Kontrol Kemacetan
> > 
> > **Kontrol Kemacetan** adalah sekumpulan mekanisme yang digunakan oleh TCP untuk mengatur laju pengiriman datanya agar tidak membanjiri jaringan. Tujuannya adalah untuk "berbagi" sumber daya jaringan (seperti bandwidth dan buffer router) secara adil dan efisien dengan koneksi lain.
> > 
> > Ini berbeda dari _Flow Control_. Jika _Flow Control_ bertujuan melindungi **penerima**, maka _Congestion Control_ bertujuan melindungi **jaringan**.
> > 
> > - **Congestion Window (`cwnd`)**
> >     - TCP memperkenalkan variabel baru di sisi pengirim yang disebut _Congestion Window_ (`cwnd`).
> >     - `cwnd` membatasi jumlah data yang boleh dikirim dan belum di-ACK (_in-flight_).
> >     - Laju pengiriman efektif sekarang dibatasi oleh nilai **terkecil** antara _Advertised Window_ (dari penerima) dan `cwnd`.
> >     - `MaxWindow = MIN(CongestionWindow, AdvertisedWindow)`
> > 
> > ### Additive Increase, Multiplicative Decrease (AIMD)
> > 
> > AIMD adalah strategi inti yang digunakan TCP untuk beradaptasi dengan kondisi jaringan. TCP secara aktif "mencari" kapasitas jaringan yang tersedia dengan cara ini.
> > 
> > - **Multiplicative Decrease (MD): Penurunan Agresif**
> >     
> >     - **Pemicu:** Terjadi _packet loss_ yang dideteksi melalui **timeout**. TCP mengasumsikan _loss_ adalah sinyal kuat adanya kemacetan parah di jaringan.
> >     - **Aksi:** Ketika timeout terjadi, `cwnd` akan **dipotong setengah** (`cwnd = cwnd / 2`). Ini adalah langkah mundur yang cepat dan signifikan untuk segera meredakan tekanan pada jaringan.
> > - **Additive Increase (AI): Kenaikan Hati-hati**
> >     
> >     - **Pemicu:** Koneksi berjalan lancar; pengirim berhasil mengirim satu window penuh (`cwnd`) dan menerima ACK untuk semua data tersebut dalam satu RTT (_Round-Trip Time_).
> >     - **Aksi:** `cwnd` akan **ditambah sebesar 1 MSS** (_Maximum Segment Size_) setiap RTT. Ini adalah langkah maju yang lambat dan linear, untuk secara bertahap memanfaatkan kapasitas jaringan yang mungkin baru tersedia.
> > 
> > ### Slow Start
> > 
> > AIMD terlalu lambat jika koneksi dimulai dari nol. Untuk itu, TCP menggunakan mekanisme **Slow Start** untuk meningkatkan laju pengiriman secara cepat di awal koneksi.
> > 
> > - **Cara Kerja:**
> >     - `cwnd` dimulai dari 1 MSS.
> >     - Setiap kali sebuah ACK diterima, `cwnd` ditambah 1 MSS.
> >     - Hasilnya, `cwnd` **digandakan (doubles)** setiap RTT. Proses ini bersifat **eksponensial**, bukan linear seperti Additive Increase.
> > - **Kapan Berhenti?**
> >     - Slow Start akan berhenti ketika `cwnd` mencapai nilai **`ssthresh` (Slow Start Threshold)**. `ssthresh` adalah ambang batas yang menandai perkiraan kapasitas jaringan. Setelah `cwnd` melewati `ssthresh`, TCP akan beralih ke mode Additive Increase yang lebih konservatif.
> >     - `ssthresh` awalnya diatur sangat tinggi. Namun, setiap kali terjadi _loss_, `ssthresh` akan diatur menjadi setengah dari nilai `cwnd` saat itu.
> > 
> > ### Fast Retransmit & Fast Recovery
> > 
> > Menunggu timer _timeout_ untuk mendeteksi _loss_ sangat tidak efisien dan membuat koneksi terhenti lama. Mekanisme ini adalah optimisasi untuk pemulihan yang lebih cepat.
> > 
> > - **Fast Retransmit (Retransmisi Cepat):**
> >     - **Pemicu:** Pengirim menerima **tiga _duplicate ACK_**. Sebuah _duplicate ACK_ adalah ACK yang sama yang dikirim berulang kali oleh penerima. Ini terjadi ketika penerima mendapatkan paket yang tidak berurutan (misalnya, paket 1 dan 3 tiba, tapi paket 2 belum).
> >     - **Aksi:** Tiga _duplicate ACK_ adalah indikasi kuat bahwa segmen setelah ACK tersebut telah hilang. Pengirim akan **langsung mengirim ulang** segmen yang hilang **tanpa harus menunggu timer timeout habis**.
> > - **Fast Recovery (Pemulihan Cepat):**
> >     - Setelah Fast Retransmit, TCP tidak mereset `cwnd` ke 1 MSS dan memulai Slow Start lagi.
> >     - Sebaliknya, TCP hanya memotong `cwnd` setengah (seperti MD biasa) dan langsung masuk ke fase Additive Increase. Ini disebut _Fast Recovery_ karena TCP tidak kembali ke fase Slow Start yang lambat, dengan asumsi bahwa jaringan masih mampu mentransfer beberapa data (terbukti dari datangnya _duplicate ACK_).

> [!cornell] #### Summary
> 
> - Kontrol Kemacetan TCP berfungsi untuk menyesuaikan laju pengiriman data dengan kapasitas jaringan yang tersedia, menggunakan variabel **Congestion Window (`cwnd`)**.
> - Strategi utamanya adalah **AIMD**: `cwnd` ditambah secara linear saat koneksi lancar (_Additive Increase_), dan dipotong setengah saat terjadi _loss_ yang dideteksi timeout (_Multiplicative Decrease_).
> - **Slow Start** digunakan untuk meningkatkan `cwnd` secara eksponensial di awal koneksi, sementara **Fast Retransmit/Recovery** menggunakan _duplicate ACK_ sebagai sinyal untuk mendeteksi dan pulih dari _loss_ lebih cepat tanpa harus menunggu timeout.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### TCP Flavors (Reno, Tahoe, NewReno, CUBIC)
> 
> - Deskripsi di atas adalah perilaku **TCP Reno**, yang merupakan dasar dari banyak implementasi modern. Terdapat versi-versi lain:
>     - **TCP Tahoe:** Versi yang lebih tua. Setiap kali terjadi _loss_ (baik via timeout maupun _duplicate ACK_), ia akan selalu mereset `cwnd` ke 1 dan melakukan Slow Start.
>     - **TCP NewReno:** Sedikit perbaikan dari Reno untuk menangani beberapa _packet loss_ dalam satu window dengan lebih baik.
>     - **TCP CUBIC:** Standar di Linux. Menggunakan fungsi kubik untuk mengatur pertumbuhan `cwnd`, membuatnya lebih stabil dan adil di jaringan berkecepatan tinggi.
> 
> #### Visualisasi Perilaku TCP: Grafik Gigi Gergaji (Sawtooth)
> 
> - Jika Anda memvisualisasikan nilai `cwnd` dari waktu ke waktu, polanya akan terlihat seperti gigi gergaji. Nilai `cwnd` akan naik secara perlahan dan linear (fase Additive Increase), lalu tiba-tiba anjlok (fase Multiplicative Decrease saat terjadi _loss_), kemudian mulai naik lagi. Pola ini menunjukkan bagaimana TCP secara konstan "menguji" batas kapasitas jaringan.
> 
> #### Eksplorasi Mandiri
> 
> - Untuk benar-benar memahami dinamika ini, gunakan simulator jaringan seperti **ns-3** atau **Mininet**. Anda bisa membuat topologi jaringan sederhana, menjalankan beberapa aliran data TCP, lalu secara sengaja menciptakan _bottleneck_ (kemacetan). Dengan memplot nilai `cwnd` dari waktu ke waktu, Anda bisa melihat secara langsung bagaimana Slow Start, AIMD, dan Fast Recovery bekerja dalam simulasi.