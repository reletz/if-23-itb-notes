---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 – Software Security]]

> [!cornell] Identified Vulnerabilities in SimpleWebServer and Secure Coding Countermeasures
>
> > ## Questions/Cues
> >
> > - Mengapa request HTTP tidak terformat menyebabkan DoS?
> > - Bagaimana path traversal mengekspos file sistem?
> > - Kapan pengecualian harus ditangani secara eksplisit?
> > - Apa peran validasi pathname dalam mencegah eksploitasi?
> > - Bagaimana cara membatasi ukuran request untuk keamanan?
> >
> > ## Reference Points
> >
> > - Lecture_SimpleWebServer.pptx (Slides 18‑33)
> > - SecureCoding_Guidelines.pdf (Pages 45‑58)
> > - OWASP_Top10_2021.pdf (Pages 12‑14)
>
> > ### Denial‑of‑Service melalui Request Mal‑Formed
> >
> > Pada implementasi **SimpleWebServer**, metode `processRequest()` membaca satu baris dari socket menggunakan `BufferedReader.readLine()`. Jika klien mengirimkan karakter carriage‑return (`\r`) atau baris kosong tanpa format *GET /path HTTP/1.0*, pemanggilan `StringTokenizer(request, " ")` menghasilkan **exception** karena tidak ada token yang dapat dipisahkan. Karena kode tidak memeriksa nilai `null` atau menangkap `NoSuchElementException`, server **crash** dan berhenti melayani semua klien selanjutnya. Contoh analogi: seperti pintu masuk gedung yang menutup otomatis ketika seseorang menekan bel tetapi tidak ada orang di dalam, sehingga semua orang terhalang masuk.
> >
> > Dampak DoS ini bersifat **total**: satu permintaan tidak valid dapat menonaktifkan layanan hingga proses server di‑restart secara manual. Pada skala produksi, serangan semacam ini dapat diotomatisasi dengan skrip sederhana yang mengirimkan ribuan baris kosong, menghasilkan penurunan layanan yang signifikan.
> >
> > Penyebab utama adalah **kurangnya validasi** pada tahap awal pembacaan request serta **ketidakhadiran penanganan pengecualian** yang memadai. Tanpa mekanisme timeout atau batasan panjang request, server menunggu selamanya pada input yang tidak lengkap, memperparah potensi *resource exhaustion*.
> >
> > ### Path Traversal (Directory Traversal) dan Akses File Di Luar Root
> >
> > Metode `serveFile()` menghilangkan slash pertama pada `pathname` dan kemudian langsung membuka file dengan `new FileReader(pathname)`. Tidak ada pemeriksaan apakah `pathname` mengandung segmen `../` atau karakter khusus lain yang dapat **menavigasi ke direktori di atas root**. Seorang penyerang dapat mengirimkan request seperti `GET /../../../../etc/passwd HTTP/1.0`, yang setelah pemotongan slash pertama menjadi `../../../../etc/passwd`. Karena Java tidak membatasi akses file secara implisit, server akan membaca file sistem operasi dan mengirimkan isinya ke klien.
> >
> > Contoh dunia nyata: membayangkan sebuah lemari dengan kunci hanya pada pintu depan; tanpa pengunci internal, siapa pun dapat membuka laci di belakang dan mengambil barang yang tidak seharusnya. Pada server, *pathname* berperan sebagai “kunci” yang seharusnya memvalidasi bahwa hanya file dalam direktori `htdocs` yang dapat diakses.
> >
> > Akibatnya, selain mengungkap isi file sensitif, penyerang dapat memanfaatkan file konfigurasi atau skrip yang dapat dieksekusi, membuka peluang **escalation** lebih lanjut. Karena contoh di slide menyebutkan “Confidentiality Breach”, kami tidak menjelaskan konsep tersebut, melainkan fokus pada mekanisme teknis yang memungkinkan kebocoran.
> >
> > ### Penanganan Pengecualian dan Praktik Defensive Programming
> >
> > Pada kode asli, hanya ada satu blok `try‑catch` di dalam `serveFile()` untuk menangani *FileNotFoundException*. Semua pengecualian lain, termasuk `NullPointerException`, `StringIndexOutOfBoundsException`, atau `IOException` yang muncul selama pembacaan request, tidak ditangani. Akibatnya, server dapat **terminate** secara tak terduga.
> >
> > Solusi yang ditunjukkan pada slide 31 menambahkan blok `try‑catch` di sekitar parsing request, mengirimkan respons *400 Bad Request* dan menutup koneksi secara bersih. Praktik ini merupakan contoh **defensive programming**: mengasumsikan bahwa semua input dapat berbahaya dan menyiapkan jalur keluar yang terkontrol. Selain itu, menutup `OutputStreamWriter` dalam blok `finally` atau menggunakan *try‑with‑resources* memastikan sumber daya selalu dibebaskan, menghindari kebocoran descriptor.
> >
> > Contoh langkah‑langkah:
> >
> > 1. Membungkus seluruh logika `processRequest()` dalam `try (BufferedReader br = …; OutputStreamWriter osw = …) { … }`.
> > 2. Memvalidasi bahwa `request` tidak `null` sebelum tokenisasi.
> > 3. Menangkap `NoSuchElementException` bila token tidak lengkap, lalu mengirimkan *400*.
> >
> > ### Countermeasures Umum untuk Secure Coding
> >
> > Berdasarkan temuan di atas, beberapa langkah mitigasi dapat diimplementasikan secara bertahap:
> >
> > 1. **Validasi Input** – Terapkan whitelist untuk karakter yang diizinkan dalam `pathname` (mis. hanya alfanumerik, `-`, `_`, dan `.`). Gunakan `java.nio.file.Path.normalize()` untuk menghilangkan segmen `..` sebelum membuka file.
> > 2. **Batas Ukuran Request** – Tetapkan batas maksimum panjang baris (mis. 1024 byte). Jika `br.readLine()` mengembalikan string lebih panjang, tutup koneksi dan log kejadian.
> > 3. **Exception Handling Terpusat** – Buat kelas utilitas `HttpExceptionHandler` yang mengubah semua pengecualian menjadi respons HTTP yang tepat (400, 404, 500) dan menutup aliran secara otomatis.
> > 4. **Least Privilege** – Jalankan server dengan hak akses file terbatas (mis. hanya direktori `htdocs`). Pada sistem Unix, gunakan `chmod` dan `setuid` untuk menurunkan hak istimewa proses Java.
> > 5. **Logging dan Monitoring** – Catat setiap request yang ditolak atau menghasilkan error, termasuk alamat IP sumber, untuk deteksi serangan berulang.
> >
> > Implementasi langkah‑langkah ini tidak hanya menutup celah yang teridentifikasi, tetapi juga membangun fondasi yang kuat untuk menambah proteksi terhadap kerentanan lain yang mungkin muncul di masa depan.
> >
> > ### Ringkasan
> >
> > **SimpleWebServer** rentan terhadap **Denial‑of‑Service** karena tidak memvalidasi request HTTP yang tidak terformat, serta **path traversal** yang memungkinkan akses file di luar direktori web. Kekurangan penanganan pengecualian memperparah kedua masalah tersebut. Dengan menerapkan **validasi input**, **batas ukuran request**, **penanganan pengecualian terpusat**, serta menjalankan proses dengan **least privilege**, server dapat menjadi jauh lebih tahan terhadap eksploitasi. Praktik defensive programming dan logging yang konsisten menjadi kunci untuk deteksi dini dan mitigasi serangan lanjutan.

