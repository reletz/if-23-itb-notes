---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[WI2022 Manajemen Proyek]]

> [!cornell] Validasi dan Pengendalian Lingkup (Validate & Control Scope)
> 
> > ## Questions/Cues
> > 
> > - Apa itu Validate Scope?
> >     
> > - Apa bedanya dengan Quality Control?
> >     
> > - Apa itu Control Scope?
> >     
> > - Apa tujuan utama pengendalian?
> >     
> > - Apa itu "Scope Creep"?
> >     
> > - Bagaimana proses change control bekerja?
> >     
> >
> > ## Reference Points
> > 
> > - ManPro-05-Project-Scope-Management.pdf (Slides 36-39)
> >     
> 
> > ### Proses 5: Validate Scope (Memvalidasi Lingkup)
> > 
> > **Validate Scope** adalah proses mendapatkan **penerimaan formal** dari para stakeholder (terutama klien atau sponsor) atas _deliverables_ proyek yang telah selesai. Ini adalah tentang memastikan bahwa hasil kerja yang diserahkan sesuai dengan yang disepakati.
> > 
> > - **Fokus:** Penerimaan (_acceptance_), bukan kebenaran (_correctness_).
> >     
> > - **Kapan Dilakukan:** Biasanya dilakukan di akhir setiap fase proyek atau saat sebuah _deliverable_ utama selesai.
> >     
> > - **Input Utama:** _Project Scope Statement_, WBS, _Deliverables_ yang sudah selesai.
> >     
> > - **Tool Utama:** **Inspeksi (Inspection)**. Ini melibatkan aktivitas seperti meninjau, mengukur, dan menguji hasil kerja untuk memastikan semuanya memenuhi kriteria penerimaan.
> >     
> > - **Output Utama:**
> >     
> >     - **Accepted Deliverables:** Hasil kerja yang telah diterima secara formal.
> >         
> >     - **Change Requests:** Jika deliverable tidak diterima, ini akan memicu permintaan perubahan.
> >         
> >     - **Lessons Learned:** Pembelajaran dari proses validasi.
> >         
> > 
> > ### Perbedaan: Validate Scope vs. Control Quality
> > 
> > Kedua proses ini sering tertukar, tetapi memiliki fokus yang berbeda:
> > 
> > - **Control Quality (Pengendalian Kualitas):** Fokus pada **kebenaran** hasil kerja. Apakah _deliverable_ dibuat dengan benar dan memenuhi spesifikasi teknis? Proses ini biasanya dilakukan oleh tim proyek **sebelum** diserahkan kepada klien.
> >     
> > - **Validate Scope (Validasi Lingkup):** Fokus pada **penerimaan** hasil kerja oleh klien/stakeholder. Apakah _deliverable_ yang benar (secara teknis) ini adalah apa yang mereka inginkan dan setujui? Proses ini melibatkan stakeholder eksternal.
> >     
> > 
> > **Analogi:** Tim QC memastikan mobil yang dibuat tidak memiliki cacat (Control Quality). Klien kemudian melakukan test drive untuk memastikan mobil itu sesuai dengan pesanannya (Validate Scope).
> > 
> > ### Proses 6: Control Scope (Mengendalikan Lingkup)
> > 
> > **Control Scope** adalah proses memantau status lingkup proyek dan mengelola perubahan pada _scope baseline_. Ini adalah proses berkelanjutan selama proyek berlangsung.
> > 
> > - **Tujuan Utama:**
> >     
> >     1. Mengarahkan faktor-faktor yang menyebabkan perubahan lingkup.
> >         
> >     2. Memastikan semua permintaan perubahan diproses melalui **Change Control System** yang formal.
> >         
> >     3. Mengelola dampak dari perubahan yang disetujui.
> >         
> > - **Musuh Utama:** **Scope Creep**. Ini adalah penambahan fitur atau pekerjaan kecil-kecil yang tidak terkendali dan tidak melalui proses persetujuan formal, yang secara perlahan membuat proyek membengkak dari segi biaya, waktu, dan sumber daya.
> >     
> > 
> > ### Change Control System (Sistem Pengendalian Perubahan)
> > 
> > Ini adalah seperangkat prosedur formal yang mendikte bagaimana perubahan pada lingkup proyek akan diajukan, dievaluasi, disetujui, dan diimplementasikan.
> > 
> > - **Langkah-langkah Umum:**
> >     
> >     1. **Pengajuan:** Seseorang mengajukan _Change Request_ (Permintaan Perubahan) secara tertulis.
> >         
> >     2. **Analisis Dampak:** Manajer proyek atau tim menganalisis dampak perubahan tersebut terhadap waktu, biaya, kualitas, dan risiko.
> >         
> >     3. **Evaluasi & Keputusan:** Sebuah dewan (Change Control Board) atau pihak berwenang meninjau analisis dan memutuskan untuk menyetujui, menolak, atau menunda permintaan tersebut.
> >         
> >     4. **Implementasi & Komunikasi:** Jika disetujui, _scope baseline_ dan rencana proyek lainnya diperbarui. Keputusan dikomunikasikan kepada semua stakeholder terkait.
> >         

