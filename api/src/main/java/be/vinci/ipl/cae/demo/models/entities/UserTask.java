package be.vinci.ipl.cae.demo.models.entities;

import be.vinci.ipl.cae.demo.models.id.UserTaskId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_tasks")
@Data
@NoArgsConstructor
public class UserTask {

  @EmbeddedId
  private UserTaskId userTaskId;

  @MapsId("user")
  @JoinColumn(name = "user", nullable = false)
  @ManyToOne
  private User user;

  @MapsId("task")
  @JoinColumn(name = "task", nullable = false)
  @ManyToOne
  private Task task;
}
