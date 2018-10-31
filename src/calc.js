const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    if (calculator.displayValue === "0") {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue = calculator.displayValue + digit;
    }
  }
}

function handleOperator(nextOperator) {
  if (calculator.firstOperand === null) {
    calculator.firstOperand = parseFloat(calculator.displayValue);
  } else if (calculator.operator) {
    const result = performCalculation[calculator.operator](
      calculator.firstOperand,
      parseFloat(calculator.displayValue)
    );

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,

  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,

  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,

  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,

  "=": (firstOperand, secondOperand) => secondOperand
};

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event;
  if (!target.matches("button")) {
    //Stisknuto něco jiného než tlačítko => skončit
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("all-clear")) {
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
