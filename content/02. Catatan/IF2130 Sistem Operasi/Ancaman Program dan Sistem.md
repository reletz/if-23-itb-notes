---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Ancaman Program (Malware)
> > - Trojan, Spyware, Ransomware
> > - Trap Door & Logic Bomb
> > - Apa itu Code Injection?
> > - Buffer Overflow
> > - Exploit vs. Script Kiddie
> > - Virus vs. Worm
> > - Ancaman Sistem & Jaringan
> > - Zombie Systems (Botnets)
> > - Serangan DoS & DDoS
> > - Apa itu Port Scanning?
>
> > ### Ancaman Program (Program Threats)
> > Ini adalah ancaman yang berasal dari perangkat lunak, baik yang sengaja dibuat jahat (_malware_) maupun yang memiliki celah keamanan (_vulnerabilities_).
> > - **Malware (Malicious Software):** Perangkat lunak yang dirancang untuk merusak, menonaktifkan, atau mengeksploitasi sistem komputer.
> > - **Trojan Horse:** Program yang tampak sah dan berguna, tetapi diam-diam menjalankan fungsi berbahaya di latar belakang.\
> > 	- _Analogi:_ Kuda Troya dalam mitologi Yunani. Sebuah "hadiah" yang di dalamnya berisi musuh.
> > 	- _Contoh:_ Sebuah aplikasi game gratis yang diam-diam mencuri daftar kontak Anda.
> > - **Spyware:** Malware yang bertujuan memata-matai aktivitas pengguna, menangkap data pribadi (seperti kebiasaan Browse), dan seringkali digunakan untuk menampilkan iklan yang tidak diinginkan.
> > - **Ransomware:** Malware yang paling merusak secara langsung. Ia mengenkripsi data di komputer korban, membuatnya tidak bisa diakses, lalu menuntut pembayaran (tebusan) untuk mendapatkan kunci dekripsi.
> > - **Trap Door (Back Door):** Sebuah celah keamanan yang **sengaja** ditinggalkan oleh pemrogram untuk melewati prosedur keamanan normal. Ini bisa berbahaya jika ditemukan oleh penyerang.
> > - **Logic Bomb:** Sebuah _trap door_ yang hanya akan aktif jika kondisi logis tertentu terpenuhi (misalnya, pada tanggal tertentu atau jika nama seorang karyawan dihapus dari daftar gaji).
> >
> >
> > ### Code Injection
> > - **Apa itu:** Terjadi ketika sebuah program yang tidak berbahaya memiliki _bug_ yang memungkinkan penyerang untuk menyisipkan dan mengeksekusi kode berbahaya. Sangat umum pada bahasa pemrograman tingkat rendah seperti C/C++ yang mengizinkan manipulasi memori secara langsung.
> > - **Buffer Overflow:** Jenis _code injection_ yang paling umum.
> > 	1. Sebuah _buffer_ (area penyimpanan sementara di memori, seperti _stack_) memiliki ukuran terbatas.
> > 	2. Program mencoba menyalin data yang lebih besar dari kapasitas _buffer_ menggunakan fungsi yang tidak aman (seperti `strcpy()` di C).
> > 	3. Data yang berlebih akan "meluap" dan menimpa area memori di sekitarnya.
> > 	4. Jika luapan ini cukup besar, ia dapat menimpa **alamat kembali (return address)** sebuah fungsi, yaitu alamat instruksi selanjutnya yang harus dijalankan setelah fungsi selesai.
> > 	5. Penyerang mengganti alamat kembali ini dengan alamat kode berbahaya (_shellcode_) yang telah mereka suntikkan ke dalam memori. Ketika fungsi selesai, program akan "melompat" ke kode milik penyerang.
> > - **Exploit vs. Script Kiddie:** Seorang ahli (peretas etis atau jahat) menulis kode eksploitasi (_exploit_) yang rumit untuk memanfaatkan _bug_ ini. Setelah _exploit_ itu dipublikasikan, seorang **script kiddie** (pengguna non-ahli) dapat dengan mudah menggunakannya untuk menyerang sistem tanpa perlu memahami cara kerjanya.
> >
> > ###  Virus dan Worms
> > **Virus** 
> > Sebuah fragmen kode yang menempel pada program yang sah. Ia membutuhkan "tuan rumah" dan seringkali memerlukan interaksi manusia (misalnya, mengklik lampiran email) untuk menyebar dan menginfeksi program lain.
> > 
> > **Worm (Cacing)** 
> > Sebuah program mandiri yang mereplikasi dirinya sendiri dan menyebar melalui jaringan **tanpa bantuan manusia**. Worm mengeksploitasi kerentanan jaringan untuk menyebar dari satu komputer ke komputer lain secara otomatis. Contoh: worm _Code Red_ yang menginfeksi ratusan ribu server dalam beberapa jam.
> >  
> >  ### Ancaman Sistem dan Jaringan (System and Network Threats)
> >  Ancaman ini memanfaatkan konektivitas antar komputer.
> >  
> >  **Zombie Systems (Botnets):**
> >  - Komputer atau perangkat yang telah diretas dan diambil alih oleh penyerang tanpa sepengetahuan pemiliknya.
> >  - Kumpulan dari ribuan _zombie_ ini disebut **botnet**.
> >  - Penyerang menggunakan _botnet_ untuk melakukan serangan skala besar, membuat asal serangan sangat sulit dilacak.
> >  
> >  **Denial of Service (DoS) & Distributed Denial-of-Service (DDoS):**
> >  - **DoS:** Satu penyerang membanjiri satu target dengan lalu lintas untuk membuatnya tidak dapat diakses.
> >  - **DDoS:** Serangan DoS yang diluncurkan dari banyak komputer secara bersamaan (biasanya dari _botnet_). Serangan ini jauh lebih kuat dan sulit untuk dihentikan karena lalu lintas serangan datang dari ribuan sumber yang berbeda, sehingga sulit dibedakan dari lalu lintas pengguna yang sah.
> >  
> > **Port Scanning:**
> > - **Bukan serangan langsung**, melainkan teknik pengintaian (_reconnaissance_).
> > - Penyerang "memindai" rentang alamat IP untuk melihat _port_ (pintu virtual) mana yang terbuka pada sebuah sistem.
> > - _Port_ yang terbuka menunjukkan layanan apa yang berjalan (misalnya, port 80 untuk web server) dan dapat mengindikasikan adanya potensi kerentanan.
> > - _Analogi:_ Seorang pencuri berjalan di sepanjang jalan perumahan, mencoba gagang pintu setiap rumah untuk melihat mana yang tidak terkunci.
> > - Alat yang umum digunakan: `nmap`, `Nessus`.

