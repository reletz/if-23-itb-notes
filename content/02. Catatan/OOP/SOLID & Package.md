---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[OOP]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Tujuan SOLID (Anti-Bad Design)
> > - SRP: Single Responsibility Principle
> > - OCP: Open/Closed Principle
> > - LSP: Liskov Substitution (Contoh: Square/Rectangle)
> > - ISP: Interface Segregation (Contoh: LivingThing)
> > - DIP: Dependency Inversion (Contoh: Manager/Worker)
> > - Prinsip Kohesi & Coupling Package
> > - Metrik Desain: Instability (I)
> > - Metrik Desain: Abstractness (A)
> > - Hubungan Stabilitas & Abstraksi
> >
>
> > 
> > ### Tujuan Prinsip Desain (SOLID)
> > Prinsip-prinsip ini bertujuan untuk memerangi "desain yang buruk" (_bad design_). Tanda-tanda desain yang buruk meliputi:
> > 1. **Rigidity (Kaku):** Sulit diubah karena satu perubahan kecil memicu rentetan perubahan di banyak bagian lain.
> > 2. **Fragility (Rapuh):** Perubahan menyebabkan kerusakan di bagian sistem yang tampaknya tidak berhubungan.
> > 3. **Immobility (Tidak Bisa Dipindahkan):** Sulit untuk menggunakan kembali komponen di aplikasi lain karena terlalu terikat dengan desain saat ini.
> > 
> > ### S.O.L.I.D. Principles
> > **S - Single Responsibility Principle (SRP):**
> > > _"Sebuah kelas seharusnya hanya memiliki satu, dan hanya satu, alasan untuk berubah."_
> >  - **Intinya:** Setiap kelas harus memiliki satu tugas atau tanggung jawab utama. Jangan mencampuradukkan banyak tanggung jawab (misal, kelas yang mengurus koneksi database sekaligus memformat laporan dan mengirim email).
> > 
> > **O - Open/Closed Principle (OCP):**
> > > _"Objek atau entitas harus terbuka untuk ekstensi (penambahan fitur baru), tetapi tertutup untuk modifikasi (mengubah kode yang sudah ada)."_
> > - **Intinya:** Anda harus bisa menambahkan fungsionalitas baru tanpa mengubah kode sumber yang sudah teruji. Ini biasanya dicapai melalui pewarisan (`inheritance`) dan `interface`.
> > 
> > **L - Liskov Substitution Principle (LSP):**
> > > _"Setiap subclass (kelas turunan) harus dapat menggantikan base class-nya (kelas induk) tanpa mengubah kebenaran program."_
> > - **Intinya:** Jika Anda memiliki kode yang bekerja dengan objek `Parent`, kode tersebut harus tetap bekerja dengan benar jika Anda menggantinya dengan objek `Child`. Perilaku `Child` tidak boleh melanggar kontrak `Parent`.
> > - _Contoh Klasik (Pelanggaran LSP):_
> > 	- Secara matematis, `Square` (Persegi) adalah `Rectangle` (Persegi Panjang). Mungkin terpikir untuk membuat `class Square extends Rectangle`.
> > 	- Misal `Rectangle` punya `setWidth(w)` dan `setHeight(h)`. Di `Square`, jika Anda memanggil `setWidth(5)`, Anda harus secara paksa mengubah `height` menjadi `5` juga agar tetap menjadi persegi.
> > 	- Ini **melanggar LSP**. Kode yang mengharapkan `Rectangle` mungkin akan rusak, karena ia berasumsi mengubah lebar tidak akan mengubah tinggi. Desain ini salah.
> > 
> > **I - Interface Segregation Principle (ISP):**
> > > _"Klien tidak boleh dipaksa untuk bergantung pada method yang tidak mereka gunakan."_
> > - **Intinya:** Buatlah `interface` yang kecil dan spesifik (fine-grained) daripada `interface` "gemuk" (fat) yang berisi banyak method.
> > - _Contoh Buruk ("Fat Interface")_:
> > ```java
> > interface LivingThing {
> > 	void eat();
> > 	void grow();
> > 	void breathe(); // Method untuk bernapas
> > }
> > class AnaerobicBacteria implements LivingThing {
> > 	// ... implementasi eat() dan grow() ...
> > 	// Terpaksa harus menyediakan implementasi breathe(),
> > 	// padahal bakteri anaerob tidak bernapas!
> > 	public void breathe() { /* do nothing? throw exception? */ }
> > }
> > ```
> > - _Contoh Baik (Interface Terpisah):_
> > ```java
> > interface Eatable { void eat(); }
> > interface Growable { void grow(); }
> > interface Breathing { void breathe(); }
> > 
> > // Kelas hanya mengimplementasikan apa yang ia butuhkan.
> > class AnaerobicBacteria implements Eatable, Growable { ... }
> > class Human implements Eatable, Growable, Breathing { ... }
> > ```
> > 
> > **D - Dependency Inversion Principle (DIP)**
> > > _"Modul tingkat tinggi tidak boleh bergantung pada modul tingkat rendah. Keduanya harus bergantung pada abstraksi."_
> > - **Intinya:** Jangan mengikat kode Anda ke implementasi konkret. Gantungkan ketergantungan pada `interface` atau `abstract class`.
> > - _Contoh Buruk (Ketergantungan Konkret):_
> > ```java
> > class Manager { 
> > 	private Worker worker; 
> > 	// Bergantung langsung pada kelas Worker 
> > 	public Manager() { this.worker = new Worker(); } 
> > 	public void manage() { worker.work(); } 
> > }
> >```
> > - _Contoh Baik (Bergantung pada Abstraksi):_
> > ```java
> > interface IWorker { void work(); }
> > class Worker implements IWorker { ... }
> > class SuperWorker implements IWorker { ... }
> > 
> > class Manager {
> > 	private IWorker worker; // Bergantung pada interface IWorker
> > 	// Implementasi bisa diganti-ganti tanpa mengubah Manager
> > 	
> > 	public Manager(IWorker worker) { this.worker = worker; }
> > 	public void manage() { worker.work(); }
> >}
> >```
> > ### Prinsip Desain Package
> > **Prinsip Kohesi (Apa yang ada di dalam package):**
> > - `REP`: Unit yang dirilis bersama adalah unit yang digunakan kembali bersama.
> > - `CCP`: Kelas-kelas yang berubah bersama sebaiknya berada dalam satu package.
> > - `CRP`: Kelas-kelas yang digunakan bersama sebaiknya berada dalam satu package.
> > 
> > **Prinsip Coupling (Hubungan antar package):**
> > - `ADP`: Grafik ketergantungan antar package tidak boleh siklik (berputar).
> > - `SDP`: Bergantunglah ke arah yang lebih stabil.
> > - `SAP`: Tingkat abstraksi harus meningkat seiring dengan tingkat stabilitas.
> > 
> > **Metrik Desain Kuantitatif:**
> > - **Instability (I):** Mengukur seberapa mudah sebuah package terpengaruh oleh perubahan di package lain.
> > 	- `Ce`: Jumlah kelas _di dalam_ package yang bergantung pada kelas _di luar_.
> > 	- `Ca`: Jumlah kelas _di luar_ package yang bergantung pada kelas _di dalam_.
> > 	- Formula: `I = Ce / (Ca + Ce)`. Rentang nilai: `0` (sangat stabil) hingga `1` (sangat tidak stabil).
> > - **Abstractness (A):** Mengukur seberapa abstrak sebuah package.
> > 	- Formula: `A = Jumlah kelas abstrak / Total kelas dalam package`. Rentang nilai: `0` (sangat konkret) hingga `1` (sangat abstrak).
> > - **Hubungan I & A (Main Sequence):** Package yang ideal berada di dekat "garis utama" di mana `A + I = 1`.
> > 	- Package yang sangat **stabil (`I`~0)** seharusnya sangat **abstrak (`A`~1)**.
> > 	- Package yang sangat **konkret (`A`~0)** seharusnya sangat **tidak stabil (`I`~1)**.

