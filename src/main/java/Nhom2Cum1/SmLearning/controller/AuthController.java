package Nhom2Cum1.SmLearning.controller;

import Nhom2Cum1.SmLearning.dto.LoginRequest;
import Nhom2Cum1.SmLearning.dto.LoginResponse;
import Nhom2Cum1.SmLearning.entity.Role;
import Nhom2Cum1.SmLearning.entity.User;
import Nhom2Cum1.SmLearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(loginRequest.getEmail());
        Long profileId = userService.getProfileId(user.getId(), user.getRole());
        String token = "Basic " + Base64.getEncoder().encodeToString((loginRequest.getEmail() + ":" + loginRequest.getPassword()).getBytes());

        return ResponseEntity.ok(new LoginResponse(user.getId(), profileId, user.getFullName(), user.getEmail(), user.getRole(), token));
    }
}
