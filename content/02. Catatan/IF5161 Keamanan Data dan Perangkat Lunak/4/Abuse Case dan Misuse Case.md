---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Abuse Case dan Misuse Case
>
> > ## Questions/Cues
> >
> > - Apa itu abuse case dan apa bedanya dengan use case?
> > - Kapan sebuah interaksi layak disebut abuse case?
> > - Bagaimana langkah membangun abuse case?
> > - Apa itu misuse case dan mis-actor?
> > - Bagaimana menjaga granularitas model tetap seimbang?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "UML-Based: Abuse Case", "To construct an abuse case", "Note on Abuse case", "Misuse Case"
>
> > ### Abuse Case
> >
> > **Abuse case** adalah teknik berbasis UML untuk "masuk ke pikiran penyerang". Ia mendefinisikan **interaksi antara aktor dan sistem yang menimbulkan kerugian nyata** pada sumber daya milik aktor, pemangku kepentingan, atau sistem. Abuse case menggambarkan perilaku sistem **di bawah serangan** dan memaksa kita menjawab: *apa yang dilindungi, dari siapa, dan berapa lama?* Teknik ini kurang dimanfaatkan padahal penting; contoh risiko yang ditemukan: rentan terhadap serangan tampering yang sudah dikenal.
> >
> > **Syarat "complete"**: harus ada kerugian. Interaksi yang hanya membocorkan session key kepada aktor yang tak berhak **belum** abuse case karena tidak ada kerugian. Jika diperluas dengan **kunci itu diposting di situs publik**, barulah menjadi abuse case.
> >
> > | Aspek | Use Case | Abuse Case |
> > |---|---|---|
> > | Definisi | Transaksi lengkap antara aktor dan sistem | **Keluarga** transaksi lengkap yang menimbulkan kerugian |
> > | Varian | Satu skenario | Potensial satu anggota per jenis penyalahgunaan privilege dan per komponen yang dapat dieksploitasi |
> > | Isi tambahan | - | Rentang privilege yang disalahgunakan dan deskripsi kerugian |
> >
> > ### Langkah Membangun Abuse Case
> >
> > ```mermaid
> > flowchart TB
> >     S1["1. Identifikasi aktor<br/>(malicious actor dari tiap aktor use case,<br/>tambah penyusup luar)"] --> S2["2. Identifikasi abuse case<br/>(interaksi tiap aktor, beri nama, gambar diagram)"]
> >     S2 --> S3["3. Definisikan abuse case<br/>(setelah struktur sistem cukup jelas)"]
> >     S3 --> S4["4. Cek granularitas<br/>(tidak terlalu sedikit/banyak)"]
> >     S4 --> S5["5. Cek kelengkapan &amp; minimalitas<br/>(tinjau requirement, use case, konsultasi pengguna)"]
> > ```
> >
> > - Aktor penyusup dibedakan terutama berdasar **skill dan sumber daya**.
> > - Contoh studi kasus: **laboratorium keamanan informasi berbasis internet** dengan entitas server, source, target, dan exercise; abuse case seperti mahasiswa membaca model solution sebelum waktunya atau merusak konfigurasi lab.
> >
> > **Granularitas**: hindari terlalu banyak abuse case (mencakup kasus yang mungkin tetapi tidak mungkin terjadi, detail berlebihan) maupun terlalu abstrak. Model yang baik punya **detail seragam** dan jumlah wajar.
> >
> > ### Misuse Case
> >
> > **Misuse case** adalah "use case khusus yang menggambarkan perilaku yang **tidak diinginkan** pemilik sistem". **Mis-actor/misuser** adalah aktor khusus yang memulai misuse case, **sengaja maupun tidak sengaja**. Untuk menghindari kebingungan, misuse case dan mis-actor digambar dalam format **terbalik (inverted)**. Cakupan misuser lebih luas dibanding abuse case yang berfokus pada niat jahat.

> [!cornell] #### Summary
>
> **Abuse case** memodelkan interaksi aktor-sistem yang berujung kerugian, sebagai versi "jahat" dari use case dan dibangun lewat identifikasi aktor, penamaan, definisi, pengecekan granularitas, dan kelengkapan. **Misuse case** serupa tetapi mencakup **mis-actor** yang sengaja atau tidak sengaja menimbulkan perilaku tak diinginkan, digambar terbalik di diagram. Keduanya menerjemahkan threat menjadi **kebutuhan keamanan yang dapat diuji**.

> [!ad-libitum]- Additional Information
>
> #### Dari Abuse Case ke Test
> Abuse case berguna sebagai sumber **security test case**: setiap abuse case menjadi satu pengujian negatif (lihat *abuse case test* pada [[Security Testing dan Penetration Testing]]). Ini menutup siklus dari threat modeling ke verifikasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil use case "reset password" dan turunkan minimal 3 abuse case beserta aktor jahatnya.
> 2. Ubah satu abuse case menjadi security unit test (Arrange-Act-Assert).
>
> #### Bacaan Lanjutan
> - McDermott & Fox, *Using Abuse Case Models for Security Requirements Analysis*
> - Sindre & Opdahl, *Eliciting Security Requirements with Misuse Cases*
