import java.util.Objects;

public class Personne {
  private String civilite;
  private String nom;
  private String prenom;
  private int age;

  public Personne(String nom, String prenom) {
    this.nom = nom;
    this.prenom = prenom;
  }

  public String getCivilite() {
    return civilite;
  }

  public String getNom() {
    return nom;
  }

  public String getPrenom() {
    return prenom;
  }

  public int getAge() {
    return age;
  }

  public void setCivilite(String civilite) {
    this.civilite = civilite;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }

  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Personne personne = (Personne) o;
    return Objects.equals(nom, personne.nom) && Objects.equals(prenom,
        personne.prenom);
  }

  @Override
  public int hashCode() {
    return Objects.hash(nom, prenom);
  }

  private 
}
