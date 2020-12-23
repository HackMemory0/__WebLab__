package ru.ifmo.web.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PointsBean implements Serializable {

    private List<Point> points;

    public PointsBean() {
        points = new ArrayList<>();
    }

    public void addPoint(Point point) {
        points.add(point);
    }

    public List getPoints() {
        return points;
    }
}
