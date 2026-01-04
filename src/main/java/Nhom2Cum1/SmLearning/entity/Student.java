package Nhom2Cum1.SmLearning.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "student_code")
    private String studentCode;

    private String major;

    @Column(name = "year_of_study")
    private Integer yearOfStudy;
}
