---
type: Note
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

# Cheatsheet Prak 8 IF5100 — Data Visualization

Legenda: ⚠ = jebakan/gotcha. Semua kode siap copy-paste di Colab. Contoh memakai dataset prak 7 (`phones`, `telco_churn`, `taxis`); ganti nama kolom sesuai soal.

**Daftar isi:** 0 Template notebook · 1 gdown · 2 Pendahulu pandas (catatan prak 7) · 3 Peta chart · 4 matplotlib & `.plot()` · 5 seaborn · 6 plotly · 7 Pola poin soal · 8 Checklist jebakan

---

# 0. Template notebook & alur soal

Format soal prak: **Soal 1/2/3 → poin a, b, c, … j**. Poin dikerjakan berurutan di satu notebook, tiap poin = satu sel (output harus tampil). Pola umum: baca data → inspeksi → bersihkan → fitur baru → agregasi → **plot** → simpan CSV.

```python
# Sel pertama (selalu)
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

%matplotlib inline
sns.set_theme(style="whitegrid")          # style: white, dark, whitegrid, darkgrid, ticks
pd.set_option("display.max_columns", None)  # tampilkan semua kolom
pd.set_option("display.width", 200)
```

⚠ Nama file notebook sering diminta `<NIM>_xxx.ipynb`. Jangan lupa jalankan **Runtime → Run all** sebelum submit agar semua output tersimpan.

---

# 1. Ambil dataset dengan gdown

```python
!pip install -q gdown          # Colab biasanya sudah ada; -q = quiet
import gdown
```

```python
# (a) dari FILE ID (bagian di antara /d/ dan /view pada link share)
# link: https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing  → id = 1AbCdEfGhIjKlMnOp
gdown.download(id="1AbCdEfGhIjKlMnOp", output="telco_churn.csv", quiet=False)

# (b) dari URL lengkap (fuzzy = ekstrak id otomatis dari link share)
gdown.download("https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing",
               output="telco_churn.csv", fuzzy=True)

# (c) format URL uc?id=
gdown.download("https://drive.google.com/uc?id=1AbCdEfGhIjKlMnOp", "telco_churn.csv", quiet=False)

# (d) versi command line (sel Colab, awalan !)
!gdown 1AbCdEfGhIjKlMnOp -O telco_churn.csv
!gdown --fuzzy "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view" -O telco_churn.csv

# (e) satu FOLDER Drive (maks 50 file)
gdown.download_folder("https://drive.google.com/drive/folders/1FolderIdXXXX",
                      output="data", quiet=False, use_cookies=False)
# CLI: !gdown --folder "https://drive.google.com/drive/folders/1FolderIdXXXX" -O data

# (f) file zip → ekstrak
!unzip -q data.zip -d data
```

```python
# Cek file sudah ada
print(os.listdir("."))          # atau  !ls -lh
os.path.exists("telco_churn.csv")

# Baca
df = pd.read_csv("telco_churn.csv")
```

Opsi `read_csv` yang sering dipakai:

```python
pd.read_csv("f.csv", sep=";")                       # pemisah bukan koma
pd.read_csv("f.csv", encoding="latin-1")            # error UnicodeDecodeError
pd.read_csv("f.csv", index_col="id")                # kolom jadi index
pd.read_csv("f.csv", parse_dates=["pickup", "dropoff"])   # langsung datetime
pd.read_csv("f.csv", na_values=["?", "-", "N/A"])   # penanda NaN tambahan
pd.read_csv("f.csv", usecols=["a", "b"])            # hanya kolom tertentu
pd.read_csv("f.csv", nrows=1000)                    # baca 1000 baris pertama
pd.read_csv("f.csv", dtype={"zip": str})            # paksa tipe
pd.read_excel("f.xlsx", sheet_name="Sheet1")        # Excel
pd.read_json("f.json")
```

⚠ Jika file sudah ada, `gdown` bisa menolak/melewati unduhan; hapus dulu (`!rm file`) bila ingin unduh ulang. ⚠ Kuota Drive terlampaui → error "Too many users have viewed or downloaded"; coba lagi nanti atau `Add shortcut/Make a copy` lalu pakai id salinan.

---

# 2. Pendahulu pandas (catatan prak 7)

## 2.1 Inspeksi data

```python
df.head()            # 5 baris awal;  df.head(3)
df.tail()            # 5 baris akhir; df.tail(3)
df.shape             # (baris, kolom);  df.shape[0] baris, df.shape[1] kolom
df.columns           # nama kolom;  df.columns.tolist()
df.dtypes            # tipe tiap kolom
df.info()            # tipe + non-null count + memori
df.describe()        # statistik numerik;  df.describe(include="all"), include="object"
df.nunique()         # jumlah nilai unik per kolom
df["col"].unique()   # nilai unik
df["col"].value_counts()                  # frekuensi
df["col"].value_counts(normalize=True)    # proporsi (0-1)
(df["col"].value_counts(normalize=True) * 100).round(2)   # persen
df["col"].value_counts(dropna=False)      # hitung NaN juga
df.sample(5, random_state=42)             # 5 baris acak
len(df)              # jumlah baris
df.duplicated().sum()                     # jumlah baris duplikat
df.drop_duplicates(inplace=True)
```

## 2.2 Missing value

```python
df.isna().sum()                       # NaN per kolom   (isnull() sama)
df.isna().sum().sum()                 # total NaN
df.isna().mean() * 100                # persen NaN per kolom
df[df.isna().any(axis=1)]             # baris yang punya NaN

df.dropna()                           # buang baris yang punya NaN
df.dropna(subset=["a", "b"])          # hanya cek kolom tertentu
df.dropna(axis=1)                     # buang KOLOM yang punya NaN
df.dropna(thresh=5)                   # sisakan baris dengan >=5 nilai non-NaN

df["a"] = df["a"].fillna(df["a"].mean())       # rata-rata
df["a"] = df["a"].fillna(df["a"].median())     # median
df["c"] = df["c"].fillna(df["c"].mode()[0])    # modus (mode() mengembalikan Series → [0])
df["a"] = df["a"].fillna(0)                    # konstanta
df = df.ffill()    # isi dengan nilai sebelumnya;  df.bfill() nilai sesudahnya
df["a"] = df["a"].interpolate()                # interpolasi linear
```

⚠ Hindari `df["a"].fillna(..., inplace=True)` (chained assignment, pandas baru memberi warning). Pakai `df["a"] = df["a"].fillna(...)`.

## 2.3 Tipe data & konversi

```python
df["a"] = df["a"].astype(float)       # int, float, str, "category", "int64"
df["a"] = pd.to_numeric(df["a"], errors="coerce")   # teks aneh → NaN
# kasus soal: total_charges berisi " "
(df["total_charges"] == " ").sum()                  # hitung spasi (harus 17)
df["total_charges"] = df["total_charges"].replace(" ", 0).astype(float)
# alternatif aman
df["total_charges"] = pd.to_numeric(df["total_charges"], errors="coerce").fillna(0)

df["c"] = df["c"].astype("category")
# ubah semua kolom teks ber-unique <=10 jadi category
cols = [c for c in df.select_dtypes(include="object").columns if df[c].nunique() <= 10]
df[cols] = df[cols].astype("category")
print(cols)
df.select_dtypes(include="number")    # hanya numerik;  exclude="number", include=["object","category"]
```

