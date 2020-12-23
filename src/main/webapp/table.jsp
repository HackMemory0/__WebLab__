<%@ page import="ru.ifmo.web.model.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<jsp:useBean id="points" class="ru.ifmo.web.model.PointsBean" scope="session"/>

<table id="tabular">
    <thead>
        <tr>
            <th class="column1"> X </th>
            <th class="column2"> Y </th>
            <th class="column3"> R </th>
            <th class="column4"> Status </th>
            <th class="column5"> Current time </th>
            <th class="column6"> Execution time(s) </th>
        </tr>
    </thead>
    <tbody>
        <%
            List<Point> list = points.getPoints();
            while (list.size() > 20) {
                  list.remove(0);
            }
            List<Point> reversed = new ArrayList<>(list);
            Collections.reverse(reversed);
            for (Point point : reversed) {
        %>
        <tr onclick="showPoint(<%=point.getX()%>, <%=point.getY()%>, <%=point.getR()%>)">
            <td class="column1"><%=String.format("%.5f", point.getX()) %></td>
            <td class="column2"><%=String.format("%.5f", point.getY()) %></td>
            <td class="column3"><%=String.format("%.5f", point.getR()) %></td>
            <td class="column4"><%=point.isHit() ?
                    "<span style='color: darkgreen'>inside</span>" :
                    "<span style='color: red'>outside</span>" %></td>
            <td class="column5"><%=point.getCurrentTime()%></td>
            <td class="column6"><%=String.format("%.9f", point.getExecutionTime())%></td>
        </tr>
        <%}%>
    </tbody>
</table>
