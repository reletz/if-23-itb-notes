---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Membrane Proteins - Structure and Functions
>
> > ## Questions/Cues
> >
> > - Apa perbedaan **integral protein** dan **peripheral protein**?
> > - Apa itu **transmembrane protein** dan bagaimana strukturnya melintasi bilayer?
> > - Apa **enam fungsi utama** protein membran?
> > - Apa beda **channel protein** dan **carrier protein**?
> > - Mengapa protein, bukan lipid, yang menentukan fungsi spesifik membran?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Transport (PPT 5, bagian Membrane Proteins and Their Functions)
> > - IF3211 — Cell Transport (PPT 5, bagian Transport Proteins)
>
> > ### Integral vs Peripheral Protein
> >
> > Membran adalah **kolase berbagai protein** yang tertanam dalam matriks cair bilayer lipid. Meski lipid membentuk strukturnya, **protein-lah yang menentukan sebagian besar fungsi spesifik** membran. Berdasarkan cara melekatnya, protein membran dibagi dua:
> >
> > - **Integral protein**: menembus interior hidrofobik bilayer. Mayoritas darinya **melintasi seluruh membran** dan disebut **transmembrane protein**. Bagian hidrofobiknya terdiri dari satu atau lebih rentang asam amino **nonpolar**, sering tergulung menjadi **α-helix**. Bagian hidrofilik menonjol keluar ke lingkungan berair di kedua sisi.
> > - **Peripheral protein**: **tidak** menembus bilayer; ia terikat **longgar** di permukaan membran, sering menempel pada integral protein atau pada bagian lipid yang terekspos.
> >
> > Sifat amphipathic transmembrane protein meniru fosfolipid: bagian nonpolar "betah" di inti hidrofobik, bagian polar menonjol ke air — inilah yang menahannya tetap pada orientasi yang benar.
> >
> > ### Enam Fungsi Utama Protein Membran
> >
> > Slide deck menyebut **enam fungsi mayor** protein membran:
> >
> > 1. **Transport** — menyediakan jalur (channel) atau menggendong (carrier) zat hidrofilik menyeberangi membran.
> > 2. **Enzymatic activity** — protein berperan sebagai **enzim**, sisi aktifnya menghadap substrat; beberapa tersusun berurutan sebagai jalur metabolik.
> > 3. **Signal transduction** — **reseptor** mengikat *messenger* kimia (mis. hormon) di luar, lalu meneruskan sinyal ke dalam sel dengan perubahan bentuk.
> > 4. **Cell-cell recognition** — glikoprotein berfungsi sebagai **ID tag** yang dikenali sel lain (penting untuk imunitas).
> > 5. **Intercellular joining** — protein dari dua sel bersebelahan saling mengunci (mis. tight junction, gap junction).
> > 6. **Attachment to the cytoskeleton and extracellular matrix (ECM)** — menambatkan rangka internal sel ke matriks luar, menjaga bentuk dan posisi.
> >
> > ### Channel vs Carrier Protein
> >
> > Untuk fungsi **transport**, ada dua arsitektur **transport protein** yang melewatkan zat hidrofilik:
> >
> > - **Channel protein**: memiliki **saluran hidrofilik** — semacam **terowongan** yang dapat dipakai molekul/ion tertentu menyeberang. Contoh: **aquaporin** (memfasilitasi air) dan **ion channel** yang bisa membuka/menutup sebagai respons stimulus (**gated channel**). Channel cepat dan pasif: zat mengalir mengikuti gradiennya.
> > - **Carrier protein**: **mengikat** solut, lalu mengalami **perubahan bentuk halus** yang **memindahkan sisi pengikat** dari satu sisi membran ke sisi lain. Perubahan bentuk dipicu oleh pengikatan dan pelepasan molekul yang diangkut.
> >
> > Channel ibarat pintu/terowongan yang membiarkan aliran; carrier ibarat **pintu putar (revolving door)** yang menangkap satu "penumpang", berputar, lalu melepasnya di sisi seberang.
> >
> > ```mermaid
> > flowchart TD
> >     P["Protein Membran"]
> >     P --> I["Integral (menembus bilayer)"]
> >     P --> Pe["Peripheral (di permukaan)"]
> >     I --> TM["Transmembrane:<br/>α-helix nonpolar melintas"]
> >     TM --> Tr["Transport protein"]
> >     Tr --> Ch["Channel: terowongan,<br/>bisa gated"]
> >     Tr --> Ca["Carrier: ubah bentuk,<br/>seperti pintu putar"]
> > ```
> >
> > ### Computational Framing: Protein sebagai Pustaka API Membran
> >
> > Bila bilayer adalah *substrat pasif*, maka **protein membran adalah pustaka fungsi (API) yang menyediakan layanan aktif** sel. Enam fungsi itu memetakan rapi ke konsep sistem:
> >
> > - **Transport** = I/O port; **channel** seperti **stream** (aliran data kontinu mengikuti gradien) sedangkan **carrier** seperti **request-response RPC** (bind argumen → ubah state → deliver hasil, satu transaksi per siklus).
> > - **Enzymatic activity** = compute primitive yang mengubah input menjadi output.
> > - **Signal transduction** = **interrupt handler / event listener**: reseptor menunggu event (ligand), lalu memicu callback ke dalam sel.
> > - **Cell-cell recognition** = mekanisme **authentication** dengan token (glikoprotein sebagai sertifikat identitas).
> > - **Intercellular joining** = **network socket / handshake** antar dua node.
> > - **Cytoskeleton/ECM attachment** = **anchoring / dependency injection** ke kerangka struktural.
> >
> > Channel **gated** sangat penting untuk informatika: ia adalah **stateful binary gate** (open/closed) yang dipicu sinyal — fondasi *event-driven message passing* yang melandasi membrane potential dan transmisi saraf (lihat [[Passive Transport - Diffusion and Osmosis]] dan [[Active Transport and the Sodium-Potassium Pump]]).

