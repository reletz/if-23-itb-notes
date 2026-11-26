---
type: Note
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

# Cheatsheet IF5100 - Classification

Sumber: IF5100-14a Classification v2 (48 hlm) dan 14b Classification Classroom Study (4 hlm). Nomor hlm di bawah merujuk ke 14a kecuali ditulis 14b. Dasar sklearn, clustering, dan jarak ada di [[Cheatsheet Prak 9 IF5100]].

Daftar isi:
1. Konsep classifier
2. Matriks jarak, nearest neighbor, dan kNN
3. Evaluasi classifier
4. Studi kasus: runner dan Titanic
5. Metodologi testing
6. Logistic regression
7. Cutoff, ROC, dan AUC
8. Classroom study: mobile phone prices (14b)
9. Syntax lengkap sklearn untuk klasifikasi
10. Checklist jebakan

---

# 1. Konsep classifier

Classifier (hlm 3): model supervised learning yang memasukkan tiap contoh ke salah satu dari himpunan kelas (label) yang terbatas. Contoh: email ini spam atau bukan.

Jenis berdasarkan jumlah kelas (hlm 3):

| Jenis | Isi | Contoh |
|---|---|---|
| One-class learning | Training data hanya dari satu kelas. Pelajari seperti apa yang normal, tandai yang tidak cocok. Dipakai saat contoh di luar kelas itu jarang | anomaly detection, serangan jaringan yang belum pernah dilihat |
| Two-class (binary) | Tepat dua label | spam atau bukan, survived atau died, male atau female |
| Multi-class | Tiga label atau lebih | digit 0 sampai 9 tulisan tangan, spesies hewan |

Regression vs classification (hlm 4):

| | Regression | Classification |
|---|---|---|
| Memprediksi | bilangan real dari feature vector | label dari himpunan kelas terbatas |
| Contoh | linear regression untuk harga rumah dari luas lantai | spam atau bukan, survived atau died |
| Output | nilai apa saja: 412.7, 0.003, -15 | salah satu dari beberapa kategori |

Keduanya supervised learning: belajar dari contoh yang jawaban benarnya (label) diketahui. Bedanya hanya jenis output.

---

# 2. Matriks jarak, nearest neighbor, dan kNN

## 2.1 Contoh data: reptil (hlm 5)

Lima kolom pertama adalah features, kolom Reptile adalah label.

| Name | Egg-laying | Scales | Poisonous | Cold-blooded | Legs | Reptile |
|---|---|---|---|---|---|---|
| Cobra | 1 | 1 | 1 | 1 | 0 | 1 |
| Rattlesnake | 1 | 1 | 1 | 1 | 0 | 1 |
| Boa constrictor | 0 | 1 | 0 | 1 | 0 | 1 |
| Chicken | 1 | 1 | 0 | 1 | 2 | 0 |
| Guppy | 0 | 1 | 0 | 0 | 0 | 0 |
| Dart frog | 1 | 0 | 1 | 0 | 4 | 0 |
| Zebra | 0 | 0 | 0 | 0 | 4 | 0 |
| Python | 1 | 1 | 0 | 1 | 0 | 1 |
| Alligator | 1 | 1 | 0 | 1 | 4 | 1 |

## 2.2 Matriks jarak Euclidean (hlm 6)

| | cobra | rattle | boa | chicken | guppy | dart | zebra | python | allig |
|---|---|---|---|---|---|---|---|---|---|
| cobra | - | 0.0 | 1.414 | 2.236 | 1.732 | 1.732 | 2.236 | 1.0 | 1.414 |
| rattlesnake | 0.0 | - | 1.414 | 2.236 | 1.732 | 1.732 | 2.236 | 1.0 | 1.414 |
| boa | 1.414 | 1.414 | - | 2.236 | 1.0 | 2.236 | 1.732 | 1.0 | 1.414 |
| chicken | 2.236 | 2.236 | 2.236 | - | 2.449 | 2.0 | 2.0 | 2.0 | 1.0 |
| guppy | 1.732 | 1.732 | 1.0 | 2.449 | - | 2.0 | 1.414 | 1.414 | 1.732 |
| dart frog | 1.732 | 1.732 | 2.236 | 2.0 | 2.0 | - | 1.414 | 2.0 | 1.732 |
| zebra | 2.236 | 2.236 | 1.732 | 2.0 | 1.414 | 1.414 | - | 2.0 | 1.732 |
| python | 1.0 | 1.0 | 1.0 | 2.0 | 1.414 | 2.0 | 2.0 | - | 1.0 |
| alligator | 1.414 | 1.414 | 1.414 | 1.0 | 1.732 | 1.732 | 1.732 | 1.0 | - |

Perhatian: matriks ini tidak bisa dihitung langsung dari tabel hlm 5. Angkanya cocok kalau kaki 4 diganti 1 (dart frog, zebra, alligator) tetapi chicken tetap 2. Kalau soal minta menghitung, pakai fitur yang diberikan soal.

```python
import numpy as np
import pandas as pd
from sklearn.metrics import pairwise_distances

names = ["cobra", "rattlesnake", "boa", "chicken", "guppy",
         "dart frog", "zebra", "python", "alligator"]
# egg, scales, poisonous, cold, legs (versi yang cocok dengan matriks hlm 6)
animals = pd.DataFrame([
    [1,1,1,1,0], [1,1,1,1,0], [0,1,0,1,0], [1,1,0,1,2], [0,1,0,0,0],
    [1,0,1,0,1], [0,0,0,0,1], [1,1,0,1,0], [1,1,0,1,1]],
    index=names, columns=["egg", "scales", "poison", "cold", "legs"])
label = pd.Series([1,1,1,0,0,0,0,1,1], index=names)

dist = pd.DataFrame(pairwise_distances(animals), index=names, columns=names)
print(dist.round(3))
```

## 2.3 Nearest neighbor (hlm 7)

Pendekatan paling sederhana:
1. Ingat training data (tidak ada langkah training sungguhan).
2. Untuk contoh baru x, cari contoh training dengan jarak terkecil ke x.
3. Prediksi label contoh terdekat itu.

