---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: SVM for Multi-class Data (Strategies & Implementation)
> 
> > ## Questions/Cues
> >
> > - Sifat Dasar SVM (Biner)
> >     
> > - Strategi One-against-all (OvA)
> >     
> > - Strategi One-against-one (OvO)
> >     
> > - Perhitungan Jumlah Model
> >     
> > - Mekanisme Voting
> >     
> > - DAGSVM
> >     
> > - Software SVM Populer
> >     
> >
> > ## Reference Points
> >
> > - Slides: 52-59
> >     
> > - Modul: Supervised Learning
> >     
> 
> > ### 1. Tantangan Multi-Class pada SVM
> >
> > Secara desain, SVM adalah **binary classifier** (klasifikasi biner). Algoritma ini hanya mengerti cara memisahkan dua hal: kelas positif (+1) dan kelas negatif (-1).
> >
> > Untuk mengklasifikasikan data yang memiliki lebih dari dua kelas (misalnya: apel, jeruk, mangga), kita harus memecah masalah tersebut menjadi beberapa sub-masalah biner.
> >
> > ### 2. Strategi One-against-all (OvA) / One-vs-Rest
> >
> > Strategi ini membangun satu model untuk setiap kelas, yang memisahkan kelas tersebut dari **semua kelas lainnya**.
> >
> > - **Jumlah Model:** Jika ada $k$ kelas, kita membangun $k$ model SVM.
> >     
> > - **Konsep:**
> >     
> >     - Model 1: Kelas A vs (B + C + D...)
> >         
> >     - Model 2: Kelas B vs (A + C + D...)
> >         
> >     - dst.
> >         
> > - Keputusan (Klasifikasi):
> >     
> >     Untuk data baru $x$, kita masukkan ke semua $k$ model. Pemenangnya adalah kelas yang memberikan nilai fungsi keputusan $f(x)$ terbesar (paling positif/yakin).
> >     
> >
> > ### 3. Strategi One-against-one (OvO)
> >
> > Strategi ini membangun satu model untuk setiap **pasangan kelas**.
> >
> > - **Jumlah Model:** Kita membangun $k(k-1)/2$ model SVM.
> >     
> >     - Contoh: Jika ada 4 kelas, butuh $4(3)/2 = 6$ model.
> >         
> > - **Konsep:**
> >     
> >     - Model 1: Kelas A vs Kelas B
> >         
> >     - Model 2: Kelas A vs Kelas C
> >         
> >     - Model 3: Kelas B vs Kelas C
> >         
> >     - dst.
> >         
> > - Keputusan (Klasifikasi):
> >     
> >     Menggunakan metode Max Wins (Voting). Data dimasukkan ke semua model. Jika Model 1 memprediksi A, maka A dapat 1 poin. Kelas dengan jumlah poin terbanyak di akhir adalah pemenangnya.
> >     
> >
> > ### 4. DAGSVM (Directed Acyclic Graph SVM)
> >
> > Metode ini menggunakan model-model dari strategi One-against-one (OvO), tetapi cara pengambilan keputusannya berbeda untuk mempercepat proses testing.
> >
> > - **Struktur:** Menggunakan struktur graf/pohon (Directed Acyclic Graph).
> >     
> > - Proses (Turnamen Eliminasi):
> >     
> >     Dimulai dari akar (misal: A vs D).
> >     
> >     - Jika hasilnya A, maka D dieliminasi (D tidak mungkin benar). Kita bergerak ke simpul yang menguji A vs kandidat lain.
> >         
> >     - Jika hasilnya D, maka A dieliminasi.
> >         
> > - **Keuntungan:** Lebih cepat saat testing karena tidak perlu mengevaluasi semua $k(k-1)/2$ model, melainkan hanya menyusuri jalur graf (sekitar $k-1$ evaluasi).
> >     
> >
> > ### 5. Implementasi Perangkat Lunak (Software)
> >
> > - **LibSVM:** Library paling populer (basis algoritma kernel SVM di Scikit-Learn). Menggunakan strategi **One-against-one** untuk multi-class. Mendukung C++, Java, Python.
> >     
> > - **LibLinear:** Versi optimasi khusus untuk **Linear Kernel**. Sangat cepat untuk data dimensi tinggi (seperti teks). Menggunakan strategi **One-against-all**.
> >     
> > - **SVMLight:** Populer untuk klasifikasi teks.
> >     

