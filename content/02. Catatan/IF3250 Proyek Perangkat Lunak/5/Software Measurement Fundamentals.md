---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Software Measurement Fundamentals
>
> > ## Questions/Cues
> >
> > - Mengapa pengukuran (metrics) penting?
> > - Apa empat level of scales dan bagaimana hierarkinya?
> > - Apa beda measure, metric, dan indicator?
> > - Apa beda direct dan indirect measure?
> > - Properti apa yang membuat metrik "baik"? Apa itu validity & reliability?
> > - Mengapa kita mengukur perangkat lunak, dan bagaimana mengklasifikasikan metrik?
> >
> > ## Reference Points
> >
> > - Software Quality and Metrics (Halaman 7-13, 17-19)
> > - Software Quality and Metrics (Halaman 21-24)
>
> > ### Mengapa Metrics Penting
> >
> > Kutipan **Lord Kelvin**: *"When you can measure what you are speaking about and express it in numbers, you know something about it; but when you cannot measure… your knowledge is of a meagre and unsatisfactory kind."* Inti: **measurement turns an art into a science**.
> >
> > Kemajuan ilmiah dibuat melalui **observasi & generalisasi** (berbasis data dan pengukuran), lalu **derivasi teori** dan **konfirmasi/refutasi** teori tersebut. Kegunaan pengukuran:
> >
> > - **Understand** — membuat aktivitas saat ini terlihat (visible), menetapkan guidelines.
> > - **Control** — memprediksi outcome dan mengubah proses.
> > - **Improve** — saat produk diukur dengan "measuring stick", kita bisa menetapkan target kualitas dan berupaya membaik.
> >
> > Proposisi yang perlu dibuktikan secara empiris (contoh): "lebih banyak testing → lebih reliable di lapangan", "menambah orang ke proyek → selesai lebih cepat". Tanpa pengukuran, proposisi-proposisi ini hanya dugaan.
> >
> > ### Levels of Scales
> >
> > Berbagai skala pengukuran, dari paling lemah ke paling kuat:
> >
> > - **Nominal Scale** — kategori tanpa urutan. Contoh: agama, warna.
> > - **Ordinal Scale** — klasifikasi berderajat/berurut. Contoh: (S/M/L), kelas 1/2/3.
> > - **Interval Scale** — selisih antar titik bermakna pasti. Contoh: temperatur. Bisa **penjumlahan/pengurangan**, tetapi **bukan** perkalian/pembagian.
> > - **Ratio Scale** — interval scale dengan **titik nol absolut**. Bisa **penjumlahan/pengurangan dan perkalian/pembagian**.
> >
> > **Measurement Scales Hierarchy**: skala bersifat hierarkis. Setiap skala lebih tinggi memiliki semua properti skala di bawahnya. Skala lebih tinggi bisa **direduksi** ke skala lebih rendah, **tetapi tidak sebaliknya**.
> >
> > ```mermaid
> > flowchart TD
> >     R["Ratio — Most powerful analysis"] --> I["Interval"] --> O["Ordinal"] --> N["Nominal — Least powerful analysis"]
> > ```
> >
> > ### Measure, Metric, dan Indicator
> >
> > - **Measure** — penilaian/penetapan dengan membandingkan ke suatu standar. Contoh: "suhu tubuh Joe 99° Fahrenheit".
> > - **Metric** — ukuran kuantitatif dari derajat suatu atribut pada sebuah elemen (mis. sistem software). Contoh: "2 error ditemukan customer dalam 18 bulan" (lebih bermakna daripada sekadar "ditemukan 2 error").
> > - **Indicator** — device/variable/metric yang menunjukkan apakah suatu state/goal tercapai; biasanya untuk menarik perhatian. Contoh: bendera setengah tiang menandakan ada yang meninggal; garis "maximum safe temperature" pada grafik.
> >
> > ### Direct dan Indirect Measures
> >
> > - **Direct Measures** — diukur langsung dari atribut yang diamati (biasanya dengan menghitung). Contoh: panjang source code, durasi proses, jumlah defect ditemukan. Dikaitkan dengan **internal attributes** (cost, effort, LOC, speed, memory).
> > - **Indirect Measures** — dihitung dari measure direct/indirect lain. Contoh: `Module Defect Density = jumlah defect / panjang source`; temperatur (diturunkan dari panjang kolom cairan). Dikaitkan dengan **external attributes** (functionality, quality, complexity, efficiency, reliability, maintainability).
> >
> > ### Properti Metrik yang Diinginkan
> >
> > Sebuah metrik yang baik idealnya:
> >
> > - **Valid and reliable (consistent)**
> > - **Objective, precise**
> > - **Intuitive**
> > - **Robust (failure-tolerant)**
> > - **Automatable and economical (practical)**
> >
> > *Caveat*: upaya mendefinisikan properti yang diinginkan secara formal masih banyak diperdebatkan.
> >
> > #### Validity dan Reliability
> >
> > Metrik yang baik harus **valid** (*measures what it is intended to measure* — mengukur yang seharusnya diukur) dan **reliable** (*yields consistent results* — menghasilkan hasil konsisten). Analogi target/dartboard:
> >
> > - **Reliable but not valid** — titik-titik berkumpul rapat tapi jauh dari pusat (konsisten, tapi salah sasaran).
> > - **Valid but not reliable** — titik-titik mengelilingi pusat tapi tersebar (rata-rata benar, tapi tidak konsisten).
> > - **Valid and reliable** — titik-titik rapat di pusat (benar dan konsisten).
> >
> > ### Mengapa Mengukur Software & Klasifikasi Metrik
> >
> > Tujuan mengukur software:
> >
> > | Tujuan | Apa yang diukur |
> > |---|---|
> > | Estimate cost and effort | korelasi antara spesifikasi dan produk akhir |
> > | Improve productivity | nilai dan biaya software |
> > | Improve software quality | usability, efficiency, maintainability, … |
> > | Improve reliability | mean time to failure, dll. |
> > | Evaluate methods and tools | productivity, quality, reliability, … |
> >
> > Kutipan pendukung: *"You cannot control what you cannot measure"* (De Marco, 1982) dan *"What is not measurable, make measurable"* (Galileo).
> >
> > **Software metrics** = segala jenis pengukuran yang terkait sistem software, proses, atau dokumentasinya. Contoh: lines of code, **Fog index** (keterbacaan dokumentasi: `0.4 × (#words / #sentences) + (% words ≥ 3 syllables)`), jumlah person-days untuk mengimplementasikan sebuah use-case.
> >
> > **Possible Problems** (mis. membandingkan produktivitas LOC/satuan waktu): apakah satuannya sama (apa itu "line of code"? apa "time unit"?), apakah konteksnya sama (apakah programmer familiar dengan bahasanya?), apakah "code size" benar yang ingin diproduksi (bagaimana dengan kualitas?), bagaimana menafsirkan hasil, dan apa yang akan dilakukan dengan hasil itu.
> >
> > **Metric Classification**:
> >
> > - **Products** — hasil eksplisit aktivitas pengembangan: deliverables, dokumentasi, by-products.
> > - **Processes** — aktivitas yang terkait produksi software.
> > - **Resources** — input ke aktivitas pengembangan: hardware, knowledge, people.

