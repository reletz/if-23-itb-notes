---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Teknik Proteksi - Obfuscation dan Packing
>
> > ## Questions/Cues
> >
> > - Apa tujuan code obfuscation dan apa saja teknik-tekniknya?
> > - Bagaimana name, control flow, dan data obfuscation bekerja?
> > - Apa itu code packing dan bagaimana unpacking routine berjalan?
> > - Apa security benefit packing terhadap static analysis dan signature detection?
> > - Apa limitasi obfuscation dan packing bagi penyerang yang ulet?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W12 Reverse Engineering & Application Protection — bagian "Code Obfuscation & Code Packing")
>
> > ### Code Obfuscation
> >
> > **Code obfuscation** adalah teknik untuk membuat source code sulit dipahami oleh manusia, sembari mempertahankan fungsionalitas program agar tetap berjalan persis seperti sebelumnya. Tujuannya adalah melindungi kekayaan intelektual dan menghambat reverse engineering: meskipun seorang analis berhasil mendekompilasi software, kode yang ia lihat menjadi membingungkan dan memakan waktu sangat lama untuk dipahami. Penting dicatat bahwa obfuscation tidak mengubah apa yang dilakukan program, hanya membuat *cara* program melakukannya menjadi kabur.
> >
> > Beberapa teknik kunci digunakan secara bersamaan. **Name Obfuscation** mengganti nama variabel, fungsi, dan class menjadi nama yang tidak bermakna atau membingungkan (misalnya `calculateTax()` menjadi `a1b2()`), sehingga petunjuk semantik dari penamaan asli hilang. **Control Flow Obfuscation** mengubah alur eksekusi kode dengan menyisipkan instruksi lompatan (jump) sembarang atau mengonversi konstruksi kondisional menjadi switch statement yang kompleks, sehingga logika program menjadi sulit ditelusuri. **Data Transformation** mengubah data ke bentuk lain (misalnya merepresentasikan angka dalam bentuk biner atau hasil perhitungan) untuk menambah kompleksitas tanpa mengubah fungsi.
> >
> > Teknik lanjutan melengkapi proteksi ini. **String Encryption** mengenkripsi literal string untuk menyembunyikan informasi sensitif seperti URL endpoint, kunci API, atau pesan internal yang biasanya mudah ditemukan dengan tool seperti `strings`. **Dummy Code Insertion** menambahkan kode yang tidak memengaruhi eksekusi namun mengalihkan perhatian analis—membuat mereka membuang waktu menganalisis jalur yang sebenarnya tidak pernah dijalankan. **Address Obfuscation** mengacak lokasi memori dari kode dan data untuk menciptakan ketidakpastian, sehingga pola alamat tidak dapat diandalkan oleh penyerang.
> >
> > Manfaat (benefits) dari obfuscation cukup signifikan: ia melindungi algoritma proprietary dari penyalinan, men-*deter* (menghambat) reverse engineering, dan mengurangi keberhasilan eksploitasi karena penyerang kesulitan memahami struktur internal yang akan diserang. Karena obfuscation tidak menambah overhead runtime sebesar enkripsi penuh, ia sering menjadi lapisan proteksi pertama yang diterapkan pengembang, khususnya pada bahasa yang mudah didekompilasi seperti Java, C#, dan JavaScript.
> >
> > ```mermaid
> > flowchart LR
> >     A["Source code asli<br/>(mudah dibaca)"] --> O["Obfuscator"]
> >     O --> N["Name Obfuscation"]
> >     O --> CF["Control Flow Obfuscation"]
> >     O --> DT["Data Transformation"]
> >     O --> SE["String Encryption"]
> >     N --> R["Kode terproteksi<br/>(sulit dipahami, fungsi sama)"]
> >     CF --> R
> >     DT --> R
> >     SE --> R
> > ```
> >
> > ### Code Packing
> >
> > **Code packing** adalah teknik kompresi (dan/atau enkripsi) yang mengubah executable code menjadi format yang tidak dapat dibaca, lalu di-*unpack* (dibongkar) saat runtime. Cara kerjanya: aplikasi asli dikompresi atau dienkripsi sehingga isinya tidak lagi terlihat pada file di disk. Sebuah **unpacking routine** kecil ditambahkan ke executable; rutin inilah yang akan mendekompresi atau mendekripsi kode asli ke dalam memori tepat sebelum dieksekusi. Dengan demikian, kode yang sebenarnya tetap tersembunyi sampai momen eksekusi (the actual code remains hidden until runtime).
> >
> > Mekanisme ini memberi beberapa **security benefit**. Pertama, ia membuat **static analysis** menjadi sulit, karena kode asli tidak terlihat sampai program dijalankan—seorang analis yang membuka file di disassembler hanya akan melihat data terenkripsi dan rutin unpacking, bukan logika program yang sebenarnya. Kedua, packing mengurangi ukuran footprint aplikasi karena adanya kompresi. Ketiga, packing dapat mem-*bypass* metode deteksi berbasis signature (signature-based detection): karena byte pattern pada file disk berubah total setelah dipacking, signature antivirus yang mengenali kode asli tidak lagi cocok.
> >
> > Namun packing memiliki sejumlah **limitasi** penting. Proses unpacking saat runtime dapat berdampak pada performa karena adanya overhead dekompresi/dekripsi setiap kali aplikasi dimulai. Packing juga dapat dideteksi dengan memonitor perilaku unpacking—pola "kode menulis ke memori lalu mengeksekusinya" (self-modifying / write-then-execute) sangat mencurigakan dan banyak dimanfaatkan oleh tool sandbox serta antivirus modern untuk menandai file yang dipacking. Yang paling fundamental, analis yang berpengalaman dapat menunggu hingga kode selesai di-unpack lalu menangkap (capture) kode asli langsung dari memori (memory dump), sehingga seluruh perlindungan packing runtuh begitu kode tersebut ter-ekspos di RAM.
> >
> > Karena alasan ini, packing jarang digunakan sendirian sebagai proteksi tunggal. Ia paling efektif sebagai salah satu lapisan dalam strategi pertahanan berlapis—dikombinasikan dengan obfuscation (sehingga kode yang ter-unpack pun tetap sulit dibaca) dan anti-debugging (sehingga analis kesulitan men-debug program untuk menangkap momen unpacking). Perlu juga dicatat bahwa packer yang sama sering dipakai oleh malware untuk menyembunyikan payload, sehingga keberadaan packing pada sebuah file kadang justru menimbulkan kecurigaan dari sistem keamanan.
> >
> > ```mermaid
> > flowchart LR
> >     P["Executable asli"] --> K["Packer:<br/>kompresi / enkripsi"]
> >     K --> F["File terpacking<br/>(kode tersembunyi + unpacking routine)"]
> >     F --> X["Runtime: unpacking routine berjalan"]
> >     X --> M["Kode asli direkonstruksi di memori"]
> >     M --> E["Eksekusi normal"]
> > ```
> >
> > ### Hubungan Obfuscation dan Packing dalam Defense-in-Depth
> >
> > Obfuscation dan packing menangani sisi proteksi yang berbeda namun saling melengkapi. Obfuscation berfokus pada membuat kode *sulit dipahami* meskipun terlihat sepenuhnya—ia menyerang kemampuan analis untuk memaknai logika. Packing berfokus pada membuat kode *tidak terlihat sama sekali* hingga runtime—ia menyerang kemampuan analis untuk bahkan melihat logika tersebut secara statis. Keduanya tidak membuat reverse engineering mustahil, melainkan menaikkan biaya dan waktu yang dibutuhkan.
> >
> > Dalam praktik industri, kedua teknik ini sering ditumpuk: kode di-obfuscate terlebih dahulu pada level sumber, lalu binari hasilnya dipacking. Dengan begitu, ketika analis berhasil menangkap kode ter-unpack dari memori, ia masih harus berhadapan dengan kode yang ter-obfuscate berat. Strategi berlapis inilah yang menjadi inti dari prinsip "raising the bar"—tidak ada satu teknik yang sempurna, tetapi kombinasi beberapa teknik membuat usaha penyerang menjadi tidak ekonomis.