> [!cornell] #### Summary
> 
> Karena SVM pada dasarnya adalah klasifikasi biner, penanganan data **Multi-Class** dilakukan dengan menggabungkan beberapa model biner. Metode **One-against-all (OvA)** membuat $k$ model (satu lawan sisa), sedangkan **One-against-one (OvO)** membuat $k(k-1)/2$ model (duel antar pasangan) dengan keputusan berbasis voting. **DAGSVM** mempercepat prediksi OvO menggunakan metode eliminasi turnamen. Pustaka standar seperti **LibSVM** umumnya menggunakan pendekatan OvO karena lebih stabil untuk kernel non-linear.

> [!ad-libitum]- Ad Libitum: Analisis Kompleksitas & Perbandingan
> 
> #### 1. Perbandingan Komputasi OvA vs OvO
> 
> Sekilas terlihat OvO lebih berat karena jumlah modelnya kuadratik ($k^2$), sedangkan OvA hanya linear ($k$). Namun, kenyataannya seringkali **OvO lebih cepat dilatih**.
> 
> - **One-against-All (OvA):** Melatih $k$ model, tapi setiap model menggunakan **seluruh** dataset (N data). Masalah optimasi SVM berskala kubik terhadap jumlah data (~$N^3$). Jadi totalnya berat.
>     
> - **One-against-One (OvO):** Melatih banyak model, tapi setiap model hanya menggunakan data dari **dua kelas** saja (subset kecil). Karena SVM sangat sensitif terhadap jumlah data, melatih banyak model kecil jauh lebih cepat daripada melatih sedikit model besar.
>     
> 
> #### 2. Masalah Unbalanced Data pada OvA
> 
> Kelemahan utama OvA adalah ketidakseimbangan data yang ekstrem.
> 
> Saat melatih "Kelas A vs Sisa", rasio datanya mungkin 1:9 (jika ada 10 kelas seimbang). SVM cenderung bias ke kelas mayoritas ("Sisa"), sehingga akurasi prediksi kelas minoritas ("A") bisa turun drastis. OvO tidak memiliki masalah ini karena setiap duel bersifat simetris (hanya A vs B).
> 
> #### 3. Mengapa LibLinear menggunakan OvA?
> 
> LibLinear dikhususkan untuk **Linear Kernel**. Pada kasus linear, kompleksitas training tidak separah kernel non-linear (RBF/Poly). Oleh karena itu, OvA menjadi masuk akal dan efisien untuk digunakan, terutama pada klasifikasi teks dengan ribuan fitur.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa SVM memerlukan strategi khusus untuk menangani data multi-class?</strong></summary>
> 
>   
> 
> Karena SVM pada dasarnya adalah algoritma <strong>klasifikasi biner</strong> (hanya memisahkan 2 kelas: +1 dan -1), sehingga tidak bisa langsung menangani label > 2 tanpa dipecah menjadi sub-masalah biner.
> 
> </details>
> 
> <details>
> 
> <summary><strong>2. Jika Anda memiliki 10 kelas, berapa jumlah model SVM yang harus dilatih menggunakan strategi One-against-one (OvO)?</strong></summary>
> 
>   
> 
> Menggunakan rumus $k(k-1)/2$:
> 
> $10(9)/2 = 45$ model.
> 
> </details>
> 
> <details>
> 
> <summary><strong>3. Bagaimana cara menentukan kelas pemenang pada strategi One-against-all (OvA)?</strong></summary>
> 
>   
> 
> Data dimasukkan ke semua $k$ model. Kelas yang dipilih adalah kelas yang modelnya memberikan nilai output fungsi keputusan ($f(x)$) <strong>terbesar</strong> (paling positif/yakin).
> 
> </details>
> 
> <details>
> 
> <summary><strong>4. Apa keuntungan utama menggunakan DAGSVM dibandingkan metode Voting standar pada OvO?</strong></summary>
> 
>   
> 
> DAGSVM mempercepat waktu prediksi (testing time) karena menggunakan mekanisme <strong>eliminasi</strong> (seperti turnamen). Kita tidak perlu menjalankan semua model pasangan, cukup model-model yang berada di jalur evaluasi saja.
> 
> </details>
> 
> <details>
> 
> <summary><strong>5. Library SVM mana yang sebaiknya digunakan jika Anda memiliki dataset teks yang sangat besar dengan ribuan fitur dan ingin menggunakan Kernel Linear?</strong></summary>
> 
>   
> 
> <strong>LibLinear</strong>. Library ini dioptimasi khusus untuk kernel linear dan menangani dataset besar/dimensi tinggi jauh lebih cepat daripada LibSVM standar.
> 
> </details>