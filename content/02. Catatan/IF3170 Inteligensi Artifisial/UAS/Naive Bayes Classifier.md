---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Naive Bayes Classifier (Supervised Learning)
> 
> > ## Questions/Cues
> >
> > - Apa itu Naive Bayes?
> >     
> > - Mengapa disebut "Naive"?
> >     
> > - Rumus Prediksi Utama
> >     
> > - Tahap _Learning_
> >     
> > - Tahap _Classification_
> >     
> > - Contoh Kasus (Tennis)
> >     
> >
> > ## Reference Points
> >
> > - File: `28. IF3170_Materi09_Seg02_AI-NaiveBayes.pdf`
> >     
> > - Modul: Supervised Learning
> >     
> 
> > ### 1. Konsep Dasar Naive Bayes
> >
> > **Naive Bayes** adalah _Probabilistic Classifier_ dalam _Supervised Learning_.
> > 
> > ![[Pasted image 20251208100104.png]]
> >
> > - **Target Fungsi:** Memetakan input ke kelas dari himpunan terbatas $V$.
> >     
> > - **Prinsip:** Menggunakan Teorema Bayes untuk memprediksi kelas yang paling mungkin ($v_{MAP}$) berdasarkan atribut yang diamati.
> >     
> > - **Asumsi "Naive":** Mengasumsikan bahwa setiap atribut bersifat **saling lepas (conditionally independent)** satu sama lain jika kelasnya diketahui. Meskipun asumsi ini jarang terjadi di dunia nyata, performa Naive Bayes seringkali sangat baik.
> >     
> >
> > ### 2. Algoritma Pembelajaran (_Learning Algorithm_)
> >
> > Tujuan tahap ini adalah membangun "Probability Model" dari data latih.
> >
> > - **Input:** Dataset dengan atribut $a_1, a_2, ..., a_n$ dan target kelas $v_j$.
> >     
> > - **Proses:**
> >     
> > 	1. Hitung frekuensi setiap kelas target $P(v_j)$.
> > 			
> > 	2. Hitung frekuensi setiap nilai atribut untuk setiap kelas $P(a_i | v_j)$.
> > 			
> >
> > ### 3. Tahap Klasifikasi (_Prediction_)
> >
> > Untuk data baru (unseen data) dengan atribut $\langle a_1, a_2, ..., a_n \rangle$, kita mencari kelas $v_{MAP}$ (Maximum a Posteriori) dengan rumus:
> >
> > $$v_{MAP} = \operatorname*{argmax}_{v_j \in V} P(v_j | a_1, a_2, ..., a_n)$$
> >
> > Menggunakan Teorema Bayes dan asumsi independensi, rumusnya disederhanakan menjadi:
> >
> > $$v_{NB} = \operatorname*{argmax}_{v_j \in V} P(v_j) \prod_{i} P(a_i | v_j)$$
> >
> > - $P(v_j)$: Prior probability (peluang kelas muncul secara umum).
> >     
> > - $\prod P(a_i | v_j)$: Likelihood (peluang atribut muncul jika kelasnya $v_j$, dikalikan untuk semua atribut).
> >     
> >
> > ### 4. Studi Kasus: Play Tennis
> >
> > Diberikan data cuaca (Outlook, Temp, Humidity, Windy) untuk menentukan Play=Yes/No.
> > 
> > ![[Pasted image 20251208100214.png]]
> >
> > - **Learning:** Hitung tabel probabilitas.
> >     
> >     - $P(Play=Yes) = 9/14$, $P(Play=No) = 5/14$.
> >         
> >     - $P(Sunny|Yes) = 2/9$, $P(Sunny|No) = 3/5$, dst.
> >         
> > - **Query:** $\langle Sunny, Cool, High, True \rangle$ ?
> >     
> > - Hitung Yes: 
> > 	$$P(Yes) \times P(Sunny|Yes) \times P(Cool|Yes) \times P(High|Yes) \times P(True|Yes)$$
> >     
> >     $$= \frac{9}{14} \times \frac{2}{9} \times \frac{3}{9} \times \frac{3}{9} \times \frac{3}{9} \approx 0.0053$$
> >     
> > - Hitung No: $$P(No) \times P(Sunny|No) \times P(Cool|No) \times P(High|No) \times P(True|No)$$
> >     
> >     $$= \frac{5}{14} \times \frac{3}{5} \times \frac{1}{5} \times \frac{4}{5} \times \frac{3}{5} \approx 0.0206$$
> >     
> > - **Keputusan:** $0.0206 > 0.0053$, maka prediksi **Play = No**.
> >     

> [!cornell] #### Summary
> 
> **Naive Bayes** adalah pengklasifikasi probabilistik yang efisien yang memprediksi kelas dengan memilih probabilitas tertinggi ($P(v_j) \times \prod P(a_i|v_j)$). Kekuatan utamanya terletak pada asumsi **independensi atribut** yang menyederhanakan perhitungan kompleks menjadi perkalian probabilitas sederhana berdasarkan frekuensi data latih.

> [!ad-libitum]- Spaced Repetition Questions
> 
> <details>
> 
> <summary><strong>1. Mengapa Naive Bayes disebut "Naive"?</strong></summary>
> 
> Karena algoritma ini mengasumsikan bahwa semua atribut input bersifat <strong>independen satu sama lain</strong> (tidak saling mempengaruhi) jika kelas targetnya diketahui, padahal kenyataannya atribut seringkali berkorelasi.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa rumus utama untuk mengklasifikasikan data baru menggunakan Naive Bayes?</strong></summary>
> 
> $$Classification = \operatorname*{argmax}_{v_j} P(v_j) \prod_{i} P(a_i | v_j)$$
> 
> (Peluang Prior Kelas dikali dengan Produk Peluang Likelihood setiap atribut).
> 
> </details>