# 📋 Catatan Syntax & Code Snippet untuk Ujian IF3210

> File ini berisi **semua contoh kode, method, dan syntax penting** dari PPT 9-15.
> Cocok untuk soal "apa yang terjadi di snippet ini?" atau "syntax yang benar/salah".

---

## 🟢 BAB 9: Activity & Fragment Lifecycle

### Activity Lifecycle Callbacks (Urutan WAJIB HAFAL)
```
Activity launched → onCreate() → onStart() → onResume() → [RUNNING]
                                                            ↓
                                          onPause() ← [kehilangan fokus]
                                          onStop()  ← [tidak visible]
                                          onDestroy() ← [hancur]

Kembali dari onStop: onRestart() → onStart() → onResume()
```

### Fragment Lifecycle (Bedanya dari Activity!)
```
onAttach() → onCreate() → onCreateView() → onViewCreated()
→ onStart() → onResume() → [AKTIF]
→ onPause() → onStop() → onDestroyView() → onDestroy() → onDetach()
```
**Poin Penting:** Fragment punya `onAttach()`, `onCreateView()`, `onViewCreated()`, `onDestroyView()`, `onDetach()` yang Activity TIDAK punya.

### Simpan State saat Config Change (Rotasi Layar)
```kotlin
// SIMPAN
override fun onSaveInstanceState(outState: Bundle) {
    outState.putString("KEY", value)
    super.onSaveInstanceState(outState)
}

// RESTORE - di onCreate
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val restoredValue = savedInstanceState?.getString("KEY")
}
```
Fragment juga bisa restore di: `onCreate()`, `onCreateView()`, `onViewCreated()`.

### LifecycleObserver Pattern
```kotlin
class MyObserver : LifecycleObserver {
    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    fun connectListener() { ... }
}

// Tambah observer ke lifecycle owner:
myLifecycleOwner.getLifecycle().addObserver(MyObserver())
```
**Keyword:** `LifecycleOwner` = punya lifecycle (Fragment, AppCompatActivity). `LifecycleObserver` = yang mengawasi.

---

## 💾 BAB 10: Room Database & Coroutines

### Entity (Representasi Tabel)
```kotlin
@Entity(tableName = "colors")
data class Color(
    @PrimaryKey(autoGenerate = true) val _id: Int,
    @ColumnInfo(name = "hex_color") val hex: String,
    val name: String
)
```
**⚠️ Perhatikan:** `@ColumnInfo(name = "hex_color")` mengubah nama kolom di DB.

### DAO (Data Access Object)
```kotlin
@Dao
interface ColorDao {
    @Query("SELECT * FROM colors")
    suspend fun getAll(): Array<Color>

    @Query("SELECT * FROM colors WHERE name = :name")
    suspend fun getColorByName(name: String): LiveData<Color>

    @Insert
    suspend fun insert(vararg color: Color)

    @Update
    suspend fun update(color: Color)

    @Delete
    suspend fun delete(color: Color)
}
```
**⚠️ Perhatikan:** `:name` di Query merujuk ke parameter fungsi. `vararg` = bisa masukkan banyak argumen.

### Database Singleton Pattern (SERING KELUAR DI SOAL)
```kotlin
@Database(entities = [Color::class], version = 1)
abstract class ColorDatabase : RoomDatabase() {
    abstract fun colorDao(): ColorDao

    companion object {
        @Volatile
        private var INSTANCE: ColorDatabase? = null

        fun getInstance(context: Context): ColorDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    ColorDatabase::class.java, "color_database"
                )
                .fallbackToDestructiveMigration()
                .build()
                .also { INSTANCE = it }
            }
        }
    }
}
```
**⚠️ Yang harus kamu tahu:**
- `@Volatile` → perubahan INSTANCE langsung visible ke semua thread
- `synchronized(this)` → cuma 1 thread yang boleh bikin DB
- `?: ... ?: ...` → Double-check locking pattern
- `.also { INSTANCE = it }` → simpan instance yang baru dibuat
- `fallbackToDestructiveMigration()` → hapus semua data lama kalau versi DB naik