> [!cornell] #### Summary
>
> **Code obfuscation** membuat source code sulit dipahami manusia tanpa mengubah fungsionalitasnya, melalui teknik **Name Obfuscation**, **Control Flow Obfuscation**, **Data Transformation**, **String Encryption**, **Dummy Code Insertion**, dan **Address Obfuscation**, dengan manfaat melindungi algoritma proprietary dan menghambat reverse engineering. **Code packing** mengompresi/mengenkripsi executable dan membongkarnya saat runtime via unpacking routine, sehingga kode asli tersembunyi sampai eksekusi—membuat static analysis sulit dan dapat mem-bypass signature-based detection. Limitasi packing meliputi overhead performa, kemungkinan terdeteksi lewat monitoring perilaku unpacking, serta peluang analis menangkap kode ter-unpack langsung dari memori. Karena tak satu pun sempurna, keduanya umumnya dikombinasikan dalam strategi pertahanan berlapis.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Packer terkenal yang sering ditemui di lapangan adalah **UPX** (Ultimate Packer for eXecutables), yang bersifat open-source dan banyak dipakai untuk kompresi sah maupun penyembunyian malware—tersedia perintah `upx -d` untuk meng-unpack-nya kembali, menunjukkan betapa rapuhnya proteksi packer generik. Untuk proteksi komersial yang jauh lebih kuat, vendor menggunakan **VMProtect** dan **Themida**, yang menerapkan **code virtualization**: instruksi asli diterjemahkan menjadi bytecode untuk sebuah virtual machine custom yang ditanam di dalam program. Analis harus terlebih dahulu me-reverse engineer VM tersebut sebelum bisa memahami program—lompatan kesulitan yang sangat besar dibanding obfuscation biasa.
>
> Di sisi penyerang, terdapat tool **unpacker otomatis** dan teknik **dynamic binary instrumentation** (misalnya Intel Pin, Frida) yang dapat mengamati momen di mana kode menulis lalu mengeksekusi memori, lalu otomatis melakukan dump pada saat yang tepat—inilah serangan praktis terhadap packing yang disebut pada limitasi slide. Untuk obfuscation, ada riset **deobfuscation** berbasis symbolic execution dan compiler optimization (misalnya proyek akademik berbasis LLVM) yang dapat menyederhanakan kembali control flow yang sengaja dirumitkan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pack sebuah executable kecil dengan **UPX**, amati perubahan ukuran dan entropy file (entropy tinggi menandakan kompresi/enkripsi), lalu unpack dengan `upx -d` dan bandingkan.
> 2. Gunakan obfuscator JavaScript (misalnya javascript-obfuscator) pada skrip sederhana, terapkan string encryption dan control flow flattening, lalu coba pahami kembali kode hasilnya.
> 3. Hitung entropy byte sebuah file sebelum dan sesudah packing menggunakan skrip Python; diskusikan bagaimana antivirus memakai entropy tinggi sebagai sinyal heuristik.
>
> #### Bacaan Lanjutan
> - doverunner.com — "Code Obfuscation Guide Against Reverse Engineering Attempts" (referensi dari slide).
> - Dokumentasi UPX (upx.github.io) dan VMProtect untuk memahami spektrum packer.
> - Collberg, Thomborson & Low — "A Taxonomy of Obfuscating Transformations", paper fundamental tentang klasifikasi teknik obfuscation.
