/**
 * Merepresentasikan sebuah stasiun kerja di lini perakitan.
 * Kelas ini mengimplementasikan Runnable untuk dijalankan sebagai thread. 
 */
class Workstation implements Runnable {
    private final int stationId;
    private final AssemblyLine controller;

    public Workstation(int stationId, AssemblyLine controller) {
        this.stationId = stationId;
        this.controller = controller;
    }

    @Override
    public void run() {
        try {
            // TODO: Panggil method pada 'controller' untuk memproses pekerjaan
            // secara sinkron. Thread ini akan menunggu jika belum gilirannya.
            System.out.println("Station " + stationId + " is ready and waiting for its turn...");
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Station " + stationId + " was interrupted.");
        }
    }
}