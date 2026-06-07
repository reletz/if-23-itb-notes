NIM     : _____________________________________

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------
Soal Kuis 2 digunakan untuk mengukur CPMK 2. Menjelaskan dan mengimplementasikan algoritma
backpropagation untuk FFNN dan forward propagation untuk CNN dan RNN

KELAS: _____________________________________

NAMA : _____________________________________

Bagian I CNN & Encoder-Decoder
Bobot: 40

Suatu model “one-to-many” memiliki encoder CNN dan decoder RNN. Encoder CNN menerima
input data berukuran 3*3*2 dan memiliki 2 layer konvolusi yaitu:
●  L1:  hidden  layer  konvolusi  dengan  1  kernel  A  berukuran  2*2  dan  nilai  bias  -1.  Untuk  tahap
konvolusi,  stride  1  sel,  tanpa  padding.  Tahap  detector  dengan  ReLU,  dan  tahap  pooling
dengan  fungsi  maksimum  dengan  kernel  berukuran  2*2,  tanpa  padding,  dan  stride  1  sel.
Kernel A:

0

-1

1

0

-1

0

0

1

●  L2:  hidden  layer  konvolusi  dengan  2  kernel  berukuran  2*2.  Untuk  tahap  konvolusi,  stride
adalah 1, dengan menggunakan padding 1. Tahap detector dengan ReLU, dan tahap pooling
dengan fungsi maksimum dengan kernel berukuran 2*2, tanpa padding, dan stride 1 sel.
Kernel B (bias -0.5):

Kernel C (bias 0.5):

1

0

0

0

0

1

1

0

Decoder RNN memiliki satu layer RNN 2 neuron dan satu output layer 10 neuron. Input decoder
berupa  vektor  dari  start-token  (nol  vektor)  atau  output  token dari timestep sebelumnya. Decoder
maksimum 10 timestep.

Diberikan data input x berikut ini:

1

0

0

0

1

1

1

1

0

0

1

0

0

0

1

Halaman 1 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

1

0

1

a.  (Nilai  2)  Untuk  receptive  pertama,  berikanlah  detail  perhitungan  proses  konvolusi

yang terjadi pada L1.

b.  (Nilai  15)  Lanjutkanlah  proses  forward  propagation  bagian  encoder  CNN  tersebut.
Berikanlah  output  di akhir perhitungan setiap layer secara eksplisit. Jika dibutuhkan
pembulatan, gunakanlah angka desimal dengan pembulatan tiga angka di belakang
koma.

c.  (Nilai  5)  Gambarkanlah  arsitektur  one-to-many  tersebut  dalam  unfolded  network.
Catatan:  hidden
layer  encoder  digambarkan  dalam  sebuah  kotak  dengan
menuliskan  ukuran  feature  map,  hidden  layer  decoder  digambarkan  dalam sebuah
kotak dengan menuliskan banyaknya neuron.

d.  (Nilai  3)  Lengkapi  gambar arsitektur (jawaban c) dengan informasi kernel A, B, dan

C; Wxh, Whh, Why.

e.  (Nilai 5) Hitunglah jumlah parameter model one-to-many tersebut.
f.

(Nilai 10) Jika hasil c=flatten feature map dari encoder CNN untuk input x, berikanlah
formula untuk mendapatkan sequence y(1)y(2)y(3) dengan y(3) menyatakan end-token.

Jawab:

a.  0+-1+0+0+0+0+0+0-1=-2
b.  Data x, tanpa padding:

1

0

0

1

1

1

1

0

0

Kernel A (bias -1)

0

-1

-1

0

Tahap konvolusi

0

1

1

0

0

0

0

1

1

1

0

0

1

0+-1+0+0+0+0+0+0-1=-2

0+-1-1+0+0+0+0+1-1=-2

0+-1+0+0+1+0+0+0-1=-1

0+0-1+0+0+0+0+1-1= -1

Tahap detector (ReLU)

0

0

0

0

Tahap maxpooling

0

Halaman 2 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

Padding feature map L1:

0

0

0

0

0

0

0

0

0

Kernel B (bias -0.5):

1

0

0

0

Tahap konvolusi

0+0+0+0-0.5=-0.5

0+0+0+0-0.5=-0.5

0+0+0+0-0.5=-0.5

0+0+0+0-0.5=-0.5

Tahap detector (ReLU)

0

0

0

0

Tahap maxpooling

Kernel C (bias 0.5):

0

0

1

1

0

Tahap konvolusi

0+0+0+0+0.5=0.5

0+0+0+0+0.5=0.5

0+0+0+0+0.5=0.5

0+0+0+0+0.5=0.5

Tahap detector (ReLU)

0.5

