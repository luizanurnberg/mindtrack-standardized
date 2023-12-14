package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.Note;
import com.web.mindtrackproject.entity.TrackListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrackListItemRepository extends JpaRepository<TrackListItem,Long> {

    @Query("SELECT n FROM TrackListItem n WHERE n.userId = :userId")
    List<TrackListItem> getUserTrackListItem(@Param("userId") Long userId);
}
