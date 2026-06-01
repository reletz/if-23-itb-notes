import java.util.ArrayList;

// Silahkan gunakan instanceof untuk mengecek kelas dari sebuah objek

public class Crafting {
    private ArrayList<Material> materials;
    private int countStick;
    private int countIron;

    /**
     * Default constructor untuk crafting
     * Inisiasi countStick dan countIron menjadi 0
     * Inisiasi materials menjadi ArrayList baru
     */
    public Crafting() {

    }

    /**
     * Menambahkan material ke dalam list materials
     * @param m
     * Cek apakah material yang ditambahkan adalah Stick atau Iron, tambahkan countStick atau countIron
     */
    public void addMaterial(Material m) {

    }

    /**
     * Menghapus stick dari list of materials sebanyak count dan memperbarui countStick. Panggil method use() dari material ketika material dihilangkan. Return void apabila countStick kurang dari count, print "Stick hanya ada x buah"
     * @param count
     */
    public void removeStick(int count) {

    }

    /**
     * Menghapus Iron dari list of materials sebanyak count dan memperbarui countIron. Panggil method use() dari material ketika material dihilangkan. Return void apabila countIron kurang dari count, print "Iron hanya ada x buah"
     * @param count
     */
    public void removeIron(int count) {

    }

    /**
     * Membuat sebuah Sword dengan jumlah stick, iron sesuai parameter. Sword akan memiliki damage sebesar argumen damage. Apabila material tidak cukup, lempar exception dengan pesan "Material tidak cukup". Remove Iron terlebih dahulu sebelum remove Stick
     * @param stick
     * @param iron
     * @param damage
     * @return
     * @throws IllegalStateException
     */
    public Sword craftSword(int stick, int iron, int damage) throws IllegalStateException {

    }

    /**
     * Membuat sebuah Axe dengan jumlah stick, iron sesuai parameter. Axe akan memiliki damage sebesar argumen damage. Apabila material tidak cukup, lempar exception dengan pesan "Material tidak cukup". Remove Iron terlebih dahulu sebelum remove Stick
     * @param stick
     * @param iron
     * @param damage
     * @return
     * @throws IllegalStateException
     */
    public Axe craftAxe(int stick, int iron, int damage) throws IllegalStateException {

    }

    /**
     * Membuat sebuah Hoe dengan jumlah stick, iron sesuai parameter. Hoe akan memiliki durability sebesar argumen durability. Apabila material tidak cukup, lempar exception dengan pesan "Material tidak cukup". Remove Iron terlebih dahulu sebelum remove Stick
     * @param stick
     * @param iron
     * @param durability
     * @return
     * @throws IllegalStateException
     */
    public Hoe craftHoe(int stick, int iron, int durability) throws IllegalStateException {

    }
}
