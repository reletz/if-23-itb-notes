---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[II4023 Forensik Digital]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Cyber Security Reference Model_?
> >     
> > - Apa saja 5 tahap _Digital Security Life Cycle_?
> >     
> > - Di mana posisi forensik dalam siklus tersebut?
> >     
> > - Apa definisi Forensik Digital?
> >     
> > - Apa saja subdomain dari Forensik Digital?
> >     
> > - Apa itu Forensik Digital Reaktif?
> >     
> > - Apa itu Forensik Digital Proaktif?
> >     
> >
> > ## Reference Points
> > 
> > - Slides II4023 - 01 - Introduction-to-Digital-Forensics.pdf
>     
> > 
> > ### Model Referensi Keamanan Siber
> > 
> > Keamanan Siber (_Cyber Security_) dapat dipandang dari tiga lapisan solusi yang saling melengkapi:
> > 
> > 1. **Engineering & Technology Solution Layer:** Lapisan teknis yang berfokus pada perancangan dan implementasi teknologi keamanan.
> >     
> > 2. **Managerial Solution Layer:** Lapisan manajemen yang berfokus pada kebijakan, prosedur, dan standar operasional keamanan.
> >     
> > 3. **Legal Solution Layer:** Lapisan hukum yang berfokus pada regulasi dan penegakan hukum terkait kejahatan siber.
> >     
> > 
> > Forensik Digital berada dalam payung solusi **Engineering & Technology**.
> > 
> > ### Siklus Hidup Keamanan Digital (Digital Security Life Cycle)
> > 
> > Keamanan digital adalah sebuah proses berkelanjutan yang dapat digambarkan dalam lima tahap siklus:
> > 
> > 4. **Digital Security Engineering:** Tahap perancangan dan pembangunan sistem. Kontrol keamanan diintegrasikan ke dalam arsitektur untuk meminimalkan risiko sejak awal.
> >     
> > 5. **Digital Security Operation & Maintenance:** Tahap operasional sehari-hari. Sistem keamanan yang sudah ada dipantau, dikelola, dan dipelihara secara rutin untuk memastikan perlindungan berkelanjutan.
> >     
> > 6. **Digital Security Breaches (Pelanggaran Keamanan):** Tahap ketika insiden keamanan terjadi, seperti peretasan, pencurian data, atau akses tidak sah.
> >     
> > 7. **Digital Forensics:** Tahap investigasi **setelah** terjadi pelanggaran (_breach_). Tujuannya adalah untuk memahami apa yang terjadi, bagaimana serangan dilakukan, siapa pelakunya, dan mengumpulkan bukti digital.
> >     
> > 8. **Digital Security Evaluation:** Tahap evaluasi dan audit. Efektivitas sistem keamanan yang ada dinilai untuk menemukan celah dan kelemahan, sehingga perbaikan dapat dilakukan untuk tahap _Engineering_ berikutnya.
> >     
> > 
> > ### Definisi dan Istilah Forensik Digital
> > 
> > **Forensik Digital** adalah proses mengidentifikasi, mengamankan (preservasi), menganalisis, dan mendokumentasikan barang bukti digital untuk kepentingan penyelidikan hukum atau insiden.
> > 
> > Istilah lain yang sering digunakan secara bergantian meliputi _Computer Forensics_ dan _Cyber Forensics_.
> > 
> > ### Subdomain Forensik Digital
> > 
> > Seiring dengan perkembangan teknologi, Forensik Digital berkembang menjadi berbagai spesialisasi (subdomain), antara lain:
> > 
> > - **Computer Forensics:** Analisis data dari PC, laptop, server (misal: _Disk Forensics_).
> >     
> > - **Mobile Forensics:** Ekstraksi dan analisis bukti dari perangkat seluler (ponsel, tablet).
> >     
> > - **Network Forensics:** Pemantauan dan analisis lalu lintas jaringan komputer.
> >     
> > - **Memory Forensics:** Analisis data yang ada di memori volatil (RAM) komputer.
> >     
> > - **Malware Forensics:** Investigasi kode berbahaya untuk memahami fungsi dan dampaknya.
> >     
> > - **Cloud Forensics:** Investigasi bukti digital yang tersimpan di lingkungan _cloud_.
> >     
> > - **IoT Forensics:** Analisis data dari perangkat _Internet of Things_ (misal: _smart home devices_).
> >     
> > - **Multimedia Forensics:** Analisis keaslian dan asal-usul file gambar, audio, dan video.
> >     
> > 
> > ### Dua Jenis Forensik Digital
> > 
> > Berdasarkan waktu pelaksanaannya, forensik digital dapat dibagi menjadi dua jenis:
> > 
> > 1. **Forensik Digital Reaktif (Reactive Forensics):** Ini adalah pendekatan konvensional yang dilakukan **setelah** insiden keamanan terjadi. Tujuannya adalah untuk merespons insiden dan melakukan investigasi.
> >     
> > 2. **Forensik Digital Proaktif (Proactive Forensics):** Juga dikenal sebagai _**Digital Forensics Readiness**_. Ini adalah pendekatan di mana sistem dan proses dipersiapkan **sebelum** insiden terjadi untuk mempermudah dan mempercepat proses investigasi di kemudian hari. Tujuannya adalah untuk meningkatkan ketersediaan dan kualitas bukti.
> >     

