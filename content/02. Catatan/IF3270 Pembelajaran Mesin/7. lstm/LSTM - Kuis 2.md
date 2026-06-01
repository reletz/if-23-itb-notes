
## 1. Konsep Dasar LSTM

LSTM adalah versi "pintar" dari RNN yang dirancang khusus untuk menangani memori jangka panjang dan mengurangi risiko _Vanishing Gradient Problem_.

- **Cell State (**$C^{(t)}$**):** Ini adalah inovasi utama LSTM, bertindak seperti "jalan tol" memori yang memungkinkan informasi mengalir lurus dari masa lalu ke masa depan tanpa banyak perubahan.
    
- **Hidden State (**$h^{(t)}$**):** Memori jangka pendek yang juga berfungsi sebagai output langkah waktu tersebut.
    
- **Gerbang (Gates):** LSTM menggunakan mekanisme gerbang (dengan fungsi aktivasi _sigmoid_) untuk mengontrol arus informasi:
    
    1. **Forget Gate (**$f$**):** Memutuskan informasi lama mana yang akan dihapus dari _Cell State_.
        
    2. **Input Gate (**$i$**):** Memutuskan informasi baru mana yang akan ditambahkan ke _Cell State_.
        
    3. **Output Gate (**$o$**):** Memutuskan informasi apa yang akan dikeluarkan dari _Cell State_ ke _Hidden State_ berikutnya.
        
    4. _Catatan:_ Semua gerbang dalam LSTM bekerja secara **independen** dan tidak saling memengaruhi secara langsung.
        

## 2. Step-by-Step Forward Propagation LSTM

Perhitungan LSTM pada satu timestep ($t$) **wajib** dikerjakan secara berurutan langkah demi langkah. Jangan melompat!

**Persiapan Awal:**

- Inisialisasi awal biasanya $h^{(0)} = 0$ dan $C^{(0)} = 0$.
    
- Matriks bobot masukan: $U_f, U_i, U_c, U_o$.
    
- Matriks bobot _hidden_: $W_f, W_i, W_c, W_o$.
    
- Vektor bias: $b_f, b_i, b_c, b_o$.
    

**Urutan Kalkulasi per Timestep:**

1. **Hitung Forget Gate (**$f^{(t)}$**):** Menggunakan $x^{(t)}$ dan $h^{(t-1)}$. Aktivasi: `sigmoid`.
    
2. **Hitung Input Gate (**$i^{(t)}$**):** Menggunakan $x^{(t)}$ dan $h^{(t-1)}$. Aktivasi: `sigmoid`.
    
3. **Hitung Kandidat Cell State (**$\tilde{C}^{(t)}$**):** Informasi baru yang akan diusulkan. Aktivasi: `tanh`.
    
4. **Hitung Output Gate (**$o^{(t)}$**):** Menggunakan $x^{(t)}$ dan $h^{(t-1)}$. Aktivasi: `sigmoid`.
    
5. **Update Cell State Baru (**$C^{(t)}$**):** Kalikan memori lama dengan $f^{(t)}$, lalu tambahkan usulan memori baru yang sudah dikalikan $i^{(t)}$.
    
6. **Update Hidden State Baru (**$h^{(t)}$**):**
    
    Ambil _Cell State_ baru, saring pakai `tanh`, lalu kalikan dengan $o^{(t)}$.
    
7. **Hitung Prediksi (**$y^{(t)}$**):** _(Hanya jika diminta sesuai arsitektur)_
    
    $y^{(t)} = \sigma(V \cdot h^{(t)} + b_{hy})$  
    

## 3. Detail Algoritmik & Rumus Penting

**1. Rumus Lengkap Forward Propagation LSTM:**

_(Sangat disarankan disalin ke cheat sheet secara berurutan)_

