package Nhom2Cum1.SmLearning.dto;

import Nhom2Cum1.SmLearning.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private Long profileId; // Will be studentId or teacherId
    private String fullName;
    private String email;
    private Role role;
    private String token;
}
