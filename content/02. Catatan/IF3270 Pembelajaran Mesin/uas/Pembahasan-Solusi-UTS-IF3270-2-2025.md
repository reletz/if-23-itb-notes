Bagian I Perceptron

1.  Bobot: 20
Diberikan data training yang mengandung 3 atribut masukan x1, x2, x3 dan 1
atribut keluaran y, sebagai berikut:
| x1   | x2    | x3    | y   |     |     |     |     |     |     |     |     |     |     |
| ---- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0    | 0.5   | 1     | -1  |     |     |     |     |     |     |     |     |     |     |
| -1   | -0.5  | -1    | 1   |     |     |     |     |     |     |     |     |     |     |
| 0.5  | 0     | 0.5   | -1  |     |     |     |     |     |     |     |     |     |     |
| -1   | 0     | -0.5  | 1   |     |     |     |     |     |     |     |     |     |     |
| 1    | -0.5  | 0     | -1  |     |     |     |     |     |     |     |     |     |     |

Dengan bobot awal w0 s.d w3 (0, 0, 0, 0), learning rate 0.1, threshold 0.1, max iter 3,
tuliskan proses pembelajaran untuk setiap iterasi untuk Perceptron - Stochastic
Gradient Descent pada tabel di bawah ini. Gunakan 3 angka di belakang koma
(maksimum) untuk penghitungan.

                                         E = E + ((y -o )2)/2
i i
| iter  i  | w   | w   | w   |   w |   Σ  | o   | Δw  |     | Δw   | Δw   | Δw   | E   | Termi |
| -------- | --- | --- | --- | --- | ---- | --- | --- | --- | ---- | ---- | ---- | --- | ----- |
|          | 0   | 1   | 2   | 3   |      | i   |     | 0   | 1    | 2    | 3    |     |       |
nate?
|       |     | w =w | +Δw |     | Linear  |     |       | Δw  | =η(y | -o )x  |       |      |     |
| ----- | --- | ---- | --- | --- | ------- | --- | ----- | --- | ---- | ------ | ----- | ---- | --- |
|       |     | k    | k   | k   |         |     |       | k   | i    | i      | ik    |      |     |
| 1  1  | 0   | 0    | 0   | 0   | 0       | 0   | -0.1  | 0   |      | -0.05  | -0.1  | 0.5  |     |
   2  -0.1  0  -0.05  -0.1  0.025  0.025  0.098  -0.098  -0.049  -0.098  0.975
   3  -0.003  -0.098  -0.099  -0.198  -0.15  -0.15  -0.085  -0.043  0  -0.043  1.337
   4  -0.088  -0.14  -0.099  -0.24  0.173  0.173  0.083  -0.083  0  -0.041  1.679
   5  -0.005  -0.223  -0.099  -0.281  -0.178  -0.178  -0.082  -0.082  0.041  0  2.017  No
|     | -0.087  | -0.305  | -0.058  | -0.281  |     |     |     |     |     |     |     |     |     |
| --- | ------- | ------- | ------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| iter  i  | w   | w   | w   | w   | Σ   | o   | Δw  |     | Δw   | Δw   | Δw   | E   | Termi |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --- | ----- |
|          | 0   | 1   | 2   | 3   |     | i   |     | 0   | 1    | 2    | 3    |     |       |
nate?

2  1  -0.087  -0.305  -0.058  -0.281  -0.397  -0.397  -0.06  0  -0.03  -0.06  0.182
   2  -0.147  -0.305  -0.088  -0.342  0.543  0.543  0.046  -0.046  -0.023  -0.046  0.286
   3  -0.102  -0.351  -0.111  -0.387  -0.471  -0.471  -0.053  -0.026  0  -0.026  0.426
   4  -0.154  -0.377  -0.111  -0.414  0.429  0.429  0.057  -0.057  0  -0.029  0.589
   5  -0.097  -0.434  -0.111  -0.442  -0.476  -0.476  -0.052  -0.052  0.026  0  0.726  Yes
|     -0.158  | -0.487  -0.084  | -0.442    |     |     |       |     |
| ----------- | --------------- | --------- | --- | --- | ----- | --- |

