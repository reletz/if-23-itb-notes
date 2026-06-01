---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Foundational Definitions and Scope of Machine Learning
>
> > ## Questions/Cues
> >
> > - Apa definisi ML menurut Tom Mitchell?
> > - Bagaimana relasi antara AI dan ML?
> > - Mengapa pengalaman (E) penting dalam ML?
> > - Apa saja komponen utama sistem ML?
> > - Bagaimana ML memperoleh pengetahuan?
> >
> > ## Reference Points
> >
> > - Course Slides (Halaman 13-18, 22-24)
> >
>
> > ### Definisi Inti Pembelajaran Mesin
> > **Pembelajaran Mesin (Machine Learning/ML)** merupakan subbidang **Kecerdasan Buatan (Artificial Intelligence/AI)** yang memungkinkan sistem memperbaiki kinerjanya secara otomatis melalui pengalaman. Menurut **Tom Mitchell (1998)**, suatu program komputer dikatakan belajar dari pengalaman *E* terhadap kelas tugas *T* dan ukuran kinerja *P*, jika kinerjanya pada tugas *T* yang diukur dengan *P* meningkat dengan pengalaman *E*.
> > 
> > Contoh konkret: Sistem rekomendasi film (tugas *T*) yang meningkatkan akurasi rekomendasinya (kinerja *P*) dengan menganalisis riwayat penonton (pengalaman *E*). Definisi alternatif dari **Kelleher et al. (2015)** menyebut ML sebagai proses otomatis ekstraksi pola dari data, menekankan aspek *pengenalan pola* sebagai inti pembelajaran.
> > 
> > ML berperan sebagai *agent pembelajar* dalam sistem AI, berbeda dengan *agent pemecah masalah* berbasis aturan tetap atau *agent berbasis pengetahuan* yang memerlukan input manual. Proses pembelajaran ini merepresentasikan **akuisisi pengetahuan otomatis** melalui generalisasi pola data (*inductive reasoning*).
> > ### Diferensiasi AI-ML dan Ruang Lingkup
> > **Kecerdasan Buatan (AI)** merupakan payung besar yang mencakup:
> > 1. *Problem-solving agents* (pemecah masalah dengan logika)
> > 2. *Knowledge-based agents* (sistem berbasis pengetahuan eksplisit)
> > 3. ***Machine-learning agents*** (agen yang belajar dari data)
> > 
> > ML menduduki posisi khusus sebagai mekanisme akuisisi pengetahuan otomatis dalam sistem AI. Contoh aplikasi nyata termasuk sistem deteksi penipuan transaksi (mempelajari pola transaksi mencurigakan) dan asisten virtual (meningkatkan respons melalui interaksi pengguna).
> > 
> > **Ruang lingkup ML** mencakup desain sistem yang mampu:
> > - Menganalisis data kompleks
> > - Mengidentifikasi pola tersembunyi
> > - Membuat prediksi/pengambilan keputusan adaptif
> > - Meningkatkan kinerja seiring waktu tanpa pemrograman eksplisit
> > ### Komponen Fundamental Sistem ML
> > 1. **Fitur (Feature)**: Atribut/data input yang digunakan untuk pembelajaran (misal: ukuran piksel dalam klasifikasi gambar)
> > 2. **Target/Label**: Output yang ingin diprediksi (misal: kategori objek dalam gambar)
> > 3. **Pola (Pattern)**: Hubungan statistik antara fitur dan target yang ditemukan algoritma
> > 4. **Himpunan Latih (Training Set)**: Kumpulan contoh <data, label> untuk proses pembelajaran
> > 5. **Fungsi Kerugian (Loss Function)**: Metrik pengukur kesalahan prediksi model
> > Proses pembelajaran melibatkan **inductive learning** - inferensi fungsi umum *h* yang mengaproksimasi fungsi target *f* dari contoh spesifik. Model yang dihasilkan kemudian digunakan dalam fase *inferensi* untuk memprediksi data baru.
> > ### Arsitektur Sistem Pembelajaran
> > Alur dasar sistem ML terdiri dari dua fase:
> > 1. **Fase Pembelajaran**:
> > 	- Input: Data latih (fitur + label)
> > 	- Proses: Ekstraksi pola menggunakan algoritma (Naive Bayes, Decision Tree, dll)
> > 	- Output: Model matematis *h* yang merepresentasikan pengetahuan
> > 2. **Fase Inferensi**:
> > 	- Input: Data baru tanpa label
> > 	- Proses: Aplikasi model *h* untuk menghasilkan prediksi
> > 	- Output: Keputusan/klasifikasi berdasarkan pola yang dipelajari
> > 	Contoh implementasi: Sistem klasifikasi email spam menggunakan model *Naive Bayes* yang mempelajari pola kata kunci dari email terdahulu, kemudian mengidentifikasi spam pada email baru.

