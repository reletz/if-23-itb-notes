---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Konsep dan Tujuan Visualisasi Data
>
> > ## Questions/Cues
> >
> > - Apa definisi **data visualization** menurut Andy Kirk, dan apa beda scientific visualization dengan information visualization?
> > - Mengapa kita perlu memvisualisasikan data (information overload, Anscombe's quartet, kutipan Tukey dan Hamming)?
> > - Apa saja keuntungan visualisasi menurut Colin Ware, dan apa kerugian potensialnya dibanding data mentah?
> > - Apa beda exploratory, explanatory, dan exhibition visualization?
> > - Apa makna "tone" visualisasi: pragmatic/analytic versus emotive?
> >
> > ## Reference Points
> >
> > - IF5100 — Dataviz (Pages 1-26)
>
> > ### Definisi dan Cakupan Visualisasi Data
> >
> > Kuliah ini dibuka dengan kutipan **John Wilder Tukey**: nilai terbesar sebuah gambar adalah ketika ia **memaksa kita memperhatikan hal yang tidak pernah kita duga**. Visualisasi mengubah data datar yang membosankan menjadi sesuatu yang "hidup".
> >
> > Menurut **Andy Kirk (2012)**, **data visualization** adalah *representasi dan presentasi data yang memanfaatkan kemampuan persepsi visual kita untuk memperkuat kognisi (amplify cognition)*. Jadi tujuannya bukan sekadar membuat gambar menarik, melainkan membantu otak memahami data lebih cepat dan lebih dalam.
> >
> > Istilah ini adalah **umbrella term** yang mencakup:
> >
> > - **Scientific Visualization**: visualisasi data ilmiah yang berkaitan erat dengan objek dunia nyata yang punya properti spasial (misalnya citra medis, simulasi aliran fluida).
> > - **Information Visualization**: mencakup sebagian besar statistical chart dan graph, serta metafora visual/spasial lain untuk data yang **tidak punya komponen spasial bawaan** (misalnya data tabular penjualan atau jaringan sosial).
> >
> > Tujuan kuliah: peserta mampu **mengeksplorasi data** dengan visualisasi, memahami konsepnya, dan **membuat visualisasi memakai library Python**.
> >
> > ### Mengapa Perlu Visualisasi?
> >
> > - **Information overload**: volume data yang harus dicerna manusia jauh melebihi kapasitas membaca angka satu per satu. Kutipan **Richard Hamming**: *"The purpose of computing is insight, not numbers."*
> > - **Anscombe's quartet**: empat dataset dengan statistik ringkasan hampir identik (mean, variance, korelasi, garis regresi) tetapi bentuk sebaran sangat berbeda ketika di-plot. Pelajarannya: **statistik ringkasan saja bisa menyesatkan**, gambar membuka struktur yang tersembunyi.
> >
> > Keuntungan visualisasi menurut **Colin Ware (2004)**:
> >
> > - Memahami **data dalam jumlah sangat besar**.
> > - Memungkinkan persepsi **emergent properties** yang tidak diantisipasi sebelumnya.
> > - Membuat **masalah pada data itu sendiri** (outlier, nilai hilang, kesalahan input) langsung terlihat.
> > - Memfasilitasi **pembentukan hipotesis**.
> > - Memudahkan pemahaman fitur **skala besar maupun skala kecil**.
> >
> > Visualisasi juga merupakan bentuk **abstraksi**, yaitu kemampuan menyaring informasi yang tidak perlu dan menggeneralisasi yang diperlukan (kaitan dengan *computational thinking*). Slide juga meminta kita mengamati **kerugian potensial** dibanding data mentah: visualisasi membuang detail (presisi angka hilang), bisa **menyesatkan** bila encoding buruk, dan menuntut keahlian desain serta konteks pembaca.
> >
> > ### Tiga Tujuan (Goals) Visualisasi
> >
> > | Tujuan | Fungsi | Ciri |
> > | --- | --- | --- |
> > | **Exploratory** (visualization for analysis) | Mengeksplorasi dan menganalisis data | Mencoba **banyak tampilan**, audiens biasanya analis itu sendiri |
> > | **Explanatory** (visualization for communication) | Membagikan **satu sudut pandang tertentu** atas data | Pesan sudah jelas, ada narasi, audiens luas |
> > | **Exhibition** | Karya untuk dipamerkan | Estetika dan dampak emosional menonjol |
> >
> > Contoh dari Kirk (2012) ditampilkan di slide untuk ketiganya. Dalam alur kerja analitik, kita biasanya mulai dari exploratory (EDA), lalu memilih temuan penting untuk dikomunikasikan lewat explanatory.
> >
> > ### Tone: Pragmatic/Analytic vs Emotive
> >
> > Sebelum mendesain, tetapkan **intent** atau nada visualisasi:
> >
> > - **Pragmatic atau analytic**: *"Sebuah visualisasi lebih efektif daripada yang lain bila informasi yang disampaikannya lebih mudah dipersepsi"* (**Jock Mackinlay**). Fokus pada efisiensi pembacaan.
> > - **Emotive dan abstract**: berusaha membuat penonton **merasakan** skala data. Kutipan **Chris Jordan**: kita tidak cukup merasakan dan kesulitan mencerna angka-angka raksasa; visualisasi emotif menerjemahkannya menjadi pengalaman yang bisa dirasakan.
> >
> > ```mermaid
> > graph TD
> >     V["Data Visualization<br/>(amplify cognition)"] --> SV["Scientific Visualization"]
> >     V --> IV["Information Visualization"]
> >     V --> G["Tujuan"]
> >     G --> EX["Exploratory<br/>(analisis)"]
> >     G --> EP["Explanatory<br/>(komunikasi)"]
> >     G --> EH["Exhibition"]
> >     V --> T["Tone"]
> >     T --> P["Pragmatic / Analytic"]
> >     T --> E["Emotive / Abstract"]
> > ```
>
> [!cornell] #### Summary
> Data visualization adalah representasi data yang memanfaatkan persepsi visual untuk memperkuat kognisi (Andy Kirk), mencakup scientific visualization (data berproperti spasial) dan information visualization (data abstrak). Visualisasi diperlukan karena information overload dan karena statistik ringkasan bisa menipu, sebagaimana Anscombe's quartet; keuntungannya meliputi pemahaman data besar, penemuan emergent properties, terdeteksinya masalah data, dan pembentukan hipotesis, dengan kerugian berupa hilangnya detail dan risiko menyesatkan. Visualisasi dibedakan menurut tujuan (exploratory, explanatory, exhibition) dan nada (pragmatic/analytic versus emotive), yang harus ditetapkan sebelum memilih desain.

> [!ad-libitum]- Additional Information
>
> #### Anscombe's Quartet dalam Praktik
> Seaborn menyediakan dataset ini lewat `sns.load_dataset("anscombe")`. Keempat kelompok punya mean x sekitar 9, mean y sekitar 7,5, korelasi sekitar 0,816 dan garis regresi `y = 3 + 0,5x`. Memplotnya dengan `sns.lmplot(data=df, x="x", y="y", col="dataset", col_wrap=2)` langsung menunjukkan satu kelompok linier, satu kurva, satu dengan outlier, dan satu dengan satu titik berpengaruh. Versi modern, **Datasaurus Dozen**, memperlihatkan hal yang sama dengan bentuk yang lebih ekstrem.
>
> #### Exploratory vs Explanatory dalam Alur Kerja
> Analis biasanya menghasilkan puluhan plot exploratory yang cepat dan "jelek" (histogram, scatter matrix, boxplot per grup), lalu hanya beberapa yang disempurnakan menjadi explanatory: judul yang menyatakan kesimpulan, anotasi pada titik penting, warna terbatas, dan penghapusan elemen yang tidak perlu. Pertimbangkan audiens: eksekutif membutuhkan pesan, rekan analis membutuhkan detail.
>
> #### Proyek Eksplorasi Mandiri
> - Muat `anscombe` dari seaborn, hitung mean, std, dan korelasi per kelompok, lalu plot dengan `lmplot`. Tulis tiga kalimat tentang apa yang tidak tertangkap statistik.
> - Ambil satu dataset Kaggle pilihan, buat 5 plot exploratory, lalu ubah satu menjadi plot explanatory dengan judul berisi kesimpulan.
>
> #### Bacaan Lanjutan
> - Colin Ware, *Information Visualization: Perception for Design* (2004).
> - Andy Kirk, *Data Visualization: A Successful Design Process* (2012).
> - Edward Tufte, *The Visual Display of Quantitative Information*.
> - Alberto Cairo, *The Truthful Art*.