Di plot slide: x tidak berlabel, tetangga terdekatnya merah, jadi diprediksi merah.

## 2.4 Memakai matriks jarak untuk klasifikasi (hlm 8)

Enam hewan pertama adalah training set berlabel: cobra R, rattlesnake R, boa R, chicken bukan R, guppy bukan R, dart frog bukan R. Zebra, python, alligator adalah data uji. Ambil baris hewan uji, lihat hanya kolom training, cari yang terkecil.

| Uji | Tetangga terdekat | k = 1 | k = 3 | Label asli |
|---|---|---|---|---|
| zebra | guppy 1.414, dart frog 1.414 | bukan R | bukan R | bukan R |
| python | cobra, rattlesnake, boa 1.0 | R | R | R |
| alligator | chicken 1.0, lalu cobra, rattlesnake, boa 1.414 | bukan R (salah) | R | R |

Pelajaran: nilai k mengubah prediksi.

```python
from sklearn.neighbors import KNeighborsClassifier

train, test = names[:6], names[6:]
for k in (1, 3):
    m = KNeighborsClassifier(n_neighbors=k).fit(animals.loc[train], label[train])
    print(k, dict(zip(test, m.predict(animals.loc[test]).tolist())))
# 1 {'zebra': 0, 'python': 1, 'alligator': 0}
# 3 {'zebra': 0, 'python': 1, 'alligator': 1}
```

## 2.5 K-nearest neighbor (hlm 9-11)

Cari k contoh training terdekat, pilih label mayoritas.

- Contoh digit tulisan tangan: dengan 2 tetangga (satu angka 4, satu angka 9) apakah bisa memutuskan? Tidak, seri (hlm 9).
- Dengan 6 tetangga (tiga angka 4, dua angka 0, satu angka 9) mayoritasnya 4 (hlm 10).
- Hlm 11: lingkaran makin besar berarti k makin besar, komposisi tetangga berubah sehingga prediksi untuk x bisa berubah.

Praktisnya pada kasus biner pakai k ganjil supaya tidak seri. k terlalu kecil: peka terhadap noise (overfit). k terlalu besar: kelas mayoritas mendominasi.

## 2.6 Kelebihan dan kekurangan kNN (hlm 12)

Kelebihan:
- Learning cepat: tidak ada training eksplisit, cukup simpan data.
- Tidak butuh teori atau asumsi tentang data.
- Mudah dijelaskan: contoh ini paling mirip dengan k contoh tersebut.

Kekurangan:
- Boros memori, prediksi bisa lambat karena dibandingkan dengan semua contoh tersimpan. Struktur pencarian yang lebih pintar (k-d tree) mengalahkan brute force.
- Tidak ada model: tidak memberi tahu apa-apa tentang proses yang menghasilkan data.

---

# 3. Evaluasi classifier

## 3.1 Voter preference (hlm 13-14)

Pola pilihan 60 warga Amerika (simulasi), fitur Age dan Distance from Boston, kelas Dem (bintang) dan Rep (segitiga). 30 dipakai training. Dua model: garis solid (miring) dan garis putus-putus (tegak).

Confusion matrix pada training data. Baris = sebenarnya Dem, kolom = diprediksi Dem.

| Model | TP | FN | FP | TN | Accuracy |
|---|---|---|---|---|---|
| Solid line | 12 | 0 | 9 | 9 | 21/30 = 0.70 |
| Dashed line | 11 | 1 | 8 | 10 | 21/30 = 0.70 |

## 3.2 Model lebih kompleks dan overfit (hlm 15)

Batas berliku: accuracy training 0.83, tetapi pada data baru (test) hanya 0.60. Ini overfit. Karena itu model selalu dinilai pada data yang tidak dipakai training.

## 3.3 Rumus (hlm 14, 16)

| Metrik | Rumus | Arti |
|---|---|---|
| accuracy | (TP + TN) / (TP + TN + FP + FN) | proporsi prediksi benar |
| sensitivity (recall, TPR) | TP / (TP + FN) | dari yang benar positif, berapa yang ditemukan |
| specificity (TNR) | TN / (TN + FP) | dari yang benar negatif, berapa yang ditolak dengan benar |
| positive predictive value (precision) | TP / (TP + FP) | dari yang diprediksi positif, berapa yang benar |
| negative predictive value | TN / (TN + FN) | dari yang diprediksi negatif, berapa yang benar |
| FPR | FP / (FP + TN) = 1 - specificity | dari yang benar negatif, berapa yang salah ditandai |
| F1 (tambahan, muncul di classification report) | 2 x precision x recall / (precision + recall) | rata-rata harmonik |

## 3.4 Kapan accuracy menipu (hlm 16)

- Accuracy masuk akal kalau dua kelas ukurannya kira-kira sama.
- Accuracy sangat buruk kalau ada class imbalance besar.
- Contoh: penyakit terjadi pada 0.1 persen populasi. Selalu memprediksi bebas penyakit menghasilkan accuracy 0.999 (padahal sensitivity 0).

## 3.5 Fungsi metrik dan getStats

Slide memanggil getStats, sensitivity, dan specificity tetapi tidak menampilkan isinya. Versi di bawah ditulis ulang mengikuti buku Guttag bab 26. Definisikan ini dulu sebelum menjalankan kode bagian 5 sampai 7.

```python
def accuracy(tp, fp, tn, fn):
    return (tp + tn) / (tp + fp + tn + fn)

def sensitivity(tp, fn):
    return tp / (tp + fn) if tp + fn else float("nan")

def specificity(tn, fp):
    return tn / (tn + fp) if tn + fp else float("nan")

def posPredVal(tp, fp):
    return tp / (tp + fp) if tp + fp else float("nan")

def negPredVal(tn, fn):
    return tn / (tn + fn) if tn + fn else float("nan")

def getStats(truePos, falsePos, trueNeg, falseNeg, toPrint=True):
    accur = accuracy(truePos, falsePos, trueNeg, falseNeg)
    sens = sensitivity(truePos, falseNeg)
    spec = specificity(trueNeg, falsePos)
    ppv = posPredVal(truePos, falsePos)
    if toPrint:
        print(" Accuracy =", round(accur, 3))
        print(" Sensitivity =", round(sens, 3))
        print(" Specificity =", round(spec, 3))
        print(" Pos. Pred. Val. =", round(ppv, 3))
    return accur, sens, spec, ppv

# cek angka voter preference
getStats(12, 9, 9, 0)    # solid  : accuracy 0.7, sens 1.0, spec 0.5, ppv 0.571
getStats(11, 8, 10, 1)   # dashed : accuracy 0.7, sens 0.917, spec 0.556, ppv 0.579
```

