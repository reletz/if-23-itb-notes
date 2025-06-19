import java.util.Random;

class Worker implements Runnable {
    private final int taskId;
    private final TaskCoordinator coordinator;

    public Worker(int taskId, TaskCoordinator coordinator) {
        this.taskId = taskId;
        this.coordinator = coordinator;
    }

    @Override
    public void run() {
        try {
            int workTime = new Random().nextInt(1000) + 500; // 500-1500 ms
            System.out.println("Tugas " + taskId + " dimulai (membutuhkan " + workTime + "ms).");
            Thread.sleep(workTime);
            System.out.println("Tugas " + taskId + " selesai.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            // Blok ini krusial untuk memberitahu koordinator bahwa tugas sudah selesai.
            coordinator.taskFinished();
        }
    }
}
