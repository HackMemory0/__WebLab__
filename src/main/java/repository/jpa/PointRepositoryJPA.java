package repository.jpa;

import model.Point;
import repository.PointRepository;

import javax.annotation.Resource;
import javax.ejb.Stateful;
import javax.ejb.Stateless;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import javax.persistence.*;
import javax.transaction.UserTransaction;
import java.io.Serializable;
import java.util.List;

@Named("repository.PointRepositoryJPA")
@SessionScoped
public class PointRepositoryJPA implements PointRepository, Serializable {

    private final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("persist");


    @Override
    public Point create(Point point) {
        EntityManager em = entityManagerFactory.createEntityManager();
        if(point.getId() == null) {
            try {
                em.getTransaction().begin();
                em.persist(point);
                em.getTransaction().commit();
            } catch (Exception e) {
                try {
                    em.getTransaction().rollback();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }else return null;

        return point;
    }


    @Override
    public List<Point> findAll() {
        EntityManager em = entityManagerFactory.createEntityManager();
        return em.createQuery("SELECT p FROM Point p", Point.class).getResultList();
    }

    @Override
    public Point findById(Long id) {
        EntityManager em = entityManagerFactory.createEntityManager();
        if(id != null)
            return em.find(Point.class, id);

        return null;
    }
}