---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Definisi Pattern
> > - Inspirasi & Buku "Gang of Four" (GoF)
> > - _Pattern_ vs _Framework_
> > - 3 Kategori Design Pattern
> > - 4 Elemen Deskripsi Pattern
> > - Contoh: Adapter & Observer
> > - Kritik terhadap Pattern
> > - Kritik khusus: Singleton
> > - Cara Memandang Pattern
> >
>
> > ### Apa itu Design Pattern?
> > - Sebuah _pattern_ (pola) adalah ide yang telah terbukti berguna dalam satu konteks praktis dan kemungkinan besar akan berguna di konteks lain.
> > - Pola ini ditemukan dari pengalaman praktis di proyek nyata, bukan diciptakan dari teori.
> > - Christopher Alexander, seorang arsitek bangunan, mendefinisikannya sebagai deskripsi masalah yang berulang dan inti solusi untuk masalah tersebut, yang dapat digunakan berulang kali dengan cara yang berbeda.
> > - Dalam pemrograman berorientasi objek (OO), _pattern_ membantu memodelkan persoalan dari sebuah domain ke dalam bentuk objek.
> > 
> > ### Referensi Utama: Buku "Gang of Four" (GoF)
> > - Buku paling populer adalah _Design Patterns: Elements of Reusable Object-Oriented Software_ (1995).
> > - Buku ini ditulis oleh "Gang of Four" (GoF): Erich Gamma, Richard Helm, Ralph Johnson, dan John Vlissides.
> > - Buku ini berisi 23 _design patterns_ yang menjadi acuan utama dalam pengembangan perangkat lunak berorientasi objek.
> > 
> >### Pattern vs. Framework 
> >- _Reusability_ (penggunaan kembali kode) adalah salah satu keunggulan utama OO. Namun, ini lebih sering berhasil di level GUI dan basis data daripada di level _business logic_ yang kompleks.
> >- _Pattern_ membantu dengan memberikan **alternatif cara pemodelan** suatu situasi, mengambil pelajaran dari domain lain.
> >- _Framework_ adalah saat kita **memilih satu model partikular** untuk diimplementasikan.
> >
> > ### Kategori dan Elemen Design Pattern
> > GoF mengelompokkan 23 pola ke dalam 3 kategori:
> > 1. **Creational:** Berfokus pada mekanisme penciptaan objek, memberikan fleksibilitas dan penggunaan kembali kode. Contoh: _Singleton, Factory Method, Builder_.
> > 2. **Structural:** Menjelaskan cara menyusun objek dan kelas menjadi struktur yang lebih besar, fleksibel, dan efisien. Contoh: _Adapter, Decorator, Façade_.
> > 3. **Behavioral:** Berkaitan dengan algoritma dan pembagian tanggung jawab antar objek. Contoh: _Observer, Strategy, Command_.
> > 
> >  Setiap pola dalam buku GoF dijelaskan menggunakan 4 elemen:
> >  - **Nama Pola:** Identifikasi unik.
> >  - **Problem:** Kapan pola ini sebaiknya diterapkan.
> >  - **Solution:** Elemen-elemen desain dan hubungannya.
> >  - **Consequences:** Hasil, keuntungan, dan kerugian (_trade-offs_) dari penggunaan pola tersebut.
> >
> > ### Kritik terhadap Design Patterns
> > - **Keterbatasan Bahasa:** Sebagian pola dianggap hanya sebagai _workaround_ untuk fitur yang tidak ada di bahasa pemrograman tertentu seperti C++ atau Java.
> > - _**Overusing:**_ Pemula cenderung menggunakan pola secara berlebihan, seperti peribahasa "jika Anda hanya punya palu, semua terlihat seperti paku."
> > - **Kurang Inovatif:** Alan Kay (pencetus OO) berpendapat bahwa mengabstraksikan pola dari praktik pemrograman saat ini seolah-olah memuliakan praktik tersebut, padahal mungkin praktik itu sendiri belum tentu baik.
> > - **Kritik Khusus untuk Singleton:**
> > 	- Menyembunyikan dependensi, menjadikannya seperti variabel global.
> > 	- Melanggar _Single Responsibility Principle_ karena mengontrol penciptaan dirinya sendiri.
> > 	- Menyebabkan _tight coupling_ (keterikatan yang erat) dan sulit untuk diuji.
> > 	- Membawa _state_ selama aplikasi berjalan, yang dapat mengacaukan _unit test_ yang seharusnya independen. Alternatif yang lebih baik seringkali adalah _Dependency Injection_.
> > 
> > ### Bagaimana Seharusnya Memandang Design Patterns
> > - Pola adalah **titik awal, bukan tujuan akhir**. Mereka adalah "benih" yang berisi ide dan visi untuk dikembangkan.
> > - Saat menggunakan pola, baca dokumentasinya dengan lengkap untuk memahami batasan dan fitur pentingnya.
> > - Cobalah agar pola tersebut sesuai, tetapi jangan terlalu dipaksakan. Jika tidak cocok, jangan ragu untuk memodifikasinya. Pola adalah **saran, bukan resep yang kaku**.

