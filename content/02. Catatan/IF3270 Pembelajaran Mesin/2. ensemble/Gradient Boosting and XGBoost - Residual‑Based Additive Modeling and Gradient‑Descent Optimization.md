---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Gradient Boosting and XGBoost: Residual‑Based Additive Modeling and Gradient‑Descent Optimization
>
> > ## Questions/Cues
> >
> > - Mengapa residual dipakai dalam Gradient Boosting?
> > - Bagaimana proses pembaruan model pada tiap iterasi?
> > - Apa peran learning rate (shrinkage) dalam XGBoost?
> > - Bagaimana XGBoost menangani regularisasi pohon?
> > - Apa perbedaan antara gradient boosting dan gradient descent klasik?
> > - Bagaimana cara menghitung gradient untuk fungsi loss kuadrat?
> > - Mengapa XGBoost disebut “extreme” dibandingkan gradient boosting standar?
> >
> > ## Reference Points
> >
> > - Lecture_Ensemble_Methods.pdf (Pages 46‑64)
> > - Kunapuli, G. (2023). *Ensemble methods for machine learning* (Pages 46‑64)
> > - “Basic ensemble learning – gradient boosting” – Towards Data Science (Page 58)
> > - “Gradient Boosting” – GeeksforGeeks (Page 59)
>
> > ### Gradient Boosting: Ide Dasar Additive Modeling
> >
> > Gradient Boosting merupakan metode ensemble **sekuensial** yang membangun model kuat dengan menambahkan **model lemah** secara bertahap. Ide dasarnya adalah memperbaiki kesalahan (residual) yang masih tersisa setelah setiap iterasi. Pada iterasi ke‑$t$, model lemah $h_t(x)$ dilatih untuk memprediksi residual $r_{i}^{(t)} = y_i - \hat{y}_i^{(t-1)}$ dari model gabungan sebelumnya $\hat{y}^{(t-1)}(x)=\sum_{k=0}^{t-1}\gamma_k h_k(x)$. Dengan cara ini, setiap model baru “mengisi lubang” yang belum terjangkau, sehingga fungsi prediksi akhir menjadi **penjumlahan aditif** dari semua model lemah.
> >
> > Contoh konkret: misalkan kita memiliki data rumah dengan harga aktual $y$ dan prediksi awal $\hat{y}^{(0)}$ berupa rata‑rata harga. Residual pertama adalah selisih antara harga aktual dan rata‑rata. Pohon keputusan kecil (depth 1) kemudian dipelajari untuk memetakan fitur‑fitur (mis. ukuran rumah) ke residual tersebut. Setelah penambahan, prediksi menjadi rata‑rata plus kontribusi pohon pertama; proses berulang hingga residual menjadi sangat kecil atau batas iterasi tercapai.
> >
> > Pendekatan additive ini berbeda dengan **bagging** atau **random forest** yang menggabungkan model secara paralel; di sini urutan pelatihan penting karena setiap model bergantung pada kesalahan model sebelumnya. (Catatan: detail tentang bagging dan random forest tidak dibahas di sini karena berada di luar cakupan topik.)
> >
> > ### Gradient Descent sebagai Kerangka Optimasi
> >
> > Secara matematis, Gradient Boosting dapat dipandang sebagai **gradient descent pada ruang fungsi**. Misalkan kita memiliki fungsi loss $L(y, \hat{y})$ (mis. squared error $\frac{1}{2}(y-\hat{y})^2$). Tujuan training adalah menemukan fungsi $F(x)$ yang meminimalkan $\sum_i L(y_i, F(x_i))$. Pada setiap iterasi, kita menghitung **gradient negatif** terhadap prediksi saat ini:
> >
> > $$
> >
> > g_i^{(t)} = -\left.\frac{\partial L(y_i, \hat{y})}{\partial \hat{y}}\right|_{\hat{y}=F^{(t-1)}(x_i)}
> >
> > $$
> >
> > Untuk squared error, gradient negatif sama dengan residual $y_i - \hat{y}_i^{(t-1)}$. Kemudian, alih‑alih menggunakan gradient secara langsung, kita melatih model lemah $h_t(x)$ untuk **mengaproksimasi** gradient tersebut. Setelah itu, model gabungan diperbarui:
> >
> > $$
> >
> > F^{(t)}(x) = F^{(t-1)}(x) + \eta \, h_t(x)
> >
> > $$
> >
> > di mana $\eta$ adalah **learning rate** (atau shrinkage). Dengan kata lain, setiap langkah gradient descent diimplementasikan oleh sebuah pohon keputusan yang belajar memetakan fitur ke arah penurunan loss.
> >
> > Pendekatan ini menjelaskan mengapa gradient boosting disebut “gradient‑descent‑based boosting”: ia menggabungkan kekuatan **boosting** (penambahan model lemah) dengan **optimasi gradient** (menggunakan arah penurunan loss).
> >
> > ### Pohon Keputusan sebagai Learner Lemah
> >
> > Pada praktik umum, **regression tree** (pohon regresi) dipilih sebagai learner lemah karena kemampuannya menangkap interaksi non‑linear antar fitur dengan kompleksitas komputasi yang relatif rendah. Setiap pohon biasanya dibatasi kedalaman (mis. depth 3‑5) sehingga model lemah tidak terlalu kuat; hal ini penting agar proses boosting tetap “lemah” dan dapat memperbaiki kesalahan secara bertahap.
> >
> > Proses pembentukan pohon pada iterasi $t$ meliputi:
> >
> > 1. Menghitung residual (atau gradient) untuk semua contoh pelatihan.
> > 2. Menentukan split terbaik yang meminimalkan **loss reduction** pada residual tersebut (mis. mengurangi variansi residual dalam setiap leaf).
> > 3. Menetapkan nilai leaf sebagai rata‑rata residual dalam leaf tersebut (atau nilai yang meminimalkan loss secara lokal).
> > 4. Menyimpan pohon sebagai $h_t(x)$ dan melanjutkan ke iterasi berikutnya.
> >
> > Karena setiap pohon hanya mempelajari pola pada residual, model akhir dapat mengekspresikan fungsi yang sangat kompleks meskipun setiap komponen individualnya sederhana.
> >
> > ### Learning Rate (Shrinkage) dan Regularisasi
> >
> > **Learning rate** $\eta$ (biasanya antara 0.01‑0.3) mengontrol seberapa besar kontribusi tiap pohon lemah terhadap model akhir. Nilai kecil memperlambat konvergensi tetapi biasanya meningkatkan akurasi karena mengurangi risiko **over‑fitting**. Secara intuitif, shrinkage menurunkan “langkah” yang diambil dalam ruang fungsi, mirip dengan step size pada gradient descent klasik.
> >
> > XGBoost memperluas konsep ini dengan menambahkan **regularisasi struktural** pada setiap pohon:
> >
> > $$
> >
> > \Omega(h) = \gamma T + \frac{1}{2}\lambda \sum_{j=1}^{T} w_j^2
> >
> > $$
> >
> > di mana $T$ adalah jumlah leaf, $w_j$ adalah nilai leaf, $\gamma$ mengontrol penalti jumlah leaf, dan $\lambda$ mengontrol penalti L2 pada nilai leaf. Regularisasi ini mencegah pohon menjadi terlalu dalam atau leaf memiliki nilai ekstrem, sehingga meningkatkan generalisasi.
> >
> > Selain itu, XGBoost menyediakan **column subsampling** (sampling fitur secara acak pada tiap iterasi) dan **row subsampling** (sampling contoh) yang menambah variasi model tanpa harus mengorbankan kecepatan. Kedua teknik ini mirip dengan konsep “bagging” tetapi diintegrasikan dalam kerangka boosting, sehingga tetap mempertahankan urutan pembelajaran.
> >
> > ### XGBoost: Optimasi Second‑Order dan Histogram‑Based Splitting
> >
> > XGBoost memperkenalkan dua inovasi utama dibandingkan implementasi gradient boosting tradisional:
> >
> > 1. **Approximation second‑order**: selain gradient pertama ($g_i$), XGBoost menghitung Hessian kedua ($h_i = \partial^2 L / \partial \hat{y}^2$). Dengan menggunakan Taylor expansion orde dua, objektif pada iterasi $t$ menjadi:
> >
> > $$
> >
> > \tilde{L}^{(t)} = \sum_i \left[ g_i^{(t)} h_t(x_i) + \frac{1}{2} h_i^{(t)} h_t(x_i)^2 \right] + \Omega(h_t)
> >
> > $$
> > 
> > Ini memungkinkan pemilihan split yang lebih akurat karena mempertimbangkan kelengkungan loss, bukan hanya kemiringan.
> >
> > 2. **Histogram‑based split finding**: alih‑alih mengevaluasi semua nilai unik fitur, XGBoost mengkuantisasi nilai menjadi histogram (biasanya 256 bin). Split terbaik dipilih berdasarkan skor gain yang dihitung dari histogram, sehingga kompleksitas pencarian turun dari $O(N \cdot \text{unique})$ menjadi $O(N \cdot \text{bins})$. Pendekatan ini mempercepat training pada dataset besar dan memori‑efisien.
> >
> > 	Kedua teknik tersebut menjadikan XGBoost **“extreme”**: lebih cepat, lebih akurat, dan lebih mudah di‑tune dibandingkan gradient boosting standar.
> >
> > ### Proses Inference pada Gradient Boosting dan XGBoost
> >
> > Setelah model selesai dilatih, prediksi pada contoh baru $x$ dilakukan dengan menjumlahkan kontribusi semua pohon:
> >
> > $$
> >
> > \hat{y}(x) = F^{(0)}(x) + \eta \sum_{t=1}^{T} h_t(x)
> >
> > $$
> >
> > Pada XGBoost, nilai awal $F^{(0)}(x)$ biasanya berupa **bias** (rata‑rata target) yang dipelajari secara otomatis. Setiap pohon dievaluasi secara **leaf‑wise**: fitur pada node dipilih, nilai leaf di‑lookup, dan hasilnya dikalikan dengan learning rate sebelum dijumlahkan. Karena semua operasi bersifat deterministik, inference dapat dioptimalkan dengan teknik **vectorization** atau **GPU acceleration**, yang menjadi keunggulan praktis XGBoost pada produksi.

