_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

Naufarrel Zhafif Abhista
13523149

Soal:

4. Apakah kedua kode ini melakukan komputasi yang sama?

Kode 1
```c
for (i=0; i<n; i++) {
	a[i] = b[i] + 1;
	c[i] = a[i] + 2;
	d[i] = c[i+1] + 1
}
```
Kode 2
```c
#pragma omp parallel for
for (i=0; i<n; i++) {
	a[i] = b[i] + 1;
	c[i] = a[i] + 2;
	d[i] = c[i+1] + 1
}
```
5. Diberikan kode berbasis POSIX thread sebagai berikut (rank adalah id thread):
```c
void *pth_mat_vect(void* rank) {
    long my_rank = (long) rank;
    int i, j;

    int local_m = m/thread_count;
    int my_first_row = my_rank*local_m;
    int my_last_row = (my_rank + 1)*local_m - 1;

    for (i = my_first_row; i <= my_last_row; i++) {
        y[i] = 0.0;
        for (j = 0; j < n; j++) {
            y[i] += A[i][j] * x[j];
        }
    }
    
    return NULL;
}
```

Informasi Tambahan:
- Matriks A dan vektor y memiliki tipe elemen **double**.
- Ukuran _cache line_ berukuran **64 bytes** (8 double).
- Ukuran data A dan y adalah 8000×8000 (`m=n=8000`).
- Empat thread digunakan: **Thread 0, Thread 1, Thread 2,** dan **Thread 3**.
- **Thread 0** dan **Thread 1** berjalan pada **Core 1**.
- **Thread 2** dan **Thread 3** berjalan pada **Core 2**.

Apakah mungkin terjadi **false sharing** jika **Thread 0** dan **Thread 1** berjalan pada **Core 1**, kemudian **Thread 2** dan **Thread 3** pada **Core 2**?

6. Diberikan kode berikut yang akan dijalankan oleh **3 proses** (asumsikan _rank_ adalah 0,1, dan 2). Jelaskan nilai x, y, dan z pada setiap proses.

```c
int x, y, z;
switch (my_rank) {
    case 0:
        x=0; y=1; z=2;
        MPI_Bcast(&x, 1, MPI_INT, 0, MPI_COMM_WORLD);
        MPI_Send(&y, 1, MPI_INT, 2, 43, MPI_COMM_WORLD);
        MPI_Bcast(&z, 1, MPI_INT, 1, MPI_COMM_WORLD);
        break;
    case 1:
        x=3; y=0; z=5;
        MPI_Bcast(&x, 1, MPI_INT, 0, MPI_COMM_WORLD);
        MPI_Bcast(&y, 1, MPI_INT, 1, MPI_COMM_WORLD);
        break;
    case 2:
        x=6; y=7; z=8;
        MPI_Bcast(&x, 1, MPI_INT, 0, MPI_COMM_WORLD);
        MPI_Recv(&z, 1, MPI_INT, 0, 43, MPI_COMM_WORLD, &status);
        MPI_Bcast(&y, 1, MPI_INT, 1, MPI_COMM_WORLD);
        break;
}
```

7. Tuliskan 1 contoh teknik ILP
---
Jawab:

4. Tidak, karena kode kedua memiliki ketergantungan data lintas iterasi terbalik (_reverse loop-carried dependency_ atau _write-after-read dependency_ dari sudut pandang `c[i+1]`) yang membuatnya tidak aman untuk diparalelkan menggunakan OpenMP tanpa modifikasi. Baris `d[i] = c[i+1] + 1;` harus dipindahkan keluar dari loop atau diparalelkan dengan hati-hati jika memang ada cara untuk menjamin urutan pembacaan yang benar.

5. Ya, sangat mungkin terjadi False Sharing pada vektor hasil y antara Thread 0 dan Thread 1 (di Core 1) dan antara Thread 2 dan Thread 3 (di Core 2).

	1. **Ukuran Data:** Elemen `double` membutuhkan 8 bytes.    
	2. **Ukuran Cache Line:** 64 bytes.
	3. **Jumlah Elemen per Cache Line:** 64 bytes /8 bytes/double =8 elemen double.
	4. **Pembagian Tugas (Workload Partitioning):**
	    - Total baris m=8000.
	    - Total _thread_ 4.
	    - Setiap _thread_ menangani local_m=8000/4=2000 baris.
	
	|Thread (Rank)|`my_first_row`|`my_last_row`|Baris yang Dikerjakan|Core|
	|---|---|---|---|---|
	|**0**|0|1999|y[0] hingga y[1999]|**1**|
	|**1**|2000|3999|y[2000] hingga y[3999]|**1**|
	|**2**|4000|5999|y[4000] hingga y[5999]|**2**|
	|**3**|6000|7999|y[6000] hingga y[7999]|**2**|

	False Sharing akan terjadi pada elemen-elemen yang berada di batas pembagian kerja antar-thread:
	
	1. Antara Thread 0 dan Thread 1 (di Core 1)
	
	- **Thread 0** menulis elemen terakhirnya: y[1999].
	- **Thread 1** menulis elemen pertamanya: y[2000].
	    
	
	Karena setiap _cache line_ menampung 8 elemen, **Thread 0** akan memodifikasi elemen y[1999]. **Thread 1** akan memodifikasi y[2000].
	
	- Jika elemen y[1999] dan y[2000] kebetulan berada dalam **cache line yang sama** (hal ini sangat mungkin terjadi, tergantung pada bagaimana array y dialokasikan dan sejajar dengan batas _cache line_ 64-byte), maka:
	    - Setiap modifikasi oleh **Thread 0** pada y[1999] akan memaksa _invalidation_ _cache_ di **Thread 1**.
	    - Setiap modifikasi oleh **Thread 1** pada y[2000] akan memaksa _invalidation_ _cache_ di **Thread 0**.
	
	Meskipun **Thread 0 dan Thread 1 berada pada Core yang sama (Core 1)**, mereka tetap memiliki _private cache_ tingkat L1 dan L2 mereka sendiri. Mereka akan saling menyebabkan _cache-line invalidation_, yang akan menghambat kinerja.
	
	2. Antara Thread 2 dan Thread 3 (di Core 2)
	
	- **Thread 2** menulis elemen terakhirnya: y[5999].
	- **Thread 3** menulis elemen pertamanya: y[6000].
	    
	Sama seperti di atas, jika y[5999] dan y[6000] berbagi _cache line_, mereka akan saling meng-_invalidate_ _cache_ masing-masing, meskipun mereka berada dalam satu _Core_ (Core 2).

