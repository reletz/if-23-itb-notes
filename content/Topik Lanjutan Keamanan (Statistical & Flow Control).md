---


type: Note

cssclasses:

- cornell-notes
---
_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic: Topik Lanjutan Keamanan (Statistical & Flow Control)
> 
> > ## Questions/Cues
> > 
> > - Apa itu Statistical Database Security?
> >     
> > - Mengapa query statistik bisa berbahaya?
> >     
> > - Apa itu Flow Control?
> >     
> > - Apa tujuan utama Flow Control?
> >     
> > - Apa yang dimaksud dengan Covert Channel?
> >     
> > - Apa saja dua jenis Covert Channel?
> >     
> 
> > ## Reference Points
> > 
> > - Slides 37-43: Database Security.pdf
> >     
> 
> > ### Introduction to Statistical Database Security
> > 
> > **Statistical Database Security** adalah serangkaian teknik yang bertujuan untuk menyediakan data statistik tentang suatu populasi tanpa mengungkapkan informasi rahasia mengenai individu di dalam populasi tersebut.
> > 
> > - **Tujuan:** Pengguna diizinkan untuk melakukan query agregat (seperti `COUNT`, `SUM`, `AVERAGE`, `MIN`, `MAX`) untuk mendapatkan wawasan statistik.
> >     
> > - **Larangan:** Pengguna dilarang keras untuk mengambil data individu secara langsung.
> >     
> > - **Ancaman Utama (Inference):** Meskipun akses individu dilarang, seorang pengguna yang cerdik dapat menyimpulkan data rahasia individu dengan cara melakukan serangkaian query statistik secara strategis. Terutama jika query tersebut menargetkan populasi yang sangat kecil (misalnya, "Berapa rata-rata gaji pegawai IT yang berusia 59 tahun di departemen X?", jika hanya ada satu orang yang cocok dengan kriteria tersebut).
> >     
> > - **Tanggung Jawab DBMS:** DBMS harus memastikan kerahasiaan individu tetap terjaga sambil tetap menyediakan data statistik yang berguna.
> >     
> > 
> > ### Introduction to Flow Control
> > 
> > **Flow Control** adalah mekanisme keamanan yang mengatur distribusi atau aliran informasi antar objek dalam sistem. Tujuannya adalah untuk memastikan informasi tidak mengalir ke tempat yang tidak semestinya.
> > 
> > - **Konsep Aliran:** Aliran informasi dari objek X ke objek Y terjadi ketika sebuah program membaca data dari X dan kemudian menulis data ke Y.
> >     
> > - **Flow Policy:** Kebijakan ini mendefinisikan kanal-kanal mana saja yang diizinkan untuk aliran informasi. Contoh kebijakan paling sederhana adalah membagi informasi menjadi dua kelas: `Confidential (C)` dan `Non-confidential (N)`, dan melarang semua aliran dari `C` ke `N`.
> >     
> > - **Kaitan dengan MAC:** Konsep ini sangat erat kaitannya dengan aturan "No Write Down" (_-property_) pada model Mandatory Access Control (MAC), yang secara eksplisit mencegah aliran informasi dari level keamanan tinggi ke rendah.
> >     
> > 
> > ### Covert Channels: Kebocoran Tersembunyi
> > 
> > **Covert Channel** adalah jalur komunikasi tersembunyi yang memungkinkan transfer informasi yang melanggar kebijakan keamanan. Secara esensial, ini adalah celah yang tidak dirancang untuk komunikasi, namun dieksploitasi untuk membocorkan data dari level keamanan tinggi ke rendah secara diam-diam.
> > 
> > Terdapat dua jenis utama:
> > 
> > 1. **Storage Channels:** Informasi dibocorkan dengan cara memodifikasi atau mengakses atribut sistem yang bisa diamati oleh pihak lain. Contoh: Sebuah proses rahasia membuat atau menghapus file sementara, dan proses lain di level lebih rendah memantau keberadaan file tersebut untuk menerima sinyal '1' atau '0'.
> >     
> > 2. **Timing Channels:** Informasi dibocorkan melalui pengaturan waktu suatu kejadian atau proses. Contoh: Sebuah proses rahasia memanipulasi beban kerja CPU (menjadi sibuk atau idle) dalam pola tertentu, dan proses lain di level lebih rendah mengukur waktu respon sistem untuk menerjemahkan pola tersebut menjadi data.
> >     

> [!cornell] #### Summary
> Keamanan database lanjutan mencakup perlindungan data dalam skenario khusus. _**Statistical Database Security**_ bertujuan melindungi privasi individu saat menyediakan data agregat, namun rentan terhadap serangan inferensi. Sementara itu, _**Flow Control**_ mencegah kebocoran informasi antar level keamanan, meskipun keberadaan _**Covert Channels**_ (Storage dan Timing) tetap menjadi ancaman tersembunyi yang dapat menembus pertahanan ini.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Mitigasi Serangan Inferensi
>  
>  Salah satu cara paling umum untuk mencegah serangan inferensi pada database statistik adalah dengan menerapkan aturan **"Query Size Restriction"**. Sistem akan menolak untuk menjalankan query statistik jika jumlah individu (kardinalitas) dalam populasi yang ditargetkan berada di bawah ambang batas tertentu (misalnya, < 5 orang) atau di atas ambang batas tertentu (misalnya, > N-5, di mana N adalah total populasi). Ini membuat penargetan individu atau kelompok kecil menjadi jauh lebih sulit.
>  
>  #### Eksplorasi Mandiri
>  
>  Pelajari konsep modern dalam privasi data yang disebut **Differential Privacy**. Ini adalah pendekatan matematis yang menambahkan "noise" (gangguan acak) pada hasil query statistik. Noise ini cukup kecil sehingga tidak terlalu memengaruhi akurasi statistik secara keseluruhan, tetapi cukup besar untuk membuat mustahil untuk menyimpulkan informasi tentang satu individu tertentu, tidak peduli berapa banyak query yang dijalankan.
>  
>  #### Sumber & Referensi Lanjutan:
>  
>  - Cynthia Dwork: "The Promise of Differential Privacy: A Tutorial on Algorithmic Grace" - Sebuah pengantar yang sangat baik mengenai Differential Privacy.
>      
>  - Materi tentang "Covert Channel Analysis" dalam literatur keamanan sistem operasi.
> 