## 2.4 Datetime

```python
df["pickup"]  = pd.to_datetime(df["pickup"])         # opsi: format="%Y-%m-%d %H:%M:%S", errors="coerce"
df["dropoff"] = pd.to_datetime(df["dropoff"])

df["duration_min"] = ((df["dropoff"] - df["pickup"]).dt.total_seconds() / 60).round(1)

df["pickup_hour"] = df["pickup"].dt.hour             # 0-23
df["pickup_day"]  = df["pickup"].dt.day_name()       # 'Saturday' (Inggris)
df["month"]       = df["pickup"].dt.month            # 1-12
df["month_name"]  = df["pickup"].dt.month_name()
df["year"]        = df["pickup"].dt.year
df["dow"]         = df["pickup"].dt.dayofweek        # Senin=0 … Minggu=6
df["date"]        = df["pickup"].dt.date
df["is_weekend"]  = df["pickup"].dt.dayofweek >= 5   # atau pickup_day.isin(["Saturday","Sunday"])

# resample (index harus datetime)
df.set_index("pickup").resample("D")["total"].sum()  # D harian, W mingguan, M/ME bulanan, h per jam
```

## 2.5 String

```python
df["contract"] = df["contract"].str.strip().str.lower()
df["c"].str.upper();  df["c"].str.title();  df["c"].str.len()
df["c"].str.replace("-", " ", regex=False)
df["c"].str.contains("gaming", case=False, na=False)   # boolean
df["c"].str.startswith("A");  df["c"].str.endswith("GB")
df["c"].str.split("-").str[0]          # ambil bagian pertama  (Midrange-Gaming → Midrange)
df["c"].str.split("-", expand=True)    # pecah ke beberapa kolom
df["c"].str.extract(r"(\d+)")          # ambil angka dengan regex
df["c"].str.replace("GB", "").astype(float)
```

## 2.6 Kolom baru

```python
df["price_per_gb"] = (df["price"] / df["storage_in_gb"]).round(2)

# apply dengan fungsi (contoh convert_storage)
def convert_storage(s):
    s = str(s).upper().strip()
    if s.endswith("TB"):
        return float(s[:-2]) * 1024
    if s.endswith("GB"):
        return float(s[:-2])
    return np.nan
df["storage_in_gb"] = df["storage"].apply(convert_storage)

df["primary_category"] = df["category"].apply(lambda x: x.split("-")[0])

# map dictionary (Yes/No → 1/0)
df["churn"] = df["churn"].map({"Yes": 1, "No": 0})
df["contract_code"] = df["contract"].map({"month-to-month": 0, "one year": 1, "two year": 2})

# np.where (if-else) dan np.select (banyak kondisi)
df["is_long"] = np.where(df["distance"] > 10, "Long", "Short")
conds   = [df["distance"] < q1, df["distance"] > q3]
choices = ["Short", "Long"]
df["trip_category"] = np.select(conds, choices, default="Medium")

# pd.cut = batas tetap.  include_lowest=True agar 0 masuk grup pertama
df["tenure_group"] = pd.cut(df["tenure_months"],
                            bins=[0, 12, 36, 72],
                            labels=["Baru", "Menengah", "Loyal"],
                            include_lowest=True)   # interval (a,b] kecuali yang pertama
# pd.qcut = batas berdasarkan kuantil (jumlah data sama)
df["q"] = pd.qcut(df["total"], q=4, labels=["Q1", "Q2", "Q3", "Q4"])
q1, q3 = df["distance"].quantile([0.25, 0.75])

df = df.rename(columns={"old": "new"})
df = df.drop(columns=["a", "b"])           # hapus kolom
df = df.drop(index=[0, 1])                 # hapus baris by index
df = df.reset_index(drop=True)
df.sort_values("total", ascending=False)   # multi: by=["a","b"], ascending=[True,False]
df.nlargest(10, "total");  df.nsmallest(10, "total")
```

⚠ `pd.cut` default `right=True` → interval `(0,12]`, sehingga nilai **0 menjadi NaN** kecuali `include_lowest=True`. Cek: `df["tenure_group"].isna().sum()` harus 0.

## 2.7 Filter baris

```python
df[df["total"] > 20]
df[(df["distance"] > 10) | (df["duration_min"] > 45)]          # | atau, & dan, ~ not  (WAJIB tanda kurung)
df[(df["is_weekend"]) & (df["distance"] > 10)]
df[df["borough"].isin(["Manhattan", "Queens"])]
df[~df["borough"].isin(["Bronx"])]
df[df["c"].between(10, 20)]
df.query("distance > 10 and passengers > 0")
df.loc[df["distance"] == 0, "distance"] = np.nan    # ubah nilai kondisional
df.loc[:, ["a", "b"]];  df.iloc[:5, :3]
# filter gabungan + tampilkan kolom tertentu (soal 3i: akhir pekan & (jarak>10 atau durasi>45))
mask = df["is_weekend"] & ((df["distance"] > 10) | (df["duration_min"] > 45))
print(mask.sum())                                   # jumlah data
df.loc[mask, ["pickup", "pickup_borough", "distance", "duration_min", "total"]].head()
# hapus baris tidak masuk akal + hitung yang dihapus
n0 = len(df)
df = df[(df["distance"] != 0) & (df["passengers"] != 0) & (df["duration_min"] > 0)]
print("dihapus:", n0 - len(df))
```

## 2.8 Gabung data

```python
# kolom kunci harus sama namanya → rename dulu
prices = prices.rename(columns={"phone_name": "name"})
m = pd.merge(phones, prices, on="name", how="inner")    # how: inner, left, right, outer
m = pd.merge(a, b, left_on="id_a", right_on="id_b", how="left")
m = pd.merge(a, b, on="id", suffixes=("_a", "_b"))
pd.concat([df1, df2], axis=0, ignore_index=True)        # tumpuk baris;  axis=1 sebelah-menyebelah
```

## 2.9 Groupby, agregasi, tabel silang

```python
df.groupby("borough")["total"].mean().round(2)
df.groupby("borough")[["distance", "total"]].mean().round(2)
df.groupby("borough").agg(avg_dist=("distance", "mean"),
                          max_total=("total", "max"),
                          n=("total", "size")).round(2)
df.groupby(["payment", "color"], observed=True)["tip"].mean().round(2)   # ⚠ category → observed=True
df.groupby("churn")[["tenure_months", "monthly_charges"]].mean()
df.groupby("c").size()                 # jumlah per grup;  .count() hitung non-NaN
df.groupby("c").agg(["mean", "std"])
df.groupby("c")["x"].transform("mean") # hasil sepanjang df asli
df.groupby("c").apply(lambda g: g.nlargest(3, "x"))   # top-3 per grup

pd.pivot_table(df, values="total", index="pickup_day", columns="color",
               aggfunc="mean", fill_value=0)
pd.crosstab(df["contract"], df["churn"])                       # hitung
pd.crosstab(df["contract"], df["churn"], normalize="index")    # persen per baris
```

