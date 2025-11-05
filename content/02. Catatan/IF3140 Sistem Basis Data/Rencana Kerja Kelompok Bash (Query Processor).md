Dokumen ini merinci rencana eksekusi, pembagian tugas, dan _milestone_ untuk komponen **Query Processor (QP)** dalam proyek mDBMS Apacy.

## 1. Tinjauan Umum & Misi

**Misi:** Misi Grup "Bash" adalah menjadi "jantung" dan "otak" dari mDBMS. Kita adalah koordinator utama yang menerima _string_ query dari pengguna, mengorkestrasi _semua_ komponen lain (QO, SM, CCM, FRM), dan mengembalikan hasil akhir.

**File Utama Kita:**

- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/QueryProcessor.java`: Koordinator utama.
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/PlanTranslator.java` : Penerjemah rencana QO.
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/execution/` : Eksekutor algoritma (JOIN, ORDER BY).
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/Main.java` : Titik masuk CLI.
    

## 2. Prasyarat & Strategi "Sandbox"

Kita adalah satu-satunya grup yang bergantung pada 4 grup lainnya. Kita tidak bisa menunggu mereka selesai.

### Prasyarat #1: Kontrak `common` yang Stabil

Kita berasumsi _semua interface_ dan DTO di `apacy/common/`  sudah **FINAL** dan tidak akan berubah.

### Prasyarat #2 (TUGAS PERTAMA): Membuat _Mock Components_

Kita **wajib** membuat "Komponen Palsu" (Mocks) untuk menguji _logic_ kita secara independen. Ini adalah tugas pertama dan terpenting kita.

- **Tugas:** Buat _package_ baru: `apacy/query-processor/src/test/java/com/apacy/queryprocessor/mocks/`
    
- **Isi:**
    
    - `MockStorageManager implements IStorageManager`
        
    - `MockQueryOptimizer implements IQueryOptimizer`
        
    - `MockConcurrencyControl implements IConcurrencyControlManager`
        
    - `MockFailureRecovery implements IFailureRecoveryManager`
        
- **Contoh:** `MockStorageManager.readBlock()` akan selalu mengembalikan `List<Row>` berisi 3 baris data _dummy_ agar kita bisa menguji `JoinStrategy` dan `SortStrategy` kita.
    

## 3. Aturan Kerja & Naming Convention

Karena kita bekerja di _monorepo_.

### Format Penamaan Branch

Gunakan `feat/<komponen>/<fitur>`

- **Format:** `feat/query-processor/<nama-fitur-singkat>`
    
- **Contoh:**
    
    - `feat/query-processor/implement-nested-loop-join`
        
    - `feat/query-processor/setup-mock-components`
        
    - `feat/query-processor/fix-translator-select-bug`
        
    - `fix/query-processor/null-pointer-in-execute-query`
        

### Aturan Emas `common/`

Jika ada _bug_ atau perubahan yang diperlukan di modul `common` (misal: menambah _field_ di `ParsedQuery.java` [cite: apacy/common/src/main/java/com/apacy/common/dto/ParsedQuery.java]), **JANGAN** diubah di _branch_ QP.

1. Buat _branch_ baru: `feat/common/add-field-to-parsed-query`.
    
2. Lakukan perubahan.
    
3. Minta _review_ dan _approval_ dari **SEMUA 5 PIC GRUP** sebelum _merge_ ke `main`.
    

## 4. Pembagian Tugas & Arsitektur Internal (Tim 4-5 Orang)

Arsitektur _boilerplate_ kita sudah membagi tugas dengan rapi:


