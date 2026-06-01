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
> > - Apa itu ReactJS?
> >     
> > - Apa itu 'V' dalam MVC?
> >     
> > - Apa keunggulan React?
> >     
> > - Apa itu Virtual DOM?
> >     
> > - Apa itu Rekonsiliasi?
> >     
> > - Apa itu JSX?
> >     
> > - Beda kode JSX vs Non-JSX?
> >     
> > - Apa itu React Component?
> >     
> > - Beda Props vs State?
> >     
> > - Fungsi `ReactDOM.render`?
> >     
> > - Kapan perlu 'key' prop?
> >     
> > - Apa itu Angular?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-10a-Client-Side-Framework.pdf (Slide 18-45)
> >     
> 
> > ### Pengenalan ReactJS
> >
> > **React** adalah sebuah _library_ JavaScript yang khusus digunakan untuk **membangun** _**User Interface**_ **(UI)**. Dibuat dan dikelola oleh Facebook.
> >
> > Dalam arsitektur **MVC (Model-View-Controller)**, React sering dianggap sebagai **'V' (View)**. Tugasnya hanya satu: menampilkan data ke pengguna dan mengelola tampilan.
> >
> > **Keunggulan Utama:**
> >
> > 1. **Deklaratif:** Anda memberi tahu React _seperti apa_ tampilan UI yang Anda inginkan (berdasarkan data saat ini), dan React akan mengurus _bagaimana_ cara mewujudkannya.
> >     
> > 2. **Efisien:** Proses _update_ DOM sangat efisien berkat konsep **Virtual DOM**.
> >     
> > 3. **Berbasis Komponen:** UI dipecah menjadi bagian-bagian kecil yang independen dan dapat digunakan kembali (_reusable_), yang disebut **Komponen**.
> >     
> >
> > ### Konsep Inti: Virtual DOM (V-DOM)
> >
> > **Masalah:** Manipulasi DOM browser secara langsung (seperti yang dilakukan jQuery) adalah operasi yang "mahal" dan lambat. Jika data sering berubah, memperbarui DOM terus-menerus akan membuat aplikasi menjadi _lemot_.
> >
> > **Solusi React (V-DOM):**
> >
> > 1. React menyimpan **salinan DOM** dalam bentuk _object_ JavaScript di dalam memori. Ini disebut **Virtual DOM**.
> >     
> > 2. Ketika data (misal: _state_) berubah, React **membuat V-DOM baru** di memori.
> >     
> > 3. React kemudian membandingkan V-DOM baru dengan V-DOM lama. Proses ini disebut **"Rekonsiliasi" (Reconciliation)**.
> >     
> > 4. React mencari **perbedaan (diff)** terkecil antara dua V-DOM tersebut.
> >     
> > 5. React HANYA memperbarui bagian-bagian yang benar-benar berubah pada **DOM browser (DOM asli)**.
> >     
> >
> > Ini jauh lebih cepat karena operasi di memori (V-DOM) sangat murah, dan manipulasi DOM asli yang mahal diminimalkan.
> >
> > ### JSX: "JavaScript XML"
> >
> > **JSX** adalah ekstensi sintaks untuk JavaScript yang terlihat mirip XML/HTML.
> >
> > - **Tujuan:** Mempermudah penulisan _template_ UI di dalam kode JavaScript. Ini lebih mudah dibaca daripada membuat elemen secara manual.
> >     
> > - **Penting:** Browser _tidak_ mengerti JSX. Kode JSX harus di-_compile_ (diubah) menjadi JavaScript murni menggunakan alat seperti **BabelJS**.
> >     
> >
> > Contoh (Dengan JSX):
> > 
> > ```jsx
> > var title = <h1>Hello World!</h1>;
> > ```
> >
> > Contoh (Tanpa JSX - JS Murni):
> > 
> > ```js
> > var title = React.createElement('h1', {}, 'Hello World!');
> > ```
> >
> > Jelas bahwa JSX jauh lebih mudah ditulis dan dibaca.
> >
> > ### React Components
> >
> > **Komponen** adalah inti dari React. Anggap saja sebagai _custom element_ HTML buatan kita sendiri.
> >
> > - Dibuat dengan `React.createClass()` (cara lama, seperti di slide) atau (cara modern) sebagai _class_ ES6 atau _function_.
> >     
> > - **Aturan:** Nama variabel Komponen harus diawali **huruf kapital** (misal: `LikeComponent`, bukan `likeComponent`).
> >     
> > - Setiap komponen wajib memiliki fungsi `render()` yang mengembalikan tampilan (JSX) dari komponen tersebut.
> >     
> >```jsx
> > var Comment = React.createClass({
> > 	render: function() {
> > 		return ( <div> ... </div> );
> > 	}
> > });
> > 
> > ReactDOM.render(<Comment />, document.getElementById('example'));
> > ```
> >
> > ### Props vs. State
> >
> > Komponen dapat menerima data melalui **Props** dan mengelola datanya sendiri melalui **State**. Perubahan pada salah satu dari keduanya akan memicu komponen di-_render_ ulang.
> >
> > |**Props (Properties)**|**State**|
> > |---|---|
> > |**Immutable** (Tidak bisa diubah oleh komponen itu sendiri).|**Mutable** (Bisa diubah oleh komponen itu sendiri).|
> > |Diterima dari _parent component_.|Didefinisikan & dikelola di dalam komponen.|
> > |Analogi: Parameter fungsi.|Analogi: Variabel internal.|
> > |Performa lebih baik.|Performa sedikit lebih buruk.|
> > |`var el = <LikeComponent name='pizza'/>` (name adalah props)|`getInitialState: function() { return {liked: false}; }` (liked adalah state)|
> >
> > ### Rekonsiliasi & 'key' Prop
> >
> > Saat me-_render_ sebuah daftar (list), React perlu tahu item mana yang berubah, ditambah, atau dihapus.
> >
> > **Masalah:** Jika kita tidak memberikan identitas unik, React mungkin akan melakukan kesalahan. Misal, jika urutan elemen daftar berubah, React mungkin akan _mengubah_ konten elemen pertama menjadi elemen kedua (yang lambat), alih-alih _memindahkan_ urutannya (yang cepat).
> >
> > Solusi: Selalu berikan key prop yang unik untuk setiap item dalam daftar.
> >
> > ```jsx
> > <Message content="Hi" key="id-1" />
> > 
> > <Message content="Hello" key="id-2" />
> > ```
> >
> > Dengan `key`, React tahu persis item mana yang harus dipindahkan, dihapus, atau dibiarkan, sehingga proses rekonsiliasi jauh lebih efisien.
> >
> > ### Framework Lain: Angular
> >
> > - **Angular (v2+)** adalah _framework_ besar lain yang bersaing dengan React.
> >     
> > - **Dikembangkan oleh Google.**
> >     
> > - Menggunakan **TypeScript** (sebuah _superset_ dari JavaScript).
> >     
> > - Berbeda dengan React (library 'V'), Angular adalah _framework_ lengkap yang menyediakan _semua_ solusi (termasuk _routing_, _state management_, dll).
> >     
> > - Arsitekturnya berbasis hierarki komponen (mirip React).
> >     

