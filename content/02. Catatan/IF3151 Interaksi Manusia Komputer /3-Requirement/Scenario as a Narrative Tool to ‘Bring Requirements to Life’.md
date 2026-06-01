---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Scenario as a Narrative Tool to ‘Bring Requirements to Life’
>
> > ## Questions/Cues
> >
> > - Mengapa requirement harus “hidup” dalam desain?
> > - Bagaimana scenario menampilkan konteks fisik dan sosial?
> > - Apa perbedaan utama antara scenario dan use case?
> > - Bagaimana persona membantu memperkaya scenario?
> > - Kapan sebaiknya memilih scenario dibandingkan use case?
> >
> > ## Reference Points
> >
> > - Scenario dan Use Case IF3151 (Slides 8-30)
> > - “Menghidupkan” Requirement (Slide 3)
> > - Daftar Requirement: Tepat tetapi Datar (Slide 4‑5)
> > - Requirement Perlu Lebih “Hidup” (Slide 6‑7)
> > - Scenario sebagai Representasi Naratif (Slide 9‑11)
> > - Persona (Slide 12‑15)
> > - Contoh Scenario dengan Persona (Slide 16)
> > - Scenario vs. Use Case (Slide 27‑29)
>
> > ### Kebutuhan yang “Hidup” dalam Desain
> >
> > Daftar requirement yang hanya berupa kalimat abstrak (misalnya “Sistem harus memungkinkan pembayaran non‑tunai”) memang sudah tepat secara struktural, tetapi tidak cukup untuk menyalurkan makna pengalaman pengguna. Tanpa konteks, stakeholder dapat menafsirkan kebutuhan tersebut secara berbeda, sehingga risiko terjadinya kesenjangan antara harapan pengguna dan implementasi meningkat. “Menghidupkan” requirement berarti menambahkan dimensi situasional—siapa pengguna, di mana ia berada, apa tujuan yang sedang dikejar, serta konsekuensi bila interaksi gagal. Dengan cara ini, requirement bertransformasi menjadi cerita yang dapat dirasakan, bukan sekadar daftar fungsi.
> >
> > Contoh konkret: seorang pengguna yang harus memesan transportasi saat hujan deras sambil memegang payung. Jika hanya menyatakan “Sistem harus menampilkan estimasi waktu kedatangan”, desainer mungkin tidak memperhatikan ukuran kontrol atau kecepatan respons yang diperlukan dalam kondisi tersebut. Namun, ketika kebutuhan dibungkus dalam skenario, desainer langsung menyadari bahwa keterbacaan dan ukuran tombol menjadi kritikal. Oleh karena itu, skenario berfungsi sebagai jembatan antara kebutuhan konseptual dan pengalaman nyata.
> >
> > Memahami kebutuhan secara “hidup” juga membantu tim mengidentifikasi risiko operasional. Misalnya, kegagalan menampilkan estimasi yang akurat pada saat pengguna menunggu anak yang sakit dapat menimbulkan stres tambahan. Dengan menyoroti konsekuensi emosional, tim dapat merancang fallback yang lebih empatik, seperti notifikasi alternatif atau opsi penjadwalan ulang.
> >
> > ### Scenario sebagai Representasi Naratif
> >
> > Scenario adalah narasi informal yang menggambarkan seseorang menggunakan sistem dalam situasi nyata. Berbeda dengan spesifikasi teknis, scenario menempatkan manusia di pusat cerita, menampilkan latar belakang fisik (misalnya cuaca, lokasi) dan sosial (misalnya peran sebagai orang tua). Bentuknya menyerupai cerita pendek: ada tokoh, tujuan, tindakan konkret, dan konteks yang melatarbelakangi. Karena bersifat naratif, scenario mudah dipahami oleh semua pemangku kepentingan, termasuk manajer produk, desainer UI/UX, dan bahkan pengguna akhir yang tidak memiliki latar belakang teknis.
> >
> > Struktur konseptual scenario tetap terorganisir meskipun bersifat naratif. Empat elemen utama yang harus muncul adalah: (1) goal pengguna, (2) task yang dilakukan, (3) action konkret yang diambil, dan (4) context of use. Tanpa keempat elemen ini, scenario berisiko menjadi anekdot yang tidak dapat dianalisis. Misalnya, cerita “Rina membuka aplikasi ride‑hailing” harus menyertakan tujuan (melihat estimasi waktu), tindakan (menekan tombol), dan konteks (hujan deras, satu tangan memegang payung). Dengan menambahkan elemen‑elemen tersebut, scenario menjadi alat analitis yang dapat dievaluasi secara kritis.
> >
> > Scenario juga bersifat eksploratif. Karena tidak mengikat pada detail teknis, tim dapat menggunakannya untuk menguji hipotesis tentang kebutuhan tersembunyi. Misalnya, dalam skenario di atas, desainer dapat menanyakan: “Apakah pengguna membutuhkan umpan balik haptic ketika menekan tombol kecil?” Pertanyaan semacam ini membuka ruang inovasi yang tidak akan muncul dalam daftar requirement statis.
> >
> > ### Persona sebagai Penguat Scenario
> >
> > Persona adalah representasi fiktif yang dirangkum dari riset pengguna nyata. Meskipun bukan individu spesifik, persona menggabungkan karakteristik demografis, tujuan, motivasi, dan keterbatasan yang umum ditemui pada segmen pengguna. Dengan memberi nama, latar belakang, dan tujuan yang jelas, persona membantu tim menginternalisasi siapa yang mereka rancang untuknya, sehingga skenario menjadi lebih konkret dan berempati.
> >
> > Proses pembuatan persona melibatkan wawancara atau observasi terhadap sejumlah pengguna, identifikasi pola respons, dan sintesis menjadi model arketipe. Setiap persona biasanya menonjolkan satu karakteristik utama yang memengaruhi interaksi, misalnya “orang tua yang sibuk” atau “pekerja kantor yang sering bepergian”. Ketika persona digabungkan dengan scenario, cerita menjadi lebih hidup karena pembaca dapat membayangkan situasi kehidupan nyata tokoh tersebut.
> >
> > Contoh pada slide 16 menampilkan persona “Rina”, seorang pekerja kantor yang juga seorang ibu. Dengan menambahkan detail seperti “memegang payung” dan “anak sakit di rumah”, scenario tidak hanya menampilkan tugas teknis (melihat estimasi waktu) tetapi juga menyoroti tekanan emosional dan fisik yang memengaruhi desain. Dari sini, implikasi desain seperti ukuran kontrol yang cukup besar, kontras warna yang tinggi, dan respons cepat menjadi jelas.
> >
> > ### Integrasi Scenario dan Use Case
> >
> > Meskipun scenario menekankan konteks dan makna, use case berfokus pada struktur interaksi antara aktor dan sistem. Kedua artefak saling melengkapi: scenario memberikan “mengapa” dan “di mana”, sedangkan use case memberikan “bagaimana” secara terperinci. Tanpa scenario, use case dapat terasa kering dan terlepas dari realitas pengguna; tanpa use case, scenario dapat berhenti pada narasi tanpa petunjuk implementasi.
> >
> > Pendekatan yang ideal adalah memulai dengan scenario untuk mengeksplorasi problem space, kemudian memindahkan insight yang relevan ke dalam use case untuk memformalkan alur interaksi. Misalnya, setelah mengidentifikasi kebutuhan akan estimasi waktu yang akurat dalam skenario hujan, tim dapat menuliskan use case yang mencakup langkah-langkah sistem menampilkan estimasi, mengirim notifikasi, dan menangani kegagalan jaringan. Dengan cara ini, desain tetap berakar pada pengalaman manusia sambil menyediakan panduan operasional yang jelas bagi pengembang.
> >
> > ### Kapan Memilih Scenario atau Use Case
> >
> > Pemilihan antara scenario dan use case tergantung pada fase proyek dan tujuan analisis. Scenario paling berguna ketika problem space masih belum pasti, konteks sosial‑emosional perlu dipahami, atau diskusi lintas stakeholder diperlukan. Contohnya, pada tahap konseptual awal, tim dapat menggunakan beberapa skenario untuk menguji asumsi tentang kebutuhan pengguna yang beragam.
> >
> > Use case, di sisi lain, diperlukan ketika interaksi harus diformalisasi, alur diuji kelengkapannya, atau tanggung jawab sistem harus eksplisit untuk komunikasi teknis. Pada fase desain detail atau implementasi, use case menjadi dokumen referensi utama bagi developer. Kedua artefak tidak bersaing, melainkan berurutan: scenario memperdalam pemahaman, use case mengorganisasi detail operasional.

