---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa sifat dasar UDP?
> > - Apa maksud "connectionless"?
> > - Mengapa UDP tidak andal (_unreliable_)?
> > - Apa itu layanan "best effort"?
> > - Bisakah UDP dibuat andal?
> > - Bagaimana cara kerja checksum UDP?
> > - Apa peran UDP sebagai demultiplexer?
> > - Bagaimana struktur header UDP?
> >
> > ## Reference Points
> > 
> > - Slides 17, 24-25
> > - Slide 18
> > - Slides 19-20
> > - Slides 21-23
>
> > ### Karakteristik Utama UDP (User Datagram Protocol)
> > 
> > **Sifat Dasar:** UDP adalah protokol yang **datagram-oriented**, _**unreliable**_ (tidak andal), dan _**connectionless**_ (tanpa koneksi). Tujuannya adalah menyediakan layanan pengiriman yang sangat cepat dan sederhana dengan _overhead_ minimal.
> > 
> > **Connectionless:**
> > 
> > - Tidak ada proses "jabat tangan" (_handshake_) seperti SYN atau FIN pada TCP. Paket data (disebut datagram) langsung dikirim begitu saja.
> > - Tidak ada state koneksi yang perlu disimpan oleh pengirim atau penerima.
> > 
> > **Unreliable (Tidak Andal):**
> > 
> > - UDP tidak memiliki mekanisme _sequence number_ atau _acknowledgment_. Ia tidak menjamin bahwa datagram akan sampai ke tujuan.
> > - Ini adalah bagian dari layanan **"best effort"**: UDP akan berusaha sebaik mungkin untuk mengirimkan datagram, tetapi tidak ada jaminan apa pun.
> > - Akibatnya, datagram UDP bisa:
> >     - **Hilang** di tengah jalan.
> >     - Diterima dalam **urutan yang salah** (misalnya, dikirim 1, 2, 3 tapi diterima 2, 1, 3).
> >
> > ### Keandalan (Reliability) dan UDP
> > 
> > Secara definisi, UDP adalah protokol yang tidak andal. Namun, **keandalan bisa diimplementasikan di atas UDP** jika diperlukan.
> > 
> > 1. **Implementasi di Application Layer:** Jika sebuah aplikasi membutuhkan keandalan tapi tetap ingin menggunakan kecepatan UDP, maka developer harus membangun mekanisme keandalan itu sendiri di dalam kode aplikasi.
> > 2. **Mekanisme:** Ini bisa berupa:
> >     - Melacak byte yang dikirim dan diterima.
> >     - Mengurutkan kembali paket yang datang tidak berurutan.
> >     - Mengirim ulang data jika terdeteksi hilang (misalnya dengan timer).
> > 
> > - **Contoh Dunia Nyata:** Aplikasi `tftp` (Trivial File Transfer Protocol) adalah aplikasi "andal" yang mentransfer file menggunakan UDP. Mekanisme keandalannya sepenuhnya diatur di dalam lapisan aplikasi `tftp` itu sendiri.
> >
> > ### Struktur dan Mekanisme UDP
> > 
> > **Struktur Header UDP:** Header UDP sangat sederhana dan berukuran tetap 8 byte, terdiri dari:
> > 
> > - **Source Port (16 bit):** Port dari proses pengirim.
> > - **Destination Port (16 bit):** Port dari proses tujuan.
> > - **Length (16 bit):** Panjang total datagram UDP (header + data) dalam byte.
> > - **Checksum (16 bit):** Nilai untuk memeriksa apakah ada error/kerusakan pada header atau data selama transmisi.
> > ![[Pasted image 20250618163800.png]]
> > 
> > **Mekanisme Checksum:**
> > 
> > - **Tujuan:** Untuk mendeteksi error (misalnya bit yang terbalik) pada segmen yang ditransmisikan.
> > - **Pengirim:** Menjumlahkan semua kata 16-bit dari segmen (menggunakan _1's complement sum_) dan menempatkan hasilnya di field checksum.
> > - **Penerima:** Menghitung ulang checksum dari segmen yang diterima. Jika hasilnya tidak cocok dengan nilai di field checksum, maka terdeteksi ada error. _Catatan: Jika error terdeteksi, UDP biasanya hanya akan membuang paket tersebut._
> > 
> > **Peran sebagai Simple Demultiplexer:**
> > 
> > - Fungsi utama UDP adalah memperluas layanan _host-to-host_ dari network layer menjadi layanan _process-to-process_.
> > - UDP menambahkan kemampuan **demultiplexing**, yaitu menggunakan _Destination Port_ untuk mengarahkan datagram yang masuk ke antrian pesan (socket) dari proses aplikasi yang benar.

> [!cornell] #### Summary
> UDP (User Datagram Protocol) adalah protokol transport yang **cepat, sederhana, dan _connectionless_**, yang beroperasi dengan prinsip **"best effort"**. Ia mengorbankan keandalan—tidak ada jaminan pengiriman atau urutan—demi _overhead_ yang rendah dan kecepatan tinggi. Fungsi utamanya adalah menyediakan **demultiplexing** dasar menggunakan nomor port, sementara mekanisme keandalan (jika perlu) harus diimplementasikan di lapisan aplikasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Kapan UDP adalah Pilihan Tepat?
> 
> - **DNS (Domain Name System):** Proses query nama domain harus sangat cepat. Sebuah permintaan dan respons tunggal lebih cocok menggunakan UDP yang ringan daripada harus melalui proses handshake TCP yang panjang.
> - **VoIP (Voice over IP) & Game Online:** Dalam aplikasi real-time ini, menerima data lama lebih buruk daripada tidak menerimanya sama sekali. Kecepatan adalah segalanya. Kehilangan beberapa paket suara atau data posisi pemain biasanya tidak terlalu terasa dan lebih baik daripada mengalami jeda (lag) karena menunggu retransmisi TCP.
> 
> #### Checksum UDP di IPv6
> 
> - Meskipun field checksum bersifat opsional dalam UDP yang berjalan di atas IPv4, **checksum menjadi wajib (mandatory) ketika UDP berjalan di atas IPv6**. Hal ini karena header IPv6 tidak lagi memiliki checksumnya sendiri, sehingga beban untuk memastikan integritas data sepenuhnya diserahkan kepada protokol lapisan atas seperti UDP dan TCP.
> 
> #### Eksplorasi Mandiri
> 
> - **Tangkap Lalu Lintas DNS:** Gunakan Wireshark dan filter `udp.port == 53`. Kemudian, coba akses situs web yang belum pernah Anda kunjungi. Anda akan melihat lalu lintas DNS query dan response. Periksa header UDP-nya dan lihat betapa sederhananya dibandingkan dengan header TCP.