$$f^{(t)} = \sigma(U_f \cdot x^{(t)} + W_f \cdot h^{(t-1)} + b_f)$$$$i^{(t)} = \sigma(U_i \cdot x^{(t)} + W_i \cdot h^{(t-1)} + b_i)$$$$\tilde{C}^{(t)} = \tanh(U_c \cdot x^{(t)} + W_c \cdot h^{(t-1)} + b_c)$$$$o^{(t)} = \sigma(U_o \cdot x^{(t)} + W_o \cdot h^{(t-1)} + b_o)$$$$C^{(t)} = (f^{(t)} * C^{(t-1)}) + (i^{(t)} * \tilde{C}^{(t)})$$$$h^{(t)} = o^{(t)} * \tanh(C^{(t)})$$

_(Catatan: Tanda $_$ pada rumus $C^{(t)}$ dan $h^{(t)}$ adalah perkalian elemen-per-elemen / element-wise multiplication, BUKAN dot product matriks).*

**2. Rumus Menghitung Jumlah Parameter Bobot (Soal No. 9):**

$$Param = (m + n + 1) \times 4 \times n + (n + 1) \times k$$

- $m$ = Dimensi Input
    
- $n$ = Jumlah unit LSTM (_Hidden size_)
    
- $k$ = Jumlah unit Output (jika ada _Dense Layer_ tambahan)
    
- Angka $4$ merepresentasikan 4 komponen dalam blok LSTM ($f, i, \tilde{C}, o$).
    

**Contoh Perhitungan (Dari Soal No 9):**

- Input size ($m$) = 5
    
- Hidden size/LSTM unit ($n$) = 10
    
- Output size ($k$) = 2
    
- **Total Parameter** = $(5 + 10 + 1) \times 4 \times 10 + (10 + 1) \times 2 = (16 \times 40) + (11 \times 2) = 640 + 22 = \mathbf{662}$  
    

## 4. Kesalahan Umum Pengerjaan Soal (⚠️ RED FLAGS LSTM)

Berdasarkan koreksi Bagian III (Soal 1-8 dan Soal 10) pada PDF, perhatikan jebakan ini:

1. **"LSTM menghilangkan vanishing gradient sepenuhnya" (SALAH!).**
    
    - LSTM hanya **mengurangi risiko** secara signifikan melalui _Cell State_, BUKAN menghilangkannya hingga 0% tak mungkin terjadi.
        
2. **Salah Menggunakan Fungsi Aktivasi (SANGAT FATAL!).**
    
    - Sering tertukar! Ingat aturan emas ini:
        
        - **Gerbang (Gate)** yang fungsinya "membuka/menutup" rentang 0-1 ($f, i, o$) $\rightarrow$ WAJIB pakai **`sigmoid`**.
            
        - **State** yang isinya nilai data ($\tilde{C}, h$) $\rightarrow$ WAJIB pakai **`tanh`**.
            
    - _LSTM tidak menggunakan ReLU._
        
3. **Bingung Fungsi Tiap Gerbang.**
    
    - _Input gate_ berfungsi menambahkan informasi baru ke cell state.
        
    - _Forget gate_ berfungsi MENGHAPUS informasi lama (jangan terbalik dengan _input gate_).
        
4. **Perhitungan Berhenti di Tengah Jalan (Soal 10).**
    
    - Banyak mahasiswa menghitung panjang-panjang hingga mendapatkan nilai $h^{(t)}$, lalu merasa sudah selesai. Padahal, arsitektur di soal seringkali memiliki _layer output_ tambahan (meminta nilai $y^{(t)}$). Pastikan baca soal sampai akhir apakah nilai prediksi $y^{(t)}$ juga ditanyakan!
        
5. **Kesalahan Operasi Aljabar pada Update Cell State.**
    
    - Saat menghitung $C^{(t)} = (f^{(t)} * C^{(t-1)}) + (i^{(t)} * \tilde{C}^{(t)})$, operasinya adalah **perkalian biasa** antara dua skalar/vektor sejajar, **bukan** perkalian matriks _dot product_. Kesalahan hitung disini akan membuat nilai _timestep_ berikutnya hancur total.