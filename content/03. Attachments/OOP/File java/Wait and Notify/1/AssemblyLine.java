/**
 * Mengoordinasikan seluruh proses perakitan.
 * Kelas ini bertanggung jawab untuk memastikan setiap stasiun bekerja sesuai urutan.
 */
public class AssemblyLine {
    private final Gadget gadget;
    private final int totalStations;
    private int currentStage = 0;

    public AssemblyLine(int totalStations) {
        this.gadget = new Gadget();
        this.totalStations = totalStations;
    }

    /**
     * TODO: Implementasikan method ini untuk menjadi thread-safe.
     * Method ini harus memastikan bahwa stasiun kerja dengan 'stationId' hanya berjalan
     * jika 'currentStage' sesuai. Jika belum gilirannya, thread harus 'wait()'.
     * Setelah selesai bekerja, 'currentStage' harus dinaikkan dan thread lain
     * harus diberi tahu ('notifyAll()') bahwa ada perubahan keadaan.
     * @param stationId ID stasiun kerja yang mencoba untuk memproses.
     * @throws InterruptedException jika thread diinterupsi.
     */
    public synchronized void processWork(int stationId) throws InterruptedException {
        // TODO: Buat loop 'while' untuk memeriksa apakah ini giliran stasiun yang benar.
        // Jika bukan, panggil wait().
        

        // Jika sudah gilirannya, stasiun akan "bekerja".
        System.out.println("--> Station " + stationId + " is processing the gadget.");
        gadget.incrementStage();
        this.currentStage++; // Maju ke tahap selanjutnya.

        // TODO: Beri tahu semua thread yang menunggu bahwa keadaan telah berubah.
        
    }

    /**
     * Memulai proses perakitan dengan membuat dan menjalankan thread untuk setiap stasiun.
     */
    public void startAssembly() {
        for (int i = 1; i <= totalStations; i++) {
            Workstation station = new Workstation(i, this);
            new Thread(station).start();
        }
    }

    public Gadget getAssembledGadget() {
        return gadget;
    }

    public int getTotalStations() {
        return totalStations;
    }
}