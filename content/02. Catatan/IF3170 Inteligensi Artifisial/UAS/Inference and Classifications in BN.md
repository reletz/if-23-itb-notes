---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Inference & Classification in Bayesian Network
> 
> > ## Questions/Cues
> >
> > - Definisi Inference
> >     
> > - Query & Evidence
> >     
> > - Rumus Chain Rule BN
> >     
> > - Contoh Perhitungan
> >     
> > - MAP Classification
> >     
> > - Normalisasi ($\alpha$)
> >     
> >
> > ## Reference Points
> >
> > - File: `29. IF3170_Materi12_Seg03_04...pdf`
> >     
> > - Halaman: 3-8, 13
> >     
> 
> > ### 1. Konsep Inference
> >
> > Inference adalah proses menghitung probabilitas posterior dari variabel _Query_ ($Q$) diberikan variabel _Evidence_ ($e$).
> >
> > - **Target:** $P(Q | e)$.
> >     
> > - Chain Rule BN: Probabilitas gabungan dalam BN adalah perkalian probabilitas setiap node diberikan parents-nya:
> >     
> >     $$P(x_1, ..., x_n) = \prod_{i=1}^{n} P(x_i | parents(x_i))$$
> >
> > ### 2. Contoh Perhitungan Inference
> > 
> > ![[Pasted image 20251208094239.png]]
> >
> > Kasus: Ikan (Fish).
> >
> > - Variables: A (Time), B (Loc), X (Fish Type: Salmon/Seabass), C (Lightness), D (Thickness).
> >     
> > - Query: ![[Pasted image 20251208094454.png]]
> > $$P(a3, b1, x2, c3, d2)$$
> >     
> > - Hitung: $P(a3) P(b1) P(x2|a3,b1) P(c3|x2) P(d2|x2)$.
> >     
> > 	(Ambil nilai dari CPT yang tersedia).
> > 	
> > 	$= 0.25 \times 0.6 \times 0.6 \times 0.5 \times 0.4 = 0.012$.
> >     
> >
> > ### 3. Classification dengan BN
> >
> > Klasifikasi adalah bentuk inferensi spesifik di mana kita ingin menentukan kelas ($X$) berdasarkan atribut yang diamati ($e$).
> >
> > - **Tujuan:** Mencari **MAP (Maximum A Posteriori)**. Bandingkan $P(x_1|e)$ vs $P(x_2|e)$.
> >     
> > - Rumus:
> >     
> > 	$$P(X|e) = P(X, e)/ P(e) =\alpha P(X, e) = \alpha \sum_{y} P(X, e, y)$$
> > 	
> > 	Dimana $y$ adalah variabel hidden (tidak diketahui) yang harus dijumlahkan (summed out). $\alpha$ adalah konstanta normalisasi ($1/P(e)$).
> >     
> >
> > ### 4. Langkah Klasifikasi (Contoh Ikan)
> >
> > Diketahui: Light ($c1$), South Atlantic ($b2$). Apa jenis ikannya ($X$)?
> > 
> > ![[Pasted image 20251208094928.png]]
> > - Target: Bandingkan $P(x1 | c1, b2)$ dan $P(x2 | c1, b2)$.
> >     
> >
> > - Langkah 1: Hitung untuk x1 (Salmon)
> >     
> > 	Kita harus menjumlahkan semua kemungkinan variabel $A$ (Time) dan $D$ (Thickness) karena tidak diketahui.
> > 	
> > 	$$P(x1, c1, b2) = \sum_A \sum_D P(A) P(b2) P(x1|A,b2) P(c1|x1) P(D|x1)$$
> > 	
> > 	Karena $\sum P(D|x1) = 1$ (karena $x$ parent $D$), variabel D bisa diabaikan dalam penjumlahan.
> > 	
> > 	Fokus pada penjumlahan terhadap A:
> > 	
> > 	$= P(b2) P(c1|x1) \times [\sum_{i=1}^{4} P(a_i) P(x1|a_i, b2)]$
> > 	
> > 	$= \text{Konstanta} \times \text{Hasil Sum A} = 0.114$ (misal).
> >     
> >
> > - Langkah 2: Hitung untuk x2 (Sea bass)
> >     
> >     Lakukan hal sama untuk $x2$. Misal hasil = $0.042$.
> >     
> >
> > - Langkah 3: Normalisasi & Keputusan
> > 	
> > 	Total = $0.114 + 0.042 = 0.156$.
> > 	
> > 	- $P(x1|...) = 0.114 / 0.156 = 0.73$.
> > 	
> > 	- $P(x2|...) = 0.042 / 0.156 = 0.27$.
> > 	
> > 	Keputusan: x1 (Salmon).
> >     

> [!cornell] #### Summary
> 
> Inference dalam BN menggunakan **Chain Rule** ($P(Joint) = \prod P(Node|Parents)$). Untuk klasifikasi dengan data yang tidak lengkap (_incomplete evidence_), kita harus melakukan **marginalisasi** (penjumlahan) terhadap variabel yang tidak diketahui (_hidden variables_). Hasil akhirnya dinormalisasi ($\alpha$) untuk mendapatkan probabilitas posterior $P(Class|Evidence)$ guna mengambil keputusan.

> [!ad-libitum]- Spaced Repetition Questions
> 
> <details>
> 
> <summary><strong>1. Apa fungsi konstanta alpha ($\alpha$) dalam rumus inferensi?</strong></summary>
> 
> Untuk <strong>menormalisasi</strong> hasil perhitungan agar total probabilitas semua kemungkinan kelas berjumlah 1.0. $\alpha = 1 / P(evidence)$.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jika ada variabel yang tidak diketahui (hidden variable) dalam proses klasifikasi, apa yang harus dilakukan?</strong></summary>
> 
> Kita harus melakukan <strong>summation (penjumlahan)</strong> probabilitas atas semua kemungkinan nilai variabel tersebut (Marginalisasi).
> 
> </details>