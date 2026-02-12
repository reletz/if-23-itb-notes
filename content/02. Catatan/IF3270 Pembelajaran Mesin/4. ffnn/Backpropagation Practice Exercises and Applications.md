---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin]]

> [!cornell] Backpropagation Practice Exercises and Applications
>
> > ## Questions/Cues
> >
> > - Bagaimana menghitung error term δ untuk unit output?
> > - Prosedur update bobot menggunakan learning rate α
> > - Implementasi backpropagation pada jaringan sederhana
> > - Perbedaan perhitungan gradien output vs hidden layer
> > - Strategi terminasi algoritma backpropagation
> >
> > ## Reference Points
> >
> > - Lecture_IF3270_ANN.pptx (Slides 26-41)
> > - Machine Learning - Mitchell (Halaman 35)
> > - Deep Learning - Goodfellow (Halaman 17-20)
> >
>
> > ### Konsep Dasar Latihan Backpropagation
> > Backpropagation adalah algoritma pembelajaran untuk Jaringan Saraf Tiruan (JST) yang bertujuan meminimalkan error dengan menyesuaikan bobot secara iteratif. Proses ini melibatkan dua tahap utama: **forward propagation** (menghitung output) dan **backward propagation** (menghitung error dan menyesuaikan bobot).
> > Contoh penerapan dasar dapat dilihat pada jaringan dengan:
> > - 2 unit input (x1, x2)
> > - 1 unit hidden (h)
> > - 3 unit output (o1, o2, o3)
> > - Fungsi aktivasi sigmoid: σ(z) = 1/(1+e^(-z))
> > **Alur perhitungan**:
> > 1. Hitung output hidden layer: h = σ(w0 + w1*x1 + w2*x2)
> > 2. Hitung output akhir: o_k = σ(w3 + w4*h) untuk setiap unit output