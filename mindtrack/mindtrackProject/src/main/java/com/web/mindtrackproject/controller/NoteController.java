package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.service.asbtractFactory.Color;
import com.web.mindtrackproject.service.command.CommandInvoker;
import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.service.NoteService;
import com.web.mindtrackproject.service.asbtractFactory.ColorFactory;
import com.web.mindtrackproject.service.asbtractFactory.ColorFactoryService;
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
    private final CommandInvoker commandInvoker;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNoteWithConfirmation(id);
        commandInvoker.executeCommands();
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

    private final ColorFactoryService colorFactoryService;
    @PutMapping("/color/{id}")
    public ResponseEntity<Note> updateNoteColor(
            @PathVariable Long id,
            @RequestParam("color") String colorFactory
    ) {
        ColorFactory factory = colorFactoryService.createColorFactory(colorFactory);

        if (factory != null) {
            Optional<Note> optionalNote = noteService.getNoteById(id);

            if (optionalNote.isPresent()) {
                Note note = optionalNote.get();
                Color color = factory.createColor();
                note.setColor(color.getColorCode());
                Note updatedColor = noteService.updateNoteColor(note, factory);
                return ResponseEntity.ok(updatedColor);
            }
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