---

# 4. Studi kasus: runner dan Titanic

## 4.1 Memprediksi gender pelari (hlm 17-21)

Data bm_results2012.csv (Boston Marathon 2012), ada di course code bundle bersama chapter26.py dan TitanicPassengers.csv. Baris pertamanya:

    Name,Gender,Age,Div,Ctry,Time
    Gebremariam Gebregziabher,M,27,14,ETH,142.93
    Matebo Levy,M,22,2,KEN,133.10
    Cherop Sharon,F,28,1,KEN,151.83

- Fungsi build_marathon_examples membaca CSV dan membuat himpunan contoh.
- Tiap contoh adalah instance class Runner.
- Label = gender, feature vector = [age, finishing time].
- Method yang menarik hanya feature_dist: jarak Euclidean antar feature vector dua pelari.
- Data dibagi 80 persen training dan 20 persen held-out test set dengan divide_80_20.
- Baseline: 58 persen pelari di training set adalah pria. Selalu menebak male menghasilkan accuracy sekitar 58 persen. Classifier yang lebih canggih harus dibandingkan dengan baseline ini.

```python
import random
import numpy as np
import pandas as pd

class Runner(object):
    def __init__(self, name, gender, age, time):
        self._name = name
        self._feature_vec = np.array([age, time])
        self._label = gender

    def feature_dist(self, other):
        return ((self._feature_vec-other._feature_vec)**2).sum()**0.5

    def get_time(self):
        return self._feature_vec[1]

    def get_age(self):
        return self._feature_vec[0]

    def get_label(self):
        return self._label

    def get_features(self):
        return self._feature_vec

    def __str__(self):
        return (f'{self._name}: {self.get_age()}, ' +
                f'{self.get_time()}, {self._label}')

def build_marathon_examples(file_name):
    df = pd.read_csv(file_name)
    examples = []
    for index, row in df.iterrows():
        a = Runner(row['Name'], row['Gender'], row['Age'], row['Time'])
        examples.append(a)
    return examples

def divide_80_20(examples):
    sample_indices = random.sample(range(len(examples)),
                                   len(examples)//5)
    training_set, test_set = [], []
    for i in range(len(examples)):
        if i in sample_indices:
            test_set.append(examples[i])
        else:
            training_set.append(examples[i])
    return training_set, test_set
```

Pakai:

```python
examples_runner = build_marathon_examples("bm_results2012.csv")
tr, te = divide_80_20(examples_runner)
print(sum(r.get_label() == "M" for r in tr) / len(tr))   # baseline
```

## 4.2 Titanic (hlm 22)

- RMS Titanic tenggelam di Atlantik Utara pagi 15 April 1912 setelah menabrak gunung es.
- Dari 1300 penumpang, 812 meninggal. Dari 918 awak, 703 meninggal.
- Database berisi 1046 penumpang dengan fitur: cabin class (1st, 2nd, 3rd), age, gender.
- Baseline: selalu menebak died memberi accuracy lebih dari 62 persen untuk penumpang dan lebih dari 76 persen untuk awak.

## 4.3 Class Passenger

Slide memakai class Passenger, getFeatures, getLabel, dan featureNames tetapi tidak menampilkan definisinya. Versi di bawah ditulis ulang dari nama fitur di output hlm 38 (C1, C2, C3, age, male gender). Data diambil dari dataset titanic milik seaborn (butuh internet), bukan TitanicPassengers.csv, jadi angka hasilnya akan berbeda dari slide.

```python
import numpy as np
import seaborn as sns

class Passenger(object):
    featureNames = ('C1', 'C2', 'C3', 'age', 'male gender')

    def __init__(self, pClass, age, gender, survived):
        self.featureVec = [int(pClass == 1), int(pClass == 2),
                           int(pClass == 3), age, int(gender == 'male')]
        self.label = 'Survived' if survived else 'Died'

    def featureDist(self, other):
        diff = np.array(self.featureVec) - np.array(other.featureVec)
        return (diff**2).sum()**0.5

    def getFeatures(self):
        return self.featureVec[:]

    def getLabel(self):
        return self.label

titanic = sns.load_dataset('titanic').dropna(subset=['age'])
examples = [Passenger(r.pclass, r.age, r.sex, r.survived)
            for r in titanic.itertuples()]
print(len(examples))
```

Perhatian: Runner memakai nama method get_features dan get_label, sedangkan kode logistic regression memanggil getFeatures dan getLabel. Nama method harus sama dengan yang dipanggil.

---

# 5. Metodologi testing

## 5.1 Dua cara (hlm 23)

Satu kali split train/test bisa beruntung atau sial. Dua cara standar supaya estimasi lebih andal:

| | Leave-one-out (LOO) | Repeated random subsampling |
|---|---|---|
| Langkah | untuk tiap n contoh: latih pada n - 1 lainnya, uji pada yang ditinggal | ulangi k kali: split acak 80/20, latih pada 80, uji pada 20 |
| Hasil | gabungkan n hasil | rata-ratakan k hasil |
| Cocok | data kecil, butuh n kali fit model | data besar lebih murah, sebaran antar split menunjukkan kestabilan |

## 5.2 Kode (hlm 24-26)

method adalah fungsi apa saja berbentuk (training, test) yang mengembalikan (TP, FP, TN, FN). Sekarang kNN, nanti logistic regression.

random.sample mengambil len(examples)//5 indeks berbeda (20 persen) untuk test set, sisanya training.

