---

type: Note 
cssclasses:
- cornell-notes

---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] AdaBoost: Perbandingan Freund & Schapire / Kunapuli vs Han & Kamber
> 
> > ## Questions/Cues
> > 
> > - Mengapa contoh yang salah diberi bobot lebih tinggi?
> > - Bagaimana cara menghitung bobot model $\alpha_t$ pada tiap iterasi?
> > - Apa perbedaan rumus $\alpha_t$ antara Kunapuli dan Han & Kamber?
> > - Bagaimana cara kerja inferensi di masing-masing versi?
> > - Apa yang terjadi bila $\varepsilon_t > 0.5$ di kedua versi?
> > 
> > ## Reference Points
> > 
> > - Kunapuli, G. (2023). _Ensemble methods for machine learning_ (Halaman 38–44)
> > - Han, J., Pei, J., & Tong, H. (2022). _Data mining: concepts and techniques_ (Halaman 38–43)
>
> > ### Prinsip Dasar AdaBoost
> > 
> > **AdaBoost (Adaptive Boosting)** adalah metode ensemble **sekuensial** yang menggabungkan sejumlah **weak learner** menjadi satu **strong learner**. Berbeda dengan Bagging dan Random Forest yang melatih model secara paralel, AdaBoost melatih model satu per satu — setiap model berikutnya berfokus pada kesalahan model sebelumnya.
> > 
> > Cara AdaBoost "fokus pada kesalahan" adalah dengan memaintain **distribusi bobot** $D_t(i)$ untuk setiap instance data. Instance yang salah diklasifikasi akan diberi bobot lebih tinggi, sehingga weak learner berikutnya lebih memperhatikannya. Bobot ini selalu memenuhi $\sum_i D_t(i) = 1$ sehingga dapat diperlakukan sebagai probabilitas.
> > 
> > Weak learner yang dipakai biasanya sangat sederhana, misalnya **decision stump** (Decision Tree dengan kedalaman 1). Kesederhanaan ini disengaja — bias tinggi tapi varians rendah — sehingga ketika digabungkan, bias total berkurang tanpa meningkatkan varians secara berlebihan.
> >
> > ### Training: Freund & Schapire / Kunapuli (2023)
> > 
> > 1. Inisialisasi bobot: $D_i^{(1)} = 1/N$ (semua instance sama rata)
> > 2. Untuk setiap iterasi $t$:
> >     - Latih weak learner $h_t$ menggunakan **weighted dataset** $\langle x_i, y_i, D_i \rangle$
> >     - Hitung training error:
> > 
> > $$\varepsilon_t = \sum_{i:, h_t(x_i) \neq y_i} D_i^{(t)}$$
> > 
> > - Hitung bobot model ($\alpha_t$ besar jika error kecil):
> > 
> > $$\alpha_t = \frac{1}{2} \ln\left(\frac{1 - \varepsilon_t}{\varepsilon_t}\right)$$
> > 
> > - Update instance weights:
> > 	- Benar: $D_i^{(t+1)} = D_i^{(t)} / e^{\alpha_t}$ → bobot **turun**
> > 	- Salah: $D_i^{(t+1)} = D_i^{(t)} \cdot e^{\alpha_t}$ → bobot **naik**
> > - Normalisasi bobot: $\sum_i D_i^{(t+1)} = 1$
> > - Jika $\varepsilon_t > 0.5$ → weak learner **dibatalkan**
> >
> > ### Training: Han & Kamber (2022)
> > 
> > 1. Inisialisasi bobot: $w_i = 1/N$
> > 2. Untuk setiap iterasi $t$:
> >     - **Sample** dataset berdasarkan distribusi bobot saat ini (berbeda dari Kunapuli yang langsung pakai weighted dataset)
> >     - Latih weak learner $h_t$ dari sample tersebut
> >     - Hitung error: $\varepsilon_t = \sum_i w_i \cdot \mathbf{1}[h_t(x_i) \neq y_i]$
> >     - Jika $\varepsilon_t > 0.5$ → **reset bobot**, ulangi iterasi (berbeda dari Kunapuli yang langsung batalkan)
> >     - Hitung bobot model ($\alpha_t$ kecil jika model bagus — interpretasi **terbalik**):
> > 
> > $$\alpha_t = \frac{\varepsilon_t}{1 - \varepsilon_t}$$
> > 
> > - Update instance weights:
> > 	- Benar: $w_i \leftarrow w_i \cdot \alpha_t$ → bobot **turun** (karena $\alpha_t < 1$)
> > 	- Salah: bobot **tetap**
> > - Normalisasi bobot
> >
> > ### Inferensi
> > 
> > **Freund & Schapire / Kunapuli:**
> > 
> > $$\hat{y} = \text{sign}\left(\sum_{t=1}^{T} \alpha_t \cdot h_t(x)\right)$$
> > 
> > Setiap weak learner memberikan vote ${-1, +1}$, dikali $\alpha_t$, lalu dijumlahkan. Tanda dari total menentukan kelas akhir. Karena $\alpha_t$ logaritmik terhadap rasio error, model dengan error kecil berkontribusi **dominan**.
> > 
> > **Han & Kamber:**
> > 
> > $$\hat{y} = \arg\max_c \sum_{t:, h_t(x)=c} \ln\frac{1}{\alpha_t}$$
> > 
> > Tiap model vote kelas, dikali $\ln(1/\alpha_t)$. Karena di Han & Kamber $\alpha_t$ kecil = model bagus, maka $\log(1/\alpha_t)$ besar = kontribusi lebih besar. Logika sama, notasi terbalik.
> > 
> > **Contoh praktis (Kunapuli):** Tiga weak learner menghasilkan output $[+1, -1, +1]$ dengan bobot $[\alpha_1=0.8,\ \alpha_2=0.2,\ \alpha_3=0.5]$. Penjumlahan: $0.8(+1) + 0.2(-1) + 0.5(+1) = 1.1 > 0$, sehingga prediksi akhir adalah kelas $+1$.
> >
> > ### Perbandingan Ringkas
> > 
> > ||Freund & Schapire / Kunapuli|Han & Kamber|
> > |---|---|---|
> > |Input model|Weighted dataset langsung|Sample berdasarkan bobot|
> > |Rumus $\alpha_t$|$\frac{1}{2}\ln\frac{1-\varepsilon}{\varepsilon}$|$\frac{\varepsilon}{1-\varepsilon}$|
> > |Interpretasi $\alpha_t$|Besar = model bagus|Kecil = model bagus|
> > |Update bobot|Salah naik, benar turun|Benar turun, salah tetap|
> > |Jika $\varepsilon_t > 0.5$|Weak learner dibatalkan|Reset bobot, ulangi|
> > |Inferensi|$\text{sign}(\sum \alpha_t h_t)$|$\arg\max \sum \ln(1/\alpha_t)$|
> >
> > ### Kelebihan dan Keterbatasan AdaBoost
> >
> > **Kelebihan** utama AdaBoost meliputi:
> >
> > - **Tidak memerlukan penyesuaian parameter** yang rumit; hanya jumlah iterasi dan jenis weak learner yang perlu dipilih.
> > - **Kemampuan adaptif** yang kuat dalam menangani data tidak seimbang, karena contoh‑contoh minoritas yang sering salah akan secara otomatis memperoleh bobot lebih tinggi.
> > - **Teori margin** yang menunjukkan bahwa peningkatan margin (jarak antara contoh yang benar dan keputusan) berhubungan langsung dengan generalisasi yang lebih baik.
> >
> > **Keterbatasan** yang perlu diwaspadai:
> >
> > - **Sensitivitas terhadap noise**: Jika data mengandung banyak label yang salah, bobot pada contoh‑contoh noisy akan terus meningkat, menyebabkan overfitting.
> > - **Kebutuhan weak learner yang sedikit lebih baik dari acak**; bila weak learner tidak dapat mencapai error < 0,5, algoritma akan gagal.
> > - **Kompleksitas komputasi** meningkat seiring jumlah iterasi, terutama bila dataset besar dan weak learner tidak trivial.