> [!cornell] #### Summary
> Design Patterns adalah solusi yang telah teruji untuk masalah-masalah umum dalam desain perangkat lunak berorientasi objek. Dipopulerkan oleh buku "Gang of Four", pola-pola ini terbagi menjadi tiga kategori utama—_Creational_, _Structural_, dan _Behavioral_—dan berfungsi sebagai titik awal atau panduan, bukan sebagai aturan yang kaku. Meskipun sangat berguna, mereka juga menerima kritik karena terkadang menjadi _workaround_ untuk keterbatasan bahasa atau digunakan secara berlebihan. Pola seperti _Singleton_ bahkan dikritik karena melanggar prinsip desain yang baik, sehingga penting untuk memahami konsekuensi dan alternatif dari setiap pola sebelum menerapkannya.

> [!ad-libitum]- Additional Information (Optional)
> #### Detail 23 GoF Design Patterns
> Berikut adalah daftar ke-23 pola dari buku "Gang of Four" (GoF), dikelompokkan berdasarkan kategori. Deskripsi ditambahkan untuk pola yang dijelaskan dalam materi.
> ##### Creational Patterns
> Pola-pola ini berkaitan dengan mekanisme penciptaan objek.
> 1. **Abstract Factory:** TBA.
> 2. **Builder:** TBA.
> 3. **Factory Method:** TBA.
> 4. **Prototype:** TBA.
> 5. **Singleton:** Tujuannya adalah untuk memastikan sebuah kelas hanya memiliki satu instance dan menyediakan titik akses global ke instance tersebut.
> 
> ##### **Structural Patterns**
> Pola-pola ini menjelaskan cara merakit objek dan kelas menjadi struktur yang lebih besar.
> 6. **Adapter:** Tujuannya adalah mengubah antarmuka sebuah kelas menjadi antarmuka lain yang diharapkan oleh klien. Ini memungkinkan kelas-kelas dengan antarmuka yang tidak kompatibel untuk bekerja sama. 
> 7. **Bridge:** TBA. 
> 8. **Composite:** TBA. 
> 9. **Decorator:** Tujuannya adalah untuk menambahkan tanggung jawab baru ke sebuah objek secara dinamis saat runtime. Ini adalah alternatif yang fleksibel untuk _subclassing_ dalam memperluas fungsionalitas. 
> 10. **Facade:** TBA. 
> 11. **Flyweight:** TBA. 
> 12. **Proxy:** TBA.
> 
> ##### **Behavioral Patterns**
> Pola-pola ini berkaitan dengan algoritma dan pembagian tanggung jawab antar objek. 
> 13. **Chain of Responsibility:** TBA. 
> 14. **Command:** TBA. 
> 15. **Interpreter:** TBA. 
> 16. **Iterator:** TBA.
> 17. **Mediator:** TBA. 
> 18. **Memento:** TBA. 
> 19. **Observer:** Tujuannya adalah untuk mendefinisikan ketergantungan satu-ke-banyak (one-to-many) antar objek, sehingga ketika satu objek berubah keadaan, semua objek yang bergantung padanya akan diberitahu dan diperbarui secara otomatis. 
> 20. **State:** TBA.
> 21. **Strategy:** TBA. 
> 22. **Template Method:** TBA. 
> 23. **Visitor:** TBA.