### Pakai DAO
```kotlin
val colorDao = ColorDatabase.getInstance(application).colorDao()
val newColor = Color(hex = "#6200EE", name = "purple")
colorDao.insert(newColor)
```

### Coroutine Dispatchers (WAJIB TAHU)
| Dispatcher | Deskripsi | Contoh |
|---|---|---|
| `Dispatchers.Main` | UI & task ringan | Update LiveData, panggil suspend function |
| `Dispatchers.IO` | Network & disk | Database, file IO, Retrofit call |
| `Dispatchers.Default` | CPU intensive | Parsing JSON, sorting besar |

### withContext (Pindah Dispatcher)
```kotlin
suspend fun get(url: String) {
    // Mulai di Dispatchers.Main
    withContext(Dispatchers.IO) {
        // Pindah ke Dispatchers.IO
        // Lakukan network request
    }
    // Kembali ke Dispatchers.Main
}
```

### CoroutineScope (launch vs async)
```kotlin
// launch - kalau TIDAK butuh hasil balik
viewModelScope.launch {
    fetchDocs()
}

// async - kalau BUTUH hasil balik
val result = viewModelScope.async {
    fetchData()
}.await()
```

### ViewModel + Coroutine
```kotlin
class ColorViewModel(val dao: ColorDao, application: Application)
    : AndroidViewModel(application) {

    fun save(color: Color) {
        viewModelScope.launch {
            colorDao.insert(color)
        }
    }
}
```
`viewModelScope` otomatis cancel kalau ViewModel cleared.

### Testing Room Database
```kotlin
@RunWith(AndroidJUnit4::class)
class DatabaseTest {
    private lateinit val colorDao: ColorDao
    private lateinit val db: ColorDatabase

    @Before
    fun createDb() {
        val context = ApplicationProvider.getApplicationContext()
        db = Room.inMemoryDatabaseBuilder(context, ColorDatabase::class.java)
            .allowMainThreadQueries()
            .build()
        colorDao = db.colorDao()
    }

    @After
    fun closeDb() = db.close()

    @Test
    fun insertAndRetrieve() {
        colorDao.insert(red, green, blue)
        val colors = colorDao.getAll()
        assert(colors.size == 3)
    }
}
```
**Keyword:** `inMemoryDatabaseBuilder` = DB cuma di RAM, hilang setelah test selesai.

---

## 🛠️ BAB 11: Services, Broadcast, Notification, Content Provider

### Broadcast - Jenis
```
sendBroadcast()           → Asynchronous, semua receiver dapat
sendOrderedBroadcast()    → Synchronous, satu per satu
LocalBroadcastManager.sendBroadcast() → Hanya dalam app sendiri (aman!)
```

### Register BroadcastReceiver (Dynamic)
```kotlin
// Register di onCreate
val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
receiver = NetworkReceiver()
this.registerReceiver(receiver, filter)

// Unregister di onDestroy
this.unregisterReceiver(receiver)
```
**⚠️ WAJIB unregister!** Kalau tidak → memory leak.

### BroadcastReceiver Implementation
```kotlin
class NetworkReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        // Punya waktu HANYA 5 DETIK untuk eksekusi!
        val conn = context.getSystemService(Context.CONNECTIVITY_SERVICE)
                    as ConnectivityManager
        val networkInfo: NetworkInfo? = conn.activeNetworkInfo
        // ... proses network status
    }
}
```
**⚠️ onReceive() punya batas waktu 5 DETIK, lalu receiver DIHANCURKAN.**

### Service Types (Method yang dipanggil)
| Jenis | Mulai dengan | Berhenti dengan |
|---|---|---|
| Started | `startService()` | `stopSelf()` atau `stopService()` |
| Bound | `bindService()` | Otomatis saat semua client unbind |
| IntentService | `startService()` | Otomatis setelah `onHandleIntent()` selesai |