## 2.10 Encoding & korelasi

```python
df = df.drop(columns=["customer_id", "gender", "contract"])
print(df.shape)                                              # sebelum
df = pd.get_dummies(df, columns=["internet_service", "payment_method", "tenure_group"])
print(df.shape)                                              # sesudah
pd.get_dummies(df, columns=[...], drop_first=True, dtype=int)   # dtype=int → 0/1 bukan True/False

df.corr(numeric_only=True)                                   # matriks korelasi
df.corr()["churn"].drop("churn").sort_values(ascending=False)
df.corr()["churn"].abs().sort_values(ascending=False).head(4)   # 3 terbesar (index 0 = churn sendiri)
corr = df.corr(numeric_only=True)["total"].abs()
corr[corr < 0.1]                                             # korelasi rendah
```

⚠ `get_dummies` menghasilkan kolom `bool` (True/False) di pandas baru; tambah `dtype=int` jika perlu 0/1 untuk korelasi/model.

## 2.11 Simpan

```python
df.to_csv("harga_hp_new.csv", index=False)       # index=False supaya tidak ada kolom Unnamed: 0
pd.read_csv("harga_hp_new.csv").shape            # baca kembali & cek dimensi
df.to_excel("out.xlsx", index=False)
```

---

# 3. Peta: mau tampilkan apa → pakai chart apa

| Tujuan | Chart | matplotlib | seaborn | plotly express |
|---|---|---|---|---|
| Distribusi 1 variabel numerik | histogram, KDE | `plt.hist` | `histplot`, `kdeplot` | `px.histogram` |
| Ringkasan sebaran + outlier | boxplot, violin | `plt.boxplot`, `violinplot` | `boxplot`, `violinplot` | `px.box`, `px.violin` |
| Jumlah per kategori | bar / count | `plt.bar` | `countplot` | `px.bar` |
| Perbandingan nilai antar kategori | bar (mean/sum) | `plt.bar`/`barh` | `barplot` | `px.bar` |
| Komposisi (bagian dari total) | pie, stacked bar, treemap, sunburst | `plt.pie` | — (pakai pandas/plt) | `px.pie`, `px.treemap`, `px.sunburst` |
| Hubungan 2 variabel numerik | scatter | `plt.scatter` | `scatterplot`, `regplot` | `px.scatter` |
| Hubungan 3 variabel | bubble | `plt.scatter(s=)` | `scatterplot(size=)` | `px.scatter(size=)` |
| Banyak variabel sekaligus | scatter matrix, heatmap korelasi | `pd.plotting.scatter_matrix` | `pairplot`, `heatmap` | `px.scatter_matrix`, `go.Splom` |
| Tren waktu | line, area | `plt.plot`, `stackplot` | `lineplot` | `px.line`, `px.area` |
| Harga saham (OHLC) | candlestick | — | — | `go.Candlestick` |
| Hierarki | treemap, sunburst | — | — | `px.treemap`, `px.sunburst` |
| Aliran antar kategori | Sankey | — | — | `go.Sankey` |
| Pola 2 dimensi / matriks | heatmap | `plt.imshow` | `heatmap` | `px.imshow`, `px.density_heatmap` |
| Arah / siklik (jam, arah angin) | polar bar | `plt.subplot(polar=True)` | — | `px.bar_polar` |

Taksonomi deck: **kategorikal** (bar, pie, …), **hierarkis** (treemap, sunburst), **temporal** (line, area, stacked area, candlestick), **relasional** (scatter, bubble, scatter matrix), **statistik** (hist, box, KDE, heatmap).

---

# 4. matplotlib & pandas `.plot()`

## 4.1 Dasar: figure & axes

```python
# gaya cepat (pyplot)
plt.figure(figsize=(8, 5))
plt.plot(x, y)
plt.title("Judul"); plt.xlabel("Sumbu X"); plt.ylabel("Sumbu Y")
plt.show()

# gaya OO (disarankan, wajib untuk subplot)
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y)
ax.set_title("Judul"); ax.set_xlabel("X"); ax.set_ylabel("Y")
plt.tight_layout()
plt.show()

# banyak panel
fig, axes = plt.subplots(2, 2, figsize=(12, 8))     # axes[0,0], axes[0,1], …
axes[0, 0].hist(df["a"]); axes[0, 0].set_title("A")
fig, axes = plt.subplots(1, 3, figsize=(15, 4), sharey=True)
axes = axes.ravel()                                  # jadikan 1D untuk di-loop
for ax, col in zip(axes, ["a", "b", "c"]):
    ax.hist(df[col]); ax.set_title(col)
fig.suptitle("Judul besar", fontsize=14)
plt.subplot(1, 2, 1)   # gaya pyplot: (baris, kolom, indeks mulai 1)
```

## 4.2 Semua jenis plot

```python
# LINE
plt.plot(x, y, color="tab:blue", linestyle="--", linewidth=2, marker="o", markersize=5, label="Seri A")
plt.plot(x, y2, "r-o")                 # format singkat: warna + garis + marker

# BAR vertikal / horizontal
counts = df["primary_category"].value_counts()
plt.bar(counts.index, counts.values, color="steelblue", edgecolor="black")
plt.barh(counts.index, counts.values)
for i, v in enumerate(counts.values):                  # tulis angka di atas bar
    plt.text(i, v + 0.5, str(v), ha="center")
# atau (matplotlib>=3.4)
bars = plt.bar(counts.index, counts.values); plt.bar_label(bars)

# BAR berkelompok (grouped)
w = 0.4; idx = np.arange(len(cats))
plt.bar(idx - w/2, a, w, label="A"); plt.bar(idx + w/2, b, w, label="B")
plt.xticks(idx, cats)
# BAR bertumpuk (stacked)
plt.bar(cats, a, label="A"); plt.bar(cats, b, bottom=a, label="B")

# HISTOGRAM
plt.hist(df["a"], bins=30, color="skyblue", edgecolor="black", alpha=0.7)
plt.hist(df["a"], bins=30, density=True)              # density=True (bukan normed)
plt.hist(df["a"], bins=[0, 10, 20, 50], cumulative=False)
plt.axvline(df["a"].mean(), color="red", linestyle="--", label="mean")

# BOXPLOT
plt.boxplot(df["a"].dropna())
plt.boxplot([g["a"] for _, g in df.groupby("c")], labels=sorted(df["c"].unique()))   # per grup (tick_labels di mpl>=3.9)
plt.boxplot(x, vert=False, showmeans=True)

# VIOLIN
plt.violinplot([g["a"].values for _, g in df.groupby("c")], showmeans=True)

# SCATTER
plt.scatter(df["a"], df["b"], c=df["z"], s=df["w"]*10, cmap="viridis", alpha=0.6, edgecolors="k")
plt.colorbar(label="z")

# PIE
plt.pie(counts.values, labels=counts.index, autopct="%1.1f%%", startangle=90,
        explode=[0.05] + [0]*(len(counts)-1), colors=plt.cm.Set3.colors, shadow=False)
plt.axis("equal")
plt.pie(counts, labels=counts.index, autopct="%1.1f%%", wedgeprops={"width": 0.4})   # donut

# AREA & STACKED AREA
plt.fill_between(x, y, alpha=0.4)
plt.stackplot(x, y1, y2, y3, labels=["A", "B", "C"], alpha=0.8)

# ERRORBAR
plt.errorbar(x, y, yerr=err, fmt="o-", capsize=3)

# HEATMAP / gambar matriks
plt.imshow(matrix, cmap="coolwarm", aspect="auto"); plt.colorbar()
plt.xticks(range(len(cols)), cols, rotation=90); plt.yticks(range(len(cols)), cols)

# HEXBIN, 2D histogram
plt.hexbin(df["a"], df["b"], gridsize=30, cmap="Blues"); plt.colorbar()
plt.hist2d(df["a"], df["b"], bins=30)

# STEP, STEM
plt.step(x, y, where="mid"); plt.stem(x, y)

# POLAR
ax = plt.subplot(projection="polar"); ax.bar(theta, r, width=0.3)
```

