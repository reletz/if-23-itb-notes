---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Perangkat Lunak]]

> [!cornell] SDLC Fundamentals and Process Flows
>
> > ## Questions/Cues
> >
> > - Mengapa SDLC penting dalam pengembangan PL?
> > - Perbedaan alur linear vs iteratif vs paralel?
> > - Aktivitas inti dalam setiap fase SDLC?
> > - Manfaat utama penerapan SDLC?
> > - Bagaimana model evolusioner bekerja?
> >
> > ## Reference Points
> >
> > - IF3210_Proses_Pengembangan (Halaman 2-7, 9-15)
> > - IF3210_Proses_Pengembangan (Diagram halaman 4-5)
>
> > ### Definisi dan Tujuan SDLC
> >
> > Siklus Hidup Pengembangan Perangkat Lunak (Software Development Life Cycle/SDLC) merupakan kerangka terstruktur yang terdiri dari serangkaian fase untuk mengembangkan perangkat lunak secara sistematis. SDLC mencakup seluruh proses mulai dari identifikasi kebutuhan, desain, implementasi, pengujian, hingga pemeliharaan. Tujuan utamanya adalah memastikan produk akhir memenuhi spesifikasi yang ditentukan, memiliki kualitas tinggi, dan diselesaikan sesuai anggaran serta jadwal yang telah ditetapkan.
> > SDLC berfungsi sebagai panduan bagi tim pengembang untuk mengorganisir aktivitas kompleks dalam proyek perangkat lunak. Dengan mengikuti alur yang terdefinisi dengan baik, tim dapat meminimalisir risiko kesalahan, mengelola sumber daya secara efisien, dan memastikan semua stakeholder memiliki pemahaman yang sama tentang kemajuan proyek. Contoh penerapannya adalah dalam pengembangan sistem perbankan digital dimana SDLC membantu memastikan keamanan dan keandalan sistem sebelum diluncurkan ke publik.
> >
> > ### Jenis-Jenis Alur Proses SDLC
> >
> > Terdapat empat pola alur proses utama dalam SDLC:
> >
> > 1. **Alur Linear**: Aktivitas dilaksanakan secara sekuensial dimana setiap fase harus diselesaikan sepenuhnya sebelum berpindah ke fase berikutnya. Contoh: pembangunan gedung dimana fondasi harus selesai sebelum mulai membangun dinding.
> > 2. **Alur Iteratif**: Proses pengulangan siklus pengembangan dalam versi-versi kecil yang terus disempurnakan. Setiap iterasi menghasilkan produk yang dapat diuji, seperti mengembangkan aplikasi dengan fitur dasar terlebih dahulu lalu menambahkan fitur premium secara bertahap.
> > 3. **Alur Paralel**: Beberapa aktivitas dikerjakan secara bersamaan oleh tim berbeda. Contoh: tim backend mengembangkan API sementara tim frontend membuat antarmuka pengguna secara paralel.
> > 4. **Alur Berevolusi**: Pengembangan melalui versi bertahap yang semakin lengkap, mirip dengan cara organisme berevolusi. Setiap rilis versi (ke-n) mengandung penyempurnaan berdasarkan umpan balik sebelumnya.
> >
> > ### Aktivitas Inti dalam SDLC
> >
> > SDLC terdiri dari lima aktivitas fundamental yang saling terkait:
> >
> > 1. **Komunikasi**: Mengidentifikasi kebutuhan stakeholder melalui wawancara, survei, atau studi lapangan. Contoh: mewawancarai calon pengguna aplikasi e-commerce tentang fitur yang diinginkan.
> > 2. **Perencanaan**: Membuat estimasi biaya, jadwal, dan alokasi sumber daya. Termasuk penyusunan dokumen rencana proyek yang mendetail.
> > 3. **Pemodelan**: Membuat representasi sistem melalui diagram alur, mockup antarmuka, atau prototipe. Pemodelan membantu memvisualisasikan konsep sebelum implementasi.
> > 4. **Konstruksi**: Tahap implementasi nyata berupa penulisan kode, integrasi komponen, dan pengujian unit. Pada fase ini desain diubah menjadi produk fungsional.
> > 5. **Deployment**: Peluncuran produk ke lingkungan produksi dan pemantauan kinerja awal. Termasuk pelatihan pengguna dan penyiapan dokumentasi teknis.
> >
> > ### Manfaat Penerapan SDLC
> >
> > Penerapan SDLC yang baik memberikan enam keuntungan strategis:
> >
> > 1. **Kualitas Terjaga**: Standarisasi proses mengurangi variasi hasil dan memastikan konsistensi mutu. Contoh: checklist pengujian wajib sebelum setiap rilis.
> > 2. **Efisiensi Sumber Daya**: Perencanaan matang mengurangi pemborosan waktu dan biaya. Studi menunjukkan proyek dengan SDLC yang baik memiliki 35% lebih sedikit pembengkakan anggaran.
> > 3. **Kemudahan Pemeliharaan**: Dokumentasi lengkap memudahkan modifikasi sistem di kemudian hari. Sistem perbankan biasanya memerlukan pembaruan reguler untuk patuh regulasi baru.
> > 4. **Kolaborasi Optimal**: Pembagian peran jelas meningkatkan sinergi tim multidisiplin. Developer, QA, dan business analyst dapat bekerja lebih terkoordinasi.
> > 5. **Manajemen Risiko**: Identifikasi masalah lebih dini melalui fase-fase terstruktur. Pengujian keamanan pada fase modeling dapat mencegah kebocoran data di fase produksi.
> > 6. **Adaptabilitas**: Kerangka kerja fleksibel memungkinkan penyesuaian terhadap perubahan kebutuhan bisnis tanpa mengganggu alur utama.

