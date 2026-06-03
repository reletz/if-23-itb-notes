---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Forward Propagation Worked Example in RNNs
>
> > ## Questions/Cues
> >
> > - Bagaimana contoh sequence data dimodelkan (browsing, karakter, kata)?
> > - Apa itu task next-item prediction dan one-hot encoding?
> > - Bagaimana arsitektur RNN untuk sequence classification?
> > - Bagaimana langkah forward propagation dihitung per timestep?
> > - Apa hasil character language model "hello"?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - RNN Pt. 1 (Pages 30-41)
>
> > ### Contoh Sequence Data
> > Diberikan sekuens **ABCCD…**, yang dapat merepresentasikan berbagai domain:
> >
> > - **Browsing history**: {Homepage}{Electronics}{Camera}{Camera}{ShoppingCart}… dengan A=Homepage, B=Electronics, C=Camera, D=ShoppingCart.
> > - **Character language model**: sekuens karakter seperti "hello…".
> > - **Word language model**: "aku sedang pura pura tertawa…" dengan A=aku, B=sedang, C=pura, D=tertawa.
> >
> > ### Task: Next-Item Prediction
> > Tugasnya adalah **memprediksi item berikutnya**. Untuk sekuens **ABCCD** dengan panjang input 4: **Input = ABCC**, **Output = D**. Setiap item di-encode menjadi vektor, misalnya dengan **one-hot encoding**. Maka dataset pelatihan berbentuk pasangan input-kelas per timestep:
> >
> > ```
> > A1  A2  A3  A4   Class
> > 1   0   0   0    B
> > 0   1   0   0    C
> > 0   0   1   0    C
> > 0   0   1   0    D
> > ```
> >
> > ### Arsitektur Sequence Classification RNN
> > Arsitektur RNN untuk klasifikasi sekuens menggunakan dimensi bobot:
> >
> > - **Wxh**: matriks **3×4** (hidden neurons × input dimension)
> > - **Whh**: matriks **3×3** (hidden neurons × hidden neurons)
> > - **Why**: matriks **4×3** (output neurons × hidden neurons)
> > - **Bias_xh**: matriks 3×1, **Bias_hy**: matriks 4×1
> >
> > Fungsi aktivasi: **fh = tanh** dan **fy = softmax**, sehingga:
> >
> > ```
> > h(t) = tanh(Wxh·x(t) + Whh·h(t-1) + bxh)
> > y(t) = softmax(Why·h(t) + bhy)
> > ```
> >
> > ### Inisialisasi Bobot (Acak)
> > Bobot diinisialisasi dengan nilai acak kecil. Contoh: Wxh dan Why berisi nilai 0.1-0.3, Whh seragam 0.5, bias 0.1, dan **h(0) = [0, 0, 0]** (hidden state diinisialisasi nol pada t=0).
> >
> > ### Perhitungan Forward Propagation per Timestep
> > Forward propagation untuk 1 instance sepanjang 4 timestep menghasilkan net_h, h(t) = tanh(net_h), lalu y(t) = softmax. Angka-angka konkret dari slide:
> >
> > ```
> > Timestep t1 (h(0)=0):
> >   Wxh·x(t)   Whh·h(t-1)+bxh   net_h(t)   h(t)=tanh   y(t)=softmax
> >   0.100      0.100            0.200      0.197       0.257
> >   0.150      0.100            0.250      0.245       0.253
> >   0.200      0.100            0.300      0.291       0.253
> >                                                      0.236
> >
> > Timestep t2:
> >   0.150      0.467            0.617      0.549       0.263
> >   0.200      0.467            0.667      0.583       0.259
> >   0.300      0.467            0.767      0.645       0.260
> >                                                      0.218
> >
> > Timestep t3:
> >   0.200      0.988            1.188      0.830       0.299
> >   0.300      0.988            1.288      0.859       0.302
> >   0.100      0.988            1.088      0.796       0.299
> >                                                      0.234
> >
> > Timestep t4:
> >   0.200      1.343            1.543      0.913       0.315
> >   0.300      1.343            1.643      0.928       0.317
> >   0.100      1.343            1.443      0.894       0.315
> >                                                      0.240
> > ```
> >
> > Perhatikan bahwa **h(t1) ≈ [0.197, 0.245, 0.291]** dihitung dari tanh(net_h), lalu di-propagasi: pada t2, kontribusi Whh·h(t1)+bxh menjadi 0.467 karena hidden state sebelumnya kini tidak nol. Output y(t) adalah distribusi probabilitas (jumlah ≈ 1) hasil softmax atas 4 kelas.
> >
> > ### Hasil Character Language Model
> > Untuk character language model "hello" dengan target memprediksi karakter berikutnya, hasil forward propagation (sebelum training konvergen) menunjukkan prediksi vs target:
> >
> > - t=1 (input "h"): output = "o", target = "e"
> > - t=2 (input "e"): output = "o", target = "l"
> > - t=3 (input "l"): output = "l", target = "l" ✓
> > - t=4 (input "l"): output = "o", target = "o" ✓
> >
> > Beberapa prediksi sudah benar (t=3, t=4) sementara yang lain salah (t=1, t=2), menunjukkan model masih perlu dilatih lebih lanjut melalui backpropagation untuk meminimalkan loss.

