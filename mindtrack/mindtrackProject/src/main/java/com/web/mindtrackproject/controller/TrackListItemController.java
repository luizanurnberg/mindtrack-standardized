package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.entity.Reminder;
import com.web.mindtrackproject.entity.TrackListItem;
import com.web.mindtrackproject.service.ReminderService;
import com.web.mindtrackproject.service.TrackListItemService;
import com.web.mindtrackproject.service.facade.TrackingListItemFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trackListItem")
@AllArgsConstructor
public class TrackListItemController {
    private TrackingListItemFacade trackingListItemFacade;

    @PostMapping
    public ResponseEntity<TrackListItem> createTrackListItem(@RequestBody TrackListItem trackListItem) {
        TrackListItem createdTrackListItem = trackingListItemFacade.createTrackListItem(trackListItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrackListItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrackListItem(@PathVariable Long id) {
        trackingListItemFacade.deleteTrackListItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackListItem> getTrackListItemById(@PathVariable Long id) {
        Optional<TrackListItem> trackListItem = trackingListItemFacade.getTrackListItemById(id);
        return trackListItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TrackListItem>> getAllTrackListItemForUser(@PathVariable Long userId) {
        List<TrackListItem> userTrackListItem = trackingListItemFacade.getAllTrackListItemForUser(userId);
        return ResponseEntity.status(200).body(userTrackListItem);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<TrackListItem> updateTrackListItemStatus(
            @PathVariable Long id,
            @RequestParam("status") String status
    ) {
        Optional<TrackListItem> optionalTrackListItem = trackingListItemFacade.getTrackListItemById(id);

        if (optionalTrackListItem.isPresent()) {
            TrackListItem trackListItem = optionalTrackListItem.get();
            trackListItem.setStatus(status);
            TrackListItem updatedTrackListItem = trackingListItemFacade.updateTrackListItemStatus(trackListItem);
            return ResponseEntity.ok(updatedTrackListItem);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/content/{id}")
    public ResponseEntity<TrackListItem> updateTrackListItemContent(
            @PathVariable Long id,
            @RequestParam("content") String content
    ) {
        Optional<TrackListItem> optionalTrackListItem = trackingListItemFacade.getTrackListItemById(id);

        if (optionalTrackListItem.isPresent()) {
            TrackListItem trackListItem = optionalTrackListItem.get();
            trackListItem.setContent(content);
            TrackListItem updatedTrackListItem = trackingListItemFacade.updateTrackListItemContent(trackListItem);
            return ResponseEntity.ok(updatedTrackListItem);
        }

        return ResponseEntity.notFound().build();
    }
    @PutMapping("/checkbox/{id}")
    public ResponseEntity<TrackListItem> updateTrackListItemCheckbox(
            @PathVariable Long id,
            @RequestParam("checkbox") Boolean checkbox
    ) {
        Optional<TrackListItem> optionalTrackListItem = trackingListItemFacade.getTrackListItemById(id);

        if (optionalTrackListItem.isPresent()) {
            TrackListItem trackListItem = optionalTrackListItem.get();
            trackListItem.setStatusCheckbox(checkbox);
            TrackListItem updatedTrackListItem = trackingListItemFacade.updateTrackListItemStatusCheckbox(trackListItem);
            return ResponseEntity.ok(updatedTrackListItem);
        }

        return ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<TrackListItem> updateTrackListItem(@PathVariable Long id, @RequestBody TrackListItem trackListItem) {
        TrackListItem updatedTrackListItem = trackingListItemFacade.updateTrackListItem(id, trackListItem);
        if (updatedTrackListItem != null) {
            return ResponseEntity.ok(updatedTrackListItem);
        }
        return ResponseEntity.notFound().build();
    }
}
