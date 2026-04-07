---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Regulation of Enzyme Activity: Inhibition Types
>
> > ## Questions/Cues
> >
> > - Mengapa inhibitor kompetitif mengubah nilai Km?
> > - Bagaimana inhibitor nonkompetitif mempengaruhi Vmax?
> > - Apa perbedaan mekanistik antara inhibitor reversibel dan ireversibel?
> > - Kapan inhibisi alosterik muncul dalam regulasi metabolik?
> > - Bagaimana nilai Ki dihitung dari data kinetik?
> >
> > ## Reference Points
> >
> > - Lecture_Enzyme_Inhibition.pptx (Slides 30-32)
> > - Campbell_Biology_in_Focus.pdf (Chapter 6, Pages 30‑31)
> > - Metabolism_IF3211.pdf (Page 30)
>
> > ### Konsep Dasar Inhibisi Enzim
> >
> > Enzim berfungsi sebagai katalis biologis yang mempercepat laju reaksi dengan menurunkan energi aktivasi (Ea). Aktivitas enzim dapat diatur secara reversibel atau ireversibel oleh molekul inhibitor yang berikatan dengan enzim. Pada dasarnya, inhibitor dapat dibagi menjadi dua kategori utama: **inhibitor kompetitif** dan **inhibitor nonkompetitif**, yang masing‑masing memiliki cara berikatan dan konsekuensi kinetik yang berbeda. Selain itu, terdapat sub‑kategori seperti **inhibitor ireversibel** yang membentuk ikatan kovalen kuat, serta **inhibitor alosterik** yang mengikat pada situs selain situs aktif dan menginduksi perubahan konformasi enzim.
> >
> > Inhibitor kompetitif memiliki struktur mirip substrat sehingga dapat bersaing untuk mengisi situs aktif enzim. Ketika inhibitor menempati situs aktif, substrat tidak dapat berikatan, sehingga laju reaksi berkurang. Namun, penambahan konsentrasi substrat yang tinggi dapat mengatasi kompetisi ini, sehingga nilai maksimum laju (Vmax) tetap tidak berubah, sementara nilai konsentrasi setengah maksimal (Km) tampak meningkat. Hal ini tercermin dalam diagram Lineweaver‑Burk sebagai pergeseran kemiringan garis tanpa perubahan intercept pada sumbu y.
> >
> > Sebaliknya, inhibitor nonkompetitif berikatan pada situs lain (situs allosterik) yang tidak tumpang tindih dengan situs aktif. Ikatan ini menyebabkan perubahan konformasi pada situs aktif sehingga afinitasnya terhadap substrat berkurang. Karena ikatan dapat terjadi baik pada enzim bebas maupun pada kompleks enzim‑substrat, nilai Vmax menurun sementara Km tetap relatif tidak berubah. Pada plot Lineweaver‑Burk, ini terlihat sebagai pergeseran intercept pada sumbu y tanpa mengubah kemiringan.
> >
> > Inhibitor ireversibel biasanya berupa senyawa toksik yang membentuk ikatan kovalen dengan residu amino penting di dalam situs aktif, misalnya pada residu serin atau sistein. Ikatan ini bersifat permanen sehingga enzim menjadi tidak aktif secara permanen, bahkan setelah inhibitor dihilangkan. Karena proses ini melibatkan perubahan kimiawi pada enzim, regulasi melalui inhibitor ireversibel biasanya bersifat jangka panjang dan terkait dengan mekanisme pertahanan sel atau efek farmakologis racun.
> >
> > Inhibisi alosterik merupakan bentuk regulasi yang lebih halus, di mana molekul regulator (aktivator atau inhibitor) mengikat pada situs alosterik yang terpisah dari situs aktif. Ikatan ini dapat meningkatkan atau menurunkan afinitas enzim terhadap substrat melalui perubahan konformasi. Inhibisi alosterik sering muncul dalam jalur metabolik utama, memungkinkan sel menyesuaikan flux metabolik secara dinamis sesuai kebutuhan energi dan bahan baku.
> >
> > ### Mekanisme Kinetik dan Parameter Inhibisi
> >
> > Untuk mengkuantifikasi kekuatan inhibitor, digunakan parameter **konstanta inhibisi (Ki)**, yang merupakan konsentrasi inhibitor yang menghasilkan setengah penghambatan pada laju maksimal. Ki dapat ditentukan melalui analisis plot Dixon atau plot Cornish‑Bowden, yang memanfaatkan variasi konsentrasi substrat dan inhibitor. Nilai Ki yang kecil menunjukkan inhibitor yang sangat kuat.
> >
> > Pada inhibitor kompetitif, persamaan Michaelis‑Menten yang dimodifikasi menjadi:
> >
> > \[
> >
> > v = \frac{V_{\max}[S]}{K_m\left(1+\frac{[I]}{K_i}\right)+[S]}
> >
> > \]
> >
> > sehingga penambahan [I] meningkatkan nilai apparent Km (K_m,app) tetapi tidak mengubah Vmax.
> >
> > Pada inhibitor nonkompetitif, persamaan berubah menjadi:
> >
> > \[
> >
> > v = \frac{V_{\max}\left(1+\frac{[I]}{K_i}\right)^{-1}[S]}{K_m+[S]}
> >
> > \]
> >
> > sehingga Vmax berkurang menjadi Vmax,app = Vmax/(1+[I]/K_i) sementara Km tetap.
> >
> > Inhibitor campuran (mixed inhibition) menggabungkan karakteristik kompetitif dan nonkompetitif; inhibitor dapat berikatan pada enzim bebas dan kompleks enzim‑substrat dengan afinitas yang berbeda (K_i dan K_i′). Persamaan umum untuk mixed inhibition:
> >
> > \[
> >
> > v = \frac{V_{\max}[S]}{K_m\left(1+\frac{[I]}{K_i}\right)+[S]\left(1+\frac{[I]}{K_i'}\right)}
> >
> > \]
> >
> > Jika K_i = K_i′, maka mixed inhibition menyederhanakan menjadi nonkompetitif; jika K_i′ → ∞, menjadi kompetitif murni.
> >
> > Memahami perbedaan ini penting bagi desain obat, karena banyak inhibitor klinis (mis. inhibitor ACE, inhibitor kinase) dirancang untuk menargetkan situs aktif secara kompetitif atau semuaosterik tergantung pada kebutuhan spesifisitas dan efek samping.
> >
> > ### Contoh Klinis dan Biologis
> >
> > **Inhibitor kompetitif**:
> >
> > - **Statin** (mis. lovastatin) meniru struktur HMG‑CoA dan bersaing untuk mengikat pada HMG‑CoA reduktase, menghambat biosintesis kolesterol.
> > - **Methotrexate** bersaing dengan asam folat pada dihidrofolat reduktase, menghambat sintesis DNA pada sel kanker.
> >
> > **Inhibitor nonkompetitif**:
> >
> > - **Metformin** berikatan pada situs regulasi kompleks enzim glukosa-6‑fosfatase, mengurangi produksi glukosa hati tanpa mengubah afinitas substrat.
> > - **Allopurinol** mengikat pada situs allosterik xanthine oxidase, menurunkan produksi asam urat pada gout.
> >
> > **Inhibitor ireversibel**:
> >
> > - **Aspirin** mengasetilasi residu serin pada siklooksigenase (COX), menghentikan sintesis prostaglandin secara permanen sampai sintesis ulang enzim.
> > - **Organophosphate** (seperti sarin) menginhibisi acetylcholinesterase secara ireversibel, menyebabkan akumulasi asetilkolin dan gangguan neurokimia.
> >
> > **Inhibisi alosterik**:
> >
> > - **ATP** berfungsi sebagai inhibitor alosterik pada fosfofruktokinase‑1 (PFK‑1) dalam glikolisis, menurunkan aktivitas enzim ketika energi sel melimpah.
> > - **Citrate** menghambat citrat sintase pada siklus asam sitrat, mengatur flux siklus sesuai kebutuhan biosintetik.
> >
> > ### Dampak Regulasi Inhibisi terhadap Metabolisme Seluler
> >
> > Regulasi enzim melalui inhibitor memungkinkan sel menyesuaikan kecepatan jalur metabolik secara cepat dan reversibel. Misalnya, akumulasi produk akhir suatu jalur dapat berfungsi sebagai inhibitor feedback (biasanya alosterik) untuk menghentikan produksi berlebih, menghemat sumber daya seluler. Di sisi lain, inhibitor ireversibel dapat berperan dalam mekanisme pertahanan sel terhadap senyawa beracun, atau sebagai strategi terapeutik untuk menonaktifkan enzim patogenik. Memahami sifat kinetik masing‑masing tipe inhibitor membantu memprediksi konsekuensi metabolik pada level jaringan dan organ.

> [!cornell] #### Summary
>
> **Inhibitor kompetitif** meningkatkan Km (menurunkan afinitas) tanpa mengubah Vmax, sedangkan **inhibitor nonkompetitif** menurunkan Vmax tanpa memengaruhi Km; keduanya dapat dibedakan melalui analisis kinetik (Lineweaver‑Burk, Dixon). **Inhibitor ireversibel** membentuk ikatan kovalen permanen, menghasilkan penonaktifan enzim yang tidak dapat dipulihkan, sementara **inhibisi alosterik** mengatur aktivitas enzim melalui perubahan konformasi pada situs selain situs aktif. Parameter **Ki** memberikan ukuran kuantitatif kekuatan inhibitor dan menjadi dasar penting dalam desain obat serta pemahaman regulasi metabolik seluler.

> [!ad-libitum]- Additional Information
>
> #### Formal Derivation of Ki from Dixon Plot
>
> Pada plot Dixon, laju reaksi (v) diplot terhadap konsentrasi inhibitor ([I]) pada beberapa konsentrasi substrat tetap. Persamaan umum:
>
> \[
>
> \frac{1}{v}= \frac{K_m}{V_{\max}}\frac{1}{[S]}\left(1+\frac{[I]}{K_i}\right)+\frac{1}{V_{\max}}
>
> \]
>
> Garis-garis pada konsentrasi substrat berbeda akan berpotongan pada sumbu x pada nilai \(-K_i\). Analisis ini memberikan nilai Ki yang tidak dipengaruhi oleh variasi [S], menjadikan Dixon plot metode yang robust untuk inhibitor kompetitif maupun nonkompetitif.
>
> #### Mixed Inhibition and Its Biological Relevance
>
> Mixed inhibition mencerminkan situasi fisiologis di mana inhibitor dapat berikatan pada enzim baik dalam keadaan bebas maupun terikat substrat, misalnya pada enzim kinasa yang memiliki domain regulator terpisah. Contoh klinis: **Imatinib** pada BCR‑ABL kinase berikatan pada konformasi aktif dan inaktif, menghasilkan efek mixed inhibition yang meningkatkan selektivitas terhadap sel kanker.
>
> #### Computational Modeling of Enzyme‑Inhibitor Interactions
>
> Teknik docking molekuler (mis. AutoDock Vina) dan simulasi dinamika molekuler (MD) memungkinkan prediksi orientasi dan afinitas inhibitor pada situs aktif atau alosterik. Parameter scoring (binding energy) dapat dikalibrasi dengan nilai Ki eksperimental untuk memperbaiki model. Penggunaan **QM/MM** (Quantum Mechanics/Molecular Mechanics) memberikan insight pada proses pembentukan ikatan kovalen pada inhibitor ireversibel.
>
> #### Edge Cases: Time‑Dependent Inhibition
>
> Beberapa inhibitor menunjukkan kinetika inaktivasi yang bergantung waktu (slow‑binding inhibition). Pada tahap pertama, inhibitor berikatan reversibel dengan enzim, diikuti oleh konversi lambat menjadi kompleks enzim‑inhibitor yang lebih stabil. Model matematis melibatkan dua konstanta rate (k_on, k_off) serta konstanta inaktivasi (k_inact). Contoh: **Carbamazepine** pada enzim CYP3A4.
>
> #### Self‑Exploration Projects
>
> 1. **Simulasi Kinetik Inhibisi**: Buat skrip Python (menggunakan SciPy) untuk mensimulasikan kurva Michaelis‑Menten pada kondisi kompetitif, nonkompetitif, dan mixed inhibition. Visualisasikan perubahan Km dan Vmax pada grafik Lineweaver‑Burk.
> 2. **Docking Inhibitor pada Enzim Target**: Pilih enzim (mis. acetylcholinesterase) dan kumpulkan struktur 3D dari PDB. Lakukan docking dengan inhibitor reversibel dan ireversibel, bandingkan skor ikatan dan visualisasikan interaksi menggunakan PyMOL.
>
> #### Tools and Resources
>
> - **COPASI** – perangkat lunak simulasi jaringan metabolik yang mendukung model enzimatik dengan inhibitor.
> - **AutoDock Vina** – program docking open‑source untuk memprediksi pose inhibitor.
> - **BRENDA** – basis data enzimatik yang menyediakan nilai Km, Vmax, dan Ki untuk ribuan enzim.
> - **Enzyme Kinetics Calculator** (online) – alat bantu untuk menghitung parameter kinetik dari data eksperimen.
>
> #### Further Reading
>
> - Segel, I. H. *Enzyme Kinetics: Behavior and Analysis of Rapid Equilibrium and Steady-State Enzyme Systems*, 2nd ed., Wiley, 1993.
> - Copeland, R. A. *Evaluation of Enzyme Inhibitors in Drug Discovery*, Wiley, 2013.
> - Fersht, A. *Structure and Mechanism in Protein Science*, W. H. Freeman, 1999.
> - Trott, O., & Olson, A. J. “AutoDock Vina: Improving the Speed and Accuracy of Docking with a New Scoring Function,” *J. Comput. Chem.*, 31(2), 2010.
> - Cornish‑Bowden, A. *Fundamentals of Enzyme Kinetics*, 4th ed., Wiley, 2012.