package be.vinci.ipl.cae.demo.services;

import be.vinci.ipl.cae.demo.models.dtos.NewTask;
import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.models.entities.User;
import be.vinci.ipl.cae.demo.repositories.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Service for managing tasks.
 */
@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final UserService userService;

  /**
   * Constructor for TaskService.
   *
   * @param taskRepository the injected TaskRepository.
   * @param userService    the injected UserService.
   */
  public TaskService(TaskRepository taskRepository, UserService userService) {
    this.taskRepository = taskRepository;
    this.userService = userService;
  }

  /**
   * Creates a new task for a user identified by their email.
   *
   * @param t     the NewTask object containing task details.
   * @param email the email of the user for whom the task is to be created.
   * @return the created Task object.
   * @throws ResponseStatusException if the user is not found.
   */
  public Task createTask(NewTask t, String email) {
    User userConnected = userService.readOneFromEmail(email);
    if (userConnected == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    Task task = new Task();
    task.setTitle(t.getTitle());
    task.setContent(t.getContent());
    task.setUser(userConnected);
    return taskRepository.save(task);
  }

  /**
   * Retrieves all tasks associated with a user identified by their email.
   *
   * @param email the email of the user whose tasks are to be retrieved.
   * @return an array of Task objects associated with the user.
   * @throws ResponseStatusException if the user is not found.
   */
  public Task[] getAllTasks(String email) {
    User userConnected = userService.readOneFromEmail(email);
    if (userConnected == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }
    return taskRepository.findAllByUser(userConnected);
  }
}