> [!cornell] #### Summary
>  **SDLC** merupakan kerangka kerja sistematis yang mengatur proses pengembangan perangkat lunak melalui fase-fase terstruktur mulai dari **pengumpulan kebutuhan** hingga **pemeliharaan**. Empat pola alur utama - **linear, iteratif, paralel, dan evolusioner** - menawarkan pendekatan berbeda dalam mengorganisir aktivitas pengembangan. Penerapan SDLC yang tepat memberikan manfaat krusial seperti **peningkatan kualitas produk**, **efisiensi sumber daya**, dan **kemudahan adaptasi terhadap perubahan**. Pemilihan alur proses yang sesuai dengan karakteristik proyek menjadi faktor penentu keberhasilan implementasi SDLC.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Alur Proses
> Perbandingan mendetail antara berbagai alur proses menunjukkan bahwa **alur linear** cocok untuk proyek dengan kebutuhan stabil dan batasan jelas, seperti sistem payroll. **Alur iteratif** lebih sesuai untuk proyek dengan tingkat ketidakpastian tinggi seperti pengembangan aplikasi startup. **Alur paralel** memerlukan koordinasi tim yang matang namun dapat memangkas 20-30% waktu pengembangan. **Model evolusioner** paling efektif untuk produk inovatif yang memerlukan umpan balik pengguna berkelanjutan.
>
> #### Studi Kasus: Implementasi SDLC di Industri
> Pada proyek sistem informasi rumah sakit, kombinasi **alur paralel dan iteratif** terbukti efektif. Tim backend mengembangkan modul rekam medis secara paralel dengan tim frontend yang membangun antarmuka pengguna. Setiap dua minggu dilakukan integrasi dan pengujian iteratif, menghasilkan peningkatan produktivitas sebesar 40% dibanding pendekatan linear tradisional.
>
> #### Alat Bantu Manajemen SDLC
> 1. **Microsoft Project**: Untuk perencanaan dan penjadwalan proyek skala besar
> 2. **Lucidchart**: Pemodelan diagram alur proses dan arsitektur sistem
> 3. **JIRA**: Pelacakan kemajuan tugas dalam alur iteratif
> 4. **GanttPRO**: Visualisasi timeline untuk alur linear/paralel
>
> #### Self-Exploration Projects
> 1. Analisis perbandingan durasi proyek menggunakan berbagai alur proses dengan simulasi kasus studi
> 2. Desain diagram alur SDLC hybrid untuk proyek pengembangan game edukasi
> 3. Studi implementasi SDLC pada proyek open-source di platform GitHub
>
> #### Further Reading
> - Pressman, R.S. (2010). *Software Engineering: A Practitioner's Approach* (Bab 3-4)
> - Sommerville, I. (2016). *Software Engineering* (Edisi 10, Bab 2-5)
> - Whitmire, S.A. (1997). *Object-Oriented Design Measurement*
> - IEEE Standard for Software Life Cycle Processes (ISO/IEC/IEEE 12207:2017)