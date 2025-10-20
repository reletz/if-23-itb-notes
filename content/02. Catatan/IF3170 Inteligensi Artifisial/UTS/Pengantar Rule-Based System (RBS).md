---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Rule-Based System (RBS)?
> >     
> > - Apa struktur dasar sebuah 'Rule'?
> >     
> > - Mengapa RBS banyak digunakan?
> >     
> > - Apa saja komponen arsitektur RBS?
> >     
> > - Apa itu Working & Production Memory?
> >     
> > - Bagaimana contoh Rule dalam CLIPS?
> >     
> > - Apa dua metode inferensi utama?
> >     
> >
> > ## Reference Points
> >
> > - Materi-06-Seg-0102-RBS.pdf
> >     
> 
> > ### Definisi Rule-Based System (RBS)
> > 
> > **Rule-Based System (RBS)** adalah salah satu jenis _Knowledge-Based System_ (KBS) di mana pengetahuan direpresentasikan dalam bentuk **aturan-aturan** atau _rules_. Karena kesederhanaan dan kekuatannya, ini adalah salah satu solusi AI yang paling umum dan tersebar luas di dunia nyata.
> > 
> > ### Struktur Rule (Aturan)
> > 
> > Sebuah _rule_ pada dasarnya adalah implementasi dari implikasi logis, yang memiliki format dasar **IF-THEN**:
> > 
> > > **IF** (kondisi-kondisi tertentu terpenuhi) **THEN** (lakukan aksi-aksi berikut).
> > 
> > - **IF Part (LHS)**: Bagian ini disebut _Left-Hand Side_ (LHS), premis, atau prekondisi. Ini berisi serangkaian kondisi yang harus dipenuhi.
> >     
> > - **THEN Part (RHS)**: Bagian ini disebut _Right-Hand Side_ (RHS), konklusi, atau aksi. Bagian ini akan dieksekusi jika semua kondisi di LHS terpenuhi. Aksi ini bisa berupa menambahkan fakta baru, menghapus fakta, atau menjalankan suatu prosedur.
> >     
> > 
> > ### Alasan Penggunaan RBS
> > 
> > 1. **Representasi Pengetahuan Paling Sederhana**: Aturan `IF-THEN` adalah cara yang sangat intuitif dan mudah dipahami oleh manusia (terutama pakar domain) untuk mengekspresikan pengetahuan.
> >     
> > 2. **Solusi Paling Umum**: Banyak masalah di dunia nyata, seperti diagnosis, konfigurasi, dan penjadwalan, dapat dimodelkan dengan baik menggunakan aturan.
> >     
> > 3. **Pendekatan Hybrid**: RBS sering digabungkan dengan teknik lain seperti _Machine Learning_ (RBS+ML) untuk menciptakan sistem yang lebih kuat, di mana RBS menangani penalaran tingkat tinggi dan ML menangani pengenalan pola.
> >     
> > 
> > ### Arsitektur Umum RBS
> > 
> > Sebuah RBS umumnya terdiri dari beberapa komponen inti:
> > 
> > - **Production Memory (Long-term Memory)**: Ini adalah basis pengetahuan (_Knowledge Base_) yang berisi semua _rules_ (aturan). Isinya bersifat statis dan tidak berubah selama proses penalaran.
> >     
> > - **Working Memory (Short-term Memory)**: Ini adalah basis data yang berisi semua **fakta** (_facts_) yang diketahui oleh sistem pada saat itu. Isinya sangat dinamis, terus berubah karena aksi dari _rules_ yang dieksekusi (fakta bisa ditambah atau dihapus).
> >     
> > - **Pattern Matcher (Inference Engine)**: Ini adalah "otak" dari sistem. Tugasnya adalah mencocokkan kondisi (LHS) dari semua _rules_ di _Production Memory_ dengan fakta-fakta yang ada di _Working Memory_.
> >     
> > - **Komponen Tambahan**: Seperti _Knowledge Acquisition Component_ (untuk pakar memasukkan aturan), _Explanation Component_ (untuk menjelaskan kenapa sebuah kesimpulan diambil), dan _Interviewer Component_ (untuk berinteraksi dengan pengguna).
> >     
> > 
> > ### Contoh Rule & Facts dalam CLIPS
> > 
> > CLIPS (_C Language Integrated Production System_) adalah sebuah _shell_ populer untuk membangun RBS.
> > 
> > - **Contoh Rule**: Aturan ini menyatakan "JIKA ?x adalah seekor kuda, DAN ?x adalah induk dari ?y, DAN ?y berlari cepat, MAKA ?x adalah kuda yang berharga."
> >     
> >
> > ```
> > (defrule R
> >   (is-a ?x horse)
> >   (is-parent-of ?x ?y)
> >   (is-fast ?y)
> >   =>
> >   (assert (is-valuable ?x))
> > )
> > ```
> > 
> > - **Contoh Facts**: Fakta-fakta yang disimpan di _Working Memory_.
> >     
> >
> > ```
> > (is-a Comet horse)
> > (is-parent-of Comet Prancer)
> > (is-fast Prancer)
> > ```
> > 
> > Berdasarkan fakta di atas, _Pattern Matcher_ akan menemukan bahwa Rule `R` dapat dieksekusi dengan `?x = Comet` dan `?y = Prancer`, yang kemudian akan menambahkan fakta baru `(is-valuable Comet)` ke _Working Memory_.
> > 
> > ### Metode Inferensi (Penalaran)
> > 
> > Ada dua cara utama bagi RBS untuk melakukan penalaran:
> > 
> > 1. **Forward Chaining (Data-Driven)**: Penalaran dimulai dari fakta-fakta yang ada untuk mencapai sebuah kesimpulan. Sistem akan terus mengeksekusi aturan yang kondisinya terpenuhi oleh fakta saat ini.
> >     
> > 2. **Backward Chaining (Goal-Driven)**: Penalaran dimulai dari sebuah tujuan atau hipotesis. Sistem mencoba membuktikan tujuan tersebut dengan mencari aturan yang bisa menghasilkan tujuan itu, lalu bekerja mundur untuk membuktikan kondisi-kondisi dari aturan tersebut.
> >     

> [!cornell] #### Summary
> 
> **Rule-Based System (RBS) adalah jenis KBS yang merepresentasikan pengetahuan sebagai kumpulan aturan IF-THEN (Rules) di dalam Production Memory. Sistem ini bekerja dengan cara mencocokkan aturan-aturan tersebut dengan fakta-fakta (Facts) yang ada di Working Memory menggunakan sebuah Pattern Matcher. Proses penalaran atau inferensinya dapat dilakukan melalui dua metode utama: Forward Chaining yang digerakkan oleh data (data-driven) atau Backward Chaining yang digerakkan oleh tujuan (goal-driven).**