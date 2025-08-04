package be.vinci.ipl.cae.demo.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NewUser DTO.
 */
@Data
@NoArgsConstructor
public class NewUser {

  private String username;
  private String token;
}
