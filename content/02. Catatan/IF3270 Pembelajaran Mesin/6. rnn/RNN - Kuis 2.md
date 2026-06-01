_Back to_ [[IF3270 Pembelajaran Mesin]]
## 1. Konsep Dasar RNN

Berbeda dengan CNN yang memproses gambar statis, RNN dirancang khusus untuk memproses **data sekuensial** (data yang urutannya penting, seperti teks, deret waktu, atau suara).

- **Timestep (**$t$**):** Langkah waktu. Input dimasukkan satu per satu ($x^{(1)}, x^{(2)}, x^{(3)}$, dst).
    
- **Hidden State (**$h^{(t)}$**):** "Memori" RNN. Nilai $h$ dipengaruhi oleh input saat ini ($x^{(t)}$) DAN memori sebelumnya ($h^{(t-1)}$).
    
- **Parameter Sharing:** Matriks bobot ($W_{xh}, W_{hh}, W_{hy}$) dan bias **SELALU SAMA** untuk setiap timestep. RNN tidak membuat bobot baru saat waktu bergeser.
    

## 2. Variasi Arsitektur & Logika Forward Propagation

Berikut adalah logika _forward propagation_ untuk kelima variasi arsitektur RNN.

_(Catatan: Rumus dasar untuk update hidden state di setiap arsitektur selalu sama, yaitu:_ $h^{(t)} = \tanh(W_{xh} \cdot x^{(t)} + W_{hh} \cdot h^{(t-1)} + b_{xh})$_)_

### A. One-to-One

- **Karakteristik:** Tidak ada perulangan waktu ($t$ maksimal cuma 1). Mirip Neural Network biasa.
    
- **Kasus:** Klasifikasi gambar tunggal.
    
- **Logika:**
    
    1. Hitung $h^{(1)}$ dari $x^{(1)}$.
        
    2. Langsung hitung output $y^{(1)} = \sigma(W_{hy} \cdot h^{(1)} + b_{hy})$. Selesai.
        

### B. One-to-Many

- **Karakteristik:** Menerima 1 input di awal ($x^{(1)}$), lalu menghasilkan output beruntun ($y^{(1)}, y^{(2)}, y^{(3)}$).
    
- **Kasus:** Image Captioning (1 gambar $\rightarrow$ deretan teks deskripsi).
    
- **Logika:**
    
    1. **Timestep 1:** Input adalah $x^{(1)}$. Hitung $h^{(1)}$, lalu hasilkan output $y^{(1)}$.
        
    2. **Timestep 2:** Input $x^{(2)}$ biasanya berupa "kosong" atau mengambil hasil $y^{(1)}$. Hitung $h^{(2)}$ (pakai $h^{(1)}$), hasilkan $y^{(2)}$.
        
    3. Lanjut terus sampai menghasilkan token "selesai".
        

### C. Many-to-One ⚠️ _(Sering Keluar!)_

- **Karakteristik:** Menerima banyak input berurutan, tapi **hanya menghasilkan 1 output di akhir**.
    
- **Kasus:** Klasifikasi Sentimen (Deretan kata $\rightarrow$ "Positif/Negatif").
    
- **Logika:**
    
    1. Terus update _hidden state_ dari $h^{(1)}$ sampai $h^{(T)}$ menggunakan $x^{(1)}$ sampai $x^{(T)}$.
        
    2. **JANGAN hitung output** $y$ **di tengah jalan!**
        
    3. Setelah input terakhir ($x^{(T)}$) selesai diproses dan $h^{(T)}$ didapat, barulah hitung output tunggal: $y^{(T)} = \sigma(W_{hy} \cdot h^{(T)} + b_{hy})$.
        

### D. Many-to-Many (Equal) ⚠️ _(Sering Keluar!)_

- **Karakteristik:** Jumlah langkah input sama persis dengan jumlah langkah output.
    
- **Kasus:** Named Entity Recognition (Setiap kata dalam kalimat diberi label "Nama", "Tempat", dll).
    