> [!cornell] #### Summary
> 
> **React** adalah _library_ JavaScript dari Facebook untuk **membangun UI** yang efisien dan deklaratif menggunakan **arsitektur berbasis komponen**. Konsep utamanya adalah **Virtual DOM (V-DOM)**, sebuah salinan DOM di memori yang memungkinkan React menghitung pembaruan minimal melalui proses **Rekonsiliasi**, sehingga menghindari manipulasi DOM asli yang lambat. Pengembang menggunakan **JSX** (sintaks mirip HTML) untuk mendefinisikan tampilan komponen. Komponen mengelola data melalui **Props** (data _immutable_ dari _parent_) dan **State** (data _mutable_ internal), di mana perubahan pada keduanya akan memicu _render_ ulang yang efisien (terutama jika `key` prop digunakan dengan benar untuk daftar).

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: `createClass` vs. Functional Components (Modern React)
> 
> Materi dalam slide (slide 32) menggunakan `React.createClass()`. Ini adalah **cara yang sudah sangat usang (legacy)** untuk membuat komponen React.
> 
> **React Modern** (sejak ~2016) menggunakan dua cara:
> 
> 1. **ES6 Classes (Cara Lama Modern):**
>     
>     ```jsx
>     class Comment extends React.Component {
>       constructor(props) {
>         super(props);
>         this.state = { liked: false };
>       }
>       render() {
>         return <div>Hello, {this.props.name}</div>;
>       }
>     }
>     ```
>     
> 2. **Functional Components & Hooks (Cara Paling Modern & Direkomendasikan):**
>     
> 	```jsx
> 	import React, { useState } from 'react';
> 	function Comment(props) {
> 	  // 'useState' adalah Hook untuk mengelola state
> 	  const [liked, setLiked] = useState(false);
> 	  
> 	  return <div>Hello, {props.name}</div>;
> 	}
> 	```
>
> Pendekatan fungsional dengan _Hooks_ (seperti `useState`, `useEffect`) sekarang menjadi standar de facto karena lebih ringkas dan mudah dikelola.
> 
> 
> #### Topik Teknis: Angular vs. React (Sebuah Perbandingan Singkat)
> 
>   - **React:** Adalah sebuah *library*. Anda hanya mendapatkan 'V' (View). Anda bebas memilih *library* lain untuk *routing* (React Router), *state management* (Redux, Zustand), dll. Ini memberi fleksibilitas tinggi.
>   - **Angular:** Adalah sebuah *framework* "lengkap" (*batteries-included*). Saat Anda menginstal Angular, Anda sudah mendapatkan solusi resmi dari Google untuk *routing*, *forms*, *state management*, dll. Ini lebih kaku (*opinionated*), tetapi memberikan struktur yang sangat jelas untuk tim besar.
> 
> #### Sumber & Referensi Lanjutan:
> 
>   - **Dokumentasi React (Baru):** [https://react.dev/](https://react.dev/) (Ini adalah dokumentasi modern yang berfokus pada Hooks)
>   - **Dokumentasi React (Lama/Legacy):** [https://reactjs.org/](https://reactjs.org/)
>   - **Babel (Compiler JSX):** [https://babeljs.io/](https://babeljs.io/)