---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Analisis Semantik?
> >     
> > - Apa tugas utama Semantic Analyzer?
> >     
> > - Bagaimana cara kerjanya?
> >     
> > - Jenis pengecekan apa yang dilakukan?
> >     
> > - Apa output dari fase ini?
> >     
> >
> > ## Reference Points
> >
> > - Slide 10 - Semantics Analyser
> >     
> 
> > ### Apa itu Analisis Semantik?
> > 
> > **Analisis Semantik** adalah fase ketiga dalam frontend sebuah kompiler, yang berlangsung setelah analisis sintaksis (parsing) berhasil. Jika parser memastikan bahwa sebuah program memiliki **struktur** yang benar, maka penganalisis semantik bertugas untuk memastikan bahwa program tersebut memiliki **makna** yang logis dan konsisten.
> > 
> > - **Analogi:** Parser memastikan kalimat "Apel itu memakan kuda" adalah benar secara tata bahasa (Subjek-Predikat-Objek). Penganalisis Semantik akan menandainya sebagai kesalahan karena secara makna (semantik), apel tidak bisa memakan kuda.
> >     
> > 
> > Proses ini sangat erat kaitannya dengan parsing dan seringkali dilakukan bersamaan atau langsung setelah pohon sintaks (parse tree) dibentuk.
> > 
> > ### Tugas Utama Semantic Analyzer
> > 
> > Tugas utama dari penganalisis semantik adalah untuk memeriksa kode sumber dari kesalahan-kesalahan semantik yang tidak dapat dideteksi oleh parser. Ia menggunakan pohon sintaks yang dihasilkan oleh parser untuk mengumpulkan informasi kontekstual.
> > 
> > - **Contoh:** Untuk statement `A := (A + B) * (C + D)`, parser hanya mengenali simbol `:=`, `+`, `*` sebagai token yang valid dalam sebuah ekspresi. Penganalisis semantik-lah yang akan memeriksa:
> >     
> >     - Apakah variabel `A`, `B`, `C`, dan `D` sudah dideklarasikan?
> >         
> >     - Apakah tipe data mereka (misalnya, integer, float) kompatibel untuk operasi penjumlahan dan perkalian?
> >         
> >     - Apakah hasil dari operasi tersebut bisa disimpan ke dalam variabel `A`?
> >         
> > 
> > ### Cara Kerja Analisis Semantik
> > 
> > Untuk melakukan tugasnya, penganalisis semantik sangat bergantung pada **Tabel Simbol (Symbol Table)**. Routin semantik akan "berjalan" di atas pohon sintaks dan melakukan pemeriksaan dengan cara:
> > 
> > 1. **Mengumpulkan Informasi:** Mengambil informasi tentang tipe, scope, dan atribut lain dari variabel dan fungsi dari tabel simbol.
> >     
> > 2. **Menegakkan Aturan:** Memastikan bahwa penggunaan variabel dan ekspresi dalam program mematuhi aturan bahasa.
> >     
> > 3. **Memberi Anotasi pada Pohon Sintaks:** Seringkali, hasil analisis (seperti tipe data dari sebuah ekspresi) ditambahkan kembali ke pohon sintaks.
> >     
> > 
> > ### Jenis-jenis Pengecekan Semantik
> > 
> > Pengecekan yang umum dilakukan meliputi:
> > 
> > 1. **Pengecekan Nama (Name Checking):**
> >     
> >     - **Terdefinisi (Undefined):** Memastikan setiap variabel atau fungsi yang digunakan telah dideklarasikan sebelumnya.
> >         
> >     - **Duplikasi (Duplication):** Memastikan tidak ada variabel atau fungsi yang dideklarasikan lebih dari sekali dalam scope yang sama.
> >         
> > 2. **Pengecekan Tipe (Type Checking):**
> >     
> >     - **Kesesuaian Tipe Operand:** Memeriksa apakah operator digunakan pada operand dengan tipe yang benar. Contoh: `A + B`, jika A adalah integer maka B juga harus tipe yang bisa dijumlahkan (seperti integer atau float).
> >         
> >     - **Kesesuaian Tipe Assignment:** Memastikan tipe nilai di sebelah kanan operator assignment cocok dengan tipe variabel di sebelah kiri.
> >         
> >     - **Kesesuaian Parameter Fungsi:** Memeriksa apakah jumlah dan tipe argumen dalam pemanggilan fungsi cocok dengan deklarasi fungsinya.
> >         
> >     - **Tipe Kondisi:** Memastikan ekspresi dalam statement kondisional (seperti `if`) menghasilkan nilai boolean.
> >         
> > 
> > ### Output Fase Analisis Semantik
> > 
> > Fase analisis semantik biasanya tidak menghasilkan kode baru secara langsung. Sebaliknya, outputnya adalah:
> > 
> > 1. **Pohon Sintaks yang Dianotasi (Annotated Syntax Tree):** Pohon sintaks yang sama dari parser, tetapi sekarang diperkaya dengan informasi semantik seperti tipe data.
> >     
> > 2. **Sinyal Lolos/Gagal:** Memberi sinyal ke fase selanjutnya jika tidak ada kesalahan, atau menghasilkan pesan kesalahan semantik jika ada masalah.
> >     
> > 
> > Seringkali, fase ini digabungkan dengan fase berikutnya, **Intermediate Code Generation**, di mana pohon sintaks yang telah divalidasi secara semantik akan diubah menjadi representasi perantara yang lebih mudah dioptimalkan dan diterjemahkan ke kode mesin.

