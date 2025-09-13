package be.vinci.ipl.cae.demo.controllers;

import be.vinci.ipl.cae.demo.models.dtos.AuthenticatedUser;
import be.vinci.ipl.cae.demo.models.dtos.Credentials;
import be.vinci.ipl.cae.demo.models.dtos.NewUser;
import be.vinci.ipl.cae.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * AuthController to handle user authentication.
 */
@RestController
@RequestMapping("/auths")
public class AuthController {

  /**
   * The injected UserService.
   */
  private final UserService userService;

  /**
   * Constructor for AuthController.
   *
   * @param userService the injected UserService.
   */
  public AuthController(UserService userService) {
    this.userService = userService;
  }

  private boolean isValidEmailAndPassword(String email, String password) {
    return email != null && !email.isBlank()
        && password != null && !password.isBlank();
  }

  private boolean isValidRegisterCredentials(NewUser credentials) {
    return credentials != null
        && isValidEmailAndPassword(credentials.getEmail(), credentials.getPassword())
        && credentials.getPseudo() != null && !credentials.getPseudo().isBlank()
        && credentials.getCivility() != null && !credentials.getCivility().toString().isBlank();
  }

  private boolean isValidLoginCredentials(Credentials credentials) {
    return credentials != null
        && isValidEmailAndPassword(credentials.getEmail(), credentials.getPassword());
  }
  /**
   * Register a new user.
   *
   * @param credentials the credentials of the new user.
   */
  @PostMapping("/register")
  public void register(@RequestBody NewUser credentials) {
    if (!isValidRegisterCredentials(credentials)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid registration credentials");
    }
    userService.register(credentials);
  }

  /**
   * Login a user.
   *
   * @param credentials the credentials of the user.
   * @return the authenticated user.
   */
  @PostMapping("/login")
  public AuthenticatedUser login(@RequestBody Credentials credentials) {
    if (!isValidLoginCredentials(credentials)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid login credentials");
    }
    return userService.login(credentials.getEmail(), credentials.getPassword());
  }

}