**Service berjalan di MAIN THREAD by default** (kecuali IntentService).

### Notification Builder
```kotlin
// Java-style dari PPT (mungkin keluar di soal!)
mNotifyManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

mNotifyBuilder = NotificationCompat.Builder(this)
    .setContentTitle("You've been notified!")
    .setContentText("This is your notification text.")
    .setSmallIcon(R.drawable.ic_android_black_24dp)

val myNotification = mNotifyBuilder.build()
mNotifyManager.notify(NOTIFICATION_ID, myNotification)
```
**Keyword:** `PendingIntent` = memberi app lain hak menjalankan Intent atas namamu (untuk notif tap action).

### Content Provider - Arsitektur
```
Activity/Adapter → ContentResolver → ContentProvider → Data (SQLite)
```
- ContentResolver mengembalikan data sebagai **Cursor** (baris + kolom)
- Content Provider **butuh permission di Manifest**
- Tanpa permission eksplisit = **semua app bisa baca/tulis** (bahaya!)

---

## 🌐 BAB 12: Connectivity & Retrofit

### Permission di Manifest (WAJIB)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
**⚠️ INTERNET = Normal permission (auto-granted). Tapi network operation di main thread → `NetworkOnMainThreadException`!**

### Permission Types
| Level | Granted | Prompt? | Contoh |
|---|---|---|---|
| Normal | Install time | Tidak | INTERNET, BLUETOOTH, VIBRATE |
| Signature | Install time | Tidak | N/A |
| Dangerous | Runtime | Ya | CAMERA, CALL_PHONE, GET_ACCOUNTS |

### Retrofit Interface Definition
```kotlin
interface UserService {
    @GET("/users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}
```

### Retrofit + Repository Pattern
```kotlin
class UserRepository constructor(private val userService: UserService) {
    suspend fun getUserById(id: String): User {
        return userService.getUser(id)
    }
}

// Setup Retrofit
var retrofit = Retrofit.Builder()
    .baseUrl("https://...")
    .build()

var userRepository = UserRepository(retrofit.create(UserService::class.java))
var john = userRepository.getUserById("john")
```

### Moshi + Retrofit (JSON Parsing)
```kotlin
private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()

val retrofit = Retrofit.Builder()
    .addConverterFactory(MoshiConverterFactory.create(moshi))
    .baseUrl(BASE_URL)
    .build()

object API {
    val retrofitService: SimpleService by lazy {
        retrofit.create(SimpleService::class.java)
    }
}
```
**`by lazy`** = instance baru dibuat saat pertama kali diakses.

### ViewModel + Retrofit + LiveData
```kotlin
class MainViewModel(savedStateHandle: SavedStateHandle,
    userRepository: UserRepository) : ViewModel() {

    private val userId: String = savedStateHandle["uid"]
        ?: throw IllegalArgumentException("Missing user ID")

    private val _user = MutableLiveData<User>()
    val user = _user as LiveData<User>

    init {
        viewModelScope.launch {
            try {
                val user = userRepository.getUserById(userId)
                _user.value = user
            } catch (error: Exception) {
                // show error message to user
            }
        }
    }
}
```

### Check Network Connection
```kotlin
fun isOnline(): Boolean {
    val connMgr = getSystemService(Context.CONNECTIVITY_SERVICE)
                    as ConnectivityManager
    val networkInfo: NetworkInfo? = connMgr.activeNetworkInfo
    return networkInfo?.isConnected == true
}
```

### Network Callback (Modern API)
```kotlin
connectivityManager.registerDefaultNetworkCallback(object :
    ConnectivityManager.NetworkCallback() {

    override fun onAvailable(network: Network) { ... }
    override fun onLost(network: Network) { ... }
    override fun onCapabilitiesChanged(
        network: Network,
        networkCapabilities: NetworkCapabilities) { ... }
})
```

