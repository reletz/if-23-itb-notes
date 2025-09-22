---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic
>
> > ## Questions/Cues
> >
> > - Apa masalah pada REST API?
> >     
> > - Apa itu Query-based API?
> >     
> > - Apa itu OData?
> >     
> > - Apa itu GraphQL?
> >     
> > - Bagaimana contoh query GraphQL?
> >     
> > - Apa saja komponen GraphQL?
> >     
> > - Apa itu Data Schema?
> >     
> > - Apa itu Resolver?
> >     
> > - Bagaimana cara kerja Resolver?
> >     
> >
> > ## Reference Points
> >
> > - Slides 04a-IF4031-05c-2022-RemoteProcedureCall---GraphQL.pdf
> >     
> 
> > ### Masalah pada REST API Tradisional
> > 
> > Meskipun REST API sangat populer, model ini memiliki beberapa keterbatasan untuk kebutuhan aplikasi modern:
> > 
> > 1. **Over-fetching & Under-fetching**:
> >     
> >     - Seringkali client memerlukan beberapa kali pemanggilan ke endpoint yang berbeda hanya untuk mengumpulkan data yang saling terkait (misalnya, `GET /users/1` lalu `GET /users/1/posts`). Ini disebut _under-fetching_.
> >         
> >     - Sebaliknya, sebuah endpoint sering mengembalikan lebih banyak data (field) daripada yang sebenarnya dibutuhkan oleh client (misalnya, client hanya butuh nama siswa, tapi endpoint `GET /students` mengembalikan semua data siswa). Ini disebut _over-fetching_.
> >         
> > 2. **Endpoint Berbasis Resource**: Karena setiap endpoint terikat pada satu resource, client tidak memiliki fleksibilitas untuk meminta data secara dinamis.
> >     
> > 3. **Kurangnya Fleksibilitas**: Client tidak bisa memilih field spesifik yang ingin diambil dari sebuah resource, yang menyebabkan pemborosan bandwidth.
> >     
> > 
> > ### Apa itu Query-based API?
> > 
> > **Query-based API** adalah sebuah pendekatan desain API yang memberikan client kekuatan untuk meminta data yang mereka butuhkan dengan sangat spesifik. Client dapat mendefinisikan struktur respons yang diinginkan melalui sebuah _query_.
> > 
> > Fitur utamanya meliputi:
> > 
> > - **Response Shaping**: Client menentukan field apa saja yang ingin disertakan dalam respons.
> >     
> > - **Deep & Shallow Fetch**: Client bisa mengambil data yang berelasi dalam satu permintaan (misalnya, user beserta post dan komentarnya) atau hanya data dari satu resource saja.
> >     
> > - **Mutasi Data**: Menyediakan cara terstruktur untuk membuat, mengubah, atau menghapus data.
> >     
> > - **Fitur Lanjutan**: Biasanya mendukung fungsionalitas seperti paginasi, filtering, dan sorting langsung di dalam query.
> >     
> > 
> > ### Query-based API: OData
> > 
> > **OData (Open Data Protocol)** adalah sebuah standar query API yang diinisialisasi oleh OASIS. OData sering digunakan sebagai lapisan query di atas REST API untuk menambahkan kemampuan query yang canggih.
> > 
> > Contohnya adalah **Microsoft Graph API**, yang digunakan untuk mengakses data dari platform Microsoft 365. OData menggunakan parameter pada URL untuk melakukan filtering dan seleksi field.
> > 
> > **Contoh Query OData:**
> > 
> > 1. Mengambil field Name dari Airport dengan ID 'KSFO':
> >     
> >     `GET serviceRoot/Airports('KSFO')/Name`
> >     
> > 2. Mengambil data People dengan filter FirstName sama dengan 'Scott':
> >     
> >     `GET serviceRoot/People?$filter=FirstName eq 'Scott'`
> >     
> > 
> > ### Apa itu GraphQL?
> > 
> > **GraphQL** adalah sebuah _query language_ untuk API dan juga sebuah _runtime_ di sisi server untuk mengeksekusi query tersebut. GraphQL dikembangkan oleh Facebook pada tahun 2012 dan dirilis ke publik pada tahun 2015.
> > 
> > Ini adalah pendekatan berbasis RPC yang memungkinkan client untuk:
> > 
> > - **Meminta data dengan granularitas tinggi**: Client dapat menentukan dengan tepat data apa yang mereka butuhkan, hingga ke field individual.
> >     
> > - **Mengambil struktur data bersarang (nested graph structure)** dalam satu permintaan tunggal.
> >     
> > 
> > GraphQL sangat populer untuk antarmuka antara aplikasi web modern (seperti Single-Page Applications) dan aplikasi mobile dengan backend.
> > 
> > ### Contoh Query GraphQL
> > 
> > Struktur query GraphQL merefleksikan struktur data JSON yang akan diterima client.
> > 
> > **Contoh 1: Mengambil data satu employee**
> > 
> > ```graphQL
> > # Query
> > {
> >   employee(id: 42) {
> >     name
> >     email
> >     birthDate
> >     hireDate
> >   }
> > }
> > ```
> > 
> > ```graphQL
> > // Response
> > {
> >   "data": {
> >     "employee": {
> >       "id": 42,
> >       "name": "Jane Doe",
> >       "email": "jane@doe.name",
> >       "birthDate": "01/01/1990",
> >       "hireDate": "01/01/2020"
> >     }
> >   }
> > }
> > ```
> > 
> > **Contoh 2: Mengambil data hero beserta teman-temannya (nested data)**
> > 
> > ```graphQL
> > # Query
> > {
> >   hero {
> >     name
> >     friends {
> >       name
> >     }
> >   }
> > }
> > ```
> > 
> > ```graphQL
> > // Response
> > {
> >   "data": {
> >     "hero": {
> >       "name": "R2-D2",
> >       "friends": [
> >         { "name": "Luke Skywalker" },
> >         { "name": "Han Solo" },
> >         { "name": "Leia Organa" }
> >       ]
> >     }
> >   }
> > }
> > ```
> > 
> > ### Komponen Utama GraphQL
> > 
> > Ada dua komponen utama yang membentuk sebuah server GraphQL: **Data Schema** dan **Resolver**.
> > 
> > #### 1. Data Schema
> > 
> > **Schema** adalah kontrak antara client dan server. Ini mendefinisikan semua tipe data, query, dan mutasi yang tersedia di API. Skema ini ditulis menggunakan GraphQL's Schema Definition Language (SDL).
> > 
> > - **Strongly Typed**: Setiap field memiliki tipe data yang jelas (misalnya `String`, `Int`, `ID!`, atau tipe custom seperti `Human`). Tanda `!` berarti field tersebut _non-nullable_ (wajib ada).
> >     
> > - **Validasi**: Skema memungkinkan validasi query di sisi client dan server, memastikan query yang masuk valid sebelum dieksekusi.
> >     
> >
> > ```graphQL
> > # Mendefinisikan entry point untuk query
> > type Query {
> >   human(id: ID!): Human
> > }
> > 
> > # Mendefinisikan tipe data custom 'Human'
> > type Human {
> > 	name: String
> > 	appearsIn: [Episode]
> > 	starships: [Starship]
> > }
> >
> > # Mendefinisikan tipe enumerasi
> > enum Episode {
> > 	NEWHOPE
> > 	EMPIRE
> > 	JEDI
> > }
> >
> > type Starship {
> > 	name: String
> > }
> > ```
> > 
> > #### 2. Resolver
> > 
> >
> > **Resolver** adalah fungsi di sisi server yang bertanggung jawab untuk menyediakan data untuk setiap field dalam skema. Setiap field pada setiap tipe didukung oleh sebuah resolver.
> >
> > - **Eksekusi Bertahap**: Saat GraphQL server menerima query, ia akan mengeksekusi resolver untuk setiap field yang diminta dalam query tersebut.
> >     
> > - **Sumber Data Fleksibel**: Sebuah resolver dapat mengambil data dari mana saja: database, API lain, atau bahkan nilai statis.
> >     
> >
> > ### Bagaimana Cara Kerja Resolver?
> >
> > Ketika sebuah query dieksekusi, GraphQL akan "berjalan" melalui setiap field dan memanggil resolver yang sesuai.
> >
> > Langkah 1: Resolver untuk Query.human
> > 
> > Resolver untuk field human di dalam Query akan dieksekusi. Fungsinya adalah mengambil data user dari database berdasarkan args.id.
> >
> > ```graphQL
> > Query: {
> >   human(obj, args, context, info) {
> >     // Memanggil DB untuk mendapatkan data user berdasarkan ID
> >     return context.db.loadHumanByID(args.id).then(
> >       userData => new Human(userData)
> >     );
> >   }
> > }
> > ```
> > 
> > Langkah 2: Resolver untuk field di dalam Human
> > 
> > Setelah data Human didapatkan, GraphQL akan mengeksekusi resolver untuk setiap field yang diminta di dalam Human.
> > 
> > - **Resolver untuk `name`**: Cukup mengembalikan properti `name` dari objek `Human` yang didapat dari resolver sebelumnya.
> >     
> >     ```graphQL
> >     Human: {
> >       name(obj, args, context, info) {
> >         return obj.name;
> >       }
> >     }
> >     ```
> >     
> > - **Resolver untuk `starships`**: Resolver ini mungkin perlu melakukan pemanggilan lain (misalnya ke database `starships`) menggunakan ID yang ada di objek `Human` untuk mengambil data kapal luar angkasa yang terkait.
> >     
> >     ```graphQL
> >     Human: {
> >       starships(obj, args, context, info) {
> >         return obj.starshipIDs.map(
> >           id => context.db.loadStarshipById(id).then(
> >             shipData => new Starship(shipData)
> >           )
> >         );
> >       }
> >     }
> >     ```
> >     
> > 
> > Proses ini memastikan bahwa hanya data yang benar-benar diminta oleh client yang diambil dan diproses oleh server.

