---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Visualisasi Temporal dan Relasional
>
> > ## Questions/Cues
> >
> > - Chart temporal apa saja (line, area, stacked area, candlestick) dan kapan sumbu y harus mulai dari nol?
> > - Bagaimana membuat subplot dan stackplot di matplotlib?
> > - Apa isi sebuah candlestick chart (open, high, low, close)?
> > - Chart relasional apa saja (scatter, bubble, scatter matrix) dan encoding apa yang dipakai?
> > - Bagaimana menambah dimensi (hue, size) pada scatter plot dan mengapa scatter matrix berguna?
> >
> > ## Reference Points
> >
> > - IF5100 — Independent Study Dataviz (Pages 30-45)
>
> > ### 3. Temporal: Perubahan sepanjang Waktu
> >
> > **Line chart** (1 kategorikal: status; 4 kuantitatif: acc_tested, acc_confirmed, acc_negative, acc_deceased; 1 interval: date; visual: position, slope, color-hue). Pandas dapat langsung memplot beberapa kolom terhadap tanggal:
> >
> > ```python
> > cases.plot('date', ['acc_tested','acc_confirmed','acc_negative','acc_deceased'], figsize=(10,8))
> > plt.title("Trend of COVID-19 Case in Indonesia by State", weight='bold')
> > plt.ylabel('case')
> > ```
> >
> > Catatan Kirk: pada line chart, sumbu y **tidak harus mulai dari nol** karena yang dibaca adalah **pola relatif** perjalanan data.
> >
> > **Area chart** (height, slope, area, color-hue) dibuat dengan `stackplot` pada subplot 2 x 2:
> >
> > ```python
> > fig, axs = plt.subplots(2, 2, figsize=(14,8))
> > axs[0,0].stackplot(cases['date'], cases['acc_deceased'], colors='red', alpha=0.6)
> > for ax in axs.flat:
> >     ax.set(xlabel='Until March 2020', ylabel='case')
> > ```
> >
> > Satu panel per status memudahkan perbandingan bentuk tanpa saling menutupi. Berbeda dengan line chart, **area chart harus mulai dari nol** supaya penilaian luas akurat.
> >
> > **Stacked area chart** menumpuk keempat seri dalam satu sumbu: `plt.stackplot(x, y1, y2, y3, y4, labels=[...], colors=[...], alpha=0.6)` lalu `plt.legend(loc='upper left')`. Cocok bila total dan komposisi sama pentingnya, namun seri paling atas sulit dibaca karena baseline-nya bergerak. (Pada data kumulatif ini, tumpukan tested+confirmed+... tidak secara semantik merupakan bagian dari satu total, jadi perlu hati-hati menafsirkannya.)
> >
> > **Candlestick chart** (date + open, high, low, close; position, height, color-hue) adalah chart keuangan: **kotak** menunjukkan selisih open dan close, **garis (wick)** menunjukkan rentang low sampai high. Candle **increasing** (close > open) default hijau, **decreasing** merah.
> >
> > ```python
> > data['Date'] = pd.to_datetime(data['Date'])
> > fig = go.Figure(data=[go.Candlestick(x=data.Date, open=data.Open,
> >                      high=data.High, low=data.Low, close=data.Close)])
> > ```
> >
> > Contoh: harga saham Apple 2010-2017.
> >
> > ### 4. Relational: Hubungan dan Asosiasi
> >
> > (Judul slide scatter plot tertulis "Temporal", tetapi isinya termasuk kelas relational.)
> >
> > **Scatter plot** (2 kuantitatif: bmi dan charges; 1 kategorikal: smoker; position, color-hue) mengungkap korelasi, klaster, dan outlier:
> >
> > ```python
> > sns.scatterplot(x=insurance_data['bmi'], y=insurance_data['charges'], hue=insurance_data['smoker'])
> > ```
> >
> > Parameter `hue` menambah dimensi kategorikal tanpa menambah sumbu; pada data insurance, perokok membentuk klaster biaya jauh lebih tinggi.
> >
> > **Bubble plot** memperluas scatter lewat **multi-encoding**: x = gdpPercap, y = lifeExp, ukuran = pop, warna = continent (Gapminder 2007):
> >
> > ```python
> > px.scatter(df.query("year==2007"), x="gdpPercap", y="lifeExp",
> >            size="pop", color="continent", hover_name="country", size_max=60)
> > ```
> >
> > Satu plot membawa empat variabel (lihat prinsip encoding pada [[Teknik Analitik Visual dan Visual Encoding]]); ukuran bubble memakai area sehingga kurang akurat dibaca dibanding posisi.
> >
> > **Scatter matrix (SPLOM)** menampilkan scatter plot untuk semua pasangan variabel kuantitatif (dataset Pima Indian Diabetes: glucose, bloodPressure, skinThickness, insulin, BMI, diabetes pedigree; warna = outcome). Memakai `go.Splom(dimensions=[dict(label=..., values=...)], marker=dict(color=df['Outcome'], colorscale='Bluered'), diagonal=dict(visible=False))`. Seperti **small multiples**, matriks ini memanfaatkan kemampuan mata mendeteksi pola lintas banyak tampilan sejenis; dragmode `select` memungkinkan seleksi titik yang tersorot di semua panel.
> >
> > ```mermaid
> > graph TD
> >     A["Pertanyaan"] --> B["Perubahan terhadap waktu?"]
> >     A --> C["Hubungan antar variabel?"]
> >     B --> B1["Tren: line chart<br/>(y bebas dari nol)"]
> >     B --> B2["Besaran/luas: area chart<br/>(y mulai dari nol)"]
> >     B --> B3["Komposisi: stacked area"]
> >     B --> B4["Harga OHLC: candlestick"]
> >     C --> C1["2 variabel: scatter + hue"]
> >     C --> C2["3-4 variabel: bubble plot"]
> >     C --> C3["Banyak variabel: scatter matrix"]
> > ```
>
> [!cornell] #### Summary
> Visualisasi temporal menunjukkan perubahan sepanjang waktu: line chart untuk pola relatif (sumbu y tidak wajib dari nol), area chart dan stacked area untuk besaran dan komposisi (sumbu y harus mulai dari nol, dibuat dengan stackplot dan subplot), serta candlestick untuk data OHLC (kotak open-close, wick low-high). Visualisasi relasional mengungkap korelasi, klaster, dan outlier: scatter plot dengan hue untuk kategori, bubble plot dengan size dan color untuk empat variabel sekaligus, dan scatter matrix untuk semua pasangan variabel numerik dengan memanfaatkan prinsip small multiples.