```python
import random

def leaveOneOut(examples, method, toPrint = True):
    truePos, falsePos, trueNeg, falseNeg = 0, 0, 0, 0
    for i in range(len(examples)):
        testCase = examples[i]
        trainingData = examples[0:i] + examples[i+1:]
        results = method(trainingData, [testCase])
        truePos += results[0]
        falsePos += results[1]
        trueNeg += results[2]
        falseNeg += results[3]
    if toPrint:
        getStats(truePos, falsePos, trueNeg, falseNeg)
    return truePos, falsePos, trueNeg, falseNeg

def split80_20(examples):
    sampleIndices = random.sample(range(len(examples)),
                                  len(examples)//5)
    trainingSet, testSet = [], []
    for i in range(len(examples)):
        if i in sampleIndices:
            testSet.append(examples[i])
        else:
            trainingSet.append(examples[i])
    return trainingSet, testSet

def randomSplits(examples, method, numSplits, toPrint = True):
    truePos, falsePos, trueNeg, falseNeg = 0, 0, 0, 0
    random.seed(0)
    for t in range(numSplits):
        trainingSet, testSet = split80_20(examples)
        results = method(trainingSet, testSet)
        truePos += results[0]
        falsePos += results[1]
        trueNeg += results[2]
        falseNeg += results[3]
    getStats(truePos/numSplits, falsePos/numSplits,
             trueNeg/numSplits, falseNeg/numSplits, toPrint)
    return truePos/numSplits, falsePos/numSplits,\
             trueNeg/numSplits, falseNeg/numSplits
```

## 5.3 KNN pada Titanic (hlm 27)

Slide hanya menampilkan docstring KNearestClassify: menerima training dan testSet (list contoh) serta k bilangan bulat, memprediksi apakah tiap contoh di testSet berlabel label, lalu mengembalikan jumlah true positives, false positives, true negatives, false negatives. Badan fungsinya di bawah adalah tulisan ulang.

lambda dipakai untuk mengunci label dan k, sehingga bentuknya jadi (training, testSet).

```python
def findKNearest(example, exampleSet, k):
    pairs = sorted(((example.featureDist(e), i) for i, e in enumerate(exampleSet)))
    return [exampleSet[i] for _, i in pairs[:k]]

def KNearestClassify(training, testSet, label, k):
    """Assumes training & testSet lists of examples, k an int
       Predicts whether each example in testSet has label
       Returns number of true positives, false positives,
          true negatives, and false negatives"""
    truePos, falsePos, trueNeg, falseNeg = 0, 0, 0, 0
    for e in testSet:
        nearest = findKNearest(e, training, k)
        numMatch = sum(n.getLabel() == label for n in nearest)
        if numMatch > k//2:
            if e.getLabel() == label: truePos += 1
            else: falsePos += 1
        else:
            if e.getLabel() != label: trueNeg += 1
            else: falseNeg += 1
    return truePos, falsePos, trueNeg, falseNeg

knn = lambda training, testSet:\
             KNearestClassify(training, testSet, 'Survived', 3)

numSplits = 10
print('Average of', numSplits, '80/20 splits using KNN (k=3)')
truePos, falsePos, trueNeg, falseNeg =\
      randomSplits(examples, knn, numSplits)

print('Average of LOO testing using KNN (k=3)')
truePos, falsePos, trueNeg, falseNeg =\
      leaveOneOut(examples, knn)
```

## 5.4 Hasil di slide (hlm 28)

| KNN k = 3 | 10 random 80/20 | Leave-one-out |
|---|---|---|
| Accuracy | 0.766 | 0.769 |
| Sensitivity | 0.67 | 0.663 |
| Specificity | 0.836 | 0.842 |
| Pos. Pred. Val. | 0.747 | 0.743 |

Jauh lebih baik daripada baseline 62 persen (selalu menebak Died). Dua metode testing hampir sama hasilnya.

---

# 6. Logistic regression

## 6.1 Konsep (hlm 29)

- Mirip linear regression, tetapi dirancang untuk memprediksi probabilitas suatu kejadian.
- Dependent variable punya himpunan nilai terbatas, biasanya 0 atau 1.
- Mencari satu bobot untuk tiap fitur:
  - positif: fitur berkorelasi positif dengan outcome
  - negatif: berkorelasi negatif
  - magnitudo (besarnya): kekuatan korelasi
- Fitting bobot adalah masalah optimisasi berbasis fungsi log, diselesaikan sklearn.
- Kurvanya berbentuk S (sigmoid). Sumbu x = jumlah berbobot fitur, output = P(label = 1), selalu antara 0 dan 1. Cutoff default p = 0.5.

Rumus (tambahan, tidak tertulis di slide):

    z = b0 + b1 x1 + b2 x2 + ... + bn xn
    P(label = 1) = 1 / (1 + e^(-z))

Walaupun namanya regression, logistic regression dipakai untuk klasifikasi.

## 6.2 Class LogisticRegression (hlm 30)

Import: import sklearn.linear_model

| Anggota | Fungsi |
|---|---|
| fit(feature_vectors, labels) | melatih model, mengembalikan objek LogisticRegression yang sudah fit |
| coef_ | bobot tiap fitur (satu baris per batas kelas) |
| predict_proba(feature_vectors) | untuk tiap vektor, probabilitas tiap label, urut sesuai classes_ |
| classes_ | label yang dikenal model, contoh ['Died' 'Survived'] |

## 6.3 Membangun model (hlm 31, 38)

Kumpulkan feature vector dan label ke dua list paralel, lalu satu panggilan fit mempelajari bobot.

```python
import sklearn.linear_model

def buildModel(examples, toPrint = True):
    featureVecs, labels = [], []
    for e in examples:
        featureVecs.append(e.getFeatures())
        labels.append(e.getLabel())
    LogisticRegression = sklearn.linear_model.LogisticRegression
    model = LogisticRegression().fit(featureVecs, labels)
    if toPrint:
        print('model.classes_ =', model.classes_)
        for i in range(len(model.coef_)):
            print('For label', model.classes_[1])
            for j in range(len(model.coef_[0])):
                print('   ', Passenger.featureNames[j], '=',
                      model.coef_[0][j])
    return model
```

## 6.4 Menerapkan model (hlm 32, 34)

probs[i] = [P(Died), P(Survived)], jadi probs[i][1] adalah P(Survived). prob adalah decision cutoff (default 0.5).

