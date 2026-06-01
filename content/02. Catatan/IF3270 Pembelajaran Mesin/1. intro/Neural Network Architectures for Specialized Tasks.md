---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Neural Network Architectures for Specialized Tasks
>
> > ## Questions/Cues
> >
> > - Mengapa CNN cocok untuk pemrosesan gambar?
> > - Bagaimana RNN menangani data sekuensial?
> > - Apa fungsi mekanisme attention dalam Transformer?
> > - Kapan menggunakan LSTM vs GRU?
> > - Bagaimana transfer learning diaplikasikan pada CNN?
> >
> > ## Reference Points
> >
> > - Course Overview (Slides 10, 26-28)
> > - Prince, S.J. (2023) Understanding Deep Learning (Chapter 9, 12)
> > - Kunapuli, G. (2023) Ensemble Methods (Page 142-150)
> >
>
> > ### Convolutional Neural Networks (CNN)
> > CNN dirancang khusus untuk memproses data grid seperti gambar. Lapisan konvolusi menggunakan filter yang bergerak melintasi gambar untuk mendeteksi fitur lokal seperti tepi atau tekstur. Setiap filter mempelajari pola spasial tertentu melalui proses training, memungkinkan ekstraksi fitur hierarkis dari level rendah ke tinggi.
> > 
> > Contoh aplikasi: Pada klasifikasi gambar kucing vs anjing, lapisan awal mungkin mendeteksi tepi dan sudut, sementara lapisan lebih dalam mengenali pola seperti telinga atau ekor. Arsitektur khas seperti ResNet menggunakan "residual connections" untuk melatih jaringan yang sangat dalam (>100 layer) tanpa masalah vanishing gradient.
> > 
> > Keunggulan utama CNN adalah parameter sharing yang mengurangi kompleksitas komputasi dibanding jaringan fully-connected. Untuk gambar 1000x1000, lapisan konvolusi dengan 100 filter hanya membutuhkan ~1 juta parameter, sementara lapisan fully-connected memerlukan 10^9 parameter.
> > 
> > ### Recurrent Neural Networks (RNN)
> > RNN memproses data sekuensial (teks, deret waktu) dengan mempertahankan state internal yang menyimpan informasi kontekstual. Arsitektur ini menggunakan loop berulang dimana output langkah sebelumnya menjadi input langkah saat ini, memungkinkan pemodelan ketergantungan temporal.
> > 
> > Contoh konkret: Pada analisis sentimen tweet, RNN memproses setiap kata secara berurutan sambil memperbarui state internalnya. State akhir digunakan untuk memprediksi sentimen keseluruhan. Namun, RNN dasar mengalami masalah vanishing gradient untuk sequence panjang (>50 langkah).
> > 
> > Aplikasi umum meliputi: prediksi saham, generasi teks, dan terjemahan mesin. Variasi seperti Bidirectional RNN mengakses konteks masa lalu dan masa depan dengan menjalankan dua RNN paralel (maju dan mundur).
> > 
> > ### Transformer Networks
> > Transformer memperkenalkan mekanisme attention untuk memodelkan dependensi jarak jauh tanpa rekursi. Arsitektur ini menggunakan multi-head attention yang memungkinkan model fokus pada bagian relevan input secara paralel. Tidak seperti RNN, Transformer memproses seluruh sequence sekaligus sehingga lebih efisien secara komputasi.
> > 
> > Contoh implementasi: Model BERT untuk pemrosesan bahasa alami menggunakan Transformer encoder untuk menghasilkan representasi kontekstual kata. Pada tugas question answering, mekanisme attention membantu model menghubungkan kata kunci dalam pertanyaan dengan bagian relevan dalam dokumen.
> > 
> > Kelebihan utama: Paralelisasi tinggi selama training dan kemampuan menangkap konteks jarak jauh. Transformer menjadi fondasi untuk model bahasa besar seperti GPT-3 dan T5.
> > 
> > ### Specialized RNN Variants
> > LSTM (Long Short-Term Memory) memperkenalkan cell state dan gerbang (forget, input, output) untuk mengontrol aliran informasi. Forget gate menentukan informasi mana yang dibuang dari state sebelumnya, sementara input gate menambahkan informasi baru. Struktur ini efektif untuk sequence dengan dependensi jangka panjang.
> > 
> > GRU (Gated Recurrent Unit) menyederhanakan LSTM dengan menggabungkan forget dan input gate menjadi update gate, serta menghilangkan cell state. ReGU (Rectified Gated Unit) menambahkan aktivasi ReLU untuk meningkatkan non-linearitas. Pemilihan arsitektur bergantung pada kompleksitas tugas dan sumber daya komputasi.
> > 
> > Studi kasus: Pada prediksi harga saham harian, LSTM mungkin lebih akurat untuk pola kompleks, sementara GRU lebih efisien untuk dataset kecil. Implementasi praktis di Python menggunakan library TensorFlow/Keras dengan lapisan LSTM/GRU siap pakai.

