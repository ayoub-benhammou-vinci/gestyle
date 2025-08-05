package be.vinci.ipl.cae.demo.services;

import be.vinci.ipl.cae.demo.models.dtos.AuthenticatedUser;
import be.vinci.ipl.cae.demo.models.dtos.NewUser;
import be.vinci.ipl.cae.demo.models.entities.User;
import be.vinci.ipl.cae.demo.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * User service.
 */
@Service
public class UserService {

  private int unusedVariable = 0;

  private static final String jwtSecret = "ilovemypizza!";
  private static final long lifetimeJwt = 24 * 60 * 60 * 1000; // 24 hours

  private static final Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

  private final BCryptPasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  /**
   * Constructor.
   *
   * @param passwordEncoder the password encoder
   * @param userRepository  the user repository
   */
  public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
  }

  /**
   * Create a JWT token.
   *
   * @param email to included in the claim
   * @return the JWT token
   */
  public AuthenticatedUser createJwtToken(String email) {
    String token = JWT.create()
        .withIssuer("auth0")
        .withClaim("email", email)
        .withIssuedAt(new Date())
        .withExpiresAt(new Date(System.currentTimeMillis() + lifetimeJwt))
        .sign(algorithm);

    AuthenticatedUser authenticatedUser = new AuthenticatedUser();
    authenticatedUser.setEmail(email);
    authenticatedUser.setToken(token);

    return authenticatedUser;
  }

  /**
   * Verify a JWT token.
   *
   * @param token the token to verify
   * @return the email if the token is valid, null otherwise
   */
  public String verifyJwtToken(String token) {
    try {
      return JWT.require(algorithm).build().verify(token).getClaim("email").asString();
    } catch (Exception e) {
      return null;
    }
  }

  /**
   * Login a user.
   *
   * @param email the email
   * @param password the password
   * @return the authenticated user if the login is successful, null otherwise
   */
  public AuthenticatedUser login(String email, String password) {
    //If the person want to connect with his email
    User user = userRepository.findByEmail(email);

    // If the user does not exist, we throw an exception
    // This will return a 404 Not Found error
    if (user == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The person does not exist.");
    }

    // Check if the password matches
    // If the password is not correct, we throw an exception
    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The password is incorrect.");
    }

    return createJwtToken(email);
  }

  /**
   * Register a new user.
   *
   * @param user the user to register
   * @return the authenticated user if the registration is successful, null otherwise
   */
  public void register(NewUser user) {
    if (userRepository.findByEmail(user.getEmail()) != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists.");
    }

    createOne(user);
  }

  /**
   * Read a user from its email.
   *
   * @param email the email of the user
   * @return the user if it exists, null otherwise
   */
  public User readOneFromEmail(String email) {
    return userRepository.findByEmail(email);
  }

  /**
   * Create a new user.
   *
   * @param newUser the user to create
   */
  public void createOne(NewUser newUser) {
    String hashedPassword = passwordEncoder.encode(newUser.getPassword());

    User user = new User();
    newUser.setEmail(user.getEmail());
    newUser.setPassword(hashedPassword);
    newUser.setPseudo(user.getPseudo());
    newUser.setSexe(user.getSexe());

    userRepository.save(user);
  }

}
