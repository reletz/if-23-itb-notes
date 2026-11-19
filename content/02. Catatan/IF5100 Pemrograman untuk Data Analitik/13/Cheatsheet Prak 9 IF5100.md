---
type: Note
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

# Cheatsheet Prak 9 IF5100 - Intro to Machine Learning dan scikit-learn

Sumber: IF5100-13a Introduction to ML (47 hlm), 13b Introduction to scikit-learn (11 hlm), 13c Independent Study sklearn (3 hlm), 13 Short Version (31 hlm). 

Daftar isi:
1. Peta materi dan tugas
2. Konsep machine learning
3. Satu dataset, dua cara: clustering dan klasifikasi
4. Fitur dan jarak
5. Evaluasi model
6. Quick check dan ringkasan slide
7. scikit-learn dasar (isi slide)
8. Syntax lengkap scikit-learn
9. Pola poin soal dan kerangka satu soal ML
10. Checklist jebakan

---

# 1. Peta materi dan tugas

Praktikum 9: Intro to Machine Learning, sk-learn. Offline Kamis 19 November 2026 pukul 16.00-18.00, online Jumat 20 November 2026 pukul 14.00-16.00. Kerangka soal diasumsikan sama dengan prak 7 dan 8: Soal 1, 2, 3, tiap soal dipecah poin a sampai j, dikerjakan berurutan di notebook Colab, dataset diambil dengan gdown.

Tujuan sesi (Short Version, hlm 2). Setelah sesi ini bisa:
- Menjelaskan bagaimana program belajar dari contoh, dan membedakan supervised dari unsupervised learning.
- Menjelaskan mengapa pilihan fitur dan jarak mengubah apa yang dipelajari model.
- Menilai classifier dengan confusion matrix, accuracy, sensitivity, dan specificity.
- Melatih model scikit-learn dengan fit() dan memakainya dengan predict().

Rute sesi: ide, satu dataset dua cara, fitur dan jarak, evaluasi, scikit-learn.

Remarks (13a hlm 3):
- Machine learning adalah topik yang sangat besar. Pendalaman ada di IF5171 (Machine Learning for DSAI) dan IF6080 (Probabilistic Machine Learning).
- Tujuan di mata kuliah ini: pengantar ide dasar, termasuk cara mengukur jarak antar contoh dan cara mengelompokkan contoh berdasarkan jarak untuk membuat model.
- Pengantar metode klasifikasi seperti k-nearest neighbor.
- Pengantar metode clustering seperti k-means.

Tugas Independent Study (13c dan Short Version hlm 30):
- Pelajari tutorial: https://scikit-learn.org/stable/tutorial/statistical_inference/index.html
- Klasifikasi iris dengan k-nearest neighbors classifier: bagian supervised_learning, nearest-neighbor-and-the-curse-of-dimensionality.
- Clustering iris dengan k-means: bagian unsupervised_learning, clustering-grouping-observations-together.
- Pakai Google Colab, jalankan semua latihan, pahami hasilnya.
- Kumpulkan file notebook lewat Teams Assignment. Format nama file: NIM_sklearntut.ipynb
- Deadline: slide 13c menulis Kamis 19 November 2026 pukul 15.00 WIB, sedangkan Short Version hlm 2 menulis Senin 23 November 2026 pukul 17.00 WIB. Dua slide ini tidak sama, perlu dikonfirmasi ke asisten.

Video yang disarankan (Short Version hlm 30, sekitar 1,5 jam):
- MIT 6.0002 Lecture 11 Introduction to Machine Learning (52 menit): babak pertama kuliah ini dengan contoh yang sama. https://www.youtube.com/watch?v=h0e2HAPTGF4
- Data School, Getting started in scikit-learn with the iris dataset (15 menit): https://www.youtube.com/watch?v=hd1W4CyPX58
- Data School, Training a machine learning model with scikit-learn (20 menit): k-NN pada iris langkah demi langkah. https://www.youtube.com/watch?v=RlQuVL6-qe8
- Opsional: StatQuest K-means clustering (9 menit) https://www.youtube.com/watch?v=4b5d3muPQmA dan StatQuest The Confusion Matrix (7 menit).

Sumber materi:
- John V. Guttag, Introduction to Computation and Programming using Python, The MIT Press, 3rd Edition, 2021, bab 24-26.
- MIT OCW 6.0002 Fall 2016, lecture 11.
- scikit-learn tutorials: https://scikit-learn.org/stable/tutorial/index.html

---

# 2. Konsep machine learning

Definisi (13a hlm 4). Menurut Arthur Samuel (1959), pelopor artificial intelligence, machine learning adalah cara memprogram yang memberi komputer kemampuan untuk belajar tanpa diprogram secara eksplisit. Artinya: cara memprogram komputer untuk mengekstrak pola yang bermakna dari contoh, lalu memakai pola itu untuk mengambil keputusan atau membuat prediksi.

Programming tradisional vs machine learning (hlm 5):
- Programming tradisional: Data dan Program masuk ke Computer, keluar Output.
- Machine learning: Data dan Output masuk ke Computer, keluar Program (model).

Bagaimana sesuatu dipelajari (hlm 6):
- Memorization: akumulasi fakta satu per satu. Ini declarative knowledge. Dibatasi oleh waktu untuk mengamati fakta dan memori untuk menyimpan fakta.
- Generalization: menyimpulkan fakta baru dari fakta lama. Ini imperative knowledge. Pada dasarnya kegiatan prediktif. Dibatasi oleh akurasi proses deduksi. Mengasumsikan masa lalu memprediksi masa depan.
- Yang diminati: program yang bisa menyimpulkan informasi berguna dari pola implisit di dalam data.

Paradigma dasar (hlm 7):
- Amati sekumpulan contoh: training data.
- Simpulkan sesuatu tentang proses yang menghasilkan data itu.
- Pakai kesimpulan itu untuk memprediksi data yang belum pernah dilihat: test data.
- Contoh: pemain football dilabeli posisi, dengan data tinggi dan berat. Cari model kanonik tiap posisi dengan statistik. Prediksi posisi untuk pemain baru.

Jenis machine learning (hlm 8):
- Supervised learning: diberi pasangan feature dan label, cari aturan yang memprediksi label untuk input yang belum pernah dilihat.
- Unsupervised learning: diberi feature tanpa label, kelompokkan menjadi natural clusters (atau buat label untuk kelompok).
- Reinforcement learning: model berinteraksi dengan lingkungan untuk mendapat reward, metodenya seperti swarms dan genetic algorithms. Di luar cakupan.

