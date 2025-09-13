package be.vinci.ipl.cae.demo.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthenticatedUser DTO.
 */
@Data
@NoArgsConstructor
public class AuthenticatedUser {
  private String email;
  private String token;
}
