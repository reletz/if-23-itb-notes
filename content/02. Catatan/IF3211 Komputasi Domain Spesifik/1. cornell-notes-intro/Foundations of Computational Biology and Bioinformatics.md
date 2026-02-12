---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Foundations of Computational Biology and Bioinformatics
>
> > ## Questions/Cues
> >
> > - Apa perbedaan biologi komputasi dan bioinformatika?
> > - Mengapa biologi komputasi penting bagi ilmu komputer?
> > - Bagaimana karakteristik pembelajaran biologi vs matematika?
> > - Aplikasi praktis biologi komputasi di kehidupan nyata?
> > - Komponen penilaian utama dalam mata kuliah IF3211?
> >
> > ## Reference Points
> >
> > - Lecture_Slides.pptx (Halaman 15-19, 21-51)
> > - Course_Syllabus.pdf (Halaman 6-9)
> > - Textbook_Biology_for_Engineers.pdf (Halaman 1-5)
> >
>
> > ### Definisi Biologi Komputasi dan Bioinformatika
> > **Biologi Komputasi** merupakan bidang interdisipliner yang menggunakan teknik ilmu komputer, analisis data, pemodelan matematis, dan simulasi komputasi untuk memahami sistem biologis. Bidang ini memiliki fondasi dalam matematika terapan, biologi molekuler, dan genetika. Menurut National Institutes of Health (NIH), biologi komputasi mencakup analisis hubungan biologis melalui pendekatan komputasional.
> > **Bioinformatika** secara khusus berfokus pada analisis data biologis seperti sekuens DNA, struktur protein, dan big data biologis menggunakan teknik komputasi. Dalam konteks mata kuliah ini, bioinformatika dan biologi komputasi dipandang memiliki kesamaan inti dalam penerapan teknik komputasi untuk masalah biologis. Perbedaan utamanya terletak pada fokus analitik bioinformatika terhadap data molekuler spesifik.
> > ### Hubungan antara Biologi dan Ilmu Komputer
> > Terdapat lima bidang utama interaksi antara biologi dan komputasi:
> > 1. **Biomedical Engineering**: Penerapan teknik rekayasa untuk pengobatan penyakit
> > 2. **Bioinformatika**: Analisis data biologis molekuler menggunakan teknologi komputasi
> > 3. **Biologi Komputasi**: Pemahaman sistem biologis melalui matematika dan statistik
> > 4. **Bio-inspired Computing**: Penyelesaian masalah komputasi menggunakan model biologis
> > 5. **Biological Computing**: Penggunaan molekul biologis (DNA/protein) untuk komputasi
> > Contoh aplikasi praktis termasuk pengembangan biosensor, biochip, dan teknologi bioremediasi. Meskipun terdapat referensi ke algoritma bio-inspirasi dalam materi sumber, penjelasan detail tentang topik tersebut telah dikecualikan sesuai panduan.
> > ### Metode Pembelajaran Biologi vs Matematika
> > Pembelajaran biologi memiliki karakteristik unik dibandingkan matematika:
> > - **Matematika**: Mengandalkan aplikasi berulang konsep melalui latihan (misal: operasi trigonometri)
> > - **Fisika**: Menggunakan observasi yang kemudian diekspresikan secara matematis
> > - **Biologi**: Didominasi observasi empiris dengan sistem kompleks dan representasi matematika yang masih berkembang
> > 
> > Meskipun berbeda pendekatan, pembelajaran biologi tidak lebih sulit daripada matematika. Kunci pemahaman terletak pada penguasaan metode observasi dan interpretasi data biologis. Contoh: mempelajari struktur protein memerlukan pemahaman visual 3D dan analisis kimiawi sekaligus.

> [!cornell] #### Summary
>
> **Biologi komputasi dan bioinformatika** merupakan bidang interdisipliner yang mengintegrasikan teknik komputasi dengan studi sistem biologis, dengan aplikasi mulai dari analisis DNA hingga pengembangan biomaterial. Pemahaman biologi memerlukan pendekatan observasional yang berbeda dari matematika namun sama pentingnya dalam konteks komputasi. Mata kuliah IF3211 menekankan kemampuan merancang solusi komputasi untuk masalah biologis melalui evaluasi berlapis yang mencakup ujian, proyek, dan partisipasi aktif. **Integritas akademik** menjadi komponen kritis yang dijaga ketat melalui sanksi tegas untuk pelanggaran.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Algoritma Bioinformatika
> Algoritma penyusunan sekuens DNA seperti algoritma Needleman-Wunsch memiliki kompleksitas waktu O(nm) untuk sekuens panjang n dan m. Pendekatan heuristik BLAST mengurangi kompleksitas menjadi O(kn) melalui pencarian kemiripan lokal dengan parameter k. Optimasi lebih lanjut menggunakan struktur data FM-index mencapai kompleksitas O(n) untuk pencarian pola dalam genom besar.
>
> #### Representasi Matematis Sistem Biologi
> Model Lotka-Volterra untuk dinamika predator-mangsa:
> ```
> dx/dt = αx - βxy
> dy/dt = δxy - γy
> ```
> di mana x = populasi mangsa, y = populasi predator. Simulasi sistem persamaan diferensial ini memerlukan metode numerik seperti Runge-Kutta dengan kompleksitas komputasi O(n^3) untuk sistem non-linear.
>
> #### Teknik Visualisasi Data Biologis
> - **Cytoscape**: Visualisasi jaringan interaksi protein
> - **PyMOL**: Analisis struktur 3D makromolekul
> - **Genome Browser**: Visualisasi anotasi genom skala besar
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis sekuens COVID-19: Gunakan BLAST untuk mengidentifikasi mutasi spike protein pada varian berbeda
> 2. Simulasi epidemi: Implementasikan model SIR (Susceptible-Infected-Recovered) dengan Python
> 3. Algoritma alignment: Bandingkan performa Needleman-Wunsch vs Smith-Waterman pada dataset genomik
>
> #### Sumber Belajar Lanjutan
> - **Buku**: "Computational Biology: A Practical Introduction to BioData Processing and Analysis" (R. Matthiesen)
> - **Jurnal**: PLoS Computational Biology (https://journals.plos.org/ploscompbiol/)
> - **Toolkit**: Biopython (https://biopython.org) untuk analisis sekuens biologis
> - **Dataset Publik**: NCBI GenBank (https://www.ncbi.nlm.nih.gov/genbank/)