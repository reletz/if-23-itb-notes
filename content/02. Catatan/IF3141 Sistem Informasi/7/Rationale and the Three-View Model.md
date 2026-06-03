---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Rationale and the Three-View Model
>
> > ## Questions/Cues
> >
> > - Mengapa "structure over words" penting dalam pemodelan?
> > - Apa makna U-curve dalam biaya perubahan sistem?
> > - Apa saja yang difasilitasi oleh modelling?
> > - Apa perbedaan value dari proses vs value dari model yang dihasilkan?
> > - Apa tiga view dalam three-view model of a system?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 7-10)
>
> > ### Structure over Words
> >
> > Pemodelan tidak harus selalu visual, meskipun seperti pepatah berkata "*a picture paints a thousand words*". System modelling umumnya melibatkan **kombinasi representasi visual** (diagram) dan **deskripsi tekstual yang terstruktur**.
> >
> > Dua hal yang dimodelkan adalah:
> >
> > - **Model elements** (elemen model): misalnya *task* dalam sebuah process model, atau *class* dan *entity* dalam sebuah data model.
> > - **Links and dependencies** (tautan dan ketergantungan) antar elemen: misalnya panah yang menunjukkan urutan (*sequence*) task, atau garis yang merepresentasikan ketergantungan semantik antar class atau entity.
> >
> > Intinya, nilai pemodelan terletak pada **struktur** — bagaimana elemen-elemen saling terhubung — bukan sekadar deskripsi naratif. Teks bebas mudah ambigu, sedangkan struktur yang eksplisit memaksa kejelasan hubungan.
> >
> > ### The U-Curve
> >
> > **U-curve** menggambarkan hubungan antara **waktu/fase** dalam siklus pengembangan dengan **biaya memperbaiki kesalahan**. Kurva ini menunjukkan bahwa biaya untuk memperbaiki cacat (*defect*) meningkat secara dramatis semakin terlambat cacat itu ditemukan dalam lifecycle.
> >
> > Kesalahan yang ditemukan pada fase analisis dan pemodelan sangat **murah** diperbaiki — cukup mengubah diagram. Kesalahan yang baru ditemukan saat coding lebih mahal, dan kesalahan yang lolos hingga produksi (*after release*) bisa berbiaya berlipat-lipat ganda. Inilah justifikasi ekonomi utama pemodelan: dengan memodelkan dan memvalidasi lebih awal, kita memindahkan penemuan kesalahan ke titik termurah pada kurva.
> >
> > Contoh: Salah memahami kebutuhan pelanggan yang baru ketahuan saat sistem live mungkin memerlukan rework total, pelatihan ulang, dan kehilangan kepercayaan — biaya yang bisa dicegah dengan validasi model di awal.
> >
> > ### Rationale (Rasionalitas) Pemodelan
> >
> > Pemodelan digunakan dalam pengembangan solusi dengan tujuan akhir menghasilkan **solusi yang memenuhi kebutuhan key stakeholder** — dengan kata lain, solusi yang berkualitas. Modelling memfasilitasi empat hal utama:
> >
> > **Communication and understanding**: Model menjadi bahasa bersama yang menyatukan pemahaman antara analis, developer, dan stakeholder bisnis sehingga mengurangi miskomunikasi.
> >
> > **Experimentation**: Model memungkinkan eksperimen "*what-if*" — mencoba alternatif desain atau proses secara murah tanpa membangun sistem nyata.
> >
> > **Validation**: Model dapat divalidasi terhadap kebutuhan untuk memastikan solusi yang diusulkan memang menjawab masalah yang benar.
> >
> > **Gap analysis**: Membandingkan model kondisi saat ini (*as-is*) dengan kondisi yang diinginkan (*to-be*) untuk mengidentifikasi kesenjangan yang harus ditutup.
> >
> > ### The Value of Modelling
> >
> > Nilai pemodelan datang dari dua sumber:
> >
> > - **Value from the act of modelling**: Nilai dari **proses** membuat model itu sendiri. Tindakan memodelkan memaksa tim berpikir mendalam, mengungkap asumsi tersembunyi, dan mengidentifikasi pertanyaan yang belum terjawab — sering kali pemahaman yang lahir selama proses lebih berharga daripada diagram akhirnya.
> > - **Value of the delivered model**: Nilai dari **model yang dihasilkan** sebagai artefak. Model jadi menjadi dokumentasi, acuan implementasi, dan basis untuk traceability serta pemeliharaan di masa depan.
> >
> > ### The Three-View Model of a System
> >
> > Sebuah sistem dapat dipandang melalui **tiga view** yang saling melengkapi, masing-masing menyoroti facet berbeda:
> >
> > 1. **Functional view (Functionality)**: Memandang sistem dari sisi *apa yang dilakukannya* — fungsi, proses, dan layanan yang diberikan kepada pengguna.
> > 2. **Static/Structural view (Static data)**: Memandang sistem dari sisi *data dan struktur* — entitas, class, serta relasi statis yang dikelola sistem.
> > 3. **Dynamic/Behavioral view (Events)**: Memandang sistem dari sisi *perilaku dan kejadian* — bagaimana sistem berubah keadaan merespons event sepanjang waktu.
> >
> > ```mermaid
> > flowchart TD
> >     S["System"]
> >     S --> F["Functional View<br/>(Functionality)"]
> >     S --> St["Structural View<br/>(Static data)"]
> >     S --> B["Behavioral View<br/>(Events)"]
> >     F -.->|"konsisten"| St
> >     St -.->|"konsisten"| B
> >     B -.->|"konsisten"| F
> > ```
> >
> > Ketiga view ini harus konsisten satu sama lain agar bersama-sama membentuk gambaran sistem yang utuh, sesuai prinsip bahwa kombinasi model yang konsisten melengkapi abstraksi yang tidak lengkap.

