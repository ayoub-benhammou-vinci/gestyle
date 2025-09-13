package be.vinci.ipl.cae.demo.controllers;

import be.vinci.ipl.cae.demo.models.dtos.NewTask;
import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.models.entities.User;
import be.vinci.ipl.cae.demo.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Controller for managing tasks.
 */
@RestController
@RequestMapping("/tasks")
public class TaskController {

  /**
   * The injected TaskService.
   */
  private final TaskService taskService;

  /**
   * Constructor for TaskController.
   *
   * @param taskService the injected TaskService.
   */
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  /**
   * Validates a NewTask object.
   *
   * @param t the NewTask object to validate.
   * @return true if the NewTask object is valid, false otherwise.
   */
  private boolean isValidTask(NewTask t) {
    return t != null && t.getTitle() != null && !t.getTitle().isBlank()
        && t.getContent() != null && !t.getContent().isBlank();
  }

  /**
   * Creates a new task for the authenticated user.
   *
   * @param t                 the NewTask object containing task details.
   * @param authenticatedUser the authenticated user.
   * @return the created Task object.
   */
  @PostMapping({"", "/"})
  public Task createTask(@RequestBody NewTask t, @AuthenticationPrincipal User authenticatedUser) {
    if (!isValidTask(t) || authenticatedUser == null || authenticatedUser.getEmail() == null
        || authenticatedUser.getEmail().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid task");
    }
    return taskService.createTask(t, authenticatedUser.getEmail());
  }

  /**
   * Retrieves all tasks for the authenticated user.
   *
   * @param authenticatedUser the authenticated user.
   * @return an array of Task objects.
   */
  @GetMapping({"", "/"})
  public Task[] getAllTasks(@AuthenticationPrincipal User authenticatedUser) {
    if (authenticatedUser == null || authenticatedUser.getEmail() == null
        || authenticatedUser.getEmail().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
    }
    return taskService.getAllTasks(authenticatedUser.getEmail());
  }

}
