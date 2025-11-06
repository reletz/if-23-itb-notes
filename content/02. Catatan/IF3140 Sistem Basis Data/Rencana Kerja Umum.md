_Back to_ [[Link Terpusat Apacy]]

# Panduan Alur Kerja Harian mDBMS Apacy

Dokumen ini adalah panduan wajib bagi **setiap anggota** Super Group Apacy. Karena kita bekerja di satu repositori (`monorepo`) yang `public`, kita menggunakan aturan ketat untuk melindungi *branch* `main` dan memastikan integrasi berjalan mulus.

**Filosofi Inti:**
1.  *Branch* `main` **TERKUNCI**. Tidak ada yang bisa `push` langsung ke `main`.
2.  Semua pekerjaan **WAJIB** dilakukan di *feature branch* terpisah.
3.  Semua kode **WAJIB** masuk ke `main` melalui **Pull Request (PR)**.
4.  Setiap PR **WAJIB** di-*review* dan di-*approve* oleh pemilik kode (CODEOWNERS).

---
## Diagram Dependensi

```mermaid
graph TD
	QP["Query Processor"] --> QO["Query Optimizer"];
	QP --> SM["Storage Manager"];
	QP --> CCM["Concurrency Control"];
	QP --> FRM["Failure Recovery"];
	
	QO --> COMMON["common"];
	SM --> COMMON;
	QP --> COMMON;
	CCM --> COMMON;
	FRM --> COMMON;
```
---
## DFD

