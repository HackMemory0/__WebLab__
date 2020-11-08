
const X_VALUE_KEY = 'x-value';
const Y_VALUE_KEY = 'y-value';
const R_VALUE_KEY = 'r-value';

const saveItem = (key, value) => {
    value == null
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, String(value));
};


const storeSession = ({xValue, yValue, rValue}) => {
    saveItem(X_VALUE_KEY, xValue);
    saveItem(Y_VALUE_KEY, yValue);
    saveItem(R_VALUE_KEY, rValue);
};


const loadSession = ({$xSlider, $xSelected, $yText, $rSelected}) => {
    const rValue = sessionStorage.getItem(R_VALUE_KEY);
    const xValue = sessionStorage.getItem(X_VALUE_KEY);
    const yValue = sessionStorage.getItem(Y_VALUE_KEY);

    if (rValue != null) $rSelected.text(rValue);
    if (xValue != null) $xSelected.text(xValue);
    if (xValue != null) $xSlider.setValue(xValue);
    if (yValue != null) $yText.val(yValue);
};



$.fn.matcher = function(value, ignore = [8, 13, 37, 38]) {
    $(this).on('keypress paste', (event) => {
        const text = $(event.currentTarget).val();
        if (!value.test(
            text.substring(0, event.target.selectionStart) +
            String.fromCharCode(event.which) +
            text.substring(event.target.selectionEnd)) &&
            !ignore.includes(event.which)) event.preventDefault();
    });
};


