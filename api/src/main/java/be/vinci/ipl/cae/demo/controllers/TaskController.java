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

@RestController
@RequestMapping("/tasks")
public class TaskController {

  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  private boolean isValidTask(NewTask t) {
    return t != null && t.getTitle() != null && !t.getTitle().isBlank()
        && t.getContent() != null && !t.getContent().isBlank();
  }

  @PostMapping({"", "/"})
  public Task createTask(@RequestBody NewTask t, @AuthenticationPrincipal User authenticatedUser) {
    if (!isValidTask(t) || authenticatedUser == null || authenticatedUser.getEmail() == null
        || authenticatedUser.getEmail().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid task");
    }
    return taskService.createTask(t, authenticatedUser.getEmail());
  }

  @GetMapping({"", "/"})
  public Task[] getAllTasks(@AuthenticationPrincipal User authenticatedUser) {
    if (authenticatedUser == null || authenticatedUser.getEmail() == null
        || authenticatedUser.getEmail().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
    }
    return taskService.getAllTasks(authenticatedUser.getEmail());
  }

}
