---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Alur dan Komponen Threat Analysis
>
> > ## Questions/Cues
> >
> > - Apa itu threat analysis dan apa bedanya dengan threat modeling?
> > - Apa lima langkah umum alur threat analysis dan modeling?
> > - Apa saja komponen threat model (asset, vulnerability, threat, exploit, countermeasure)?
> > - Bagaimana mengidentifikasi aset dan menetapkan tujuan keamanan?
> > - Teknik apa saja yang tersedia untuk mengidentifikasi ancaman?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian pembuka s.d. "Asset Identification" dan "Define Security Concerns/Goals"
>
> > ### Threat Analysis dan Threat Modeling
> >
> > **Threat analysis** menelaah faktor manusia maupun non-manusia, memeriksa setiap vektor yang dapat membawa risiko keamanan. Aktivitasnya: mengevaluasi sistem, aset, dan alat keamanan terhadap informasi yang terkumpul; **mengidentifikasi ancaman, menilai probabilitas, dan menentukan dampaknya** (availability, confidentiality, integrity); serta mengidentifikasi **attack vector** (cara ancaman masuk ke perangkat, sistem, atau jaringan).
> >
> > **Threat modeling** adalah rumpun aktivitas untuk mengidentifikasi, mengomunikasikan, dan memahami ancaman serta mitigasinya dalam konteks melindungi sesuatu yang bernilai, lalu mendefinisikan countermeasure untuk mencegah atau mengurangi dampaknya. Sebuah threat model lazimnya memuat: (1) deskripsi subjek yang dimodelkan, (2) **asumsi** yang bisa diuji kembali seiring berubahnya lanskap ancaman, (3) ancaman potensial, (4) aksi mitigasi per ancaman, dan (5) cara memvalidasi model serta memverifikasi keberhasilan aksi.
> >
> > Karena menuntut pemahaman aset, arsitektur, protokol, dan implementasi, threat modeling dapat dikelompokkan ke fase requirement atau desain, tetapi **sebaiknya dilakukan sebagai langkah terpisah dalam security development lifecycle**.
> >
> > ```mermaid
> > flowchart LR
> >     A["1. Asset<br/>Identification"] --> B["2. Threat<br/>Identification"]
> >     B --> C["3. Threat Modeling<br/>(structuring +<br/>vulnerability analysis)"]
> >     C --> D["4. Decision<br/>Making"]
> >     D --> E["5. Control /<br/>Countermeasure Design"]
> > ```
> >
> > ### Lima Komponen Threat Model
> >
> > | Komponen | Penjelasan |
> > |---|---|
> > | **Asset** | Objek yang dilindungi; bernilai bergantung konteks/organisasi; berwujud (uang) atau tak berwujud (reputasi); termasuk aset pelanggan, mitra, karyawan |
> > | **Vulnerability** | Kelemahan sistem, umumnya karena pertahanan tak memadai atau bug; bisa di mana saja (program, OS, jaringan, database, staf internal) |
> > | **Threat** | Kemungkinan terjadinya peristiwa tak diinginkan yang merusak aset; selalu terkait aset dan bermakna jika ada vulnerability |
> > | **Exploit/Attack** | Threat yang menjadi nyata; tindakan adversary demi keuntungan atau iseng |
> > | **Countermeasure** | Ukuran untuk menghilangkan vulnerability, mengecilkan attack surface, atau membatasi dampak (firewall hingga perbaikan kode dan praktik operasi) |
> >
> > Hubungan antar-komponen sama dengan [[Vulnerability, Threat, Attack, Control, dan Incident]]: security melindungi aset dari ancaman, mengurangi nilai bagi penyerang dan kemungkinan keberhasilan serangan.
> >
> > ### Asset Identification dan Tujuan Keamanan
> >
> > Aset dapat berupa **manusia, software, hardware, infrastruktur, data, dokumen**, dll. Setelah itu tetapkan **security concern/goal** per aset dalam matriks aset x (confidentiality, integrity, availability) beserta bobot (bintang). Contoh ilustrasi: *Contact Info* (confidentiality rendah karena tidak menyimpan PII, integrity tinggi karena perlu daftar peminat akurat), *Materials* (publik dengan login, integrity tinggi dan tamper-proof, backup mingguan), *Comments*.
> >
> > ### Teknik Identifikasi Ancaman
> >
> > Beberapa teknik yang dibahas dalam materi: **STRIDE**, **PASTA**, **LINDDUN**, **Attack Tree**, **Attack Surface**, **Abuse Case**, **Misuse Case** — masing-masing dibahas pada note terpisah di folder ini.

> [!cornell] #### Summary
>
> **Threat analysis** mengevaluasi sistem untuk mengidentifikasi ancaman, probabilitas, dampak, dan attack vector; **threat modeling** menyusunnya menjadi model berisi subjek, asumsi, ancaman, mitigasi, dan validasi. Alurnya: **asset identification → threat identification → threat modeling → decision making → countermeasure design**. Komponen kuncinya adalah **asset, vulnerability, threat, exploit, dan countermeasure**, dengan tujuan keamanan per aset yang bobotnya ditentukan oleh nilai aset bagi organisasi.

> [!ad-libitum]- Additional Information
>
> #### Data Flow Diagram dan Trust Boundary
> Dalam praktik, threat modeling biasanya dimulai dari **DFD** yang menandai *trust boundary*: tempat data berpindah antara zona kepercayaan berbeda. Ancaman paling padat biasanya ada di garis batas ini. Alat bantu: Microsoft Threat Modeling Tool, OWASP Threat Dragon, dan **Threat Modeling Manifesto**.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih aplikasi kecil Anda; buat daftar aset beserta matriks CIA berbobot seperti ilustrasi.
> 2. Gambar DFD level 1, tandai trust boundary, lalu lanjutkan ke [[STRIDE dan Pemetaan Kontrol]].
>
> #### Bacaan Lanjutan
> - Shostack, *Threat Modeling: Designing for Security*
> - OWASP Threat Modeling Cheat Sheet