> [!ad-libitum]- Additional Information
>
> #### Praktik Data Waktu di Pandas
> Ubah kolom tanggal dengan `pd.to_datetime`, jadikan indeks (`df.set_index('date')`), lalu gunakan `resample('W').mean()` atau `rolling(7).mean()` untuk memperhalus fluktuasi harian sebelum diplot. Untuk tanggal pada sumbu x, gunakan `plt.gcf().autofmt_xdate()` atau `matplotlib.dates` agar label tidak bertumpuk (slide menyembunyikan tick dengan `set_xticks([])` dan memutar label 45 derajat).
>
> #### Sumbu Ganda dan Skala
> Hindari dual-axis yang menyesatkan; untuk data kumulatif dengan skala besar, pertimbangkan skala log (`plt.yscale('log')`) atau tampilkan kasus harian baru (`diff()`) sebagai bar.
>
> #### Overplotting pada Scatter
> Dengan data besar titik saling menutupi; gunakan `alpha`, ukuran marker kecil, `sns.kdeplot`, `hexbin`, atau `sns.jointplot(kind="hex")`. Ingat bahwa korelasi tidak berarti kausalitas, dan bubble berukuran area bukan jari-jari.
>
> #### Proyek Eksplorasi Mandiri
> - Plot `cases.csv` sebagai kasus harian baru (`diff`) dengan rolling mean 7 hari dan bandingkan dengan line chart kumulatif.
> - Buat candlestick dari data saham pilihan memakai `yfinance`, lalu tambahkan moving average 20 hari.
> - Dari Gapminder, buat bubble plot animasi `px.scatter(..., animation_frame="year", animation_group="country")` dan tulis tiga temuan.
> - Ganti scatter matrix dengan `sns.pairplot(df, hue="Outcome")` dan bandingkan interaktivitasnya.
>
> #### Bacaan Lanjutan
> - Dokumentasi plotly candlestick: https://plotly.com/python/candlestick-charts/
> - Hans Rosling, Gapminder (https://www.gapminder.org).
> - Wes McKinney, *Python for Data Analysis*, bab time series.
> - Andy Kirk (2012), bab tentang pemilihan metode relasional dan temporal.
