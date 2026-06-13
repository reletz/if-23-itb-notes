---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Cell Cycle Control, Checkpoints, and Cancer
>
> > ## Questions/Cues
> >
> > - Apa itu **cell cycle control system** dan analogi mesin cucinya?
> > - Apa fungsi **checkpoints** G1, G2, dan M?
> > - Mengapa **G1 checkpoint (restriction point)** paling penting, dan apa itu **G0**?
> > - Bagaimana **cyclins** dan **Cdks** mengatur transisi?
> > - Mengapa **kanker** adalah hilangnya kontrol siklus sel, dan apa itu **genomic medicine**?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Cycle (PPT 8, bagian Checkpoints of the Cell Cycle Control System)
> > - IF3211 — Cell Cycle (PPT 8, bagian Loss of Cell Cycle Controls in Cancer Cells)
>
> > ### Cell Cycle Control System: Analogi Mesin Cuci
> >
> > Rentetan peristiwa cell cycle diarahkan oleh sebuah **cell cycle control system** tersendiri, yang **mirip alat kontrol (control device) pada mesin cuci**. Seperti pengatur waktu mesin cuci yang berhenti di titik-titik tertentu sampai syarat terpenuhi (mis. menunggu air penuh sebelum lanjut), "**clock**" sel memiliki **checkpoints** spesifik tempat siklus **berhenti** sampai **sinyal go-ahead** diterima. Sistem ini diatur oleh **kontrol internal maupun eksternal** — kondisi di dalam sel sendiri dan sinyal dari lingkungan/sel tetangga.
> >
> > ### Tiga Checkpoint Utama: G1, G2, M
> >
> > Ada tiga checkpoint kunci. **G1 checkpoint** (disebut **restriction point** pada sel mamalia) tampaknya **paling penting** bagi banyak sel. Jika sel menerima sinyal go-ahead di G1 checkpoint, ia umumnya akan **menuntaskan S, G2, dan M lalu membelah**. Jika **tidak** menerima sinyal, sel **keluar dari siklus** menuju state non-membelah bernama **G0 phase**. **G2 checkpoint** memverifikasi DNA telah direplikasi lengkap dan tanpa kerusakan sebelum mitosis. **M checkpoint** (spindle checkpoint) memastikan semua kromosom telah menempel benar pada spindle di metaphase plate sebelum anaphase dimulai.
> >
> > ### Cyclins dan Cdks: Mesin Molekuler Transisi
> >
> > Transisi antar fase digerakkan oleh **protein kinase** bernama **Cdk (cyclin-dependent kinase)**, yang aktif hanya saat berikatan dengan protein **cyclin**. Konsentrasi cyclin **naik-turun secara siklik** sepanjang siklus, sehingga aktivitas kompleks **cyclin–Cdk** ikut berosilasi dan "memberi izin" transisi pada momen yang tepat. Inilah jam molekuler yang menggerakkan FSM siklus sel (lihat [[Phases of the Cell Cycle]]).
> >
> > ### Framing Komputasional: Checkpoint sebagai Guard dan Kanker sebagai Invariant yang Bobol
> >
> > Bagi mahasiswa informatika, **checkpoints adalah guard condition / precondition / assertion**: transisi state hanya boleh terjadi bila *predicate* tertentu bernilai `true`. G1: `assert resourcesSufficient && dnaUndamaged && growthSignalPresent`. G2: `assert dnaFullyReplicated && dnaUndamaged`. M: `assert allChromosomesAttachedToSpindle`. Jika gagal, mesin **menahan transisi** (G0) atau memicu **apoptosis** (≈ *fail-safe shutdown*). **cyclin–Cdk** adalah *clock/scheduler* yang men-*trigger* evaluasi guard ini secara periodik.
> >
> > **Kanker** adalah apa yang terjadi ketika **invariant ini bobol dan safety constraint di-bypass**. Sel kanker **tidak merespons sinyal pengatur** normal: mereka **tak butuh growth factor** (bisa memproduksi sendiri, atau meneruskan sinyal pertumbuhan tanpa adanya growth factor), atau memiliki **control system yang abnormal**. Dalam istilah perangkat lunak, ini seperti kode yang **menghapus `assert`**, **memendekkan rangkaian guard**, atau **memalsukan input sinyal** — sehingga loop pembelahan berjalan **tanpa batas** (`while(true)`), tepat seperti sel hasil **transformation** yang membelah tak terhingga di kultur. Hasilnya: **tumor**. **Benign tumor** tetap di lokasi asal; **malignant tumor** menginvasi jaringan sekitar dan melakukan **metastasis** ke bagian tubuh lain. Perbaikan modern bersifat **genomic/personalized medicine**: DNA tumor di-*sequence* cepat untuk menargetkan langkah siklus yang rusak — analog dengan **debugging** sistem dengan membaca *core dump*-nya alih-alih menebak.

