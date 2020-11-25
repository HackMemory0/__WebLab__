package ru.ifmo.web.SpringWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.web.SpringWeb.model.User;
import ru.ifmo.web.SpringWeb.payload.AuthResponse;
import ru.ifmo.web.SpringWeb.payload.ErrorResponse;
import ru.ifmo.web.SpringWeb.payload.MessageResponse;
import ru.ifmo.web.SpringWeb.security.JwtProvider;
import ru.ifmo.web.SpringWeb.service.UserService;

@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    public UserController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @RequestMapping("/login")
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

}
