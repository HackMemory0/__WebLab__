$(() => {

    interval = 6000;

    var hourElt = $('.hour'),
        minElt = $('.min'),
        secElt = $('.sec');

    var clockNav = $('#clock'),
        dateNav = $('#date');


    function showClock() {
        const date = new Date();

        const second = date.getSeconds() * 6;
        const minute = date.getMinutes() * 6;
        const hour = ((date.getHours() + 11) % 12 + 1) * 30;

        secElt.css("transform", "rotate(" + second + "deg)");
        minElt.css("transform", "rotate(" + minute + "deg)");
        hourElt.css("transform", "rotate(" + hour + "deg)");
    }
    
    
    function showDate() {
        const date = new Date();
        var datestring = date.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        var clockstring = date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });


        clockNav.text(clockstring);
        dateNav.text(datestring);
    }


    showClock();
    showDate();

    setInterval(showDate, interval);
    setInterval(showClock, interval);

});