> [!cornell] #### Summary
> 
> GraphQL adalah sebuah query language API yang mengatasi kelemahan REST seperti over-fetching dan under-fetching dengan memungkinkan client untuk meminta data secara spesifik dan terstruktur dalam satu panggilan. Ini dicapai melalui sistem Schema yang mendefinisikan semua kemungkinan data yang bisa diakses dan Resolver di sisi server yang berfungsi sebagai "pemasok" data untuk setiap field dalam skema. Client mengirimkan sebuah query yang bentuknya menyerupai data JSON yang diinginkan, dan server mengeksekusi serangkaian resolver yang sesuai untuk membangun dan mengembalikan respons yang persis sama dengan permintaan client.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Masalah "N+1" Query
> 
> Karena setiap resolver adalah fungsi independen, desain yang naif dapat menyebabkan masalah performa yang dikenal sebagai "N+1 Query". Contoh: jika client meminta 100 user beserta teman-temannya, server mungkin akan menjalankan 1 query untuk mendapatkan 100 user, lalu 100 query tambahan (satu untuk setiap user) untuk mendapatkan teman-temannya.
> 
> **Solusi**: Pola desain yang umum digunakan untuk mengatasi ini adalah **DataLoader**. DataLoader adalah sebuah utilitas yang mengumpulkan semua permintaan untuk data yang sama dalam satu putaran event loop, lalu mengambil semuanya dalam satu _batch query_ (misalnya, `SELECT * FROM friends WHERE user_id IN (1, 2, 3, ...)`).
> 
> #### Pendalaman Teknis: Query vs Mutation
> 
> Selain `Query` untuk mengambil data, GraphQL juga memiliki tipe `Mutation` untuk memodifikasi data (Create, Update, Delete). Secara fungsional, mutasi bekerja sama seperti query, yaitu memiliki field dan resolver, namun secara konvensi, mutasi digunakan untuk operasi yang menyebabkan _side effect_ atau perubahan data di server.
> 
> ```
> type Mutation {
>   createReview(episode: Episode!, review: ReviewInput!): Review
> }
> ```
> 
> #### Eksplorasi Mandiri
> 
> Bangun sebuah API GraphQL sederhana untuk aplikasi blog.
> 
> 1. **Definisikan Skema**: Buat skema dengan tipe `Post`, `Author`, dan `Comment`. Definisikan query untuk `getPost(id)`, `allPosts`, dan mutasi `createPost`.
>     
> 2. **Siapkan Server**: Gunakan library seperti `Apollo Server` (untuk Node.js) atau `Graphene` (untuk Python) untuk menjalankan server GraphQL.
>     
> 3. **Tulis Resolver**: Implementasikan resolver untuk setiap field. Mulailah dengan data statis (mock data), lalu coba hubungkan ke database sungguhan (misalnya SQLite atau PostgreSQL).
>     
> 4. **Uji dengan Playground**: Gunakan antarmuka GraphiQL atau Apollo Studio Playground untuk mengirim query dan mutasi ke server Anda dan lihat hasilnya secara real-time.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi Resmi GraphQL**: [graphql.org](https://graphql.org/learn/ "null")
>     
> - **Tutorial Apollo GraphQL**: [www.apollographql.com/docs/tutorial/introduction/](https://www.google.com/search?q=https://www.apollographql.com/docs/tutorial/introduction/ "null")
>     
> - **How to GraphQL (Tutorial Interaktif)**: [www.howtographql.com](https://www.howtographql.com/ "null")
>