---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] CI Principles - Fail Fast, Immutable Artifacts and Trunk-Based Development
>
> > ## Questions/Cues
> >
> > - Apa empat prinsip yang membedakan CI sungguhan dari sekadar "punya build script"?
> > - Mengapa urutan stage pipeline penting?
> > - Mengapa artefak harus dibangun sekali lalu dipromosikan?
> > - Bagaimana menjaga feedback tetap cepat?
> > - Mengapa trunk-based development dan small batch lebih unggul?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 10-14)
>
> > ### Fail Fast, Fail Loud
> >
> > - Build yang rusak harus **memblokir merge**, bukan lolos diam-diam dan jadi masalah orang lain.
> > - Urutkan stage dari yang **paling murah dan cepat**: lint → unit test → integration test.
> > - Kegagalan harus **terlihat**: pipeline merah, tombol merge terblokir, notifikasi, bukan sekadar baris log.
> > - Pipeline adalah **gerbang, bukan saran**; tidak boleh ada budaya "merge anyway".
> >
> > ### Immutable Artifacts: Build Once, Promote Everywhere
> >
> > - Bangun container image **sekali per commit**; jangan rebuild untuk staging vs produksi.
> > - Artefak yang sama, diidentifikasi dengan **content hash**, dipromosikan dev → staging → prod tanpa berubah.
> > - Menghilangkan "jalan di staging tapi tidak di prod" akibat build berbeda yang menarik dependency berbeda.
> > - Perilaku spesifik environment berasal dari **config dan secret yang diinjeksi saat deploy**, bukan dari rebuild.
> >
> > ```mermaid
> > flowchart TD
> >     C["Commit"] --> B["Build sekali<br/>image + digest"]
> >     B --> DEV["dev"]
> >     DEV -->|"artefak sama"| ST["staging"]
> >     ST -->|"artefak sama"| PR["prod"]
> >     CFG["Config dan secret<br/>diinjeksi saat deploy"] -.-> DEV
> >     CFG -.-> ST
> >     CFG -.-> PR
> > ```
> >
> > ### Fast Feedback Loops
> >
> > - Hasil pipeline sebaiknya kembali sebelum developer berpindah konteks: **menit, bukan jam**.
> > - **Paralelkan** stage independen (unit test, lint, SAST).
> > - **Cache** dependency dan layer build secara agresif.
> > - Pipeline lambat akan dilewati, dan pipeline yang dihindari **tidak memberi keamanan sama sekali**.
> >
> > ### Trunk-Based Development dan Small Batches
> >
> > - Branch berumur pendek (jam hingga beberapa hari) yang sering di-merge ke trunk lebih baik daripada branch fitur panjang.
> > - Diff kecil lebih mudah direview, diuji, dan didiagnosis saat gagal.
> > - **Feature flag** memungkinkan pekerjaan setengah jadi di-merge dengan aman di balik toggle.
> > - Branch berumur panjang adalah tempat "merge hell" dan nilai inti CI mati diam-diam.

> [!cornell] #### Summary
>
> Empat prinsip CI: **fail fast, fail loud** (stage murah dulu, kegagalan memblokir dan terlihat), **immutable artifacts** (build sekali per commit, promosikan artefak yang sama lintas environment, config diinjeksi saat deploy), **fast feedback** (menit, paralel, cache) dan **trunk-based development dengan small batches** (branch pendek, diff kecil, feature flag). Pipeline lambat atau opsional kehilangan nilai keamanannya.

> [!ad-libitum]- Additional Information
>
> #### Feature Flag dan Dark Launch
>
> Feature flag memisahkan **deploy** dari **release**: kode masuk produksi dalam keadaan mati, lalu diaktifkan bertahap. Konsep ini dibahas lagi pada payung Release Engineering. Tools: LaunchDarkly, Unleash, OpenFeature.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ukur durasi pipeline proyek Anda per stage, lalu cari satu optimasi (paralelisasi atau caching) dan ukur lagi.
>
> #### Bacaan Lanjutan
> - trunkbaseddevelopment.com.
> - Humble & Farley — *Continuous Delivery*, Bab 5.
