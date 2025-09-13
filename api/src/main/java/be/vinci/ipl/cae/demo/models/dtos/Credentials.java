package be.vinci.ipl.cae.demo.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Credentials DTO.
 */
@NoArgsConstructor
@Data
public class Credentials {
  private String email;
  private String password;
}
