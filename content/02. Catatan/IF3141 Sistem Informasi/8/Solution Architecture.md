---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Solution Architecture
>
> > ## Questions/Cues
> >
> > - Apa beda solution architecture (taktis) dan EA (strategis)?
> > - Apa maksud solusi yang holistik?
> > - Apa tiga dimensi solution scope?
> > - Apa fungsi architecture contract?
> > - Apa dua isu utama dalam solution architecture governance?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 20-24)
>
> > ### Tactical versus Strategic
> >
> > Jika **EA** adalah arsitektur **jangka panjang dan strategis**, maka **Solution Architecture** adalah bentuk arsitektur yang lebih **jangka pendek dan taktis**. EA memandu perubahan evolusioner pada **seluruh enterprise** sepanjang waktu, sedangkan banyak dari perubahan individual tersebut memerlukan **oversight dari solution architecture**. Dengan kata lain, solution architecture mengimplementasikan langkah-langkah konkret dari road-map strategis yang ditetapkan EA.
> >
> > ### Holistic Solution
> >
> > Solution architecture harus **dibedakan dari aktivitas design konvensional**. Solution architecture adalah **deskripsi tingkat tinggi** tentang *building blocks* dari solusi total yang **holistik** dan bagaimana mereka saling *interface* serta *interoperate* untuk memenuhi requirements.
> >
> > Holistik berarti solusi tidak hanya memikirkan satu aspek (misal aplikasi), melainkan mencakup keseluruhan: proses bisnis, data, aplikasi, dan infrastruktur yang dibutuhkan agar solusi benar-benar bekerja sebagai satu kesatuan. Contoh: solusi e-payment baru tidak hanya soal aplikasi, tetapi juga perubahan proses bisnis kasir, integrasi data, dan kapasitas infrastruktur.
> >
> > ### Driving and Controlling Design
> >
> > Solution architecture menggariskan pekerjaan untuk **detailed design dan implementation** yang lebih rinci, yang kemudian perlu **diawasi atau di-govern** oleh **solution architect**. Jika ditemukan kebutuhan untuk mengubah salah satu requirement atau building block, maka solution architect adalah pihak yang **paling tepat** untuk menganalisis **dampaknya** di seluruh arsitektur dan menyelesaikan isu yang muncul. Solution architect mengendalikan desain agar tetap selaras dengan visi solusi holistik.
> >
> > ### Architecture Domains within Solution Architecture
> >
> > Pada kebanyakan organisasi, setiap solusi harus dipandang sebagai **business solution** — bukan sekadar solusi teknis. Domain dalam solution architecture mendeskripsikan **layer dari hierarchical architecture**, di mana **setiap layer menyediakan services untuk layer di atasnya** (business → application/data → infrastructure). Pandangan ini menghubungkan solution architecture dengan empat domain EA dalam skala yang lebih sempit dan taktis.
> >
> > ### Solution Scope: Focus, Breadth, Depth
> >
> > Setiap solusi perlu **scope** yang terdefinisi, dengan **tiga dimensi**:
> >
> > **Focus**: Solusi mungkin berfokus mengubah aspek **infrastructure architecture** yang requirement-nya didorong oleh ketergantungan application dan data architecture pada infrastructure services. Dalam kasus ini, **business architecture mungkin tidak ikut terlibat** — focus menentukan domain mana yang relevan.
> >
> > **Breadth**: Dalam setiap domain yang menjadi fokus, solusi berurusan dengan **set of architecture elements**. Contohnya: proses bisnis dan role orang dalam business architecture, software aplikasi dan komponen infrastruktur baru, serta perubahan pada services yang ditawarkan/dibergantungkan di setiap layer. Konteks yang lebih luas dari solution architecture adalah **EA**.
> >
> > **Depth**: Ada titik di mana **architecture description berhenti dan detailed design mengambil alih** — inilah depth. Terdapat berbagai cara mendefinisikan architecture levels; perspektif (rows) dari **Zachman Framework** layak dipertimbangkan sebagai klasifikasi tingkat kedalaman.
> >
> > ```mermaid
> > flowchart TD
> >     S["Solution Scope"]
> >     S --> F["Focus<br/>(domain mana yang relevan)"]
> >     S --> B["Breadth<br/>(elemen dalam tiap domain)"]
> >     S --> D["Depth<br/>(batas arsitektur vs detailed design)"]
> > ```
> >
> >
> > ### Architecture Contract
> >
> > **Roles dan responsibilities** harus didefinisikan **sebelum pekerjaan dimulai**, biasanya dalam bentuk **architecture contract**. Ini dapat dianggap sebagai *terms of reference* arsitektur. **Deliverables** dapat didefinisikan menggunakan tiga dimensi scope (focus, breadth, depth) yang telah dibahas. Architecture contract memperjelas ekspektasi, batasan, dan tanggung jawab antar pihak.
> >
> > ### Solution Architecture Governance: Compliance & Enforcement
> >
> > Dalam hal governance, terdapat **dua isu** utama:
> >
> > - **Compliance**: Solution architect perlu **menyadari constraints** yang dikenakan pada solusi oleh fungsi **EA** (jika ada), serta constraints dari **solution-specific requirements**. Artinya solusi harus patuh "ke atas" terhadap aturan enterprise.
> > - **Enforcement**: Solution architect pada gilirannya **menciptakan constraints** pada underlying detailed architectures dan designs (misal software architecture dan design), yang harus patuh terhadap isu-isu dalam holistic solution architecture. Artinya solusi menegakkan aturan "ke bawah" pada desain detail.
> >
> > Dengan demikian solution architect berada di tengah — patuh pada EA, dan menegakkan aturan pada desain teknis di bawahnya.

