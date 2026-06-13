---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Active Transport and the Sodium-Potassium Pump
>
> > ## Questions/Cues
> >
> > - Apa yang membedakan **active transport** dari passive transport?
> > - Mengapa memindahkan zat **melawan gradien** membutuhkan **ATP**?
> > - Bagaimana siklus kerja **sodium-potassium pump** (Na⁺/K⁺)?
> > - Apa itu **electrochemical gradient** dan dua komponennya?
> > - Bagaimana **co-transport** memanfaatkan gradien yang sudah dibangun?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Transport (PPT 5, bagian Active Transport Uses Energy)
> > - IF3211 — Cell Transport (PPT 5, bagian The Sodium-Potassium Pump)
> > - IF3211 — Cell Transport (PPT 5, bagian Review: Passive and Active Transport)
>
> > ### Transport Melawan Gradien dan Kebutuhan Energi
> >
> > Facilitated diffusion hanya **mempercepat** lewatnya solut menembus membran, tetapi **tidak mengubah arah** — zat tetap mengalir menuruni gradien. **Active transport** berbeda: ia memindahkan zat **melawan concentration gradient**-nya, dari konsentrasi rendah ke tinggi. Karena melawan kecenderungan alami difusi, proses ini **membutuhkan energi**, biasanya berupa **ATP**.
> >
> > Manfaatnya besar: active transport memungkinkan sel **mempertahankan gradien konsentrasi internal yang berbeda dari lingkungannya** — mis. konsentrasi K⁺ tinggi dan Na⁺ rendah di dalam sel hewan, kebalikan dari luar. Gradien terkelola ini adalah "energi tersimpan" yang kelak bisa dipakai untuk kerja lain.
> >
> > ### Siklus Sodium-Potassium Pump
> >
> > **Sodium-potassium pump** (Na⁺/K⁺ pump) adalah salah satu sistem active transport, yang **menukar Na⁺ keluar dengan K⁺ masuk** menembus membran plasma sel hewan. Tiap siklus penuh memompa **3 Na⁺ keluar** dan **2 K⁺ masuk**, didukung oleh hidrolisis satu ATP. Garis besar siklusnya (carrier yang berubah bentuk):
> >
> > 1. Sisi protein yang menghadap **dalam** mengikat **3 Na⁺**.
> > 2. **ATP** terhidrolisis; gugus **fosfat menempel** pada protein (fosforilasi) → protein **berubah bentuk**.
> > 3. Bentuk baru menghadap **luar** dan **melepas 3 Na⁺** ke ekstraseluler.
> > 4. Sisi luar kini mengikat **2 K⁺**.
> > 5. Fosfat **lepas**; protein kembali ke bentuk semula, menghadap **dalam**.
> > 6. **2 K⁺ dilepas** ke sitoplasma; siklus siap diulang.
> >
> > ### Electrochemical Gradient
> >
> > Karena pompa memindahkan ion bermuatan secara tidak seimbang (3 keluar vs 2 masuk), ia membangun bukan hanya gradien **kimia** (perbedaan konsentrasi) tetapi juga gradien **listrik** (perbedaan muatan / voltase). Gabungan keduanya disebut **electrochemical gradient**, dengan dua komponen:
> >
> > - **Chemical force**: dorongan akibat perbedaan konsentrasi ion.
> > - **Electrical force**: dorongan akibat **membrane potential** (bagian dalam sel biasanya **negatif** relatif terhadap luar).
> >
> > Pompa yang menghasilkan voltase seperti ini disebut **electrogenic pump**, dan membrane potential yang ditimbulkannya adalah sumber tegangan yang vital — terutama bagi sel saraf dan otot.
> >
> > ### Co-Transport: Memanfaatkan Gradien yang Tersimpan
> >
> > Gradien yang sudah dibangun active transport bisa "dibelanjakan" untuk menggerakkan zat lain. Pada **co-transport**, sebuah carrier memakai aliran **menuruni gradien** dari satu solut (mis. Na⁺ atau H⁺ yang ingin masuk kembali) sebagai "mesin" untuk menyeret solut kedua **melawan** gradiennya (mis. glukosa atau asam amino). Jadi energi ATP dipakai sekali untuk membangun gradien ion, lalu gradien itu menjadi "baterai" yang dipakai berulang untuk transport sekunder.
> >
> > ```mermaid
> > flowchart TD
> >     A["Perlu lawan gradien?"]
> >     A -->|"Tidak"| P["Passive: gratis, ikut gradien"]
> >     A -->|"Ya"| AC["Active transport"]
> >     AC --> PR["Primary: ATP langsung<br/>(Na+/K+ pump)"]
> >     AC --> SE["Secondary / Co-transport:<br/>pakai gradien ion sbg 'baterai'"]
> >     PR --> EG["Bangun electrochemical gradient"]
> >     EG --> SE
> > ```
> >
> > ### Computational Framing: Membelanjakan Energy Budget untuk Melawan Entropi
> >
> > Bagi mahasiswa informatika, active transport adalah operasi yang **membelanjakan dari energy budget** untuk melawan kecenderungan alami sistem. Passive transport "gratis" (mengikuti gradien, seperti gravity-assisted), sedangkan active transport seperti **mengangkat data ke level lebih tinggi melawan entropi — butuh kerja**. ATP adalah **mata uang energi**: tiap operasi pompa membayar tepat satu "token" ATP, mirip *rate limiting* berbasis kredit di mana tiap request mengkonsumsi kuota.
> >
> > Na⁺/K⁺ pump bekerja sebagai **state machine berfosforilasi**: state berubah saat fosfat ditempel/dilepas, persis seperti **flag/dirty-bit** yang mengubah perilaku objek. **Electrochemical gradient** yang dibangun adalah **charged capacitor / baterai** — energi tersimpan dalam bentuk potensi listrik, yaitu **membrane potential** sebagai *sinyal analog* yang merepresentasikan state sel. **Co-transport** adalah pola **energy recycling**: alih-alih membayar ATP lagi, sistem "mendaur ulang" energi potensial yang sudah tersimpan di gradien — analog dengan **caching hasil mahal** lalu memakainya berulang untuk operasi turunan. Inilah penutup loop dari gated channel pasif ([[Passive Transport - Diffusion and Osmosis]]): pompa aktif **memulihkan gradien** (mengisi ulang baterai) yang dikuras oleh aliran pasif melalui channel.