|**Peran**|**PIC (Orang)**|**File Utama yang Dipegang**|**Deskripsi Tugas**|
|---|---|---|---|
|**Koordinator / PIC Integrasi**|Person 1|`QueryProcessor.java`|Memegang alur `executeQuery()` utama. Menjahit semua komponen (asli atau _mock_). Mengimplementasikan _logic_ transaksi `try-catch-finally`.|
|**Penerjemah Rencana**|Person 2|`PlanTranslator.java`|Menerjemahkan `ParsedQuery` (dari QO) menjadi DTOs (`DataRetrieval`, `DataWrite`) untuk SM.|
|**Spesialis Join**|Person 3|`execution/JoinStrategy.java`|Fokus murni pada implementasi algoritma `nestedLoopJoin`, `hashJoin` (bonus), dll.|
|**Spesialis Sort**|Person 4|`execution/SortStrategy.java`|Fokus murni pada implementasi algoritma `ORDER BY` (termasuk `externalSort` sebagai bonus).|
|**QA & CLI** (Jika 5 org)|Person 5|`Main.java`, `*Test.java`, `mocks/*`|Bertanggung jawab membuat & merawat _Mock Components_. Membuat CLI interaktif. Menulis _test case_ untuk menguji _logic_ Person 1-4.|

_(Jika 4 orang, tugas "QA & CLI" dipegang oleh "Koordinator")_

## 5. Roadmap & Kejaran per Milestone

Kita menggunakan asumsi "keleletan 1 hari", jadi target internal kita selalu H-1 dari _deadline_ resmi.

### Minggu 0: Persiapan (Sekarang s/d 7 Nov)

- **Tujuan:** Menyiapkan _sandbox_ testing.
    
- **Tugas:**
    
    - (Person 5/1) Membuat 4 _Mock Components_ di `src/test/java/`.
        
    - `MockQueryOptimizer.parseQuery()` harus bisa mengembalikan `ParsedQuery` _dummy_ untuk `SELECT`, `UPDATE`, `JOIN`.
        
    - `MockStorageManager.readBlock()` harus bisa mengembalikan `List<Row>` _dummy_.
        
- **Branch:** `feat/query-processor/setup-mock-components`
    

### Milestone 1 (Target: 12 Nov, Deadline Asli: 13 Nov)

- **Tujuan:** Alur "Read Path" (`SELECT ... FROM ... WHERE ...`) berfungsi menggunakan _Mocks_.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - Isi `QueryProcessor.java` untuk meng-inisialisasi 4 _Mock Components_.
            
        - Isi `QueryProcessor.executeQuery()` untuk alur `SELECT` sederhana.
            
        - **Alur:** `QO.parseQuery()` -> `QO.optimizeQuery()` -> `CCM.beginTransaction()` -> `PlanTranslator.translateToRetrieval()` -> `CCM.validateObject(..., READ)` -> `SM.readBlock()` -> `CCM.endTransaction(true)` -> Kembalikan `ExecutionResult`.
            
    - **Person 2 (Penerjemah):**
        
        - Implementasi `PlanTranslator.translateToRetrieval()` [cite: apacy/query-processor/src/main/java/com/apacy/queryprocessor/PlanTranslator.java] secara penuh.
            
    - **Person 5 (QA/CLI):**
        
        - Implementasi _loop_ CLI dasar di `Main.java` [cite: apacy/query-processor/src/main/java/com/apacy/queryprocessor/Main.java] yang menerima input `String` dan memanggil `QueryProcessor.executeQuery()`.
            
- **Kejaran:** Pengguna bisa mengetik `SELECT * FROM users` di CLI, dan data _dummy_ dari `MockStorageManager` muncul di layar.
    

### Milestone 2 (Target: 19 Nov, Deadline Asli: 20 Nov)