```python
def applyModel(model, testSet, label, prob = 0.5):
    testFeatureVecs = [e.getFeatures() for e in testSet]
    probs = model.predict_proba(testFeatureVecs)
    truePos, falsePos, trueNeg, falseNeg = 0, 0, 0, 0
    for i in range(len(probs)):
        if probs[i][1] > prob:
            if testSet[i].getLabel() == label:
                truePos += 1
            else:
                falsePos += 1
        else:
            if testSet[i].getLabel() != label:
                trueNeg += 1
            else:
                falseNeg += 1
    return truePos, falsePos, trueNeg, falseNeg
```

## 6.5 List comprehension (hlm 33)

Bentuk: [ expr for id in L ]. Membuat list baru dengan mengevaluasi expr sekali untuk tiap elemen L, dengan id terikat ke elemen itu. Klausa if opsional hanya menyimpan elemen yang lolos tes.

```python
L = [x*x for x in range(10)]
print(L)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
L = [x*x for x in range(10) if x%2 == 0]
print(L)   # [0, 4, 16, 36, 64]

# loop yang setara
L = []
for x in range(10):
    L.append(x*x)
```

## 6.6 Digabung (hlm 35)

lr punya bentuk yang sama dengan knn, jadi fungsi testing bisa dipakai tanpa diubah.

```python
def lr(trainingData, testData, prob = 0.5):
    model = buildModel(trainingData, False)
    results = applyModel(model, testData, 'Survived', prob)
    return results

numSplits = 10
print('Average of', numSplits, '80/20 splits LR')
truePos, falsePos, trueNeg, falseNeg =\
      randomSplits(examples, lr, numSplits)

print('Average of LOO testing using LR')
truePos, falsePos, trueNeg, falseNeg =\
      leaveOneOut(examples, lr)
```

## 6.7 Hasil dan perbandingan (hlm 36-37)

| | KNN 80/20 | LR 80/20 | KNN LOO | LR LOO |
|---|---|---|---|---|
| Accuracy | 0.766 | 0.804 | 0.769 | 0.786 |
| Sensitivity | 0.67 | 0.719 | 0.663 | 0.705 |
| Specificity | 0.836 | 0.859 | 0.842 | 0.842 |
| Pos. Pred. Val. | 0.747 | 0.767 | 0.743 | 0.754 |

- Performa mirip: selisihnya hanya beberapa poin di tiap metrik.
- LR sedikit lebih baik di tiap metrik (specificity LOO sama, 0.842).
- LR memberi insight: bobot fiturnya menunjukkan variabel mana yang penting.

## 6.8 Membaca bobot (hlm 38)

```python
buildModel(examples, True)
```

Output di slide:

    model.classes_ = ['Died' 'Survived']
    For label Survived
     C1 = 1.66761946545
     C2 = 0.460354552452
     C3 = -0.50338282535
     age = -0.0314481062387
     male gender = -2.39514860929

- Cara baca: kelas 1 dan perempuan berarti peluang selamat lebih tinggi. Umur berpengaruh negatif kecil.
- Bobot bernilai untuk label classes_[1] (Survived).
- Hati-hati: fitur sering berkorelasi, jadi jangan terlalu menafsirkan bobot satu per satu.
- Tambahan: besar bobot bergantung pada skala fitur. Umur berskala puluhan, sedangkan gender 0 atau 1, jadi bobot umur yang kecil belum tentu berarti tidak penting.

---

# 7. Cutoff, ROC, dan AUC

## 7.1 Mengubah cutoff (hlm 39)

```python
random.seed(0)
trainingSet, testSet = split80_20(examples)
model = buildModel(trainingSet, False)
print('Try p = 0.1')
truePos, falsePos, trueNeg, falseNeg = applyModel(model, testSet, 'Survived', 0.1)
getStats(truePos, falsePos, trueNeg, falseNeg)
print('Try p = 0.9')
truePos, falsePos, trueNeg, falseNeg = applyModel(model, testSet, 'Survived', 0.9)
getStats(truePos, falsePos, trueNeg, falseNeg)
```

| Metrik | p = 0.1 | p = 0.9 |
|---|---|---|
| Accuracy | 0.493 | 0.656 |
| Sensitivity | 0.976 | 0.176 |
| Specificity | 0.161 | 0.984 |
| Pos. Pred. Val. | 0.444 | 0.882 |

- Cutoff rendah: sering memprediksi Survived, hampir semua yang selamat tertangkap, tetapi banyak false alarm.
- Cutoff tinggi: jarang memprediksi Survived, false alarm sedikit, tetapi sebagian besar yang selamat terlewat.
- Cutoff adalah trade-off yang kita pilih.

## 7.2 ROC langkah 1: satu cutoff (hlm 40)

Cutoff p = 0.5, 10 penumpang:

| Name | P(Survived) | Truly | Predicted | Outcome |
|---|---|---|---|---|
| A | 0.95 | Survived | Survived | TP |
| B | 0.85 | Survived | Survived | TP |
| C | 0.70 | Died | Survived | FP |
| D | 0.60 | Survived | Survived | TP |
| E | 0.55 | Died | Survived | FP |
| F | 0.40 | Survived | Died | FN |
| G | 0.30 | Died | Died | TN |
| H | 0.20 | Died | Died | TN |
| I | 0.15 | Died | Died | TN |
| J | 0.05 | Died | Died | TN |

TP = 3, FN = 1, FP = 2, TN = 4.

TPR = TP / (TP + FN) = 3/4 = 0.75 (bagian dari 4 yang selamat yang tertangkap)

FPR = FP / (FP + TN) = 2/6 = 0.33 (bagian dari 6 yang tidak selamat yang salah ditandai)

Satu cutoff menghasilkan satu titik (0.33, 0.75).

## 7.3 ROC langkah 2: semua cutoff (hlm 41)

