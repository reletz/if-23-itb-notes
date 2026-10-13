---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Zero Trust dan Defense in Depth
>
> > ## Questions/Cues
> >
> > - Apa tenet inti Zero Trust dan komponen arsitekturnya?
> > - Bagaimana micro-segmentation membatasi blast radius?
> > - Apa peran service mesh, BFF, dan enclave/TEE?
> > - Bagaimana lapisan defense in depth saling menutupi?
> > - Mengapa "God Service" adalah anti-pattern?
> >
> > ## Reference Points
> >
> > - IF5161 — W04 Secure Architecture and Design Review, "Part 2: Modern Techniques & Patterns" (bagian "Beyond the Perimeter: Zero Trust" s.d. "Architecture Anti-Pattern: The God Service")
>
> > ### Zero Trust Architecture
> >
> > Tenet inti (NIST SP 800-207): **"Never trust, always verify."** Asumsinya, **jaringan pada dasarnya hostile**, sehingga lokasi di dalam perimeter tidak memberi kepercayaan. Komponen utama: **Policy Engine**, **Policy Administrator**, dan **Policy Enforcement Point (PEP)**.
> >
> > | Aspek | Arsitektur tradisional | Zero Trust |
> > |---|---|---|
> > | Kepercayaan | Dalam perimeter = dipercaya | Tidak ada kepercayaan implisit |
> > | Kontrol | Firewall di tepi | Identitas, perangkat, konteks di setiap akses |
> > | Pergerakan lateral | Mudah setelah menembus | Dibatasi **micro-segmentation** |
> >
> > Pada praktiknya, **micro-segmentation** membuat setiap workload hanya dapat berbicara dengan peer yang diizinkan, sehingga **blast radius terkurung pada satu workload**.
> >
> > ### Pola Cloud-Native dan Data-Centric
> >
> > - **Service Mesh** (Istio, Linkerd; sidecar proxy): **mTLS otomatis**, authorization terpusat, observability. Menegakkan *complete mediation* di lapisan infrastruktur.
> > - **API Security dengan BFF (Backend-for-Frontend)**: mencegah over-fetching, **eksposur langsung database**, dan CWE-284 (Improper Access Control).
> > - **Enclave dan TEE**: memproses data sensitif (PHI/finansial) di **cloud yang tak dipercaya**; data tetap terproteksi saat diproses.
> >
> > ### Defense in Depth
> >
> > Lapisan-lapisan: **jaringan → identitas → aplikasi → data**. Prinsip kuncinya: jika jaringan ditembus, kontrol identitas menghentikan penyerang; jika aplikasi dieksploitasi, **enkripsi data melindungi "crown jewels"**.
> >
> > ```mermaid
> > flowchart TB
> >     N["Network: segmentasi, WAF"] --> I["Identity: IAM, MFA, mTLS"]
> >     I --> A["Application: validasi, authZ, rate limit"]
> >     A --> D["Data: enkripsi, tokenisasi, TEE"]
> >     X["Penyerang menembus satu lapisan"] -.dihentikan lapisan berikutnya.-> D
> > ```
> >
> > ### Anti-Pattern: "God Service"
> >
> > Satu service yang menguasai terlalu banyak fungsi dan izin: **satu kompromi = seluruh sistem jebol**. Solusi: **dekomposisi menjadi service per-domain dengan least privilege** ([[Prinsip Desain Saltzer dan Schroeder]]).
> >
> > ```mermaid
> > flowchart LR
> >     subgraph SEBELUM["God Service"]
> >         G["Satu service:<br/>auth + payment + report + admin"] --> DB1[("Satu DB")]
> >     end
> >     subgraph SESUDAH["Dekomposisi"]
> >         S1["Auth"] --> D1[("Auth DB")]
> >         S2["Payment"] --> D2[("Payment DB")]
> >         S3["Report"] --> D3[("Read replica")]
> >     end
> > ```

> [!cornell] #### Summary
>
> **Zero Trust** ("never trust, always verify") menganggap jaringan hostile dan menegakkan kebijakan di setiap akses lewat Policy Engine, Policy Administrator, dan PEP; **micro-segmentation** membatasi blast radius. Pola cloud-native (**service mesh, BFF, enclave/TEE**) memindahkan penegakan kontrol ke infrastruktur dan data. **Defense in depth** memastikan tiap lapisan menutupi kegagalan lapisan lain, sedangkan **God Service** adalah anti-pattern yang melipatgandakan dampak kompromi.

> [!ad-libitum]- Additional Information
>
> #### Zero Trust Bukan Produk
> Zero Trust adalah **model arsitektur**, bukan satu produk. Implementasi bertahap: inventarisasi aset dan alur, identitas kuat untuk manusia dan workload (SPIFFE/SPIRE), kebijakan akses berbasis konteks, lalu telemetri berkelanjutan. Hubungkan dengan [[Alur dan Komponen Threat Analysis]] untuk menentukan aset yang pertama disegmentasi, dan [[Model Otorisasi RBAC ABAC dan ReBAC]] untuk kebijakan akses.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang Istio/Linkerd di cluster lokal (kind/minikube), aktifkan mTLS strict, dan buktikan koneksi plaintext ditolak.
> 2. Gambar ulang arsitektur monolit proyek Anda menjadi service per-domain dengan matriks izin antar-service.
>
> #### Bacaan Lanjutan
> - NIST SP 800-207 Zero Trust Architecture
> - Google BeyondCorp papers
