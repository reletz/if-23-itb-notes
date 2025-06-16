---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[OOP]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Collection Framework?
> > - `Collection` Interface
> > - `Set` Interface
> > - `List` Interface
> > - `Queue` Interface
> > - `Deque` Interface
> > - `Map` Interface
> 
> > 
> > ### Java Collection Framework
> > - Sebuah arsitektur terpadu yang menyediakan serangkaian _interface_ dan _kelas_ untuk merepresentasikan dan memanipulasi kumpulan data (koleksi). ⚙️
> > - **Komponen Utama:**
> > 	1. **Interfaces:** Tipe data abstrak yang mendefinisikan kontrak untuk berbagai jenis koleksi (misalnya `List`, `Set`, `Map`). Semua _core interface_ bersifat generik.
> > 	2. **Implementations:** Kelas konkret yang menyediakan implementasi dari _interface_ tersebut (misalnya `ArrayList`, `HashSet`, `HashMap`).
> > 	3. **Algorithms:** Metode statis polimorfik yang melakukan operasi pada koleksi (misalnya `sort`, `shuffle`).
> > 	
> > ### Interface `Collection<E>`
> > - Akar dari hierarki koleksi. Merepresentasikan sekelompok objek yang disebut elemen.
> > - **Tujuan:** Digunakan sebagai tipe parameter ketika metode perlu menerima koleksi apa pun tanpa peduli implementasi spesifiknya.
> > - **Operasi Dasar:** `int size()`, `boolean isEmpty()`, `boolean contains(Object o)`, `boolean add(E e)`, `boolean remove(Object o)`.
> > - **Operasi Massal:** `containsAll()`, `addAll()`, `removeAll()`, `retainAll()`, `clear()`.
> > - **Operasi Array:** `Object[] toArray()`, `<T> T[] toArray(T[] a)`.
> > 
> > ### `Set<E>` Interface
> > - Sebuah koleksi yang **tidak boleh mengandung elemen duplikat**.
> > - **Karakteristik Utama:** Melarang duplikasi berdasarkan metode `equals()` dari elemen. Jika `e1.equals(e2)` adalah `true`, maka `e1` dan `e2` dianggap elemen yang sama.
> > - **Implementasi Umum:**
> > 		- `HashSet`: Urutan elemen tidak dijamin. Performa paling tinggi untuk operasi dasar (add, remove, contains).
> > 		- `TreeSet`: Menyimpan elemen dalam urutan terurut (_sorted order_).
> > 		- `LinkedHashSet`: Menyimpan elemen dalam urutan penyisipan (_insertion order_).
> > - **Contoh Kasus:** Menemukan kata-kata unik dari sebuah kalimat.
> > 
> > 	```java
> > 	Set<String> s = new HashSet<String>();
> > 	for (String a : args)
> > 			s.add(a); // Duplikat akan otomatis diabaikan
> > 	System.out.println(s.size() + " distinct words: " + s);
> > 	```
> >  
> > ### `List<E>` Interface
> > - Sebuah koleksi yang **terurut** (_ordered_) dan **boleh mengandung elemen duplikat**. Disebut juga sebagai _sequence_.
> > - **Karakteristik Utama:** Pengguna memiliki kontrol penuh atas di mana setiap elemen disisipkan dan dapat mengakses elemen berdasarkan indeks posisinya (dimulai dari 0).
> > - **Operasi Spesifik `List`:**
> > 		- **Akses Posisi:** `E get(int index)`, `E set(int index, E element)`.
> > 		- **Pencarian:** `int indexOf(Object o)`, `int lastIndexOf(Object o)`.
> > 		- **Iterasi:** `ListIterator<E> listIterator()`.
> > - **Implementasi Umum:**
> > 		- `ArrayList`: Implementasi berbasis array dinamis. Cepat untuk akses acak (`get`), lambat untuk penambahan/penghapusan di tengah.
> > 		- `LinkedList`: Implementasi berbasis _doubly-linked list_. Cepat untuk penambahan/penghapusan di awal/akhir/tengah, lambat untuk akses acak.
> > - **Contoh Kasus:** Mengacak urutan elemen.
> > 	```java
> > 	List<String> list = new ArrayList<String>();
> > 	for (String a : args) list.add(a);
> > 	Collections.shuffle(list, new Random()); // Mengacak urutan
> > 	System.out.println(list);
> > 	```
> >         
> > ### `Queue<E>` Interface 
> > - Sebuah koleksi yang dirancang untuk menampung elemen sebelum diproses.
> > - **Karakteristik Utama:** Biasanya mengikuti aturan **FIFO (First-In, First-Out)**. Elemen yang pertama masuk adalah elemen yang pertama keluar.
> > - **Operasi Spesifik `Queue`:** `offer(E e)` (menambah), `poll()` (mengambil dan menghapus kepala antrian), `peek()` (melihat kepala antrian tanpa menghapus).
> > - **Implementasi Umum:** `LinkedList` (juga mengimplementasikan `Queue`), `PriorityQueue` (elemen diproses berdasarkan prioritas).
> > - **Contoh Kasus:** Simulasi hitung mundur.
> >
> > 	```java
> > 	Queue<Integer> queue = new LinkedList<>();
> > 	for (int i = 5; i >= 0; i--) queue.add(i);
> > 	while (!queue.isEmpty()) {
> > 			System.out.println(queue.remove()); // Akan mencetak 5, 4, 3, 2, 1, 0
> > 			Thread.sleep(1000);
> > 	}
> > 	```
> > 	
> > ### `Deque<E>` Interface
> > - Singkatan dari _Double-Ended Queue_ (diucapkan "deck").
> > - **Karakteristik Utama:** Mendukung penambahan dan penghapusan elemen dari kedua ujung, yaitu kepala (_head_) dan ekor (_tail_). Bisa digunakan sebagai `Queue` (FIFO) atau `Stack` (LIFO - Last-In, First-Out).
> > - **Implementasi Umum:** `ArrayDeque` (lebih efisien), `LinkedList`.
> > - **Contoh Kasus:** Mengelola riwayat navigasi.
> > 		```java
> > 		Deque<String> deque = new LinkedList<>();
> > 		deque.addFirst("Halaman 1"); // Menambah di depan
> > 		deque.addLast("Halaman 2");  // Menambah di belakang
> > 		deque.push("Halaman 3");      // Menambah di depan (seperti stack)
> > 		System.out.println(deque.pop()); // Mengambil dari depan, output: Halaman 3
> > 		```
> >         
> > ### `Map<K, V>` Interface
> > - Sebuah objek yang memetakan **kunci (keys)** ke **nilai (values)**.
> > - **Karakteristik Utama:** Kunci harus unik. Setiap kunci hanya bisa memetakan ke satu nilai.
> > - **Operasi Dasar:** `V put(K key, V value)`, `V get(Object key)`, `V remove(Object key)`, `boolean containsKey(Object key)`.
> > - **Tampilan Koleksi:** `Set<K> keySet()`, `Collection<V> values()`, `Set<Map.Entry<K, V>> entrySet()`.
> > - **Implementasi Umum:**
> > 		- `HashMap`: Tidak ada jaminan urutan. Performa tinggi.
> > 		- `TreeMap`: Kunci diurutkan.
> > 		- `LinkedHashMap`: Urutan berdasarkan penyisipan kunci.
> > - **Contoh Kasus:** Menghitung frekuensi kemunculan kata.
> > 	```java
> > 	Map<String, Integer> m = new HashMap<>();
> > 	for (String a : args) {
> > 			Integer freq = m.get(a);
> > 			m.put(a, (freq == null) ? 1 : freq + 1);
> > 	}
> > 	System.out.println(m);
> > 	```


> [!cornell] #### Summary
>  Java Collection Framework adalah arsitektur komprehensif yang menyediakan _interfaces_ generik seperti `Set` (elemen unik), `List` (elemen terurut dan boleh duplikat), `Queue` (antrian FIFO), dan `Map` (pasangan kunci-nilai unik) beserta implementasi konkretnya (`HashSet`, `ArrayList`, `HashMap`, dll.). Framework ini memungkinkan pengembang untuk memilih struktur data yang paling sesuai dengan kebutuhan aplikasi untuk manipulasi data yang efisien dan terstruktur.