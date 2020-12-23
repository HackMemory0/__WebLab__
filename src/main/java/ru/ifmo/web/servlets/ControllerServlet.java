package ru.ifmo.web.servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

            String xString = req.getParameter("x");
            String yString = req.getParameter("y");
            String rString = req.getParameter("r");

            if (xString == null || yString == null || rString == null) {
                  req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
            }else {
                  req.getServletContext().getRequestDispatcher("/check").forward(req, resp);
            }
      }
}
