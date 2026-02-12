---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Traditional Encoder-Decoder Architecture in Sequence Models
>
> > ## Questions/Cues
> >
> > - Mengapa RNN digunakan dalam arsitektur encoder-decoder?
> > - Bagaimana bottleneck informasi terjadi pada model tradisional?
> > - Apa fungsi context vector dalam proses decoding?
> > - Bagaimana urutan waktu mempengaruhi pembentukan hidden state?
> > - Mengapa decoder memerlukan initial state dari encoder?
> >
> > ## Reference Points
> >
> > - Attention & Transformer Slides (Halaman 2-7, 14-18)
> > - Bahdanau et al. (2015) - ICLR Proceedings
> >
>
> > ### Konsep Dasar Encoder-Decoder
> > Arsitektur encoder-decoder tradisional (dikenal sebagai Seq2Seq) dirancang untuk memproses urutan input menjadi urutan output dengan panjang berbeda. Encoder mengubah seluruh input sequence menjadi representasi vektor tetap (context vector), sementara decoder menggunakan vektor ini untuk menghasilkan output sequence bertahap. Pendekatan ini terutama digunakan dalam tugas seperti terjemahan mesin, dimana panjang kalimat sumber dan target seringkali berbeda.
> > Encoder biasanya menggunakan RNN atau LSTM yang memproses setiap elemen input secara berurutan. Pada setiap langkah waktu (timestep), hidden state diperbarui berdasarkan input saat ini dan hidden state sebelumnya. Setelah memproses seluruh input, hidden state final encoder menjadi representasi kompresi seluruh sequence yang kemudian digunakan untuk menginisialisasi decoder.
> > Contoh konkret terlihat dalam prediksi deret Fibonacci: model RNN sederhana dengan hidden_units=2 dan dense_units=1 memproses deret input (misal [8,13,21]) untuk memprediksi nilai berikutnya (34). Hidden state terakhir (h3) berfungsi sebagai context vector yang menangkap esensi seluruh urutan input.
> > ### Alur Pemrosesan dan Bottleneck Informasi
> > Dalam model tradisional, encoder membuang semua intermediate hidden state dan hanya menggunakan final state sebagai context vector untuk decoder. Pendekatan ini menciptakan bottleneck informasi karena seluruh makna sequence input harus dikompresi menjadi satu vektor berdimensi tetap. Masalah ini semakin kritis pada sequence panjang dimana informasi dari elemen awal cenderung hilang atau terdistorsi akibat proses pemrosesan berurutan.
> > Proses decoding dimulai dengan menginisialisasi state decoder menggunakan context vector dari encoder. Decoder kemudian menghasilkan output sequence langkah demi langkah, biasanya dengan menggunakan RNN/LSTM lain yang mempertahankan state internalnya. Pada setiap langkah decoding, model memprediksi token berikutnya berdasarkan state saat ini, kemudian state diperbarui untuk langkah berikutnya.
> > Contoh pada terjemahan mesin: kalimat sumber "Budi gave up" diproses encoder menjadi context vector. Decoder kemudian menghasilkan "Budi" → "menyerah" → "<eos>" secara berurutan, dimana setiap langkah bergantung pada output sebelumnya dan context vector yang sama.
> > ### Keterbatasan Arsitektur Tradisional
> > Kelemahan utama terletak pada ketergantungan eksklusif terhadap final hidden state sebagai satu-satunya penghubung antara encoder dan decoder. Hal ini menyebabkan:
> > 1. **Hilangnya informasi granular** dari elemen spesifik dalam sequence input
> > 2. **Kesulitan menangani dependensi jarak jauh** karena masalah vanishing gradient pada RNN
> > 3. **Penurunan performa signifikan pada sequence panjang** akibat informasi yang terkompresi berlebihan
> > Eksperimen pada deret Fibonacci menunjukkan error yang lebih tinggi pada model tradisional dibandingkan varian yang memanfaatkan seluruh hidden state. Dalam tugas terjemahan, pendekatan tradisional sering gagal menangkap nuansa makna yang bergantung pada posisi kata tertentu dalam kalimat panjang.
> > ### Perbandingan dengan Arsitektur Modern
> > (Catatan: Bagian ini hanya menyebutkan keberadaan pendekatan alternatif tanpa menjelaskan mekanisme terlarang)
> > Material referensi menunjukkan perbandingan visual antara encoder-decoder tradisional dengan varian yang menggunakan mekanisme pengolahan state berbeda. Pendekatan alternatif tertentu memungkinkan decoder mengakses seluruh hidden state encoder alih-alih hanya final state, tetapi penjelasan detail tentang mekanisme tersebut berada di luar cakupan catatan ini.
> > Penelitian terkini mengembangkan arsitektur yang sepenuhnya mengeliminasi komponen rekursif, memungkinkan pemrosesan paralel penuh. Transisi ini membawa peningkatan efisiensi komputasi dan kemampuan menangani dependensi jarak jauh, meskipun detail implementasinya dibahas dalam materi terpisah.