> [!cornell] #### Summary
>
> Prinsip **structure over words** menekankan bahwa nilai model terletak pada elemen yang terstruktur beserta **links dan dependencies**-nya, bukan narasi bebas. **U-curve** memberi justifikasi ekonomi: biaya memperbaiki kesalahan melonjak semakin terlambat ditemukan, sehingga pemodelan awal sangat hemat biaya. Rationale pemodelan adalah memfasilitasi **communication, experimentation, validation, dan gap analysis** demi solusi berkualitas yang memenuhi kebutuhan stakeholder. Nilainya datang baik dari **proses pemodelan** maupun dari **model yang dihasilkan**. Akhirnya, **three-view model** memandang sistem dari tiga facet — **functional, structural, dan behavioral** — yang harus konsisten agar membentuk deskripsi sistem yang utuh.

> [!ad-libitum]- Additional Information
>
> #### Data Empiris U-Curve
>
> Studi Barry Boehm menunjukkan biaya memperbaiki defect bisa meningkat 1:10:100 dari fase requirement ke desain ke produksi (bahkan hingga 1:100+ pada sistem kritis). Inilah dasar gerakan "shift-left testing" yang mendorong validasi sedini mungkin.
>
> #### Keterkaitan dengan 4+1 Architectural View Model
>
> Three-view model beresonansi dengan model "4+1" Kruchten (Logical, Process, Development, Physical, plus Scenarios). Keduanya menegaskan bahwa satu diagram tidak cukup; arsitektur perlu dilihat dari banyak sudut pandang yang konsisten.
>
> #### Self-Exploration Projects
>
> 1. Gambarkan U-curve untuk sebuah proyek nyata dan estimasikan biaya rework pada tiap fase.
> 2. Untuk sistem reservasi tiket, identifikasi elemen mana yang masuk functional, structural, dan behavioral view.
> 3. Lakukan gap analysis as-is vs to-be untuk proses pendaftaran ulang mahasiswa.
>
> #### Bacaan Lanjutan
>
> - Boehm, B. (1981). *Software Engineering Economics*. Prentice Hall.
> - Kruchten, P. (1995). *Architectural Blueprints — The "4+1" View Model*. IEEE Software.
> - BCS, *Business Analysis*, Bab Modelling Business Systems.