## 4.3 Styling

```python
plt.title("Judul", fontsize=14, fontweight="bold", loc="left")   # loc: center, left, right
plt.xlabel("X", fontsize=12); plt.ylabel("Y", fontsize=12)
plt.xticks(rotation=45, ha="right")                  # putar label
plt.xticks(ticks=[0, 1, 2], labels=["a", "b", "c"])
plt.yticks(np.arange(0, 101, 20))
plt.xlim(0, 100); plt.ylim(0, 50)
plt.yscale("log")                                     # xscale("log")
plt.grid(True, linestyle=":", alpha=0.5)              # axis="y"
plt.legend(title="Kategori", loc="upper right", fontsize=9)   # loc: best, upper left, lower center, …
plt.legend(bbox_to_anchor=(1.02, 1), loc="upper left")        # legend di luar plot
plt.axhline(0, color="gray"); plt.axvline(5, color="red", linestyle="--")
plt.axvspan(2, 4, alpha=0.2)                          # blok warna
plt.annotate("puncak", xy=(x0, y0), xytext=(x0+1, y0+5), arrowprops=dict(arrowstyle="->"))
plt.text(x0, y0, "teks", ha="center", va="bottom")
plt.gca().invert_yaxis()
plt.gca().spines[["top", "right"]].set_visible(False)
plt.style.use("ggplot")   # seaborn-v0_8, fivethirtyeight, dark_background, default → daftar: plt.style.available
plt.rcParams["figure.figsize"] = (10, 6)              # default global
plt.rcParams["font.size"] = 12
plt.tight_layout()                                    # cegah label terpotong
plt.savefig("chart.png", dpi=300, bbox_inches="tight")   # SEBELUM plt.show()
plt.show()
plt.close()                                           # tutup figure (hemat memori)
```

Warna: nama (`"red"`, `"steelblue"`), kode hex `"#1f77b4"`, siklus `"tab:blue"`, `"C0"`; cmap: `viridis, plasma, coolwarm, RdBu, Blues, YlOrRd, Set2, tab10`. Marker: `o s ^ v * + x D .`; linestyle: `- -- -. :`.

Dua sumbu y:

```python
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax1.bar(x, y1, color="lightblue"); ax2.plot(x, y2, "r-o")
ax1.set_ylabel("Jumlah"); ax2.set_ylabel("Rata-rata")
```

## 4.4 pandas `.plot()` (pembungkus matplotlib)

```python
df["a"].plot(kind="hist", bins=30, title="Judul", figsize=(8, 4))
df["a"].plot.hist(bins=30); df["a"].plot.kde()
df["c"].value_counts().plot(kind="bar", color="teal", edgecolor="black", rot=0)
df["c"].value_counts().plot.barh()
df["c"].value_counts().plot(kind="pie", autopct="%.1f%%", ylabel="")
df.groupby("c")["a"].mean().plot(kind="bar", rot=45)
df.plot(x="a", y="b", kind="scatter", c="z", colormap="viridis", s=20)
df.plot(x="date", y="total", kind="line", marker="o")
df[["a", "b", "c"]].plot(kind="line", subplots=True, layout=(3, 1), figsize=(8, 8))
df.plot(kind="area", stacked=True, alpha=0.5)
df.plot(kind="box"); df[["a","b"]].plot.box()
df.boxplot(column="a", by="c")                        # boxplot per grup
df.plot(kind="bar", stacked=True)                     # bar bertumpuk (kolom = seri)
pd.crosstab(df["c1"], df["c2"]).plot(kind="bar", stacked=True)
df.plot.hexbin(x="a", y="b", gridsize=25)
df.hist(bins=20, figsize=(12, 8))                     # histogram semua kolom numerik
pd.plotting.scatter_matrix(df[["a", "b", "c"]], figsize=(8, 8), diagonal="kde")
ax = df["a"].plot(kind="hist"); ax.set_xlabel("A"); ax.set_title("…")   # kembalikan Axes → styling
fig, ax = plt.subplots(); df["a"].plot(ax=ax)         # gambar ke axes tertentu
plt.show()
```

`kind` valid: `line, bar, barh, hist, box, kde/density, area, pie, scatter, hexbin`.

## 4.5 matplotlib tambahan (jarang, tapi mungkin muncul)

```python
# Skala log
plt.semilogx(x, y); plt.semilogy(x, y); plt.loglog(x, y)

# Contour / 2D field
X, Y = np.meshgrid(np.linspace(-3, 3, 100), np.linspace(-3, 3, 100))
Z = np.exp(-(X**2 + Y**2))
cs = plt.contour(X, Y, Z, levels=10, cmap="viridis"); plt.clabel(cs)     # garis
plt.contourf(X, Y, Z, levels=10, cmap="viridis"); plt.colorbar()          # terisi
plt.pcolormesh(X, Y, Z, shading="auto", cmap="viridis")

# Vektor
plt.quiver(X[::10, ::10], Y[::10, ::10], U[::10, ::10], V[::10, ::10])
plt.streamplot(X, Y, U, V)

# Event / gantt sederhana
plt.eventplot([[1, 2, 5], [2, 4]], lineoffsets=[0, 1])
plt.broken_barh([(10, 20), (40, 10)], (0, 5), facecolors="tab:blue")      # (xmulai, lebar), (ymulai, tinggi)

# Plot 3D
from mpl_toolkits.mplot3d import Axes3D        # opsional di versi baru
ax = plt.figure(figsize=(7, 6)).add_subplot(projection="3d")
ax.scatter(df["a"], df["b"], df["c"], c=df["c"], cmap="viridis")
ax.plot_surface(X, Y, Z, cmap="viridis"); ax.plot_wireframe(X, Y, Z)
ax.set_xlabel("X"); ax.set_ylabel("Y"); ax.set_zlabel("Z"); ax.view_init(elev=30, azim=45)

# Tabel di dalam plot
plt.table(cellText=[[1, 2], [3, 4]], colLabels=["A", "B"], loc="bottom")

# Layout tidak seragam
import matplotlib.gridspec as gridspec
fig = plt.figure(figsize=(10, 6)); gs = gridspec.GridSpec(2, 3, figure=fig)
ax1 = fig.add_subplot(gs[0, :]); ax2 = fig.add_subplot(gs[1, 0]); ax3 = fig.add_subplot(gs[1, 1:])
fig, axd = plt.subplot_mosaic([["A", "A", "B"], ["C", "D", "D"]])        # cara lain; axd["A"].plot(...)

# Inset
ins = ax.inset_axes([0.6, 0.6, 0.35, 0.35]); ins.plot(x, y)

# Format tick & tanggal
import matplotlib.dates as mdates
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y")); fig.autofmt_xdate()
from matplotlib.ticker import PercentFormatter, FuncFormatter
ax.yaxis.set_major_formatter(PercentFormatter(1.0))
ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:,.0f}"))     # ribuan: 1,000
ax.set_xticks(range(0, 24, 3)); ax.tick_params(axis="x", labelsize=9)

# Box dengan beberapa seri, bar horizontal berkelompok, bar dengan error
ax.bar(cats, vals, yerr=err, capsize=4); ax.set_axisbelow(True)
```

