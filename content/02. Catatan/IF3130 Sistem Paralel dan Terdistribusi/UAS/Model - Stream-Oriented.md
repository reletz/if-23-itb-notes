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
> > - Kapan _timing_ penting?
> >     
> > - Apa itu _data stream_?
> >     
> > - Apa beda _Simple_ vs _Complex Stream_?
> >     
> > - Model (Push/Pull)?
> >     
> > - 3 konsep waktu?
> >     
> > - Aplikasi _stream processing_?
> >     
> > - Apa itu _stream processing_?
> >     
> > - Apa itu QoS?
> >     
> > - Contoh QoS untuk stream?
> >     
> > - Kakas (tools) stream?
> >     
> > - Apa itu _stream synchronization_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 41-51 (11 - IF3130-11-Communication-2022.pdf)
> >     
> > - Kuliah Komunikasi
> >     
> 
> > ### 1. Pentingnya Timing
> > 
> > Model RPC dan MOM umumnya tidak peduli soal _timing_. Pesan/data adalah unit yang independen dan lengkap. Kapan (waktu) data itu sampai tidak mempengaruhi kebenarannya.
> > 
> > Namun, untuk **informasi yang** _**time-dependent**_ (seperti audio dan video), _timing_ (kapan data sampai) adalah hal yang **krusial**.
> > 
> > ### 2. Data Streaming
> > 
> > Ini adalah model komunikasi untuk data yang _time-dependent_.
> > 
> > ![[Pasted image 20251111160617.png]]
> > 
> > - **Data Stream:** Sebuah urutan (sekuens) dari unit-unit data.
> >     
> > - **Unbounded Data:** Ciri khas _stream_ adalah datanya dianggap tidak terbatas (mengalir terus-menerus), berbeda dengan data "batch" (misal: file) yang punya awal dan akhir yang jelas.
> >     
> > - _Contoh:_ Event log, data sensor IoT, _stream_ audio, _stream_ video.
> >     
> > 
> > ### 3. Simple vs Complex Stream
> > 
> > - **Simple Stream:** Terdiri dari satu sekuens data (misal: _stream_ audio saja).
> >     
> > - **Complex Stream:** Terdiri dari beberapa _simple stream_ (substream) yang saling berelasi. Relasi antar _substream_ ini bersifat _time-dependent_.
> >     
> > - _Contoh:_ Streaming film, terdiri dari _substream video_ dan _substream audio_. Keduanya harus sinkron.
> >     
> > 
> > ### 4. Model dan Konsep Waktu
> > 
> > - **Model:** Umumnya menggunakan **Push Model**, di mana produksi data dikendalikan oleh sumber (_source_), dan sering diimplementasikan dengan pola _Publish/Subscribe_.
> >     
> > - **Konsep Waktu:** Dalam _stream processing_, penting untuk membedakan waktu:
> >     
> > 
> > 1. **Event Time:** Waktu kapan data diproduksi (misal: sensor mendeteksi).
> >     
> > 2. **Ingestion Time:** Waktu kapan data diterima oleh sistem pemroses.
> >     
> > 3. **Processing Time:** Waktu kapan data diproses oleh sistem.
> >     
> > 
> > ### 5. Aplikasi Stream Processing
> > 
> > _Stream processing_ digunakan di banyak bidang:
> > 
> > - **Keuangan:** Analisis pasar saham, _fraud prevention_ (deteksi penipuan) _real-time_.
> >     
> > - **Kesehatan:** Monitoring ICU neonatal, monitor pasien jarak jauh.
> >     
> > - **Manufaktur:** Kontrol proses pabrik.
> >     
> > - **Cyber Security:** Deteksi intrusi _real-time_.
> >     
> > - **Transportasi:** Manajemen lalu lintas cerdas.
> >     
> > 
> > ### 6. Stream Processing System
> > 
> > Sistem ini didefinisikan sebagai _information/data flow_:
> > 
> > 1. **Source Operators:** Sumber data (misal: sensor, log, paket RTP).
> >     
> > 2. **Processing Operators:** Unit-unit yang memproses data (_Transform_, _Filter_, _Correlate_, _Analyze_).
> >     
> > 3. **Sink Operators:** Tujuan akhir data (misal: _dashboard_, database).
> >     
> > 
> > ### 7. Quality Of Service (QoS)
> > 
> > Karena _timing_ penting, _stream-oriented communication_ sangat peduli pada **QoS (Quality of Service)**. Ini adalah _requirement_ (persyaratan) terhadap layanan pengiriman data.
> > 
> > QoS untuk _stream_ fokus pada _timeliness_ (ketepatan waktu), _volume_ (jumlah data), dan _reliability_ (keandalan).
> > 
> > **Contoh QoS:**
> > 
> > - **Required bit rate:** Berapa banyak data yang harus diangkut per detik.
> >     
> > - **Maximum end-to-end delay:** Waktu maksimum dari pengirim ke penerima.
> >     
> > - **Maximum delay variance (Jitter):** Ini sangat penting. **Jitter** adalah variasi (perbedaan) _delay_ antar paket. Jitter tinggi (misal: paket 1 delay 10ms, paket 2 delay 500ms) akan merusak audio/video, membuatnya "patah-patah".
> >     
> > - **Maximum round trip delay:** Waktu bolak-balik (penting untuk aplikasi interaktif).
> >     
> > 
> > **Kakas (Tools):** Apache Kafka, Apache Storm, Apache Flink, Apache Spark, Apache Samza.
> > 
> > ### 8. Stream Synchronization
> > 
> > ![[Pasted image 20251111160639.png]]
> > 
> > Ini adalah tantangan untuk menjaga relasi _time-dependent_ antar _substream_ dalam _complex stream_.
> > 
> > Contoh (Slide 49):
> > 
> > Aplikasi receiver film harus tahu bahwa ia perlu memproses (misal) 2 unit audio untuk setiap 1 unit video agar tetap sinkron.
> > 
> > Sinkronisasi ini bisa dilakukan di level **aplikasi** (aplikasi sendiri yang mengatur _buffer_ dan _timing_), atau di level **middleware** (Slide 50), di mana _middleware_ menyediakan _high-level interface_ untuk menangani sinkronisasi.

