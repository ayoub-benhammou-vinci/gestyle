package be.vinci.ipl.cae.demo.models.dtos;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewUser {
  private String sexe;
  private String pseudo;
  private String email;
  private String password;
}