| Cutoff p | Diprediksi Survived | TP | FP | TPR = TP/4 | FPR = FP/6 |
|---|---|---|---|---|---|
| 1.00 | tidak ada | 0 | 0 | 0.00 | 0.00 |
| 0.90 | 1 | 1 | 0 | 0.25 | 0.00 |
| 0.75 | 2 | 2 | 0 | 0.50 | 0.00 |
| 0.65 | 3 | 2 | 1 | 0.50 | 0.17 |
| 0.58 | 4 | 3 | 1 | 0.75 | 0.17 |
| 0.50 | 5 | 3 | 2 | 0.75 | 0.33 |
| 0.35 | 6 | 4 | 2 | 1.00 | 0.33 |
| 0.10 | 9 | 4 | 5 | 1.00 | 0.83 |
| 0.00 | semua 10 | 4 | 6 | 1.00 | 1.00 |

Menurunkan p berarti lebih banyak yang diprediksi Survived, sehingga TP dan FP hanya bisa naik: titik bergerak ke atas atau ke kanan.

## 7.4 ROC langkah 3: plot (hlm 42)

1. Tiap baris tabel menjadi satu titik: x = FPR, y = TPR.
2. Hubungkan titik dari (0, 0) ke (1, 1).
3. Garis itu adalah ROC curve model.

Diagonal putus-putus: model yang menebak acak (TPR = FPR untuk semua cutoff).

## 7.5 Cara membaca ROC (hlm 43)

- Makin dekat ke kiri atas makin baik: TPR tinggi dan FPR rendah sekaligus. Titik sempurna (0, 1).
- Di diagonal berarti menebak: model tidak belajar apa-apa.
- Di bawah diagonal berarti lebih buruk dari menebak: balik prediksinya, jadi bagus.
- Memilih cutoff = memilih titik: geser sepanjang kurva untuk menukar false alarm dengan jumlah yang tertangkap.
- Ujung: p = 1 tidak ada yang diprediksi selamat (0, 0), p = 0 semua diprediksi selamat (1, 1).

## 7.6 AUC (hlm 44-46)

- AUC (Area Under the Curve): satu angka untuk semua cutoff.
- 1.0 sempurna, 0.5 menebak acak. Makin tinggi makin baik memisahkan dua kelas.
- Arti: ambil satu yang selamat dan satu yang tidak secara acak. AUC = peluang model memberi skor lebih tinggi ke yang selamat.
- Contoh mainan: 4 x 6 = 24 pasangan, yang selamat menang di 21, jadi 21/24 = 0.875.
- AUC mendekati 1: separability baik. AUC mendekati 0: separability terburuk, model konsisten salah, balik prediksinya jadi bagus. AUC = 0.5: tidak punya kemampuan memisahkan sama sekali.

Ringkasan: ROC curve adalah plot TPR (= sensitivity) terhadap FPR (= 1 - specificity), satu titik per cutoff p. AUC adalah luas di bawahnya. AUC lebih tinggi berarti lebih baik me-ranking 1 di atas 0.

```python
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, roc_auc_score

p_surv = [.95, .85, .70, .60, .55, .40, .30, .20, .15, .05]
truth  = [1, 1, 0, 1, 0, 1, 0, 0, 0, 0]
print(roc_auc_score(truth, p_surv))     # 0.875
fpr, tpr, thr = roc_curve(truth, p_surv)
plt.plot(fpr, tpr, marker="o"); plt.plot([0, 1], [0, 1], "--")
plt.xlabel("FPR"); plt.ylabel("TPR"); plt.show()
```

## 7.7 buildROC (hlm 47-48)

pylab adalah modul dari matplotlib.

```python
import sklearn.metrics
import matplotlib.pyplot as pylab

def buildROC(trainingSet, testSet, title, plot = True):
    model = buildModel(trainingSet, True)
    xVals, yVals = [], []
    p = 0.0
    while p <= 1.0:
        truePos, falsePos, trueNeg, falseNeg =\
                 applyModel(model, testSet, 'Survived', p)
        xVals.append(1.0 - specificity(trueNeg, falsePos))
        yVals.append(sensitivity(truePos, falseNeg))
        p += 0.01
    auroc = sklearn.metrics.auc(xVals, yVals)
    if plot:
        pylab.plot(xVals, yVals)
        pylab.plot([0,1], [0,1])
        title = title + '\nAUROC = ' + str(round(auroc,3))
        pylab.title(title)
        pylab.xlabel('1 - specificity')
        pylab.ylabel('Sensitivity')
    return auroc

random.seed(0)
trainingSet, testSet = split80_20(examples)
buildROC(trainingSet, testSet, 'ROC for Predicting Survival, 1 Split')
pylab.show()
```

Hasil di slide: AUROC = 0.861, pemisahan yang bagus antara selamat dan tidak. Garis biru = model logistic regression (tiap titik satu cutoff), garis hijau = menebak acak (AUC 0.5).

Catatan: karena pembulatan float, loop while ini berhenti di p sekitar 0.99, nilai p = 1.0 tidak pernah dihitung. Untuk hasil yang tepat pakai roc_auc_score.

---

# 8. Classroom study: mobile phone prices (14b)

## 8.1 Dataset (14b hlm 2)

- Kelompok 3 orang.
- mobile_prices.csv: 2000 ponsel, 20 fitur, tanpa missing value. Langsung dibaca di Colab tanpa download atau login. Deskripsi kolom ada di Kaggle - Mobile Price Classification.
- Fitur: battery_power, blue, clock_speed, dual_sim, fc, four_g, int_memory, m_dep, mobile_wt, n_cores, pc, px_height, px_width, ram, sc_h, sc_w, talk_time, three_g, touch_screen, wifi.
- Label: price_range = 0 (low), 1 (medium), 2 (high), 3 (very high), 500 per kelas.

## 8.2 Tugas (14b hlm 3)

1. Eksplorasi dan preprocessing: cek distribusi dan nilai mencurigakan (contoh sc_w atau px_height = 0). Feature engineering atau selection kalau bisa dijustifikasi.
2. Split train dan test (contoh 80/20, stratify=y, random_state tetap).
3. Bangun dua classifier: KNN (coba beberapa k, dengan dan tanpa feature scaling) dan Logistic Regression (skala fitur dulu).
4. Evaluasi keduanya pada test set: accuracy, confusion matrix, classification report.
5. Bandingkan: model mana lebih baik dan kenapa, 3 sampai 5 kalimat di Markdown cell.

