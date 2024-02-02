package com.web.mindtrackproject.service.facade;

import com.web.mindtrackproject.entity.TrackListItem;
import com.web.mindtrackproject.service.TrackListItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrackingListItemFacade {
    private final TrackListItemService trackListItemService;

    public TrackListItem createTrackListItem(TrackListItem trackListItem) {
        return trackListItemService.createTrackListItem(trackListItem);
    }

    public void deleteTrackListItem(Long id) {
        trackListItemService.deleteTrackListItem(id);
    }

    public TrackListItem updateTrackListItem(Long id, TrackListItem trackListItem) {
        return trackListItemService.updateTrackListItem(id, trackListItem);
    }
    public TrackListItem updateTrackListItemStatus(TrackListItem trackListItem) {
        return trackListItemService.updateTrackListItemStatus(trackListItem);
    }

    public TrackListItem updateTrackListItemStatusCheckbox(TrackListItem trackListItem) {
        return trackListItemService.updateTrackListItemStatusCheckbox(trackListItem);
    }

    public TrackListItem updateTrackListItemContent(TrackListItem trackListItem) {
        return trackListItemService.updateTrackListItemContent(trackListItem);
    }

    public Optional<TrackListItem> getTrackListItemById(Long id) {
        return trackListItemService.getTrackListItemById(id);
    }

    public List<TrackListItem> getAllTrackListItemForUser(Long userId) {
        return trackListItemService.getAllTrackListItemForUser(userId);
    }
}
