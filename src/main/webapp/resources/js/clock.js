var hourElt = document.getElementsByClassName("hour")[0],
    minElt = document.getElementsByClassName("min")[0],
    secElt = document.getElementsByClassName("sec")[0],
    digit = document.getElementsByClassName("digit")[0];

interval = 1000;
moveTime();

function moveTime() {
    show();
    setInterval(show, interval);
}

function show() {
    const date = new Date();

    const second = date.getSeconds() * 6;
    const minute = date.getMinutes() * 6;
    const hour = ((date.getHours() + 11) % 12 + 1) * 30;

    secElt.style.transform = "rotate(" + second + "deg)";
    minElt.style.transform = "rotate(" + minute + "deg)";
    hourElt.style.transform = "rotate(" + hour + "deg)";
}