> [!cornell] #### Summary
> 
> Setelah hasil kerja (deliverables) selesai, proses Validasi Lingkup (Validate Scope) memastikan penerimaan formal dari stakeholder melalui inspeksi, yang berfokus pada kesesuaian dengan kesepakatan awal. Sepanjang proyek, proses Pengendalian Lingkup (Control Scope) secara proaktif mengelola perubahan pada scope baseline melalui sistem kontrol perubahan yang formal untuk mencegah "scope creep" dan memastikan setiap perubahan dievaluasi dampaknya sebelum disetujui dan diimplementasikan.

> [!ad-libitum]- Additional Information
> 
> #### Gold Plating vs. Scope Creep
> 
> - **Scope Creep:** Perubahan yang diminta **oleh klien atau stakeholder** yang tidak melalui proses kontrol formal. Biasanya dianggap negatif karena tidak terkelola.
>     
> - **Gold Plating:** Penambahan fitur atau peningkatan kualitas **oleh tim proyek sendiri** tanpa diminta oleh klien. Meskipun niatnya baik (memberikan "lebih"), ini sama berbahayanya karena menggunakan waktu dan sumber daya yang tidak dianggarkan, dan berpotensi menimbulkan ekspektasi yang tidak realistis di masa depan.
>     
> 
> Keduanya harus dihindari dengan disiplin mengikuti _scope baseline_.
> 
> #### Eksplorasi Mandiri: Menganalisis Permintaan Perubahan
> 
> Bayangkan Anda adalah manajer proyek untuk pembuatan website e-commerce. Di tengah proyek, klien meminta perubahan: "Bisakah kita menambahkan fitur _live chat_ dengan customer service?"
> 
> Coba tuliskan poin-poin analisis dampak yang akan Anda presentasikan kepada Change Control Board:
> 
> 1. **Dampak pada Lingkup:** Menambah satu fitur baru yang tidak ada di WBS awal.
>     
> 2. **Dampak pada Waktu:** Membutuhkan tambahan estimasi 80 jam kerja, yang akan menunda tanggal peluncuran selama 2 minggu.
>     
> 3. **Dampak pada Biaya:** Membutuhkan biaya tambahan untuk lisensi software live chat dan biaya development sebesar $5,000.
>     
> 4. **Dampak pada Sumber Daya:** Membutuhkan alokasi waktu dari 1 backend developer dan 1 frontend developer yang seharusnya sudah mengerjakan fitur lain.
>     
> 5. **Rekomendasi:** Berikan rekomendasi Anda (misal: "Setujui dengan penambahan biaya dan waktu," atau "Tolak dan sarankan untuk dijadikan pengembangan Fase 2 setelah peluncuran awal").
>