package com.web.mindtrackproject.entity;

import com.web.mindtrackproject.service.asbtractFactory.Color;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_note", nullable = false)
    private Long id;

    @Column(name = "color_note", nullable = false)
    private String color;

    @Column(name = "content_note", nullable = false)
    private String content;

    @Column(name = "date_note", nullable = false)
    private Date date;

    @Column(name = "status_note", nullable = false)
    private String status;

    @Column(name = "fk_id_user")
    private Long userId;

    public void setColorCode(String colorCode) {
        this.color = colorCode;
    }

}

