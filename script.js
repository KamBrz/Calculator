const one       = document.querySelector('#one');
const two       = document.querySelector('#two');
const three     = document.querySelector('#three');
const four      = document.querySelector('#four');
const five      = document.querySelector('#five');
const six       = document.querySelector('#six');
const seven     = document.querySelector('#seven');
const eight     = document.querySelector('#eight');
const nine      = document.querySelector('#nine');
const zero      = document.querySelector('#zero');

const point     = document.querySelector('#point');
const equals    = document.querySelector('#equals');
const add       = document.querySelector('#add');
const subtract  = document.querySelector('#subtract');
const multiply  = document.querySelector('#multiply');
const divide    = document.querySelector('#divide');
const clear     = document.querySelector('#clear');
const remove    = document.querySelector('#remove');

const resultScreen      = document.querySelector('.result-screen');
const calculationScreen = document.querySelector('.calculation-screen');




let currentNumber = '0';
let operand1 = '';
let operand2 = '';
let operator = '';
let result = 0;




function assignValue(button) {
    if (currentNumber.length < 16) {
      if (currentNumber === '0') {
        if (button === point) {
          currentNumber += '.';
        } else if (button.textContent !== '0') {
          currentNumber = button.textContent;
        }
    } else {
        if (button === point) {
          if (currentNumber.includes('.')) {
            return;
          } else if (!currentNumber) {
            currentNumber = '0.'
          } else
            currentNumber += '.'
        } else {
          currentNumber += button.textContent;
        }
      }
    }
  }
  

function addListeners (button) {
    button.addEventListener(('click'), () => {
        assignValue(button);
        resultScreen.textContent = currentNumber;
    })
}

addListeners(one);
addListeners(two);
addListeners(three);
addListeners(four);
addListeners(five);
addListeners(six);
addListeners(seven);
addListeners(eight);
addListeners(nine);
addListeners(zero);
addListeners(point);




clear.addEventListener(('click'), () => {
    location.reload();
})

function wipe() {
    currentNumber = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    result = 0;
}

remove.addEventListener(('click'), () => {
    if (currentNumber.length === 1) {
        currentNumber = '0'
    } else if (currentNumber === '') {
        location.reload();
    } else
    currentNumber = currentNumber.slice(0, -1);
    resultScreen.textContent = currentNumber;
});




function addOperatorListener (button) {
    button.addEventListener(('click'), () => {
        if (!operand1) {
            operand1 = currentNumber;
            assignOperator(button);
        } else {
            if (currentNumber === '') {
                assignOperator(button);
                return;
            } else
            operand2 = currentNumber;
            operate(operand1, operand2, operator);
            operand1 = result;
            assignOperator(button);
            operand2 = '';
        }
        currentNumber = '';
    })
}

function assignOperator (button) {
    if          (button === add) {
        operator = 'add';
        calculationScreen.textContent = operand1 + ' + ';
    } else if   (button === subtract) {
        operator = 'subtract';
        calculationScreen.textContent = operand1 + ' - ';
    } else if   (button === multiply) {
        operator = 'multiply';
        calculationScreen.textContent = operand1 + ' * ';
    } else if   (button === divide) {
        operator = 'divide';
        calculationScreen.textContent = operand1 + ' / ';
    }
}

function operate (operand1, operand2 , operator) {
    if          (operator === 'add') {
        result = parseFloat(operand1) + parseFloat(operand2);
    } else if   (operator === 'subtract') {
        result = parseFloat(operand1) - parseFloat(operand2);
    } else if   (operator === 'multiply') {
        result = parseFloat(operand1) * parseFloat(operand2);
    } else if   (operator === 'divide') {
        if (parseFloat(operand2) === 0) {
            resultScreen.textContent = 'YOU CHEEKY BUGGER';
            wipe();
            return;
        } else
        result = parseFloat(operand1) / parseFloat(operand2);
    }
    resultScreen.textContent = result;
}

addOperatorListener(add);
addOperatorListener(subtract);
addOperatorListener(multiply);
addOperatorListener(divide);

equals.addEventListener(('click'), () => {
    if (operand1 === '') {
        operand1 = currentNumber;
    } else {
        if (currentNumber === '') {
            return;
        } else {
            if          (operator === 'add') {
                calculationScreen.textContent = operand1 + ' + ' + currentNumber + ' =';
            } else if   (operator === 'subtract') {
                calculationScreen.textContent = operand1 + ' - ' + currentNumber + ' =';
            } else if   (operator === 'multiply') {
                calculationScreen.textContent = operand1 + ' * ' + currentNumber + ' =';
            } else if   (operator === 'divide') {
                calculationScreen.textContent = operand1 + ' / ' + currentNumber + ' =';
            }
        }
        operand2 = currentNumber;
        operate(operand1, operand2, operator);
        operand1 = result;
        operand2 = '';
    }
    currentNumber = '';
})