import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);

        // 1. Baca N dan data array
        int N = sc.nextInt();
        int[] data = new int[N];
        for (int i = 0; i < N; i++) {
            data[i] = sc.nextInt();
        }

        // 2. Baca T = jumlah thread yang diinginkan
        int T = sc.nextInt();
        if (T <= 0) {
            System.out.println("Jumlah thread harus >= 1");
            sc.close();
            return;
        }
        sc.close();

        // 3. Siapkan array untuk partial results dan thread pool
        double[] partialSum = new double[T];
        int[] partialMin    = new int[T];
        int[] partialMax    = new int[T];
        Thread[] threads    = new Thread[T];

        // 4. BAGIAN PENGERJAAN (TODO):
        //    - Bagi array `data` ke dalam T segmen sedemikian rupa sehingga selisih jumlah elemen antar segmen <= 1.
        //      Jika N tidak habis dibagi T, maka thread dengan indeks lebih kecil akan mendapatkan 1 elemen ekstra.
        //      Contoh: N=8, T=3 -> segmen ukuran [3, 3, 2].
        //    - Untuk setiap segmen ke-i (0 <= i < T):
        //        - Buat satu SumThread yang menghitung jumlah elemen, minimum lokal, maksimum lokal pada segmen tersebut.
        //        - SumThread menulis hasilnya ke partialSum[i], partialMin[i], partialMax[i],.
        //    - Jalankan semua SumThread, kemudian tunggu
        //      hingga semua perhitungan selesai sebelum mencetak hasil.
        int[] index = new int[T];
        int rem = N % T;
        for (int i = 0; i < index.length; i++){
            index[i] = N / T;
            if (rem != 0){
                index[i]++;
                rem--;
            }
        }

        int startIndex = 0;
        int lastIndex = 0;
        for (int i = 0; i < index.length; i++){
            lastIndex += index[i];
            threads[i] = new SumMinMaxThread(data, partialSum, partialMin, partialMax, startIndex, lastIndex, i);
            threads[i].start();
            startIndex = lastIndex;
        }
        
        for (int i = 0; i < index.length; i++) {threads[i].join(); }

        // 5. Agregasi hasil
        double totalSum = 0;
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < T; i++) {
            totalSum   += partialSum[i];
            min  = Math.min(min, partialMin[i]);
            max  = Math.max(max, partialMax[i]);
        }
        double mean = totalSum / N;

        // 6. Cetak hasil
        System.out.printf("Minimum = %d%n", min);
        System.out.printf("Maximum = %d%n", max);
        System.out.printf("Mean    = %.2f%n", mean);
    }

    /**
     * Thread untuk menghitung sum, min, max pada segmen data[start..end-1].
     * Simpan di partialSum[idx], partialMin[idx], partialMax[idx].
     */
    private static class SumMinMaxThread extends Thread {
        private final int[] data;
        private final double[] partialSum;
        private final int[] partialMin, partialMax;
        private final int start, end, idx;

        public SumMinMaxThread(int[] data,
                               double[] partialSum,
                               int[] partialMin,
                               int[] partialMax,
                               int start, int end, int idx) {
            this.data        = data;
            this.partialSum  = partialSum;
            this.partialMin  = partialMin;
            this.partialMax  = partialMax;
            this.start       = start;
            this.end         = end;
            this.idx         = idx;
        }

        @Override
        public void run() {
            // TODO: Hitung sum, min, max lokal
            int sum = 0, max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
            for (int i = start; i < end; i++){
                int el = data[i];
                min  = Math.min(min, el);
                max  = Math.max(max, el);
                sum += el;
            } 
            this.partialSum[idx] = sum;
            this.partialMax[idx] = max;
            this.partialMin[idx] = min;
        }
    }
}
