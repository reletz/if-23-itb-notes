---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Mandatory Access Control dan Multi-Level Security
>
> > ## Questions/Cues
> >
> > - Apa intuisi MAC dan kapan dipakai?
> > - Apa aturan "no read up, no write down"?
> > - Apa itu security lattice dan dominance relation?
> > - Apa batasan MLS (aggregation, association, covert channel)?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 23-36)
>
> > ### Intuisi MAC
> >
> > Pada **Mandatory Access Control**, **pemilik sistem** (bukan pemilik data) menentukan siapa membaca apa; pengguna dikurung dalam batas yang ditetapkan. Lingkungan asal: sistem militer (Bell & LaPadula, 1976) dengan **clearance** berbeda, tujuan utamanya **menjaga confidentiality**. Entitas: subject, object, action (read/write), **security level**, dan **categories** (departemen, agensi, domain operasi).
> >
> > ### Model Bell-LaPadula
> >
> > Tujuan: mencegah pengungkapan informasi tak berwenang (*information flow*; integrity hanya insidental). Level berurutan linear: **Top Secret > Secret > Confidential > Unclassified**. Subjek punya clearance L(s), objek punya klasifikasi L(o).
> >
> > - **Simple security condition (no read up)**: s boleh membaca o iff L(o) ≤ L(s) dan s punya izin baca.
> > - **\*-property (no write down)**: s boleh menulis o iff L(s) ≤ L(o) dan s punya izin tulis.
> >
> > Informasi hanya mengalir **ke atas**, dari principal kurang dipercaya ke lebih dipercaya. Keputusan menggabungkan kontrol wajib (level) dan diskresioner (izin).
> >
> > ### Security Lattice
> >
> > Label = pasangan **(level, categories)**, mis. (Secret, {Army}). **Dominance**: (L1,C1) ≽ (L2,C2) iff L1 ≥ L2 dan C1 ⊇ C2. Himpunan label membentuk **lattice**: tiap pasangan memiliki **LUB** (batas atas terkecil, "leluhur bersama terdekat") dan **GLB** (batas bawah terbesar). Contoh: LUB(⟨S,{A}⟩, ⟨TS,{N}⟩) = ⟨TS,{A,N}⟩; GLB(⟨S,{A,N}⟩, ⟨TS,{N}⟩) = ⟨S,{N}⟩.
> >
> > ```mermaid
> > flowchart BT
> >     A["Secret {Army}"] --> B["Secret {Army,Nuclear}"]
> >     C["Secret {Nuclear}"] --> B
> >     B --> D["TopSecret {Army,Nuclear}"]
> > ```
> >
> > ### Teorema dan Catatan
> >
> > - **Security theorem**: bila setiap transisi menaati no-read-up dan no-write-down, sistem aman.
> > - **System Z (McLean)**: menurunkan semua ke level terendah lalu memberi akses; formal benar tetapi tidak aman, bukti bahwa teorema valid hanya dalam asumsinya.
> > - **Tranquillity**: level klasifikasi tidak berubah *on-the-fly*.
> >
> > ### Keterbatasan MLS
> >
> > - **Aggregation**: lokasi satu kapal tidak rahasia, lokasi semua kapal rahasia.
> > - **Association**: nama tidak rahasia, nama dan gaji rahasia.
> > - **Covert channel**: MLS hanya mengontrol kanal terbuka; sumber daya bersama dapat dipakai mengirim data tersembunyi (proses Secret mengunci resource=1, melepas=0; proses Confidential mencoba mengakses; hasil akses/tidak menjadi bit informasi). Tidak dapat dihapus, hanya diperlambat.

> [!cornell] #### Summary
>
> **MAC** memberi kontrol akses oleh sistem berdasarkan **security level dan category**. **Bell-LaPadula** menjaga confidentiality lewat **no read up** dan **no write down** pada **lattice** label (dominance, LUB, GLB). MLS memiliki keterbatasan: **aggregation, association, dan covert channel**.

> [!ad-libitum]- Additional Information
>
> #### MAC di Dunia Nyata
>
> **SELinux** dan **AppArmor** di Linux, serta Mandatory Integrity Control pada Windows, menerapkan MAC pada OS umum; kontainer Android memakai SELinux untuk mengisolasi aplikasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pada VM Fedora/RHEL, ubah SELinux ke enforcing, jalankan web server dari direktori non-standar, dan baca denial di `audit.log` memakai `ausearch`/`audit2why`.
>
> #### Bacaan Lanjutan
> - Bell & LaPadula (1976). *Secure Computer System: Unified Exposition and Multics Interpretation*.
> - McLean (1985). *A Comment on the "Basic Security Theorem" of Bell and LaPadula*.