Tabel data contoh football players (hlm 9):

| Position | Name | Height (ft) | Weight (lbs) |
|---|---|---|---|
| receiver | edelman | 70 | 200 |
| receiver | hogan | 73 | 210 |
| receiver | gronkowski | 78 | 265 |
| receiver | amendola | 71 | 190 |
| receiver | bennet | 78 | 275 |
| lineman | cannon | 77 | 335 |
| lineman | solder | 80 | 325 |
| lineman | mason | 73 | 310 |
| lineman | thuney | 77 | 305 |
| lineman | karras | 76 | 305 |

Catatan: kolom Height di slide berlabel ft tetapi nilainya 70 sampai 80, yang sebenarnya inci. Pakai angka apa adanya.

Semua metode ML memerlukan (hlm 23):
- Memilih training data dan metode evaluasi (dibahas di kuliah ini).
- Representasi fitur (dibahas).
- Distance metric untuk feature vector (dibahas).
- Objective function dan constraints.
- Metode optimisasi untuk mempelajari model.
Slide menandai tiga butir pertama sebagai yang dibahas di mata kuliah ini.

Kode: data football players ke pandas dan scatter plot (hlm 10, 15):

```python
import pandas as pd
import matplotlib.pyplot as plt

players = pd.DataFrame({
    "position": ["receiver"] + ["receiver"] + ["receiver"] + ["receiver"] + ["receiver"]
                + ["lineman", "lineman", "lineman", "lineman", "lineman"],
    "name": ["edelman", "hogan", "gronkowski", "amendola", "bennet",
             "cannon", "solder", "mason", "thuney", "karras"],
    "height": [70, 73, 78, 71, 78, 77, 80, 73, 77, 76],
    "weight": [200, 210, 265, 190, 275, 335, 325, 310, 305, 305],
})

# data tanpa label (hlm 10)
plt.scatter(players["height"], players["weight"])
plt.xlabel("Height"); plt.ylabel("Weight")
plt.title("Distribution of height vs. weight")
plt.show()

# data berlabel (hlm 15)
colors = players["position"].map({"receiver": "red", "lineman": "blue"})
plt.scatter(players["height"], players["weight"], c=colors)
plt.xlabel("Height"); plt.ylabel("Weight")
plt.show()
```

---

# 3. Satu dataset, dua cara: clustering dan klasifikasi

## 3.1 Data tanpa label: clustering (unsupervised)

Menghitung kemiripan contoh dengan tujuan memisahkan ke dalam kelompok yang berbeda dan natural (hlm 11).
- Kemiripan adalah ukuran jarak (distance measure).
- Anggap kita tahu ada k kelompok di training data tetapi tidak tahu labelnya (contoh k = 2).
- Pilih k sampel (acak?) sebagai exemplar.
- Kelompokkan sampel sisanya dengan meminimalkan jarak antar sampel dalam cluster yang sama (objective function): masukkan sampel ke grup dengan exemplar terdekat.
- Cari contoh median di tiap cluster sebagai exemplar baru.
- Ulangi sampai tidak ada perubahan.

Contoh pada data football (hlm 12-14):
- Kemiripan berdasarkan berat saja: garis pemisah mendatar sekitar berat 240. Tiga titik di bawah (berat 190-210), tujuh di atas.
- Kemiripan berdasarkan tinggi saja: garis pemisah tegak sekitar tinggi 74,5.
- Memakai kedua atribut dengan k = 2: dua cluster terbaik, satu cluster berat rendah (bawah kiri), satu cluster berat tinggi (atas). Garis pemisah miring.

Isu clustering (hlm 36):
- Bagaimana memutuskan jumlah cluster terbaik.
- Bagaimana memilih fitur terbaik dan distance metric terbaik.

Pada hlm 38, data yang sama di-fit dengan tiga cluster secara unsupervised: cluster atas (lineman berat tinggi), cluster tengah (dua receiver berat 265 dan 275), cluster bawah (receiver berat rendah). Titik hitam adalah data baru.

## 3.2 Data berlabel: klasifikasi (supervised)

Mencari permukaan di ruang fitur yang memisahkan kelompok berlabel (hlm 16).
- Diberi grup berlabel di ruang fitur, cari subpermukaan yang memisahkan grup, dengan batasan kompleksitas subpermukaan.
- Contoh ini ruang 2D, jadi cari garis (atau himpunan segmen garis terhubung) yang paling baik memisahkan dua kelompok.
- Jika contoh terpisah dengan baik, mudah.
- Jika contoh di grup berlabel saling tumpang tindih, mungkin harus menukar false positive dengan false negative.

Pada hlm 17, dengan data berlabel, pemisah dua kelompok yang jelas adalah garis hampir mendatar sekitar berat 290: receiver di bawah, lineman di atas.

Data baru (hlm 18-21). Misalkan sudah belajar memisahkan receiver dan lineman. Sekarang diberi beberapa running back dan ingin memakai model untuk memutuskan lebih mirip receiver atau lineman:

| Name | Height | Weight |
|---|---|---|
| blount | 72 | 250 |
| white | 70 | 205 |

Perbandingan:
- Clustering memakai data tanpa label: garis miring memisahkan dua cluster. Blount (72, 250) jatuh di batas.
- Klasifikasi memakai data berlabel: garis mendatar sekitar 290, sehingga blount dan white keduanya jatuh di sisi receiver.

## 3.3 Supervised vs unsupervised (hlm 34)

- Diberi data tanpa label, coba temukan cluster contoh yang saling dekat: unsupervised learning. Pakai centroid cluster sebagai definisi tiap kelas yang dipelajari. Data baru diberi cluster terdekat.
- Diberi data berlabel, pelajari permukaan matematis yang paling baik memisahkan contoh berlabel, dengan batasan kompleksitas permukaan (jangan overfit): supervised learning. Data baru diberi kelas berdasarkan bagian ruang fitur yang dipotong permukaan classifier, tempat data itu berada.

Metode yang dilihat (hlm 22):
- Mempelajari model dari data tanpa label dengan mengelompokkan training data menjadi titik-titik berdekatan. Cluster hasilnya bisa memberi label untuk data baru.
- Mempelajari model yang memisahkan grup berlabel dari grup lain. Mungkin tidak bisa memisahkan sempurna tanpa overfitting. Tetapi bisa memutuskan trade-off false positive vs false negative. Classifier hasilnya bisa memberi label untuk data baru.

