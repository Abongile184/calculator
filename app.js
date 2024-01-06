//DOM content used to connect the javascript code to the buttons for functionality
const numberButtons = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');
const decimalOperator = document.querySelector('.decimal-operator');
const percentageOperator = document.querySelector('.percentage');
const equal = document.querySelector('.equal-sign');
const clearcal = document.querySelector('.all-clear');
const squareroot = document.querySelector('.square-root');
const powerOfNum = document.querySelector('.power');
const delcharacterOnScreen = document.querySelector('.erase-character');
const calculatorScreen = document.querySelector('.calculator-screen');

//step one: functions for all of the basic math operators you typically find on simple calculators
const add = (...args) => {
   return args.reduce(function(a, b){
    return a + b;
   })
}


const subtract = (...args) => {
    return args.reduce(function(a, b){
        return a - b;
    })
}


const multiply = (...args) => {
    return args.reduce(function(a, b){
        return a * b;
    })
}


const divide = (...args) => {
    return args.reduce(function(a, b){
        if (b !== 0) {
            return a / b;
          } else {
            return "invalid Math!";
          }
    })
}
 

const square_root = (a) => {
    return Math.sqrt(a)
}


const powerOf = (a, b) => {
    return Math.pow(a, b);
}


const operate = (operator, a, b) => {
    switch (operator) {
      case 'square_root':
          return square_root(a);
      case 'powerOfNum':
          return powerOf(a, b);
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return "Invalid operator";
    }
  };

  //this is for the button that erases numbers on the screen if user makes a mistake
  function del() {
    if (secondNumber !== null) {
      // If there is a secondNumber, remove the last digit from it
      secondNumber = parseFloat(secondNumber.toString().slice(0, -1)) || null;
    } else if (operator !== null) {
      // If an operator is set, remove the last digit from the secondNumber
      operator = null;
    } else if (firstNumber !== null) {
      // If only the firstNumber is set, remove the last digit from it
      firstNumber = parseFloat(firstNumber.toString().slice(0, -1)) || null;
    }
  
    updateDisplay();
  }
/*
add event listeners to connect jacascript with the buttons on the Ui Variables to store calculator state
These lines declare three variables (firstNumber, operator, and secondNumber) and initialize them to null. 
These variables will be used to store the numbers and operator for the calculator: */

let firstNumber = null;
let operator = null;
let secondNumber = null;

/* Function to update the display
This function updateDisplay is responsible for updating the display on the calculator screen. 
It checks if the secondNumber is not null; if true, it displays secondNumber. 
If secondNumber is null, it checks if firstNumber is not null; if true, it displays firstNumber. 
If both are null, it displays '0' : */

const updateDisplay = () => {
  if (operator === 'square_root') {
    calculatorScreen.value = '√' + (secondNumber !== null ? secondNumber : firstNumber !== null ? firstNumber : '0');
  } else if (operator === 'powerOfNum') {
    calculatorScreen.value = firstNumber !== null ? firstNumber + '^' + (secondNumber !== null ? secondNumber : '') : '0';
  } else {
    calculatorScreen.value = secondNumber !== null ? secondNumber : firstNumber !== null ? firstNumber : '0';
  }
};


/* Function to handle calculation
This function calculate performs the calculation. It checks if all three variables 
(firstNumber, operator, and secondNumber) are not null. If true, it calls a hypothetical function operate
with these values, updates firstNumber with the result, and sets operator and secondNumber to null.
Finally, it calls updateDisplay to show the result on the screen: */

const calculate = () => {
  if (firstNumber !== null && operator !== null) {
    if (operator === 'powerOfNum') {
      if (secondNumber !== null) {
        secondNumber = operate(operator, firstNumber, secondNumber);
        operator = null;
        updateDisplay();
      }
    } else if (operator === 'square_root') {
      firstNumber = operate(operator, firstNumber);
      operator = null;
      secondNumber = null;
      updateDisplay();
    } else {
      if (secondNumber !== null) {
        firstNumber = operate(operator, firstNumber, secondNumber);
        operator = null;
        secondNumber = null;
        updateDisplay();
      }
    }
  }
};


//Event listeners for operator buttons
operatorButton.forEach(button => {
  button.addEventListener('click', function() {
    if (firstNumber !== null && operator !== null) {
      // If both numbers and an operator are already set, calculate and update display
      calculate();
    }
    if (firstNumber !== null) {
      // If only the first number is set, set the operator
      operator = button.value;
    }
  });
});

squareroot.addEventListener('click', function() {
  if (firstNumber !== null && operator === null) {
    // If only the first number is set and no operator, set the operator to 'square_root'
    operator = 'square_root';
    updateDisplay();
  }
});

powerOfNum.addEventListener('click', function() {
  if (firstNumber !== null && operator === null) {
    // If only the first number is set and no operator, set the operator to 'powerOfNum'
    operator = 'powerOfNum';
    updateDisplay(); // Add this line to update the display immediately
  }
});

// Event listener for equal button
equal.addEventListener('click', function() {
  calculate();
});

// Event listeners for number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', function() {
    const numberValue = button.textContent;

    if (operator === null) {
      // If no operator is set, update the first number
      firstNumber = firstNumber !== null ? parseFloat(firstNumber + numberValue) : parseFloat(numberValue);
    } else {
      // If an operator is set, update the second number
      secondNumber = secondNumber !== null ? parseFloat(secondNumber + numberValue) : parseFloat(numberValue);
    }

    updateDisplay();
  });
});

// Event listener for erase button
delcharacterOnScreen.addEventListener('click', function() {
  del();
  
});

// Event listener for clear button
clearcal.addEventListener('click', function() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  calculatorScreen.value = '0'; // Reset the display to '0'
});

decimalOperator.addEventListener('click', function() {
  const currentNumber = operator !== null ? secondNumber : firstNumber;
  
  // Check if the current number already contains a decimal point
  if (!currentNumber.toString().includes('.')) {
    if (operator !== null) {
      secondNumber = currentNumber === null ? '0.' : currentNumber + '.';
    } else {
      firstNumber = currentNumber === null ? '0.' : currentNumber + '.';
    }

    updateDisplay();
  }
});

// Event listener for percentage button
percentageOperator.addEventListener('click', function() {
  if (operator === null) {
    // If no operator is set, calculate the percentage for the firstNumber
    firstNumber = firstNumber === null ? '0' : (parseFloat(firstNumber) / 100).toString();
  } else {
    // If an operator is set, calculate the percentage for the secondNumber
    secondNumber = secondNumber === null ? '0' : (parseFloat(secondNumber) / 100).toString();
  }

  updateDisplay();
});