---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Compose State Management and MVVM Integration
>
> > ## Questions/Cues
> >
> > - Apa definisi "state" dalam konteks Jetpack Compose?
> > - Apa perbedaan `remember { mutableStateOf() }` dan `by remember { mutableStateOf() }`?
> > - Mengapa state hoisting penting dan bagaimana pola ini diterapkan?
> > - Bagaimana ViewModel dapat diintegrasikan ke dalam arsitektur Compose?
> > - Apa perbedaan penggunaan `LiveData`, `Flow`, dan `Observable` di dalam Compose?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 51-60)
>
> > ### Apa Itu State dalam Compose
> >
> > **State** dalam Compose didefinisikan sebagai nilai apa pun yang dapat berubah sepanjang waktu. Saat sebuah nilai state berubah, Compose secara otomatis menjadwalkan **recomposition** — pemanggilan ulang fungsi composable yang membaca state tersebut — untuk memperbarui UI agar mencerminkan nilai terbaru.
> >
> > Contoh state: teks yang diketik pengguna, status toggle switch, hasil dari network request, item yang dipilih dari daftar, atau skor dalam game.
> >
> > ### remember dan mutableStateOf
> >
> > Agar state dapat memicu recomposition, nilainya harus disimpan dalam **`MutableState`** yang dibuat dengan `mutableStateOf()`. Namun, karena fungsi composable dapat dipanggil ulang kapan saja, state harus "diingat" antar recomposition menggunakan **`remember`**:
> >
> > ```kotlin
> > // Bentuk properti eksplisit (mengakses via .value)
> > val count: MutableState<Int> = remember { mutableStateOf(0) }
> > Text("Count: ${count.value}")
> >
> > // Bentuk delegasi (mengakses langsung tanpa .value)
> > var count by remember { mutableStateOf(0) }
> > Text("Count: $count")
> > ```
> >
> > Bentuk `by remember { mutableStateOf() }` menggunakan **property delegation** Kotlin dan umumnya lebih disukai karena kode lebih bersih. Kedua bentuk menghasilkan perilaku yang identik.
> >
> > State dalam **data class** dapat didefinisikan dengan `var` dan `mutableStateOf` agar perubahan properti juga memicu recomposition:
> >
> > ```kotlin
> > class Score(team: String, score: Int) {
> >     var team by mutableStateOf(team)
> >     var score by mutableStateOf(score)
> > }
> > ```
> >
> > ### State Hoisting
> >
> > **State hoisting** adalah pola di mana state dipindahkan (*lifted*) ke composable induk bersama yang perlu membaca atau mengubah state tersebut. Composable yang sebelumnya "stateful" diubah menjadi "stateless" dengan cara:
> >
> > 1. **Menerima nilai state** sebagai parameter dari induk
> > 2. **Menerima lambda callback** sebagai parameter untuk meminta perubahan state
> >
> > Pola ini membuat composable lebih mudah diuji, lebih mudah digunakan ulang, dan lebih mudah dipreview. Composable stateless tidak bergantung pada state internal, sehingga perilakunya sepenuhnya dikontrol oleh pemanggilnya.
> >
> > Contoh dengan `ScoreScreen`: composable `TeamScore` menerima objek `Score` dan callback `onReset`, sementara `ScoreScreen` memiliki state dan meneruskannya ke bawah:
> >
> > ```kotlin
> > @Composable
> > fun TeamScore(score: Score, onReset: () -> Unit) {
> >     Column {
> >         Text("${score.team}: ${score.score}")
> >         Button(onClick = onReset) { Text("Reset") }
> >     }
> > }
> >
> > @Composable
> > fun ScoreScreen() {
> >     val homeScore = remember { Score("Home", 0) }
> >     val awayScore = remember { Score("Away", 0) }
> >
> >     Column {
> >         TeamScore(score = homeScore, onReset = { homeScore.score = 0 })
> >         TeamScore(score = awayScore, onReset = { awayScore.score = 0 })
> >     }
> > }
> > ```
> >
> > ### Integrasi Compose dengan MVVM
> >
> > Compose dirancang untuk bekerja mulus dengan arsitektur **MVVM** (Model-View-ViewModel). ViewModel bertanggung jawab mengelola state bisnis dan mengeksposnya melalui stream data yang dapat diamati oleh composable.
> >
> > ```mermaid
> > flowchart TD
> >     VM["ViewModel</br>(state bisnis)"]
> >     S["State</br>(LiveData / Flow / Observable)"]
> >     UI["Composable</br>(UI)"]
> >     E["Event / Aksi</br>pengguna"]
> >
> >     VM -->|"mengekspos"| S
> >     S -->|"dikonversi ke</br>State<T>"| UI
> >     UI -->|"memanggil</br>fungsi ViewModel"| E
> >     E -->|"memperbarui</br>logika bisnis"| VM
> > ```
> >
> > Tiga cara mengonsumsi stream data dari ViewModel di dalam composable:
> >
> > | Sumber Data | Ekstensi Compose | Keterangan |
> > |---|---|---|
> > | `LiveData<T>` | `.observeAsState()` | Paling umum di proyek lama |
> > | `Flow<T>` | `.collectAsState()` | Direkomendasikan untuk proyek Kotlin baru |
> > | `Observable<T>` | `.subscribeAsState()` | Untuk proyek yang menggunakan RxJava |
> >
> > Ketiga ekstensi ini mengonversi sumber data reaktif menjadi `State<T>` Compose, sehingga setiap emisi nilai baru dari sumber data secara otomatis memicu recomposition pada composable yang membaca state tersebut:
> >
> > ```kotlin
> > @Composable
> > fun UserProfile(viewModel: UserViewModel = viewModel()) {
> >     // LiveData dikonversi ke State Compose
> >     val user by viewModel.user.observeAsState()
> >
> >     // Flow dikonversi ke State Compose
> >     val settings by viewModel.settings.collectAsState()
> >
> >     user?.let { Text("Halo, ${it.name}") }
> > }
> > ```

