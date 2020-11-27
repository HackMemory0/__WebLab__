package ru.ifmo.web.SpringWeb.controller;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.FieldError;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.bind.MethodArgumentNotValidException;

import ru.ifmo.web.SpringWeb.model.User;
import ru.ifmo.web.SpringWeb.security.jwt.JwtProvider;
import ru.ifmo.web.SpringWeb.service.UserService;
import ru.ifmo.web.SpringWeb.payload.request.*;
import ru.ifmo.web.SpringWeb.payload.response.*;

@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    public UserController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.findUserByUsernameAndPassword(request.getUsername(), request.getPassword());
        if(user != null){
            String token = jwtProvider.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("Incorrect username or password"));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());

        if(userService.saveUser(user)){
            String token = jwtProvider.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("User already exists"));
    }


    @RequestMapping(value = "/current", method = RequestMethod.GET)
    public ResponseEntity<?> current(Authentication authentication){
        return ResponseEntity.ok((User) authentication.getPrincipal());
    }



    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MethodArgumentNotValidException exception) {
        Map<String, String> errorMsg = exception.getFieldErrors().
                stream().
                collect(
                        Collectors.toMap(
                                FieldError::getField,
                                DefaultMessageSourceResolvable::getDefaultMessage,
                                (a1, a2) -> a1
                        ));

        return ErrorResponse.builder().error(errorMsg).build();
    }


}