Hal yang perlu diperhatikan saat mempelajari model (hlm 35). Model yang dipelajari tergantung pada:
- Distance metric antar contoh.
- Pilihan feature vector.
- Batasan kompleksitas model: jumlah cluster yang ditentukan, kompleksitas permukaan pemisah.
- Hindari overfitting (setiap contoh jadi cluster sendiri, atau permukaan pemisah sangat rumit).

Pendekatan klasifikasi (hlm 39):
- Cari batas di ruang fitur yang memisahkan kelas-kelas contoh berlabel.
- Cari permukaan sederhana (garis atau bidang terbaik).
- Cari permukaan lebih kompleks (dengan batasan).
- Skema voting: cari k contoh training terdekat, pakai suara terbanyak (majority vote) untuk memilih label (k-nearest neighbor).
- Isu: bagaimana menghindari overfitting, bagaimana mengukur kinerja, bagaimana memilih fitur terbaik.

Klasifikasi (hlm 40): berusaha meminimalkan error pada training data, mirip fitting kurva ke data, lalu evaluasi pada data.

Kode: k-means dan kNN pada data football (cocokkan dengan hlm 14-21):

```python
import numpy as np
from sklearn.cluster import KMeans
from sklearn.neighbors import KNeighborsClassifier

X = players[["height", "weight"]].values
y = players["position"].values

# unsupervised: tidak pakai y
km2 = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)
print(km2.labels_)           # cluster tiap pemain (nomor cluster bisa tertukar)
print(km2.cluster_centers_)  # centroid

km3 = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)   # hlm 38
print(km3.labels_)

# supervised: pakai y
knn = KNeighborsClassifier(n_neighbors=3).fit(X, y)
new = np.array([[72, 250], [70, 205]])      # blount dan white
print(knn.predict(new))
print(km2.predict(new))                      # cluster terdekat untuk data baru
```

---

# 4. Fitur dan jarak

## 4.1 Feature engineering (hlm 24, 27)

- Fitur tidak pernah menggambarkan situasi sepenuhnya.
- Feature engineering: mewakili contoh dengan feature vector yang memudahkan generalisasi.
- Contoh: 100 contoh masa lalu dipakai memprediksi mahasiswa mana yang mendapat nilai A di mata kuliah ini. Fitur yang jelas membantu: GPA, pengalaman pemrograman sebelumnya (bukan prediktor sempurna). Fitur yang bisa menyebabkan overfit: bulan lahir, tinggi badan.
- Tujuan: memaksimalkan rasio input berguna terhadap input tidak relevan, yaitu Signal-to-Noise Ratio (SNR).
- Feature engineering mencakup: memutuskan fitur mana yang dimasukkan dan mana yang hanya menambah noise ke classifier; memutuskan cara mengukur jarak antar contoh training (dan akhirnya antara classifier dan instance baru); memutuskan bobot kepentingan dimensi feature vector yang berpengaruh pada definisi jarak.

## 4.2 Contoh reptil (hlm 25-26)

| Name | Egg-laying | Scales | Poisonous | Cold-blooded | # legs | Reptile (label) |
|---|---|---|---|---|---|---|
| Cobra | True | True | True | True | 0 | Yes |
| Rattlesnake | True | True | True | True | 0 | Yes |
| Boa constrictor | False | True | False | True | 0 | Yes |
| Chicken | True | True | False | False | 2 | No |
| Alligator | True | True | False | True | 4 | Yes |
| Dart frog | True | False | True | False | 4 | No |
| Salmon | True | True | False | True | 0 | No |
| Python | True | True | False | True | 0 | Yes |

Model saat ini (hlm 25): punya scales, cold-blooded, punya 0 atau 4 kaki. Tidak ada cara (mudah) menambah aturan yang mengklasifikasikan salmon dan python dengan benar, karena fiturnya identik.

Model bagus (hlm 26): punya scales dan cold-blooded. Tidak sempurna, tetapi tidak ada false negative (apa pun yang diklasifikasikan bukan reptil pasti benar), dan ada beberapa false positive (mungkin salah memberi label reptil pada beberapa hewan).

## 4.3 Mengukur jarak (hlm 28)

Contoh hewan dipandang sebagai empat fitur biner dan satu fitur integer. Satu cara memisahkan reptil dari bukan reptil adalah mengukur jarak antar pasangan contoh:
- Untuk mengelompokkan contoh berdekatan ke dalam kelas bersama (data tanpa label).
- Untuk menemukan permukaan classifier di ruang contoh yang paling baik memisahkan kumpulan contoh berlabel dari kumpulan lain.

## 4.4 Minkowski metric (hlm 29)

Rumus:

dist(X1, X2, p) = (jumlah untuk k = 1 sampai len dari abs(X1_k - X2_k) pangkat p) pangkat 1/p

- p = 1: Manhattan distance.
- p = 2: Euclidean distance.
- Perlu mengukur jarak antar feature vector.
- Biasanya pakai Euclidean metric. Manhattan mungkin cocok jika dimensi yang berbeda tidak sebanding (not comparable).
- Contoh grid pada slide, apakah lingkaran lebih dekat ke bintang atau ke tanda silang: Euclidean silang 2,8 dan bintang 3. Manhattan silang 4 dan bintang 3.

## 4.5 Jarak Euclidean antar hewan (hlm 30-33)

Vektor fitur (egg-laying, scales, poisonous, cold-blooded, jumlah kaki):
- rattlesnake = [1, 1, 1, 1, 0]
- boa constrictor = [0, 1, 0, 1, 0]
- dartFrog = [1, 0, 1, 0, 4]

Jarak Euclidean (hlm 31):

| | rattlesnake | boa constrictor | dart frog |
|---|---|---|---|
| rattlesnake | - | 1.414 | 4.243 |
| boa constrictor | 1.414 | - | 4.472 |
| dart frog | 4.243 | 4.472 | - |

Rattlesnake dan boa constrictor jauh lebih dekat satu sama lain daripada ke dart frog.

Tambah alligator (hlm 32): jarak alligator ke rattlesnake 4.123, ke boa constrictor 4.123, ke dart frog 1.732. Alligator lebih dekat ke dart frog daripada ke ular. Kenapa:
- Alligator berbeda dari katak dalam 3 fitur, dari boa hanya 2 fitur.
- Tetapi skala "legs" adalah 0..4, sedangkan fitur lain 0..1.
- "legs" menjadi terlalu besar secara tidak proporsional.

