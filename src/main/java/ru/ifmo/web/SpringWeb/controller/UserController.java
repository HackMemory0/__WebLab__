package ru.ifmo.web.SpringWeb.controller;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.web.SpringWeb.model.User;
import ru.ifmo.web.SpringWeb.payload.AuthResponse;
import ru.ifmo.web.SpringWeb.payload.ErrorResponse;
import ru.ifmo.web.SpringWeb.security.jwt.JwtProvider;
import ru.ifmo.web.SpringWeb.service.UserService;

import javax.validation.Valid;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> login(@RequestBody User request) {
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
    public ResponseEntity<?> register(@Valid @RequestBody User request){
        if(userService.saveUser(request)){
            String token = jwtProvider.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("User already exists"));

    }



    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MethodArgumentNotValidException exception) {

//        String errorMsg = exception.getBindingResult().getFieldErrors().stream()
//                .map(DefaultMessageSourceResolvable::getDefaultMessage)
//                .findFirst()
//                .orElse(exception.getMessage());


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
