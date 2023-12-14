package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.service.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/note")
@AllArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteService.getNoteById(id);
        return note.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Note>> getAllNotesForUser(@PathVariable Long userId) {
        List<Note> userNotes = noteService.getAllNotesForUser(userId);
        return ResponseEntity.status(200).body(userNotes);
    }

    @GetMapping("/content/{content}")
    public ResponseEntity<List<Note>> getNotesByContent(@PathVariable String content) {
        List<Note> notes = noteService.getNotesByContent(content);
        return ResponseEntity.status(200).body(notes);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Note> updateNoteStatus(
            @PathVariable Long id,
            @RequestParam("status") String status
    ) {
        Optional<Note> optionalNote = noteService.getNoteById(id);

        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setStatus(status);
            Note updatedNote = noteService.updateNoteStatus(note);
            return ResponseEntity.ok(updatedNote);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/color/{id}")
    public ResponseEntity<Note> updateNoteColor(
            @PathVariable Long id,
            @RequestParam("color") String color
    ) {
        Optional<Note> optionalNote = noteService.getNoteById(id);
        System.out.println(color);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setColor(color);
            Note updatedColor = noteService.updateNoteColor(note);
            return ResponseEntity.ok(updatedColor);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/content/{id}")
    public ResponseEntity<Note> updateNoteContent(
            @PathVariable Long id,
            @RequestParam("content") String content
    ) {
        Optional<Note> optionalNote = noteService.getNoteById(id);

        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setContent(content);
            Note updatedNote = noteService.updateNoteContent(note);
            return ResponseEntity.ok(updatedNote);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNote(id, note);
        if (updatedNote != null) {
            return ResponseEntity.ok(updatedNote);
        }
        return ResponseEntity.notFound().build();
    }

}
