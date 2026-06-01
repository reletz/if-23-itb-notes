public class Main {
  public static void main(String[] args) {
      Crafting c5 = new Crafting();
      c5.addMaterial(new Stick());
      c5.addMaterial(new Stick());
      c5.addMaterial(new Iron());
      c5.addMaterial(new Iron());
      c5.addMaterial(new Iron());
      try {
      Axe a2 = c5.craftAxe(2, 1, 2);
      a2.attack();
      } catch (Exception e) {
      System.out.println(e.getMessage());
      }
      try {
      Sword s2 = c5.craftSword(2, 1, 5);
      s2.attack();
      } catch (Exception e) {
      System.out.println(e.getMessage());
      }
      c5.removeIron(1);
  }  
}
