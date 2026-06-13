---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Scientific Method in Biology
>
> > ## Questions/Cues
> >
> > - Apa tahapan proses ilmiah dalam biologi?
> > - Apa beda data kualitatif dan kuantitatif?
> > - Apa beda penalaran induktif dan deduktif?
> > - Apa beda hipotesis dan teori, dan mengapa hipotesis tak bisa "dibuktikan" mutlak?
> > - Bagaimana metode ilmiah berkaitan dengan loop eksperimentasi pada machine learning?
> >
> > ## Reference Points
> >
> > - IF3211 — Course Introduction (PPT 1, bagian Forming and Testing Hypotheses)
> > - IF3211 — Course Introduction (PPT 1, bagian Gathering and Analyzing Data)
> > - IF3211 — Course Introduction (PPT 1, bagian Deductive Reasoning)
>
> > ### Sains sebagai Proses Inkuiri
> >
> > **Science** adalah pendekatan untuk **memahami dunia kehidupan**, dan **inquiry** adalah pencarian informasi serta penjelasan atas fenomena alam. Prosesnya memadukan **challenge, adventure, luck** dengan **perencanaan, penalaran, kreativitas, dan ketekunan**. Inti proses ilmiah: **melakukan observasi → membentuk hipotesis logis → mengujinya**. Biologi selalu **dimulai dari observasi cermat**, dan dengan membaca studi terdahulu, ilmuwan **membangun di atas fondasi pengetahuan** yang ada.
> >
> > ### Mengumpulkan dan Menganalisis Data
> >
> > Observasi yang dicatat disebut **data**, terbagi dua kategori. **Data kualitatif** adalah **deskripsi** (bukan pengukuran) — contoh ikonik: observasi Jane Goodall tentang perilaku simpanse. **Data kuantitatif** adalah **pengukuran terekam**, sering ditata dalam tabel dan grafik. Keduanya saling melengkapi: kualitatif menangkap kekayaan fenomena, kuantitatif memungkinkan analisis statistik.
> >
> > ### Penalaran Induktif vs Deduktif
> >
> > **Inductive reasoning** menarik **generalisasi dari banyak observasi spesifik** — misalnya kesimpulan "semua organisme tersusun dari sel" yang lahir dari dua abad pengamatan mikroskopis. **Deductive reasoning** bergerak sebaliknya: **ekstrapolasi dari premis umum ke prediksi spesifik** yang kemudian diuji secara eksperimental. Pola "Jika hipotesis H benar, maka observasi O seharusnya terjadi" adalah penalaran deduktif yang menjembatani hipotesis ke uji empiris.
> >
> > ### Hipotesis, Eksperimen, dan Teori
> >
> > Dalam sains, **hipotesis** adalah **penjelasan** berbasis observasi dan asumsi yang **menuju prediksi yang dapat diuji** — sebuah "penjelasan yang sedang diadili" (*explanation on trial*). Hipotesis ilmiah **harus** menghasilkan prediksi yang dapat diuji lewat observasi tambahan atau **eksperimen** (uji ilmiah, sering dalam kondisi terkontrol). Satu observasi bisa memunculkan **banyak hipotesis** — contoh deck: lampu meja mati → Hipotesis 1: bohlam putus; Hipotesis 2: lampu rusak; keduanya *testable*. Poin kritis: sebuah hipotesis **tidak pernah dapat dibuktikan benar secara mutlak** karena kita tak mungkin menguji semua alternatif — pengujian berulang hanya **meningkatkan keyakinan (confidence)** atas validitasnya. (Inilah falsifikasi ala Popper: kita dapat *menyangkal*, tak dapat *membuktikan mutlak*.)
> >
> > ### Computational Framing: Metode Ilmiah sebagai Loop Eksperimentasi ML
> >
> > Bagi mahasiswa CS, metode ilmiah adalah **empirical loop** yang persis mendasari **machine learning experimentation**: **observasi (data) → hipotesis (model/arsitektur) → prediksi (inferensi) → eksperimen (training & evaluasi) → revisi**. **Inductive reasoning** adalah inti **supervised learning** — menggeneralisasi dari sampel ke populasi (dan *overfitting* adalah induksi yang gagal). **Deductive reasoning** sejajar dengan **rule-based/symbolic AI** dan pengujian *unit test* dari spesifikasi. Bahwa hipotesis "tak terbuktikan mutlak" menggemakan **falsifiability** dan disiplin **train/validation/test split**: kita tak pernah "membuktikan" model benar, hanya **gagal menyangkalnya** pada data uji. Perbedaan **hipotesis vs teori** sejajar dengan **model kandidat vs paradigma yang sudah tervalidasi luas**.
> >
> > ```mermaid
> > flowchart LR
> >     OBS["Observasi<br/>(Data)"] --> HYP["Hipotesis<br/>(testable)"]
> >     HYP --> PRD["Prediksi<br/>(deduktif)"]
> >     PRD --> EXP["Eksperimen<br/>terkontrol"]
> >     EXP --> EVAL{"Sesuai<br/>prediksi?"}
> >     EVAL -->|Tidak| HYP
> >     EVAL -->|Ya, sementara| CONF["Confidence naik<br/>(bukan bukti mutlak)"]
> > ```