Perbaikan dengan fitur biner (hlm 33): ganti jumlah kaki dengan fitur biner (punya kaki).
- rattlesnake = [1, 1, 1, 1, 0]
- boa constrictor = [0, 1, 0, 1, 0]
- dartFrog = [1, 0, 1, 0, 1]
- Alligator = [1, 1, 0, 1, 1]

| | rattlesnake | boa constrictor | dart frog | alligator |
|---|---|---|---|---|
| rattlesnake | - | 1.414 | 1.732 | 1.414 |
| boa constrictor | 1.414 | - | 2.236 | 1.414 |
| dart frog | 1.732 | 2.236 | - | 1.732 |
| alligator | 1.414 | 1.414 | 1.732 | - |

Sekarang alligator lebih dekat ke ular daripada ke dart frog, lebih masuk akal. Pelajaran: feature engineering matters.

Kode: Minkowski, Euclidean, Manhattan dan verifikasi angka slide:

```python
import numpy as np

def minkowski(x1, x2, p):
    x1, x2 = np.array(x1, dtype=float), np.array(x2, dtype=float)
    return np.power(np.power(np.abs(x1 - x2), p).sum(), 1 / p)

def euclidean(x1, x2): return minkowski(x1, x2, 2)
def manhattan(x1, x2): return minkowski(x1, x2, 1)

# versi dengan jumlah kaki 0..4 (hlm 30-32)
rattlesnake = [1, 1, 1, 1, 0]
boa         = [0, 1, 0, 1, 0]
dart_frog   = [1, 0, 1, 0, 4]
alligator   = [1, 1, 0, 1, 4]
print(round(euclidean(rattlesnake, boa), 3))        # 1.414
print(round(euclidean(rattlesnake, dart_frog), 3))  # 4.243
print(round(euclidean(boa, dart_frog), 3))          # 4.472
print(round(euclidean(alligator, rattlesnake), 3))  # 4.123
print(round(euclidean(alligator, dart_frog), 3))    # 1.732

# versi biner (hlm 33)
dart_frog_b = [1, 0, 1, 0, 1]
alligator_b = [1, 1, 0, 1, 1]
print(round(euclidean(alligator_b, rattlesnake), 3))  # 1.414
print(round(euclidean(alligator_b, dart_frog_b), 3))  # 1.732
print(round(euclidean(boa, dart_frog_b), 3))          # 2.236

# matriks jarak sekaligus
import pandas as pd
from sklearn.metrics import pairwise_distances
animals = pd.DataFrame([rattlesnake, boa, dart_frog_b, alligator_b],
                       index=["rattlesnake", "boa", "dart frog", "alligator"])
print(pd.DataFrame(pairwise_distances(animals, metric="euclidean"),
                   index=animals.index, columns=animals.index).round(3))
```

---

# 5. Evaluasi model

## 5.1 Membagi data (hlm 41)

Data dibagi secara acak menjadi training set dan test set. Contoh slide: Voter Preference, dua fitur (Age dan Distance from Boston), dua kelas (Dem bintang biru, Rep segitiga merah).

Dua model kandidat dari training set (hlm 42): 1. garis solid (miring) 2. garis putus-putus (tegak sekitar jarak 1450).

## 5.2 Confusion matrix pada training error (hlm 43)

Baris adalah kelas sebenarnya (Actually Dem.), kolom adalah prediksi (Predicted Democratic). Positif = Dem.

| Model | TP | FN | FP | TN |
|---|---|---|---|---|
| Solid line | 12 | 0 | 9 | 9 |
| Dashed line | 11 | 1 | 8 | 10 |

## 5.3 Rumus

accuracy = (TP + TN) / (TP + TN + FP + FN)

positive predictive value = TP / (TP + FP)

sensitivity = TP / (TP + FN)   (persentase yang benar ditemukan)

specificity = TN / (TN + FP)   (persentase yang benar ditolak)

## 5.4 Angka pada slide

- Akurasi training kedua model: 0.7 (solid: 21 dari 30, dashed: 21 dari 30). Pertanyaan slide: mana yang lebih baik? Bisakah ditemukan model dengan training error lebih rendah? (hlm 44)
- Model yang lebih kompleks (hlm 45, garis putus-putus berliku mengelilingi Dem): TP = 12, FP = 5, TN = 13, FN = 0. Accuracy = 25/30 = 0.833.
- Ukuran statistik lain, positive predictive value (hlm 46): solid line model 0.57, dashed line model 0.58, model lebih kompleks 0.71.
- Sensitivity vs specificity: sensitivity persentase yang benar ditemukan, specificity persentase yang benar ditolak.

Peringatan: model yang makin kompleks bisa menurunkan training error, tetapi bisa overfit. Karena itu model dinilai pada data uji yang tidak dipakai saat training, dan perlu melihat lebih dari accuracy: kesalahan mana yang lebih penting.

Kode: hitung semua metrik dari TP, FP, TN, FN dan cocokkan dengan slide:

```python
def metrics(tp, fp, tn, fn):
    total = tp + tn + fp + fn
    return {
        "accuracy": (tp + tn) / total,
        "ppv": tp / (tp + fp),
        "sensitivity": tp / (tp + fn),
        "specificity": tn / (tn + fp),
    }

models = {
    "solid":   dict(tp=12, fp=9, tn=9,  fn=0),
    "dashed":  dict(tp=11, fp=8, tn=10, fn=1),
    "complex": dict(tp=12, fp=5, tn=13, fn=0),
}
for name, m in models.items():
    r = metrics(m["tp"], m["fp"], m["tn"], m["fn"])
    print(name, {k: round(v, 3) for k, v in r.items()})
# solid   accuracy 0.7   ppv 0.571  sensitivity 1.0    specificity 0.5
# dashed  accuracy 0.7   ppv 0.579  sensitivity 0.917  specificity 0.556
# complex accuracy 0.833 ppv 0.706  sensitivity 1.0    specificity 0.722
```

---

# 6. Quick check dan ringkasan slide