> [!cornell] #### Summary
>
> **Active transport** memindahkan solut **melawan concentration gradient**-nya sehingga **membutuhkan energi (ATP)**, memungkinkan sel mempertahankan gradien internal yang berbeda dari lingkungan. **Sodium-potassium pump** menukar **3 Na⁺ keluar dan 2 K⁺ masuk** per ATP melalui siklus fosforilasi–perubahan bentuk. Pemompaan ion tak seimbang ini membangun **electrochemical gradient** — gabungan gaya **kimia** (konsentrasi) dan **listrik** (**membrane potential**) — menjadikan pompa bersifat **electrogenic**. **Co-transport** lalu "membelanjakan" gradien ion tersimpan sebagai *baterai* untuk menyeret zat lain melawan gradiennya tanpa ATP tambahan. Secara komputasi, active transport adalah pengeluaran dari **energy budget** untuk melawan entropi, pompa adalah *state machine berfosforilasi*, gradien adalah *kapasitor terisi*, dan co-transport adalah *energy recycling* yang melengkapi gerbang pasif di [[Passive Transport - Diffusion and Osmosis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Membrane Potential dan Potensial Aksi
>
> Na⁺/K⁺ pump menjaga gradien yang "diisi" sebelum sel saraf menembak. Saat **action potential**, gated Na⁺ channel terbuka dan Na⁺ membanjir masuk menuruni gradien (depolarisasi), lalu K⁺ keluar (repolarisasi) — pompa kemudian bekerja di latar belakang memulihkan gradien. Jadi pompa = "pengisi baterai", channel = "pelepasan cepat". Sekitar sepertiga energi metabolik sel hewan dihabiskan hanya untuk menjalankan pompa ini.
>
> #### CS / Computational Angle: Hodgkin-Huxley sebagai Model Komputasi
>
> Model **Hodgkin-Huxley** memformalkan membran sebagai **rangkaian listrik**: kapasitor (bilayer) paralel dengan resistor variabel (kanal ion) dan sumber tegangan (gradien). Persamaan diferensialnya disimulasikan numerik untuk mereproduksi spike saraf — fondasi *spiking neural network*. Di sini terlihat jembatan langsung biologi→komputasi: ion pump membangun "catu daya", gated channel adalah "transistor" yang men-switch arus, dan membrane potential adalah sinyal analog yang dikodekan jadi spike biner.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan Na⁺/K⁺ pump sebagai state machine berfosforilasi (Python); hitung konsumsi ATP untuk memindahkan N ion dan plot gradien vs waktu.
> 2. Simulasikan model Hodgkin-Huxley sederhana (atau Integrate-and-Fire) dan amati bagaimana gangguan pada laju pompa mengubah pola spike.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 5 — *Active Transport* dan Figure 5.15/5.16.
> - Hodgkin, A. L. & Huxley, A. F. (1952), *Journal of Physiology* — model konduksi saraf.
> - Skou, J. C. — penemuan Na⁺/K⁺-ATPase (Nobel Kimia 1997).
