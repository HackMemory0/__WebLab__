package ru.ifmo.web.servlets;

import javax.servlet.http.*;
import javax.servlet.ServletException;

import java.io.IOException;

import ru.ifmo.web.model.Point;
import ru.ifmo.web.model.PointsBean;


public class AreaCheckServlet extends HttpServlet {

      private PointsBean bean;

      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            bean = (PointsBean) req.getSession().getAttribute("points");

            try {
                  double x = Double.parseDouble(req.getParameter("x").trim());
                  double y = Double.parseDouble(req.getParameter("y").trim());
                  double r = Double.parseDouble(req.getParameter("r"));

                  Point p = new Point(x, y, r);

                  bean.addPoint(p);
            } catch (Exception e) {
                  req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
            }

            resp.setContentType("text/html; charset=UTF-8");
            req.getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
      }
}
