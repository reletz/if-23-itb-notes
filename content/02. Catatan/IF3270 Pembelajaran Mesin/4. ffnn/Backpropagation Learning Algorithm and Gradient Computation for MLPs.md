---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Backpropagation Learning Algorithm and Gradient Computation for MLPs
>
> > ## Questions/Cues
> >
> > - Mengapa gradien dihitung mundur?
> > - Bagaimana error pada output memengaruhi bobot?
> > - Kapan harus menghentikan iterasi backprop?
> > - Apa peran fungsi aktivasi dalam turunan?
> > - Bagaimana cara mengatasi gradien menghilang?
> >
> > ## Reference Points
> >
> > - Lecture_Slides_IF3270.pdf (Pages 26-38)
> > - Mitchell, T. (1997). *Machine Learning* (Chapter 11) (Pages 31‑35)
> > - Raschka et al. (2022). *Machine Learning with PyTorch and Scikit‑Learn* (Chapter 11) (Pages 30‑34)
> > - Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning* (Sections 6.2‑6.3) (Pages 29‑34)
>
> > ### Overview of Backpropagation Learning
> >
> > Backpropagation (BP) adalah algoritma pelatihan terpusat pada jaringan saraf multilayer perceptron (MLP) yang memanfaatkan kalkulus diferensial untuk menyesuaikan bobot secara iteratif. Ide dasarnya adalah menghitung **error** pada output jaringan, kemudian “menyebarkan” (propagate) error tersebut ke belakang melalui setiap lapisan, sehingga setiap neuron memperoleh sinyal koreksi yang disebut **delta (δ)**. Proses ini memungkinkan jaringan belajar dari contoh pelatihan dengan meminimalkan fungsi kerugian (loss) secara bertahap. Pada setiap iterasi, dua fase utama terjadi: **forward propagation** (menghitung output ŷ untuk input x) dan **backward propagation** (menghitung gradien ∂L/∂w untuk setiap bobot w). Meskipun forward propagation hanya disebut secara singkat, fokus utama catatan ini adalah pada fase backward.
> >
> > Mengapa backpropagation penting? Tanpa cara sistematis menghitung gradien, penyesuaian bobot akan menjadi percobaan‑dan‑kesalahan yang tidak terarah, sehingga konvergensi menjadi sangat lambat atau bahkan tidak tercapai. Dengan memanfaatkan turunan parsial, BP memastikan bahwa setiap langkah pembaruan bergerak ke arah menurunkan nilai fungsi kerugian secara **steepest descent** pada ruang parameter.
> >
> > Contoh sederhana: pada jaringan dengan satu neuron output yang menggunakan fungsi sigmoid, error e = t – ŷ (target minus prediksi) dihitung. Delta pada output adalah δ_out = e·σ'(net_out), di mana σ' adalah turunan sigmoid. Nilai δ_out kemudian dikalikan dengan output dari neuron hidden untuk memperoleh gradien bobot antara hidden dan output. Proses serupa berulang untuk lapisan sebelumnya, menghasilkan rangkaian delta yang menurun secara eksponensial dari output ke input.
> >
> > ### Gradient Descent and the Error Surface
> >
> > **Gradient descent** adalah strategi optimasi yang mencari titik minimum pada permukaan error (loss surface) dengan mengikuti arah negatif gradien. Pada jaringan saraf, fungsi kerugian L biasanya berupa **Mean Squared Error (MSE)** atau **Cross‑Entropy**, yang tergantung pada jenis tugas (regresi atau klasifikasi). Gradien ∇L(w) memberi tahu seberapa sensitif nilai loss terhadap perubahan masing‑masing bobot w. Dengan memperbarui bobot menggunakan aturan:
> >
> > $$
> >
> > w \leftarrow w - \alpha \, \frac{\partial L}{\partial w}
> >
> > $$
> >
> > di mana α adalah **learning rate**, jaringan secara bertahap “menuruni” lembah‑lembah pada permukaan error. Analogi fisikanya mirip dengan bola yang meluncur turun lereng: semakin curam lereng (gradien besar), bola bergerak lebih cepat; bila lereng datar (gradien kecil), pergerakan melambat.
> >
> > Pada MLP dengan fungsi aktivasi non‑linear, permukaan error menjadi **non‑konveks**, artinya terdapat banyak **local minima** dan **saddle points**. Oleh karena itu, pemilihan learning rate, inisialisasi bobot, dan teknik tambahan (misalnya momentum) menjadi krusial untuk menghindari terjebak pada minima yang buruk.
> >
> > Contoh numerik: misalkan jaringan memiliki satu bobot w dan loss L(w)= (t‑σ(w·x))². Turunan pertama:
> >
> > $$
> >
> > \frac{\partial L}{\partial w}= -2(t‑\hat{y})\,\sigma'(w x)\,x
> >
> > $$
> >
> > Dengan x=0.5, t=1, w=0.2, dan α=0.1, kita dapat menghitung nilai gradien dan memperbarui w menjadi w' = 0.2 - 0.1·gradien. Langkah‑langkah ini diulang untuk semua bobot dalam jaringan.
> >
> > ### Computing Gradients for the Output Layer
> >
> > Pada lapisan output, gradien dihitung paling langsung karena loss L biasanya didefinisikan secara eksplisit pada output. Untuk fungsi aktivasi sigmoid σ(z)=1/(1+e^{-z}), turunan pertama adalah σ'(z)=σ(z)(1‑σ(z)). Jika output neuron i memiliki net input $net_i$ dan output $\hat{y}_i = σ(net_i)$, maka delta pada neuron output adalah:
> >
> > $$
> >
> > \delta_i = (\hat{y}_i - t_i)\,σ'(net_i)
> >
> > $$
> >
> > di mana $t_i$ adalah nilai target. Gradien bobot yang menghubungkan neuron hidden j ke output i menjadi:
> >
> > $$
> >
> > \frac{\partial L}{\partial w_{ji}} = \delta_i \, h_j
> >
> > $$
> >
> > dengan $h_j$ adalah output dari neuron hidden j. Secara intuitif, delta mengukur seberapa “salah” prediksi output, dan perkalian dengan $h_j$ menyesuaikan bobot proporsional dengan kontribusi neuron hidden tersebut.
> >
> > Contoh: jaringan XOR dengan dua hidden neuron h₁, h₂ dan satu output y. Misalkan setelah forward pass kita peroleh $\hat{y}=0.73$, target t=1, dan h₁=0.6, h₂=0.4. Maka:
> >
> > $$
> >
> > \delta_{out}= (0.73-1)\cdot 0.73\cdot(1-0.73) \approx -0.045
> >
> > $$
> >
> > Gradien untuk bobot w_{h1→out} = $\delta_{out}\cdot h_1 \approx -0.027$ dan w_{h2→out} = $\delta_{out}\cdot h_2 \approx -0.018$. Pembaruan bobot menggunakan learning rate α=0.1 menghasilkan penurunan kecil pada kedua bobot.
> >
> > ### Computing Gradients for Hidden Layers
> >
> > Untuk lapisan tersembunyi, error tidak langsung tersedia karena tidak ada target eksplisit. Backpropagation menggunakan **chain rule** untuk “menyebarkan” delta dari lapisan berikutnya ke lapisan sebelumnya. Jika neuron k berada di hidden layer dengan output $h_k = σ(net_k)$ dan terhubung ke beberapa neuron output i, maka delta pada neuron hidden dihitung sebagai:
> >
> > $$
> >
> > \delta_k = σ'(net_k) \sum_{i} w_{ki}\, \delta_i
> >
> > $$
> >
> > Di sini, $w_{ki}$ adalah bobot dari hidden k ke output i, dan $\delta_i$ adalah delta yang sudah dihitung pada lapisan output. Gradien bobot antara neuron j pada lapisan sebelumnya dan hidden k menjadi:
> >
> > $$
> >
> > \frac{\partial L}{\partial w_{jk}} = \delta_k \, a_j
> >
> > $$
> >
> > dengan $a_j$ adalah aktivasi neuron sebelumnya (bisa input atau hidden lain). Proses ini berulang ke atas hingga mencapai lapisan input, menghasilkan **gradient vector** lengkap untuk seluruh jaringan.
> >
> > Contoh numerik lanjutan: menggunakan nilai delta_out = –0.045 dari contoh sebelumnya, bobot w_{h1→out}=0.5, w_{h2→out}=–0.3. Turunan sigmoid pada hidden net_k (misalnya net_{h1}=0.4, σ'(0.4)=0.24). Maka:
> >
> > $$
> >
> > \delta_{h1}=0.24\,(0.5\cdot -0.045) \approx -0.0054
> >
> > $$
> >
> > Gradien untuk bobot w_{x1→h1} (dengan input x₁=0.05) menjadi $\delta_{h1}\cdot x_1 \approx -0.00027$. Pembaruan bobot ini memperbaiki representasi hidden secara bertahap.
> >
> > ### Weight Update Rule and Learning Rate
> >
> > Setelah semua gradien dihitung, setiap bobot w diperbarui dengan aturan:
> >
> > $$
> >
> > w \leftarrow w - \alpha \, \frac{\partial L}{\partial w}
> >
> > $$
> >
> > Learning rate α mengontrol ukuran langkah. Nilai α yang terlalu besar dapat menyebabkan **overshooting** (melewati minima) dan divergensi, sedangkan nilai terlalu kecil membuat konvergensi sangat lambat. Praktik umum adalah memulai dengan α≈0.01‑0.1 dan menurunkannya secara bertahap (learning‑rate decay) atau menggunakan teknik adaptif seperti **Adam** atau **RMSProp**.
> >
> > Bias (bias term) diperlakukan sama seperti bobot, hanya saja inputnya selalu 1. Oleh karena itu, gradien untuk bias pada neuron i adalah $\delta_i$ (karena input bias =1). Pembaruan bias:
> >
> > $$
> >
> > b_i \leftarrow b_i - \alpha \, \delta_i
> >
> > $$
> >
> > Contoh: dengan $δ_{out} = –0.045$ dan α=0.1, bias output baru menjadi $b_{out}^{new}=b_{out}^{old}+0.0045$.
> >
> > ### Termination Criteria and Practical Considerations
> >
> > Algoritma backpropagation biasanya dihentikan ketika salah satu kondisi berikut terpenuhi:
> >
> > 1. **Jumlah iterasi (epoch) tetap** – misalnya 500 epoch.
> > 2. **Loss pada data pelatihan turun di bawah ambang** (mis. MSE < 0.001).
> > 3. **Loss pada data validasi tidak membaik** selama beberapa epoch (early stopping) untuk mencegah overfitting.
> >
> > Selain itu, penting untuk memantau **gradient exploding** (gradien menjadi sangat besar) yang dapat menyebabkan nilai bobot tak terhingga. Teknik normalisasi seperti **gradient clipping** atau penggunaan fungsi aktivasi yang lebih stabil (mis. ReLU) dapat mengurangi masalah ini.
> >
> > Pada praktik nyata, backpropagation sering dipadukan dengan **mini‑batch gradient descent**, di mana gradien dihitung pada subset kecil data (mis. 32 contoh) sebelum pembaruan bobot. Ini menyeimbangkan kestabilan estimasi gradien (lebih baik daripada stochastic) dan kecepatan komputasi (lebih baik daripada batch penuh).

> [!cornell] #### Summary
>
> **Backpropagation** adalah mekanisme terstruktur yang menghitung gradien error secara mundur melalui jaringan MLP dengan memanfaatkan **chain rule**. Gradien pada lapisan output diperoleh langsung dari selisih prediksi‑target dan turunan aktivasi, sedangkan gradien pada lapisan tersembunyi “diturunkan” dari delta lapisan berikutnya. Dengan **gradient descent** dan **learning rate** yang tepat, bobot dan bias diperbarui secara iteratif hingga memenuhi kriteria penghentian seperti loss konvergen atau epoch maksimum. Memahami detail perhitungan delta, serta cara mengatasi masalah seperti **vanishing/exploding gradients**, adalah kunci untuk melatih jaringan yang efektif.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation Using Chain Rule
>
> Misalkan fungsi loss L tergantung pada output jaringan $\hat{y}$ yang pada gilirannya tergantung pada bobot $w_{ij}$ melalui serangkaian fungsi aktivasi. Untuk setiap bobot, turunan total diberikan oleh:
>
> $$
>
> \frac{\partial L}{\partial w_{ij}} = \frac{\partial L}{\partial a_j}\,\frac{\partial a_j}{\partial net_j}\,\frac{\partial net_j}{\partial w_{ij}}
>
> $$
>
> di mana $a_j$ adalah aktivasi neuron j, dan $net_j = \sum_k w_{kj} a_k + b_j$. Pada lapisan output, $\frac{\partial L}{\partial a_j}$ dapat dihitung langsung dari loss (mis. untuk MSE, $\partial L/\partial a_j = a_j - t_j$). Pada lapisan tersembunyi, $\frac{\partial L}{\partial a_j}$ diperoleh dengan menjumlahkan kontribusi semua neuron berikutnya:
>
> $$
>
> \frac{\partial L}{\partial a_j}= \sum_{l} \frac{\partial L}{\partial net_l}\, w_{jl}
>
> $$
>
> Kombinasi dua persamaan di atas menghasilkan rumus delta yang telah dibahas sebelumnya. Derivasi formal ini menegaskan bahwa backpropagation hanyalah aplikasi berulang dari **chain rule** pada graf terarah aciklik jaringan.
>
> #### Variants of Gradient Descent
>
> 1. **Stochastic Gradient Descent (SGD)** – menghitung gradien pada satu contoh pelatihan secara acak. Keuntungan: update sangat cepat, membantu keluar dari local minima, tetapi noise tinggi.
> 2. **Mini‑batch Gradient Descent** – menghitung gradien pada batch kecil (biasanya 32‑256 contoh). Menyediakan kompromi antara kestabilan (seperti batch penuh) dan kecepatan (seperti SGD).
> 3. **Momentum** – menambahkan fraksi dari update sebelumnya ke update saat ini:
>
> $$
>
> v_{t} = \beta v_{t-1} + \alpha \nabla L(w_{t})
>
> $$
>
> $$
>
> w_{t+1}= w_{t} - v_{t}
>
> $$
>
> dengan $\beta$ biasanya 0.9. Momentum membantu mempercepat konvergensi pada lembah‑lembah panjang.
>
> 4. **Adaptive Methods (Adam, RMSProp)** – menyesuaikan learning rate per‑parameter berdasarkan estimasi momen pertama dan kedua gradien. Adam, misalnya, menggunakan:
>
> $$
>
> m_t = \beta_1 m_{t-1} + (1-\beta_1)\nabla L
>
> $$
>
> $$
>
> v_t = \beta_2 v_{t-1} + (1-\beta_2)(\nabla L)^2
>
> $$
>
> dan melakukan koreksi bias sebelum pembaruan. Metode ini menjadi standar dalam banyak kerangka kerja deep learning.
>
> #### Numerical Stability and Activation Derivatives
>
> Pada fungsi sigmoid, turunan $\sigma'(z)=\sigma(z)(1-\sigma(z))$ dapat menjadi sangat kecil ketika |z| besar, menyebabkan **vanishing gradient**. Untuk mengatasi hal ini, jaringan modern sering menggunakan **ReLU (Rectified Linear Unit)** dengan turunan:
>
> $$
>
> \text{ReLU}'(z)=
>
> \begin{cases}
>
> 1 & \text{jika } z