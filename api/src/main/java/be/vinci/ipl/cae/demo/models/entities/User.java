package be.vinci.ipl.cae.demo.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User entity.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Civility civility;

  @Column(nullable = false)
  private String pseudo;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  /**
   * Role of the user.
   */
  public enum Civility {
    MISTER, MADAM, OTHER;
  }

}


