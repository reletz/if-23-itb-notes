---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Proses Pengembangan Perangkat Lunak untuk Aplikasi Mobile]]

> [!cornell] Agile Methodology Principles and Frameworks
>
> > ## Questions/Cues
> >
> > - Mengapa Agile mengutamakan interaksi individu daripada proses?
> > - Bagaimana Agile menangani perubahan kebutuhan secara efektif?
> > - Perbedaan utama Scrum dan Extreme Programming?
> > - Keuntungan pengembangan perangkat lunak bekerja dibanding dokumentasi?
> > - Tantangan penerapan Agile dalam proyek skala besar?
> >
> > ## Reference Points
> >
> > - IF3210 Slides (Halaman 9-14, 23-27)
>
> > ### Prinsip Dasar Agile Manifesto
> >
> > Agile Manifesto menetapkan empat nilai inti yang membedakannya dari metode tradisional. **Interaksi individu lebih diutamakan daripada proses dan alat**, karena komunikasi langsung dianggap lebih efektif dalam menyelesaikan masalah kompleks. Contoh nyata dalam pengembangan game menunjukkan bagaimana animator, desainer, dan programmer perlu berkolaborasi secara intensif tanpa hierarki kaku.
> > Prinsip kedua menekankan **perangkat lunak bekerja lebih penting daripada dokumentasi lengkap**. Ini bukan berarti dokumentasi diabaikan sama sekali, tetapi fokus utama adalah menghasilkan produk fungsional yang dapat diuji pengguna. Misalnya, tim kecil sering mengandalkan komunikasi informal untuk mempercepat pengembangan daripada membuat dokumen spesifikasi rinci.
> > Kolaborasi pelanggan ditempatkan di atas negosiasi kontrak, memungkinkan adaptasi cepat terhadap perubahan kebutuhan. Responden terhadap perubahan lebih dihargai daripada mengikuti rencana yang telah ditetapkan, membuat Agile cocok untuk proyek dengan ketidakpastian tinggi.
> >
> > ### Implementasi Iteratif dan Evolusioner
> >
> > Agile menggunakan pendekatan iteratif di mana kebutuhan pengguna dikumpulkan secara bertahap melalui siklus pengembangan pendek (biasanya 2-4 minggu). Setiap iterasi menghasilkan fungsionalitas lengkap yang siap diuji, berbeda dengan metode waterfall yang menunggu hingga akhir proyek.
> > Prioritas fitur ditentukan berdasarkan nilai bisnis dan kompleksitas teknis. Contoh praktis: tim memprioritaskan fitur login sebelum pengembangan sistem rekomendasi karena merupakan fungsi dasar yang diperlukan untuk pengujian alur pengguna utama. Setiap fitur harus melalui tahap coding dan pengujian unit secara lengkap sebelum beralih ke fitur berikutnya.
> > Model evolusioner memungkinkan produk berkembang melalui umpan balik berkelanjutan. Pada setiap akhir iterasi, pengguna dapat memberikan masukan yang langsung dimasukkan dalam perencanaan siklus berikutnya, menciptakan proses adaptif yang responsif terhadap perubahan pasar.
> >
> > ### Variasi Kerangka Kerja Agile
> >
> > **Scrum** menggunakan siklus kerja disebut Sprint (biasanya 2 minggu) dengan ritual tetap seperti Daily Stand-up dan Sprint Review. Peran kunci meliputi Product Owner yang menentukan prioritas dan Scrum Master yang memfasilitasi proses.
> > **Extreme Programming (XP)** menekankan praktik teknis seperti Pair Programming dan Test-Driven Development. Berbeda dengan Scrum yang fokus pada manajemen proyek, XP lebih menekankan pada kualitas kode dan pengembangan berkelanjutan.
> > **Feature-Driven Development (FDD)** berfokus pada penyelesaian fitur konkret dalam waktu singkat. Setiap fitur dikembangkan melalui lima tahap: develop model overall, build feature list, plan by feature, design by feature, dan build by feature.
> > **Agile Unified Process (AUP)** menyederhanakan RUP (Rational Unified Process) dengan mempertahankan iterasi tetapi mengurangi dokumentasi. Cocok untuk tim yang membutuhkan struktur lebih jelas tanpa kompleksitas penuh RUP.
> >
> > ### Adaptasi untuk Pengembangan Mobile
> >
> > Kerangka kerja Agile dimodifikasi untuk mengatasi tantangan spesifik pengembangan aplikasi mobile. **Kanban** digunakan untuk pengembangan berkelanjutan dengan visualisasi alur kerja menggunakan board kolom (To Do, In Progress, Done).
> > **Sprint Planning** pada mobile development memperhitungkan faktor seperti kompatibilitas OS dan fragmentasi perangkat. User Story diformulasikan dengan mempertimbangkan keterbatasan layar sentuh dan interaksi mobile.
> > **Kolaborasi lintas fungsi** menjadi kritis dengan melibatkan desainer UI/UX, developer native, dan QA specialist dalam sesi perencanaan bersama. Tantangan teknis seperti optimasi baterai dan kinerja di perangkat rendah menjadi pertimbangan utama dalam prioritasasi backlog.

