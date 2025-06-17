---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2281 Statistika nonparametrik]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > - Apa tujuan utama Uji Tukey?
> > - Mengapa uji t-test biasa tidak bisa digunakan?
> > - Apa itu _Experiment-wise Error Rate_?
> > - Bagaimana prosedur lengkap Uji Tukey?
> > - Apa itu statistik _studentized range_ (q)?
> > - Bagaimana aturan keputusannya?
> > - Bagaimana contoh perhitungannya?
> 
> > ### Tujuan dan Masalah Perbandingan Ganda
> > **Uji Tukey**, sering disebut juga _Tukey's Honestly Significant Difference (HSD) test_, adalah sebuah **uji post-hoc** atau uji perbandingan ganda. Tujuannya adalah untuk mengidentifikasi **pasangan rerata mana yang secara spesifik berbeda satu sama lain**, _setelah_ uji ANOVA secara keseluruhan menunjukkan hasil yang signifikan (yaitu, setelah kita menolak H0​ bahwa semua rerata adalah sama).
> > 
> > - **Masalah Penggunaan Uji-t Berulang Kali**:
> >     - Melakukan uji-t standar secara berulang untuk setiap pasangan rerata adalah tindakan yang **tidak tepat**.
> >     - Alasannya adalah **inflasi Galat Tipe I**. Jika kita melakukan banyak perbandingan, masing-masing dengan taraf signifikansi α (misalnya, 0.05), probabilitas untuk membuat setidaknya satu kesalahan Tipe I (menyatakan ada perbedaan padahal tidak ada) di seluruh rangkaian perbandingan akan menjadi jauh lebih besar dari α.
> > - _**Experiment-wise Error Rate**_:
> >     - Ini adalah probabilitas untuk membuat **setidaknya satu Galat Tipe I** dalam satu "keluarga" atau set perbandingan dalam satu eksperimen.
> >     - Jika kita melakukan r perbandingan independen, laju galat ini dihitung sebagai: 1−(1−α)r.
> >     - **Contoh**: Jika kita membandingkan k=4 rerata, ada r=6 kemungkinan perbandingan pasangan. Jika α=0.05, maka _experiment-wise error rate_-nya adalah 1−(0.95)6≈0.26 atau 26%, yang jauh lebih tinggi dari 5% yang diinginkan.
> >     - Uji Tukey dirancang untuk **mengontrol _experiment-wise error rate_ ini** pada level α yang kita tentukan.
> > 
> > ### Prosedur dan Aturan Keputusan Uji Tukey
> > Uji Tukey menggunakan satu nilai kritis tunggal untuk mengevaluasi semua selisih rerata pasangan.
> > 1. **Konsep Utama**: Uji ini didasarkan pada **distribusi rentang terstudentisasi (studentized range distribution)**. Statistik dari distribusi ini dilambangkan dengan q.  
> > 2. Aturan Keputusan: Perbedaan antara dua rerata sampel (y​i.​ dan y​j.​) dianggap signifikan jika nilai absolut dari selisihnya melebihi nilai kritis yang disebut HSD (Honestly Significant Difference).
> >     ![[Pasted image 20250612235636.png]]
> >     
> > 3. Formula HSD:
> >     ![[Pasted image 20250612235644.png]]
> >     
> >     - **q(α,k,v)**: Nilai kritis dari tabel _studentized range_ (Tabel A.12).
> >         - α: Taraf signifikansi _experiment-wise_ yang diinginkan (misalnya 0.05 atau 0.01).
> >         - k: Jumlah total kelompok/perlakuan yang dibandingkan.
> >         - v: Derajat kebebasan untuk galat (N−k), diambil dari tabel ANOVA.
> >     - **MSE**: _Mean Square Error_ (Kuadrat Tengah Galat atau s2) dari tabel ANOVA.
> >     - **n**: Ukuran sampel per kelompok (Uji Tukey standar mengasumsikan ukuran sampel sama).
> > 
> > ### Contoh Perhitungan Lengkap
> > 
> > Misalkan sebuah eksperimen memiliki k=6 perlakuan, dengan n=5 observasi per perlakuan. Dari tabel ANOVA, kita mendapatkan MSE=2.45 dengan v=24 derajat kebebasan.
> > 
> > - **1. Urutkan Rerata Sampel**: Rerata sampel dari yang terkecil hingga terbesar adalah:
> >     
> >     - y​2.​=14.50
> >     - y​5.​=16.75
> >     - y​1.​=19.84
> >     - y​3.​=21.12
> >     - y​6.​=22.90
> >     - y​4.​=23.20
> > - **2. Tentukan Nilai Kritis (q) dan Hitung HSD**:
> >     
> >     - Untuk α=0.05, k=6, dan v=24, nilai dari Tabel A.12 adalah q(0.05,6,24)=4.37.
> >     - Hitung nilai HSD:
> >     ![[Pasted image 20250612235707.png]]
> > - **3. Bandingkan Semua Selisih Pasangan dengan HSD**:
> >     
> >     - Selisih terbesar: ∣y​4.​−y​2.​∣=∣23.20−14.50∣=8.70. Karena 8.70>3.059, rerata 4 dan 2 **berbeda signifikan**.
> >     - Selisih lain: ∣y​6.​−y​2.​∣=∣22.90−14.50∣=8.40. Karena 8.40>3.059, rerata 6 dan 2 **berbeda signifikan**.
> >     - Lanjutkan untuk semua pasangan...
> >     - Selisih terkecil antara rerata yang tidak bersebelahan: ∣y​1.​−y​5.​∣=∣19.84−16.75∣=3.09. Karena 3.09>3.059, rerata 1 dan 5 juga **berbeda signifikan**.
> > - **4. Kesimpulan**: Buat daftar semua pasangan yang selisihnya melebihi 3.059. Berdasarkan contoh, ada 10 pasang rerata yang ditemukan berbeda signifikan.
> >     

> [!cornell] #### Summary
>  Uji Tukey (HSD) adalah uji perbandingan ganda yang digunakan setelah ANOVA signifikan untuk mengidentifikasi pasangan rerata mana yang berbeda, dengan keunggulan utama mampu **mengontrol _experiment-wise error rate_**. Prosedurnya adalah menghitung satu nilai kritis tunggal (HSD) menggunakan statistik _studentized range_ (q), kemudian membandingkan selisih absolut dari setiap pasangan rerata dengan nilai HSD tersebut. Jika selisihnya lebih besar dari HSD, pasangan rerata tersebut dianggap berbeda secara signifikan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Pendekatan Interval Kepercayaan
> 
> - Secara konseptual, Uji Tukey setara dengan membuat **interval kepercayaan simultan** untuk semua selisih pasangan rerata. Rumusnya adalah: 
> 	![[Pasted image 20250612235838.png]]
>     - atau
>     
> 	 ![[Pasted image 20250612235824.png]]​
> - Jika interval kepercayaan yang dihasilkan untuk sebuah pasangan **tidak mencakup nol**, maka kedua rerata tersebut dianggap berbeda secara signifikan pada taraf α. Ini memberikan cara lain untuk memvisualisasikan dan memahami hasil uji.
> 
> #### Asumsi
> 
> - Uji Tukey mengasumsikan hal yang sama dengan ANOVA, termasuk normalitas, independensi, dan homogenitas ragam. Versi standar dari Uji Tukey juga dirancang untuk **ukuran sampel yang sama** di setiap kelompok. Untuk ukuran sampel yang tidak sama, variasi yang lebih umum digunakan adalah uji **Tukey-Kramer**.