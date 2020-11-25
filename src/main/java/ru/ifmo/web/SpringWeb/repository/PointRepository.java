package ru.ifmo.web.SpringWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.web.SpringWeb.model.Point;

public interface PointRepository extends JpaRepository<Point, Long> {
    void deleteAll();
    void deleteAllById(Long id);

}
