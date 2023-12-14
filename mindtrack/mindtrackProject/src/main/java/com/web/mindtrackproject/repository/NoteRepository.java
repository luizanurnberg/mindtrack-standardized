package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("SELECT n FROM Note n WHERE n.userId = :userId")
    List<Note> getUserNotes(@Param("userId") Long userId);

    @Query("SELECT n FROM Note n WHERE n.content = :content")
    List<Note> getNotesByContent(@Param("content") String content);
}
