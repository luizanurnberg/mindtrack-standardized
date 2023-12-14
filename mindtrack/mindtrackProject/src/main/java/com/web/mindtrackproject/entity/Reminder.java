package com.web.mindtrackproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_reminder")
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reminder", nullable = false)
    private Long id;

    @Column(name = "date_reminder", nullable = false)
    private LocalDate date;

    @Column(name = "content_reminder", nullable = false)
    private String content;

    @Column(name = "status_reminder", nullable = false)
    private String status;

    @Column(name = "fk_id_user")
    private Long userId;
}
