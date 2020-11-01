package model;

import javax.persistence.*;

@Entity
@Table(name = "points")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private double x;
    private double y;
    private double r;
    private boolean hit;
    private Double executionTime;

    public Point() {}

    public Point(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;

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

    public Double getExecutionTime() {
        return executionTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private boolean checkArea(double x, double y, double r){
        // Checks triangle area
        if (x >= 0 && y >= 0 && y/2 <= (-x) + r/2) {
            return true;
        }
        // Checks rectangle area
        if (x <= 0 && y >= 0 && x >= - r  && y <= r) {
            return true;
        }
        // Checks circle area
        if (x >= 0 && y <= 0 && x * x + y * y <= r * r) {
            return true;
        }
        return false;
    }
}