
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
    const $yText = $('.y-text');
    const $rButton = $('#r-input');
    const $rSelected = $('#r-selected');
    const $xSelected = $('#x-selected');
    const $rDefault = $rSelected.text();

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

        return yValid || rValid;
    }


    $('.submit-button').click((event) => {
        console.log($( "#x-value" ));
        if (!validateValues()) return event.preventDefault();
    });

    ice.ace.instance('j_idt23:x-value').onSlide = function(a, b) {
        $xSelected.text(b.value)
    };

});