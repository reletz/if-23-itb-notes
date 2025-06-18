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
> > - Apa masalah utama alokasi sumber daya?
> > - Apa itu kemacetan (congestion)?
> > - Apa itu _flow_ dan _soft state_?
> > - Apa saja taksonomi/klasifikasi alokasi sumber daya?
> > - Router-centric vs Host-centric?
> > - Reservation vs Feedback?
> > - Bagaimana mengevaluasi skema alokasi?
> > - Apa itu metrik "Power"?
> > - Apa itu "Fairness"?
> > - Apa itu Jain's Fairness Index?
> >
> > ## Reference Points
> > 
> > - Slides 2, 4
> > - Slides 9, 10
> > - Slides 11, 12
> > - Slides 13, 14
> > - Slides 15-17
>
> > ### Masalah Fundamental: Kemacetan (Congestion)
> > 
> > **Masalah Utama:** Bagaimana cara mengalokasikan sumber daya jaringan (seperti bandwidth link dan buffer di router) secara **efektif dan adil** di antara sekumpulan pengguna yang saling bersaing.
> > 
> > **Definisi Kemacetan (Congestion):**
> > 
> > - Terjadi ketika terlalu banyak paket bersaing untuk menggunakan link yang sama.
> > - Antrian (queue) di router menjadi penuh dan akhirnya meluap (_overflow_).
> > - Akibatnya, paket-paket yang baru datang akan **dibuang (dropped)**.
> > 
> > **Dua Sisi Koin:**
> > 
> > 1. **Alokasi Sumber Daya (Proaktif):** Jaringan secara aktif mengalokasikan sumber daya. Jika dilakukan dengan presisi, kemacetan dapat **dihindari**. Namun, ini sulit dilakukan karena sumber daya tersebar di seluruh jaringan.
> > 2. **Kontrol Kemacetan (Reaktif):** Membiarkan sumber mengirim data sesukanya, lalu pulih dari kemacetan ketika terjadi. Ini lebih mudah diimplementasikan tetapi bisa mengganggu karena banyak paket yang terbuang.
> >
> > ### Model Jaringan dan Konsep "Flow"
> > 
> > Kita membahas alokasi sumber daya dalam konteks jaringan _packet-switched_.
> > 
> > **Konsep Flow:**
> > 
> > - Meskipun jaringan bersifat _connectionless_ (setiap datagram diperlakukan independen), pada praktiknya sering ada aliran (_stream_) datagram yang terkait antara sepasang host yang melewati rute yang sama. Aliran ini disebut **flow**.
> > - Sebuah _flow_ bisa didefinisikan dalam berbagai granularitas, misalnya:
> >     - **Host-to-host:** Semua paket dengan alamat IP sumber & tujuan yang sama.
> >     - **Process-to-process:** Semua paket dengan IP sumber/tujuan DAN port sumber/tujuan yang sama (ini setara dengan _channel_ di transport layer).
> > - Perbedaan utamanya adalah _flow_ terlihat oleh router di dalam jaringan, sedangkan _channel_ adalah abstraksi end-to-end.
> > ![[Pasted image 20250618185514.png]]
> > 
> > **Soft State:**
> > 
> > - Karena router melihat _flow_, ia bisa menyimpan informasi keadaan sementara untuk setiap _flow_, yang disebut **soft state**.
> > - Ini berbeda dari _hard state_ (seperti pada jaringan _connection-oriented_) karena _soft state_ tidak perlu dibuat atau dihapus secara eksplisit melalui sinyal. Jika _soft state_ hilang (misal karena router reboot), jaringan tetap beroperasi dengan benar, tetapi jika ada, router bisa menangani paket dari _flow_ tersebut dengan lebih baik.
> >
> > ### Taksonomi Mekanisme Alokasi Sumber Daya
> > 
> > Ada beberapa cara untuk mengklasifikasikan pendekatan alokasi sumber daya:
> > 
> > 1. **Router-centric vs. Host-centric:**
> >     - **Router-centric:** Router yang bertanggung jawab penuh (memutuskan paket mana yang diteruskan/dibuang, dan memberitahu host berapa cepat mereka boleh mengirim).
> >     - **Host-centric:** Host (pengirim) yang mengamati kondisi jaringan (misalnya dari paket yang hilang) dan menyesuaikan kecepatan pengirimannya sendiri. TCP adalah contoh klasik dari ini.
> > 2. **Reservation-based vs. Feedback-based:**
> >     - **Reservation-based:** Host "memesan" sejumlah kapasitas dari jaringan terlebih dahulu. Router akan mengalokasikan sumber daya untuk memenuhi pesanan itu. Jika tidak bisa, pesanan ditolak.
> >     - **Feedback-based:** Host langsung mengirim data dan menyesuaikan kecepatannya berdasarkan umpan balik dari jaringan. Umpan balik bisa _eksplisit_ (router mengirim pesan "pelan-pelan!") atau _implisit_ (host mendeteksi paket hilang).
> > 3. **Window-based vs. Rate-based:**
> >     - **Window-based:** Mengontrol pengirim dengan batasan jumlah data yang boleh "in-flight" (belum di-ACK). Contoh: TCP Flow Control & Congestion Window.
> >     - **Rate-based:** Mengontrol pengirim dengan batasan kecepatan eksplisit (misalnya dalam bit per detik).
> >
> > ### Kriteria Evaluasi: Efektivitas dan Keadilan
> > 
> > **1. Efektivitas (Effectiveness):**
> > 
> > - Diukur dengan dua metrik utama: **throughput** (ingin setinggi mungkin) dan **delay** (ingin serendah mungkin).
> > - Kedua tujuan ini seringkali bertentangan. Mendorong throughput hingga 100% akan menyebabkan antrian di router menjadi sangat panjang, yang akan meningkatkan delay secara signifikan.
> > - **Metrik Power:** Untuk menyeimbangkan keduanya, diusulkan metrik **Power = Throughput / Delay**. Tujuannya adalah memaksimalkan nilai "Power" ini.
> > 
> > **2. Keadilan (Fairness):**
> > 
> > - Mendefinisikan "adil" itu tidak mudah. Tidak selalu berarti "sama rata".
> > - **Controlled Unfairness:** Melalui reservasi, kita bisa secara sengaja membuat ketidakadilan yang terkontrol, misal memberikan bandwidth 1 Mbps untuk video stream dan hanya 10 Kbps untuk transfer file di link yang sama.
> > - **Masalah Panjang Rute:** Apakah adil jika sebuah _flow_ yang melewati 4 router mendapat jatah bandwidth yang sama dengan _flow_ lain yang hanya melewati 1 router di salah satu link? _Flow_ yang lebih panjang menggunakan lebih banyak sumber daya jaringan secara keseluruhan.
> > - **Jain's Fairness Index:** Sebuah formula matematis untuk mengukur tingkat keadilan dari sekumpulan throughput flow $(x_1​,x_2​,...,x_n​)$
> >   $$f(x_1​,x_2​,...,x_n​)=\frac{(\sum^{n}_{i=1}​x_i)^2}{​n\sum_{i=1}^n​x_i​^2}​$$ 
> >   Hasilnya selalu antara 0 dan 1. Nilai 1 menunjukkan keadilan sempurna (semua xi​ sama).

