package com.web.mindtrackproject.service;

import com.web.mindtrackproject.entity.Label;
import com.web.mindtrackproject.repository.LabelRepository;
import com.web.mindtrackproject.service.observer.LabelObserver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LabelService implements LabelObserver {
    private final LabelRepository labelRepository;
    private final List<LabelObserver> labelObservers = new ArrayList<>();

    public void registerObserver(LabelObserver observer) {
        labelObservers.add(observer);
    }

    public void unregisterObserver(LabelObserver observer) {
        labelObservers.remove(observer);
    }
    @Override
    public Label createLabel(Label label) {
        Label createdLabel = labelRepository.save(label);
        notifyObserversForCreate(label);
        return createdLabel;
    }

    public void deleteLabel(Long id) {
        labelRepository.deleteById(id);
    }

    public Label updateLabel(Long id, Label label) {
        if (labelRepository.existsById(id)) {
            Label updatedLabel = labelRepository.save(label);
            return updatedLabel;
        }
        return null;
    }
    @Override
    public Label updateLabelStatus(Label label) {
        if (labelRepository.existsById(label.getId())) {
            Label updatedLabel = labelRepository.save(label);
            notifyObserversForStatusUpdate(label);
            return updatedLabel;
        }
        return null;
    }
    @Override
    public Label updateLabelName(Label label) {
        if (labelRepository.existsById(label.getId())) {
            labelRepository.save(label);
            notifyObserversForNameUpdate(label);
        }
        return label;
    }

    private void notifyObserversForStatusUpdate(Label label) {
        for (LabelObserver observer : labelObservers) {
            observer.updateLabelStatus(label);
        }
    }

    private void notifyObserversForNameUpdate(Label label) {
        for (LabelObserver observer : labelObservers) {
            observer.updateLabelName(label);
        }
    }

    private void notifyObserversForCreate(Label label) {
        for (LabelObserver observer : labelObservers) {
            observer.createLabel(label);
        }
    }

    public Optional<Label> getLabelById(Long id) {
        return labelRepository.findById(id);
    }


    public List<Label> getAllLabelsForUser(Long userId) {
        return labelRepository.getUserLabels(userId);
    }

}
