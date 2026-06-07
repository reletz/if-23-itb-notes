---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Konsep dan Elemen Supply Chain Security
>
> > ## Questions/Cues
> >
> > - Apa definisi supply chain security dan mengapa relevan untuk perangkat lunak modern?
> > - Apa saja elemen penyusun software supply chain dari source code hingga end system?
> > - Mengapa supply chain security penting (apa kata statistik pada slide)?
> > - Risiko apa saja yang dibawa oleh komponen pihak ketiga (third-party)?
> > - Mengapa transitive dependencies dan abandoned dependencies berbahaya?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "What is Supply Chain Security")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Software Supply Chain Elements")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Why Supply Chain Security Matters & Third-Party Risks")
>
> > ### Definisi Supply Chain Security
> >
> > **Supply chain security** adalah perlindungan terhadap **seluruh komponen, proses, dan aktor** dalam siklus hidup pengembangan perangkat lunak (*software development lifecycle*). Cakupannya luas: mulai dari **kode**, **dependencies**, **build tools**, **deployment pipelines**, hingga **layanan pihak ketiga** (*third-party services*). Fokus utamanya adalah memastikan **integritas** dan **keamanan** pada *setiap tahap* pengembangan dan distribusi, bukan hanya pada produk akhir. Hal ini menjadi **kritis** karena perangkat lunak modern sangat bergantung pada komponen **pihak ketiga** dan **open-source**—sebuah aplikasi biasa hari ini bisa menarik ratusan hingga ribuan dependensi yang tidak ditulis oleh tim internal, sehingga permukaan serangan (*attack surface*) meluas jauh melampaui kode buatan sendiri.
> >
> > ### Elemen Software Supply Chain
> >
> > Slide memerinci **tujuh elemen** penyusun software supply chain yang masing-masing menjadi titik potensi kompromi. **(1) Source Code**—repositori kode internal tempat tim menulis logika aplikasi. **(2) Dependencies**—pustaka (*libraries*), *frameworks*, dan *packages* yang diimpor dari luar. **(3) Build Tools**—*compiler*, *transpiler*, dan *bundler* yang mengubah kode menjadi artefak. **(4) CI/CD Pipeline**—*build server* dan *test environment* yang mengotomasi integrasi dan pengiriman. **(5) Deployment**—*hosting*, *container*, dan *orchestration* tempat aplikasi dijalankan. **(6) Updates**—*patch*, pemeliharaan, dan *versioning* yang menjaga aplikasi tetap mutakhir. **(7) End System**—sistem akhir yang dipakai pengguna.
> >
> > Cara memandangnya: rantai ini bersifat **berurutan dan saling bergantung**. Kode mengalir dari source, ditambah dependencies, dirakit oleh build tools melalui pipeline CI/CD, dikirim lewat deployment, lalu dirawat melalui updates hingga sampai ke end system. Jika **satu** mata rantai dikompromikan, integritas seluruh produk akhir ikut tercemar.
> >
> > ```mermaid
> > flowchart TD
> >     A["Source Code"] --> B["Dependencies"]
> >     B --> C["Build Tools"]
> >     C --> D["CI/CD Pipeline"]
> >     D --> E["Deployment"]
> >     E --> F["Updates"]
> >     F --> G["End System"]
> > ```
> >
> > ### Mengapa Penting dan Risiko Pihak Ketiga
> >
> > Slide menegaskan urgensi dengan beberapa angka. **Satu kerentanan** pada komponen mana pun dapat mengkompromikan **seluruh sistem**. Menurut slide, **78% organisasi mengalami serangan supply chain pada 2021** (dikutip dari *Anchore 2022 report*), dan **rata-rata biaya satu pelanggaran supply chain mencapai $4.5 juta** (dikutip dari *IBM Cost of Data Breach Report*). Organisasi umumnya memiliki **visibilitas dan kontrol yang terbatas** atas komponen pihak ketiga, dan penyerang makin sering menargetkan supply chain sebagai **jalur dengan perlawanan paling kecil** (*path of least resistance*)—lebih mudah menyusup lewat dependensi tepercaya daripada menembus pertahanan langsung target.
> >
> > **Third-Party Risks** yang spesifik mencakup: **kerentanan tak diketahui** (*unknown vulnerabilities*) pada kode pihak ketiga; **kurangnya transparansi** praktik keamanan vendor; **transitive dependencies**—dependensi-dari-dependensi yang membawa risiko tersembunyi tanpa disadari karena tidak diimpor secara langsung; **kontrol terbatas** atas pembaruan dan patch keamanan (organisasi bergantung pada jadwal vendor); serta potensi **dependensi yang ditinggalkan atau tak terawat** (*abandoned/unmaintained dependencies*) yang tidak lagi menerima perbaikan keamanan. Kombinasi faktor ini membuat permukaan serangan supply chain sulit dipetakan dan sulit dijaga sepenuhnya.
 
