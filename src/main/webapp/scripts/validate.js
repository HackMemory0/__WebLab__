
// Overriding method 'replace' of the class DOMTokenList
DOMTokenList.prototype.replace = function (oldToken, newToken) {
    this.remove(oldToken); this.add(newToken);
}

// Validates and returns field value
const validateAndReturn = function (field, min, max) {
    let floatPattern = /^[+-]?\d+(\.\d+)?$/;

    // replace comma to dot
    let fieldValue = field.value.trim().replace(',', '.');

    if (fieldValue === "") {
        // removes all effects
        field.classList.remove('success', 'error');
        return undefined; // if invalid data
    }
    if (floatPattern.test(fieldValue)) {
        let floatValue = parseFloat(fieldValue);

        if (floatValue < min || floatValue > max) {
            // replacing status
            field.classList.replace('success', 'error');
            return undefined; // if invalid data
        } else {
            // replacing status
            field.classList.replace('error', 'success');
            return floatValue; // valid data
        }
    } else {
        // replacing status
        field.classList.replace('success', 'error');
        return undefined; // if invalid data
    }
}

// Checks and and returns field value
const checkAndReturn = function (field) {
    if ( !isNaN(field.value)) {
        message.innerHTML = "";

        // added 'success' effect
        field.classList.add('success');

        // if not empty returns value of the field
        return parseFloat(field.value.trim());
    }
    else { // else returns 'undefined'
        return undefined;
    }
}


// Dot in graph
const dot = document.querySelector('#dot');
// Redraws point
const redraw = function (x, y) {
    // Setting color
    dot.setAttribute('fill', 'red')
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);

    // Changes coordinates in span
    coordinates.innerHTML = 'x=' + x + ", y=" + y;
}

// Fixes coordinates if it's not in the graph
// Size *.svg 400x400
const fix = function (coordinate) {
    if (coordinate < 5) return 5; // less
    else if (coordinate > 395) return 395; // more
    else return coordinate; // OK
}


// Submit button
const submitButton = document.querySelector('.submit-button');

let yValue, x = 200, y = 200;
const onChangeRedrawDot = function () {
    let xValue = validateAndReturn(xField, -3, 3),
        rValue = checkAndReturn(rSelect);

    // Checks for valid data
    if (xValue !== undefined && yValue !== undefined && rValue !== undefined) {
        submitButton.classList.add('able');
        // Relatives points for graph
        let relativeX = 2 * (xValue * 70 / rValue) + 200;
        let relativeY = - 2 * (yValue * 70 / rValue) + 200;
        //Redraws
        redraw(fix(relativeX), fix(relativeY));

    } else {
        submitButton.classList.remove('able');
        //Redraws
        redraw(x, y);
    }
}


// List of button
const yButtonList = document.querySelectorAll('.y-button');

// Setting 'onClick' listeners for each button
yButtonList.forEach(button => button.addEventListener('click', function () {
    yButtonList.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    yValue = button.value;

    // validate data and redraws point
    onChangeRedrawDot();
}));


// Text line
const xField = document.querySelector('#x-field');
// Select item
const rSelect = document.querySelector('#r-select');

// Setting  'onInput' listener for text lines
xField.addEventListener('input', onChangeRedrawDot);
rSelect.addEventListener('input',  onChangeRedrawDot);

// An object ob the graphic
const pointer = document.querySelector('#graph');

const coordinates = document.querySelector('.coordinate');

// Rolls point to another point
pointer.addEventListener('mousemove', (event) => {
    const c = pointer.getBoundingClientRect();
    // Coordinates of the dot in pixels
    const mouseX = event.clientX - c.x;
    const mouseY = event.clientY - c.y;

    redraw(mouseX, mouseY);
});

// Moves dot to pre-clicked point
pointer.addEventListener('mouseleave', () => {
    setTimeout(() => {
        onChangeRedrawDot();
    }, 100);
});

// Span attribute for showing messages
const message = document.querySelector('#message');

// Sends request by clicking mouse
pointer.addEventListener('click', (event) => {
    let radius = checkAndReturn(rSelect);

    if (radius !== undefined) {
        const c = pointer.getBoundingClientRect();

        x = event.clientX - c.x;
        y = event.clientY - c.y;
        // Coordinates of the dot in pixels
        const mouseX = (x - 200) * radius / 140;
        const mouseY = - (y - 200) * radius / 140;

        let params = '/check?x=' + mouseX + '&y=' + mouseY + '&r=' + radius;
        requestSend(params);

        reset();
    } else {
        message.innerHTML = "Please, before clicking select radius (R)";
    }
});


submitButton.addEventListener('click', () => {
    let xValue = validateAndReturn(xField, -3, 3),
        rValue = checkAndReturn(rSelect);

    if (xValue !== undefined && yValue !== undefined && rValue !== undefined) {
        // Relatives points for graph
        let relativeX = 2 * (xValue * 70 / rValue) + 200;
        let relativeY = - 2 * (yValue * 70 / rValue) + 200;

        x = fix(relativeX); y = fix(relativeY);

        let params = '/check?x=' + xValue + '&y=' + yValue + '&r=' + rValue;
        requestSend(params);
        reset();
    }
});

// Resets input buttons and fields
const reset = function () {
    yButtonList.forEach(button => // Removes class 'active'
        button.classList.remove('active')); // from each button

    yValue = undefined; // Resets xValue as 'undefined'
    xField.value = ""; // Removes yValue
    // Redraws point and resets all settings
    onChangeRedrawDot();
}

// Last function
const showPoint = function (x, y, r) {
    let relativeX = 2 * (x * 70 / r) + 200;
    let relativeY = - 2 * (y * 70 / r) + 200;

    x = fix(relativeX); y = fix(relativeY);
    redraw(x, y);
}
