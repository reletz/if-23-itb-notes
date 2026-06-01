---
cssclasses:
  - dashboard
---
_Back to_ [[IF3170 Inteligensi Artifisial]]
# Overview
- ## 1
	- [[Latihan UAS IF3170-1 Bagian I]]
	- [[Latihan UAS IF3170-1 Bagian II]]
	- [[Latihan UAS IF3170-1 Bagian III]]
- ## 2
	- [[Latihan UAS IF3170-2 Bagian I]]
	- [[Latihan UAS IF3170-2 Bagian II]]
	- [[Latihan UAS IF3170-2 Bagian III]]
- ## 3
	- [[Latihan UAS IF3170-3 Bagian I]]
	- [[Latihan UAS IF3170-3 Bagian II]]
	- [[Latihan UAS IF3170-3 Bagian III]]
- ## 4
	- [[Latihan UAS IF3170-4 Bagian I]]
	- [[Latihan UAS IF3170-4 Bagian II]]
	- [[Latihan UAS IF3170-4 Bagian III]]
- ## Pendalaman SVM
	- [[Latihan UAS IF3170-SVM Bagian I]]
	- [[Latihan UAS IF3170-SVM Bagian II]]
	- [[Latihan UAS IF3170-SVM Bagian III]]
---
# Susunan (Perkiraan)

## **BAGIAN 1: Probabilistic & Tree-Based Models**

**Fokus:** Model berbasis logika diskrit, pohon keputusan, dan probabilitas.

**Topik:**

- **Naive Bayes Classifier** (Konsep & Hitungan Manual)
    
- **Bayesian Networks (BN)** (Struktur, D-Separation, Inferensi)
    
- **Decision Tree Learning (DTL)** (ID3, Entropy, Information Gain, Pruning)
    

**Struktur & Pasangan Topik-Soal:**

1. **Studi Kasus (Hitungan Berat):** _Naive Bayes Prediction._
    
    - Diberikan data latih kecil (kategorikal). Mahasiswa diminta menghitung probabilitas posterior $P(C|X)$ langkah demi langkah untuk satu data uji.
        
2. **Studi Kasus Multi-Bagian:** _DTL Construction._
    
    - Diberikan tabel data sederhana.
        
    - Sub-soal a: Hitung Entropy awal sistem.
        
    - Sub-soal b: Hitung Information Gain untuk menentukan _Root Node_ terbaik.
        
3. **Diagramming/Visualisasi:** _Bayesian Network Analysis._
    
    - Diberikan gambar graf BN. Mahasiswa diminta menentukan apakah node A dan B independen (D-Separation) jika node C diketahui (shaded).
        
4. **Tabel Analisis/Komparatif:** _Isu DTL (Overfitting)._
    
    - Membandingkan strategi _Pre-pruning_ vs _Post-pruning_ (Reduced Error Pruning vs Rule Post-Pruning) dalam tabel kelebihan dan kekurangan.
        
5. **Benar/Salah (dengan Alasan):** _Konsep Probabilitas._
    
    - Pernyataan tentang asumsi "Naive" pada Naive Bayes atau tentang _Explaining Away_ pada BN.
        

---

## **BAGIAN 2: Geometry & Optimization Models**

**Fokus:** Model yang bekerja di ruang vektor kontinu, menggunakan hyperplane, dan optimasi gradien.

**Topik:**

- **Regresi Linear & Logistik** (Konsep, SGD, Fungsi Sigmoid)
    
- **Support Vector Machine (SVM)** (Margin, Kernel, Support Vectors)
    

**Struktur & Pasangan Topik-Soal:**

1. **Studi Kasus (Hitungan Berat - Iteratif):** _Update Bobot Regresi Logistik._
    
    - Diberikan 1 data latih $(x, y)$, bobot awal $w$, dan _learning rate_ $\eta$. Mahasiswa menghitung prediksi $p$, error, dan nilai bobot baru $w_{new}$ menggunakan Stochastic Gradient Ascent (SGA) untuk 1 iterasi.
        
2. **Studi Kasus Multi-Bagian:** _SVM Hyperplane & Margin._
    
    - Diberikan 3 titik data pada koordinat 2D (misal: 2 positif, 1 negatif).
        
    - Sub-soal a: Identifikasi mana yang menjadi _Support Vector_.
        
    - Sub-soal b: Tentukan persamaan garis pemisah (hyperplane) optimal.
        
3. **Diagramming/Visualisasi:** _SVM Non-Linear & Kernel._
    
    - Diberikan gambar data yang tidak terpisah secara linear (misal: cincin). Mahasiswa diminta menggambarkan ide transformasi ke dimensi tinggi atau memilih Kernel yang tepat (RBF/Poly).
        
4. **Isian Singkat Terstruktur:** _Linear Regression Metrics._
    
    - Mengisi dampak pada metrik MSE dan MAE jika terdapat _outlier_ ekstrem pada data regresi.
        
5. **Pilihan Ganda (Matrix):** _Karakteristik Model._
    
    - Mencocokkan karakteristik (misal: "Output Probabilitas", "Margin Maksimal", "Least Square Error") ke model yang tepat (LogReg, SVM, LinReg).
        

---

## **BAGIAN 3: Unsupervised Learning & Evaluation**

**Fokus:** Pengelompokan data tanpa label dan cara validasi/evaluasi seluruh jenis model.

**Topik:**

- **Clustering** (K-Means, DBSCAN, Evaluasi Cluster)
    
- **Pengukuran Kinerja & Validasi** (Confusion Matrix, ROC, K-Fold, McNemar)
    

**Struktur & Pasangan Topik-Soal:**

1. **Studi Kasus Multi-Bagian:** _Simulasi K-Means._
    
    - Diberikan 8 data dengan 4 fitur (2 kategorikal dan 2 numerikal). 2 data diantaranya adalah 2 centroid awal.
        
    - Sub-soal a: Tentukan cluster data dengan K-Means, constraint berhenti yang dapat dipilih: 1) Max dist dari cluster < x (sebuah jarak), 2) Max iterasi pencarian centroid sejumlah n, atau 3) Centroid konvergen (tidak berubah lagi dari centroid awal)
        
    - Sub-soal b: Prediksikan data ke sebuah cluster
    
	- Sub-soal c: Abaikan centroid awal, pilih k terbaik dengan elbow method. Tentukan clusterisasi K-meansnya lagi.
        
2. **Studi Kasus (Hitungan):** _Simulasi DBScan._
    
    - Diberikan data yang sama dengan Studi kasus 1
        
    - Mahasiswa diminta membuat matriks jarak berdasarkan 2 fitur numerikal, kemudian membuat clusterisasinya
        
3. **Diagramming/Visualisasi (Modifikasi):** _DBSCAN Density._
    
    - Diberikan sekumpulan titik. Mahasiswa diminta melingkari titik mana yang berstatus _Core_, _Border_, dan _Noise_ berdasarkan parameter Epsilon & MinPts tertentu.
        
4. **Tabel Analisis/Komparatif:** _Skema Validasi._
    
    - Membandingkan _Hold-out Validation_, _K-Fold Cross Validation_, dan _Bootstrapping_ berdasarkan skenario ukuran data (Data Kecil vs Data Besar).
        
5. **Benar/Salah (dengan Alasan):** _Evaluasi Cluster._
    
    - Pernyataan tentang interpretasi _Silhouette Coefficient_ atau kelemahan _Purity_ dalam evaluasi clustering.