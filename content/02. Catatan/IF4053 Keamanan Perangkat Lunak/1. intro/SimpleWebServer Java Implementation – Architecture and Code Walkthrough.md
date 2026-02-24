---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pemrograman Web Keamanan]]

> [!cornell] SimpleWebServer Java Implementation – Architecture and Code Walkthrough
>
> > ## Questions/Cues
> >
> > - Bagaimana server menerima koneksi TCP?
> > - Apa peran `StringTokenizer` dalam parsing request?
> > - Mengapa harus memeriksa karakter ‘/’ pada pathname?
> > - Bagaimana server mengirimkan kode status HTTP?
> > - Apa yang terjadi bila file tidak ditemukan?
> > - Bagaimana cara menutup sumber daya secara aman?
> > - Apa keuntungan menambahkan penanganan exception pada parsing?
> >
> > ## Reference Points
> >
> > - Lecture_SimpleWebServer.pptx (Slides 15-33)
> > - SimpleWebServer_Code.pdf (Pages 1-9)
>
> > ### HTTP Dasar dan Protokol
> >
> > HyperText Transfer Protocol (HTTP) adalah protokol berbasis teks yang dipakai untuk pertukaran data antara klien (biasanya browser) dan server web. Sebuah permintaan HTTP standar dimulai dengan baris permintaan, contoh: `GET / HTTP/1.0`. Baris ini berisi tiga komponen utama: metode (misalnya **GET**), jalur sumber daya (misalnya `/` atau `/index.html`), dan versi protokol. Server kemudian merespons dengan baris status, seperti `HTTP/1.0 200 OK`, diikuti oleh header (opsional) dan isi dokumen. Pada implementasi **SimpleWebServer**, hanya dua status yang diproduksi: `200 OK` untuk keberhasilan dan `404 Not Found` bila file tidak ada. Meskipun sangat sederhana, pola ini mencerminkan alur dasar semua server HTTP.
> >
> > Pada tingkat jaringan, klien membuka koneksi TCP ke port 8080 (default dalam contoh). Setelah koneksi terbentuk, server membaca satu baris teks dari socket, menginterpretasikannya sebagai permintaan HTTP, dan menuliskan respons kembali melalui socket yang sama. Karena protokol bersifat teks, penggunaan `BufferedReader` dan `OutputStreamWriter` cukup untuk contoh edukatif ini, meskipun dalam produksi biasanya dipilih kelas yang lebih efisien.
> >
> > ### Struktur Kelas SimpleWebServer
> >
> > Kelas utama **SimpleWebServer** memiliki tiga bagian penting: (1) **konstanta PORT** yang menentukan nomor port yang didengarkan, (2) **ServerSocket dServerSocket** yang mewakili soket pendengar, dan (3) **metode konstruktor** yang menginisialisasi `ServerSocket`. Pada konstruktor, `new ServerSocket(PORT)` memanggil sistem operasi untuk membuka port 8080 dan menyiapkan antrian koneksi masuk.
> >
> > Metode `run()` mengimplementasikan **loop tak berhingga** (`while (true)`) yang menunggu koneksi klien dengan `dServerSocket.accept()`. Setiap kali sebuah koneksi diterima, objek `Socket s` mewakili sesi komunikasi dengan satu klien. Server kemudian memanggil `processRequest(s)` untuk menangani permintaan tersebut. Pada contoh ini, tidak ada mekanisme multithreading; sehingga server hanya dapat melayani satu klien pada satu waktu, yang menjadi batasan skalabilitas.
> >
> > ### Alur `processRequest`: Membaca, Mem-parse, dan Menanggapi
> >
> > Metode `processRequest(Socket s)` dimulai dengan membuat dua stream: `BufferedReader br` untuk membaca data masuk, dan `OutputStreamWriter osw` untuk menulis data keluar. Baris pertama yang dibaca (`br.readLine()`) diasumsikan berisi permintaan HTTP lengkap. Nilai string tersebut kemudian dipisahkan menjadi token menggunakan `StringTokenizer` dengan delimiter spasi. Token pertama menjadi **command** (misalnya `GET`), token kedua menjadi **pathname** (misalnya `/index.html`).
> >
> > Jika `command.equals("GET")` bernilai true, server memanggil `serveFile(osw, pathname)`. Jika tidak, server mengirimkan kode status `501 Not Implemented`, menandakan bahwa metode selain GET belum didukung. Setelah penanganan selesai, `osw.close()` dipanggil untuk menutup aliran dan secara implisit menutup socket. Pada implementasi asli, tidak ada penanganan exception di sekitar pembacaan atau parsing; sehingga permintaan yang tidak sesuai format dapat menyebabkan `NullPointerException` atau `NoSuchElementException`, yang pada gilirannya menghentikan server.
> >
> > ### Detail `serveFile`: Sanitasi Jalur, Pembacaan File, dan Respons HTTP
> >
> > Metode `serveFile(OutputStreamWriter osw, String pathname)` bertanggung jawab mengirimkan isi file ke klien. Langkah pertama adalah **menghapus slash awal** (`if (pathname.charAt(0)=='/') pathname = pathname.substring(1);`). Ini mengubah jalur relatif seperti `/index.html` menjadi `index.html`, sehingga `FileReader` dapat menemukan file di direktori kerja saat ini. Selanjutnya, bila `pathname` kosong (misalnya permintaan hanya `GET /`), server mengganti dengan `index.html` sebagai berkas default.
> >
> > Selanjutnya, server mencoba membuka berkas dengan `new FileReader(pathname)`. Jika operasi ini melempar exception (misalnya berkas tidak ada), server menulis baris status `HTTP/1.0 404 Not Found` dan mengembalikan kontrol ke pemanggil. Bila berkas berhasil dibuka, server menulis `HTTP/1.0 200 OK` diikuti dua karakter newline (`\n\n`) untuk memisahkan header dari badan. Isi berkas dibaca karakter demi karakter dalam loop `while (c != -1)`, disimpan dalam `StringBuffer sb`, dan akhirnya seluruh isi dikirimkan lewat `osw.write(sb.toString())`. Setelah selesai, semua stream ditutup oleh pemanggil `processRequest`.
> >
> > Pada contoh ini, **sanitasi jalur** hanya berupa penghapusan slash pertama; tidak ada pemeriksaan apakah jalur berisi segmen `..` atau karakter khusus lainnya. Karena itu, klien yang mengirimkan jalur seperti `../../etc/passwd` dapat mengakses file di luar direktori web, yang merupakan celah keamanan yang serius. Penanganan yang lebih ketat diperlukan untuk membatasi akses ke direktori yang diizinkan.
> >
> > ### Pertimbangan Keamanan dan Praktik Pemrograman yang Baik
> >
> > Meskipun contoh ini dimaksudkan untuk tujuan edukatif, beberapa praktik pemrograman yang lebih aman dapat diterapkan:
> >
> > 1. **Penanganan Exception yang Komprehensif** – Bungkus seluruh proses parsing dan pembacaan file dalam blok `try‑catch`. Pada kegagalan parsing, kirimkan respons `400 Bad Request` dan tutup koneksi segera.
> > 2. **Validasi Pathname** – Pastikan pathname tidak mengandung segmen naik‑direktori (`..`) atau karakter yang dapat mengeksekusi path absolut. Bandingkan jalur yang dihasilkan dengan direktori basis menggunakan `java.nio.file.Path` dan metode `normalize()`.
> > 3. **Penggunaan `try‑with‑resources`** – Memungkinkan Java secara otomatis menutup `BufferedReader`, `OutputStreamWriter`, dan `FileReader` tanpa harus memanggil `close()` secara manual, mengurangi risiko kebocoran sumber daya.
> > 4. **Menerapkan Multithreading** – Membungkus penanganan setiap koneksi dalam thread terpisah (misalnya `new Thread(() -> processRequest(s)).start();`) sehingga server dapat melayani banyak klien secara bersamaan.
> > 5. **Logging** – Catat setiap permintaan masuk, status yang dikembalikan, dan error yang terjadi menggunakan framework logging (misalnya `java.util.logging` atau `SLF4J`). Ini membantu dalam audit dan deteksi anomali.
> >
> > Dengan menambahkan lapisan-lapisan ini, server sederhana dapat berubah menjadi aplikasi yang lebih tahan terhadap input tak terduga dan lebih siap untuk produksi.

