---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Connections, Independence & D-Separation
> 
> > ## Questions/Cues
> >
> > - 3 Tipe Koneksi
> >     
> > - Serial (Linear)
> >     
> > - Diverging (Cabang)
> >     
> > - Converging (V-Structure)
> >     
> > - Apa itu D-Separation?
> >     
> > - Kapan informasi terblokir?
> >     
> > - Contoh Holmes & Watson
> >     
> >
> > ## Reference Points
> >
> > - File: `27. IF3170_Materi12_Seg01...pdf`
> >     
> > - Halaman: 4-7, 18 (D-Sep)
> >     
> 
> > ### 1. Tipe Koneksi & Aliran Informasi
> >
> > Untuk menentukan apakah dua variabel independen atau dependen, kita melihat jalur (_path_) dan status pengetahuannya (_evidence_).
> >
> > **A. Serial (Linear):** $A \rightarrow B \rightarrow C$  
> >
> > - Informasi mengalir dari A ke C melalui B.
> >     
> > - **Jika B TIDAK diketahui:** A dan C saling mempengaruhi (_dependent_). Mengetahui A memberi petunjuk tentang B, yang memberi petunjuk tentang C.
> >     
> > - **Jika B DIKETAHUI (Instantiated):** Hubungan terputus. A dan C menjadi **Conditionally Independent**. B memblokir aliran informasi.
> >     
> >
> > **B. Diverging (Common Cause):** $A \leftarrow B \rightarrow C$  
> >
> > - B adalah penyebab umum A dan C.
> >     
> > - **Jika B TIDAK diketahui:** A dan C berkorelasi (_dependent_). Jika A terjadi, kemungkinan B terjadi meningkat, sehingga kemungkinan C terjadi juga meningkat.
> >     
> > - **Jika B DIKETAHUI:** Hubungan terputus. A dan C menjadi **Conditionally Independent**. Mengetahui penyebab (B) memisahkan efek-efeknya.
> >     
> >
> > **C. Converging (Common Effect / V-Structure):** $A \rightarrow B \leftarrow C$  
> >
> > - A dan C adalah penyebab independen dari B.
> >     
> > - **Jika B TIDAK diketahui:** A dan C **Independen**. Informasi A tidak memberitahu apa-apa tentang C.
> >     
> > - **Jika B (atau turunannya) DIKETAHUI:** A dan C menjadi **DEPENDENT**. Ini disebut **"Explaining Away"**.
> >     
> >     - _Contoh:_ A=Hujan, C=Sprinkler, B=Rumput Basah. Jika kita tahu Rumput Basah (B=True), dan kita tahu Hujan (A=True), maka peluang Sprinkler (C=True) turun (karena hujan sudah menjelaskan basahnya rumput).
> >         
> >
> > ### 2. D-Separation (Direction-dependent Separation)
> >
> > Dua variabel d-separated (independen) jika SEMUA jalur di antara mereka terblokir.
> > 
> > Sebuah jalur terblokir jika ada node perantara $V$ di mana:
> >
> > 1. Koneksi Serial/Diverging DAN $V$ diketahui.
> >     
> > 2. Koneksi Converging DAN $V$ (maupun turunannya) **TIDAK** diketahui.
> >     
> >
> > ### 3. Contoh Kasus: Holmes & Watson
> >
> > - **Struktur:**
> >     
> > 	- Burglary $\rightarrow$ Alarm $\leftarrow$ Earthquake (Converging di Alarm).
> > 			
> > 	- Alarm $\rightarrow$ WatsonCalls & Alarm $\rightarrow$ MaryCalls (Diverging dari Alarm).
> >         
> > - **Analisis:**
> >     
> > 	- Jika _Alarm_ tidak berbunyi (tidak diketahui), Burglary dan Earthquake independen.
> > 			
> > 	- Jika _Alarm_ berbunyi (diketahui), Burglary dan Earthquake menjadi dependen (Explaining Away).
> > 			
> > 	- WatsonCalls dan MaryCalls dependen satu sama lain, KECUALI jika status _Alarm_ diketahui pasti, maka mereka jadi independen.
> > 			

> [!cornell] #### Summary
> 
> Status dependensi antar variabel dalam BN dinamis tergantung pada "Evidence" (apa yang diketahui). Untuk **Serial & Diverging:** Informasi mengalir _kecuali_ node tengah diketahui (Blocking). Untuk **Converging:** Informasi _terblokir_ secara default, tapi _mengalir_ jika node tengah (efek bersama) diketahui. Fenomena unik ini disebut _Explaining Away_. Dan Untuk **D-Separation** adalah aturan formal untuk menentukan independensi variabel dalam graf.
>     

> [!ad-libitum]- Spaced Repetition Questions
> 
> <details>
> 
> <summary><strong>1. Pada koneksi Converging ($A \to B \leftarrow C$), kapan A dan C menjadi dependen?</strong></summary>
> 
> A dan C menjadi dependen (saling mempengaruhi) HANYA JIKA B (atau keturunan B) <strong>diketahui/diamati</strong>. Jika B tidak diketahui, A dan C independen.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa istilah untuk fenomena pada struktur Converging di mana mengetahui satu penyebab menurunkan peluang penyebab lainnya?</strong></summary>
> 
> <strong>Explaining Away</strong>. (Contoh: Mengetahui rumput basah karena hujan "menjelaskan" kejadian tersebut, sehingga mengurangi kemungkinan sprinkler menyala).
> 
> </details>