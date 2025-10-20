---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Simulated Annealing?
> >     
> > - Bagaimana SA mengatasi masalah local maximum?
> >     
> > - Apa analogi di balik namanya?
> >     
> > - Apa peran Temperatur (T)?
> >     
> > - Bagaimana probabilitas langkah 'buruk' dihitung?
> >     
> > - Kapan SA mirip Random Walk?
> >     
> > - Kapan SA mirip Hill Climbing?
> >     
> >
> > ## Reference Points
> >
> > - IF3170-Materi03-Seg04-BeyondClassicalSearch-SimulatedAnnealing.pdf
> >     
> 
> > ### Konsep Dasar Simulated Annealing (SA)
> >
> > **Simulated Annealing (SA)** adalah sebuah algoritma Local Search yang merupakan pengembangan dari Stochastic Hill Climbing. Ide utamanya adalah untuk **menghindari jebakan** _**local maximum**_ dengan cara mengizinkan pergerakan ke _state_ yang lebih buruk ("downhill moves") sesekali.
> >
> > - **Kombinasi Strategi**: SA secara cerdas menggabungkan efisiensi **Hill Climbing** (yang cepat menemukan puncak) dengan sifat penjelajahan luas dari **Random Walk** (yang bisa menjangkau seluruh _search space_).
> >     
> > - **Tujuan Utama**: Untuk menemukan _global maximum_ dengan cara melakukan eksplorasi di awal dan secara bertahap fokus pada solusi terbaik (eksploitasi) seiring berjalannya waktu.
> >     
> >
> > ### Analogi: Proses Annealing pada Logam
> >
> > Nama algoritma ini diilhami dari proses _annealing_ dalam metalurgi.
> >
> > 1. **Pemanasan (High Temperature)**: Logam dipanaskan hingga suhu tinggi, membuat atom-atomnya bergerak bebas dan acak. Ini analog dengan **eksplorasi luas** di _search space_, di mana algoritma bisa melompat ke _state_ mana pun, baik atau buruk.
> >     
> > 2. **Pendinginan Lambat (Cooling Down)**: Logam didinginkan secara perlahan. Atom-atom mulai bergerak lebih teratur dan membentuk struktur kristal yang stabil dengan energi internal minimum (sangat kuat). Ini analog dengan **fase eksploitasi**, di mana algoritma secara bertahap mengurangi pergerakan acak dan lebih fokus untuk bergerak ke arah _state_ yang lebih baik.
> >     
> > ![[Pasted image 20250921223035.png]]
> > 
> > ### Mekanisme Pengambilan Keputusan
> >
> > SA menggunakan _random successor_ sebagai _neighbor_. Keputusan untuk pindah ke _neighbor_ tersebut bergantung pada dua faktor utama: **perubahan nilai (**$\Delta E$**)** dan **temperatur (T)**.
> >
> > $$\Delta E= \text{neighbor.VALUE}−\text{current.VALUE}$$  
> >     
>>
> > 1. **Jika** _**neighbor**_ **lebih baik ($\Delta E \geq 0$)**: Algoritma **selalu** menerima langkah tersebut dan pindah ke _neighbor_. (Sama seperti Hill Climbing).
> >     
> > 2. **Jika** _**neighbor**_ **lebih buruk ($\Delta E <0$)**: Algoritma mungkin masih menerima langkah tersebut, tetapi berdasarkan sebuah probabilitas yang dihitung dengan rumus:
> >     
> >     $$P(\text{pindah})=e^{\Delta E/T}$$
> >         
> > ![[Pasted image 20250921223120.png]]
> > ![[Pasted image 20250921223134.png]]
> > 
> > ### Peran Temperatur (T)
> >
> > **Temperatur (T)** adalah parameter krusial yang dikontrol oleh sebuah _schedule_ (jadwal), di mana nilainya menurun seiring waktu.
> >
> > - **Saat T tinggi (awal pencarian)**:
> > 	- Nilai $\Delta E/T$ mendekati 0.
> > 	- Nilai $e^{\Delta E/T}$ mendekati 1.
> > 	- Artinya, probabilitas untuk menerima langkah buruk **sangat tinggi**. Algoritma berperilaku seperti **Random Walk**, bebas menjelajahi lanskap.
> >
> > - **Saat T mendekati 0 (akhir pencarian)**:
> > 	- Nilai $\Delta E/T$ menjadi angka negatif yang sangat besar.
> > 	- Nilai $e^{\Delta E/T}$ mendekati 0.
> > 	- Artinya, probabilitas untuk menerima langkah buruk **sangat rendah**. Algoritma hampir tidak pernah mengambil langkah menurun dan berperilaku seperti **Stochastic Hill Climbing**.
> > 
> > ![[Pasted image 20250921222827.png]]
> >
> > ### Properti dan Jaminan
> >
> > Secara teoretis, jika parameter temperatur (T) diturunkan dengan sangat lambat (_slowly enough_), Simulated Annealing dijamin akan menemukan **global optimum** dengan probabilitas mendekati 1. Karena properti ini, SA menjadi algoritma yang sangat populer dan banyak digunakan untuk masalah optimisasi yang kompleks seperti desain sirkuit VLSI dan penjadwalan maskapai penerbangan.

