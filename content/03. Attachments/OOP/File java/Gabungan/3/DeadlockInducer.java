/**
 * Kelas ini digunakan untuk menjalankan skenario yang menyebabkan deadlock.
 * Anda hanya perlu menjalankan file ini untuk melihat masalahnya.
 * Tidak perlu diubah.
 */
public class DeadlockInducer {
    public static void main(String[] args) {
        System.out.println("--- Deadlock Inducer ---");
        System.out.println("Program ini akan 'hang' jika deadlock terjadi.");

        final Resource forkA = new Resource("ForkA");
        final Resource forkB = new Resource("ForkB");

        // Proses 1: Mengunci A, lalu B
        Runnable process1 = new DeadlockingProcess(forkA, forkB);
        // Proses 2: Mengunci B, lalu A (menyebabkan deadlock)
        Runnable process2 = new DeadlockingProcess(forkB, forkA);

        Thread t1 = new Thread(process1, "Process-1");
        Thread t2 = new Thread(process2, "Process-2");

        t1.start();
        t2.start();
        
        System.out.println("Menunggu proses selesai...");
    }
}
