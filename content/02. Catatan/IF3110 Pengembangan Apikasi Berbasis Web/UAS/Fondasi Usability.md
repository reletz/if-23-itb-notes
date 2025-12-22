type: Note

cssclasses:

- cornell-notes
    

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Usability Fundamentals & Dimensions
> 
> > ## Questions/Cues
> 
> > - Definisi ISO 9241-11
> >     
> > - 5 Komponen Nielsen
> >     
> > - Whitney Quesenbery 5Es
> >     
> > - Konsep "Be the User"
> >     
> > - Mobile vs Desktop Context
> >     
> > - UX Clean Up
> >     
> 
> > ## Reference Points
> 
> > - Slides: IF3110-14-Usability-Test-and-Monitoring (Pages 1-6)
> >     
> > - Jakob Nielsen & Whitney Quesenbery Frameworks
> >     
> 
> > ### Apa itu Usability?
> 
> > Usability bukan sekadar "tampilan bagus", tetapi ukuran seberapa baik sistem dapat digunakan.
> 
> > - **Definisi Standar (ISO 9241-11:2018):** Tingkat di mana produk dapat digunakan oleh pengguna tertentu untuk mencapai tujuan tertentu dengan **Efektivitas**, **Efisiensi**, dan **Kepuasan** dalam konteks penggunaan yang spesifik.
> >     
> 
> > ### 5 Komponen Usability (Jakob Nielsen)
> 
> > Jakob Nielsen, bapak usability modern, memecah usability menjadi 5 elemen kualitas:
> 
> > 1. **Learnability (Kemudahan Belajar):** Seberapa mudah pengguna menyelesaikan tugas dasar saat _pertama kali_ melihat desain?
> >     
> > 2. **Efficiency (Efisiensi):** Setelah pengguna paham, seberapa cepat mereka bisa menyelesaikan tugas?
> >     
> > 3. **Memorability (Daya Ingat):** Setelah lama tidak menggunakan aplikasi, seberapa mudah mereka kembali mahir?
> >     
> > 4. **Errors (Kesalahan):** Berapa banyak error yang dibuat pengguna? Seberapa parah? Bisakah mereka memulihkannya (recover)?
> >     
> > 5. **Satisfaction (Kepuasan):** Seberapa menyenangkan menggunakan desain tersebut?
> >     
> 
> > ### Dimensi Usability (Whitney Quesenbery 5Es)
> 
> > Pendekatan alternatif untuk menyeimbangkan kebutuhan pengguna:
> 
> > - **Effective:** Akurasi dan kelengkapan dalam mencapai tujuan.
> >     
> > - **Efficient:** Kecepatan penyelesaian kerja.
> >     
> > - **Engaging:** Seberapa "menarik" dan memuaskan antarmuka tersebut.
> >     
> > - **Error Tolerant:** Seberapa baik produk mencegah error dan membantu recovery.
> >     
> > - **Easy to Learn:** Mendukung orientasi awal dan pembelajaran berkelanjutan.
> >     
> 
> > ### Mentalitas "Be the User" (Menjadi Pengguna)
> 
> > Pengembang sering bias karena mereka bekerja di meja nyaman dengan layar besar.
> 
> > - **Konteks Nyata:** Pengguna Anda mungkin sedang berjalan di jalan ramai (mobile user), mengetik lambat (5-10 kata/menit), melihat layar kecil inci di bawah sinar matahari.
> >     
> > - **Implikasi:** Desain dan konten harus disesuaikan dengan keterbatasan fisik dan lingkungan pengguna, bukan kondisi ideal developer.
> >     
> 
> > ### Membersihkan User Experience (UX Clean Up)
> 
> > Saat banyak programmer bekerja dalam satu proyek, inkonsistensi sering terjadi.
> 
> > - **Konsistensi vs Kreativitas:** Jangan membuat antarmuka "unik" yang membingungkan. Ikuti pola aplikasi populer (Google, Amazon) agar pengguna tidak perlu belajar ulang (Jacob's Law). Yang harus unik adalah _kontennya_, bukan cara navigasinya.
> >     
> > - **Screen Real Estate:** Hitung rasio "Bureaucracy vs Information".
> >     
> >     - _Bureaucracy:_ Logo besar, navigasi berlebihan, copyright, disclaimer.
> >         
> >     - _Action:_ Kurangi atau geser elemen birokrasi ke bawah (footer) untuk memberi ruang pada konten utama.
> >         
> > - **Navigasi:** Hindari struktur yang terlalu dalam (klik > back > klik > back). Usahakan navigasi yang datar dan efisien.
> >     

> [!cornell] #### Summary
> 
> Usability didefinisikan oleh ISO sebagai efektivitas, efisiensi, dan kepuasan dalam konteks tertentu. Framework utama untuk mengevaluasinya adalah 5 Komponen Nielsen (termasuk Learnability & Errors) dan 5Es Quesenbery. Tantangan utama pengembangan adalah melepaskan bias developer ("Be the User") dan memastikan konsistensi antarmuka dengan standar umum serta meminimalkan elemen "birokrasi" layar agar fokus pada konten.

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Jacob's Law (Hukum Jacob)
> 
> Disebutkan secara implisit dalam slide ("copy successful Internet services"). Hukum ini menyatakan:
> 
> "Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know."
> 
> Inilah alasan mengapa tombol "Search" biasanya ada kaca pembesar, dan keranjang belanja ada di pojok kanan atas. Melanggar konvensi ini meningkatkan Cognitive Load (beban otak) pengguna.
> 
> #### Perbedaan Efficiency vs Effectiveness
> 
> - **Effectiveness:** Melakukan hal yang _benar_ (Selesai/Tuntas). Contoh: User berhasil membeli tiket pesawat.
>     
> - **Efficiency:** Melakukan hal dengan _cara yang benar_ (Cepat/Hemat Sumber Daya). Contoh: User membeli tiket pesawat dalam 3 klik, bukan 10 klik.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan antara Formative dan Summative Testing (meski detail di note 2, ini konsep dasar)?</strong></summary>
> 
> Formative dilakukan selama pengembangan untuk mencari/memperbaiki bug. Summative dilakukan di akhir untuk memvalidasi metrik keberhasilan.
> 
> </details>

> <details>
> 
> <summary><strong>2. Sebutkan 5 komponen Usability menurut Jakob Nielsen!</strong></summary>
> 
> Learnability, Efficiency, Memorability, Errors, Satisfaction.
> 
> </details>

> <details>
> 
> <summary><strong>3. Apa yang dimaksud dengan "Memorability" dalam desain?</strong></summary>
> 
> Kemampuan pengguna untuk kembali menggunakan sistem dengan mahir setelah periode waktu tertentu tidak menggunakannya, tanpa harus belajar ulang dari nol.
> 
> </details>

> <details>
> 
> <summary><strong>4. Mengapa kita disarankan untuk "meniru" antarmuka situs populer seperti Amazon atau Google?</strong></summary>
> 
> Agar memanfaatkan pengetahuan yang sudah dimiliki pengguna (mental model). Jika antarmuka kita mirip standar industri, pengguna tidak perlu usaha ekstra untuk mempelajarinya.
> 
> </details>