> [!cornell] #### Summary
>
> Sekuens **ABCCD** (browsing/karakter/kata) digunakan untuk **next-item prediction** (input ABCC → output D) dengan item di-**one-hot encode**. Arsitektur RNN sequence classification memakai **Wxh 3×4, Whh 3×3, Why 4×3**, dengan **fh = tanh** dan **fy = softmax**, serta **h(0) = 0**. Forward propagation dihitung per timestep: net_h = Wxh·x(t) + Whh·h(t-1) + bxh, lalu **h(t) = tanh(net_h)** (mis. **h(t1) ≈ [0.197, 0.245, 0.291]**) dan **y(t) = softmax**. Hidden state membawa konteks antar langkah sehingga kontribusi rekuren tumbuh dari t1 ke t4. Pada character LM "hello", sebagian prediksi awal sudah benar (t3, t4) dan sebagian salah, menandakan butuh training lebih lanjut.

> [!ad-libitum]- Additional Information
>
> #### Detail Perhitungan tanh dan softmax
> Fungsi `tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)` memetakan net_h ke rentang (-1, 1); untuk net_h kecil seperti 0.2, tanh(0.2) ≈ 0.197 (mendekati linear). Softmax menormalkan: `y_i = exp(z_i)/Σ exp(z_j)`, sehingga vektor output selalu berjumlah 1 dan dapat ditafsirkan sebagai probabilitas kelas.
>
> #### Teacher Forcing
> Saat melatih language model, sering digunakan teknik **teacher forcing**: pada timestep t, alih-alih memakai output prediksi model sebagai input t+1, digunakan target sebenarnya (ground truth). Ini mempercepat konvergensi tetapi menimbulkan exposure bias saat inferensi.
>
> #### Verifikasi dengan Spreadsheet/NumPy
> Worked example ini sangat cocok diverifikasi manual di spreadsheet atau NumPy. Dengan menyusun Wxh, Whh, Why, dan h(0)=0, kita bisa mereproduksi tepat angka 0.197/0.245/0.291 di t1 dan melacak bagaimana Whh·h(t-1) tumbuh.
>
> #### Proyek Eksplorasi Mandiri
> 1. Reproduksi seluruh tabel forward propagation 4 timestep di atas menggunakan NumPy dan verifikasi setiap angka net_h, h(t), dan y(t).
> 2. Latih char-RNN sederhana pada teks pendek (mis. lirik lagu) dan amati bagaimana prediksi karakter membaik seiring epoch.
>
> #### Bacaan Lanjutan
> - Karpathy, A. (2015). [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)
> - [Introduction to Recurrent Neural Networks (Analytics Vidhya)](https://www.analyticsvidhya.com/blog/2017/12/introduction-to-recurrent-neural-networks/)
