package com.web.mindtrackproject.service.observer;

import com.web.mindtrackproject.entity.Label;

public interface LabelObserver {
    Label updateLabelName(Label label);
    Label updateLabelStatus(Label label);
    Label createLabel(Label label);
}