> [!cornell] #### Summary
>
> **Supply chain security** melindungi seluruh **komponen, proses, dan aktor** dalam siklus hidup pengembangan perangkat lunak—kode, dependencies, build tools, deployment pipelines, dan layanan pihak ketiga—dengan fokus menjaga **integritas dan keamanan di setiap tahap**. Software supply chain tersusun atas tujuh elemen berurutan: **Source Code → Dependencies → Build Tools → CI/CD Pipeline → Deployment → Updates → End System**, di mana satu mata rantai yang dikompromikan mencemari produk akhir. Slide menekankan urgensinya: **78% organisasi mengalami serangan supply chain pada 2021** dan rata-rata biaya pelanggaran **$4.5 juta**, sementara penyerang memilih supply chain sebagai **path of least resistance**. Risiko pihak ketiga utama meliputi **kerentanan tak diketahui, kurang transparansi vendor, transitive dependencies, kontrol patch terbatas, dan dependensi yang ditinggalkan**.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Mengapa Transitive Dependencies Sulit Dikelola (DI LUAR sumber)
> Sebuah aplikasi mungkin hanya mendeklarasikan 20 dependensi langsung, tetapi setelah resolusi pohon dependensi (*dependency tree*) jumlah riil yang ditarik bisa membengkak menjadi ratusan. Inilah **transitive dependencies**: paket yang Anda tidak pilih secara sadar tetapi tetap ikut terpasang. Bahaya keamanannya adalah kerentanan sering bersembunyi di **kedalaman** pohon ini—jauh dari pandangan developer. Alat seperti `npm ls`, `mvn dependency:tree`, atau **lockfile** (`package-lock.json`, `poetry.lock`) membantu memetakan dan mengunci versi seluruh pohon agar build deterministik dan auditable.
>
> #### Lebih dalam — Hardware vs Software Supply Chain (DI LUAR sumber)
> Slide ini berfokus pada software, tetapi supply chain security juga mencakup **hardware**. Kompromi dapat terjadi pada firmware, chip, atau perangkat fisik di tahap manufaktur/pengadaan—seperti diperlihatkan kasus Walkie-Talkie 2024 yang dibahas di catatan lain. Prinsipnya sama: verifikasi asal (*provenance*), integritas, dan kepercayaan terhadap pemasok di setiap titik rantai.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu proyek nyata (mis. aplikasi Node.js atau Java), jalankan `npm ls --all` atau `mvn dependency:tree`, lalu hitung berapa dependensi langsung vs transitif. Diskusikan implikasi keamanannya.
> 2. Petakan ketujuh elemen supply chain ke sebuah proyek yang Anda kenal: untuk tiap elemen, sebutkan satu skenario kompromi konkret.
> 3. Cari laporan terbaru (Anchore/IBM/Sonatype) tentang serangan supply chain dan bandingkan angkanya dengan statistik 78% dan $4.5 juta pada slide.
>
> #### Bacaan Lanjutan
> - Anchore Software Supply Chain Security Report (sumber statistik 78% pada slide).
> - IBM Cost of a Data Breach Report (sumber angka $4.5 juta pada slide).
> - NIST SP 800-161 — Supply Chain Risk Management Practices for Systems and Organizations.
