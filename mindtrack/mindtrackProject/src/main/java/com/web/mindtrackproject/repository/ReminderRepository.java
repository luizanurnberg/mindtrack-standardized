package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    @Query("SELECT n FROM Reminder n WHERE n.userId = :userId")
    List<Reminder> getUserReminders(@Param("userId") Long userId);

    @Query("SELECT n FROM Reminder n WHERE n.date = :date")
    List<Reminder> getRemindersByDate(@Param("date") LocalDate date);
}
