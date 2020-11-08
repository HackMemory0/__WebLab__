package bean;

import model.Point;
import service.PointService;


import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.context.SessionScoped;
import javax.faces.bean.ManagedBean;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.Collections;
import java.util.List;


@Named("controller")
@SessionScoped
public class ControllerBean implements Serializable {

    @Inject
    @Named("service.PointServiceJPA")
    private PointService pointService;

    private List<Point> items;
    private Point item;

    public ControllerBean() {}

    private final double[] rValues = {1, 1.5, 2, 2.5, 3};

    private boolean validate(double x, double y, double r) {
        boolean checkX =  x >= -5 && x <= 5;
        boolean checkY = y >= -3 && y <= 3;
        boolean checkR = java.util.Arrays.binarySearch(rValues, r) > -1;
        return checkX && checkY && checkR;
    }

    @PostConstruct
    public void init() {
        item = new Point();
    }


    public void addItem() {
        if (validate(this.item.getX(), this.item.getY(), this.item.getR())) {
            this.item.calculateArea();
            this.pointService.create(this.item);
            this.item.setId(null);
        }
    }

    public List<Point> getItems() {
        List<Point> list = this.pointService.findAll();
        list.sort((left, right) -> (int) (left.getId() - right.getId()));
        Collections.reverse(list);
        return list;
    }

    public void deleteTable(){
        this.pointService.deleteAll();
    }


    public Point getItem() {
        return item;
    }

    public void setItem(Point item) {
        this.item = item;
    }
}
