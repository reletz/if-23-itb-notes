---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Tipe Analisis dan Terminologi Pengukuran
>
> > ## Questions/Cues
> >
> > - Apa perbedaan mendasar antara static, dynamic, dan hybrid analysis?
> > - Bagaimana confusion matrix (TP/FP/TN/FN) memetakan benar-salah laporan sebuah tool?
> > - Mengapa FPR dan TPR menjadi dua sudut pandang yang saling bertolak belakang?
> > - Apa makna kurva ROC dan trade-off yang diwakilinya?
> > - Bagaimana Precision, Recall, F-score, dan Discrimination rate merangkum kinerja sebuah alat?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Types of analysis")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Basic measurement terminology")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "ROC curve & Measurement roll-ups")
>
> > ### Tiga Tipe Analisis: Static, Dynamic, dan Hybrid
> >
> > Dalam verifikasi keamanan perangkat lunak terdapat tiga pendekatan besar untuk menemukan cacat (defect) maupun kerentanan. **Static analysis** adalah pendekatan untuk memverifikasi perangkat lunak **tanpa mengeksekusinya** — cukup dengan melihat kode dalam keadaan non-dinamis (tidak berjalan). Contohnya adalah source code vulnerability scanning tools dan code inspection. Karena tidak menjalankan program, static analysis dapat memeriksa seluruh jalur kode termasuk cabang yang jarang dieksekusi, namun ia tidak tahu input nyata yang akan diterima program saat produksi.
> >
> > **Dynamic analysis** adalah pendekatan yang memverifikasi perangkat lunak **dengan mengeksekusinya** pada input spesifik lalu memeriksa hasilnya terhadap sebuah **"oracle"** (acuan benar-salah). Contohnya functional testing, web application scanner, dan **fuzz testing**. Pendekatan ini hanya melihat perilaku yang benar-benar terjadi pada input yang dicoba, sehingga laporannya cenderung lebih akurat tetapi cakupannya terbatas pada jalur yang sempat dieksekusi. **Hybrid analysis** menggabungkan kedua pendekatan di atas untuk memanfaatkan kelebihan masing-masing — konteks luas dari static dan presisi konkret dari dynamic.
> >
> > Static analysis tools yang paling berhasil adalah yang menganalisis **seluruh cakupan program** (whole-program) dalam relasinya dengan satu baris kode, bukan yang menganalisis satu baris secara independen dari sisa program. Inilah yang membedakan data flow analyzer canggih dari sekadar text scanner berbasis grep.
> >
> > ```mermaid
> > flowchart TD
> >     A["Analisis Perangkat Lunak"] --> S["Static: tanpa eksekusi<br/>(scanner, inspeksi kode)"]
> >     A --> D["Dynamic: dengan eksekusi<br/>(functional test, fuzzing)"]
> >     A --> H["Hybrid: gabungan keduanya"]
> >     H --> S
> >     H --> D
> > ```
> >
> > ### Terminologi Pengukuran Dasar: Confusion Matrix
> >
> > Untuk menilai kualitas laporan sebuah tool, kita membandingkan apa yang dilaporkan tool dengan kondisi sebenarnya. Hasilnya membentuk empat sel **confusion matrix**. **True Positive (TP)** terjadi ketika tool **benar melaporkan** sebuah defect yang memang ada. **False Positive (FP)** terjadi ketika tool melaporkan "defect" yang sebenarnya **bukan defect** — inilah yang disebut **Type I error**. **True Negative (TN)** terjadi ketika tool **benar tidak melaporkan** suatu defect yang memang tidak ada. **False Negative (FN)** terjadi ketika tool **gagal melaporkan** defect yang sebenarnya ada — disebut **Type II error**.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Lapor["Tool melaporkan defect"]
> >         TP["TP: benar ada defect<br/>(correct)"]
> >         FP["FP: tak ada defect<br/>(Type I error)"]
> >     end
> >     subgraph Tidak["Tool tidak melaporkan"]
> >         FN["FN: ada defect terlewat<br/>(Type II error)"]
> >         TN["TN: memang tak ada defect<br/>(correct)"]
> >     end
> > ```
> >
> > Dari empat sel ini lahir dua metrik utama. **False Positive Rate (FPR) = #FP / (#TP + #FP)**, yang dibaca sebagai "probabilitas sebuah alert ternyata palsu". **True Positive Rate (TPR) = #TP / (#TP + #FN)**, yang dibaca sebagai "persentase kerentanan yang berhasil ditemukan" dan juga disebut **sensitivity**. Dua pemangku kepentingan punya kekhawatiran berbeda: **developer** sering kuatir pada FPR yang besar karena "laporan tool membuang-buang waktu saya", sedangkan **auditor** sering kuatir pada TPR yang kecil atau di bawah 100% untuk suatu kategori karena "tool melewatkan sesuatu yang penting".
> >
> > ### Kurva ROC dan Trade-off FP vs TP
> >
> > Setiap **binary classifier** umumnya harus melakukan **trade-off** antara FP rate dan TP rate. Untuk mendapatkan lebih banyak laporan (TP rate lebih tinggi), kita harus menerima FP rate yang lebih besar pula — tidak ada makan siang gratis. Pertanyaan kuncinya menjadi: mana yang lebih penting bagimu, **FP rate rendah** (sedikit laporan palsu) atau **TP rate tinggi** (sedikit yang terlewat)?
> >
> > **Kurva ROC (Receiver Operating Characteristic)**, yang berasal dari Perang Dunia II untuk radar, menggambarkan trade-off ini secara grafis dengan memplot TP rate terhadap FP rate. Pada praktiknya kita jarang mengetahui nilai sebenarnya untuk tool tertentu, namun efek trade-off-nya tetap nyata. Dua pihak berperan di sini: **tool developer** menentukan fokus desain alat (cenderung agresif atau konservatif), sementara **tool user** dapat **mengonfigurasi** alat untuk menggeser titik kerja pada kurva sesuai kebutuhan proyeknya.
> >
> > ### Roll-up Pengukuran: Precision, Recall, F-score, Discrimination
> >
> > Agar penilaian lebih ringkas, beberapa metrik gabungan (roll-up) digunakan. **Precision**, $$P = \frac{TP}{TP + FP}$$ mengukur seberapa bersih laporan dari noise (identik secara rumus dengan true positive rate versi presisi). **Recall** — disebut juga **sensitivity**, **soundness**, atau **find rate**,  $$ Recall = \frac{TP}{TP + FN}$$ mengukur seberapa lengkap kerentanan ditemukan. Keduanya sering bertabrakan, sehingga digunakan **F-score** sebagai **harmonic mean**: $$F = 2 \times \frac{Precision \times Recall}{Precision + Recall}$$yang baru tinggi bila kedua komponen sama-sama tinggi.
> >
> > Metrik keempat, **Discrimination rate,  $$DR = \frac{Discriminations}{Test\_Pairs}$$ mengukur kemampuan alat membedakan kode bercacat dari kode bersih. Diberikan **sepasang test** (satu mengandung defect, satu tidak), **diskriminasi** terjadi bila tool **benar melaporkan flaw (TP)** pada test bercacat **DAN** tidak melaporkan apa pun (TN) pada test tanpa cacat. Semua nilai roll-up ini berkisar antara **0..1**, di mana semakin tinggi semakin baik. Metodologi pengukuran ini diadopsi dari CAS Static Analysis Tool Study (Dec 2011) milik NIST SAMATE.

> [!cornell] #### Summary
>
> Verifikasi perangkat lunak terbagi menjadi **static** (tanpa eksekusi), **dynamic** (dengan eksekusi terhadap oracle), dan **hybrid** (gabungan). Kualitas laporan sebuah tool dipetakan melalui **confusion matrix** dengan empat sel: **TP**, **FP** (Type I error), **TN**, dan **FN** (Type II error). Dari sini lahir **FPR** ("probabilitas alert palsu", dikuatirkan developer) dan **TPR/sensitivity** ("persentase kerentanan ditemukan", dikuatirkan auditor). **Kurva ROC** menggambarkan trade-off tak terhindarkan antara FP dan TP rate, yang dapat digeser developer maupun user melalui konfigurasi. Metrik gabungan **Precision**, **Recall**, **F-score** (harmonic mean keduanya), dan **Discrimination rate** merangkum kinerja alat pada skala 0..1, semakin tinggi semakin baik.

> [!ad-libitum]- Additional Information
>
> #### Memahami AUC dan Pemilihan Titik Operasi
> Selain bentuk kurva ROC, praktisi sering merangkumnya menjadi satu angka tunggal **AUC (Area Under the Curve)**: nilai 1.0 berarti classifier sempurna, 0.5 berarti setara tebakan acak. AUC berguna untuk membandingkan dua alat secara cepat, tetapi ia menyembunyikan di titik mana alat tersebut bekerja. Dalam keamanan, dua proyek bisa memilih titik operasi berbeda pada kurva yang sama: tim dengan resource triase terbatas memilih titik FPR rendah (mengorbankan recall), sedangkan tim audit kepatuhan memilih titik TPR tinggi (menerima banyak FP). Kurva Precision-Recall sering lebih informatif daripada ROC ketika defect sangat jarang (kelas tak seimbang), karena ROC bisa terlihat optimistis pada data dengan TN sangat banyak.
>
> #### Base Rate Fallacy pada Tool Keamanan
> Sebuah jebakan interpretasi penting adalah **base rate fallacy**. Jika kerentanan sangat jarang pada basis kode (misalnya hanya 1 dari 1000 lokasi yang benar-benar rentan), maka meski FPR alat rendah, mayoritas alert yang muncul tetap bisa berupa FP. Inilah alasan developer "lelah triase". Memahami prevalensi (base rate) defect membantu menetapkan ekspektasi realistis dan menjustifikasi penggunaan beberapa alat secara berlapis (defense in depth) ketimbang mengandalkan satu alat tunggal.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil dataset SARD/SAMATE Reference Dataset (program dengan properti diketahui), jalankan dua static analyzer berbeda, lalu hitung sendiri TP/FP/TN/FN, Precision, Recall, dan F-score untuk masing-masing. Bandingkan titik operasinya.
> 2. Buat script Python yang memplot kurva ROC dan Precision-Recall dari hasil dua konfigurasi sebuah linter (misalnya ruleset ketat vs longgar), lalu diskusikan trade-off yang teramati.
>
> #### Bacaan Lanjutan
> - CAS Static Analysis Tool Study — Methodology (NIST SAMATE, Dec 2011): http://samate.nist.gov/docs/CAS_2011_SA_Tool_Method.pdf
> - Wikipedia, "Receiver operating characteristic" — penjelasan kurva ROC dan AUC.
> - David A. Wheeler & Rama S. Moorthy, "Software SOAR" (IDA Paper P-5061), Appendix E — matriks tipe-tipe alat.