0.5

0.5

0.5

Tahap maxpooling

0.5

Feature map L2:

0

0.5

c.

d.

Halaman 3 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

e. # parameter encoder L1 & L2 = 1(2*2*2+1)+2(2*2*1+1) =9+10=19
#parameter decoder = (10+2+1)2+(2+1)10=26+30=56
Total parameter = 19+56=75

F. h(t) = fh(Wxh.x+Whhh(t-1)+bxh)
h(1) = fh(Wxh.x(1)+Whhc+bxh). Karena x(1)=[0,...,0] → h(1) = fh(Whhc+bxh)
y(1) = fy(Why.h(1)+bhy)
h(2) = fh(Wxh.x(2)+Whhh(1)+bxh). Karena x(2)=y(1) → h(2) = fh(Wxh.y(1)+Whhh(1)+bxh)
y(2) = fy(Why.h(2)+bhy)
h(3) = fh(Wxh.x(3)+Whhh(2)+bxh). Karena x(3)=y(2) → h(3) = fh(Wxh.y(2)+Whhh(2)+bxh)
y(3) = fy(Why.h(3)+bhy)

Halaman 4 dari 8

NIM     : _____________________________________

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------
Bagian II RNN
Bobot: 30

KELAS: _____________________________________

NAMA : _____________________________________

Diberikan  model  hasil  pembelajaran  Recurrent  Neural  Network  many-to-many  yang  menerima
nilai  dari  2  atribut,  1  hidden  layer  dengan  3  neuron,  dan  2  neuron  output  yang  memiliki  bobot
sebagai  berikut.  Matriks  bobot  w_xh  menyatakan  bobot  dari  input  layer  ke  hidden  layer,  w_hh
bobot  dari hidden layer ke hidden layer, dan w_hy menyatakan bobot dari hidden layer ke output
layer.  b_xh  menyatakan  bobot  bias  yang  diasumsikan  sama untuk semua hidden neuron, begitu
juga b_hy untuk semua output neuron. Baris pada matriks menyatakan bobot menuju neuron yang
sama.

(i) pasangan input-output

Input

Output

0.4

0.2

[1 0]

0.7

0.8

[0 1]

0.1

0.5

[1 0]

(ii) setiap baris bobot dari
input ke hidden layer
adalah [0.1 0.2]

(iii) setiap baris bobot bias
dari input ke hidden layer
adalah [0.1]
(iv) setiap baris bobot dari
hidden neuron timestep t-1
ke timestep t adalah [0.2
0.3 0.2]
(v) setiap baris bobot dari
hidden layer ke output layer
adalah [0.3 0.2 0.1]
(vi) setiap baris bobot bias
dari hidden layer ke output
layer adalah [0.3]

(vii) Terdapat 2 timesteps
dan diawali dengan t=1.
(viii) Tabel nilai h0 :

0

0

0

(ix) Fungsi aktivasi di
hidden layer adalah tanh
(x) Fungsi aktivasi di output
layer adalah softmax

No  Pertanyaan

Jawaban

1  Gambarkan arsitektur

unfolded network lengkap
dengan bias.  Catatan:
hidden layer boleh
digambarkan dalam sebuah
kotak (sel) namun jelas
dituliskan banyaknya
neuron, input boleh
dituliskan dalam vektor
namun jelas dituliskan
banyaknya fitur. (Nilai 5)

2

Isi matriks w_xh
(Nilai 1)

Halaman 5 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

3

4

5

6

7

8

9

Isi matriks b_xh
(Nilai 1)

Isi matriks w_hh
(Nilai 1)

Isi matriks w_hy
(Nilai 1)

Isi matriks b_hy
(Nilai 1)

Forward propagation, nilai
neuron pertama di hidden
layer untuk t=1
(Nilai 6)

h1(1) = 0.178

h1(2) = 0.426

Forward propagation, nilai
neuron pertama di hidden
layer untuk t=2
(Nilai 6)

Forward propagation, nilai
output layer untuk t=1
Termasuk kelas hasil
prediksinya.
(Nilai 8)

Menggunakan asumsi: jika hasil kelas seimbang,
dipilih kelas pertama.

Prediksi kelas: [1 0]

Halaman 6 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

Bagian III LSTM
Bobot: 30

1.  (Nilai 20) Diketahui LSTM dengan informasi bobot

sebagai berikut:
Wxf = [0.7, 0.5]
Wxi = [0.9, 0.8]
Wxc = [0.4, 0.2]
Wxo = [0.6, 0.4]

Whf = [0.1]
Whi = [0.6]
Whc = [0.1]
Who = [0.2]

Dengan bias: bf = 0.15; bi = 0.4; bc = 0.1; bo = 0.2

