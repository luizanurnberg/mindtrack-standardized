package com.web.mindtrackproject.service;

import com.web.mindtrackproject.entity.Label;
import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.repository.LabelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LabelService {
    private final LabelRepository labelRepository;

    public Label createLabel(Label label) {
        return labelRepository.save(label);
    }

    public void deleteLabel(Long id) {
        labelRepository.deleteById(id);
    }

    public Label updateLabel(Long id, Label label) {
        if (labelRepository.existsById(id)) {
            return labelRepository.save(label);
        }
        return null;
    }

    public Label updateLabelStatus(Label label) {
        if (labelRepository.existsById(label.getId())) {
            return labelRepository.save(label);
        }
        return null;
    }

    public Label updateLabelName(Label label) {
        if (labelRepository.existsById(label.getId())) {
            return labelRepository.save(label);
        }
        return null;
    }

    public Optional<Label> getLabelById(Long id) {
        return labelRepository.findById(id);
    }


    public List<Label> getAllLabelsForUser(Long userId) {
        return labelRepository.getUserLabels(userId);
    }
}
