---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[System Design]]

> [!cornell] Process Design Methodologies and Modular Principles
>
> > ## Questions/Cues
> >
> > - Mengapa coupling rendah penting dalam desain modular?
> > - Bagaimana cohesion tinggi meningkatkan maintainability?
> > - Perbedaan pendekatan top-down vs bottom-up?
> > - Peran UML activity diagram dalam desain unit?
> > - Hubungan modularitas dengan reusable code?
> > - Dampak standar organisasi pada desain proses?
> > - Prinsip stepwise refinement dalam desain?
> >
> > ## Reference Points
> >
> > - IF3141 System Design Slides (Pages 4-5, 24-27)
> > - IF3141 System Design Slides (Pages 7-9)
>
> > ### Standar Organisasi dalam Desain Modul
> >
> > Standar organisasi menentukan pedoman khusus untuk mencapai desain modul yang optimal. Dua konsep kunci yang diatur adalah **coupling** (kopling) dan **cohesion** (kohesi). Kopling mengukur tingkat ketergantungan antar modul, dimana kopling rendah (loose coupling) diinginkan karena memungkinkan modifikasi satu modul tanpa mempengaruhi modul lain. Contoh: Sistem pembayaran e-commerce yang terpisah dari modul inventori memungkinkan pembaruan metode pembayaran tanpa mengganggu stok barang.
> >
> > Kohesi mengukur seberapa terkait fungsi-fungsi dalam satu modul. Kohesi tinggi berarti modul hanya menjalankan satu fungsi spesifik. Misalnya, modul "Hitung Pajak" yang hanya berisi logika perhitungan pajak memiliki kohesi lebih tinggi daripada modul "Proses Transaksi" yang menangani berbagai tugas. Standar organisasi biasanya mewajibkan **kohesi tinggi** dan **kopling rendah** untuk memudahkan pemeliharaan dan pengujian sistem.
> >
> > ### Pendekatan Desain Sistem Tinggi
> >
> > Desain tingkat tinggi (high-level system design) fokus pada identifikasi komponen sistem dan antarmukanya **tanpa** menentukan teknologi implementasi. Terdapat dua pendekatan utama:
> >
> > **1. Top-down:** Dimulai dari gambaran sistem utuh lalu dipecah menjadi sub-sistem lebih kecil (dekomposisi). Contoh: Mendesain platform e-learning dimulai dengan membagi sistem menjadi modul pengguna, materi, penilaian, lalu masing-masing dipecah lagi ke fitur lebih spesifik.
> >
> > **2. Bottom-up:** Menggabungkan komponen dasar menjadi sistem yang lebih besar (komposisi). Contoh: Mengembangkan library autentikasi terpisah yang kemudian diintegrasikan ke dalam sistem utama. Pendekatan ini menggunakan teknik **stepwise refinement** - penyempurnaan bertahap melalui elaborasi detail berlapis.
> >
> > ### Prinsip Desain Modular
> >
> > Prinsip modularitas bertujuan menciptakan kode yang **reusable** dan **maintainable**. Modul ideal harus:
> >
> > - **Spesifik**: Memiliki satu tanggung jawab utama (Single Responsibility Principle)
> > - **Independen**: Minim ketergantungan eksternal (Low Coupling)
> > - **Kohesif**: Semua elemen terkait erat dengan fungsi utama (High Cohesion)
> >
> > Analogi: Seperti blok LEGO® dimana setiap blok (modul) memiliki fungsi jelas dan dapat disambungkan dengan blok lain melalui antarmuka standar. Contoh praktis: Modul "Generator Laporan" yang independen dapat digunakan di sistem akuntansi maupun inventori selama format input/output sesuai.
> >
> > ### Desain Unit/Komponen
> >
> > Setelah desain modular selesai, dilakukan spesifikasi detail tiap unit menggunakan:
> >
> > **1. UML Activity Diagram:** Memvisualisasikan alur proses dengan simbol standar. Contoh: Diagram aktivitas untuk proses checkout e-commerce mencakup langkah validasi keranjang, pemilihan metode pembayaran, dan konfirmasi pesanan.
> >
> > **2. Pseudocode:** Deskripsi algoritma dalam bahasa semi-formal. Keuntungan: mudah dipahami programmer dari berbagai latar belakang bahasa pemrograman. Contoh pseudocode untuk validasi password:
> >
> > ```
> >
> > IF panjang password < 8
> >
> > TAMPILKAN "Password minimal 8 karakter"
> >
> > ELSE IF tidak mengandung angka
> >
> > TAMPILKAN "Harus mengandung angka"
> >
> > ELSE
> >
> > SIMPAN password
> >
> > ```

