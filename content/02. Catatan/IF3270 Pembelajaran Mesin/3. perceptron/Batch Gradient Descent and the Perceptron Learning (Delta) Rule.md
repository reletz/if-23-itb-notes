---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Batch Gradient Descent and the Perceptron Learning (Delta) Rule
>
> > ## Questions/Cues
> >
> > - Mengapa batch gradient descent menghitung pembaruan bobot setelah seluruh data?
> > - Bagaimana fungsi kesalahan (error) didefinisikan untuk perceptron?
> > - Langkah‑langkah matematis apa yang menghasilkan delta rule?
> > - Apa peran laju belajar (learning rate) η dalam konvergensi?
> > - Bagaimana cara memeriksa konvergensi pada setiap epoch?
> > - Kapan batch gradient descent dapat terjebak pada minimum lokal?
> > - Apa perbedaan utama antara fungsi aktivasi terthreshold dan tidak terthreshold?
> >
> > ## Reference Points
> >
> > - Slide_Outline.pptx (Slides 13‑26)
> > - Perceptron_Training.pptx (Slides 16‑23, 24‑26)
> > - Gradient_Descent_Theory.pdf (Pages 19‑23)
> > - Raschka & Liu (2022) *Machine Learning with PyTorch and Scikit‑Learn* (Chapter 4)
>
> > ### Batch Gradient Descent Overview
> >
> > Batch gradient descent (BGD) adalah strategi optimisasi yang memperbarui semua bobot model sekaligus setelah menghitung gradien total pada seluruh kumpulan data pelatihan. Ide dasarnya mirip dengan menuruni sebuah lembah: gradien menunjukkan arah menurun paling curam, dan langkah (learning rate η) menentukan seberapa jauh kita melangkah pada tiap iterasi. Karena gradien dihitung atas semua contoh, nilai yang diperoleh merupakan rata‑rata yang stabil, sehingga arah pergerakan lebih konsisten dibandingkan metode yang memperbarui bobot per contoh. Pada konteks perceptron, BGD memastikan bahwa setiap epoch menghasilkan satu set bobot yang menurunkan fungsi kesalahan secara global.
> >
> > Secara formal, misalkan terdapat $N$ contoh pelatihan $\{(\mathbf{x}_i, y_i)\}_{i=1}^{N}$ dengan $\mathbf{x}_i\in\mathbb{R}^d$ dan label $y_i\in\{-1,+1\}$. Bobot model dituliskan $\mathbf{w}\in\mathbb{R}^{d+1}$ (termasuk bias $w_0$ dengan $\mathbf{x}_0=1$). Pada setiap epoch, gradien fungsi kesalahan $E(\mathbf{w})$ dihitung sebagai:
> >
> > $$
> >
> > \nabla_{\mathbf{w}}E = -\sum_{i=1}^{N}(y_i - o_i)\mathbf{x}_i,
> >
> > $$
> >
> > di mana $o_i = \text{sign}(\mathbf{w}^\top\mathbf{x}_i)$ adalah prediksi perceptron. Pembaruan bobot kemudian:
> >
> > $$
> >
> > \mathbf{w} \leftarrow \mathbf{w} + \eta \sum_{i=1}^{N}(y_i - o_i)\mathbf{x}_i.
> >
> > $$
> >
> > Karena semua contoh dipertimbangkan sekaligus, BGD cenderung menghasilkan lintasan konvergensi yang halus, meskipun memerlukan memori yang cukup untuk menampung seluruh dataset pada tiap iterasi.
> >
> > ### Error Function for the Perceptron (Sum‑of‑Squares)
> >
> > Pada perceptron tradisional, fungsi aktivasi bersifat diskrit (sign). Namun untuk menerapkan gradient descent, kita memerlukan fungsi yang dapat diturunkan. Oleh karena itu, biasanya dipilih fungsi **sum‑of‑squares error (SSE)** tanpa threshold:
> >
> > $$
> >
> > E(\mathbf{w}) = \frac{1}{2}\sum_{i=1}^{N}(y_i - \mathbf{w}^\top\mathbf{x}_i)^2.
> >
> > $$
> >
> > Pada persamaan di atas, output model $ \hat{y}_i = \mathbf{w}^\top\mathbf{x}_i$ bersifat kontinu, sehingga gradien dapat dihitung secara analitis. SSE memiliki bentuk parabola dalam ruang bobot, yang berarti permukaan kesalahan adalah **convex** (cembung) bila data dapat dipisahkan secara linear; dalam kasus tidak terpisahkan, permukaan tetap berbentuk parabola tetapi dengan minimum global yang merepresentasikan solusi “best‑fit”.
> >
> > Contoh numerik: dengan tiga contoh $(\mathbf{x}_1=[1,0,1]^\top, y_1=-1)$, $(\mathbf{x}_2=[0,-1,-1]^\top, y_2=+1)$, dan $(\mathbf{x}_3=[-1,0,1]^\top, y_3=-1)$, inisialisasi bobot $\mathbf{w}= \mathbf{0}$. Menghitung $\hat{y}_i$ menghasilkan semua nol, sehingga error pada tiap contoh adalah $(y_i-0)^2$. Gradien total menjadi $\sum_i (y_i-0)\mathbf{x}_i = (-1)[1,0,1]^\top + (+1)[0,-1,-1]^\top + (-1)[-1,0,1]^\top = [0,-1,-1]^\top$. Dengan $\eta=0.1$, pembaruan bobot pertama menjadi $\mathbf{w}=0.1[0,-1,-1]^\top$. Proses ini diulang hingga perubahan bobot menjadi sangat kecil atau error total berada di bawah ambang tertentu.
> >
> > ### Derivation of the Delta Rule
> >
> > **Delta rule** adalah nama lain untuk pembaruan bobot yang diperoleh dari gradien descent pada fungsi SSE. Dari definisi gradien di atas:
> >
> > $$
> >
> > \Delta \mathbf{w} = -\eta \nabla_{\mathbf{w}}E = \eta \sum_{i=1}^{N}(y_i - \mathbf{w}^\top\mathbf{x}_i)\mathbf{x}_i.
> >
> > $$
> >
> > Jika kita menuliskan $\mathbf{w}^\top\mathbf{x}_i = o_i$ (output kontinu), maka:
> >
> > $$
> >
> > \Delta w_j = \eta \sum_{i=1}^{N}(y_i - o_i)x_{ij},
> >
> > $$
> >
> > untuk setiap komponen bobot $j$. Persamaan ini menunjukkan bahwa perubahan pada bobot $w_j$ sebanding dengan **selisih** antara target dan prediksi, dikalikan dengan nilai fitur yang bersangkutan, dan dijumlahkan atas semua contoh. Karena selisih $(y_i - o_i)$ dapat bernilai positif atau negatif, bobot akan naik atau turun sesuai kebutuhan untuk mengurangi error.
> >
> > Pada implementasi praktis, biasanya dilakukan dalam dua fase: (1) akumulasi $\Delta w_j$ selama satu epoch (menyimpan nilai sementara), dan (2) penambahan akumulasi tersebut ke bobot setelah seluruh contoh diproses. Ini memastikan bahwa setiap epoch menghasilkan satu langkah gradien yang konsisten.
> >
> > ### Algorithmic Steps for Batch Perceptron Training
> >
> > 1. **Inisialisasi**: Pilih nilai kecil acak untuk semua bobot $\mathbf{w}$ (termasuk bias).
> > 2. **Loop Epoch**: Selama belum memenuhi kriteria penghentian (misalnya error < ε atau jumlah epoch maksimum), lakukan:
> >
> > a. Set semua $\Delta w_j = 0$.
> >
> > b. **Iterasi contoh**: Untuk tiap contoh $(\mathbf{x}_i, y_i)$:
> >
> > - Hitung output kontinu $o_i = \mathbf{w}^\top\mathbf{x}_i$.
> > - Hitung selisih $\delta_i = y_i - o_i$.
> > - Untuk tiap bobot $j$, akumulasikan $\Delta w_j \leftarrow \Delta w_j + \eta \,\delta_i \, x_{ij}$.
> >
> > c. **Pembaruan bobot**: Setelah semua contoh diproses, set $\mathbf{w}_j \leftarrow \mathbf{w}_j + \Delta w_j$ untuk semua $j$.
> >
> > d. **Evaluasi error**: Hitung kembali nilai SSE dengan bobot baru; jika penurunan error kurang dari toleransi, hentikan.
> >
> > Contoh numerik singkat: dengan dataset dua‑dimensi $\{([1,1],+1), ([1,-1],-1), ([-1,1],-1), ([-1,-1],-1)\}$ dan $\eta=0.2$, setelah epoch pertama bobot berubah menjadi $\mathbf{w} = [0.0, 0.4, 0.4]^\top$. Pada epoch kedua, gradien menjadi lebih kecil, sehingga pembaruan bobot berkurang, dan error menurun secara eksponensial hingga konvergen.
> >
> > ### Convergence, Learning Rate, and Local Minima
> >
> > **Laju belajar (η)** berperan penting dalam kecepatan dan stabilitas konvergensi. Jika η terlalu besar, langkah gradien dapat melampaui minimum dan menyebabkan osilasi atau divergensi. Sebaliknya, η yang terlalu kecil menghasilkan konvergensi yang sangat lambat, terutama pada dataset besar. Praktik umum adalah memulai dengan nilai η ≈ 0.01‑0.1 dan menurunkannya secara bertahap (learning‑rate schedule) bila error tidak menurun signifikan.
> >
> > Karena fungsi SSE pada model linear bersifat **kuadratik**, permukaan error memiliki satu **minimum global** bila data dapat dipisahkan secara linear; dalam kasus tidak terpisahkan, minimum global tetap ada (representasi best‑fit). Namun, bila fungsi aktivasi dipertahankan sebagai fungsi step (sign), permukaan error menjadi tidak diferensial dan dapat menimbulkan **minimum lokal** yang membuat algoritma tidak konvergen. Oleh karena itu, dalam praktik BGD biasanya dipasangkan dengan fungsi aktivasi kontinu (misalnya linear atau sigmoid) selama fase pelatihan, kemudian hasil bobot dapat dipakai kembali pada fungsi step untuk klasifikasi akhir.
> >
> > Untuk memeriksa konvergensi, selain memantau nilai SSE, dapat juga memeriksa **norma gradien** $\|\nabla_{\mathbf{w}}E\|$. Jika norma ini mendekati nol, maka perubahan bobot selanjutnya akan sangat kecil, menandakan bahwa titik optimum telah tercapai.