6.  Pada awal eksekusi `switch` (setelah inisialisasi lokal):

|Proses|`my_rank`|x|y|z|
|---|---|---|---|---|
|**P0**|0|0|1|2|
|**P1**|1|3|0|5|
|**P2**|2|6|7|8|


#### Langkah 1: Broadcast x (Root 0)

Semua proses menjalankan baris pertama secara sinkron: `MPI_Bcast(&x, 1, MPI_INT, 0, MPI_COMM_WORLD);`.

- **Aksi:** Rank 0 (Root) mengirimkan nilai x lokalnya (0) ke semua proses.
- **Hasil:** Semua proses (P0, P1, P2) memperbarui x menjadi 0.
    

|Proses|x|y|z|
|---|---|---|---|
|**P0**|**0**|1|2|
|**P1**|**0**|0|5|
|**P2**|**0**|7|8|

---

#### Langkah 2: Komunikasi y (P0) & z (P2)

1. **P0:** `MPI_Send(&y, 1, MPI_INT, 2, 43, MPI_COMM_WORLD);`
    
    - Mengirim nilai **y lokal P0 (1)** ke Rank 2 dengan _tag_ 43.
        
2. **P2:** `MPI_Recv(&z, 1, MPI_INT, 0, 43, MPI_COMM_WORLD, &status);`
    
    - Menerima data dari Rank 0 dengan _tag_ 43 dan menyimpannya ke variabel **z P2**.
        

- **Hasil:** Nilai z pada P2 diperbarui menjadi 1.
    

|Proses|x|y|z|
|---|---|---|---|
|**P0**|0|1|2|
|**P1**|0|0|5|
|**P2**|0|7|**1**|

---

#### Langkah 3: Broadcast z (Root 1)

- P0: `MPI_Bcast(&z, 1, MPI_INT, 1, MPI_COMM_WORLD);` (Menunggu z dari Root 1)

- P1: `MPI_Bcast(&y, 1, MPI_INT, 1, MPI_COMM_WORLD);` (Bertindak sebagai Root, mengirim y=0)

- P2: Semua komunikasi di P2 selesai kecuali `MPI_Bcast(&y, 1, MPI_INT, 1, MPI_COMM_WORLD);` di Langkah 4.

Pada `MPI_Bcast(&z, 1, MPI_INT, 1, MPI_COMM_WORLD);`:

- **Aksi:** Rank 1 (Root) mengirimkan nilai z lokalnya (5) ke semua proses.
    
- **Hasil:** z di P0, P1, dan P2 diperbarui menjadi 5.
    

|Proses|x|y|z|
|---|---|---|---|
|**P0**|0|1|**5**|
|**P1**|0|0|**5**|
|**P2**|0|7|**5**|

---

#### Langkah 4: Broadcast y (Root 1)

P0: Kode P0 selesai.
P1: Kode P1 selesai.
P2: `MPI_Bcast(&y, 1, MPI_INT, 1, MPI_COMM_WORLD);` (Menunggu y dari Root 1)

- **Aksi:** Rank 1 (Root) mengirimkan nilai y lokalnya (0) ke semua proses.
    
- **Hasil:** y di P0, P1, dan P2 diperbarui menjadi 0.
    
    - P0 dan P1 mungkin sudah selesai, tetapi jika mereka belum memanggil `MPI_Finalize()`, mereka masih berpartisipasi dalam komunikasi. Karena P1 adalah Root, P1 adalah sumber y=0. P2 menerima y=0. P0 sudah _exit_ dari `switch`, namun nilai _y_ terakhir yang diterima adalah dari langkah 3/4. Jika kita menganggap semua Bcast harus dieksekusi oleh semua proses, maka `y` di P0 akan diperbarui.
        

|Proses|x|y|z|
|---|---|---|---|
|**P0**|0|**0** (dari P1)|5|
|**P1**|0|**0**|5|
|**P2**|0|**0** (dari P1)|5|

---

### Hasil Akhir

Setelah semua komunikasi selesai, nilai x, y, dan z pada setiap proses adalah:

|Proses|Nilai Akhir x|Nilai Akhir y|Nilai Akhir z|
|---|---|---|---|
|**Proses 0**|**0**|**0**|**5**|
|**Proses 1**|**0**|**0**|**5**|
|**Proses 2**|**0**|**0**|**5**|

7. Pipelining