_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

Soal:
1. Jika sebuah algoritma sekuensial diubah menjadi paralel, hanya **60%** bagian algoritma tersebut yang dapat diparalelkan. Jelaskan berapa **maksimum speedup** yang dapat dicapai dengan menggunakan jumlah prosesor tak terbatas.
2. Pada sebuah **sistem multicore**, jelaskanlah apakah ada manfaatnya membuat program paralel dengan menggunakan **jumlah thread yang lebih besar** dibandingkan jumlah core fisik yang ada.
3. Diberikan kode MPI berikut. Jelaskan dengan singkat apa yang dihitung pada kode tersebut.
```c
int main(int argc, char *argv[])
{
    int rank, received, myvalue, P, neighbor;
    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &P);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    myvalue = rank;

    for(int step = 1; step < P; step = step*2)
    {
        if(rank % step == 0)
        {
            if(isEven(rank/step)) // mengembalikan 1 jika x even, dan 0 jika x odd
            {
                MPI_Recv(&received, 1, MPI_INT, rank+step, 0, MPI_COMM_WORLD, &status);
                myvalue += received;
            } else {
                MPI_Send(&myvalue, 1, MPI_INT, rank+step, 0, MPI_COMM_WORLD);
            }
        } else {
            break;
        }
    }

    if(rank == 0) {
        printf("%d\n", myvalue);
    }

    return 0;
}
```

Jawab:
1. Dengan hukum Amdahl: $1/(100-60)\% = 5/2 = 2.5$ kali. Artinya, walau prosesornya tak terbatas, speedup terbatas hanya 2.5x dibandingkan full serial. 
2. Secara umum, jumlah thread yang **optimum** dalam komputasi paralel adalah mendekati atau sama dengan **jumlah _hardware thread_** yang tersedia (yaitu, jumlah _core_ fisik, dikali dua jika mendukung **Simultaneous Multithreading / Hyper-Threading**). Namun, ada beberapa manfaat signifikan mengapa menggunakan **jumlah thread yang lebih besar** daripada jumlah _core_ fisik (disebut juga _over-subscription_) sering kali diperlukan dan bermanfaat, terutama dalam aplikasi _real-world_ yang kompleks:
	1. Mengatasi Latensi (I/O Bound Tasks)
		Sebagian besar program tidak 100% _CPU-bound_ (hanya berfokus pada perhitungan); mereka sering kali harus menunggu **operasi _Input/Output_ (I/O)**, seperti:
		
	- Membaca atau menulis ke _disk_ (SSD/HDD).
	- Mengirim atau menerima data melalui jaringan.
	- Menunggu respons dari basis data.
		
		 Ketika sebuah _thread_ sedang menunggu I/O, _core_ yang menjalankan _thread_ tersebut akan **menganggur**. Jika kita memiliki lebih banyak _thread_ daripada _core_, sistem operasi dapat segera menjadwalkan (**men-swap**) _thread_ lain yang siap bekerja ke _core_ yang baru saja _idle_ tersebut.
    > **Manfaat:** Hal ini menjaga _core_ tetap sibuk, **meningkatkan _utilization_** (pemanfaatan) _CPU_ secara keseluruhan, dan menyamarkan (_masking_) waktu tunggu I/O (_latency_).
	2. Mengatasi _Blocking_ Internal (_Lock Contention_)
		Dalam program paralel, _thread_ sering kali harus saling berebut akses ke sumber daya yang sama (_shared resources_). Untuk menghindari konflik, _thread_ menggunakan **mekanisme _lock_** (_mutexes_, _semaphores_, dll.). Ketika sebuah _thread_ mencoba mengambil _lock_ yang sedang dipegang _thread_ lain, _thread_ tersebut akan **ter-blokir** (berhenti sejenak).
      > **Manfaat:** Jika kita memiliki _thread_ berlebih, _thread_ yang ter-blokir dapat digantikan oleh _thread_ lain yang masih memiliki pekerjaan untuk dilakukan, mencegah _stalling_ (penghentian) dan menjaga _throughput_ program tetap tinggi.
 
	3. Mengatasi _Load Imbalance_
		Dalam beberapa kasus, sulit untuk membagi pekerjaan secara merata (_perfectly balanced_) di antara semua _thread_. Beberapa _thread_ mungkin menyelesaikan tugas mereka lebih cepat daripada yang lain.
		
        > **Manfaat:** Jika kita memiliki banyak _thread_ kecil (disebut juga _fine-grained threading_), pekerjaan dapat dialokasikan lebih dinamis. Setelah satu _thread_ selesai, ia bisa segera mengambil pekerjaan baru yang tersisa, daripada menunggu _thread_ lain yang memegang pekerjaan besar.
        
      > Secara umum, kalau threadnya kebanyakan (1000 thread banding 4 core, bisa overhead di *context switching* -> Kurang ada manfaatnya

1. Ambil contoh P = 2. Berarti, P0 untuk step 1 akan menerima dari `rank+step`, yang mana adalah P1. Namun, P1 akan mengirim ke `rank+step`, yang artinya kirim ke P2 -> Blocking.
	Kodenya error bruh!
	Tapi kalau di blok else nya kita pakai `rank-step`, ini bisa berfungsi jadi Binary Tree Reduction.