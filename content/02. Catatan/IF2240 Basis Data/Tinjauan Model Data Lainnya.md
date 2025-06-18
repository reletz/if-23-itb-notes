---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> > ## Questions/Cues
> > 
> > - Apa konsep dasar Model Object-Oriented?
> > - Apa itu Model Object-Relational?
> > - Apa karakteristik Model Semi-Structured (XML)?
> > - Bagaimana struktur Model Hierarkis?
> > - Apa perbedaan utama Model Network dengan Model Hierarkis?
> 
> > ### Model Object-Oriented
> > 
> > - **Konsep:** Model ini merupakan adaptasi dari paradigma pemrograman berorientasi objek (seperti pada bahasa C++ atau Java) ke dalam dunia basis data. Ide utamanya adalah **enkapsulasi**, di mana data dan kode (prosedur) yang mengoperasikannya dibungkus menjadi satu kesatuan unit yang disebut **objek**.
> >     
> > - **Komponen Objek:** Setiap objek memiliki:
> >     
> >     - **Sekumpulan variabel:** Untuk menyimpan data atau state dari objek tersebut.
> >     - **Sekumpulan _message_:** Operasi yang dapat direspons oleh objek.
> >     - **Sekumpulan _method_:** Blok kode yang mengimplementasikan sebuah _message_. Method inilah yang akan dieksekusi ketika objek menerima _message_ yang sesuai.
> > 
> > ### Model Object-Relational
> > 
> > - **Konsep:** Model ini adalah sebuah model hibrida. Ia mempertahankan dasar-dasar dari Model Relasional yang sudah kuat (seperti struktur tabel dan akses data deklaratif melalui SQL), namun memperluasnya dengan menyertakan konsep-konsep dari Model Object-Oriented.
> >     
> > - **Fitur Tambahan:**
> >     
> >     - **Tipe Data yang Lebih Kaya:** Mendukung tipe data kompleks, termasuk tipe koleksi seperti set, multiset, dan array.
> >     - **_Inheritance_ (Pewarisan):** Memungkinkan pembuatan _subtype_ dan _subtable_, yang mewarisi properti dari tipe atau tabel induknya.
> > 
> > ### Model Semi-Structured (Contoh: XML)
> > 
> > - **Konsep:** Model ini dirancang untuk data yang tidak cocok dengan struktur tabel yang kaku, tetapi masih memiliki struktur internal. XML (_eXtensible Markup Language_) adalah contoh utamanya, di mana pengguna bisa mendefinisikan tag sendiri untuk menciptakan struktur bersarang.
> >     
> > - **Karakteristik Utama:**
> >     
> >     - **_Self-describing_:** Tag di dalam data menjelaskan makna dari data itu sendiri.
> >     - **Tidak Memerlukan Skema Awal:** Berbeda dengan model relasional, data bisa disimpan tanpa harus mendefinisikan strukturnya secara kaku terlebih dahulu.
> >     - **Fleksibel:** Entitas dalam kelompok yang sama bisa memiliki atribut yang berbeda, dan tipe datanya pun bisa bervariasi.
> > 
> > ### Model Hierarkis (Hierarchical Model)
> > 
> > - **Konsep:** Model ini mengorganisir data dalam bentuk **struktur pohon (tree)**. Ini adalah salah satu model basis data paling awal yang populer di era mainframe.
> >     
> > - **Struktur:** Terdiri dari _record types_ (sebagai node/kotak) dan _links_ (sebagai garis). Aturan utamanya sangat ketat: setiap _record_ anak (_child_) hanya boleh memiliki **satu** _record_ induk (_parent_). Ini menciptakan hubungan satu-ke-banyak (one-to-many) yang jelas.
> >     
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >            A (Parent)
> >           / | \
> >          /  |  \
> >         B1  B2  Bn (Children)
> >        / \
> >       /   \
> >      C1   Cm (Grandchildren)
> >     ```
> >     
> > 
> > ### Model Jaringan (Network Model)
> > 
> > - **Konsep:** Model ini adalah evolusi dari model hierarkis. Ia juga menggunakan _records_ dan _links_, namun mengizinkan struktur data yang lebih kompleks seperti **graf (graph)**.
> >     
> > - **Perbedaan Utama dari Hierarkis:** Fleksibilitasnya. Dalam model jaringan, sebuah _record_ anak **dapat memiliki lebih dari satu** _record_ induk. Ini memungkinkan pemodelan hubungan banyak-ke-banyak (many-to-many) secara lebih alami dan efisien dibandingkan model hierarkis.
> >     
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >      (Parent 1)      (Parent 2)
> >           \            /
> >            \          /
> >           (Child Record)
> >     ```
> >     
> >     _Sebuah 'Child Record' bisa terhubung ke 'Parent 1' dan 'Parent 2' secara bersamaan._
> >     

> [!cornell] #### Summary
> 
> Selain model Relasional dan E-R yang umum, terdapat model lain untuk kebutuhan spesifik. Model Object-Oriented menggabungkan data dan operasi dalam satu unit (objek). Model Hierarkis menyusun data dalam struktur pohon yang kaku (satu induk per anak), sementara Model Jaringan yang lebih fleksibel mengizinkan struktur graf (banyak induk per anak). Terakhir, Model Semi-Terstruktur seperti XML menawarkan fleksibilitas tinggi untuk data yang tidak memiliki skema tetap, di mana data mendeskripsikan dirinya sendiri melalui tag.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Konteks Sejarah dan Evolusi
> 
> - **Era Awal (1960-1970an):** Model Hierarkis dan Jaringan adalah pelopor dalam dunia basis data, terutama di lingkungan mainframe. Keduanya sangat cepat untuk navigasi data tetapi kurang fleksibel dan kompleks untuk diprogram.
> - **Era Dominasi (1980an-sekarang):** Model Relasional, yang diusulkan oleh E.F. Codd pada tahun 1970, secara perlahan menggantikan model-model lama karena kesederhanaan konseptualnya, fondasi matematika yang kuat, dan munculnya bahasa query standar (SQL) yang sangat kuat.
> - **Era Modern (1990an-sekarang):** Dengan munculnya pemrograman berorientasi objek dan kebutuhan untuk menangani data yang lebih kompleks (seperti multimedia dan data spasial), Model Object-Oriented dan Object-Relational dikembangkan untuk mengatasi keterbatasan model relasional murni.