### Optimizing Network Usage
```kotlin
(getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager).apply {
    if (isActiveNetworkMetered) {
        when (restrictBackgroundStatus) {
            RESTRICT_BACKGROUND_STATUS_ENABLED -> { /* blocked */ }
            RESTRICT_BACKGROUND_STATUS_WHITELISTED -> { /* allowed */ }
            RESTRICT_BACKGROUND_STATUS_DISABLED -> { /* no restriction */ }
        }
    }
}
```

---

## 🐦 BAB 13: Dart & Flutter Syntax

### Variabel & Tipe Data
```dart
String firstName = 'John';    // Eksplisit
var lastName = 'Smith';        // Tipe diinfer
int age = 20;
double height = 5.9;
bool isMarried = false;

// String interpolation
print('Name is $firstName $lastName');
print('Age is ${age + 1}');  // Gunakan {} untuk expression
```

### final vs const (SERING KELUAR)
```dart
final date = DateTime.now();   // ✅ OK, dihitung saat runtime
const date = DateTime.now();   // ❌ Error! const harus compile-time

const pi = 3.14;              // ✅ OK
final gravity;                 // ❌ Error! final harus diinisialisasi
final gravity = Gravity();     // ✅ OK
gravity.setForce(...);         // ✅ OK, object-nya masih mutable!
```
**⚠️ `final` = referensi-nya fixed, tapi isi objeknya masih bisa berubah!**
**⚠️ `const` = semuanya fixed + canonicalized (1 copy di memory).**

### const Canonicalization
```dart
const point1 = ImmutablePoint(2, 3);
const point2 = ImmutablePoint(2, 3);
print(identical(point1, point2));  // true → SATU OBJEK di memory

final point3 = ImmutablePoint(2, 3);
final point4 = ImmutablePoint(2, 3);
print(identical(point3, point4));  // false → DUA OBJEK berbeda
```

### Null Safety (Dart 3.0)
```dart
int a = 100;     // Non-nullable, WAJIB ada nilai
int b;           // ❌ Compile-time error!
int? c;          // ✅ Nullable, boleh null
late int d;      // ✅ Non-nullable tapi diinisialisasi nanti
print(d);        // ❌ Runtime error: belum diinisialisasi!
d = 3;
print(d);        // ✅ OK
```

### Null-aware Operators (WAJIB HAFAL)
```dart
String? str;

print(str.length);      // ❌ Compile-time error
print(str?.length);     // ✅ Print null jika str null (safe call)
print(str ?? 'Default'); // ✅ Print 'Default' jika str null (elvis)
str ??= 'Default';      // ✅ Assign 'Default' HANYA jika str null
int length = str!.length; // ⚠️ Paksa non-null (crash jika null!)
```

### Object vs dynamic
```dart
Object obj = 'Hello';
print(obj.length);          // ❌ Compile-time error (Object gak punya .length)
print((obj as String).length); // ✅ OK, cast dulu

dynamic dyn = 'Hello';
print(dyn.length);          // ✅ OK (bypass compile-time check)
print(dyn.isEven);          // ❌ Runtime error! String gak punya isEven
```

### Type Checking & Conversion
```dart
// Type check
if (obj is String) { ... }
if (obj is! int) { ... }
print(obj.runtimeType);

// Conversion
int one = int.parse('1');         // String → int
String oneStr = one.toString();   // int → String
pi.toInt();                       // double → int
String str = obj as String;       // Parent → child type
```

### Functions: Parameters & Default Values
```dart
// Optional positional parameters
void sayMessage(String message, [String? author]) {
    print("$message -- ${author ?? 'Anonymous'}");
}

// Named parameters & default values
void setDimensions({int width = 10, int height = 10}) {
    print("Width: $width, Height: $height");
}

void main() {
    sayMessage('Hello, Dart!');
    setDimensions(height: 20, width: 30);  // Urutan bebas!
}
```

