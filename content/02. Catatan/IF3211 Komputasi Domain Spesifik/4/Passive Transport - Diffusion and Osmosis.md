---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Passive Transport - Diffusion and Osmosis
>
> > ## Questions/Cues
> >
> > - Apa itu **diffusion** dan apa yang dimaksud **concentration gradient**?
> > - Mengapa **passive transport** tidak membutuhkan energi sel?
> > - Apa itu **osmosis** dan ke arah mana air berpindah?
> > - Apa beda larutan **isotonic**, **hypertonic**, dan **hypotonic** bagi sel?
> > - Bagaimana **facilitated diffusion** lewat channel/carrier tetap tergolong pasif?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Transport (PPT 5, bagian Passive Transport / Diffusion)
> > - IF3211 — Cell Transport (PPT 5, bagian Osmosis & Tonicity)
> > - IF3211 — Cell Transport (PPT 5, bagian Facilitated Diffusion)
>
> > ### Difusi dan Concentration Gradient
> >
> > **Diffusion** adalah kecenderungan molekul untuk **menyebar merata** ke seluruh ruang yang tersedia. Meskipun **setiap molekul bergerak acak** (gerak Brown), difusi sebuah **populasi** molekul bisa **terarah** — secara statistik lebih banyak molekul berpindah dari daerah padat ke daerah renggang. Pada **dynamic equilibrium**, jumlah molekul yang menyeberang membran ke satu arah sama dengan yang menyeberang ke arah sebaliknya; tidak ada perpindahan **netto**, walau molekul individu terus bergerak.
> >
> > Zat berdifusi **menuruni concentration gradient**-nya — dari konsentrasi **tinggi** ke **rendah**. Penting: setiap zat menuruni gradiennya **sendiri**, tidak dipengaruhi gradien zat lain. Difusi zat menyeberangi membran biologis disebut **passive transport** karena **sel tidak mengeluarkan energi** untuk membuatnya terjadi — energinya berasal dari gerak termal molekul itu sendiri.
> >
> > ### Osmosis: Difusi Air
> >
> > **Osmosis** adalah difusi **air bebas** menyeberangi membran selektif permeabel. Air berdifusi dari daerah dengan konsentrasi **solut lebih rendah** ke daerah dengan konsentrasi **solut lebih tinggi**, hingga konsentrasi solut **setara** di kedua sisi. Cara mengingat: air bergerak ke arah "yang lebih ramai solut" untuk mengencerkannya. Karena membran lipid kurang permeabel terhadap air, sel sering memakai **aquaporin** (channel air) untuk mempercepat osmosis.
> >
> > ### Tonicity: Isotonic, Hypertonic, Hypotonic
> >
> > **Tonicity** adalah kemampuan larutan sekeliling untuk membuat sel **menyerap atau kehilangan** air. Bagi sel tanpa dinding (mis. sel hewan):
> >
> > - **Isotonic**: konsentrasi solut **sama** dengan di dalam sel → **tidak ada** perpindahan air netto; sel stabil.
> > - **Hypertonic**: konsentrasi solut di luar **lebih tinggi** → sel **kehilangan air** dan mengkerut (*shrivel*).
> > - **Hypotonic**: konsentrasi solut di luar **lebih rendah** → sel **menyerap air**, membengkak, bahkan bisa pecah (*lysis*).
> >
> > ```mermaid
> > flowchart TD
> >     Z["Molekul perlu menyeberang?"]
> >     Z --> NP["Nonpolar / kecil →<br/>simple diffusion (langsung lewat lipid)"]
> >     Z --> HP["Polar / ion / air"]
> >     HP --> FD["Facilitated diffusion (butuh protein, pasif)"]
> >     FD --> CH["Channel: terowongan,<br/>termasuk gated"]
> >     FD --> CA["Carrier: ubah bentuk"]
> > ```
> >
> > ### Facilitated Diffusion via Channel dan Carrier
> >
> > Pada **facilitated diffusion**, **transport protein mempercepat** perpindahan pasif molekul spesifik tanpa mengubah arahnya — zat tetap mengalir **menuruni gradien**, dan **tidak ada input energi netto** dari sel. Dua mekanismenya:
> >
> > - **Channel protein** menyediakan **koridor** bagi molekul/ion spesifik. Termasuk **aquaporin** (untuk air) dan **ion channel** yang **membuka/menutup** sebagai respons stimulus (**gated channel**).
> > - **Carrier protein** mengalami **perubahan bentuk halus** yang memindahkan sisi pengikat solut dari satu sisi membran ke sisi lain.
> >
> > Kuncinya: facilitated diffusion hanya **mempercepat** jalannya, ibarat membuka jalan tol — arah tetap ditentukan gradien, bukan oleh sel.
> >
> > ### Computational Framing: Gradient Descent dan Equilibrium State
> >
> > Difusi adalah **gradient descent** versi alam. Zat bergerak menuruni **concentration gradient** persis seperti optimizer menuruni *loss gradient* — tanpa "rencana", hanya mengikuti kemiringan secara lokal. **Dynamic equilibrium** adalah **konvergensi ke titik stasioner**: flux netto = 0 (gradien nol), meski "iterasi" mikroskopik (gerak molekul individu) tak pernah berhenti — analog dengan *stochastic equilibrium* di mana update acak saling membatalkan.
> >
> > **Passive transport** = operasi **zero-cost / no energy budget**: sistem meluncur ke state energi rendah secara spontan, seperti algoritma yang memanfaatkan entropi sistem alih-alih membelanjakan resource. **Facilitated diffusion** menambahkan **fast-path/akselerator** (protein) tanpa mengubah arah aliran — ibarat menambah indeks pada database: query jadi cepat, tapi hasil dan arahnya tetap sama. Yang krusial bagi informatika: **gated channel** adalah **gate biner stateful** (open/closed) yang dipicu sinyal, dan akumulasi/perpindahan ion melalui gerbang inilah yang membentuk **membrane potential** — sebuah **sinyal analog** yang nantinya dibaca dan dipulihkan oleh transport aktif ([[Active Transport and the Sodium-Potassium Pump]]).