Quick check (Short Version hlm 21), berpikir sendiri 1 menit, bandingkan dengan tetangga, lalu voting.
- Q1: punya data 10.000 pelanggan tanpa label. Keluarga metode apa yang bisa dipakai dan apa hasilnya? Jawab: unsupervised learning (clustering, misalnya k-means). Hasilnya kelompok pelanggan yang berdekatan (cluster) dan centroid tiap cluster; kelompok baru perlu ditafsirkan sendiri karena tidak ada label.
- Q2: kenapa alligator lebih dekat ke dart frog daripada ke ular, dan bagaimana memperbaikinya? Jawab: fitur jumlah kaki berskala 0..4 sehingga mendominasi jarak. Perbaikan: jadikan fitur biner (punya kaki atau tidak), atau skalakan fitur.
- Q3: dua model sama-sama akurasi 0.7, bagaimana memutuskan yang dipakai? Jawab: lihat confusion matrix dan ukuran lain (sensitivity, specificity, positive predictive value), serta jenis kesalahan mana yang lebih merugikan (false positive atau false negative).

Ringkasan 13a hlm 47:
- Metode machine learning memberi cara membangun model proses dari kumpulan data.
- Supervised learning memakai data berlabel dan membuat classifier yang paling baik memisahkan data ke dalam kelas yang diketahui.
- Unsupervised learning mencoba menyimpulkan variabel laten dengan mengelompokkan contoh training menjadi grup berdekatan.
- Pilihan fitur mempengaruhi hasil. Pilihan pengukuran jarak antar contoh mempengaruhi hasil.
- Minggu-minggu berikutnya: contoh metode clustering dan klasifikasi.

Ringkasan Short Version hlm 29:
- Machine learning membangun model suatu proses dari data.
- Supervised learning memakai data berlabel dan mempelajari classifier yang memisahkan kelas yang diketahui.
- Unsupervised learning mengelompokkan contoh tak berlabel menjadi grup berdekatan, yang mungkin tidak cocok dengan label yang kita pedulikan.
- Pilihan fitur dan ukuran jarak mengubah hasil.
- Nilai model pada data held-out (test), dan lihat di luar accuracy: kesalahan mana yang lebih penting.
- Di scikit-learn setiap estimator bekerja dengan cara sama: fit, lalu predict atau score.

---

# 7. scikit-learn dasar (isi slide 13b, 13c, Short Version)

## 7.1 Apa itu scikit-learn

- Scikit-learn (sebelumnya scikits.learn, juga dikenal sebagai sklearn) adalah library machine learning gratis untuk Python.
- Berisi berbagai algoritma classification, regression, dan clustering. Dirancang untuk bekerja bersama library numerik dan ilmiah Python: NumPy dan SciPy.
- Sumber: https://scikit-learn.org/stable/tutorial/index.html

## 7.2 Masalah pembelajaran (13b hlm 4)

Masalah pembelajaran mempertimbangkan sekumpulan n sampel data lalu mencoba memprediksi sifat data yang tidak diketahui. Jika tiap sampel lebih dari satu angka, misalnya entri multi-dimensi (multivariate data), dikatakan punya beberapa attribute atau feature.

Dua kategori besar:
- Supervised learning: classification, regression.
- Unsupervised learning: clustering.

## 7.3 Training set dan testing set (13b hlm 5)

Praktik umum: mengevaluasi algoritma dengan membagi data menjadi dua.
- Training set: tempat kita mempelajari beberapa sifat.
- Testing set: tempat kita menguji sifat yang dipelajari.

## 7.4 Memuat dataset contoh (13b hlm 6-8)

- scikit-learn punya beberapa dataset standar: iris dan digits (classification), diabetes (regression).
- Dataset adalah objek mirip dictionary yang menyimpan semua data dan metadata. Data ada di anggota .data, yaitu array (n_samples, n_features). Untuk masalah supervised, satu atau lebih response variable disimpan di anggota .target.

Dataset digits: tiap datapoint adalah gambar 8x8 sebuah digit. Classes 10, samples per class sekitar 180, samples total 1797, dimensionality 64, features berupa integer 0-16 (greyscale). Dokumentasi: sklearn.datasets.load_digits.

```python
from sklearn import datasets
iris = datasets.load_iris()
digits = datasets.load_digits()

digits.data           # array (1797, 64)
digits.data.shape     # (1797, 64)
digits.target         # array([0, 1, 2, ..., 8, 9, 8])
digits.images.shape   # (1797, 8, 8)
digits.target_names   # array 0..9
print(digits.DESCR)   # deskripsi dataset
```

## 7.5 Learning dan predicting (13b hlm 9-11)

- Pada dataset digits, tugasnya memprediksi, dari sebuah gambar, digit mana yang diwakilinya.
- Diberi sampel dari tiap 10 kelas (digit 0..9), kita fit sebuah estimator agar bisa memprediksi kelas sampel yang belum terlihat.
- Di scikit-learn, estimator untuk classification adalah objek Python yang mengimplementasikan method fit(X, y) dan predict(T). Juga ada predict_proba().
- Contoh kelas: sklearn.svm.SVC, yang mengimplementasikan support vector classification.

Memilih parameter (hlm 10). Instance estimator clf pertama kali di-fit ke model: harus belajar dari model, dengan memberi training set ke method fit. Training set di contoh: semua gambar di dataset kecuali gambar terakhir (disimpan untuk prediksi).

Memprediksi (hlm 11). Prediksi memakai gambar terakhir dari digits.data. Hasil array([8]). Slide bertanya: setuju dengan classifier?

```python
from sklearn import datasets, svm
digits = datasets.load_digits()

clf = svm.SVC(gamma=0.001, C=100.)
clf.fit(digits.data[:-1], digits.target[:-1])
# SVC(C=100.0, gamma=0.001)

clf.predict(digits.data[-1:])
# array([8])

# cek dengan label sebenarnya
print(digits.target[-1])                 # 8

# tampilkan gambar yang diprediksi
import matplotlib.pyplot as plt
plt.imshow(digits.images[-1], cmap="gray_r")
plt.title("label: " + str(digits.target[-1]))
plt.show()
```

## 7.6 Resep yang sama: kNN dan k-means (Short Version hlm 28)

Setiap estimator: load, split, fit, predict atau score. kNN belajar dari X dan y. k-means hanya diberi X.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
knn.score(X_test, y_test)            # akurasi pada data yang belum terlihat
# 0.9736842105263158

km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)   # tanpa y
km.labels_[[0, 50, 100]]             # satu bunga dari tiap spesies
# array([1, 0, 2], dtype=int32)
```

Catatan: angka 0.9736842105263158 adalah 37 dari 38 benar (iris 150 sampel, test 25 persen = 38 sampel). Nomor cluster k-means (1, 0, 2) tidak harus sama dengan nomor kelas asli (0, 1, 2), dan bisa berbeda antar versi scikit-learn. Yang penting satu bunga dari tiap spesies jatuh ke cluster yang berbeda.

---

# 8. Syntax lengkap scikit-learn

## 8.1 Boilerplate

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline

from sklearn import datasets
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import (accuracy_score, confusion_matrix, classification_report,
                             precision_score, recall_score, f1_score)

import sklearn
print(sklearn.__version__)
```

