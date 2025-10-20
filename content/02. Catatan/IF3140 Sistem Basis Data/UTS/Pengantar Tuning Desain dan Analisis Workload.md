---

type: Note

cssclasses:

- cornell-notes
    

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa langkah pertama sebelum melakukan tuning?
> >     
> > - Apa saja yang perlu dipahami dari workload?
> >     
> > - Apa saja keputusan utama dalam tuning desain?
> >     
> 
> > ### Posisi dan Tujuan Tuning Desain
> > 
> > Setelah desain ER, normalisasi, dan pembuatan view, langkah selanjutnya adalah melakukan **tuning pada level desain** untuk memenuhi target performa. Ini melibatkan dua aktivitas utama: **memilih indeks** yang tepat dan, jika perlu, **menyempurnakan skema** konseptual dan eksternal.
> >
> > ### Langkah Fundamental: Memahami Workload
> > 
> > Langkah paling fundamental sebelum melakukan tuning adalah **memahami workload** atau beban kerja sistem. Tanpa pemahaman ini, setiap upaya tuning akan seperti tebakan. Hal-hal yang perlu dipahami meliputi:
> > 
> > - **Query Terpenting:** Query mana yang paling sering dijalankan dan paling krusial bagi aplikasi? Untuk setiap query, kita perlu tahu relasi dan atribut mana yang diakses, serta kondisi seleksi/join yang digunakan.
> >     
> > - **Update Terpenting:** Operasi `INSERT`, `UPDATE`, atau `DELETE` mana yang paling sering terjadi? Kita perlu tahu atribut mana yang terpengaruh oleh update tersebut.
> >     
> > - **Target Performa:** Kinerja seperti apa (misal, response time) yang diharapkan untuk setiap query dan update penting tersebut.
> >     
> >
> > ### Keputusan Utama dalam Tuning Desain
> > 
> > Berdasarkan analisis workload, ada beberapa keputusan besar yang harus diambil:
> > 
> > - **Keputusan Indeks:** Indeks apa yang harus dibuat? Pada tabel dan kolom mana? Berapa banyak indeks yang dibutuhkan dan apa jenisnya (B+-tree, Hash, Clustered)?
> >     
> > - **Keputusan Skema Logis:** Perlukah kita mengubah skema yang sudah dinormalisasi? Apakah kita perlu "mundur" ke bentuk normal yang lebih rendah (denormalisasi)? Atau menggunakan teknik lain seperti partisi horizontal dan view?
> >     

> [!cornell] #### Summary
> 
> Tuning pada level desain adalah langkah optimasi yang dilakukan setelah desain logis selesai, yang bertujuan untuk memenuhi target performa. Langkah pertama dan paling krusial adalah **memahami workload** secara mendalam, yaitu mengidentifikasi **query dan update terpenting** beserta frekuensinya. Berdasarkan analisis ini, keputusan utama yang harus dibuat adalah **memilih indeks yang tepat** dan, jika perlu, **menyempurnakan skema logis** melalui teknik seperti denormalisasi atau partisi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Analogi Koki di Dapur
> 
> Bayangkan Anda seorang koki (_database tuner_) yang ingin mengatur dapur (_database_) agar efisien. Sebelum mengatur letak panci dan pisau, Anda harus tahu menu apa yang paling sering dipesan oleh pelanggan (_workload_).
> 
> - Jika menu paling populer adalah steak (_query penting_), Anda akan meletakkan wajan pemanggang dan pisau daging di tempat yang paling mudah dijangkau (_membuat indeks pada kolom yang sering di-query_).
>     
> - Jika Anda juga harus sering membuat salad (_update/insert_), Anda akan memastikan talenan dan mangkuk salad juga mudah diakses.
>     
> - Mungkin Anda memutuskan untuk menyimpan bumbu-bumbu yang sering dipakai bersama dalam satu rak (_denormalisasi_) daripada menyimpannya di lemari yang berbeda-beda, meskipun itu sedikit "melanggar" aturan penataan dapur yang ideal.
>     
> 
> Tanpa mengetahui menu apa yang populer, Anda hanya akan menata dapur secara acak dan tidak efisien.