> [!cornell] #### Summary
>  **Metodologi Agile** menekankan fleksibilitas dan adaptasi melalui empat nilai inti: interaksi individu, perangkat lunak bekerja, kolaborasi pelanggan, dan respons terhadap perubahan. Pendekatan iteratif memungkinkan pengembangan evolusioner dengan **prioritas fitur berdasarkan nilai bisnis**, berbeda dengan metode tradisional yang kaku. Kerangka kerja seperti **Scrum, XP, dan FDD** menawarkan implementasi berbeda dengan fokus unik masing-masing. Dalam konteks mobile, Agile diadaptasi melalui **siklus pengembangan pendek** dan **kolaborasi intensif lintas disiplin** untuk mengatasi tantangan spesifik platform. **Keberhasilan Agile bergantung pada komunikasi tim efektif** dan kemampuan beradaptasi dengan umpan balik pengguna.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Agile pada Proyek Besar
> Penerapan Agile dalam proyek berskala enterprise menghadapi tantangan koordinasi antar tim. SOLusi Scaling Agile Framework (SAFe) mengadopsi hierarki Agile Team > Program > Portfolio dengan sinkronisasi melalui PI Planning (Program Increment). Studi kasus menunjukkan reduksi waktu go-live hingga 30% tetapi membutuhkan perubahan budaya organisasi signifikan.
>
> #### Studi Kasus Extreme Programming
> Penerapan XP di sistem perbankan menunjukkan peningkatan 40% defect detection rate melalui praktik Test-Driven Development. Namun, Pair Programming meningkatkan biaya sumber daya manusia hingga 25%, memunculkan pertanyaan cost-effectiveness dalam proyek bertim besar.
>
> #### Metrik Keberhasilan Agile
> - Velocity: Kapasitas tim menyelesaikan story points per sprint
> - Lead Time: Durasi dari ide hingga deploy
> - Escape Defect Rate: Persentase bug terlewat ke produksi
> - Cycle Time: Waktu pengerjaan task individual
>
> #### Self-Exploration Projects
> 1. Implementasikan Kanban board sederhana menggunakan Trello untuk proyek personal, lacak cycle time tiap task
> 2. Bandingkan velocity tim menggunakan Story Points vs Hour Estimation dalam proyek open-source
> 3. Analisis praktik Continuous Integration pada repository GitHub publik
>
> #### Tools dan Resources
> - JIRA Software untuk manajemen proyek Agile
> - Leankit untuk implementasi Kanban digital
> - VersionOne untuk skalasi Agile enterprise
> - Agile Alliance Library (https://www.agilealliance.org/resources/)
>
> #### Further Reading
> - "Agile Software Development with Scrum" oleh Ken Schwaber
> - "Extreme Programming Explained" oleh Kent Beck
> - "Scaling Agile @ Spotify" (White Paper)
> - SAFe Framework 5.0 Implementation Guide