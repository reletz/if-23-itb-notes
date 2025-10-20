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
> > - Apa saja contoh aplikasi AI dalam kehidupan?
> >     
> > - Apa empat pendekatan dalam mendefinisikan AI?
> >     
> > - Apa itu pendekatan "Acting Humanly"?
> >     
> > - Bagaimana cara kerja Turing Test?
> >     
> > - Apa itu pendekatan "Thinking Humanly"?
> >     
> > - Apa itu pendekatan "Thinking Rationally"?
> >     
> > - Apa itu pendekatan "Acting Rationally"?
> >     
> > - Apa itu Intelligent Agent?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3170 - 01 - AI-Introduction.pdf
> >     
>  
> > ### Aplikasi AI dalam Kehidupan Sehari-hari
> > 
> > Kecerdasan Buatan (AI) sudah menjadi bagian tak terpisahkan dari kehidupan modern. Beberapa contoh aplikasinya meliputi:
> > 
> > - **Penemuan Rute (Path Finding):** Aplikasi seperti Google Maps menggunakan AI untuk menghitung rute tercepat dengan mempertimbangkan lalu lintas, jarak, dan kondisi jalan secara _real-time_.
> >     
> > - **Asisten Virtual (AI Assistant):** Siri, Google Assistant, dan Alexa menggunakan pemrosesan bahasa alami (NLP) untuk memahami perintah suara dan melakukan tugas seperti mengirim pesan, memutar musik, atau mengontrol perangkat pintar di rumah.
> >     
> > - **Aplikasi Biometrik:** Sistem keamanan modern menggunakan AI untuk verifikasi identitas melalui sidik jari (_fingerprint_) atau pengenalan wajah (_face recognition_).
> >     
> > - **Sistem Rekomendasi:** Layanan seperti Netflix, Spotify, dan Steam menggunakan AI untuk menganalisis riwayat tontonan atau aktivitas Anda dan merekomendasikan film, musik, atau game yang mungkin Anda sukai.
> >     
> > - **Game:** AI digunakan untuk menciptakan lawan komputer (bot) yang cerdas dan adaptif, seperti OpenAI Five yang berhasil mengalahkan juara dunia game Dota 2.
> >     
> > - **Mobil Otonom (Self-Driving Cars):** Perusahaan seperti Waymo dan Uber menggunakan AI yang kompleks untuk memproses data dari sensor (seperti LiDAR dan kamera) agar mobil dapat menavigasi lingkungan dan membuat keputusan mengemudi secara mandiri.
> >     
> > - **Industri Lain:** AI juga diterapkan secara luas di berbagai sektor seperti kesehatan (diagnosis penyakit), pendidikan (personalisasi pembelajaran), energi, dan manufaktur (robotika).
> >     
> > 
> > ### Empat Pendekatan dalam Mendefinisikan AI
> > 
> > Definisi Kecerdasan Buatan dapat dikategorikan ke dalam empat pendekatan utama, yang dibedakan berdasarkan fokusnya pada proses **berpikir (thinking)** atau **bertindak (acting)**, dan acuannya pada standar **manusia (humanly)** atau **rasionalitas (rationally)**.
> > 
> > 
> > ||**Humanly (Seperti Manusia)**|**Rationally (Secara Rasional)**|
> > | :--- | :--- | :--- |
> > |**Thinking**|1. Thinking Humanly|3. Thinking Rationally|
> > |**Acting**|2. Acting Humanly|4. Acting Rationally|
> > 
> > ### 1. Acting Humanly (Bertindak Seperti Manusia)
> > 
> > Pendekatan ini berfokus pada pembuatan mesin yang dapat melakukan fungsi-fungsi yang memerlukan kecerdasan saat dilakukan oleh manusia. Tujuannya adalah agar komputer dapat melakukan hal-hal yang saat ini masih lebih baik dilakukan oleh manusia.
> > 
> > - **Turing Test:** Sebuah tes yang diusulkan oleh Alan Turing untuk mengukur kecerdasan mesin. Seorang interogator manusia berkomunikasi (melalui teks) dengan dua entitas tersembunyi: satu manusia dan satu mesin. Jika interogator tidak dapat secara konsisten membedakan mana yang mesin dan mana yang manusia, maka mesin tersebut dianggap telah lulus tes dan menunjukkan perilaku cerdas.
> >     
> > - **Contoh:** Chatbot seperti Mitsuku (pemenang Loebner Prize) dan sistem pakar seperti PXDES (diagnosis penyakit dari rontgen) yang meniru kemampuan seorang ahli.
> >     
> > 
> > ### 2. Thinking Humanly (Berpikir Seperti Manusia)
> > 
> > Pendekatan ini mencoba memahami dan meniru cara kerja otak manusia. Tujuannya adalah membuat komputer dapat berpikir dalam arti yang sesungguhnya, yaitu memiliki pikiran dan kesadaran. Pendekatan ini sering disebut juga pendekatan **model kognitif**.
> > 
> > - **Proses:** Membutuhkan pemahaman tentang bagaimana pikiran manusia bekerja (melalui introspeksi atau eksperimen psikologis), lalu membuat teori atau model komputasional dari proses tersebut.
> >     
> > - **Contoh:** NuPIC (Numenta Platform for Intelligent Computing) yang didasarkan pada teori cara kerja neokorteks, dan Sighthound yang menggunakan _deep learning_ untuk mengajari kamera "melihat" seperti otak manusia.
> >     
> > 
> > ### 3. Thinking Rationally (Berpikir Secara Rasional)
> > 
> > Pendekatan ini berfokus pada penggunaan logika formal dan penalaran deduktif. Tujuannya adalah membangun sistem komputasional yang dapat memecahkan masalah menggunakan aturan-aturan logika yang "benar".
> > 
> > - **Dasar:** Berakar dari logika Aristoteles, di mana sebuah argumen yang benar akan menghasilkan kesimpulan yang benar. Ini sering disebut pendekatan **"laws of thought"**.
> >     
> > - **Tantangan:** Tidak semua masalah di dunia nyata dapat direpresentasikan secara logis dengan mudah, dan sulit untuk memecahkan masalah yang memiliki ketidakpastian.
> >     
> > - **Contoh:** _Theorem Provers_ seperti LEAN dan VAMPIRE, yang dirancang untuk membuktikan teorema matematika secara otomatis menggunakan penalaran logis.
> >     
> > 
> > ### 4. Acting Rationally (Bertindak Secara Rasional)
> > 
> > Pendekatan ini berfokus pada perancangan **agen cerdas (intelligent agents)**. Agen adalah sesuatu yang dapat mengamati lingkungannya melalui sensor dan bertindak di lingkungan tersebut melalui aktuator. Tujuannya adalah agar agen tersebut bertindak untuk mencapai hasil terbaik atau, ketika ada ketidakpastian, hasil terbaik yang diharapkan.
> > 
> > - **Rasionalitas:** Bertindak secara rasional berarti memilih tindakan yang diharapkan dapat memaksimalkan ukuran kinerja (tujuan) agen, berdasarkan bukti yang diberikan oleh persepsi dan pengetahuan yang dimiliki agen.
> >     
> > - **Keunggulan:** Pendekatan ini lebih umum daripada "thinking rationally" karena inferensi logis yang benar hanyalah salah satu dari beberapa mekanisme untuk mencapai rasionalitas. Ini juga lebih mudah diuji secara ilmiah daripada pendekatan berbasis pemikiran manusia.
> >     
> > - **Contoh:** Bot dalam game Dota 2 yang bertindak untuk mencapai kemenangan, dan sistem penjadwalan produksi seperti JobShop yang bertujuan mengoptimalkan alur kerja.
> >     

