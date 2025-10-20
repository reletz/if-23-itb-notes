_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

Naufarrel Zhafif Abhista
13523149

Soal:

8.  Perhatikan kode berikut.
	- Apakah ada isu pada kode?
	- Jika ada, berikan perbaikannya.

```c
#include <stdio.h>
#include <omp.h>

int main() {
    int x = 0;

    #pragma omp parallel for
    for (int i = 0; i < 4; i++) {
        x += i;
    }

    printf("x = %d\n", x);
    return 0;
}
```


9. Apa yand diprint oleh proses 0, 1, dan 2?
```c
#include <stdio.h>
#include <mpi.h>

int main(int argc, char** argv) {
    int rank, size;
    int local_value, global_sum;

    MPI_Init(&argc, &argv);

    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    local_value = rank + 1;

    MPI_Reduce(&local_value, &global_sum, 1, MPI_INT,
               MPI_SUM, 0, MPI_COMM_WORLD);

    if (rank == 1) {
        printf("Global sum = %d\n", global_sum);
    }

    MPI_Finalize();
    return 0;
}
```

10. Perhatikan kode Cuda berikut.
- Berapa banyak thread yang dibuat?
- Apa isi variabel `idx` di thread pertama pada blok 1?
- Apakah kode `idx < n` dapat dihapus?
```c
int main() {
    int n = 10;
    int a[10], b[10], c[10];

    // Initialize arrays a and b with some values (diasumsikan)
    for (int i = 0; i < n; i++) {
        a[i] = i;
        b[i] = 2 * i;
    }

    int *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, n * sizeof(int));
    cudaMalloc(&d_b, n * sizeof(int));
    cudaMalloc(&d_c, n * sizeof(int));

    cudaMemcpy(d_a, a, n * sizeof(int), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, b, n * sizeof(int), cudaMemcpyHostToDevice);

    add_kernel<<<2, 8>>>(d_a, d_b, d_c, n);

    cudaMemcpy(c, d_c, n * sizeof(int), cudaMemcpyDeviceToHost);

    // Print result
    for (int i = 0; i < n; i++) {
        printf("%d + %d = %d\n", a[i], b[i], c[i]);
    }

    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    return 0;
}
```
```c
__global__ void add_kernel(int *a, int *b, int *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}
```
11. Asumsikan jalan dengan 4 proses.
    - Apa yang diprint proses 0?
    - Apa yang diprint proses 1?
```c
#include <stdio.h>
#include <mpi.h>

int main(int argc, char** argv) {
    int rank, size;
    int local_value, output[4];

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    local_value = rank + 1;

    MPI_Allgather(&local_value, 1, MPI_INT, output, 1, MPI_INT,
                  MPI_COMM_WORLD);

    printf("Rank %d: output = ", rank);
    for (int i = 0; i < size; i++) {
        printf("%d ", output[i]);
    }
    printf("\n");

    MPI_Finalize();
    return 0;
}
```
---
Jawab:
8. Bisa terjadi *race condition* akibat penjumlahan `x`. Solusi:
```c
#include <stdio.h>
#include <omp.h>

int main() {
    int x = 0;

    // Perbaikan: Tambahkan klausa reduction(+:x)
    #pragma omp parallel for reduction(+:x)
    for (int i = 0; i < 4; i++) {
        x += i;
    }

    printf("x = %d\n", x);
    return 0;
}
```

9. 
   - Proses 0: Tidak print
   - Proses 1: Print random garbage
   - Proses 2: Tidak print
     
10. - $2 \times 8 = 16$
    - $1 \times 8 + 0 = 8$
    - Karena `n = 10`, dan `max(idx) > 10`, line tidak bisa dihapus. Tujuan `idx > n` adalah memastikan bahwa thread hanya mengakses elemen dalam array yang valid
     
11. Jawab
    - `Rank 0: output = 1 2 3 4`
    - `Rank 1: output = 1 2 3 4`