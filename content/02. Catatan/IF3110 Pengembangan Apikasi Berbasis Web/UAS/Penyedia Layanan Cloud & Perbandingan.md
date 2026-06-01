---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Siapa Top Public Cloud Providers?
> >     
> > - 3 Pemain Utama?
> >     
> > - Pemain Lainnya?
> >     
> > - Mengapa perlu perbandingan layanan?
> >     
> > - Perbandingan IaaS (Compute)?
> >     
> > - Perbandingan PaaS (App Platform)?
> >     
> > - Perbandingan PaaS (Kubernetes)?
> >     
> > - Perbandingan SaaS (NoSQL DB)?
> >     
> > - Perbandingan SaaS (Data Warehouse)?
> >     
> > - Perbandingan FaaS (Serverless)?
> >     
> > - Perbandingan Storage (Object)?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-11a-Cloud-Computing.pdf (Slide 26-27)
> >     
> 
> > ### Top Public Cloud Providers
> > 
> > Pasar _public cloud_ didominasi oleh beberapa pemain besar. Tiga pemain utamanya adalah:
> > 
> > 1. **AWS (Amazon Web Services)**
> >     
> > 2. **Microsoft Azure**
> >     
> > 3. **GCP (Google Cloud Platform)**
> >     
> > 
> > Pemain besar lainnya meliputi:
> > 
> > - Alibaba Cloud
> >     
> > - Oracle
> >     
> > - IBM Cloud
> >     
> > 
> > ### Perbandingan Layanan Antar Provider
> > 
> > Sebagian besar _provider_ menawarkan layanan yang setara untuk kategori yang sama, namun seringkali dengan **nama** _**brand**_ **yang berbeda**. Memahami padanan ini penting agar kita tidak "terkunci" (_vendor lock-in_) dan bisa membandingkan harga.
> > 
> > Berikut adalah tabel perbandingan nama layanan untuk beberapa kategori paling umum:
> > 
> > |**Kategori Layanan**|**Google Cloud Platform (GCP)**|**Amazon Web Services (AWS)**|**Microsoft Azure**|**Oracle Cloud (OCI)**|
> > |---|---|---|---|---|
> > |**IaaS: Compute** (Virtual Machine)|Google Compute Engine|**Amazon EC2**|Azure Virtual Machines|OCI Compute|
> > |**PaaS: App Platform** (Deploy kode)|Google App Engine|**AWS Elastic Beanstalk**|Azure App Services|Oracle App Container|
> > |**PaaS: Kubernetes** (Container)|Google Kubernetes Engine (GKE)|Amazon EKS|Azure Kubernetes Service (AKS)|Oracle Kubernetes Service|
> > |**SaaS: NoSQL DB** (Database Cepat)|Google Cloud Bigtable / Datastore|**Amazon DynamoDB**|Azure Cosmos DB|Oracle NoSQL Database|
> > |**SaaS: Data Warehouse** (Analitik)|Google BigQuery|**Amazon Redshift**|Azure Synapse Analytics|Oracle Autonomous Data Warehouse|
> > |**FaaS: Serverless** (Functions)|Google Cloud Functions|**AWS Lambda**|Azure Functions|Oracle Cloud Fn|
> > |**Storage: Object** (Penyimpanan Web)|Google Cloud Storage|**Amazon S3**|Azure Blob Storage|OCI Object Storage|

> [!cornell] #### Summary
> 
> Pasar _public cloud_ didominasi oleh **tiga pemain utama: AWS, Microsoft Azure, dan GCP**. _Provider_ besar lainnya termasuk Alibaba dan Oracle. Sebagian besar _provider_ ini menawarkan layanan yang setara untuk kebutuhan komputasi inti, namun dengan nama _brand_ yang berbeda. Sebagai contoh, layanan _compute_ IaaS (VM) adalah **EC2** di AWS, **Compute Engine** di GCP, dan **Virtual Machines** di Azure. Demikian pula, layanan _object storage_ yang vital untuk aplikasi web dikenal sebagai **S3** di AWS, **Cloud Storage** di GCP, dan **Blob Storage** di Azure.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: FaaS (Function as a Service) / Serverless
> 
> Kategori `Cloud Functions / Lambda / Azure Functions` sering disebut **FaaS (Function as a Service)** atau **Serverless**.
> 
> Ini adalah evolusi dari **PaaS**.
> 
> - Di **PaaS** (seperti Google App Engine), Anda masih mendeploy sebuah _aplikasi_ (keseluruhan kode Anda) dan _platform_ itu berjalan 24/7 (meskipun bisa _scale-to-zero_).
>     
> - Di **FaaS**, Anda hanya mendeploy satu **fungsi** (potongan kode kecil, misal `function handleUpload(request) {...}`).
>     
> 
> _Function_ ini tidak berjalan sama sekali. Ia hanya "bangun" dan dieksekusi ketika ada _trigger_ (misal: ada _file_ baru di-upload ke _Storage_, atau ada _request_ API masuk). Setelah selesai, ia "tidur" lagi.
> 
> Ini adalah model _billing_ paling efisien, karena Anda hanya bayar per milidetik eksekusi _function_ Anda, bukan per jam server berjalan.
> 
> #### Topik Teknis: Vendor Lock-in
> 
> Mengapa tabel perbandingan ini penting? Karena risiko **"Vendor Lock-in"**.
> 
> - Jika Anda membangun aplikasi menggunakan **IaaS** (misal: EC2 di AWS), relatif mudah untuk memindahkan aplikasi Anda ke **GCP** (Compute Engine), karena keduanya sama-sama VM Linux standar.
>     
> - **TETAPI**, jika Anda membangun aplikasi Anda sangat bergantung pada layanan _database_ spesifik _provider_, seperti **Amazon DynamoDB**, akan **sangat sulit** untuk pindah ke GCP, karena Anda harus menulis ulang seluruh logika _database_ Anda untuk bekerja dengan **Google Bigtable**.
>     
> 
> Mengetahui padanan layanan membantu Anda membuat keputusan arsitektur yang lebih baik: apakah akan menggunakan layanan _managed_ yang spesifik dan _powerful_ (risiko _lock-in_), atau menggunakan _software_ _open-source_ (misal: MySQL) yang Anda instal sendiri di VM (lebih repot, tapi portabel).