$(() => {
    const $xSlider = ice.ace.instance('j_idt23:x-value');
    const $yText = $('.y-text');
    const $rButton = $('#r-input');
    const $rSelected = $('#r-selected');
    const $xSelected = $('#x-selected');
    const $rDefault = $rSelected.text();

    const $graph = $('#graph-plate');
    const $graphSvg = $('#graph-svg');


    const $rValues = [1, 1.5, 2, 2.5, 3];
    const $xValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];


    var clockNav = $('#clock'),
        dateNav = $('#date');

    interval = 6000;


    /**
     * Time
     */

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

    showDate();
    setInterval(showDate, interval);


    /**
     * Graph
     */

    const SCALE_X = 400 / $graphSvg.width();
    const SCALE_Y = 400 / $graphSvg.height();

    let $rawXValue = null;
    let $rawYValue = null;


    $graphSvg.mouseenter(() => {
        const rValue = getRValue();
        setGraphRInvalid(checkRValue(rValue), {$rButton});
    }).mouseleave(() => {
        resetRawValues();
        resetRValidity($rButton);
    }).mousemove((event) => {
        const offset = $graphSvg.offset();
        setRawXValue((event.pageX - offset.left) * SCALE_X);
        setRawYValue((event.pageY - offset.top) * SCALE_Y);
    }).click(() => {
        saveRawValues();
        setCrossings();
        $('.submit-button').click();
    });



    createElement = (name) => $(
        document.createElementNS('http://www.w3.org/2000/svg', name));

    setCrossings = () => {
        $graphSvg.children('.crossing').remove();
        if (getXValue() == null || getYValue() == null) return;
        const yPosition = 200 - getYValue() * 140 / getRValue();

        const circle = createElement('circle').attr({
            cx: 200 + getXValue() * 140 / getRValue(),
            cy: yPosition,
            r: 3,
        }).addClass('crossing');

        $graphSvg.append(circle);
    };

    setRawRValue = () => {
        setCrossings();
    };


    setRawYValue = (rawYValue) => {
        if (getRValue() == null || rawYValue == null) return;
        $graphSvg.children('.dotted-raw-y').remove();
        $rawYValue = (200 - rawYValue) * getRValue() / 140;

        const line = createElement('line').attr({
            x1: 0,
            x2: 400,
            y1: rawYValue,
            y2: rawYValue,
        }).addClass('dotted-raw-y');

        $graphSvg.append(line);
    };


    setRawXValue = (rawXValue) => {
        if (getRValue() == null || rawXValue == null) return;
        $graphSvg.children('.dotted-raw-x').remove();
        const xValue = (rawXValue - 200) * getRValue() / 140;

        $.each($xValues, (index, value) => {
            if (value - 0.5 < xValue && value + 0.5 >= xValue) {
                $rawXValue = value;
                const line = createElement('line').attr({
                    x1: 200 + value * 140 / getRValue(),
                    x2: 200 + value * 140 / getRValue(),
                    y1: 0,
                    y2: 400,
                }).addClass('dotted-raw-x');

                $graphSvg.append(line);
            }
        });
    };


    saveRawValues = () => {
        if ($rawXValue == null || $rawYValue == null) return;

        $xSelected.text($rawXValue);
        $xSlider.setValue($rawXValue);
        $xSlider.input[0].value = $rawXValue;
        $yText.val($rawYValue);

        $yText.keyup();
    };

    resetRawValues = () => {
        $graphSvg.children('.dotted-raw-y').remove();
        $graphSvg.children('.dotted-raw-x').remove();
        $rawXValue = null;
        $rawYValue = null;
    };



    /**
     * Validations
     */


    checkY = (yValue) => yValue >= -3 && yValue <= 3;
    checkR = (rValue) => $rValues.includes(rValue);

    isEmpty = (value) => value == null || value.length === 0;
    isBlank = (value) => value == null || value.trim().length === 0;
    isNumber = (value) => !isNaN(value) && isFinite(value);




    checkYValue = (yValue) => {
        return !this.isBlank(yValue) && this.isNumber(yValue) &&
            this.checkY(Number(yValue));
    };

    checkRValue = (rValue) => {
        return !this.isBlank(rValue) && this.isNumber(rValue) &&
            this.checkR(Number(rValue));
    };





    setYValid = (isValid, {$yText}) => {
        isValid
            ? $yText.removeClass('is-invalid').addClass('is-valid')
            : $yText.removeClass('is-valid').addClass('is-invalid');
    };

    setRValid = (isValid, {$rButton}) => {
        if (isValid) {
            $rButton.children().
            each((index, element) => $(element).
            removeClass('is-invalid').
            addClass('is-valid'));
        } else {
            $rButton.children().
            each((index, element) => $(element).
            removeClass('is-valid').
            addClass('is-invalid'));
        }
    };


    setGraphRInvalid = (isValid, {$rButton}) => {
        if (!isValid) {
            $rButton.children().
            each((index, element) => $(element).
            removeClass('is-valid').
            addClass('is-invalid'));
        }
    };

    resetGraphValidity = ($graph) => {
        $graph.removeClass('is-invalid');
    };


    resetYValidity = ($yText) => {
        $yText.removeClass('is-valid is-invalid');
    };

    resetRValidity = ($rButton) => {
        $rButton.children().
        each((index, element) => $(element).
        removeClass('is-valid is-invalid'));
    };



    getXValue = () => {
        return $xSlider.getValue();
    };

    getYValue = () => {
        const result = $yText.val();
        return result != null && result.length !== 0
            ? result.replace(',', '.')
            : null;
    };

    getRValue = () => {
        const result = $rSelected.text();
        return result !== $rDefault ? result : null;
    };




    $yText.focus(() => resetYValidity($yText)).keyup(() => { setCrossings(); }).
    matcher(/^[+-]?\d*?[.,]?\d*?$/);

    $rButton.children().each((index, element) => {
        const $element = $(element);
        $element.click(() => {
            $rSelected.text($element.text());
            resetRValidity($rButton);
            setRawRValue()
        });
    });




    function validateValues() {

        const yValid = checkYValue(getYValue());
        const rValid = checkRValue(getRValue());

        setYValid(yValid, {$yText});
        setRValid(rValid, {$rButton});

        console.log(getRValue());
        console.log(getYValue());

        return yValid && rValid;
    }



    $('.submit-button').click((event) => {
        console.log($( "#x-value" ));
        if (!validateValues()) return event.preventDefault();
    });

    $xSlider.onSlideEnd = function(event, ui) {
        $xSlider.input[0].value = ui.value;
        $xSelected.text(ui.value);
        setCrossings();
    };


    loadSession({$xSlider, $xSelected, $yText, $rSelected});
    setCrossings();
    $(window).on('beforeunload', () => storeSession({
        xValue: getXValue(),
        yValue: getYValue(),
        rValue: getRValue(),
    }));


    $('.clear-from-button').click(() => {
        $xSlider.setValue(0);
        $xSelected.text(0);
        $yText.val('').keyup();
        $rSelected.text($rDefault);
        resetYValidity($yText);
        resetRValidity($rButton);
    });



});