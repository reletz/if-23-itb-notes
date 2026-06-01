public class CoordinatorChecker {
    public static void main(String[] args) {
        System.out.println("--- Task Coordinator Checker ---");
        int numTasks = 10;
        TaskCoordinator coordinator = new TaskCoordinator(numTasks);

        long startTime = System.currentTimeMillis();

        try {
            // Method ini harus memblokir sampai semua tugas selesai.
            coordinator.startAndAwaitCompletion();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Checker was interrupted.");
        }

        long endTime = System.currentTimeMillis();

        System.out.println("\n--- CHECKER RESULTS ---");
        System.out.println("Koordinator melaporkan semua tugas telah selesai.");
        
        long timeTaken = endTime - startTime;
        System.out.println("Total waktu eksekusi: " + timeTaken + "ms.");

        int completedCount = coordinator.getCompletedTasks();
        System.out.println("Jumlah akhir tugas yang selesai: " + completedCount);

        // Waktu eksekusi harus sekitar waktu tugas terlama, bukan jumlah semua waktu tugas.
        // Waktu tugas maks: ~1500ms. Jika paralel, harus < 2500ms. Jika serial, > 5000ms.
        boolean timeCheck = timeTaken < 2500; 

        if (completedCount == numTasks && timeCheck) {
            System.out.println("\nSTATUS: SUCCESS! Koordinator menunggu dengan benar hingga semua tugas paralel selesai.");
        } else if (completedCount != numTasks) {
            System.out.println("\nSTATUS: FAILED! Jumlah tugas yang selesai salah. Harusnya " + numTasks + ", tapi hasilnya " + completedCount);
        } else { // !timeCheck
             System.out.println("\nSTATUS: FAILED! Waktu eksekusi terlalu lama. Apakah tugas benar-benar berjalan secara paralel?");
        }
        System.out.println("-------------------------");
    }
}