> [!cornell] #### Summary
>
> **CNN** memanfaatkan operasi konvolusi untuk ekstraksi fitur spasial hierarkis, optimal untuk tugas visi komputer. **RNN** dan variannya (LSTM/GRU) mengolah data sekuensial dengan mempertahankan memori internal, cocok untuk deret waktu dan NLP dasar. **Transformer** merevolusi pemrosesan sequence melalui mekanisme attention paralel, menjadi fondasi model bahasa modern. **Pemilihan arsitektur** ditentukan oleh jenis data, kebutuhan kontekstual, dan sumber daya komputasi.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Arsitektur
> | Metrik       | CNN          | RNN/LSTM     | Transformer  |
> |--------------|--------------|--------------|--------------|
> | Paralelisasi | Tinggi       | Rendah       | Sangat Tinggi|
> | Memory Jangka Panjang | Terbatas | 50-100 langkah | Tak terbatas |
> | Kompleksitas | O(n²·d)      | O(n·d²)      | O(n²·d)      |
> (*n: panjang sequence, d: dimensi embedding*)
>
> Transformers mendominasi tugas NLP tetapi membutuhkan memori kuadratik terhadap panjang sequence. Hybrid architectures seperti ConvLSTM menggabungkan CNN dan LSTM untuk video analysis.
>
> #### Teknik Optimasi Lanjut
> - **Quantization Aware Training**: Mengurangi presisi bobot model dari 32-bit ke 8-bit untuk deployment di perangkat edge
> - **Pruning Iteratif**: Menghapus koneksi kurang penting berulang kali selama training
> - **Knowledge Distillation**: Kompresi model besar ("teacher") ke model kecil ("student") dengan mempertahankan >90% akurasi
> - Contoh implementasi TensorFlow: `tfmot.quantization.keras.quantize_model`
>
> #### Edge Cases dan Batasan
> - **CNN**: Rentan terhadap adversarial attacks - noise tak terlihat oleh manusia dapat menggagalkan klasifikasi
> - **RNN**: Kesalahan akumulasi pada sequence panjang menyebabkan "drift" prediksi
> - **Transformer**: Membutuhkan dataset besar (>1 juta sampel) untuk training dari awal
> - **Kasus khusus**: Model untuk data medis memerlukan teknik domain adaptation karena perbedaan distribusi data
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun CNN dengan transfer learning menggunakan MobileNetV2 untuk klasifikasi 10 spesies burung Indonesia (dataset dari Kaggle)
> 2. Implementasikan text generator Shakespeare dengan LSTM di PyTorch, eksperimen dengan temperature sampling
> 3. Fine-tuning model BERT-base untuk sentiment analysis dalam Bahasa Indonesia
> 4. Optimasi model Transformer dengan teknik quantization untuk deployment di smartphone Android
>
> #### Tools dan Framework
> - **PyTorch Lightning**: Wrapper PyTorch untuk training terdistribusi
> - **Hugging Face Transformers**: Library pra-model NLP siap pakai
> - **TensorFlow Lite**: Konversi model untuk perangkat mobile
> - **Weights & Biases**: Pelacakan eksperimen machine learning
> - **OpenVINO Toolkit**: Optimasi inferensi pada hardware Intel
>
> #### Bacaan Lanjutan
> - "Attention Is All You Need" (Vaswani et al., 2017) - Paper orisinal Transformer
> - "Deep Learning with Python" (Chollet, 2021) - Bab 9: Advanced CNN architectures
> - "Speech and Language Processing" (Jurafsky & Martin, 2023) - Bab 12: RNN & Attention Models
> - Kursus online: Stanford CS224N (NLP with Deep Learning)
> - Tutorial resmi: TensorFlow Neural Machine Translation