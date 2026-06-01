---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Ultra-Large-Scale (ULS) Systems
>
> > ## Questions/Cues
> >
> > - Apa definisi Ultra-Large-Scale System (ULSS)?
> > - Masalah apa yang muncul akibat skala ULS?
> > - Apa karakteristik utama sistem ULS?
> > - Apa tiga area tantangan utama ULS?
> > - Di domain apa saja ULS systems bermunculan?
> >
> > ## Reference Points
> >
> > - Large Scale Software Development (Halaman 19-21)
> > - Large Scale Software Development (Halaman 22-29)
>
> > ### Definisi ULS System
> >
> > **Ultra-large-scale system (ULSS)** adalah istilah pada bidang Computer Science, Software Engineering, dan Systems Engineering untuk merujuk **software-intensive systems** dengan jumlah hardware, baris kode, jumlah pengguna, dan volume data yang **belum pernah terjadi sebelumnya (unprecedented)**.
> >
> > Skala ini memunculkan banyak masalah:
> >
> > - Dikembangkan & digunakan oleh **banyak stakeholder lintas organisasi**, sering dengan tujuan dan kebutuhan yang **konflik**.
> > - Disusun dari **bagian-bagian heterogen** dengan dependensi kompleks dan **emergent properties**.
> > - **Terus berevolusi**; kegagalan software, hardware, dan manusia menjadi **norma, bukan pengecualian**.
> >
> > ### Karakteristik ULS System (SEI – Carnegie Mellon)
> >
> > Dari studi *Ultra-Large-Scale Systems: The Software Challenge of the Future*:
> >
> > 1. **Decentralization** — terdesentralisasi dalam berbagai cara: data, development, evolution, dan operational control.
> > 2. **Inherently conflicting, unknowable, and diverse requirements** — dikembangkan & dipakai stakeholder beragam dengan kebutuhan berbeda, konflik, kompleks, dan berubah.
> > 3. **Continuous evolution and deployment** — kapabilitas baru diintegrasikan saat sistem beroperasi; kapabilitas lama dibuang; evolusi **kontinu, bukan bertahap (phases)**.
> > 4. **Heterogeneous, inconsistent, and changing elements** — tidak dibangun dari bagian seragam; ada *misfit*, terutama saat sistem diperluas dan diperbaiki.
> > 5. **Erosion of the people/system boundary** — manusia bukan sekadar pengguna; mereka menjadi **elemen sistem** yang memengaruhi perilaku emergent keseluruhan.
> > 6. **Normal failures** — kegagalan software & hardware adalah norma, bukan pengecualian.
> > 7. **New paradigms for acquisition and policy** — akuisisi ULS berlangsung **simultan dengan operasi** sistem dan butuh metode kontrol baru.
> >
> > ### Tiga Area Tantangan ULS
> >
> > ```mermaid
> > mindmap
> >   root((ULS Challenges))
> >     Design and Evolution
> >       Harness & koordinasi desain lintas industri
> >       Eksplorasi design space yang kompleks
> >     Orchestration and Control
> >       Aktivitas agar elemen bekerja harmonis
> >       Up-front design + policy + real-time adjustment
> >       Online modification
> >       Maintenance of quality of service
> >       Creation & execution of policies/rules
> >       Adaptation to users & contexts
> >       User-controlled orchestration
> >     Monitoring and Assessment
> >       Evaluasi desain, evolusi, orkestrasi
> >       Monitor state, behavior, health
> >       Kriteria sukses berbeda dari sistem kecil
> > ```
> >
> > - **Design and Evolution** — tantangannya menemukan cara baru meng-*harness* dan mengoordinasikan kapabilitas serta motivasi desain, bukan hanya dari perusahaan/kontraktor individual tetapi **seluruh industri**, di mana kompetisi nilai mendorong eksplorasi *design space* yang lebih kaya dan ekonomis.
> > - **Orchestration and Control** — *orchestration* adalah kumpulan aktivitas agar elemen ULS bekerja dalam **harmoni yang wajar** demi pemenuhan misi secara kontinu. Mencakup manajemen pada skala jauh melampaui kontrol terpusat tradisional; butuh kombinasi **up-front design, policy promulgation & enforcement, dan real-time adjustment**. Termasuk mendukung interdependensi dan mengendalikan konsekuensi aksi lokal terhadap keseluruhan emergent, meski tiap bagian memaksimalkan utilitas lokalnya. Pengetahuan baru yang dibutuhkan: online modification, maintenance of QoS, creation & execution of policies/rules, adaptation to users/contexts, dan enabling user-controlled orchestration.
> > - **Monitoring and Assessment** — efektivitas desain, evolusi, dan orkestrasi ULS harus dievaluasi; harus ada kemampuan memantau & menilai **state, behavior, dan overall health** sistem. Kriteria sukses/kesehatan ULS **berbeda** dari sistem kecil yang dirancang untuk tugas yang tidak berubah.
> >
> > ### Domain Munculnya ULS Systems
> >
> > - **Defense** — laporan Northrop: DoD AS bertujuan *information dominance* yang bergantung pada sistem kompleks dengan ribuan platform, sensor, decision nodes, weapons, dan warfighters terhubung lewat jaringan heterogen — "push far beyond today's systems… ultra-large-scale systems".
> > - **Financial trading** — pasca *flash crash*, sistem trading global yang sangat saling terhubung dianggap sebagai *constituent entities* dari super-system global; jumlah agen manusia & sistem komputer begitu besar sehingga menjadi instance ULS.
> > - **Healthcare** — sistem kesehatan AS disebut Kevin Sullivan "clearly an ultra-large-scale system"; membangun infrastruktur siber skala nasional menuntut pendekatan di garis depan pemahaman socio-technical.
> > - **Others** — government, transport systems (mis. air traffic control), energy distribution (mis. smart grids), dan large enterprises.

> [!cornell] #### Summary
>
> **ULS systems** adalah sistem software-intensive berskala *unprecedented* dalam hardware, kode, pengguna, dan data. Karakteristiknya: **desentralisasi, requirement yang konflik & tak terketahui, evolusi kontinu, elemen heterogen, erosi batas manusia/sistem, kegagalan sebagai norma, dan paradigma akuisisi baru**. Tiga area tantangan: **Design & Evolution, Orchestration & Control, serta Monitoring & Assessment**. ULS bermunculan di domain **defense, financial trading, healthcare, government, transport, energy, dan enterprise besar**. ULS adalah kelanjutan ekstrem dari isu pada [[Large-Scale Software Problems and Characteristics]].

> [!ad-libitum]- Additional Information
>
> #### Emergent Properties
>
> *Emergent behavior* adalah perilaku keseluruhan sistem yang tidak dapat diprediksi hanya dari memeriksa bagian-bagiannya secara terpisah. Pada ULS, karena manusia menjadi elemen sistem dan komponen terus berevolusi, perilaku emergent inilah yang justru harus di-*orchestrate* dan dimonitor.
>
> #### LS vs ULS
>
> Large-Scale masih bisa dikontrol secara relatif terpusat dengan proses & automation. **ULS melampaui batas kontrol terpusat**: tidak ada satu pihak yang "memiliki" seluruh sistem, sehingga kontrolnya bergeser ke *policy*, insentif, dan orkestrasi terdistribusi.
>
> #### Further Reading
>
> - SEI CMU ULS — http://www.sei.cmu.edu/uls/
> - SEI CMU, *Does Scale Really Matter? Ultra-Large-Scale Systems Seven Years After the Study*.
> - *Ultra-Large-Scale Systems: The Software Challenge of the Future* (SEI – Carnegie Mellon).
