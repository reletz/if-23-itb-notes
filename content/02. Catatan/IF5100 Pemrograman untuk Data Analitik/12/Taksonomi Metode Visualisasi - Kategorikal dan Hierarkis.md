---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Taksonomi Metode Visualisasi - Kategorikal dan Hierarkis
>
> > ## Questions/Cues
> >
> > - Apa itu taksonomi metode visualisasi dan lima kelas metode menurut Andy Kirk?
> > - Chart apa saja yang termasuk kategorikal (dot plot, bar, histogram, radial, sankey, word cloud) dan bagaimana kode Python-nya?
> > - Chart apa saja yang termasuk hierarkis (pie, stacked bar, square pie/waffle, treemap)?
> > - Apa itu data variables dan visual variables pada tiap contoh?
> > - Mengapa pie chart sering digantikan bar chart?
> >
> > ## Reference Points
> >
> > - IF5100 — Independent Study Dataviz (Pages 1-29)
>
> > ### Tugas Mandiri dan Taksonomi
> >
> > **Independent study** ini meminta mahasiswa mencoba **semua latihan di Google Colab**, menjalankan skrip dan memahami hasilnya, lalu mengumpulkan notebook dengan nama `<NIM>_visdattut.ipynb` melalui Teams (tenggat Kamis, 12 November 2026, 15:00 WIB).
> >
> > **Taksonomi** (istilah dari biologi) adalah pengelompokan anggota yang memiliki karakteristik serupa. Andy Kirk mengelompokkan metode visualisasi menjadi lima kelas:
> >
> > ```mermaid
> > graph TD
> >     T["Method Classification"] --> C["Categorical<br/>bandingkan kategori"]
> >     T --> H["Hierarchical<br/>bagian terhadap keseluruhan"]
> >     T --> TM["Temporal<br/>perubahan sepanjang waktu"]
> >     T --> R["Relational<br/>hubungan &amp; asosiasi"]
> >     T --> S["Spatial<br/>peta &amp; geospasial"]
> >     C --> C1["Dot plot, bar chart, histogram,<br/>radial, sankey, word cloud"]
> >     H --> H1["Pie, stacked bar, square pie,<br/>treemap"]
> >     TM --> T1["Line, area, stacked area,<br/>candlestick"]
> >     R --> R1["Scatter, bubble,<br/>scatter matrix"]
> >     S --> S1["Choropleth, cartogram"]
> > ```
> >
> > Slide juga menyebut **The Chartmaker Directory**, direktori yang memetakan jenis chart ke tool pembuatnya (JS, R, Python dengan matplotlib dan seaborn, Excel, Tableau, dll.). Setiap contoh memakai kerangka: **data variables** (variabel data dan tipenya), **visual variables** (properti visual yang dipakai), dan dataset sumber.
> >
> > Dataset utama: **Indonesia Coronavirus Cases** (Kaggle, `patient.csv` dan `cases.csv`), serta Wind Rose, Energy 2050, Kickstarter, Cardekho, dan Gapminder dari plotly.
> >
> > ### 1. Categorical: Membandingkan Kategori
> >
> > **Dot plot** (2 kategorikal: province dan current_state, 1 kuantitatif: age; visual: position, color-hue):
> >
> > ```python
> > import seaborn as sns
> > sns.set()  # tema default
> > sns.catplot(x="age", y="province", hue="current_state", data=pasien, height=6, aspect=1.5)
> > ```
> >
> > Seaborn otomatis menerjemahkan variabel menjadi warna/marker tanpa pemetaan manual.
> >
> > **Bar chart** (1 kategorikal: province, 1 kuantitatif: count; position, color-hue). Data dihitung dulu dengan group by lalu diplot dengan plotly express:
> >
> > ```python
> > pasien_df = pasien.groupby(['province']).size().to_frame('count').reset_index()
> > fig = px.bar(pasien_df, y='count', x='province', text='count')
> > fig.update_traces(textposition='outside')
> > ```
> >
> > Alternatif: `plt.bar(...)` (matplotlib) atau `sns.barplot(...)`.
> >
> > **Histogram** (interval umur dan jumlah kasus; visual: height, width). Lebar interval = (max - min) / bins; jumlah kasus = group by interval. Slide memakai `sns.distplot(pasien['age'], kde=False, bins=6)` (modern: `sns.histplot`), alternatif `plt.hist(x, bins=30)`.
> >
> > **Radial chart / polar bar** (wind rose: arah, kekuatan ordinal, frekuensi; position dan color-saturation): `px.bar_polar(df, r="frequency", theta="direction", color="strength", color_discrete_sequence=px.colors.sequential.Plasma_r)`. Sumbu X dilipat melingkar di sekeliling pusat sehingga cocok untuk data **siklik** seperti arah angin; urutan ordinal kekuatan angin dikodekan dengan palet sequential.
> >
> > **Sankey diagram** (source, target, value; link, height, color-hue) menyampaikan ide **aliran (flow)**. Data berbentuk `link: {source: [...], target: [...], value: [...]}` dan `node: {label: [...]}` lalu dirender dengan `go.Sankey(node=dict(...), link=dict(...))` (contoh: prediksi energi 2050 dalam TWh). Opacity link diatur agar tumpang tindih tetap terbaca.
> >
> > **Word cloud** (kata dan frekuensi; visual: size) memakai `WordCloud(background_color='white', stopwords=STOPWORDS).generate(text)` lalu `plt.imshow(wc, interpolation="bilinear")` dan `plt.axis('off')`. Catatan Kirk: ukuran font menunjukkan frekuensi, sedangkan warna biasanya hanya dekorasi yang justru **mendistorsi** keterbacaan.
> >
> > ### 2. Hierarchical: Bagian terhadap Keseluruhan
> >
> > **Pie chart** (province dan persentase; angle, area, color-hue): `plt.pie(counts, labels=labels, autopct='%1.1f%%', colors=colors)` dengan colormap seperti `Spectral`. Catatan Kirk: **bar chart sederhana sudah cukup** untuk menunjukkan hubungan part-to-whole, dan sudut/luas lebih sulit dibandingkan panjang.
> >
> > **Stacked bar chart** (province dan gender, count; length, position, color-hue). Data di-group dua kolom lalu `unstack()` agar tiap kategori kedua menjadi kolom:
> >
> > ```python
> > tmp = pasien_df.set_index(['province','gender']).unstack()
> > tmp.columns = tmp.columns.levels[1]
> > tmp.plot(kind='bar', stacked=True)
> > ```
> >
> > **Square pie (waffle) chart** menampilkan bagian dari keseluruhan sebagai grid satuan (kotak atau simbol). Memakai `pywaffle`: `plt.figure(FigureClass=Waffle, plots={'111': {'values': ..., 'labels': ..., 'legend': {...}}}, rows=7, colors=colors)`; contoh data jenis bahan bakar mobil bekas.
> >
> > **Treemap** (negara, populasi, harapan hidup; area, position, color-hue dan saturation) membagi persegi panjang menjadi sub-persegi bersarang berukuran proporsional nilainya:
> >
> > ```python
> > df["world"] = "world"  # satu root node
> > fig = px.treemap(df, path=['world','continent','country'], values='pop',
> >                  color='lifeExp', color_continuous_scale='RdBu',
> >                  color_continuous_midpoint=np.average(df['lifeExp'], weights=df['pop']))
> > ```
> >
> > Ukuran persegi = populasi, warna = harapan hidup dengan titik tengah (midpoint) berbobot populasi.
>
> [!cornell] #### Summary
> Andy Kirk membagi metode visualisasi menjadi lima kelas: categorical, hierarchical, temporal, relational, dan spatial; tiap contoh dijelaskan lewat data variables dan visual variables. Kelas categorical mencakup dot plot (catplot), bar chart, histogram, radial/polar bar untuk data siklik, sankey untuk aliran, dan word cloud (ukuran = frekuensi, warna hanya dekorasi). Kelas hierarchical mencakup pie chart (sering lebih baik diganti bar chart), stacked bar dengan group by dan unstack, waffle chart dari pywaffle, serta treemap plotly dengan path bersarang, luas untuk nilai, dan warna untuk variabel kedua. Tugas mandiri dikerjakan di Colab dan dikumpulkan sebagai notebook.