> [!cornell] #### Summary
> Ancaman keamanan bermanifestasi dalam dua bentuk utama: (1) Ancaman Program, yang menyerang dari dalam melalui malware (seperti Trojan dan Ransomware) dan eksploitasi kerentanan kode seperti _Buffer Overflow_, dan (2) Ancaman Sistem & Jaringan, yang memanfaatkan konektivitas untuk melakukan serangan skala besar seperti DDoS menggunakan pasukan komputer _zombie_ (botnet) dan melakukan pengintaian melalui _port scanning_ untuk menemukan target yang rentan.e

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
> **Mekanisme Pertahanan Modern Terhadap Buffer Overflow:**
>  Sistem operasi modern tidak tinggal diam. Tiga pertahanan utama telah dikembangkan:
> 1. **ASLR (Address Space Layout Randomization):** Lokasi _stack_, _heap_, dan _library_ diacak setiap kali program dijalankan. Ini membuat penyerang tidak tahu persis ke mana harus mengarahkan _return address_ untuk mengeksekusi _shellcode_ mereka.
> 2. **Stack Canaries:** Sebuah nilai acak, yang disebut _canary_, diletakkan di _stack_ tepat sebelum _return address_. Sebelum fungsi kembali, program memeriksa apakah nilai _canary_ ini masih utuh. Jika sudah berubah (karena ditimpa oleh _buffer overflow_), program akan langsung dihentikan, mencegah eksekusi kode berbahaya.
> 3. **DEP/NX Bit (Data Execution Prevention / No-eXecute bit):** Sebuah fitur perangkat keras pada CPU yang memungkinkan OS untuk menandai area memori (seperti _stack_ dan _heap_) sebagai "tidak dapat dieksekusi". Bahkan jika penyerang berhasil menempatkan kode di _stack_ dan mengarahkan eksekusi ke sana, CPU akan menolak untuk menjalankannya.
> 
> **Anatomi Serangan DDoS: Refleksi dan Amplifikasi (Reflection and Amplification):**
> - Ini adalah teknik DDoS yang sangat efisien. Penyerang tidak menyerang korban secara langsung.
> 	1. **Refleksi:** Penyerang mengirimkan permintaan ke server pihak ketiga yang tidak bersalah (misalnya, server DNS atau NTP publik), tetapi **memalsukan alamat IP sumber (IP spoofing)** menjadi alamat IP korban.
> 	2. **Amplifikasi:** Server pihak ketiga kemudian mengirimkan balasan ke alamat IP palsu tersebut (yaitu, ke korban). Penyerang sengaja memilih protokol di mana ukuran balasannya jauh lebih besar daripada ukuran permintaannya. Misalnya, satu permintaan DNS kecil dapat menghasilkan balasan yang 50-70 kali lebih besar
> - Dengan cara ini, penyerang menggunakan _bandwidth_ dan sumber daya server lain untuk menyerang korban, sambil menyembunyikan alamat IP asli mereka dan memperkuat serangan mereka secara eksponensial.
>
> **Worms dan Model Epidemiologi:**
> - Penyebaran worm di internet sangat mirip dengan penyebaran penyakit dalam populasi. Para peneliti menggunakan model matematika dari epidemiologi, seperti model **SIR (Susceptible, Infected, Recovered)**, untuk memprediksi dan menganalisis kecepatan penyebaran worm.
> - **Worm legendaris:**
> 	- **Morris Worm (1988):** Dianggap sebagai worm internet pertama, yang secara tidak sengaja melumpuhkan sebagian besar internet saat itu.
> 	- **Code Red (2001):** Menargetkan server web Microsoft IIS dan menyebar dengan sangat cepat.
> 	- **Stuxnet (~2010):** Worm yang sangat canggih, diduga dibuat oleh negara, yang dirancang untuk secara fisik merusak sentrifugal pengayaan uranium di fasilitas nuklir Iran.
> 
> #### Sumber & Referensi Lanjutan:
> - **Artikel Klasik:**
> 	- **"Smashing The Stack For Fun And Profit" oleh Aleph One:** Artikel legendaris dari tahun 1996 yang mempopulerkan dan menjelaskan teknik eksploitasi _buffer overflow_ secara detail.
> - **Tools (Untuk Tujuan Edukasi dan Etis):**
> 	- **GDB (GNU Debugger):** Alat standar di Linux untuk menganalisis eksekusi program, melihat isi memori dan _stack_, dan memahami cara kerja _buffer overflow_.
> 	- **Wireshark:** Alat penganalisis protokol jaringan yang memungkinkan Anda "melihat" lalu lintas data di jaringan Anda secara mendetail. Sangat berguna untuk memahami serangan berbasis jaringan.
> 	- **Shodan.io:** Mesin pencari untuk perangkat yang terhubung ke internet. Digunakan untuk melihat skala perangkat yang rentan atau terekspos secara global.
>
>#### Eksplorasi Mandiri:
>- **Praktik Buffer Overflow (Aman):** Cari tutorial "buffer overflow example C" yang sederhana. Coba kompilasi kode tersebut di lingkungan Linux yang aman (seperti Virtual Machine) dengan dan tanpa proteksi _stack_ (menggunakan flag `gcc -fno-stack-protector ...`). Amati bagaimana program berperilaku berbeda. **PERINGATAN: Lakukan ini hanya pada sistem tes Anda sendiri.**
> - **Riset Worm Terkenal:** Pilih salah satu worm terkenal (seperti Stuxnet, Conficker, atau Slammer). Lakukan riset tentang bagaimana ia menyebar, apa targetnya, dan apa dampak yang ditimbulkannya. Stuxnet sangat menarik karena ia adalah salah satu contoh pertama _cyberweapon_ yang menyebabkan kerusakan fisik.
> - **Lihat Botnet Secara Langsung:** Kunjungi situs web pemetaan ancaman siber secara _real-time_ (seperti yang dimiliki oleh Fortinet, Kaspersky, atau FireEye). Anda akan melihat visualisasi serangan DDoS dan lalu lintas malware yang terjadi di seluruh dunia secara langsung.