> [!cornell] #### Summary
> Kecerdasan Buatan (AI) adalah bidang ilmu yang luas dengan aplikasi yang meresap dalam kehidupan sehari-hari, mulai dari asisten virtual hingga mobil otonom. Definisinya dapat dipahami melalui empat pendekatan: bertindak seperti manusia (lulus Turing Test), berpikir seperti manusia (meniru kognisi), berpikir rasional (menggunakan logika formal), dan bertindak rasional (desain agen cerdas). Pendekatan "Acting Rationally", yang berfokus pada agen yang bertindak untuk memaksimalkan hasil yang diharapkan, dianggap sebagai pendekatan yang paling umum dan kuat dalam AI modern karena mencakup berbagai aspek kecerdasan dan lebih mudah dievaluasi secara ilmiah.

> [!ad-libitum]- Additional Information
>  #### Pendalaman Teknis: Agen Cerdas (Intelligent Agents)
>   Konsep agen adalah pusat dari pendekatan _Acting Rationally_. Sebuah agen cerdas idealnya memiliki struktur sebagai berikut:
> 
> - **P (Performance Measure):** Kriteria yang menentukan keberhasilan. Untuk robot pembersih, ini bisa berupa tingkat kebersihan ruangan.
> - **E (Environment):** Lingkungan tempat agen beroperasi. Untuk robot pembersih, ini adalah ruangan, perabotan, dan kotoran.
> - **A (Actuators):** Komponen yang memungkinkan agen bertindak. Contoh: roda, sikat, penyedot debu.
> - S (Sensors): Komponen yang memungkinkan agen mengamati lingkungan. Contoh: kamera, sensor inframerah, sensor benturan.
> >     Tugas seorang perancang AI adalah mendefinisikan PEAS dan merancang fungsi agen (program) yang memetakan urutan persepsi dari sensor ke tindakan yang optimal melalui aktuator.    
> 
> #### Pendalaman Sejarah: Turing Test dan Loebner Prize
>  Meskipun Turing Test adalah eksperimen pemikiran yang fundamental, implementasi praktisnya dalam kompetisi seperti Loebner Prize sering kali menuai kritik. Kritik utamanya adalah bahwa chatbot yang menang sering kali mengandalkan trik linguistik dan pengalihan pembicaraan daripada pemahaman yang tulus. Hal ini memicu perdebatan apakah meniru percakapan manusia adalah ukuran kecerdasan yang sebenarnya, atau apakah fokus seharusnya lebih pada kemampuan pemecahan masalah yang rasional.
>  
>  #### Eksplorasi Mandiri
>   - **Interaksi dengan Chatbot:** Coba berinteraksi dengan chatbot pemenang Loebner Prize, seperti Mitsuku (juga dikenal sebagai Kuki), melalui situs webnya. Analisis percakapan Anda: Apakah ia benar-benar "memahami" Anda, atau hanya pandai mencocokkan pola?     
>  - **Pikirkan tentang PEAS:** Pilih salah satu aplikasi AI di sekitar Anda (misalnya, sistem rekomendasi Netflix atau thermostat pintar). Coba definisikan metrik Kinerja (P), Lingkungan (E), Aktuator (A), dan Sensor (S) untuk aplikasi tersebut.
>  
>  #### Sumber & Referensi Lanjutan:
>   - **Buku "Artificial Intelligence: A Modern Approach" oleh Stuart Russell dan Peter Norvig:** Dianggap sebagai buku teks standar dan paling komprehensif dalam bidang AI. Empat pendekatan definisi AI diambil dari buku ini.
>  - **OpenAI Blog:** Sumber daya yang bagus untuk mengikuti perkembangan terkini dalam riset AI, terutama di bidang _deep learning_ dan _reinforcement learning_.
>