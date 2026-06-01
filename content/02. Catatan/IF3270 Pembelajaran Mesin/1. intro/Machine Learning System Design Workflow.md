---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Machine Learning System Design Workflow
>
> > ## Questions/Cues
> >
> > - Mengapa pra-pemrosesan data penting dalam workflow ML?
> > - Bagaimana menentukan metrik evaluasi yang sesuai?
> > - Tahapan validasi model dalam sistem ML
> > - Tantangan utama dalam deployment model ML
> > - Teknik monitoring performa model produksi
> >
> > ## Reference Points
> >
> > - Course_Slides_IF3270.pptx (Slide 28)
> > - Raschka et al. (2022) Machine Learning with PyTorch and Scikit-Learn (Halaman 45-68)
> >
>
> > ### Kerangka Kerja Desain Sistem ML
> > Workflow desain sistem pembelajaran mesin merupakan proses terstruktur yang terdiri dari tahapan iteratif untuk membangun solusi berbasis ML yang efektif. Proses ini dimulai dari pemahaman masalah bisnis hingga deployment dan pemantauan model di lingkungan produksi. Setiap tahapan saling terkait dan memerlukan validasi menyeluruh untuk memastikan model yang dibangun memenuhi kebutuhan pengguna.
> > Contoh workflow standar meliputi: 
> > 1.  Definisi masalah bisnis, 
> > 2. Pengumpulan dan eksplorasi data, 
> > 3. Pra-pemrosesan data, 
> > 4. Pemilihan dan pelatihan model, 
> > 5. Evaluasi dan validasi model, 
> > 6. Deployment, 
> > 7. Monitoring dan pemeliharaan. Analoginya seperti proses membangun rumah - dimulai dari desain konseptual, persiapan material, konstruksi, hingga inspeksi akhir dan perawatan berkala.
> > 
> > ### Tahap Pra-Pemrosesan Data
> > Pra-pemrosesan data merupakan fondasi penting dalam workflow ML yang mencakup:
> > 1. **Pembersihan data**: Menangani nilai hilang (missing values), outliers, dan noise
> > 2. **Transformasi data**: Normalisasi, standarisasi, dan encoding fitur kategorikal
> > 3. **Teknik reduksi dimensi**: PCA atau t-SNE untuk data berdimensi tinggi
> > 4. **Pemisahan dataset**: Training (60-80%), validation (10-20%), test (10-20%)
> > 
> > Contoh praktis: Pada dataset gambar yang tidak seimbang kelasnya, teknik oversampling seperti SMOTE dapat diterapkan. Untuk data teks, dilakukan tokenization, stopword removal, dan stemming sebelum dimasukkan ke model.
> >
> > ### Evaluasi dan Validasi Model
> > Tahap kritis ini memastikan model memiliki generalisasi yang baik terhadap data baru:
> > - **Teknik validasi**: Cross-validation (k-fold, stratified)
> > - **Metrik evaluasi**: Akurasi, presisi, recall, F1-score untuk klasifikasi; MAE, RMSE untuk regresi
> > - **Analisis kesalahan**: Confusion matrix, learning curves, ROC-AUC
> > - **Tes statistik**: Uji signifikansi perbedaan performa antar model
> > Contoh implementasi: Pada model klasifikasi medis dengan konsekuensi fatal false negative, metrik recall lebih diprioritaskan daripada akurasi keseluruhan. Model harus divalidasi menggunakan stratified 10-fold cross-validation untuk memastikan konsistensi performa di semua subset data.
> > 
> > ### Deployment dan Monitoring
> > Implementasi model di lingkungan produksi memerlukan pertimbangan khusus:
> > - **Infrastruktur deployment**: Cloud vs on-premise, API endpoint, batch processing
> > - **Version control**: Pelacakan versi model dan dataset
> > - **Monitoring performa**: Drift detection (data drift, concept drift)
> > - **Retraining pipeline**: Otomatisasi pelatihan ulang berdasarkan trigger tertentu
> > 
> > Studi kasus: Sistem rekomendasi e-commerce perlu dipantau secara real-time untuk mendeteksi perubahan preferensi pengguna (concept drift) dan di-retrain secara berkala menggunakan data transaksi terbaru. Skema A/B testing digunakan untuk membandingkan performa model baru dengan model produksi saat ini.

> [!cornell] #### Summary
>
> **Workflow desain sistem ML** merupakan proses iteratif yang mencakup tujuh tahapan inti mulai dari definisi masalah hingga monitoring produksi. **Pra-pemrosesan data** yang komprehensif menjadi kunci keberhasilan model, mencakup pembersihan, transformasi, dan pembagian dataset yang tepat. **Validasi model** yang ketat menggunakan teknik cross-validation dan metrik yang relevan dengan masalah bisnis menentukan kelayakan deployment. Tahap **deployment dan monitoring** memerlukan infrastruktur yang skalabel dan mekanisme deteksi drift untuk memastikan performa model tetap optimal di lingkungan produksi.
>

> [!ad-libitum]- Additional Information
>
> #### Teknik Feature Engineering Lanjut
> - **Automated feature engineering**: Menggunakan library seperti FeatureTools untuk mengekstrak fitur hierarkis dari data relasional
> - **Embedding learning**: Teknik deep learning untuk merepresentasikan data kategorikal dalam ruang vektor kontinu
> - **Feature interaction**: Membuat fitur kombinasi menggunakan operator matematika atau metode khusus seperti FM (Factorization Machines)
>
> #### Metode Validasi Kompleks
> - **Nested cross-validation**: Kombinasi outer loop untuk evaluasi performa dan inner loop untuk optimasi hyperparameter
> - **Time-series validation**: Forward chaining dengan expanding/rolling window untuk data temporal
> - **Group-wise validation**: Pembagian berdasarkan grup tertentu (misal pasien dalam data medis) untuk mencegah data leakage
>
> #### Alat Continuous Integration untuk ML
> - **MLflow**: Platform untuk melacak eksperimen, packaging model, dan deployment
> - **Kubeflow**: Ecosystem Kubernetes untuk workflow ML yang terotomasi
> - **TFX (TensorFlow Extended)**: Pipeline end-to-end untuk production ML
>
> #### Self-Exploration Projects
> 1. Bangun pipeline ML lengkap menggunakan Scikit-Learn Pipelines untuk dataset Titanic, implementasikan CI/CD dengan GitHub Actions
> 2. Bandingkan performa model pada skenario data drift menggunakan library Alibi Detect
> 3. Implementasikan monitoring model real-time dengan Prometheus dan Grafana
>
> #### Tools dan Resources
> - **MLOps Platforms**: Vertex AI (GCP), SageMaker (AWS), Azure Machine Learning
> - **Monitoring Tools**: Evidently AI, WhyLogs, Great Expectations
> - **Experiment Tracking**: Weights & Biases, Neptune.ai, DVC Studio
>
> #### Further Reading
> - "Building Machine Learning Powered Applications" oleh Emmanuel Ameisen
> - "Designing Machine Learning Systems" oleh Chip Huyen
> - "The MLops Playbook" oleh Dominik Kreuziger
> - Dokumentasi MLflow: https://mlflow.org/docs/latest/index.html
> - Tutorial TFX: https://www.tensorflow.org/tfx