2. Bobot: 10.
Lengkapi algoritma pembelajaran Perceptron dengan Batch Gradient Descent pada
kotak jawaban yang disediakan di bawah ini. Gunakan beberapa variable berikut:
Δw ,w ,E,x ,y ,o ,η(learning rate).Tambahkan variable lain jika diperlukan.
| k k | i i i |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- |
—------------------------------------------------
| 1.  Inisialisasi nilai bobot (w |     | ) {termasuk bias}  |     |     |     |     |
| ------------------------------- | --- | ------------------ | --- | --- | --- | --- |
k
2.  Lakukan iterasi hingga kondisi terminasi terpenuhi:
              Inisialisasi E
|               Inisialisasi Δw |     |     |     |     |     |     |
| ----------------------------- | --- | --- | --- | --- | --- | --- |
k
|               Untuk setiap data (x |     | ,y ):  |     |     |     |     |
| ---------------------------------- | --- | ------ | --- | --- | --- | --- |
i i
← WT.X
|         o                |     |     |     |     |     |     |
| ------------------------ | --- | --- | --- | --- | --- | --- |
|                          | i i |     |     |     |     |     |
|          Untuk  setiap w |     | :   |     |     |     |     |
k
|                           Δw | = Δw | + η(y -o  | )x               |     |     |     |
| ---------------------------- | ---- | --------- | ---------------- | --- | --- | --- |
|                              | k    | k  i      | i ik             |     |     |     |
|          E ← E +  ((y        |      | -o )2)/2  |                  |     |     |     |
i i
|       Untuk  setiap w |     | :   |     |     |     |     |
| --------------------- | --- | --- | --- | --- | --- | --- |
k
|                     w | = w + Δw |               |     |     |     |     |
| --------------------- | -------- | ------------- | --- | --- | --- | --- |
|                       | k  k     | k             |     |     |     |     |
Return (w)

Bagian II FFNN

A. Tentukan pernyataan berikut BENAR atau SALAH, dan tuliskan alasannya.

2: Jawaban benar, alasan benar
1: Jawaban benar, alasan salah
0: Jawaban salah
| No  | Soal (Nilai 2 per soal)  |     |     |     | Jawaban dan Alasan  |     |
| --- | ------------------------ | --- | --- | --- | ------------------- | --- |
1  Fungsi aktivasi pada FFNN adalah fungsi non-linear.  Alternatif 1:

BENAR
Salah satu sifat FFNN adalah fully
connected feed forward, menggunakan
fungsi aktivasi non-linear (Sumber:
Russell & Norvig, 2022)
Alternatif 2:
SALAH, fungsi aktivasi dapat berupa
fungsi linear pada output layer. Namun
pada hidden layer harus berupa fungsi
non-linear.
Catatan: Jawaban alternatif 2 adalah
pengecualian untuk alternatif 1,
sehingga jawaban harus sama persis
untuk mendapatkan nilai 2.
2 Konektivitas antar neuron pada FFNN bersifat lokal. SALAH
Konektivitas pada FFNN bersifat global,
karena fully connected.
3 Nilai total cost pada FFNN dihitung pada fase backward SALAH
propagation. Nilai total cost dihitung pada fase
forward propagation, setelah
menghitung nilai di output layer.
4 FFNN dapat menangkap fitur spasial dari data input. SALAH
Input dari FFNN bersifat linear (flat),
tidak berbentuk matriks dengan dimensi
lebih dari 1, maka tidak dapat
menangkap fitur spasial.
5 Tujuan pelatihan pada FFNN adalah menghilangkan SALAH
error. Tujuan pelatihan FFNN adalah
meminimalkan error.
6 Prinsip pelatihan dengan gradient descent adalah BENAR
strategi pencarian hipotesis dengan menggunakan Sesuai dengan definisi gradient
descent: pencarian hipotesis yang
turunan error.
menghitung turunan error
7 Salah satu kondisi berhenti pada algoritma SALAH
Backpropagation adalah nilai error pada data validasi Kondisi berhenti adalah nilai error pada
data latih lebih kecil daripada threshold.
lebih kecil pada threshold.
B. Essay

