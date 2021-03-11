const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(usrInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); //from vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  //object declartion
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  //values pushed into array
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  // if (!enteredNumber) {return;}
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    if(currentResult === 0){
      currentResult = 1;
    }
    currentResult *= enteredNumber;
    console.log(currentResult);
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    if(currentResult === 0){
      currentResult = 1;
    }
    currentResult /= enteredNumber;
    mathOperator = "/";
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

// function add() {
//   calculateResult("ADD");
// }

// function subtract() {
//   calculateResult("SUBTRACT");
// }

// function multiply() {
//   calculateResult("MULTIPLY");
// }

// function divide() {
//   calculateResult("DIVIDE");
// }

addBtn.addEventListener("click", calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener("click", calculateResult.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener("click", calculateResult.bind(this, 'MULTIPLY'));
divideBtn.addEventListener("click", calculateResult.bind(this, 'DIVIDE'));
