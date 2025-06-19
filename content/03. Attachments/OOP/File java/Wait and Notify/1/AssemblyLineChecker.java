public class AssemblyLineChecker {
    public static void main(String[] args) {
        System.out.println("--- Assembly Line Checker ---");
        int totalStations = 5;
        AssemblyLine assemblyLine = new AssemblyLine(totalStations);

        long startTime = System.currentTimeMillis();
        assemblyLine.startAssembly();

        // Beri waktu agar semua thread selesai
        try {
            Thread.sleep(3000); 
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        long endTime = System.currentTimeMillis();

        Gadget finalGadget = assemblyLine.getAssembledGadget();
        boolean success = finalGadget.getCurrentStage() == totalStations;

        System.out.println("\n--- CHECKER RESULTS ---");
        System.out.println("Assembly process finished in " + (endTime - startTime) + "ms.");
        System.out.println("Expected final stage: " + totalStations);
        System.out.println("Actual final stage: " + finalGadget.getCurrentStage());

        if (success) {
            System.out.println("STATUS: SUCCESS! Gadget dirakit dengan urutan yang benar.");
        } else {
            System.out.println("STATUS: FAILED! Urutan perakitan salah. Periksa logika wait/notify dan sinkronisasi Anda.");
        }
        System.out.println("-------------------------");
    }
}