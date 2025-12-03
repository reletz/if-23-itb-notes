---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Evaluation Strategy & Ethics (Pengukuran Kinerja Model - Part 4)
> 
> > ## Questions/Cues
> >
> > - Konsistensi Tujuan Bisnis
> >     
> > - Risiko & Mitigasi
> >     
> > - Sifat Iteratif ML
> >     
> > - Kriteria Pemilihan Algoritma
> >     
> > - Kompleksitas Waktu & Ruang
> >     
> > - Interpretabilitas
> >     
> > - Aspek Etis & Bias
> >     
> >
> > ## Reference Points
> >
> > - Slides: 30-35
> >     
> > - Topik: Strategi & Etika
> >     
> 
> > ### 1. Konsistensi dengan Tujuan Bisnis
> >
> > Evaluasi teknis (akurasi tinggi) tidak selalu berarti sukses bisnis.
> >
> > - **Pertanyaan Kunci:** Apakah model ini benar-benar memecahkan masalah bisnis?
> >     
> > - **Risiko & Mitigasi:** Identifikasi potensi kegagalan di dunia nyata. Contoh: Model sensitif terhadap outlier, atau data produksi berbeda distribusi dengan data latih (_data drift_). Rencanakan mitigasinya.
> >     
> >
> > ### 2. Prinsip Eksperimen ML
> >
> > - **Iteratif:** ML bukan proses sekali jadi. Mulailah dengan sederhana.
> >     
> > - **Aturan 25%:** Pada eksperimen pertama, jangan gunakan lebih dari 25% sumber daya (waktu/biaya). Sisakan ruang untuk iterasi dan perbaikan.
> >     
> > - **Ekspektasi:** Jangan mulai dengan janji muluk-muluk. Pengujian statistik hanya mendukung hipotesis, bukan membuktikan kebenaran mutlak selamanya.
> >     
> > - **Dokumentasi:** Catat semua konfigurasi, hasil, dan kegagalan. Ini aset pengetahuan berharga.
> >     
> >
> > ### 3. Kriteria Pemilihan Algoritma
> >
> > Jangan hanya memilih berdasarkan **Error/Akurasi**. Pertimbangkan trade-off lain:
> >
> > - **Risiko:** Seberapa fatal jika model salah?
> >     
> > - **Waktu Pelatihan:** Apakah model butuh dilatih ulang tiap hari? (Deep Learning vs Decision Tree).
> >     
> > - **Waktu Pengujian (Inference):** Apakah prediksi harus realtime (milidetik)?
> >     
> > - **Kompleksitas Ruang:** Apakah model muat di memori perangkat kecil (IoT/HP)?
> >     
> > - **Interpretabilitas:** Bisakah kita menjelaskan ALASAN model mengambil keputusan? (Penting untuk medis/hukum).
> >     
> > - **Kemudahan Program:** Seberapa susah maintenance kodenya?
> >     
> >
> > ### 4. Aspek Etis
> >
> > Pembangunan model harus memperhatikan dampak sosial.
> >
> > - **Bias:** Pastikan data latih tidak mengandung bias diskriminatif (misal: model kredit yang bias terhadap gender atau ras tertentu).
> >     
> > - **Stereotyping:** Hindari model yang memperkuat stereotip negatif kelompok tertentu.
> >     
> > - **Fairness:** Model harus adil bagi semua sub-kelompok populasi.
> >     

> [!cornell] #### Summary
> 
> Keberhasilan proyek ML dinilai dari **dampak bisnis**, bukan sekadar skor akurasi. Pemilihan model harus mempertimbangkan **Trade-off** antara akurasi, kecepatan (komputasi), penggunaan memori, dan **Interpretabilitas** (transparansi). Prosesnya bersifat **iteratif**, dimulai dari eksperimen kecil. Aspek **Etika** wajib diperhatikan untuk mencegah bias dan diskriminasi yang dapat merugikan masyarakat atau reputasi perusahaan.

> [!ad-libitum]- Ad Libitum: Interpretabilitas vs Akurasi
> 
> Seringkali ada tarik-menarik (trade-off) antara performa dan interpretabilitas.
> 
> - **Black Box Model (e.g., Deep Neural Networks, Ensemble):** Biasanya akurasi sangat tinggi, tapi sulit dijelaskan _mengapa_ prediksi tertentu muncul. Sulit diaudit.
>     
> - **White Box Model (e.g., Linear Regression, Decision Tree):** Akurasi mungkin lebih rendah pada data kompleks, tapi logika "If-Then" sangat jelas.
>     
> 
> _Tips:_ Di industri regulasi ketat (Bank, Kesehatan), White Box atau model Black Box yang dilengkapi metode penjelasan (seperti SHAP/LIME) seringkali lebih disukai daripada model Black Box murni meskipun akurasinya sedikit lebih rendah.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa Interpretabilitas (Explainability) penting dalam pemilihan model?</strong></summary>
>
> Agar pengguna dan pemangku kepentingan percaya pada model. Dalam kasus kesalahan (misal: menolak pinjaman nasabah layak), kita perlu tahu alasannya untuk memperbaiki sistem dan memberikan penjelasan legal/logis kepada nasabah.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa maksud "Pembelajaran mesin bersifat iteratif"?</strong></summary>
>
> Artinya model pertama jarang sekali sempurna. Kita perlu siklus: Eksperimen -> Evaluasi -> Analisis Error -> Perbaikan Data/Fitur -> Eksperimen Ulang. Oleh karena itu, jangan habiskan seluruh waktu/budget hanya untuk satu kali percobaan besar.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Sebutkan satu contoh risiko etis dalam model Machine Learning!</strong></summary>
>
> Bias seleksi dalam data rekrutmen. Jika data masa lalu didominasi oleh perekrutan pria, model mungkin belajar untuk mendiskriminasi CV pelamar wanita, yang merupakan pelanggaran etika dan hukum.
> 
> </details>