> [!cornell] ### Summary
> 
>  **Batch Gradient Descent** memperbarui bobot perceptron setelah menghitung gradien total pada seluruh data, menghasilkan langkah optimisasi yang stabil namun memerlukan memori penuh. Fungsi kesalahan yang umum dipakai adalah **sum‑of‑squares**, yang menghasilkan permukaan error kuadratik dan memungkinkan derivasi **Delta Rule**: $\Delta w_j = \eta\sum_i (y_i - o_i)x_{ij}$. Algoritma melibatkan akumulasi pembaruan selama satu epoch, diikuti oleh pembaruan simultan pada semua bobot, dengan konvergensi dipengaruhi kuat oleh **learning rate** dan sifat convexitas error. Pada data yang tidak dapat dipisahkan secara linear, BGD tetap menemukan solusi **best‑fit**, meskipun tidak menjamin klasifikasi sempurna.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation of Gradient for Linear Unit
>
> Untuk unit linear dengan output $o = \mathbf{w}^\top\mathbf{x}$ dan fungsi kesalahan $E = \frac{1}{2}\sum_i (y_i - o_i)^2$, gradien dapat diturunkan secara eksplisit:
>
> $$
>
> \frac{\partial E}{\partial w_j}= -\sum_{i=1}^{N}(y_i - \mathbf{w}^\top\mathbf{x}_i)x_{ij}.
>
> $$
>
> Langkah pertama adalah menuliskan $E$ sebagai fungsi komposit, kemudian menggunakan aturan rantai. Karena $\partial o_i/\partial w_j = x_{ij}$, hasilnya langsung menjadi bentuk delta rule. Derivasi ini menegaskan bahwa gradien adalah **kombinasi linear** dari fitur‑fitur, sehingga perhitungan dapat dioptimalkan dengan operasi matriks $\mathbf{X}^\top(\mathbf{y} - \mathbf{Xw})$.
>
> #### Analysis of Local vs Global Minima in Quadratic Error Surface
>
> Pada model linear dengan SSE, matriks Hessian $H = \mathbf{X}^\top\mathbf{X}$ bersifat positif semi‑definitif. Jika $\mathbf{X}$ memiliki peringkat penuh (full rank), maka $H$ positif definit, menjamin **minimum global unik**. Namun, bila fitur‑fitur saling bergantung (multikolinearitas), $H$ menjadi singular, menghasilkan **garis minima** (infinitas solusi). Dalam kasus ini, regularisasi L2 (ridge) menambahkan $\lambda I$ ke Hessian, mengubahnya menjadi positif definit dan memperbaiki kestabilan numerik.
>
> #### Learning‑Rate Scheduling and Adaptive Methods
>
> Penurunan learning rate secara bertahap (misalnya $\eta_t = \eta_0 / (1 + \alpha t)$ atau eksponensial $\eta_t = \eta_0 \gamma^t$) membantu mengatasi osilasi pada tahap akhir konvergensi. Metode adaptif seperti **AdaGrad** atau **RMSProp** dapat diterapkan pada batch gradient descent dengan menghitung akumulasi kuadrat gradien per bobot:
>
> $$
>
> G_j^{(t)} = G_j^{(t-1)} + (\nabla_{w_j}E^{(t)})^2,\qquad
>
> w_j^{(t+1)} = w_j^{(t)} - \frac{\eta}{\sqrt{G_j^{(t)}+\epsilon}} \nabla_{w_j}E^{(t)}.
>
> $$
>
> Pendekatan ini menyesuaikan langkah secara otomatis untuk setiap bobot, mempercepat konvergensi pada dimensi yang jarang ter‑update.
>
> #### Comparison with Second‑Order Optimization (Newton’s Method)
>
> Newton’s method menggunakan informasi **Hessian** untuk menentukan arah dan ukuran langkah:
>
> $$
>
> \mathbf{w}^{(t+1)} = \mathbf{w}^{(t)} - H^{-1}\nabla_{\mathbf{w}}E.
>
> $$
>
> Pada fungsi kuadratik, Newton’s method menemukan solusi optimal dalam satu iterasi karena Hessian konstan. Namun, menghitung invers Hessian memerlukan $\mathcal{O}(d^3)$ operasi, tidak praktis untuk dimensi tinggi. Sebagai alternatif, **Quasi‑Newton** seperti BFGS memperkirakan Hessian secara iteratif dengan biaya $\mathcal{O}(d^2)$, memberikan kompromi antara kecepatan konvergensi dan kompleksitas komputasi.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Batch Gradient Descent untuk Perceptron**: Buat skrip Python yang menerima dataset sintetis (misalnya dua kelas Gaussian) dan visualisasikan lintasan bobot pada ruang 2‑dimensi selama setiap epoch. Bandingkan hasil dengan solusi analitik (least‑squares) untuk memverifikasi konvergensi.
> 2. **Analisis Pengaruh Learning Rate**: Jalankan eksperimen dengan berbagai nilai η (0.001, 0.01, 0.1, 0.5) pada dataset yang sama, catat jumlah epoch hingga konvergensi, dan plot kurva error vs epoch. Diskusikan fenomena overshooting dan stagnasi.
>
> #### Tools and Resources
>
> - **NumPy** dan **SciPy**: untuk operasi matriks dan kalkulasi gradien.
> - **Matplotlib**: visualisasi lintasan bobot dan permukaan error.
> - **Jupyter Notebook**