> [!cornell] #### Summary
>
> **Solution Architecture** adalah bentuk arsitektur **taktis jangka pendek** yang mengimplementasikan perubahan individual dari road-map **strategis** EA. Ia mendeskripsikan building blocks dari **solusi holistik** (business solution) tingkat tinggi serta bagaimana mereka berinteroperasi, lalu **mendorong dan mengendalikan** detailed design melalui peran solution architect yang menganalisis dampak perubahan. Domain-domainnya membentuk **hierarchical layers** yang saling menyediakan services. **Solution scope** ditentukan tiga dimensi: **focus** (domain relevan), **breadth** (elemen dalam domain), dan **depth** (batas arsitektur vs detailed design). **Architecture contract** mendefinisikan roles, responsibilities, dan deliverables di awal. **Governance** mencakup **compliance** (patuh pada constraints EA) dan **enforcement** (menetapkan constraints pada desain di bawahnya).

> [!ad-libitum]- Additional Information
>
> #### Peran Solution Architect
>
> Solution architect menjembatani **enterprise architect** (strategis) dan **technical/software architect** (implementasi). Tanggung jawab utama: menerjemahkan requirements bisnis menjadi blueprint solusi, melakukan **impact analysis**, memilih building blocks, dan mengawasi keselarasan implementasi.
>
> #### Architecture Building Blocks (ABB) vs Solution Building Blocks (SBB)
>
> Dalam TOGAF, **ABB** bersifat abstrak/agnostik vendor (apa yang dibutuhkan), sedangkan **SBB** bersifat konkret/spesifik produk (bagaimana diimplementasikan). Solution architecture banyak bekerja dengan SBB.
>
> #### Trade-off Analysis
>
> Teknik seperti **ATAM (Architecture Tradeoff Analysis Method)** membantu solution architect mengevaluasi trade-off antara quality attributes (cost, performance, security, maintainability) saat memilih building blocks.
>
> #### Self-Exploration Projects
>
> 1. Susun architecture contract sederhana untuk proyek migrasi aplikasi ke cloud, lengkap dengan deliverables per dimensi scope.
> 2. Lakukan impact analysis ketika satu requirement berubah pada solusi e-commerce holistik.
>
> #### Further Reading
>
> - The Open Group. *TOGAF Series Guide: A Practitioners' Approach to Developing Enterprise Architecture*
> - Bass, L., Clements, P., Kazman, R. *Software Architecture in Practice*
> - Erl, T. *SOA Design Patterns*