> [!cornell] #### Summary
>
> **Desain proses** bertujuan merealisasikan kebutuhan fungsional melalui komponen software yang saling berinteraksi, dengan fokus pada **prinsip modularitas** untuk mencapai kode yang reusable dan maintainable. Pendekatan **top-down** dan **bottom-up** digunakan dalam desain tingkat tinggi, diikuti oleh **spesifikasi detail unit** menggunakan diagram aktivitas atau pseudocode. Standar organisasi menekankan pentingnya **low coupling** dan **high cohesion** agar modul dapat dikembangkan dan diuji secara independen. **Stepwise refinement** memungkinkan elaborasi desain bertahap dari konsep umum ke implementasi spesifik.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Desain Modular
>
> Kompleksitas struktural diukur menggunakan metrik seperti:
>
> - **Coupling Between Objects (CBO):** Jumlah kelas yang terhubung langsung
> - **Response For a Class (RFC):** Jumlah metode yang dapat dieksekusi
> - **Lack of Cohesion in Methods (LCOM):** Ukuran ketidakterkaitan metode dalam kelas
>
> Penelitian Chidamber & Kemerer (1994) menunjukkan sistem dengan CBO > 5 dan LCOM > 0.8 cenderung memiliki lebih banyak bug. Tools seperti SonarQube dapat menghitung metrik ini secara otomatis.
>
> #### Pola Desain Modular Lanjutan
>
> **1. Composite Pattern:** Memperlakukan objek tunggal dan grup secara seragam. Contoh: Modul laporan yang dapat menghasilkan PDF tunggal atau kumpulan PDF terkompresi.
>
> **2. Facade Pattern:** Menyediakan antarmuka sederhana untuk subsistem kompleks. Contoh: API gateway yang menyatukan layanan pembayaran, notifikasi, dan autentikasi.
>
> **3. Strategy Pattern:** Memungkinkan pertukaran algoritma secara runtime. Contoh: Modul pengiriman dengan opsi kurir berbeda (JNE, J&T, SiCepat).
>
> #### Studi Kasus: Modularisasi Sistem Legacy
>
> Kasus nyata migrasi sistem bank monolitik ke arsitektur modular:
>
> 1. Identifikasi bounded context (Domain-Driven Design)
> 2. Ekstraksi modul pembayaran sebagai microservice pertama
> 3. Implementasi API Gateway dengan throttling dan circuit breaker
> 4. Pengukuran metrik: Waktu deployment berkurang 70%, MTTR (Mean Time To Repair) turun 65%
>
> #### Self-Exploration Projects
>
> 1. Bangun modular calculator dengan fitur:
> - Modul dasar: Aritmatika
> - Modul lanjut: Statistika, Trigonometri
> - Implementasi plugin system untuk menambah fungsi baru
> 2. Analisis open-source project (e.g., Apache Commons) untuk identifikasi pola coupling/cohesion
>
> #### Tools dan Resources
>
> - **Visual Studio Code** dengan ekstensi CodeMetrics untuk analisis kompleksitas
> - **StarUML** untuk pemodelan diagram aktivitas
> - **Modular Programming Toolkit** (https://modular-programming.org)
>
> #### Further Reading
>
> - "Clean Architecture" oleh Robert C. Martin (Bab 13: Komponen Kohesi)
> - "Design Patterns: Elements of Reusable Object-Oriented Software" (Pola Struktural)
> - IEEE Standard 1016-2009: Rekomendasi Dokumentasi Desain Perangkat Lunak
> - Artikel "Measuring Modularity Quality" (Journal of Systems and Software Vol. 158)