### Arrow Functions
```dart
// Normal
int add(int a, int b) { return a + b; }

// Arrow (HANYA untuk 1 expression yang return value)
int add(int a, int b) => a + b;
```
**⚠️ Jangan pakai arrow kalau fungsi tidak return apa-apa!**

### Higher-Order Functions & Anonymous Functions
```dart
// Function sebagai parameter
void printOPResult(int a, int b, Function(int, int) op) {
    var result = op(a, b);
    print('Result: $result');
}

// Anonymous function & forEach
myList.forEach((e) { print(e); });
var myList2 = myList.map((e) => e * 2).toList();
```

### Closures
```dart
Function makeAdder(int base) {
    return (int i) => base + i;  // Captures 'base'
}

var addFrom2 = makeAdder(2);
print(addFrom2(10));  // 12
```
**⚠️ Dart: Closure di loop AMAN (tiap iterasi punya copy sendiri). JavaScript: TIDAK aman (bad closure).**

### Classes & Constructors
```dart
class Person {
    String name;
    int age;

    // Constructor
    Person({required this.name, required this.age});

    // Named constructor
    Person.fromMap(Map<String, dynamic> data)
        : name = data['name'],
          age = data['age'];

    void displayInfo() {
        print('Name: $name, Age: $age');
    }
}
```

### Inheritance
```dart
class Student extends Person {
    String university;

    Student({
        required super.name,
        required super.age,
        required this.university
    });

    @override
    void displayInfo() {
        super.displayInfo();
        print('University: $university');
    }
}

// Type check
Person alice = Student(...);
assert(alice is Person);    // true
assert(alice is Student);   // true
assert(alice is! Employee); // true
var studentAlice = alice as Student;  // Downcast
```

### Abstract Class (Dart gak punya keyword `interface`)
```dart
abstract class GameCharacter {
    String name;
    GameCharacter(this.name);
    void performAbility(); // Harus di-implement oleh subclass
}
```

### Mixin (Multiple Inheritance)
```dart
mixin Logger {
    void log(String message) { /* persist message */ }
}

class OrderProcessor extends Processor with Logger, ... {
    void createOrder(String details) {
        log('Order created: $details');  // Method dari mixin!
    }
}
```

### Extension Methods
```dart
extension EmailValidator on String {
    bool get isValidEmail {
        return RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+')
            .hasMatch(this);
    }
}

var email = 'example@example.com';
if (email.isValidEmail) { ... }  // Pakai langsung pada String!
```

### Enums & Switch Expression
```dart
enum Status { loading, success, error }
Status status = .loading; // Shorthand Dart 3

// Switch EXPRESSION (mengembalikan value)
var token = switch (char) {
    '+' || '-' || '*' || '/' => 'Operator',
    ',' || ';' => 'Punctuation',
    _ => throw FormatException('Invalid character'),
};
```

### Spread, if, for in Collection Literals
```dart
bool includeOddNumbers = true;
var numbers = [1, 2, 3, 4, 5];
var evenNumbers = [2, 4];
var combinedList = [
    if (includeOddNumbers) ...numbers.where((n) => n.isOdd),
    for (var n in evenNumbers) n,
];
// Result: [1, 3, 5, 2, 4]
```

### StatefulWidget Pattern (HAFAL!)
```dart
class CounterWidget extends StatefulWidget {
    const CounterWidget({super.key});

    @override
    _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
    int _counter = 0;

    void _incrementCounter() {
        setState(() {    // ← Ini yang trigger rebuild!
            _counter++;
        });
    }

    @override
    Widget build(BuildContext context) {
        return Text('Counter: $_counter');
    }
}
```
**⚠️ Tanpa `setState()`, UI TIDAK akan update walaupun variabel berubah!**