⚠ Bagian 4.5 ditulis dari dokumentasi matplotlib dan belum dijalankan; cek jika ada error versi.

---

# 5. seaborn

Semua fungsi menerima `data=df, x="col", y="col", hue="col"`. Fungsi **axes-level** (`scatterplot`, `histplot`, …) menggambar ke `ax`; **figure-level** (`relplot`, `displot`, `catplot`, `pairplot`, `lmplot`, `jointplot`) membuat figure sendiri dan mendukung `col=`/`row=`.

```python
sns.set_theme(style="whitegrid", palette="Set2", font_scale=1.1)
fig, ax = plt.subplots(figsize=(8, 5))     # untuk axes-level: sns.xxx(..., ax=ax)
```

## 5.1 Distribusi

```python
sns.histplot(data=df, x="a", bins=30, kde=True, color="skyblue")
sns.histplot(data=df, x="a", hue="churn", multiple="stack")        # multiple: layer, stack, dodge, fill
sns.histplot(data=df, x="a", stat="density")                       # stat: count, frequency, probability, percent, density
sns.histplot(data=df, x="a", y="b")                                # 2D
sns.kdeplot(data=df, x="a", hue="churn", fill=True, common_norm=False)
sns.ecdfplot(data=df, x="a")
sns.rugplot(data=df, x="a")
sns.displot(data=df, x="a", col="churn", kde=True)                 # figure-level; kind="hist"|"kde"|"ecdf"
# ⚠ distplot sudah deprecated → pakai histplot/displot
```

## 5.2 Kategorikal

```python
sns.countplot(data=df, x="primary_category",
              order=df["primary_category"].value_counts().index, hue="churn")
ax = sns.countplot(data=df, x="c"); ax.bar_label(ax.containers[0])   # angka di atas bar
sns.barplot(data=df, x="borough", y="total", estimator="mean", errorbar=None)   # errorbar: "sd", ("ci",95), None (dulu ci=None)
sns.barplot(data=df, x="c", y="a", hue="d", order=[…], palette="viridis")
sns.boxplot(data=df, x="c", y="a", hue="d", showfliers=False, order=[…])
sns.violinplot(data=df, x="c", y="a", inner="quartile", split=True, hue="d")   # split perlu hue 2 level
sns.boxenplot(data=df, x="c", y="a")
sns.stripplot(data=df, x="c", y="a", jitter=True, alpha=0.5)
sns.swarmplot(data=df, x="c", y="a", size=3)
sns.pointplot(data=df, x="c", y="a", hue="d")
sns.catplot(data=df, x="c", y="a", kind="bar", col="d", height=4, aspect=1)    # kind: strip, swarm, box, violin, boxen, point, bar, count
```

## 5.3 Relasional

```python
sns.scatterplot(data=df, x="a", y="b", hue="c", size="d", style="e", alpha=0.7, palette="deep", sizes=(20, 200))
sns.lineplot(data=df, x="hour", y="total", hue="day", marker="o", errorbar=None)   # default rata-rata + CI
sns.relplot(data=df, x="a", y="b", col="c", kind="scatter")       # kind: scatter, line
sns.regplot(data=df, x="a", y="b", scatter_kws={"alpha": 0.4}, line_kws={"color": "red"})
sns.lmplot(data=df, x="a", y="b", hue="c", height=5)
sns.residplot(data=df, x="a", y="b")
```

## 5.4 Matriks, korelasi

```python
corr = df.corr(numeric_only=True)
plt.figure(figsize=(10, 8))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", center=0, vmin=-1, vmax=1,
            linewidths=0.5, square=True, cbar_kws={"label": "korelasi"})
mask = np.triu(np.ones_like(corr, dtype=bool))                     # segitiga bawah saja
sns.heatmap(corr, mask=mask, annot=True, fmt=".2f", cmap="coolwarm")
# heatmap tabel silang
sns.heatmap(pd.crosstab(df["a"], df["b"]), annot=True, fmt="d", cmap="Blues")
sns.heatmap(pd.pivot_table(df, values="total", index="day", columns="hour"), cmap="YlOrRd")
sns.clustermap(corr, cmap="vlag", annot=True)
```

## 5.5 Multi-plot

```python
sns.pairplot(df[["a", "b", "c", "churn"]], hue="churn", diag_kind="kde", corner=True)
sns.jointplot(data=df, x="a", y="b", kind="scatter")              # kind: scatter, kde, hist, hex, reg, resid
g = sns.FacetGrid(df, col="c", row="d", height=3, sharex=True)
g.map_dataframe(sns.histplot, x="a")
g.set_axis_labels("A", "Frekuensi"); g.set_titles("{col_name}")
```

## 5.6 Tema & finishing

```python
sns.set_theme(style="ticks", context="talk")     # context: paper, notebook, talk, poster
sns.set_palette("husl")                          # deep, muted, pastel, bright, dark, colorblind, Set1-3, viridis, rocket, mako
sns.color_palette("Blues", 5)
sns.despine()                                     # hilangkan garis atas & kanan
ax.set_title("…"); ax.set_xlabel("…"); ax.tick_params(axis="x", rotation=45)
plt.setp(ax.get_xticklabels(), rotation=45, ha="right")
sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))
g = sns.catplot(...); g.set_xticklabels(rotation=45); g.fig.suptitle("…", y=1.03)
g.savefig("out.png", dpi=300)                     # figure-level; axes-level: plt.savefig
```

## 5.7 seaborn tambahan