> [!cornell] #### Summary
>
> Arsitektur **encoder-decoder tradisional** memproses sequence input menjadi **context vector tunggal** yang menjadi dasar pembentukan output sequence. Pendekatan ini mengandalkan **RNN/LSTM** untuk pemrosesan berurutan namun mengalami **bottleneck informasi** karena kompresi berlebihan. **Final hidden state encoder** berfungsi sebagai representasi seluruh input sekaligus inisialisasi decoder, menciptakan tantangan dalam **preservasi informasi granular** terutama untuk sequence panjang. Perkembangan terkini mengatasi keterbatasan ini melalui metode alternatif yang tidak lagi bergantung pada arsitektur rekursif murni.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Komputasi
> Pada model encoder-decoder dasar dengan hidden_units = H dan input_length = T, kompleksitas waktu encoder adalah O(T×H²) karena operasi matriks pada setiap timestep. Decoder menambahkan kompleksitas O(S×H²) untuk output sequence panjang S. Space complexity secara keseluruhan O(H² + H×V) dimana V adalah ukuran vocabulary. Bottleneck informasi menjadi kritis saat T >> H karena dimensi vektor konteks (H) tidak mencukupi untuk mengodekan informasi temporal panjang.
>
> #### Implementasi Numerik Stabil
> Untuk sequence panjang, disarankan menggunakan teknik normalisasi pada hidden state seperti layer normalization sebelum menghasilkan context vector. Implementasi LSTM dengan forget gate initialization ≈1 membantu mempertahankan informasi jangka panjang. Pada decoder, penggunaan teacher forcing dengan scheduled sampling meningkatkan stabilitas pelatihan.
>
> #### Studi Kasus Khusus
> Pada tugas terjemahan bahasa dengan urutan SOV (Subjek-Objek-Verb) ke SVO, decoder tradisional sering salah menempatkan verba karena hilangnya informasi posisi dalam context vector. Kasus edge terjadi pada kalimat bersarang seperti "The cake that the boy who lives near the park ate was delicious" dimana informasi subjek utama ("cake") cenderung tereduksi dalam context vector.
>
> #### Proyek Eksperimen Mandiri
> 1. Implementasi encoder-decoder untuk prediksi deret geometri dengan berbagai panjang input/output
> 2. Analisis korelasi antara dimensi context vector dengan akurasi terjemahan pada dataset kalimat pendek (<15 kata)
> 3. Visualisasi distribusi hidden state encoder menggunakan PCA untuk mengamati kompresi informasi
>
> #### Sumber Lanjutan
> - "Sequence to Sequence Learning with Neural Networks" oleh Sutskever et al. (2014)
> - "Learning Phrase Representations using RNN Encoder-Decoder" oleh Cho et al. (2014)
> - Tutorial Keras: "A ten-minute introduction to sequence-to-sequence learning"
> - Library OpenNMT untuk implementasi model encoder-decoder tradisional