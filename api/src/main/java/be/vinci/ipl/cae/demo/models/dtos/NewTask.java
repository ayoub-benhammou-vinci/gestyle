package be.vinci.ipl.cae.demo.models.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NewTask DTO.
 */
@Data
@NoArgsConstructor
public class NewTask {
  private String title;
  private String content;
}