```python
# 2D density & histogram
sns.kdeplot(data=df, x="a", y="b", fill=True, cmap="mako", levels=10, thresh=0.05)
sns.histplot(data=df, x="a", y="b", bins=30, cbar=True, cmap="viridis")

# Grid kontrol penuh
g = sns.PairGrid(df[["a", "b", "c"]], hue="d")
g.map_upper(sns.scatterplot); g.map_lower(sns.kdeplot); g.map_diag(sns.histplot); g.add_legend()
g = sns.JointGrid(data=df, x="a", y="b")
g.plot(sns.scatterplot, sns.histplot)                       # joint, marginal
g.plot_joint(sns.kdeplot); g.plot_marginals(sns.histplot, kde=True)

# Anotasi barplot / countplot persen
ax = sns.barplot(data=df, x="c", y="a", errorbar=None)
for p in ax.patches:
    ax.annotate(f"{p.get_height():.1f}", (p.get_x() + p.get_width()/2, p.get_height()),
                ha="center", va="bottom")
for c in ax.containers: ax.bar_label(c, fmt="%.1f")

# Persentase pada countplot
sns.countplot(data=df, x="c", stat="percent")               # seaborn >= 0.13

# Baris/kolom pada relplot + warna manual
sns.relplot(data=df, x="a", y="b", hue="c", col="d", kind="scatter",
            palette={"x": "red", "y": "blue", "z": "green"})
sns.lineplot(data=df, x="pickup_hour", y="a", hue="pickup_day", style="d", units=None, estimator="mean", errorbar="sd")

# Objects API (seaborn >= 0.12)
import seaborn.objects as so
(so.Plot(df, x="a", y="b", color="c").add(so.Dot(alpha=.5)).add(so.Line(), so.PolyFit()).label(title="Judul").show())

# Heatmap dengan format & anotasi sebagian
sns.heatmap(corr, annot=True, fmt=".1f", annot_kws={"size": 8}, cbar=False, xticklabels=True, yticklabels=True)

# Ukuran figure-level & legend
g = sns.displot(data=df, x="a", height=4, aspect=1.5); g.set(xlim=(0, 30)); g.set_axis_labels("A", "Frekuensi")
sns.set_style("darkgrid", {"grid.linestyle": ":"}); sns.set_context("notebook", font_scale=1.2)
sns.color_palette("coolwarm", as_cmap=True)
```

⚠ Bagian 5.7 belum dijalankan; `stat="percent"` di `countplot` dan `seaborn.objects` butuh seaborn versi baru.

⚠ `hue` pada `barplot/boxplot` + `palette=` tanpa `hue` memunculkan FutureWarning di seaborn ≥0.13; isi `hue="x", legend=False`. ⚠ `sns.set()` lama = `sns.set_theme()`. ⚠ `ci=` diganti `errorbar=`.

---

# 6. plotly (express & graph_objects)

Interaktif (hover, zoom). Semua `px.*` mengembalikan `fig`; tampilkan dengan `fig.show()`.

## 6.1 plotly express

```python
fig = px.scatter(df, x="a", y="b", color="c", size="d", hover_name="name",
                 hover_data=["e", "f"], facet_col="g", trendline="ols",     # trendline butuh statsmodels
                 log_x=False, opacity=0.7, title="Judul",
                 labels={"a": "Label A", "b": "Label B"},
                 color_discrete_sequence=px.colors.qualitative.Set2,
                 color_continuous_scale="Viridis")
fig.show()

px.line(df, x="date", y="total", color="c", markers=True, line_shape="spline")
px.bar(df, x="c", y="a", color="d", barmode="group", text_auto=True)      # barmode: group, stack, relative, overlay
px.bar(df, x="a", y="c", orientation="h")
px.histogram(df, x="a", nbins=30, color="c", marginal="box", histnorm="percent", barmode="overlay")   # marginal: rug, box, violin
px.box(df, x="c", y="a", color="d", points="all", notched=True)          # points: all, outliers, False
px.violin(df, x="c", y="a", box=True, points="all")
px.pie(df, names="c", values="a", hole=0.4, title="…")                  # hole → donut
px.area(df, x="date", y="a", color="c", groupnorm="percent")             # stacked area (default stack)
px.strip(df, x="c", y="a"); px.ecdf(df, x="a")

# Hierarki
px.treemap(df, path=[px.Constant("Semua"), "region", "country"], values="pop", color="lifeExp",
           color_continuous_scale="RdBu")
px.sunburst(df, path=["region", "country"], values="pop", color="lifeExp")
px.icicle(df, path=["a", "b"], values="v")

# Relasional multivariat
px.scatter_matrix(df, dimensions=["a", "b", "c"], color="d")
px.parallel_coordinates(df, dimensions=["a", "b", "c"], color="d")
px.density_heatmap(df, x="a", y="b", nbinsx=20, nbinsy=20)
px.imshow(df.corr(numeric_only=True), text_auto=".2f", color_continuous_scale="RdBu_r", zmin=-1, zmax=1)

# Polar / waktu / animasi
px.bar_polar(df, r="frequency", theta="direction", color="strength", template="plotly_dark")
px.line_polar(df, r="r", theta="theta", line_close=True)
px.scatter(df, x="gdp", y="life", size="pop", color="continent", animation_frame="year",
           animation_group="country", range_x=[100, 100000], log_x=True)
px.scatter_geo(df, locations="iso_alpha", size="pop")                    # peta
px.choropleth(df, locations="iso_alpha", color="life", hover_name="country")

# Dataset bawaan untuk latihan
px.data.tips(); px.data.iris(); px.data.gapminder(); px.data.stocks(); px.data.wind(); px.data.election()
```

Argumen umum semua `px.*`: `color, symbol, size, facet_col, facet_row, facet_col_wrap, hover_name, hover_data, animation_frame, category_orders={"c": ["a","b"]}, labels, title, template, width, height, color_discrete_map, range_x, range_y, log_x, log_y, text`.

Template: `plotly, plotly_white, plotly_dark, ggplot2, seaborn, simple_white, presentation, none`. Skala warna kontinu: `Viridis, Plasma, Blues, Reds, RdBu, Turbo, ...`; diskrit: `px.colors.qualitative.{Plotly, Set1, Set2, D3, Pastel, Bold}`.

## 6.2 graph_objects