Diberikan sebuah vektor input x = [x1, x2, x3] dan target t = [t1, t2, t3]. Pelatihan data
menggunakan FFNN dengan arsitektur sesuai
gambar. Fungsi aktivasi untuk neuron di hidden
dan output layer adalah fungsi Sigmoid. Fungsi
error adalah squared error. Learning rate
adalah 0.5. Penamaan bobot: w , contoh
[tujuan][asal]
w12 artinya bobot ke output 1 dari hidden 2.
Bobot awal: v1 = [-2..0, 2.0, -2.0]T; v2 = [1.0,
1.0, -1.0]T
w1 = [1.0, -3.5]T; ; w2 = [0.5, -1.2]T; w3 = [0.3,
0.6]T
Bobot semua bias adalah 0.5
Jawablah pertanyaan berikut pada tempat yang
disediakan berdasarkan spesifikasi yang
diberikan. Jawaban yang dituliskan di lembar
Bagian I atau Bagian III lain tidak akan dinilai.
Pada soal 2-7, jawaban tidak hanya hasil akhir
berupa angka, tuliskan formulanya dan semua
angka yang terlibat dalam perhitungan. Fungsi
aktivasi tidak dituliskan nama fungsi saja, tapi
lengkap formulanya.
No Pertanyaan Jawaban
1 Tentukan berapa banyak parameter yang perlu Banyak parameter:
dipelajari berdasarkan arsitektur FFNN pada [(3+1) * 2] + [(2+1) * 3] = 8 + 9 = 17
gambar. Tuliskan angka yang terlibat dan tidak
hanya hasil akhir saja.
(Nilai 3)
2 Jika vektor input adalah x = [2.0, 3.0, 1.0]T v20 = 0.5
tentukan nilai output pada hidden neuron H2.
(Nilai 3) net_h2 = v20 + v21.x1 + v22*x2 + v23*x3 = 0.5
+ (1.0)*(2.0) + (1.0)*(3.0) + (-1.0)*(1.0) = 4.5
h2 = 1/ (1+ exp(- net_h2) = 1/ (1+ exp(-4.5) = 0.989
3 Lanjutkan soal 2 dengan menghitung nilai net_h1 = v10 + v11.x1 + v12*x2 + v13*x3 = 0.5
output pada output neuron Y2. (Nilai 3) + (-2.0)*(2.0) + (2.0)*(3.0) + (-2.0)*(1.0) = 0.5
h1 = 1/ (1+ exp(- net_h1) = 1/ (1+ exp(-0.5) = 0.622
net_y2 = w20 + w21*h1 + w22*h2 = 0.5 +
(0.5)*(0.622) + (-1.2)*(0.989) = -0.376

No Pertanyaan Jawaban
y2 = 1/ (1+ exp(- net_y2) = 0.407
4 Jika output Y = [0.088, 0.407, 0.782]T dan target J = ½ * [(t1-y1)^2 + (t2-y2)^2 + (t3-y3)^2] = ½ *
t = [0.58, 0.70, 0.20]T, tentukan nilai total cost. [(0.58-0.088)^2 + (0.70-0.407)^2 + (0.20-0.782)^2] =
(Nilai 3) 0.334
5 Lanjutkan soal 4. 𝛅Y1 = y1*(1 - y1)*(t1 - y1) =
Tentukan nilai error term di setiap neuron pada (0.088)*(1-0.088)*(0.58-0.088) = 0.039
output layer. (Nilai 6)
𝛅Y2 = y2*(1 - y2)*(t2 - y2) =
(0.407)*(1-0.407)*(0.70-0.407) = 0.071
𝛅Y3 = y3*(1 - y3)*(t3 - y3) =
(0.782)*(1-0.782)*(0.20-0.782) = -0.099
Catatan: error term adalah 𝛅, bukan dE/dw
Rumus lengkap sudah ada di slide materi
FFNN.
6 Jika output pada hidden H2 = 0.989 𝛅H2 = h2*(1-h2)*[w12*𝛅Y1 + w22*𝛅Y2 +
tentukan nilai error term di neuron H2 di hidden w32*𝛅Y3 ] = (0.989)*(1-0.989)*[-3.5*0.039 +
layer. (Nilai 3) -1.2*0.071 + 0.6*-0.099] = -0.00307
7 Lakukan update bobot untuk w12 w12 = w12 + 𝜼*dy1*h2 = (-3.5) +
(Nilai 3) (0.5)*(0.039)*(0.989) = -3.48
Bagian III CNN
Suatu model CNN dirancang untuk melakukan klasifikasi biner dengan arsitektur
sebagai berikut:
● L0: input layer berukuran 3*3*1,
● L1: hidden layer konvolusi dengan 2 kernel A dan B berukuran 3*3. Untuk tahap
konvolusi, stride adalah 2, dengan menggunakan padding 1. Tahap detector
dengan ReLU, dan tahap pooling dengan fungsi maksimum dengan kernel
berukuran 2*2, tanpa padding, dan stride 1 sel.
Kernel A (bias 0.5)
-1 0 0
0 0 -1
Kernel B (bias -0.5)
0 -1 0
1 0 0

| 0  1  | 0   |     |     |     |     |
| ----- | --- | --- | --- | --- | --- |
| 0  0  | 1   |     |     |     |     |
●  L2:  hidden  layer  konvolusi  dengan  1  kernel  C  berukuran  2*2.  Untuk  tahap
konvolusi,  stride  adalah  1,  dengan  menggunakan  padding  1.  Tahap  detector
dengan  ReLU,  dan  tahap  pooling  dengan  fungsi  maksimum  dengan  kernel
berukuran 2*2, tanpa padding, dan stride 1 sel.

Kernel C (bias 0.5)

| 1  0  |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- |
| 1  0  |     |     |     |     |     |

| 0  1  |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- |
| 0  1  |     |     |     |     |     |

●  L3: satu neuron sigmoid  σ pada output layer yang diberi nama out, dengan
bobot dari hidden layer L2 ke L3 diberi nama w ,w ,...,w . Bobot w :
|     |     |     | f0_out f1_out | fn_out | fi_out |
| --- | --- | --- | ------------- | ------ | ------ |
bobot dari flatten vector f ke output neuron out.  Nilai w akan bernilai 0.3 jika
|     |     | i   | fn_out  |     |     |
| --- | --- | --- | ------- | --- | --- |
ukuran vektor hasil flatten ganjil dan sebaliknya akan bernilai -0.3 jika genap.
Flatten vector f merupakan hasil flattening feature map dari hasil inferensi layer
L2.

| w   w         |   …  | w              |     |     |     |
| ------------- | ---- | -------------- | --- | --- | --- |
| f0_out f1_out |      | fn_out         |     |     |     |
| -0.3  0.3     | …    | -0.3 atau 0.3  |     |     |     |

1.  (Bobot 5) Tentukanlah ukuran feature map yang dihasilkan dari layer konvolusi
L1 dan L2.
2.  (Bobot  10) Tentukanlah  jumlah bobot  (trainable parameter) pada model CNN
tersebut (shared parameter = True).
3.  (Bobot 15) Lakukanlah forward propagation jika diberikan data input x berikut ini
untuk model CNN yang diberikan secara lengkap.
Data x:
| 1  1  | 1   |     |     |     |     |
| ----- | --- | --- | --- | --- | --- |
| 0  1  | 0   |     |     |     |     |

0 1 0
a. Berikanlah proses perhitungannya secara eksplisit.
b. Berikanlah output di akhir perhitungan setiap layer secara eksplisit.
c. Tuliskanlah secara eksplisit vektor bobot fi_out sesuai ukuran flatten
vector yang dihasilkan.
d. Jika dibutuhkan pembulatan, gunakanlah angka desimal dengan
pembulatan empat angka di belakang koma.
(Bobot 5) Tentukanlah ukuran feature map yang dihasilkan dari layer konvolusi L1 dan
L2.
Jawab:
Tahap konvolusi & detector L1:
W=3; F=3; P=1; S=2 → V=1+(W-F+2P)/S=1+(3-3+2*1)/2=2
Ukuran feature map: 2*2*2
Maxpool L1:
V=1+(W-F+2P)/S=1+(2-2+0)/1=1
Ukuran feature map L1: 1*1*2
Tahap konvolusi & detector L2:
V=1+(W-F+2P)/S=1+(1-2+2*1)/1=2
Ukuran feature map: 2*2*1
Maxpool L2:
V=1+(W-F+2P)/S=1+(2-2+0)/1=1
Ukuran feature map L2: 1*1*1
4. (Bobot 10) Tentukanlah jumlah bobot (trainable parameter) pada model CNN
tersebut (shared parameter = True).
Jawab:
2*(3*3*1+1)+1*(2*2*2+1)+(1+1)*1=32
5. (Bobot 30) Lakukanlah forward propagation jika diberikan data input x berikut ini.
Berikanlah output di akhir perhitungan setiap layer secara eksplisit. Jika
dibutuhkan pembulatan, gunakanlah angka desimal dengan pembulatan empat
angka di belakang koma
Data x:

| 1  1  | 1   |     |
| ----- | --- | --- |
| 0  1  | 0   |     |
| 0  1  | 0   |     |

Jawab:

Data x + padding 1:
| 0  0  | 0  0  | 0   |
| ----- | ----- | --- |
| 0  1  | 1  1  | 0   |
| 0  0  | 1  0  | 0   |
| 0  0  | 1  0  | 0   |
| 0  0  | 0  0  | 0   |

Kernel A (bias 0.5)
| 0  0   | -1  |     |
| ------ | --- | --- |
| 0  -1  | 0   |     |
| -1  0  | 0   |     |

Tahap konvolusi
0+0+0+0+-1+0+0+0+0+0.5= -0.5  0+0+0+0+-1+0+-1+0+0+0.5= -1.5
0+0+-1+0+0+0+0+0+0+0.5= -0.5  0+0+0+0+0+0+0+0+0+0.5= 0.5

Tahap detector (ReLU)
0  0
0  0.5

Tahap maxpooling

0.5

Kernel B (bias -0.5)

|     | 1  0  | 0   |     |
| --- | ----- | --- | --- |
|     | 0  1  | 0   |     |
|     | 0  0  | 1   |     |

Tahap konvolusi
0+0+0+0+1+0+0+0+1-0.5= 1.5  0+0+0+0+1+0+0+0+0-0.5= 0.5
0+0+0+0+0+0+0+0+0-0.5= -0.5  1+0+0+0+0+0+0+0+0-0.5= 0.5

Tahap detector (ReLU)
|     | 1.5  | 0.5  |     |
| --- | ---- | ---- | --- |
|     | 0    | 0.5  |     |

Tahap maxpooling

1.5

  Feature map L1:
|     |     |     |     |
| --- | --- | --- | --- |
0.5

1.5

  Feature map L1 + padding 1:

| 0   | 0   | 0   |     |
| --- | --- | --- | --- |

| 0   | 0.5  | 0   |     |
| --- | ---- | --- | --- |

| 0   | 0   | 0   |     |
| --- | --- | --- | --- |

| 0   | 0   | 0   |     |
| --- | --- | --- | --- |

| 0   | 1.5  | 0   |     |
| --- | ---- | --- | --- |

| 0   | 0   | 0   |     |
| --- | --- | --- | --- |

Kernel C (bias 0.5):

1 0
1 0
0 1
0 1
Tahap konvolusi
0+0+0+0+0+0+0+1.5+0.5= 2 0+0+0.5+0+0+0+0+0+0.5= 1
0+0+0+0+0+1.5+0+0+0.5= 2 0.5+0+0+0+0+0+0+0+0.5= 1
Tahap detector (ReLU)
2 1
2 1
Tahap maxpooling
2
Feature map L2 + flatten:
2
neth1=-0.1+0.1*2=0.1 → h1=σ(0.1)=1/(1+e^-0.1)=0.5250 (0.524979)
neth2=-0.2+0.2*2=0.2 → h2=σ(0.2)=1/(1+e^-0.2)=0.5498 (0.549834)
Bobot L3 ke L4:
w w w
h0out h1out h2out
-0.3 0.3 -0.3
netout=-0.3+0.3*2= 0.3
→ out=σ(0.3)=1/(1+e^-0.3)=0.574
