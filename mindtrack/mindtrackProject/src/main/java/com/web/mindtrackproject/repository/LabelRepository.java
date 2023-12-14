package com.web.mindtrackproject.repository;

import com.web.mindtrackproject.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LabelRepository extends JpaRepository<Label, Long> {
    @Query("SELECT n FROM Label n WHERE n.userId = :userId")
    List<Label> getUserLabels(@Param("userId") Long userId);
}