> [!cornell] #### Summary
> 
> **Setelah parser memastikan struktur program benar, Analisis Semantik bertugas memeriksa apakah program tersebut masuk akal secara logis dengan cara memvalidasi maknanya. Menggunakan pohon sintaks dan tabel simbol, fase ini melakukan pengecekan krusial seperti memastikan semua variabel telah terdefinisi, tidak ada duplikasi, dan tipe data dalam operasi atau assignment sudah sesuai. Jika tidak ada kesalahan, proses kompilasi berlanjut ke tahap pembuatan kode perantara (intermediate code).**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Static vs. Dynamic Checking
> 
> - **Static Semantic Checking:** Pengecekan yang dilakukan oleh penganalisis semantik pada saat **kompilasi (compile-time)**. Bahasa seperti C++, Java, dan C# sangat bergantung pada ini. Keuntungannya adalah kesalahan dapat ditemukan lebih awal.
>     
> - **Dynamic Semantic Checking:** Pengecekan yang dilakukan pada saat **eksekusi (run-time)**. Bahasa skrip seperti Python dan JavaScript banyak melakukan ini. Misalnya, kesalahan tipe data mungkin baru muncul saat baris kode tersebut dieksekusi.
>     
> 
> #### Topik Teknis 2: Coercion (Konversi Tipe Implisit)
> 
> Terkadang, penganalisis semantik dapat "memperbaiki" ketidakcocokan tipe secara otomatis. Misalnya, dalam ekspresi `5 + 2.5` (integer + float), kompiler bisa secara implisit mengubah (coerce) integer `5` menjadi float `5.0` sebelum melakukan penjumlahan. Aturan untuk coercion ini didefinisikan dalam spesifikasi bahasa.
> 
> #### Eksplorasi Mandiri
> 
> Perhatikan potongan kode C++ berikut. Identifikasi setidaknya 3 kesalahan semantik yang berbeda.
> 
> ```
> void main() {
>   int x = 10;
>   int y;
>   string z = "hello";
>   x = z;
>   if (y + 5) {
>     float x = 20.5;
>   }
> }
> ```
> 
> _(Jawaban: 1. `x = z` adalah assignment tipe tidak cocok. 2. `y` digunakan dalam `y+5` sebelum diinisialisasi. 3. Kondisi `if (y+5)` tidak menghasilkan boolean.)_