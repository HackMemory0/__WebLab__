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

    @PostConstruct
    public void init() {
        item = new Point();
    }


    public void addItem() {
        this.item.calculateArea();
        this.pointService.create(this.item);
        this.item.setId(null);
    }


    public List<Point> getItems() {
        return this.pointService.findAll();
    }


    public Point getItem() {
        return item;
    }

    public void setItem(Point item) {
        this.item = item;
    }
}
