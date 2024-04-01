let firstNumber = null,
  lastNumber = null,
  sign = null;
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
const display = document.querySelector(".display");
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
  return b === 0 ? "Dude don't be like that" : a / b;
}

// Reset function
function reset() {
  firstNumber = 0;
  lastNumber = 0;
  sign = 0;
  // clear screen
}

function operate(firstNumber, lastNumber, sign) {
  let result;

  switch (sign) {
    case "+":
      result = add(firstNumber, lastNumber);
      break;
    case "-":
      result = substract(firstNumber, lastNumber);
      break;
    case "*":
      result = multiply(firstNumber, lastNumber);
      break;
    case "/":
      result = divide(firstNumber, lastNumber);
      break;
    default:
      console.log("An invalid sign was entered in function operate");
      break;
  }
  return result;
}

function createButton(label) {
  let btn = document.createElement("button");
  btn.textContent = label;

  if (Number.isInteger(label)) {
    btn.classList.add(`_${label}`);
    btn.addEventListener("click", () => numberClick(btn));
  } else {
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
  if (sign != null) {
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
}

document.onload(fillCalculator());