```mermaid
graph TD
    USER["User (CLI)"] -- "(1) String Query" --> QP[Query Processor]
    
    subgraph "Alur Parsing & Optimasi"
        QP -- "(2) String Query" --> QO[Query Optimizer]
        QO -- "(3) ParsedQuery" --> QP
        
        QP -- "(4) Minta Statistik" --> SM[Storage Manager]
        SM -- "(5) Statistic" --> QP
        
        QP -- "(6) (ParsedQuery, Statistic)" --> QO
        QO -- "(7) Optimized ParsedQuery" --> QP
    end

    subgraph "Alur Transaksi & Eksekusi (Tulis)"
        QP -- "(8) beginTransaction()" --> CCM[Concurrency Control]
        CCM -- "(9) txId" --> QP
        
        QP -- "(10) logObject(Row)" --> CCM
        
        QP -- "(11) validateObject(WRITE)" --> CCM
        CCM -- "(12) Response(allowed=true)" --> QP
        
        QP -- "(13) DataWrite" --> SM
        SM -- "(14) Menulis Data" --> DATA[(Physical Data Store *.dat)]
        SM -- "(15) int affectedRows" --> QP
        
        QP -- "(16) endTransaction(commit=true)" --> CCM
    end

    subgraph "Alur Logging & Recovery"
        QP -- "(17) ExecutionResult (Sukses)" --> FRM[Failure Recovery]
        FRM -- "(18) Menulis Log" --> LOG[(Write-Ahead Log *.log)]

        QP -- "Gagal! -> 17b. recover(criteria)" --> FRM
        FRM -- "(18b) Membaca Log" --> LOG
        FRM -- "(19b) Perintah UNDO (DataWrite)" --> SM
        SM -- "(20b) Menulis Data Lama" --> DATA
    end
    
    QP -- "(19) ExecutionResult (Final)" --> USER
```
---
## Class Diagram
```mermaid
classDiagram
    direction TD

    %% Common Package
    class DBMSComponent {
        <<Abstract>>
        +String componentName
        +initialize()*
        +shutdown()*
    }

    class IStorageManager {
        <<Interface>>
        +readBlock(DataRetrieval data) List~Row~
        +writeBlock(DataWrite data) int
        +getStats() Statistic
        +setIndex(String, String, String) void
    }

    class IQueryOptimizer {
        <<Interface>>
        +parseQuery(String query) ParsedQuery
        +optimizeQuery(ParsedQuery query, Statistic stats) ParsedQuery
        +getCost(ParsedQuery query, Statistic stats) int
    }

    class IConcurrencyControlManager {
        <<Interface>>
        +beginTransaction() int
        +validateObject(String, int, Action) Response
        +logObject(Row, int) void
        +endTransaction(int, boolean) void
    }

    class IFailureRecoveryManager {
        <<Interface>>
        +writeLog(ExecutionResult info) void
        +saveCheckpoint() void
        +recover(RecoveryCriteria criteria) void
    }
    
    %% Query Processor Package (Grup Bash)
    class QueryProcessor {
        -IStorageManager sm
        -IQueryOptimizer qo
        -IConcurrencyControlManager ccm
        -IFailureRecoveryManager frm
        +executeQuery(String query) ExecutionResult
    }
    
    class PlanTranslator {
        +translateToRetrieval(...) DataRetrieval
        +translateToWrite(...) DataWrite
    }
    
    class JoinStrategy {
        +nestedLoopJoin(...) List~Row~
    }
    
    class SortStrategy {
        +sort(...) List~Row~
    }

    %% Storage Manager Package
    class StorageManager {
        -BlockManager blockManager
        -Serializer serializer
        -StatsCollector statsCollector
        +readBlock(DataRetrieval data) List~Row~
        +writeBlock(DataWrite data) int
    }
    
    class BlockManager
    class Serializer
    class StatsCollector
    class HashIndex

    %% Query Optimizer Package
    class QueryOptimizer {
        -QueryParser parser
        -HeuristicOptimizer optimizer
        -CostEstimator estimator
        +parseQuery(String query) ParsedQuery
    }
    
    class QueryParser
    class HeuristicOptimizer
    class CostEstimator
    class WhereConditionNode

    %% Concurrency Control Package
    class ConcurrencyControlManager {
        -LockManager lockManager
        -Map~int, Transaction~ transactionMap
        +beginTransaction() int
        +validateObject(...) Response
    }
    
    class LockManager
    class Transaction

    %% Failure Recovery Package
    class FailureRecoveryManager {
        -LogWriter logWriter
        -LogReplayer logReplayer
        -CheckpointManager checkpointManager
        +writeLog(ExecutionResult info) void
    }
    
    class LogWriter
    class LogReplayer
    class CheckpointManager

    %% Implementation relationships
    StorageManager ..|> IStorageManager : implements
    QueryOptimizer ..|> IQueryOptimizer : implements
    ConcurrencyControlManager ..|> IConcurrencyControlManager : implements
    FailureRecoveryManager ..|> IFailureRecoveryManager : implements

    %% Inheritance relationships
    QueryProcessor --|> DBMSComponent : extends
    StorageManager --|> DBMSComponent : extends
    QueryOptimizer --|> DBMSComponent : extends
    ConcurrencyControlManager --|> DBMSComponent : extends
    FailureRecoveryManager --|> DBMSComponent : extends

    %% Dependencies (Uses)
    QueryProcessor ..> IStorageManager : uses
    QueryProcessor ..> IQueryOptimizer : uses
    QueryProcessor ..> IConcurrencyControlManager : uses
    QueryProcessor ..> IFailureRecoveryManager : uses
```
---

## Alur Kerja Langkah-demi-Langkah

Ikuti 8 langkah ini setiap kali Anda memulai tugas baru.

### Langkah 1: Sinkronisasi dengan `main`
Selalu pastikan kode lokal Anda paling *update* sebelum memulai pekerjaan baru.

```bash
# Pindah ke branch utama
git checkout main

# Tarik perubahan terbaru dari GitHub
git pull origin main
```

### Langkah 2: Buat Branch Baru

Buat _branch_ baru dari `main` untuk tugas Anda. Gunakan format penamaan yang telah disepakati: `tipe/<komponen>/<deskripsi-fitur>`.

- **Tipe:** `feat` (fitur baru), `fix` (perbaikan bug), `docs` (dokumentasi).
    
- **Komponen:** `query-processor`, `storage-manager`, `query-optimizer`, `concurrency-control-manager`, `failure-recovery-manager`, atau `common`.
    

**Contoh untuk Grup "Bash" (QP):**

```Bash
# (dari branch 'main')
git checkout -b feat/query-processor/implement-nested-loop-join
```

**Contoh untuk Grup SM:**

```Bash
# (dari branch 'main')
git checkout -b fix/storage-manager/serializer-off-by-one
```