## 8.2 Dataset

```python
from sklearn import datasets

# dataset bawaan (kecil, ikut terpasang)
iris   = datasets.load_iris()            # 150 x 4, 3 kelas (classification)
digits = datasets.load_digits()          # 1797 x 64, 10 kelas
wine   = datasets.load_wine()            # 178 x 13, 3 kelas
bc     = datasets.load_breast_cancer()   # 569 x 30, 2 kelas
diab   = datasets.load_diabetes()        # 442 x 10, regression (target kontinu)

# atribut
iris.data, iris.target                   # X dan y (array)
iris.feature_names                       # nama fitur
iris.target_names                        # nama kelas
iris.DESCR                               # deskripsi
iris.data.shape, iris.target.shape       # (150, 4), (150,)

# langsung X dan y
X, y = datasets.load_iris(return_X_y=True)

# sebagai DataFrame
iris = datasets.load_iris(as_frame=True)
df = iris.frame                          # fitur + kolom target
X = iris.data                            # DataFrame fitur
y = iris.target                          # Series

# DataFrame manual dari bunch
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df["species"] = iris.target
df["species_name"] = df["species"].map(dict(enumerate(iris.target_names)))

# dataset sintetis
X, y = datasets.make_classification(n_samples=200, n_features=4, n_informative=3,
                                    n_redundant=0, n_classes=2, random_state=0)
X, y = datasets.make_blobs(n_samples=200, centers=3, cluster_std=1.0, random_state=0)
X, y = datasets.make_moons(n_samples=200, noise=0.1, random_state=0)
X, y = datasets.make_regression(n_samples=200, n_features=3, noise=10, random_state=0)

# dari internet (butuh koneksi)
from sklearn.datasets import fetch_openml
X, y = fetch_openml("mnist_784", version=1, return_X_y=True, as_frame=False)
```

## 8.3 Dataset sendiri lewat gdown (pengingat dari prak 8)

```python
!pip install -q gdown
import gdown
gdown.download(id="FILE_ID_DRIVE", output="data.csv", quiet=False)
# atau:  !gdown FILE_ID_DRIVE -O data.csv
df = pd.read_csv("data.csv")

# pemisahan fitur dan target
X = df.drop(columns=["target"])
y = df["target"]
```

## 8.4 Persiapan data (pendahulu pandas)

```python
df.head(); df.shape; df.dtypes; df.info(); df.describe()
df.isna().sum()
df = df.dropna()                                        # buang baris NaN
df["a"] = df["a"].fillna(df["a"].median())              # isi median
df = df.drop_duplicates()
df["churn"] = df["churn"].map({"Yes": 1, "No": 0})      # label ke angka
df = pd.get_dummies(df, columns=["kategori"], dtype=int)  # one-hot
df["a"] = pd.to_numeric(df["a"], errors="coerce")
df.corr(numeric_only=True)["target"].sort_values()
y.value_counts()                                        # cek keseimbangan kelas
X = df.drop(columns=["target"]); y = df["target"]
```

## 8.5 Membagi data

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.25,        # default 0.25; boleh angka bulat (jumlah sampel)
    train_size=None,       # alternatif test_size
    random_state=0,        # hasil bisa diulang
    shuffle=True,          # default True
    stratify=y,            # pertahankan proporsi kelas
)
print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
```

## 8.6 Preprocessing

```python
from sklearn.preprocessing import (StandardScaler, MinMaxScaler, RobustScaler,
                                   LabelEncoder, OrdinalEncoder, OneHotEncoder)
from sklearn.impute import SimpleImputer

# scaling: fit hanya di train, transform di train dan test
scaler = StandardScaler()                # rata-rata 0, std 1
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)      # jangan fit ulang di test
scaler.mean_, scaler.scale_

mm = MinMaxScaler(feature_range=(0, 1))  # skala ke 0..1
X_train_m = mm.fit_transform(X_train)
rb = RobustScaler()                      # tahan outlier (median dan IQR)

# encoding
le = LabelEncoder()
y_num = le.fit_transform(y)              # label teks ke 0,1,2,...
le.classes_                              # urutan kelas
le.inverse_transform([0, 1, 2])          # balik ke teks

oe = OrdinalEncoder()
X_cat = oe.fit_transform(df[["size"]])

ohe = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
arr = ohe.fit_transform(df[["color"]])
ohe.get_feature_names_out()

# imputasi nilai hilang
imp = SimpleImputer(strategy="mean")     # mean, median, most_frequent, constant
X_train_i = imp.fit_transform(X_train)
X_test_i = imp.transform(X_test)
```

## 8.7 Model klasifikasi

```python
# k-Nearest Neighbors
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(
    n_neighbors=5,          # jumlah tetangga (k)
    weights="uniform",      # "uniform" atau "distance"
    metric="minkowski",     # jenis jarak
    p=2,                    # p=2 Euclidean, p=1 Manhattan
)
knn.fit(X_train, y_train)
knn.predict(X_test)
knn.predict_proba(X_test)                       # peluang tiap kelas
knn.score(X_test, y_test)                       # akurasi
knn.kneighbors(X_test[:1], n_neighbors=3)       # jarak dan indeks tetangga

# SVC (support vector classification)
from sklearn.svm import SVC
svc = SVC(kernel="rbf", C=100., gamma=0.001, probability=True)   # kernel: linear, poly, rbf, sigmoid
svc.fit(X_train, y_train)
svc.predict(X_test)
svc.decision_function(X_test)
svc.support_vectors_.shape

# Logistic regression
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression(max_iter=1000).fit(X_train_s, y_train)
lr.coef_, lr.intercept_

# Decision tree dan random forest
from sklearn.tree import DecisionTreeClassifier, plot_tree
dt = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_train, y_train)
plot_tree(dt, filled=True, feature_names=list(X.columns) if hasattr(X, "columns") else None)
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=0).fit(X_train, y_train)
rf.feature_importances_

# Naive Bayes
from sklearn.naive_bayes import GaussianNB
nb = GaussianNB().fit(X_train, y_train)
```

## 8.8 Model regresi

```python
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

