// Function to generate a truth table for a given Boolean expression
function generateTruthTable(expression) {
	const numVariables = getNumVariables(expression);
	const numRows = Math.pow(2, numVariables);
	const table = [];
	
	// Generate all possible input combinations for the variables
	for (let i = 0; i < numRows; i++) {
		const inputValues = generateInputValues(i, numVariables);
		const outputValue = evaluateExpression(expression, inputValues);
		table.push({inputValues, outputValue});
	}
	
	return table;
}

// Function to convert a truth table to K-map values
function truthTableToKMap(truthTable) {
	const numVariables = truthTable[0].inputValues.length;
	const numRows = Math.pow(2, numVariables);
	const numCols = Math.pow(2, numVariables - 1);
	const kMap = [];
	
	// Initialize K-map with 0 values
	for (let i = 0; i < numRows; i++) {
		kMap.push([]);
		for (let j = 0; j < numCols; j++) {
			kMap[i].push(0);
		}
	}
	
	// Map truth table values to K-map cells
	truthTable.forEach(({inputValues, outputValue}) => {
		const row = binaryToDecimal(inputValues.slice(0, numVariables - 1));
		const col = binaryToDecimal(inputValues.slice(numVariables - 1));
		kMap[row][col] = outputValue;
	});
	
	return kMap;
}

// Function to generate HTML for the K-map
function generateKMapHtml(kMap) {
	let html = "<table>";
	
	// Generate K-map header row
	html += "<tr><td></td>";
	for (let i = 0; i < kMap[0].length; i++) {
		html += `<td>${decimalToBinary(i)}</td>`;
	}
	html += "</tr>";
	
	// Generate K-map body rows
	for (let i = 0; i < kMap.length; i++) {
		html += "<tr>";
		html += `<td>${decimalToBinary(i)}</td>`;
		for (let j = 0; j < kMap[i].length; j++) {
			html += `<td>${kMap[i][j]}</td>`;
		}
		html += "</tr>";
	}
	
	html += "</table>";
	
	return html;
}

// Function to get the number of variables in a Boolean expression
function getNumVariables(expression) {
	const variables = getVariables(expression);
	const uniqueVariables = [...new Set(variables)];
	return uniqueVariables.length;
}

// Function to get an array of the variables in a Boolean expression
function getVariables(expression) {
	return expression.match(/[A-Za-z]+/g) || [];
}

// Function to generate all possible input values for a given row of a truth table
function generateInputValues(rowIndex, numVariables) {
	const binaryString = decimalToBinary(rowIndex, numVariables);
	return binaryString.split("").map((char) => (char === "0" ? false : true));
}

// Function to evaluate a Boolean expression for a given set of input values
function evaluateExpression(expression, inputValues) {
	const variables = getVariables(expression);
	
	// Replace variable names with input values
	let newExpression = expression;
	for (let i = 0; i < variables.length; i++) {
		newExpression = newExpression.replace(
			new RegExp(variables[i], "g"),
			inputValues[i]
		);
	}
	
	// Evaluate expression
	return eval(newExpression);
}

// Function to convert a decimal number to binary with a fixed number of digits
function decimalToBinary(decimal, numDigits = null) {
const binaryString = decimal.toString(2);
if (numDigits !== null) {
const padding = "0".repeat(numDigits - binaryString.length);
return padding + binaryString;
}
return binaryString;
}

// Function to convert a binary number to decimal
function binaryToDecimal(binary) {
return parseInt(binary.join(""), 2);
}

// Example usage
const truthTable = generateTruthTable("(A && B) || (!A && C)");
const kMap = truthTableToKMap(truthTable);
const kMapHtml = generateKMapHtml(kMap);
console.log(kMapHtml);
