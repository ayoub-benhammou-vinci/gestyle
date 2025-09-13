package be.vinci.ipl.cae.demo.services;

import be.vinci.ipl.cae.demo.models.dtos.NewTask;
import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.models.entities.User;
import be.vinci.ipl.cae.demo.repositories.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final UserService userService;

  public TaskService(TaskRepository taskRepository, UserService userService) {
    this.taskRepository = taskRepository;
    this.userService = userService;
  }

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

  public Task[] getAllTasks(String email) {
    User userConnected = userService.readOneFromEmail(email);
    if (userConnected == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }
    return taskRepository.findAllByUser(userConnected);
  }
}
