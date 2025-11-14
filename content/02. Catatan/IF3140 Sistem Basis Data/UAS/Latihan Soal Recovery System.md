_Back to_ [[IF3140 Sistem Basis Data]]

Berikut ini adalah sebuah _schedule_ yang dihasilkan dari eksekusi konkuren 3 buah transaksi.

R1(A); R2(B); R3(C); R1(B); R2(D); R3(A); W2(D); A2; W3(C); C3; W1(A); C1; R2(B); R2(D); W2(D); W2(A); C2;

1. Tuliskan isi log hasil eksekusi _schedule_ tersebut. Asumsikan bahwa start dari setiap transaksi dimulai tepat sebelum eksekusi instruksi pertama transaksi tersebut. Nilai A, B, C, dan D sebelum eksekusi _schedule_ adalah A0, B0, C0, dan D0, dan setiap penulisan nilai item X yang semula Xi akan mengubah nilainya menjadi Xi+1.
2. Apabila _checkpoint_ terakhir terjadi tepat setelah T2 menyelesaikan proses _rollback_ dan terjadi _system failure_ tepat sebelum T2 commit (saat dijalankan kembali setelah _abort_), jelaskan proses _recovery_ yang dilakukan setelah sistem pulih kembali.

Jawab:

1.
```
<T1 start>
<T2 start>
<T3 start>
<T2, D, D0, D1>
<T2, D, D0>
<T2 abort>
<T3, C, C0, C1>
<T3 commit>
<T1, A, A0, A1>
<T1 commit>
<T2 start>
<T2, D, D0, D1>
<T2, A, A1, A2>
<T2 commit>
```
2. Dengan Redo-Undo phase:

- Lakukan Redo: T1 aman, T3 aman (sudah commit). T2 belum aman. setelah T2 abort (checkpoint)
    - `<T3, C, C0, C1>` (masuk undo-list)
    - `<T3 commit>` (keluar dari undo-list)
    - `<T1, A, A0, A1>` (masuk undo-list)
    - `<T1 commit>` (keluar dari undo-list)
    - `<T2, D, D0, D1>` (masuk undo-list)
    - `<T2, A, A1, A2>` (masuk undo-list)
- Lakukan Undo (sebelum commit, setelah start). Untuk setiap undo list:
    - `<T2, A, A0>`
    - `<T2, D, D0>`

State akhir:

A = A2, B = B0, C = C1, D = D1