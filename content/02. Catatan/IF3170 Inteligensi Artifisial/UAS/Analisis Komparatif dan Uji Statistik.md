---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Comparative Analysis & Error Analysis (Pengukuran Kinerja Model - Part 3)
> 
> > ## Questions/Cues
> >
> > - Dampak Imbalanced Data
> >     
> > - Studi Kasus Churn
> >     
> > - Analisis Error (Error Analysis)
> >     
> > - Uji Statistik McNemar
> >     
> > - Hipotesis Null (H0)
> >     
> > - P-value & Critical Value
> >     
> > - Chi-Square Statistic
> >     
> >
> > ## Reference Points
> >
> > - Slides: 20-29
> >     
> > - Topik: Analisis Hasil
> >     
> 
> > ### 1. Studi Kasus: Balanced vs Representative Dataset
> >
> > > > Membandingkan Classifier A dan B pada kasus prediksi Churn (Pelanggan berhenti).
> >
> > - **Situasi:** Rasio Churn (Positif) banding Tidak Churn (Negatif) di dunia nyata adalah 1:9 (10% churn).
> >     
> > - **Skenario Pelatihan:** Kedua model dilatih pada data yang diseimbangkan (Balanced: 50% pos, 50% neg) dan keduanya mencapai akurasi 80% pada data latih.
> >     
> > - **Masalah:**
> >     
> >     - **Model A:** Salah memprediksi Negatif sebagai Positif (Banyak False Positive).
> >         
> >     - **Model B:** Salah memprediksi Positif sebagai Negatif (Banyak False Negative).
> >         
> > - **Pengujian di Data Asli (Representative):**
> >     
> >     - Model B ternyata memiliki akurasi jauh lebih tinggi (93%) dibanding A (37%) karena Model B lebih jago menebak kelas mayoritas (Negatif).
> >         
> >     - **Pelajaran:** Evaluasi pada dataset yang seimbang bisa menyesatkan jika distribusi populasi asli sangat timpang. Selalu uji pada data representatif.
> >         
> >
> > ### 2. Uji Statistik: McNemar Test
> >
> > Digunakan untuk memastikan apakah perbedaan kinerja antara dua model klasifikasi itu **signifikan secara statistik** atau hanya kebetulan.
> >
> > - **Langkah:**
> >     
> >     1. Buat **Contingency Table** berdasarkan hasil prediksi kedua model pada data uji yang sama.
> >         
> >         - $b$: Model 1 Benar, Model 2 Salah.
> >             
> >         - $c$: Model 1 Salah, Model 2 Benar.
> >             
> >     2. Hitung statistik $\chi^2$ (Chi-Square):
> >         
> >         $$\chi^2 = \frac{(b-c)^2}{b+c}$$
> >     3. Bandingkan dengan tabel distribusi Chi-Square pada tingkat signifikansi $\alpha$ (misal 0.05).
> >         
> > - **Keputusan:** Jika nilai statistik > nilai kritis tabel, maka tolak Hipotesis Null ($H_0$). Artinya perbedaan model signifikan.
> >     
> >
> > ### 3. Analisis Error (Error Analysis)
> >
> > Jangan berhenti pada angka metrik. Lihatlah data yang **salah diklasifikasikan**.
> >
> > - Contoh (Cat Classifier):
> >     
> >     Dari 1000 gambar, model salah 50 kali. Kita periksa 50 gambar tersebut.
> >     
> >     - Ternyata 18% error karena kucing putih (sulit dibedakan background).
> >         
> >     - 40% error karena background gelap.
> >         
> > - **Tindakan:** Informasi ini digunakan untuk memperbaiki model, misalnya dengan menambah data latih khusus kucing putih atau augmentasi gambar gelap. Ini lebih efektif dibanding "mencoba algoritma lain secara buta".
> >     

> [!cornell] #### Summary
> 
> Angka akurasi saja tidak cukup. Perilaku model pada **dataset tidak seimbang** harus diuji pada data yang merepresentasikan populasi asli. Untuk membandingkan dua model secara ilmiah, gunakan **Uji Statistik (seperti McNemar)** untuk membuktikan signifikansi perbedaan. Terakhir, lakukan **Analisis Error** manual pada sampel kesalahan untuk menemukan pola kelemahan model dan memprioritaskan perbaikan yang paling berdampak.

> [!ad-libitum]- Ad Libitum: Detail McNemar Test
> 
> #### Tabel Kontingensi McNemar
> 
> Fokus McNemar adalah pada kasus di mana kedua model **tidak sepakat** (disagreement).
> 
> ||**Model 2 Benar**|**Model 2 Salah**|
> |---|---|---|
> |**Model 1 Benar**|$a$ (Keduanya benar)|$b$ (M1 Benar, M2 Salah)|
> |**Model 1 Salah**|$c$ (M1 Salah, M2 Benar)|$d$ (Keduanya salah)|
> 
> - **Logika:** Jika kedua model setara, maka jumlah kasus di mana M1 menang ($b$) harusnya mirip dengan jumlah kasus di mana M2 menang ($c$).
>     
> - **Rumus:** $\chi^2 = (b-c)^2 / (b+c)$.
>     
> - Jika selisih $b$ dan $c$ sangat besar, nilai $\chi^2$ akan besar, menunjukkan salah satu model secara konsisten lebih baik/buruk di area disagreement tersebut.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa model dengan akurasi tinggi pada balanced dataset bisa gagal total di real-world dataset?</strong></summary>
>
> Karena di balanced dataset, model belajar bahwa probabilitas kelas positif adalah 50%. Jika di dunia nyata probabilitasnya hanya 1%, model yang terlalu agresif memprediksi positif (seperti Model A di contoh) akan menghasilkan sangat banyak False Positive, menghancurkan akurasinya pada populasi asli.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa tujuan melakukan Analisis Error secara manual?</strong></summary>
>
> Untuk mendapatkan **wawasan kualitatif** tentang kelemahan spesifik model (misalnya: model lemah pada gambar gelap). Ini memberikan panduan konkret tentang data apa yang perlu dikumpulkan atau diperbaiki, daripada hanya menebak-nebak cara tuning parameter.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Jika hasil uji McNemar menunjukkan nilai Chi-Square lebih kecil dari nilai kritis (H0 diterima), apa artinya?</strong></summary>
>
> Artinya perbedaan kinerja antara kedua model **tidak signifikan secara statistik**. Meskipun angka akurasinya sedikit berbeda, perbedaan itu kemungkinan besar hanya karena faktor kebetulan (variasi acak pada data uji), dan kita tidak bisa mengklaim satu model pasti lebih baik dari yang lain.
> 
> </details>