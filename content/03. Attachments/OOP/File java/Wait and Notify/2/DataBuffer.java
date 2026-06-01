import java.util.LinkedList;
import java.util.Queue;

public class DataBuffer {
    private final Queue<String> buffer = new LinkedList<>();
    private final int capacity;

    public DataBuffer(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void put(String packet) throws InterruptedException {
        while (buffer.size() == capacity) {
            System.out.println("Buffer penuh. Producer menunggu...");
            // TODO: Buat producer menunggu sampai ada ruang di buffer.
            
        }
        buffer.add(packet);
        System.out.println("Produced: " + packet);
        // TODO: Beri tahu consumer bahwa paket baru tersedia.
        
    }

    public synchronized String get() throws InterruptedException {
        while (buffer.isEmpty()) {
            System.out.println("Buffer kosong. Consumer menunggu...");
            // TODO: Buat consumer menunggu sampai ada paket di buffer.

        }
        String packet = buffer.poll();
        System.out.println("Consumed: " + packet);
        // TODO: Beri tahu producer bahwa sekarang ada ruang di buffer.
        
        return packet;
    }
}