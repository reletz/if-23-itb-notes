---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Introduction to Bayesian Networks (Structure & Components)
> 
> > ## Questions/Cues
> >
> > - Definisi Probabilistic Reasoning
> >     
> > - Joint Probability vs BN
> >     
> > - Komponen BN
> >     
> > - Struktur DAG
> >     
> > - CPT (Conditional Probability Table)
> >     
> > - Reduksi Kompleksitas
> >     
> >
> > ## Reference Points
> >
> > - File: `27. IF3170_Materi12_Seg01...pdf`
> >     
> > - Halaman: 1-3, 8-12
> >     
> 
> > ### 1. Probabilistic Reasoning System (PRS)
> >
> > PRS adalah bentuk _Supervised Learning_ dengan ketidakpastian (Non-Deterministic).
> >
> > - **Fungsi:** Menghitung peluang kejadian $x$ berdasarkan kondisi/bukti $e$ ($P(x|e)$).
> >     
> > - **Dasar:** Teori probabilitas sebagai model "derajat kepercayaan" (_degree of belief_).
> >     
> >
> > ### 2. Masalah Joint Probability Distribution
> >
> > Untuk merepresentasikan dunia dengan $N$ variabel biner, distribusi probabilitas gabungan (_Full Joint Probability Distribution_) membutuhkan $2^N$ nilai probabilitas.
> >
> > - Jika $N=5$, butuh $2^5 = 32$ entri.
> >     
> > - Jika $N$ besar, ukuran tabel menjadi _intractably large_ (terlalu besar untuk dikelola).
> >     
> >
> > ### 3. Solusi: Bayesian Network (BN)
> >
> > BN (disebut juga _Belief Nets_ atau _Causal Networks_) memanfaatkan hubungan **independensi** antar variabel untuk mengurangi jumlah probabilitas yang perlu disimpan secara drastis.
> >
> > - Contoh $N=5$: Full Joint butuh 32 nilai, BN dengan struktur kausal mungkin hanya butuh 20 nilai.
> >     
> >
> > ### 4. Struktur & Komponen BN
> >
> > BN merepresentasikan ketergantungan kausal secara grafis.
> > 
> > ![[Pasted image 20251208093747.png]]
> >
> > - **Struktur:** Harus berupa **DAG (Directed Acyclic Graph)**. Tidak boleh ada _cycle_ (loop).
> >     
> > - **Nodes:** Merepresentasikan variabel kejadian (misal: Burglary, Earthquake).
> >     
> > - **Arcs (Panah):** Merepresentasikan hubungan sebab-akibat (_causal dependencies_). Arah panah dari _Cause_ ke _Effect_.
> >     
> > - **Numerical Parameters:**
> >     
> > 	- Untuk node tanpa orang tua (_root_): Probabilitas Prior ($P(A)$).
> > 			
> > 	- Untuk node dengan orang tua: Tabel Probabilitas Kondisional / **CPT** ($P(Effect | Cause)$).
> > 			
> >
> > ### 5. Topologi Jaringan
> >
> > ![[Pasted image 20251208093704.png]]
> >
> > Topologi menentukan asumsi independensi. Node $X$ dipengaruhi langsung oleh _Parents_-nya. BN encoding informasi: "Diberikan _parents_-nya, sebuah node independen terhadap _non-descendants_-nya".

> [!cornell] #### Summary
> 
> **Bayesian Network** adalah solusi efisien untuk merepresentasikan ketidakpastian dibandingkan Tabel Joint Probability yang eksponensial. BN menggunakan struktur grafik **DAG** di mana _Node_ adalah variabel dan _Arc_ adalah hubungan kausal. Efisiensi BN berasal dari pemanfaatan sifat **Conditional Independence** antar variabel, sehingga kita hanya perlu menyimpan Tabel Probabilitas Kondisional (CPT) lokal untuk setiap node.

> [!ad-libitum]- Ad Libitum: Ilustrasi Joint Probability vs BN
> 
> **Bayangkan N=5 Variabel Biner:**
> 
> - **Cara Lama (Joint Distribution):** Anda harus menuliskan tabel raksasa dengan $2^5 = 32$ baris, di mana setiap baris adalah kombinasi kejadian (T,T,F,T,F) beserta peluangnya.
>     
> - **Cara BN:** Anda menggambar peta penyebab. Jika A menyebabkan B, Anda hanya simpan $P(B|A)$. Jika C tidak berhubungan dengan A dan B, Anda tidak perlu menyimpan $P(C|A,B)$. Ini menghemat memori dan komputasi secara masif.
>     

> [!ad-libitum]- Spaced Repetition Questions
> 
> <details>
> 
> <summary><strong>1. Apa syarat utama struktur grafik pada Bayesian Network?</strong></summary>
> 
> Grafik harus berupa <strong>DAG (Directed Acyclic Graph)</strong>, artinya memiliki arah panah dan tidak boleh ada siklus/loop yang kembali ke node asal.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Bagaimana BN mengurangi kompleksitas penyimpanan dibandingkan Full Joint Probability?</strong></summary>
> 
> Dengan memanfaatkan hubungan <strong>independensi kondisional</strong>. Alih-alih menyimpan semua kombinasi kemungkinan ($2^N$), BN hanya menyimpan probabilitas lokal (CPT) berdasarkan hubungan parent-child.
> 
> </details>