Tuliskan rumus, lengkapi dan gunakan rumus untuk melakukan perhitungan Ct dan ht dengan t=1
dimana x1 = [1, 2] yang didalamnya perlu dilakukan penulisan isi rumus dan penghitungan nilai f1,
i1, Ĉ1, o1 terlebih dahulu.

Jawaban:
f1 =  σ(Wxfx(t)+Whfh(t-1)+bf) = σ(Wxfx1+Whfh0+bf) = σ([0.7,0.5][   ]+[0.1][0]+[0.15]) = σ(1.7+0+0.15) =
σ(1.85) = 0.864

i1 = σ(Wxix(t)+Whih(t-1)+bi) = σ(Wxix1+Whih0+bi) = σ([0.9,0.8][   ]+[0.6][0]+[0.4])=σ(2.5+0+0.4) = σ(2.9)=
0.9478

Ĉ1 = tanh(Wxcx(t)+Whch(t-1)+bc) = tanh(Wxcx1+Whch0+bc) = tanh([0.4, 0.2][  ]+[0.1][0]+[0.1]) =
tanh(0.8+0+0.1) = tanh(0.9)=0.7163

o1 = σ(Wxox(t)+Whoh(t-1)+bo) = σ(Wxox1+Whoh0+bo) = σ([0.6,0.4][   ]+[0.2][0]+[0.2])= σ(1.4+0+0.2)=
σ(1.6)=0.832

C1 = (C(t-1)๏ft)⊕(it๏Ĉt) = (C0๏f1)⊕(i1๏Ĉ1) = ([0]๏[0.864])⊕([0.9478]๏[0.7163]) =[0]⊕[0.6789] =[0.6789]

h1 = ot ๏ tanh(C(t)) = o1 ๏ tanh(C1) = [0.832] ๏ tanh([0.6789])=[0.832]๏[0.5908]=[0.4915]

2.  (Nilai 6) Jelaskan definisi berbagai simbol pada penghitungan LSTM di nomor (1) di atas:

Jawaban:
ft =  forget gate, menentukan informasi pada cell state sebelumnya Ct-1 yang perlu dipertahankan
atau dibuang. Nilai gate berada pada rentang 0–1, di mana 0 berarti informasi dibuang dan 1
berarti dipertahankan sepenuhnya.

Halaman 7 dari 8

Kuis 1 IF3270 Pembelajaran Mesin
Semester II 2025-2026
Sifat: Individu, Tutup Buku & Buka Catatan (1 Lb A4 tulis tangan)
Tanggal: 12 Maret 2026
Waktu: 09.00 - 10.40 WIB (100 menit)
Boleh menggunakan kalkulator (selain dari mobile devices)
—----------------------------------------------------------------------------------------------------------------------------------------

KELAS: _____________________________________

NIM     : _____________________________________

NAMA : _____________________________________

it = input gate, menentukan seberapa besar informasi baru yang akan disimpan atau ditambahkan
ke dalam cell state.

Ĉt = candidate cell state (tanh gate), menghasilkan kandidat informasi baru yang berpotensi
ditambahkan ke cell state. Nilainya dihasilkan menggunakan fungsi aktivasi tanh sehingga berada
pada rentang [−1,1].

ot = output gate, menentukan bagian informasi dari cell state yang akan dikeluarkan sebagai
hidden state pada waktu ke-t.

Ct = cell state, memori utama pada LSTM yang menyimpan informasi jangka panjang dan
diperbarui menggunakan forget gate serta input gate

ht = hidden state, representasi keluaran LSTM pada waktu ke-t, yang digunakan sebagai output ke
layer berikutnya atau ke langkah waktu berikutnya.

3.  (Nilai 4) Jelaskan perbedaan antara RNN dan LSTM sesuai gambar di bawah ini.

Jawaban:

1.  Adanya Cell State

○  RNN hanya memiliki hidden state sebagai memori, sehingga informasi lama lebih mudah

hilang ketika urutan data semakin panjang.

○  LSTM memiliki cell state, yaitu jalur memori khusus yang membantu mempertahankan

informasi penting dalam jangka panjang. Dengan adanya cell state, LSTM lebih baik dalam
menangani dependensi panjang pada data sekuens.

2.  Jumlah dan Fungsi Gate

○  RNN tidak memiliki mekanisme gate untuk mengatur aliran informasi.
○  LSTM memiliki beberapa gate, yaitu forget gate, input gate, dan output gate. Gate ini

berfungsi untuk menentukan informasi mana yang perlu disimpan, diperbarui, atau dibuang,
sehingga proses pembelajaran menjadi lebih terkontrol dan stabil.

Halaman 8 dari 8


