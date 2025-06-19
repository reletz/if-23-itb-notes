/**
 * Checker ini akan menjalankan skenario yang sama dengan DeadlockInducer,
 * tetapi dengan timeout. Jika kode Anda sudah benar, program akan selesai
 * sebelum timeout. Jika masih deadlock, program akan dihentikan paksa.
 */
public class DeadlockResolverChecker {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("--- Deadlock Resolver Checker ---");

        final Resource forkA = new Resource("ForkA");
        final Resource forkB = new Resource("ForkB");

        // Proses ini harus sudah dimodifikasi untuk menghindari deadlock
        Runnable process1 = new DeadlockingProcess(forkA, forkB);
        Runnable process2 = new DeadlockingProcess(forkB, forkA);

        Thread t1 = new Thread(process1, "Process-1-Checker");
        Thread t2 = new Thread(process2, "Process-2-Checker");
        
        long startTime = System.currentTimeMillis();

        t1.start();
        t2.start();

        // Beri waktu 5 detik untuk selesai. Jika tidak, anggap masih deadlock.
        t1.join(5000);
        t2.join(5000);

        long duration = System.currentTimeMillis() - startTime;

        System.out.println("\n--- CHECKER RESULTS ---");
        if (t1.isAlive() || t2.isAlive()) {
            System.out.println("STATUS: FAILED! Program tidak selesai dalam 5 detik. Masih terjadi deadlock.");
            // Hentikan paksa thread yang masih berjalan
            t1.interrupt();
            t2.interrupt();
        } else {
            System.out.println("STATUS: SUCCESS! Kedua proses selesai dalam " + duration + "ms. Deadlock berhasil diatasi.");
        }
        System.out.println("-------------------------");
    }
}
