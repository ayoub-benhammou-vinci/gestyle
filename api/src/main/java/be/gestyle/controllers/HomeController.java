package be.gestyle.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

  @GetMapping("/login")
  public String login() {
    return "Page de connexion";
  }

  @GetMapping("/register")
  public String inscription() {
    return "Page d'inscription";
  }
}