> [!cornell] #### Summary
>
> **SimpleWebServer** adalah contoh implementasi server HTTP berbasis Java yang membuka port 8080, menerima satu koneksi pada satu waktu, dan melayani permintaan `GET` dengan membaca file dari sistem berkas. Alur utama meliputi pembacaan baris permintaan, pemisahan token menggunakan `StringTokenizer`, dan pengiriman respons status (`200 OK` atau `404 Not Found`). Kode asli memiliki kelemahan pada **parsing** dan **validasi pathname**, yang dapat menyebabkan kegagalan server atau akses file di luar direktori yang diizinkan. Dengan menambahkan penanganan exception, validasi jalur, penggunaan `try‑with‑resources`, serta dukungan multithreading dan logging, server menjadi lebih aman dan skalabel.

> [!ad-libitum]- Additional Information
>
> #### Concurrency and Thread Per Connection
>
> Pada implementasi produksi, server harus dapat melayani banyak klien secara bersamaan. Pola **thread‑per‑connection** membuat setiap socket yang diterima diproses dalam thread terpisah:
>
> ```java
>
> while (true) {
>
> Socket client = dServerSocket.accept();
>
> new Thread(() -> {
>
> try {
>
> processRequest(client);
>
> } catch (Exception e) {
>
> // log error
>
> } finally {
>
> try { client.close(); } catch (IOException ignored) {}
>
> }
>
> }).start();
>
> }
>
> ```
>
> Pendekatan ini meningkatkan throughput, tetapi menimbulkan tantangan manajemen thread (misalnya thread explosion). Alternatif yang lebih modern adalah menggunakan **thread pool** (`ExecutorService`) atau **NIO** (Non‑Blocking I/O) dengan `Selector` untuk mengelola ribuan koneksi dalam satu atau beberapa thread.
>
> #### Non‑Blocking I/O dengan Java NIO
>
> Java NIO menyediakan kanal (`SocketChannel`) dan selector (`Selector`) yang memungkinkan server membaca dan menulis data secara asinkron tanpa memblokir thread. Contoh singkat:
>
> ```java
>
> ServerSocketChannel server = ServerSocketChannel.open();
>
> server.bind(new InetSocketAddress(PORT));
>
> server.configureBlocking(false);
>
> Selector selector = Selector.open();
>
> server.register(selector, SelectionKey.OP_ACCEPT);
>
> while (true) {
>
> selector.select();
>
> for (SelectionKey key : selector.selectedKeys()) {
>
> if (key.isAcceptable()) {
>
> SocketChannel client = server.accept();
>
> client.configureBlocking(false);
>
> client.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
>
> } else if (key.isReadable()) {
>
> // read request, parse, write response
>
> }
>
> }
>
> }
>
> ```
>
> NIO mengurangi overhead thread dan cocok untuk server dengan beban tinggi.
>
> #### Robust HTTP Parsing dengan Library
>
> Menulis parser HTTP manual rentan terhadap format yang tidak terduga. Library seperti **Apache HttpComponents**, **Jetty**, atau **Netty** menyediakan parser yang sudah teruji, menangani header multiline, chunked transfer, dan encoding. Mengintegrasikan salah satu library ini memungkinkan developer fokus pada logika aplikasi alih‑alih detail protokol.
>
> #### Resource Management dengan Try‑with‑Resources
>
> Java 7 memperkenalkan sintaks `try (Resource r = ...) { … }` yang secara otomatis menutup resource yang mengimplementasikan `AutoCloseable`. Contoh perbaikan pada `processRequest`:
>
> ```java
>
> try (BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
>
> OutputStreamWriter osw = new OutputStreamWriter(s.getOutputStream())) {
>
> String request = br.readLine();
>
> // parsing dan handling
>
> } catch (IOException e) {
>
> // log dan kirim 500 Internal Server Error
>
> }
>
> ```
>
> Ini menghilangkan kebutuhan pemanggilan `close()` manual dan memastikan socket ditutup meskipun terjadi exception.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Thread Pool** – Gantikan pembuatan thread baru per koneksi dengan `ExecutorService` berukuran tetap, lalu ukur perbedaan throughput dan penggunaan memori.
> 2. **HTTPS dengan SSLContext** – Tambahkan dukungan TLS pada server menggunakan `SSLServerSocketFactory`, sehingga komunikasi terenkripsi.
> 3. **Static File Caching** – Simpan konten file yang sering diminta dalam memori (misalnya `ConcurrentHashMap<String, byte[]>`) untuk mengurangi I/O disk.
> 4. **Logging Terstruktur** – Integrasikan **SLF4J** dengan **Logback** untuk mencatat request dalam format JSON, kemudian analisis log dengan **ELK Stack**.
>
> #### Tools and Resources
>
> - **Java SE Documentation** – https://docs.oracle.com/en/java/javase/21/
> - **Apache HttpComponents Core** – https://hc.apache.org/httpcomponents-core-ga/
> - **Netty Project** – https://netty.io/
> - **OWASP Secure Coding Practices** – https://owasp.org/www-project-secure-coding-practices/
> - **VisualVM** – alat profiling Java untuk memantau penggunaan memori dan thread.
>
> #### Further Reading
>
> - *Effective Java* (Joshua Bloch) – bab tentang concurrency dan resource management.
> - *Java Network Programming* (Elliotte Rusty Harold) – bab tentang NIO dan selector.
> - *High Performance Browser Networking* (Ilya Grigorik) – konsep HTTP/1.1 vs HTTP/2 yang relevan untuk server modern.
> - *Secure Coding in Java* (Geoffrey McCune) – panduan menghindari kerentanan umum pada aplikasi Java.