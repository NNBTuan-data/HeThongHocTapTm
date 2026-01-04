package Nhom2Cum1.SmLearning.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_logs")
@Data
public class LearningLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @Column(name = "time_spent_minutes")
    private Integer timeSpentMinutes;

    private String action;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