### Dart Coding Conventions (bisa keluar di soal pilihan ganda)
| Apa | Format | Contoh |
|---|---|---|
| Variable/function | lowerCamelCase | `myVariable`, `getUserName()` |
| Class/extension | UpperCamelCase | `MyClass`, `EmailValidator` |
| Package | snake_case | `my_package` |
| Private | Leading `_` | `_age`, `_helper()` |
| Global variable | Leading `k` | `kColorScheme` |
| String | Single-quoted | `'hello'` (kecuali ada single quote di dalamnya) |

---

## 🔒 BAB 14: Mobile Security

### Android Manifest Permission
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.android.app.myapp">
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    ...
</manifest>
```

### OWASP Top 10 Mobile 2024 (HAFAL URUTAN)
1. M1: Improper Credential Usage
2. M2: Inadequate Supply Chain Security
3. M3: Insecure Authentication/Authorization
4. M4: Insufficient Input/Output Validation
5. M5: Insecure Communication
6. M6: Inadequate Privacy Controls
7. M7: Insufficient Binary Protections
8. M8: Security Misconfiguration
9. M9: Insecure Data Storage
10. M10: Insufficient Cryptography

### Security Best Practices Summary
- **Encrypt:** AES 256-bit, simpan key di **KeyStore**
- **Communication:** HTTPS, Certificate Pinning, HMAC
- **Storage:** Internal app-specific storage, `EncryptedSharedPreferences`
- **Permission:** Minta minimal, runtime kalau dangerous, jelaskan ke user
- **Code:** Input validation, hindari dynamic code loading, disable IPC by default
- **Identifier:** Jangan pakai IMEI → gunakan user-resettable ID

---

## 🚀 BAB 15: Jetpack Compose

### Basic Composable
```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

// Dalam Activity:
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Surface(color = MaterialTheme.colors.background) {
                    Greeting("Android")
                }
            }
        }
    }
}
```

### Modifier Chaining (URUTAN PENTING!)
```kotlin
val shape = RoundedCornerShape(8.dp)
Text(
    text = "Text 1",
    modifier = Modifier.fillMaxWidth()
        .padding(16.dp)        // Padding LUAR
        .border(2.dp, color, shape)
        .padding(1.dp)
        .background(color, shape)
        .clickable(onClick = { })
        .padding(16.dp)        // Padding DALAM
)
```
**⚠️ `padding` sebelum `background` = space di LUAR background. Setelah = space di DALAM.**

### Layouts: Column, Row, Box
```kotlin
Box(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
        Text("Column Text 1")
        Text("Column Text 2")
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Text(text = "Row Text 1")
            Text(text = "Row Text 2")
        }
    }
    Text("Stack Text", modifier = Modifier
        .align(Alignment.TopEnd)
        .padding(end = 16.dp, top = 16.dp)
    )
}
```
- **Column** = vertikal (atas-bawah)
- **Row** = horizontal (kiri-kanan)
- **Box** = stack/tumpuk (elemen terakhir di atas)

### State Management (PALING PENTING)
```kotlin
// State yang survive recomposition
var nameState by remember { mutableStateOf("") }

TextField(
    value = nameState,
    label = { Text("Name") },
    onValueChange = { s: String -> nameState = s }
)
```

### rememberSaveable (Survive rotation)
```kotlin
var state by rememberSaveable {
    mutableStateOf("Compose!!!")
}
```

### Observable State in Class
```kotlin
class Score(team: String, score: Int) {
    var team by mutableStateOf(team)
    var score by mutableStateOf(score)
}

