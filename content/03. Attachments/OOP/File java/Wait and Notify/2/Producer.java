class Producer implements Runnable {
    private final DataBuffer dataBuffer;
    private final int packetCount;

    public Producer(DataBuffer dataBuffer, int packetCount) {
        this.dataBuffer = dataBuffer;
        this.packetCount = packetCount;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < packetCount; i++) {
                dataBuffer.put("Packet-" + i);
                Thread.sleep(50); // Simulasi kerja
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}