> [!cornell] #### Summary
>
> **Passive transport** adalah perpindahan zat menyeberangi membran **tanpa energi sel**, digerakkan oleh **diffusion** — kecenderungan molekul menyebar **menuruni concentration gradient** dari konsentrasi tinggi ke rendah hingga mencapai **dynamic equilibrium** (flux netto nol). **Osmosis** adalah difusi air ke arah konsentrasi **solut lebih tinggi**. **Tonicity** menentukan nasib sel: **isotonic** (stabil), **hypertonic** (sel mengkerut), **hypotonic** (sel membengkak/pecah). **Facilitated diffusion** memakai **channel** (terowongan, termasuk **gated channel**) atau **carrier** (ubah bentuk) untuk mempercepat zat hidrofilik — tetap pasif karena arah ditentukan gradien. Secara komputasi, difusi adalah **gradient descent** alami dengan **biaya energi nol**, dan gated channel adalah *binary gate* pembentuk membrane potential ([[Membrane Proteins - Structure and Functions]]).

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Sel Berdinding dan Tekanan Turgor
>
> Sel tumbuhan dan bakteri punya dinding sel kaku, sehingga respons tonisitas berbeda. Di larutan **hypotonic**, dinding mencegah pecah; air masuk sampai timbul **turgor pressure** yang melawan masuknya air lebih lanjut — keadaan *turgid* yang sehat. Di larutan **hypertonic**, membran lepas dari dinding (*plasmolysis*) dan tanaman layu. Inilah mengapa air tawar baik bagi tanaman tetapi larutan garam membunuhnya.
>
> #### CS / Computational Angle: Random Walk dan Hukum Fick
>
> Difusi diturunkan dari **random walk**: simpangan rata-rata kuadrat tumbuh linear dengan waktu (⟨x²⟩ ∝ t). Secara makroskopik, **Hukum Fick** menyatakan flux ∝ −D·(dC/dx) — flux berbanding lurus dengan negatif gradien konsentrasi, identik bentuknya dengan update *gradient descent* (langkah ∝ −∇L). Memodelkan ribuan partikel random walk lalu mengamati profil konsentrasi yang menghalus adalah simulasi Monte Carlo klasik.
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasikan random walk 1000 partikel di grid 2D dengan membran berpori di tengah; plot konsentrasi tiap sisi vs waktu dan amati konvergensi ke dynamic equilibrium.
> 2. Implementasikan solver Hukum Fick 1D (finite difference) dan bandingkan kurva difusinya dengan hasil simulasi partikel.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 5 — *Passive Transport* dan *Facilitated Diffusion*.
> - Berg, H. C., *Random Walks in Biology*.
> - Crank, J., *The Mathematics of Diffusion*.