> [!cornell] #### Summary
>
> **Metode ilmiah** dalam biologi adalah siklus **observasi → hipotesis → prediksi → eksperimen** yang dimulai dari **observasi cermat** dan membangun di atas pengetahuan terdahulu. Observasi tercatat sebagai **data kualitatif** (deskripsi, mis. Jane Goodall) atau **kuantitatif** (pengukuran). **Penalaran induktif** menggeneralisasi dari banyak observasi, sedangkan **penalaran deduktif** mengekstrapolasi prediksi spesifik dari premis umum untuk diuji. Sebuah **hipotesis** adalah penjelasan *testable* ("explanation on trial") yang **tak pernah terbukti mutlak** — pengujian hanya menaikkan **confidence** (falsifikasi). Secara komputasional, loop ini adalah **empirical loop ML**: induksi = supervised learning, deduksi = symbolic/rule-based, dan train/validation/test split mencerminkan disiplin falsifiability. Konsep evolusi sebagai *unifying theme* dibahas di [[Levels of Biological Organization and Unifying Themes]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Controlled Experiment
>
> Eksperimen terkontrol mengisolasi **satu variabel independen** sambil menjaga variabel lain konstan, membandingkan **kelompok eksperimen** dengan **kelompok kontrol**. Tanpa kontrol, korelasi yang teramati bisa menyesatkan (*confounding*). Ini analog langsung dengan **A/B testing** dan **ablation study** dalam rekayasa perangkat lunak/ML.
>
> #### CS / Computational Angle
>
> Hipotesis biologi yang "testable" sama dengan **falsifiable claim**; model ML yang tak dapat gagal pada data apa pun (mis. menghafal seluruh data latih) tidak benar-benar diuji. Praktik **hold-out test set** adalah upaya menjaga agar klaim model dapat **disangkal** oleh data baru — penerapan langsung epistemologi Popper di rekayasa.
>
> #### Proyek Eksplorasi Mandiri
> 1. Rumuskan sebuah pertanyaan biologi (mis. pengaruh suhu pada pertumbuhan ragi), turunkan hipotesis *testable*, rancang eksperimen terkontrol lengkap dengan variabel kontrol/independen/dependen.
> 2. Ambil satu dataset publik, latih dua model, lalu tulis bagaimana train/validation/test split Anda mencerminkan langkah "uji hipotesis" pada metode ilmiah.
>
> #### Bacaan Lanjutan
> - Campbell, N. A., et al. *Biology in Focus*. 3rd ed., Bab 1 (Concept 1.3).
> - Popper, K. *The Logic of Scientific Discovery*. 1959 (falsifiability).
> - Platt, J. R. "Strong Inference." *Science*, 1964.
