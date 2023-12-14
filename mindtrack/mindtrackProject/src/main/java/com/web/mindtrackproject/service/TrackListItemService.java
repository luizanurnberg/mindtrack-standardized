package com.web.mindtrackproject.service;

import com.web.mindtrackproject.entity.Reminder;
import com.web.mindtrackproject.entity.TrackListItem;
import com.web.mindtrackproject.repository.ReminderRepository;
import com.web.mindtrackproject.repository.TrackListItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrackListItemService {
    private final TrackListItemRepository trackListItemRepository;

    public TrackListItem createTrackListItem(TrackListItem trackListItem) {
        return trackListItemRepository.save(trackListItem);
    }

    public void deleteTrackListItem(Long id) {
        trackListItemRepository.deleteById(id);
    }

    public TrackListItem updateTrackListItem(Long id, TrackListItem trackListItem) {
        if (trackListItemRepository.existsById(id)) {
            return trackListItemRepository.save(trackListItem);
        }
        return null;
    }

    public TrackListItem updateTrackListItemStatus(TrackListItem trackListItem) {
        if (trackListItemRepository.existsById(trackListItem.getId())) {
            return trackListItemRepository.save(trackListItem);
        }
        return null;
    }

    public TrackListItem updateTrackListItemStatusCheckbox(TrackListItem trackListItem) {
        if (trackListItemRepository.existsById(trackListItem.getId())) {
            return trackListItemRepository.save(trackListItem);
        }
        return null;
    }

    public TrackListItem updateTrackListItemContent(TrackListItem trackListItem) {
        if (trackListItemRepository.existsById(trackListItem.getId())) {
            return trackListItemRepository.save(trackListItem);
        }
        return null;
    }

    public Optional<TrackListItem> getTrackListItemById(Long id) {
        return trackListItemRepository.findById(id);
    }

    public List<TrackListItem> getAllTrackListItemForUser(Long userId) {
        return trackListItemRepository.getUserTrackListItem(userId);
    }
}
