---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Kapan TCP mengirim sebuah segmen?
> > - Apa itu _Maximum Segment Size_ (MSS)?
> > - Apa itu _Silly Window Syndrome_?
> > - Apa penyebab _Silly Window Syndrome_?
> > - Bagaimana _Nagle's Algorithm_ bekerja?
> > - Apa itu _Adaptive Retransmission_?
> > - Apa masalah algoritma timeout original?
> > - Apa itu _retransmission ambiguity_?
> > - Apa solusi dari _Karn/Partridge Algorithm_?
> > - Bagaimana _Jacobson/Karels Algorithm_ bekerja?
> >
> > ## Reference Points
> > 
> > - Slides 55, 56
> > - Slides 57-60
> > - Slides 61-63
> > - Slides 64-68
>
> > ### Kapan TCP Mengirim Data? (Triggering Transmission)
> > 
> > TCP harus memutuskan kapan waktu yang tepat untuk mengirim data yang telah ditulis oleh aplikasi ke dalam buffer. Ada tiga mekanisme utama yang memicu pengiriman segmen:
> > 
> > 1. **Buffer Terisi hingga MSS:** TCP akan mengirim segmen jika ia telah mengumpulkan data dari aplikasi sebanyak **Maximum Segment Size (MSS)**. MSS adalah ukuran data terbesar yang bisa dimuat dalam satu segmen tanpa menyebabkan fragmentasi di level IP. Biasanya dihitung sebagai: `MTU - (ukuran header TCP + ukuran header IP)`.
> > 2. **Aplikasi Meminta PUSH:** Aplikasi bisa secara eksplisit meminta TCP untuk segera mengirim semua data yang ada di buffer, terlepas dari ukurannya, dengan menggunakan operasi _push_.
> > 3. **Timer Berakhir (Timer Fires):** Jika data di buffer tidak mencapai MSS dan aplikasi tidak melakukan _push_, sebuah timer akan berjalan. Ketika timer ini berakhir, TCP akan mengirim data apa pun yang ada di buffer, meskipun ukurannya kecil.
> >
> > ### Masalah Efisiensi: Silly Window Syndrome
> > 
> > _Silly Window Syndrome_ (SWS) adalah sebuah masalah performa di mana jaringan dipenuhi oleh segmen-segmen yang sangat kecil (misalnya hanya berisi 1 byte data), membuat transmisi menjadi sangat tidak efisien karena _overhead_ header (40 byte untuk TCP+IP) jauh lebih besar dari data yang dikirim.
> > ![[Pasted image 20250618174115.png]]
> > 
> > **Penyebab SWS bisa dari dua sisi:**
> > 
> > - **Dari Sisi Pengirim:** Pengirim yang terlalu agresif, langsung mengirim data begitu aplikasi menulisnya, bahkan jika hanya 1 byte.
> > - **Dari Sisi Penerima:** Penerima yang memproses data dengan lambat dan terus-menerus mengiklankan jendela penerimaan (_receive window_) yang sangat kecil (misalnya hanya 1 byte). Pengirim yang "patuh" akan langsung mengirim 1 byte untuk mengisi jendela kecil tersebut.
> >
> > ### Solusi Efisiensi: Nagle's Algorithm
> > 
> > Algoritma Nagle adalah solusi elegan dari sisi pengirim untuk mencegah _Silly Window Syndrome_.
> > 
> > **Aturan mainnya:**
> > 
> > - **Jika ada data yang belum di-ACK di jaringan ("in flight"):** Tahan data baru yang berukuran kecil. Jangan langsung dikirim. Kumpulkan data-data kecil ini di buffer.
> > - **Setelah ACK untuk data "in flight" tiba:** Kirim semua data yang telah terkumpul di buffer dalam satu segmen besar.
> > - **Jika tidak ada data "in flight":** Kirim data kecil tersebut segera.
> > 
> > Intinya, algoritma ini menggunakan kedatangan ACK sebagai "jam" atau pemicu untuk mengirim data yang terkumpul, sehingga mencegah pengiriman segmen-segmen kecil secara beruntun.
> >
> > ### Masalah Waktu: Adaptive Retransmission
> > 
> > Menentukan nilai _timeout_ untuk retransmisi adalah hal yang sangat krusial. Jika terlalu cepat, TCP akan mengirim ulang segmen yang tidak perlu (yang sebetulnya masih di jalan), menambah beban jaringan. Jika terlalu lambat, aplikasi akan "freeze" terlalu lama saat ada paket yang benar-benar hilang.
> >  
> > **Masalah Algoritma Original: Retransmission Ambiguity**
> > ![[Pasted image 20250618174337.png]]
> > - Algoritma awal hanya menghitung rata-rata _SampleRTT_ (waktu dari pengiriman segmen hingga menerima ACK-nya).
> > - Masalahnya muncul saat retransmisi terjadi: Jika sebuah ACK datang setelah retransmisi, kita tidak tahu apakah ACK itu untuk pengiriman **pertama** atau untuk pengiriman **kedua**. Ini disebut _retransmission ambiguity_ dan membuat perhitungan RTT menjadi tidak akurat.
> > 
> > **Solusi Bertahap:**
> > 
> > 1. _**Karn/Partridge Algorithm:**_
> >     ![[Pasted image 20250618174358.png]]e
> >     - **Solusi Ambiguity:** Jangan pernah menghitung _SampleRTT_ untuk segmen yang diretransmisi. Abaikan saja.
> >     - **Solusi Timeout:** Setiap kali terjadi retransmisi untuk segmen yang sama, gandakan nilai _timeout_ (disebut _exponential backoff_). Ini untuk mencegah pengiriman ulang yang agresif saat jaringan kemungkinan sedang padat.
> > 2. _**Jacobson/Karels Algorithm:**_
> >     
> >     - Ini adalah penyempurnaan yang digunakan saat ini. Algoritma ini sadar bahwa hanya mengetahui rata-rata RTT tidaklah cukup; kita juga perlu tahu seberapa besar **variasi** atau **simpangan** dari RTT tersebut.
> >     - Algoritma ini melacak dua hal:
> >         - **EstimatedRTT:** Rata-rata RTT yang dihaluskan (mirip sebelumnya).
> >         - **Deviation:** Ukuran variasi atau "jitter" dari RTT.
> >     - **Formula Timeout:** `TimeOut = EstimatedRTT + 4 * Deviation`.
> >     - Dengan adanya komponen `Deviation`, timeout menjadi lebih adaptif. Jika RTT stabil (variasi kecil), timeout akan dekat dengan rata-rata. Jika RTT tidak stabil (variasi besar), timeout akan ditambah secara signifikan untuk memberikan toleransi lebih.
> >     
> >     Rumus asli:
> > 	  ```
> > 	Difference = SampleRTT - EstimatedRTT
> > 	EstimatedRTT = EstimatedRTT + (δ × Difference)
> > 	Deviation = Deviation + (δ × (|Difference| - Deviation))
> > 	TimeOut = μ × EstimatedRTT + Φ × Deviation
> > 	  ```
> > 	- Biasanya μ = 1 and Φ = 4.
> > 	- `δ` adalah faktor pembobot (biasanya bernilai kecil, misalnya 1/8 atau 0.125). Ini adalah _Exponentially Weighted Moving Average_ (EWMA). Artinya, `EstimatedRTT` yang baru adalah campuran dari perkiraan lama dan sedikit pengaruh dari pengukuran baru. Ini membuat `EstimatedRTT` menjadi **nilai rata-rata yang dihaluskan (smoothed average)** dan tidak akan melonjak liar hanya karena satu pengukuran RTT yang aneh.

