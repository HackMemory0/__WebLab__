package service;

import model.Point;

import java.util.List;

public interface PointService {
    public Point create(Point point);
    public Point findById(Long id);
    public List<Point> findAll();
}
