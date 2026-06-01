import java.util.ArrayList;
import java.util.List;

class Consumer implements Runnable {
    private final DataBuffer dataBuffer;
    private final int packetCount;
    public final List<String> consumedPackets = new ArrayList<>();

    public Consumer(DataBuffer dataBuffer, int packetCount) {
        this.dataBuffer = dataBuffer;
        this.packetCount = packetCount;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < packetCount; i++) {
                String packet = dataBuffer.get();
                consumedPackets.add(packet);
                Thread.sleep(100); // Simulasi pemrosesan
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}