> [!ad-libitum]- Additional Information
>
> #### Formal Threat Modeling (STRIDE) untuk SimpleWebServer
>
> Meskipun materi utama tidak membahas model ancaman secara eksplisit, penerapan **STRIDE** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial‑of‑Service, Elevation of Privilege) membantu mengkategorikan kerentanan yang ada. Pada contoh ini, dua vektor utama adalah **Denial‑of‑Service** (DoS) dan **Information Disclosure** melalui path traversal. Dengan menandai masing‑masing vektor, tim pengembang dapat memprioritaskan mitigasi: DoS diatasi dengan validasi request dan timeout, sedangkan Disclosure diatasi dengan sanitasi pathname dan sandboxing file system.
>
> Implementasi praktis meliputi pembuatan **Data Flow Diagram (DFD)** yang menampilkan alur request dari klien ke metode `processRequest()`, serta titik kontrol (trust boundaries) di mana input pertama kali diterima. Setiap boundary harus memiliki kontrol yang sesuai (mis. input validation, exception handling).
>
> #### Defensive Programming Patterns dalam Java
>
> Beberapa pola desain yang relevan untuk meningkatkan keamanan kode:
>
> * **Fail‑Fast** – Segera memeriksa kondisi tidak valid (mis. `request == null`) dan melempar pengecualian khusus (`BadRequestException`). Ini mencegah eksekusi lebih lanjut pada data yang tidak dapat dipercaya.
> * **Input Sanitization Wrapper** – Membungkus logika parsing dalam kelas utilitas yang mengembalikan objek `HttpRequest` yang sudah tervalidasi. Contoh:
>
> ```java
>
> public class HttpRequestParser {
>
> public static HttpRequest parse(String line) throws BadRequestException {
>
> if (line == null || line.isBlank()) throw new BadRequestException();
>
> StringTokenizer st = new StringTokenizer(line, " ");
>
> if (st.countTokens() < 3) throw new BadRequestException();
>
> // lanjutkan parsing...
>
> }
>
> }
>
> ```
>
> * **Resource‑Acquisition‑Is‑Initialization (RAII)** – Menggunakan *try‑with‑resources* untuk memastikan semua stream ditutup otomatis, menghindari kebocoran descriptor yang dapat dimanfaatkan untuk *resource exhaustion*.
>
> Pola‑polanya tidak hanya meningkatkan keamanan, tetapi juga meningkatkan keterbacaan dan pemeliharaan kode.
>
> #### Static Analysis dan Automated Testing
>
> Alat‑alat seperti **SpotBugs**, **FindSecurityBugs**, dan **SonarQube** dapat memindai kode Java untuk pola berbahaya seperti penggunaan `FileReader` tanpa validasi path, atau `StringTokenizer` pada input yang tidak terkontrol. Integrasi ke dalam pipeline CI/CD memungkinkan deteksi dini sebelum kode diproduksi.
>
> Selain analisis statis, **fuzz testing** pada endpoint HTTP dapat mengungkap kasus tepi yang tidak terduga. Misalnya, mengirimkan ribuan request dengan panjang baris acak, karakter non‑ASCII, atau urutan token yang tidak lengkap. Hasil fuzzing dapat dipetakan ke laporan bug yang kemudian di‑patch.
>
> #### Edge Cases dan Nuansa Lanjutan
>
> * **Unicode Normalization Attacks** – Penyerang dapat menggunakan karakter Unicode yang terlihat seperti `../` setelah normalisasi, sehingga bypass whitelist sederhana. Menggunakan `java.text.Normalizer.normalize(path, Normalizer.Form.NFKC)` sebelum validasi dapat mengatasi hal ini.
> * **Symlink Traversal** – Bahkan jika path di‑normalize, file sistem dapat memiliki symbolic link yang mengarah ke direktori di luar root. Memeriksa `Files.isSymbolicLink(path)` dan menolak jika true menambah lapisan perlindungan.
> * **Thread‑Safety** – Server yang menerima banyak koneksi secara bersamaan harus memastikan objek `BufferedReader` dan `OutputStreamWriter` tidak dibagikan lintas thread. Menggunakan `ExecutorService` dengan pool terbatas membantu mengontrol beban dan mencegah *thread exhaustion*.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Sandbox File System** – Buat wrapper `SecureFileReader` yang hanya mengizinkan akses ke direktori tertentu, menggunakan `java.nio.file.Path` dan `java.security.AccessControlException` untuk menolak akses ilegal.
> 2. **Fuzzing Mini‑Server dengan AFL** – Integrasikan American Fuzzy Lop (AFL) dengan proses Java melalui `afl-fuzz` pada socket, lalu analisis crash yang dihasilkan untuk menemukan celah tambahan.
> 3. **Membangun Middleware Logging** – Kembangkan filter servlet yang mencatat setiap request, status respons, dan waktu proses, kemudian visualisasikan data dalam Grafana untuk deteksi anomali.
>
> #### Tools and Resources
>
> - **OWASP Java Security Cheat Sheet** – https://cheatsheetseries.owasp.org/cheatsheets/Java_Security_Cheat_Sheet.html
> - **CERT Oracle Secure Coding Standards for Java** – https://wiki.sei.cmu.edu/confluence/display/java/SEI+CERT+Oracle+Secure+Coding+Standard+for+Java
> - **FindSecurityBugs Plugin for SpotBugs** – https://github.com/find-sec-bugs/find-sec-bugs
> - **Apache Commons IO – FilenameUtils.normalize** – https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/FilenameUtils.html#normalize-java.lang.String-
>
> #### Further Reading
>
> - “Secure Coding in Java” – Michael Howard & David LeBlanc, O'Reilly, 2022.
> - “The Art of Software Security Assessment” – Mark Dowd, John McDonald, Justin Schuh, 2020.
> - “Effective Java” – Joshua Bloch, Chapter 7 (Exceptions), 3rd edition, 2018.
> - “OWASP Top 10 – 2021” – https://owasp.org/Top10/
> - “Static Analysis for Security” – Lecture series, Carnegie Mellon University, https://www.sei.cmu.edu/education/
>
> ---