> [!cornell] #### Summary
>
> **Gradient Boosting** membangun model kuat dengan menambahkan pohon lemah yang mempelajari residual (gradient negatif) pada setiap iterasi, sehingga prosesnya dapat dipandang sebagai **gradient descent pada ruang fungsi**. **Learning rate** mengatur ukuran langkah, sementara **regularisasi** (penalti leaf dan L2) mencegah over‑fitting. **XGBoost** memperluas kerangka ini dengan menggunakan informasi Hessian (second‑order), teknik histogram‑based split, serta subsampling fitur dan contoh, menjadikannya algoritma yang lebih cepat dan akurat untuk data berskala besar.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation of Gradient Boosting as Functional Gradient Descent
>
> Misalkan ruang fungsi $\mathcal{F}$ berisi semua fungsi yang dapat direpresentasikan oleh pohon keputusan terbatas. Tujuan kita adalah meminimalkan risiko empirik:
>
> $$
>
> R(F) = \frac{1}{n}\sum_{i=1}^{n} L\bigl(y_i, F(x_i)\bigr)
>
> $$
>
> Dengan **functional gradient descent**, pada iterasi ke‑$t$ kita mencari arah penurunan:
>
> $$
>
> g^{(t)} = -\frac{\partial R}{\partial F}\Big|_{F=F^{(t-1)}} = -\frac{1}{n}\sum_{i=1}^{n}\frac{\partial L(y_i, F^{(t-1)}(x_i))}{\partial F^{(t-1)}(x_i)}\delta_{x_i}
>
> $$
>
> Di mana $\delta_{x_i}$ adalah fungsi Dirac pada titik $x_i$. Karena fungsi ini tidak dapat direpresentasikan secara eksplisit, kita **mengaproksimasi** $g^{(t)}$ dengan pohon regresi $h_t$ yang meminimalkan:
>
> $$
>
> \sum_{i=1}^{n} \bigl(g_i^{(t)} - h_t(x_i)\bigr)^2
>
> $$
>
> Setelah memperoleh $h_t$, langkah pembaruan menjadi:
>
> $$
>
> F^{(t)}(x) = F^{(t-1)}(x) + \eta h_t(x)
>
> $$
>
> Bukti konvergensi dapat diturunkan dengan asumsi loss konveks dan $\eta$ cukup kecil, mirip dengan analisis klasik gradient descent. Referensi: Friedman (2001) “Greedy Function Approximation: A Gradient Boosting Machine”.
>
> #### XGBoost Objective Function and Second‑Order Approximation
>
> XGBoost memformalkan objective pada iterasi $t$ sebagai:
>
> $$
>
> \mathcal{L}^{(t)} = \sum_{i=1}^{n} \bigl[ L(y_i, \hat{y}_i^{(t-1)} + f_t(x_i)) \bigr] + \Omega(f_t)
>
> $$
>
> Dengan melakukan **Taylor expansion** orde dua pada loss:
>
> $$
>
> L(y_i, \hat{y}_i^{(t-1)} + f_t(x_i)) \approx L(y_i, \hat{y}_i^{(t-1)}) + g_i^{(t)} f_t(x_i) + \frac{1}{2} h_i^{(t)} f_t(x_i)^2
>
> $$
>
> di mana $g_i^{(t)}$ dan $h_i^{(t)}$ masing‑masing gradient pertama dan Hessian kedua. Substitusi menghasilkan fungsi objektif ku