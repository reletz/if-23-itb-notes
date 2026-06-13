---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Historical Ideas - Fossils, Cuvier, and Lamarck
>
> > ## Questions/Cues
> >
> > - Apa peran **fosil** dan **strata sedimen** dalam membangun gagasan perubahan makhluk hidup?
> > - Mengapa **Cuvier** menerima kepunahan tetapi menolak evolusi?
> > - Bagaimana **gradualisme** Hutton dan Lyell mengubah persepsi tentang umur Bumi?
> > - Apa inti hipotesis **Lamarck**, dan mengapa hipotesis itu ditolak?
> > - Bagaimana ide-ide pra-Darwin ini bisa dipandang sebagai "model hipotesis" yang dievaluasi terhadap data?
> >
> > ## Reference Points
> >
> > - IF3211 — Evolution (PPT 9, bagian *Ideas About Change over Time*)
> > - IF3211 — Evolution (PPT 9, bagian *Lamarck's Hypothesis of Evolution*)
>
> > ### Fosil dan Rekaman Lapisan Sedimen
> >
> > Sebelum Darwin, para naturalis sudah mengumpulkan bukti bahwa kehidupan di masa lalu berbeda dengan masa kini. Bukti utamanya adalah **fosil** — sisa atau jejak organisme dari masa lampau yang umumnya ditemukan dalam **batuan sedimen (sedimentary rock)** yang tersusun berlapis-lapis sebagai **strata**. Tiap lapisan terbentuk dari endapan partikel yang mengeras selama ribuan hingga jutaan tahun, sehingga **lapisan yang lebih dalam = lebih tua**.
> >
> > Susunan strata ini memberi sumbu waktu alami. Dengan membandingkan fosil antar-lapisan, ilmuwan menyadari bahwa bentuk kehidupan **berubah secara sistematis** mengikuti kedalaman/usia lapisan. Lapisan tua memuat organisme yang sangat berbeda dari yang hidup sekarang, sementara lapisan muda makin mirip bentuk modern. Inilah fondasi empiris yang kelak menopang gagasan **descent with modification**.
> >
> > ### Cuvier, Paleontologi, dan Katastrofisme
> >
> > **Paleontologi** — ilmu yang mempelajari fosil — sebagian besar dikembangkan oleh ilmuwan Prancis **Georges Cuvier (1769–1832)**. Cuvier mengamati bahwa fosil pada strata yang lebih tua **makin tidak mirip** dengan bentuk modern, dan bahwa pergantian fauna antar-lapisan kerap terjadi secara mendadak.
> >
> > Untuk menjelaskannya, Cuvier menganut **katastrofisme**: ia percaya **kepunahan (extinction) adalah hal yang umum** dan disebabkan oleh bencana lokal (banjir, gempa) yang memusnahkan spesies, lalu wilayah itu dihuni kembali oleh spesies dari daerah lain. Yang menarik secara historis, **Cuvier menolak gagasan evolusi** — ia menerima bahwa spesies bisa punah, tetapi tidak percaya spesies satu berubah perlahan menjadi spesies lain.
> >
> > ### Gradualisme Hutton dan Lyell
> >
> > Berlawanan dengan katastrofisme, para geolog **James Hutton** dan kemudian **Charles Lyell** mengajukan **gradualisme** (dan *uniformitarianism*): bentang alam Bumi dibentuk oleh **proses lambat dan bertahap** — erosi, pengendapan, pengangkatan kerak — yang **masih berlangsung hingga kini** dengan laju yang relatif konsisten. Karya Lyell *Principles of Geology* menyimpulkan bahwa proses sehalus ini membutuhkan waktu sangat panjang, sehingga **Bumi jauh lebih tua** daripada beberapa ribu tahun yang diyakini secara tradisional. Skala waktu yang luas inilah "ruang" yang dibutuhkan agar perubahan biologis kecil dapat terakumulasi menjadi perbedaan besar.
> >
> > ### Hipotesis Lamarck yang Ditolak
> >
> > **Jean-Baptiste de Lamarck (1744–1829)** adalah orang pertama yang mengusulkan sebuah **mekanisme** bagaimana kehidupan berubah seiring waktu — bukan sekadar mengamati bahwa ia berubah. Hipotesisnya bertumpu pada dua gagasan: (1) **penggunaan dan tidak-penggunaan (use and disuse)** bagian tubuh, dan (2) **pewarisan sifat yang diperoleh (inheritance of acquired characteristics)**. Contoh klasik: jerapah meregang lehernya untuk meraih daun tinggi, lehernya memanjang semasa hidup, lalu **leher panjang itu diwariskan** ke keturunannya.
> >
> > Mekanisme Lamarck **tidak didukung bukti eksperimental**: perubahan yang diperoleh semasa hidup (mis. otot besar karena latihan) tidak tertulis ke materi genetik dan tidak diwariskan. Meski salah dalam mekanisme, Lamarck penting karena ia menormalkan pertanyaan ilmiah "*lewat proses apa* makhluk hidup berubah?" — pertanyaan yang akhirnya dijawab Darwin dengan seleksi alam.
> >
> > ### Sudut Pandang Komputasi: Hipotesis sebagai Model yang Dievaluasi terhadap Data
> >
> > Bagi mahasiswa informatika, kontras Cuvier–Lyell–Lamarck adalah ilustrasi **model selection**: tiap tokoh mengajukan **hipotesis/model** untuk menjelaskan **dataset yang sama** (pola fosil dalam strata). Katastrofisme dan gradualisme adalah dua **model generatif** berbeda tentang bagaimana data terbentuk; data fosil berfungsi sebagai **evidence** yang membuat satu model lebih *likely* dari yang lain.
> >
> > Lamarck dapat dilihat sebagai **update rule yang salah**: ia mengusulkan bahwa state sebuah individu yang berubah *dalam satu "iterasi" hidup* langsung tersalin ke state awal generasi berikutnya — semacam **Lamarckian learning** di mana hasil belajar individu di-*write-back* ke genome. Dalam optimasi evolusioner, "Lamarckian vs Baldwinian" adalah debat nyata: apakah perbaikan lokal pada individu di-commit kembali ke genotipe (Lamarckian) atau hanya mempengaruhi fitness (Baldwinian). Biologi menolak versi Lamarckian; Darwin menyediakan **update rule yang benar**: variasi muncul acak, lalu **fitness** yang menyaring frekuensinya antar generasi.

> [!cornell] #### Summary
>
> Sebelum Darwin, **fosil** dalam **strata sedimen** sudah menunjukkan bahwa kehidupan berubah sepanjang waktu geologis. **Cuvier** mengembangkan **paleontologi** dan mengamati pergantian fauna antar-lapisan, namun menjelaskannya lewat **katastrofisme** sambil **menolak evolusi**. **Hutton** dan **Lyell** mengusung **gradualisme** yang menyimpulkan **Bumi sangat tua**, menyediakan skala waktu bagi perubahan bertahap. **Lamarck** adalah yang pertama mengusulkan **mekanisme** — *use and disuse* serta **pewarisan sifat yang diperoleh** — tetapi mekanisme ini **ditolak** karena tak didukung bukti. Secara komputasional, ide-ide ini adalah **model hipotesis** yang bersaing dievaluasi terhadap **data fosil**, mengantar ke mekanisme yang benar pada [[Natural Selection and Descent with Modification]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa Pewarisan Lamarckian Gagal
>
> Eksperimen August Weismann (memotong ekor tikus selama banyak generasi tanpa memperpendek ekor keturunan) menjadi bukti klasik penolakan Lamarck. Inti masalahnya adalah **Weismann barrier**: informasi mengalir dari **germline (sel kelamin)** ke **soma (sel tubuh)**, bukan sebaliknya. Perubahan pada soma semasa hidup tidak menulis ulang DNA germline. (Catatan modern: **epigenetik** menunjukkan beberapa tanda dapat diwariskan terbatas, tetapi ini bukan mekanisme Lamarckian generik dan tak menggantikan seleksi alam.)
>
> #### CS Angle: Lamarckian vs Baldwinian dalam Genetic Algorithm
>
> Dalam **memetic algorithm**, tiap individu sering menjalani *local search* (perbaikan lokal). Jika hasil perbaikan **ditulis kembali** ke kromosom, itu **Lamarckian**; jika hanya skor fitness yang diperbarui sedang kromosom tetap, itu **Baldwinian**. Lamarckian biasanya mempercepat konvergensi tapi rawan **premature convergence** ke local optimum; Baldwinian lebih lambat tapi menjaga **diversitas**. Ironisnya, di dunia komputasi Lamarckian sah-sah saja dipakai — yang "salah" hanyalah klaim biologisnya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan satu GA sederhana dua versi (Lamarckian vs Baldwinian) pada fungsi uji (mis. Rastrigin), lalu bandingkan kurva konvergensi dan diversitas populasinya.
> 2. Buat visualisasi "kolom strata" sintetis: hasilkan dataset organisme acak yang berubah perlahan, susun berlapis, lalu uji apakah algoritma dapat mengurutkan lapisan berdasarkan kemiripan ke bentuk "modern".
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 19 — *Descent with Modification*.
> - Lyell, C. *Principles of Geology* (1830–1833).
> - Whitley, D. et al. "Lamarckian Evolution, The Baldwin Effect and Function Optimization."