> [!cornell] #### Summary
>
> Protein menentukan sebagian besar fungsi spesifik membran. **Integral protein** menembus bilayer (mayoritas **transmembrane**, melintas via **α-helix nonpolar**), sementara **peripheral protein** menempel longgar di permukaan. Enam fungsi utamanya: **transport, enzymatic activity, signal transduction, cell-cell recognition, intercellular joining, dan attachment to cytoskeleton/ECM**. Untuk transport zat hidrofilik, **channel protein** menyediakan terowongan (mis. aquaporin, gated ion channel) sedangkan **carrier protein** mengikat solut lalu berubah bentuk seperti pintu putar. Secara komputasi protein membran adalah **API/port** sel: channel = stream, carrier = RPC, reseptor = event handler, glikoprotein = token autentikasi. Gated channel sebagai *stateful binary gate* menjadi fondasi sinyal listrik sel ([[Active Transport and the Sodium-Potassium Pump]]).

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Bagaimana α-Helix Melintasi Bilayer
>
> Rentang transmembrane biasanya ~20 asam amino hidrofobik yang tergulung sebagai α-helix; panjang ini pas dengan ketebalan inti hidrofobik (~3 nm). Protein **multipass** memiliki banyak helix yang bolak-balik, membentuk struktur seperti **barrel** atau bundel — geometri inilah yang membentuk pori channel atau saku pengikat carrier. Prediksi rentang transmembrane (hydropathy plot, mis. metode Kyte-Doolittle) adalah problem bioinformatika klasik.
>
> #### CS / Computational Angle: Protein sebagai State Machine
>
> Carrier protein dimodelkan sangat baik sebagai **finite state machine**: state = {kosong-menghadap-luar, terikat-luar, terikat-dalam, kosong-menghadap-dalam}, dengan transisi dipicu oleh binding/release. Gated channel adalah FSM dua-state minimal {open, closed} dengan transisi dipicu *gating signal* (voltase, ligand, atau regangan). Memodelkannya sebagai automata memungkinkan simulasi laju transport dan respons kanal terhadap pola stimulus.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan carrier protein sebagai FSM bertingkat (Python `enum` + transition table); ukur throughput sebagai fungsi laju binding.
> 2. Ambil sekuens protein dari UniProt, buat hydropathy plot sederhana untuk menebak jumlah rentang transmembrane, bandingkan dengan anotasi resmi.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 5 — *Some Functions of Membrane Proteins* (Figure 5.7).
> - Kyte, J. & Doolittle, R. F. (1982), "A simple method for displaying the hydropathic character of a protein", *J. Mol. Biol.*
> - Alberts et al., *Molecular Biology of the Cell* — Membrane Proteins.