> [!cornell] #### Summary
> 
> **Komunikasi** _**Stream-Oriented**_ **berfokus pada data yang** _**time-dependent**_ **dan** _**unbounded**_ **(seperti audio, video, sensor), di mana** _**timing**_ **adalah krusial. Sistem** _**stream processing**_ **(seperti Kafka, Flink) memproses** _**data flow**_ **ini (dari** _**source**_ **ke** _**sink**_**) dan sangat bergantung pada **Quality of Service (QoS)** (seperti** _**bit rate**_**,** _**delay**_**, dan** _**jitter**_ **rendah) untuk menjamin** _**timeliness**_**. Tantangan utamanya adalah **sinkronisasi** antar** _**substream**_ **(misal: audio & video) agar tetap sinkron.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Jitter dan Buffer
> 
> - **Jitter:** Variasi _delay_ paket. Ini adalah musuh terbesar _streaming real-time_.
>     
> - **Jitter Buffer (De-jitter Buffer):** Ini adalah solusi yang digunakan oleh _receiver_ (misal: aplikasi Zoom, YouTube). _Receiver_ tidak langsung memutar paket data begitu sampai. Ia sengaja **menunda** pemutaran sedikit dan menyimpan paket yang masuk ke dalam _buffer_ (antrian kecil).
>     
> - **Cara Kerja:** Dengan menunda (misal: 200ms), _buffer_ memberi waktu bagi paket-paket yang "telat" (akibat _jitter_) untuk datang. _Receiver_ kemudian memutar data dari _buffer_ dengan kecepatan konstan, menghasilkan _output_ yang mulus.
>     
> - **Trade-off:** _Buffer_ yang lebih besar = lebih tahan _jitter_, tapi **delay (latency)** awal lebih besar (misal: _buffering_ YouTube, _delay_ di Zoom). _Buffer_ kecil = _latency_ rendah, tapi rentan "patah-patah".
>     
> 
> #### Kakas: Kafka vs Flink
> 
> Sering disebut bersamaan:
> 
> - **Apache Kafka:** Adalah _distributed streaming platform_ (Slide 47). Utamanya berfungsi sebagai _broker_ (seperti MOM) tapi dioptimalkan untuk _throughput_ tinggi, _persistent_ (menyimpan log data), dan _replayable_. Ia adalah "jantung" (broker/bus) dari arsitektur _stream_.
>     
> - **Apache Flink / Spark Streaming:** Adalah _stream processing engine_ (Slide 46). Mereka adalah "otak" yang melakukan _processing operators_ (Transform, Filter, Analyze). Mereka mengambil data _dari_ Kafka, memprosesnya, dan mungkin menyimpannya _ke_ Kafka lagi atau ke _sink_.
>