```python
fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y=y, mode="lines+markers", name="A",           # mode: lines, markers, text
                         line=dict(color="royalblue", width=2, dash="dash"),
                         marker=dict(size=8, color="red", symbol="circle")))
fig.add_trace(go.Bar(x=cats, y=vals, name="B", marker_color="orange", text=vals, textposition="outside"))
fig.add_trace(go.Histogram(x=df["a"], nbinsx=30, opacity=0.7))
fig.add_trace(go.Box(y=df["a"], name="A", boxmean=True))
fig.add_trace(go.Pie(labels=cats, values=vals, hole=0.3, textinfo="label+percent"))
fig.add_trace(go.Heatmap(z=matrix, x=cols, y=cols, colorscale="RdBu", zmid=0, text=matrix, texttemplate="%{text:.2f}"))
fig.add_trace(go.Scatter(x=x, y=y, fill="tozeroy"))                          # area;  stackgroup="one" → stacked area
fig.add_trace(go.Scatterpolar(r=r, theta=labels, fill="toself"))             # radar

# Candlestick (data OHLC dengan kolom date, open, high, low, close)
fig = go.Figure(go.Candlestick(x=d["date"], open=d["open"], high=d["high"], low=d["low"], close=d["close"],
                               increasing_line_color="green", decreasing_line_color="red"))
fig.update_layout(xaxis_rangeslider_visible=False)

# Scatter matrix (Splom)
fig = go.Figure(go.Splom(dimensions=[dict(label=c, values=df[c]) for c in ["a", "b", "c"]],
                         text=df["d"], marker=dict(color=df["d_code"], showscale=False, size=4)))
fig.update_traces(diagonal_visible=False)

# Sankey (aliran): source/target = indeks node
fig = go.Figure(go.Sankey(
    node=dict(label=["A", "B", "C", "D"], pad=15, thickness=20, color="lightblue"),
    link=dict(source=[0, 0, 1, 2], target=[2, 3, 3, 3], value=[8, 4, 2, 6])))

# Bubble / treemap via go
go.Treemap(labels=l, parents=p, values=v)
go.Sunburst(labels=l, parents=p, values=v, branchvalues="total")
go.Waterfall(x=x, y=y, measure=["relative", "relative", "total"])
go.Funnel(y=stages, x=vals)
```

Dari DataFrame `d` (candlestick) biasanya: `d = pd.read_csv(...); d["date"] = pd.to_datetime(d["date"])`.

## 6.3 Layout, subplot, simpan

```python
fig.update_layout(title="Judul", title_x=0.5,                     # title_x=0.5 → tengah
                  xaxis_title="X", yaxis_title="Y",
                  width=800, height=500, template="plotly_white",
                  legend_title_text="Kategori", legend=dict(orientation="h", y=1.1),
                  barmode="stack", font=dict(size=13), margin=dict(l=40, r=40, t=60, b=40),
                  hovermode="x unified")
fig.update_xaxes(title_text="X", tickangle=45, range=[0, 100], type="log", showgrid=False)
fig.update_yaxes(title_text="Y", tickformat=".0%", rangemode="tozero")
fig.update_traces(marker_color="teal", opacity=0.8, textposition="outside", texttemplate="%{y:.1f}")
fig.add_hline(y=10, line_dash="dash", line_color="red", annotation_text="batas")
fig.add_vline(x="2019-03-15")
fig.add_annotation(x=x0, y=y0, text="puncak", showarrow=True, arrowhead=2)
fig.add_shape(type="rect", x0=0, x1=1, y0=0, y1=1, fillcolor="rgba(255,0,0,0.1)")

# Subplot
fig = make_subplots(rows=1, cols=2, subplot_titles=("A", "B"), shared_yaxes=True,
                    specs=[[{"type": "xy"}, {"type": "domain"}]])   # type "domain" untuk pie/sunburst
fig.add_trace(go.Bar(x=cats, y=vals), row=1, col=1)
fig.add_trace(go.Pie(labels=cats, values=vals), row=1, col=2)
fig.update_layout(height=400, showlegend=False)

# Simpan / tampilkan
fig.show()
fig.show(renderer="colab")        # jika plot kosong di Colab; atau "notebook", "browser"
fig.write_html("chart.html")      # interaktif
fig.write_image("chart.png", scale=2)   # butuh: !pip install -U kaleido
import plotly.io as pio; pio.renderers.default = "colab"
```

⚠ Plot plotly kosong di Colab → set `pio.renderers.default = "colab"`. ⚠ `trendline="ols"` butuh `statsmodels`. ⚠ `px.treemap` gagal jika ada NaN di kolom `path` → `dropna` atau `fillna("Unknown")`. ⚠ `write_image` butuh `kaleido`.

## 6.4 plotly tambahan

```python
# px 3D
px.scatter_3d(df, x="a", y="b", z="c", color="d", size="e", opacity=0.7)
px.line_3d(df, x="a", y="b", z="c", color="d")

# px lain
px.funnel(df, x="count", y="stage", color="group")
px.funnel_area(names=stages, values=vals)
px.timeline(df, x_start="start", x_end="end", y="task", color="owner")   # gantt; kolom harus datetime
px.parallel_categories(df, dimensions=["a", "b", "c"], color="n")
px.scatter_polar(df, r="r", theta="theta", color="c")
px.scatter_mapbox(df, lat="lat", lon="lon", size="v", zoom=3, mapbox_style="open-street-map")
px.density_mapbox(df, lat="lat", lon="lon", z="v", radius=10, mapbox_style="open-street-map")
px.density_contour(df, x="a", y="b")
px.violin(df, x="c", y="a", color="d", violinmode="overlay", box=True)
px.ecdf(df, x="a", color="c", ecdfnorm="percent")
px.histogram(df, x="c", y="a", histfunc="avg")                 # histfunc: count, sum, avg, min, max
px.bar(df, x="c", y="a", color="d", facet_col="e", facet_col_wrap=2, category_orders={"c": ["x", "y", "z"]})
px.line(df.melt(id_vars="date"), x="date", y="value", color="variable")        # banyak kolom jadi banyak garis (wide → long)
px.line(df, x="date", y=["a", "b", "c"])                                         # wide-form langsung
px.scatter(df, x="a", y="b", marginal_x="histogram", marginal_y="box", trendline="lowess")

# go: permukaan, kontur, indikator, tabel, OHLC
go.Figure(go.Surface(z=Z, x=X[0], y=Y[:, 0], colorscale="Viridis"))
go.Figure(go.Contour(z=Z, x=X[0], y=Y[:, 0], colorscale="Viridis", contours_coloring="heatmap"))
go.Figure(go.Indicator(mode="gauge+number+delta", value=72, delta={"reference": 60},
                       gauge={"axis": {"range": [0, 100]}}, title={"text": "Skor"}))
go.Figure(go.Table(header=dict(values=list(df.columns), fill_color="lightgrey"),
                   cells=dict(values=[df[c] for c in df.columns])))
go.Figure(go.Ohlc(x=d["date"], open=d["open"], high=d["high"], low=d["low"], close=d["close"]))
go.Figure(go.Scatter3d(x=df["a"], y=df["b"], z=df["c"], mode="markers", marker=dict(size=3, color=df["c"])))
go.Figure(go.Scattergeo(lat=df["lat"], lon=df["lon"], mode="markers"))

# Interaktif: dropdown & slider
fig.update_layout(updatemenus=[dict(buttons=[
    dict(label="Semua", method="update", args=[{"visible": [True, True]}]),
    dict(label="Hanya A", method="update", args=[{"visible": [True, False]}])])])
fig.update_layout(xaxis=dict(rangeslider=dict(visible=True), rangeselector=dict(buttons=[
    dict(count=7, label="1w", step="day", stepmode="backward"), dict(step="all")])))

# Ubah trace/axis secara selektif, dua sumbu y
fig.update_traces(marker_color="red", selector=dict(name="A"))
fig.for_each_trace(lambda t: t.update(name=t.name.upper()))
fig.update_yaxes(secondary_y=True)                       # setelah make_subplots(specs=[[{"secondary_y": True}]])
fig.add_trace(go.Scatter(x=x, y=y2, name="B"), secondary_y=True)
fig.update_layout(coloraxis_colorbar=dict(title="Nilai"))
```