> [!cornell] #### Summary
>
> **State** dalam Compose adalah nilai yang dapat berubah dan memicu **recomposition** otomatis saat berubah. Gunakan `remember { mutableStateOf() }` atau sintaks delegasi `by remember { mutableStateOf() }` untuk mendefinisikan state lokal yang bertahan antar recomposition. Pola **state hoisting** memindahkan state ke induk bersama dan meneruskan nilai serta callback ke bawah, menghasilkan composable yang stateless dan mudah diuji. Dalam arsitektur **MVVM**, ViewModel mengekspos state melalui `LiveData` (dikonversi dengan `.observeAsState()`), `Flow` (`.collectAsState()`), atau `Observable` (`.subscribeAsState()`), sehingga perubahan data di layer bisnis secara otomatis memperbarui UI Compose.

> [!ad-libitum]- Additional Information
>
> #### rememberSaveable: State yang Bertahan Saat Rotasi
>
> `remember` kehilangan nilainya saat Activity di-recreate (misalnya karena rotasi layar). Untuk state yang harus bertahan, gunakan **`rememberSaveable`**:
>
> ```kotlin
> var text by rememberSaveable { mutableStateOf("") }
> ```
>
> `rememberSaveable` bekerja seperti `onSaveInstanceState` — menyimpan state ke Bundle secara otomatis. Tipe data primitif, String, dan Parcelable didukung secara langsung.
>
> #### derivedStateOf: State yang Diturunkan
>
> Untuk state yang nilainya diturunkan dari state lain, gunakan **`derivedStateOf`** agar kalkulasi hanya berjalan saat input state berubah, bukan setiap recomposition:
>
> ```kotlin
> val isButtonEnabled by remember {
>     derivedStateOf { emailText.isNotEmpty() && passwordText.length >= 8 }
>     // Hanya dihitung ulang saat emailText atau passwordText berubah
> }
> ```
>
> #### UiState Pattern dengan Sealed Class
>
> Praktik terbaik modern untuk state di MVVM adalah mendefinisikan sealed class `UiState` untuk merepresentasikan semua kondisi layar:
>
> ```kotlin
> sealed class UserUiState {
>     object Loading : UserUiState()
>     data class Success(val user: User) : UserUiState()
>     data class Error(val message: String) : UserUiState()
> }
>
> class UserViewModel : ViewModel() {
>     private val _uiState = MutableStateFlow<UserUiState>(UserUiState.Loading)
>     val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()
> }
> ```
>
> Di sisi Compose, gunakan `when` expression untuk menangani setiap state:
>
> ```kotlin
> val uiState by viewModel.uiState.collectAsState()
> when (val state = uiState) {
>     is UserUiState.Loading -> CircularProgressIndicator()
>     is UserUiState.Success -> UserContent(state.user)
>     is UserUiState.Error -> ErrorMessage(state.message)
> }
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan form login dengan state untuk email dan password menggunakan `remember`, validasi input secara real-time, dan tombol submit yang hanya aktif jika input valid menggunakan `derivedStateOf`
> 2. Buat aplikasi counter sederhana, lalu refaktor dari stateful composable ke state hoisting, dan verifikasi kemudahan testing
> 3. Integrasikan ViewModel dengan `StateFlow` + `collectAsState()` untuk layar daftar produk, termasuk penanganan state Loading, Success, dan Error
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "State and Jetpack Compose"
> - Dokumentasi Resmi Android: "State hoisting"
> - Codelab: "Jetpack Compose State"
> - Blog: "A safer way to collect flows from Android UIs" (Android Developers)
