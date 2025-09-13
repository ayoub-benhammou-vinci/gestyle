package be.vinci.ipl.cae.demo.models.dtos;

import be.vinci.ipl.cae.demo.models.entities.User.Civility;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NewUser DTO.
 */
@Data
@NoArgsConstructor
public class NewUser {
  private Civility civility;
  private String pseudo;
  private String email;
  private String password;
}
