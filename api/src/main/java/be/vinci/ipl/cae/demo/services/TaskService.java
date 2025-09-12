package be.vinci.ipl.cae.demo.services;

import be.vinci.ipl.cae.demo.models.dtos.NewTask;
import be.vinci.ipl.cae.demo.models.entities.Task;
import be.vinci.ipl.cae.demo.repositories.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public Task createTask(NewTask t) {
    Task task = new Task();
    task.setTitle(t.getTitle());
    task.setContent(t.getContent());
    return taskRepository.save(task);
  }
}
