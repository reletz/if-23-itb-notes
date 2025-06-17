---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2281 Statistika nonparametrik]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > - Apa tujuan utama Uji Bartlett?
> > - Kapan uji ini sangat disarankan?
> > - Apa hipotesis yang diuji?
> > - Bagaimana prosedur lengkap perhitungannya?
> > - Apa itu statistik uji b?
> > - Bagaimana aturan keputusan untuk sampel sama vs. tidak sama?
> > - Bagaimana contoh perhitungan detailnya?
> 
> > ### Tujuan dan Konsep Dasar
> >
> > **Uji Bartlett** adalah sebuah prosedur statistik yang digunakan sebagai uji pendahuluan untuk memverifikasi asumsi **homogenitas ragam** (kesamaan ragam) di antara beberapa populasi. Tujuannya adalah untuk menguji hipotesis nol bahwa semua ragam populasi adalah sama. 
> > - Konteks Penggunaan:
> > 	- Uji ini sering digunakan sebelum melakukan Analisis Ragam (ANOVA).
> >     
> >     - Meskipun uji F dalam ANOVA cukup kuat (tidak terlalu terpengaruh) terhadap pelanggaran asumsi kesamaan ragam jika ukuran sampel sama,  uji pendahuluan seperti Bartlett sangat disarankan jika ukuran sampel tidak sama dan ada keraguan mengenai kesamaan ragam populasi. 
> >     
> > - Hipotesis yang Diuji: 
> >     > - Hipotesis Nol (H0​): Ragam dari semua k populasi adalah sama. 
> >     $$H_0​:\sigma_1^2=\sigma_2^2=\dots=\sigma_n^2$$​
> >     > - Hipotesis Alternatif (H1​): Tidak semua ragam populasi sama. 
> >     
> > 
> > ### Prosedur Uji Bartlett
> >
> > Prosedur ini melibatkan perhitungan statistik uji yang disebut b, yang mengikuti sebaran Bartlett. 8
> >
> > 1. **Hitung Ragam Sampel ($s_i^2$​)**: Untuk setiap k kelompok, hitung ragam sampelnya $(s_1^2​,s_2^2​,...,s_k^2​)$ dari sampel yang berukuran $n_1​,n_2​,...,n_k$​. Total ukuran sampel adalah $\sum^k_{i=1} n_i$ 
> >     
> > 2. **Hitung Ragam Gabungan ($s_p^2​$)**: Gabungkan semua ragam sampel untuk mendapatkan satu penduga ragam gabungan (pooled variance estimate). Ini adalah rata-rata tertimbang dari ragam-ragam sampel.
> >     ![[Pasted image 20250612233242.png]]
> >     
> > 3. Hitung Statistik Uji (b): Statistik b pada dasarnya membandingkan rata-rata geometris tertimbang dari ragam sampel (pembilang) dengan rata-rata aritmetika tertimbang (penyebut).
> >     
> >     ![[Pasted image 20250612233253.png]]
> >     
> > 
> > ### Aturan Keputusan dan Nilai Kritis
> > 
> > Aturan keputusan Uji Bartlett bergantung pada apakah ukuran sampel untuk setiap kelompok sama atau tidak. Uji ini merupakan **uji sisi kiri**, di mana nilai b yang kecil menunjukkan penolakan H0​.
> > 
> > - **Kasus 1: Ukuran Sampel Sama (n1​=n2​=⋯=n)**
> >     
> >     - Aturan: Tolak H0​ jika nilai b yang dihitung lebih kecil dari nilai kritisnya. 
> >     ![[Pasted image 20250612233406.png]]
> >     
> >     - Nilai kritis bk​(α;n) diperoleh dari Tabel A.10 berdasarkan taraf signifikansi α, jumlah kelompok k, dan ukuran sampel per kelompok n. 
> >     
> > - **Kasus 2: Ukuran Sampel Tidak Sama**
> >     
> >     - Aturan: Tolak H0​ jika b lebih kecil dari nilai kritis terbobotnya. 
> >     ![[Pasted image 20250612233431.png]]
> >     
> >     - Karena tabel tidak menyediakan nilai kritis untuk setiap kombinasi ukuran sampel yang tidak sama, nilai kritisnya diaproksimasi menggunakan pembobotan berikut:
> >     ![[Pasted image 20250612233443.png]]
> >     
> >     - Setiap nilai bk​(α;ni​) individu diambil dari Tabel A.10.
> >     
> > 
> > ### Contoh Perhitungan Lengkap (Ukuran Sampel Tidak Sama)
> >
> > Menggunakan data dari Contoh 13.2, kita akan menguji kesamaan ragam dari empat kelompok obat dengan α=0.01.
> >
> > - **Konteks**: k=4 kelompok obat, dengan ukuran sampel n1​=20,n2​=9,n3​=9,n4​=7. Total sampel N=45.
> >     
> > 1. **Hitung Nilai Kritis Aproksimasi**:
> > ![[Pasted image 20250612233600.png]]
> > ![[Pasted image 20250612233608.png]]
> > 2. **Hitung Ragam Sampel dan Ragam Gabungan**:
> > ![[Pasted image 20250612233623.png]]
> > 3. **Hitung Statistik Uji b**:
> > ![[Pasted image 20250612233642.png]]
> > 4. **Keputusan**:
> >     - Bandingkan nilai b hitung dengan nilai kritis: 0.8557 vs. 0.7513. > - Karena 0.8557 **tidak lebih kecil** dari 0.7513, kita **gagal menolak H0​**. 
> >     - **Kesimpulan**: Tidak ada cukup bukti untuk menyatakan bahwa ragam populasi dari keempat kelompok obat tersebut berbeda. 18
> >         

> [!cornell] #### Summary
> 
>  Uji Bartlett adalah metode statistik formal untuk menguji hipotesis nol bahwa ragam dari beberapa populasi adalah sama, sebuah asumsi penting untuk ANOVA, terutama ketika ukuran sampel tidak sama. Uji ini menggunakan statistik b, yang membandingkan rata-rata geometris dan aritmetis dari ragam sampel. Keputusan dibuat dengan membandingkan nilai b hitung dengan nilai kritis dari tabel (uji sisi kiri); jika b lebih kecil, hipotesis kesamaan ragam ditolak.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Sensitivitas terhadap Normalitas
> 
> - Meskipun sangat berguna, Uji Bartlett diketahui cukup sensitif terhadap pelanggaran asumsi normalitas data. Jika data dalam kelompok tidak berasal dari distribusi normal, Uji Bartlett mungkin akan menolak hipotesis kesamaan ragam padahal sebenarnya ragamnya sama. Oleh karena itu, penting untuk memeriksa asumsi normalitas terlebih dahulu atau mempertimbangkan uji alternatif yang lebih kuat terhadap non-normalitas (seperti Uji Levene) jika asumsi normalitas diragukan.
> 
> #### Konteks dalam ANOVA
> 
> - Jika Uji Bartlett menghasilkan penolakan H0​ (ragam tidak sama), terutama pada kasus ukuran sampel tidak sama, hasil dari uji F pada ANOVA menjadi kurang dapat dipercaya. Dalam situasi seperti itu, seorang analis mungkin perlu melakukan transformasi data (misalnya, transformasi logaritmik) untuk menstabilkan ragam atau menggunakan versi ANOVA yang tidak mengasumsikan kesamaan ragam (seperti Welch's ANOVA).