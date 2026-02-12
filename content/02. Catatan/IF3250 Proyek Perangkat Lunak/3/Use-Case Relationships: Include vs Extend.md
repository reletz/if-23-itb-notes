---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pemodelan Perangkat Lunak]]

> [!cornell] Use-Case Relationships: Include vs Extend
>
> > ## Questions/Cues
> >
> > - Mengapa include bersifat wajib dalam eksekusi?
> > - Kapan hubungan extend digunakan?
> > - Perbedaan perilaku include vs extend
> > - Contoh nyata implementasi <<include>>
> > - Kriteria penggunaan <<extend>>
> >
> > ## Reference Points
> >
> > - Scenario Modeling Slides (Halaman 12-13)
>
> > ### Hubungan Include (<<include>>)
> >
> > Hubungan **include** mendefinisikan ketergantungan wajib antara dua use-case di mana use-case target harus selalu dieksekusi ketika use-case sumber dijalankan. Ini merepresentasikan hubungan "harus dilakukan" yang tidak opsional. Contohnya, use-case "Pembayaran Online" harus selalu <<include>> use-case "Verifikasi Kartu Kredit" karena verifikasi merupakan prasyarat mutlak sebelum transaksi dapat diselesaikan.
> >
> > Dalam diagram UML, hubungan include ditunjukkan dengan panah bertitik dari use-case sumber ke use-case target yang diberi label <<include>>. Penting untuk dicatat bahwa use-case target tidak dapat berdiri sendiri dalam konteks ini - ia hanya diakses melalui use-case sumber yang memanggilnya.
> >
> > ### Hubungan Extend (<<extend>>)
> >
> > Hubungan **extend** merepresentasikan perilaku opsional yang hanya dieksekusi dalam kondisi tertentu. Use-case target memperluas (extend) use-case sumber hanya ketika kondisi ekstensi tertentu terpenuhi. Misalnya, use-case "Pemesanan Tiket Pesawat" mungkin memiliki hubungan <<extend>> dengan use-case "Pilih Kursi" karena pemilihan kursi merupakan fitur tambahan yang hanya relevan jika maskapai menyediakan opsi ini.
> >
> > Dalam notasi UML, panah extend mengarah dari use-case tambahan (extension) ke use-case dasar (base) dengan label <<extend>>. Titik ekstensi (extension point) harus didefinisikan secara eksplisit dalam deskripsi use-case dasar untuk menunjukkan di mana ekstensi dapat disisipkan.
> >
> > ### Perbedaan Fundamental
> >
> > Perbedaan utama terletak pada sifat hubungan dan kondisi eksekusi:
> >
> > - **Include**: Wajib dan deterministik (selalu dieksekusi)
> > - **Extend**: Opsional dan kondisional (hanya pada keadaan tertentu)
> >
> > Contoh analogi: Pada proses memasak nasi goreng:
> >
> > - **Include** = Memanaskan wajan (wajib dilakukan)
> > - **Extend** = Menambahkan telur mata sapi (opsional, tergantung preferensi)
> >
> > ### Kriteria Penggunaan
> >
> > Gunakan **<<include>>** ketika:
> >
> > 1. Terdapat fungsionalitas yang digunakan ulang di beberapa use-case
> > 2. Urutan langkah yang sama diperlukan di berbagai konteks
> > 3. Memisahkan perilaku inti dari implementasi teknis
> >
> > Gunakan **<<extend>>** ketika:
> >
> > 1. Terdapat alur alternatif yang tidak selalu diperlukan
> > 2. Perilaku tambahan hanya relevan dalam skenario khusus
> > 3. Ingin menjaga use-case dasar tetap sederhana

> [!cornell] #### Summary
>
> **Hubungan <<include>>** mendefinisikan ketergantungan wajib dimana use-case target harus selalu dieksekusi, sementara **<<extend>>** menambahkan perilaku opsional berdasarkan kondisi tertentu. Perbedaan utama terletak pada sifat wajib vs opsional dan deterministik vs kondisional. **Include** cocok untuk fungsionalitas umum yang digunakan ulang, sedangkan **extend** ideal untuk alur alternatif dan fitur tambahan. Kedua hubungan ini meningkatkan modularitas model use-case dengan memisahkan perilaku inti dari ekstensi opsional.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Mendalam
>
> | Aspek              | Include                          | Extend                          |
>
> |---------------------|----------------------------------|---------------------------------|
>
> | **Sifat Eksekusi**  | Wajib (mandatory)                | Opsional (conditional)          |
>
> | **Arah Ketergantungan** | Sumber → Target              | Target → Sumber              |
>
> | **Reusability**     | High (umumnya reusable)         | Low (spesifik konteks)          |
>
> | **Titik Eksekusi**  | Tetap dalam alur utama           | Bergantung pada extension point|
>
> #### Studi Kasus Kompleks: Sistem E-Commerce
>
> - **Use-case dasar**: Checkout Keranjang Belanja
> - **<<include>>**: Verifikasi Stok, Hitung Pajak
> - **<<extend>>**:
> - Pakai Kupon Diskon (ekstensi jika kupon valid)
> - Pilih Pengiriman Ekspres (ekstensi jika tersedia)
>
> Pola ini menunjukkan bagaimana include menangani operasi inti yang selalu diperlukan, sementara extend mengelola fitur tambahan yang bergantung pada kondisi bisnis.
>
> #### Praktik Terbaik Pemodelan
>
> 1. Hindari "spaghetti relationships" dengan membatasi maksimal 3-5 hubungan per use-case
> 2. Gunakan package untuk mengelompokkan use-case dengan hubungan kompleks
> 3. Dokumentasikan kondisi ekstensi secara eksplisit menggunakan OCL (Object Constraint Language)
> 4. Validasi model dengan teknik scenario walkthrough untuk memastikan tidak ada circular dependencies
>
> #### Tools Pemodelan
>
> - **Enterprise Architect**: Support UML 2.5 dengan validasi hubungan otomatis
> - **Visual Paradigm**: Fitur dependency matrix untuk melacak hubungan use-case
> - **PlantUML**: Teknik diagram as code untuk versi kontrol model
>
> #### Projek Eksplorasi Mandiri
>
> 1. Bangun model use-case sistem reservasi hotel dengan:
> - 3 hubungan include (verifikasi ketersediaan, konfirmasi pembayaran, generate invoice)
> - 2 hubungan extend (pilih makanan tambahan, request late check-out)
> 2. Implementasikan dalam tool UML pilihan dan validasi dengan membuat minimal 2 skenario alternatif
>
> #### Bacaan Lanjutan
>
> - "Advanced Use Case Modeling" oleh Frank Armour (Bab 4: Relationships)
> - UML 2.5 Specification (Pasal 18.1.2: Extension Points)
> - Tutorial Sparx Systems: "Managing Complex Use Case Dependencies"
> - Research Paper: "A Formal Approach to Use Case Relationships" (Jurnal IEEE TSE)