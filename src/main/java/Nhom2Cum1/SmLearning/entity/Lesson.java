package Nhom2Cum1.SmLearning.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lessons")
@Data
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "lesson_title")
    private String lessonTitle;

    private String content;

    @Column(name = "order_index")
    private Integer orderIndex;
}
