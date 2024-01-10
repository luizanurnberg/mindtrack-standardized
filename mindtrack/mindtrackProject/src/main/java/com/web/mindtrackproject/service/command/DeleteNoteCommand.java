package com.web.mindtrackproject.service.command;

import com.web.mindtrackproject.service.NoteService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DeleteNoteCommand implements Command {
    private NoteService noteService;
    private Long noteId;

    @Override
    public void execute() {
        noteService.deleteNoteInternal(noteId);
    }
}
