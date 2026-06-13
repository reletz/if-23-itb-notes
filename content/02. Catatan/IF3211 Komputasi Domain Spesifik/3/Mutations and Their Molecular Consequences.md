---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Mutations and Their Molecular Consequences
>
> > ## Questions/Cues
> >
> > - Apa itu **point mutation** dan tiga jenis perubahan dasarnya?
> > - Apa beda **silent**, **missense**, **nonsense**, dan **frameshift** mutation?
> > - Bagaimana satu perubahan basa menyebabkan **sickle-cell disease**?
> > - Mengapa mutasi pada gamet penting bagi pewarisan dan evolusi?
> > - Bagaimana mutasi dapat dipandang sebagai **bit-flip** pada informasi genetik?
> >
> > ## Reference Points
> >
> > - IF3211 — Genetics (PPT 3 & 4, bagian Gene Expression: From Gene to Protein)
>
> > ### Apa Itu Mutasi dan Point Mutation
> >
> > **Mutation** adalah perubahan pada materi genetik sebuah sel. Bentuk paling kecil adalah **point mutation**: perubahan kimia hanya pada **satu pasang nukleotida** dalam sebuah gen. Meski kecil, dampaknya bisa besar — perubahan satu nukleotida pada untai template DNA dapat menyebabkan produksi **protein abnormal**.
> >
> > Karena gen dibaca dan diterjemahkan menjadi protein (lihat [[Gene Expression - The Central Dogma]]), kesalahan satu "huruf" dapat merambat ke produk akhir. Point mutation muncul dari kesalahan sisa yang lolos dari mesin proofreading/repair (lihat [[DNA Structure, Replication, and Repair Machinery]]) atau dari kerusakan oleh agen mutagenik.
> >
> > ### Jenis Perubahan: Substitusi, Insersi, Delesi
> >
> > Pada tingkat sekuens, ada tiga operasi dasar yang dapat mengubah DNA:
> >
> > - **Substitution** — satu pasang basa diganti dengan pasang basa lain (mis. A-T menjadi G-C).
> > - **Insertion** — satu atau beberapa pasang basa **disisipkan** ke dalam sekuens.
> > - **Deletion** — satu atau beberapa pasang basa **dihapus** dari sekuens.
> >
> > Insersi dan delesi sangat berbahaya jika jumlahnya bukan kelipatan tiga, karena menggeser **reading frame** dari titik mutasi ke ujung gen.
> >
> > ### Konsekuensi pada Protein: Silent, Missense, Nonsense, Frameshift
> >
> > Efek substitusi pada protein bergantung pada bagaimana codon yang berubah dibaca ulang:
> >
> > - **Silent mutation** — codon baru tetap mengkode asam amino yang sama (berkat redundansi kode genetik); protein tidak berubah.
> > - **Missense mutation** — codon baru mengkode **asam amino berbeda**; protein bisa sedikit atau sangat berubah fungsinya.
> > - **Nonsense mutation** — codon baru menjadi **stop codon**, sehingga protein terpotong lebih pendek dan biasanya tak berfungsi.
> > - **Frameshift mutation** — insersi/delesi yang bukan kelipatan tiga menggeser seluruh reading frame, mengubah hampir semua asam amino setelah titik mutasi.
> >
> > **Sickle-cell disease** adalah contoh klasik **missense**: sebuah point mutation tunggal pada gen hemoglobin mengganti satu asam amino, sehingga protein hemoglobin menggumpal dan sel darah merah berubah bentuk menjadi sabit. Satu "huruf" yang salah menghasilkan penyakit nyata.
> >
> > ### Sudut Pandang Komputasional: Mutasi sebagai Bit-Flip dan Edit Operation
> >
> > Bagi informatika, mutasi adalah **operasi edit** pada string informasi. **Substitution** setara dengan **bit-flip** — mengubah satu simbol tanpa mengubah panjang data. Karena kode genetik **redundan**, sebagian bit-flip tidak terlihat pada keluaran (**silent** = error yang termaskan), sementara yang lain mengubah satu simbol keluaran (**missense**) atau menghentikan dekode lebih awal (**nonsense** = menyisipkan terminator).
> >
> > **Insertion** dan **deletion** adalah dua dari tiga operasi dalam **edit distance (Levenshtein)** bersama substitution — dan keduanya menyebabkan **frame-shift**, persis seperti menghapus satu byte di tengah stream yang dibaca per blok 3-byte: semua token setelahnya jadi salah baca. Inilah sebabnya indel lebih merusak daripada substitusi tunggal. Mutasi yang lolos repair menjadi sumber **variasi genetik** permanen — jika terjadi pada **gamet**, ia diwariskan ke keturunan dan menjadi bahan baku yang dikerjakan **seleksi alam** (jembatan ke [[Comparative Genomics and Evolutionary Analysis]]).

> [!cornell] #### Summary
>
> **Mutation** adalah perubahan materi genetik; **point mutation** mengubah satu pasang nukleotida lewat tiga operasi: **substitution**, **insertion**, **deletion**. Dampaknya pada protein dikategorikan **silent** (tak berubah), **missense** (asam amino berbeda), **nonsense** (stop dini), dan **frameshift** (frame bergeser akibat indel non-kelipatan tiga). **Sickle-cell disease** adalah missense klasik dari satu basa. Secara komputasional, mutasi adalah **bit-flip**/operasi **edit distance**: silent = error termaskan oleh redundansi, frameshift = off-by-one pada reading frame. Mutasi pada gamet diwariskan dan menjadi bahan **seleksi alam** — terkait [[DNA Structure, Replication, and Repair Machinery]] dan [[Comparative Genomics and Evolutionary Analysis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Mengapa Indel Lebih Merusak dari Substitusi
>
> Substitusi memengaruhi paling banyak satu codon. Indel non-kelipatan tiga menggeser frame sehingga rata-rata separuh protein sisanya menjadi nonsensikal dan sering bertemu stop codon prematur. Karena itu banyak penyakit genetik berat berasal dari frameshift. Pada sickle-cell, sebaliknya, mutasi adalah substitusi tunggal namun jatuh tepat pada residu kritis fungsi hemoglobin — menunjukkan bahwa **lokasi** mutasi sama pentingnya dengan **jenisnya**.
>
> #### CS Angle: Hamming vs Levenshtein dan Masked Errors
>
> Substitusi-saja diukur dengan **Hamming distance** (panjang sama). Begitu ada indel, kita butuh **Levenshtein/edit distance** karena panjang berubah dan diperlukan alignment. Silent mutation menggambarkan **error masking**: encoding yang redundan menyerap sebagian error tanpa mengubah output — analog dengan kode yang punya simbol sinonim. Ini menjelaskan mengapa membandingkan genom perlu alignment, bukan sekadar perbandingan posisi-per-posisi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis fungsi yang menerima sekuens DNA, terapkan substitusi acak, lalu klasifikasikan hasilnya sebagai silent/missense/nonsense memakai codon table.
> 2. Bandingkan efek menyisipkan 1 basa vs 3 basa pada hasil translasi untuk menunjukkan perbedaan frameshift vs in-frame insertion.
> 3. Implementasikan Hamming distance dan Levenshtein distance, lalu jelaskan kapan masing-masing relevan untuk membandingkan dua gen.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Bab 14 — bagian Mutations (Figure 14.25, Sickle-Cell).
> - Ingram, V. (1957) — penemuan basis molekuler sickle-cell sebagai substitusi asam amino tunggal.
> - Durbin et al., *Biological Sequence Analysis* — alignment dan model mutasi.
