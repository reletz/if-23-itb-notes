_Back to_ [[IF3270 Pembelajaran Mesin]]
### A. Konsep Dasar CNN

CNN dirancang khusus untuk memproses data dua dimensi (seperti gambar) dengan mengekstraksi fitur (seperti garis, sudut, bentuk) secara bertahap.

- **Input (**$X$**):** Matriks gambar yang memiliki dimensi **Panjang** $\times$ **Lebar** $\times$ **Kedalaman (Channel)**. Contoh: Gambar RGB memiliki 3 channel.
    
- **Kernel / Filter (**$K$**):** Matriks bobot berukuran kecil (misal $2 \times 2$ atau $3 \times 3$) yang akan digeser ke seluruh area input. Satu kernel bertugas mencari satu jenis fitur/pola tertentu. _Kedalaman kernel selalu sama dengan kedalaman input_.
    
- **Feature Map:** Matriks _output_ yang dihasilkan dari perkalian (konvolusi) antara Input dan Kernel. **Kedalaman (jumlah) Feature Map selalu sama dengan JUMLAH KERNEL yang digunakan.**
    
- **Stride (**$S$**):** Jarak pergeseran kernel pada input.
    
- **Padding (**$P$**):** Penambahan bingkai angka 0 di sekeliling matriks input agar kernel bisa memproses bagian tepi gambar tanpa mengurangi ukuran _output_ secara drastis.
    
- **Detektor (Aktivasi):** Fungsi untuk membuang nilai tidak relevan, biasanya **ReLU** (mengubah nilai negatif menjadi 0).
    
- **Pooling:** Proses merangkum informasi (sub-sampling) untuk memperkecil ukuran _Feature Map_, biasanya menggunakan **Maxpooling** (mengambil nilai terbesar di suatu area). Pooling **tidak** memiliki bobot (parameter yang dilatih).
    

### B. Step-by-Step Forward Propagation

Jika dalam soal kamu diberikan 1 Input dan 1 Layer Konvolusi lengkap, ikuti alur perhitungan ini:

1. **Hitung Dimensi Output Dahulu:** Sebelum mulai mengalikan, hitung ukuran panjang/lebar matriks _Feature Map_ yang akan dihasilkan agar kamu tahu kapan harus berhenti menggeser.
    
2. **Operasi Konvolusi (Dot Product):** Letakkan kernel di sudut kiri atas input. Kalikan setiap sel yang bertumpukan, lalu jumlahkan semuanya. Jika input punya beberapa _channel_ (kedalaman), lakukan hal yang sama untuk _channel_ 1, _channel_ 2, dst.
    
3. **Penggabungan Channel & Bias:** Jumlahkan hasil _dot product_ dari semua _channel_ pada posisi tersebut, kemudian **tambahkan dengan Bias kernel tersebut (Hanya 1 kali)**. Tulis nilainya di _Feature Map_.
    
4. **Geser Kernel:** Geser kernel sejauh _Stride_. Ulangi langkah 2 & 3 sampai seluruh area input terlewati. Ulangi seluruh proses untuk Kernel ke-2, ke-3, dst.
    
5. **Tahap Detektor (ReLU):** Cek semua angka di _Feature Map_ yang sudah jadi. Jika ada angka minus (negatif), coret dan ganti jadi 0.
    
6. **Tahap Pooling:** Siapkan "jendela pooling" (misal ukuran $2 \times 2$). Taruh di sudut kiri atas _Feature Map_. Cari angka Paling Besar, tulis di matriks baru. Geser sejauh _stride pooling_, cari angka terbesar lagi. **(Lakukan terpisah per kernel/feature map, jangan digabung!)**
    

### C. Detail Algoritmik & Rumus Penting

**1. Rumus Mencari Dimensi Feature Map Output (**$V$**):**

  

$$V = 1 + \lfloor \frac{W - F + 2P}{S} \rfloor$$

_(Ket:_ $W$ _= ukuran sisi input,_ $F$ _= ukuran sisi kernel,_ $P$ _= padding,_ $S$ _= stride)_

**2. Rumus Mencari Jumlah Parameter Bobot (Trainable Parameters):**

  

$$Param = N \times (F \times F \times C + 1)$$

_(Ket:_ $N$ _= jumlah kernel,_ $F$ _= ukuran sisi kernel,_ $C$ _= jumlah channel input,_ $+1$ _adalah untuk bias)_

**3. Pseudo-code Algoritma:**

```
// TAHAP 1: KONVOLUSI
UNTUK setiap kernel k dari 1 sampai N:
    UNTUK setiap posisi vertikal i (geser sejauh S):
        UNTUK setiap posisi horizontal j (geser sejauh S):
            
            Total_Dot_Product = 0
            
            // Hitung perkalian untuk SEMUA channel
            UNTUK setiap channel c dari 1 sampai C:
                Total_Dot_Product += Sum(Jendela_Input_Channel_C * Matriks_Kernel_Channel_C) 
                
            // RUMUS KRUSIAL: Tambahkan Bias di akhir HANYA SEKALI per kernel!
            Y[i, j, k] = Total_Dot_Product + B[k]

// TAHAP 2: DETEKTOR (ReLU)
UNTUK setiap elemen y dalam matriks Y:
    JIKA y < 0 MAKA y = 0
Simpan sebagai matriks Y_relu

// TAHAP 3: MAXPOOLING (Asumsi ukuran F_pool, stride S_pool)
UNTUK setiap layer kedalaman/kernel k dari 1 sampai N:
    UNTUK setiap area pooling (lompat sejauh S_pool) di matriks Y_relu layer k:
        Z[posisi] = Nilai Maksimum dari area tersebut
```

### D. Kesalahan Umum Pengerjaan Soal (⚠️ RED FLAGS DARI KUIS TAHUN LALU)

Berdasarkan koreksi kuis sebelumnya, JANGAN lakukan hal-hal ini saat ujian:

1. **Salah menjumlahkan Bias:** Menjumlahkan bias berkali-kali untuk setiap _channel_. **YANG BENAR:** Konvolusi _channel_ 1 + Konvolusi _channel_ 2 + ... + **Bias (Satu kali di akhir penjumlahan)**.
    
2. **Salah menentukan dimensi Feature Map:** Menyebutkan ukuran _Feature Map_ $3 \times 3 \times 4$ karena mengira (2 kernel $\times$ 2 channel). **YANG BENAR:** Dimensi ketiga _Feature Map_ **SELALU** sama dengan jumlah kernel. Jika ada 2 kernel, maka dimensinya $3 \times 3 \times 2$.
    
3. **Salah menggabungkan saat Pooling:** Menjumlahkan atau mencari nilai maksimum antar _Feature Map_ dari kernel yang berbeda. **YANG BENAR:** Pooling dilakukan **secara mandiri (terpisah)** untuk masing-masing _Feature Map_.
    
4. **Salah menghitung jumlah parameter bobot:** * Menghitung pooling layer seolah-olah memiliki bobot. **YANG BENAR:** Layer maxpooling/average pooling **TIDAK ADA** parameternya (bobot = 0).
    
    - Menambahkan bobot _dense layer_ padahal yang diminta soal hanya arsitektur _image encoder_-nya saja. Terapkan rumus parameter hanya sesuai spesifikasi yang diminta.
        
5. **Tidak menuliskan detail perhitungan:** Hanya menulis hasil akhir matriks. **YANG BENAR:** Dosen meminta setidaknya satu contoh perhitungan sel secara detail, contoh: `(1*1 + -1*0 + ...) + 0.25 = 1.25`.