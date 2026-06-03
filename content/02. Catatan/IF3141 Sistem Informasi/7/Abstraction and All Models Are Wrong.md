---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Abstraction and All Models Are Wrong
>
> > ## Questions/Cues
> >
> > - Apa itu abstraksi dalam konteks system modelling?
> > - Mengapa sebuah model selalu bersifat tidak lengkap (incomplete)?
> > - Apa makna pernyataan "all models are wrong"?
> > - Apa ukuran sebenarnya dari nilai sebuah model?
> > - Bagaimana audiens memengaruhi efektivitas sebuah model?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 5-6)
>
> > ### Pengertian Abstraksi
> >
> > Dalam terminologi filosofis, **abstraksi** (*abstraction*) adalah proses berpikir dimana ide-ide dijauhkan (*distanced*) dari objek konkretnya. Dalam konteks system modelling, abstraksi adalah proses **menghilangkan segala sesuatu yang tidak perlu atau tidak relevan** dari sebuah model sistem (atau dari suatu view model tersebut), bergantung pada tujuannya.
> >
> > Contoh: Peta jalur kereta bawah tanah (seperti peta Tube London) sengaja membuang skala geografis yang akurat dan hanya menampilkan urutan stasiun serta koneksi antar jalur. Detail jarak sebenarnya tidak relevan bagi penumpang yang hanya ingin tahu cara berpindah jalur, sehingga detail itu diabstraksikan keluar. Inilah esensi abstraksi: menyaring agar yang tersisa benar-benar berguna.
> >
> > ```mermaid
> > flowchart LR
> >     R["Reality<br/>(detail lengkap)"] -->|"abstraction<br/>(buang detail tak relevan)"| M["Model<br/>(facet yang relevan)"]
> >     R -.->|"detail dibuang"| X["Irrelevant detail<br/>(skala, dll.)"]
> > ```
> >
> > ### Model yang Berfokus pada Facet Tertentu
> >
> > Model-model sistem yang berbeda cenderung berfokus pada **facet** (aspek) tertentu dari sistem, misalnya fungsionalitasnya (*functionality*) atau implementasinya (*implementation*). Karena itu, sebuah model tunggal adalah **abstraksi yang tidak lengkap** (*incomplete abstraction*) dari hal yang sebenarnya.
> >
> > Namun, **kombinasi beberapa model** dapat secara bersama-sama memberikan deskripsi yang lebih lengkap, dengan syarat model-model tersebut **konsisten satu sama lain** (*consistent with each other*). Seperti dikatakan Booch dkk. (2005): "*The model is not the reality, but the best models are the ones that stick very close to reality*" — model bukanlah realitas, tetapi model terbaik adalah yang menempel sangat dekat dengan realitas.
> >
> > Analogi: Tidak ada satu foto pun yang bisa menggambarkan seluruh bangunan; tetapi gabungan foto tampak depan, samping, atas, dan denah lantai bersama-sama memberi gambaran utuh — asalkan semua foto itu konsisten menggambarkan bangunan yang sama.
> >
> > ### "All Models Are Wrong"
> >
> > Karena setiap model adalah abstraksi yang tidak lengkap, maka setiap model bersifat **tidak sempurna** (*imperfect*). Pernyataan klasik dari Box dan Draper (1987) berbunyi: "*Remember that all models are wrong; the practical question is – how wrong do they have to be to not be useful?*"
> >
> > Artinya, kita tidak perlu mengejar model yang sempurna dan menggambarkan segalanya — hal itu mustahil dan tidak praktis. Pertanyaan yang benar-benar relevan adalah: **seberapa salah** sebuah model boleh, sebelum ia menjadi **tidak berguna**? Selama model masih cukup akurat untuk tujuannya, ketidaksempurnaannya dapat diterima.
> >
> > ### Kegunaan (Usefulness) dan Audiens
> >
> > **Usefulness** (kegunaan) adalah ukuran kunci dari nilai sebuah model, meskipun sifatnya **intangible** (tidak berwujud/sulit dikuantifikasi). Kegunaan dapat ditingkatkan dengan **mengabstraksikan keluar detail yang tidak relevan** terhadap facet yang sedang difokuskan, asalkan apa yang tersisa tetap **efektif** dalam mengkomunikasikan atau mendeskripsikan facet tersebut pada tingkat yang tepat.
> >
> > Apa yang dianggap **tepat (appropriate) dan efektif** sangat bergantung pada sifat **audiens** yang dituju. Representasi yang bekerja baik bagi seorang **technical developer** kemungkinan besar tidak akan sama bergunanya bagi seorang **business stakeholder**, dan sebaliknya.
> >
> > Contoh: Class diagram dengan tipe data dan metode detail sangat berguna bagi programmer, tetapi membingungkan bagi manajer bisnis. Sebaliknya, diagram alur proses tingkat tinggi cocok untuk stakeholder bisnis namun terlalu dangkal bagi developer. Pemilihan tingkat abstraksi harus disesuaikan dengan pembacanya.

> [!cornell] #### Summary
>
> **Abstraksi** adalah proses menghilangkan hal yang tidak relevan dari model sesuai tujuannya, sehingga setiap model hanya menyoroti **facet** tertentu dan karenanya selalu menjadi **abstraksi yang tidak lengkap**. Kombinasi model yang **konsisten** dapat memberikan deskripsi lebih utuh. Prinsip "**all models are wrong**" (Box & Draper) menegaskan bahwa kesempurnaan bukanlah tujuan; pertanyaan praktisnya adalah seberapa salah sebuah model sebelum tidak berguna. **Usefulness** adalah ukuran nilai utama yang bersifat intangible, dan tingkat abstraksi yang tepat sangat bergantung pada **audiens** — developer dan business stakeholder membutuhkan representasi yang berbeda.

> [!ad-libitum]- Additional Information
>
> #### Tingkat Abstraksi dan Trade-off
>
> Semakin tinggi tingkat abstraksi, semakin mudah dipahami secara umum namun semakin sedikit detail teknis yang dapat ditindaklanjuti. Sebaliknya, semakin rendah (lebih detail), semakin akurat namun semakin sulit dibaca oleh non-teknis. Praktik terbaik adalah membuat **beberapa view** dengan tingkat abstraksi berbeda untuk audiens berbeda dari model dasar yang sama.
>
> #### Konsep "Leaky Abstraction"
>
> Joel Spolsky memperkenalkan *Law of Leaky Abstractions*: semua abstraksi non-trivial pada tingkat tertentu pasti "bocor" — detail yang seharusnya disembunyikan kadang muncul ke permukaan. Ini relevan dalam pemodelan: abstraksi yang terlalu agresif dapat menyembunyikan risiko penting.
>
> #### Self-Exploration Projects
>
> 1. Ambil satu sistem nyata (misal aplikasi ojek online) dan buat dua model: satu untuk investor (high-level), satu untuk tim engineering (detail).
> 2. Diskusikan: pada titik mana model peta transportasi menjadi "terlalu salah untuk berguna"?
> 3. Evaluasi konsistensi antara use case diagram dan class diagram suatu proyek.
>
> #### Bacaan Lanjutan
>
> - Box, G.E.P., Draper, N.R. (1987). *Empirical Model-Building and Response Surfaces*. Wiley.
> - Booch, G. et al. (2005). *The Unified Modeling Language User Guide*. Addison-Wesley.
> - Spolsky, J. (2002). *The Law of Leaky Abstractions*. Joel on Software.