> [!cornell] #### Summary
> Simulated Annealing adalah algoritma optimisasi probabilistik yang mampu keluar dari _**local maximum**_ dengan cara terkadang menerima solusi yang lebih buruk. Kemampuan ini diatur oleh parameter "Temperatur" (T) yang menurun seiring waktu; pada suhu tinggi, algoritma bebas menjelajah seperti _**random walk**_, dan pada suhu rendah, ia menjadi lebih "serakah" seperti _**Hill Climbing**_, memungkinkannya untuk secara bertahap beralih dari eksplorasi luas ke eksploitasi solusi yang menjanjikan.

> [!ad-libitum]- Additional Information
> 
> #### Cooling Schedule
> 
> "Seberapa cepat T harus turun?" adalah pertanyaan paling penting dalam implementasi SA. Ini disebut _cooling schedule_.
> 
> - **Terlalu Cepat**: Jika T turun terlalu cepat, algoritma tidak punya cukup waktu untuk menjelajah dan akan terjebak di _local maximum_ pertama yang ditemuinya (mirip Hill Climbing).
>     
> - **Terlalu Lambat**: Jika T turun terlalu lambat, algoritma akan membuang banyak waktu untuk melakukan _random walk_ dan konvergensinya menjadi sangat lama.
>     
> 
> Jadwal yang umum digunakan adalah pendinginan geometris: $T_{new}=\alpha \times T_{old}$ (di mana alpha adalah konstanta pendinginan, misal 0.99).
> 
> #### Penerapan di Luar 8-Queens
> 
> Konsep SA sangat fleksibel. Contohnya dalam _Natural Language Processing_ (NLP) untuk tugas _paraphrasing_ (membuat ulang kalimat dengan makna sama).
> 
> - **State**: Sebuah kalimat.
>     
> - **Neighbor**: Kalimat hasil satu kali editan kecil (misal: ganti satu kata, hapus satu kata, tambah satu kata).
>     
> - **Value ($\Delta E$)**: Perubahan skor "kualitas" parafrase.
>     
> - **Proses**: SA akan mencoba berbagai kombinasi editan, terkadang menerima parafrase yang sedikit lebih buruk untuk keluar dari "gaya bahasa" yang monoton dan menemukan variasi yang lebih baik.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Ambil sebuah _state_ dari 8-Queens dengan h=−1. Pilih sebuah _neighbor_ acak yang memiliki h=−2.
>     
> - Coba hitung probabilitas kepindahan ($e^{\Delta E/T}$) dengan dua nilai T yang berbeda: T=10 (tinggi) dan T=0.5 (rendah).
>     
> - Apa yang bisa Anda simpulkan dari perbedaan hasil probabilitas tersebut?
>