> [!cornell] #### Summary
> Catatan ini mengupas prinsip desain arsitektur perangkat lunak. Prinsip SOLID menyediakan panduan pada level kelas untuk menciptakan kode yang fleksibel, mudah dipelihara, dan dapat diperluas, dengan contoh-contoh kunci seperti LSP (perilaku turunan harus konsisten) dan DIP (bergantung pada abstraksi, bukan implementasi konkret). Selanjutnya, prinsip Package mengangkat desain ke level arsitektur, mengatur bagaimana kelas dikelompokkan menjadi modul yang kohesif dan bagaimana hubungan antar modul tersebut dikelola agar tidak siklik dan bergantung pada komponen yang stabil. Metrik kuantitatif seperti Instabilitas (I) dan Abstraksi (A) memberikan cara objektif untuk mengukur kesehatan desain arsitektur tersebut.

> [!ad-libitum]- Additional Information (Optional)
> #### Technical
> **Dependency Inversion vs. Dependency Injection (DI):**
> - **DIP adalah prinsipnya:** "Bergantung pada abstraksi".
> - **DI adalah polanya (pattern):** Salah satu cara untuk _mengimplementasikan_ DIP. Alih-alih sebuah kelas membuat dependensinya sendiri (`new Worker()`), dependensi tersebut "disuntikkan" (injected) dari luar. Tiga cara umum DI:
> 	1. **Constructor Injection:** Dependensi diberikan melalui konstruktor. Ini adalah cara yang paling umum dan disukai (`public Manager(IWorker worker)`).
> 	2. **Setter Injection:** Dependensi diberikan melalui method setter (`public void setWorker(IWorker worker)`).
> 	3. **Interface Injection:** Kelas mengimplementasikan interface seperti `IWorkerConsumer` yang memiliki method `inject(IWorker worker)`.
> - Framework modern seperti **Spring** sangat mengandalkan DI untuk mengelola seluruh komponen aplikasi.
> 
> **Pola Desain (Design Patterns) & SOLID:** Banyak pola desain klasik (GoF) merupakan manifestasi dari prinsip SOLID.
> - **Strategy Pattern** dan **Template Method Pattern** adalah contoh sempurna dari **Open/Closed Principle**, di mana algoritma dapat diubah atau diperluas tanpa memodifikasi kelas utama.
> - **Adapter Pattern** dan **Decorator Pattern** membantu kelas agar sesuai dengan **Liskov Substitution Principle** dengan membungkus objek untuk mengubah antarmukanya atau menambahkan fungsionalitas secara dinamis.