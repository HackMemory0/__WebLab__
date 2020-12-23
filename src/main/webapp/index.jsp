<%--
  Created by IntelliJ IDEA.
  User: Crazy
  Date: 9/12/2020
  Time: 11:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <%-- Title of the web-page --%>
        <title>Simple Servlet</title>
        <%-- Logotype of the  web-site bar --%>
        <link rel="icon" href="images/logo-of-duck.png">
        <%-- Fonts --%>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap">
        <%-- StylesSheets --%>
        <link rel="stylesheet" href="stylesheets/core-styles.css">
        <link rel="stylesheet" href="stylesheets/header-styles.css">
        <link rel="stylesheet" href="stylesheets/form-styles.css">
        <link rel="stylesheet" href="stylesheets/table-styles.css">
        <link rel="stylesheet" href="stylesheets/footer-styles.css">
    </head>
    <body>
        <%-- Header section --%>
        <div class="header sticky">
            <div class="container">
                <div class="header-wrapper">
                    <%-- Link to current page --%>
                    <a id="link-to-se" href="${pageContext.request.contextPath}/">Web</a>
                    <%-- List --%>
                    <ul class="menu">
                        <%-- <li class="menu-lister">Created by</li> --%>
                        <li class="menu-lister">P3230</li>
                        <li class="menu-lister" id="separator">|</li>
                    </ul>
                    <%-- Link to Github account: https://github.com/HackMemory0/__WebLab__ --%>
                    <a id="link-to-git" target="_blank" href="https://github.com/HackMemory0/__WebLab__">Github<img
                            src="images/logo-of-arrow.png" alt="github-logo"></a>
                </div>
            </div>
        </div>
        <%-- Main request field section --%>
        <div class="form">
            <div class="container">
                <div class="form-wrapper clearfix">
                    <div class="graph-field">
                        <div class="graph-wrapper">
                            <%-- The main graph picture --%>
                            <svg id="graph" xmlns="http://www.w3.org/2000/svg" width="400" height="400">
                                <%-- Rectangle piece--%>
                                <rect x="200" y="200" width="140" height="70" fill="#82bdff"></rect>
                                <%-- Triangle piece --%>
                                <polygon points="200,200 200,60 270,200" fill="#82bdff"></polygon>
                                <%-- 1/4 of Circle piece (sector) --%>
                                <path d="M 200 200 L60 200 A 140 140 0 0 0 200 340" fill="#82bdff"></path>
                                <%-- Axis 'X' --%>
                                <polygon points="15,200 60,200 60,197 60,203 60,200 130,200 130,197 130,203 130,200 270,200 270,197 270,203 270,200
                                    340,200 340,197 340,203 340,200 385,200 378,197 385,200 378,203 385,200" stroke="grey"></polygon>
                                <%-- Axis 'Y' --%>
                                <polygon points="200,385 200,340 197,340 203,340 200,340 200,270 197,270 203,270 200,270 200,130 197,130 203,130
                                    200,130 200,60 197,60 203,60 200,60 200,15 197,22 200,15 203,22 200,15" stroke="grey"></polygon>
                                <%-- Dots --%>
                                <circle r="2" cx="200" cy="200" fill="grey"></circle>
                                <circle id="dot" r="3" cx="200" cy="200" fill="grey"></circle>
                                <%-- Point in axis 'X' --%>
                                <text class="point" x="53" y="195">-R</text>
                                <text class="point" x="118" y="195">-R/2</text>
                                <text class="point" x="262" y="195">R/2</text>
                                <text class="point" x="335" y="195">R</text>
                                <%-- Point in axis 'Y' --%>
                                <text class="point" x="205" y="64">R</text>
                                <text class="point" x="205" y="134">R/2</text>
                                <text class="point" x="205" y="274">-R/2</text>
                                <text class="point" x="205" y="344">-R</text>
                                <%-- Coordinates --%>
                                <text class="coordinate" x="5" y="10">x=200.00, y=200.00</text>
                            </svg>
                        </div>
                        <span id="message"></span>
                    </div>
                    <div class="form-field">
                        <h1  class="request-field-title">Choose and enter points</h1>
                        <div class="request-field clearfix">
                            <%-- Left side forms --%>
                            <div class="request-field-left">
                                <%-- Input 'X' --%>
                                <div class="field-outer">
                                    <label for="x-field"> Enter value for X [-3...3]</label>
                                    <input type="text" id="x-field" class="form-effect" maxlength="17" autocomplete="off">
                                </div>
                                <%-- Select --%>
                                <div class="field-outer">
                                    <label for="r-select"> Select value for R</label>
                                    <select name="r-select" id="r-select" class="form-effect">
                                        <option hidden value="null"></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <%-- Right side forms --%>
                            <div class="request-field-right">
                                <%-- Buttons 'Y' --%>
                                <div class="field-outer">
                                    <label id="y-label" for="y-button">Choose value for Y</label>
                                    <div class="y-buttons" id="y-button">
                                        <div class="button-line">
                                            <button class="y-button" value="-3">-3</button>
                                            <button class="y-button" value="-2">-2</button>
                                            <button class="y-button" value="-1">-1</button>
                                        </div>
                                        <div class="button-line">
                                            <button class="y-button" value="0">0</button>
                                            <button class="y-button" value="1">1</button>
                                            <button class="y-button" value="2">2</button>
                                        </div>
                                        <div class="button-line">
                                            <button class="y-button" value="3">3</button>
                                            <button class="y-button" value="4">4</button>
                                            <button class="y-button" value="5">5</button>
                                        </div>
                                    </div>
                                </div>
                            </div
                        </div>
                        <%-- Submit button --%>
                        <div class="field-outer">
                            <button class="submit-button">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Table section -->
        <div class="table">
            <div class="container">
                <div class="table-inner">
                    <div class="table-title">
                        <h1>Table of results</h1>
                    </div>
                    <div class="table-wrapper">
                        <jsp:include page="table.jsp" />
                    </div>
                </div>
            </div>
        </div>
        <%-- Footer section --%>
        <div class="footer">
            <div class="container">
                <div class="footer-inner ">
                    <a id="itmo" href="https://en.itmo.ru/en//">
                        <img src="images/logo-of-itmo.png" alt="logo-of-itmo" width="60">
                        <span>ITMO University</span>
                    </a>
                    <span id="text"> Created by: </span>
                    <a class="text" href="https://github.com/HackMemory0" target="_blank">HackMemory</a> &
                    <a class="text" href="https://github.com/Crazible" target="_blank">Crazible</a>
                </div>
            </div>
        </div>
        <%-- Scripts --%>
        <script>
            // Tabular object
            const table = document.querySelector('#tabular');

            const requestSend = function (params) {
                fetch("<%= request.getContextPath() %>" + params, { method: 'GET'})
                    .then(response => response.text())
                    .then(data => table.innerHTML = data);
            }
        </script>
        <script src="scripts/validate.js"></script>
    </body>
</html>