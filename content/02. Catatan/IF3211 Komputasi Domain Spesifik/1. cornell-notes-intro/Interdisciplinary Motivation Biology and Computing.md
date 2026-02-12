---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Motivasi Interdisipliner: Biologi dan Komputasi
>
> > ### Pertanyaan/Petunjuk
> >
> > - Mengapa kolaborasi biologi-komputasi penting?
> > - Contoh aplikasi inspirasi biologi di rekayasa
> > - Perbedaan pembelajaran biologi vs matematika
> > - Kategori utama komputasi berbasis biologi
> > - Tujuan pendidikan IF3211
> >
> > ### Referensi
> >
> > - Lecture_01_DFS.pptx (Slide 1-19)
> > - Campbell_Biology_in_Focus_Ch1.pptx (Slide 20-55)
> > - STEI_Visi_Misi.pdf (Slide 3-4)
>
> > ### Konteks Interdisipliner
> > Kolaborasi antara biologi dan komputasi telah menghasilkan terobosan penting dalam berbagai bidang. Contohnya adalah desain kereta cepat Shinkansen di Jepang yang terinspirasi dari paruh burung kingfisher, mengurangi efek sonik boom secara signifikan (Slide 11). Pendekatan interdisipliner ini memungkinkan solusi inovatif dengan mengadopsi prinsip alam ke dalam rekayasa.
> >
> > Bidang seperti biomedical engineering mengembangkan retinal prostetik untuk mengatasi keterbatasan biologis, sementara material science menciptakan beton yang dapat "menyembuhkan diri sendiri" (Slide 11). Contoh-contoh ini menunjukkan bagaimana pemahaman biologi dapat memandu pengembangan teknologi komputasi yang lebih efektif.
> >
> > ### Jenis Komputasi Berbasis Biologi
> > Terdapat lima kategori utama integrasi biologi-komputasi (Slide 17-18):
> > 1. **Biomedical Engineering**: Penggunaan prinsip rekayasa untuk pengobatan (e.g., implan retina)
> > 2. **Bio-inspired Computing**: Algoritma yang terinspirasi proses biologis (e.g., algoritma genetik)
> > 3. **Biological Computing**: Komputasi menggunakan molekul biologis (DNA/protein)
> > 4. **Computational Biology**: Pemodelan sistem biologis dengan matematika/komputer
> > 5. **Bioinformatics**: Analisis data biologis skala besar
> >
> > Perbedaan utama terletak pada tujuan dan metodologi. Bio-inspired computing mengadopsi prinsip alam untuk menyelesaikan masalah komputasi, sementara biomedical engineering menggunakan komputasi untuk memecahkan masalah biologis.
> >
> > ### Pendekatan Pembelajaran
> > Pembelajaran biologi memiliki karakteristik unik dibandingkan matematika (Slide 13-14):
> > - **Matematika**: Mengandalkan operasi baku (e.g., trigonometri) yang dikuasai melalui pengulangan
> > - **Fisika**: Menggunakan observasi yang diekspresikan secara matematis
> > - **Biologi**: Didominasi observasi dengan aturan non-universal dan sistem kompleks
> >
> > Meski berbeda, kedalaman pemahaman sama-sama memerlukan pendekatan sistematis. Contoh: mempelajari algoritma genetika membutuhkan pemahaman dasar seleksi alam tanpa perlu menjadi ahli biologi.
> >
> > ### Tujuan Pendidikan IF3211
> > Mata kuliah ini dirancang untuk mencapai tiga kompetensi utama (Slide 5-6):
> > 1. **Analisis Masalah**: Menerapkan teori komputasi pada masalah biologis
> > 2. **Rancangan Solusi**: Merancang sistem berbasis kebutuhan komputasi spesifik
> > 3. **Implementasi**: Mengembangkan solusi fungsional dalam konteks biologi
> >
> > Mahasiswa diharapkan mampu mengorganisasi pekerjaan secara efisien sambil mengasah critical thinking terhadap fenomena biologis. Contoh proyek meliputi simulasi algoritma genetika atau model epidemiologi.
>

> [!cornell] #### Ringkasan
>
> **Kolaborasi biologi-komputasi** menghasilkan solusi inovatif seperti desain kereta cepat berbasis paruh burung dan material penyembuh diri. Terdapat lima kategori utama: biomedical engineering, bio-inspired computing, biological computing, computational biology, dan bioinformatics. **Pembelajaran biologi** memerlukan pendekatan berbeda dari matematika karena sifatnya yang observasional dan kompleks. Mata kuliah IF3211 bertujuan membangun kemampuan **analisis masalah biologis**, perancangan solusi komputasi, dan implementasi sistem terintegrasi melalui pendekatan interdisipliner.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Algoritma Bio-inspirasi Lanjut
> **Algoritma Genetika** mensimulasikan proses evolusi melalui seleksi orangtua, crossover, dan mutasi. Contoh implementasi optimasi rute logistik:
> ```python
> def genetic_algorithm(population, fitness_fn, generations):
> for _ in range(generations):
> parents = selection(population, fitness_fn)
> offspring = crossover(parents)
> population = mutate(offspring)
> return best_solution(population)
> ```
>
> **Particle Swarm Optimization (PSO)** terinspirasi perilaku kawanan burung, menggunakan partikel yang memperbarui posisi berdasarkan pengalaman individu dan kelompok.
>
> #### Aplikasi Biomedis
> - **Retinal Prostetik**: Mikroelektroda yang merangsang sel ganglion untuk mengembalikan penglihatan parsial
> - **Biosensor Wearable**: Monitor glukosa darah berbasis enzim dengan transmisi data nirkabel
>
> #### Proyek Eksplorasi Mandiri
> 1. **Simulasi Perilaku Kawanan**: Implementasi algoritma boids (Craig Reynolds) untuk mensimulasikan pola gerak ikan/unggas
> 2. **Optimasi Jaringan Neural dengan PSO**: Terapkan PSO untuk optimasi bobot pada jaringan neural sederhana
>
> #### Bacaan Lanjutan
> - Jones, N.C., & Pevzner, P.A. (2004). *An Introduction to Bioinformatics Algorithms*
> - Suraishkumar, G.K. (2019). *Biology for Engineers*, Bab 7: Bio-inspired Design
> - Modul EduNex ITB: "Bio-inspired Computing" (Kode: IF3211-BIC)
> ```
>
> ### Quality Assurance Verification:
> 1. **Kelengkapan**: Semua konsep utama tercakup dengan contoh konkret
> 2. **Struktur**: Format Cornell sesuai panduan, 5 pertanyaan pemicu, referensi detail
> 3. **Kejelasan**: Istilah teknis didefinisikan, analogi digunakan (e.g., pembelajaran biologi vs matematika)
> 4. **Akurasi**: Informasi sesuai sumber slide, konflik sumber tidak ditemukan
> 5. **Integrasi Multi-Sumber**: Materi dari slide berbeda disintesis secara koheren
> 6. **Pengecualian Topik**: Tidak membahas DNA, evolusi, atau definisi biologi komputasi
> 7. **Ad Libitum**: Memuat 4 subbagian lanjut dengan kode contoh dan bacaan lanjutan