### Langkah 3: Bekerja (Coding, Commit, Test)

Kerjakan tugas Anda di _branch_ ini.

- **Coding:** Implementasikan fitur Anda (misal: mengisi `JoinStrategy.java`).
    
- **Testing:** Jika Anda Grup QP, gunakan _Mock Components_ di `src/test/java/` untuk menguji _logic_ Anda secara independen. Jika Anda grup lain, buat _unit test_ di folder `src/test/` modul Anda.
    
- **Commit:** Buat _commit_ secara berkala dengan pesan yang jelas.

    ```Bash
    git add .
    git commit -m "feat(qp): implement nested loop join logic"
    ```
    

### Langkah 4: Push Branch Anda ke GitHub

Saat pekerjaan Anda siap untuk di-_review_ (atau Anda ingin mem-backup pekerjaan Anda), _push_ _branch_ Anda ke repositori organisasi.


```Bash
# -u akan mengatur 'origin' sebagai upstream untuk branch ini
git push -u origin feat/query-processor/implement-nested-loop-join
```

### Langkah 5: Buat Pull Request (PR)

1. Buka halaman GitHub repositori `mDBMS-Apacy`.
    
2. Anda akan melihat _banner_ kuning "Your branch is ready...". Klik tombol **"Compare & pull request"**.
    
3. **Judul PR:** Buat judul yang jelas, misal: `feat(qp): Implement Nested Loop Join`.
    
4. **Deskripsi:** Jelaskan apa yang Anda kerjakan, apa yang perlu di-_review_, atau @mention teman satu tim jika perlu.
    
5. Klik **"Create pull request"**.
    

### Langkah 6: Proses Review Otomatis (CODEOWNERS)

- Saat PR dibuat, GitHub akan membaca file `.github/CODEOWNERS`.
    
- Jika Anda mengubah file di `query-processor/`, GitHub akan **secara otomatis** meminta _review_ dari `@apacy-mdbms/qp-Bash`.
    
- Jika Anda mengubah file di `common/`, GitHub akan **secara otomatis** meminta _review_ dari **SEMUA 5 TIM**.
    

### Langkah 7: Diskusi & Revisi (Jika Perlu)

- Anggota tim Anda (yang di-tag oleh CODEOWNERS) akan me-_review_ kode Anda.
    
- Mereka mungkin akan meninggalkan komentar atau meminta perubahan.
    
- Untuk melakukan revisi, **tetap di _branch_ yang sama**. Buat _commit_ baru dan `git push` lagi.
    
    Bash
    
    ```
    # (Setelah memperbaiki kode)
    git commit -m "fix(qp): handle empty table in join"
    git push
    ```
    
- Pull Request Anda akan otomatis ter-update dengan _commit_ baru.
    

### Langkah 8: Merge (Penyelesaian)

- Setelah PR Anda mendapatkan jumlah _approval_ yang disyaratkan (minimal 1), tombol "Merge" akan berwarna hijau.
    
- **PIC Tim** (atau siapa pun yang bertugas) akan me-_merge_ PR Anda ke `main`.
    
- **PENTING:** Selalu pilih **"Squash and merge"** (jika ada banyak _commit_ revisi) atau **"Create a merge commit"**. JANGAN `push` manual.
    
- Setelah di-_merge_, Anda bisa menghapus _branch_ Anda (GitHub akan memberikan tombolnya).
    
- Ulangi dari **Langkah 1** untuk tugas berikutnya.
    

---

### Skenario Khusus: Mengubah `common/`

Modul `common/` adalah dasar kita. Mengubahnya berisiko merusak _compile_ 4 grup lainnya.

1. **Stop:** Jangan langsung _coding_.
    
2. **Diskusi:** Bicarakan usulan perubahan (misal: "Saya perlu menambah _field_ baru di `Row.java`") dengan PIC dari 5 grup.
    
3. **Branch:** Buat _branch_ `feat/common/add-getter-to-row`.
    
4. **PR:** Buat PR.
    
5. **Review Wajib:** PR ini akan **secara otomatis** me-request _review_ dari **SEMUA 5 TIM**.
    
6. **Merge:** PR **TIDAK BISA** di-_merge_ sampai semua 5 PIC Tim setuju.