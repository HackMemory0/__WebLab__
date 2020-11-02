
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
    if (yValue != null) $yText.val(yValue).keyup();
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
}


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
        return ice.ace.instance('j_idt23:x-value').getValue();
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




    $yText.focus(() => resetYValidity($yText)).keyup(() => {
    }).matcher(/^[+-]?\d*?[.,]?\d*?$/);

    $rButton.children().each((index, element) => {
        const $element = $(element);
        $element.click(() => {
            $rSelected.text($element.text());
            resetRValidity($rButton);
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

    ice.ace.instance('j_idt23:x-value').onSlide = function(event, ui) {
        ice.ace.instance('j_idt23:x-value').input[0].value = ui.value;
        $xSelected.text(ui.value)
    };


    loadSession({$xSlider, $xSelected, $yText, $rSelected});
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






    $graphSvg.mouseenter(() => {
        const rValue = getRValue();
        setGraphRInvalid(checkRValue(rValue), {$rButton});
    }).mouseleave(() => {

        resetRValidity($rButton);
    }).mousemove((event) => {
        const c = $graphSvg[0].getBoundingClientRect();
        // Coordinates of the dot in pixels
        const mouseX = event.clientX - c.x;
        const mouseY = event.clientY - c.y;

        redraw(mouseX, mouseY);
    }).click(() => {

    });



});