// Perubahan langsung trigger recomposition!
score.score += 1
```

### LiveData → Compose
```kotlin
@Composable
fun UserScreen(usersLiveData: LiveData<List<UserBinding>>) {
    val users by usersLiveData.observeAsState()
    // users sekarang bisa dipakai langsung
}
```
**Alternatives:** `Flow.collectAsState()`, `Observable.subscribeAsState()`

### ViewModel + Compose (Full Pattern)
```kotlin
@Composable
fun UserScreen(viewModel: UsersViewModel = viewModel()) {
    val users by viewModel.allUsers.observeAsState()
    Column(modifier = Modifier.fillMaxSize()) {
        UserList(
            users = users ?: emptyList(),
            onDeleteUser = { user -> viewModel.deleteUser(user) }
        )
    }
}
```

### LazyColumn (RecyclerView replacement)
```kotlin
@Composable
fun UserListScreen(users: List<User>) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        item {
            Text("Header", Modifier.fillMaxWidth().padding(8.dp))
        }
        items(users) { user ->
            Text("${user.name} - ${user.age}", Modifier.fillMaxWidth().padding(8.dp))
        }
    }
}
```
**Variant:** `itemsIndexed(users) { index, user -> ... }` untuk akses index.

### Scaffold (App Structure)
```kotlin
Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("Compose") },
            actions = {
                IconButton(onClick = {}) {
                    Icon(Icons.Default.Search, "Search")
                }
            }
        )
    },
    floatingActionButton = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Filled.Add, "Add")
        }
    },
    bottomBar = { ... }
) { /* content */ }
```

### Side Effects
```kotlin
// LaunchedEffect: Jalankan coroutine saat composable pertama kali muncul
LaunchedEffect(someKey) {
    val s = withContext(Dispatchers.IO) {
        delay(5_000)
        "Hello Compose!"
    }
    welcomeMsg.value = s
}

// DisposableEffect: Cleanup saat composable dihancurkan
DisposableEffect(someKey) {
    // setup listener
    onDispose {
        // Cleanup!
    }
}

// rememberCoroutineScope: Launch dari callback
val scope = rememberCoroutineScope()
Button(onClick = {
    scope.launch {
        // do async work
    }
})
```

### Interop: Compose dalam Fragment
```kotlin
class MyFragment : Fragment() {
    override fun onCreateView(...): View? {
        return ComposeView(requireContext()).apply {
            setContent {
                AppTheme { YourComposable() }
            }
        }
    }
}
```

### Interop: Old View dalam Compose
```kotlin
@Composable
fun MyCalendar(onDateUpdate: (Date) -> Unit) {
    AndroidView(
        factory = { context: Context ->
            LayoutInflater.from(context)
                .inflate(R.layout.my_layout, null, false)
        },
        update = { view ->
            // Update view saat recomposition
        }
    )
}
```

### Compose Resource Access
```kotlin
stringResource(R.string.your_string)
dimensionResource(R.dimen.padding_small)
colorResource(R.color.blue)
```

---

## 🎯 Quick Reference: "Apa yang Salah dengan Snippet Ini?"

### ❌ Network di Main Thread
```kotlin
fun loadData() {
    val data = URL("https://...").readText()  // CRASH! NetworkOnMainThreadException
}
```
**Fix:** Wrap dalam `viewModelScope.launch { withContext(Dispatchers.IO) { ... } }`

### ❌ Room query tanpa suspend
```kotlin
@Query("SELECT * FROM colors")
fun getAll(): List<Color>  // ⚠️ Kalau dipanggil dari Main Thread → CRASH!
```
**Fix:** Tambahkan `suspend` → `suspend fun getAll(): List<Color>`

### ❌ Dart: Modifikasi const
```dart
const list = [1, 2, 3];
list.add(4);  // ❌ Runtime Error! const = immutable
```

### ❌ Flutter: Update state tanpa setState
```dart
void _increment() {
    _counter++;  // Variabel berubah, tapi UI TIDAK update
}
```
**Fix:** Wrap dalam `setState(() { _counter++; })`

### ❌ Compose: State tanpa remember
```kotlin
@Composable
fun Counter() {
    var count = mutableStateOf(0)  // ❌ Reset setiap recomposition!
    Button(onClick = { count.value++ }) { Text("${count.value}") }
}
```
**Fix:** `var count by remember { mutableStateOf(0) }`