> [!cornell] #### Summary
> 
> **AdaBoost** membangun strong learner secara sekuensial dengan memberi **bobot lebih tinggi pada instance yang salah** di setiap iterasi. Versi **Kunapuli/Freund & Schapire** menggunakan weighted dataset langsung dengan $\alpha_t = \frac{1}{2}\ln\frac{1-\varepsilon}{\varepsilon}$ (besar = bagus), sementara **Han & Kamber** melakukan sampling terlebih dahulu dengan $\alpha_t = \frac{\varepsilon}{1-\varepsilon}$ (kecil = bagus). Keduanya mencapai tujuan yang sama — model dengan error kecil berkontribusi lebih besar pada prediksi akhir — hanya dengan jalur dan notasi yang berbeda.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation of Weight Update
>
> Dari perspektif **optimisasi fungsi loss eksponensial**, AdaBoost dapat diturunkan dengan meminimalkan:
>
> $$
>
> L = \sum_{i=1}^{N} \exp\!\bigl(-y_i F_{t-1}(x_i)\bigr)
>
> $$
>
> di mana $F_{t-1}(x)=\sum_{k=1}^{t-1}\alpha_k h_k(x)$ adalah model gabungan hingga iterasi $t-1$. Menambahkan weak learner baru $h_t$ dengan bobot $\alpha_t$ menghasilkan fungsi loss baru:
>
> $$
>
> L' = \sum_{i=1}^{N} \exp\!\bigl(-y_i (F_{t-1}(x_i)+\alpha_t h_t(x_i))\bigr)
>
> $$
>
> Mengoptimalkan $L'$ terhadap $\alpha_t$ dengan menurunkan turunan pertama dan menyamakan dengan nol menghasilkan persamaan:
>
> $$
>
> \alpha_t = \frac{1}{2}\ln\!\left(\frac{1-\varepsilon_t}{\varepsilon_t}\right)
>
> $$
>
> di mana $\varepsilon_t$ adalah error terberat pada distribusi bobot $D_t$. Pembaruan distribusi bobot $D_{t+1}$ muncul secara alami dari normalisasi faktor $Z_t$ yang memastikan bahwa $L'$ diminimalkan pada setiap langkah. Derivasi ini menegaskan bahwa **AdaBoost secara implisit melakukan gradient descent pada loss eksponensial**, meskipun tidak secara eksplisit menyebutkan gradien.
>
> #### Statistik View: AdaBoost sebagai Additive Logistic Regression
>
> Friedman, Hastie, dan Tibshirani (2000) menunjukkan bahwa AdaBoost dapat dipandang sebagai **regresi logistik aditif**. Jika kita mengubah label menjadi $\{0,1\}$ dan mendefinisikan fungsi margin $m_i = y_i F_T(x_i)$, maka probabilitas kelas positif dapat dituliskan sebagai:
>
> $$
>
> P(y_i=1\mid x_i)=\frac{1}{1+\exp(-2m_i)}
>
> $$
>
> Dengan menambahkan weak learner secara bertahap, algoritma memaksimalkan likelihood logistik secara **additive**. Pendekatan ini menjelaskan mengapa margin yang lebih besar (nilai $m_i$ jauh dari nol) berhubungan dengan **generalization error** yang lebih rendah. Margin theory, yang dipelopori oleh Schapire et al., menyatakan bahwa **probabilitas kesalahan pada data tak terlihat** dapat dibatasi oleh distribusi margin pada data pelatihan, memberikan landasan teoretis kuat bagi keefektifan AdaBoost.
>
> #### Generalisasi dan Margin Theory
>
> Salah satu kontribusi paling signifikan dalam literatur AdaBoost adalah **teori margin**.

