---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Affective Computing and Emotional AI: Sensing, Classification, and Application
>
> > ## Questions/Cues
> >
> > - Bagaimana sistem mendeteksi ekspresi wajah?
> > - Mengapa GSR penting untuk mengukur emosi?
> > - Apa perbedaan antara emosi dasar dan aksi wajah?
> > - Bagaimana model AI mengklasifikasikan kemarahan?
> > - Contoh aplikasi adaptif berbasis emosi apa saja?
> >
> > ## Reference Points
> >
> > - Lecture_21_Affective_Computing.pptx (Slides 1‑4)
> > - Lecture_22_Emotional_AI.pptx (Slides 1‑3)
> > - Lecture_23_Techniques.pptx (Slides 1‑2)
> > - Lecture_24_Classification.pptx (Slides 1‑3)
> > - Lecture_25_Application.pptx (Slides 1‑4)
> > - Lecture_26_Ethics.pptx (Slides 1‑2)
>
> > ### Definisi dan Ruang Lingkup Affective Computing
> >
> > Affective Computing (Komputasi Afektif) didefinisikan oleh Rosalind Picard (1998) sebagai bidang yang **menggunakan komputer untuk mengenali, menafsirkan, dan mengekspresikan emosi manusia** secara serupa dengan cara manusia melakukannya. Pada dasarnya, bidang ini berusaha menjembatani kesenjangan antara sinyal fisiologis atau perilaku manusia dengan model komputasional yang dapat diproses secara otomatis. Tujuan utamanya bukan sekadar menambah “sentuhan manusia” pada antarmuka, melainkan meningkatkan **kualitas interaksi**, mengurangi kesalahpahaman, dan memungkinkan sistem untuk menyesuaikan responsnya berdasarkan keadaan afektif pengguna.
> >
> > Dalam konteks Artificial Intelligence (AI), istilah *Emotional AI* merujuk pada penggunaan teknik‑teknik pembelajaran mesin untuk **mengotomatisasi inferensi emosi** dari data sensorik. Berbeda dengan pendekatan tradisional yang mengandalkan aturan statis, Emotional AI memanfaatkan model statistik dan jaringan saraf dalam untuk menangkap pola kompleks yang tersembunyi dalam sinyal wajah, suara, atau gerakan tubuh. Kedua konsep ini saling melengkapi: Affective Computing menyediakan kerangka konseptual, sementara Emotional AI menyediakan alat algoritmik untuk implementasinya.
> >
> > ### Modalitas Sensorik untuk Pengukuran Emosi
> >
> > **Kamera visual** merupakan sensor paling umum untuk mendeteksi ekspresi wajah. Dengan memanfaatkan teknik deteksi titik wajah (landmark detection) dan analisis aksi‑aksi wajah (Facial Action Units, FAU), sistem dapat menilai perubahan otot-otot wajah yang terkait dengan emosi tertentu. Contoh praktisnya adalah penggunaan kamera pada smartphone untuk menilai kebahagiaan pengguna saat menonton video.
> >
> > **Galvanic Skin Response (GSR)** atau respons kulit galvanik mengukur konduktansi listrik kulit yang berubah seiring dengan aktivitas kelenjar keringat. Karena keringat dipicu oleh sistem saraf otonom yang responsif terhadap stres atau kegembiraan, GSR menjadi indikator fisiologis yang kuat untuk **emosi arousal** (tingkat kegairahan). Sensor GSR biasanya dipasang pada ujung jari atau telapak tangan, dan data yang dihasilkan dapat diintegrasikan dengan sinyal lain untuk meningkatkan akurasi klasifikasi.
> >
> > **Analisis suara** mengekstrak fitur‑fitur akustik seperti pitch, intonasi, kecepatan bicara, dan energi. Misalnya, suara yang lebih tinggi dan cepat sering dikaitkan dengan kegembiraan, sementara pitch rendah dan tempo lambat dapat menandakan kesedihan atau kemarahan. Kombinasi fitur prosodik ini dapat diproses oleh model pembelajaran mendalam (deep learning) untuk menghasilkan prediksi emosi secara real‑time.
> >
> > **Gerakan tubuh dan gestur** diukur melalui akselerometer, giroskop, atau sistem motion‑capture. Pola postur, kecepatan gerakan tangan, atau frekuensi langkah dapat mengindikasikan keadaan afektif; misalnya, gerakan tubuh yang cepat dan tidak teratur sering muncul pada keadaan cemas atau marah. Sensor ini biasanya terintegrasi dalam perangkat wearable seperti smartwatch atau headset VR.
> >
> > ### Representasi Emosi dan Klasifikasi
> >
> > **Enam emosi dasar** yang paling sering diukur dalam literatur adalah: *sadness* (kesedihan), *disgust* (jijik), *fear* (takut), *anger* (marah), *contempt* (cemoohan), dan *joy* (kebahagiaan). Model ini berakar pada teori psikologi Paul Ekman, yang menyatakan bahwa ekspresi wajah untuk emosi‑emosi ini bersifat universal. Pada level yang lebih halus, sistem mengidentifikasi **aksi‑aksi wajah** (misalnya, senyum, pembesaran mata, kerutan alis) yang menjadi indikator visual bagi masing‑masing emosi.
> >
> > Proses klasifikasi biasanya melibatkan tiga tahap: (1) **Ekstraksi fitur** (misalnya, koordinat titik wajah, koefisien mel‑frequency cepstral (MFCC) untuk suara, atau nilai GSR), (2) **Representasi** (misalnya, vektor fitur atau embeddings yang dihasilkan oleh jaringan saraf konvolusional), dan (3) **Pengklasifikasian** (misalnya, Support Vector Machine, Random Forest, atau jaringan saraf dalam). Pendekatan multimodal menggabungkan sinyal‑sinyal tersebut melalui teknik *late fusion* (menggabungkan keputusan akhir) atau *early fusion* (menggabungkan fitur sebelum klasifikasi), yang secara signifikan meningkatkan akurasi dibandingkan dengan penggunaan satu modalitas saja.
> >
> > Contoh konkret: sebuah sistem mobil otonom dapat menggabungkan data GSR (menunjukkan tingkat stres), ekspresi wajah (menunjukkan kemarahan), dan suara (menunjukkan nada tinggi) untuk mendeteksi **pengemudi yang marah**. Sistem kemudian dapat menyesuaikan suara navigasi menjadi lebih tenang atau menyarankan istirahat sejenak.
> >
> > ### Pendekatan Pembelajaran Mesin dalam Emotional AI
> >
> > **Jaringan Saraf Konvolusional (CNN)** menjadi standar de‑facto untuk analisis citra wajah karena kemampuannya mengekstrak pola spasial secara otomatis. Model‑model populer seperti *VGG‑Face*, *ResNet‑50*, atau arsitektur khusus *EmotionNet* telah dilatih pada dataset besar (misalnya, FER‑2013, AffectNet) untuk mengenali enam emosi dasar dengan akurasi di atas 70 %.
> >
> > Untuk **audio**, arsitektur *Recurrent Neural Network* (RNN) atau *Long Short‑Term Memory* (LSTM) efektif menangkap dinamika temporal pada sinyal suara. Kombinasi CNN‑LSTM memungkinkan sistem memproses spektrum mel‑frequency secara spasial sekaligus memodelkan perubahan temporal, menghasilkan prediksi emosi yang lebih stabil pada percakapan panjang.
> >
> > **Pembelajaran multimodal** mengintegrasikan kedua jenis data dengan jaringan *Transformer* atau *Multimodal Compact Bilinear Pooling* (MCB). Pendekatan ini memungkinkan model untuk belajar korelasi lintas‑modal, misalnya, menghubungkan gerakan alis (visual) dengan perubahan pitch (audio) untuk membedakan antara *surprise* dan *fear*.
> >
> > Seluruh pipeline biasanya dilatih dengan **loss function** yang memperhitungkan ketidakseimbangan kelas (misalnya, *focal loss*) karena beberapa emosi (seperti *joy*) muncul jauh lebih sering daripada yang lain (misalnya, *contempt*). Teknik augmentasi data (rotasi gambar, penambahan noise pada sinyal audio) juga penting untuk meningkatkan generalisasi pada kondisi dunia nyata.
> >
> > ### Aplikasi Praktis dan Implikasi
> >
> > **Sistem rekomendasi adaptif**: Platform e‑commerce dapat menyesuaikan iklan atau rekomendasi produk berdasarkan emosi pengguna yang terdeteksi melalui webcam. Jika pengguna tampak *sedih*, sistem dapat menampilkan produk yang bersifat menghibur atau menawarkan diskon khusus untuk meningkatkan mood.
> >
> > **Kesehatan mental**: Aplikasi mobile yang memantau GSR, ekspresi wajah, dan suara dapat memberikan umpan balik real‑time kepada pengguna yang mengalami kecemasan atau depresi, serta menyarankan teknik pernapasan atau menghubungkan ke profesional kesehatan.
> >
> > **Keamanan dan transportasi**: Sistem monitoring pengemudi dapat mendeteksi tanda‑tanda kelelahan atau kemarahan, kemudian mengaktifkan peringatan suara atau mengurangi kecepatan kendaraan secara otomatis untuk mencegah kecelakaan.
> >
> > **Pembelajaran dan pendidikan**: Lingkungan belajar berbasis AI dapat menilai kebahagiaan atau frustrasi siswa melalui kamera kelas, kemudian menyesuaikan tingkat kesulitan materi atau memberikan pujian yang tepat waktu untuk meningkatkan motivasi.
> >
> > **Etika dan privasi**: Karena data emosional bersifat sangat pribadi, penting bagi sistem untuk memperoleh **persetujuan eksplisit**, menyimpan data secara terenkripsi, dan memberikan opsi bagi pengguna untuk menonaktifkan pelacakan. Kebijakan transparansi serta audit algoritma diperlukan untuk mencegah bias budaya atau diskriminasi.