- **Tujuan:** Alur "Write Path" (`UPDATE`, `DELETE`) & _Post-Processing_ (`JOIN`, `ORDER BY`).
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - Integrasikan `JoinStrategy` dan `SortStrategy` ke alur `SELECT` (dipanggil _setelah_ data diterima dari `SM.readBlock()`).
            
        - Tambahkan `if/else` di `executeQuery` untuk menangani `ParsedQuery.queryType()` "UPDATE" dan "DELETE".
            
    - **Person 2 (Penerjemah):**
        
        - Implementasi `PlanTranslator.translateToWrite()` dan `translateToDeletion()`.
            
    - **Person 3 (Join):**
        
        - Implementasi `JoinStrategy.nestedLoopJoin()` [cite: apacy/query-processor/src/main/java/com/apacy/queryprocessor/execution/JoinStrategy.java].
            
    - **Person 4 (Sort):**
        
        - Implementasi `SortStrategy.sort()` (logika `ORDER BY` dasar) [cite: apacy/query-processor/src/main/java/com/apacy/queryprocessor/execution/SortStrategy.java].
            
- **Kejaran:** `SELECT ... JOIN ... ORDER BY ...` berfungsi (di-eksekusi di _memory_ QP). Alur `UPDATE` dan `DELETE` berhasil memanggil _method_ yang benar di _Mock_ SM.
    

### Milestone 3 (Target: 26 Nov, Deadline Asli: 27 Nov)

- **Tujuan:** Integrasi Penuh Transaksi (CCM & FRM) & _Error Handling_ (Fitur Wajib).
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - **Refaktor Besar `executeQuery()`:** Ini adalah tugas terpenting. Bungkus _seluruh_ alur eksekusi dalam _block_ `try-catch-finally`.
            
        - `int txId = CCM.beginTransaction()` (di luar `try`).
            
        - **`try { ... }`**:
            
            1. Panggil `QO.parseQuery()` (bisa `throw`).
                
            2. Panggil `QO.optimizeQuery()`.
                
            3. (Untuk `UPDATE/DELETE`): Panggil `CCM.logObject()` (mencatat _before-image_).
                
            4. Panggil `CCM.validateObject()` (bisa `throw` jika `Response.isAllowed()` == `false`).
                
            5. Panggil `SM.readBlock/writeBlock/deleteBlock()` (bisa `throw`).
                
            6. Panggil `CCM.endTransaction(txId, true)` (Commit).
                
            7. Panggil `FRM.writeLog()` (mencatat `ExecutionResult` sukses).
                
            8. `return` `ExecutionResult` (sukses).
                
        - **`catch (Exception e) { ... }`**:
            
            1. Panggil `CCM.endTransaction(txId, false)` (Abort).
                
            2. Panggil `FRM.recover(new RecoveryCriteria("UNDO_TRANSACTION", ...))`
                
            3. `return` `ExecutionResult` (gagal, dengan `e.getMessage()`).
                
- **Kejaran:** Alur transaksi ACID (Atomicity, Consistency) terimplementasi penuh. _Error_ apa pun (parsing, _lock_ ditolak, I/O) akan memicu _rollback_ (UNDO).
    

### Milestone 4 (Target: 3 Des, Deadline Asli: 4 Des)

- **Tujuan:** Integrasi Final (Mengganti _Mock_), Bonus, & Laporan.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - **Integrasi Final:** Ganti `new MockStorageManager()` dengan `new StorageManager()`. Ganti `new MockQueryOptimizer()` dengan `new QueryOptimizer()`, dst.
            
        - Lakukan _testing end-to-end_ besar-besaran dengan komponen _asli_. Ini akan memakan waktu.
            
    - **Person 2 (Penerjemah):**
        
        - Implementasi bonus `CREATE TABLE` / `DROP TABLE`. (Ini butuh alur baru & memanggil `CCM.validateObject("TABLE::nama", ..., WRITE)`).
            
    - **Person 3 & 4 (Join & Sort):**
        
        - Implementasi bonus `hashJoin`, `sortMergeJoin`, `externalSort`.
            
    - **Semua:**
        
        - _Bug fixing_ hasil integrasi.
            
        - Menulis bagian Laporan Akhir untuk komponen Query Processor.
            
- **Kejaran:** Sistem mDBMS berfungsi penuh secara _end-to-end_ dengan _semua_ komponen asli.