> [!cornell] #### Summary
> Untuk efisiensi, TCP menggunakan **Nagle's Algorithm** untuk mengumpulkan data kecil menjadi segmen yang lebih besar, sehingga menghindari masalah _Silly Window Syndrome_. Untuk performa, TCP tidak menggunakan nilai timeout yang statis, melainkan mekanisme **Adaptive Retransmission** yang canggih (seperti **Jacobson/Karels Algorithm**) yang memperhitungkan **rata-rata dan variasi RTT** untuk menentukan kapan harus mengirim ulang segmen yang hilang, membuatnya tangguh dalam menghadapi kondisi jaringan yang dinamis.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Nagle's Algorithm vs. Delayed ACKs
> 
> - Selain Nagle di sisi pengirim, ada optimisasi lain di sisi penerima yang disebut **Delayed ACKs**. Penerima akan menunda pengiriman ACK selama sepersekian detik, dengan harapan bisa "menumpangkannya" pada sebuah segmen data yang kebetulan akan dikirim ke arah sebaliknya, sehingga menghemat satu paket.
> - Namun, interaksi antara Nagle's Algorithm dan Delayed ACKs bisa menjadi masalah. Keduanya yang saling menunggu dapat menyebabkan penundaan yang terasa (hingga 500ms) pada aplikasi interaktif. Karena itu, pada aplikasi yang sensitif terhadap latensi (seperti game atau remote shell), Nagle's Algorithm seringkali dimatikan menggunakan opsi socket `TCP_NODELAY`.
> 
> #### TCP Timestamps dan PAWS
> 
> - Untuk mengatasi _retransmission ambiguity_ dan masalah _wraparound_ pada jaringan super cepat, TCP modern menggunakan **Timestamp Option** (RFC 1323). Pengirim menyertakan timestamp pada setiap segmen. Penerima akan memantulkan kembali timestamp ini di dalam ACK, memungkinkan pengirim menghitung RTT dengan sangat akurat, bahkan untuk segmen yang diretransmisi. Opsi ini juga digunakan dalam mekanisme **PAWS (Protection Against Wrapped Sequence numbers)**.