> [!cornell] #### Summary
>
> **Scenario** menghidupkan requirement dengan menempatkan pengguna dalam konteks nyata, menampilkan goal, task, aksi, dan lingkungan sosial‑fisik. **Persona** memperkaya narasi dengan karakteristik pengguna yang terukur, sehingga skenario menjadi lebih empatik dan terarah. Integrasi **scenario** (untuk eksplorasi) dan **use case** (untuk formalitas) memastikan bahwa desain tidak hanya konseptual tetapi juga dapat diimplementasikan secara konsisten. Memilih antara keduanya bergantung pada fase proyek: scenario untuk eksplorasi problem space, use case untuk memformalkan interaksi.

> [!ad-libitum]- Additional Information
>
> #### Teknik Penulisan Scenario Lanjutan
>
> 1. **Pendekatan “Day‑in‑the‑Life”** – Menulis skenario seolah‑olah mengikuti satu hari penuh pengguna, mencakup beberapa titik interaksi dengan sistem. Metode ini membantu mengidentifikasi kebutuhan yang tersembunyi, seperti perubahan mood atau gangguan lingkungan yang memengaruhi keputusan.
> 2. **Penggunaan “Trigger Events”** – Memasukkan peristiwa pemicu (misalnya hujan tiba‑tiba, notifikasi darurat) yang memaksa pengguna beralih ke mode interaksi tertentu. Dengan menyoroti trigger, desainer dapat merancang respons adaptif, seperti mode satu‑tangan atau tampilan ringkas.
> 3. **Layered Narrative** – Menyusun skenario dalam tiga lapisan: (a) latar belakang (profil pengguna), (b) konteks situasional (lingkungan, perangkat), dan (c) aksi utama (task). Setiap lapisan dapat diekspansi atau dipadatkan tergantung pada audiens, sehingga skenario tetap fleksibel untuk presentasi kepada stakeholder teknis maupun non‑teknis.
>
> #### Analisis Keterkaitan Scenario dengan Goal Pengguna
>
> Analisis ini melibatkan peta tujuan (goal mapping) yang menghubungkan setiap aksi dalam skenario dengan tujuan bisnis dan kebutuhan pengguna. Langkah‑langkahnya:
>
> - Identifikasi goal utama (misalnya “mengetahui estimasi kedatangan”).
> - Turunkan menjadi sub‑goal (misalnya “melihat estimasi dalam 2 detik”).
> - Kaitkan dengan metrik keberhasilan (misalnya tingkat kepuasan > 85 %).
>
> Dengan cara ini, tim dapat menilai apakah skenario secara implisit memenuhi tujuan strategis atau memerlukan penyesuaian. Pendekatan ini juga memudahkan prioritas backlog dalam metodologi Agile.
>
> #### Metode Evaluasi Scenario
>
> 1. **Walk‑through dengan Stakeholder** – Mengundang perwakilan pengguna, product owner, dan developer untuk membaca skenario secara berurutan, kemudian mendiskusikan potensi masalah atau peluang perbaikan.
> 2. **Storyboard atau Comic Strip** – Mengubah skenario menjadi rangkaian gambar visual yang menampilkan aksi dan konteks. Visualisasi ini meningkatkan pemahaman bagi tim non‑teknis dan mempercepat identifikasi inkonsistensi.
> 3. **Rapid Prototyping** – Membuat prototipe low‑fidelity (paper atau digital) berdasarkan skenario, lalu mengujinya dengan pengguna nyata dalam kondisi yang mirip. Feedback langsung dapat mengungkapkan kebutuhan yang belum terdeteksi dalam narasi tertulis.
>
> #### Integrasi Scenario dalam Proses Agile
>
> Dalam kerangka Agile, scenario dapat berfungsi sebagai **epic** atau **feature story** yang di‑breakdown menjadi user story yang lebih kecil. Setiap user story mewarisi konteks dari scenario, sehingga tim tidak kehilangan perspektif pengguna saat mengerjakan sprint. Selain itu, scenario dapat menjadi dasar **Definition of Ready (DoR)**, memastikan bahwa backlog item memiliki konteks yang cukup sebelum masuk ke sprint planning.
>
> Beberapa alat yang mendukung integrasi ini antara lain **Jira** (menggunakan custom fields untuk menyimpan link ke dokumen scenario) dan **Confluence** (menyimpan narasi lengkap dengan gambar). Dengan menghubungkan scenario ke backlog, traceability antara kebutuhan konseptual dan implementasi teknis menjadi lebih kuat.
>
> #### Edge Cases dan Nuansa dalam Scenario
>
> - **Kondisi Ekstrem**: Misalnya, jaringan seluler terputus saat pengguna menunggu estimasi. Scenario harus mencakup fallback seperti “tampilkan pesan offline” atau “simpan estimasi terakhir”.
> - **Variasi Perangkat**: Pengguna dapat beralih dari smartphone ke smartwatch; skenario harus mempertimbangkan perbedaan ukuran layar dan input.
> - **Konteks Budaya**: Di beberapa budaya, menampilkan estimasi waktu dalam format 12‑jam vs 24‑jam dapat memengaruhi pemahaman. Menyertakan variasi ini membantu tim menghindari bias desain.
>
> #### Self‑Exploration Projects
>
> 1. **Membuat Library Scenario** – Kumpulkan 5‑10 skenario untuk aplikasi transportasi, lalu buat template markdown yang dapat di‑reuse oleh tim lain. Evaluasi konsistensi struktur dan tingkat detail.
> 2. **Evaluasi Impact Scenario pada Prioritas Backlog** – Pilih dua skenario yang berbeda (satu dengan konteks sederhana, satu dengan konteks kompleks) dan lakukan workshop dengan stakeholder untuk memetakan bagaimana masing‑masing memengaruhi urutan item backlog.
>
> #### Tools and Resources
>
> - **Miro** – papan kolaboratif online untuk menulis dan memvisualisasikan scenario secara real‑time.
> - **Balsamiq Mockups** – memungkinkan pembuatan prototipe cepat berdasarkan skenario.
> - **StoryMapJS** – membantu mengorganisir serangkaian skenario menjadi story map yang menampilkan alur pengguna secara keseluruhan.
>
> #### Further Reading
>
> - Cooper, A., Reimann, R., & Cronin, D. *About Face: The Essentials of Interaction Design* (4th ed.), Wiley, 2014.
> - Pruitt, J., & Adlin, T. *The Persona Lifecycle: Keeping People in Mind Throughout Product Design*, Morgan Kaufmann, 2006.
> - Nielsen Norman Group. “Scenario‑Based Design” – https://www.nngroup.com/articles/scenario-based-design/
> - Agile Alliance. “User Story Mapping” – https://www.agilealliance.org/glossary/user‑story‑mapping/
> - ISO 9241‑210:2019 – Ergonomics of Human‑System Interaction, bagian tentang konteks penggunaan.