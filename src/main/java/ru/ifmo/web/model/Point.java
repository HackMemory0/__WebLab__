package ru.ifmo.web.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Point implements Serializable {

    private final double x;
    private final double y;
    private final double r;
    private final boolean hit;
    private final String currentTime;
    private final Double executionTime;

    public Point(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;

        this.currentTime = DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalDateTime.now());

        long startTime = System.nanoTime();
        this.hit = checkArea(x, y, r);
        long endTime = System.nanoTime();

        this.executionTime = ((double) (endTime - startTime) / 10000000);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public Double getExecutionTime() {
        return executionTime;
    }


    private boolean checkArea(double x, double y, double r){
        // Checks triangle area
        if (x >= 0 && y >= 0 && y <= -2 * x + r) {
            return true;
        }
        // Checks rectangle area
        if (x >= 0 && y <= 0 && x <= r && y >= - r / 2) {
            return true;
        }
        // Checks 1/4 circle area
        if (x <= 0 && y <= 0 && x * x + y * y <= r * r) {
            return true;
        }
        return false;
    }
}
