const MAX_NUMBER 	= 99999999999;

const digitButtons 	= document.querySelectorAll(".digit"),
	opButtons 		= document.querySelectorAll(".op"),
	clearButton 	= document.querySelector("#clear"),
	eqButton 		= document.querySelector("#equals");

let value 			= document.querySelector("#value"),
	operation		= document.querySelector("#operation");

let firstNumber 	= 0,
	secondNumber 	= 0,
	displayValue 	= 0,
	operator 		= "",
	needToClear 	= false;

function clampRes(num) {
	if(isNaN(num)) return num;
	if(!Number.isInteger(num)) num = num.toFixed(2);
	return num < MAX_NUMBER ? num : MAX_NUMBER;
}

function changeValue(num) {
	if(displayValue.toString().length >= 11 && !operator)
		return;

	if(needToClear) {
		clearValue();
		needToClear = false;
	}

	if(displayValue === 0) value.textContent = num;
	else value.textContent += num;

	displayValue = parseFloat(value.textContent);
}

function changeOp(op) {
	if(operator && operation.textContent !== "=") {
		secondNumber = displayValue;
		clearValue();
		changeValue(
			clampRes(
				operate(firstNumber, secondNumber, operator)
			)
		);
		firstNumber = displayValue;
	}
	firstNumber 			= displayValue;
	operator 				= op;
	operation.textContent 	= op;
	needToClear				= true;
}

function clearValue() {
	displayValue = 0;
	value.textContent = 0;
}

function clearScreen() {
	displayValue 			= 0;
	firstNumber 			= 0;
	secondNumber 			= 0;
	value.textContent 		= 0;
	operation.textContent 	= "";
	operator 				= "";
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if(b === 0) return "Scammed";
	return a / b;
}

function operate(a, b, operation) {
	switch (operation) {
		case "+":	return add(a,b);
		case "-":	return subtract(a,b);
		case "*":	return multiply(a,b);
		case "/":	return divide(a,b);
		default: 	return 0;
	}
}

digitButtons.forEach(button => button.addEventListener("click",
						evt => changeValue(evt.target.textContent)));

opButtons.forEach(button =>	button.addEventListener("click",
					evt => changeOp(evt.target.textContent)));

clearButton.addEventListener("click", () => clearScreen());

eqButton.addEventListener("click", evt => {
	if(!operator) return;

	secondNumber = displayValue;
	clearValue();
	changeValue(
		clampRes(
			operate(firstNumber, secondNumber, operator)
		)
	);
	operation.textContent = "=";
	needToClear = true;
});

window.addEventListener("keydown", evt => {
	const button = document.querySelector(`button[data-key="${evt.key}"]`)
	if(!button) return;

	button.click();
})