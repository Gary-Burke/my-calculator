/* jshint esversion: 11 */

let equation = ""
let isProcessing = false; // Prevent operators from being clicked consecutively

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    let operands = document.getElementsByClassName("button-operand");
    for (let operand of operands) {
        operand.addEventListener("click", buildEquationOperand)
    }

    let operators = document.getElementsByClassName("button-operator");
    for (let operator of operators) {
        operator.addEventListener("click", buildEquationOperator)
    }

    let equals = document.getElementById("button-equals");
    equals.addEventListener("click", calculateEquation)

});

function buildEquationOperand(e) {
    isProcessing = false;
    const value = e.currentTarget.getAttribute("data-value");
    equation += value;
    document.getElementById("equation").innerText = equation;
    // TODO: console.log("equation: " + equation);
    return equation
}

function buildEquationOperator(e) {
    if (isProcessing) return;

    const value = e.currentTarget.getAttribute("data-value");
    equation += value;
    document.getElementById("equation").innerText = equation;
    // TODO: console.log("equation: " + equation);
    isProcessing = true;
    return equation
}

function calculateEquation(e) {
    let answer = equation;
    document.getElementById("answer").innerText = answer;
    console.log("answer: " + answer);
}