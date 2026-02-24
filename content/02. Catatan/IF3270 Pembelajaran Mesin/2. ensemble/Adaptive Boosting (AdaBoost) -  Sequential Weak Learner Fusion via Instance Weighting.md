---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Adaptive Boosting (AdaBoost): Sequential Weak Learner Fusion via Instance Weighting
>
> > ## Questions/Cues
> >
> > - Mengapa contoh yang salah diberi bobot lebih tinggi?
> > - Bagaimana cara menghitung bobot model pada tiap iterasi?
> > - Apa peran distribusi bobot D pada data pelatihan?
> > - Bagaimana cara menggabungkan prediksi weak learner menjadi keputusan akhir?
> > - Apa yang terjadi bila sebuah weak learner memiliki error > 0,5?
> >
> > ## Reference Points
> >
> > - Kunapuli, G. (2023). *Ensemble methods for machine learning* (Halaman 38‑44)
> > - Han, J., Pei, J., & Tong, H. (2022). *Data mining: concepts and techniques* (Halaman 38‑43)
>
> > ### Prinsip Dasar AdaBoost
> >
> > Adaptive Boosting, atau yang lebih dikenal dengan **AdaBoost**, merupakan metode ensemble **sekuensial** yang menggabungkan sejumlah **weak learner** (pembelajar lemah) menjadi satu **strong learner** (pembelajar kuat). 
> > 
> > Ide utama AdaBoost adalah memperbaiki kesalahan yang dibuat oleh model sebelumnya dengan memberi **prioritas** lebih tinggi pada contoh‑contoh yang sebelumnya salah diklasifikasikan. Pada setiap iterasi, algoritma melatih weak learner baru pada **dataset berbobot**, di mana bobot‑bobot ini mencerminkan pentingnya masing‑masing contoh dalam proses pelatihan. 
> > 
> > Karena setiap weak learner biasanya hanya sedikit lebih baik daripada tebak‑tebakan acak (misalnya decision stump dengan kedalaman satu), kombinasi linier berbobot dari banyak weak learner dapat menghasilkan akurasi yang sangat tinggi.
> >
> > Konsep “adaptif” pada nama AdaBoost merujuk pada kemampuan algoritma untuk **menyesuaikan** distribusi bobot secara dinamis selama proses pelatihan. Pada iterasi pertama, semua contoh diberikan bobot yang sama, menandakan bahwa tidak ada pengetahuan awal tentang contoh mana yang sulit. Setelah weak learner pertama dievaluasi, contoh‑contoh yang salah diklasifikasikan akan **ditingkatkan bobotnya**, sementara contoh yang benar akan **dikurangi bobotnya**. Dengan cara ini, weak learner berikutnya “dipaksa” untuk fokus pada area‑area data yang masih belum terpecahkan, sehingga secara bertahap memperbaiki performa keseluruhan.
> >
> > Secara matematis, AdaBoost dapat dipandang sebagai **optimisasi fungsi loss eksponensial**. Setiap weak learner berkontribusi pada fungsi keputusan akhir dengan bobot yang bergantung pada tingkat kesalahan (error) pada iterasi tersebut. Proses ini menghasilkan model akhir yang dapat dituliskan sebagai kombinasi linear berbobot:
> >
> > $$
> >
> > H(x)=\operatorname{sign}\Bigl(\sum_{t=1}^{T}\alpha_t\,h_t(x)\Bigr)
> >
> > $$
> >
> > di mana $h_t$ adalah weak learner ke‑$t$ dan $\alpha_t$ adalah bobotnya. Kombinasi ini memastikan bahwa weak learner yang lebih akurat memperoleh **pengaruh yang lebih besar** pada keputusan akhir.
> >
> > ### Proses Pembobotan Instance
> >
> > Pada setiap iterasi $t$, algoritma memelihara sebuah **distribusi bobot** $D_t(i)$ untuk setiap contoh pelatihan $(x_i, y_i)$. Distribusi ini selalu memenuhi $\sum_i D_t(i)=1$ sehingga dapat diperlakukan sebagai probabilitas. Langkah‑langkah utama pada iterasi $t$ adalah:
> >
> > 1. **Pelatihan weak learner** $h_t$ menggunakan data yang dibobotkan oleh $D_t$. Pada praktiknya, banyak implementasi mengubah dataset menjadi “re‑sampled” sesuai probabilitas $D_t$, tetapi secara konseptual yang penting adalah bahwa contoh dengan bobot tinggi lebih mungkin dipilih.
> > 2. **Menghitung error** $\varepsilon_t$ dari $h_t$ pada data berbobor:
> >
> > $$
> >
> > \varepsilon_t = \sum_{i=1}^{N} D_t(i)\,\mathbf{1}\bigl(h_t(x_i)\neq y_i\bigr)
> >
> > $$
> >
> > di mana $\mathbf{1}(\cdot)$ adalah fungsi indikator.
> >
> > 1. **Menentukan bobot model** $\alpha_t$ dengan rumus:
> >
> > $$
> >
> > \alpha_t = \frac{1}{2}\ln\!\left(\frac{1-\varepsilon_t}{\varepsilon_t}\right)
> >
> > $$
> >
> > Nilai $\alpha_t$ meningkat bila $\varepsilon_t$ kecil (model akurat) dan menurun bila $\varepsilon_t$ mendekati 0,5. Jika $\varepsilon_t > 0,5$, algoritma biasanya **membatalkan** weak learner tersebut karena performanya lebih buruk daripada tebak‑tebakan acak.
> >
> > 2. **Memperbarui bobot contoh** untuk iterasi berikutnya:
> >
> > $$
> >
> > D_{t+1}(i)=\frac{D_t(i)\,\exp\!\bigl(-\alpha_t y_i h_t(x_i)\bigr)}{Z_t}
> >
> > $$
> >
> > di mana $Z_t$ adalah faktor normalisasi agar $\sum_i D_{t+1}(i)=1$. Jika contoh diklasifikasikan dengan benar ($y_i = h_t(x_i)$), eksponensial menjadi $\exp(-\alpha_t)$ (menurunkan bobot). Jika salah, eksponensial menjadi $\exp(\alpha_t)$ (meningkatkan bobot). Proses ini secara intuitif “menyiksa” contoh‑contoh yang masih salah, memaksa weak learner selanjutnya untuk memperhatikannya.
> >
> > Contoh numerik sederhana dapat membantu memperjelas mekanisme ini. Misalkan terdapat tiga contoh dengan bobot awal $D_1 = (1/3, 1/3, 1/3)$. Weak learner pertama mengklasifikasikan contoh ke‑2 dengan salah, menghasilkan $\varepsilon_1 = 1/3$. Maka $\alpha_1 = \frac{1}{2}\ln\!\bigl(\frac{2/3}{1/3}\bigr)=0.3466$. Bobot contoh ke‑2 akan dikalikan dengan $\exp(\alpha_1)\approx1.41$ sementara dua contoh lainnya dikalikan dengan $\exp(-\alpha_1)\approx0.71$. Setelah normalisasi, contoh ke‑2 memperoleh bobot yang lebih besar pada iterasi berikutnya, memaksa weak learner kedua untuk memperbaikinya.
> >
> > ### Kombinasi Model dan Penentuan Bobot
> >
> > Setelah seluruh iterasi selesai (biasanya ditentukan oleh jumlah maksimum weak learner atau oleh kriteria konvergensi), model akhir **menggabungkan** semua weak learner dengan bobot $\alpha_t$ yang telah dihitung. Kombinasi ini bersifat **linear** pada output prediksi (biasanya $\{-1,+1\}$ untuk klasifikasi biner). Pada fase inferensi, setiap weak learner memberikan “suara” yang dikalikan dengan $\alpha_t$; suara‑suara ini dijumlahkan, dan tanda total menentukan kelas prediksi.
> >
> > Secara visual, proses ini dapat dibayangkan seperti **pemungutan suara berimbang**: setiap anggota dewan (weak learner) memiliki kekuatan suara yang proporsional dengan rekam jejak keberhasilannya (nilai $\alpha_t$). Anggota yang sering salah (error tinggi) memiliki suara lemah, sementara anggota yang konsisten benar memiliki suara kuat. Keputusan akhir mencerminkan mayoritas suara berbobot, bukan sekadar mayoritas sederhana.
> >
> > Penting untuk dicatat bahwa **weak learner** yang dipilih biasanya sangat sederhana (misalnya decision stump). Kesederhanaan ini memastikan bahwa setiap learner memiliki **bias tinggi** tetapi **varians rendah**, sehingga ketika digabungkan, bias total dapat berkurang secara signifikan tanpa meningkatkan varians secara berlebihan. Inilah mengapa AdaBoost dapat menghasilkan model yang kuat meskipun setiap komponennya lemah.
> >
> > ### Inferensi dan Prediksi Akhir
> >
> > Pada saat melakukan prediksi pada data baru $x$, langkahnya sangat langsung:
> >
> > 1. **Evaluasi setiap weak learner** $h_t(x)$ untuk memperoleh nilai $\{-1,+1\}$.
> > 2. **Kalikan** setiap output dengan bobot $\alpha_t$ yang telah dipelajari.
> > 3. **Jumlahkan** semua nilai berbobot: $S(x)=\sum_{t=1}^{T}\alpha_t h_t(x)$.
> > 4. **Ambil tanda** dari hasil penjumlahan: $\hat{y}= \operatorname{sign}(S(x))$. Jika $S(x)>0$ maka kelas +1, sebaliknya –1.
> >
> > Karena $\alpha_t$ bersifat logaritmik terhadap rasio kesalahan, weak learner yang sangat akurat (error kecil) akan memberikan kontribusi yang **dominant** pada nilai akhir. Sebaliknya, weak learner yang hampir acak (error mendekati 0,5) akan memiliki $\alpha_t$ mendekati nol, sehingga hampir tidak memengaruhi keputusan akhir.
> >
> > **Contoh praktis**: Misalkan tiga weak learner menghasilkan output $[+1, -1, +1]$ dengan bobot $[\alpha_1=0.8, \alpha_2=0.2, \alpha_3=0.5]$. Penjumlahan berbobot menjadi $0.8(+1)+0.2(-1)+0.5(+1)=1.1$. Karena hasilnya positif, prediksi akhir adalah kelas +1. Jika bobot weak learner kedua lebih besar (misalnya $\alpha_2=1.0$), maka total dapat menjadi negatif, mengubah keputusan akhir.
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
> >
> > Memahami trade‑off ini penting bagi mahasiswa yang ingin mengaplikasikan AdaBoost pada masalah nyata, seperti deteksi penipuan, klasifikasi teks, atau diagnosis medis.

> [!cornell] #### Summary
>
> **AdaBoost** membangun model kuat dengan melatih serangkaian weak learner secara berurutan, memberi **bobot lebih tinggi pada contoh yang salah** pada setiap iterasi. Bobot model $\alpha_t$ dihitung dari error $\varepsilon_t$ dan menentukan **pengaruh suara** masing‑masing learner pada keputusan akhir. Proses adaptif ini menghasilkan **kombinasi linear berbobot** yang dapat mengatasi data tidak seimbang, namun tetap rentan terhadap **noise** dan memerlukan weak learner yang setidaknya lebih baik daripada tebak‑tebakan acak.

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