⚠ Bagian 6.4 belum dijalankan. `scatter_mapbox` perlu data lat/lon nyata, dan versi plotly baru mulai mengganti `*_mapbox` dengan `*_map`; kalau error, coba `px.scatter_map`.

---

# 7. Pola poin soal (template jawaban)

Pola kerangka soal prak: tiap poin diminta **tampilkan angka/tabel + gambar**. Tulis satu sel per poin.

```python
# "Tampilkan jumlah per kategori + bar chart"
counts = df["primary_category"].value_counts()
print(counts)
ax = counts.plot(kind="bar", color="steelblue", rot=0, title="Jumlah Smartphone per Kategori")
ax.set_xlabel("Kategori"); ax.set_ylabel("Jumlah"); ax.bar_label(ax.containers[0])
plt.show()
# (urutan tetap) counts = counts.reindex(["Entry","Midrange","Flagship","Gaming","Camera"])

# "Proporsi (persen) Yes/No + bar chart"
pct = (df["churn"].value_counts(normalize=True) * 100).round(2)
print(pct)
pct.plot(kind="bar", rot=0, color=["tab:green", "tab:red"]); plt.ylabel("%"); plt.title("Proporsi Churn"); plt.show()

# "Rata-rata per kelompok + visualisasi"
g = df.groupby("churn")[["tenure_months", "monthly_charges"]].mean().round(2)
print(g); g.plot(kind="bar", subplots=True, layout=(1, 2), figsize=(10, 4), legend=False, rot=0); plt.show()

# "Distribusi variabel + outlier"
fig, ax = plt.subplots(1, 2, figsize=(12, 4))
sns.histplot(df["total"], kde=True, ax=ax[0]); sns.boxplot(x=df["total"], ax=ax[1]); plt.show()

# "Perbandingan distribusi antar kelompok"
sns.boxplot(data=df, x="pickup_borough", y="total"); plt.xticks(rotation=30); plt.show()

# "Hubungan dua variabel"
sns.scatterplot(data=df, x="distance", y="total", hue="payment", alpha=0.5); plt.show()

# "Korelasi antar kolom → heatmap"
sns.heatmap(df.corr(numeric_only=True), annot=True, fmt=".2f", cmap="coolwarm", center=0); plt.show()

# "Tren per jam / per hari"
hourly = df.groupby("pickup_hour")["total"].mean()
hourly.plot(marker="o"); plt.xlabel("Jam"); plt.ylabel("Rata-rata total"); plt.xticks(range(24)); plt.grid(alpha=0.3); plt.show()
days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
df.groupby("pickup_day")["total"].mean().reindex(days).plot(kind="bar"); plt.show()     # ⚠ urut hari

# "Komposisi" 
df["payment"].value_counts().plot(kind="pie", autopct="%1.1f%%", ylabel=""); plt.show()
px.treemap(df, path=["pickup_borough", "dropoff_borough"], values="total").show()

# "Top-N"
df.groupby("pickup_borough")["total"].sum().nlargest(5).plot(kind="barh"); plt.show()

# "Heatmap jam × hari"
pv = df.pivot_table(values="total", index="pickup_day", columns="pickup_hour", aggfunc="mean").reindex(days)
sns.heatmap(pv, cmap="YlOrRd"); plt.show()

# "Interaktif" 
px.scatter(df, x="distance", y="total", color="payment", hover_data=["pickup_borough"]).show()

# "Simpan gambar / data"
plt.savefig("hasil.png", dpi=200, bbox_inches="tight")
df.to_csv("hasil.csv", index=False)
```

Kerangka satu soal lengkap:

```python
# a. load
import gdown; gdown.download(id="<FILE_ID>", output="data.csv"); df = pd.read_csv("data.csv")
df.head(); df.tail(); df.shape; df.dtypes; df.isna().sum()
# b. bersihkan tipe/NaN/duplikat
df["x"] = pd.to_numeric(df["x"], errors="coerce").fillna(0); df = df.drop_duplicates()
# c. fitur baru (datetime/cut/apply/map)
# d. agregasi (groupby/value_counts/pivot_table)
# e–h. visualisasi: satu sel per poin, SELALU beri title + label sumbu + legend
# i. simpan
df.to_csv("out.csv", index=False)
```

---

# 8. Checklist jebakan

- ⚠ **NaN & tipe sebelum plot**: kolom teks yang seharusnya angka (`total_charges`) → `to_numeric`. `dropna()`/`fillna()` dulu.
- ⚠ **Urutan kategori**: bar default urut alfabet/kemunculan. Paksa urutan: `order=[…]` (seaborn), `.reindex([…])` (pandas), `category_orders=` (plotly), atau `pd.Categorical(..., categories=[…], ordered=True)`.
- ⚠ **Label x menumpuk** → `plt.xticks(rotation=45, ha="right")` / `figsize` lebih lebar / `barh`.
- ⚠ **`plt.show()` per gambar**; `plt.savefig` **sebelum** `plt.show()` (kalau sesudah, gambar kosong).
- ⚠ **Pakai `ax=`** saat plot ke subplot; kalau lupa, gambar bertumpuk di figure terakhir.
- ⚠ **Hist vs bar**: histogram untuk numerik kontinu (`bins`); bar untuk kategori (`value_counts`).
- ⚠ **Tabel category + groupby** → `observed=True`, kalau tidak muncul kombinasi kosong/warning.
- ⚠ **`value_counts()` index**: bar chart dari `value_counts` memakai `.index` (nama) dan `.values` (jumlah).
- ⚠ **Deprecated**: `sns.distplot` → `histplot/displot`; `normed=True` → `density=True`; `sns.set()` → `sns.set_theme()`; `ci=` → `errorbar=`; `plt.boxplot(labels=)` → `tick_labels=` (matplotlib ≥3.9).
- ⚠ **`&`/`|` butuh kurung**: `df[(a > 1) & (b < 2)]`; jangan pakai `and`/`or`.
- ⚠ **`get_dummies`** → kolom bool; tambah `dtype=int` bila perlu angka. Dimensi diminta sebelum dan sesudah → `print(df.shape)` dua kali.
- ⚠ **`pd.cut` + nilai 0** → `include_lowest=True`; cek NaN.
- ⚠ **`to_csv(index=False)`**; baca balik dan cek `shape`.
- ⚠ **Plotly kosong di Colab** → `pio.renderers.default = "colab"`; `write_image` butuh `kaleido`.
- ⚠ **Tiap plot wajib**: judul, label sumbu, legend (jika >1 seri), angka di bar bila diminta ("tampilkan juga jumlah per kategori" → `print(counts)` **dan** `bar_label`).
- ⚠ Jangan lupa jalankan ulang seluruh notebook sebelum submit (output harus ikut tersimpan).
