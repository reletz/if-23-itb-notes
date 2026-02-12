---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] AdaBoost Weight Adjustment Mechanism
>
> > ## Questions/Cues
> >
> > - Mengapa penyesuaian bobot penting dalam AdaBoost?
> > - Bagaimana menghitung error model dasar (base model)?
> > - Rumus penentuan bobot model (α) pada iterasi-t?
> > - Mekanisme pembaruan bobot instansi salah klasifikasi?
> > - Peran normalisasi dalam pembaruan bobot?
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 29-37)
> > - Kunapuli, G. (2023). Chapter 4 (Pages 142-150)
> > - Han et al. (2022). Chapter 8.6 (Pages 320-328)
> >
>
> > ### Konsep Dasar Penyesuaian Bobot
> > Adaptive Boosting (AdaBoost) menggunakan mekanisme penyesuaian bobot dinamis pada instansi pelatihan untuk meningkatkan akurasi model secara bertahap. Setiap instansi data diberi bobot awal yang sama (D_i = 1/N untuk N instansi). Bobot ini merepresentasikan pentingnya relatif instansi tersebut dalam pelatihan model selanjutnya.
> > Analogi: Bayangkan siswa yang belajar dari ujian. Instansi yang salah diklasifikasi seperti soal yang sering salah dijawab - guru akan memberi bobot lebih tinggi pada soal tersebut dalam ujian berikutnya agar siswa fokus mempelajarinya.
> > ### Mekanisme Pembaruan Bobot
> > Pada setiap iterasi-t:
> > 1. Model dasar (biasanya *decision stump*) dilatih menggunakan bobot instansi saat ini
> > 2. Error model (ε_t) dihitung sebagai jumlah bobot instansi salah klasifikasi
> > 3. Bobot model (α_t) ditentukan: α_t = ½ ln((1-ε_t)/ε_t)
> > 4. Bobot instansi diperbarui:
> > - Dinaikkan secara eksponensial untuk instansi salah klasifikasi: D_i^{t+1} = D_i^t * e^{α_t}
> > - Diturunkan untuk instansi benar: D_i^{t+1} = D_i^t * e^{-α_t}
> > Contoh numerik: Jika ε_t = 0.2, maka α_t = ½ ln(0.8/0.2) ≈ 0.693. Instansi salah klasifikasi akan memiliki bobot dikalikan e^0.693 ≈ 2, sementara yang benar dibagi 2.
> > ### Signifikansi Bobot Model (α_t)
> > Bobot model α_t menentukan kontribusi setiap model dasar dalam prediksi akhir. Model dengan error lebih kecil mendapatkan α_t lebih besar. Rumus α_t menjamin bahwa:
> > - Model dengan error < 0.5 (lebih baik dari tebakan acak) mendapat α positif
> > - Model dengan error > 0.5 secara otomatis diabaikan (α negatif)
> > - Model dengan error = 0.5 tidak berkontribusi (α = 0)
> > Contoh praktis: Jika model pertama memiliki ε_1 = 0.1 (akurasi 90%), maka α_1 = ½ ln(0.9/0.1) ≈ 1.098. Model ini memiliki suara 3x lebih kuat dibanding model dengan α = 0.366 (ε = 0.3).

> [!cornell] #### Summary
> **Mekanisme penyesuaian bobot AdaBoost** merupakan inti dari kemampuan adaptif algoritma ini. Dengan secara eksponensial meningkatkan bobot instansi salah klasifikasi dan menurunkan bobot instansi benar, algoritma memaksa model dasar berikutnya fokus pada pola yang sulit. **Bobot model (α_t)** yang dihitung berdasarkan error masing-masing model dasar menjamin bahwa prediksi akhir merupakan kombinasi linear terbaik dari seluruh model dasar. Proses iteratif ini memungkinkan AdaBoost **mengubah weak learners menjadi strong ensemble** dengan akurasi tinggi.
>

> [!ad-libitum]- Additional Information
>
> #### Penanganan Data Tidak Seimbang
> Mekanisme bobot AdaBoost dapat dimodifikasi untuk menangani data tidak seimbang kelas dengan menambahkan parameter bobot kelas awal. Dengan memberi bobot lebih tinggi pada kelas minoritas selama inisialisasi, algoritma dapat meningkatkan recall tanpa merusak precision.
>
> #### Proof of Concept: Algoritma AdaBoost
> Untuk membuktikan konvergensi AdaBoost, kita dapat menganalisis loss function eksponensial:
> L(y,F(x)) = exp(-yF(x)) dimana F(x) = Σα_t h_t(x)
> Turunan terhadap α_t menunjukkan bahwa pembaruan bobot mengarah pada penurunan loss function secara monoton.
>
> #### Implementasi Praktis dengan Python
> ```python
> from sklearn.ensemble import AdaBoostClassifier
>
> # Inisialisasi dengan decision stump
> base_estimator = DecisionTreeClassifier(max_depth=1)
> adaboost = AdaBoostClassifier(
> estimator=base_estimator,
> n_estimators=50,
> learning_rate=0.8 # Faktor penskalaan untuk α_t
> )
> adaboost.fit(X_train, y_train, sample_weight=initial_weights)
> ```
> Parameter learning_rate mengontrol seberapa agresif pembaruan bobot dilakukan.
>
> #### Edge Cases Kritis
> 1. **Instansi Outlier**: Dapat menyebabkan pembobotan berlebihan dan overfitting
> 2. **Noisy Data**: Error tinggi di iterasi awal dapat mengganggu seluruh proses
> 3. **Kolinearitas Fitur**: Dapat menyebabkan model dasar redundan
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan AdaBoost manual tanpa library:
> - Gunakan numpy untuk menghitung bobot
> - Visualisasi perubahan distribusi bobot per iterasi
> - Bandingkan dengan implementasi sklearn
>
> 2. Eksperimen dengan berbagai base estimator:
> - Decision stumps vs decision trees depth=3
> - SVM linear vs kernel RBF
> - Analisis dampak terhadap kecepatan konvergensi
>
> #### Bacaan Lanjutan
> - Freund, Y., & Schapire, R. E. (1997). "A Decision-Theoretic Generalization of On-Line Learning and an Application to Boosting"
> - Zhou, Z-H. (2021). "Ensemble Learning: Foundations and Algorithms" Chapter 4
> - Dokumentasi resmi sklearn: "AdaBoost with Different Base Estimators"