- **Logika:**
    
    1. Di **setiap timestep** $t$, hitung $h^{(t)}$ dari input $x^{(t)}$.
        
    2. Langsung hitung dan keluarkan $y^{(t)}$ pada timestep tersebut juga.
        
    3. Berulang terus di setiap langkah sampai sequence habis.
        

### E. Many-to-Many (Encoder-Decoder / Seq2Seq)

- **Karakteristik:** Membaca semua input sampai habis (Encoder), baru kemudian mulai mencetak output berurutan (Decoder).
    
- **Kasus:** Google Translate (Inggris $\rightarrow$ Indonesia).
    
- **Logika:**
    
    1. **Fase Encoder:** Proses seperti Many-to-One. Masukkan $x^{(1)}$ sampai $x^{(T)}$, update $h$ terus, tanpa mengeluarkan $y$.
        
    2. **Transfer Memori (KRUSIAL):** _Hidden state_ terakhir dari Encoder ($h^{(T)}$) akan **DIOPER** menjadi nilai inisialisasi awal ($h^{(0)}$) untuk Decoder.
        
    3. **Fase Decoder:** Proses seperti One-to-Many. Decoder mulai mencetak $y^{(1)}, y^{(2)}$, dst berbekal "sari pati memori" ($h^{(0)}$) dari Encoder.
        

## 3. Detail Algoritmik & Rumus Penting

**1. Rumus Menghitung Jumlah Parameter Bobot (Trainable Parameters):**

_(Sering keluar sebagai soal hitungan Bagian II No. 1 & 2)._

- **Untuk Layer Simple RNN:**
    
      
    
    $$Param = (Dimensi\_Input + Dimensi\_Neuron\_RNN + 1) \times Dimensi\_Neuron\_RNN$$
    
    _(Angka +1 adalah untuk Bias)_
    
- **Untuk Layer Dense (Fully Connected) biasa:**
    
      
    
    $$Param = (Dimensi\_Input + 1) \times Dimensi\_Output$$
- **Contoh Kasus Many-to-One (Soal Kuis No 2):**
    
    Input (2 fitur) $\rightarrow$ RNN (5 neuron) $\rightarrow$ Output (1 neuron)
    
    - Layer RNN: $(2 + 5 + 1) \times 5 = 40$  
        
    - Layer Output (Dense): $(5 + 1) \times 1 = 6$  
        
    - **Total Parameter = 46**
        

## 4. Kesalahan Umum Pengerjaan Soal (⚠️ RED FLAGS RNN)

1. **"Jumlah parameter tergantung pada banyaknya timestep" (SALAH BESAR!).**
    
    - Banyaknya timestep TIDAK MEMPENGARUHI banyaknya parameter bobot. Parameter RNN selalu _sharing parameter_ berapapun panjang langkah waktunya.
        
2. **"Bobot antar timestep berbeda dan perlu dipelajari" (SALAH!).**
    
    - Karena _sharing parameter_, bobot antar timestep adalah **SAMA**.
        
3. **"Fungsi aktivasi tanh mencegah Vanishing Gradient" (SALAH!).**
    
    - Turunan `tanh` memiliki maksimal bernilai 1. Jika dikalikan berulang-ulang pada timestep yang sangat panjang, gradien akan tetap mengecil. _Vanishing gradient_ **tetap bisa terjadi** di Simple RNN.
        
4. **Salah Menggambar Arsitektur Many-to-One.**
    
    - Saat menggambar _unfolded network_, pastikan node Output ($y$) **HANYA DIGAMBAR** menyambung ke _hidden state_ ($h$) yang posisinya paling akhir. Jika kamu menggambar panah ke $y$ di setiap timestep, itu menjadi Many-to-Many!
        
5. **Kesalahan Operasi Matriks / Lupa Menambah Hidden State Sebelumnya.**
    
    - Terkadang mahasiswa terburu-buru dan hanya mengalikan $W_{xh} \cdot x^{(t)}$ tanpa menjumlahkannya dengan sisa memori ($W_{hh} \cdot h^{(t-1)}$). Hati-hati!