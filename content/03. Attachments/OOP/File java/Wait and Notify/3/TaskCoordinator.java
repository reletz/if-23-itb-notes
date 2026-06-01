import java.util.ArrayList;
import java.util.List;

public class TaskCoordinator {
    private final int totalTasks;
    private int completedTasks = 0;

    public TaskCoordinator(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public synchronized void startAndAwaitCompletion() throws InterruptedException {
        System.out.println("Koordinator memulai " + totalTasks + " tugas.");
        List<Thread> workerThreads = new ArrayList<>();
        for (int i = 0; i < totalTasks; i++) {
            Thread workerThread = new Thread(new Worker(i + 1, this));
            workerThreads.add(workerThread);
            workerThread.start();
        }

        System.out.println("Koordinator menunggu semua tugas selesai...");
        // TODO: Implementasikan logika untuk menunggu di sini sampai semua tugas selesai.
        // Opsi 1: Gunakan loop untuk memanggil join() pada setiap thread di workerThreads.
        // Opsi 2: Gunakan 'while(completedTasks < totalTasks)' dengan 'wait()'.
        
    }

    /**
     * TODO: Method ini dipanggil oleh setiap worker ketika selesai.
     * Method ini harus thread-safe dan harus memberi tahu koordinator yang menunggu
     * ketika tugas terakhir telah selesai.
     */
    public synchronized void taskFinished() {
        // TODO: Naikkan counter completedTasks.
        
        System.out.println(completedTasks + "/" + totalTasks + " tugas selesai.");
        // TODO: Jika semua tugas selesai, panggil notify() atau notifyAll() untuk membangunkan
        // thread utama yang menunggu di startAndAwaitCompletion().
        
    }

    public int getCompletedTasks() {
        return completedTasks;
    }
}