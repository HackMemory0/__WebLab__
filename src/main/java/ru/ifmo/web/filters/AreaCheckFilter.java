package ru.ifmo.web.filters;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckFilter implements Filter {

    private final double[] rValues = {1, 2, 3, 4, 5};

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException {

        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");

        PrintWriter out = resp.getWriter();

        try {
            double x = Double.parseDouble(req.getParameter("x").trim());
            double y = Double.parseDouble(req.getParameter("y").trim());
            double r = Double.parseDouble(req.getParameter("r"));

            if (validate(x, y, r))
                chain.doFilter(req, resp);
            else
                throw new Exception("Validation failed");
        }catch (Exception ex){
            out.println("我想你門錯了，我的朋友");
        }
    }

    private boolean validate(double x, double y, double r) {
        boolean checkX =  x >= -3 && x <= 3;
        boolean checkY = y >= -3 && y <= 5;
        boolean checkR = java.util.Arrays.binarySearch(rValues, r) > -1;
        return checkX && checkY && checkR;
    }
}