> [!cornell] #### Summary
>
> Pengukuran mengubah "seni" menjadi "sains" — membantu kita **understand, control, dan improve**. Skala pengukuran berjenjang: **Nominal → Ordinal → Interval → Ratio** (makin tinggi makin kuat analisanya, bisa direduksi ke bawah tapi tidak sebaliknya). Bedakan **measure** (vs standar), **metric** (ukuran kuantitatif atribut), dan **indicator** (penanda tercapainya goal). **Direct measure** dihitung langsung (internal attribute), **indirect measure** diturunkan (external attribute). Metrik baik harus **valid & reliable, objektif, intuitif, robust, dan praktis**. Klasifikasi metrik: **Products, Processes, Resources**. Fondasi ini menuntun ke metrik konkret di [[Size and Complexity Metrics]] dan [[Object-Oriented Metrics]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa Skala Menentukan Operasi
>
> Pada skala **interval** seperti temperatur Celsius, "20°C bukan 2× lebih panas dari 10°C" karena titik nolnya arbitrer — sehingga perkalian tidak bermakna. Pada skala **ratio** seperti LOC, "200 baris = 2× 100 baris" valid karena ada nol absolut. Memilih operasi statistik yang salah untuk skala tertentu menghasilkan kesimpulan yang menyesatkan.
>
> #### Validity vs Reliability — Mengapa Keduanya Perlu
>
> Metrik *reliable tapi tidak valid* berbahaya: ia konsisten meyakinkan, padahal salah sasaran (mis. LOC sebagai ukuran "produktivitas"). Metrik *valid tapi tidak reliable* sulit dipakai untuk keputusan karena hasilnya berubah-ubah. Hanya yang **valid + reliable** yang layak dijadikan dasar keputusan.
>
> #### Further Reading
>
> - Brian Henderson-Sellers, *Object-Oriented Metrics: Measures of Complexity*, Prentice-Hall, 1996, Ch. 2.6.
> - Stephen H. Kan, *Metrics and Models in Software Quality Engineering*, Addison Wesley, 2002, Ch. 3.4.