> [!ad-libitum]- Additional Information
>
> #### Pustaka yang Dipakai
> - **seaborn/matplotlib**: statis, cocok untuk laporan dan paper.
> - **plotly (express dan graph_objects)**: interaktif (hover, zoom); `px` untuk cepat, `go` untuk kontrol penuh seperti Sankey.
> - **wordcloud** dan **pywaffle**: paket khusus yang perlu `pip install`.
>
> #### Pie vs Bar, Stacked vs Grouped
> Stacked bar mudah membandingkan **total**, tetapi hanya segmen paling bawah yang punya baseline sama; untuk membandingkan sub-kategori antar batang gunakan **grouped bar** (`sns.barplot(..., hue=...)`) atau 100% stacked bila yang penting proporsi. Pie chart bisa diterima hanya untuk 2 sampai 4 irisan dengan perbedaan besar.
>
> #### Catatan Teknis
> - Slide `distplot` dan `plt.hist(normed=True)` perlu diganti `histplot` dan `density=True`.
> - Pada Sankey, indeks `source` dan `target` mengacu ke posisi di `node.label`, bukan nama.
> - Pada word cloud, `generate(str(data['title']))` pada slide menyertakan indeks dan metadata Series; lebih tepat `" ".join(data['title'])`.
> - Treemap memerlukan setiap level `path` tanpa nilai kosong.
>
> #### Proyek Eksplorasi Mandiri
> - Ulangi bar chart, pie chart, dan treemap untuk data yang sama (misalnya pangsa pasar 6 produk) dan bandingkan keterbacaannya.
> - Bangun Sankey sederhana dari tabel flow Anda sendiri (misalnya jurusan asal ke status pekerjaan).
> - Ubah wind rose menjadi bar chart biasa dan diskusikan apa yang hilang (sifat siklik).
>
> #### Bacaan Lanjutan
> - Dokumentasi plotly Python: https://plotly.com/python/
> - The Chartmaker Directory: https://chartmaker.visualisingdata.com
> - From Data to Viz: https://www.data-to-viz.com
> - Andy Kirk, *Data Visualization: A Successful Design Process* (2012).