> [!cornell] #### Summary
> Forensik Digital adalah disiplin ilmu teknis yang merupakan bagian krusial dari Siklus Hidup Keamanan Digital, yang perannya menjadi aktif setelah terjadinya pelanggaran keamanan. Prosesnya meliputi identifikasi, pengamanan, analisis, dan dokumentasi bukti digital. Seiring kemajuan teknologi, bidang ini telah berkembang menjadi berbagai subdomain khusus seperti forensik seluler, jaringan, dan cloud. Pendekatannya dapat bersifat reaktif (investigasi pasca-insiden) atau proaktif (mempersiapkan sistem untuk kesiapan forensik), di mana keduanya bertujuan untuk mengungkap fakta dari sebuah insiden digital.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Konsep: _Chain of Custody_ (Rantai Penguasaan Bukti)
>  Salah satu prinsip paling fundamental dalam semua jenis ilmu forensik, termasuk digital, adalah _Chain of Custody_. Ini adalah dokumentasi kronologis yang mencatat setiap orang yang memegang barang bukti, kapan mereka memegangnya, mengapa mereka memegangnya, dan perubahan apa pun yang terjadi pada barang bukti tersebut. Dalam forensik digital, ini berarti mencatat secara detail proses dari saat hard drive disita, kapan citra digital (_image_) dibuat, siapa yang menganalisisnya, hingga bukti tersebut disajikan di pengadilan. Tanpa _Chain of Custody_ yang utuh dan terdokumentasi dengan baik, keabsahan barang bukti digital dapat dengan mudah digugurkan di mata hukum.
> 
> #### Pendalaman Konsep: _Digital Forensics Readiness_
> Menjadi "siap forensik" bukan hanya tentang memiliki perangkat lunak forensik. Ini adalah strategi organisasi yang mencakup:
>  - **Logging yang Agresif:** Mengaktifkan dan menyimpan log sistem, aplikasi, dan jaringan secara terpusat dan terperinci. Tanpa log, investigator tidak memiliki "jejak" untuk diikuti.
>  - **Sinkronisasi Waktu:** Memastikan semua sistem di seluruh jaringan menggunakan sumber waktu yang sama (misalnya, melalui _Network Time Protocol_ - NTP). Perbedaan waktu bahkan beberapa detik dapat merusak kronologi serangan.
>  - **Baseline Jaringan:** Memiliki pemahaman tentang seperti apa lalu lintas jaringan yang "normal" sehingga anomali (tanda-tanda serangan) dapat lebih mudah dideteksi.
>  - **Rencana Respons Insiden (IRP):** Memiliki prosedur yang jelas tentang siapa melakukan apa saat insiden terjadi, termasuk kapan harus memanggil tim forensik.
>      
>  
>  #### Eksplorasi Mandiri
> 
> - **Cek Metadata File:** Ambil sebuah file foto yang Anda ambil dengan ponsel. Gunakan alat online atau perangkat lunak untuk melihat metadata EXIF (Exchangeable Image File Format) di dalamnya. Anda mungkin akan menemukan informasi tentang model kamera, tanggal pengambilan, dan bahkan koordinat GPS. Ini adalah bentuk dasar dari analisis bukti digital.
>     
> - **Pelajari tentang** _**Hashing**_**:** Cari tahu apa itu fungsi hash kriptografi seperti SHA-256. Dalam forensik digital, _hash_ digunakan untuk memverifikasi integritas bukti. Nilai _hash_ dari sebuah file atau citra disk harus tetap sama persis dari awal hingga akhir investigasi untuk membuktikan bahwa bukti tersebut tidak diubah.
>