## 8.3 Pengumpulan (14b hlm 4)

- Google Colab atau Jupyter, satu notebook per kelompok.
- Cell pertama: nama dan NIM semua anggota. Run all sebelum menyimpan supaya output terlihat.
- Kumpulkan .ipynb lewat MS Teams Assignment, setiap anggota mengunggah file yang sama. Colab: File, Download, Download .ipynb.
- Nama file: NIM1_NIM2_NIM3_classification.ipynb
- Rilis Rabu 25 November 2026 10.00 WIB. Disarankan selesai di sesi kelas sendiri. Deadline Rabu 25 November 2026 14.00 WIB.

## 8.4 Kerangka kode lengkap

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, classification_report,
                             ConfusionMatrixDisplay)

url = "https://raw.githubusercontent.com/amankharwal/Website-data/master/mobile_prices.csv"
df = pd.read_csv(url)   # (2000, 21)

# 1. eksplorasi
print(df.shape); print(df.dtypes); print(df.describe().T)
print(df.isna().sum().sum())
print(df["price_range"].value_counts())
print((df[["sc_w", "px_height"]] == 0).sum())     # nilai mencurigakan
df.hist(figsize=(14, 12)); plt.tight_layout(); plt.show()
print(df.corr()["price_range"].sort_values(ascending=False))

# preprocessing: 0 yang mustahil dianggap hilang, lalu diisi median
for c in ["sc_w", "px_height"]:
    df[c] = df[c].replace(0, df.loc[df[c] > 0, c].median())

# feature engineering opsional. Hati-hati: px_area = px_height x px_width
# berskala jutaan dan merusak KNN tanpa scaling (lihat catatan di bawah)
# df["px_area"] = df["px_height"] * df["px_width"]

# 2. split
X = df.drop(columns=["price_range"]); y = df["price_range"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

# 3a. KNN, beberapa k, dengan dan tanpa scaling
rows = []
for k in [1, 3, 5, 7, 9, 11, 15, 21, 31]:
    raw = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train)
    scl = make_pipeline(StandardScaler(),
                        KNeighborsClassifier(n_neighbors=k)).fit(X_train, y_train)
    rows.append({"k": k, "tanpa_scaling": raw.score(X_test, y_test),
                 "dengan_scaling": scl.score(X_test, y_test)})
hasil = pd.DataFrame(rows).set_index("k"); print(hasil)
hasil.plot(marker="o"); plt.ylabel("test accuracy"); plt.show()

# 3b. dua model final
best_k = int(hasil["tanpa_scaling"].idxmax())
models = {
    "KNN": KNeighborsClassifier(n_neighbors=best_k),
    "LogReg": make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000)),
}

# 4. evaluasi
for name, m in models.items():
    m.fit(X_train, y_train)
    pred = m.predict(X_test)
    print(name, accuracy_score(y_test, pred))
    print(classification_report(y_test, pred, digits=3))
    ConfusionMatrixDisplay.from_predictions(y_test, pred)
    plt.title(name); plt.show()
```

Hal yang perlu diperhatikan:
- Hasil uji kerangka di atas (random_state=42, sklearn terbaru): KNN tanpa scaling 0.9575 (k = 9), KNN dengan scaling paling tinggi 0.64 (k = 31), Logistic Regression 0.96.
- Kalau px_area ditambahkan, KNN tanpa scaling jatuh ke sekitar 0.42 (k = 1) karena fitur berskala jutaan itu mendominasi jarak. Feature engineering harus diuji, tidak otomatis menolong.
- Pada data ini KNN tanpa scaling justru jauh lebih baik daripada dengan scaling. Kolom ram (ratusan sampai ribuan) mendominasi jarak, dan ram memang prediktor terkuat. Scaling membuat 19 fitur lain yang kebanyakan noise berbobot sama dengan ram. Jadi scaling tidak selalu menaikkan akurasi, laporkan apa yang benar-benar keluar.
- Logistic regression setelah scaling sedikit di atas KNN, kemungkinan karena kelasnya berurutan dan hubungannya dengan fitur utama kira-kira linear.
- Memilih k dari test set membuat skor test terlalu optimistis. Yang lebih bersih: pilih k dengan cross validation di training set (bagian 9.5).

Contoh bentuk jawaban nomor 5 (isi angkanya dari output sendiri):

    Logistic Regression lebih baik dengan akurasi test sekian, dibanding KNN sekian.
    Fitur utama (ram, battery_power, resolusi) berhubungan hampir linear dengan
    price_range sehingga batas linear sudah cukup. KNN terpengaruh banyak fitur
    yang tidak informatif dalam perhitungan jarak. Dari confusion matrix, kesalahan
    kedua model hampir selalu ke kelas harga yang bersebelahan.

---

# 9. Syntax lengkap sklearn untuk klasifikasi

Bagian ini tambahan di luar slide.

## 9.1 Persiapan

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

X, y = load_breast_cancer(return_X_y=True, as_frame=True)   # biner
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
sc = StandardScaler()
X_train_s = sc.fit_transform(X_train)    # fit hanya di train
X_test_s = sc.transform(X_test)
```

Data sendiri lewat gdown:

```python
!pip install -q gdown
import gdown
gdown.download(id="FILE_ID_DRIVE", output="data.csv")
df = pd.read_csv("data.csv")
```

Kategori dan label teks:

```python
df = pd.get_dummies(df, columns=["kategori"], dtype=int)
df["target"] = df["target"].map({"No": 0, "Yes": 1})
```

## 9.2 KNN

```python
from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(
    n_neighbors=5,          # k
    weights="uniform",      # atau "distance"
    algorithm="auto",       # brute, kd_tree, ball_tree
    metric="minkowski",
    p=2,                    # 2 Euclidean, 1 Manhattan
)
knn.fit(X_train_s, y_train)
knn.predict(X_test_s)
knn.predict_proba(X_test_s)
knn.score(X_test_s, y_test)
jarak, indeks = knn.kneighbors(X_test_s[:1])
```

## 9.3 Logistic regression