> [!cornell] #### Summary
>
> **Affective Computing** dan **Emotional AI** memanfaatkan sensor visual, fisiologis, audio, dan gerakan untuk **mengukur dan mengklasifikasikan emosi** manusia secara otomatis. Dengan menggunakan **model pembelajaran mesin**—terutama CNN untuk citra wajah, LSTM untuk audio, dan arsitektur multimodal untuk integrasi—sistem dapat menghasilkan prediksi real‑time yang mendukung aplikasi adaptif di bidang e‑commerce, kesehatan, transportasi, dan pendidikan. Namun, **aspek etika** seperti privasi, persetujuan, dan mitigasi bias harus menjadi bagian integral dari setiap implementasi.

> [!ad-libitum]- Additional Information
>
> #### Formal Affective Ontologies
>
> Untuk memberikan kerangka konseptual yang konsisten, peneliti sering mengadopsi **ontologi afektif** seperti *EmotionML* (W3C) atau *OCC* (Ortony, Clore, & Collins). Ontologi‑ontologi ini mendefinisikan emosi dalam bentuk **triplet** (intensitas, valensi, arousal) serta hubungan kausal antar‑emosi. Dengan memetakan output model AI ke dalam struktur ontologi, sistem dapat melakukan **reasoning** tingkat tinggi, misalnya, mengidentifikasi bahwa kombinasi *anger* (valensi negatif, arousal tinggi) dan *sadness* (valensi negatif, arousal rendah) dapat menandakan **frustrasi** yang memerlukan intervensi khusus.
>
> Implementasi praktis melibatkan **RDF triples** dan **SPARQL queries** untuk mengekstrak pola emosional dari data streaming. Pendekatan ini meningkatkan interoperabilitas antar‑platform dan memudahkan integrasi dengan sistem manajemen pengetahuan yang lebih luas.
>
> #### Deep Learning untuk Multimodal Emotion Recognition
>
> Arsitektur **Transformer‑based** (misalnya, *ViViT* untuk video, *Audio‑Visual Transformer*) telah menjadi standar baru karena kemampuan mereka memproses **sekuensial data** dengan mekanisme *self‑attention*. Model ini dapat secara simultan memperhatikan fitur visual (ekspresi wajah), audio (intonasi), dan sinyal fisiologis (GSR) dalam satu representasi terintegrasi. Penelitian terbaru (e.g., *Huang et al., 2022*) menunjukkan peningkatan akurasi hingga **85 %** pada benchmark *CMU-MOSEI* ketika menggunakan transformer multimodal dibandingkan dengan CNN‑LSTM tradisional.
>
> Namun, model transformer memerlukan **daya komputasi tinggi** dan **data pelatihan besar**. Teknik seperti **knowledge distillation** atau **model pruning** dapat mengurangi ukuran model sehingga dapat dijalankan pada perangkat edge (smartphone, wearables) tanpa mengorbankan akurasi secara signifikan.
>
> #### Real‑Time Implementation Challenges
>
> Mengoperasikan sistem pengenalan emosi secara **real‑time** menuntut optimasi pada beberapa level: (1) **Pre‑processing** cepat (deteksi wajah dengan MTCNN, ekstraksi fitur audio dengan librosa), (2) **Inference** pada hardware terbatas (menggunakan TensorRT atau ONNX Runtime), dan (3) **Latency management** (pipeline asynchronous dengan buffer). Contoh implementasi pada **AR glasses** menunjukkan bahwa latensi di bawah **100 ms** cukup untuk menyesuaikan UI secara dinamis tanpa mengganggu pengalaman pengguna.
>
> Selain itu, **robustness** terhadap kondisi pencahayaan yang berubah, noise audio, atau gerakan kepala yang cepat harus ditangani dengan teknik augmentasi data dan **domain adaptation** (misalnya, *adversarial training* untuk mengurangi gap antara data laboratorium dan data lapangan).
>
> #### Edge Cases, Cultural Variability, and Bias Mitigation
>
> Meskipun teori Ekman menyatakan universalitas enam emosi dasar, **variabilitas budaya** tetap muncul dalam intensitas ekspresi dan interpretasi. Misalnya, senyuman di beberapa budaya Asia dapat memiliki arti sopan santun bukan kebahagiaan. Oleh karena itu, model harus dilatih pada **dataset multikultural** (misalnya, *AffectNet* yang mencakup gambar dari 8 negara) dan diuji dengan **fairness metrics** (demographic parity, equalized odds).
>
> **Edge case** lain meliputi kondisi medis (misalnya, Parkinson) yang memengaruhi gerakan wajah, atau penggunaan **masker** yang menutupi sebagian ekspresi. Solusi meliputi penambahan **sensor tambahan** (GSR, EMG) atau penggunaan **model generatif** untuk memprediksi bagian wajah yang tertutup.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Sistem Deteksi Emosi Real‑Time pada Smartphone**: Gunakan kamera depan untuk mengekstrak FAU dengan MediaPipe, gabungkan dengan audio MFCC, dan latih model CNN‑LSTM menggunakan TensorFlow Lite. Evaluasi akurasi pada skenario cahaya rendah vs. terang.
> 2. **Analisis Bias Budaya pada Dataset Ekspresi Wajah**: Unduh dataset *AffectNet*, lakukan pelabelan ulang berdasarkan anotasi budaya, latih dua model (satu monokultural, satu multikultural), dan bandingkan performa serta fairness metrics. Dokumentasikan temuan dalam laporan singkat.
>
> #### Tools and Resources
>
> - **OpenFace** (https://github.com/TadasBaltrusaitis/OpenFace): toolkit open‑source untuk ekstraksi FAU dan estimasi pose wajah.
> - **Librosa** (https://librosa.org): library Python untuk analisis audio, termasuk ekstraksi MFCC dan pitch.
> - **TensorFlow Hub