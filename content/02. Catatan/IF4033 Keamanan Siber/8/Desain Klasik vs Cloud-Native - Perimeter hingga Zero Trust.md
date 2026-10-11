---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Desain Klasik vs Cloud-Native - Perimeter hingga Zero Trust
>
> > ## Questions/Cues
> >
> > - Apa perbedaan elemen arsitektur klasik dan cloud-native?
> > - Bagaimana batas keamanan berubah dari castle-and-moat ke Zero Trust?
> > - Apa risiko shared kernel pada container dan mitigasinya?
> > - Bagaimana desain jaringan dan identitas berubah?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud-Native Security Design (Slides 9-14)
>
> > ### Pergeseran Paradigma Arsitektur
> >
> > | Elemen | Klasik | Cloud-Native |
> > |---|---|---|
> > | Unit deployment | Aplikasi monolitik | Microservices terpisah |
> > | Batas komputasi | VM persisten | Container/Pod efemeral |
> > | Model scaling | Vertikal (VM lebih besar) | Horizontal (lebih banyak pod) |
> > | Konfigurasi | File statis di disk | Environment variable / Secrets API |
> > | Umur | Bulan/tahun ("**pets**") | Menit/jam ("**cattle**") |
> >
> > ### 1. Security Boundary: Perimeter vs Zero Trust
> >
> > - **Klasik (castle-and-moat)**: firewall perimeter kuat, **kepercayaan implisit** di dalam jaringan, keamanan berbasis **lokasi** ("jika di subnet 10.x.x.x, dipercaya").
> > - **Cloud-native (Zero Trust)**: perimeter melebur karena workload ada di mana-mana; **kepercayaan eksplisit** "*never trust, always verify*"; keamanan berbasis **identitas**, apa pun lokasinya.
> >
> > ### 2. Compute & Isolation
> >
> > - **Klasik**: virtualisasi hardware (VMware, Hyper-V); tiap VM memiliki **kernel sendiri** sehingga isolasi kuat.
> > - **Cloud-native**: virtualisasi level OS (container via runc). **Shared kernel risk**: kerentanan kernel dapat menyebabkan **container escape**. Mitigasi: **runtime tersandbox** (gVisor, Kata Containers) untuk workload tidak tepercaya.
> >
> > ### 3. Network Security
> >
> > - **Klasik**: VLAN, subnet, ACL berbasis IP; trafik **east-west** sering tidak dienkripsi dan tidak diinspeksi.
> > - **Cloud-native**: **default-deny** seluruh trafik pod-ke-pod kecuali diizinkan oleh **NetworkPolicy**; **micro-segmentation** berdasarkan label workload (bukan IP); **mTLS** via service mesh (Istio, Linkerd).
> >
> > ### 4. Identity & Access
> >
> > - **Klasik**: identitas melekat pada pengguna manusia atau IP/hostname statis; kredensial berumur panjang (API key, SSH key statis).
> > - **Cloud-native**: identitas melekat pada **workload**; **SPIFFE/SPIRE** menerbitkan identitas X.509 (**SVID**) berumur pendek yang dapat diverifikasi kriptografis; **RBAC** ketat untuk Kubernetes API server.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph K["Klasik"]
> >         K1["Firewall perimeter"] --> K2["Jaringan internal<br/>dipercaya"]
> >     end
> >     subgraph C["Cloud-Native"]
> >         C1["Default-deny"] --> C2["mTLS + workload identity<br/>di setiap hop"]
> >     end
> >     K -.->|"pergeseran"| C
> > ```

> [!cornell] #### Summary
>
> Arsitektur klasik (monolit, VM persisten, scaling vertikal, "pets") berganti menjadi cloud-native (microservices, container efemeral, scaling horizontal, "cattle"). Keamanan bergeser dari **perimeter berbasis lokasi** ke **Zero Trust berbasis identitas**, isolasi VM ke container (risiko **shared kernel**, mitigasi gVisor/Kata), ACL berbasis IP ke **NetworkPolicy + mTLS**, dan identitas statis ke **workload identity berumur pendek** (SPIFFE/SPIRE).

> [!ad-libitum]- Additional Information
>
> #### Zero Trust dan NIST SP 800-207
>
> Zero Trust Architecture (NIST SP 800-207) memakai PEP/PDP untuk keputusan per-request, sejalan dengan arsitektur ABAC pada [[Attribute-Based Access Control dan XACML]]. Model perimeter klasik dibahas di [[Segregasi Jaringan, Firewall, VPN, NAC, dan DMZ]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Terapkan NetworkPolicy default-deny pada namespace uji, lalu tambahkan allow-rule minimal agar dua service dapat berkomunikasi, dan verifikasi dengan `curl` dari pod lain.
>
> #### Bacaan Lanjutan
> - NIST SP 800-207 *Zero Trust Architecture*.
> - Dokumentasi SPIFFE/SPIRE dan Istio security.