> [!cornell] #### Summary
> Alokasi sumber daya bertujuan untuk mengelola **kemacetan (congestion)** dengan cara mendistribusikan sumber daya jaringan (bandwidth dan buffer) secara **efektif dan adil**. Pendekatannya dapat diklasifikasikan (misalnya, _host-centric vs. router-centric_, _feedback vs. reservation_). Keberhasilannya dievaluasi berdasarkan dua kriteria utama: **efektivitas**, yang menyeimbangkan _throughput_ dan _delay_ (diukur dengan metrik **Power**), dan **keadilan**, yang konsepnya kompleks namun dapat diukur secara kuantitatif dengan metrik seperti **Jain's Fairness Index**.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Hubungan dengan Ilmu Ekonomi
> 
> - Konsep alokasi sumber daya di jaringan sangat mirip dengan prinsip-prinsip ekonomi. Kemacetan adalah bentuk dari "Tragedy of the Commons", di mana setiap pengguna yang bertindak demi kepentingan sendiri (mengirim secepat mungkin) secara kolektif merusak sumber daya bersama (jaringan). Mekanisme seperti _feedback_ (harga implisit) atau reservasi (harga eksplisit) adalah cara untuk mengatur "pasar" bandwidth ini.
> 
> #### Contoh Nyata Taksonomi
> 
> - **TCP Congestion Control:** Adalah contoh sempurna dari pendekatan **host-centric, feedback-based,** dan **window-based**. Host yang mendeteksi kehilangan paket (umpan balik implisit) dan menyesuaikan _congestion window_-nya.
> - **RSVP (Resource Reservation Protocol):** Adalah contoh pendekatan **router-centric** dan **reservation-based**. Aplikasi secara eksplisit meminta sejumlah sumber daya, dan router di sepanjang jalur yang memutuskan apakah akan menerima atau menolak reservasi tersebut.
> 
> #### Keterbatasan Jain's Fairness Index
> 
> - Meskipun sangat berguna, indeks ini tidak menangkap semua nuansa keadilan. Ia memberikan nilai yang sama untuk skenario (A: 99%, B: 1%) dan (A: 60%, B: 40%), padahal keduanya terasa sangat berbeda dari segi "keadilan". Ia paling sensitif ketika ada beberapa _flow_ yang mendapatkan jatah mendekati nol.