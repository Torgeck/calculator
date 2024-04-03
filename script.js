let firstNumber = null;
let lastNumber = null;
let sign = null;

const digits = 9;
const rows = 4;
const arrSymbols = [
  { key: "+", value: "plus" },
  { key: "-", value: "minus" },
  { key: "*", value: "times" },
  { key: "/", value: "division" },
  { key: "C", value: "reset" },
  { key: "=", value: "equals" },
  { key: "←", value: "delete" },
  { key: ".", value: "dot" },
];
const mapSymbols = new Map(arrSymbols.map((obj) => [obj.key, obj.value]));

const display = document.querySelector(".content");
const numpad = document.querySelector(".numpad");
const operands = document.querySelector(".operands");

// Operation functions
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b !== 0 ? a / b : "Crash Bandicoot";
}

function roundResult(result) {
  return (Math.round(result * 100) / 100).toString();
}

// Reset function
function reset() {
  firstNumber = null;
  lastNumber = null;
  sign = null;
  result = null;
  // clear screen
  display.textContent = "0";
  return 0;
}

function addDot() {
  const displayContent = display.textContent;

  if (!displayContent.includes(".")) {
    display.textContent = display.textContent + ".";
    if (sign != null) {
      lastNumber += ".";
    } else {
      firstNumber += ".";
    }
  }
}

function erase() {
  if (sign !== null) {
    if (lastNumber !== null) {
      lastNumber = lastNumber.slice(0, -1);
      display.textContent = lastNumber;
    } else {
      sign = null;
      display.textContent = display.textContent.slice(0, -1);
    }
  } else if (firstNumber !== null) {
    firstNumber = firstNumber.slice(0, -1);
    display.textContent = firstNumber;
  }
}

function equals() {
  if (lastNumber !== null) {
    firstNumber = operate(firstNumber, lastNumber, sign);
    lastNumber = null;
  }
  sign = null;
  display.textContent = firstNumber;
}

function operate(firstNumber, lastNumber, sign) {
  const firstDigit = Number(firstNumber);
  const secondDigit = Number(lastNumber);
  let result;

  switch (sign) {
    case "+":
      result = add(firstDigit, secondDigit);
      break;
    case "-":
      result = substract(firstDigit, secondDigit);
      break;
    case "*":
      result = multiply(firstDigit, secondDigit);
      break;
    case "/":
      result = divide(firstDigit, secondDigit);
      break;
    default:
      console.log("An invalid sign was entered in function operate");
      break;
  }

  return roundResult(result);
}

function addSymbolFunctionality(button, sign) {
  switch (sign) {
    case "+":
    case "-":
    case "*":
    case "/":
      button.addEventListener("click", () => symbolClick(button));
      break;
    case "=":
      button.addEventListener("click", () => equals());
      break;
    case ".":
      button.addEventListener("click", () => addDot());
      break;
    case "C":
      button.addEventListener("click", () => reset());
      break;
    case "←":
      button.addEventListener("click", () => erase());
      break;
    default:
      console.log("An invalid sign was entered in function operate");
      break;
  }
}

function createButton(label) {
  let btn = document.createElement("button");
  btn.textContent = label;

  if (Number.isInteger(label)) {
    btn.classList.add(`_${label}`);
    btn.addEventListener("click", () => numberClick(btn));
  } else {
    addSymbolFunctionality(btn, label);
    btn.classList.add(mapSymbols.get(label));
  }

  return btn;
}

function createButtonsNumbers() {
  let button, row, label;

  // Create and add 3 btns to each row
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    row = document.createElement("div");
    row.classList.add("row");
    numpad.appendChild(row);
    // Fills row with 3 btns
    if (rowIndex === 0) {
      // Add 0 and . to numpad
      for (let index = 0; index < 2; index++) {
        label = index === 0 ? 0 : ".";
        button = createButton(label);
        row.appendChild(button);
      }
      label = 1;
    } else {
      label = fillRow(3, label, row);
    }
  }
}

function createButtonsOperands() {
  const strOp = "C ← * / + - =";
  const operandsArray = strOp.split(" ");
  const opLength = operandsArray.length;
  const op = document.querySelector(".operands");
  let button, label;

  for (let index = 0; index < opLength; index++) {
    label = operandsArray[index];
    button = createButton(label);
    op.appendChild(button);
  }
}

function fillRow(numBts, label, row) {
  let button;
  // Method that fills a row with numbers and then returns the last label used
  for (let index = 0; index < numBts; index++) {
    button = createButton(label);
    row.appendChild(button);
    label++;
  }

  return label;
}

function fillCalculator() {
  createButtonsNumbers();
  createButtonsOperands();
}

function numberClick(numBtn) {
  // Stores the value in firstNumber
  if (sign === null) {
    firstNumber =
      firstNumber === null
        ? numBtn.textContent
        : firstNumber + numBtn.textContent;
    display.textContent = firstNumber;
  } else {
    lastNumber =
      lastNumber === null
        ? numBtn.textContent
        : lastNumber + numBtn.textContent;
    display.textContent = lastNumber;
  }

  display.scrollLeft += 80;
}

function symbolClick(symBtn) {
  let dispContent = display.textContent,
    btnContent = symBtn.textContent;
  // Sign isnt null and lastnumber isnt null
  if (sign !== null && lastNumber !== null) {
    firstNumber = operate(firstNumber, lastNumber, sign);
    display.textContent = firstNumber;
    sign = btnContent;
    lastNumber = null;
  } else {
    display.textContent = dispContent.includes(sign)
      ? dispContent.replace(sign, btnContent)
      : dispContent.concat(btnContent);
    sign = btnContent;
  }
}

document.onload(fillCalculator());
