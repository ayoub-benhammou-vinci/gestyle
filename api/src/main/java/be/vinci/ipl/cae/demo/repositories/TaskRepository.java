package be.vinci.ipl.cae.demo.repositories;

import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.models.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Task entity.
 */
@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

  /**
   * Finds all tasks by user.
   *
   * @param user the user
   * @return an array of tasks
   */
  Task[] findAllByUser(User user);
}
