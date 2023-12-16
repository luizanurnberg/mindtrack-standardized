package com.web.mindtrackproject.service;

import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.repository.NoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.web.mindtrackproject.command.DeleteNoteCommand;
import com.web.mindtrackproject.command.CommandInvoker;
import com.web.mindtrackproject.service.observer.Subject;
import com.web.mindtrackproject.service.observer.observer;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NoteService implements Subject{
    private final NoteRepository noteRepository;
    private final CommandInvoker commandInvoker;
    private List<Observer> observers = new ArrayList<>();


    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public void deleteNoteWithConfirmation(Long id) {
        commandInvoker.addToQueue(new DeleteNoteCommand(this, id));
    }
    public void deleteNoteInternal(Long id) {
        noteRepository.deleteById(id);
    }

    public Note updateNote(Long id, Note note) {
        if (noteRepository.existsById(id)) {
            return noteRepository.save(note);
        }
        return null;
    }

    public Note updateNoteStatus(Note note) {
        if (noteRepository.existsById(note.getId())) {
            return noteRepository.save(note);
        }
        return null;
    }

    public Note updateNoteColor(Note note) {
        if (noteRepository.existsById(note.getId())) {
            return noteRepository.save(note);
        }
        return null;
    }

    public Note updateNoteContent(Note note) {
        if (noteRepository.existsById(note.getId())) {
            return noteRepository.save(note);
        }
        return null;
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }


    public List<Note> getAllNotesForUser(Long userId) {
        return noteRepository.getUserNotes(userId);
    }

    public List<Note> getNotesByContent(String content) {
        return noteRepository.getNotesByContent(content);
    }

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }


}
