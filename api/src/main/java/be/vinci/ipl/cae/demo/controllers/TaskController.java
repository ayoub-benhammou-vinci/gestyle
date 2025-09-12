package be.vinci.ipl.cae.demo.controllers;

import be.vinci.ipl.cae.demo.models.dtos.NewTask;
import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
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
  @PostMapping("/")
  public Task createTask(NewTask t) {
    if (!isValidTask(t)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid task");
    }
    return taskService.createTask(t);
  }
}
