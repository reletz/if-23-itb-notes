---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Jaringan: Kualitas Layanan (Quality of Service - QoS)
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Kualitas Layanan (QoS)**?
> > - Apa itu aplikasi _real-time_?
> > - Jelaskan taksonomi aplikasi real-time.
> > - Apa itu _playback buffer_?
> > - Apa dua pendekatan utama untuk QoS?
> > - Jelaskan arsitektur **Integrated Services (IntServ)**.
> > - Apa itu _Flowspec_ (TSpec & RSpec)?
> > - Bagaimana cara kerja **Token Bucket Filter**?
> > - Apa itu _Admission Control_?
> > - Jelaskan protokol **RSVP**.
> > - Jelaskan arsitektur **Differentiated Services (DiffServ)**.
> > - Apa itu _Per-Hop Behavior (PHB)_?
> > - Apa itu _Expedited Forwarding (EF)_?
> > - Apa itu _Assured Forwarding (AF)_?
> > 
> > ## Reference Points
> > 
> > - Lecture 8, Slides: 340, 344-350, 353-398, 400, 402-445
> 
> > ### Konsep Dasar Kualitas Layanan (QoS)
> > 
> > **Kualitas Layanan (QoS)** merujuk pada kemampuan jaringan untuk memberikan tingkat layanan yang berbeda untuk berbagai jenis lalu lintas. Ini merupakan peningkatan dari model standar internet, yaitu _best-effort_, di mana semua paket diperlakukan sama tanpa jaminan apa pun.
> > 
> > QoS sangat penting untuk **aplikasi _real-time_**, yaitu aplikasi yang sensitif terhadap ketepatan waktu (_timeliness_) data. Contohnya termasuk VoIP, video konferensi, dan game online.
> > 
> > - **Playback Buffer:** Untuk mengatasi _jitter_ (variasi delay paket), aplikasi penerima sering menggunakan _playback buffer_. Data yang tiba lebih awal akan ditahan di buffer ini dan baru "dimainkan" pada waktu yang seharusnya. Ini menciptakan aliran data yang lebih mulus, meskipun dengan mengorbankan sedikit peningkatan latensi awal.
> > 
> > ### Taksonomi Aplikasi Real-Time
> > 
> > Aplikasi real-time dapat dikategorikan berdasarkan kebutuhannya:
> > 
> > 1. **Toleransi terhadap Loss:**
> >     - _**Tolerant:**_ Dapat mentolerir kehilangan sebagian kecil data (misalnya, satu sampel audio atau satu frame video).
> >     - _**Intolerant:**_ Tidak dapat mentolerir kehilangan data sama sekali (misalnya, aplikasi kontrol industri).
> > 2. **Kemampuan Adaptasi:**
> >     - _**Adaptive:**_ Dapat menyesuaikan diri dengan kondisi jaringan.
> >         - _**Rate-adaptive:**_ Dapat mengubah bit rate (dan kualitas) berdasarkan bandwidth yang tersedia.
> >         - _**Delay-adaptive:**_ Dapat menggeser titik _playback_ untuk beradaptasi dengan perubahan delay jaringan.
> >     - _**Nonadaptive:**_ Tidak dapat beradaptasi dan membutuhkan jaminan layanan yang kaku dari jaringan.
> > 
> > ### Arsitektur QoS: Integrated Services (IntServ)
> > 
> > IntServ adalah pendekatan QoS yang bersifat **fine-grained**, yaitu menyediakan jaminan layanan untuk **setiap _flow_ individu**. Setiap aplikasi harus meminta layanan secara eksplisit.
> > 
> > - _**Flowspec:**_ Permintaan layanan ini dijelaskan dalam sebuah _flowspec_, yang terdiri dari:
> >     - **TSpec (Traffic Specification):** Mendeskripsikan karakteristik lalu lintas dari _flow_ tersebut. Biasanya menggunakan model **Token Bucket Filter**.
> >     - **RSpec (Resource Specification):** Mendeskripsikan layanan yang diminta dari jaringan (misal, jaminan delay atau bandwidth).
> > - **Token Bucket Filter:** Model untuk mendeskripsikan lalu lintas. Didefinisikan oleh dua parameter: _token rate `r`_ (laju data rata-rata jangka panjang) dan _bucket depth `B`_ (kemampuan untuk mengirim _burst_ atau ledakan data sesaat).
> > - _**Admission Control:**_ Sebelum menerima permintaan _flow_ baru, setiap router di jalurnya harus memeriksa apakah ia memiliki sumber daya yang cukup (bandwidth, buffer) untuk memenuhi permintaan tersebut tanpa mengganggu layanan yang telah dijamin untuk _flow_ lain.
> > - **RSVP (Resource Reservation Protocol):** Protokol sinyal yang digunakan untuk membuat reservasi di sepanjang jalur. _Receiver_ mengirim pesan `RESV` ke hulu menuju _sender_ untuk memesan sumber daya di setiap router.
> > 
> > ### Arsitektur QoS: Differentiated Services (DiffServ)
> > 
> > DiffServ adalah pendekatan QoS yang bersifat **coarse-grained** dan lebih skalabel. Alih-alih mengelola _flow_ individu, DiffServ mengelompokkan lalu lintas ke dalam beberapa **kelas layanan**.
> > 
> > - **Cara Kerja:**
> >     1. Di tepi jaringan (_edge router_), paket-paket ditandai (di-mark) berdasarkan kelas layanannya. Penandaan ini menggunakan field DSCP di header IP.
> >     2. Router di inti jaringan (_core router_) hanya perlu memeriksa tanda ini dan menerapkan perlakuan yang sesuai.
> > - **Per-Hop Behavior (PHB):** Ini adalah perilaku atau perlakuan yang diterapkan oleh sebuah router pada sebuah kelas paket. Dua PHB yang umum adalah:
> >     - **Expedited Forwarding (EF):** Memberikan layanan premium dengan prioritas tertinggi. Tujuannya adalah untuk memberikan latensi dan _loss_ yang sangat rendah, seolah-olah paket memiliki "jalur tol" pribadi. Laju lalu lintas EF harus dibatasi secara ketat di _edge router_.
> >     - **Assured Forwarding (AF):** Menyediakan beberapa tingkat layanan "terjamin". Biasanya diimplementasikan dengan **RIO (RED with In and Out)**. Paket yang "In-profile" (sesuai kontrak layanan) akan memiliki probabilitas _drop_ yang jauh lebih rendah daripada paket yang "Out-of-profile" saat terjadi kemacetan.