> [!cornell] #### Summary
>
> **Cell cycle control system** — diibaratkan **alat kontrol mesin cuci** — menghentikan siklus di **checkpoints** sampai **sinyal go-ahead** tiba, diatur kontrol **internal dan eksternal**. Tiga checkpoint kunci adalah **G1 (restriction point, paling penting; gagal → keluar ke G0)**, **G2**, dan **M**. Mesin molekulernya adalah kompleks **cyclin–Cdk** yang aktivitasnya berosilasi siklik. Secara komputasional, checkpoint = **guard/assertion/precondition** yang harus lolos sebelum transisi FSM (lihat [[Phases of the Cell Cycle]]). **Kanker** = **invariant yang bobol / safety constraint di-bypass**: sel mengabaikan sinyal regulasi, membelah tak terbatas (**transformation**), membentuk **tumor** (**benign** atau **malignant** dengan **metastasis**). Terapi modern memakai **genomic/personalized medicine** untuk menargetkan kerusakan kontrol yang spesifik.

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Terapi dan Efek Sampingnya
>
> Tumor terlokalisasi dapat diobati dengan **radiasi energi tinggi** yang merusak DNA sel kanker lebih parah daripada sel normal. Untuk tumor metastatik dipakai **kemoterapi**, yaitu obat yang mengganggu langkah spesifik cell cycle. **Efek samping** kemoterapi muncul karena obat juga menghantam **sel normal yang sering membelah** (mis. folikel rambut, mukosa usus, sumsum tulang) — sebuah persoalan **selektivitas target** yang belum sempurna.
>
> #### CS Angle: Tumor Suppressor dan Oncogene sebagai Guard-Code
>
> Gen **tumor suppressor** (mis. p53, "the guardian of the genome") berfungsi seperti **guard/assertion** yang menghentikan siklus atau memicu apoptosis saat DNA rusak — menonaktifkannya = **menghapus `assert`**. **Proto-oncogene** yang termutasi menjadi **oncogene** bekerja seperti **input sinyal yang macet bernilai "go"** (*stuck-at-true*). Kanker biasanya butuh **beberapa mutasi** (*multi-hit*) — beberapa lapis pengaman harus gagal bersamaan, persis prinsip **defense-in-depth** di keamanan sistem.
>
> #### Proyek Eksplorasi Mandiri
> 1. Perluas FSM cell cycle-mu (dari catatan [[Phases of the Cell Cycle]]) dengan menjadikan tiap checkpoint sebuah fungsi guard boolean; lalu simulasikan "kanker" dengan memaksa salah satu guard selalu `true` dan amati pembelahan tak terkendali.
> 2. Telusuri satu *targeted therapy* (mis. imatinib pada BCR-ABL) dan jelaskan langkah cell cycle/sinyal mana yang tepat ia hambat.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 9 — *Regulation of the Cell Cycle* & *Cancer*.
> - Hanahan & Weinberg (2011), *Hallmarks of Cancer: The Next Generation*, Cell.
