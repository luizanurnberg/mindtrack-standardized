package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.entity.Label;
import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.service.LabelService;
import com.web.mindtrackproject.service.observer.LabelObserver;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/label")
@AllArgsConstructor
public class LabelController {
    private final LabelService labelService;
    LabelObserver labelObs = new LabelObserver() {
        @Override
        public Label updateLabelName(Label label) {
            return null;
        }

        @Override
        public Label updateLabelStatus(Label label) {
            return null;
        }

        @Override
        public Label createLabel(Label label) {
            return null;
        }
    };

    @PostMapping
    public ResponseEntity<Label> createLabel(@RequestBody Label label) {
        Label createdLabel = labelService.createLabel(label);
        labelService.registerObserver(labelObs);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLabel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long id) {
        labelService.deleteLabel(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Label> getLabelById(@PathVariable Long id) {
        Optional<Label> label = labelService.getLabelById(id);
        return label.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Label>> getAllLabelsForUser(@PathVariable Long userId) {
        List<Label> userNotes = labelService.getAllLabelsForUser(userId);
        return ResponseEntity.status(200).body(userNotes);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Label> updateLabelStatus(
            @PathVariable Long id,
            @RequestParam("status") String status
    ) {
        Optional<Label> optionalLabel = labelService.getLabelById(id);

        if (optionalLabel.isPresent()) {
            Label label = optionalLabel.get();
            label.setStatus(status);
            Label updatedLabel = labelService.updateLabelStatus(label);
            return ResponseEntity.ok(updatedLabel);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/name/{id}")
    public ResponseEntity<Label> updateLabelContent(
            @PathVariable Long id,
            @RequestParam("name") String name
    ) {
        Optional<Label> optionalLabel = labelService.getLabelById(id);

        if (optionalLabel.isPresent()) {
            Label label = optionalLabel.get();
            label.setName(name);
            Label updatedLabel = labelService.updateLabelName(label);
            return ResponseEntity.ok(updatedLabel);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Label> updateLabel(@PathVariable Long id, @RequestBody Label label) {
        Label updatedLabel = labelService.updateLabel(id, label);
        if (updatedLabel != null) {
            return ResponseEntity.ok(updatedLabel);
        }
        return ResponseEntity.notFound().build();
    }
}