```python
from sklearn.linear_model import LogisticRegression

logreg = LogisticRegression(
    C=1.0,                  # kecil = regularisasi lebih kuat
    max_iter=1000,          # naikkan kalau muncul ConvergenceWarning
    class_weight=None,      # "balanced" untuk data tidak seimbang
)
logreg.fit(X_train_s, y_train)
logreg.predict(X_test_s)
logreg.predict_proba(X_test_s)      # kolom urut sesuai classes_
logreg.classes_
logreg.coef_, logreg.intercept_

bobot = pd.Series(logreg.coef_[0], index=X_train.columns).sort_values()
print(bobot)

# cutoff sendiri
proba = logreg.predict_proba(X_test_s)[:, 1]
pred_03 = (proba > 0.3).astype(int)
```

## 9.4 Metrik, confusion matrix, ROC

```python
from sklearn.metrics import (accuracy_score, confusion_matrix, classification_report,
                             precision_score, recall_score, f1_score,
                             ConfusionMatrixDisplay, RocCurveDisplay,
                             roc_curve, roc_auc_score)

pred = logreg.predict(X_test_s)
accuracy_score(y_test, pred)
print(confusion_matrix(y_test, pred))              # baris asli, kolom prediksi
tn, fp, fn, tp = confusion_matrix(y_test, pred).ravel()
sens = tp / (tp + fn)
spec = tn / (tn + fp)
ppv = tp / (tp + fp)
npv = tn / (tn + fn)
precision_score(y_test, pred)
recall_score(y_test, pred)                         # sensitivity
recall_score(y_test, pred, pos_label=0)            # specificity
f1_score(y_test, pred)
print(classification_report(y_test, pred))
ConfusionMatrixDisplay.from_predictions(y_test, pred); plt.show()

proba = logreg.predict_proba(X_test_s)[:, 1]       # pakai probabilitas, bukan pred
roc_auc_score(y_test, proba)
fpr, tpr, thresholds = roc_curve(y_test, proba)
RocCurveDisplay.from_predictions(y_test, proba); plt.show()
RocCurveDisplay.from_estimator(logreg, X_test_s, y_test); plt.show()

# tabel metrik per cutoff
for p in [0.1, 0.3, 0.5, 0.7, 0.9]:
    yp = (proba > p).astype(int)
    print(p, round(accuracy_score(y_test, yp), 3),
          round(recall_score(y_test, yp), 3),
          round(recall_score(y_test, yp, pos_label=0), 3),
          round(precision_score(y_test, yp, zero_division=0), 3))
```

Multi-class:

```python
from sklearn.datasets import load_iris
Xi, yi = load_iris(return_X_y=True)
a, b, c, d = train_test_split(Xi, yi, stratify=yi, random_state=0)
m = LogisticRegression(max_iter=1000).fit(a, c)
precision_score(d, m.predict(b), average="macro")           # macro, micro, weighted
roc_auc_score(d, m.predict_proba(b), multi_class="ovr")
```

## 9.5 Cross validation, LOO, random subsampling, tuning

Versi sklearn dari metodologi testing di bagian 5.

```python
from sklearn.model_selection import (cross_val_score, cross_val_predict, LeaveOneOut,
                                     ShuffleSplit, StratifiedKFold, GridSearchCV)
from sklearn.pipeline import make_pipeline

pipe = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=3))

# leave-one-out
loo = cross_val_score(pipe, X, y, cv=LeaveOneOut())
print(loo.mean())
pred_loo = cross_val_predict(pipe, X, y, cv=LeaveOneOut())
print(confusion_matrix(y, pred_loo))

# repeated random subsampling: 10 kali 80/20
rs = ShuffleSplit(n_splits=10, test_size=0.2, random_state=0)
s = cross_val_score(pipe, X, y, cv=rs)
print(s.mean(), s.std())

# 5-fold
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
cross_val_score(pipe, X, y, cv=cv, scoring="roc_auc")

# cari k terbaik hanya di training set
grid = GridSearchCV(pipe, {"kneighborsclassifier__n_neighbors": range(1, 22, 2)}, cv=cv)
grid.fit(X_train, y_train)
print(grid.best_params_, grid.best_score_, grid.score(X_test, y_test))
```

## 9.6 Baseline dan one-class

```python
from sklearn.dummy import DummyClassifier
base = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
print(base.score(X_test, y_test))        # selalu menebak kelas mayoritas

from sklearn.svm import OneClassSVM
from sklearn.ensemble import IsolationForest
normal = X_train_s[y_train.values == 1]  # latih hanya dari satu kelas
oc = OneClassSVM(nu=0.05).fit(normal)
oc.predict(X_test_s)                     # 1 normal, -1 anomali
iso = IsolationForest(random_state=0).fit(normal)
iso.predict(X_test_s)
```

---

# 10. Checklist jebakan

- Classification memprediksi label, regression memprediksi bilangan real. Logistic regression termasuk classification.
- Selalu bandingkan dengan baseline kelas mayoritas (runner 58 persen, Titanic 62 persen).
- Accuracy menipu pada data tidak seimbang. Lihat sensitivity, specificity, PPV.
- Accuracy sama belum tentu model sama baik (solid vs dashed, keduanya 0.70).
- Accuracy training tinggi tetapi test rendah = overfit (0.83 vs 0.60).
- confusion_matrix sklearn untuk label 0 dan 1 tersusun [[TN, FP], [FN, TP]]. Tabel di slide meletakkan positif dulu: TP, FN di baris atas.
- predict_proba kolomnya urut sesuai classes_. Untuk label teks, urutannya alfabet: Died dulu, baru Survived.
- roc_auc_score dan roc_curve butuh probabilitas (kolom [:, 1]), bukan hasil predict.
- Menurunkan cutoff: sensitivity naik, specificity turun.
- ROC sumbu x = 1 - specificity, sumbu y = sensitivity.
- Scaler di-fit di train saja. Pipeline mengurus ini otomatis, termasuk saat cross validation.
- kNN peka skala fitur, tetapi scaling tidak otomatis menaikkan akurasi (lihat 8.4).
- Pakai stratify=y dan random_state saat split.
- k genap pada kasus biner bisa seri.
- Bobot logistic regression: hati-hati dengan fitur yang berkorelasi dan skala yang berbeda.
