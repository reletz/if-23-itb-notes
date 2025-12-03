---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Model Validation Schemes (Pengukuran Kinerja Model - Part 1)
> 
> > ## Questions/Cues
> >
> > - Posisi Fase Modeling (CRISP-DM)
> >     
> > - Konsep Hold-out Validation
> >     
> > - Pembagian Train/Val/Test
> >     
> > - Konsep K-Fold Cross Validation
> >     
> > - Kelebihan K-Fold
> >     
> > - Konsep Bootstrapping
> >     
> > - Kapan pakai Bootstrapping?
> >     
> >
> > ## Reference Points
> >
> > - Slides: 1-10
> >     
> > - Topik: Validasi Model
> >     
> 
> > ### 1. Fase Modeling dalam CRISP-DM
> >
> > Dalam siklus hidup proyek data mining (CRISP-DM), pengukuran kinerja model berada erat kaitannya dengan fase **Modeling** dan **Evaluation**.
> >
> > - **Input:** Data yang sudah disiapkan (Data Preparation).
> >     
> > - **Proses:** Memilih teknik, mendesain tes (Test Design), membangun model, dan menilai model (Assess Model).
> >     
> > - **Penting:** Desain eksperimen (_Design of Experiments_ / DoE) sangat krusial untuk memastikan hasil model valid dan bisa digeneralisasi.
> >     
> >
> > ### 2. Skema Validasi 1: Hold-out Validation
> >
> > Metode paling sederhana namun umum digunakan.
> >
> > - **Konsep:** Dataset dibagi secara acak menjadi tiga bagian terpisah:
> >     
> >     1. **Training Data:** Untuk melatih model (belajar pola).
> >         
> >     2. **Validation Data:** Untuk menyetel parameter (hyperparameter tuning) dan evaluasi sementara.
> >         
> >     3. **Test Data:** Untuk evaluasi akhir kinerja model (data ini tidak boleh disentuh selama proses training/tuning).
> >         
> > - **Proses:**
> >     
> >     1. Split data (misal 60:20:20).
> >         
> >     2. Latih model dengan berbagai konfigurasi pada Training Data.
> >         
> >     3. Pilih konfigurasi terbaik berdasarkan kinerja di Validation Data.
> >         
> >     4. Latih ulang model terbaik (opsional: gabung train+val) dan uji pada Test Data.
> >         
> >
> > ### 3. Skema Validasi 2: K-Fold Cross Validation
> 
> > Metode yang lebih robust (kokoh) untuk estimasi kinerja, terutama jika data terbatas.
> >
> > - **Konsep:**
> >     
> >     1. Dataset dibagi menjadi **K** bagian (folds) yang sama besar.
> >         
> >     2. Lakukan iterasi sebanyak **K kali**.
> >         
> >     3. Pada setiap iterasi, gunakan 1 fold sebagai **Validation Data** dan sisa (K-1) fold sebagai **Training Data**.
> >         
> >     4. Kinerja akhir adalah rata-rata dari K nilai skor validasi.
> >         
> > - **Keuntungan:** Seluruh data pernah digunakan sebagai data latih dan data uji, sehingga mengurangi bias akibat pembagian data yang "beruntung" atau "sial".
> >     
> >
> > ### 4. Skema Validasi 3: Bootstrapping Validation
> >
> > Metode resampling yang mengambil sampel secara acak **dengan pengembalian** (_with replacement_).
> >
> > - **Konsep:**
> >     
> >     1. Dari dataset berukuran N, ambil sampel sebanyak N kali secara acak (bisa ada data ganda). Ini jadi Training Set.
> >         
> >     2. Data yang tidak terpilih (out-of-bag) menjadi Test Set.
> >         
> > - **Kegunaan:** Sangat berguna untuk **dataset yang sangat kecil** di mana pembagian hold-out akan menyisakan terlalu sedikit data untuk pelatihan.
> >     
> > - **Catatan:** Sampel bootstrap memiliki tumpang tindih data yang lebih tinggi dibanding cross-validation.
> >     

> [!cornell] #### Summary
> 
> Validasi model krusial untuk memastikan generalisasi. **Hold-out Validation** membagi data menjadi Train/Val/Test secara statis, sederhana tapi rentan bias pada data kecil. **K-Fold Cross Validation** mengatasi ini dengan rotasi data validasi sebanyak K kali, memberikan estimasi yang lebih stabil. **Bootstrapping** menggunakan sampling dengan pengembalian (_replacement_), ideal untuk dataset yang sangat kecil guna memaksimalkan penggunaan data.

> [!ad-libitum]- Ad Libitum: Implementasi Teknis (Python)
> 
> #### 1. Implementasi K-Fold dengan Scikit-Learn
> 
> Dalam `sklearn`, `cross_val_score` memudahkan proses ini:
> 
> ```py
> from sklearn.model_selection import cross_val_score, KFold
> from sklearn import svm
>
> # Setup K-Fold
> kf = KFold(n_splits=5, shuffle=True, random_state=42)
> model = svm.SVC(kernel='linear', C=1)
>
> # Eksekusi
> scores = cross_val_score(model, X, y, cv=kf)
> print(f"Rata-rata Akurasi: {scores.mean()}")
> ```
> 
> *Penting:* Jangan lupa `shuffle=True` jika data terurut berdasarkan label agar distribusi kelas merata di setiap fold.
>
> #### 2. Bootstrapping Logic
>
> ```py
> from sklearn.utils import resample
> # Bootstrap sampling (Training)
> train_boot = resample(data, replace=True, n_samples=len(data))
> # Out-of-bag (Testing) - data yang tidak ada di train_boot
> test_boot = [d for d in data if d not in train_boot]
> ```
> 
> Karena _replacement_, secara statistik sekitar 63.2% data unik akan masuk ke training set, dan 36.8% sisanya menjadi data test (OOB).

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa kita memerlukan "Validation Data" terpisah dari "Test Data"?</strong></summary>
>
> Validation data digunakan untuk menyetel parameter model (tuning) selama proses pengembangan. Jika kita menggunakan Test Data untuk tuning, model akan bias terhadap Test Data (data leakage), sehingga evaluasi akhir tidak lagi objektif mencerminkan kinerja di dunia nyata.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa keuntungan utama K-Fold Cross Validation dibandingkan Hold-out?</strong></summary>
>
> K-Fold memberikan estimasi kinerja yang lebih akurat dan tidak bias (low variance) karena setiap titik data mendapat kesempatan untuk menjadi data latih dan data uji, berbeda dengan Hold-out yang sangat bergantung pada bagaimana kita memotong data secara acak.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Kapan waktu yang tepat menggunakan teknik Bootstrapping?</strong></summary>
>
> Saat dataset yang dimiliki **sangat kecil**. Teknik ini memungkinkan kita membuat dataset pelatihan seukuran data asli (melalui duplikasi/replacement) sambil tetap menyisakan sebagian data untuk pengujian.
> 
> </details>