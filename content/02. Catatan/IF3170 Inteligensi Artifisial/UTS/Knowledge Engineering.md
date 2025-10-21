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
> > - Apa itu Knowledge Engineering?
> >     
> > - Siapa itu Knowledge Engineer (KE)?
> >     
> > - Apa saja tugas utama seorang KE?
> >     
> > - Apa itu Knowledge Acquisition?
> >     
> > - Bagaimana alur prosesnya?
> >     
> > - Apa saja tahapan dalam siklus hidup pengembangan KBS?
> >     
> > 
> > ## Reference Points
> > 
> > - Materi Arsitektur & Akuisisi KBS
>   
> > 
> > ### Definisi Knowledge Engineering
> > 
> > **Knowledge Engineering** adalah keseluruhan proses merancang, membangun, menguji, dan memelihara sebuah **Knowledge-Based System (KBS)**. Ini adalah disiplin rekayasa yang berfokus pada bagaimana cara "mengambil" pengetahuan dari kepala seorang pakar dan "menanamkannya" ke dalam sistem komputer agar dapat digunakan untuk memecahkan masalah.
> > 
> > ### Peran Knowledge Engineer (KE)
> > 
> > Seorang **Knowledge Engineer (KE)** adalah spesialis yang bertindak sebagai **jembatan** antara pakar domain (misalnya, dokter, geolog) dan sistem KBS itu sendiri. Mereka bukanlah pakar di domain tersebut, melainkan pakar dalam proses akuisisi dan representasi pengetahuan.
> > 
> > **Analogi**: Jika seorang pakar adalah "narasumber" yang memiliki cerita dan pengetahuan mendalam, maka KE adalah seorang "penulis biografi" yang handal, yang bertugas mewawancarai, memahami, menstrukturkan, dan menuliskannya ke dalam format buku (sistem) yang bisa dibaca dan dipahami orang lain.
> > 
> > ### Tugas Utama Knowledge Engineer
> > 
> > Tugas utama seorang KE mencakup beberapa aktivitas inti dalam proses **Akuisisi Pengetahuan**:
> > 
> > 1. **Penggalian Pengetahuan (Elicitation)**: KE secara aktif berinteraksi dengan pakar untuk "menggali" pengetahuan mereka. Teknik yang digunakan bisa berupa wawancara mendalam, observasi saat pakar bekerja, atau analisis studi kasus.
> >     
> > 2. **Analisis & Interpretasi**: KE menganalisis pengetahuan yang terkumpul untuk mengidentifikasi konsep-konsep kunci, aturan-aturan tak terucapkan, relasi antar fakta, dan strategi pemecahan masalah yang digunakan oleh pakar.
> >     
> > 3. **Representasi Pengetahuan (Representation)**: KE memilih metode KR yang paling sesuai (misalnya, Rules, Frames, Semantic Nets) dan menerjemahkan pengetahuan yang sudah dianalisis ke dalam bahasa formal yang bisa dimengerti oleh `Inference Engine`.
> >     
> > 
> > ### Proses Akuisisi Pengetahuan (Knowledge Acquisition)
> > 
> > Ini adalah jantung dari _Knowledge Engineering_ dan mengikuti alur yang sistematis, terutama dalam pendekatan tidak langsung (_indirect approach_):
> > 
> > 1. **Pakar (Expert)** memiliki pengetahuan yang seringkali bersifat implisit dan heuristik (berdasarkan pengalaman).
> >     
> > 2. **Knowledge Engineer (KE)** melakukan proses **Elicitation** untuk mengekstrak pengetahuan tersebut.
> >     
> > 3. KE kemudian melakukan **Representation**, mengubah pengetahuan informal menjadi struktur formal.
> >     
> > 4. Pengetahuan yang sudah terstruktur ini dimasukkan ke dalam **Knowledge Base** untuk digunakan oleh sistem.
> >     
> > 
> > ### Siklus Hidup Pengembangan KBS
> > 
> > Pengembangan KBS biasanya mengikuti model iteratif atau prototipe, karena seringkali sulit untuk mendapatkan semua pengetahuan dengan benar pada percobaan pertama. Tahapannya meliputi:
> > 
> > 1. **Penilaian (Assessment)**: Menentukan apakah masalah yang dihadapi cocok untuk diselesaikan dengan KBS. Apakah ada pakar yang tersedia? Apakah manfaatnya sepadan dengan biayanya?
> >     
> > 2. **Akuisisi Pengetahuan**: Tahap inti di mana KE bekerja dengan pakar untuk membangun fondasi `Knowledge Base`.
> >     
> > 3. **Desain Sistem**: Merancang arsitektur sistem, memilih _tools_ (misalnya, _shell expert system_), dan menentukan bagaimana antarmuka pengguna akan bekerja.
> >     
> > 4. **Implementasi & Pengujian (Prototyping)**: Membangun versi awal (prototipe) dari sistem dan mengujinya dengan kasus-kasus nyata.
> >     
> > 5. **Evaluasi & Perbaikan (Refinement)**: Pakar mengevaluasi hasil dari prototipe, memberikan umpan balik, dan KE menggunakan masukan ini untuk memperbaiki dan menambah isi `Knowledge Base`. Siklus ini berulang beberapa kali.
> >     
> > 6. **Deployment & Pemeliharaan**: Merilis sistem untuk digunakan dan secara berkala memperbarui `Knowledge Base` seiring dengan munculnya pengetahuan baru.
> >     

> [!cornell] #### Summary
> 
> **Knowledge Engineering adalah disiplin rekayasa untuk membangun KBS, dengan Knowledge Engineer (KE) sebagai peran sentral yang menjembatani pakar dan sistem. Proses utamanya adalah Akuisisi Pengetahuan—yang mencakup penggalian, analisis, dan representasi—dan mengikuti siklus hidup pengembangan iteratif yang berfokus pada pembuatan prototipe dan penyempurnaan basis pengetahuan secara berkelanjutan.**