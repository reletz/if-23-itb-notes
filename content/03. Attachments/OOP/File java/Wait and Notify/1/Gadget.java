/**
 * Merepresentasikan sebuah gadget yang sedang dirakit.
 * Menyimpan informasi mengenai tahap perakitan saat ini.
 */
public class Gadget {
    private int currentStage = 0;

    /**
     * Menaikkan tahap perakitan gadget.
     */
    public void incrementStage() {
        this.currentStage++;
        System.out.println("Gadget has completed assembly stage " + this.currentStage);
    }

    /**
     * Mengambil tahap perakitan saat ini.
     * @return nomor tahap saat ini.
     */
    public int getCurrentStage() {
        return this.currentStage;
    }
}