reg = LinearRegression().fit(X_train, y_train)
reg.coef_, reg.intercept_
pred = reg.predict(X_test)
r2_score(y_test, pred)
mean_absolute_error(y_test, pred)
mean_squared_error(y_test, pred)
np.sqrt(mean_squared_error(y_test, pred))        # RMSE
reg.score(X_test, y_test)                        # R kuadrat
```

## 8.9 Clustering

```python
from sklearn.cluster import KMeans, MiniBatchKMeans, AgglomerativeClustering, DBSCAN

km = KMeans(
    n_clusters=3,           # k
    init="k-means++",       # atau "random"
    n_init=10,              # berapa kali dijalankan dengan centroid awal berbeda
    max_iter=300,
    random_state=0,
)
km.fit(X)                   # tanpa y
labels = km.fit_predict(X)  # fit sekaligus kembalikan label
km.labels_                  # cluster tiap sampel
km.cluster_centers_         # centroid (k x n_fitur)
km.inertia_                 # jumlah kuadrat jarak ke centroid (makin kecil makin rapat)
km.n_iter_                  # iterasi sampai konvergen
km.predict(X_new)           # cluster terdekat untuk data baru
km.transform(X_new)         # jarak ke tiap centroid

agg = AgglomerativeClustering(n_clusters=3, linkage="ward").fit(X)
db = DBSCAN(eps=0.5, min_samples=5).fit(X)       # label -1 = noise

# memilih k: elbow dan silhouette
from sklearn.metrics import silhouette_score
inertias, sils = [], []
ks = range(2, 11)
for k in ks:
    m = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    inertias.append(m.inertia_)
    sils.append(silhouette_score(X, m.labels_))
plt.plot(ks, inertias, marker="o"); plt.xlabel("k"); plt.ylabel("inertia"); plt.show()
plt.plot(ks, sils, marker="o"); plt.xlabel("k"); plt.ylabel("silhouette"); plt.show()

# cluster vs label asli
from sklearn.metrics import adjusted_rand_score
adjusted_rand_score(y, km.labels_)
pd.crosstab(y, km.labels_, rownames=["label asli"], colnames=["cluster"])
```

## 8.10 Jarak di scikit-learn dan scipy

```python
from sklearn.metrics.pairwise import (euclidean_distances, manhattan_distances,
                                      cosine_distances, pairwise_distances)
from scipy.spatial import distance

euclidean_distances(A, B)
manhattan_distances(A, B)
pairwise_distances(A, metric="minkowski", p=3)
pairwise_distances(A, metric="chebyshev")

distance.euclidean([1, 0, 1], [0, 1, 0])
distance.cityblock([1, 0, 1], [0, 1, 0])              # Manhattan
distance.minkowski([1, 0, 1], [0, 1, 0], p=3)
```

## 8.11 Evaluasi klasifikasi

```python
from sklearn.metrics import (accuracy_score, confusion_matrix, ConfusionMatrixDisplay,
                             precision_score, recall_score, f1_score,
                             classification_report, roc_auc_score)

y_pred = knn.predict(X_test)
accuracy_score(y_test, y_pred)
confusion_matrix(y_test, y_pred)                  # baris = kelas asli, kolom = prediksi
confusion_matrix(y_test, y_pred, labels=[1, 0])   # atur urutan (positif dulu)
print(classification_report(y_test, y_pred))      # precision, recall, f1, support per kelas
precision_score(y_test, y_pred, average="macro")  # multi-kelas: macro, micro, weighted
recall_score(y_test, y_pred, average="macro")
f1_score(y_test, y_pred, average="macro")
ConfusionMatrixDisplay.from_predictions(y_test, y_pred)   # gambar
plt.show()
ConfusionMatrixDisplay.from_estimator(knn, X_test, y_test)

# heatmap seaborn
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
plt.xlabel("Prediksi"); plt.ylabel("Aktual"); plt.show()

# biner: TP, FP, TN, FN, sensitivity, specificity
tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()   # urutan sklearn: TN FP FN TP
sensitivity = tp / (tp + fn)       # sama dengan recall
specificity = tn / (tn + fp)
ppv = tp / (tp + fp)               # sama dengan precision
accuracy = (tp + tn) / (tp + tn + fp + fn)

# akurasi training vs test (cek overfit)
knn.score(X_train, y_train), knn.score(X_test, y_test)
```

## 8.12 Validasi dan tuning

```python
from sklearn.model_selection import (cross_val_score, cross_val_predict, KFold,
                                     StratifiedKFold, GridSearchCV, RandomizedSearchCV)

scores = cross_val_score(KNeighborsClassifier(n_neighbors=5), X, y, cv=5)   # 5-fold
scores.mean(), scores.std()
kf = KFold(n_splits=5, shuffle=True, random_state=0)
cross_val_score(knn, X, y, cv=kf, scoring="accuracy")    # scoring: accuracy, f1_macro, ...
cross_val_predict(knn, X, y, cv=5)

# mencari k terbaik secara manual
for k in range(1, 16):
    s = cross_val_score(KNeighborsClassifier(n_neighbors=k), X, y, cv=5).mean()
    print(k, round(s, 4))

grid = GridSearchCV(KNeighborsClassifier(),
                    param_grid={"n_neighbors": range(1, 16), "weights": ["uniform", "distance"]},
                    cv=5)
grid.fit(X_train, y_train)
grid.best_params_, grid.best_score_
grid.best_estimator_
grid.score(X_test, y_test)
pd.DataFrame(grid.cv_results_)
```

## 8.13 Pipeline

```python
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import GridSearchCV

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("knn", KNeighborsClassifier(n_neighbors=5)),
])
pipe.fit(X_train, y_train)
pipe.predict(X_test)
pipe.score(X_test, y_test)

pipe2 = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))
GridSearchCV(pipe, {"knn__n_neighbors": range(1, 11)}, cv=5).fit(X_train, y_train)

ct = ColumnTransformer([
    ("num", StandardScaler(), ["umur", "gaji"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["kota"]),
])
```

## 8.14 API estimator umum

```python
model.fit(X, y)                  # supervised; unsupervised: model.fit(X)
model.predict(X_new)
model.predict_proba(X_new)       # peluang (jika ada)
model.decision_function(X_new)   # hanya ada di sebagian model (SVC, LogisticRegression), tidak di kNN
model.score(X_test, y_test)
model.transform(X_new)           # preprocessing, KMeans
model.fit_transform(X)
model.fit_predict(X)             # clustering
model.get_params()
model.set_params(n_neighbors=7)

# menyimpan dan memuat model
import joblib
joblib.dump(model, "model.joblib")
model = joblib.load("model.joblib")
```

## 8.15 Visualisasi hasil

```python
# scatter cluster dengan centroid (2 fitur pertama)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
plt.scatter(X[:, 0], X[:, 1], c=km.labels_, cmap="viridis")
plt.scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1],
            c="red", marker="X", s=200, label="centroid")
