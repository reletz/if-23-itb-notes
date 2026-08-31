---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Exception - Jenis dan Penanganan
>
> > ## Questions/Cues
> >
> > - Apa itu exception dan kapan ia muncul?
> > - Apa saja jenis exception yang umum di Python?
> > - Bagaimana `try` / `except` menangani exception?
> > - Apa guna klausa `except` spesifik, `else`, dan `finally`?
> > - Apa saja strategi menghadapi error, dan mana yang dianjurkan?
> > - Kapan sebaiknya `raise` exception sendiri?
> >
> > ## Reference Points
> >
> > - IF5100 — Exceptions and Assertions (Slides 3-9)
>
> > ### Apa Itu Exception
> >
> > **Exception** terjadi saat eksekusi sebuah prosedur menemui **kondisi yang tak terduga** — sesuatu yang berbeda dari yang diharapkan. Contoh:
> >
> > - Mengakses di luar batas list → `test = [1, 7, 4]; test[4]` → **`IndexError`**
> > - Mengonversi tipe yang tidak sesuai → `int(test)` → **`TypeError`**
> > - Merujuk variabel yang tidak ada → `a` (padahal `a` belum didefinisikan) → **`NameError`**
> > - Mencampur tipe data tanpa *coercion* → `'a' / 4` → **`TypeError`**
> >
> > ### Jenis Exception yang Umum
> >
> > | Tipe | Arti |
> > |---|---|
> > | `SyntaxError` | Python tidak bisa mem-*parse* program |
> > | `NameError` | nama lokal atau global tidak ditemukan |
> > | `AttributeError` | referensi atribut gagal |
> > | `TypeError` | operan tidak bertipe benar |
> > | `ValueError` | tipe operan cocok, tetapi nilainya ilegal |
> > | `IOError` | sistem IO melaporkan malfungsi (mis. file tidak ditemukan) |
> >
> > ### Menangani Exception dengan `try` / `except`
> >
> > Kode Python bisa menyediakan **handler** untuk exception. Exception yang dilempar oleh **statement mana pun** di dalam body `try` ditangani oleh statement `except`, lalu eksekusi lanjut ke body `except`:
> >
> > ```python
> > try:
> >     a = int(input("Tell me one number: "))
> >     b = int(input("Tell me another number: "))
> >     print(a / b)
> > except:
> >     print("Bug in user input.")
> > ```
> >
> > ### Klausa `except` Spesifik
> >
> > Gunakan klausa `except` terpisah untuk menangani **tipe exception tertentu**, dengan bare `except` di akhir sebagai penangkap terakhir:
> >
> > ```python
> > try:
> >     a = int(input("Tell me one number: "))
> >     b = int(input("Tell me another number: "))
> >     print("a/b = ", a / b)
> >     print("a+b = ", a + b)
> > except ValueError:
> >     print("Could not convert to a number.")
> > except ZeroDivisionError:
> >     print("Can't divide by zero")
> > except:
> >     print("Something went very wrong.")
> > ```
> >
> > ### Klausa `else` dan `finally`
> >
> > ```mermaid
> > flowchart TD
> >     T["Jalankan body try"] --> Q{"Muncul exception?"}
> >     Q -->|Ya| X["Cari except yang cocok;<br/>jika tak ada, bare except"]
> >     Q -->|Tidak| E["Jalankan body else"]
> >     X --> F["Jalankan body finally"]
> >     E --> F
> >     F --> N["Lanjut eksekusi berikutnya"]
> > ```
> >
> > - **`else:`** body-nya dijalankan **bila body `try` selesai tanpa exception**.
> > - **`finally:`** body-nya **selalu** dijalankan setelah klausa `try`, `else`, dan `except` — **bahkan** bila mereka melempar error lain atau menjalankan `break`, `continue`, atau `return`. Berguna untuk **kode pembersihan** yang harus jalan apa pun yang terjadi (mis. menutup file).
> >
> > ### Apa yang Dilakukan Terhadap Error
> >
> > - **Fail silently** — substitusi nilai default atau lanjut begitu saja. **Ide buruk**: pengguna tidak mendapat peringatan apa pun.
> > - **Kembalikan sebuah "nilai error"** — nilai apa yang dipilih? Ini **memperumit kode** karena setiap pemanggil harus mengecek nilai khusus tersebut.
> > - **Hentikan eksekusi, sinyalkan kondisi error** — di Python: **lempar exception** dengan `raise Exception("string deskriptif")`. Ini **penanganan error yang dianjurkan**.

> [!cornell] #### Summary
>
> **Exception** muncul saat eksekusi menemui kondisi tak terduga — mis. `test[4]` (`IndexError`), `int(test)` (`TypeError`), variabel tak dikenal (`NameError`), `'a'/4` (`TypeError`). Jenis umum lain: `SyntaxError`, `AttributeError`, `ValueError`, `IOError`. **`try` / `except`** menangkap exception dari statement mana pun di body `try` dan melanjutkan ke body `except`; klausa **`except` spesifik** (`except ValueError`, `except ZeroDivisionError`) menangani tipe tertentu, dengan bare `except` sebagai penangkap terakhir. **`else`** jalan bila `try` selesai tanpa exception; **`finally`** selalu jalan (untuk pembersihan seperti menutup file), bahkan saat ada `return`/`break`/error. Terhadap error, **fail silently** dan **mengembalikan nilai error** sama-sama buruk; yang dianjurkan adalah **`raise Exception("...")`** untuk menghentikan eksekusi dan menyinyalkan kondisi error.

> [!ad-libitum]- Additional Information
>
> #### Hierarki Exception dan `as`
>
> Semua exception mewarisi `BaseException`; sebagian besar dari `Exception`. `except (ValueError, TypeError) as e:` menangkap beberapa tipe sekaligus dan mengikat objeknya ke `e` (punya `.args`, bisa di-`str()`). Hindari bare `except:` di kode produksi — ia juga menangkap `KeyboardInterrupt` dan `SystemExit`; pakai `except Exception:` bila memang perlu menyapu luas.
>
> #### Exception Kustom
>
> `class InvalidGradeError(Exception): pass` membuat tipe error domain-spesifik yang bisa ditangkap secara terarah oleh pemanggil. Idiom umum: satu kelas basis per modul/paket, lalu subkelas per kegagalan konkret.
>
> #### `raise ... from`, Traceback, dan `logging`
>
> `raise NewError(...) from original` mempertahankan rantai sebab (*exception chaining*). Modul `traceback` mencetak/format jejak; modul `logging` (`logger.exception(...)`) mencatat error beserta traceback ke file/aliran — lebih baik daripada `print` untuk aplikasi nyata. `warnings` untuk kondisi non-fatal yang tetap perlu diketahui pengguna.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis fungsi `read_config(path)` yang menangani `FileNotFoundError` dan `ValueError` secara terpisah, memakai `else` untuk mem-*parse* dan `finally` untuk mencatat "selesai".
> 2. Buat exception kustom `BankError` dengan subkelas `InsufficientFundsError`, lalu simulasikan penarikan saldo.
> 3. Bandingkan output `print` biasa vs `logging.exception` saat sebuah `ZeroDivisionError` terjadi di dalam loop.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 7 (Exceptions and Assertions).
> - Dokumentasi Python: *Errors and Exceptions*, *Built-in Exceptions*, modul `logging`.
> - MIT OCW 6.0001, *Lecture 7: Testing, Debugging, Exceptions, Assertions*.