> [!cornell] #### Summary
> 
> - **Kualitas Layanan (QoS)** bertujuan untuk menyediakan jaminan performa (seperti delay rendah atau bandwidth terjamin) untuk aplikasi-aplikasi yang sensitif terhadap waktu, melampaui layanan _best-effort_ standar dari internet.
> - **Integrated Services (IntServ)** adalah pendekatan QoS _per-flow_ yang menggunakan protokol **RSVP** untuk melakukan reservasi sumber daya secara eksplisit, namun memiliki masalah skalabilitas di jaringan besar.
> - **Differentiated Services (DiffServ)** adalah pendekatan berbasis **kelas lalu lintas** yang lebih skalabel, di mana paket ditandai di tepi jaringan dan router inti menerapkan perlakuan khusus (_Per-Hop Behavior_) seperti **Expedited Forwarding (EF)** untuk prioritas tinggi atau **Assured Forwarding (AF)** untuk jaminan layanan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Isu Skalabilitas: IntServ vs. DiffServ
> 
> - Perbedaan mendasar antara keduanya adalah skalabilitas. IntServ mengharuskan setiap router di jalur untuk menyimpan informasi status (_state_) untuk setiap _flow_ individu yang melakukan reservasi. Di inti internet yang menangani jutaan _flow_ secara bersamaan, ini menjadi tidak praktis. Sebaliknya, DiffServ jauh lebih skalabel karena router inti hanya perlu mengetahui beberapa kelas lalu lintas yang telah ditentukan, bukan jutaan _flow_ individu, sehingga kebutuhan akan _state_ jauh lebih sedikit.
> 
> #### Implementasi di Dunia Nyata
> 
> - Karena masalah skalabilitas tersebut, **DiffServ** adalah pendekatan QoS yang paling banyak diadopsi di jaringan enterprise dan service provider saat ini. **IntServ** lebih sering ditemukan di lingkungan jaringan yang lebih kecil dan terkontrol, seperti jaringan internal perusahaan untuk aplikasi video konferensi khusus.
> 
> #### Eksplorasi Mandiri
> 
> - Periksa pengaturan QoS pada router Wi-Fi di rumah Anda. Banyak router modern menyediakan fitur QoS sederhana yang memungkinkan Anda untuk memprioritaskan perangkat (misalnya, konsol game) atau jenis aplikasi tertentu (misalnya, "Gaming" atau "Streaming"). Ini adalah implementasi sederhana dari prinsip DiffServ atau WFQ, di mana router Anda menandai dan memberikan perlakuan khusus pada lalu lintas dari perangkat atau aplikasi prioritas Anda.