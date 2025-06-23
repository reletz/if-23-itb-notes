import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Scanner;

public class ReflectionCalculator {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);

        // Input case
        int tc = sc.nextInt();

        // Input 2 buah angka (a dan b)
        int a = sc.nextInt(), b = sc.nextInt();
        sc.close();

        // Reflection
        Calculator c = new Calculator();
        Integer res = 0;
        Double resd = 0.0;

        switch (tc) {
            case 1:
                Method m1 = c.getClass().getDeclaredMethod("add", int.class, int.class);
                m1.setAccessible(true);
                res = (Integer) m1.invoke(c, a, b);
                // a + b
                
                break;
            case 2:
                Method m2 = c.getClass().getDeclaredMethod("subtract", int.class, int.class);
                m2.setAccessible(true);
                res = (Integer) m2.invoke(c, a, b);
                // a - b
                
                break;
            case 3:
                Method m3 = c.getClass().getDeclaredMethod("multiply", int.class, int.class);
                m3.setAccessible(true);
                res = (Integer) m3.invoke(c, a, b);
                // a * b
                
                break;
            case 4:
                // a / b dengan precision 2 (default)
                Method m4 = c.getClass().getDeclaredMethod("divide", int.class, int.class);
                m4.setAccessible(true);
                resd = (Double) m4.invoke(c, a, b);
               
                break;
            case 5:
                Field f = c.getClass().getDeclaredField("precision");
                f.setAccessible(true);
                f.set(c, 3);
                Method m5 = c.getClass().getDeclaredMethod("divide", int.class, int.class);
                m5.setAccessible(true);
                resd = (Double) m5.invoke(c, a, b);
                // a / b dengan precision 3
                
                break;
            default:
                break;
        }
    }
}
