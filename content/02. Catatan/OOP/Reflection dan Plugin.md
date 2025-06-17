---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Reflection?
> > - Objek `java.lang.Class`
> > - Objek `java.lang.reflect.Field`
> > - Objek `java.lang.reflect.Method`
> > - Kenapa Perlu Reflection?
> > - Konsep Sistem Plugin
> > - Interface `FileLoader`
> > - Algoritma Memuat Plugin
> > - Menggunakan Plugin yang Dimuat
> > - Passing Kode sebagai Argumen
> 
> > 
> > ### Reflection
> > - Kemampuan sebuah program untuk menginspeksi dan memanipulasi struktur internalnya sendiri (seperti kelas, method, field) pada saat runtime.
> > - Dengan reflection, kita bisa melakukan hal-hal seperti mengakses member `private` atau menambah instance dari kelas yang namanya hanya kita ketahui dalam bentuk `String`.
> > 
> > **Objek `java.lang.Class`**
> > - Java memiliki kelas `Class` (`java.lang.Class`) yang merepresentasikan sebuah kelas atau interface saat runtime.
> > - Ada beberapa cara untuk mendapatkan objek `Class`:
> > 	- **Literal .class**: `Class c = Person.class;`
> > 	- **Method `forName()`**: `Class c = Class.forName("Person");`
> > 	- **Method `getClass()`**: `Person p = new Person(...); Class c = p.getClass();`
> > - Setelah mendapatkan objek `Class`, kita bisa menggunakannya untuk mendapatkan informasi tentang kelas tersebut, seperti daftar method, field, constructor, dan lainnya.
> > 
> > **Objek `java.lang.reflect.Method`**
> > - Merepresentasikan sebuah method dalam sebuah kelas.
> > - Untuk memanggil (invoke) sebuah method menggunakan reflection:
> > 	1. Dapatkan objek `Method` dengan `c.getDeclaredMethod("namaMethod", tipeParameter...)`.
> > 	2. Panggil `method.invoke(obj, argumen...)` pada instance objek yang diinginkan.
> >
> > **Objek `java.lang.reflect.Field`**
> > - Merepresentasikan sebuah field (atribut) dalam sebuah kelas.
> > - Untuk membaca atau mengubah nilai sebuah field:
> > 	1. Dapatkan objek `Field` dengan `c.getDeclaredField("namaField")`.
> > 	2. Baca nilai dengan `field.get(obj)`.
> > 	3. Ubah nilai dengan `field.set(obj, nilaiBaru)`.
> > 
> > **Akses Member `private`**:
> > - Secara default, reflection tidak bisa mengakses member `private`.
> > - Untuk mengaksesnya, kita harus secara eksplisit memanggil method `setAccessible(true)` pada objek `Method` atau `Field` yang bersangkutan.
> >
> > **Praktik: Inspeksi Method (`ghostMethods`)**:
> > - **Tujuan**: Mendapatkan semua nama method dari kelas `Ghost`.
> > - **Algoritma**:
> > 	1. Dapatkan semua method yang dideklarasikan di dalam kelas `Ghost`, termasuk yang `private`, dengan memanggil **`g.getClass().getDeclaredMethods()`**.
> > 	2. Lakukan iterasi pada setiap objek `Method`.
> > 	3. Dalam setiap iterasi, panggil **`method.getName()`** untuk mendapatkan nama method, lalu tambahkan ke dalam `ArrayList`.
> > - **Kode**:
> > 	```java
> > 	public ArrayList<String> ghostMethods(){
> > 		Ghost g = new Ghost();
> > 		Method[] m = g.getClass().getDeclaredMethods();
> > 		
> > 		ArrayList<String> list = new ArrayList<>();
> > 		for(Method method : m) {
> > 			list.add(method.getName());
> > 		}
> > 		return list;
> > 	}
> > 	```
> >
> > 
> > 
> > **Praktik: Invoke Method (`sumGhost` & `letterGhost`)**:
> >  - **Tujuan**: Memanggil semua method `private` pada kelas `Ghost` yang mengembalikan `Integer` atau `String` dan memproses hasilnya
> >  - **Algoritma**:
> > 	 1. Dapatkan semua method menggunakan **`getDeclaredMethods()`**.
> > 	 2. Iterasi melalui setiap method dan periksa tipe kembaliannya (return type) menggunakan **`method.getReturnType()`**.
> > 	 3. Jika tipe kembaliannya sesuai, panggil **`method.setAccessible(true)`** untuk memungkinkan akses ke method `private`.
> > 	 4. Panggil method tersebut menggunakan **`method.invoke(g)`**.
> > 	 5. Proses hasilnya (tambahkan ke total atau gabungkan ke string).
> > - **Kode**:
> > 
> > 	```java
> > 	//Sum Ghost
> > 	public Integer sumGhost() throws Exception{
> > 		try {
> > 			Ghost g = new Ghost();
> > 			Method[] m = g.getClass().getDeclaredMethods();
> > 			Integer sum = 0;
> > 	
> > 			for (Method method : m){
> > 				if (method.getReturnType() == Integer.class || method.getReturnType() == int.class) {
> > 					method.setAccessible(true);
> > 					Object result = method.invoke(g);
> > 					if (result != null) sum += (Integer) result;
> > 				}
> > 			}
> > 			return sum;
> > 		} catch (Exception e) {
> > 			throw e;
> > 		}
> > 	}
> >     //Letter Ghost
> >     public String letterGhost() throws Exception{
> >       try {
> >         StringBuilder sb = new StringBuilder("");
> >         Ghost g = new Ghost();
> >         Method[] m = g.getClass().getDeclaredMethods();
> >     
> >         for (Method method : m){
> >           if (method.getReturnType() == String.class){
> >             method.setAccessible(true);
> >             Object result = method.invoke(g);
> >             if (result != null) sb.append(result);
> >           }
> >         }
> >         return sb.toString();
> >       } catch (Exception e) {
> >         throw e;
> >       }
> >     }
> > 	```
> > 
> > **Praktik: Akses Field (`findSecretId`)**
> > - **Tujuan**: Mencari `uniqueId` `private` dari sebuah objek `Secret` berdasarkan email
> > - **Algoritma**:
> > 	1. Gunakan method publik **`sc.isThis(email)`** untuk menemukan objek yang cocok.
> > 	2. Setelah objek ditemukan, dapatkan objek `Field` yang merepresentasikan `uniqueId` dengan memanggil **`sc.getClass().getDeclaredField("uniqueId")`**.
> > 	3. Buat field tersebut dapat diakses dengan memanggil **`f.setAccessible(true)`**.
> > 	4. Ambil nilainya pada objek `sc` menggunakan **`f.get(sc)`**.
> > 	
> > - **Kode**:
> > 	```java
> >     public String findSecretId(List<Secret> sl, String email) throws Exception{
> >       try {
> >         for (Secret sc : sl){
> >           if (sc.isThis(email)) {
> >             Field f = sc.getClass().getDeclaredField("uniqueId");
> >             f.setAccessible(true);
> >             return (String) f.get(sc);
> >           }
> >         } 
> >         return "NaN";
> >       } catch (Exception e) {
> >         throw e;
> >       }
> >     }
> >     ```
> >    
> > **Perbedaan `get...` vs `getDeclared...`**:
> > - **`getDeclaredFields()` / `getDeclaredMethods()`**: Mengembalikan **semua** member (public, private, protected) yang dideklarasikan **langsung di dalam kelas itu sendiri**, tetapi **tidak termasuk** member yang diwariskan (inherited).
> > - **`getFields()` / `getMethods()`**: Mengembalikan **hanya** member `public`, tetapi **termasuk** member `public` yang diwariskan dari superclass.
> > 
> > **Kenapa Perlu Reflection?**
> > - Membuat framework testing dan dependency injection.
> > - Memeriksa kode mahasiswa secara otomatis.
> > - **Membuat sistem plugin yang dinamis.**
> > - Mengurangi kode _boilerplate_ (misalnya, membuat Factory atau loader data generik).
> >
> > ### Konsep Sistem Plugin
> > Sebuah komponen yang bisa ditambahkan ke aplikasi untuk memperluas fungsionalitasnya **tanpa perlu mengkompilasi ulang** seluruh aplikasi.
> > - **Contoh Masalah:** Sebuah aplikasi Spreadsheet ingin mendukung format file baru (misal: `.ods`) hanya dengan menambahkan file `.jar` baru ke sebuah direktori "plugins", tanpa mengubah kode inti Spreadsheet.
> > - **Interface `FileLoader`:**
> >  Sebuah kontrak yang harus dipatuhi oleh semua kelas plugin. Ini memastikan bahwa aplikasi utama tahu method apa saja yang bisa dipanggil pada setiap plugin.
> > 	```java
> > 	public interface FileLoader {
> > 			void load(String filename);
> > 			boolean supports(String filename);
> > 			int rowCount();
> > 			int colCount();
> > 			String cell(int row, int col);
> > 	}
> > 	```
> >     
> > - **Algoritma Memuat Plugin:**
> >     1. **Dapatkan Daftar File:** Baca semua nama file dari direktori plugin.
> > 
> > 			```java
> > 			File f = new File("plugin");
> > 			List<String> names = Arrays.asList(f.list());
> > 			```
> >     
> >     2. **Load Kelas:** Untuk setiap nama file, gunakan `Class.forName()` untuk mendapatkan objek `Class`-nya. JVM akan mencari kelas ini di classpath.
> >     
> > 		    ```java
> > 		    Class c = Class.forName(namaKelasDariFile);
> > 		    ```
> >     
> >     3. **Periksa Interface:** Verifikasi bahwa kelas tersebut mengimplementasikan `FileLoader` dengan memeriksa `c.getInterfaces()`.
> >     
> > 		    ```java
> > 		    boolean isLoader = Arrays.stream(c.getInterfaces())
> > 		                               .anyMatch(itf -> itf.getName().equals("FileLoader"));
> > 		    ```
> >     
> >     4. **Instansiasi Objek:** Jika kelas valid, buat instance-nya menggunakan `c.newInstance()` dan simpan dalam sebuah daftar.
> >     
> > 		    ```java
> > 		    FileLoader fl = (FileLoader) c.newInstance();
> > 		    fileLoaders.add(fl);
> > 		    ```
> >     
> > - **Menggunakan Plugin yang Dimuat:**
> >     - Setelah semua plugin dimuat ke dalam daftar, aplikasi utama bisa menggunakannya.
> >     - Contoh: Saat membuka file, aplikasi akan menanyai setiap plugin di daftar apakah ia mendukung ekstensi file tersebut. Jika ada yang mendukung, method `load()` dari plugin itu akan dipanggil.
> >     
> > 	    ```java
> > 	    void loadFile(String fileName) {
> > 	        Optional<FileLoader> loader = fileLoaders.stream()
> > 	            .filter(fl -> fl.supports(fileName)) // Cari plugin yang mendukung
> > 	            .findAny();
> > 	    
> > 	        if (loader.isPresent()) {
> > 	            loader.get().load(fileName); // Gunakan plugin untuk memuat file
> > 	            // ... proses data dari plugin
> > 	        } else {
> > 	            // ... handle jika tidak ada plugin yang mendukung
> > 	        }
> > 	    }
> > 	    ```
> >     
> > - **Passing Kode sebagai Argumen:**
> >     
> >     - Reflection adalah salah satu cara untuk "melewatkan kode" sebagai argumen, yaitu dengan memberikan nama kelas/method dalam bentuk `String`.
> >     - Cara lain di Java termasuk menggunakan _Interface_ (pola strategi), dan sejak Java 8, menggunakan _Lambda Expression_ yang lebih ringkas.

> [!cornell] #### Summary
> Reflection adalah mekanisme canggih di Java yang memungkinkan program untuk menginspeksi dan memanipulasi kelas, method, dan field pada saat runtime melalui objek `Class`, `Method`, dan `Field`. Kemampuan dinamis ini menjadi dasar untuk membangun sistem yang sangat fleksibel dan dapat diperluas, seperti arsitektur plugin, di mana fungsionalitas baru dapat ditambahkan ke aplikasi hanya dengan me-load kelas secara dinamis tanpa perlu kompilasi ulang kode inti.


> [!ad-libitum]- Additional Information (Optional)
> #### Include material that's interesting but not essential:
> - Historical context
> - Related concepts
> - Further reading
> - Practical applications