plt.legend(); plt.show()

# batas keputusan classifier 2 fitur
from sklearn.inspection import DecisionBoundaryDisplay
knn2 = KNeighborsClassifier(n_neighbors=5).fit(X[:, :2], y)
DecisionBoundaryDisplay.from_estimator(knn2, X[:, :2], response_method="predict", alpha=0.4)
plt.scatter(X[:, 0], X[:, 1], c=y, edgecolor="k"); plt.show()

# pairplot dataset iris
sns.pairplot(iris.frame, hue="target")

# beberapa digit
fig, axes = plt.subplots(2, 5, figsize=(10, 4))
for ax, img, lbl in zip(axes.ravel(), digits.images, digits.target):
    ax.imshow(img, cmap="gray_r"); ax.set_title(lbl); ax.axis("off")
plt.show()
```

---

# 9. Pola poin soal dan kerangka satu soal ML

Pola kalimat soal yang mungkin dan potongan jawabannya:

```python
# Muat dataset dan tampilkan ukuran
df = pd.read_csv("data.csv"); print(df.shape); df.head()

# Pisahkan fitur dan target, bagi 80 persen train 20 persen test
X = df.drop(columns=["target"]); y = df["target"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Latih kNN dengan k = 3 dan laporkan akurasi
knn = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)
print("Akurasi:", accuracy_score(y_test, knn.predict(X_test)))

# Cari nilai k terbaik antara 1 dan 20
best_k, best = 1, 0
for k in range(1, 21):
    s = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train).score(X_test, y_test)
    if s > best: best_k, best = k, s
print(best_k, best)

# Skalakan fitur lalu bandingkan akurasi sebelum dan sesudah
sc = StandardScaler().fit(X_train)
knn_s = KNeighborsClassifier(n_neighbors=3).fit(sc.transform(X_train), y_train)
print(knn_s.score(sc.transform(X_test), y_test))

# Tampilkan confusion matrix, sensitivity, dan specificity
cm = confusion_matrix(y_test, knn.predict(X_test)); print(cm)

# Kelompokkan dengan k-means (k = 3) dan bandingkan dengan label asli
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
print(pd.crosstab(y, km.labels_))

# Prediksi satu data baru (input harus 2D)
knn.predict([[5.1, 3.5, 1.4, 0.2]])
knn.predict(X_test.iloc[[0]])

# Simpan hasil prediksi
out = X_test.copy(); out["pred"] = knn.predict(X_test); out.to_csv("hasil.csv", index=False)
```

Kerangka satu soal lengkap:

```python
# a. muat data
import gdown
gdown.download(id="FILE_ID", output="data.csv"); df = pd.read_csv("data.csv")
df.head(); df.shape; df.dtypes; df.isna().sum()
# b. bersihkan: NaN, tipe, duplikat, kategori ke angka
df = df.dropna().drop_duplicates()
df = pd.get_dummies(df, columns=["kategori"], dtype=int)
# c. fitur dan target
X = df.drop(columns=["target"]); y = df["target"]
# d. bagi data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
# e. skala (fit di train saja)
sc = StandardScaler(); X_train_s = sc.fit_transform(X_train); X_test_s = sc.transform(X_test)
# f. latih
knn = KNeighborsClassifier(n_neighbors=5).fit(X_train_s, y_train)
# g. prediksi dan evaluasi
y_pred = knn.predict(X_test_s)
print(accuracy_score(y_test, y_pred)); print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
# h. unsupervised pada fitur yang sama
km = KMeans(n_clusters=y.nunique(), n_init=10, random_state=0).fit(X_train_s)
print(pd.crosstab(y_train, km.labels_))
# i. simpan
pd.DataFrame({"actual": y_test.values, "pred": y_pred}).to_csv("hasil.csv", index=False)
```

---

# 10. Checklist jebakan

- Scaler di-fit hanya pada data train, lalu transform ke test. Jangan fit ulang di test.
- Pakai random_state supaya split dan k-means menghasilkan angka yang sama setiap kali.
- Nomor cluster k-means tidak sama dengan label kelas asli. Bandingkan dengan crosstab atau adjusted_rand_score, jangan accuracy langsung.
- KMeans: isi n_init secara eksplisit (versi baru default berubah dari 10 ke auto, peringatan FutureWarning).
- kNN dan k-means berbasis jarak: skala fitur berbeda (misal kaki 0..4 lawan biner 0..1, atau gaji lawan umur) membuat satu fitur mendominasi. Skalakan atau rekayasa fitur.
- predict butuh input 2D: pakai digits.data[-1:] atau X_test.iloc[[0]], bukan digits.data[-1].
- X berbentuk (n_samples, n_features), y berbentuk 1D (n_samples,).
- Evaluasi dengan score pada test set, bukan train. Bandingkan score train dan test untuk mendeteksi overfit.
- Accuracy menipu pada data tidak seimbang. Lihat confusion matrix, sensitivity, specificity, precision, recall.
- Urutan confusion_matrix sklearn untuk biner: baris dan kolom urut kelas 0 lalu 1, sehingga ravel() menghasilkan TN, FP, FN, TP.
- Dua model dengan akurasi sama belum tentu sama baik: bandingkan jenis kesalahan (false positive vs false negative).
- Model makin kompleks, training error makin kecil, tetapi bisa overfit.
- Pakai stratify=y pada train_test_split untuk klasifikasi dengan kelas tidak seimbang.
- Kolom kategori harus diubah ke angka (get_dummies, map, OneHotEncoder) sebelum fit. Hapus kolom ID.
- Data hilang (NaN) harus ditangani sebelum fit, sklearn kebanyakan tidak menerima NaN.
- Hasil prediksi bergantung pada pilihan fitur, distance metric, dan batasan kompleksitas (jumlah cluster, kompleksitas permukaan pemisah).
- Jalankan ulang seluruh notebook sebelum submit supaya output tersimpan. Nama file: NIM_sklearntut.ipynb. Periksa deadline (Kamis 19 November 2026 pukul 15.00 WIB atau Senin 23 November 2026 pukul 17.00 WIB, kedua slide berbeda).
