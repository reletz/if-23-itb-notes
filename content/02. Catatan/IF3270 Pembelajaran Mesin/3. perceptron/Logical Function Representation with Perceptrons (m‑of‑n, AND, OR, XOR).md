---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Logical Function Representation with Perceptrons (m‑of‑n, AND, OR, XOR)
>
> > ## Questions/Cues
> >
> > - Mengapa perceptron dapat mewakili fungsi AND?
> > - Bagaimana cara menentukan bobot untuk fungsi OR?
> > - Apa perbedaan m‑of‑n dengan AND/OR?
> > - Mengapa XOR tidak dapat direpresentasikan oleh satu perceptron?
> > - Langkah‑langkah umum merancang perceptron untuk fungsi logika?
> >
> > ## Reference Points
> >
> > - Lecture_Slides_IF3270 (Halaman 9‑12)
> > - Mitchell, T. *Machine Learning* (1997), Bab 4.4
> > - Medium article “Neural Representation of AND, OR, NOT, XOR and XNOR Logic Gates” (https://medium.com/@stanleydukor/neural-representation-of-and-or-not-xor-and-xnor-logic-gates-perceptron-algorithm-b0275375fea1)
>
> > ### Perceptron sebagai Unit Linear dengan Fungsi Sign
> >
> > Perceptron adalah unit komputasi yang menghitung kombinasi linear dari input‑inputnya, kemudian menerapkan fungsi **sign**: hasilnya +1 bila nilai linear ≥ 0, dan –1 bila nilai tersebut < 0. Kombinasi linear tersebut dituliskan sebagai
> >
> > $$
> >
> > S = w_0 + w_1x_1 + w_2x_2 + \dots + w_nx_n,
> >
> > $$
> >
> > di mana $w_0$ disebut bias (atau offset) dan $w_i$ adalah bobot yang mengukur kontribusi masing‑masing input $x_i$. Karena fungsi sign hanya membedakan dua sisi dari sebuah hiperplan dalam ruang n‑dimensi, perceptron secara alami cocok untuk memisahkan data yang **linearly separable**. Representasi logika dasar (AND, OR, NOT) termasuk dalam kategori ini karena dapat dipisahkan oleh sebuah garis (atau bidang) sederhana.
> >
> > Dalam konteks logika, nilai input biasanya dipilih \{-1, +1\}. Pilihan ini memudahkan perhitungan karena produk $w_i x_i$ menjadi positif bila input dan bobot memiliki “sikap” yang sama, dan negatif bila berlawanan. Dengan menyesuaikan bobot dan bias, kita dapat memindahkan hiperplan sehingga semua kombinasi yang harus menghasilkan +1 berada di satu sisi, sementara kombinasi yang harus menghasilkan –1 berada di sisi lain.
> >
> > ### Fungsi m‑of‑n dan Hubungannya dengan AND/OR
> >
> > Sebuah fungsi **m‑of‑n** menghasilkan +1 bila **setidaknya** $m$ dari $n$ input bernilai +1; bila kurang dari $m$ input yang bernilai +1, outputnya –1. Dua kasus khusus yang paling dikenal adalah:
> >
> > - **AND**: $m = n$. Semua input harus +1 agar output +1.
> > - **OR**: $m = 1$. Cukup satu input +1 untuk menghasilkan output +1.
> >
> > Karena fungsi m‑of‑n hanya menilai jumlah input yang aktif, kita dapat mengatur semua bobot menjadi nilai yang sama (misalnya 0.5) dan memilih bias yang tepat untuk memisahkan dua kelas. Secara umum, dengan bobot $w_i = \alpha > 0$ untuk semua $i$ dan bias $w_0 = -\alpha \cdot (m - 0.5)$, hiperplan berada tepat di antara titik‑titik yang memiliki tepat $m$ input +1 dan yang memiliki $m-1$ input +1.
> >
> > Contoh numerik: untuk fungsi **AND** dengan dua input ($n=2, m=2$), pilih $\alpha = 0.5$ sehingga bobot $w_1 = w_2 = 0.5$. Maka bias
> >
> > $$
> >
> > w_0 = -\alpha\,(m-0.5) = -0.5\,(2-0.5) = -0.75.
> >
> > $$
> >
> > Namun dalam slide yang diberikan dipilih bias $-0.8$ (nilai sedikit lebih kecil) untuk mengakomodasi toleransi numerik; kombinasi $(w_0, w_1, w_2)=(-0.8, 0.5, 0.5)$ menghasilkan tabel kebenaran AND yang tepat.
> >
> > Untuk **OR** dengan dua input ($m=1$), gunakan bobot yang sama $\alpha = 0.5$ dan bias
> >
> > $$
> >
> > w_0 = -\alpha\,(1-0.5) = -0.25.
> >
> > $$
> >
> > Agar lebih jelas, banyak sumber (mis. Mitchell 1997) menyarankan bobot dua kali lebih besar, misalnya $w_1 = w_2 = 2$ dan bias $-1$; fungsi sign kemudian menjadi $\text{sign}(2x_1 + 2x_2 - 1)$, yang secara intuitif menekankan bahwa satu input +1 sudah cukup untuk melewati ambang 0.
> >
> > ### Contoh Perhitungan untuk AND dan OR
> >
> > **AND** dengan bobot $(-0.8, 0.5, 0.5)$:
> >
> > - Input (1, 1): $S = -0.8 + 0.5·1 + 0.5·1 = 0.2 \ge 0 \Rightarrow +1$.
> > - Input (1, –1): $S = -0.8 + 0.5·1 - 0.5·1 = -0.8 < 0 \Rightarrow –1$.
> > - Input (–1, 1): $S = -0.8 - 0.5·1 + 0.5·1 = -0.8 < 0 \Rightarrow –1$.
> > - Input (–1, –1): $S = -0.8 - 0.5·1 - 0.5·1 = -1.8 < 0 \Rightarrow –1$.
> >
> > Semua kombinasi cocok dengan tabel kebenaran AND.
> >
> > **OR** dengan bobot $(-0.25, 0.5, 0.5)$:
> >
> > - Input (1, –1): $S = -0.25 + 0.5·1 - 0.5·1 = -0.25 < 0 \Rightarrow –1$ (hanya satu input +1 tidak cukup).
> > - Input (1, 1): $S = -0.25 + 0.5·1 + 0.5·1 = 0.75 \ge 0 \Rightarrow +1$.
> > - Input (–1, 1): $S = -0.25 - 0.5·1 + 0.5·1 = -0.25 < 0 \Rightarrow –1$.
> > - Input (1, 0) atau (0, 1) (jika nilai 0 diperlakukan sebagai –1) menghasilkan nilai di atas atau di bawah ambang sesuai kebutuhan.
> >
> > Dengan menyesuaikan bias sedikit (mis. $-0.1$), semua kombinasi yang memiliki setidaknya satu +1 akan menghasilkan +1, sehingga fungsi OR tercapai.
> >
> > ### Mengapa XOR Tidak Dapat Direpresentasikan oleh Satu Perceptron
> >
> > Fungsi **XOR** (exclusive‑OR) menghasilkan +1 bila tepat satu dari dua input bernilai +1, dan –1 bila kedua input sama (baik keduanya +1 atau keduanya –1). Jika kita plot keempat kombinasi pada bidang dua‑dimensi, titik‑titik yang harus menghasilkan +1 berada pada posisi (1, –1) dan (–1, 1), sedangkan titik yang harus menghasilkan –1 berada pada (1, 1) dan (–1, –1). Tidak ada satu garis lurus (hiperplan dalam 2‑dimensi) yang dapat memisahkan kedua kelompok ini secara simultan. Dengan kata lain, data XOR **tidak linearly separable**.
> >
> > Karena perceptron hanya dapat membentuk satu hiperplan, ia tidak memiliki kapasitas untuk memisahkan pola XOR. Untuk mengatasi hal ini diperlukan **struktur berlapis** (misalnya jaringan saraf dengan satu lapisan tersembunyi) yang dapat membentuk kombinasi non‑linear dari fitur‑fitur input. Pada tingkat teoritis, menambahkan satu neuron tambahan yang menghitung fungsi AND dan OR, lalu menggabungkannya dengan bobot yang tepat, dapat menghasilkan perilaku XOR—tetapi ini sudah melampaui kemampuan satu perceptron tunggal.
> >
> > ### Prosedur Umum Merancang Perceptron untuk Fungsi Logika m‑of‑n
> >
> > 1. **Tentukan nilai n dan m**. Misalnya, untuk fungsi “setidaknya tiga dari lima input bernilai +1”, maka $n=5, m=3$.
> > 2. **Pilih bobot seragam** $\alpha > 0$ untuk semua input. Nilai $\alpha$ dapat dipilih kecil (mis. 0.5) untuk menghindari overflow numerik.
> > 3. **Hitung bias** menggunakan rumus umum
> >
> > $$
> >
> > w_0 = -\alpha\,(m - 0.5).
> >
> > $$
> >
> > Penambahan 0.5 memastikan hiperplan berada tepat di antara titik dengan tepat $m$ input +1 dan titik dengan $m-1$ input +1.
> >
> > 4. **Verifikasi dengan tabel kebenaran**: Evaluasi semua $2^n$ kombinasi input, hitung nilai linear $S$, dan pastikan fungsi sign menghasilkan output yang diinginkan. Jika ada kesalahan, sesuaikan $\alpha$ atau tambahkan offset kecil pada bias.
> > 5. **Implementasi praktis**: Pada bahasa pemrograman, cukup definisikan vektor bobot dan bias, lalu gunakan fungsi sign (atau `np.sign` dalam Python) untuk menghasilkan output.
> >
> > Dengan prosedur ini, hampir semua fungsi logika yang bersifat **m‑of‑n** dapat direpresentasikan secara tepat oleh satu perceptron, selama fungsi tersebut linearly separable—yang memang selalu terjadi untuk m‑of‑n karena keputusan hanya bergantung pada jumlah input yang aktif.

> [!cornell] ### Ringkasan
> 
>  **Perceptron** menggunakan kombinasi linear dan fungsi sign untuk memisahkan dua kelas dalam ruang fitur. Dengan menyiapkan bobot seragam dan bias yang dihitung dari parameter $m$ pada fungsi **m‑of‑n**, kita dapat merepresentasikan logika **AND** ($m=n$) dan **OR** ($m=1$) secara tepat. **XOR** tidak dapat direpresentasikan karena tidak linearly separable; solusi memerlukan jaringan berlapis. Prosedur umum merancang perceptron meliputi penentuan $n,m$, pemilihan bobot $\alpha$, perhitungan bias $w_0$, dan verifikasi tabel kebenaran.

> [!ad-libitum]- Additional Information
>
> #### Formal Proof of Linear Separability for m‑of‑n
>
> Untuk fungsi m‑of‑n dengan bobot seragam $\alpha>0$ dan bias $w_0 = -\alpha(m-0.5)$, nilai linear pada suatu input $\mathbf{x}\in\{-1,+1\}^n$ adalah
>
> $$
>
> S(\mathbf{x}) = \alpha\Big(\sum_{i=1}^{n} x_i - (2m-1)\Big).
>
> $$
>
> Karena setiap $x_i$ bernilai $\pm1$, jumlah $\sum x_i$ dapat mengambil nilai ganjil antara $-n$ dan $+n$. Jika tepat $k$ input bernilai +1, maka $\sum x_i = 2k-n$. Substitusi memberi
>
> $$
>
> S = \alpha\big(2k-n-(2m-1)\big)=2\alpha(k-m)+\alpha.
>
> $$
>
> - Bila $k\ge m$ (output harus +1), maka $k-m\ge0$ sehingga $S\ge\alpha>0$.
> - Bila $k<m$ (output harus –1), maka $k-m\le-1$ sehingga $S\le -\alpha<0$.
>
> Karena tanda $S$ berubah tepat pada batas $k=m$, hiperplan $S=0$ memisahkan kedua kelas secara sempurna. Bukti ini menegaskan bahwa semua fungsi m‑of‑n bersifat linearly separable.
>
> #### Bobot Skala dan Manipulasi Bias
>
> Nilai $\alpha$ dapat diskalakan tanpa mengubah keputusan akhir, asalkan bias juga diskalakan secara proporsional. Misalnya, menggandakan semua bobot dan bias ( $\alpha' = 2\alpha, w_0' = 2w_0$ ) menghasilkan nilai linear yang dua kali lebih besar, tetapi tanda tetap sama. Skala ini berguna ketika implementasi perangkat keras memiliki batasan rentang nilai (mis. 8‑bit integer). Namun, skala yang terlalu besar dapat menyebabkan overflow numerik pada perangkat lunak, sehingga pemilihan $\alpha$ biasanya berada di rentang $[0.1, 1]$.
>
> #### Mengatasi XOR dengan Jaringan Berlapis
>
> Karena XOR tidak linearly separable, satu perceptron tidak cukup. Solusi klasik adalah menambahkan **lapisan tersembunyi** dengan dua neuron:
>
> 1. Neuron pertama menghitung $h_1 = \text{sign}(x_1 + x_2)$ (fungsi OR).
> 2. Neuron kedua menghitung $h_2 = \text{sign}(x_1 - x_2)$ (fungsi AND dengan satu input negatif).
>
> Output akhir kemudian dihitung sebagai $\text{sign}(h_1 - h_2)$. Kombinasi ini menghasilkan tabel kebenaran XOR yang tepat. Pendekatan ini memperkenalkan **non‑linearitas** melalui aktivasi lapisan tersembunyi, memperluas kapasitas representasi jaringan.
>
> #### Edge Cases dan Nuansa Praktis
>
> - **Input nilai nol**: Pada beberapa dataset, nilai 0 dipetakan ke –1 untuk menjaga konsistensi dua‑kelas.