> [!cornell] #### Summary
>
> **Pembelajaran Mesin** didefinisikan sebagai kemampuan sistem meningkatkan kinerja (*P*) pada tugas (*T*) melalui pengalaman (*E*), dengan **Tom Mitchell** dan **Kelleher** menawarkan perspektif komplementer. Sebagai komponen **AI**, ML memungkinkan akuisisi pengetahuan otomatis melalui **inductive learning** dari data. Sistem ML terdiri dari komponen fundamental seperti **fitur, label, pola**, dan **fungsi kerugian**, dengan alur kerja dua fase: **pembelajaran** (ekstraksi pola) dan **inferensi** (aplikasi model). **Implementasi praktis** ML mencakup berbagai domain seperti keuangan, kesehatan, dan teknologi konsumen.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Definisi ML
> **Definisi Mitchell** bersifat operasional dengan parameter terukur (*T, P, E*), cocok untuk evaluasi kuantitatif. **Definisi Kelleher** lebih menekankan aspek teknis ekstraksi pola, relevan untuk implementasi algoritmik. Perbedaan ini merefleksikan dualitas ML sebagai disiplin teoretis dan terapan.
>
> **Tantangan definisi operasional** mencakup pengukuran "peningkatan kinerja" dalam sistem kompleks (misal: model NLP) dan penentuan batas "pengalaman" yang cukup untuk klaim pembelajaran. Kritikus seperti Marcus (2018) berargumen bahwa definisi ini tidak sepenuhnya menangkap aspek *understanding* dalam pembelajaran manusia.
>
> #### Paradigma Pembelajaran Lainnya
> Selain tiga jenis utama (*supervised, unsupervised, reinforcement*), berkembang paradigma seperti:
> - **Self-supervised learning**: Pembelajaran dari data tanpa label melalui pretext tasks
> - **Meta-learning**: Pembelajaran untuk belajar (learning-to-learn) di berbagai tugas
> - **Online learning**: Pembelajaran adaptif terhadap streaming data real-time
>
> Paradigma ini memperluas cakupan ML tradisional namun tetap berpegang pada prinsip dasar peningkatan kinerja melalui pengalaman.
>
> #### Tantangan Epistemologis dalam ML
> **Problematika induksi** (Hume, 1739) muncul dalam konteks ML: Bagaimana menjamin generalisasi pola dari contoh terbatas? **Teori VC-dimension** (Vapnik-Chervonenkis) memberikan kerangka matematis untuk memprediksi kemampuan generalisasi model berdasarkan kompleksitasnya.
>
> **Bias dalam pembelajaran** dapat muncul dari:
> - **Bias data**: Ketidakrepresentatifan himpunan latih
> - **Bias algoritmik**: Asumsi implisit dalam desain model
> - **Bias evaluasi**: Metrik kinerja yang tidak menangkap tujuan sebenarnya
>
> #### Proyek Eksplorasi Mandiri
> 1. **Analisis Definisi Operasional**: Pilih 5 paper ML terkini (2020-2024) dan identifikasi bagaimana masing-masing mendefinisikan "pembelajaran" dalam eksperimen mereka. Bandingkan dengan kerangka Mitchell.
> 2. **Studi Kasus Transdisipliner**: Investigasi penerapan ML dalam bidang non-tradisional (seni, humaniora) dan analisis bagaimana definisi dasar ML beradaptasi dengan konteks baru.
> 3. **Eksperimen Simulasi Induksi**: Implementasikan algoritma sederhana (k-NN, Decision Stump) pada dataset sintetis untuk mengobservasi hubungan antara jumlah data (*E*) dan akurasi (*P*).
>
> #### Bacaan Lanjutan
> - **Teoretis**:
> - Mitchell, T. M. (1997). *Machine Learning*. Bab 1: Conceptual Foundations
> - Shalev-Shwartz, S., & Ben-David, S. (2014). *Understanding Machine Learning: From Theory to Algorithms*. Bagian 2.1: What Is Learning?
> - **Filosofis**:
> - Domingos, P. (2012). "A Few Useful Things to Know About Machine Learning". *Communications of the ACM*
> - Marcus, G. (2018). "Deep Learning: A Critical Appraisal". *arXiv:1801.00631*
> - **Teknis**:
> - Sumber Daya Online: "MLU-Explain" oleh Amazon (https://mlu-explain.github.io)
> - Tutorial Interaktif: "Seeing Theory" - Probability for ML (https://seeing-theory.brown.edu)